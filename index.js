var argv = process.argv
argv.splice(0,2)

var command = argv[0]
var table = argv[1]

var controller = require('./controller.js')
var PoliticiansController = controller.Politicians
var VotesController = controller.Votes
var VotersController = controller.Voters

if(command=="help"||command==undefined){
    console.log(`-----help-----\n1. insert = node index.js insert (nama table) (value)\n2. update = node index.js update (nama_table) (id) (coloumn) (value)\n3. delete = node index.js delete (nama_table) (id)`);

}
else{
    switch (table){
        case "politicians":
            if(command=="insert"){
                // name,party,location,grade
                PoliticiansController.Insert(argv[2],argv[3],argv[4],argv[5])
            }
            else if(command=="update"){
                PoliticiansController.Update(argv[2],argv[3],argv[4])
            }
            else if(command=="delete"){
                PoliticiansController.Delete(argv[2])
            }
        break;
        case "voters":
            if(command=="insert"){
                // firstName, lastName, gender, age
                VotersController.Insert(argv[2],argv[3],argv[4],argv[5])
            }
            else if(command=="update"){
                VotersController.Update(argv[2],argv[3],argv[4])
            }
            else if(command=="delete"){
                VotersController.Delete(argv[2])
            }
        break;
        case "votes":
            if(command=="insert"){
            // voterId, politicianId
                VotesController.Insert(argv[2],argv[3])
            }
            else if(command=="update"){
                VotesController.Update(argv[2],argv[3],argv[4])
            }
            else if(command=="delete"){
                VotesController.Delete(argv[2])
            }            
        break;
        default:
        console.log(command);
    }
}

// console.log(table);
