import { renderThumbnails } from "./render-thumbnails.js";
import { getData } from "./api.js";
import { showMessage } from "./utils/messages.js";

export async function loadGallery() {
  try {
    const pictures = await getData();
    renderThumbnails(pictures);
  } catch (error) {
    showMessage('data-error');
    setTimeout(() => {
      const msg = document.querySelector('.data-error');
      if (msg) msg.remove();
    }, 5000);
  }
}
