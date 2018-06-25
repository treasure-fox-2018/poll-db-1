"use strict"
const db    = require('./db');
const args  = process.argv.slice(2);

function insertPolitician(id,name,party,location,grade_current){
    let query = `INSERT INTO politicians (id,name,party,location,grade_current) 
    VALUES ('${id}','${name}','${party}','${location}','${grade_current}')`;
    
    db.run(query, function(err){
        if(err) throw err;
        console.log('Successfully created a new row');  
    });
}


function updatePolitician(id,name,party,location,grade_current){
    let query = `UPDATE politicians 
    SET name = "${name}",
    party = "${party}",
    location = "${location}",
    grade_current = "${grade_current}" 
    WHERE id = ${id}`;
    
    db.run(query, function (err) {
        if (err) throw err;
        console.log('Successfully updated!');
    });
}

function deletePolitician(id){
    let query = `DELETE FROM politicians WHERE id = ${id}`;
    
    db.run(query,function(err){
        if(err) throw err;
        console.log('Successfully deleted!')
    })
}

function insertVoters(id,first_name,last_name,gender,age){
    let query = `INSERT INTO voters (id,first_name,last_name,gender,age) 
    VALUES ('${id}','${first_name}','${last_name}','${gender}','${age}')`;
    
    db.run(query, function(err){
        if(err) throw err;
        console.log('Successfully created a new row');  
    });
}

function updateVoters(id,first_name,last_name,gender,age){
    let query = `UPDATE voters 
    SET first_name = "${first_name}",
    last_name = "${last_name}",
    gender = "${gender}",
    age = "${age}" 
    WHERE id = ${id}`;
    
    db.run(query, function (err) {
        if (err) throw err;
        console.log('Successfully updated!');
    });
}

function deleteVoters(id){
    let query = `DELETE FROM voters WHERE id = ${id}`;
    
    db.run(query,function(err){
        if(err) throw err;
        console.log('Successfully deleted!')
    })
}


function readPoliticianR(){
    let query = `SELECT name,party,grade_current FROM politicians 
                 WHERE party = 'R' 
                 AND grade_current BETWEEN 9 AND 11
                 ORDER BY grade_current ASC`
    
    db.all(query,function(err, data){
        console.log(data)
        })
}

function readVoteOlympia(){
    let query = `SELECT COUNT(politicianID) AS "totalVote",name  FROM politicians
                JOIN votes ON politicians.id = votes.politicianID
                WHERE politicians.name = "Olympia Snowe"`

    db.all(query,function(err, data){
        console.log(data)
        })
}

function readVoteAdam(){
    let query = `SELECT name,COUNT(politicianID) AS "totalVote"  FROM politicians
                JOIN votes ON politicians.id = votes.politicianID
                WHERE politicians.name LIKE "%Adam%"
                GROUP BY name`

    db.all(query,function(err, data){
        console.log(data)
        })
}

function readMostVote(){
    let query = `SELECT COUNT(politicianID) AS "totalVote",name,party,location FROM politicians
                JOIN votes ON politicians.id = votes.politicianID
                GROUP BY name
                ORDER BY totalVote DESC
                LIMIT 3`

    db.all(query,function(err, data){
        console.log(data)
        })
}

function readVotersOlympia(){
    let query = `SELECT first_name,last_name,gender,age FROM voters
                JOIN votes ON voters.id = votes.voterID
                JOIN politicians ON votes.politicianID = politicians.id
                WHERE politicians.name = "Olympia Snowe"
                `

    db.all(query,function(err, data){
        console.log(data)
        })
}


// insertPolitician(21,"Sam Kwok","R","LA",9.987033); // insertPolitician(id,name,party,location,grade_current);
// updatePolitician(21,"Sam Kwok","R","NY",9.987033); // updatePolitician(id,name,party,location,grade_current);
// deletePolitician(21); // deletePolitician(id);

// insertVoters(151,"Sam","Smith","male",31); // insertVoters(id,first_name,last_name,gender,age); 
// updateVoters(151,"Sam","Kwok","male",29); // updateVoters(id,first_name,last_name,gender,age);
// deleteVoters(151); // deleteVoters(id);

// readPoliticianR();
// readVoteOlympia();
// readVoteAdam();
// readMostVote();
readVotersOlympia()




