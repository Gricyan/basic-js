const { NotImplementedError } = require('../extensions/index.js');

const MODERN_ACTIVITY = 15;
const HALF_LIFE_PERIOD = 5730;
const DECAY_CONSTANT = 0.693;

/**
 * Determine the age of archeological find by using
 * given MODERN_ACTIVITY and HALF_LIFE_PERIOD values
 * 
 * @param {String} sampleActivity string representation of current activity 
 * @return {Number | Boolean} calculated age in years or false
 * in case of incorrect sampleActivity
 *
 * @example
 * 
 * dateSample('1') => 22387
 * dateSample('WOOT!') => false
 *
 */
function dateSample(SA) {

  if (isNaN(SA) || typeof SA !== 'string' || SA > MODERN_ACTIVITY || SA <= 0) return false;

  return Math.ceil((Math.log(MODERN_ACTIVITY / SA)) / (DECAY_CONSTANT / HALF_LIFE_PERIOD));
}

module.exports = {
  dateSample
};