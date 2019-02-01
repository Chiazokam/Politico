/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable eol-last */

import express from 'express';
import bodyParser from 'body-parser';
import swaggerUI from 'swagger-ui-express';
import apiDocs from '../docs.json';
import router from './routes/router';


const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/docs', swaggerUI.serve, swaggerUI.setup(apiDocs));

app.use(router);


export default app;

const port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening on port', port);
