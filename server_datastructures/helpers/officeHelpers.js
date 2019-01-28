/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable class-methods-use-this */

class Office {
    constructor() {
      this.offices = [];
    }

    createOffice(office) {
      const newOffice = {
        id: this.offices.length + 1,
        officeName: office.officeName,
        officeType: office.officeType,
      };
      this.offices.push(newOffice);
      return (newOffice);
    }

    doesOfficeExist(office, officeArray) { // where office is a string
      const officeLowerCase = office.toLowerCase();
      const foundOffice = officeArray.find(officeObj => officeObj.officeName === officeLowerCase);
      return foundOffice;
    }

    findAllOffices() {
      const allOffices = this.offices;
      return (allOffices);
    }

    findOneOffice(id) {
      const foundOffice = this.offices.find(office => office.id === Number(id));
      const foundOfficeIndex = this.offices.findIndex(office => office.id === Number(id));
      const foundObj = {
        foundOffice,
        foundOfficeIndex,
      };
      return foundObj;
    }
  }

  export default Office;