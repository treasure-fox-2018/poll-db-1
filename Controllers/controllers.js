'use strict'

const Model = require('../Models/model.js')
const Views = require('../Views/views.js')

class Controllers {
    static seedData() {
        //seed data politicans
        let politicans = Model.seedPoliticans()
        let insertStatus = Model.insertPoliticans(politicans)
        Views.showMessage(insertStatus)
        //seed data voters
        let voters = Model.seedVoters()
        let insertVoters = Model.insertVoters(voters)
        Views.showMessage(insertVoters)
        //seed data votes
        let votes = Model.seedVotes()
        let insertVotes = Model.insertVotes(votes)
        Views.showMessage(insertVotes)
    }
}

module.exports = Controllers
