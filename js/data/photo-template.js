import { getUniquePhotoId } from '../utils/helpers.js';

export function createPhoto({ url, description, hashtags, effect, scale }) {
  return {
    id: getUniquePhotoId(),
    url,
    description: description || '',
    hashtags: hashtags || '',
    likes: 0,
    comments: [],
    effect: effect || 'none',
    scale: scale || 100
  };
}
