declare module "./ethereum" {
  import Web3 from "web3";

  export const connectToMetaMask: () => Promise<Web3 | null>;

  export const donateEther: (
    web3: Web3,
    recipient: string,
    amount: string
  ) => Promise<void>;
}
