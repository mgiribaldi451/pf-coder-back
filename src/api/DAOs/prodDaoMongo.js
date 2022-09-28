const ContainerMongo = require("./containerDao");
const productModel = require("../models/productModel");

class ProductDaoMongo extends ContainerMongo {
  constructor(a) {
    super(a);
    this.id = 0;
    this.modelProd = productModel;
    //this.checkId()
  }

  
  async getProdById(id) {
    if (id) {
      let elemById = this.getById(id, "productos");

      return elemById;
    } else {
      return "{Product: Product not found}";
    }
  }

  async saveProd(productos) {
    if (productos) {
      this.save(productos, "productos");

      return productos;
    } else {
      return "Product Not save";
    }
  }

  //   updateProd(productos, id){
  //     if(productos) {
  //       console.log(productos)
  //       this.update(productos, id)
  //       return productos
  //     } else {
  //       return 'Not updated'
  //     }
  //   }
}

module.exports = { ProductDaoMongo };
