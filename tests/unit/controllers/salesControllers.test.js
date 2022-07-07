const sinon = require("sinon");
const { expect } = require("chai");

const salesController = require("../../../controllers/salesController");
const salesService = require("../../../services/salesService");

describe('4 - Teste ao chamar controller em "sales"', () => {
  describe("Teste do endpoint para listar vendas - get 'All'", async () => {
    const response = {};
    const request = {};
    const next = sinon.spy();

    before(async () => {
      request.body = {};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesService, "getAll").returns({});
    });

    after(async () => {
      salesService.getAll.restore();
    });

    it("Deve retornar um status 200 - OK", async () => {
      await salesController.getAll(request, response, next);
      expect(response.status.calledWith(200)).to.be.true;
    });

    it("Deve retornar um json", async () => {
      await salesController.getAll(request, response, next);
      expect(response.json.calledWith({})).to.be.true;
    });
  });

  describe("Teste do endpoint para listar vendas - get 'By Id' - Quando o payload é valido", async () => {
    const allSalesResponse = [
      {
        saleId: 1,
        date: "2021-09-09T04:54:29.000Z",
        productId: 1,
        quantity: 2,
      },
      {
        saleId: 1,
        date: "2021-09-09T04:54:54.000Z",
        productId: 2,
        quantity: 2,
      },
    ];
    const response = {};
    const request = {};
    const next = sinon.spy();

    before(async () => {
      request.params = "1";
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      await sinon.stub(salesService, "getById").resolves(allSalesResponse[0]);
    });

    after(async () => {
      await salesService.getById.restore();
    });

    it("Deve retornar um status 200", async () => {
      await salesController.getById(request, response, next);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it("Deve retornar o produto correto", async () => {
      await salesController.getById(request, response, next);
      expect(response.json.calledWith(allSalesResponse[0])).to.be.equal(true);
    });
  });

  describe("Teste do endpoint para adicionar uma venda - post", async () => {
    const response = {};
    const request = {};
    const MOCK_SALE = [
      { productId: 1, quantity: 1 },
      { productId: 2, quantity: 5 },
    ];

    before(async () => {
      request.body = MOCK_SALE;
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      await sinon.stub(salesService, "addSale").resolves(MOCK_SALE);
    });

    after(async () => {
      await salesService.addSale.restore();
    });

    it("Deve retornar um status 201", async () => {
      await salesController.addSale(request, response);
      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it("Deve retornar o produto correto", async () => {
      await salesController.addSale(request, response);
      expect(response.json.calledWith(MOCK_SALE)).to.be.equal(true);
    });
  });
});
