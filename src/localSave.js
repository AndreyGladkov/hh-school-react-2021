export const USERNAME = 'userName';
export const REPOSITORY = 'repository';
export const BLACKLIST = 'blacklist';

export function getSettings() {
    let settings = {};
    let user = localStorage.getItem(USERNAME);
    let repo = localStorage.getItem(REPOSITORY);
    let blacklist = localStorage.getItem(BLACKLIST);
    if (user == null) {
        setNullSettings();
    }
    settings.user = user ? user : 'Pre77';
    settings.repo = repo ? repo : 'https://github.com/Pre77/hh-school-react-2021';
    settings.blacklist = blacklist ? JSON.parse(blacklist) : [];
    return settings;
}
export function setSettings(settings) {
    if (settings.user) localStorage.setItem(USERNAME, settings.user);
    if (settings.repo) localStorage.setItem(REPOSITORY, settings.repo);
    if (settings.blacklist) localStorage.setItem(BLACKLIST, JSON.stringify(settings.blacklist));
    return;
}
export function setNullSettings() {
    localStorage.setItem(USERNAME, 'Pre77');
    localStorage.setItem(REPOSITORY, 'https://github.com/Pre77/hh-school-react-2021');
    localStorage.setItem(BLACKLIST, JSON.stringify([]));
}