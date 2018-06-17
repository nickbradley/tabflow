/**
 * Pull all the events from storage and download in JSON. 
 */
function btnExportClick() {
    chrome.storage.local.get(null, (items) => {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
            return;
        }
        let json = JSON.stringify(items);
        let blob = new Blob([ json ], { type: "application/json" });
        chrome.downloads.download({
            url: URL.createObjectURL(blob),
            filename: "tabflow.json"
        });
    });

}
document.getElementById("btnExport").addEventListener("click", btnExportClick);