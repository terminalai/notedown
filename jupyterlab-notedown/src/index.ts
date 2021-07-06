import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ISettingRegistry } from '@jupyterlab/settingregistry';

import { requestAPI } from './handler';

/**
 * Initialization data for the notedown extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'notedown:plugin',
  autoStart: true,
  optional: [ISettingRegistry],
  activate: (app: JupyterFrontEnd, settingRegistry: ISettingRegistry | null) => {
    console.log('JupyterLab extension notedown is activated!');

    if (settingRegistry) {
      settingRegistry
        .load(plugin.id)
        .then(settings => {
          console.log('notedown settings loaded:', settings.composite);
        })
        .catch(reason => {
          console.error('Failed to load settings for notedown.', reason);
        });
    }

    requestAPI<any>('get_example')
      .then(data => {
        console.log(data);
      })
      .catch(reason => {
        console.error(
          `The notedown server extension appears to be missing.\n${reason}`
        );
      });
  }
};

export default plugin;
