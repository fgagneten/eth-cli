const Base = require('../../base')
const sendTransaction = require('../../helpers/sendTransaction')
const { cli } = require('cli-ux')
const { getNetworkFlags } = require('../../helpers/networks')

class SendTransactionCommand extends Base {
  async run() {
    const { args, flags } = this.parse(SendTransactionCommand)

    let networkUrl

    try {
      networkUrl = this.getNetworkUrl(flags)

      const { encodedABI, address, pk } = args
      const result = await sendTransaction(encodedABI, address, pk, networkUrl)

      cli.styledJSON(result)
    } catch (e) {
      this.error(e.message, { exit: 1 })
    }
  }
}

SendTransactionCommand.aliases = ['m:st']

SendTransactionCommand.description = `Sends the transaction for the contract in <address> with <encodedABI> using private key <pk>.`

SendTransactionCommand.args = [
  {
    name: 'encodedABI',
    required: true,
    description: 'The encoded ABI.'
  },
  {
    name: 'address',
    required: true,
    description: `The contract's address.`
  },
  {
    name: 'pk',
    required: true,
    description: 'The private key.'
  }
]

SendTransactionCommand.flags = getNetworkFlags()

SendTransactionCommand.examples = ['eth method:send-transaction']

module.exports = SendTransactionCommand
