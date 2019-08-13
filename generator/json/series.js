const faker = require('faker');

const coverImages = [
  'https://sutrahr.com/wp-content/uploads/2016/03/stand-alone-1280-720-3835.jpg',
  'http://www.wallcoo.net/cartoon/Apofiss_Painting_Wallpapers/wallpapers/1280x720/ignate%20paper%20by%20apofiss.jpg',
  'https://cdn.pixabay.com/photo/2019/08/09/21/52/london-4395917_1280.jpg',
  'https://cdn.pixabay.com/photo/2018/11/14/13/05/mont-hwan-3815215_1280.jpg',
  'https://cdn.pixabay.com/photo/2019/02/02/09/18/the-night-sky-3970364_1280.jpg',
  'https://cdn.pixabay.com/photo/2017/05/18/21/11/healing-2324790_1280.jpg',
  'https://cdn.pixabay.com/photo/2019/08/11/18/17/house-4399573_1280.jpg',
  'https://cdn.pixabay.com/photo/2016/12/05/21/55/super-woman-1885016_1280.jpg',
  'https://cdn.pixabay.com/photo/2018/03/26/14/07/space-3262811_1280.jpg',
  'https://cdn.pixabay.com/photo/2013/07/12/15/24/boxing-ring-149840_1280.png',
];


const generateSeriesJson = () => ({
  title: faker.lorem.sentence(),
  isRecommend: false,
  cntStories: 0,
  coverImage: coverImages[faker.random.number() % coverImages.length],
});


const series = Array.from({ length: 15 }).map(generateSeriesJson);

export default series;
