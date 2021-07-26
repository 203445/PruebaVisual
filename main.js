if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
    
  }
  require('dotenv').config();
//   localStorage.setItem('llave', 'valor');
  console.log(localStorage.getItem('llave'));
 
var con;
function sendData() {
    const nameData = document.getElementById('nameData').value;
    const passw = document.getElementById('passw').value;
    
    //localStorage.setItem('host','');
    process.env.host=localStorage.getItem('host'); 
    if (nameData == 'Alex' && passw == 'chochito') {
        
        if (process.env.host != 'null' && process.env.host != ''){ 
            location.href="./vista2.html";
        }else{
            location.href="./vista1.html";
        }
    
    } else{
        document.getElementById("msj").innerHTML ="Usuario o contraseña incorrecta";
        document.getElementById("nameData").value = "";
        document.getElementById("passw").value = "";
    }
    
}
function sendParams() {
    con = require('./connect');
    localStorage.setItem('con',con);
    location.href="./vista1.html";
    
}

function addData() {
    // Crear query para INSERT, SELECT, UPDATE O DELETE

    con = require('./connect');
    const nombre = document.getElementById('nombre').value;
    const ap_pat = document.getElementById('ap_pat').value;
    const ap_mat = document.getElementById('ap_mat').value;
    const edad = document.getElementById('edad').value;

    $query = `INSERT INTO persona (nombre, ap_pat, ap_mat, edad) VALUES ("${nombre}","${ap_pat}","${ap_mat}","${edad}" )`;

    con.query($query, function (err, rows, fields) {

        if (err) {
            console.log('Error Query');
            console.log(err);
            return;
        }
        console.log("Query exitoso", rows);
    });
    listarData();
    limpiaCampo()
    // con.end(function () {
    //     // Conexión Finalizada 
    // });
   
    // Input data conection database
} 

function listarData(){
    con = require('./connect');
    var tableBody="";

    $query = 'SELECT * FROM persona';

    con.query( $query, function(err, results) {
      if (err) throw err;

      console.log(results);
               //console.log('Post Titles: ', rows[3]);

        for (i = 0; i < results.length; i++) {
        tableBody += '<tr>';
        tableBody += '  <td>' + results[i].idnombre + '</td>';
        tableBody += '  <td>' + results[i].nombre + '</td>';
        tableBody += '  <td>' + results[i].ap_pat + '</td>';
        tableBody += '  <td>' + results[i].ap_mat + '</td>';
        tableBody += '  <td>' + results[i].edad + '</td>';
        tableBody += '</tr>';
        }
        document.getElementById('tablita').innerHTML = tableBody;

    });

    // con.end(() => {     
        
    // });
    
}

function limpiaCampo() {
    document.getElementById("nombre").value = "";
    document.getElementById("edad").value = "";
    document.getElementById("ap_pat").value = "";
    document.getElementById("ap_mat").value = "";
}
     


