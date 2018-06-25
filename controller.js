var model = require('./model.js')
var PoliticiansModel = model.Politicians
var VotesModel = model.Votes
var VotersModel = model.Voters

var view = require('./view.js')
var PoliticiansView = view.Politicians
var VotesView = view.Votes
var VotersView = view.Voters


class Politicians{
    constructor(){

    }
    static Insert(name,party,location,grade){
        PoliticiansModel.Insert(name,party,location,grade,(result)=>{
            PoliticiansView.Insert(result)
        })
    }
    static Update(id,coloumn,value){
        PoliticiansModel.Update(id,coloumn,value,(result)=>{
            PoliticiansView.Update(result)
        })
    }
    static Delete(id){
        PoliticiansModel.Delete(id,(result)=>{
            PoliticiansView.Delete(result)
        })
    }
}

class Votes{
    static Insert(voterId, politicianId){
        VotesModel.Insert(voterId, politicianId,(result)=>{
            VotesView.Insert(result)
        })
    }
    static Update(id,coloumn,value){
        VotesModel.Update(id,coloumn,value,(result)=>{
            VotesView.Update(result)
        })
    }
    static Delete(id){
        VotesModel.Delete(id,(result)=>{
            VotesView.Delete(result)
        })
    }
}

class Voters{
    static Insert(firstName, lastName, gender, age){
        VotersModel.Insert(firstName, lastName, gender, age,(result)=>{
            VotersView.Insert(result)
        })
    }
    static Update(id,coloumn,value){
        VotersModel.Update(id,coloumn,value,(result)=>{
            VotersView.Update(result)
        })
    }
    static Delete(id){
        VotersModel.Delete(id,(result)=>{
            VotersView.Delete(result)
        })
    }
}

module.exports = {
    Politicians,
    Votes,
    Voters
}