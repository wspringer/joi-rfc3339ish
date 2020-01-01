const Joi = require('@hapi/joi');
const moment = require('moment-timezone');

describe('the format', () => {
  const rfc3339ish = Joi.extend(require('../index')).rfc3339ish();

  it('should reject dates that are invalid', () => {
    expect(() => Joi.attempt('2018-11-13 16:46:31', rfc3339ish)).toThrow(
      '"2018-11-13 16:46:31" does not have a valid timezone'
    );
    expect(() => Joi.attempt('2018-11-13 16:46:31 7', rfc3339ish)).toThrow(
      '"2018-11-13 16:46:31 7" does not have a valid timezone'
    );
    expect(() => Joi.attempt('foo', rfc3339ish)).toThrow('"foo" is not a valid date');
  });

  it('should accept dates that *are* valid', () => {
    const parsed = Joi.attempt('2018-11-13 16:46:31 Etc/GMT', rfc3339ish);
    expect(parsed).toHaveProperty('isValid');
    expect(moment.isMoment(parsed)).toBe(true);
  });
});
