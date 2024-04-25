const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('attributes', () => {
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser('firefox').build();
  });

  after(async () => {
    await driver.quit();
  });

  beforeEach(async () => {
    driver.manage().deleteAllCookies();
    await driver.get('http://localhost:9990/admin');
    // await driver.get('http://150.165.75.99:9990/admin');
    await driver.findElement(By.id('_username')).sendKeys('sylius');
    await driver.findElement(By.id('_password')).sendKeys('sylius');
    await driver.findElement(By.css('.primary')).click();
    // await driver.sleep(1000);
  });

  // Remove .only and implement others test cases!
  it.only('testing edit attribute position', async () => {
    // Click in attributes in side menu
    await driver.findElement(By.linkText('Attributes')).click();

    // Type in value input to search for specify attribute
    await driver.findElement(By.id('criteria_code_value')).sendKeys('dress_collection');

    // Click in filter blue button
    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();

    // Click in edit of the remain attribute
    const buttons = await driver.findElements(By.css('*[class^="ui labeled icon button "]'));
    await buttons[0].click();

    // Edit attribute position
    const inputName = await driver.findElement(By.id('sylius_product_attribute_position'));
    inputName.click();
    inputName.clear();
    inputName.sendKeys('10');

    // Click on Save changes button
    await driver.findElement(By.id('sylius_save_changes_button')).click();

    // Assert that attribute has been updated
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('Product attribute has been successfully updated.'));
  });

  it('test case 2', async () => {
    // Clicar em produtos no menu ao lado
    await driver.findElement(By.linkText('Attributes')).click();
    // Clicar no botão "Novo Atributo"
    await driver.findElement(By.css('.sylius-button > .plus')).click();
    // Preencher os campos necessários para criar um novo atributo
    await driver.findElement(By.id('sylius_product_attribute_name')).sendKeys('New Attribute');
    await driver.findElement(By.id('sylius_product_attribute_code')).sendKeys('new_attribute');
    await driver.findElement(By.id('sylius_product_attribute_type')).sendKeys('Texto simples');
    // Clicar no botão "Salvar"
    await driver.findElement(By.id('sylius_save_changes_button')).click();
    // Verificar se o novo atributo foi criado com sucesso na lista de atributos
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('Product attribute has been successfully created.'));
  });

  it('test case 3', async () => {
    // Ação: Acessar a página de atributos
    await driver.findElement(By.linkText('Attributes')).click();
    // Ação: Selecionar um atributo existente da lista
    await driver.findElement(By.id('criteria_code_value')).sendKeys('nome_do_atributo_existente');
    // Ação: Clicar no botão de busca
    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();
    // Ação: Clicar no botão de edição
    const buttons = await driver.findElements(By.css('*[class^="ui labeled icon button "]'));
    await buttons[0].click();                                                                           
    // Ação: Alterar algum campo do atributo
    const inputPosition = await driver.findElement(By.id('[id="sylius_product_attribute_position"'));
    inputPosition.click();
    inputPosition.clear();
    inputPosition.sendKeys('novo_valor')
    // Ação: Clicar no botão "Salvar"
    await driver.findElement(By.id('[id="sylius_save_changes_button"]')).click(); 
    // Assert: Verificar se as alterações foram salvas com sucesso
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('Product attribute has been successfully updated'));
  });

  it('test case 4', async () => {
  // Ação: Acessar a página de atributos 
  await driver.get('/admin');
  // Ação: Clicar no menu lateral "Atributos"
  await driver.findElement(By.xpath('//a[contains(text(), "Attributes")]')).click();
  // Ação: Preencher o campo de busca com um nome de atributo existente
  await driver.findElement(By.id('criteria_code_value')).sendKeys('dress_collection');
  // Ação: Clicar no botão de filtro
  await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();
  // Assert: Verificar se o atributo buscado é exibido na lista
  const attributeName =  await driver.findElement(By.cs('.item__name')).getText();
  assert(attributeName.includes('dress_collection'));
 });

  it('test case 5', async () => {
    // Clicar em produtos no menu lateral
    await driver.findElement(By.linkText('Attributes')).click();
    // Inserir no valor entrada para buscar por atributos especificos
    await driver.findElement(By.id('criteria_code_value')).sendKeys('example_attribute');
    // Clicar em botão de filtragem azul
    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();
    // Clicar em deletar o atributo restante
    const deleteButton = await driver.findElement(By.css('*[class^="ui labeled icon button "][title="Delete"]'));
    await deleteButton.click();
    // Confirmar deletação
    await driver.findElement(By.css('*[class^="content"] > [class^="ui blue button"]')).click();
    // Assert em que o atributo foi deletado
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('Product attribute has been successfully deleted.'));
  });

  it('test case 6', async () => {
    // Clicar em atributos no menu lateral
    await driver.findElement(By.linkText('Attributes')).click();
    // Clicar na coluna "Nome" para ordenar atributos alfabeticamente
    await driver.findElement(By.xpath('//th[contains(text(), "Name")]')).click();
    // Asserte em que os atributos são ordenados alfabeticamente
    const attributeNames = await driver.findElements(By.css('td[data-label="Name"]'));
    let values = [];
    for (const attributeName of attributeNames) {
      values.push(await attributeName.getText());
    }
    const sortedValues = values.slice().sort();
    assert.deepEqual(values, sortedValues);
  });

  it('test case 7', async () => {
    // Clicar em produtos no menu lateral
    await driver.findElement(By.linkText('Attributes')).click();
    // Digitar no valor uma entrada para buscar por atributos especificos
    await driver.findElement(By.id('criteria_code_value')).sendKeys('dress_collection');
    // Clicar em botão de filtragem azul
    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();
    // Clicar para limpar filtro de pesquisa
    await driver.findElement(By.css('*[class^="ui red button"]')).click();
    // Assert que verifica se a busca foi filtrada
    const searchInput = await driver.findElement(By.id('criteria_code_value')).getAttribute('value');
    assert.strictEqual(searchInput, ''); 
  });

  it('test case 8', async () => {
    // Ação: Acessar a página de atributos
    await driver.get('/admin');
    // Ação: Preencher credenciais e fazer login
    await driver.findElement(By.id('_username')).sendKeys('sylius');
    await driver.findElement(By.id('_password')).sendKeys('sylius');
    await driver.findElement(By.css('.primary')).click();
    // Ação: Navegar para a página de atributos de produtos
    await driver.findElement(By.xpath('//a[contains(text(), "Attributes")]')).click();
    // Ação: Clicar no botão "Novo Atributo"
    await driver.findElement(By.css('.ui.primary.button')).click();
    // Ação: Tentar salvar sem preencher o campo de nome
    await driver.findElement(By.id('sylius_product_attribute_name')).clear();
    // Assert para verificar se é exibida uma mensagem de erro indicando que o campo de nome é obrigatório
    const errorMessage = await driver.findElement(By.css('.sylius-validation-error')).getText();
    assert.strictEqual(errorMessage, 'Please enter a name.');
  });

  it('test case 9', async () => {
    // Acessar a página de atributos
    await driver.get('/admin/product-attributes/');
    // Clicar no botão "Novo Atributo"
    await driver.findElement(By.xpath('//button[contains(text(), "Novo Atributo")]')).click();
    // Preencher o campo de nome com um nome já existente
    await driver.findElement(By.id('sylius_product_attribute_name')).sendKeys('Existing Attribute');
    // Clicar no botão "Salvar"
    await driver.findElement(By.xpath('//button[contains(text(), "Salvar")]')).click();
    // Verificar se é exibida uma mensagem de erro indicando que o nome do atributo deve ser único
    const errorMessage = await driver.findElement(By.css('.sylius-flash-message-error')).getText();
    assert(errorMessage.includes('Este valor já foi utilizado anteriormente.'));
  });

  it('test case 10', async () => {
    // Ação: Acessar a página de atributos.
    await driver.get('/admin/product-attributes/');
    // Ação: Clicar no botão "Novo Atributo".
    await driver.findElement(By.xpath('//button[contains(text(), "Novo Atributo")]')).click();
    // Ação: Preencher o campo de nome com mais caracteres do que o permitido.
    await driver.findElement(By.id('sylius_product_attribute_name')).sendKeys('atributoComMaisDeCinquentaCaracteres');
    // Ação: Preencher outros campos necessários para criar o atributo.
    await driver.findElement(By.id('sylius_product_attribute_type')).sendKeys('Texto');
    // Ação: Tentar salvar o novo atributo.
    await driver.findElement(By.xpath('//button[contains(text(), "Salvar")]')).click();
    // Assert: Verificar se é exibida uma mensagem de erro indicando a restrição de caracteres no campo de nome.
    const errorMessage = await driver.findElement(By.css('.sylius-validation-error')).getText();
    assert.strictEqual(errorMessage, 'Este valor é muito longo. Ele deve ter 255 caracteres ou menos.');
  });

  it('test case 11', async () => {
    // Acessar a página de atributos
    await driver.get('/admin/product-attributes/');
    // Clicar no botão "Novo Atributo"
    await driver.findElement(By.xpath('//button[contains(text(), "Novo Atributo")]')).click();
    // Preencher alguns campos para criar um novo atributo (simulação)
    await driver.findElement(By.id('sylius_product_attribute_name')).sendKeys('Novo Atributo Teste');
    await driver.findElement(By.id('sylius_product_attribute_code')).sendKeys('novo_atributo_teste');
    await driver.findElement(By.id('sylius_product_attribute_position')).sendKeys('5');
    // Clicar no botão "Cancelar"
    await driver.findElement(By.xpath('//button[contains(text(), "Cancelar")]')).click();
    // Assert: Verificar se o atributo não foi criado e se o usuário permanece na página de atributos.
    const attribute = await driver.findElements(By.xpath('//td[contains(text(), "Novo Atributo Teste")]'));
    assert.strictEqual(attribute.length, 0);
    const url = await driver.getCurrentUrl();
    assert(url.includes('/admin/product-attributes/'));
  });

  // Implement the remaining test cases in a similar manner
});
