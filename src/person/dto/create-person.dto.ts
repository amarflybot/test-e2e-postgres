export class CreatePersonDto {
  get state(): any {
    return this._state;
  }

  set state(value: any) {
    this._state = value;
  }
  get key(): string {
    return this._key;
  }
  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }
  private _name: string;

  private _key: string;

  private _state: any;
}
