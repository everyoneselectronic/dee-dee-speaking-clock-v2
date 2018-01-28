# discord.js-heroku

> An in-depth guide on deploying your
[Discord.js](https://github.com/hydrabolt/discord.js) bot on Heroku

**Tip:** This guide also applies to any Node.js libraries for the Discord API,
such as [discord.io](https://github.com/izy521/discord.io),
[eris](https://github.com/abalabahaha/eris), and
[discordie](https://github.com/qeled/discordie).

## About

### About Heroku

[Heroku](https://www.heroku.com/) is a cloud platform that offers services to
host and deploy your web applications in multiple languages, such as Node.js,
Ruby, Python, Java, PHP, and Go.

It's optimal for hosting a bot for several reasons:

* **Free** — Heroku offers a free hosting plan, so you don't have to pay at all!

    If you plan on using the free hosting plan, you should note the following
    limitations:

    * **Limit of 550 hours per month** across the applications on your account.

    This means that once your apps have been deployed on Heroku for over 550
    hours, they will go to sleep, and you can't restart them until the start of
    the next month when your hours are received.

    Luckily, Heroku bumps the limit to **1000 hours per month** if you [verify
    your account](https://devcenter.heroku.com/articles/account-verification) by
    adding a credit card to your account, so this limitation won't matter if you
    do so.

    To help colliding with this limitation, I also recommend creating a separate
    Heroku account for hosting your bot so your other applications don't take up
    its hosting time.

    * **Apps sleep after 30 minutes of inactivity**; this limitation can be
    easily bypassed by hosting a [web application](#building-a-web-app)
    alongside your bot with [Express](https://github.com/expressjs/express), and
    doing so means you also get a website to advertise your bot on. Pretty cool,
    right?

* **Easily deployable** — You can configure Heroku in two ways that allow you
to easily deploy any changes made to your bot:

    * **Heroku CLI** — With the power of Git, `git push heroku master` is all
    you'll ever need to do with Heroku's easy-to-use command line interface.

    * **Integrate your app with GitHub** for automatic deployment of your bot
    whenever your configured GitHub repository is updated.

* **Online and command line interface** — If you're not comfortable with using
your command line interface, you can access your app through Heroku's web
interface, and vice versa.

### About this guide

A lot of people have run into difficulties while trying to set up their bot on
Heroku, however. This guide was created to help resolve some of those issues.

Some additional notes that you should keep in mind as you follow this guide:

* In the directions throughout this guide, `$` denotes a Bash prompt
and should not be included while entering commands in the command line prompt.

* The main script of the bot will be referred to as `index.js`.

* This guide is primarily uses the Heroku CLI (rather than the web interface) to
interact with Heroku.

### About this repository

This repository also contains several example files mentioned in this guide for
you to use as references, including:

* `package.json` ([link](https://github.com/synicalsyntax/discord.js-heroku/blob/web/package.json))

* `Procfile` ([link](https://github.com/synicalsyntax/discord.js-heroku/blob/web/Procfile))

* `.gitignore` ([link](https://github.com/synicalsyntax/discord.js-heroku/blob/web/.gitignore))

* `index.js` ([link](https://github.com/synicalsyntax/discord.js-heroku/blob/web/index.js))

    This file contains the source code for the **Discord.js Heroku** bot on my
    [bot testing server](https://discord.gg/unYyTF9), which serves as a demo of
    the instructions in this guide; it utilizes Heroku's [environment
    variables](https://devcenter.heroku.com/articles/config-vars).

### About me

I'm active member of the Discord.js community on Discord and also a freelance
bot developer, so if you're interested in a personal, customized Discord bot,
message me on Discord at **synicalsyntax#9944** for further discussion.

## Getting started

### Prerequisites

Before you get started, make sure you have:

* [installed](https://docs.npmjs.com/getting-started/installing-node) Node
(version >= v4.0.0) and npm (you better have, also how would you even know that
your bot works? <img
src="https://cdn.discordapp.com/emojis/273981728899465216.png"
style="vertical-align:middle"  width="24">)

* [installed](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
and
[configured](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup)
Git on your local machine

* created a GitHub
[account](https://help.github.com/articles/signing-up-for-a-new-github-account/)
and [repository](https://help.github.com/articles/create-a-repo/), if you're
planning on automatically deploying your bot from GitHub

* [installed](https://devcenter.heroku.com/articles/heroku-cli) the Heroku CLI

* changed your directory path to the root directory of your bot (the one where
your bot's files and scripts are located in):

    ```sh
    $ cd path/to/directory
    ```

### Creating a `package.json` file

In order for Heroku to deploy your bot, you need a file called `package.json`
that tells Heroku what dependencies to install to run your app.

If you haven't created one already, you can run `npm init` in the root directory
of your bot to have an interactive prompt-based setup of your `package.json`
file.

The process should look like this (you push the `Enter`/`Return` key to save
your answer and move on to the next prompt):

```
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg> --save` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
name: (discord.js-heroku)
version: (1.0.0)
description: An in-depth guide on deploying your Discord.js bot on Heroku
entry point: (index.js)
test command:
git repository: https://github.com/synicalsyntax/discord.js-heroku
keywords: heroku, discord.js
author: synicalsyntax
license: (ISC) MIT
About to write to /Users/synicalsyntax/discord.js-heroku/package.json:

{
  "name": "discord.js-heroku",
  "version": "1.0.0",
  "description": "An in-depth guide on deploying your Discord.js bot on Heroku",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/synicalsyntax/discord.js-heroku.git"
  },
  "keywords": [
    "heroku",
    "discord.js"
  ],
  "author": "synicalsyntax",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/synicalsyntax/discord.js-heroku/issues"
  },
  "homepage": "https://github.com/synicalsyntax/discord.js-heroku#readme"
}


Is this ok? (yes)
```

#### Installing your dependencies

Running `npm init` won't tell specify your bot's dependencies in `package.json`,
but you can do so by running

```sh
$ npm install <pkg> --save
```

This command will install the dependency with the name `<pkg>` in the
`node_modules` folder while automatically adding the dependency to
`package.json`. For example, `$ npm install discord.js --save` will install and
add the `discord.js` dependency to `package.json`.

You'll need to do this for all the dependencies that your bot uses, since
missing dependencies in your `package.json` file will cause problems when you
try to deploy to Heroku; packages installed on your system won't be installed on
Heroku unless you specify them in `package.json`.

#### Specifying the versions of Node and npm

You need to define the version of Node.js and npm that will be used to run your
application on Heroku in your `package.json` file. You should always specify a
Node version that matches the runtime you’re developing and testing with.

To find your version of Node, run:
```sh
$ node -v
```

To find you version of npm, run:
```sh
$ npm -v
```

You can now add these versions to your `package.json` file like in the example below:

```json
"engines": {
    "node": "7.8.0",
    "npm": "4.2.0"
},
```

Your `package.json` file should now look something like:

```json
{
  "name": "discord.js-heroku",
  "version": "1.0.0",
  "description": "An in-depth guide on deploying your Discord.js bot on Heroku",
  "main": "index.js",
  "engines": {
      "node": "7.8.0",
      "npm": "4.2.0"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/synicalsyntax/discord.js-heroku.git"
  },
  "keywords": [
    "heroku",
    "discord.js"
  ],
  "author": "synicalsyntax",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/synicalsyntax/discord.js-heroku/issues"
  },
  "homepage": "https://github.com/synicalsyntax/discord.js-heroku#readme"
}
```

#### Specifying a start script

What's the command that you enter in your command line interface to start your
bot? If your bot's main scripts are located in `index.js`, chances are that
command is `$ node index.js`. That command will also serve as the start script,
which is what Heroku will run when it tries to start your bot.

To specify the start command, you need to add it to your `package.json` file
under the `scripts` field, like the example below:

```json
{
  "name": "discord.js-heroku",
  "version": "1.0.0",
  "description": "An in-depth guide on deploying your Discord.js bot on Heroku",
  "main": "index.js",
  "engines": {
      "node": "7.8.0",
      "npm": "4.2.0"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node index.js"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/synicalsyntax/discord.js-heroku.git"
  },
  "keywords": [
    "heroku",
    "discord.js"
  ],
  "author": "synicalsyntax",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/synicalsyntax/discord.js-heroku/issues"
  },
  "homepage": "https://github.com/synicalsyntax/discord.js-heroku#readme"
}
```

### Creating a `Procfile`

By default, Heroku looks for a
[Procfile](https://devcenter.heroku.com/articles/procfile) to determine what
processes are run by the [dynos](https://devcenter.heroku.com/articles/dynos)
(or containers) of your app.

You need to create a file named `Procfile` at the root directory of your
application with the following contents:

```
web: npm start
```

### Creating a `.gitignore` file

You should exclude some files from being checked in to Git/version control by
specifying them in a `.gitignore` file. One example of files that should be
excluded are those in the `node_modules` folder; not doing so results in a build
process that takes *forever* because the build cache isn't be utilized.

Download this Node `.gitignore`
[template](https://github.com/github/gitignore/blob/master/Node.gitignore) from
your buddies at GitHub and include it in the root directory of your bot.

### Creating a Heroku application

If you haven't done so already, [sign up](https://signup.heroku.com) for a
Heroku account and verify it.

To create a new Heroku application, login with your Heroku account credentials
when you run:

```sh
$ heroku login
```

Now create an app with name `your-app-name` by running:

```sh
$ heroku create your-app-name
```

If `your-app-name` is available, Heroku will create an app under that name; once
you set up a web app, you can visit your app's webpage at
`https://your-app-name.herokuapp.com`.

Finally, add a Git remote named `heroku` pointing to Heroku:

```sh
$ git remote add heroku https://git.heroku.com/your-app-name.git
$ git remote -v
heroku	https://git.heroku.com/your-app-name.git (fetch)
heroku	https://git.heroku.com/your-app-name.git (push)
```

### Integrating Heroku with GitHub

**Note:** This step is required if you plan on automatically deploying your bot
every time you push changes to a GitHub repository.

#### Adding a Git remote

To push new commits and changes to a GitHub repository, you'll need to first
[add a Git remote](https://help.github.com/articles/adding-a-remote/) by
running:

```sh
$ git remote add origin https://github.com/your-username/your-repo-name.git
```

If your remote was added successfully, running `$ git remote -v` should give you
the following output:

```sh
git remote -v
origin  https://github.com/your-username/your-repo-name.git (fetch)
origin  https://github.com/your-username/your-repo-name.git (push)
```

You can now push commits to your GitHub repository by running:

```sh
$ git push origin master
```

#### Automatically deploying with GitHub

Follow Heroku's guide on [integration with
GitHub](https://devcenter.heroku.com/articles/github-integration) and enable
[automatic
deploys](https://devcenter.heroku.com/articles/github-integration#automatic-deploys)
to deploy your bot whenever you push to your GitHub repository.

### Testing your setup

**Note:** This step is not required (especially if you haven't downloaded
the Heroku CLI), but it's highly recommended.

You should build your application locally to test if you've set up it correctly.

You can do so by running `npm install` to install all your dependencies and then
starting your app locally by running:

```sh
$ heroku local
```

The Heroku CLI will now run your app at http://localhost:5000/; if no errors are
encountered, you're on the right track!

## Building a web app

To dodge Heroku's "sleep after 30 minutes of inactivity" limitation, you can
build a web application to run alongside your bot. We'll be using the
[Express](https://github.com/expressjs/express) web framework and the
[EJS](https://www.npmjs.com/package/ejs) template engine to do so.

### Installing dependencies

Install the `express` and `ejs` dependencies with npm.

```sh
$ npm install express --save
$ npm install ejs --save
```

Check if they were successfully installed by making sure there are `express` and
`ejs` folders in the `node_modules` folder of your bot's root directory as well
as being listed under the `dependencies` field in your `package.json` file.

### Modifying `index.js`

You need to modify your `index.js` file to host the web app alongside your bot
by including the following content:

```js
const express = require('express');
const app = express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 5000;

// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the `public` directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// set the home page route
app.get('/', (request, response) => {
    // ejs render automatically looks in the views folder
    response.render('index');
});

app.listen(port, () => {
    // will echo 'Our app is running on http://localhost:5000 when run locally'
    console.log('Our app is running on http://localhost:' + port);
});
```

### Creating new files for the web app

The first file that needs to be created is `views/index.ejs`, the home page of
your web app. You can do so by running:

```sh
$ mkdir views
$ touch views/index.ejs
```

Now, open the file in the default text editor by running:

```sh
$ open views/index.ejs
```

What you put in right now doesn't really matter, but if you want to take the
time to add meaningful content to your webpage by following this
[guide](https://coligo.io/templating-node-and-express-apps-with-ejs/) on using
the EJS template engine with Express. A blank page will work for our purposes.

**Tip**: You can add some nice styling to your page by including static assets in the
`public` folder.

### Keeping your dynos awake

To prevent your dynos from going asleep, we can send GET requests to your page
every 15 minutes or so to keep it active. We can do so by adding a `setInterval`
function:

```js
 // pings server every 15 minutes to prevent dynos from sleeping
setInterval(() => {
  http.get('http://your-app-name.herokuapp.com');
}, 900000);
```

Now your bot will be up 24/7 until your hour limit for the month is reached.

## Testing your app

If you're reading this part of the guide, you should have:

* developed a functioning Discord bot

* setup your repository for Heroku deployment

* created a web application to run alongside the bot

You should now test your app locally by running:

```
$ heroku local
```

Keep the bot running for an hour, and see if it works consistently and doesn't
fall asleep.

If all is well (or you're too lazy to test locally), you should deploy your app
to Heroku by running:

```sh
$ git push heroku master
```

If the app is deployed successfully and works consistently for about thre hours,
congratulations! You've finished setting up, deploying to, and hosting your bot
on Heroku!

If you have some questions/feedback about this guide, you can message me on
Discord at **synicalsyntax#9944**. Hope you enjoyed this guide! :)

## Additional resources

* [Free dyno hours](https://devcenter.heroku.com/articles/free-dyno-hours) —
Additional information about Heroku's free plan, including details about
automatic dyno sleeping after 30 minutes of inactivity and hour limits.

* [Deploying Node.js apps on
Heroku](https://devcenter.heroku.com/articles/deploying-nodejs) — The official
Heroku guide to deploying Node.js applications.

* [Best Practices for Node.js
Development](https://devcenter.heroku.com/articles/node-best-practices) —
Official tips and tricks from your friends at Heroku for a quick, easy setup
of your app.

* [Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)
— More documentation from your friends at Heroku to help you set up your app.

* [How to Deploy a Node.js App to
Heroku](https://scotch.io/tutorials/how-to-deploy-a-node-js-app-to-heroku) — The
original tutorial on deploying the web application designed to run alongside
your Discord.js bot.

## License

[MIT License](https://github.com/synicalsyntax/discord.js-heroku/blob/master/LICENSE)

Copyright (c) 2017 Cynthia Lin