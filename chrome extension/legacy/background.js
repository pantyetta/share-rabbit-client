chrome.runtime.onInstalled.addListener(async () =>{

    console.log("install share rabbit")
    if(!await getData("url")){
        await chrome.storage.local.set({ ["url"]: "wss://rabbit.pantyetta.com" });
    }
    if(!await getData("uid")){
        await chrome.storage.local.set({ ["uid"]: "" });
    }

    if(!await getData("history")){
        await chrome.storage.local.set({ ["history"]: new Object });
    }

    await chrome.contextMenus.create({
        id: "share-rabiit-client-page",
        title: "共有する",
        type: 'normal',
        contexts: ['page']
      });

      await chrome.contextMenus.create({
        id: "share-rabiit-client-link",
        title: "linkを共有する",
        type: 'normal',
        contexts: ['link']
      });

    await connect();
    await pingLoop();
});

chrome.runtime.onStartup.addListener(
    (async () => {
        if(connection != null) return;
        await connect();
        await pingLoop();
    })
);


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
    try {
        const url = await getData("url") || "wss://rabbit.pantyetta.com" ;
        connection = new WebSocket(url);
        connection.binaryType = "arraybuffer";
        //通信が接続された場合
        connection.onopen = async function(e) {
            console.log("Connection Opne", e);
            const name = await getData("uid");
            if(name){
                rename(name);
            }
        };

        //エラーが発生した場合
        connection.onerror = function(e) {
            console.error(e);
        };

        //メッセージを受け取った場合
        connection.onmessage = async function(e) {
            const json = JSON.parse(e.data);
            console.log("receive", json)
            if(json.type == "tell"){
                for (const key in json.tell) {
                    await addValue(key, json.tell[key]);
                }
                try {
                    await chrome.runtime.sendMessage("update");
                } catch (error) {
                }
            }else if(json.type == "get"){
                for (const key in json.history) {
                    await addValue(key, json.history[key]);
                }
                try {
                    await chrome.runtime.sendMessage("update");
                } catch (error) {
                }
            }
        };

        //通信が切断された場合
        connection.onclose = function(e) {
            console.log("Connection close", e);
            connection = null;
            setTimeout(async () =>{
                await connect();
            }, 10 * 1000)
        };
    } catch (error) {
        console.error(error);
    }
}

const close = () => {
    connection.close();
}

const ping = () =>{
    if(connection == null)  return;
    const json = JSON.stringify(new data("ping", "ping"))
    connection.send(json);
}

const echo = (msg) =>{
    if(connection == null)  return;
    const json = JSON.stringify(new data("echo", msg))
    connection.send(json);
}

const tell = (msg) =>{
    if(connection == null)  return;
    const json = JSON.stringify(new data("tell", msg))
    connection.send(json);
}

const rename = (name) =>{
    if(connection == null)  return;
    const json = JSON.stringify(new data("rename", name))
    connection.send(json);
}

const get = () =>{
    if(connection == null)  return;
    const json = JSON.stringify(new data("get"))
    connection.send(json);
}

async function getData(key) {
    return new Promise(async (resolve) => {
      const result = await chrome.storage.local.get(key);
      resolve(result[key]);
    });
}

const openTab = async (nId) => {
    const history = await getData("history");

    const Allwindow = await chrome.windows.getAll({
        windowTypes: ['normal']
    });
    if(!Allwindow.length){
        await chrome.windows.create();
        console.log("create");
    }

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
            if(connection != null){
                ping();
            }
            await pingLoop();
            resolve();
        }, 5 * 1000);
    })
}

chrome.contextMenus.onClicked.addListener((item, tab) => {
    if(item.menuItemId === "share-rabiit-client-page"){
        tell(tab.url);
    }else if(item.menuItemId === "share-rabiit-client-link"){
        tell(item.linkUrl);
    }
});

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if(message === "rename"){
        const uid = await getData("uid");
        rename(uid);
    }else if(message === "get"){
        get();
    }else if(message === "reconnect"){
        close();
    }
});
