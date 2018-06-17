/**
 * Gets the "events" object from the local store asynchronously. If the object doesn't exist, initializes it. 
 */
async function getStoredEvents() {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get({
            activated: [],
            attached: [],
            created: [],
            detached: [],
            moved: [],
            removed: [],
            updated: []
        }, (items) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            }
            resolve(items);
        });
    });
}

async function handleActivated(activeInfo) {
    // Will only block the first time the events object is retrieved from storage
    events = await getEvents;
    events.activated.push({
        tabId: activeInfo.tabId,
        timestamp: Date.now()
    });
    chrome.storage.local.set({ "activated": events.activated });
}

async function handleAttached(tabId, attachInfo) {
    events = await getEvents;
    events.attached.push({
        tabId,
        attachInfo,
        timestamp: Date.now()
    });
    chrome.storage.local.set({ "attached": events.attached });
}

async function handleCreated(tab) {
    events = await getEvents;
    events.created.push({
        tab,
        timestamp: Date.now()
    });
    chrome.storage.local.set({ "created": events.created });
}

async function handleDetached(tabId, detachInfo) {
    events = await getEvents;
    events.detached.push({
        tabId,
        detachInfo,
        timestamp: Date.now()
    });
    chrome.storage.local.set({ "detached": events.detached });
}

async function handleMoved(tabId, moveInfo) {
    events = await getEvents;
    events.moved.push({
        tabId,
        moveInfo,
        timestamp: Date.now()
    });
    chrome.storage.local.set({ "moved": events.moved });
}

async function handleRemoved(tabId, removeInfo) {
    events = await getEvents;
    events.removed.push({
        tabId,
        removeInfo,
        timestamp: Date.now()
    });
    chrome.storage.local.set({ "removed": events.removed });
}

async function handleUpdated(tabId, changeInfo, tab) {
    events = await getEvents;
    // Only record changes to the URL (e.g. when a user navigates to a new page) and status (i.e. loading vs complete)
    if (changeInfo.url || changeInfo.status) {
        events.updated.push({
            tabId,
            changeInfo,
            timestamp: Date.now()
        });
        chrome.storage.local.set({ "updated": events.updated });
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

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request === "getEvents") {
        getStoredEvents().then(sendResponse);
        // tell chrome this is async
        return true;
    }
});

let getEvents = getStoredEvents();
start();