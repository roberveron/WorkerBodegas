String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

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
        publicarPromocionCiudad(db, userId, requestData.slug);
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

function publicarPromocionCiudad(db, userId, slug){
 let data = {
   uid: userId, 
   slug: slug
  }; 
  
 let ref = db.ref(refService('promocionesUserOne', data));
  ref.once('value', ss => {
   const datospromocion = ss.val();
   datospromocion.timestamp = null;
   datospromocion.texto = null;
   datospromocion.publicId = null;
   datospromocion.isPublic = null;
   datospromocion.downloadURL = '"'+datospromocion.downloadURL+'"';
   datospromocion.name = '"'+datospromocion.name+'"';
   datospromocion.precio = '"'+datospromocion.precio+'"';
   datospromocion.stock = '"'+datospromocion.stock+'"';
   datospromocion.description = '"'+datospromocion.description+'"';
   datospromocion.userId = userId;
   obtenerCiudadUsuario(db, userId)
   .then(function(ciudadBodega){
      let refCiudad = db.ref(refService('ciudadOnePromocionesAndroid', ciudadBodega)).child(slug);
      refCiudad.set (datospromocion)
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
