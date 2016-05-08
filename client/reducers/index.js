function rootReducer(state = {
    mobile: '',
    password: ''
}, action) {
    switch (action.type) {
    case 'MOBILE_NUMBER_ENTERED':
        return {
            ...state,
            mobile: action.number
        };
    default:
        return state;
    }
}

export default rootReducer;
