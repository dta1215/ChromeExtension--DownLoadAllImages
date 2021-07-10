function GetImages(){
    let images = $('img');
    const urls = images.map(function(i, item){
        return $(item).attr('src');
    })
    chrome.runtime.sendMessage(urls);
}
GetImages();