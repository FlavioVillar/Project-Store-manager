const sinon = require("sinon");
const { expect } = require("chai");

const salesModels = require("../../../models/salesModel");
const salesServices = require("../../../services/salesService");

const payloadSales = [
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

describe("5 - Teste services 'sales'", () => {
  describe('Testa lista os produtos na base de dados - get "All"', () => {
    before(async () => {
      sinon.stub(salesModels, "getAll").resolves(payloadSales[0]);
    });

    after(async () => {
      salesModels.getAll.restore();
    });

    it("Deve retornar um Objeto", async () => {
      const result = await salesServices.getAll();
      expect(result).to.be.a("object");
    });

    it("Testa as propriedades do objeto", async () => {
      const result = await salesServices.getAll();
      expect(result).to.have.property("saleId");
      expect(result).to.have.property("date");
      expect(result).to.have.property("productId");
      expect(result).to.have.property("quantity");
    });
  });

  describe('Testa lista os produtos na base de dados por id - get "ById"', () => {
    before(async () => {
      sinon.stub(salesModels, "getById").resolves(payloadSales[0]);
    });

    after(async () => {
      salesModels.getById.restore();
    });

    it("Deve retornar um Objeto", async () => {
      const result = await salesServices.getById(1);
      expect(result).to.be.a("object");
    });

    it("Testa as propriedades do objeto", async () => {
      const result = await salesServices.getById(1);
      expect(result).to.have.property("saleId");
      expect(result).to.have.property("date");
      expect(result).to.have.property("productId");
      expect(result).to.have.property("quantity");
    });
  });

  describe("Testa exclusão de Produtos - delete", () => {
    before(async () => {
      sinon.stub(salesModels, "exclude").resolves(1);
      sinon.stub(salesModels, "getById").resolves([{}]);
    });

    after(async () => {
      salesModels.exclude.restore();
      salesModels.getById.restore();
    });

    it("Retorna um número", async () => {
      const result = await salesServices.exclude(1);
      expect(result).to.be.a("number");
    });

    it("Retorna 1 se a venda for deletada", async () => {
      const result = await salesServices.exclude(1);
      expect(result).to.be.equal(1);
    });
  });
});
