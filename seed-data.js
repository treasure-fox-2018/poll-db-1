const fs = require('fs')
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./poll.db');



function voterCSV(){
    var arrVoters = fs.readFileSync('voters.csv').toString().split('\n')
    arrVoters.shift()

    for (let i = 0; i < arrVoters.length; i++) {
        var voter = arrVoters[i].split(',')
        var first_name = voter[0]
        var last_name = voter[1]
        var gender = voter[2]
        var age = voter[3]

        var query = `INSERT INTO Voters (first_name,last_name,gender,age) VALUES ("${first_name}","${last_name}","${gender}","${age}")`

        db.serialize(function () {
            db.run(query, function (err) {
                if (err) throw err
            });
        });

    }
       
}

function votingCSV() {
    var arrVotes = fs.readFileSync('votes.csv').toString().split('\n')
    arrVotes.shift()

    for (let i = 0; i < arrVotes.length; i++) {
        var votes = arrVotes[i].split(',')

        var id_voter = votes[0]
        var id_politician = votes[1]

        var query = `INSERT INTO Voting (id_voter,id_politician) VALUES ("${id_voter}","${id_politician}")`

        db.serialize(function () {
            db.run(query, function (err) {
                if (err) throw err
            });
        });

    }

}

function politicianCSV() {
    var arrPoliticians = fs.readFileSync('politicians.csv').toString().split('\n')
    arrPoliticians.shift()

    for (let i = 0; i < arrPoliticians.length; i++) {
        var politician = arrPoliticians[i].split(',')

        // name,party,location,grade_current
        var name = politician[0]
        var party = politician[1]
        var location = politician[2]
        var grade_current = politician[3]

        var query = `INSERT INTO Politicians (name,partai,location,grade_current) VALUES ("${name}","${party}","${location}","${grade_current}")`

        db.serialize(function () {
            db.run(query, function (err) {
                if (err) throw err
            });
        });
    }
}

// RELEASE 2 :

//INSERT
function addPolitician(name,party,location,grade_current) {
    var query = `INSERT INTO Politicians (name,partai,location,grade_current) VALUES ("${name}","${party}","${location}","${grade_current}")`

    db.serialize(function () {
        db.run(query, function (err) {
            if (err) throw err
        });
    });

}

function addVoter(first_name,last_name,gender,age) {
    var query = `INSERT INTO Voters (first_name,last_name,gender,age) VALUES ("${first_name}","${last_name}","${gender}","${age}")`

    db.serialize(function () {
        db.run(query, function (err) {
            if (err) throw err
        });
    });

}

function addVoting(id_voter,id_politician) {
    var query = `INSERT INTO Voting (id_voter,id_politician) VALUES ("${id_voter}","${id_politician}")`

    db.serialize(function () {
        db.run(query, function (err) {
            if (err) throw err
        });
    });
}

//UPDATE
function updatePolitician(id_politician,name,party,location,grade_current) {
    var query = `UPDATE Politicians SET 
                    name = "${name}",
                    party = "${party}",
                    location = "${location}",
                    grade_current = "${grade_current}"
                    WHERE id_politician = "${id_politician}"`

    db.serialize(function () {
        db.run(query, function (err) {
            if (err) throw err
        });
    });    
}

function updateVoter(id_voter,first_name,last_name,gender,age) {
    var query = `UPDATE Voters SET 
                    first_name = "${first_name}",
                    last_name = "${last_name}",
                    gender = "${gender}",
                    age = "${age}"
                    WHERE id_voter = "${id_voter}"`

    db.serialize(function () {
        db.run(query, function (err) {
            if (err) throw err
        });
    });    
}

function updateVoting(id_voter,id_politician) {
    var query = `UPDATE Voting SET 
                    id_voter = "${id_voter}",
                    id_politician = "${id_politician}",
                    WHERE id_voter = "${id_voter}"`

    db.serialize(function () {
        db.run(query, function (err) {
            if (err) throw err
        });
    });    
}


//DELETE
function deletePolitician(id_politician) {
    var query = `DELETE FROM Politicians 
                    WHERE id_politician = "${id_politician}"`

    db.serialize(function () {
        db.run(query, function (err) {
            if (err) throw err
        });
    });    
}

function deleteVoter(id_voter) {
    var query = `DELETE FROM Voters 
                    WHERE id_voter = "${id_voter}"`

    db.serialize(function () {
        db.run(query, function (err) {
            if (err) throw err
        });
    });    
}

function deleteVoting(id_voter) {
    var query = `DELETE FROM Voting 
                    WHERE id_voter = "${id_voter}"`

    db.serialize(function () {
        db.run(query, function (err) {
            if (err) throw err
        });
    });    
}

//DRIVER//////////////
voterCSV()
votingCSV()
politicianCSV()

addPolitician('ridwan','tes','tes',4.858585)
addPolitician('kamil','tes','tes',8.858585)

addVoter("zzz","yyy","male",43)

addVoting(152,23)

updatePolitician(22,'riduan','pdi','bandung',6.555454)
updateVoter(152,'Zzaza','Yzaza','female',41)
updateVoting(152,19)

deletePolitician(23)
deleteVoter(152)
deleteVoting(152)


// RELEASE 3 
/*
1. 
SELECT name,partai,grade_current FROM Politicians 
WHERE partai = 'R' and
grade_current BETWEEN 9 and 11;

2.
SELECT count(name) AS total_vote FROM Voting 
JOIN Politicians
	ON Politicians.id_politician = Voting.id_politician
WHERE Politicians.name = 'Olympia Snowe';

3.
SELECT name, count(name) AS total_vote FROM Voting 
JOIN Politicians
	ON Politicians.id_politician = Voting.id_politician
WHERE Politicians.name like '%adam%' group by name;

4.
SELECT name,partai,location,count(name) AS total_vote FROM Voting 
JOIN Politicians
	ON Politicians.id_politician = Voting.id_politician
GROUP BY name 
ORDER BY total_vote desc limit 3;

5.
SELECT Voters.first_name,Voters.last_name,Voters.gender,Voters.age FROM Voting 
JOIN Politicians
	ON Politicians.id_politician = Voting.id_politician
JOIN Voters
	ON Voters.id_voter = Voting.id_voter
WHERE Politicians.name = 'Olympia Snowe';

*/