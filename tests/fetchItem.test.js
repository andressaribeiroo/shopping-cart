require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
 it('Testa se retorna uma função',() => {
  expect(typeof fetchItem).toBe('function');
})

it('Deve usar a função fetch quando chamado', async () => {
  await fetchItem('MLB1615760527');
  expect(fetch).toHaveBeenCalled();
})

it('Testa se, ao chamar a função fetchItem, a função fetch utiliza o endpoint', async () => {
  const url = "https://api.mercadolibre.com/items/MLB1615760527";
  await fetchItem('MLB1615760527');
  expect(fetch).toHaveBeenCalledWith(url);
});

it('Verifica se o retorno da função fetchItem é igual ao objeto "item"', async () => {
  const resultItem = await fetchItem('MLB1615760527');
  expect(resultItem).toEqual(item);
})

it('Verifica se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem', async () => {
  const fail = await fetchItem();
  expect(fail).toEqual(new Error('You must provide an url'));
});
 
});
