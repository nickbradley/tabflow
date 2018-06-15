/**
 * Pull all the events from storage and download in JSON. 
 */
function btnExportClick() {
    let getEvents = browser.storage.local.get({
        activated: [],
        attached: [],
        created: [],
        detached: [],
        moved: [],
        removed: [],
        updated: []
    });
    
    getEvents.then(events => {
       let json = JSON.stringify(events);
       let blob = new Blob([ json ], { type: "application/json" });
       browser.downloads.download({
            url: URL.createObjectURL(blob),
            filename: "tabflow.json"
        });
    });
}

document.getElementById("btnExport").addEventListener("click", btnExportClick);