import { EntitiesTypes } from "@shared/enums/entities-types.enum";
import { ExpSpeedTypes } from "@shared/enums/expspeed-types.enum";

export class Pokemon {
    number!: number;
    name!: string;
    types: EntitiesTypes[] = [EntitiesTypes.none, EntitiesTypes.none];
    height!: number;
    weight!: number;
    malePct!: number;
    femalePct!: number;
    captRate!: number;
    expPoints!: number;
    expSpeed!: ExpSpeedTypes;
    baseTotal!: number;
    hp!: number;
    attack!: number;
    defense!: number;
    special!: number;
    speed!: number;
    normalDmg!: number;
    fireDmg!: number;
    waterDmg!: number;
    electricDmg!: number;
    grassDmg!: number;
    iceDmg!: number;
    fightDmg!: number; 
    poisonDmg!: number;
    groundDmg!: number;
    flyingDmg!: number;
    psychicDmg!: number;
    bugDmg!: number;
    rockDmg!: number;
    ghostDmg!: number;
    dragonDmg!: number;
    evolutions!: number;
    legendary!: number;
    image!: string;
}

