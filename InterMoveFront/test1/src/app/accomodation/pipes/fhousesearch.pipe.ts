import { Pipe, PipeTransform } from '@angular/core';
import { TypeHouses } from '../models/house.model';

export interface IHouse {
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

@Pipe({
  name: 'searchfHouse'
})
export class SearchfHousePipe implements PipeTransform {

  transform(
    houses: IHouse[],
    Keyword?: string,
    SCountry?: string,
    Stype?: string
  ): IHouse[] {

    if (!houses) return [];
    if (!Keyword) return houses;
    Keyword = Keyword.toLocaleLowerCase();
    houses = [...houses.filter(house => house.title.toLocaleLowerCase().includes(  Keyword))];

    if (!SCountry) return houses;
    SCountry = SCountry.toLocaleLowerCase();
    console.log(SCountry);
    houses = [...houses.filter(house => house.country.toLocaleLowerCase().includes(SCountry))];

    if (!Stype) return houses;
    Stype = Stype.toLocaleLowerCase();
    console.log(Stype);
    houses = [...houses.filter(house => house.type_houses.toLocaleLowerCase().includes(Stype))];

    return houses;
  }
}