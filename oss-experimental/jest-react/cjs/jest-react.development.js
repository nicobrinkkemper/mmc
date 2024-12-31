/**
 * @license React
 * jest-react.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

"use strict";
"production" !== process.env.NODE_ENV &&
  (function () {
    function captureAssertion(fn) {
      try {
        fn();
      } catch (error) {
        return {
          pass: !1,
          message: function () {
            return error.message;
          }
        };
      }
      return { pass: !0 };
    }
    function assertYieldsWereCleared(root) {
      if (0 !== root._Scheduler.unstable_clearLog().length)
        throw (
          ((root = Error(
            "Log of yielded values is not empty. Call expect(ReactTestRenderer).unstable_toHaveYielded(...) first."
          )),
          Error.captureStackTrace(root, assertYieldsWereCleared),
          root)
        );
      assertConsoleLogsCleared();
    }
    function createJSXElementForTestComparison(type, props) {
      type = {
        $$typeof: REACT_ELEMENT_TYPE,
        type: type,
        key: null,
        props: props,
        _owner: null,
        _store: {}
      };
      Object.defineProperty(type, "ref", { enumerable: !1, value: null });
      return type;
    }
    function jsonChildToJSXChild(jsonChild) {
      if (null === jsonChild || "string" === typeof jsonChild) return jsonChild;
      var jsxChildren = jsonChildrenToJSXChildren(jsonChild.children);
      return createJSXElementForTestComparison(
        jsonChild.type,
        null === jsxChildren
          ? jsonChild.props
          : assign({}, jsonChild.props, { children: jsxChildren })
      );
    }
    function jsonChildrenToJSXChildren(jsonChildren) {
      if (null !== jsonChildren) {
        if (1 === jsonChildren.length)
          return jsonChildToJSXChild(jsonChildren[0]);
        if (1 < jsonChildren.length) {
          for (
            var jsxChildren = [],
              allJSXChildrenAreStrings = !0,
              jsxChildrenString = "",
              i = 0;
            i < jsonChildren.length;
            i++
          ) {
            var jsxChild = jsonChildToJSXChild(jsonChildren[i]);
            jsxChildren.push(jsxChild);
            allJSXChildrenAreStrings &&
              ("string" === typeof jsxChild
                ? (jsxChildrenString += jsxChild)
                : null !== jsxChild && (allJSXChildrenAreStrings = !1));
          }
          return allJSXChildrenAreStrings ? jsxChildrenString : jsxChildren;
        }
      }
      return null;
    }
    var assign = Object.assign,
      REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
      REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"),
      isArrayImpl = Array.isArray,
      assertConsoleLogsCleared =
        require("internal-test-utils/consoleMock").assertConsoleLogsCleared;
    exports.unstable_toMatchRenderedOutput = function (root, expectedJSX) {
      assertYieldsWereCleared(root);
      root = root.toJSON();
      if (null === root || "string" === typeof root) var actualJSX = root;
      else
        isArrayImpl(root)
          ? 0 === root.length
            ? (actualJSX = null)
            : 1 === root.length
              ? (actualJSX = jsonChildToJSXChild(root[0]))
              : ((root = jsonChildrenToJSXChildren(root)),
                (actualJSX =
                  null === root || "string" === typeof root
                    ? root
                    : createJSXElementForTestComparison(REACT_FRAGMENT_TYPE, {
                        children: root
                      })))
          : (actualJSX = jsonChildToJSXChild(root));
      return captureAssertion(function () {
        expect(actualJSX).toEqual(expectedJSX);
      });
    };
  })();
