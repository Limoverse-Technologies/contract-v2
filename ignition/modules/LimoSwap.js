const { buildModule } = require('@nomicfoundation/hardhat-ignition/modules')

module.exports = buildModule('LimoverseSwap', m => {
  //   const swap = m.contract('LimoSwap', [
  //     '0x37Af351Bd343605f2A8d906E05113a4f488aCB63',
  //     '0xc1fb7e2D4cF849f98224eaD97364E5A4B7fB3EF6',
  //     '0x4406B6c0E76c5461a54B3671dfa2D7eC04BAB69b'
  //   ])
  const swap = m.contract('LimoSwap', [
    '0xd2B6bF88b7d9dA599331719e338fcdeb235A0b99',
    '0x37E2ae82C454A6888E4bbb3e21a6607034832b4f',
    '0xf741e03Ec560dCC64e0bB3d2A0be53c010efa236'
  ])
  return { swap }
})
