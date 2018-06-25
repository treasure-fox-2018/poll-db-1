const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./poll.db');
const fs = require('fs');

class Politician {
  constructor(arr) {
    this.name = arr[0];
    this.party = arr[1];
    this.location = arr[2];
    this.grade_current = arr[3];
  }
}

class PoliticianParser {

  static allPolitician(data) {
    let dataArr = (fs.readFileSync(data, 'utf-8')).split('\n');
    let result = [];
    let politicianObj = {};
    for(let i = 1; i < dataArr.length; i++) {
      let politicianValues = dataArr[i].split(",");
      if(politicianValues != '') {
        politicianObj = new Politician(politicianValues);
        result.push(politicianObj);
      }
    }
    return result;
  }
}

class Voter {
  constructor(arr) {
    this.first_name = arr[0];
    this.last_name = arr[1];
    this.gender = arr[2];
    this.age = arr[3];
  }
}

class VoterParser {

  static allVoter(data) {
    let dataArr = (fs.readFileSync(data, 'utf-8')).split('\n');
    let result = [];
    let voterObj = {};
    for(let i = 1; i < dataArr.length; i++) {
      let voterValues = dataArr[i].split(",");
      if(voterValues != '') {
        voterObj = new Voter(voterValues);
        result.push(voterObj);
      }
    }
    return result;
  }
}

class Vote {
  constructor(arr) {
    this.voter_id = arr[0];
    this.politician_id = arr[1];
  }
}

class VoteParser {

  static allVote(data) {
    let dataArr = (fs.readFileSync(data, 'utf-8')).split('\n');
    let result = [];
    let voteObj = {};
    for(let i = 1; i < dataArr.length; i++) {
      let voteValues = dataArr[i].split(",");
      if(voteValues != '') {
        voteObj = new Vote(voteValues);
        result.push(voteObj);
      }
    }
    return result;
  }
}

const addPoliticianDB = (dataArr) => {
  db.serialize( () => {
    let stmt = db.prepare('INSERT INTO Politicians (name, party, location, grade_current) VALUES (?, ?, ?, ?)');
    for (let i in dataArr) {
      stmt.run(dataArr[i].name, dataArr[i].party, dataArr[i].location, dataArr[i].grade_current);
    }
    stmt.finalize();
  });
}

const addVoterDB = (dataArr) => {
  db.serialize( () => {
    let stmt = db.prepare('INSERT INTO Voters (first_name, last_name, gender, age) VALUES (?, ?, ?, ?)');
    for (let i in dataArr) {
      stmt.run(dataArr[i].first_name, dataArr[i].last_name, dataArr[i].gender, dataArr[i].age);
    }
    stmt.finalize();
  });
}

const addVoteDB = (dataArr) => {
  db.serialize( () => {
    let stmt = db.prepare('INSERT INTO Votes (voter_id, politician_id) VALUES (?, ?)');
    for (let i in dataArr) {
      stmt.run(dataArr[i].voter_id, dataArr[i].politician_id);
    }
    stmt.finalize();
  });
}

const seedAllData = (politiciansData, votersData, votesData) => {
  addPoliticianDB(politiciansData);
  addVoterDB(votersData);
  addVoteDB(votesData);
  db.close();
}


let politiciansData = PoliticianParser.allPolitician('./politicians.csv');
let votersData = VoterParser.allVoter('./voters.csv');
let votesData = VoteParser.allVote('./votes.csv');

seedAllData(politiciansData, votersData, votesData);
