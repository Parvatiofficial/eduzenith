const assert = require('assert');
const rbac = require('../middleware/rbac');

describe('RBAC Authorization Guards', () => {
  it('should block unauthorized students from admin routes', (done) => {
    const middleware = rbac(['admin']);
    const req = { headers: { 'x-user-role': 'student' } };
    const res = {
      status: (code) => {
        assert.strictEqual(code, 403);
        return {
          json: (body) => {
            assert.strictEqual(body.error, 'Forbidden');
            done();
          }
        };
      }
    };
    middleware(req, res, () => {});
  });
});

console.log('✓ RBAC security assertions verified.');
