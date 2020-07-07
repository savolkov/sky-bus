# Используем node 12.16.3
FROM node:12.16.3-alpine
# Создаем рабочую директорию
WORKDIR /usr/src/sky-bus
# копируем в образ файл package.json и .yarn.lock – они описывают структуру зависимостей
COPY package.json ./
COPY yarn.lock ./
# установим зависимости
RUN yarn
# копируем в образ все файлы из репозитория, кроме тех, что указаны в .dockerignore
COPY . .
# делаем порт 3000 доступным извне
EXPOSE 3000
# выполняем билд
RUN yarn build
# определяем команду, которая будет исполняться при запуске контейнера.
CMD ["node", "dist/index.js"]
