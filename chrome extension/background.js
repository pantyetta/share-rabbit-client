chrome.runtime.onInstalled.addListener(async () =>{
    chrome.contextMenus.create({
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
    return new Promise((resolve, reject) => {
        try {
            connection = new WebSocket("ws://127.0.0.1");
            connection.binaryType = "arraybuffer";
            //通信が接続された場合
            connection.onopen = async function(e) {
                console.log("Connection Opne", e);
                const name = await getData("name");
                if(name){
                    rename("pancho");
                }
                pingLoop();
                resolve();
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
                    await addValue(json.msg);
                }else if(json.type == "get"){
                    json.history.forEach(async value => {
                        await addValue(value);
                    });
                }
            };
    
            //通信が切断された場合
            connection.onclose = function(e) {
                console.error("Connection close", e);
                connection = null;
                setTimeout(async () =>{
                    await connect();
                    const name = await getData("name");
                    if(name){
                        rename("pancho");
                    }
                    pingLoop();
                }, 10 * 1000)
            };
        } catch (error) {
            console.error(error);
            reject();
        }
    });
}

const ping = () =>{
    const json = JSON.stringify(new data("ping", "ping"))
    console.log("send", json);
    connection.send(json);
}

const echo = (msg) =>{
    const json = JSON.stringify(new data("echo", msg))
    console.log("send", json);
    connection.send(json);
}

const tell = (msg) =>{
    const json = JSON.stringify(new data("tell", msg))
    console.log("send", json);
    connection.send(json);
}

const rename = (name) =>{
    const json = JSON.stringify(new data("rename", name))
    console.log("send", json);
    connection.send(json);
}

const get = () =>{
    const json = JSON.stringify(new data("get"))
    console.log("send", json);
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
    const url = await getData(nId);
    chrome.tabs.create({
        url: url
    });
    chrome.notifications.clear(nId);
}

chrome.notifications.onClicked.addListener(
    openTab,
)

const addValue = async (url) => {

    const option ={
        type: "basic",
        title: "Share Rabbit",
        message: url,
        iconUrl: "icon128.png",
    };
    
    const nId = new Date().getTime().toString();

    chrome.notifications.create(
        nId,
        option,
    );

    await chrome.storage.local.set({ [nId]: url });
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

connect();

chrome.runtime.onStartup.addListener(
    (async () => {
        await connect();
    })
);

chrome.contextMenus.onClicked.addListener((item, tab) => {
    console.log(tab.url);
    tell(tab.url);
});