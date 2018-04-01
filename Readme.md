# JavaScript异步史
## 同步异步
## 同步代码
```` javascript
A()
B()
C()
````
## 异步代码
```` javascript
console.log('同步代码1')
setTimeout(() => {
    console.log('异步代码')
},0)
console.log('同步代码2')
````