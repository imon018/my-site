export const getSiteConfig = (settings = {}) => {

  return {

    appName:
      settings.storeName ||
      "DREAM MODE",


    email:
      settings.email ||
      "",


    phone:
      settings.phone ||
      "",


    address:
      settings.address ||
      "",


    facebook:
      settings.facebook ||
      "",


    whatsapp:
      settings.whatsapp ||
      "",


    logo:
      settings.logoUrl ||
      "",


  };

};
