// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LimoSwap is Ownable {
    IERC20 public tokenv1;
    IERC20 public tokenv2;
    address public deadAddress = address(0xdead);
    address public fundWallet;

    event Swap(address indexed user, uint256 amount);
    event SetExternalWallet(address indexed wallet);

    constructor(address _tokenv1, address _tokenv2, address _fundWallet) Ownable(msg.sender) {
        tokenv1 = IERC20(_tokenv1);
        tokenv2 = IERC20(_tokenv2);
        fundWallet = _fundWallet;
    }

    function setExternalWallet(address _fundWallet) external onlyOwner {
        fundWallet = _fundWallet;
        emit SetExternalWallet(_fundWallet);
    }

    function swap(uint256 _amount) external {
        require(tokenv1.balanceOf(msg.sender) >= _amount, "Insufficient limo v1 balance");
        require(tokenv1.allowance(msg.sender, address(this)) >= _amount, "Allowance for limo v1 not set");
        require(tokenv2.balanceOf(fundWallet) >= _amount, "Swap paused");
        require(tokenv2.allowance(fundWallet, address(this)) >= _amount, "Allowance for limo v2 not set");

        // Transfer Limo version 1 from the user to the dead address
        require(tokenv1.transferFrom(msg.sender, deadAddress, _amount), "Limo v1 transfer failed");

        // Transfer Limo version 2 from the external wallet to the user
        require(tokenv2.transferFrom(fundWallet, msg.sender, _amount), "Limo v2 transfer failed");

        emit Swap(msg.sender, _amount);
    }
}
