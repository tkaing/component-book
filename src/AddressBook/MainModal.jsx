import _ from 'lodash';
import { css } from 'styled-components';
import { Div, Icon, Input, Select } from '@/components/base';

import Btn from '@/components/Btn';
import UplModal from '@/components/UplModal';
import { button } from '@/styles/placeholders/button';
import ContactList from './components/ContactList/ContactList';
import BigIconField from '@/components/BigIconField';
import { fontBody } from '@/styles/placeholders/fontBody';
import translations from '@/AddressBook/translations.json';
import { whiteField } from '@/styles/placeholders/field';
import { colors, sizes } from '@/styles/settings/variables';
import { useAddressBook } from './contexts/AddressBookContext';
import { faAngleLeft, faAngleRight, faSearch, faUserPlus } from '@fortawesome/free-solid-svg-icons';

const styles = {
    addButton: css`
        & svg {
            margin-right: 6px;
        }
    `,
    paginationFooter: css`
        ${fontBody}
        color: ${colors.grey.text.main};
    `,
    perPageSelect: css`
        width: 70px;
        margin-left: 8px;
    `,
    currentPageInput: css`
        width: 40px;
        margin: 0 8px;
    `,
    currentPageArrowButton: css`
        font-size: ${sizes.textBase};
    `
};

export default function MainModal({ open, onClose, setAddModalData }) {
    const {
        states: { maxPage, perPage, currentPage },
        actions: { dispatch }
    } = useAddressBook();

    const handleOpenAddModal = () => {
        onClose();
        setAddModalData(true);
    };

    return (
        <UplModal
            id="contactsModal"
            open={open}
            onClose={onClose}
            heading={translations['page3_modale_addressbook_title']}
        >
            {/* --- Search Bar + Add Contact --- */}
            <div className="row mt-2">
                <div className="col-lg-5 col-12 mb-2 order-lg-2">
                    <Btn
                        sx={button.concat(styles.addButton)}
                        onClick={handleOpenAddModal}
                        className="btn float-right btn-block"
                    >
                        <Icon icon={faUserPlus} />
                        {_.capitalize(translations['page3_modale_addressbook_add_contact'])}
                    </Btn>
                </div>
                <div className="col-lg-7 col-12 order-lg-1">
                    <div className="form-group">
                        <BigIconField
                            icon={faSearch}
                            onKeyUp={event => dispatch({ type: 'filter', event })}
                            placeholder="Rechercher par société, nom, ville, ..."
                        />
                    </div>
                </div>
            </div>

            {/* --- Contact List --- */}
            <div className="row mt-3">
                <div className="col-md-12" id="table-container">
                    <ContactList />
                </div>
            </div>

            {/* --- Pagination footer --- */}
            <Div className="row mt-4" sx={styles.paginationFooter}>
                {/* Per page */}
                <div className="col-12 col-lg-6 mt-3 mt-lg-2 order-1 order-lg-0">
                    <div className="pagination text-center text-lg-left d-block">
                        {_.capitalize(translations['base_results_per_page'])}
                        <Select
                            sx={whiteField.concat(styles.perPageSelect)}
                            value={perPage}
                            onChange={event => dispatch({ type: 'toggleMaxPerPage', event })}
                            className="page_input"
                        >
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="1000">1000</option>
                        </Select>
                    </div>
                </div>

                {/* Page Navigation */}
                <div className="col-12 col-lg-6 mt-2 order-0 order-lg-1">
                    <div className="pagination text-center text-lg-right d-block">
                        <Btn
                            sx={styles.currentPageArrowButton}
                            onClick={currentPage > 1 ? () => dispatch({ type: 'previousPage' }) : undefined}
                            disabled={currentPage <= 1}
                        >
                            <Icon icon={faAngleLeft} />
                        </Btn>
                        {_.capitalize(translations['page_label1'])}
                        <Input
                            sx={whiteField.concat(styles.currentPageInput)}
                            type="number"
                            name="current_page"
                            value={currentPage || 4}
                            onChange={event => dispatch({ type: 'changePage', event })}
                            className="page_input"
                        />
                        <span>
                            {translations['page_label2']} {maxPage}
                        </span>
                        <Btn
                            sx={styles.currentPageArrowButton}
                            onClick={currentPage < maxPage ? () => dispatch({ type: 'nextPage' }) : undefined}
                            disabled={currentPage >= maxPage}
                        >
                            <Icon icon={faAngleRight} />
                        </Btn>
                    </div>
                </div>
            </Div>
        </UplModal>
    );
}
