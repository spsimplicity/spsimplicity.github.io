require('es6-promise').polyfill();
require('isomorphic-fetch');

window.$ = require('jquery');

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
        }
    };
})();

$(document).ready(function() {

});