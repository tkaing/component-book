import { z } from 'zod';
import { AddressBookReducerState } from './types';

export const initialState: AddressBookReducerState = {
    contacts: [],

    urlComp: '',
    searchTerm: '',
    datatableType: null,

    maxPage: 1,
    perPage: 10,
    currentPage: 1,

    currentSort: null,
    currentSortOrder: 'ASC'
};

export const AddressBookReducerAction = z.enum([
    'sort',
    'filter',
    'nextPage',
    'previousPage',
    'changePage',
    'toggleMaxPerPage',
    'setMaxPageAndContacts'
]);

export type AddressBookReducerActionType = z.infer<typeof AddressBookReducerAction>;

export const reducer = (
    state: AddressBookReducerState,
    action: { type: AddressBookReducerActionType; event: any, payload: any }
): AddressBookReducerState => {
    switch (action.type) {
        case 'sort': {
            const { columnSort } = action.payload;

            let currentSort = columnSort;
            let newSortOrder = 'ASC';

            if (columnSort === state.currentSort) {
                newSortOrder = state.currentSortOrder === 'ASC' ? 'DESC' : 'ASC';

                if (state.currentSortOrder === 'DESC') {
                    currentSort = null;
                }
            }

            return { ...state, currentPage: 1, currentSort, currentSortOrder: newSortOrder };
        }
        case 'filter': {
            const event = action.event;

            const newTerm = event.target.value;

            return state.searchTerm !== newTerm ? { ...state, searchTerm: newTerm, currentPage: 1 } : state;
        }
        case 'nextPage': {
            return state.currentPage < state.maxPage ? { ...state, currentPage: state.currentPage + 1 } : state;
        }
        case 'previousPage': {
            return state.currentPage > 1 ? { ...state, currentPage: state.currentPage - 1 } : state;
        }
        case 'changePage': {
            const event = action.event;

            const newPage = parseInt(event.target.value);

            const isValidPage = state.currentPage !== newPage && newPage > 0 && newPage <= state.maxPage;

            return isValidPage ? { ...state, currentPage: newPage } : state;
        }
        case 'toggleMaxPerPage': {
            const event = action.event;

            const newPerPage = parseInt(event.target.value);

            return { ...state, perPage: newPerPage };
        }
        case 'setMaxPageAndContacts': {
            const { maxPage, contacts } = action.payload;

            return { ...state, maxPage, contacts };
        }
        default:
            return state;
    }
};

export const addressBookReducerAction = AddressBookReducerAction.Enum;
