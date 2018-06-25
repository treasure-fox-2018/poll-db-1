'use strict'

const fs = require('fs')
const db = require('./setup')

class Model {
    static seedPoliticans() {
        let politicans = fs.readFileSync('./Models/politicians.csv', 'utf8')
        return politicans
    }

    static seedVoters() {
        let voters = fs.readFileSync('./Models/voters.csv', 'utf8')
        return voters
    }

    static seedVotes() {
        let votes = fs.readFileSync('./Models/votes.csv', 'utf8')
        return votes
    }

    static insertVotes(votesData) {
      let votes = votesData.split("\n").slice(1)

      for (let i = 0; i < votes.length; i++) {
          if (votes[i].length !== 0) {
              let votesAttributes = votes[i].split(",")
              let voteVoterId = votesAttributes[0]
              let votePoliticanId = votesAttributes[1]

              let query = `INSERT INTO votes(voterid, politicanid) VALUES(${voteVoterId}, ${votePoliticanId})`

              db.run(query, function (err) {
                if (err) throw err;
              });
          }
      }

      return 'Insert Votes Successfull !'
    }

    static insertVoters(votersData) {
        let voters = votersData.split("\n").slice(1)

        for (let i = 0; i < voters.length; i++) {
            if (voters[i].length !== 0) {
                let voterAttributes = voters[i].split(",")
                let voterFirstname = voterAttributes[0]
                let voterLastname = voterAttributes[1]
                let voterGender = voterAttributes[2]
                let voterAge = voterAttributes[3]

                let query = `INSERT INTO voters(first_name, last_name, gender, age) VALUES("${voterFirstname}", "${voterLastname}", "${voterGender}", ${voterAge})`

                db.run(query, function (err) {
                  if (err) throw err;
                });
            }
        }

        return 'Insert Voters Successfull !'
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

                let query = `INSERT INTO politicans(name,party,location,grade_current) VALUES("${politicanName}", "${politicanParty}", "${politicanLocation}", ${politicanGrade})`

                db.run(query, function (err) {
                  if (err) throw err;
                });
            }
        }

        return 'Insert Politicians Successfull !'
    }
}

module.exports = Model
