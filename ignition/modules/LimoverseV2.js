const { buildModule } = require('@nomicfoundation/hardhat-ignition/modules')

module.exports = buildModule('LimoverseModule', m => {
  const limoverse = m.contract('LimoverseV2')
  return { limoverse }
})
