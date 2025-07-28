#!/usr/bin/env node
// console.log('hello tool')
const process = require('process')

// FIX: the process.argv gets mixed up with the test/index.js
function getArgs(input) {
  // console.log(input + "2")
  const arr = []
  const obj = {}

  input.splice(0, 2)
  input.map((args, index) => {
    // console.log(args, index)
    if(args.slice(0, 2) === "--") {
      const arg = args.split("=")
      // console.log(arg)
      const argFlag = arg[0]
      // console.log(argFlag)
      const argValue = arg.length > 1 ? arg[1] : true
      // console.log(argValue)
      obj[argFlag] = argValue
    }
    else if(args[0] === "-") {
      const flags = args.slice(1).split("")
      flags.forEach((flag) => {
        obj[flag] = true
      })
    }
    else {
      // obj['arg'] = args
      arr.push(args)
    }
  })
  // console.log(arr)
  obj.arg = arr
  return obj
}

getArgs(process.argv)

const commandList = {
  '--start': 'boolean',
  '--build': 'boolean',
}

function checkArg(args, commandList) {
  const exist = []
  const notExist = []

  Object.entries(args).map(([key, value], index) => {
    if(!commandList.hasOwnProperty(key)) {
      notExist.push(`${index}. ${key}: ${value} (${typeof value})`)
    } else {
      exist.push(`${index}. ${key}: ${value} (${typeof value})`)
    }
  })
  console.log(exist, notExist)
}

module.exports = {
  getArgs,
  checkArg,
  commandList,
}
