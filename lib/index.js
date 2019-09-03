'use babel';

/**
 * @author Chris Humboldt
 */

import { CompositeDisposable, Point } from 'atom';

import { commentGenerator } from './generator/comment.generator';

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
         const newColumn = (cursorPosition.column + 3);
         const newRow = (cursorPosition.row + 1);
         const newCursorPosition = new Point(newRow, newColumn);

         /**
          * Create the comment and set the curosr in the correct position.
          */
         editor.insertText(commentGenerator('basic', cursorPosition.column));
         editor.setCursorBufferPosition(newCursorPosition);
      }
   },

   /**
    * Add a comment with an author to the current cursor position.
    */
   addCommentWithAuthor() {
      const editor = atom.workspace.getActiveTextEditor();

      if (editor) {
         const cursorPosition = editor.getCursorBufferPosition();
         const newColumn = (cursorPosition.column + 11);
         const newRow = (cursorPosition.row + 1);
         const newCursorPosition = new Point(newRow, newColumn);

         /**
          * Create the comment and set the curosr in the correct position.
          */
         editor.insertText(commentGenerator('author', cursorPosition.column));
         editor.setCursorBufferPosition(newCursorPosition);
      }
   },

   /**
    * Add a comment with parameters to the current cursor position.
    */
   addCommentWithParams() {
      const editor = atom.workspace.getActiveTextEditor();

      if (editor) {
         const cursorPosition = editor.getCursorBufferPosition();
         const newColumn = (cursorPosition.column + 3);
         const newRow = (cursorPosition.row + 1);
         const newCursorPosition = new Point(newRow, newColumn);

         /**
          * Create the comment and set the curosr in the correct position.
          */
         editor.insertText(commentGenerator('param', cursorPosition.column));
         editor.setCursorBufferPosition(newCursorPosition);
      }
   }
};
