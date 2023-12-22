import { createContext, useContext, useEffect, useReducer } from 'react';

import contactsJSON from '../contacts.json';
import { isProduction, requestCredentials } from '@/helpers/helper';
import { initialState, reducer } from './AddressBookReducer';

export const AddressBookContext = createContext({});

/** @returns {import('./types').AddressBookContextType} */
export const useAddressBook = () => useContext(AddressBookContext);

export default function AddressBookProvider({ children }) {
    const [states, dispatch] = useReducer(reducer, initialState);

    const fetchAddressBook = () => {
        const params = {
            perPage: states.perPage,
            currentPage: states.currentPage
        };

        if ((states.searchTerm || '').length > 0) {
            params.searchTerm = encodeURI(states.searchTerm);
        }

        if ((states.currentSort || '').length > 0) {
            params.sort = states.currentSort;
            params.sortOrder = states.currentSortOrder;
        }

        let urlQueryParams = String(new URLSearchParams(params));

        if ((states.urlComp || '').length > 0) {
            urlQueryParams += states.urlComp;
        }

        const baseUrl = 'http://localhost:33000/contacts';

        if (isProduction) {
            const requestOptions = {
                method: 'GET',
                redirect: 'follow',
                credentials: requestCredentials
            };

            fetch(`${baseUrl}?${urlQueryParams}`, requestOptions)
                .then(response => response.json())
                .then(result =>
                    dispatch({
                        type: 'setMaxPageAndContacts',
                        payload: {
                            maxPage: result.maxPage,
                            contacts: result.contacts
                        }
                    })
                )
                .catch(error => console.log('error', error));
        } else {
            const randomInt = Math.floor(Math.random() * contactsJSON.length) + 1;

            dispatch({
                type: 'setMaxPageAndContacts',
                payload: {
                    maxPage: 1,
                    contacts: contactsJSON.slice(0, randomInt)
                }
            });
        }
    };

    useEffect(() => {
        fetchAddressBook();
    }, [states.searchTerm, states.currentPage, states.currentSort, states.currentSortOrder, states.perPage]);

    return (
        <AddressBookContext.Provider value={{ states, actions: { dispatch } }}>{children}</AddressBookContext.Provider>
    );
}
