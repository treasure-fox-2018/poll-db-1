const CRUD = require('./CRUD')
const Show = require('./show')

const command = process.argv[2];
const table = process.argv[3];
const allInput = process.argv.slice(4);

if (command == 'insert'){
  CRUD.insertData(table, allInput);
} else if (command == 'update'){
  CRUD.updateData(table, allInput);
} else if (command == 'delete'){
  CRUD.deleteData(table, allInput);
} else if (command == 'show1'){
  Show.partyRWithGrade();
} else if (command == 'show2'){
  Show.totalVotesOlympiaSnowe();
} else if (command == 'show3'){
  Show.totalVotesAdam();
} else if (command == 'show4'){
  Show.top3HighestVotes();
} else if (command == 'show5'){
  Show.olympiaSnoweVoters();
} else {
  console.log('invalid input')
}