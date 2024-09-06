# How to use AtomText component T

Importing the component
```js
import {T} from 'path/atoms/Atoms'

<T>Your text</T>
```

You can specify which type of text it is with h={}, h={1} stands for h1 and so on...
```js
<T h={3}>Your text</T> // h3
```

You can also specify the font-weight with w={}. w={1} stands for boldest font, the larger the number, the ligher the font
```js
<T w={3}>Your text</T> // medium font, see more in AtomText.jsx file
```

All of your styles for text can be written directly as props, no need to pass style={} object, or if you prefer style={} object, you can still use it
```js
<T color="red" fontSize={30}>Your text</T>
```

Please don't change the pre-defined numbers in AtomText.jsx to keep the consistency