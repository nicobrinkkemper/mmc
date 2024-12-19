import { r as k, a as Ct, j as R, b as tr, g as rr } from "./react-vendor-Cg0sTGaC.js";
var $e = { exports: {} }, Be = {}; /**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var et;
function nr() { return et || (et = 1, function (e) { function n(p, P) { var _ = p.length; p.push(P); e: for (; 0 < _;) {
    var E = _ - 1 >>> 1, j = p[E];
    if (0 < o(j, P))
        p[E] = P, p[_] = j, _ = E;
    else
        break e;
} } function t(p) { return p.length === 0 ? null : p[0]; } function r(p) { if (p.length === 0)
    return null; var P = p[0], _ = p.pop(); if (_ !== P) {
    p[0] = _;
    e: for (var E = 0, j = p.length, K = j >>> 1; E < K;) {
        var U = 2 * (E + 1) - 1, V = p[U], $ = U + 1, D = p[$];
        if (0 > o(V, _))
            $ < j && 0 > o(D, V) ? (p[E] = D, p[$] = _, E = $) : (p[E] = V, p[U] = _, E = U);
        else if ($ < j && 0 > o(D, _))
            p[E] = D, p[$] = _, E = $;
        else
            break e;
    }
} return P; } function o(p, P) { var _ = p.sortIndex - P.sortIndex; return _ !== 0 ? _ : p.id - P.id; } if (e.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
    var s = performance;
    e.unstable_now = function () { return s.now(); };
}
else {
    var i = Date, a = i.now();
    e.unstable_now = function () { return i.now() - a; };
} var u = [], l = [], c = 1, d = null, h = 3, f = !1, v = !1, m = !1, b = typeof setTimeout == "function" ? setTimeout : null, T = typeof clearTimeout == "function" ? clearTimeout : null, I = typeof setImmediate < "u" ? setImmediate : null; function F(p) { for (var P = t(l); P !== null;) {
    if (P.callback === null)
        r(l);
    else if (P.startTime <= p)
        r(l), P.sortIndex = P.expirationTime, n(u, P);
    else
        break;
    P = t(l);
} } function g(p) { if (m = !1, F(p), !v)
    if (t(u) !== null)
        v = !0, C();
    else {
        var P = t(l);
        P !== null && z(g, P.startTime - p);
    } } var S = !1, O = -1, y = 5, L = -1; function A() { return !(e.unstable_now() - L < y); } function x() { if (S) {
    var p = e.unstable_now();
    L = p;
    var P = !0;
    try {
        e: {
            v = !1, m && (m = !1, T(O), O = -1), f = !0;
            var _ = h;
            try {
                t: {
                    for (F(p), d = t(u); d !== null && !(d.expirationTime > p && A());) {
                        var E = d.callback;
                        if (typeof E == "function") {
                            d.callback = null, h = d.priorityLevel;
                            var j = E(d.expirationTime <= p);
                            if (p = e.unstable_now(), typeof j == "function") {
                                d.callback = j, F(p), P = !0;
                                break t;
                            }
                            d === t(u) && r(u), F(p);
                        }
                        else
                            r(u);
                        d = t(u);
                    }
                    if (d !== null)
                        P = !0;
                    else {
                        var K = t(l);
                        K !== null && z(g, K.startTime - p), P = !1;
                    }
                }
                break e;
            }
            finally {
                d = null, h = _, f = !1;
            }
            P = void 0;
        }
    }
    finally {
        P ? w() : S = !1;
    }
} } var w; if (typeof I == "function")
    w = function () { I(x); };
else if (typeof MessageChannel < "u") {
    var M = new MessageChannel, B = M.port2;
    M.port1.onmessage = x, w = function () { B.postMessage(null); };
}
else
    w = function () { b(x, 0); }; function C() { S || (S = !0, w()); } function z(p, P) { O = b(function () { p(e.unstable_now()); }, P); } e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function (p) { p.callback = null; }, e.unstable_continueExecution = function () { v || f || (v = !0, C()); }, e.unstable_forceFrameRate = function (p) { 0 > p || 125 < p ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : y = 0 < p ? Math.floor(1e3 / p) : 5; }, e.unstable_getCurrentPriorityLevel = function () { return h; }, e.unstable_getFirstCallbackNode = function () { return t(u); }, e.unstable_next = function (p) { switch (h) {
    case 1:
    case 2:
    case 3:
        var P = 3;
        break;
    default: P = h;
} var _ = h; h = P; try {
    return p();
}
finally {
    h = _;
} }, e.unstable_pauseExecution = function () { }, e.unstable_requestPaint = function () { }, e.unstable_runWithPriority = function (p, P) { switch (p) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5: break;
    default: p = 3;
} var _ = h; h = p; try {
    return P();
}
finally {
    h = _;
} }, e.unstable_scheduleCallback = function (p, P, _) { var E = e.unstable_now(); switch (typeof _ == "object" && _ !== null ? (_ = _.delay, _ = typeof _ == "number" && 0 < _ ? E + _ : E) : _ = E, p) {
    case 1:
        var j = -1;
        break;
    case 2:
        j = 250;
        break;
    case 5:
        j = 1073741823;
        break;
    case 4:
        j = 1e4;
        break;
    default: j = 5e3;
} return j = _ + j, p = { id: c++, callback: P, priorityLevel: p, startTime: _, expirationTime: j, sortIndex: -1 }, _ > E ? (p.sortIndex = _, n(l, p), t(u) === null && p === t(l) && (m ? (T(O), O = -1) : m = !0, z(g, _ - E))) : (p.sortIndex = j, n(u, p), v || f || (v = !0, C())), p; }, e.unstable_shouldYield = A, e.unstable_wrapCallback = function (p) { var P = h; return function () { var _ = h; h = P; try {
    return p.apply(this, arguments);
}
finally {
    h = _;
} }; }; }(Be)), Be; }
var tt;
function zo() { return tt || (tt = 1, $e.exports = nr()), $e.exports; }
const rt = "popstate", nt = "beforeunload";
function wt(e) { let n = e.getLocation(); const t = new Set, r = i => { n = e.getLocation(), t.forEach(a => a({ location: n, action: i })); }, o = () => { n = e.getLocation(), t.forEach(i => i({ location: n, action: { type: "ROLLBACK" } })); }, s = async ({ task: i, navigateOpts: a, ...u }) => { var l, c; if (a?.ignoreBlocker ?? !1) {
    i();
    return;
} const h = ((l = e.getBlockers) == null ? void 0 : l.call(e)) ?? [], f = u.type === "PUSH" || u.type === "REPLACE"; if (typeof document < "u" && h.length && f)
    for (const v of h) {
        const m = Ce(u.path, u.state);
        if (await v.blockerFn({ currentLocation: n, nextLocation: m, action: u.type })) {
            (c = e.onBlocked) == null || c.call(e, o);
            return;
        }
    } i(); }; return { get location() { return n; }, get length() { return e.getLength(); }, subscribers: t, subscribe: i => (t.add(i), () => { t.delete(i); }), push: (i, a, u) => { a = ot(a), s({ task: () => { e.pushState(i, a), r({ type: "PUSH" }); }, navigateOpts: u, type: "PUSH", path: i, state: a }); }, replace: (i, a, u) => { a = ot(a), s({ task: () => { e.replaceState(i, a), r({ type: "REPLACE" }); }, navigateOpts: u, type: "REPLACE", path: i, state: a }); }, go: (i, a) => { s({ task: () => { e.go(i), r({ type: "GO", index: i }); }, navigateOpts: a, type: "GO" }); }, back: i => { s({ task: () => { e.back(i?.ignoreBlocker ?? !1), r({ type: "BACK" }); }, navigateOpts: i, type: "BACK" }); }, forward: i => { s({ task: () => { e.forward(i?.ignoreBlocker ?? !1), r({ type: "FORWARD" }); }, navigateOpts: i, type: "FORWARD" }); }, createHref: i => e.createHref(i), block: i => { var a; if (!e.setBlockers)
        return () => { }; const u = ((a = e.getBlockers) == null ? void 0 : a.call(e)) ?? []; return e.setBlockers([...u, i]), () => { var l, c; const d = ((l = e.getBlockers) == null ? void 0 : l.call(e)) ?? []; (c = e.setBlockers) == null || c.call(e, d.filter(h => h !== i)); }; }, flush: () => { var i; return (i = e.flush) == null ? void 0 : i.call(e); }, destroy: () => { var i; return (i = e.destroy) == null ? void 0 : i.call(e); }, notify: r }; }
function ot(e) { return e || (e = {}), { ...e, key: ir() }; }
function or(e) { const n = typeof document < "u" ? window : void 0, t = n.history.pushState, r = n.history.replaceState; let o = []; const s = () => o, i = y => o = y, a = y => y, u = () => Ce(`${n.location.pathname}${n.location.search}${n.location.hash}`, n.history.state); let l = u(), c, d = !1, h = !1, f = !1; const v = () => l; let m, b; const T = () => { m && (O._ignoreSubscribers = !0, (m.isPush ? n.history.pushState : n.history.replaceState)(m.state, "", m.href), O._ignoreSubscribers = !1, m = void 0, b = void 0, c = void 0); }, I = (y, L, A) => { const x = a(L); b || (c = l), l = Ce(L, A), m = { href: x, state: A, isPush: m?.isPush || y === "push" }, b || (b = Promise.resolve().then(() => T())); }, F = () => { l = u(), O.notify({ type: "POP" }); }, g = async () => { if (d) {
    d = !1;
    return;
} if (h)
    h = !1;
else {
    const y = s();
    if (typeof document < "u" && y.length)
        for (const L of y) {
            const A = u();
            if (await L.blockerFn({ currentLocation: l, nextLocation: A, action: "POP" })) {
                d = !0, n.history.go(1), O.notify({ type: "POP" });
                return;
            }
        }
} l = u(), O.notify({ type: "POP" }); }, S = y => { if (f) {
    f = !1;
    return;
} let L = !1; const A = s(); if (typeof document < "u" && A.length)
    for (const x of A) {
        const w = x.enableBeforeUnload ?? !0;
        if (w === !0) {
            L = !0;
            break;
        }
        if (typeof w == "function" && w() === !0) {
            L = !0;
            break;
        }
    } if (L)
    return y.preventDefault(), y.returnValue = ""; }, O = wt({ getLocation: v, getLength: () => n.history.length, pushState: (y, L) => I("push", y, L), replaceState: (y, L) => I("replace", y, L), back: y => (y && (h = !0), f = !0, n.history.back()), forward: y => { y && (h = !0), f = !0, n.history.forward(); }, go: y => n.history.go(y), createHref: y => a(y), flush: T, destroy: () => { n.history.pushState = t, n.history.replaceState = r, n.removeEventListener(nt, S, { capture: !0 }), n.removeEventListener(rt, g); }, onBlocked: y => { c && l !== c && (l = c, y()); }, getBlockers: s, setBlockers: i }); return n.addEventListener(nt, S, { capture: !0 }), n.addEventListener(rt, g), n.history.pushState = function (...y) { const L = t.apply(n.history, y); return O._ignoreSubscribers || F(), L; }, n.history.replaceState = function (...y) { const L = r.apply(n.history, y); return O._ignoreSubscribers || F(), L; }, O; }
function sr(e = { initialEntries: ["/"] }) { const n = e.initialEntries; let t = e.initialIndex ?? n.length - 1; const r = n.map(() => ({})); return wt({ getLocation: () => Ce(n[t], r[t]), getLength: () => n.length, pushState: (s, i) => { t < n.length - 1 && (n.splice(t + 1), r.splice(t + 1)), r.push(i), n.push(s), t = Math.max(n.length - 1, 0); }, replaceState: (s, i) => { r[t] = i, n[t] = s; }, back: () => { t = Math.max(t - 1, 0); }, forward: () => { t = Math.min(t + 1, n.length - 1); }, go: s => { t = Math.min(Math.max(t + s, 0), n.length - 1); }, createHref: s => s }); }
function Ce(e, n) { const t = e.indexOf("#"), r = e.indexOf("?"); return { href: e, pathname: e.substring(0, t > 0 ? r > 0 ? Math.min(t, r) : t : r > 0 ? r : e.length), hash: t > -1 ? e.substring(t) : "", search: r > -1 ? e.slice(r, t === -1 ? void 0 : t) : "", state: n || {} }; }
function ir() { return (Math.random() + 1).toString(36).substring(7); }
var ar = "Invariant failed";
function J(e, n) { if (!e)
    throw new Error(ar); }
const De = k.createContext(null);
function Rt() { return typeof document > "u" ? De : window.__TSR_ROUTER_CONTEXT__ ? window.__TSR_ROUTER_CONTEXT__ : (window.__TSR_ROUTER_CONTEXT__ = De, De); }
function oe(e) { const n = k.useContext(Rt()); return e?.warn, n; }
var ze = { exports: {} }, Ne = {}, Ue = { exports: {} }, Ve = {}; /**
* @license React
* use-sync-external-store-shim.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var st;
function ur() { if (st)
    return Ve; st = 1; var e = Ct(); function n(d, h) { return d === h && (d !== 0 || 1 / d === 1 / h) || d !== d && h !== h; } var t = typeof Object.is == "function" ? Object.is : n, r = e.useState, o = e.useEffect, s = e.useLayoutEffect, i = e.useDebugValue; function a(d, h) { var f = h(), v = r({ inst: { value: f, getSnapshot: h } }), m = v[0].inst, b = v[1]; return s(function () { m.value = f, m.getSnapshot = h, u(m) && b({ inst: m }); }, [d, f, h]), o(function () { return u(m) && b({ inst: m }), d(function () { u(m) && b({ inst: m }); }); }, [d]), i(f), f; } function u(d) { var h = d.getSnapshot; d = d.value; try {
    var f = h();
    return !t(d, f);
}
catch {
    return !0;
} } function l(d, h) { return h(); } var c = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? l : a; return Ve.useSyncExternalStore = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : c, Ve; }
var it;
function cr() { return it || (it = 1, Ue.exports = ur()), Ue.exports; } /**
* @license React
* use-sync-external-store-shim/with-selector.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var at;
function lr() { if (at)
    return Ne; at = 1; var e = Ct(), n = cr(); function t(l, c) { return l === c && (l !== 0 || 1 / l === 1 / c) || l !== l && c !== c; } var r = typeof Object.is == "function" ? Object.is : t, o = n.useSyncExternalStore, s = e.useRef, i = e.useEffect, a = e.useMemo, u = e.useDebugValue; return Ne.useSyncExternalStoreWithSelector = function (l, c, d, h, f) { var v = s(null); if (v.current === null) {
    var m = { hasValue: !1, value: null };
    v.current = m;
}
else
    m = v.current; v = a(function () { function T(O) { if (!I) {
    if (I = !0, F = O, O = h(O), f !== void 0 && m.hasValue) {
        var y = m.value;
        if (f(y, O))
            return g = y;
    }
    return g = O;
} if (y = g, r(F, O))
    return y; var L = h(O); return f !== void 0 && f(y, L) ? (F = O, y) : (F = O, g = L); } var I = !1, F, g, S = d === void 0 ? null : d; return [function () { return T(c()); }, S === null ? void 0 : function () { return T(S()); }]; }, [c, d, h, f]); var b = o(l, v[0], v[1]); return i(function () { m.hasValue = !0, m.value = b; }, [b]), u(b), b; }, Ne; }
var ut;
function dr() { return ut || (ut = 1, ze.exports = lr()), ze.exports; }
var hr = dr();
class fr {
    constructor(n, t) { this.listeners = new Set, this._batching = !1, this._flushing = 0, this.subscribe = r => { var o, s; this.listeners.add(r); const i = (s = (o = this.options) == null ? void 0 : o.onSubscribe) == null ? void 0 : s.call(o, r, this); return () => { this.listeners.delete(r), i?.(); }; }, this.setState = r => { var o, s, i; const a = this.state; this.state = (o = this.options) != null && o.updateFn ? this.options.updateFn(a)(r) : r(a), (i = (s = this.options) == null ? void 0 : s.onUpdate) == null || i.call(s), this._flush(); }, this._flush = () => { if (this._batching)
        return; const r = ++this._flushing; this.listeners.forEach(o => { this._flushing === r && o(); }); }, this.batch = r => { if (this._batching)
        return r(); this._batching = !0, r(), this._batching = !1, this._flush(); }, this.state = n, this.options = t; }
}
function pr(e, n = t => t) { return hr.useSyncExternalStoreWithSelector(e.subscribe, () => e.state, () => e.state, n, mr); }
function mr(e, n) { if (Object.is(e, n))
    return !0; if (typeof e != "object" || e === null || typeof n != "object" || n === null)
    return !1; if (e instanceof Map && n instanceof Map) {
    if (e.size !== n.size)
        return !1;
    for (const [r, o] of e)
        if (!n.has(r) || !Object.is(o, n.get(r)))
            return !1;
    return !0;
} if (e instanceof Set && n instanceof Set) {
    if (e.size !== n.size)
        return !1;
    for (const r of e)
        if (!n.has(r))
            return !1;
    return !0;
} const t = Object.keys(e); if (t.length !== Object.keys(n).length)
    return !1; for (let r = 0; r < t.length; r++)
    if (!Object.prototype.hasOwnProperty.call(n, t[r]) || !Object.is(e[t[r]], n[t[r]]))
        return !1; return !0; }
const G = "__root__";
function vr(e, n) { let t, r, o, s = ""; for (t in e)
    if ((o = e[t]) !== void 0)
        if (Array.isArray(o))
            for (r = 0; r < o.length; r++)
                s && (s += "&"), s += encodeURIComponent(t) + "=" + encodeURIComponent(o[r]);
        else
            s && (s += "&"), s += encodeURIComponent(t) + "=" + encodeURIComponent(o); return "" + s; }
function ct(e) { if (!e)
    return ""; const n = decodeURIComponent(e); return n === "false" ? !1 : n === "true" ? !0 : +n * 0 === 0 && +n + "" === n ? +n : n; }
function gr(e, n) { let t, r; const o = {}, s = e.split("&"); for (; t = s.shift();) {
    const i = t.indexOf("=");
    if (i !== -1) {
        r = t.slice(0, i), r = decodeURIComponent(r);
        const a = t.slice(i + 1);
        o[r] !== void 0 ? o[r] = [].concat(o[r], ct(a)) : o[r] = ct(a);
    }
    else
        r = t, r = decodeURIComponent(r), o[r] = "";
} return o; }
const yr = _r(JSON.parse), br = Sr(JSON.stringify, JSON.parse);
function _r(e) { return n => { n.substring(0, 1) === "?" && (n = n.substring(1)); const t = gr(n); for (const r in t) {
    const o = t[r];
    if (typeof o == "string")
        try {
            t[r] = e(o);
        }
        catch { }
} return t; }; }
function Sr(e, n) { function t(r) { if (typeof r == "object" && r !== null)
    try {
        return e(r);
    }
    catch { }
else if (typeof r == "string" && typeof n == "function")
    try {
        return n(r), e(r);
    }
    catch { } return r; } return r => { r = { ...r }, Object.keys(r).forEach(s => { const i = r[s]; typeof i > "u" || i === void 0 ? delete r[s] : r[s] = t(i); }); const o = vr(r).toString(); return o ? `?${o}` : ""; }; }
function xe(e) { return e[e.length - 1]; }
function Pr(e) { return typeof e == "function"; }
function pe(e, n) { return Pr(e) ? e(n) : e; }
function Me(e, n) { return n.reduce((t, r) => (t[r] = e[r], t), {}); }
function Y(e, n) { if (e === n)
    return e; const t = n, r = dt(e) && dt(t); if (r || ve(e) && ve(t)) {
    const o = r ? e : Object.keys(e), s = o.length, i = r ? t : Object.keys(t), a = i.length, u = r ? [] : {};
    let l = 0;
    for (let c = 0; c < a; c++) {
        const d = r ? c : i[c];
        (!r && o.includes(d) || r) && e[d] === void 0 && t[d] === void 0 ? (u[d] = void 0, l++) : (u[d] = Y(e[d], t[d]), u[d] === e[d] && e[d] !== void 0 && l++);
    }
    return s === a && l === s ? e : u;
} return t; }
function ve(e) { if (!lt(e))
    return !1; const n = e.constructor; if (typeof n > "u")
    return !0; const t = n.prototype; return !(!lt(t) || !t.hasOwnProperty("isPrototypeOf")); }
function lt(e) { return Object.prototype.toString.call(e) === "[object Object]"; }
function dt(e) { return Array.isArray(e) && e.length === Object.keys(e).length; }
function ht(e, n) { let t = Object.keys(e); return n && (t = t.filter(r => e[r] !== void 0)), t; }
function me(e, n, t) { if (e === n)
    return !0; if (typeof e != typeof n)
    return !1; if (ve(e) && ve(n)) {
    const r = t?.ignoreUndefined ?? !0, o = ht(e, r), s = ht(n, r);
    return !t?.partial && o.length !== s.length ? !1 : s.every(i => me(e[i], n[i], t));
} return Array.isArray(e) && Array.isArray(n) ? e.length !== n.length ? !1 : !e.some((r, o) => !me(r, n[o], t)) : !1; }
const Pe = typeof window < "u" ? k.useLayoutEffect : k.useEffect;
function he(e) { let n, t; const r = new Promise((o, s) => { n = o, t = s; }); return r.status = "pending", r.resolve = o => { r.status = "resolved", r.value = o, n(o), e?.(o); }, r.reject = o => { r.status = "rejected", t(o); }, r; }
function He(e) { const n = k.useRef({ value: e, prev: null }), t = n.current.value; return e !== t && (n.current = { value: e, prev: t }), n.current.prev; }
function xr(e, n, t = {}, r = {}) { const o = k.useRef(typeof IntersectionObserver == "function"), s = k.useRef(null); return k.useEffect(() => { if (!(!e.current || !o.current || r.disabled))
    return s.current = new IntersectionObserver(([i]) => { n(i); }, t), s.current.observe(e.current), () => { var i; (i = s.current) == null || i.disconnect(); }; }, [n, t, r.disabled, e]), s.current; }
function Cr(e) { const n = k.useRef(null); return k.useEffect(() => { e && (typeof e == "function" ? e(n.current) : e.current = n.current); }), n; }
function re(e) { return Ie(e.filter(n => n !== void 0).join("/")); }
function Ie(e) { return e.replace(/\/{2,}/g, "/"); }
function Ye(e) { return e === "/" ? e : e.replace(/^\/{1,}/, ""); }
function ce(e) { return e === "/" ? e : e.replace(/\/{1,}$/, ""); }
function wr(e) { return ce(Ye(e)); }
function ke(e, n) { return e.endsWith("/") && e !== "/" && e !== `${n}/` ? e.slice(0, -1) : e; }
function Rr(e, n, t) { return ke(e, t) === ke(n, t); }
function Lr({ basepath: e, base: n, to: t, trailingSlash: r = "never", caseSensitive: o }) { var s, i; n = Te(e, n, o), t = Te(e, t, o); let a = ge(n); const u = ge(t); a.length > 1 && ((s = xe(a)) == null ? void 0 : s.value) === "/" && a.pop(), u.forEach((c, d) => { c.value === "/" ? d ? d === u.length - 1 && a.push(c) : a = [c] : c.value === ".." ? a.pop() : c.value === "." || a.push(c); }), a.length > 1 && (((i = xe(a)) == null ? void 0 : i.value) === "/" ? r === "never" && a.pop() : r === "always" && a.push({ type: "pathname", value: "/" })); const l = re([e, ...a.map(c => c.value)]); return Ie(l); }
function ge(e) { if (!e)
    return []; e = Ie(e); const n = []; if (e.slice(0, 1) === "/" && (e = e.substring(1), n.push({ type: "pathname", value: "/" })), !e)
    return n; const t = e.split("/").filter(Boolean); return n.push(...t.map(r => r === "$" || r === "*" ? { type: "wildcard", value: r } : r.charAt(0) === "$" ? { type: "param", value: r } : { type: "pathname", value: decodeURI(r) })), e.slice(-1) === "/" && (e = e.substring(1), n.push({ type: "pathname", value: "/" })), n; }
function Re({ path: e, params: n, leaveWildcards: t, leaveParams: r, decodeCharMap: o }) { const s = ge(e), i = {}; for (const [a, u] of Object.entries(n)) {
    const l = typeof u == "string";
    ["*", "_splat"].includes(a) ? i[a] = l ? encodeURI(u) : u : i[a] = l ? Mr(u, o) : u;
} return re(s.map(a => { if (a.type === "wildcard") {
    const u = i._splat;
    return t ? `${a.value}${u ?? ""}` : u;
} if (a.type === "param") {
    if (r) {
        const u = i[a.value];
        return `${a.value}${u ?? ""}`;
    }
    return i[a.value.substring(1)] ?? "undefined";
} return a.value; })); }
function Mr(e, n) { let t = encodeURIComponent(e); if (n)
    for (const [r, o] of n)
        t = t.replaceAll(r, o); return t; }
function Le(e, n, t) { const r = Er(e, n, t); if (!(t.to && !r))
    return r ?? {}; }
function Te(e, n, t = !1) { const r = t ? e : e.toLowerCase(), o = t ? n : n.toLowerCase(); switch (!0) {
    case r === "/": return n;
    case o === r: return "";
    case n.length < e.length: return n;
    case o[r.length] !== "/": return n;
    case o.startsWith(r): return n.slice(e.length);
    default: return n;
} }
function Er(e, n, t) { if (e !== "/" && !n.startsWith(e))
    return; n = Te(e, n, t.caseSensitive); const r = Te(e, `${t.to ?? "$"}`, t.caseSensitive), o = ge(n), s = ge(r); n.startsWith("/") || o.unshift({ type: "pathname", value: "/" }), r.startsWith("/") || s.unshift({ type: "pathname", value: "/" }); const i = {}; return (() => { for (let u = 0; u < Math.max(o.length, s.length); u++) {
    const l = o[u], c = s[u], d = u >= o.length - 1, h = u >= s.length - 1;
    if (c) {
        if (c.type === "wildcard") {
            const f = decodeURI(re(o.slice(u).map(v => v.value)));
            return i["*"] = f, i._splat = f, !0;
        }
        if (c.type === "pathname") {
            if (c.value === "/" && !l?.value)
                return !0;
            if (l) {
                if (t.caseSensitive) {
                    if (c.value !== l.value)
                        return !1;
                }
                else if (c.value.toLowerCase() !== l.value.toLowerCase())
                    return !1;
            }
        }
        if (!l)
            return !1;
        if (c.type === "param") {
            if (l.value === "/")
                return !1;
            l.value.charAt(0) !== "$" && (i[c.value.substring(1)] = decodeURIComponent(l.value));
        }
    }
    if (!d && h)
        return i["**"] = re(o.slice(u + 1).map(f => f.value)), !!t.fuzzy && c?.value !== "/";
} return !0; })() ? i : void 0; }
function ue(e) { return !!e?.isRedirect; }
function We(e) { return !!e?.isRedirect && e.href; }
function Xe(e) { const n = e.errorComponent ?? Fe; return R.jsx(kr, { getResetKey: e.getResetKey, onCatch: e.onCatch, children: ({ error: t, reset: r }) => t ? k.createElement(n, { error: t, reset: r }) : e.children }); }
class kr extends k.Component {
    constructor() { super(...arguments), this.state = { error: null }; }
    static getDerivedStateFromProps(n) { return { resetKey: n.getResetKey() }; }
    static getDerivedStateFromError(n) { return { error: n }; }
    reset() { this.setState({ error: null }); }
    componentDidUpdate(n, t) { t.error && t.resetKey !== this.state.resetKey && this.reset(); }
    componentDidCatch(n, t) { this.props.onCatch && this.props.onCatch(n, t); }
    render() { return this.props.children({ error: this.state.resetKey !== this.props.getResetKey() ? null : this.state.error, reset: () => { this.reset(); } }); }
}
function Fe({ error: e }) { const [n, t] = k.useState(!1); return R.jsxs("div", { style: { padding: ".5rem", maxWidth: "100%" }, children: [R.jsxs("div", { style: { display: "flex", alignItems: "center", gap: ".5rem" }, children: [R.jsx("strong", { style: { fontSize: "1rem" }, children: "Something went wrong!" }), R.jsx("button", { style: { appearance: "none", fontSize: ".6em", border: "1px solid currentColor", padding: ".1rem .2rem", fontWeight: "bold", borderRadius: ".25rem" }, onClick: () => t(r => !r), children: n ? "Hide Error" : "Show Error" })] }), R.jsx("div", { style: { height: ".25rem" } }), n ? R.jsx("div", { children: R.jsx("pre", { style: { fontSize: ".7em", border: "1px solid red", borderRadius: ".25rem", padding: ".3rem", color: "red", overflow: "auto" }, children: e.message ? R.jsx("code", { children: e.message }) : null }) }) : null] }); }
function q(e) { const n = oe({ warn: e?.router === void 0 }), t = e?.router || n, r = k.useRef(); return pr(t.__store, o => { if (e?.select) {
    if (e.structuralSharing ?? t.options.defaultStructuralSharing) {
        const s = Y(r.current, e.select(o));
        return r.current = s, s;
    }
    return e.select(o);
} return o; }); }
function ee(e) { return !!e?.isNotFound; }
function Tr(e) { const n = q({ select: t => `not-found-${t.location.pathname}-${t.status}` }); return R.jsx(Xe, { getResetKey: () => n, onCatch: (t, r) => { var o; if (ee(t))
        (o = e.onCatch) == null || o.call(e, t, r);
    else
        throw t; }, errorComponent: ({ error: t }) => { var r; if (ee(t))
        return (r = e.fallback) == null ? void 0 : r.call(e, t); throw t; }, children: e.children }); }
function Ir() { return R.jsx("p", { children: "Not Found" }); }
const Fr = { stringify: e => JSON.stringify(e, function (t, r) { const o = this[t], s = ft.find(i => i.stringifyCondition(o)); return s ? s.stringify(o) : r; }), parse: e => JSON.parse(e, function (t, r) { const o = this[t], s = ft.find(i => i.parseCondition(o)); return s ? s.parse(o) : r; }) }, ft = [{ stringifyCondition: e => e instanceof Date, stringify: e => ({ $date: e.toISOString() }), parseCondition: e => ve(e) && e.$date, parse: e => new Date(e.$date) }, { stringifyCondition: e => e === void 0, stringify: () => ({ $undefined: "" }), parseCondition: e => ve(e) && e.$undefined === "", parse: () => { } }], Lt = ["component", "errorComponent", "pendingComponent", "notFoundComponent"];
function Or(e) { var n; for (const t of Lt)
    if ((n = e.options[t]) != null && n.preload)
        return !0; return !1; }
function Ke(e, n) { if (e == null)
    return {}; if ("~standard" in e) {
    const t = e["~standard"].validate(n);
    if (t instanceof Promise)
        throw new Ge("Async validation not supported");
    if (t.issues)
        throw new Ge(JSON.stringify(t.issues, void 0, 2));
    return t.value;
} return "parse" in e ? e.parse(n) : typeof e == "function" ? e(n) : {}; }
function No(e) { return new jr(e); }
class jr {
    constructor(n) { this.tempLocationKey = `${Math.round(Math.random() * 1e7)}`, this.resetNextScroll = !0, this.shouldViewTransition = void 0, this.isViewTransitionTypesSupported = void 0, this.subscribers = new Set, this.startReactTransition = t => t(), this.update = t => { var r; t.notFoundRoute && console.warn("The notFoundRoute API is deprecated and will be removed in the next major version. See https://tanstack.com/router/v1/docs/guide/not-found-errors#migrating-from-notfoundroute for more info."); const o = this.options; this.options = { ...this.options, ...t }, this.isServer = this.options.isServer ?? typeof document > "u", this.pathParamsDecodeCharMap = this.options.pathParamsAllowedCharacters ? new Map(this.options.pathParamsAllowedCharacters.map(s => [encodeURIComponent(s), s])) : void 0, (!this.basepath || t.basepath && t.basepath !== o.basepath) && (t.basepath === void 0 || t.basepath === "" || t.basepath === "/" ? this.basepath = "/" : this.basepath = `/${wr(t.basepath)}`), (!this.history || this.options.history && this.options.history !== this.history) && (this.history = this.options.history ?? (this.isServer ? sr({ initialEntries: [this.basepath || "/"] }) : or()), this.latestLocation = this.parseLocation()), this.options.routeTree !== this.routeTree && (this.routeTree = this.options.routeTree, this.buildRouteTree()), this.__store || (this.__store = new fr($r(this.latestLocation), { onUpdate: () => { this.__store.state = { ...this.state, cachedMatches: this.state.cachedMatches.filter(s => !["redirected"].includes(s.status)) }; } })), typeof window < "u" && "CSS" in window && typeof ((r = window.CSS) == null ? void 0 : r.supports) == "function" && (this.isViewTransitionTypesSupported = window.CSS.supports("selector(:active-view-transition-type(a)")); }, this.buildRouteTree = () => { this.routesById = {}, this.routesByPath = {}; const t = this.options.notFoundRoute; t && (t.init({ originalIndex: 99999999999, defaultSsr: this.options.defaultSsr }), this.routesById[t.id] = t); const r = i => { i.forEach((a, u) => { a.init({ originalIndex: u, defaultSsr: this.options.defaultSsr }); const l = this.routesById[a.id]; if (J(!l, `Duplicate routes found with id: ${String(a.id)}`), this.routesById[a.id] = a, !a.isRoot && a.path) {
        const d = ce(a.fullPath);
        (!this.routesByPath[d] || a.fullPath.endsWith("/")) && (this.routesByPath[d] = a);
    } const c = a.children; c?.length && r(c); }); }; r([this.routeTree]); const o = []; Object.values(this.routesById).forEach((i, a) => { var u; if (i.isRoot || !i.path)
        return; const l = Ye(i.fullPath), c = ge(l); for (; c.length > 1 && ((u = c[0]) == null ? void 0 : u.value) === "/";)
        c.shift(); const d = c.map(h => h.value === "/" ? .75 : h.type === "param" ? .5 : h.type === "wildcard" ? .25 : 1); o.push({ child: i, trimmed: l, parsed: c, index: a, scores: d }); }), this.flatRoutes = o.sort((i, a) => { const u = Math.min(i.scores.length, a.scores.length); for (let l = 0; l < u; l++)
        if (i.scores[l] !== a.scores[l])
            return a.scores[l] - i.scores[l]; if (i.scores.length !== a.scores.length)
        return a.scores.length - i.scores.length; for (let l = 0; l < u; l++)
        if (i.parsed[l].value !== a.parsed[l].value)
            return i.parsed[l].value > a.parsed[l].value ? 1 : -1; return i.index - a.index; }).map((i, a) => (i.child.rank = a, i.child)); }, this.subscribe = (t, r) => { const o = { eventType: t, fn: r }; return this.subscribers.add(o), () => { this.subscribers.delete(o); }; }, this.emit = t => { this.subscribers.forEach(r => { r.eventType === t.type && r.fn(t); }); }, this.parseLocation = (t, r) => { const o = ({ pathname: u, search: l, hash: c, state: d }) => { const h = this.options.parseSearch(l), f = this.options.stringifySearch(h); return { pathname: u, searchStr: f, search: Y(t?.search, h), hash: c.split("#").reverse()[0] ?? "", href: `${u}${f}${c}`, state: Y(t?.state, d) }; }, s = o(r ?? this.history.location), { __tempLocation: i, __tempKey: a } = s.state; if (i && (!a || a === this.tempLocationKey)) {
        const u = o(i);
        return u.state.key = s.state.key, delete u.state.__tempLocation, { ...u, maskedLocation: s };
    } return s; }, this.resolvePathWithBase = (t, r) => Lr({ basepath: this.basepath, base: t, to: Ie(r), trailingSlash: this.options.trailingSlash, caseSensitive: this.options.caseSensitive }), this.getMatchedRoutes = (t, r) => { let o = {}; const s = ce(t.pathname), i = c => Le(this.basepath, s, { to: c.fullPath, caseSensitive: c.options.caseSensitive ?? this.options.caseSensitive, fuzzy: !0 }); let a = r?.to !== void 0 ? this.routesByPath[r.to] : void 0; a ? o = i(a) : a = this.flatRoutes.find(c => { const d = i(c); return d ? (o = d, !0) : !1; }); let u = a || this.routesById[G]; const l = [u]; for (; u.parentRoute;)
        u = u.parentRoute, l.unshift(u); return { matchedRoutes: l, routeParams: o, foundRoute: a }; }, this.cancelMatch = t => { const r = this.getMatch(t); r && (r.abortController.abort(), clearTimeout(r.pendingTimeout)); }, this.cancelMatches = () => { var t; (t = this.state.pendingMatches) == null || t.forEach(r => { this.cancelMatch(r.id); }); }, this.buildLocation = t => { const r = (s = {}, i) => { var a, u, l, c, d, h; const f = s._fromLocation ? this.matchRoutes(s._fromLocation, { _buildLocation: !0 }) : this.state.matches, v = s.from != null ? f.find(w => Le(this.basepath, ce(w.pathname), { to: s.from, caseSensitive: !1, fuzzy: !1 })) : void 0, m = v?.pathname || this.latestLocation.pathname; J(s.from == null || v != null, "Could not find match for from: " + s.from); const b = (a = this.state.pendingMatches) != null && a.length ? (u = xe(this.state.pendingMatches)) == null ? void 0 : u.search : ((l = xe(f)) == null ? void 0 : l.search) || this.latestLocation.search, T = i?.matchedRoutes.filter(w => f.find(M => M.routeId === w.id)); let I; if (s.to)
        I = this.resolvePathWithBase(m, `${s.to}`);
    else {
        const w = this.routesById[(c = T?.find(M => { const B = Re({ path: M.fullPath, params: i?.routeParams ?? {}, decodeCharMap: this.pathParamsDecodeCharMap }); return re([this.basepath, B]) === m; })) == null ? void 0 : c.id];
        I = this.resolvePathWithBase(m, w?.to ?? m);
    } const F = { ...(d = xe(f)) == null ? void 0 : d.params }; let g = (s.params ?? !0) === !0 ? F : { ...F, ...pe(s.params, F) }; Object.keys(g).length > 0 && i?.matchedRoutes.map(w => { var M; return ((M = w.options.params) == null ? void 0 : M.stringify) ?? w.options.stringifyParams; }).filter(Boolean).forEach(w => { g = { ...g, ...w(g) }; }), I = Re({ path: I, params: g ?? {}, leaveWildcards: !1, leaveParams: t.leaveParams, decodeCharMap: this.pathParamsDecodeCharMap }); let S = b; if (t._includeValidateSearch && ((h = this.options.search) != null && h.strict)) {
        let w = {};
        i?.matchedRoutes.forEach(M => { try {
            M.options.validateSearch && (w = { ...w, ...Ke(M.options.validateSearch, { ...w, ...S }) ?? {} });
        }
        catch { } }), S = w;
    } S = (w => { const M = i?.matchedRoutes.reduce((z, p) => { var P; const _ = []; if ("search" in p.options)
        (P = p.options.search) != null && P.middlewares && _.push(...p.options.search.middlewares);
    else if (p.options.preSearchFilters || p.options.postSearchFilters) {
        const E = ({ search: j, next: K }) => { let U = j; "preSearchFilters" in p.options && p.options.preSearchFilters && (U = p.options.preSearchFilters.reduce(($, D) => D($), j)); const V = K(U); return "postSearchFilters" in p.options && p.options.postSearchFilters ? p.options.postSearchFilters.reduce(($, D) => D($), V) : V; };
        _.push(E);
    } if (t._includeValidateSearch && p.options.validateSearch) {
        const E = ({ search: j, next: K }) => { try {
            const U = K(j);
            return { ...U, ...Ke(p.options.validateSearch, U) ?? {} };
        }
        catch { } };
        _.push(E);
    } return z.concat(_); }, []) ?? [], B = ({ search: z }) => s.search ? s.search === !0 ? z : pe(s.search, z) : {}; M.push(B); const C = (z, p) => { if (z >= M.length)
        return p; const P = M[z]; return P({ search: p, next: E => C(z + 1, E) }); }; return C(0, w); })(S), S = Y(b, S); const y = this.options.stringifySearch(S), L = s.hash === !0 ? this.latestLocation.hash : s.hash ? pe(s.hash, this.latestLocation.hash) : void 0, A = L ? `#${L}` : ""; let x = s.state === !0 ? this.latestLocation.state : s.state ? pe(s.state, this.latestLocation.state) : {}; return x = Y(this.latestLocation.state, x), { pathname: I, search: S, searchStr: y, state: x, hash: L ?? "", href: `${I}${y}${A}`, unmaskOnReload: s.unmaskOnReload }; }, o = (s = {}, i) => { var a; const u = r(s); let l = i ? r(i) : void 0; if (!l) {
        let h = {};
        const f = (a = this.options.routeMasks) == null ? void 0 : a.find(v => { const m = Le(this.basepath, u.pathname, { to: v.from, caseSensitive: !1, fuzzy: !1 }); return m ? (h = m, !0) : !1; });
        if (f) {
            const { from: v, ...m } = f;
            i = { ...Me(t, ["from"]), ...m, params: h }, l = r(i);
        }
    } const c = this.getMatchedRoutes(u, s), d = r(s, c); if (l) {
        const h = this.getMatchedRoutes(l, i), f = r(i, h);
        d.maskedLocation = f;
    } return d; }; return t.mask ? o(t, { ...Me(t, ["from"]), ...t.mask }) : o(t); }, this.commitLocation = ({ viewTransition: t, ignoreBlocker: r, ...o }) => { const s = () => { o.state.key = this.latestLocation.state.key; const u = me(o.state, this.latestLocation.state); return delete o.state.key, u; }, i = this.latestLocation.href === o.href, a = this.commitLocationPromise; if (this.commitLocationPromise = he(() => { a?.resolve(); }), i && s())
        this.load();
    else {
        let { maskedLocation: u, hashScrollIntoView: l, ...c } = o;
        u && (c = { ...u, state: { ...u.state, __tempKey: void 0, __tempLocation: { ...c, search: c.searchStr, state: { ...c.state, __tempKey: void 0, __tempLocation: void 0, key: void 0 } } } }, (c.unmaskOnReload ?? this.options.unmaskOnReload ?? !1) && (c.state.__tempKey = this.tempLocationKey)), c.state.__hashScrollIntoViewOptions = l ?? this.options.defaultHashScrollIntoView ?? !0, this.shouldViewTransition = t, this.history[o.replace ? "replace" : "push"](c.href, c.state, { ignoreBlocker: r });
    } return this.resetNextScroll = o.resetScroll ?? !0, this.history.subscribers.size || this.load(), this.commitLocationPromise; }, this.buildAndCommitLocation = ({ replace: t, resetScroll: r, hashScrollIntoView: o, viewTransition: s, ignoreBlocker: i, href: a, ...u } = {}) => { if (a) {
        const c = Ce(a, {});
        u.to = c.pathname, u.search = this.options.parseSearch(c.search), u.hash = c.hash.slice(1);
    } const l = this.buildLocation({ ...u, _includeValidateSearch: !0 }); return this.commitLocation({ ...l, viewTransition: s, replace: t, resetScroll: r, hashScrollIntoView: o, ignoreBlocker: i }); }, this.navigate = ({ to: t, reloadDocument: r, href: o, ...s }) => { if (r) {
        o || (o = this.buildLocation({ to: t, ...s }).href), s.replace ? window.location.replace(o) : window.location.href = o;
        return;
    } return this.buildAndCommitLocation({ ...s, href: o, to: t }); }, this.load = async () => { this.latestLocation = this.parseLocation(this.latestLocation); let t, r, o; for (o = new Promise(s => { this.startReactTransition(async () => { var i; try {
        const a = this.latestLocation, u = this.state.resolvedLocation, l = u.href !== a.href, c = u.pathname !== a.pathname;
        this.cancelMatches();
        let d;
        this.__store.batch(() => { d = this.matchRoutes(a), this.__store.setState(h => ({ ...h, status: "pending", isLoading: !0, location: a, pendingMatches: d, cachedMatches: h.cachedMatches.filter(f => !d.find(v => v.id === f.id)) })); }), this.state.redirect || this.emit({ type: "onBeforeNavigate", fromLocation: u, toLocation: a, pathChanged: c, hrefChanged: l }), this.emit({ type: "onBeforeLoad", fromLocation: u, toLocation: a, pathChanged: c, hrefChanged: l }), await this.loadMatches({ matches: d, location: a, onReady: async () => { this.startViewTransition(async () => { let h, f, v; this.__store.batch(() => { this.__store.setState(m => { const b = m.matches, T = m.pendingMatches || m.matches; return h = b.filter(I => !T.find(F => F.id === I.id)), f = T.filter(I => !b.find(F => F.id === I.id)), v = b.filter(I => T.find(F => F.id === I.id)), { ...m, isLoading: !1, loadedAt: Date.now(), matches: T, pendingMatches: void 0, cachedMatches: [...m.cachedMatches, ...h.filter(I => I.status !== "error")] }; }), this.clearExpiredCache(); }), [[h, "onLeave"], [f, "onEnter"], [v, "onStay"]].forEach(([m, b]) => { m.forEach(T => { var I, F; (F = (I = this.looseRoutesById[T.routeId].options)[b]) == null || F.call(I, T); }); }); }); } });
    }
    catch (a) {
        We(a) ? (t = a, this.isServer || this.navigate({ ...t, replace: !0, ignoreBlocker: !0 })) : ee(a) && (r = a), this.__store.setState(u => ({ ...u, statusCode: t ? t.statusCode : r ? 404 : u.matches.some(l => l.status === "error") ? 500 : 200, redirect: t }));
    } this.latestLoadPromise === o && ((i = this.commitLocationPromise) == null || i.resolve(), this.latestLoadPromise = void 0, this.commitLocationPromise = void 0), s(); }); }), this.latestLoadPromise = o, await o; this.latestLoadPromise && o !== this.latestLoadPromise;)
        await this.latestLoadPromise; }, this.startViewTransition = t => { const r = this.shouldViewTransition ?? this.options.defaultViewTransition; if (delete this.shouldViewTransition, r && typeof document < "u" && "startViewTransition" in document && typeof document.startViewTransition == "function") {
        let o;
        typeof r == "object" && this.isViewTransitionTypesSupported ? o = { update: t, types: r.types } : o = t, document.startViewTransition(o);
    }
    else
        t(); }, this.updateMatch = (t, r) => { var o; let s; const i = (o = this.state.pendingMatches) == null ? void 0 : o.find(c => c.id === t), a = this.state.matches.find(c => c.id === t), u = this.state.cachedMatches.find(c => c.id === t), l = i ? "pendingMatches" : a ? "matches" : u ? "cachedMatches" : ""; return l && this.__store.setState(c => { var d; return { ...c, [l]: (d = c[l]) == null ? void 0 : d.map(h => h.id === t ? s = r(h) : h) }; }), s; }, this.getMatch = t => [...this.state.cachedMatches, ...this.state.pendingMatches ?? [], ...this.state.matches].find(r => r.id === t), this.loadMatches = async ({ location: t, matches: r, preload: o, onReady: s, updateMatch: i = this.updateMatch }) => { let a, u = !1; const l = async () => { u || (u = !0, await s?.()); }, c = h => !!(o && !this.state.matches.find(f => f.id === h)); !this.isServer && !this.state.matches.length && l(); const d = (h, f) => { var v, m, b; if (We(f) && !f.reloadDocument)
        throw f; if (ue(f) || ee(f)) {
        if (i(h.id, T => ({ ...T, status: ue(f) ? "redirected" : ee(f) ? "notFound" : "error", isFetching: !1, error: f, beforeLoadPromise: void 0, loaderPromise: void 0 })), f.routeId || (f.routeId = h.routeId), (v = h.beforeLoadPromise) == null || v.resolve(), (m = h.loaderPromise) == null || m.resolve(), (b = h.loadPromise) == null || b.resolve(), ue(f))
            throw u = !0, f = this.resolveRedirect({ ...f, _fromLocation: t }), f;
        if (ee(f))
            throw this._handleNotFound(r, f, { updateMatch: i }), f;
    } }; try {
        await new Promise((h, f) => { (async () => { var v, m, b; try {
            const T = (g, S, O) => { var y, L; const { id: A, routeId: x } = r[g], w = this.looseRoutesById[x]; if (S instanceof Promise)
                throw S; S.routerCode = O, a = a ?? g, d(this.getMatch(A), S); try {
                (L = (y = w.options).onError) == null || L.call(y, S);
            }
            catch (M) {
                S = M, d(this.getMatch(A), S);
            } i(A, M => { var B, C; return (B = M.beforeLoadPromise) == null || B.resolve(), (C = M.loadPromise) == null || C.resolve(), { ...M, error: S, status: "error", isFetching: !1, updatedAt: Date.now(), abortController: new AbortController, beforeLoadPromise: void 0 }; }); };
            for (const [g, { id: S, routeId: O }] of r.entries()) {
                const y = this.getMatch(S), L = (v = r[g - 1]) == null ? void 0 : v.id, A = this.looseRoutesById[O], x = A.options.pendingMs ?? this.options.defaultPendingMs, w = !!(s && !this.isServer && !c(S) && (A.options.loader || A.options.beforeLoad) && typeof x == "number" && x !== 1 / 0 && (A.options.pendingComponent ?? this.options.defaultPendingComponent));
                let M = !0;
                if ((y.beforeLoadPromise || y.loaderPromise) && (w && setTimeout(() => { try {
                    l();
                }
                catch { } }, x), await y.beforeLoadPromise, M = this.getMatch(S).status !== "success"), M) {
                    try {
                        i(S, D => ({ ...D, loadPromise: he(() => { var X; (X = D.loadPromise) == null || X.resolve(); }), beforeLoadPromise: he() }));
                        const B = new AbortController;
                        let C;
                        w && (C = setTimeout(() => { try {
                            l();
                        }
                        catch { } }, x));
                        const { paramsError: z, searchError: p } = this.getMatch(S);
                        z && T(g, z, "PARSE_PARAMS"), p && T(g, p, "VALIDATE_SEARCH");
                        const P = () => L ? this.getMatch(L).context : this.options.context ?? {};
                        i(S, D => ({ ...D, isFetching: "beforeLoad", fetchCount: D.fetchCount + 1, abortController: B, pendingTimeout: C, context: { ...P(), ...D.__routeContext, ...D.__beforeLoadContext } }));
                        const { search: _, params: E, context: j, cause: K } = this.getMatch(S), U = c(S), V = { search: _, abortController: B, params: E, preload: U, context: j, location: t, navigate: D => this.navigate({ ...D, _fromLocation: t }), buildLocation: this.buildLocation, cause: U ? "preload" : K, matches: r };
                        let $ = await ((b = (m = A.options).beforeLoad) == null ? void 0 : b.call(m, V)) ?? {};
                        this.serializeLoaderData && ($ = this.serializeLoaderData("__beforeLoadContext", $, { router: this, match: this.getMatch(S) })), (ue($) || ee($)) && T(g, $, "BEFORE_LOAD"), i(S, D => ({ ...D, __beforeLoadContext: $, context: { ...P(), ...D.__routeContext, ...$ }, abortController: B }));
                    }
                    catch (B) {
                        T(g, B, "BEFORE_LOAD");
                    }
                    i(S, B => { var C; return (C = B.beforeLoadPromise) == null || C.resolve(), { ...B, beforeLoadPromise: void 0, isFetching: !1 }; });
                }
            }
            const I = r.slice(0, a), F = [];
            I.forEach(({ id: g, routeId: S }, O) => { F.push((async () => { const { loaderPromise: y } = this.getMatch(g); let L = !1; if (y)
                await y;
            else {
                const A = F[O - 1], x = this.looseRoutesById[S], w = () => { const { params: U, loaderDeps: V, abortController: $, context: D, cause: X } = this.getMatch(g), Z = c(g); return { params: U, deps: V, preload: !!Z, parentMatchPromise: A, abortController: $, context: D, location: t, navigate: de => this.navigate({ ...de, _fromLocation: t }), cause: Z ? "preload" : X, route: x }; }, M = Date.now() - this.getMatch(g).updatedAt, B = c(g), C = B ? x.options.preloadStaleTime ?? this.options.defaultPreloadStaleTime ?? 3e4 : x.options.staleTime ?? this.options.defaultStaleTime ?? 0, z = x.options.shouldReload, p = typeof z == "function" ? z(w()) : z;
                i(g, U => ({ ...U, loaderPromise: he(), preload: !!B && !this.state.matches.find(V => V.id === g) }));
                const P = async () => { var U, V, $, D, X, Z, de, we; try {
                    const se = async () => { const W = this.getMatch(g); W.minPendingPromise && await W.minPendingPromise; };
                    try {
                        x._lazyPromise === void 0 && (x.lazyFn ? x._lazyPromise = x.lazyFn().then(te => { const { id: ae, ...N } = te.options; Object.assign(x.options, N); }) : x._lazyPromise = Promise.resolve()), x._componentsPromise === void 0 && (x._componentsPromise = x._lazyPromise.then(() => Promise.all(Lt.map(async (te) => { const ae = x.options[te]; ae?.preload && await ae.preload(); })))), i(g, te => ({ ...te, isFetching: "loader" }));
                        let W = await ((V = (U = x.options).loader) == null ? void 0 : V.call(U, w()));
                        this.serializeLoaderData && (W = this.serializeLoaderData("loaderData", W, { router: this, match: this.getMatch(g) })), d(this.getMatch(g), W), await x._lazyPromise, await se();
                        const Q = (D = ($ = x.options).head) == null ? void 0 : D.call($, { matches: r, match: this.getMatch(g), params: this.getMatch(g).params, loaderData: W }), ne = Q?.meta, ie = Q?.links, be = Q?.scripts, _e = (Z = (X = x.options).headers) == null ? void 0 : Z.call(X, { loaderData: W });
                        i(g, te => ({ ...te, error: void 0, status: "success", isFetching: !1, updatedAt: Date.now(), loaderData: W, meta: ne, links: ie, scripts: be, headers: _e }));
                    }
                    catch (W) {
                        let Q = W;
                        await se(), d(this.getMatch(g), W);
                        try {
                            (we = (de = x.options).onError) == null || we.call(de, W);
                        }
                        catch (ne) {
                            Q = ne, d(this.getMatch(g), ne);
                        }
                        i(g, ne => ({ ...ne, error: Q, status: "error", isFetching: !1 }));
                    }
                    await x._componentsPromise;
                }
                catch (se) {
                    i(g, W => ({ ...W, loaderPromise: void 0 })), d(this.getMatch(g), se);
                } }, { status: _, invalid: E } = this.getMatch(g);
                L = _ === "success" && (E || (p ?? M > C)), B && x.options.preload === !1 || (L ? (async () => { try {
                    await P();
                }
                catch (U) {
                    We(U) && await this.navigate(U);
                } })() : _ !== "success" && await P());
                const { loaderPromise: j, loadPromise: K } = this.getMatch(g);
                j?.resolve(), K?.resolve();
            } return i(g, A => ({ ...A, isFetching: L ? A.isFetching : !1, loaderPromise: void 0, invalid: !1 })), this.getMatch(g); })()); }), await Promise.all(F), h();
        }
        catch (T) {
            f(T);
        } })(); }), await l();
    }
    catch (h) {
        if (ue(h) || ee(h))
            throw ee(h) && !o && await l(), h;
    } return r; }, this.invalidate = t => { const r = o => { var s; return ((s = t?.filter) == null ? void 0 : s.call(t, o)) ?? !0 ? { ...o, invalid: !0, ...o.status === "error" ? { status: "pending", error: void 0 } : {} } : o; }; return this.__store.setState(o => { var s; return { ...o, matches: o.matches.map(r), cachedMatches: o.cachedMatches.map(r), pendingMatches: (s = o.pendingMatches) == null ? void 0 : s.map(r) }; }), this.load(); }, this.resolveRedirect = t => { const r = t; return r.href || (r.href = this.buildLocation(r).href), r; }, this.clearCache = t => { const r = t?.filter; r !== void 0 ? this.__store.setState(o => ({ ...o, cachedMatches: o.cachedMatches.filter(s => !r(s)) })) : this.__store.setState(o => ({ ...o, cachedMatches: [] })); }, this.clearExpiredCache = () => { const t = r => { const o = this.looseRoutesById[r.routeId]; if (!o.options.loader)
        return !0; const s = (r.preload ? o.options.preloadGcTime ?? this.options.defaultPreloadGcTime : o.options.gcTime ?? this.options.defaultGcTime) ?? 5 * 60 * 1e3; return !(r.status !== "error" && Date.now() - r.updatedAt < s); }; this.clearCache({ filter: t }); }, this.preloadRoute = async (t) => { const r = this.buildLocation(t); let o = this.matchRoutes(r, { throwOnError: !0, preload: !0, dest: t }); const s = new Set([...this.state.matches, ...this.state.pendingMatches ?? []].map(a => a.id)), i = new Set([...s, ...this.state.cachedMatches.map(a => a.id)]); this.__store.batch(() => { o.forEach(a => { i.has(a.id) || this.__store.setState(u => ({ ...u, cachedMatches: [...u.cachedMatches, a] })); }); }); try {
        return o = await this.loadMatches({ matches: o, location: r, preload: !0, updateMatch: (a, u) => { s.has(a) ? o = o.map(l => l.id === a ? u(l) : l) : this.updateMatch(a, u); } }), o;
    }
    catch (a) {
        if (ue(a))
            return a.reloadDocument ? void 0 : await this.preloadRoute({ ...a, _fromLocation: r });
        console.error(a);
        return;
    } }, this.matchRoute = (t, r) => { const o = { ...t, to: t.to ? this.resolvePathWithBase(t.from || "", t.to) : void 0, params: t.params || {}, leaveParams: !0 }, s = this.buildLocation(o); if (r?.pending && this.state.status !== "pending")
        return !1; const a = (r?.pending === void 0 ? !this.state.isLoading : r.pending) ? this.latestLocation : this.state.resolvedLocation, u = Le(this.basepath, a.pathname, { ...r, to: s.pathname }); return !u || t.params && !me(u, t.params, { partial: !0 }) ? !1 : u && (r?.includeSearch ?? !0) ? me(a.search, s.search, { partial: !0 }) ? u : !1 : u; }, this.dehydrate = () => { var t; const r = ((t = this.options.errorSerializer) == null ? void 0 : t.serialize) ?? Br; return { state: { dehydratedMatches: this.state.matches.map(o => ({ ...Me(o, ["id", "status", "updatedAt"]), error: o.error ? { data: r(o.error), __isServerError: !0 } : void 0 })) }, manifest: this.manifest }; }, this.hydrate = () => { var t, r, o; let s; typeof document < "u" && (s = this.options.transformer.parse((t = window.__TSR__) == null ? void 0 : t.dehydrated)), J(s), this.dehydratedData = s.payload, (o = (r = this.options).hydrate) == null || o.call(r, s.payload); const i = s.router.state, a = this.matchRoutes(this.state.location).map(u => { const l = i.dehydratedMatches.find(c => c.id === u.id); return J(l, `Could not find a client-side match for dehydrated match with id: ${u.id}!`), { ...u, ...l }; }); this.__store.setState(u => ({ ...u, matches: a })), this.manifest = s.router.manifest; }, this.injectedHtml = [], this.injectHtml = t => { const r = () => (this.injectedHtml = this.injectedHtml.filter(o => o !== r), t); this.injectedHtml.push(r); }, this.injectScript = (t, r) => { this.injectHtml(`<script class='tsr-once'>${t}; if (typeof __TSR__ !== 'undefined') __TSR__.cleanScripts()<\/script>`); }, this.streamedKeys = new Set, this.getStreamedValue = t => { var r; if (this.isServer)
        return; const o = (r = window.__TSR__) == null ? void 0 : r.streamedValues[t]; if (o)
        return o.parsed || (o.parsed = this.options.transformer.parse(o.value)), o.parsed; }, this.streamValue = (t, r) => { var o; this.streamedKeys.has(t), this.streamedKeys.add(t), this.injectScript(`__TSR__.streamedValues['${t}'] = { value: ${(o = this.serializer) == null ? void 0 : o.call(this, this.options.transformer.stringify(r))}}`); }, this._handleNotFound = (t, r, { updateMatch: o = this.updateMatch } = {}) => { const s = Object.fromEntries(t.map(u => [u.routeId, u])); let i = (r.global ? this.looseRoutesById[G] : this.looseRoutesById[r.routeId]) || this.looseRoutesById[G]; for (; !i.options.notFoundComponent && !this.options.defaultNotFoundComponent && i.id !== G;)
        i = i.parentRoute, J(i); const a = s[i.id]; J(a, "Could not find match for route: " + i.id), o(a.id, u => ({ ...u, status: "notFound", error: r, isFetching: !1 })), r.routerCode === "BEFORE_LOAD" && i.parentRoute && (r.routeId = i.parentRoute.id, this._handleNotFound(t, r, { updateMatch: o })); }, this.hasNotFoundMatch = () => this.__store.state.matches.some(t => t.status === "notFound" || t.globalNotFound), this.update({ defaultPreloadDelay: 50, defaultPendingMs: 1e3, defaultPendingMinMs: 500, context: void 0, ...n, caseSensitive: n.caseSensitive ?? !1, notFoundMode: n.notFoundMode ?? "fuzzy", stringifySearch: n.stringifySearch ?? br, parseSearch: n.parseSearch ?? yr, transformer: n.transformer ?? Fr }), typeof document < "u" && (window.__TSR__ROUTER__ = this); }
    get state() { return this.__store.state; }
    get looseRoutesById() { return this.routesById; }
    matchRoutes(n, t, r) { return typeof n == "string" ? this.matchRoutesInternal({ pathname: n, search: t }, r) : this.matchRoutesInternal(n, t); }
    matchRoutesInternal(n, t) { const { foundRoute: r, matchedRoutes: o, routeParams: s } = this.getMatchedRoutes(n, t?.dest); let i = !1; (r ? r.path !== "/" && s["**"] : ce(n.pathname)) && (this.options.notFoundRoute ? o.push(this.options.notFoundRoute) : i = !0); const a = (() => { if (i) {
        if (this.options.notFoundMode !== "root")
            for (let c = o.length - 1; c >= 0; c--) {
                const d = o[c];
                if (d.children)
                    return d.id;
            }
        return G;
    } })(), u = o.map(c => { var d; let h; const f = ((d = c.options.params) == null ? void 0 : d.parse) ?? c.options.parseParams; if (f)
        try {
            const v = f(s);
            Object.assign(s, v);
        }
        catch (v) {
            if (h = new Ar(v.message, { cause: v }), t?.throwOnError)
                throw h;
            return h;
        } }), l = []; return o.forEach((c, d) => { var h, f, v, m, b, T, I, F; const g = l[d - 1], [S, O] = (() => { const _ = g?.search ?? n.search; try {
        const E = Ke(c.options.validateSearch, _) ?? {};
        return [{ ..._, ...E }, void 0];
    }
    catch (E) {
        const j = new Ge(E.message, { cause: E });
        if (t?.throwOnError)
            throw j;
        return [_, j];
    } })(), y = ((f = (h = c.options).loaderDeps) == null ? void 0 : f.call(h, { search: S })) ?? "", L = y ? JSON.stringify(y) : "", A = Re({ path: c.fullPath, params: s, decodeCharMap: this.pathParamsDecodeCharMap }), x = Re({ path: c.id, params: s, leaveWildcards: !0, decodeCharMap: this.pathParamsDecodeCharMap }) + L, w = this.getMatch(x), M = this.state.matches.find(_ => _.routeId === c.id), B = M ? "stay" : "enter"; let C; if (w)
        C = { ...w, cause: B, params: M ? Y(M.params, s) : s, search: Y(M ? M.search : w.search, S) };
    else {
        const _ = c.options.loader || c.options.beforeLoad || c.lazyFn || Or(c) ? "pending" : "success";
        C = { id: x, index: d, routeId: c.id, params: M ? Y(M.params, s) : s, pathname: re([this.basepath, A]), updatedAt: Date.now(), search: M ? Y(M.search, S) : S, searchError: void 0, status: _, isFetching: !1, error: void 0, paramsError: u[d], __routeContext: {}, __beforeLoadContext: {}, context: {}, abortController: new AbortController, fetchCount: 0, cause: B, loaderDeps: M ? Y(M.loaderDeps, y) : y, invalid: !1, preload: !1, links: void 0, scripts: void 0, meta: void 0, staticData: c.options.staticData || {}, loadPromise: he(), fullPath: c.fullPath };
    } const z = (m = (v = c.options).head) == null ? void 0 : m.call(v, { matches: l, match: C, params: C.params, loaderData: C.loaderData ?? void 0 }); C.links = z?.links, C.scripts = z?.scripts, C.meta = z?.meta, C.status === "success" && (C.headers = (T = (b = c.options).headers) == null ? void 0 : T.call(b, { loaderData: C.loaderData })), t?.preload || (C.globalNotFound = a === c.id), C.searchError = O; const P = g?.id ? g.context ?? this.options.context ?? {} : this.options.context ?? {}; if (C.context = { ...P, ...C.__routeContext, ...C.__beforeLoadContext }, !w && t?._buildLocation !== !0) {
        const _ = { deps: y, params: C.params, context: C.context, location: n, navigate: E => this.navigate({ ...E, _fromLocation: n }), buildLocation: this.buildLocation, cause: C.cause, abortController: C.abortController, preload: !!C.preload, matches: l };
        C.__routeContext = ((F = (I = c.options).context) == null ? void 0 : F.call(I, _)) ?? {}, C.context = { ...P, ...C.__routeContext, ...C.__beforeLoadContext };
    } l.push(C); }), l; }
}
class Ge extends Error {
}
class Ar extends Error {
}
function $r(e) { return { loadedAt: 0, isLoading: !1, isTransitioning: !1, status: "idle", resolvedLocation: { ...e }, location: e, matches: [], pendingMatches: [], cachedMatches: [], statusCode: 200 }; }
function Br(e) { return e instanceof Error ? { name: e.name, message: e.message } : { data: e }; }
function pt(e) { return !(typeof e == "object" && e && "data" in e) || !("__isServerError" in e && e.__isServerError) || !(typeof e.data == "object" && e.data) ? !1 : e.__isServerError === !0; }
function mt(e) { if ("name" in e && "message" in e) {
    const n = new Error(e.message);
    return n.name = e.name, n;
} return e.data; }
const Oe = k.createContext(void 0), Dr = k.createContext(void 0);
function le(e) { const n = k.useContext(e.from ? Dr : Oe); return q({ select: r => { const o = r.matches.find(s => e.from ? e.from === s.routeId : s.id === n); if (J(!((e.shouldThrow ?? !0) && !o), `Could not find ${e.from ? `an active match from "${e.from}"` : "a nearest match!"}`), o !== void 0)
        return e.select ? e.select(o) : o; }, structuralSharing: e.structuralSharing }); }
function zr(e) { return le({ from: e.from, strict: e.strict, structuralSharing: e.structuralSharing, select: n => e.select ? e.select(n.loaderData) : n.loaderData }); }
function Nr(e) { const { select: n, ...t } = e; return le({ ...t, select: r => n ? n(r.loaderDeps) : r.loaderDeps }); }
function Ur(e) { return le({ from: e.from, strict: e.strict, structuralSharing: e.structuralSharing, select: n => e.select ? e.select(n.params) : n.params }); }
function Vr(e) { return le({ from: e.from, strict: e.strict, structuralSharing: e.structuralSharing, select: n => e.select ? e.select(n.search) : n.search }); }
function Hr(e) { const { navigate: n } = oe(); return k.useCallback(t => n({ ...t }), [n]); }
class Mt {
    constructor(n) { this.init = t => { var r, o; this.originalIndex = t.originalIndex; const s = this.options, i = !s?.path && !s?.id; this.parentRoute = (o = (r = this.options).getParentRoute) == null ? void 0 : o.call(r), i ? this._path = G : J(this.parentRoute); let a = i ? G : s.path; a && a !== "/" && (a = Ye(a)); const u = s?.id || a; let l = i ? G : re([this.parentRoute.id === G ? "" : this.parentRoute.id, u]); a === G && (a = "/"), l !== G && (l = re(["/", l])); const c = l === G ? "/" : re([this.parentRoute.fullPath, a]); this._path = a, this._id = l, this._fullPath = c, this._to = c, this._ssr = s?.ssr ?? t.defaultSsr ?? !0; }, this.updateLoader = t => (Object.assign(this.options, t), this), this.update = t => (Object.assign(this.options, t), this), this.lazy = t => (this.lazyFn = t, this), this.useMatch = t => le({ select: t?.select, from: this.id, structuralSharing: t?.structuralSharing }), this.useRouteContext = t => le({ ...t, from: this.id, select: r => t?.select ? t.select(r.context) : r.context }), this.useSearch = t => Vr({ select: t?.select, structuralSharing: t?.structuralSharing, from: this.id }), this.useParams = t => Ur({ select: t?.select, structuralSharing: t?.structuralSharing, from: this.id }), this.useLoaderDeps = t => Nr({ ...t, from: this.id }), this.useLoaderData = t => zr({ ...t, from: this.id }), this.useNavigate = () => Hr({ from: this.id }), this.options = n || {}, this.isRoot = !n?.getParentRoute, J(!(n?.id && n?.path)), this.$$typeof = Symbol.for("react.memo"); }
    get to() { return this._to; }
    get id() { return this._id; }
    get path() { return this._path; }
    get fullPath() { return this._fullPath; }
    get ssr() { return this._ssr; }
    addChildren(n) { return this._addFileChildren(n); }
    _addFileChildren(n) { return Array.isArray(n) && (this.children = n), typeof n == "object" && n !== null && (this.children = Object.values(n)), this; }
}
function Uo(e) { return new Mt(e); }
class Wr extends Mt {
    constructor(n) { super(n); }
    addChildren(n) { return super.addChildren(n), this; }
    _addFileChildren(n) { return super._addFileChildren(n), this; }
    _addFileTypes() { return this; }
}
function Vo(e) { return new Wr(e); }
function Ee(e) { return R.jsx(R.Fragment, { children: e.children }); }
function Et(e, n, t) { return n.options.notFoundComponent ? R.jsx(n.options.notFoundComponent, { data: t }) : e.options.defaultNotFoundComponent ? R.jsx(e.options.defaultNotFoundComponent, { data: t }) : R.jsx(Ir, {}); }
const kt = k.memo(function ({ matchId: n }) { var t, r; const o = oe(), s = q({ select: b => { var T; return (T = b.matches.find(I => I.id === n)) == null ? void 0 : T.routeId; } }); J(s); const i = o.routesById[s], a = i.options.pendingComponent ?? o.options.defaultPendingComponent, u = a ? R.jsx(a, {}) : null, l = i.options.errorComponent ?? o.options.defaultErrorComponent, c = i.options.onCatch ?? o.options.defaultOnCatch, d = i.isRoot ? i.options.notFoundComponent ?? ((t = o.options.notFoundRoute) == null ? void 0 : t.options.component) : i.options.notFoundComponent, h = (!i.isRoot || i.options.wrapInSuspense) && (i.options.wrapInSuspense ?? a ?? ((r = i.options.errorComponent) == null ? void 0 : r.preload)) ? k.Suspense : Ee, f = l ? Xe : Ee, v = d ? Tr : Ee, m = q({ select: b => b.loadedAt }); return R.jsx(Oe.Provider, { value: n, children: R.jsx(h, { fallback: u, children: R.jsx(f, { getResetKey: () => m, errorComponent: l || Fe, onCatch: (b, T) => { if (ee(b))
                throw b; c?.(b, T); }, children: R.jsx(v, { fallback: b => { if (!d || b.routeId && b.routeId !== s || !b.routeId && !i.isRoot)
                    throw b; return k.createElement(d, b); }, children: R.jsx(Kr, { matchId: n }) }) }) }) }); }), Kr = k.memo(function ({ matchId: n }) { var t, r, o, s, i; const a = oe(), { match: u, matchIndex: l, routeId: c } = q({ select: v => { const m = v.matches.findIndex(I => I.id === n), b = v.matches[m]; return { routeId: b.routeId, matchIndex: m, match: Me(b, ["id", "status", "error"]) }; }, structuralSharing: !0 }), d = a.routesById[c], h = k.useMemo(() => { const v = d.options.component ?? a.options.defaultComponent; return v ? R.jsx(v, {}) : R.jsx(qr, {}); }, [d.options.component, a.options.defaultComponent]), f = (d.options.errorComponent ?? a.options.defaultErrorComponent) || Fe; if (u.status === "notFound") {
    let v;
    return pt(u.error) ? v = (((t = a.options.errorSerializer) == null ? void 0 : t.deserialize) ?? mt)(u.error.data) : v = u.error, J(ee(v)), Et(a, d, v);
} if (u.status === "redirected")
    throw J(ue(u.error)), (r = a.getMatch(u.id)) == null ? void 0 : r.loadPromise; if (u.status === "error") {
    if (a.isServer)
        return R.jsx(f, { error: u.error, info: { componentStack: "" } });
    throw pt(u.error) ? (((o = a.options.errorSerializer) == null ? void 0 : o.deserialize) ?? mt)(u.error.data) : u.error;
} if (u.status === "pending") {
    const v = d.options.pendingMinMs ?? a.options.defaultPendingMinMs;
    if (v && !((s = a.getMatch(u.id)) != null && s.minPendingPromise) && !a.isServer) {
        const m = he();
        Promise.resolve().then(() => { a.updateMatch(u.id, b => ({ ...b, minPendingPromise: m })); }), setTimeout(() => { m.resolve(), a.updateMatch(u.id, b => ({ ...b, minPendingPromise: void 0 })); }, v);
    }
    throw (i = a.getMatch(u.id)) == null ? void 0 : i.loadPromise;
} return R.jsxs(R.Fragment, { children: [h, a.AfterEachMatch ? R.jsx(a.AfterEachMatch, { match: u, matchIndex: l }) : null] }); }), qr = k.memo(function () { const n = oe(), t = k.useContext(Oe), r = q({ select: l => { var c; return (c = l.matches.find(d => d.id === t)) == null ? void 0 : c.routeId; } }), o = n.routesById[r], s = q({ select: l => { const d = l.matches.find(h => h.id === t); return J(d), d.globalNotFound; } }), i = q({ select: l => { var c; const d = l.matches, h = d.findIndex(f => f.id === t); return (c = d[h + 1]) == null ? void 0 : c.id; } }); if (s)
    return Et(n, o, void 0); if (!i)
    return null; const a = R.jsx(kt, { matchId: i }), u = n.options.defaultPendingComponent ? R.jsx(n.options.defaultPendingComponent, {}) : null; return t === G ? R.jsx(k.Suspense, { fallback: u, children: a }) : a; }), Gr = "Error preloading route! ☝️";
function Jr(e, n) { const t = oe(), [r, o] = k.useState(!1), s = k.useRef(!1), i = Cr(n), { activeProps: a = () => ({ className: "active" }), inactiveProps: u = () => ({}), activeOptions: l, to: c, preload: d, preloadDelay: h, hashScrollIntoView: f, replace: v, startTransition: m, resetScroll: b, viewTransition: T, children: I, target: F, disabled: g, style: S, className: O, onClick: y, onFocus: L, onMouseEnter: A, onMouseLeave: x, onTouchStart: w, ignoreBlocker: M, ...B } = e, { params: C, search: z, hash: p, state: P, mask: _, ...E } = B, j = k.useMemo(() => { if (B.reloadDocument)
    return "external"; try {
    return new URL(`${c}`), "external";
}
catch { } return "internal"; }, [c]), K = q({ select: N => N.location.search, structuralSharing: !0 }); e = { from: le({ strict: !1, select: N => N.pathname }), ...e }; const V = k.useMemo(() => t.buildLocation(e), [t, e, K]), $ = k.useMemo(() => d ?? t.options.defaultPreload, [t.options.defaultPreload, d]), D = h ?? t.options.defaultPreloadDelay ?? 0, X = q({ select: N => { if (l?.exact) {
        if (!Rr(N.location.pathname, V.pathname, t.basepath))
            return !1;
    }
    else {
        const H = ke(N.location.pathname, t.basepath).split("/");
        if (!ke(V.pathname, t.basepath).split("/").every((Qt, er) => Qt === H[er]))
            return !1;
    } return (l?.includeSearch ?? !0) && !me(N.location.search, V.search, { partial: !l?.exact, ignoreUndefined: !l?.explicitUndefined }) ? !1 : l?.includeHash ? N.location.hash === V.hash : !0; } }), Z = k.useCallback(() => { t.preloadRoute(e).catch(N => { console.warn(N), console.warn(Gr); }); }, [e, t]), de = k.useCallback(N => { N?.isIntersecting && Z(); }, [Z]); if (xr(i, de, { rootMargin: "100px" }, { disabled: !!g || $ !== "viewport" }), Pe(() => { s.current || !g && $ === "render" && (Z(), s.current = !0); }, [g, Z, $]), j === "external")
    return { ...E, ref: i, type: j, href: c, ...I && { children: I }, ...F && { target: F }, ...g && { disabled: g }, ...S && { style: S }, ...O && { className: O }, ...y && { onClick: y }, ...L && { onFocus: L }, ...A && { onMouseEnter: A }, ...x && { onMouseLeave: x }, ...w && { onTouchStart: w } }; const we = N => { if (!g && !Zr(N) && !N.defaultPrevented && (!F || F === "_self") && N.button === 0) {
    N.preventDefault(), tr.flushSync(() => { o(!0); });
    const H = t.subscribe("onResolved", () => { H(), o(!1); });
    t.buildAndCommitLocation({ ...e, replace: v, resetScroll: b, hashScrollIntoView: f, startTransition: m, viewTransition: T, ignoreBlocker: M });
} }, se = N => { g || $ && Z(); }, W = se, Q = N => { if (g)
    return; const H = N.target || {}; if ($) {
    if (H.preloadTimeout)
        return;
    H.preloadTimeout = setTimeout(() => { H.preloadTimeout = null, Z(); }, D);
} }, ne = N => { if (g)
    return; const H = N.target || {}; H.preloadTimeout && (clearTimeout(H.preloadTimeout), H.preloadTimeout = null); }, ie = N => H => { var Ae; (Ae = H.persist) == null || Ae.call(H), N.filter(Boolean).forEach(Qe => { H.defaultPrevented || Qe(H); }); }, be = X ? pe(a, {}) ?? {} : {}, _e = X ? {} : pe(u, {}), te = [O, be.className, _e.className].filter(Boolean).join(" "), ae = { ...S, ...be.style, ..._e.style }; return { ...E, ...be, ..._e, href: g ? void 0 : V.maskedLocation ? t.history.createHref(V.maskedLocation.href) : t.history.createHref(V.href), ref: i, onClick: ie([y, we]), onFocus: ie([L, se]), onMouseEnter: ie([A, Q]), onMouseLeave: ie([x, ne]), onTouchStart: ie([w, W]), disabled: !!g, target: F, ...Object.keys(ae).length && { style: ae }, ...te && { className: te }, ...g && { role: "link", "aria-disabled": !0 }, ...X && { "data-status": "active", "aria-current": "page" }, ...r && { "data-transitioning": "transitioning" } }; }
const Ho = k.forwardRef((e, n) => { const { _asChild: t, ...r } = e, { type: o, ref: s, ...i } = Jr(r, n), a = typeof r.children == "function" ? r.children({ isActive: i["data-status"] === "active" }) : r.children; return typeof t > "u" && delete i.disabled, k.createElement(t || "a", { ...i, ref: s }, a); });
function Zr(e) { return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey); }
function Yr() { const e = oe(), n = k.useRef({ router: e, mounted: !1 }), t = q({ select: ({ isLoading: d }) => d }), [r, o] = k.useState(!1), s = q({ select: d => d.matches.some(h => h.status === "pending"), structuralSharing: !0 }), i = He(t), a = t || r || s, u = He(a), l = t || s, c = He(l); return e.isServer || (e.startReactTransition = d => { o(!0), k.startTransition(() => { d(), o(!1); }); }), k.useEffect(() => { const d = e.history.subscribe(e.load), h = e.buildLocation({ to: e.latestLocation.pathname, search: !0, params: !0, hash: !0, state: !0, _includeValidateSearch: !0 }); return ce(e.latestLocation.href) !== ce(h.href) && e.commitLocation({ ...h, replace: !0 }), () => { d(); }; }, [e, e.history]), Pe(() => { var d; if (typeof window < "u" && ((d = window.__TSR__) != null && d.dehydrated) || n.current.router === e && n.current.mounted)
    return; n.current = { router: e, mounted: !0 }, (async () => { try {
    await e.load();
}
catch (f) {
    console.error(f);
} })(); }, [e]), Pe(() => { if (i && !t) {
    const d = e.state.location, h = e.state.resolvedLocation, f = h.pathname !== d.pathname, v = h.href !== d.href;
    e.emit({ type: "onLoad", fromLocation: h, toLocation: d, pathChanged: f, hrefChanged: v });
} }, [i, e, t]), Pe(() => { if (c && !l) {
    const d = e.state.location, h = e.state.resolvedLocation, f = h.pathname !== d.pathname, v = h.href !== d.href;
    e.emit({ type: "onBeforeRouteMount", fromLocation: h, toLocation: d, pathChanged: f, hrefChanged: v });
} }, [l, c, e]), Pe(() => { if (u && !a) {
    const d = e.state.location, h = e.state.resolvedLocation, f = h.pathname !== d.pathname, v = h.href !== d.href;
    if (e.emit({ type: "onResolved", fromLocation: h, toLocation: d, pathChanged: f, hrefChanged: v }), e.__store.setState(m => ({ ...m, status: "idle", resolvedLocation: m.location })), typeof document < "u" && document.querySelector) {
        const m = e.state.location.state.__hashScrollIntoViewOptions ?? !0;
        if (m && e.state.location.hash !== "") {
            const b = document.getElementById(e.state.location.hash);
            b && b.scrollIntoView(m);
        }
    }
} }, [a, u, e]), null; }
function Xr() { const e = oe(), n = e.options.defaultPendingComponent ? R.jsx(e.options.defaultPendingComponent, {}) : null, t = e.isServer || typeof document < "u" && window.__TSR__ ? Ee : k.Suspense, r = R.jsxs(t, { fallback: n, children: [R.jsx(Yr, {}), R.jsx(Qr, {})] }); return e.options.InnerWrap ? R.jsx(e.options.InnerWrap, { children: r }) : r; }
function Qr() { const e = q({ select: t => { var r; return (r = t.matches[0]) == null ? void 0 : r.id; } }), n = q({ select: t => t.loadedAt }); return R.jsx(Oe.Provider, { value: e, children: R.jsx(Xe, { getResetKey: () => n, errorComponent: Fe, onCatch: t => { t.message || t.toString(); }, children: e ? R.jsx(kt, { matchId: e }) : null }) }); }
function en({ router: e, children: n, ...t }) { e.update({ ...e.options, ...t, context: { ...e.options.context, ...t.context } }); const r = Rt(), o = R.jsx(r.Provider, { value: e, children: n }); return e.options.Wrap ? R.jsx(e.options.Wrap, { children: o }) : o; }
function Wo({ router: e, ...n }) { return R.jsx(en, { router: e, ...n, children: R.jsx(Xr, {}) }); }
var qe = { exports: {} }; /*!
   Copyright (c) 2018 Jed Watson.
   Licensed under the MIT License (MIT), see
   http://jedwatson.github.io/classnames
*/
var vt;
function tn() { return vt || (vt = 1, function (e) { (function () { var n = {}.hasOwnProperty; function t() { for (var s = "", i = 0; i < arguments.length; i++) {
    var a = arguments[i];
    a && (s = o(s, r(a)));
} return s; } function r(s) { if (typeof s == "string" || typeof s == "number")
    return s; if (typeof s != "object")
    return ""; if (Array.isArray(s))
    return t.apply(null, s); if (s.toString !== Object.prototype.toString && !s.toString.toString().includes("[native code]"))
    return s.toString(); var i = ""; for (var a in s)
    n.call(s, a) && s[a] && (i = o(i, a)); return i; } function o(s, i) { return i ? s ? s + " " + i : s + i : s; } e.exports ? (t.default = t, e.exports = t) : window.classNames = t; })(); }(qe)), qe.exports; }
