var validator = (function() {
    'use strict';

    return {
        validateRow: function(board, row, val) {
            var found = false;

            for(var idx=0; idx < 9 && !found; idx++) {
                if(board[row][idx].val == val) {
                    found = true;
                }
            }

            if(found) {
                return 'Value already exists in that row';
            }

            return '';
        },
        validateColumn: function(board, col, val) {
            var found = false;

            for(var idx=0; idx < 9 && !found; idx++) {
                if(board[idx][col].val && board[idx][col].val == val) {
                    found = true;
                }
            }

            if(found) {
                return 'Value already exists in that column';
            }

            return '';
        },
        validateQuadrant: function(board, row, col, val) {
            // Each quadrant as a [row, col] pair
            var quadrants = [[3,3], [3,6], [3,9], [6,3], [6,6], [6,9], [9,3], [9,6], [9,9]],
                found     = false,
                quadrantToValidate;

            for(var idx=0; idx < quadrants.length && !quadrantToValidate; idx++) {
                if(row < quadrants[idx][0] && col < quadrants[idx][1]) {
                    quadrantToValidate = quadrants[idx];
                }
            }

            for(var rowIdx=quadrantToValidate[0]-1; rowIdx >= (quadrantToValidate[0]-3); rowIdx--) {
                for(var colIdx=quadrantToValidate[1]- 1; colIdx >= (quadrantToValidate[1]-3); colIdx--) {
                    if(board[rowIdx][colIdx].val && board[rowIdx][colIdx].val == val) {
                        found = true;
                    }
                }
            }

            if(found) {
                return 'Value already exists in that quadrant';
            }

            return '';
        },
        validateInput: function(board, row, col, val) {
            var error = this.validateRow(board, row, val);

            if(error) {
                return error;
            }

            error = this.validateColumn(board, col, val);

            if(error) {
                return error;
            }

            error = this.validateQuadrant(board, row, col, val);

            return error;
        },
        validateBoard: function(board) {
            var noBlanks = true;

            for(var rowIdx=0; rowIdx < 9 && noBlanks; rowIdx++) {
                for(var colIdx=0; colIdx < 9 && noBlanks; colIdx++) {
                    if(!board[rowIdx][colIdx].val) {
                        noBlanks = false;
                    }
                }
            }

            return noBlanks;
        }
    };
})();

module.exports = validator;