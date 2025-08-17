import { getPhotos } from "./data/data.js";
import { renderThumbnails } from "./render-thumbnails.js";
import './form.js';

const photoData = getPhotos();
renderThumbnails(photoData);

