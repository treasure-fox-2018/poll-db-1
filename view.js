var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./data.db');

class Politicians{
    constructor(){

    }
    static Insert(status){
        if(status){
            console.log("Berhasil Insert Data Politician");
        }
    }
    static Update(status){
        if(status){
            console.log("Berhasil Update Data Politician");
        }
    }
    static Delete(status){
        if(status){
            console.log("Berhasil Delete Data Politician");
        }
    }
}

class Votes{
    static Insert(status){
        if(status){
            console.log("Berhasil Insert Data Votes");
        }
    }
    static Update(status){
        if(status){
            console.log("Berhasil Update Data Votes");
        }
    }
    static Delete(status){
        if(status){
            console.log("Berhasil Delete Data Votes");
        }
    }
}

class Voters{
    static Insert(status){
        if(status){
            console.log("Berhasil Insert Data Voters");
        }
    }
    static Update(status){
        if(status){
            console.log("Berhasil Update Data Voters");
        }
    }
    static Delete(status){
        if(status){
            console.log("Berhasil Delete Data Voters");
        }
    }
}

module.exports = {
    Politicians,
    Votes,
    Voters
}