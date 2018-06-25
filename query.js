const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./databasePolitician.db')



const query1 = `SELECT name, party, grade_current FROM Politicians
                WHERE grade_current BETWEEN 9 AND 11`
db.all(query1, function(err, q1) {
    if(err) throw err
    console.log('1. ', q1)
    
    const query2 = `SELECT count(*) as totalVote, (SELECT name FROM Politicians WHERE name LIKE 'Olympia%') as name FROM Voters
    LEFT JOIN Votes ON Voters.id = Votes.voterId
    WHERE politicianId = (SELECT id FROM Politicians WHERE name = 'Olympia Snowe')`
    
    db.all(query2, function(err, q2) {
        if(err) throw err
        console.log('2. ',q2)
        
        const query3 = `SELECT name, count(Votes.politicianId) as totalVote FROM Politicians
        LEFT JOIN Votes ON Votes.politicianId = Politicians.id
        WHERE name LIKE '%Adam%'
        GROUP BY Votes.politicianId`
        
        db.all(query3, function(err, q3) {
            if(err) throw err
            console.log('3. ', q3)
        
            const query4 = `SELECT count(Votes.politicianId) as totalVote, name, party, location FROM Politicians
            LEFT JOIN Votes ON Votes.politicianId = Politicians.id
            GROUP BY Votes.politicianId
            ORDER BY totalVote DESC
            LIMIT 3`
            
            db.all(query4, function(err, q4) {
                if(err) throw err
                console.log('4. ', q4)
                
                const query5 = `SELECT first_name, last_name, gender, age FROM Voters
                LEFT JOIN Votes ON Voters.id = Votes.voterId
                WHERE politicianId = (SELECT id FROM Politicians WHERE name = 'Olympia Snowe')`
                
                db.all(query5, function(err, q5) {
                    if(err) throw err
                    console.log('5. ', q5)
                })

            })

        })
    })

})


