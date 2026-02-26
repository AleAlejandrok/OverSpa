import { Locator, Page } from "@playwright/test";
import { BaseView } from "./BaseView";
import { GameState, HeroName, Role,  } from "../../../../src/types/enum"

interface ConstructorParams {
	page: Page
}

export class Input extends BaseView {
	constructor ({page}: ConstructorParams) {
		super({page})
	}
	
	submitButton: Locator = this.page.locator(`#submit`)
	roleDropdown: Locator = this.page.locator(`#dropdown-role`)
	gameStateDropdown: Locator = this.page.locator(`#dropdown-game-result`)
	gameMapDropdown: Locator = this.page.locator(`#dropdown-map`)
	heroCheckBox: (hero: HeroName) => Locator = (hero, page = this.page) => {
		const selectorString = hero.replace(' ', '-')
		return page.locator(`#checkbox-hero-selection-${selectorString}`)
	}

	async nav () {
		this.page.goto('/Input')
	}

	async clickSubmit() {
		this.submitButton.click()
	}

	async selectRole(role: Role) {
		await this.roleDropdown.click()
		await this.roleDropdown.selectOption(role)
	}

	async selectMap(map: string) {
		await this.gameMapDropdown.click()
		await this.gameMapDropdown.selectOption(map)
	}

	async selectGameResult(gameState: GameState) {
		await this.gameStateDropdown.click()
		await this.gameStateDropdown.selectOption(gameState)
	}

	async selectHeros(heros: [HeroName, ...HeroName[]]){ 
		for(const hero of heros) {
			await this.heroCheckBox(hero).click()
		}
	}
}