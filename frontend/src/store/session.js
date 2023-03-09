import LessonPlan from '../components/LessonPlan';
import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const SET_LESSONPLAN = 'session/setLessonplan';
const REMOVE_LESSONPLAN = 'session/removeLessonplan';
const SET_LESSONS = 'session/setLessons';
const REMOVE_LESSONS = 'session/removeLessons';
const SET_TEST= 'session/setTest';
const REMOVE_TEST = 'session/setTest';
const SET_BLOGPOST= 'session/setBlogpost';
const REMOVE_BLOGPOST = 'session/setBlogpost';
const SET_WORKSHEET = 'session/setTest';
const REMOVE_WORKSHEET = 'session/setTest';

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

  const setWorksheet = (worksheet) => {
    return {
      type: SET_WORKSHEET,
      payload: worksheet,
    };
  };

  const setBlogpost = (blogpost) => {
    return {
      type: SET_BLOGPOST,
      payload: blogpost,
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

  const removeWorksheet = () => {
    return {
      type: REMOVE_WORKSHEET
    };
  };

  const setLessons = (lessons) => {
    return {
      type: SET_LESSONS,
      payload: lessons,
    };
  };

  const removeLessons = () => {
    return {
      type: REMOVE_LESSONS
    };
  };

  const removeBlogpost = () => {
    return {
      type: REMOVE_BLOGPOST
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
        case SET_WORKSHEET:
          newState = Object.assign({}, state);
          newState.worksheet = action.payload;
          return newState;
        case REMOVE_WORKSHEET:
          newState = Object.assign({}, state);
          newState.worksheet = null;
          return newState;
        case SET_LESSONS:
          newState = Object.assign({}, state);
          newState.lessons = action.payload;
          return newState;
        case REMOVE_LESSONS:
          newState = Object.assign({}, state);
          newState.lessons = null;
          return newState;
        case SET_BLOGPOST:
          newState = Object.assign({}, state);
          newState.blogpost = action.payload;
          return newState;
        case REMOVE_BLOGPOST:
          newState = Object.assign({}, state);
          newState.blogpost = null;
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
    const { recaptchaResponse, first_name, last_name, username, email, password } = user;
    const response = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        recaptchaResponse,
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
      timeout: 1000, // 5 seconds timeout
    });
    const data = await response.json();
    dispatch(setLessonplan(data.lessonplan));
    return data.lessonplan;
  };

  
  export const fetchWorksheet = (worksheet) => async (dispatch) => {
    const response = await csrfFetch("/api/lessons/get-submittedPromptId", {
      method: "GET",
    });
    const data = await response.json();
    dispatch(setWorksheet(data.response['response']));
    return data.response['response'];
  };


export const createWorksheet = (worksheet) => async (dispatch) => {
  const { grade, subject, topic, worksheetType, selectedOptions } = worksheet;;
  const response = await csrfFetch('/api/lessons/get-db-worksheet', {
    method: "POST",
    body: JSON.stringify({
      grade,
      subject,
      topic,
      worksheetType,
      selectedOptions,
    }),
  });
  if (response.status === 200) {
    // Wait for lesson plan to be generated and stored in database
    return 'success'
  } else {
    return 'failed'
  }
};


  export const fetchLessonplanTeks = (lessonplan) => async (dispatch) => {
    removeLessonplan();
    const { grade, knowledge, skill } = lessonplan;
    const response = await csrfFetch("/api/lessons/get-lessonplan-tek", {
      method: "POST",
      body: JSON.stringify({
        grade,
        knowledge, 
        skill
      }),
      timeout: 1000, // 5 seconds timeout
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

  export const restoreLessons = () => async dispatch => {
    const response = await csrfFetch("/api/lessons/lessonplans", {
      method: "GET"
    });
    const data = await response.json();
    console.log(data);
    return response;
  };

  export const addTest = (test) => async (dispatch) => {
    const { testBody } = test;
    const response = await csrfFetch("/api/tests", {
      method: "POST",
      body: JSON.stringify({
        testBody
      }),
    });
    const data = await response.json();
    return response;
  };

  export const restoreTests = () => async dispatch => {
    const response = await csrfFetch("/api/tests/", {
      method: "GET"
    });
    const data = await response.json();
    console.log(data);
    return response;
  };

  export const addBlogpost = (blogpost) => async (dispatch) => {
    const {         
      slug, 
      title, 
      description, 
      content, 
      ogTitle, 
      ogDescription, 
      ogImage, 
      canonicalUrl, 
      author, 
      categories,
      featuredImage, 
      tags,
      password } = blogpost;
    const response = await csrfFetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        slug, 
        title, 
        description, 
        content, 
        ogTitle, 
        ogDescription, 
        ogImage, 
        canonicalUrl, 
        author, 
        categories,
        featuredImage, 
        tags,
        password
      }),
    });
    const data = await response.json();
    return response;
  };


export default sessionReducer;