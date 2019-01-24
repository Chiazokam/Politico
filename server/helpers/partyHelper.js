/* eslint-disable linebreak-style */
/* eslint-disable eol-last */

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
}

export default Party;