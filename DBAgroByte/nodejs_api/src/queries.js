

const Pool = require('pg').Pool

var pgconf = require('./config/pgconfig.json')
const config = {
  host: process.env.DB_HOST || pgconf.host,
  user: process.env.DB_USER || pgconf.user,
  password: process.env.DB_PASSWORD || pgconf.password,
  database: process.env.DB_NAME || pgconf.database,
  port : process.env.DB_PORT || pgconf.port
 };
 
 //pool request
 const pool = new Pool(config);
 
/**
 * Dev Interface to get all measures
 * @param {*} request 
 * @param {*} response 
 */
const getMeasures = (request, response) => {
    pool.query('SELECT * FROM measure ORDER BY idMeasure ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

/**
 * Insert measure data to MeterDB
 * @param {*} request 
 * @param {*} response 
 */
const insertMeasure = (request, response) => {
    const { temperature, humidity, timeData} = request.body
    console.log(request.body)
    pool.query('INSERT INTO measure (temperature, humidity, timeData) VALUES ($1,$2,$3)', 
            [temperature, humidity, timeData], (error, results) => {
      if (error) {
        response.status(404).send();
        throw error
      }
      response.status(201).send(`New measure added`)
    })
  }

  

  /**
 * Dev Interface to get all dataparameter
 * @param {*} request 
 * @param {*} response 
 */
const getDataPar = (request, response) => {
  pool.query('SELECT * FROM dataparameters ORDER BY idData ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

/**
* Insert data to DataParameterDB
* @param {*} request 
* @param {*} response 
*/
const insertDataPar = (request, response) => {
  const {startTime, timelapse, weekday} = request.body
  console.log(request.body)
  pool.query('INSERT INTO dataparameters (startTime, timelapse, weekday) VALUES ($1,$2,$3)', 
          [startTime, timelapse, weekday], (error, results) => {
    if (error) {
      response.status(404).send();
      throw error
    }
    response.status(201).send(`New measure added`)
  })
}
  

module.exports = {
  getMeasures,
  insertMeasure,
  getDataPar,
  insertDataPar
}