//资源加载js
import vars from './globalData.js';
import commonResources from '../common/library/commonResources.js';
export default {
  preload: function() {
    commonResources.load(vars);

    // stateOne
    vars.game.load.image('dot', 'assets/stateOne/dot.png'); 
    vars.game.load.image('note', 'assets/stateOne/note.png');
    vars.game.load.image('newspaper', 'assets/stateOne/newspaper.png');

    // stateTwo
    vars.game.load.image('paper', 'assets/stateTwo/paper.png');  
  }
}
