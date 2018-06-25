var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./data.db');

var fs = require('fs')
var readPoliticians = fs.readFileSync('./politicians.csv','utf8').split('\n')
var readVotes = fs.readFileSync('./votes.csv','utf8').split('\n')
var readVoters = fs.readFileSync('./voters.csv','utf8').split('\n')

function seed(){
    db.serialize(function(){
        for(var i = 1; i < readPoliticians.length;i++){
            var politician = readPoliticians[i].split(',')
            db.run(`INSERT INTO Politicians VALUES(null,"${politician[0]}","${politician[1]}","${politician[2]}",${politician[3]})`)
        }
        
        for(var j = 1; j < readVotes.length;j++){
            var vote = readVotes[j].split(',')
            db.run(`INSERT INTO Votes VALUES(null,${vote[0]},${vote[1]})`)
        }
        
        for(var k = 1; k < readVoters.length; k++){
            var voter = readVoters[k].split(',')
            db.run(`INSERT INTO Voters VALUES(null,"${voter[0]}","${voter[1]}","${voter[2]}",${voter[3]})`)
        }
    })
}

seed()