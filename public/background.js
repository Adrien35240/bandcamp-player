/* eslint-disable no-undef */
const bg = {
  list: [],
  url: "https://bandcamp.com/cmgriffing",
  tabBandcamp: null,
  async init() {
    console.log('background loaded ...')
    this.tabBandcamp = await this.getTab()
    this.listener()
  },
 async listener() {
    chrome.runtime.onMessage.addListener((req, send, response) => {
      if (req.status === "loading") {
                chrome.tabs.sendMessage(this.tabBandcamp.id, { status: "loading" }, (res)=>{ 
                  if (res.status === 'list received...') {
                  this.list = res.list
                  response({ status: 'list sending end...', list: this.list })
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
