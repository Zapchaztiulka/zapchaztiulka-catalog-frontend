const EXTENSIONS = ["png", "jpg", "jpeg", "gif", "tiff", "bpg", "svg"];

export const getExtension = (filename) => {
   if (filename) {
      const nameExtension = filename.split('.').pop();
      const check = EXTENSIONS.some(item => item === nameExtension);
      return check;
   }
}
