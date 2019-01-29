/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable eol-last */

import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/router';


const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

export default app;

const port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening on port', port);

