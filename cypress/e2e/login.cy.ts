describe("login", () => {
	afterEach(() => {
		cy.get("#Email").clear()
		cy.get("#Password").clear()
	})
	it("buttons disabled", () => {
		cy.visit("/")
		cy.get("#Email").type("hello")
		cy.get("#Password").type("1234")

		cy.get("[aria-label='submit form']").should("be.disabled")
	})
	it("fails login", () => {
		cy.get("#Email").type("cristiano@test.com")
		cy.get("#Password").type("1234566565656565")
		cy.get("[aria-label='submit form']").click()

		cy.contains("Sorry, your password or email").should("be.visible")
	})
	it("logins and logs out", () => {
		cy.get("#Email").type("cristiano@test.com")
		cy.get("#Password").type("123456")

		cy.get("[aria-label='submit form']").should("not.be.disabled")
		cy.get("[aria-label='submit form']").click()

		cy.contains("Currently you have 0 subscriptions").should("be.visible")
		cy.get("[data-cy='dropdown']").click()
		cy.get("[data-cy='logout']").click()
	})
})
