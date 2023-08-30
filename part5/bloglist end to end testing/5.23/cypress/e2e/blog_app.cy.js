describe('Blog app', function() {

  describe('5.17', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
      cy.visit('http://localhost:3000')
      cy.contains('Blogs')
    })
  })

  describe('5.18 login',function() { //there is a bonus exercise
    it('succeeds with correct credentials', function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {
        name: 'kuba kuba',
        username: 'kuba',
        password: 'kuba'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.visit('http://localhost:3000')
      cy.contains('login').click()
      cy.get('input:first').type('kuba')
      cy.get('input:last').type('kuba')
      cy.get('#login-button').click()
    })

    it('fails with wrong credentials and has a red color', function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {
        name: 'kuba kuba',
        username: 'kuba',
        password: 'kuba'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.visit('http://localhost:3000')
      cy.contains('login').click()
      cy.get('input:first').type('kuba')
      cy.get('input:last').type('wrongpassword')
      cy.get('#login-button').click()
      cy.get('#login-button').click()
      cy.get('#error').should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain', 'kuba kuba logged in')
    })
  })


  it('displays the login form by default', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Blogs')
  })

  describe('5.19 creating a new blog', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {
        name: 'kuba kuba',
        username: 'kuba',
        password: 'kuba'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.visit('http://localhost:3000')
      cy.contains('login').click()
      cy.get('input:first').type('kuba')
      cy.get('input:last').type('kuba')
      cy.get('#login-button').click()
    })

    it('a new blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('input:eq(0)').type('title from cy')
      cy.get('input:eq(1)').type('author from cy')
      cy.get('input:eq(2)').type('url from cy')
      cy.contains('save').click()
      cy.contains('title from cy')
    })

  })

  describe('5.20 liking a blog', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {
        name: 'kuba kuba',
        username: 'kuba',
        password: 'kuba'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.visit('http://localhost:3000')
      cy.contains('login').click()
      cy.get('input:first').type('kuba')
      cy.get('input:last').type('kuba')
      cy.get('#login-button').click()
      cy.contains('new blog').click()
      cy.get('input:eq(0)').type('title from cy')
      cy.get('input:eq(1)').type('author from cy')
      cy.get('input:eq(2)').type('url from cy')
      cy.contains('save').click()
      cy.contains('title from cy')
    })

    it('a blog can be liked', function() {
      cy.contains('like').click()
      cy.contains('Successfully liked title from cy')
    })

  })

  describe('5.21 a user can delete their blog', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {
        name: 'kuba kuba',
        username: 'kuba',
        password: 'kuba'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)

      const user2 = {
        name: 'kuba2',
        username: 'kuba2',
        password: 'kuba'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user2)

      cy.login({ username: 'kuba', password: 'kuba' })
      cy.createBlog({
        title: 'title from cy',
        author: 'author is kuba kuba',
        url: 'the url url'
      })
      cy.createBlog({
        title: 'casual custom createBlog command title',
        author: 'custom author',
        url: 'everything is custom'
      })
    })

    //5.21
    it('a blog can be deleted by the user who created it', function() {
      cy.contains('title from cy')
      cy.contains('remove').click()
      cy.window().then((win) =>
        cy.stub(win, 'confirm').as('confirm').returns(true),
      )
      cy.get('html').should('contain','Successfully deleted')
    })

    //5.22
    it('5.22 only the creater sees the reomve button for their blogs', function() {
      cy.login({ username: 'kuba2', password: 'kuba' })
      cy.get('.blogStyle2').should('not.contain','remove')
    })

  })

  describe('5.23 blogs are ordered according to likes with the blog with the most likes being first.', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {
        name: 'kuba kuba',
        username: 'kuba',
        password: 'kuba'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)

      cy.login({ username: 'kuba', password: 'kuba' })
      cy.createBlog({
        title: 'The title with the least number of likes',
        author: 'author is kuba kuba',
        url: 'the url url'
      })
      cy.createBlog({
        title: 'The title with the most likes',
        author: 'custom author',
        url: 'everything is custom'
      })
      cy.createBlog({
        title: 'The title with the second most likes',
        author: 'handkerchief',
        url: 'Oooo.-rah'
      })

    })

    //5.23
    it('blogs are arranged in order', function() {
      cy.likeBlogByTitle({ title: 'The title with the most likes' })
      cy.likeBlogByTitle({ title: 'The title with the most likes' })
      cy.likeBlogByTitle({ title: 'The title with the most likes' })
      cy.likeBlogByTitle({ title: 'The title with the second most likes' })
      cy.likeBlogByTitle({ title: 'The title with the second most likes' })
      cy.likeBlogByTitle({ title: 'The title with the least number of likes' })

      cy.get('.blogStyle2').eq(0).should('contain', 'The title with the most likes')
      cy.get('.blogStyle2').eq(1).should('contain', 'The title with the second most likes')
      cy.get('.blogStyle2').eq(2).should('contain', 'The title with the least number of likes')
    })

  })


})