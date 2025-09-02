const {ipcRenderer, contextBridge} = require('electron');
function expose(key, value){try{if(process.contextIsolated&&contextBridge&&typeof contextBridge.exposeInMainWorld==='function'){contextBridge.exposeInMainWorld(key,value);}else{if(!Object.getOwnPropertyDescriptor(window,key)){Object.defineProperty(window,key,{value,configurable:true,enumerable:false,writable:false});}else{window[key]=value;}}}catch(e){console.error('expose failed',key,e);}}
expose('DesktopSettingsPreload', {
  getStrings: () => ipcRenderer.sendSync('get-strings'),
  getSettings: () => ipcRenderer.sendSync('get-settings'),
  setUpdateChecker: (updateChecker) => ipcRenderer.invoke('set-update-checker', updateChecker),
  enumerateMediaDevices: () => ipcRenderer.invoke('enumerate-media-devices'),
  setMicrophone: (microphone) => ipcRenderer.invoke('set-microphone', microphone),
  setCamera: (camera) => ipcRenderer.invoke('set-camera', camera),
  setHardwareAcceleration: (hardwareAcceleration) => ipcRenderer.invoke('set-hardware-acceleration', hardwareAcceleration),
  setBackgroundThrottling: (backgroundThrottling) => ipcRenderer.invoke('set-background-throttling', backgroundThrottling),
  setBypassCORS: (bypassCORS) => ipcRenderer.invoke('set-bypass-cors', bypassCORS),
  setSpellchecker: (spellchecker) => ipcRenderer.invoke('set-spellchecker', spellchecker),
  setExitFullscreenOnEscape: (exitFullscreenOnEscape) => ipcRenderer.invoke('set-exit-fullscreen-on-escape', exitFullscreenOnEscape),
  setRichPresence: (richPresence) => ipcRenderer.invoke('set-rich-presence', richPresence),
  openUserData: () => ipcRenderer.invoke('open-user-data')
});
