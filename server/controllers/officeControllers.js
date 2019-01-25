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
    if (foundOffice === undefined) {
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
}

export default OfficeController;