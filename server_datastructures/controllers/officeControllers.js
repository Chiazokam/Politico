/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable class-methods-use-this */
/* eslint-disable indent */

import { Office } from '../helpers';

const officeObject = new Office();

class OfficeController {
  createNewOffice(req, res) {
    let { officeName, officeType } = req.body;
    officeName = officeName.toLowerCase();
    const offices = officeObject.offices;
    const foundOffice = officeObject.doesOfficeExist(officeName, offices);
    if (!foundOffice) {
        let data = {
            officeName: officeName.trim(),
            officeType: officeType.trim(),
          };
          data = officeObject.createOffice(data);
          if (data) {
            return res.status(201).send({
                status: 201,
                data: [data],
            });
          }
            return res.status(400).send({
                status: 400,
                error: 'Office not created',
            });
    }
    return res.status(400).send({
        status: 400,
        error: 'Office Already Exists',
    });
  }

  getAllOffices(req, res) {
    const data = officeObject.findAllOffices();
    if (data) {
      return res.status(200).send({
        status: 200,
        data,
      });
    }
    return res.status(404).send({
      status: 404,
      error: 'Cannot Get Offices',
      });
  }

  getOneOffice(req, res) {
    const officeId = req.params.id;
    const { foundOffice } = officeObject.findOneOffice(officeId);
    if (foundOffice) {
      return res.status(200).send({
        status: 200,
        data: [foundOffice],
      });
    }
    return res.status(404).send({
      status: 404,
      error: 'Office Not Found',
    });
  }
}

export default OfficeController;