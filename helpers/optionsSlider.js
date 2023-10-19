export  const mainOptions = {
  rewind: true,
  pagination: true,
  arrows: false,
  mediaQuery: "min",
  breakpoints: {
    320: {
      height: "192px",
    },
    375: {
      height: "228px",
    },
    600: {
      height: "180px",
    },
    768: {
      height: "226px",
    },
    1024: {
      height: "226px",
    },
    1200: {
      height: "382px",
    },
  },

  classes: {
    pagination: "splide__pagination custom-pagination",
    page: "splide__pagination__page your-class-page",
  },
};

export const optionThumb = {
  type: "slide",
  arrows: false,
  perPage: 3,
  perMove: 1,
  gap: "10px",
  pagination: false,
  mediaQuery: "min",
  breakpoints: {
    600: {
      height: "57px",
    },
    768: {
      height: "80px",
    },
    1200: {
      height: "94px",
    },
    1920: {
      perPage: 4,
    },
  },
};

export 
  const modalOptions = {
    loop: false,
    pagination: true,
    arrows: true,
    mediaQuery: "min",
    breakpoints: {
      320: {
        height: "192px",
      },
      375: {
        height: "228px",
      },
      1024: {
        height: "360px",
      },
    },
    classes: {
      pagination: "splide__pagination custom-modal-pagination",
      page: "splide__pagination__page your-class-page",
    },
  };