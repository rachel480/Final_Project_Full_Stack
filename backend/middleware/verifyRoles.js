

const verifyRoles = (requiredRole) => {
  return (req, res, next) => {
    try {
      const user = req.user  

      if (!user) {
        return res.status(401).json({ message: "Unauthorized" })
      }

      const hasRole = Array.isArray(user.roles)
        ? user.roles.includes(requiredRole) || user.roles.includes('Admin')
        : user.roles === requiredRole || user.roles === 'Admin'

      if (!hasRole) {
        return res.status(403).json({ message: "Forbidden: Access denied" })
      }

      next() 
    } catch (err) {
      return res.status(500).json({ message: "Server error" })
    }
  }
}

module.exports = verifyRoles
