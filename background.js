// Load existing stats
browser.storage.local.get().then(events => {
    console.log(events);
    if (!events.activated) {
        events.activated = []; // activateEvents = [];
    }
    if (!events.attached) {
        events.attached = [];
    }
    if (!events.created) {
        events.created = [];
    }
    if (!events.detached) {
        events.detached = [];
    }
    if (!events.moved) {
        events.moved = [];
    }
    if (!events.removed) {
        events.removed = [];
    }
    if (!events.updated) {
        events.updated = [];
    }

    function handleActivated(activeInfo) {
        events.activated.push({
            tabId: activeInfo.tabId,
            timestamp: Date.now()
        });
        browser.storage.local.set({"activated": events.activated});
    }
    
    function handleAttached(tabId, attachInfo) {
        events.attached.push({
            tabId,
            attachInfo,
            timestamp: Date.now()
        });
        browser.storage.local.set({"attached": events.attached});
    }

    function handleCreated(tab) {
        events.created.push({
            tab,
            timestamp: Date.now()
        });
        browser.storage.local.set({"created": events.created});
    }

    function handleDetached(tabId, detachInfo) {
        events.detached.push({
            tabId,
            detachInfo,
            timestamp: Date.now()
        });
        browser.storage.local.set({"detached": events.detached});
    }

    function handleMoved(tabId, moveInfo) {
        events.moved.push({
            tabId,
            moveInfo,
            timestamp: Date.now()
        });
        browser.storage.local.set({"moved": events.moved});
    }

    function handleRemoved(tabId, removeInfo) {
        events.removed.push({
            tabId,
            removeInfo,
            timestamp: Date.now()
        });
        browser.storage.local.set({"removed": events.removed});
    }

    // This might be too noisy -- need to think if we filter based on certain events
    function handleUpdated(tabId, changeInfo, tab) {
        events.updated.push({
            tabId,
            changeInfo,
            timestamp: Date.now()
        });
        browser.storage.local.set({"updated": events.updated});
    }

    browser.tabs.onActivated.addListener(handleActivated);
    browser.tabs.onAttached.addListener(handleAttached);
    browser.tabs.onCreated.addListener(handleCreated);
    browser.tabs.onDetached.addListener(handleDetached);
    browser.tabs.onMoved.addListener(handleMoved);
    browser.tabs.onRemoved.addListener(handleRemoved);
    browser.tabs.onUpdated.addListener(handleUpdated);
});
