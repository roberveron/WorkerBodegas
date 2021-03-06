module.exports = (local, data = null) => {
  const refs = {
    userAll: () => '/users',
    userOne: (iduser) => `/users/${iduser}`,
    ciudadOnePromocionesAndroid: (ciudadBodega) => `/ciudades/${ciudadBodega}/promocionesAndroid`,
    ciudadOneOfertasAndroid: (ciudadBodega) => `/ciudades/${ciudadBodega}/ofertasAndroid`,
    userAvatar: (iduser) => `/users/${iduser}/avatar`,
    userPrivateOne: (iduser) => `/userPrivateData/${iduser}`,
    promocionesAll: () => '/promociones',
    promocionesUserAll: (uid) => `/promocionesUser/${uid}`,
    promocionesUserOne:(data) => `/promocionesUser/${data.uid}/${data.slug}`,
    ofertasUserOne:(data) => `/ofertasUser/${data.uid}/${data.slug}`,
    ofertasAll: () => '/ofertas',
    ofertasUserAll: (uid) => `/ofertasUser/${uid}`,
    requestPublicpromocionAll: () => '/requestPublicpromocion',
    requestPrivatepromocionAll: () => '/requestPrivatepromocion',
    requestPublicofertaAll: () => '/requestPublicoferta',
    requestPrivateofertaAll: () => '/requestPrivateoferta',
    requestTwitterShareAll: () => '/twitter/shareRequest',
    requestTwitterResponseAll: () => '/twitter/shareResponse',
    requestNotificationAll: () => '/notificationRequest',
    notificationsUser: (uid) => `/notificationsUser/${uid}`,
    pushNotifUserToken: (iduser) => `/userTokenPush/${iduser}/token`,
    userCredentials: (uid) => `/userPrivateData/${uid}/credential`,
    promocionesUserFavsOne: (data) => `/promocionesUserFavs/${data.userId}/${data.slug}`,
    ofertasUserFavsOne: (data) => `/ofertasUserFavs/${data.userId}/${data.slug}`,
  }
  return refs[local](data);
  
}