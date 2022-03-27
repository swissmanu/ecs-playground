import { v4 } from 'uuid';
import Component from './component';
import { TypeTagToComponent } from './typeTagToComponent';

export type ComponentMap = {
  [K in keyof TypeTagToComponent]?: TypeTagToComponent[K];
};

export type GuaranteedComponentMap<GuaranteedTypeTag extends keyof TypeTagToComponent> = Required<
  Pick<ComponentMap, GuaranteedTypeTag>
> &
  Omit<ComponentMap, GuaranteedTypeTag>;

export default class EntityManager {
  private readonly entities: Map<string, ComponentMap> = new Map();

  addEntity(...components: Component<keyof TypeTagToComponent>[]): string {
    const id = v4();
    const componentMap: ComponentMap = {};

    for (const component of components) {
      component.entityId = id;
      componentMap[component.typeTag] = component as any;
    }
    this.entities.set(id, componentMap);

    return id;
  }

  getEntity(id: string): ComponentMap | undefined {
    return this.entities.get(id);
  }

  allEntities(): ReadonlyMap<string, ComponentMap> {
    return this.entities;
  }

  getEntitiesWithComponent<TypeTag extends keyof TypeTagToComponent>(
    ...typeTag: TypeTag[]
  ): ReadonlyArray<[id: string, components: GuaranteedComponentMap<TypeTag>]> {
    const entities: [id: string, components: GuaranteedComponentMap<TypeTag>][] = [];

    for (const [id, components] of this.entities) {
      if (typeTag.every((t) => components[t] !== undefined)) {
        entities.push([id, components as GuaranteedComponentMap<TypeTag>]);
      }
    }

    return entities;
  }

  getEntityWithComponents<TypeTag extends keyof TypeTagToComponent>(
    id: string,
    ...typeTag: TypeTag[]
  ): GuaranteedComponentMap<TypeTag> | null {
    const components = this.entities.get(id);

    if (components) {
      if (typeTag.every((t) => components[t] !== undefined)) {
        return components as GuaranteedComponentMap<TypeTag>;
      }
    }

    return null;
  }
}
