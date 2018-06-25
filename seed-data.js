"use strict"
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database_poll');
const fs = require('fs');

function readPoliticians(){
    let dataString = fs.readFileSync('./politicians.csv','utf8');
    let dataSplit = dataString.split('\n')
    let dataArr = []
    let query = `INSERT INTO politicians (id,name,party,location,grade_current) Values`
    for(let i=0; i<dataSplit.length;i++){
        dataArr.push(dataSplit[i].split(','));
    }
    for(let i=1; i<dataArr.length-1;i++){
        if(i === dataArr.length -2){
            query += `(null,"${dataArr[i][0]}","${dataArr[i][1]}","${dataArr[i][2]}","${dataArr[i][3]}");`;
        }else{
            query += `(null,"${dataArr[i][0]}","${dataArr[i][1]}","${dataArr[i][2]}","${dataArr[i][3]}"), `;
        }
    }
    db.run(query)
    console.log(dataArr)
}

function readVoters(){
    let dataString = fs.readFileSync('./voters.csv','utf8');
    let dataSplit = dataString.split('\n')
    let query = `INSERT INTO voters (id,first_name,last_name,gender,age) Values`
    let dataArr=[]
    for(let i=0; i<dataSplit.length;i++){
        dataArr.push(dataSplit[i].split(','));
    }
    // klo pake db.serialize
    // for(let i=1; i<dataArr.length-1;i++){
    //     db.run(`INSERT INTO voters (id,first_name,last_name,gender,age)
    //     Values(null,"${dataArr[i][0]}","${dataArr[i][1]}","${dataArr[i][2]}","${dataArr[i][3]}")`)
    // }
    for(let i=1; i<dataArr.length-1;i++){
        if(i === dataArr.length -2){
            query += `(null,"${dataArr[i][0]}","${dataArr[i][1]}","${dataArr[i][2]}","${dataArr[i][3]}");`;
        }else{
            query += `(null,"${dataArr[i][0]}","${dataArr[i][1]}","${dataArr[i][2]}","${dataArr[i][3]}"), `;
        }
    }
    db.run(query)
    console.log(dataArr)
}

function readVotes(){
    let dataString = fs.readFileSync('./votes.csv','utf8');
    let dataSplit = dataString.split('\n')
    let query = `INSERT INTO votes (id,voterID,politicianID) Values`
    let dataArr=[]
    for(let i=0; i<dataSplit.length;i++){
        dataArr.push(dataSplit[i].split(','));
    }
    // klo pake db.serialize
    // for(let i=1; i<dataArr.length-1;i++){
    //     db.run(`INSERT INTO votes (id,voterID,politicianID)
    //     Values(null,"${dataArr[i][0]}","${dataArr[i][1]}")`)
    // }
    for(let i=1; i<dataArr.length-1;i++){
        if(i === dataArr.length -2){
            query += `(null,"${dataArr[i][0]}","${dataArr[i][1]}");`;
        }else{
            query += `(null,"${dataArr[i][0]}","${dataArr[i][1]}"), `;
        }
    }
    db.run(query)
    console.log(dataArr)
}

readPoliticians();
readVoters();
readVotes();


