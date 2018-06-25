const db    = require('./db');
const args  = process.argv.slice(2);
const table = args[0];

if (!table) {
  console.log('$ node read help');
}else if (table === 'help') {
  console.log('$ node read <table_name> <input>');
  console.log('$ node read `politicians` <key> <value> <rangeMinGrade> <rangeMaxGrade> (release 3 no 1)');
  console.log('$ node read totalVote <politicianName> (release 3 no 2 and 3)');
  console.log('$ node read topVote(release 3 no 4)');
  console.log('$ node read votersList <politicianName>(release 3 no 5)');
}else if (table === 'politicians') {
  if (!args[1]) {
    let query = `SELECT * FROM politicians`;
    db.all(query, function (err, output) {
      if (err) throw err;
      console.log(output);
    });
  }else if (!args[3]){
    let query = `SELECT name, party, grade_current FROM politicians WHERE "${args[1]}" = "${args[2]}"`;
    db.all(query, function (err, output) {
      if (err) throw err;
      console.log(output);
    });
  //release 3 no 1
  }else {
    let query = `SELECT name, party, grade_current FROM politicians WHERE "${args[1]}" = "${args[2]}" AND grade_current >= "${args[3]}" AND grade_current <= "${args[4]}"`;
    db.all(query, function (err, output) {
      if (err) throw err;
      console.log(output);
    });
  }
}else if (table === 'voters') {
  let query = `SELECT * FROM voters`;
  db.all(query, function (err, output) {
    if (err) throw err;
    console.log(output);
  });
}else if (table === 'votes') {
  let query = `SELECT * FROM votes`;
  db.all(query, function (err, output) {
    if (err) throw err;
    console.log(output);
  });
  //release 3 no 2 and 3
}else if (table === 'totalVote') {
  let query = `SELECT politicians.name, COUNT(politicianId) AS totalVote FROM politicians JOIN votes ON politicians.id = votes.politicianId WHERE politicians.name IS NOT NULL AND politicians.name LIKE '%${args[1]}%' GROUP BY politicians.name`;
  db.all(query, function (err, output) {
    console.log(output);
  });
//release 3 no 4
}else if (table === 'topVote') {
  let query = `SELECT COUNT(politicianId) AS totalVote, politicians.name, politicians.party, politicians.location FROM politicians JOIN votes ON politicians.id = votes.politicianId WHERE politicians.name IS NOT NULL GROUP BY politicians.name ORDER BY totalVote DESC LIMIT 3`;
  db.all(query, function (err, output) {
    if (err) throw err;
    console.log(output);
  });
//release 3 no 5
}else if (table === 'votersList') {
  let query = `SELECT voters.first_name, voters.last_name, voters.gender, voters.age FROM voters LEFT JOIN votes LEFT JOIN politicians WHERE votes.voterId = voters.id AND votes.politicianId = politicians.id AND politicians.name LIKE '%${args[1]}%'`;
  db.all(query, function (err, output) {
    if (err) throw err;
    console.log(output);
  });
}
