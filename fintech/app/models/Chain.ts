export type Chain = {
    chainId: number;
    name: string;
    blockExplorerUrl: string;
    rpcUrl: string;
}

export const goerli: Chain = {
    chainId: 5,
    name: 'Goerli',
    blockExplorerUrl: 'https://sepolia.infura.io',
    rpcUrl: 'https://sepolia.infura.io/v3/d137a5632d0c48a59fbed116d2e4c978'
}

export  const mainnet: Chain = {
    chainId: 1,
    name: 'Mainnet',
    blockExplorerUrl: 'https://etherscan.io',
    rpcUrl: 'https://mainnet.infura.io/v3/d137a5632d0c48a59fbed116d2e4c978'
}

export const CHAINS_CONFIG = {
    [goerli.chainId]: goerli,
    [mainnet.chainId]: mainnet,
}