// import logoPrimaryColor from '../images/cern-vector-logo.svg';
// import logoPrimaryColor from '../images/PNG/Logo-Outline-web-White@200.png';
// const logoSecondaryColor = require("../assets/logo-secondary-color.png");
// const logoPrimaryMono = require("../assets/logo-primary-mono.png");
const logoPrimaryColor = require('../images/PNG/Logo-Outline-web-White@100.png');

// if (selectionTheme === undefined) return {};
const getTheme = selectionTheme =>
  selectionTheme !== undefined && {
    // Defined as usual, like in spectacle-boilerplate
    images: {
      // cernLogo,
      // logoSecondaryColor,
      // logoPrimaryMono,
      logoPrimaryColor,
    },
    // These can be mapped to slide props: {...theme.slideDefaults}
    slideDefaults: {
      transition: ['fade'],
      bgColor: 'secondary',
      textColor: 'primary',
    },
    // Renders your logo in the bottom left corner
    logoSettings: {
      bgImage: logoPrimaryColor,
      bgSize: '2em',
      bgRepeat: 'no-repeat',
      bgPosition: '1% 99%',
    },
    headingDefaults: {
      caps: true,
      textColor: 'primary',
      size: 6,
      margin: '0 0 15px 0',
    },
    // Create a deck theme: createTheme(themeConfig, fontConfig)
    themeConfig: {
      primary: '#0053A1',
      secondary: '#0053A1',
      tertiary: 'black',
      quaternary: 'white',
    },
    fontConfig: {
      primary: 'Montserrat',
      secondary: 'Helvetica',
    },
  };
export default getTheme;
