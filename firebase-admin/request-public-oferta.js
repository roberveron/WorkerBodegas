'use strict'

const refService = require('./ref-service');

module.exports = (admin) => {
  var db = admin.database();
  var ref = db.ref(refService('requestPublicofertaAll'));

ref.on('child_added', (ss) => {
 const userId = ss.key;
 const requestData = ss.val();

  console.log(`Request del usuario ${userId} de hacer una oferta pública: ${requestData.slug}`);

 let refofertas = db.ref(refService('ofertasAll'));
    let refNewoferta = refofertas.push();
    refNewoferta.set({
      "userId": userId,
      "slug": requestData.slug
    })
      .then(() => {
        console.log('creado un registro en ofertas globales');
        anotarofertaPublico(db, userId, requestData.slug, refNewoferta.key);
        borrarRequest(db, userId);
      })
 });
}

function anotarofertaPublico(db, userId, slug, key) {
  const data = {
    isPublic: true,
    publicId: key
  }
  let ref = db.ref(refService('ofertasUserAll', userId)).child(slug);
  ref.update(data)
    .then(() => {
      console.log('Anotado como publico')
    });
}


function borrarRequest(db, userId) {
  let ref = db.ref(refService('requestPublicofertaAll')).child(userId);
  ref.remove()
    .then(() => {
      console.log('borrado el request');
    });
}