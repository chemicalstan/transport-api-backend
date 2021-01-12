const pool = require('./pool')


module.exports =  {
    /**
   * DB Query
   * @param {object} Query
   * @param {object} Values
   * @returns {object} DB Response Object
   */

   query(queryText, params){
       return new Promise((resolve, reject)=>{
            pool.query(queryText, params)
                .then(res=>{
                    resolve(res);
                })
                .catch(err=>{
                    reject(err);
                })
       });
   }
}
