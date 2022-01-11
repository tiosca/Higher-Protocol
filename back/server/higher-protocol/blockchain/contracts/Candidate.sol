pragma solidity >=0.4.21 <0.9.0;

import "openzeppelin-solidity/contracts/access/Ownable.sol";
import "openzeppelin-solidity/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "openzeppelin-solidity/contracts/utils/math/SafeMath.sol";

contract Candidate is Ownable, ERC20Burnable {
    using SafeMath for uint256;

    address public releaseAgent;

    bool public released = false;

    mapping (address => bool) public transferAgents;


    constructor(
        string memory name,
        string memory symbol,
        uint8 decimals,
        uint256 amount
    )
        ERC20(name, symbol)
        Ownable()
        public
    {
        require(amount > 0, "amount has to be greater than 0");
        uint256 totalSupply = amount.mul(10 ** uint256(decimals));
        releaseAgent = msg.sender;
        _mint(msg.sender, totalSupply);
    }

    modifier canTransfer(address _sender) {
        require(released);
        _;
    }

    modifier inReleaseState(bool releaseState) {
        require(releaseState == released);
        _;
    }


    function release() public onlyOwner inReleaseState(false)  {
        released = true;
    }


    function transfer(address _to, uint _value) public override canTransfer(msg.sender) returns (bool success) {
        return super.transfer(_to, _value);
    }

    function transferFrom(address _from, address _to, uint _value) public override canTransfer(_from) returns (bool success) {
        return super.transferFrom(_from, _to, _value);
    }

    function burn(uint256 _value) public override{
        return super.burn(_value);
    }

    function burnFrom(address _from, uint256 _value) public  override{
        return super.burnFrom(_from, _value);
    }
}