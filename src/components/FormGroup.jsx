import { css } from 'styled-components';

import { label } from '@/styles/placeholders/label';
import { colors, sizes } from '@/styles/settings/variables';
import { Div, Label, Span } from './base';

const styles = {
    errorText: css`
        display: block;
        color: ${colors.red};
        font-size: ${sizes.textDisplay};
        font-weight: ${sizes.textBold};
        margin-top: 3px;
    `
};

export default function FormGroup({ sx, error, labelText, children }) {
    return (
        <Div className="upl-form-group" sx={sx}>
            {labelText && <Label sx={label}>{labelText}</Label>}
            {children}
            {error && <Span sx={styles.errorText}>{error}</Span>}
        </Div>
    );
}
