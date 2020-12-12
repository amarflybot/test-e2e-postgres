export class CreatePersonDto {
  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get key(): string {
    return this._key;
  }

  set key(value: string) {
    this._key = value;
  }

  get state(): any {
    return this._state;
  }

  set state(value: any) {
    this._state = value;
  }

  private _name: string;

  private _key: string;

  private _state: any;
}
