const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('LimoSwap', function () {
  let owner, user, fundWallet
  let tokenv1, tokenv2, limoSwap

  beforeEach(async function () {
    ;[owner, user, fundWallet] = await ethers.getSigners()

    // Deploy mock ERC20 tokens
    const ERC20 = await ethers.getContractFactory('ERC20Mock')
    tokenv1 = await ERC20.deploy('LimoV1', 'LV1', ethers.parseEther('1000'))
    await tokenv1.waitForDeployment()
    tokenv2 = await ERC20.deploy('LimoV2', 'LV2', ethers.parseEther('1000'))
    await tokenv2.waitForDeployment()

    // Deploy LimoSwap contract
    const LimoSwap = await ethers.getContractFactory('LimoSwap')
    limoSwap = await LimoSwap.deploy(
      tokenv1.target,
      tokenv2.target,
      fundWallet.address
    )
    await limoSwap.waitForDeployment()

    // Transfer some tokenv1 to user and tokenv2 to fundWallet
    await tokenv1.transfer(user.address, ethers.parseEther('100'))
    await tokenv2.transfer(fundWallet.address, ethers.parseEther('100'))
  })

  describe('swap', function () {
    let amount

    beforeEach(async function () {
      amount = ethers.parseEther('10')

      // Approve LimoSwap contract to spend user's tokenv1
      await tokenv1.connect(user).approve(limoSwap.target, amount)

      // Approve LimoSwap contract to spend fundWallet's tokenv2
      await tokenv2.connect(fundWallet).approve(limoSwap.target, amount)
    })

    it('should swap tokenv1 for tokenv2', async function () {
      // Perform the swap
      await limoSwap.connect(user).swap(amount)

      // Check balances
      expect(await tokenv1.balanceOf(user.address)).to.equal(
        ethers.parseEther('90')
      )
      expect(
        await tokenv1.balanceOf('0x000000000000000000000000000000000000dead')
      ).to.equal(amount)
      expect(await tokenv2.balanceOf(user.address)).to.equal(amount)
      expect(await tokenv2.balanceOf(fundWallet.address)).to.equal(
        ethers.parseEther('90')
      )
    })

    it('should emit Swap event', async function () {
      // Perform the swap and expect the Swap event
      await expect(limoSwap.connect(user).swap(amount))
        .to.emit(limoSwap, 'Swap')
        .withArgs(user.address, amount)
    })

    it('should fail if user has insufficient tokenv1 balance', async function () {
      const insufficientAmount = ethers.parseEther('200')

      await tokenv1.connect(user).approve(limoSwap.target, insufficientAmount)

      await expect(
        limoSwap.connect(user).swap(insufficientAmount)
      ).to.be.revertedWith('Insufficient limo v1 balance')
    })

    it('should fail if user has not approved tokenv1', async function () {
      const anotherAmount = ethers.parseEther('10')

      await tokenv1.connect(user).approve(limoSwap.target, 0) // Reset approval to 0

      await expect(
        limoSwap.connect(user).swap(anotherAmount)
      ).to.be.revertedWith('Allowance for limo v1 not set')
    })

    it('should fail if fundWallet has insufficient tokenv2 balance', async function () {
      const excessiveAmount = ethers.parseEther('110')
      await tokenv1.transfer(user.address, ethers.parseEther('100'))

      await tokenv1.connect(user).approve(limoSwap.target, excessiveAmount)
      await tokenv2
        .connect(fundWallet)
        .approve(limoSwap.target, excessiveAmount)

      await expect(
        limoSwap.connect(user).swap(excessiveAmount)
      ).to.be.revertedWith('Swap paused')
    })

    it('should fail if fundWallet has not approved tokenv2', async function () {
      const anotherAmount = ethers.parseEther('10')

      await tokenv2.connect(fundWallet).approve(limoSwap.target, 0) // Reset approval to 0

      await expect(
        limoSwap.connect(user).swap(anotherAmount)
      ).to.be.revertedWith('Allowance for limo v2 not set')
    })
  })

  describe('setExternalWallet', function () {
    it('should set a new external wallet', async function () {
      await limoSwap.setExternalWallet(user.address)
      expect(await limoSwap.fundWallet()).to.equal(user.address)
    })

    it('should emit SetExternalWallet event', async function () {
      await expect(limoSwap.setExternalWallet(user.address))
        .to.emit(limoSwap, 'SetExternalWallet')
        .withArgs(user.address)
    })
  })
})
