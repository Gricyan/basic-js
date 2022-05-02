const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 * 
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 * 
 * @example
 * 
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 * 
 */
function transform(arr) {

  if (!Array.isArray(arr)) {
    throw new Error("'arr' parameter must be an instance of the Array!");
  }

  const resultArr = [];

  let isPrevElementDeleted = false;
  for (const [i, el] of arr.entries()) {

    if (el === '--double-next') {
      doubleNext(i);
    } else if (el === '--double-prev') {
      if (isPrevElementDeleted) {
        isPrevElementDeleted = false;
        continue;
      }

      doublePrev(i);
    } else if (el === '--discard-next') continue;
    else if (i > 0 && arr[i - 1] === '--discard-next') {
      isPrevElementDeleted = true;
      continue;
    } else if (el === '--discard-prev') {
      if (isPrevElementDeleted) {
        isPrevElementDeleted = false;
        continue;
      }

      discardPrev(i)
    } else {
      resultArr.push(el);
    }

    isPrevElementDeleted = false;
  }

  function doubleNext(i) {
    if (i !== (arr.length - 1)) {
      resultArr.push(arr[i + 1]);
    }
  }

  function doublePrev(i) {
    if (i !== 0) {
      resultArr.push(resultArr[resultArr.length - 1]);
    }
  }

  function discardPrev(i) {
    if (i !== 0) {
      resultArr.pop(resultArr[resultArr.length - 1]);
    }
  }

  return resultArr;
}







module.exports = {
  transform
};