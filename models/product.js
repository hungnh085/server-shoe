const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    code:{
        type: String,
        require: true,
        unique: true
    },
    sz39:{
        type: Number,
    },
    sz40:{
        type: Number,
    },
    sz41:{
        type: Number,
    },
    sz42:{
        type: Number,
    },
    sz43:{
        type: Number,
    },
    price:{
        type: Number,
        require: true,
    },
    priceStock:{
        type: Number,
    },

})

module.exports = mongoose.model('product', productSchema);