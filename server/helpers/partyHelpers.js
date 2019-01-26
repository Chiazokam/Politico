/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable class-methods-use-this */
/* eslint-disable indent */

class Party {
  constructor() {
    this.parties = [];
  }

  createParty(party) {
    const newParty = {
      id: this.parties.length + 1,
      partyName: party.partyName,
      partyAddress: party.partyAddress,
      partyLogo: party.partyLogo,
    };
    this.parties.push(newParty);
    return (newParty);
  }

  doesPartyExist(party, parties) { // party is the request object
   const { partyName, partyAddress, partyLogo } = party;
   const foundName = parties.find(partyObj => partyObj.partyName === partyName);
   const foundAddress = parties.find(partyObj => partyObj.partyAddress === partyAddress);
   const foundLogo = parties.find(partyObj => partyObj.partyLogo === partyLogo);
   const foundObject = {
     foundName,
     foundAddress,
     foundLogo,
   };
   return foundObject;
  }

  findAllParties() {
    const allParties = this.parties;
    return (allParties);
  }

  findOneParty(id) {
    const foundParty = this.parties.find(party => party.id === Number(id));
    const foundPartyIndex = this.parties.findIndex(party => party.id === Number(id));
    const foundObj = {
      foundParty,
      foundPartyIndex,
    };
    return foundObj;
  }

  updateParty(id, name) {
    const { foundParty, foundPartyIndex } = this.findOneParty(id);
    this.parties[foundPartyIndex].partyName = name;
    return foundParty;
  }
}

export default Party;