# This project is separated into three parts: client_side, server and database. Both client and server sides require NPM package manager in order to be installed.

# Getting Started With Collab
> : warning: **This project was developped using React, Bootstrap and Node.js. Multiple plugins and extensions were installed on top of these frameworks. As such, after you run NPM install you will be creating over 70k files in your computer**: Be very careful here!

[![https://nodei.co/npm/YOUR-MODULE-NAME.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/YOUR-MODULE-NAME.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/YOUR-MODULE-NAME)

Frameworks used:
-----

- [React][1]
- [Express.js][3]
- [Node.js][4]
- [React Bootstrap][2]
- [MySQL][5]


[1]: https://reactjs.org/
[2]: https://react-bootstrap.github.io/
[3]: https://expressjs.com/
[4]: https://nodejs.org/en/
[5]: https://www.mysql.com/

## Project Structure
The project maintains a direct relationship between components of the front end and their respective component in the back end. To map the components, you can go to /client_side/src/components and /server/routes and see that there routes that go from the front end to the back end and, lastly, into the database. 

## Getting Started 
Run the command bellow to install NPM


    npm install -g npm


### Clone the Collab repo
Make a directory and cd into it, then run:

    git clone git@github.com:Ahrfry/Collab.git

## Create SCHEMA

Use the dabase schema.sql file to create the database.

## Install Server Side

CD into server and run:

    npm install --force


After project is installed, modify the file /server/db.js to match your database configuration (username and password)

Once db.js is configured, run:

    npm run server

###List of files implemented in Server Side:
Markup : * Bullet list
              * Nested bullet
                  * Sub-nested bullet etc
          * Bullet list item 2

## Install Client Side

CD into client_side and run:

    npm install --force


After project is installed the front end should be ready to connect to the backend. Simply run:


    npm start

A current valid user in the database is username: brazil, passwrd: 12345. Any user loaded in the database should work properly in the system.


# Dynamic Setup (work in progress):

Currently working on a setup.js file to make this project a showcase for the database class. These files are under /server/routes/setup. Ideally, the user would pass parameters such as number of users, number of areas etc. and the setup will automatically generate the entire system, including the database. To activate this file, go to the URL 

    http://localhost:3000/setup/setup


This functionality might require some editing to the code since it's still a WIP.

