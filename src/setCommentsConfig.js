import addons from '@storybook/addons';

import { EVENT_ID } from './helpers/constants';

function setCommentsConfig(options) {
  const channel = addons.getChannel();
  if (!channel) {
    throw new Error(
      'Failed to find addon channel. This may be due to https://github.com/storybooks/storybook/issues/1192.',
    );
  }
  channel.emit(EVENT_ID, options);
}

export default setCommentsConfig;
