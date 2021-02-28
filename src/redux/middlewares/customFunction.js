function createCustomFunctionMiddleware(extraArgument) {
    return ({ dispatch, getState }) => next => action => {
      if (typeof action === "function") {
        return action(dispatch, getState, extraArgument);
      }
  
      return next(action);
    };
  }
  
  const customFunction = createCustomFunctionMiddleware();
  customFunction.withExtraArgument = createCustomFunctionMiddleware;
  
  export default customFunction;
  