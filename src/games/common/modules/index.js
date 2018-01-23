let modules = {};

let filenames = require.context('./', true, /\.\/(?!index)(\w+)\.js$/).keys();
filenames.map(filename => {
  let name = filename.match(/\.\/(\w+)\.js$/);
  if (name && name[1] !== 'index')
    modules[name[1]] = require(filename + "").default;
});

export default modules;
