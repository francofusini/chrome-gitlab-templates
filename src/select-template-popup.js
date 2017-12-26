function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, (tabs) => {
    var tab = tabs[0];
    var url = tab.url;
    console.assert(typeof url == 'string', 'tab.url should be a string');
    callback(url);
  });
}

function changeDescriptionTemplate(template) {
  var script = 'setDescriptionTemplate("' + template + '");';
  chrome.tabs.executeScript({
    code: script
  });
}

function getSavedDescriptionTemplate(url, callback) {
  chrome.storage.sync.get(url, (items) => {
    callback(chrome.runtime.lastError ? null : items[url]);
  });
}

function saveDescriptionTemplate(url, template) {
  var items = {};
  items[url] = template;
  chrome.storage.sync.set(items);
}

document.addEventListener('DOMContentLoaded', () => {  
  getCurrentTabUrl((url) => {
    var dropdown = document.getElementById('dropdown');

    getSavedDescriptionTemplate(url, (savedTemplate) => {
      if (savedTemplate) {
        changeDescriptionTemplate(savedTemplate);
        dropdown.value = savedTemplate;
      }
    });

    dropdown.addEventListener('change', () => {
      changeDescriptionTemplate(dropdown.value);
      saveDescriptionTemplate(url, dropdown.value);
    });
  });
});
