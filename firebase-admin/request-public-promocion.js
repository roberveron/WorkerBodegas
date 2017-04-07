'use strict'

const refService = require('./ref-service');

module.exports = (admin) => {
  var db = admin.database();
  var ref = db.ref(refService('requestPublicpromocionAll'));

ref.on('child_added', (ss) => {
 const userId = ss.key;
 const requestData = ss.val();

  console.log(`Request del usuario ${userId} de hacer una promocion pública: ${requestData.slug}`);


 let refPromociones = db.ref(refService('promocionesAll'));
    let refNewPromocion = refPromociones.push();
    refNewPromocion.set({
      "userId": userId,
      "slug": requestData.slug
    })
      .then(() => {
        console.log('creado un registro en promociones globales');
        anotarPromocionPublico(db, userId, requestData.slug, refNewPromocion.key);
        borrarRequest(db, userId);
      })
 });
}

function anotarPromocionPublico(db, userId, slug, key) {
  const data = {
    isPublic: true,
    publicId: key
  }
  let ref = db.ref(refService('promocionesUserAll', userId)).child(slug);
  ref.update(data)
    .then(() => {
      console.log('Anotado como publico')
    });
}


function borrarRequest(db, userId) {
  let ref = db.ref(refService('requestPublicpromocionAll')).child(userId);
  ref.remove()
    .then(() => {
      console.log('borrado el request');
    });
}