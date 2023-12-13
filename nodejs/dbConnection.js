let path = require('path')
let fs = require('fs')
let certPath = path.join(__dirname,"./certs")
const {Pool} = require("pg")

require('dotenv').config();

let getRDSCertName =  async function(certPath){
        
    return await fs.promises.readdir(certPath).then(files =>{
        for(let file of files){
            
            if(path.extname(file) === ".pem"){
                console.log('Got cert file:', file)
                return file
            }
            else throw Error('FILE NOT FOUND!')
        }
    })
}

module.exports.openPool = async () =>{

    let rdsCertName = await getRDSCertName(certPath)
    
    console.log('Connecting to db...')
    
    const pool = new Pool({
        host: process.env.DB_HOST,
        port: 5432,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        ssl:{
            ca: fs.readFileSync(path.join(__dirname, './certs/',  rdsCertName))
        }
    })

    console.log('Connected!')

    return pool
} 



// zip for lambda layers - run command from within nodejs folder
// zip -r ../nodejs.zip .   