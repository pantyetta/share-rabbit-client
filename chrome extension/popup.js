const getHistory = async () =>{
    const history_dom = document.getElementById("history");
    const result = await chrome.storage.local.get("history");
    for (const key in result["history"]) {
        const url = result["history"][key];
        const div = document.createElement('div');
        div.textContent = url;
        div.onclick = (async () => await chrome.tabs.create({url: url}));
        history_dom.appendChild(div); 
    }
}

const onBlurHandle = async (e, key) => {
    await chrome.storage.local.set({[key]: e.target.value});
    if(key === "uid"){
        await chrome.runtime.sendMessage("rename");
    }else if(key === "url"){
        await chrome.runtime.sendMessage("reconnect");
    }
}

(async () =>{
    const uid_dom = document.getElementById("uid");
    uid_dom.addEventListener("blur", (e) => onBlurHandle(e, "uid"));

    const result = await chrome.storage.local.get("uid");
    uid_dom.value = result["uid"];
    
    if(result["uid"]){
        await chrome.runtime.sendMessage("get");
    }

    const url_dom = document.getElementById("url");
    url_dom.addEventListener("blur", (e) => onBlurHandle(e, "url"));

    const url = await chrome.storage.local.get("url");
    console.log(url)
    url_dom.value = url["url"];
})();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if(message === "update"){
        getHistory();
    }
});