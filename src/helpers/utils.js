import queryString from 'query-string';

import { RegexpReplace } from './constants';

export const replacerKindStory = (kind, story) => {
  const replacer = value => value.replace(RegexpReplace, '_');
  return `${replacer(kind)}/${replacer(story)}`;
};

export const getParams = () => queryString.parse(window.location.search);

export const getKindAndStory = () => (
  replacerKindStory(getParams().selectedKind, getParams().selectedStory)
);
