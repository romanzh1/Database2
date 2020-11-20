# frontend

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
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### Auth

Страница с входом (логин, пароль)
Когда он ввёл данные и нажал на кнопку "Войти". Отправляется запрос на сервер /sign_in.
Если сервер возвращает 200 и токен, то токен нужно сохранить (например, в localStorage). Редирект на какую-то струницу уже приложения
Добавить ко всем запросам на бэкенд токен в header
