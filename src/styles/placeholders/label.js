import { css } from 'styled-components';
import { colors, sizes } from '../settings/variables';

export const label = css`
    color: ${colors.grey.text.main};
    font-size: ${sizes.textSmall};
    font-style: normal;
    font-weight: ${sizes.textNormal};
    line-height: 12px;
`;
