import express from 'express';
import bodyParser from 'body-parser';


const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Welcome to Politico');
})

export default app;

const port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening on port', port);
