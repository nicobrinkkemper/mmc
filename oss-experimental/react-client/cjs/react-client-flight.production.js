/**
 * @license React
 * react-client-flight.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

"use strict";
module.exports = function ($$$config) {
  function formatProdErrorMessage(code) {
    var url = "https://react.dev/errors/" + code;
    if (1 < arguments.length) {
      url += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var i = 2; i < arguments.length; i++)
        url += "&args[]=" + encodeURIComponent(arguments[i]);
    }
    return (
      "Minified React error #" +
      code +
      "; visit " +
      url +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function getIteratorFn(maybeIterable) {
    if (null === maybeIterable || "object" !== typeof maybeIterable)
      return null;
    maybeIterable =
      (MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL]) ||
      maybeIterable["@@iterator"];
    return "function" === typeof maybeIterable ? maybeIterable : null;
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
  function processReply(
    root,
    formFieldPrefix,
    temporaryReferences,
    resolve,
    reject
  ) {
    function serializeTypedArray(tag, typedArray) {
      typedArray = new Blob([
        new Uint8Array(
          typedArray.buffer,
          typedArray.byteOffset,
          typedArray.byteLength
        )
      ]);
      var blobId = nextPartId++;
      null === formData && (formData = new FormData());
      formData.append(formFieldPrefix + blobId, typedArray);
      return "$" + tag + blobId.toString(16);
    }
    function serializeBinaryReader(reader) {
      function progress(entry) {
        entry.done
          ? ((entry = nextPartId++),
            data.append(formFieldPrefix + entry, new Blob(buffer)),
            data.append(
              formFieldPrefix + streamId,
              '"$o' + entry.toString(16) + '"'
            ),
            data.append(formFieldPrefix + streamId, "C"),
            pendingParts--,
            0 === pendingParts && resolve(data))
          : (buffer.push(entry.value),
            reader.read(new Uint8Array(1024)).then(progress, reject));
      }
      null === formData && (formData = new FormData());
      var data = formData;
      pendingParts++;
      var streamId = nextPartId++,
        buffer = [];
      reader.read(new Uint8Array(1024)).then(progress, reject);
      return "$r" + streamId.toString(16);
    }
    function serializeReader(reader) {
      function progress(entry) {
        if (entry.done)
          data.append(formFieldPrefix + streamId, "C"),
            pendingParts--,
            0 === pendingParts && resolve(data);
        else
          try {
            var partJSON = JSON.stringify(entry.value, resolveToJSON);
            data.append(formFieldPrefix + streamId, partJSON);
            reader.read().then(progress, reject);
          } catch (x) {
            reject(x);
          }
      }
      null === formData && (formData = new FormData());
      var data = formData;
      pendingParts++;
      var streamId = nextPartId++;
      reader.read().then(progress, reject);
      return "$R" + streamId.toString(16);
    }
    function serializeReadableStream(stream) {
      try {
        var binaryReader = stream.getReader({ mode: "byob" });
      } catch (x) {
        return serializeReader(stream.getReader());
      }
      return serializeBinaryReader(binaryReader);
    }
    function serializeAsyncIterable(iterable, iterator) {
      function progress(entry) {
        if (entry.done) {
          if (void 0 === entry.value)
            data.append(formFieldPrefix + streamId, "C");
          else
            try {
              var partJSON = JSON.stringify(entry.value, resolveToJSON);
              data.append(formFieldPrefix + streamId, "C" + partJSON);
            } catch (x) {
              reject(x);
              return;
            }
          pendingParts--;
          0 === pendingParts && resolve(data);
        } else
          try {
            var partJSON$1 = JSON.stringify(entry.value, resolveToJSON);
            data.append(formFieldPrefix + streamId, partJSON$1);
            iterator.next().then(progress, reject);
          } catch (x$2) {
            reject(x$2);
          }
      }
      null === formData && (formData = new FormData());
      var data = formData;
      pendingParts++;
      var streamId = nextPartId++;
      iterable = iterable === iterator;
      iterator.next().then(progress, reject);
      return "$" + (iterable ? "x" : "X") + streamId.toString(16);
    }
    function resolveToJSON(key, value) {
      if (null === value) return null;
      if ("object" === typeof value) {
        switch (value.$$typeof) {
          case REACT_ELEMENT_TYPE:
            if (void 0 !== temporaryReferences && -1 === key.indexOf(":")) {
              var parentReference = writtenObjects.get(this);
              if (void 0 !== parentReference)
                return (
                  temporaryReferences.set(parentReference + ":" + key, value),
                  "$T"
                );
            }
            throw Error(formatProdErrorMessage(510, ""));
          case REACT_LAZY_TYPE:
            parentReference = value._payload;
            var init = value._init;
            null === formData && (formData = new FormData());
            pendingParts++;
            try {
              var resolvedModel = init(parentReference),
                lazyId = nextPartId++,
                partJSON = serializeModel(resolvedModel, lazyId);
              formData.append(formFieldPrefix + lazyId, partJSON);
              return "$" + lazyId.toString(16);
            } catch (x) {
              if (
                "object" === typeof x &&
                null !== x &&
                "function" === typeof x.then
              ) {
                pendingParts++;
                var lazyId$3 = nextPartId++;
                parentReference = function () {
                  try {
                    var partJSON$4 = serializeModel(value, lazyId$3),
                      data$5 = formData;
                    data$5.append(formFieldPrefix + lazyId$3, partJSON$4);
                    pendingParts--;
                    0 === pendingParts && resolve(data$5);
                  } catch (reason) {
                    reject(reason);
                  }
                };
                x.then(parentReference, parentReference);
                return "$" + lazyId$3.toString(16);
              }
              reject(x);
              return null;
            } finally {
              pendingParts--;
            }
        }
        if ("function" === typeof value.then) {
          null === formData && (formData = new FormData());
          pendingParts++;
          var promiseId = nextPartId++;
          value.then(function (partValue) {
            try {
              var partJSON$7 = serializeModel(partValue, promiseId);
              partValue = formData;
              partValue.append(formFieldPrefix + promiseId, partJSON$7);
              pendingParts--;
              0 === pendingParts && resolve(partValue);
            } catch (reason) {
              reject(reason);
            }
          }, reject);
          return "$@" + promiseId.toString(16);
        }
        parentReference = writtenObjects.get(value);
        if (void 0 !== parentReference)
          if (modelRoot === value) modelRoot = null;
          else return parentReference;
        else
          -1 === key.indexOf(":") &&
            ((parentReference = writtenObjects.get(this)),
            void 0 !== parentReference &&
              ((key = parentReference + ":" + key),
              writtenObjects.set(value, key),
              void 0 !== temporaryReferences &&
                temporaryReferences.set(key, value)));
        if (isArrayImpl(value)) return value;
        if (value instanceof FormData) {
          null === formData && (formData = new FormData());
          var data$11 = formData;
          key = nextPartId++;
          var prefix = formFieldPrefix + key + "_";
          value.forEach(function (originalValue, originalKey) {
            data$11.append(prefix + originalKey, originalValue);
          });
          return "$K" + key.toString(16);
        }
        if (value instanceof Map)
          return (
            (key = nextPartId++),
            (parentReference = serializeModel(Array.from(value), key)),
            null === formData && (formData = new FormData()),
            formData.append(formFieldPrefix + key, parentReference),
            "$Q" + key.toString(16)
          );
        if (value instanceof Set)
          return (
            (key = nextPartId++),
            (parentReference = serializeModel(Array.from(value), key)),
            null === formData && (formData = new FormData()),
            formData.append(formFieldPrefix + key, parentReference),
            "$W" + key.toString(16)
          );
        if (value instanceof ArrayBuffer)
          return (
            (key = new Blob([value])),
            (parentReference = nextPartId++),
            null === formData && (formData = new FormData()),
            formData.append(formFieldPrefix + parentReference, key),
            "$A" + parentReference.toString(16)
          );
        if (value instanceof Int8Array) return serializeTypedArray("O", value);
        if (value instanceof Uint8Array) return serializeTypedArray("o", value);
        if (value instanceof Uint8ClampedArray)
          return serializeTypedArray("U", value);
        if (value instanceof Int16Array) return serializeTypedArray("S", value);
        if (value instanceof Uint16Array)
          return serializeTypedArray("s", value);
        if (value instanceof Int32Array) return serializeTypedArray("L", value);
        if (value instanceof Uint32Array)
          return serializeTypedArray("l", value);
        if (value instanceof Float32Array)
          return serializeTypedArray("G", value);
        if (value instanceof Float64Array)
          return serializeTypedArray("g", value);
        if (value instanceof BigInt64Array)
          return serializeTypedArray("M", value);
        if (value instanceof BigUint64Array)
          return serializeTypedArray("m", value);
        if (value instanceof DataView) return serializeTypedArray("V", value);
        if ("function" === typeof Blob && value instanceof Blob)
          return (
            null === formData && (formData = new FormData()),
            (key = nextPartId++),
            formData.append(formFieldPrefix + key, value),
            "$B" + key.toString(16)
          );
        if ((key = getIteratorFn(value)))
          return (
            (parentReference = key.call(value)),
            parentReference === value
              ? ((key = nextPartId++),
                (parentReference = serializeModel(
                  Array.from(parentReference),
                  key
                )),
                null === formData && (formData = new FormData()),
                formData.append(formFieldPrefix + key, parentReference),
                "$i" + key.toString(16))
              : Array.from(parentReference)
          );
        if (
          "function" === typeof ReadableStream &&
          value instanceof ReadableStream
        )
          return serializeReadableStream(value);
        key = value[ASYNC_ITERATOR];
        if ("function" === typeof key)
          return serializeAsyncIterable(value, key.call(value));
        key = getPrototypeOf(value);
        if (
          key !== ObjectPrototype &&
          (null === key || null !== getPrototypeOf(key))
        ) {
          if (void 0 === temporaryReferences)
            throw Error(formatProdErrorMessage(499, ""));
          return "$T";
        }
        return value;
      }
      if ("string" === typeof value) {
        if ("Z" === value[value.length - 1] && this[key] instanceof Date)
          return "$D" + value;
        key = "$" === value[0] ? "$" + value : value;
        return key;
      }
      if ("boolean" === typeof value) return value;
      if ("number" === typeof value) return serializeNumber(value);
      if ("undefined" === typeof value) return "$undefined";
      if ("function" === typeof value) {
        parentReference = knownServerReferences.get(value);
        if (void 0 !== parentReference)
          return (
            (key = JSON.stringify(parentReference, resolveToJSON)),
            null === formData && (formData = new FormData()),
            (parentReference = nextPartId++),
            formData.set(formFieldPrefix + parentReference, key),
            "$F" + parentReference.toString(16)
          );
        if (
          void 0 !== temporaryReferences &&
          -1 === key.indexOf(":") &&
          ((parentReference = writtenObjects.get(this)),
          void 0 !== parentReference)
        )
          return (
            temporaryReferences.set(parentReference + ":" + key, value), "$T"
          );
        throw Error(formatProdErrorMessage(469));
      }
      if ("symbol" === typeof value) {
        if (
          void 0 !== temporaryReferences &&
          -1 === key.indexOf(":") &&
          ((parentReference = writtenObjects.get(this)),
          void 0 !== parentReference)
        )
          return (
            temporaryReferences.set(parentReference + ":" + key, value), "$T"
          );
        throw Error(formatProdErrorMessage(517, ""));
      }
      if ("bigint" === typeof value) return "$n" + value.toString(10);
      throw Error(formatProdErrorMessage(472, typeof value));
    }
    function serializeModel(model, id) {
      "object" === typeof model &&
        null !== model &&
        ((id = "$" + id.toString(16)),
        writtenObjects.set(model, id),
        void 0 !== temporaryReferences && temporaryReferences.set(id, model));
      modelRoot = model;
      return JSON.stringify(model, resolveToJSON);
    }
    var nextPartId = 1,
      pendingParts = 0,
      formData = null,
      writtenObjects = new WeakMap(),
      modelRoot = root,
      json = serializeModel(root, 0);
    null === formData
      ? resolve(json)
      : (formData.set(formFieldPrefix + "0", json),
        0 === pendingParts && resolve(formData));
    return function () {
      0 < pendingParts &&
        ((pendingParts = 0),
        null === formData ? resolve(json) : resolve(formData));
    };
  }
  function encodeFormData(reference) {
    var resolve,
      reject,
      thenable = new Promise(function (res, rej) {
        resolve = res;
        reject = rej;
      });
    processReply(
      reference,
      "",
      void 0,
      function (body) {
        if ("string" === typeof body) {
          var data = new FormData();
          data.append("0", body);
          body = data;
        }
        thenable.status = "fulfilled";
        thenable.value = body;
        resolve(body);
      },
      function (e) {
        thenable.status = "rejected";
        thenable.reason = e;
        reject(e);
      }
    );
    return thenable;
  }
  function defaultEncodeFormAction(identifierPrefix) {
    var reference = knownServerReferences.get(this);
    if (!reference) throw Error(formatProdErrorMessage(481));
    var data = null;
    if (null !== reference.bound) {
      data = boundCache.get(reference);
      data ||
        ((data = encodeFormData(reference)), boundCache.set(reference, data));
      if ("rejected" === data.status) throw data.reason;
      if ("fulfilled" !== data.status) throw data;
      reference = data.value;
      var prefixedData = new FormData();
      reference.forEach(function (value, key) {
        prefixedData.append("$ACTION_" + identifierPrefix + ":" + key, value);
      });
      data = prefixedData;
      reference = "$ACTION_REF_" + identifierPrefix;
    } else reference = "$ACTION_ID_" + reference.id;
    return {
      name: reference,
      method: "POST",
      encType: "multipart/form-data",
      data: data
    };
  }
  function isSignatureEqual(referenceId, numberOfBoundArgs) {
    var reference = knownServerReferences.get(this);
    if (!reference) throw Error(formatProdErrorMessage(481));
    if (reference.id !== referenceId) return !1;
    var boundPromise = reference.bound;
    if (null === boundPromise) return 0 === numberOfBoundArgs;
    switch (boundPromise.status) {
      case "fulfilled":
        return boundPromise.value.length === numberOfBoundArgs;
      case "pending":
        throw boundPromise;
      case "rejected":
        throw boundPromise.reason;
      default:
        throw (
          ("string" !== typeof boundPromise.status &&
            ((boundPromise.status = "pending"),
            boundPromise.then(
              function (boundArgs) {
                boundPromise.status = "fulfilled";
                boundPromise.value = boundArgs;
              },
              function (error) {
                boundPromise.status = "rejected";
                boundPromise.reason = error;
              }
            )),
          boundPromise)
        );
    }
  }
  function registerServerReference(
    proxy,
    reference$jscomp$0,
    encodeFormAction
  ) {
    Object.defineProperties(proxy, {
      $$FORM_ACTION: {
        value:
          void 0 === encodeFormAction
            ? defaultEncodeFormAction
            : function () {
                var reference = knownServerReferences.get(this);
                if (!reference) throw Error(formatProdErrorMessage(481));
                var boundPromise = reference.bound;
                null === boundPromise && (boundPromise = Promise.resolve([]));
                return encodeFormAction(reference.id, boundPromise);
              }
      },
      $$IS_SIGNATURE_EQUAL: { value: isSignatureEqual },
      bind: { value: bind }
    });
    knownServerReferences.set(proxy, reference$jscomp$0);
  }
  function bind() {
    var newFn = FunctionBind.apply(this, arguments),
      reference = knownServerReferences.get(this);
    if (reference) {
      var args = ArraySlice.call(arguments, 1),
        boundPromise = null;
      boundPromise =
        null !== reference.bound
          ? Promise.resolve(reference.bound).then(function (boundArgs) {
              return boundArgs.concat(args);
            })
          : Promise.resolve(args);
      Object.defineProperties(newFn, {
        $$FORM_ACTION: { value: this.$$FORM_ACTION },
        $$IS_SIGNATURE_EQUAL: { value: isSignatureEqual },
        bind: { value: bind }
      });
      knownServerReferences.set(newFn, {
        id: reference.id,
        bound: boundPromise
      });
    }
    return newFn;
  }
  function createBoundServerReference(metaData, callServer, encodeFormAction) {
    function action() {
      var args = Array.prototype.slice.call(arguments);
      return bound
        ? "fulfilled" === bound.status
          ? callServer(id, bound.value.concat(args))
          : Promise.resolve(bound).then(function (boundArgs) {
              return callServer(id, boundArgs.concat(args));
            })
        : callServer(id, args);
    }
    var id = metaData.id,
      bound = metaData.bound;
    registerServerReference(action, { id: id, bound: bound }, encodeFormAction);
    return action;
  }
  function ReactPromise(status, value, reason, response) {
    this.status = status;
    this.value = value;
    this.reason = reason;
    this._response = response;
  }
  function readChunk(chunk) {
    switch (chunk.status) {
      case "resolved_model":
        initializeModelChunk(chunk);
        break;
      case "resolved_module":
        initializeModuleChunk(chunk);
    }
    switch (chunk.status) {
      case "fulfilled":
        return chunk.value;
      case "pending":
      case "blocked":
        throw chunk;
      default:
        throw chunk.reason;
    }
  }
  function createPendingChunk(response) {
    return new ReactPromise("pending", null, null, response);
  }
  function wakeChunk(listeners, value) {
    for (var i = 0; i < listeners.length; i++) (0, listeners[i])(value);
  }
  function wakeChunkIfInitialized(chunk, resolveListeners, rejectListeners) {
    switch (chunk.status) {
      case "fulfilled":
        wakeChunk(resolveListeners, chunk.value);
        break;
      case "pending":
      case "blocked":
        if (chunk.value)
          for (var i = 0; i < resolveListeners.length; i++)
            chunk.value.push(resolveListeners[i]);
        else chunk.value = resolveListeners;
        if (chunk.reason) {
          if (rejectListeners)
            for (
              resolveListeners = 0;
              resolveListeners < rejectListeners.length;
              resolveListeners++
            )
              chunk.reason.push(rejectListeners[resolveListeners]);
        } else chunk.reason = rejectListeners;
        break;
      case "rejected":
        rejectListeners && wakeChunk(rejectListeners, chunk.reason);
    }
  }
  function triggerErrorOnChunk(chunk, error) {
    if ("pending" !== chunk.status && "blocked" !== chunk.status)
      chunk.reason.error(error);
    else {
      var listeners = chunk.reason;
      chunk.status = "rejected";
      chunk.reason = error;
      null !== listeners && wakeChunk(listeners, error);
    }
  }
  function createResolvedIteratorResultChunk(response, value, done) {
    return new ReactPromise(
      "resolved_model",
      (done ? '{"done":true,"value":' : '{"done":false,"value":') + value + "}",
      null,
      response
    );
  }
  function resolveIteratorResultChunk(chunk, value, done) {
    resolveModelChunk(
      chunk,
      (done ? '{"done":true,"value":' : '{"done":false,"value":') + value + "}"
    );
  }
  function resolveModelChunk(chunk, value) {
    if ("pending" !== chunk.status) chunk.reason.enqueueModel(value);
    else {
      var resolveListeners = chunk.value,
        rejectListeners = chunk.reason;
      chunk.status = "resolved_model";
      chunk.value = value;
      null !== resolveListeners &&
        (initializeModelChunk(chunk),
        wakeChunkIfInitialized(chunk, resolveListeners, rejectListeners));
    }
  }
  function resolveModuleChunk(chunk, value) {
    if ("pending" === chunk.status || "blocked" === chunk.status) {
      var resolveListeners = chunk.value,
        rejectListeners = chunk.reason;
      chunk.status = "resolved_module";
      chunk.value = value;
      null !== resolveListeners &&
        (initializeModuleChunk(chunk),
        wakeChunkIfInitialized(chunk, resolveListeners, rejectListeners));
    }
  }
  function initializeModelChunk(chunk) {
    var prevHandler = initializingHandler;
    initializingHandler = null;
    var resolvedModel = chunk.value;
    chunk.status = "blocked";
    chunk.value = null;
    chunk.reason = null;
    try {
      var value = JSON.parse(resolvedModel, chunk._response._fromJSON),
        resolveListeners = chunk.value;
      null !== resolveListeners &&
        ((chunk.value = null),
        (chunk.reason = null),
        wakeChunk(resolveListeners, value));
      if (null !== initializingHandler) {
        if (initializingHandler.errored) throw initializingHandler.value;
        if (0 < initializingHandler.deps) {
          initializingHandler.value = value;
          initializingHandler.chunk = chunk;
          return;
        }
      }
      chunk.status = "fulfilled";
      chunk.value = value;
    } catch (error) {
      (chunk.status = "rejected"), (chunk.reason = error);
    } finally {
      initializingHandler = prevHandler;
    }
  }
  function initializeModuleChunk(chunk) {
    try {
      var value = requireModule(chunk.value);
      chunk.status = "fulfilled";
      chunk.value = value;
    } catch (error) {
      (chunk.status = "rejected"), (chunk.reason = error);
    }
  }
  function reportGlobalError(response, error) {
    response._chunks.forEach(function (chunk) {
      "pending" === chunk.status && triggerErrorOnChunk(chunk, error);
    });
  }
  function createLazyChunkWrapper(chunk) {
    return { $$typeof: REACT_LAZY_TYPE, _payload: chunk, _init: readChunk };
  }
  function getChunk(response, id) {
    var chunks = response._chunks,
      chunk = chunks.get(id);
    chunk || ((chunk = createPendingChunk(response)), chunks.set(id, chunk));
    return chunk;
  }
  function waitForReference(
    referencedChunk,
    parentObject,
    key,
    response,
    map,
    path
  ) {
    function fulfill(value) {
      for (var i = 1; i < path.length; i++) {
        for (; value.$$typeof === REACT_LAZY_TYPE; )
          if (((value = value._payload), value === handler.chunk))
            value = handler.value;
          else if ("fulfilled" === value.status) value = value.value;
          else {
            path.splice(0, i - 1);
            value.then(fulfill, reject);
            return;
          }
        value = value[path[i]];
      }
      i = map(response, value, parentObject, key);
      parentObject[key] = i;
      "" === key && null === handler.value && (handler.value = i);
      if (
        parentObject[0] === REACT_ELEMENT_TYPE &&
        "object" === typeof handler.value &&
        null !== handler.value &&
        handler.value.$$typeof === REACT_ELEMENT_TYPE
      )
        switch (((value = handler.value), key)) {
          case "3":
            value.props = i;
        }
      handler.deps--;
      0 === handler.deps &&
        ((i = handler.chunk),
        null !== i &&
          "blocked" === i.status &&
          ((value = i.value),
          (i.status = "fulfilled"),
          (i.value = handler.value),
          null !== value && wakeChunk(value, handler.value)));
    }
    function reject(error) {
      if (!handler.errored) {
        handler.errored = !0;
        handler.value = error;
        var chunk = handler.chunk;
        null !== chunk &&
          "blocked" === chunk.status &&
          triggerErrorOnChunk(chunk, error);
      }
    }
    if (initializingHandler) {
      var handler = initializingHandler;
      handler.deps++;
    } else
      handler = initializingHandler = {
        parent: null,
        chunk: null,
        value: null,
        deps: 1,
        errored: !1
      };
    referencedChunk.then(fulfill, reject);
    return null;
  }
  function loadServerReference(response, metaData, parentObject, key) {
    if (!response._serverReferenceConfig)
      return createBoundServerReference(
        metaData,
        response._callServer,
        response._encodeFormAction
      );
    var serverReference = resolveServerReference(
      response._serverReferenceConfig,
      metaData.id
    );
    if ((response = preloadModule(serverReference)))
      metaData.bound && (response = Promise.all([response, metaData.bound]));
    else if (metaData.bound) response = Promise.resolve(metaData.bound);
    else return requireModule(serverReference);
    if (initializingHandler) {
      var handler = initializingHandler;
      handler.deps++;
    } else
      handler = initializingHandler = {
        parent: null,
        chunk: null,
        value: null,
        deps: 1,
        errored: !1
      };
    response.then(
      function () {
        var resolvedValue = requireModule(serverReference);
        if (metaData.bound) {
          var boundArgs = metaData.bound.value.slice(0);
          boundArgs.unshift(null);
          resolvedValue = resolvedValue.bind.apply(resolvedValue, boundArgs);
        }
        parentObject[key] = resolvedValue;
        "" === key && null === handler.value && (handler.value = resolvedValue);
        if (
          parentObject[0] === REACT_ELEMENT_TYPE &&
          "object" === typeof handler.value &&
          null !== handler.value &&
          handler.value.$$typeof === REACT_ELEMENT_TYPE
        )
          switch (((boundArgs = handler.value), key)) {
            case "3":
              boundArgs.props = resolvedValue;
          }
        handler.deps--;
        0 === handler.deps &&
          ((resolvedValue = handler.chunk),
          null !== resolvedValue &&
            "blocked" === resolvedValue.status &&
            ((boundArgs = resolvedValue.value),
            (resolvedValue.status = "fulfilled"),
            (resolvedValue.value = handler.value),
            null !== boundArgs && wakeChunk(boundArgs, handler.value)));
      },
      function (error) {
        if (!handler.errored) {
          handler.errored = !0;
          handler.value = error;
          var chunk = handler.chunk;
          null !== chunk &&
            "blocked" === chunk.status &&
            triggerErrorOnChunk(chunk, error);
        }
      }
    );
    return null;
  }
  function getOutlinedModel(response, reference, parentObject, key, map) {
    reference = reference.split(":");
    var id = parseInt(reference[0], 16);
    id = getChunk(response, id);
    switch (id.status) {
      case "resolved_model":
        initializeModelChunk(id);
        break;
      case "resolved_module":
        initializeModuleChunk(id);
    }
    switch (id.status) {
      case "fulfilled":
        var value = id.value;
        for (id = 1; id < reference.length; id++) {
          for (; value.$$typeof === REACT_LAZY_TYPE; )
            if (((value = value._payload), "fulfilled" === value.status))
              value = value.value;
            else
              return waitForReference(
                value,
                parentObject,
                key,
                response,
                map,
                reference.slice(id - 1)
              );
          value = value[reference[id]];
        }
        return map(response, value, parentObject, key);
      case "pending":
      case "blocked":
        return waitForReference(
          id,
          parentObject,
          key,
          response,
          map,
          reference
        );
      default:
        return (
          initializingHandler
            ? ((initializingHandler.errored = !0),
              (initializingHandler.value = id.reason))
            : (initializingHandler = {
                parent: null,
                chunk: null,
                value: id.reason,
                deps: 0,
                errored: !0
              }),
          null
        );
    }
  }
  function createMap(response, model) {
    return new Map(model);
  }
  function createSet(response, model) {
    return new Set(model);
  }
  function createBlob(response, model) {
    return new Blob(model.slice(1), { type: model[0] });
  }
  function createFormData(response, model) {
    response = new FormData();
    for (var i = 0; i < model.length; i++)
      response.append(model[i][0], model[i][1]);
    return response;
  }
  function extractIterator(response, model) {
    return model[Symbol.iterator]();
  }
  function createModel(response, model) {
    return model;
  }
  function parseModelString(response, parentObject, key, value) {
    if ("$" === value[0]) {
      if ("$" === value)
        return (
          null !== initializingHandler &&
            "0" === key &&
            (initializingHandler = {
              parent: initializingHandler,
              chunk: null,
              value: null,
              deps: 0,
              errored: !1
            }),
          REACT_ELEMENT_TYPE
        );
      switch (value[1]) {
        case "$":
          return value.slice(1);
        case "L":
          return (
            (parentObject = parseInt(value.slice(2), 16)),
            (response = getChunk(response, parentObject)),
            createLazyChunkWrapper(response)
          );
        case "@":
          if (2 === value.length) return new Promise(function () {});
          parentObject = parseInt(value.slice(2), 16);
          return getChunk(response, parentObject);
        case "S":
          return Symbol.for(value.slice(2));
        case "F":
          return (
            (value = value.slice(2)),
            getOutlinedModel(
              response,
              value,
              parentObject,
              key,
              loadServerReference
            )
          );
        case "T":
          parentObject = "$" + value.slice(2);
          response = response._tempRefs;
          if (null == response) throw Error(formatProdErrorMessage(511));
          return response.get(parentObject);
        case "Q":
          return (
            (value = value.slice(2)),
            getOutlinedModel(response, value, parentObject, key, createMap)
          );
        case "W":
          return (
            (value = value.slice(2)),
            getOutlinedModel(response, value, parentObject, key, createSet)
          );
        case "B":
          return (
            (value = value.slice(2)),
            getOutlinedModel(response, value, parentObject, key, createBlob)
          );
        case "K":
          return (
            (value = value.slice(2)),
            getOutlinedModel(response, value, parentObject, key, createFormData)
          );
        case "Z":
          return resolveErrorProd();
        case "i":
          return (
            (value = value.slice(2)),
            getOutlinedModel(
              response,
              value,
              parentObject,
              key,
              extractIterator
            )
          );
        case "I":
          return Infinity;
        case "-":
          return "$-0" === value ? -0 : -Infinity;
        case "N":
          return NaN;
        case "u":
          return;
        case "D":
          return new Date(Date.parse(value.slice(2)));
        case "n":
          return BigInt(value.slice(2));
        default:
          return (
            (value = value.slice(1)),
            getOutlinedModel(response, value, parentObject, key, createModel)
          );
      }
    }
    return value;
  }
  function missingCall() {
    throw Error(formatProdErrorMessage(466));
  }
  function ResponseInstance(
    bundlerConfig,
    serverReferenceConfig,
    moduleLoading,
    callServer,
    encodeFormAction,
    nonce,
    temporaryReferences
  ) {
    var chunks = new Map();
    this._bundlerConfig = bundlerConfig;
    this._serverReferenceConfig = serverReferenceConfig;
    this._moduleLoading = moduleLoading;
    this._callServer = void 0 !== callServer ? callServer : missingCall;
    this._encodeFormAction = encodeFormAction;
    this._nonce = nonce;
    this._chunks = chunks;
    this._stringDecoder = createStringDecoder();
    this._fromJSON = null;
    this._rowLength = this._rowTag = this._rowID = this._rowState = 0;
    this._buffer = [];
    this._tempRefs = temporaryReferences;
    this._fromJSON = createFromJSONCallback(this);
  }
  function resolveBuffer(response, id, buffer) {
    var chunks = response._chunks,
      chunk = chunks.get(id);
    chunk && "pending" !== chunk.status
      ? chunk.reason.enqueueValue(buffer)
      : chunks.set(id, new ReactPromise("fulfilled", buffer, null, response));
  }
  function resolveModule(response, id, model) {
    var chunks = response._chunks,
      chunk = chunks.get(id);
    model = JSON.parse(model, response._fromJSON);
    var clientReference = resolveClientReference(
      response._bundlerConfig,
      model
    );
    prepareDestinationForModule(
      response._moduleLoading,
      response._nonce,
      model
    );
    if ((model = preloadModule(clientReference))) {
      if (chunk) {
        var blockedChunk = chunk;
        blockedChunk.status = "blocked";
      } else
        (blockedChunk = new ReactPromise("blocked", null, null, response)),
          chunks.set(id, blockedChunk);
      model.then(
        function () {
          return resolveModuleChunk(blockedChunk, clientReference);
        },
        function (error) {
          return triggerErrorOnChunk(blockedChunk, error);
        }
      );
    } else
      chunk
        ? resolveModuleChunk(chunk, clientReference)
        : chunks.set(
            id,
            new ReactPromise("resolved_module", clientReference, null, response)
          );
  }
  function resolveStream(response, id, stream, controller) {
    var chunks = response._chunks,
      chunk = chunks.get(id);
    chunk
      ? "pending" === chunk.status &&
        ((response = chunk.value),
        (chunk.status = "fulfilled"),
        (chunk.value = stream),
        (chunk.reason = controller),
        null !== response && wakeChunk(response, chunk.value))
      : chunks.set(
          id,
          new ReactPromise("fulfilled", stream, controller, response)
        );
  }
  function startReadableStream(response, id, type) {
    var controller = null;
    type = new ReadableStream({
      type: type,
      start: function (c) {
        controller = c;
      }
    });
    var previousBlockedChunk = null;
    resolveStream(response, id, type, {
      enqueueValue: function (value) {
        null === previousBlockedChunk
          ? controller.enqueue(value)
          : previousBlockedChunk.then(function () {
              controller.enqueue(value);
            });
      },
      enqueueModel: function (json) {
        if (null === previousBlockedChunk) {
          var chunk = new ReactPromise("resolved_model", json, null, response);
          initializeModelChunk(chunk);
          "fulfilled" === chunk.status
            ? controller.enqueue(chunk.value)
            : (chunk.then(
                function (v) {
                  return controller.enqueue(v);
                },
                function (e) {
                  return controller.error(e);
                }
              ),
              (previousBlockedChunk = chunk));
        } else {
          chunk = previousBlockedChunk;
          var chunk$31 = createPendingChunk(response);
          chunk$31.then(
            function (v) {
              return controller.enqueue(v);
            },
            function (e) {
              return controller.error(e);
            }
          );
          previousBlockedChunk = chunk$31;
          chunk.then(function () {
            previousBlockedChunk === chunk$31 && (previousBlockedChunk = null);
            resolveModelChunk(chunk$31, json);
          });
        }
      },
      close: function () {
        if (null === previousBlockedChunk) controller.close();
        else {
          var blockedChunk = previousBlockedChunk;
          previousBlockedChunk = null;
          blockedChunk.then(function () {
            return controller.close();
          });
        }
      },
      error: function (error) {
        if (null === previousBlockedChunk) controller.error(error);
        else {
          var blockedChunk = previousBlockedChunk;
          previousBlockedChunk = null;
          blockedChunk.then(function () {
            return controller.error(error);
          });
        }
      }
    });
  }
  function asyncIterator() {
    return this;
  }
  function createIterator(next) {
    next = { next: next };
    next[ASYNC_ITERATOR] = asyncIterator;
    return next;
  }
  function startAsyncIterable(response, id, iterator) {
    var buffer = [],
      closed = !1,
      nextWriteIndex = 0,
      $jscomp$compprop0 = {};
    $jscomp$compprop0 =
      (($jscomp$compprop0[ASYNC_ITERATOR] = function () {
        var nextReadIndex = 0;
        return createIterator(function (arg) {
          if (void 0 !== arg) throw Error(formatProdErrorMessage(524));
          if (nextReadIndex === buffer.length) {
            if (closed)
              return new ReactPromise(
                "fulfilled",
                { done: !0, value: void 0 },
                null,
                response
              );
            buffer[nextReadIndex] = createPendingChunk(response);
          }
          return buffer[nextReadIndex++];
        });
      }),
      $jscomp$compprop0);
    resolveStream(
      response,
      id,
      iterator ? $jscomp$compprop0[ASYNC_ITERATOR]() : $jscomp$compprop0,
      {
        enqueueValue: function (value) {
          if (nextWriteIndex === buffer.length)
            buffer[nextWriteIndex] = new ReactPromise(
              "fulfilled",
              { done: !1, value: value },
              null,
              response
            );
          else {
            var chunk = buffer[nextWriteIndex],
              resolveListeners = chunk.value,
              rejectListeners = chunk.reason;
            chunk.status = "fulfilled";
            chunk.value = { done: !1, value: value };
            null !== resolveListeners &&
              wakeChunkIfInitialized(chunk, resolveListeners, rejectListeners);
          }
          nextWriteIndex++;
        },
        enqueueModel: function (value) {
          nextWriteIndex === buffer.length
            ? (buffer[nextWriteIndex] = createResolvedIteratorResultChunk(
                response,
                value,
                !1
              ))
            : resolveIteratorResultChunk(buffer[nextWriteIndex], value, !1);
          nextWriteIndex++;
        },
        close: function (value) {
          closed = !0;
          nextWriteIndex === buffer.length
            ? (buffer[nextWriteIndex] = createResolvedIteratorResultChunk(
                response,
                value,
                !0
              ))
            : resolveIteratorResultChunk(buffer[nextWriteIndex], value, !0);
          for (nextWriteIndex++; nextWriteIndex < buffer.length; )
            resolveIteratorResultChunk(
              buffer[nextWriteIndex++],
              '"$undefined"',
              !0
            );
        },
        error: function (error) {
          closed = !0;
          for (
            nextWriteIndex === buffer.length &&
            (buffer[nextWriteIndex] = createPendingChunk(response));
            nextWriteIndex < buffer.length;

          )
            triggerErrorOnChunk(buffer[nextWriteIndex++], error);
        }
      }
    );
  }
  function resolveErrorProd() {
    var error = Error(formatProdErrorMessage(441));
    error.stack = "Error: " + error.message;
    return error;
  }
  function mergeBuffer(buffer, lastChunk) {
    for (
      var l = buffer.length, byteLength = lastChunk.length, i = 0;
      i < l;
      i++
    )
      byteLength += buffer[i].byteLength;
    byteLength = new Uint8Array(byteLength);
    for (var i$32 = (i = 0); i$32 < l; i$32++) {
      var chunk = buffer[i$32];
      byteLength.set(chunk, i);
      i += chunk.byteLength;
    }
    byteLength.set(lastChunk, i);
    return byteLength;
  }
  function resolveTypedArray(
    response,
    id,
    buffer,
    lastChunk,
    constructor,
    bytesPerElement
  ) {
    buffer =
      0 === buffer.length && 0 === lastChunk.byteOffset % bytesPerElement
        ? lastChunk
        : mergeBuffer(buffer, lastChunk);
    constructor = new constructor(
      buffer.buffer,
      buffer.byteOffset,
      buffer.byteLength / bytesPerElement
    );
    resolveBuffer(response, id, constructor);
  }
  function processFullBinaryRow(response, id, tag, buffer, chunk) {
    switch (tag) {
      case 65:
        resolveBuffer(response, id, mergeBuffer(buffer, chunk).buffer);
        return;
      case 79:
        resolveTypedArray(response, id, buffer, chunk, Int8Array, 1);
        return;
      case 111:
        resolveBuffer(
          response,
          id,
          0 === buffer.length ? chunk : mergeBuffer(buffer, chunk)
        );
        return;
      case 85:
        resolveTypedArray(response, id, buffer, chunk, Uint8ClampedArray, 1);
        return;
      case 83:
        resolveTypedArray(response, id, buffer, chunk, Int16Array, 2);
        return;
      case 115:
        resolveTypedArray(response, id, buffer, chunk, Uint16Array, 2);
        return;
      case 76:
        resolveTypedArray(response, id, buffer, chunk, Int32Array, 4);
        return;
      case 108:
        resolveTypedArray(response, id, buffer, chunk, Uint32Array, 4);
        return;
      case 71:
        resolveTypedArray(response, id, buffer, chunk, Float32Array, 4);
        return;
      case 103:
        resolveTypedArray(response, id, buffer, chunk, Float64Array, 8);
        return;
      case 77:
        resolveTypedArray(response, id, buffer, chunk, BigInt64Array, 8);
        return;
      case 109:
        resolveTypedArray(response, id, buffer, chunk, BigUint64Array, 8);
        return;
      case 86:
        resolveTypedArray(response, id, buffer, chunk, DataView, 1);
        return;
    }
    for (
      var stringDecoder = response._stringDecoder, row = "", i = 0;
      i < buffer.length;
      i++
    )
      row += readPartialStringChunk(stringDecoder, buffer[i]);
    row += readFinalStringChunk(stringDecoder, chunk);
    processFullStringRow(response, id, tag, row);
  }
  function processFullStringRow(response, id, tag, row) {
    switch (tag) {
      case 73:
        resolveModule(response, id, row);
        break;
      case 72:
        id = row[0];
        row = row.slice(1);
        response = JSON.parse(row, response._fromJSON);
        dispatchHint(id, response);
        break;
      case 69:
        tag = JSON.parse(row);
        row = resolveErrorProd();
        row.digest = tag.digest;
        tag = response._chunks;
        var chunk = tag.get(id);
        chunk
          ? triggerErrorOnChunk(chunk, row)
          : tag.set(id, new ReactPromise("rejected", null, row, response));
        break;
      case 84:
        tag = response._chunks;
        (chunk = tag.get(id)) && "pending" !== chunk.status
          ? chunk.reason.enqueueValue(row)
          : tag.set(id, new ReactPromise("fulfilled", row, null, response));
        break;
      case 68:
      case 87:
        throw Error(formatProdErrorMessage(504));
      case 82:
        startReadableStream(response, id, void 0);
        break;
      case 114:
        startReadableStream(response, id, "bytes");
        break;
      case 88:
        startAsyncIterable(response, id, !1);
        break;
      case 120:
        startAsyncIterable(response, id, !0);
        break;
      case 67:
        (response = response._chunks.get(id)) &&
          "fulfilled" === response.status &&
          response.reason.close("" === row ? '"$undefined"' : row);
        break;
      case 80:
        row = Error(formatProdErrorMessage(484));
        row.$$typeof = REACT_POSTPONE_TYPE;
        row.stack = "Error: " + row.message;
        tag = response._chunks;
        (chunk = tag.get(id))
          ? triggerErrorOnChunk(chunk, row)
          : tag.set(id, new ReactPromise("rejected", null, row, response));
        break;
      default:
        (tag = response._chunks),
          (chunk = tag.get(id))
            ? resolveModelChunk(chunk, row)
            : tag.set(
                id,
                new ReactPromise("resolved_model", row, null, response)
              );
    }
  }
  function createFromJSONCallback(response) {
    return function (key, value) {
      if ("string" === typeof value)
        return parseModelString(response, this, key, value);
      if ("object" === typeof value && null !== value) {
        if (value[0] === REACT_ELEMENT_TYPE) {
          if (
            ((key = {
              $$typeof: REACT_ELEMENT_TYPE,
              type: value[1],
              key: value[2],
              ref: null,
              props: value[3]
            }),
            null !== initializingHandler)
          )
            if (
              ((value = initializingHandler),
              (initializingHandler = value.parent),
              value.errored)
            )
              (key = new ReactPromise("rejected", null, value.value, response)),
                (key = createLazyChunkWrapper(key));
            else if (0 < value.deps) {
              var blockedChunk = new ReactPromise(
                "blocked",
                null,
                null,
                response
              );
              value.value = key;
              value.chunk = blockedChunk;
              key = createLazyChunkWrapper(blockedChunk);
            }
        } else key = value;
        return key;
      }
      return value;
    };
  }
  function getCurrentOwnerInDEV() {
    return null;
  }
  var exports = {};
  ("use strict");
  var React = require("react"),
    resolveClientReference = $$$config.resolveClientReference,
    resolveServerReference = $$$config.resolveServerReference,
    preloadModule = $$$config.preloadModule,
    requireModule = $$$config.requireModule,
    dispatchHint = $$$config.dispatchHint,
    prepareDestinationForModule = $$$config.prepareDestinationForModule,
    createStringDecoder = $$$config.createStringDecoder,
    readPartialStringChunk = $$$config.readPartialStringChunk,
    readFinalStringChunk = $$$config.readFinalStringChunk;
  $$$config.bindToConsole;
  var rendererVersion = $$$config.rendererVersion,
    rendererPackageName = $$$config.rendererPackageName,
    REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
    REACT_LAZY_TYPE = Symbol.for("react.lazy"),
    REACT_POSTPONE_TYPE = Symbol.for("react.postpone"),
    MAYBE_ITERATOR_SYMBOL = Symbol.iterator,
    ASYNC_ITERATOR = Symbol.asyncIterator,
    isArrayImpl = Array.isArray,
    getPrototypeOf = Object.getPrototypeOf,
    ObjectPrototype = Object.prototype,
    knownServerReferences = new WeakMap(),
    boundCache = new WeakMap(),
    FunctionBind = Function.prototype.bind,
    ArraySlice = Array.prototype.slice;
  $$$config =
    React.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  var ReactSharedInternals =
    React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE ||
    $$$config;
  ReactPromise.prototype = Object.create(Promise.prototype);
  ReactPromise.prototype.then = function (resolve, reject) {
    switch (this.status) {
      case "resolved_model":
        initializeModelChunk(this);
        break;
      case "resolved_module":
        initializeModuleChunk(this);
    }
    switch (this.status) {
      case "fulfilled":
        resolve(this.value);
        break;
      case "pending":
      case "blocked":
        resolve &&
          (null === this.value && (this.value = []), this.value.push(resolve));
        reject &&
          (null === this.reason && (this.reason = []),
          this.reason.push(reject));
        break;
      default:
        reject && reject(this.reason);
    }
  };
  var initializingHandler = null;
  exports.close = function (response) {
    reportGlobalError(response, Error(formatProdErrorMessage(412)));
  };
  exports.createResponse = function (
    bundlerConfig,
    serverReferenceConfig,
    moduleLoading,
    callServer,
    encodeFormAction,
    nonce,
    temporaryReferences
  ) {
    return new ResponseInstance(
      bundlerConfig,
      serverReferenceConfig,
      moduleLoading,
      callServer,
      encodeFormAction,
      nonce,
      temporaryReferences
    );
  };
  exports.getRoot = function (response) {
    return getChunk(response, 0);
  };
  exports.injectIntoDevTools = function () {
    var JSCompiler_inline_result = {
      bundleType: 0,
      version: rendererVersion,
      rendererPackageName: rendererPackageName,
      currentDispatcherRef: ReactSharedInternals,
      reconcilerVersion: "19.0.0-experimental-ed15d500-20241110",
      getCurrentComponentInfo: getCurrentOwnerInDEV
    };
    if ("undefined" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__)
      JSCompiler_inline_result = !1;
    else {
      var hook = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (hook.isDisabled || !hook.supportsFlight)
        JSCompiler_inline_result = !0;
      else {
        try {
          hook.inject(JSCompiler_inline_result);
        } catch (err) {}
        JSCompiler_inline_result = hook.checkDCE ? !0 : !1;
      }
    }
    return JSCompiler_inline_result;
  };
  exports.processBinaryChunk = function (response, chunk) {
    for (
      var i = 0,
        rowState = response._rowState,
        rowID = response._rowID,
        rowTag = response._rowTag,
        rowLength = response._rowLength,
        buffer = response._buffer,
        chunkLength = chunk.length;
      i < chunkLength;

    ) {
      var lastIdx = -1;
      switch (rowState) {
        case 0:
          lastIdx = chunk[i++];
          58 === lastIdx
            ? (rowState = 1)
            : (rowID =
                (rowID << 4) | (96 < lastIdx ? lastIdx - 87 : lastIdx - 48));
          continue;
        case 1:
          rowState = chunk[i];
          84 === rowState ||
          65 === rowState ||
          79 === rowState ||
          111 === rowState ||
          85 === rowState ||
          83 === rowState ||
          115 === rowState ||
          76 === rowState ||
          108 === rowState ||
          71 === rowState ||
          103 === rowState ||
          77 === rowState ||
          109 === rowState ||
          86 === rowState
            ? ((rowTag = rowState), (rowState = 2), i++)
            : (64 < rowState && 91 > rowState) ||
                35 === rowState ||
                114 === rowState ||
                120 === rowState
              ? ((rowTag = rowState), (rowState = 3), i++)
              : ((rowTag = 0), (rowState = 3));
          continue;
        case 2:
          lastIdx = chunk[i++];
          44 === lastIdx
            ? (rowState = 4)
            : (rowLength =
                (rowLength << 4) |
                (96 < lastIdx ? lastIdx - 87 : lastIdx - 48));
          continue;
        case 3:
          lastIdx = chunk.indexOf(10, i);
          break;
        case 4:
          (lastIdx = i + rowLength), lastIdx > chunk.length && (lastIdx = -1);
      }
      var offset = chunk.byteOffset + i;
      if (-1 < lastIdx)
        (rowLength = new Uint8Array(chunk.buffer, offset, lastIdx - i)),
          processFullBinaryRow(response, rowID, rowTag, buffer, rowLength),
          (i = lastIdx),
          3 === rowState && i++,
          (rowLength = rowID = rowTag = rowState = 0),
          (buffer.length = 0);
      else {
        chunk = new Uint8Array(chunk.buffer, offset, chunk.byteLength - i);
        buffer.push(chunk);
        rowLength -= chunk.byteLength;
        break;
      }
    }
    response._rowState = rowState;
    response._rowID = rowID;
    response._rowTag = rowTag;
    response._rowLength = rowLength;
  };
  exports.processStringChunk = function (response, chunk) {
    for (
      var i = 0,
        rowState = response._rowState,
        rowID = response._rowID,
        rowTag = response._rowTag,
        rowLength = response._rowLength,
        buffer = response._buffer,
        chunkLength = chunk.length;
      i < chunkLength;

    ) {
      var lastIdx = -1;
      switch (rowState) {
        case 0:
          lastIdx = chunk.charCodeAt(i++);
          58 === lastIdx
            ? (rowState = 1)
            : (rowID =
                (rowID << 4) | (96 < lastIdx ? lastIdx - 87 : lastIdx - 48));
          continue;
        case 1:
          rowState = chunk.charCodeAt(i);
          84 === rowState ||
          65 === rowState ||
          79 === rowState ||
          111 === rowState ||
          85 === rowState ||
          83 === rowState ||
          115 === rowState ||
          76 === rowState ||
          108 === rowState ||
          71 === rowState ||
          103 === rowState ||
          77 === rowState ||
          109 === rowState ||
          86 === rowState
            ? ((rowTag = rowState), (rowState = 2), i++)
            : (64 < rowState && 91 > rowState) ||
                114 === rowState ||
                120 === rowState
              ? ((rowTag = rowState), (rowState = 3), i++)
              : ((rowTag = 0), (rowState = 3));
          continue;
        case 2:
          lastIdx = chunk.charCodeAt(i++);
          44 === lastIdx
            ? (rowState = 4)
            : (rowLength =
                (rowLength << 4) |
                (96 < lastIdx ? lastIdx - 87 : lastIdx - 48));
          continue;
        case 3:
          lastIdx = chunk.indexOf("\n", i);
          break;
        case 4:
          if (84 !== rowTag) throw Error(formatProdErrorMessage(539));
          if (rowLength < chunk.length || chunk.length > 3 * rowLength)
            throw Error(formatProdErrorMessage(540));
          lastIdx = chunk.length;
      }
      if (-1 < lastIdx) {
        if (0 < buffer.length) throw Error(formatProdErrorMessage(540));
        i = chunk.slice(i, lastIdx);
        processFullStringRow(response, rowID, rowTag, i);
        i = lastIdx;
        3 === rowState && i++;
        rowLength = rowID = rowTag = rowState = 0;
        buffer.length = 0;
      } else if (chunk.length !== i) throw Error(formatProdErrorMessage(540));
    }
    response._rowState = rowState;
    response._rowID = rowID;
    response._rowTag = rowTag;
    response._rowLength = rowLength;
  };
  exports.reportGlobalError = reportGlobalError;
  return exports;
};
module.exports.default = module.exports;
Object.defineProperty(module.exports, "__esModule", { value: !0 });
