// middleware/validationMiddleware.js

const { check, validationResult } = require('express-validator');

// Middleware untuk validasi data pendidikan
const validateNonTeknis = [
//   check('title')
//     .notEmpty().withMessage('Title is required')
//     .isLength({ min: 3 }).withMessage('Title must be at least 3 characters long'),

//   check('institution')
//     .notEmpty().withMessage('Institution is required')
//     .isLength({ min: 3 }).withMessage('Institution name must be at least 3 characters long'),

//   check('year')
//     .notEmpty().withMessage('Year is required')
//     .isInt({ min: 1900, max: new Date().getFullYear() }).withMessage('Year must be a valid number between 1900 and the current year'),

  // Menghasilkan validasi
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = { validateNonTeknis };
