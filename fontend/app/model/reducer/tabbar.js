const initStore = {
    selectIndex: '0'
}

export const actionTypes = {
    CHANGESELECTINDEX: 'CHANGESELECTINDEX',
    GETSELECTINDEX: 'GETSELECTINDEX'
}

// REDUCERS
export const tabbarReducer = (state = initStore, action) => {
    switch (action.type) {
        case actionTypes.CHANGESELECTINDEX:
            return Object.assign({}, state, {
                selectIndex: action.selectIndex
            })
        default:
            return state
    }
}

// ACTIONS
export const changeSelectIndex = (index) => dispatch => {
    return dispatch({ type: actionTypes.CHANGESELECTINDEX, selectIndex: index })
}

export const getSelectIndex = () => dispatch => {
    return dispatch({ type: actionTypes.GETSELECTINDEX })
}

