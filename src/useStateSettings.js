import {useState, useEffect} from 'react';

export default function useStateSettings(value) {
  const [settings, setSettings] = useState(value);

  useEffect(() => {
    localStorage.getItem('settings') &&
      setSettings(JSON.parse(localStorage.getItem('settings')));
  }, []);

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

  return [settings, setSettings];
}
