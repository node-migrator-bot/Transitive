# Getting Started

## Prerequisites

### Skills

Transitive.io makes developing real-time web applications in JavaScript easier.   While every effort has been made to make development as painless as possible, Transitive.io is a tool for people already comfortable with programming.  If you are new to programming or web development, I have included links to tutorials that cover each of the skills that I expect.

* Basic shell - [Learning the shell](http://linuxcommand.org/learning_the_shell.php)
* JavaScript  - [Eloquent JavaScript](http://eloquentjavascript.net/contents.html)
* HTML - [HTML Introduction](http://www.w3schools.com/html/html_intro.asp)
* CSS - [Introduction to CSS](http://www.csstutorial.net/css-intro/introductioncss-part1.php)
* Git - [Pro Git](http://progit.org/book/)

### Software

This guide has been tested on a Mac running OS X.  It should work on any Linux operating system just fine.

Please install [node.js](http://nodejs.org),  [npm](http://npmjs.org) and [Git](http://gitscm.org) before beginning this guide.  If you need help installing node.js or npm, please ask on the [node mailing list](http://groups.google.com/group/nodejs).

---

## Copying the starter-project

"Good artists copy, great artists steal." - [Picasso, via Steve Jobs](http://www.youtube.com/watch?v=CW0DUg63lqU)

To get started, let's clone the starter-project.

    git clone git://github.com/Transitive/starter-project.git myapp
    cd myapp

Now, let's install all of the dependencies:

    npm install

You should see npm's output where all of the dependencies (including Transitive!) are installed into `node_modules`.

## Booting your first Transitive server

This assumes you have copied the starter-project above and are in the project directory.

    node server.js

You should see some output that tells you the server is listening to port 3030.  If you open [http://localhost:3030](http://localhost:3030) in your browser, then you should see the default home page and layout that demonstrates rendering the same template on the server and the client.

To stop the server, type `ctrl+c` in the terminal.

---

## Configuring Transitive

### Overriding defaults on the command line.

We will be learning about configuring Transitive by changing the port that the server listens on.  If you don't know about ports, please [read this tutorial about ports](http://www.linuxjunkies.org/articles/port_explained.html).

By default, the server starts on port `3030`.  What if we wanted to start the server on another port, like port `8080`?  Well, we can override most options on the command line.  Let's start the server on port `8080`.

    node server.js --port=808

If you open [http://localhost:8080](http://localhost:8080) in your browser, you should then see the page show up.

To see all of the options that are set when the server boots, there is a special flag that you can set.  Try

    node server.js --dumpOptions

Transitive should output the server configuration.

### Overriding defaults by configuration.

Let's say we want to make it so that this application always starts on port `8081`.

If you open up `server.js` in your text editor, you should see the following line:

    var options = {};

If you change that line to:

    var options = { port: 8081 };

Then, start the server without any options:

    node server.js

The server should be started with the new port. If you open [http://localhost:8081](http://localhost:8081) in your browser, you should then see the default page show up.

---

## Templates

When you view the default home page in your browser, you see the header and two lines.  The first line is rendered on the server and the second is rendered in the browser.  They both use the same template.

### Simple templates

Let's look at the template for each line.  Open up `templates/onThe.haml` in your editor.

This template creates a div with the class "on-the" that contains the string `I was rendered on the #{place}`, where the `#{place}` is changed to the value of the `place` variable passed in to the template.  So, if you were to render this template with `{place:"boat"}`, then it would say `I was rendered on the boat`.

### Nested templates

When you view the home page, you see that this template has been rendered twice, once where `place` is set to `server`, and one where `place` is set to `browser`.  To see how this is done, open up `templates/home.haml` in your editor.

This template does four things:

1. Outputs the header "This is the home."
2. Renders a **nested template**, called `onThe`, passing in a local variable called `place` that is set to `server`
3. Defines an empty div with the id of `target`
4. Defines an inline `script` tag that will run on the browser.  This script tag uses jQuery to replace the contents of `#target` with the same template, but this time passes in `browser`.

### Layout

The default layout is named `layout`. Open `templates/layout.haml` in your editor to add your css and js dependencies.  Eventually, Transitive will provide a robust asset management framework.

## Controllers

Transitive supports controllers as a code organization strategy.  Your controllers should route incoming commands to your domain objects and request the data used to render the response for the user.

`controllers/home.js` shows an example controller.

Each controller must `export` a function that accepts a `connect.router` object and the Transitive instance for your app.

