const logoPrimaryColor = require('../images/PNG/Logo-Outline-web-White@200.png');

const defaultTheme = {
  // Defined as usual, like in spectacle-boilerplate
  // images: {
  //   // cernLogo,
  //   // logoSecondaryColor,
  //   // logoPrimaryMono,
  //   logoPrimaryColor,
  // },
  // These can be mapped to slide props: {...theme.slideDefaults}
  slideDefaults: {
    transition: ['fade'],
    bgColor: 'secondary',
    textColor: 'primary',
  },
  // Renders your logo in the bottom left corner
  // logoSettings: {
  //   bgImage: logoPrimaryColor,
  //   bgSize: '4em',
  //   bgRepeat: 'no-repeat',
  //   bgPosition: '3% 97%',
  // },
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
    tertiary: 'white',
    quaternary: 'white',
  },
  fontConfig: {
    primary: 'Montserrat',
    secondary: 'Helvetica',
  },
};

const defineTheming = selectionTheme => {
  switch (selectionTheme) {
    case 'CERN 1':
      return {
        ...defaultTheme,
        images: {},
        logoSettings: {},
        headingDefaults: {
          caps: true,
          textColor: '#93a1a1',
          size: '3.77em',
          margin: '0 0 15px 0',
        },
        themeConfig: {
          primary: 'white',
          secondary: '#0053A1',
          tertiary: '#93a1a1',
          quaternary: 'white', // color of slides number
        },
        fontConfig: {
          primary: 'PT Sans',
          secondary: 'sans-serif',
        },
      };
    // break;
    case 'CERN 2':
      return {
        ...defaultTheme,
        images: {},
        logoSettings: {},
        headingDefaults: {
          caps: true,
          textColor: '#93a1a1',
          size: '2.6em',
          margin: '0 0 15px 0',
        },
        themeConfig: {
          primary: 'white',
          secondary: '#0053A1',
          tertiary: '#93a1a1',
          quaternary: 'white', // color of slides number
        },
        fontConfig: {
          primary: 'Roboto Slab',
          secondary: 'serif',
        },
      };
    // break;
    case 'CERN 3':
      return {
        ...defaultTheme,
        images: {
          // cernLogo,
          // logoSecondaryColor,
          // logoPrimaryMono,
          logoPrimaryColor,
        },
        logoSettings: {
          bgImage: logoPrimaryColor,
          bgSize: '4em',
          bgRepeat: 'no-repeat',
          bgPosition: '3% 97%',
        },
        headingDefaults: {
          caps: true,
          textColor: '#93a1a1',
          size: '2.6em',
          margin: '0 0 15px 0',
        },
        themeConfig: {
          primary: 'white',
          secondary: '#0053A1',
          tertiary: '#93a1a1',
          quaternary: 'white', // color of slides number
        },
        fontConfig: {
          primary: 'Roboto Slab',
          secondary: 'serif',
        },
      };
    // break;
    case 'CERN 4':
      break;
    case 'CERN 5':
      break;
    case 'CERN 6':
      break;
    default:
      return defaultTheme;
  }
};

const getTheme = selectionTheme => defineTheming(selectionTheme);
export default getTheme;
