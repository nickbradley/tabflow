getEvents = browser.storage.local.get({
    activated: [],
    attached: [],
    created: [],
    detached: [],
    moved: [],
    removed: [],
    updated: []
});

function handleActivated(activeInfo) {
    getEvents.then(events => {
        events.activated.push({
            tabId: activeInfo.tabId,
            timestamp: Date.now()
        });
        browser.storage.local.set({ "activated": events.activated });
    });
}

function handleAttached(tabId, attachInfo) {
    getEvents.then(events => {
        events.attached.push({
            tabId,
            attachInfo,
            timestamp: Date.now()
        });
        browser.storage.local.set({ "attached": events.attached });
    });
}

function handleCreated(tab) {
    getEvents.then(events => {
        events.created.push({
            tab,
            timestamp: Date.now()
        });
        browser.storage.local.set({ "created": events.created });
    });
}

function handleDetached(tabId, detachInfo) {
    getEvents.then(events => {
        events.detached.push({
            tabId,
            detachInfo,
            timestamp: Date.now()
        });
        browser.storage.local.set({ "detached": events.detached });
    });
}

function handleMoved(tabId, moveInfo) {
    getEvents.then(events => {
        events.moved.push({
            tabId,
            moveInfo,
            timestamp: Date.now()
        });
        browser.storage.local.set({ "moved": events.moved });
    });
}

function handleRemoved(tabId, removeInfo) {
    getEvents.then(events => {
        events.removed.push({
            tabId,
            removeInfo,
            timestamp: Date.now()
        });
        browser.storage.local.set({ "removed": events.removed });
    });
}

function handleUpdated(tabId, changeInfo, tab) {
    getEvents.then(events => {
        // Only record changes to the URL (e.g. when a user navigates to a new page) and status (i.e. loading vs complete)
        if (changeInfo.url || changeInfo.status) {
            events.updated.push({
                tabId,
                changeInfo,
                timestamp: Date.now()
            });
            browser.storage.local.set({ "updated": events.updated });
        }
    });
}

function start() {
    browser.tabs.onActivated.addListener(handleActivated);
    browser.tabs.onAttached.addListener(handleAttached);
    browser.tabs.onCreated.addListener(handleCreated);
    browser.tabs.onDetached.addListener(handleDetached);
    browser.tabs.onMoved.addListener(handleMoved);
    browser.tabs.onRemoved.addListener(handleRemoved);
    browser.tabs.onUpdated.addListener(handleUpdated);
}

function stop() {
    browser.tabs.onActivated.removeListener(handleActivated);
    browser.tabs.onAttached.removeListener(handleAttached);
    browser.tabs.onCreated.removeListener(handleCreated);
    browser.tabs.onDetached.removeListener(handleDetached);
    browser.tabs.onMoved.removeListener(handleMoved);
    browser.tabs.onRemoved.removeListener(handleRemoved);
    browser.tabs.onUpdated.removeListener(handleUpdated);
}

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request === "pause") {
        stop();
        browser.browserAction.setIcon({path: "icons/icon-amber.svg"});
    } else if (request === "unpause") {
        start();
        browser.browserAction.setIcon({path: "icons/icon-blue.svg"});
    }
});

start();