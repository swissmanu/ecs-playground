import EntityManager from "./entityManager";

export default abstract class System {
  constructor(protected readonly entityManager: EntityManager) {}
  abstract update(): void;
}
