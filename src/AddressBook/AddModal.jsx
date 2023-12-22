import { useEffect, useMemo, useRef, useState } from 'react';

import { css } from 'styled-components';
import intlTelInput from 'intl-tel-input';

import Btn from '@/components/Btn';
import Radio from '@/components/Radio';
import UplModal from '@/components/UplModal';
import FormGroup from '@/components/FormGroup';
import { button } from '@/styles/placeholders/button';
import useFormValidation from '@/hooks/useFormValidation';
import { buildInputEvent, requestCredentials } from '@/helpers/helper';
import { greyField, radioGroup } from '@/styles/placeholders/field';
import { Div, Input, Select, TextArea } from '@/components/base';

import countries from './countries.json';
import translations from './translations.json';
import CityAutocomplete from './components/CityAutocomplete';
import { contactFormSchema } from './models/ContactFormModel';

const styles = {
    modalContent: css`
        & .row {
            & .upl-form-group {
                margin-bottom: 10px;
            }
        }

        & .row.address-lines {
            & .upl-form-group {
                margin-bottom: 5px;
            }
        }
    `,
    proContainer: css`
        margin-top: 10px;
    `,
    phoneContainer: css`
        & .iti--allow-dropdown {
            width: 100%;
        }
    `
};

const nullableFields = {
    company: null,
    address2: null,
    address3: null,
    customer_code: null,
    notes: null
};

const initialForm = {
    lastname: '',
    pro: true,
    phone: '',
    email: '',
    address1: '',
    country_code: 'FR',
    city: '',
    postcode: '',
    ...nullableFields
};

