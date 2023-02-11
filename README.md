# Installation Guide for Industrial-Main

This guide provides the steps for installing and initializing our application.

## Step 1: Download the Repository
1. Press the green `Code` button on GitHub.
2. Press the `Download ZIP` link on the dropdown menu displayed.
3. Wait for the download to finish and then click to show the folder the .zip file was downloaded at, or navigate to your system's designated downloads folder manually.

## Step 2: Extract the Repository
Extract the contents of the .zip file to your folder of choice, using the extraction tool of your choice. The extraction will create a folder called `industrial_v3`.

## Step 3: Install MariaDB
The user must have previously installed MariaDB on their computer. To do this, go to the following [link](https://mariadb.org/download/?t=mariadb&p=mariadb&r=11.0.0&os=windows&cpu=x86_64&pkg=zip&m=crete), download MariaDB 10.6 for your system, and follow the installation wizard. After doing this, continue with the rest of the steps in this guide.

## Step 4: Open the Repository with IDE
1. Open the folder `industrial_v3` using your preferred IDE. In this guide we will follow the steps using Visual Studio Code 1.74.3.
2. Press `CTRL + Shift + C` on Windows, or `Command + Shift + C` on Mac or Linux, to open the terminal on the application's path.

## Step 5: Install the Dependencies
1. Write `cd client` and press `ENTER`.
2. This guide assumes that the computer has installed and ready to use Node.js. If your computer does not have Node.js installed, the application will not work.
3. Write `npm install` in the terminal window, and press `ENTER`. The Node Package Manager (npm) will install all the necessary dependencies for the client to function.
4. Once finished, write `cd ..` and press `ENTER` to go back one folder.
5. Write `cd server` and press `ENTER`.
6. Write `npm install` once again and press `ENTER`.
7. Write `npm install mariadb` and press `ENTER`.
8. Write `npm install -g nodemon` and press `ENTER`.

## Step 6: Configure the Application
1. Make some changes in the config file of our application. In VS Code, navigate to the server folder, and then into the database folder where a `config.json` file is located.
2. Replace the `root` and `123` fields under development to your own MariaDB username and password. Save the changes.

## Step 7: Initialize the Application
1. To initialize the back-end server, write `npm start` on the same terminal window as the previous commands were run.
2. To start the front-end server, do the following:
   1. Go back to VS Code and open a new terminal window using the same keyboard shortcut as before.
   2. Write `cd client` to enter the front-end folder.
   3. Write `npm run dev` to start the front-end server.
