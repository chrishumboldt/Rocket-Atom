'use babel';

/**
 * @author Chris Humboldt
 */

import { CompositeDisposable, Point } from 'atom';

import { commentGenerator } from './generator/comment.generator';

export default {
   subscriptions: null,

   activate(state) {
      /**
      * Events subscribed to in atom's system can be easily cleaned up with
      * a CompositeDisposable.
      */
      this.subscriptions = new CompositeDisposable();
      /**
      * Register command that toggles this view.
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
         const newCursorPosition = new Point((cursorPosition.row + 1), (cursorPosition.column + 3));

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
         const newCursorPosition = new Point((cursorPosition.row + 1), (cursorPosition.column + 11));

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
         const newCursorPosition = new Point((cursorPosition.row + 1), (cursorPosition.column + 3));

         /**
          * Create the comment and set the curosr in the correct position.
          */
         editor.insertText(commentGenerator('param', cursorPosition.column));
         editor.setCursorBufferPosition(newCursorPosition);
      }
   }
};
