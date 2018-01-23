//资源加载js
import vars from './globalData.js';
export default {
  preload: function() {
    vars.game.load.spritesheet('box','assets/box.png',73.75,73,4);
    // vars.game.load.image('cursor', '');

    vars.game.load.spritesheet("cursor", "../common/resources/image/cursor.png", 6, 38, 2);
    vars.game.load.spritesheet('heart', '../common/resources/image/heart.png', 1334, 750, 53);


    // stateOne
    vars.game.load.image('bubble', 'assets/stateOne/bubble.png'); 
    vars.game.load.image('desk', 'assets/stateOne/desk.png');
    vars.game.load.image('puzzled_girl', 'assets/stateOne/puzzled_girl.png');
    vars.game.load.image('puzzled_girl2', 'assets/stateOne/puzzled_girl2.png');
    vars.game.load.image('seperate_line', 'assets/stateOne/seperate_line.png');
    vars.game.load.image('single_book', 'assets/stateOne/single_book.png');
    vars.game.load.spritesheet('hand', 'assets/stateOne/hand.png',96,95);
    vars.game.load.audio('notice', 'assets/stateOne/notice.mp3'); 
    vars.game.load.image('puzzled_girl3', 'assets/stateOne/puzzled_girl3.png');
    vars.game.load.image('bubble2', 'assets/stateOne/bubble2.png');
    vars.game.load.image('symbol1', 'assets/stateOne/symbol1.png');
    vars.game.load.image('symbol2', 'assets/stateOne/symbol2.png');

    // stateTwo
    vars.game.load.image('book1', 'assets/stateTwo/book1.png');
    vars.game.load.image('request', 'assets/stateTwo/request.png');
    vars.game.load.image('paper', 'assets/stateTwo/paper.png');
    vars.game.load.spritesheet("flip", "./assets/stateTwo/flip.png", 850, 687, 25);

    // stateFour
    vars.game.load.image('book2', 'assets/stateFour/book2.png');
    vars.game.load.image('board', 'assets/stateFour/board.png');
    vars.game.load.image('peaches', 'assets/stateFour/peaches.png');
    vars.game.load.image('female_monkey1', 'assets/stateFour/female_monkey1.png');    
    vars.game.load.image('female_monkey2', 'assets/stateFour/female_monkey2.png');
    vars.game.load.image('male_monkey1', 'assets/stateFour/male_monkey1.png');
    vars.game.load.image('male_monkey2', 'assets/stateFour/male_monkey2.png');
    vars.game.load.image('cat1', 'assets/stateFour/cat1.png');
    vars.game.load.image('cat2', 'assets/stateFour/cat2.png');
    vars.game.load.image('fish_tank', 'assets/stateFour/fish_tank.png');
    vars.game.load.image('pile1', 'assets/stateFour/pile1.png');
    vars.game.load.image('pile2', 'assets/stateFour/pile2.png');
    vars.game.load.image('balls', 'assets/stateFour/balls.png');

    //任务
    vars.game.load.image('taskPanel', '../common/resources/image/task/taskPanel.png');
    vars.game.load.spritesheet('taskBtn', '../common/resources/image/task/taskBtn.png', 170, 70, 3);

    //倒计时
    vars.game.load.image('ready', '../common/resources/image/ready/ready.png');
    vars.game.load.image('readyGo', '../common/resources/image/ready/readyGo.png');
    vars.game.load.image('readyOne', '../common/resources/image/ready/readyOne.png');
    vars.game.load.image('readyTwo', '../common/resources/image/ready/readyTwo.png');
    vars.game.load.image('readyThree', '../common/resources/image/ready/readyThree.png');
    vars.game.load.image('readyBright', '../common/resources/image/ready/readyBright.png');

    //过关
    vars.game.load.image('mask', '../common/resources/image/common/pauseBg.png');
    vars.game.load.image('next_box', '../common/resources/image/success/next_box.png');
    vars.game.load.image('next_button', '../common/resources/image/success/next_button.png');
    vars.game.load.image('next_text', '../common/resources/image/success/next_text.png');
    vars.game.load.image('next_textbox', '../common/resources/image/success/next_textbox.png');

    //公共资源
    vars.game.load.image('background', '../common/resources/image/bg/bg_city.jpg');
    vars.game.load.image('bg', '../common/resources/image/bg/bg_scene_city.png');

    //提示
    vars.game.load.image('tips', '../common/resources/image/header/prompt.png', 200, 200);
    vars.game.load.image('backbox', '../common/resources/image/common/dialogBox.png');
    vars.game.load.image('older', '../common/resources/image/header/olderMan.png');
    vars.game.load.image('Button_01', '../common/resources/image/btn/Button_01.png');

    //游戏指引
    vars.game.load.image('pre_box', '../common/resources/image/common/dialogBox.png');
    vars.game.load.image('pauseBg', '../common/resources/image/common/pauseBg.png');
    vars.game.load.image('qiqi', '../common/resources/image/npc/qiqi.png');
    vars.game.load.image('qiqi_yh', '../common/resources/image/npc/qiqi_yh.png');

    // 状态管理
    vars.game.load.image('arc', '../common/resources/image/header/arc.png');
    vars.game.load.spritesheet('return', '../common/resources/image/header/return.png', 244, 107, 2);
    vars.game.load.image('managerBg', '../common/resources/image/header/gameManagerBg.png');
    vars.game.load.spritesheet('pause', '../common/resources/image/header/pause.png', 105, 80, 2);
    vars.game.load.spritesheet('exit', '../common/resources/image/header/exit.png', 105, 80, 2);
    vars.game.load.image('timeBox', '../common/resources/image/header/timeBox.png');
    vars.game.load.spritesheet('pauseack', '../common/resources/image/header/back.png', 90, 90);
    vars.game.load.spritesheet('noBack', '../common/resources/image/header/noBack.png', 90, 90);
    vars.game.load.spritesheet('gradeBox', '../common/resources/image/header/gradeBox.png');
    vars.game.load.spritesheet('gradeBox1', '../common/resources/image/header/gradeBox1.png');
    vars.game.load.spritesheet('gradeBox2', '../common/resources/image/header/gradeBox2.png');

    //键盘
    vars.game.load.spritesheet('confirm', '../common/resources/image/calculator/confirm.png', 183.66, 85, 3);
    vars.game.load.spritesheet('undo', '../common/resources/image/btn/undo.png', 183.66, 85);
    vars.game.load.spritesheet('onMiss', '../common/resources/image/calculator/onMiss.png', 128.5, 86);
    vars.game.load.image('keyBg', '../common/resources/image/calculator/keyBg.png');
    vars.game.load.spritesheet('keyTurn', '../common/resources/image/calculator/keyTurn.png', 70, 158);
    vars.game.load.spritesheet('zero', '../common/resources/image/calculator/0.png', 105, 81, 2);
    vars.game.load.spritesheet('1', '../common/resources/image/calculator/1.png', 105, 81, 2);
    vars.game.load.spritesheet('2', '../common/resources/image/calculator/2.png', 105, 81, 2);
    vars.game.load.spritesheet('3', '../common/resources/image/calculator/3.png', 105, 81, 2);
    vars.game.load.spritesheet('4', '../common/resources/image/calculator/4.png', 105, 81, 2);
    vars.game.load.spritesheet('5', '../common/resources/image/calculator/5.png', 105, 81, 2);
    vars.game.load.spritesheet('6', '../common/resources/image/calculator/6.png', 105, 81, 2);
    vars.game.load.spritesheet('7', '../common/resources/image/calculator/7.png', 105, 81, 2);
    vars.game.load.spritesheet('8', '../common/resources/image/calculator/8.png', 105, 81, 2);
    vars.game.load.spritesheet('9', '../common/resources/image/calculator/9.png', 105, 81, 2);
    vars.game.load.spritesheet('sign', '../common/resources/image/calculator/sign.png', 105, 81, 2);
    vars.game.load.spritesheet('ride', '../common/resources/image/calculator/ride.png', 105, 81, 2);
    vars.game.load.spritesheet('except', '../common/resources/image/calculator/except.png', 105, 81, 2);
    vars.game.load.spritesheet('add', '../common/resources/image/calculator/add.png', 105, 81, 2);
    vars.game.load.spritesheet('sub', '../common/resources/image/calculator/sub.png', 105, 81, 2);

    //   结束页面
    vars.game.load.spritesheet('overBtn', '../common/resources/image/stateOver/reBtn.png', 173.5, 70, 2);
    vars.game.load.spritesheet('notBtn', '../common/resources/image/stateOver/notPlay.png', 173.5, 70, 2);
    vars.game.load.spritesheet('starts', '../common/resources/image/stateOver/starts.png', 150, 150, 15);
    vars.game.load.spritesheet('answer', '../common/resources/image/stateOver/answer.png', 150, 61, 2);
    vars.game.load.spritesheet('scoring', '../common/resources/image/stateOver/scoring.png', 150, 61, 2);
    vars.game.load.spritesheet('timing', '../common/resources/image/stateOver/timing.png', 150, 61, 2);
    vars.game.load.spritesheet('animal1', '../common/resources/image/stateOver/animal1.png', 320, 205, 25);
    vars.game.load.spritesheet('animal2', '../common/resources/image/stateOver/animal2.png', 290, 165, 9);


    vars.game.load.image('stateOverBg', '../common/resources/image/stateOver/stateOverBg.png');
    vars.game.load.image('stateOverS', '../common/resources/image/stateOver/stateOverS.png');
    vars.game.load.image('stateOverA', '../common/resources/image/stateOver/stateOverA.png');
    vars.game.load.image('stateOverB', '../common/resources/image/stateOver/stateOverB.png');
    vars.game.load.image('stateOverC', '../common/resources/image/stateOver/stateOverC.png');
    vars.game.load.image('stateOverD', '../common/resources/image/stateOver/stateOverD.png');
    vars.game.load.image('stateOverNo', '../common/resources/image/stateOver/stateOverNo.png');
    vars.game.load.image('stateOverYes', '../common/resources/image/stateOver/stateOverYes.png');

    //成功
    vars.game.load.spritesheet('overSuccess', '../common/resources/image/stateOver/success.png', 280, 130, 26);
    vars.game.load.spritesheet('cloth', '../common/resources/image/stateOver/cloth.png', 630, 210, 15);


    vars.game.load.image('grayStart', '../common/resources/image/stateOver/grayStart.png');
    vars.game.load.image('particle', '../common/resources/image/stateOver/particle.png');
    vars.game.load.image('gradient', '../common/resources/image/stateOver/gradient.png');

    //失败
    vars.game.load.spritesheet('xue', '../common/resources/image/stateOver/snowflakes.png', 17, 17);
    vars.game.load.image('cloth2', '../common/resources/image/stateOver/cloth2.png');
    vars.game.load.image('tiaozhan', '../common/resources/image/stateOver/tiaozhan.png');
    vars.game.load.image('shibai', '../common/resources/image/stateOver/shibai.png');

    //公共音效
    vars.game.load.audio('click', '../common/resources/audio/click.mp3');
    vars.game.load.audio('true', '../common/resources/audio/true.wav');
    vars.game.load.audio('false', '../common/resources/audio/false.mp3');
    vars.game.load.audio('failure', '../common/resources/audio/failure.mp3');
    vars.game.load.audio('BGM','../common/resources/audio/BGM.mp3');
    vars.game.load.audio('countDown', '../common/resources/audio/countDown.mp3');
    vars.game.load.audio('sucess', '../common/resources/audio/sucess.mp3');
    vars.game.load.audio('gxgc', '../common/resources/audio/gxgc.mp3')
    vars.game.load.audio('flip2', '../common/resources/audio/flip.wav');
  }
}
