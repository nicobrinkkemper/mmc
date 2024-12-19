/**
 * @license React
 * react-noop-renderer-flight-server.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

"use strict";
var flightModules = require("react-noop-renderer/flight-modules"),
  ReactFlightServer = require("react-server/flight"),
  textEncoder = new TextEncoder(),
  ReactNoopFlightServer = ReactFlightServer.default({
    scheduleMicrotask: function (callback) {
      callback();
    },
    scheduleWork: function (callback) {
      callback();
    },
    beginWriting: function () {},
    writeChunk: function (destination, chunk) {
      destination.push(chunk);
    },
    writeChunkAndReturn: function (destination, chunk) {
      destination.push(chunk);
      return !0;
    },
    completeWriting: function () {},
    close: function () {},
    closeWithError: function () {},
    flushBuffered: function () {},
    stringToChunk: function (content) {
      return textEncoder.encode(content);
    },
    stringToPrecomputedChunk: function (content) {
      return textEncoder.encode(content);
    },
    isClientReference: function (reference) {
      return reference.$$typeof === Symbol.for("react.client.reference");
    },
    isServerReference: function (reference) {
      return reference.$$typeof === Symbol.for("react.server.reference");
    },
    getClientReferenceKey: function (reference) {
      return reference;
    },
    resolveClientReferenceMetadata: function (config, reference) {
      return flightModules.saveModule(reference.value);
    }
  });
exports.render = function (model, options) {
  var destination = [];
  model = ReactNoopFlightServer.createRequest(
    model,
    void 0,
    options ? options.onError : void 0,
    options ? options.identifierPrefix : void 0,
    options ? options.onPostpone : void 0,
    void 0,
    void 0,
    void 0
  );
  ReactNoopFlightServer.startWork(model);
  ReactNoopFlightServer.startFlowing(model, destination);
  return destination;
};
