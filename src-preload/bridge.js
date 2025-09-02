// Helper to expose values to window regardless of contextIsolation setting.
// If contextIsolation is enabled, uses contextBridge. Otherwise assigns directly.
// This allows turning off contextIsolation (to access require) without breaking existing preload code.
const { contextBridge } = require('electron');

/**
 * Expose an API in the main world.
 * @param {string} key
 * @param {any} value
 */
function expose(key, value) {
  try {
    if (process.contextIsolated && contextBridge && typeof contextBridge.exposeInMainWorld === 'function') {
      contextBridge.exposeInMainWorld(key, value);
    } else {
      // Direct assignment when not isolated.
      // Avoid overwriting existing non-configurable properties.
      if (!Object.getOwnPropertyDescriptor(window, key)) {
        Object.defineProperty(window, key, {
          value,
          configurable: true,
          enumerable: false,
          writable: false
        });
      } else {
        window[key] = value; // fallback overwrite
      }
    }
  } catch (e) {
    console.error('bridge expose failed', key, e);
  }
}

module.exports = { expose };
