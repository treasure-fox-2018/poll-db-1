
const sqlite3  = require('sqlite3').verbose();
const db = new sqlite3.Database('./data.db');

//1
function soal1(){
    let query = `SELECT * FROM Politicians WHERE pary = "R" and grade_current BETWEEN 9 and 11
                 ORDER BY grade_current ASC`
    db.all(query,function(err,data){
        if(err) throw err
        console.log(data)
    })
}
// soal1()

function soal2(){
    let query = `SELECT name,COUNT(politicianID) AS totalVote FROM Politicians
    JOIN Votes
    ON Politicians.id = Votes.politicianId
    WHERE name = "Olympia Snowe"`

    db.all(query,function(err,data){
        if(err) throw err
        console.log(data)
    })
}
// soal2()

function soal3(){
    let query = `SELECT name,COUNT(politicianID) AS totalVote FROM Politicians
    JOIN Votes
    ON Politicians.id = Votes.politicianId
    WHERE name LIKE "Adam%"
    GROUP BY name`

    db.all(query,function(err,data){
        if(err) throw err
        console.log(data)
    })
}
// soal3()

function soal4(){
    let query = `SELECT name,COUNT(politicianID) AS totalVote,pary,location FROM Politicians
    LEFT JOIN Votes
    ON Politicians.id = Votes.politicianId
    GROUP BY name
    ORDER BY totalVote DESc
    LIMIT 3`

    db.all(query,function(err,data){
        if(err) throw err
        console.log(data)
    })
}
// soal4()

function soal5(){
    let query = `SELECT first_name,last_name,gender,age FROM Voters
    JOIN Votes
    ON Voters.id = Votes.voterID
    JOIN Politicians
    ON Votes.politicianId = Politicians.id
    WHERE name = "Olympia Snowe"`

    db.all(query,function(err,data){
        if(err) throw err
        console.log(data)
    })
}
soal5()