const Joi = require('@hapi/joi');
const moment = require('moment-timezone');

module.exports = joi => ({
  type: 'weird',
  base: joi.string(),
  messages: {
    'weird.notyay': '"{{#label}}" must not be yay',
  },
  coerce(value, helpers) {
    const date = value.substr(0, 19);
    const tz = value.substr(20);
    console.info(date, tz);
  },
  validate(value, helpers) {
    if (value === 'yay') {
      return { value, errors: helpers.error('weird.notyay') };
    }
  },
});
