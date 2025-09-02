const {ipcRenderer, contextBridge} = require('electron');
function expose(key, value){try{if(process.contextIsolated&&contextBridge&&typeof contextBridge.exposeInMainWorld==='function'){contextBridge.exposeInMainWorld(key,value);}else{if(!Object.getOwnPropertyDescriptor(window,key)){Object.defineProperty(window,key,{value,configurable:true,enumerable:false,writable:false});}else{window[key]=value;}}}catch(e){console.error('expose failed',key,e);}}
expose('PrivacyPreload', {
  isUpdateCheckerAllowed: () => ipcRenderer.sendSync('is-update-checker-allowed'),
  openDesktopSettings: () => ipcRenderer.invoke('open-desktop-settings')
});
