//资源加载js
import vars from './globalData.js';
import commonResources from '../common/library/commonResources.js';
export default {
  preload: function() {
    commonResources.load(vars);
    
    // stateOne
    vars.game.load.image('item', 'assets/stateOne/item.png');
    vars.game.load.image('rect', 'assets/stateOne/rect.png');
    vars.game.load.image('board1', 'assets/stateOne/board1.png');
    vars.game.load.image('board2', 'assets/stateOne/board2.png');
    vars.game.load.spritesheet('hand', 'assets/stateOne/hand.png',96,95);

    
    vars.game.load.image('light1', 'assets/stateOne/light1.png');
    vars.game.load.image('light2', 'assets/stateOne/light2.png');
    vars.game.load.image('light3', 'assets/stateOne/light3.png');

    // stateTwo
    vars.game.load.image('sample', 'assets/stateTwo/sample.png');
    vars.game.load.image('l_box', 'assets/stateTwo/l_box.png');
    vars.game.load.image('hundred1', 'assets/stateTwo/hundred1.png');
    vars.game.load.image('ten1', 'assets/stateTwo/ten1.png');
    vars.game.load.image('one1', 'assets/stateTwo/one1.png');
    vars.game.load.image('desk', 'assets/stateTwo/desk.png');

    // stateThree
    vars.game.load.image('thousand', 'assets/stateThree/thousand.png');
    vars.game.load.image('hundred2', 'assets/stateThree/hundred2.png');
    vars.game.load.image('ten2', 'assets/stateThree/ten2.png');
    vars.game.load.image('one2', 'assets/stateThree/one2.png');
    vars.game.load.image('i_box', 'assets/stateThree/i_box.png');

    // stateFour
    vars.game.load.spritesheet('avatar', 'assets/stateFour/avatar.png');
    vars.game.load.image('map', 'assets/stateFour/map.png');
    vars.game.load.image('treasure', 'assets/stateFour/treasure.png');
    vars.game.load.image('treasure2', 'assets/stateFour/treasure2.png');
    vars.game.load.image('closed_map', 'assets/stateFour/closed_map.png',118,384);
  }
}
