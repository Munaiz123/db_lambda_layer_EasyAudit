const pool = require('./dbConnection')

module.exports.executeQuery = async (query) => {
    let queryResults = null;

    console.log('Opening DB Connection')
    try {
        const response = await pool.query(query);
        queryResults = response
    } catch (error){
        console.log('DB Lambda Layer - executeQuery.js - ERROR::: ', error)
        return [error, null]

    } finally {
        pool.end();
        console.log("***Closed DB Pool Connection***")
        return [null, queryResults]
    }

};

