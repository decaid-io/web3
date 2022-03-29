const DEFAULTS = {
  // decaid api url
  API_URL: 'http://localhost:8080',
  // decaid api version
  API_VERSION: 'v1'
}
const ENDPOINTS = {
  // ACCOUNT
  ACCOUNT: {
    GET: 'user/%s', // %s = wallet address
    BALANCE: 'user/%s/balance',
    ERC20BALANCE: 'user/%s/erc20', // %s = wallet address
    ERC20TRANSFERS: 'user/%s/erc20/transfers',
    NFT: 'user/%s/nft',
    NFTTRANSFERS: 'user/%s/nft/transfers',
    NFTWITHTOKENADRESS: 'user/%s/nft/%s' // %s = wallet address, %s = token address
  },
  // TOKEN
  TOKEN: {
    NFTMETADATA: 'token/nft/%s/metadata', // %s = contract address
    NFTOWNERS: 'token/nft/%s/owners', // %s = contract address
    NFTTOKENS: 'token/nft/%s', // %s = contract address
    NFTTRADES: 'token/nft/%s/trades', // %s = contract address
    NFTTOKENTRANSFERS: 'token/nft/%s/transfers', // %s = contract address
    NFTSEARCH: 'token/nft/search'
  }
}

export default { DEFAULTS, ENDPOINTS }
