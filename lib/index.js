'use babel';

/**
 * @author Chris Humboldt
 */

import { CompositeDisposable } from 'atom';

import { commentGenerator } from './generator/comment.generator';
import { cursorMove } from './helper/cursor.helper';

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
         editor.insertText(commentGenerator('param', cursorPosition.column));
         editor.setCursorBufferPosition(cursorMove(cursorPosition, 1, 3));
      }
   }
};
