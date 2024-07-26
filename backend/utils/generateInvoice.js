   function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    const charactersLength = characters.length;
  
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  
    return result;
  }
  
  function generateInvoice(prefix, length) {
    const randomString = generateRandomString(length);
    const timestamp = Date.now().toString(36); 

    return `${prefix}${timestamp.toUpperCase()}${randomString}`;
}

module.exports = generateInvoice