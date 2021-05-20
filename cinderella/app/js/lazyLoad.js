const lazyLoad = () => {
    const objects = $('.asyncImage');
    Array.from(objects).map((item) => {
      const img = new Image();
      const src = isMobileDevice() ? item.dataset.mobilesrc : item.dataset.src;
      img.src = src;
      img.onload = () => {
        $(item).removeClass('asyncImage');
        return item.src = src;
      };
    });
};

$(".carouselWrapper .carouselItem img").on("click",(e) => {
	lazyLoad();
});