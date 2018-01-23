import t from '../library/tookit.js';

export default class Render{
	constructor(jsonData){
		t.images(jsonData.imageJson);
		t.texts(jsonData.textJson);
	}
}