#!/usr/bin/env node
// console.log('hello tool')
const process = require('process')

const availableCommand = {
  'options': {
    '--start': 'boolean',
    '--build': 'boolean',
  },
  'flags': {
    'a': 'boolean',
  },
  'args': {
    'publish': 'string',
  }
}

function getArgs(input) {
  const optionObj = {}
  const flagObj = {}
  const argArr = []
  const output = {}

  input.splice(0, 2)
  input.map((inp, index) => {
    if (inp.slice(0, 2) === "--") {
      let argArray = inp.split("=")
      let argOption = argArray[0]
      let argValue = argArray.length > 1 ? argArray[1] : true
      optionObj[argOption] = argValue
    } else if (inp[0] === "-") {
      let flags = inp.slice(1).split("")
      flags.forEach((flag) => {
        flagObj[flag] = true
      })
    } else {
      argArr.push(inp)
    }
  })
  output["options"] = optionObj
  output["flags"] = flagObj
  output["args"] = argArr
  console.log(output)
  return output
}

function checkArg(input, availableCommand) {
  // if the args obj exist in argList obj then see if typeof is the same
  // if it doesn't exist then send msg 'this command didn't exist and show command usage
  for (const [key, value] of Object.entries(input)) {
    for (const [k, v] of Object.entries(value)) {
      if (key == 'options' && !availableCommand["options"].hasOwnProperty(k) || key == 'flags' && !availableCommand["flags"].hasOwnProperty(k) || key == 'args' && !availableCommand["args"].hasOwnProperty(v)) {
        // args key will give index number since it's value is an array
        throw new Error(`Unknown or unexpected option: ${k >= 0 ? v : k} \n`)
      }
    }
  }
  return input
}

function start() {
  console.log('starting the app')
}

}

function usage() {
  console.log(`tool [CMD]
  --start\tStarts the app
  --build\tBuilds the app`)
}

module.exports = {
  getArgs,
  checkArg,
  availableCommand,
  start,
}
