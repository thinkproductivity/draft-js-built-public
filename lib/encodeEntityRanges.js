/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * 
 * @emails oncall+draft_js
 */
'use strict';

var DraftStringKey = require("./DraftStringKey");
/**
 * Convert to UTF-8 character counts for storage.
 */


function encodeEntityRanges(block, storageMap) {
  var encoded = [];
  block.findEntityRanges(function (character) {
    return !!character.getEntity();
  }, function (
  /*number*/
  start,
  /*number*/
  end) {
    var text = block.getText();
    var key = block.getEntityAt(start);
    encoded.push({
      offset: text.slice(0, start).length,
      length: text.slice(start, end).length,
      // Encode the key as a number for range storage.
      key: Number(storageMap[DraftStringKey.stringify(key)])
    });
  });
  return encoded;
}

module.exports = encodeEntityRanges;