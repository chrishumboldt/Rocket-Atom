'use babel';

/**
 * @author Quantify
 */

/**
 * Check that the editor row is preceeded and proceeded by an actual
 * comment string.
 *
 * @param {object} editor - The current editor instance.
 * @param {object} cursorPosition - The current cursor position.
 * @return {string}
 */
function isInCommentBlock(editor, cursorPosition) {
   // These are not the droids you're looking for.
   if (!editor || !cursorPosition) {
      return;
   }

   // Move along.
   const previousLineBufferRow = editor.lineTextForBufferRow(cursorPosition.row - 1);
   const nextLineBufferRow = editor.lineTextForBufferRow(cursorPosition.row + 1);
   const previousLine = (previousLineBufferRow) ? previousLineBufferRow.trim() : undefined;
   const nextLine = (nextLineBufferRow) ? nextLineBufferRow.trim() : undefined;

   // Check for matches.
   if (
      previousLine
      && nextLine
      && checkPreviousLine(previousLine)
      && checkNextLine(nextLine)
   ) {
      if (previousLine === '/**' || previousLine === '/*') {
         return 'secondLine';
      } else if (previousLine.substring(0, 8) === '* @param') {
         return 'parameterLine';
      } else {
         return 'genericLine';
      }
   }
}

/**
 * Check the next line and determine if we are still within a commnent.
 *
 * @param check - The line to check.
 * @return {boolean}
 */
function checkNextLine(check) {
   if (
      check === '*/'
      || check.substring(0, 2) === '*'
      || check.substring(0, 2) === '* '
   ) {
      return true;
   } else {
      return false;
   }
}

/**
 * Check the previous line and determine if its an acceptable comment line.
 *
 * @param {string} check - The line to check.
 * @return {boolean}
 */
function checkPreviousLine(check) {
   if (
      check === '/**'
      || check === '/*'
      || check.substring(0, 2) === '*'
      || check.substring(0, 2) === '* '
   ) {
      return true;
   } else {
      return false;
   }
}

// Exports.
export {
   isInCommentBlock
}
