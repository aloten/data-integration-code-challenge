import { Model } from "../Model";
import { Pet } from "../pet/Pet";
import { Product } from "../product/Product";

export class Prescription extends Model {
  private _pet: Pet;
  private _product: Product;

  constructor(pet: Pet, product: Product, id?: number) {
    super(id);
    this._product = product;
    this._pet = pet;
  }

  get pet(): Pet {
    return this._pet;
  }

  set pet(value: Pet) {
    this._pet = value;
  }

  get product(): Product {
    return this._product;
  }

  set product(value: Product) {
    this._product = value;
  }
}
