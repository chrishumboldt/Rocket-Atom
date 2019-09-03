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
 * @return {string}
 */
function isInCommentBlock(editor, cursorPosition) {
   /**
    * These are not the droids you're looking for.
    */
   if (!editor || !cursorPosition) {
      return;
   }
   /**
    * Move along.
    */
   const previousLineBufferRow = editor.lineTextForBufferRow(cursorPosition.row - 1);
   const nextLineBufferRow = editor.lineTextForBufferRow(cursorPosition.row + 1);
   const previousLine = (previousLineBufferRow) ? previousLineBufferRow.trim() : undefined;
   const nextLine = (nextLineBufferRow) ? nextLineBufferRow.trim() : undefined;
   /**
    * Check for matches.
    */
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
   }
}

/**
 * Exports.
 */
export {
   isInCommentBlock
}
