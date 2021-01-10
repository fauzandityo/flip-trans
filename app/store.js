import { createStore, combineReducers } from "redux";
import transactionReducer from './redux/reducers/transactionReducer';

const appReducer = combineReducers({
    transaction: transactionReducer
});

const configureStore = () => createStore(appReducer);

export default configureStore;