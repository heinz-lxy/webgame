//资源加载js
import vars from './globalData.js';
import commonResources from '../common/library/commonResources.js';
export default {
  preload: function() {
    commonResources.load(vars);
    


    const path = '2.2.3.2/assets/';
    // stateOne
    vars.game.load.image('item', path+'stateOne/item.png');
    vars.game.load.image('rect', path+'stateOne/rect.png');
    vars.game.load.image('board1', path+'stateOne/board1.png');
    vars.game.load.image('board2', path+'stateOne/board2.png');
    vars.game.load.spritesheet('hand', path+'stateOne/hand.png',96,95);
    console.log(vars.game.cache._cache.image)
    
    vars.game.load.image('light1', path+'stateOne/light1.png');
    vars.game.load.image('light2', path+'stateOne/light2.png');
    vars.game.load.image('light3', path+'stateOne/light3.png');

    // stateTwo
    vars.game.load.image('sample', path+'stateTwo/sample.png');
    vars.game.load.image('l_box', path+'stateTwo/l_box.png');
    vars.game.load.image('hundred1', path+'stateTwo/hundred1.png');
    vars.game.load.image('ten1', path+'stateTwo/ten1.png');
    vars.game.load.image('one1', path+'stateTwo/one1.png');
    vars.game.load.image('desk', path+'stateTwo/desk.png');

    // stateThree
    vars.game.load.image('thousand', path+'stateThree/thousand.png');
    vars.game.load.image('hundred2', path+'stateThree/hundred2.png');
    vars.game.load.image('ten2', path+'stateThree/ten2.png');
    vars.game.load.image('one2', path+'stateThree/one2.png');
    vars.game.load.image('i_box', path+'stateThree/i_box.png');

    // stateFour
    vars.game.load.spritesheet('avatar', path+'stateFour/avatar.png');
    vars.game.load.image('map', path+'stateFour/map.png');
    vars.game.load.image('treasure', path+'stateFour/treasure.png');
    vars.game.load.image('treasure2', path+'stateFour/treasure2.png');
    vars.game.load.image('closed_map', path+'stateFour/closed_map.png',118,384);
  }
}
