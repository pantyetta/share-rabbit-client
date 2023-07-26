chrome.runtime.onInstalled.addListener(async () =>{
    await chrome.storage.local.set({ ["url"]: "ws://127.0.0.1" });
    await chrome.storage.local.set({ ["uid"]: "" });
    await chrome.storage.local.set({ ["history"]: new Object });

    await chrome.contextMenus.create({
        id: "share-rabiit-client",
        title: "共有する",
        type: 'normal',
        contexts: ['all']
      });

});

const data = class{
    type = "";
    msg = "";

    constructor(type, msg){
        this.type = type;
        this.msg = msg;
    }
}


let connection = null;

const connect = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const url = await getData("url") || "ws://127.0.0.1";
            connection = new WebSocket(url);
            connection.binaryType = "arraybuffer";
            //通信が接続された場合
            connection.onopen = async function(e) {
                console.log("Connection Opne", e);
                const name = await getData("uid");
                if(name){
                    rename(name);
                }
                resolve();
                await pingLoop();
            };
    
            //エラーが発生した場合
            connection.onerror = function(e) {
                console.error(e);
                reject();
            };
    
            //メッセージを受け取った場合
            connection.onmessage = async function(e) {
                const json = JSON.parse(e.data);
                console.log("receive", json)
                if(json.type == "tell"){
                    await addValue(new Date().getMilliseconds.toString() ,json.msg);
                    await chrome.runtime.sendMessage("update");
                }else if(json.type == "get"){
                    for (const key in json.history) {
                        await addValue(key, json.history[key]);
                    }
                    await chrome.runtime.sendMessage("update");
                }
            };
    
            //通信が切断された場合
            connection.onclose = function(e) {
                console.error("Connection close", e);
                connection = null;
                setTimeout(async () =>{
                    await connect();
                }, 10 * 1000)
            };
        } catch (error) {
            console.error(error);
            reject();
        }
    });
}

const close = () => {
    connection.close();
}

const ping = () =>{
    const json = JSON.stringify(new data("ping", "ping"))
    connection.send(json);
}

const echo = (msg) =>{
    const json = JSON.stringify(new data("echo", msg))
    connection.send(json);
}

const tell = (msg) =>{
    const json = JSON.stringify(new data("tell", msg))
    connection.send(json);
}

const rename = (name) =>{
    const json = JSON.stringify(new data("rename", name))
    connection.send(json);
}

const get = () =>{
    const json = JSON.stringify(new data("get"))
    connection.send(json);
}

async function getData(key) {
    return new Promise((resolve) => {
      chrome.storage.local.get(key, (result) => {
        resolve(result[key]);
      });
    });
}

const openTab = async (nId) => {
    const history = await getData("history");
    chrome.tabs.create({
        url: history[nId]
    });
    chrome.notifications.clear(nId);
}

chrome.notifications.onClicked.addListener(
    openTab,
)

const addValue = async (key, url) => {
    let history = await getData("history") || new Object();

    const option ={
        type: "basic",
        title: "Share Rabbit",
        message: url,
        iconUrl: "icon128.png",
    };
    

    chrome.notifications.create(
        key,
        option,
    );
    history[key] = url;
    await chrome.storage.local.set({ ["history"]: history });
}

const pingLoop = async () => {
    return new Promise((resolve, reject) =>{
        setTimeout(async () => {
            if(connection == null){
                reject();
            }else{
                ping();
                resolve();
                await pingLoop();
            }
        }, 15 * 1000);
    })
}

(async () => {
    await connect();
})();

chrome.runtime.onStartup.addListener(
    (async () => {
        await connect();
    })
);

chrome.contextMenus.onClicked.addListener((item, tab) => {
    tell(tab.url);
});

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    console.log(message);
    if(message === "rename"){
        const uid = await getData("uid");
        rename(uid);
    }else if(message === "get"){
        get();
    }else if(message === "reconnect"){
        close();
    }
});