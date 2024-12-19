/**
 * @license React
 * react-debug-tools.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

"use strict";
"production" !== process.env.NODE_ENV &&
  (function () {
    function getPrimitiveStackCache() {
      if (null === primitiveStackCache) {
        var cache = new Map();
        try {
          Dispatcher.useContext({ _currentValue: null });
          "function" === typeof Dispatcher.unstable_useContextWithBailout &&
            Dispatcher.unstable_useContextWithBailout(
              { _currentValue: null },
              null
            );
          Dispatcher.useState(null);
          Dispatcher.useReducer(function (s) {
            return s;
          }, null);
          Dispatcher.useRef(null);
          "function" === typeof Dispatcher.useCacheRefresh &&
            Dispatcher.useCacheRefresh();
          Dispatcher.useLayoutEffect(function () {});
          Dispatcher.useInsertionEffect(function () {});
          Dispatcher.useEffect(function () {});
          Dispatcher.useImperativeHandle(void 0, function () {
            return null;
          });
          Dispatcher.useDebugValue(null);
          Dispatcher.useCallback(function () {});
          Dispatcher.useTransition();
          Dispatcher.useSyncExternalStore(
            function () {
              return function () {};
            },
            function () {
              return null;
            },
            function () {
              return null;
            }
          );
          Dispatcher.useDeferredValue(null);
          Dispatcher.useMemo(function () {
            return null;
          });
          "function" === typeof Dispatcher.useMemoCache &&
            Dispatcher.useMemoCache(0);
          "function" === typeof Dispatcher.useOptimistic &&
            Dispatcher.useOptimistic(null, function (s) {
              return s;
            });
          "function" === typeof Dispatcher.useFormState &&
            Dispatcher.useFormState(function (s) {
              return s;
            }, null);
          "function" === typeof Dispatcher.useActionState &&
            Dispatcher.useActionState(function (s) {
              return s;
            }, null);
          if ("function" === typeof Dispatcher.use) {
            Dispatcher.use({
              $$typeof: REACT_CONTEXT_TYPE,
              _currentValue: null
            });
            Dispatcher.use({
              then: function () {},
              status: "fulfilled",
              value: null
            });
            try {
              Dispatcher.use({ then: function () {} });
            } catch (x) {}
          }
          Dispatcher.useId();
          "function" === typeof Dispatcher.useHostTransitionStatus &&
            Dispatcher.useHostTransitionStatus();
        } finally {
          var readHookLog = hookLog;
          hookLog = [];
        }
        for (var i = 0; i < readHookLog.length; i++) {
          var hook = readHookLog[i];
          cache.set(hook.primitive, ErrorStackParser.parse(hook.stackError));
        }
        primitiveStackCache = cache;
      }
      return primitiveStackCache;
    }
    function nextHook() {
      var hook = currentHook;
      null !== hook && (currentHook = hook.next);
      return hook;
    }
    function readContext(context) {
      if (null === currentFiber) return context._currentValue;
      if (null === currentContextDependency)
        throw Error(
          "Context reads do not line up with context dependencies. This is a bug in React Debug Tools."
        );
      hasOwnProperty.call(currentContextDependency, "memoizedValue")
        ? ((context = currentContextDependency.memoizedValue),
          (currentContextDependency = currentContextDependency.next))
        : (context = context._currentValue);
      return context;
    }
    function findSharedIndex(hookStack, rootStack, rootIndex) {
      var source = rootStack[rootIndex].source,
        i = 0;
      a: for (; i < hookStack.length; i++)
        if (hookStack[i].source === source) {
          for (
            var a = rootIndex + 1, b = i + 1;
            a < rootStack.length && b < hookStack.length;
            a++, b++
          )
            if (hookStack[b].source !== rootStack[a].source) continue a;
          return i;
        }
      return -1;
    }
    function isReactWrapper(functionName, wrapperName) {
      functionName = parseHookName(functionName);
      return "HostTransitionStatus" === wrapperName
        ? functionName === wrapperName || "FormStatus" === functionName
        : functionName === wrapperName;
    }
    function parseHookName(functionName) {
      if (!functionName) return "";
      var startIndex = functionName.lastIndexOf("[as ");
      if (-1 !== startIndex)
        return parseHookName(functionName.slice(startIndex + 4, -1));
      startIndex = functionName.lastIndexOf(".");
      startIndex = -1 === startIndex ? 0 : startIndex + 1;
      functionName.slice(startIndex).startsWith("unstable_") &&
        (startIndex += 9);
      if ("use" === functionName.slice(startIndex, startIndex + 3)) {
        if (3 === functionName.length - startIndex) return "Use";
        startIndex += 3;
      }
      return functionName.slice(startIndex);
    }
    function buildTree(rootStack$jscomp$0, readHookLog) {
      for (
        var rootChildren = [],
          prevStack = null,
          levelChildren = rootChildren,
          nativeHookID = 0,
          stackOfChildren = [],
          i = 0;
        i < readHookLog.length;
        i++
      ) {
        var hook = readHookLog[i];
        var rootStack = rootStack$jscomp$0,
          hook$jscomp$0 = hook;
        var parseResult = ErrorStackParser.parse(hook$jscomp$0.stackError);
        b: {
          var hookStack = parseResult,
            rootIndex = findSharedIndex(
              hookStack,
              rootStack,
              mostLikelyAncestorIndex
            );
          if (-1 !== rootIndex) rootStack = rootIndex;
          else {
            for (
              var i$jscomp$0 = 0;
              i$jscomp$0 < rootStack.length && 5 > i$jscomp$0;
              i$jscomp$0++
            )
              if (
                ((rootIndex = findSharedIndex(
                  hookStack,
                  rootStack,
                  i$jscomp$0
                )),
                -1 !== rootIndex)
              ) {
                mostLikelyAncestorIndex = i$jscomp$0;
                rootStack = rootIndex;
                break b;
              }
            rootStack = -1;
          }
        }
        b: {
          hookStack = parseResult;
          rootIndex = getPrimitiveStackCache().get(hook$jscomp$0.primitive);
          if (void 0 !== rootIndex)
            for (
              i$jscomp$0 = 0;
              i$jscomp$0 < rootIndex.length && i$jscomp$0 < hookStack.length;
              i$jscomp$0++
            )
              if (
                rootIndex[i$jscomp$0].source !== hookStack[i$jscomp$0].source
              ) {
                i$jscomp$0 < hookStack.length - 1 &&
                  isReactWrapper(
                    hookStack[i$jscomp$0].functionName,
                    hook$jscomp$0.dispatcherHookName
                  ) &&
                  i$jscomp$0++;
                i$jscomp$0 < hookStack.length - 1 &&
                  isReactWrapper(
                    hookStack[i$jscomp$0].functionName,
                    hook$jscomp$0.dispatcherHookName
                  ) &&
                  i$jscomp$0++;
                hook$jscomp$0 = i$jscomp$0;
                break b;
              }
          hook$jscomp$0 = -1;
        }
        parseResult =
          -1 === rootStack ||
          -1 === hook$jscomp$0 ||
          2 > rootStack - hook$jscomp$0
            ? -1 === hook$jscomp$0
              ? [null, null]
              : [parseResult[hook$jscomp$0 - 1], null]
            : [
                parseResult[hook$jscomp$0 - 1],
                parseResult.slice(hook$jscomp$0, rootStack - 1)
              ];
        rootStack = parseResult[0];
        parseResult = parseResult[1];
        hook$jscomp$0 = hook.displayName;
        null === hook$jscomp$0 &&
          null !== rootStack &&
          (hook$jscomp$0 =
            parseHookName(rootStack.functionName) ||
            parseHookName(hook.dispatcherHookName));
        if (null !== parseResult) {
          rootStack = 0;
          if (null !== prevStack) {
            for (
              ;
              rootStack < parseResult.length &&
              rootStack < prevStack.length &&
              parseResult[parseResult.length - rootStack - 1].source ===
                prevStack[prevStack.length - rootStack - 1].source;

            )
              rootStack++;
            for (
              prevStack = prevStack.length - 1;
              prevStack > rootStack;
              prevStack--
            )
              levelChildren = stackOfChildren.pop();
          }
          for (
            prevStack = parseResult.length - rootStack - 1;
            1 <= prevStack;
            prevStack--
          )
            (rootStack = []),
              (hookStack = parseResult[prevStack]),
              (hookStack = {
                id: null,
                isStateEditable: !1,
                name: parseHookName(parseResult[prevStack - 1].functionName),
                value: void 0,
                subHooks: rootStack,
                debugInfo: null,
                hookSource: {
                  lineNumber: hookStack.lineNumber,
                  columnNumber: hookStack.columnNumber,
                  functionName: hookStack.functionName,
                  fileName: hookStack.fileName
                }
              }),
              levelChildren.push(hookStack),
              stackOfChildren.push(levelChildren),
              (levelChildren = rootStack);
          prevStack = parseResult;
        }
        rootStack = hook.primitive;
        hookStack = hook.debugInfo;
        hook = {
          id:
            "Context" === rootStack ||
            "Context (use)" === rootStack ||
            "DebugValue" === rootStack ||
            "Promise" === rootStack ||
            "Unresolved" === rootStack ||
            "HostTransitionStatus" === rootStack
              ? null
              : nativeHookID++,
          isStateEditable: "Reducer" === rootStack || "State" === rootStack,
          name: hook$jscomp$0 || rootStack,
          value: hook.value,
          subHooks: [],
          debugInfo: hookStack,
          hookSource: null
        };
        hook$jscomp$0 = {
          lineNumber: null,
          functionName: null,
          fileName: null,
          columnNumber: null
        };
        parseResult &&
          1 <= parseResult.length &&
          ((parseResult = parseResult[0]),
          (hook$jscomp$0.lineNumber = parseResult.lineNumber),
          (hook$jscomp$0.functionName = parseResult.functionName),
          (hook$jscomp$0.fileName = parseResult.fileName),
          (hook$jscomp$0.columnNumber = parseResult.columnNumber));
        hook.hookSource = hook$jscomp$0;
        levelChildren.push(hook);
      }
      processDebugValues(rootChildren, null);
      return rootChildren;
    }
    function processDebugValues(hooksTree, parentHooksNode) {
      for (var debugValueHooksNodes = [], i = 0; i < hooksTree.length; i++) {
        var hooksNode = hooksTree[i];
        "DebugValue" === hooksNode.name && 0 === hooksNode.subHooks.length
          ? (hooksTree.splice(i, 1), i--, debugValueHooksNodes.push(hooksNode))
          : processDebugValues(hooksNode.subHooks, hooksNode);
      }
      null !== parentHooksNode &&
        (1 === debugValueHooksNodes.length
          ? (parentHooksNode.value = debugValueHooksNodes[0].value)
          : 1 < debugValueHooksNodes.length &&
            (parentHooksNode.value = debugValueHooksNodes.map(function (_ref) {
              return _ref.value;
            })));
    }
    function handleRenderFunctionError(error) {
      if (error !== SuspenseException) {
        if (
          error instanceof Error &&
          "ReactDebugToolsUnsupportedHookError" === error.name
        )
          throw error;
        var wrapperError = Error("Error rendering inspected component", {
          cause: error
        });
        wrapperError.name = "ReactDebugToolsRenderError";
        wrapperError.cause = error;
        throw wrapperError;
      }
    }
    function inspectHooks(renderFunction, props, currentDispatcher) {
      null == currentDispatcher && (currentDispatcher = ReactSharedInternals);
      var previousDispatcher = currentDispatcher.H;
      currentDispatcher.H = DispatcherProxy;
      try {
        var ancestorStackError = Error();
        renderFunction(props);
      } catch (error) {
        handleRenderFunctionError(error);
      } finally {
        (renderFunction = hookLog),
          (hookLog = []),
          (currentDispatcher.H = previousDispatcher);
      }
      currentDispatcher = ErrorStackParser.parse(ancestorStackError);
      return buildTree(currentDispatcher, renderFunction);
    }
    function restoreContexts(contextMap) {
      contextMap.forEach(function (value, context) {
        return (context._currentValue = value);
      });
    }
    var ErrorStackParser = require("error-stack-parser"),
      React = require("react"),
      assign = Object.assign,
      ReactSharedInternals =
        React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
      REACT_CONTEXT_TYPE = Symbol.for("react.context"),
      REACT_MEMO_CACHE_SENTINEL = Symbol.for("react.memo_cache_sentinel"),
      hasOwnProperty = Object.prototype.hasOwnProperty,
      hookLog = [],
      primitiveStackCache = null,
      currentFiber = null,
      currentHook = null,
      currentContextDependency = null,
      SuspenseException = Error(
        "Suspense Exception: This is not a real error! It's an implementation detail of `use` to interrupt the current render. You must either rethrow it immediately, or move the `use` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary, or call the promise's `.catch` method and pass the result to `use`"
      ),
      Dispatcher = {
        use: function (usable) {
          if (null !== usable && "object" === typeof usable) {
            if ("function" === typeof usable.then) {
              switch (usable.status) {
                case "fulfilled":
                  var fulfilledValue = usable.value;
                  hookLog.push({
                    displayName: null,
                    primitive: "Promise",
                    stackError: Error(),
                    value: fulfilledValue,
                    debugInfo:
                      void 0 === usable._debugInfo ? null : usable._debugInfo,
                    dispatcherHookName: "Use"
                  });
                  return fulfilledValue;
                case "rejected":
                  throw usable.reason;
              }
              hookLog.push({
                displayName: null,
                primitive: "Unresolved",
                stackError: Error(),
                value: usable,
                debugInfo:
                  void 0 === usable._debugInfo ? null : usable._debugInfo,
                dispatcherHookName: "Use"
              });
              throw SuspenseException;
            }
            if (usable.$$typeof === REACT_CONTEXT_TYPE)
              return (
                (fulfilledValue = readContext(usable)),
                hookLog.push({
                  displayName: usable.displayName || "Context",
                  primitive: "Context (use)",
                  stackError: Error(),
                  value: fulfilledValue,
                  debugInfo: null,
                  dispatcherHookName: "Use"
                }),
                fulfilledValue
              );
          }
          throw Error(
            "An unsupported type was passed to use(): " + String(usable)
          );
        },
        readContext: readContext,
        useCacheRefresh: function () {
          var hook = nextHook();
          hookLog.push({
            displayName: null,
            primitive: "CacheRefresh",
            stackError: Error(),
            value: null !== hook ? hook.memoizedState : function () {},
            debugInfo: null,
            dispatcherHookName: "CacheRefresh"
          });
          return function () {};
        },
        useCallback: function (callback) {
          var hook = nextHook();
          hookLog.push({
            displayName: null,
            primitive: "Callback",
            stackError: Error(),
            value: null !== hook ? hook.memoizedState[0] : callback,
            debugInfo: null,
            dispatcherHookName: "Callback"
          });
          return callback;
        },
        useContext: function (context) {
          var value = readContext(context);
          hookLog.push({
            displayName: context.displayName || null,
            primitive: "Context",
            stackError: Error(),
            value: value,
            debugInfo: null,
            dispatcherHookName: "Context"
          });
          return value;
        },
        unstable_useContextWithBailout: function (context) {
          var value = readContext(context);
          hookLog.push({
            displayName: context.displayName || null,
            primitive: "ContextWithBailout",
            stackError: Error(),
            value: value,
            debugInfo: null,
            dispatcherHookName: "ContextWithBailout"
          });
          return value;
        },
        useEffect: function (create) {
          nextHook();
          hookLog.push({
            displayName: null,
            primitive: "Effect",
            stackError: Error(),
            value: create,
            debugInfo: null,
            dispatcherHookName: "Effect"
          });
        },
        useImperativeHandle: function (ref) {
          nextHook();
          var instance = void 0;
          null !== ref && "object" === typeof ref && (instance = ref.current);
          hookLog.push({
            displayName: null,
            primitive: "ImperativeHandle",
            stackError: Error(),
            value: instance,
            debugInfo: null,
            dispatcherHookName: "ImperativeHandle"
          });
        },
        useDebugValue: function (value, formatterFn) {
          hookLog.push({
            displayName: null,
            primitive: "DebugValue",
            stackError: Error(),
            value:
              "function" === typeof formatterFn ? formatterFn(value) : value,
            debugInfo: null,
            dispatcherHookName: "DebugValue"
          });
        },
        useLayoutEffect: function (create) {
          nextHook();
          hookLog.push({
            displayName: null,
            primitive: "LayoutEffect",
            stackError: Error(),
            value: create,
            debugInfo: null,
            dispatcherHookName: "LayoutEffect"
          });
        },
        useInsertionEffect: function (create) {
          nextHook();
          hookLog.push({
            displayName: null,
            primitive: "InsertionEffect",
            stackError: Error(),
            value: create,
            debugInfo: null,
            dispatcherHookName: "InsertionEffect"
          });
        },
        useMemo: function (nextCreate) {
          var hook = nextHook();
          nextCreate = null !== hook ? hook.memoizedState[0] : nextCreate();
          hookLog.push({
            displayName: null,
            primitive: "Memo",
            stackError: Error(),
            value: nextCreate,
            debugInfo: null,
            dispatcherHookName: "Memo"
          });
          return nextCreate;
        },
        useMemoCache: function (size) {
          var fiber = currentFiber;
          if (null == fiber) return [];
          fiber =
            null != fiber.updateQueue ? fiber.updateQueue.memoCache : null;
          if (null == fiber) return [];
          var data = fiber.data[fiber.index];
          if (void 0 === data) {
            data = fiber.data[fiber.index] = Array(size);
            for (var i = 0; i < size; i++) data[i] = REACT_MEMO_CACHE_SENTINEL;
          }
          fiber.index++;
          return data;
        },
        useOptimistic: function (passthrough) {
          var hook = nextHook();
          passthrough = null !== hook ? hook.memoizedState : passthrough;
          hookLog.push({
            displayName: null,
            primitive: "Optimistic",
            stackError: Error(),
            value: passthrough,
            debugInfo: null,
            dispatcherHookName: "Optimistic"
          });
          return [passthrough, function () {}];
        },
        useReducer: function (reducer, initialArg, init) {
          reducer = nextHook();
          initialArg =
            null !== reducer
              ? reducer.memoizedState
              : void 0 !== init
                ? init(initialArg)
                : initialArg;
          hookLog.push({
            displayName: null,
            primitive: "Reducer",
            stackError: Error(),
            value: initialArg,
            debugInfo: null,
            dispatcherHookName: "Reducer"
          });
          return [initialArg, function () {}];
        },
        useRef: function (initialValue) {
          var hook = nextHook();
          initialValue =
            null !== hook ? hook.memoizedState : { current: initialValue };
          hookLog.push({
            displayName: null,
            primitive: "Ref",
            stackError: Error(),
            value: initialValue.current,
            debugInfo: null,
            dispatcherHookName: "Ref"
          });
          return initialValue;
        },
        useState: function (initialState) {
          var hook = nextHook();
          initialState =
            null !== hook
              ? hook.memoizedState
              : "function" === typeof initialState
                ? initialState()
                : initialState;
          hookLog.push({
            displayName: null,
            primitive: "State",
            stackError: Error(),
            value: initialState,
            debugInfo: null,
            dispatcherHookName: "State"
          });
          return [initialState, function () {}];
        },
        useTransition: function () {
          var stateHook = nextHook();
          nextHook();
          stateHook = null !== stateHook ? stateHook.memoizedState : !1;
          hookLog.push({
            displayName: null,
            primitive: "Transition",
            stackError: Error(),
            value: stateHook,
            debugInfo: null,
            dispatcherHookName: "Transition"
          });
          return [stateHook, function () {}];
        },
        useSyncExternalStore: function (subscribe, getSnapshot) {
          nextHook();
          nextHook();
          subscribe = getSnapshot();
          hookLog.push({
            displayName: null,
            primitive: "SyncExternalStore",
            stackError: Error(),
            value: subscribe,
            debugInfo: null,
            dispatcherHookName: "SyncExternalStore"
          });
          return subscribe;
        },
        useDeferredValue: function (value) {
          var hook = nextHook();
          value = null !== hook ? hook.memoizedState : value;
          hookLog.push({
            displayName: null,
            primitive: "DeferredValue",
            stackError: Error(),
            value: value,
            debugInfo: null,
            dispatcherHookName: "DeferredValue"
          });
          return value;
        },
        useId: function () {
          var hook = nextHook();
          hook = null !== hook ? hook.memoizedState : "";
          hookLog.push({
            displayName: null,
            primitive: "Id",
            stackError: Error(),
            value: hook,
            debugInfo: null,
            dispatcherHookName: "Id"
          });
          return hook;
        },
        useFormState: function (action, initialState) {
          var hook = nextHook();
          nextHook();
          nextHook();
          action = Error();
          var debugInfo = null,
            error = null;
          if (null !== hook)
            if (
              ((initialState = hook.memoizedState),
              "object" === typeof initialState &&
                null !== initialState &&
                "function" === typeof initialState.then)
            )
              switch (initialState.status) {
                case "fulfilled":
                  var value = initialState.value;
                  debugInfo =
                    void 0 === initialState._debugInfo
                      ? null
                      : initialState._debugInfo;
                  break;
                case "rejected":
                  error = initialState.reason;
                  break;
                default:
                  (error = SuspenseException),
                    (debugInfo =
                      void 0 === initialState._debugInfo
                        ? null
                        : initialState._debugInfo),
                    (value = initialState);
              }
            else value = initialState;
          else value = initialState;
          hookLog.push({
            displayName: null,
            primitive: "FormState",
            stackError: action,
            value: value,
            debugInfo: debugInfo,
            dispatcherHookName: "FormState"
          });
          if (null !== error) throw error;
          return [value, function () {}, !1];
        },
        useActionState: function (action, initialState) {
          var hook = nextHook();
          nextHook();
          nextHook();
          action = Error();
          var debugInfo = null,
            error = null;
          if (null !== hook)
            if (
              ((initialState = hook.memoizedState),
              "object" === typeof initialState &&
                null !== initialState &&
                "function" === typeof initialState.then)
            )
              switch (initialState.status) {
                case "fulfilled":
                  var value = initialState.value;
                  debugInfo =
                    void 0 === initialState._debugInfo
                      ? null
                      : initialState._debugInfo;
                  break;
                case "rejected":
                  error = initialState.reason;
                  break;
                default:
                  (error = SuspenseException),
                    (debugInfo =
                      void 0 === initialState._debugInfo
                        ? null
                        : initialState._debugInfo),
                    (value = initialState);
              }
            else value = initialState;
          else value = initialState;
          hookLog.push({
            displayName: null,
            primitive: "ActionState",
            stackError: action,
            value: value,
            debugInfo: debugInfo,
            dispatcherHookName: "ActionState"
          });
          if (null !== error) throw error;
          return [value, function () {}, !1];
        },
        useHostTransitionStatus: function () {
          var status = readContext({ _currentValue: null });
          hookLog.push({
            displayName: null,
            primitive: "HostTransitionStatus",
            stackError: Error(),
            value: status,
            debugInfo: null,
            dispatcherHookName: "HostTransitionStatus"
          });
          return status;
        }
      };
    React = {
      get: function (target, prop) {
        if (target.hasOwnProperty(prop)) return target[prop];
        target = Error("Missing method in Dispatcher: " + prop);
        target.name = "ReactDebugToolsUnsupportedHookError";
        throw target;
      }
    };
    var DispatcherProxy =
        "undefined" === typeof Proxy
          ? Dispatcher
          : new Proxy(Dispatcher, React),
      mostLikelyAncestorIndex = 0;
    exports.inspectHooks = inspectHooks;
    exports.inspectHooksOfFiber = function (fiber, currentDispatcher) {
      null == currentDispatcher && (currentDispatcher = ReactSharedInternals);
      if (0 !== fiber.tag && 15 !== fiber.tag && 11 !== fiber.tag)
        throw Error(
          "Unknown Fiber. Needs to be a function component to inspect hooks."
        );
      getPrimitiveStackCache();
      currentHook = fiber.memoizedState;
      currentFiber = fiber;
      if (hasOwnProperty.call(currentFiber, "dependencies")) {
        var dependencies = currentFiber.dependencies;
        currentContextDependency =
          null !== dependencies ? dependencies.firstContext : null;
      } else if (hasOwnProperty.call(currentFiber, "dependencies_old"))
        (dependencies = currentFiber.dependencies_old),
          (currentContextDependency =
            null !== dependencies ? dependencies.firstContext : null);
      else if (hasOwnProperty.call(currentFiber, "dependencies_new"))
        (dependencies = currentFiber.dependencies_new),
          (currentContextDependency =
            null !== dependencies ? dependencies.firstContext : null);
      else if (hasOwnProperty.call(currentFiber, "contextDependencies"))
        (dependencies = currentFiber.contextDependencies),
          (currentContextDependency =
            null !== dependencies ? dependencies.first : null);
      else
        throw Error(
          "Unsupported React version. This is a bug in React Debug Tools."
        );
      dependencies = fiber.type;
      var props = fiber.memoizedProps;
      if (
        dependencies !== fiber.elementType &&
        dependencies &&
        dependencies.defaultProps
      ) {
        props = assign({}, props);
        var defaultProps = dependencies.defaultProps;
        for (propName in defaultProps)
          void 0 === props[propName] &&
            (props[propName] = defaultProps[propName]);
      }
      var propName = new Map();
      try {
        if (
          null !== currentContextDependency &&
          !hasOwnProperty.call(currentContextDependency, "memoizedValue")
        )
          for (defaultProps = fiber; defaultProps; ) {
            if (10 === defaultProps.tag) {
              var context = defaultProps.type;
              void 0 !== context._context && (context = context._context);
              propName.has(context) ||
                (propName.set(context, context._currentValue),
                (context._currentValue = defaultProps.memoizedProps.value));
            }
            defaultProps = defaultProps.return;
          }
        if (11 === fiber.tag) {
          var renderFunction = dependencies.render;
          context = props;
          var ref = fiber.ref;
          fiber = currentDispatcher;
          var previousDispatcher = fiber.H;
          fiber.H = DispatcherProxy;
          try {
            var ancestorStackError = Error();
            renderFunction(context, ref);
          } catch (error) {
            handleRenderFunctionError(error);
          } finally {
            var readHookLog = hookLog;
            hookLog = [];
            fiber.H = previousDispatcher;
          }
          var rootStack = ErrorStackParser.parse(ancestorStackError);
          return buildTree(rootStack, readHookLog);
        }
        return inspectHooks(dependencies, props, currentDispatcher);
      } finally {
        (currentContextDependency = currentHook = currentFiber = null),
          restoreContexts(propName);
      }
    };
  })();
