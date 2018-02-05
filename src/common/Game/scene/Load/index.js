import t from 'tookit';

export default class Load {
  constructor(resources, states) {
    this.resources = resources;
    this.states = states;
  }
  preload() {
    const {game, resources} = this;
    const {load} = game;

    function adapt(fn){
      return function(...args){
        let path = args[1];
        if (path.match(/assets/)) {
          path = require('games/' + path);
          args[1] = path;
        } else if(path.match(/common/)){
          path = path.replace('\.\.\/','');
          path = require('games/' + path);
          args[1] = path;
        }
        
        fn.apply(load, args); 
      }
    }

    ['image', 'spritesheet', 'audio'].forEach(name => {
      load[name] = adapt(load[name]);
    })

    game.stage.backgroundColor = '#e6f4ff';
    let progressText = t.text(game, {
      x:1334 / 2, y:500, content:'0%', size:'40px', color:'#000'
    });
    progressText.anchor.setTo(0.5, 0.5); 

    const [car, exhaust, cloud1, cloud2, prog] = t.sprite(game, [
      {x:281, y:750 / 2 - 108, name:'load_car'},
      {x:271, y:750 / 2 - 130, name:'load_exhaust'},
      {x:347, y:180, name:'load_cloud1'},
      {x:986, y:142, name:'load_cloud2'},
      {x:1334 / 2 - 772 / 2, y:750 / 2, name:'load_progressbar1'}
    ]);
    t.moveTo(game, cloud2, {x:1086},5000);
    t.moveTo(game, cloud1, {x:447},5000);

    game.load.onFileComplete.add(progress => {
      car.x = prog.x + progress * 6.1; 
      exhaust.animations.add('load_scissors1', [0, 1, 2, 3], 10, true).play();
      exhaust.x = car.x - 120;
      game.load.setPreloadSprite(t.sprite(game,{
        x:1334 / 2 - 760 / 2, y:750 / 2 + 6, name:'load_progressbar'
      })); 
      progressText.text = '加载中' + progress + '%';
    });

    resources.preload();
  }
  create() {
    const {states} = this;

    this.game.state.add("Game", states);
    this.game.state.start("Game");
  }
  update() {}
  render() {}
}






