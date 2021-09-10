# CSS 布局

## 1. sticky实现吸顶效果

![](/assets/sticky-navbar.gif)

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    body {
      height: 2000px;
    }

    div {
      /* 
        开启粘性定位,相对定位 + 固定定位的结合
        当小于设置的阈值时,会变成固定定位
        没有小于设置的阈值时,则是相对定位
        
        这里我们设置的阈值是top:0
        当元素的top值小于0,就会变成固定定位
        当元素的top值没有小于0,则是相对定位
      */
      position: sticky;
      top: 0;
      width: 500px;
      height: 100px;
      line-height: 100px;
      background-color: skyblue;
      text-align: center;
      font-size: 20px;
    }
  </style>
</head>

<body>
  <p>1111112312asdasdasdasdasdasd</p>
  <p>1111112312asdasdasdasdasdasd</p>
  <p>1111112312asdasdasdasdasdasd</p>
  <p>1111112312asdasdasdasdasdasd</p>
  <p>1111112312asdasdasdasdasdasd</p>
  <p>1111112312asdasdasdasdasdasd</p>
  <p>1111112312asdasdasdasdasdasd</p>
  <p>1111112312asdasdasdasdasdasd</p>
  <p>1111112312asdasdasdasdasdasd</p>
  <p>1111112312asdasdasdasdasdasd</p>
  <div>粘性定位</div>
  <p>1111112312asdasdasdasdasdasd</p>
  <p>1111112312asdasdasdasdasdasd</p>
  <p>1111112312asdasdasdasdasdasd</p>
  <p>1111112312asdasdasdasdasdasd</p>
  <p>1111112312asdasdasdasdasdasd</p>
  <p>1111112312asdasdasdasdasdasd</p>
  <p>1111112312asdasdasdasdasdasd</p>
  <p>1111112312asdasdasdasdasdasd</p>
  <p>1111112312asdasdasdasdasdasd</p>
  <p>1111112312asdasdasdasdasdasd</p>
</body>

</html>
```

## 2. sticky实现表格固定头-固定列

![](/assets/sticky-table.gif) 

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    .container {
      border: 1px solid #ccc;
      margin-top: 300px;
      width: 700px;
      height: 150px;
      overflow: auto;
    }

    table {
      width: 800px;
      border-collapse: collapse;
    }

    table,
    th,
    td {
      border: 1px solid black;
    }

    .sticky {
      position: sticky;
      left: 0px;
      background-color: #fff;
    }

    .sticky-head {
      position: sticky;
      top: 0;
      background-color: #fff;
      border: 1px solid black;
      z-index: 1;
    }
  </style>
</head>

<body>
  <div class="container">
    <table>
      <thead>
        <tr class="sticky-head">
          <th class="sticky">姓名</th>
          <th>年龄</th>
          <th>性别</th>
          <th>QQ</th>
          <th>邮箱</th>
        </tr>
      </thead>
      <tbody>
        <tr align=" center">
          <td class="sticky">
            郑常富</td>
          <td>23</td>
          <td>男</td>
          <td>1165818269</td>
          <td>zcfpromise@163.com</td>
        </tr>
        <tr align="center">
          <td class="sticky">
            hhz</td>
          <td>18</td>
          <td>女</td>
          <td>????????</td>
          <td>????????@163.com</td>
        </tr>
        <tr align="center">
          <td class="sticky">
            hhz</td>
          <td>18</td>
          <td>女</td>
          <td>????????</td>
          <td>????????@163.com</td>
        </tr>
        <tr align="center">
          <td class="sticky">
            hhz</td>
          <td>18</td>
          <td>女</td>
          <td>????????</td>
          <td>????????@163.com</td>
        </tr>
        <tr align="center">
          <td class="sticky">
            hhz</td>
          <td>18</td>
          <td>女</td>
          <td>????????</td>
          <td>????????@163.com</td>
        </tr>
        <tr align="center">
          <td class="sticky">
            hhz</td>
          <td>18</td>
          <td>女</td>
          <td>????????</td>
          <td>????????@163.com</td>
        </tr>
        <tr align="center">
          <td class="sticky">
            hhz</td>
          <td>18</td>
          <td>女</td>
          <td>????????</td>
          <td>????????@163.com</td>
        </tr>
      </tbody>
    </table>
  </div>
</body>

</html>
```

## 3. 粘性布局

