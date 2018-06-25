const db = require("../db")
const ModelVotes = require("../model/modelVotes")
const View = require("../view/viewPoll")

class ControllerVotes {
  static insert (input) {
    ModelVotes.insert(input, (message) => {
      View.message(message)
    })
  }

  static delete (input) {
    ModelVotes.delete(input, (message) => {
      View.message(message)
    })
  }
}

module.exports = ControllerVotes