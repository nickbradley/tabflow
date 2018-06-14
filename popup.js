$(function () {
    $("#btnExport").click(() => {
        console.log("User clicked export");
        browser.storage.local.get(null, function(items) { // null implies all items
            //let str = encode(JSON.stringify(items));
            var json = JSON.stringify(items);
            console.log(json);
            var blob = new Blob([ json ], { type: "application/json" });

            // Convert object to a string.
            // var result = JSON.stringify(items);
            // console.log("Exporting", result);
            // Save as file
            // var url = 'data:application/json;base64,' + btoa(result);
            // console.log(url)
            // browser.downloads.download({
            //     url: URL.createObjectURL(blob),
            //     filename: 'tabflow.json'
            // }).then(() => console.log("done downloading")).catch((error) => console.error("Download failed"));
        });
    });
});