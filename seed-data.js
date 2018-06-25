const fs = require('fs');
const db = require('./db')

function read_file(){
    let file_politicians = fs.readFileSync('./politicians.csv').toString().split("\n");
    let file_voters      = fs.readFileSync('./voters.csv').toString().split("\n");
    let file_votes       = fs.readFileSync('./votes.csv').toString().split("\n");
    let output_politician = [];
    let output_voters     = [];
    let output_votes      = [];

    for(let i = 1; i < file_politicians.length-1; i++){
        let politician = file_politicians[i].split(",");
        output_politician.push(politician)
    }

    for(let i = 0; i < output_politician.length; i++){
        db.run(`INSERT INTO Politicians(name,party,location,grade_current) VALUES('${output_politician[i][0]}','${output_politician[i][1]}','${output_politician[i][2]}','${output_politician[i][3]}')`)
    }

    for(let i = 1; i < file_voters.length; i++){
        let voters = file_voters[i].split(",");
        output_voters.push(voters);
    }

    for(let i = 0; i < output_voters.length - 1; i++){
        db.run(`INSERT INTO Voters(first_name,last_name,gender,age) VALUES("${output_voters[i][0]}","${output_voters[i][1]}","${output_voters[i][2]}","${output_voters[i][3]}")`);
    }

    for(let i = 1; i < file_votes.length; i++){
        let votes = file_votes[i].split(",");
        output_votes.push(votes);
    }

    for(let i = 0; i < output_votes.length - 1; i++){
        db.run(`INSERT INTO Votes(voterId,politicianId) VALUES("${output_votes[i][0]}","${output_votes[i][1]}")`);
    }
    
  }

// read_file()

function insert_politician(name,party,location,grade_current){
    db.run(`INSERT INTO Politicians (name,party,location,grade_current) VALUES ("${name}","${party}","${location}","${grade_current}")`)
}

function insert_voters(first_name,last_name,gender,age){
    db.run(`INSERT INTO Voters (first_name,Last_name,gender,age) VALUES ("${first_name}","${last_name}","${gender}","${age}")`)
}

function insert_vote(voterId,politicianId){
    db.run(`INSERT INTO Votes (voterId,politicianId) VALUES ("${voterId}","${politicianId}")`)
} 

function update_politician(name,party,location,grade_current,id){
    db.run(`UPDATE Politicians SET name  = "${name}"
                                   party = "${party}"
                                   location = "${location}"
                                   grade_current = "${grade_current}"
                               WHERE id = "${id}"`)
}

function update_voters(first_name,last_name,gender,age,id){
    db.run(`UPDATE Politicians SET first_name  = "${first_name}"
                                   last_name = "${last_name}"
                                   gender = "${gender}"
                                   age = "${age}"
                               WHERE id = "${id}"`)
}

function update_votes(voterId,politicianId,id){
    db.run(`UPDATE Votes SET voterId  = "${voterId}"
                                   politicianId = "${politicianId}"
                               WHERE id = "${id}"`)
}

function delete_politician(id){
    db.run(`DELETE FROM Politicians WHERE politicianId = ${id}`)
}

function delete_voters(id){
    db.run(`DELETE FROM Voters WHERE voterId = ${id}`)
}

function delete_votes(id){
    db.run(`DELETE FROM Votes WHERE voterId = ${id}`)
}

function number1(){
    let query = `SELECT * FROM Politicians WHERE party ='R' AND grade_current BETWEEN 9 AND 11`

    db.all(query,function(err,data){
        if (err) throw err
        console.log(data)
    })
}

function number2(){
    let query = `SELECT COUNT(*) AS total_votes,name FROM Politicians INNER JOIN Votes
    ON Politicians.politicianId = Votes.politicianId
    WHERE Politicians.name = 'Olympia Snowe'`

    db.all(query,function(err,data){
        if (err) throw err
        console.log(data)
    })
}

function number3(){
    let query = `SELECT name,COUNT(*) AS total_votes FROM Politicians INNER JOIN Votes
    ON Politicians.politicianId = Votes.politicianId
    WHERE Politicians.name LIKE "Adam%"
    GROUP BY Politicians.name;`

    db.all(query,function(err,data){
        if (err) throw err
        console.log(data)
    })
}

function number4(){
    let query = `SELECT COUNT(*) AS total_votes,name,party,location FROM Politicians INNER JOIN Votes
    ON Politicians.politicianId = Votes.politicianId
    GROUP BY name
    ORDER BY total_votes DESC
    LIMIT 3;`

    db.all(query,function(err,data){
        if (err) throw err
        console.log(data)
    })
}

function number5(){
   let query = `SELECT first_name,last_name,gender,age FROM Votes 
    INNER JOIN Politicians 
        ON Votes.politicianId = Politicians.politicianId
    INNER JOIN Voters
        ON Votes.voterId = Voters.voterId
    WHERE Politicians.name = 'Olympia Snowe'`

    db.all(query,function(err,data){
        if (err) throw err
        console.log(data)
    })
}

number1()
number2()
number3()
number4()
number5()
