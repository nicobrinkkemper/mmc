/**
 * @license React
 * react-server-flight.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

"use strict";
module.exports = function ($$$config) {
  function voidHandler() {}
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
  function getThenableStateAfterSuspending() {
    var state = thenableState || [];
    thenableState = null;
    return state;
  }
  function unsupportedHook() {
    throw Error("This Hook is not supported in Server Components.");
  }
  function unsupportedRefresh() {
    throw Error("Refreshing the cache is not supported in Server Components.");
  }
  function unsupportedContext() {
    throw Error("Cannot read a Client Context from a Server Component.");
  }
  function objectName(object) {
    return Object.prototype.toString
      .call(object)
      .replace(/^\[object (.*)\]$/, function (m, p0) {
        return p0;
      });
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
    objKind = -1;
    var length = 0;
    if (isArrayImpl(objectOrArray)) {
      var str = "[";
      for (var i = 0; i < objectOrArray.length; i++) {
        0 < i && (str += ", ");
        var value = objectOrArray[i];
        value =
          "object" === typeof value && null !== value
            ? describeObjectForErrorMessage(value)
            : describeValueForErrorMessage(value);
        "" + i === expandedName
          ? ((objKind = str.length), (length = value.length), (str += value))
          : (str =
              10 > value.length && 40 > str.length + value.length
                ? str + value
                : str + "...");
      }
      str += "]";
    } else if (objectOrArray.$$typeof === REACT_ELEMENT_TYPE)
      str = "<" + describeElementType(objectOrArray.type) + "/>";
    else {
      if (objectOrArray.$$typeof === CLIENT_REFERENCE_TAG) return "client";
      str = "{";
      i = Object.keys(objectOrArray);
      for (value = 0; value < i.length; value++) {
        0 < value && (str += ", ");
        var name = i[value],
          encodedKey = JSON.stringify(name);
        str += ('"' + name + '"' === encodedKey ? name : encodedKey) + ": ";
        encodedKey = objectOrArray[name];
        encodedKey =
          "object" === typeof encodedKey && null !== encodedKey
            ? describeObjectForErrorMessage(encodedKey)
            : describeValueForErrorMessage(encodedKey);
        name === expandedName
          ? ((objKind = str.length),
            (length = encodedKey.length),
            (str += encodedKey))
          : (str =
              10 > encodedKey.length && 40 > str.length + encodedKey.length
                ? str + encodedKey
                : str + "...");
      }
      str += "}";
    }
    return void 0 === expandedName
      ? str
      : -1 < objKind && 0 < length
        ? ((objectOrArray = " ".repeat(objKind) + "^".repeat(length)),
          "\n  " + str + "\n  " + objectOrArray)
        : "\n  " + str;
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
      throw Error("Currently React only supports one RSC renderer at a time.");
    ReactSharedInternalsServer.A = DefaultAsyncDispatcher;
    filterStackFrame = new Set();
    environmentName = [];
    var cleanupQueue = [];
    TaintRegistryPendingRequests.add(cleanupQueue);
    this.type = type;
    this.status = 10;
    this.flushScheduled = !1;
    this.destination = this.fatalError = null;
    this.bundlerConfig = bundlerConfig;
    this.cache = new Map();
    this.pendingChunks = this.nextChunkId = 0;
    this.hints = null;
    this.abortListeners = new Set();
    this.abortableTasks = filterStackFrame;
    this.pingedTasks = environmentName;
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
    type = createTask(this, model, null, !1, filterStackFrame);
    environmentName.push(type);
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
      request.abortableTasks
    );
    switch (thenable.status) {
      case "fulfilled":
        return (
          (newTask.model = thenable.value),
          pingTask(request, newTask),
          newTask.id
        );
      case "rejected":
        return (
          (task = thenable.reason),
          "object" === typeof task &&
          null !== task &&
          task.$$typeof === REACT_POSTPONE_TYPE
            ? (logPostpone(request, task.message, newTask),
              emitPostponeChunk(request, newTask.id))
            : ((task = logRecoverableError(request, task, null)),
              emitErrorChunk(request, newTask.id, task)),
          (newTask.status = 4),
          request.abortableTasks.delete(newTask),
          newTask.id
        );
      default:
        if (12 === request.status)
          return (
            request.abortableTasks.delete(newTask),
            (newTask.status = 3),
            21 === request.type
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
        0 === newTask.status &&
          ("object" === typeof reason &&
          null !== reason &&
          reason.$$typeof === REACT_POSTPONE_TYPE
            ? (logPostpone(request, reason.message, newTask),
              emitPostponeChunk(request, newTask.id))
            : ((reason = logRecoverableError(request, reason, newTask)),
              emitErrorChunk(request, newTask.id, reason)),
          (newTask.status = 4),
          request.abortableTasks.delete(newTask),
          enqueueFlush(request));
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
              emitChunk(request, streamTask, streamTask.model),
              enqueueFlush(request),
              reader.read().then(progress, error);
          } catch (x$8) {
            error(x$8);
          }
    }
    function error(reason) {
      if (!aborted) {
        aborted = !0;
        request.abortListeners.delete(abortStream);
        var digest = logRecoverableError(request, reason, streamTask);
        emitErrorChunk(request, streamTask.id, digest);
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
            21 === request.type
              ? request.pendingChunks--
              : (emitPostponeChunk(request, streamTask.id),
                enqueueFlush(request));
        else {
          var digest = logRecoverableError(request, reason, streamTask);
          21 === request.type
            ? request.pendingChunks--
            : (emitErrorChunk(request, streamTask.id, digest),
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
        request.abortableTasks
      );
    request.abortableTasks.delete(streamTask);
    request.pendingChunks++;
    task = streamTask.id.toString(16) + ":" + (supportsBYOB ? "r" : "R") + "\n";
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
              emitChunk(request, streamTask, streamTask.model),
              enqueueFlush(request),
              iterator.next().then(progress, error);
          } catch (x$9) {
            error(x$9);
          }
    }
    function error(reason) {
      if (!aborted) {
        aborted = !0;
        request.abortListeners.delete(abortIterable);
        var digest = logRecoverableError(request, reason, streamTask);
        emitErrorChunk(request, streamTask.id, digest);
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
            21 === request.type
              ? request.pendingChunks--
              : (emitPostponeChunk(request, streamTask.id),
                enqueueFlush(request));
        else {
          var digest = logRecoverableError(request, reason, streamTask);
          21 === request.type
            ? request.pendingChunks--
            : (emitErrorChunk(request, streamTask.id, digest),
              enqueueFlush(request));
        }
        "function" === typeof iterator.throw &&
          iterator.throw(reason).then(error, error);
      }
    }
    iterable = iterable === iterator;
    var streamTask = createTask(
      request,
      task.model,
      task.keyPath,
      task.implicitSlot,
      request.abortableTasks
    );
    request.abortableTasks.delete(streamTask);
    request.pendingChunks++;
    task = streamTask.id.toString(16) + ":" + (iterable ? "x" : "X") + "\n";
    request.completedRegularChunks.push(stringToChunk(task));
    var aborted = !1;
    request.abortListeners.add(abortIterable);
    iterator.next().then(progress, error);
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
    return {
      $$typeof: REACT_LAZY_TYPE,
      _payload: wakeable,
      _init: readThenable
    };
  }
  function renderFunctionComponent(request, task, key, Component, props) {
    var prevThenableState = task.thenableState;
    task.thenableState = null;
    thenableIndexCounter = 0;
    thenableState = prevThenableState;
    Component = Component(props, void 0);
    if (12 === request.status)
      throw (
        ("object" !== typeof Component ||
          null === Component ||
          "function" !== typeof Component.then ||
          isClientReference(Component) ||
          Component.then(voidHandler, voidHandler),
        null)
      );
    if (
      "object" === typeof Component &&
      null !== Component &&
      !isClientReference(Component)
    ) {
      if ("function" === typeof Component.then) {
        props = Component;
        if ("fulfilled" === props.status) return props.value;
        Component = createLazyWrapperAroundWakeable(Component);
      }
      var iteratorFn = getIteratorFn(Component);
      if (iteratorFn) {
        var iterableChild = Component;
        Component = {};
        Component =
          ((Component[Symbol.iterator] = function () {
            return iteratorFn.call(iterableChild);
          }),
          Component);
      } else if (
        !(
          "function" !== typeof Component[ASYNC_ITERATOR] ||
          ("function" === typeof ReadableStream &&
            Component instanceof ReadableStream)
        )
      ) {
        var iterableChild$10 = Component;
        Component = {};
        Component =
          ((Component[ASYNC_ITERATOR] = function () {
            return iterableChild$10[ASYNC_ITERATOR]();
          }),
          Component);
      }
    }
    props = task.keyPath;
    prevThenableState = task.implicitSlot;
    null !== key
      ? (task.keyPath = null === props ? key : props + "," + key)
      : null === props && (task.implicitSlot = !0);
    request = renderModelDestructive(request, task, emptyRoot, "", Component);
    task.keyPath = props;
    task.implicitSlot = prevThenableState;
    return request;
  }
  function renderFragment(request, task, children) {
    return null !== task.keyPath
      ? ((request = [
          REACT_ELEMENT_TYPE,
          REACT_FRAGMENT_TYPE,
          task.keyPath,
          { children: children }
        ]),
        task.implicitSlot ? [request] : request)
      : children;
  }
  function renderElement(request, task, type, key, ref, props) {
    if (null !== ref && void 0 !== ref)
      throw Error(
        "Refs cannot be used in Server Components, nor passed to Client Components."
      );
    if (
      "function" !== typeof type ||
      isClientReference(type) ||
      type.$$typeof === TEMPORARY_REFERENCE_TAG
    ) {
      if (type === REACT_FRAGMENT_TYPE && null === key)
        return (
          (type = task.implicitSlot),
          null === task.keyPath && (task.implicitSlot = !0),
          (props = renderModelDestructive(
            request,
            task,
            emptyRoot,
            "",
            props.children
          )),
          (task.implicitSlot = type),
          props
        );
      if (null != type && "object" === typeof type && !isClientReference(type))
        switch (type.$$typeof) {
          case REACT_LAZY_TYPE:
            var init = type._init;
            type = init(type._payload);
            if (12 === request.status) throw null;
            return renderElement(request, task, type, key, ref, props);
          case REACT_FORWARD_REF_TYPE:
            return renderFunctionComponent(
              request,
              task,
              key,
              type.render,
              props
            );
          case REACT_MEMO_TYPE:
            return renderElement(request, task, type.type, key, ref, props);
        }
    } else return renderFunctionComponent(request, task, key, type, props);
    request = key;
    key = task.keyPath;
    null === request
      ? (request = key)
      : null !== key && (request = key + "," + request);
    props = [REACT_ELEMENT_TYPE, type, request, props];
    task = task.implicitSlot && null !== request ? [props] : props;
    return task;
  }
  function pingTask(request, task) {
    var pingedTasks = request.pingedTasks;
    pingedTasks.push(task);
    1 === pingedTasks.length &&
      ((request.flushScheduled = null !== request.destination),
      21 === request.type || 10 === request.status
        ? scheduleMicrotask(function () {
            return performWork(request);
          })
        : scheduleWork(function () {
            return performWork(request);
          }));
  }
  function createTask(request, model, keyPath, implicitSlot, abortSet) {
    request.pendingChunks++;
    var id = request.nextChunkId++;
    "object" !== typeof model ||
      null === model ||
      null !== keyPath ||
      implicitSlot ||
      request.writtenObjects.set(model, serializeByValueID(id));
    var task = {
      id: id,
      status: 0,
      model: model,
      keyPath: keyPath,
      implicitSlot: implicitSlot,
      ping: function () {
        return pingTask(request, task);
      },
      toJSON: function (parentPropertyName, value) {
        return renderModel(request, task, this, parentPropertyName, value);
      },
      thenableState: null
    };
    abortSet.add(task);
    return task;
  }
  function serializeByValueID(id) {
    return "$" + id.toString(16);
  }
  function serializeLazyID(id) {
    return "$L" + id.toString(16);
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
        row = importId.toString(16) + ":I" + json + "\n",
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
        emitErrorChunk(request, parent, parentPropertyName),
        serializeByValueID(parent)
      );
    }
  }
  function outlineModel(request, value) {
    value = createTask(request, value, null, !1, request.abortableTasks);
    retryTask(request, value);
    return value.id;
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
        emitErrorChunk(request, newTask.id, digest);
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
            21 === request.type
              ? request.pendingChunks--
              : (emitPostponeChunk(request, newTask.id), enqueueFlush(request));
        else {
          var digest = logRecoverableError(request, reason, newTask);
          21 === request.type
            ? request.pendingChunks--
            : (emitErrorChunk(request, newTask.id, digest),
              enqueueFlush(request));
        }
        reader.cancel(reason).then(error, error);
      }
    }
    var model = [blob.type],
      newTask = createTask(request, model, null, !1, request.abortableTasks),
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
      if (12 === request.status) {
        task.status = 3;
        if (21 === request.type)
          return (
            (task = request.nextChunkId++),
            (task = parent ? serializeLazyID(task) : serializeByValueID(task)),
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
              request.abortableTasks
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
            emitPostponeChunk(request, value),
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
      emitErrorChunk(request, prevKeyPath, task);
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
            writtenObjects = request.writtenObjects;
          if (null === task.keyPath && !task.implicitSlot) {
            var existingReference = writtenObjects.get(value);
            if (void 0 !== existingReference)
              if (modelRoot === value) modelRoot = null;
              else return existingReference;
            else
              -1 === parentPropertyName.indexOf(":") &&
                ((parent = writtenObjects.get(parent)),
                void 0 !== parent &&
                  ((elementReference = parent + ":" + parentPropertyName),
                  writtenObjects.set(value, elementReference)));
          }
          parentPropertyName = value.props;
          parent = parentPropertyName.ref;
          value = renderElement(
            request,
            task,
            value.type,
            value.key,
            void 0 !== parent ? parent : null,
            parentPropertyName
          );
          "object" === typeof value &&
            null !== value &&
            null !== elementReference &&
            (writtenObjects.has(value) ||
              writtenObjects.set(value, elementReference));
          return value;
        case REACT_LAZY_TYPE:
          task.thenableState = null;
          parentPropertyName = value._init;
          value = parentPropertyName(value._payload);
          if (12 === request.status) throw null;
          return renderModelDestructive(request, task, emptyRoot, "", value);
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
      writtenObjects = elementReference.get(value);
      if ("function" === typeof value.then) {
        if (void 0 !== writtenObjects) {
          if (null !== task.keyPath || task.implicitSlot)
            return "$@" + serializeThenable(request, task, value).toString(16);
          if (modelRoot === value) modelRoot = null;
          else return writtenObjects;
        }
        request = "$@" + serializeThenable(request, task, value).toString(16);
        elementReference.set(value, request);
        return request;
      }
      if (void 0 !== writtenObjects)
        if (modelRoot === value) modelRoot = null;
        else return writtenObjects;
      else if (
        -1 === parentPropertyName.indexOf(":") &&
        ((writtenObjects = elementReference.get(parent)),
        void 0 !== writtenObjects)
      ) {
        existingReference = parentPropertyName;
        if (isArrayImpl(parent) && parent[0] === REACT_ELEMENT_TYPE)
          switch (parentPropertyName) {
            case "1":
              existingReference = "type";
              break;
            case "2":
              existingReference = "key";
              break;
            case "3":
              existingReference = "props";
              break;
            case "4":
              existingReference = "_owner";
          }
        elementReference.set(value, writtenObjects + ":" + existingReference);
      }
      if (isArrayImpl(value)) return renderFragment(request, task, value);
      if (value instanceof Map)
        return (
          (value = Array.from(value)),
          "$Q" + outlineModel(request, value).toString(16)
        );
      if (value instanceof Set)
        return (
          (value = Array.from(value)),
          "$W" + outlineModel(request, value).toString(16)
        );
      if ("function" === typeof FormData && value instanceof FormData)
        return (
          (value = Array.from(value.entries())),
          "$K" + outlineModel(request, value).toString(16)
        );
      if (value instanceof Error) return "$Z";
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
          (parentPropertyName = elementReference.call(value)),
          parentPropertyName === value
            ? "$i" +
              outlineModel(request, Array.from(parentPropertyName)).toString(16)
            : renderFragment(request, task, Array.from(parentPropertyName))
        );
      if (
        "function" === typeof ReadableStream &&
        value instanceof ReadableStream
      )
        return serializeReadableStream(request, task, value);
      elementReference = value[ASYNC_ITERATOR];
      if ("function" === typeof elementReference)
        return (
          null !== task.keyPath
            ? ((value = [
                REACT_ELEMENT_TYPE,
                REACT_FRAGMENT_TYPE,
                task.keyPath,
                { children: value }
              ]),
              (value = task.implicitSlot ? [value] : value))
            : ((parentPropertyName = elementReference.call(value)),
              (value = serializeAsyncIterable(
                request,
                task,
                value,
                parentPropertyName
              ))),
          value
        );
      if (value instanceof Date) return "$D" + value.toJSON();
      request = getPrototypeOf(value);
      if (
        request !== ObjectPrototype &&
        (null === request || null !== getPrototypeOf(request))
      )
        throw Error(
          "Only plain objects, and a few built-ins, can be passed to Client Components from Server Components. Classes or null prototypes are not supported." +
            describeObjectForErrorMessage(parent, parentPropertyName)
        );
      return value;
    }
    if ("string" === typeof value) {
      task = TaintRegistryValues.get(value);
      void 0 !== task && throwTaintViolation(task.message);
      if (
        "Z" === value[value.length - 1] &&
        parent[parentPropertyName] instanceof Date
      )
        return "$D" + value;
      if (1024 <= value.length && null !== byteLengthOfChunk)
        return (
          request.pendingChunks++,
          (task = request.nextChunkId++),
          emitTextChunk(request, task, value),
          serializeByValueID(task)
        );
      value = "$" === value[0] ? "$" + value : value;
      return value;
    }
    if ("boolean" === typeof value) return value;
    if ("number" === typeof value)
      return Number.isFinite(value)
        ? 0 === value && -Infinity === 1 / value
          ? "$-0"
          : value
        : Infinity === value
          ? "$Infinity"
          : -Infinity === value
            ? "$-Infinity"
            : "$NaN";
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
        return (
          (task = request.writtenServerReferences),
          (parentPropertyName = task.get(value)),
          void 0 !== parentPropertyName
            ? (value = "$F" + parentPropertyName.toString(16))
            : ((parentPropertyName = getServerReferenceBoundArguments(
                request.bundlerConfig,
                value
              )),
              (parentPropertyName =
                null === parentPropertyName
                  ? null
                  : Promise.resolve(parentPropertyName)),
              (parentPropertyName = {
                id: getServerReferenceId(request.bundlerConfig, value),
                bound: parentPropertyName
              }),
              (request = outlineModel(request, parentPropertyName)),
              task.set(value, request),
              (value = "$F" + request.toString(16))),
          value
        );
      if (
        void 0 !== request.temporaryReferences &&
        ((request = request.temporaryReferences.get(value)), void 0 !== request)
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
      parentPropertyName = request.nextChunkId++;
      parent = encodeReferenceChunk(
        request,
        parentPropertyName,
        "$S" + elementReference
      );
      request.completedImportChunks.push(parent);
      task.set(value, parentPropertyName);
      return serializeByValueID(parentPropertyName);
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
  function logPostpone(request, reason) {
    var prevRequest = currentRequest;
    currentRequest = null;
    try {
      var onPostpone = request.onPostpone;
      onPostpone(reason);
    } finally {
      currentRequest = prevRequest;
    }
  }
  function logRecoverableError(request, error) {
    var prevRequest = currentRequest;
    currentRequest = null;
    try {
      var onError = request.onError;
      var errorDigest = onError(error);
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
      ? ((request.status = 14), closeWithError(request.destination, error))
      : ((request.status = 13), (request.fatalError = error));
  }
  function emitPostponeChunk(request, id) {
    id = id.toString(16) + ":P\n";
    id = stringToChunk(id);
    request.completedErrorChunks.push(id);
  }
  function emitErrorChunk(request, id, digest) {
    digest = { digest: digest };
    id = id.toString(16) + ":E" + stringify(digest) + "\n";
    id = stringToChunk(id);
    request.completedErrorChunks.push(id);
  }
  function emitModelChunk(request, id, json) {
    id = id.toString(16) + ":" + json + "\n";
    id = stringToChunk(id);
    request.completedRegularChunks.push(id);
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
    if (0 === task.status) {
      task.status = 5;
      try {
        modelRoot = task.model;
        var resolvedModel = renderModelDestructive(
          request,
          task,
          emptyRoot,
          "",
          task.model
        );
        modelRoot = resolvedModel;
        task.keyPath = null;
        task.implicitSlot = !1;
        if ("object" === typeof resolvedModel && null !== resolvedModel)
          request.writtenObjects.set(
            resolvedModel,
            serializeByValueID(task.id)
          ),
            emitChunk(request, task, resolvedModel);
        else {
          var json = stringify(resolvedModel);
          emitModelChunk(request, task.id, json);
        }
        request.abortableTasks.delete(task);
        task.status = 1;
      } catch (thrownValue) {
        if (12 === request.status)
          if (
            (request.abortableTasks.delete(task),
            (task.status = 3),
            21 === request.type)
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
              task.status = 0;
              task.thenableState = getThenableStateAfterSuspending();
              var ping = task.ping;
              x.then(ping, ping);
              return;
            }
            if (x.$$typeof === REACT_POSTPONE_TYPE) {
              request.abortableTasks.delete(task);
              task.status = 4;
              logPostpone(request, x.message, task);
              emitPostponeChunk(request, task.id);
              return;
            }
          }
          request.abortableTasks.delete(task);
          task.status = 4;
          var digest = logRecoverableError(request, x, task);
          emitErrorChunk(request, task.id, digest);
        }
      } finally {
      }
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
    5 !== task.status &&
      ((task.status = 3),
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
      (request.status = 14),
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
      $$$config.getServerReferenceBoundArguments;
  $$$config.getServerReferenceLocation;
  var TEMPORARY_REFERENCE_TAG = Symbol.for("react.temporary.reference"),
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
          ":" + currentRequest$1.identifierPrefix + "S" + id.toString(32) + ":"
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
    DefaultAsyncDispatcher = {
      getCacheForType: function (resourceType) {
        var JSCompiler_inline_result = (JSCompiler_inline_result =
          resolveRequest())
          ? JSCompiler_inline_result.cache
          : new Map();
        var entry = JSCompiler_inline_result.get(resourceType);
        void 0 === entry &&
          ((entry = resourceType()),
          JSCompiler_inline_result.set(resourceType, entry));
        return entry;
      }
    },
    ReactSharedInternalsServer =
      React.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  if (!ReactSharedInternalsServer)
    throw Error(
      'The "react" package in this environment is not configured correctly. The "react-server" condition must be enabled in any environment that runs React Server Components.'
    );
  var isArrayImpl = Array.isArray,
    getPrototypeOf = Object.getPrototypeOf,
    CLIENT_REFERENCE_TAG = Symbol.for("react.client.reference"),
    ObjectPrototype = Object.prototype,
    stringify = JSON.stringify,
    TaintRegistryObjects = ReactSharedInternalsServer.TaintRegistryObjects,
    TaintRegistryValues = ReactSharedInternalsServer.TaintRegistryValues,
    TaintRegistryByteLengths =
      ReactSharedInternalsServer.TaintRegistryByteLengths,
    TaintRegistryPendingRequests =
      ReactSharedInternalsServer.TaintRegistryPendingRequests,
    currentRequest = null,
    modelRoot = !1,
    emptyRoot = {};
  exports.abort = function (request, reason) {
    try {
      11 >= request.status && (request.status = 12);
      var abortableTasks = request.abortableTasks;
      if (0 < abortableTasks.size) {
        if (
          "object" === typeof reason &&
          null !== reason &&
          reason.$$typeof === REACT_POSTPONE_TYPE
        )
          if ((logPostpone(request, reason.message, null), 21 === request.type))
            abortableTasks.forEach(function (task) {
              5 !== task.status && ((task.status = 3), request.pendingChunks--);
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
          if (21 === request.type)
            abortableTasks.forEach(function (task) {
              5 !== task.status && ((task.status = 3), request.pendingChunks--);
            });
          else {
            var errorId$26 = request.nextChunkId++;
            request.fatalError = errorId$26;
            request.pendingChunks++;
            emitErrorChunk(request, errorId$26, digest, error);
            abortableTasks.forEach(function (task) {
              return abortTask(task, request, errorId$26);
            });
          }
        }
        abortableTasks.clear();
        var onAllReady = request.onAllReady;
        onAllReady();
      }
      var abortListeners = request.abortListeners;
      if (0 < abortListeners.size) {
        var error$27 =
          "object" === typeof reason &&
          null !== reason &&
          reason.$$typeof === REACT_POSTPONE_TYPE
            ? Error("The render was aborted due to being postponed.")
            : void 0 === reason
              ? Error("The render was aborted by the server without a reason.")
              : "object" === typeof reason &&
                  null !== reason &&
                  "function" === typeof reason.then
                ? Error("The render was aborted by the server with a promise.")
                : reason;
        abortListeners.forEach(function (callback) {
          return callback(error$27);
        });
        abortListeners.clear();
      }
      null !== request.destination &&
        flushCompletedChunks(request, request.destination);
    } catch (error$28) {
      logRecoverableError(request, error$28, null),
        fatalError(request, error$28);
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
      21,
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
    code = "H" + code;
    code = id.toString(16) + ":" + code;
    model = stringToChunk(code + model + "\n");
    request.completedHintChunks.push(model);
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
    if (13 === request.status)
      (request.status = 14), closeWithError(destination, request.fatalError);
    else if (14 !== request.status && null === request.destination) {
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
      10 === request.status && (request.status = 11);
    });
  };
  exports.stopFlowing = function (request) {
    request.destination = null;
  };
  return exports;
};
module.exports.default = module.exports;
Object.defineProperty(module.exports, "__esModule", { value: !0 });
