import { css } from 'styled-components';
import { Accordion, useAccordionButton } from 'react-bootstrap';

import Header from './ContactTableHeader';
import { colors, sizes } from '@/styles/settings/variables';
import ContactCard from './ContactCard';
import { Div, Icon } from '@/components/base';
import { useAddressBook } from '../../contexts/AddressBookContext';
import { faCheck, faSearch } from '@fortawesome/free-solid-svg-icons';

const styles = {
    root: css``,
    contactRow: css``,
    contactCard: css`
        width: 100%;
        margin-bottom: 20px;
    `,
    accordionToggle: css`
        color: ${colors.grey.text.main};
        font-size: ${sizes.textSmall};
        line-height: 3rem;
        letter-spacing: ${sizes.letterSpacingLarge};
        border: 2px solid ${colors.white};
        border-radius: 8px;
        background-color: ${colors.white90};
    `,
    accordionToggleIcons: css`
        & svg {
            color: ${colors.grey.text.lighter};
            font-size: 15px;

            &:not(:last-child) {
                margin-right: 10px;
            }
        }
    `
};

function AccordionToggle({ eventKey, children, className }) {
    const decoratedOnClick = useAccordionButton(eventKey, () => console.log('totally custom!'));

    return (
        <Div sx={styles.accordionToggle} role="button" onClick={decoratedOnClick} className={className}>
            {children}
        </Div>
    );
}

export default function ContactTable() {
    const {
        states: { contacts }
    } = useAddressBook();

    return (
        <Div sx={styles.root}>
            <Header />
            <Accordion>
                {contacts.map((contact, index) => (
                    <Div key={contact.id} sx={styles.contactRow}>
                        <AccordionToggle eventKey={String(index)} className="row">
                            <div className="col-lg-3">{contact.fullname}</div>
                            <div className="col-lg-4">{contact.company}</div>
                            <div className="col-lg-2">{contact.city}</div>
                            <div className="col-lg-1">{contact.country_code}</div>
                            <Div className="col-lg-2 text-center btn-action-contact" sx={styles.accordionToggleIcons}>
                                <Icon icon={faSearch} />
                                <Icon icon={faCheck} className="get-contact-info" />
                            </Div>
                        </AccordionToggle>

                        <Accordion.Collapse eventKey={String(index)} className="row accordion-content" timeout={300}>
                            <ContactCard sx={styles.contactCard} index={index} contact={contact} large />
                        </Accordion.Collapse>
                    </Div>
                ))}
            </Accordion>
        </Div>
    );
}
