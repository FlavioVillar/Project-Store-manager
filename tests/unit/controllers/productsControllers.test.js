const sinon = require("sinon");
const { expect } = require("chai");

const productService = require("../../../services/productService");
const productController = require("../../../controllers/productController");

const allProductsResponse = [
  { id: 1, name: "Martelo de Thor" },
  { id: 2, name: "Traje de encolhimento" },
  { id: 3, name: "Escudo do Capitão América" },
];

describe('1 - Teste controller "products"', () => {
  describe('Teste do endpoint para listar produtos - get "All"', async () => {
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

    it("Deve retornar um status 200 - OK", async () => {
      await productController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.true;
    });

    it("Deve retornar um json", async () => {
      await productController.getAll(request, response);
      expect(response.json.calledWith({})).to.be.true;
    });
  });

  describe('Teste do endpoint para listar Produtos - get "By Id" - Quando o payload é valido', async () => {
    const response = {};
    const request = {};

    before(async () => {
      request.params = "1";
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      await sinon.stub(productService, "getById").resolves(allProductsResponse[0]);
    });

    after(async () => {
      await productService.getById.restore();
    });

    it("Deve retornar um status 200", async () => {
      await productController.getById(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it("Deve retornar o produto correto", async () => {
      await productController.getById(request, response);
      expect(response.json.calledWith(allProductsResponse[0])).to.be.equal(
        true
      );
    });
  });

  describe("Teste do endpoint para cadastro Produtos - post", async () => {
    const response = {};
    const request = {};

    before(async () => {
      request.body = {
        name: "Martelo de Thor",
      };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      await sinon.stub(productService, "add").resolves(allProductsResponse[0]);
    });

    after(async () => {
      await productService.add.restore();
    });

    it("Deve retornar um status 201 - CREATED", async () => {
      await productController.add(request, response);
      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it("Deve retornar o produto correto", async () => {
      await productController.add(request, response);
      expect(response.json.calledWith(allProductsResponse[0])).to.be.equal(
        true
      );
    });
  });

  describe("Teste do endpoint para atualizar Produtos - put", async () => {
    const response = {};
    const request = {};
    
    before(async () => {
      request.params = { id: 1 };
      request.body = { name: "Machado do Thor Stormbreaker" };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      await sinon
        .stub(productService, "update")
        .resolves( allProductsResponse[0] );
    });

    after(async () => {
      await productService.update.restore();
    });

    it("Deve retornar um status 200 - OK", async () => {
      await productController.update(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });

  describe("Teste do endpoint para deletar Produtos - delete", async () => {
    const response = {};
    const request = {};
    
    before(async () => {
      request.params = { id: 1 };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      response.send = sinon.stub().returns();

      await sinon.stub(productService, "exclude").resolves(1);
    });

    after(async () => {
      await productService.exclude.restore();
    });

    it("Deve retornar um status 204", async () => {
      await productController.exclude(request, response);
      expect(response.status.calledWith(204)).to.be.equal(true);
    });
  });    
});