var rn = tn();
const Ko = rr(rn);
var nn = typeof global == "object" && global && global.Object === Object && global, on = typeof self == "object" && self && self.Object === Object && self, sn = nn || on || Function("return this")(), ye = sn.Symbol, Tt = Object.prototype, an = Tt.hasOwnProperty, un = Tt.toString, Se = ye ? ye.toStringTag : void 0;
function cn(e) { var n = an.call(e, Se), t = e[Se]; try {
    e[Se] = void 0;
    var r = !0;
}
catch { } var o = un.call(e); return r && (n ? e[Se] = t : delete e[Se]), o; }
var ln = Object.prototype, dn = ln.toString;
function hn(e) { return dn.call(e); }
var fn = "[object Null]", pn = "[object Undefined]", gt = ye ? ye.toStringTag : void 0;
function mn(e) { return e == null ? e === void 0 ? pn : fn : gt && gt in Object(e) ? cn(e) : hn(e); }
function vn(e) { return e != null && typeof e == "object"; }
var gn = "[object Symbol]";
function yn(e) { return typeof e == "symbol" || vn(e) && mn(e) == gn; }
function bn(e, n) { for (var t = -1, r = e == null ? 0 : e.length, o = Array(r); ++t < r;)
    o[t] = n(e[t], t, e); return o; }
