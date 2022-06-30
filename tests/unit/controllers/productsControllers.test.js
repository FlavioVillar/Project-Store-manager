const sinon = require("sinon");
const { expect } = require("chai");

const productService = require("../../../services/productService");
const productController = require("../../../controllers/productController");

describe('Teste ao chamar controller', () => {
  describe('Quando o payload não é valido', async () => {
    const response = {};
    const request = {};

    before(async () => {
      request.body = {};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productService, "getAll").returns({});
    }
    )

    after(async () => {
      productService.getAll.restore();
    }
    )

    it('Deve retornar um status 400', async () => {
      await productController.getAll(request, response);
      expect(response.status.calledWith(400)).to.be.false;
    }
    );

    it('Deve retornar um json', async () => {
      await productController.getAll(request, response);
      expect(response.json.calledWith({})).to.be.true;
    }
    );
  }
  );

  describe('Quando o payload é valido', async () => {
    const response = {};
    const request = {};

    before(async () => {
      request.body = {};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productService, "getAll").returns([{}]);
    }
    )

    after(async () => {
      productService.getAll.restore();
    }
    )

    it('Deve retornar um status 200', async () => {
      await productController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.true;
    }
    );

    it('Deve retornar um json', async () => {
      await productController.getAll(request, response);
      expect(response.json.calledWith([{}])).to.be.true;
    }
    );
  }
  );
}
);



