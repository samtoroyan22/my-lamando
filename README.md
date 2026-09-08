# My Lamando - Car Management App

This project is a personal car management application built with Next.js
and TypeScript. It is designed for keeping a complete local history of a
Volkswagen Lamando L, including fuel, expenses, service records, vehicle
information, and photos. The application works entirely on the client
side and stores user data in local storage.

## Features

- **Dashboard**: Provides an overview of the car, current mileage,
  fuel statistics, expenses, recent activity, and upcoming
  maintenance.
- **Fuel Tracking**: Add, edit, and delete fuel entries, calculate
  total fuel costs, average fuel consumption, and track fuel history.
- **Expenses**: Track vehicle expenses by category, including
  maintenance, parts, tires, detailing, insurance, taxes, car wash,
  parking, fines, and other expenses.
- **Service History**: Keep a history of maintenance and repairs,
  record completed works, service costs, service centers, and
  comments.
- **Maintenance Schedule**: Track scheduled maintenance by mileage or
  time, with statuses such as Normal, Soon, Due, and Overdue.
- **Gallery**: Store vehicle photos locally, organize them by
  category, preview images, and edit photo information.
- **Car Information**: Store and edit the main vehicle information,
  technical specifications, mileage, purchase date, and other
  important parameters.
- **Theme Switching**: Supports light, dark, and system themes.
- **Local Storage**: All application data is stored locally in the
  browser without a backend or database.
- **Export / Import**: Export application data to JSON and restore it
  later.
- **Responsive Design**: Adaptive interface for desktop, tablet, and
  mobile devices.
- **Loading States**: Skeleton loading states for data-driven
  sections.
- **Animations**: Subtle animations and transitions using Motion.
- **Form Validation**: Forms are validated with React Hook Form and
  Zod.
- **Notifications**: User actions provide feedback through Sonner
  toast notifications.

## Technologies Used

- **Next.js**: React framework for building the application and
  handling routing.
- **React**: Library for building the user interface.
- **TypeScript**: For type-safe development.
- **Tailwind CSS**: For styling and responsive design.
- **shadcn/ui**: For reusable and accessible UI components.
- **Lucide React**: For icons.
- **Motion**: For animations and transitions.
- **React Hook Form**: For form management.
- **Zod**: For form validation and schemas.
- **date-fns**: For date formatting and date calculations.
- **Recharts**: For dashboard and statistics charts.
- **Sonner**: For toast notifications.
- **Local Storage**: For persistent client-side data storage.
- **ESLint**: For code linting.

## Setup and Installation

### Prerequisites

To run this project, you need to have the following installed:

- Node.js
- npm (Node package manager)

