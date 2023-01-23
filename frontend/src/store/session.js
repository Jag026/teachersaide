import LessonPlan from '../components/LessonPlan';
import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const SET_LESSONPLAN = 'session/setLessonplan';
const REMOVE_LESSONPLAN = 'session/removeLessonplan';
const SET_TEST= 'session/setTest';
const REMOVE_TEST = 'session/setTest';

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const setLessonplan = (lessonplan) => {
    return {
      type: SET_LESSONPLAN,
      payload: lessonplan,
    };
  };

  const setTest = (test) => {
    return {
      type: SET_TEST,
      payload: test,
    };
  };

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

const removeLessonplan = () => {
    return {
      type: REMOVE_LESSONPLAN,
    };
  };

  const removeTest = () => {
    return {
      type: REMOVE_TEST
    };
  };

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
      case SET_LESSONPLAN:
        newState = Object.assign({}, state);
        newState.lessonplan = action.payload;
        return newState;
      case REMOVE_LESSONPLAN:
        newState = Object.assign({}, state);
        newState.lessonplan = null;
        return newState;
        case SET_TEST:
          newState = Object.assign({}, state);
          newState.test = action.payload;
          return newState;
        case REMOVE_TEST:
          newState = Object.assign({}, state);
          newState.test = null;
          return newState;
    default:
      return state;
  }
};

export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  };

  export const signup = (user) => async (dispatch) => {
    const { first_name, last_name, username, email, password } = user;
    const response = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        first_name,
        last_name,
        username,
        email,
        password,
      }),
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  };

  export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
      method: 'DELETE',
    });
    dispatch(removeUser());
    return response;
  };

  export const fetchLessonplan = (lessonplan) => async (dispatch) => {
    const { grade, subject } = lessonplan;
    const response = await csrfFetch("/api/lessons/get-lessonplan", {
      method: "POST",
      body: JSON.stringify({
        grade, 
        subject
      }),
    });
    const data = await response.json();
    dispatch(setLessonplan(data.lessonplan));
    return data.lessonplan;
  };

  export const fetchTest = (test) => async (dispatch) => {
    const { grade, subject, numberOfQuestions } = test;
    const response = await csrfFetch("/api/tests/get-test", {
      method: "POST",
      body: JSON.stringify({
        grade, 
        subject,
        numberOfQuestions
      }),
    });
    const data = await response.json();
    dispatch(setTest(data.test));
    return data.test;
  };

  export const addLessonplan = (lessonplan) => async (dispatch) => {
    const { planBody } = lessonplan;
    const response = await csrfFetch("/api/lessons", {
      method: "POST",
      body: JSON.stringify({
        planBody
      }),
    });
    const data = await response.json();
    return response;
  };

export default sessionReducer;