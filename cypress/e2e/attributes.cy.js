describe('attributes', () => {
  beforeEach(() => {
    cy.visit('/admin');
    cy.get('[id="_username"]').type('sylius');
    cy.get('[id="_password"]').type('sylius');
    cy.get('.primary').click();
  });

  // Remove .only and implement others test cases!
  it.only('testing edit attribute position', () => {

    // Click in products in side menu
    cy.clickInFirst('a[href="/admin/product-attributes/"]');

    // Type in value input to search for specify attribute
    cy.get('[id="criteria_code_value"]').type('dress_collection');

    // Click in filter blue button
    cy.get('*[class^="ui blue labeled icon button"]').click();

    // Click in edit of the remain attribute
    cy.clickInFirst('*[class^="ui labeled icon button "]');

    // Edit attribute position
    cy.get('[id="sylius_product_attribute_position"]').clear().type('10');

    // Click on Save changes button
    cy.get('[id="sylius_save_changes_button"]').scrollIntoView().click();

    // Assert that attribute has been updated
    cy.get('body').should('contain', 'Product attribute has been successfully updated.');

  });

  it('Caso de Teste 2: Criar Novo Atributo', () => {
    // Clicar em produtos no menu do lado
    cy.clickInFirst('a[href="/admin/product-attributes/"]');
    
    // Clicar no botão "Novo Atributo"
    cy.get('.sylius-button > .plus').click();

    // Preencher os campos necessários para criar um novo atributo
    cy.get('#sylius_product_attribute_name').type('New Attribute');
    cy.get('#sylius_product_attribute_code').type('new_attribute');
    cy.get('#sylius_product_attribute_type').select('Texto simples');

    // Clicar no botão "Salvar"
    cy.get('#sylius_save_changes_button').scrollIntoView().click();

    // Verificar se o novo atributo foi criado com sucesso na lista de atributos
    cy.get('body').should('contain', 'Product attribute has been successfully created.');
});


it('Caso de teste 3: Editar Atributo Existente', () => {
  // Ação: Acessar a página de atributos
  cy.clickInFirst('a[href="/admin/product-attributes/"]');

  // Ação: Selecionar um atributo existente da lista
  cy.get('[id="criteria_code_value"]').type('nome_do_atributo_existente');

  // Ação: Clicar no botão de busca
  cy.get('*[class^="ui blue labeled icon button"]').click();

  // Ação: Clicar no botão de edição
  cy.clickInFirst('*[class^="ui labeled icon button "]');

  // Ação: Alterar algum campo do atributo
  cy.get('[id="sylius_product_attribute_position"]').clear().type('novo_valor');

  // Ação: Clicar no botão "Salvar"
  cy.get('[id="sylius_save_changes_button"]').scrollIntoView().click();

  // Assert: Verificar se as alterações foram salvas com sucesso
  cy.get('body').should('contain', 'Product attribute has been successfully updated.');
});

it('Caso de teste 4: Buscar Atributo', () => {
  // Ação: Acessar a página de atributos
  cy.visit('/admin');

  // Ação: Clicar no menu lateral "Atributos"
  cy.contains('a', 'Atributos').click();

  // Ação: Preencher o campo de busca com um nome de atributo existente
  cy.get('[id="criteria_code_value"]').type('dress_collection');

  // Ação: Clicar no botão de filtro
  cy.get('*[class^="ui blue labeled icon button"]').click();

  // Assert: Verificar se o atributo buscado é exibido na lista
  cy.get('.item__name').should('contain', 'dress_collection');
});

  it('Caso de teste 5: Excluir Atributo', () => {
    // Click in products in side menu
    cy.clickInFirst('a[href="/admin/product-attributes/"]');

    // Type in value input to search for specify attribute
    cy.get('[id="criteria_code_value"]').type('example_attribute');

    // Click in filter blue button
    cy.get('*[class^="ui blue labeled icon button"]').click();

    // Click in delete of the remain attribute
    cy.clickInFirst('*[class^="ui labeled icon button "][title="Delete"]');

    // Confirm deletion
    cy.get('*[class^="content"] > [class^="ui blue button"]').click();

    // Assert that attribute has been deleted
    cy.get('body').should('contain', 'Product attribute has been successfully deleted.');
});


it('Caso de teste 6: Ordenar Atributos', () => {
  // Click in attributes in side menu
  cy.clickInFirst('a[href="/admin/attributes/"]');

  // Click on the column header "Name" to sort attributes alphabetically
  cy.get('th').contains('Name').click();

  // Assert that attributes are sorted alphabetically
  cy.get('td[data-label="Name"]').then($columns => {
      const values = $columns.map((index, elem) => Cypress.$(elem).text()).get();
      const sortedValues = [...values].sort();
      expect(values).to.deep.equal(sortedValues);
  });
});

it('Caso de teste 7: Limpar filtro de busca', () => {
  // Click in products in side menu
  cy.clickInFirst('a[href="/admin/product-attributes/"]');
  // Type in value input to search for specify attribute
  cy.get('[id="criteria_code_value"]').type('dress_collection');
  // Click in filter blue button
  cy.get('*[class^="ui blue labeled icon button"]').click();
  // Click to clear search filter
  cy.get('*[class^="ui red button"]').click();

  // Assert that search filter has been cleared
  cy.get('[id="criteria_code_value"]').should('have.value', '');
});

it('Caso de teste 8: Validar Campo Obrigatório - Nome', () => {
  // Ação: Acessar a página de atributos
  cy.visit('/admin');

  // Ação: Preencher credenciais e fazer login
  cy.get('[id="_username"]').type('sylius');
  cy.get('[id="_password"]').type('sylius');
  cy.get('.primary').click();

  // Ação: Navegar para a página de atributos de produtos
  cy.clickInFirst('a[href="/admin/product-attributes/"]');

  // Ação: Clicar no botão "Novo Atributo"
  cy.get('.ui.primary.button').click();

  // Ação: Tentar salvar sem preencher o campo de nome
  cy.get('[id="sylius_product_attribute_name"]').clear();

  // Assert: Verificar se é exibida uma mensagem de erro indicando que o campo de nome é obrigatório
  cy.get('.sylius-validation-error').should('contain', 'Please enter a name.');
});

it('Caso de teste 9: Validar Campo Único - Nome', () => {
  // Acessar a página de atributos
  cy.visit('/admin/product-attributes/');

  // Clicar no botão "Novo Atributo"
  cy.contains('button', 'Novo Atributo').click();

  // Preencher o campo de nome com um nome já existente
  cy.get('[id="sylius_product_attribute_name"]').type('Existing Attribute');

  // Clicar no botão "Salvar"
  cy.contains('button', 'Salvar').click();

  // Verificar se é exibida uma mensagem de erro indicando que o nome do atributo deve ser único
  cy.get('.sylius-flash-message-error').should('contain', 'Este valor já foi utilizado anteriormente.');
});


it('Caso de teste 10: Validar Restrição de Caractere - Nome', () => {
  // Ação: Acessar a página de atributos.
  cy.visit('/admin/product-attributes/');
  // Ação: Clicar no botão "Novo Atributo".
  cy.contains('button', 'Novo Atributo').click();
  // Ação: Preencher o campo de nome com mais caracteres do que o permitido.
  cy.get('#sylius_product_attribute_name').type('atributoComMaisDeCinquentaCaracteres');
  // Ação: Preencher outros campos necessários para criar o atributo.
  cy.get('#sylius_product_attribute_type').select('Texto');
  // Ação: Tentar salvar o novo atributo.
  cy.contains('button', 'Salvar').click();
  // Assert: Verificar se é exibida uma mensagem de erro indicando a restrição de caracteres no campo de nome.
  cy.get('.sylius-validation-error').should('contain', 'Este valor é muito longo. Ele deve ter 255 caracteres ou menos.');
});


it('Caso de teste 11: Cancelar Criação de Atributo', () => {
  // Acessar a página de atributos
  cy.visit('/admin/product-attributes/');

  // Clicar no botão "Novo Atributo"
  cy.contains('button', 'Novo Atributo').click();

  // Preencher alguns campos para criar um novo atributo (simulação)
  cy.get('[id="sylius_product_attribute_name"]').type('Novo Atributo Teste');
  cy.get('[id="sylius_product_attribute_code"]').type('novo_atributo_teste');
  cy.get('[id="sylius_product_attribute_position"]').type('5');

  // Clicar no botão "Cancelar"
  cy.contains('button', 'Cancelar').click();

  // Assert: Verificar se o atributo não foi criado e se o usuário permanece na página de atributos.
  cy.contains('Novo Atributo Teste').should('not.exist');
  cy.url().should('include', '/admin/product-attributes/');
});


  it('test case 12', async () => {
    // Implement your test case 12 code here
  });

  // Implement the remaining test cases in a similar manner

});
