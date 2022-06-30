const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../helpers/connection');
const productsModels = require('../../../models/productModel');

describe('Testa lista os produtos na base de dados', () => {

  const payloadProduct = [{
    id: 1,
    name: 'Product 1',
  }]
  
  before(async () => {
    
    sinon.stub(connection, "execute").returns(payloadProduct);
  }
  )

  after(async () => {
    connection.execute.restore();
  }
  )
 
  describe('Teste da lista os produtos', () => {
    it('Deve retornar um Objeto', async () => {
      const result = await productsModels.getAll();
      expect(result).to.be.a('object');
    }
    );

    it('Testa as propriedades do objeto', async () => {
      const result = await productsModels.getAll();
      expect(result).to.have.property('id');
      expect(result).to.have.property('name');
    }
    );

    it('Deve retornar um produto pelo id', async () => {
      const result = await productsModels.getById(1);
      expect(result.name).to.be.equal("Product 1");
    }
    );

  }
  )
}
)


