export const buildCloudinaryURL = (title) => {
  const url = `https://res.cloudinary.com/theworstdev/image/upload/l_Gradient/l_text:Montserrat_64_black:${title},c_fit,g_center,w_800,fl_cutter,fl_layer_apply/v1637878922/social-card-twd_ahsoib.png`;

  fetch(url);

  return url;
};
