const keySettings = 'savedSettings';
const localStorage = window.localStorage;

const saveSettingsLocalStorage = (value) => {
  localStorage.setItem(keySettings, JSON.stringify(value));
}

const loadSettingsLocalStorage = (defaultValue) => {
  let rawValue = localStorage.getItem(keySettings);
  if (!rawValue) {
      localStorage.setItem(keySettings, JSON.stringify(defaultValue));
      return defaultValue;
  }
  return JSON.parse(rawValue);
}

export {
    saveSettingsLocalStorage,
    loadSettingsLocalStorage
}
