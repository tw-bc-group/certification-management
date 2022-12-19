import Web3 from 'web3';
import {default as abi} from './abi.json';
import {contractAddress, endpoint} from './constant';

declare var window: any;

const retrieveWeb3 = () => {
  if (window.ethereum) {
    return new Web3(window.ethereum);
  } else {
    return new Web3(endpoint);
  }
};

export const walletAddress = () => {
  // window.ethereum.selectedAddress = '0xf581b6f7a3b418021Fb5A9D609296ed60876a7e9';
  console.log('==========', window.ethereum, '----------', window.ethereum.selectedAddress);
  if (window.ethereum && window.ethereum.selectedAddress) {
    return window.ethereum.selectedAddress;
  } else {
    alert('please unlock your meta mask wallet at first');
  }
};

export const retrieveContract = () => {
  const web3 = retrieveWeb3();
  return new web3.eth.Contract(abi, contractAddress);
};

export const hexify = (tokenId: number) => retrieveWeb3().utils.numberToHex(tokenId);
