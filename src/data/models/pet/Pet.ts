import { Species } from '../../../types';
import { Model } from '../Model';

export class Pet extends Model {
  private _name: string;
  private _species: Species;

  constructor( name: string, species: Species, id?: number) {
    super(id);
    this._name = name;
    this._species = species;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get species(): Species {
    return this._species;
  }

  set species(value: Species) {
    this._species = value;
  }
}
