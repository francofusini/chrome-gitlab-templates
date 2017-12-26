// The background page is asking us if it has to activate the extension
if (window == top) {
    chrome.extension.onRequest.addListener(function(req, sender, sendResponse) {
      processRequest(req, sendResponse);
    });
}

var processRequest = function(req, sendResponse) {
    switch(req.type) {
        case 'IS_MERGE_REQUEST':
            return sendResponse(true);
        default:
            return;
    }
}

var setDescriptionTemplate = function(template) {
    $('#merge_request_description').val(template);
};
