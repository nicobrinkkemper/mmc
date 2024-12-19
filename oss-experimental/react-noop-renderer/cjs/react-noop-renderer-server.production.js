/**
 * @license React
 * react-noop-renderer-server.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

"use strict";
var ReactFizzServer = require("react-server"),
  POP = Buffer.from("/", "utf8");
function write(destination, buffer) {
  var stack = destination.stack;
  buffer === POP
    ? stack.pop()
    : ((buffer = JSON.parse(Buffer.from(buffer).toString("utf8"))),
      0 === stack.length
        ? (destination.root = buffer)
        : stack[stack.length - 1].children.push(buffer),
      stack.push(buffer));
}
var ReactNoopServer = ReactFizzServer.default({
  scheduleMicrotask: function (callback) {
    callback();
  },
  scheduleWork: function (callback) {
    callback();
  },
  beginWriting: function () {},
  writeChunk: function (destination, buffer) {
    write(destination, buffer);
  },
  writeChunkAndReturn: function (destination, buffer) {
    write(destination, buffer);
    return !0;
  },
  completeWriting: function () {},
  close: function () {},
  closeWithError: function () {},
  flushBuffered: function () {},
  getChildFormatContext: function () {
    return null;
  },
  resetResumableState: function () {},
  completeResumableState: function () {},
  pushTextInstance: function (target, text) {
    target.push(
      Buffer.from(JSON.stringify({ text: text, hidden: !1 }), "utf8"),
      POP
    );
    return !1;
  },
  pushStartInstance: function (target, type, props) {
    target.push(
      Buffer.from(
        JSON.stringify({
          type: type,
          children: [],
          prop: props.prop,
          hidden: !1
        }),
        "utf8"
      )
    );
    return props.children;
  },
  pushEndInstance: function (target) {
    target.push(POP);
  },
  pushSegmentFinale: function () {},
  writeCompletedRoot: function () {
    return !0;
  },
  writePlaceholder: function (destination, renderState, id) {
    renderState = destination.stack[destination.stack.length - 1];
    destination.placeholders.set(id, {
      parent: renderState,
      index: renderState.children.length
    });
  },
  writeStartCompletedSuspenseBoundary: function (
    destination,
    renderState,
    suspenseInstance
  ) {
    suspenseInstance.state = "complete";
    destination.stack[destination.stack.length - 1].children.push(
      suspenseInstance
    );
    destination.stack.push(suspenseInstance);
  },
  writeStartPendingSuspenseBoundary: function (
    destination,
    renderState,
    suspenseInstance
  ) {
    suspenseInstance.state = "pending";
    destination.stack[destination.stack.length - 1].children.push(
      suspenseInstance
    );
    destination.stack.push(suspenseInstance);
  },
  writeStartClientRenderedSuspenseBoundary: function (
    destination,
    renderState,
    suspenseInstance
  ) {
    suspenseInstance.state = "client-render";
    destination.stack[destination.stack.length - 1].children.push(
      suspenseInstance
    );
    destination.stack.push(suspenseInstance);
  },
  writeEndCompletedSuspenseBoundary: function (destination) {
    destination.stack.pop();
  },
  writeEndPendingSuspenseBoundary: function (destination) {
    destination.stack.pop();
  },
  writeEndClientRenderedSuspenseBoundary: function (destination) {
    destination.stack.pop();
  },
  writeStartSegment: function (destination, renderState, formatContext, id) {
    renderState = { children: [] };
    destination.segments.set(id, renderState);
    if (0 < destination.stack.length)
      throw Error("Segments are only expected at the root of the stack.");
    destination.stack.push(renderState);
  },
  writeEndSegment: function (destination) {
    destination.stack.pop();
  },
  writeCompletedSegmentInstruction: function (
    destination,
    renderState,
    contentSegmentID
  ) {
    var _placeholder$parent$c;
    renderState = destination.segments.get(contentSegmentID);
    if (!renderState) throw Error("Missing segment.");
    destination = destination.placeholders.get(contentSegmentID);
    if (!destination) throw Error("Missing placeholder.");
    (_placeholder$parent$c = destination.parent.children).splice.apply(
      _placeholder$parent$c,
      [destination.index, 0].concat(renderState.children)
    );
  },
  writeCompletedBoundaryInstruction: function (
    destination,
    renderState,
    boundary,
    contentSegmentID
  ) {
    destination = destination.segments.get(contentSegmentID);
    if (!destination) throw Error("Missing segment.");
    boundary.children = destination.children;
    boundary.state = "complete";
  },
  writeClientRenderBoundaryInstruction: function (
    destination,
    renderState,
    boundary
  ) {
    boundary.status = "client-render";
  },
  writePreamble: function () {},
  writeHoistables: function () {},
  writeHoistablesForBoundary: function () {},
  writePostamble: function () {},
  hoistHoistables: function () {},
  createHoistableState: function () {
    return null;
  },
  emitEarlyPreloads: function () {}
});
exports.render = function (children, options) {
  var destination = {
      root: null,
      placeholders: new Map(),
      segments: new Map(),
      stack: [],
      abort: function () {
        ReactNoopServer.abort(request);
      }
    },
    request = ReactNoopServer.createRequest(
      children,
      null,
      null,
      options ? options.progressiveChunkSize : void 0,
      options ? options.onError : void 0,
      options ? options.onAllReady : void 0,
      options ? options.onShellReady : void 0
    );
  ReactNoopServer.startWork(request);
  ReactNoopServer.startFlowing(request, destination);
  return destination;
};
