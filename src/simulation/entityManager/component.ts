import { TypeTagToComponent } from './typeTagToComponent';

export default class Component<TypeTag extends keyof TypeTagToComponent> {
  private _entityId = '';

  constructor(readonly typeTag: TypeTag) {}

  get entityId() {
    return this._entityId;
  }

  set entityId(id: string) {
    if (this._entityId !== '') {
      throw new Error('Cannot update entity id on component');
    }
    this._entityId = id;
  }
}
