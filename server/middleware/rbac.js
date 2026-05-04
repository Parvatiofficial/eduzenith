/**
 * Role-Based Access Control Middleware for EduZenith Enterprise
 */
const rbac = (allowedRoles = []) => {
  return (req, res, next) => {
    const userRole = req.headers['x-user-role'] || 'student';
    if (!allowedRoles.includes(userRole) && !allowedRoles.includes('*')) {
      return res.status(403).json({
        success: false,
        error: 'Forbidden',
        message: `Role '${userRole}' is not authorized to access this administrative endpoint.`
      });
    }
    next();
  };
};

module.exports = rbac;
