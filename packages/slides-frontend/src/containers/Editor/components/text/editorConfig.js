// For more configuration information visit:
// https://jpuri.github.io/react-draft-wysiwyg/#/docs

export const editorConfig = {
  options: [
    'inline',
    'blockType',
    'fontSize',
    'fontFamily',
    'list',
    'link',
    'textAlign',
    // 'colorPicker',
    // 'embedded',
    'emoji',
    'remove',
    'history',
  ],
  blockType: {
    options: ['Normal', 'H1', 'H2', 'H3', 'H4'],
  },
  fontSize: {
    options: [20, 30, 40, 50, 60, 70, 80, 90],
  },
  fontFamily: {
    options: [
      'Arial',
      'Garamond',
      'Helvetica',
      'Roboto',
      'Times New Roman',
      'Times',
      'Courier New',
      'Courier',
      'Verdana',
      'Palatino',
      'Georgia',
      'Impact',
      'Tahoma',
      'Baskerville',
      'Futura',
    ],
  },
  // colorPicker: {
  //   colors: [
  //     'rgb(0, 83, 161)', // this is CERN's default color
  //     'rgb(97,189,109)',
  //     'rgb(26,188,156)',
  //     'rgb(84,172,210)',
  //     'rgb(44,130,201)',
  //     'rgb(147,101,184)',
  //     'rgb(71,85,119)',
  //     'rgb(204,204,204)',
  //     'rgb(65,168,95)',
  //     'rgb(0,168,133)',
  //     'rgb(61,142,185)',
  //     'rgb(41,105,176)',
  //     'rgb(85,57,130)',
  //     'rgb(40,50,78)',
  //     'rgb(0,0,0)',
  //     'rgb(247,218,100)',
  //     'rgb(251,160,38)',
  //     'rgb(235,107,86)',
  //     'rgb(226,80,65)',
  //     'rgb(163,143,132)',
  //     'rgb(239,239,239)',
  //     'rgb(255,255,255)',
  //     'rgb(250,197,28)',
  //     'rgb(243,121,52)',
  //     'rgb(209,72,65)',
  //     'rgb(184,49,47)',
  //     'rgb(124,112,107)',
  //     'rgb(209,213,216)',
  //   ],
  // },
  link: {
    defaultTargetOption: '_blank', // this makes default opening the link in another tab
  },
};
