(async () => {
    chrome.runtime.onInstalled.addListener(async () => {
        if (!await getData("settings")) {
            await chrome.storage.local.set({
                ["settings"]: {
                    ["uid"]: "",
                    ["url"]: "wss://rabbit.pantyetta.com",
                }
            });
        }

        if (!await getData("historys")) {
            await chrome.storage.local.set({ ["historys"]: new Object });
        }

        chrome.contextMenus.create({
            id: "src-share-page",
            title: "共有する",
            type: 'normal',
            contexts: ['page'],
            enabled: false
        });

        chrome.contextMenus.create({
            id: "src-share-link",
            title: "linkを共有する",
            type: 'normal',
            contexts: ['link'],
            enabled: false
        });

        chrome.action.setBadgeBackgroundColor({ color: "#FF9385" });
        chrome.action.setBadgeText({ text: " " });

        await ws.start();
    });

    chrome.contextMenus.onClicked.addListener((item, tab) => {
        if (item.menuItemId === "src-share-page") {
            ws.send("tell", tab.url);
        } else if (item.menuItemId === "src-share-link") {
            ws.tell("tell", item.linkUrl);
        }
    });

    chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
        switch (message) {
            case "get-init-status":
                sendResponse(ws.isStatus());
                break;
            case "get-historys-update":
                if (!ws.isStatus()) return;
                ws.send("get");
                break;
            case "ws-open":
            case "update-url":
                if (ws.isStatus()) ws.close();
                setTimeout(async () => {
                    await ws.start();
                }, 100);
                break;
            case "ws-close":
                if (!ws.isStatus()) return;
                ws.close();
                break;
            case "update-uid":
                if (!ws.isStatus()) return;
                ws.send("rename", (await getData("settings")).uid);
                break;
        }
    });

    chrome.runtime.onStartup.addListener(async () => {
        if (!ws.isStatus()) await ws.start();
    });

    chrome.notifications.onClicked.addListener(async (nId) => {
        const historys = Object.values(await getData("historys"));

        const targetHistory = historys.find((el) => el.id === nId);
        if (!targetHistory) return;

        const Allwindow = await chrome.windows.getAll({
            windowTypes: ['normal']
        });

        if (!Allwindow.length) {
            await chrome.windows.create();
        }

        chrome.tabs.create({
            url: targetHistory.url
        });

        chrome.notifications.clear(nId);
    });

    chrome.runtime.onSuspend.addListener(() => {
        if (!ws.isStatus()) return;
        ws.close();
    });

    chrome.runtime.onSuspendCanceled.addListener(async () => {
        if (ws.isStatus()) return;
        await ws.start();
    });

    chrome.idle.onStateChanged.addListener(async (idleState) => {
        if (idleState === "active") {
            if (ws.isStatus()) return;
            await ws.start();
        }
    });

    const getData = async (key) => {
        return (await chrome.storage.local.get(key))[key]
    }

    const updateState = async (status) => {
        chrome.contextMenus.update("src-share-page", {
            enabled: status,
        });

        chrome.contextMenus.update("src-share-link", {
            enabled: status,
        });

        try {
            await chrome.runtime.sendMessage({ "type": "update-status", "value": status });
        } catch (error) {
        }

        status
            ? chrome.action.setBadgeBackgroundColor({ color: "#86DEC2" })
            : chrome.action.setBadgeBackgroundColor({ color: "#FF9385" });
    }

    const addHistory = async (key, url, historys) => {
        historys.unshift({ "id": key, "url": url });
        await chrome.storage.local.set({ ["historys"]: historys });
    }

    const newNotice = (key, url) => {
        const option = {
            type: "basic",
            title: "Share Rabbit Client",
            message: url,
            iconUrl: "icon128.png",
        };

        chrome.notifications.create(key, option);
    }

    const reciveTell = async (json) => {
        let historys = Object.values(await getData("historys"));

        for (const key in json.tell) {
            if (historys.some((el) => el.id === key)) continue;
            await addHistory(key, json.tell[key], historys);
            newNotice(key, json.tell[key]);
        }
        try {
            await chrome.runtime.sendMessage({ "type": "update-historys" });
        } catch (error) {
        }
    }

    const reciveGet = async (json) => {
        let historys = Object.values(await getData("historys"));

        for (const key in json.history) {
            if (historys.some((el) => el.id === key)) continue;
            await addHistory(key, json.history[key], historys);
        }
        try {
            await chrome.runtime.sendMessage({ "type": "update-historys" });
        } catch (error) {
        }
    }


    class data {
        type = "";
        msg = "";

        constructor(type, msg) {
            this.type = type;
            this.msg = msg;
        }
    }

    class rabbitWS {

        constructor() {
            this.connection = null;
            this.status = false;
        }

        onChangeMenu = (tf) => { }
        onTellmsg = (json) => { }
        onGetmsg = (json) => { }

        isStatus = () => {
            return this.status
        }

        wait = (milisec) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, milisec);
            })
        }

        start = async () => {
            const settings = await getData("settings");
            if (!settings.url || !settings.uid) return;

            let init = false;

            this.connection = new WebSocket(settings.url);
            this.connection.binaryType = "arraybuffer";

            this.connection.onerror = (e) => {
                console.warn(e);
            }

            this.connection.onclose = async () => {
                this.connection = null;
                this.status = false;
                this.onChangeMenu(false);
            }

            this.connection.onopen = async () => {
                this.status = true;
                this.send("init", "request");
                await this.wait(1000);
                if (!init) {
                    this.close();
                    return;
                }
                this.send("rename", settings.uid);
                this.onChangeMenu(true);

                while (this.isStatus()) {
                    this.send("ping", "ping");
                    await this.wait(5000);
                }
            }

            this.connection.onmessage = (e) => {
                const json = JSON.parse(e.data);
                if (json.type === "tell") {
                    this.onTellmsg(json);
                } else if (json.type === "get") {
                    this.onGetmsg(json);
                } else if (json.type === "init" && json.msg === "success") {
                    init = true;
                }
            }
        }

        close = () => {
            if (!this.isStatus) return;
            this.connection.close();
        }

        send = (mode, msg = "") => {
            if (!this.isStatus) return;
            const json = JSON.stringify(new data(mode, msg));
            this.connection.send(json);
        }
    }

    const ws = new rabbitWS();
    ws.onChangeMenu = updateState;
    ws.onTellmsg = reciveTell;
    ws.onGetmsg = reciveGet;
})();