const sinon = require("sinon");
const { expect } = require("chai");

const connection = require("../../../helpers/connection");
const productsModels = require("../../../models/productModel");

describe('3 - Teste Models "products"', () => {
  describe('Testa lista os produtos na base de dados - get "All"', () => {
    const payloadProduct = [
      {
        id: 1,
        name: "Product 1",
      },
    ];

    before(async () => {
      sinon.stub(connection, "execute").returns(payloadProduct);
    });

    after(async () => {
      connection.execute.restore();
    });

    it("Deve retornar um Objeto", async () => {
      const result = await productsModels.getAll();
      expect(result).to.be.a("object");
    });

    it("Testa as propriedades do objeto", async () => {
      const result = await productsModels.getAll();
      expect(result).to.have.property("id");
      expect(result).to.have.property("name");
    });
  });

  describe("Testa cadastro Produtos - post", () => {
    const payloadProduct = [
      {
        id: 1,
        name: "Product 1",
      },
    ];

    before(async () => {
      sinon.stub(connection, "execute").returns(payloadProduct);
    });

    after(async () => {
      connection.execute.restore();
    });

    it("Deve retornar um Objeto", async () => {
      const result = await productsModels.add(payloadProduct);
      expect(result).to.be.a("object");
    });

    it("Testa as propriedades do objeto", async () => {
      const result = await productsModels.add("Product 1");
      expect(result).to.have.property("id");
      expect(result).to.have.property("name");
    });
  });
});
