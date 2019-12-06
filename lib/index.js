'use babel';

/**
 * @author Chris Humboldt
 */

import { CompositeDisposable } from 'atom';

import { commentGenerator } from './generator/comment.generator';
import { isInCommentBlock } from './helper/editor.helper';

export default {
   subscriptions: null,

   activate() {
      this.subscriptions = new CompositeDisposable();
      // Register commands.
      atom.commands.add('atom-text-editor', {
         'editor:newline': () => this.extendComment()
      });
   },

   deactivate() {
      this.subscriptions.dispose();
   },

   /**
    * Extend a comment on enter press if within the comment block.
    */
   extendComment() {
      const editor = atom.workspace.getActiveTextEditor();

      if (editor) {
         const cursorPosition = editor.getCursorBufferPosition();
         const inCommentBlock = isInCommentBlock(editor, cursorPosition);
         const previousLine = editor.lineTextForBufferRow(cursorPosition.row - 1).trim();

         if (inCommentBlock) {
            // Determine what kind of line to generate based on the previous line.
            if (inCommentBlock === 'secondLine') {
               editor.insertText(commentGenerator('line'));
            } else if (inCommentBlock === 'parameterLine') {
               editor.insertText(commentGenerator('parameterLine'));
            } else {
               editor.insertText(commentGenerator('trimmedLine'));
            }
         } else if (previousLine === '*/') {
            /*
             * If the previous line is the end of a comment then just push the cursor
             * back a column.
             */
            editor.backspace();
         }
      }
   }
};
