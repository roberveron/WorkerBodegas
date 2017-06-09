String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

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
        publicarOfertaCiudad(db, userId, requestData.slug);
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

function publicarOfertaCiudad(db, userId, slug){
 let data = {
   uid: userId, 
   slug: slug
  }; 
  
 let ref = db.ref(refService('ofertasUserOne', data));
  ref.once('value', ss => {
   const datosoferta = ss.val();
   datosoferta.timestamp = null;
   datosoferta.texto = null;
   datosoferta.publicId = null;
   datosoferta.isPublic = null;
   datosoferta.downloadURL = '"'+datosoferta.downloadURL+'"';
   datosoferta.name = '"'+datosoferta.name+'"';
   datosoferta.precio = '"'+datosoferta.precio+'"';
   datosoferta.views = "0";
   datosoferta.description = '"'+datosoferta.description+'"';
   datosoferta.userId = userId;
   obtenerCiudadUsuario(db, userId)
   .then(function(ciudadBodega){
      let refCiudad = db.ref(refService('ciudadOneOfertasAndroid', ciudadBodega)).child(slug);
      refCiudad.set (datosoferta)
    })
    .catch(function(err){
      console.log(err);
    })
  })
}

function obtenerCiudadUsuario(db, userId){
  return new Promise (function(resolve,reject){
      let ref = db.ref(refService('userOne',userId)).child('ciudad');
      ref.once('value', ss => {
          const ciudadBodega = ss.val();

          resolve (ciudadBodega.replaceAll("\"", ""));
      })
  })
}