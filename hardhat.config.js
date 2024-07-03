require('@nomicfoundation/hardhat-toolbox')
require('dotenv').config()

module.exports = {
  solidity: '0.8.24',
  networks: {
    bsc: {
      url: `https://bsc-dataseed.binance.org/`,
      accounts: [process.env.PRIVATE_KEY_BSC]
    },
    bsctest: {
      url: `https://data-seed-prebsc-1-s1.binance.org:8545/`,
      accounts: [process.env.PRIVATE_KEY_TESTNET]
    }
  },
  etherscan: {
    apiKey: {
      bsc: process.env.BSCSCAN,
      bscTestnet: process.env.BSCSCAN
    }
  }
}
