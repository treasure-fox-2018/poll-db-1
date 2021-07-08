const db = require('./db')
const argv = process.argv.slice(2)
const tableName = argv[0]
const args = argv.slice(1)

// node update table_name id column_name value
function updateData(tableName, args) {
  let id = args[0]
  let column = args[1]
  let value = args[2]
  let query = `UPDATE ${tableName} 
               SET ${column} = '${value}'
               WHERE id = ${id}`
  db.run(query, (err) => {
    if (err) throw err
    console.log(`Data updated successfully`)
  })
}

updateData(tableName, args)