var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./data.db');

class Votes{
    static insert(voterId,politicianId,cb){
        let query = `INSERT INTO Votes(voterId,politicianId) VALUES(${voterId},${politicianId})`
        db.run(query,function(err,data){
            if(err) throw err
            cb(data)
        })
    }

    static update(id,column,value,cb){
        let query = `UPDATE Voters SET ${column} = "${value}" WHERE id = ${id} `
        db.run(query,function(err,data){
            if(err) throw err
            cb(data)
        })
    }

    static delete(id,cb){
        let del = `DELETE FROM Voters WHERE id = ${id}`
        db.run(del,function(err,data){
            if(err) throw err
            cb(data)
        })
    }
}

module.exports = Votes