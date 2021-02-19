function CashFlowReducer(state, action) {

    if (typeof state === 'undefined') {
        return { zillowURL: '' };
    }

    switch (action.type) {
        case 'ZILLOW_PRICE_LOADING':
            state["price"] = "Loading..."
            return { ...state };
        case 'ZILLOW_PRICE_SUCCEEDED':
            state["zillowURL"] = action.zillowURL;
            state["price"] = action.price;
            return { ...state };
        default:
            return state
    }

}

export { CashFlowReducer };