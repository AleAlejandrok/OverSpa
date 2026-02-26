import React from "react";
import Button from "../../components/Button/Button";
import CheckBoxMultiple from "../../components/DropdownMultiple/DropdownMultiple";
import { HeroName, Role } from "../../types/enum";
import CheckboxSingle from "../../components/DropdownSingle/DropdownSingle";
import heroMappings from '../../../src/data/heros.json'
import gameMaps from  '../../../src/data/maps.json'
import { GameState } from "../../types/enum/GameState";

export function Input () {
	const [role, setRole] = React.useState(Role.TANK)
	const [heroNames, setHeros] = React.useState([] as HeroName[])
	const [gameResult, setGameResult] = React.useState(GameState.WIN)
	const [mapSelection, setMapSelection] = React.useState('')

	const herosFilteredByRole = heroMappings.filter((hero) => {return hero.role === role}).map((hero) => hero.name) as HeroName[]
	const gameMapNames = gameMaps.map(map => map.name)

	const canSubmitForm = !(role && heroNames.length && gameResult && mapSelection);


	console.log(`Selections`,role, heroNames, gameResult, mapSelection)

	function submitAction () {
		console.log({
			heros: heroNames,
			map: mapSelection,
			gameResult,
			role,
		})
	}


	return (
	<>
		<h1>Input</h1>
		<CheckboxSingle 
			onChange={(T)=>{
				setRole(T)
				setHeros([])
			}} 
			options={[...Object.values(Role)]}
			selection={role}
			id="role"
		/>
		<CheckboxSingle 
			onChange={T=>setGameResult(T)} 
			options={Object.values(GameState)}
			selection={gameResult}
			id="game-result"
		/>
		<CheckboxSingle 
			onChange={T=>setMapSelection(T)} 
			options={Object.values(gameMapNames)}
			id="map"
		/>
		{role && 
			<CheckBoxMultiple 
				onChange={T=>setHeros(T)} 
				options={herosFilteredByRole} 
				selections={heroNames}
				className="hero-selection"
			/>
		}
		<Button className="submit" onClick={submitAction} disabled={canSubmitForm} id="submit">Submit</Button>
	</>
	)
}