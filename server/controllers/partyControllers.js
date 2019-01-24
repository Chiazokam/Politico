/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable class-methods-use-this */
/* eslint-disable indent */

import Party from '../helpers';

const partyObject = new Party();

class PartyController {
  createNewParty(req, res) {
    const { partyName, partyLogo } = req.body;
    const formattedAddr = req.partyAddr;
    let data = {
      partyName: partyName.trim(),
      partyAddress: formattedAddr,
      partyLogo: partyLogo.trim(),
    };
    data = partyObject.createParty(data);
    if (data) {
      return res.status(201).send({
          status: 201,
          data: [data],
      });
    }
    return res.status(400).send({
      status: 400,
      error: 'Party not created',
    });
  }
}

export default PartyController;