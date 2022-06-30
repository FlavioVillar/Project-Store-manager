const sinon = require("sinon");
const { expect } = require("chai");

const productModel = require("../../../models/productModel");
const productServices = require("../../../services/productService");

describe('Testa lista os produtos na base de dados', () => {
  const payloadProduct = 
    {
      id: 1,
      name: "Product 1",
    };

  before(async () => {
    sinon.stub(productModel, "getAll").returns(payloadProduct);
  }
  )

  after(async () => {
    productModel.getAll.restore();
  }
  )

  describe('Teste da lista os produtos', () => {
    it('Deve retornar um Objeto', async () => {
      const result = await productServices.getAll();
      expect(result).to.be.a('object');
    }
    );

    it('Testa as propriedades do objeto', async () => {
      const result = await productServices.getAll();
      expect(result).to.have.property('id');
      expect(result).to.have.property('name');
    }
    );

    // it('Deve retornar um produto pelo id', async () => {
    //   const result = await productServices.getById();
    //   expect(result).to.be.a('object');
    // }
    // );



  }
  )
}
)
