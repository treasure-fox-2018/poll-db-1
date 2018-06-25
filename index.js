let argv = process.argv;
const Controller = require('./controller.js');

let table = argv[2];
let command = argv[3];

if (table == 'Politicians') {
    if (command == 'create') {
        let name = argv[4];
        let party = argv[5];
        let location = argv[6];
        let grade_current = argv[7];
        Controller.createPolitician(name, party, location, grade_current);
    }

    if (command == 'update') {
        let id = argv[4];
        let name = argv[5];
        let party = argv[6];
        let location = argv[7];
        let grade_current = argv[8];
        Controller.updatePolitician(id, name, party, location, grade_current);
    }

    if (command == 'delete') {
        let id = argv[4];
        Controller.deletePolitician(id);
    }

} else if (table == 'Voters') {
    if (command == 'create') {
        let first_name = argv[4];
        let last_name = argv[5];
        let gender = argv[6];
        let age = argv[7];
        Controller.createVoter(first_name, last_name, gender, age);
    }

    if (command == 'update') {
        let id = argv[4];
        let first_name = argv[5];
        let last_name = argv[6];
        let gender = argv[7];
        let age = argv[8];
        Controller.updateVoter(id, first_name, last_name, gender, age);

    }

    if (command == 'delete') {
        let id = argv[4];
        Controller.deleteVoter(id);
    }

} else if (table == 'Votes') {
    if (command == 'create') {
        let politicianId = argv[4];
        let voterId = argv[5];
        Controller.createVote(politicianId, voterId);
    }

    if (command == 'update') {
        let id = argv[4];
        let politicianId = argv[5];
        let voterId = argv[6];
        Controller.updateVote(id, politicianId, voterId);

    }

    if (command == 'delete') {
        let id = argv[4];
        Controller.deleteVote(id);
    }

} 

if (argv[2] === 'filter') {
    if (argv[3] === '1') {
        Controller.filterByOne();
    } else if (argv[3] == '2') {
        Controller.filterByTwo();
    } else if (argv[3] == '3') {
        Controller.filterByThree();
    } else if (argv[3] == '4') {
        Controller.filterByFour();
    } else if (argv[3] == '5') {
        Controller.filterByFive();
    }
}