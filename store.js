const redux = require('redux');
const createStore = redux.createStore; // store를 사용하기 위해
const reduxLogger = require('redux-logger'); // reduxLogger
const applyMiddleware = redux.applyMiddleware; // 리덕스 middleware (리덕스 logger)를 사용하기위해
const logger = reduxLogger.createLogger();
const combineReducers = redux.combineReducers; // 여러개의 리듀서가 있을 때 루트 리듀서를 만든다.

//actions
//action-types
const ADD_SUBSCRIBER = 'ADD_SUBSCRIBER';
const ADD_VIEWCOUNT = 'ADD_VIEWCOUNT';
const addSubscriber = () => {
  return {
    type: 'ADD_SUBSCRIBER',
  };
};
const addViewCount = () => {
  return {
    type: 'ADD_VIEWCOUNT',
  };
};

//reducers
const subscriberState = {
  subscribers: 365,
};
const subscriberReducer = (state = subscriberState, action) => {
  switch (action.type) {
    case ADD_SUBSCRIBER:
      return {
        ...state, // 원본값을 훼손하면 안되기 때문에 , immutable한 값
        subscribers: state.subscribers + 1,
      };
    default:
      return state;
  }
};

const viewState = {
  viewCount: 100,
};

// reducer는 초기 상태와 action을 인자로 받아서 새로운 상태를 리턴하는 함수이다.
// 즉 ...state 스프레드 문법으로 원본의 값은 유지한 채로 state를 가져와서
// store에 저장되어있는 state값을 새로운 state로 반환하는 함수이다.
const viewReducer = (state = viewState, action) => {
  switch (action.type) {
    case ADD_VIEWCOUNT:
      return {
        ...state,
        viewCount: state.viewCount + 1, //
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  view: viewReducer,
  subscriber: subscriberReducer,
});
//store
const store = createStore(rootReducer, applyMiddleware(logger)); // 2번째 인자로 middleware를 넘길 수 있다.
//subscribe - view - dispatch

// store.subscribe(() => {
//   console.log('subscribe ==>', store.getState()); // subscribe를 이용해 state가 업데이트될때마다 store의 state를 콘솔로 찍어줌
// });

// console.log(store.getState()); // { subscribers: 365 }

// store.dispatch(addSubscriber()); // dispatch를 통해 action을 호출 -> reducer가 호출되면서 새로운 state를 반환 subscribe ==> { subscribers: 366 }
// store.dispatch(addSubscriber());
// store.dispatch(addSubscriber());
// store.dispatch(addSubscriber());
// store.dispatch(addSubscriber());
store.dispatch(addViewCount());
store.dispatch(addViewCount());
// console.log(store.getState()); // { subscribers: 366 } -> 반환된 새로운 state

/*
redux-logger 출력값 debugging 하기

action ADD_VIEWCOUNT @ 15:06:55.989  
    prev state { view: { viewCount: 100 }, subscriber: { subscribers: 365 } }   // view,subscriber 는 rootReducer의 키 
    action     { type: 'ADD_VIEWCOUNT' }
    next state { view: { viewCount: 101 }, subscriber: { subscribers: 365 } }
action ADD_VIEWCOUNT @ 15:06:55.997
    prev state { view: { viewCount: 101 }, subscriber: { subscribers: 365 } }
    action     { type: 'ADD_VIEWCOUNT' }
    next state { view: { viewCount: 102 }, subscriber: { subscribers: 365 } }
*/
