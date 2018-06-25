const ModelPolitician = require('../model/modelPolitician')
const ModelVoter = require('../model/modelVoter')
const ModelVote = require('../model/modelVote')
const View = require('../view/view')


class Controller {

  static insertPolitician (name, party, location, grade_current) {
    ModelPolitician.insert (name, party, location, grade_current, function callback (newInsertedID) {
      let printData = `Data politician berhasil dimasukkan dengan id ${newInsertedID}`
      View.printConsole(printData)
    });
  }

  static updatePolitician (id, name, party, location, grade_current) {
    ModelPolitician.update(id, name, party, location, grade_current, function callback () {
      let printData = `Data politician ${id} berhasil diupdate`
      View.printConsole(printData)
    });
  }

  static deletePolitician (id) {
    ModelPolitician.delete(id, function callback () {
      let printData = `Data Politician ${id} berhasil dihapus`
      View.printConsole(printData)
    });
  }

  static insertVoter (first_name, last_name, gender, age) {
    ModelVoter.insert(first_name, last_name, gender, age, function callback (newInsertedID) {
      let printData = `Data Voter berhasil dimasukkan dengan id ${newInsertedID}`
      View.printConsole(printData)
    });
  }

  static updateVoter (id, first_name, last_name, gender, age) {
    ModelVoter.update(id, first_name, last_name, gender, age, function callback () {
      let printData = `Data Voter ${id} berhasil diupdate`
      View.printConsole(printData)
    });
  }

  static deleteVoter (id) {
    ModelVoter.delete (id, function callback () {
      let printData = `Data Voter ${id} berhasil dihapus`
      View.printConsole(printData)
    });
  }

  static insertVote (voterId, politicianId) {
    ModelVote.insert(voterId, politicianId, function callback (newInsertedID) {
      let printData = `Data Vote berhasil dimasukkan dengan id ${newInsertedID}`
      View.printConsole(printData)
    });
  }

  static updateVote (id, voterId, politicianId) {
    ModelVote.update(id, voterId, politicianId, function callback () {
      let printData = `Data Vote ${id} berhasil diupdate`
      View.printConsole(printData)
    });
  }

  static deleteVote (id) {
    ModelVote.delete(id, function callback () {
      let printData = `Data Vote ${id} berhasil dihapus`
      View.printConsole(printData)
    });
  }
  
}

module.exports = Controller