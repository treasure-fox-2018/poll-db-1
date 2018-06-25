let db = require('./db')
let fs = require('fs')

class InsertTable{
    static politicians(politician){
        db.serialize(function(){
            for(let i = 1; i < politician.length; i++){
            let data = politician[i].split(',')

            db.run(`INSERT INTO politicians (name, party, location, grade_current)
                    VALUES ('${data[0]}', '${data[1]}', '${data[2]}', '${data[3]}');`, function(err){
                        if (err) throw err
                    });
            }
            })
        
    }

    static voters(voter){
        db.serialize(function(){
            for(let i = 1; i < voter.length; i++){
            let data = voter[i].split(',')

            db.run(`INSERT INTO voters (first_name,last_name,gender,age)
                    VALUES ('${data[0]}', "${data[1]}", '${data[2]}', '${data[3]}');`, function(err){
                        if(err) throw err
                    })
            }
            })
        
    }

    static votes(vote){
        db.serialize(function(){
            for(let i = 1; i < vote.length; i++){
            let data = vote[i].split(',')

            db.run(`INSERT INTO votes (voterId,politicianId)
                    VALUES ('${data[0]}', '${data[1]}');`, function(err){
                        if(err) throw err
                    })
            }
            })
        
    }
}

class ChangingDB{
    static insert(tableName,newData){
        if(tableName == 'politicians'){
            db.run(`INSERT INTO politicians (name, party, location, grade_current)
                    VALUES ('${newData[0]}', '${newData[1]}', '${newData[2]}', '${newData[3]}');`, function(err){
                        if (err) throw err
                    });
            
        } else if(tableName == 'voters'){
            db.run(`INSERT INTO voters (first_name,last_name,gender,age)
                    VALUES ('${newData[0]}', "${newData[1]}", '${newData[2]}', '${newData[3]}');`, function(err){
                        if(err) throw err
                    })
        } else if(tableName == 'votes'){
            db.run(`INSERT INTO votes (voterId,politicianId)
                    VALUES ('${data[0]}', '${data[1]}');`, function(err){
                        if(err) throw err
                    })
        }
    }

    static updateTable(tableName, id, column, newData){
        if(tableName == 'politicians'){
            db.run(`UPDATE politicians SET '${column}' = '${newData}' WHERE id = ${id}`,  function(err){
                if(err) throw err
            })
        } else if(tableName == 'voters'){
            db.run(`UPDATE voters SET '${column}' = '${newData}' WHERE id = ${id}`,  function(err){
                if(err) throw err
            })
        } else if(tableName == 'votes'){
            db.run(`UPDATE votes SET '${column}' = '${newData}' WHERE id = ${id}`,  function(err){
                if(err) throw err
            })
        }
    }

    static deleteData(tableName, id){
        if(tableName == 'politicians'){
            db.run(`DELETE FROM politicians WHERE id = ${id}`,  function(err){
                if(err) throw err
            })
        } else if(tableName == 'voters'){
            db.run(`DELETE FROM voters WHERE id = ${id}`, function(err){
                if(err) throw err
            })
        } else if(tableName == 'votes'){
            db.run(`DELETE FROM votes WHERE id = ${id}`, function(err){
                if(err) throw err
            })
        }
    }
}

class DisplayDB{
    static first(){
        db.all(`SELECT * FROM Politicians WHERE (grade_current BETWEEN 9 AND 11) AND party = 'R'`, function(err, result){
            if(err) throw err

            console.log(result)
        })
    }

    static second(){
        db.all(`SELECT COUNT(voterId) AS totalVote, name FROM politicians 
            LEFT JOIN votes ON politicians.id = votes.politicianId
            WHERE politicians.name = 'Olympia Snowe'`, function(err, result){
                if(err) throw err
                
                console.log(result)
            })
    }

    static third(){
        db.all(`SELECT politicians.name,COUNT(voterId) AS totalVote FROM politicians
            LEFT JOIN votes ON politicians.id = votes.politicianId
            WHERE politicians.name LIKE '%Adam%'
            GROUP BY politicians.name`, function(err, result){
                if(err) throw err
                console.log(result)
            })
    }

    static fourth(){
        db.all(`SELECT COUNT(voterId) AS totalVote, politicians.name,politicians.party,politicians.location FROM politicians
            LEFT JOIN votes ON politicians.id = votes.politicianId
            GROUP BY politicians.name
            ORDER BY COUNT(voterId) DESC
            LIMIT 3`, function(err, result){
                if(err) throw err
                console.log(result)
            })
    }

    static fifth(){
        db.all(`SELECT first_name,last_name,gender,age FROM voters WHERE id IN (SELECT votes.voterId FROM politicians 
            LEFT JOIN votes ON politicians.id = votes.politicianId
            WHERE politicians.name = 'Olympia Snowe')`, function(err, result){
                if(err) throw err
                console.log(result)
            })
    }
}

let politician = fs.readFileSync('./politicians.csv', 'utf8').split("\n")
let voter = fs.readFileSync('./voters.csv', 'utf8').split('\n')
let vote = fs.readFileSync('./votes.csv', 'utf8').split("\n")

//InsertTable.politicians(politician)
//InsertTable.voters(voter)
//InsertTable.votes(vote)

//ChangingDB.insert('voters', ['susianti', 'amelia', 'female', 19])
//ChangingDB.updateTable('voters', 152, 'age', 20)
//ChangingDB.deleteData('voters', 152)

//DisplayDB.first()
//DisplayDB.second()
//DisplayDB.third()
//DisplayDB.fourth()
//DisplayDB.fifth()