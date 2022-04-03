import Web3 from 'web3'
import axios from 'axios'
import util from 'util'
import { Method } from './types'
import IOptions from './interfaces/options'
import URLs from './constants/constants'
import { StatusCodes } from 'http-status-codes'
export default class Decaid extends Web3 {
  options: IOptions

  constructor (options: IOptions) {
    super(options.provider || '')
    this.options = options
  }

  private getEndpoint (
    endpoint: string,
    limit?: number | 100,
    offset?: number | 0,
    param?: string
  ): string {
    const limitStr = limit === undefined ? `` : `&limit=${limit}`
    const offsetStr = offset === undefined ? `` : `&offset=${offset}`
    const paramStr = param === undefined ? `` : param
    const defaultURI = this.options.apiURL || URLs.DEFAULTS.API_URL
    return `${defaultURI}/${URLs.DEFAULTS.API_VERSION}/${endpoint}?chain=${this.options.chain}${limitStr}${offsetStr}${paramStr}`
  }

  async getBlock (blockNumber: number): Promise<any> {
    return await this.eth.getBlock(blockNumber, true)
  }

  async getTx (txHash: string): Promise<any> {
    return await this.eth.getTransaction(txHash)
  }

  /**
   * Get User Token Balances
   * @param walletAddress The wallet address of the account
   * @param limit Limit of results
   * @param offset Offset of results
   * @returns Promise<any>
   */
  async getUserTokenBalance (
    walletAddress?: string,
    limit?: number | 100,
    offset?: number | 0
  ): Promise<any> {
    if (walletAddress === undefined) {
      walletAddress = this.options.walletAddress
    }
    if (walletAddress === undefined) {
      throw new Error('walletAddress is required')
    }
    return this.execute(
      this.getEndpoint(
        util.format(URLs.ENDPOINTS.ACCOUNT.ERC20BALANCE, walletAddress),
        limit,
        offset
      )
    )
  }

  /**
   * Get User's Token Transfers
   * @param walletAddress The wallet address of the account
   * @param limit Limit of results
   * @param offset Offset of results
   * @returns Promise<any>
   */
  async getUserTokenTransfers (
    walletAddress?: string,
    limit?: number | 100,
    offset?: number | 0
  ): Promise<any> {
    if (walletAddress === undefined) {
      walletAddress = this.options.walletAddress
    }
    if (walletAddress === undefined) {
      throw new Error('walletAddress is required')
    }
    return this.execute(
      this.getEndpoint(
        util.format(URLs.ENDPOINTS.ACCOUNT.ERC20TRANSFERS, walletAddress),
        limit,
        offset
      )
    )
  }

  /**
   * Get User's NFTs
   * @param walletAddress The wallet address of the account
   * @param limit Limit of results
   * @param offset Offset of results
   * @returns Promise<any>
   */
  async getUserNFTs (
    walletAddress?: string,
    limit?: number | 100,
    offset?: number | 0
  ): Promise<any> {
    if (walletAddress === undefined) {
      walletAddress = this.options.walletAddress
    }
    if (walletAddress === undefined) {
      throw new Error('walletAddress is required')
    }
    return await this.execute(
      this.getEndpoint(
        util.format(URLs.ENDPOINTS.ACCOUNT.NFT, walletAddress),
        limit,
        offset
      )
    )
  }

  /**
   * Get Account's NFT Transfers with given wallet address
   * @param walletAddress The wallet address of the account
   * @param limit Limit of results
   * @param offset Offset of results
   * @returns Promise<any>
   */
  async getNFTTransfersWithAddress (
    walletAddress?: string,
    limit?: number | 100,
    offset?: number | 0
  ): Promise<any> {
    if (walletAddress === undefined) {
      walletAddress = this.options.walletAddress
    }
    if (walletAddress === undefined) {
      throw new Error('walletAddress is required')
    }
    return await this.execute(
      this.getEndpoint(
        util.format(URLs.ENDPOINTS.ACCOUNT.NFTTRANSFERS, walletAddress),
        limit,
        offset
      )
    )
  }

  /**
   * Get NFT Metadata by token address
   * @param tokenAddress The token address of the NFT
   * @returns Promise<any>
   */
  async getNFTMetaData (tokenAddress: string): Promise<any> {
    return this.execute(
      this.getEndpoint(
        util.format(URLs.ENDPOINTS.TOKEN.NFTMETADATA, tokenAddress)
      )
    )
  }

  /**
   * Get NFT Owners by address
   * @param tokenAddress The token address of the NFT
   * @param tokenId The token id of the NFT
   * @param limit Limit of results
   * @param offset Offset of results
   * @returns Promise<any>
   */
  async getNFTOwners (
    tokenAddress: string,
    tokenId?: number,
    limit?: number | 100,
    offset?: number | 0
  ): Promise<any> {
    return this.execute(
      this.getEndpoint(
        util.format(URLs.ENDPOINTS.TOKEN.NFTOWNERS, tokenAddress),
        limit,
        offset,
        tokenId === undefined ? '' : '&token_id=' + tokenId
      ),
      'GET'
    )
  }

  /**
   * Get NFT Tokens by address
   * @param tokenAddress The token address of the NFT
   * @param limit Limit of results
   * @param offset Offset of results
   * @returns Promise<any>
   */
  async getNFTTokens (
    tokenAddress: string,
    limit?: number | 100,
    offset?: number | 0
  ) {
    return this.execute(
      this.getEndpoint(
        util.format(URLs.ENDPOINTS.TOKEN.NFTTOKENS, tokenAddress),
        limit,
        offset
      ),
      'GET'
    )
  }

  /**
   * Get NFT Trades by address
   * @param tokenAddress The token address of the NFT
   * @param limit Limit of results
   * @param offset Offset of results
   * @returns Promise<any>
   */
  async getNFTTrades (
    tokenAddress: string,
    limit?: number | 100,
    offset?: number | 0
  ): Promise<any> {
    return this.execute(
      this.getEndpoint(
        util.format(URLs.ENDPOINTS.TOKEN.NFTTRADES, tokenAddress),
        limit,
        offset
      )
    )
  }

  /**
   * Get searched NFTs by name
   * @param q Query string
   * @param limit Limit of results
   * @param offset Offset of results
   * @returns Promise<any>
   */
  async nftSearch (
    q: string,
    limit?: number | 100,
    offset?: number | 0
  ): Promise<any> {
    return await this.execute(
      this.getEndpoint(URLs.ENDPOINTS.TOKEN.NFTSEARCH, limit, offset, '&q=' + q)
    )
  }

  async execute (endpoint: string, method?: Method, data?: any): Promise<any> {
    return axios({
      url: endpoint,
      headers: {
        'x-decaid-api-key': this.options.apiKey
      },
      data,
      method: method || 'GET'
    })
      .then((response: any) => {
        if (response.status !== StatusCodes.OK) {
          throw new Error(
            `${response.status} ${response.statusText}: ${response.data}`
          )
        }
        return response.data
      })
      .catch((error: any) => {
        if (error.response.status === StatusCodes.UNAUTHORIZED) {
          throw new Error('Invalid API Key')
        }
        throw new Error(error)
      })
  }
}
