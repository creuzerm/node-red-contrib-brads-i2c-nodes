/**
 * Copyright Bradley Smith, bradley.1.smith@gmail.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

'use strict';

const BigNumber = require('bignumber.js');

const A = new BigNumber('8.1332');
const B = new BigNumber('1763.39');
const C = new BigNumber('235.66');

function computeDewpoint(temp, rh) {
  let exponent = A.minus(B.div(C.plus(temp))).toNumber();
  let pp = Math.pow(10, exponent);
  let log10Operand = pp * rh / 100.0;
  let TDP = -1 * ( C.toNumber() + (B.toNumber() / (Math.log10(log10Operand) - A.toNumber())));
  let TDPStr = TDP.toString();
  if (TDPStr.length > 12) {
    TDP = new BigNumber( TDPStr.substr(0, 9) );
  }
  return TDP.toString();
}

exports.computeDewpoint = computeDewpoint;

function roundValue( value, decimals = 2 ) {
  let valStr = value.toString();
  if (valStr.length > 10 ) {
    valStr = valStr.substr(0, 10)
  }
  return new BigNumber(valStr).toFixed( decimals );
}

exports.roundValue = roundValue;

function printHexWord(label, value) {
  return `${label} -> 0x${value.toString(16)} (${value})`;
}

exports.printHexWord = printHexWord;