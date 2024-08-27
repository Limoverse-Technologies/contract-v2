// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LFT is ERC721, Ownable {
    mapping(address => bool) private approvedMarketplaces;
    string private _baseTokenURI;
    uint256 public constant MAX_TOKEN_ID = 100000;

    constructor()
        ERC721("Limoverse Fractional Token", "LFT")
        Ownable(msg.sender)
    {
        _baseTokenURI = "https://limo.limoverse.io/lft/metadata/";
    }

    function safeMint(address to, uint256 tokenId) public onlyOwner {
        require(tokenId < MAX_TOKEN_ID, "Token ID must be lessthan 100000");
        _safeMint(to, tokenId);
    }

    function bulkMint(address[] calldata recipients, uint256[] calldata tokenIds) public onlyOwner {
        uint256 numRecipients = recipients.length;
        require(numRecipients == tokenIds.length, "Recipients and token IDs length mismatch");

        for (uint256 i = 0; i < numRecipients; i++) {
            uint256 tokenId = tokenIds[i];
            require(tokenId < MAX_TOKEN_ID, "Token ID must be lessthan 100000");
            _safeMint(recipients[i], tokenId);
        }
    }

    function setApprovalForAll(address operator, bool approved) public override {
        require(isApprovedMarketplace(operator), "Approval restricted to approved marketplaces");
        super.setApprovalForAll(operator, approved);
    }

    function approve(address to, uint256 tokenId) public override {
        require(isApprovedMarketplace(to), "Approval restricted to approved marketplaces");
        super.approve(to, tokenId);
    }

    function isApprovedMarketplace(address operator) public view returns (bool) {
        return approvedMarketplaces[operator];
    }

    function addApprovedMarketplace(address marketplace) public onlyOwner {
        approvedMarketplaces[marketplace] = true;
    }

    function removeApprovedMarketplace(address marketplace) public onlyOwner {
        approvedMarketplaces[marketplace] = false;
    }

    function setURI(string memory newBaseURI) public onlyOwner {
        _baseTokenURI = newBaseURI;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(ownerOf(tokenId) != address(0), "LFT: URI query for nonexistent token");
        return string(abi.encodePacked(_baseTokenURI, Strings.toString(tokenId)));
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
