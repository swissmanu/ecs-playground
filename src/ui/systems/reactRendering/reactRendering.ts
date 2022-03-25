import React from 'react';
import ReactDOM from 'react-dom';
import EntityManager from '../../../simulation/entityManager';
import System from '../../../simulation/system';
import ReactRenderer from './ReactRenderer';

export default class ReactRenderingSystem extends System {
  constructor(entityManager: EntityManager, private readonly root: Element) {
    super(entityManager);
  }

  update(): void {
    ReactDOM.render(React.createElement(ReactRenderer, { entityManager: this.entityManager }), this.root);
  }
}
