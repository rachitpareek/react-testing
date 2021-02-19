import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { getZillowPrice } from '../../services/api';

// wrapper function
function getResponseText(data) {
    return data.text().then(text => text);
}

// helper function
function extractPrice(text) {
    text = text.replaceAll(',', '');
    text = text.slice(text.indexOf("$"));
    text = text.replaceAll('$', '');
    var numbers = text.match(/\d+/g);
    return Number(numbers[0]);
}

// worker Saga: will be fired on ZILLOW_PRICE_REQUESTED actions
function* fetchZillowPrice(action) {
    try {
        yield put({ type: "ZILLOW_PRICE_LOADING" });
        const zillowURL = action.zillowURL;
        const data = yield call(getZillowPrice, zillowURL);
        var text = yield call(getResponseText, data);
        var price = yield call(extractPrice, text);
        yield put({ type: "ZILLOW_PRICE_SUCCEEDED", zillowURL, price });
    } catch (e) {
        yield put({ type: "ZILLOW_PRICE_FAILED", message: e.message });
    }
}

/*
  Starts fetchZillowPrice on each dispatched `ZILLOW_PRICE_REQUESTED` action.
  Allows concurrent fetches of Zillow Price.
*/
function* cashFlowSaga() {
    yield takeEvery("ZILLOW_PRICE_REQUESTED", fetchZillowPrice);
}

export default cashFlowSaga;
