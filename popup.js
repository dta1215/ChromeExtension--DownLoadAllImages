$('#btnGetImg').click(function(){
    let urlsFilter;
    chrome.tabs.query({active: true, currentWindow: true}, function(){
        chrome.tabs.executeScript({file: 'jquery.js'}, function(){
            chrome.tabs.executeScript({file: 'getImagesHandler.js'});
        })
    })
    
    chrome.runtime.onMessage.addListener(function(message, sender, res){
        const urls = Object.values(message);
        urlsFilter = urls.slice(0, urls.length - 2);
        console.log(urlsFilter);
        const resultHTML = urlsFilter.map(function(url,i){
            return `<img class="imgFound" src="${url}" index="${i}" >`
        })
        $('#showImage').empty().append(resultHTML);
    })

    $('#btnDownloadImages').click(function(){
        Download(urlsFilter);
    })
})

function Download(urls){
    let zip = new JSZip();
    let count = 0;
    let currTime = Date.now();
    let zipFilename = `AllImages-${currTime}.zip`;

    urls.forEach(function(url, i){
        const regExPattern = /(?!.*\/)(.*)([.]jpg|jpeg|png|gif|tiff)/;
        let regExResult = url.match(regExPattern);
        const fileName = `${regExResult[1]}${regExResult[2]}`;
        // loading a file and add it in a zip file
        JSZipUtils.getBinaryContent(url, function (err, data) {
            zip.file(fileName, data, {binary:true});
            count++;
            if (count == urls.length) {
                zip.generateAsync({type:'blob'}).then(function(content) {
                    saveAs(content, zipFilename);
                });
            }
        });
    });
}
