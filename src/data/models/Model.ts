export abstract class Model {
  private _id: number;
  constructor(id?: number) {
    if (id) {
      this._id = id;
    } else {
      this._id = Math.floor(Math.random() * 100000)
    };
  }

  get id(): number {
    return this._id;
  }

  set id(id: number) {
    this._id = id;
  }
};