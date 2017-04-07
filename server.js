/*var common = require('./modules/common')
var config = common.config();
*/

//iniciamos express
var express = require('express');
var app = express();

//configuro middleware para los archivos estáticos
const middleware = require('./modules/middleware');
middleware.useMiddleware(app, express);

//configuro las rutas
/*require('./rutas')(app);*/

//escuchar en el puerto indicado
app.listen(3001, function() {
  console.log('Servidor funcionando en http://localhost:' + 3001);
});

