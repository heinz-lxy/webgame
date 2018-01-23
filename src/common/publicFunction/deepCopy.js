/**
这个深度拷贝函数可以实现任何的数据的复制 包括 用户自定义对象 等
传入要复制的值,返回复制后的值

这种复制并不是完美的,对于对象上的[class]内部属性没有被复制,所以不能基于通过
获得[class]内部属性值的方式判断对象的类型.但可以通过判断原型的方式去判断对象的
类型

这个深度复制的思路就是 参考对象的本质就是
属性(方法 特性)[数据类型属性和访问器类型属性], 继承[prototype], 类型[class]
*/

function deepCopy(oldObj) {
  /**
  创建一个newObj作为返回的值,默认为一个空对象
  */
  var newObj = {},
    oldObjPropNames,
    desc,
    value;
  /**
  如果传入的不是对象类型的数据,则直接返回这个值
  所以后面的步骤中oldObj为一个对象类型
  */
  if (typeof oldObj !== "object") return newObj = oldObj;

  /**
  这是newObj的[prototype]为oldObj的[prototype]
  对象最重要的属性是原型,描述了该对象的类型, 这个在复制的时候肯定是首要的.
  */
  Object.setPrototypeOf(newObj, Object.getPrototypeOf(oldObj));

  /**
  获得oldObj自身所有的属性,以便于接下来对自身属性进行复制
  */
  oldObjPropNames = Object.getOwnPropertyNames(oldObj);
  /**
  对获得的oldObj自身属性名数组进行遍历
  */
  oldObjPropNames.forEach((prop) => {
    /**
    接下来开始处理每一个自身的属性
    首先, 得到这个属性的特性描述对象desc,获得value
    */
    desc = Object.getOwnPropertyDescriptor(oldObj, prop);
    value = desc.value;
    /**
    将这个属性连同特性添加到newObj中,后面会对数据类型属性的value做出修改
    */
    Object.defineProperty(newObj, prop, desc);
    /**
    如果value存在证明是数据类型属性,
    如果这个值不是函数并且是一个对象
    要对这个对象进行深度拷贝,
    返回的值覆盖上面预先设置的值
    */
    if (value && typeof value !== "function" && value instanceof Object) {
      newObj[prop] = deepCopy(value);
    }
  });
  return newObj;
}

export default deepCopy;

//测试
// function baby(name){
//   this.name = name;
// }
// baby.prototype = {
//   sleep:function(){
//   }
// }
// function people(name,ads,babyname){
//   this.name = name;
//   this.ads = ads;
//   this.baby = new baby(babyname);
// }

// people.prototype = {
//   eat: function(){
//     console.log(eat);
//   }
// }

// var p = new people("maotr",{pro:"山东",city:"淄博"},"wms");
// var cp = deepCopy(p);

// console.log(p);
// *
// {
//   name: 'maotr',
//   ads: { pro: '山东', city: '淄博' },
//   baby: { name: 'wms' }
// }

// console.log(cp);
// /**
// {
//   name: 'maotr',
//   ads: { pro: '山东', city: '淄博' },
//   baby: { name: 'wms' }
// }
// */

// console.log(p instanceof people , cp instanceof people);//true
// console.log(p.baby instanceof baby , cp.baby instanceof baby);//true
// console.log(p === cp);//false
// console.log(JSON.stringify(p) === JSON.stringify(cp));//true
