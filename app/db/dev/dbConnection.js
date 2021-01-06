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
     const userCreateQuery = `CREATE TABEL IF NOT EXISTS users(id SERIAL PRIMARY KEY, email VARCAR(100) UNIQUE NOT NULL, first_name VARCAR(100), last_name VARCAR(100), password VARCAR(100) NOT NULL, created_on DATE NOT NULL)`;

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
     const busCreatQuery = `CREATE TABLE IF NOT EXISTS bus(id SERIAL PRIMARY KEY, number_plate VARCAR(100) NOT NULL, manufacturer VARCAR(100) NOT NULL, model VARCAR(100) NOT NULL, year VARCAR(100), capacity INTEGER NOT NULL, created_on DATE NOT NULL)`;

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
    const tripCreateQuery = `CREATE TABLE IF NOT EXISTS trip(id SERIAL PRIMARY KEY, bus_id INTEGER REFERENCES bus(id) ON DELETE CASCADE, origin VARCAR(300) NOT NULL, destination VARVAR(300) NOT NULL, trip_date DATE NOT NULL, fare FLOAT NOT NULL, status FLOAT DEFAULT(1.00), created_on DATE NOT NULL)`;

    pool.query(tripCreateQuery)
        .then(res=>{
            console.log(res)
            pool.end()
        })
        .catch(err=>{
            console.log(err)
            pool.end();
        })
 }; // createBusTable end

 /**
 * Create Booking Table
 */

 const createBookingTable = ()=>{
     const bookingCreateQuery = `CREATE TABLE IF NOT EXISTS booking(id SERIAL PRIMARY KEY, trip_id INTEGER REFERENCES trip(id) ON DELETE CASCADE, bus_id INTEGER REFERENCES bud(id) ON DELETE CASCADE, trip_date DATE NOT NULL, seat_number INTEGER UNIQUE, first_name VARCAR(100), last_name VARCAR(100), email VARCAR(100) NOT NULL, created_on DATE NOT NULL, PRIMARY KEY (id, trip_id, user_id)`;

     pool.query(bookingCreateQuery)
        .then((res)=>{
            console.log(res)
            pool.end();
        })
        .catch(err=>{
            console.log(err)
            pool.end();
        });
 }; // booking end

/**
 * Drop User Table
 */

 const dropUserTable = () => {
    const usersDropQuery = 'DROP TABLE IF EXISTS users';
    pool.query(usersDropQuery)
      .then((res) => {
        console.log(res);
        pool.end();
      })
      .catch((err) => {
        console.log(err);
        pool.end();
      });
  };

/**
 * Drop Bus Table
 */
 const dropBusTable = () => {
    const busDropQuery = 'DROP TABLE IF EXISTS bus';
    pool.query(busDropQuery)
      .then((res) => {
        console.log(res);
        pool.end();
      })
      .catch((err) => {
        console.log(err);
        pool.end();
      });
  };

/**
 * Drop Trip Table
 */
 const dropTripTable = () => {
    const tripDropQuery = 'DROP TABLE IF EXISTS trip';
    pool.query(tripDropQuery)
      .then((res) => {
        console.log(res);
        pool.end();
      })
      .catch((err) => {
        console.log(err);
        pool.end();
      });
  };

/**
 * Drop Booking Table
 */
 const dropBookingTable = () => {
    const bookingDropQuery = 'DROP TABLE IF EXISTS booking';
    pool.query(bookingDropQuery)
      .then((res) => {
        console.log(res);
        pool.end();
      })
      .catch((err) => {
        console.log(err);
        pool.end();
      });
  };

/**
 * Create All Tables
 */

  const createAllTables = () => {
    createUserTable();
    createBusTable();
    createTripTable();
    createBookingTable();
  }