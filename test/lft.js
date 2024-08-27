const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('LFT Contract', function () {
  let LFT, lft, owner, addr1, addr2, addr3, marketplace

  beforeEach(async function () {
    LFT = await ethers.getContractFactory('LFT')
    ;[owner, addr1, addr2, addr3, marketplace] = await ethers.getSigners()
    lft = await LFT.deploy()
    await lft.deployed()
  })

  it('Should mint a token and fail if the token ID is out of bounds', async function () {
    await expect(lft.safeMint(addr1.address, 100001)).to.be.revertedWith(
      'Token ID must be between 1 and 100000'
    )

    await lft.safeMint(addr1.address, 1)
    expect(await lft.ownerOf(1)).to.equal(addr1.address)
  })
})
