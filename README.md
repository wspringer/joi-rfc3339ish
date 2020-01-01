# README

Apple's documentation on the date formats of the dates returned with receipt
verification is incorrect. [Some parts of the
documentation](https://developer.apple.com/library/archive/releasenotes/General/ValidateAppStoreReceipt/Chapters/ReceiptFields.html#//apple_ref/doc/uid/TP40010573-CH106-SW12)
suggest that the format is based on RFC3339 — which it isn't. [Other
documentation] states it's "a date-time format similar to ISO 8601" — which may
sound helpful, but it isn't as it's *not quite* the same.

That's annoying. Especially if you want to validate if the data that is getting
returned is meeting your expectations so that you can parse it.

This library provides an extension of
[Joi](https://hapi.dev/family/joi/?v=16.1.8) adding support stating that the
format is *like* RFC3339 — but not quite it.

## Usage

```shell
npm install joi-rfc3339ish
yarn add joi-rfc3339ish
```

```javascript
const Joi = require('@hapi/joi').extend('joi-rfc3339ish');

const schema = Joi.object().keys({
  date: Joi.rfc3339ish(),
});

// Throws
Joi.attempt({ date: '2018-11-13 16:46:31' }, schema);

// Does not throw
const validated = Joi.attempt({ date: '2018-11-13 16:46:31 Etc/GMT' }, schema);
validated.date; // A Moment.js moment with the timezone set correctly.
```

## Helpful?

Is this helpful? Perhaps not. It turns out that the majority of the frameworks
are using the `_ms` version of dates also included in the payloads returned by
the Appstore. But if you were *ever* aiming for a complete Joi schema defining
the payloads returned by Apple, you might still find this helpful.
