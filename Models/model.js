'use strict'

const fs = require('fs')
const db = require('./setup')

class Model {
    static seedPoliticans() {
        let politicans = fs.readFileSync('./Models/politicians.csv', 'utf8')
        return politicans
    }

    static insertPoliticans(politicansData) {
        let politicans = politicansData.split("\n").slice(1)

        for (let i = 0; i < politicans.length; i++) {
            if (politicans[i].length !== 0) {
                let politicanAttributes = politicans[i].split(",")
                let politicanName = politicanAttributes[0]
                let politicanParty = politicanAttributes[1]
                let politicanLocation = politicanAttributes[2]
                let politicanGrade = politicanAttributes[3]

                let query = `INSERT INTO politicans(name,party,location,grade_current) VALUES('${politicanName}', '${politicanParty}', '${politicanLocation}', '${politicanGrade}')`

                db.run(query, function (err) {
                  if (err) throw err;
                });
            }
        }
        
        return 'Insert Politicians Successfull!'
    }
}

module.exports = Model
