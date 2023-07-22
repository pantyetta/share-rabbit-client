chrome.runtime.onInstalled.addListener(async () =>{
    chrome.contextMenus.create({
        id: "share-rabiit-client",
        title: "共有する",
        type: 'normal',
        contexts: ['all']
      });
});

chrome.contextMenus.onClicked.addListener((item, tab) => {
    const tld = item.menuItemId;
    console.log(tab.url);
    tell(tab.url);
});

const data = class{
    type = "";
    msg = "";

    constructor(type, msg){
        this.type = type;
        this.msg = msg;
    }
}


let connection = WebSocket;

const connect = async () => {
    return new Promise((resolve, reject) => {
        try {
            connection = new WebSocket("ws://127.0.0.1");
            connection.binaryType = "arraybuffer";
            //通信が接続された場合
            connection.onopen = function(e) {
                console.log("Connection Opne", e);
                resolve();
            };
    
            //エラーが発生した場合
            connection.onerror = function(e) {
                console.error(e);
                reject();
            };
    
            //メッセージを受け取った場合
            connection.onmessage = function(e) {
                const json = JSON.parse(e.data);
                console.log("receive", json)
            };
    
            //通信が切断された場合
            connection.onclose = function(e) {
                console.error("Connection close", e);
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

(async function(){
    await connect();
    rename("pancho");
})();