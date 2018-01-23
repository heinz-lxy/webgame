export default { 
    createWave: function (vars ,x, y, img, v, w) { //生成波浪fn    传入位置，图片，波动幅度，图片宽度 
        var pointNum = v;
        var count = 0;
        var length = w / pointNum;
        var points = [];
        for (var i = 0; i < pointNum; i++) {
            points.push(new Phaser.Point(i * length, 0));
        };
        var rope = vars.game.add.rope(x, y, img, null, points);
        rope.scale.set(1.2);
        rope.updateAnimation = function () {
            count += 0.1;
            for (var i = 0; i < this.points.length; i++) {
                this.points[i].y = Math.sin(i * 0.5 + count) * pointNum;
            }
        };
    },
    checkOverlap: function (spriteA, spriteB) {       	//检测相交fn  参数是两个精灵
        var boundsA = spriteA.getBounds();
        var boundsB = spriteB.getBounds();
        return Phaser.Rectangle.intersects(boundsA, boundsB);
    },
    fallMove: function (vars ,item, g, wave, x, y, isRotation) {//---抛物线运动fn
        vars.game.physics.startSystem(Phaser.Physics.P2JS);  //启动物理引擎  
        vars.game.physics.p2.gravity.y = g;       		 //设置垂直方向重力
        vars.game.physics.p2.restitution = wave;         //设置衰退的幅度
        vars.game.physics.p2.enable(item);               //给物体添加物理系统
        item.body.fixedRotation = isRotation;            //是否允许物体旋转         
        item.body.velocity.x = x;
        item.body.velocity.y = y;
    },
    sp: function (vars ,x, y, src, father) {
        return father.addChild(vars.game.add.sprite(x, y, src))
    },
    preWord: function (vars,ax, ay, img, bx, by, txt, json) {                                // 1个对话的序幕  参数图片位置 图片   文字位置  文字内容
        var _this = this;
        var txts = txt;
        var staBg0 = vars.game.add.sprite(0, 0, "pauseBg");
        var staPreBox = staBg0.addChild(vars.game.add.sprite(70, 500, "backbox"));
        var txt = staPreBox.addChild(vars.game.add.text(450, 150, "点任意处继续" ,{fill:"#333" , font:"30px"}));
        var npc = staPreBox.addChild(vars.game.add.image(ax, ay, img));
        var txt2 = staPreBox.addChild(vars.game.add.text(bx, by, txts, json));
        staBg0.inputEnabled = true;
        staBg0.events.onInputDown.add(function () {
            staBg0.visible = false;
        })
    }

}