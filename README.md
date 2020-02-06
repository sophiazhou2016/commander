# vuecli3

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
--noversion(生成的版本号不是动态的，固定为test;动态版本号最后一位规则：7.10.1.XXXXXXXX，年2位，月2位，日2位，jekins构建序号两位)
--test(埋点会埋到测试环境)
--buildnum=${BUILD_NUMBER}(jekins的构建版本号，为2位)
--rmshost(压缩包上传服务的host，不配置则默认使用域名)例如：rmshost=127.0.0.1
```

### Run your tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
