const fs = require('fs')
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("./poll.db")


function addVoters(){
    const arrVoter =  fs.readFileSync('./voters.csv').toString().split('\n');
    arrVoter.shift()

    for(let i = 0 ; i < arrVoter.length ; i++){
        let voter = arrVoter[i].split(',')

        let firstName = voter[0];
        let lastName = voter[1];
        let gender = voter[2];
        let age = voter[3];

        let query = `INSERT INTO Voters (first_name, last_name, gender, age) VALUES ("${firstName}", "${lastName}", "${gender}", "${age}")`

        db.serialize( function(){
            db.run(query, function(err){
                if(err) throw err
            });
        });

        }


    }
   

    function addPoliticians(){
        const arrPolitician = fs.readFileSync('./politicians.csv').toString().split('\n');

        arrPolitician.shift()
    
        for(let i = 0 ; i < arrPolitician.length ; i++){
            let politician = arrPolitician[i].split(',')
    
            let name = politician[0];
            let party = politician[1];
            let location = politician[2];
            let grade_current = politician[3];
    
            let query = `INSERT INTO Politicians (name, party, location, grade_current) VALUES ("${name}", "${party}", "${location}", "${grade_current}")`
    
            db.serialize( function(){
                db.run(query, function(err){
                    if(err) throw err
                });
            });
    
            }
    
    
        }
    
        function addVotes(){
            const arrVotes =  fs.readFileSync('./votes.csv').toString().split('\n');
    
            arrVotes.shift()
        
            for(let i = 0 ; i < arrVotes.length ; i++){
                let vote = arrVotes[i].split(',')
        
                let id_voter = vote[0];
                let id_politician = vote[1];
               
                let query = `INSERT INTO Votes (idVoter, idPolitician) VALUES ("${id_voter}", "${id_politician}")`
        
                db.serialize( function(){
                    db.run(query, function(err){
                        if(err) throw err
                    });
                });
        
                }
        
        
            }

function addVoters2(first_name, last_name,gender,age){

    let query = `INSERT INTO Voters (first_name, last_name, gender, age) VALUES ("${first_name}", "${last_name}", "${gender}", "${age}")`

        db.serialize( function(){
            db.run(query, function(err){
                if(err) throw err
            });
        });

}  

function deletePolitician(idPolitician) {
    var query = `DELETE FROM Politicians
                    WHERE idPolitician = “${idPolitician}“`
 
    db.serialize(function () {
        db.run(query, function (err) {
            if (err) throw err
        });
    });    
 }

 function updateVoter(idVoter,firstName,lastName,gender,age) {
    var query = `UPDATE Voters SET
                    first_name = “${firstName}“,
                    last_name = “${lastName}“,
                    gender = “${gender}“,
                    age = “${age}”
                    WHERE id_voter = “${idVoter}“`
 
    db.serialize(function () {
        db.run(query, function (err) {
            if (err) throw err
        });
    });    
 }


// addVoters()
// addPoliticians()
// addVotes()

// addVoters2('Cimz','Ming','Male', 30);
// deletePolitician(90)
// updateVoter(300,'Ming','Ci', 'Male', 23)        


// release 3
function politicianBelow9(){

    let query = `SELECT * FROM Politicians WHERE party = 'R' 
                 AND grade_current  BETWEEN 9 AND 11;`
    
    db.all(query,function(err,data){
        if(err) throw err
        console.log(data)
    })
}

function olympiaVote(){

    let query = `SELECT  COUNT(Votes.idPolitician), name FROM Politicians
                 JOIN  Votes
                 ON Politicians.idPolitician = Votes.idPolitician
                 WHERE name = "Olympia Snowe";`
    
    db.all(query,function(err,data){
        if(err) throw err
        console.log(data)
    })
}

function adamVote(){

    let query = `SELECT  name,COUNT(name) as TotalVote FROM Politicians
                 JOIN  Votes
                 ON Politicians.idPolitician = Votes.idPolitician
                 WHERE Politicians.name LIKE '%adam%' 
                 GROUP BY name`
    
    db.all(query,function(err,data){
        if(err) throw err
        console.log(data)
    })
}

function maxVote(){

    let query = `SELECT  COUNT(*) AS totalVote,name, party, location FROM Politicians
                 JOIN  Votes
                 ON Politicians.idPolitician = Votes.idPolitician
                 GROUP BY name
                 ORDER BY totalVote DESC
                 LIMIT 3`
    
    db.all(query,function(err,data){
        if(err) throw err
        console.log(data)
    })
}

function olypiaVoters(){

    let query = `SELECT first_name, last_name, gender,age FROM Votes
                 INNER JOIN  Politicians
                 ON Votes.idPolitician = Politicians.idPolitician 
                 INNER JOIN Voters
                 ON Voters.idVoter = Votes.idVoter
                 WHERE name = 'Olympia Snowe';`
    
    db.all(query,function(err,data){
        if(err) throw err
        console.log(data)
    })
}

/*
RELEASE 3 :

 1. SELECT * FROM Politicians WHERE party = 'R' 
    AND grade_current  BETWEEN 9 AND 11;  

 2. SELECT  COUNT(Votes.idPolitician), name FROM Politicians
    JOIN  Votes
    ON Politicians.idPolitician = Votes.idPolitician
    WHERE name = "Olympia Snowe";

 3. SELECT  name,COUNT(name) as TotalVote FROM Politicians
    JOIN  Votes
    ON Politicians.idPolitician = Votes.idPolitician
    WHERE Politicians.name LIKE '%adam%' 
    GROUP BY name

4. SELECT  COUNT(*) AS totalVote,name, party, location FROM Politicians
   JOIN  Votes
   ON Politicians.idPolitician = Votes.idPolitician
   GROUP BY name
   ORDER BY totalVote DESC
   LIMIT 3;

5. SELECT first_name, last_name, gender,age FROM Votes
   INNER JOIN  Politicians
   ON Votes.idPolitician = Politicians.idPolitician 
   INNER JOIN Voters
   ON Voters.idVoter = Votes.idVoter
   WHERE name = 'Olympia Snowe';

*/

