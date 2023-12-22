import _ from 'lodash';
import { css } from 'styled-components';

import Btn from '@/components/Btn';
import { Div } from '@/components/base';
import { label } from '@/styles/placeholders/label';
import { button } from '@/styles/placeholders/button';
import translations from '@/AddressBook/translations.json';
import { colors, sizes } from '@/styles/settings/variables';

const columnsMapping = {
    base: {
        page3_modale_addressbook_table_name: 'fullname',
        page3_modale_addressbook_table_company: 'company',
        page3_modale_addressbook_table_phone: 'phone',
        page3_modale_addressbook_table_email: 'email'
    },
    address: {
        page3_modale_addressbook_table_address1: 'address1',
        page3_modale_addressbook_table_address2: 'address2',
        page3_modale_addressbook_table_address3: 'address3'
    }
};

const selectContactButton = css`
    ${button}
    border-color: ${colors.grey.common.lighter};
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    background-color: ${colors.grey.common.lighter};
`;

const styles = {
    contactRow: css``,
    contactRowField: css`
        ${label}
        line-height: 18px;
        margin-bottom: 10px;

        & .label {
            font-weight: ${sizes.textBold};
            letter-spacing: ${props => (props.$large ? sizes.letterSpacingLarge : 'initial')};
            text-transform: ${props => (props.$large ? 'capitalize' : 'uppercase')};
        }

        & .value {
            font-size: ${sizes.textBase};
            margin-left: ${props => (props.$large ? '5px' : 0)};
        }
    `,
    contactRowFields: css`
        padding: 20px 15px 15px;
        border: 1px solid ${colors.white80};
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
    `
};

export default function ContactCard({ sx, contact, index, large = false }) {
    const renderValue = (contactField, translationKey) => {
        return (
            <Div sx={styles.contactRowField} key={`${contact.id}-${contactField}`} $large={large} className="row">
                <span className={`label ${!large ? 'col-4' : ''}`}>
                    {translations[translationKey]}
                    {large ? ':' : ''}
                </span>
                <span className={`value ${!large ? 'col-8' : ''}`}>{contact[contactField]}</span>
            </Div>
        );
    };

    const SelectContactButton = (
        <Btn sx={selectContactButton} data-id={contact.id} className="btn-block get-contact-info" data-index={index}>
            {_.capitalize(translations.page3_modale_addressbook_table_select_contact)}
        </Btn>
    );

    return (
        <Div sx={styles.contactRow.concat(sx)} key={contact.id} className={large ? 'col-12' : ''}>
            {large && (
                <>
                    <Div sx={styles.contactRowFields} className="row">
                        <Div className="col-6">
                            {Object.entries(columnsMapping.base).map(([translationKey, contactField]) =>
                                renderValue(contactField, translationKey)
                            )}
                        </Div>
                        <Div className="col-6">
                            {Object.entries(columnsMapping.address).map(([translationKey, contactField]) =>
                                renderValue(contactField, translationKey)
                            )}
                            <Div sx={styles.contactRowField} $large className="row">
                                <span className="label">
                                    {contact.postcode} {contact.city}, {contact.country_code}
                                </span>
                            </Div>
                        </Div>
                    </Div>

                    <Div className="row">{SelectContactButton}</Div>
                </>
            )}

            {!large && (
                <>
                    <Div sx={styles.contactRowFields}>
                        {Object.entries(Object.assign({}, columnsMapping.base, columnsMapping.address)).map(
                            ([translationKey, contactField]) => renderValue(contactField, translationKey)
                        )}
                    </Div>

                    {SelectContactButton}
                </>
            )}
        </Div>
    );
}
