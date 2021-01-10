import { 
    GET_TRANSACTION,
    DETAIL_TRANSACTION,
    FILTER_TRANSACTION,
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
            })
            return {...state,
                transactionDetail: detail
            };
        case FILTER_TRANSACTION:
            let reg = new RegExp(action.key.toLowerCase(), "gi");
            let newList = state.transactionList.filter((item) => {
                let name = item.beneficiary_name.toLowerCase();
                let bank = item.beneficiary_bank.toLowerCase();
                let sBank = item.sender_bank.toLowerCase();
                let amount = item.amount.toString();

                return reg.test(name) ||
                    reg.test(bank) ||
                    reg.test(sBank) ||
                    reg.test(amount);
            });
            return {...state,
                transactionList: newList
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