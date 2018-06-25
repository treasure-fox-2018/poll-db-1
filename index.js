
const fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database.db');

class AccessDatabase {

    constructor(politicians, voters, votes) {

        this._politicians = politicians
        this._voters = voters
        this._votes = votes

    }

    readPoliticians() {
        let arr = []

        let politicians = fs.readFileSync(this._politicians).toString().split('\n')
        for (var i = 1; i < politicians.length - 1; i++) {

            arr.push(politicians[i].split(','))
        }

        for (let i = 0; i < arr.length; i++) {

            let name = arr[i][0]
            let party = arr[i][1]
            let location = arr[i][2]
            let grade_current = arr[i][3]

            const query = `INSERT INTO Politicians (name,party,location,grade_current) 
                            VALUES ('${name}','${party}','${location}','${grade_current}')`;

            db.run(query, function (err) {

                if (err) throw err
                console.log('added poltician.csv to database success')

            });
        }
    }

    readVoters() {

        let arr = []
        let voters = fs.readFileSync(this._voters).toString().split('\n')
        for (var i = 1; i < voters.length - 1; i++) {

            arr.push(voters[i].split(','))
        }

        for (let i = 0; i < arr.length; i++) {

            let firstname = arr[i][0]
            let lastname = arr[i][1]
            let gender = arr[i][2]
            let age = arr[i][3]

            const query = `INSERT INTO Voters (first_name , last_name , gender , age) 
                            VALUES ("${firstname}","${lastname}","${gender}","${age}")`;

            db.run(query, function (err) {
                if (err) throw err

                console.log('added voters.csv to database success')

            });
        }
    }

    readVotes() {

        let arr = []
        let votes = fs.readFileSync(this._votes).toString().split('\n')
        for (var i = 1; i < votes.length - 1; i++) {

            arr.push(votes[i].split(','))
        }

        for (let i = 0; i < arr.length; i++) {

            let voterId = arr[i][0]
            let politicianId = arr[i][1]

            const query = `INSERT INTO Votes (voterId,politicianId) 
                            VALUES ("${voterId}","${politicianId}")`;

            db.run(query, function (err) {
                if (err) throw err

                console.log('added votes.csv to database success')

            });
        }
    }
}

class InsertData {
    constructor(table) {
        this._table = table
    }

    insert(col1, col2, col3, col4) {

        if (this._table == 'Politicians') {

            const query = `INSERT INTO Politicians (name,party,location,grade_current) 
                            VALUES ('${col1}','${col2}','${col3}','${col4}')`;

            db.run(query, function (err) {
                if (err) throw err;
                console.log('Successfully Insert to Politician table!');
            });

        } else if (this._table == 'Voters') {

            const query = `INSERT INTO Voters (first_name , last_name , gender , age) 
            VALUES ("${col1}","${col2}","${col3}","${col4}")`;

            db.run(query, function (err) {
                if (err) throw err
                console.log('Successfully Insert to Voters table!')
            });

        } else if (this._table == 'Votes') {

            const query = `INSERT INTO Votes (voterId,politicianId) 
            VALUES ("${col1}","${col2}")`;

            db.run(query, function (err) {
                if (err) throw err
                console.log('Successfully Insert to Votes table!')
            });
        }
    }

    delete(Id) {

        if (this._table == 'Politicians') {
            const query = `DELETE FROM Politicians WHERE id=${Id}`;
            db.run(query, function (err) {
                if (err) throw err;
                console.log(`Successfully delete ${Id}in Politician table!`);
            });

        } else if (this._table == 'Voters') {
            const query = `DELETE FROM Voters WHERE id=${Id}`;
            db.run(query, function (err) {
                if (err) throw err
                console.log(`Successfully delete ${Id}in Voters table!`);
            });

        } else if (this._table == 'Votes') {
            const query = `DELETE FROM Votes WHERE id=${Id}`;
            db.run(query, function (err) {
                if (err) throw err
                console.log(`Successfully delete ${Id}in Votes table!`);
            });
        }
    }

    update(Id, col1, col2, col3, col4) {

        if (this._table == 'Politicians') {

            const query = `UPDATE Politicians 
                            SET name ='${col1}',
                                party ='${col2}',
                                location ='${col3}',
                                grade_current ='${col4}')
                            WHERE id =${Id}`;

            db.run(query, function (err) {
                if (err) throw err;
                console.log('Successfully edited to Politician table!');
            });

        } else if (this._table == 'Voters') {

            const query = `UPDATE Voters  
                            SET first_name ='${col1}',
                                last_name ='${col2}',
                                gender ='${col3}',
                                age ='${col4}')
                            WHERE id =${Id}`;

            db.run(query, function (err) {
                if (err) throw err

                console.log('Successfully edited to Voters table!')

            });

        } else if (this._table == 'Votes') {

            const query = `UPDATE Voters  
                            SET first_name ='${col1}',
                                voterId ='${col2}',
                                politicianId ='${col3}',
                            WHERE id =${Id}`;

            db.run(query, function (err) {
                if (err) throw err

                console.log('Successfully Insert to Votes table!')

            });
        }
    }
}

let insertData = new InsertData('Vote')
let data_file = new AccessDatabase(`./politicians.csv`, `./voters.csv`, `./votes.csv`)
// console.log(data_file)
// data_file.readPoliticians()
// data_file.readVoters()
// data_file.readVotes()
// insertData.insert('111', 'ade', 'male', 24)
insertData.delete(21)