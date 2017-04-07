
var admin = require('firebase-admin');


admin.initializeApp({
  credential: admin.credential.cert("./bodegaspy-aba4e-firebase-adminsdk-pkdao-fa39010874.json"),
  databaseURL: "https://bodegaspy-aba4e.firebaseio.com"
/*  databaseAuthVariableOverride: {
    uid: "firebase-worker"
  }*/ 
});

/*worker gestion de altas de usuario*/
require('./firebase-admin/gestion-registro')(admin);

require('./firebase-admin/request-public-promocion')(admin);
require('./firebase-admin/request-public-oferta')(admin);