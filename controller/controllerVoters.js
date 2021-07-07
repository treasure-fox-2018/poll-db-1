const db = require("../db")
const ModelVoters = require("../model/modelVoters")
const View = require("../view/viewPoll")

class ControllerVoters {
  static insert (input) {
    ModelVoters.insert(input, (message) => {
      View.message(message)
    })
  }

  static update (input) {
    ModelVoters.update(input, (message) => {
      View.message(message)
    })
  }

  static delete (input) {
    ModelVoters.delete(input, (message) => {
      View.message(message)
    })
  }
}


module.exports = ControllerVoters