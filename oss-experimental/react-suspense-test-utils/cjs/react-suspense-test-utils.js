/**
 * @license React
 * react-suspense-test-utils.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

"use strict";
const ReactSharedInternals =
  require("react").__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
exports.waitForSuspense = function (fn) {
  const cache = new Map(),
    testDispatcher = {
      getCacheForType(resourceType) {
        let entry = cache.get(resourceType);
        void 0 === entry &&
          ((entry = resourceType()), cache.set(resourceType, entry));
        return entry;
      },
      getOwner() {
        return null;
      }
    };
  return new Promise((resolve, reject) => {
    function retry() {
      const prevDispatcher = ReactSharedInternals.A;
      ReactSharedInternals.A = testDispatcher;
      try {
        const result = fn();
        resolve(result);
      } catch (thrownValue) {
        "function" === typeof thrownValue.then
          ? thrownValue.then(retry, retry)
          : reject(thrownValue);
      } finally {
        ReactSharedInternals.A = prevDispatcher;
      }
    }
    retry();
  });
};
