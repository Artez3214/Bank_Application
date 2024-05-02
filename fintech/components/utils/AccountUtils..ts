/*import 'react-native-get-random-values';
import '@ethersproject/shims';
import {Mnemonic, ethers } from 'ethers';

export const generateKeys = async (seedPhrase?: string) => {

    const { Wallet } = require('ethers');
    let wallet: ethers.HDNodeWallet;
       
    if (seedPhrase) {
        wallet =  ethers.HDNodeWallet.fromMnemonic(seedPhrase);
    }
   else {
        const wallet = ethers.HDNodeWallet.createRandom();
        const seedPhrase = wallet.mnemonic.phrase;
    }
    wallet = ethers.HDNodeWallet.createRandom();
  
    if(seedPhrase){
        wallet = ethers.HDNodeWallet.fromMnemonic(seedPhrase);
    }

    return { mnemonic: seedPhrase};
};

*/
