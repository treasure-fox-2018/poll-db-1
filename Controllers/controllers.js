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

        //seed data votes
    }
}

module.exports = Controllers
