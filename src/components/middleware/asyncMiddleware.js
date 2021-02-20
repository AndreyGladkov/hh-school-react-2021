function createAsyncMiddleware(extraArgument) {
    return ({ dispatch, getState }) => (next) => (action) => {
        if (typeof action === "function") {
            return action(dispatch, getState, extraArgument);
        }
        return next(action);
    };
}

const asyncMiddleware = createAsyncMiddleware();
asyncMiddleware.withExtraArgument = createAsyncMiddleware;

export default asyncMiddleware;
