import deepCopy from "./deepCopy.js";


/**
 * 在原型链上查找某个属性特性描述对象
 * @param  {Object} obj  查找的对象
 * @param  {String} prop 查找的属性，名字符串描述
 * @return {Object}      返回属性描述特性对象
 */
function getPrototype(obj, prop) {
  if (!obj) return undefined;
  var desc = Object.getOwnPropertyDescriptor(obj, prop);
  if (!desc) {
    return getPrototype(Object.getPrototypeOf(obj), prop);
  } else {
    return desc;
  }
}


/**
 * 设置被监听对象中几个属性或者方法为监听模式，可设置回调函数，返回设置监听后的新的对象。
 * @param  {Object}          oldObj   被监听的对象
 * @param  {[String,...]}    props    监听对象中被监听属性的数组集合，每一项为属性名string描述 
 * @param  {{Function}}   callback    被监听属性的回调函数对象集合，通过 [监听对象名]：相应的回调函数 形式添加到对象集合中。对于属性来说要分别设置set和get
 * @return {Object}                   设置监听后的新的对象
 */
function toObserver(oldObj, props, callback) {
  var newObj,
    desc,
    rel;

  //生成一个新的和oldObj一样的对象，具体查看deepCopy
  newObj = oldObj;
  //对每一个需要被监听新的属性执行如下操作
  props.forEach((prop) => {
    //保存原有的属性值为“_”+prop形式，以便于后续操作使用
    newObj["_" + prop] = oldObj[prop];
    //获取该属性的描述
    desc = getPrototype(oldObj, prop);

    //判断该属性是否为可配置的， 如果不可配置说明逻辑业务限制， 不能设置为监听模式，直接返回
    if (desc.configurable === true) {

      //对属性和方法分开处理
      if (typeof oldObj[prop] === "function") {
        //将该方法设置为监听模式
        Object.defineProperty(newObj, prop, {
          //属性特性：是否可写
          wrtiable: desc.writable || true,
          //属性特性：是否可枚举
          enumerable: desc.enumerable,
          //属性特性：是否可配置  
          configurable: desc.configurbale,
          //属性特性：值
          value: function(...arg) {
            //执行原函数
            rel = oldObj[prop].apply(this, arg);

            //执行回调函数
            callback[prop] && callback[prop].apply(this, arg);

            return rel;
          }
        });

      } else {
        //将属性设置为监听模式，无论属性是数据属性还是访问器属性，都转变成访问其属性
        Object.defineProperty(newObj, prop, {
          //访问器属性特性：是否可枚举
          enumerable: desc.enumerable,
          //访问器属性特性：是否可配置
          configurable: desc.configurbale,
          //访问器属性特性：get操作
          get: function() {
            //如果为数据类型属性就直接返回，如果为访问其属性读值时可能先执行某些操作
            //rel = oldObj[_prop];
            rel = newObj["_" + prop];
            //调用该属性的get回调函数
            callback[prop]["get"] && callback[prop]["get"].apply(this);

            return rel;
          },
          //访问器属性特性：set操作
          set: function(newVale) {
            //如果为数据类型属性就直接修改，如果为访问其属性赋值时可能先执行某些操作
            //rel = oldObj[prop] = newVale;
            rel = newVale;
            //对保存的旧值进行修改
            newObj["_" + prop] = newVale;

            //调用该属性的set回调函数
            callback[prop]["set"] && callback[prop]["set"].apply(this, [newObj[prop], newVale]);

            return rel;
          }
        });
      }
    }
  });
  return newObj;
}

export default toObserver;

//测试
// function Product(price, quantity, describe, id) {
//   this._price = price;
//   this._quantity = quantity;
//   this._describe = describe;
//   this._id = id;
// }
// Product.prototype = {
//   constructor: Product,
//   changeQuantity: function(quantity) {
//     this._quantity--;
//   },
//   getPrice: function() {
//     return this._price;
//   },
//   getId: function() {
//     return this._id;
//   }
// };
// function ShopCar(id) {
//   this._productList = {};
//   this._id = id;
//   this.total = 0;
// }
// ShopCar.prototype = {
//   constructor: ShopCar,
//   addProduct: function(product) {
//     if (!this._productList[product.getId]) {
//       this._productList[product.getId] = 0;
//     }
//     this._productList[product.getId]++;
//     this.total += product.getPrice();
//   },
//   removeProduct: function(product) {
//     var productId = product.getId;
//     this._productList[productId]--;
//     this.total -= product.getPrice();
//     if (this._productList[productId] <= 0) {
//       delete this._productList[productId];
//     }
//   }
// }
// var apple = new Product(2.5, 100, {
//   "水果": "苹果"
// }, 1);
// var banana = new Product(4, 100, {
//   "水果": "香蕉"
// }, 2);
// var oriange = new Product(5, 100, {
//   "水果": "橘子"
// }, 3);
// var car1 = new ShopCar(1);
// car1_callback = {
//   addProduct: function(product) {
//     product.changeQuantity();
//   },
//   removeProduct: function(product) {
//     product.changeQuantity();
//   }
// }
// car1 = toObserver(car1, ["addProduct", "removeProduct"], car1_callback);
// car1.addProduct(apple);
// car1.addProduct(apple);
// car1.addProduct(banana);
// car1.addProduct(oriange);
// car1.addProduct(apple);
// console.log(apple._quantity, oriange._quantity, oriange._quantity);
// console.log(car1.total);
// arry_callback = {
//   "join": function() {
//     console.log("join调用");
//   }
// }
// var arr = ["maotr", "wms"];
// var arry_c = observer_obj(arr, Object.getOwnPropertyNames(Array.prototype), arry_callback);
// console.log(arry_c.join("-"));
