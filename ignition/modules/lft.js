const { buildModule } = require('@nomicfoundation/hardhat-ignition/modules')

module.exports = buildModule('LimoverseLFT', m => {
  const lft = m.contract('LFT')
  return { lft }
})
