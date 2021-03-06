export const localStorageMiddleware = ({ getState }) => {
    return (next) => (action) => {
        const result = next(action);
        localStorage.setItem("settings", JSON.stringify(getState().settings));
        return result;
    };
};
