"use client";
import { useState } from 'react';
import generateWallet from '../utils/wallet';
import writeData from '../utils/writeData';

export default function Home() {
  const [wallet, setWallet] = useState(null);
  const [privateKey, setPrivateKey] = useState('');
  const [data, setData] = useState('');
  const [transactionMessage, setTransactionMessage] = useState('');
  const [error, setError] = useState('');

  const handleGenerateWallet = () => {
    const walletData = generateWallet();
    setWallet(walletData);
    setPrivateKey(walletData.privateKey); 
  };

  const handleWriteData = async (e) => {
    e.preventDefault();
    try {
      const message = await writeData(privateKey, data);
      setTransactionMessage(message);
      setError('');
    } catch (err) {
      console.error('Error in handleWriteData:', err);
      setError(err.message);
      setTransactionMessage('');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#121211]">
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-black">
        <h2 className="font-bold text-xltext-neutral-200">
          Ethereum Wallet API
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Generate an Ethereum wallet and write data to the blockchain.
        </p>

        <button
          className="bg-gradient-to-br relative group/btn from-zinc-900 to-zinc-900  block bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] mt-4"
          onClick={handleGenerateWallet}
        >
          Generate Wallet &rarr;
          <BottomGradient />
        </button>

        {wallet && (
          <div className="mt-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" value={wallet.address} readOnly />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="privateKey">Private Key</Label>
              <Input id="privateKey" value={wallet.privateKey} readOnly />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="mnemonic">Secret Recovery Phrase</Label>
              <Input id="mnemonic" value={wallet.mnemonic} readOnly />
            </div>
          </div>
        )}

        <form className="my-8" onSubmit={handleWriteData}>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="privateKeyInput">Private Key</Label>
            <Input
              id="privateKeyInput"
              placeholder="Private Key"
              type="text"
              value={privateKey}
              onChange={(e) => setPrivateKey(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-2 mt-4">
            <Label htmlFor="dataInput">Write Data</Label>
            <Input
              id="dataInput"
              placeholder="Data"
              type="text"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
          </div>

          <button
            className="bg-gradient-to-br relative group/btn from-zinc-900 to-zinc-900 block bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] mt-4"
            type="submit"
          >
            Write Data &rarr;
            <BottomGradient />
          </button>

          {transactionMessage && (
            <div className="mt-4">
              <p><strong>Transaction Status:</strong> {transactionMessage}</p>
            </div>
          )}
          {error && (
            <div className="mt-4">
              <p style={{ color: 'red' }}><strong>Error:</strong> {error}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const Label = ({ children, htmlFor }) => (
  <label htmlFor={htmlFor} className="text-neutral-800 dark:text-neutral-200 font-medium">
    {children}
  </label>
);

const Input = ({ id, ...props }) => (
  <input
    id={id}
    className="w-full p-2 mt-1 border rounded-md bg-white dark:bg-zinc-900 text-neutral-800 dark:text-neutral-200 border-neutral-300 dark:border-neutral-700"
    {...props}
  />
);