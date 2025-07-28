const tool = require('../tool/bin/index.js')

const argList = [
  '/home/mrezaananta/.local/share/mise/installs/node/24.3.0/bin/node',
  '/home/mrezaananta/.local/share/mise/installs/node/24.3.0/bin/tool',
  'asdk',
  '--shadas=jafsd',
  '-Uifgasd',
  'notice',
  '--start',
]

const ans = tool.getArgs(argList)
const check = tool.checkArg(ans, tool.commandList)

// console.assert()
