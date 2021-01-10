import {
    DETAIL_TRANSACTION,
    FILTER_TRANSACTION,
    GET_TRANSACTION,
    SORT_TRANSACTION
} from "./types";

export const getTransaction = (data) => (
    {
        type: GET_TRANSACTION,
        data: data
    }
);

export const filterTransaction = (key) => (
    {
        type: FILTER_TRANSACTION,
        key: key
    }
);

export const sortTransaction = (key) => (
    {
        type: SORT_TRANSACTION,
        key: key
    }
);

export const detailTransaction = (id) => (
    {
        type: DETAIL_TRANSACTION,
        id: id
    }
);