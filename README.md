# Hiking Log

A hiking logger that includes your recent hikes and their difficulty

![Home page](https://imgur.com/z0wPaEG.png)

## Demo

![Adding hikes](https://imgur.com/y3EYnle.gif)

You can add a new hike and provide some detail about it

![Deleting hikes](https://i.imgur.com/sRmm9Tf.gif)

You can remove unwanted hikes

![Sorting hikes](https://i.imgur.com/qaIaU7E.gif)

You can sort them by difficulty, time, and other categories

![Filtering hikes](https://imgur.com/BESwK0R.gif)

You can quickly filter between them


## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

## API

The baseURL is set in `nuxt.config.js`, where both dev and production links can be found. The local build will require the `hiking-log-api` repo to be running at the same time as this repo.

```bash
cd ../hiking-log-api
npm start
```
