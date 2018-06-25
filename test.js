const db = require('./db')

db.get('SELECT * FROM politicians WHERE id = 21', (err, data) => {
  if (err) throw err
  console.log(data)
})