const checkbox = document.querySelector('.checkbox');
const init = async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.storage.sync.get("designMode", ({designMode}) => {
        if(designMode === 'false'){
            checkbox.checked = false
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: (() => {
                    document.designMode = 'off'
                }),
            });
        }
        if(designMode === 'true'){
            checkbox.checked = true
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: (() => {
                    document.designMode = 'on'
                }),
            });
        }
    });
}

checkbox.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: handleDesignMode,
    });
})

const handleDesignMode = () => {
    chrome.storage.sync.get("designMode", ({designMode} ) => {
        if(designMode === 'false') {
            document.designMode = 'on'
            chrome.storage.sync.set({ designMode: 'true'});
        }else {
            document.designMode = 'off'
            chrome.storage.sync.set({ designMode: 'false'});
        }
    });
}

(async () => {
    await init()
})()