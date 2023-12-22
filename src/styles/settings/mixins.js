import { css } from 'styled-components';
import { Fonts, Breakpoints } from './mixins.constants';

export const fontFamily = (fontType = 'body') => {
    return css`
        font-family: ${Fonts[fontType]};
    `;
};

export const transition = (prop = 'all', duration = '500ms', type = 'ease', delay = '0ms') => {
    const value = `${prop} ${duration} ${type} ${delay}`;

    return css`
        -webkit-transition: ${value};
        -moz-transition: ${value};
        -o-transition: ${value};
        transition: ${value};
    `;
};

export const fromBreakpoint = size => {
    return `@media (min-width: ${Breakpoints[size]})`;
};
