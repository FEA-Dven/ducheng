import * as UTIL from '@libs/util';

const initStore = {
    nickname: UTIL.getUserInfoFromCookie().nickname
}

export const actionTypes = {
    GETUSERINFO: 'INCREMENT',
    SETUSERINFO: 'DECREMENT',
    LOGOUT: 'LOGOUT'
}

// REDUCERS
export const userReducer = (state = initStore, action) => {
    switch (action.type) {
        case actionTypes.GETUSERINFO:
            return state
        case actionTypes.SETUSERINFO:
            return Object.assign({}, state, {
                ...state,
                ...action.userInfo
            })
        case actionTypes.LOGOUT:
            return {};
        default:
            return state
    }
}

// ACTIONS

export const setUserInfo = (userInfo) => dispatch => {
    return dispatch({ type: actionTypes.SETUSERINFO, userInfo })
}

export const getUserInfo = () => dispatch => {
    return dispatch({ type: actionTypes.GETUSERINFO })
}

export const logOut = () => dispatch => {
    dispatch({ type: actionTypes.LOGOUT })
    UTIL.clearUserInfoCookie();
    window.location.href = '/food/login';
}
