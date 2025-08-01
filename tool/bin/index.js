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

function checkArg(args, availableCommand) {
  const exist = []
  const notExist = []
  const argList = []

  for (const [key, value] of Object.entries(args)) {
    if (!availableCommand.hasOwnProperty(key) && key != 'args') {
      notExist.push(key)
    } else if (key != 'args') {
      exist.push(key)
    } else if (value.length > 0){
      argList.push(...value)
    }
  }

  if (notExist.length > 0) {
    throw new Error(`Unknown or unexpected option: ${notExist[0]} \n`)
  } else if (exist.length > 0 && argList.length > 0){
    return [exist, argList]
  } else if (exist.length > 0) {
    return exist
  } else if (argList.length > 0) {
    return argList
  }
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
