export const buildCloudinaryURL = (title) => {
  const url = `https://res.cloudinary.com/theworstdev/image/upload/l_text:Montserrat_64_black:${title},co_rgb:F272AD,c_fit,g_south_west,w_666,x_515,y_300/v1612907767/naruto-social_sufyyi.jpg`;

  fetch(url);

  return url;
};
