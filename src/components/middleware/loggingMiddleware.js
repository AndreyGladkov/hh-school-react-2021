export const loggingMiddleware = ({dispatch, getState}) => next => action => {
    if (action.type && action.payload) {
        console.log("ACTION_TYPE: ", action.type)
        console.log("ACTION_PAYLOAD: ", action.payload)
    }
    return next(action)
}