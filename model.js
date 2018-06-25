var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./data.db');

class Politicians{
    constructor(){

    }
    static Insert(name,party,location,grade,cbInsert){
        db.run(`INSERT INTO Politicians VALUES(null,"${name}","${party}","${location}",${grade})`,(err)=>{
            if (err) throw err
            else{
                cbInsert(true)
            }
        })
    }
    static Update(id,coloumn,value,cbUpdate){
        db.run(`UPDATE Politicians SET ${coloumn} = "${value}" WHERE id = ${id}`,(err)=>{
            if(err) throw err
            else{
                cbUpdate(true)
            }
        })
    }
    static Delete(id,cbUpdate){
        db.run(`DELETE FROM Politicians WHERE id = ${id}`,(err)=>{
            if(err) throw err
            else{
                cbUpdate(true)
            }
        })
    }
}

class Votes{
    static Insert(voterId, politicianId, cbInsert){
        db.run(`INSERT INTO Votes VALUES(null,${voterId},${politicianId})`,(err)=>{
            if (err) throw err
            else{
                cbInsert(true)
            }
        })
    }
    static Update(id,coloumn,value,cbUpdate){
        db.run(`UPDATE Votes SET ${coloumn} = "${value}" WHERE id = ${id}`,(err)=>{
            if(err) throw err
            else{
                cbUpdate(true)
            }
        })
    }
    static Delete(id,cbUpdate){
        db.run(`DELETE FROM Votes WHERE id = ${id}`,(err)=>{
            if(err) throw err
            else{
                cbUpdate(true)
            }
        })
    }
}

class Voters{
    static Insert(firstName, lastName, gender, age,cbInsert){
        db.run(`INSERT INTO Voters VALUES(null,"${firstName}","${lastName}","${gender}",${age})`,(err)=>{
            if (err) throw err
            else{
                cbInsert(true)
            }
        })
    }
    static Update(id,coloumn,value,cbUpdate){
        db.run(`UPDATE Voters SET ${coloumn} = "${value}" WHERE id = ${id}`,(err)=>{
            if(err) throw err
            else{
                cbUpdate(true)
            }
        })
    }
    static Delete(id,cbUpdate){
        db.run(`DELETE FROM Voters WHERE id = ${id}`,(err)=>{
            if(err) throw err
            else{
                cbUpdate(true)
            }
        })
    }
}

module.exports = {
    Politicians,
    Votes,
    Voters
}