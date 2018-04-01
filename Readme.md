# JavaScript异步史
## 同步异步
同步代码
```` javascript
A()
B()
C()
````
异步代码
```` javascript
console.log('同步代码1')
setTimeout(() => {
    console.log('异步代码')
},0)
console.log('同步代码2')
//同步代码1
//同步代码2
//异步代码
````
## callback
```` javascript
A();
ajax('url1', function(){
    B();
    ajax('url2', function(){
        C();
    }
    D();
});
E();

// 下面是答案，你猜对了吗？
// A => E => B => D => C
````