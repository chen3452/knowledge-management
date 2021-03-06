### 迭代器

`迭代器（iterator） 是一种结构化的模式，用于从一个信息源中以一次一个的方式抽取信息。`

### 概念

JavaScript 原有的表示“集合”的数据结构，主要是数组（Array）和对象（Object），ES6 又添加了Map和Set。这样就有了四种数据集合，用户还可以组合使用它们，定义自己的数据结构，比如数组的成员是Map，Map的成员是对象。`这样就需要一种统一的接口机制（遍历器Iterator），来处理所有不同的数据结构。`

`任何数据结构只要部署 Iterator 接口，就可以完成遍历操作。`

Iterator 的作用有三个：一是为各种数据结构，提供一个统一的、简便的访问接口；二是使得数据结构的成员能够按某种次序排列；三是 ES6 创造了一种新的遍历命令for...of循环，Iterator 接口主要供for...of消费。

Iterator 的遍历过程是这样的。

1. 创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。

1. 第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员。

1. 第二次调用指针对象的next方法，指针就指向数据结构的第二个成员。

1. 不断调用指针对象的next方法，直到它指向数据结构的结束位置。

每一次调用next方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含value和done两个属性的对象。其中，value属性是当前成员的值，done属性是一个布尔值，表示遍历是否结束。

``` js
// 遍历器接口（Iterable） === Iterator函数
interface Iterable {
  [Symbol.iterator]() : Iterator,
}

// 指针对象（Iterator）  
// 一个迭代器的next方法能够可选地接受一个或多个参数。大多数内建的迭代器不会实施这种能力，虽然一个Generator的迭代器绝对会这么做。
// 一个迭代器的return、throw方法在大多数内建的迭代器上都没有被实现，是可选的方法。但是，它们在Generator的上下文环境中很有用。
interface Iterator {
  next(value?: any) : IterationResult,    
  return()？: 停止迭代并返回IteratorResult   向迭代器发送一个隐含的完成信号，暗示着迭代器的完全停止。可以用于通知生产者（应答next(..)调用的迭代器）去实施一些可能的清理作业，比如释放/关闭网络，数据库，或者文件引用资源。
  throw()？: 通知错误并返回IteratorResult    向迭代器发送一个异常/错误信号，
}

// next方法返回值
interface IterationResult {
  value: any,
  done: boolean,
}
```

### 原生具备 Iterator 接口的数据结构

1. Array
1. Map
1. Set
1. String
1. TypedArray
1. 函数的 arguments 对象
1. NodeList 对象

### 自定义Iterator函数

`Symbol.iterator属性本身是一个函数，就是当前数据结构默认的遍历器生成函数。`当可遍历数据在被遍历的时候都会调用Symbol.iterator函数，返回Iterator对象。所以，如果我们修改了可遍历数据的Symbol.iterator函数，那么就可以修改可遍历数据的默认遍历行为。

通常情况下，我们也只会对对象添加Iterator接口。

``` js
const obj = {
    name: 'xinxin',
    age: 11,
    color: 'yellow',
   
    // 通过给对象添加Iterator接口，让对象也可以通过for...of...来遍历
    [Symbol.iterator](){
        return {
            value: 0,
            next() {
                const keys = Object.keys(obj);
                const len = keys.length;
                
                // 每次遍历返回对象的属性名
                if(this.value < len){  // 通常写自定义Iterator函数的时候注意好这个this的指向就可以了
                    return {
                        value: keys[this.value++]
                    }
                }else {
                    return {
                        done: true
                    }
                }
            }
        }
    }
}

for (var value of obj) {
    console.log(value);  // name age color
}
```

### for...of...的等价物

``` js
const m = new Map([
    [Symbol('xinxin'), 'xinxin']，
    [Symbol('ck'), 'ck']，
])

const iterator = m.entries();

for(let i of iterator){
    console.log(i)
}

========================

for(let i, res; (res = iterator.next()) && !res.done;){
    i = res.value;
    console.log(i)
}
```

export const IteratorMeta = {
  anchors: [
    '迭代器',
    '概念',
    '原生具备 Iterator 接口的数据结构',
    '自定义Iterator函数',
    'for...of...的等价物',
  ]
}
