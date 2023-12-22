import { css } from 'styled-components';
import { sizes } from '../settings/variables';
import { fontFamily } from '../settings/mixins';

export const heading = css`
    ${fontFamily('heading')};

    margin: 0;
    font-size: ${sizes.heading};
    font-weight: ${sizes.textBold};
    line-height: 29px;
    letter-spacing: ${sizes.letterSpacingHeading};
`;
