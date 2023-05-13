export class House {
    id?: any;
    title?: String;
    type_houses?:TypeHouses;
    country?: String;
    region?: String;
    adress?: String;
    loyer?: Number;
    available?:Boolean;
    nbrOfRooms?: Number;
  agency?: any;
  agencyName?: string;
  description?: string;
}
export enum TypeHouses{
    Apartemet='Apartemet',
    Villa='Villa',
    Room='Room'
}
export const HouseType2LabelMapping: Record<TypeHouses, string> = {
  [TypeHouses.Apartemet]: "Here's Apartemet",
  [TypeHouses.Room]: "Here's Room",
  [TypeHouses.Villa]: "Here's Villa",
};
