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
   const previousLine = editor.lineTextForBufferRow(cursorPosition.row - 1).trim();
   const nextLine = editor.lineTextForBufferRow(cursorPosition.row + 1).trim();

   if (
      previousLine
      && nextLine
      && (previousLine === '/**' || previousLine.substring(0, 2) === '*' || previousLine.substring(0, 2) === '* ')
      && (nextLine === '*/' || nextLine.substring(0, 2) === '*' || nextLine.substring(0, 2) === '* ')
   ) {
      if (previousLine === '/**') {
         return 'secondLine';
      } else if (previousLine.substring(0, 8) === '* @param') {
         return 'parameterLine';
      } else {
         return 'genericLine';
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
