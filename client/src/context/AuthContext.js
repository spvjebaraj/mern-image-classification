import createDataContext from "./createDataContext";
import classificationApi from "../api/classification";

const authReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ERROR":
      return { ...state, errorMessage: action.payload };
    case "RESTORE_TOKEN":
      return {
        isAuthenticated: true,
        errorMessage: "",
        userToken: action.payload,
      };
    case "SIGN_IN":
    case "SIGN_UP":
      return {
        isAuthenticated: true,
        errorMessage: "",
        isSignout: false,
        userToken: action.payload,
      };
    case "SIGN_OUT":
      return {
        isAuthenticated: false,
        errorMessage: "",
        isSignout: true,
        userToken: null,
      };
    default:
      return state;
  }
};

const restoreToken = (dispatch) => (userToken) => {
  window.sessionStorage.setItem("userToken", userToken);
  dispatch({ type: "RESTORE_TOKEN", payload: userToken });
};

const signIn = (dispatch) => async ({ email, password }) => {
  try {
    const response = await classificationApi.post("/users/signin", {
      email,
      password,
    });
    window.sessionStorage.setItem("userToken", response.data.token);
    dispatch({ type: "SIGN_IN", payload: response.data.token });
  } catch (err) {
    dispatch({
      type: "ADD_ERROR",
      payload: err.response.data.error,
    });
  }
};

const signUp = (dispatch) => async ({ name, email, password }) => {
  try {
    const response = await classificationApi.post("/users/signup", {
      name,
      email,
      password,
    });

    window.sessionStorage.setItem("userToken", response.data.token);
    dispatch({ type: "SIGN_UP", payload: response.data.token });
  } catch (err) {
    let errorText = err.response.data.error;
    if (errorText.includes("duplicate")) {
      errorText = "Email already exists. Please choose different.";
    } else if (errorText.includes("minimum")) {
      errorText = "Password must be minimum of 7 characters";
    }

    dispatch({
      type: "ADD_ERROR",
      payload: errorText,
    });
  }
};

const signOut = (dispatch) => async () => {
  try {
    await classificationApi.post("/users/logout");
    window.sessionStorage.removeItem("userToken");
    dispatch({ type: "SIGN_OUT" });
  } catch (err) {
    dispatch({
      type: "ADD_ERROR",
      payload: err.response.data.error,
    });
  }
};

export const { Context, Provider } = createDataContext(
  authReducer,
  { restoreToken, signIn, signUp, signOut },
  {
    isAuthenticated: false,
    errorMessage: "",
    isSignout: false,
    userToken: null,
  }
);
