import {
    combineReducers
} from 'redux';

import currentPageData from './currentPageData';

// combines all reducers
export default combineReducers({
    currentPageData,
});