var _n = Array.isArray, Sn = 1 / 0, yt = ye ? ye.prototype : void 0, bt = yt ? yt.toString : void 0;
function It(e) { if (typeof e == "string")
    return e; if (_n(e))
    return bn(e, It) + ""; if (yn(e))
    return bt ? bt.call(e) : ""; var n = e + ""; return n == "0" && 1 / e == -Sn ? "-0" : n; }
function je(e) { return e == null ? "" : It(e); }
function Pn(e, n, t) { var r = -1, o = e.length; n < 0 && (n = -n > o ? 0 : o + n), t = t > o ? o : t, t < 0 && (t += o), o = n > t ? 0 : t - n >>> 0, n >>>= 0; for (var s = Array(o); ++r < o;)
    s[r] = e[r + n]; return s; }
function xn(e, n, t) { var r = e.length; return t = t === void 0 ? r : t, !n && t >= r ? e : Pn(e, n, t); }
var Cn = "\\ud800-\\udfff", wn = "\\u0300-\\u036f", Rn = "\\ufe20-\\ufe2f", Ln = "\\u20d0-\\u20ff", Mn = wn + Rn + Ln, En = "\\ufe0e\\ufe0f", kn = "\\u200d", Tn = RegExp("[" + kn + Cn + Mn + En + "]");
function Ft(e) { return Tn.test(e); }
function In(e) { return e.split(""); }
var Ot = "\\ud800-\\udfff", Fn = "\\u0300-\\u036f", On = "\\ufe20-\\ufe2f", jn = "\\u20d0-\\u20ff", An = Fn + On + jn, $n = "\\ufe0e\\ufe0f", Bn = "[" + Ot + "]", Je = "[" + An + "]", Ze = "\\ud83c[\\udffb-\\udfff]", Dn = "(?:" + Je + "|" + Ze + ")", jt = "[^" + Ot + "]", At = "(?:\\ud83c[\\udde6-\\uddff]){2}", $t = "[\\ud800-\\udbff][\\udc00-\\udfff]", zn = "\\u200d", Bt = Dn + "?", Dt = "[" + $n + "]?", Nn = "(?:" + zn + "(?:" + [jt, At, $t].join("|") + ")" + Dt + Bt + ")*", Un = Dt + Bt + Nn, Vn = "(?:" + [jt + Je + "?", Je, At, $t, Bn].join("|") + ")", Hn = RegExp(Ze + "(?=" + Ze + ")|" + Vn + Un, "g");
function Wn(e) { return e.match(Hn) || []; }
function Kn(e) { return Ft(e) ? Wn(e) : In(e); }
function qn(e) { return function (n) { n = je(n); var t = Ft(n) ? Kn(n) : void 0, r = t ? t[0] : n.charAt(0), o = t ? xn(t, 1).join("") : n.slice(1); return r[e]() + o; }; }
var Gn = qn("toUpperCase");
function qo(e) { return Gn(je(e).toLowerCase()); }
function Jn(e, n, t, r) { for (var o = -1, s = e == null ? 0 : e.length; ++o < s;)
    t = n(t, e[o], o, e); return t; }
