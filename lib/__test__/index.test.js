const Joi = require('@hapi/joi');

describe('the format', () => {
  const custom = Joi.extend(require('../index'));

  it('should validate', () => {
    Joi.attempt('2018-11-13 16:46:31 Etc/GMT', custom.weird());
  });
});
