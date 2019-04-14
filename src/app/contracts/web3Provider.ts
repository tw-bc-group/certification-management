import Web3 from 'web3';
import {default as abi} from './abi.json';
import {endpoint, contractAddress} from './constant';

declare var window: any;

const retrieveWeb3 = () => {
  if (window.ethereum) {
    return new Web3(window.ethereum);
  } else {
    return new Web3(endpoint);
  }
};

const walletAddress = () => {
  if (window.ethereum.selectedAddress) {
    return window.ethereum.selectedAddress;
  } else {
    alert('please unlock your meta mask wallet at first');
  }
};

export const retrieveContract = () => {
  const web3 = retrieveWeb3();
  return new web3.eth.Contract(abi, contractAddress, {defaultAccount: walletAddress()});
};

export const hexify = (tokenId: number) => retrieveWeb3().utils.numberToHex(tokenId);
