var mysql = require('mysql');
var conexion= mysql.createConnection({
    host : 'localhost',
    database : 'hectorva_db',
    user : 'hectorva_user01',
    password : 'codname47',
});

conexion.connect(function(err) {
    if (err) {
        console.error('Error de conexion: ' + err.stack);
        return;
    }
    console.log('Conectado con el identificador ' + conexion.threadId);
});

conexion.query('SELECT * FROM FrasesMotiv WHERE id = 1', function(error, results, fields){
    if(error)
        throw error;

    results.forEach(result => {
        console.log(result);
    });
});

conexion.end();