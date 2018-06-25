let argv = process.argv
let command = argv[2]
const Controller = require ('./controller.js')

// politicians
if (command == 'addPoliticians') {
Controller.create(argv[3], argv[4], argv[5], argv[6])
}
else if (command == 'updatePoliticians') {
  Controller.update(argv[3], argv[4], argv[5])
}
else if (command == 'deletePoliticians') {
  Controller.delete(argv[3])
}

// voters
if (command == 'addVoters') {
Controller.create(argv[3], argv[4], argv[5], argv[6])
}
else if (command == 'updateVoters') {
  Controller.update(argv[3], argv[4], argv[5])
}
else if (command == 'deleteVoters') {
  Controller.delete(argv[3])
}

// votes

if (command == 'addVotes') {
Controller.create(argv[3], argv[4])
}
else if (command == 'updateVotes') {
  Controller.update(argv[3], argv[4], argv[5])
}
else if (command == 'deleteVotes') {
  Controller.delete(argv[3])
}
