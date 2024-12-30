/**
 * @license React
 * react-noop-renderer-persistent.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

"use strict";
"production" !== process.env.NODE_ENV &&
  (function () {
    function testStringCoercion(value) {
      return "" + value;
    }
    function checkPropStringCoercion(value, propName) {
      try {
        testStringCoercion(value);
        var JSCompiler_inline_result = !1;
      } catch (e) {
        JSCompiler_inline_result = !0;
      }
      if (JSCompiler_inline_result) {
        JSCompiler_inline_result = console;
        var JSCompiler_temp_const = JSCompiler_inline_result.error;
        var JSCompiler_inline_result$jscomp$0 =
          ("function" === typeof Symbol &&
            Symbol.toStringTag &&
            value[Symbol.toStringTag]) ||
          value.constructor.name ||
          "Object";
        JSCompiler_temp_const.call(
          JSCompiler_inline_result,
          "The provided `%s` prop is an unsupported type %s. This value must be coerced to a string before using it here.",
          propName,
          JSCompiler_inline_result$jscomp$0
        );
        return testStringCoercion(value);
      }
    }
    var ReactFiberReconciler = require("react-reconciler"),
      Scheduler = require("scheduler/unstable_mock"),
      constants = require("react-reconciler/constants"),
      React = require("react"),
      assign = Object.assign,
      REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
      REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"),
      isArrayImpl = Array.isArray,
      ReactSharedInternals =
        React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
      NO_CONTEXT = {},
      UPPERCASE_CONTEXT = {};
    Object.freeze(NO_CONTEXT);
    ReactFiberReconciler = (function (reconciler, useMutation) {
      function appendChildToContainerOrInstance(parentInstance, child) {
        var prevParent = child.parent;
        if (-1 !== prevParent && prevParent !== parentInstance.id)
          throw Error("Reparenting is not allowed");
        child.parent = parentInstance.id;
        prevParent = parentInstance.children.indexOf(child);
        -1 !== prevParent && parentInstance.children.splice(prevParent, 1);
        parentInstance.children.push(child);
      }
      function appendChildToContainer(parentInstance, child) {
        if ("string" !== typeof parentInstance.rootID)
          throw Error(
            "appendChildToContainer() first argument is not a container."
          );
        appendChildToContainerOrInstance(parentInstance, child);
      }
      function appendChild(parentInstance, child) {
        if ("string" === typeof parentInstance.rootID)
          throw Error("appendChild() first argument is not an instance.");
        appendChildToContainerOrInstance(parentInstance, child);
      }
      function insertInContainerOrInstanceBefore(
        parentInstance,
        child,
        beforeChild
      ) {
        var index = parentInstance.children.indexOf(child);
        -1 !== index && parentInstance.children.splice(index, 1);
        beforeChild = parentInstance.children.indexOf(beforeChild);
        if (-1 === beforeChild) throw Error("This child does not exist.");
        parentInstance.children.splice(beforeChild, 0, child);
      }
      function insertInContainerBefore(parentInstance, child, beforeChild) {
        if ("string" !== typeof parentInstance.rootID)
          throw Error(
            "insertInContainerBefore() first argument is not a container."
          );
        insertInContainerOrInstanceBefore(parentInstance, child, beforeChild);
      }
      function insertBefore(parentInstance, child, beforeChild) {
        if ("string" === typeof parentInstance.rootID)
          throw Error("insertBefore() first argument is not an instance.");
        insertInContainerOrInstanceBefore(parentInstance, child, beforeChild);
      }
      function clearContainer(container) {
        container.children.splice(0);
      }
      function removeChildFromContainerOrInstance(parentInstance, child) {
        child = parentInstance.children.indexOf(child);
        if (-1 === child) throw Error("This child does not exist.");
        parentInstance.children.splice(child, 1);
      }
      function removeChildFromContainer(parentInstance, child) {
        if ("string" !== typeof parentInstance.rootID)
          throw Error(
            "removeChildFromContainer() first argument is not a container."
          );
        removeChildFromContainerOrInstance(parentInstance, child);
      }
      function removeChild(parentInstance, child) {
        if ("string" === typeof parentInstance.rootID)
          throw Error("removeChild() first argument is not an instance.");
        removeChildFromContainerOrInstance(parentInstance, child);
      }
      function cloneInstance(
        instance,
        type,
        oldProps,
        newProps,
        keepChildren,
        children
      ) {
        checkPropStringCoercion(newProps.children, "children");
        instance = {
          id: instance.id,
          type: type,
          parent: instance.parent,
          children: keepChildren
            ? instance.children
            : null != children
              ? children
              : [],
          text: shouldSetTextContent(type, newProps)
            ? computeText(newProps.children + "", instance.context)
            : null,
          prop: newProps.prop,
          hidden: !!newProps.hidden,
          context: instance.context
        };
        "suspensey-thing" === type &&
          "string" === typeof newProps.src &&
          (instance.src = newProps.src);
        Object.defineProperty(instance, "id", {
          value: instance.id,
          enumerable: !1
        });
        Object.defineProperty(instance, "parent", {
          value: instance.parent,
          enumerable: !1
        });
        Object.defineProperty(instance, "text", {
          value: instance.text,
          enumerable: !1
        });
        Object.defineProperty(instance, "context", {
          value: instance.context,
          enumerable: !1
        });
        hostCloneCounter++;
        return instance;
      }
      function shouldSetTextContent(type, props) {
        if ("errorInBeginPhase" === type) throw Error("Error in host config.");
        return (
          "string" === typeof props.children ||
          "number" === typeof props.children ||
          "bigint" === typeof props.children
        );
      }
      function computeText(rawText, hostContext) {
        return hostContext === UPPERCASE_CONTEXT
          ? rawText.toUpperCase()
          : rawText;
      }
      function createJSXElementForTestComparison(type, props) {
        type = {
          type: type,
          $$typeof: REACT_ELEMENT_TYPE,
          key: null,
          props: props,
          _owner: null,
          _store: {}
        };
        Object.defineProperty(type, "ref", { enumerable: !1, value: null });
        return type;
      }
      function childToJSX(child, text) {
        if (null !== text) return text;
        if (null === child) return null;
        if ("string" === typeof child) return child;
        if (isArrayImpl(child)) {
          if (0 === child.length) return null;
          if (1 === child.length) return childToJSX(child[0], null);
          child = child.map(function (c) {
            return childToJSX(c, null);
          });
          return child.every(function (c) {
            return (
              "string" === typeof c ||
              "number" === typeof c ||
              "bigint" === typeof c
            );
          })
            ? child.join("")
            : child;
        }
        if (isArrayImpl(child.children)) {
          text = childToJSX(child.children, child.text);
          var props = { prop: child.prop };
          child.hidden && (props.hidden = !0);
          child.src && (props.src = child.src);
          null !== text && (props.children = text);
          return createJSXElementForTestComparison(child.type, props);
        }
        return child.hidden ? "" : child.text;
      }
      function getChildrenAsJSX(root) {
        root = childToJSX(root ? root.children : null, null);
        return null === root
          ? null
          : isArrayImpl(root)
            ? createJSXElementForTestComparison(REACT_FRAGMENT_TYPE, {
                children: root
              })
            : root;
      }
      function onRecoverableError() {}
      var instanceCounter = 0,
        hostUpdateCounter = 0,
        hostCloneCounter = 0,
        suspenseyThingCache = null,
        suspenseyCommitSubscription = null,
        sharedHostConfig = {
          rendererVersion: "19.0.0-experimental-ed15d500-20241110",
          rendererPackageName: "react-noop",
          supportsSingletons: !1,
          getRootHostContext: function () {
            return NO_CONTEXT;
          },
          getChildHostContext: function (parentHostContext, type) {
            return "offscreen" === type
              ? parentHostContext
              : "uppercase" === type
                ? UPPERCASE_CONTEXT
                : NO_CONTEXT;
          },
          getPublicInstance: function (instance) {
            return instance;
          },
          createInstance: function (
            type,
            props,
            rootContainerInstance,
            hostContext,
            internalInstanceHandle
          ) {
            if ("errorInCompletePhase" === type)
              throw Error("Error in host config.");
            shouldSetTextContent(type, props) &&
              checkPropStringCoercion(props.children, "children");
            rootContainerInstance = {
              id: instanceCounter++,
              type: type,
              children: [],
              parent: -1,
              text: shouldSetTextContent(type, props)
                ? computeText(props.children + "", hostContext)
                : null,
              prop: props.prop,
              hidden: !!props.hidden,
              context: hostContext
            };
            "suspensey-thing" === type &&
              "string" === typeof props.src &&
              (rootContainerInstance.src = props.src);
            Object.defineProperty(rootContainerInstance, "id", {
              value: rootContainerInstance.id,
              enumerable: !1
            });
            Object.defineProperty(rootContainerInstance, "parent", {
              value: rootContainerInstance.parent,
              enumerable: !1
            });
            Object.defineProperty(rootContainerInstance, "text", {
              value: rootContainerInstance.text,
              enumerable: !1
            });
            Object.defineProperty(rootContainerInstance, "context", {
              value: rootContainerInstance.context,
              enumerable: !1
            });
            Object.defineProperty(rootContainerInstance, "fiber", {
              value: internalInstanceHandle,
              enumerable: !1
            });
            return rootContainerInstance;
          },
          appendInitialChild: function (parentInstance, child) {
            var prevParent = child.parent;
            if (-1 !== prevParent && prevParent !== parentInstance.id)
              throw Error("Reparenting is not allowed");
            child.parent = parentInstance.id;
            parentInstance.children.push(child);
          },
          finalizeInitialChildren: function () {
            return !1;
          },
          shouldSetTextContent: shouldSetTextContent,
          createTextInstance: function (
            text,
            rootContainerInstance,
            hostContext
          ) {
            hostContext === UPPERCASE_CONTEXT && (text = text.toUpperCase());
            text = {
              text: text,
              id: instanceCounter++,
              parent: -1,
              hidden: !1,
              context: hostContext
            };
            Object.defineProperty(text, "id", {
              value: text.id,
              enumerable: !1
            });
            Object.defineProperty(text, "parent", {
              value: text.parent,
              enumerable: !1
            });
            Object.defineProperty(text, "context", {
              value: text.context,
              enumerable: !1
            });
            return text;
          },
          scheduleTimeout: setTimeout,
          cancelTimeout: clearTimeout,
          noTimeout: -1,
          supportsMicrotasks: !0,
          scheduleMicrotask:
            "function" === typeof queueMicrotask
              ? queueMicrotask
              : "undefined" !== typeof Promise
                ? function (callback) {
                    return Promise.resolve(null)
                      .then(callback)
                      .catch(function (error) {
                        setTimeout(function () {
                          throw error;
                        });
                      });
                  }
                : setTimeout,
          prepareForCommit: function () {
            return null;
          },
          resetAfterCommit: function () {},
          setCurrentUpdatePriority: function (newPriority) {
            currentUpdatePriority = newPriority;
          },
          getCurrentUpdatePriority: function () {
            return currentUpdatePriority;
          },
          resolveUpdatePriority: function () {
            return currentUpdatePriority !== constants.NoEventPriority
              ? currentUpdatePriority
              : currentEventPriority;
          },
          resolveEventType: function () {
            return null;
          },
          resolveEventTimeStamp: function () {
            return -1.1;
          },
          shouldAttemptEagerTransition: function () {
            return !1;
          },
          now: Scheduler.unstable_now,
          isPrimaryRenderer: !0,
          warnsIfNotActing: !0,
          supportsHydration: !1,
          getInstanceFromNode: function () {
            throw Error("Not yet implemented.");
          },
          beforeActiveInstanceBlur: function () {},
          afterActiveInstanceBlur: function () {},
          preparePortalMount: function () {},
          prepareScopeUpdate: function () {},
          getInstanceFromScope: function () {
            throw Error("Not yet implemented.");
          },
          detachDeletedInstance: function () {},
          logRecoverableError: function () {},
          requestPostPaintCallback: function (callback) {
            var endTime = Scheduler.unstable_now();
            callback(endTime);
          },
          maySuspendCommit: function (type, props) {
            return "suspensey-thing" === type && "string" === typeof props.src;
          },
          mayResourceSuspendCommit: function () {
            throw Error(
              "Resources are not implemented for React Noop yet. This method should not be called"
            );
          },
          preloadInstance: function (type, props) {
            if ("suspensey-thing" !== type || "string" !== typeof props.src)
              throw Error("Attempted to preload unexpected instance: " + type);
            null === suspenseyThingCache && (suspenseyThingCache = new Map());
            type = suspenseyThingCache.get(props.src);
            return void 0 === type
              ? (suspenseyThingCache.set(props.src, {
                  status: "pending",
                  subscriptions: null
                }),
                (props = props.onLoadStart),
                "function" === typeof props && props(),
                !1)
              : "fulfilled" === type.status;
          },
          preloadResource: function () {
            throw Error(
              "Resources are not implemented for React Noop yet. This method should not be called"
            );
          },
          startSuspendingCommit: function () {
            suspenseyCommitSubscription = null;
          },
          suspendInstance: function (type, props) {
            props = props.src;
            if ("suspensey-thing" === type && "string" === typeof props) {
              type = suspenseyThingCache.get(props);
              if (void 0 === type)
                throw Error("Could not find record for key.");
              "fulfilled" !== type.status &&
                "pending" === type.status &&
                (null === suspenseyCommitSubscription
                  ? (suspenseyCommitSubscription = {
                      pendingCount: 1,
                      commit: null
                    })
                  : suspenseyCommitSubscription.pendingCount++,
                null === type.subscriptions && (type.subscriptions = []),
                type.subscriptions.push(suspenseyCommitSubscription));
            } else
              throw Error(
                "Did not expect this host component to be visited when suspending the commit. Did you check the SuspendCommit flag?"
              );
          },
          suspendResource: function () {
            throw Error(
              "Resources are not implemented for React Noop yet. This method should not be called"
            );
          },
          waitForCommitToBeReady: function () {
            var subscription = suspenseyCommitSubscription;
            return null !== subscription
              ? ((suspenseyCommitSubscription = null),
                function (commit) {
                  subscription.commit = commit;
                  return function () {
                    subscription.commit = null;
                  };
                })
              : null;
          },
          NotPendingTransition: null,
          resetFormInstance: function () {},
          bindToConsole: function (methodName, args) {
            return Function.prototype.bind.apply(
              console[methodName],
              [console].concat(args)
            );
          }
        };
      sharedHostConfig = useMutation
        ? assign({}, sharedHostConfig, {
            supportsMutation: !0,
            supportsPersistence: !1,
            commitMount: function () {},
            commitUpdate: function (instance, type, oldProps, newProps) {
              if (null === oldProps) throw Error("Should have old props");
              hostUpdateCounter++;
              instance.prop = newProps.prop;
              instance.hidden = !!newProps.hidden;
              "suspensey-thing" === type &&
                "string" === typeof newProps.src &&
                (instance.src = newProps.src);
              shouldSetTextContent(type, newProps) &&
                (checkPropStringCoercion(newProps.children, "children"),
                (instance.text = computeText(
                  newProps.children + "",
                  instance.context
                )));
            },
            commitTextUpdate: function (textInstance, oldText, newText) {
              hostUpdateCounter++;
              textInstance.text = computeText(newText, textInstance.context);
            },
            appendChild: appendChild,
            appendChildToContainer: appendChildToContainer,
            insertBefore: insertBefore,
            insertInContainerBefore: insertInContainerBefore,
            removeChild: removeChild,
            removeChildFromContainer: removeChildFromContainer,
            clearContainer: clearContainer,
            hideInstance: function (instance) {
              instance.hidden = !0;
            },
            hideTextInstance: function (textInstance) {
              textInstance.hidden = !0;
            },
            unhideInstance: function (instance, props) {
              props.hidden || (instance.hidden = !1);
            },
            unhideTextInstance: function (textInstance) {
              textInstance.hidden = !1;
            },
            resetTextContent: function (instance) {
              instance.text = null;
            }
          })
        : assign({}, sharedHostConfig, {
            supportsMutation: !1,
            supportsPersistence: !0,
            cloneInstance: cloneInstance,
            clearContainer: clearContainer,
            createContainerChildSet: function () {
              return [];
            },
            appendChildToContainerChildSet: function (childSet, child) {
              childSet.push(child);
            },
            finalizeContainerChildren: function (container, newChildren) {
              container.pendingChildren = newChildren;
              if (
                1 === newChildren.length &&
                "Error when completing root" === newChildren[0].text
              )
                throw Error("Error when completing root");
            },
            replaceContainerChildren: function (container, newChildren) {
              container.children = newChildren;
            },
            cloneHiddenInstance: function (instance, type, props) {
              instance = cloneInstance(instance, type, props, props, !0, null);
              instance.hidden = !0;
              return instance;
            },
            cloneHiddenTextInstance: function (instance) {
              instance = {
                text: instance.text,
                id: instance.id,
                parent: instance.parent,
                hidden: !0,
                context: instance.context
              };
              Object.defineProperty(instance, "id", {
                value: instance.id,
                enumerable: !1
              });
              Object.defineProperty(instance, "parent", {
                value: instance.parent,
                enumerable: !1
              });
              Object.defineProperty(instance, "context", {
                value: instance.context,
                enumerable: !1
              });
              return instance;
            }
          });
      var NoopRenderer = reconciler(sharedHostConfig),
        rootContainers = new Map(),
        roots = new Map(),
        currentUpdatePriority = constants.NoEventPriority,
        currentEventPriority = constants.DefaultEventPriority,
        idCounter = 0,
        ReactNoop = {
          _Scheduler: Scheduler,
          getChildren: function () {
            throw Error(
              "No longer supported due to bad performance when used with `expect()`. Use `ReactNoop.getChildrenAsJSX()` instead or, if you really need to, `dangerouslyGetChildren` after you carefully considered the warning in its JSDOC."
            );
          },
          getPendingChildren: function () {
            throw Error(
              "No longer supported due to bad performance when used with `expect()`. Use `ReactNoop.getPendingChildrenAsJSX()` instead or, if you really need to, `dangerouslyGetPendingChildren` after you carefully considered the warning in its JSDOC."
            );
          },
          dangerouslyGetChildren: function () {
            var container = rootContainers.get(
              0 < arguments.length && void 0 !== arguments[0]
                ? arguments[0]
                : "<default>"
            );
            return container ? container.children : null;
          },
          dangerouslyGetPendingChildren: function () {
            var container = rootContainers.get(
              0 < arguments.length && void 0 !== arguments[0]
                ? arguments[0]
                : "<default>"
            );
            container = container ? container.children : null;
            return container;
          },
          getOrCreateRootContainer: function () {
            var rootID =
                0 < arguments.length && void 0 !== arguments[0]
                  ? arguments[0]
                  : "<default>",
              tag = 1 < arguments.length ? arguments[1] : void 0,
              root = roots.get(rootID);
            root ||
              ((root = { rootID: rootID, pendingChildren: [], children: [] }),
              rootContainers.set(rootID, root),
              (root = NoopRenderer.createContainer(
                root,
                tag,
                null,
                null,
                !1,
                "",
                NoopRenderer.defaultOnUncaughtError,
                NoopRenderer.defaultOnCaughtError,
                onRecoverableError,
                null
              )),
              roots.set(rootID, root));
            return root.current.stateNode.containerInfo;
          },
          createRoot: function (options) {
            var container = {
                rootID: "" + idCounter++,
                pendingChildren: [],
                children: []
              },
              fiberRoot = NoopRenderer.createContainer(
                container,
                constants.ConcurrentRoot,
                null,
                null,
                !1,
                "",
                options && options.onUncaughtError
                  ? options.onUncaughtError
                  : NoopRenderer.defaultOnUncaughtError,
                options && options.onCaughtError
                  ? options.onCaughtError
                  : NoopRenderer.defaultOnCaughtError,
                onRecoverableError,
                options && options.unstable_transitionCallbacks
                  ? options.unstable_transitionCallbacks
                  : null
              );
            return {
              _Scheduler: Scheduler,
              render: function (children) {
                NoopRenderer.updateContainer(children, fiberRoot, null, null);
              },
              getChildren: function () {
                return container ? container.children : null;
              },
              getChildrenAsJSX: function () {
                return getChildrenAsJSX(container);
              }
            };
          },
          createLegacyRoot: function () {
            throw Error("createLegacyRoot: Unsupported Legacy Mode API.");
          },
          getChildrenAsJSX: function () {
            var container = rootContainers.get(
              0 < arguments.length && void 0 !== arguments[0]
                ? arguments[0]
                : "<default>"
            );
            return getChildrenAsJSX(container);
          },
          getPendingChildrenAsJSX: function () {
            var container = rootContainers.get(
              0 < arguments.length && void 0 !== arguments[0]
                ? arguments[0]
                : "<default>"
            );
            container = childToJSX(container ? container.children : null, null);
            container =
              null === container
                ? null
                : isArrayImpl(container)
                  ? createJSXElementForTestComparison(REACT_FRAGMENT_TYPE, {
                      children: container
                    })
                  : container;
            return container;
          },
          getSuspenseyThingStatus: function (src) {
            if (null === suspenseyThingCache) return null;
            src = suspenseyThingCache.get(src);
            return void 0 === src ? null : src.status;
          },
          resolveSuspenseyThing: function (key) {
            null === suspenseyThingCache && (suspenseyThingCache = new Map());
            var record = suspenseyThingCache.get(key);
            if (void 0 === record)
              suspenseyThingCache.set(key, {
                status: "fulfilled",
                subscriptions: null
              });
            else if (
              "pending" === record.status &&
              ((record.status = "fulfilled"),
              (key = record.subscriptions),
              null !== key)
            )
              for (
                record.subscriptions = null, record = 0;
                record < key.length;
                record++
              ) {
                var subscription = key[record];
                subscription.pendingCount--;
                if (0 === subscription.pendingCount) {
                  var commit = subscription.commit;
                  subscription.commit = null;
                  commit();
                }
              }
          },
          resetSuspenseyThingCache: function () {
            suspenseyThingCache = null;
          },
          createPortal: function (children, container) {
            return NoopRenderer.createPortal(
              children,
              container,
              null,
              2 < arguments.length && void 0 !== arguments[2]
                ? arguments[2]
                : null
            );
          },
          render: function (element, callback) {
            ReactNoop.renderToRootWithID(element, "<default>", callback);
          },
          renderLegacySyncRoot: function () {
            throw Error("createLegacyRoot: Unsupported Legacy Mode API.");
          },
          renderToRootWithID: function (element, rootID, callback) {
            rootID = ReactNoop.getOrCreateRootContainer(
              rootID,
              constants.ConcurrentRoot
            );
            rootID = roots.get(rootID.rootID);
            NoopRenderer.updateContainer(element, rootID, null, callback);
          },
          unmountRootWithID: function (rootID) {
            var root = roots.get(rootID);
            root &&
              NoopRenderer.updateContainer(null, root, null, function () {
                roots.delete(rootID);
                rootContainers.delete(rootID);
              });
          },
          findInstance: function (componentOrElement) {
            return null == componentOrElement
              ? null
              : "number" === typeof componentOrElement.id
                ? componentOrElement
                : NoopRenderer.findHostInstanceWithWarning(
                    componentOrElement,
                    "findInstance"
                  );
          },
          flushNextYield: function () {
            Scheduler.unstable_flushNumberOfYields(1);
            return Scheduler.unstable_clearLog();
          },
          startTrackingHostCounters: function () {
            hostCloneCounter = hostUpdateCounter = 0;
          },
          stopTrackingHostCounters: function () {
            var result = useMutation
              ? { hostUpdateCounter: hostUpdateCounter }
              : { hostCloneCounter: hostCloneCounter };
            hostCloneCounter = hostUpdateCounter = 0;
            return result;
          },
          expire: Scheduler.unstable_advanceTime,
          flushExpired: function () {
            return Scheduler.unstable_flushExpired();
          },
          unstable_runWithPriority: function (priority, fn) {
            var previousPriority = currentUpdatePriority;
            try {
              return (currentUpdatePriority = priority), fn();
            } finally {
              currentUpdatePriority = previousPriority;
            }
          },
          batchedUpdates: NoopRenderer.batchedUpdates,
          deferredUpdates: NoopRenderer.deferredUpdates,
          discreteUpdates: NoopRenderer.discreteUpdates,
          idleUpdates: function (fn) {
            var prevEventPriority = currentEventPriority;
            currentEventPriority = constants.IdleEventPriority;
            try {
              fn();
            } finally {
              currentEventPriority = prevEventPriority;
            }
          },
          flushSync: function (fn) {
            NoopRenderer.isAlreadyRendering() &&
              console.error(
                "flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."
              );
            var previousTransition = ReactSharedInternals.T,
              preivousEventPriority = currentEventPriority;
            try {
              if (
                ((ReactSharedInternals.T = null),
                (currentEventPriority = constants.DiscreteEventPriority),
                fn)
              )
                return fn();
            } finally {
              (ReactSharedInternals.T = previousTransition),
                (currentEventPriority = preivousEventPriority),
                NoopRenderer.flushSyncWork();
            }
          },
          flushPassiveEffects: NoopRenderer.flushPassiveEffects,
          dumpTree: function () {
            function log() {
              for (
                var _len = arguments.length, args = Array(_len), _key = 0;
                _key < _len;
                _key++
              )
                args[_key] = arguments[_key];
              bufferedLog.push.apply(bufferedLog, args.concat(["\n"]));
            }
            function logHostInstances(children, depth) {
              for (var i = 0; i < children.length; i++) {
                var child = children[i],
                  indent = "  ".repeat(depth);
                "string" === typeof child.text
                  ? log(indent + "- " + child.text)
                  : (log(indent + "- " + child.type + "#" + child.id),
                    logHostInstances(child.children, depth + 1));
              }
            }
            function logFiber(fiber, depth) {
              log(
                "  ".repeat(depth) +
                  "- " +
                  (fiber.type
                    ? fiber.type.name || fiber.type.toString()
                    : "[root]"),
                "[" +
                  fiber.childExpirationTime +
                  (fiber.pendingProps ? "*" : "") +
                  "]"
              );
              if (fiber.updateQueue) {
                var updateQueue = fiber.updateQueue;
                log("  ".repeat(depth + 1) + "QUEUED UPDATES");
                var update = updateQueue.firstBaseUpdate;
                if (null !== update) {
                  do
                    log(
                      "  ".repeat(depth + 1) + "~",
                      "[" + update.expirationTime + "]"
                    );
                  while (null !== update);
                }
                updateQueue = updateQueue.shared.pending;
                if (
                  null !== updateQueue &&
                  ((updateQueue = updateQueue.next), null !== updateQueue)
                ) {
                  do
                    log(
                      "  ".repeat(depth + 1) + "~",
                      "[" + updateQueue.expirationTime + "]"
                    );
                  while (null !== updateQueue && updateQueue !== updateQueue);
                }
              }
              fiber.child && logFiber(fiber.child, depth + 1);
              fiber.sibling && logFiber(fiber.sibling, depth);
            }
            var _console,
              rootID =
                0 < arguments.length && void 0 !== arguments[0]
                  ? arguments[0]
                  : "<default>",
              root = roots.get(rootID);
            rootID = rootContainers.get(rootID);
            if (root && rootID) {
              var bufferedLog = [];
              log("HOST INSTANCES:");
              (function (container, depth) {
                log("  ".repeat(depth) + "- [root#" + container.rootID + "]");
                logHostInstances(container.children, depth + 1);
              })(rootID, 0);
              log("FIBERS:");
              logFiber(root.current, 0);
              (_console = console).log.apply(_console, bufferedLog);
            } else console.log("Nothing rendered yet.");
          },
          getRoot: function () {
            return roots.get(
              0 < arguments.length && void 0 !== arguments[0]
                ? arguments[0]
                : "<default>"
            );
          }
        };
      return ReactNoop;
    })(ReactFiberReconciler.default, !1);
    React = ReactFiberReconciler.getChildren;
    var dangerouslyGetChildren = ReactFiberReconciler.dangerouslyGetChildren,
      getPendingChildren = ReactFiberReconciler.getPendingChildren,
      dangerouslyGetPendingChildren =
        ReactFiberReconciler.dangerouslyGetPendingChildren,
      getOrCreateRootContainer = ReactFiberReconciler.getOrCreateRootContainer,
      createRoot = ReactFiberReconciler.createRoot,
      createLegacyRoot = ReactFiberReconciler.createLegacyRoot,
      getChildrenAsJSX = ReactFiberReconciler.getChildrenAsJSX,
      getPendingChildrenAsJSX = ReactFiberReconciler.getPendingChildrenAsJSX,
      getSuspenseyThingStatus = ReactFiberReconciler.getSuspenseyThingStatus,
      resolveSuspenseyThing = ReactFiberReconciler.resolveSuspenseyThing,
      resetSuspenseyThingCache = ReactFiberReconciler.resetSuspenseyThingCache,
      createPortal = ReactFiberReconciler.createPortal,
      render = ReactFiberReconciler.render,
      renderLegacySyncRoot = ReactFiberReconciler.renderLegacySyncRoot,
      renderToRootWithID = ReactFiberReconciler.renderToRootWithID,
      unmountRootWithID = ReactFiberReconciler.unmountRootWithID,
      findInstance = ReactFiberReconciler.findInstance,
      flushNextYield = ReactFiberReconciler.flushNextYield,
      startTrackingHostCounters =
        ReactFiberReconciler.startTrackingHostCounters,
      stopTrackingHostCounters = ReactFiberReconciler.stopTrackingHostCounters,
      expire = ReactFiberReconciler.expire,
      flushExpired = ReactFiberReconciler.flushExpired,
      batchedUpdates = ReactFiberReconciler.batchedUpdates,
      deferredUpdates = ReactFiberReconciler.deferredUpdates,
      discreteUpdates = ReactFiberReconciler.discreteUpdates,
      idleUpdates = ReactFiberReconciler.idleUpdates,
      flushDiscreteUpdates = ReactFiberReconciler.flushDiscreteUpdates,
      flushSync = ReactFiberReconciler.flushSync,
      flushPassiveEffects = ReactFiberReconciler.flushPassiveEffects,
      act = ReactFiberReconciler.act,
      dumpTree = ReactFiberReconciler.dumpTree,
      getRoot = ReactFiberReconciler.getRoot,
      unstable_runWithPriority = ReactFiberReconciler.unstable_runWithPriority;
    exports._Scheduler = ReactFiberReconciler._Scheduler;
    exports.act = act;
    exports.batchedUpdates = batchedUpdates;
    exports.createLegacyRoot = createLegacyRoot;
    exports.createPortal = createPortal;
    exports.createRoot = createRoot;
    exports.dangerouslyGetChildren = dangerouslyGetChildren;
    exports.dangerouslyGetPendingChildren = dangerouslyGetPendingChildren;
    exports.deferredUpdates = deferredUpdates;
    exports.discreteUpdates = discreteUpdates;
    exports.dumpTree = dumpTree;
    exports.expire = expire;
    exports.findInstance = findInstance;
    exports.flushDiscreteUpdates = flushDiscreteUpdates;
    exports.flushExpired = flushExpired;
    exports.flushNextYield = flushNextYield;
    exports.flushPassiveEffects = flushPassiveEffects;
    exports.flushSync = flushSync;
    exports.getChildren = React;
    exports.getChildrenAsJSX = getChildrenAsJSX;
    exports.getOrCreateRootContainer = getOrCreateRootContainer;
    exports.getPendingChildren = getPendingChildren;
    exports.getPendingChildrenAsJSX = getPendingChildrenAsJSX;
    exports.getRoot = getRoot;
    exports.getSuspenseyThingStatus = getSuspenseyThingStatus;
    exports.idleUpdates = idleUpdates;
    exports.render = render;
    exports.renderLegacySyncRoot = renderLegacySyncRoot;
    exports.renderToRootWithID = renderToRootWithID;
    exports.resetSuspenseyThingCache = resetSuspenseyThingCache;
    exports.resolveSuspenseyThing = resolveSuspenseyThing;
    exports.startTrackingHostCounters = startTrackingHostCounters;
    exports.stopTrackingHostCounters = stopTrackingHostCounters;
    exports.unmountRootWithID = unmountRootWithID;
    exports.unstable_runWithPriority = unstable_runWithPriority;
  })();
