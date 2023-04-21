import { Species } from "../../../types";
import { Model } from "../Model";

export class Product extends Model {
  private _name: string;

  constructor(name: string, id?: number) {
    super(id);
    this._name = name;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }
}
