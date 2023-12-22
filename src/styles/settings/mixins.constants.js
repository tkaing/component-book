import { isProduction } from '@/helpers/helper';

const MontserratFont = isProduction ? 'Montserrat' : 'Montserrat Variable';

export const Fonts = {
    body: `"${MontserratFont}", sans-serif`,
    heading: `"${MontserratFont}", sans-serif`
};

export const Breakpoints = {
    xs: '320px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    '2xl': '1536px'
};
