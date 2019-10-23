const Sequelize = require('sequelize')
const pg = require('pg');
pg.defaults.ssl = true;

let sequelize = null

/**
 * @returns {Sequelize}
 */
module.exports = function setupDatabase (config) {
  const { port, username, password, host, database } = config.credentials

  // clonned to avoid side effects
  const configClone = { ...config }
  delete configClone.credentials

  if (!sequelize) {
    sequelize = new Sequelize(`postgres://${username}:${password}@${host}:${port}/${database}`, configClone)
  }
  return sequelize
}
