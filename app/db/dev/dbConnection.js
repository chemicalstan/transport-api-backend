const pool = require('./pool');

// establishing database connection
pool.on('connect', ()=>{
    console.log('connected to database')
})


/**
 * Create User Table
 * CREATE TABLE test
  (id SERIAL PRIMARY KEY, 
  name VARCHAR(100) UNIQUE NOT NULL, 
  phone VARCHAR(100));
 */

 const createUserTable = ()=>{
     const userCreateQuery = `CREATE TABEL IF NOT EXISTS users (id SERIAL PRIMARY KEY, email VARCAR(100) UNIQUE NOT NULL, first_name VARCAR(100), last_name VARCAR(100), password VARCAR(100) NOT NULL, created_on DATE NOT NULL)`;

     // passing query to pool to return a promise
     pool.query(userCreateQuery)
        .then(res=>{
            console.log(res);
            pool.end();
        })
        .catch(err=>{
            console.log(err);
            pool.end();
        });
 }; // createUsersTable end

 /**
 * Create Buses Table
 */
 const createBusTable = ()=>{
     const busCreatQuery = `CREATE TABLE IF NOT EXISTS bus (id SERIAL PRIMARY KEY, number_plate VARCAR(100) NOT NULL, manufacturer VARCAR(100) NOT NULL, model VARCAR(100) NOT NULL, year VARCAR(100), capacity INTEGER NOT NULL, created_on DATE NOT NULL)`;

     pool.query(createBusTable)
        .then(res=>{
            console.log(res);
            pool.end();
        })
        .catch(err=>{
            console.log(err);
            pool.end();
        })
 }; // createBusTabel end

 /**
 * Create Trip Table
 */

 const createTripTable = ()=>{
    const tripCreateQuery = `CREATE TABLE IF NOT EXISTS trip (id SERIAL PRIMARY KEY, bus_id INTEGER REFERENCES bus(id) ON DELETE CASCADE, origin VARCAR(300) NOT NULL, destination VARVAR(300) NOT NULL, trip_date DATE NOT NULL, fare FLOAT NOT NULL, status FLOAT DEFAULT(1.00), created_on DATE NOT NULL)`;

    pool.query(tripCreateQuery)
        .then(res=>{
            console.log(res)
            pool.end()
        })
        .catch(err=>{
            console.log(err)
            pool.end()
        })
 };