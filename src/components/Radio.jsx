import { css } from 'styled-components';
import { label } from '@/styles/placeholders/label';
import { Div, Label } from './base';
import { colors, sizes } from '@/styles/settings/variables';

const styles = {
    root: css`
        & .radio-shape {
            width: 10px;
            height: 10px;
            margin-right: 6px;
            border: 1px solid ${colors.grey.whiteField.border};
            border-radius: 50%;
            background-color: ${props => (props.$checked ? colors.grey.common.main : colors.white)};
        }

        & .radio-label {
            font-size: ${sizes.textBase};
            font-weight: ${sizes.textBold};
        }

        &:hover {
            & .radio-shape {
                background-color: ${props => (props.$checked ? colors.grey.common.main : 'rgba(0,0,0,0.06)')};
            }
        }
    `
};

export default function Radio({ name, value, checked, labelText, onChange }) {
    return (
        <Div
            sx={styles.root}
            onClick={() => onChange({ target: { name, value } })}
            $checked={checked}
            className="d-flex"
        >
            <Div role="button" className="radio-shape" />
            <Label role="button" sx={label} className="radio-label">
                {labelText}
            </Label>
        </Div>
    );
}
