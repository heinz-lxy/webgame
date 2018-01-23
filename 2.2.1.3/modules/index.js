let modules = {};

let filenames = require.context('./', true, /\.\/(?!index)([\w]{0,})\.js$/).keys();
filenames.map(filename => {
  let name = filename.match(/\.\/([\w]{0,})\.js$/);
  if (name && name[1] !== 'index')
    modules[name[1]] = require(filename + "").default;
});

export default modules;
