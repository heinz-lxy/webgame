let animations = {};

let filenames = require.context('./', true, /\.\/animations\/(\w+)\/$/).keys();
filenames.map(filename => {
	let name = filename.match(/\.\/animations\/(\w+)/)[1];
	animations[name] = require(filename+'index.js').default;
});

export default animations;
