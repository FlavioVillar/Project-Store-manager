const sinon = require("sinon");
const { expect } = require("chai");

const connection = require("../../../helpers/connection");
const salesModels = require("../../../models/salesModel");

const payloadSales = [
  {
    id: 3,
    itemsSold: [
      { productId: 1, quantity: 1 },
      { productId: 2, quantity: 5 },
    ],
  },
];

describe('6 - Teste Models "sales"', () => {
  describe('Testa lista os produtos na base de dados - get "All"', () => {
    before(async () => {
      sinon.stub(connection, "execute").resolves(payloadSales);
    });

    after(async () => {
      connection.execute.restore();
    });

    it("Deve retornar um Objeto", async () => {
      const result = await salesModels.getAll();
      expect(result).to.be.a("object");
    });

    it("Testa as propriedades do objeto", async () => {
      const result = await salesModels.getAll();
      expect(result).to.have.property("id");
      expect(result).to.have.property("itemsSold");
    });

    it("Testa o array de itens", async () => {
      const result = await salesModels.getAll();
      expect(result.itemsSold).to.be.a("array");
    });

    it("Testa as propriedades do objeto do array de itens", async () => {
      const result = await salesModels.getAll();
      expect(result.itemsSold[0]).to.have.property("productId");
      expect(result.itemsSold[0]).to.have.property("quantity");
    });

    it("Testa o array de itens do objeto", async () => {
      const result = await salesModels.getAll();
      expect(result.itemsSold[0].productId).to.be.a("number");
      expect(result.itemsSold[0].quantity).to.be.a("number");
    });
  });

  describe('Testa lista os produtos na base de dados - get "ById"', () => {
    before(async () => {
      sinon.stub(connection, "execute").resolves(payloadSales);
    });

    after(async () => {
      connection.execute.restore();
    });

    it("Deve retornar um Objeto", async () => {
      const result = await salesModels.getById(3);
      expect(result).to.be.a("object");
    });

    it("Testa as propriedades do objeto", async () => {
      const result = await salesModels.getById(3);
      expect(result).to.have.property("id");
      expect(result).to.have.property("itemsSold");
    });

    it("Deve retornar uma venda", async () => {
      const result = await salesModels.getById(3);
      expect(result.id).to.be.equal(3);
    });
  });

  describe("Testa o delete de um produto - delete", () => {
    before(async () => {
      sinon.stub(connection, "execute").resolves({ affectedRows: 1});
    });

    after(async () => {
      connection.execute.restore();
    });

    it("Testa de retorna um Boolean", async () => {
      const result = await salesModels.exclude(1);
      expect(result).to.be.a("number");
    });

    it("Testa de retorna true", async () => {
      const result = await salesModels.exclude(1);
      console.log(result);
      expect(result).to.be.equal({affectedRows: 1});
    });
  });
});
