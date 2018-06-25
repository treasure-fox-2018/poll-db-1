var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./data.db');

function addPoliticians(name, party, location, grade_current){
    var query = `INSERT INTO politicians VALUES (null, "${name}", "${party}", "${location}","${grade_current}")`

    db.run(query,function(err){
        if(err) throw err
        console.log('data added');
    })
}

function addVoters(first_name, last_name, gender, age){
    var query = `INSERT INTO voters VALUES (null, "${first_name}", "${last_name}", "${gender}","${age}")`

    db.run(query,function(err){
        if(err) throw err
        console.log('data added');
    })
}

function addVotes(voterId, politicianId){
    var query = `INSERT INTO votes VALUES ("${voterId}", "${politicianId}")`

    db.run(query,function(err){
        if(err) throw err
        console.log('data added');
    })
}

function updatePoliticians(id, name, party, location, grade_current){
    var query = `UPDATE politicians
                SET name = "${name}",
                    party = "${party}",
                    location = "${location}",
                    grade_current = "${grade_current}"
                WHERE id = ${id}`

    db.run(query,function(err){
        if(err) throw err
        console.log('data updated');
    })
    
}

function updateVoters(id, first_name, last_name, gender, age){
    var query = `UPDATE voters
                SET first_name = "${first_name}",
                    last_name = "${last_name}",
                    gender = "${gender}",
                    age = "${age}"
                WHERE id = ${id}`

    db.run(query,function(err){
        if(err) throw err
        console.log('data updated');
    })
}

function deletePoliticians(id){
    var query = `DELETE FROM politicians
                WHERE id = ${id}`

    db.run(query,function(err){
        if(err) throw err
        console.log('data deleted');
    })
}

function deleteVoters(id){
    var query = `DELETE FROM voters
                WHERE id = ${id}`

    db.run(query,function(err){
        if(err) throw err
        console.log('data deleted');
    })
}

function showPartyR(){
    var query = `SELECT name, party, grade_current FROM politicians
                WHERE party = 'R' AND grade_current BETWEEN 9 AND 11`

    db.all(query, function(err, data){
        console.log(data);
        
    })
    
}

function showOlympiaSnow(){
    var query = `SELECT count(politicianId) AS totalVote, politicians.name 
                FROM politicians
                JOIN votes 
                    ON politicians.id = votes.politicianId
                WHERE politicians.name = 'Olympia Snowe'`

    db.all(query, function(err, data){
        console.log(data);
        
    })
}

function ShowAdams(){
    var query = `SELECT politicians.name, count(politicianId) 
                FROM politicians
                JOIN votes
                    ON politicians.id = votes.politicianId
                WHERE politicians.name LIKE 'Adam%'
                GROUP BY politicians.name`

    db.all(query, function(err, data){
        console.log(data);
        
    }) 
}

function ShowBig3(){
    var query = `SELECT count(politicianId) AS totalVote, name, party, location 
                FROM politicians 
                JOIN votes
                    ON politicians.id = votes.politicianId
                GROUP BY name
                ORDER BY totalVote DESC
                LIMIT 3`

    db.all(query, function(err, data){
        console.log(data); 
    })
    
}

function ShowSnoweVoters(){
    var query = `SELECT * 
                FROM voters
                JOIN votes
                    ON voters.id = votes.voterId
                JOIN politicians
                    ON votes.politicianId = politicians.Id
                WHERE politicians.name = 'Olympia Snowe';`

    db.all(query, function(err, data){
        console.log(data); 
    }) 
}





// addPoliticians('helmi','pdi','la',6)
// addVoters('helmi','pdi','la',6)
// addVotes(1,2)
// updatePoliticians(21,'yoga','pki','la',78)
// updateVoters(151,'HERA','heri','male',23)
// deletePoliticians(21)
// deleteVoters(151)
// showPartyR()
// showOlympiaSnow()
// ShowAdams()
// ShowSnoweVoters()
ShowBig3()

