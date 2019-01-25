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

  getAllParties() {
    const allParties = this.parties;
    return (allParties);
  }
}

export default Party;