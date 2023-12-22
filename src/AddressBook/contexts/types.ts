import { Dispatch } from 'react';
import { AddressBookReducerActionType } from './AddressBookReducer';

export type AddressBookReducerState = {
    contacts: never[];
    urlComp: string;
    searchTerm: string;
    datatableType: null;
    maxPage: number;
    perPage: number;
    currentPage: number;
    currentSort: string | null;
    currentSortOrder: string;
};

export type AddressBookContextType = {
    states: AddressBookReducerState;
    actions: {
        dispatch: Dispatch<{
            type: AddressBookReducerActionType;
            payload: any;
        }>;
    };
};