![](/assets/sticky-layout.gif) 

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    * {
      margin: 0;
      padding: 0;
    }

    .app {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .header {
      position: sticky;
      top: 0;
      flex-basis: 100px;
      background-color: skyblue;
    }

    .footer {
      flex-basis: 100px;
      background-color: skyblue;
    }

    .main {
      flex-grow: 1;
      background-color: pink;
    }
  </style>
</head>

<body>
  <div class="app">
    <header class="header"></header>
    <main class="main">
      <p>测试内容</p>
      <p>测试内容</p>
      <p>测试内容</p>
      <p>测试内容</p>
      <p>测试内容</p>
      <p>测试内容</p>
      <p>测试内容</p>
      <p>测试内容</p>
      <p>测试内容</p>
      <p>测试内容</p>
      <p>测试内容</p>
      <p>测试内容</p>
      <p>测试内容</p>
      <p>测试内容</p>
      <p>测试内容</p>
      <p>测试内容</p>
      <p>测试内容</p>
      <p>测试内容</p>
      <p>测试内容</p>
      <p>测试内容</p>
      <p>测试内容</p>
      <p>测试内容</p>
      <p>测试内容</p>
      <p>测试内容</p>
      <p>测试内容</p>
      <p>测试内容</p>
      <p>测试内容</p>
      <p>测试内容</p>
      <p>测试内容</p>
      <p>测试内容</p>
      <p>测试内容</p>
      <p>测试内容</p>
      <p>测试内容</p>
      <p>测试内容</p>
      <p>测试内容</p>
      <p>测试内容</p>
      <p>测试内容</p>
      <p>测试内容</p>
      <p>测试内容</p>
      <p>测试内容</p>
      <p>测试内容</p>
      <p>测试内容</p>
      <p>测试内容</p>
      <p>测试内容</p>
      <p>测试内容</p>
      <p>测试内容</p>
      <p>测试内容</p>
      <p>测试内容</p>
      <p>测试内容</p> 
      <p>测试内容</p>
    </main>
    <footer class="footer"></footer>
  </div>
</body>

</html>
```

## 4. 溢出项布局

![](/assets/ellipse-layout.gif) 

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    .app {
      width: 500px;
      height: 100px;
      display: flex;
      align-items: center;
      background-color: pink;
    }

    .app div {
      width: 100px;
      height: 80px;
      background-color: skyblue;
      margin-right: 10px;
      /* 设置为不收缩，默认值为1，会收缩达到等比分配的效果，这里我们设置不收缩,不要等比分配 */
      flex-shrink: 0;
    }
  </style>
</head>

<body>
  <div class="app">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</body>

</html>
```

## 5. grid布局(最强大的CSS布局)

- 先看看grid布局可以做什么吧

  ![](/assets/grid-yanshi1.png) 

  ![](/assets/grid-yanshi2.png) 

  ![](/assets/grid-yanshi3.png) 

  ![](/assets/grid-yanshi4.png)   

  ![](/assets/grid-yanshi5.png) 

  - 小米的自适应列

  ![](/assets/grid-yanshi6.png) 

  ![](/assets/grid-yanshi7.png) 

  ![](/assets/grid-yanshi8.jpg) 

  

### 5.1 兼容性

![](/assets/grid-jianrong.png) 

### 5.2 容器和项目

- 采用网格布局的区域，称为"容器"（container）。容器内部采用网格定位的子元素，称为"项目"（item）

  ```html
  <div>
    <div><p>1</p></div>
    <div><p>2</p></div>
    <div><p>3</p></div>
  </div>
  ```

- 上面代码中，最外层的`<div>`元素就是容器，内层的三个`<div>`元素就是项目

::: warning
项目只能是容器的顶层子元素，不包含项目的子元素，比如上面代码的`<p>`元素就不是项目。Grid 布局只对项目生效
:::

### 5.3 行、列、单元格

> 称为"行"（row），垂直区域称为"列"（column）

- 行（row）: 容器里面的水平区域
- 列（column）: 容器里面的垂直区域
- 单元格（cell）: 行和列的交叉区域
- `n`行和`m`列会产生`n x m`个单元格。比如，3行3列会产生9个单元格

### 5.4 容器属性

#### 5.4.1 display: grid

> `display: grid` ：指定一个容器采用网格布局

::: warning
设为网格布局以后，容器子元素（项目）的float、display: inline-block、display: table-cell、vertical-align和column-*等设置都将失效。
:::

#### 5.4.2 grid-template-columns

#### 5.4.2 grid-template-rows

> `grid-template-columns` ：定义每一列的列宽
>
> `grid-template-rows`：定义每一行的行高

```css
.container {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
}
```

`上面代码`指定了一个三行三列的网格，列宽和行高都是`100px`

![](/assets/grid-fr1.png) 

除了使用`px`单位，还可以使用百分比

```css
.container {
  display: grid;
  grid-template-columns: 33.33% 33.33% 33.33%;
  grid-template-rows: 33.33% 33.33% 33.33%;
}
```

#### 5.4.3 repeat()

> `repeat()`：有时候，重复写同样的值非常麻烦，尤其网格很多时。这时，可以使用`repeat()`函数，简化重复的值。上面的代码用`repeat()`改写如下

```css
.container{
    display:grid;
    grid-template-columns:repeat(3,33.33%);
    grid-template-rows:repeat(3,33.33%);
}
```

`repeat()`接受两个参数，第一个参数是重复的次数（上例是3），第二个参数是所要重复的值

#### 5.4.4 fr单位

> `fr 单位`：为了方便表示比例关系，网格布局提供了`fr`关键字（fraction 的缩写，意为"片段"）。如果两列的宽度分别为`1fr`和`2fr`，就表示后者是前者的两倍

```css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
```

`上面代码`表示两个相同宽度的列

![](/assets/grid-fr1.png) 

`fr`可以与绝对长度的单位结合使用，这时会非常方便

```css
.container {
  display: grid;
  grid-template-columns: 80px 1fr 2fr;
}
```

![](/assets/grid-fr-mixin.png) 

`上面代码`表示，第一列的宽度为80像素，第二列的宽度是第三列的一半

`grid-template-columns`属性对于网页布局非常有用。两栏式布局只需要一行代码

```css
.container {
  display: grid;
  grid-template-columns: 70% 30%;
}
```

![](/assets/grid-two-layout.png) 

#### 5.4.5 网格间隙

> `grid-row-gap`：设置行与行的间隔（行间距）(将被废弃)
>
> `grid-column-gap`：设置列与列的间隔（列间距）(将被废弃)
>
> `grid-gap`：`grid-row-gap`和`grid-column-gap`的合并简写形式(将被废弃)
>
> `gap`:`grid-row-gap`和`grid-column-gap`的合并简写形式（推荐）

```css
.container {
  grid-row-gap: 5px;
  grid-column-gap: 10px;
}
```

![](/assets/grid-gap.png) 

```css
// 以上代码可以用下方代码简写
.container{
 grid-gap:5px 10px;   
}

// 建议写法
.container{
    gap:5px 10px;
}
```

::: warning

gap省略了第二个值，浏览器认为第二个值等于第一个值

:::

#### 5.4.6 grid-template-areas

> `grid-template-areas`：给开启`grid`布局的**容器**设置
>
> `grid-area`：给开启`grid`布局的容器下的**项目**设置
>
> 网格布局允许指定"区域"（area），一个区域由单个或多个单元格组成。`grid-template-areas`属性用于定义区域

```css
.container {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
  grid-template-areas: 
      'a b c'
      'd e f'
      'g h i';
}
.item1{
    grid-area:a;
}
.item2{
    grid-area:b;
}
.item3{
    grid-area:c;
}
.item4{
    grid-area:d;
}
.item5{
    grid-area:e;
}
.item6{
    grid-area:f;
}
.item7{
    grid-area:g;
}
.item8{
    grid-area:h;
}
.item9{
    grid-area:i;
}
```

`上面代码`先划分出9个单元格，然后将其定名为`a`到`i`的九个区域，分别对应这九个单元格

```css
// 多个单元格合并成一个区域的写法如下(合并单元格)
grid-template-areas:
'a a a'
'b b b'
'c c c';
```

#### 5.4.7 实现三栏布局-中间区域优先加载

![](/assets/grid-sanlan-layout.png) 

- 使用`grid`布局仅需几行代码就可以搞定

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    .container {
      width: 500px;
      height: 500px;
      margin: 100px auto;
      border: 1px solid #ccc;
      box-sizing: border-box;
      display: grid;
      grid-template-columns: 100px auto 100px;
      grid-template-areas: "left main right";
      gap: 10px;
    }

    .main {
      grid-area: main;
    }

    .left {
      grid-area: left;
    }

    .right {
      grid-area: right;
    }

    .container>div {
      background-color: skyblue;
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="main">main...</div>
    <div class="left">left</div>
    <div class="right">right</div>
  </div>
</body>

</html>
```

