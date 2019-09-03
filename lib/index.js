'use babel';

/**
 * @author Chris Humboldt
 */

import { CompositeDisposable } from 'atom';

import { commentGenerator } from './generator/comment.generator';
import { cursorMove } from './helper/cursor.helper';
import { isInCommentBlock } from './helper/editor.helper';

export default {
   subscriptions: null,

   activate(state) {
      this.subscriptions = new CompositeDisposable();
      /**
       * Register commands.
       */
      this.subscriptions.add(
         atom.commands.add('atom-workspace', {
            'rocket:add-comment': () => this.addComment(),
            'rocket:add-comment-with-author': () => this.addCommentWithAuthor(),
            'rocket:add-comment-with-parameters': () => this.addCommentWithParams()
         })
      );

      atom.commands.add('atom-text-editor', {
         'editor:newline': () => this.extendComment()
      });
   },

   deactivate() {
      this.subscriptions.dispose();
   },

   /**
    * Add a comment to the current cursor position.
    */
   addComment() {
      const editor = atom.workspace.getActiveTextEditor();

      if (editor) {
         const cursorPosition = editor.getCursorBufferPosition();

         /**
          * Create the comment and set the cursor in the correct position.
          */
         editor.insertText(commentGenerator('basic', cursorPosition.column));
         editor.setCursorBufferPosition(cursorMove(cursorPosition, 1, 3));
      }
   },

   /**
    * Add a comment with an author to the current cursor position.
    */
   addCommentWithAuthor() {
      const editor = atom.workspace.getActiveTextEditor();

      if (editor) {
         const cursorPosition = editor.getCursorBufferPosition();

         /**
          * Create the comment and set the cursor in the correct position.
          */
         editor.insertText(commentGenerator('author', cursorPosition.column));
         editor.setCursorBufferPosition(cursorMove(cursorPosition, 1, 11));
      }
   },

   /**
    * Add a comment with parameters to the current cursor position.
    */
   addCommentWithParams() {
      const editor = atom.workspace.getActiveTextEditor();

      if (editor) {
         const cursorPosition = editor.getCursorBufferPosition();

         /**
          * Create the comment and set the cursor in the correct position.
          */
         editor.insertText(commentGenerator('parameter', cursorPosition.column));
         editor.setCursorBufferPosition(cursorMove(cursorPosition, 1, 3));
      }
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
            /**
             * Determine what kind of line to generate based on the previous line.
             */
            if (inCommentBlock === 'secondLine') {
               editor.insertText(commentGenerator('line'));
            } else if (inCommentBlock === 'parameterLine') {
               editor.insertText(commentGenerator('parameterLine'));
            } else {
               editor.insertText(commentGenerator('trimmedLine'));
            }
         } else if (previousLine === '*/') {
            /**
             * If the previous line is the end of a comment then just push the cursor
             * back a column.
             */
            editor.setCursorBufferPosition(cursorMove(cursorPosition, 0, -1));
         }
      }
   }
};
