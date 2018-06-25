const ControllerPoliticians = require("./controller/controllerPoliticians")
const ControllerVoters = require("./controller/controllerVoters")
const ControllerVotes = require("./controller/controllerVotes")

const insertPolitician = ControllerPoliticians.insert(["Ari", "A", "LA", 14.0899])
const updatePolitician = ControllerPoliticians.update(["id:45", "location:LE"])
const deletePolitician = ControllerPoliticians.delete("id:44")
const list = ControllerPoliticians.list("party:r")
const hitungVote = ControllerPoliticians.countVote("hitungVote:olympia")
const topvote = ControllerPoliticians.topVote("topVote:3")

const insert_voter = ControllerVoters.insert(["ari", "supriatna", "male", 18])
const delete_voter = ControllerVoters.delete("id:301")
