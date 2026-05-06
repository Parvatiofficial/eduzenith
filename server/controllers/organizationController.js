const Organization = require('../models/Organization');

exports.getOrganizations = async (req, res, next) => {
  try {
    const orgs = await Organization.find().populate('coursesIncluded', 'title category');
    res.status(200).json({ success: true, count: orgs.length, data: orgs });
  } catch (error) {
    next(error);
  }
};

exports.createOrganization = async (req, res, next) => {
  try {
    const org = await Organization.create(req.body);
    res.status(201).json({ success: true, message: 'Corporate organization registered', data: org });
  } catch (error) {
    next(error);
  }
};
