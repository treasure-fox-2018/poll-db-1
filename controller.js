const Model = require('./model.js');
const View = require('./view.js');

class Controller {

    static createPolitician(name, party, location, grade_current) {
        Model.createPolitician(name, party, location, grade_current)
        let message = `Successfully added new politician: ${name}`
        View.displayMessage(message);

    }

    static updatePoliticians(id, name, party, location, grade_current) {
        Model.updatePolitician(id, name, party, location, grade_current)
        let message = `Succesfully updated data for id: ${id}`
        View.displayMessage(message);
    }

    static deletePoliticians(id) {
        Model.deletePolitician(id)
        let message = `id: ${id} has been deleted`
        View.displayMessage(message);
    }

    static createVoter(first_name, last_name, gender, age) {
        Model.createVoter(first_name, last_name, gender, age)
        let message = `Voter ${first_name} ${last_name} has been added`
        View.displayMessage(message);
    }

    static updateVoter(id, first_name, last_name, gender, age) {
        Model.updateVoter(id, first_name, last_name, gender, age)
        let message = `Voter ${id} data has been updated`
        View.displayMessage(message);
    }

    static deleteVoter(id) {
        Model.deleteVoter(id)
        let message = `Voter ${id} has been deleted`
        View.displayMessage(message);
    }

    static createVote(politicianId, voterId) {
        Model.createVote(politicianId, voterId)
        let message = `Vote has been cast`
        View.displayMessage(message);

    }

    static updateVote(id, politicianId, voterId) {
        Model.updateVote(id, politicianId, voterId)
        let message = `Vote ${id} updated`
        View.displayMessage(message);
    }

    static deleteVote(id) {
        Model.deleteVote(id)
        let message = `Vote has been removed`
        View.displayMessage(message);
    }
    
    static filterByOne() {
        Model.filterByOne();
    }

    static filterByTwo() {
        Model.filterByTwo();
    }

    static filterByThree() {
        Model.filterByThree();
    }

    static filterByFour() {
        Model.filterByFour();
    }
    
    static filterByFive() {
        Model.filterByFive();
    }
}
module.exports = Controller;