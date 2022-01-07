// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract AuthNFT is
  Context,
  AccessControlEnumerable,
  ERC721Enumerable,
  ERC721Burnable,
  ERC721Pausable
{
  using Counters for Counters.Counter;
  address owner;

  bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
  bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
  bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
  bytes32 public constant USER_ROLE = keccak256("USER_ROLE");

  Counters.Counter private _tokenIdTracker;

  struct Content {
    string special_str;
    uint256 special_num;
    uint256 rand_num;
    bytes32 permission;
  }

  mapping(uint256 => Content) private _tokenIdToContent;

  string private _baseTokenURI;

  constructor(
    string memory _name,
    string memory _symbol,
    string memory baseTokenURI
  ) ERC721(_name, _symbol) {
    _baseTokenURI = baseTokenURI;
    _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
    _setupRole(MINTER_ROLE, _msgSender());
    _setupRole(PAUSER_ROLE, _msgSender());
    _setupRole(USER_ROLE, _msgSender());
    owner = msg.sender;
  }

  function getRoles() public view returns (string[] memory) {
    string[] memory roles = new string[](4);
    if (hasRole(DEFAULT_ADMIN_ROLE, _msgSender())) {
      roles[0] = "DEFAULT_ADMIN_ROLE";
    } else {
      roles[0] = "FALSE";
    }

    if (hasRole(MINTER_ROLE, _msgSender())) {
      roles[1] = "MINTER_ROLE";
    } else {
      roles[1] = "FALSE";
    }

    if (hasRole(PAUSER_ROLE, _msgSender())) {
      roles[2] = "PAUSER_ROLE";
    } else {
      roles[2] = "FALSE";
    }

    if (hasRole(USER_ROLE, _msgSender())) {
      roles[3] = "USER_ROLE";
    } else {
      roles[3] = "FALSE";
    }

    return roles;
  }

  function _baseURI() internal view override returns (string memory) {
    return _baseTokenURI;
  }

  function mint(address to, string calldata special_str, uint256 special_num, bytes32 permission) public {
    require(hasRole(MINTER_ROLE, _msgSender()), "AuthNFT: Must have minter role to mint.");
    _mint(to, _tokenIdTracker.current());

    uint256 rand_num = (uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty))));
    Content memory content = Content(special_str, special_num, rand_num, permission);
    _tokenIdToContent[_tokenIdTracker.current()] = content;

    _setupRole(USER_ROLE, to);
    _tokenIdTracker.increment();
  }

  function getTokenContent(uint256 tokenId) public view returns(Content memory content) {
    content = _tokenIdToContent[tokenId];
  }

  function getTokenIds(address _owner) public view returns(uint[] memory) {
    uint[] memory _tokensOfOwner = new uint[](ERC721.balanceOf(_owner));

    for (uint i = 0; i < ERC721.balanceOf(_owner); i++) {
      _tokensOfOwner[i] = ERC721Enumerable.tokenOfOwnerByIndex(_owner, i);
    }
    return (_tokensOfOwner);
  }

  function burn(uint256 tokenId) public override {
    //solhint-disable-next-line max-line-length
    require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721Burnable: caller is not owner nor approved");
    _burn(tokenId);
    delete _tokenIdToContent[tokenId];
  }

  function pause() public {
    require(hasRole(PAUSER_ROLE, _msgSender()), "AuthNFT: Must have pauser role.'");
    _pause();
  }

  function unpause() public {
    require(hasRole(PAUSER_ROLE, _msgSender()), "AuthNFT: Must haver pauser role.");
    _unpause();
  }

  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 tokenId
  ) internal override(ERC721, ERC721Enumerable, ERC721Pausable) {
    super._beforeTokenTransfer(from, to, tokenId);
  }

  /**
  * @dev See {IERC165-supportsInterface}.
  */
  function supportsInterface(bytes4 interfaceId)
    public
    view
    virtual
    override(AccessControlEnumerable, ERC721, ERC721Enumerable)
    returns (bool)
  {
    return super.supportsInterface(interfaceId);
  }
}
