const { Command } = require('@oclif/command')
const { cli } = require('cli-ux')
const decodeTxData = require('../helpers/decodeTxData')

class DecodeCommand extends Command {
  async run() {
    const { args } = this.parse(DecodeCommand)

    try {
      const { functionSignature, txData } = args
      const result = decodeTxData(functionSignature, txData)

      cli.styledJSON(result)
    } catch (e) {
      this.error(e.message, { exit: 1 })
    }
  }
}

DecodeCommand.aliases = ['de']

DecodeCommand.description = `Decode the arguments of the given transaction data for the given function signature.`

DecodeCommand.args = [
  {
    name: 'functionSignature',
    required: true,
    description: 'The function signature.'
  },
  {
    name: 'txData',
    required: true,
    description: 'The given transaction data.'
  }
]

DecodeCommand.examples = [
  `eth decode 'transfer(address,uint256)' '0xa9059cbb000000000000000000000000697dB915674bAc602F4d6fAfA31c0e45f386416E00000000000000000000000000000000000000000000000000000004ff043b9e'`
]

module.exports = DecodeCommand
