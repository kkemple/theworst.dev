export const buildCloudinaryURL = (title) => {
  const url = `https://res.cloudinary.com/theworstdev/image/upload/l_Gradient/l_text:Montserrat_64_black:${title},c_fit,g_center,w_800,fl_cutter,fl_layer_apply/Background`;

  fetch(url);

  return url;
};

https://res.cloudinary.com/theworstdev/image/upload/l_Gradient/l_text:Montserrat_64_black:Test,c_fit,g_center,w_800,fl_cutter,fl_layer_apply/Background
