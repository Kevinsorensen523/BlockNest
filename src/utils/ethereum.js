import Web3 from "web3";

export const connectToMetaMask = async () => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const web3 = new Web3(window.ethereum);
      return web3;
    } catch (error) {
      console.error("User denied account access or error occurred", error);
      return null;
    }
  } else {
    console.error("MetaMask not detected");
    return null;
  }
};

export const donateEther = async (web3, recipient, amount) => {
  const accounts = await web3.eth.getAccounts();
  try {
    await web3.eth.sendTransaction({
      from: accounts[0],
      to: recipient,
      value: web3.utils.toWei(amount, "ether"),
    });
    alert("Donation successful!");
  } catch (error) {
    console.error("Error sending transaction", error);
    alert("Donation failed");
  }
};
