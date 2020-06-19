import createDataContext from "./createDataContext";
import classificationApi from "../api/classification";

const classificationReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ERROR":
      return { ...state, errorMessage: action.payload };
    case "FETCHING_DETAILS":
      return {
        ...state,
        errorMessage: "",
        isLoading: true,
      };
    case "FETCHING_DETAILS_SUCCESS":
      return {
        ...state,
        errorMessage: "",
        isLoading: false,
      };
    case "GET_IMAGE_DETAILS":
      return {
        errorMessage: "",
        classification: action.payload,
      };

    default:
      return state;
  }
};

const getImageDetails = (dispatch) => async ({ url }) => {
  try {
    dispatch({ type: "FETCHING_DETAILS" });
    const response = await classificationApi.post("/imageurl", { url });
    dispatch({
      type: "GET_IMAGE_DETAILS",
      payload: response.data.classification,
    });
    dispatch({ type: "FETCHING_DETAILS_SUCCESS" });
  } catch (err) {
    console.log(err.response.data);
    dispatch({
      type: "ADD_ERROR",
      payload: err.response.data.error,
    });
  }
};

export const { Context, Provider } = createDataContext(
  classificationReducer,
  { getImageDetails },
  { isLoading: false, classification: null, errorMessage: "" }
);
