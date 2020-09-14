
import { /* takeEvery, */ takeLatest, call, put, all } from 'redux-saga/effects'; // takeEvery listen for every action of a specific type that we pass to it.
// 'put' is the saga effect fro creating action like dispatch.

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import { fetchCollectionsSuccess,  fetchCollectionsFailure} from './shop.actions'

import ShopActionTypes from './shop.types';

export function* fetchCollectionsAsync() {

    try {
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot); // call() it is a method that takes as its first argument some function or methid and then the subsequent arguments will be the parameters that passed into this function. <=> onvertCollectionsSnapshotToMap(snapshot). 
        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message))
    };
};

export function* fetchCollectionsStart() {
    yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync);
};

export function* shopSagas() {
    yield all([call(fetchCollectionsStart)])
}