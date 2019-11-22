import cernLogo from '../images/CERN-Logo.png';
// const logoSecondaryColor = require("../assets/logo-secondary-color.png");
// const logoPrimaryMono = require("../assets/logo-primary-mono.png");
// const logoPrimaryColor = require("../assets/logo-primary-color.png");

// You can swap out primary/secondary according to purpose
const getTheme = (primary, secondary, tertiary, selectionTheme) => {
  if (selectionTheme === undefined) return {};
  return {
    // Defined as usual, like in spectacle-boilerplate
    images: {
      cernLogo,
      // logoSecondaryColor,
      // logoPrimaryMono,
      // logoPrimaryColor
    },
    // These can be mapped to slide props: {...theme.slideDefaults}
    slideDefaults: {
      transition: ['fade'],
      bgColor: secondary,
      textColor: 'primanry',
    },
    // Renders your logo in the bottom left corner
    logoSettings: {
      bgImage: cernLogo,
      bgSize: '300px',
      bgRepeat: 'no-repeat',
      bgPosition: '2% 98%',
    },
    headingDefaults: {
      caps: true,
      textColor: primary,
      size: 6,
      margin: '0 0 15px 0',
    },
    // Create a deck theme: createTheme(themeConfig, fontConfig)
    themeConfig: {
      primary: '#0053A1',
      secondary: '#black',
      tertiary: '#066e8a',
      quaternary: '#008080',
    },
    fontConfig: {
      primary: 'Montserrat',
      secondary: 'Helvetica',
    },
  };
};

export default getTheme;
