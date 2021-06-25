'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsToMany(models.Review, {through: models.ProductReview, foreignKey: 'productId'})
    }

    formatRupiah = (money) => {
        return new Intl.NumberFormat('id-ID',
          { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }
        ).format(money);
     }

  };
  Product.init({
    name_product: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Nama produk harus diisi"
        }
      }
    },
    brand_product: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Brand tidak boleh kosong"
        }
      }
    },
    retail_price: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "Harga saat beli harus diisi"
        }
      }
    },
    photo: {
      type : DataTypes.STRING(1234),
      validate: {
        customImgFormat(value) {
          let format = value.slice(value.length-4)
          if (format !== ".jpg" && format !== ".png") {
            throw "format link gambar salah! (bukan.jpg atau .png)"
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};