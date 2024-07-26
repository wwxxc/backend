const axios = require('axios');
const FormData = require('form-data');
const crypto = require('crypto');
require('dotenv').config();

const API_URL = process.env.API_URL;
const vip_ApiId = process.env.VIP_API_ID;
const vip_APiKey = process.env.VIP_API_KEY;

const getServices = async (filter_type, filter_value, tipe) => {
    var sign = crypto.createHash('md5')
        .update(vip_ApiId + vip_APiKey)
        .digest('hex');
        
    var data = new FormData();
    data.append('key', vip_APiKey);
    data.append('sign', sign);
    data.append('type', 'services');
    data.append('filter_type', filter_type);
    data.append('filter_value', filter_value);
    data.append('filter_status', 'available');
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
        const filteredData = response.data.data.filter(item => item.price.basic <= 30000 && item.price.basic > 1000);
        const formattedData = filteredData.map(item => ({
            ...item,
            normal_price: {
                ...item.price,
                basic: item.price.basic,
                premium: item.price.premium,
                special: item.price.special
            },
            price: {
                ...item.price,
                basic: item.price.basic.toLocaleString('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    maximumFractionDigits: 0
                }),
                premium: item.price.premium.toLocaleString('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    maximumFractionDigits: 0
                }),
                special: item.price.special.toLocaleString('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    maximumFractionDigits: 0
                })
            }
        }));
        return {
            status: true,
            data: formattedData
        };
    } catch (error) {
        console.error("Error calling API", error);
        return {
            status: false,
            data: error
        };
    }
};

module.exports = getServices
