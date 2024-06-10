import { ethers } from 'ethers';

async function writeData(privateKey, data) {
  try {
    const provider = new ethers.JsonRpcProvider('https://rpc.sepolia.org');
    const wallet = new ethers.Wallet(privateKey, provider);
    console.log(`Wallet Address: ${wallet.address}`);
    console.log(`Data: ${data}`);

    const tx = {
      to: wallet.address,
      value: ethers.parseEther('0.01'),
      data: ethers.hexlify(ethers.toUtf8Bytes(data)), 
    };

    console.log('Transaction Object:', tx);

    const transactionResponse = await wallet.sendTransaction(tx);
    console.log('Transaction Response:', transactionResponse);

    await transactionResponse.wait();
    console.log('Transaction Mined:', transactionResponse);

    return 'Transaction successful';
  } catch (error) {
    console.error('Error in writeData function:', error);
    throw new Error('Please fund your account to cover the transaction costs.');
  }
}

export default writeData;