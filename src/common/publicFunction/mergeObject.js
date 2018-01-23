/**
 * 传入任意个数的对象， 将这些对象进行合并
 * 相同的属性，后者覆盖前者
 */

function mergeObject(...args) {
  var reO = {};
  args.forEach((o) => {
    if (typeof o !== "object") {
      throw Error("在mergeObject函数中传入的参数都必须为Object类型");
    }
    var attribute = Object.getOwnPropertyNames(o);
    attribute.forEach((a) => {
      reO[a] = o[a];
    });

  });
  return reO;
}

export default mergeObject;
