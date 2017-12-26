// Activate the extension if the content_script is listening
function updateStatus(tabId) {
  // Send a request to which only 
  chrome.tabs.sendRequest(tabId, { type: 'IS_MERGE_REQUEST' }, function(active) {
    if (!active) {
      chrome.pageAction.hide(tabId);
    } else {
      chrome.pageAction.show(tabId);
    }
  });
}

chrome.tabs.onUpdated.addListener(function(tabId, change, tab) {  
  if (change.status == "complete") {
    updateStatus(tabId);
  }
});

chrome.tabs.onSelectionChanged.addListener(function(tabId, info) {
  updateStatus(tabId);
});

// Ensure the current selected tab is set up
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  updateStatus(tabs[0].id);
});
