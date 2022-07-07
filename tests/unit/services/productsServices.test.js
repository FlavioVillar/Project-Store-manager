const sinon = require("sinon");
const { expect } = require("chai");

const productModel = require("../../../models/productModel");
const productServices = require("../../../services/productService");

const payloadProduct = {
  id: 1,
  name: "Product 1",
};

describe("2 - Teste services 'products'", () => {
  describe('Testa lista os produtos na base de dados - get "All"', () => {
    before(async () => {
      sinon.stub(productModel, "getAll").returns(payloadProduct);
    });

    after(async () => {
      productModel.getAll.restore();
    });

    it("Deve retornar um Objeto", async () => {
      const result = await productServices.getAll();
      expect(result).to.be.a("object");
    });

    it("Testa as propriedades do objeto", async () => {
      const result = await productServices.getAll();
      expect(result).to.have.property("id");
      expect(result).to.have.property("name");
    });
  });

  describe('Testa lista os produtos na base de dados por id - get "ById"', () => {
    before(async () => {
      sinon.stub(productModel, "getById").resolves([payloadProduct]);
    });

    after(async () => {
      productModel.getById.restore();
    });

    it("Deve retornar um Objeto", async () => {
      const result = await productServices.getById(1);
      expect(result).to.be.a("object");
    });

    it("Testa as propriedades do objeto", async () => {
      const result = await productServices.getById(1);
      expect(result).to.have.property("id");
      expect(result).to.have.property("name");
    });
  });

  describe("Testa cadastro Produtos - post", () => {
    before(async () => {
      sinon.stub(productModel, "add").resolves(payloadProduct);
    });

    after(async () => {
      productModel.add.restore();
    });

    it("Retorna um boolean", async () => {
      const result = await productServices.add("");
      expect(result).to.be.a("boolean");
    });

    it("Retorna false", async () => {
      const result = await productServices.add("");
      expect(result).to.be.false;
    });

    it("Retorna o produto cadastrado", async () => {
      const result = await productServices.add("Product 25");
      expect(result).to.be.equal(payloadProduct);
    });
  });
      
  describe("Teste de buscar produto - search", () => {
    before(async () => {
      sinon.stub(productModel, "search").resolves(payloadProduct);
    });

    after(async () => {
      productModel.search.restore();
    });

    it("Retorna um Objeto", async () => {
      const result = await productServices.search("");
      expect(result).to.be.a("object");
    });

    it("Retorna o produto buscado", async () => {
      const result = await productServices.search("Product 1");
      expect(result).to.be.equal(payloadProduct);
    });
  });
});
