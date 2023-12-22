import { css } from 'styled-components';
import { Span } from './base';
import { sizes } from '@/styles/settings/variables';

const styles = css`
    color: ${props => props.$color || 'inherit'};
    font-weight: ${sizes.textBold};
`;

export default function B({ sx, $color, children }) {
    return (
        <Span sx={styles.concat(sx)} $color={$color}>
            {children}
        </Span>
    );
}
