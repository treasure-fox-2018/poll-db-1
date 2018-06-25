var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./data.db');
var Table = require('cli-table');

db.serialize(function(){
    db.all(`SELECT name,party,grade_current FROM Politicians WHERE party = "R" and grade_current BETWEEN 9 AND 11`,(err,result)=>{
        if(err) throw err
        else{
            console.log("-------jawaban 1--------");
            var table = new Table({
                head: ["name","party","grade-current"],
                colWidths: [20,20,20]
            })
            for(var i = 0 ; i < result.length; i++){
                table.push([result[i].name,result[i].party,result[i].grade_current])
            }
            console.log(table.toString());;       
        }
    })
    db.all(`SELECT (SELECT count(*)FROM Votes WHERE politicianId = 
        (SELECT id FROM Politicians where name = "Olympia Snowe")) as totalVote, name 
        FROM Politicians
        WHERE name = "Olympia Snowe"`,(err,result)=>{
        if(err) throw err
        else{

            console.log("-------jawaban 2-------");
            var table = new Table({
                head: ["totalVote","name"],
                colWidths: [20,20]
            })
            for(var i = 0 ; i < result.length; i++){
                table.push([result[i].totalVote,result[i].name])
            }
            console.log(table.toString());       

        }
    })

    db.all(`SELECT name , count(politicianId) as totalVote FROM Politicians 
        Left Join Votes 
        ON Politicians.id = Votes.politicianId
        WHERE name LIKE '%Adam%'
        GROUP BY name`,(err,result)=>{
            if(err) throw err
            else{
                console.log("------jawaban 3-------");
                var table = new Table({
                    head: ["name","totalVote"],
                    colWidths: [20,20]
                })
                for(var i = 0 ; i < result.length; i++){
                    table.push([result[i].name,result[i].totalVote])
                }
                console.log(table.toString()); 
                // console.log(result);
            }
    })
    db.all(`SELECT count(politicianId) as totalVote,name ,party,location FROM Politicians 
        Left Join Votes 
        ON Politicians.id = Votes.politicianId
        GROUP BY name
        ORDER BY totalVote desc
        LIMIT 3`,(err,result)=>{
            if(err) throw err
            else{
                console.log("------jawaban 4-------")
                var table = new Table({
                    head: ["totalVote","name","party","location"],
                    colWidths: [20,20,20,20]
                })
                for(var i = 0 ; i < result.length; i++){
                    table.push([result[i].totalVote,result[i].name,result[i].party,result[i].location])
                }
                console.log(table.toString());
                // console.log(result);
            }
    })
    db.all(`SELECT firstname,lastname,gender,age FROM Voters
        JOIN (SELECT voterId FROM Votes
        WHERE politicianId = (SELECT id FROM Politicians
        WHERE name = "Olympia Snowe")) AS voteOS
        ON Voters.id = voteOS.voterId`,(err,result)=>{
            if(err) throw err
            else{
                console.log("-------jawaban 5-------");
                var table = new Table({
                    head: ["firstName","lastName","gender","age"],
                    colWidths: [20,20,20,20]
                })
                for(var i = 0 ; i < result.length; i++){
                    table.push([result[i].firstName,result[i].lastName,result[i].gender,result[i].age])
                }
                console.log(table.toString());
                // console.log(result);
            }
        })
})