function Zn(e) { return function (n) { return e?.[n]; }; }
var Yn = { À: "A", Á: "A", Â: "A", Ã: "A", Ä: "A", Å: "A", à: "a", á: "a", â: "a", ã: "a", ä: "a", å: "a", Ç: "C", ç: "c", Ð: "D", ð: "d", È: "E", É: "E", Ê: "E", Ë: "E", è: "e", é: "e", ê: "e", ë: "e", Ì: "I", Í: "I", Î: "I", Ï: "I", ì: "i", í: "i", î: "i", ï: "i", Ñ: "N", ñ: "n", Ò: "O", Ó: "O", Ô: "O", Õ: "O", Ö: "O", Ø: "O", ò: "o", ó: "o", ô: "o", õ: "o", ö: "o", ø: "o", Ù: "U", Ú: "U", Û: "U", Ü: "U", ù: "u", ú: "u", û: "u", ü: "u", Ý: "Y", ý: "y", ÿ: "y", Æ: "Ae", æ: "ae", Þ: "Th", þ: "th", ß: "ss", Ā: "A", Ă: "A", Ą: "A", ā: "a", ă: "a", ą: "a", Ć: "C", Ĉ: "C", Ċ: "C", Č: "C", ć: "c", ĉ: "c", ċ: "c", č: "c", Ď: "D", Đ: "D", ď: "d", đ: "d", Ē: "E", Ĕ: "E", Ė: "E", Ę: "E", Ě: "E", ē: "e", ĕ: "e", ė: "e", ę: "e", ě: "e", Ĝ: "G", Ğ: "G", Ġ: "G", Ģ: "G", ĝ: "g", ğ: "g", ġ: "g", ģ: "g", Ĥ: "H", Ħ: "H", ĥ: "h", ħ: "h", Ĩ: "I", Ī: "I", Ĭ: "I", Į: "I", İ: "I", ĩ: "i", ī: "i", ĭ: "i", į: "i", ı: "i", Ĵ: "J", ĵ: "j", Ķ: "K", ķ: "k", ĸ: "k", Ĺ: "L", Ļ: "L", Ľ: "L", Ŀ: "L", Ł: "L", ĺ: "l", ļ: "l", ľ: "l", ŀ: "l", ł: "l", Ń: "N", Ņ: "N", Ň: "N", Ŋ: "N", ń: "n", ņ: "n", ň: "n", ŋ: "n", Ō: "O", Ŏ: "O", Ő: "O", ō: "o", ŏ: "o", ő: "o", Ŕ: "R", Ŗ: "R", Ř: "R", ŕ: "r", ŗ: "r", ř: "r", Ś: "S", Ŝ: "S", Ş: "S", Š: "S", ś: "s", ŝ: "s", ş: "s", š: "s", Ţ: "T", Ť: "T", Ŧ: "T", ţ: "t", ť: "t", ŧ: "t", Ũ: "U", Ū: "U", Ŭ: "U", Ů: "U", Ű: "U", Ų: "U", ũ: "u", ū: "u", ŭ: "u", ů: "u", ű: "u", ų: "u", Ŵ: "W", ŵ: "w", Ŷ: "Y", ŷ: "y", Ÿ: "Y", Ź: "Z", Ż: "Z", Ž: "Z", ź: "z", ż: "z", ž: "z", Ĳ: "IJ", ĳ: "ij", Œ: "Oe", œ: "oe", ŉ: "'n", ſ: "s" }, Xn = Zn(Yn), Qn = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, eo = "\\u0300-\\u036f", to = "\\ufe20-\\ufe2f", ro = "\\u20d0-\\u20ff", no = eo + to + ro, oo = "[" + no + "]", so = RegExp(oo, "g");
function io(e) { return e = je(e), e && e.replace(Qn, Xn).replace(so, ""); }
var ao = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
function uo(e) { return e.match(ao) || []; }
var co = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
function lo(e) { return co.test(e); }
var zt = "\\ud800-\\udfff", ho = "\\u0300-\\u036f", fo = "\\ufe20-\\ufe2f", po = "\\u20d0-\\u20ff", mo = ho + fo + po, Nt = "\\u2700-\\u27bf", Ut = "a-z\\xdf-\\xf6\\xf8-\\xff", vo = "\\xac\\xb1\\xd7\\xf7", go = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", yo = "\\u2000-\\u206f", bo = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", Vt = "A-Z\\xc0-\\xd6\\xd8-\\xde", _o = "\\ufe0e\\ufe0f", Ht = vo + go + yo + bo, Wt = "['’]", _t = "[" + Ht + "]", So = "[" + mo + "]", Kt = "\\d+", Po = "[" + Nt + "]", qt = "[" + Ut + "]", Gt = "[^" + zt + Ht + Kt + Nt + Ut + Vt + "]", xo = "\\ud83c[\\udffb-\\udfff]", Co = "(?:" + So + "|" + xo + ")", wo = "[^" + zt + "]", Jt = "(?:\\ud83c[\\udde6-\\uddff]){2}", Zt = "[\\ud800-\\udbff][\\udc00-\\udfff]", fe = "[" + Vt + "]", Ro = "\\u200d", St = "(?:" + qt + "|" + Gt + ")", Lo = "(?:" + fe + "|" + Gt + ")", Pt = "(?:" + Wt + "(?:d|ll|m|re|s|t|ve))?", xt = "(?:" + Wt + "(?:D|LL|M|RE|S|T|VE))?", Yt = Co + "?", Xt = "[" + _o + "]?", Mo = "(?:" + Ro + "(?:" + [wo, Jt, Zt].join("|") + ")" + Xt + Yt + ")*", Eo = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", ko = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", To = Xt + Yt + Mo, Io = "(?:" + [Po, Jt, Zt].join("|") + ")" + To, Fo = RegExp([fe + "?" + qt + "+" + Pt + "(?=" + [_t, fe, "$"].join("|") + ")", Lo + "+" + xt + "(?=" + [_t, fe + St, "$"].join("|") + ")", fe + "?" + St + "+" + Pt, fe + "+" + xt, ko, Eo, Kt, Io].join("|"), "g");
function Oo(e) { return e.match(Fo) || []; }
function jo(e, n, t) { return e = je(e), n = n, n === void 0 ? lo(e) ? Oo(e) : uo(e) : e.match(n) || []; }
var Ao = "['’]", $o = RegExp(Ao, "g");
function Bo(e) { return function (n) { return Jn(jo(io(n).replace($o, "")), e, ""); }; }
var Go = Bo(function (e, n, t) { return e + (t ? "_" : "") + n.toLowerCase(); });
export { Ho as L, qr as O, Wo as R, qo as a, Vo as b, Ko as c, Uo as d, No as e, or as f, zo as r, Go as s };
//# sourceMappingURL=vendor-DYsoeDPq.js.map