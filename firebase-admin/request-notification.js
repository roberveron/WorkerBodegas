'use strict'

const refService = require('./ref-service');
const pushNotificationService = require('./push-notification-service');
const moment = require('moment');

module.exports = (admin) => {
  var db = admin.database();
  var ref = db.ref(refService('requestNotificationAll'));

  ref.on('child_added', (ss) => {
    const requestData = ss.val();
    const userId = ss.key
    const typpe = requestData.type
    console.log(`Request de notificación del usuario ${userId} tipo: ${requestData.type}`);
    
    //realizar todas las comprobaciones de seguridad para garantizar la integridad de la acción

    createSiteNotification(db, requestData, userId,typpe);
    pushNotificationService.createPushNotification(db, requestData, userId);
    deleteNotificationRequest(db, userId);
  });

}


function createSiteNotification(db, requestData, userId,typpe) {
    
    if(typpe == "promocion_fav"){
      var notifObject = {
        user: userId,
        text: 'Se suscribio a una promocion',
        link: `/promocion/${requestData.userId}/${requestData.slug}`,
        timestamp: moment().format('X'),
      }
    } else {
      var notifObject = {
        user: userId,
        text: 'Se suscribio a una oferta',
        link: `/oferta/${requestData.userId}/${requestData.slug}`,
        timestamp: moment().format('X'),
    }
  }
  var ref = db.ref(refService('notificationsUser', requestData.userId));
  ref.push(notifObject);
}

function deleteNotificationRequest(db, uid) {
  var ref = db.ref(refService('requestNotificationAll')).child(uid);
  ref.remove();
}