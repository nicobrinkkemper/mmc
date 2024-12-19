/**
 * @license React
 * use-subscription.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

"use strict";
var shim = require("use-sync-external-store/shim");
exports.useSubscription = function (_ref) {
  return shim.useSyncExternalStore(_ref.subscribe, _ref.getCurrentValue);
};
