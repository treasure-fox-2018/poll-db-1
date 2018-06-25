const db = require('./db')
const fs = require('fs')

const politicians = fs.readFileSync('./politicians.csv', 'utf8').split('\n')
for (let i = 1; i < politicians.length; i++) {
  let politician = politicians[i].split(',')
  let query = `INSERT INTO politicians (name, party, location, grade_current)
               VALUES ('${politician[0]}', '${politician[1]}', '${politician[2]}', '${politician[3]}')`
  db.run(query, function(err) {
    if (err) throw err
    console.log(`Inserted politician data ${i}`)
  })
}

const voters = fs.readFileSync('./voters.csv', 'utf8').split('\n')
for (let i = 1; i < voters.length; i++) {
  let columnName = voters[0]
  let voter = voters[i].split(',')
  let query = `INSERT INTO voters (${columnName})
               VALUES ('${voter[0]}', "${voter[1]}", '${voter[2]}', '${voter[3]}')`
  db.run(query, function(err) {
    if (err) throw err
    console.log(`Inserted voter data ${i}`)
  })
}

const votes = fs.readFileSync('./votes.csv', 'utf8').split('\n')
for (let i = 1; i < votes.length; i++) {
  let columnName = votes[0]
  let vote = votes[i].split(',')
  let query = `INSERT INTO votes (${columnName})
               VALUES (${vote[0]}, ${vote[1]})`
  db.run(query, function(err) {
    if (err) throw err
    console.log(`Inserted vote data ${i}`)
  })
}