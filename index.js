const PoliticianController = require("./controller/politicianController.js")
const VoterController = require("./controller/voterController.js")
const VotesController = require("./controller/votesController.js")
let argv = process.argv
let data = argv[2]
let command = argv[3]

if(data == "politician"){
    if(command == "add"){
        PoliticianController.insert(argv[4],argv[5],argv[6],argv[7])
    }else if(command == "update"){
        PoliticianController.update(argv[4],argv[5],argv[6])
    }else if(command == "delete"){
        PoliticianController.delete(argv[4])
    }
}else if(data == "voter"){
    if(command == "add"){
        VoterController.insert(argv[4],argv[5],argv[6],argv[7])
    }else if(command == "update"){
        VoterController.update(argv[4],argv[5],argv[6])
    }else if(command == "delete"){
        VoterController.delete(argv[4])
    }
}else if(data == "votes"){
    if(command == "add"){
        VotesController.insert(argv[4],argv[5])
    }else if(command == "update"){
        VotesController.update(argv[4],argv[5],argv[6])
    }else if(command == "delete"){
        VotesController.delete(argv[4])
    }
}
