import { 
    GET_TRANSACTION,
    DETAIL_TRANSACTION,
    SORT_TRANSACTION
} from "../actions/types";
import Helper from "../../libs/Helper";

const initalState = {
    transactionList: [],
    transactionDetail: {}
}

const transactionReducer = (state=initalState, action) => {
    switch (action.type) {
        case GET_TRANSACTION:
            return {...state,
                transactionList: action.data
            };
        case DETAIL_TRANSACTION:
            let detail = state.transactionList.filter((item) => {
                return item.id === action.id
            })[0];
            return {...state,
                transactionDetail: detail
            };
        case SORT_TRANSACTION:
            let key = action.key.split(" ");
            let sortedData = state.transactionList.sort(Helper.getSortOrder(key[0], key[1]));
            return {...state,
                transactionList:sortedData
            };
        default:
            return state;
    }
}

export default transactionReducer;