module.exports = {
  serviceName: process.env.SERVICE_NAME || "King's prototype kit",
  port: Number(process.env.PORT || 3000),
  sessionSecret: process.env.SESSION_SECRET || 'kcl-prototype-kit-development-secret',
  isDevelopment: process.env.NODE_ENV !== 'production',
  isProduction: process.env.NODE_ENV === 'production'
}
