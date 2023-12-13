const dbConn = require('./dbConnection')

module.exports = async (sqlQuery, valueObj) => {
    // 'sqlQuery' is function that returns a string: takes two arrays: keys, placeholders

    let keys = Object.keys(valueObj)
    let values = Object.values(valueObj)
    let placeholders = keys.map((_, i) => `$${i + 1}`);
    let query = sqlQuery(keys, placeholders)
    let queryResults = null;

    
    console.log('Creating Pool...')
    let pool = await dbConn.openPool()

    try {
        console.log('Executing query...')
        pool.query(query, values, (error, res) =>{
            if(error){
                console.log('DB Lambda Layer - executeQuery.js - ERROR::: ', error)
                return [error, null]
            }
            else{
                queryResults = res
            }
        })

    } finally {
        console.log('Closing Pool...')
        await pool.end()
        console.log("***Closed***")
        return [null, queryResults]
    }

};

