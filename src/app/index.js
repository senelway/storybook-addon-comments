import * as React from 'react';
import addons from '@storybook/addons';

import Comments from './Comments';

import { ADDON_ID } from '../constants';

export default function () {
  addons.register(ADDON_ID, (api) => {
    const channel = addons.getChannel();

    addons.addPanel(ADDON_ID, {
      title: 'Comments',
      render: () => <Comments channel={channel} api={api} />,
    });
  });
}
