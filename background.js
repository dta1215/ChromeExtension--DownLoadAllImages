// var appState
// chrome.runtime.onMessage.addListener((req, sender, res)=>{
//     chrome.tabs.query({active: true}, function(tabs){
//         if(req.extensionState == "Enable"){
//             appState = true;
//         }else if(req.extensionState == "Disable"){
//             appState = false;
//         }
        
//     })
// });

// chrome.tabs.onUpdated.addListener(function(tabID, changeInfo, tabInfo){
//    console.log({tabID, changeInfo, tabInfo});
// })

// chrome.tabs.query({currentWindow: true},function(tabs){
//     console.log(tabs);
// });

// chrome.tabs.onCreated.addListener(function(tab){
//     console.log(tab);
// })

chrome.tabs.onDetached.addListener(async (tab)=>{
});
  
// async function getTab(tab){
//     let infor = await chrome.tabs.get(tab);
//     console.log(infor);
// }
chrome.tabs.onActivated.addListener(async (tab)=>{
    // setTimeout(() => {
    //     chrome.tabs.get(tab.tabId, function(info){
    //         console.log(info);
    //     })
    // }, 100);
});



chrome.tabs.onUpdated.addListener(function(){
    let queryOptions = {active: true, currentWindow: true };
    chrome.tabs.query(queryOptions, async function(tabs){
        console.log(tabs);
    });
})