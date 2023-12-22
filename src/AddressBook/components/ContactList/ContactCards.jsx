import { css } from 'styled-components';
import { Div } from '@/components/base';
import ContactCard from './ContactCard';
import { useAddressBook } from '../../contexts/AddressBookContext';

const styles = {
    row: css`
        margin-bottom: 20px;
    `
};

export default function ContactCards({}) {
    const {
        states: { contacts }
    } = useAddressBook();

    return (
        <Div>
            {contacts.map((contact, index) => (
                <ContactCard sx={styles.row} key={contact.id} index={index} contact={contact} />
            ))}
        </Div>
    );
}
