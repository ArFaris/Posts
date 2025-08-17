import _ from 'lodash';

export const posts = _.times(100, (i) => ({
  nick: `post-nick-${i}`,
  name: `Post ${i}`,
  description: `Description of post ${i}...`,
  text: _.times(100, (j) => `<p>Text paragraph ${j} of idea ${i}</p>`).join(''),
}));
