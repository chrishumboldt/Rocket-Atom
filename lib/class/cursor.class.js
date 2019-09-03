'use babel';

/**
 * @author Chris Humboldt
 */

import { Point } from 'atom';

export class CursorPosition {
   constructor(cursorPosition) {
      this.posX = cursorPosition.column;
      this.posY = cursorPosition.row;
   }

   /**
    * Offset a cursor position by increments.
    *
    * @param {number} x - Offset the column position by x.
    * @param {number} y - Offset the row position by y.
    */
   offset(x = 0, y = 0) {
      return new Point(this.posX + x, this.posY + y);
   }
}
