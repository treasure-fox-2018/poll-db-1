const db = require('./setup')
const argv = process.argv.slice(2)
const command = argv[0]

if(command === "politicians"){
    let query = `UPDATE politicians SET name = '${argv[1]}',
                    party = '${argv[2]}', location = '${argv[3]}',
                    grade_current = '${argv[4]}'
                WHERE id = '${argv[5]}'`
    db.run(query, function(err){
        if(err) throw err
        console.log(`Politicians id ${argv[5]} has been updated!`)
    })
}
else if(command === "voters"){
    let query = `UPDATE politicians SET first_name = '${argv[1]}',
                    last_name = '${argv[2]}', gender = '${argv[3]}',
                    age = '${argv[4]}'
                WHERE id = '${argv[5]}'`
    db.run(query, function(err){
        if(err) throw err
        console.log(`Voters id ${argv[5]} has been updated!`)
    })
}
else if(command === "votes"){
    let query = `UPDATE votes SET voterId = '${argv[1]}',
                    politicianId = '${argv[2]}'
                WHERE id = '${argv[3]}'`
    db.run(query, function(err){
        if(err) throw err
        console.log(`Votes id ${argv[3]} has been updated!`)
    })
}

