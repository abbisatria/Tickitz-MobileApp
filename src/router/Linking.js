const config = {
  screens: {
    SignIn: {
      path: 'activate/:activate',
      parse: {
        activate: (activate) => `${activate}`,
      },
    },
  },
};

const linking = {
  prefixes: ['tickitz://'],
  config,
};

export default linking;
