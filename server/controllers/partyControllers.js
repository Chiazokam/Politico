/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable class-methods-use-this */
/* eslint-disable indent */

import { Party } from '../helpers';

const partyObject = new Party();

class PartyController {
  createNewParty(req, res) {
    const { name, logoUrl } = req.body;
    const formattedAddr = req.partyAddr;
    const requestData = {
      name: name.trim(),
      hqAddress: formattedAddr,
      logoUrl: logoUrl.trim(),
    };

    const parties = partyObject.parties;
    const foundParty = partyObject.doesPartyExist(requestData, parties);
    const { foundName, foundAddress, foundLogo } = foundParty;
    if (!foundName || !foundAddress || !foundLogo) {
      const data = partyObject.createParty(requestData);
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
    return res.status(403).send({
      status: 403,
      error: 'Party Name, Address or Logo Already Exists',
    });
  }

  getAllParties(req, res) {
    const data = partyObject.findAllParties();
    if (data) {
      return res.status(200).send({
        status: 200,
        data,
      });
    }
    return res.status(404).send({
      status: 404,
      error: 'Cannot Get Parties',
      });
  }

  getOneParty(req, res) {
    const id = req.params.id;
    const { foundParty } = partyObject.findOneParty(id);
    if (foundParty) {
      return res.status(200).send({
        status: 200,
        data: [foundParty],
      });
    }
    return res.status(404).send({
      status: 404,
      error: 'Party Not Found',
    });
  }

  editParty(req, res) {
    const id = req.params.id;
    const { name } = req.body;
    const { foundParty } = partyObject.findOneParty(id);
    if (foundParty) {
      const newParty = partyObject.updateParty(id, name);
      return res.status(201).send({
        status: 201,
        data: [newParty],
      });
    }
    return res.status(404).send({
      status: 404,
      error: 'Cannot Edit a Non-Existing Party',
    });
  }

  deleteParty(req, res) {
    const id = req.params.id;
    const { foundParty } = partyObject.findOneParty(id);
    if (foundParty) {
      const deletedParty = partyObject.deleteParty(id);
      return res.status(200).send({
        status: 200,
        data: [{
          message: `Successfully deleted '${deletedParty.name}'`,
        }],
      });
    }
    return res.status(404).send({
      status: 404,
      error: 'Party Does Not Exist',
    });
  }
}

export default PartyController;
