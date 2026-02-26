import { test, expect, ConsoleMessage } from '@playwright/test';
import { Input } from '../../page-objects/views';
import { GameState, HeroName, Role,  } from "../../../../src/types/enum"


let InputViewPageObject: Input;

test.beforeEach('navigation', async ({page}) =>{
	InputViewPageObject = new Input({page})

	await InputViewPageObject.nav()
})

test('has title', async () => {
	await test.step('Title is correct', async () => {
		await expect(InputViewPageObject.title).toHaveText('Input')
	})
});

test('Submit button does not function if heros are not selected', async () => {
	await test.step('Selects role', async () => {
		await InputViewPageObject.selectRole(Role.TANK)
	})

	await test.step('Selects game result', async () => {
		await InputViewPageObject.selectGameResult(GameState.Draw)
	})

	await test.step('Selects game map', async () => {
		await InputViewPageObject.selectMap('Nepal')
	})

	await expect(InputViewPageObject.submitButton).toBeDisabled()
});

test('Submit button is enabled when all necessary options are selected', async () => {
	await test.step('Selects role', async () => {
		await InputViewPageObject.selectRole(Role.TANK)
	})

	await test.step('Selects game result', async () => {
		await InputViewPageObject.selectGameResult(GameState.Draw)
	})

	await test.step('Selects game map', async () => {
		await InputViewPageObject.selectMap('Nepal')
	})

	await test.step('Selects game heros', async () => {
		await InputViewPageObject.selectHeros([HeroName.WRECKING_BALL, HeroName.REINHARDT])
	})

	await expect(InputViewPageObject.submitButton).not.toBeDisabled()
});

test('Submit button outputs appropriate json', async ({page}) => {
	await test.step('Selects role', async () => {
		await InputViewPageObject.selectRole(Role.SUPPORT)
	})

	await test.step('Selects game result', async () => {
		await InputViewPageObject.selectGameResult(GameState.WIN)
	})

	await test.step('Selects game map', async () => {
		await InputViewPageObject.selectMap('Route 66')
	})

	await test.step('Selects game heros', async () => {
		await InputViewPageObject.selectHeros([HeroName.MERCY, HeroName.LIFEWEAVER])
	})

	await expect(InputViewPageObject.submitButton).not.toBeDisabled()

	await test.step('click submit', async () => {
		await InputViewPageObject.clickSubmit()
	})

	const msg = await page.waitForEvent('console')
	const value = await msg.args()[0].jsonValue()
	await test.step('validate log output', async () => {
		expect(value).toEqual({
			gameResult: "Win",
			heros: [
				HeroName.MERCY,
				HeroName.LIFEWEAVER,
			],
			map: "Route 66",
			role: Role.SUPPORT,
		})
	})

});