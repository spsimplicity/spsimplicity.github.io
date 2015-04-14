require('es6-promise').polyfill();
require('isomorphic-fetch');

window.$ = require('jquery');

var validator     = require('./validator.js'),
    cookieStorage = require('./cookieStorage.js');

window.sudokuMain = (function() {

    'use strict';

    return {
        // Start up the game
        initialize: function (boardName) {
            var self = this,
                boardToLoad = boardName || 'sudokuBoard1';

            this.board = this.checkForBoard();

            if (!this.board) {
                this.createBoard();

                this.fetchBoard(boardToLoad)
                    .then(function(response) {
                        return response.json();
                    })
                    .then(function(json) {
                        json.board.map(function(boardSection) {
                            self.board[boardSection.row][boardSection.col].val = boardSection.num;
                            self.board[boardSection.row][boardSection.col].default = true;
                            self.setupBoard();
                        });
                    })
                    .catch(function(response) {
                        console.log("Error getting sudoku board");
                    });
            } else {
                this.setupBoard();
            }
        },
        // Create a new board for the game
        createBoard: function() {
            this.board = [];

            // Build 2d array for the board. Each row has 9 objects
            for(var idx=0; idx < 9; idx++) {
                this.board.push([{}, {}, {}, {}, {}, {}, {}, {}, {}]);
            }
        },
        // Check for an existing board to load into the game
        checkForBoard: function () {
            var storedBoard;

            // Check to make sure local storage exists
            if(typeof localStorage !== "undefined" || localStorage !== null) {
                // Check for game board
                if (localStorage.getItem('sudokuBoard')) {
                    storedBoard = JSON.parse(localStorage.getItem('sudokuBoard'));
                }
            } else if (cookieStorage.hasItem('sudokuBoard')) {
                storedBoard = JSON.parse(cookieStorage.getItem('sudokuBoard'));
            }

            return storedBoard;
        },
        // Fill in the spots on the board
        setupBoard: function () {

            this.board.forEach(function(boardRow, rowIdx) {
                boardRow.forEach(function(boardObj, colIdx) {
                    //boardObj.elem = $('.row'+rowIdx+' .col'+colIdx+' input')[0];
                    var elem = $('.row'+rowIdx+' .col'+colIdx+' input');

                    if(boardObj.val) {
                        elem.val(boardObj.val);
                    }

                    if(boardObj.default) {
                        elem.attr('disabled', true);
                    }
                })
            });
        },
        // Get a new board
        fetchBoard: function (boardName) {
            return fetch('./data/' + boardName + '.json');
        },
        // Save the board to local storage
        saveBoard: function() {
            if(typeof localStorage !== "undefined" || localStorage !== null) {
                localStorage.setItem('sudokuBoard', JSON.stringify(this.board));
            } else {
                cookieStorage.setItem('sudokuBoard', JSON.stringify(this.board), Infinity);
            }
        },
        // Clear the current board
        clearBoard: function() {
            if(typeof localStorage !== "undefined" || localStorage !== null) {
                localStorage.removeItem('sudokuBoard');
            } else {
                cookieStorage.removeItem('sudokuBoard');
            }

            $('input').val('');

            this.board = null;

            this.initialize();
        },
        // Fetch a new board
        newBoard: function() {
            $('input').val('');

            this.board = null;

            this.initialize('sudokuBoard2');
        },
        // Set value of the board
        setCell: function (event, row, col) {
            var digitReg  = /^\d$/,          // Regex to make sure only a single number is entered
                errorElem = $('.errorText'), // Element to set error text in
                errorText;                   // Error text from validator

            this.board[row][col].val = ''; // Clear the old value

            // Check if valid input was entered
            if(event.target.value && digitReg.test(event.target.value) && event.target.value > 0) {

                // Need to validate that the value is allowed
                errorText = validator.validateInput(this.board, row, col, event.target.value);

                // Make sure there was no error
                if(!errorText) {
                    errorElem.text('');
                    $('input.error').removeClass('error');
                    this.board[row][col].val = event.target.value;

                    // Check if the board is complete
                    if(validator.validateBoard(this.board)) {
                        $('.sudoku').addClass('complete');
                    }
                } else {
                    errorElem.text(errorText);
                    $('input.error').removeClass('error');
                    $(event.target).addClass('error');
                    event.target.value = '';
                }
            } else if(event.target.value && (!digitReg.test(event.target.value) || event.target.value == 0)) {
                event.target.value = '';
            }

            this.saveBoard();
        }
    }
})();

$(document).ready(function() {
    var sudokuTableElem = $('.sudoku');

    sudokuMain.initialize(); // Start the game up

    sudokuTableElem.css('width', sudokuTableElem.css('height')); // Initialize width of the table

    // Update table width when window is resized
    $(window).resize(function() {
        sudokuTableElem.css('width', sudokuTableElem.css('height'));
    })
});