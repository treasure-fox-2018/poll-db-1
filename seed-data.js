//your code here

const db = require('./db');
const fs = require('fs');

var politicians = fs.readFileSync("politicians.csv").toString().split("\n");
var voters = fs.readFileSync("voters.csv").toString().split("\n");
var votes = fs.readFileSync("votes.csv").toString().split("\n");

for (var i = 1; i < politicians.length - 1; i++) {
  // console.log(politicians[i]);
  var politician = politicians[i].split(",");
  // console.log(politician);
  db.run(`INSERT INTO politicians VALUES (null, "${politician[0]}", "${politician[1]}", "${politician[2]}", "${politician[3]}")`);
}

for (var i = 1; i < voters.length - 1; i++) {
  var voter = voters[i].split(",");
  // console.log(voter);
  db.run(`INSERT INTO voters VALUES (null, "${voter[0]}", "${voter[1]}", "${voter[2]}", "${voter[3]}")`);
}

for (var i = 1; i < votes.length - 1; i++) {
  var vote = votes[i].split(",");
  // console.log(vote);
  db.run(`INSERT INTO votes VALUES (null, "${vote[0]}", "${vote[1]}")`);
}
