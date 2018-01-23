const publicFun = {};

var mapArr = require.context('./', true, /\.\/(?!index)([\w]{0,})\.js$/).keys();
mapArr.map((key) => {
  var name = key.match(/\.\/([\w]{0,})\.js$/);
  if (name && name[1] !== 'index')
    publicFun[name[1]] = require(key + "").default;
});


export default publicFun;

