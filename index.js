'use strict'

const Controllers = require('./Controllers/controllers.js')

let argv = process.argv

let command = argv[2]

if (command === 'seedData') {
    Controllers.seedData()
}
