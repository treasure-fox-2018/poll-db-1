const Model = require('./model.js')
const View = require('./view.js')

class Controller {
  constructor() {

  }

  // politicians
  static createPoliticians(name, party, location, grade_current) {
    Model.createPoliticians(name, party, location, grade_current, function(data) {
      View.createPoliticians(data)
    })
  }
  static updatePoliticians(id, column, value) {
    Model.updatePoliticians(id, column, value, function(data) {
      View.updatePoliticians(data)
    })
  }
  static deletePoliticians(id) {
    Model.deletePoliticians(id, function(data) {
      View.deletePoliticians(data)
    })
  }
  //  voters

  static createVoters(first_name, last_name, gender, age) {
    Model.createVoters(first_name, last_name, gender, age, function(data) {
      View.createVoters(data)
    })
  }
  static updateVoters(id, column, value) {
    Model.updateVoters(id, column, value, function(data) {
      View.updateVoters(data)
    })
  }
  static deleteVoters(id) {
    Model.deleteVoters(id, function(data) {
      View.deleteVoters(data)
    })
  }

  // Votes

  static createVotes(id_voters, id_politicians) {
    Model.createVotes(id_voters, id_politicians, function(data) {
      View.createVotes(data)
    })
  }
  static updateVotes(id, column, value) {
    Model.updateVotes(id, column, value, function(data) {
      View.updateVotes(data)
    })
  }
  static deleteVotes(id) {
    Model.deleteVotes(id, function(data) {
      View.deleteVotes(data)
    })
  }
}

module.exports = Controller
