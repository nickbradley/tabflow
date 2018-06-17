function handleActivated(activeInfo) {
    let record = {
        [Date.now()]: {
            tabId: activeInfo.tabId,
            tabEvent: "activated"
        }
    };
    chrome.storage.local.set(record);
}

function handleAttached(tabId, attachInfo) {
    let record = {
        [Date.now()]: {
            tabId,
            attachInfo,
            tabEvent: "attached"
        }
    };
    chrome.storage.local.set(record);
}

function handleCreated(tab) {
    let record = {
        [Date.now()]: {
            tab,
            tabEvent: "created"
        }
    };
    chrome.storage.local.set(record);
}

function handleDetached(tabId, detachInfo) {
    let record = {
        [Date.now()]: {
            tabId,
            detachInfo,
            tabEvent: "detached"
        }
    };
    chrome.storage.local.set(record);
}

function handleMoved(tabId, moveInfo) {
    let record = {
        [Date.now()]: {
            tabId,
            moveInfo,
            tabEvent: "moved"
        }
    };
    chrome.storage.local.set(record);
}

function handleRemoved(tabId, removeInfo) {
    let record = {
        [Date.now()]: {
            tabId,
            removeInfo,
            tabEvent: "removed"
        }
    };
    chrome.storage.local.set(record);
}

function handleUpdated(tabId, changeInfo, tab) {
    // Only record changes to the URL (e.g. when a user navigates to a new page) and status (i.e. loading vs complete)
    if (changeInfo.url || changeInfo.status) {
        let record = {
            [Date.now()]: {
                tabId,
                changeInfo,
                tabEvent: "updated"
            }
        };
        chrome.storage.local.set(record);
    }
}

function start() {
    chrome.tabs.onActivated.addListener(handleActivated);
    chrome.tabs.onAttached.addListener(handleAttached);
    chrome.tabs.onCreated.addListener(handleCreated);
    chrome.tabs.onDetached.addListener(handleDetached);
    chrome.tabs.onMoved.addListener(handleMoved);
    chrome.tabs.onRemoved.addListener(handleRemoved);
    chrome.tabs.onUpdated.addListener(handleUpdated);
}

function stop() {
    chrome.tabs.onActivated.removeListener(handleActivated);
    chrome.tabs.onAttached.removeListener(handleAttached);
    chrome.tabs.onCreated.removeListener(handleCreated);
    chrome.tabs.onDetached.removeListener(handleDetached);
    chrome.tabs.onMoved.removeListener(handleMoved);
    chrome.tabs.onRemoved.removeListener(handleRemoved);
    chrome.tabs.onUpdated.removeListener(handleUpdated);
}

start();