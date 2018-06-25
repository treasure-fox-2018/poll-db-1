//your code here
let db = require('./db')
let fs = require('fs')

let politicians = fs.readFileSync('./politicians.csv', 'utf8').split("\n")
let politician = politicians[0].split(',')

let voters = fs.readFileSync('./voters.csv', 'utf8').split('\n')
let voter = voters[0].split(',')

let votes = fs.readFileSync('./votes.csv', 'utf8').split("\n")
let vote = votes[0].split(',')

class CreateTable{
    static policiants(politician){
        db.run(`CREATE TABLE politicians(id INTEGER PRIMARY KEY AUTOINCREMENT,${politician[0]} VARCHAR ,${politician[1]} VARCHAR,${politician[2]} VARCHAR, ${politician[3]} FLOAT);`,
                function (err) {
            if (err) throw err;
        }); 
    }

    static voters(voter){
        db.run(`CREATE TABLE voters(id INTEGER PRIMARY KEY AUTOINCREMENT,${voter[0]} VARCHAR ,${voter[1]} VARCHAR,${voter[2]} VARCHAR, ${voter[3]} NUMERIC);`,
        function (err) {
        if (err) throw err;
        });
    }

    static votes(vote){
        db.run(`CREATE TABLE votes(id INTEGER PRIMARY KEY AUTOINCREMENT,${vote[0]} INTEGER ,${vote[1]} INTEGER, FOREIGN KEY(voterId) REFERENCES voters(id), FOREIGN KEY(politicianId) REFERENCES politicians(id));`,
            function (err) {
            if (err) throw err;
            });
    }

}

CreateTable.policiants(politician)
CreateTable.voters(voter)
CreateTable.votes(vote)