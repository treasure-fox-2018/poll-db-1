'use strict'

const Model = require('../Models/model.js')
const Views = require('../Views/views.js')

class Controllers {
    static seedData() {
        //seed data politicans
        let politicans = Model.seedPoliticans()
        let insertStatusMessage = Model.insertPoliticansCSV(politicans)
        Views.showMessage(insertStatusMessage)
        //seed data voters
        let voters = Model.seedVoters()
        let insertVotersMessage = Model.insertVotersCSV(voters)
        Views.showMessage(insertVotersMessage)
        //seed data votes
        let votes = Model.seedVotes()
        let insertVotesMessage = Model.insertVotesCSV(votes)
        Views.showMessage(insertVotesMessage)
    }

    // ------         Politicians       -------------

    static addNewPolitican(politican) {
        let addPoliticanMessage = Model.addPolitican(politican)
        Views.showMessage(addPoliticanMessage)
    }

    static updatePolitican(politican) {
        let updatePoliticanMessage = Model.updatePolitican(politican)
        Views.showMessage(updatePoliticanMessage)
    }

    static deletePolitican(politicanId) {
        let deletePoliticanMessage = Model.deletePolitican(politicanId)
        Views.showMessage(deletePoliticanMessage)
    }

    // ------         Voters       -------------

    static addNewVoter(voter) {
        let addVoterMessage = Model.addVoter(voter)
        Views.showMessage(addVoterMessage)
    }

    static updateVoter(voter) {
        let updateVoterMessage = Model.updateVoter(voter)
        Views.showMessage(updateVoterMessage)
    }

    static deleteVoter(voterId) {
        let deleteVoterMessage = Model.deleteVoter(voterId)
        Views.showMessage(deleteVoterMessage)
    }

    // ------         Votes       -------------

    static addNewVote(vote) {
        let addVoteMessage = Model.addVote(vote)
        Views.showMessage(addVoteMessage)
    }

    static updateVote(vote) {
        let updateVoteMessage = Model.updateVote(vote)
        Views.showMessage(updateVoteMessage)
    }

    static deleteVote(voteId) {
        let deleteVoteMessage = Model.deleteVote(voteId)
        Views.showMessage(deleteVoteMessage)
    }

    // ------         Filters       -------------

    static firstFilter() {
        let resultOfFilter = Model.getFirstFilter()
    }

    static secondFilter() {
        let resultOfFilter = Model.getSecondFilter()
    }

    static thirdFilter() {
        let resultOfFilter = Model.getThirdFilter()
    }

    static fourthFilter() {
        let resultOfFilter = Model.getFourthFilter()
    }

    static fifthFilter() {
        let resultOfFilter = Model.getFifthFilter()
    }
}

module.exports = Controllers














//
