const axios = require('axios');
const FormData = require('form-data');
const crypto = require('crypto');
require('dotenv').config();

const API_URL = process.env.API_URL;
const vip_ApiId = process.env.VIP_API_ID;
const vip_APiKey = process.env.VIP_API_KEY;

const getOrder = async (code, id, zone, tipe) => {
    var sign = crypto.createHash('md5')
        .update(vip_ApiId + vip_APiKey)
        .digest('hex');
        
    var data = new FormData();
    data.append('key', vip_APiKey);
    data.append('sign', sign);
    data.append('type', 'order');
    data.append('service', code);
    data.append('data_no', id);
    data.append('data_zone', zone);
    var config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${API_URL}/${tipe}`,
        headers: {
            ...data.getHeaders()
        },
        data: data
    };

    try {
        const response = await axios(config);
        return {
            status: true,
            data: response.data
        };
    } catch (error) {
        console.error("Error calling API", error);
        return {
            status: false,
            data: error
        };
    }
};

module.exports = getOrder
