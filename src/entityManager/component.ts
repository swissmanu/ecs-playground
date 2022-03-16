import { TypeTagToComponent } from "./typeTagToComponent";

export default class Component<TypeTag extends keyof TypeTagToComponent> {
  constructor(readonly typeTag: TypeTag) {}
}
