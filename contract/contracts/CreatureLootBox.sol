// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "https://github.com/ProjectOpenSea/opensea-creatures/blob/master/contracts/ERC721Tradable.sol";

/**
 * @title Creature
 * Creature - a contract for my non-fungible creatures.
 */
contract CreatureLootBox is ERC721Tradable {
    string contractURI = "https://tothemoonmetadata.herokuapp.com/contract/";
    string endPoint;
    address factoryAddress;
     uint256 NUM_CREATURES_PER_BOX = 3;
    uint256 OPTION_ID = 0;
    constructor(address _proxyRegistryAddress, address _factoryAddress,string memory _name, string memory _symbol)
        ERC721Tradable(_name, _symbol, _proxyRegistryAddress)
    {
        factoryAddress = _factoryAddress;
        endPoint =_name;
    }

    function baseTokenURI() override  public pure returns (string memory) {
        return "https://tothemoonmetadata.herokuapp.com/erc721/";
    }

    function getContractURI() public view returns (string memory) {
        return string(abi.encodePacked(contractURI,endPoint));
    }
     function itemsPerLootbox() public view returns (uint256) {
        return NUM_CREATURES_PER_BOX;
    }
}