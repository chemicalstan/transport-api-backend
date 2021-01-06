const pool = require('./pool');

// establishing database connection
pool.on('connect', ()=>{
    console.log('connected to database')
})