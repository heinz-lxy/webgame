/**
 * @class cursor
 * 
 * 
 * @example
 * 1. 引用 
 * import xsjT from "xsjT";
 * let cursor = xsjT.cursor;
 * 
 * 1、创建输入状态
 * @param {Object} inputBox 需要进入输入状态的输入框
 * @param {Object} text 输入框中的text组件
 * cursor.change(inputBox, text);
 * 2、删除输入状态
 *  cursor.visible();
 */
class Cursor{ 
    constructor() { 
    }
    init() { 
        this.cursor = this.inputBox.addChild(
            this.inputBox.game.add.sprite(0, 0, 'cursor')
        );

        this.cursor.animations.add('run');
        this.cursor.animations.play('run', 2, true);
        this.cursor.y = (this.inputBox.height - this.cursor.height) / 2;
        if (!this.text.width) {
            this.cursor.x = (this.inputBox.width - this.cursor.width) / 2;
        } else {
            this.cursor.x = (this.inputBox.width - this.cursor.width) / 2+this.text.width/2+5;
        }

        this.thisNode = this.wrapper.addChild(this.inputBox.game.add.graphics(0, 0));
        
        this.thisNode.lineStyle(5, 0x2185be, 1);
        this.thisNode.beginFill(0xffffff, 0);

        this.thisNode.drawRoundedRect(0, 0, this.inputBox.width, this.inputBox.height, 5);  
    }

    change(inputBox, wrapper, text) {
        this.wrapper = wrapper;

        this.cursor && this.cursor.destroy();
        this.thisNode && this.thisNode.destroy();
        this.inputBox = inputBox;
        this.text = text;
        this.init();
    }
    visible() { 
        this.cursor.visible = false;
        this.thisNode.clear();
    }
}

export default new Cursor();
