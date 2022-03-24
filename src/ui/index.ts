import { isObject } from 'util';
import simulation from '../simulation';

const { entityManager, systems } = simulation;
const ui = document.querySelector('#ui');

if (ui) {
  const output = document.createElement('pre');
  ui.appendChild(output);

  setInterval(() => {
    console.log('Update...');
    systems.forEach((s) => s.update());

    let log = '';
    for (const [id, components] of entityManager.allEntities().entries()) {
      log += `${id}:\n`;
      log += `${JSON.stringify(components, null, 2)}\n\n\n`;
    }

    output.textContent = log;
  }, 1000);
}
