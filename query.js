const db = require('./setup')

// query 1
db.all(`SELECT name, party, grade_current FROM politicians
        WHERE party = 'R' AND grade_current >= 9 AND grade_current <= 11`,
        function(err, politicians){
            if(err) throw err
            console.log(politicians)
        })

// query 2
db.all(`SELECT COUNT(politicianId) AS totalVote, politicians.name FROM votes 
        JOIN politicians ON politicians.id = votes.politicianId
        WHERE politicianId = (SELECT id FROM politicians WHERE name = "Olympia Snowe")`,
        function(err, totalVote){
            if(err) throw err
            console.log(totalVote);
            
        })

// query 3
db.all(`SELECT politicians.name, COUNT (*) AS totalVote FROM votes 
    JOIN politicians ON votes.politicianId = politicians.id WHERE
    politicians.name like "%Adam%" GROUP BY politicians.name ORDER BY totalVote asc`, function(err, totalVote){
        if(err) throw err
        console.log(totalVote)
})

// query 4
db.all(`SELECT COUNT(*) AS totalVote, politicians.name, politicians.party, politicians.location FROM votes
        JOIN politicians ON politicians.id = votes.politicianId
        GROUP BY politicians.name ORDER BY totalVote DESC LIMIT 3`, function(err, totalVote){
            if(err) throw err
            console.log(totalVote);
            
        })

// query 5
db.all(`SELECT first_name, last_name, gender, age from Voters
	JOIN Votes ON Votes.voterId = Voters.id
        WHERE politicianId = (SELECT id FROM politicians WHERE name = "Olympia Snowe")`, function(err, voters){
            if(err) throw err
            console.log(voters);
        })

