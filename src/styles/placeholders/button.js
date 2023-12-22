import { css } from 'styled-components';
import { colors, sizes } from '../settings/variables';
import { fontFamily, transition } from '../settings/mixins';

const bold = css`
    font-weight: ${sizes.textBold};
`;

const outline = css`
    color: ${colors.primary};
    border-color: transparent;
    background-color: ${colors.white};

    &:hover,
    &:focus {
        color: ${colors.primary};
        border-color: transparent;
        background-color: ${colors.white};
        text-decoration: underline;
    }
`;

export const button = css`
    ${transition()}
    ${fontFamily('body')}
    
    appearance: none;
    background-color: ${colors.primary};
    display: inline-block;
    padding: 7px 22px;
    border: 1px solid ${colors.primary};
    border-radius: ${sizes.radiusBtn};
    color: ${colors.white};
    font-size: ${sizes.textBtn};
    text-decoration: none;
    letter-spacing: ${sizes.letterSpacingButton};
    cursor: pointer;

    &:hover {
        background-color: ${colors.primary};
        border-color: ${colors.primary};
        color: ${colors.white};
    }

    ${props => props.$bold && bold}

    ${props => props.$outline && outline}
`;
