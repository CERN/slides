// eslint-disable-next-line prefer-destructuring
const IncomingForm = require('formidable').IncomingForm;
module.exports = function upload(req, res) {
  const form = new IncomingForm();
  console.log('from server I am called, req', req);
  form.on('file', (field, file) => {
    // Do something with the file
    // e.g. save it to the database
    // you can access it using file.path
    console.log('I have a file', file, field);
  });
  form.on('end', () => {
    res.json();
  });
  form.parse(req);
};
