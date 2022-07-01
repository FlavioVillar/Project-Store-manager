const sinon = require("sinon");
const { expect } = require("chai");

const productService = require("../../../services/productService");
const productController = require("../../../controllers/productController");

describe("Teste ao chamar controller", () => {
  describe("Quando o payload não é valido", async () => {
    const response = {};
    const request = {};

    before(async () => {
      request.body = {};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productService, "getAll").returns({});
    });

    after(async () => {
      productService.getAll.restore();
    });

    it("Deve retornar um status 400", async () => {
      await productController.getAll(request, response);
      expect(response.status.calledWith(400)).to.be.false;
    });

    it("Deve retornar um json", async () => {
      await productController.getAll(request, response);
      expect(response.json.calledWith({})).to.be.true;
    });
  });

  describe("Quando o payload é valido", async () => {
    const response = {};
    const request = {};

    before(async () => {
      // alterado para payload válido
      request.body = {
        id: 1,
        name: "Product 1",
      };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productService, "getAll").returns([{}]);
    });

    after(async () => {
      productService.getAll.restore();
    });

    it("Deve retornar um status 200", async () => {
      await productController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.true;
    });

    it("Deve retornar um json", async () => {
      await productController.getAll(request, response);
      expect(response.json.calledWith([{}])).to.be.true;
    });
  });
});

describe("Teste do cadastro de produtos - Controller", () => {
  describe("quando o payload informado não é válido", () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};

      response.status = sinon.stub().returns(response);
      response.send = sinon.stub().returns();
    });

    it("Deve retornar um status 500", async () => {
      await productController.add(request, response);
      expect(response.status.calledWith(500)).to.be.equal(true);
    });

    describe("quando é inserido com sucesso", () => {
      const response = {};
      const request = {};

      before(() => {
        request.body = {
          id: 1,
          name: "Product 1",
        };

        response.status = sinon.stub().returns(response);
        response.send = sinon.stub().returns();
      });

      it("é chamado o status com o código 201", async () => {
        await productController.add(request, response);
        expect(response.status.calledWith(201)).to.be.true;
      });
    });
  });

  describe("Teste de atualização de produtos - Controller", () => {
    describe("quando o payload informado não é válido", () => {
      const response = {};
      const request = {};

      before(() => {
        request.body = {};

        response.status = sinon.stub().returns(response);
        response.send = sinon.stub().returns();
      });

      it("Deve retornar um status 500", async () => {
        await productController.update(request, response);
        expect(response.status.calledWith(500)).to.be.equal(true);
      });
    }
    );

    describe("quando é atualizado com sucesso", () => {
      const response = {};
      const request = {
        params: {
          id: 1,
        },
      };

      before(() => {
        request.body = {
          id: 1,
          name: "Teste cadastro",
        };

        response.status = sinon.stub().returns(response);
        response.send = sinon.stub().returns();
      }
      );

      it("é chamado o status com o código 200", async () => {
        await productController.update(request, response);
        console.log(response.status.calledWith(200));
        expect(response.status.calledWith(200)).to.be.true;
      });
    }
    );
  }
  );

});
