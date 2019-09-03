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
 *
 * @return {string|boolean}
 */
function isInCommentBlock(editor, cursorPosition) {
   const previousLine = editor.lineTextForBufferRow(cursorPosition.row - 1).trim().substring(0, 2);
   const nextLine = editor.lineTextForBufferRow(cursorPosition.row + 1).trim().substring(0, 2);

   if (
      previousLine
      && nextLine
      && (previousLine === '/*' || previousLine === '*' || previousLine === '* ')
      && (nextLine === '*/' || nextLine === '*' || nextLine === '* ')
   ) {
      if (previousLine === '/*') {
         return 'secondLine';
      } else {
         return 'greaterThanSecond';
      }
   } else {
      return false;
   }
}

/**
 * Exports.
 */
export {
   isInCommentBlock
}
