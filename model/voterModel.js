var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./data.db');

class Voter{
    static insert(first_name,last_name,gender,age,cb){
        let query = `INSERT INTO Voters(first_name,last_name,gender,age) VALUES("${first_name}","${last_name}","${gender}","${age}")`
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

module.exports = Voter