const { Router } = require('express');
const router = new Router();


const { Pool } = require('pg'); //Pool is a group of connections to DB

//Config DB connection
const config = {
   host: 'localhost',
   user: 'postgres',
   password: 'admin',
   database: 'meterDB'
};

//pool request
const pool = new Pool(config);

let data = {};


router.get('/', (req, res) => {
    res.status(200).json(data);
});

router.get('/status', (req, res) => {
    res.status(200);
});




router.post('/', (req, res) => {
    const newSpace = { ...req.body, id };
    data.push(newSpace);
        res.status(200).json("Ok saved succesful!");
    /*} else {
        res.status(500).json({error: 'There was an error.'});
    }*/
});



const getMeters = (request, response) => {
    pool.query('SELECT * FROM meter BY idMeter ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

const insertMeasure = async () => {
    try {
        const text = 'INSERT INTO measure(idMeter, password) VALUES ($1, $2)';
        const values = ['john', 'john1234'];

        const res = await pool.query(text, values);
        console.log(res)
        pool.end();
    } catch (e) {
        console.log(e);
    }
};

module.exports = router;