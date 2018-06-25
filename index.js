let argv = process.argv
const Controller = require('./controller/controller')

let table = argv[2]
let command = argv[3]

if(table == 'politician') {
  //insert new data table politicians
  //example use node index.js politician insert jokowi R IL 8.99
  if(command == 'insert') {
    const name = argv[4]
    const party = argv[5]
    const location = argv[6]
    const grade_current = argv[7]
    Controller.insertPolitician(name, party, location, grade_current)
  }
  //update data table politicians by ID
  //example use node index.js politician update 21 jokowi R IL 7.88
  if(command == 'update') {
    const id = argv[4]
    const name = argv[5]
    const party = argv[6]
    const location = argv[7]
    const grade_current = argv[8]
    Controller.updatePolitician(id,name,party,location,grade_current)
  }
  //delete data table politicians by ID
  //example use node index.js politician delete 21
  if(command == 'delete') {
    const id = argv[4]
    Controller.deletePolitician(id)
  }

  //query release 3 soal 1,2,3,4,5
  //example use node index.js politician query 1
  //example use node index.js politician query 2
  //example use node index.js politician query 3
  //example use node index.js politician query 4
  //example use node index.js politician query 5
  if (command == 'query') {
    const noExec = argv[4]
    Controller.queryPolitician(noExec)
  }

} else if(table == 'voter') {
    //insert data table voter
   //example use node index.js voter insert budi handuk laki 19
  if(command == 'insert') {
    const first_name = argv[4]
    const last_name = argv[5]
    const gender = argv[6]
    const age = argv[7]
    Controller.insertVoter(first_name, last_name, gender, age)
  }
  //update data table voter by ID
  //example use node index.js voter update 151 budi handuk laki 20
  if(command == 'update') {
    const id = argv[4]
    const first_name = argv[5]
    const last_name = argv[6]
    const gender = argv[7]
    const age = argv[8]
    Controller.updateVoter(id,first_name,last_name,gender,age)
  }
  //delete data table voter by ID
  //example use node index.js voter delete 151
  if(command == 'delete') {
    const id = argv[4]
    Controller.deleteVoter(id)
  }
} else if(table == 'vote') {
  //insert data table vote
  //example use node index.js vote insert 150 12
  if(command == 'insert') {
    const voterId = argv[4]
    const politicianId = argv[5]
    Controller.insertVote(voterId, politicianId)
  }
  //update data table vote by ID
  //example use node index.js vote update 164 150 13
  if(command == 'update') {
    const id = argv[4]
    const voterId = argv[5]
    const politicianId = argv[6]
    Controller.updateVote(id,voterId,politicianId)
  }
  //delete data table vote by ID
  //example use node index.js vote delete 164
  if(command == 'delete') {
    const id = argv[4]
    Controller.deleteVote(id)
  }
}
