export default {
  getItem: (key: string): string | null => {
    return localStorage.getItem(key);
  },

  addOrUpdate: (key: string, value: string) => {
    localStorage.setItem(key, value);
  },

  removeItem: (key: string) => {
    localStorage.removeItem(key);
  },

  clearAll: () => {
    localStorage.clear();
  }
};