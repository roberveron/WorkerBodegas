module.exports = (local, data = null) => {
  const refs = {
    userAll: () => '/users',
    userOne: (iduser) => `/users/${iduser}`,
    userAvatar: (iduser) => `/users/${iduser}/avatar`,
    userPrivateOne: (iduser) => `/userPrivateData/${iduser}`,
    promocionesAll: () => '/promociones',
    promocionesUserAll: (uid) => `/promocionesUser/${uid}`,
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