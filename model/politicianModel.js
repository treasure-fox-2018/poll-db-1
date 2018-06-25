var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./data.db');

class Politician{
    static insert(name,party,location,grade_current,cb){
        let query = `INSERT INTO Politicians(name,pary,location,grade_current) VALUES("${name}","${party}","${location}","${grade_current}")`
        db.run(query,function(err,data){
            if(err) throw err
            cb(data)
        })
    }

    static update(id,column,value,cb){
        let query = `UPDATE Politicians SET ${column} = "${value}" WHERE id = ${id} `
        db.run(query,function(err,data){
            if(err) throw err
            cb(data)
        })
    }

    static delete(id,cb){
        let del = `DELETE FROM Politicians WHERE id = ${id}`
        db.run(del,function(err,data){
            if(err) throw err
            cb(data)
        })
    }
}

module.exports = Politician