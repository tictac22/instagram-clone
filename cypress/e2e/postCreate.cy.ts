describe("post page", () => {
	it("logins", () => {
		cy.visit("/")

		cy.get("#Email").type("cristiano@test.com")
		cy.get("#Password").type("123456")

		cy.get("[aria-label='submit form']").should("not.be.disabled")
		cy.get("[aria-label='submit form']").click()
	})

	it("open post create", () => {
		cy.get("[data-cy='createPost']").click()
		cy.get("input[type=file]").selectFile(
			{
				contents: "cypress/images/test.jpg",
				fileName: "file.txt",
				mimeType: "image/jpeg",
				lastModified: Date.now()
			},
			{
				force: true
			}
		)

		cy.get("[aria-label='next step']").click()
	})
	it("select filter", () => {
		cy.get("[aria-label='next step']").click()
		cy.contains("Please select filters for your images").should(
			"be.visible"
		)
	})

	after(() => {
		cy.get("[data-cy='closePopup'").click()

		cy.contains("Discard post?").should("be.visible")

		cy.get("[aria-label='confirm close popup']").click()
		cy.get("[data-cy='dropdown']").click()
		cy.get("[data-cy='logout']").click()
	})
})