export default function AddModal({ open, onClose }) {
    const cityRef = useRef();

    const phoneRef = useRef();

    const [form, setForm] = useState(initialForm);

    const { errors, handleSubmit, resetValidation } = useFormValidation({
        form: form,
        schema: contactFormSchema
    });

    const handleFormSubmit = () => {
        const baseUrl = 'http://localhost:33000/contact/save/json';

        const payload = { id: null, ...form };

        fetch(`${baseUrl}`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
            credentials: requestCredentials
        })
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log('error', error))
            .finally(() => {
                // Reset form + Close modal
                resetValidation();
                setForm(initialForm);
                onClose();
            });
    };

    const handleInputChange = event => {
        const {
            target: { name, value }
        } = event;

        let finalValue = value;

        const isNullableField = Object.keys(nullableFields).includes(name);

        if (isNullableField && value === '') {
            finalValue = null;
        }

        setForm(prev => ({ ...prev, [name]: finalValue }));
    };

    useEffect(() => {
        if (phoneRef.current) {
            intlTelInput(phoneRef.current, {
                utilsScript: 'https://cdn.jsdelivr.net/npm/intl-tel-input@16.0.0/build/js/utils.js',
                initialCountry: 'FR',
                preferredCountries: ['FR']
            });
        }
    }, [phoneRef.current]);

    const currentCountryId = useMemo(() => {
        const matchingCountry = countries.find(country => country.value === form.country_code);
        return matchingCountry?.id;
    }, [form.country_code]);

    const inputProps = { onChange: handleInputChange };

    return (
        <UplModal id="addContactsModal" open={open} onClose={onClose} heading={translations.cs_contacts_add}>
            <Div sx={styles.modalContent} className="mt-4">
                {/* Name */}
                <Div className="row">
                    <Div className="col-12">
                        <FormGroup labelText="Nom complet*" error={errors.lastname}>
                            <Input
                                sx={greyField}
                                name="lastname"
                                value={form.lastname || ''}
                                className="form-control"
                                placeholder={translations.contact_form_name_placeholder}
                                {...inputProps}
                            />
                        </FormGroup>
                    </Div>
                </Div>

                {/* Pro + Company */}
                <Div className="row">
                    <Div className="col-12 col-sm-6">
                        <FormGroup sx={styles.proContainer} error={errors.pro}>
                            <Div sx={radioGroup}>
                                <Radio
                                    name="pro"
                                    value={false}
                                    checked={form.pro === false}
                                    labelText={translations.pricer_from_residential}
                                    {...inputProps}
                                />
                                <Radio
                                    name="pro"
                                    value={true}
                                    checked={form.pro === true}
                                    labelText={translations.pricer_from_pro}
                                    {...inputProps}
                                />
                            </Div>
                        </FormGroup>
                    </Div>
                    <Div className="col-12 col-sm-6">
                        <FormGroup labelText="Société" error={errors.company}>
                            <Input
                                sx={greyField}
                                name="company"
                                value={form.company || ''}
                                className="form-control"
                                placeholder={translations.contact_form_company}
                                {...inputProps}
                            />
                        </FormGroup>
                    </Div>
                </Div>

                {/* Phone + Email */}
                <Div className="row">
                    <Div className="col-12 col-sm-6">
                        <FormGroup sx={styles.phoneContainer} error={errors.phone} labelText="Téléphone*">
                            <Input
                                sx={greyField}
                                ref={phoneRef}
                                name="phone"
                                value={form.phone || ''}
                                className="form-control"
                                {...inputProps}
                            />
                        </FormGroup>
                    </Div>
                    <Div className="col-12 col-sm-6">
                        <FormGroup labelText="Email*" error={errors.email}>
                            <Input
                                sx={greyField}
                                name="email"
                                value={form.email || ''}
                                className="form-control"
                                placeholder={translations.popup_login_email_placeholder}
                                {...inputProps}
                            />
                        </FormGroup>
                    </Div>
                </Div>

                {/* Address Lines */}
                <Div className="row address-lines">
                    <Div className="col-12">
                        <FormGroup error={errors.address1} labelText="Adresse*">
                            <Input
                                sx={greyField}
                                name="address1"
                                value={form.address1 || ''}
                                className="form-control"
                                placeholder={translations.contact_form_address_1_placeholder}
                                {...inputProps}
                            />
                        </FormGroup>
                        <FormGroup error={errors.address2}>
                            <Input
                                sx={greyField}
                                name="address2"
                                value={form.address2 || ''}
                                className="form-control"
                                placeholder={translations.contact_form_address_2_placeholder}
                                {...inputProps}
                            />
                        </FormGroup>
                        <FormGroup error={errors.address3}>
                            <Input
                                sx={greyField}
                                name="address3"
                                value={form.address3 || ''}
                                className="form-control"
                                placeholder={translations.contact_form_address_3_placeholder}
                                {...inputProps}
                            />
                        </FormGroup>
                    </Div>
                </Div>

                {/* Country + City */}
                <Div className="row">
                    <Div className="col-12 col-sm-6">
                        <FormGroup labelText="Pays*" error={errors.country_code}>
                            <Select
                                sx={greyField}
                                name="country_code"
                                value={form.country_code}
                                className="form-control"
                                onChange={event => {
                                    handleInputChange(event);
                                    handleInputChange(buildInputEvent('city', ''));
                                    handleInputChange(buildInputEvent('postcode', ''));

                                    cityRef.current?.clear();
                                }}
                            >
                                {countries.map(country => (
                                    <option
                                        key={[country.id, country.preferred ? 'preferred' : 'initial']
                                            .filter(Boolean)
                                            .join('-')}
                                        value={country.value}
                                    >
                                        {country.label}
                                    </option>
                                ))}
                            </Select>
                        </FormGroup>
                    </Div>
                    <Div className="col-12 col-sm-6">
                        <FormGroup labelText="Ville*" error={errors.city}>
                            {!!currentCountryId && (
                                <CityAutocomplete
                                    ref={cityRef}
                                    countryId={currentCountryId}
                                    placeholder={translations.contact_form_city_placeholder}
                                    onSelectValue={newValue => {
                                        handleInputChange(buildInputEvent('city', newValue.city));
                                        handleInputChange(buildInputEvent('postcode', newValue.zip_code));
                                    }}
                                />
                            )}
                        </FormGroup>
                    </Div>
                </Div>

                {/* Zip code + Customer code */}
                <Div className="row">
                    <Div className="col-12 col-sm-6">
                        <FormGroup labelText="Code Postal*" error={errors.postcode}>
                            <Input
                                sx={greyField}
                                name="postcode"
                                value={form.postcode || ''}
                                className="form-control"
                                placeholder={translations.contact_form_zipcode_placeholder}
                                {...inputProps}
                            />
                        </FormGroup>
                    </Div>
                    <Div className="col-12 col-sm-6">
                        <FormGroup labelText="Code client" error={errors.customer_code}>
                            <Input
                                sx={greyField}
                                name="customer_code"
                                value={form.customer_code || ''}
                                className="form-control"
                                placeholder={translations.cs_contact_ref_placeholder}
                                {...inputProps}
                            />
                        </FormGroup>
                    </Div>
                </Div>

                {/* Notes */}
                <Div className="row">
                    <Div className="col-12">
                        <FormGroup labelText="Remarques" error={errors.notes}>
                            <TextArea
                                sx={greyField}
                                name="notes"
                                value={form.notes || ''}
                                className="form-control"
                                placeholder={translations.contact_form_address_infos}
                                {...inputProps}
                            />
                        </FormGroup>
                    </Div>
                </Div>

                {/* Actions */}
                <Div className="d-flex flex-column flex-lg-row justify-content-end mt-4">
                    <Btn sx={button} $bold $outline onClick={onClose}>
                        {translations.cs_contacts_popup_delete_notok}
                    </Btn>
                    <Btn
                        sx={button}
                        $bold
                        onClick={() => handleSubmit(handleFormSubmit)}
                        className="mt-2 px-5 py-2 mt-lg-0 ml-lg-2"
                    >
                        {translations.cs_contacts_validate}
                    </Btn>
                </Div>
            </Div>
        </UplModal>
    );
}
