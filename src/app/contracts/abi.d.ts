import {AbiItem} from 'web3-utils';

declare module '*.json' {
  const value: AbiItem[];
  export default value;
}
