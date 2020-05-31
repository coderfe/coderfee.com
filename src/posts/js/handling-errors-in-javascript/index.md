---
title: 『译』JavaScript 错误处理权威指南
date: 2018-12-16
path: '/handling-errors-in-javascript'
tldr: 错误并不可怕。通过这些错误我们可以了解哪些事情不能做，以及在下次遇到这种情况时，如何更好地处理。
tags: ['JavaScript', '译文']
cover: '../cover.png'
---

> 原文链接：[Handling Errors in JavaScript: The Definitive Guide](https://levelup.gitconnected.com/the-definite-guide-to-handling-errors-gracefully-in-javascript-58424d9c60e6)

这篇文章将分为三个部分。首先，我们会看一下常规错误；之后，我们会集中梳理一下后端（Node.js 和 Express.js）中的错误处理；最后，我们会看看在 React.js 中如何处理错误。我选择这些框架是因为它们都是当下最受欢迎的，但是，你应该能够很容易地将这些新知识应用到其它框架里面去。

完整的项目示例参见 [GitHub][full-project-sample]。

## JavaScript 常规错误处理

`throw new Error('something went wrong!')`——在 JavaScript 中创建一个 Error 实例，并且**中断执行**脚本，除非你事先处理了这个错误。如果你的职业生涯是以 JavaScript 开发者作为开端，你自己很可能不会去这样做，而你会在其他库（或者运行时）看到，例如：`ReferenceError: fs is not defined` 或者类似的错误。

### Error 对象

Error 对象为我们提供了两个内置属性。第一个是 `message`，就是你传递给 Error 构造函数的参数。例如：`new Error('This is message')`，这样的话就可以通过 `message` 属性来访问：

```javascript
const myError = new Error('please improve your code');
console.log(myError.message); // please improve your code
```

第二个是非常重要的属性是错误堆栈。你可以通过 `stack` 属性来访问它。错误堆栈会给你一些哪些文件导致发生错误的历史记录（调用堆栈）。堆栈还包括顶部的信息，然后紧接着是实际堆栈，以最近的错误或错误隔离点开始，然后转到最外层的“负责”文件。

```
Error: please improve your code
  at Object.<anonymous> (/Users/gisderdube/Documents/_projects/hacking.nosync/error-handling/src/general.js:1:79)
  at Module._compile (internal/modules/cjs/loader.js:689:30)
  at Object.Module._extensions..js (internal/modules/cjs/loader.js:700:10)
  at Module.load (internal/modules/cjs/loader.js:599:32)
  at tryModuleLoad (internal/modules/cjs/loader.js:538:12)
  at Function.Module._load (internal/modules/cjs/loader.js:530:3)
  at Function.Module.runMain (internal/modules/cjs/loader.js:742:12)
  at startup (internal/bootstrap/node.js:266:19)
  at bootstrapNodeJSCore (internal/bootstrap/node.js:596:3)
```

### 抛出并处理错误

目前，单独的 Error 实例不会出现任何问题。比如： `new Error('...')` 不会执行任何操作。当 `throw Error` 时会变得有趣。接着，就像之前说的，你的脚本会中断执行，除非你在代码中已经进行了处理。记住，即使你手动抛出错误，也无关紧要，它会被第三方库、运行时（Node 或浏览器）抛出。下面让我们来看看在不同场景中如何处理错误。

#### try...catch

这是最简单，也是经常最容易被忘记的处理错误的一种方式——由于 `async/await` 的出现，它的用途也更加多样。看看下面的例子，它可以用来捕获各种**同步**代码错误：

```javascript
const a = 5;

try {
  console.log(b); // b 未定义，抛出错误
} catch (err) {
  console.error(err); // 打印错误堆栈
}

console.log(a); // 5
```

如果不把 `console.log(b)` 放在 `try...catch` 语句块中的话，脚本就会中断执行。

#### ...finally()

有时必须要执行一些代码，无论有没有错误。这时你可以选择第三种方式，即 `try...catch` 的可选语句块 `finally`。它和在 `try...catch` 语句块后写一行代码的作用相同，但有些情况下非常有用。

```javascript
const a = 5;

try {
  console.log(b); // b 未定义，抛出错误
} catch (err) {
  console.error(err); // 打印错误堆栈
} finally {
  console.log(a); // 5
}
```

#### 异步——回调

异步是你在 JavaScript 中必须要去考虑的一件事情。假设你拥有一个异步函数，并且函数内部出现了一个错误，此时脚本会继续执行，但错误并不会立即呈现出来。使用回调处理异步函数时（不推荐使用），回调函数通常可以接收两个参数，看起来是下面这样：

```javascript
myAsyncFunc(someInput, (err, result) => {
  if (err) return console.log(err);
  console.log(result);
});
```

如果出现错误，参数 `err` 将会等于 Error。如果没有 `err` 就是 `undefined` 或者 `null`。所以在 `if (err)` 中返回或者将其它代码写在 `else` 块中非常重要。除此之外，你可能还会遇到其它错误，例如，`result` 是 `undefined`，而你想访问其 `data` 属性等等其它类似情况。

#### 异步——Promise

一种更好地处理异步代码的方式是使用 promises。除了使代码更具可读性之外，我们还可以改进错误处理。只要有一个 `catch` 语句块，我们就不需要再关心那么多的错误捕获了。在把 promises 链接起来时，一个 `catch` 语句块可以捕获来自 promises 执行过程中所有的或者最后一个 `catch` 块中的错误。注意：没有 `catch` 语句块不会中断脚本的执行，但是会给出你一些可读性比较差的信息：

```shell
(node:7741) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 1): Error: something went wrong
(node:7741) DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code. */
```

因此，请始终在 promises 后面添加 `catch` 块，看看下面的代码：

```javascript
Promise.resolve(1)
  .then((res) => {
    console.log(res); // 1
    throw new Error('something went wrong');
    return Promise.resolve(2);
  })
  .then((res) => {
    console.log(res); // 2
  })
  .catch((err) => {
    console.log(err);
    return Promise.resolve(3);
  })
  .then((res) => {
    console.log(res); // 3
  })
  .catch((err) => {
    console.log(err);
  });
```

#### 再谈 try...catch

随着 JavaScript 中引入 async/await，我们又回到了最初处理错误的方式，使用 `try...catch`，这使得处理错误变得比较容易:

```javascript
(async function () {
  try {
    await someFuncThatThrowsAnError();
  } catch (err) {
    console.error(err);
  }
})();
```

因为这和我们用于处理同步代码错误的方式相同，因此如果有需要，使用范围更广的 `catch` 语句更加容易。

## 服务端错误处理

现在我们有了处理错误的工具，然我们来看看可以将其运用在哪些实际的场景中呢？在服务端处理错误是应用程序的很关键的一部分。其实关于错误处理，有很多种不同的方法。我将为你演示一种具有自定义 Error 构造函数和错误**代码**的处理方式，这使得我们可以轻松地将其传递给前端或者其他 API 调用者。这样一来，如何组织后端代码并不重要，因为这种思想是保持不变的。

我们将使用 Express.js 作为后端框架。思考一下最有效的处理错误的结构，我们可能需要：

1. 一般性的错误处理，某种回退，也就是说：“发生了一些错误，请重试或者联系我们”。这种方式不是特别明智，但至少我们可以告知用户发生了错误——而不是无限加载等类似情况。

2. 特殊的错误处理，告知用户错误的详细信息，并且告知用户该如何修复，例如，缺失某些信息，某些条目已存在于数据库中等等。

### 构建自定义 Error 构造函数

我们可以使用现有的 Error 构造函数并将其扩展。虽然在 JavaScript 中使用继承的风险比较高，但在这种情况下，我觉得继承非常有用。为什么需要继承呢？因为我们仍然希望堆栈跟踪能为我们带来良好的调试体验。扩展原生的 JavaScript Error 构造函数能让我们自由地使用堆栈跟踪。我们要添加的唯一一个属性就是 `code`，以便稍后可以使用 `err.code`，其实相当于传递给前台的状态码（http 状态码）。

```javascript{9-10}
class CustemError extends Error {
  constructor(code = 'GENERIC', status = 500, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustemError);
    }

    this.code = code;
    this.status = status;
  }
}

module.exports = CustemError;
```

### 如何处理路由

我们自定义的 Error 已经可以使用了，接下来就要需要设置路由结构。正如我指出的，我们需要提供一个统一的错误处理逻辑，因为我们想要让每个路由都拥有同样的错误处理的行为。默认情况下，Express 是不支持的，因为路由都是封装过的。

为此，我们可以实现一个路由处理器，并且将真正的路由逻辑定义为一个常规函数。通过这种方式，当路由函数（内部函数）抛出错误时，就能将错误返回至路由处理器中，最终传递到前端。当后端出现错误时，我们希望向前端传输一条响应——假设是 JSON API——类似下面的格式：

```javascript
{
    error: 'SOME_ERROR_CODE',
    description: 'Something bad happened. Please try again or contact support.'
}
```

准备好面对不知所措。每当我对学生说起下面这句话时，他们总是会很生气。

> 第一次看到某些东西的时候无法理解其实无所谓。你只管先用起来，过段时间之后你自然会明白它的意义。

注：这也称之为自上而下的学习，我非常喜爱。

下面是路由处理器的代码：

```javascript
const express = require('express');
const router = express.Router();
const CustomError = require('../CustomError');

router.use(async (req, res) => {
  try {
    const route = require(`.${req.path}`)[req.method];

    try {
      const result = route(req); // 把 request 传递个路由函数
      res.send(result); // 把从路由函数返回的数据发送给客户端
    } catch (err) {
      // 如果路由函数中发生错误，将会执行以下代码
      if (err instanceof CustomError) {
        // 错误已经被处理的情况下，我们需要将其转化为我们想要的对象
        return res.status(err.status).send({
          error: err.code,
          description: err.messsage,
        });
      } else {
        console.error(err);

        // 未处理错误，我们只要返回通用的错误对象
        return res.status(500).send({
          error: 'GENERIC',
          description: 'Something went wrong. Please try again or contact support.',
        });
      }
    }
  } catch {
    // 请求失败
    res.status(404).send({
      error: 'NOT_FOUND',
      description: 'The resource you tried to access does not exist.',
    });
  }
});
```

我希望你可以阅读代码中的注释，因为我觉得这比我在这里解释更有意义。接下来让我们看一下真实的路由文件：

```javascript
const CustomError = require('../CustomError');

const GET = (req) => {
  return { name: 'Rio de Janeiro' };
};

const POST = (req) => {
  throw new Error('Some unexpected error, may also be thrown by a library or the runtime.');
};

const DELETE = (req) => {
  throw new CustomError('CITY_NOT_FOUND', 404, 'The city you are trying to delete could not be found.');
};

const PATCH = (req) => {
  try {
    throw new Error('Some internal error');
  } catch (err) {
    throw new CustomError('CITY_NOT_EDITABLE', 400, 'The city you are trying to edit is not editable.');
  }
};

module.exports = {
  GET,
  POST,
  DELETE,
  PATCH,
};
```

在这些例子中，我没有对实际请求做任何事情，我只是模拟了各种不同的错误场景。例如，`GET /city` 在第 3 行，`POST /city` 在第 8 行。这些接口也可以和查询参数一起使用，如：`GET /city?startWith=R`。对于未处理错误，前端将会接收如下错误信息：

```javascript
{
  error: 'GENERIC',
  description: 'Something went wrong. Please try again or contact support.',
}
```

或者你可以手动抛出 `CustomError` 错误：

```javascript
throw new CustomError('MY_CODE', 400, 'Error description');
```

它将会被转化为：

```javascript
{
  error: 'MY_CODE',
  description: 'Error description'
}
```

现在后端有了完美的错误处理方式，不必再将错误日志发送给前端，而且每次发生错误时，我们总是可以返回有用的信息。

确保你在 [GitHub](example-repo) 上看过了完整的代码。你可以在项目中自由地使用，或者按照你的需求修改这些代码。

### 向用户显示错误

下一步也是最后一步就是在处理前端错误，你需要使用第一部分中描述的工具来处理前端逻辑本身产生的错误。然而来自后端的错误信息，同样需要显示出来。让我们来看看如何显示错误。正如之前提到的，我们将在演示中继续使用 React。

#### 在 React 状态中保存错误

和其它数据一样，错误和错误信息也可以是变化的。因此你希望将其放在组件的状态中。默认情况和挂载时，你希望重置错误，所以当用户第一次看见页面时，就不会显示错误。

接下来的我们要弄清楚的是不同的错误类型所匹配的视觉 UI。和后端一样，有 3 种类型：

1. 全局错误。如：来自后端的一般性错误，或者用户没有登录等等。
2. 来自后端的特定错误。如：用户将他的登录凭证发送到后端，后端的响应是密码不匹配。前端无法验证这些东西，因此它们都是从后端发送过来。
3. 前端逻辑产生的特定错误。如：邮件地址校验失败。

第 2 和 第 3 种非常相似，而且可以使用同样的状态保存，只是它们的来源不一样而已。我们会在代码中如何实现。

我会使用 React 原生的状态实现，但是你也可以使用 MobX 或者 Redux 等状态管理系统。

#### 全局错误

我通常会把这些错误保存在**最外层有状态组件**，并且将其渲染为一个静态 UI 元素，它可以是屏幕顶部的一个红色条幅，一个模态框或者其他任何东西，具体的设计实现取决于你自己。

![UI for global errors](./global-error-ui.jpeg)

让我们看看代码实现：

```javascript
import React, { Component } from 'react';
import GlobalError from './GlobalError';

class Application extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
    };

    this._resetError = this._resetError.bind(this);
    this._setError = this._setError.bind(this);
  }

  render() {
    return (
      <div className="container">
        <GlobalError error={this.state.error} resetError={this._resetError} />
        <h1>Handling Errors</h1>
      </div>
    );
  }

  _resetError() {
    this.setState({ error: '' });
  }

  _setError(newError) {
    this.setState({ error: newError });
  }
}

export default Application;
```

正如我们看到的，我们把错误保存在 `Application.js` 的状态中，我们也有重置和改变错误值的方法。我们把错误值和重置方法传递给 `GlobalError` 组件，它负责显示错误，以及在点击 “X” 时重置错误。让我们看看 `GlobalError` 组件的代码：

```javascript{5}
import React, { Component } from 'react';

class GlobalError extends Component {
  render() {
    if (!this.props.error) return null;

    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '10px',
          backgroundColor: '#ffcccc',
          boxShadow: '0 3px 25px -10px rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {this.props.error}
        &nbsp;
        <i className="material-icons" style={{ cursor: 'pointer' }} onClick={this.props.resetError}>
          close
        </i>
      </div>
    );
  }
}

export default GlobalError;
```

你可以看到第 5 行，如果没有错误，我们不会渲染任何 UI。它可以防止页面顶部一直有一个空的红色方框。当然，你也可以修改组件的样式或者行为。例如，你可以把 “X” 替换为`超时`，它会在几秒钟的超时后重置错误。

现在你可以在任何地方使用这个全局错误组件，只需从 `Application.js` 传递 `_setError`，而且你也可以设置全局错误，例如，一个请求从后台返回的字段是 `error: 'GENERIC'`：

```javascript
import React, { Component } from 'react';
import axios from 'axios';

class GenericErrorReq extends Component {
  constructor(props) {
    super(props);

    this._callBackend = this._callBackend.bind(this);
  }

  render() {
    return (
      <div>
        <button onClick={this._callBackend}>Click me to call backend</button>
      </div>
    );
  }

  _callBackend() {
    axios
      .post('/city')
      .then((result) => {
        // 请求成功
      })
      .catch((err) => {
        if (err.response.data.error === 'GENERIC') {
          this.props._setError({ error: err.response.data.error });
        }
      });
  }
}
```

如果你比较懒，你可以停在这里了。至于特定的错误，你可以通过更改全局错误状态把错误方框显示在页面的顶部。但是，我将继续为你展示如何处理和显示特定的错误。为什么呢？首先，这篇文章是处理错误权威指南，所以我们不能停在这里。第二，如果你把所有错误显示为全局错误，恐怕 UX 人员会吓坏吧。

#### 处理特定请求错误

![处理特定请求错误](./handling-specific-request-error.jpeg)

和全局错误类似，我们可以在其它组件中包含**局部错误状态**。程序是类似的：

```javascript
import React, { Component } from 'react';
import axios from 'axios';

import InlineError from './InlineError';

class SpecificErrorRequest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
    };

    this._callBackend = this._callBackend.bind(this);
  }

  render() {
    return (
      <div>
        <button onClick={this._callBackend}>Delete you city</button>
        <InlineError error={this.state.error} />
      </div>
    );
  }

  _callBackend() {
    this.setState({ error: '' });

    axios
      .delete('/api/city')
      .then((result) => {
        // 请求成功
      })
      .catch((err) => {
        if (err.response.data.error === 'GENERIC') {
          this.props.setError(err.response.data.description);
        } else {
          this.setState({
            error: err.response.data.description,
          });
        }
      });
  }
}

export default SpecificErrorRequest;
```

需要记住的一点是，清除错误的方式通常有所不同。在这里使用 “X” 清除错误没有意义，更好的方式是在发起一次新请求的时候清除错误，例如，当输入框的值发生了变化。

#### 前端自身错误

![Frontend origin errors](./frontend-origin-errors.jpeg)

正如之前提到过，这些错误可以使用与处理从后端返回特定错误的相同方式来处理。让我们用一个输入字段的例子来说明，这次我们允许用户在输入之后删除一个城市：

```javascript
import React, { Component } from 'react';
import axios from 'axios';

import InlineError from './InlineError';

class SpecificErrorRequest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      city: '',
    };

    this._callBackend = this._callBackend.bind(this);
    this._changeCity = this._changeCity.bind(this);
  }

  render() {
    return (
      <div>
        <input type="text" value={this.state.city} style={{ marginRight: 15 }} onChange={this._changeCity} />
        <button onClick={this._callBackend}>Delete you city</button>
        <InlineError error={this.props._callBackend} />
      </div>
    );
  }

  _changeCity(e) {
    this.setState({
      error: '',
      city: e.target.value,
    });
  }

  _validate() {
    if (!this.state.city.length) throw new Error('Please provide a city name.');
  }

  _callBackend() {
    this.setState({ error: '' });

    try {
      this._validate();
    } catch (err) {
      return this.setState({ error: err.message });
    }

    axios
      .delete('/api/city')
      .then((result) => {
        // 请求成功
      })
      .catch((err) => {
        if (err.response.data.error === 'GENERIC') {
          this.props.setError(err.response.data.description);
        } else {
          this.setState({
            error: err.response.data.description,
          });
        }
      });
  }
}

export default SpecificErrorRequest;
```

#### 使用错误代码进行错误国际化

也许你会想为什么我们需要错误代码，如 `GENERIC`，我们只显示了从后端传回的错误描述。现在随程序的增长，你希望抢占新的市场，这个时候就必须要面对支持多语言的问题了。如果在这种情况下，你就可以使用错误代码来显示正确的用户当地语言。

我希望你对错误处理能够有所收获。`console.log(err)` 应该已经成为过去了。它对于调试必不可少，但是它不应该在你的生产构建中结束。为了防止出现这种情况，我建议你使用日志库，我过去一直使用 [loglevel](loglevel)，我非常喜欢它。

[full-project-sample]: https://github.com/gisderdube/graceful-error-handling
[example-repo]: https://github.com/gisderdube/graceful-error-handling
[loglevel]: https://www.npmjs.com/package/loglevel
