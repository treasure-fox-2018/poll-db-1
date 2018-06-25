const Model = require("../model/politicianModel.js")
const View = require("../view/politicianView.js")

class PoliController{
    static insert(name,party,location,grade_current){
        Model.insert(name,party,location,grade_current,function(data){
            View.insert(data)
        })
    }

    static update(id,column,value){
        Model.update(id,column,value,function(data){
            View.update(data)
        })
    }

    static delete(id){
        Model.delete(id,function(data){
            View.delete(data)
        })
    }
}
module.exports = PoliController