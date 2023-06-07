<h1 align="center">Учебный frontend-проект: "Место"</h1>

<div align="center">
  <a href="https://github.com/DonVladon96/react-mesto-auth.git">
    <img src="https://user-images.githubusercontent.com/108838349/215305563-5d7a1891-fdbd-4142-b011-6ece3ec74cee.gif" width="550" alt="Гиф с демонстрацией функционала приложения">
  </a>
</div>

<a name="summary">
  <details>
    <summary>Оглавление</summary>
    <ol>
      <li><a href="#project-description">Описание проекта</a></li>
      <li><a href="#technologies">Стек технологий</a></li>
      <li><a href="#installation">Установка и запуск приложения в локальном репозитории, эксплуатация</a></li>
    </ol>
  </details>
</a>

<a name="project-description"><h2>1. Описание проекта</h2></a>
Данная проектная работа выполнена в рамках образовательной программы <a href="https://practicum.yandex.ru/">Яндекс Практикума</a>. Проект представляет собой <a href="">продолжение</a> портирования на "React" адаптивного приложения (SPA) с профилем пользователя и фотокарточками, <a href="https://github.com/DonVladon96/mesto">изначально написанного</a> на нативных технологиях: HTML5, CSS3 и JavaScript. В сравнении с предыдущей работой в данном проекте добавлен функционал регистрации и авторизации пользователей на сайте в своем личном кабинете, а также исправлены некоторые ошибки, пропущенные ревьюером

<h4>Ссылка на макеты:
<br>
https://www.figma.com/file/2cn9N9jSkmxD84oJik7xL7/JavaScript.-Sprint-4?node-id=0%3A1
https://www.figma.com/file/bjyvbKKJN2naO0ucURl2Z0/JavaScript.-Sprint-5?node-id=0%3A1
https://www.figma.com/file/kRVLKwYG3d1HGLvh7JFWRT/JavaScript.-Sprint-6?node-id=0%3A1
https://www.figma.com/file/PSdQFRHoxXJFs2FH8IXViF/JavaScript-9-sprint?node-id=0%3A1
https://www.figma.com/file/5H3gsn5lIGPwzBPby9jAOo/Sprint-14-RU?node-id=0%3A1
<br>
<br>

Ссылка на проект: https://github.com/DonVladon96/react-mesto-auth </h4>

<i>* - проект прошел код-ревью сотрудниками ЯндексПрактикум</i>

<div align="right">(<a href="#summary">к оглавлению</a>)</div>

<a name="technologies"><h2>2. Стек технологий</h2></a>
<span>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="Иконка React">
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" alt="Иконка React Router">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="Иконка CSS3">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="Иконка HTML5">
</span>

<div align="right">(<a href="#summary">к оглавлению</a>)</div>

<a name="installation"><h2>3. Установка и запуск приложения в локальном репозитории, эксплуатация (пп. 4-5 актуальны также при работе на Github Pages)</h2></a>
1. `git clone https://github.com/DonVladon96/react-mesto-auth.git` - клонировать репозиторий (с использованием HTTPS) на свое устройство
2. `npm i` - установить зависимости
3. `npm run start` - запустить приложение в режиме разработчика (в браузере ввести ссылку `http://localhost:3000/react-mesto-auth/sign-in`, если приложение не открылось там автоматически)
4. При использовании приложения для входа в личный кабинет пользователю требуется <b>зарегистрироваться</b>  и пройти <b>авторизацию</b>. Можно воспользоваться уже зарегистрированным аккаунтом: <b>email</b> - `test-acc@test.ru`, <b>пароль</b> - `test-acc@test.ru`
5. При авторизации в локальном хранилище сохраняется токен пользователя, который при закрытии вкладки с приложением и возвращении позволяет оставаться авторизованным на сайте. Он удаляется после нажатия на кнопку выхода из личного кабинета
<a name="problem-routes">

<details>
  <summary>Регистрация и авторизация пользователей</summary>
</details>

<details>
  <summary>Редактирование данных пользователя</summary>
</details>

<details>
  <summary>Обновление аватара</summary>
</details>

<details>
  <summary>Добавление новой карточки</summary>
</details>

<details>
  <summary>Добавление и снятие лайка (включая счетчик лайков)</summary>
</details>

<details>
  <summary>Удаление карточки <b><i>с модальным окном подтверждения действия</i></b></summary>

</details>

<details>
  <summary>Модальное окно успешной/неудачной регистрации на сайте</summary>

</details>

<details>
  <summary>Модальное окно с увеличенной фотографией карточки</summary>
</details>

<details>
  <summary>Открытие и закрытие модальных окон (по кнопке, <b><i>оверлею</i></b> и <b><i>клавише "Escape"</i></b>)</summary>

</details>

<details>
  <summary><b><i>Спиннеры загрузки</i></b></summary>

</details>


<details>
  <summary><b><i><b><i>Окно предварительной загрузки страницы</i></b></i></b></summary>

</details>


https://donvladon96.github.io/React-mesto-auth
