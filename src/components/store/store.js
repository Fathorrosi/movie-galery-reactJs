import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const globalState = {
  listMovie: [],
  title: '',
  filterDate: '',
  page: 1,
  pageState: 'favorite',
  suggest: []
}

// Reducer 
const rootRecucer = (state = globalState, action) => {
  if (action.type === 'GET_MOVIE') {
    return {
      ...state,
      listMovie: action.data,
    }
  } if (action.type === 'SEARCH_MOVIE') {
    console.log(action.pageState)
    return {
      ...state,
      listMovie: action.data,
      pageState: action.pageState
    }
  } if (action.type === 'SET_TITLE') {
    console.log(action.data)
    console.log(action.suggest)
    return {
      ...state,
      title: action.data,
      suggest: action.suggest
    }
  } if (action.type === 'SET_DATE') {
    return {
      ...state,
      filterDate: action.data
    }
  } if (action.type === 'UPDATE_PAGE') {
    let tempPage;
    action.isNewSearch ? tempPage = 1 : tempPage = state.page + 1
    return {
      ...state,
      page: tempPage
    }
  } 

  return state;
}

// Store
export const storeRedux = createStore(rootRecucer, applyMiddleware(thunk))