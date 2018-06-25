const Model = require("../model/voterModel.js")
const View = require("../view/voterView.js")

class VoterController{
    static insert(first_name,last_name,gender,age){
        Model.insert(first_name,last_name,gender,age,function(data){
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
module.exports = VoterController