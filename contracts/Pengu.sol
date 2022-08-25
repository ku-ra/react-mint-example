// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Pengu is ERC721Enumerable, Ownable {
    using Strings for uint256;
    using Counters for Counters.Counter;

    Counters.Counter private tokenId;

    string public currentBaseURI;
    string public prerevealURI;

    uint256 public cost = 0.01 ether;
    uint256 public maxSupply = 1000;
    uint8 public maxAmount = 5;

    bool public isPaused = true;
    bool public isRevealed = false;

    constructor() ERC721("Pengu NFT", "PNGU") { }

    function reveal() public onlyOwner() {
        isRevealed = true;
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner() {
        currentBaseURI = _newBaseURI;
    }

    function setPrerevealURI(string memory _prerevealURI) public onlyOwner() {
        prerevealURI = _prerevealURI;
    }

    function setPaused(bool _isPaused) public onlyOwner() {
        isPaused = _isPaused;
    }

    function setCost(uint256 _cost) public onlyOwner() {
        cost = _cost;
    }

    function withdraw() public onlyOwner() {
        (bool success, ) = payable(owner()).call{ value: address(this).balance }("");
        require(success);
    }
    
    function mintTo(uint8 amount, address _reciever) public onlyOwner() {
        _mintMultiple(amount, _reciever);
    }

    function totalSupply() public view override returns(uint256) {
        return tokenId.current();
    }

    function tokenURI(uint256 _tokenId) public view virtual override returns (string memory) {
        require(_exists(_tokenId), "ERC721Metadata: URI query for nonexistent token");

        if (!isRevealed) {
            return prerevealURI;
        }

        if (bytes(currentBaseURI).length == 0) {
            return "";
        }

        return string(abi.encodePacked(currentBaseURI, _tokenId.toString(), ".json"));
    }

    function mint(uint8 _mintAmount) public payable {
        require(!isPaused, "Tokens can't be minted currently");
        require(_mintAmount <= maxAmount, "Can't mint more tokens than allowed");
        require(msg.value >= cost * _mintAmount, "Transaction doesn't contain enough ether to mint the tokens");

        _mintMultiple(_mintAmount, msg.sender);
    }

    function _mintMultiple(uint8 _mintAmount, address _reciever) internal {
        require(tokenId.current() < maxSupply, "Maximum Supply reached");

        for (uint8 i = 0; i < _mintAmount; i++) {
            tokenId.increment();
            _safeMint(_reciever, tokenId.current());
        }
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return currentBaseURI;
    }
}