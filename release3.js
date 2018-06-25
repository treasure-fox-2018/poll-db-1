// Tampilkan nama politician, partai, grade_current Politician
//yang berada di partai R dan memiliki grade_current di range 9 s/d 11

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database1.db');


let query1 = `select name, party, grade_current FROM Politicians
WHERE party = 'R' AND grade_current BETWEEN 9 AND 11`

db.all(query1, (err, data) => {
  console.log(data)
})



let query2 = `select  count(*) AS 'Total Vote' , Politicians.name from Votes
 JOIN Politicians on Politicians.id = Votes.id_politicians
where id_politicians = (select id from Politicians where name = 'Olympia Snowe')`


db.all(query2, (err, data) => {
  console.log(data)
})


let query3 = `select name, count(*) as totalVote from Votes
JOIN Politicians on
Politicians.id = Votes.id_politicians
WHERE Politicians.name like '%adam%' group by name`

db.all(query3, (err, data) => {
  console.log(data)
})


let query4 = `select count(id_politicians) as TotalVote, Politicians.name, Politicians.party, Politicians.location from Votes
JOIN Politicians ON Politicians.id = Votes.id_politicians
group by id_politicians order by TotalVote desc limit 3`

db.all(query4, (err, data) => {
  console.log(data)
})


let query5 = `select first_name, last_name, gender, age from Voters
JOIN Votes ON
Voters.id= Votes.id_voters
WHERE Votes.id_politicians = (select id from Politicians where name = "Olympia Snowe")
`

db.all(query5, (err, data) => {
  console.log(data)
})


//2. Hitung jumlah vote untuk politician yang bernama Olympia Snowe
