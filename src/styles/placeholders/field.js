import { css } from 'styled-components';
import { colors, sizes } from '../settings/variables';

export const whiteField = css`
    height: 32px;
    padding: 5px;
    border: 1px solid ${colors.grey.whiteField.border};
    border-radius: 8px;
    background-color: ${colors.white};
    box-sizing: border-box;
    text-align: center;

    &[type='number']::-webkit-inner-spin-button,
    &[type='number']::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

export const greyField = css`
    color: ${colors.grey.text.main};
    font-size: ${sizes.textBase};
    font-weight: ${sizes.textBold};
    border: 1px solid ${colors.grey.greyField.border};
    border-radius: 4px;
    background-color: ${colors.white90};
    letter-spacing: ${sizes.letterSpacingField};

    &:hover,
    &:focus {
        background-color: ${colors.white90};
    }

    &.form-control {
        &::placeholder {
            color: ${colors.grey.greyField.placeholder};
            font-weight: ${sizes.textNormal};
        }
    }
`;

export const radioGroup = css`
    display: flex;
    gap: 0 18px;
`;

export const autocomplete = css`
    & .rbt-input {
        ${greyField}
    }

    & .rbt-input.focus + .rbt-input-hint {
        display: none;
    }
`;
