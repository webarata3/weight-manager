module.exports = {
  node: {
    __dirname: false,
    __filenane: false
  },
  entry: {
    main: './app/js/main.js',
    'vm/index': './app/js/vm/index.js',
    'vm/update': './app/js/vm/update.js'
  },
  output: {
    filename: './dist/js/[name].js'
  },
  target: 'electron'
};
