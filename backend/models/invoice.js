const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Invoice = sequelize.define('invoice', {
    no_invoice: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    no_refid: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    no_trxid: {
        type: DataTypes.TEXT,
    },
    produk: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    item: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    harga: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status_transaksi: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status_pembayaran: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    username: {
        type: DataTypes.TEXT,
    },
    userid: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    userserver: {
        type: DataTypes.TEXT,
    },
    payment_name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    payment_code: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    payment_grup: {
        type: DataTypes.TEXT
    },
    nomor_whatsapp: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    response_tripay: {
        type: DataTypes.TEXT,
        allowNull: true
    },
	kode_game: {
		type: DataTypes.TEXT,
	},
	kategori: {
		type: DataTypes.TEXT,
	},
    pesan: {
        type: DataTypes.TEXT
    }
});

module.exports = Invoice;
