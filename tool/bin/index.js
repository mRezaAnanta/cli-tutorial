#!/usr/bin/env node
// console.log('hello tool')
const process = require('process')

export function getArgs() {
  // return process.argv.forEach((val, index) => {
  //   console.log(index + ": " + val)
  // })
    // const arr = []
    const arr = {}
  process.argv.map((args, index) => {
    console.log(args, index)
    if(args.slice(0, 2) === "--") {
      // arr.push(args)
      const arg = args.split("=")
      console.log(arg)
      const argFlag = arg[0].slice(2)
      // console.log(argFlag)
      const argValue = arg.length > 1 ? arg[1] : true
      // console.log(argValue)
    }
  })
  console.log(arr)
  return arr
}

// const args = getArgs()
// console.log(args)
getArgs()
