import * as React from 'react';
import addons from '@storybook/addons';

import Comments from './Comments';

import { ADDON_ID } from './helpers/constants';

export default function () {
  addons.register(ADDON_ID, (api) => {
    const channel = addons.getChannel();

    addons.addPanel(ADDON_ID, {
      title: 'Comments',
      // eslint-disable-next-line react/prop-types
      render: () => <Comments channel={channel} api={api} />,
    });
  });
}
