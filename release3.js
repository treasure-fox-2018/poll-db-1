const db = require('./db.js')
// case 1
db.all(`SELECT name, party, grade_current FROM politicians
        WHERE party = 'R' AND
        grade_current BETWEEN 9 AND 11`, function(err, data) {
  if (err) throw err
  console.log(`Case 1:`)
  console.log(data)
})
// case 2
db.get(`SELECT COUNT (votes.politicianId) AS totalVote, politicians.name
        FROM votes JOIN politicians
        ON votes.politicianId = politicians.id
        WHERE politicians.name = "Olympia Snowe"`,
  function(err, data) {
    if (err) throw err
    console.log('Case 2:')
    console.log(data)
  })
// case 3
db.all(`SELECT politicians.name, COUNT(votes.politicianId) AS totalVote
        FROM politicians JOIN votes
        ON politicians.id = votes.politicianId
        WHERE politicians.name LIKE "Adam%"
        GROUP BY politicians.name`,
  function(err, data) {
    if (err) throw err
    console.log('Case 3:')
    console.log(data)
  }
)
// case 4
db.all(`SELECT COUNT(votes.politicianId) AS totalVote,
        politicians.name, politicians.party, politicians.location
        FROM votes JOIN politicians ON votes.politicianId = politicians.id
        GROUP BY politicians.name
        ORDER BY totalVote DESC
        LIMIT 3`,
  function(err, data) {
    if (err) throw err
    console.log('Case 4:')
    console.log(data)
  })
// case 5
db.all(`SELECT voters.*, votes.politicianId FROM voters
        JOIN votes ON voters.id = votes.voterId
        WHERE votes.politicianId = (
          SELECT votes.politicianId FROM votes
          JOIN politicians ON votes.politicianId = politicians.id
          WHERE politicians.name = "Olympia Snowe"
        )`,
  function(err, data) {
    if (err) throw err
    console.log('Case 5:')
    console.log(data)
  }) 