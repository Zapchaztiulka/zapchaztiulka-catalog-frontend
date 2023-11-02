const EXTENSIONS = ["png", "jpg", "jpeg", "gif", "tiff", "bpg", "svg"];

export const getExtension = (filename) => {

   const nameExtension = filename.split('.').pop();
   const check = EXTENSIONS.some(item => item === nameExtension);
   return check;
}

export const customStylingClass = {
   defaultClass: "modal-wrapper",
   customClass: "modal-wrapper-custom",
}