require('@nomicfoundation/hardhat-toolbox')

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.24',
  networks: {
    bsc: {
      url: `https://bsc-dataseed.binance.org/`,
      accounts: [BSC_PRIVATE_KEY]
    }
  }
}
