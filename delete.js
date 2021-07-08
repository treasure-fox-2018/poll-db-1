const db = require('./db')
const argv = process.argv.slice(2)
const tableName = argv[0]
const id = argv[1]

function deleteData(tableName, id) {
  let query = `DELETE FROM ${tableName} WHERE id = ${id}`
  db.run(query, (err) => {
    if (err) throw err
    console.log(`Data with ID: ${id} is deleted`)
  })
}

deleteData(tableName, id)