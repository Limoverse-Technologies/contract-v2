// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LimoverseV2 is ERC20 {
    address constant public seedAndSales = 0xE4bCf6FCB9DA18734f5dAFd19b88F23315d8B94c;
    address constant public platformRewards = 0xa3a7130e574561074aC294bF86B95Afe28723205;
    address constant public marketingAndOperations = 0xD8E6854F84598dA3Dea468D51B4926BB6ecb889C;
    address constant public foundersAndTeam = 0x30e8F327251677d72218Ac78BeE27F00d9D01276;
    address constant public advisorsAndPartnerships = 0xeFF32AE5BF1845c4326356eaCAf924388f4bcD54;
    address constant public treasuryReserves = 0x90B700F0Ef0554A8E38cb0F3AE92C4B3C6ab51B6;
    address constant public exchangesAndLiquidity = 0xdbFfA238c51f6998098d0c60e910aa1fcB56e492;
    constructor() ERC20("Limoverse", "Limo") {
        _mint(seedAndSales, 200000000 * 10 ** decimals()); // 2% for Seed Fund/ Institutional Investors
        _mint(seedAndSales, 200000000 * 10 ** decimals()); // 2% for Private Sale
        _mint(seedAndSales, 800000000 * 10 ** decimals()); // 8% for Public Sale
        _mint(platformRewards, 4000000000 * 10 ** decimals()); // 40% for Platform Rewards
        _mint(marketingAndOperations, 1500000000 * 10 ** decimals()); // 15% for Marketing and Operations
        _mint(foundersAndTeam, 1500000000 * 10 ** decimals()); // 15% for Founders + Core Teams
        _mint(advisorsAndPartnerships, 200000000 * 10 ** decimals()); // 2% for Advisors
        _mint(advisorsAndPartnerships, 500000000 * 10 ** decimals()); // 5% for Partnerships
        _mint(treasuryReserves, 500000000 * 10 ** decimals()); // 5% for Treasury Reserves
        _mint(exchangesAndLiquidity, 600000000 * 10 ** decimals()); // 6% for Exchanges and Liquidity
    }
}
