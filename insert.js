const db = require('./db')
const argv = process.argv.slice(2)
const tableName = argv[0]
const args = argv.slice(1)

// node insert table_name name party location grade
function insertData(tableName, args) {
  let query = `INSERT INTO ${tableName} `
  switch(tableName) {
    case 'politicians':
      query += `(name, party, location, grade_current) 
                VALUES ('${args[0]}', '${args[1]}', '${args[2]}', '${args[3]}')`
      break;
    case 'voters':
      query += `(first_name, last_name, gender, age)
                VALUES ('${args[0]}', '${args[1]}', '${args[2]}', '${args[3]}')`
      break;
    case 'votes':
      query += `(voterId, politicianId)
                VALUES (${args[0]}, ${args[1]})`
      break;
    default:
      console.log('table does not exist')
      return false
  }

  db.run(query, (err) => {
    if (err) throw err
    console.log(`Data inserted successfully to ${tableName}`)
  })
}

insertData(tableName, args)