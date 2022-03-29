# Decaid Web3 JS SDK 🚀
Think about to integrate easily to web3 era. Decaid provides managed and classified blockchain datas and services. You can access the all blockchain datas in one line code! In the near feature you can mint an NFT, deploy a contract and call a contract.

For more information visit our official [documentation](https://docs.decaid.io).

## Say hi to Web3 Era!
Quick start quide to Decaid! Learn how to create an Decaid key, make your first request, setup up Decaid as your client, and get to building!

Steps to get started with Decaid
This guide assumes you already have an Decaid key and access to the Decaid API.

1. 🔐 Create a Free API Key

2. 🤘 Make a request

3. 🤝 Setup up Decaid as your client

4. 🕹️ Build your first Web3 application!


### Decaid Web3 API
There are tons of Web3 libraries you can integrate with Decaid, however, Decaid's Web3 API is the most stable and reliable.

To install Decaid Web3 API, you want to create a project, and then navigate to your project directory to run the installation. Let's go ahead and do that! Once we're in our home directory, let's execute the following:

With yarn;
```sh
mkdir my-cool-project
cd my-cool-project
yarn add @decaid/web3
```
With npm;
```sh
mkdir my-cool-project
cd my-cool-project
npm install @decaid/web3
```

## Talk is cheap, show me the code! ❤️‍🔥
Decaid's Web3 API has easy to use endpoints that allow you to fetch and display NFTs for your users. In addition you can use our JS SDK to interact with the Decaid API's!

Let's get the user's NFTs!
```js
import Decaid from '@decaid/web3'

const web3 = new Decaid({
api_key: '<your-api-key>',
chain: '<chain>', // you can write 'eth', 'rinkeby', 'matic', 'mumbai', 
wallet_address: '<user-wallet-address>' // it's not required for NFT API
})

const NFTs = await web3.getNFTs()
```
It was easy! Right?

## Pagination and Limitation 
All Decaid functions has a pagination feature. You can send pagination options in the last parameter. For instance, you can fetch all NFTs owned by an address by using the following method.

```js
const NFTs = await web3.getNFTs(walletAddress, limit, offset)
```

## Decaid's Features
### 🧠 Managed Blockchain Datas
You can access the all blockchain datas in one line code!. Decaid provides 2 core products which make the developer experience as easy as possible and accessible to everyone. All of them enable to focus on building the best product for your business.

### 🔥 Decaid NFT API
Decaid NFT API provides all NFT datas in one line code. You can mint an NFT, deploy a contract, call a contract, etc. In addition to that, Decaid NFT API provides NFT Search, NFT Owners and more!

### 👁 Decaid Blockchain API
Decaid Blockchain API provides all blockchain datas and you can use it to get block, transaction, contract, etc.
