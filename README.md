# spsimplicity.github.io

To setup the Sudoku game you just need to run 'gulp build-all' (after running npm install of course) in the terminal and that will build all the necessary files.

The app is separated into 3 main files, cookieStorage, validator, and main. Each encapsulates their purposes fully. The game starts by pulling a new game from a mock endpoint. I did this because it was faster than creating a generator under the limited time and figured it would show another real world way of getting a game board other. I used fetch to get the data because I prefer it over writing XHR requests and I prefer to use promises with async requests. I used localstorage to save the games board after each successfull number input, and used cookies as a fall back if localstorage wasn't supported. I provide buttons for the user to clear the board if they want to restart, or fetch a new board. I tried to not loop through the entire 2d array data structure in my code as much as possible by having extra conditions in the for loops.

I used Jade for the template since I'm used to using it, and used less for the styles for the same reason. I used gulp for the build process because it works well and is easy to setup. Plus I prefer it over grunt. I used browserify because its most suited to writing modular code and makes it easy to combine all the dependencies together.

If I had additional time I would have written some tests to validate the validator and many of the board operations I do in the main file. I tried not to go too much over the 4hrs recommended to do this test so I wanted to make sure other things were working well before doing the tests. I probably should have done tdd and this wouldn't have been an issue.
