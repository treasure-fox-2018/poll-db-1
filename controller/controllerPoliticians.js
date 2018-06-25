const db = require("../db")
const ModelPolitician = require("../model/modelPoliticians")
const View  = require("../view/viewPoll") 

class ControllerPoliticians {
  static insert (input) {
    ModelPolitician.insert(input, (message) => {
      View.message(message)
    })
  } 

  static update (input) {
    ModelPolitician.update(input, (message) => {
      View.message(message)
    })
  }

  static delete (input) {
    ModelPolitician.delete(input, (message) => {
      View.message(message)
    })
  }

  static list (input){
    ModelPolitician.list(input, (message) => {
      View.message(message)
    })
  }

  static countVote (input) {
    ModelPolitician.countVote(input, (message) => {
      View.message(message)
    })
  }

  static topVote (input) {
    ModelPolitician.topVote(input, (message) => {
      View.message(message)
    })
  }
}

// const tes = ControllerPoliticians.insert(["Ari", "A", "C", 14.0899])

module.exports = ControllerPoliticians