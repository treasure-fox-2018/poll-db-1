'use strict'

const Controllers = require('./Controllers/controllers.js')

let argv = process.argv

let command = argv[2]
let queryCommand = argv[3]

if (command === 'seedData') {
    Controllers.seedData()
} else if (command === 'politician') {
    let politican = argv.slice(4)
    if (queryCommand === 'insert') {
        Controllers.addNewPolitican(politican)
    } else if (queryCommand === 'update') {
        Controllers.updatePolitican(politican)
    } else if (queryCommand === 'delete') {
        let politicanId = argv[4]
        Controllers.deletePolitican(politicanId)
    }
} else if (command === 'voters') {
    let voter = argv.slice(4)
    if (queryCommand === 'insert') {
        Controllers.addNewVoter(voter)
    } else if (queryCommand === 'update') {
        Controllers.updateVoter(voter)
    } else if (queryCommand === 'delete') {
        let voterId = argv[4]
        Controllers.deleteVoter(voterId)
    }
} else if (command === 'votes') {
    let vote = argv.slice(4)
    if (queryCommand === 'insert') {
        Controllers.addNewVote(vote)
    } else if (queryCommand === 'update') {
        Controllers.updateVote(vote)
    } else if (queryCommand === 'delete') {
        let voteId = argv[4]
        Controllers.deleteVote(voteId)
    }
}
