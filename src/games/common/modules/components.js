let components = {};

let filenames = require.context('./', true, /\.\/components\/(\w+)\/$/).keys();
filenames.map(filename => {
	let name = filename.match(/\.\/components\/(\w+)/)[1];
	components[name] = require(filename+'index.js').default;
});

export default components;
