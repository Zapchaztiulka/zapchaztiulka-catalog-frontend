# Zapchaztiulka - e-commerce website
<span>
<img src="./public/logo-main.svg" width="400" title="screen">
</span>

## Клієнтський веб-застосунок для пошуку та придбання запчастин для авто та сільгосптехніки

Демо сторінка - [Zapchaztiulka](https://zapchaztiulka-catalog-frontend.vercel.app/)

## Матеріали та інструменти

- [Next.js](https://nextjs.org/) - фреймоворк на базі [React]()
- [Redux Toolkit](https://redux-toolkit.js.org/) - для керування стану застосунку
- [Tailwindcss](https://tailwindcss.com/) - стилізація застоcунку
- репозиторій з [Backend](https://github.com/Zapchaztiulka/spares-backend)
- додаткові пакети [React Splide](https://splidejs.com/integration/react-splide/), [Material UI](https://mui.com/material-ui/getting-started/installation/)

## Для роботи з репозиторієм

1. Склонувати репозиторій:

```bash
git clone https://github.com/Zapchaztiulka/zapchaztiulka-catalog-frontend.git
```

2. Перевірити версію встангвленої Node.js:

```bash
node -v
```

Версія node має бути >=v18.17.0. Оновити версію можна тут [Nodejs website](https://nodejs.org/en/)


3. Встановити усі пакети та залежності:

```bash
npm install
```

4. Створити в корні проекту файл .env та додати змінні (приклад в файлі .env.example). В залежності від режиму розробки відбувається перемикання змінних оточення для dev або prod.

5. Створити папку .next:

```bash
npm run build
```

6. Запусти режим розробки, виконавши команду :

```bash
npm run dev
```

7. Відкрити [http://localhost:3000](http://localhost:3000) або посилання буде вказано в терміналі. 

