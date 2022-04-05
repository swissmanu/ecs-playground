import React from 'react';
import ReactDOM from 'react-dom';
import EntityManager from '../../../simulation/entityManager';
import System from '../../../simulation/system';
import ReactRenderer from './ReactRenderer';

export default class ReactRenderingSystem extends System {
  constructor(
    entityManager: EntityManager,
    private readonly root: Element,
    private readonly onSimulateOneTick: () => void,
    private readonly onToggleSimulation: () => void
  ) {
    super(entityManager);
  }

  update(): void {
    ReactDOM.render(
      React.createElement(ReactRenderer, {
        entityManager: this.entityManager,
        onSimulateOneTick: this.onSimulateOneTick,
        onToggleSimulation: this.onToggleSimulation,
      }),
      this.root
    );
  }
}
