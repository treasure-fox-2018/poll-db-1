class ViewPoll {
  static message (message) {
    console.log(message);
  }

  static listMenu (menu) {
    for (let i = 0; i < menu.length; i++) {
      console.log(`${i+1}. ${menu[i]}`);
    }
  }
}

module.exports = ViewPoll