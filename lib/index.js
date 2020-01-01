const Joi = require('@hapi/joi');
const moment = require('moment-timezone');

const tzNames = new Set(moment.tz.names());

module.exports = joi => ({
  type: 'rfc3339ish',
  messages: {
    'rfc3339ish.invalid': '"{{#value}}" is not a valid date',
    'rfc3339ish.timezone': '"{{#value}}" does not have a valid timezone',
  },
  coerce: {
    from: ['string'],
    method(value, helpers) {
      const date = moment(value.substr(0, 19), 'yyyy-MM-dd HH:mm:ss');
      if (!date.isValid()) {
        return { value, errors: helpers.error('rfc3339ish.invalid') };
      }
      const tz = value.substr(20);
      if (!tzNames.has(tz)) {
        return { value, errors: helpers.error('rfc3339ish.timezone') };
      }
      return { value: date.tz(tz) };
    },
  },
});
