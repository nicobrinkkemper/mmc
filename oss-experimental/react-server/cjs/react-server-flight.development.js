/**
 * @license React
 * react-server-flight.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

"use strict";
"production" !== process.env.NODE_ENV &&
  ((module.exports = function ($$$config) {
    function voidHandler() {}
    function _defineProperty(obj, key, value) {
      key in obj
        ? Object.defineProperty(obj, key, {
            value: value,
            enumerable: !0,
            configurable: !0,
            writable: !0
          })
        : (obj[key] = value);
      return obj;
    }
    function parseStackTrace(error, skipFrames) {
      a: {
        var previousPrepare = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        try {
          var stack = String(error.stack);
          break a;
        } finally {
          Error.prepareStackTrace = previousPrepare;
        }
        stack = void 0;
      }
      stack.startsWith("Error: react-stack-top-frame\n") &&
        (stack = stack.slice(29));
      error = stack.indexOf("react-stack-bottom-frame");
      -1 !== error && (error = stack.lastIndexOf("\n", error));
      -1 !== error && (stack = stack.slice(0, error));
      stack = stack.split("\n");
      for (error = []; skipFrames < stack.length; skipFrames++)
        if ((previousPrepare = frameRegExp.exec(stack[skipFrames]))) {
          var name = previousPrepare[1] || "";
          "<anonymous>" === name && (name = "");
          var filename = previousPrepare[2] || previousPrepare[5] || "";
          "<anonymous>" === filename && (filename = "");
          error.push([
            name,
            filename,
            +(previousPrepare[3] || previousPrepare[6]),
            +(previousPrepare[4] || previousPrepare[7])
          ]);
        }
      return error;
    }
    function getIteratorFn(maybeIterable) {
      if (null === maybeIterable || "object" !== typeof maybeIterable)
        return null;
      maybeIterable =
        (MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL]) ||
        maybeIterable["@@iterator"];
      return "function" === typeof maybeIterable ? maybeIterable : null;
    }
    function noop$1() {}
    function trackUsedThenable(thenableState, thenable, index) {
      index = thenableState[index];
      void 0 === index
        ? thenableState.push(thenable)
        : index !== thenable &&
          (thenable.then(noop$1, noop$1), (thenable = index));
      switch (thenable.status) {
        case "fulfilled":
          return thenable.value;
        case "rejected":
          throw thenable.reason;
        default:
          "string" === typeof thenable.status
            ? thenable.then(noop$1, noop$1)
            : ((thenableState = thenable),
              (thenableState.status = "pending"),
              thenableState.then(
                function (fulfilledValue) {
                  if ("pending" === thenable.status) {
                    var fulfilledThenable = thenable;
                    fulfilledThenable.status = "fulfilled";
                    fulfilledThenable.value = fulfilledValue;
                  }
                },
                function (error) {
                  if ("pending" === thenable.status) {
                    var rejectedThenable = thenable;
                    rejectedThenable.status = "rejected";
                    rejectedThenable.reason = error;
                  }
                }
              ));
          switch (thenable.status) {
            case "fulfilled":
              return thenable.value;
            case "rejected":
              throw thenable.reason;
          }
          suspendedThenable = thenable;
          throw SuspenseException;
      }
    }
    function getSuspendedThenable() {
      if (null === suspendedThenable)
        throw Error(
          "Expected a suspended thenable. This is a bug in React. Please file an issue."
        );
      var thenable = suspendedThenable;
      suspendedThenable = null;
      return thenable;
    }
    function prepareToUseHooksForComponent(
      prevThenableState,
      componentDebugInfo
    ) {
      thenableIndexCounter = 0;
      thenableState = prevThenableState;
      currentComponentDebugInfo = componentDebugInfo;
    }
    function getThenableStateAfterSuspending() {
      var state = thenableState || [];
      state._componentDebugInfo = currentComponentDebugInfo;
      thenableState = currentComponentDebugInfo = null;
      return state;
    }
    function unsupportedHook() {
      throw Error("This Hook is not supported in Server Components.");
    }
    function unsupportedRefresh() {
      throw Error(
        "Refreshing the cache is not supported in Server Components."
      );
    }
    function unsupportedContext() {
      throw Error("Cannot read a Client Context from a Server Component.");
    }
    function resolveOwner() {
      return currentOwner ? currentOwner : null;
    }
    function isObjectPrototype(object) {
      if (!object) return !1;
      var ObjectPrototype = Object.prototype;
      if (object === ObjectPrototype) return !0;
      if (getPrototypeOf(object)) return !1;
      object = Object.getOwnPropertyNames(object);
      for (var i = 0; i < object.length; i++)
        if (!(object[i] in ObjectPrototype)) return !1;
      return !0;
    }
    function isSimpleObject(object) {
      if (!isObjectPrototype(getPrototypeOf(object))) return !1;
      for (
        var names = Object.getOwnPropertyNames(object), i = 0;
        i < names.length;
        i++
      ) {
        var descriptor = Object.getOwnPropertyDescriptor(object, names[i]);
        if (
          !descriptor ||
          (!descriptor.enumerable &&
            (("key" !== names[i] && "ref" !== names[i]) ||
              "function" !== typeof descriptor.get))
        )
          return !1;
      }
      return !0;
    }
    function objectName(object) {
      return Object.prototype.toString
        .call(object)
        .replace(/^\[object (.*)\]$/, function (m, p0) {
          return p0;
        });
    }
    function describeKeyForErrorMessage(key) {
      var encodedKey = JSON.stringify(key);
      return '"' + key + '"' === encodedKey ? key : encodedKey;
    }
    function describeValueForErrorMessage(value) {
      switch (typeof value) {
        case "string":
          return JSON.stringify(
            10 >= value.length ? value : value.slice(0, 10) + "..."
          );
        case "object":
          if (isArrayImpl(value)) return "[...]";
          if (null !== value && value.$$typeof === CLIENT_REFERENCE_TAG)
            return "client";
          value = objectName(value);
          return "Object" === value ? "{...}" : value;
        case "function":
          return value.$$typeof === CLIENT_REFERENCE_TAG
            ? "client"
            : (value = value.displayName || value.name)
              ? "function " + value
              : "function";
        default:
          return String(value);
      }
    }
    function describeElementType(type) {
      if ("string" === typeof type) return type;
      switch (type) {
        case REACT_SUSPENSE_TYPE:
          return "Suspense";
        case REACT_SUSPENSE_LIST_TYPE:
          return "SuspenseList";
      }
      if ("object" === typeof type)
        switch (type.$$typeof) {
          case REACT_FORWARD_REF_TYPE:
            return describeElementType(type.render);
          case REACT_MEMO_TYPE:
            return describeElementType(type.type);
          case REACT_LAZY_TYPE:
            var payload = type._payload;
            type = type._init;
            try {
              return describeElementType(type(payload));
            } catch (x) {}
        }
      return "";
    }
    function describeObjectForErrorMessage(objectOrArray, expandedName) {
      var objKind = objectName(objectOrArray);
      if ("Object" !== objKind && "Array" !== objKind) return objKind;
      var start = -1,
        length = 0;
      if (isArrayImpl(objectOrArray))
        if (jsxChildrenParents.has(objectOrArray)) {
          var type = jsxChildrenParents.get(objectOrArray);
          objKind = "<" + describeElementType(type) + ">";
          for (var i = 0; i < objectOrArray.length; i++) {
            var value = objectOrArray[i];
            value =
              "string" === typeof value
                ? value
                : "object" === typeof value && null !== value
                  ? "{" + describeObjectForErrorMessage(value) + "}"
                  : "{" + describeValueForErrorMessage(value) + "}";
            "" + i === expandedName
              ? ((start = objKind.length),
                (length = value.length),
                (objKind += value))
              : (objKind =
                  15 > value.length && 40 > objKind.length + value.length
                    ? objKind + value
                    : objKind + "{...}");
          }
          objKind += "</" + describeElementType(type) + ">";
        } else {
          objKind = "[";
          for (type = 0; type < objectOrArray.length; type++)
            0 < type && (objKind += ", "),
              (i = objectOrArray[type]),
              (i =
                "object" === typeof i && null !== i
                  ? describeObjectForErrorMessage(i)
                  : describeValueForErrorMessage(i)),
              "" + type === expandedName
                ? ((start = objKind.length),
                  (length = i.length),
                  (objKind += i))
                : (objKind =
                    10 > i.length && 40 > objKind.length + i.length
                      ? objKind + i
                      : objKind + "...");
          objKind += "]";
        }
      else if (objectOrArray.$$typeof === REACT_ELEMENT_TYPE)
        objKind = "<" + describeElementType(objectOrArray.type) + "/>";
      else {
        if (objectOrArray.$$typeof === CLIENT_REFERENCE_TAG) return "client";
        if (jsxPropsParents.has(objectOrArray)) {
          objKind = jsxPropsParents.get(objectOrArray);
          objKind = "<" + (describeElementType(objKind) || "...");
          type = Object.keys(objectOrArray);
          for (i = 0; i < type.length; i++) {
            objKind += " ";
            value = type[i];
            objKind += describeKeyForErrorMessage(value) + "=";
            var _value2 = objectOrArray[value];
            var _substr2 =
              value === expandedName &&
              "object" === typeof _value2 &&
              null !== _value2
                ? describeObjectForErrorMessage(_value2)
                : describeValueForErrorMessage(_value2);
            "string" !== typeof _value2 && (_substr2 = "{" + _substr2 + "}");
            value === expandedName
              ? ((start = objKind.length),
                (length = _substr2.length),
                (objKind += _substr2))
              : (objKind =
                  10 > _substr2.length && 40 > objKind.length + _substr2.length
                    ? objKind + _substr2
                    : objKind + "...");
          }
          objKind += ">";
        } else {
          objKind = "{";
          type = Object.keys(objectOrArray);
          for (i = 0; i < type.length; i++)
            0 < i && (objKind += ", "),
              (value = type[i]),
              (objKind += describeKeyForErrorMessage(value) + ": "),
              (_value2 = objectOrArray[value]),
              (_value2 =
                "object" === typeof _value2 && null !== _value2
                  ? describeObjectForErrorMessage(_value2)
                  : describeValueForErrorMessage(_value2)),
              value === expandedName
                ? ((start = objKind.length),
                  (length = _value2.length),
                  (objKind += _value2))
                : (objKind =
                    10 > _value2.length && 40 > objKind.length + _value2.length
                      ? objKind + _value2
                      : objKind + "...");
          objKind += "}";
        }
      }
      return void 0 === expandedName
        ? objKind
        : -1 < start && 0 < length
          ? ((objectOrArray = " ".repeat(start) + "^".repeat(length)),
            "\n  " + objKind + "\n  " + objectOrArray)
          : "\n  " + objKind;
    }
    function defaultFilterStackFrame(filename) {
      return (
        "" !== filename &&
        !filename.startsWith("node:") &&
        !filename.includes("node_modules")
      );
    }
    function filterStackTrace(request, error, skipFrames) {
      request = request.filterStackFrame;
      error = parseStackTrace(error, skipFrames);
      for (skipFrames = 0; skipFrames < error.length; skipFrames++) {
        var callsite = error[skipFrames],
          functionName = callsite[0],
          url = callsite[1];
        if (url.startsWith("rsc://React/")) {
          var envIdx = url.indexOf("/", 12),
            suffixIdx = url.lastIndexOf("?");
          -1 < envIdx &&
            -1 < suffixIdx &&
            (url = callsite[1] = url.slice(envIdx + 1, suffixIdx));
        }
        request(url, functionName) ||
          (error.splice(skipFrames, 1), skipFrames--);
      }
      return error;
    }
    function patchConsole(consoleInst, methodName) {
      var descriptor = Object.getOwnPropertyDescriptor(consoleInst, methodName);
      if (
        descriptor &&
        (descriptor.configurable || descriptor.writable) &&
        "function" === typeof descriptor.value
      ) {
        var originalMethod = descriptor.value;
        descriptor = Object.getOwnPropertyDescriptor(originalMethod, "name");
        var wrapperMethod = function () {
          var request = resolveRequest();
          if (("assert" !== methodName || !arguments[0]) && null !== request) {
            var stack = filterStackTrace(
              request,
              Error("react-stack-top-frame"),
              1
            );
            request.pendingChunks++;
            var id = request.nextChunkId++,
              owner = resolveOwner();
            emitConsoleChunk(request, id, methodName, owner, stack, arguments);
          }
          return originalMethod.apply(this, arguments);
        };
        descriptor && Object.defineProperty(wrapperMethod, "name", descriptor);
        Object.defineProperty(consoleInst, methodName, {
          value: wrapperMethod
        });
      }
    }
    function getCurrentStackInDEV() {
      var owner = resolveOwner();
      if (null === owner) return "";
      try {
        var info = "";
        if (owner.owner || "string" !== typeof owner.name) {
          for (; owner; ) {
            var ownerStack = owner.debugStack;
            if (null != ownerStack) {
              if ((owner = owner.owner)) {
                var JSCompiler_temp_const = info;
                var error = ownerStack,
                  prevPrepareStackTrace = Error.prepareStackTrace;
                Error.prepareStackTrace = void 0;
                var stack = error.stack;
                Error.prepareStackTrace = prevPrepareStackTrace;
                stack.startsWith("Error: react-stack-top-frame\n") &&
                  (stack = stack.slice(29));
                var idx = stack.indexOf("\n");
                -1 !== idx && (stack = stack.slice(idx + 1));
                idx = stack.indexOf("react-stack-bottom-frame");
                -1 !== idx && (idx = stack.lastIndexOf("\n", idx));
                var JSCompiler_inline_result =
                  -1 !== idx ? (stack = stack.slice(0, idx)) : "";
                info =
                  JSCompiler_temp_const + ("\n" + JSCompiler_inline_result);
              }
            } else break;
          }
          var JSCompiler_inline_result$jscomp$0 = info;
        } else {
          JSCompiler_temp_const = owner.name;
          if (void 0 === prefix)
            try {
              throw Error();
            } catch (x) {
              (prefix =
                ((error = x.stack.trim().match(/\n( *(at )?)/)) && error[1]) ||
                ""),
                (suffix =
                  -1 < x.stack.indexOf("\n    at")
                    ? " (<anonymous>)"
                    : -1 < x.stack.indexOf("@")
                      ? "@unknown:0:0"
                      : "");
            }
          JSCompiler_inline_result$jscomp$0 =
            "\n" + prefix + JSCompiler_temp_const + suffix;
        }
      } catch (x) {
        JSCompiler_inline_result$jscomp$0 =
          "\nError generating stack: " + x.message + "\n" + x.stack;
      }
      return JSCompiler_inline_result$jscomp$0;
    }
    function throwTaintViolation(message) {
      throw Error(message);
    }
    function cleanupTaintQueue(request) {
      request = request.taintCleanupQueue;
      TaintRegistryPendingRequests.delete(request);
      for (var i = 0; i < request.length; i++) {
        var entryValue = request[i],
          entry = TaintRegistryValues.get(entryValue);
        void 0 !== entry &&
          (1 === entry.count
            ? TaintRegistryValues.delete(entryValue)
            : entry.count--);
      }
      request.length = 0;
    }
    function defaultErrorHandler(error) {
      console.error(error);
    }
    function defaultPostponeHandler() {}
    function RequestInstance(
      type,
      model,
      bundlerConfig,
      onError,
      identifierPrefix,
      onPostpone,
      temporaryReferences,
      environmentName,
      filterStackFrame,
      onAllReady,
      onFatalError
    ) {
      if (
        null !== ReactSharedInternalsServer.A &&
        ReactSharedInternalsServer.A !== DefaultAsyncDispatcher
      )
        throw Error(
          "Currently React only supports one RSC renderer at a time."
        );
      ReactSharedInternalsServer.A = DefaultAsyncDispatcher;
      ReactSharedInternalsServer.getCurrentStack = getCurrentStackInDEV;
      var abortSet = new Set(),
        pingedTasks = [],
        cleanupQueue = [];
      TaintRegistryPendingRequests.add(cleanupQueue);
      this.type = type;
      this.status = OPENING;
      this.flushScheduled = !1;
      this.destination = this.fatalError = null;
      this.bundlerConfig = bundlerConfig;
      this.cache = new Map();
      this.pendingChunks = this.nextChunkId = 0;
      this.hints = null;
      this.abortListeners = new Set();
      this.abortableTasks = abortSet;
      this.pingedTasks = pingedTasks;
      this.completedImportChunks = [];
      this.completedHintChunks = [];
      this.completedRegularChunks = [];
      this.completedErrorChunks = [];
      this.writtenSymbols = new Map();
      this.writtenClientReferences = new Map();
      this.writtenServerReferences = new Map();
      this.writtenObjects = new WeakMap();
      this.temporaryReferences = temporaryReferences;
      this.identifierPrefix = identifierPrefix || "";
      this.identifierCount = 1;
      this.taintCleanupQueue = cleanupQueue;
      this.onError = void 0 === onError ? defaultErrorHandler : onError;
      this.onPostpone =
        void 0 === onPostpone ? defaultPostponeHandler : onPostpone;
      this.onAllReady = onAllReady;
      this.onFatalError = onFatalError;
      this.environmentName =
        void 0 === environmentName
          ? function () {
              return "Server";
            }
          : "function" !== typeof environmentName
            ? function () {
                return environmentName;
              }
            : environmentName;
      this.filterStackFrame =
        void 0 === filterStackFrame
          ? defaultFilterStackFrame
          : filterStackFrame;
      this.didWarnForKey = null;
      type = createTask(this, model, null, !1, abortSet, null, null, null);
      pingedTasks.push(type);
    }
    function noop() {}
    function resolveRequest() {
      return currentRequest ? currentRequest : null;
    }
    function serializeThenable(request, task, thenable) {
      var newTask = createTask(
        request,
        null,
        task.keyPath,
        task.implicitSlot,
        request.abortableTasks,
        task.debugOwner,
        task.debugStack,
        task.debugTask
      );
      (task = thenable._debugInfo) &&
        forwardDebugInfo(request, newTask.id, task);
      switch (thenable.status) {
        case "fulfilled":
          return (
            (newTask.model = thenable.value),
            pingTask(request, newTask),
            newTask.id
          );
        case "rejected":
          task = thenable.reason;
          if (
            "object" === typeof task &&
            null !== task &&
            task.$$typeof === REACT_POSTPONE_TYPE
          )
            logPostpone(request, task.message, newTask),
              emitPostponeChunk(request, newTask.id, task);
          else {
            var digest = logRecoverableError(request, task, null);
            emitErrorChunk(request, newTask.id, digest, task);
          }
          newTask.status = ERRORED;
          request.abortableTasks.delete(newTask);
          return newTask.id;
        default:
          if (request.status === ABORTING)
            return (
              request.abortableTasks.delete(newTask),
              (newTask.status = ABORTED),
              request.type === PRERENDER
                ? request.pendingChunks--
                : ((task = stringify(serializeByValueID(request.fatalError))),
                  emitModelChunk(request, newTask.id, task)),
              newTask.id
            );
          "string" !== typeof thenable.status &&
            ((thenable.status = "pending"),
            thenable.then(
              function (fulfilledValue) {
                "pending" === thenable.status &&
                  ((thenable.status = "fulfilled"),
                  (thenable.value = fulfilledValue));
              },
              function (error) {
                "pending" === thenable.status &&
                  ((thenable.status = "rejected"), (thenable.reason = error));
              }
            ));
      }
      thenable.then(
        function (value) {
          newTask.model = value;
          pingTask(request, newTask);
        },
        function (reason) {
          if (newTask.status === PENDING) {
            if (
              "object" === typeof reason &&
              null !== reason &&
              reason.$$typeof === REACT_POSTPONE_TYPE
            )
              logPostpone(request, reason.message, newTask),
                emitPostponeChunk(request, newTask.id, reason);
            else {
              var _digest = logRecoverableError(request, reason, newTask);
              emitErrorChunk(request, newTask.id, _digest, reason);
            }
            newTask.status = ERRORED;
            request.abortableTasks.delete(newTask);
            enqueueFlush(request);
          }
        }
      );
      return newTask.id;
    }
    function serializeReadableStream(request, task, stream) {
      function progress(entry) {
        if (!aborted)
          if (entry.done)
            request.abortListeners.delete(abortStream),
              (entry = streamTask.id.toString(16) + ":C\n"),
              request.completedRegularChunks.push(stringToChunk(entry)),
              enqueueFlush(request),
              (aborted = !0);
          else
            try {
              (streamTask.model = entry.value),
                request.pendingChunks++,
                tryStreamTask(request, streamTask),
                enqueueFlush(request),
                reader.read().then(progress, error);
            } catch (x$0) {
              error(x$0);
            }
      }
      function error(reason) {
        if (!aborted) {
          aborted = !0;
          request.abortListeners.delete(abortStream);
          var digest = logRecoverableError(request, reason, streamTask);
          emitErrorChunk(request, streamTask.id, digest, reason);
          enqueueFlush(request);
          reader.cancel(reason).then(error, error);
        }
      }
      function abortStream(reason) {
        if (!aborted) {
          aborted = !0;
          request.abortListeners.delete(abortStream);
          if (
            "object" === typeof reason &&
            null !== reason &&
            reason.$$typeof === REACT_POSTPONE_TYPE
          )
            logPostpone(request, reason.message, streamTask),
              request.type === PRERENDER
                ? request.pendingChunks--
                : (emitPostponeChunk(request, streamTask.id, reason),
                  enqueueFlush(request));
          else {
            var digest = logRecoverableError(request, reason, streamTask);
            request.type === PRERENDER
              ? request.pendingChunks--
              : (emitErrorChunk(request, streamTask.id, digest, reason),
                enqueueFlush(request));
          }
          reader.cancel(reason).then(error, error);
        }
      }
      var supportsBYOB = stream.supportsBYOB;
      if (void 0 === supportsBYOB)
        try {
          stream.getReader({ mode: "byob" }).releaseLock(), (supportsBYOB = !0);
        } catch (x) {
          supportsBYOB = !1;
        }
      var reader = stream.getReader(),
        streamTask = createTask(
          request,
          task.model,
          task.keyPath,
          task.implicitSlot,
          request.abortableTasks,
          task.debugOwner,
          task.debugStack,
          task.debugTask
        );
      request.abortableTasks.delete(streamTask);
      request.pendingChunks++;
      task =
        streamTask.id.toString(16) + ":" + (supportsBYOB ? "r" : "R") + "\n";
      request.completedRegularChunks.push(stringToChunk(task));
      var aborted = !1;
      request.abortListeners.add(abortStream);
      reader.read().then(progress, error);
      return serializeByValueID(streamTask.id);
    }
    function serializeAsyncIterable(request, task, iterable, iterator) {
      function progress(entry) {
        if (!aborted)
          if (entry.done) {
            request.abortListeners.delete(abortIterable);
            if (void 0 === entry.value)
              var endStreamRow = streamTask.id.toString(16) + ":C\n";
            else
              try {
                var chunkId = outlineModel(request, entry.value);
                endStreamRow =
                  streamTask.id.toString(16) +
                  ":C" +
                  stringify(serializeByValueID(chunkId)) +
                  "\n";
              } catch (x) {
                error(x);
                return;
              }
            request.completedRegularChunks.push(stringToChunk(endStreamRow));
            enqueueFlush(request);
            aborted = !0;
          } else
            try {
              (streamTask.model = entry.value),
                request.pendingChunks++,
                tryStreamTask(request, streamTask),
                enqueueFlush(request),
                callIteratorInDEV(iterator, progress, error);
            } catch (x$1) {
              error(x$1);
            }
      }
      function error(reason) {
        if (!aborted) {
          aborted = !0;
          request.abortListeners.delete(abortIterable);
          var digest = logRecoverableError(request, reason, streamTask);
          emitErrorChunk(request, streamTask.id, digest, reason);
          enqueueFlush(request);
          "function" === typeof iterator.throw &&
            iterator.throw(reason).then(error, error);
        }
      }
      function abortIterable(reason) {
        if (!aborted) {
          aborted = !0;
          request.abortListeners.delete(abortIterable);
          if (
            "object" === typeof reason &&
            null !== reason &&
            reason.$$typeof === REACT_POSTPONE_TYPE
          )
            logPostpone(request, reason.message, streamTask),
              request.type === PRERENDER
                ? request.pendingChunks--
                : (emitPostponeChunk(request, streamTask.id, reason),
                  enqueueFlush(request));
          else {
            var digest = logRecoverableError(request, reason, streamTask);
            request.type === PRERENDER
              ? request.pendingChunks--
              : (emitErrorChunk(request, streamTask.id, digest, reason),
                enqueueFlush(request));
          }
          "function" === typeof iterator.throw &&
            iterator.throw(reason).then(error, error);
        }
      }
      var isIterator = iterable === iterator,
        streamTask = createTask(
          request,
          task.model,
          task.keyPath,
          task.implicitSlot,
          request.abortableTasks,
          task.debugOwner,
          task.debugStack,
          task.debugTask
        );
      request.abortableTasks.delete(streamTask);
      request.pendingChunks++;
      task = streamTask.id.toString(16) + ":" + (isIterator ? "x" : "X") + "\n";
      request.completedRegularChunks.push(stringToChunk(task));
      (iterable = iterable._debugInfo) &&
        forwardDebugInfo(request, streamTask.id, iterable);
      var aborted = !1;
      request.abortListeners.add(abortIterable);
      callIteratorInDEV(iterator, progress, error);
      return serializeByValueID(streamTask.id);
    }
    function readThenable(thenable) {
      if ("fulfilled" === thenable.status) return thenable.value;
      if ("rejected" === thenable.status) throw thenable.reason;
      throw thenable;
    }
    function createLazyWrapperAroundWakeable(wakeable) {
      switch (wakeable.status) {
        case "fulfilled":
        case "rejected":
          break;
        default:
          "string" !== typeof wakeable.status &&
            ((wakeable.status = "pending"),
            wakeable.then(
              function (fulfilledValue) {
                "pending" === wakeable.status &&
                  ((wakeable.status = "fulfilled"),
                  (wakeable.value = fulfilledValue));
              },
              function (error) {
                "pending" === wakeable.status &&
                  ((wakeable.status = "rejected"), (wakeable.reason = error));
              }
            ));
      }
      var lazyType = {
        $$typeof: REACT_LAZY_TYPE,
        _payload: wakeable,
        _init: readThenable
      };
      lazyType._debugInfo = wakeable._debugInfo || [];
      return lazyType;
    }
    function callWithDebugContextInDEV(request, task, callback, arg) {
      var componentDebugInfo = {
        name: "",
        env: task.environmentName,
        key: null,
        owner: task.debugOwner
      };
      componentDebugInfo.stack =
        null === task.debugStack
          ? null
          : filterStackTrace(request, task.debugStack, 1);
      componentDebugInfo.debugStack = task.debugStack;
      request = componentDebugInfo.debugTask = task.debugTask;
      currentOwner = componentDebugInfo;
      try {
        return request ? request.run(callback.bind(null, arg)) : callback(arg);
      } finally {
        currentOwner = null;
      }
    }
    function renderFunctionComponent(
      request,
      task,
      key,
      Component,
      props,
      validated
    ) {
      var prevThenableState = task.thenableState;
      task.thenableState = null;
      if (null === debugID) return outlineTask(request, task);
      if (null !== prevThenableState)
        var componentDebugInfo = prevThenableState._componentDebugInfo;
      else {
        var componentDebugID = debugID;
        componentDebugInfo = Component.displayName || Component.name || "";
        var componentEnv = (0, request.environmentName)();
        request.pendingChunks++;
        componentDebugInfo = {
          name: componentDebugInfo,
          env: componentEnv,
          key: key,
          owner: task.debugOwner
        };
        componentDebugInfo.stack =
          null === task.debugStack
            ? null
            : filterStackTrace(request, task.debugStack, 1);
        componentDebugInfo.props = props;
        componentDebugInfo.debugStack = task.debugStack;
        componentDebugInfo.debugTask = task.debugTask;
        outlineComponentInfo(request, componentDebugInfo);
        emitDebugChunk(request, componentDebugID, componentDebugInfo);
        task.environmentName = componentEnv;
        2 === validated &&
          warnForMissingKey(request, key, componentDebugInfo, task.debugTask);
      }
      prepareToUseHooksForComponent(prevThenableState, componentDebugInfo);
      props = task.debugTask
        ? task.debugTask.run(
            callComponentInDEV.bind(null, Component, props, componentDebugInfo)
          )
        : callComponentInDEV(Component, props, componentDebugInfo);
      if (request.status === ABORTING)
        throw (
          ("object" !== typeof props ||
            null === props ||
            "function" !== typeof props.then ||
            isClientReference(props) ||
            props.then(voidHandler, voidHandler),
          null)
        );
      if (
        "object" === typeof props &&
        null !== props &&
        !isClientReference(props)
      ) {
        if ("function" === typeof props.then) {
          validated = props;
          validated.then(function (resolvedValue) {
            "object" === typeof resolvedValue &&
              null !== resolvedValue &&
              resolvedValue.$$typeof === REACT_ELEMENT_TYPE &&
              (resolvedValue._store.validated = 1);
          }, voidHandler);
          if ("fulfilled" === validated.status) return validated.value;
          props = createLazyWrapperAroundWakeable(props);
        }
        var iteratorFn = getIteratorFn(props);
        if (iteratorFn) {
          var iterableChild = props;
          props = _defineProperty({}, Symbol.iterator, function () {
            var iterator = iteratorFn.call(iterableChild);
            iterator !== iterableChild ||
              ("[object GeneratorFunction]" ===
                Object.prototype.toString.call(Component) &&
                "[object Generator]" ===
                  Object.prototype.toString.call(iterableChild)) ||
              callWithDebugContextInDEV(request, task, function () {
                console.error(
                  "Returning an Iterator from a Server Component is not supported since it cannot be looped over more than once. "
                );
              });
            return iterator;
          });
          props._debugInfo = iterableChild._debugInfo;
        } else if (
          "function" !== typeof props[ASYNC_ITERATOR] ||
          ("function" === typeof ReadableStream &&
            props instanceof ReadableStream)
        )
          props.$$typeof === REACT_ELEMENT_TYPE && (props._store.validated = 1);
        else {
          var _iterableChild = props;
          props = _defineProperty({}, ASYNC_ITERATOR, function () {
            var iterator = _iterableChild[ASYNC_ITERATOR]();
            iterator !== _iterableChild ||
              ("[object AsyncGeneratorFunction]" ===
                Object.prototype.toString.call(Component) &&
                "[object AsyncGenerator]" ===
                  Object.prototype.toString.call(_iterableChild)) ||
              callWithDebugContextInDEV(request, task, function () {
                console.error(
                  "Returning an AsyncIterator from a Server Component is not supported since it cannot be looped over more than once. "
                );
              });
            return iterator;
          });
          props._debugInfo = _iterableChild._debugInfo;
        }
      }
      validated = task.keyPath;
      prevThenableState = task.implicitSlot;
      null !== key
        ? (task.keyPath = null === validated ? key : validated + "," + key)
        : null === validated && (task.implicitSlot = !0);
      key = renderModelDestructive(request, task, emptyRoot, "", props);
      task.keyPath = validated;
      task.implicitSlot = prevThenableState;
      return key;
    }
    function warnForMissingKey(request, key, componentDebugInfo, debugTask) {
      function logKeyError() {
        console.error(
          'Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.',
          "",
          ""
        );
      }
      key = request.didWarnForKey;
      null == key && (key = request.didWarnForKey = new WeakSet());
      request = componentDebugInfo.owner;
      if (null != request) {
        if (key.has(request)) return;
        key.add(request);
      }
      debugTask
        ? debugTask.run(
            callComponentInDEV.bind(null, logKeyError, null, componentDebugInfo)
          )
        : callComponentInDEV(logKeyError, null, componentDebugInfo);
    }
    function renderFragment(request, task, children) {
      for (var i = 0; i < children.length; i++) {
        var child = children[i];
        null === child ||
          "object" !== typeof child ||
          child.$$typeof !== REACT_ELEMENT_TYPE ||
          null !== child.key ||
          child._store.validated ||
          (child._store.validated = 2);
      }
      if (null !== task.keyPath)
        return (
          (request = [
            REACT_ELEMENT_TYPE,
            REACT_FRAGMENT_TYPE,
            task.keyPath,
            { children: children },
            null,
            null,
            0
          ]),
          task.implicitSlot ? [request] : request
        );
      if ((i = children._debugInfo)) {
        if (null === debugID) return outlineTask(request, task);
        forwardDebugInfo(request, debugID, i);
        children = Array.from(children);
      }
      return children;
    }
    function renderAsyncFragment(request, task, children, getAsyncIterator) {
      if (null !== task.keyPath)
        return (
          (request = [
            REACT_ELEMENT_TYPE,
            REACT_FRAGMENT_TYPE,
            task.keyPath,
            { children: children },
            null,
            null,
            0
          ]),
          task.implicitSlot ? [request] : request
        );
      getAsyncIterator = getAsyncIterator.call(children);
      return serializeAsyncIterable(request, task, children, getAsyncIterator);
    }
    function outlineTask(request, task) {
      task = createTask(
        request,
        task.model,
        task.keyPath,
        task.implicitSlot,
        request.abortableTasks,
        task.debugOwner,
        task.debugStack,
        task.debugTask
      );
      retryTask(request, task);
      return task.status === COMPLETED
        ? serializeByValueID(task.id)
        : serializeLazyID(task.id);
    }
    function renderElement(request, task, type, key, ref, props, validated) {
      if (null !== ref && void 0 !== ref)
        throw Error(
          "Refs cannot be used in Server Components, nor passed to Client Components."
        );
      jsxPropsParents.set(props, type);
      "object" === typeof props.children &&
        null !== props.children &&
        jsxChildrenParents.set(props.children, type);
      if (
        "function" !== typeof type ||
        isClientReference(type) ||
        type.$$typeof === TEMPORARY_REFERENCE_TAG
      ) {
        if (type === REACT_FRAGMENT_TYPE && null === key)
          return (
            2 === validated &&
              ((validated = {
                name: "Fragment",
                env: (0, request.environmentName)(),
                key: key,
                owner: task.debugOwner,
                stack:
                  null === task.debugStack
                    ? null
                    : filterStackTrace(request, task.debugStack, 1),
                props: props,
                debugStack: task.debugStack,
                debugTask: task.debugTask
              }),
              warnForMissingKey(request, key, validated, task.debugTask)),
            (validated = task.implicitSlot),
            null === task.keyPath && (task.implicitSlot = !0),
            (request = renderModelDestructive(
              request,
              task,
              emptyRoot,
              "",
              props.children
            )),
            (task.implicitSlot = validated),
            request
          );
        if (
          null != type &&
          "object" === typeof type &&
          !isClientReference(type)
        )
          switch (type.$$typeof) {
            case REACT_LAZY_TYPE:
              type = callLazyInitInDEV(type);
              if (request.status === ABORTING) throw null;
              return renderElement(
                request,
                task,
                type,
                key,
                ref,
                props,
                validated
              );
            case REACT_FORWARD_REF_TYPE:
              return renderFunctionComponent(
                request,
                task,
                key,
                type.render,
                props,
                validated
              );
            case REACT_MEMO_TYPE:
              return renderElement(
                request,
                task,
                type.type,
                key,
                ref,
                props,
                validated
              );
            case REACT_ELEMENT_TYPE:
              type._store.validated = 1;
          }
      } else
        return renderFunctionComponent(
          request,
          task,
          key,
          type,
          props,
          validated
        );
      ref = task.keyPath;
      null === key ? (key = ref) : null !== ref && (key = ref + "," + key);
      null !== task.debugOwner &&
        outlineComponentInfo(request, task.debugOwner);
      request = [
        REACT_ELEMENT_TYPE,
        type,
        key,
        props,
        task.debugOwner,
        null === task.debugStack
          ? null
          : filterStackTrace(request, task.debugStack, 1),
        validated
      ];
      task = task.implicitSlot && null !== key ? [request] : request;
      return task;
    }
    function pingTask(request, task) {
      var pingedTasks = request.pingedTasks;
      pingedTasks.push(task);
      1 === pingedTasks.length &&
        ((request.flushScheduled = null !== request.destination),
        request.type === PRERENDER || request.status === OPENING
          ? scheduleMicrotask(function () {
              return performWork(request);
            })
          : scheduleWork(function () {
              return performWork(request);
            }));
    }
    function createTask(
      request,
      model,
      keyPath,
      implicitSlot,
      abortSet,
      debugOwner,
      debugStack,
      debugTask
    ) {
      request.pendingChunks++;
      var id = request.nextChunkId++;
      "object" !== typeof model ||
        null === model ||
        null !== keyPath ||
        implicitSlot ||
        request.writtenObjects.set(model, serializeByValueID(id));
      var task = {
        id: id,
        status: PENDING,
        model: model,
        keyPath: keyPath,
        implicitSlot: implicitSlot,
        ping: function () {
          return pingTask(request, task);
        },
        toJSON: function (parentPropertyName, value) {
          var parent = this,
            originalValue = parent[parentPropertyName];
          "object" !== typeof originalValue ||
            originalValue === value ||
            originalValue instanceof Date ||
            callWithDebugContextInDEV(request, task, function () {
              "Object" !== objectName(originalValue)
                ? "string" === typeof jsxChildrenParents.get(parent)
                  ? console.error(
                      "%s objects cannot be rendered as text children. Try formatting it using toString().%s",
                      objectName(originalValue),
                      describeObjectForErrorMessage(parent, parentPropertyName)
                    )
                  : console.error(
                      "Only plain objects can be passed to Client Components from Server Components. %s objects are not supported.%s",
                      objectName(originalValue),
                      describeObjectForErrorMessage(parent, parentPropertyName)
                    )
                : console.error(
                    "Only plain objects can be passed to Client Components from Server Components. Objects with toJSON methods are not supported. Convert it manually to a simple value before passing it to props.%s",
                    describeObjectForErrorMessage(parent, parentPropertyName)
                  );
            });
          return renderModel(request, task, parent, parentPropertyName, value);
        },
        thenableState: null
      };
      task.environmentName = request.environmentName();
      task.debugOwner = debugOwner;
      task.debugStack = debugStack;
      task.debugTask = debugTask;
      abortSet.add(task);
      return task;
    }
    function serializeByValueID(id) {
      return "$" + id.toString(16);
    }
    function serializeLazyID(id) {
      return "$L" + id.toString(16);
    }
    function serializeNumber(number) {
      return Number.isFinite(number)
        ? 0 === number && -Infinity === 1 / number
          ? "$-0"
          : number
        : Infinity === number
          ? "$Infinity"
          : -Infinity === number
            ? "$-Infinity"
            : "$NaN";
    }
    function serializeRowHeader(tag, id) {
      return id.toString(16) + ":" + tag;
    }
    function encodeReferenceChunk(request, id, reference) {
      request = stringify(reference);
      id = id.toString(16) + ":" + request + "\n";
      return stringToChunk(id);
    }
    function serializeClientReference(
      request,
      parent,
      parentPropertyName,
      clientReference
    ) {
      var clientReferenceKey = getClientReferenceKey(clientReference),
        writtenClientReferences = request.writtenClientReferences,
        existingId = writtenClientReferences.get(clientReferenceKey);
      if (void 0 !== existingId)
        return parent[0] === REACT_ELEMENT_TYPE && "1" === parentPropertyName
          ? serializeLazyID(existingId)
          : serializeByValueID(existingId);
      try {
        var clientReferenceMetadata = resolveClientReferenceMetadata(
          request.bundlerConfig,
          clientReference
        );
        request.pendingChunks++;
        var importId = request.nextChunkId++,
          json = stringify(clientReferenceMetadata),
          row = serializeRowHeader("I", importId) + json + "\n",
          processedChunk = stringToChunk(row);
        request.completedImportChunks.push(processedChunk);
        writtenClientReferences.set(clientReferenceKey, importId);
        return parent[0] === REACT_ELEMENT_TYPE && "1" === parentPropertyName
          ? serializeLazyID(importId)
          : serializeByValueID(importId);
      } catch (x) {
        return (
          request.pendingChunks++,
          (parent = request.nextChunkId++),
          (parentPropertyName = logRecoverableError(request, x, null)),
          emitErrorChunk(request, parent, parentPropertyName, x),
          serializeByValueID(parent)
        );
      }
    }
    function outlineModel(request, value) {
      value = createTask(
        request,
        value,
        null,
        !1,
        request.abortableTasks,
        null,
        null,
        null
      );
      retryTask(request, value);
      return value.id;
    }
    function serializeServerReference(request, serverReference) {
      var writtenServerReferences = request.writtenServerReferences,
        existingId = writtenServerReferences.get(serverReference);
      if (void 0 !== existingId) return "$F" + existingId.toString(16);
      existingId = getServerReferenceBoundArguments(
        request.bundlerConfig,
        serverReference
      );
      existingId = null === existingId ? null : Promise.resolve(existingId);
      var id = getServerReferenceId(request.bundlerConfig, serverReference),
        location = null,
        error = getServerReferenceLocation(
          request.bundlerConfig,
          serverReference
        );
      error &&
        ((error = parseStackTrace(error, 1)),
        0 < error.length && (location = error[0]));
      existingId =
        null !== location
          ? {
              id: id,
              bound: existingId,
              name:
                "function" === typeof serverReference
                  ? serverReference.name
                  : "",
              env: (0, request.environmentName)(),
              location: location
            }
          : { id: id, bound: existingId };
      request = outlineModel(request, existingId);
      writtenServerReferences.set(serverReference, request);
      return "$F" + request.toString(16);
    }
    function serializeLargeTextString(request, text) {
      request.pendingChunks++;
      var textId = request.nextChunkId++;
      emitTextChunk(request, textId, text);
      return serializeByValueID(textId);
    }
    function serializeMap(request, map) {
      map = Array.from(map);
      return "$Q" + outlineModel(request, map).toString(16);
    }
    function serializeFormData(request, formData) {
      formData = Array.from(formData.entries());
      return "$K" + outlineModel(request, formData).toString(16);
    }
    function serializeSet(request, set) {
      set = Array.from(set);
      return "$W" + outlineModel(request, set).toString(16);
    }
    function serializeTypedArray(request, tag, typedArray) {
      request.pendingChunks++;
      var bufferId = request.nextChunkId++;
      emitTypedArrayChunk(request, bufferId, tag, typedArray);
      return serializeByValueID(bufferId);
    }
    function serializeBlob(request, blob) {
      function progress(entry) {
        if (!aborted)
          if (entry.done)
            request.abortListeners.delete(abortBlob),
              (aborted = !0),
              pingTask(request, newTask);
          else
            return (
              model.push(entry.value), reader.read().then(progress).catch(error)
            );
      }
      function error(reason) {
        if (!aborted) {
          aborted = !0;
          request.abortListeners.delete(abortBlob);
          var digest = logRecoverableError(request, reason, newTask);
          emitErrorChunk(request, newTask.id, digest, reason);
          enqueueFlush(request);
          reader.cancel(reason).then(error, error);
        }
      }
      function abortBlob(reason) {
        if (!aborted) {
          aborted = !0;
          request.abortListeners.delete(abortBlob);
          if (
            "object" === typeof reason &&
            null !== reason &&
            reason.$$typeof === REACT_POSTPONE_TYPE
          )
            logPostpone(request, reason.message, newTask),
              request.type === PRERENDER
                ? request.pendingChunks--
                : (emitPostponeChunk(request, newTask.id, reason),
                  enqueueFlush(request));
          else {
            var digest = logRecoverableError(request, reason, newTask);
            request.type === PRERENDER
              ? request.pendingChunks--
              : (emitErrorChunk(request, newTask.id, digest, reason),
                enqueueFlush(request));
          }
          reader.cancel(reason).then(error, error);
        }
      }
      var model = [blob.type],
        newTask = createTask(
          request,
          model,
          null,
          !1,
          request.abortableTasks,
          null,
          null,
          null
        ),
        reader = blob.stream().getReader(),
        aborted = !1;
      request.abortListeners.add(abortBlob);
      reader.read().then(progress).catch(error);
      return "$B" + newTask.id.toString(16);
    }
    function renderModel(request, task, parent, key, value) {
      var prevKeyPath = task.keyPath,
        prevImplicitSlot = task.implicitSlot;
      try {
        return renderModelDestructive(request, task, parent, key, value);
      } catch (thrownValue) {
        parent = task.model;
        parent =
          "object" === typeof parent &&
          null !== parent &&
          (parent.$$typeof === REACT_ELEMENT_TYPE ||
            parent.$$typeof === REACT_LAZY_TYPE);
        if (request.status === ABORTING) {
          task.status = ABORTED;
          if (request.type === PRERENDER)
            return (
              (task = request.nextChunkId++),
              (task = parent
                ? serializeLazyID(task)
                : serializeByValueID(task)),
              task
            );
          task = request.fatalError;
          return parent ? serializeLazyID(task) : serializeByValueID(task);
        }
        key =
          thrownValue === SuspenseException
            ? getSuspendedThenable()
            : thrownValue;
        if ("object" === typeof key && null !== key) {
          if ("function" === typeof key.then)
            return (
              (request = createTask(
                request,
                task.model,
                task.keyPath,
                task.implicitSlot,
                request.abortableTasks,
                task.debugOwner,
                task.debugStack,
                task.debugTask
              )),
              (value = request.ping),
              key.then(value, value),
              (request.thenableState = getThenableStateAfterSuspending()),
              (task.keyPath = prevKeyPath),
              (task.implicitSlot = prevImplicitSlot),
              parent
                ? serializeLazyID(request.id)
                : serializeByValueID(request.id)
            );
          if (key.$$typeof === REACT_POSTPONE_TYPE)
            return (
              request.pendingChunks++,
              (value = request.nextChunkId++),
              logPostpone(request, key.message, task),
              emitPostponeChunk(request, value, key),
              (task.keyPath = prevKeyPath),
              (task.implicitSlot = prevImplicitSlot),
              parent ? serializeLazyID(value) : serializeByValueID(value)
            );
        }
        task.keyPath = prevKeyPath;
        task.implicitSlot = prevImplicitSlot;
        request.pendingChunks++;
        prevKeyPath = request.nextChunkId++;
        task = logRecoverableError(request, key, task);
        emitErrorChunk(request, prevKeyPath, task, key);
        return parent
          ? serializeLazyID(prevKeyPath)
          : serializeByValueID(prevKeyPath);
      }
    }
    function renderModelDestructive(
      request,
      task,
      parent,
      parentPropertyName,
      value
    ) {
      task.model = value;
      if (value === REACT_ELEMENT_TYPE) return "$";
      if (null === value) return null;
      if ("object" === typeof value) {
        switch (value.$$typeof) {
          case REACT_ELEMENT_TYPE:
            var elementReference = null,
              _writtenObjects = request.writtenObjects;
            if (null === task.keyPath && !task.implicitSlot) {
              var _existingReference = _writtenObjects.get(value);
              if (void 0 !== _existingReference)
                if (modelRoot === value) modelRoot = null;
                else return _existingReference;
              else
                -1 === parentPropertyName.indexOf(":") &&
                  ((_existingReference = _writtenObjects.get(parent)),
                  void 0 !== _existingReference &&
                    ((elementReference =
                      _existingReference + ":" + parentPropertyName),
                    _writtenObjects.set(value, elementReference)));
            }
            if ((_existingReference = value._debugInfo)) {
              if (null === debugID) return outlineTask(request, task);
              forwardDebugInfo(request, debugID, _existingReference);
            }
            _existingReference = value.props;
            var refProp = _existingReference.ref;
            task.debugOwner = value._owner;
            task.debugStack = value._debugStack;
            task.debugTask = value._debugTask;
            request = renderElement(
              request,
              task,
              value.type,
              value.key,
              void 0 !== refProp ? refProp : null,
              _existingReference,
              value._store.validated
            );
            "object" === typeof request &&
              null !== request &&
              null !== elementReference &&
              (_writtenObjects.has(request) ||
                _writtenObjects.set(request, elementReference));
            return request;
          case REACT_LAZY_TYPE:
            task.thenableState = null;
            elementReference = callLazyInitInDEV(value);
            if (request.status === ABORTING) throw null;
            if ((_writtenObjects = value._debugInfo)) {
              if (null === debugID) return outlineTask(request, task);
              forwardDebugInfo(request, debugID, _writtenObjects);
            }
            return renderModelDestructive(
              request,
              task,
              emptyRoot,
              "",
              elementReference
            );
          case REACT_LEGACY_ELEMENT_TYPE:
            throw Error(
              'A React Element from an older version of React was rendered. This is not supported. It can happen if:\n- Multiple copies of the "react" package is used.\n- A library pre-bundled an old copy of "react" or "react/jsx-runtime".\n- A compiler tries to "inline" JSX instead of using the runtime.'
            );
        }
        if (isClientReference(value))
          return serializeClientReference(
            request,
            parent,
            parentPropertyName,
            value
          );
        if (
          void 0 !== request.temporaryReferences &&
          ((elementReference = request.temporaryReferences.get(value)),
          void 0 !== elementReference)
        )
          return "$T" + elementReference;
        elementReference = TaintRegistryObjects.get(value);
        void 0 !== elementReference && throwTaintViolation(elementReference);
        elementReference = request.writtenObjects;
        _writtenObjects = elementReference.get(value);
        if ("function" === typeof value.then) {
          if (void 0 !== _writtenObjects) {
            if (null !== task.keyPath || task.implicitSlot)
              return (
                "$@" + serializeThenable(request, task, value).toString(16)
              );
            if (modelRoot === value) modelRoot = null;
            else return _writtenObjects;
          }
          request = "$@" + serializeThenable(request, task, value).toString(16);
          elementReference.set(value, request);
          return request;
        }
        if (void 0 !== _writtenObjects)
          if (modelRoot === value) modelRoot = null;
          else return _writtenObjects;
        else if (
          -1 === parentPropertyName.indexOf(":") &&
          ((_writtenObjects = elementReference.get(parent)),
          void 0 !== _writtenObjects)
        ) {
          _existingReference = parentPropertyName;
          if (isArrayImpl(parent) && parent[0] === REACT_ELEMENT_TYPE)
            switch (parentPropertyName) {
              case "1":
                _existingReference = "type";
                break;
              case "2":
                _existingReference = "key";
                break;
              case "3":
                _existingReference = "props";
                break;
              case "4":
                _existingReference = "_owner";
            }
          elementReference.set(
            value,
            _writtenObjects + ":" + _existingReference
          );
        }
        if (isArrayImpl(value)) return renderFragment(request, task, value);
        if (value instanceof Map) return serializeMap(request, value);
        if (value instanceof Set) return serializeSet(request, value);
        if ("function" === typeof FormData && value instanceof FormData)
          return serializeFormData(request, value);
        if (value instanceof Error) return serializeErrorValue(request, value);
        if (value instanceof ArrayBuffer)
          return serializeTypedArray(request, "A", new Uint8Array(value));
        if (value instanceof Int8Array)
          return serializeTypedArray(request, "O", value);
        if (value instanceof Uint8Array)
          return serializeTypedArray(request, "o", value);
        if (value instanceof Uint8ClampedArray)
          return serializeTypedArray(request, "U", value);
        if (value instanceof Int16Array)
          return serializeTypedArray(request, "S", value);
        if (value instanceof Uint16Array)
          return serializeTypedArray(request, "s", value);
        if (value instanceof Int32Array)
          return serializeTypedArray(request, "L", value);
        if (value instanceof Uint32Array)
          return serializeTypedArray(request, "l", value);
        if (value instanceof Float32Array)
          return serializeTypedArray(request, "G", value);
        if (value instanceof Float64Array)
          return serializeTypedArray(request, "g", value);
        if (value instanceof BigInt64Array)
          return serializeTypedArray(request, "M", value);
        if (value instanceof BigUint64Array)
          return serializeTypedArray(request, "m", value);
        if (value instanceof DataView)
          return serializeTypedArray(request, "V", value);
        if ("function" === typeof Blob && value instanceof Blob)
          return serializeBlob(request, value);
        if ((elementReference = getIteratorFn(value)))
          return (
            (elementReference = elementReference.call(value)),
            elementReference === value
              ? "$i" +
                outlineModel(request, Array.from(elementReference)).toString(16)
              : renderFragment(request, task, Array.from(elementReference))
          );
        if (
          "function" === typeof ReadableStream &&
          value instanceof ReadableStream
        )
          return serializeReadableStream(request, task, value);
        elementReference = value[ASYNC_ITERATOR];
        if ("function" === typeof elementReference)
          return renderAsyncFragment(request, task, value, elementReference);
        if (value instanceof Date) return "$D" + value.toJSON();
        elementReference = getPrototypeOf(value);
        if (
          elementReference !== ObjectPrototype &&
          (null === elementReference ||
            null !== getPrototypeOf(elementReference))
        )
          throw Error(
            "Only plain objects, and a few built-ins, can be passed to Client Components from Server Components. Classes or null prototypes are not supported." +
              describeObjectForErrorMessage(parent, parentPropertyName)
          );
        if ("Object" !== objectName(value))
          callWithDebugContextInDEV(request, task, function () {
            console.error(
              "Only plain objects can be passed to Client Components from Server Components. %s objects are not supported.%s",
              objectName(value),
              describeObjectForErrorMessage(parent, parentPropertyName)
            );
          });
        else if (!isSimpleObject(value))
          callWithDebugContextInDEV(request, task, function () {
            console.error(
              "Only plain objects can be passed to Client Components from Server Components. Classes or other objects with methods are not supported.%s",
              describeObjectForErrorMessage(parent, parentPropertyName)
            );
          });
        else if (Object.getOwnPropertySymbols) {
          var symbols = Object.getOwnPropertySymbols(value);
          0 < symbols.length &&
            callWithDebugContextInDEV(request, task, function () {
              console.error(
                "Only plain objects can be passed to Client Components from Server Components. Objects with symbol properties like %s are not supported.%s",
                symbols[0].description,
                describeObjectForErrorMessage(parent, parentPropertyName)
              );
            });
        }
        return value;
      }
      if ("string" === typeof value)
        return (
          (task = TaintRegistryValues.get(value)),
          void 0 !== task && throwTaintViolation(task.message),
          "Z" === value[value.length - 1] &&
          parent[parentPropertyName] instanceof Date
            ? "$D" + value
            : 1024 <= value.length && null !== byteLengthOfChunk
              ? serializeLargeTextString(request, value)
              : "$" === value[0]
                ? "$" + value
                : value
        );
      if ("boolean" === typeof value) return value;
      if ("number" === typeof value) return serializeNumber(value);
      if ("undefined" === typeof value) return "$undefined";
      if ("function" === typeof value) {
        if (isClientReference(value))
          return serializeClientReference(
            request,
            parent,
            parentPropertyName,
            value
          );
        if (isServerReference(value))
          return serializeServerReference(request, value);
        if (
          void 0 !== request.temporaryReferences &&
          ((request = request.temporaryReferences.get(value)),
          void 0 !== request)
        )
          return "$T" + request;
        request = TaintRegistryObjects.get(value);
        void 0 !== request && throwTaintViolation(request);
        if (value.$$typeof === TEMPORARY_REFERENCE_TAG)
          throw Error(
            "Could not reference an opaque temporary reference. This is likely due to misconfiguring the temporaryReferences options on the server."
          );
        if (/^on[A-Z]/.test(parentPropertyName))
          throw Error(
            "Event handlers cannot be passed to Client Component props." +
              describeObjectForErrorMessage(parent, parentPropertyName) +
              "\nIf you need interactivity, consider converting part of this to a Client Component."
          );
        if (
          jsxChildrenParents.has(parent) ||
          (jsxPropsParents.has(parent) && "children" === parentPropertyName)
        )
          throw (
            ((request = value.displayName || value.name || "Component"),
            Error(
              "Functions are not valid as a child of Client Components. This may happen if you return " +
                request +
                " instead of <" +
                request +
                " /> from render. Or maybe you meant to call this function rather than return it." +
                describeObjectForErrorMessage(parent, parentPropertyName)
            ))
          );
        throw Error(
          'Functions cannot be passed directly to Client Components unless you explicitly expose it by marking it with "use server". Or maybe you meant to call this function rather than return it.' +
            describeObjectForErrorMessage(parent, parentPropertyName)
        );
      }
      if ("symbol" === typeof value) {
        task = request.writtenSymbols;
        elementReference = task.get(value);
        if (void 0 !== elementReference)
          return serializeByValueID(elementReference);
        elementReference = value.description;
        if (Symbol.for(elementReference) !== value)
          throw Error(
            "Only global symbols received from Symbol.for(...) can be passed to Client Components. The symbol Symbol.for(" +
              (value.description + ") cannot be found among global symbols.") +
              describeObjectForErrorMessage(parent, parentPropertyName)
          );
        request.pendingChunks++;
        _writtenObjects = request.nextChunkId++;
        emitSymbolChunk(request, _writtenObjects, elementReference);
        task.set(value, _writtenObjects);
        return serializeByValueID(_writtenObjects);
      }
      if ("bigint" === typeof value)
        return (
          (request = TaintRegistryValues.get(value)),
          void 0 !== request && throwTaintViolation(request.message),
          "$n" + value.toString(10)
        );
      throw Error(
        "Type " +
          typeof value +
          " is not supported in Client Component props." +
          describeObjectForErrorMessage(parent, parentPropertyName)
      );
    }
    function logPostpone(request, reason, task) {
      var prevRequest = currentRequest;
      currentRequest = null;
      try {
        var onPostpone = request.onPostpone;
        null !== task
          ? callWithDebugContextInDEV(request, task, onPostpone, reason)
          : onPostpone(reason);
      } finally {
        currentRequest = prevRequest;
      }
    }
    function logRecoverableError(request, error, task) {
      var prevRequest = currentRequest;
      currentRequest = null;
      try {
        var onError = request.onError;
        var errorDigest =
          null !== task
            ? callWithDebugContextInDEV(request, task, onError, error)
            : onError(error);
      } finally {
        currentRequest = prevRequest;
      }
      if (null != errorDigest && "string" !== typeof errorDigest)
        throw Error(
          'onError returned something with a type other than "string". onError should return a string and may return null or undefined but must not return anything else. It received something of type "' +
            typeof errorDigest +
            '" instead'
        );
      return errorDigest || "";
    }
    function fatalError(request, error) {
      var onFatalError = request.onFatalError;
      onFatalError(error);
      cleanupTaintQueue(request);
      null !== request.destination
        ? ((request.status = CLOSED),
          closeWithError(request.destination, error))
        : ((request.status = CLOSING), (request.fatalError = error));
    }
    function emitPostponeChunk(request, id, postponeInstance) {
      var reason = "",
        env = request.environmentName();
      try {
        reason = String(postponeInstance.message);
        var stack = filterStackTrace(request, postponeInstance, 0);
      } catch (x) {
        stack = [];
      }
      id =
        serializeRowHeader("P", id) +
        stringify({ reason: reason, stack: stack, env: env }) +
        "\n";
      id = stringToChunk(id);
      request.completedErrorChunks.push(id);
    }
    function serializeErrorValue(request, error) {
      var env = (0, request.environmentName)();
      try {
        var message = String(error.message);
        var stack = filterStackTrace(request, error, 0);
        var errorEnv = error.environmentName;
        "string" === typeof errorEnv && (env = errorEnv);
      } catch (x) {
        (message =
          "An error occurred but serializing the error message failed."),
          (stack = []);
      }
      return (
        "$Z" +
        outlineModel(request, {
          message: message,
          stack: stack,
          env: env
        }).toString(16)
      );
    }
    function emitErrorChunk(request, id, digest, error) {
      var env = (0, request.environmentName)();
      try {
        if (error instanceof Error) {
          var message = String(error.message);
          var stack = filterStackTrace(request, error, 0);
          var errorEnv = error.environmentName;
          "string" === typeof errorEnv && (env = errorEnv);
        } else
          (message =
            "object" === typeof error && null !== error
              ? describeObjectForErrorMessage(error)
              : String(error)),
            (stack = []);
      } catch (x) {
        (message =
          "An error occurred but serializing the error message failed."),
          (stack = []);
      }
      digest = { digest: digest, message: message, stack: stack, env: env };
      id = serializeRowHeader("E", id) + stringify(digest) + "\n";
      id = stringToChunk(id);
      request.completedErrorChunks.push(id);
    }
    function emitSymbolChunk(request, id, name) {
      id = encodeReferenceChunk(request, id, "$S" + name);
      request.completedImportChunks.push(id);
    }
    function emitModelChunk(request, id, json) {
      id = id.toString(16) + ":" + json + "\n";
      id = stringToChunk(id);
      request.completedRegularChunks.push(id);
    }
    function emitDebugChunk(request, id, debugInfo) {
      var counter = { objectLimit: 500 };
      debugInfo = stringify(debugInfo, function (parentPropertyName, value) {
        return renderConsoleValue(
          request,
          counter,
          this,
          parentPropertyName,
          value
        );
      });
      id = serializeRowHeader("D", id) + debugInfo + "\n";
      id = stringToChunk(id);
      request.completedRegularChunks.push(id);
    }
    function outlineComponentInfo(request, componentInfo) {
      if (!request.writtenObjects.has(componentInfo)) {
        null != componentInfo.owner &&
          outlineComponentInfo(request, componentInfo.owner);
        var objectLimit = 10;
        null != componentInfo.stack &&
          (objectLimit += componentInfo.stack.length);
        objectLimit = { objectLimit: objectLimit };
        var componentDebugInfo = {
          name: componentInfo.name,
          env: componentInfo.env,
          key: componentInfo.key,
          owner: componentInfo.owner
        };
        componentDebugInfo.stack = componentInfo.stack;
        componentDebugInfo.props = componentInfo.props;
        objectLimit = outlineConsoleValue(
          request,
          objectLimit,
          componentDebugInfo
        );
        request.writtenObjects.set(
          componentInfo,
          serializeByValueID(objectLimit)
        );
      }
    }
    function emitTypedArrayChunk(request, id, tag, typedArray) {
      if (TaintRegistryByteLengths.has(typedArray.byteLength)) {
        var tainted = TaintRegistryValues.get(
          String.fromCharCode.apply(
            String,
            new Uint8Array(
              typedArray.buffer,
              typedArray.byteOffset,
              typedArray.byteLength
            )
          )
        );
        void 0 !== tainted && throwTaintViolation(tainted.message);
      }
      request.pendingChunks++;
      typedArray = typedArrayToBinaryChunk(typedArray);
      tainted = byteLengthOfBinaryChunk(typedArray);
      id = id.toString(16) + ":" + tag + tainted.toString(16) + ",";
      id = stringToChunk(id);
      request.completedRegularChunks.push(id, typedArray);
    }
    function emitTextChunk(request, id, text) {
      if (null === byteLengthOfChunk)
        throw Error(
          "Existence of byteLengthOfChunk should have already been checked. This is a bug in React."
        );
      request.pendingChunks++;
      text = stringToChunk(text);
      var binaryLength = byteLengthOfChunk(text);
      id = id.toString(16) + ":T" + binaryLength.toString(16) + ",";
      id = stringToChunk(id);
      request.completedRegularChunks.push(id, text);
    }
    function renderConsoleValue(
      request,
      counter,
      parent,
      parentPropertyName,
      value
    ) {
      if (null === value) return null;
      if (value === REACT_ELEMENT_TYPE) return "$";
      if ("object" === typeof value) {
        if (isClientReference(value))
          return serializeClientReference(
            request,
            parent,
            parentPropertyName,
            value
          );
        if (
          void 0 !== request.temporaryReferences &&
          ((parent = request.temporaryReferences.get(value)), void 0 !== parent)
        )
          return "$T" + parent;
        parent = request.writtenObjects.get(value);
        if (void 0 !== parent) return parent;
        if (0 >= counter.objectLimit && !doNotLimit.has(value)) return "$Y";
        counter.objectLimit--;
        switch (value.$$typeof) {
          case REACT_ELEMENT_TYPE:
            null != value._owner && outlineComponentInfo(request, value._owner);
            "object" === typeof value.type &&
              null !== value.type &&
              doNotLimit.add(value.type);
            "object" === typeof value.key &&
              null !== value.key &&
              doNotLimit.add(value.key);
            doNotLimit.add(value.props);
            null !== value._owner && doNotLimit.add(value._owner);
            counter = null;
            if (null != value._debugStack)
              for (
                counter = filterStackTrace(request, value._debugStack, 1),
                  doNotLimit.add(counter),
                  request = 0;
                request < counter.length;
                request++
              )
                doNotLimit.add(counter[request]);
            return [
              REACT_ELEMENT_TYPE,
              value.type,
              value.key,
              value.props,
              value._owner,
              counter,
              value._store.validated
            ];
        }
        if ("function" === typeof value.then) {
          switch (value.status) {
            case "fulfilled":
              return (
                "$@" +
                outlineConsoleValue(request, counter, value.value).toString(16)
              );
            case "rejected":
              return (
                (counter = value.reason),
                request.pendingChunks++,
                (value = request.nextChunkId++),
                "object" === typeof counter &&
                null !== counter &&
                counter.$$typeof === REACT_POSTPONE_TYPE
                  ? emitPostponeChunk(request, value, counter)
                  : emitErrorChunk(request, value, "", counter),
                "$@" + value.toString(16)
              );
          }
          return "$@";
        }
        if (isArrayImpl(value)) return value;
        if (value instanceof Map) {
          value = Array.from(value);
          counter.objectLimit++;
          for (parent = 0; parent < value.length; parent++) {
            var entry = value[parent];
            doNotLimit.add(entry);
            parentPropertyName = entry[0];
            entry = entry[1];
            "object" === typeof parentPropertyName &&
              null !== parentPropertyName &&
              doNotLimit.add(parentPropertyName);
            "object" === typeof entry &&
              null !== entry &&
              doNotLimit.add(entry);
          }
          return (
            "$Q" + outlineConsoleValue(request, counter, value).toString(16)
          );
        }
        if (value instanceof Set) {
          value = Array.from(value);
          counter.objectLimit++;
          for (parent = 0; parent < value.length; parent++)
            (parentPropertyName = value[parent]),
              "object" === typeof parentPropertyName &&
                null !== parentPropertyName &&
                doNotLimit.add(parentPropertyName);
          return (
            "$W" + outlineConsoleValue(request, counter, value).toString(16)
          );
        }
        return "function" === typeof FormData && value instanceof FormData
          ? serializeFormData(request, value)
          : value instanceof Error
            ? serializeErrorValue(request, value)
            : value instanceof ArrayBuffer
              ? serializeTypedArray(request, "A", new Uint8Array(value))
              : value instanceof Int8Array
                ? serializeTypedArray(request, "O", value)
                : value instanceof Uint8Array
                  ? serializeTypedArray(request, "o", value)
                  : value instanceof Uint8ClampedArray
                    ? serializeTypedArray(request, "U", value)
                    : value instanceof Int16Array
                      ? serializeTypedArray(request, "S", value)
                      : value instanceof Uint16Array
                        ? serializeTypedArray(request, "s", value)
                        : value instanceof Int32Array
                          ? serializeTypedArray(request, "L", value)
                          : value instanceof Uint32Array
                            ? serializeTypedArray(request, "l", value)
                            : value instanceof Float32Array
                              ? serializeTypedArray(request, "G", value)
                              : value instanceof Float64Array
                                ? serializeTypedArray(request, "g", value)
                                : value instanceof BigInt64Array
                                  ? serializeTypedArray(request, "M", value)
                                  : value instanceof BigUint64Array
                                    ? serializeTypedArray(request, "m", value)
                                    : value instanceof DataView
                                      ? serializeTypedArray(request, "V", value)
                                      : "function" === typeof Blob &&
                                          value instanceof Blob
                                        ? serializeBlob(request, value)
                                        : getIteratorFn(value)
                                          ? Array.from(value)
                                          : value;
      }
      if ("string" === typeof value)
        return "Z" === value[value.length - 1] &&
          parent[parentPropertyName] instanceof Date
          ? "$D" + value
          : 1024 <= value.length
            ? serializeLargeTextString(request, value)
            : "$" === value[0]
              ? "$" + value
              : value;
      if ("boolean" === typeof value) return value;
      if ("number" === typeof value) return serializeNumber(value);
      if ("undefined" === typeof value) return "$undefined";
      if ("function" === typeof value)
        return isClientReference(value)
          ? serializeClientReference(request, parent, parentPropertyName, value)
          : void 0 !== request.temporaryReferences &&
              ((request = request.temporaryReferences.get(value)),
              void 0 !== request)
            ? "$T" + request
            : "$E(" + (Function.prototype.toString.call(value) + ")");
      if ("symbol" === typeof value) {
        counter = request.writtenSymbols.get(value);
        if (void 0 !== counter) return serializeByValueID(counter);
        counter = value.description;
        request.pendingChunks++;
        value = request.nextChunkId++;
        emitSymbolChunk(request, value, counter);
        return serializeByValueID(value);
      }
      return "bigint" === typeof value
        ? "$n" + value.toString(10)
        : value instanceof Date
          ? "$D" + value.toJSON()
          : "unknown type " + typeof value;
    }
    function outlineConsoleValue(request, counter, model) {
      function replacer(parentPropertyName, value) {
        try {
          return renderConsoleValue(
            request,
            counter,
            this,
            parentPropertyName,
            value
          );
        } catch (x) {
          return (
            "Unknown Value: React could not send it from the server.\n" +
            x.message
          );
        }
      }
      "object" === typeof model && null !== model && doNotLimit.add(model);
      try {
        var json = stringify(model, replacer);
      } catch (x) {
        json = stringify(
          "Unknown Value: React could not send it from the server.\n" +
            x.message
        );
      }
      request.pendingChunks++;
      model = request.nextChunkId++;
      json = model.toString(16) + ":" + json + "\n";
      json = stringToChunk(json);
      request.completedRegularChunks.push(json);
      return model;
    }
    function emitConsoleChunk(
      request,
      id,
      methodName,
      owner,
      stackTrace,
      args
    ) {
      function replacer(parentPropertyName, value) {
        try {
          return renderConsoleValue(
            request,
            counter,
            this,
            parentPropertyName,
            value
          );
        } catch (x) {
          return (
            "Unknown Value: React could not send it from the server.\n" +
            x.message
          );
        }
      }
      var counter = { objectLimit: 500 };
      null != owner && outlineComponentInfo(request, owner);
      var env = (0, request.environmentName)(),
        payload = [methodName, stackTrace, owner, env];
      payload.push.apply(payload, args);
      try {
        var json = stringify(payload, replacer);
      } catch (x) {
        json = stringify(
          [
            methodName,
            stackTrace,
            owner,
            env,
            "Unknown Value: React could not send it from the server.",
            x
          ],
          replacer
        );
      }
      id = serializeRowHeader("W", id) + json + "\n";
      id = stringToChunk(id);
      request.completedRegularChunks.push(id);
    }
    function forwardDebugInfo(request, id, debugInfo) {
      for (var i = 0; i < debugInfo.length; i++)
        request.pendingChunks++,
          "string" === typeof debugInfo[i].name &&
            outlineComponentInfo(request, debugInfo[i]),
          emitDebugChunk(request, id, debugInfo[i]);
    }
    function emitChunk(request, task, value) {
      var id = task.id;
      "string" === typeof value && null !== byteLengthOfChunk
        ? ((task = TaintRegistryValues.get(value)),
          void 0 !== task && throwTaintViolation(task.message),
          emitTextChunk(request, id, value))
        : value instanceof ArrayBuffer
          ? emitTypedArrayChunk(request, id, "A", new Uint8Array(value))
          : value instanceof Int8Array
            ? emitTypedArrayChunk(request, id, "O", value)
            : value instanceof Uint8Array
              ? emitTypedArrayChunk(request, id, "o", value)
              : value instanceof Uint8ClampedArray
                ? emitTypedArrayChunk(request, id, "U", value)
                : value instanceof Int16Array
                  ? emitTypedArrayChunk(request, id, "S", value)
                  : value instanceof Uint16Array
                    ? emitTypedArrayChunk(request, id, "s", value)
                    : value instanceof Int32Array
                      ? emitTypedArrayChunk(request, id, "L", value)
                      : value instanceof Uint32Array
                        ? emitTypedArrayChunk(request, id, "l", value)
                        : value instanceof Float32Array
                          ? emitTypedArrayChunk(request, id, "G", value)
                          : value instanceof Float64Array
                            ? emitTypedArrayChunk(request, id, "g", value)
                            : value instanceof BigInt64Array
                              ? emitTypedArrayChunk(request, id, "M", value)
                              : value instanceof BigUint64Array
                                ? emitTypedArrayChunk(request, id, "m", value)
                                : value instanceof DataView
                                  ? emitTypedArrayChunk(request, id, "V", value)
                                  : ((value = stringify(value, task.toJSON)),
                                    emitModelChunk(request, task.id, value));
    }
    function retryTask(request, task) {
      if (task.status === PENDING) {
        var prevDebugID = debugID;
        task.status = RENDERING;
        try {
          modelRoot = task.model;
          debugID = task.id;
          var resolvedModel = renderModelDestructive(
            request,
            task,
            emptyRoot,
            "",
            task.model
          );
          debugID = null;
          modelRoot = resolvedModel;
          task.keyPath = null;
          task.implicitSlot = !1;
          if ("object" === typeof resolvedModel && null !== resolvedModel) {
            request.writtenObjects.set(
              resolvedModel,
              serializeByValueID(task.id)
            );
            var currentEnv = (0, request.environmentName)();
            currentEnv !== task.environmentName &&
              (request.pendingChunks++,
              emitDebugChunk(request, task.id, { env: currentEnv }));
            emitChunk(request, task, resolvedModel);
          } else {
            var json = stringify(resolvedModel),
              _currentEnv = (0, request.environmentName)();
            _currentEnv !== task.environmentName &&
              (request.pendingChunks++,
              emitDebugChunk(request, task.id, { env: _currentEnv }));
            emitModelChunk(request, task.id, json);
          }
          request.abortableTasks.delete(task);
          task.status = COMPLETED;
        } catch (thrownValue) {
          if (request.status === ABORTING)
            if (
              (request.abortableTasks.delete(task),
              (task.status = ABORTED),
              request.type === PRERENDER)
            )
              request.pendingChunks--;
            else {
              var model = stringify(serializeByValueID(request.fatalError));
              emitModelChunk(request, task.id, model);
            }
          else {
            var x =
              thrownValue === SuspenseException
                ? getSuspendedThenable()
                : thrownValue;
            if ("object" === typeof x && null !== x) {
              if ("function" === typeof x.then) {
                task.status = PENDING;
                task.thenableState = getThenableStateAfterSuspending();
                var ping = task.ping;
                x.then(ping, ping);
                return;
              }
              if (x.$$typeof === REACT_POSTPONE_TYPE) {
                request.abortableTasks.delete(task);
                task.status = ERRORED;
                logPostpone(request, x.message, task);
                emitPostponeChunk(request, task.id, x);
                return;
              }
            }
            request.abortableTasks.delete(task);
            task.status = ERRORED;
            var digest = logRecoverableError(request, x, task);
            emitErrorChunk(request, task.id, digest, x);
          }
        } finally {
          debugID = prevDebugID;
        }
      }
    }
    function tryStreamTask(request, task) {
      var prevDebugID = debugID;
      debugID = null;
      try {
        emitChunk(request, task, task.model);
      } finally {
        debugID = prevDebugID;
      }
    }
    function performWork(request) {
      var prevDispatcher = ReactSharedInternalsServer.H;
      ReactSharedInternalsServer.H = HooksDispatcher;
      var prevRequest = currentRequest;
      currentRequest$1 = currentRequest = request;
      var hadAbortableTasks = 0 < request.abortableTasks.size;
      try {
        var pingedTasks = request.pingedTasks;
        request.pingedTasks = [];
        for (var i = 0; i < pingedTasks.length; i++)
          retryTask(request, pingedTasks[i]);
        null !== request.destination &&
          flushCompletedChunks(request, request.destination);
        if (hadAbortableTasks && 0 === request.abortableTasks.size) {
          var onAllReady = request.onAllReady;
          onAllReady();
        }
      } catch (error) {
        logRecoverableError(request, error, null), fatalError(request, error);
      } finally {
        (ReactSharedInternalsServer.H = prevDispatcher),
          (currentRequest$1 = null),
          (currentRequest = prevRequest);
      }
    }
    function abortTask(task, request, errorId) {
      task.status !== RENDERING &&
        ((task.status = ABORTED),
        (errorId = serializeByValueID(errorId)),
        (task = encodeReferenceChunk(request, task.id, errorId)),
        request.completedErrorChunks.push(task));
    }
    function flushCompletedChunks(request, destination) {
      beginWriting(destination);
      try {
        for (
          var importsChunks = request.completedImportChunks, i = 0;
          i < importsChunks.length;
          i++
        )
          if (
            (request.pendingChunks--,
            !writeChunkAndReturn(destination, importsChunks[i]))
          ) {
            request.destination = null;
            i++;
            break;
          }
        importsChunks.splice(0, i);
        var hintChunks = request.completedHintChunks;
        for (i = 0; i < hintChunks.length; i++)
          if (!writeChunkAndReturn(destination, hintChunks[i])) {
            request.destination = null;
            i++;
            break;
          }
        hintChunks.splice(0, i);
        var regularChunks = request.completedRegularChunks;
        for (i = 0; i < regularChunks.length; i++)
          if (
            (request.pendingChunks--,
            !writeChunkAndReturn(destination, regularChunks[i]))
          ) {
            request.destination = null;
            i++;
            break;
          }
        regularChunks.splice(0, i);
        var errorChunks = request.completedErrorChunks;
        for (i = 0; i < errorChunks.length; i++)
          if (
            (request.pendingChunks--,
            !writeChunkAndReturn(destination, errorChunks[i]))
          ) {
            request.destination = null;
            i++;
            break;
          }
        errorChunks.splice(0, i);
      } finally {
        (request.flushScheduled = !1), completeWriting(destination);
      }
      flushBuffered(destination);
      0 === request.pendingChunks &&
        (cleanupTaintQueue(request),
        (request.status = CLOSED),
        close(destination),
        (request.destination = null));
    }
    function enqueueFlush(request) {
      !1 === request.flushScheduled &&
        0 === request.pingedTasks.length &&
        null !== request.destination &&
        ((request.flushScheduled = !0),
        scheduleWork(function () {
          request.flushScheduled = !1;
          var destination = request.destination;
          destination && flushCompletedChunks(request, destination);
        }));
    }
    var exports = {};
    ("use strict");
    var React = require("react"),
      scheduleWork = $$$config.scheduleWork,
      scheduleMicrotask = $$$config.scheduleMicrotask,
      beginWriting = $$$config.beginWriting;
    $$$config.writeChunk;
    var writeChunkAndReturn = $$$config.writeChunkAndReturn,
      completeWriting = $$$config.completeWriting,
      flushBuffered = $$$config.flushBuffered,
      close = $$$config.close,
      closeWithError = $$$config.closeWithError,
      stringToChunk = $$$config.stringToChunk;
    $$$config.stringToPrecomputedChunk;
    var typedArrayToBinaryChunk = $$$config.typedArrayToBinaryChunk,
      byteLengthOfChunk = $$$config.byteLengthOfChunk,
      byteLengthOfBinaryChunk = $$$config.byteLengthOfBinaryChunk;
    $$$config.createFastHash;
    var isClientReference = $$$config.isClientReference,
      isServerReference = $$$config.isServerReference,
      getClientReferenceKey = $$$config.getClientReferenceKey,
      resolveClientReferenceMetadata = $$$config.resolveClientReferenceMetadata,
      getServerReferenceId = $$$config.getServerReferenceId,
      getServerReferenceBoundArguments =
        $$$config.getServerReferenceBoundArguments,
      getServerReferenceLocation = $$$config.getServerReferenceLocation,
      frameRegExp =
        /^ {3} at (?:(.+) \((?:(.+):(\d+):(\d+)|<anonymous>)\)|(?:async )?(.+):(\d+):(\d+)|<anonymous>)$/,
      TEMPORARY_REFERENCE_TAG = Symbol.for("react.temporary.reference"),
      REACT_LEGACY_ELEMENT_TYPE = Symbol.for("react.element"),
      REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
      REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"),
      REACT_CONTEXT_TYPE = Symbol.for("react.context"),
      REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"),
      REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"),
      REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"),
      REACT_MEMO_TYPE = Symbol.for("react.memo"),
      REACT_LAZY_TYPE = Symbol.for("react.lazy"),
      REACT_MEMO_CACHE_SENTINEL = Symbol.for("react.memo_cache_sentinel"),
      REACT_POSTPONE_TYPE = Symbol.for("react.postpone"),
      MAYBE_ITERATOR_SYMBOL = Symbol.iterator,
      ASYNC_ITERATOR = Symbol.asyncIterator,
      SuspenseException = Error(
        "Suspense Exception: This is not a real error! It's an implementation detail of `use` to interrupt the current render. You must either rethrow it immediately, or move the `use` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary, or call the promise's `.catch` method and pass the result to `use`"
      ),
      suspendedThenable = null,
      currentRequest$1 = null,
      thenableIndexCounter = 0,
      thenableState = null,
      currentComponentDebugInfo = null,
      HooksDispatcher = {
        useMemo: function (nextCreate) {
          return nextCreate();
        },
        useCallback: function (callback) {
          return callback;
        },
        useDebugValue: function () {},
        useDeferredValue: unsupportedHook,
        useTransition: unsupportedHook,
        readContext: unsupportedContext,
        useContext: unsupportedContext,
        useReducer: unsupportedHook,
        useRef: unsupportedHook,
        useState: unsupportedHook,
        useInsertionEffect: unsupportedHook,
        useLayoutEffect: unsupportedHook,
        useImperativeHandle: unsupportedHook,
        useEffect: unsupportedHook,
        useId: function () {
          if (null === currentRequest$1)
            throw Error("useId can only be used while React is rendering");
          var id = currentRequest$1.identifierCount++;
          return (
            ":" +
            currentRequest$1.identifierPrefix +
            "S" +
            id.toString(32) +
            ":"
          );
        },
        useSyncExternalStore: unsupportedHook,
        useCacheRefresh: function () {
          return unsupportedRefresh;
        },
        useMemoCache: function (size) {
          for (var data = Array(size), i = 0; i < size; i++)
            data[i] = REACT_MEMO_CACHE_SENTINEL;
          return data;
        },
        use: function (usable) {
          if (
            (null !== usable && "object" === typeof usable) ||
            "function" === typeof usable
          ) {
            if ("function" === typeof usable.then) {
              var index = thenableIndexCounter;
              thenableIndexCounter += 1;
              null === thenableState && (thenableState = []);
              return trackUsedThenable(thenableState, usable, index);
            }
            usable.$$typeof === REACT_CONTEXT_TYPE && unsupportedContext();
          }
          if (isClientReference(usable)) {
            if (
              null != usable.value &&
              usable.value.$$typeof === REACT_CONTEXT_TYPE
            )
              throw Error(
                "Cannot read a Client Context from a Server Component."
              );
            throw Error("Cannot use() an already resolved Client Reference.");
          }
          throw Error(
            "An unsupported type was passed to use(): " + String(usable)
          );
        }
      },
      currentOwner = null,
      DefaultAsyncDispatcher = {
        getCacheForType: function (resourceType) {
          var cache = (cache = resolveRequest()) ? cache.cache : new Map();
          var entry = cache.get(resourceType);
          void 0 === entry &&
            ((entry = resourceType()), cache.set(resourceType, entry));
          return entry;
        }
      };
    DefaultAsyncDispatcher.getOwner = resolveOwner;
    var ReactSharedInternalsServer =
      React.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    if (!ReactSharedInternalsServer)
      throw Error(
        'The "react" package in this environment is not configured correctly. The "react-server" condition must be enabled in any environment that runs React Server Components.'
      );
    var prefix, suffix;
    new ("function" === typeof WeakMap ? WeakMap : Map)();
    var callComponent = {
        "react-stack-bottom-frame": function (
          Component,
          props,
          componentDebugInfo
        ) {
          currentOwner = componentDebugInfo;
          try {
            return Component(props, void 0);
          } finally {
            currentOwner = null;
          }
        }
      },
      callComponentInDEV =
        callComponent["react-stack-bottom-frame"].bind(callComponent),
      callLazyInit = {
        "react-stack-bottom-frame": function (lazy) {
          var init = lazy._init;
          return init(lazy._payload);
        }
      },
      callLazyInitInDEV =
        callLazyInit["react-stack-bottom-frame"].bind(callLazyInit),
      callIterator = {
        "react-stack-bottom-frame": function (iterator, progress, error) {
          iterator.next().then(progress, error);
        }
      },
      callIteratorInDEV =
        callIterator["react-stack-bottom-frame"].bind(callIterator),
      isArrayImpl = Array.isArray,
      getPrototypeOf = Object.getPrototypeOf,
      jsxPropsParents = new WeakMap(),
      jsxChildrenParents = new WeakMap(),
      CLIENT_REFERENCE_TAG = Symbol.for("react.client.reference"),
      doNotLimit = new WeakSet();
    "object" === typeof console &&
      null !== console &&
      (patchConsole(console, "assert"),
      patchConsole(console, "debug"),
      patchConsole(console, "dir"),
      patchConsole(console, "dirxml"),
      patchConsole(console, "error"),
      patchConsole(console, "group"),
      patchConsole(console, "groupCollapsed"),
      patchConsole(console, "groupEnd"),
      patchConsole(console, "info"),
      patchConsole(console, "log"),
      patchConsole(console, "table"),
      patchConsole(console, "trace"),
      patchConsole(console, "warn"));
    var ObjectPrototype = Object.prototype,
      stringify = JSON.stringify,
      PENDING = 0,
      COMPLETED = 1,
      ABORTED = 3,
      ERRORED = 4,
      RENDERING = 5,
      OPENING = 10,
      ABORTING = 12,
      CLOSING = 13,
      CLOSED = 14,
      PRERENDER = 21,
      TaintRegistryObjects = ReactSharedInternalsServer.TaintRegistryObjects,
      TaintRegistryValues = ReactSharedInternalsServer.TaintRegistryValues,
      TaintRegistryByteLengths =
        ReactSharedInternalsServer.TaintRegistryByteLengths,
      TaintRegistryPendingRequests =
        ReactSharedInternalsServer.TaintRegistryPendingRequests,
      currentRequest = null,
      debugID = null,
      modelRoot = !1,
      emptyRoot = {};
    exports.abort = function (request, reason) {
      try {
        11 >= request.status && (request.status = ABORTING);
        var abortableTasks = request.abortableTasks;
        if (0 < abortableTasks.size) {
          if (
            "object" === typeof reason &&
            null !== reason &&
            reason.$$typeof === REACT_POSTPONE_TYPE
          )
            if (
              (logPostpone(request, reason.message, null),
              request.type === PRERENDER)
            )
              abortableTasks.forEach(function (task) {
                task.status !== RENDERING &&
                  ((task.status = ABORTED), request.pendingChunks--);
              });
            else {
              var errorId = request.nextChunkId++;
              request.fatalError = errorId;
              request.pendingChunks++;
              emitPostponeChunk(request, errorId, reason);
              abortableTasks.forEach(function (task) {
                return abortTask(task, request, errorId);
              });
            }
          else {
            var error =
                void 0 === reason
                  ? Error(
                      "The render was aborted by the server without a reason."
                    )
                  : "object" === typeof reason &&
                      null !== reason &&
                      "function" === typeof reason.then
                    ? Error(
                        "The render was aborted by the server with a promise."
                      )
                    : reason,
              digest = logRecoverableError(request, error, null);
            if (request.type === PRERENDER)
              abortableTasks.forEach(function (task) {
                task.status !== RENDERING &&
                  ((task.status = ABORTED), request.pendingChunks--);
              });
            else {
              var _errorId2 = request.nextChunkId++;
              request.fatalError = _errorId2;
              request.pendingChunks++;
              emitErrorChunk(request, _errorId2, digest, error);
              abortableTasks.forEach(function (task) {
                return abortTask(task, request, _errorId2);
              });
            }
          }
          abortableTasks.clear();
          var onAllReady = request.onAllReady;
          onAllReady();
        }
        var abortListeners = request.abortListeners;
        if (0 < abortListeners.size) {
          var _error =
            "object" === typeof reason &&
            null !== reason &&
            reason.$$typeof === REACT_POSTPONE_TYPE
              ? Error("The render was aborted due to being postponed.")
              : void 0 === reason
                ? Error(
                    "The render was aborted by the server without a reason."
                  )
                : "object" === typeof reason &&
                    null !== reason &&
                    "function" === typeof reason.then
                  ? Error(
                      "The render was aborted by the server with a promise."
                    )
                  : reason;
          abortListeners.forEach(function (callback) {
            return callback(_error);
          });
          abortListeners.clear();
        }
        null !== request.destination &&
          flushCompletedChunks(request, request.destination);
      } catch (error$2) {
        logRecoverableError(request, error$2, null),
          fatalError(request, error$2);
      }
    };
    exports.createPrerenderRequest = function (
      model,
      bundlerConfig,
      onAllReady,
      onFatalError,
      onError,
      identifierPrefix,
      onPostpone,
      temporaryReferences,
      environmentName,
      filterStackFrame
    ) {
      return new RequestInstance(
        PRERENDER,
        model,
        bundlerConfig,
        onError,
        identifierPrefix,
        onPostpone,
        temporaryReferences,
        environmentName,
        filterStackFrame,
        onAllReady,
        onFatalError
      );
    };
    exports.createRequest = function (
      model,
      bundlerConfig,
      onError,
      identifierPrefix,
      onPostpone,
      temporaryReferences,
      environmentName,
      filterStackFrame
    ) {
      return new RequestInstance(
        20,
        model,
        bundlerConfig,
        onError,
        identifierPrefix,
        onPostpone,
        temporaryReferences,
        environmentName,
        filterStackFrame,
        noop,
        noop
      );
    };
    exports.emitHint = function (request, code, model) {
      model = stringify(model);
      var id = request.nextChunkId++;
      code = serializeRowHeader("H" + code, id) + model + "\n";
      code = stringToChunk(code);
      request.completedHintChunks.push(code);
      enqueueFlush(request);
    };
    exports.getCache = function (request) {
      return request.cache;
    };
    exports.getHints = function (request) {
      return request.hints;
    };
    exports.resolveRequest = resolveRequest;
    exports.startFlowing = function (request, destination) {
      if (request.status === CLOSING)
        (request.status = CLOSED),
          closeWithError(destination, request.fatalError);
      else if (request.status !== CLOSED && null === request.destination) {
        request.destination = destination;
        try {
          flushCompletedChunks(request, destination);
        } catch (error) {
          logRecoverableError(request, error, null), fatalError(request, error);
        }
      }
    };
    exports.startWork = function (request) {
      request.flushScheduled = null !== request.destination;
      scheduleMicrotask(function () {
        return performWork(request);
      });
      scheduleWork(function () {
        request.status === OPENING && (request.status = 11);
      });
    };
    exports.stopFlowing = function (request) {
      request.destination = null;
    };
    return exports;
  }),
  (module.exports.default = module.exports),
  Object.defineProperty(module.exports, "__esModule", { value: !0 }));
