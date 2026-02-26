import { Page, Locator } from "@playwright/test";

interface ConstructorParams {
	page: Page
}

export abstract class BaseView {
	protected page: Page
	title: Locator
	
	constructor({page}: ConstructorParams) { 
		this.page = page
		this.title = page.locator(`h1`)
	}

	abstract nav (): void 
}