import { isProduction } from '@/helpers/helper';

export const colors = {
    primary: '#e86003',
    secondary: '#25a0e9',

    red: 'red',

    white: '#ffffff',
    white90: '#f5f5f5',
    white80: '#EFEFEF',

    black: '#000000',
    black90: '#212529',

    grey: {
        common: {
            main: '#4c5366',
            lighter: '#a5a9b2'
        },
        text: {
            main: '#4c5366',
            lighter: '#898f9e'
        },
        greyField: {
            border: '#898f9e',
            placeholder: '#979797'
        },
        whiteField: {
            border: '#c4c4c4'
        }
    }
};

export const sizes = {
    radiusBtn: '8px',
    radiusModal: '16px',

    letterSpacingLarge: '1.04442px',
    letterSpacingField: '0.8px',
    letterSpacingButton: '0.4px',
    letterSpacingHeading: '0.8px',

    textSmall: '10px',
    textBase: '12px',
    textDisplay: '14px',
    textBtn: '16px',

    textBold: isProduction ? 700 : 600,
    textNormal: isProduction ? 400 : 300,

    heading: '25px'
};
