const assert = require('assert');
const Review = require('../models/Review');

describe('Course Review & Rating Validation Suite', () => {
  it('should accept ratings strictly between 1 and 5', () => {
    const valid = new Review({ studentName: 'Sam', rating: 5, comment: 'Phenomenal course!' });
    assert.strictEqual(valid.rating, 5);

    const invalidHigh = new Review({ studentName: 'Sam', rating: 6, comment: 'Exceeded max' });
    assert.ok(invalidHigh.validateSync().errors['rating']);

    const invalidLow = new Review({ studentName: 'Sam', rating: 0, comment: 'Below min' });
    assert.ok(invalidLow.validateSync().errors['rating']);
  });
});

console.log('✓ Review rating threshold validations passed.');
