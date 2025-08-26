import { renderThumbnails } from "./render-thumbnails.js";
import { getData } from "./api.js";
import { showDataError } from "./utils/messages.js";
import { initFilters } from "./utils/filters.js";

export async function loadGallery() {
  try {
    const pictures = await getData();
    renderThumbnails(pictures);
    initFilters(pictures);
  } catch (error) {
    showDataError();
    setTimeout(() => {
      const msg = document.querySelector('.data-error');
      if (msg) msg.remove();
    }, 5000);
  }
}
