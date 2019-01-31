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
      name: party.name,
      hqAddress: party.hqAddress,
      logoUrl: party.logoUrl,
    };
    this.parties.push(newParty);
    return (newParty);
  }

  doesPartyExist(party, parties) { // party is the request object
   const { name, hqAddress, logoUrl } = party;
   const foundName = parties.find(partyObj => partyObj.name === name);
   const foundAddress = parties.find(partyObj => partyObj.hqAddress === hqAddress);
   const foundLogo = parties.find(partyObj => partyObj.logoUrl === logoUrl);
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
    this.parties[foundPartyIndex].name = name;
    return foundParty;
  }

  deleteParty(id) {
    const { foundParty, foundPartyIndex } = this.findOneParty(id);
    this.parties.splice(foundPartyIndex, 1);
    return foundParty;
  }
}

export default Party;
