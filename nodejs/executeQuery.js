const dbConn = require('./dbConnection')

module.exports = async  (query) => {
    let queryResults = null;

    console.log('Opening DB Connection')
    let pool = await dbConn.openPool()

    try {
        pool.query(query, (error, res) =>{
            if(error){
                console.log('DB Lambda Layer - executeQuery.js - ERROR::: ', error)
                return [error, null]
            }
            else{
                queryResults = res
            }
        })

    } catch (error){
        console.log('DB Lambda Layer - executeQuery.js - ERROR::: ', error)
        return [error, null]

    } finally {
        console.log('Closing Pool...')
        await pool.end();
        console.log("***Closed DB Pool Connection***")
        return [null, queryResults]
    }

};

