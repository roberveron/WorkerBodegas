'use strict'

const refService = require('./ref-service.js');

var FCM = require('fcm-node');
var serverKey = 'AAAAINxkeiE:APA91bGD5vtpzcUKafpReWavmhbx8dnj6NnI2qLL9lXIOYloe3WQLmHH-iYUJ1Rlf990Is0QjY9GuD8jhrHDU0wLB7Zhw9HwdLzOdnTnboTydtJ8dbBbmo1PULnh10tnzq2XoblSc72f';

module.exports = {
  createPushNotification
}

function createPushNotification(db, requestData, fromUser) {
  var toUser = requestData.userId;
  const typpe = requestData.type
  console.log('recupero el token de usuario ', toUser)
  recuperandoToken(db, toUser)
    .then(function(token) {
      enviarNotificacionPush(token, requestData, fromUser);
    })
    .catch(function(err) {
      console.log(err);
    })
}

function enviarNotificacionPush(token, requestData, fromUser,typpe) {
  var fcm = new FCM(serverKey);

  if(typpe == "promocion_fav"){
    var message = {
    to: token,
    notification: {
      title: 'Te han marcado una promocion como favorito', 
      body: 'Nombre:' + requestData.slug + ' (clic para ver)',
      icon: `http://localhost:3001/img/avatar/${fromUser}.jpg`,
      "click_action": `http://localhost:8080/promocion/${requestData.userId}/${requestData.slug}`
    }
   };
    } else {
     var message = {
    to: token,

    notification: {
      title: 'Te han marcado una oferta como favorito', 
      body: 'Nombre:' + requestData.slug + ' (clic para ver)',
      icon: `http://localhost:3001/img/avatar/${fromUser}.jpg`,
      "click_action": `http://localhost:8080/oferta/${requestData.userId}/${requestData.slug}`
    }
   };
  }
  

  fcm.send(message, function(err, response){
    if (err) {
        console.log("Intenté enviar notificaciones sin éxito a ", err);
    } else {
        console.log("Notificaciones enviadas: ", response);
    }
  });
}

function recuperandoToken(db, usuario) {
  return new Promise( (resolve, reject) => {
    let ref = db.ref(refService('pushNotifUserToken', usuario));
    ref.once('value', function(ss) {
      let token = ss.val();
      if(token) {
        resolve(token);
      } else {
        reject('No tenemos el token del usuario ' + usuario)
      }
    });
  });
}