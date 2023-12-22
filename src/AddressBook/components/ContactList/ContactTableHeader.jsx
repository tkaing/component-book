import { css } from 'styled-components';
import { Div, Icon } from '@/components/base';

import { label } from '@/styles/placeholders/label';
import translations from '@/AddressBook/translations.json';
import { colors, sizes } from '@/styles/settings/variables';
import { useAddressBook } from '@/AddressBook/contexts/AddressBookContext';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

const styles = {
    root: css`
        margin-bottom: 1rem;

        & .label {
            ${label}
            color: ${colors.black90};
            font-size: ${sizes.textBase};
            text-transform: uppercase;

            & .tablesort {
                cursor: pointer;
                display: flex;

                & svg {
                    margin-left: 6px;
                }
            }
        }
    `
};

export default function ContactTableHeader({}) {
    const {
        states: { currentSort, currentSortOrder },
        actions: { dispatch }
    } = useAddressBook();

    const sort = columnSort => dispatch({ type: 'sort', payload: { columnSort } });

    const sortIcon = <Icon icon={currentSortOrder === 'ASC' ? faCaretUp : faCaretDown} />;

    return (
        <Div sx={styles.root} className="row">
            <div className="col-lg-3 label">
                <div onClick={() => sort('fullname')} className="tablesort">
                    {translations.page3_modale_addressbook_header_name}
                    {currentSort === 'fullname' && sortIcon}
                </div>
            </div>

            <div className="col-lg-4 label">
                <div onClick={() => sort('company')} className="tablesort">
                    {translations.page3_modale_addressbook_header_company}
                    {currentSort === 'company' && sortIcon}
                </div>
            </div>

            <div className="col-lg-2 label">
                <div onClick={() => sort('city')} className="tablesort">
                    {translations.page3_modale_addressbook_header_city}
                    {currentSort === 'city' && sortIcon}
                </div>
            </div>

            <div className="col-lg-1 label">
                <div onClick={() => sort('country_code')} className="tablesort">
                    {translations.page3_modale_addressbook_header_country}
                    {currentSort === 'country_code' && sortIcon}
                </div>
            </div>

            <div className="col-lg-2 label text-center">{translations.page3_modale_addressbook_header_action}</div>
        </Div>
    );
}
