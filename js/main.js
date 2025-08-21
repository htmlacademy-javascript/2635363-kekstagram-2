import { getPhotos } from "./data/data.js";
import { renderThumbnails } from "./render-thumbnails.js";
import './form/form.js';
import './form/scale.js';
import './form/effects.js';

const photoData = getPhotos();
renderThumbnails(photoData);

