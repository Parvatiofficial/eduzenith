const express = require('express');
const router = express.Router();
const rbac = require('../middleware/rbac');
const { getOrganizations, createOrganization } = require('../controllers/organizationController');

router.route('/')
  .get(getOrganizations)
  .post(rbac(['admin', 'org_manager']), createOrganization);

module.exports = router;
