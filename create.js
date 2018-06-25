const db = require('./setup')
const argv = process.argv.slice(2)
const command = argv[0]

if(command === "politicians"){
    let query = `INSERT INTO politicians (name, party, location, grade_current) VALUES ('${argv[1]}', '${argv[2]}', '${argv[3]}', '${argv[4]}')`
    db.run(query, function(err){
        if(err) throw err
        console.log('New politicians has been added!')
    })
}
else if(command === "voters"){
    let query = `INSERT INTO voters (first_name, last_name, gender, age) VALUES ('${argv[1]}', '${argv[2]}', '${argv[3]}', '${argv[4]}')`
    db.run(query, function(err){
        if(err) throw err
        console.log('New voters has been added!')
    })
}
else if(command === "votes"){
    let query = `INSERT INTO votes (voterId, politicianId) VALUES ('${argv[1]}', '${argv[2]}')`
    db.run(query, function(err){
        if(err) throw err
        console.log('New votes has been added!')
    })
}
