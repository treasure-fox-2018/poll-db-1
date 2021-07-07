class Menu {
  static menu () {
    const listMenu = [
      "node index.js politician insert [name] [party] [location] [grade_current]",
      "node index.js politician update [id:value_id] [column:value]",
      "node index.js politician delete [id:value_id]",
      "node index.js politician list [column:value]",
      "node index.js politician hitungVote [hitungVote:value]",
      "node index.js politician topVote [topVote:value]",
      "node index.js voter insert [first_name] [last_name] [gender] [gender]",
      "node index.js voter delete [id:value_id]"
    ]
    return listMenu
  }
}

module.exports = Menu