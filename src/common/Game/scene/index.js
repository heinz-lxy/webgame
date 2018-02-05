
const scene = {};

var mapArr = require.context('./', true, /[\w]{0,}\.js$/).keys();

mapArr.map((key) => {
  var name = key.match(/\.\/([\w]{0,})\//);
  if (name && name[1] !== 'index')
    scene[name[1]] = require(key + "").default;
});


export default scene;
