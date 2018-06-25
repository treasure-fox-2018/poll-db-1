const Model = require("../model/votesModel.js")
const View = require("../view/votesView.js")

class VoterController{
    static insert(voterId,politicianId){
        Model.insert(voterId,politicianId,function(data){
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