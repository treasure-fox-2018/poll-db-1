'use strict'

const fs = require('fs')
const db = require('./setup')

class Model {
    // -----      Seed      -----
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

    // -----      Politicians      -----

    static addPolitican(politicanAttributes) {
        let politicanName = politicanAttributes[0]
        let politicanParty = politicanAttributes[1]
        let politicanLocation = politicanAttributes[2]
        let politicanGrade = politicanAttributes[3]

        let query = `INSERT INTO politicans(name,party,location,grade_current) VALUES("${politicanName}", "${politicanParty}", "${politicanLocation}", ${politicanGrade})`

        db.run(query, function (err) {
          if (err) throw err;
        });

        return `Add new politician '${politicanName}' Successfull!`
    }

    static updatePolitican(politicanAttributes) {
        let politicanName = politicanAttributes[1]
        let politicanParty = politicanAttributes[2]
        let politicanLocation = politicanAttributes[3]
        let politicanGrade = politicanAttributes[4]

        const query = `UPDATE politicans
                       SET name          = '${politicanName}',
                           party         = '${politicanParty}',
                           location      = '${politicanLocation}',
                           grade_current = ${politicanGrade}
                       WHERE id=${politicanAttributes[0]}`;

        db.run(query, function (err) {
          if (err) throw err;
        });

        return `Update politician '${politicanName}' Successfull!`
    }

    static deletePolitican(politicanId) {
        const query = `DELETE FROM politicans WHERE id = ${politicanId}`

        db.run(query, function (err) {
            if (err) throw err
        })

        return `Delete politician successfull !`
    }


    // -----         Voters        -----

    static addVoter(voterAttributes) {
        let voterFirstname = voterAttributes[0]
        let voterLastname = voterAttributes[1]
        let voterGender = voterAttributes[2]
        let voterAge = voterAttributes[3]

        let query = `INSERT INTO voters(first_name, last_name, gender, age) VALUES("${voterFirstname}", "${voterLastname}", "${voterGender}", ${voterAge})`

        db.run(query, function (err) {
          if (err) throw err;
        });

        return `Add new voter '${voterFirstname} ${voterLastname}' Successfull!`
    }


    static updateVoter(voterAttributes) {
      let voterFirstname = voterAttributes[1]
      let voterLastname = voterAttributes[2]
      let voterGender = voterAttributes[3]
      let voterAge = voterAttributes[4]

        const query = `UPDATE voters
                       SET first_name   = '${voterFirstname}',
                           last_name    = '${voterLastname}',
                           gender       = '${voterGender}',
                           age          = ${voterAge}
                       WHERE id=${voterAttributes[0]}`;

        db.run(query, function (err) {
          if (err) throw err;
        });

        return `Update voter '${voterFirstname} ${voterLastname}' Successfull!`
    }


    static deleteVoter(voterId) {
        const query = `DELETE FROM voters WHERE id = ${voterId}`

        db.run(query, function (err) {
            if (err) throw err
        })

        return `Delete Voter Successfull !`
    }

    // -----            Votes        -----

    static addVote(votesAttributes) {
        let votesVoterId = votesAttributes[0]
        let votesPoliticanId = votesAttributes[1]

        let query = `INSERT INTO votes(voterId, politicanId) VALUES("${votesVoterId}", "${votesPoliticanId}")`

        db.run(query, function (err) {
          if (err) throw err;
        });

        return `Add new votes Successfull!`
    }

    static updateVote(votesAttributes) {
      let votesVoterId = votesAttributes[1]
      let votesPoliticanId = votesAttributes[2]

        const query = `UPDATE votes
                       SET voterId   = "${votesVoterId}",
                           politicanId    = "${votesPoliticanId}"
                       WHERE id=${votesAttributes[0]}`;

        db.run(query, function (err) {
          if (err) throw err;
        });

        return `Update Vote Successfull!`
    }

    static deleteVote(voteId) {
        const query = `DELETE FROM votes WHERE id = ${voteId}`

        db.run(query, function (err) {
            if (err) throw err
        })

        return `Delete Vote Successfull !`
    }

    // -----            Insert CSV File        -----

    static insertPoliticansCSV(politicansDataCSV) {
        let politicans = politicansDataCSV.split("\n").slice(1)

        for (let i = 0; i < politicans.length; i++) {
            if (politicans[i].length !== 0) {
                let politicanAttributes = politicans[i].split(",")
                Model.addPolitican(politicanAttributes)
            }
        }

        return 'Insert Politicians Successfull !'
    }

    static insertVotesCSV(votesData) {
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

    static insertVotersCSV(votersData) {
        let voters = votersData.split("\n").slice(1)

        for (let i = 0; i < voters.length; i++) {
            if (voters[i].length !== 0) {
                let voterAttributes = voters[i].split(",")
                Model.addVoter(voterAttributes)
            }
        }

        return 'Insert Voters Successfull !'
    }
}

module.exports = Model
