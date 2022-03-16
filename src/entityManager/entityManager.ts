import { v4 } from "uuid";
import Component from "./component";
import { TypeTagToComponent } from "./typeTagToComponent";

type ComponentMap = {
  [K in keyof TypeTagToComponent]?: Component<K>;
};

type GuaranteedComponentMap<
  GuaranteedTypeTag extends keyof TypeTagToComponent
> = Required<Pick<ComponentMap, GuaranteedTypeTag>> &
  Omit<ComponentMap, GuaranteedTypeTag>;

export default class EntityManager {
  private readonly entities: Map<string, ComponentMap> = new Map();

  addEntity(...components: Component<keyof TypeTagToComponent>[]): string {
    const id = v4();
    const componentMap: ComponentMap = {};

    for (const component of components) {
      componentMap[component.typeTag] = component as any;
    }
    this.entities.set(id, componentMap);

    return id;
  }

  entitiesWithComponent<TypeTag extends keyof TypeTagToComponent>(
    ...typeTag: TypeTag[]
  ): ReadonlyArray<GuaranteedComponentMap<TypeTag>> {
    const entities: GuaranteedComponentMap<TypeTag>[] = [];

    for (const [id, components] of this.entities) {
      if (typeTag.every((t) => components[t] !== undefined)) {
        entities.push(components as GuaranteedComponentMap<TypeTag>);
      }
    }

    return entities;
  }

  toString(): string {
    return JSON.stringify(this.entities, null, 2);
  }
}
