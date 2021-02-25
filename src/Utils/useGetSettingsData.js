import { useEffect, useState } from "react";

const keySettings = 'savedSettings';

function useGetSettingsData(defaultSettings) {
  const [settings, setSettings] = useState(defaultSettings);

  useEffect(() => {
    const rawValue = localStorage.getItem(keySettings);
    if (rawValue) {
      setSettings(JSON.parse(rawValue));
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(keySettings, JSON.stringify(settings));
  }, [settings])

  return [
    settings,
    setSettings
  ];
}

export default useGetSettingsData;
