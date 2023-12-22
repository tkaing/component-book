import { css } from 'styled-components';
import { Div, Icon, Input } from './base';

import { whiteField } from '@/styles/placeholders/field';
import { colors, sizes } from '@/styles/settings/variables';

const styles = {
    root: css`
        ${whiteField}

        color: ${colors.grey.text.main};
        width: 100%;
        height: 40px;
        text-align: left;
        letter-spacing: ${sizes.letterSpacingLarge};

        display: flex;
        background: ${colors.white90};
        font-size: ${sizes.textBase};
        font-style: normal;
        font-weight: ${sizes.textNormal};
        align-items: center;
        padding-left: 48px;
    `,
    icon: css`
        height: 40px;
        line-height: 40px;

        z-index: 2;
        color: ${colors.grey.text.main};
        width: 48px;
        display: block;
        position: absolute;
        text-align: center;
        pointer-events: none;
        transform: scale(0.4);
    `
};

export default function BigIconField({ icon, ...props }) {
    return (
        <Div>
            <Icon sx={styles.icon} icon={icon} />
            <Input sx={styles.root} className="form-control" {...props} />
        </Div>
    );
}
