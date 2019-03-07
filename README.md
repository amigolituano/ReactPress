# ReactPress

> Make WordPress theme development great again.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Features](#features)
- [Requirements](#requirements)
- [Getting Started](#getting-started)
- [Developing Locally](#developing-locally)
- [Building for Production](#building-for-production)
- [Changing ports](#changing-ports)
- [Project Structure](#project-structure)
- [Local Database Backup](#local-database-backup)
- [Local Database Restore](#local-database-restore)
- [Author](#author)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Features

- Modern JavaScript through Webpack
- Live reload via BrowserSync
- SCSS support
- Easy dev environments with Docker Compose
- Helpful HTML5 Router for firing JS based on WordPress page slug.
- Nothing else.

## Requirements

- Node.js
- Yarn
- Docker for Mac / Windows
- Docker Compose

## Getting Started

```bash
open reactpach theme folder
npm install
npm run start:docker

```

## Developing Locally

To work on the theme locally, open another window/tab in terminal and run:

```bash
npm run start
```

This will open a browser, watch all files (php, scss, js, etc) and reload the
browser when you press save.

## Backup your database

```bash
npm run dump-db
```

## Restore your database

```bash
npm run restore-db
```

## Building for Production

To create an optimized production build, run:

```bash
npm run build
```

This will minify assets, bundle and uglify javascript, and compile scss to css.
It will also add cachebusting names to then ends of the compiled files, so you
do not need to bump any enqueued asset versions in `functions.php`.

## Changing ports

There are two ports involved, the port of the dockerized WordPress instance,
and the port the Browser Sync runs on. To change the port of the dockerized
WordPress instance go into [`docker-compose.yml`](docker-compose.yml#L25) and
modify `ports`.

```yml
# docker-compose.yml
 ...
  ports:
    - "8000:80" # only need to change `8000:80` --> localhost:8000
 ...
```

If you want to change the port you develop on (the default is 4000), then open
[`scripts/webpack.config.js`](scripts/webpack.config.js#L119) and modify
`BrowserSyncPlugin`'s `port` option. If you changed the WordPress port above,
be sure to also change `proxy` accordingly. Don't forget the trailing slash.

```js
// scripts/webpack.config.js
...
new BrowserSyncPlugin({
  notify: false,
  host: 'localhost',
  port: 4000, // this is the port you develop on. Can be anything.
  logLevel: 'silent',
  files: ['./*.php'],
  proxy: 'http://localhost:8000/', // This port must match docker-compose.yml
}),
...
```

## Local Database Backup

Here's how to dump your local database with Docker into a `.sql` file

```aidl
docker exec -it host_db_1 /usr/bin/mysqldump -u username -ppassword database_name > backup.sql
```

## Local Database Restore

Restore a previous database backup

```aidl
docker exec -i host_db_1 /usr/bin/mysql -u username -ppassword database_name < backup.sql
```