### Steps

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/samtoroyan22/my-lamando.git
    cd my-lamando
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    ```

3.  **Run the development server**:

    ```bash
    npm run dev
    ```

4.  Open the application in your browser by navigating to:

    ```text
    http://localhost:3000
    ```

## Data Storage

My Lamando does not use a backend or database.

All user data is stored locally in the browser using `localStorage`.
This includes:

- Car information
- Fuel entries
- Expenses
- Service history
- Maintenance schedule
- Gallery photos
- Application settings

Because the application uses local storage, data is specific to the
browser and device where it was created.

The application also provides JSON export and import functionality for
backing up and restoring data.

## GitHub Pages

The application can be deployed as a static Next.js application using
GitHub Pages and GitHub Actions.

After deployment, the application is available at:

```text
https://samtoroyan22.github.io/my-lamando/
```

## Troubleshooting

- If the application does not start, make sure the installed Node.js
  version is compatible with the current Next.js version.
- If data does not persist, check whether local storage is available
  and enabled in the browser.
- If imported data does not appear correctly, make sure the JSON file
  was exported from a compatible version of the application.
- If images are not displayed correctly, check that the image was
  successfully processed and stored in local storage.
- If the GitHub Pages deployment fails, check the GitHub Actions
  workflow and the repository Pages settings.
- If the application works locally but not on GitHub Pages, check the
  Next.js static export and `basePath` configuration.

## License

This project is licensed under the MIT License.\
Copyright (c) 2026 Samvel Toroyan

# My Lamando - Приложение для управления автомобилем

Этот проект представляет собой персональное приложение для управления
автомобилем, построенное с использованием Next.js и TypeScript. Оно
предназначено для ведения полной локальной истории эксплуатации
Volkswagen Lamando L: заправок, расходов, технического обслуживания,
информации об автомобиле и фотографий. Приложение полностью работает на
стороне клиента и хранит пользовательские данные в local storage.

## Особенности

- **Dashboard**: Общая информация об автомобиле, текущий пробег,
  статистика топлива, расходы, последние события и ближайшее
  обслуживание.
- **Учёт заправок**: Добавление, редактирование и удаление заправок,
  расчёт расходов на топливо, среднего расхода и ведение истории.
- **Расходы**: Учёт расходов автомобиля по категориям, включая
  обслуживание, запчасти, шины, детейлинг, страховку, налоги, мойку,
  парковку, штрафы и другие расходы.
- **История обслуживания**: Ведение истории ТО и ремонта, выполненных
  работ, стоимости, сервиса и комментариев.
- **График обслуживания**: Отслеживание регламентных работ по пробегу
  или времени со статусами Normal, Soon, Due и Overdue.
- **Галерея**: Локальное хранение фотографий автомобиля, категории
  фотографий, preview изображений и редактирование информации.
- **Информация об автомобиле**: Хранение и редактирование основных
  данных автомобиля, технических характеристик, пробега и даты
  покупки.
- **Переключение темы**: Поддержка светлой, тёмной и системной темы.
- **Local Storage**: Все данные приложения хранятся локально в
  браузере без backend и базы данных.
- **Export / Import**: Экспорт данных приложения в JSON и последующее
  восстановление.
- **Адаптивный дизайн**: Интерфейс адаптирован под desktop, tablet и
  mobile.
- **Loading States**: Skeleton-состояния для компонентов, работающих с
  данными.
- **Анимации**: Плавные анимации и переходы с использованием Motion.
- **Валидация форм**: React Hook Form и Zod для работы с формами и их
  валидации.
- **Уведомления**: Обратная связь после действий пользователя с
  помощью Sonner.

## Используемые технологии

- **Next.js**: React-фреймворк для создания приложения и
  маршрутизации.
- **React**: Библиотека для создания пользовательского интерфейса.
- **TypeScript**: Для типобезопасной разработки.
- **Tailwind CSS**: Для стилизации и адаптивной вёрстки.
- **shadcn/ui**: Для переиспользуемых и доступных UI-компонентов.
- **Lucide React**: Для иконок.
- **Motion**: Для анимаций и переходов.
- **React Hook Form**: Для работы с формами.
- **Zod**: Для валидации и схем данных.
- **date-fns**: Для форматирования и работы с датами.
- **Recharts**: Для графиков и статистики.
- **Sonner**: Для toast-уведомлений.
- **Local Storage**: Для локального хранения данных.
- **ESLint**: Для линтинга кода.

## Установка и настройка

### Требования

Для запуска проекта необходимо установить:

- Node.js
- npm (менеджер пакетов Node.js)

### Шаги

1.  **Клонировать репозиторий**:

    ```bash
    git clone https://github.com/samtoroyan22/my-lamando.git
    cd my-lamando
    ```

2.  **Установить зависимости**:

    ```bash
    npm install
    ```

3.  **Запустить сервер разработки**:

    ```bash
    npm run dev
    ```

4.  Откройте приложение в браузере:

    ```text
    http://localhost:3000
    ```

## Хранение данных

My Lamando не использует backend или базу данных.

Все пользовательские данные хранятся локально в браузере через
`localStorage`. Это включает:

- информацию об автомобиле;
- заправки;
- расходы;
- историю обслуживания;
- график технического обслуживания;
- фотографии галереи;
- настройки приложения.

Так как приложение использует local storage, данные доступны только в
том браузере и на том устройстве, где они были созданы.

Также приложение поддерживает экспорт и импорт данных в формате JSON для
резервного копирования и восстановления.

## GitHub Pages

Приложение может быть развёрнуто как статическое Next.js-приложение
через GitHub Pages и GitHub Actions.

После публикации приложение будет доступно по адресу:

```text
https://samtoroyan22.github.io/my-lamando/
```

## Решение проблем

- Если приложение не запускается, проверьте совместимость
  установленной версии Node.js с текущей версией Next.js.
- Если данные не сохраняются, проверьте доступность и разрешение на
  использование local storage в браузере.
- Если импортированные данные отображаются некорректно, убедитесь, что
  JSON-файл был экспортирован из совместимой версии приложения.
- Если изображения не отображаются, проверьте, что изображение успешно
  обработалось и сохранилось в local storage.
- Если GitHub Pages не разворачивается, проверьте GitHub Actions и
  настройки Pages в репозитории.
- Если приложение работает локально, но не работает на GitHub Pages,
  проверьте настройки статического экспорта Next.js и `basePath`.

## Лицензия

Этот проект лицензирован под лицензией MIT.\
Copyright (c) 2026 Samvel Toroyan
