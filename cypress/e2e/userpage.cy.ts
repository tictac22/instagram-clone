describe("user page", () => {
	it("page and transition between them works fine", () => {
		cy.visit("/MIkpdmQDpqfx2Dus7m4z3RKv4XD2")

		cy.contains("Cristiano Ronaldo").should("be.visible")

		cy.scrollTo("bottom")
		///p/bYcnXVyMJ4zrdCr1yJon

		cy.get("[href='/p/bYcnXVyMJ4zrdCr1yJon']").click()

		cy.url().should("include", "bYcnXVyMJ4zrdCr1yJon")
		cy.contains("Verified Great win guys!").should("be.visible")
	})
})
