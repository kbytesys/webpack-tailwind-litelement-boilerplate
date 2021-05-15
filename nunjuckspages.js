module.exports = [
  {
    template: './templates/index.njk',
    filename: 'index.html',
    templateParameters: {
      username: 'demo'
    },
    inject: false
  }
];
