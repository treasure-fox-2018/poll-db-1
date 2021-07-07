const Menu = require("../model/modelMenu")
const View = require("../view/viewPoll")

class ControllerMenu {
  static menuList () {
    const listMenu = Menu.menu()
    View.listMenu(listMenu)
  }
}

module.exports = ControllerMenu