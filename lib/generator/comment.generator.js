'use babel';

/**
 * @author Chris Humboldt
 */

const commentStart = '/**';
const commentLine = ' * ';
const commentLineAuthor = ' * @author ';
const commentLineParam = ' * @param ';
const commentEnd = ' */';

/**
 * Generate a line based on the spacing and text body.
 *
 * @param {string} body - The body of the line.
 * @param {number} spacing - The spacing of the line indentation.
 *
 * @return {string}
 */
function lineGenerator(body = '', spacing = 0) {
   if (body) {
      const lineLength = body.length + spacing;
      return `${body.padStart(lineLength)}`;
   } else {
      return '';
   }
}


/**
 * A generator function that will accept a comment type and spacing value to
 * determine the type of comment to create as well as the spacing required to
 * render it.
 *
 * @param {string} type - The type of comment to generate.
 * @param {number} spacing - The spacing of the comment indentation.
 *
 * @return {string}
 */
function commentGenerator(type = 'basic', spacing = 0) {
   const theComment = [];

   /**
    * Now lets create a comment based on the type.
    */
   switch (type) {
      case 'author':
         theComment.push(lineGenerator(commentStart, 0));
         theComment.push(lineGenerator(commentLineAuthor, spacing));
         theComment.push(lineGenerator(commentEnd, spacing));
         break;

      case 'line':
         theComment.push(lineGenerator(commentLine, 0));
         break;

      case 'parameter':
         theComment.push(lineGenerator(commentStart, 0));
         theComment.push(lineGenerator(commentLine, spacing));
         theComment.push(lineGenerator(commentLine, spacing));
         theComment.push(lineGenerator(commentLineParam, spacing));
         theComment.push(lineGenerator(commentEnd, spacing));
         break;

      case 'parameterLine':
         theComment.push(lineGenerator(`${commentLineParam.trim()} `, 0));
         break;

      case 'trimmedLine':
         theComment.push(lineGenerator(`${commentLine.trim()} `, 0));
         break;

      /**
       * Always fallback to the basic type regardless of the type argument.
       */
      default:
         theComment.push(lineGenerator(commentStart, 0));
         theComment.push(lineGenerator(commentLine, spacing));
         theComment.push(lineGenerator(commentEnd, spacing));
   }
   /**
    * Return the comment with line breaks.
    */
   return theComment.join('\n');
}

/**
 * Exports.
 */
export {
   commentGenerator
}
