import { csrfFetch } from "./csrf";

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};




export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/session/currentUser");

  const data = await response.json();
  // console.log("restore", data);
  if (Object.values(data).length > 0) {
    dispatch(setUser(data));
    return response;
  } else {
    dispatch(setUser(null));
    return response;
  }
};

// export const restoreUser = () => async dispatch => {
//     const res = await csrfFetch('/api/session/currentUser');
//     const data = await res.json();

//     dispatch(setUser(data))
//     return res
// }

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password,
    }),
  });
//   if (response.ok) {
    const data = {}
    data.user = await response.json();
    // console.log("res",response)
    dispatch(setUser(data.user));
    return response
//   }
//   else{
//     // dispatch(setUser(data));

//       return response;
//   }
};

export const signup = (user) => async (dispatch) => {
  const {
    email,
    password,
    username,
    firstName,
    lastName,
    isArtist,
    previewImage,
  } = user;
  const res = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      username,
      firstName,
      lastName,
      isArtist,
      previewImage,
    }),
  });
  // if(res.ok){
  const data = await res.json();
  // console.log(data)
  dispatch(setUser(data));
  return res;
};
//}

export const logout = () => async (dispatch) => {
  const response = await csrfFetch("/api/session/logout", {
    method: "DELETE",
  });
  dispatch(removeUser());
  // console.log(response)
  return response;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER: {
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    }
    case REMOVE_USER: {
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    }
    default:
      return state;
  }
};

export default sessionReducer;
