var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./data.db');
const fs = require("fs")

let politician = fs.readFileSync("politicians.csv","utf8").split("\n")
// console.log(politician[2])
let vote = fs.readFileSync("votes.csv","utf8").split("\n")
// console.log(vote)
// console.log(voter)
function dataPolitican(){
    db.serialize(function(){
        for(let i=1;i<politician.length -1;i++){
            let data = politician[i].split(',')
            let input = `INSERT INTO Politicians (name,pary,location,grade_current) VALUES("${data[0]}","${data[1]}","${data[2]}",${data[3]})`
            db.run(input,function(err){
                if(err){
                    throw err
                }else{
                    console.log(data)
                }
            })
        }
    })
 
}
dataPolitican()
let voter = fs.readFileSync("voters.csv","utf8").split("\n")
// console.log(voter)

function dataVoter(){
    for(let i=1;i<voter.length -1;i++){
        let data = voter[i].split(',')
        let input = `INSERT INTO Voters(first_name,last_name,gender,age) VALUES("${data[0]}","${data[1]}","${data[2]}","${data[3]}")`
        db.serialize(function(){
            db.run(input,function(err){
                if(err){
                    throw err
                }else{
                    console.log("success")
                }
            })
        })
     
    }
}

// dataVoter()

function dataVotes(){
    // console.log(vote)
    for(let i=1;i<vote.length -1;i++){
        let dataVote = vote[i].split(",")
        let inputData = `INSERT INTO Votes(voterId,politicianId) VALUES(${dataVote[0]},${dataVote[1]})`
        db.serialize(function(){
            db.run(inputData,function(err){
                if(err){
                    throw err
                }else{
                    console.log("success")
                }
            })
        })
    }
}
// dataVotes()