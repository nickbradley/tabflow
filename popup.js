/**
 * Pull all the events from storage and download in JSON. 
 */
function btnExportClick() {
    chrome.runtime.sendMessage("getEvents", (events) => {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
            return;
        }
        let json = JSON.stringify(events);
        let blob = new Blob([ json ], { type: "application/json" });
        chrome.downloads.download({
            url: URL.createObjectURL(blob),
            filename: "tabflow.json"
        });
    });
}
document.getElementById("btnExport").addEventListener("click", btnExportClick);