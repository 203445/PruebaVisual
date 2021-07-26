const mysql = require('mysql2');
require('dotenv').config();
process.env.host=localStorage.getItem('host'); 
if(process.env.host == '' || process.env.host == 'null'){
    const hostTm= document.getElementById('host').value;
    if(hostTm != '' ){
        localStorage.setItem('host',hostTm);
        process.env.host=localStorage.getItem('host'); 
        if (hostTm == 'localhost') {
            document.getElementById('txtData').innerHTML = 'Conexion Exitosa';
            location.href="./vista2.html";
            
        }
        
    }
}
process.env.host=localStorage.getItem('host'); 

const host =process.env.host;
const user = process.env.user//document.getElementById('user').value;
const password = process.env.password//document.getElementById('password').value;
const database = process.env.database//document.getElementById('database').value;
const port = process.env.port//document.getElementById('port').value;

const connection = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database,
    port: port
});  
// Conectamos al manejador de base de datos 
connection.connect(function (err) {
    if (err) {  
        // console.log(err.code);
        // console.log(err.fatal);
        // console.log("error");   
        document.getElementById('txtData').innerHTML = err.code + err.fatal+ 'Conexión fallida';
    } else {
        //document.getElementById('txtData').innerHTML = 'Conexion Exitosa';
    }
});    

module.exports = connection //Exportamos la conexión para que cualquier clase la pueda requerir