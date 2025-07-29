#!/usr/bin/env node
// console.log('hello tool')
const process = require('process')

// FIX: the process.argv gets mixed up with the test/index.js
const availableCommand = {
  '--start': 'boolean',
  '--build': 'boolean',
}

function getArgs(input) {
  // console.log(input + "2")
  const arr = []
  const obj = {}

  input.splice(0, 2)
  input.map((args, index) => {
    // console.log(args, index)
    if (args.slice(0, 2) === "--") {
      const arg = args.split("=")
      // console.log(arg)
      const argFlag = arg[0]
      // console.log(argFlag)
      const argValue = arg.length > 1 ? arg[1] : true
      // console.log(argValue)
      obj[argFlag] = argValue
    } else if (args[0] === "-") {
      const flags = args.slice(1).split("")
      flags.forEach((flag) => {
        obj[flag] = true
      })
    } else {
      arr.push(args)
    }
  })
  // console.log(arr)
  obj.arg = arr
  return obj
}

function checkArg(args, availableCommand) {
  const exist = []
  const notExist = []
  const argList = []

  for (const [key, value] of Object.entries(args)) {
    if (!availableCommand.hasOwnProperty(key) && key != 'arg') {
      notExist.push(key)
    } else if (key != 'arg') {
      exist.push(key)
    } else if (value.length > 0){
      argList.push(...value)
    }
  }

  if (exist.length > 0 && argList.length > 0){
    return [exist, argList]
  } else if (exist.length > 0) {
    return exist
  } else if (argList.length > 0) {
    return argList
  } else {
    throw new Error(`${notExist[0]} doesn't exist`)
  }
}

function start() {
  console.log('starting the app')
}

    }
  })
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
