let global = {
    uid: "",
    url: ""
}

const getHistory = async () =>{
    const history_dom = document.getElementById("history");
    const result = await chrome.storage.local.get("history");
    for (const key in result["history"]) {
        const url = result["history"][key];
        const img = document.createElement('img');
        img.src = "https://www.google.com/s2/favicons?domain=" + url;
        const div = document.createElement('div');
        const p = document.createElement('p');
        p.textContent = url;
        div.appendChild(img);
        div.appendChild(p);
        div.onclick = (async () => await chrome.tabs.create({url: url}));
        history_dom.appendChild(div); 
    }
}

const onBlurHandle = async (e, key) => {
    if(global[key] === e.target.value){
        return;
    }
    global[key] = e.target.value;
    await chrome.storage.local.set({[key]: global[key]});
    if(key === "uid"){
        await chrome.runtime.sendMessage("rename");
    }else if(key === "url"){
        await chrome.runtime.sendMessage("reconnect");
    }
}

(async () =>{
    const uid_dom = document.getElementById("uid");
    uid_dom.addEventListener("blur", (e) => onBlurHandle(e, "uid"));

    const uid_result = await chrome.storage.local.get("uid");
    global.uid = uid_result["uid"];
    uid_dom.value = global.uid;
    
    if(uid_result["uid"]){
        await chrome.runtime.sendMessage("get");
    }

    const url_dom = document.getElementById("url");
    url_dom.addEventListener("blur", (e) => onBlurHandle(e, "url"));

    const url_result = await chrome.storage.local.get("url");
    global.url = url_result.url
    url_dom.value = global.url;
})();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if(message === "update"){
        getHistory();
    }
});