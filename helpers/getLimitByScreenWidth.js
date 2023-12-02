export const getLimitByScreenWidth = (screenWidth) => {
 
    if (screenWidth >= 1920) {
      return 11;
    } else if (screenWidth >= 768) {
      return 8;
    } else if (screenWidth >= 480) {
      return 5;
    } else if (screenWidth >= 375) {
      return 7;
    } else if (screenWidth >= 320) {
      return 5;
    } else {
      return 6;
    }
  
}

export const getNumberOfSpecialCard = screenWidth => {

    if (screenWidth >= 1920) {
      return 10;
    } else if (screenWidth >= 768) {
      return 7;
    } else if (screenWidth >= 480) {
      return 4;
    } else if (screenWidth >= 375) {
      return 5;
    } else if (screenWidth >= 320) {
      return 4;
    } else {
      return 5;
    }
  
};