import { forwardRef, useState } from 'react';

import _ from 'lodash';
import { css } from 'styled-components';

import B from '@/components/B';
import { Span } from '@/components/base';
import { label } from '@/styles/placeholders/label';
import citiesJSON from '@/AddressBook/cities.json';
import { colors } from '@/styles/settings/variables';
import { isProduction, requestCredentials } from '@/helpers/helper';
import { autocomplete } from '@/styles/placeholders/field';
import { AsyncTypeahead } from '@/components/base/override';

const SEARCH_URI = isProduction ? 'http://localhost:33000/async/get-cities' : 'https://api.github.com/search/users';

const styles = {
    renderedItem: css`
        ${label}
        text-transform: capitalize;
    `
};

const CityAutocomplete = forwardRef(({ countryId, placeholder, onSelectValue }, ref) => {
    const [term, setTerm] = useState('');
    const [options, setOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = query => {
        setIsLoading(true);

        const queryRest = isProduction ? `&country_id=${countryId}` : '+in:login&page=1&per_page=50';

        fetch(`${SEARCH_URI}?q=${query}${queryRest}`, { credentials: requestCredentials })
            .then(resp => resp.json())
            .then(result => {
                setTerm(query);
                setOptions(isProduction ? result : citiesJSON);
                setIsLoading(false);
            });
    };

    // Bypass client-side filtering by returning `true`. Results are already
    // filtered by the search endpoint, so no need to do it again.
    const filterBy = () => true;

    return (
        <AsyncTypeahead
            id="city-autocomplete"
            sx={autocomplete}
            ref={ref}
            options={options}
            labelKey="city"
            filterBy={filterBy}
            onSearch={handleSearch}
            onChange={selected => selected[0] && onSelectValue(selected[0])}
            minLength={3}
            isLoading={isLoading}
            placeholder={placeholder}
            renderMenuItemChildren={option => (
                <Span sx={styles.renderedItem}>
                    <B $color={colors.grey.text.lighter}>
                        {option.zip_code}, <B $color={colors.secondary}>{term}</B>
                        {option.city.substring(term.length).toLowerCase()}
                    </B>
                </Span>
            )}
        />
    );
});

export default CityAutocomplete;
