'use babel';

/**
 * @author Chris Humboldt
 */

import { Point } from 'atom';

/**
 * Offset the position of a cursor by altering its position in increments.
 */
function cursorMove(currentPosition, offsetX = 0, offsetY = 0) {
   return new Point((currentPosition.row + offsetX), (currentPosition.column + offsetY));
}

/**
 * Exports.
 */
export {
   cursorMove
}
