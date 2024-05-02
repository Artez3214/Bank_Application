import '@ethersproject/shims';
import {  ethers } from 'ethers';

export const generateKeys = async (seedPhrase?: string) => {


        let wallet: ethers.Wallet;
           
        if (seedPhrase) {
            wallet =  ethers.Wallet.fromMnemonic(seedPhrase);
        }
       else {
            wallet = ethers.Wallet.createRandom(); // Remove 'const' keyword here
            seedPhrase = wallet.mnemonic.phrase;
        }
        
        const privateKey = wallet.privateKey;
        const address = wallet.address;


    return { seedPhrase, privateKey, address};
};


