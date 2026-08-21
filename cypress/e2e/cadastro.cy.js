/// <reference types="cypress"/>
import { faker } from '@faker-js/faker';
import CadastroPage from '..//support/pages/cadastro-page'
import cadastroPage from '..//support/pages/cadastro-page';

describe('Funcionalidade: Cadastro no Hub de Leitura', () => {

    beforeEach(() => {
        CadastroPage.visitarPaginaCadastro()
    });

    it('Devo fazer cadastro com sucesso usando funções JS', () => {
        let email = `teste${Date.now()}@teste.com`
        cy.get('#name').type('Gusta Gus')
        cy.get('#email').type(email)
        cy.get('#phone').type('41993203829')
        cy.get('#password').type('123456')
        cy.get('#confirm-password').type('123456')
        cy.get('#terms-agreement').check()
        cy.get('#register-btn').click()
        //Resultado esperado
        cy.url().should('include', 'dashboard')
    });

    it('Devo fazer cadastro com sucesso usando FAKER', () => {
        let nome = faker.person.fullName()
        let email = faker.internet.email()
        let telefone = `${Date.now()}`
        cy.get('#name').type(nome)
        cy.get('#email').type(email)
        cy.get('#phone').type(telefone)
        cy.get('#password').type('123456')
        cy.get('#confirm-password').type('123456')
        cy.get('#terms-agreement').check()
        cy.get('#register-btn').click()
        //Resultado esperado
        cy.url().should('include', 'dashboard')
        cy.get('#user-name').should('contain', nome)
    });

    it('Deve preencher cadastro com sucesso - Usando comando customizado', () => {
        let email = `teste${Date.now()}@teste.com`
        let nome = faker.person.fullName({ sex: 'female'})
        let telefone = `${Date.now()}`
        cy.preencherCadastro(
            nome,
            email,
            telefone,
            'Teste@123',
            'Teste@123'
        )  
        cy.url().should('include', 'dashboard')
    });

    it('Deve fazer cadastro com sucesso - Usando Page Objects', () => {
        let email = `teste${Date.now()}@teste.com`
        CadastroPage.preencherCadastro('Gustavo Anderson', email, '1198765321', 'senha123', 'senha123')
        cy.url().should('include', 'dashboard')
    });

    it.only('Deve validar mensagem ao tentar cadastrar SEM preencher nome', () => {
        cadastroPage.preencherCadastro('', 'gusta@teste.com', '1198765321', 'senha123', 'senha123')
        cy.get(':nth-child(1) > .invalid-feedback').should('contain', 'Nome deve ter pelo menos 2 caracteres')
    });

});