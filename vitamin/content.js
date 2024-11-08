// URL of the replacement image
const replacementImageUrl = "https://imagedelivery.net/5l14pzvHSLf_qA56HVIXfg/02e4698f-32ca-48a0-3ba8-e39d96720200/public";

// Function to replace all images on the page
function replaceImages() {
  // Target Twitter-specific image containers
  const images = document.querySelectorAll('img[src*="pbs.twimg.com"], img[src*="abs.twimg.com"]');
  images.forEach((img) => {
    img.src = replacementImageUrl;
    img.srcset = '';
  });
}

// Function to replace background images
function replaceBackgroundImages() {
  const elements = document.querySelectorAll('[style*="background-image"]');
  elements.forEach((el) => {
    const bgImage = window.getComputedStyle(el).backgroundImage;
    if (bgImage && bgImage !== 'none' && (bgImage.includes('twimg.com'))) {
      el.style.backgroundImage = `url("${replacementImageUrl}")`;
    }
  });
}

// Initial replacement when the script runs
replaceImages();
replaceBackgroundImages();

// Observe the DOM for new images (useful for Twitter's infinite scrolling)
const observer = new MutationObserver(() => {
  replaceImages();
  replaceBackgroundImages();
});

// Start observing the document body for added nodes
observer.observe(document.body, { childList: true, subtree: true });
