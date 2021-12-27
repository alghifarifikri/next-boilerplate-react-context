export const initialState = {};

export const reducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case "SET":
      return { ...state, ...payload };
    case "CLEAR":
      return initialState;
    default:
      return state;
  }
};
