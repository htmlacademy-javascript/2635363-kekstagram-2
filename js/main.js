import { getPhotos } from "./data/data.js";
import { renderThumbnails } from "./render-thumbnails.js";

const photoData = getPhotos();
renderThumbnails(photoData);

