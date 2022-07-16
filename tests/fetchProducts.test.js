require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('Deve retornar uma função',() => {
    expect(typeof fetchProducts).toBe('function');
  })

  it('Deve usar a função fetch quando chamado', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  })

  it('Verifica se ao chamar fetchProducts usar o URL correto', async () => {
    await fetchProducts('computador');
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    expect(fetch).toHaveBeenCalledWith(url);
  })

  it('Verifica se fetchProducts retorna o objeto correto', async () => {
    const result = await fetchProducts('computador')
    expect (result).toEqual(computadorSearch);
  })

  it("Verifica se fetchProducts() retorna um erro com a mensagem 'You must provide an url'", async () => {
    const failRequest = await fetchProducts();
    expect(failRequest).toEqual(new Error('You must provide an url'));
  })
  
});
