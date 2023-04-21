// Get an item from local storage by key
export function getItem(key) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
  
  // Set an item in local storage by key
  export function setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  
  // Check if an item exists in local storage by key
  export function hasItem(key) {
    return localStorage.getItem(key) !== null;
  }
  
  // Remove an item from local storage by key
  export function removeItem(key) {
    localStorage.removeItem(key);
  }
  
  // Remove all items from local storage
  export function clearStorage() {
    localStorage.clear();
  }
  