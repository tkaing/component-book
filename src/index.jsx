import '@fontsource-variable/montserrat';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'intl-tel-input/build/css/intlTelInput.css';

import { AddressBook } from './AddressBook';

if (document.getElementById('address-book')) {
    ReactDOM.createRoot(document.getElementById('address-book')).render(
        React.createElement(AddressBook, {
            type: 'from'
        })
    );
}

export * from './AddressBook';
