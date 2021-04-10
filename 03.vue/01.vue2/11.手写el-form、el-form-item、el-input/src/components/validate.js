import Schema from 'async-validator';
export default (field, descriptor, values, resolve, reject) => {
  descriptor = {
    [field]: {
      ...descriptor,
    }
  }
  const validator = new Schema(descriptor);
  validator.validate(values, (errors, fields) => {
    if (errors) {
      return reject(errors, fields);
    }
    // validation passed
    resolve()
  });
}


// PROMISE USAGE
// validator.validate({ name: 'muji', age: 16 }).then(() => {
//   // validation passed or without error message
// }).catch(({ errors, fields }) => {
//   return handleErrors(errors, fields);
// });