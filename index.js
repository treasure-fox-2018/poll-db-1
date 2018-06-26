const argv = process.argv;
const ControllerPoliticians = require("./controller/controllerPoliticians");
const ControllerVoters = require("./controller/controllerVoters");
const ControllerVotes = require("./controller/controllerVotes");
const ControllerMenu = require("./controller/controllerMenu")

const command = argv[2];
const table = argv[3];

if (!table) {
  ControllerMenu.menuList()
}

if (command === "politician") {
  switch (table) {
    case "insert":
      const name = argv[4];
      const party = argv[5];
      const location = argv[6];
      const grade_current = argv[7];
      ControllerPoliticians.insert([name, party, location, grade_current]);
      break;
    case "update":
      const idUpdate = argv[4];
      const commentUpdate = argv[4];
      ControllerPoliticians.update([idUpdate, commentUpdate]);
      break;
    case "delete":
      const idDelete = argv[4]
      ControllerPoliticians.delete(idDelete)
      break;
    case "list":
      const commandList = argv[4]
      ControllerPoliticians.list(commandList)
      break;
    case "hitungVote":
      const commandHitungVote = argv[4]
      ControllerPoliticians.countVote(commandHitungVote)
      break;
    case "topVote":
      const commandTopVote = argv[4]
      ControllerPoliticians.topVote(commandTopVote)
      break;
    default:
      console.log(`Maaf! Menu ${table} tidak tersedia`);
  }
} else if (command === "voter") {
  switch (table) {
    case "insert":
      const first_name = argv[4]
      const last_name = argv[5]
      const gender = argv[6]
      const age = argv[7]
      ControllerVoters.insert([first_name, last_name, gender, age])
      break;
    case "delete":
      const idDeleteVoter = argv[4]
      ControllerVoters.delete(idDeleteVoter)
      break;
  }
}

// // const insertPolitician = ControllerPoliticians.insert(["Ari", "A", "LA", 14.0899])
// const updatePolitician = ControllerPoliticians.update(["id:45", "location:LE"]);
// // const deletePolitician = ControllerPoliticians.delete("id:44")
// // const list = ControllerPoliticians.list("party:r")
// // const hitungVote = ControllerPoliticians.countVote("hitungVote:olympia")
// // const topvote = ControllerPoliticians.topVote("topVote:3")

// // const insert_voter = ControllerVoters.insert(["ari", "supriatna", "male", 18])
// // const delete_voter = ControllerVoters.delete("id:301")
