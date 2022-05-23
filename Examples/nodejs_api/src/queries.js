

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
    pool.query('SELECT * FROM measure ORDER BY idMeter ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
/**
 * Dev interface to get measures by meter
 * @param {*} request 
 * @param {*} response 
 */
  const getMeasureByMeter = (request, response) => {
    const id = parseInt(request.query.id)
    pool.query('SELECT * FROM measure WHERE idMeter = $1', [id], (error, results) => {
      if (error) {
          response.status(404).send();
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
    const idMeter =2;
    const { cumulative_flow,current_flow_rate,temperature,
        second,minute,hour,day,month,year,status_word,
        free_space,count,timestamp} = request.body
    console.log(request.body)
    pool.query('INSERT INTO measure (idMeter,cumulativeFlow,currentFlowRate,temperature,'+
        'secondTime,minuteTime,hourTime,dayTime,monthTime,yearTime,statusWord,'+
        'freeSpace,countData,timeData) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)', 
            [idMeter,cumulative_flow,current_flow_rate,temperature,
              second,minute,hour,day,month,year,status_word,
              free_space,count,timestamp], (error, results) => {
      if (error) {
        response.status(404).send();
        throw error
      }
      response.status(201).send(`New measure added to meter: ${idMeter}`)
    })
  }

  
/**
 * Create a new Meter
 * @param {*} request 
 * @param {*} response 
 */
const mqtt_test = (request, response) => {
  //const serial = request;
  //console.log(serial);
  console.log("MQTT");
  response.status(201);
  
}
  

module.exports = {
  getMeasures,
  getMeasureByMeter,
  insertMeasure,
  mqtt_test
}