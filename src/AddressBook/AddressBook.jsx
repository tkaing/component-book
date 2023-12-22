import { useState } from 'react';
import { css } from 'styled-components';
import { Button, Div, Icon } from '@/components/base';

import AddModal from './AddModal';
import MainModal from './MainModal';
import { colors } from '@/styles/settings/variables';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';
import AddressBookProvider from './contexts/AddressBookContext';

const styles = {
    root: css`
        align-self: flex-end;
        padding-left: 5px;
    `,
    button: css`
        color: ${colors.white};
        width: 31px;
        height: 31px;
        padding: 0;
        border: none;
        background-color: ${colors.primary};
    `
};

export function AddressBook({ type, triggerButtonId = 'trigger-contacts' }) {
    const [addModalData, setAddModalData] = useState(null);
    const [mainModalData, setMainModalData] = useState(null);

    return (
        <AddressBookProvider>
            <Div sx={styles.root}>
                <Button
                    //id={`${triggerButtonId}-${type.toLowerCase()}`}
                    sx={styles.button}
                    type="button"
                    onClick={() => setMainModalData(true)}
                    data-type={type}
                    /* data-toggle="modal"
                    data-target="#contactsModal"
                    data-context-id="{{ contextId is defined ? contextId : 'default' }}" */
                >
                    <Icon icon={faAddressCard} />
                </Button>

                {!!mainModalData && (
                    <MainModal open onClose={() => setMainModalData(null)} setAddModalData={setAddModalData} />
                )}

                {!!addModalData && (
                    <AddModal
                        open
                        onClose={() => {
                            setAddModalData(null);
                            setMainModalData(true);
                        }}
                    />
                )}
            </Div>
        </AddressBookProvider>
    );
}
