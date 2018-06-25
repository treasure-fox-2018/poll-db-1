const db = require('./setup')
const argv = process.argv.slice(2)
const command = argv[0]

if(command === "politicians"){
    let query = `DELETE FROM politicians WHERE id = '${argv[1]}'`
    db.run(query, function(err){
        if(err) throw err
        console.log(`Politicians id ${argv[1]} has been deleted!`)
    })
}
else if(command === "voters"){
    let query = `DELETE FROM voters WHERE id = '${argv[1]}'`
    db.run(query, function(err){
        if(err) throw err
        console.log(`Voters id ${argv[1]} has been deleted!`)
    })
}
else if(command === "votes"){
    let query = `DELETE FROM votes WHERE id = '${argv[1]}'`
    db.run(query, function(err){
        if(err) throw err
        console.log(`Votes id ${argv[1]} has been deleted!`)
    })
}


