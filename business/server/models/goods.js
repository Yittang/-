var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var productSchema = new Schema({
	"productId": String,
	"productName": String,
	"checked": String,
	"salePrice": Number,
	'productNum': Number,
	"productImage": String
});

module.exports = mongoose.model('Good', productSchema);