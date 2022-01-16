/* eslint-disable no-undef */
const bg = {
  list: [],
  url: "https://bandcamp.com/cmgriffing",
  tabBandcamp: null,
  index:null,
  async init() {
    console.log('background loaded ...')
    //this.tabBandcamp = await this.getTab()
    this.listener()
  },
 async listener() {
    chrome.runtime.onMessage.addListener((req, send, response) => {
      if (req.status === "loadingInit") {
        console.log('bg:tabId', req.tabId)
                chrome.tabs.sendMessage(req.tabId, { status: "loading" }, (res)=>{ 
                  if (res.status === 'list received...') {
                    this.list = res.list
                    this.index = res.index
                  response({ status: 'list sending end...', list: this.list, index: this.index })
                  }
                });
        }
      return true
      })
  },
  async getTab() {
    const tabs = await chrome.tabs.query({})
    for (let tab of tabs) {
      if (tab.url === bg.url) {
        return tab
      }
    }
  },
}

bg.init()
