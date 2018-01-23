let animations = {};

let filenames = require.context('./', true, /\.\/animations\/(?!index)([\w]{0,})\.js$/).keys();
filenames.map(filename => {
  let name = filename.match(/\.\/animations\/([\w]{0,})\.js$/);
  if (name && name[1] !== 'index')
    animations[name[1]] = require(filename + "").default;
});

export default animations;
