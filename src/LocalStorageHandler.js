export function setLocalStorage(settings) {
  try {
    localStorage.setItem('settings', JSON.stringify(settings));
  } catch (e) {
    console.error('Возникла ошибка:', e);
  }
}
export function getFromLocalStorage(def) {
  return localStorage.getItem('settings')
    ? JSON.parse(localStorage.getItem('settings'))
    : def;
}
