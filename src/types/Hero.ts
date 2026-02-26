import { Role } from "./enum";
import { HeroName } from "./enum/HeroName";

export interface Hero {
	name: HeroName,
	role: Role	
}