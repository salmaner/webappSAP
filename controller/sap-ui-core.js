window["sap-ui-optimized"] = true;
try {
    /*!
     * @overview es6-promise - a tiny implementation of Promises/A+.
     * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
     * @license   Licensed under MIT license
     *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
     * @version   2.3.0
     */
    (function() { "use strict";

        function l(x) {
            return typeof x === 'function' || (typeof x === 'object' && x !== null); }

        function a(x) {
            return typeof x === 'function'; }

        function b(x) {
            return typeof x === 'object' && x !== null; }
        var d;
        if (!Array.isArray) { d = function(x) {
                return Object.prototype.toString.call(x) === '[object Array]'; }; } else { d = Array.isArray; }
        var f = d;
        var g = 0;
        var h = {}.toString;
        var j;
        var k;
        var m = function asap(c, e) { B[g] = c;
            B[g + 1] = e;
            g += 2;
            if (g === 2) {
                if (k) { k(C); } else { E(); } } };

        function n(c) { k = c; }

        function o(c) { m = c; }
        var p = (typeof window !== 'undefined') ? window : undefined;
        var q = p || {};
        var s = q.MutationObserver || q.WebKitMutationObserver;
        var t = typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';
        var u = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

        function v() {
            var c = process.nextTick;
            var e = process.versions.node.match(/^(?:(\d+)\.)?(?:(\d+)\.)?(\*|\d+)$/);
            if (Array.isArray(e) && e[1] === '0' && e[2] === '10') { c = setImmediate; }
            return function() { c(C); }; }

        function w() {
            return function() { j(C); }; }

        function y() {
            var i = 0;
            var c = new s(C);
            var e = document.createTextNode('');
            c.observe(e, { characterData: true });
            return function() { e.data = (i = ++i % 2); }; }

        function z() {
            var c = new MessageChannel();
            c.port1.onmessage = C;
            return function() { c.port2.postMessage(0); }; }

        function A() {
            return function() { setTimeout(C, 1); }; }
        var B = new Array(1000);

        function C() {
            for (var i = 0; i < g; i += 2) {
                var c = B[i];
                var e = B[i + 1];
                c(e);
                B[i] = undefined;
                B[i + 1] = undefined; }
            g = 0; }

        function D() {
            try {
                var r = require;
                var c = r('vertx');
                j = c.runOnLoop || c.runOnContext;
                return w(); } catch (e) {
                return A(); } }
        var E;
        if (t) { E = v(); } else if (s) { E = y(); } else if (u) { E = z(); } else if (p === undefined && typeof require === 'function') { E = D(); } else { E = A(); }

        function F() {}
        var G = void 0;
        var H = 1;
        var I = 2;
        var J = new Y();

        function K() {
            return new TypeError("You cannot resolve a promise with itself"); }

        function L() {
            return new TypeError('A promises callback cannot return that same promise.'); }

        function M(c) {
            try {
                return c.then; } catch (e) { J.error = e;
                return J; } }

        function N(c, i, r, x) {
            try { c.call(i, r, x); } catch (e) {
                return e; } }

        function O(c, e, i) { m(function(c) {
                var r = false;
                var x = N(i, e, function(P) {
                    if (r) {
                        return; }
                    r = true;
                    if (e !== P) { S(c, P); } else { U(c, P); } }, function(P) {
                    if (r) {
                        return; }
                    r = true;
                    V(c, P); }, 'Settle: ' + (c._label || ' unknown promise'));
                if (!r && x) { r = true;
                    V(c, x); } }, c); }

        function Q(c, e) {
            if (e._state === H) { U(c, e._result); } else if (e._state === I) { V(c, e._result); } else { W(e, undefined, function(i) { S(c, i); }, function(r) { V(c, r); }); } }

        function R(c, e) {
            if (e.constructor === c.constructor) { Q(c, e); } else {
                var i = M(e);
                if (i === J) { V(c, J.error); } else if (i === undefined) { U(c, e); } else if (a(i)) { O(c, e, i); } else { U(c, e); } } }

        function S(c, e) {
            if (c === e) { V(c, K()); } else if (l(e)) { R(c, e); } else { U(c, e); } }

        function T(c) {
            if (c._onerror) { c._onerror(c._result); }
            X(c); }

        function U(c, e) {
            if (c._state !== G) {
                return; }
            c._result = e;
            c._state = H;
            if (c._subscribers.length !== 0) { m(X, c); } }

        function V(c, r) {
            if (c._state !== G) {
                return; }
            c._state = I;
            c._result = r;
            m(T, c); }

        function W(c, e, i, r) {
            var x = c._subscribers;
            var P = x.length;
            c._onerror = null;
            x[P] = e;
            x[P + H] = i;
            x[P + I] = r;
            if (P === 0 && c._state) { m(X, c); } }

        function X(c) {
            var e = c._subscribers;
            var r = c._state;
            if (e.length === 0) {
                return; }
            var x, P, t1 = c._result;
            for (var i = 0; i < e.length; i += 3) { x = e[i];
                P = e[i + r];
                if (x) { _(r, x, P, t1); } else { P(t1); } }
            c._subscribers.length = 0; }

        function Y() { this.error = null; }
        var Z = new Y();

        function $(c, i) {
            try {
                return c(i); } catch (e) { Z.error = e;
                return Z; } }

        function _(c, e, i, r) {
            var x = a(i),
                P, t1, u1, v1;
            if (x) { P = $(i, r);
                if (P === Z) { v1 = true;
                    t1 = P.error;
                    P = null; } else { u1 = true; }
                if (e === P) { V(e, L());
                    return; } } else { P = r;
                u1 = true; }
            if (e._state !== G) {} else if (x && u1) { S(e, P); } else if (v1) { V(e, t1); } else if (c === H) { U(e, P); } else if (c === I) { V(e, P); } }

        function a1(c, r) {
            try { r(function resolvePromise(i) { S(c, i); }, function rejectPromise(i) { V(c, i); }); } catch (e) { V(c, e); } }

        function b1(c, i) {
            var e = this;
            e._instanceConstructor = c;
            e.promise = new c(F);
            if (e._validateInput(i)) { e._input = i;
                e.length = i.length;
                e._remaining = i.length;
                e._init();
                if (e.length === 0) { U(e.promise, e._result); } else { e.length = e.length || 0;
                    e._enumerate();
                    if (e._remaining === 0) { U(e.promise, e._result); } } } else { V(e.promise, e._validationError()); } }
        b1.prototype._validateInput = function(i) {
            return f(i); };
        b1.prototype._validationError = function() {
            return new Error('Array Methods must be provided an Array'); };
        b1.prototype._init = function() { this._result = new Array(this.length); };
        var c1 = b1;
        b1.prototype._enumerate = function() {
            var e = this;
            var c = e.length;
            var r = e.promise;
            var x = e._input;
            for (var i = 0; r._state === G && i < c; i++) { e._eachEntry(x[i], i); } };
        b1.prototype._eachEntry = function(e, i) {
            var r = this;
            var c = r._instanceConstructor;
            if (b(e)) {
                if (e.constructor === c && e._state !== G) { e._onerror = null;
                    r._settledAt(e._state, i, e._result); } else { r._willSettleAt(c.resolve(e), i); } } else { r._remaining--;
                r._result[i] = e; } };
        b1.prototype._settledAt = function(c, i, e) {
            var r = this;
            var x = r.promise;
            if (x._state === G) { r._remaining--;
                if (c === I) { V(x, e); } else { r._result[i] = e; } }
            if (r._remaining === 0) { U(x, r._result); } };
        b1.prototype._willSettleAt = function(c, i) {
            var e = this;
            W(c, undefined, function(r) { e._settledAt(H, i, r); }, function(r) { e._settledAt(I, i, r); }); };

        function d1(e) {
            return new c1(this, e).promise; }
        var e1 = d1;

        function f1(e) {
            var c = this;
            var r = new c(F);
            if (!f(e)) { V(r, new TypeError('You must pass an array to race.'));
                return r; }
            var x = e.length;

            function P(u1) { S(r, u1); }

            function t1(u1) { V(r, u1); }
            for (var i = 0; r._state === G && i < x; i++) { W(c.resolve(e[i]), undefined, P, t1); }
            return r; }
        var g1 = f1;

        function h1(c) {
            var e = this;
            if (c && typeof c === 'object' && c.constructor === e) {
                return c; }
            var i = new e(F);
            S(i, c);
            return i; }
        var i1 = h1;

        function j1(r) {
            var c = this;
            var e = new c(F);
            V(e, r);
            return e; }
        var k1 = j1;
        var l1 = 0;

        function m1() {
            throw new TypeError('You must pass a resolver function as the first argument to the promise constructor'); }

        function n1() {
            throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function."); }
        var o1 = p1;

        function p1(r) { this._id = l1++;
            this._state = undefined;
            this._result = undefined;
            this._subscribers = [];
            if (F !== r) {
                if (!a(r)) { m1(); }
                if (!(this instanceof p1)) { n1(); }
                a1(this, r); } }
        p1.all = e1;
        p1.race = g1;
        p1.resolve = i1;
        p1.reject = k1;
        p1._setScheduler = n;
        p1._setAsap = o;
        p1._asap = m;
        p1.prototype = { constructor: p1, then: function(c, e) {
                var i = this;
                var r = i._state;
                if (r === H && !c || r === I && !e) {
                    return this; }
                var x = new this.constructor(F);
                var P = i._result;
                if (r) {
                    var t1 = arguments[r - 1];
                    m(function() { _(r, x, t1, P); }); } else { W(i, x, c, e); }
                return x; }, 'catch': function(c) {
                return this.then(null, c); } };

        function q1() {
            var c;
            if (typeof global !== 'undefined') { c = global; } else if (typeof self !== 'undefined') { c = self; } else {
                try { c = Function('return this')(); } catch (e) {
                    throw new Error('polyfill failed because global object is unavailable in this environment'); } }
            var P = c.Promise;
            if (P && Object.prototype.toString.call(P.resolve()).indexOf('[object ') === 0) {
                return; }
            c.Promise = o1; }
        var r1 = q1;
        var s1 = { 'Promise': o1, 'polyfill': r1 };
        if (typeof define === 'function' && define['amd']) { define('sap/ui/thirdparty/es6-promise', function() {
                return s1; }); } else if (typeof module !== 'undefined' && module['exports']) { module['exports'] = s1; } else if (typeof this !== 'undefined') { this['ES6Promise'] = s1; }
        r1(); }).call(this);
    /*!
     * UI development toolkit for HTML5 (OpenUI5)
     * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
     * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
     */
    if (window.jQuery && window.jQuery.sap && window.jQuery.sap.declare) { window.jQuery.sap.declare("sap.ui.Device", false); }
    if (typeof window.sap !== "object" && typeof window.sap !== "function") { window.sap = {}; }
    if (typeof window.sap.ui !== "object") { window.sap.ui = {}; }(function() {
        "use strict";
        if (typeof window.sap.ui.Device === "object" || typeof window.sap.ui.Device === "function") {
            var c = "1.36.10";
            window.sap.ui.Device._checkAPIVersion(c);
            return; }
        var d = {};

        function p(i, w) {
            return ("000" + String(i)).slice(-w); }
        var F = 0,
            E = 1,
            W = 2,
            I = 3,
            D = 4,
            T = 5;
        var g = function() { this.defaultComponent = 'DEVICE';
            this.sWindowName = (window.top == window) ? "" : "[" + window.location.pathname.split('/').slice(-1)[0] + "] ";
            this.log = function(i, s, a) { a = a || this.defaultComponent || '';
                var b = new Date(),
                    e = { time: p(b.getHours(), 2) + ":" + p(b.getMinutes(), 2) + ":" + p(b.getSeconds(), 2), date: p(b.getFullYear(), 4) + "-" + p(b.getMonth() + 1, 2) + "-" + p(b.getDate(), 2), timestamp: b.getTime(), level: i, message: s || "", component: a || "" };
                if (window.console) {
                    var f = e.date + " " + e.time + " " + this.sWindowName + e.message + " - " + e.component;
                    switch (i) {
                        case F:
                        case E:
                            console.error(f);
                            break;
                        case W:
                            console.warn(f);
                            break;
                        case I:
                            console.info ? console.info(f) : console.log(f);
                            break;
                        case D:
                            console.debug ? console.debug(f) : console.log(f);
                            break;
                        case T:
                            console.trace ? console.trace(f) : console.log(f);
                            break; } }
                return e; }; };
        var l = new g();
        l.log(I, "Device API logging initialized");
        d._checkAPIVersion = function(s) {
            var v = "1.36.10";
            if (v != s) { l.log(W, "Device API version differs: " + v + " <-> " + s); } };
        var h = {};

        function j(e, f, a) {
            if (!h[e]) { h[e] = []; }
            h[e].push({ oListener: a, fFunction: f }); }

        function k(e, f, a) {
            var b = h[e];
            if (!b) {
                return this; }
            for (var i = 0, q = b.length; i < q; i++) {
                if (b[i].fFunction === f && b[i].oListener === a) { b.splice(i, 1);
                    break; } }
            if (b.length == 0) { delete h[e]; } }

        function n(e, a) {
            var b = h[e],
                f;
            if (b) { b = b.slice();
                for (var i = 0, q = b.length; i < q; i++) { f = b[i];
                    f.fFunction.call(f.oListener || window, a); } } }
        var O = { "WINDOWS": "win", "MACINTOSH": "mac", "LINUX": "linux", "IOS": "iOS", "ANDROID": "Android", "BLACKBERRY": "bb", "WINDOWS_PHONE": "winphone" };

        function o(a) { a = a || navigator.userAgent;
            var b, e;

            function f() {
                var s = navigator.platform;
                if (s.indexOf("Win") != -1) {
                    var t = /Windows NT (\d+).(\d)/i;
                    var v = a.match(t);
                    var w = "";
                    if (v[1] == "6") {
                        if (v[2] == 1) { w = "7"; } else if (v[2] > 1) { w = "8"; } } else { w = v[1]; }
                    return { "name": O.WINDOWS, "versionStr": w }; } else if (s.indexOf("Mac") != -1) {
                    return { "name": O.MACINTOSH, "versionStr": "" }; } else if (s.indexOf("Linux") != -1) {
                    return { "name": O.LINUX, "versionStr": "" }; }
                l.log(I, "OS detection returned no result");
                return null; }
            b = /Windows Phone (?:OS )?([\d.]*)/;
            e = a.match(b);
            if (e) {
                return ({ "name": O.WINDOWS_PHONE, "versionStr": e[1] }); }
            if (a.indexOf("(BB10;") > 0) { b = /\sVersion\/([\d.]+)\s/;
                e = a.match(b);
                if (e) {
                    return { "name": O.BLACKBERRY, "versionStr": e[1] }; } else {
                    return { "name": O.BLACKBERRY, "versionStr": '10' }; } }
            b = /\(([a-zA-Z ]+);\s(?:[U]?[;]?)([\D]+)((?:[\d._]*))(?:.*[\)][^\d]*)([\d.]*)\s/;
            e = a.match(b);
            if (e) {
                var i = /iPhone|iPad|iPod/;
                var q = /PlayBook|BlackBerry/;
                if (e[0].match(i)) { e[3] = e[3].replace(/_/g, ".");
                    return ({ "name": O.IOS, "versionStr": e[3] }); } else if (e[2].match(/Android/)) { e[2] = e[2].replace(/\s/g, "");
                    return ({ "name": O.ANDROID, "versionStr": e[3] }); } else if (e[0].match(q)) {
                    return ({ "name": O.BLACKBERRY, "versionStr": e[4] }); } }
            b = /\((Android)[\s]?([\d][.\d]*)?;.*Firefox\/[\d][.\d]*/;
            e = a.match(b);
            if (e) {
                return ({ "name": O.ANDROID, "versionStr": e.length == 3 ? e[2] : "" }); }
            return f(); }

        function r(a) { d.os = o(a) || {};
            d.os.OS = O;
            d.os.version = d.os.versionStr ? parseFloat(d.os.versionStr) : -1;
            if (d.os.name) {
                for (var b in O) {
                    if (O[b] === d.os.name) { d.os[b.toLowerCase()] = true; } } } }
        r();
        d._setOS = r;
        var B = { "INTERNET_EXPLORER": "ie", "EDGE": "ed", "FIREFOX": "ff", "CHROME": "cr", "SAFARI": "sf", "ANDROID": "an" };
        var u = navigator.userAgent;
        /*!
         * Taken from jQuery JavaScript Library v1.7.1
         * http://jquery.com/
         *
         * Copyright 2011, John Resig
         * Dual licensed under the MIT or GPL Version 2 licenses.
         * http://jquery.org/license
         *
         * Includes Sizzle.js
         * http://sizzlejs.com/
         * Copyright 2011, The Dojo Foundation
         * Released under the MIT, BSD, and GPL Licenses.
         *
         * Date: Mon Nov 21 21:11:03 2011 -0500
         */
        function y(a) {
            var b = (a || u).toLowerCase();
            var e = /(webkit)[ \/]([\w.]+)/;
            var f = /(opera)(?:.*version)?[ \/]([\w.]+)/;
            var i = /(msie) ([\w.]+)/;
            var q = /(trident)\/[\w.]+;.*rv:([\w.]+)/;
            var s = /(edge)[ \/]([\w.]+)/;
            var t = /(mozilla)(?:.*? rv:([\w.]+))?/;
            var v = s.exec(b) || q.exec(b) || e.exec(b) || f.exec(b) || i.exec(b) || b.indexOf("compatible") < 0 && t.exec(b) || [];
            var w = { browser: v[1] || "", version: v[2] || "0" };
            w[w.browser] = true;
            return w; }

        function z(a, e) {
            var b = y(a);
            var f = a || u;
            var i = e || window.navigator;
            var q;
            if (b.mozilla) { q = /Mobile/;
                if (f.match(/Firefox\/(\d+\.\d+)/)) {
                    var v = parseFloat(RegExp.$1);
                    return { name: B.FIREFOX, versionStr: "" + v, version: v, mozilla: true, mobile: q.test(f) }; } else {
                    return { mobile: q.test(f), mozilla: true, version: -1 }; } } else if (b.webkit) {
                var s = f.toLowerCase().match(/webkit[\/]([\d.]+)/);
                var w;
                if (s) { w = s[1]; }
                q = /Mobile/;
                if (f.match(/(Chrome|CriOS)\/(\d+\.\d+).\d+/)) {
                    var v = parseFloat(RegExp.$2);
                    return { name: B.CHROME, versionStr: "" + v, version: v, mobile: q.test(f), webkit: true, webkitVersion: w }; } else if (f.match(/FxiOS\/(\d+\.\d+)/)) {
                    var v = parseFloat(RegExp.$1);
                    return { name: B.FIREFOX, versionStr: "" + v, version: v, mobile: true, webkit: true, webkitVersion: w }; } else if (f.match(/Android .+ Version\/(\d+\.\d+)/)) {
                    var v = parseFloat(RegExp.$1);
                    return { name: B.ANDROID, versionStr: "" + v, version: v, mobile: q.test(f), webkit: true, webkitVersion: w }; } else {
                    var t = /(Version|PhantomJS)\/(\d+\.\d+).*Safari/;
                    var x = i.standalone;
                    if (t.test(f)) {
                        var v1 = t.exec(f);
                        var v = parseFloat(v1[2]);
                        return { name: B.SAFARI, versionStr: "" + v, fullscreen: false, webview: false, version: v, mobile: q.test(f), webkit: true, webkitVersion: w, phantomJS: v1[1] === "PhantomJS" }; } else if (/iPhone|iPad|iPod/.test(f) && !(/CriOS/.test(f)) && !(/FxiOS/.test(f)) && (x === true || x === false)) {
                        return { name: B.SAFARI, version: -1, fullscreen: x, webview: !x, mobile: q.test(f), webkit: true, webkitVersion: w }; } else {
                        return { mobile: q.test(f), webkit: true, webkitVersion: w, version: -1 }; } } } else if (b.msie || b.trident) {
                var v;
                if (document.documentMode && !a) {
                    if (document.documentMode === 7) { v = 8.0; } else { v = parseFloat(document.documentMode); } } else { v = parseFloat(b.version); }
                return { name: B.INTERNET_EXPLORER, versionStr: "" + v, version: v, msie: true, mobile: false }; } else if (b.edge) {
                var v = v = parseFloat(b.version);
                return { name: B.EDGE, versionStr: "" + v, version: v, edge: true }; }
            return { name: "", versionStr: "", version: -1, mobile: false }; }
        d._testUserAgent = z;

        function A() { d.browser = z();
            d.browser.BROWSER = B;
            if (d.browser.name) {
                for (var b in B) {
                    if (B[b] === d.browser.name) { d.browser[b.toLowerCase()] = true; } } } }
        A();
        d.support = {};
        d.support.touch = !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch);
        if (d.browser.phantomJS) { d.support.touch = false; }
        d.support.pointer = !!window.PointerEvent;
        d.support.matchmedia = !!window.matchMedia;
        var m = d.support.matchmedia ? window.matchMedia("all and (max-width:0px)") : null;
        d.support.matchmedialistener = !!(m && m.addListener);
        if (d.browser.safari && d.browser.version < 6 && !d.browser.fullscreen && !d.browser.webview) { d.support.matchmedialistener = false; }
        d.support.orientation = !!("orientation" in window && "onorientationchange" in window);
        d.support.retina = (window.retina || window.devicePixelRatio >= 2);
        d.support.websocket = ('WebSocket' in window);
        d.support.input = {};
        d.support.input.placeholder = ('placeholder' in document.createElement("input"));
        d.media = {};
        var R = { "SAP_3STEPS": "3Step", "SAP_4STEPS": "4Step", "SAP_6STEPS": "6Step", "SAP_STANDARD": "Std", "SAP_STANDARD_EXTENDED": "StdExt" };
        d.media.RANGESETS = R;
        d.media._predefinedRangeSets = {};
        d.media._predefinedRangeSets[R.SAP_3STEPS] = { points: [520, 960], unit: "px", name: R.SAP_3STEPS, names: ["S", "M", "L"] };
        d.media._predefinedRangeSets[R.SAP_4STEPS] = { points: [520, 760, 960], unit: "px", name: R.SAP_4STEPS, names: ["S", "M", "L", "XL"] };
        d.media._predefinedRangeSets[R.SAP_6STEPS] = { points: [241, 400, 541, 768, 960], unit: "px", name: R.SAP_6STEPS, names: ["XS", "S", "M", "L", "XL", "XXL"] };
        d.media._predefinedRangeSets[R.SAP_STANDARD] = { points: [600, 1024], unit: "px", name: R.SAP_STANDARD, names: ["Phone", "Tablet", "Desktop"] };
        d.media._predefinedRangeSets[R.SAP_STANDARD_EXTENDED] = { points: [600, 1024, 1440], unit: "px", name: R.SAP_STANDARD_EXTENDED, names: ["Phone", "Tablet", "Desktop", "LargeDesktop"] };
        var _ = R.SAP_STANDARD;
        var C = d.support.matchmedialistener ? 0 : 100;
        var G = {};
        var H = null;

        function J(f, t, a) { a = a || "px";
            var q = "all";
            if (f > 0) { q = q + " and (min-width:" + f + a + ")"; }
            if (t > 0) { q = q + " and (max-width:" + t + a + ")"; }
            return q; }

        function K(a) {
            if (!d.support.matchmedialistener && H == Q()[0]) {
                return; }
            if (G[a].timer) { clearTimeout(G[a].timer);
                G[a].timer = null; }
            G[a].timer = setTimeout(function() {
                var b = M(a, false);
                if (b) { n("media_" + a, b); } }, C); }

        function L(s, i) {
            var q = G[s].queries[i];
            var a = { from: q.from, unit: G[s].unit };
            if (q.to >= 0) { a.to = q.to; }
            if (G[s].names) { a.name = G[s].names[i]; }
            return a; }

        function M(a, b) {
            if (G[a]) {
                var e = G[a].queries;
                var f = null;
                for (var i = 0, s = e.length; i < s; i++) {
                    var q = e[i];
                    if ((q != G[a].currentquery || b) && d.media.matches(q.from, q.to, G[a].unit)) {
                        if (!b) { G[a].currentquery = q; }
                        if (!G[a].noClasses && G[a].names && !b) { N(a, G[a].names[i]); }
                        f = L(a, i); } }
                return f; }
            l.log(W, "No queryset with name " + a + " found", 'DEVICE.MEDIA');
            return null; }

        function N(s, a, b) {
            var e = "sapUiMedia-" + s + "-";
            P(e + a, b, e); }

        function P(s, b, a) {
            var e = document.documentElement;
            if (e.className.length == 0) {
                if (!b) { e.className = s; } } else {
                var f = e.className.split(" ");
                var q = "";
                for (var i = 0; i < f.length; i++) {
                    if ((a && f[i].indexOf(a) != 0) || (!a && f[i] != s)) { q = q + f[i] + " "; } }
                if (!b) { q = q + s; }
                e.className = q; } }

        function Q() {
            return [document.documentElement.clientWidth, document.documentElement.clientHeight]; }

        function S(v, a) {
            if (a === "em" || a === "rem") {
                var s = window.getComputedStyle || function(e) {
                    return e.currentStyle; };
                var x = s(document.documentElement).fontSize;
                var f = (x && x.indexOf("px") >= 0) ? parseFloat(x, 10) : 16;
                return v * f; }
            return v; }

        function U(f, t, e) { f = S(f, e);
            t = S(t, e);
            var w = Q()[0];
            var a = f < 0 || f <= w;
            var b = t < 0 || w <= t;
            return a && b; }

        function V(f, t, a) {
            var q = J(f, t, a);
            var b = window.matchMedia(q);
            return b && b.matches; }
        d.media.matches = d.support.matchmedia ? V : U;
        d.media.attachHandler = function(f, a, s) {
            var b = s || _;
            j("media_" + b, f, a); };
        d.media.detachHandler = function(f, a, s) {
            var b = s || _;
            k("media_" + b, f, a); };
        d.media.initRangeSet = function(s, a, b, e, f) {
            var t;
            if (!s) { t = d.media._predefinedRangeSets[_]; } else if (s && d.media._predefinedRangeSets[s]) { t = d.media._predefinedRangeSets[s]; } else { t = { name: s, unit: (b || "px").toLowerCase(), points: a || [], names: e, noClasses: !!f }; }
            if (d.media.hasRangeSet(t.name)) { l.log(I, "Range set " + t.name + " hase already been initialized", 'DEVICE.MEDIA');
                return; }
            s = t.name;
            t.queries = [];
            t.timer = null;
            t.currentquery = null;
            t.listener = function() {
                return K(s); };
            var v, w, x;
            var v1 = t.points;
            for (var i = 0, w1 = v1.length; i <= w1; i++) { v = (i == 0) ? 0 : v1[i - 1];
                w = (i == v1.length) ? -1 : v1[i];
                x = J(v, w, t.unit);
                t.queries.push({ query: x, from: v, to: w }); }
            if (t.names && t.names.length != t.queries.length) { t.names = null; }
            G[t.name] = t;
            if (d.support.matchmedialistener) {
                var x1 = t.queries;
                for (var i = 0; i < x1.length; i++) {
                    var q = x1[i];
                    q.media = window.matchMedia(q.query);
                    q.media.addListener(t.listener); } } else {
                if (window.addEventListener) { window.addEventListener("resize", t.listener, false);
                    window.addEventListener("orientationchange", t.listener, false); } else { window.attachEvent("onresize", t.listener); } }
            t.listener(); };
        d.media.getCurrentRange = function(s) {
            if (!d.media.hasRangeSet(s)) {
                return null; }
            return M(s, true); };
        d.media.hasRangeSet = function(s) {
            return s && !!G[s]; };
        d.media.removeRangeSet = function(s) {
            if (!d.media.hasRangeSet(s)) { l.log(I, "RangeSet " + s + " not found, thus could not be removed.", 'DEVICE.MEDIA');
                return; }
            for (var x in R) {
                if (s === R[x]) { l.log(W, "Cannot remove default rangeset - no action taken.", 'DEVICE.MEDIA');
                    return; } }
            var a = G[s];
            if (d.support.matchmedialistener) {
                var q = a.queries;
                for (var i = 0; i < q.length; i++) { q[i].media.removeListener(a.listener); } } else {
                if (window.removeEventListener) { window.removeEventListener("resize", a.listener, false);
                    window.removeEventListener("orientationchange", a.listener, false); } else { window.detachEvent("onresize", a.listener); } }
            N(s, "", true);
            delete h["media_" + s];
            delete G[s]; };
        var X = { "TABLET": "tablet", "PHONE": "phone", "DESKTOP": "desktop", "COMBI": "combi" };
        d.system = {};

        function Y(a, b) {
            var t = Z(b);
            var i = d.os.windows && d.os.version >= 8;
            var e = d.os.windows && d.os.version === 7;
            var s = {};
            s.tablet = !!(((d.support.touch && !e) || i || !!a) && t);
            s.phone = !!(d.os.windows_phone || ((d.support.touch && !e) || !!a) && !t);
            s.desktop = !!((!s.tablet && !s.phone) || i || e);
            s.combi = !!(s.desktop && s.tablet);
            s.SYSTEMTYPE = X;
            for (var f in X) { P("sap-" + X[f], !s[X[f]]); }
            return s; }

        function Z(a) {
            var u = a || navigator.userAgent;
            var i = d.os.windows && d.os.version >= 8;
            if (d.os.name === d.os.OS.IOS) {
                return /ipad/i.test(u); } else {
                if (d.support.touch) {
                    if (i) {
                        return true; }
                    if (d.browser.chrome && d.os.android && d.os.version >= 4.4) {
                        return !/Mobile Safari\/[.0-9]+/.test(u); } else {
                        var b = window.devicePixelRatio ? window.devicePixelRatio : 1;
                        if (d.os.android && d.browser.webkit && (parseFloat(d.browser.webkitVersion) > 537.10)) { b = 1; }
                        var t = (Math.min(window.screen.width / b, window.screen.height / b) >= 600);
                        if (r1() && (window.screen.height === 552 || window.screen.height === 553) && (/Nexus 7/i.test(u))) { t = true; }
                        return t; } } else {
                    var e = (/(?=android)(?=.*mobile)/i.test(u));
                    return (d.browser.msie && u.indexOf("Touch") !== -1) || (d.os.android && !e); } } }

        function $(a, b) { d.system = Y(a, b);
            if (d.system.tablet || d.system.phone) { d.browser.mobile = true; } }
        $();
        d._getSystem = Y;
        d.orientation = {};
        d.resize = {};
        d.orientation.attachHandler = function(f, a) { j("orientation", f, a); };
        d.resize.attachHandler = function(f, a) { j("resize", f, a); };
        d.orientation.detachHandler = function(f, a) { k("orientation", f, a); };
        d.resize.detachHandler = function(f, a) { k("resize", f, a); };

        function a1(i) { i.landscape = r1(true);
            i.portrait = !i.landscape; }

        function b1() { a1(d.orientation);
            n("orientation", { landscape: d.orientation.landscape }); }

        function c1() { d1(d.resize);
            n("resize", { height: d.resize.height, width: d.resize.width }); }

        function d1(i) { i.width = Q()[0];
            i.height = Q()[1]; }

        function e1() {
            var w = d.orientation.landscape;
            var i = r1();
            if (w != i) { b1(); }
            if (!j1) { j1 = window.setTimeout(f1, 150); } }

        function f1() { c1();
            j1 = null; }
        var g1 = false;
        var h1 = false;
        var i1;
        var j1;
        var k1;
        var l1 = Q()[1];
        var m1 = Q()[0];
        var n1 = false;
        var o1;
        var p1 = /INPUT|TEXTAREA|SELECT/;
        var q1 = d.os.ios && d.browser.name === "sf" && ((d.system.phone && d.os.version >= 7 && d.os.version < 7.1) || (d.system.tablet && d.os.version >= 7));

        function r1(f) {
            if (d.support.touch && d.support.orientation) {
                if (n1 && f) {
                    return !d.orientation.landscape; }
                if (n1) {
                    return d.orientation.landscape; } } else {
                if (d.support.matchmedia && d.support.orientation) {
                    return !!window.matchMedia("(orientation: landscape)").matches; } }
            var s = Q();
            return s[0] > s[1]; }

        function s1(e) {
            if (e.type == "resize") {
                if (q1 && p1.test(document.activeElement.tagName) && !g1) {
                    return; }
                var w = Q()[1];
                var i = Q()[0];
                var t = new Date().getTime();
                if (w === l1 && i === m1) {
                    return; }
                h1 = true;
                if ((l1 != w) && (m1 == i)) {
                    if (!o1 || (t - o1 > 300)) { n1 = (w < l1); }
                    c1(); } else { m1 = i; }
                o1 = t;
                l1 = w;
                if (k1) { window.clearTimeout(k1);
                    k1 = null; }
                k1 = window.setTimeout(u1, 1200); } else if (e.type == "orientationchange") { g1 = true; }
            if (i1) { clearTimeout(i1);
                i1 = null; }
            i1 = window.setTimeout(t1, 50); }

        function t1() {
            if (g1 && h1) { b1();
                c1();
                g1 = false;
                h1 = false;
                if (k1) { window.clearTimeout(k1);
                    k1 = null; } }
            i1 = null; }

        function u1() { g1 = false;
            h1 = false;
            k1 = null; }
        d._update = function(a) { u = navigator.userAgent;
            l.log(W, "Device API values manipulated: NOT PRODUCTIVE FEATURE!!! This should be only used for test purposes. Only use if you know what you are doing.");
            A();
            r();
            $(a); };
        d1(d.resize);
        a1(d.orientation);
        window.sap.ui.Device = d;
        if (d.support.touch && d.support.orientation) { window.addEventListener("resize", s1, false);
            window.addEventListener("orientationchange", s1, false); } else {
            if (window.addEventListener) { window.addEventListener("resize", e1, false); } else { window.attachEvent("onresize", e1); } }
        d.media.initRangeSet();
        d.media.initRangeSet(R["SAP_STANDARD_EXTENDED"]);
        if (sap.ui.define) { sap.ui.define("sap/ui/Device", [], function() {
                return d; }); }
    }());
    /*!
     * URI.js - Mutating URLs
     *
     * Version: 1.11.2
     *
     * Author: Rodney Rehm
     * Web: http://medialize.github.com/URI.js/
     *
     * Licensed under
     *   MIT License http://www.opensource.org/licenses/mit-license
     *   GPL v3 http://opensource.org/licenses/GPL-3.0
     *
     */
    (function(r, f) {
        if (typeof exports === 'object') { module.exports = f(require('./punycode'), require('./IPv6'), require('./SecondLevelDomains')); } else if (typeof define === 'function' && define.amd) { r.URI = f(r.punycode, r.IPv6, r.SecondLevelDomains, r);
            define('sap/ui/thirdparty/URI', [], function() {
                return r.URI; }); } else { r.URI = f(r.punycode, r.IPv6, r.SecondLevelDomains, r); } }(this, function(a, I, S, r) { "use strict";
        var _ = r && r.URI;

        function U(c, d) {
            if (!(this instanceof U)) {
                return new U(c, d); }
            if (c === undefined) {
                if (typeof location !== 'undefined') { c = location.href + ""; } else { c = ""; } }
            this.href(c);
            if (d !== undefined) {
                return this.absoluteTo(d); }
            return this; };
        var p = U.prototype;
        var h = Object.prototype.hasOwnProperty;

        function b(s) {
            return s.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1'); }

        function g(v) {
            if (v === undefined) {
                return 'Undefined'; }
            return String(Object.prototype.toString.call(v)).slice(8, -1); }

        function f(c) {
            return g(c) === "Array"; }

        function j(d, v) {
            var l = {};
            var i, c;
            if (f(v)) {
                for (i = 0, c = v.length; i < c; i++) { l[v[i]] = true; } } else { l[v] = true; }
            for (i = 0, c = d.length; i < c; i++) {
                if (l[d[i]] !== undefined) { d.splice(i, 1);
                    c--;
                    i--; } }
            return d; }

        function k(l, v) {
            var i, c;
            if (f(v)) {
                for (i = 0, c = v.length; i < c; i++) {
                    if (!k(l, v[i])) {
                        return false; } }
                return true; }
            var d = g(v);
            for (i = 0, c = l.length; i < c; i++) {
                if (d === 'RegExp') {
                    if (typeof l[i] === 'string' && l[i].match(v)) {
                        return true; } } else if (l[i] === v) {
                    return true; } }
            return false; }

        function m(c, t) {
            if (!f(c) || !f(t)) {
                return false; }
            if (c.length !== t.length) {
                return false; }
            c.sort();
            t.sort();
            for (var i = 0, l = c.length; i < l; i++) {
                if (c[i] !== t[i]) {
                    return false; } }
            return true; }
        U._parts = function() {
            return { protocol: null, username: null, password: null, hostname: null, urn: null, port: null, path: null, query: null, fragment: null, duplicateQueryParameters: U.duplicateQueryParameters, escapeQuerySpace: U.escapeQuerySpace }; };
        U.duplicateQueryParameters = false;
        U.escapeQuerySpace = true;
        U.protocol_expression = /^[a-z][a-z0-9-+-]*$/i;
        U.idn_expression = /[^a-z0-9\.-]/i;
        U.punycode_expression = /(xn--)/i;
        U.ip4_expression = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
        U.ip6_expression = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
        U.find_uri_expression = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/ig;
        U.defaultPorts = { http: "80", https: "443", ftp: "21", gopher: "70", ws: "80", wss: "443" };
        U.invalid_hostname_characters = /[^a-zA-Z0-9\.-]/;
        U.domAttributes = { 'a': 'href', 'blockquote': 'cite', 'link': 'href', 'base': 'href', 'script': 'src', 'form': 'action', 'img': 'src', 'area': 'href', 'iframe': 'src', 'embed': 'src', 'source': 'src', 'track': 'src', 'input': 'src' };
        U.getDomAttribute = function(c) {
            if (!c || !c.nodeName) {
                return undefined; }
            var d = c.nodeName.toLowerCase();
            if (d === 'input' && c.type !== 'image') {
                return undefined; }
            return U.domAttributes[d]; };

        function n(v) {
            return escape(v); }

        function o(s) {
            return encodeURIComponent(s).replace(/[!'()*]/g, n).replace(/\*/g, "%2A"); }
        U.encode = o;
        U.decode = decodeURIComponent;
        U.iso8859 = function() { U.encode = escape;
            U.decode = unescape; };
        U.unicode = function() { U.encode = o;
            U.decode = decodeURIComponent; };
        U.characters = { pathname: { encode: { expression: /%(24|26|2B|2C|3B|3D|3A|40)/ig, map: { "%24": "$", "%26": "&", "%2B": "+", "%2C": ",", "%3B": ";", "%3D": "=", "%3A": ":", "%40": "@" } }, decode: { expression: /[\/\?#]/g, map: { "/": "%2F", "?": "%3F", "#": "%23" } } }, reserved: { encode: { expression: /%(21|23|24|26|27|28|29|2A|2B|2C|2F|3A|3B|3D|3F|40|5B|5D)/ig, map: { "%3A": ":", "%2F": "/", "%3F": "?", "%23": "#", "%5B": "[", "%5D": "]", "%40": "@", "%21": "!", "%24": "$", "%26": "&", "%27": "'", "%28": "(", "%29": ")", "%2A": "*", "%2B": "+", "%2C": ",", "%3B": ";", "%3D": "=" } } } };
        U.encodeQuery = function(s, e) {
            var c = U.encode(s + "");
            return e ? c.replace(/%20/g, '+') : c; };
        U.decodeQuery = function(s, c) { s += "";
            try {
                return U.decode(c ? s.replace(/\+/g, '%20') : s); } catch (e) {
                return s; } };
        U.recodePath = function(s) {
            var c = (s + "").split('/');
            for (var i = 0, l = c.length; i < l; i++) { c[i] = U.encodePathSegment(U.decode(c[i])); }
            return c.join('/'); };
        U.decodePath = function(s) {
            var c = (s + "").split('/');
            for (var i = 0, l = c.length; i < l; i++) { c[i] = U.decodePathSegment(c[i]); }
            return c.join('/'); };
        var u = { 'encode': 'encode', 'decode': 'decode' };
        var w;
        var y = function(d, w) {
            return function(s) {
                return U[w](s + "").replace(U.characters[d][w].expression, function(c) {
                    return U.characters[d][w].map[c]; }); }; };
        for (w in u) { U[w + "PathSegment"] = y("pathname", u[w]); }
        U.encodeReserved = y("reserved", "encode");
        U.parse = function(s, c) {
            var d;
            if (!c) { c = {}; }
            d = s.indexOf('#');
            if (d > -1) { c.fragment = s.substring(d + 1) || null;
                s = s.substring(0, d); }
            d = s.indexOf('?');
            if (d > -1) { c.query = s.substring(d + 1) || null;
                s = s.substring(0, d); }
            if (s.substring(0, 2) === '//') { c.protocol = null;
                s = s.substring(2);
                s = U.parseAuthority(s, c); } else { d = s.indexOf(':');
                if (d > -1) { c.protocol = s.substring(0, d) || null;
                    if (c.protocol && !c.protocol.match(U.protocol_expression)) { c.protocol = undefined; } else if (c.protocol === 'file') { s = s.substring(d + 3); } else if (s.substring(d + 1, d + 3) === '//') { s = s.substring(d + 3);
                        s = U.parseAuthority(s, c); } else { s = s.substring(d + 1);
                        c.urn = true; } } }
            c.path = s;
            return c; };
        U.parseHost = function(s, c) {
            var d = s.indexOf('/');
            var e;
            var t;
            if (d === -1) { d = s.length; }
            if (s.charAt(0) === "[") { e = s.indexOf(']');
                c.hostname = s.substring(1, e) || null;
                c.port = s.substring(e + 2, d) || null; } else if (s.indexOf(':') !== s.lastIndexOf(':')) { c.hostname = s.substring(0, d) || null;
                c.port = null; } else { t = s.substring(0, d).split(':');
                c.hostname = t[0] || null;
                c.port = t[1] || null; }
            if (c.hostname && s.substring(d).charAt(0) !== '/') { d++;
                s = "/" + s; }
            return s.substring(d) || '/'; };
        U.parseAuthority = function(s, c) { s = U.parseUserinfo(s, c);
            return U.parseHost(s, c); };
        U.parseUserinfo = function(s, c) {
            var d = s.indexOf('/');
            var e = d > -1 ? s.lastIndexOf('@', d) : s.indexOf('@');
            var t;
            if (e > -1 && (d === -1 || e < d)) { t = s.substring(0, e).split(':');
                c.username = t[0] ? U.decode(t[0]) : null;
                t.shift();
                c.password = t[0] ? U.decode(t.join(':')) : null;
                s = s.substring(e + 1); } else { c.username = null;
                c.password = null; }
            return s; };
        U.parseQuery = function(s, e) {
            if (!s) {
                return {}; }
            s = s.replace(/&+/g, '&').replace(/^\?*&*|&+$/g, '');
            if (!s) {
                return {}; }
            var c = {};
            var d = s.split('&');
            var l = d.length;
            var v, t, x;
            for (var i = 0; i < l; i++) { v = d[i].split('=');
                t = U.decodeQuery(v.shift(), e);
                x = v.length ? U.decodeQuery(v.join('='), e) : null;
                if (c[t]) {
                    if (typeof c[t] === "string") { c[t] = [c[t]]; }
                    c[t].push(x); } else { c[t] = x; } }
            return c; };
        U.build = function(c) {
            var t = "";
            if (c.protocol) { t += c.protocol + ":"; }
            if (!c.urn && (t || c.hostname)) { t += '//'; }
            t += (U.buildAuthority(c) || '');
            if (typeof c.path === "string") {
                if (c.path.charAt(0) !== '/' && typeof c.hostname === "string") { t += '/'; }
                t += c.path; }
            if (typeof c.query === "string" && c.query) { t += '?' + c.query; }
            if (typeof c.fragment === "string" && c.fragment) { t += '#' + c.fragment; }
            return t; };
        U.buildHost = function(c) {
            var t = "";
            if (!c.hostname) {
                return ""; } else if (U.ip6_expression.test(c.hostname)) {
                if (c.port) { t += "[" + c.hostname + "]:" + c.port; } else { t += c.hostname; } } else { t += c.hostname;
                if (c.port) { t += ':' + c.port; } }
            return t; };
        U.buildAuthority = function(c) {
            return U.buildUserinfo(c) + U.buildHost(c); };
        U.buildUserinfo = function(c) {
            var t = "";
            if (c.username) { t += U.encode(c.username);
                if (c.password) { t += ':' + U.encode(c.password); }
                t += "@"; }
            return t; };
        U.buildQuery = function(d, c, e) {
            var t = "";
            var l, s, i, v;
            for (s in d) {
                if (h.call(d, s) && s) {
                    if (f(d[s])) { l = {};
                        for (i = 0, v = d[s].length; i < v; i++) {
                            if (d[s][i] !== undefined && l[d[s][i] + ""] === undefined) { t += "&" + U.buildQueryParameter(s, d[s][i], e);
                                if (c !== true) { l[d[s][i] + ""] = true; } } } } else if (d[s] !== undefined) { t += '&' + U.buildQueryParameter(s, d[s], e); } } }
            return t.substring(1); };
        U.buildQueryParameter = function(c, v, e) {
            return U.encodeQuery(c, e) + (v !== null ? "=" + U.encodeQuery(v, e) : ""); };
        U.addQuery = function(d, c, v) {
            if (typeof c === "object") {
                for (var e in c) {
                    if (h.call(c, e)) { U.addQuery(d, e, c[e]); } } } else if (typeof c === "string") {
                if (d[c] === undefined) { d[c] = v;
                    return; } else if (typeof d[c] === "string") { d[c] = [d[c]]; }
                if (!f(v)) { v = [v]; }
                d[c] = d[c].concat(v); } else {
                throw new TypeError("URI.addQuery() accepts an object, string as the name parameter"); } };
        U.removeQuery = function(d, c, v) {
            var i, l, e;
            if (f(c)) {
                for (i = 0, l = c.length; i < l; i++) { d[c[i]] = undefined; } } else if (typeof c === "object") {
                for (e in c) {
                    if (h.call(c, e)) { U.removeQuery(d, e, c[e]); } } } else if (typeof c === "string") {
                if (v !== undefined) {
                    if (d[c] === v) { d[c] = undefined; } else if (f(d[c])) { d[c] = j(d[c], v); } } else { d[c] = undefined; } } else {
                throw new TypeError("URI.addQuery() accepts an object, string as the first parameter"); } };
        U.hasQuery = function(d, c, v, e) {
            if (typeof c === "object") {
                for (var i in c) {
                    if (h.call(c, i)) {
                        if (!U.hasQuery(d, i, c[i])) {
                            return false; } } }
                return true; } else if (typeof c !== "string") {
                throw new TypeError("URI.hasQuery() accepts an object, string as the name parameter"); }
            switch (g(v)) {
                case 'Undefined':
                    return c in d;
                case 'Boolean':
                    var l = Boolean(f(d[c]) ? d[c].length : d[c]);
                    return v === l;
                case 'Function':
                    return !!v(d[c], c, d);
                case 'Array':
                    if (!f(d[c])) {
                        return false; }
                    var s = e ? k : m;
                    return s(d[c], v);
                case 'RegExp':
                    if (!f(d[c])) {
                        return Boolean(d[c] && d[c].match(v)); }
                    if (!e) {
                        return false; }
                    return k(d[c], v);
                case 'Number':
                    v = String(v);
                case 'String':
                    if (!f(d[c])) {
                        return d[c] === v; }
                    if (!e) {
                        return false; }
                    return k(d[c], v);
                default:
                    throw new TypeError("URI.hasQuery() accepts undefined, boolean, string, number, RegExp, Function as the value parameter"); } };
        U.commonPath = function(c, t) {
            var l = Math.min(c.length, t.length);
            var d;
            for (d = 0; d < l; d++) {
                if (c.charAt(d) !== t.charAt(d)) { d--;
                    break; } }
            if (d < 1) {
                return c.charAt(0) === t.charAt(0) && c.charAt(0) === '/' ? '/' : ''; }
            if (c.charAt(d) !== '/' || t.charAt(d) !== '/') { d = c.substring(0, d).lastIndexOf('/'); }
            return c.substring(0, d + 1); };
        U.withinString = function(s, c) {
            return s.replace(U.find_uri_expression, c); };
        U.ensureValidHostname = function(v) {
            if (v.match(U.invalid_hostname_characters)) {
                if (!a) {
                    throw new TypeError("Hostname '" + v + "' contains characters other than [A-Z0-9.-] and Punycode.js is not available"); }
                if (a.toASCII(v).match(U.invalid_hostname_characters)) {
                    throw new TypeError("Hostname '" + v + "' contains characters other than [A-Z0-9.-]"); } } };
        U.noConflict = function(c) {
            if (c) {
                var d = { URI: this.noConflict() };
                if (URITemplate && typeof URITemplate.noConflict == "function") { d.URITemplate = URITemplate.noConflict(); }
                if (I && typeof I.noConflict == "function") { d.IPv6 = I.noConflict(); }
                if (SecondLevelDomains && typeof SecondLevelDomains.noConflict == "function") { d.SecondLevelDomains = SecondLevelDomains.noConflict(); }
                return d; } else if (r.URI === this) { r.URI = _; }
            return this; };
        p.build = function(d) {
            if (d === true) { this._deferred_build = true; } else if (d === undefined || this._deferred_build) { this._string = U.build(this._parts);
                this._deferred_build = false; }
            return this; };
        p.clone = function() {
            return new U(this); };
        p.valueOf = p.toString = function() {
            return this.build(false)._string; };
        u = { protocol: 'protocol', username: 'username', password: 'password', hostname: 'hostname', port: 'port' };
        y = function(w) {
            return function(v, c) {
                if (v === undefined) {
                    return this._parts[w] || ""; } else { this._parts[w] = v || null;
                    this.build(!c);
                    return this; } }; };
        for (w in u) { p[w] = y(u[w]); }
        u = { query: '?', fragment: '#' };
        y = function(w, c) {
            return function(v, d) {
                if (v === undefined) {
                    return this._parts[w] || ""; } else {
                    if (v !== null) { v = v + "";
                        if (v.charAt(0) === c) { v = v.substring(1); } }
                    this._parts[w] = v;
                    this.build(!d);
                    return this; } }; };
        for (w in u) { p[w] = y(w, u[w]); }
        u = { search: ['?', 'query'], hash: ['#', 'fragment'] };
        y = function(w, c) {
            return function(v, d) {
                var t = this[w](v, d);
                return typeof t === "string" && t.length ? (c + t) : t; }; };
        for (w in u) { p[w] = y(u[w][1], u[w][0]); }
        p.pathname = function(v, c) {
            if (v === undefined || v === true) {
                var d = this._parts.path || (this._parts.hostname ? '/' : '');
                return v ? U.decodePath(d) : d; } else { this._parts.path = v ? U.recodePath(v) : "/";
                this.build(!c);
                return this; } };
        p.path = p.pathname;
        p.href = function(c, d) {
            var e;
            if (c === undefined) {
                return this.toString(); }
            this._string = "";
            this._parts = U._parts();
            var _ = c instanceof U;
            var i = typeof c === "object" && (c.hostname || c.path || c.pathname);
            if (c.nodeName) {
                var l = U.getDomAttribute(c);
                c = c[l] || "";
                i = false; }
            if (!_ && i && c.pathname !== undefined) { c = c.toString(); }
            if (typeof c === "string") { this._parts = U.parse(c, this._parts); } else if (_ || i) {
                var s = _ ? c._parts : c;
                for (e in s) {
                    if (h.call(this._parts, e)) { this._parts[e] = s[e]; } } } else {
                throw new TypeError("invalid input"); }
            this.build(!d);
            return this; };
        p.is = function(c) {
            var i = false;
            var d = false;
            var e = false;
            var l = false;
            var s = false;
            var t = false;
            var a = false;
            var v = !this._parts.urn;
            if (this._parts.hostname) { v = false;
                d = U.ip4_expression.test(this._parts.hostname);
                e = U.ip6_expression.test(this._parts.hostname);
                i = d || e;
                l = !i;
                s = l && S && S.has(this._parts.hostname);
                t = l && U.idn_expression.test(this._parts.hostname);
                a = l && U.punycode_expression.test(this._parts.hostname); }
            switch (c.toLowerCase()) {
                case 'relative':
                    return v;
                case 'absolute':
                    return !v;
                case 'domain':
                case 'name':
                    return l;
                case 'sld':
                    return s;
                case 'ip':
                    return i;
                case 'ip4':
                case 'ipv4':
                case 'inet4':
                    return d;
                case 'ip6':
                case 'ipv6':
                case 'inet6':
                    return e;
                case 'idn':
                    return t;
                case 'url':
                    return !this._parts.urn;
                case 'urn':
                    return !!this._parts.urn;
                case 'punycode':
                    return a; }
            return null; };
        var z = p.protocol;
        var A = p.port;
        var B = p.hostname;
        p.protocol = function(v, c) {
            if (v !== undefined) {
                if (v) { v = v.replace(/:(\/\/)?$/, '');
                    if (v.match(/[^a-zA-z0-9\.+-]/)) {
                        throw new TypeError("Protocol '" + v + "' contains characters other than [A-Z0-9.+-]"); } } }
            return z.call(this, v, c); };
        p.scheme = p.protocol;
        p.port = function(v, c) {
            if (this._parts.urn) {
                return v === undefined ? '' : this; }
            if (v !== undefined) {
                if (v === 0) { v = null; }
                if (v) { v += "";
                    if (v.charAt(0) === ":") { v = v.substring(1); }
                    if (v.match(/[^0-9]/)) {
                        throw new TypeError("Port '" + v + "' contains characters other than [0-9]"); } } }
            return A.call(this, v, c); };
        p.hostname = function(v, c) {
            if (this._parts.urn) {
                return v === undefined ? '' : this; }
            if (v !== undefined) {
                var x = {};
                U.parseHost(v, x);
                v = x.hostname; }
            return B.call(this, v, c); };
        p.host = function(v, c) {
            if (this._parts.urn) {
                return v === undefined ? '' : this; }
            if (v === undefined) {
                return this._parts.hostname ? U.buildHost(this._parts) : ""; } else { U.parseHost(v, this._parts);
                this.build(!c);
                return this; } };
        p.authority = function(v, c) {
            if (this._parts.urn) {
                return v === undefined ? '' : this; }
            if (v === undefined) {
                return this._parts.hostname ? U.buildAuthority(this._parts) : ""; } else { U.parseAuthority(v, this._parts);
                this.build(!c);
                return this; } };
        p.userinfo = function(v, c) {
            if (this._parts.urn) {
                return v === undefined ? '' : this; }
            if (v === undefined) {
                if (!this._parts.username) {
                    return ""; }
                var t = U.buildUserinfo(this._parts);
                return t.substring(0, t.length - 1); } else {
                if (v[v.length - 1] !== '@') { v += '@'; }
                U.parseUserinfo(v, this._parts);
                this.build(!c);
                return this; } };
        p.resource = function(v, c) {
            var d;
            if (v === undefined) {
                return this.path() + this.search() + this.hash(); }
            d = U.parse(v);
            this._parts.path = d.path;
            this._parts.query = d.query;
            this._parts.fragment = d.fragment;
            this.build(!c);
            return this; };
        p.subdomain = function(v, c) {
            if (this._parts.urn) {
                return v === undefined ? '' : this; }
            if (v === undefined) {
                if (!this._parts.hostname || this.is('IP')) {
                    return ""; }
                var d = this._parts.hostname.length - this.domain().length - 1;
                return this._parts.hostname.substring(0, d) || ""; } else {
                var e = this._parts.hostname.length - this.domain().length;
                var s = this._parts.hostname.substring(0, e);
                var i = new RegExp('^' + b(s));
                if (v && v.charAt(v.length - 1) !== '.') { v += "."; }
                if (v) { U.ensureValidHostname(v); }
                this._parts.hostname = this._parts.hostname.replace(i, v);
                this.build(!c);
                return this; } };
        p.domain = function(v, c) {
            if (this._parts.urn) {
                return v === undefined ? '' : this; }
            if (typeof v === 'boolean') { c = v;
                v = undefined; }
            if (v === undefined) {
                if (!this._parts.hostname || this.is('IP')) {
                    return ""; }
                var t = this._parts.hostname.match(/\./g);
                if (t && t.length < 2) {
                    return this._parts.hostname; }
                var e = this._parts.hostname.length - this.tld(c).length - 1;
                e = this._parts.hostname.lastIndexOf('.', e - 1) + 1;
                return this._parts.hostname.substring(e) || ""; } else {
                if (!v) {
                    throw new TypeError("cannot set domain empty"); }
                U.ensureValidHostname(v);
                if (!this._parts.hostname || this.is('IP')) { this._parts.hostname = v; } else {
                    var d = new RegExp(b(this.domain()) + "$");
                    this._parts.hostname = this._parts.hostname.replace(d, v); }
                this.build(!c);
                return this; } };
        p.tld = function(v, c) {
            if (this._parts.urn) {
                return v === undefined ? '' : this; }
            if (typeof v === 'boolean') { c = v;
                v = undefined; }
            if (v === undefined) {
                if (!this._parts.hostname || this.is('IP')) {
                    return ""; }
                var d = this._parts.hostname.lastIndexOf('.');
                var t = this._parts.hostname.substring(d + 1);
                if (c !== true && S && S.list[t.toLowerCase()]) {
                    return S.get(this._parts.hostname) || t; }
                return t; } else {
                var e;
                if (!v) {
                    throw new TypeError("cannot set TLD empty"); } else if (v.match(/[^a-zA-Z0-9-]/)) {
                    if (S && S.is(v)) { e = new RegExp(b(this.tld()) + "$");
                        this._parts.hostname = this._parts.hostname.replace(e, v); } else {
                        throw new TypeError("TLD '" + v + "' contains characters other than [A-Z0-9]"); } } else if (!this._parts.hostname || this.is('IP')) {
                    throw new ReferenceError("cannot set TLD on non-domain host"); } else { e = new RegExp(b(this.tld()) + "$");
                    this._parts.hostname = this._parts.hostname.replace(e, v); }
                this.build(!c);
                return this; } };
        p.directory = function(v, c) {
            if (this._parts.urn) {
                return v === undefined ? '' : this; }
            if (v === undefined || v === true) {
                if (!this._parts.path && !this._parts.hostname) {
                    return ''; }
                if (this._parts.path === '/') {
                    return '/'; }
                var d = this._parts.path.length - this.filename().length - 1;
                var i = this._parts.path.substring(0, d) || (this._parts.hostname ? "/" : "");
                return v ? U.decodePath(i) : i; } else {
                var e = this._parts.path.length - this.filename().length;
                var l = this._parts.path.substring(0, e);
                var s = new RegExp('^' + b(l));
                if (!this.is('relative')) {
                    if (!v) { v = '/'; }
                    if (v.charAt(0) !== '/') { v = "/" + v; } }
                if (v && v.charAt(v.length - 1) !== '/') { v += '/'; }
                v = U.recodePath(v);
                this._parts.path = this._parts.path.replace(s, v);
                this.build(!c);
                return this; } };
        p.filename = function(v, c) {
            if (this._parts.urn) {
                return v === undefined ? '' : this; }
            if (v === undefined || v === true) {
                if (!this._parts.path || this._parts.path === '/') {
                    return ""; }
                var d = this._parts.path.lastIndexOf('/');
                var e = this._parts.path.substring(d + 1);
                return v ? U.decodePathSegment(e) : e; } else {
                var i = false;
                if (v.charAt(0) === '/') { v = v.substring(1); }
                if (v.match(/\.?\//)) { i = true; }
                var l = new RegExp(b(this.filename()) + "$");
                v = U.recodePath(v);
                this._parts.path = this._parts.path.replace(l, v);
                if (i) { this.normalizePath(c); } else { this.build(!c); }
                return this; } };
        p.suffix = function(v, c) {
            if (this._parts.urn) {
                return v === undefined ? '' : this; }
            if (v === undefined || v === true) {
                if (!this._parts.path || this._parts.path === '/') {
                    return ""; }
                var d = this.filename();
                var e = d.lastIndexOf('.');
                var s, i;
                if (e === -1) {
                    return ""; }
                s = d.substring(e + 1);
                i = (/^[a-z0-9%]+$/i).test(s) ? s : "";
                return v ? U.decodePathSegment(i) : i; } else {
                if (v.charAt(0) === '.') { v = v.substring(1); }
                var l = this.suffix();
                var t;
                if (!l) {
                    if (!v) {
                        return this; }
                    this._parts.path += '.' + U.recodePath(v); } else if (!v) { t = new RegExp(b("." + l) + "$"); } else { t = new RegExp(b(l) + "$"); }
                if (t) { v = U.recodePath(v);
                    this._parts.path = this._parts.path.replace(t, v); }
                this.build(!c);
                return this; } };
        p.segment = function(s, v, c) {
            var d = this._parts.urn ? ':' : '/';
            var e = this.path();
            var t = e.substring(0, 1) === '/';
            var x = e.split(d);
            if (s !== undefined && typeof s !== 'number') { c = v;
                v = s;
                s = undefined; }
            if (s !== undefined && typeof s !== 'number') {
                throw new Error("Bad segment '" + s + "', must be 0-based integer"); }
            if (t) { x.shift(); }
            if (s < 0) { s = Math.max(x.length + s, 0); }
            if (v === undefined) {
                return s === undefined ? x : x[s]; } else if (s === null || x[s] === undefined) {
                if (f(v)) { x = [];
                    for (var i = 0, l = v.length; i < l; i++) {
                        if (!v[i].length && (!x.length || !x[x.length - 1].length)) {
                            continue; }
                        if (x.length && !x[x.length - 1].length) { x.pop(); }
                        x.push(v[i]); } } else if (v || (typeof v === "string")) {
                    if (x[x.length - 1] === "") { x[x.length - 1] = v; } else { x.push(v); } } } else {
                if (v || (typeof v === "string" && v.length)) { x[s] = v; } else { x.splice(s, 1); } }
            if (t) { x.unshift(""); }
            return this.path(x.join(d), c); };
        p.segmentCoded = function(s, v, c) {
            var d, i, l;
            if (typeof s !== 'number') { c = v;
                v = s;
                s = undefined; }
            if (v === undefined) { d = this.segment(s, v, c);
                if (!f(d)) { d = d !== undefined ? U.decode(d) : undefined; } else {
                    for (i = 0, l = d.length; i < l; i++) { d[i] = U.decode(d[i]); } }
                return d; }
            if (!f(v)) { v = typeof v === 'string' ? U.encode(v) : v; } else {
                for (i = 0, l = v.length; i < l; i++) { v[i] = U.decode(v[i]); } }
            return this.segment(s, v, c); };
        var q = p.query;
        p.query = function(v, c) {
            if (v === true) {
                return U.parseQuery(this._parts.query, this._parts.escapeQuerySpace); } else if (typeof v === "function") {
                var d = U.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
                var e = v.call(this, d);
                this._parts.query = U.buildQuery(e || d, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
                this.build(!c);
                return this; } else if (v !== undefined && typeof v !== "string") { this._parts.query = U.buildQuery(v, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
                this.build(!c);
                return this; } else {
                return q.call(this, v, c); } };
        p.setQuery = function(c, v, d) {
            var e = U.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
            if (typeof c === "object") {
                for (var i in c) {
                    if (h.call(c, i)) { e[i] = c[i]; } } } else if (typeof c === "string") { e[c] = v !== undefined ? v : null; } else {
                throw new TypeError("URI.addQuery() accepts an object, string as the name parameter"); }
            this._parts.query = U.buildQuery(e, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
            if (typeof c !== "string") { d = v; }
            this.build(!d);
            return this; };
        p.addQuery = function(c, v, d) {
            var e = U.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
            U.addQuery(e, c, v === undefined ? null : v);
            this._parts.query = U.buildQuery(e, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
            if (typeof c !== "string") { d = v; }
            this.build(!d);
            return this; };
        p.removeQuery = function(c, v, d) {
            var e = U.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
            U.removeQuery(e, c, v);
            this._parts.query = U.buildQuery(e, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
            if (typeof c !== "string") { d = v; }
            this.build(!d);
            return this; };
        p.hasQuery = function(c, v, d) {
            var e = U.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
            return U.hasQuery(e, c, v, d); };
        p.setSearch = p.setQuery;
        p.addSearch = p.addQuery;
        p.removeSearch = p.removeQuery;
        p.hasSearch = p.hasQuery;
        p.normalize = function() {
            if (this._parts.urn) {
                return this.normalizeProtocol(false).normalizeQuery(false).normalizeFragment(false).build(); }
            return this.normalizeProtocol(false).normalizeHostname(false).normalizePort(false).normalizePath(false).normalizeQuery(false).normalizeFragment(false).build(); };
        p.normalizeProtocol = function(c) {
            if (typeof this._parts.protocol === "string") { this._parts.protocol = this._parts.protocol.toLowerCase();
                this.build(!c); }
            return this; };
        p.normalizeHostname = function(c) {
            if (this._parts.hostname) {
                if (this.is('IDN') && a) { this._parts.hostname = a.toASCII(this._parts.hostname); } else if (this.is('IPv6') && I) { this._parts.hostname = I.best(this._parts.hostname); }
                this._parts.hostname = this._parts.hostname.toLowerCase();
                this.build(!c); }
            return this; };
        p.normalizePort = function(c) {
            if (typeof this._parts.protocol === "string" && this._parts.port === U.defaultPorts[this._parts.protocol]) { this._parts.port = null;
                this.build(!c); }
            return this; };
        p.normalizePath = function(c) {
            if (this._parts.urn) {
                return this; }
            if (!this._parts.path || this._parts.path === '/') {
                return this; }
            var d;
            var e = this._parts.path;
            var i, l;
            if (e.charAt(0) !== '/') { d = true;
                e = '/' + e; }
            e = e.replace(/(\/(\.\/)+)|(\/\.$)/g, '/').replace(/\/{2,}/g, '/');
            while (true) { i = e.indexOf('/../');
                if (i === -1) {
                    break; } else if (i === 0) { e = e.substring(3);
                    break; }
                l = e.substring(0, i).lastIndexOf('/');
                if (l === -1) { l = i; }
                e = e.substring(0, l) + e.substring(i + 3); }
            if (d && this.is('relative')) { e = e.substring(1); }
            e = U.recodePath(e);
            this._parts.path = e;
            this.build(!c);
            return this; };
        p.normalizePathname = p.normalizePath;
        p.normalizeQuery = function(c) {
            if (typeof this._parts.query === "string") {
                if (!this._parts.query.length) { this._parts.query = null; } else { this.query(U.parseQuery(this._parts.query, this._parts.escapeQuerySpace)); }
                this.build(!c); }
            return this; };
        p.normalizeFragment = function(c) {
            if (!this._parts.fragment) { this._parts.fragment = null;
                this.build(!c); }
            return this; };
        p.normalizeSearch = p.normalizeQuery;
        p.normalizeHash = p.normalizeFragment;
        p.iso8859 = function() {
            var e = U.encode;
            var d = U.decode;
            U.encode = escape;
            U.decode = decodeURIComponent;
            this.normalize();
            U.encode = e;
            U.decode = d;
            return this; };
        p.unicode = function() {
            var e = U.encode;
            var d = U.decode;
            U.encode = o;
            U.decode = unescape;
            this.normalize();
            U.encode = e;
            U.decode = d;
            return this; };
        p.readable = function() {
            var c = this.clone();
            c.username("").password("").normalize();
            var t = '';
            if (c._parts.protocol) { t += c._parts.protocol + '://'; }
            if (c._parts.hostname) {
                if (c.is('punycode') && a) { t += a.toUnicode(c._parts.hostname);
                    if (c._parts.port) { t += ":" + c._parts.port; } } else { t += c.host(); } }
            if (c._parts.hostname && c._parts.path && c._parts.path.charAt(0) !== '/') { t += '/'; }
            t += c.path(true);
            if (c._parts.query) {
                var q = '';
                for (var i = 0, d = c._parts.query.split('&'), l = d.length; i < l; i++) {
                    var e = (d[i] || "").split('=');
                    q += '&' + U.decodeQuery(e[0], this._parts.escapeQuerySpace).replace(/&/g, '%26');
                    if (e[1] !== undefined) { q += "=" + U.decodeQuery(e[1], this._parts.escapeQuerySpace).replace(/&/g, '%26'); } }
                t += '?' + q.substring(1); }
            t += U.decodeQuery(c.hash(), true);
            return t; };
        p.absoluteTo = function(c) {
            var d = this.clone();
            var e = ['protocol', 'username', 'password', 'hostname', 'port'];
            var l, i, p;
            if (this._parts.urn) {
                throw new Error('URNs do not have any generally defined hierarchical components'); }
            if (!(c instanceof U)) { c = new U(c); }
            if (!d._parts.protocol) { d._parts.protocol = c._parts.protocol; }
            if (this._parts.hostname) {
                return d; }
            for (i = 0; p = e[i]; i++) { d._parts[p] = c._parts[p]; }
            e = ['query', 'path'];
            for (i = 0; p = e[i]; i++) {
                if (!d._parts[p] && c._parts[p]) { d._parts[p] = c._parts[p]; } }
            if (d.path().charAt(0) !== '/') { l = c.directory();
                d._parts.path = (l ? (l + '/') : '') + d._parts.path;
                d.normalizePath(); }
            d.build();
            return d; };
        p.relativeTo = function(c) {
            var d = this.clone().normalize();
            var e, i, l, s, t;
            if (d._parts.urn) {
                throw new Error('URNs do not have any generally defined hierarchical components'); }
            c = new U(c).normalize();
            e = d._parts;
            i = c._parts;
            s = d.path();
            t = c.path();
            if (s.charAt(0) !== '/') {
                throw new Error('URI is already relative'); }
            if (t.charAt(0) !== '/') {
                throw new Error('Cannot calculate a URI relative to another relative URI'); }
            if (e.protocol === i.protocol) { e.protocol = null; }
            if (e.username !== i.username || e.password !== i.password) {
                return d.build(); }
            if (e.protocol !== null || e.username !== null || e.password !== null) {
                return d.build(); }
            if (e.hostname === i.hostname && e.port === i.port) { e.hostname = null;
                e.port = null; } else {
                return d.build(); }
            if (s === t) { e.path = '';
                return d.build(); }
            l = U.commonPath(d.path(), c.path());
            if (!l) {
                return d.build(); }
            var v = i.path.substring(l.length).replace(/[^\/]*$/, '').replace(/.*?\//g, '../');
            e.path = v + e.path.substring(l.length);
            return d.build(); };
        p.equals = function(c) {
            var d = this.clone();
            var t = new U(c);
            var e = {};
            var i = {};
            var l = {};
            var s, v, x;
            d.normalize();
            t.normalize();
            if (d.toString() === t.toString()) {
                return true; }
            s = d.query();
            v = t.query();
            d.query("");
            t.query("");
            if (d.toString() !== t.toString()) {
                return false; }
            if (s.length !== v.length) {
                return false; }
            e = U.parseQuery(s, this._parts.escapeQuerySpace);
            i = U.parseQuery(v, this._parts.escapeQuerySpace);
            for (x in e) {
                if (h.call(e, x)) {
                    if (!f(e[x])) {
                        if (e[x] !== i[x]) {
                            return false; } } else if (!m(e[x], i[x])) {
                        return false; }
                    l[x] = true; } }
            for (x in i) {
                if (h.call(i, x)) {
                    if (!l[x]) {
                        return false; } } }
            return true; };
        p.duplicateQueryParameters = function(v) { this._parts.duplicateQueryParameters = !!v;
            return this; };
        p.escapeQuerySpace = function(v) { this._parts.escapeQuerySpace = !!v;
            return this; };
        return U; }));
    /*!
     * jQuery JavaScript Library v1.11.1
     * http://jquery.com/
     *
     * Includes Sizzle.js
     * http://sizzlejs.com/
     *
     * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
     * Released under the MIT license
     * http://jquery.org/license
     *
     * Date: 2014-05-01T17:42Z
     */
    (function(g, f) {
        if (typeof module === "object" && typeof module.exports === "object") { module.exports = g.document ? f(g, true) : function(w) {
                if (!w.document) {
                    throw new Error("jQuery requires a window with a document"); }
                return f(w); }; } else { f(g); } }(typeof window !== "undefined" ? window : this, function(w, c) {
        var d = [];
        var f = d.slice;
        var g = d.concat;
        var h = d.push;
        var k = d.indexOf;
        var o = {};
        var q = o.toString;
        var u = o.hasOwnProperty;
        var x = {};
        var y = "1.11.1",
            Q = function(s, a) {
                return new Q.fn.init(s, a); },
            z = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
            A = /^-ms-/,
            B = /-([\da-z])/gi,
            C = function(a, l) {
                return l.toUpperCase(); };
        Q.fn = Q.prototype = { jquery: y, constructor: Q, selector: "", length: 0, toArray: function() {
                return f.call(this); }, get: function(n) {
                return n != null ? (n < 0 ? this[n + this.length] : this[n]) : f.call(this); }, pushStack: function(a) {
                var r = Q.merge(this.constructor(), a);
                r.prevObject = this;
                r.context = this.context;
                return r; }, each: function(a, b) {
                return Q.each(this, a, b); }, map: function(a) {
                return this.pushStack(Q.map(this, function(b, i) {
                    return a.call(b, i, b); })); }, slice: function() {
                return this.pushStack(f.apply(this, arguments)); }, first: function() {
                return this.eq(0); }, last: function() {
                return this.eq(-1); }, eq: function(i) {
                var l = this.length,
                    j = +i + (i < 0 ? l : 0);
                return this.pushStack(j >= 0 && j < l ? [this[j]] : []); }, end: function() {
                return this.prevObject || this.constructor(null); }, push: h, sort: d.sort, splice: d.splice };
        Q.extend = Q.fn.extend = function() {
            var s, a, b, n, j, l, t = arguments[0] || {},
                i = 1,
                m = arguments.length,
                p = false;
            if (typeof t === "boolean") { p = t;
                t = arguments[i] || {};
                i++; }
            if (typeof t !== "object" && !Q.isFunction(t)) { t = {}; }
            if (i === m) { t = this;
                i--; }
            for (; i < m; i++) {
                if ((j = arguments[i]) != null) {
                    for (n in j) { s = t[n];
                        b = j[n];
                        if (t === b) {
                            continue; }
                        if (p && b && (Q.isPlainObject(b) || (a = Q.isArray(b)))) {
                            if (a) { a = false;
                                l = s && Q.isArray(s) ? s : []; } else { l = s && Q.isPlainObject(s) ? s : {}; }
                            t[n] = Q.extend(p, l, b); } else if (b !== undefined) { t[n] = b; } } } }
            return t; };
        Q.extend({ expando: "jQuery" + (y + Math.random()).replace(/\D/g, ""), isReady: true, error: function(m) {
                throw new Error(m); }, noop: function() {}, isFunction: function(a) {
                return Q.type(a) === "function"; }, isArray: Array.isArray || function(a) {
                return Q.type(a) === "array"; }, isWindow: function(a) {
                return a != null && a == a.window; }, isNumeric: function(a) {
                return !Q.isArray(a) && a - parseFloat(a) >= 0; }, isEmptyObject: function(a) {
                var n;
                for (n in a) {
                    return false; }
                return true; }, isPlainObject: function(a) {
                var b;
                if (!a || Q.type(a) !== "object" || a.nodeType || Q.isWindow(a)) {
                    return false; }
                try {
                    if (a.constructor && !u.call(a, "constructor") && !u.call(a.constructor.prototype, "isPrototypeOf")) {
                        return false; } } catch (e) {
                    return false; }
                if (x.ownLast) {
                    for (b in a) {
                        return u.call(a, b); } }
                for (b in a) {}
                return b === undefined || u.call(a, b); }, type: function(a) {
                if (a == null) {
                    return a + ""; }
                return typeof a === "object" || typeof a === "function" ? o[q.call(a)] || "object" : typeof a; }, globalEval: function(a) {
                if (a && Q.trim(a)) {
                    (w.execScript || function(a) { w["eval"].call(w, a); })(a); } }, camelCase: function(s) {
                return s.replace(A, "ms-").replace(B, C); }, nodeName: function(a, n) {
                return a.nodeName && a.nodeName.toLowerCase() === n.toLowerCase(); }, each: function(a, b, j) {
                var v, i = 0,
                    l = a.length,
                    m = D(a);
                if (j) {
                    if (m) {
                        for (; i < l; i++) { v = b.apply(a[i], j);
                            if (v === false) {
                                break; } } } else {
                        for (i in a) { v = b.apply(a[i], j);
                            if (v === false) {
                                break; } } } } else {
                    if (m) {
                        for (; i < l; i++) { v = b.call(a[i], i, a[i]);
                            if (v === false) {
                                break; } } } else {
                        for (i in a) { v = b.call(a[i], i, a[i]);
                            if (v === false) {
                                break; } } } }
                return a; }, trim: function(t) {
                return t == null ? "" : (t + "").replace(z, ""); }, makeArray: function(a, r) {
                var b = r || [];
                if (a != null) {
                    if (D(Object(a))) { Q.merge(b, typeof a === "string" ? [a] : a); } else { h.call(b, a); } }
                return b; }, inArray: function(a, b, i) {
                var l;
                if (b) {
                    if (k) {
                        return k.call(b, a, i); }
                    l = b.length;
                    i = i ? i < 0 ? Math.max(0, l + i) : i : 0;
                    for (; i < l; i++) {
                        if (i in b && b[i] === a) {
                            return i; } } }
                return -1; }, merge: function(a, s) {
                var l = +s.length,
                    j = 0,
                    i = a.length;
                while (j < l) { a[i++] = s[j++]; }
                if (l !== l) {
                    while (s[j] !== undefined) { a[i++] = s[j++]; } }
                a.length = i;
                return a; }, grep: function(a, b, j) {
                var l, m = [],
                    i = 0,
                    n = a.length,
                    p = !j;
                for (; i < n; i++) { l = !b(a[i], i);
                    if (l !== p) { m.push(a[i]); } }
                return m; }, map: function(a, b, j) {
                var v, i = 0,
                    l = a.length,
                    m = D(a),
                    r = [];
                if (m) {
                    for (; i < l; i++) { v = b(a[i], i, j);
                        if (v != null) { r.push(v); } } } else {
                    for (i in a) { v = b(a[i], i, j);
                        if (v != null) { r.push(v); } } }
                return g.apply([], r); }, guid: 1, proxy: function(a, b) {
                var j, p, t;
                if (typeof b === "string") { t = a[b];
                    b = a;
                    a = t; }
                if (!Q.isFunction(a)) {
                    return undefined; }
                j = f.call(arguments, 2);
                p = function() {
                    return a.apply(b || this, j.concat(f.call(arguments))); };
                p.guid = a.guid = a.guid || Q.guid++;
                return p; }, now: function() {
                return +(new Date()); }, support: x });
        Q.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, n) { o["[object " + n + "]"] = n.toLowerCase(); });

        function D(a) {
            var l = a.length,
                t = Q.type(a);
            if (t === "function" || Q.isWindow(a)) {
                return false; }
            if (a.nodeType === 1 && l) {
                return true; }
            return t === "array" || l === 0 || typeof l === "number" && l > 0 && (l - 1) in a; }
        var S =
            /*!
             * Sizzle CSS Selector Engine v1.10.19
             * http://sizzlejs.com/
             *
             * Copyright 2013 jQuery Foundation, Inc. and other contributors
             * Released under the MIT license
             * http://jquery.org/license
             *
             * Date: 2014-04-18
             */
            (function(w) {
                var i, x, l, n, p, t, r, s, v, r3, s3, t3, J, o3, u3, v3, w3, x3, y3, z3 = "sizzle" + -(new Date()),
                    A3 = w.document,
                    B3 = 0,
                    C3 = 0,
                    D3 = c4(),
                    E3 = c4(),
                    F3 = c4(),
                    G3 = function(a, b) {
                        if (a === b) { s3 = true; }
                        return 0; },
                    X = typeof undefined,
                    H3 = 1 << 31,
                    u = ({}).hasOwnProperty,
                    I3 = [],
                    J3 = I3.pop,
                    K3 = I3.push,
                    h = I3.push,
                    f = I3.slice,
                    k = I3.indexOf || function(a) {
                        var i = 0,
                            b = this.length;
                        for (; i < b; i++) {
                            if (this[i] === a) {
                                return i; } }
                        return -1; },
                    L3 = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                    M3 = "[\\x20\\t\\r\\n\\f]",
                    N3 = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                    O3 = N3.replace("w", "w#"),
                    P3 = "\\[" + M3 + "*(" + N3 + ")(?:" + M3 + "*([*^$|!~]?=)" + M3 + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + O3 + "))|)" + M3 + "*\\]",
                    Q3 = ":(" + N3 + ")(?:\\((" + "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" + "((?:\\\\.|[^\\\\()[\\]]|" + P3 + ")*)|" + ".*" + ")\\)|)",
                    z = new RegExp("^" + M3 + "+|((?:^|[^\\\\])(?:\\\\.)*)" + M3 + "+$", "g"),
                    R3 = new RegExp("^" + M3 + "*," + M3 + "*"),
                    S3 = new RegExp("^" + M3 + "*([>+~]|" + M3 + ")" + M3 + "*"),
                    T3 = new RegExp("=" + M3 + "*([^\\]'\"]*?)" + M3 + "*\\]", "g"),
                    U3 = new RegExp(Q3),
                    V3 = new RegExp("^" + O3 + "$"),
                    W3 = { "ID": new RegExp("^#(" + N3 + ")"), "CLASS": new RegExp("^\\.(" + N3 + ")"), "TAG": new RegExp("^(" + N3.replace("w", "w*") + ")"), "ATTR": new RegExp("^" + P3), "PSEUDO": new RegExp("^" + Q3), "CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + M3 + "*(even|odd|(([+-]|)(\\d*)n|)" + M3 + "*(?:([+-]|)" + M3 + "*(\\d+)|))" + M3 + "*\\)|)", "i"), "bool": new RegExp("^(?:" + L3 + ")$", "i"), "needsContext": new RegExp("^" + M3 + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + M3 + "*((?:-\\d)?\\d*)" + M3 + "*\\)|)(?=[^-]|$)", "i") },
                    X3 = /^(?:input|select|textarea|button)$/i,
                    Y3 = /^h\d$/i,
                    Z3 = /^[^{]+\{\s*\[native \w/,
                    K = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                    $3 = /[+~]/,
                    _3 = /'|\\/g,
                    a4 = new RegExp("\\\\([\\da-f]{1,6}" + M3 + "?|(" + M3 + ")|.)", "ig"),
                    b4 = function(_, a, b) {
                        var j = "0x" + a - 0x10000;
                        return j !== j || b ? a : j < 0 ? String.fromCharCode(j + 0x10000) : String.fromCharCode(j >> 10 | 0xD800, j & 0x3FF | 0xDC00); };
                try { h.apply((I3 = f.call(A3.childNodes)), A3.childNodes);
                    I3[A3.childNodes.length].nodeType; } catch (e) { h = { apply: I3.length ? function(a, b) { K3.apply(a, f.call(b)); } : function(a, b) {
                            var j = a.length,
                                i = 0;
                            while ((a[j++] = b[i++])) {}
                            a.length = j - 1; } }; }

                function S(a, b, j, _) {
                    var u4, v4, m, w4, i, x4, y4, z4, A4, B4;
                    if ((b ? b.ownerDocument || b : A3) !== J) { t3(b); }
                    b = b || J;
                    j = j || [];
                    if (!a || typeof a !== "string") {
                        return j; }
                    if ((w4 = b.nodeType) !== 1 && w4 !== 9) {
                        return []; }
                    if (u3 && !_) {
                        if ((u4 = K.exec(a))) {
                            if ((m = u4[1])) {
                                if (w4 === 9) { v4 = b.getElementById(m);
                                    if (v4 && v4.parentNode) {
                                        if (v4.id === m) { j.push(v4);
                                            return j; } } else {
                                        return j; } } else {
                                    if (b.ownerDocument && (v4 = b.ownerDocument.getElementById(m)) && y3(b, v4) && v4.id === m) { j.push(v4);
                                        return j; } } } else if (u4[2]) { h.apply(j, b.getElementsByTagName(a));
                                return j; } else if ((m = u4[3]) && x.getElementsByClassName && b.getElementsByClassName) { h.apply(j, b.getElementsByClassName(m));
                                return j; } }
                        if (x.qsa && (!v3 || !v3.test(a))) { z4 = y4 = z3;
                            A4 = b;
                            B4 = w4 === 9 && a;
                            if (w4 === 1 && b.nodeName.toLowerCase() !== "object") { x4 = t(a);
                                if ((y4 = b.getAttribute("id"))) { z4 = y4.replace(_3, "\\$&"); } else { b.setAttribute("id", z4); }
                                z4 = "[id='" + z4 + "'] ";
                                i = x4.length;
                                while (i--) { x4[i] = z4 + m4(x4[i]); }
                                A4 = $3.test(a) && k4(b.parentNode) || b;
                                B4 = x4.join(","); }
                            if (B4) {
                                try { h.apply(j, A4.querySelectorAll(B4));
                                    return j; } catch (C4) {} finally {
                                    if (!y4) { b.removeAttribute("id"); } } } } }
                    return s(a.replace(z, "$1"), b, j, _); }

                function c4() {
                    var a = [];

                    function b(j, m) {
                        if (a.push(j + " ") > l.cacheLength) { delete b[a.shift()]; }
                        return (b[j + " "] = m); }
                    return b; }

                function d4(a) { a[z3] = true;
                    return a; }

                function e4(a) {
                    var b = J.createElement("div");
                    try {
                        return !!a(b); } catch (e) {
                        return false; } finally {
                        if (b.parentNode) { b.parentNode.removeChild(b); }
                        b = null; } }

                function f4(a, b) {
                    var I3 = a.split("|"),
                        i = a.length;
                    while (i--) { l.attrHandle[I3[i]] = b; } }

                function g4(a, b) {
                    var j = b && a,
                        m = j && a.nodeType === 1 && b.nodeType === 1 && (~b.sourceIndex || H3) - (~a.sourceIndex || H3);
                    if (m) {
                        return m; }
                    if (j) {
                        while ((j = j.nextSibling)) {
                            if (j === b) {
                                return -1; } } }
                    return a ? 1 : -1; }

                function h4(a) {
                    return function(b) {
                        var j = b.nodeName.toLowerCase();
                        return j === "input" && b.type === a; }; }

                function i4(a) {
                    return function(b) {
                        var j = b.nodeName.toLowerCase();
                        return (j === "input" || j === "button") && b.type === a; }; }

                function j4(a) {
                    return d4(function(b) { b = +b;
                        return d4(function(m, x3) {
                            var j, _ = a([], m.length, b),
                                i = _.length;
                            while (i--) {
                                if (m[(j = _[i])]) { m[j] = !(x3[j] = m[j]); } } }); }); }

                function k4(a) {
                    return a && typeof a.getElementsByTagName !== X && a; }
                x = S.support = {};
                p = S.isXML = function(a) {
                    var b = a && (a.ownerDocument || a).documentElement;
                    return b ? b.nodeName !== "HTML" : false; };
                t3 = S.setDocument = function(j) {
                    var _, u4 = j ? j.ownerDocument || j : A3,
                        v4 = u4.defaultView;
                    if (u4 === J || u4.nodeType !== 9 || !u4.documentElement) {
                        return J; }
                    J = u4;
                    o3 = u4.documentElement;
                    u3 = !p(u4);
                    if (v4 && v4 !== v4.top) {
                        if (v4.addEventListener) { v4.addEventListener("unload", function() { t3(); }, false); } else if (v4.attachEvent) { v4.attachEvent("onunload", function() { t3(); }); } }
                    x.attributes = e4(function(a) { a.className = "i";
                        return !a.getAttribute("className"); });
                    x.getElementsByTagName = e4(function(a) { a.appendChild(u4.createComment(""));
                        return !a.getElementsByTagName("*").length; });
                    x.getElementsByClassName = Z3.test(u4.getElementsByClassName) && e4(function(a) { a.innerHTML = "<div class='a'></div><div class='a i'></div>";
                        a.firstChild.className = "i";
                        return a.getElementsByClassName("i").length === 2; });
                    x.getById = e4(function(a) { o3.appendChild(a).id = z3;
                        return !u4.getElementsByName || !u4.getElementsByName(z3).length; });
                    if (x.getById) { l.find["ID"] = function(a, b) {
                            if (typeof b.getElementById !== X && u3) {
                                var m = b.getElementById(a);
                                return m && m.parentNode ? [m] : []; } };
                        l.filter["ID"] = function(a) {
                            var b = a.replace(a4, b4);
                            return function(m) {
                                return m.getAttribute("id") === b; }; }; } else { delete l.find["ID"];
                        l.filter["ID"] = function(a) {
                            var b = a.replace(a4, b4);
                            return function(m) {
                                var j = typeof m.getAttributeNode !== X && m.getAttributeNode("id");
                                return j && j.value === b; }; }; }
                    l.find["TAG"] = x.getElementsByTagName ? function(a, b) {
                        if (typeof b.getElementsByTagName !== X) {
                            return b.getElementsByTagName(a); } } : function(a, b) {
                        var m, w4 = [],
                            i = 0,
                            x4 = b.getElementsByTagName(a);
                        if (a === "*") {
                            while ((m = x4[i++])) {
                                if (m.nodeType === 1) { w4.push(m); } }
                            return w4; }
                        return x4; };
                    l.find["CLASS"] = x.getElementsByClassName && function(a, b) {
                        if (typeof b.getElementsByClassName !== X && u3) {
                            return b.getElementsByClassName(a); } };
                    w3 = [];
                    v3 = [];
                    if ((x.qsa = Z3.test(u4.querySelectorAll))) { e4(function(a) { a.innerHTML = "<select msallowclip=''><option selected=''></option></select>";
                            if (a.querySelectorAll("[msallowclip^='']").length) { v3.push("[*^$]=" + M3 + "*(?:''|\"\")"); }
                            if (!a.querySelectorAll("[selected]").length) { v3.push("\\[" + M3 + "*(?:value|" + L3 + ")"); }
                            if (!a.querySelectorAll(":checked").length) { v3.push(":checked"); } });
                        e4(function(a) {
                            var b = u4.createElement("input");
                            b.setAttribute("type", "hidden");
                            a.appendChild(b).setAttribute("name", "D");
                            if (a.querySelectorAll("[name=d]").length) { v3.push("name" + M3 + "*[*^$|!~]?="); }
                            if (!a.querySelectorAll(":enabled").length) { v3.push(":enabled", ":disabled"); }
                            a.querySelectorAll("*,:x");
                            v3.push(",.*:"); }); }
                    if ((x.matchesSelector = Z3.test((x3 = o3.matches || o3.webkitMatchesSelector || o3.mozMatchesSelector || o3.oMatchesSelector || o3.msMatchesSelector)))) { e4(function(a) { x.disconnectedMatch = x3.call(a, "div");
                            x3.call(a, "[s!='']:x");
                            w3.push("!=", Q3); }); }
                    v3 = v3.length && new RegExp(v3.join("|"));
                    w3 = w3.length && new RegExp(w3.join("|"));
                    _ = Z3.test(o3.compareDocumentPosition);
                    y3 = _ || Z3.test(o3.contains) ? function(a, b) {
                        var m = a.nodeType === 9 ? a.documentElement : a,
                            w4 = b && b.parentNode;
                        return a === w4 || !!(w4 && w4.nodeType === 1 && (m.contains ? m.contains(w4) : a.compareDocumentPosition && a.compareDocumentPosition(w4) & 16)); } : function(a, b) {
                        if (b) {
                            while ((b = b.parentNode)) {
                                if (b === a) {
                                    return true; } } }
                        return false; };
                    G3 = _ ? function(a, b) {
                        if (a === b) { s3 = true;
                            return 0; }
                        var m = !a.compareDocumentPosition - !b.compareDocumentPosition;
                        if (m) {
                            return m; }
                        m = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1;
                        if (m & 1 || (!x.sortDetached && b.compareDocumentPosition(a) === m)) {
                            if (a === u4 || a.ownerDocument === A3 && y3(A3, a)) {
                                return -1; }
                            if (b === u4 || b.ownerDocument === A3 && y3(A3, b)) {
                                return 1; }
                            return r3 ? (k.call(r3, a) - k.call(r3, b)) : 0; }
                        return m & 4 ? -1 : 1; } : function(a, b) {
                        if (a === b) { s3 = true;
                            return 0; }
                        var m, i = 0,
                            w4 = a.parentNode,
                            x4 = b.parentNode,
                            ap = [a],
                            bp = [b];
                        if (!w4 || !x4) {
                            return a === u4 ? -1 : b === u4 ? 1 : w4 ? -1 : x4 ? 1 : r3 ? (k.call(r3, a) - k.call(r3, b)) : 0; } else if (w4 === x4) {
                            return g4(a, b); }
                        m = a;
                        while ((m = m.parentNode)) { ap.unshift(m); }
                        m = b;
                        while ((m = m.parentNode)) { bp.unshift(m); }
                        while (ap[i] === bp[i]) { i++; }
                        return i ? g4(ap[i], bp[i]) : ap[i] === A3 ? -1 : bp[i] === A3 ? 1 : 0; };
                    return u4; };
                S.matches = function(a, b) {
                    return S(a, null, null, b); };
                S.matchesSelector = function(a, b) {
                    if ((a.ownerDocument || a) !== J) { t3(a); }
                    b = b.replace(T3, "='$1']");
                    if (x.matchesSelector && u3 && (!w3 || !w3.test(b)) && (!v3 || !v3.test(b))) {
                        try {
                            var j = x3.call(a, b);
                            if (j || x.disconnectedMatch || a.document && a.document.nodeType !== 11) {
                                return j; } } catch (e) {} }
                    return S(b, J, null, [a]).length > 0; };
                S.contains = function(a, b) {
                    if ((a.ownerDocument || a) !== J) { t3(a); }
                    return y3(a, b); };
                S.attr = function(a, b) {
                    if ((a.ownerDocument || a) !== J) { t3(a); }
                    var j = l.attrHandle[b.toLowerCase()],
                        m = j && u.call(l.attrHandle, b.toLowerCase()) ? j(a, b, !u3) : undefined;
                    return m !== undefined ? m : x.attributes || !u3 ? a.getAttribute(b) : (m = a.getAttributeNode(b)) && m.specified ? m.value : null; };
                S.error = function(m) {
                    throw new Error("Syntax error, unrecognized expression: " + m); };
                S.uniqueSort = function(a) {
                    var b, m = [],
                        j = 0,
                        i = 0;
                    s3 = !x.detectDuplicates;
                    r3 = !x.sortStable && a.slice(0);
                    a.sort(G3);
                    if (s3) {
                        while ((b = a[i++])) {
                            if (b === a[i]) { j = m.push(i); } }
                        while (j--) { a.splice(m[j], 1); } }
                    r3 = null;
                    return a; };
                n = S.getText = function(a) {
                    var b, j = "",
                        i = 0,
                        m = a.nodeType;
                    if (!m) {
                        while ((b = a[i++])) { j += n(b); } } else if (m === 1 || m === 9 || m === 11) {
                        if (typeof a.textContent === "string") {
                            return a.textContent; } else {
                            for (a = a.firstChild; a; a = a.nextSibling) { j += n(a); } } } else if (m === 3 || m === 4) {
                        return a.nodeValue; }
                    return j; };
                l = S.selectors = { cacheLength: 50, createPseudo: d4, match: W3, attrHandle: {}, find: {}, relative: { ">": { dir: "parentNode", first: true }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: true }, "~": { dir: "previousSibling" } }, preFilter: { "ATTR": function(m) { m[1] = m[1].replace(a4, b4);
                            m[3] = (m[3] || m[4] || m[5] || "").replace(a4, b4);
                            if (m[2] === "~=") { m[3] = " " + m[3] + " "; }
                            return m.slice(0, 4); }, "CHILD": function(m) { m[1] = m[1].toLowerCase();
                            if (m[1].slice(0, 3) === "nth") {
                                if (!m[3]) { S.error(m[0]); }
                                m[4] = +(m[4] ? m[5] + (m[6] || 1) : 2 * (m[3] === "even" || m[3] === "odd"));
                                m[5] = +((m[7] + m[8]) || m[3] === "odd"); } else if (m[3]) { S.error(m[0]); }
                            return m; }, "PSEUDO": function(m) {
                            var a, b = !m[6] && m[2];
                            if (W3["CHILD"].test(m[0])) {
                                return null; }
                            if (m[3]) { m[2] = m[4] || m[5] || ""; } else if (b && U3.test(b) && (a = t(b, true)) && (a = b.indexOf(")", b.length - a) - b.length)) { m[0] = m[0].slice(0, a);
                                m[2] = b.slice(0, a); }
                            return m.slice(0, 3); } }, filter: { "TAG": function(a) {
                            var b = a.replace(a4, b4).toLowerCase();
                            return a === "*" ? function() {
                                return true; } : function(j) {
                                return j.nodeName && j.nodeName.toLowerCase() === b; }; }, "CLASS": function(a) {
                            var b = D3[a + " "];
                            return b || (b = new RegExp("(^|" + M3 + ")" + a + "(" + M3 + "|$)")) && D3(a, function(j) {
                                return b.test(typeof j.className === "string" && j.className || typeof j.getAttribute !== X && j.getAttribute("class") || ""); }); }, "ATTR": function(a, b, j) {
                            return function(m) {
                                var _ = S.attr(m, a);
                                if (_ == null) {
                                    return b === "!="; }
                                if (!b) {
                                    return true; }
                                _ += "";
                                return b === "=" ? _ === j : b === "!=" ? _ !== j : b === "^=" ? j && _.indexOf(j) === 0 : b === "*=" ? j && _.indexOf(j) > -1 : b === "$=" ? j && _.slice(-j.length) === j : b === "~=" ? (" " + _ + " ").indexOf(j) > -1 : b === "|=" ? _ === j || _.slice(0, j.length + 1) === j + "-" : false; }; }, "CHILD": function(a, b, j, m, _) {
                            var u4 = a.slice(0, 3) !== "nth",
                                v4 = a.slice(-4) !== "last",
                                w4 = b === "of-type";
                            return m === 1 && _ === 0 ? function(x4) {
                                return !!x4.parentNode; } : function(x4, y4, z4) {
                                var A4, B4, C4, D4, E4, F4, G4 = u4 !== v4 ? "nextSibling" : "previousSibling",
                                    H4 = x4.parentNode,
                                    I4 = w4 && x4.nodeName.toLowerCase(),
                                    J4 = !z4 && !w4;
                                if (H4) {
                                    if (u4) {
                                        while (G4) { C4 = x4;
                                            while ((C4 = C4[G4])) {
                                                if (w4 ? C4.nodeName.toLowerCase() === I4 : C4.nodeType === 1) {
                                                    return false; } }
                                            F4 = G4 = a === "only" && !F4 && "nextSibling"; }
                                        return true; }
                                    F4 = [v4 ? H4.firstChild : H4.lastChild];
                                    if (v4 && J4) { B4 = H4[z3] || (H4[z3] = {});
                                        A4 = B4[a] || [];
                                        E4 = A4[0] === B3 && A4[1];
                                        D4 = A4[0] === B3 && A4[2];
                                        C4 = E4 && H4.childNodes[E4];
                                        while ((C4 = ++E4 && C4 && C4[G4] || (D4 = E4 = 0) || F4.pop())) {
                                            if (C4.nodeType === 1 && ++D4 && C4 === x4) { B4[a] = [B3, E4, D4];
                                                break; } } } else if (J4 && (A4 = (x4[z3] || (x4[z3] = {}))[a]) && A4[0] === B3) { D4 = A4[1]; } else {
                                        while ((C4 = ++E4 && C4 && C4[G4] || (D4 = E4 = 0) || F4.pop())) {
                                            if ((w4 ? C4.nodeName.toLowerCase() === I4 : C4.nodeType === 1) && ++D4) {
                                                if (J4) {
                                                    (C4[z3] || (C4[z3] = {}))[a] = [B3, D4]; }
                                                if (C4 === x4) {
                                                    break; } } } }
                                    D4 -= _;
                                    return D4 === m || (D4 % m === 0 && D4 / m >= 0); } }; }, "PSEUDO": function(a, b) {
                            var j, m = l.pseudos[a] || l.setFilters[a.toLowerCase()] || S.error("unsupported pseudo: " + a);
                            if (m[z3]) {
                                return m(b); }
                            if (m.length > 1) { j = [a, a, "", b];
                                return l.setFilters.hasOwnProperty(a.toLowerCase()) ? d4(function(_, x3) {
                                    var u4, v4 = m(_, b),
                                        i = v4.length;
                                    while (i--) { u4 = k.call(_, v4[i]);
                                        _[u4] = !(x3[u4] = v4[i]); } }) : function(_) {
                                    return m(_, 0, j); }; }
                            return m; } }, pseudos: { "not": d4(function(a) {
                            var b = [],
                                j = [],
                                m = r(a.replace(z, "$1"));
                            return m[z3] ? d4(function(_, x3, u4, v4) {
                                var w4, x4 = m(_, null, v4, []),
                                    i = _.length;
                                while (i--) {
                                    if ((w4 = x4[i])) { _[i] = !(x3[i] = w4); } } }) : function(_, u4, v4) { b[0] = _;
                                m(b, null, v4, j);
                                return !j.pop(); }; }), "has": d4(function(a) {
                            return function(b) {
                                return S(a, b).length > 0; }; }), "contains": d4(function(a) {
                            return function(b) {
                                return (b.textContent || b.innerText || n(b)).indexOf(a) > -1; }; }), "lang": d4(function(a) {
                            if (!V3.test(a || "")) { S.error("unsupported lang: " + a); }
                            a = a.replace(a4, b4).toLowerCase();
                            return function(b) {
                                var j;
                                do {
                                    if ((j = u3 ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang"))) { j = j.toLowerCase();
                                        return j === a || j.indexOf(a + "-") === 0; } } while ((b = b.parentNode) && b.nodeType === 1);
                                return false; }; }), "target": function(a) {
                            var b = w.location && w.location.hash;
                            return b && b.slice(1) === a.id; }, "root": function(a) {
                            return a === o3; }, "focus": function(a) {
                            return a === J.activeElement && (!J.hasFocus || J.hasFocus()) && !!(a.type || a.href || ~a.tabIndex); }, "enabled": function(a) {
                            return a.disabled === false; }, "disabled": function(a) {
                            return a.disabled === true; }, "checked": function(a) {
                            var b = a.nodeName.toLowerCase();
                            return (b === "input" && !!a.checked) || (b === "option" && !!a.selected); }, "selected": function(a) {
                            if (a.parentNode) { a.parentNode.selectedIndex; }
                            return a.selected === true; }, "empty": function(a) {
                            for (a = a.firstChild; a; a = a.nextSibling) {
                                if (a.nodeType < 6) {
                                    return false; } }
                            return true; }, "parent": function(a) {
                            return !l.pseudos["empty"](a); }, "header": function(a) {
                            return Y3.test(a.nodeName); }, "input": function(a) {
                            return X3.test(a.nodeName); }, "button": function(a) {
                            var b = a.nodeName.toLowerCase();
                            return b === "input" && a.type === "button" || b === "button"; }, "text": function(a) {
                            var b;
                            return a.nodeName.toLowerCase() === "input" && a.type === "text" && ((b = a.getAttribute("type")) == null || b.toLowerCase() === "text"); }, "first": j4(function() {
                            return [0]; }), "last": j4(function(m, a) {
                            return [a - 1]; }), "eq": j4(function(m, a, b) {
                            return [b < 0 ? b + a : b]; }), "even": j4(function(m, a) {
                            var i = 0;
                            for (; i < a; i += 2) { m.push(i); }
                            return m; }), "odd": j4(function(m, a) {
                            var i = 1;
                            for (; i < a; i += 2) { m.push(i); }
                            return m; }), "lt": j4(function(m, a, b) {
                            var i = b < 0 ? b + a : b;
                            for (; --i >= 0;) { m.push(i); }
                            return m; }), "gt": j4(function(m, a, b) {
                            var i = b < 0 ? b + a : b;
                            for (; ++i < a;) { m.push(i); }
                            return m; }) } };
                l.pseudos["nth"] = l.pseudos["eq"];
                for (i in { radio: true, checkbox: true, file: true, password: true, image: true }) { l.pseudos[i] = h4(i); }
                for (i in { submit: true, reset: true }) { l.pseudos[i] = i4(i); }

                function l4() {}
                l4.prototype = l.filters = l.pseudos;
                l.setFilters = new l4();
                t = S.tokenize = function(a, b) {
                    var m, j, _, u4, v4, w4, x4, y4 = E3[a + " "];
                    if (y4) {
                        return b ? 0 : y4.slice(0); }
                    v4 = a;
                    w4 = [];
                    x4 = l.preFilter;
                    while (v4) {
                        if (!m || (j = R3.exec(v4))) {
                            if (j) { v4 = v4.slice(j[0].length) || v4; }
                            w4.push((_ = [])); }
                        m = false;
                        if ((j = S3.exec(v4))) { m = j.shift();
                            _.push({ value: m, type: j[0].replace(z, " ") });
                            v4 = v4.slice(m.length); }
                        for (u4 in l.filter) {
                            if ((j = W3[u4].exec(v4)) && (!x4[u4] || (j = x4[u4](j)))) { m = j.shift();
                                _.push({ value: m, type: u4, matches: j });
                                v4 = v4.slice(m.length); } }
                        if (!m) {
                            break; } }
                    return b ? v4.length : v4 ? S.error(a) : E3(a, w4).slice(0); };

                function m4(a) {
                    var i = 0,
                        b = a.length,
                        j = "";
                    for (; i < b; i++) { j += a[i].value; }
                    return j; }

                function n4(m, a, b) {
                    var j = a.dir,
                        _ = b && j === "parentNode",
                        u4 = C3++;
                    return a.first ? function(v4, w4, x4) {
                        while ((v4 = v4[j])) {
                            if (v4.nodeType === 1 || _) {
                                return m(v4, w4, x4); } } } : function(v4, w4, x4) {
                        var y4, z4, A4 = [B3, u4];
                        if (x4) {
                            while ((v4 = v4[j])) {
                                if (v4.nodeType === 1 || _) {
                                    if (m(v4, w4, x4)) {
                                        return true; } } } } else {
                            while ((v4 = v4[j])) {
                                if (v4.nodeType === 1 || _) { z4 = v4[z3] || (v4[z3] = {});
                                    if ((y4 = z4[j]) && y4[0] === B3 && y4[1] === u4) {
                                        return (A4[2] = y4[2]); } else { z4[j] = A4;
                                        if ((A4[2] = m(v4, w4, x4))) {
                                            return true; } } } } } }; }

                function o4(m) {
                    return m.length > 1 ? function(a, b, j) {
                        var i = m.length;
                        while (i--) {
                            if (!m[i](a, b, j)) {
                                return false; } }
                        return true; } : m[0]; }

                function p4(a, b, j) {
                    var i = 0,
                        m = b.length;
                    for (; i < m; i++) { S(a, b[i], j); }
                    return j; }

                function q4(a, m, b, j, _) {
                    var u4, v4 = [],
                        i = 0,
                        w4 = a.length,
                        x4 = m != null;
                    for (; i < w4; i++) {
                        if ((u4 = a[i])) {
                            if (!b || b(u4, j, _)) { v4.push(u4);
                                if (x4) { m.push(i); } } } }
                    return v4; }

                function r4(a, b, m, j, _, u4) {
                    if (j && !j[z3]) { j = r4(j); }
                    if (_ && !_[z3]) { _ = r4(_, u4); }
                    return d4(function(v4, w4, x4, y4) {
                        var z4, i, A4, B4 = [],
                            C4 = [],
                            D4 = w4.length,
                            E4 = v4 || p4(b || "*", x4.nodeType ? [x4] : x4, []),
                            F4 = a && (v4 || !b) ? q4(E4, B4, a, x4, y4) : E4,
                            G4 = m ? _ || (v4 ? a : D4 || j) ? [] : w4 : F4;
                        if (m) { m(F4, G4, x4, y4); }
                        if (j) { z4 = q4(G4, C4);
                            j(z4, [], x4, y4);
                            i = z4.length;
                            while (i--) {
                                if ((A4 = z4[i])) { G4[C4[i]] = !(F4[C4[i]] = A4); } } }
                        if (v4) {
                            if (_ || a) {
                                if (_) { z4 = [];
                                    i = G4.length;
                                    while (i--) {
                                        if ((A4 = G4[i])) { z4.push((F4[i] = A4)); } }
                                    _(null, (G4 = []), z4, y4); }
                                i = G4.length;
                                while (i--) {
                                    if ((A4 = G4[i]) && (z4 = _ ? k.call(v4, A4) : B4[i]) > -1) { v4[z4] = !(w4[z4] = A4); } } } } else { G4 = q4(G4 === w4 ? G4.splice(D4, G4.length) : G4);
                            if (_) { _(null, w4, G4, y4); } else { h.apply(w4, G4); } } }); }

                function s4(a) {
                    var b, m, j, _ = a.length,
                        u4 = l.relative[a[0].type],
                        v4 = u4 || l.relative[" "],
                        i = u4 ? 1 : 0,
                        w4 = n4(function(z4) {
                            return z4 === b; }, v4, true),
                        x4 = n4(function(z4) {
                            return k.call(b, z4) > -1; }, v4, true),
                        y4 = [function(z4, A4, B4) {
                            return (!u4 && (B4 || A4 !== v)) || ((b = A4).nodeType ? w4(z4, A4, B4) : x4(z4, A4, B4)); }];
                    for (; i < _; i++) {
                        if ((m = l.relative[a[i].type])) { y4 = [n4(o4(y4), m)]; } else { m = l.filter[a[i].type].apply(null, a[i].matches);
                            if (m[z3]) { j = ++i;
                                for (; j < _; j++) {
                                    if (l.relative[a[j].type]) {
                                        break; } }
                                return r4(i > 1 && o4(y4), i > 1 && m4(a.slice(0, i - 1).concat({ value: a[i - 2].type === " " ? "*" : "" })).replace(z, "$1"), m, i < j && s4(a.slice(i, j)), j < _ && s4((a = a.slice(j))), j < _ && m4(a)); }
                            y4.push(m); } }
                    return o4(y4); }

                function t4(a, b) {
                    var m = b.length > 0,
                        _ = a.length > 0,
                        u4 = function(v4, w4, x4, y4, z4) {
                            var A4, j, B4, C4 = 0,
                                i = "0",
                                D4 = v4 && [],
                                E4 = [],
                                F4 = v,
                                G4 = v4 || _ && l.find["TAG"]("*", z4),
                                H4 = (B3 += F4 == null ? 1 : Math.random() || 0.1),
                                I4 = G4.length;
                            if (z4) { v = w4 !== J && w4; }
                            for (; i !== I4 && (A4 = G4[i]) != null; i++) {
                                if (_ && A4) { j = 0;
                                    while ((B4 = a[j++])) {
                                        if (B4(A4, w4, x4)) { y4.push(A4);
                                            break; } }
                                    if (z4) { B3 = H4; } }
                                if (m) {
                                    if ((A4 = !B4 && A4)) { C4--; }
                                    if (v4) { D4.push(A4); } } }
                            C4 += i;
                            if (m && i !== C4) { j = 0;
                                while ((B4 = b[j++])) { B4(D4, E4, w4, x4); }
                                if (v4) {
                                    if (C4 > 0) {
                                        while (i--) {
                                            if (!(D4[i] || E4[i])) { E4[i] = J3.call(y4); } } }
                                    E4 = q4(E4); }
                                h.apply(y4, E4);
                                if (z4 && !v4 && E4.length > 0 && (C4 + b.length) > 1) { S.uniqueSort(y4); } }
                            if (z4) { B3 = H4;
                                v = F4; }
                            return D4; };
                    return m ? d4(u4) : u4; }
                r = S.compile = function(a, m) {
                    var i, b = [],
                        j = [],
                        _ = F3[a + " "];
                    if (!_) {
                        if (!m) { m = t(a); }
                        i = m.length;
                        while (i--) { _ = s4(m[i]);
                            if (_[z3]) { b.push(_); } else { j.push(_); } }
                        _ = F3(a, t4(j, b));
                        _.selector = a; }
                    return _; };
                s = S.select = function(a, b, j, m) {
                    var i, _, u4, v4, w4, x4 = typeof a === "function" && a,
                        y4 = !m && t((a = x4.selector || a));
                    j = j || [];
                    if (y4.length === 1) { _ = y4[0] = y4[0].slice(0);
                        if (_.length > 2 && (u4 = _[0]).type === "ID" && x.getById && b.nodeType === 9 && u3 && l.relative[_[1].type]) { b = (l.find["ID"](u4.matches[0].replace(a4, b4), b) || [])[0];
                            if (!b) {
                                return j; } else if (x4) { b = b.parentNode; }
                            a = a.slice(_.shift().value.length); }
                        i = W3["needsContext"].test(a) ? 0 : _.length;
                        while (i--) { u4 = _[i];
                            if (l.relative[(v4 = u4.type)]) {
                                break; }
                            if ((w4 = l.find[v4])) {
                                if ((m = w4(u4.matches[0].replace(a4, b4), $3.test(_[0].type) && k4(b.parentNode) || b))) { _.splice(i, 1);
                                    a = m.length && m4(_);
                                    if (!a) { h.apply(j, m);
                                        return j; }
                                    break; } } } }(x4 || r(a, y4))(m, b, !u3, j, $3.test(a) && k4(b.parentNode) || b);
                    return j; };
                x.sortStable = z3.split("").sort(G3).join("") === z3;
                x.detectDuplicates = !!s3;
                t3();
                x.sortDetached = e4(function(a) {
                    return a.compareDocumentPosition(J.createElement("div")) & 1; });
                if (!e4(function(a) { a.innerHTML = "<a href='#'></a>";
                        return a.firstChild.getAttribute("href") === "#"; })) { f4("type|href|height|width", function(a, b, p) {
                        if (!p) {
                            return a.getAttribute(b, b.toLowerCase() === "type" ? 1 : 2); } }); }
                if (!x.attributes || !e4(function(a) { a.innerHTML = "<input/>";
                        a.firstChild.setAttribute("value", "");
                        return a.firstChild.getAttribute("value") === ""; })) { f4("value", function(a, b, p) {
                        if (!p && a.nodeName.toLowerCase() === "input") {
                            return a.defaultValue; } }); }
                if (!e4(function(a) {
                        return a.getAttribute("disabled") == null; })) { f4(L3, function(a, b, p) {
                        var j;
                        if (!p) {
                            return a[b] === true ? b.toLowerCase() : (j = a.getAttributeNode(b)) && j.specified ? j.value : null; } }); }
                return S; })(w);
        Q.find = S;
        Q.expr = S.selectors;
        Q.expr[":"] = Q.expr.pseudos;
        Q.unique = S.uniqueSort;
        Q.text = S.getText;
        Q.isXMLDoc = S.isXML;
        Q.contains = S.contains;
        var E = Q.expr.match.needsContext;
        var F = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);
        var G = /^.[^:#\[\.,]*$/;

        function H(a, b, n) {
            if (Q.isFunction(b)) {
                return Q.grep(a, function(j, i) {
                    return !!b.call(j, i, j) !== n; }); }
            if (b.nodeType) {
                return Q.grep(a, function(j) {
                    return (j === b) !== n; }); }
            if (typeof b === "string") {
                if (G.test(b)) {
                    return Q.filter(b, a, n); }
                b = Q.filter(b, a); }
            return Q.grep(a, function(j) {
                return (Q.inArray(j, b) >= 0) !== n; }); }
        Q.filter = function(a, b, n) {
            var j = b[0];
            if (n) { a = ":not(" + a + ")"; }
            return b.length === 1 && j.nodeType === 1 ? Q.find.matchesSelector(j, a) ? [j] : [] : Q.find.matches(a, Q.grep(b, function(j) {
                return j.nodeType === 1; })); };
        Q.fn.extend({ find: function(s) {
                var i, r = [],
                    a = this,
                    l = a.length;
                if (typeof s !== "string") {
                    return this.pushStack(Q(s).filter(function() {
                        for (i = 0; i < l; i++) {
                            if (Q.contains(a[i], this)) {
                                return true; } } })); }
                for (i = 0; i < l; i++) { Q.find(s, a[i], r); }
                r = this.pushStack(l > 1 ? Q.unique(r) : r);
                r.selector = this.selector ? this.selector + " " + s : s;
                return r; }, filter: function(s) {
                return this.pushStack(H(this, s || [], false)); }, not: function(s) {
                return this.pushStack(H(this, s || [], true)); }, is: function(s) {
                return !!H(this, typeof s === "string" && E.test(s) ? Q(s) : s || [], false).length; } });
        var I, J = w.document,
            K = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
            L = Q.fn.init = function(s, a) {
                var m, b;
                if (!s) {
                    return this; }
                if (typeof s === "string") {
                    if (s.charAt(0) === "<" && s.charAt(s.length - 1) === ">" && s.length >= 3) { m = [null, s, null]; } else { m = K.exec(s); }
                    if (m && (m[1] || !a)) {
                        if (m[1]) { a = a instanceof Q ? a[0] : a;
                            Q.merge(this, Q.parseHTML(m[1], a && a.nodeType ? a.ownerDocument || a : J, true));
                            if (F.test(m[1]) && Q.isPlainObject(a)) {
                                for (m in a) {
                                    if (Q.isFunction(this[m])) { this[m](a[m]); } else { this.attr(m, a[m]); } } }
                            return this; } else { b = J.getElementById(m[2]);
                            if (b && b.parentNode) {
                                if (b.id !== m[2]) {
                                    return I.find(s); }
                                this.length = 1;
                                this[0] = b; }
                            this.context = J;
                            this.selector = s;
                            return this; } } else if (!a || a.jquery) {
                        return (a || I).find(s); } else {
                        return this.constructor(a).find(s); } } else if (s.nodeType) { this.context = this[0] = s;
                    this.length = 1;
                    return this; } else if (Q.isFunction(s)) {
                    return typeof I.ready !== "undefined" ? I.ready(s) : s(Q); }
                if (s.selector !== undefined) { this.selector = s.selector;
                    this.context = s.context; }
                return Q.makeArray(s, this); };
        L.prototype = Q.fn;
        I = Q(J);
        var M = /^(?:parents|prev(?:Until|All))/,
            N = { children: true, contents: true, next: true, prev: true };
        Q.extend({ dir: function(a, b, j) {
                var m = [],
                    l = a[b];
                while (l && l.nodeType !== 9 && (j === undefined || l.nodeType !== 1 || !Q(l).is(j))) {
                    if (l.nodeType === 1) { m.push(l); }
                    l = l[b]; }
                return m; }, sibling: function(n, a) {
                var r = [];
                for (; n; n = n.nextSibling) {
                    if (n.nodeType === 1 && n !== a) { r.push(n); } }
                return r; } });
        Q.fn.extend({ has: function(t) {
                var i, a = Q(t, this),
                    l = a.length;
                return this.filter(function() {
                    for (i = 0; i < l; i++) {
                        if (Q.contains(this, a[i])) {
                            return true; } } }); }, closest: function(s, a) {
                var b, i = 0,
                    l = this.length,
                    m = [],
                    p = E.test(s) || typeof s !== "string" ? Q(s, a || this.context) : 0;
                for (; i < l; i++) {
                    for (b = this[i]; b && b !== a; b = b.parentNode) {
                        if (b.nodeType < 11 && (p ? p.index(b) > -1 : b.nodeType === 1 && Q.find.matchesSelector(b, s))) { m.push(b);
                            break; } } }
                return this.pushStack(m.length > 1 ? Q.unique(m) : m); }, index: function(a) {
                if (!a) {
                    return (this[0] && this[0].parentNode) ? this.first().prevAll().length : -1; }
                if (typeof a === "string") {
                    return Q.inArray(this[0], Q(a)); }
                return Q.inArray(a.jquery ? a[0] : a, this); }, add: function(s, a) {
                return this.pushStack(Q.unique(Q.merge(this.get(), Q(s, a)))); }, addBack: function(s) {
                return this.add(s == null ? this.prevObject : this.prevObject.filter(s)); } });

        function O(a, b) { do { a = a[b]; } while (a && a.nodeType !== 1);
            return a; }
        Q.each({ parent: function(a) {
                var p = a.parentNode;
                return p && p.nodeType !== 11 ? p : null; }, parents: function(a) {
                return Q.dir(a, "parentNode"); }, parentsUntil: function(a, i, b) {
                return Q.dir(a, "parentNode", b); }, next: function(a) {
                return O(a, "nextSibling"); }, prev: function(a) {
                return O(a, "previousSibling"); }, nextAll: function(a) {
                return Q.dir(a, "nextSibling"); }, prevAll: function(a) {
                return Q.dir(a, "previousSibling"); }, nextUntil: function(a, i, b) {
                return Q.dir(a, "nextSibling", b); }, prevUntil: function(a, i, b) {
                return Q.dir(a, "previousSibling", b); }, siblings: function(a) {
                return Q.sibling((a.parentNode || {}).firstChild, a); }, children: function(a) {
                return Q.sibling(a.firstChild); }, contents: function(a) {
                return Q.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : Q.merge([], a.childNodes); } }, function(n, a) { Q.fn[n] = function(b, s) {
                var r = Q.map(this, a, b);
                if (n.slice(-5) !== "Until") { s = b; }
                if (s && typeof s === "string") { r = Q.filter(s, r); }
                if (this.length > 1) {
                    if (!N[n]) { r = Q.unique(r); }
                    if (M.test(n)) { r = r.reverse(); } }
                return this.pushStack(r); }; });
        var P = (/\S+/g);
        var R = {};

        function T(a) {
            var b = R[a] = {};
            Q.each(a.match(P) || [], function(_, j) { b[j] = true; });
            return b; }
        Q.Callbacks = function(a) { a = typeof a === "string" ? (R[a] || T(a)) : Q.extend({}, a);
            var b, m, j, l, n, p, r = [],
                s = !a.once && [],
                t = function(_) { m = a.memory && _;
                    j = true;
                    n = p || 0;
                    p = 0;
                    l = r.length;
                    b = true;
                    for (; r && n < l; n++) {
                        if (r[n].apply(_[0], _[1]) === false && a.stopOnFalse) { m = false;
                            break; } }
                    b = false;
                    if (r) {
                        if (s) {
                            if (s.length) { t(s.shift()); } } else if (m) { r = []; } else { v.disable(); } } },
                v = { add: function() {
                        if (r) {
                            var r3 = r.length;
                            (function add(s3) { Q.each(s3, function(_, t3) {
                                    var u3 = Q.type(t3);
                                    if (u3 === "function") {
                                        if (!a.unique || !v.has(t3)) { r.push(t3); } } else if (t3 && t3.length && u3 !== "string") { add(t3); } }); })(arguments);
                            if (b) { l = r.length; } else if (m) { p = r3;
                                t(m); } }
                        return this; }, remove: function() {
                        if (r) { Q.each(arguments, function(_, r3) {
                                var s3;
                                while ((s3 = Q.inArray(r3, r, s3)) > -1) { r.splice(s3, 1);
                                    if (b) {
                                        if (s3 <= l) { l--; }
                                        if (s3 <= n) { n--; } } } }); }
                        return this; }, has: function(_) {
                        return _ ? Q.inArray(_, r) > -1 : !!(r && r.length); }, empty: function() { r = [];
                        l = 0;
                        return this; }, disable: function() { r = s = m = undefined;
                        return this; }, disabled: function() {
                        return !r; }, lock: function() { s = undefined;
                        if (!m) { v.disable(); }
                        return this; }, locked: function() {
                        return !s; }, fireWith: function(_, r3) {
                        if (r && (!j || s)) { r3 = r3 || [];
                            r3 = [_, r3.slice ? r3.slice() : r3];
                            if (b) { s.push(r3); } else { t(r3); } }
                        return this; }, fire: function() { v.fireWith(this, arguments);
                        return this; }, fired: function() {
                        return !!j; } };
            return v; };
        Q.extend({ Deferred: function(a) {
                var t = [
                        ["resolve", "done", Q.Callbacks("once memory"), "resolved"],
                        ["reject", "fail", Q.Callbacks("once memory"), "rejected"],
                        ["notify", "progress", Q.Callbacks("memory")]
                    ],
                    s = "pending",
                    p = { state: function() {
                            return s; }, always: function() { b.done(arguments).fail(arguments);
                            return this; }, then: function() {
                            var j = arguments;
                            return Q.Deferred(function(n) { Q.each(t, function(i, l) {
                                    var m = Q.isFunction(j[i]) && j[i];
                                    b[l[1]](function() {
                                        var r = m && m.apply(this, arguments);
                                        if (r && Q.isFunction(r.promise)) { r.promise().done(n.resolve).fail(n.reject).progress(n.notify); } else { n[l[0] + "With"](this === p ? n.promise() : this, m ? [r] : arguments); } }); });
                                j = null; }).promise(); }, promise: function(j) {
                            return j != null ? Q.extend(j, p) : p; } },
                    b = {};
                p.pipe = p.then;
                Q.each(t, function(i, j) {
                    var l = j[2],
                        m = j[3];
                    p[j[1]] = l.add;
                    if (m) { l.add(function() { s = m; }, t[i ^ 1][2].disable, t[2][2].lock); }
                    b[j[0]] = function() { b[j[0] + "With"](this === b ? p : this, arguments);
                        return this; };
                    b[j[0] + "With"] = l.fireWith; });
                p.promise(b);
                if (a) { a.call(b, b); }
                return b; }, when: function(s) {
                var i = 0,
                    r = f.call(arguments),
                    l = r.length,
                    a = l !== 1 || (s && Q.isFunction(s.promise)) ? l : 0,
                    b = a === 1 ? s : Q.Deferred(),
                    j = function(i, t, v) {
                        return function(_) { t[i] = this;
                            v[i] = arguments.length > 1 ? f.call(arguments) : _;
                            if (v === p) { b.notifyWith(t, v); } else if (!(--a)) { b.resolveWith(t, v); } }; },
                    p, m, n;
                if (l > 1) { p = new Array(l);
                    m = new Array(l);
                    n = new Array(l);
                    for (; i < l; i++) {
                        if (r[i] && Q.isFunction(r[i].promise)) { r[i].promise().done(j(i, n, r)).fail(b.reject).progress(j(i, m, p)); } else {--a; } } }
                if (!a) { b.resolveWith(n, r); }
                return b.promise(); } });
        var U;
        Q.fn.ready = function(a) { Q.ready.promise().done(a);
            return this; };
        Q.extend({ isReady: false, readyWait: 1, holdReady: function(a) {
                if (a) { Q.readyWait++; } else { Q.ready(true); } }, ready: function(a) {
                if (a === true ? --Q.readyWait : Q.isReady) {
                    return; }
                if (!J.body) {
                    return setTimeout(Q.ready); }
                Q.isReady = true;
                if (a !== true && --Q.readyWait > 0) {
                    return; }
                U.resolveWith(J, [Q]);
                if (Q.fn.triggerHandler) { Q(J).triggerHandler("ready");
                    Q(J).off("ready"); } } });

        function V() {
            if (J.addEventListener) { J.removeEventListener("DOMContentLoaded", W, false);
                w.removeEventListener("load", W, false); } else { J.detachEvent("onreadystatechange", W);
                w.detachEvent("onload", W); } }

        function W() {
            if (J.addEventListener || event.type === "load" || J.readyState === "complete") { V();
                Q.ready(); } }
        Q.ready.promise = function(a) {
            if (!U) { U = Q.Deferred();
                if (J.readyState === "complete") { setTimeout(Q.ready); } else if (J.addEventListener) { J.addEventListener("DOMContentLoaded", W, false);
                    w.addEventListener("load", W, false); } else { J.attachEvent("onreadystatechange", W);
                    w.attachEvent("onload", W);
                    var t = false;
                    try { t = w.frameElement == null && J.documentElement; } catch (e) {}
                    if (t && t.doScroll) {
                        (function doScrollCheck() {
                            if (!Q.isReady) {
                                try { t.doScroll("left"); } catch (e) {
                                    return setTimeout(doScrollCheck, 50); }
                                V();
                                Q.ready(); } })(); } } }
            return U.promise(a); };
        var X = typeof undefined;
        var i;
        for (i in Q(x)) {
            break; }
        x.ownLast = i !== "0";
        x.inlineBlockNeedsLayout = false;
        Q(function() {
            var v, a, b, j;
            b = J.getElementsByTagName("body")[0];
            if (!b || !b.style) {
                return; }
            a = J.createElement("div");
            j = J.createElement("div");
            j.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
            b.appendChild(j).appendChild(a);
            if (typeof a.style.zoom !== X) { a.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";
                x.inlineBlockNeedsLayout = v = a.offsetWidth === 3;
                if (v) { b.style.zoom = 1; } }
            b.removeChild(j); });
        (function() {
            var a = J.createElement("div");
            if (x.deleteExpando == null) { x.deleteExpando = true;
                try { delete a.test; } catch (e) { x.deleteExpando = false; } }
            a = null; })();
        Q.acceptData = function(a) {
            var n = Q.noData[(a.nodeName + " ").toLowerCase()],
                b = +a.nodeType || 1;
            return b !== 1 && b !== 9 ? false : !n || n !== true && a.getAttribute("classid") === n; };
        var Y = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
            Z = /([A-Z])/g;

        function $(a, b, j) {
            if (j === undefined && a.nodeType === 1) {
                var n = "data-" + b.replace(Z, "-$1").toLowerCase();
                j = a.getAttribute(n);
                if (typeof j === "string") {
                    try { j = j === "true" ? true : j === "false" ? false : j === "null" ? null : +j + "" === j ? +j : Y.test(j) ? Q.parseJSON(j) : j; } catch (e) {}
                    Q.data(a, b, j); } else { j = undefined; } }
            return j; }

        function a1(a) {
            var n;
            for (n in a) {
                if (n === "data" && Q.isEmptyObject(a[n])) {
                    continue; }
                if (n !== "toJSON") {
                    return false; } }
            return true; }

        function b1(a, n, b, p) {
            if (!Q.acceptData(a)) {
                return; }
            var r, t, j = Q.expando,
                l = a.nodeType,
                m = l ? Q.cache : a,
                s = l ? a[j] : a[j] && j;
            if ((!s || !m[s] || (!p && !m[s].data)) && b === undefined && typeof n === "string") {
                return; }
            if (!s) {
                if (l) { s = a[j] = d.pop() || Q.guid++; } else { s = j; } }
            if (!m[s]) { m[s] = l ? {} : { toJSON: Q.noop }; }
            if (typeof n === "object" || typeof n === "function") {
                if (p) { m[s] = Q.extend(m[s], n); } else { m[s].data = Q.extend(m[s].data, n); } }
            t = m[s];
            if (!p) {
                if (!t.data) { t.data = {}; }
                t = t.data; }
            if (b !== undefined) { t[Q.camelCase(n)] = b; }
            if (typeof n === "string") { r = t[n];
                if (r == null) { r = t[Q.camelCase(n)]; } } else { r = t; }
            return r; }

        function c1(a, n, p) {
            if (!Q.acceptData(a)) {
                return; }
            var t, i, b = a.nodeType,
                j = b ? Q.cache : a,
                l = b ? a[Q.expando] : Q.expando;
            if (!j[l]) {
                return; }
            if (n) { t = p ? j[l] : j[l].data;
                if (t) {
                    if (!Q.isArray(n)) {
                        if (n in t) { n = [n]; } else { n = Q.camelCase(n);
                            if (n in t) { n = [n]; } else { n = n.split(" "); } } } else { n = n.concat(Q.map(n, Q.camelCase)); }
                    i = n.length;
                    while (i--) { delete t[n[i]]; }
                    if (p ? !a1(t) : !Q.isEmptyObject(t)) {
                        return; } } }
            if (!p) { delete j[l].data;
                if (!a1(j[l])) {
                    return; } }
            if (b) { Q.cleanData([a], true); } else if (x.deleteExpando || j != j.window) { delete j[l]; } else { j[l] = null; } }
        Q.extend({ cache: {}, noData: { "applet ": true, "embed ": true, "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" }, hasData: function(a) { a = a.nodeType ? Q.cache[a[Q.expando]] : a[Q.expando];
                return !!a && !a1(a); }, data: function(a, n, b) {
                return b1(a, n, b); }, removeData: function(a, n) {
                return c1(a, n); }, _data: function(a, n, b) {
                return b1(a, n, b, true); }, _removeData: function(a, n) {
                return c1(a, n, true); } });
        Q.fn.extend({ data: function(a, v) {
                var i, n, b, j = this[0],
                    l = j && j.attributes;
                if (a === undefined) {
                    if (this.length) { b = Q.data(j);
                        if (j.nodeType === 1 && !Q._data(j, "parsedAttrs")) { i = l.length;
                            while (i--) {
                                if (l[i]) { n = l[i].name;
                                    if (n.indexOf("data-") === 0) { n = Q.camelCase(n.slice(5));
                                        $(j, n, b[n]); } } }
                            Q._data(j, "parsedAttrs", true); } }
                    return b; }
                if (typeof a === "object") {
                    return this.each(function() { Q.data(this, a); }); }
                return arguments.length > 1 ? this.each(function() { Q.data(this, a, v); }) : j ? $(j, a, Q.data(j, a)) : undefined; }, removeData: function(a) {
                return this.each(function() { Q.removeData(this, a); }); } });
        Q.extend({ queue: function(a, t, b) {
                var j;
                if (a) { t = (t || "fx") + "queue";
                    j = Q._data(a, t);
                    if (b) {
                        if (!j || Q.isArray(b)) { j = Q._data(a, t, Q.makeArray(b)); } else { j.push(b); } }
                    return j || []; } }, dequeue: function(a, t) { t = t || "fx";
                var b = Q.queue(a, t),
                    s = b.length,
                    j = b.shift(),
                    l = Q._queueHooks(a, t),
                    n = function() { Q.dequeue(a, t); };
                if (j === "inprogress") { j = b.shift();
                    s--; }
                if (j) {
                    if (t === "fx") { b.unshift("inprogress"); }
                    delete l.stop;
                    j.call(a, n, l); }
                if (!s && l) { l.empty.fire(); } }, _queueHooks: function(a, t) {
                var b = t + "queueHooks";
                return Q._data(a, b) || Q._data(a, b, { empty: Q.Callbacks("once memory").add(function() { Q._removeData(a, t + "queue");
                        Q._removeData(a, b); }) }); } });
        Q.fn.extend({ queue: function(t, a) {
                var s = 2;
                if (typeof t !== "string") { a = t;
                    t = "fx";
                    s--; }
                if (arguments.length < s) {
                    return Q.queue(this[0], t); }
                return a === undefined ? this : this.each(function() {
                    var b = Q.queue(this, t, a);
                    Q._queueHooks(this, t);
                    if (t === "fx" && b[0] !== "inprogress") { Q.dequeue(this, t); } }); }, dequeue: function(t) {
                return this.each(function() { Q.dequeue(this, t); }); }, clearQueue: function(t) {
                return this.queue(t || "fx", []); }, promise: function(t, a) {
                var b, j = 1,
                    l = Q.Deferred(),
                    m = this,
                    i = this.length,
                    r = function() {
                        if (!(--j)) { l.resolveWith(m, [m]); } };
                if (typeof t !== "string") { a = t;
                    t = undefined; }
                t = t || "fx";
                while (i--) { b = Q._data(m[i], t + "queueHooks");
                    if (b && b.empty) { j++;
                        b.empty.add(r); } }
                r();
                return l.promise(a); } });
        var d1 = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;
        var e1 = ["Top", "Right", "Bottom", "Left"];
        var f1 = function(a, b) { a = b || a;
            return Q.css(a, "display") === "none" || !Q.contains(a.ownerDocument, a); };
        var g1 = Q.access = function(a, b, j, v, l, m, r) {
            var i = 0,
                n = a.length,
                p = j == null;
            if (Q.type(j) === "object") { l = true;
                for (i in j) { Q.access(a, b, i, j[i], true, m, r); } } else if (v !== undefined) { l = true;
                if (!Q.isFunction(v)) { r = true; }
                if (p) {
                    if (r) { b.call(a, v);
                        b = null; } else { p = b;
                        b = function(s, j, v) {
                            return p.call(Q(s), v); }; } }
                if (b) {
                    for (; i < n; i++) { b(a[i], j, r ? v : v.call(a[i], i, b(a[i], j))); } } }
            return l ? a : p ? b.call(a) : n ? b(a[0], j) : m; };
        var h1 = (/^(?:checkbox|radio)$/i);
        (function() {
            var a = J.createElement("input"),
                b = J.createElement("div"),
                j = J.createDocumentFragment();
            b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
            x.leadingWhitespace = b.firstChild.nodeType === 3;
            x.tbody = !b.getElementsByTagName("tbody").length;
            x.htmlSerialize = !!b.getElementsByTagName("link").length;
            x.html5Clone = J.createElement("nav").cloneNode(true).outerHTML !== "<:nav></:nav>";
            a.type = "checkbox";
            a.checked = true;
            j.appendChild(a);
            x.appendChecked = a.checked;
            b.innerHTML = "<textarea>x</textarea>";
            x.noCloneChecked = !!b.cloneNode(true).lastChild.defaultValue;
            j.appendChild(b);
            b.innerHTML = "<input type='radio' checked='checked' name='t'/>";
            x.checkClone = b.cloneNode(true).cloneNode(true).lastChild.checked;
            x.noCloneEvent = true;
            if (b.attachEvent) { b.attachEvent("onclick", function() { x.noCloneEvent = false; });
                b.cloneNode(true).click(); }
            if (x.deleteExpando == null) { x.deleteExpando = true;
                try { delete b.test; } catch (e) { x.deleteExpando = false; } } })();
        (function() {
            var i, a, b = J.createElement("div");
            for (i in { submit: true, change: true, focusin: true }) { a = "on" + i;
                if (!(x[i + "Bubbles"] = a in w)) { b.setAttribute(a, "t");
                    x[i + "Bubbles"] = b.attributes[a].expando === false; } }
            b = null; })();
        var i1 = /^(?:input|select|textarea)$/i,
            j1 = /^key/,
            k1 = /^(?:mouse|pointer|contextmenu)|click/,
            l1 = /^(?:focusinfocus|focusoutblur)$/,
            m1 = /^([^.]*)(?:\.(.+)|)$/;

        function n1() {
            return true; }

        function o1() {
            return false; }

        function p1() {
            try {
                return J.activeElement; } catch (a) {} }
        Q.event = { global: {}, add: function(a, b, j, l, s) {
                var m, n, t, p, r, v, _, r3, s3, t3, u3, v3 = Q._data(a);
                if (!v3) {
                    return; }
                if (j.handler) { p = j;
                    j = p.handler;
                    s = p.selector; }
                if (!j.guid) { j.guid = Q.guid++; }
                if (!(n = v3.events)) { n = v3.events = {}; }
                if (!(v = v3.handle)) { v = v3.handle = function(e) {
                        return typeof Q !== X && (!e || Q.event.triggered !== e.type) ? Q.event.dispatch.apply(v.elem, arguments) : undefined; };
                    v.elem = a; }
                b = (b || "").match(P) || [""];
                t = b.length;
                while (t--) { m = m1.exec(b[t]) || [];
                    s3 = u3 = m[1];
                    t3 = (m[2] || "").split(".").sort();
                    if (!s3) {
                        continue; }
                    r = Q.event.special[s3] || {};
                    s3 = (s ? r.delegateType : r.bindType) || s3;
                    r = Q.event.special[s3] || {};
                    _ = Q.extend({ type: s3, origType: u3, data: l, handler: j, guid: j.guid, selector: s, needsContext: s && Q.expr.match.needsContext.test(s), namespace: t3.join(".") }, p);
                    if (!(r3 = n[s3])) { r3 = n[s3] = [];
                        r3.delegateCount = 0;
                        if (!r.setup || r.setup.call(a, l, t3, v) === false) {
                            if (a.addEventListener) { a.addEventListener(s3, v, false); } else if (a.attachEvent) { a.attachEvent("on" + s3, v); } } }
                    if (r.add) { r.add.call(a, _);
                        if (!_.handler.guid) { _.handler.guid = j.guid; } }
                    if (s) { r3.splice(r3.delegateCount++, 0, _); } else { r3.push(_); }
                    Q.event.global[s3] = true; }
                a = null; }, remove: function(a, b, l, s, m) {
                var j, n, p, r, t, v, _, r3, s3, t3, u3, v3 = Q.hasData(a) && Q._data(a);
                if (!v3 || !(v = v3.events)) {
                    return; }
                b = (b || "").match(P) || [""];
                t = b.length;
                while (t--) { p = m1.exec(b[t]) || [];
                    s3 = u3 = p[1];
                    t3 = (p[2] || "").split(".").sort();
                    if (!s3) {
                        for (s3 in v) { Q.event.remove(a, s3 + b[t], l, s, true); }
                        continue; }
                    _ = Q.event.special[s3] || {};
                    s3 = (s ? _.delegateType : _.bindType) || s3;
                    r3 = v[s3] || [];
                    p = p[2] && new RegExp("(^|\\.)" + t3.join("\\.(?:.*\\.|)") + "(\\.|$)");
                    r = j = r3.length;
                    while (j--) { n = r3[j];
                        if ((m || u3 === n.origType) && (!l || l.guid === n.guid) && (!p || p.test(n.namespace)) && (!s || s === n.selector || s === "**" && n.selector)) { r3.splice(j, 1);
                            if (n.selector) { r3.delegateCount--; }
                            if (_.remove) { _.remove.call(a, n); } } }
                    if (r && !r3.length) {
                        if (!_.teardown || _.teardown.call(a, t3, v3.handle) === false) { Q.removeEvent(a, s3, v3.handle); }
                        delete v[s3]; } }
                if (Q.isEmptyObject(v)) { delete v3.handle;
                    Q._removeData(a, "events"); } }, trigger: function(a, b, j, l) {
                var m, n, p, r, s, t, i, v = [j || J],
                    _ = u.call(a, "type") ? a.type : a,
                    r3 = u.call(a, "namespace") ? a.namespace.split(".") : [];
                p = t = j = j || J;
                if (j.nodeType === 3 || j.nodeType === 8) {
                    return; }
                if (l1.test(_ + Q.event.triggered)) {
                    return; }
                if (_.indexOf(".") >= 0) { r3 = _.split(".");
                    _ = r3.shift();
                    r3.sort(); }
                n = _.indexOf(":") < 0 && "on" + _;
                a = a[Q.expando] ? a : new Q.Event(_, typeof a === "object" && a);
                a.isTrigger = l ? 2 : 3;
                a.namespace = r3.join(".");
                a.namespace_re = a.namespace ? new RegExp("(^|\\.)" + r3.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
                a.result = undefined;
                if (!a.target) { a.target = j; }
                b = b == null ? [a] : Q.makeArray(b, [a]);
                s = Q.event.special[_] || {};
                if (!l && s.trigger && s.trigger.apply(j, b) === false) {
                    return; }
                if (!l && !s.noBubble && !Q.isWindow(j)) { r = s.delegateType || _;
                    if (!l1.test(r + _)) { p = p.parentNode; }
                    for (; p; p = p.parentNode) { v.push(p);
                        t = p; }
                    if (t === (j.ownerDocument || J)) { v.push(t.defaultView || t.parentWindow || w); } }
                i = 0;
                while ((p = v[i++]) && !a.isPropagationStopped()) { a.type = i > 1 ? r : s.bindType || _;
                    m = (Q._data(p, "events") || {})[a.type] && Q._data(p, "handle");
                    if (m) { m.apply(p, b); }
                    m = n && p[n];
                    if (m && m.apply && Q.acceptData(p)) { a.result = m.apply(p, b);
                        if (a.result === false) { a.preventDefault(); } } }
                a.type = _;
                if (!l && !a.isDefaultPrevented()) {
                    if ((!s._default || s._default.apply(v.pop(), b) === false) && Q.acceptData(j)) {
                        if (n && j[_] && !Q.isWindow(j)) { t = j[n];
                            if (t) { j[n] = null; }
                            Q.event.triggered = _;
                            try { j[_](); } catch (e) {}
                            Q.event.triggered = undefined;
                            if (t) { j[n] = t; } } } }
                return a.result; }, dispatch: function(a) { a = Q.event.fix(a);
                var i, r, b, m, j, l = [],
                    n = f.call(arguments),
                    p = (Q._data(this, "events") || {})[a.type] || [],
                    s = Q.event.special[a.type] || {};
                n[0] = a;
                a.delegateTarget = this;
                if (s.preDispatch && s.preDispatch.call(this, a) === false) {
                    return; }
                l = Q.event.handlers.call(this, a, p);
                i = 0;
                while ((m = l[i++]) && !a.isPropagationStopped()) { a.currentTarget = m.elem;
                    j = 0;
                    while ((b = m.handlers[j++]) && !a.isImmediatePropagationStopped()) {
                        if (!a.namespace_re || a.namespace_re.test(b.namespace)) { a.handleObj = b;
                            a.data = b.data;
                            r = ((Q.event.special[b.origType] || {}).handle || b.handler).apply(m.elem, n);
                            if (r !== undefined) {
                                if ((a.result = r) === false) { a.preventDefault();
                                    a.stopPropagation(); } } } } }
                if (s.postDispatch) { s.postDispatch.call(this, a); }
                return a.result; }, handlers: function(a, b) {
                var s, j, m, i, l = [],
                    n = b.delegateCount,
                    p = a.target;
                if (n && p.nodeType && (!a.button || a.type !== "click")) {
                    for (; p != this; p = p.parentNode || this) {
                        if (p.nodeType === 1 && (p.disabled !== true || a.type !== "click")) { m = [];
                            for (i = 0; i < n; i++) { j = b[i];
                                s = j.selector + " ";
                                if (m[s] === undefined) { m[s] = j.needsContext ? Q(s, this).index(p) >= 0 : Q.find(s, this, null, [p]).length; }
                                if (m[s]) { m.push(j); } }
                            if (m.length) { l.push({ elem: p, handlers: m }); } } } }
                if (n < b.length) { l.push({ elem: this, handlers: b.slice(n) }); }
                return l; }, fix: function(a) {
                if (a[Q.expando]) {
                    return a; }
                var i, p, b, t = a.type,
                    j = a,
                    l = this.fixHooks[t];
                if (!l) { this.fixHooks[t] = l = k1.test(t) ? this.mouseHooks : j1.test(t) ? this.keyHooks : {}; }
                b = l.props ? this.props.concat(l.props) : this.props;
                a = new Q.Event(j);
                i = b.length;
                while (i--) { p = b[i];
                    a[p] = j[p]; }
                if (!a.target) { a.target = j.srcElement || J; }
                if (a.target.nodeType === 3) { a.target = a.target.parentNode; }
                a.metaKey = !!a.metaKey;
                return l.filter ? l.filter(a, j) : a; }, props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "), fixHooks: {}, keyHooks: { props: "char charCode key keyCode".split(" "), filter: function(a, b) {
                    if (a.which == null) { a.which = b.charCode != null ? b.charCode : b.keyCode; }
                    return a; } }, mouseHooks: { props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "), filter: function(a, b) {
                    var j, l, m, n = b.button,
                        p = b.fromElement;
                    if (a.pageX == null && b.clientX != null) { l = a.target.ownerDocument || J;
                        m = l.documentElement;
                        j = l.body;
                        a.pageX = b.clientX + (m && m.scrollLeft || j && j.scrollLeft || 0) - (m && m.clientLeft || j && j.clientLeft || 0);
                        a.pageY = b.clientY + (m && m.scrollTop || j && j.scrollTop || 0) - (m && m.clientTop || j && j.clientTop || 0); }
                    if (!a.relatedTarget && p) { a.relatedTarget = p === a.target ? b.toElement : p; }
                    if (!a.which && n !== undefined) { a.which = (n & 1 ? 1 : (n & 2 ? 3 : (n & 4 ? 2 : 0))); }
                    return a; } }, special: { load: { noBubble: true }, focus: { trigger: function() {
                        if (this !== p1() && this.focus) {
                            try { this.focus();
                                return false; } catch (e) {} } }, delegateType: "focusin" }, blur: { trigger: function() {
                        if (this === p1() && this.blur) { this.blur();
                            return false; } }, delegateType: "focusout" }, click: { trigger: function() {
                        if (Q.nodeName(this, "input") && this.type === "checkbox" && this.click) { this.click();
                            return false; } }, _default: function(a) {
                        return Q.nodeName(a.target, "a"); } }, beforeunload: { postDispatch: function(a) {
                        if (a.result !== undefined && a.originalEvent) { a.originalEvent.returnValue = a.result; } } } }, simulate: function(t, a, b, j) {
                var e = Q.extend(new Q.Event(), b, { type: t, isSimulated: true, originalEvent: {} });
                if (j) { Q.event.trigger(e, null, a); } else { Q.event.dispatch.call(a, e); }
                if (e.isDefaultPrevented()) { b.preventDefault(); } } };
        Q.removeEvent = J.removeEventListener ? function(a, t, b) {
            if (a.removeEventListener) { a.removeEventListener(t, b, false); } } : function(a, t, b) {
            var n = "on" + t;
            if (a.detachEvent) {
                if (typeof a[n] === X) { a[n] = null; }
                a.detachEvent(n, b); } };
        Q.Event = function(s, p) {
            if (!(this instanceof Q.Event)) {
                return new Q.Event(s, p); }
            if (s && s.type) { this.originalEvent = s;
                this.type = s.type;
                this.isDefaultPrevented = s.defaultPrevented || s.defaultPrevented === undefined && s.returnValue === false ? n1 : o1; } else { this.type = s; }
            if (p) { Q.extend(this, p); }
            this.timeStamp = s && s.timeStamp || Q.now();
            this[Q.expando] = true; };
        Q.Event.prototype = { isDefaultPrevented: o1, isPropagationStopped: o1, isImmediatePropagationStopped: o1, preventDefault: function() {
                var e = this.originalEvent;
                this.isDefaultPrevented = n1;
                if (!e) {
                    return; }
                if (e.preventDefault) { e.preventDefault(); } else { e.returnValue = false; } }, stopPropagation: function() {
                var e = this.originalEvent;
                this.isPropagationStopped = n1;
                if (!e) {
                    return; }
                if (e.stopPropagation) { e.stopPropagation(); }
                e.cancelBubble = true; }, stopImmediatePropagation: function() {
                var e = this.originalEvent;
                this.isImmediatePropagationStopped = n1;
                if (e && e.stopImmediatePropagation) { e.stopImmediatePropagation(); }
                this.stopPropagation(); } };
        Q.each({ mouseenter: "mouseover", mouseleave: "mouseout", pointerenter: "pointerover", pointerleave: "pointerout" }, function(a, b) { Q.event.special[a] = { delegateType: b, bindType: b, handle: function(j) {
                    var r, t = this,
                        l = j.relatedTarget,
                        m = j.handleObj;
                    if (!l || (l !== t && !Q.contains(t, l))) { j.type = m.origType;
                        r = m.handler.apply(this, arguments);
                        j.type = b; }
                    return r; } }; });
        if (!x.submitBubbles) { Q.event.special.submit = { setup: function() {
                    if (Q.nodeName(this, "form")) {
                        return false; }
                    Q.event.add(this, "click._submit keypress._submit", function(e) {
                        var a = e.target,
                            b = Q.nodeName(a, "input") || Q.nodeName(a, "button") ? a.form : undefined;
                        if (b && !Q._data(b, "submitBubbles")) { Q.event.add(b, "submit._submit", function(j) { j._submit_bubble = true; });
                            Q._data(b, "submitBubbles", true); } }); }, postDispatch: function(a) {
                    if (a._submit_bubble) { delete a._submit_bubble;
                        if (this.parentNode && !a.isTrigger) { Q.event.simulate("submit", this.parentNode, a, true); } } }, teardown: function() {
                    if (Q.nodeName(this, "form")) {
                        return false; }
                    Q.event.remove(this, "._submit"); } }; }
        if (!x.changeBubbles) { Q.event.special.change = { setup: function() {
                    if (i1.test(this.nodeName)) {
                        if (this.type === "checkbox" || this.type === "radio") { Q.event.add(this, "propertychange._change", function(a) {
                                if (a.originalEvent.propertyName === "checked") { this._just_changed = true; } });
                            Q.event.add(this, "click._change", function(a) {
                                if (this._just_changed && !a.isTrigger) { this._just_changed = false; }
                                Q.event.simulate("change", this, a, true); }); }
                        return false; }
                    Q.event.add(this, "beforeactivate._change", function(e) {
                        var a = e.target;
                        if (i1.test(a.nodeName) && !Q._data(a, "changeBubbles")) { Q.event.add(a, "change._change", function(b) {
                                if (this.parentNode && !b.isSimulated && !b.isTrigger) { Q.event.simulate("change", this.parentNode, b, true); } });
                            Q._data(a, "changeBubbles", true); } }); }, handle: function(a) {
                    var b = a.target;
                    if (this !== b || a.isSimulated || a.isTrigger || (b.type !== "radio" && b.type !== "checkbox")) {
                        return a.handleObj.handler.apply(this, arguments); } }, teardown: function() { Q.event.remove(this, "._change");
                    return !i1.test(this.nodeName); } }; }
        if (!x.focusinBubbles) { Q.each({ focus: "focusin", blur: "focusout" }, function(a, b) {
                var j = function(l) { Q.event.simulate(b, l.target, Q.event.fix(l), true); };
                Q.event.special[b] = { setup: function() {
                        var l = this.ownerDocument || this,
                            m = Q._data(l, b);
                        if (!m) { l.addEventListener(a, j, true); }
                        Q._data(l, b, (m || 0) + 1); }, teardown: function() {
                        var l = this.ownerDocument || this,
                            m = Q._data(l, b) - 1;
                        if (!m) { l.removeEventListener(a, j, true);
                            Q._removeData(l, b); } else { Q._data(l, b, m); } } }; }); }
        Q.fn.extend({ on: function(t, s, a, b, j) {
                var l, m;
                if (typeof t === "object") {
                    if (typeof s !== "string") { a = a || s;
                        s = undefined; }
                    for (l in t) { this.on(l, s, a, t[l], j); }
                    return this; }
                if (a == null && b == null) { b = s;
                    a = s = undefined; } else if (b == null) {
                    if (typeof s === "string") { b = a;
                        a = undefined; } else { b = a;
                        a = s;
                        s = undefined; } }
                if (b === false) { b = o1; } else if (!b) {
                    return this; }
                if (j === 1) { m = b;
                    b = function(n) { Q().off(n);
                        return m.apply(this, arguments); };
                    b.guid = m.guid || (m.guid = Q.guid++); }
                return this.each(function() { Q.event.add(this, t, b, a, s); }); }, one: function(t, s, a, b) {
                return this.on(t, s, a, b, 1); }, off: function(t, s, a) {
                var b, j;
                if (t && t.preventDefault && t.handleObj) { b = t.handleObj;
                    Q(t.delegateTarget).off(b.namespace ? b.origType + "." + b.namespace : b.origType, b.selector, b.handler);
                    return this; }
                if (typeof t === "object") {
                    for (j in t) { this.off(j, s, t[j]); }
                    return this; }
                if (s === false || typeof s === "function") { a = s;
                    s = undefined; }
                if (a === false) { a = o1; }
                return this.each(function() { Q.event.remove(this, t, a, s); }); }, trigger: function(t, a) {
                return this.each(function() { Q.event.trigger(t, a, this); }); }, triggerHandler: function(t, a) {
                var b = this[0];
                if (b) {
                    return Q.event.trigger(t, a, b, true); } } });

        function q1(J) {
            var l = r1.split("|"),
                s = J.createDocumentFragment();
            if (s.createElement) {
                while (l.length) { s.createElement(l.pop()); } }
            return s; }
        var r1 = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" + "header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
            s1 = / jQuery\d+="(?:null|\d+)"/g,
            t1 = new RegExp("<(?:" + r1 + ")[\\s/>]", "i"),
            u1 = /^\s+/,
            v1 = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
            w1 = /<([\w:]+)/,
            x1 = /<tbody/i,
            y1 = /<|&#?\w+;/,
            z1 = /(?:<script|<style|<link)/i,
            A1 = /checked\s*(?:[^=]|=\s*.checked.)/i,
            B1 = /^$|\/(?:java|ecma)script/i,
            C1 = /^true\/(.*)/,
            D1 = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
            E1 = { option: [1, "<select multiple='multiple'>", "</select>"], legend: [1, "<fieldset>", "</fieldset>"], area: [1, "<map>", "</map>"], param: [1, "<object>", "</object>"], thead: [1, "<table>", "</table>"], tr: [2, "<table><tbody>", "</tbody></table>"], col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], _default: x.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"] },
            F1 = q1(J),
            G1 = F1.appendChild(J.createElement("div"));
        E1.optgroup = E1.option;
        E1.tbody = E1.tfoot = E1.colgroup = E1.caption = E1.thead;
        E1.th = E1.td;

        function H1(a, t) {
            var b, j, i = 0,
                l = typeof a.getElementsByTagName !== X ? a.getElementsByTagName(t || "*") : typeof a.querySelectorAll !== X ? a.querySelectorAll(t || "*") : undefined;
            if (!l) {
                for (l = [], b = a.childNodes || a;
                    (j = b[i]) != null; i++) {
                    if (!t || Q.nodeName(j, t)) { l.push(j); } else { Q.merge(l, H1(j, t)); } } }
            return t === undefined || t && Q.nodeName(a, t) ? Q.merge([a], l) : l; }

        function I1(a) {
            if (h1.test(a.type)) { a.defaultChecked = a.checked; } }

        function J1(a, b) {
            return Q.nodeName(a, "table") && Q.nodeName(b.nodeType !== 11 ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a; }

        function K1(a) { a.type = (Q.find.attr(a, "type") !== null) + "/" + a.type;
            return a; }

        function L1(a) {
            var m = C1.exec(a.type);
            if (m) { a.type = m[1]; } else { a.removeAttribute("type"); }
            return a; }

        function M1(a, r) {
            var b, i = 0;
            for (;
                (b = a[i]) != null; i++) { Q._data(b, "globalEval", !r || Q._data(r[i], "globalEval")); } }

        function N1(s, a) {
            if (a.nodeType !== 1 || !Q.hasData(s)) {
                return; }
            var t, i, l, b = Q._data(s),
                j = Q._data(a, b),
                m = b.events;
            if (m) { delete j.handle;
                j.events = {};
                for (t in m) {
                    for (i = 0, l = m[t].length; i < l; i++) { Q.event.add(a, t, m[t][i]); } } }
            if (j.data) { j.data = Q.extend({}, j.data); } }

        function O1(s, a) {
            var n, e, b;
            if (a.nodeType !== 1) {
                return; }
            n = a.nodeName.toLowerCase();
            if (!x.noCloneEvent && a[Q.expando]) { b = Q._data(a);
                for (e in b.events) { Q.removeEvent(a, e, b.handle); }
                a.removeAttribute(Q.expando); }
            if (n === "script" && a.text !== s.text) { K1(a).text = s.text;
                L1(a); } else if (n === "object") {
                if (a.parentNode) { a.outerHTML = s.outerHTML; }
                if (x.html5Clone && (s.innerHTML && !Q.trim(a.innerHTML))) { a.innerHTML = s.innerHTML; } } else if (n === "input" && h1.test(s.type)) { a.defaultChecked = a.checked = s.checked;
                if (a.value !== s.value) { a.value = s.value; } } else if (n === "option") { a.defaultSelected = a.selected = s.defaultSelected; } else if (n === "input" || n === "textarea") { a.defaultValue = s.defaultValue; } }
        Q.extend({ clone: function(a, b, j) {
                var l, n, m, i, s, p = Q.contains(a.ownerDocument, a);
                if (x.html5Clone || Q.isXMLDoc(a) || !t1.test("<" + a.nodeName + ">")) { m = a.cloneNode(true); } else { G1.innerHTML = a.outerHTML;
                    G1.removeChild(m = G1.firstChild); }
                if ((!x.noCloneEvent || !x.noCloneChecked) && (a.nodeType === 1 || a.nodeType === 11) && !Q.isXMLDoc(a)) { l = H1(m);
                    s = H1(a);
                    for (i = 0;
                        (n = s[i]) != null; ++i) {
                        if (l[i]) { O1(n, l[i]); } } }
                if (b) {
                    if (j) { s = s || H1(a);
                        l = l || H1(m);
                        for (i = 0;
                            (n = s[i]) != null; i++) { N1(n, l[i]); } } else { N1(a, m); } }
                l = H1(m, "script");
                if (l.length > 0) { M1(l, !p && H1(a, "script")); }
                l = s = n = null;
                return m; }, buildFragment: function(a, b, s, m) {
                var j, n, p, t, r, v, _, l = a.length,
                    r3 = q1(b),
                    s3 = [],
                    i = 0;
                for (; i < l; i++) { n = a[i];
                    if (n || n === 0) {
                        if (Q.type(n) === "object") { Q.merge(s3, n.nodeType ? [n] : n); } else if (!y1.test(n)) { s3.push(b.createTextNode(n)); } else { t = t || r3.appendChild(b.createElement("div"));
                            r = (w1.exec(n) || ["", ""])[1].toLowerCase();
                            _ = E1[r] || E1._default;
                            t.innerHTML = _[1] + n.replace(v1, "<$1></$2>") + _[2];
                            j = _[0];
                            while (j--) { t = t.lastChild; }
                            if (!x.leadingWhitespace && u1.test(n)) { s3.push(b.createTextNode(u1.exec(n)[0])); }
                            if (!x.tbody) { n = r === "table" && !x1.test(n) ? t.firstChild : _[1] === "<table>" && !x1.test(n) ? t : 0;
                                j = n && n.childNodes.length;
                                while (j--) {
                                    if (Q.nodeName((v = n.childNodes[j]), "tbody") && !v.childNodes.length) { n.removeChild(v); } } }
                            Q.merge(s3, t.childNodes);
                            t.textContent = "";
                            while (t.firstChild) { t.removeChild(t.firstChild); }
                            t = r3.lastChild; } } }
                if (t) { r3.removeChild(t); }
                if (!x.appendChecked) { Q.grep(H1(s3, "input"), I1); }
                i = 0;
                while ((n = s3[i++])) {
                    if (m && Q.inArray(n, m) !== -1) {
                        continue; }
                    p = Q.contains(n.ownerDocument, n);
                    t = H1(r3.appendChild(n), "script");
                    if (p) { M1(t); }
                    if (s) { j = 0;
                        while ((n = t[j++])) {
                            if (B1.test(n.type || "")) { s.push(n); } } } }
                t = null;
                return r3; }, cleanData: function(a, b) {
                var j, t, l, m, i = 0,
                    n = Q.expando,
                    p = Q.cache,
                    r = x.deleteExpando,
                    s = Q.event.special;
                for (;
                    (j = a[i]) != null; i++) {
                    if (b || Q.acceptData(j)) { l = j[n];
                        m = l && p[l];
                        if (m) {
                            if (m.events) {
                                for (t in m.events) {
                                    if (s[t]) { Q.event.remove(j, t); } else { Q.removeEvent(j, t, m.handle); } } }
                            if (p[l]) { delete p[l];
                                if (r) { delete j[n]; } else if (typeof j.removeAttribute !== X) { j.removeAttribute(n); } else { j[n] = null; }
                                d.push(l); } } } } } });
        Q.fn.extend({ text: function(v) {
                return g1(this, function(v) {
                    return v === undefined ? Q.text(this) : this.empty().append((this[0] && this[0].ownerDocument || J).createTextNode(v)); }, null, v, arguments.length); }, append: function() {
                return this.domManip(arguments, function(a) {
                    if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                        var t = J1(this, a);
                        t.appendChild(a); } }); }, prepend: function() {
                return this.domManip(arguments, function(a) {
                    if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                        var t = J1(this, a);
                        t.insertBefore(a, t.firstChild); } }); }, before: function() {
                return this.domManip(arguments, function(a) {
                    if (this.parentNode) { this.parentNode.insertBefore(a, this); } }); }, after: function() {
                return this.domManip(arguments, function(a) {
                    if (this.parentNode) { this.parentNode.insertBefore(a, this.nextSibling); } }); }, remove: function(s, a) {
                var b, j = s ? Q.filter(s, this) : this,
                    i = 0;
                for (;
                    (b = j[i]) != null; i++) {
                    if (!a && b.nodeType === 1) { Q.cleanData(H1(b)); }
                    if (b.parentNode) {
                        if (a && Q.contains(b.ownerDocument, b)) { M1(H1(b, "script")); }
                        b.parentNode.removeChild(b); } }
                return this; }, empty: function() {
                var a, i = 0;
                for (;
                    (a = this[i]) != null; i++) {
                    if (a.nodeType === 1) { Q.cleanData(H1(a, false)); }
                    while (a.firstChild) { a.removeChild(a.firstChild); }
                    if (a.options && Q.nodeName(a, "select")) { a.options.length = 0; } }
                return this; }, clone: function(a, b) { a = a == null ? false : a;
                b = b == null ? a : b;
                return this.map(function() {
                    return Q.clone(this, a, b); }); }, html: function(v) {
                return g1(this, function(v) {
                    var a = this[0] || {},
                        i = 0,
                        l = this.length;
                    if (v === undefined) {
                        return a.nodeType === 1 ? a.innerHTML.replace(s1, "") : undefined; }
                    if (typeof v === "string" && !z1.test(v) && (x.htmlSerialize || !t1.test(v)) && (x.leadingWhitespace || !u1.test(v)) && !E1[(w1.exec(v) || ["", ""])[1].toLowerCase()]) { v = v.replace(v1, "<$1></$2>");
                        try {
                            for (; i < l; i++) { a = this[i] || {};
                                if (a.nodeType === 1) { Q.cleanData(H1(a, false));
                                    a.innerHTML = v; } }
                            a = 0; } catch (e) {} }
                    if (a) { this.empty().append(v); } }, null, v, arguments.length); }, replaceWith: function() {
                var a = arguments[0];
                this.domManip(arguments, function(b) { a = this.parentNode;
                    Q.cleanData(H1(this));
                    if (a) { a.replaceChild(b, this); } });
                return a && (a.length || a.nodeType) ? this : this.remove(); }, detach: function(s) {
                return this.remove(s, true); }, domManip: function(a, b) { a = g.apply([], a);
                var j, n, m, s, p, r, i = 0,
                    l = this.length,
                    t = this,
                    v = l - 1,
                    _ = a[0],
                    r3 = Q.isFunction(_);
                if (r3 || (l > 1 && typeof _ === "string" && !x.checkClone && A1.test(_))) {
                    return this.each(function(s3) {
                        var t3 = t.eq(s3);
                        if (r3) { a[0] = _.call(this, s3, t3.html()); }
                        t3.domManip(a, b); }); }
                if (l) { r = Q.buildFragment(a, this[0].ownerDocument, false, this);
                    j = r.firstChild;
                    if (r.childNodes.length === 1) { r = j; }
                    if (j) { s = Q.map(H1(r, "script"), K1);
                        m = s.length;
                        for (; i < l; i++) { n = r;
                            if (i !== v) { n = Q.clone(n, true, true);
                                if (m) { Q.merge(s, H1(n, "script")); } }
                            b.call(this[i], n, i); }
                        if (m) { p = s[s.length - 1].ownerDocument;
                            Q.map(s, L1);
                            for (i = 0; i < m; i++) { n = s[i];
                                if (B1.test(n.type || "") && !Q._data(n, "globalEval") && Q.contains(p, n)) {
                                    if (n.src) {
                                        if (Q._evalUrl) { Q._evalUrl(n.src); } } else { Q.globalEval((n.text || n.textContent || n.innerHTML || "").replace(D1, "")); } } } }
                        r = j = null; } }
                return this; } });
        Q.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function(n, a) { Q.fn[n] = function(s) {
                var b, i = 0,
                    r = [],
                    j = Q(s),
                    l = j.length - 1;
                for (; i <= l; i++) { b = i === l ? this : this.clone(true);
                    Q(j[i])[a](b);
                    h.apply(r, b.get()); }
                return this.pushStack(r); }; });
        var P1, Q1 = {};

        function R1(n, a) {
            var s, b = Q(a.createElement(n)).appendTo(a.body),
                j = w.getDefaultComputedStyle && (s = w.getDefaultComputedStyle(b[0])) ? s.display : Q.css(b[0], "display");
            b.detach();
            return j; }

        function S1(n) {
            var a = J,
                b = Q1[n];
            if (!b) { b = R1(n, a);
                if (b === "none" || !b) { P1 = (P1 || Q("<iframe frameborder='0' width='0' height='0'/>")).appendTo(a.documentElement);
                    a = (P1[0].contentWindow || P1[0].contentDocument).document;
                    a.write();
                    a.close();
                    b = R1(n, a);
                    P1.detach(); }
                Q1[n] = b; }
            return b; }(function() {
            var s;
            x.shrinkWrapBlocks = function() {
                if (s != null) {
                    return s; }
                s = false;
                var a, b, j;
                b = J.getElementsByTagName("body")[0];
                if (!b || !b.style) {
                    return; }
                a = J.createElement("div");
                j = J.createElement("div");
                j.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
                b.appendChild(j).appendChild(a);
                if (typeof a.style.zoom !== X) { a.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" + "box-sizing:content-box;display:block;margin:0;border:0;" + "padding:1px;width:1px;zoom:1";
                    a.appendChild(J.createElement("div")).style.width = "5px";
                    s = a.offsetWidth !== 3; }
                b.removeChild(j);
                return s; }; })();
        var T1 = (/^margin/);
        var U1 = new RegExp("^(" + d1 + ")(?!px)[a-z%]+$", "i");
        var V1, W1, X1 = /^(top|right|bottom|left)$/;
        if (w.getComputedStyle) { V1 = function(a) {
                return a.ownerDocument.defaultView.getComputedStyle(a, null); };
            W1 = function(a, n, b) {
                var j, m, l, r, s = a.style;
                b = b || V1(a);
                r = b ? b.getPropertyValue(n) || b[n] : undefined;
                if (b) {
                    if (r === "" && !Q.contains(a.ownerDocument, a)) { r = Q.style(a, n); }
                    if (U1.test(r) && T1.test(n)) { j = s.width;
                        m = s.minWidth;
                        l = s.maxWidth;
                        s.minWidth = s.maxWidth = s.width = r;
                        r = b.width;
                        s.width = j;
                        s.minWidth = m;
                        s.maxWidth = l; } }
                return r === undefined ? r : r + ""; }; } else if (J.documentElement.currentStyle) { V1 = function(a) {
                return a.currentStyle; };
            W1 = function(a, n, b) {
                var l, r, j, m, s = a.style;
                b = b || V1(a);
                m = b ? b[n] : undefined;
                if (m == null && s && s[n]) { m = s[n]; }
                if (U1.test(m) && !X1.test(n)) { l = s.left;
                    r = a.runtimeStyle;
                    j = r && r.left;
                    if (j) { r.left = a.currentStyle.left; }
                    s.left = n === "fontSize" ? "1em" : m;
                    m = s.pixelLeft + "px";
                    s.left = l;
                    if (j) { r.left = j; } }
                return m === undefined ? m : m + "" || "auto"; }; }

        function Y1(a, b) {
            return { get: function() {
                    var j = a();
                    if (j == null) {
                        return; }
                    if (j) { delete this.get;
                        return; }
                    return (this.get = b).apply(this, arguments); } }; }(function() {
            var b, s, a, p, j, r, l;
            b = J.createElement("div");
            b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
            a = b.getElementsByTagName("a")[0];
            s = a && a.style;
            if (!s) {
                return; }
            s.cssText = "float:left;opacity:.5";
            x.opacity = s.opacity === "0.5";
            x.cssFloat = !!s.cssFloat;
            b.style.backgroundClip = "content-box";
            b.cloneNode(true).style.backgroundClip = "";
            x.clearCloneStyle = b.style.backgroundClip === "content-box";
            x.boxSizing = s.boxSizing === "" || s.MozBoxSizing === "" || s.WebkitBoxSizing === "";
            Q.extend(x, { reliableHiddenOffsets: function() {
                    if (r == null) { m(); }
                    return r; }, boxSizingReliable: function() {
                    if (j == null) { m(); }
                    return j; }, pixelPosition: function() {
                    if (p == null) { m(); }
                    return p; }, reliableMarginRight: function() {
                    if (l == null) { m(); }
                    return l; } });

            function m() {
                var b, n, t, v;
                n = J.getElementsByTagName("body")[0];
                if (!n || !n.style) {
                    return; }
                b = J.createElement("div");
                t = J.createElement("div");
                t.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
                n.appendChild(t).appendChild(b);
                b.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" + "box-sizing:border-box;display:block;margin-top:1%;top:1%;" + "border:1px;padding:1px;width:4px;position:absolute";
                p = j = false;
                l = true;
                if (w.getComputedStyle) { p = (w.getComputedStyle(b, null) || {}).top !== "1%";
                    j = (w.getComputedStyle(b, null) || { width: "4px" }).width === "4px";
                    v = b.appendChild(J.createElement("div"));
                    v.style.cssText = b.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" + "box-sizing:content-box;display:block;margin:0;border:0;padding:0";
                    v.style.marginRight = v.style.width = "0";
                    b.style.width = "1px";
                    l = !parseFloat((w.getComputedStyle(v, null) || {}).marginRight); }
                b.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
                v = b.getElementsByTagName("td");
                v[0].style.cssText = "margin:0;border:0;padding:0;display:none";
                r = v[0].offsetHeight === 0;
                if (r) { v[0].style.display = "";
                    v[1].style.display = "none";
                    r = v[0].offsetHeight === 0; }
                n.removeChild(t); } })();
        Q.swap = function(a, b, j, l) {
            var r, n, m = {};
            for (n in b) { m[n] = a.style[n];
                a.style[n] = b[n]; }
            r = j.apply(a, l || []);
            for (n in b) { a.style[n] = m[n]; }
            return r; };
        var Z1 = /alpha\([^)]*\)/i,
            $1 = /opacity\s*=\s*([^)]*)/,
            _1 = /^(none|table(?!-c[ea]).+)/,
            a2 = new RegExp("^(" + d1 + ")(.*)$", "i"),
            b2 = new RegExp("^([+-])=(" + d1 + ")", "i"),
            c2 = { position: "absolute", visibility: "hidden", display: "block" },
            d2 = { letterSpacing: "0", fontWeight: "400" },
            e2 = ["Webkit", "O", "Moz", "ms"];

        function f2(s, n) {
            if (n in s) {
                return n; }
            var a = n.charAt(0).toUpperCase() + n.slice(1),
                b = n,
                i = e2.length;
            while (i--) { n = e2[i] + a;
                if (n in s) {
                    return n; } }
            return b; }

        function g2(a, s) {
            var b, j, l, v = [],
                m = 0,
                n = a.length;
            for (; m < n; m++) { j = a[m];
                if (!j.style) {
                    continue; }
                v[m] = Q._data(j, "olddisplay");
                b = j.style.display;
                if (s) {
                    if (!v[m] && b === "none") { j.style.display = ""; }
                    if (j.style.display === "" && f1(j)) { v[m] = Q._data(j, "olddisplay", S1(j.nodeName)); } } else { l = f1(j);
                    if (b && b !== "none" || !l) { Q._data(j, "olddisplay", l ? b : Q.css(j, "display")); } } }
            for (m = 0; m < n; m++) { j = a[m];
                if (!j.style) {
                    continue; }
                if (!s || j.style.display === "none" || j.style.display === "") { j.style.display = s ? v[m] || "" : "none"; } }
            return a; }

        function h2(a, v, s) {
            var m = a2.exec(v);
            return m ? Math.max(0, m[1] - (s || 0)) + (m[2] || "px") : v; }

        function i2(a, n, b, j, s) {
            var i = b === (j ? "border" : "content") ? 4 : n === "width" ? 1 : 0,
                v = 0;
            for (; i < 4; i += 2) {
                if (b === "margin") { v += Q.css(a, b + e1[i], true, s); }
                if (j) {
                    if (b === "content") { v -= Q.css(a, "padding" + e1[i], true, s); }
                    if (b !== "margin") { v -= Q.css(a, "border" + e1[i] + "Width", true, s); } } else { v += Q.css(a, "padding" + e1[i], true, s);
                    if (b !== "padding") { v += Q.css(a, "border" + e1[i] + "Width", true, s); } } }
            return v; }

        function j2(a, n, b) {
            var v = true,
                j = n === "width" ? a.offsetWidth : a.offsetHeight,
                s = V1(a),
                l = x.boxSizing && Q.css(a, "boxSizing", false, s) === "border-box";
            if (j <= 0 || j == null) { j = W1(a, n, s);
                if (j < 0 || j == null) { j = a.style[n]; }
                if (U1.test(j)) {
                    return j; }
                v = l && (x.boxSizingReliable() || j === a.style[n]);
                j = parseFloat(j) || 0; }
            return (j + i2(a, n, b || (l ? "border" : "content"), v, s)) + "px"; }
        Q.extend({ cssHooks: { opacity: { get: function(a, b) {
                        if (b) {
                            var r = W1(a, "opacity");
                            return r === "" ? "1" : r; } } } }, cssNumber: { "columnCount": true, "fillOpacity": true, "flexGrow": true, "flexShrink": true, "fontWeight": true, "lineHeight": true, "opacity": true, "order": true, "orphans": true, "widows": true, "zIndex": true, "zoom": true }, cssProps: { "float": x.cssFloat ? "cssFloat" : "styleFloat" }, style: function(a, n, v, b) {
                if (!a || a.nodeType === 3 || a.nodeType === 8 || !a.style) {
                    return; }
                var r, t, j, l = Q.camelCase(n),
                    s = a.style;
                n = Q.cssProps[l] || (Q.cssProps[l] = f2(s, l));
                j = Q.cssHooks[n] || Q.cssHooks[l];
                if (v !== undefined) { t = typeof v;
                    if (t === "string" && (r = b2.exec(v))) { v = (r[1] + 1) * r[2] + parseFloat(Q.css(a, n));
                        t = "number"; }
                    if (v == null || v !== v) {
                        return; }
                    if (t === "number" && !Q.cssNumber[l]) { v += "px"; }
                    if (!x.clearCloneStyle && v === "" && n.indexOf("background") === 0) { s[n] = "inherit"; }
                    if (!j || !("set" in j) || (v = j.set(a, v, b)) !== undefined) {
                        try { s[n] = v; } catch (e) {} } } else {
                    if (j && "get" in j && (r = j.get(a, false, b)) !== undefined) {
                        return r; }
                    return s[n]; } }, css: function(a, n, b, s) {
                var j, v, l, m = Q.camelCase(n);
                n = Q.cssProps[m] || (Q.cssProps[m] = f2(a.style, m));
                l = Q.cssHooks[n] || Q.cssHooks[m];
                if (l && "get" in l) { v = l.get(a, true, b); }
                if (v === undefined) { v = W1(a, n, s); }
                if (v === "normal" && n in d2) { v = d2[n]; }
                if (b === "" || b) { j = parseFloat(v);
                    return b === true || Q.isNumeric(j) ? j || 0 : v; }
                return v; } });
        Q.each(["height", "width"], function(i, n) { Q.cssHooks[n] = { get: function(a, b, j) {
                    if (b) {
                        return _1.test(Q.css(a, "display")) && a.offsetWidth === 0 ? Q.swap(a, c2, function() {
                            return j2(a, n, j); }) : j2(a, n, j); } }, set: function(a, v, b) {
                    var s = b && V1(a);
                    return h2(a, v, b ? i2(a, n, b, x.boxSizing && Q.css(a, "boxSizing", false, s) === "border-box", s) : 0); } }; });
        if (!x.opacity) { Q.cssHooks.opacity = { get: function(a, b) {
                    return $1.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? (0.01 * parseFloat(RegExp.$1)) + "" : b ? "1" : ""; }, set: function(a, v) {
                    var s = a.style,
                        b = a.currentStyle,
                        j = Q.isNumeric(v) ? "alpha(opacity=" + v * 100 + ")" : "",
                        l = b && b.filter || s.filter || "";
                    s.zoom = 1;
                    if ((v >= 1 || v === "") && Q.trim(l.replace(Z1, "")) === "" && s.removeAttribute) { s.removeAttribute("filter");
                        if (v === "" || b && !b.filter) {
                            return; } }
                    s.filter = Z1.test(l) ? l.replace(Z1, j) : l + " " + j; } }; }
        Q.cssHooks.marginRight = Y1(x.reliableMarginRight, function(a, b) {
            if (b) {
                return Q.swap(a, { "display": "inline-block" }, W1, [a, "marginRight"]); } });
        Q.each({ margin: "", padding: "", border: "Width" }, function(p, s) { Q.cssHooks[p + s] = { expand: function(v) {
                    var i = 0,
                        a = {},
                        b = typeof v === "string" ? v.split(" ") : [v];
                    for (; i < 4; i++) { a[p + e1[i] + s] = b[i] || b[i - 2] || b[0]; }
                    return a; } };
            if (!T1.test(p)) { Q.cssHooks[p + s].set = h2; } });
        Q.fn.extend({ css: function(n, v) {
                return g1(this, function(a, n, v) {
                    var s, l, m = {},
                        i = 0;
                    if (Q.isArray(n)) { s = V1(a);
                        l = n.length;
                        for (; i < l; i++) { m[n[i]] = Q.css(a, n[i], false, s); }
                        return m; }
                    return v !== undefined ? Q.style(a, n, v) : Q.css(a, n); }, n, v, arguments.length > 1); }, show: function() {
                return g2(this, true); }, hide: function() {
                return g2(this); }, toggle: function(s) {
                if (typeof s === "boolean") {
                    return s ? this.show() : this.hide(); }
                return this.each(function() {
                    if (f1(this)) { Q(this).show(); } else { Q(this).hide(); } }); } });

        function k2(a, b, p, j, l) {
            return new k2.prototype.init(a, b, p, j, l); }
        Q.Tween = k2;
        k2.prototype = { constructor: k2, init: function(a, b, p, j, l, m) { this.elem = a;
                this.prop = p;
                this.easing = l || "swing";
                this.options = b;
                this.start = this.now = this.cur();
                this.end = j;
                this.unit = m || (Q.cssNumber[p] ? "" : "px"); }, cur: function() {
                var a = k2.propHooks[this.prop];
                return a && a.get ? a.get(this) : k2.propHooks._default.get(this); }, run: function(p) {
                var a, b = k2.propHooks[this.prop];
                if (this.options.duration) { this.pos = a = Q.easing[this.easing](p, this.options.duration * p, 0, 1, this.options.duration); } else { this.pos = a = p; }
                this.now = (this.end - this.start) * a + this.start;
                if (this.options.step) { this.options.step.call(this.elem, this.now, this); }
                if (b && b.set) { b.set(this); } else { k2.propHooks._default.set(this); }
                return this; } };
        k2.prototype.init.prototype = k2.prototype;
        k2.propHooks = { _default: { get: function(t) {
                    var r;
                    if (t.elem[t.prop] != null && (!t.elem.style || t.elem.style[t.prop] == null)) {
                        return t.elem[t.prop]; }
                    r = Q.css(t.elem, t.prop, "");
                    return !r || r === "auto" ? 0 : r; }, set: function(t) {
                    if (Q.fx.step[t.prop]) { Q.fx.step[t.prop](t); } else if (t.elem.style && (t.elem.style[Q.cssProps[t.prop]] != null || Q.cssHooks[t.prop])) { Q.style(t.elem, t.prop, t.now + t.unit); } else { t.elem[t.prop] = t.now; } } } };
        k2.propHooks.scrollTop = k2.propHooks.scrollLeft = { set: function(t) {
                if (t.elem.nodeType && t.elem.parentNode) { t.elem[t.prop] = t.now; } } };
        Q.easing = { linear: function(p) {
                return p; }, swing: function(p) {
                return 0.5 - Math.cos(p * Math.PI) / 2; } };
        Q.fx = k2.prototype.init;
        Q.fx.step = {};
        var l2, m2, n2 = /^(?:toggle|show|hide)$/,
            o2 = new RegExp("^(?:([+-])=|)(" + d1 + ")([a-z%]*)$", "i"),
            p2 = /queueHooks$/,
            q2 = [v2],
            r2 = { "*": [function(p, v) {
                    var t = this.createTween(p, v),
                        a = t.cur(),
                        b = o2.exec(v),
                        j = b && b[3] || (Q.cssNumber[p] ? "" : "px"),
                        s = (Q.cssNumber[p] || j !== "px" && +a) && o2.exec(Q.css(t.elem, p)),
                        l = 1,
                        m = 20;
                    if (s && s[3] !== j) { j = j || s[3];
                        b = b || [];
                        s = +a || 1;
                        do { l = l || ".5";
                            s = s / l;
                            Q.style(t.elem, p, s + j); } while (l !== (l = t.cur() / a) && l !== 1 && --m); }
                    if (b) { s = t.start = +s || +a || 0;
                        t.unit = j;
                        t.end = b[1] ? s + (b[1] + 1) * b[2] : +b[2]; }
                    return t; }] };

        function s2() { setTimeout(function() { l2 = undefined; });
            return (l2 = Q.now()); }

        function t2(t, a) {
            var b, j = { height: t },
                i = 0;
            a = a ? 1 : 0;
            for (; i < 4; i += 2 - a) { b = e1[i];
                j["margin" + b] = j["padding" + b] = t; }
            if (a) { j.opacity = j.width = t; }
            return j; }

        function u2(v, p, a) {
            var t, b = (r2[p] || []).concat(r2["*"]),
                j = 0,
                l = b.length;
            for (; j < l; j++) {
                if ((t = b[j].call(a, p, v))) {
                    return t; } } }

        function v2(a, p, b) {
            var j, v, t, l, m, n, r, s, _ = this,
                r3 = {},
                s3 = a.style,
                t3 = a.nodeType && f1(a),
                u3 = Q._data(a, "fxshow");
            if (!b.queue) { m = Q._queueHooks(a, "fx");
                if (m.unqueued == null) { m.unqueued = 0;
                    n = m.empty.fire;
                    m.empty.fire = function() {
                        if (!m.unqueued) { n(); } }; }
                m.unqueued++;
                _.always(function() { _.always(function() { m.unqueued--;
                        if (!Q.queue(a, "fx").length) { m.empty.fire(); } }); }); }
            if (a.nodeType === 1 && ("height" in p || "width" in p)) { b.overflow = [s3.overflow, s3.overflowX, s3.overflowY];
                r = Q.css(a, "display");
                s = r === "none" ? Q._data(a, "olddisplay") || S1(a.nodeName) : r;
                if (s === "inline" && Q.css(a, "float") === "none") {
                    if (!x.inlineBlockNeedsLayout || S1(a.nodeName) === "inline") { s3.display = "inline-block"; } else { s3.zoom = 1; } } }
            if (b.overflow) { s3.overflow = "hidden";
                if (!x.shrinkWrapBlocks()) { _.always(function() { s3.overflow = b.overflow[0];
                        s3.overflowX = b.overflow[1];
                        s3.overflowY = b.overflow[2]; }); } }
            for (j in p) { v = p[j];
                if (n2.exec(v)) { delete p[j];
                    t = t || v === "toggle";
                    if (v === (t3 ? "hide" : "show")) {
                        if (v === "show" && u3 && u3[j] !== undefined) { t3 = true; } else {
                            continue; } }
                    r3[j] = u3 && u3[j] || Q.style(a, j); } else { r = undefined; } }
            if (!Q.isEmptyObject(r3)) {
                if (u3) {
                    if ("hidden" in u3) { t3 = u3.hidden; } } else { u3 = Q._data(a, "fxshow", {}); }
                if (t) { u3.hidden = !t3; }
                if (t3) { Q(a).show(); } else { _.done(function() { Q(a).hide(); }); }
                _.done(function() {
                    var j;
                    Q._removeData(a, "fxshow");
                    for (j in r3) { Q.style(a, j, r3[j]); } });
                for (j in r3) { l = u2(t3 ? u3[j] : 0, j, _);
                    if (!(j in u3)) { u3[j] = l.start;
                        if (t3) { l.end = l.start;
                            l.start = j === "width" || j === "height" ? 1 : 0; } } } } else if ((r === "none" ? S1(a.nodeName) : r) === "inline") { s3.display = r; } }

        function w2(p, s) {
            var a, n, b, v, j;
            for (a in p) { n = Q.camelCase(a);
                b = s[n];
                v = p[a];
                if (Q.isArray(v)) { b = v[1];
                    v = p[a] = v[0]; }
                if (a !== n) { p[n] = v;
                    delete p[a]; }
                j = Q.cssHooks[n];
                if (j && "expand" in j) { v = j.expand(v);
                    delete p[n];
                    for (a in v) {
                        if (!(a in p)) { p[a] = v[a];
                            s[a] = b; } } } else { s[n] = b; } } }

        function x2(a, p, b) {
            var r, s, j = 0,
                l = q2.length,
                m = Q.Deferred().always(function() { delete t.elem; }),
                t = function() {
                    if (s) {
                        return false; }
                    var _ = l2 || s2(),
                        r3 = Math.max(0, n.startTime + n.duration - _),
                        s3 = r3 / n.duration || 0,
                        t3 = 1 - s3,
                        j = 0,
                        l = n.tweens.length;
                    for (; j < l; j++) { n.tweens[j].run(t3); }
                    m.notifyWith(a, [n, t3, r3]);
                    if (t3 < 1 && l) {
                        return r3; } else { m.resolveWith(a, [n]);
                        return false; } },
                n = m.promise({ elem: a, props: Q.extend({}, p), opts: Q.extend(true, { specialEasing: {} }, b), originalProperties: p, originalOptions: b, startTime: l2 || s2(), duration: b.duration, tweens: [], createTween: function(_, r3) {
                        var s3 = Q.Tween(a, n.opts, _, r3, n.opts.specialEasing[_] || n.opts.easing);
                        n.tweens.push(s3);
                        return s3; }, stop: function(_) {
                        var j = 0,
                            l = _ ? n.tweens.length : 0;
                        if (s) {
                            return this; }
                        s = true;
                        for (; j < l; j++) { n.tweens[j].run(1); }
                        if (_) { m.resolveWith(a, [n, _]); } else { m.rejectWith(a, [n, _]); }
                        return this; } }),
                v = n.props;
            w2(v, n.opts.specialEasing);
            for (; j < l; j++) { r = q2[j].call(n, a, v, n.opts);
                if (r) {
                    return r; } }
            Q.map(v, u2, n);
            if (Q.isFunction(n.opts.start)) { n.opts.start.call(a, n); }
            Q.fx.timer(Q.extend(t, { elem: a, anim: n, queue: n.opts.queue }));
            return n.progress(n.opts.progress).done(n.opts.done, n.opts.complete).fail(n.opts.fail).always(n.opts.always); }
        Q.Animation = Q.extend(x2, { tweener: function(p, a) {
                if (Q.isFunction(p)) { a = p;
                    p = ["*"]; } else { p = p.split(" "); }
                var b, j = 0,
                    l = p.length;
                for (; j < l; j++) { b = p[j];
                    r2[b] = r2[b] || [];
                    r2[b].unshift(a); } }, prefilter: function(a, p) {
                if (p) { q2.unshift(a); } else { q2.push(a); } } });
        Q.speed = function(s, a, b) {
            var j = s && typeof s === "object" ? Q.extend({}, s) : { complete: b || !b && a || Q.isFunction(s) && s, duration: s, easing: b && a || a && !Q.isFunction(a) && a };
            j.duration = Q.fx.off ? 0 : typeof j.duration === "number" ? j.duration : j.duration in Q.fx.speeds ? Q.fx.speeds[j.duration] : Q.fx.speeds._default;
            if (j.queue == null || j.queue === true) { j.queue = "fx"; }
            j.old = j.complete;
            j.complete = function() {
                if (Q.isFunction(j.old)) { j.old.call(this); }
                if (j.queue) { Q.dequeue(this, j.queue); } };
            return j; };
        Q.fn.extend({ fadeTo: function(s, t, a, b) {
                return this.filter(f1).css("opacity", 0).show().end().animate({ opacity: t }, s, a, b); }, animate: function(p, s, a, b) {
                var j = Q.isEmptyObject(p),
                    l = Q.speed(s, a, b),
                    m = function() {
                        var n = x2(this, Q.extend({}, p), l);
                        if (j || Q._data(this, "finish")) { n.stop(true); } };
                m.finish = m;
                return j || l.queue === false ? this.each(m) : this.queue(l.queue, m); }, stop: function(t, a, b) {
                var s = function(j) {
                    var l = j.stop;
                    delete j.stop;
                    l(b); };
                if (typeof t !== "string") { b = a;
                    a = t;
                    t = undefined; }
                if (a && t !== false) { this.queue(t || "fx", []); }
                return this.each(function() {
                    var j = true,
                        l = t != null && t + "queueHooks",
                        m = Q.timers,
                        n = Q._data(this);
                    if (l) {
                        if (n[l] && n[l].stop) { s(n[l]); } } else {
                        for (l in n) {
                            if (n[l] && n[l].stop && p2.test(l)) { s(n[l]); } } }
                    for (l = m.length; l--;) {
                        if (m[l].elem === this && (t == null || m[l].queue === t)) { m[l].anim.stop(b);
                            j = false;
                            m.splice(l, 1); } }
                    if (j || !b) { Q.dequeue(this, t); } }); }, finish: function(t) {
                if (t !== false) { t = t || "fx"; }
                return this.each(function() {
                    var a, b = Q._data(this),
                        j = b[t + "queue"],
                        l = b[t + "queueHooks"],
                        m = Q.timers,
                        n = j ? j.length : 0;
                    b.finish = true;
                    Q.queue(this, t, []);
                    if (l && l.stop) { l.stop.call(this, true); }
                    for (a = m.length; a--;) {
                        if (m[a].elem === this && m[a].queue === t) { m[a].anim.stop(true);
                            m.splice(a, 1); } }
                    for (a = 0; a < n; a++) {
                        if (j[a] && j[a].finish) { j[a].finish.call(this); } }
                    delete b.finish; }); } });
        Q.each(["toggle", "show", "hide"], function(i, n) {
            var a = Q.fn[n];
            Q.fn[n] = function(s, b, j) {
                return s == null || typeof s === "boolean" ? a.apply(this, arguments) : this.animate(t2(n, true), s, b, j); }; });
        Q.each({ slideDown: t2("show"), slideUp: t2("hide"), slideToggle: t2("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle" } }, function(n, p) { Q.fn[n] = function(s, a, b) {
                return this.animate(p, s, a, b); }; });
        Q.timers = [];
        Q.fx.tick = function() {
            var t, a = Q.timers,
                i = 0;
            l2 = Q.now();
            for (; i < a.length; i++) { t = a[i];
                if (!t() && a[i] === t) { a.splice(i--, 1); } }
            if (!a.length) { Q.fx.stop(); }
            l2 = undefined; };
        Q.fx.timer = function(t) { Q.timers.push(t);
            if (t()) { Q.fx.start(); } else { Q.timers.pop(); } };
        Q.fx.interval = 13;
        Q.fx.start = function() {
            if (!m2) { m2 = setInterval(Q.fx.tick, Q.fx.interval); } };
        Q.fx.stop = function() { clearInterval(m2);
            m2 = null; };
        Q.fx.speeds = { slow: 600, fast: 200, _default: 400 };
        Q.fn.delay = function(t, a) { t = Q.fx ? Q.fx.speeds[t] || t : t;
            a = a || "fx";
            return this.queue(a, function(n, b) {
                var j = setTimeout(n, t);
                b.stop = function() { clearTimeout(j); }; }); };
        (function() {
            var b, j, s, a, l;
            j = J.createElement("div");
            j.setAttribute("className", "t");
            j.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
            a = j.getElementsByTagName("a")[0];
            s = J.createElement("select");
            l = s.appendChild(J.createElement("option"));
            b = j.getElementsByTagName("input")[0];
            a.style.cssText = "top:1px";
            x.getSetAttribute = j.className !== "t";
            x.style = /top/.test(a.getAttribute("style"));
            x.hrefNormalized = a.getAttribute("href") === "/a";
            x.checkOn = !!b.value;
            x.optSelected = l.selected;
            x.enctype = !!J.createElement("form").enctype;
            s.disabled = true;
            x.optDisabled = !l.disabled;
            b = J.createElement("input");
            b.setAttribute("value", "");
            x.input = b.getAttribute("value") === "";
            b.value = "t";
            b.setAttribute("type", "radio");
            x.radioValue = b.value === "t"; })();
        var y2 = /\r/g;
        Q.fn.extend({ val: function(v) {
                var a, r, b, j = this[0];
                if (!arguments.length) {
                    if (j) { a = Q.valHooks[j.type] || Q.valHooks[j.nodeName.toLowerCase()];
                        if (a && "get" in a && (r = a.get(j, "value")) !== undefined) {
                            return r; }
                        r = j.value;
                        return typeof r === "string" ? r.replace(y2, "") : r == null ? "" : r; }
                    return; }
                b = Q.isFunction(v);
                return this.each(function(i) {
                    var l;
                    if (this.nodeType !== 1) {
                        return; }
                    if (b) { l = v.call(this, i, Q(this).val()); } else { l = v; }
                    if (l == null) { l = ""; } else if (typeof l === "number") { l += ""; } else if (Q.isArray(l)) { l = Q.map(l, function(v) {
                            return v == null ? "" : v + ""; }); }
                    a = Q.valHooks[this.type] || Q.valHooks[this.nodeName.toLowerCase()];
                    if (!a || !("set" in a) || a.set(this, l, "value") === undefined) { this.value = l; } }); } });
        Q.extend({ valHooks: { option: { get: function(a) {
                        var v = Q.find.attr(a, "value");
                        return v != null ? v : Q.trim(Q.text(a)); } }, select: { get: function(a) {
                        var v, b, j = a.options,
                            l = a.selectedIndex,
                            m = a.type === "select-one" || l < 0,
                            n = m ? null : [],
                            p = m ? l + 1 : j.length,
                            i = l < 0 ? p : m ? l : 0;
                        for (; i < p; i++) { b = j[i];
                            if ((b.selected || i === l) && (x.optDisabled ? !b.disabled : b.getAttribute("disabled") === null) && (!b.parentNode.disabled || !Q.nodeName(b.parentNode, "optgroup"))) { v = Q(b).val();
                                if (m) {
                                    return v; }
                                n.push(v); } }
                        return n; }, set: function(a, v) {
                        var b, j, l = a.options,
                            m = Q.makeArray(v),
                            i = l.length;
                        while (i--) { j = l[i];
                            if (Q.inArray(Q.valHooks.option.get(j), m) >= 0) {
                                try { j.selected = b = true; } catch (_) { j.scrollHeight; } } else { j.selected = false; } }
                        if (!b) { a.selectedIndex = -1; }
                        return l; } } } });
        Q.each(["radio", "checkbox"], function() { Q.valHooks[this] = { set: function(a, v) {
                    if (Q.isArray(v)) {
                        return (a.checked = Q.inArray(Q(a).val(), v) >= 0); } } };
            if (!x.checkOn) { Q.valHooks[this].get = function(a) {
                    return a.getAttribute("value") === null ? "on" : a.value; }; } });
        var z2, A2, B2 = Q.expr.attrHandle,
            C2 = /^(?:checked|selected)$/i,
            D2 = x.getSetAttribute,
            E2 = x.input;
        Q.fn.extend({ attr: function(n, v) {
                return g1(this, Q.attr, n, v, arguments.length > 1); }, removeAttr: function(n) {
                return this.each(function() { Q.removeAttr(this, n); }); } });
        Q.extend({ attr: function(a, n, v) {
                var b, r, j = a.nodeType;
                if (!a || j === 3 || j === 8 || j === 2) {
                    return; }
                if (typeof a.getAttribute === X) {
                    return Q.prop(a, n, v); }
                if (j !== 1 || !Q.isXMLDoc(a)) { n = n.toLowerCase();
                    b = Q.attrHooks[n] || (Q.expr.match.bool.test(n) ? A2 : z2); }
                if (v !== undefined) {
                    if (v === null) { Q.removeAttr(a, n); } else if (b && "set" in b && (r = b.set(a, v, n)) !== undefined) {
                        return r; } else { a.setAttribute(n, v + "");
                        return v; } } else if (b && "get" in b && (r = b.get(a, n)) !== null) {
                    return r; } else { r = Q.find.attr(a, n);
                    return r == null ? undefined : r; } }, removeAttr: function(a, v) {
                var n, p, i = 0,
                    b = v && v.match(P);
                if (b && a.nodeType === 1) {
                    while ((n = b[i++])) { p = Q.propFix[n] || n;
                        if (Q.expr.match.bool.test(n)) {
                            if (E2 && D2 || !C2.test(n)) { a[p] = false; } else { a[Q.camelCase("default-" + n)] = a[p] = false; } } else { Q.attr(a, n, ""); }
                        a.removeAttribute(D2 ? n : p); } } }, attrHooks: { type: { set: function(a, v) {
                        if (!x.radioValue && v === "radio" && Q.nodeName(a, "input")) {
                            var b = a.value;
                            a.setAttribute("type", v);
                            if (b) { a.value = b; }
                            return v; } } } } });
        A2 = { set: function(a, v, n) {
                if (v === false) { Q.removeAttr(a, n); } else if (E2 && D2 || !C2.test(n)) { a.setAttribute(!D2 && Q.propFix[n] || n, n); } else { a[Q.camelCase("default-" + n)] = a[n] = true; }
                return n; } };
        Q.each(Q.expr.match.bool.source.match(/\w+/g), function(i, n) {
            var a = B2[n] || Q.find.attr;
            B2[n] = E2 && D2 || !C2.test(n) ? function(b, n, j) {
                var r, l;
                if (!j) { l = B2[n];
                    B2[n] = r;
                    r = a(b, n, j) != null ? n.toLowerCase() : null;
                    B2[n] = l; }
                return r; } : function(b, n, j) {
                if (!j) {
                    return b[Q.camelCase("default-" + n)] ? n.toLowerCase() : null; } }; });
        if (!E2 || !D2) { Q.attrHooks.value = { set: function(a, v, n) {
                    if (Q.nodeName(a, "input")) { a.defaultValue = v; } else {
                        return z2 && z2.set(a, v, n); } } }; }
        if (!D2) { z2 = { set: function(a, v, n) {
                    var r = a.getAttributeNode(n);
                    if (!r) { a.setAttributeNode((r = a.ownerDocument.createAttribute(n))); }
                    r.value = v += "";
                    if (n === "value" || v === a.getAttribute(n)) {
                        return v; } } };
            B2.id = B2.name = B2.coords = function(a, n, b) {
                var r;
                if (!b) {
                    return (r = a.getAttributeNode(n)) && r.value !== "" ? r.value : null; } };
            Q.valHooks.button = { get: function(a, n) {
                    var r = a.getAttributeNode(n);
                    if (r && r.specified) {
                        return r.value; } }, set: z2.set };
            Q.attrHooks.contenteditable = { set: function(a, v, n) { z2.set(a, v === "" ? false : v, n); } };
            Q.each(["width", "height"], function(i, n) { Q.attrHooks[n] = { set: function(a, v) {
                        if (v === "") { a.setAttribute(n, "auto");
                            return v; } } }; }); }
        if (!x.style) { Q.attrHooks.style = { get: function(a) {
                    return a.style.cssText || undefined; }, set: function(a, v) {
                    return (a.style.cssText = v + ""); } }; }
        var F2 = /^(?:input|select|textarea|button|object)$/i,
            G2 = /^(?:a|area)$/i;
        Q.fn.extend({ prop: function(n, v) {
                return g1(this, Q.prop, n, v, arguments.length > 1); }, removeProp: function(n) { n = Q.propFix[n] || n;
                return this.each(function() {
                    try { this[n] = undefined;
                        delete this[n]; } catch (e) {} }); } });
        Q.extend({ propFix: { "for": "htmlFor", "class": "className" }, prop: function(a, n, v) {
                var r, b, j, l = a.nodeType;
                if (!a || l === 3 || l === 8 || l === 2) {
                    return; }
                j = l !== 1 || !Q.isXMLDoc(a);
                if (j) { n = Q.propFix[n] || n;
                    b = Q.propHooks[n]; }
                if (v !== undefined) {
                    return b && "set" in b && (r = b.set(a, v, n)) !== undefined ? r : (a[n] = v); } else {
                    return b && "get" in b && (r = b.get(a, n)) !== null ? r : a[n]; } }, propHooks: { tabIndex: { get: function(a) {
                        var t = Q.find.attr(a, "tabindex");
                        return t ? parseInt(t, 10) : F2.test(a.nodeName) || G2.test(a.nodeName) && a.href ? 0 : -1; } } } });
        if (!x.hrefNormalized) { Q.each(["href", "src"], function(i, n) { Q.propHooks[n] = { get: function(a) {
                        return a.getAttribute(n, 4); } }; }); }
        if (!x.optSelected) { Q.propHooks.selected = { get: function(a) {
                    var p = a.parentNode;
                    if (p) { p.selectedIndex;
                        if (p.parentNode) { p.parentNode.selectedIndex; } }
                    return null; } }; }
        Q.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() { Q.propFix[this.toLowerCase()] = this; });
        if (!x.enctype) { Q.propFix.enctype = "encoding"; }
        var H2 = /[\t\r\n\f]/g;
        Q.fn.extend({ addClass: function(v) {
                var a, b, l, m, j, n, i = 0,
                    p = this.length,
                    r = typeof v === "string" && v;
                if (Q.isFunction(v)) {
                    return this.each(function(j) { Q(this).addClass(v.call(this, j, this.className)); }); }
                if (r) { a = (v || "").match(P) || [];
                    for (; i < p; i++) { b = this[i];
                        l = b.nodeType === 1 && (b.className ? (" " + b.className + " ").replace(H2, " ") : " ");
                        if (l) { j = 0;
                            while ((m = a[j++])) {
                                if (l.indexOf(" " + m + " ") < 0) { l += m + " "; } }
                            n = Q.trim(l);
                            if (b.className !== n) { b.className = n; } } } }
                return this; }, removeClass: function(v) {
                var a, b, l, m, j, n, i = 0,
                    p = this.length,
                    r = arguments.length === 0 || typeof v === "string" && v;
                if (Q.isFunction(v)) {
                    return this.each(function(j) { Q(this).removeClass(v.call(this, j, this.className)); }); }
                if (r) { a = (v || "").match(P) || [];
                    for (; i < p; i++) { b = this[i];
                        l = b.nodeType === 1 && (b.className ? (" " + b.className + " ").replace(H2, " ") : "");
                        if (l) { j = 0;
                            while ((m = a[j++])) {
                                while (l.indexOf(" " + m + " ") >= 0) { l = l.replace(" " + m + " ", " "); } }
                            n = v ? Q.trim(l) : "";
                            if (b.className !== n) { b.className = n; } } } }
                return this; }, toggleClass: function(v, s) {
                var t = typeof v;
                if (typeof s === "boolean" && t === "string") {
                    return s ? this.addClass(v) : this.removeClass(v); }
                if (Q.isFunction(v)) {
                    return this.each(function(i) { Q(this).toggleClass(v.call(this, i, this.className, s), s); }); }
                return this.each(function() {
                    if (t === "string") {
                        var a, i = 0,
                            b = Q(this),
                            j = v.match(P) || [];
                        while ((a = j[i++])) {
                            if (b.hasClass(a)) { b.removeClass(a); } else { b.addClass(a); } } } else if (t === X || t === "boolean") {
                        if (this.className) { Q._data(this, "__className__", this.className); }
                        this.className = this.className || v === false ? "" : Q._data(this, "__className__") || ""; } }); }, hasClass: function(s) {
                var a = " " + s + " ",
                    i = 0,
                    l = this.length;
                for (; i < l; i++) {
                    if (this[i].nodeType === 1 && (" " + this[i].className + " ").replace(H2, " ").indexOf(a) >= 0) {
                        return true; } }
                return false; } });
        Q.each(("blur focus focusin focusout load resize scroll unload click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup error contextmenu").split(" "), function(i, n) { Q.fn[n] = function(a, b) {
                return arguments.length > 0 ? this.on(n, null, a, b) : this.trigger(n); }; });
        Q.fn.extend({ hover: function(a, b) {
                return this.mouseenter(a).mouseleave(b || a); }, bind: function(t, a, b) {
                return this.on(t, null, a, b); }, unbind: function(t, a) {
                return this.off(t, null, a); }, delegate: function(s, t, a, b) {
                return this.on(t, s, a, b); }, undelegate: function(s, t, a) {
                return arguments.length === 1 ? this.off(s, "**") : this.off(t, s || "**", a); } });
        var I2 = Q.now();
        var J2 = (/\?/);
        var K2 = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
        Q.parseJSON = function(a) {
            if (w.JSON && w.JSON.parse) {
                return w.JSON.parse(a + ""); }
            var r, b = null,
                s = Q.trim(a + "");
            return s && !Q.trim(s.replace(K2, function(t, j, l, m) {
                if (r && j) { b = 0; }
                if (b === 0) {
                    return t; }
                r = l || j;
                b += !m - !l;
                return ""; })) ? (Function("return " + s))() : Q.error("Invalid JSON: " + a); };
        Q.parseXML = function(a) {
            var b, t;
            if (!a || typeof a !== "string") {
                return null; }
            try {
                if (w.DOMParser) { t = new DOMParser();
                    b = t.parseFromString(a, "text/xml"); } else { b = new ActiveXObject("Microsoft.XMLDOM");
                    b.async = "false";
                    b.loadXML(a); } } catch (e) { b = undefined; }
            if (!b || !b.documentElement || b.getElementsByTagName("parsererror").length) { Q.error("Invalid XML: " + a); }
            return b; };
        var L2, M2, N2 = /#.*$/,
            O2 = /([?&])_=[^&]*/,
            P2 = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
            Q2 = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
            R2 = /^(?:GET|HEAD)$/,
            S2 = /^\/\//,
            T2 = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
            U2 = {},
            V2 = {},
            W2 = "*/".concat("*");
        try { M2 = location.href; } catch (e) { M2 = J.createElement("a");
            M2.href = "";
            M2 = M2.href; }
        L2 = T2.exec(M2.toLowerCase()) || [];

        function X2(s) {
            return function(a, b) {
                if (typeof a !== "string") { b = a;
                    a = "*"; }
                var j, i = 0,
                    l = a.toLowerCase().match(P) || [];
                if (Q.isFunction(b)) {
                    while ((j = l[i++])) {
                        if (j.charAt(0) === "+") { j = j.slice(1) || "*";
                            (s[j] = s[j] || []).unshift(b); } else {
                            (s[j] = s[j] || []).push(b); } } } }; }

        function Y2(s, a, b, j) {
            var l = {},
                m = (s === V2);

            function n(p) {
                var r;
                l[p] = true;
                Q.each(s[p] || [], function(_, t) {
                    var v = t(a, b, j);
                    if (typeof v === "string" && !m && !l[v]) { a.dataTypes.unshift(v);
                        n(v);
                        return false; } else if (m) {
                        return !(r = v); } });
                return r; }
            return n(a.dataTypes[0]) || !l["*"] && n("*"); }

        function Z2(t, s) {
            var a, b, j = Q.ajaxSettings.flatOptions || {};
            for (b in s) {
                if (s[b] !== undefined) {
                    (j[b] ? t : (a || (a = {})))[b] = s[b]; } }
            if (a) { Q.extend(true, t, a); }
            return t; }

        function $2(s, j, r) {
            var a, b, l, t, m = s.contents,
                n = s.dataTypes;
            while (n[0] === "*") { n.shift();
                if (b === undefined) { b = s.mimeType || j.getResponseHeader("Content-Type"); } }
            if (b) {
                for (t in m) {
                    if (m[t] && m[t].test(b)) { n.unshift(t);
                        break; } } }
            if (n[0] in r) { l = n[0]; } else {
                for (t in r) {
                    if (!n[0] || s.converters[t + " " + n[0]]) { l = t;
                        break; }
                    if (!a) { a = t; } }
                l = l || a; }
            if (l) {
                if (l !== n[0]) { n.unshift(l); }
                return r[l]; } }

        function _2(s, r, j, a) {
            var b, l, m, t, p, n = {},
                v = s.dataTypes.slice();
            if (v[1]) {
                for (m in s.converters) { n[m.toLowerCase()] = s.converters[m]; } }
            l = v.shift();
            while (l) {
                if (s.responseFields[l]) { j[s.responseFields[l]] = r; }
                if (!p && a && s.dataFilter) { r = s.dataFilter(r, s.dataType); }
                p = l;
                l = v.shift();
                if (l) {
                    if (l === "*") { l = p; } else if (p !== "*" && p !== l) { m = n[p + " " + l] || n["* " + l];
                        if (!m) {
                            for (b in n) { t = b.split(" ");
                                if (t[1] === l) { m = n[p + " " + t[0]] || n["* " + t[0]];
                                    if (m) {
                                        if (m === true) { m = n[b]; } else if (n[b] !== true) { l = t[0];
                                            v.unshift(t[1]); }
                                        break; } } } }
                        if (m !== true) {
                            if (m && s["throws"]) { r = m(r); } else {
                                try { r = m(r); } catch (e) {
                                    return { state: "parsererror", error: m ? e : "No conversion from " + p + " to " + l }; } } } } } }
            return { state: "success", data: r }; }
        Q.extend({ active: 0, lastModified: {}, etag: {}, ajaxSettings: { url: M2, type: "GET", isLocal: Q2.test(L2[1]), global: true, processData: true, async: true, contentType: "application/x-www-form-urlencoded; charset=UTF-8", accepts: { "*": W2, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript" }, contents: { xml: /xml/, html: /html/, json: /json/ }, responseFields: { xml: "responseXML", text: "responseText", json: "responseJSON" }, converters: { "* text": String, "text html": true, "text json": Q.parseJSON, "text xml": Q.parseXML }, flatOptions: { url: true, context: true } }, ajaxSetup: function(t, s) {
                return s ? Z2(Z2(t, Q.ajaxSettings), s) : Z2(Q.ajaxSettings, t); }, ajaxPrefilter: X2(U2), ajaxTransport: X2(V2), ajax: function(a, b) {
                if (typeof a === "object") { b = a;
                    a = undefined; }
                b = b || {};
                var p, i, j, r, t, l, m, n, s = Q.ajaxSetup({}, b),
                    v = s.context || s,
                    _ = s.context && (v.nodeType || v.jquery) ? Q(v) : Q.event,
                    r3 = Q.Deferred(),
                    s3 = Q.Callbacks("once memory"),
                    t3 = s.statusCode || {},
                    u3 = {},
                    v3 = {},
                    w3 = 0,
                    x3 = "canceled",
                    y3 = { readyState: 0, getResponseHeader: function(A3) {
                            var B3;
                            if (w3 === 2) {
                                if (!n) { n = {};
                                    while ((B3 = P2.exec(r))) { n[B3[1].toLowerCase()] = B3[2]; } }
                                B3 = n[A3.toLowerCase()]; }
                            return B3 == null ? null : B3; }, getAllResponseHeaders: function() {
                            return w3 === 2 ? r : null; }, setRequestHeader: function(A3, B3) {
                            var C3 = A3.toLowerCase();
                            if (!w3) { A3 = v3[C3] = v3[C3] || A3;
                                u3[A3] = B3; }
                            return this; }, overrideMimeType: function(A3) {
                            if (!w3) { s.mimeType = A3; }
                            return this; }, statusCode: function(A3) {
                            var B3;
                            if (A3) {
                                if (w3 < 2) {
                                    for (B3 in A3) { t3[B3] = [t3[B3], A3[B3]]; } } else { y3.always(A3[y3.status]); } }
                            return this; }, abort: function(A3) {
                            var B3 = A3 || x3;
                            if (m) { m.abort(B3); }
                            z3(0, B3);
                            return this; } };
                r3.promise(y3).complete = s3.add;
                y3.success = y3.done;
                y3.error = y3.fail;
                s.url = ((a || s.url || M2) + "").replace(N2, "").replace(S2, L2[1] + "//");
                s.type = b.method || b.type || s.method || s.type;
                s.dataTypes = Q.trim(s.dataType || "*").toLowerCase().match(P) || [""];
                if (s.crossDomain == null) { p = T2.exec(s.url.toLowerCase());
                    s.crossDomain = !!(p && (p[1] !== L2[1] || p[2] !== L2[2] || (p[3] || (p[1] === "http:" ? "80" : "443")) !== (L2[3] || (L2[1] === "http:" ? "80" : "443")))); }
                if (s.data && s.processData && typeof s.data !== "string") { s.data = Q.param(s.data, s.traditional); }
                Y2(U2, s, b, y3);
                if (w3 === 2) {
                    return y3; }
                l = s.global;
                if (l && Q.active++ === 0) { Q.event.trigger("ajaxStart"); }
                s.type = s.type.toUpperCase();
                s.hasContent = !R2.test(s.type);
                j = s.url;
                if (!s.hasContent) {
                    if (s.data) { j = (s.url += (J2.test(j) ? "&" : "?") + s.data);
                        delete s.data; }
                    if (s.cache === false) { s.url = O2.test(j) ? j.replace(O2, "$1_=" + I2++) : j + (J2.test(j) ? "&" : "?") + "_=" + I2++; } }
                if (s.ifModified) {
                    if (Q.lastModified[j]) { y3.setRequestHeader("If-Modified-Since", Q.lastModified[j]); }
                    if (Q.etag[j]) { y3.setRequestHeader("If-None-Match", Q.etag[j]); } }
                if (s.data && s.hasContent && s.contentType !== false || b.contentType) { y3.setRequestHeader("Content-Type", s.contentType); }
                y3.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + W2 + "; q=0.01" : "") : s.accepts["*"]);
                for (i in s.headers) { y3.setRequestHeader(i, s.headers[i]); }
                if (s.beforeSend && (s.beforeSend.call(v, y3, s) === false || w3 === 2)) {
                    return y3.abort(); }
                x3 = "abort";
                for (i in { success: 1, error: 1, complete: 1 }) { y3[i](s[i]); }
                m = Y2(V2, s, b, y3);
                if (!m) { z3(-1, "No Transport"); } else { y3.readyState = 1;
                    if (l) { _.trigger("ajaxSend", [y3, s]); }
                    if (s.async && s.timeout > 0) { t = setTimeout(function() { y3.abort("timeout"); }, s.timeout); }
                    try { w3 = 1;
                        m.send(u3, z3); } catch (e) {
                        if (w3 < 2) { z3(-1, e); } else {
                            throw e; } } }

                function z3(A3, B3, C3, D3) {
                    var E3, F3, G3, H3, I3, J3 = B3;
                    if (w3 === 2) {
                        return; }
                    w3 = 2;
                    if (t) { clearTimeout(t); }
                    m = undefined;
                    r = D3 || "";
                    y3.readyState = A3 > 0 ? 4 : 0;
                    E3 = A3 >= 200 && A3 < 300 || A3 === 304;
                    if (C3) { H3 = $2(s, y3, C3); }
                    H3 = _2(s, H3, y3, E3);
                    if (E3) {
                        if (s.ifModified) { I3 = y3.getResponseHeader("Last-Modified");
                            if (I3) { Q.lastModified[j] = I3; }
                            I3 = y3.getResponseHeader("etag");
                            if (I3) { Q.etag[j] = I3; } }
                        if (A3 === 204 || s.type === "HEAD") { J3 = "nocontent"; } else if (A3 === 304) { J3 = "notmodified"; } else { J3 = H3.state;
                            F3 = H3.data;
                            G3 = H3.error;
                            E3 = !G3; } } else { G3 = J3;
                        if (A3 || !J3) { J3 = "error";
                            if (A3 < 0) { A3 = 0; } } }
                    y3.status = A3;
                    y3.statusText = (B3 || J3) + "";
                    if (E3) { r3.resolveWith(v, [F3, J3, y3]); } else { r3.rejectWith(v, [y3, J3, G3]); }
                    y3.statusCode(t3);
                    t3 = undefined;
                    if (l) { _.trigger(E3 ? "ajaxSuccess" : "ajaxError", [y3, s, E3 ? F3 : G3]); }
                    s3.fireWith(v, [y3, J3]);
                    if (l) { _.trigger("ajaxComplete", [y3, s]);
                        if (!(--Q.active)) { Q.event.trigger("ajaxStop"); } } }
                return y3; }, getJSON: function(a, b, j) {
                return Q.get(a, b, j, "json"); }, getScript: function(a, b) {
                return Q.get(a, undefined, b, "script"); } });
        Q.each(["get", "post"], function(i, m) { Q[m] = function(a, b, j, t) {
                if (Q.isFunction(b)) { t = t || j;
                    j = b;
                    b = undefined; }
                return Q.ajax({ url: a, type: m, dataType: t, data: b, success: j }); }; });
        Q.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(i, t) { Q.fn[t] = function(a) {
                return this.on(t, a); }; });
        Q._evalUrl = function(a) {
            return Q.ajax({ url: a, type: "GET", dataType: "script", async: false, global: false, "throws": true }); };
        Q.fn.extend({ wrapAll: function(a) {
                if (Q.isFunction(a)) {
                    return this.each(function(i) { Q(this).wrapAll(a.call(this, i)); }); }
                if (this[0]) {
                    var b = Q(a, this[0].ownerDocument).eq(0).clone(true);
                    if (this[0].parentNode) { b.insertBefore(this[0]); }
                    b.map(function() {
                        var j = this;
                        while (j.firstChild && j.firstChild.nodeType === 1) { j = j.firstChild; }
                        return j; }).append(this); }
                return this; }, wrapInner: function(a) {
                if (Q.isFunction(a)) {
                    return this.each(function(i) { Q(this).wrapInner(a.call(this, i)); }); }
                return this.each(function() {
                    var s = Q(this),
                        b = s.contents();
                    if (b.length) { b.wrapAll(a); } else { s.append(a); } }); }, wrap: function(a) {
                var b = Q.isFunction(a);
                return this.each(function(i) { Q(this).wrapAll(b ? a.call(this, i) : a); }); }, unwrap: function() {
                return this.parent().each(function() {
                    if (!Q.nodeName(this, "body")) { Q(this).replaceWith(this.childNodes); } }).end(); } });
        Q.expr.filters.hidden = function(a) {
            return a.offsetWidth <= 0 && a.offsetHeight <= 0 || (!x.reliableHiddenOffsets() && ((a.style && a.style.display) || Q.css(a, "display")) === "none"); };
        Q.expr.filters.visible = function(a) {
            return !Q.expr.filters.hidden(a); };
        var a3 = /%20/g,
            b3 = /\[\]$/,
            c3 = /\r?\n/g,
            d3 = /^(?:submit|button|image|reset|file)$/i,
            e3 = /^(?:input|select|textarea|keygen)/i;

        function f3(p, a, t, b) {
            var n;
            if (Q.isArray(a)) { Q.each(a, function(i, v) {
                    if (t || b3.test(p)) { b(p, v); } else { f3(p + "[" + (typeof v === "object" ? i : "") + "]", v, t, b); } }); } else if (!t && Q.type(a) === "object") {
                for (n in a) { f3(p + "[" + n + "]", a[n], t, b); } } else { b(p, a); } }
        Q.param = function(a, t) {
            var p, s = [],
                b = function(j, v) { v = Q.isFunction(v) ? v() : (v == null ? "" : v);
                    s[s.length] = encodeURIComponent(j) + "=" + encodeURIComponent(v); };
            if (t === undefined) { t = Q.ajaxSettings && Q.ajaxSettings.traditional; }
            if (Q.isArray(a) || (a.jquery && !Q.isPlainObject(a))) { Q.each(a, function() { b(this.name, this.value); }); } else {
                for (p in a) { f3(p, a[p], t, b); } }
            return s.join("&").replace(a3, "+"); };
        Q.fn.extend({ serialize: function() {
                return Q.param(this.serializeArray()); }, serializeArray: function() {
                return this.map(function() {
                    var a = Q.prop(this, "elements");
                    return a ? Q.makeArray(a) : this; }).filter(function() {
                    var t = this.type;
                    return this.name && !Q(this).is(":disabled") && e3.test(this.nodeName) && !d3.test(t) && (this.checked || !h1.test(t)); }).map(function(i, a) {
                    var v = Q(this).val();
                    return v == null ? null : Q.isArray(v) ? Q.map(v, function(v) {
                        return { name: a.name, value: v.replace(c3, "\r\n") }; }) : { name: a.name, value: v.replace(c3, "\r\n") }; }).get(); } });
        Q.ajaxSettings.xhr = w.ActiveXObject !== undefined ? function() {
            return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && j3() || k3(); } : j3;
        var g3 = 0,
            h3 = {},
            i3 = Q.ajaxSettings.xhr();
        if (w.ActiveXObject) { Q(w).on("unload", function() {
                for (var a in h3) { h3[a](undefined, true); } }); }
        x.cors = !!i3 && ("withCredentials" in i3);
        i3 = x.ajax = !!i3;
        if (i3) { Q.ajaxTransport(function(a) {
                if (!a.crossDomain || x.cors) {
                    var b;
                    return { send: function(j, l) {
                            var i, m = a.xhr(),
                                n = ++g3;
                            m.open(a.type, a.url, a.async, a.username, a.password);
                            if (a.xhrFields) {
                                for (i in a.xhrFields) { m[i] = a.xhrFields[i]; } }
                            if (a.mimeType && m.overrideMimeType) { m.overrideMimeType(a.mimeType); }
                            if (!a.crossDomain && !j["X-Requested-With"]) { j["X-Requested-With"] = "XMLHttpRequest"; }
                            for (i in j) {
                                if (j[i] !== undefined) { m.setRequestHeader(i, j[i] + ""); } }
                            m.send((a.hasContent && a.data) || null);
                            b = function(_, p) {
                                var s, r, t;
                                if (b && (p || m.readyState === 4)) { delete h3[n];
                                    b = undefined;
                                    m.onreadystatechange = Q.noop;
                                    if (p) {
                                        if (m.readyState !== 4) { m.abort(); } } else { t = {};
                                        s = m.status;
                                        if (typeof m.responseText === "string") { t.text = m.responseText; }
                                        try { r = m.statusText; } catch (e) { r = ""; }
                                        if (!s && a.isLocal && !a.crossDomain) { s = t.text ? 200 : 404; } else if (s === 1223) { s = 204; } } }
                                if (t) { l(s, r, t, m.getAllResponseHeaders()); } };
                            if (!a.async) { b(); } else if (m.readyState === 4) { setTimeout(b); } else { m.onreadystatechange = h3[n] = b; } }, abort: function() {
                            if (b) { b(undefined, true); } } }; } }); }

        function j3() {
            try {
                return new w.XMLHttpRequest(); } catch (e) {} }

        function k3() {
            try {
                return new w.ActiveXObject("Microsoft.XMLHTTP"); } catch (e) {} }
        Q.ajaxSetup({ accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" }, contents: { script: /(?:java|ecma)script/ }, converters: { "text script": function(t) { Q.globalEval(t);
                    return t; } } });
        Q.ajaxPrefilter("script", function(s) {
            if (s.cache === undefined) { s.cache = false; }
            if (s.crossDomain) { s.type = "GET";
                s.global = false; } });
        Q.ajaxTransport("script", function(s) {
            if (s.crossDomain) {
                var a, b = J.head || Q("head")[0] || J.documentElement;
                return { send: function(_, j) { a = J.createElement("script");
                        a.async = true;
                        if (s.scriptCharset) { a.charset = s.scriptCharset; }
                        a.src = s.url;
                        a.onload = a.onreadystatechange = function(_, l) {
                            if (l || !a.readyState || /loaded|complete/.test(a.readyState)) { a.onload = a.onreadystatechange = null;
                                if (a.parentNode) { a.parentNode.removeChild(a); }
                                a = null;
                                if (!l) { j(200, "success"); } } };
                        b.insertBefore(a, b.firstChild); }, abort: function() {
                        if (a) { a.onload(undefined, true); } } }; } });
        var l3 = [],
            m3 = /(=)\?(?=&|$)|\?\?/;
        Q.ajaxSetup({ jsonp: "callback", jsonpCallback: function() {
                var a = l3.pop() || (Q.expando + "_" + (I2++));
                this[a] = true;
                return a; } });
        Q.ajaxPrefilter("json jsonp", function(s, a, j) {
            var b, l, r, m = s.jsonp !== false && (m3.test(s.url) ? "url" : typeof s.data === "string" && !(s.contentType || "").indexOf("application/x-www-form-urlencoded") && m3.test(s.data) && "data");
            if (m || s.dataTypes[0] === "jsonp") { b = s.jsonpCallback = Q.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;
                if (m) { s[m] = s[m].replace(m3, "$1" + b); } else if (s.jsonp !== false) { s.url += (J2.test(s.url) ? "&" : "?") + s.jsonp + "=" + b; }
                s.converters["script json"] = function() {
                    if (!r) { Q.error(b + " was not called"); }
                    return r[0]; };
                s.dataTypes[0] = "json";
                l = w[b];
                w[b] = function() { r = arguments; };
                j.always(function() { w[b] = l;
                    if (s[b]) { s.jsonpCallback = a.jsonpCallback;
                        l3.push(b); }
                    if (r && Q.isFunction(l)) { l(r[0]); }
                    r = l = undefined; });
                return "script"; } });
        Q.parseHTML = function(a, b, j) {
            if (!a || typeof a !== "string") {
                return null; }
            if (typeof b === "boolean") { j = b;
                b = false; }
            b = b || J;
            var p = F.exec(a),
                s = !j && [];
            if (p) {
                return [b.createElement(p[1])]; }
            p = Q.buildFragment([a], b, s);
            if (s && s.length) { Q(s).remove(); }
            return Q.merge([], p.childNodes); };
        var n3 = Q.fn.load;
        Q.fn.load = function(a, p, b) {
            if (typeof a !== "string" && n3) {
                return n3.apply(this, arguments); }
            var s, r, t, j = this,
                l = a.indexOf(" ");
            if (l >= 0) { s = Q.trim(a.slice(l, a.length));
                a = a.slice(0, l); }
            if (Q.isFunction(p)) { b = p;
                p = undefined; } else if (p && typeof p === "object") { t = "POST"; }
            if (j.length > 0) { Q.ajax({ url: a, type: t, dataType: "html", data: p }).done(function(m) { r = arguments;
                    j.html(s ? Q("<div>").append(Q.parseHTML(m)).find(s) : m); }).complete(b && function(m, n) { j.each(b, r || [m.responseText, n, m]); }); }
            return this; };
        Q.expr.filters.animated = function(a) {
            return Q.grep(Q.timers, function(b) {
                return a === b.elem; }).length; };
        var o3 = w.document.documentElement;

        function p3(a) {
            return Q.isWindow(a) ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : false; }
        Q.offset = { setOffset: function(a, b, i) {
                var j, l, m, n, p, r, s, t = Q.css(a, "position"),
                    v = Q(a),
                    _ = {};
                if (t === "static") { a.style.position = "relative"; }
                p = v.offset();
                m = Q.css(a, "top");
                r = Q.css(a, "left");
                s = (t === "absolute" || t === "fixed") && Q.inArray("auto", [m, r]) > -1;
                if (s) { j = v.position();
                    n = j.top;
                    l = j.left; } else { n = parseFloat(m) || 0;
                    l = parseFloat(r) || 0; }
                if (Q.isFunction(b)) { b = b.call(a, i, p); }
                if (b.top != null) { _.top = (b.top - p.top) + n; }
                if (b.left != null) { _.left = (b.left - p.left) + l; }
                if ("using" in b) { b.using.call(a, _); } else { v.css(_); } } };
        Q.fn.extend({ offset: function(a) {
                if (arguments.length) {
                    return a === undefined ? this : this.each(function(i) { Q.offset.setOffset(this, a, i); }); }
                var o3, b, j = { top: 0, left: 0 },
                    l = this[0],
                    m = l && l.ownerDocument;
                if (!m) {
                    return; }
                o3 = m.documentElement;
                if (!Q.contains(o3, l)) {
                    return j; }
                if (typeof l.getBoundingClientRect !== X) { j = l.getBoundingClientRect(); }
                b = p3(m);
                return { top: j.top + (b.pageYOffset || o3.scrollTop) - (o3.clientTop || 0), left: j.left + (b.pageXOffset || o3.scrollLeft) - (o3.clientLeft || 0) }; }, position: function() {
                if (!this[0]) {
                    return; }
                var a, b, p = { top: 0, left: 0 },
                    j = this[0];
                if (Q.css(j, "position") === "fixed") { b = j.getBoundingClientRect(); } else { a = this.offsetParent();
                    b = this.offset();
                    if (!Q.nodeName(a[0], "html")) { p = a.offset(); }
                    p.top += Q.css(a[0], "borderTopWidth", true);
                    p.left += Q.css(a[0], "borderLeftWidth", true); }
                return { top: b.top - p.top - Q.css(j, "marginTop", true), left: b.left - p.left - Q.css(j, "marginLeft", true) }; }, offsetParent: function() {
                return this.map(function() {
                    var a = this.offsetParent || o3;
                    while (a && (!Q.nodeName(a, "html") && Q.css(a, "position") === "static")) { a = a.offsetParent; }
                    return a || o3; }); } });
        Q.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function(m, p) {
            var t = /Y/.test(p);
            Q.fn[m] = function(v) {
                return g1(this, function(a, m, v) {
                    var b = p3(a);
                    if (v === undefined) {
                        return b ? (p in b) ? b[p] : b.document.documentElement[m] : a[m]; }
                    if (b) { b.scrollTo(!t ? v : Q(b).scrollLeft(), t ? v : Q(b).scrollTop()); } else { a[m] = v; } }, m, v, arguments.length, null); }; });
        Q.each(["top", "left"], function(i, p) { Q.cssHooks[p] = Y1(x.pixelPosition, function(a, b) {
                if (b) { b = W1(a, p);
                    return U1.test(b) ? Q(a).position()[p] + "px" : b; } }); });
        Q.each({ Height: "height", Width: "width" }, function(n, t) { Q.each({ padding: "inner" + n, content: t, "": "outer" + n }, function(a, b) { Q.fn[b] = function(m, v) {
                    var j = arguments.length && (a || typeof m !== "boolean"),
                        l = a || (m === true || v === true ? "margin" : "border");
                    return g1(this, function(p, t, v) {
                        var r;
                        if (Q.isWindow(p)) {
                            return p.document.documentElement["client" + n]; }
                        if (p.nodeType === 9) { r = p.documentElement;
                            return Math.max(p.body["scroll" + n], r["scroll" + n], p.body["offset" + n], r["offset" + n], r["client" + n]); }
                        return v === undefined ? Q.css(p, t, l) : Q.style(p, t, v, l); }, t, j ? m : undefined, j, null); }; }); });
        Q.fn.size = function() {
            return this.length; };
        Q.fn.andSelf = Q.fn.addBack;
        if (typeof define === "function" && define.amd) { define("jquery", [], function() {
                return Q; }); }
        var q3 = w.jQuery,
            _$ = w.$;
        Q.noConflict = function(a) {
            if (w.$ === Q) { w.$ = _$; }
            if (a && w.jQuery === Q) { w.jQuery = q3; }
            return Q; };
        if (typeof c === X) { w.jQuery = w.$ = Q; }
        return Q;
    }));
    /*!
     * jQuery UI Position 1.10.4
     * http://jqueryui.com
     *
     * Copyright 2014 jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/position/
     */
    (function($, u) { $.ui = $.ui || {};
        var c, m = Math.max,
            a = Math.abs,
            r = Math.round,
            b = /left|center|right/,
            d = /top|center|bottom/,
            e = /[\+\-]\d+(\.[\d]+)?%?/,
            f = /^\w+/,
            g = /%$/,
            _ = $.fn.position;

        function h(o, w, i) {
            return [parseFloat(o[0]) * (g.test(o[0]) ? w / 100 : 1), parseFloat(o[1]) * (g.test(o[1]) ? i / 100 : 1)]; }

        function p(i, k) {
            return parseInt($.css(i, k), 10) || 0; }

        function j(i) {
            var k = i[0];
            if (k.nodeType === 9) {
                return { width: i.width(), height: i.height(), offset: { top: 0, left: 0 } }; }
            if ($.isWindow(k)) {
                return { width: i.width(), height: i.height(), offset: { top: i.scrollTop(), left: i.scrollLeft() } }; }
            if (k.preventDefault) {
                return { width: 0, height: 0, offset: { top: k.pageY, left: k.pageX } }; }
            if (typeof window.SVGElement !== "undefined" && k instanceof window.SVGElement) {
                var l = k.getBoundingClientRect();
                return { width: l.width, height: l.height, offset: i.offset() }; }
            return { width: i.outerWidth(), height: i.outerHeight(), offset: i.offset() }; }
        $.position = { scrollbarWidth: function() {
                if (c !== u) {
                    return c; }
                var w, i, k = $("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
                    l = k.children()[0];
                $("body").append(k);
                w = l.offsetWidth;
                k.css("overflow", "scroll");
                i = l.offsetWidth;
                if (w === i) { i = k[0].clientWidth; }
                k.remove();
                return (c = w - i); }, getScrollInfo: function(w) {
                var o = w.isWindow || w.isDocument ? "" : w.element.css("overflow-x"),
                    i = w.isWindow || w.isDocument ? "" : w.element.css("overflow-y"),
                    k = o === "scroll" || (o === "auto" && w.width < w.element[0].scrollWidth),
                    l = i === "scroll" || (i === "auto" && w.height < w.element[0].scrollHeight);
                return { width: l ? $.position.scrollbarWidth() : 0, height: k ? $.position.scrollbarWidth() : 0 }; }, getWithinInfo: function(i) {
                var w = $(i || window),
                    k = $.isWindow(w[0]),
                    l = !!w[0] && w[0].nodeType === 9;
                return { element: w, isWindow: k, isDocument: l, offset: w.offset() || { left: 0, top: 0 }, scrollLeft: w.scrollLeft(), scrollTop: w.scrollTop(), width: k ? w.width() : w.outerWidth(), height: k ? w.height() : w.outerHeight() }; } };
        $.fn.position = function(o) {
            if (!o || !o.of) {
                return _.apply(this, arguments); }
            o = $.extend({}, o);
            var k, t, l, n, q, s, v = $(o.of),
                w = $.position.getWithinInfo(o.within),
                x = $.position.getScrollInfo(w),
                y = (o.collision || "flip").split(" "),
                z = {};
            s = j(v);
            if (v[0].preventDefault) { o.at = "left top"; }
            t = s.width;
            l = s.height;
            n = s.offset;
            q = $.extend({}, n);
            $.each(["my", "at"], function() {
                var i = (o[this] || "").split(" "),
                    A, B;
                if (i.length === 1) { i = b.test(i[0]) ? i.concat(["center"]) : d.test(i[0]) ? ["center"].concat(i) : ["center", "center"]; }
                i[0] = b.test(i[0]) ? i[0] : "center";
                i[1] = d.test(i[1]) ? i[1] : "center";
                A = e.exec(i[0]);
                B = e.exec(i[1]);
                z[this] = [A ? A[0] : 0, B ? B[0] : 0];
                o[this] = [f.exec(i[0])[0], f.exec(i[1])[0]]; });
            if (y.length === 1) { y[1] = y[0]; }
            if (o.at[0] === "right") { q.left += t; } else if (o.at[0] === "center") { q.left += t / 2; }
            if (o.at[1] === "bottom") { q.top += l; } else if (o.at[1] === "center") { q.top += l / 2; }
            k = h(z.at, t, l);
            q.left += k[0];
            q.top += k[1];
            return this.each(function() {
                var A, B, C = $(this),
                    D = C.outerWidth(),
                    E = C.outerHeight(),
                    F = p(this, "marginLeft"),
                    G = p(this, "marginTop"),
                    H = D + F + p(this, "marginRight") + x.width,
                    I = E + G + p(this, "marginBottom") + x.height,
                    J = $.extend({}, q),
                    K = h(z.my, C.outerWidth(), C.outerHeight());
                if (o.my[0] === "right") { J.left -= D; } else if (o.my[0] === "center") { J.left -= D / 2; }
                if (o.my[1] === "bottom") { J.top -= E; } else if (o.my[1] === "center") { J.top -= E / 2; }
                J.left += K[0];
                J.top += K[1];
                if (!$.support.offsetFractions) { J.left = r(J.left);
                    J.top = r(J.top); }
                A = { marginLeft: F, marginTop: G };
                $.each(["left", "top"], function(i, L) {
                    if ($.ui.position[y[i]]) { $.ui.position[y[i]][L](J, { targetWidth: t, targetHeight: l, elemWidth: D, elemHeight: E, collisionPosition: A, collisionWidth: H, collisionHeight: I, offset: [k[0] + K[0], k[1] + K[1]], my: o.my, at: o.at, within: w, elem: C }); } });
                if (o.using) { B = function(i) {
                        var L = n.left - J.left,
                            M = L + t - D,
                            N = n.top - J.top,
                            O = N + l - E,
                            P = { target: { element: v, left: n.left, top: n.top, width: t, height: l }, element: { element: C, left: J.left, top: J.top, width: D, height: E }, horizontal: M < 0 ? "left" : L > 0 ? "right" : "center", vertical: O < 0 ? "top" : N > 0 ? "bottom" : "middle" };
                        if (t < D && a(L + M) < t) { P.horizontal = "center"; }
                        if (l < E && a(N + O) < l) { P.vertical = "middle"; }
                        if (m(a(L), a(M)) > m(a(N), a(O))) { P.important = "horizontal"; } else { P.important = "vertical"; }
                        o.using.call(this, i, P); }; }
                C.offset($.extend(J, { using: B })); }); };
        $.ui.position = { fit: { left: function(i, k) {
                    var w = k.within,
                        l = w.isWindow ? w.scrollLeft : w.offset.left,
                        o = w.width,
                        n = i.left - k.collisionPosition.marginLeft,
                        q = l - n,
                        s = n + k.collisionWidth - o - l,
                        t;
                    if (k.collisionWidth > o) {
                        if (q > 0 && s <= 0) { t = i.left + q + k.collisionWidth - o - l;
                            i.left += q - t; } else if (s > 0 && q <= 0) { i.left = l; } else {
                            if (q > s) { i.left = l + o - k.collisionWidth; } else { i.left = l; } } } else if (q > 0) { i.left += q; } else if (s > 0) { i.left -= s; } else { i.left = m(i.left - n, i.left); } }, top: function(i, k) {
                    var w = k.within,
                        l = w.isWindow ? w.scrollTop : w.offset.top,
                        o = k.within.height,
                        n = i.top - k.collisionPosition.marginTop,
                        q = l - n,
                        s = n + k.collisionHeight - o - l,
                        t;
                    if (k.collisionHeight > o) {
                        if (q > 0 && s <= 0) { t = i.top + q + k.collisionHeight - o - l;
                            i.top += q - t; } else if (s > 0 && q <= 0) { i.top = l; } else {
                            if (q > s) { i.top = l + o - k.collisionHeight; } else { i.top = l; } } } else if (q > 0) { i.top += q; } else if (s > 0) { i.top -= s; } else { i.top = m(i.top - n, i.top); } } }, flip: { left: function(i, k) {
                    var w = k.within,
                        l = w.offset.left + w.scrollLeft,
                        o = w.width,
                        n = w.isWindow ? w.scrollLeft : w.offset.left,
                        q = i.left - k.collisionPosition.marginLeft,
                        s = q - n,
                        t = q + k.collisionWidth - o - n,
                        v = k.my[0] === "left" ? -k.elemWidth : k.my[0] === "right" ? k.elemWidth : 0,
                        x = k.at[0] === "left" ? k.targetWidth : k.at[0] === "right" ? -k.targetWidth : 0,
                        y = -2 * k.offset[0],
                        z, A;
                    if (s < 0) { z = i.left + v + x + y + k.collisionWidth - o - l;
                        if (z < 0 || z < a(s)) { i.left += v + x + y; } } else if (t > 0) { A = i.left - k.collisionPosition.marginLeft + v + x + y - n;
                        if (A > 0 || a(A) < t) { i.left += v + x + y; } } }, top: function(i, k) {
                    var w = k.within,
                        l = w.offset.top + w.scrollTop,
                        o = w.height,
                        n = w.isWindow ? w.scrollTop : w.offset.top,
                        q = i.top - k.collisionPosition.marginTop,
                        s = q - n,
                        t = q + k.collisionHeight - o - n,
                        v = k.my[1] === "top",
                        x = v ? -k.elemHeight : k.my[1] === "bottom" ? k.elemHeight : 0,
                        y = k.at[1] === "top" ? k.targetHeight : k.at[1] === "bottom" ? -k.targetHeight : 0,
                        z = -2 * k.offset[1],
                        A, B;
                    if (s < 0) { B = i.top + x + y + z + k.collisionHeight - o - l;
                        if ((i.top + x + y + z) > s && (B < 0 || B < a(s))) { i.top += x + y + z; } } else if (t > 0) { A = i.top - k.collisionPosition.marginTop + x + y + z - n;
                        if ((i.top + x + y + z) > t && (A > 0 || a(A) < t)) { i.top += x + y + z; } } } }, flipfit: { left: function() { $.ui.position.flip.left.apply(this, arguments);
                    $.ui.position.fit.left.apply(this, arguments); }, top: function() { $.ui.position.flip.top.apply(this, arguments);
                    $.ui.position.fit.top.apply(this, arguments); } } };
        (function() {
            var t, k, l, o, i, n = document.getElementsByTagName("body")[0],
                q = document.createElement("div");
            t = document.createElement(n ? "div" : "body");
            l = { visibility: "hidden", width: 0, height: 0, border: 0, margin: 0, background: "none" };
            if (n) { $.extend(l, { position: "absolute", left: "-1000px", top: "-1000px" }); }
            for (i in l) { t.style[i] = l[i]; }
            t.appendChild(q);
            k = n || document.documentElement;
            k.insertBefore(t, k.firstChild);
            q.style.cssText = "position: absolute; left: 10.7432222px;";
            o = $(q).offset().left;
            $.support.offsetFractions = o > 10 && o < 11;
            t.innerHTML = "";
            k.removeChild(t); })(); }(jQuery));
    /*!
     * UI development toolkit for HTML5 (OpenUI5)
     * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
     * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
     */
    (function() { "use strict";
        if (!window.jQuery) {
            throw new Error("SAPUI5 requires jQuery as a prerequisite (>= version 1.7)"); }
        if (jQuery.sap) {
            return; }
        if (sap.ui.Device.browser.edge) { window.Promise = undefined; }
        if (!window.Promise) { ES6Promise.polyfill(); }
        var _ = window;
        var a = [];

        function b(l, m) { a.push({ level: l, message: m }); }
        var c;
        var f = /^[0-9]+(?:\.([0-9]+)(?:\.([0-9]+))?)?(.*)$/;

        function V(M, i, d, s) {
            if (M instanceof V) {
                return M; }
            if (!(this instanceof V)) {
                return new V(M, i, d, s); }
            var m;
            if (typeof M === "string") { m = f.exec(M); } else if (jQuery.isArray(M)) { m = M; } else { m = arguments; }
            m = m || [];

            function n(v) { v = parseInt(v, 10);
                return isNaN(v) ? 0 : v; }
            M = n(m[0]);
            i = n(m[1]);
            d = n(m[2]);
            s = String(m[3] || "");
            this.toString = function() {
                return M + "." + i + "." + d + s; };
            this.getMajor = function() {
                return M; };
            this.getMinor = function() {
                return i; };
            this.getPatch = function() {
                return d; };
            this.getSuffix = function() {
                return s; };
            this.compareTo = function() {
                var o = V.apply(window, arguments);
                return M - o.getMajor() || i - o.getMinor() || d - o.getPatch() || ((s < o.getSuffix()) ? -1 : (s === o.getSuffix()) ? 0 : 1); }; }
        V.prototype.inRange = function(m, M) {
            return this.compareTo(m) >= 0 && this.compareTo(M) < 0; };
        var J = V(jQuery.fn.jquery);
        if (!J.inRange("1.7.0", "2.2.0")) { b("error", "SAPUI5 requires a jQuery version of 1.7 or higher, but lower than 2.2; current version is " + jQuery.fn.jquery); }
        if (!jQuery.browser) { jQuery.browser = (function(d) {
                var r = /(webkit)[ \/]([\w.]+)/,
                    i = /(opera)(?:.*version)?[ \/]([\w.]+)/,
                    j = /(msie) ([\w.]+)/,
                    l = /(mozilla)(?:.*? rv:([\w.]+))?/,
                    d = d.toLowerCase(),
                    m = r.exec(d) || i.exec(d) || j.exec(d) || d.indexOf("compatible") < 0 && l.exec(d) || [],
                    n = {};
                if (m[1]) { n[m[1]] = true;
                    n.version = m[2] || "0";
                    if (n.webkit) { n.safari = true; } }
                return n; }(window.navigator.userAgent)); }
        if (!!sap.ui.Device.browser.internet_explorer) { jQuery.support = jQuery.support || {};
            jQuery.support.cors = true;
            var g = V(jQuery.fn.jquery);
            if (window.ActiveXObject !== undefined && g.getMajor() == 1 && g.getMinor() >= 11) {
                var C = function() {
                    try {
                        return new window.XMLHttpRequest(); } catch (e) {} };
                var h = function() {
                    try {
                        return new window.ActiveXObject("Microsoft.XMLHTTP"); } catch (e) {} };
                jQuery.ajaxSettings = jQuery.ajaxSettings || {};
                jQuery.ajaxSettings.xhr = function() {
                    return !this.isLocal ? C() : h(); }; } }
        var k = (function() {
            var T, U, r, d = /^(.*\/)?download\/configurator[\/\?]/,
                i = /^(.*\/)?(sap-ui-(core|custom|boot|merged)(-.*)?)\.js([?#]|$)/,
                j = /^(.*\/)?resources\//;
            jQuery("script[src]").each(function() {
                var s = this.getAttribute("src"),
                    m;
                if ((m = s.match(d)) !== null) { T = this;
                    U = s;
                    r = (m[1] || "") + "resources/";
                    return false; } else if ((m = s.match(i)) !== null) { T = this;
                    U = s;
                    r = m[1] || "";
                    return false; } else if (this.id == 'sap-ui-bootstrap' && (m = s.match(j))) { T = this;
                    U = s;
                    r = m[0];
                    return false; } });
            return { tag: T, url: U, resourceRoot: r }; })();
        (function() {
            if (/sap-bootstrap-debug=(true|x|X)/.test(location.search)) { debugger; }
            var r;
            try { r = window.localStorage.getItem("sap-ui-reboot-URL");
                window.localStorage.removeItem("sap-ui-reboot-URL"); } catch (e) {}
            if (r && r !== "undefined") {
                var U = confirm("WARNING!\n\nUI5 will be booted from the URL below.\nPress 'Cancel' unless you have configured this.\n\n" + r);
                if (U) {
                    var s = k.tag,
                        d = "<script src=\"" + r + "\"";
                    jQuery.each(s.attributes, function(i, o) {
                        if (o.nodeName.indexOf("data-sap-ui-") == 0) { d += " " + o.nodeName + "=\"" + o.nodeValue.replace(/"/g, "&quot;") + "\""; } });
                    d += "></script>";
                    s.parentNode.removeChild(s);
                    jQuery("#sap-ui-bootstrap-cachebusted").remove();
                    window["sap-ui-config"] && window["sap-ui-config"].resourceRoots && (window["sap-ui-config"].resourceRoots[""] = undefined);
                    document.write(d);
                    var R = new Error("This is not a real error. Aborting UI5 bootstrap and rebooting from: " + r);
                    R.name = "Restart";
                    throw R; } } })();
        (function() {
            var d = /sap-ui-debug=(true|x|X)/.test(location.search),
                i = window["sap-ui-optimized"];
            try { d = d || (window.localStorage.getItem("sap-ui-debug") == "X"); } catch (e) {}
            window["sap-ui-debug"] = d;
            if (/-dbg\.js([?#]|$)/.test(k.url)) { window["sap-ui-loaddbg"] = true;
                window["sap-ui-debug"] = true; }
            if (i && d) {
                var D = k.url.replace(/\/(?:sap-ui-cachebuster\/)?([^\/]+)\.js/, "/$1-dbg.js");
                window["sap-ui-optimized"] = false;
                window["sap-ui-loaddbg"] = true;
                document.write("<script type=\"text/javascript\" src=\"" + D + "\"></script>");
                var r = new Error("Aborting UI5 bootstrap and restarting from: " + D);
                r.name = "Restart";
                throw r; } })();
        var p = _["sap-ui-config"] = (function() {
            function n(o) { jQuery.each(o, function(i, v) {
                    var m = i.toLowerCase();
                    if (!o.hasOwnProperty(m)) { o[m] = v;
                        delete o[i]; } });
                return o; }
            var s = k.tag,
                d = _["sap-ui-config"],
                j = "sap-ui-config.json";
            if (typeof d === "string") { b("warning", "Loading external bootstrap configuration from \"" + d + "\". This is a design time feature and not for productive usage!");
                if (d !== j) { b("warning", "The external bootstrap configuration file should be named \"" + j + "\"!"); }
                jQuery.ajax({ url: d, dataType: 'json', async: false, success: function(D, T, i) { d = D; }, error: function(i, T, o) { b("error", "Loading externalized bootstrap configuration from \"" + d + "\" failed! Reason: " + o + "!");
                        d = undefined; } }); }
            d = n(d || {});
            d.resourceroots = d.resourceroots || {};
            d.themeroots = d.themeroots || {};
            d.resourceroots[''] = d.resourceroots[''] || k.resourceRoot;
            d['xx-loadallmode'] = /(^|\/)(sap-?ui5|[^\/]+-all).js([?#]|$)/.test(k.url);
            if (s) {
                var l = s.getAttribute("data-sap-ui-config");
                if (l) {
                    try { jQuery.extend(d, n((new Function("return {" + l + "};"))())); } catch (e) { b("error", "failed to parse data-sap-ui-config attribute: " + (e.message || e)); } }
                jQuery.each(s.attributes, function(i, o) {
                    var m = o.name.match(/^data-sap-ui-(.*)$/);
                    if (m) { m = m[1].toLowerCase();
                        if (m === 'resourceroots') { jQuery.extend(d[m], jQuery.parseJSON(o.value)); } else if (m === 'theme-roots') { jQuery.extend(d.themeroots, jQuery.parseJSON(o.value)); } else if (m !== 'config') { d[m] = o.value; } } }); }
            return d; }());
        if (p.noconflict === true || p.noconflict === "true" || p.noconflict === "x") { jQuery.noConflict(); }
        jQuery.sap = {};
        jQuery.sap.Version = V;
        jQuery.sap.now = !(window.performance && window.performance.now && window.performance.timing) ? Date.now : function() {
            return window.performance.timing.navigationStart + window.performance.now(); };
        jQuery.sap.debug = function(d) {
            if (!window.localStorage) {
                return null; }

            function r(U) { alert("Usage of debug sources is " + (U ? "on" : "off") + " now.\nFor the change to take effect, you need to reload the page."); }
            if (d === true) { window.localStorage.setItem("sap-ui-debug", "X");
                r(true); } else if (d === false) { window.localStorage.removeItem("sap-ui-debug");
                r(false); }
            return window.localStorage.getItem("sap-ui-debug") == "X"; };
        jQuery.sap.setReboot = function(r) {
            var U;
            if (!window.localStorage) {
                return null; }
            try {
                if (r) { window.localStorage.setItem("sap-ui-reboot-URL", r);
                    alert("Next time this app is launched (only once), it will load UI5 from:\n" + r + ".\nPlease reload the application page now."); } else { window.localStorage.removeItem("sap-ui-reboot-URL"); }
                U = window.localStorage.getItem("sap-ui-reboot-URL"); } catch (e) { jQuery.sap.log.warning("Could not access localStorage while setting reboot URL '" + r + "' (are cookies disabled?): " + e.message); }
            return U; };
        jQuery.sap.statistics = function(d) {
            if (!window.localStorage) {
                return null; }

            function i(U) { alert("Usage of Gateway statistics " + (U ? "on" : "off") + " now.\nFor the change to take effect, you need to reload the page."); }
            if (d === true) { window.localStorage.setItem("sap-ui-statistics", "X");
                i(true); } else if (d === false) { window.localStorage.removeItem("sap-ui-statistics");
                i(false); }
            return window.localStorage.getItem("sap-ui-statistics") == "X"; };
        (function() {
            var d = 0,
                j = 1,
                W = 2,
                n = 3,
                D = 4,
                T = 5,
                s = (window.top == window) ? "" : "[" + window.location.pathname.split('/').slice(-1)[0] + "] ",
                L = [],
                M = { '': j },
                o = null;

            function r(i, w) {
                return ("000" + String(i)).slice(-w); }

            function B(i) {
                return (!i || isNaN(M[i])) ? M[''] : M[i]; }

            function G() {
                if (!o) { o = { listeners: [], onLogEntry: function(l) {
                            for (var i = 0; i < o.listeners.length; i++) {
                                if (o.listeners[i].onLogEntry) { o.listeners[i].onLogEntry(l); } } }, attach: function(l, i) {
                            if (i) { o.listeners.push(i);
                                if (i.onAttachToLog) { i.onAttachToLog(l); } } }, detach: function(l, m) {
                            for (var i = 0; i < o.listeners.length; i++) {
                                if (o.listeners[i] === m) {
                                    if (m.onDetachFromLog) { m.onDetachFromLog(l); }
                                    o.listeners.splice(i, 1);
                                    return; } } } }; }
                return o; }

            function H(l, m, i, v) {
                if (l <= B(v)) {
                    var w = jQuery.sap.now(),
                        O = new Date(w),
                        Q = Math.floor((w - Math.floor(w)) * 1000),
                        R = { time: r(O.getHours(), 2) + ":" + r(O.getMinutes(), 2) + ":" + r(O.getSeconds(), 2) + "." + r(O.getMilliseconds(), 3) + r(Q, 3), date: r(O.getFullYear(), 4) + "-" + r(O.getMonth() + 1, 2) + "-" + r(O.getDate(), 2), timestamp: w, level: l, message: String(m || ""), details: String(i || ""), component: String(v || "") };
                    L.push(R);
                    if (o) { o.onLogEntry(R); }
                    if (window.console) {
                        var U = R.date + " " + R.time + " " + s + R.message + " - " + R.details + " " + R.component;
                        switch (l) {
                            case d:
                            case j:
                                console.error(U);
                                break;
                            case W:
                                console.warn(U);
                                break;
                            case n:
                                console.info ? console.info(U) : console.log(U);
                                break;
                            case D:
                                console.debug ? console.debug(U) : console.log(U);
                                break;
                            case T:
                                console.trace ? console.trace(U) : console.log(U);
                                break; } }
                    return R; } }

            function K(i) { this.fatal = function(m, l, v) { H(d, m, l, v || i);
                    return this; };
                this.error = function error(m, l, v) { H(j, m, l, v || i);
                    return this; };
                this.warning = function warning(m, l, v) { H(W, m, l, v || i);
                    return this; };
                this.info = function info(m, l, v) { H(n, m, l, v || i);
                    return this; };
                this.debug = function debug(m, l, v) { H(D, m, l, v || i);
                    return this; };
                this.trace = function trace(m, l, v) { H(T, m, l, v || i);
                    return this; };
                this.setLevel = function setLevel(l, m) { m = m || i || '';
                    M[m] = l;
                    var w = [];
                    jQuery.each(jQuery.sap.log.LogLevel, function(O, v) { w[v] = O; });
                    H(n, "Changing log level " + (m ? "for '" + m + "' " : "") + "to " + w[l], "", "jQuery.sap.log");
                    return this; };
                this.getLevel = function getLevel(l) {
                    return B(l || i); };
                this.isLoggable = function(l, m) {
                    return (l == null ? D : l) <= B(m || i); }; }
            jQuery.sap.log = jQuery.extend(new K(), { Level: { NONE: d - 1, FATAL: d, ERROR: j, WARNING: W, INFO: n, DEBUG: D, TRACE: T, ALL: (T + 1) }, getLogger: function(i, l) {
                    if (!isNaN(l) && M[i] == null) { M[i] = l; }
                    return new K(i); }, getLogEntries: function() {
                    return L.slice(); }, addLogListener: function(o) { G().attach(this, o);
                    return this; }, removeLogListener: function(o) { G().detach(this, o);
                    return this; } });
            jQuery.sap.log.LogLevel = jQuery.sap.log.Level;
            jQuery.sap.log.getLog = jQuery.sap.log.getLogEntries;

            function N() {
                function m(i, l, f1, g1, h1) { this.id = i;
                    this.info = l;
                    this.start = f1;
                    this.end = g1;
                    this.pause = 0;
                    this.resume = 0;
                    this.duration = 0;
                    this.time = 0;
                    this.categories = h1;
                    this.average = false;
                    this.count = 0;
                    this.completeDuration = 0; }

                function v(l) {
                    if (!R) {
                        return true; }
                    if (!l) {
                        return R === null; }
                    for (var i = 0; i < R.length; i++) {
                        if (l.indexOf(R[i]) > -1) {
                            return true; } }
                    return false; }

                function w(i) {
                    if (!i) { i = ["javascript"]; }
                    i = typeof i === "string" ? i.split(",") : i;
                    if (!v(i)) {
                        return null; }
                    return i; }
                var O = false,
                    Q = jQuery.ajax,
                    R = null,
                    U = [],
                    X = [],
                    Y = {},
                    Z = {};
                this.getActive = function() {
                    return O; };
                this.setActive = function(i, l) {
                    if (!l) { l = null; } else if (typeof l === "string") { l = l.split(","); }
                    R = l;
                    if (O === i) {
                        return; }
                    O = i;
                    if (O) {
                        for (var e1 in Y) { this[e1] = Y[e1]; }
                        Y = {};
                        jQuery.ajax = function(f1, g1) {
                            if (typeof f1 === 'object') { g1 = f1;
                                f1 = undefined; }
                            g1 = g1 || {};
                            var h1 = new URI(f1 || g1.url).absoluteTo(document.location.origin + document.location.pathname).href();
                            jQuery.sap.measure.start(h1, "Request for " + h1, "xmlhttprequest");
                            var i1 = g1.complete;
                            g1.complete = function() { jQuery.sap.measure.end(h1);
                                if (i1) { i1.apply(this, arguments); } };
                            return Q.call(this, f1, g1); }; } else if (Q) { jQuery.ajax = Q; }
                    return O; };
                Y["start"] = function(i, l, f1) {
                    if (!O) {
                        return; }
                    f1 = w(f1);
                    if (!f1) {
                        return; }
                    var g1 = jQuery.sap.now(),
                        h1 = new m(i, l, g1, 0, f1);
                    if (jQuery.sap.log.getLevel("sap.ui.Performance") >= 4 && window.console && console.time) { console.time(l + " - " + i); }
                    if (h1) { Z[i] = h1;
                        return this.getMeasurement(h1.id); } else {
                        return false; } };
                Y["pause"] = function(i) {
                    if (!O) {
                        return; }
                    var l = jQuery.sap.now();
                    var f1 = Z[i];
                    if (f1 && f1.end > 0) {
                        return false; }
                    if (f1 && f1.pause == 0) { f1.pause = l;
                        if (f1.pause >= f1.resume && f1.resume > 0) { f1.duration = f1.duration + f1.pause - f1.resume;
                            f1.resume = 0; } else if (f1.pause >= f1.start) { f1.duration = f1.pause - f1.start; } }
                    if (f1) {
                        return this.getMeasurement(f1.id); } else {
                        return false; } };
                Y["resume"] = function(i) {
                    if (!O) {
                        return; }
                    var l = jQuery.sap.now();
                    var f1 = Z[i];
                    if (f1 && f1.pause > 0) { f1.pause = 0;
                        f1.resume = l; }
                    if (f1) {
                        return this.getMeasurement(f1.id); } else {
                        return false; } };
                Y["end"] = function(i) {
                    if (!O) {
                        return; }
                    var l = jQuery.sap.now();
                    var f1 = Z[i];
                    if (f1 && !f1.end) { f1.end = l;
                        if (f1.end >= f1.resume && f1.resume > 0) { f1.duration = f1.duration + f1.end - f1.resume;
                            f1.resume = 0; } else if (f1.pause > 0) { f1.pause = 0; } else if (f1.end >= f1.start) {
                            if (f1.average) { f1.completeDuration += (f1.end - f1.start);
                                f1.count++;
                                f1.duration = f1.completeDuration / f1.count;
                                f1.start = l; } else { f1.duration = f1.end - f1.start; } }
                        if (f1.end >= f1.start) { f1.time = f1.end - f1.start; } }
                    if (f1) {
                        if (jQuery.sap.log.getLevel("sap.ui.Performance") >= 4 && window.console && console.timeEnd) { console.timeEnd(f1.info + " - " + i); }
                        return this.getMeasurement(i); } else {
                        return false; } };
                Y["clear"] = function() { Z = {}; };
                Y["remove"] = function(i) { delete Z[i]; };
                Y["add"] = function(i, l, f1, g1, h1, i1, j1) {
                    if (!O) {
                        return; }
                    j1 = w(j1);
                    if (!j1) {
                        return false; }
                    var k1 = new m(i, l, f1, g1, j1);
                    k1.time = h1;
                    k1.duration = i1;
                    if (k1) { Z[i] = k1;
                        return this.getMeasurement(k1.id); } else {
                        return false; } };
                Y["average"] = function(i, l, f1) {
                    if (!O) {
                        return; }
                    f1 = w(f1);
                    if (!f1) {
                        return; }
                    var g1 = Z[i],
                        h1 = jQuery.sap.now();
                    if (!g1 || !g1.average) { this.start(i, l, f1);
                        g1 = Z[i];
                        g1.average = true; } else {
                        if (!g1.end) { g1.completeDuration += (h1 - g1.start);
                            g1.count++; }
                        g1.start = h1;
                        g1.end = 0; }
                    return this.getMeasurement(g1.id); };
                this.getMeasurement = function(i) {
                    var l = Z[i];
                    if (l) {
                        return { id: l.id, info: l.info, start: l.start, end: l.end, pause: l.pause, resume: l.resume, time: l.time, duration: l.duration, completeDuration: l.completeDuration, count: l.count, average: l.average, categories: l.categories }; } else {
                        return false; } };
                this.getAllMeasurements = function(i) {
                    return this.filterMeasurements(function(l) {
                        return l; }, i); };
                this.filterMeasurements = function(i, l) {
                    var f1 = [],
                        g1 = this;
                    jQuery.each(Z, function(h1) {
                        var i1 = g1.getMeasurement(h1);
                        if (i) {
                            var j1 = i(i1);
                            if (j1 && ((l === false && j1.end === 0) || (l !== false && (!l || j1.end)))) { f1.push(j1); } } });
                    return f1; };
                this.registerMethod = function(i, l, f1, g1) {
                    var h1 = l[f1];
                    if (h1 && typeof h1 === "function") {
                        var i1 = U.indexOf(h1) > -1;
                        if (!i1) { X.push({ func: h1, obj: l, method: f1, id: i });
                            l[f1] = function() { jQuery.sap.measure.average(i, i + " method average", g1);
                                var j1 = h1.apply(this, arguments);
                                jQuery.sap.measure.end(i);
                                return j1; };
                            U.push(l[f1]);
                            return true; } } else { jQuery.sap.log.debug(f1 + " in not a function. jQuery.sap.measure.register failed"); }
                    return false; };
                this.unregisterMethod = function(i, l, f1) {
                    var g1 = l[f1],
                        h1 = U.indexOf(g1);
                    if (g1 && h1 > -1) { l[f1] = X[h1].func;
                        U.splice(h1, 1);
                        X.splice(h1, 1);
                        return true; }
                    return false; };
                this.unregisterAllMethods = function() {
                    while (X.length > 0) {
                        var i = X[0];
                        this.unregisterMethod(i.id, i.obj, i.method); } };
                var $ = [];
                var a1;
                this.getAllInteractionMeasurements = function(i) {
                    if (i) { jQuery.sap.measure.endInteraction(true); }
                    return $; };
                this.filterInteractionMeasurements = function(f1) {
                    var g1 = [];
                    if (f1) {
                        for (var i = 0, l = $.length; i < l; i++) {
                            if (f1($[i])) { g1.push($[i]); } } }
                    return g1; };
                this.getPendingInteractionMeasurement = function() {
                    return a1; };
                this.clearInteractionMeasurements = function() { $ = []; };

                function b1(i) {
                    if (a1) { a1.end = i;
                        a1.duration = a1.processing;
                        a1.requests = jQuery.sap.measure.getRequestTimings();
                        a1.measurements = jQuery.sap.measure.filterMeasurements(function(k1) {
                            return (k1.start > a1.start && k1.end < a1.end) ? k1 : null; }, true);
                        if (a1.requests.length > 0) {
                            var l = a1.requests[0].startTime,
                                f1 = a1.requests[0].startTime,
                                g1 = a1.requests[0].requestStart,
                                h1 = a1.requests[0].requestStart,
                                i1 = a1.requests[0].responseEnd;
                            a1.requests.forEach(function(k1) { l = k1.responseEnd > l ? k1.responseEnd : l;
                                a1.requestTime += (k1.responseEnd - k1.startTime);
                                if (i1 < k1.startTime) { a1.navigation += (g1 - f1);
                                    a1.roundtrip += (i1 - h1);
                                    f1 = k1.startTime;
                                    h1 = k1.requestStart; }
                                if (k1.responseEnd > i1) { g1 = k1.requestStart;
                                    i1 = k1.responseEnd; } });
                            a1.navigation += g1 - f1;
                            a1.roundtrip += i1 - h1;
                            a1.networkTime = a1.networkTime ? ((a1.requestTime - a1.networkTime) / a1.requests.length) : 0;
                            if (a1.duration === 0) { a1.duration = a1.navigation + a1.roundtrip; } }
                        if (a1.processing !== 0) {
                            var j1 = a1.processing - a1.navigation - a1.roundtrip;
                            a1.processing = j1 > 0 ? j1 : 0; }
                        $.push(a1);
                        jQuery.sap.log.info("Interaction step finished: trigger: " + a1.trigger + "; duration: " + a1.duration + "; requests: " + a1.requests.length, "jQuery.sap.measure");
                        a1 = null; } }
                this.startInteraction = function(i, l) {
                    function f1(l) {
                        var i1, j1;
                        if (l) {
                            var k1, l1;
                            k1 = sap.ui.require("sap/ui/core/Component");
                            while (k1 && l && l.getParent) { l1 = k1.getOwnerComponentFor(l);
                                if (l1 || l instanceof k1) { l1 = l1 || l;
                                    var m1 = l1.getManifestEntry("sap.app");
                                    i1 = m1 && m1.id || l1.getMetadata().getName();
                                    j1 = m1 && m1.applicationVersion && m1.applicationVersion.version; }
                                l = l.getParent(); } }
                        return { id: i1 ? i1 : "undetermined", version: j1 ? j1 : "" }; }
                    var g1 = jQuery.sap.now();
                    if (a1) { b1(g1); }
                    this.clearRequestTimings();
                    var h1 = f1(l);
                    a1 = { event: i, trigger: l && l.getId ? l.getId() : "undetermined", component: h1.id, appVersion: h1.version, start: g1, end: 0, navigation: 0, roundtrip: 0, processing: 0, duration: 0, requests: [], measurements: [], sapStatistics: [], requestTime: 0, networkTime: 0, bytesSent: 0, bytesReceived: 0, requestCompression: undefined, busyDuration: 0 };
                    jQuery.sap.log.info("Interaction step started: trigger: " + a1.trigger + "; type: " + a1.event, "jQuery.sap.measure"); };
                this.endInteraction = function(i) {
                    if (a1) {
                        if (!i) { a1.processing = jQuery.sap.now() - a1.start; } else { b1(jQuery.sap.now()); } } };
                this.setRequestBufferSize = function(i) {
                    if (!window.performance) {
                        return; }
                    if (window.performance.setResourceTimingBufferSize) { window.performance.setResourceTimingBufferSize(i); } else if (window.performance.webkitSetResourceTimingBufferSize) { window.performance.webkitSetResourceTimingBufferSize(i); } };
                this.getRequestTimings = function() {
                    if (window.performance && window.performance.getEntriesByType) {
                        return jQuery.extend(window.performance.getEntriesByType("resource"), {}); }
                    return []; };
                this.clearRequestTimings = function() {
                    if (!window.performance) {
                        return; }
                    if (window.performance.clearResourceTimings) { window.performance.clearResourceTimings(); } else if (window.performance.webkitClearResourceTimings) { window.performance.webkitClearResourceTimings(); } };
                this.setRequestBufferSize(1000);
                var c1 = location.search.match(/sap-ui-measure=([^\&]*)/);
                if (c1 && c1[1]) {
                    if (c1[1] === "true" || c1[1] === "x" || c1[1] === "X") { this.setActive(true); } else { this.setActive(true, c1[1]); } } else {
                    var d1 = function() {
                        return null; };
                    for (var e1 in Y) { this[e1] = d1; } } }
            jQuery.sap.measure = new N();
            jQuery.sap.assert = function(R, m) {
                if (!R) {
                    var i = typeof m === "function" ? m() : m;
                    if (window.console && console.assert) { console.assert(R, s + i); } else { jQuery.sap.log.debug("[Assertions] " + i); } } };
            p.loglevel = (function() {
                var m = /(?:\?|&)sap-ui-log(?:L|-l)evel=([^&]*)/.exec(window.location.search);
                return m && m[1]; }()) || p.loglevel;
            if (p.loglevel) { jQuery.sap.log.setLevel(jQuery.sap.log.Level[p.loglevel.toUpperCase()] || parseInt(p.loglevel, 10)); }
            jQuery.sap.log.info("SAP Logger started.");
            jQuery.each(a, function(i, e) { jQuery.sap.log[e.level](e.message); });
            a = null; }());
        jQuery.sap.factory = function factory(o) {
            function d() {}
            d.prototype = o;
            return d; };
        jQuery.sap.newObject = function newObject(o) {
            return new(jQuery.sap.factory(o))(); };
        jQuery.sap.getter = function getter(v) {
            return function() {
                return v; }; };
        jQuery.sap.getObject = function getObject(n, N, o) {
            var O = o || _,
                d = (n || "").split("."),
                l = d.length,
                j = isNaN(N) ? 0 : l - N,
                i;
            for (i = 0; O && i < l; i++) {
                if (!O[d[i]] && i < j) { O[d[i]] = {}; }
                O = O[d[i]]; }
            return O; };
        jQuery.sap.setObject = function(n, v, o) {
            var O = o || _,
                N = (n || "").split("."),
                l = N.length,
                i;
            if (l > 0) {
                for (i = 0; O && i < l - 1; i++) {
                    if (!O[N[i]]) { O[N[i]] = {}; }
                    O = O[N[i]]; }
                O[N[l - 1]] = v; } };

        function S(n, d, T) {
            var i = [],
                o = 0,
                j = 0,
                s;
            this.startTask = function(m) {
                var r = i.length;
                i[r] = { name: m, finished: false };
                o++;
                return r; };
            this.finishTask = function(m, r) {
                if (!i[m] || i[m].finished) {
                    throw new Error("trying to finish non existing or already finished task"); }
                i[m].finished = true;
                o--;
                if (r === false) { j++; }
                if (o === 0) { jQuery.sap.log.info("Sync point '" + n + "' finished (tasks:" + i.length + ", open:" + o + ", failures:" + j + ")");
                    if (s) { clearTimeout(s);
                        s = null; }
                    l(); } };

            function l() { d && d(o, j);
                d = null; }
            if (!isNaN(T)) { s = setTimeout(function() { jQuery.sap.log.info("Sync point '" + n + "' timed out (tasks:" + i.length + ", open:" + o + ", failures:" + j + ")");
                    l(); }, T); }
            jQuery.sap.log.info("Sync point '" + n + "' created" + (T ? "(timeout after " + T + " ms)" : "")); }
        jQuery.sap.syncPoint = function(n, d, T) {
            return new S(n, d, T); };
        var q = (function() {
            var o = jQuery.sap.log.getLogger("sap.ui.ModuleSystem", (/sap-ui-xx-debug(M|-m)odule(L|-l)oading=(true|x|X)/.test(location.search) || p["xx-debugModuleLoading"]) ? jQuery.sap.log.Level.DEBUG : jQuery.sap.log.Level.INFO),
                U = { '': { 'url': 'resources/' } },
                r = 0,
                v = -1,
                L = 1,
                w = 2,
                B = 3,
                R = 4,
                D = 5,
                M = { "sap/ui/thirdparty/URI.js": { state: R, url: c, content: URI }, "sap/ui/Device.js": { state: R, url: c, content: sap.ui.Device }, "jquery.sap.global.js": { state: R, url: c, content: jQuery } },
                G = {},
                H = { 'sap/ui/thirdparty/blanket.js': { amd: true, exports: 'blanket' }, 'sap/ui/thirdparty/caja-html-sanitizer.js': { amd: false, exports: 'html' }, 'sap/ui/thirdparty/crossroads.js': { amd: true, exports: 'crossroads', deps: ['sap/ui/thirdparty/signals.js'] }, 'sap/ui/thirdparty/d3.js': { amd: true, exports: 'd3' }, 'sap/ui/thirdparty/datajs.js': { amd: true, exports: 'OData' }, 'sap/ui/thirdparty/es6-promise.js': { amd: true, exports: 'ES6Promise' }, 'sap/ui/thirdparty/flexie.js': { exports: 'Flexie' }, 'sap/ui/thirdparty/handlebars.js': { amd: true, exports: 'Handlebars' }, 'sap/ui/thirdparty/hasher.js': { amd: true, exports: 'hasher', deps: ['sap/ui/thirdparty/signals.js'] }, 'sap/ui/thirdparty/IPv6.js': { amd: true, exports: 'IPv6' }, 'sap/ui/thirdparty/iscroll-lite.js': { exports: 'iScroll' }, 'sap/ui/thirdparty/iscroll.js': { exports: 'iScroll' }, 'sap/ui/thirdparty/jquery.js': { amd: true }, 'sap/ui/thirdparty/jquery/jquery-1.11.1.js': { amd: true }, 'sap/ui/thirdparty/jquery/jquery-1.10.2.js': { amd: true }, 'sap/ui/thirdparty/jquery/jquery-1.10.1.js': { amd: true }, 'sap/ui/thirdparty/jquery/jquery.1.7.1.js': { amd: true }, 'sap/ui/thirdparty/jquery/jquery.1.8.1.js': { amd: true }, 'sap/ui/thirdparty/jquery-mobile-custom.js': { amd: true, exports: 'jQuery.mobile' }, 'sap/ui/thirdparty/jszip.js': { amd: true, exports: 'JSZip' }, 'sap/ui/thirdparty/less.js': { amd: true, exports: 'less' }, 'sap/ui/thirdparty/mobify-carousel.js': { exports: 'Mobify' }, 'sap/ui/thirdparty/punycode.js': { amd: true, exports: 'punycode' }, 'sap/ui/thirdparty/require.js': { exports: 'define' }, 'sap/ui/thirdparty/SecondLevelDomains.js': { amd: true, exports: 'SecondLevelDomains' }, 'sap/ui/thirdparty/signals.js': { amd: true, exports: 'signals' }, 'sap/ui/thirdparty/sinon.js': { amd: true, exports: 'sinon' }, 'sap/ui/thirdparty/sinon-server.js': { amd: true, exports: 'sinon' }, 'sap/ui/thirdparty/unorm.js': { exports: 'UNorm' }, 'sap/ui/thirdparty/unormdata.js': { exports: 'UNorm', deps: ['sap/ui/thirdparty/unorm.js'] }, 'sap/ui/thirdparty/URI.js': { amd: true, exports: 'URI' }, 'sap/ui/thirdparty/URITemplate.js': { amd: true, exports: 'URITemplate', deps: ['sap/ui/thirdparty/URI.js'] }, 'sap/ui/thirdparty/vkbeautify.js': { exports: 'vkbeautify' }, 'sap/ui/thirdparty/zyngascroll.js': { exports: 'Scroller' }, 'sap/ui/demokit/js/esprima.js': { amd: true, exports: 'esprima' } },
                K = [],
                N = "",
                O = 512 * 1024,
                Q = document.location.href.replace(/\?.*|#.*/g, ""),
                T = "fragment",
                W = "view",
                X = { js: [W, T, "controller", "designtime"], xml: [W, T], json: [W, T], html: [W, T] },
                Y = new RegExp("(\\.(?:" + X.js.join("|") + "))?\\.js$"),
                Z, $;
            (function() {
                var s = "",
                    d = "";
                jQuery.each(X, function(i, j) { s = (s ? s + "|" : "") + i;
                    d = (d ? d + "|" : "") + "(?:(?:" + j.join("\\.|") + "\\.)?" + i + ")"; });
                s = "\\.(" + s + ")$";
                d = "\\.(?:" + d + "|[^./]+)$";
                o.debug("constructed regexp for file types :" + s);
                o.debug("constructed regexp for file sub-types :" + d);
                Z = new RegExp(s);
                $ = new RegExp(d); }());

            function a1(s) {
                if (/^sap\.ui\.thirdparty\.jquery\.jquery-/.test(s)) {
                    return "sap/ui/thirdparty/jquery/jquery-" + s.slice("sap.ui.thirdparty.jquery.jquery-".length); } else if (/^jquery\.sap\./.test(s)) {
                    return s; }
                return s.replace(/\./g, "/"); }

            function b1(s) {
                if (!/\.js$/.test(s)) {
                    return; }
                s = s.slice(0, -3);
                if (/^sap\/ui\/thirdparty\/jquery\/jquery-/.test(s)) {
                    return "sap.ui.thirdparty.jquery.jquery-" + s.slice("sap/ui/thirdparty/jquery/jquery-".length); } else if (/^jquery\.sap\./.test(s)) {
                    return s; }
                return s.replace(/\//g, "."); }

            function c1(s, d) {
                var i = s.split(/\//),
                    l, j, n1, m;
                if (arguments.length === 1 && i.length > 0) { m = $.exec(i[i.length - 1]);
                    if (m) { d = m[0];
                        i[i.length - 1] = i[i.length - 1].slice(0, m.index); } else { d = ""; } }
                for (l = i.length; l >= 0; l--) { j = i.slice(0, l).join('/');
                    if (U[j]) { n1 = U[j].url;
                        if (l < i.length) { n1 += i.slice(l).join('/'); }
                        if (n1.slice(-1) === '/') { n1 = n1.slice(0, -1); }
                        return n1 + (d || ''); } } }

            function d1(s) {
                var d, i, j;
                for (d in U) {
                    if (U.hasOwnProperty(d)) { i = U[d].url.slice(0, -1);
                        if (s.indexOf(i) === 0) { j = d + s.slice(i.length);
                            if (j.charAt(0) === '/') { j = j.slice(1); }
                            if (M[j] && M[j].data) {
                                return j; } } } } }

            function e1(d) {
                if (!d.stack) {
                    try {
                        throw d; } catch (i) {
                        return i.stack; } }
                return d.stack; }

            function f1(d, i) {
                if (!sap.ui.Device.browser.phantomJS) {
                    var j = e1(d);
                    if (j && i) { d.stack = j + "\nCaused by: " + i; } }
                if (window.console && !sap.ui.Device.browser.chrome) { console.error(d.message + "\nCaused by: " + i); } }
            var g1 = /(?:^|\/)\.+/;
            var h1 = /^\.*$/;

            function i1(s, d) {
                var m = g1.exec(d),
                    n1, o1, i, j, l;
                if (!m) {
                    return d; }
                if (m.index === 0 && s == null) {
                    throw new Error("relative name not supported ('" + d + "'"); }
                n1 = (m.index === 0 ? s + d : d).split('/');
                for (i = 0, j = 0, l = n1.length; i < l; i++) {
                    var o1 = n1[i];
                    if (h1.test(o1)) {
                        if (o1 === '.' || o1 === '') {
                            continue; } else if (o1 === '..') {
                            if (j === 0) {
                                throw new Error("Can't navigate to parent of root (base='" + s + "', name='" + d + "'"); }
                            j--; } else {
                            throw new Error("illegal path segment '" + o1 + "'"); } } else { n1[j++] = o1; } }
                n1.length = j;
                return n1.join('/'); }

            function j1(m) {
                var d;
                d = M[m] || (M[m] = { state: r });
                if (d.state > r) {
                    return d; }
                if (o.isLoggable()) { o.debug(N + "declare module '" + m + "'"); }
                d.state = R;
                if (K.length === 0) { K.push(m);
                    d.url = d.url || c; }
                return d; }

            function k1(s) {
                var m = Y.exec(s),
                    d = H[s],
                    j, l, n1, o1, i;
                if (!m) { o.error("can only require Javascript module, not " + s);
                    return; }
                if (d && d.deps) {
                    if (o.isLoggable()) { o.debug("require dependencies of raw module " + s); }
                    for (i = 0; i < d.deps.length; i++) {
                        if (o.isLoggable()) { o.debug("  require " + d.deps[i]); }
                        k1(d.deps[i]); } }
                j = s.slice(0, m.index);
                l = m[0];
                n1 = M[s] || (M[s] = { state: r });
                if (o.isLoggable()) { o.debug(N + "require '" + s + "' of type '" + l + "'"); }
                if (n1.state !== r) {
                    if (n1.state === v) { n1.state = w;
                        l1(s); }
                    if (n1.state === R) {
                        if (o.isLoggable()) { o.debug(N + "module '" + s + "' has already been loaded (skipped)."); }
                        return this; } else if (n1.state === D) {
                        var p1 = new Error("found in negative cache: '" + s + "' from " + n1.url + ": " + n1.errorMessage);
                        f1(p1, n1.errorStack);
                        throw p1; } else {
                        return this; } }
                n1.state = L;
                o1 = window["sap-ui-loaddbg"] ? ["-dbg", ""] : [""];
                for (i = 0; i < o1.length && n1.state !== w; i++) { n1.url = c1(j, o1[i] + l);
                    if (o.isLoggable()) { o.debug(N + "loading " + (o1[i] ? o1[i] + " version of " : "") + "'" + s + "' from '" + n1.url + "'"); }
                    jQuery.ajax({ url: n1.url, dataType: 'text', async: false, success: function(q1, r1, s1) { n1.state = w;
                            n1.data = q1; }, error: function(q1, r1, s1) { n1.state = D;
                            n1.errorMessage = q1 ? q1.status + " - " + q1.statusText : r1;
                            n1.errorStack = s1 && s1.stack; } }); }
                if (n1.state === w) { l1(s); }
                if (n1.state !== R) {
                    var p1 = new Error("failed to load '" + s + "' from " + n1.url + ": " + n1.errorMessage);
                    f1(p1, n1.errorStack);
                    throw p1; } }

            function l1(m) {
                var d = M[m],
                    s = H[m],
                    i, j, l;
                if (d && d.state === w && typeof d.data !== "undefined") { l = (s === true || (s && s.amd)) && typeof window.define === "function" && window.define.amd;
                    try {
                        if (l) { delete window.define.amd; }
                        if (o.isLoggable()) { o.debug(N + "executing '" + m + "'");
                            i = N;
                            N = N + ": "; }
                        d.state = B;
                        K.push(m);
                        if (typeof d.data === "function") { d.data.call(window); } else if (jQuery.isArray(d.data)) { sap.ui.define.apply(sap.ui, d.data); } else { j = d.data;
                            if (j && !j.match(/\/\/[#@] source(Mapping)?URL=.*$/)) { j += "\n//# sourceURL=" + URI(d.url).absoluteTo(Q);
                                if (sap.ui.Device.browser.safari) { j += "?"; } }
                            if (typeof jQuery.sap.require._hook === "function") { j = jQuery.sap.require._hook(j, m); }
                            if (_.execScript && (!d.data || d.data.length < O)) {
                                try { d.data && _.execScript(j); } catch (e) { K.pop();
                                    jQuery.sap.globalEval(d.data);
                                    throw e; } } else { _.eval(j); } }
                        K.pop();
                        d.state = R;
                        d.data = undefined;
                        d.content = d.content || jQuery.sap.getObject((s && s.exports) || b1(m));
                        if (o.isLoggable()) { N = i;
                            o.debug(N + "finished executing '" + m + "'"); } } catch (n1) { d.state = D;
                        d.errorStack = n1 && n1.stack;
                        d.errorMessage = ((n1.toString && n1.toString()) || n1.message) + (n1.line ? "(line " + n1.line + ")" : "");
                        d.data = undefined;
                        if (window["sap-ui-debug"] && (/sap-ui-xx-show(L|-l)oad(E|-e)rrors=(true|x|X)/.test(location.search) || p["xx-showloaderrors"])) { o.error("error while evaluating " + m + ", embedding again via script tag to enforce a stack trace (see below)");
                            jQuery.sap.includeScript(d.url);
                            return; } } finally {
                        if (l) { window.define.amd = l; } } } }

            function m1(s, d, j) {
                var m = [],
                    i, l;
                for (i = 0; i < d.length; i++) { l = i1(s, d[i]);
                    o.debug(N + "require '" + l + "'");
                    k1(l + ".js");
                    m[i] = M[l + ".js"].content || jQuery.sap.getObject(b1(l + ".js"));
                    o.debug(N + "require '" + l + "': done."); }
                j(m); }
            jQuery.sap.getModulePath = function(m, s) {
                return c1(a1(m), s); };
            jQuery.sap.getResourcePath = c1;
            jQuery.sap.registerModulePath = function registerModulePath(m, d) { m = m.replace(/\./g, "/");
                d = d || '.';
                jQuery.sap.registerResourcePath(m, d); };
            jQuery.sap.registerResourcePath = function registerResourcePath(s, d) { s = String(s || "");
                if (U[s] && U[s]["final"] == true) { o.warning("registerResourcePath with prefix " + s + " already set as final to '" + U[s].url + "'. This call is ignored.");
                    return; }
                if (typeof d === 'string' || d instanceof String) { d = { 'url': d }; }
                if (!d || d.url == null) { delete U[s];
                    o.info("registerResourcePath ('" + s + "') (registration removed)"); } else { d.url = String(d.url);
                    var i = d.url.search(/[?#]/);
                    if (i !== -1) { d.url = d.url.slice(0, i); }
                    if (d.url.slice(-1) != '/') { d.url += '/'; }
                    U[s] = d;
                    o.info("registerResourcePath ('" + s + "', '" + d.url + "')" + ((d['final']) ? " (final)" : "")); } };
            jQuery.sap.isDeclared = function isDeclared(m, i) { m = a1(m) + ".js";
                return M[m] && (i || M[m].state !== v); };
            jQuery.sap.getAllDeclaredModules = function() {
                var m = [];
                jQuery.each(M, function(s, d) {
                    if (d && d.state !== v) {
                        var i = b1(s);
                        if (i) { m.push(i); } } });
                return m; };
            if (p.resourceroots) { jQuery.each(p.resourceroots, jQuery.sap.registerModulePath); }
            o.info("URL prefixes set to:");
            for (var n in U) { o.info("  " + (n ? "'" + n + "'" : "(default)") + " : " + U[n].url + ((U[n]['final']) ? " (final)" : "")); }
            jQuery.sap.declare = function(m, d) {
                var s = m;
                if (typeof(m) === "object") { s = m.modName;
                    m = a1(m.modName) + (m.type ? "." + m.type : "") + ".js"; } else { m = a1(m) + ".js"; }
                j1(m);
                if (d !== false) { jQuery.sap.getObject(s, 1); }
                return this; };
            jQuery.sap.require = function(m, d) {
                if (arguments.length > 1) {
                    for (var i = 0; i < arguments.length; i++) { jQuery.sap.require(arguments[i]); }
                    return this; }
                if (typeof(m) === "object") { m = a1(m.modName) + (m.type ? "." + m.type : "") + ".js"; } else { m = a1(m) + ".js"; }
                jQuery.sap.measure.start(m, "Require module " + m, ["require"]);
                k1(m);
                jQuery.sap.measure.end(m);
                return this; };
            jQuery.sap._requirePath = function(m) { k1(m + ".js"); };
            window.sap = window.sap || {};
            sap.ui = sap.ui || {};
            sap.ui.define = function(m, d, i, j) {
                var s, l;
                if (typeof m === 'string') { s = m + '.js'; } else { j = i;
                    i = d;
                    d = m;
                    s = K[K.length - 1]; }
                m = b1(s);
                l = s.slice(0, s.lastIndexOf('/') + 1);
                if (!jQuery.isArray(d)) { j = i;
                    i = d;
                    d = []; }
                if (o.isLoggable()) { o.debug("define(" + s + ", " + "['" + d.join("','") + "']" + ")"); }
                var n1 = j1(s);
                m1(l, d, function(o1) {
                    if (o.isLoggable()) { o.debug("define(" + s + "): calling factory " + typeof i); }
                    if (j) {
                        var p1 = s.split('/').slice(0, -1).join('.');
                        if (p1) { jQuery.sap.getObject(p1, 0); } }
                    if (typeof i === 'function') { n1.content = i.apply(window, o1); } else { n1.content = i; }
                    if (j) {
                        if (n1.content == null) { o.error("module '" + s + "' returned no content, but should be exported"); } else {
                            if (o.isLoggable()) { o.debug("exporting content of '" + s + "': as global object"); }
                            jQuery.sap.setObject(m, n1.content); } } }); };
            sap.ui.predefine = function(m, d, i, j) {
                if (typeof m !== 'string') {
                    throw new Error("sap.ui.predefine requires a module name"); }
                var s = m + '.js';
                var l = M[s];
                if (!l) { M[s] = { state: v, url: "TODO???/" + m, data: [m, d, i, j], group: null }; }
                if (s.match(/\/library\.js$/)) { G[b1(s) + "-preload"] = true; } };
            sap.ui.require = function(d, i) {
                if (typeof d === 'string') {
                    var m = d + '.js',
                        j = M[m];
                    return j ? (j.content || jQuery.sap.getObject(b1(m))) : undefined; }
                m1(null, d, function(l) {
                    if (typeof i === 'function') { setTimeout(function() { i.apply(window, l); }, 0); } }); };
            jQuery.sap.preloadModules = function(s, d, i) {
                var j, l;
                if (G[s]) {
                    return; }
                G[s] = true;
                j = jQuery.sap.getModulePath(s, ".json");
                o.debug("preload file " + s);
                l = i && i.startTask("load " + s);
                jQuery.ajax({ dataType: "json", async: d, url: j, success: function(m) {
                        if (m) { m.url = j; }
                        jQuery.sap.registerPreloadedModules(m, d, i);
                        i && i.finishTask(l); }, error: function(m, n1, o1) { o.error("failed to preload '" + s + "': " + (o1 || n1));
                        i && i.finishTask(l, false); } }); };
            jQuery.sap.registerPreloadedModules = function(d, i, s) {
                var j = V(d.version || "1.0").compareTo("2.0") < 0;
                if (o.isLoggable()) { o.debug(N + "adding preloaded modules from '" + d.url + "'"); }
                if (d.name) { G[d.name] = true; }
                jQuery.each(d.modules, function(l, m) { l = j ? a1(l) + ".js" : l;
                    if (!M[l]) { M[l] = { state: v, url: d.url + "/" + l, data: m, group: d.name }; }
                    if (l.match(/\/library\.js$/)) { G[b1(l) + "-preload"] = true; } });
                if (d.dependencies) { jQuery.each(d.dependencies, function(l, m) { jQuery.sap.preloadModules(m, i, s); }); } };
            jQuery.sap.unloadResources = function(s, d, j, l) {
                var m = [];
                if (d == null) { d = true; }
                if (d) { jQuery.each(M, function(i, n1) {
                        if (n1 && n1.group === s) { m.push(i); } });
                    delete G[s]; } else {
                    if (M[s]) { m.push(s); } }
                jQuery.each(m, function(i, n1) {
                    var o1 = M[n1];
                    if (o1 && l && n1.match(/\.js$/)) { jQuery.sap.setObject(b1(n1), undefined); }
                    if (o1 && (j || o1.state === v)) { delete M[n1]; } }); };
            jQuery.sap.getResourceName = function(m, s) {
                return a1(m) + (s || ".js"); };
            jQuery.sap.loadResource = function(s, m) {
                var i, j, l, n1, o1;
                if (typeof s === "string") { m = m || {}; } else { m = s || {};
                    s = m.name;
                    if (!s && m.url) { s = d1(m.url); } }
                m = jQuery.extend({ failOnError: true, async: false }, m);
                i = m.dataType;
                if (i == null && s) { i = (i = Z.exec(s)) && i[1]; }
                o1 = m.async ? new jQuery.Deferred() : null;

                function p1(d, e) {
                    if (d == null && m.failOnError) { n1 = e || new Error("no data returned for " + s);
                        if (m.async) { o1.reject(n1);
                            jQuery.sap.log.error(n1); }
                        return null; }
                    if (m.async) { o1.resolve(d); }
                    return d; }

                function q1(d) {
                    var r1 = jQuery.ajaxSettings.converters["text " + i];
                    if (typeof r1 === "function") { d = r1(d); }
                    return p1(d); }
                if (s && M[s]) { j = M[s].data;
                    M[s].state = w; }
                if (j != null) {
                    if (m.async) { setTimeout(function() { q1(j); }, 0); } else { j = q1(j); } } else { jQuery.ajax({ url: l = m.url || c1(s), async: m.async, dataType: i, headers: m.headers, success: function(d, r1, s1) { j = p1(d); }, error: function(d, r1, s1) { n1 = new Error("resource " + s + " could not be loaded from " + l + ". Check for 'file not found' or parse errors. Reason: " + s1);
                            n1.status = r1;
                            n1.error = s1;
                            n1.statusCode = d.status;
                            j = p1(null, n1); } }); }
                if (m.async) {
                    return Promise.resolve(o1); }
                if (n1 != null && m.failOnError) {
                    throw n1; }
                return j; };
            jQuery.sap._loadJSResourceAsync = function(s, i) {
                return new Promise(function(d, j) {
                    var m = M[s] || (M[s] = { state: r });
                    var l = m.url = c1(s);
                    m.state = L;
                    var n1 = window.document.createElement('SCRIPT');
                    n1.src = l;
                    n1.setAttribute("data-sap-ui-module", s);
                    n1.addEventListener('load', function(e) { jQuery.sap.log.info("Javascript resource loaded: " + s);
                        m.state = R;
                        d(); });
                    n1.addEventListener('error', function(e) { jQuery.sap.log.error("failed to load Javascript resource: " + s);
                        m.state = D;
                        if (i) { d(); } else { j(); } });
                    t(n1); }); };
            return function() {
                var m = {};
                jQuery.each(U, function(s, d) { m[s] = d.url; });
                return { modules: M, prefixes: m }; }; }());

        function t(o) {
            var d = window.document.getElementsByTagName("head")[0];
            if (d) { d.appendChild(o); } }

        function u(U, i, l, d) {
            var s = window.document.createElement("script");
            s.src = U;
            s.type = "text/javascript";
            if (i) { s.id = i; }
            if (l) { jQuery(s).load(function() { l();
                    jQuery(s).off("load"); }); }
            if (d) { jQuery(s).error(function() { d();
                    jQuery(s).off("error"); }); }
            var o;
            if ((i && (o = jQuery.sap.domById(i)) && o.tagName === "SCRIPT")) { jQuery(o).remove(); }
            t(s); }
        jQuery.sap.includeScript = function includeScript(U, i, l, d) {
            var o = typeof U === "string" ? { url: U, id: i } : U;
            if (typeof U === "string") { u(o.url, o.id, l, d); } else {
                return new Promise(function(r, R) { u(o.url, o.id, r, R); }); } };
        var I;
        var x = jQuery.sap._mIEStyleSheets = {};

        function y(U, s, l, d) {
            var j = function(U, s, l, d) {
                var L = document.createElement("link");
                L.type = "text/css";
                L.rel = "stylesheet";
                L.href = U;
                if (s) { L.id = s; }
                var i = function() { jQuery(L).attr("data-sap-ui-ready", "false").off("error");
                    if (d) { d(); } };
                var n = function() { jQuery(L).attr("data-sap-ui-ready", "true").off("load");
                    if (l) { l(); } };
                if (!!sap.ui.Device.browser.internet_explorer) {
                    var r = n;
                    n = function(v) {
                        var R;
                        try { R = v.target && v.target.sheet && v.target.sheet.rules; } catch (w) {}
                        if (R && R.length > 0) { r(); } else { i(); } }; }
                jQuery(L).load(n);
                jQuery(L).error(i);
                return L; };
            var m = function(U, s, l, d) {
                if (sap.ui.Device.browser.internet_explorer && sap.ui.Device.browser.version <= 9 && document.styleSheets.length >= 28) {
                    var r = URI.parse(document.URL).path;
                    var n = new URI(U).absoluteTo(r).toString();
                    if (s) {
                        var v = x[s];
                        if (v && v.href === n) {
                            return; } }
                    jQuery.sap.log.warning("Stylesheet " + (s ? s + " " : "") + "not added as LINK because of IE limits", U, "jQuery.sap.includeStyleSheet");
                    if (!I) { I = document.createStyleSheet(); }
                    var w = false;
                    for (var i = 0; i < I.imports.length; i++) {
                        var B = I.imports[i];
                        if (B.imports.length < 30) { B.addImport(n);
                            w = true;
                            break; } }
                    if (!w) { I.addImport(n); }
                    if (s) { x[s] = { href: n }; }
                    var D = document.getElementById('sap-ui-core-customcss');
                    if (!jQuery.isEmptyObject(D)) { t(D); } } else {
                    var L = j(U, s, l, d);
                    if (jQuery('#sap-ui-core-customcss').length > 0) { jQuery('#sap-ui-core-customcss').first().before(jQuery(L)); } else { t(L); } } };
            var o = jQuery.sap.domById(s);
            if (o && o.tagName === "LINK" && o.rel === "stylesheet") {
                if (l || d || o.href !== URI(String(U), URI().search("")).toString()) { jQuery(o).replaceWith(j(U, s, l, d)); } } else { m(U, s, l, d); } }
        jQuery.sap.includeStyleSheet = function includeStyleSheet(U, i, l, d) {
            var o = typeof U === "string" ? { url: U, id: i } : U;
            if (typeof U === "string") { y(o.url, o.id, l, d); } else {
                return new Promise(function(r, R) { y(o.url, o.id, r, R); }); } };
        if (!(p.productive === true || p.productive === "true" || p.productive === "x")) { jQuery(function() { jQuery(document.body).keydown(function(e) {
                    if (e.keyCode == 80 && e.shiftKey && e.altKey && e.ctrlKey) {
                        try { jQuery.sap.require("sap.ui.debug.TechnicalInfo"); } catch (d) {
                            return; }
                        sap.ui.debug.TechnicalInfo.open(function() {
                            var i = q();
                            return { modules: i.modules, prefixes: i.prefixes, config: p }; }); } }); });
            jQuery(function() { jQuery(document.body).keydown(function(e) {
                    if (e.keyCode == 83 && e.shiftKey && e.altKey && e.ctrlKey) {
                        try { jQuery.sap.require("sap.ui.core.support.Support");
                            var s = sap.ui.core.support.Support.getStub();
                            if (s.getType() != sap.ui.core.support.Support.StubType.APPLICATION) {
                                return; }
                            s.openSupportTool(); } catch (d) {} } }); }); }
        if (!jQuery.support) { jQuery.support = {}; }
        jQuery.extend(jQuery.support, { touch: sap.ui.Device.support.touch });
        var P = ["Webkit", "ms", "Moz"];
        var z = document.documentElement.style;
        var A = function(d, j) {
            if (jQuery.support[d] === undefined) {
                if (z[j] !== undefined) { jQuery.support[d] = true;
                    if (j === "boxFlex" || j === "flexOrder" || j === "flexGrow") {
                        if (!sap.ui.Device.browser.chrome || sap.ui.Device.browser.version > 28) { jQuery.support.flexBoxPrefixed = false; } }
                    return; } else { j = j.charAt(0).toUpperCase() + j.slice(1);
                    for (var i in P) {
                        if (z[P[i] + j] !== undefined) { jQuery.support[d] = true;
                            return; } } }
                jQuery.support[d] = false; } };
        A("cssTransforms", "transform");
        A("cssTransforms3d", "perspective");
        A("cssTransitions", "transition");
        A("cssAnimations", "animationName");
        if (jQuery.support.cssGradients === undefined) {
            var E = document.createElement('div'),
                z = E.style;
            try { z.backgroundImage = "linear-gradient(left top, red, white)";
                z.backgroundImage = "-moz-linear-gradient(left top, red, white)";
                z.backgroundImage = "-webkit-linear-gradient(left top, red, white)";
                z.backgroundImage = "-ms-linear-gradient(left top, red, white)";
                z.backgroundImage = "-webkit-gradient(linear, left top, right bottom, from(red), to(white))"; } catch (e) {}
            jQuery.support.cssGradients = (z.backgroundImage && z.backgroundImage.indexOf("gradient") > -1);
            E = null; }
        jQuery.support.flexBoxPrefixed = true;
        A("flexBoxLayout", "boxFlex");
        A("newFlexBoxLayout", "flexGrow");
        if (!jQuery.support.newFlexBoxLayout && z.msFlexOrder !== undefined) { jQuery.support.ie10FlexBoxLayout = true; } else { jQuery.support.ie10FlexBoxLayout = false; }
        if (jQuery.support.flexBoxLayout || jQuery.support.newFlexBoxLayout || jQuery.support.ie10FlexBoxLayout) { jQuery.support.hasFlexBoxSupport = true; } else { jQuery.support.hasFlexBoxSupport = false; }
        var F = function(s) { this.mSettings = s || {};
            this.sMode = this.mSettings.mode || F.Mode.ALLOW;
            this.fnCallback = this.mSettings.callback;
            this.iTimeout = this.mSettings.timeout || 10000;
            this.bBlockEvents = this.mSettings.blockEvents !== false;
            this.bShowBlockLayer = this.mSettings.showBlockLayer !== false;
            this.bAllowSameOrigin = this.mSettings.allowSameOrigin !== false;
            this.sParentOrigin = '';
            this.bUnlocked = false;
            this.bRunnable = false;
            this.bParentUnlocked = false;
            this.bParentResponded = false;
            this.sStatus = "pending";
            this.aFPChilds = [];
            var d = this;
            this.iTimer = setTimeout(function() { d._callback(false); }, this.iTimeout);
            var H = function() { d._handlePostMessage.apply(d, arguments); };
            F.__window.addEventListener('message', H);
            if (F.__parent === F.__self || F.__parent == null || this.sMode === F.Mode.ALLOW) { this._applyState(true, true); } else { this._lock();
                if (this.sMode === F.Mode.DENY) { this._callback(false);
                    return; }
                if (this.bAllowSameOrigin) {
                    try {
                        var o = F.__parent;
                        var O = false;
                        var T = true;
                        do {
                            var i = o.document.domain;
                            if (o == F.__top) {
                                if (i != undefined) { O = true; }
                                break; }
                            o = o.parent; } while (T);
                        if (O) { this._applyState(true, true); } } catch (e) { this._sendRequireMessage(); } } else { this._sendRequireMessage(); } } };
        F.Mode = { TRUSTED: 'trusted', ALLOW: 'allow', DENY: 'deny' };
        F.__window = window;
        F.__parent = parent;
        F.__self = self;
        F.__top = top;
        F._events = ["mousedown", "mouseup", "click", "dblclick", "mouseover", "mouseout", "touchstart", "touchend", "touchmove", "touchcancel", "keydown", "keypress", "keyup"];
        F.prototype.match = function(s, d) {
            if (!(/\*/i.test(d))) {
                return s == d; } else { d = d.replace(/\//gi, "\\/");
                d = d.replace(/\./gi, "\\.");
                d = d.replace(/\*/gi, ".*");
                d = d.replace(/:\.\*$/gi, ":\\d*");
                if (d.substr(d.length - 1, 1) !== '$') { d = d + '$'; }
                if (d.substr(0, 1) !== '^') { d = '^' + d; }
                var r = new RegExp(d, 'i');
                return r.test(s); } };
        F._lockHandler = function(o) { o.stopPropagation();
            o.preventDefault(); };
        F.prototype._createBlockLayer = function() {
            if (document.readyState == "complete") {
                var l = document.createElement("div");
                l.style.position = "absolute";
                l.style.top = "0px";
                l.style.bottom = "0px";
                l.style.left = "0px";
                l.style.right = "0px";
                l.style.opacity = "0";
                l.style.backgroundColor = "white";
                l.style.zIndex = 2147483647;
                document.body.appendChild(l);
                this._lockDiv = l; } };
        F.prototype._setCursor = function() {
            if (this._lockDiv) { this._lockDiv.style.cursor = this.sStatus == "denied" ? "not-allowed" : "wait"; } };
        F.prototype._lock = function() {
            var d = this;
            if (this.bBlockEvents) {
                for (var i = 0; i < F._events.length; i++) { document.addEventListener(F._events[i], F._lockHandler, true); } }
            if (this.bShowBlockLayer) { this._blockLayer = function() { d._createBlockLayer();
                    d._setCursor(); };
                if (document.readyState == "complete") { this._blockLayer(); } else { document.addEventListener("readystatechange", this._blockLayer); } } };
        F.prototype._unlock = function() {
            if (this.bBlockEvents) {
                for (var i = 0; i < F._events.length; i++) { document.removeEventListener(F._events[i], F._lockHandler, true); } }
            if (this.bShowBlockLayer) { document.removeEventListener("readystatechange", this._blockLayer);
                if (this._lockDiv) { document.body.removeChild(this._lockDiv);
                    delete this._lockDiv; } } };
        F.prototype._callback = function(s) { this.sStatus = s ? "allowed" : "denied";
            this._setCursor();
            clearTimeout(this.iTimer);
            if (typeof this.fnCallback === 'function') { this.fnCallback.call(null, s); } };
        F.prototype._applyState = function(i, d) {
            if (this.bUnlocked) {
                return; }
            if (i) { this.bRunnable = true; }
            if (d) { this.bParentUnlocked = true; }
            if (!this.bRunnable || !this.bParentUnlocked) {
                return; }
            this._unlock();
            this._callback(true);
            this._notifyChildFrames();
            this.bUnlocked = true; };
        F.prototype._applyTrusted = function(T) {
            if (T) { this._applyState(true, false); } else { this._callback(false); } };
        F.prototype._check = function(d) {
            if (this.bRunnable) {
                return; }
            var T = false;
            if (this.bAllowSameOrigin && this.sParentOrigin && F.__window.document.URL.indexOf(this.sParentOrigin) == 0) { T = true; } else if (this.mSettings.whitelist && this.mSettings.whitelist.length != 0) {
                var H = this.sParentOrigin.split('//')[1];
                H = H.split(':')[0];
                for (var i = 0; i < this.mSettings.whitelist.length; i++) {
                    var m = H.indexOf(this.mSettings.whitelist[i]);
                    if (m != -1 && H.substring(m) == this.mSettings.whitelist[i]) { T = true;
                        break; } } }
            if (T) { this._applyTrusted(T); } else if (this.mSettings.whitelistService) {
                var j = this;
                var l = new XMLHttpRequest();
                var n = this.mSettings.whitelistService + '?parentOrigin=' + encodeURIComponent(this.sParentOrigin);
                l.onreadystatechange = function() {
                    if (l.readyState == 4) { j._handleXmlHttpResponse(l, d); } };
                l.open('GET', n, true);
                l.setRequestHeader('Accept', 'application/json');
                l.send(); } else { this._callback(false); } };
        F.prototype._handleXmlHttpResponse = function(d, i) {
            if (d.status === 200) {
                var T = false;
                var r = d.responseText;
                var R = JSON.parse(r);
                if (R.active == false) { this._applyState(true, true); } else if (i) {
                    return; } else {
                    if (this.match(this.sParentOrigin, R.origin)) { T = R.framing; }
                    this._applyTrusted(T); } } else { jQuery.sap.log.warning("The configured whitelist service is not available: " + d.status);
                this._callback(false); } };
        F.prototype._notifyChildFrames = function() {
            for (var i = 0; i < this.aFPChilds.length; i++) { this.aFPChilds[i].postMessage('SAPFrameProtection*parent-unlocked', '*'); } };
        F.prototype._sendRequireMessage = function() { F.__parent.postMessage('SAPFrameProtection*require-origin', '*');
            if (this.mSettings.whitelistService) { setTimeout(function() {
                    if (!this.bParentResponded) { this._check(true); } }.bind(this), 10); } };
        F.prototype._handlePostMessage = function(o) {
            var s = o.source,
                d = o.data;
            if (s === F.__self || s == null || typeof d !== "string" || d.indexOf("SAPFrameProtection*") === -1) {
                return; }
            if (s === F.__parent) { this.bParentResponded = true;
                if (!this.sParentOrigin) { this.sParentOrigin = o.origin;
                    this._check(); }
                if (d == "SAPFrameProtection*parent-unlocked") { this._applyState(false, true); } } else if (s.parent === F.__self && d == "SAPFrameProtection*require-origin" && this.bUnlocked) { s.postMessage("SAPFrameProtection*parent-unlocked", "*"); } else { s.postMessage("SAPFrameProtection*parent-origin", "*");
                this.aFPChilds.push(s); } };
        jQuery.sap.FrameOptions = F; }());
    jQuery.sap.globalEval = function() { "use strict";
        eval(arguments[0]); };
    jQuery.sap.declare('sap-ui-core');
    jQuery.sap.declare('sap.ui.thirdparty.es6-promise', false);
    jQuery.sap.declare('sap.ui.Device', false);
    jQuery.sap.declare('sap.ui.thirdparty.URI', false);
    jQuery.sap.declare('sap.ui.thirdparty.jquery', false);
    jQuery.sap.declare('sap.ui.thirdparty.jqueryui.jquery-ui-position', false);
    jQuery.sap.declare('jquery.sap.global', false);
    sap.ui.predefine('jquery.sap.act', ['jquery.sap.global'], function(q) { "use strict";
        if (typeof window.jQuery.sap.act === "object" || typeof window.jQuery.sap.act === "function") {
            return q; }
        var _ = {},
            a = true,
            b = null,
            c = 10000,
            d = !!window.addEventListener,
            e = [],
            f = false,
            g = null;

        function h() { b = null;
            if (f) { j();
                return; }
            a = false;
            g.observe(document.documentElement, { childList: true, attributes: true, subtree: true, characterData: true }); }

        function j() {
            if (document.hidden === true) {
                return; }
            if (!a) { a = true;
                k(e);
                g.disconnect(); }
            if (b) { f = true; } else { b = setTimeout(h, c);
                f = false; } }

        function k(l) {
            if (l.length == 0) {
                return; }
            var m = l.slice();
            setTimeout(function() {
                var I;
                for (var i = 0, L = m.length; i < L; i++) { I = m[i];
                    I.fFunction.call(I.oListener || window); } }, 0); }
        _.attachActivate = function(F, l) { e.push({ oListener: l, fFunction: F }); };
        _.detachActivate = function(F, l) {
            for (var i = 0, L = e.length; i < L; i++) {
                if (e[i].fFunction === F && e[i].oListener === l) { e.splice(i, 1);
                    break; } } };
        _.isActive = !d ? function() {
            return true; } : function() {
            return a; };
        _.refresh = !d ? function() {} : j;
        if (d) {
            var E = ["resize", "orientationchange", "mousemove", "mousedown", "mouseup", "paste", "cut", "keydown", "keyup", "DOMMouseScroll", "mousewheel"];
            if (!!('ontouchstart' in window)) { E.push("touchstart", "touchmove", "touchend", "touchcancel"); }
            for (var i = 0; i < E.length; i++) { window.addEventListener(E[i], _.refresh, true); }
            if (window.MutationObserver) { g = new window.MutationObserver(_.refresh); } else if (window.WebKitMutationObserver) { g = new window.WebKitMutationObserver(_.refresh); } else { g = { observe: function() { document.documentElement.addEventListener("DOMSubtreeModified", _.refresh); }, disconnect: function() { document.documentElement.removeEventListener("DOMSubtreeModified", _.refresh); } }; }
            if (typeof(document.hidden) === "boolean") { document.addEventListener("visibilitychange", function() {
                    if (document.hidden !== true) { _.refresh(); } }, false); }
            j(); }
        q.sap.act = _;
        return q; });
    sap.ui.predefine('jquery.sap.dom', ['jquery.sap.global', 'sap/ui/Device'], function(q, D) {
        "use strict";
        q.sap.domById = function domById(i, w) {
            return i ? (w || window).document.getElementById(i) : null; };
        q.sap.byId = function byId(i, C) {
            var e = "";
            if (i) { e = "#" + i.replace(/(:|\.)/g, '\\$1'); }
            return q(e, C); };
        q.sap.focus = function focus(d) {
            if (!d) {
                return; }
            try { d.focus(); } catch (e) {
                var i = (d && d.id) ? " (ID: '" + d.id + "')" : "";
                q.sap.log.warning("Error when trying to focus a DOM element" + i + ": " + e.message);
                return false; }
            return true; };
        q.fn.cursorPos = function cursorPos(P) {
            var l = arguments.length,
                t, L, T, s;
            T = this.prop("tagName");
            s = this.prop("type");
            if (this.length === 1 && ((T == "INPUT" && (s == "text" || s == "password" || s == "search")) || T == "TEXTAREA")) {
                var d = this.get(0);
                if (l > 0) {
                    if (typeof(d.selectionStart) == "number") { d.focus();
                        d.selectionStart = P;
                        d.selectionEnd = P; } else if (d.createTextRange) { t = d.createTextRange();
                        var m = d.value.length;
                        if (P < 0 || P > m) { P = m; }
                        if (t) { t.collapse();
                            t.moveEnd("character", P);
                            t.moveStart("character", P);
                            t.select(); } }
                    return this; } else {
                    if (typeof(d.selectionStart) == "number") {
                        return d.selectionStart; } else if (d.createTextRange) { t = window.document.selection.createRange();
                        var C = t.duplicate();
                        if (d.tagName == "TEXTAREA") { C.moveToElementText(d);
                            var o = C.duplicate();
                            L = C.text.length;
                            o.moveStart("character", L);
                            var S = 0;
                            if (o.inRange(t)) { S = L; } else {
                                var i = L;
                                while (L > 1) { i = Math.round(L / 2);
                                    S = S + i;
                                    o = C.duplicate();
                                    o.moveStart("character", S);
                                    if (o.inRange(t)) { L = L - i; } else { S = S - i;
                                        L = i; } } }
                            return S; } else if (C.parentElement() === d) { C.collapse();
                            var L = d.value.length;
                            C.moveStart('character', -L);
                            return C.text.length; } }
                    return -1; } } else {
                return this; } };
        q.fn.selectText = function selectText(s, E) {
            var d = this.get(0);
            try {
                if (typeof(d.selectionStart) === "number") { d.setSelectionRange(s, E); } else if (d.createTextRange) {
                    var t = d.createTextRange();
                    t.collapse();
                    t.moveStart('character', s);
                    t.moveEnd('character', E - s);
                    t.select(); } } catch (e) {}
            return this; };
        q.fn.getSelectedText = function() {
            var d = this.get(0);
            try {
                if (typeof d.selectionStart === "number") {
                    return d.value.substring(d.selectionStart, d.selectionEnd); }
                if (document.selection) {
                    return document.selection.createRange().text; } } catch (e) {}
            return ""; };
        q.fn.outerHTML = function outerHTML() {
            var d = this.get(0);
            if (d && d.outerHTML) {
                return q.trim(d.outerHTML); } else {
                var e = this[0] ? this[0].ownerDocument : document;
                var o = e.createElement("div");
                o.appendChild(d.cloneNode(true));
                return o.innerHTML; } };
        q.sap.containsOrEquals = function containsOrEquals(d, o) {
            if (o && d && o != document && o != window) {
                return (d === o) || q.contains(d, o); }
            return false; };
        q.fn.rect = function rect() {
            var d = this.get(0);
            if (d) {
                if (d.getBoundingClientRect) {
                    var C = d.getBoundingClientRect();
                    var r = { top: C.top, left: C.left, width: C.right - C.left, height: C.bottom - C.top };
                    var w = q.sap.ownerWindow(d);
                    r.left += q(w).scrollLeft();
                    r.top += q(w).scrollTop();
                    return r; } else {
                    return { top: 10, left: 10, width: d.offsetWidth, height: d.offsetWidth }; } }
            return null; };
        q.fn.rectContains = function rectContains(P, i) {
            var r = this.rect();
            if (r) {
                return P >= r.left && P <= r.left + r.width && i >= r.top && i <= r.top + r.height; }
            return false; };
        q.fn.hasTabIndex = function hasTabIndex() {
            var t = this.prop("tabIndex");
            if (this.attr("disabled") && !this.attr("tabindex")) { t = -1; }
            return !isNaN(t) && t >= 0; };
        q.fn.firstFocusableDomRef = function firstFocusableDomRef() {
            var C = this.get(0);
            var d = function(i) {
                return q(this).css("visibility") == "hidden"; };
            if (!C || q(C).is(':hidden') || q(C).filter(d).length == 1) {
                return null; }
            var o = C.firstChild,
                e = null;
            while (o) {
                if (o.nodeType == 1 && q(o).is(':visible')) {
                    if (q(o).hasTabIndex()) {
                        return o; }
                    if (o.childNodes) { e = q(o).firstFocusableDomRef();
                        if (e) {
                            return e; } } }
                o = o.nextSibling; }
            return null; };
        q.fn.lastFocusableDomRef = function lastFocusableDomRef() {
            var C = this.get(0);
            var d = function(i) {
                return q(this).css("visibility") == "hidden"; };
            if (!C || q(C).is(':hidden') || q(C).filter(d).length == 1) {
                return null; }
            var o = C.lastChild,
                e = null;
            while (o) {
                if (o.nodeType == 1 && q(o).is(':visible')) {
                    if (o.childNodes) { e = q(o).lastFocusableDomRef();
                        if (e) {
                            return e; } }
                    if (q(o).hasTabIndex()) {
                        return o; } }
                o = o.previousSibling; }
            return null; };
        q.fn.scrollLeftRTL = function scrollLeftRTL(P) {
            var d = this.get(0);
            if (d) {
                if (P === undefined) {
                    if (!!D.browser.internet_explorer || !!D.browser.edge) {
                        return d.scrollWidth - d.scrollLeft - d.clientWidth; } else if (!!D.browser.webkit) {
                        return d.scrollLeft; } else if (!!D.browser.firefox) {
                        return d.scrollWidth + d.scrollLeft - d.clientWidth; } else {
                        return d.scrollLeft; } } else { d.scrollLeft = q.sap.denormalizeScrollLeftRTL(P, d);
                    return this; } } };
        q.fn.scrollRightRTL = function scrollRightRTL() {
            var d = this.get(0);
            if (d) {
                if (!!D.browser.internet_explorer) {
                    return d.scrollLeft; } else if (!!D.browser.webkit) {
                    return d.scrollWidth - d.scrollLeft - d.clientWidth; } else if (!!D.browser.firefox) {
                    return (-d.scrollLeft); } else {
                    return d.scrollLeft; } } };
        q.sap.denormalizeScrollLeftRTL = function(n, d) {
            if (d) {
                if (!!D.browser.internet_explorer) {
                    return d.scrollWidth - d.clientWidth - n; } else if (!!D.browser.webkit) {
                    return n; } else if (!!D.browser.firefox) {
                    return d.clientWidth + n - d.scrollWidth; } else {
                    return n; } } };
        q.sap.denormalizeScrollBeginRTL = function(n, d) {
            if (d) {
                if (!!D.browser.internet_explorer) {
                    return n; } else if (!!D.browser.webkit) {
                    return d.scrollWidth - d.clientWidth - n; } else if (!!D.browser.firefox) {
                    return -n; } else {
                    return n; } } };
        /*
         * The following methods are taken from jQuery UI core but modified.
         *
         * jQuery UI Core
         * http://jqueryui.com
         *
         * Copyright 2014 jQuery Foundation and other contributors
         * Released under the MIT license.
         * http://jquery.org/license
         *
         * http://api.jqueryui.com/category/ui-core/
         */
        q.support.selectstart = "onselectstart" in document.createElement("div");
        q.fn.extend({ disableSelection: function() {
                return this.on((q.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(e) { e.preventDefault(); }); }, enableSelection: function() {
                return this.off(".ui-disableSelection"); } });
        /*!
         * The following functions are taken from jQuery UI 1.8.17 but modified
         *
         * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
         * Dual licensed under the MIT or GPL Version 2 licenses.
         * http://jquery.org/license
         *
         * http://docs.jquery.com/UI
         */
        function v(e) {
            var o = q(e).offsetParent();
            var O = false;
            var $ = q(e).parents().filter(function() {
                if (this === o) { O = true; }
                return O; });
            return !q(e).add($).filter(function() {
                return q.css(this, "visibility") === "hidden" || q.expr.filters.hidden(this); }).length; }

        function f(e, i) {
            var n = e.nodeName.toLowerCase();
            if (n === "area") {
                var m = e.parentNode,
                    d = m.name,
                    h;
                if (!e.href || !d || m.nodeName.toLowerCase() !== "map") {
                    return false; }
                h = q("img[usemap=#" + d + "]")[0];
                return !!h && v(h); }
            return (/input|select|textarea|button|object/.test(n) ? !e.disabled : n == "a" ? e.href || i : i) && v(e); }
        if (!q.expr[":"].focusable) {
            /*!
             * The following function is taken from jQuery UI 1.8.17
             *
             * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
             * Dual licensed under the MIT or GPL Version 2 licenses.
             * http://jquery.org/license
             *
             * http://docs.jquery.com/UI
             *
             * But since visible is modified, focusable is different too the jQuery UI version too.
             */
            q.extend(q.expr[":"], { focusable: function(e) {
                    return f(e, !isNaN(q.attr(e, "tabindex"))); } });
        }
        if (!q.expr[":"].sapTabbable) {
            /*!
             * The following function is taken from
             * jQuery UI Core 1.11.1
             * http://jqueryui.com
             *
             * Copyright 2014 jQuery Foundation and other contributors
             * Released under the MIT license.
             * http://jquery.org/license
             *
             * http://api.jqueryui.com/category/ui-core/
             */
            q.extend(q.expr[":"], { sapTabbable: function(e) {
                    var t = q.attr(e, "tabindex"),
                        i = isNaN(t);
                    return (i || t >= 0) && f(e, !i); } });
        }
        if (!q.expr[":"].sapFocusable) { q.extend(q.expr[":"], { sapFocusable: function(e) {
                    return f(e, !isNaN(q.attr(e, "tabindex"))); } }); }
        if (!q.fn.zIndex) { q.fn.zIndex = function(z) {
                if (z !== undefined) {
                    return this.css("zIndex", z); }
                if (this.length) {
                    var e = q(this[0]),
                        d, h;
                    while (e.length && e[0] !== document) { d = e.css("position");
                        if (d === "absolute" || d === "relative" || d === "fixed") { h = parseInt(e.css("zIndex"), 10);
                            if (!isNaN(h) && h !== 0) {
                                return h; } }
                        e = e.parent(); } }
                return 0; }; }
        q.fn.parentByAttribute = function parentByAttribute(A, V) {
            if (this.length > 0) {
                if (V) {
                    return this.first().parents("[" + A + "='" + V + "']").get(0); } else {
                    return this.first().parents("[" + A + "]").get(0); } } };
        q.sap.ownerWindow = function ownerWindow(d) {
            if (d.ownerDocument.parentWindow) {
                return d.ownerDocument.parentWindow; }
            return d.ownerDocument.defaultView; };
        var _ = {};
        q.sap.scrollbarSize = function(C, F) {
            if (typeof C === "boolean") { F = C;
                C = null; }
            var k = C || "#DEFAULT";
            if (F) {
                if (C) { delete _[C]; } else { _ = {}; } }
            if (_[k]) {
                return _[k]; }
            if (!document.body) {
                return { width: 0, height: 0 }; }
            var A = q("<DIV/>").css("visibility", "hidden").css("height", "0").css("width", "0").css("overflow", "hidden");
            if (C) { A.addClass(C); }
            A.prependTo(document.body);
            var d = q("<div style=\"visibility:visible;position:absolute;height:100px;width:100px;overflow:scroll;opacity:0;\"></div>");
            A.append(d);
            var o = d.get(0);
            var w = o.offsetWidth - o.scrollWidth;
            var h = o.offsetHeight - o.scrollHeight;
            A.remove();
            if (w === 0 || h === 0) {
                return { width: w, height: h }; }
            _[k] = { width: w, height: h };
            return _[k]; };
        var a;

        function g() {
            return a || (a = sap.ui.require('sap/ui/core/Control')); }
        q.sap.syncStyleClass = function(s, S, d) {
            if (!s) {
                return d; }
            var C = g();
            if (C && S instanceof C) { S = S.$(); } else if (typeof S === "string") { S = q.sap.byId(S); } else if (!(S instanceof q)) {
                return d; }
            var e = !!S.closest("." + s).length;
            if (d instanceof q) { d.toggleClass(s, e); } else if (C && d instanceof C) { d.toggleStyleClass(s, e); } else {}
            return d; };

        function b(A, V) {
            var s = this.attr(A);
            if (!s) {
                return this.attr(A, V); }
            var d = s.split(" ");
            if (d.indexOf(V) == -1) { d.push(V);
                this.attr(A, d.join(" ")); }
            return this; }

        function c(A, V) {
            var s = this.attr(A) || "",
                d = s.split(" "),
                i = d.indexOf(V);
            if (i == -1) {
                return this; }
            d.splice(i, 1);
            if (d.length) { this.attr(A, d.join(" ")); } else { this.removeAttr(A); }
            return this; }
        q.fn.addAriaLabelledBy = function(i) {
            return b.call(this, "aria-labelledby", i); };
        q.fn.removeAriaLabelledBy = function(i) {
            return c.call(this, "aria-labelledby", i); };
        q.fn.addAriaDescribedBy = function(i) {
            return b.call(this, "aria-describedby", i); };
        q.fn.removeAriaDescribedBy = function(i) {
            return c.call(this, "aria-describedby", i); };

        function p(o, n) {
            if (o.childElementCount != n.childElementCount || o.tagName != n.tagName) { o.parentNode.replaceChild(n, o);
                return false; }
            if (o.isEqualNode(n)) {
                return true; }
            var O = o.attributes;
            for (var i = 0, d = O.length; i < d; i++) {
                var A = O[i].name;
                if (n.getAttribute(A) === null) { o.removeAttribute(A);
                    d = d - 1;
                    i = i - 1; } }
            var N = n.attributes;
            for (var i = 0, d = N.length; i < d; i++) {
                var A = N[i].name,
                    e = o.getAttribute(A),
                    h = n.getAttribute(A);
                if (e === null || e !== h) { o.setAttribute(A, h); } }
            var j = n.childNodes.length;
            if (!j && !o.hasChildNodes()) {
                return true; }
            if (!n.childElementCount) {
                if (!j) { o.textContent = ""; } else if (j == 1 && n.firstChild.nodeType == 3) { o.textContent = n.textContent; } else { o.innerHTML = n.innerHTML; }
                return true; }
            for (var i = 0, r = 0, d = j; i < d; i++) {
                var k = o.childNodes[i],
                    l = n.childNodes[i - r];
                if (l.nodeType == 1) {
                    if (!p(k, l)) { r = r + 1; } } else { k.nodeValue = l.nodeValue; } }
            return true; }
        q.sap.replaceDOM = function(o, n, C) {
            var N;
            if (typeof n === "string") { N = q.parseHTML(n)[0]; } else { N = n; }
            if (C) { q.cleanData([o]);
                q.cleanData(o.getElementsByTagName("*")); }
            return p(o, N); };
        return q;
    });
    /*!
     * UI development toolkit for HTML5 (OpenUI5)
     * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
     * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
     */
    sap.ui.predefine('jquery.sap.encoder', ['jquery.sap.global'], function(q) { "use strict";

        function h(i, l) {
            var g = i.toString(16);
            if (l) {
                while (l > g.length) { g = "0" + g; } }
            return g; }
        var r = /[\x00-\x2b\x2f\x3a-\x40\x5b-\x5e\x60\x7b-\xff\u2028\u2029]/g,
            a = /[\x00-\x08\x0b\x0c\x0e-\x1f\x7f-\x9f]/,
            H = { "<": "&lt;", ">": "&gt;", "&": "&amp;", "\"": "&quot;" };
        var f = function(g) {
            var E = H[g];
            if (!E) {
                if (a.test(g)) { E = "&#xfffd;"; } else { E = "&#x" + h(g.charCodeAt(0)) + ";"; }
                H[g] = E; }
            return E; };
        q.sap.encodeHTML = function(S) {
            return S.replace(r, f); };
        q.sap.encodeXML = function(S) {
            return S.replace(r, f); };
        q.sap.escapeHTML = function(S) {
            return S.replace(r, f); };
        var b = /[\x00-\x2b\x2d\x2f\x3a-\x40\x5b-\x5e\x60\x7b-\xff\u2028\u2029]/g,
            j = {};
        var J = function(g) {
            var E = j[g];
            if (!E) {
                var i = g.charCodeAt(0);
                if (i < 256) { E = "\\x" + h(i, 2); } else { E = "\\u" + h(i, 4); }
                j[g] = E; }
            return E; };
        q.sap.encodeJS = function(S) {
            return S.replace(b, J); };
        q.sap.escapeJS = function(S) {
            return S.replace(b, J); };
        var c = /[\x00-\x2c\x2f\x3a-\x40\x5b-\x5e\x60\x7b-\uffff]/g,
            u = {};
        var U = function(g) {
            var E = u[g];
            if (!E) {
                var i = g.charCodeAt(0);
                if (i < 128) { E = "%" + h(i, 2); } else if (i < 2048) { E = "%" + h((i >> 6) | 192, 2) + "%" + h((i & 63) | 128, 2); } else { E = "%" + h((i >> 12) | 224, 2) + "%" + h(((i >> 6) & 63) | 128, 2) + "%" + h((i & 63) | 128, 2); }
                u[g] = E; }
            return E; };
        q.sap.encodeURL = function(S) {
            return S.replace(c, U); };
        q.sap.encodeURLParameters = function(p) {
            if (!p) {
                return ""; }
            var g = [];
            q.each(p, function(n, v) {
                if (q.type(v) === "string") { v = q.sap.encodeURL(v); }
                g.push(q.sap.encodeURL(n) + "=" + v); });
            return g.join("&"); };
        var d = /[\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\xff\u2028\u2029][0-9A-Fa-f]?/g;
        var C = function(g) {
            var i = g.charCodeAt(0);
            if (g.length == 1) {
                return "\\" + h(i); } else {
                return "\\" + h(i) + " " + g.substr(1); } };
        q.sap.encodeCSS = function(S) {
            return S.replace(d, C); };

        function W(p, g, i, k) {
            if (p) { this.protocol = p.toUpperCase(); }
            if (g) { this.host = g.toUpperCase(); }
            this.port = i;
            this.path = k; }
        var w = [];
        q.sap.clearUrlWhitelist = function() { w.splice(0, w.length); };
        q.sap.addUrlWhitelist = function(p, g, i, k) {
            var E = new W(p, g, i, k);
            var I = w.length;
            w[I] = E; };
        q.sap.removeUrlWhitelist = function(i) { w.splice(i, 1); };
        q.sap.getUrlWhitelist = function() {
            return w.slice(); };
        q.sap.validateUrl = function(g) {
            var k = /^(?:([^:\/?#]+):)?((?:\/\/([^\/?#:]*)(?::([0-9]+))?)?([^?#]*))(?:\?([^#]*))?(?:#(.*))?$/.exec(g);
            if (!k) {
                return false; }
            var p = k[1],
                B = k[2],
                l = k[3],
                P = k[4],
                m = k[5],
                Q = k[6],
                n = k[7];
            var o = /^([a-z0-9-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*$/i;
            var t = /^([a-z0-9-._~!$&'()*+,;=:@\/?]|%[0-9a-f]{2})*$/i;
            var v = t;
            var x = /^([a-z0-9!$'*+:^_`{|}~-]|%[0-9a-f]{2})+(?:\.([a-z0-9!$'*+:^_`{|}~-]|%[0-9a-f]{2})+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
            if (p) { p = p.toUpperCase();
                if (w.length <= 0) {
                    if (!/^(https?|ftp)/i.test(p)) {
                        return false; } } }
            if (l) { l = l.toUpperCase(); }
            if (m) {
                if (p === "MAILTO") {
                    var A = B.split(",");
                    for (var i = 0; i < A.length; i++) {
                        if (!x.test(A[i])) {
                            return false; } } } else {
                    var y = m.split("/");
                    for (var i = 0; i < y.length; i++) {
                        if (!o.test(y[i])) {
                            return false; } } } }
            if (Q) {
                if (!t.test(Q)) {
                    return false; } }
            if (n) {
                if (!v.test(n)) {
                    return false; } }
            if (w.length > 0) {
                var F = false;
                for (var i = 0; i < w.length; i++) {
                    if (!p || !w[i].protocol || p == w[i].protocol) {
                        var O = false;
                        if (l && w[i].host && /^\*/.test(w[i].host)) {
                            var z = w[i].host.slice(1).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
                            var D = RegExp(z + "$");
                            if (D.test(l)) { O = true; } } else if (!l || !w[i].host || l == w[i].host) { O = true; }
                        if (O) {
                            if ((!l && !P) || !w[i].port || P == w[i].port) {
                                if (w[i].path && /\*$/.test(w[i].path)) {
                                    var E = w[i].path.slice(0, -1).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
                                    var D = RegExp("^" + E);
                                    if (D.test(m)) { F = true; } } else if (!w[i].path || m == w[i].path) { F = true; } } } }
                    if (F) {
                        break; } }
                if (!F) {
                    return false; } }
            return true; };
        q.sap._sanitizeHTML = function(g, o) {
            return s(g, o || { uriRewriter: function(i) {
                    if (q.sap.validateUrl(i)) {
                        return i; } } }); };
        q.sap._setHTMLSanitizer = function(s) { s = s || e; };

        function e(g, o) {
            if (!window.html || !window.html.sanitize) { q.sap.require("sap.ui.thirdparty.caja-html-sanitizer"); }
            var t = o.tagPolicy || window.html.makeTagPolicy(o.uriRewriter, o.tokenPolicy);
            return window.html.sanitizeWithPolicy(g, t); }
        var s = e;
        return q; });
    sap.ui.predefine('jquery.sap.events', ['jquery.sap.global', 'sap/ui/Device', 'jquery.sap.keycodes', "sap/ui/thirdparty/jquery-mobile-custom"], function(q, D) { "use strict";
        var o, a, b, c, d, m, I = false;
        if (D.browser.webkit && /Mobile/.test(navigator.userAgent) && D.support.touch) { I = true;
            (function() {
                var e = window.document,
                    H = false,
                    T = null,
                    j = false,
                    S, z, i = 0;
                m = ["mousedown", "mouseover", "mouseup", "mouseout", "click"];
                var A = function(C, E) {
                    if (!H) {
                        return; }
                    var M = E.type == "touchend" ? E.changedTouches[0] : E.touches[0];
                    var F = e.createEvent('MouseEvent');
                    F.initMouseEvent(C, true, true, window, E.detail, M.screenX, M.screenY, M.clientX, M.clientY, E.ctrlKey, E.shiftKey, E.altKey, E.metaKey, E.button, E.relatedTarget);
                    F.isSynthetic = true;
                    window.setTimeout(function() { T.dispatchEvent(F); }, 0); };
                var B = function(E) {
                    return E.target.tagName.match(/input|textarea|select/i); };
                d = function(E) {
                    if (!E.isSynthetic && !B(E)) { E.stopPropagation();
                        E.preventDefault(); } };
                o = function(E) {
                    var C = E.touches,
                        F;
                    H = (C.length == 1 && !B(E));
                    j = false;
                    if (H) { F = C[0];
                        T = F.target;
                        if (T.nodeType === 3) { T = T.parentNode; }
                        S = F.clientX;
                        z = F.clientY;
                        A("mousedown", E); } };
                a = function(E) {
                    var C;
                    if (H) { C = E.touches[0];
                        if (Math.abs(C.clientX - S) > 10 || Math.abs(C.clientY - z) > 10) { j = true; }
                        if (j) { A("mousemove", E); } } };
                b = function(E) { A("mouseup", E);
                    if (!j) { A("click", E); } };
                c = function(E) { A("mouseup", E); };
                for (; i < m.length; i++) { e.addEventListener(m[i], d, true); }
                e.addEventListener('touchstart', o, true);
                e.addEventListener('touchmove', a, true);
                e.addEventListener('touchend', b, true);
                e.addEventListener('touchcancel', c, true);
                q.sap.disableTouchToMouseHandling = function() {
                    var i = 0;
                    if (!I) {
                        return; }
                    e.removeEventListener('touchstart', o, true);
                    e.removeEventListener('touchmove', a, true);
                    e.removeEventListener('touchend', b, true);
                    e.removeEventListener('touchcancel', c, true);
                    for (; i < m.length; i++) { e.removeEventListener(m[i], d, true); } }; }()); }
        if (!q.sap.disableTouchToMouseHandling) { q.sap.disableTouchToMouseHandling = function() {}; }
        q.sap.ControlEvents = ["click", "dblclick", "contextmenu", "focusin", "focusout", "keydown", "keypress", "keyup", "mousedown", "mouseout", "mouseover", "mouseup", "select", "selectstart", "dragstart", "dragenter", "dragover", "dragleave", "dragend", "drop", "paste", "cut", "input"];
        if (D.support.touch) { q.sap.ControlEvents.push("touchstart", "touchend", "touchmove", "touchcancel"); }
        q.sap.PseudoEvents = { sapdown: { sName: "sapdown", aTypes: ["keydown"], fnCheck: function(e) {
                    return e.keyCode == q.sap.KeyCodes.ARROW_DOWN && !k(e); } }, sapdownmodifiers: { sName: "sapdownmodifiers", aTypes: ["keydown"], fnCheck: function(e) {
                    return e.keyCode == q.sap.KeyCodes.ARROW_DOWN && k(e); } }, sapshow: { sName: "sapshow", aTypes: ["keydown"], fnCheck: function(e) {
                    return (e.keyCode == q.sap.KeyCodes.F4 && !k(e)) || (e.keyCode == q.sap.KeyCodes.ARROW_DOWN && h(e, false, true, false)); } }, sapup: { sName: "sapup", aTypes: ["keydown"], fnCheck: function(e) {
                    return e.keyCode == q.sap.KeyCodes.ARROW_UP && !k(e); } }, sapupmodifiers: { sName: "sapupmodifiers", aTypes: ["keydown"], fnCheck: function(e) {
                    return e.keyCode == q.sap.KeyCodes.ARROW_UP && k(e); } }, saphide: { sName: "saphide", aTypes: ["keydown"], fnCheck: function(e) {
                    return e.keyCode == q.sap.KeyCodes.ARROW_UP && h(e, false, true, false); } }, sapleft: { sName: "sapleft", aTypes: ["keydown"], fnCheck: function(e) {
                    return e.keyCode == q.sap.KeyCodes.ARROW_LEFT && !k(e); } }, sapleftmodifiers: { sName: "sapleftmodifiers", aTypes: ["keydown"], fnCheck: function(e) {
                    return e.keyCode == q.sap.KeyCodes.ARROW_LEFT && k(e); } }, sapright: { sName: "sapright", aTypes: ["keydown"], fnCheck: function(e) {
                    return e.keyCode == q.sap.KeyCodes.ARROW_RIGHT && !k(e); } }, saprightmodifiers: { sName: "saprightmodifiers", aTypes: ["keydown"], fnCheck: function(e) {
                    return e.keyCode == q.sap.KeyCodes.ARROW_RIGHT && k(e); } }, saphome: { sName: "saphome", aTypes: ["keydown"], fnCheck: function(e) {
                    return e.keyCode == q.sap.KeyCodes.HOME && !k(e); } }, saphomemodifiers: { sName: "saphomemodifiers", aTypes: ["keydown"], fnCheck: function(e) {
                    return e.keyCode == q.sap.KeyCodes.HOME && k(e); } }, saptop: { sName: "saptop", aTypes: ["keydown"], fnCheck: function(e) {
                    return e.keyCode == q.sap.KeyCodes.HOME && h(e, true, false, false); } }, sapend: { sName: "sapend", aTypes: ["keydown"], fnCheck: function(e) {
                    return e.keyCode == q.sap.KeyCodes.END && !k(e); } }, sapendmodifiers: { sName: "sapendmodifiers", aTypes: ["keydown"], fnCheck: function(e) {
                    return e.keyCode == q.sap.KeyCodes.END && k(e); } }, sapbottom: { sName: "sapbottom", aTypes: ["keydown"], fnCheck: function(e) {
                    return e.keyCode == q.sap.KeyCodes.END && h(e, true, false, false); } }, sappageup: { sName: "sappageup", aTypes: ["keydown"], fnCheck: function(e) {
                    return e.keyCode == q.sap.KeyCodes.PAGE_UP && !k(e); } }, sappageupmodifiers: { sName: "sappageupmodifiers", aTypes: ["keydown"], fnCheck: function(e) {
                    return e.keyCode == q.sap.KeyCodes.PAGE_UP && k(e); } }, sappagedown: { sName: "sappagedown", aTypes: ["keydown"], fnCheck: function(e) {
                    return e.keyCode == q.sap.KeyCodes.PAGE_DOWN && !k(e); } }, sappagedownmodifiers: { sName: "sappagedownmodifiers", aTypes: ["keydown"], fnCheck: function(e) {
                    return e.keyCode == q.sap.KeyCodes.PAGE_DOWN && k(e); } }, sapselect: { sName: "sapselect", aTypes: ["keydown"], fnCheck: function(e) {
                    return (e.keyCode == q.sap.KeyCodes.ENTER || e.keyCode == q.sap.KeyCodes.SPACE) && !k(e); } }, sapselectmodifiers: { sName: "sapselectmodifiers", aTypes: ["keydown"], fnCheck: function(e) {
                    return (e.keyCode == q.sap.KeyCodes.ENTER || e.keyCode == q.sap.KeyCodes.SPACE) && k(e); } }, sapspace: { sName: "sapspace", aTypes: ["keydown"], fnCheck: function(e) {
                    return e.keyCode == q.sap.KeyCodes.SPACE && !k(e); } }, sapspacemodifiers: { sName: "sapspacemodifiers", aTypes: ["keydown"], fnCheck: function(e) {
                    return e.keyCode == q.sap.KeyCodes.SPACE && k(e); } }, sapenter: { sName: "sapenter", aTypes: ["keydown"], fnCheck: function(e) {
                    return e.keyCode == q.sap.KeyCodes.ENTER && !k(e); } }, sapentermodifiers: { sName: "sapentermodifiers", aTypes: ["keydown"], fnCheck: function(e) {
                    return e.keyCode == q.sap.KeyCodes.ENTER && k(e); } }, sapbackspace: { sName: "sapbackspace", aTypes: ["keydown"], fnCheck: function(e) {
                    return e.keyCode == q.sap.KeyCodes.BACKSPACE && !k(e); } }, sapbackspacemodifiers: { sName: "sapbackspacemodifiers", aTypes: ["keydown"], fnCheck: function(e) {
                    return e.keyCode == q.sap.KeyCodes.BACKSPACE && k(e); } }, sapdelete: { sName: "sapdelete", aTypes: ["keydown"], fnCheck: function(e) {
                    return e.keyCode == q.sap.KeyCodes.DELETE && !k(e); } }, sapdeletemodifiers: { sName: "sapdeletemodifiers", aTypes: ["keydown"], fnCheck: function(e) {
                    return e.keyCode == q.sap.KeyCodes.DELETE && k(e); } }, sapexpand: { sName: "sapexpand", aTypes: ["keydown"], fnCheck: function(e) {
                    return e.keyCode == q.sap.KeyCodes.NUMPAD_PLUS && !k(e); } }, sapexpandmodifiers: { sName: "sapexpandmodifiers", aTypes: ["keydown"], fnCheck: function(e) {
                    return e.keyCode == q.sap.KeyCodes.NUMPAD_PLUS && k(e); } }, sapcollapse: { sName: "sapcollapse", aTypes: ["keydown"], fnCheck: function(e) {
                    return e.keyCode == q.sap.KeyCodes.NUMPAD_MINUS && !k(e); } }, sapcollapsemodifiers: { sName: "sapcollapsemodifiers", aTypes: ["keydown"], fnCheck: function(e) {
                    return e.keyCode == q.sap.KeyCodes.NUMPAD_MINUS && k(e); } }, sapcollapseall: { sName: "sapcollapseall", aTypes: ["keydown"], fnCheck: function(e) {
                    return e.keyCode == q.sap.KeyCodes.NUMPAD_ASTERISK && !k(e); } }, sapescape: { sName: "sapescape", aTypes: ["keydown"], fnCheck: function(e) {
                    return e.keyCode == q.sap.KeyCodes.ESCAPE && !k(e); } }, saptabnext: { sName: "saptabnext", aTypes: ["keydown"], fnCheck: function(e) {
                    return e.keyCode == q.sap.KeyCodes.TAB && !k(e); } }, saptabprevious: { sName: "saptabprevious", aTypes: ["keydown"], fnCheck: function(e) {
                    return e.keyCode == q.sap.KeyCodes.TAB && h(e, false, false, true); } }, sapskipforward: { sName: "sapskipforward", aTypes: ["keydown"], fnCheck: function(e) {
                    return e.keyCode == q.sap.KeyCodes.F6 && !k(e); } }, sapskipback: { sName: "sapskipback", aTypes: ["keydown"], fnCheck: function(e) {
                    return e.keyCode == q.sap.KeyCodes.F6 && h(e, false, false, true); } }, sapdecrease: { sName: "sapdecrease", aTypes: ["keydown"], fnCheck: function(e) {
                    var R = sap.ui.getCore().getConfiguration().getRTL();
                    var i = R ? q.sap.KeyCodes.ARROW_RIGHT : q.sap.KeyCodes.ARROW_LEFT;
                    return (e.keyCode == i || e.keyCode == q.sap.KeyCodes.ARROW_DOWN) && !k(e); } }, sapminus: { sName: "sapminus", aTypes: ["keypress"], fnCheck: function(e) {
                    var C = String.fromCharCode(e.which);
                    return C == '-'; } }, sapdecreasemodifiers: { sName: "sapdecreasemodifiers", aTypes: ["keydown"], fnCheck: function(e) {
                    var R = sap.ui.getCore().getConfiguration().getRTL();
                    var i = R ? q.sap.KeyCodes.ARROW_RIGHT : q.sap.KeyCodes.ARROW_LEFT;
                    return (e.keyCode == i || e.keyCode == q.sap.KeyCodes.ARROW_DOWN) && k(e); } }, sapincrease: { sName: "sapincrease", aTypes: ["keydown"], fnCheck: function(e) {
                    var R = sap.ui.getCore().getConfiguration().getRTL();
                    var N = R ? q.sap.KeyCodes.ARROW_LEFT : q.sap.KeyCodes.ARROW_RIGHT;
                    return (e.keyCode == N || e.keyCode == q.sap.KeyCodes.ARROW_UP) && !k(e); } }, sapplus: { sName: "sapplus", aTypes: ["keypress"], fnCheck: function(e) {
                    var C = String.fromCharCode(e.which);
                    return C == '+'; } }, sapincreasemodifiers: { sName: "sapincreasemodifiers", aTypes: ["keydown"], fnCheck: function(e) {
                    var R = sap.ui.getCore().getConfiguration().getRTL();
                    var N = R ? q.sap.KeyCodes.ARROW_LEFT : q.sap.KeyCodes.ARROW_RIGHT;
                    return (e.keyCode == N || e.keyCode == q.sap.KeyCodes.ARROW_UP) && k(e); } }, sapprevious: { sName: "sapprevious", aTypes: ["keydown"], fnCheck: function(e) {
                    var R = sap.ui.getCore().getConfiguration().getRTL();
                    var i = R ? q.sap.KeyCodes.ARROW_RIGHT : q.sap.KeyCodes.ARROW_LEFT;
                    return (e.keyCode == i || e.keyCode == q.sap.KeyCodes.ARROW_UP) && !k(e); } }, sappreviousmodifiers: { sName: "sappreviousmodifiers", aTypes: ["keydown"], fnCheck: function(e) {
                    var R = sap.ui.getCore().getConfiguration().getRTL();
                    var i = R ? q.sap.KeyCodes.ARROW_RIGHT : q.sap.KeyCodes.ARROW_LEFT;
                    return (e.keyCode == i || e.keyCode == q.sap.KeyCodes.ARROW_UP) && k(e); } }, sapnext: { sName: "sapnext", aTypes: ["keydown"], fnCheck: function(e) {
                    var R = sap.ui.getCore().getConfiguration().getRTL();
                    var N = R ? q.sap.KeyCodes.ARROW_LEFT : q.sap.KeyCodes.ARROW_RIGHT;
                    return (e.keyCode == N || e.keyCode == q.sap.KeyCodes.ARROW_DOWN) && !k(e); } }, sapnextmodifiers: { sName: "sapnextmodifiers", aTypes: ["keydown"], fnCheck: function(e) {
                    var R = sap.ui.getCore().getConfiguration().getRTL();
                    var N = R ? q.sap.KeyCodes.ARROW_LEFT : q.sap.KeyCodes.ARROW_RIGHT;
                    return (e.keyCode == N || e.keyCode == q.sap.KeyCodes.ARROW_DOWN) && k(e); } }, sapdelayeddoubleclick: { sName: "sapdelayeddoubleclick", aTypes: ["click"], fnCheck: function(e) {
                    var i = q(e.target);
                    var j = e.timeStamp;
                    var z = i.data("sapdelayeddoubleclick_lastClickTimestamp");
                    var A = z || 0;
                    i.data("sapdelayeddoubleclick_lastClickTimestamp", j);
                    var B = j - A;
                    return (B >= 300 && B <= 1300); } } };
        var P = ["sapdown", "sapdownmodifiers", "sapshow", "sapup", "sapupmodifiers", "saphide", "sapleft", "sapleftmodifiers", "sapright", "saprightmodifiers", "saphome", "saphomemodifiers", "saptop", "sapend", "sapendmodifiers", "sapbottom", "sappageup", "sappageupmodifiers", "sappagedown", "sappagedownmodifiers", "sapselect", "sapselectmodifiers", "sapspace", "sapspacemodifiers", "sapenter", "sapentermodifiers", "sapexpand", "sapbackspace", "sapbackspacemodifiers", "sapdelete", "sapdeletemodifiers", "sapexpandmodifiers", "sapcollapse", "sapcollapsemodifiers", "sapcollapseall", "sapescape", "saptabnext", "saptabprevious", "sapskipforward", "sapskipback", "sapprevious", "sappreviousmodifiers", "sapnext", "sapnextmodifiers", "sapdecrease", "sapminus", "sapdecreasemodifiers", "sapincrease", "sapplus", "sapincreasemodifiers", "sapdelayeddoubleclick"];
        (function initTouchEventSupport() { q.sap.touchEventMode = "SIM";
            var A = [];
            var e = [];
            if (D.support.touch) { q.sap.touchEventMode = "ON";
                q.event.props.push("touches", "targetTouches", "changedTouches"); }
            var j = function(H, J, K) {
                var N = "__" + H + "Handler";
                var Q = "sap" + H;
                A.push(Q);
                e.push({ sName: H, aTypes: [Q], fnCheck: function(R) {
                        return true; } });
                q.event.special[Q] = { add: function(R) {
                        var U = this,
                            $ = q(this),
                            V = { domRef: U, eventName: H, sapEventName: Q, eventHandle: R };
                        var W = function(X) { K(X, V); };
                        R.__sapSimulatedEventHandler = W;
                        for (var i = 0; i < J.length; i++) { $.on(J[i], W); } }, remove: function(R) {
                        var $ = q(this);
                        var K = R.__sapSimulatedEventHandler;
                        $.removeData(N + R.guid);
                        for (var i = 0; i < J.length; i++) { q.event.remove(this, J[i], K); } } }; };
            var M = function(H, J) {
                var $ = q(J.domRef);
                if (H.isMarked("delayedMouseEvent")) {
                    return; }
                if (!(H.type != "mouseout" || (H.type === "mouseout" && q.sap.checkMouseEnterOrLeave(H, J.domRef)))) {
                    var K = true;
                    var N = $.data("__touchstart_control");
                    if (N) {
                        var Q = q.sap.domById(N);
                        if (Q && q.sap.checkMouseEnterOrLeave(H, Q)) { K = false; } }
                    if (K) {
                        return; } }
                var R = q.event.fix(H.originalEvent || H);
                R.type = J.sapEventName;
                if (R.isMarked("firstUIArea")) { R.setMark("handledByUIArea", false); }
                var U = [{ identifier: 1, pageX: R.pageX, pageY: R.pageY, clientX: R.clientX, clientY: R.clientY, screenX: R.screenX, screenY: R.screenY, target: R.target, radiusX: 1, radiusY: 1, rotationAngle: 0 }];
                switch (J.eventName) {
                    case "touchstart":
                    case "touchmove":
                        R.touches = R.changedTouches = R.targetTouches = U;
                        break;
                    case "touchend":
                        R.changedTouches = U;
                        R.touches = R.targetTouches = [];
                        break; }
                if (J.eventName === "touchstart" || $.data("__touch_in_progress")) { $.data("__touch_in_progress", "X");
                    var V = q.fn.control ? q(H.target).control(0) : null;
                    if (V) { $.data("__touchstart_control", V.getId()); }
                    if (H.type === "mouseout") { R.setMarked("fromMouseout"); }
                    J.eventHandle.handler.call(J.domRef, R);
                    if (J.eventName === "touchend" && !R.isMarked("fromMouseout")) { $.removeData("__touch_in_progress");
                        $.removeData("__touchstart_control"); } } };
            if (!(D.support.pointer && D.support.touch)) { j("touchstart", ["mousedown"], M);
                j("touchend", ["mouseup", "mouseout"], M);
                j("touchmove", ["mousemove"], M); }
            if (D.support.touch && !(D.os.windows_phone && D.os.version < 10)) {
                var F = false,
                    z = q.vmouse.moveDistanceThreshold,
                    S, B, O, C, L;
                var E = function(H, J, K) {
                    var N = q.event.fix(H.originalEvent || H);
                    N.type = J.sapEventName;
                    delete N.touches;
                    delete N.changedTouches;
                    delete N.targetTouches;
                    N.screenX = K.screenX;
                    N.screenY = K.screenY;
                    N.clientX = K.clientX;
                    N.clientY = K.clientY;
                    N.ctrlKey = K.ctrlKey;
                    N.altKey = K.altKey;
                    N.shiftKey = K.shiftKey;
                    N.button = 0;
                    return N; };
                var T = function(H, J) {
                    if (H.isMarked("handledByTouchToMouse")) {
                        return; }
                    H.setMarked("handledByTouchToMouse");
                    if (!F) {
                        var K = H.originalEvent.touches[0];
                        F = (Math.abs(K.pageX - S) > z || Math.abs(K.pageY - B) > z); }
                    if (D.os.blackberry) {
                        if (L && H.timeStamp - L < 50) {
                            return; }
                        L = H.timeStamp; }
                    var N = E(H, J, H.touches[0]);
                    q.sap.delayedCall(0, this, function() { N.setMark("handledByUIArea", false);
                        J.eventHandle.handler.call(J.domRef, N); }); };
                var G = function(H, J) {
                    if (H.isMarked("handledByTouchToMouse")) {
                        return; }
                    H.setMarked("handledByTouchToMouse");
                    var N, K, Q;

                    function R() {
                        return E(H, J, J.eventName === "mouseup" ? H.changedTouches[0] : H.touches[0]); }
                    if (H.type === "touchstart") {
                        var U = H.originalEvent.touches[0];
                        F = false;
                        L = 0;
                        S = U.pageX;
                        B = U.pageY;
                        O = Math.round(U.pageX - q(H.target).offset().left);
                        C = Math.round(U.pageY - q(H.target).offset().top);
                        N = R();
                        q.sap.delayedCall(0, this, function() { N.setMark("handledByUIArea", false);
                            J.eventHandle.handler.call(J.domRef, N); }); } else if (H.type === "touchend") { K = R();
                        Q = !F;
                        q.sap.delayedCall(0, this, function() { K.setMark("handledByUIArea", false);
                            J.eventHandle.handler.call(J.domRef, K);
                            if (Q) { K.type = "click";
                                K.getPseudoTypes = q.Event.prototype.getPseudoTypes;
                                K.setMark("handledByUIArea", false);
                                K.offsetX = O;
                                K.offsetY = C;
                                J.eventHandle.handler.call(J.domRef, K); } }); } };
                q.sap.disableTouchToMouseHandling();
                j("mousedown", ["touchstart"], G);
                j("mousemove", ["touchmove"], T);
                j("mouseup", ["touchend", "touchcancel"], G); }
            A.push("swipe", "tap", "swipeleft", "swiperight", "scrollstart", "scrollstop");
            e.push({ sName: "swipebegin", aTypes: ["swipeleft", "swiperight"], fnCheck: function(H) {
                    var R = sap.ui.getCore().getConfiguration().getRTL();
                    return (R && H.type === "swiperight") || (!R && H.type === "swipeleft"); } });
            e.push({ sName: "swipeend", aTypes: ["swipeleft", "swiperight"], fnCheck: function(H) {
                    var R = sap.ui.getCore().getConfiguration().getRTL();
                    return (!R && H.type === "swiperight") || (R && H.type === "swipeleft"); } });
            if (q.sap.Version(q.fn.jquery).compareTo("1.9.1") < 0) { q.sap.ControlEvents = q.sap.ControlEvents.concat(A); } else { q.sap.ControlEvents = A.concat(q.sap.ControlEvents); }
            for (var i = 0; i < e.length; i++) { q.sap.PseudoEvents[e[i].sName] = e[i];
                P.push(e[i].sName); } }());

        function f() {
            var e = q.sap.PseudoEvents,
                R = [];
            for (var N in e) {
                if (e[N].aTypes) {
                    for (var j = 0, i = e[N].aTypes.length; j < i; j++) {
                        var T = e[N].aTypes[j];
                        if (q.inArray(T, R) == -1) { R.push(T); } } } }
            return R; }
        var g = f();

        function h(e, C, A, S) {
            return e.shiftKey == S && e.altKey == A && l(e) == C; }

        function k(e) {
            return e.shiftKey || e.altKey || l(e); }

        function l(e) {
            return !!(e.metaKey || e.ctrlKey); }
        q.Event.prototype.getPseudoTypes = function() {
            var e = [];
            if (q.inArray(this.type, g) != -1) {
                var j = P;
                var z = j.length;
                var A = null;
                for (var i = 0; i < z; i++) { A = q.sap.PseudoEvents[j[i]];
                    if (A.aTypes && q.inArray(this.type, A.aTypes) > -1 && A.fnCheck && A.fnCheck(this)) { e.push(A.sName); } } }
            this.getPseudoTypes = function() {
                return e.slice(); };
            return e.slice(); };
        q.Event.prototype.isPseudoType = function(T) {
            var e = this.getPseudoTypes();
            if (T) {
                return q.inArray(T, e) > -1; } else {
                return e.length > 0; } };
        q.sap.bindAnyEvent = function bindAnyEvent(C) {
            if (C) { q(document).bind(q.sap.ControlEvents.join(" "), C); } };
        q.sap.unbindAnyEvent = function unbindAnyEvent(C) {
            if (C) { q(document).unbind(q.sap.ControlEvents.join(" "), C); } };
        q.sap.checkMouseEnterOrLeave = function checkMouseEnterOrLeave(E, i) {
            if (E.type != "mouseover" && E.type != "mouseout") {
                return false; }
            var j = false;
            var z = i;
            var A = E.relatedTarget;
            try {
                while (A && A !== z) { A = A.parentNode; }
                if (A !== z) { j = true; } } catch (e) {}
            return j; };
        q.sap.isSpecialKey = function(e) {
            var K = q.sap.KeyCodes,
                i = e.which,
                S = n(e) || p(e) || (i >= 33 && i <= 36) || (i >= 44 && i <= 46) || (i >= 112 && i <= 123) || (i === K.BREAK) || (i === K.BACKSPACE) || (i === K.TAB) || (i === K.ENTER) || (i === K.ESCAPE) || (i === K.SCROLL_LOCK);
            switch (e.type) {
                case "keydown":
                case "keyup":
                    return S;
                case "keypress":
                    return (i === 0 || i === K.BACKSPACE || i === K.ESCAPE || i === K.ENTER) || false;
                default:
                    return false; } };

        function n(e) {
            var K = q.sap.KeyCodes,
                i = e.which;
            return (i === K.SHIFT) || (i === K.CONTROL) || (i === K.ALT) || (i === K.CAPS_LOCK) || (i === K.NUM_LOCK); }

        function p(e) {
            var K = e.which,
                A = (K >= 37 && K <= 40);
            switch (e.type) {
                case "keydown":
                case "keyup":
                    return A;
                case "keypress":
                    return K === 0;
                default:
                    return false; } }
        q.Event.prototype.getOffsetX = function() {
            if (this.type == 'click') {
                if (this.offsetX) {
                    return this.offsetX; }
                if (this.layerX) {
                    return this.layerX; }
                if (this.originalEvent.layerX) {
                    return this.originalEvent.layerX; } }
            return 0; };
        q.Event.prototype.getOffsetY = function() {
            if (this.type == 'click') {
                if (this.offsetY) {
                    return this.offsetY; }
                if (this.layerY) {
                    return this.layerY; }
                if (this.originalEvent.layerY) {
                    return this.originalEvent.layerY; } }
            return 0; };
        var s = q.Event.prototype.stopImmediatePropagation;
        q.Event.prototype.stopImmediatePropagation = function(S) { s.apply(this, arguments);
            if (S) { this._bIsStopHandlers = true; } };
        q.Event.prototype.isImmediateHandlerPropagationStopped = function() {
            return !!this._bIsStopHandlers; };
        q.Event.prototype.setMark = function(K, V) { K = K || "handledByControl";
            V = arguments.length < 2 ? true : V;
            (this.originalEvent || this)["_sapui_" + K] = V; };
        q.Event.prototype.setMarked = q.Event.prototype.setMark;
        q.Event.prototype.isMarked = function(K) { K = K || "handledByControl";
            return !!(this.originalEvent || this)["_sapui_" + K]; };
        q.sap._FASTNAVIGATIONKEY = "sap-ui-fastnavgroup";

        function r(R) {
            var G = q(R).closest('[data-sap-ui-customfastnavgroup="true"]');
            return G[0]; }

        function t(R) {
            var G = r(R);
            if (G) {
                return G; }
            var $ = q(R).closest('[data-' + q.sap._FASTNAVIGATIONKEY + '="true"]');
            return $[0]; }

        function u(R, S, N) {
            var $ = q(R),
                A, T;
            if (N) { A = q.merge($.find("*"), q.merge($.nextAll(), $.parents().nextAll()));
                T = A.find(':sapTabbable').addBack(':sapTabbable'); } else { A = q.merge($.prevAll(), $.parents().prevAll());
                T = q.merge($.parents(':sapTabbable'), A.find(':sapTabbable').addBack(':sapTabbable')); }
            var T = q.unique(T);
            return T.filter(function() {
                return w(S, this); }); }

        function v(R, S) {
            var e = q.sap.domById("sap-ui-static");
            if (!e) {
                return R; }
            var j = [];
            for (var i = 0; i < S.length; i++) {
                if (q.contains(e, S[i])) { j.push(S[i]); } }
            return R.filter(function() {
                if (j.length && w(j, this)) {
                    return true; }
                return !q.contains(e, this); }); }

        function w(C, R) {
            for (var i = 0; i < C.length; i++) {
                if (C[i] === R || q.contains(C[i], R)) {
                    return true; } }
            return false; }

        function x(F, T, S, e) {
            var G, $;
            for (var i = T.length - 1; i >= 0; i--) { G = t(T[i]);
                if (G != S) {
                    if (e) { S = G;
                        e = false; } else { $ = q(T[i + 1]);
                        break; } } }
            if (!$ && !e) { $ = F; }
            return $; }

        function y(S, e, F) {
            if (!e || e.length == 0) { e = [document]; }
            if (!w(e, S)) {
                return; }
            var j = t(S),
                A = v(q(e).find(':sapTabbable').addBack(':sapTabbable'), e),
                $ = A.first(),
                T = v(u(S, e, F), e),
                G, z;
            if (F) {
                for (var i = 0; i < T.length; i++) { G = t(T[i]);
                    if (G != j) { z = q(T[i]);
                        break; } }
                if (!z || !z.length) { z = $; } } else { z = x($, T, j, true);
                if (!z || !z.length) {
                    if (A.length == 1) { z = q(A[0]); } else if (A.length > 1) { j = t(A.eq(-1));
                        G = t(A.eq(-2));
                        if (j != G) { z = A.eq(-1); } else { z = x($, A, j, false); } } } }
            if (z && z.length) {
                var B = z[0],
                    E = null,
                    C = r(B);
                if (C && C.id) {
                    var H = sap.ui.getCore().byId(C.id);
                    if (H) { E = q.Event("BeforeFastNavigationFocus");
                        E.target = B;
                        E.source = S;
                        E.forward = F;
                        H._handleEvent(E); } }
                if (!E || !E.isDefaultPrevented()) { q.sap.focus(B); } } }
        q.sap.handleF6GroupNavigation = function(e, S) {
            if (e.type != "keydown" || e.keyCode != q.sap.KeyCodes.F6 || e.isMarked("sapui5_handledF6GroupNavigation") || e.isMarked() || e.isDefaultPrevented()) {
                return; }
            e.setMark("sapui5_handledF6GroupNavigation");
            e.setMarked();
            e.preventDefault();
            if (S && S.skip) {
                return; }
            var T = S && S.target ? S.target : document.activeElement,
                i = null;
            if (S && S.scope) { i = q.isArray(S.scope) ? S.scope : [S.scope]; }
            y(T, i, !e.shiftKey); };
        q(function() { q(document).on("keydown", function(e) { q.sap.handleF6GroupNavigation(e, null); }); });
        q.sap._refreshMouseEventDelayedFlag = function() { q.sap.isMouseEventDelayed = !!(D.browser.mobile && !((D.os.ios && D.os.version >= 8 && D.browser.safari && !D.browser.webview) || (D.browser.chrome && !/SAMSUNG/.test(navigator.userAgent) && D.browser.version >= 32))); };
        q.sap._refreshMouseEventDelayedFlag();
        return q; });
    sap.ui.predefine('jquery.sap.keycodes', ['jquery.sap.global'], function(q) { "use strict";
        q.sap.KeyCodes = { BACKSPACE: 8, TAB: 9, ENTER: 13, SHIFT: 16, CONTROL: 17, ALT: 18, BREAK: 19, CAPS_LOCK: 20, ESCAPE: 27, SPACE: 32, PAGE_UP: 33, PAGE_DOWN: 34, END: 35, HOME: 36, ARROW_LEFT: 37, ARROW_UP: 38, ARROW_RIGHT: 39, ARROW_DOWN: 40, PRINT: 44, INSERT: 45, DELETE: 46, DIGIT_0: 48, DIGIT_1: 49, DIGIT_2: 50, DIGIT_3: 51, DIGIT_4: 52, DIGIT_5: 53, DIGIT_6: 54, DIGIT_7: 55, DIGIT_8: 56, DIGIT_9: 57, A: 65, B: 66, C: 67, D: 68, E: 69, F: 70, G: 71, H: 72, I: 73, J: 74, K: 75, L: 76, M: 77, N: 78, O: 79, P: 80, Q: 81, R: 82, S: 83, T: 84, U: 85, V: 86, W: 87, X: 88, Y: 89, Z: 90, WINDOWS: 91, CONTEXT_MENU: 93, TURN_OFF: 94, SLEEP: 95, NUMPAD_0: 96, NUMPAD_1: 97, NUMPAD_2: 98, NUMPAD_3: 99, NUMPAD_4: 100, NUMPAD_5: 101, NUMPAD_6: 102, NUMPAD_7: 103, NUMPAD_8: 104, NUMPAD_9: 105, NUMPAD_ASTERISK: 106, NUMPAD_PLUS: 107, NUMPAD_MINUS: 109, NUMPAD_COMMA: 110, NUMPAD_SLASH: 111, F1: 112, F2: 113, F3: 114, F4: 115, F5: 116, F6: 117, F7: 118, F8: 119, F9: 120, F10: 121, F11: 122, F12: 123, NUM_LOCK: 144, SCROLL_LOCK: 145, OPEN_BRACKET: 186, PLUS: 187, COMMA: 188, SLASH: 189, DOT: 190, PIPE: 191, SEMICOLON: 192, MINUS: 219, GREAT_ACCENT: 220, EQUALS: 221, SINGLE_QUOTE: 222, BACKSLASH: 226 };
        return q; });
    sap.ui.predefine('jquery.sap.mobile', ['jquery.sap.global', 'sap/ui/Device', 'jquery.sap.dom', 'jquery.sap.events'], function(q, D) { "use strict";
        (function($) {
            var F = /(?:\?|&)sap-ui-xx-fakeOS=([^&]+)/;
            $.sap.simulateMobileOnDesktop = false;
            if ((D.browser.webkit || (D.browser.msie && D.browser.version >= 10)) && !q.support.touch) {
                var r = document.location.search.match(F);
                var a = r && r[1] || q.sap.byId("sap-ui-bootstrap").attr("data-sap-ui-xx-fakeOS");
                if (a) { $.sap.simulateMobileOnDesktop = true;
                    var u = { ios: "Mozilla/5.0 (iPhone; CPU iPhone OS 5_0_1 like Mac OS X) AppleWebKit/534.48 (KHTML, like Gecko) Version/5.1 Mobile/9A406 Safari/7534.48.3", iphone: "Mozilla/5.0 (iPhone; CPU iPhone OS 5_0_1 like Mac OS X) AppleWebKit/534.48 (KHTML, like Gecko) Version/5.1 Mobile/9A406 Safari/7534.48.3", ipad: "Mozilla/5.0 (iPad; CPU OS 5_1_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Mobile/9B206", android: "Mozilla/5.0 (Linux; U; Android 4.0.3; en-us; GT-I9100 Build/IML74K) AppleWebKit/534.46 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.46", android_phone: "Mozilla/5.0 (Linux; U; Android 4.0.3; en-us; GT-I9100 Build/IML74K) AppleWebKit/534.46 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.46", android_tablet: "Mozilla/5.0 (Linux; Android 4.1.2; Nexus 7 Build/JZ054K) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Safari/535.19", blackberry: "Mozilla/5.0 (BB10; Touch) AppleWebKit/537.10+ (KHTML, like Gecko) Version/10.0.9.2372 Mobile Safari/537.10+", winphone: "Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 920)" }[a];
                    if (u && (D.browser.webkit && a !== "winphone" || D.browser.msie && a === "winphone")) {
                        if (D.browser.safari) {
                            var _ = window.navigator;
                            window.navigator = {};
                            window.navigator.__proto__ = _;
                            window.navigator.__defineGetter__('userAgent', function() {
                                return u; }); } else { Object.defineProperty(navigator, "userAgent", { get: function() {
                                    return u; } }); }
                        if (D.browser.webkit) { q.browser.msie = q.browser.opera = q.browser.mozilla = false;
                            q.browser.webkit = true;
                            q.browser.version = "534.46"; }
                        D._update($.sap.simulateMobileOnDesktop); } } }
            $.os = $.extend({ os: D.os.name, version: D.os.versionStr, fVersion: D.os.version }, $.os);
            $.os[D.os.name] = true;
            $.extend($.support, { retina: window.devicePixelRatio >= 2 });
            $.device = $.extend({}, $.device);
            $.device.is = $.extend({ standalone: window.navigator.standalone, landscape: D.orientation.landscape, portrait: D.orientation.portrait, iphone: D.os.ios && D.system.phone, ipad: D.os.ios && D.system.tablet, android_phone: D.system.phone && D.os.android, android_tablet: D.system.tablet && D.os.android, tablet: D.system.tablet, phone: D.system.phone, desktop: D.system.desktop }, $.device.is);
            if (D.os.windows_phone) {
                var t;
                t = document.createElement("meta");
                t.setAttribute("name", "msapplication-tap-highlight");
                t.setAttribute("content", "no");
                document.head.appendChild(t);
                t = document.createElement("style");
                t.appendChild(document.createTextNode('@-ms-viewport{width:device-width;}'));
                document.head.appendChild(t); }
            var b = false;
            $.sap.initMobile = function(o) {
                var c = $("head");
                if (!b) { b = true;
                    o = $.extend({}, { viewport: true, statusBar: "default", hideBrowser: true, preventScroll: true, preventPhoneNumberDetection: true, useFullScreenHeight: true, homeIconPrecomposed: false, mobileWebAppCapable: "default" }, o);
                    if (D.os.ios && o.preventPhoneNumberDetection) { c.append($('<meta name="format-detection" content="telephone=no">')); } else if (D.browser.msie) { c.append($('<meta http-equiv="cleartype" content="on">'));
                        c.append($('<meta name="msapplication-tap-highlight" content="no">')); }
                    var i = D.os.ios && D.os.version >= 7 && D.os.version < 8 && D.browser.name === "sf";
                    if (o.viewport) {
                        var m;
                        if (i && D.system.phone) { m = 'minimal-ui, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'; } else if (i && D.system.tablet) { m = 'initial-scale=1.0, maximum-scale=1.0, user-scalable=no'; } else if ($.device.is.iphone && (Math.max(window.screen.height, window.screen.width) === 568)) { m = "user-scalable=0, initial-scale=1.0"; } else if (D.os.android && D.os.version < 3) { m = "width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"; } else { m = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"; }
                        c.append($('<meta name="viewport" content="' + m + '">')); }
                    if (o.mobileWebAppCapable === "default") {
                        if (D.os.ios) { c.append($('<meta name="apple-mobile-web-app-capable" content="yes">')); } } else { $.sap.setMobileWebAppCapable(o.mobileWebAppCapable); }
                    if (D.os.ios) { c.append($('<meta name="apple-mobile-web-app-status-bar-style" content="' + o.statusBar + '">')); }
                    if (o.preventScroll && !sap.ui.Device.os.blackberry) { $(window).bind("touchmove", function sapInitMobileTouchMoveHandle(e) {
                            if (!e.isMarked()) { e.preventDefault(); } }); }
                    if (o.useFullScreenHeight) { $(function() { document.documentElement.style.height = "100%"; }); } }
                if (o && o.homeIcon) {
                    var I;
                    if (typeof o.homeIcon === "string") { I = { phone: o.homeIcon }; } else { I = $.extend({}, o.homeIcon); }
                    I.precomposed = o.homeIconPrecomposed || I.precomposed;
                    I.favicon = o.homeIcon.icon || I.favicon;
                    I.icon = undefined;
                    $.sap.setIcons(I); } };
            $.sap.setIcons = function(i) {
                if (!i || (typeof i !== "object")) { $.sap.log.warning("Call to jQuery.sap.setIcons() has been ignored because there were no icons given or the argument was not an object.");
                    return; }
                var c = $("head"),
                    p = i.precomposed ? "-precomposed" : "",
                    g = function(h) {
                        return i[h] || i['tablet@2'] || i['phone@2'] || i['phone'] || i['tablet']; },
                    s = { "phone": "", "tablet": "76x76", "phone@2": "120x120", "tablet@2": "152x152" };
                if (i["favicon"]) {
                    var d = c.find("[rel^=shortcut]");
                    d.each(function() {
                        if (this.rel === "shortcut icon") { $(this).remove(); } });
                    c.append($('<link rel="shortcut icon" href="' + i["favicon"] + '" />')); }
                if (g("phone")) { c.find("[rel=apple-touch-icon]").remove();
                    c.find("[rel=apple-touch-icon-precomposed]").remove(); }
                for (var e in s) { i[e] = i[e] || g(e);
                    if (i[e]) {
                        var f = s[e];
                        c.append($('<link rel="apple-touch-icon' + p + '" ' + (f ? 'sizes="' + f + '"' : "") + ' href="' + i[e] + '" />')); } } };
            $.sap.setMobileWebAppCapable = function(v) {
                if (!D.system.tablet && !D.system.phone) {
                    return; }
                var h = $("head"),
                    p = ["", "apple"],
                    n = "mobile-web-app-capable",
                    c = v ? "yes" : "no",
                    i, N, w;
                for (i = 0; i < p.length; i++) { N = p[i] ? (p[i] + "-" + n) : n;
                    w = h.children('meta[name="' + N + '"]');
                    if (w.length) { w.attr("content", c); } else { h.append($('<meta name="' + N + '" content="' + c + '">')); } } }; })(q);
        return q; });
    sap.ui.predefine('jquery.sap.properties', ['jquery.sap.global', 'jquery.sap.sjax'], function(q) { "use strict";
        var P = function() { this.mProperties = {};
            this.aKeys = []; };
        P.prototype.getProperty = function(k, d) {
            var v = this.mProperties[k];
            if (typeof(v) == "string") {
                return v; } else if (d) {
                return d; }
            return null; };
        P.prototype.getKeys = function() {
            return this.aKeys; };
        P.prototype.setProperty = function(k, v) {
            if (typeof(v) != "string") {
                return; }
            if (typeof(this.mProperties[k]) != "string") { this.aKeys.push(k); }
            this.mProperties[k] = v; };
        P.prototype.clone = function() {
            var c = new P();
            c.mProperties = q.extend({}, this.mProperties);
            c.aKeys = q.merge([], this.aKeys);
            return c; };
        var r = /(?:\r\n|\r|\n|^)[ \t\f]*/;
        var a = /(\\u[0-9a-fA-F]{0,4})|(\\.)|(\\$)|([ \t\f]*[ \t\f:=][ \t\f]*)/g;
        var E = { '\\f': '\f', '\\n': '\n', '\\r': '\r', '\\t': '\t' };

        function p(t, o) {
            var l = t.split(r),
                L, k, v, K, i, m, b;
            o.mProperties = {};
            o.aKeys = [];
            for (i = 0; i < l.length; i++) { L = l[i];
                if (L === "" || L.charAt(0) === "#" || L.charAt(0) === "!") {
                    continue; }
                a.lastIndex = b = 0;
                v = "";
                K = true;
                while ((m = a.exec(L)) !== null) {
                    if (b < m.index) { v += L.slice(b, m.index); }
                    b = a.lastIndex;
                    if (m[1]) {
                        if (m[1].length !== 6) {
                            throw new Error("Incomplete Unicode Escape '" + m[1] + "'"); }
                        v += String.fromCharCode(parseInt(m[1].slice(2), 16)); } else if (m[2]) { v += E[m[2]] || m[2].slice(1); } else if (m[3]) { L = l[++i];
                        a.lastIndex = b = 0; } else if (m[4]) {
                        if (K) { K = false;
                            k = v;
                            v = ""; } else { v += m[4]; } } }
                if (b < L.length) { v += L.slice(b); }
                if (K) { k = v;
                    v = ""; }
                o.aKeys.push(k);
                o.mProperties[k] = v; }
            q.sap.unique(o.aKeys); }
        q.sap.properties = function properties(m) { m = q.extend({ url: undefined, headers: {} }, m);
            var A = !!m.async,
                o = new P();

            function _(t) {
                if (typeof(t) == "string") { p(t, o); } }

            function b() {
                var R;
                if (typeof(m.url) == "string") { R = q.sap.loadResource({ url: m.url, dataType: 'text', headers: m.headers, failOnError: false, async: A }); }
                return R; }
            if (A) {
                return new window.Promise(function(c, d) {
                    var R = b();
                    if (!R) { c(o);
                        return; }
                    R.then(function(v) {
                        try { _(v);
                            c(o); } catch (e) { d(e); } }, function(v) { d(v instanceof Error ? v : new Error("Problem during loading of property file '" + m.url + "': " + v)); }); }); } else { _(b());
                return o; } };
        return q; });
    sap.ui.predefine('jquery.sap.resources', ['jquery.sap.global', 'jquery.sap.properties', 'jquery.sap.strings'], function(q) { "use strict";
        var r = /^((?:[A-Z]{2,3}(?:-[A-Z]{3}){0,3})|[A-Z]{4}|[A-Z]{5,8})(?:-([A-Z]{4}))?(?:-([A-Z]{2}|[0-9]{3}))?((?:-[0-9A-Z]{5,8}|-[0-9][0-9A-Z]{3})*)((?:-[0-9A-WYZ](?:-[0-9A-Z]{2,8})+)*)(?:-(X(?:-[0-9A-Z]{1,8})+))?$/i;
        var M = { "he": "iw", "yi": "ji", "id": "in", "sr": "sh" };
        var a = { "iw": "he", "ji": "yi", "in": "id", "sn": "sr" };
        var b = { "en_US_saptrc": "1Q", "en_US_sappsd": "2Q" };
        var c = /(?:^|-)(saptrc|sappsd)(?:-|$)/i;

        function n(L) {
            var m;
            if (typeof L === 'string' && (m = r.exec(L.replace(/_/g, '-')))) {
                var h = m[1].toLowerCase();
                h = M[h] || h;
                var S = m[2] ? m[2].toLowerCase() : undefined;
                var R = m[3] ? m[3].toUpperCase() : undefined;
                var V = m[4] ? m[4].slice(1) : undefined;
                var p = m[6];
                if ((p && (m = c.exec(p))) || (V && (m = c.exec(V)))) {
                    return "en_US_" + m[1].toLowerCase(); }
                if (h === "zh" && !R) {
                    if (S === "hans") { R = "CN"; } else if (S === "hant") { R = "TW"; } }
                return h + (R ? "_" + R + (V ? "_" + V.replace("-", "_") : "") : ""); } }

        function d() {
            var L;
            if (window.sap && sap.ui && sap.ui.getCore) { L = sap.ui.getCore().getConfiguration().getLanguage();
                L = n(L); }
            return L || "en"; }

        function e(L) {
            var m;
            if (typeof L === 'string' && (m = r.exec(L.replace(/_/g, '-')))) {
                var h = m[1].toLowerCase();
                h = a[h] || h;
                return h + (m[3] ? "-" + m[3].toUpperCase() + (m[4] ? "-" + m[4].slice(1).replace("_", "-") : "") : ""); } }
        var f = /^((?:[^?#]*\/)?[^\/?#]*)(\.[^.\/?#]+)((?:\?([^#]*))?(?:#(.*))?)$/;
        var v = [".properties", ".hdbtextbundle"];

        function s(u) {
            var m = f.exec(u);
            return m && { url: u, prefix: m[1], ext: m[2], query: m[4], hash: (m[5] || ""), suffix: m[2] + (m[3] || "") }; }
        var B = function(u, L, i, A) { this.sLocale = n(L) || d();
            this.oUrlInfo = s(u);
            if (!this.oUrlInfo || q.inArray(this.oUrlInfo.ext, v) < 0) {
                throw new Error("resource URL '" + u + "' has unknown type (should be one of " + v.join(",") + ")"); }
            this.bIncludeInfo = i;
            this.aCustomBundles = [];
            this.aPropertyFiles = [];
            this.aLocales = [];
            var p = l(this, this.sLocale, A);
            if (A) { this._promise = p; } };
        B.prototype = {};
        B.prototype._enhance = function(C) {
            if (C && C instanceof B) { this.aCustomBundles.push(C); } else { q.sap.log.error("Custom ResourceBundle is either undefined or not an instanceof jQuery.sap.util.ResourceBundle. Therefore this custom ResourceBundle will be ignored!"); } };
        B.prototype.getText = function(k, A, C) {
            var V = null,
                i;
            for (i = this.aCustomBundles.length - 1; i >= 0; i--) { V = this.aCustomBundles[i].getText(k, A, true);
                if (V != null) {
                    return V; } }
            for (i = 0; i < this.aPropertyFiles.length; i++) { V = this.aPropertyFiles[i].getProperty(k);
                if (typeof(V) === "string") {
                    break; } }
            if (typeof(V) !== "string") {
                var t = this.aLocales[0];
                while (t.length > 0) {
                    if (t == "zh_HK") { t = "zh_TW"; } else {
                        var p = t.lastIndexOf('_');
                        if (p >= 0) { t = t.substring(0, p); } else if (t != "en") { t = "en"; } else { t = ""; } }
                    var P = l(this, t);
                    if (P == null) {
                        continue; }
                    V = P.getProperty(k);
                    if (typeof(V) === "string") {
                        break; } } }
            if (!C && typeof(V) !== "string") { V = k; }
            if (typeof(V) === "string") {
                if (A) { V = q.sap.formatMessage(V, A); }
                if (this.bIncludeInfo) { V = new String(V);
                    V.originInfo = { source: "Resource Bundle", url: this.oUrlInfo.url, locale: this.sLocale, key: k }; } }
            return V; };
        B.prototype.hasText = function(k) {
            return this.aPropertyFiles.length > 0 && typeof this.aPropertyFiles[0].getProperty(k) === "string"; };

        function l(o, L, A) {
            var u = o.oUrlInfo,
                U, R, p, P;
            if (q.inArray(L, o.aLocales) == -1) {
                if (g(L)) {
                    switch (u.ext) {
                        case '.hdbtextbundle':
                            if (b[L]) { U = u.prefix + u.suffix + '?' + (u.query ? u.query + "&" : "") + "sap-language=" + b[L] + (u.hash ? "#" + u.hash : ""); } else { U = u.url; }
                            R = { url: U, headers: { "Accept-Language": e(L) || "" } };
                            break;
                        default:
                            R = { url: u.prefix + (L ? "_" + L : "") + u.suffix };
                            break; }
                    if (A) { R.async = true;
                        P = Promise.resolve(q.sap.properties(R)); } else { p = q.sap.properties(R); } } else { p = { getProperty: function() {
                            return undefined; } };
                    if (A) { P = Promise.resolve(p); } }
                if (A) { P.then(function(h) { o.aPropertyFiles.push(h);
                        o.aLocales.push(L); });
                    return P; } else { o.aPropertyFiles.push(p);
                    o.aLocales.push(L);
                    return p; } }
            return A ? Promise.resolve(null) : null; }

        function g(L) {
            var h = window.sap && sap.ui && sap.ui.getCore && sap.ui.getCore().getConfiguration().getSupportedLanguages();
            if (h && h.length > 0) {
                return q.inArray(L, h) >= 0; }
            return true; }
        q.sap.resources = function resources(p) { p = q.extend({ url: "", locale: undefined, includeInfo: false }, p);
            var A = !!p.async;
            var o = new B(p.url, p.locale, p.includeInfo, A);
            if (A) {
                return new Promise(function(h, i) {
                    function _() { h(o);
                        delete o._promise; }
                    o._promise.then(_, _); }); } else {
                return o; } };
        q.sap.resources.isBundle = function(o) {
            return o && o instanceof B; };
        q.sap.resources._getFallbackLocales = function(L, S) {
            var t = n(L),
                h = [];

            function i(L) {
                return !S || S.length === 0 || q.inArray(L, S) >= 0; }
            while (t) {
                if (i(t)) { h.push(t); }
                if (t === "zh_HK") { t = "zh_TW"; } else {
                    var p = t.lastIndexOf('_');
                    if (p > 0) { t = t.slice(0, p); } else if (t !== "en") { t = "en"; } else { t = ""; } } }
            if (i("")) { h.push(""); }
            return h; };
        return q; });
    sap.ui.predefine('jquery.sap.script', ['jquery.sap.global'], function(q) { "use strict";
        var I = 0;
        q.sap.uid = function uid() {
            return "id-" + new Date().valueOf() + "-" + I++; };
        q.sap.delayedCall = function delayedCall(d, o, m, p) {
            return setTimeout(function() {
                if (q.type(m) == "string") { m = o[m]; }
                m.apply(o, p || []); }, d); };
        q.sap.clearDelayedCall = function clearDelayedCall(d) { clearTimeout(d);
            return this; };
        q.sap.intervalCall = function intervalCall(i, o, m, p) {
            return setInterval(function() {
                if (q.type(m) == "string") { m = o[m]; }
                m.apply(o, p || []); }, i); };
        q.sap.clearIntervalCall = function clearIntervalCall(i) { clearInterval(i);
            return this; };
        var U = function(u) { this.mParams = {};
            var Q = u || window.location.href;
            if (Q.indexOf('#') >= 0) { Q = Q.slice(0, Q.indexOf('#')); }
            if (Q.indexOf("?") >= 0) { Q = Q.slice(Q.indexOf("?") + 1);
                var p = Q.split("&"),
                    P = {},
                    a, n, v;
                for (var i = 0; i < p.length; i++) { a = p[i].split("=");
                    n = decodeURIComponent(a[0]);
                    v = a.length > 1 ? decodeURIComponent(a[1].replace(/\+/g, ' ')) : "";
                    if (n) {
                        if (!Object.prototype.hasOwnProperty.call(P, n)) { P[n] = []; }
                        P[n].push(v); } }
                this.mParams = P; } };
        U.prototype = {};
        U.prototype.get = function(n, a) {
            var v = Object.prototype.hasOwnProperty.call(this.mParams, n) ? this.mParams[n] : [];
            return a === true ? v : (v[0] || null); };
        q.sap.getUriParameters = function getUriParameters(u) {
            return new U(u); };
        q.sap.unique = function(a) {
            var l = a.length;
            if (l > 1) { a.sort();
                var j = 0;
                for (var i = 1; i < l; i++) {
                    if (a[i] !== a[j]) { a[++j] = a[i]; } }
                if (++j < l) { a.splice(j, l - j); } }
            return a; };
        q.sap.equal = function(a, b, m, c, d) {
            if (typeof m == "boolean") { c = m;
                m = undefined; }
            if (!d) { d = 0; }
            if (!m) { m = 10; }
            if (d > m) {
                return false; }
            if (a === b) {
                return true; }
            if (q.isArray(a) && q.isArray(b)) {
                if (!c) {
                    if (a.length != b.length) {
                        return false; } } else {
                    if (a.length > b.length) {
                        return false; } }
                for (var i = 0; i < a.length; i++) {
                    if (!q.sap.equal(a[i], b[i], m, c, d + 1)) {
                        return false; } }
                return true; }
            if (typeof a == "object" && typeof b == "object") {
                if (!a || !b) {
                    return false; }
                if (a.constructor != b.constructor) {
                    return false; }
                if (a.nodeName && b.nodeName && a.namespaceURI && b.namespaceURI) {
                    return q.sap.isEqualNode(a, b); }
                if (a instanceof Date) {
                    return a.valueOf() == b.valueOf(); }
                for (var i in a) {
                    if (!q.sap.equal(a[i], b[i], m, c, d + 1)) {
                        return false; } }
                if (!c) {
                    for (var i in b) {
                        if (a[i] === undefined) {
                            return false; } } }
                return true; }
            return false; };
        q.sap.each = function(o, c) {
            var a = q.isArray(o),
                l, i;
            if (a) {
                for (i = 0, l = o.length; i < l; i++) {
                    if (c.call(o[i], i, o[i]) === false) {
                        break; } } } else {
                for (i in o) {
                    if (c.call(o[i], i, o[i]) === false) {
                        break; } } }
            return o; };
        q.sap.forIn = { toString: null }.propertyIsEnumerable("toString") ? function(o, c) {
            for (var n in o) {
                if (c(n, o[n]) === false) {
                    return; } } } : (function() {
            var D = ["toString", "valueOf", "toLocaleString", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"],
                a = D.length,
                o = Object.prototype,
                h = o.hasOwnProperty;
            return function(O, c) {
                var n, i;
                for (n in O) {
                    if (c(n, O[n]) === false) {
                        return; } }
                for (var i = 0; i < a; i++) { n = D[i];
                    if (h.call(O, n) || O[n] !== o[n]) {
                        if (c(n, O[n]) === false) {
                            return; } } } }; }());
        q.sap.arrayDiff = function(o, n, c, u) { c = c || function(v, V) {
                return q.sap.equal(v, V); };
            var O = [];
            var N = [];
            var m = [];
            for (var i = 0; i < n.length; i++) {
                var a = n[i];
                var f = 0;
                var t;
                if (u && c(o[i], a)) { f = 1;
                    t = i; } else {
                    for (var j = 0; j < o.length; j++) {
                        if (c(o[j], a)) { f++;
                            t = j;
                            if (u || f > 1) {
                                break; } } } }
                if (f == 1) {
                    var M = { oldIndex: t, newIndex: i };
                    if (m[t]) { delete O[t];
                        delete N[m[t].newIndex]; } else { N[i] = { data: n[i], row: t };
                        O[t] = { data: o[t], row: i };
                        m[t] = M; } } }
            for (var i = 0; i < n.length - 1; i++) {
                if (N[i] && !N[i + 1] && N[i].row + 1 < o.length && !O[N[i].row + 1] && c(o[N[i].row + 1], n[i + 1])) { N[i + 1] = { data: n[i + 1], row: N[i].row + 1 };
                    O[N[i].row + 1] = { data: O[N[i].row + 1], row: i + 1 }; } }
            for (var i = n.length - 1; i > 0; i--) {
                if (N[i] && !N[i - 1] && N[i].row > 0 && !O[N[i].row - 1] && c(o[N[i].row - 1], n[i - 1])) { N[i - 1] = { data: n[i - 1], row: N[i].row - 1 };
                    O[N[i].row - 1] = { data: O[N[i].row - 1], row: i - 1 }; } }
            var d = [];
            if (n.length == 0) {
                for (var i = 0; i < o.length; i++) { d.push({ index: 0, type: 'delete' }); } } else {
                var b = 0;
                if (!O[0]) {
                    for (var i = 0; i < o.length && !O[i]; i++) { d.push({ index: 0, type: 'delete' });
                        b = i + 1; } }
                for (var i = 0; i < n.length; i++) {
                    if (!N[i] || N[i].row > b) { d.push({ index: i, type: 'insert' }); } else { b = N[i].row + 1;
                        for (var j = N[i].row + 1; j < o.length && (!O[j] || O[j].row < i); j++) { d.push({ index: i + 1, type: 'delete' });
                            b = j + 1; } } } }
            return d; };
        q.sap._createJSTokenizer = function() {
            var a, b, e = { '"': '"', '\'': '\'', '\\': '\\', '/': '/', b: '\b', f: '\f', n: '\n', r: '\r', t: '\t' },
                t, d = function(m) {
                    throw { name: 'SyntaxError', message: m, at: a, text: t }; },
                n = function(c) {
                    if (c && c !== b) { d("Expected '" + c + "' instead of '" + b + "'"); }
                    b = t.charAt(a);
                    a += 1;
                    return b; },
                f = function() {
                    var f, s = '';
                    if (b === '-') { s = '-';
                        n('-'); }
                    while (b >= '0' && b <= '9') { s += b;
                        n(); }
                    if (b === '.') { s += '.';
                        while (n() && b >= '0' && b <= '9') { s += b; } }
                    if (b === 'e' || b === 'E') { s += b;
                        n();
                        if (b === '-' || b === '+') { s += b;
                            n(); }
                        while (b >= '0' && b <= '9') { s += b;
                            n(); } }
                    f = +s;
                    if (!isFinite(f)) { d("Bad number"); } else {
                        return f; } },
                s = function() {
                    var c, i, s = '',
                        k, u;
                    if (b === '"' || b === '\'') { k = b;
                        while (n()) {
                            if (b === k) { n();
                                return s; }
                            if (b === '\\') { n();
                                if (b === 'u') { u = 0;
                                    for (i = 0; i < 4; i += 1) { c = parseInt(n(), 16);
                                        if (!isFinite(c)) {
                                            break; }
                                        u = u * 16 + c; }
                                    s += String.fromCharCode(u); } else if (typeof e[b] === 'string') { s += e[b]; } else {
                                    break; } } else { s += b; } } }
                    d("Bad string"); },
                g = function() {
                    var g = '',
                        c = function(b) {
                            return b === "_" || (b >= "0" && b <= "9") || (b >= "a" && b <= "z") || (b >= "A" && b <= "Z"); };
                    if (c(b)) { g += b; } else { d("Bad name"); }
                    while (n()) {
                        if (b === ' ') { n();
                            return g; }
                        if (b === ':') {
                            return g; }
                        if (c(b)) { g += b; } else { d("Bad name"); } }
                    d("Bad name"); },
                w = function() {
                    while (b && b <= ' ') { n(); } },
                h = function() {
                    switch (b) {
                        case 't':
                            n('t');
                            n('r');
                            n('u');
                            n('e');
                            return true;
                        case 'f':
                            n('f');
                            n('a');
                            n('l');
                            n('s');
                            n('e');
                            return false;
                        case 'n':
                            n('n');
                            n('u');
                            n('l');
                            n('l');
                            return null; }
                    d("Unexpected '" + b + "'"); },
                v, j = function() {
                    var j = [];
                    if (b === '[') { n('[');
                        w();
                        if (b === ']') { n(']');
                            return j; }
                        while (b) { j.push(v());
                            w();
                            if (b === ']') { n(']');
                                return j; }
                            n(',');
                            w(); } }
                    d("Bad array"); },
                o = function() {
                    var k, o = {};
                    if (b === '{') { n('{');
                        w();
                        if (b === '}') { n('}');
                            return o; }
                        while (b) {
                            if (b >= "0" && b <= "9") { k = f(); } else if (b === '"' || b === '\'') { k = s(); } else { k = g(); }
                            w();
                            n(':');
                            if (Object.hasOwnProperty.call(o, k)) { d('Duplicate key "' + k + '"'); }
                            o[k] = v();
                            w();
                            if (b === '}') { n('}');
                                return o; }
                            n(',');
                            w(); } }
                    d("Bad object"); };
            v = function() { w();
                switch (b) {
                    case '{':
                        return o();
                    case '[':
                        return j();
                    case '"':
                    case '\'':
                        return s();
                    case '-':
                        return f();
                    default:
                        return b >= '0' && b <= '9' ? f() : h(); } };

            function p(c, i) {
                var r;
                t = c;
                a = i || 0;
                b = ' ';
                r = v();
                if (isNaN(i)) { w();
                    if (b) { d("Syntax error"); }
                    return r; } else {
                    return { result: r, at: a - 1 }; } }
            return { array: j, error: d, getIndex: function() {
                    return a - 1; }, getCh: function() {
                    return b; }, init: function(c, i) { t = c;
                    a = i || 0;
                    b = ' '; }, name: g, next: n, number: f, parseJS: p, setIndex: function(i) {
                    if (i < a - 1) {
                        throw new Error("Must not set index " + i + " before previous index " + (a - 1)); }
                    a = i;
                    n(); }, string: s, value: v, white: w, word: h }; };
        q.sap.parseJS = q.sap._createJSTokenizer().parseJS;
        q.sap.extend = function() {
            var s, c, a, n, o, b, t = arguments[0] || {},
                i = 1,
                l = arguments.length,
                d = false;
            if (typeof t === "boolean") { d = t;
                t = arguments[i] || {};
                i++; }
            if (typeof t !== "object" && !q.isFunction(t)) { t = {}; }
            for (; i < l; i++) { o = arguments[i];
                for (n in o) { s = t[n];
                    a = o[n];
                    if (t === a) {
                        continue; }
                    if (d && a && (q.isPlainObject(a) || (c = q.isArray(a)))) {
                        if (c) { c = false;
                            b = s && q.isArray(s) ? s : []; } else { b = s && q.isPlainObject(s) ? s : {}; }
                        t[n] = q.sap.extend(d, b, a); } else { t[n] = a; } } }
            return t; };
        return q; });
    sap.ui.predefine('jquery.sap.sjax', ['jquery.sap.global'], function(q) { "use strict";
        q.sap.sjaxSettings = { complexResult: true, fallback: undefined };
        q.sap.sjax = function sjax(o) {
            var s = q.extend(true, {}, q.sap.sjaxSettings, o, { async: false, success: function(d, t, x) { r = { success: true, data: d, status: t, statusCode: x && x.status }; }, error: function(x, t, e) { r = { success: false, data: undefined, status: t, error: e, statusCode: x.status, errorResponse: x.responseText }; } });
            var r;
            q.ajax(s);
            if (!s.complexResult) {
                return r.success ? r.data : s.fallback; }
            return r; };
        q.sap.syncHead = function(u) {
            return q.sap.sjax({ type: 'HEAD', url: u }).success; };
        q.sap.syncGet = function syncGet(u, d, D) {
            return q.sap.sjax({ url: u, data: d, type: 'GET', dataType: D || 'text' }); };
        q.sap.syncPost = function syncPost(u, d, D) {
            return q.sap.sjax({ url: u, data: d, type: 'POST', dataType: D || 'text' }); };
        q.sap.syncGetText = function syncGetText(u, d, f) {
            return q.sap.sjax({ url: u, data: d, type: 'GET', dataType: 'text', fallback: f, complexResult: (arguments.length < 3) }); };
        q.sap.syncGetJSON = function syncGetJSON(u, d, f) {
            return q.sap.sjax({ url: u, data: d || null, type: 'GET', dataType: 'json', fallback: f, complexResult: (arguments.length < 3) }); };
        return q; });
    sap.ui.predefine('jquery.sap.strings', ['jquery.sap.global'], function(q) { "use strict";
        q.sap.endsWith = function endsWith(s, e) {
            if (typeof(e) != "string" || e == "") {
                return false; }
            var p = s.lastIndexOf(e);
            return p >= 0 && p == s.length - e.length; };
        q.sap.endsWithIgnoreCase = function endsWithIgnoreCase(s, e) {
            if (typeof(e) != "string" || e == "") {
                return false; }
            s = s.toUpperCase();
            e = e.toUpperCase();
            return q.sap.endsWith(s, e); };
        q.sap.startsWith = function startsWith(s, S) {
            if (typeof(S) != "string" || S == "") {
                return false; }
            if (s == S) {
                return true; }
            return s.indexOf(S) == 0; };
        q.sap.startsWithIgnoreCase = function startsWithIgnoreCase(s, S) {
            if (typeof(S) != "string" || S == "") {
                return false; }
            s = s.toUpperCase();
            S = S.toUpperCase();
            return q.sap.startsWith(s, S); };
        q.sap.charToUpperCase = function charToUpperCase(s, p) {
            if (!s) {
                return s; }
            if (!p || isNaN(p) || p <= 0 || p >= s.length) { p = 0; }
            var C = s.charAt(p).toUpperCase();
            if (p > 0) {
                return s.substring(0, p) + C + s.substring(p + 1); }
            return C + s.substring(p + 1); };
        q.sap.padLeft = function padLeft(s, p, l) {
            if (!s) { s = ""; }
            while (s.length < l) { s = p + s; }
            return s; };
        q.sap.padRight = function padRight(s, p, l) {
            if (!s) { s = ""; }
            while (s.length < l) { s = s + p; }
            return s; };
        var r = /-(.)/ig;
        q.sap.camelCase = function camelCase(s) {
            return s.replace(r, function(m, C) {
                return C.toUpperCase(); }); };
        var a = /([A-Z])/g;
        q.sap.hyphen = function hyphen(s) {
            return s.replace(a, function(m, C) {
                return "-" + C.toLowerCase(); }); };
        var b = /[[\]{}()*+?.\\^$|]/g;
        q.sap.escapeRegExp = function escapeRegExp(s) {
            return s.replace(b, "\\$&"); };
        q.sap.formatMessage = function formatMessage(p, v) {
            if (arguments.length > 2 || (v != null && !q.isArray(v))) { v = Array.prototype.slice.call(arguments, 1); }
            v = v || [];
            return p.replace(c, function($, d, e, f, o) {
                if (d) {
                    return "'"; } else if (e) {
                    return e.replace(/''/g, "'"); } else if (f) {
                    return String(v[parseInt(f, 10)]); }
                throw new Error("formatMessage: pattern syntax error at pos. " + o); }); };
        var c = /('')|'([^']+(?:''[^']*)*)(?:'|$)|\{([0-9]+(?:\s*,[^{}]*)?)\}|[{}]/g;
        return q; });
    sap.ui.predefine('jquery.sap.trace', ['jquery.sap.global', 'sap/ui/thirdparty/URI', 'sap/ui/Global'], function(q, U) { "use strict";
        (function() {
            var f = /sap-ui-xx-fesr=(true|x|X)/.test(location.search),
                t, I, m, R = z(),
                C = z().substr(-8, 8) + R,
                H = new U(window.location).host(),
                a = sap.ui.Device.os.name + "_" + sap.ui.Device.os.version,
                b = sap.ui.Device.browser.name + "_" + sap.ui.Device.browser.version,
                c = "",
                E, T, F, p = {},
                S = 0,
                d, o, g, h, j = 0;

            function k() {
                if (!m) { m = true;
                    if (!(window.performance && window.performance.getEntries)) { q.sap.log.warning("Interaction tracking is not supported on browsers with insufficient performance API"); }
                    var X = window.XMLHttpRequest.prototype.open,
                        e = window.XMLHttpRequest.prototype.send,
                        i = window.XMLHttpRequest.prototype.setRequestHeader;
                    window.XMLHttpRequest.prototype.open = function() { X.apply(this, arguments);
                        if (I || f || t) {
                            var s = new U(arguments[1]).host();
                            if (!s || s === H) { T = z();
                                if (I || f) { this.addEventListener("readystatechange", l);
                                    this.pendingInteraction = p;
                                    S++;
                                    if (f) {
                                        if (g) { this.setRequestHeader("SAP-Perf-FESRec", g);
                                            this.setRequestHeader("SAP-Perf-FESRec-opt", h);
                                            g = null;
                                            h = null;
                                            S = 0;
                                            F = T; } else if (!F) { F = T; }
                                        this.setRequestHeader("SAP-PASSPORT", y(E, R, T, p.component + (p.appVersion ? "@" + p.appVersion : "") + (c ? "@" + c : ""), p.trigger + "_" + p.event + "_" + S)); } }
                                if (!f && t) { this.setRequestHeader("SAP-PASSPORT", y(E, R, T)); } } } };
                    window.XMLHttpRequest.prototype.send = function() { e.apply(this, arguments);
                        if ((I || f) && this.pendingInteraction) { this.pendingInteraction.bytesSent += arguments[0] ? arguments[0].length * 2 : 0; } };
                    window.XMLHttpRequest.prototype.setRequestHeader = function(s, V) { i.apply(this, arguments);
                        if (I || f) {
                            if (!this.requestHeaderLength) { this.requestHeaderLength = 0; }
                            this.requestHeaderLength += (s.length + V.length + 3) * 2; } };
                    window.addEventListener("scroll", q.sap.interaction.notifyScrollEvent);
                    window.addEventListener("mousewheel", q.sap.interaction.notifyScrollEvent); } }

            function l() {
                if (this.readyState === 4 && this.pendingInteraction) {
                    var s = this.getResponseHeader("content-length"),
                        e = this.getResponseHeader("content-encoding") === "gzip",
                        i = this.getResponseHeader("sap-perf-fesrec");
                    this.pendingInteraction.bytesReceived += s ? parseInt(s, 10) : 0;
                    this.pendingInteraction.bytesReceived += this.getAllResponseHeaders().length * 2;
                    this.pendingInteraction.bytesSent += this.requestHeaderLength || 0;
                    this.pendingInteraction.requestCompression = e && (this.pendingInteraction.requestCompression !== false);
                    this.pendingInteraction.networkTime += i ? Math.round(parseFloat(i, 10) / 1000) : 0;
                    var A = this.getResponseHeader("sap-statistics");
                    if (A) { this.pendingInteraction.sapStatistics.push({ url: this.responseURL, statistics: A, timing: q.sap.measure.getRequestTimings().pop() }); }
                    delete this.requestHeaderLength;
                    delete this.pendingInteraction; } }

            function n(i) {
                return [u(R, 32), u(F, 32), u(i.navigation, 16), u(i.roundtrip, 16), u(i.duration, 16), u(i.requests.length, 8), u(C, 40), u(i.networkTime, 16), u(i.requestTime, 16), u(a, 20), "SAP_UI5"].join(","); }

            function r(i) {
                return [u(i.component, 20, true), u(i.trigger + "_" + p.event, 20, true), "", u(b, 20), u(i.bytesSent, 16), u(i.bytesReceived, 16), "", "", u(i.processing, 16), i.requestCompression ? "X" : "", "", "", "", "", u(i.busyDuration, 16), "", "", "", ""].join(","); }

            function u(e, L, i) {
                if (!e) { e = e === 0 ? "0" : ""; } else if (typeof e === "number") { e = Math.round(e).toString();
                    if (e.length > L) { e = "-1"; } } else { e = i ? e.substr(-L, L) : e.substr(0, L); }
                return e; }
            q.sap.interaction = {};
            q.sap.interaction.setActive = function(A) {
                if (A && !I) { k(); }
                I = A; };
            q.sap.interaction.getActive = function() {
                return I || f; };
            q.sap.interaction.notifyStepStart = function(e, i) {
                if (I || f) {
                    if (o || i) {
                        var s;
                        if (i) { s = "startup"; } else if (o.originalEvent) { s = o.originalEvent.type; } else { s = o.type; }
                        q.sap.measure.startInteraction(s, e);
                        var A = q.sap.measure.getAllInteractionMeasurements();
                        var B = A[A.length - 1];
                        var P = q.sap.measure.getPendingInteractionMeasurement();
                        p = P ? P : p;
                        if (f && B && B.requests.length > 0) { g = n(B);
                            h = r(B); }
                        o = null; } } };
            q.sap.interaction.notifyStepEnd = function() {
                if (I || f) {
                    if (d) { q.sap.clearDelayedCall(d); }
                    d = q.sap.delayedCall(1, q.sap.measure, "endInteraction"); } };
            q.sap.interaction.notifyEventStart = function(e) { o = (I || f) ? e : null; };

            function v() { q.sap.interaction.notifyStepStart();
                j = 0; }
            q.sap.interaction.notifyScrollEvent = function(e) {
                if (I || f) {
                    if (!j) { q.sap.interaction.notifyEventStart(e); } else { q.sap.clearDelayedCall(j); }
                    j = q.sap.delayedCall(250, undefined, v); } };
            q.sap.interaction.notifyEventEnd = function() {
                if (o) {
                    if (o.type.match(/^(mousedown|touchstart|keydown)$/)) { q.sap.measure.endInteraction(true); } } };
            q.sap.fesr = {};
            q.sap.fesr.setActive = function(A) {
                if (A && !f) { f = true;
                    if (!I) { k(); } } else if (!A) { f = false; } };
            q.sap.fesr.getActive = function() {
                return f; };
            q.sap.fesr.getCurrentTransactionId = function() {
                return T; };
            q.sap.fesr.getRootId = function() {
                return R; };
            q.sap.fesr.addBusyDuration = function(D) {
                if (!p.busyDuration) { p.busyDuration = 0; }
                p.busyDuration += D; };
            q.sap.passport = {};
            q.sap.passport.setActive = function(A) {
                if (A && !t) { t = true;
                    k(); } else if (!A) { t = false; } };

            function w(s) {
                var e = [];
                for (var i = 0; i < s.length; ++i) { e.push(s.charCodeAt(i)); }
                return e; }

            function x(e) {
                var s = "";
                for (var i = 0; i < e.length; i++) {
                    var A = e[i].toString(16);
                    A = Array(2 - A.length + 1).join("0") + A;
                    s += A; }
                return s; }

            function y(e, i, s, A, B) {
                var D = [0x2A, 0x54, 0x48, 0x2A, 0x03, 0x01, 0x30, 0x00, 0x00, 0x53, 0x41, 0x50, 0x5F, 0x45, 0x32, 0x45, 0x5F, 0x54, 0x41, 0x5F, 0x50, 0x6C, 0x75, 0x67, 0x49, 0x6E, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x00, 0x00, 0x53, 0x41, 0x50, 0x5F, 0x45, 0x32, 0x45, 0x5F, 0x54, 0x41, 0x5F, 0x55, 0x73, 0x65, 0x72, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x53, 0x41, 0x50, 0x5F, 0x45, 0x32, 0x45, 0x5F, 0x54, 0x41, 0x5F, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x00, 0x05, 0x53, 0x41, 0x50, 0x5F, 0x45, 0x32, 0x45, 0x5F, 0x54, 0x41, 0x5F, 0x50, 0x6C, 0x75, 0x67, 0x49, 0x6E, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x34, 0x36, 0x33, 0x35, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30, 0x33, 0x31, 0x31, 0x45, 0x45, 0x30, 0x41, 0x35, 0x44, 0x32, 0x35, 0x30, 0x39, 0x39, 0x39, 0x43, 0x33, 0x39, 0x32, 0x42, 0x36, 0x38, 0x20, 0x20, 0x20, 0x00, 0x07, 0x46, 0x35, 0x00, 0x00, 0x00, 0x31, 0x1E, 0xE0, 0xA5, 0xD2, 0x4E, 0xDB, 0xB2, 0xE4, 0x4B, 0x68, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0x00, 0xE2, 0x2A, 0x54, 0x48, 0x2A, 0x01, 0x00, 0x27, 0x00, 0x00, 0x02, 0x00, 0x03, 0x00, 0x02, 0x00, 0x01, 0x04, 0x00, 0x08, 0x58, 0x00, 0x02, 0x00, 0x02, 0x04, 0x00, 0x08, 0x30, 0x00, 0x02, 0x00, 0x03, 0x02, 0x00, 0x0B, 0x00, 0x00, 0x00, 0x00, 0x2A, 0x54, 0x48, 0x2A, 0x01, 0x00, 0x23, 0x01, 0x00, 0x01, 0x00, 0x01, 0x00, 0x02, 0x00, 0x01, 0x03, 0x00, 0x17, 0x00, 0xAB, 0xCD, 0xEF, 0xAB, 0xCD, 0xEF, 0xAB, 0xCD, 0xEF, 0xAB, 0xCD, 0xEF, 0xAB, 0xCD, 0xEF, 0x2A, 0x54, 0x48, 0x2A];
                var G = [372, 32];
                var J = [149, 32];
                var K = [9, 32];
                var P = [117, 32];
                var L = [75, 40];
                var M = [7, 2];
                var N = w("SAP_E2E_TA_UI5LIB");
                N = N.concat(w(new Array(32 + 1 - N.length).join(' ')));
                if (A) { A = w(A.substr(-32, 32));
                    A = A.concat(w(new Array(32 + 1 - A.length).join(' ')));
                    D.splice.apply(D, K.concat(A));
                    D.splice.apply(D, P.concat(A)); } else { D.splice.apply(D, K.concat(N));
                    D.splice.apply(D, P.concat(N)); }
                D.splice.apply(D, J.concat(w(s)));
                D.splice.apply(D, M.concat(e));
                if (B) { B = w(B.substr(-40, 40));
                    B = B.concat(w(new Array(40 + 1 - B.length).join(' ')));
                    D.splice.apply(D, L.concat(B)); }
                var O = x(D).toUpperCase();
                return O.substring(0, G[0]).concat(i) + O.substring(G[0] + G[1]); }
            q.sap.passport.traceFlags = function(e) {
                switch (e) {
                    case 'low':
                        E = [0x00, 0x00];
                        break;
                    case 'medium':
                        E = [0x89, 0x0A];
                        break;
                    case 'high':
                        E = [0x9F, 0x0D];
                        break;
                    default:
                        E = [];
                        E.push((parseInt(e, 16) & 0xFF00) / 256);
                        E.push((parseInt(e, 16) & 0xFF)); }
                return E; };

            function z() {
                var e = function() {
                    var B = Math.floor(Math.random() * 0x10000);
                    return (new Array(4 + 1 - B.toString(16).length)).join('0') + B.toString(16); };
                var i = function() {
                    var B = (Math.floor(Math.random() * 0x10000) & 0x0fff) + 0x4000;
                    return (new Array(4 + 1 - B.toString(16).length)).join('0') + B.toString(16); };
                var s = function() {
                    var B = (Math.floor(Math.random() * 0x10000) & 0x3fff) + 0x8000;
                    return (new Array(4 + 1 - B.toString(16).length)).join('0') + B.toString(16); };
                var A = (e() + e() + e() + i() + s() + e() + e() + e());
                return A.toUpperCase(); }
            E = q.sap.passport.traceFlags();
            q.sap.interaction.notifyStepStart(null, true);
            if (f) { sap.ui.getVersionInfo({ async: true }).then(function(i) { c = i && i.version ? i.version : ""; }).catch(function(e) { q.sap.log.debug("UI5 version could not be determined", e, "jQuery.sap.fesr"); });
                k(); }
            if (/sap-ui-xx-e2e-trace=(true|x|X)/.test(location.search)) { q.sap.require("sap.ui.core.support.trace.E2eTraceLib"); } }());
        return q; });
    sap.ui.predefine('jquery.sap.ui', ['jquery.sap.global', 'sap/ui/Global'], function(q) { "use strict";

        function u(i) {
            return sap.ui.getCore().getUIArea(this.id) != null; }

        function f(i, o) {
            return sap.ui.getCore().getUIArea(this.id); }

        function a(c, i) {
            return c.getUIArea().getInterface(); }
        q.fn.root = function(r) {
            if (r) { sap.ui.getCore().setRoot(this.get(0), r);
                return this; }
            var c = this.control();
            if (c.length > 0) {
                return q.map(c, a); }
            var U = this.uiarea();
            if (U.length > 0) {
                return U; }
            this.each(function(i) { sap.ui.getCore().createUIArea(this); });
            return this; };
        q.fn.uiarea = function(i) {
            var U = this.slice("[id]").filter(u).map(f).get();
            return typeof(i) === "number" ? U[i] : U; };

        function b() {
            if (!this || !this.nodeType || this.nodeType === 9) {
                return null; }
            try {
                var i = q(this).closest("[data-sap-ui]").attr("id");
                return i ? sap.ui.getCore().byId(i) : null; } catch (e) {
                return null; } }
        q.fn.control = function(i) {
            var c = this.map(b);
            if (i === undefined || isNaN(i)) {
                return c.get(); } else {
                return c.get(i); } };
        q.fn.sapui = function(c, i, C) {
            return this.each(function() {
                var o = null;
                if (this) {
                    if (c.indexOf(".") == -1) { c = "sap.ui.commons." + c; }
                    var d = q.sap.getObject(c);
                    if (d) {
                        if (typeof C == 'object' && typeof C.press == 'function') { C.press = q.proxy(C.press, this); }
                        o = new(d)(i, C);
                        o.placeAt(this); } } }); };
        return q; });
    sap.ui.predefine('sap/ui/Global', ['jquery.sap.global', 'jquery.sap.dom'], function(q) { "use strict";
        if (window.OpenAjax && window.OpenAjax.hub) { OpenAjax.hub.registerLibrary("sap", "http://www.sap.com/", "0.1", {}); }
        if (typeof window.sap !== "object" && typeof window.sap !== "function") { window.sap = {}; }
        if (typeof window.sap.ui !== "object") { window.sap.ui = {}; }
        sap.ui = q.extend(sap.ui, { version: "1.36.10", buildinfo: { lastchange: "", buildtime: "20160516-1138" } });
        var v = null;
        sap.ui.getVersionInfo = function(o) {
            if (typeof o !== "object") { o = { library: o }; }
            o.async = o.async === true;
            o.failOnError = o.failOnError !== false;
            if (!sap.ui.versioninfo) {
                if (o.async && v instanceof Promise) {
                    return v.then(function() {
                        return sap.ui.getVersionInfo(o); }); }
                var h = function(V) { v = null;
                    if (V === null) {
                        return undefined; }
                    sap.ui.versioninfo = V;
                    return sap.ui.getVersionInfo(o); };
                var H = function(e) { v = null;
                    throw e; };
                var r = q.sap.loadResource("sap-ui-version.json", { async: o.async, failOnError: o.async || o.failOnError });
                if (r instanceof Promise) { v = r;
                    return r.then(h, H); } else {
                    return h(r); } } else {
                var R;
                if (typeof o.library !== "undefined") {
                    var L = sap.ui.versioninfo.libraries;
                    if (L) {
                        for (var i = 0, l = L.length; i < l; i++) {
                            if (L[i].name === o.library) { R = L[i];
                                break; } } } } else { R = sap.ui.versioninfo; }
                return o.async ? Promise.resolve(R) : R; } };
        sap.ui.namespace = function(n) {
            return q.sap.getObject(n, 0); };
        sap.ui.lazyRequire = function(c, m, M) {
            var f = c.replace(/\//gi, "\."),
                l = f.lastIndexOf("."),
                p = f.substr(0, l),
                C = f.substr(l + 1),
                P = q.sap.getObject(p, 0),
                o = P[C],
                a = (m || "new").split(" "),
                b = q.inArray("new", a);
            M = M || f;
            if (!o) {
                if (b >= 0) { o = function() { q.sap.log.debug("lazy stub for '" + f + "' (constructor) called.");
                        q.sap.require(M);
                        var r = P[C];
                        if (r._sapUiLazyLoader) {
                            throw new Error("lazyRequire: stub '" + f + "'has not been replaced by module '" + M + "'"); }
                        var i = q.sap.newObject(r.prototype);
                        var R = r.apply(i, arguments);
                        if (R && (typeof R === "function" || typeof R === "object")) { i = R; }
                        return i; };
                    o._sapUiLazyLoader = true;
                    a.splice(b, 1); } else { o = {}; }
                P[C] = o; }
            q.each(a, function(i, s) {
                if (!o[s]) { o[s] = function() { q.sap.log.debug("lazy stub for '" + f + "." + s + "' called.");
                        q.sap.require(M);
                        var r = P[C];
                        if (r[s]._sapUiLazyLoader) {
                            throw new Error("lazyRequire: stub '" + f + "." + s + "' has not been replaced by loaded module '" + M + "'"); }
                        return r[s].apply(r, arguments); };
                    o[s]._sapUiLazyLoader = true; } }); };
        sap.ui.lazyRequire._isStub = function(c) {
            var l = c.lastIndexOf("."),
                C = c.slice(0, l),
                p = c.slice(l + 1),
                o = q.sap.getObject(C);
            return !!(o && typeof o[p] === "function" && o[p]._sapUiLazyLoader); };
        sap.ui.resource = function(l, r) {
            var m = r.match(/^themes\/([^\/]+)\//);
            if (m) { l += ".themes." + m[1];
                r = r.substr(m[0].length); }
            return q.sap.getModulePath(l, '/') + r; };
        sap.ui.localResources = function(n) { q.sap.registerModulePath(n, "./" + n.replace(/\./g, "/")); };
        return sap.ui; }, true);
    sap.ui.predefine('sap/ui/base/BindingParser', ['jquery.sap.global', './ExpressionParser', 'sap/ui/model/BindingMode', 'jquery.sap.script'], function(q, E, B) { "use strict";
        var a = { _keepBindingStrings: false };
        var r = /^\{\s*[a-zA-Z_][a-zA-Z0-9_]*\s*:/;
        var b = /(\\[\\\{\}])|(\{)/g;
        var c = /([\\\{\}])/g;

        function d(F, R) {
            function e() {
                var i, n = F.length,
                    k = new Array(n);
                for (i = 0; i < n; i += 1) { k[i] = F[i].apply(this, arguments); }
                if (R) {
                    return R.apply(this, k); }
                return n > 1 ? k.join(" ") : k[0]; }
            e.textFragments = R && R.textFragments || "sap.ui.base.BindingParser: composeFormatters";
            return e; }

        function f(F) {
            var e = function() {
                var R = [],
                    l = F.length,
                    i;
                for (i = 0; i < l; i++) {
                    if (typeof F[i] === "number") { R.push(arguments[F[i]]); } else { R.push(F[i]); } }
                return R.join(''); };
            e.textFragments = F;
            return e; }

        function g(p) {
            var P = p.indexOf(">"),
                o = { path: p };
            if (P > 0) { o.model = p.slice(0, P);
                o.path = p.slice(P + 1); }
            return o; }

        function h(o, s) {
            try { a.mergeParts(o); } catch (e) { q.sap.log.error("Cannot merge parts: " + e.message, s, "sap.ui.base.BindingParser"); } }

        function j(e, i, s) {
            var p = q.sap.parseJS,
                P, k;

            function l(o, u) {
                if (typeof o[u] === "string") {
                    var v, N = o[u];
                    if (q.sap.startsWith(o[u], ".")) { v = q.sap.getObject(o[u].slice(1), undefined, e.oContext);
                        o[u] = e.bStaticContext ? v : q.proxy(v, e.oContext); } else { o[u] = q.sap.getObject(o[u]); }
                    if (typeof(o[u]) !== "function") {
                        if (e.bTolerateFunctionsNotFound) { e.aFunctionsNotFound = e.aFunctionsNotFound || [];
                            e.aFunctionsNotFound.push(N); } else { q.sap.log.error(u + " function " + N + " not found!"); } } } }

            function m(o, u) {
                var F;
                if (typeof o[u] === "string") {
                    if (q.sap.startsWith(o[u], ".")) { F = q.sap.getObject(o[u].slice(1), undefined, e.oContext); } else { F = q.sap.getObject(o[u]); }
                    if (typeof F === "function") { o[u] = new F(o.formatOptions, o.constraints); } else { o[u] = F; }
                    delete o.formatOptions;
                    delete o.constraints; } }

            function n(o, u) {
                if (!(q.isPlainObject(o[u]))) {
                    return; }
                q.each(o[u], function(N, O) { l(o[u], N); }); }

            function t(o, u, v) {
                var F;
                if (!(typeof o[u] === "object" || q.isArray(o[u]))) {
                    return; }
                if (q.isArray(o[u])) { q.each(o[u], function(I, O) { t(o[u], I, u); }); } else {
                    if (u === "filters" || v === "filters") { F = q.sap.getObject("sap.ui.model.Filter"); } else if (u === "sorter" || v === "sorter") { F = q.sap.getObject("sap.ui.model.Sorter");
                        l(o[u], "group"); }
                    if (F) { o[u] = new F(o[u]); } } }
            if (r.test(i.slice(s))) { P = p(i, s);
                m(P.result, 'type');
                t(P.result, 'filters');
                t(P.result, 'sorter');
                n(P.result, 'events');
                l(P.result, 'formatter');
                l(P.result, 'factory');
                l(P.result, 'groupHeaderFactory');
                return P; }
            k = i.indexOf('}', s);
            if (k < s) {
                throw new SyntaxError("no closing braces found in '" + i + "' after pos:" + s); }
            return { result: g(i.slice(s + 1, k)), at: k + 1 }; }
        a.simpleParser = function(s, C) {
            if (q.sap.startsWith(s, "{") && q.sap.endsWith(s, "}")) {
                return g(s.slice(1, -1)); } };
        a.simpleParser.escape = function(v) {
            return v; };
        a.complexParser = function(s, C, u, t, S) {
            var e = false,
                o = { parts: [] },
                M = false,
                i = { oContext: C, aFunctionsNotFound: undefined, bStaticContext: S, bTolerateFunctionsNotFound: t },
                F = [],
                U, p = 0,
                m, k;

            function l(I, n, v) {
                var w = E.parse(j.bind(null, i), s, n);

                function x(w, y) {
                    if (w.parts) { w.parts.forEach(x);
                        e = e || y !== undefined; } else { w.mode = v; } }
                if (I.charAt(w.at) !== "}") {
                    throw new SyntaxError("Expected '}' and instead saw '" + I.charAt(w.at) + "' in expression binding " + I + " at position " + w.at); }
                w.at += 1;
                if (w.result) { x(w.result); } else { F[F.length - 1] = String(w.constant);
                    U = true; }
                return w; }
            b.lastIndex = 0;
            while ((m = b.exec(s)) !== null) {
                if (p < m.index) { F.push(s.slice(p, m.index)); }
                if (m[1]) { F.push(m[1].slice(1));
                    U = true; } else { F.push(o.parts.length);
                    if (s.indexOf(":=", m.index) === m.index + 1) { k = l(s, m.index + 3, B.OneTime); } else if (s.charAt(m.index + 1) === "=") { k = l(s, m.index + 2, B.OneWay); } else { k = j(i, s, m.index); }
                    if (k.result) { o.parts.push(k.result);
                        M = M || "parts" in k.result; }
                    b.lastIndex = k.at; }
                p = b.lastIndex; }
            if (p < s.length) { F.push(s.slice(p)); }
            if (o.parts.length > 0) {
                if (F.length === 1) { o = o.parts[0];
                    M = e; } else { o.formatter = f(F); }
                if (M) { h(o, s); }
                if (a._keepBindingStrings) { o.bindingString = s; }
                if (i.aFunctionsNotFound) { o.functionsNotFound = i.aFunctionsNotFound; }
                return o; } else if (u && U) {
                return F.join(''); } };
        a.complexParser.escape = function(v) {
            return v.replace(c, "\\$1"); };
        a.mergeParts = function(o) {
            var F = [],
                p = [];
            o.parts.forEach(function(e) {
                var i, k = function() {
                        return e; },
                    n, s = p.length;

                function l() {
                    return arguments[s]; }
                if (e && typeof e === "object") {
                    if (e.parts) {
                        for (n in e) {
                            if (n !== "formatter" && n !== "parts") {
                                throw new Error("Unsupported property: " + n); } }
                        p = p.concat(e.parts);
                        i = p.length;
                        if (e.formatter) { k = function() {
                                return e.formatter.apply(this, Array.prototype.slice.call(arguments, s, i)); }; } else if (i - s > 1) { k = function() {
                                return Array.prototype.slice.call(arguments, s, i).join(" "); }; } else { k = l; } } else if (e.path) { p.push(e);
                        k = l; } }
                F.push(k); });
            o.parts = p;
            o.formatter = d(F, o.formatter); };
        a.parseExpression = function(i, s) {
            return E.parse(j.bind(null, {}), i, s); };
        return a; }, true);
    sap.ui.predefine('sap/ui/base/DataType', ['jquery.sap.global'], function(q) { "use strict";
        var D = function() {
            throw new Error(); };
        D.prototype.getName = function() {
            return undefined; };
        D.prototype.getBaseType = function() {
            return undefined; };
        D.prototype.getPrimitiveType = function() {
            var t = this;
            while (t.getBaseType()) { t = t.getBaseType(); }
            return t; };
        D.prototype.getComponentType = function() {
            return undefined; };
        D.prototype.getDefaultValue = function() {
            return undefined; };
        D.prototype.isArrayType = function() {
            return undefined; };
        D.prototype.parseValue = function(v) {
            var t = this.getName();
            if (t == "string") {
                return v; } else if (t == "boolean") {
                return v == "true"; } else if (t == "int") {
                return parseInt(v, 10); } else if (t == "float") {
                return parseFloat(v); } else if (t == "object") {
                return v ? q.parseJSON(v) : null; } else {
                return v; } };
        D.prototype.isValid = undefined;
        D.prototype.setNormalizer = function(n) { this._fnNormalizer = n; };
        D.prototype.normalize = function(v) {
            if (typeof this._fnNormalizer === "function") {
                return this._fnNormalizer(v); } else {
                return v; } };
        (function() {
            function c(n, s, B) { s = s || {};
                var o = B || D.prototype;
                var T = q.sap.newObject(o);
                T.getName = function() {
                    return n; };
                if (s.hasOwnProperty("defaultValue")) {
                    var d = s.defaultValue;
                    T.getDefaultValue = function() {
                        return d; }; }
                if (s.hasOwnProperty("isValid")) {
                    var i = s.isValid;
                    T.isValid = o.isValid ? function(v) {
                        if (!o.isValid(v)) {
                            return false; }
                        return i(v); } : i; }
                T.isArrayType = function() {
                    return false; };
                T.getBaseType = function() {
                    return B; };
                return T; }

            function a(d) {
                var T = q.sap.newObject(D.prototype);
                T.getName = function() {
                    return d.getName() + "[]"; };
                T.getComponentType = function() {
                    return d; };
                T.isValid = function(v) {
                    if (v === null) {
                        return true; }
                    if (q.isArray(v)) {
                        for (var i = 0; i < v.length; i++) {
                            if (!d.isValid(v[i])) {
                                return false; } }
                        return true; }
                    return false; };
                T.parseValue = function(v) {
                    var V = v.split(",");
                    for (var i = 0; i < V.length; i++) { V[i] = d.parseValue(V[i]); }
                    return V; };
                T.isArrayType = function() {
                    return true; };
                T.getBaseType = function() {
                    return h.array; };
                return T; }

            function b(T, e) {
                var V = {},
                    d;
                for (var n in e) {
                    var s = e[n];
                    if (!d) { d = s; }
                    if (typeof s !== "string") {
                        throw new Error("Value " + s + " for enum type " + T + " is not a string"); }
                    if (!V.hasOwnProperty(s) || n == s) { V[s] = n; } }
                var o = q.sap.newObject(D.prototype);
                o.getName = function() {
                    return T; };
                o.isValid = function(v) {
                    return typeof v === "string" && V.hasOwnProperty(v); };
                o.parseValue = function(s) {
                    return e[s]; };
                o.getDefaultValue = function() {
                    return d; };
                o.getBaseType = function() {
                    return t.string; };
                return o; }
            var t = { "any": c("any", { defaultValue: null, isValid: function(v) {
                        return true; } }), "boolean": c("boolean", { defaultValue: false, isValid: function(v) {
                        return typeof v === "boolean"; } }), "int": c("int", { defaultValue: 0, isValid: function(v) {
                        return typeof v === "number" && Math.floor(v) == v; } }), "float": c("float", { defaultValue: 0.0, isValid: function(v) {
                        return typeof v === "number"; } }), "string": c("string", { defaultValue: "", isValid: function(v) {
                        return typeof v === "string" || v instanceof String; } }), "object": c("object", { defaultValue: null, isValid: function(v) {
                        return typeof v === "object" || typeof v === "function"; } }) };
            var h = { "array": c("array", { defaultValue: [], isValid: function(v) {
                        return q.isArray(v); } }) };
            D.getType = function(T) {
                var o = t[T];
                if (!o) {
                    if (T.indexOf("[]") > 0) {
                        var C = T.slice(0, -2),
                            d = this.getType(C);
                        o = d && a(d);
                        if (o) { t[T] = o; }
                        return o; } else { o = q.sap.getObject(T);
                        if (o instanceof D) { t[T] = o; } else if (q.isPlainObject(o)) { o = t[T] = b(T, o); } } }
                return o; };
            D.createType = c;
            var I = {};
            D.registerInterfaceTypes = function(T) {
                for (var i = 0; i < T.length; i++) { q.sap.setObject(T[i], I[T[i]] = new String(T[i])); } };
            D.isInterfaceType = function(T) {
                return I.hasOwnProperty(T) && q.sap.getObject(T) === I[T]; }; }());
        return D; }, true);
    sap.ui.predefine('sap/ui/base/Event', ['jquery.sap.global', './Object'], function(q, B) { "use strict";
        var E = B.extend("sap.ui.base.Event", { constructor: function(i, s, p) { B.apply(this);
                if (arguments.length > 0) { this.init(i, s, p); } } });
        E.prototype.init = function(i, s, p) { this.sId = i;
            this.oSource = s;
            this.mParameters = p || {};
            this.bCancelBubble = false;
            this.bPreventDefault = false; };
        E.prototype.reset = function() { this.sId = "";
            this.oSource = null;
            this.mParameters = null;
            this.bCancelBubble = false;
            this.bPreventDefault = false; };
        E.prototype.getId = function() {
            return this.sId; };
        E.prototype.getSource = function() {
            return this.oSource; };
        E.prototype.getParameters = function() {
            return this.mParameters; };
        E.prototype.getParameter = function(n) {
            return this.mParameters[n]; };
        E.prototype.cancelBubble = function() { this.bCancelBubble = true; };
        E.prototype.preventDefault = function() { this.bPreventDefault = true; };
        return E; });
    sap.ui.predefine('sap/ui/base/EventProvider', ['jquery.sap.global', './Event', './Object', './ObjectPool'], function(q, E, B, O) { "use strict";
        var a = B.extend("sap.ui.base.EventProvider", { constructor: function() { B.call(this);
                this.mEventRegistry = {}; } });
        var b = "EventHandlerChange";
        a.M_EVENTS = { EventHandlerChange: b };
        a.prototype.oEventPool = new O(E);
        a.prototype.attachEvent = function(e, d, f, l) {
            var m = this.mEventRegistry;
            if (typeof(d) === "function") { l = f;
                f = d;
                d = undefined; }
            var c = m[e];
            if (!Array.isArray(c)) { c = m[e] = []; }
            c.push({ oListener: l, fFunction: f, oData: d });
            if (m[b]) { this.fireEvent(b, { EventId: e, type: 'listenerAttached' }); }
            return this; };
        a.prototype.attachEventOnce = function(e, d, f, l) {
            if (typeof(d) === "function") { l = f;
                f = d;
                d = undefined; }

            function o() { this.detachEvent(e, o);
                f.apply(l || this, arguments); }
            this.attachEvent(e, d, o, undefined);
            return this; };
        a.prototype.detachEvent = function(e, f, l) {
            var m = this.mEventRegistry;
            var c = m[e];
            if (!Array.isArray(c)) {
                return this; }
            var L = false;
            for (var i = 0, d = c.length; i < d; i++) {
                if (c[i].fFunction === f && c[i].oListener === l) { c.splice(i, 1);
                    L = true;
                    break; } }
            if (c.length == 0) { delete m[e]; }
            if (L && m[b]) { this.fireEvent(b, { EventId: e, type: 'listenerDetached' }); }
            return this; };
        a.prototype.fireEvent = function(e, p, A, c) {
            if (typeof p === "boolean") { c = A;
                A = p; }
            var P = this,
                d = false,
                f, o, i, l, I;
            do { f = P.mEventRegistry[e];
                if (Array.isArray(f)) { f = f.slice();
                    o = o || this.oEventPool.borrowObject(e, this, p);
                    for (i = 0, l = f.length; i < l; i++) { I = f[i];
                        I.fFunction.call(I.oListener || P, o, I.oData); }
                    c = c && !o.bCancelBubble; }
                P = P.getEventingParent(); } while (c && P);
            if (o) { d = o.bPreventDefault;
                this.oEventPool.returnObject(o); }
            return A ? !d : this; };
        a.prototype.hasListeners = function(e) {
            return !!this.mEventRegistry[e]; };
        a.getEventList = function(e) {
            return e.mEventRegistry; };
        a.prototype.getEventingParent = function() {
            return null; };
        a.prototype.toString = function() {
            if (this.getMetadata) {
                return "EventProvider " + this.getMetadata().getName(); } else {
                return "EventProvider"; } };
        a.prototype.destroy = function() { this.mEventRegistry = {};
            B.prototype.destroy.apply(this, arguments); };
        return a; });
    sap.ui.predefine('sap/ui/base/Exception', function() { "use strict";
        var E = function(m) { this.name = "Exception";
            this.message = m; };
        return E; }, true);
    sap.ui.predefine('sap/ui/base/ExpressionParser', ['jquery.sap.global', 'sap/ui/thirdparty/URI', 'jquery.sap.strings'], function(q, U) {
        "use strict";
        //License granted by Douglas Crockford to SAP, Apache License 2.0
        //    (http://www.apache.org/licenses/LICENSE-2.0)
        var u = f.bind(null, undefined),
            d = { "Array": Array, "Boolean": Boolean, "Date": Date, "encodeURIComponent": encodeURIComponent, "Infinity": Infinity, "isFinite": isFinite, "isNaN": isNaN, "JSON": JSON, "Math": Math, "NaN": NaN, "Number": Number, "Object": Object, "odata": { "compare": function() {
                        var O;
                        q.sap.require("sap.ui.model.odata.ODataUtils");
                        O = sap.ui.require("sap/ui/model/odata/ODataUtils");
                        return O.compare.apply(O, arguments); }, "fillUriTemplate": function() {
                        if (!U.expand) { q.sap.require("sap.ui.thirdparty.URITemplate"); }
                        return U.expand.apply(U, arguments).toString(); }, "uriEncode": function() {
                        var O;
                        q.sap.require("sap.ui.model.odata.ODataUtils");
                        O = sap.ui.require("sap/ui/model/odata/ODataUtils");
                        return O.formatValue.apply(O, arguments); } }, "parseFloat": parseFloat, "parseInt": parseInt, "RegExp": RegExp, "String": String, "undefined": undefined },
            r = /\d/,
            E = "sap.ui.base.ExpressionParser",
            a = /[a-z]\w*/i,
            b = /[a-z]/i,
            p = [E],
            P = E + "#parse",
            s = { "BINDING": { led: l, nud: function(T, e) {
                        return B.bind(null, T.value); } }, "IDENTIFIER": { led: l, nud: function(T, e) {
                        if (!(T.value in e.globals)) { q.sap.log.warning("Unsupported global identifier '" + T.value + "' in expression parser input '" + e.input + "'", undefined, E); }
                        return f.bind(null, e.globals[T.value]); } }, "CONSTANT": { led: l, nud: function(T, e) {
                        return f.bind(null, T.value); } }, ".": { lbp: 18, led: function(T, e, L) {
                        return D.bind(null, L, e.advance("IDENTIFIER").value); }, nud: l }, "(": { lbp: 17, led: function(T, e, L) {
                        var i = [],
                            v = true;
                        while (e.current().id !== ")") {
                            if (v) { v = false; } else { e.advance(","); }
                            i.push(e.expression(0)); }
                        e.advance(")");
                        return F.bind(null, L, i); }, nud: function(T, e) {
                        var v = e.expression(0);
                        e.advance(")");
                        return v; } }, "[": { lbp: 18, led: function(T, e, L) {
                        var N = e.expression(0);
                        e.advance("]");
                        return g.bind(null, L, N); }, nud: function(T, e) {
                        var i = [],
                            v = true;
                        while (e.current().id !== "]") {
                            if (v) { v = false; } else { e.advance(","); }
                            i.push(e.current().id === "," ? u : e.expression(0)); }
                        e.advance("]");
                        return A.bind(null, i); } }, "!": { lbp: 15, led: l, nud: function(T, e) {
                        return h.bind(null, e.expression(this.lbp), function(x) {
                            return !x; }); } }, "typeof": { lbp: 15, led: l, nud: function(T, e) {
                        return h.bind(null, e.expression(this.lbp), function(x) {
                            return typeof x; }); } }, "?": { lbp: 4, led: function(T, e, L) {
                        var i, v;
                        v = e.expression(this.lbp - 1);
                        e.advance(":");
                        i = e.expression(this.lbp - 1);
                        return C.bind(null, L, v, i); }, nud: l }, ")": { led: l, nud: l }, "]": { led: l, nud: l }, "{": { led: l, nud: function(T, e) {
                        var i = true,
                            K, v = {},
                            V;
                        while (e.current().id !== "}") {
                            if (i) { i = false; } else { e.advance(","); }
                            if (e.current() && e.current().id === "CONSTANT" && typeof e.current().value === "string") { K = e.advance().value; } else { K = e.advance("IDENTIFIER").value; }
                            e.advance(":");
                            V = e.expression(0);
                            v[K] = V; }
                        e.advance("}");
                        return M.bind(null, v); } }, "}": { lbp: -1, led: l, nud: l }, ",": { led: l, nud: l }, ":": { led: l, nud: l } },
            t = ["===", "!==", "!", "||", "&&", ".", "(", ")", "{", "}", ":", ",", "?", "*", "/", "%", "+", "-", "<=", "<", ">=", ">", "[", "]"],
            c;
        t.forEach(function(T, i) { t[i] = q.sap.escapeRegExp(T); });
        c = new RegExp(t.join("|"), "g");
        j("*", 14, function(x, y) {
            return x * y; });
        j("/", 14, function(x, y) {
            return x / y; });
        j("%", 14, function(x, y) {
            return x % y; });
        j("+", 13, function(x, y) {
            return x + y; }).nud = function(T, e) {
            return h.bind(null, e.expression(this.lbp), function(x) {
                return +x; }); };
        j("-", 13, function(x, y) {
            return x - y; }).nud = function(T, e) {
            return h.bind(null, e.expression(this.lbp), function(x) {
                return -x; }); };
        j("<=", 11, function(x, y) {
            return x <= y; });
        j("<", 11, function(x, y) {
            return x < y; });
        j(">=", 11, function(x, y) {
            return x >= y; });
        j(">", 11, function(x, y) {
            return x > y; });
        j("in", 11, function(x, y) {
            return x in y; });
        j("===", 10, function(x, y) {
            return x === y; });
        j("!==", 10, function(x, y) {
            return x !== y; });
        j("&&", 7, function(x, y) {
            return x && y(); }, true);
        j("||", 6, function(x, y) {
            return x || y(); }, true);

        function A(e, v) {
            var R = [];
            e.forEach(function(w, i) { R[i] = w(v); });
            return R; }

        function B(i, e) {
            return e[i]; }

        function C(e, T, i, v) {
            return e(v) ? T(v) : i(v); }

        function f(v) {
            return v; }

        function D(L, i, e) {
            var v = L(e),
                w = v[i];
            return typeof w === "function" ? w.bind(v) : w; }

        function F(L, e, v) {
            var R = [];
            e.forEach(function(w, i) { R[i] = w(v); });
            return L(v).apply(null, R); }

        function I(L, R, O, e, i) {
            return O(L(i), e ? R.bind(null, i) : R(i)); }

        function M(e, i) {
            var K, R = {};
            for (K in e) { R[K] = e[K](i); }
            return R; }

        function g(L, N, e) {
            return L(e)[N(e)]; }

        function h(R, O, e) {
            return O(R(e)); }

        function j(i, e, O, L) { s[i] = { lbp: e, led: function(T, v, w) {
                    var x = L ? this.lbp - 1 : this.lbp;
                    return I.bind(null, w, v.expression(x), O, L); }, nud: l };
            return s[i]; }

        function k(e, i, v) {
            var w = new SyntaxError(e);
            w.at = v;
            w.text = i;
            if (v !== undefined) { e += " at position " + v; }
            q.sap.log.error(e, i, E);
            throw w; }

        function l(T) {
            var e = T.input.slice(T.start, T.end);
            k("Unexpected " + T.id + (e !== T.id ? ": " + e : ""), T.input, T.start + 1); }

        function m(R, v, S) {
            var w = [],
                x = [],
                t = [],
                T = q.sap._createJSTokenizer();

            function y(G, S) {
                var H, i;

                function J() {
                    var K;
                    for (K in G) {
                        if (K !== "path" && K !== "model") {
                            return true; } }
                    return false; }
                if (J()) { H = q.sap.parseJS(v, S).result; } else { H = G; }
                for (i = 0; i < x.length; i += 1) {
                    if (q.sap.equal(w[i], H)) {
                        return i; } }
                w[i] = H;
                x[i] = G;
                return i; }

            function z() {
                var i, G, H, J, K;
                T.white();
                i = T.getCh();
                H = T.getIndex();
                if (b.test(i)) { J = a.exec(v.slice(H));
                    switch (J[0]) {
                        case "false":
                        case "null":
                        case "true":
                            K = { id: "CONSTANT", value: T.word() };
                            break;
                        case "in":
                        case "typeof":
                            K = { id: J[0] };
                            T.setIndex(H + J[0].length);
                            break;
                        default:
                            K = { id: "IDENTIFIER", value: J[0] };
                            T.setIndex(H + J[0].length); } } else if (r.test(i) || i === "." && r.test(v.charAt(T.getIndex() + 1))) { K = { id: "CONSTANT", value: T.number() }; } else if (i === "'" || i === '"') { K = { id: "CONSTANT", value: T.string() }; } else if (i === "$") { T.next("$");
                    T.next("{");
                    G = R(v, T.getIndex() - 1);
                    K = { id: "BINDING", value: y(G.result, H + 1) };
                    T.setIndex(G.at); } else { c.lastIndex = H;
                    J = c.exec(v);
                    if (!J || J.index !== H) {
                        return false; }
                    K = { id: J[0] };
                    T.setIndex(H + J[0].length); }
                K.input = v;
                K.start = H;
                K.end = T.getIndex();
                t.push(K);
                return true; }
            T.init(v, S);
            try {
                while (z()) {} } catch (e) {
                if (e.name === "SyntaxError") { k(e.message, e.text, e.at); } else {
                    throw e; } }
            return { at: T.getIndex(), parts: x, tokens: t }; }

        function n(e, i) {
            return function() {
                try {
                    return e.apply(this, arguments); } catch (v) { q.sap.log.warning(String(v), i, E); } }; }

        function o(t, i, G) {
            var e, N = 0,
                v = { advance: w, current: x, expression: y, globals: G, input: i },
                T;

            function w(z) {
                var T = t[N];
                if (z) {
                    if (!T) { k("Expected " + z + " but instead saw end of input", i); } else if (T.id !== z) { k("Expected " + z + " but instead saw " + i.slice(T.start, T.end), i, T.start + 1); } }
                N += 1;
                return T; }

            function x() {
                return t[N]; }

            function y(z) {
                var L;
                T = w();
                if (!T) { k("Expected expression but instead saw end of input", i); }
                L = s[T.id].nud(T, v);
                while (N < t.length) { T = x();
                    if (z >= (s[T.id].lbp || 0)) {
                        break; }
                    w();
                    L = s[T.id].led(T, v, L); }
                return L; }
            e = y(0);
            return { at: x() ? x().start : undefined, formatter: n(e, i) }; }
        return { parse: function(R, i, S, G) {
                var e, T;
                q.sap.measure.average(P, "", p);
                T = m(R, i, S);
                e = o(T.tokens, i, G || d);
                q.sap.measure.end(P);
                if (!T.parts.length) {
                    return { constant: e.formatter(), at: e.at || T.at }; }

                function v() {
                    return e.formatter(arguments); }
                v.textFragments = true;
                return { result: { formatter: v, parts: T.parts }, at: e.at || T.at }; } };
    }, true);
    /*!
     * UI development toolkit for HTML5 (OpenUI5)
     * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
     * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
     */
    sap.ui.predefine('sap/ui/base/Interface', ['jquery.sap.global'], function(q) { "use strict";
        var I = function(o, m) {
            if (!o) {
                return o; }

            function c(o, M) {
                return function() {
                    var t = o[M].apply(o, arguments);
                    return (t instanceof sap.ui.base.Object) ? t.getInterface() : t; }; }
            if (!m) {
                return {}; }
            var M;
            for (var i = 0, a = m.length; i < a; i++) { M = m[i];
                this[M] = c(o, M); } };
        return I; }, true);
    sap.ui.predefine('sap/ui/base/ManagedObject', ['jquery.sap.global', './BindingParser', './DataType', './EventProvider', './ManagedObjectMetadata', '../model/BindingMode', '../model/CompositeBinding', '../model/Context', '../model/FormatException', '../model/ListBinding', '../model/Model', '../model/ParseException', '../model/TreeBinding', '../model/Type', '../model/ValidateException', 'jquery.sap.act', 'jquery.sap.script', 'jquery.sap.strings'], function(q, B, D, E, M, b, C, d, F, L, f, P, T, g, V) { "use strict";
        var I;
        var h = E.extend("sap.ui.base.ManagedObject", { metadata: { "abstract": true, publicMethods: ["getId", "getMetadata", "getModel", "setModel", "hasModel", "bindProperty", "unbindProperty", "bindAggregation", "unbindAggregation", "bindObject", "unbindObject", "getObjectBinding"], library: "sap.ui.core", properties: {}, aggregations: {}, associations: {}, events: { "validationSuccess": { enableEventBubbling: true, parameters: { element: { type: 'sap.ui.base.ManagedObject' }, property: { type: 'string' }, type: { type: 'sap.ui.model.Type' }, newValue: { type: 'any' }, oldValue: { type: 'any' } } }, "validationError": { enableEventBubbling: true, parameters: { element: { type: 'sap.ui.base.ManagedObject' }, property: { type: 'string' }, type: { type: 'sap.ui.model.Type' }, newValue: { type: 'any' }, oldValue: { type: 'any' }, message: { type: 'string' } } }, "parseError": { enableEventBubbling: true, parameters: { element: { type: 'sap.ui.base.ManagedObject' }, property: { type: 'string' }, type: { type: 'sap.ui.model.Type' }, newValue: { type: 'any' }, oldValue: { type: 'any' }, message: { type: 'string' } } }, "formatError": { enableEventBubbling: true, parameters: { element: { type: 'sap.ui.base.ManagedObject' }, property: { type: 'string' }, type: { type: 'sap.ui.model.Type' }, newValue: { type: 'any' }, oldValue: { type: 'any' } } } }, specialSettings: { id: true, models: true, bindingContexts: true, objectBindings: true, Type: true } }, constructor: function(i, s, o) {
                var t = this;
                E.call(this);
                if (typeof i !== 'string' && i !== undefined) { o = s;
                    s = i;
                    i = s && s.id; }
                if (!i) { i = this.getMetadata().uid(); } else {
                    var p = h._fnIdPreprocessor;
                    i = (p ? p.call(this, i) : i);
                    var a = I || (I = D.getType("sap.ui.core.ID"));
                    if (!a.isValid(i)) {
                        throw new Error("\"" + i + "\" is not a valid ID."); } }
                this.sId = i;
                this.mProperties = this.getMetadata().createPropertyBag();
                this.mAggregations = {};
                this.mAssociations = {};
                this.oParent = null;
                this.aDelegates = [];
                this.aBeforeDelegates = [];
                this.iSuppressInvalidate = 0;
                this.oPropagatedProperties = h._oEmptyPropagatedProperties;
                this.mSkipPropagation = {};
                this.oModels = {};
                this.oBindingContexts = {};
                this.mElementBindingContexts = {};
                this.mBindingInfos = {};
                this.sBindingPath = null;
                this.mBindingParameters = null;
                this.mBoundObjects = {};
                this._sOwnerId = h._sOwnerId;
                (function() {
                    try {
                        if (t.register) { t.register(); }
                        if (t._initCompositeSupport) { t._initCompositeSupport(s); }
                        if (t.init) { t.init(); }
                        t.applySettings(s, o); } catch (e) {
                        if (t.deregister) { t.deregister(); }
                        throw e; } }()); } }, M);
        h.create = function(v, K, s) {
            if (!v || v instanceof h || typeof v !== "object" || v instanceof String) {
                return v; }

            function a(t) {
                if (typeof t === "function") {
                    return t; }
                if (typeof t === "string") {
                    return q.sap.getObject(t); } }
            var c = a(v.Type) || a(K && K.type);
            if (typeof c === "function") {
                return new c(v, s); }
            var m = "Don't know how to create a ManagedObject from " + v + " (" + (typeof v) + ")";
            q.sap.log.fatal(m);
            throw new Error(m); };
        var S;

        function j(i) {
            if (!S) { S = sap.ui.require("sap/ui/core/StashedControlSupport"); }
            if (S) {
                return S.getStashedControls(i); }
            return []; }
        h._fnIdPreprocessor = null;
        h._fnSettingsPreprocessor = null;
        h.runWithPreprocessors = function(a, p) {
            var o = { id: this._fnIdPreprocessor, settings: this._fnSettingsPreprocessor };
            p = p || {};
            this._fnIdPreprocessor = p.id;
            this._fnSettingsPreprocessor = p.settings;
            try {
                var r = a.call();
                this._fnIdPreprocessor = o.id;
                this._fnSettingsPreprocessor = o.settings;
                return r; } catch (e) { this._fnIdPreprocessor = o.id;
                this._fnSettingsPreprocessor = o.settings;
                throw e; } };
        h.prototype.applySettings = function(s, o) {
            if (!s || q.isEmptyObject(s)) {
                return this; }
            var t = this,
                m = this.getMetadata(),
                v = m.getJSONKeys(),
                a = h.create,
                p = h._fnSettingsPreprocessor,
                K, c, e;

            function n(O) {
                for (var i = 0, u = O.length; i < u; i++) {
                    var w = O[i];
                    if (Array.isArray(w)) { n(w); } else { t[e._sMutator](a(w, e, o)); } } }
            p && p.call(this, s);
            if (s.models) {
                if (typeof s.models !== "object") {
                    throw new Error("models must be a simple object"); }
                if (s.models instanceof f) { this.setModel(s.models); } else {
                    for (K in s.models) { this.setModel(s.models[K], K === "undefined" ? undefined : K); } } }
            if (s.bindingContexts) {
                if (typeof s.bindingContexts !== "object") {
                    throw new Error("bindingContexts must be a simple object"); }
                if (s.bindingContexts instanceof d) { this.setBindingContext(s.bindingContexts); } else {
                    for (K in s.bindingContexts) { this.setBindingContext(s.bindingContexts[K], K === "undefined" ? undefined : K); } } }
            if (s.objectBindings) {
                if (typeof s.objectBindings !== "string" && typeof s.objectBindings !== "object") {
                    throw new Error("binding must be a string or simple object"); }
                if (typeof s.objectBindings === "string" || s.objectBindings.path) { this.bindObject(s.objectBindings); } else {
                    for (var K in s.objectBindings) { s.objectBindings.model = K;
                        this.bindObject(s.objectBindings[K]); } } }
            for (K in s) { c = s[K];
                if ((e = v[K]) !== undefined) {
                    var r;
                    switch (e._iKind) {
                        case 0:
                            r = this.extractBindingInfo(c, o);
                            if (r && typeof r === "object") { this.bindProperty(K, r); } else { this[e._sMutator](r || c); }
                            break;
                        case 1:
                            r = e.altTypes && this.extractBindingInfo(c, o);
                            if (r && typeof r === "object") { this.bindProperty(K, r); } else {
                                if (Array.isArray(c)) {
                                    if (c.length > 1) { q.sap.log.error("Tried to add an array of controls to a single aggregation"); }
                                    c = c[0]; }
                                this[e._sMutator](a(r || c, e, o)); }
                            break;
                        case 2:
                            r = this.extractBindingInfo(c, o);
                            if (r && typeof r === "object") { this.bindAggregation(K, r); } else { c = r || c;
                                if (c) {
                                    if (Array.isArray(c)) { n(c); } else { t[e._sMutator](a(c, e, o)); } } }
                            break;
                        case 3:
                            this[e._sMutator](c);
                            break;
                        case 4:
                            if (c) {
                                if (Array.isArray(c)) {
                                    for (var i = 0, l = c.length; i < l; i++) { this[e._sMutator](c[i]); } } else { this[e._sMutator](c); } }
                            break;
                        case 5:
                            if (typeof c == "function") { this[e._sMutator](c); } else { this[e._sMutator](c[0], c[1], c[2]); }
                            break;
                        case -1:
                        default:
                            break; } } else {} }
            return this; };
        h.prototype.toString = function() {
            return "ManagedObject " + this.getMetadata().getName() + "#" + this.getId(); };
        h.prototype.getId = function() {
            return this.sId; };
        h.prototype.setProperty = function(p, v, s) {
            var o = this.mProperties[p];
            v = this.validateProperty(p, v);
            if (q.sap.equal(o, v)) {
                return this; }
            if (s) { q.sap.act.refresh();
                this.iSuppressInvalidate++; }
            this.mProperties[p] = v;
            if (!this.isInvalidateSuppressed()) { this.invalidate(); }
            this.updateModelProperty(p, v, o);
            if (this.mEventRegistry["_change"]) { E.prototype.fireEvent.call(this, "_change", { "id": this.getId(), "name": p, "oldValue": o, "newValue": v }); }
            if (s) { this.iSuppressInvalidate--; }
            return this; };
        h.prototype.getProperty = function(p) {
            var v = this.mProperties[p],
                o = this.getMetadata().getProperty(p),
                t;
            if (!o) {
                throw new Error("Property \"" + p + "\" does not exist in " + this); }
            t = D.getType(o.type);
            if (t instanceof D && t.isArrayType() && q.isArray(v)) { v = v.slice(0); }
            if (v instanceof String) { v = v.valueOf(); }
            return v; };
        h.prototype.validateProperty = function(p, v) {
            var o = this.getMetadata().getProperty(p),
                t;
            if (!o) {
                throw new Error("Property \"" + p + "\" does not exist in " + this); }
            t = D.getType(o.type);
            if (t instanceof D && t.isArrayType() && q.isArray(v)) { v = v.slice(0); }
            if (v === null || v === undefined) {
                if (o.defaultValue !== null) { v = o.defaultValue; } else { v = t.getDefaultValue(); } } else if (t instanceof D) {
                if (t.getName() == "string") {
                    if (!(typeof v == "string" || v instanceof String)) { v = "" + v; } } else if (t.getName() == "string[]") {
                    if (typeof v == "string") { v = [v]; }
                    if (!q.isArray(v)) {
                        throw new Error("\"" + v + "\" is of type " + typeof v + ", expected string[]" + " for property \"" + p + "\" of " + this); }
                    for (var i = 0; i < v.length; i++) {
                        if (!typeof v[i] == "string") { v[i] = "" + v[i]; } } } else if (!t.isValid(v)) {
                    throw new Error("\"" + v + "\" is of type " + typeof v + ", expected " + t.getName() + " for property \"" + p + "\" of " + this); } }
            if (t && t.normalize && typeof t.normalize === "function") { v = t.normalize(v); }
            return v; };
        h.prototype.getOriginInfo = function(p) {
            var v = this.mProperties[p];
            if (!(v instanceof String && v.originInfo)) {
                return null; }
            return v.originInfo; };
        h.prototype.setAssociation = function(a, i, s) {
            if (i instanceof h) { i = i.getId(); } else if (i != null && typeof i !== "string") {
                return this; }
            if (this.mAssociations[a] === i) {
                return this; }
            if (s) { this.iSuppressInvalidate++; }
            this.mAssociations[a] = i;
            if (!this.isInvalidateSuppressed()) { this.invalidate(); }
            if (s) { this.iSuppressInvalidate--; }
            return this; };
        h.prototype.getAssociation = function(a, o) {
            var r = this.mAssociations[a];
            if (!r) { r = this.mAssociations[a] = o || null; } else {
                if (typeof r.length === 'number' && !(r.propertyIsEnumerable('length'))) {
                    return r.slice(); }
                return r; }
            return r; };
        h.prototype.addAssociation = function(a, i, s) {
            if (i instanceof h) { i = i.getId(); } else if (typeof i !== "string") {
                return this; }
            if (s) { this.iSuppressInvalidate++; }
            var c = this.mAssociations[a];
            if (!c) { c = this.mAssociations[a] = [i]; } else { c.push(i); }
            if (!this.isInvalidateSuppressed()) { this.invalidate(); }
            if (s) { this.iSuppressInvalidate--; }
            return this; };
        h.prototype.removeAssociation = function(a, o, s) {
            var c = this.mAssociations[a];
            var e = null;
            if (!c) {
                return null; }
            if (s) { this.iSuppressInvalidate++; }
            if (typeof(o) == "object" && o.getId) { o = o.getId(); }
            if (typeof(o) == "string") {
                for (var i = 0; i < c.length; i++) {
                    if (c[i] == o) { o = i;
                        break; } } }
            if (typeof(o) == "number") {
                if (o < 0 || o >= c.length) { q.sap.log.warning("ManagedObject.removeAssociation called with invalid index: " + a + ", " + o); } else { e = c[o];
                    c.splice(o, 1);
                    if (!this.isInvalidateSuppressed()) { this.invalidate(); } } }
            if (s) { this.iSuppressInvalidate--; }
            return e; };
        h.prototype.removeAllAssociation = function(a, s) {
            var i = this.mAssociations[a];
            if (!i) {
                return []; }
            if (s) { this.iSuppressInvalidate++; }
            delete this.mAssociations[a];
            if (!this.isInvalidateSuppressed()) { this.invalidate(); }
            if (s) { this.iSuppressInvalidate--; }
            return i; };
        h.prototype.validateAggregation = function(a, o, m) {
            var c = this.getMetadata(),
                A = c.getManagedAggregation(a),
                e, t, i, l;
            if (!A) {
                throw new Error("Aggregation \"" + a + "\" does not exist in " + this); }
            if (A.multiple !== m) {
                throw new Error("Aggregation '" + a + "' of " + this + " used with wrong cardinality (declared as " + (A.multiple ? "0..n" : "0..1") + ")"); }
            if (!A.multiple && !o) {
                return o; }
            t = q.sap.getObject(A.type);
            if (typeof t === "function" && o instanceof t) {
                return o; }
            if (o && o.getMetadata && o.getMetadata().isInstanceOf(A.type)) {
                return o; }
            e = A.altTypes;
            if (e && e.length) {
                if (o == null) {
                    return o; }
                for (i = 0; i < e.length; i++) { t = D.getType(e[i]);
                    if (t instanceof D) {
                        if (t.isValid(o)) {
                            return o; } } } }
            l = "\"" + o + "\" is not valid for aggregation \"" + a + "\" of " + this;
            if (D.isInterfaceType(A.type)) {
                return o; } else {
                throw new Error(l); } };
        h.prototype.setAggregation = function(a, o, s) {
            var O = this.mAggregations[a];
            if (O === o) {
                return this; }
            o = this.validateAggregation(a, o, false);
            if (s) { this.iSuppressInvalidate++; }
            if (O instanceof h) { O.setParent(null); }
            this.mAggregations[a] = o;
            if (o instanceof h) { o.setParent(this, a, s); } else {
                if (!this.isInvalidateSuppressed()) { this.invalidate(); } }
            if (s) { this.iSuppressInvalidate--; }
            return this; };
        h.prototype.getAggregation = function(a, o) {
            var c = this.mAggregations[a];
            if (!c) { c = this.mAggregations[a] = o || null; }
            if (c) {
                if (typeof c.length === 'number' && !(c.propertyIsEnumerable('length'))) {
                    return c.slice(); }
                return c; } else {
                return null; } };
        h.prototype.indexOfAggregation = function(a, o) {
            var c = this.mAggregations[a];
            if (c) {
                if (c.length == undefined) {
                    return -2; }
                for (var i = 0; i < c.length; i++) {
                    if (c[i] == o) {
                        return i; } } }
            return -1; };
        h.prototype.insertAggregation = function(a, o, c, s) {
            if (!o) {
                return this; }
            o = this.validateAggregation(a, o, true);
            var e = this.mAggregations[a] || (this.mAggregations[a] = []);
            var i;
            if (c < 0) { i = 0; } else if (c > e.length) { i = e.length; } else { i = c; }
            if (i !== c) { q.sap.log.warning("ManagedObject.insertAggregation: index '" + c + "' out of range [0," + e.length + "], forced to " + i); }
            e.splice(i, 0, o);
            o.setParent(this, a, s);
            return this; };
        h.prototype.addAggregation = function(a, o, s) {
            if (!o) {
                return this; }
            o = this.validateAggregation(a, o, true);
            var c = this.mAggregations[a];
            if (!c) { c = this.mAggregations[a] = [o]; } else { c.push(o); }
            o.setParent(this, a, s);
            return this; };
        h.prototype.removeAggregation = function(a, o, s) {
            var c = this.mAggregations[a],
                e = null,
                i;
            if (!c) {
                return null; }
            if (s) { this.iSuppressInvalidate++; }
            if (typeof(o) == "string") {
                for (i = 0; i < c.length; i++) {
                    if (c[i] && c[i].getId() === o) { o = i;
                        break; } } }
            if (typeof(o) == "object") {
                for (i = 0; i < c.length; i++) {
                    if (c[i] == o) { o = i;
                        break; } } }
            if (typeof(o) == "number") {
                if (o < 0 || o >= c.length) { q.sap.log.warning("ManagedObject.removeAggregation called with invalid index: " + a + ", " + o); } else { e = c[o];
                    c.splice(o, 1);
                    e.setParent(null);
                    if (!this.isInvalidateSuppressed()) { this.invalidate(); } } }
            if (s) { this.iSuppressInvalidate--; }
            return e; };
        h.prototype.removeAllAggregation = function(a, s) {
            var c = this.mAggregations[a];
            if (!c) {
                return []; }
            if (s) { this.iSuppressInvalidate++; }
            delete this.mAggregations[a];
            for (var i = 0; i < c.length; i++) { c[i].setParent(null); }
            if (!this.isInvalidateSuppressed()) { this.invalidate(); }
            if (s) { this.iSuppressInvalidate--; }
            return c; };
        h.prototype.destroyAggregation = function(a, s) {
            var e = this.mAggregations[a],
                i, l;
            j(this.getId()).forEach(function(c) {
                if (c.sParentAggregationName === a) { c.destroy(); } });
            if (!e) {
                return this; }
            if (s) { this.iSuppressInvalidate++; }
            delete this.mAggregations[a];
            if (e instanceof h) { e.destroy(s); } else if (q.isArray(e)) {
                for (i = e.length - 1; i >= 0; i--) { l = e[i];
                    if (l) { l.destroy(s); } } }
            if (!this.isInvalidateSuppressed()) { this.invalidate(); }
            if (s) { this.iSuppressInvalidate--; }
            return this; };
        h.prototype.invalidate = function() {
            if (this.oParent) { this.oParent.invalidate(this); } };
        h.prototype.isInvalidateSuppressed = function() {
            var i = this.iSuppressInvalidate > 0;
            if (this.oParent && this.oParent instanceof h) { i = i || this.oParent.isInvalidateSuppressed(); }
            return i; };
        h.prototype._removeChild = function(c, a, s) {
            if (!a) { q.sap.log.error("Cannot remove aggregated child without aggregation name.", null, this); } else {
                if (s) { this.iSuppressInvalidate++; }
                var i = this.indexOfAggregation(a, c);
                var A = this.getMetadata().getAggregation(a);
                if (i == -2) {
                    if (A && this[A._sMutator]) { this[A._sMutator](null); } else { this.setAggregation(a, null, s); } } else if (i > -1) {
                    if (A && this[A._sRemoveMutator]) { this[A._sRemoveMutator](i); } else { this.removeAggregation(a, i, s); } }
                if (!this.isInvalidateSuppressed()) { this.invalidate(); }
                if (s) { this.iSuppressInvalidate--; } } };
        h.prototype.setParent = function(p, a, s) {
            if (!p) { this.oParent = null;
                this.sParentAggregationName = null;
                this.oPropagatedProperties = h._oEmptyPropagatedProperties;
                if (!this._bIsBeingDestroyed) { setTimeout(function() {
                        if (!this.oParent) { this.updateBindings(true, null);
                            this.updateBindingContext(false, undefined, true);
                            this.propagateProperties(true); } }.bind(this), 0); }
                q.sap.act.refresh();
                return; }
            if (s) { q.sap.act.refresh();
                this.iSuppressInvalidate++; }
            var o = this.getParent();
            if (o) { o._removeChild(this, this.sParentAggregationName); }
            this.oParent = p;
            this.sParentAggregationName = a;
            this.oPropagatedProperties = p._getPropertiesToPropagate();
            if (this.hasModel()) { this.updateBindings(true, null);
                this.updateBindingContext(false, undefined, true);
                this.propagateProperties(true); }
            if (p && !this.isInvalidateSuppressed()) { p.invalidate(this); }
            if (s) { this.iSuppressInvalidate--; }
            return this; };
        h.prototype.getParent = function() {
            return this.oParent; };
        h.prototype.destroy = function(s) {
            var t = this;
            this._bIsBeingDestroyed = true;
            if (s) { this.iSuppressInvalidate++; }
            if (this.exit) { this.exit(); }
            if (this._exitCompositeSupport) { this._exitCompositeSupport(); }
            for (var a in this.mAggregations) { this.destroyAggregation(a, s); }
            j(this.getId()).forEach(function(c) { c.destroy(); });
            if (this.deregister) { this.deregister(); }
            if (this.oParent && this.sParentAggregationName) { this.oParent._removeChild(this, this.sParentAggregationName, s); }
            delete this.oParent;
            q.each(this.mBindingInfos, function(n, o) {
                if (o.factory) { t.unbindAggregation(n, true); } else { t.unbindProperty(n, true); } });
            q.each(this.mBoundObjects, function(n, o) { t.unbindObject(n, true); });
            if (s) { this.iSuppressInvalidate--; }
            E.prototype.destroy.apply(this, arguments);
            this.setParent = function() {
                throw Error("The object with ID " + t.getId() + " was destroyed and cannot be used anymore."); };
            this.bIsDestroyed = true; };
        h.bindingParser = B.simpleParser;
        h.prototype.isBinding = function(v, K) {
            return typeof this.extractBindingInfo(v) === "object"; };
        h.prototype.extractBindingInfo = function(v, s) {
            if (v && typeof v === "object") {
                if (v.ui5object) { delete v.ui5object; } else if (v.path != undefined || v.parts) {
                    if (v.template) { v.template = h.create(v.template); }
                    return v; } }
            if (typeof v === "string") {
                return h.bindingParser(v, s, true); } };
        h.prototype.getBindingInfo = function(n) {
            return this.mBindingInfos[n]; };
        h.prototype.bindObject = function(p, m) {
            var a = {},
                s, i;
            if (typeof p == "object") {
                var o = p;
                p = o.path;
                m = o.parameters;
                s = o.model;
                a.events = o.events; }
            i = p.indexOf(">");
            a.sBindingPath = p;
            a.mBindingParameters = m;
            if (i > 0) { s = p.substr(0, i);
                a.sBindingPath = p.substr(i + 1); }
            if (this.mBoundObjects[s]) { this.unbindObject(s, true); }
            this.mBoundObjects[s] = a;
            if (this.getModel(s)) { this._bindObject(s, a); }
            return this; };
        h.prototype._bindObject = function(m, o) {
            var a, c, e, t = this;
            var i = function(l) {
                if (a.getBoundContext() === t.getBindingContext(m)) { t.setElementBindingContext(null, m); }
                t.setElementBindingContext(a.getBoundContext(), m); };
            e = this.getModel(m);
            c = this.getBindingContext(m);
            a = e.bindContext(o.sBindingPath, c, o.mBindingParameters);
            a.attachChange(i);
            o.binding = a;
            o.fChangeHandler = i;
            a.attachEvents(o.events);
            a.initialize(); };
        h.prototype.bindContext = function(p) {
            return this.bindObject(p); };
        h.prototype.unbindContext = function(m) {
            return this.unbindObject(m); };
        h.prototype.unbindObject = function(m, _) {
            var o = this.mBoundObjects[m];
            if (o) {
                if (o.binding) { o.binding.detachChange(o.fChangeHandler);
                    o.binding.detachEvents(o.events);
                    o.binding.destroy(); }
                delete this.mBoundObjects[m];
                delete this.mElementBindingContexts[m];
                if (!_) { this.updateBindingContext(false, m);
                    this.propagateProperties(m); } }
            return this; };
        h.prototype.bindProperty = function(n, o, _, a) {
            var s, A = true,
                p = this.getMetadata().getPropertyLikeSetting(n);
            if (!p) {
                throw new Error("Property \"" + n + "\" does not exist in " + this); }
            if (typeof o == "string") { o = { parts: [{ path: o, type: _ instanceof g ? _ : undefined, mode: a }], formatter: typeof _ === 'function' ? _ : undefined }; }
            if (!o.parts) { o.parts = [];
                o.parts[0] = { path: o.path, type: o.type, formatOptions: o.formatOptions, constraints: o.constraints, model: o.model, mode: o.mode };
                delete o.path;
                delete o.mode;
                delete o.model; }
            for (var i = 0; i < o.parts.length; i++) {
                var c = o.parts[i];
                if (typeof c == "string") { c = { path: c };
                    o.parts[i] = c; }
                s = c.path.indexOf(">");
                if (s > 0) { c.model = c.path.substr(0, s);
                    c.path = c.path.substr(s + 1); }
                if (o.formatter && c.mode != b.OneWay && c.mode != b.OneTime) { c.mode = b.OneWay; }
                if (!this.getModel(c.model)) { A = false; } }
            if (this.isBound(n)) { this.unbindProperty(n, true); }
            this.mBindingInfos[n] = o;
            if (A) { this._bindProperty(n, o); }
            return this; };
        h.prototype._bindProperty = function(n, o) {
            var m, c, a, s, e = b.TwoWay,
                t, l, p = this.getMetadata().getPropertyLikeSetting(n),
                r = p._iKind === 0 ? p.type : p.altTypes[0],
                u = this,
                v = [],
                w = function(i) { u.updateProperty(n);
                    var y = a.getDataState();
                    if (y) {
                        var z = y.getControlMessages();
                        if (z && z.length > 0) {
                            var A = sap.ui.getCore().getMessageManager();
                            y.setControlMessages([]);
                            if (z) { A.removeMessages(z); } }
                        y.setInvalidValue(null); }
                    if (a.getBindingMode() === b.OneTime && a.isResolved()) { a.detachChange(w);
                        a.detachEvents(o.events);
                        a.destroy(); } },
                x = function() {
                    var i = a.getDataState();
                    if (!i) {
                        return; }
                    if (u.refreshDataState) { u.refreshDataState(n, i); } };
            c = this.getBindingContext(o.model);
            q.each(o.parts, function(i, y) { c = u.getBindingContext(y.model);
                m = u.getModel(y.model);
                t = y.type;
                if (typeof t == "string") { l = q.sap.getObject(t);
                    t = new l(y.formatOptions, y.constraints); }
                a = m.bindProperty(y.path, c, o.parameters);
                a.setType(t, r);
                a.setFormatter(y.formatter);
                s = y.mode || m.getDefaultBindingMode();
                a.setBindingMode(s);
                if (s != b.TwoWay) { e = b.OneWay; }
                v.push(a); });
            if (v.length > 1 || (o.formatter && o.formatter.textFragments)) { t = o.type;
                if (typeof t == "string") { l = q.sap.getObject(t);
                    t = new l(o.formatOptions, o.constraints); }
                a = new C(v, o.useRawValues);
                a.setType(t, r);
                a.setBindingMode(o.mode || e); } else { a = v[0]; }
            a.attachChange(w);
            if (this.refreshDataState) { a.attachAggregatedDataStateChange(x); }
            a.setFormatter(q.proxy(o.formatter, this));
            o.binding = a;
            o.modelChangeHandler = w;
            o.dataStateChangeHandler = x;
            a.attachEvents(o.events);
            a.initialize(); };
        h.prototype.unbindProperty = function(n, s) {
            var o = this.mBindingInfos[n],
                p = this.getMetadata().getPropertyLikeSetting(n);
            if (o) {
                if (o.binding) { o.binding.detachChange(o.modelChangeHandler);
                    if (this.refreshDataState) { o.binding.detachAggregatedDataStateChange(o.dataStateChangeHandler); }
                    o.binding.detachEvents(o.events);
                    o.binding.destroy(); }
                delete this.mBindingInfos[n];
                if (!s) { this[p._sMutator](null); } }
            return this; };
        h.prototype.updateProperty = function(n) {
            var o = this.mBindingInfos[n],
                a = o.binding,
                p = this.getMetadata().getPropertyLikeSetting(n);
            if (o.skipPropertyUpdate) {
                return; }
            try {
                var v = a.getExternalValue();
                o.skipModelUpdate = true;
                this[p._sMutator](v);
                o.skipModelUpdate = false; } catch (e) { o.skipModelUpdate = false;
                if (e instanceof F) { this.fireFormatError({ element: this, property: n, type: a.getType(), newValue: a.getValue(), oldValue: this[p._sGetter](), exception: e, message: e.message }, false, true);
                    o.skipModelUpdate = true;
                    this[p._sMutator](null);
                    o.skipModelUpdate = false; } else {
                    throw e; } } };
        h.prototype.updateModelProperty = function(n, v, o) {
            if (this.isBound(n)) {
                var a = this.mBindingInfos[n],
                    c = a.binding;
                if (a.skipModelUpdate) {
                    return; }
                if (c && c.getBindingMode() == b.TwoWay) {
                    try { a.skipPropertyUpdate = true;
                        c.setExternalValue(v);
                        a.skipPropertyUpdate = false;
                        var e = c.getExternalValue();
                        if (v != e) { this.updateProperty(n); }
                        if (c.hasValidation()) { this.fireValidationSuccess({ element: this, property: n, type: c.getType(), newValue: v, oldValue: o }, false, true); } } catch (i) { a.skipPropertyUpdate = false;
                        if (i instanceof P) { this.fireParseError({ element: this, property: n, type: c.getType(), newValue: v, oldValue: o, exception: i, message: i.message }, false, true); } else if (i instanceof V) { this.fireValidationError({ element: this, property: n, type: c.getType(), newValue: v, oldValue: o, exception: i, message: i.message }, false, true); } else {
                            throw i; } } } } };
        var k = 1;
        h.prototype.bindAggregation = function(n, o) {
            var p, t, s, a, m = this.getMetadata(),
                A = m.getAggregation(n);
            if (!A) {
                throw new Error("Aggregation \"" + n + "\" does not exist in " + this); }
            if (!A.multiple) { q.sap.log.error("Binding of single aggregation \"" + n + "\" of " + this + " is not supported!"); }
            if (typeof o == "string") { p = arguments[1];
                t = arguments[2];
                s = arguments[3];
                a = arguments[4];
                o = { path: p, sorter: s, filters: a };
                if (t instanceof h) { o.template = t; } else if (typeof t === "function") { o.factory = t; } }
            if (this.isBound(n)) { this.unbindAggregation(n); }
            if (!(o.template || o.factory)) {
                if (A._doesNotRequireFactory) { o.factory = function() {
                        throw new Error("dummy factory called unexpectedly "); }; } else {
                    throw new Error("Missing template or factory function for aggregation " + n + " of " + this + " !"); } }
            if (o.template) {
                if (o.template._sapui_candidateForDestroy) { q.sap.log.warning("A template was reused in a binding, but was already marked as candidate for destroy. You better should declare such a usage with templateShareable:true in the binding configuration.");
                    delete o.template._sapui_candidateForDestroy; }
                if (o.templateShareable === undefined) { o.templateShareable = k; }
                o.factory = function(c) {
                    return o.template.clone(c); }; }
            var i = o.path.indexOf(">");
            if (i > 0) { o.model = o.path.substr(0, i);
                o.path = o.path.substr(i + 1); }
            this.mBindingInfos[n] = o;
            if (this.getModel(o.model)) { this._bindAggregation(n, o); }
            return this; };
        h.prototype._bindAggregation = function(n, o) {
            var t = this,
                a, m = function(i) {
                    var u = "update" + n.substr(0, 1).toUpperCase() + n.substr(1);
                    if (t[u]) {
                        var s = i && i.getParameter("reason");
                        if (s) { t[u](s); } else { t[u](); } } else { t.updateAggregation(n); } },
                c = function(i) {
                    var r = "refresh" + n.substr(0, 1).toUpperCase() + n.substr(1);
                    if (t[r]) { t[r](i.getParameter("reason")); } else { m(i); } };
            var e = this.getModel(o.model);
            if (this.isTreeBinding(n)) { a = e.bindTree(o.path, this.getBindingContext(o.model), o.filters, o.parameters, o.sorter); } else { a = e.bindList(o.path, this.getBindingContext(o.model), o.sorter, o.filters, o.parameters); }
            if (this.bUseExtendedChangeDetection === true) { a.enableExtendedChangeDetection(); }
            o.binding = a;
            o.modelChangeHandler = m;
            o.modelRefreshHandler = c;
            a.attachChange(m);
            a.attachRefresh(c);
            a.attachEvents(o.events);
            a.initialize(); };
        h.prototype.unbindAggregation = function(n, s) {
            var o = this.mBindingInfos[n],
                a = this.getMetadata().getAggregation(n);
            if (o) {
                if (o.binding) { o.binding.detachChange(o.modelChangeHandler);
                    o.binding.detachRefresh(o.modelRefreshHandler);
                    o.binding.detachEvents(o.events);
                    o.binding.destroy(); }
                if (o.template) {
                    if (!o.templateShareable && o.template.destroy) { o.template.destroy(); }
                    if (o.templateShareable === k) { o.template._sapui_candidateForDestroy = true; } }
                delete this.mBindingInfos[n];
                if (!s) { this[a._sDestructor](); } }
            return this; };
        h.prototype.updateAggregation = function(n) {
            var o = this.mBindingInfos[n],
                a = o.binding,
                c = o.factory,
                A = this.getMetadata().getAggregation(n),
                G, e, l, s = A._sMutator + "Group",
                t = this;

            function u(r, l, v, w) {
                var x = r[A._sGetter]() || [],
                    y, z;
                if (x.length > l.length) {
                    for (var i = l.length; i < x.length; i++) { r[A._sRemoveMutator](x[i]);
                        x[i].destroy(); } }
                for (var i = 0; i < l.length; i++) { y = l[i];
                    z = x[i];
                    if (v) { v(y); }
                    if (z) { z.setBindingContext(y, o.model); } else {
                        var H = r.getId() + "-" + i;
                        z = c(H, y);
                        z.setBindingContext(y, o.model);
                        r[A._sMutator](z); }
                    if (w) { w(y, z); } } }

            function m(i) {
                var N = a.getGroup(i);
                if (N.key !== G) {
                    var r;
                    if (o.groupHeaderFactory) { r = o.groupHeaderFactory(N); }
                    t[s](N, r);
                    G = N.key; } }

            function p(i, r) { u(i, r, null, function(v, w) { p(w, a.getNodeContexts(v)); }); }
            if (!o.template) { this[A._sDestructor](); }
            if (a instanceof L) { e = a.isGrouped() && s;
                if (e || a.bWasGrouped) { this[A._sDestructor](); }
                a.bWasGrouped = e;
                l = a.getContexts(o.startIndex, o.length);
                u(this, l, e ? m : null); } else if (a instanceof T) { p(this, a.getRootContexts()); } };
        h.prototype.refreshAggregation = function(n) {
            var o = this.mBindingInfos[n],
                a = o.binding;
            a.getContexts(o.startIndex, o.length); };
        h.prototype.propagateMessages = function(n, m) { q.sap.log.warning("Message for " + this + ", Property " + n); };
        h.prototype.isTreeBinding = function(n) {
            return false; };
        h.prototype.updateBindings = function(u, m) {
            var t = this,
                n, o;

            function a(o) {
                var p = o.parts,
                    i;
                if (p && p.length > 1) {
                    for (i = 0; i < p.length; i++) {
                        if ((u || p[i].model == m) && !o.binding.aBindings[i].updateRequired(t.getModel(p[i].model))) {
                            return true; } } } else if (o.factory) {
                    return (u || o.model == m) && !o.binding.updateRequired(t.getModel(o.model)); } else {
                    return (u || p[0].model == m) && !o.binding.updateRequired(t.getModel(p[0].model)); }
                return false; }

            function c(o) {
                var p = o.parts,
                    i;
                if (p) {
                    for (i = 0; i < p.length; i++) {
                        if (!t.getModel(p[i].model)) {
                            return false; } }
                    return true; } else if (o.factory) {
                    return !!t.getModel(o.model); }
                return false; }
            for (n in this.mBindingInfos) { o = this.mBindingInfos[n];
                if (o.binding && a(o)) {
                    if (this.refreshDataState) { this.refreshDataState(n, o.binding.getDataState()); }
                    o.binding.detachChange(o.modelChangeHandler);
                    if (o.modelRefreshHandler) { o.binding.detachRefresh(o.modelRefreshHandler); }
                    o.binding.detachEvents(o.events);
                    o.binding.destroy();
                    delete o.binding;
                    delete o.modelChangeHandler;
                    delete o.dataStateChangeHandler;
                    delete o.modelRefreshHandler; }
                if (!o.binding && c(o)) {
                    if (o.factory) { this._bindAggregation(n, o); } else { this._bindProperty(n, o); } } } };
        h.prototype.isBound = function(n) {
            return (n in this.mBindingInfos); };
        h.prototype.getObjectBinding = function(m) {
            return this.mBoundObjects[m] && this.mBoundObjects[m].binding; };
        h.prototype.getEventingParent = function() {
            return this.oParent; };
        h.prototype.getBinding = function(n) {
            return this.mBindingInfos[n] && this.mBindingInfos[n].binding; };
        h.prototype.getBindingPath = function(n) {
            var i = this.mBindingInfos[n];
            return i && (i.path || (i.parts && i.parts[0] && i.parts[0].path)); };
        h.prototype.setBindingContext = function(c, m) {
            var o = this.oBindingContexts[m];
            if (o !== c) { this.oBindingContexts[m] = c;
                this.updateBindingContext(false, m);
                this.propagateProperties(m); }
            return this; };
        h.prototype.setElementBindingContext = function(c, m) {
            var o = this.mElementBindingContexts[m];
            if (o !== c) { this.mElementBindingContexts[m] = c;
                this.updateBindingContext(true, m);
                this.propagateProperties(m); }
            return this; };
        h.prototype.updateBindingContext = function(s, a, u) {
            var m, o = {},
                c, e, n, l, i;
            if (u) {
                for (c in this.oModels) {
                    if (this.oModels.hasOwnProperty(c)) { o[c] = c; } }
                for (c in this.oPropagatedProperties.oModels) {
                    if (this.oPropagatedProperties.oModels.hasOwnProperty(c)) { o[c] = c; } } } else { o[a] = a; }
            for (c in o) {
                if (o.hasOwnProperty(c)) { c = c === "undefined" ? undefined : c;
                    m = this.getModel(c);
                    l = this.mBoundObjects[c];
                    if (m && l && l.sBindingPath && !s) {
                        if (!l.binding) { this._bindObject(c, l); } else { e = this._getBindingContext(c);
                            if (e !== l.binding.getContext()) { l.binding.setContext(e); } }
                        continue; }
                    e = this.getBindingContext(c);
                    for (n in this.mBindingInfos) {
                        var p = this.mBindingInfos[n],
                            r = p.binding,
                            t = p.parts;
                        if (!r) {
                            continue; }
                        if (t && t.length > 1) {
                            for (i = 0; i < t.length; i++) {
                                if (t[i].model == c) { r.aBindings[i].setContext(e); } } } else if (p.factory) {
                            if (p.model == c) { r.setContext(e); } } else {
                            if (t[0].model == c) { r.setContext(e); } } } } } };
        h.prototype.getBindingContext = function(m) {
            if (this.mElementBindingContexts[m]) {
                return this.mElementBindingContexts[m]; }
            return this._getBindingContext(m); };
        h.prototype._getBindingContext = function(m) {
            var o = this.getModel(m);
            if (this.oBindingContexts[m]) {
                return this.oBindingContexts[m]; } else if (o && this.oParent && this.oParent.getModel(m) && o != this.oParent.getModel(m)) {
                return undefined; } else {
                return this.oPropagatedProperties.oBindingContexts[m]; } };
        h.prototype.setModel = function(m, n) {
            if (!m && this.oModels[n]) { delete this.oModels[n];
                this.propagateProperties(n);
                this.updateBindings(false, n); } else if (m && m !== this.oModels[n]) { this.oModels[n] = m;
                this.propagateProperties(n);
                this.updateBindingContext(false, n);
                this.updateBindings(false, n); }
            return this; };
        h._oEmptyPropagatedProperties = { oModels: {}, oBindingContexts: {} };
        h.prototype.propagateProperties = function(n) {
            var p = this._getPropertiesToPropagate(),
                u = n === true,
                N = u ? undefined : n,
                a, A, i;
            for (a in this.mAggregations) {
                if (this.mSkipPropagation[a]) {
                    continue; }
                A = this.mAggregations[a];
                if (A instanceof h) { this._propagateProperties(n, A, p, u, N); } else if (A instanceof Array) {
                    for (i = 0; i < A.length; i++) {
                        if (A[i] instanceof h) { this._propagateProperties(n, A[i], p, u, N); } } } } };
        h.prototype._propagateProperties = function(n, o, p, u, N) {
            if (!p) { p = this._getPropertiesToPropagate();
                u = n === true;
                N = u ? undefined : n; }
            if (o.oPropagatedProperties !== p) { o.oPropagatedProperties = p;
                o.updateBindings(u, N);
                o.updateBindingContext(false, N, u);
                o.propagateProperties(n); } };
        h.prototype._getPropertiesToPropagate = function() {
            var n = q.isEmptyObject(this.oModels),
                N = q.isEmptyObject(this.oBindingContexts),
                a = q.isEmptyObject(this.mElementBindingContexts);

            function m(e, o, c, i) {
                return e ? o : q.extend({}, o, c, i); }
            if (N && n && a) {
                return this.oPropagatedProperties; } else {
                return { oModels: m(n, this.oPropagatedProperties.oModels, this.oModels), oBindingContexts: m((N && a), this.oPropagatedProperties.oBindingContexts, this.oBindingContexts, this.mElementBindingContexts) }; } };
        h.prototype.getModel = function(n) {
            return this.oModels[n] || this.oPropagatedProperties.oModels[n]; };
        h.prototype.hasModel = function() {
            return !(q.isEmptyObject(this.oModels) && q.isEmptyObject(this.oPropagatedProperties.oModels)); };
        h.prototype.clone = function(s, a, o) {
            var c = true,
                e = true;
            if (o) { c = !!o.cloneChildren;
                e = !!o.cloneBindings; }
            if (!s) { s = M.uid("clone") || q.sap.uid(); }
            if (!a && c) { a = q.map(this.findAggregatedObjects(true), function(O) {
                    return O.getId(); }); }
            var m = this.getMetadata(),
                n = m._oClass,
                p = this.getId() + "-" + s,
                r = {},
                t = this.mProperties,
                K, N, u, v = h.bindingParser.escape,
                i;
            var w = Object.keys(t);
            i = w.length;
            while (i > 0) { K = w[--i];
                if (!(this.isBound(K) && e)) {
                    if (typeof t[K] === "string") { r[K] = v(t[K]); } else { r[K] = t[K]; } } }
            r["models"] = this.oModels;
            r["bindingContexts"] = this.oBindingContexts;
            if (c) {
                for (N in this.mAggregations) {
                    var A = this.mAggregations[N];
                    if (m.hasAggregation(N) && !(this.isBound(N) && e)) {
                        if (A instanceof h) { r[N] = A.clone(s, a); } else if (q.isArray(A)) { r[N] = [];
                            for (var i = 0; i < A.length; i++) { r[N].push(A[i].clone(s, a)); } } else { r[N] = A; } } }
                var x = j(this.getId());
                for (var i = 0, l = x.length; i < l; i++) {
                    var y = x[i].clone(s);
                    y.sParentId = p;
                    y.sParentAggregationName = x[i].sParentAggregationName; }
                for (N in this.mAssociations) {
                    var z = this.mAssociations[N];
                    if (q.isArray(z)) { z = z.slice(0);
                        for (var i = 0; i < z.length; i++) {
                            if (q.inArray(z[i], a) >= 0) { z[i] += "-" + s; } } } else if (q.inArray(z, a) >= 0) { z += "-" + s; }
                    r[N] = z; } }
            u = new n(p, r);
            for (N in this.mBoundObjects) { u.mBoundObjects[N] = q.extend({}, this.mBoundObjects[N]); }
            for (N in this.mEventRegistry) { u.mEventRegistry[N] = this.mEventRegistry[N].slice(); }
            if (e) {
                for (N in this.mBindingInfos) {
                    var G = this.mBindingInfos[N];
                    var H = q.extend({}, G);
                    if (!G.templateShareable && G.template && G.template.clone) { H.template = G.template.clone(s, a);
                        delete H.factory; } else if (G.templateShareable === k) { G.templateShareable = H.templateShareable = true;
                        q.sap.log.error("A shared template must be marked with templateShareable:true in the binding info"); }
                    delete H.binding;
                    delete H.modelChangeHandler;
                    delete H.dataStateChangeHandler;
                    delete H.modelRefreshHandler;
                    if (G.factory || G.template) { u.bindAggregation(N, H); } else { u.bindProperty(N, H); } } }
            return u; };
        h._handleLocalizationChange = function(p) {
            var i;
            if (p === 1) { q.each(this.oModels, function(n, m) {
                    if (m && m._handleLocalizationChange) { m._handleLocalizationChange(); } }); } else if (p === 2) { q.each(this.mBindingInfos, function(n, o) {
                    var a = o.parts;
                    if (a) {
                        for (i = 0; i < a.length; i++) {
                            if (o.type && o.type._handleLocalizationChange) { o.type._handleLocalizationChange(); } }
                        if (o.modelChangeHandler) { o.modelChangeHandler(); } } }); } };
        h.prototype.findAggregatedObjects = function(r, c) {
            var A = [];
            if (c && !typeof c === "function") { c = null; }

            function e(o) {
                for (var n in o.mAggregations) {
                    var a = o.mAggregations[n];
                    if (q.isArray(a)) {
                        for (var i = 0; i < a.length; i++) {
                            if (!c || c(a[i])) { A.push(a[i]); }
                            if (r) { e(a[i]); } } } else if (a instanceof h) {
                        if (!c || c(a)) { A.push(a); }
                        if (r) { e(a); } } } }
            e(this);
            return A; };
        return h; });
    sap.ui.predefine('sap/ui/base/ManagedObjectMetadata', ['jquery.sap.global', './DataType', './Metadata'], function(q, D, M) { "use strict";
        var b = function(C, o) { M.apply(this, arguments); };
        b.prototype = q.sap.newObject(M.prototype);
        var h = Object.prototype.hasOwnProperty;

        function c(n) {
            return n.charAt(0).toUpperCase() + n.slice(1); }
        var r = /(children|ies|ves|oes|ses|ches|shes|xes|s)$/i;
        var S = { 'children': -3, 'ies': 'y', 'ves': 'f', 'oes': -2, 'ses': -2, 'ches': -2, 'shes': -2, 'xes': -2, 's': -1 };

        function g(n) {
            return n.replace(r, function($, p) {
                var R = S[p.toLowerCase()];
                return typeof R === "string" ? R : p.slice(0, R); }); }

        function e(f, n) {
            return function() { q.sap.log.warning("Usage of deprecated feature: " + n);
                return f.apply(this, arguments); }; }

        function j(o, i) {
            var a = null;
            for (var n in i) {
                if (h.call(i, n) && typeof o[n] === 'undefined') { a = a || {};
                    a[n] = i[n]; } }
            return a; }
        var K = { SPECIAL_SETTING: -1, PROPERTY: 0, SINGLE_AGGREGATION: 1, MULTIPLE_AGGREGATION: 2, SINGLE_ASSOCIATION: 3, MULTIPLE_ASSOCIATION: 4, EVENT: 5 };
        b._guessSingularName = g;

        function k(C, n, i) { i = typeof i !== 'object' ? { type: i } : i;
            this.name = n;
            this.type = i.type || 'any';
            this._oParent = C;
            this._sUID = "special:" + n;
            this._iKind = K.SPECIAL_SETTING; }

        function P(C, n, i) { i = typeof i !== 'object' ? { type: i } : i;
            this.name = n;
            this.type = i.type || 'string';
            this.group = i.group || 'Misc';
            this.defaultValue = i.defaultValue !== null ? i.defaultValue : null;
            this.bindable = !!i.bindable;
            this.deprecated = !!i.deprecated || false;
            this.visibility = 'public';
            this.appData = j(this, i);
            this._oParent = C;
            this._sUID = n;
            this._iKind = K.PROPERTY;
            var N = c(n);
            this._sMutator = 'set' + N;
            this._sGetter = 'get' + N;
            if (this.bindable) { this._sBind = 'bind' + N;
                this._sUnbind = 'unbind' + N; } else { this._sBind = this._sUnbind = undefined; }
            this._oType = null; }
        P.prototype.generate = function(a) {
            var t = this,
                n = t.name;
            a(t._sGetter, function() {
                return this.getProperty(n); });
            a(t._sMutator, function(v) { this.setProperty(n, v);
                return this; }, t);
            if (t.bindable) { a(t._sBind, function(p, f, m) { this.bindProperty(n, p, f, m);
                    return this; }, t);
                a(t._sUnbind, function(p) { this.unbindProperty(n, p);
                    return this; }); } };
        P.prototype.getType = function() {
            return this._oType || (this._oType = D.getType(this.type)); };
        P.prototype.get = function(t) {
            return t[this._sGetter](); };
        P.prototype.set = function(t, v) {
            return t[this._sMutator](v); };

        function A(C, n, i) { i = typeof i !== 'object' ? { type: i } : i;
            this.name = n;
            this.type = i.type || 'sap.ui.core.Control';
            this.altTypes = i.altTypes || undefined;
            this.multiple = typeof i.multiple === 'boolean' ? i.multiple : true;
            this.singularName = this.multiple ? i.singularName || g(n) : undefined;
            this.bindable = !!i.bindable;
            this.deprecated = i.deprecated || false;
            this.visibility = i.visibility || 'public';
            this._doesNotRequireFactory = !!i._doesNotRequireFactory;
            this.appData = j(this, i);
            this._oParent = C;
            this._sUID = 'aggregation:' + n;
            this._iKind = this.multiple ? K.MULTIPLE_AGGREGATION : K.SINGLE_AGGREGATION;
            var N = c(n);
            this._sGetter = 'get' + N;
            if (this.multiple) {
                var a = c(this.singularName);
                this._sMutator = 'add' + a;
                this._sInsertMutator = 'insert' + a;
                this._sRemoveMutator = 'remove' + a;
                this._sRemoveAllMutator = 'removeAll' + N;
                this._sIndexGetter = 'indexOf' + a; } else { this._sMutator = 'set' + N;
                this._sInsertMutator = this._sRemoveMutator = this._sRemoveAllMutator = this._sIndexGetter = undefined; }
            this._sDestructor = 'destroy' + N;
            if (this.bindable) { this._sBind = 'bind' + N;
                this._sUnbind = 'unbind' + N; } else { this._sBind = this._sUnbind = undefined; } }
        A.prototype.generate = function(d) {
            var m = this,
                n = m.name;
            if (!m.multiple) { d(m._sGetter, function() {
                    return this.getAggregation(n); });
                d(m._sMutator, function(v) { this.setAggregation(n, v);
                    return this; }, m); } else { d(m._sGetter, function() {
                    return this.getAggregation(n, []); });
                d(m._sMutator, function(a) { this.addAggregation(n, a);
                    return this; }, m);
                d(m._sInsertMutator, function(i, a) { this.insertAggregation(n, i, a);
                    return this; }, m);
                d(m._sRemoveMutator, function(a) {
                    return this.removeAggregation(n, a); });
                d(m._sRemoveAllMutator, function() {
                    return this.removeAllAggregation(n); });
                d(m._sIndexGetter, function(a) {
                    return this.indexOfAggregation(n, a); }); }
            d(m._sDestructor, function() { this.destroyAggregation(n);
                return this; });
            if (m.bindable) { d(m._sBind, function(p, t, s, f) { this.bindAggregation(n, p, t, s, f);
                    return this; }, m);
                d(m._sUnbind, function(p) { this.unbindAggregation(n, p);
                    return this; }); } };
        A.prototype.getType = function() {
            return this._oType || (this._oType = D.getType(this.type)); };
        A.prototype.get = function(t) {
            return t[this._sGetter](); };
        A.prototype.set = function(t, v) {
            return t[this._sMutator](v); };
        A.prototype.add = function(t, v) {
            return t[this._sMutator](v); };
        A.prototype.insert = function(t, v, p) {
            return t[this._sInsertMutator](v, p); };
        A.prototype.remove = function(t, v) {
            return t[this._sRemoveMutator](v); };
        A.prototype.removeAll = function(t) {
            return t[this._sRemoveAllMutator](); };
        A.prototype.indexOf = function(t, v) {
            return t[this._sIndexGetter](v); };

        function l(C, n, i) { i = typeof i !== 'object' ? { type: i } : i;
            this.name = n;
            this.type = i.type || 'sap.ui.core.Control';
            this.multiple = i.multiple || false;
            this.singularName = this.multiple ? i.singularName || g(n) : undefined;
            this.deprecated = i.deprecated || false;
            this.visibility = 'public';
            this.appData = j(this, i);
            this._oParent = C;
            this._sUID = 'association:' + n;
            this._iKind = this.multiple ? K.MULTIPLE_ASSOCIATION : K.SINGLE_ASSOCIATION;
            var N = c(n);
            this._sGetter = 'get' + N;
            if (this.multiple) {
                var a = c(this.singularName);
                this._sMutator = 'add' + a;
                this._sRemoveMutator = 'remove' + a;
                this._sRemoveAllMutator = 'removeAll' + a; } else { this._sMutator = 'set' + N;
                this._sRemoveMutator = this._sRemoveAllMutator = undefined; } }
        l.prototype.generate = function(d) {
            var t = this,
                n = t.name;
            if (!t.multiple) { d(t._sGetter, function() {
                    return this.getAssociation(n); });
                d(t._sMutator, function(v) { this.setAssociation(n, v);
                    return this; }, t); } else { d(t._sGetter, function() {
                    return this.getAssociation(n, []); });
                d(t._sMutator, function(a) { this.addAssociation(n, a);
                    return this; }, t);
                d(t._sRemoveMutator, function(a) {
                    return this.removeAssociation(n, a); });
                d(t._sRemoveAllMutator, function() {
                    return this.removeAllAssociation(n); }); } };
        l.prototype.getType = function() {
            return this._oType || (this._oType = D.getType(this.type)); };
        l.prototype.get = function(t) {
            return t[this._sGetter](); };
        l.prototype.set = function(t, v) {
            return t[this._sMutator](v); };
        l.prototype.remove = function(t, v) {
            return t[this._sRemoveMutator](v); };
        l.prototype.removeAll = function(t) {
            return t[this._sRemoveAllMutator](); };

        function E(C, n, i) { this.name = n;
            this.allowPreventDefault = i.allowPreventDefault || false;
            this.deprecated = i.deprecated || false;
            this.visibility = 'public';
            this.allowPreventDefault = !!i.allowPreventDefault;
            this.enableEventBubbling = !!i.enableEventBubbling;
            this.appData = j(this, i);
            this._oParent = C;
            this._sUID = 'event:' + n;
            this._iKind = K.EVENT;
            var N = c(n);
            this._sMutator = 'attach' + N;
            this._sDetachMutator = 'detach' + N;
            this._sTrigger = 'fire' + N; }
        E.prototype.generate = function(a) {
            var t = this,
                n = t.name,
                i = t.allowPreventDefault,
                m = t.enableEventBubbling;
            a(t._sMutator, function(d, f, o) { this.attachEvent(n, d, f, o);
                return this; }, t);
            a(t._sDetachMutator, function(f, o) { this.detachEvent(n, f, o);
                return this; });
            a(t._sTrigger, function(p) {
                return this.fireEvent(n, p, i, m); }); };
        E.prototype.attach = function(t, d, f, a) {
            return t[this._sMutator](d, f, a); };
        E.prototype.detach = function(t, f, a) {
            return t[this._sDetachMutator](f, a); };
        E.prototype.fire = function(t, p, a, d) {
            return t[this._sTrigger](p, a, d); };
        b.prototype.metaFactorySpecialSetting = k;
        b.prototype.metaFactoryProperty = P;
        b.prototype.metaFactoryAggregation = A;
        b.prototype.metaFactoryAssociation = l;
        b.prototype.metaFactoryEvent = E;
        b.prototype.applySettings = function(C) {
            var t = this,
                s = C.metadata;
            M.prototype.applySettings.call(this, C);

            function n(I, F) {
                var R = {},
                    N;
                if (I) {
                    for (N in I) {
                        if (h.call(I, N)) { R[N] = new F(t, N, I[N]); } } }
                return R; }

            function f(I, p) {
                var R = {},
                    N;
                for (N in I) {
                    if (p === (I[N].visibility === 'public')) { R[N] = I[N]; } }
                return R; }
            var a = /([a-z][^.]*(?:\.[a-z][^.]*)*)\./;

            function d(N) {
                var m = a.exec(N);
                return (m && m[1]) || ""; }
            this._sLibraryName = s.library || d(this.getName());
            this._mSpecialSettings = n(s.specialSettings, this.metaFactorySpecialSetting);
            this._mProperties = n(s.properties, this.metaFactoryProperty);
            var i = n(s.aggregations, this.metaFactoryAggregation);
            this._mAggregations = f(i, true);
            this._mPrivateAggregations = f(i, false);
            this._sDefaultAggregation = s.defaultAggregation || null;
            this._mAssociations = n(s.associations, this.metaFactoryAssociation);
            this._mEvents = n(s.events, this.metaFactoryEvent);
            if (C.metadata.__version > 1.0) { this.generateAccessors(); } };
        b.prototype.afterApplySettings = function() { M.prototype.afterApplySettings.call(this);
            var p = this.getParent();
            if (p && p instanceof b) { this._mAllEvents = q.extend({}, p._mAllEvents, this._mEvents);
                this._mAllProperties = q.extend({}, p._mAllProperties, this._mProperties);
                this._mAllPrivateAggregations = q.extend({}, p._mAllPrivateAggregations, this._mPrivateAggregations);
                this._mAllAggregations = q.extend({}, p._mAllAggregations, this._mAggregations);
                this._mAllAssociations = q.extend({}, p._mAllAssociations, this._mAssociations);
                this._sDefaultAggregation = this._sDefaultAggregation || p._sDefaultAggregation;
                this._mAllSpecialSettings = q.extend({}, p._mAllSpecialSettings, this._mSpecialSettings); } else { this._mAllEvents = this._mEvents;
                this._mAllProperties = this._mProperties;
                this._mAllPrivateAggregations = this._mPrivateAggregations;
                this._mAllAggregations = this._mAggregations;
                this._mAllAssociations = this._mAssociations;
                this._mAllSpecialSettings = this._mSpecialSettings; } };
        b.Kind = K;
        b.prototype.getLibraryName = function() {
            return this._sLibraryName; };
        b.prototype.addProperty = function(n, i) {
            var p = this._mProperties[n] = new P(this, n, i);
            if (!this._mAllProperties[n]) { this._mAllProperties[n] = p; } };
        b.prototype.hasProperty = function(n) {
            return !!this._mAllProperties[n]; };
        b.prototype.getProperty = function(n) {
            var p = this._mAllProperties[n];
            return typeof p === 'object' ? p : undefined; };
        b.prototype.getProperties = function() {
            return this._mProperties; };
        b.prototype.getAllProperties = function() {
            return this._mAllProperties; };
        b.prototype.hasAggregation = function(n) {
            return !!this._mAllAggregations[n]; };
        b.prototype.getAggregation = function(n) { n = n || this._sDefaultAggregation;
            var a = n ? this._mAllAggregations[n] : undefined;
            return typeof a === 'object' ? a : undefined; };
        b.prototype.getAggregations = function() {
            return this._mAggregations; };
        b.prototype.getAllAggregations = function() {
            return this._mAllAggregations; };
        b.prototype.getAllPrivateAggregations = function() {
            return this._mAllPrivateAggregations; };
        b.prototype.getManagedAggregation = function(a) { a = a || this._sDefaultAggregation;
            var o = a ? this._mAllAggregations[a] || this._mAllPrivateAggregations[a] : undefined;
            return typeof o === 'object' ? o : undefined; };
        b.prototype.getDefaultAggregationName = function() {
            return this._sDefaultAggregation; };
        b.prototype.getDefaultAggregation = function() {
            return this.getAggregation(); };
        b.prototype.getPropertyLikeSetting = function(n) {
            var p = this._mAllProperties[n];
            if (typeof p === 'object') {
                return p; }
            p = this._mAllAggregations[n];
            return (typeof p === 'object' && p.altTypes && p.altTypes.length > 0) ? p : undefined; };
        b.prototype.hasAssociation = function(n) {
            return !!this._mAllAssociations[n]; };
        b.prototype.getAssociation = function(n) {
            var a = this._mAllAssociations[n];
            return typeof a === 'object' ? a : undefined; };
        b.prototype.getAssociations = function() {
            return this._mAssociations; };
        b.prototype.getAllAssociations = function() {
            return this._mAllAssociations; };
        b.prototype.hasEvent = function(n) {
            return !!this._mAllEvents[n]; };
        b.prototype.getEvent = function(n) {
            var o = this._mAllEvents[n];
            return typeof o === 'object' ? o : undefined; };
        b.prototype.getEvents = function() {
            return this._mEvents; };
        b.prototype.getAllEvents = function() {
            return this._mAllEvents; };
        b.prototype.addSpecialSetting = function(n, i) {
            var s = this._mProperties[n] = new k(this, n, i);
            this._mSpecialSettings[n] = s;
            if (!this._mAllSpecialSettings[n]) { this._mAllSpecialSettings[n] = s; } };
        b.prototype.hasSpecialSetting = function(n) {
            return !!this._mAllSpecialSettings[n]; };
        b.prototype.getPropertyDefaults = function() {
            var d = this._mDefaults,
                t;
            if (d) {
                return d; }
            if (this.getParent() instanceof b) { d = q.sap.newObject(this.getParent().getPropertyDefaults()); } else { d = {}; }
            for (var s in this._mProperties) {
                if (this._mProperties[s].defaultValue !== null) { d[s] = this._mProperties[s].defaultValue; } else { t = D.getType(this._mProperties[s].type);
                    if (t instanceof D) { d[s] = t.getDefaultValue(); } } }
            this._mDefaults = d;
            return d; };
        b.prototype.createPropertyBag = function() {
            if (!this._fnPropertyBagFactory) { this._fnPropertyBagFactory = q.sap.factory(this.getPropertyDefaults()); }
            return new(this._fnPropertyBagFactory)(); };
        b.prototype._enrichChildInfos = function() { q.sap.log.error("obsolete call to ManagedObjectMetadata._enrichChildInfos. This private method will be deleted soon"); };
        b.prototype.getJSONKeys = function() {
            if (this._mJSONKeys) {
                return this._mJSONKeys; }
            var a = {},
                J = {};

            function d(m) {
                var n, i, p;
                for (n in m) { i = m[n];
                    p = a[n];
                    if (!p || i._iKind < p._iKind) { a[n] = J[n] = i; }
                    J[i._sUID] = i; } }
            d(this._mAllSpecialSettings);
            d(this.getAllProperties());
            d(this.getAllAggregations());
            d(this.getAllAssociations());
            d(this.getAllEvents());
            this._mJSONKeys = J;
            this._mAllSettings = a;
            return this._mJSONKeys; };
        b.prototype.getAllSettings = function() {
            if (!this._mAllSettings) { this.getJSONKeys(); }
            return this._mAllSettings; };
        b.prototype.removeUnknownSettings = function(s) {
            if (s == null) {
                return s; }
            var v = this.getJSONKeys(),
                R = {},
                n;
            for (n in s) {
                if (h.call(v, n)) { R[n] = s[n]; } }
            return R; };
        b.prototype.generateAccessors = function() {
            var p = this.getClass().prototype,
                a = this.getName() + ".",
                m = this._aPublicMethods,
                n;

            function d(f, i, o) {
                if (!p[f]) { p[f] = (o && o.deprecated) ? e(i, a + o.name) : i; }
                m.push(f); }
            for (n in this._mProperties) { this._mProperties[n].generate(d); }
            for (n in this._mAggregations) { this._mAggregations[n].generate(d); }
            for (n in this._mAssociations) { this._mAssociations[n].generate(d); }
            for (n in this._mEvents) { this._mEvents[n].generate(d); } };
        var u = {};

        function w(i) { i = sap.ui.getCore().getConfiguration().getUIDPrefix() + i;
            u[i] = u[i] || 0;
            return (i + u[i]++); }
        b.uid = w;
        b.prototype.uid = function() {
            var i = this._sUIDToken;
            if (typeof i !== "string") { i = this.getName();
                i = i.slice(i.lastIndexOf('.') + 1);
                i = i.replace(/([a-z])([A-Z])/g, "$1 $2").split(" ").slice(-1)[0];
                i = this._sUIDToken = i.replace(/([^A-Za-z0-9-_.:])|([0-9]+$)/g, "").toLowerCase(); }
            return w(i); };
        b.isGeneratedId = function(i) {
            var p = q.sap.escapeRegExp(sap.ui.getCore().getConfiguration().getUIDPrefix());
            var a = new RegExp("(^|-{1,3})" + p);
            return a.test(i); };
        return b; }, true);
    sap.ui.predefine('sap/ui/base/Metadata', ['jquery.sap.global', 'jquery.sap.script'], function(q) { "use strict";
        var M = function(c, C) {
            if (!C || typeof C.metadata !== "object") { C = { metadata: C || {}, constructor: q.sap.getObject(c) };
                C.metadata.__version = 1.0; }
            C.metadata.__version = C.metadata.__version || 2.0;
            if (typeof C.constructor !== "function") {
                throw Error("constructor for class " + c + " must have been declared before creating metadata for it"); }
            this._sClassName = c;
            this._oClass = C.constructor;
            this.extend(C); };
        M.prototype.extend = function(c) { this.applySettings(c);
            this.afterApplySettings(); };
        M.prototype.applySettings = function(c) {
            var t = this,
                s = c.metadata,
                p;
            if (s.baseType) {
                var P = q.sap.getObject(s.baseType);
                if (typeof P !== "function") { q.sap.log.fatal("base class '" + s.baseType + "' does not exist"); }
                if (P.getMetadata) { this._oParent = P.getMetadata(); } else { this._oParent = new M(s.baseType, {}); } } else { this._oParent = undefined; }
            this._bAbstract = !!s["abstract"];
            this._bFinal = !!s["final"];
            this._sStereotype = s.stereotype || (this._oParent ? this._oParent._sStereotype : "object");
            this._bDeprecated = !!s["deprecated"];
            this._aInterfaces = s.interfaces || [];
            this._aPublicMethods = s.publicMethods || [];
            this._bInterfacesUnique = false;
            p = this._oClass.prototype;
            q.sap.forIn(c, function(n, v) {
                if (n !== "metadata" && n !== "constructor") { p[n] = v;
                    if (!n.match(/^_|^on|^init$|^exit$/)) { t._aPublicMethods.push(n); } } }); };
        M.prototype.afterApplySettings = function() {
            if (this._oParent) { this._aAllPublicMethods = this._oParent._aAllPublicMethods.concat(this._aPublicMethods);
                this._bInterfacesUnique = false; } else { this._aAllPublicMethods = this._aPublicMethods; } };
        M.prototype.getStereotype = function() {
            return this._sStereotype; };
        M.prototype.getName = function() {
            return this._sClassName; };
        M.prototype.getClass = function() {
            return this._oClass; };
        M.prototype.getParent = function() {
            return this._oParent; };
        M.prototype._dedupInterfaces = function() {
            if (!this._bInterfacesUnique) { q.sap.unique(this._aInterfaces);
                q.sap.unique(this._aPublicMethods);
                q.sap.unique(this._aAllPublicMethods);
                this._bInterfacesUnique = true; } };
        M.prototype.getPublicMethods = function() { this._dedupInterfaces();
            return this._aPublicMethods; };
        M.prototype.getAllPublicMethods = function() { this._dedupInterfaces();
            return this._aAllPublicMethods; };
        M.prototype.getInterfaces = function() { this._dedupInterfaces();
            return this._aInterfaces; };
        M.prototype.isInstanceOf = function(I) {
            if (this._oParent) {
                if (this._oParent.isInstanceOf(I)) {
                    return true; } }
            var a = this._aInterfaces;
            for (var i = 0, l = a.length; i < l; i++) {
                if (a[i] === I) {
                    return true; } }
            return false; };
        M.prototype.isAbstract = function() {
            return this._bAbstract; };
        M.prototype.isFinal = function() {
            return this._bFinal; };
        M.prototype.isDeprecated = function() {
            return this._bDeprecated; };
        M.prototype.addPublicMethods = function(m) {
            var n = (m instanceof Array) ? m : arguments;
            Array.prototype.push.apply(this._aPublicMethods, n);
            Array.prototype.push.apply(this._aAllPublicMethods, n);
            this._bInterfacesUnique = false; };
        M.createClass = function(b, c, C, F) {
            if (typeof b === "string") { F = C;
                C = c;
                c = b;
                b = null; }
            F = F || M;
            if (typeof F.preprocessClassInfo === "function") { C = F.preprocessClassInfo(C); }
            C = C || {};
            C.metadata = C.metadata || {};
            if (!C.hasOwnProperty('constructor')) { C.constructor = undefined; }
            var f = C.constructor;
            if (b) {
                if (!f) {
                    if (C.metadata.deprecated) { f = function() { q.sap.log.warning("Usage of deprecated class: " + c);
                            b.apply(this, arguments); }; } else { f = function() { b.apply(this, arguments); }; } }
                f.prototype = q.sap.newObject(b.prototype);
                f.prototype.constructor = f;
                C.metadata.baseType = b.getMetadata().getName(); } else { f = f || function() {};
                delete C.metadata.baseType; }
            C.constructor = f;
            q.sap.setObject(c, f);
            var m = new F(c, C);
            f.getMetadata = f.prototype.getMetadata = q.sap.getter(m);
            if (!f.getMetadata().isFinal()) { f.extend = function(s, S, a) {
                    return M.createClass(f, s, S, a || F); }; }
            return f; };
        return M; }, true);
    sap.ui.predefine('sap/ui/base/Object', ['jquery.sap.global', './Interface', './Metadata'], function(q, I, M) { "use strict";
        var B = M.createClass("sap.ui.base.Object", { constructor: function() {
                if (!(this instanceof B)) {
                    throw Error("Cannot instantiate object: \"new\" is missing!"); } } });
        B.prototype.destroy = function() {};
        B.prototype.getInterface = function() {
            var i = new I(this, this.getMetadata().getAllPublicMethods());
            this.getInterface = q.sap.getter(i);
            return i; };
        B.defineClass = function(c, s, F) {
            var m = new(F || M)(c, s);
            var C = m.getClass();
            C.getMetadata = C.prototype.getMetadata = q.sap.getter(m);
            if (!m.isFinal()) { C.extend = function(S, o, f) {
                    return M.createClass(C, S, o, f || F); }; }
            q.sap.log.debug("defined class '" + c + "'" + (m.getParent() ? " as subclass of " + m.getParent().getName() : ""));
            return m; };
        return B; }, true);
    sap.ui.predefine('sap/ui/base/ObjectPool', ['./Object'], function(B) { "use strict";
        var O = B.extend("sap.ui.base.ObjectPool", { constructor: function(o) { B.call(this);
                this.oObjectClass = o;
                this.aFreeObjects = []; } });
        O.prototype.borrowObject = function() {
            var o = this.aFreeObjects.length == 0 ? new this.oObjectClass() : this.aFreeObjects.pop();
            o.init.apply(o, arguments);
            return o; };
        O.prototype.returnObject = function(o) { o.reset();
            this.aFreeObjects.push(o); };
        return O; });
    sap.ui.predefine('sap/ui/core/BusyIndicatorUtils', ['jquery.sap.global', 'sap/ui/Device'], function(q, D) { "use strict";
        var B = function() {};
        B.getElement = function(s) {
            var S = "sapUiLocalBusyIndicatorSizeMedium";
            if (s === "Big") { S = "sapUiLocalBusyIndicatorSizeBig"; }
            var c = document.createElement("div");
            c.className = "sapUiLocalBusyIndicator " + S;
            c.setAttribute("role", "progressbar");
            c.setAttribute("aria-valuemin", "0");
            c.setAttribute("aria-valuemax", "100");
            c.setAttribute("alt", "");
            c.setAttribute("tabIndex", "0");
            var a = document.createElement("div");
            a.className = "sapUiLocalBusyIndicatorAnimation sapUiLocalBusyIndicatorAnimStandard";
            a.appendChild(document.createElement("div"));
            a.appendChild(document.createElement("div"));
            a.appendChild(document.createElement("div"));
            c.appendChild(a);
            return c; };
        B.addHTML = function($, b, s) {
            var e = B.getElement(s);
            e.id = b;
            var d = $.get(0);
            d.appendChild(e);
            d.className += " sapUiLocalBusy";
            var a = e.children[0];
            var w = a.offsetWidth;
            e.className += " sapUiLocalBusyIndicatorFade";
            if ($[0].offsetWidth < w) { a.className = "sapUiLocalBusyIndicatorAnimation sapUiLocalBusyIndicatorAnimSmall"; }
            $.attr('aria-busy', true);
            return q(e); };
        B.animateIE9 = { start: function(b) {
                if (b && D.browser.msie && D.browser.version <= 9) {
                    var a = function($, c) {
                        var s = function(t) { $.animate({ opacity: t }, { step: function(n) { $.css("-ms-transform", "scale(" + n + "," + n + ")"); }, complete: function() { s(t == 1 ? 0.3 : 1); }, duration: 700 }, "linear"); };
                        setTimeout(function() { s(0.3); }, c); };
                    var d = b.find(".sapUiLocalBusyIndicatorAnimation > div");
                    for (var i = 0; i < d.length; i++) { a(q(d[i]), i * 300); } } }, stop: function(b) {
                if (b && D.browser.msie && D.browser.version <= 9) {
                    var d = b.find(".sapUiLocalBusyIndicatorAnimation > div");
                    for (var i = 0; i < d.length; i++) { q(d[i]).stop(); } } } };
        return B; }, true);
    sap.ui.predefine('sap/ui/core/Component', ['jquery.sap.global', 'sap/ui/base/ManagedObject', './Manifest', './ComponentMetadata', './Core', 'sap/ui/thirdparty/URI'], function(q, M, a, C, b, U) { "use strict";

        function c(u, o) {
            ['sap-client', 'sap-server'].forEach(function(n) {
                var v = u.get(n);
                if (v && !o.hasSearch(n)) { o.addSearch(n, v); } }); }

        function d(D, m, s, S) {
            if (s) {
                for (var n in D) {
                    if (!m[n] && s[n] && s[n].uri) { m[n] = S; } } } }

        function r(e, o) {
            var g = M._sOwnerId;
            try { M._sOwnerId = o;
                return e.call(); } finally { M._sOwnerId = g; } }
        var f = M.extend("sap.ui.core.Component", { constructor: function(i, s) {
                var e = Array.prototype.slice.call(arguments);
                if (typeof i !== "string") { s = i;
                    i = undefined; }
                if (s && typeof s._manifest === "object") {
                    var o = this.getMetadata();
                    this._oManifest = s._manifest;
                    delete s._manifest;
                    var g = function() {};
                    g.prototype = q.sap.newObject(Object.getPrototypeOf(o));
                    this._oMetadataProxy = new g();
                    this._oMetadataProxy._oMetadata = o;
                    for (var m in o) {
                        if (!/^(getManifest|getManifestEntry)$/.test(m) && typeof o[m] === "function") { this._oMetadataProxy[m] = o[m].bind(o); } }
                    this._oMetadataProxy.getManifest = this.getManifest.bind(this);
                    this._oMetadataProxy.getManifestEntry = this.getManifestEntry.bind(this);
                    this._oMetadataProxy.getMetadataVersion = function() {
                        return 2; };
                    this.getMetadata = function() {
                        return this._oMetadataProxy; }; }
                M.apply(this, e); }, metadata: { stereotype: "component", "abstract": true, specialSettings: { componentData: true }, version: "0.0", includes: [], dependencies: { libs: [], components: [], ui5version: "" }, config: {}, customizing: {}, library: "sap.ui.core" } }, C);
        f.prototype.getManifest = function() {
            if (!this._oManifest) {
                return this.getMetadata().getManifest(); } else {
                return this._oManifest.getJson(); } };
        f.prototype.getManifestEntry = function(k) {
            return this._getManifestEntry(k); };
        f.prototype._getManifestEntry = function(k, m) {
            if (!this._oManifest) {
                return this.getMetadata().getManifestEntry(k, m); } else {
                var D = this._oManifest.getEntry(k);
                if (D !== undefined && !q.isPlainObject(D)) {
                    return D; }
                var p, P;
                if (m && (p = this.getMetadata().getParent()) instanceof C) { P = p.getManifestEntry(k, m); }
                if (P || D) { D = q.extend(true, {}, P, D); }
                return D; } };
        f.prototype.getManifestObject = function() {
            if (!this._oManifest) {
                return this.getMetadata().getManifestObject(); } else {
                return this._oManifest; } };
        f.activateCustomizing = function(s) {};
        f.deactivateCustomizing = function(s) {};
        f.getOwnerIdFor = function(o) {
            var O = (o instanceof M) && o._sOwnerId;
            return O || undefined; };
        f.getOwnerComponentFor = function(o) {
            var O = f.getOwnerIdFor(o);
            return O && sap.ui.component(O); };
        f.prototype.runAsOwner = function(e) {
            return r(e, this.getId()); };
        f.prototype.getInterface = function() {
            return this; };
        f.prototype._initCompositeSupport = function(s) {
            if (this._oManifest) {
                var m = this.getManifest();
                var u = m && m["sap.ui5"];
                var e = u && u["extends"];
                var E = e && e["extensions"];
                if (E) { q.sap.require("sap.ui.core.CustomizingConfiguration");
                    var g = sap.ui.require('sap/ui/core/CustomizingConfiguration');
                    g.activateForComponentInstance(this); } }
            this._mManifestModels = {};
            this.getMetadata().onInitComponent();
            this.oComponentData = s && s.componentData;
            this.getMetadata().init();
            this.initComponentModels();
            if (this.onWindowError) { this._fnWindowErrorHandler = q.proxy(function(o) {
                    var h = o.originalEvent;
                    this.onWindowError(h.message, h.filename, h.lineno); }, this);
                q(window).bind("error", this._fnWindowErrorHandler); }
            if (this.onWindowBeforeUnload) { this._fnWindowBeforeUnloadHandler = q.proxy(this.onWindowBeforeUnload, this);
                q(window).bind("beforeunload", this._fnWindowBeforeUnloadHandler); }
            if (this.onWindowUnload) { this._fnWindowUnloadHandler = q.proxy(this.onWindowUnload, this);
                q(window).bind("unload", this._fnWindowUnloadHandler); } };
        f.prototype.destroy = function() {
            if (typeof this._mManifestModels === 'object') {
                for (var m in this._mManifestModels) { this._mManifestModels[m].destroy(); }
                this._mManifestModels = null; }
            if (this._fnWindowErrorHandler) { q(window).unbind("error", this._fnWindowErrorHandler);
                delete this._fnWindowErrorHandler; }
            if (this._fnWindowBeforeUnloadHandler) { q(window).unbind("beforeunload", this._fnWindowBeforeUnloadHandler);
                delete this._fnWindowBeforeUnloadHandler; }
            if (this._fnWindowUnloadHandler) { q(window).unbind("unload", this._fnWindowUnloadHandler);
                delete this._fnWindowUnloadHandler; }
            if (this._oEventBus) { this._oEventBus.destroy();
                delete this._oEventBus; }
            M.prototype.destroy.apply(this, arguments);
            sap.ui.getCore().getMessageManager().unregisterObject(this);
            if (this._oManifest) {
                var e = sap.ui.require('sap/ui/core/CustomizingConfiguration');
                if (e) { e.deactivateForComponentInstance(this); } }
            this.getMetadata().onExitComponent(); };
        f.prototype.getComponentData = function() {
            return this.oComponentData; };
        f.prototype.getEventBus = function() {
            if (!this._oEventBus) { q.sap.require("sap.ui.core.EventBus");
                this._oEventBus = new sap.ui.core.EventBus(); }
            return this._oEventBus; };
        f.prototype.initComponentModels = function() {
            var m = this.getMetadata();
            if (m.isBaseClass()) {
                return; }
            var o = this._getManifestEntry("/sap.app/dataSources", true) || {};
            var e = this._getManifestEntry("/sap.ui5/models", true) || {};
            this._initComponentModels(e, o); };
        f.prototype._initComponentModels = function(m, D) {
            if (!m) {
                return; }
            var e = { models: m, dataSources: D || {}, origin: { dataSources: {}, models: {} } };
            var o = this.getMetadata();
            while (o && o instanceof C) {
                var g = o.getManifestEntry("/sap.app/dataSources");
                d(e.dataSources, e.origin.dataSources, g, o);
                var h = o.getManifestEntry("/sap.ui5/models");
                d(e.models, e.origin.models, h, o);
                o = o.getParent(); }
            var u = q.sap.getUriParameters();
            for (var s in e.models) {
                var j = e.models[s];
                var I = false;
                if (typeof j === 'string') { j = { dataSource: j }; }
                if (j.dataSource) {
                    var k = e.dataSources && e.dataSources[j.dataSource];
                    if (typeof k === 'object') {
                        if (k.type === undefined) { k.type = 'OData'; }
                        if (!j.type) {
                            switch (k.type) {
                                case 'OData':
                                    j.type = 'sap.ui.model.odata.v2.ODataModel';
                                    break;
                                case 'JSON':
                                    j.type = 'sap.ui.model.json.JSONModel';
                                    break;
                                case 'XML':
                                    j.type = 'sap.ui.model.xml.XMLModel';
                                    break;
                                default:
                            } }
                        if (!j.uri) { j.uri = k.uri;
                            I = true; }
                        if (k.type === 'OData' && k.settings && typeof k.settings.maxAge === "number") { j.settings = j.settings || {};
                            j.settings.headers = j.settings.headers || {};
                            j.settings.headers["Cache-Control"] = "max-age=" + k.settings.maxAge; }
                        if (k.type === 'OData' && k.settings && k.settings.annotations) {
                            var A = k.settings.annotations;
                            for (var i = 0; i < A.length; i++) {
                                var l = e.dataSources[A[i]];
                                if (!l) { q.sap.log.error("Component Manifest: ODataAnnotation \"" + A[i] + "\" for dataSource \"" + j.dataSource + "\" could not be found in manifest", "[\"sap.app\"][\"dataSources\"][\"" + A[i] + "\"]", this);
                                    continue; }
                                if (l.type !== 'ODataAnnotation') { q.sap.log.error("Component Manifest: dataSource \"" + A[i] + "\" was expected to have type \"ODataAnnotation\" but was \"" + l.type + "\"", "[\"sap.app\"][\"dataSources\"][\"" + A[i] + "\"]", this);
                                    continue; }
                                if (!l.uri) { q.sap.log.error("Component Manifest: Missing \"uri\" for ODataAnnotation \"" + A[i] + "\"", "[\"sap.app\"][\"dataSources\"][\"" + A[i] + "\"]", this);
                                    continue; }
                                var n = e.origin.dataSources[A[i]] || this.getMetadata();
                                var p = n.getManifestObject().resolveUri(new U(l.uri)).toString();
                                j.settings = j.settings || {};
                                j.settings.annotationURI = j.settings.annotationURI || [];
                                j.settings.annotationURI.push(p); } } } else { q.sap.log.error("Component Manifest: dataSource \"" + j.dataSource + "\" for model \"" + s + "\" not found or invalid", "[\"sap.app\"][\"dataSources\"][\"" + j.dataSource + "\"]", this); } }
                if (!j.type) { q.sap.log.error("Component Manifest: Missing \"type\" for model \"" + s + "\"", "[\"sap.ui5\"][\"models\"][\"" + s + "\"]", this);
                    continue; }
                try { q.sap.require(j.type); } catch (E) { q.sap.log.error("Component Manifest: Class \"" + j.type + "\" for model \"" + s + "\" could not be loaded. " + E, "[\"sap.ui5\"][\"models\"][\"" + s + "\"]", this);
                    continue; }
                var t = q.sap.getObject(j.type);
                if (!t) { q.sap.log.error("Component Manifest: Class \"" + j.type + "\" for model \"" + s + "\" could not be found", "[\"sap.ui5\"][\"models\"][\"" + s + "\"]", this);
                    continue; }
                if (j.type === 'sap.ui.model.odata.ODataModel' && (!j.settings || j.settings.json === undefined)) { j.settings = j.settings || {};
                    j.settings.json = true; }
                if (j.uri) {
                    var v = new U(j.uri);
                    var w = (I ? e.origin.dataSources[j.dataSource] : e.origin.models[s]) || this.getMetadata();
                    v = w.getManifestObject().resolveUri(v);
                    if (j.dataSource) { c(u, v); }
                    j.uri = v.toString(); }
                if (j.uriSettingName === undefined) {
                    switch (j.type) {
                        case 'sap.ui.model.odata.ODataModel':
                        case 'sap.ui.model.odata.v2.ODataModel':
                            j.uriSettingName = 'serviceUrl';
                            break;
                        case 'sap.ui.model.resource.ResourceModel':
                            j.uriSettingName = 'bundleUrl';
                            break;
                        default:
                    } }
                var x = this.getComponentData();
                var S = x && x.startupParameters && x.startupParameters["sap-system"];
                if (!S) { S = u.get("sap-system"); }
                var y = false;
                var O;
                if (S && q.inArray(j.type, ["sap.ui.model.odata.ODataModel", "sap.ui.model.odata.v2.ODataModel"]) != -1) { y = true;
                    q.sap.require("sap.ui.model.odata.ODataUtils");
                    O = sap.ui.require("sap/ui/model/odata/ODataUtils"); }
                if (j.uri) {
                    if (y) { j.preOriginBaseUri = j.uri.split("?")[0];
                        j.uri = O.setOrigin(j.uri, { alias: S });
                        j.postOriginBaseUri = j.uri.split("?")[0]; }
                    if (j.uriSettingName !== undefined) { j.settings = j.settings || {};
                        if (!j.settings[j.uriSettingName]) { j.settings[j.uriSettingName] = j.uri; } } else if (j.settings) { j.settings = [j.uri, j.settings]; } else { j.settings = [j.uri]; } } else {
                    if (y && j.uriSettingName !== undefined && j.settings && j.settings[j.uriSettingName]) { j.preOriginBaseUri = j.settings[j.uriSettingName].split("?")[0];
                        j.settings[j.uriSettingName] = O.setOrigin(j.settings[j.uriSettingName], { alias: S });
                        j.postOriginUri = j.settings[j.uriSettingName].split("?")[0]; } }
                if (y && j.settings && j.settings.annotationURI) {
                    var z = [].concat(j.settings.annotationURI);
                    var B = [];
                    for (var i = 0; i < z.length; i++) { B.push(z[i].replace(j.preOriginBaseUri, j.postOriginBaseUri.split("?")[0])); }
                    j.settings.annotationURI = B; }
                if (j.settings && !q.isArray(j.settings)) { j.settings = [j.settings]; }
                var F = [null].concat(j.settings || []);
                var G = t.bind.apply(t, F);
                var H = new G();
                this._mManifestModels[s] = H;
                this.setModel(H, s || undefined); } };
        sap.ui.component = function(v) {
            if (!v) {
                throw new Error("sap.ui.component cannot be called without parameter!"); }
            if (typeof v === 'string') {
                return sap.ui.getCore().getComponent(v); }

            function e(o) {
                var n = v.name,
                    i = v.id,
                    h = v.componentData,
                    j = n + '.Component',
                    S = v.settings;
                var I = new o(q.extend({}, S, { id: i, componentData: h, _manifest: v._manifest }));
                q.sap.log.info("Component instance Id = " + I.getId());
                var H = I.getMetadata().handleValidation() !== undefined || v.handleValidation;
                if (H) {
                    if (I.getMetadata().handleValidation() !== undefined) { H = I.getMetadata().handleValidation(); } else { H = v.handleValidation; }
                    sap.ui.getCore().getMessageManager().registerObject(I, H); }
                return I; }
            var g = sap.ui.component.load(v, true);
            if (v.async) {
                var s = M._sOwnerId;
                return g.then(function(o) {
                    return r(function() {
                        return e(o); }, s); }); } else {
                return e(g); } };
        sap.ui.component.load = function(o, F) {
            var n = o.name,
                u = o.url,
                g = sap.ui.getCore().getConfiguration(),
                h = /^(sync|async)$/.test(g.getComponentPreload()),
                m = typeof o.manifestFirst !== "undefined" ? o.manifestFirst : g.getManifestFirst(),
                j;
            if (o.manifestUrl) { j = a.load({ manifestUrl: o.manifestUrl, componentName: n, async: o.async });
                o._manifest = j; }
            if (j && !o.async) { n = j.getComponentName(); }
            if (!(j && o.async)) {
                if (!n) {
                    throw new Error("The name of the component is undefined."); }
                if (u) { q.sap.registerModulePath(n, u); } }
            if (m && !j) { j = a.load({ manifestUrl: q.sap.getModulePath(n) + "/manifest.json", componentName: n, async: o.async, failOnError: false });
                o._manifest = j; }

            function k() {
                var e = n + '.Component';
                q.sap.require(e);
                var i = q.sap.getObject(e);
                if (!i) {
                    var v = "The specified component controller '" + e + "' could not be found!";
                    if (F) {
                        throw new Error(v); } else { q.sap.log.warning(v); } }
                return i; }

            function p(O, i) {
                if (typeof O === 'object') {
                    if (O.url) { q.sap.registerModulePath(O.name, O.url); }
                    return (O.lazy && i !== true) ? undefined : O.name; }
                return O; }

            function l(i, A) {
                var v = i + '.Component',
                    P;
                if (h && i != null && !q.sap.isDeclared(v, true)) {
                    if (A) { P = q.sap.getResourceName(v, '-preload.js');
                        return q.sap._loadJSResourceAsync(P, true); }
                    try { P = v + '-preload';
                        q.sap.require(P); } catch (e) { q.sap.log.warning("couldn't preload component from " + P + ": " + ((e && e.message) || e)); } } }

            function s(e, j, A) {
                var P = [];
                var i = A ? function(D) { P.push(D); } : q.noop;
                j.defineResourceRoots();
                var L = j.getEntry("/sap.ui5/dependencies/libs");
                if (L) {
                    var v = [];
                    for (var z in L) {
                        if (!L[z].lazy) { v.push(z); } }
                    if (v.length > 0) { q.sap.log.info("Component \"" + e + "\" is loading libraries: \"" + v.join(", ") + "\"");
                        i(sap.ui.getCore().loadLibraries(v, { async: A })); } }
                var E = j.getEntry("/sap.ui5/extends/component");
                if (E) { i(l(E, A)); }
                var B = j.getEntry("/sap.ui5/dependencies/components");
                if (B) {
                    for (var e in B) {
                        if (!B[e].lazy) { i(l(e, A)); } } }
                return A ? Promise.all(P) : undefined; }
            if (o.async) {
                var t = o.asyncHints || {},
                    w = [],
                    x = function(P) {
                        if (P) { w.push(P); } },
                    y = function($) {
                        return $; };
                if (t.preloadBundles) { q.each(t.preloadBundles, function(i, B) { x(q.sap._loadJSResourceAsync(p(B, true), true)); }); }
                if (t.libs) { x(sap.ui.getCore().loadLibraries(t.libs.map(p).filter(y))); }
                if (!j) { x(l(n, true)); } else { x(j.then(function(j) { o._manifest = j;
                        return l(j.getComponentName(), true); })); }
                if (t.components) { q.each(t.components, function(i, v) { x(l(p(v), true)); }); }
                return Promise.all(w).then(function(v) { q.sap.log.debug("Component.load: all promises fulfilled, then " + v);
                    if (j) {
                        return j.then(function(j) { n = j.getComponentName();
                            return s(n, j, true); }); } else {
                        return v; } }).then(function() {
                    return t.preloadOnly ? true : k(); }); }
            if (j) { s(n, j); }
            l(n);
            return k(); };
        return f; });
    sap.ui.predefine('sap/ui/core/ComponentMetadata', ['jquery.sap.global', 'sap/ui/base/ManagedObjectMetadata', 'sap/ui/core/Manifest', 'sap/ui/thirdparty/URI', 'jquery.sap.resources'], function(q, M, b, U) { "use strict";
        var C = function(c, o) { M.apply(this, arguments); };
        C.prototype = q.sap.newObject(M.prototype);
        C.preprocessClassInfo = function(c) {
            if (c && typeof c.metadata === "string") { c.metadata = { _src: c.metadata }; }
            return c; };
        C.prototype.applySettings = function(c) {
            var s = c.metadata;
            var n = this.getName(),
                p = n.replace(/\.\w+?$/, "");
            if (s._src) {
                if (s._src == "component.json") { q.sap.log.warning("Usage of declaration \"metadata: 'component.json'\" is deprecated (component " + n + "). Use \"metadata: 'json'\" instead."); } else if (s._src != "json") {
                    throw new Error("Invalid metadata declaration for component " + n + ": \"" + s._src + "\"! Use \"metadata: 'json'\" to load metadata from component.json."); }
                var r = p.replace(/\./g, "/") + "/component.json";
                q.sap.log.info("The metadata of the component " + n + " is loaded from file " + r + ".");
                try {
                    var R = q.sap.loadResource(r, { dataType: "json" });
                    q.extend(s, R); } catch (e) { q.sap.log.error("Failed to load component metadata from \"" + r + "\" (component " + n + ")! Reason: " + e); } }
            M.prototype.applySettings.call(this, c);
            this._sComponentName = p;
            this._bInitialized = false;
            this._iInstanceCount = 0;
            var m = s["manifest"];
            if (m) { s.__metadataVersion = 2;
                if (typeof m === "string" && m === "json") {
                    var r = p.replace(/\./g, "/") + "/manifest.json";
                    q.sap.log.info("The manifest of the component " + n + " is loaded from file " + r + ".");
                    try {
                        var R = q.sap.loadResource(r, { dataType: "json" });
                        m = R; } catch (e) { q.sap.log.error("Failed to load component manifest from \"" + r + "\" (component " + n + ")! Reason: " + e);
                        m = {}; } } } else { s.__metadataVersion = 1;
                m = {}; }
            m["name"] = m["name"] || n;
            m["sap.app"] = m["sap.app"] || { "id": p };
            m["sap.ui5"] = m["sap.ui5"] || {};
            if (!this.isBaseClass()) { m["sap.ui5"]["extends"] = m["sap.ui5"]["extends"] || {}; }
            this._convertLegacyMetadata(s, m);
            this._oStaticInfo = s;
            this._oManifest = new b(m, { componentName: this._sComponentName, baseUrl: q.sap.getModulePath(this._sComponentName) + "/", process: s.__metadataVersion === 2 }); };
        C.prototype.init = function() {
            if (!this._bInitialized) {
                var p = this.getParent();
                if (p instanceof C) { p.init(); }
                this._oManifest.init();
                this._bInitialized = true; } };
        C.prototype.exit = function() {
            if (this._bInitialized) {
                var p = this.getParent();
                if (p instanceof C) { p.exit(); }
                this._oManifest.exit();
                this._bInitialized = false; } };
        C.prototype.onInitComponent = function() {
            var u = this.getManifestEntry("sap.ui5", true),
                e = u && u["extends"] && u["extends"].extensions;
            if (this._iInstanceCount === 0 && !q.isEmptyObject(e)) { q.sap.require("sap.ui.core.CustomizingConfiguration");
                var a = sap.ui.require('sap/ui/core/CustomizingConfiguration');
                a.activateForComponent(this._sComponentName); }
            this._iInstanceCount++; };
        C.prototype.onExitComponent = function() { this._iInstanceCount = Math.max(this._iInstanceCount - 1, 0);
            var a = sap.ui.require('sap/ui/core/CustomizingConfiguration');
            if (this._iInstanceCount === 0 && a) { a.deactivateForComponent(this._sComponentName); } };
        C.prototype.isBaseClass = function() {
            return /^sap\.ui\.core\.(UI)?Component$/.test(this.getName()); };
        C.prototype.getMetadataVersion = function() {
            return this._oStaticInfo.__metadataVersion; };
        C.prototype.getManifestObject = function() {
            return this._oManifest; };
        C.prototype.getManifest = function() {
            if (this.getMetadataVersion() === 1) {
                return this._oManifest.getRawJson(); }
            return this._oManifest.getJson(); };
        C.prototype._getManifest = function() { q.sap.log.warning("ComponentMetadata#_getManifest: do not use deprecated functions anymore!");
            return this._oManifest.getJson(); };
        C.prototype.getRawManifest = function() {
            return this._oManifest.getRawJson(); };
        C.prototype._getRawManifest = function() { q.sap.log.warning("ComponentMetadata#_getRawManifest: do not use deprecated functions anymore!");
            return this._oManifest.getRawJson(); };
        C.prototype.getManifestEntry = function(k, m) {
            var d = this._oManifest.getEntry(k);
            if (d !== undefined && !q.isPlainObject(d)) {
                return d; }
            var p, P;
            if (m && (p = this.getParent()) instanceof C) { P = p.getManifestEntry(k, m); }
            if (P || d) { d = q.extend(true, {}, P, d); }
            return d; };
        C.prototype.getCustomEntry = function(k, m) {
            if (!k || k.indexOf(".") <= 0) { q.sap.log.warning("Component Metadata entries with keys without namespace prefix can not be read via getCustomEntry. Key: " + k + ", Component: " + this.getName());
                return null; }
            var p, d = this._oStaticInfo[k] || {};
            if (!q.isPlainObject(d)) { q.sap.log.warning("Custom Component Metadata entry with key '" + k + "' must be an object. Component: " + this.getName());
                return null; }
            if (m && (p = this.getParent()) instanceof C) {
                return q.extend(true, {}, p.getCustomEntry(k, m), d); }
            return q.extend(true, {}, d); };
        C.prototype.getComponentName = function() {
            return this._sComponentName; };
        C.prototype.getDependencies = function() {
            if (!this._oLegacyDependencies) {
                var d = this.getManifestEntry("/sap.ui5/dependencies"),
                    u = d && d.minUI5Version || null,
                    l = d && d.libs || {},
                    c = d && d.components || {};
                var L = { ui5version: u, libs: [], components: [] };
                for (var s in l) { L.libs.push(s); }
                for (var a in c) { L.components.push(a); }
                this._oLegacyDependencies = L; }
            return this._oLegacyDependencies; };
        C.prototype.getIncludes = function() {
            if (!this._aLegacyIncludes) {
                var I = [],
                    r = this.getManifestEntry("/sap.ui5/resources") || {},
                    c = r && r.css || [],
                    j = r && r.js || [];
                for (var i = 0, l = c.length; i < l; i++) {
                    if (c[i] && c[i].uri) { I.push(c[i].uri); } }
                for (var i = 0, l = j.length; i < l; i++) {
                    if (j[i] && j[i].uri) { I.push(j[i].uri); } }
                this._aLegacyIncludes = (I.length > 0) ? I : null; }
            return this._aLegacyIncludes; };
        C.prototype.getUI5Version = function() {
            return this.getManifestEntry("/sap.ui5/dependencies/minUI5Version"); };
        C.prototype.getComponents = function() {
            return this.getDependencies().components; };
        C.prototype.getLibs = function() {
            return this.getDependencies().libs; };
        C.prototype.getVersion = function() {
            return this.getManifestEntry("/sap.app/applicationVersion/version"); };
        C.prototype.getConfig = function(k, d) {
            var c = this.getManifestEntry("/sap.ui5/config", !d);
            if (!c) {
                return {}; }
            if (!k) {
                return c; }
            return c.hasOwnProperty(k) ? c[k] : {}; };
        C.prototype.getCustomizing = function(d) {
            return this.getManifestEntry("/sap.ui5/extends/extensions", !d); };
        C.prototype.getModels = function(d) {
            if (!this._oLegacyModels) { this._oLegacyModels = {};
                var D = this.getManifestEntry("/sap.ui5/models") || {};
                for (var s in D) {
                    var o = D[s];
                    this._oLegacyModels[s] = o.settings || {};
                    this._oLegacyModels[s].type = o.type;
                    this._oLegacyModels[s].uri = o.uri; } }
            var p, m = q.extend(true, {}, this._oLegacyModels);
            if (!d && (p = this.getParent()) instanceof C) { m = q.extend(true, {}, p.getModels(), m); }
            return m; };
        C.prototype.handleValidation = function() {
            return this.getManifestEntry("/sap.ui5/handleValidation"); };
        C.prototype.getServices = function() { q.sap.log.warning("Usage of sap.ui.core.ComponentMetadata.protoype.getServices is deprecated!");
            return this._oStaticInfo.services || {}; };
        C.prototype._convertLegacyMetadata = function(s, c) {
            var f = function(a, t) {
                var o = {};
                if (a) {
                    for (var i = 0, l = a.length; i < l; i++) {
                        var v = a[i];
                        if (typeof v === "string") { o[v] = typeof t === "function" && t(v) || {}; } } }
                return o; };
            var A = c["sap.app"];
            var u = c["sap.ui5"];
            for (var n in s) {
                var v = s[n];
                if (v !== undefined) {
                    switch (n) {
                        case "name":
                            c[n] = c[n] || v;
                            A["id"] = A["id"] || v;
                            break;
                        case "description":
                        case "keywords":
                            A[n] = A[n] || v;
                            break;
                        case "version":
                            var d = A.applicationVersion = A.applicationVersion || {};
                            d.version = d.version || v;
                            break;
                        case "config":
                            u[n] = u[n] || v;
                            break;
                        case "customizing":
                            var e = u["extends"] = u["extends"] || {};
                            e.extensions = e.extensions || v;
                            break;
                        case "dependencies":
                            if (!u[n]) { u[n] = {};
                                u[n].minUI5Version = v.ui5version;
                                u[n].libs = f(v.libs);
                                u[n].components = f(v.components); }
                            break;
                        case "includes":
                            if (!u["resources"]) { u["resources"] = {};
                                if (v && v.length > 0) {
                                    for (var i = 0, l = v.length; i < l; i++) {
                                        var r = v[i];
                                        var m = r.match(/\.(css|js)$/i);
                                        if (m) { u["resources"][m[1]] = u["resources"][m[1]] || [];
                                            u["resources"][m[1]].push({ "uri": r }); } } } }
                            break;
                        case "handleValidation":
                            if (u[n] === undefined) { u[n] = v; }
                            break;
                        case "models":
                            if (!u["models"]) {
                                var g = {};
                                for (var h in v) {
                                    var D = v[h];
                                    var j = {};
                                    for (var k in D) {
                                        var p = D[k];
                                        switch (k) {
                                            case "type":
                                            case "uri":
                                                j[k] = p;
                                                break;
                                            default:
                                                j.settings = j.settings || {};
                                                j.settings[k] = p; } }
                                    g[h] = j; }
                                u["models"] = g; }
                            break; } } } };
        return C; }, true);
    sap.ui.predefine('sap/ui/core/Configuration', ['jquery.sap.global', '../Device', '../Global', '../base/Object', './Locale', 'sap/ui/thirdparty/URI', 'jquery.sap.script'], function(q, D, G, B, L, U) { "use strict";
        var C, a;
        var b = B.extend("sap.ui.core.Configuration", { constructor: function(o) { this._oCore = o;

                function h() {
                    function e() {
                        if (D.os.android) {
                            var m = navigator.userAgent.match(/\s([a-z]{2}-[a-z]{2})[;)]/i);
                            if (m) {
                                return m[1]; } }
                        return navigator.language; }
                    return (navigator.languages && navigator.languages[0]) || e() || navigator.userLanguage || navigator.browserLanguage; }
                var j = { "theme": { type: "string", defaultValue: "base" }, "language": { type: "string", defaultValue: h() }, "formatLocale": { type: "string", defaultValue: null }, "calendarType": { type: "string", defaultValue: null }, "accessibility": { type: "boolean", defaultValue: true }, "autoAriaBodyRole": { type: "boolean", defaultValue: true, noUrl: true }, "animation": { type: "boolean", defaultValue: true }, "rtl": { type: "boolean", defaultValue: null }, "debug": { type: "boolean", defaultValue: false }, "inspect": { type: "boolean", defaultValue: false }, "originInfo": { type: "boolean", defaultValue: false }, "noConflict": { type: "boolean", defaultValue: false, noUrl: true }, "noDuplicateIds": { type: "boolean", defaultValue: true }, "trace": { type: "boolean", defaultValue: false, noUrl: true }, "modules": { type: "string[]", defaultValue: [], noUrl: true }, "areas": { type: "string[]", defaultValue: null, noUrl: true }, "onInit": { type: "code", defaultValue: undefined, noUrl: true }, "uidPrefix": { type: "string", defaultValue: "__", noUrl: true }, "ignoreUrlParams": { type: "boolean", defaultValue: false, noUrl: true }, "weinreServer": { type: "string", defaultValue: "", noUrl: true }, "weinreId": { type: "string", defaultValue: "" }, "preload": { type: "string", defaultValue: "auto" }, "rootComponent": { type: "string", defaultValue: "", noUrl: true }, "preloadLibCss": { type: "string[]", defaultValue: [] }, "application": { type: "string", defaultValue: "" }, "appCacheBuster": { type: "string[]", defaultValue: [] }, "bindingSyntax": { type: "string", defaultValue: "default", noUrl: true }, "versionedLibCss": { type: "boolean", defaultValue: false }, "manifestFirst": { type: "boolean", defaultValue: false }, "whitelistService": { type: "string", defaultValue: null, noUrl: true }, "frameOptions": { type: "string", defaultValue: "default", noUrl: true }, "frameOptionsConfig": { type: "object", defaultValue: undefined, noUrl: true }, "xx-rootComponentNode": { type: "string", defaultValue: "", noUrl: true }, "xx-appCacheBusterMode": { type: "string", defaultValue: "sync" }, "xx-appCacheBusterHooks": { type: "object", defaultValue: undefined, noUrl: true }, "xx-disableCustomizing": { type: "boolean", defaultValue: false, noUrl: true }, "xx-loadAllMode": { type: "boolean", defaultValue: false, noUrl: true }, "xx-test-mobile": { type: "boolean", defaultValue: false }, "xx-domPatching": { type: "boolean", defaultValue: false }, "xx-componentPreload": { type: "string", defaultValue: "" }, "xx-designMode": { type: "boolean", defaultValue: false }, "xx-supportedLanguages": { type: "string[]", defaultValue: [] }, "xx-bootTask": { type: "function", defaultValue: undefined, noUrl: true }, "xx-suppressDeactivationOfControllerCode": { type: "boolean", defaultValue: false }, "xx-lesssupport": { type: "boolean", defaultValue: false }, "xx-handleValidation": { type: "boolean", defaultValue: false }, "statistics": { type: "boolean", defaultValue: false } };
                var k = { "xx-test": "1.15", "flexBoxPolyfill": "1.14", "sapMeTabContainer": "1.14", "sapMeProgessIndicator": "1.14", "sapMGrowingList": "1.14", "sapMListAsTable": "1.14", "sapMDialogWithPadding": "1.14", "sapCoreBindingSyntax": "1.24" };
                this.oFormatSettings = new b.FormatSettings(this);
                var l = this;

                function s(N, V) {
                    if (typeof V === "undefined" || V === null) {
                        return; }
                    switch (j[N].type) {
                        case "boolean":
                            if (typeof V === "string") {
                                if (j[N].defaultValue) { l[N] = V.toLowerCase() != "false"; } else { l[N] = V.toLowerCase() === "true" || V.toLowerCase() === "x"; } } else { l[N] = !!V; }
                            break;
                        case "string":
                            l[N] = "" + V;
                            break;
                        case "code":
                            l[N] = typeof V === "function" ? V : String(V);
                            break;
                        case "function":
                            if (typeof V !== "function") {
                                throw new Error("unsupported value"); }
                            l[N] = V;
                            break;
                        case "string[]":
                            if (q.isArray(V)) { l[N] = V; } else if (typeof V === "string") { l[N] = q.map(V.split(/[ ,;]/), function($) {
                                    return q.trim($); }); } else {
                                throw new Error("unsupported value"); }
                            break;
                        case "object":
                            if (typeof V !== "object") {
                                throw new Error("unsupported value"); }
                            l[N] = V;
                            break;
                        default:
                            throw new Error("illegal state"); } }

                function p(y) {
                    var i, m;
                    try { i = new U(y, window.location.href).normalize();
                        m = i.path();
                        return m + (m.slice(-1) === '/' ? '' : '/') + "UI5/"; } catch (e) {} }
                for (var n in j) { l[n] = j[n].defaultValue; }
                var r = window["sap-ui-config"] || {};
                r.oninit = r.oninit || r["evt-oninit"];
                for (var n in j) {
                    if (r.hasOwnProperty(n.toLowerCase())) { s(n, r[n.toLowerCase()]); } else if (!/^xx-/.test(n) && r.hasOwnProperty("xx-" + n.toLowerCase())) { s(n, r["xx-" + n.toLowerCase()]); } }
                if (r.libs) { l.modules = q.map(r.libs.split(","), function($) {
                        return q.trim($) + ".library"; }).concat(l.modules); }
                var P = "compatversion";
                var t = r[P];
                var u = q.sap.Version("1.14");
                this._compatversion = {};

                function _(e) {
                    var v = !e ? t || u.toString() : r[P + "-" + e.toLowerCase()] || t || k[e] || u.toString();
                    v = q.sap.Version(v.toLowerCase() === "edge" ? G.version : v);
                    return q.sap.Version(v.getMajor(), v.getMinor()); }
                this._compatversion._default = _();
                for (var n in k) { this._compatversion[n] = _(n); }
                if (!l.ignoreUrlParams) {
                    var w = "sap-ui-";
                    var x = q.sap.getUriParameters();
                    if (x.mParams['sap-locale'] || x.mParams['sap-language']) {
                        var V = x.get('sap-locale') || M[x.get('sap-language').toUpperCase()] || x.get('sap-language');
                        if (V === "") { l['language'] = j['language'].defaultValue; } else { s('language', V); } }
                    if (x.mParams['sap-rtl']) {
                        var V = x.get('sap-rtl');
                        if (V === "X" || V === "x") { s('rtl', true); } else { s('rtl', false); } }
                    if (x.mParams['sap-theme']) {
                        var V = x.get('sap-theme');
                        if (V === "") { l['theme'] = j['theme'].defaultValue; } else { s('theme', V); } }
                    if (x.mParams['sap-statistics']) {
                        var V = x.get('sap-statistics');
                        s('statistics', V); }
                    for (var n in j) {
                        if (j[n].noUrl) {
                            continue; }
                        var V = x.get(w + n);
                        if (V == null && !/^xx-/.test(n)) { V = x.get(w + "xx-" + n); }
                        if (V === "") { l[n] = j[n].defaultValue; } else { s(n, V); } } }
                this.derivedRTL = L._impliesRTL(l.language);
                var T = l.theme;
                var y;
                var I = T.indexOf("@");
                if (I >= 0) { y = p(T.slice(I + 1));
                    if (y) { l.theme = T.slice(0, I);
                        l.themeRoot = y; } else { l.theme = (r.theme && r.theme !== T) ? r.theme : "base";
                        I = -1; } }
                l.theme = this._normalizeTheme(l.theme, y);
                var z = l['languagesDeliveredWithCore'] = L._coreI18nLocales;
                var A = l['xx-supportedLanguages'];
                if (A.length === 0 || (A.length === 1 && A[0] === '*')) { A = []; } else if (A.length === 1 && A[0] === 'default') { A = z || []; }
                l['xx-supportedLanguages'] = A;
                if (l["bindingSyntax"] === "default") { l["bindingSyntax"] = (l.getCompatibilityVersion("sapCoreBindingSyntax").compareTo("1.26") < 0) ? "simple" : "complex"; }
                if (!l["whitelistService"]) {
                    var E = document.querySelector("META[name='sap.whitelistService']");
                    if (E) { l["whitelistService"] = E.getAttribute("content");
                        if (l["frameOptions"] === "default") { l["frameOptions"] = "trusted"; } } }
                if (l["frameOptions"] === "default" || (l["frameOptions"] !== "allow" && l["frameOptions"] !== "deny" && l["frameOptions"] !== "trusted")) { l["frameOptions"] = "allow"; }
                var F = l['preloadLibCss'];
                if (F.length > 0) { F.appManaged = F[0].slice(0, 1) === "!";
                    if (F.appManaged) { F[0] = F[0].slice(1); }
                    if (F[0] === "*") { F.splice(0, 1);
                        var H = 0;
                        q.each(l.modules, function(i, e) {
                            var m = e.match(/^(.*)\.library$/);
                            if (m) { F.splice(H, 0, m[1]); } }); } }
                for (var n in j) {
                    if (l[n] !== j[n].defaultValue) { q.sap.log.info("  " + n + " = " + l[n]); } } }, getVersion: function() {
                if (this._version) {
                    return this._version; }
                this._version = new q.sap.Version(G.version);
                return this._version; }, getCompatibilityVersion: function(F) {
                if (typeof(F) === "string" && this._compatversion[F]) {
                    return this._compatversion[F]; }
                return this._compatversion._default; }, getTheme: function() {
                return this.theme; }, _setTheme: function(t) { this.theme = t;
                return this; }, _normalizeTheme: function(t, T) {
                if (t && T == null && t.match(/^sap_corbu$/i)) {
                    return "sap_goldreflection"; }
                return t; }, getLanguage: function() {
                return this.language; }, getLanguageTag: function() {
                try {
                    return new L(this.language).toString(); } catch (e) {
                    return undefined; } }, getSAPLogonLanguage: function() {
                try {
                    return new L(this.language).toSAPLogonLanguage(); } catch (e) {
                    return undefined; } }, setLanguage: function(l) { g(typeof l === "string" && l, "sLanguage must be a BCP47 language tag or Java Locale id or null");
                var o = this.getRTL(),
                    m;
                if (l != this.language) { m = this._collect();
                    this.language = m.language = l;
                    this.derivedRTL = L._impliesRTL(l);
                    if (o != this.getRTL()) { m.rtl = this.getRTL(); }
                    this._endCollect(); }
                return this; }, getLocale: function() {
                return new L(this.language); }, getCalendarType: function() {
                var n;
                if (!C) { G.getCore().loadLibrary('sap.ui.core');
                    C = sap.ui.require("sap/ui/core/library").CalendarType; }
                if (!a) { q.sap.require("sap.ui.core.LocaleData");
                    a = sap.ui.require("sap/ui/core/LocaleData"); }
                if (this.calendarType) {
                    for (n in C) {
                        if (n.toLowerCase() === this.calendarType.toLowerCase()) { this.calendarType = n;
                            return this.calendarType; } }
                    q.sap.log.warning("Parameter 'calendarType' is set to " + this.calendarType + " which isn't a valid value and therefore ignored. The calendar type is determined from format setting and current locale"); }
                var l = this.oFormatSettings.getLegacyDateFormat();
                switch (l) {
                    case "A":
                    case "B":
                        return C.Islamic;
                    case "7":
                    case "8":
                    case "9":
                        return C.Japanese; }
                return a.getInstance(this.getLocale()).getPreferredCalendarType(); }, setCalendarType: function(s) {
                var m;
                if (this.calendarType !== s) { m = this._collect();
                    this.calendarType = m.calendarType = s;
                    this._endCollect(); }
                return this; }, getFormatLocale: function() {
                return this.formatLocale || this.language; }, setFormatLocale: function(F) { g(F === null || typeof F === "string" && F, "sFormatLocale must be a BCP47 language tag or Java Locale id or null");
                var m;
                if (F != this.formatLocale) { m = this._collect();
                    this.formatLocale = m.formatLocale = F;
                    this._endCollect(); }
                return this; }, getLanguagesDeliveredWithCore: function() {
                return this["languagesDeliveredWithCore"]; }, getSupportedLanguages: function() {
                return this["xx-supportedLanguages"]; }, getAccessibility: function() {
                return this.accessibility; }, getAutoAriaBodyRole: function() {
                return this.autoAriaBodyRole; }, getAnimation: function() {
                return this.animation; }, getRTL: function() {
                return this.rtl === null ? this.derivedRTL : this.rtl; }, setRTL: function(r) { g(r === null || typeof r === "boolean", "bRTL must be null or a boolean");
                var m;
                if (r != this.rtl) { m = this._collect();
                    this.rtl = m.rtl = this.getRTL();
                    this._endCollect(); }
                return this; }, getDebug: function() {
                return this.debug; }, getInspect: function() {
                return this.inspect; }, getOriginInfo: function() {
                return this.originInfo; }, getNoDuplicateIds: function() {
                return this.noDuplicateIds; }, getTrace: function() {
                return this.trace; }, getUIDPrefix: function() {
                return this.uidPrefix; }, getDesignMode: function() {
                return this["xx-designMode"]; }, getSuppressDeactivationOfControllerCode: function() {
                return this["xx-suppressDeactivationOfControllerCode"]; }, getControllerCodeDeactivated: function() {
                return this.getDesignMode() && !this.getSuppressDeactivationOfControllerCode(); }, getWeinreServer: function() {
                var w = this.weinreServer;
                if (!w) { w = window.location.protocol + "//" + window.location.hostname + ":";
                    w += (parseInt(window.location.port, 10) || 8080) + 1; }
                return w; }, getWeinreId: function() {
                return this.weinreId; }, getApplication: function() {
                return this.application; }, getRootComponent: function() {
                return this.rootComponent; }, getAppCacheBuster: function() {
                return this.appCacheBuster; }, getAppCacheBusterMode: function() {
                return this["xx-appCacheBusterMode"]; }, getAppCacheBusterHooks: function() {
                return this["xx-appCacheBusterHooks"]; }, getDisableCustomizing: function() {
                return this["xx-disableCustomizing"]; }, getDomPatching: function() {
                return this["xx-domPatching"]; }, getPreload: function() {
                return this.preload; }, getManifestFirst: function() {
                return this.manifestFirst; }, getComponentPreload: function() {
                return this['xx-componentPreload'] || this.preload; }, getFormatSettings: function() {
                return this.oFormatSettings; }, getFrameOptions: function() {
                return this.frameOptions; }, getWhitelistService: function() {
                return this.whitelistService; }, _collect: function() {
                var m = this.mChanges || (this.mChanges = { __count: 0 });
                m.__count++;
                return m; }, _endCollect: function() {
                var m = this.mChanges;
                if (m && (--m.__count) === 0) { delete m.__count;
                    this._oCore && this._oCore.fireLocalizationChanged(m);
                    delete this.mChanges; } }, getStatistics: function() {
                var r = this.statistics;
                try { r = r || window.localStorage.getItem("sap-ui-statistics") == "X"; } catch (e) {}
                return r; }, getNoNativeScroll: function() {
                return false; }, getHandleValidation: function() {
                return this["xx-handleValidation"]; } });
        var M = { "ZH": "zh-Hans", "ZF": "zh-Hant", "1Q": "en-US-x-saptrc", "2Q": "en-US-x-sappsd" };
        var c = { "": { pattern: null }, "1": { pattern: "dd.MM.yyyy" }, "2": { pattern: "MM/dd/yyyy" }, "3": { pattern: "MM-dd-yyyy" }, "4": { pattern: "yyyy.MM.dd" }, "5": { pattern: "yyyy/MM/dd" }, "6": { pattern: "yyyy-MM-dd" }, "7": { pattern: "Gyy.MM.dd" }, "8": { pattern: "Gyy/MM/dd" }, "9": { pattern: "Gyy-MM-dd" }, "A": { pattern: "yyyy/MM/dd" }, "B": { pattern: "yyyy/MM/dd" }, "C": { pattern: "yyyy/MM/dd", ignore: true } };
        var d = { "": { "short": null, medium: null, dayPeriods: null }, "0": { "short": "HH:mm", medium: "HH:mm:ss", dayPeriods: null }, "1": { "short": "hh:mm a", medium: "hh:mm:ss a", dayPeriods: ["AM", "PM"] }, "2": { "short": "hh:mm a", medium: "hh:mm:ss a", dayPeriods: ["am", "pm"] }, "3": { "short": "KK:mm a", medium: "KK:mm:ss a", dayPeriods: ["AM", "PM"] }, "4": { "short": "KK:mm a", medium: "KK:mm:ss a", dayPeriods: ["am", "pm"] } };
        var f = { "": { groupingSeparator: null, decimalSeparator: null }, " ": { groupingSeparator: ".", decimalSeparator: "," }, "X": { groupingSeparator: ",", decimalSeparator: "." }, "Y": { groupingSeparator: " ", decimalSeparator: "," } };

        function g(e, m) {
            if (!e) {
                throw new Error(m); } }
        B.extend("sap.ui.core.Configuration.FormatSettings", { constructor: function(o) { this.oConfiguration = o;
                this.mSettings = {};
                this.sLegacyDateFormat = undefined;
                this.sLegacyTimeFormat = undefined;
                this.sLegacyNumberFormatSymbolSet = undefined; }, getFormatLocale: function() {
                function e(t) {
                    var l = t.oConfiguration.language;
                    if (!q.isEmptyObject(t.mSettings)) {
                        if (l.indexOf("-x-") < 0) { l = l + "-x-sapufmt"; } else if (l.indexOf("-sapufmt") <= l.indexOf("-x-")) { l = l + "-sapufmt"; } }
                    return l; }
                return new L(this.oConfiguration.formatLocale || e(this)); }, _set: function(k, v) {
                var o = this.mSettings[k];
                if (v != null) { this.mSettings[k] = v; } else { delete this.mSettings[k]; }
                if ((o == null != v == null) || !q.sap.equal(o, v)) {
                    var m = this.oConfiguration._collect();
                    m[k] = v;
                    this.oConfiguration._endCollect(); } }, getDatePattern: function(s) {
                return this.mSettings["dateFormats-" + s]; }, setDatePattern: function(s, p) { g(s == "short" || s == "medium" || s == "long" || s == "full", "sStyle must be short, medium, long or full");
                this._set("dateFormats-" + s, p);
                return this; }, getTimePattern: function(s) {
                return this.mSettings["timeFormats-" + s]; }, setTimePattern: function(s, p) { g(s == "short" || s == "medium" || s == "long" || s == "full", "sStyle must be short, medium, long or full");
                this._set("timeFormats-" + s, p);
                return this; }, getNumberSymbol: function(t) {
                return this.mSettings["symbols-latn-" + t]; }, setNumberSymbol: function(t, s) { g(t == "decimal" || t == "group" || t == "plusSign" || t == "minusSign", "sType must be decimal, group, plusSign or minusSign");
                this._set("symbols-latn-" + t, s);
                return this; }, setFirstDayOfWeek: function(v) { g(typeof v == "number" && v >= 0 && v <= 6, "iValue must be an integer value between 0 and 6");
                this._set("weekData-firstDay", v);
                return this; }, _setDayPeriods: function(w, t) { this._set("dayPeriods-format-" + w, t);
                return this; }, getLegacyDateFormat: function() {
                return this.sLegacyDateFormat || undefined; }, setLegacyDateFormat: function(F) { F = F ? String(F).toUpperCase() : "";
                g(!F || c.hasOwnProperty(F), "sFormatId must be one of ['1','2','3','4','5','6','7','8','9','A','B','C'] or empty");
                if (c[F].ignore) { q.sap.log.warning("The ABAP date format '" + F + "' (" + c[F].pattern + ") is not supported yet. Falling back to locale specific date formats.");
                    F = ""; }
                var m = this.oConfiguration._collect();
                this.sLegacyDateFormat = m.legacyDateFormat = F;
                this.setDatePattern("short", c[F].pattern);
                this.setDatePattern("medium", c[F].pattern);
                this.oConfiguration._endCollect();
                return this; }, getLegacyTimeFormat: function() {
                return this.sLegacyTimeFormat || undefined; }, setLegacyTimeFormat: function(F) { g(!F || d.hasOwnProperty(F), "sFormatId must be one of ['0','1','2','3','4'] or empty");
                var m = this.oConfiguration._collect();
                this.sLegacyTimeFormat = m.legacyTimeFormat = F = F || "";
                this.setTimePattern("short", d[F]["short"]);
                this.setTimePattern("medium", d[F]["medium"]);
                this._setDayPeriods("abbreviated", d[F].dayPeriods);
                this.oConfiguration._endCollect();
                return this; }, getLegacyNumberFormat: function() {
                return this.sLegacyNumberFormat || undefined; }, setLegacyNumberFormat: function(F) { F = F ? F.toUpperCase() : "";
                g(!F || f.hasOwnProperty(F), "sFormatId must be one of [' ','X','Y'] or empty");
                var m = this.oConfiguration._collect();
                this.sLegacyNumberFormat = m.legacyNumberFormat = F;
                this.setNumberSymbol("group", f[F].groupingSeparator);
                this.setNumberSymbol("decimal", f[F].decimalSeparator);
                this.oConfiguration._endCollect();
                return this; }, setLegacyDateCalendarCustomizing: function(m) { g(q.isArray(m), "aMappings must be an Array");
                var e = this.oConfiguration._collect();
                this.aLegacyDateCalendarCustomizing = e.legacyDateCalendarCustomizing = m;
                this.oConfiguration._endCollect();
                return this; }, getLegacyDateCalendarCustomizing: function() {
                return this.aLegacyDateCalendarCustomizing; }, getCustomLocaleData: function() {
                return this.mSettings; } });
        return b; });
    sap.ui.predefine('sap/ui/core/Control', ['jquery.sap.global', './CustomStyleClassSupport', './Element', './UIArea', './ResizeHandler', './BusyIndicatorUtils'], function(q, C, E, U, R, B) { "use strict";
        var a = E.extend("sap.ui.core.Control", { metadata: { stereotype: "control", "abstract": true, publicMethods: ["placeAt", "attachBrowserEvent", "detachBrowserEvent", "getControlsByFieldGroup", "triggerValidateFieldGroup", "checkFieldGroupIds"], library: "sap.ui.core", properties: { "busy": { type: "boolean", defaultValue: false }, "busyIndicatorDelay": { type: "int", defaultValue: 1000 }, "visible": { type: "boolean", group: "Appearance", defaultValue: true }, "fieldGroupIds": { type: "string[]", defaultValue: [] } }, events: { validateFieldGroup: { enableEventBubbling: true, parameters: { fieldGroupIds: { type: "string[]" } } } } }, constructor: function(i, s) { this.bAllowTextSelection = true;
                E.apply(this, arguments);
                this.bOutput = this.getDomRef() != null;
                if (this._sapUiCoreLocalBusy_initBusyIndicator) { this._sapUiCoreLocalBusy_initBusyIndicator(); } }, renderer: null });
        a.prototype.clone = function() {
            var c = E.prototype.clone.apply(this, arguments);
            if (this.aBindParameters) {
                for (var i = 0, l = this.aBindParameters.length; i < l; i++) {
                    var p = this.aBindParameters[i];
                    c.attachBrowserEvent(p.sEventType, p.fnHandler, p.oListener !== this ? p.oListener : undefined); } }
            c.bAllowTextSelection = this.bAllowTextSelection;
            return c; };
        C.apply(a.prototype);
        a.prototype.isActive = function() {
            return q.sap.domById(this.sId) != null; };
        a.prototype.invalidate = function(o) {
            var u;
            if (this.bOutput && (u = this.getUIArea())) {
                if (!this._bIsBeingDestroyed) { u.addInvalidatedControl(this); } } else {
                var p = this.getParent();
                if (p && (this.bOutput || !(this.getVisible && this.getVisible() === false))) { p.invalidate(this); } } };
        a.prototype.rerender = function() { U.rerenderControl(this); };
        a.prototype.allowTextSelection = function(A) { this.bAllowTextSelection = A;
            return this; };
        a.prototype.attachBrowserEvent = function(e, h, l) {
            if (e && (typeof(e) === "string")) {
                if (h && typeof(h) === "function") {
                    if (!this.aBindParameters) { this.aBindParameters = []; }
                    l = l || this;
                    var p = function() { h.apply(l, arguments); };
                    this.aBindParameters.push({ sEventType: e, fnHandler: h, oListener: l, fnProxy: p });
                    if (!this._sapui_bInAfterRenderingPhase) { this.$().bind(e, p); } } }
            return this; };
        a.prototype.detachBrowserEvent = function(e, h, l) {
            if (e && (typeof(e) === "string")) {
                if (h && typeof(h) === "function") {
                    var $ = this.$(),
                        i, p;
                    l = l || this;
                    if (this.aBindParameters) {
                        for (i = this.aBindParameters.length - 1; i >= 0; i--) { p = this.aBindParameters[i];
                            if (p.sEventType === e && p.fnHandler === h && p.oListener === l) { this.aBindParameters.splice(i, 1);
                                $.unbind(e, p.fnProxy); } } } } }
            return this; };
        a.prototype.getRenderer = function() {
            return sap.ui.core.RenderManager.getRenderer(this); };
        a.prototype.placeAt = function(r, p) {
            var c = sap.ui.getCore();
            if (c.isInitialized()) {
                var o = r;
                if (typeof o === "string") { o = c.byId(r); }
                var i = false;
                if (!(o instanceof E)) { o = c.createUIArea(r);
                    i = true; }
                if (!o) {
                    return this; }
                if (!i) {
                    var b = o.getMetadata().getAggregation("content");
                    var d = true;
                    if (b) {
                        if (!b.multiple || b.type != "sap.ui.core.Control") { d = false; } } else if (!o.addContent || !o.insertContent || !o.removeAllContent) { d = false; }
                    if (!d) { q.sap.log.warning("placeAt cannot be processed because container " + o + " does not have an aggregation 'content'.");
                        return this; } }
                if (typeof p === "number") { o.insertContent(this, p); } else { p = p || "last";
                    switch (p) {
                        case "last":
                            o.addContent(this);
                            break;
                        case "first":
                            o.insertContent(this, 0);
                            break;
                        case "only":
                            o.removeAllContent();
                            o.addContent(this);
                            break;
                        default:
                            q.sap.log.warning("Position " + p + " is not supported for function placeAt."); } } } else {
                var t = this;
                c.attachInitEvent(function() { t.placeAt(r, p); }); }
            return this; };
        a.prototype.onselectstart = function(b) {
            if (!this.bAllowTextSelection) { b.preventDefault();
                b.stopPropagation(); } };
        a.prototype.getIdForLabel = function() {
            return this.getId(); };
        a.prototype.destroy = function(s) { this._bIsBeingDestroyed = true;
            this._cleanupBusyIndicator();
            R.deregisterAllForControl(this.getId());
            if (!this.getVisible()) {
                var p = document.getElementById(sap.ui.core.RenderManager.createInvisiblePlaceholderId(this));
                if (p && p.parentNode) { p.parentNode.removeChild(p); } }
            E.prototype.destroy.call(this, s); };
        (function() {
            var p = "focusin focusout keydown keypress keyup mousedown touchstart touchmove mouseup touchend click",
                b = { onAfterRendering: function() {
                        if (this.getBusy() && this.$() && !this._busyIndicatorDelayedCallId && !this.$("busyIndicator").length) {
                            var d = this.getBusyIndicatorDelay();
                            if (d) { this._busyIndicatorDelayedCallId = q.sap.delayedCall(d, this, A); } else { A.call(this); } } } },
                A = function() {
                    var $ = this.$(this._sBusySection),
                        f = ["area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "menuitem", "meta", "param", "source", "track", "wbr"];
                    if (this._busyIndicatorDelayedCallId) { q.sap.clearDelayedCall(this._busyIndicatorDelayedCallId);
                        delete this._busyIndicatorDelayedCallId; }
                    if (!$ || $.length === 0) { q.sap.log.warning("BusyIndicator could not be rendered. The outer control instance is not valid anymore.");
                        return; }
                    var t = $.get(0) && $.get(0).tagName;
                    if (t && q.inArray(t.toLowerCase(), f) >= 0) { q.sap.log.warning("BusyIndicator cannot be placed in elements with tag '" + t + "'.");
                        return; }
                    if ($.css('position') == 'static') { this._busyStoredPosition = 'static';
                        $.css('position', 'relative'); }
                    this._$BusyIndicator = B.addHTML($, this.getId() + "-busyIndicator");
                    B.animateIE9.start(this._$BusyIndicator);
                    h.apply(this, [true]); },
                h = function(c) {
                    var $ = this.$(this._sBusySection);
                    if (c) {
                        var t = $.find(":sapTabbable"),
                            d = this;
                        this._busyTabIndices = [];
                        this._busyTabIndices.push({ ref: $, tabindex: $.attr('tabindex') });
                        $.attr('tabindex', -1);
                        $.bind(p, this._preserveEvents);
                        t.each(function(i, o) {
                            var r = q(o),
                                T = r.attr('tabindex');
                            if (T < 0) {
                                return true; }
                            d._busyTabIndices.push({ ref: r, tabindex: T });
                            r.attr('tabindex', -1);
                            r.bind(p, this._preserveEvents); }); } else {
                        if (this._busyTabIndices) { q.each(this._busyTabIndices, function(i, o) {
                                if (o.tabindex) { o.ref.attr('tabindex', o.tabindex); } else { o.ref.removeAttr('tabindex'); }
                                o.ref.unbind(p, this._preserveEvents); }); }
                        this._busyTabIndices = []; } };
            a.prototype._preserveEvents = function(e) { q.sap.log.debug("Local Busy Indicator Event Suppressed: " + e.type);
                e.preventDefault();
                e.stopImmediatePropagation(); };
            a.prototype.setBusy = function(c, s) { this._sBusySection = s;
                var $ = this.$(this._sBusySection);
                if (c == this.getProperty("busy")) {
                    return this; }
                this.setProperty("busy", c, true);
                if (c) { this.addDelegate(b, false, this); } else { this.removeDelegate(b);
                    if (this._busyIndicatorDelayedCallId) { q.sap.clearDelayedCall(this._busyIndicatorDelayedCallId);
                        delete this._busyIndicatorDelayedCallId; } }
                if (!this.getDomRef()) {
                    return this; }
                if (c) {
                    if (this.getBusyIndicatorDelay() <= 0) { A.apply(this); } else { this._busyIndicatorDelayedCallId = q.sap.delayedCall(this.getBusyIndicatorDelay(), this, A); } } else { this.$("busyIndicator").remove();
                    this.$().removeClass('sapUiLocalBusy');
                    this.$().removeAttr('aria-busy');
                    if (this._busyStoredPosition) { $.css('position', this._busyStoredPosition);
                        delete this._busyStoredPosition; }
                    h.apply(this, [false]);
                    B.animateIE9.stop(this._$BusyIndicator); }
                return this; };
            a.prototype.isBusy = function() {
                return this.getProperty("busy"); };
            a.prototype.setBusyIndicatorDelay = function(d) { this.setProperty("busyIndicatorDelay", d, true);
                return this; };
            a.prototype._cleanupBusyIndicator = function() {
                if (this._busyIndicatorDelayedCallId) { q.sap.clearDelayedCall(this._busyIndicatorDelayedCallId);
                    delete this._busyIndicatorDelayedCallId; }
                B.animateIE9.stop(this._$BusyIndicator); };
            a.prototype.getControlsByFieldGroupId = function(f) {
                return this.findAggregatedObjects(true, function(e) {
                    if (e instanceof a) {
                        return e.checkFieldGroupIds(f); }
                    return false; }); };
            a.prototype.checkFieldGroupIds = function(f) {
                if (typeof f === "string") {
                    if (f === "") {
                        return this.checkFieldGroupIds([]); }
                    return this.checkFieldGroupIds(f.split(",")); }
                var F = this._getFieldGroupIds();
                if (q.isArray(f)) {
                    var c = 0;
                    for (var i = 0; i < f.length; i++) {
                        if (F.indexOf(f[i]) > -1) { c++; } }
                    return c === f.length; } else if (!f && F.length > 0) {
                    return true; }
                return false; };
            a.prototype.triggerValidateFieldGroup = function(f) { this.fireValidateFieldGroup({ fieldGroupIds: f }); }; })();
        return a; });
    sap.ui.predefine('sap/ui/core/Core', ['jquery.sap.global', 'sap/ui/Device', 'sap/ui/Global', 'sap/ui/base/DataType', 'sap/ui/base/EventProvider', 'sap/ui/base/Object', './Component', './Configuration', './Control', './Element', './ElementMetadata', './FocusHandler', './RenderManager', './ResizeHandler', './ThemeCheck', './UIArea', './message/MessageManager', 'jquery.sap.act', 'jquery.sap.dom', 'jquery.sap.events', 'jquery.sap.mobile', 'jquery.sap.properties', 'jquery.sap.resources', 'jquery.sap.script'], function(q, D, G, a, E, B, C, c, d, e, g, F, R, h, T, U, M) { "use strict";
        var L = {};
        var _;
        var k = B.extend("sap.ui.core.Core", { constructor: function() {
                if (sap.ui.getCore && sap.ui.getCore()) {
                    return sap.ui.getCore(); }
                var t = this,
                    l = q.sap.log,
                    b = "sap.ui.core.Core";
                B.call(this);
                _ = new E();
                ["attachEvent", "detachEvent", "getEventingParent"].forEach(function(K) { k.prototype[K] = _[K].bind(_); });
                this.bBooted = false;
                this.bInitialized = false;
                this.bDomReady = false;
                this.aPlugins = [];
                this.mLibraries = {};
                this.mResourceBundles = {};
                this.mUIAreas = {};
                this.oModels = {};
                this.oEventBus = null;
                this.mElements = {};
                this.mObjects = { "component": {}, "template": {} };
                this.oRootComponent = null;
                this.aInitListeners = [];
                this.bInitLegacyLib = false;
                l.info("Creating Core", null, b);
                q.sap.measure.start("coreComplete", "Core.js - complete");
                q.sap.measure.start("coreBoot", "Core.js - boot");
                q.sap.measure.start("coreInit", "Core.js - init");
                this.oConfiguration = new c(this);
                var f = this.oConfiguration["frameOptionsConfig"] || {};
                f.mode = this.oConfiguration.getFrameOptions();
                f.whitelistService = this.oConfiguration.getWhitelistService();
                this.oFrameOptions = new q.sap.FrameOptions(f);
                if (this.oConfiguration["bindingSyntax"] === "complex") { sap.ui.base.ManagedObject.bindingParser = sap.ui.base.BindingParser.complexParser; }
                if (this.oConfiguration["xx-designMode"] == true) { sap.ui.base.BindingParser._keepBindingStrings = true; }
                this._grantFriendAccess();
                var m = this.oConfiguration.modules;
                if (this.oConfiguration.getDebug()) { m.unshift("sap.ui.debug.DebugEnv"); }
                var i = q.inArray("sap.ui.core.library", m);
                if (i != 0) {
                    if (i > 0) { m.splice(i, 1); }
                    m.unshift("sap.ui.core.library"); }
                if (this.oConfiguration["xx-lesssupport"] && q.inArray("sap.ui.core.plugin.LessSupport", m) == -1) { l.info("Including LessSupport into declared modules");
                    m.push("sap.ui.core.plugin.LessSupport"); }
                var p = this.oConfiguration.preload;
                if (window["sap-ui-debug"]) { p = ""; }
                if (p === "auto") { p = (window["sap-ui-optimized"] && !this.oConfiguration['xx-loadAllMode']) ? "sync" : ""; }
                this.oConfiguration.preload = p;
                l.info("Declared modules: " + m, b);
                this._setupThemes();
                this._setupRTL();
                var $ = q("html");
                this._setupBrowser($);
                this._setupOS($);
                this._setupLang($);
                this._setupAnimation($);
                this._setupWeinre();
                sap.ui.getCore = q.sap.getter(this.getInterface());
                this.oRenderManager = new R();
                var s = q.sap.syncPoint("UI5 Document Ready", function(O, K) { t.handleLoad(); });
                var j = s.startTask("document.ready");
                var n = s.startTask("preload and boot");
                q(function() { l.trace("document is ready");
                    s.finishTask(j); });
                var o = q.sap.syncPoint("UI5 Core Preloads and Bootstrap Script", function(O, K) { l.trace("Core loaded: open=" + O + ", failures=" + K);
                    t._boot();
                    s.finishTask(n);
                    q.sap.measure.end("coreBoot"); });
                var u = o.startTask("create sp2 tasks task");
                if (this.oConfiguration["versionedLibCss"]) {
                    var v = o.startTask("load version info");
                    var w = function(V) {
                        if (V) { l.trace("Loaded \"sap-ui-version.json\"."); } else { l.error("Could not load \"sap-ui-version.json\"."); }
                        o.finishTask(v); };
                    var A = p === "async";
                    var x = sap.ui.getVersionInfo({ async: A, failOnError: false });
                    if (x instanceof Promise) { x.then(w, function(K) { l.error("Unexpected error when loading \"sap-ui-version.json\": " + K);
                            o.finishTask(v); }); } else { w(x); } }
                var y = this.oConfiguration["xx-bootTask"];
                if (y) {
                    var z = o.startTask("custom boot task");
                    y(function(K) { o.finishTask(z, typeof K === "undefined" || K === true); }); }
                this._polyfillFlexbox();
                var H = o.startTask("bootstrap script");
                this.boot = function() {
                    if (this.bBooted) {
                        return; }
                    this.bBooted = true;
                    o.finishTask(H); };
                if (p === "sync" || p === "async") {
                    var I = p !== "sync";
                    q.each(m, function(i, K) {
                        if (K.match(/\.library$/)) { q.sap.preloadModules(K + "-preload", I, o); } }); }
                var J = this.oConfiguration.getAppCacheBuster();
                if (J && J.length > 0) { q.sap.require("sap.ui.core.AppCacheBuster");
                    sap.ui.core.AppCacheBuster.boot(o); }
                o.finishTask(u); }, metadata: { publicMethods: ["boot", "isInitialized", "isThemeApplied", "attachInitEvent", "attachInit", "getRenderManager", "createRenderManager", "getConfiguration", "setRoot", "createUIArea", "getUIArea", "getUIDirty", "getElementById", "getCurrentFocusedControlId", "getControl", "getComponent", "getTemplate", "lock", "unlock", "isLocked", "attachEvent", "detachEvent", "applyChanges", "getEventBus", "applyTheme", "setThemeRoot", "attachThemeChanged", "detachThemeChanged", "getStaticAreaRef", "registerPlugin", "unregisterPlugin", "getLibraryResourceBundle", "byId", "getLoadedLibraries", "loadLibrary", "loadLibraries", "initLibrary", "includeLibraryTheme", "setModel", "getModel", "hasModel", "isMobile", "attachControlEvent", "detachControlEvent", "attachIntervalTimer", "detachIntervalTimer", "attachParseError", "detachParseError", "fireParseError", "attachValidationError", "detachValidationError", "fireValidationError", "attachFormatError", "detachFormatError", "fireFormatError", "attachValidationSuccess", "detachValidationSuccess", "fireValidationSuccess", "attachLocalizationChanged", "detachLocalizationChanged", "attachLibraryChanged", "detachLibraryChanged", "isStaticAreaRef", "createComponent", "getRootComponent", "getApplication", "setMessageManager", "getMessageManager", "byFieldGroupId"] } });
        k.M_EVENTS = { ControlEvent: "ControlEvent", UIUpdated: "UIUpdated", ThemeChanged: "ThemeChanged", LocalizationChanged: "localizationChanged", LibraryChanged: "libraryChanged", ValidationError: "validationError", ParseError: "parseError", FormatError: "formatError", ValidationSuccess: "validationSuccess" };
        var S = "sap-ui-static";
        k.prototype._grantFriendAccess = function() {
            var t = this;
            g.prototype.register = function(m) { t.registerElementClass(m); };
            e.prototype.register = function() { t.registerElement(this); };
            e.prototype.deregister = function() { t.deregisterElement(this); };
            e._updateFocusInfo = function(o) {
                if (t.oFocusHandler) { t.oFocusHandler.updateControlFocusInfo(o); } };
            C.prototype.register = function() { t.registerObject(this); };
            C.prototype.deregister = function() {
                var s = this.sId;
                for (var b in t.mElements) {
                    var o = t.mElements[b];
                    if (o._sapui_candidateForDestroy && o._sOwnerId === s && !o.getParent()) { q.sap.log.debug("destroying dangling template " + o + " when destroying the owner component");
                        o.destroy(); } }
                t.deregisterObject(this); }; };
        k.prototype._setupThemes = function() {
            var l = q.sap.log,
                b = "sap.ui.core.Core";
            var o = window["sap-ui-config"];
            if (this.oConfiguration.themeRoot) { o = o || {};
                o.themeroots = o.themeroots || {};
                o.themeroots[this.oConfiguration.getTheme()] = this.oConfiguration.themeRoot; }
            if (o) {
                if (o.themeroots) {
                    for (var t in o.themeroots) {
                        var f = o.themeroots[t];
                        if (typeof f === "string") { this.setThemeRoot(t, f); } else {
                            for (var i in f) {
                                if (i.length > 0) { this.setThemeRoot(t, [i], f[i]); } else { this.setThemeRoot(t, f[i]); } } } } } }
            this.sTheme = this.oConfiguration.getTheme();
            q(document.documentElement).addClass("sapUiTheme-" + this.sTheme);
            l.info("Declared theme " + this.sTheme, null, b); };
        k.prototype._setupRTL = function() {
            var l = q.sap.log,
                b = "sap.ui.core.Core";
            if (this.oConfiguration.getRTL()) { q(document.documentElement).attr("dir", "rtl");
                l.info("RTL mode activated", null, b); } };
        k.prototype._setupBrowser = function($) {
            var l = q.sap.log,
                f = "sap.ui.core.Core";
            $ = $ || q("html");
            var b = D.browser;
            var i = b.name;
            if (i === b.BROWSER.CHROME) { q.browser.safari = false;
                q.browser.chrome = true; } else if (i === b.BROWSER.SAFARI) { q.browser.safari = true;
                q.browser.chrome = false;
                if (b.mobile) { i = "m" + i; } }
            if (i) { q.browser.fVersion = b.version;
                q.browser.mobile = b.mobile;
                i = i + (b.version === -1 ? "" : Math.floor(b.version));
                $.attr("data-sap-ui-browser", i);
                l.debug("Browser-Id: " + i, null, f); } };
        k.prototype._setupOS = function($) { $ = $ || q("html");
            $.attr("data-sap-ui-os", D.os.name + D.os.versionStr);
            var o = null;
            switch (D.os.name) {
                case D.os.OS.IOS:
                    o = "sap-ios";
                    break;
                case D.os.OS.ANDROID:
                    o = "sap-android";
                    break;
                case D.os.OS.BLACKBERRY:
                    o = "sap-bb";
                    break;
                case D.os.OS.WINDOWS_PHONE:
                    o = "sap-winphone";
                    break; }
            if (o) { $.addClass(o); } };
        k.prototype._setupLang = function($) { $ = $ || q("html");
            var u = function() {
                var l = this.oConfiguration.getLocale();
                if (l) { $.attr("lang", l.toString()); } else { $.removeAttr("lang"); } };
            u.call(this);
            this.attachLocalizationChanged(u, this); };
        k.prototype._setupAnimation = function($) { $ = $ || q("html");
            var A = this.oConfiguration.getAnimation();
            $.attr("data-sap-ui-animation", A ? "on" : "off");
            q.fx.off = !A; };
        k.prototype._setupWeinre = function() {
            var l = q.sap.log;
            if (this.oConfiguration.getWeinreId()) { l.info("Starting WEINRE Remote Web Inspector");
                var w = "<script src=\"";
                w += this.oConfiguration.getWeinreServer();
                w += "/target/target-script-min.js#";
                w += q.sap.encodeURL(this.oConfiguration.getWeinreId());
                w += "\"></script>";
                document.write(w); } };
        k.prototype._polyfillFlexbox = function() {
            var u = new q.sap.Version(this.oConfiguration.getCompatibilityVersion("flexBoxPolyfill"));
            if (u.compareTo("1.16") >= 0) { q.support.useFlexBoxPolyfill = false; } else if (!q.support.flexBoxLayout && !q.support.newFlexBoxLayout && !q.support.ie10FlexBoxLayout) { q.support.useFlexBoxPolyfill = true; } else { q.support.useFlexBoxPolyfill = false; } };
        k.prototype._boot = function() { this.lock();
            var b = this.oConfiguration['preloadLibCss'];
            if (b && b.length > 0 && !b.appManaged) { this.includeLibraryTheme("sap-ui-merged", undefined, "?l=" + b.join(",")); }
            var t = this;
            q.each(this.oConfiguration.modules, function(i, f) {
                var m = f.match(/^(.*)\.library$/);
                if (m) { t.loadLibrary(m[1]); } else { q.sap.require(f); } });
            this.unlock(); };
        k.prototype.applyTheme = function(t, s) { t = this.oConfiguration._normalizeTheme(t, s);
            if (s) { this.setThemeRoot(t, s); }
            if (t && this.sTheme != t) {
                var b = this.sTheme;
                this._updateThemeUrls(t);
                this.sTheme = t;
                this.oConfiguration._setTheme(t);
                q(document.documentElement).removeClass("sapUiTheme-" + b).addClass("sapUiTheme-" + t);
                if (this.oThemeCheck) { this.oThemeCheck.fireThemeChangedEvent(false, true); } } };
        k.prototype._updateThemeUrls = function(t) {
            var b = this,
                s = this.oConfiguration.getRTL() ? "-RTL" : "";
            q("link[id^=sap-ui-theme-]").each(function() {
                var l = this.id.slice(13),
                    f = this.href.slice(this.href.lastIndexOf("/") + 1),
                    i = "library",
                    H, p, $ = q(this);
                if ((p = l.indexOf("-[")) > 0) { i += l.slice(p + 2, -1);
                    l = l.slice(0, p); }
                if (f === (i + ".css") || f === (i + "-RTL.css")) { f = i + s + ".css"; }
                if ($.attr("data-sap-ui-css-count")) { $.remove(); }
                H = b._getThemePath(l, t) + f;
                if (H != this.href) { this.href = H;
                    $.removeAttr("data-sap-ui-ready"); } }); };
        k.prototype._ensureThemeRoot = function(l, t) {
            if (this._mThemeRoots) {
                var p = this._mThemeRoots[t + " " + l] || this._mThemeRoots[t];
                if (p) { p = p + l.replace(/\./g, "/") + "/themes/" + t + "/";
                    q.sap.registerModulePath(l + ".themes." + t, p); } } };
        k.prototype._getThemePath = function(l, t) { this._ensureThemeRoot(l, t);
            return q.sap.getModulePath(l + ".themes." + t, "/"); };
        k.prototype.setThemeRoot = function(t, l, s) {
            if (!this._mThemeRoots) { this._mThemeRoots = {}; }
            if (s === undefined) { s = l;
                l = undefined; }
            s = s + (s.slice(-1) == "/" ? "" : "/");
            if (l) {
                for (var i = 0; i < l.length; i++) {
                    var b = l[i];
                    this._mThemeRoots[t + " " + b] = s; } } else { this._mThemeRoots[t] = s; }
            return this; };
        k.prototype.init = function() {
            if (this.bInitialized) {
                return; }
            var l = q.sap.log,
                b = "sap.ui.core.Core.init()";
            this.boot();
            l.info("Initializing", null, b);
            this.oFocusHandler = new F(document.body, this);
            this.oRenderManager._setFocusHandler(this.oFocusHandler);
            this.oResizeHandler = new h(this);
            this.oThemeCheck = new T(this);
            l.info("Initialized", null, b);
            q.sap.measure.end("coreInit");
            this.bInitialized = true;
            l.info("Starting Plugins", null, b);
            this.startPlugins();
            l.info("Plugins started", null, b);
            this._createUIAreas();
            this.oThemeCheck.fireThemeChangedEvent(true);
            this._executeOnInit();
            this._setupRootComponent();
            this._setBodyAccessibilityRole();
            this._executeInitListeners();
            this.renderPendingUIUpdates();
            q.sap.measure.end("coreComplete"); };
        k.prototype._createUIAreas = function() {
            var o = this.oConfiguration;
            if (o.areas) {
                for (var i = 0, l = o.areas.length; i < l; i++) { this.createUIArea(o.areas[i]); }
                o.areas = undefined; } };
        k.prototype._executeOnInit = function() {
            var o = this.oConfiguration;
            if (o.onInit) {
                if (typeof o.onInit === "function") { o.onInit(); } else { q.sap.globalEval(o.onInit); }
                o.onInit = undefined; } };
        k.prototype._setupRootComponent = function() {
            var l = q.sap.log,
                b = "sap.ui.core.Core.init()",
                o = this.oConfiguration;
            var s = o.getRootComponent();
            if (s) { l.info("Loading Root Component: " + s, null, b);
                var f = sap.ui.component({ name: s });
                this.oRootComponent = f;
                var i = o["xx-rootComponentNode"];
                if (i && f instanceof sap.ui.core.UIComponent) {
                    var j = q.sap.domById(i);
                    if (j) { l.info("Creating ComponentContainer for Root Component: " + s, null, b);
                        var m = new sap.ui.core.ComponentContainer({ component: f, propagateModel: true });
                        m.placeAt(j); } } } else {
                var A = o.getApplication();
                if (A) { l.warning("The configuration 'application' is deprecated. Please use the configuration 'component' instead! Please migrate from sap.ui.app.Application to sap.ui.core.Component.");
                    l.info("Loading Application: " + A, null, b);
                    q.sap.require(A);
                    var n = q.sap.getObject(A);
                    var p = new n(); } } };
        k.prototype._setBodyAccessibilityRole = function() {
            var o = this.oConfiguration;
            var $ = q("body");
            if (o.getAccessibility() && o.getAutoAriaBodyRole() && !$.attr("role")) { $.attr("role", "application"); } };
        k.prototype._executeInitListeners = function() {
            var l = q.sap.log,
                b = "sap.ui.core.Core.init()";
            var j = this.aInitListeners;
            this.aInitListeners = undefined;
            if (j && j.length > 0) { l.info("Fire Loaded Event", null, b);
                q.each(j, function(i, f) { f(); }); } };
        k.prototype.handleLoad = function() { this.bDomReady = true;
            var w = this.isLocked();
            if (!w) { this.lock(); }
            this.init();
            if (!w) { this.unlock(); } };
        k.prototype.isInitialized = function() {
            return this.bInitialized; };
        k.prototype.isThemeApplied = function() {
            return T.themeLoaded; };
        k.prototype.attachInitEvent = function(f) {
            if (this.aInitListeners) { this.aInitListeners.push(f); } };
        k.prototype.attachInit = function(f) {
            if (this.aInitListeners) { this.aInitListeners.push(f); } else { f(); } };
        k.prototype.lock = function() { this.bLocked = true; };
        k.prototype.unlock = function() { this.bLocked = false; };
        k.prototype.isLocked = function() {
            return this.bLocked; };
        k.prototype.getConfiguration = function() {
            return this.oConfiguration; };
        k.prototype.getRenderManager = function() {
            return this.createRenderManager(); };
        k.prototype.createRenderManager = function() {
            var o = new R();
            o._setFocusHandler(this.oFocusHandler);
            return o.getInterface(); };
        k.prototype.getCurrentFocusedControlId = function() {
            if (!this.isInitialized()) {
                throw new Error("Core must be initialized"); }
            return this.oFocusHandler.getCurrentFocusedControlId(); };
        k.prototype.loadLibrary = function(l, u) {
            if (!L[l]) {
                var m = l + ".library",
                    A;
                if (u) { q.sap.registerModulePath(l, u); }
                if (this.oConfiguration['xx-loadAllMode'] && !q.sap.isDeclared(m)) { A = m + "-all";
                    q.sap.log.debug("load all-in-one file " + A);
                    q.sap.require(A); } else if (this.oConfiguration.preload === 'sync' || this.oConfiguration.preload === 'async') { q.sap.preloadModules(m + "-preload", false); }
                q.sap.require(m);
                if (!L[l]) { q.sap.log.warning("library " + l + " didn't initialize itself");
                    this.initLibrary(l); }
                if (this.oThemeCheck && this.isInitialized()) { this.oThemeCheck.fireThemeChangedEvent(true); } }
            return this.mLibraries[l]; };
        k.prototype.loadLibraries = function(l, o) { o = q.extend({ async: true }, o);
            var t = this,
                p = this.oConfiguration.preload === 'sync' || this.oConfiguration.preload === 'async',
                A = o.async;

            function b(s) {
                if (p) { q.each(l, function(i, j) { q.sap.preloadModules(j + ".library-preload", !!s, s); }); } }

            function f() { q.each(l, function(i, s) { q.sap.require(s + ".library"); });
                if (t.oThemeCheck && t.isInitialized()) { t.oThemeCheck.fireThemeChangedEvent(true); } }
            if (A && p) {
                return new Promise(function(i, j) {
                    var s = q.sap.syncPoint("Load Libraries", function(O, n) {
                        if (!n) { f();
                            i(); } else { j(); } });
                    var m = s.startTask("load libraries");
                    b(s);
                    s.finishTask(m); }); } else { b(null);
                f(); } };
        k.prototype.createComponent = function(v, u, i, s) {
            if (typeof v === "string") { v = { name: v, url: u };
                if (typeof i === "object") { v.settings = i; } else { v.id = i;
                    v.settings = s; } }
            return sap.ui.component(v); };
        k.prototype.getRootComponent = function() {
            return this.oRootComponent; };
        k.prototype.initLibrary = function(l) {
            var b = typeof l === "string",
                o = b ? { name: l } : l,
                s = o.name,
                f = q.sap.log,
                m = "sap.ui.core.Core.initLibrary()";
            if (b) { f.warning("[Deprecated] library " + s + " uses old fashioned initLibrary() call (rebuild with newest generator)"); }
            if (!s || L[s]) {
                return; }
            f.debug("Analyzing Library " + s, null, m);
            L[s] = true;

            function n(j, I) {
                var K, v;
                for (K in I) { v = I[K];
                    if (v !== undefined) {
                        if (q.isArray(j[K])) {
                            if (j[K].length === 0) { j[K] = v; } else { j[K] = q.sap.unique(j[K].concat(v)); } } else if (j[K] === undefined) { j[K] = v; } else { q.sap.log.warning("library info setting ignored: " + K + "=" + v); } } }
                return j; }
            q.sap.getObject(s, 0);
            this.mLibraries[s] = o = n(this.mLibraries[s] || { name: s, dependencies: [], types: [], interfaces: [], controls: [], elements: [] }, o);

            function p() {
                var P = q.sap.properties({ url: sap.ui.resource(s, "library.properties") });
                o.version = P.getProperty(s + "[version]");
                var v = P.getProperty(s + "[dependencies]");
                f.debug("Required Libraries: " + v, null, m);
                o.dependencies = (v && v.split(/[,;| ]/)) || [];
                var K = P.getKeys(),
                    w = /(.+)\.(type|interface|control|element)$/,
                    x;
                for (var j = 0; j < K.length; j++) {
                    var y = P.getProperty(K[j]);
                    if ((x = y.match(w)) !== null) { o[x[2] + "s"].push(K[j]); } } }
            if (b) { p(); }
            for (var i = 0; i < o.dependencies.length; i++) {
                var t = o.dependencies[i];
                f.debug("resolve Dependencies to " + t, null, m);
                if (!L[t]) { f.warning("Dependency from " + s + " to " + t + " has not been resolved by library itself", null, m);
                    this.loadLibrary(t); } }
            a.registerInterfaceTypes(o.interfaces);
            for (var i = 0; i < o.types.length; i++) {
                if (!/^(any|boolean|float|int|string|object|void)$/.test(o.types[i])) { q.sap.declare(o.types[i]); } }
            var u = o.controls.concat(o.elements);
            for (var i = 0; i < u.length; i++) { sap.ui.lazyRequire(u[i], "new extend getMetadata"); }
            if (!o.noLibraryCSS) { this._ensureThemeRoot(s, this.sTheme);
                if (this.oConfiguration['preloadLibCss'].indexOf(s) < 0) {
                    var Q = this._getLibraryCssQueryParams(o);
                    this.includeLibraryTheme(s, undefined, Q); } }
            o.sName = o.name;
            o.aControls = o.controls;
            if (!q.sap.isDeclared(s + ".library")) { f.warning("Library Module " + s + ".library" + " not loaded automatically", null, m);
                q.sap.require(s + ".library"); }
            this.fireLibraryChanged({ name: s, stereotype: "library", operation: "add", metadata: o }); };
        k.prototype.includeLibraryTheme = function(l, v, Q) {
            if ((l != "sap.ui.legacy") && (l != "sap.ui.classic")) {
                if (!v) { v = ""; }
                var s = (this.oConfiguration.getRTL() ? "-RTL" : "");
                var b, f = l + (v.length > 0 ? "-[" + v + "]" : v);
                if (l && l.indexOf(":") == -1) { b = "library" + v + s; } else { b = l.substring(l.indexOf(":") + 1) + v;
                    l = l.substring(0, l.indexOf(":")); }
                var i = this._getThemePath(l, this.sTheme) + b + ".css" + (Q ? Q : "");
                q.sap.log.info("Including " + i + " -  sap.ui.core.Core.includeLibraryTheme()");
                q.sap.includeStyleSheet(i, "sap-ui-theme-" + f);
                var P = sap.ui.require("sap/ui/core/theming/Parameters");
                if (P) { P._addLibraryTheme(f, i); } } };
        k.prototype._getLibraryCssQueryParams = function(l) {
            var Q;
            if (this.oConfiguration["versionedLibCss"] && l) { Q = "?version=" + l.version;
                if (sap.ui.versioninfo) { Q += "&sap-ui-dist-version=" + sap.ui.versioninfo.version; } }
            return Q; };
        k.prototype.getLoadedLibraries = function() {
            return q.extend({}, this.mLibraries); };
        k.prototype.getLibraryResourceBundle = function(l, s) { l = l || "sap.ui.core";
            s = s || this.getConfiguration().getLanguage();
            var K = l + "/" + s;
            if (!this.mResourceBundles[K]) {
                var u = sap.ui.resource(l, 'messagebundle.properties');
                this.mResourceBundles[K] = q.sap.resources({ url: u, locale: s }); }
            return this.mResourceBundles[K]; };
        k.prototype.setRoot = function(o, b) {
            if (b) { b.placeAt(o, "only"); } };
        k.prototype.createUIArea = function(o) {
            var t = this;
            if (!o) {
                throw new Error("oDomRef must not be null"); }
            if (typeof(o) === "string") {
                var i = o;
                if (i == S) { o = this.getStaticAreaRef(); } else { o = q.sap.domById(o);
                    if (!o) {
                        throw new Error("DOM element with ID '" + i + "' not found in page, but application tries to insert content."); } } }
            if (!o.id || o.id.length == 0) { o.id = q.sap.uid(); }
            var I = o.id;
            if (!this.mUIAreas[I]) { this.mUIAreas[I] = new U(this, o);
                if (!q.isEmptyObject(this.oModels)) { t.mUIAreas[I].oPropagatedProperties = { oModels: q.extend({}, this.oModels), oBindingContexts: {} };
                    this.mUIAreas[I].propagateProperties(true); } } else { this.mUIAreas[I].setRootNode(o); }
            return this.mUIAreas[I]; };
        k.prototype.getUIArea = function(o) {
            var i = "";
            if (typeof(o) == "string") { i = o; } else { i = o.id; }
            if (i) {
                return this.mUIAreas[i]; }
            return null; };
        var r = U._oRenderLog;
        k.prototype.addInvalidatedUIArea = function(u) {
            if (!this._sRerenderTimer) { r.debug("Registering timer for delayed re-rendering");
                this._sRerenderTimer = q.sap.delayedCall(0, this, "renderPendingUIUpdates"); } };
        k.MAX_RENDERING_ITERATIONS = 20;
        k.prototype.renderPendingUIUpdates = function() { r.debug("Render pending UI updates: start");
            q.sap.measure.start("renderPendingUIUpdates", "Render pending UI updates in all UIAreas");
            var u = false,
                l = k.MAX_RENDERING_ITERATIONS > 0,
                i = 0;
            this._bRendering = true;
            do {
                if (l) { i++;
                    if (i > k.MAX_RENDERING_ITERATIONS) { this._bRendering = false;
                        throw new Error("Rendering has been re-started too many times (" + i + "). Add URL parameter sap-ui-xx-debugRendering=true for a detailed analysis."); }
                    if (i > 1) { r.debug("Render pending UI updates: iteration " + i); } }
                if (this._sRerenderTimer) { q.sap.clearDelayedCall(this._sRerenderTimer);
                    this._sRerenderTimer = undefined; }
                var m = this.mUIAreas;
                for (var I in m) { u = m[I].rerender() || u; } } while (l && this._sRerenderTimer);
            this._bRendering = false;
            if (u) { this.fireUIUpdated(); }
            r.debug("Render pending UI updates: finished");
            q.sap.measure.end("renderPendingUIUpdates"); };
        k.prototype.getUIDirty = function() {
            return !!(this._sRerenderTimer || this._bRendering); };
        k.prototype.attachUIUpdated = function(f, l) { _.attachEvent(k.M_EVENTS.UIUpdated, f, l); };
        k.prototype.detachUIUpdated = function(f, l) { _.detachEvent(k.M_EVENTS.UIUpdated, f, l); };
        k.prototype.fireUIUpdated = function(p) { _.fireEvent(k.M_EVENTS.UIUpdated, p); };
        k.prototype.attachThemeChanged = function(f, l) { _.attachEvent(k.M_EVENTS.ThemeChanged, f, l); };
        k.prototype.detachThemeChanged = function(f, l) { _.detachEvent(k.M_EVENTS.ThemeChanged, f, l); };
        k.prototype.fireThemeChanged = function(p) { q.sap.scrollbarSize(true);
            var P = sap.ui.require("sap/ui/core/theming/Parameters");
            if (P) { P.reset(true); }
            var s = k.M_EVENTS.ThemeChanged;
            var o = q.Event(s);
            o.theme = p ? p.theme : null;
            q.each(this.mElements, function(i, b) { b._handleEvent(o); });
            q.sap.act.refresh();
            _.fireEvent(s, p); };
        k.prototype.attachLocalizationChanged = function(f, l) { _.attachEvent(k.M_EVENTS.LocalizationChanged, f, l); };
        k.prototype.detachLocalizationChanged = function(f, l) { _.detachEvent(k.M_EVENTS.LocalizationChanged, f, l); };
        k.prototype.fireLocalizationChanged = function(m) {
            var s = k.M_EVENTS.LocalizationChanged,
                b = q.Event(s, { changes: m }),
                A = sap.ui.base.ManagedObject._handleLocalizationChange,
                f = [];
            q.each(m, function(i, v) { f.push(i); });
            q.sap.log.info("localization settings changed: " + f.join(","), null, "sap.ui.core.Core");
            q.each(this.oModels, function(N, o) {
                if (o && o._handleLocalizationChange) { o._handleLocalizationChange(); } });

            function n(p) { q.each(this.mUIAreas, function() { A.call(this, p); });
                q.each(this.mObjects["component"], function() { A.call(this, p); });
                q.each(this.mElements, function() { A.call(this, p); }); }
            n.call(this, 1);
            n.call(this, 2);
            if (m.rtl != undefined) { q(document.documentElement).attr("dir", m.rtl ? "rtl" : "ltr");
                this._updateThemeUrls(this.sTheme);
                q.each(this.mUIAreas, function() { this.invalidate(); });
                q.sap.log.info("RTL mode " + m.rtl ? "activated" : "deactivated"); }
            q.each(this.mElements, function(i, o) { this._handleEvent(b); });
            _.fireEvent(s, { changes: m }); };
        k.prototype.attachLibraryChanged = function(f, l) { _.attachEvent(k.M_EVENTS.LibraryChanged, f, l); };
        k.prototype.detachLibraryChanged = function(f, l) { _.detachEvent(k.M_EVENTS.LibraryChanged, f, l); };
        k.prototype.fireLibraryChanged = function(p) { _.fireEvent(k.M_EVENTS.LibraryChanged, p); };
        k.prototype.applyChanges = function() { this.renderPendingUIUpdates(); };
        k.prototype.registerElementClass = function(m) {
            var n = m.getName(),
                l = m.getLibraryName() || "",
                o = this.mLibraries[l],
                s = d.prototype.isPrototypeOf(m.getClass().prototype) ? 'controls' : 'elements';
            if (!o) { q.sap.getObject(l, 0);
                o = this.mLibraries[l] = { name: l, dependencies: [], types: [], interfaces: [], controls: [], elements: [] }; }
            if (q.inArray(n, o[s]) < 0) { o[s].push(n);
                q.sap.log.debug("Class " + m.getName() + " registered for library " + m.getLibraryName());
                this.fireLibraryChanged({ name: m.getName(), stereotype: m.getStereotype(), operation: "add", metadata: m }); } };
        k.prototype.registerElement = function(o) {
            var i = o.getId(),
                b = this.mElements[i];
            if (b && b !== o) {
                if (b._sapui_candidateForDestroy) { q.sap.log.debug("destroying dangling template " + b + " when creating new object with same ID");
                    b.destroy(); } else {
                    if (this.oConfiguration.getNoDuplicateIds()) { q.sap.log.error("adding element with duplicate id '" + i + "'");
                        throw new Error("Error: adding element with duplicate id '" + i + "'"); } else { q.sap.log.warning("adding element with duplicate id '" + i + "'"); } } }
            this.mElements[i] = o; };
        k.prototype.deregisterElement = function(o) { delete this.mElements[o.getId()]; };
        k.prototype.registerObject = function(o) {
            var i = o.getId(),
                t = o.getMetadata().getStereotype(),
                b = this.getObject(t, i);
            if (b && b !== o) { q.sap.log.error("adding object \"" + t + "\" with duplicate id '" + i + "'");
                throw new Error("Error: adding object \"" + t + "\" with duplicate id '" + i + "'"); }
            this.mObjects[t][i] = o; };
        k.prototype.deregisterObject = function(o) {
            var i = o.getId(),
                t = o.getMetadata().getStereotype();
            delete this.mObjects[t][i]; };
        k.prototype.byId = function(i) {
            return i == null ? undefined : this.mElements[i]; };
        k.prototype.getControl = k.prototype.byId;
        k.prototype.getElementById = k.prototype.byId;
        k.prototype.getObject = function(t, i) {
            return i == null ? undefined : this.mObjects[t] && this.mObjects[t][i]; };
        k.prototype.getComponent = function(i) {
            return this.getObject("component", i); };
        k.prototype.getTemplate = function(i) { q.sap.require("sap.ui.core.tmpl.Template");
            return sap.ui.core.tmpl.Template.byId(i); };
        k.prototype.getStaticAreaRef = function() {
            var s = q.sap.domById(S);
            if (!s) {
                if (!this.bDomReady) {
                    throw new Error("DOM is not ready yet. Static UIArea cannot be created."); }
                var A = { id: S };
                if (q("body").attr("role") != "application") { A.role = "application"; }
                var l = this.getConfiguration().getRTL() ? "right" : "left";
                s = q("<DIV/>", A).css({ "height": "0", "width": "0", "overflow": "hidden", "float": l }).prependTo(document.body)[0];
                this.createUIArea(s).bInitial = false; }
            return s; };
        k.prototype.isStaticAreaRef = function(o) {
            return o && (o.id === S); };
        k._I_INTERVAL = 200;
        h.prototype.I_INTERVAL = k._I_INTERVAL;
        k.prototype.attachIntervalTimer = function(f, l) {
            if (!this.oTimedTrigger) { q.sap.require("sap.ui.core.IntervalTrigger");
                this.oTimedTrigger = new sap.ui.core.IntervalTrigger(k._I_INTERVAL); }
            this.oTimedTrigger.addListener(f, l); };
        k.prototype.detachIntervalTimer = function(f, l) {
            if (this.oTimedTrigger) { this.oTimedTrigger.removeListener(f, l); } };
        k.prototype.attachControlEvent = function(f, l) { _.attachEvent(k.M_EVENTS.ControlEvent, f, l); };
        k.prototype.detachControlEvent = function(f, l) { _.detachEvent(k.M_EVENTS.ControlEvent, f, l); };
        k.prototype.fireControlEvent = function(p) { _.fireEvent(k.M_EVENTS.ControlEvent, p); };
        k.prototype._handleControlEvent = function(o, u) {
            var b = q.Event(o.type);
            q.extend(b, o);
            b.originalEvent = undefined;
            this.fireControlEvent({ "browserEvent": b, "uiArea": u }); };
        k.prototype.getApplication = function() {
            return sap.ui.getApplication && sap.ui.getApplication(); };
        k.prototype.registerPlugin = function(p) {
            if (!p) {
                return; }
            for (var i = 0, l = this.aPlugins.length; i < l; i++) {
                if (this.aPlugins[i] === p) {
                    return; } }
            this.aPlugins.push(p);
            if (this.bInitialized && p && p.startPlugin) { p.startPlugin(this); } };
        k.prototype.unregisterPlugin = function(p) {
            if (!p) {
                return; }
            var P = -1;
            for (var i = this.aPlugins.length; i--; i >= 0) {
                if (this.aPlugins[i] === p) { P = i;
                    break; } }
            if (P == -1) {
                return; }
            if (this.bInitialized && p && p.stopPlugin) { p.stopPlugin(this); }
            this.aPlugins.splice(P, 1); };
        k.prototype.startPlugins = function() {
            for (var i = 0, l = this.aPlugins.length; i < l; i++) {
                var p = this.aPlugins[i];
                if (p && p.startPlugin) { p.startPlugin(this, true); } } };
        k.prototype.stopPlugins = function() {
            for (var i = 0, l = this.aPlugins.length; i < l; i++) {
                var p = this.aPlugins[i];
                if (p && p.stopPlugin) { p.stopPlugin(this); } } };
        k.prototype.setModel = function(m, n) {
            if (!m && this.oModels[n]) { delete this.oModels[n];
                q.each(this.mUIAreas, function(i, u) { u.oPropagatedProperties = { oModels: q.extend({}, u.oPropagatedProperties.oModels), oBindingContexts: u.oPropagatedProperties.oBindingContexts };
                    delete u.oPropagatedProperties.oModels[n];
                    u.propagateProperties(n); }); } else if (m && m !== this.oModels[n]) { this.oModels[n] = m;
                q.each(this.mUIAreas, function(i, u) { u.oPropagatedProperties = { oModels: q.extend({}, u.oPropagatedProperties.oModels), oBindingContexts: u.oPropagatedProperties.oBindingContexts };
                    u.oPropagatedProperties.oModels[n] = m;
                    u.propagateProperties(n); }); }
            return this; };
        k.prototype.setMessageManager = function(m) { this.oMessageManager = m; };
        k.prototype.getMessageManager = function() {
            if (!this.oMessageManager) { this.oMessageManager = new M(); }
            return this.oMessageManager; };
        k.prototype.byFieldGroupId = function(f) {
            var b = [];
            for (var n in this.mElements) {
                var o = this.mElements[n];
                if (o instanceof d && o.checkFieldGroupIds(f)) { b.push(o); } }
            return b; };
        k.prototype.getModel = function(n) {
            return this.oModels[n]; };
        k.prototype.hasModel = function() {
            return !q.isEmptyObject(this.oModels); };
        k.prototype.getEventBus = function() {
            if (!this.oEventBus) { q.sap.require("sap.ui.core.EventBus");
                this.oEventBus = new sap.ui.core.EventBus(); }
            return this.oEventBus; };
        k.prototype.attachValidationError = function(o, f, l) {
            if (typeof(o) === "function") { l = f;
                f = o;
                o = undefined; }
            _.attachEvent(k.M_EVENTS.ValidationError, o, f, l);
            return this; };
        k.prototype.detachValidationError = function(f, l) { _.detachEvent(k.M_EVENTS.ValidationError, f, l);
            return this; };
        k.prototype.attachParseError = function(o, f, l) {
            if (typeof(o) === "function") { l = f;
                f = o;
                o = undefined; }
            _.attachEvent(k.M_EVENTS.ParseError, o, f, l);
            return this; };
        k.prototype.detachParseError = function(f, l) { _.detachEvent(k.M_EVENTS.ParseError, f, l);
            return this; };
        k.prototype.attachFormatError = function(o, f, l) {
            if (typeof(o) === "function") { l = f;
                f = o;
                o = undefined; }
            _.attachEvent(k.M_EVENTS.FormatError, o, f, l);
            return this; };
        k.prototype.detachFormatError = function(f, l) { _.detachEvent(k.M_EVENTS.FormatError, f, l);
            return this; };
        k.prototype.attachValidationSuccess = function(o, f, l) {
            if (typeof(o) === "function") { l = f;
                f = o;
                o = undefined; }
            _.attachEvent(k.M_EVENTS.ValidationSuccess, o, f, l);
            return this; };
        k.prototype.detachValidationSuccess = function(f, l) { _.detachEvent(k.M_EVENTS.ValidationSuccess, f, l);
            return this; };
        k.prototype.fireParseError = function(A) { _.fireEvent(k.M_EVENTS.ParseError, A);
            return this; };
        k.prototype.fireValidationError = function(A) { _.fireEvent(k.M_EVENTS.ValidationError, A);
            return this; };
        k.prototype.fireFormatError = function(A) { _.fireEvent(k.M_EVENTS.FormatError, A);
            return this; };
        k.prototype.fireValidationSuccess = function(A) { _.fireEvent(k.M_EVENTS.ValidationSuccess, A);
            return this; };
        k.prototype.isMobile = function() {
            return D.browser.mobile; };
        k.prototype._getEventProvider = function() {
            return _; };
        k.prototype.destroy = function() { this.oFocusHandler.destroy();
            _.destroy();
            B.prototype.destroy.call(this); };
        sap.ui.setRoot = function(o, b) { sap.ui.getCore().setRoot(o, b); };
        return new k().getInterface(); });
    sap.ui.predefine('sap/ui/core/CustomStyleClassSupport', ['jquery.sap.global', './Element'], function(q, E) { "use strict";
        var C = function() {
            if (!(this instanceof E)) {
                return; }
            var o = this.clone;
            this.clone = function() {
                var c = o.apply(this, arguments);
                if (this.aCustomStyleClasses) { c.aCustomStyleClasses = this.aCustomStyleClasses.slice(); }
                return c; };
            this.addStyleClass = function(s, S) {
                if (!this.aCustomStyleClasses) { this.aCustomStyleClasses = []; }
                if (s) {
                    if (s.indexOf("\"") > -1) {
                        return this; }
                    if (s.indexOf("'") > -1) {
                        return this; }
                    for (var i = this.aCustomStyleClasses.length - 1; i >= 0; i--) {
                        if (this.aCustomStyleClasses[i] == s) {
                            return this; } }
                    this.aCustomStyleClasses.push(s);
                    var r = this.getDomRef();
                    if (r) { q(r).addClass(s); } else if (S === false) { this.invalidate(); } }
                return this; };
            this.removeStyleClass = function(s, S) {
                if (s && this.aCustomStyleClasses) {
                    for (var i = this.aCustomStyleClasses.length - 1; i >= 0; i--) {
                        if (this.aCustomStyleClasses[i] == s) { this.aCustomStyleClasses.splice(i, 1);
                            var r = this.getDomRef();
                            if (r) { q(r).removeClass(s); } else if (S === false) { this.invalidate(); } } } }
                return this; };
            this.toggleStyleClass = function(s, a) {
                if (s && typeof s === "string") {
                    if (a === true) { this.addStyleClass(s); } else if (a === false) { this.removeStyleClass(s); } else if (a === undefined) { this.hasStyleClass(s) ? this.removeStyleClass(s) : this.addStyleClass(s); } else { q.sap.log.warning(this.toString() + "- toggleStyleClass(): bAdd should be a boolean or undefined, but is '" + a + "'"); } }
                return this; };
            this.hasStyleClass = function(s) {
                if (s && this.aCustomStyleClasses) {
                    for (var i = this.aCustomStyleClasses.length - 1; i >= 0; i--) {
                        if (this.aCustomStyleClasses[i] == s) {
                            return true; } } }
                return false; };
            this.getMetadata().addPublicMethods(["addStyleClass", "removeStyleClass", "toggleStyleClass", "hasStyleClass"]); };
        return C; }, true);
    sap.ui.predefine('sap/ui/core/Element', ['jquery.sap.global', '../base/Object', '../base/ManagedObject', './ElementMetadata', 'jquery.sap.strings', 'jquery.sap.trace'], function(q, B, M, E) { "use strict";
        var a = M.extend("sap.ui.core.Element", { metadata: { stereotype: "element", "abstract": true, publicMethods: ["getId", "getMetadata", "getTooltip_AsString", "getTooltip_Text", "getModel", "setModel", "hasModel", "bindElement", "unbindElement", "getElementBinding", "prop", "getLayoutData", "setLayoutData"], library: "sap.ui.core", aggregations: { tooltip: { name: "tooltip", type: "sap.ui.core.TooltipBase", altTypes: ["string"], multiple: false }, customData: { name: "customData", type: "sap.ui.core.CustomData", multiple: true, singularName: "customData" }, layoutData: { name: "layoutData", type: "sap.ui.core.LayoutData", multiple: false, singularName: "layoutData" }, dependents: { name: "dependents", type: "sap.ui.core.Control", multiple: true } } }, constructor: function(i, s) { M.apply(this, arguments); }, renderer: null }, E);
        a.defineClass = function(c, s, m) {
            return B.defineClass(c, s, m || E); };
        a.prototype.getInterface = function() {
            return this; };
        a.prototype._handleEvent = function(e) {
            var t = this,
                h = "on" + e.type;

            function b(d) {
                var i, l, D;
                if (d && (l = d.length) > 0) { d = l === 1 ? d : d.slice();
                    for (i = 0; i < l; i++) {
                        if (e.isImmediateHandlerPropagationStopped()) {
                            return; }
                        D = d[i].oDelegate;
                        if (D[h]) { D[h].call(d[i].vThis === true ? t : d[i].vThis || D, e); } } } }
            b(this.aBeforeDelegates);
            if (e.isImmediateHandlerPropagationStopped()) {
                return; }
            if (this[h]) { this[h](e); }
            b(this.aDelegates); };
        a.create = function(d, k) {
            if (!d || d instanceof a || typeof d !== "object" || d instanceof String) {
                return d; }

            function g(t) {
                if (typeof t === "function") {
                    return t; }
                if (typeof t === "string") {
                    return q.sap.getObject(t); } }
            var c = g(d.Type) || g(k && k.type);
            if (typeof c === "function") {
                return new c(d); }
            var m = "Don't know how to create an Element from " + d + " (" + (typeof d) + ")";
            q.sap.log.fatal(m);
            throw new Error(m); };
        a.prototype.toString = function() {
            if (this.getMetadata) {
                return "Element " + this.getMetadata().getName() + "#" + this.sId; } else {
                return "Element {unknown class}#" + this.sId; } };
        a.prototype.getDomRef = function(s) {
            return q.sap.domById(s ? this.getId() + "-" + s : this.getId()); };
        a.prototype.$ = function(s) {
            return q(this.getDomRef(s)); };
        a.prototype.isActive = function() {
            return this.oParent && this.oParent.isActive(); };
        a.prototype.prop = function(p, v) {
            var P = this.getMetadata().getAllSettings()[p];
            if (P) {
                if (arguments.length == 1) {
                    return this[P._sGetter](); } else { this[P._sMutator](v);
                    return this; } } };
        a.prototype.insertDependent = function(c, i) {
            return this.insertAggregation("dependents", c, i, true); };
        a.prototype.addDependent = function(c) {
            return this.addAggregation("dependents", c, true); };
        a.prototype.removeDependent = function(c) {
            return this.removeAggregation("dependents", c, true); };
        a.prototype.removeAllDependents = function() {
            return this.removeAllAggregation("dependents", true); };
        a.prototype.destroyDependents = function() {
            return this.destroyAggregation("dependents", true); };
        a.prototype.rerender = function() {
            if (this.oParent) { this.oParent.rerender(); } };
        a.prototype.getUIArea = function() {
            return this.oParent ? this.oParent.getUIArea() : null; };
        a.prototype.destroy = function(s) { a._updateFocusInfo(this);
            M.prototype.destroy.call(this, s);
            if (s !== "KeepDom") { this.$().remove(); } else { q.sap.log.debug("DOM is not removed on destroy of " + this); } };
        a.prototype.fireEvent = function(e, p, A, b) {
            if (this.hasListeners(e)) { q.sap.interaction.notifyStepStart(this); }
            if (typeof p === 'boolean') { b = A;
                A = p;
                p = null; }
            p = p || {};
            p.id = p.id || this.getId();
            return M.prototype.fireEvent.call(this, e, p, A, b); };
        a.prototype.addDelegate = function(d, c, t, C) {
            if (!d) {
                return this; }
            this.removeDelegate(d);
            if (typeof c === "object") { C = t;
                t = c;
                c = false; }
            if (typeof t === "boolean") { C = t;
                t = undefined; }(c ? this.aBeforeDelegates : this.aDelegates).push({ oDelegate: d, bClone: !!C, vThis: ((t === this) ? true : t) });
            return this; };
        a.prototype.removeDelegate = function(d) {
            var i;
            for (i = 0; i < this.aDelegates.length; i++) {
                if (this.aDelegates[i].oDelegate == d) { this.aDelegates.splice(i, 1);
                    i--; } }
            for (i = 0; i < this.aBeforeDelegates.length; i++) {
                if (this.aBeforeDelegates[i].oDelegate == d) { this.aBeforeDelegates.splice(i, 1);
                    i--; } }
            return this; };
        a.prototype.addEventDelegate = function(d, t) {
            return this.addDelegate(d, false, t, true); };
        a.prototype.removeEventDelegate = function(d) {
            return this.removeDelegate(d); };
        a.prototype.getFocusDomRef = function() {
            return this.getDomRef() || null; };
        a.prototype.focus = function() { q.sap.focus(this.getFocusDomRef()); };
        a.prototype.getFocusInfo = function() {
            return { id: this.getId() }; };
        a.prototype.applyFocusInfo = function(f) { this.focus();
            return this; };
        a.prototype._refreshTooltipBaseDelegate = function(t) {
            var o = this.getTooltip();
            if (o instanceof sap.ui.core.TooltipBase) { this.removeDelegate(o); }
            if (t instanceof sap.ui.core.TooltipBase) { t._currentControl = this;
                this.addDelegate(t); } };
        a.prototype.setTooltip = function(t) { this._refreshTooltipBaseDelegate(t);
            this.setAggregation("tooltip", t);
            return this; };
        a.prototype.getTooltip = function() {
            return this.getAggregation("tooltip"); };
        a.runWithPreprocessors = M.runWithPreprocessors;
        a.prototype.getTooltip_AsString = function() {
            var t = this.getTooltip();
            if (typeof t === "string" || t instanceof String) {
                return t; }
            return undefined; };
        a.prototype.getTooltip_Text = function() {
            var t = this.getTooltip();
            if (t && typeof t.getText === "function") {
                return t.getText(); }
            return t; };
        (function() {
            var g = function(e, k) {
                var d = e.getAggregation("customData");
                if (d) {
                    for (var i = 0; i < d.length; i++) {
                        if (d[i].getKey() == k) {
                            return d[i]; } } }
                return null; };
            var s = function(e, k, v, w) {
                if (v === null) {
                    var d = g(e, k);
                    if (!d) {
                        return; }
                    var b = e.getAggregation("customData").length;
                    if (b == 1) { e.destroyAggregation("customData", true); } else { e.removeAggregation("customData", d, true);
                        d.destroy(); } } else {
                    var d = g(e, k);
                    if (d) { d.setValue(v);
                        d.setWriteToDom(w); } else {
                        var d = new sap.ui.core.CustomData({ key: k, value: v, writeToDom: w });
                        e.addAggregation("customData", d, true); } } };
            a.prototype.data = function() {
                var b = arguments.length;
                if (b == 0) {
                    var d = this.getAggregation("customData"),
                        r = {};
                    if (d) {
                        for (var i = 0; i < d.length; i++) { r[d[i].getKey()] = d[i].getValue(); } }
                    return r; } else if (b == 1) {
                    var c = arguments[0];
                    if (c === null) { this.destroyAggregation("customData", true);
                        return this; } else if (typeof c == "string") {
                        var e = g(this, c);
                        return e ? e.getValue() : null; } else if (typeof c == "object") {
                        for (var k in c) { s(this, k, c[k]); }
                        return this; } else {
                        throw new Error("When data() is called with one argument, this argument must be a string, an object or null, but is " + (typeof c) + ":" + c + " (on UI Element with ID '" + this.getId() + "')"); } } else if (b == 2) { s(this, arguments[0], arguments[1]);
                    return this; } else if (b == 3) { s(this, arguments[0], arguments[1], arguments[2]);
                    return this; } else {
                    throw new Error("data() may only be called with 0-3 arguments (on UI Element with ID '" + this.getId() + "')"); } }; })();
        a.prototype.clone = function(I, l) {
            var c = M.prototype.clone.apply(this, arguments);
            for (var i = 0; i < this.aDelegates.length; i++) {
                if (this.aDelegates[i].bClone) { c.aDelegates.push(this.aDelegates[i]); } }
            for (var i = 0; i < this.aBeforeDelegates.length; i++) {
                if (this.aBeforeDelegates[i].bClone) { c.aBeforeDelegates.push(this.aBeforeDelegates[i]); } }
            return c; };
        a.prototype.findElements = function(r) {
            var c = M.prototype.findAggregatedObjects.call(this, r);
            return c; };
        a.prototype.setLayoutData = function(l) { this.setAggregation("layoutData", l, true);
            var L = this.getParent();
            if (L) {
                var e = q.Event("LayoutDataChange");
                e.srcControl = this;
                L._handleEvent(e); }
            return this; };
        a.prototype.bindElement = function(p, P) {
            return this.bindObject(p, P); };
        a.prototype.unbindElement = function(m) {
            return this.unbindObject(m); };
        a.prototype.getElementBinding = function(m) {
            return this.getObjectBinding(m); };
        a.prototype._getFieldGroupIds = function() {
            var f;
            if (this.getMetadata().hasProperty("fieldGroupIds")) { f = this.getFieldGroupIds(); }
            if (!f || f.length == 0) {
                var p = this.getParent();
                if (p && p._getFieldGroupIds) {
                    return p._getFieldGroupIds(); } }
            return f || []; };
        return a; });
    sap.ui.predefine('sap/ui/core/ElementMetadata', ['jquery.sap.global', 'sap/ui/base/ManagedObjectMetadata'], function(q, M) { "use strict";
        var E = function(c, C) { M.apply(this, arguments); };
        E.prototype = q.sap.newObject(M.prototype);
        E.uid = M.uid;
        E.prototype.getElementName = function() {
            return this._sClassName; };
        E.prototype.getRendererName = function() {
            return this._sRendererName; };
        E.prototype.getRenderer = function() {
            var r = this.getRendererName();
            if (!r) {
                return; }
            var R = q.sap.getObject(r);
            if (R) {
                return R; }
            q.sap.require(r);
            return q.sap.getObject(r); };
        E.prototype.applySettings = function(c) {
            var s = c.metadata;
            this._sVisibility = s["visibility"] || "public";
            var r = c.hasOwnProperty("renderer") ? (c.renderer || "") : undefined;
            delete c.renderer;
            M.prototype.applySettings.call(this, c);
            this._sRendererName = this.getName() + "Renderer";
            if (typeof r !== "undefined") {
                if (typeof r === "string") { this._sRendererName = r || undefined;
                    return; }
                if (typeof r === "function") { r = { render: r }; }
                var p = this.getParent();
                var b;
                if (p && p instanceof E) { b = p.getRenderer(); }
                if (!b) { q.sap.require("sap.ui.core.Renderer");
                    b = sap.ui.require('sap/ui/core/Renderer'); }
                var R = q.sap.newObject(b);
                q.extend(R, r);
                q.sap.setObject(this.getRendererName(), R); }
            if (typeof s["designTime"] === "boolean") { this._bHasDesignTime = s["designTime"]; } else if (s["designTime"]) { this._bHasDesignTime = true;
                this._oDesignTime = s["designTime"]; } };
        E.prototype.afterApplySettings = function() { M.prototype.afterApplySettings.apply(this, arguments);
            this.register && this.register(this); };
        E.prototype.isHidden = function() {
            return this._sVisibility === "hidden"; };
        E.prototype.getDesignTime = function() {
            if (!this._oDesignTime && this._bHasDesignTime) { q.sap.require({ modName: this.getElementName(), type: "designtime" });
                this._oDesignTime = q.sap.getObject(this.getElementName() + ".designtime"); }
            return this._oDesignTime; };
        E.prototype.loadDesignTime = function() {
            var t = this;
            return new Promise(function(r, R) {
                if (!t._oDesignTime && t._bHasDesignTime) {
                    var m = q.sap.getResourceName(t.getElementName(), ".designtime");
                    sap.ui.require([m], function(d) { t._oDesignTime = d;
                        r(d); }); } else { r(t._oDesignTime); } }); };
        return E; }, true);
    sap.ui.predefine('sap/ui/core/FocusHandler', ['jquery.sap.global', '../Device', '../base/Object', 'jquery.sap.script'], function(q, D, B) { "use strict";
        var F = B.extend("sap.ui.core.FocusHandler", { constructor: function(r, c) { B.apply(this);
                this.oCore = c;
                this.oCurrent = null;
                this.oLast = null;
                this.aEventQueue = [];
                this.oLastFocusedControlInfo = null;
                this.fEventHandler = q.proxy(this.onEvent, this);
                if (r.addEventListener && !D.browser.internet_explorer) { r.addEventListener("focus", this.fEventHandler, true);
                    r.addEventListener("blur", this.fEventHandler, true); } else { q(r).bind("activate", this.fEventHandler);
                    q(r).bind("deactivate", this.fEventHandler); }
                q.sap.log.debug("FocusHandler setup on Root " + r.type + (r.id ? ": " + r.id : ""), null, "sap.ui.core.FocusHandler"); } });
        F.prototype.getCurrentFocusedControlId = function() {
            var c = null;
            try {
                var a = q(document.activeElement);
                if (a.is(":focus")) { c = a.control(); } } catch (e) {}
            return c && c.length > 0 ? c[0].getId() : null; };
        F.prototype.getControlFocusInfo = function(c) { c = c || this.getCurrentFocusedControlId();
            if (!c) {
                return null; }
            var C = this.oCore && this.oCore.byId(c);
            if (C) {
                return { id: c, control: C, info: C.getFocusInfo(), type: C.getMetadata().getName(), focusref: C.getFocusDomRef() }; }
            return null; };
        F.prototype.updateControlFocusInfo = function(c) {
            if (c && this.oLastFocusedControlInfo && this.oLastFocusedControlInfo.control === c) {
                var C = c.getId();
                this.oLastFocusedControlInfo = this.getControlFocusInfo(C);
                q.sap.log.debug("Update focus info of control " + C, null, "sap.ui.core.FocusHandler"); } };
        F.prototype.restoreFocus = function(c) {
            var i = c || this.oLastFocusedControlInfo;
            if (!i) {
                return; }
            var C = this.oCore && this.oCore.byId(i.id);
            if (C && i.info && C.getMetadata().getName() == i.type && C.getFocusDomRef() != i.focusref && (c || C !== i.control)) { q.sap.log.debug("Apply focus info of control " + i.id, null, "sap.ui.core.FocusHandler");
                i.control = C;
                this.oLastFocusedControlInfo = i;
                C.applyFocusInfo(i.info); } else { q.sap.log.debug("Apply focus info of control " + i.id + " not possible", null, "sap.ui.core.FocusHandler"); } };
        F.prototype.destroy = function(e) {
            var r = e.data.oRootRef;
            if (r) {
                if (r.removeEventListener && !D.browser.internet_explorer) { r.removeEventListener("focus", this.fEventHandler, true);
                    r.removeEventListener("blur", this.fEventHandler, true); } else { q(r).unbind("activate", this.fEventHandler);
                    q(r).unbind("deactivate", this.fEventHandler); } }
            this.oCore = null; };
        F.prototype.onEvent = function(b) {
            var e = q.event.fix(b);
            q.sap.log.debug("Event " + e.type + " reached Focus Handler (target: " + e.target + (e.target ? e.target.id : "") + ")", null, "sap.ui.core.FocusHandler");
            var a = (e.type == "focus" || e.type == "focusin" || e.type == "activate") ? "focus" : "blur";
            this.aEventQueue.push({ type: a, controlId: g(e.target) });
            if (this.aEventQueue.length == 1) { this.processEvent(); } };
        F.prototype.processEvent = function() {
            var e = this.aEventQueue[0];
            if (!e) {
                return; }
            try {
                if (e.type == "focus") { this.onfocusEvent(e.controlId); } else if (e.type == "blur") { this.onblurEvent(e.controlId); } } finally { this.aEventQueue.shift();
                if (this.aEventQueue.length > 0) { this.processEvent(); } } };
        F.prototype.onfocusEvent = function(c) {
            var C = this.oCore && this.oCore.byId(c);
            if (C) { this.oLastFocusedControlInfo = this.getControlFocusInfo(c);
                q.sap.log.debug("Store focus info of control " + c, null, "sap.ui.core.FocusHandler"); }
            this.oCurrent = c;
            if (!this.oLast) {
                return; }
            if (this.oLast != this.oCurrent) { t(this.oLast, c, this.oCore); }
            this.oLast = null; };
        F.prototype.onblurEvent = function(c) {
            if (!this.oCurrent) {
                return; }
            this.oLast = c;
            this.oCurrent = null;
            q.sap.delayedCall(0, this, "checkForLostFocus"); };
        F.prototype.checkForLostFocus = function() {
            if (this.oCurrent == null && this.oLast != null) { t(this.oLast, null, this.oCore); }
            this.oLast = null; };
        var g = function(d) {
            var i = q(d).closest("[data-sap-ui]").attr("id");
            if (i) {
                return i; }
            return null; };
        var t = function(c, r, C) {
            var o = c ? C && C.byId(c) : null;
            if (o) {
                var R = r ? C.byId(r) : null;
                var e = q.Event("sapfocusleave");
                e.target = o.getDomRef();
                e.relatedControlId = R ? R.getId() : null;
                e.relatedControlFocusInfo = R ? R.getFocusInfo() : null;
                var a = o.getUIArea();
                var u = null;
                if (a) { u = C.getUIArea(a.getId()); } else {
                    var p = C.getStaticAreaRef();
                    if (q.sap.containsOrEquals(p, e.target)) { u = C.getUIArea(p.id); } }
                if (u) { u._handleEvent(e); } } };
        return F; });
    sap.ui.predefine('sap/ui/core/LabelEnablement', ['jquery.sap.global', '../base/ManagedObject'], function(q, M) { "use strict";
        var C = {};

        function t(i, I) {
            if (!i) {
                return null; }
            var o = sap.ui.getCore().byId(i);
            if (o && I && (!(o instanceof sap.ui.core.Control) || o.getDomRef())) { o.invalidate(); }
            return o; }

        function r(l, d) {
            var s = l.getId();
            var o = l.__sLabeledControl;
            var n = d ? null : l.getLabelForRendering();
            if (o == n) {
                return; }
            if (!d) { l.invalidate(); }
            if (n) { l.__sLabeledControl = n; } else { delete l.__sLabeledControl; }
            var a;
            if (o) { a = C[o];
                if (a) { a = q.grep(a, function(b) {
                        return b != s; });
                    if (a.length) { C[o] = a; } else { delete C[o]; } } }
            if (n) { a = C[n] || [];
                a.push(s);
                C[n] = a; }
            t(o, true);
            t(n, true); }

        function c(o) {
            if (!o) {
                throw new Error("sap.ui.core.LabelEnablement cannot enrich null"); }
            var m = o.getMetadata();
            if (!m.isInstanceOf("sap.ui.core.Label")) {
                throw new Error("sap.ui.core.LabelEnablement only supports Controls with interface sap.ui.core.Label"); }
            var l = m.getAssociation("labelFor");
            if (!l || l.multiple) {
                throw new Error("sap.ui.core.LabelEnablement only supports Controls with a to-1 association 'labelFor'"); } }
        var L = {};
        L.writeLabelForAttribute = function(R, l) {
            if (!l || !l.getLabelForRendering) {
                return; }
            var s = l.getLabelForRendering();
            if (!s) {
                return; }
            var o = t(s);
            if (o && o.getIdForLabel) { s = o.getIdForLabel(); }
            if (s) { R.writeAttributeEscaped("for", s); } };
        L.getReferencingLabels = function(e) {
            var i = e ? e.getId() : null;
            if (!i) {
                return []; }
            return C[i] || []; };
        L.isRequired = function(e) {
            function a(E) {
                return !!(E && E.getMetadata().getProperty("required") && E.getRequired()); }
            if (a(e)) {
                return true; }
            var l = L.getReferencingLabels(e),
                o;
            for (var i = 0; i < l.length; i++) { o = sap.ui.getCore().byId(l[i]);
                if (a(o)) {
                    return true; } }
            return false; };
        L.enrich = function(o) { c(o);
            o.__orig_setLabelFor = o.setLabelFor;
            o.setLabelFor = function(i) {
                var a = this.__orig_setLabelFor.apply(this, arguments);
                r(this);
                return a; };
            o.__orig_exit = o.exit;
            o.exit = function() { this._sAlternativeId = null;
                r(this, true);
                if (o.__orig_exit) { o.__orig_exit.apply(this, arguments); } };
            o.setAlternativeLabelFor = function(i) {
                if (i instanceof M) { i = i.getId(); } else if (i != null && typeof i !== "string") {
                    return this; }
                this._sAlternativeId = i;
                r(this);
                return this; };
            o.getLabelForRendering = function() {
                return this.getLabelFor() || this._sAlternativeId; };
            if (!o.getMetadata().getProperty("required")) {
                return; }
            o.__orig_setRequired = o.setRequired;
            o.setRequired = function(i) {
                var a = this.__orig_setRequired.apply(this, arguments);
                t(this.__sLabeledControl, true);
                return a; }; };
        return L; }, true);
    sap.ui.predefine('sap/ui/core/Locale', ['jquery.sap.global', 'sap/ui/base/Object'], function(q, B) { "use strict";
        var a = /^((?:[A-Z]{2,3}(?:-[A-Z]{3}){0,3})|[A-Z]{4}|[A-Z]{5,8})(?:-([A-Z]{4}))?(?:-([A-Z]{2}|[0-9]{3}))?((?:-[0-9A-Z]{5,8}|-[0-9][0-9A-Z]{3})*)((?:-[0-9A-WYZ](?:-[0-9A-Z]{2,8})+)*)(?:-(X(?:-[0-9A-Z]{1,8})+))?$/i;
        var L = B.extend("sap.ui.core.Locale", { constructor: function(l) { B.apply(this);
                var r = a.exec(l.replace(/_/g, "-"));
                if (r === null) {
                    throw "The given language does not adhere to BCP-47."; }
                this.sLocaleId = l;
                this.sLanguage = r[1] || null;
                this.sScript = r[2] || null;
                this.sRegion = r[3] || null;
                this.sVariant = (r[4] && r[4].slice(1)) || null;
                this.sExtension = (r[5] && r[5].slice(1)) || null;
                this.sPrivateUse = r[6] || null;
                if (this.sLanguage) { this.sLanguage = this.sLanguage.toLowerCase(); }
                if (this.sScript) { this.sScript = this.sScript.toLowerCase().replace(/^[a-z]/, function($) {
                        return $.toUpperCase(); }); }
                if (this.sRegion) { this.sRegion = this.sRegion.toUpperCase(); } }, getLanguage: function() {
                return this.sLanguage; }, getScript: function() {
                return this.sScript; }, getRegion: function() {
                return this.sRegion; }, getVariant: function() {
                return this.sVariant; }, getVariantSubtags: function() {
                return this.sVariant ? this.sVariant.split('-') : []; }, getExtension: function() {
                return this.sExtension; }, getExtensionSubtags: function() {
                return this.sExtension ? this.sExtension.slice(2).split('-') : []; }, getPrivateUse: function() {
                return this.sPrivateUse; }, getPrivateUseSubtags: function() {
                return this.sPrivateUse ? this.sPrivateUse.slice(2).split('-') : []; }, hasPrivateUseSubtag: function(s) {
                return q.inArray(s, this.getPrivateUseSubtags()) >= 0; }, toString: function() {
                var r = [this.sLanguage];
                if (this.sScript) { r.push(this.sScript); }
                if (this.sRegion) { r.push(this.sRegion); }
                if (this.sVariant) { r.push(this.sVariant); }
                if (this.sExtension) { r.push(this.sExtension); }
                if (this.sPrivateUse) { r.push(this.sPrivateUse); }
                return r.join("-"); }, getSAPLogonLanguage: function() {
                var l = this.sLanguage || "",
                    m;
                if (l.indexOf("-") >= 0) { l = l.slice(0, l.indexOf("-")); }
                l = M[l] || l;
                if (l === "zh") {
                    if (this.sScript === "Hant" || (!this.sScript && this.sRegion === "TW")) { l = "zf"; } }
                if (this.sPrivateUse && (m = /-(saptrc|sappsd)(?:-|$)/i.exec(this.sPrivateUse))) { l = (m[1].toLowerCase() === "saptrc") ? "1Q" : "2Q"; }
                return l.toUpperCase(); } });
        var M = { "iw": "he", "ji": "yi", "in": "id", "sh": "sr" };

        function g(v) {
            var m = /\$([-a-z0-9A-Z._]+)(?::([^$]*))?\$/.exec(v);
            return (m && m[2]) ? m[2].split(/,/) : null; }
        var A = g("$cldr-rtl-locales:ar,fa,he$") || [];
        L._cldrLocales = g("$cldr-locales:ar,ar_EG,ar_SA,bg,br,ca,cs,da,de,de_AT,de_CH,el,el_CY,en,en_AU,en_GB,en_HK,en_IE,en_IN,en_NZ,en_PG,en_SG,en_ZA,es,es_AR,es_BO,es_CL,es_CO,es_MX,es_PE,es_UY,es_VE,et,fa,fi,fr,fr_BE,fr_CA,fr_CH,fr_LU,he,hi,hr,hu,id,it,it_CH,ja,ko,lt,lv,nb,nl,nl_BE,nn,pl,pt,pt_PT,ro,ru,ru_UA,sk,sl,sr,sv,th,tr,uk,vi,zh_CN,zh_HK,zh_SG,zh_TW$");
        L._coreI18nLocales = g("$core-i18n-locales:,ar,bg,ca,cs,da,de,el,en,es,et,fi,fr,hi,hr,hu,it,iw,ja,ko,lt,lv,nl,no,pl,pt,ro,ru,sh,sk,sl,sv,th,tr,uk,vi,zh_CN,zh_TW$");
        L._impliesRTL = function(l) {
            var o = new L(l);
            l = o.getLanguage() || "";
            l = (l && M[l]) || l;
            var r = o.getRegion() || "";
            if (r && q.inArray(l + "_" + r, A) >= 0) {
                return true; }
            return q.inArray(l, A) >= 0; };
        return L; });
    sap.ui.predefine('sap/ui/core/Manifest', ['jquery.sap.global', 'sap/ui/base/Object', 'sap/ui/thirdparty/URI', 'jquery.sap.resources'], function(q, B, U) { "use strict";
        var r = /\{\{([^\}\}]+)\}\}/g;

        function g(v) {
            var V = q.sap.Version(v);
            return V.getSuffix() ? q.sap.Version(V.getMajor() + "." + V.getMinor() + "." + V.getPatch()) : V; }

        function p(o, c) {
            for (var k in o) {
                if (!o.hasOwnProperty(k)) {
                    continue; }
                var v = o[k];
                switch (typeof v) {
                    case "object":
                        if (v) { p(v, c); }
                        break;
                    case "string":
                        c(o, k, v);
                        break;
                    default:
                } } }

        function a(o, P) {
            if (o && P && typeof P === "string" && P[0] === "/") {
                var b = P.substring(1).split("/"),
                    s;
                for (var i = 0, l = b.length; i < l; i++) { s = b[i];
                    o = o.hasOwnProperty(s) ? o[s] : undefined;
                    if (o === null || typeof o !== "object") {
                        if (i + 1 < l && o !== undefined) { o = undefined; }
                        break; } }
                return o; }
            return o && o[P]; }

        function d(o) {
            if (o && typeof o === 'object' && !Object.isFrozen(o)) { Object.freeze(o);
                for (var k in o) {
                    if (o.hasOwnProperty(k)) { d(o[k]); } } } }
        var M = B.extend("sap.ui.core.Manifest", { constructor: function(m, o) { B.apply(this, arguments);
                this._oRawManifest = m;
                this._bProcess = !(o && o.process === false);
                this._sComponentName = o && o.componentName;
                var c = this.getComponentName(),
                    b = o && o.baseUrl || c && q.sap.getModulePath(c, "/");
                if (b) { this._oBaseUri = new U(b).absoluteTo(new U().search("")); }
                d(this._oRawManifest);
                this._oManifest = this._bProcess ? null : this._oRawManifest; }, _processEntries: function(m) {
                var t = this;
                var c = (m["sap.app"] && m["sap.app"]["i18n"]) || "i18n/i18n.properties";
                var R;
                p(m, function(o, k, v) { o[k] = v.replace(r, function(s, b) {
                        if (!R) { R = q.sap.resources({ url: t.resolveUri(new U(c)).toString() }); }
                        return R.getText(b); }); });
                return m; }, getJson: function() {
                if (!this._oManifest) { this._oManifest = this._processEntries(q.extend(true, {}, this._oRawManifest)); }
                return this._oManifest; }, getRawJson: function() {
                return this._oRawManifest; }, getEntry: function(P) {
                if (!P || P.indexOf(".") <= 0) { q.sap.log.warning("Manifest entries with keys without namespace prefix can not be read via getEntry. Key: " + P + ", Component: " + this.getComponentName());
                    return null; }
                var m = this.getJson();
                var e = a(m, P);
                if (P && P[0] !== "/" && !q.isPlainObject(e)) { q.sap.log.warning("Manifest entry with key '" + P + "' must be an object. Component: " + this.getComponentName());
                    return null; }
                return e; }, checkUI5Version: function() {
                var m = this.getEntry("/sap.ui5/dependencies/minUI5Version");
                if (m && q.sap.log.isLoggable(q.sap.log.LogLevel.WARNING) && sap.ui.getCore().getConfiguration().getDebug()) { sap.ui.getVersionInfo({ async: true }).then(function(v) {
                        var o = g(m);
                        var V = g(v && v.version);
                        if (o.compareTo(V) > 0) { q.sap.log.warning("Component \"" + this.getComponentName() + "\" requires at least version \"" + o.toString() + "\" but running on \"" + V.toString() + "\"!"); } }.bind(this), function(e) { q.sap.log.warning("The validation of the version for Component \"" + this.getComponentName() + "\" failed! Reasion: " + e); }.bind(this)); } }, loadIncludes: function() {
                var R = this.getEntry("/sap.ui5/resources");
                if (!R) {
                    return; }
                var c = this.getComponentName();
                var J = R["js"];
                if (J) {
                    for (var i = 0; i < J.length; i++) {
                        var o = J[i];
                        var f = o.uri;
                        if (f) {
                            var m = f.match(/\.js$/i);
                            if (m) {
                                var s = c.replace(/\./g, '/') + (f.slice(0, 1) === '/' ? '' : '/') + f.slice(0, m.index);
                                q.sap.log.info("Component \"" + c + "\" is loading JS: \"" + s + "\"");
                                q.sap._requirePath(s); } } } }
                var C = R["css"];
                if (C) {
                    for (var j = 0; j < C.length; j++) {
                        var b = C[j];
                        if (b.uri) {
                            var e = this.resolveUri(new U(b.uri)).toString();
                            q.sap.log.info("Component \"" + c + "\" is loading CSS: \"" + e + "\"");
                            q.sap.includeStyleSheet(e, b.id); } } } }, loadDependencies: function() {
                var D = this.getEntry("/sap.ui5/dependencies"),
                    c = this.getComponentName();
                if (D) {
                    var l = D["libs"];
                    if (l) {
                        for (var L in l) {
                            if (!l[L].lazy) { q.sap.log.info("Component \"" + c + "\" is loading library: \"" + L + "\"");
                                sap.ui.getCore().loadLibrary(L); } } }
                    var C = D["components"];
                    if (C) {
                        for (var n in C) {
                            if (!C[n].lazy) { q.sap.log.info("Component \"" + c + "\" is loading component: \"" + n + ".Component\"");
                                sap.ui.component.load({ name: n }); } } } } }, defineResourceRoots: function() {
                var R = this.getEntry("/sap.ui5/resourceRoots");
                if (R) {
                    for (var s in R) {
                        var b = R[s];
                        var o = new U(b);
                        if (o.is("absolute") || (o.path() && o.path()[0] === "/")) { q.sap.log.error("Resource root for \"" + s + "\" is absolute and therefore won't be registered! \"" + b + "\"", this.getComponentName());
                            continue; }
                        b = this.resolveUri(o).toString();
                        q.sap.registerModulePath(s, b); } } }, getComponentName: function() {
                var R = this.getRawJson();
                return this._sComponentName || a(R, "/sap.ui5/componentName") || a(R, "/sap.app/id"); }, resolveUri: function(u) {
                return M._resolveUriRelativeTo(u, this._oBaseUri); }, init: function() { this.checkUI5Version();
                this.defineResourceRoots();
                this.loadDependencies();
                this.loadIncludes(); }, exit: function() {} });
        M._resolveUriRelativeTo = function(u, b) {
            if (u.is("absolute") || (u.path() && u.path()[0] === "/")) {
                return u; }
            var P = new U().search("");
            b = b.absoluteTo(P);
            return u.absoluteTo(b).relativeTo(P); };
        M.load = function(o) {
            var m = o && o.manifestUrl,
                c = o && o.componentName,
                A = o && o.async,
                f = o && o.failOnError;
            q.sap.log.info("Loading manifest via URL: " + m);
            var b = q.sap.loadResource({ url: m, dataType: "json", async: typeof A !== "undefined" ? A : false, headers: { "Accept-Language": sap.ui.getCore().getConfiguration().getLanguageTag() }, failOnError: typeof f !== "undefined" ? f : true });
            if (A) {
                return b.then(function(b) {
                    return new M(b, { componentName: c, process: false }); }); }
            return new M(b, { componentName: c, process: false }); };
        return M; });
    sap.ui.predefine('sap/ui/core/RenderManager', ['jquery.sap.global', '../base/Interface', '../base/Object', 'sap/ui/core/LabelEnablement', 'jquery.sap.act', 'jquery.sap.encoder', 'jquery.sap.dom', 'jquery.sap.trace'], function(q, I, B, L) { "use strict";
        var c = ["renderControl", "write", "writeEscaped", "translate", "writeAcceleratorKey", "writeControlData", "writeInvisiblePlaceholderData", "writeElementData", "writeAttribute", "writeAttributeEscaped", "addClass", "writeClasses", "addStyle", "writeStyles", "writeAccessibilityState", "writeIcon", "getConfiguration", "getHTML", "cleanupControlWithoutRendering"];
        var N = ["render", "flush", "destroy"];
        var R = B.extend("sap.ui.core.RenderManager", { constructor: function() { B.apply(this, arguments);
                this.aBuffer = [];
                this.aRenderedControls = [];
                this.aStyleStack = [{}]; }, metadata: { publicMethods: c.concat(N) } });
        R.prototype.getRendererInterface = function() {
            var i = new I(this, c);
            this.getRendererInterface = q.sap.getter(i);
            return i; };
        R.prototype.destroy = function() { this.aBuffer = [];
            this.aRenderedControls = [];
            this.aStyleStack = [{}]; };
        R.prototype.getConfiguration = function() {
            return sap.ui.getCore().getConfiguration(); };
        R.prototype.getRenderer = function(C) {
            return R.getRenderer(C); };
        R.prototype._setFocusHandler = function(f) { this.oFocusHandler = f; };
        var t = function(r, C) { r._bLocked = true;
            try {
                var e = q.Event("BeforeRendering");
                e.srcControl = C;
                C._handleEvent(e); } finally { r._bLocked = false; } };
        R.prototype.cleanupControlWithoutRendering = function(C) {
            if (!C || !C.getDomRef()) {
                return; }
            t(this, C);
            C.bOutput = false; };
        R.prototype.renderControl = function(C) {
            if (!C) {
                return; }
            if (!this.aRenderStack) { this.aRenderStack = []; }
            if (this.aRenderStack && this.aRenderStack.length > 0) { q.sap.measure.pause(this.aRenderStack[0] + "---renderControl"); } else if (C.getParent() && C.getParent().getMetadata().getName() == "sap.ui.core.UIArea") { q.sap.measure.pause(C.getParent().getId() + "---rerender"); }
            this.aRenderStack.unshift(C.getId());
            q.sap.measure.start(C.getId() + "---renderControl", "Rendering of " + C.getMetadata().getName(), ["rendering", "control"]);
            var b = this.aBuffer.length;
            var o = {};
            if (C.aCustomStyleClasses && C.aCustomStyleClasses.length > 0) { o.aCustomStyleClasses = C.aCustomStyleClasses; }
            this.aStyleStack.push(o);
            q.sap.measure.pause(C.getId() + "---renderControl");
            var r;
            var m = C.getMetadata();
            var v = C.getVisible();
            if (v) { r = m.getRenderer(); } else {
                var V = m.getProperty("visible");
                var u = V && V._oParent && V._oParent.getName() == "sap.ui.core.Control";
                r = u ? a : m.getRenderer(); }
            q.sap.measure.resume(C.getId() + "---renderControl");
            t(this, C);
            var d = C.aBindParameters;
            if (d && d.length > 0) {
                var D = q(C.getDomRef());
                if (D && D[0]) {
                    for (var i = 0; i < d.length; i++) {
                        var p = d[i];
                        D.unbind(p.sEventType, p.fnProxy); } } }
            if (r && typeof r.render === "function") { r.render(this.getRendererInterface(), C); } else { q.sap.log.error("The renderer for class " + m.getName() + " is not defined or does not define a render function! Rendering of " + C.getId() + " will be skipped!"); }
            this.aStyleStack.pop();
            this.aRenderedControls.push(C);
            if (C.getUIArea && C.getUIArea()) { C.getUIArea()._onControlRendered(C); }
            C.bOutput = this.aBuffer.length != b;
            if (r === a) { C.bOutput = "invisible"; }
            q.sap.measure.end(C.getId() + "---renderControl");
            this.aRenderStack.shift();
            if (this.aRenderStack && this.aRenderStack.length > 0) { q.sap.measure.resume(this.aRenderStack[0] + "---renderControl"); } else if (C.getParent() && C.getParent().getMetadata().getName() == "sap.ui.core.UIArea") { q.sap.measure.resume(C.getParent().getId() + "---rerender"); } };
        R.prototype.getHTML = function(C) {
            var b = this.aBuffer;
            var r = this.aBuffer = [];
            this.renderControl(C);
            this.aBuffer = b;
            return r.join(""); };
        (function() {
            var f = function(r, b, s) {
                var i, d = b.length;
                for (i = 0; i < d; i++) { b[i]._sapui_bInAfterRenderingPhase = true; }
                r._bLocked = true;
                try {
                    for (i = 0; i < d; i++) {
                        var C = b[i];
                        if (C.bOutput && C.bOutput !== "invisible") {
                            var E = q.Event("AfterRendering");
                            E.srcControl = C;
                            q.sap.measure.start(C.getId() + "---AfterRendering", "AfterRendering of " + C.getMetadata().getName(), ["rendering", "after"]);
                            C._handleEvent(E);
                            q.sap.measure.end(C.getId() + "---AfterRendering"); } } } finally {
                    for (i = 0; i < d; i++) { delete b[i]._sapui_bInAfterRenderingPhase; }
                    r._bLocked = false; }
                try { r.oFocusHandler.restoreFocus(s); } catch (e) { q.sap.log.warning("Problems while restoring the focus after rendering: " + e, null, r); }
                for (i = 0; i < d; i++) {
                    var C = b[i],
                        g = C.aBindParameters;
                    if (g && g.length > 0) {
                        var D = q(C.getDomRef());
                        if (D && D[0]) {
                            for (var j = 0; j < g.length; j++) {
                                var p = g[j];
                                D.bind(p.sEventType, p.fnProxy); } } } } };
            R.prototype.flush = function(T, d, v) {
                if (this.bRendererMode) { q.sap.log.info("Flush must not be called from control renderers. Call ignored.", null, this);
                    return; }
                if (!d && (typeof v !== "number") && !v) { R.preserveContent(T); }
                var s = this.oFocusHandler ? this.oFocusHandler.getControlFocusInfo() : null;
                var h = this.aBuffer.join("");
                if (this._fPutIntoDom) { this._fPutIntoDom(T, h); } else {
                    for (var i = 0; i < this.aRenderedControls.length; i++) {
                        var o = this.aRenderedControls[i].getDomRef();
                        if (o && !R.isPreservedContent(o)) {
                            if (R.isInlineTemplate(o)) { q(o).empty(); } else { q(o).remove(); } } }
                    if (typeof v === "number") {
                        if (v <= 0) { q(T).prepend(h); } else {
                            var $ = q(T).children().eq(v - 1);
                            if ($.length === 1) { $.after(h); } else { q(T).append(h); } } } else if (!v) { q(T).html(h); } else { q(T).append(h); } }
                f(this, this.aRenderedControls, s);
                this.aRenderedControls = [];
                this.aBuffer = [];
                this.aStyleStack = [{}];
                q.sap.act.refresh();
                q.sap.interaction.notifyStepEnd(); };
            R.prototype.render = function(C, T) {
                if (this.bRendererMode) { q.sap.log.info("Render must not be called from control renderers. Call ignored.", null, this);
                    return; }
                if (this._bLocked) { q.sap.log.error("Render must not be called within Before or After Rendering Phase. Call ignored.", null, this);
                    return; }
                this.aRenderedControls = [];
                this.aBuffer = [];
                this.aStyleStack = [{}];
                this.renderControl(C);
                this._fPutIntoDom = function(o, h) {
                    if (C && T) {
                        var b = C.getDomRef();
                        if (!b || R.isPreservedContent(b)) { b = q.sap.domById(sap.ui.core.RenderPrefixes.Invisible + C.getId()) || q.sap.domById(sap.ui.core.RenderPrefixes.Dummy + C.getId()); }
                        var n = b && b.parentNode != T;
                        var A = function() {
                            var j = q(T);
                            if (T.innerHTML == "") { j.html(h); } else { j.append(h); } };
                        if (n) {
                            if (!R.isPreservedContent(b)) {
                                if (R.isInlineTemplate(b)) { q(b).empty(); } else { q(b).remove(); } }
                            if (h) { A(); } } else {
                            if (h) {
                                if (b) {
                                    if (R.isInlineTemplate(b)) { q(b).html(h); } else if (this._isDomPathingEnabled()) { q.sap.replaceDOM(b, h, true); } else { q(b).replaceWith(h); } } else { A(); } } else {
                                if (R.isInlineTemplate(b)) { q(b).empty(); } else {
                                    if (!C.getParent() || !C.getParent()._onChildRerenderedEmpty || !C.getParent()._onChildRerenderedEmpty(C, b)) { q(b).remove(); } } } } } };
                this.flush(T, true);
                this._fPutIntoDom = null; }; }());
        R.getRenderer = function(C) {
            return C.getMetadata().getRenderer(); };
        R.forceRepaint = function(d) {
            var D = typeof d == "string" ? q.sap.domById(d) : d;
            if (D) { q.sap.log.debug("forcing a repaint for " + (D.id || String(D)));
                var o = D.style.display;
                var A = document.activeElement;
                D.style.display = "none";
                D.offsetHeight;
                D.style.display = o;
                if (document.activeElement !== A) { q.sap.focus(A); } } };
        R.createInvisiblePlaceholderId = function(e) {
            return sap.ui.core.RenderPrefixes.Invisible + e.getId(); };
        (function() {
            var b = "sap-ui-preserve",
                d = "sap-ui-static",
                A = "data-sap-ui-preserve",
                e = "data-sap-ui-area";

            function g() {
                var $ = q.sap.byId(b);
                if ($.length === 0) { $ = q("<DIV/>", { "aria-hidden": "true", id: b }).addClass("sapUiHidden").addClass("sapUiForcedHidden").css("width", "0").css("height", "0").css("overflow", "hidden").appendTo(document.body); }
                return $; }

            function m(n) { q("<DIV/>", { id: sap.ui.core.RenderPrefixes.Dummy + n.id }).addClass("sapUiHidden").insertBefore(n); }
            R.preserveContent = function(r, p, P) { sap.ui.getCore().getEventBus().publish("sap.ui", "__preserveContent", { domNode: r });
                var $ = g();

                function h(i) {
                    if (i.id === b || i.id === d) {
                        return; }
                    if (i.hasAttribute(A)) {
                        if (i === r) { m(i); }
                        $.append(i); } else if (P && i.id) { R.markPreservableContent(q(i), i.id);
                        $.append(i);
                        return; }
                    if (!i.hasAttribute(e)) {
                        var n = i.firstChild;
                        while (n) { i = n;
                            n = n.nextSibling;
                            if (i.nodeType === 1) { h(i); } } } }
                q.sap.measure.start(r.id + "---preserveContent", "preserveContent for " + r.id, ["rendering", "preserve"]);
                if (p) { h(r); } else { q(r).children().each(function(i, n) { h(n); }); }
                q.sap.measure.end(r.id + "---preserveContent"); };
            R.findPreservedContent = function(i) {
                var $ = g(),
                    h = $.children("[" + A + "='" + i.replace(/(:|\.)/g, '\\$1') + "']");
                return h; };
            R.markPreservableContent = function($, i) { $.attr(A, i); };
            R.isPreservedContent = function(D) {
                return (D && D.getAttribute(A) && D.parentNode && D.parentNode.id == b); };
            R.getPreserveAreaRef = function() {
                return g()[0]; };
            var f = "data-sap-ui-template";
            R.markInlineTemplate = function($) { $.attr(f, ""); };
            R.isInlineTemplate = function(D) {
                return (D && D.hasAttribute(f)); }; }());
        R.prototype.write = function(T) { this.aBuffer.push.apply(this.aBuffer, arguments);
            return this; };
        R.prototype.writeEscaped = function(T, l) { T = q.sap.encodeHTML(T);
            if (l) { T = T.replace(/&#xa;/g, "<br>"); }
            this.aBuffer.push(T);
            return this; };
        R.prototype.translate = function(k) {};
        R.prototype.writeAcceleratorKey = function() {
            return this; };
        R.prototype.addStyle = function(n, v) {
            if (v !== undefined && v !== null) {
                var s = this.aStyleStack[this.aStyleStack.length - 1];
                if (!s.aStyle) { s.aStyle = []; }
                s.aStyle.push(n + ":" + v); }
            return this; };
        R.prototype.writeStyles = function() {
            var s = this.aStyleStack[this.aStyleStack.length - 1];
            if (s.aStyle) { this.write(" style=\"" + s.aStyle.join(";") + "\" "); }
            s.aStyle = null;
            return this; };
        R.prototype.addClass = function(n) {
            if (n) {
                var s = this.aStyleStack[this.aStyleStack.length - 1];
                if (!s.aClasses) { s.aClasses = []; }
                s.aClasses.push(n); }
            return this; };
        R.prototype.writeClasses = function(e) {
            var s = this.aStyleStack[this.aStyleStack.length - 1];
            var C;
            if (e) { C = e.aCustomStyleClasses; } else if (e === false) { C = []; } else { C = s.aCustomStyleClasses; }
            if (s.aClasses || C) {
                var b = [].concat(s.aClasses || [], C || []);
                b.sort();
                b = q.map(b, function(n, i) {
                    return (i == 0 || n != b[i - 1]) ? n : null; });
                this.write(" class=\"", b.join(" "), "\" "); }
            if (!e) { s.aCustomStyleClasses = null; }
            s.aClasses = null;
            return this; };
        R.prototype.writeControlData = function(C) { this.writeElementData(C);
            return this; };
        R.prototype.writeInvisiblePlaceholderData = function(e) {
            var p = R.createInvisiblePlaceholderId(e),
                P = ' ' + 'id="' + p + '" ' + 'class="sapUiHiddenPlaceholder" ' + 'data-sap-ui="' + p + '" ' + 'style="display: none;"' + 'aria-hidden="true" ';
            this.write(P);
            return this; };
        R.prototype.writeElementData = function(e) {
            var s = e.getId();
            if (s) { this.writeAttribute("id", s).writeAttribute("data-sap-ui", s); }
            var d = e.getCustomData();
            var l = d.length;
            for (var i = 0; i < l; i++) {
                var C = d[i]._checkWriteToDom(e);
                if (C) { this.writeAttributeEscaped(C.key, C.value); } }
            return this; };
        R.prototype.writeAttribute = function(n, v) { this.write(" ", n, "=\"", v, "\"");
            return this; };
        R.prototype.writeAttributeEscaped = function(n, v) { this.writeAttribute(n, q.sap.encodeHTML(String(v)));
            return this; };
        R.prototype.writeAccessibilityState = function(e, P) {
            if (!sap.ui.getCore().getConfiguration().getAccessibility()) {
                return this; }
            if (arguments.length == 1 && !(e instanceof sap.ui.core.Element)) { P = e;
                e = null; }
            var A = {};
            if (e != null) {
                var m = e.getMetadata();
                var b = function(E, s, v) {
                    var o = m.getProperty(E);
                    if (o && e[o._sGetter]() === v) { A[s] = "true"; } };
                var d = function(E, s) {
                    var o = m.getAssociation(E);
                    if (o && o.multiple) {
                        var k = e[o._sGetter]();
                        if (E == "ariaLabelledBy") {
                            var l = sap.ui.core.LabelEnablement.getReferencingLabels(e);
                            var n = l.length;
                            if (n) {
                                var F = [];
                                for (var i = 0; i < n; i++) {
                                    if (q.inArray(l[i], k) < 0) { F.push(l[i]); } }
                                k = F.concat(k); } }
                        if (k.length > 0) { A[s] = k.join(" "); } } };
                b("editable", "readonly", false);
                b("enabled", "disabled", false);
                b("visible", "hidden", false);
                if (sap.ui.core.LabelEnablement.isRequired(e)) { A["required"] = "true"; }
                b("selected", "selected", true);
                b("checked", "checked", true);
                d("ariaDescribedBy", "describedby");
                d("ariaLabelledBy", "labelledby"); }
            if (P) {
                var f = function(v) {
                    var i = typeof(v);
                    return v === null || v === "" || i === "number" || i === "string" || i === "boolean"; };
                var g = {};
                var x, h, j;
                for (x in P) { h = P[x];
                    if (f(h)) { g[x] = h; } else if (typeof(h) === "object" && f(h.value)) { j = "";
                        if (h.append && (x === "describedby" || x === "labelledby")) { j = A[x] ? A[x] + " " : ""; }
                        g[x] = j + h.value; } }
                q.extend(A, g); }
            if (e instanceof sap.ui.core.Element && e.getParent() && e.getParent().enhanceAccessibilityState) { e.getParent().enhanceAccessibilityState(e, A); }
            for (var p in A) {
                if (A[p] != null && A[p] !== "") { this.writeAttributeEscaped(p === "role" ? p : "aria-" + p, A[p]); } }
            return this; };
        R.prototype.writeIcon = function(u, C, A) { q.sap.require("sap.ui.core.IconPool");
            var i = sap.ui.core.IconPool.isIconURI(u),
                s = i ? "<span " : "<img ",
                b, p, o, d;
            if (typeof C === "string") { C = [C]; }
            if (i) { o = sap.ui.core.IconPool.getIconInfo(u);
                if (!o) { q.sap.log.error("An unregistered icon: " + u + " is used in sap.ui.core.RenderManager's writeIcon method.");
                    return this; }
                if (!C) { C = []; }
                C.push("sapUiIcon");
                if (!o.suppressMirroring) { C.push("sapUiIconMirrorInRTL"); } }
            this.write(s);
            if (q.isArray(C) && C.length) { b = C.join(" ");
                this.write("class=\"" + b + "\" "); }
            if (i) { d = { "data-sap-ui-icon-content": o.content, "role": "presentation", "aria-label": o.text || o.name, "title": o.text || o.name };
                this.write("style=\"font-family: " + o.fontFamily + ";\" "); } else { d = { role: "presentation", alt: "", src: u }; }
            A = q.extend(d, A);
            if (typeof A === "object") {
                for (p in A) {
                    if (A.hasOwnProperty(p) && A[p] !== null) { this.writeAttributeEscaped(p, A[p]); } } }
            this.write(i ? "></span>" : "/>");
            return this; };
        R.prototype._isDomPathingEnabled = function() {
            if (this._bDomPathing === undefined) { this._bDomPathing = this.getConfiguration().getDomPatching();
                if (this._bDomPathing) { q.sap.log.warning("DOM Patching is enabled: This feature should be used only for the testing purposes!"); } }
            return this._bDomPathing; };
        var a = { render: function(r, C) { r.write("<span");
                r.writeInvisiblePlaceholderData(C);
                r.write("></span>"); } };
        return R; });
    sap.ui.predefine('sap/ui/core/ResizeHandler', ['jquery.sap.global', 'sap/ui/base/Object', 'jquery.sap.act', 'jquery.sap.script'], function(q, B) { "use strict";
        var l = q.sap.log.getLogger("sap.ui.core.ResizeHandler", q.sap.log.Level.ERROR);
        var c = null;
        var R = B.extend("sap.ui.core.ResizeHandler", { constructor: function(C) { B.apply(this);
                c = C;
                this.aResizeListeners = [];
                this.bRegistered = false;
                this.iIdCounter = 0;
                this.fDestroyHandler = q.proxy(this.destroy, this);
                q(window).bind("unload", this.fDestroyHandler);
                q.sap.act.attachActivate(i, this); } });

        function a() {
            if (this.bRegistered) { this.bRegistered = false;
                sap.ui.getCore().detachIntervalTimer(this.checkSizes, this); } }

        function i() {
            if (!this.bRegistered && this.aResizeListeners.length > 0) { this.bRegistered = true;
                sap.ui.getCore().attachIntervalTimer(this.checkSizes, this); } }
        R.prototype.destroy = function(e) { q.sap.act.detachActivate(i, this);
            q(window).unbind("unload", this.fDestroyHandler);
            c = null;
            this.aResizeListeners = [];
            a.apply(this); };
        R.prototype.attachListener = function(r, h) {
            var I = r instanceof sap.ui.core.Control,
                d = I ? r.getDomRef() : r,
                w = d ? d.offsetWidth : 0,
                H = d ? d.offsetHeight : 0,
                s = "rs-" + new Date().valueOf() + "-" + this.iIdCounter++,
                b;
            if (I) { b = ("Control " + r.getId()); } else if (r.id) { b = r.id; } else { b = String(r); }
            this.aResizeListeners.push({ sId: s, oDomRef: I ? null : r, oControl: I ? r : null, fHandler: h, iWidth: w, iHeight: H, dbg: b });
            l.debug("registered " + b);
            i.apply(this);
            return s; };
        R.prototype.detachListener = function(I) {
            var t = this;
            q.each(this.aResizeListeners, function(b, r) {
                if (r.sId == I) { t.aResizeListeners.splice(b, 1);
                    l.debug("deregistered " + I);
                    return false; } });
            if (this.aResizeListeners.length == 0) { a.apply(this); } };
        R.prototype.checkSizes = function() {
            var d = l.isLoggable();
            if (d) { l.debug("checkSizes:"); }
            q.each(this.aResizeListeners, function(b, r) {
                if (r) {
                    var C = !!r.oControl,
                        D = C ? r.oControl.getDomRef() : r.oDomRef;
                    if (D && q.contains(document.documentElement, D)) {
                        var o = r.iWidth,
                            O = r.iHeight,
                            n = D.offsetWidth,
                            N = D.offsetHeight;
                        if (o != n || O != N) { r.iWidth = n;
                            r.iHeight = N;
                            var e = q.Event("resize");
                            e.target = D;
                            e.currentTarget = D;
                            e.size = { width: n, height: N };
                            e.oldSize = { width: o, height: O };
                            e.control = C ? r.oControl : null;
                            if (d) { l.debug("resize detected for '" + r.dbg + "': " + e.oldSize.width + "x" + e.oldSize.height + " -> " + e.size.width + "x" + e.size.height); }
                            r.fHandler(e); } } } });
            if (R._keepActive != true && R._keepActive != false) { R._keepActive = false; }
            if (!q.sap.act.isActive() && !R._keepActive) { a.apply(this); } };
        R.register = function(r, h) {
            if (!c || !c.oResizeHandler) {
                return null; }
            return c.oResizeHandler.attachListener(r, h); };
        R.deregister = function(I) {
            if (!c || !c.oResizeHandler) {
                return; }
            c.oResizeHandler.detachListener(I); };
        R.deregisterAllForControl = function(C) {
            if (!c || !c.oResizeHandler) {
                return; }
            var I = [];
            q.each(c.oResizeHandler.aResizeListeners, function(b, r) {
                if (r && r.oControl && r.oControl.getId() === C) { I.push(r.sId); } });
            q.each(I, function(b, s) { R.deregister(s); }); };
        return R; });
    sap.ui.predefine('sap/ui/core/ThemeCheck', ['jquery.sap.global', 'sap/ui/Device', 'sap/ui/base/Object', 'sap/ui/thirdparty/URI', 'jquery.sap.script'], function(q, D, B, U) { "use strict";
        sap.ui._maxThemeCheckCycles = 100;
        var T = B.extend("sap.ui.core.ThemeCheck", { constructor: function(C) { this._oCore = C;
                this._iCount = 0;
                this._CUSTOMCSSCHECK = /\.sapUiThemeDesignerCustomCss/i;
                this._CUSTOMID = "sap-ui-core-customcss";
                this._customCSSAdded = false;
                this._themeCheckedForCustom = null;
                this._mAdditionalLibCss = {}; }, getInterface: function() {
                return this; }, fireThemeChangedEvent: function(o, f) { c(this);
                var u = sap.ui._maxThemeCheckCycles > 0;
                if (u || f) { d.apply(this, [true]); } else { T.themeLoaded = true; }
                if (!o && !this._sThemeCheckId) { this._oCore.fireThemeChanged({ theme: this._oCore.getConfiguration().getTheme() }); } } });
        T.themeLoaded = false;
        T.checkStyle = function(s, l) {
            if (typeof(s) === "string") { s = q.sap.domById(s); }
            var S = q(s);
            try {
                var r = !s || !!((s.sheet && s.sheet.href === s.href && s.sheet.cssRules && s.sheet.cssRules.length > 0) || !!(s.styleSheet && s.styleSheet.href === s.href && s.styleSheet.cssText && s.styleSheet.cssText.length > 0) || !!(s.innerHTML && s.innerHTML.length > 0));
                var f = S.attr("data-sap-ui-ready");
                f = !!(f === "true" || f === "false");
                if (l) { q.sap.log.debug("ThemeCheck: Check styles '" + S.attr("id") + "': " + r + "/" + f + "/" + !!s); }
                return r || f; } catch (e) {}
            if (l) { q.sap.log.debug("ThemeCheck: Error during check styles '" + S.attr("id") + "': false/false/" + !!s); }
            return false; };

        function c(t) { T.themeLoaded = false;
            if (t._sThemeCheckId) { q.sap.clearDelayedCall(t._sThemeCheckId);
                t._sThemeCheckId = null;
                t._iCount = 0;
                t._mAdditionalLibCss = {}; } }

        function a(t) {
            var l = t._oCore.getLoadedLibraries();
            var s = t._oCore.getConfiguration().getTheme();
            var p = t._oCore._getThemePath("sap.ui.core", s) + "custom.css";
            var r = true;
            if (!!t._customCSSAdded && t._themeCheckedForCustom === s) { l[t._CUSTOMID] = {}; }

            function e(f) { r = r && T.checkStyle("sap-ui-theme-" + f, true);
                if (!!r) {
                    if (D.browser.msie && D.browser.version <= 9) {
                        var S = q.sap.domById("sap-ui-theme-" + f);
                        var R = S && S.sheet && S.sheet.rules && S.sheet.rules.length ? S.sheet.rules.length : 0;
                        if (R === 4095) {
                            var n = parseInt(q(S).attr("data-sap-ui-css-count"), 10);
                            if (isNaN(n)) { n = 1; } else { n += 1; }
                            var A = "ie9_" + n;
                            var g = this.name + "-" + A;
                            var L = "sap-ui-theme-" + g;
                            if (!t._mAdditionalLibCss[g] && !q.sap.domById(L)) { t._mAdditionalLibCss[g] = { name: this.name };
                                var o;
                                if (f !== this.name) { o = q.sap.domById("sap-ui-theme-" + this.name); } else { o = S; }
                                var h = new U(o.getAttribute("href"));
                                var i = h.suffix();
                                var F = h.filename();
                                if (i.length > 0) { i = "." + i;
                                    F = F.slice(0, -i.length); }
                                h.filename(F + "_" + A + i);
                                var H = h.toString();
                                var j = document.createElement("link");
                                j.type = "text/css";
                                j.rel = "stylesheet";
                                j.href = H;
                                j.id = L;
                                q(j).attr("data-sap-ui-css-count", n).load(function() { q(j).attr("data-sap-ui-ready", "true"); }).error(function() { q(j).attr("data-sap-ui-ready", "false"); });
                                S.parentNode.insertBefore(j, S.nextSibling); } } }
                    if (t._themeCheckedForCustom != s) {
                        if (b(t, f)) {
                            var C = p;
                            var k = t._oCore._getLibraryCssQueryParams(l["sap.ui.core"]);
                            if (k) { C += k; }
                            q.sap.includeStyleSheet(C, t._CUSTOMID);
                            t._customCSSAdded = true;
                            q.sap.log.warning("ThemeCheck delivered custom CSS needs to be loaded, Theme not yet applied");
                            t._themeCheckedForCustom = s;
                            r = false;
                            return false; } else {
                            var m = q("LINK[id='" + t._CUSTOMID + "']");
                            if (m.length > 0) { m.remove();
                                q.sap.log.debug("Custom CSS removed"); }
                            t._customCSSAdded = false; } } } }
            q.each(l, e);
            q.each(t._mAdditionalLibCss, e);
            if (!r) { q.sap.log.warning("ThemeCheck: Theme not yet applied."); } else { t._themeCheckedForCustom = s; }
            return r; }

        function b(t, l) {
            var r = 2,
                s = false,
                R = [];
            if (q.sap.domById("sap-ui-theme-" + l)) {
                var e = q.sap.domById("sap-ui-theme-" + l);
                if (e.sheet && e.sheet.cssRules) { R = e.sheet.cssRules; } else if (e.styleSheet && e.styleSheet.rules) { R = e.styleSheet.rules; } }
            if (R.length == 0) { q.sap.log.warning("Custom check: Failed retrieving a CSS rule from stylesheet " + l);
                return false; }
            for (var i = 0;
                (i < r && i < R.length); i++) {
                if (t._CUSTOMCSSCHECK.test(R[i].selectorText)) { s = true; } }
            return s; }

        function d(f) { this._iCount++;
            var e = this._iCount > sap.ui._maxThemeCheckCycles;
            if (!a(this) && !e) { this._sThemeCheckId = q.sap.delayedCall(2, this, d); } else if (!f) { c(this);
                T.themeLoaded = true;
                this._oCore.fireThemeChanged({ theme: this._oCore.getConfiguration().getTheme() });
                if (e) { q.sap.log.warning("ThemeCheck: max. check cycles reached."); } } else { T.themeLoaded = true; } }
        return T; });
    sap.ui.predefine('sap/ui/core/UIArea', ['jquery.sap.global', 'sap/ui/base/ManagedObject', './Element', './RenderManager', 'jquery.sap.act', 'jquery.sap.ui', 'jquery.sap.keycodes', 'jquery.sap.trace'], function(q, M, E, R) { "use strict";
        var r = q.sap.log.getLogger("sap.ui.Rendering", ((window["sap-ui-config"] && window["sap-ui-config"]["xx-debugRendering"]) || /sap-ui-xx-debug(R|-r)endering=(true|x|X)/.test(document.location.search)) ? q.sap.log.Level.DEBUG : Math.min(q.sap.log.Level.INFO, q.sap.log.getLevel())),
            d = function(c) {
                return c; },
            D = q.noop,
            f = q.noop;
        if (r.isLoggable()) { d = function(c) {
                var l;
                try {
                    throw new Error(); } catch (e) { l = e.stack || e.stacktrace || (e.sourceURL ? e.sourceURL + ":" + e.line : null);
                    l = l ? l.split(/\n\s*/g).slice(2) : undefined; }
                return { obj: c, location: l }; };
            D = function(t, c) {
                var C = sap.ui.getCore(),
                    m = {},
                    n, o;
                for (n in c) { o = C.byId(n);
                    m[n] = { type: o ? o.getMetadata().getName() : (c[n].obj === t ? "UIArea" : "(no such control)"), location: c[n].location, reason: c[n].reason }; }
                r.debug("  UIArea '" + t.getId() + "', pending updates: " + JSON.stringify(m, null, "\t")); };
            f = function(b, A) {
                var n;
                for (n in A) {
                    if (b[n] != null) {
                        if (b[n].obj !== A[n].obj) { A[n].reason = "replaced during rendering"; } else { A[n].reason = "invalidated again during rendering"; } } else { A[n].reason = "invalidated during rendering"; } } }; }
        var U = M.extend("sap.ui.core.UIArea", { constructor: function(c, o) {
                if (arguments.length === 0) {
                    return; }
                M.apply(this);
                this.oCore = c;
                this.bLocked = false;
                this.bInitial = true;
                this.aContentToRemove = [];
                this.bNeedsRerendering = false;
                if (o != null) { this.setRootNode(o);
                    this.bNeedsRerendering = this.bNeedsRerendering && !q.sap.domById(o.id + "-Init"); }
                this.mInvalidatedControls = {};
                if (!this.bNeedsRerendering) { this.bRenderSelf = false; } else { this.oCore.addInvalidatedUIArea(this); } }, metadata: { publicMethods: ["setRootNode", "getRootNode", "setRootControl", "getRootControl", "lock", "unlock", "isLocked"], aggregations: { content: { name: "content", type: "sap.ui.core.Control", multiple: true, singularName: "content" }, dependents: { name: "dependents", type: "sap.ui.core.Control", multiple: true } } } });
        U.prototype.isInvalidateSuppressed = function() {
            return this.iSuppressInvalidate > 0; };
        U.prototype.getId = function() {
            return this.oRootNode ? this.oRootNode.id : null; };
        U.prototype.getUIArea = function() {
            return this; };
        U.prototype.setRootNode = function(o) {
            if (this.oRootNode === o) {
                return; }
            if (this.oRootNode) { this._ondetach(); }
            this.oRootNode = o;
            if (this.getContent().length > 0) { this.invalidate(); }
            if (this.oRootNode) { this._onattach(); } };
        U.prototype.getRootNode = function() {
            return this.oRootNode; };
        U.prototype.setRootControl = function(o) { this.removeAllContent();
            this.addContent(o); };
        U.prototype.getRootControl = function(i) {
            var c = this.getContent();
            if (c.length > 0) {
                if (i >= 0 && i < c.length) {
                    return c[i]; }
                return c[0]; }
            return null; };
        U.prototype._addRemovedContent = function(o) {
            if (this.oRootNode && o) { this.aContentToRemove.push(o); } };
        U.prototype.addContent = function(c, _) { this.addAggregation("content", c, _);
            if (_ !== true) { this.invalidate(); }
            return this; };
        U.prototype.removeContent = function(c, _) {
            var C = this.removeAggregation("content", c, _);
            if (!_) {
                var o;
                if (C && C.getDomRef) { o = C.getDomRef(); }
                this._addRemovedContent(o); }
            return C; };
        U.prototype.removeAllContent = function() {
            var c = this.removeAllAggregation("content");
            for (var i = 0; i < c.length; i++) {
                var o;
                var C = c[i];
                if (C && C.getDomRef) { o = C.getDomRef(); }
                this._addRemovedContent(o); }
            return c; };
        U.prototype.destroyContent = function() {
            var c = this.getContent();
            for (var i = 0; i < c.length; i++) {
                var o;
                var C = c[i];
                if (C && C.getDomRef) { o = C.getDomRef(); }
                this._addRemovedContent(o); }
            this.destroyAggregation("content");
            return this; };
        U.prototype.lock = function() { this.bLocked = true; };
        U.prototype.unlock = function() {
            if (this.bLocked && this.bNeedsRerendering) { this.oCore.addInvalidatedUIArea(this); }
            this.bLocked = false; };
        U.prototype.isLocked = function() {
            return this.bLocked; };
        U.prototype.getBindingContext = function() {
            return null; };
        U.prototype.getEventingParent = function() {
            return this.oCore._getEventProvider(); };
        U.prototype.isActive = function() {
            return q.sap.domById(this.getId()) != null; };
        U.prototype.invalidate = function() { this.addInvalidatedControl(this); };
        U.prototype.addInvalidatedControl = function(c) {
            if (this.bRenderSelf) {
                return; }
            if (!this.bNeedsRerendering) { this.oCore.addInvalidatedUIArea(this); }
            var i = c.getId();
            if (c === this) { this.bRenderSelf = true;
                this.bNeedsRerendering = true;
                this.mInvalidatedControls = {};
                this.mInvalidatedControls[i] = d(this);
                return; }
            if (this.mInvalidatedControls[i]) {
                return; }
            if (!this.bRenderSelf) { this.mInvalidatedControls[i] = d(c);
                this.bNeedsRerendering = true; } };
        U.prototype.rerender = function(b) {
            var t = this;

            function c() { t.bRenderSelf = false;
                t.aContentToRemove = [];
                t.mInvalidatedControls = {};
                t.bNeedsRerendering = false; }
            if (b) { this.bNeedsRerendering = true; }
            if (this.bLocked || !this.bNeedsRerendering) {
                return false; }
            var g = this.bRenderSelf,
                C = this.aContentToRemove,
                I = this.mInvalidatedControls,
                u = false;
            c();
            q.sap.measure.pause("renderPendingUIUpdates");
            q.sap.measure.start(this.getId() + "---rerender", "Rerendering of " + this.getMetadata().getName());
            D(this, I);
            if (g) {
                if (this.oRootNode) { r.debug("Full Rendering of UIArea '" + this.getId() + "'");
                    R.preserveContent(this.oRootNode, false, this.bInitial);
                    this.bInitial = false;
                    var h = function(p, v) {
                        var l = p.length;
                        var w;
                        for (var i = 0; i < l; i++) { w = v ? p[i].getDomRef() : p[i];
                            if (w && !R.isPreservedContent(w) && t.oRootNode === w.parentNode) { q(w).remove(); } }
                        return l; };
                    var F = document.activeElement;
                    var s = this.oCore.oFocusHandler.getControlFocusInfo();
                    h(C);
                    var j = this.getContent();
                    var l = h(j, true);
                    var o = document.activeElement;
                    for (var i = 0; i < l; i++) {
                        if (j[i] && j[i].getParent() === this) { this.oCore.oRenderManager.render(j[i], this.oRootNode, true); } }
                    u = true;
                    if (F != o && o === document.activeElement) {
                        try { this.oCore.oFocusHandler.restoreFocus(s); } catch (e) { q.sap.log.warning("Problems while restoring the focus after full UIArea rendering: " + e, null, this); } } } else { r.debug("Full Rendering of UIArea '" + this.getId() + "' postponed, no root node"); } } else {
                var k = function(p) {
                    for (;;) {
                        if (p.getMetadata && p.getMetadata().isInstanceOf("sap.ui.core.PopupInterface")) {
                            break; }
                        p = p.getParent();
                        if (!p || p === t) {
                            return false; }
                        if (I.hasOwnProperty(p.getId())) {
                            return true; } } };
                for (var n in I) {
                    var m = this.oCore.byId(n);
                    if (m && !k(m)) { m.rerender();
                        u = true; } } }
            f(I, this.mInvalidatedControls);
            q.sap.measure.end(this.getId() + "---rerender");
            q.sap.measure.resume("renderPendingUIUpdates");
            return u; };
        U.prototype._onControlRendered = function(c) {
            var i = c.getId();
            if (this.mInvalidatedControls[i]) { delete this.mInvalidatedControls[i]; } };
        U.rerenderControl = function(c) {
            var o = null;
            if (c) { o = c.getDomRef();
                if (!o || R.isPreservedContent(o)) { o = q.sap.domById(sap.ui.core.RenderPrefixes.Invisible + c.getId()); } }
            var p = o && o.parentNode;
            if (p) {
                var u = c.getUIArea();
                var b = u ? u.oCore.oRenderManager : sap.ui.getCore().createRenderManager();
                r.debug("Rerender Control '" + c.getId() + "'" + (u ? "" : " (using a temp. RenderManager)"));
                R.preserveContent(o, true, false);
                b.render(c, p); } else {
                var u = c.getUIArea();
                u && u._onControlRendered(c);
                r.warning("Couldn't rerender '" + c.getId() + "', as its DOM location couldn't be determined"); } };
        var a = /^(mousedown|mouseup|click|keydown|keyup|keypress|touchstart|touchend|tap)$/;
        U.prototype._handleEvent = function(e) {
            var o = null,
                I;
            o = q(e.target).control(0);
            q.sap.act.refresh();
            if (o === null) {
                return; }
            if (e.isMarked("delayedMouseEvent")) {
                return; }
            if (e.isMarked("handledByUIArea")) { e.setMark("firstUIArea", false);
                return; }
            e.setMarked("firstUIArea");
            e.srcControl = o;
            if (e.type === "contextmenu" && e.shiftKey && e.altKey && !!(e.metaKey || e.ctrlKey)) { q.sap.log.info("Suppressed forwarding the contextmenu event as control event because CTRL+SHIFT+ALT is pressed!");
                return; }
            this.oCore._handleControlEvent(e, this.getId());
            if (this.bLocked || this.oCore.isLocked()) {
                return; }
            if (q.sap.interaction.getActive()) { I = e.type.match(a);
                if (I) { q.sap.interaction.notifyEventStart(e); } }
            var b = [];
            if (e.getPseudoTypes) { b = e.getPseudoTypes(); }
            b.push(e.type);
            var g = false;
            while (o && o instanceof E && o.isActive() && !e.isPropagationStopped()) {
                for (var i = 0, c = b.length; i < c; i++) {
                    var t = b[i];
                    e.type = t;
                    e.currentTarget = o.getDomRef();
                    o._handleEvent(e);
                    if (e.isImmediatePropagationStopped()) {
                        break; } }
                if (!g) { g = this._handleGroupChange(e, o); }
                if (e.isPropagationStopped()) {
                    break; }
                if (o.bStopEventBubbling) {
                    break; }
                var h = o.getDomRef();
                if (!h) {
                    break; }
                h = h.parentNode;
                o = null;
                if (e.isMarked("fromMouseout") && q.sap.containsOrEquals(h, e.relatedTarget)) {
                    break; }
                while (h && h !== this.getRootNode()) {
                    if (h.id) { o = q(h).control(0);
                        if (o) {
                            break; } }
                    h = h.parentNode; } }
            if (I) { q.sap.interaction.notifyEventEnd(e); }
            e.currentTarget = this.getRootNode();
            (e.originalEvent || e)._sapui_handledByUIArea = true;
            if (e.isPropagationStopped()) { q.sap.log.debug("'" + e.type + "' propagation has been stopped"); }
            var n = e.type;
            if (n != "mousemove" && n != "mouseover" && n != "scroll" && n != "mouseout") {
                var j = q(e.target).control(0);
                if (j) { q.sap.log.debug("Event fired: '" + e.type + "' on " + j, "", "sap.ui.core.UIArea"); } else { q.sap.log.debug("Event fired: '" + e.type + "'", "", "sap.ui.core.UIArea"); } } };
        U.prototype._onattach = function() {
            var o = this.getRootNode();
            if (o == null) {
                return; }
            q(o).attr("data-sap-ui-area", o.id).bind(q.sap.ControlEvents.join(" "), q.proxy(this._handleEvent, this)); };
        U.prototype._ondetach = function() {
            var o = this.getRootNode();
            if (o == null) {
                return; }
            q(o).removeAttr("data-sap-ui-area").unbind(); };
        U.prototype.clone = function() {
            throw new Error("UIArea can't be cloned"); };
        U.prototype._handleGroupChange = function(e, o) {
            var k = U._oFieldGroupValidationKey;
            if (e.type === "focusin") {
                if (U._iFieldGroupDelayTimer) { q.sap.clearDelayedCall(U._iFieldGroupDelayTimer);
                    U._iFieldGroupDelayTimer = null; }
                U._iFieldGroupDelayTimer = q.sap.delayedCall(0, this, this.setFieldGroupControl, [o]);
                return true; } else if (this.getFieldGroupControl() && e.type === "keyup" && e.keyCode === k.keyCode && e.shiftKey === k.shiftKey && e.altKey === k.altKey && e.ctrlKey === k.ctrlKey) {
                if (U._iFieldGroupTriggerDelay) { q.sap.clearDelayedCall(U._iFieldGroupTriggerDelay); }
                var c = this.getFieldGroupControl(),
                    C = (c ? c._getFieldGroupIds() : []);
                if (C.length > 0) { c.triggerValidateFieldGroup(C); }
                return true; }
            return false; };
        U.prototype.setFieldGroupControl = function(e) {
            function b(e, h) {
                var p = e.getParent();
                if (p) {
                    if (h(p)) {
                        return p; } else {
                        return b(p, h); } }
                return null; }
            var c = this.getFieldGroupControl();
            if (e != c) {
                var C = null;
                if (e instanceof sap.ui.core.Control) { C = e; } else { C = b(e, function(e) {
                        return e instanceof sap.ui.core.Control; }); }
                var g = (c ? c._getFieldGroupIds() : []),
                    n = (C ? C._getFieldGroupIds() : []),
                    t = [];
                for (var i = 0; i < g.length; i++) {
                    var s = g[i];
                    if (n.indexOf(s) === -1) { t.push(s); } }
                if (t.length > 0) { c.triggerValidateFieldGroup(t); }
                U._oFieldGroupControl = C; }
            return this; };
        U.prototype.getFieldGroupControl = function() {
            if (U._oFieldGroupControl && !U._oFieldGroupControl.bIsDestroyed) {
                return U._oFieldGroupControl; }
            return null; };
        U._oFieldGroupControl = null;
        U._iFieldGroupDelayTimer = null;
        U._oFieldGroupValidationKey = { keyCode: q.sap.KeyCodes.ENTER, shiftKey: false, altKey: false, ctrlKey: false };
        U._oRenderLog = r;
        return U; });
    sap.ui.predefine('sap/ui/core/message/ControlMessageProcessor', ['jquery.sap.global', 'sap/ui/core/message/MessageProcessor'], function(q, M) { "use strict";
        var C = M.extend("sap.ui.core.message.ControlMessageProcessor", { constructor: function() {
                if (!C._instance) { M.apply(this, arguments);
                    C._instance = this; }
                return C._instance; }, metadata: {} });
        C._instance = null;
        C.prototype.setMessages = function(m) { this.mOldMessages = this.mMessages === null ? {} : this.mMessages;
            this.mMessages = m || {};
            this.checkMessages();
            delete this.mOldMessages; };
        C.prototype.checkMessages = function() {
            var m, t = this,
                a = q.extend(this.mMessages, {});
            q.each(this.mOldMessages, function(T) {
                if (!(T in a)) { a[T] = []; } });
            q.each(a, function(T) {
                var b, p = T.split('/'),
                    c = sap.ui.getCore().byId(p[0]);
                if (!c) {
                    return; }
                b = c.getBinding(p[1]);
                m = t.mMessages[T] ? t.mMessages[T] : [];
                if (b) {
                    var d = b.getDataState();
                    d.setControlMessages(m);
                    b.checkDataState(); } else { c.propagateMessages(p[1], m); } }); };
        return C; });
    sap.ui.predefine('sap/ui/core/message/Message', ['jquery.sap.global', 'sap/ui/base/Object', './MessageProcessor'], function(q, O, l, M) { "use strict";
        var a = O.extend("sap.ui.core.message.Message", { constructor: function(p) { O.apply(this, arguments);
                this.id = p.id ? p.id : q.sap.uid();
                this.message = p.message;
                this.description = p.description;
                this.descriptionUrl = p.descriptionUrl;
                this.type = p.type;
                this.code = p.code;
                this.target = p.target;
                this.processor = p.processor;
                this.persistent = p.persistent || false;
                this.technical = p.technical || false;
                this.references = p.references || {};
                this.validation = !!p.validation; } });
        a.prototype.getId = function() {
            return this.id; };
        a.prototype.setMessage = function(m) { this.message = m; };
        a.prototype.getMessage = function() {
            return this.message; };
        a.prototype.setDescription = function(d) { this.description = d; };
        a.prototype.getDescription = function() {
            return this.description; };
        a.prototype.getDescriptionUrl = function() {
            return this.descriptionUrl; };
        a.prototype.setDescriptionUrl = function(d) { this.descriptionUrl = d; };
        a.prototype.setType = function(t) {
            if (t in sap.ui.core.MessageType) { this.type = t; } else { q.sap.log.error("MessageType must be of type sap.ui.core.MessageType"); } };
        a.prototype.getType = function() {
            return this.type; };
        a.prototype.setTarget = function(t) { this.target = t; };
        a.prototype.getTarget = function() {
            return this.target; };
        a.prototype.setMessageProcessor = function(m) {
            if (m instanceof M) { this.processor = m; } else { q.sap.log.error("MessageProcessor must be an instance of sap.ui.core.message.MessageProcessor"); } };
        a.prototype.getMessageProcessor = function() {
            return this.processor; };
        a.prototype.setCode = function(c) { this.code = c; };
        a.prototype.getCode = function() {
            return this.code; };
        a.prototype.setPersistent = function(p) { this.persistent = p; };
        a.prototype.getPersistent = function() {
            return this.persistent; };
        a.prototype.setTechnical = function(t) { this.technical = t; };
        a.prototype.getTechnical = function() {
            return this.technical; };
        a.prototype.addReference = function(i, p) {
            if (!i) {
                return; }
            if (!this.references[i]) { this.references[i] = { properties: {} }; }
            if (!this.references[i].properties[p]) { this.references[i].properties[p] = true; } };
        a.prototype.removeReference = function(i, p) {
            if (!i) {
                return; }
            if (i in this.references) {
                if (!p) { delete this.references[i]; } else {
                    if (this.references[i].properties[p]) { delete this.references[i].properties[p]; } } } };
        return a; });
    sap.ui.predefine('sap/ui/core/message/MessageManager', ['jquery.sap.global', 'sap/ui/base/EventProvider', 'sap/ui/base/ManagedObject', 'sap/ui/model/message/MessageModel', './Message', './ControlMessageProcessor'], function(q, E, M, c, d, C) { "use strict";
        var e = E.extend("sap.ui.core.message.MessageManager", { constructor: function() { E.apply(this, arguments);
                this.mProcessors = {};
                this.mObjects = {};
                this.mMessages = {};
                var h = sap.ui.getCore().getConfiguration().getHandleValidation();
                if (h) { sap.ui.getCore().attachValidationSuccess(h, this._handleSuccess, this);
                    sap.ui.getCore().attachValidationError(h, this._handleError, this);
                    sap.ui.getCore().attachParseError(h, this._handleError, this);
                    sap.ui.getCore().attachFormatError(h, this._handleError, this); } }, metadata: { publicMethods: ["addMessages", "removeMessages", "removeAllMessages", "registerMessageProcessor", "unregisterMessageProcessor", "registerObject", "unregisterObject", "getMessageModel", "destroy"] } });
        e.prototype._handleError = function(o, h) {
            if (!this.oControlMessageProcessor) { this.oControlMessageProcessor = new C(); }
            if (h) {
                var a = o.getParameter("element");
                var p = o.getParameter("property");
                var t = a.getId() + '/' + p;
                var P = this.oControlMessageProcessor.getId();
                var T = o.sId === "formatError";
                if (this.mMessages[P] && this.mMessages[P][t]) { this._removeMessages(this.mMessages[P][t], true); }
                var r = {};
                r[a.getId()] = { properties: {}, fieldGroupIds: a.getFieldGroupIds ? a.getFieldGroupIds() : undefined };
                r[a.getId()].properties[p] = true;
                var m = new d({ type: sap.ui.core.MessageType.Error, message: o.getParameter("message"), target: t, processor: this.oControlMessageProcessor, technical: T, references: r, validation: true });
                this.addMessages(m); }
            o.cancelBubble(); };
        e.prototype._handleSuccess = function(o, h) {
            if (!this.oControlMessageProcessor) { this.oControlMessageProcessor = new C(); }
            if (h) {
                var a = o.getParameter("element");
                var p = o.getParameter("property");
                var t = a.getId() + '/' + p;
                var P = this.oControlMessageProcessor.getId();
                if (this.mMessages[P] && this.mMessages[P][t]) { this._removeMessages(this.mMessages[P][t], true); } }
            o.cancelBubble(); };
        e.prototype.addMessages = function(m) {
            var o = m;
            if (!m) {
                return; } else if (q.isArray(m)) {
                for (var i = 0; i < m.length; i++) { o = m[i];
                    this._importMessage(o); } } else { this._importMessage(m); }
            this._updateMessageModel(); };
        e.prototype._importMessage = function(m) {
            var s = m.getTarget();
            var p = m.getMessageProcessor().getId();
            if (!this.mMessages[p]) { this.mMessages[p] = {}; }
            var a = this.mMessages[p][s] ? this.mMessages[p][s] : [];
            a.push(m);
            this.mMessages[p][s] = a; };
        e.prototype._pushMessages = function() {
            var t = this;
            q.each(this.mProcessors, function(i, p) {
                var m = t.mMessages[i] ? t.mMessages[i] : {};
                t._sortMessages(m);
                m = Object.keys(m).length === 0 ? null : q.extend(true, {}, m);
                p.setMessages(m); }); };
        e.prototype._sortMessages = function(m) {
            var s = { 'Error': 0, 'Warning': 1, 'Success': 2, 'Info': 3 };
            q.each(m, function(t, f) {
                if (!f.length === 0) { f.sort(function(a, b) {
                        return s[a.type] - s[b.type]; }); } }); };
        e.prototype._updateMessageModel = function() {
            var m = [];
            var o = this.getMessageModel();
            q.each(this.mMessages, function(p, a) { q.each(a, function(k, v) { m = q.merge(m, v); }); });
            this._pushMessages();
            o.setData(m); };
        e.prototype.removeAllMessages = function() { this.aMessages = [];
            this.mMessages = {};
            this._updateMessageModel(); };
        e.prototype.removeMessages = function(m) {
            return this._removeMessages.apply(this, arguments); };
        e.prototype._removeMessages = function(m, o) {
            var t = this;
            if (!m || (q.isArray(m) && m.length == 0)) {
                return; } else if (q.isArray(m)) {
                var O = m.slice(0);
                for (var i = 0; i < O.length; i++) {
                    if (!o || O[i].validation) { t._removeMessage(O[i]); } } } else if (m instanceof d && (!o || m.validation)) { t._removeMessage(m); } else { q.each(m, function(T, a) { t._removeMessages(a, o); }); }
            this._updateMessageModel(); };
        e.prototype._removeMessage = function(m) {
            var a = this.mMessages[m.getMessageProcessor().getId()];
            if (!a) {
                return; }
            var b = a[m.getTarget()];
            if (b) {
                for (var i = 0; i < b.length; i++) {
                    var o = b[i];
                    if (q.sap.equal(o, m) && !o.getPersistent()) { b.splice(i, 1);--i; } }
                if (a[m.getTarget()].length === 0) { delete a[m.getTarget()]; } } };
        e.prototype.onMessageChange = function(o) {
            var O = o.getParameter('oldMessages');
            var n = o.getParameter('newMessages');
            this.removeMessages(O);
            this.addMessages(n); };
        e.prototype.registerMessageProcessor = function(p) {
            var P = p.getId();
            if (!this.mProcessors[P]) { this.mProcessors[P] = p;
                p.attachMessageChange(this.onMessageChange, this);
                if (P in this.mMessages) { this._pushMessages(); } } };
        e.prototype.unregisterMessageProcessor = function(p) { this.removeMessages(this.mMessages[p.getId()]);
            delete this.mProcessors[p.getId()];
            p.detachMessageChange(this.onMessageChange, this); };
        e.prototype.registerObject = function(o, h) {
            if (!o instanceof M) { q.sap.log.error(this + " : " + o.toString() + " is not an instance of sap.ui.base.ManagedObject");
                return; }
            o.attachValidationSuccess(h, this._handleSuccess, this);
            o.attachValidationError(h, this._handleError, this);
            o.attachParseError(h, this._handleError, this);
            o.attachFormatError(h, this._handleError, this); };
        e.prototype.unregisterObject = function(o) {
            if (!o instanceof M) { q.sap.log.error(this + " : " + o.toString() + " is not an instance of sap.ui.base.ManagedObject");
                return; }
            o.detachValidationSuccess(this._handleSuccess);
            o.detachValidationError(this._handleError);
            o.detachParseError(this._handleError);
            o.detachFormatError(this._handleError); };
        e.prototype.destroy = function() { q.sap.log.warning("Deprecated: Do not call destroy on a MessageManager"); };
        e.prototype.getMessageModel = function() {
            if (!this.oMessageModel) { this.oMessageModel = new c(this);
                this.oMessageModel.setData([]); }
            return this.oMessageModel; };
        return e; });
    sap.ui.predefine('sap/ui/core/message/MessageProcessor', ['jquery.sap.global', 'sap/ui/base/EventProvider'], function(q, E) { "use strict";
        var M = E.extend("sap.ui.core.message.MessageProcessor", { constructor: function() { E.apply(this, arguments);
                this.mMessages = null;
                this.id = q.sap.uid();
                sap.ui.getCore().getMessageManager().registerMessageProcessor(this); }, metadata: { "abstract": true, publicMethods: ["getId", "setMessages", "attachMessageChange", "detachMessageChange"] } });
        M.M_EVENTS = { messageChange: "messageChange" };
        M.prototype.attachMessageChange = function(d, f, l) { this.attachEvent("messageChange", d, f, l);
            return this; };
        M.prototype.detachMessageChange = function(f, l) { this.detachEvent("messageChange", f, l);
            return this; };
        M.prototype.fireMessageChange = function(a) { this.fireEvent("messageChange", a);
            return this; };
        M.prototype.getId = function() {
            return this.id; };
        M.prototype.destroy = function() { sap.ui.getCore().getMessageManager().unregisterMessageProcessor(this);
            E.prototype.destroy.apply(this, arguments); };
        return M; });
    sap.ui.predefine('sap/ui/model/Binding', ['jquery.sap.global', 'sap/ui/base/EventProvider', './ChangeReason', './DataState'], function(q, E, C, D) { "use strict";
        var B = E.extend("sap.ui.model.Binding", { constructor: function(m, p, c, P) { E.apply(this);
                this.oModel = m;
                this.bRelative = !q.sap.startsWith(p, '/');
                this.sPath = p;
                this.oContext = c;
                this.vMessages = undefined;
                this.mParameters = P;
                this.bInitial = false;
                this.bSuspended = false;
                this.oDataState = null; }, metadata: { "abstract": true, publicMethods: ["getPath", "getContext", "getModel", "attachChange", "detachChange", "refresh", "isInitial", "attachDataStateChange", "detachDataStateChange", "attachAggregatedDataStateChange", "detachAggregatedDataStateChange", "attachDataRequested", "detachDataRequested", "attachDataReceived", "detachDataReceived", "suspend", "resume"] } });
        B.prototype.getPath = function() {
            return this.sPath; };
        B.prototype.getContext = function() {
            return this.oContext; };
        B.prototype.setContext = function(c) {
            if (this.oContext != c) { sap.ui.getCore().getMessageManager().removeMessages(this.getDataState().getControlMessages(), true);
                this.oContext = c;
                this.oDataState = null;
                this._fireChange(); } };
        B.prototype.getMessages = function() {
            return this.vMessages; };
        B.prototype.getDataState = function() {
            if (!this.oDataState) { this.oDataState = new D(); }
            return this.oDataState; };
        B.prototype.getModel = function() {
            return this.oModel; };
        B.prototype.attachChange = function(f, l) {
            if (!this.hasListeners("change")) { this.oModel.addBinding(this); }
            this.attachEvent("change", f, l); };
        B.prototype.detachChange = function(f, l) { this.detachEvent("change", f, l);
            if (!this.hasListeners("change")) { this.oModel.removeBinding(this); } };
        B.prototype._fireDataStateChange = function(a) { this.fireEvent("DataStateChange", a); };
        B.prototype.attachDataStateChange = function(f, l) { this.attachEvent("DataStateChange", f, l); };
        B.prototype.detachDataStateChange = function(f, l) { this.detachEvent("DataStateChange", f, l); };
        B.prototype.attachAggregatedDataStateChange = function(f, l) { this.attachEvent("AggregatedDataStateChange", f, l); };
        B.prototype.detachAggregatedDataStateChange = function(f, l) { this.detachEvent("AggregatedDataStateChange", f, l); };
        B.prototype._fireChange = function(a) { this.fireEvent("change", a); };
        B.prototype.attachDataRequested = function(f, l) { this.attachEvent("dataRequested", f, l); };
        B.prototype.detachDataRequested = function(f, l) { this.detachEvent("dataRequested", f, l); };
        B.prototype.fireDataRequested = function(a) { this.fireEvent("dataRequested", a); };
        B.prototype.attachDataReceived = function(f, l) { this.attachEvent("dataReceived", f, l); };
        B.prototype.detachDataReceived = function(f, l) { this.detachEvent("dataReceived", f, l); };
        B.prototype.fireDataReceived = function(a) { this.fireEvent("dataReceived", a); };
        B.prototype.updateRequired = function(m) {
            return m && this.getModel() === m; };
        B.prototype.hasValidation = function() {
            return !!this.getType(); };
        B.prototype.checkUpdate = function(f) {
            if (this.bSuspended && !f) {
                return; }
            this._fireChange({ reason: C.Change }); };
        B.prototype.refresh = function(f) {
            if (this.bSuspended && !f) {
                return; }
            this.checkUpdate(f); };
        B.prototype.initialize = function() { this.checkUpdate(true);
            return this; };
        B.prototype._refresh = function() { this.refresh(); };
        B.prototype.isResolved = function() {
            if (this.bRelative && !this.oContext) {
                return false; }
            return true; };
        B.prototype.isInitial = function() {
            return this.bInitial; };
        B.prototype.isRelative = function() {
            return this.bRelative; };
        B.prototype.attachEvents = function(e) {
            if (!e) {
                return this; }
            var t = this;
            q.each(e, function(s, h) {
                var m = "attach" + s.substring(0, 1).toUpperCase() + s.substring(1);
                if (t[m]) { t[m](h); } else { q.sap.log.warning(t.toString() + " has no handler for event '" + s + "'"); } });
            return this; };
        B.prototype.detachEvents = function(e) {
            if (!e) {
                return this; }
            var t = this;
            q.each(e, function(s, h) {
                var m = "detach" + s.substring(0, 1).toUpperCase() + s.substring(1);
                if (t[m]) { t[m](h); } else { q.sap.log.warning(t.toString() + " has no handler for event '" + s + "'"); } });
            return this; };
        B.prototype.attachRefresh = function(f, l) { this.attachEvent("refresh", f, l); };
        B.prototype.detachRefresh = function(f, l) { this.detachEvent("refresh", f, l); };
        B.prototype._fireRefresh = function(a) { this.fireEvent("refresh", a); };
        B.prototype.suspend = function() { this.bSuspended = true; };
        B.prototype.resume = function() { this.bSuspended = false;
            this.checkUpdate(); };
        sap.ui.model.Binding.prototype.destroy = function() { sap.ui.getCore().getMessageManager().removeMessages(this.getDataState().getControlMessages(), true);
            sap.ui.base.EventProvider.prototype.destroy.apply(this, arguments); };
        return B; });
    sap.ui.predefine('sap/ui/model/BindingMode', function() { "use strict";
        var B = { Default: "Default", OneTime: "OneTime", OneWay: "OneWay", TwoWay: "TwoWay" };
        return B; }, true);
    sap.ui.predefine('sap/ui/model/ChangeReason', function() { "use strict";
        var C = { Sort: "sort", Filter: "filter", Change: "change", Context: "context", Refresh: "refresh", Expand: "expand", Collapse: "collapse" };
        return C; }, true);
    sap.ui.predefine('sap/ui/model/ClientContextBinding', ['./ContextBinding'], function(C) { "use strict";
        var a = C.extend("sap.ui.model.ClientContextBinding", { constructor: function(m, p, c, P, e) { C.call(this, m, p, c, P, e);
                var t = this;
                m.createBindingContext(p, c, P, function(c) { t.bInitial = false;
                    t.oElementContext = c; }); } });
        a.prototype.refresh = function(f) {
            var t = this;
            this.oModel.createBindingContext(this.sPath, this.oContext, this.mParameters, function(c) {
                if (t.oElementContext === c && !f) { t.oModel.checkUpdate(true, c); } else { t.oElementContext = c;
                    t._fireChange(); } }, true); };
        a.prototype.initialize = function() {
            var t = this;
            this.oModel.createBindingContext(this.sPath, this.oContext, this.mParameters, function(c) { t.oElementContext = c;
                t._fireChange(); }, true); };
        a.prototype.setContext = function(c) {
            var t = this;
            if (this.oContext != c) { this.oContext = c;
                this.oModel.createBindingContext(this.sPath, this.oContext, this.mParameters, function(c) { t.oElementContext = c;
                    t._fireChange(); }); } };
        return a; });
    sap.ui.predefine('sap/ui/model/ClientListBinding', ['jquery.sap.global', './ChangeReason', './Filter', './FilterType', './ListBinding', './FilterProcessor', './Sorter', './SorterProcessor'], function(q, C, F, a, L, b, S, c) { "use strict";
        var d = L.extend("sap.ui.model.ClientListBinding", { constructor: function(m, p, o, s, f, P) { L.apply(this, arguments);
                this.bIgnoreSuspend = false;
                this.update(); }, metadata: { publicMethods: ["getLength"] } });
        d.prototype._getContexts = function(s, l) {
            if (!s) { s = 0; }
            if (!l) { l = Math.min(this.iLength, this.oModel.iSizeLimit); }
            var e = Math.min(s + l, this.aIndices.length),
                o, f = [],
                p = this.oModel.resolve(this.sPath, this.oContext);
            if (p && !q.sap.endsWith(p, "/")) { p += "/"; }
            for (var i = s; i < e; i++) { o = this.oModel.getContext(p + this.aIndices[i]);
                f.push(o); }
            return f; };
        d.prototype.setContext = function(o) {
            if (this.oContext != o) { this.oContext = o;
                if (this.isRelative()) { this.update();
                    this._fireChange({ reason: C.Context }); } } };
        d.prototype.getLength = function() {
            return this.iLength; };
        d.prototype._getLength = function() {
            return this.aIndices.length; };
        d.prototype.updateIndices = function() { this.aIndices = [];
            for (var i = 0; i < this.oList.length; i++) { this.aIndices.push(i); } };
        d.prototype.sort = function(s) {
            if (this.bSuspended) { this.checkUpdate(true); }
            if (!s) { this.aSorters = null;
                this.updateIndices();
                this.applyFilter(); } else {
                if (s instanceof S) { s = [s]; }
                this.aSorters = s;
                this.applySort(); }
            this.bIgnoreSuspend = true;
            this._fireChange({ reason: C.Sort });
            this._fireSort({ sorter: s });
            this.bIgnoreSuspend = false;
            return this; };
        d.prototype.applySort = function() {
            var t = this;
            if (!this.aSorters || this.aSorters.length == 0) {
                return; }
            this.aIndices = c.apply(this.aIndices, this.aSorters, function(r, p) {
                return t.oModel.getProperty(p, t.oList[r]); }); };
        d.prototype.filter = function(f, s) {
            if (this.bSuspended) { this.checkUpdate(true); }
            this.updateIndices();
            if (f instanceof F) { f = [f]; }
            if (s == a.Application) { this.aApplicationFilters = f || []; } else if (s == a.Control) { this.aFilters = f || []; } else { this.aFilters = f || [];
                this.aApplicationFilters = []; }
            f = this.aFilters.concat(this.aApplicationFilters);
            if (f.length == 0) { this.aFilters = [];
                this.aApplicationFilters = [];
                this.iLength = this._getLength(); } else { this.applyFilter(); }
            this.applySort();
            this.bIgnoreSuspend = true;
            this._fireChange({ reason: C.Filter });
            if (s == a.Application) { this._fireFilter({ filters: this.aApplicationFilters }); } else { this._fireFilter({ filters: this.aFilters }); }
            this.bIgnoreSuspend = false;
            return this; };
        d.prototype.applyFilter = function() {
            if (!this.aFilters) {
                return; }
            var f = this.aFilters.concat(this.aApplicationFilters),
                t = this;
            this.aIndices = b.apply(this.aIndices, f, function(r, p) {
                return t.oModel.getProperty(p, t.oList[r]); });
            this.iLength = this.aIndices.length; };
        d.prototype.getDistinctValues = function(p) {
            var r = [],
                m = {},
                v, t = this;
            q.each(this.oList, function(i, o) { v = t.oModel.getProperty(p, o);
                if (!m[v]) { m[v] = true;
                    r.push(v); } });
            return r; };
        return d; });
    sap.ui.predefine('sap/ui/model/ClientModel', ['jquery.sap.global', './ClientContextBinding', './ClientListBinding', './ClientPropertyBinding', './ClientTreeBinding', './Model'], function(q, C, a, b, c, M) { "use strict";
        var d = M.extend("sap.ui.model.ClientModel", { constructor: function(D) { M.apply(this, arguments);
                this.bCache = true;
                this.aPendingRequestHandles = [];
                if (typeof D == "string") { this.loadData(D); } }, metadata: { publicMethods: ["loadData", "setData", "getData", "setProperty", "forceNoCache"] } });
        d.prototype.getData = function() {
            return this.oData; };
        d.prototype.createBindingContext = function(p, o, P, f) {
            if (typeof o == "function") { f = o;
                o = null; }
            if (typeof P == "function") { f = P;
                P = null; }
            var s = this.resolve(p, o),
                n = (s == undefined) ? undefined : this.getContext(s ? s : "/");
            if (!n) { n = null; }
            if (f) { f(n); }
            return n; };
        d.prototype._ajax = function(p) {
            var t = this;
            if (this.bDestroyed) {
                return; }

            function w(f) {
                return function() {
                    var i = q.inArray(r, t.aPendingRequestHandles);
                    if (i > -1) { t.aPendingRequestHandles.splice(i, 1); }
                    if (!(r && r.bSuppressErrorHandlerCall)) { f.apply(this, arguments); } }; }
            p.success = w(p.success);
            p.error = w(p.error);
            var r = q.ajax(p);
            if (p.async) { this.aPendingRequestHandles.push(r); } };
        d.prototype.destroy = function() { M.prototype.destroy.apply(this, arguments);
            if (this.aPendingRequestHandles) {
                for (var i = this.aPendingRequestHandles.length - 1; i >= 0; i--) {
                    var r = this.aPendingRequestHandles[i];
                    if (r && r.abort) { r.bSuppressErrorHandlerCall = true;
                        r.abort(); } }
                delete this.aPendingRequestHandles; } };
        d.prototype.destroyBindingContext = function(o) {};
        d.prototype.bindContext = function(p, o, P) {
            var B = new C(this, p, o, P);
            return B; };
        d.prototype.updateBindings = function(f) { this.checkUpdate(f); };
        d.prototype.forceNoCache = function(f) { this.bCache = !f; };
        return d; });
    sap.ui.predefine('sap/ui/model/ClientPropertyBinding', ['./PropertyBinding'], function(P) { "use strict";
        var C = P.extend("sap.ui.model.ClientPropertyBinding", { constructor: function(m, p, c, a) { P.apply(this, arguments);
                this.oValue = this._getValue(); } });
        C.prototype.getValue = function() {
            return this.oValue; };
        C.prototype._getValue = function() {
            var p = this.sPath.substr(this.sPath.lastIndexOf("/") + 1);
            if (p == "__name__") {
                var a = this.oContext.split("/");
                return a[a.length - 1]; }
            return this.oModel.getProperty(this.sPath, this.oContext); };
        C.prototype.setContext = function(c) {
            if (this.oContext != c) { sap.ui.getCore().getMessageManager().removeMessages(this.getDataState().getControlMessages(), true);
                this.oContext = c;
                if (this.isRelative()) { this.checkUpdate(); } } };
        return C; });
    sap.ui.predefine('sap/ui/model/ClientTreeBinding', ['jquery.sap.global', './ChangeReason', './Context', './TreeBinding', 'sap/ui/model/SorterProcessor', 'sap/ui/model/FilterProcessor', 'sap/ui/model/FilterType'], function(q, C, a, T, S, F, b) { "use strict";
        var c = T.extend("sap.ui.model.ClientTreeBinding", { constructor: function(m, p, o, A, P, s) { T.apply(this, arguments);
                if (!this.oContext) { this.oContext = ""; }
                this._mLengthsCache = {};
                this.filterInfo = {};
                this.filterInfo.aFilteredContexts = [];
                this.filterInfo.oParentContext = {};
                if (A) {
                    if (this.oModel._getObject(this.sPath, this.oContext)) { this.filter(A, b.Application); } } } });
        c.prototype.getRootContexts = function(s, l) {
            if (!s) { s = 0; }
            if (!l) { l = this.oModel.iSizeLimit; }
            var d = [];
            var t = this;
            if (!this.oModel.isList(this.sPath)) {
                var o = this.oModel.getContext(this.sPath);
                if (this.bDisplayRootNode) { d = [o]; } else { d = this.getNodeContexts(o, s, l); } } else {
                var e = this._sanitizePath(this.sPath);
                q.each(this.oModel._getObject(e), function(i, O) { t._saveSubContext(O, d, e, i); });
                this._applySorter(d);
                this._setLengthCache(e, d.length);
                return d.slice(s, s + l); }
            return d; };
        c.prototype.getNodeContexts = function(o, s, l) {
            if (!s) { s = 0; }
            if (!l) { l = this.oModel.iSizeLimit; }
            var d = this._sanitizePath(o.getPath());
            var e = [],
                t = this,
                n = this.oModel._getObject(d),
                A = this.mParameters && this.mParameters.arrayNames,
                f;
            if (n) {
                if (A && q.isArray(A)) { q.each(A, function(i, g) { f = n[g];
                        if (f) { q.each(f, function(h, j) { t._saveSubContext(j, e, d, g + "/" + h); }); } }); } else { q.sap.each(n, function(N, g) {
                        if (q.isArray(g)) { q.each(g, function(h, i) { t._saveSubContext(i, e, d, N + "/" + h); }); } else if (typeof g == "object") { t._saveSubContext(g, e, d, N); } }); } }
            this._applySorter(e);
            this._setLengthCache(d, e.length);
            return e.slice(s, s + l); };
        c.prototype.hasChildren = function(o) {
            if (o == undefined) {
                return false; }
            return this.getChildCount(o) > 0; };
        c.prototype.getChildCount = function(o) {
            var p = o ? o.sPath : this.getPath();
            p = this._sanitizePath(p);
            if (this._mLengthsCache[p] === undefined) {
                if (o) { this.getNodeContexts(o); } else { this.getRootContexts(); } }
            return this._mLengthsCache[p]; };
        c.prototype._sanitizePath = function(s) {
            if (!q.sap.endsWith(s, "/")) { s = s + "/"; }
            if (!q.sap.startsWith(s, "/")) { s = "/" + s; }
            return s; };
        c.prototype._saveSubContext = function(n, d, s, N) {
            if (n && typeof n == "object") {
                var o = this.oModel.getContext(s + N);
                if (this.aAllFilters && !this.bIsFiltering) {
                    if (q.inArray(o, this.filterInfo.aFilteredContexts) != -1) { d.push(o); } } else { d.push(o); } } };
        c.prototype.filter = function(f, s) {
            if (f && !q.isArray(f)) { f = [f]; }
            if (s == b.Application) { this.aApplicationFilters = f || []; } else if (s == b.Control) { this.aFilters = f || []; } else { this.aFilters = f || [];
                this.aApplicationFilters = []; }
            if (!f || !q.isArray(f) || f.length == 0) { this.aFilters = [];
                this.aApplicationFilters = [];
                this.aAllFilters = null; } else { this.aAllFilters = this.aFilters.concat(this.aApplicationFilters);
                this.applyFilter(); }
            this._mLengthsCache = {};
            this._fireChange({ reason: "filter" });
            this._fireFilter({ filters: f });
            return this; };
        c.prototype.applyFilter = function() { this.filterInfo.aFilteredContexts = [];
            this.filterInfo.oParentContext = {};
            var o = this.oModel.getContext(this.sPath);
            this._applyFilterRecursive(o); };
        c.prototype._applyFilterRecursive = function(p) {
            var t = this,
                f = [];
            if (q.isEmptyObject(this.aAllFilters)) {
                return; }
            this.bIsFiltering = true;
            var u = this.getNodeContexts(p);
            this.bIsFiltering = false;
            if (u.length > 0) { q.each(u, function(i, o) { t._applyFilterRecursive(o); });
                f = F.apply(u, this.aAllFilters, function(o, P) {
                    return t.oModel.getProperty(P, o); });
                if (f.length > 0) { q.merge(this.filterInfo.aFilteredContexts, f);
                    this.filterInfo.aFilteredContexts.push(p);
                    this.filterInfo.oParentContext = p; }
                if (q.inArray(this.filterInfo.oParentContext, u) != -1) { this.filterInfo.aFilteredContexts.push(p);
                    this.filterInfo.oParentContext = p; } } };
        c.prototype.sort = function(s) { s = s || [];
            this.aSorters = q.isArray(s) ? s : [s];
            this._fireChange({ reason: C.Sort });
            return this; };
        c.prototype._applySorter = function(d) {
            var t = this;
            S.apply(d, this.aSorters, function(o, p) {
                return t.oModel.getProperty(p, o); }, function(o) {
                return o.getPath(); }); };
        c.prototype._setLengthCache = function(k, l) { this._mLengthsCache[k] = l; };
        c.prototype.checkUpdate = function(f) { this.applyFilter();
            this._mLengthsCache = {};
            this._fireChange(); };
        return c; });
    sap.ui.predefine('sap/ui/model/CompositeBinding', ['jquery.sap.global', './BindingMode', './ChangeReason', './PropertyBinding', './CompositeType', './CompositeDataState'], function(q, B, C, P, a, b) { "use strict";
        var c = P.extend("sap.ui.model.CompositeBinding", { constructor: function(d, r) { P.apply(this, [null, ""]);
                this.aBindings = d;
                this.aValues = null;
                this.bRawValues = r;
                this.bPreventUpdate = false; }, metadata: { publicMethods: ["getBindings", "attachChange", "detachChange"] } });
        c.prototype.getPath = function() {
            return null; };
        c.prototype.getModel = function() {
            return null; };
        c.prototype.getContext = function() {
            return null; };
        c.prototype.isResolved = function() {
            var r = false;
            q.each(this.aBindings, function(i, o) { r = o.isResolved();
                if (!r) {
                    return false; } });
            return r; };
        c.prototype.setType = function(t, i) {
            if (t && !(t instanceof a)) {
                throw new Error("Only CompositeType can be used as type for composite bindings!"); }
            P.prototype.setType.apply(this, arguments);
            if (this.oType) { this.bRawValues = this.oType.getUseRawValues(); } };
        c.prototype.setContext = function(o) { q.each(this.aBindings, function(i, d) {
                if (!o || d.updateRequired(o.getModel())) { d.setContext(o); } }); };
        c.prototype.setValue = function(v) {
            var V;
            q.each(this.aBindings, function(i, o) { V = v[i];
                if (V !== undefined) { o.setValue(V); } });
            this.getDataState().setValue(this.getValue()); };
        c.prototype.getValue = function() {
            var v = [],
                V;
            q.each(this.aBindings, function(i, o) { V = o.getValue();
                v.push(V); });
            return v; };
        c.prototype.getOriginalValue = function() {
            var v = [],
                V;
            q.each(this.aBindings, function(i, o) { V = o.getDataState().getOriginalValue();
                v.push(V); });
            return v; };
        c.prototype.setExternalValue = function(v) {
            var V, d;
            if (this.fnFormatter) { q.sap.log.warning("Tried to use twoway binding, but a formatter function is used");
                return; }
            var D = this.getDataState();
            if (this.oType) {
                try {
                    if (this.oType.getParseWithValues()) { d = [];
                        if (this.bRawValues) { d = this.getValue(); } else { q.each(this.aBindings, function(i, o) { d.push(o.getExternalValue()); }); } }
                    V = this.oType.parseValue(v, this.sInternalType, d);
                    this.oType.validateValue(V); } catch (e) { D.setInvalidValue(v);
                    this.checkDataState();
                    throw e; } } else {
                if (typeof v == "string") { V = v.split(" "); } else { V = [v]; } }
            if (this.bRawValues) { this.setValue(V); } else { q.each(this.aBindings, function(i, o) { v = V[i];
                    if (v !== undefined) { o.setExternalValue(v); } }); }
            D.setValue(this.getValue());
            D.setInvalidValue(null); };
        c.prototype.getExternalValue = function() {
            var v = [];
            if (this.bRawValues) { v = this.getValue(); } else { q.each(this.aBindings, function(i, o) { v.push(o.getExternalValue()); }); }
            return this._toExternalValue(v); };
        c.prototype._toExternalValue = function(v) {
            var V;
            if (this.fnFormatter) { V = this.fnFormatter.apply(this, v); } else if (this.oType) { V = this.oType.formatValue(v, this.sInternalType); } else if (v.length > 1) { V = v.join(" "); } else { V = v[0]; }
            return V; };
        c.prototype.getBindings = function() {
            return this.aBindings; };
        c.prototype.hasValidation = function() {
            if (this.getType()) {
                return true; }
            var d = this.getBindings();
            for (var i = 0; i < d.length; ++i) {
                if (d[i].hasValidation()) {
                    return true; } }
            return false; };
        c.prototype.attachChange = function(f, l) {
            var t = this;
            this.fChangeHandler = function(e) {
                var o = e.getSource();
                if (o.getBindingMode() == B.OneTime) { o.detachChange(t.fChangeHandler); }
                t.checkUpdate(true); };
            this.attachEvent("change", f, l);
            if (this.aBindings) { q.each(this.aBindings, function(i, o) { o.attachChange(t.fChangeHandler); }); } };
        c.prototype.detachChange = function(f, l) {
            var t = this;
            this.detachEvent("change", f, l);
            if (this.aBindings) { q.each(this.aBindings, function(i, o) { o.detachChange(t.fChangeHandler); }); } };
        c.prototype.attachDataStateChange = function(f, l) {
            var t = this;
            this.fDataStateChangeHandler = function(e) {
                var o = e.getSource();
                if (o.getBindingMode() == B.OneTime) { o.detachDataStateChange(t.fChangeHandler); }
                t.checkDataState(); };
            this.attachEvent("DataStateChange", f, l);
            if (this.aBindings) { q.each(this.aBindings, function(i, o) { o.attachEvent("DataStateChange", t.fDataStateChangeHandler); }); } };
        c.prototype.detachDataStateChange = function(f, l) {
            var t = this;
            this.detachEvent("DataStateChange", f, l);
            if (this.aBindings) { q.each(this.aBindings, function(i, o) { o.detachEvent("DataStateChange", t.fDataStateChangeHandler); }); } };
        c.prototype.attachAggregatedDataStateChange = function(f, l) {
            var t = this;
            if (!this.fDataStateChangeHandler) { this.fDataStateChangeHandler = function(e) {
                    var o = e.getSource();
                    if (o.getBindingMode() == B.OneTime) { o.detachDataStateChange(t.fChangeHandler); }
                    t.checkDataState(); }; }
            this.attachEvent("AggregatedDataStateChange", f, l);
            if (this.aBindings) { q.each(this.aBindings, function(i, o) { o.attachEvent("DataStateChange", t.fDataStateChangeHandler); }); } };
        c.prototype.detachAggregatedDataStateChange = function(f, l) {
            var t = this;
            this.detachEvent("AggregatedDataStateChange", f, l);
            if (this.aBindings) { q.each(this.aBindings, function(i, o) { o.detachEvent("DataStateChange", t.fDataStateChangeHandler); }); } };
        c.prototype.updateRequired = function(m) {
            var u = false;
            q.each(this.aBindings, function(i, o) { u = u || o.updateRequired(m); });
            return u; };
        c.prototype.initialize = function() { this.bPreventUpdate = true;
            if (this.aBindings) { q.each(this.aBindings, function(i, o) { o.initialize(); }); }
            this.bPreventUpdate = false;
            this.checkUpdate(true);
            return this; };
        c.prototype.getDataState = function() {
            if (!this.oDataState) { this.oDataState = new b(this.aBindings.map(function(o) {
                    return o.getDataState(); })); }
            return this.oDataState; };
        c.prototype.checkUpdate = function(f) {
            var d = false;
            if (this.bPreventUpdate) {
                return; }
            var D = this.getDataState();
            var o = this.getOriginalValue();
            if (f || !q.sap.equal(o, this.aOriginalValues)) { this.aOriginalValues = o;
                D.setOriginalValue(o);
                d = true; }
            var v = this.getValue();
            if (!q.sap.equal(v, this.aValues) || f) { this.aValues = v;
                D.setValue(v);
                this._fireChange({ reason: C.Change });
                d = true; }
            if (d) { this.checkDataState(); } };
        return c; });
    sap.ui.predefine('sap/ui/model/CompositeDataState', ['jquery.sap.global', './DataState'], function(q, D) { "use strict";
        var C = D.extend("sap.ui.model.CompositeDataState", { metadata: {}, constructor: function(d) { D.apply(this, arguments);
                this.mProperties.originalValue = [];
                this.mProperties.originalInternalValue = [];
                this.mProperties.value = [];
                this.mProperties.invalidValue = null;
                this.mProperties.internalValue = [];
                this.mChangedProperties = q.extend({}, this.mProperties);
                this.aDataStates = d; } });
        C.prototype._hasInnerInvalidValues = function() {
            return this.aDataStates.reduce(function(i, d) {
                if (d.getInvalidValue() !== null) {
                    return true; } else {
                    return i; } }, false); };
        C.prototype.getInternalProperty = function(p) {
            var r;
            if (p === "invalidValue" && this._hasInnerInvalidValues()) { r = this.aDataStates.map(function(d) {
                    return d.getProperty("invalidValue") || d.getProperty("value"); }); } else { r = this.aDataStates.map(function(d) {
                    return d.getProperty(p); }); }
            return r; };
        C.prototype.getProperty = function(p) {
            var v = D.prototype.getProperty.apply(this, arguments);
            var I = this.getInternalProperty(p);
            var r;
            switch (p) {
                case "modelMessages":
                case "controlMessages":
                    r = v;
                    for (var i = 0; i < I.length; ++i) { r = r.concat(I[i]); }
                    break;
                default:
                    r = I || v; }
            return r; };
        C.prototype.getModelMessages = function() {
            return this.getProperty("modelMessages"); };
        C.prototype.getControlMessages = function() {
            return this.getProperty("controlMessages"); };
        C.prototype.getMessages = function() {
            return this.aDataStates.reduce(function(m, d) {
                return m.concat(d.getMessages()); }, D.prototype.getMessages.apply(this, arguments)); };
        C.prototype.containsValues = function(v) {
            if (Array.isArray(v)) {
                for (var i = 0; i < v.length; i++) {
                    if (v[i] !== null && v[i] !== undefined) {
                        return true; } }
                return false; } else {
                return !!v; } };
        C.prototype.isDirty = function() {
            return this.aDataStates.reduce(function(i, d) {
                if (d.isDirty()) {
                    return true; } else {
                    return i; } }, D.prototype.isDirty.apply(this, arguments)); };
        C.prototype.isControlDirty = function() {
            return this.aDataStates.reduce(function(i, d) {
                if (d.isControlDirty()) {
                    return true; } else {
                    return i; } }, D.prototype.isControlDirty.apply(this, arguments)); };
        C.prototype.isLaundering = function() {
            return this.aDataStates.reduce(function(i, d) {
                if (d.isLaundering()) {
                    return true; } else {
                    return i; } }, D.prototype.isLaundering.apply(this, arguments)); };
        C.prototype.getInvalidValue = function() {
            var v = this.mChangedProperties["invalidValue"];
            var i = this.getInternalProperty("invalidValue");
            if (i && this.containsValues(i)) { v = i;
                this.setInvalidValue(i); }
            return v; };
        C.prototype.changed = function(n) {
            if (n === false) { this.mProperties = q.extend({}, this.mChangedProperties);
                this.aDataStates.forEach(function(d) { d.changed(false); }); }
            return this.aDataStates.reduce(function(l, d) {
                if (l) {
                    return true; } else {
                    return d.changed(); } }, !q.sap.equal(this.mProperties, this.mChangedProperties)); };
        C.prototype.getChanges = function() {
            var c = {};
            var i, k, m;
            var I = [];
            for (i = 0; i < this.aDataStates.length; ++i) { m = this.aDataStates[i].getChanges();
                for (k in m) { c[k] = []; }
                I.push(m); }
            var h = this._hasInnerInvalidValues();
            var a = {};
            for (k in c) {
                for (i = 0; i < I.length; ++i) { m = I[i][k];
                    if (!a[k]) { a[k] = []; }
                    if (m) { a[k].push(m.value); } else {
                        var v = this.aDataStates[i].getProperty(k);
                        if (k === "invalidValue" && h && !v) { v = this.aDataStates[i].getProperty("value"); }
                        a[k].push(v); } } }
            q.each(this.mChangedProperties, function(p, v) {
                if (this.mChangedProperties[p] && !q.sap.equal(this.mChangedProperties[p], this.mProperties[p])) { a[p] = {};
                    a[p].value = this.mChangedProperties[p];
                    a[p].oldValue = this.mProperties[p]; } }.bind(this));
            var M = this.getMessages();
            var o = this._getOldMessages();
            if (M.length > 0 || o.length > 0) { a["messages"] = {};
                a["messages"].oldValue = o;
                a["messages"].value = M; }
            return a; };
        return C; });
    sap.ui.predefine('sap/ui/model/CompositeType', ['./FormatException', './ParseException', './SimpleType', './ValidateException'], function(F, P, S, V) { "use strict";
        var C = S.extend("sap.ui.model.CompositeType", { constructor: function(f, c) { S.apply(this, arguments);
                this.sName = "CompositeType";
                this.bUseRawValues = false;
                this.bParseWithValues = false; }, metadata: { "abstract": true, publicMethods: [] } });
        C.prototype.getUseRawValues = function() {
            return this.bUseRawValues; };
        C.prototype.getParseWithValues = function() {
            return this.bParseWithValues; };
        return C; });
    sap.ui.predefine('sap/ui/model/Context', ['sap/ui/base/Object'], function(B) { "use strict";
        var C = B.extend("sap.ui.model.Context", { constructor: function(m, p) { B.apply(this);
                this.oModel = m;
                this.sPath = p; }, metadata: { "abstract": true, publicMethods: ["getModel", "getPath", "getProperty", "getObject"] } });
        C.prototype.getModel = function() {
            return this.oModel; };
        C.prototype.getPath = function(p) {
            return this.sPath + (p ? "/" + p : ""); };
        C.prototype.getProperty = function(p) {
            return this.oModel.getProperty(p, this); };
        C.prototype.getObject = function(p) {
            return this.oModel.getObject(p, this); };
        C.prototype.toString = function() {
            return this.sPath; };
        return C; });
    sap.ui.predefine('sap/ui/model/ContextBinding', ['./Binding'], function(B) { "use strict";
        var C = B.extend("sap.ui.model.ContextBinding", { constructor: function(m, p, c, P, e) { B.call(this, m, p, c, P, e);
                this.oElementContext = null;
                this.bInitial = true; }, metadata: { publicMethods: ["getElementContext"] } });
        C.prototype.checkUpdate = function(f) {};
        C.prototype.getBoundContext = function(c) {
            return this.oElementContext; };
        return C; });
    sap.ui.predefine('sap/ui/model/DataState', ['jquery.sap.global', '../base/Object'], function(q, B) { "use strict";
        var D = B.extend("sap.ui.model.DataState", { metadata: {}, constructor: function() { this.mProperties = { modelMessages: [], controlMessages: [], laundering: false, originalValue: null, originalInternalValue: null, value: null, invalidValue: null, internalValue: null, dirty: false, messages: [] };
                this.mChangedProperties = q.extend({}, this.mProperties); } });
        D.prototype._sortMessages = function(m) {
            var s = { 'Error': 0, 'Warning': 1, 'Success': 2, 'Info': 3 };
            m.sort(function(a, b) {
                return s[a.type] - s[b.type]; }); };
        D.prototype.setProperty = function(p, v) { this.mChangedProperties[p] = v;
            return this; };
        D.prototype.calculateChanges = function() {
            for (var p in this.mChangedProperties) {
                var c = this.mChangedProperties[p].value;
                if (!q.sap.equal(this.mProperties[p], c)) {
                    if (q.isArray(c)) { c = c.slice(0); }
                    this.mProperties[p] = c; } }
            return this; };
        D.prototype.getProperty = function(p) {
            return this.mChangedProperties[p]; };
        D.prototype.getMessages = function() {
            var m = [];
            var c = this.mChangedProperties['controlMessages'];
            var M = this.mChangedProperties['modelMessages'];
            if (M || c) { m = m.concat(M ? M : [], c ? c : []);
                this._sortMessages(m); }
            return m; };
        D.prototype._getOldMessages = function() {
            var m = [];
            var c = this.mProperties['controlMessages'];
            var M = this.mProperties['modelMessages'];
            if (M || c) { m = m.concat(M ? M : [], c ? c : []);
                this._sortMessages(m); }
            return m; };
        D.prototype.setModelMessages = function(m) { this.mChangedProperties["modelMessages"] = m || [];
            return this; };
        D.prototype.getModelMessages = function() {
            return this.getProperty("modelMessages"); };
        D.prototype.setControlMessages = function(m) { this.mChangedProperties["controlMessages"] = m || [];
            return this; };
        D.prototype.getControlMessages = function() {
            return this.getProperty("controlMessages"); };
        D.prototype.isDirty = function() {
            var v = this.mChangedProperties["value"];
            var o = this.mChangedProperties["originalValue"];
            var c = this.mChangedProperties["invalidValue"];
            return !!c || !q.sap.equal(v, o); };
        D.prototype.isControlDirty = function() {
            return !!this.mChangedProperties["invalidValue"]; };
        D.prototype.isLaundering = function() {
            return this.mChangedProperties["laundering"]; };
        D.prototype.setLaundering = function(l) { this.mChangedProperties["laundering"] = l;
            return this; };
        D.prototype.getValue = function(v) {
            return this.getProperty("value"); };
        D.prototype.setValue = function(v) { this.mChangedProperties["value"] = v || null;
            return this; };
        D.prototype.getInvalidValue = function() {
            return this.getProperty("invalidValue"); };
        D.prototype.setInvalidValue = function(i) { this.mChangedProperties["invalidValue"] = i || null;
            return this; };
        D.prototype.getOriginalValue = function() {
            return this.getProperty("originalValue"); };
        D.prototype.setOriginalValue = function(o) { this.mChangedProperties["originalValue"] = o || null;
            return this; };
        D.prototype.changed = function(n) {
            if (n === false) { this.mProperties = q.extend({}, this.mChangedProperties); }
            return !q.sap.equal(this.mChangedProperties, this.mProperties); };
        D.prototype.getChanges = function() {
            var c = {};
            q.each(this.mChangedProperties, function(p, v) {
                if (!q.sap.equal(this.mChangedProperties[p], this.mProperties[p])) { c[p] = {};
                    c[p].value = this.mChangedProperties[p];
                    c[p].oldValue = this.mProperties[p]; } }.bind(this));
            var m = this.getMessages();
            var o = this._getOldMessages();
            if (m.length > 0 || o.length > 0) { c["messages"] = {};
                c["messages"].oldValue = o;
                c["messages"].value = m; }
            return c; };
        return D; });
    sap.ui.predefine('sap/ui/model/Filter', ['jquery.sap.global', 'sap/ui/base/Object', './FilterOperator', 'sap/ui/Device'], function(q, B, F, D) { "use strict";
        var a = B.extend("sap.ui.model.Filter", { constructor: function(f, o, v, V) {
                if (typeof f === "object" && !q.isArray(f)) { this.sPath = f.path;
                    this.sOperator = f.operator;
                    this.oValue1 = f.value1;
                    this.oValue2 = f.value2;
                    this.aFilters = f.filters || f.aFilters;
                    this.bAnd = f.and || f.bAnd;
                    this.fnTest = f.test; } else {
                    if (q.isArray(f)) { this.aFilters = f; } else { this.sPath = f; }
                    if (q.type(o) === "boolean") { this.bAnd = o; } else if (q.type(o) === "function") { this.fnTest = o; } else { this.sOperator = o; }
                    this.oValue1 = v;
                    this.oValue2 = V; }
                if (!String.prototype.normalize && typeof this.oValue1 == "string" && !D.browser.mobile) { q.sap.require("jquery.sap.unicode"); }
                if (q.isArray(this.aFilters) && !this.sPath && !this.sOperator && !this.oValue1 && !this.oValue2) { this._bMultiFilter = true;
                    q.each(this.aFilters, function(i, b) {
                        if (!(b instanceof a)) { q.sap.log.error("Filter in Aggregation of Multi filter has to be instance of sap.ui.model.Filter"); } }); } else if (!this.aFilters && this.sPath !== undefined && ((this.sOperator && this.oValue1 !== undefined) || this.fnTest)) { this._bMultiFilter = false; } else { q.sap.log.error("Wrong parameters defined for filter."); } } });
        return a; });
    sap.ui.predefine('sap/ui/model/FilterOperator', function() { "use strict";
        var F = { EQ: "EQ", NE: "NE", LT: "LT", LE: "LE", GT: "GT", GE: "GE", BT: "BT", Contains: "Contains", StartsWith: "StartsWith", EndsWith: "EndsWith" };
        return F; }, true);
    sap.ui.predefine('sap/ui/model/FilterProcessor', ['jquery.sap.global'], function(q) { "use strict";
        var F = {};
        F.apply = function(d, f, g) {
            if (!f || f.length == 0) {
                return d.slice(); }
            var t = this,
                o = {},
                a, b = [],
                G = false,
                c = true;
            q.each(f, function(j, e) {
                if (e.sPath !== undefined) { a = o[e.sPath];
                    if (!a) { a = o[e.sPath] = []; } } else { a = o["__multiFilter"];
                    if (!a) { a = o["__multiFilter"] = []; } }
                a.push(e); });
            q.each(d, function(i, r) { c = true;
                q.each(o, function(p, a) {
                    if (p !== "__multiFilter") {
                        var v = g(r, p);
                        v = t.normalizeFilterValue(v);
                        G = false;
                        q.each(a, function(j, e) {
                            var T = t.getFilterFunction(e);
                            if (v !== undefined && T(v)) { G = true;
                                return false; } }); } else { G = false;
                        q.each(a, function(j, e) { G = t._resolveMultiFilter(e, r, g);
                            if (G) {
                                return false; } }); }
                    if (!G) { c = false;
                        return false; } });
                if (c) { b.push(r); } });
            return b; };
        F.normalizeFilterValue = function(v) {
            if (typeof v == "string") {
                if (String.prototype.normalize) { v = v.normalize("NFC"); }
                return v.toUpperCase(); }
            if (v instanceof Date) {
                return v.getTime(); }
            return v; };
        F._resolveMultiFilter = function(m, r, g) {
            var t = this,
                M = false,
                f = m.aFilters;
            if (f) { q.each(f, function(i, o) {
                    var l = false;
                    if (o._bMultiFilter) { l = t._resolveMultiFilter(o, r, g); } else if (o.sPath !== undefined) {
                        var v = g(r, o.sPath);
                        v = t.normalizeFilterValue(v);
                        var T = t.getFilterFunction(o);
                        if (v !== undefined && T(v)) { l = true; } }
                    if (l && m.bAnd) { M = true; } else if (!l && m.bAnd) { M = false;
                        return false; } else if (l) { M = true;
                        return false; } }); }
            return M; };
        F.getFilterFunction = function(f) {
            if (f.fnTest) {
                return f.fnTest; }
            var v = this.normalizeFilterValue(f.oValue1),
                V = this.normalizeFilterValue(f.oValue2);
            switch (f.sOperator) {
                case "EQ":
                    f.fnTest = function(a) {
                        return a == v; };
                    break;
                case "NE":
                    f.fnTest = function(a) {
                        return a != v; };
                    break;
                case "LT":
                    f.fnTest = function(a) {
                        return a < v; };
                    break;
                case "LE":
                    f.fnTest = function(a) {
                        return a <= v; };
                    break;
                case "GT":
                    f.fnTest = function(a) {
                        return a > v; };
                    break;
                case "GE":
                    f.fnTest = function(a) {
                        return a >= v; };
                    break;
                case "BT":
                    f.fnTest = function(a) {
                        return (a >= v) && (a <= V); };
                    break;
                case "Contains":
                    f.fnTest = function(a) {
                        if (a == null) {
                            return false; }
                        if (typeof a != "string") {
                            throw new Error("Only \"String\" values are supported for the FilterOperator: \"Contains\"."); }
                        return a.indexOf(v) != -1; };
                    break;
                case "StartsWith":
                    f.fnTest = function(a) {
                        if (a == null) {
                            return false; }
                        if (typeof a != "string") {
                            throw new Error("Only \"String\" values are supported for the FilterOperator: \"StartsWith\"."); }
                        return a.indexOf(v) == 0; };
                    break;
                case "EndsWith":
                    f.fnTest = function(a) {
                        if (a == null) {
                            return false; }
                        if (typeof a != "string") {
                            throw new Error("Only \"String\" values are supported for the FilterOperator: \"EndsWith\"."); }
                        var p = a.lastIndexOf(v);
                        if (p == -1) {
                            return false; }
                        return p == a.length - new String(f.oValue1).length; };
                    break;
                default:
                    f.fnTest = function(a) {
                        return true; }; }
            return f.fnTest; };
        return F; });
    sap.ui.predefine('sap/ui/model/FilterType', function() { "use strict";
        var F = { Application: "Application", Control: "Control" };
        return F; }, true);
    sap.ui.predefine('sap/ui/model/FormatException', ['jquery.sap.global', 'sap/ui/base/Exception'], function(q, E) { "use strict";
        var F = function(m) { this.name = "FormatException";
            this.message = m; };
        F.prototype = q.sap.newObject(E.prototype);
        return F; }, true);
    sap.ui.predefine('sap/ui/model/ListBinding', ['jquery.sap.global', './Binding', './Filter', './Sorter'], function(q, B, F, S) { "use strict";
        var L = B.extend("sap.ui.model.ListBinding", { constructor: function(m, p, c, s, f, P) { B.call(this, m, p, c, P);
                this.aSorters = s;
                if (!q.isArray(this.aSorters) && this.aSorters instanceof S) { this.aSorters = [this.aSorters]; } else if (!q.isArray(this.aSorters)) { this.aSorters = []; }
                this.aFilters = [];
                if (!q.isArray(f) && f instanceof F) { f = [f]; } else if (!q.isArray(f)) { f = []; }
                this.aApplicationFilters = f;
                this.bUseExtendedChangeDetection = false; }, metadata: { "abstract": true, publicMethods: ["getContexts", "getCurrentContexts", "sort", "attachSort", "detachSort", "filter", "attachFilter", "detachFilter", "getDistinctValues", "isGrouped", "getLength", "isLengthFinal"] } });
        L.prototype.getCurrentContexts = function() {
            return this.getContexts(); };
        L.prototype.getLength = function() {
            return 0; };
        L.prototype.isLengthFinal = function() {
            return true; };
        L.prototype.getDistinctValues = function(p) {
            return null; };
        L.prototype.attachSort = function(f, l) { this.attachEvent("sort", f, l); };
        L.prototype.detachSort = function(f, l) { this.detachEvent("sort", f, l); };
        L.prototype._fireSort = function(a) { this.fireEvent("sort", a); };
        L.prototype.attachFilter = function(f, l) { this.attachEvent("filter", f, l); };
        L.prototype.detachFilter = function(f, l) { this.detachEvent("filter", f, l); };
        L.prototype._fireFilter = function(a) { this.fireEvent("filter", a); };
        L.prototype.isGrouped = function() {
            return !!(this.aSorters && this.aSorters[0] && this.aSorters[0].fnGroup); };
        L.prototype.getGroup = function(c) {
            return this.aSorters[0].getGroup(c); };
        L.prototype.enableExtendedChangeDetection = function() { this.bUseExtendedChangeDetection = true;
            if (this.update) { this.update(); } };
        return L; });
    sap.ui.predefine('sap/ui/model/Model', ['jquery.sap.global', 'sap/ui/core/message/MessageProcessor', './BindingMode', './Context'], function(q, M, B, C) { "use strict";
        var a = M.extend("sap.ui.model.Model", { constructor: function() { M.apply(this, arguments);
                this.oData = {};
                this.bDestroyed = false;
                this.aBindings = [];
                this.mContexts = {};
                this.iSizeLimit = 100;
                this.sDefaultBindingMode = B.TwoWay;
                this.mSupportedBindingModes = { "OneWay": true, "TwoWay": true, "OneTime": true };
                this.bLegacySyntax = false;
                this.sUpdateTimer = null; }, metadata: { "abstract": true, publicMethods: ["bindProperty", "bindList", "bindTree", "bindContext", "createBindingContext", "destroyBindingContext", "getProperty", "getDefaultBindingMode", "setDefaultBindingMode", "isBindingModeSupported", "attachParseError", "detachParseError", "attachRequestCompleted", "detachRequestCompleted", "attachRequestFailed", "detachRequestFailed", "attachRequestSent", "detachRequestSent", "setSizeLimit", "refresh", "isList", "getObject"] } });
        a.M_EVENTS = { ParseError: "parseError", RequestFailed: "requestFailed", RequestSent: "requestSent", RequestCompleted: "requestCompleted" };
        a.prototype.attachRequestFailed = function(d, f, l) { this.attachEvent("requestFailed", d, f, l);
            return this; };
        a.prototype.detachRequestFailed = function(f, l) { this.detachEvent("requestFailed", f, l);
            return this; };
        a.prototype.fireRequestFailed = function(A) { this.fireEvent("requestFailed", A);
            return this; };
        a.prototype.attachParseError = function(d, f, l) { this.attachEvent("parseError", d, f, l);
            return this; };
        a.prototype.detachParseError = function(f, l) { this.detachEvent("parseError", f, l);
            return this; };
        a.prototype.fireParseError = function(A) { this.fireEvent("parseError", A);
            return this; };
        a.prototype.attachRequestSent = function(d, f, l) { this.attachEvent("requestSent", d, f, l);
            return this; };
        a.prototype.detachRequestSent = function(f, l) { this.detachEvent("requestSent", f, l);
            return this; };
        a.prototype.fireRequestSent = function(A) { this.fireEvent("requestSent", A);
            return this; };
        a.prototype.attachRequestCompleted = function(d, f, l) { this.attachEvent("requestCompleted", d, f, l);
            return this; };
        a.prototype.detachRequestCompleted = function(f, l) { this.detachEvent("requestCompleted", f, l);
            return this; };
        a.prototype.fireRequestCompleted = function(A) { this.fireEvent("requestCompleted", A);
            return this; };
        a.prototype.attachMessageChange = function(d, f, l) { this.attachEvent("messageChange", d, f, l);
            return this; };
        a.prototype.detachMessageChange = function(f, l) { this.detachEvent("messageChange", f, l);
            return this; };
        a.prototype.getObject = function(p, c) {
            return this.getProperty(p, c); };
        a.prototype.getContext = function(p) {
            if (!q.sap.startsWith(p, "/")) {
                throw new Error("Path " + p + " must start with a / "); }
            var c = this.mContexts[p];
            if (!c) { c = new C(this, p);
                this.mContexts[p] = c; }
            return c; };
        a.prototype.resolve = function(p, c) {
            var i = typeof p == "string" && !q.sap.startsWith(p, "/"),
                r = p,
                s;
            if (i) {
                if (c) { s = c.getPath();
                    r = s + (q.sap.endsWith(s, "/") ? "" : "/") + p; } else { r = this.isLegacySyntax() ? "/" + p : undefined; } }
            if (!p && c) { r = c.getPath(); }
            if (r && r !== "/" && q.sap.endsWith(r, "/")) { r = r.substr(0, r.length - 1); }
            return r; };
        a.prototype.addBinding = function(b) { this.aBindings.push(b); };
        a.prototype.removeBinding = function(b) {
            for (var i = 0; i < this.aBindings.length; i++) {
                if (this.aBindings[i] == b) { this.aBindings.splice(i, 1);
                    break; } } };
        a.prototype.getDefaultBindingMode = function() {
            return this.sDefaultBindingMode; };
        a.prototype.setDefaultBindingMode = function(m) {
            if (this.isBindingModeSupported(m)) { this.sDefaultBindingMode = m;
                return this; }
            throw new Error("Binding mode " + m + " is not supported by this model.", this); };
        a.prototype.isBindingModeSupported = function(m) {
            return (m in this.mSupportedBindingModes); };
        a.prototype.setLegacySyntax = function(l) { this.bLegacySyntax = l; };
        a.prototype.isLegacySyntax = function() {
            return this.bLegacySyntax; };
        a.prototype.setSizeLimit = function(s) { this.iSizeLimit = s; };
        a.prototype.getInterface = function() {
            return this; };
        a.prototype.refresh = function(f) { this.checkUpdate(f);
            if (f) { this.fireMessageChange({ oldMessages: this.mMessages }); } };
        a.prototype.checkUpdate = function(f, A) {
            if (A) {
                if (!this.sUpdateTimer) { this.sUpdateTimer = q.sap.delayedCall(0, this, function() { this.checkUpdate(f); }); }
                return; }
            if (this.sUpdateTimer) { q.sap.clearDelayedCall(this.sUpdateTimer);
                this.sUpdateTimer = null; }
            var b = this.aBindings.slice(0);
            q.each(b, function(i, o) { o.checkUpdate(f); }); };
        a.prototype.setMessages = function(m) { this.mMessages = m || {};
            if (m !== null || !q.sap.equal(this.mMessages, m)) { this.checkMessages(); } };
        a.prototype.getMessagesByPath = function(p) {
            if (this.mMessages) {
                return this.mMessages[p] || []; }
            return null; };
        a.prototype.checkMessages = function() { q.each(this.aBindings, function(i, b) {
                if (b.checkDataState) { b.checkDataState(); } }); };
        a.prototype.destroy = function() { M.prototype.destroy.apply(this, arguments);
            this.oData = {};
            this.aBindings = [];
            this.mContexts = {};
            if (this.sUpdateTimer) { q.sap.clearDelayedCall(this.sUpdateTimer); }
            this.bDestroyed = true; };
        a.prototype.getMetaModel = function() {
            return undefined; };
        a.prototype.getOriginalProperty = function(p, c) {
            return this.getProperty(p, c); };
        a.prototype.isLaundering = function(p, c) {
            return false; };
        return a; });
    sap.ui.predefine('sap/ui/model/ParseException', ['jquery.sap.global', 'sap/ui/base/Exception'], function(q, E) { "use strict";
        var P = function(m) { this.name = "ParseException";
            this.message = m; };
        P.prototype = q.sap.newObject(E.prototype);
        return P; }, true);
    sap.ui.predefine('sap/ui/model/PropertyBinding', ['jquery.sap.global', './Binding', './SimpleType', './DataState'], function(q, B, S, D) { "use strict";
        var P = B.extend("sap.ui.model.PropertyBinding", { constructor: function(m, p, c, a) { B.apply(this, arguments); }, metadata: { "abstract": true, publicMethods: ["getValue", "setValue", "setType", "getType", "setFormatter", "getFormatter", "getExternalValue", "setExternalValue", "getBindingMode"] } });
        P.prototype.getExternalValue = function() {
            return this._toExternalValue(this.getValue()); };
        P.prototype._toExternalValue = function(v) {
            if (this.oType) { v = this.oType.formatValue(v, this.sInternalType); }
            if (this.fnFormatter) { v = this.fnFormatter(v); }
            return v; };
        P.prototype.setExternalValue = function(v) {
            if (this.fnFormatter) { q.sap.log.warning("Tried to use twoway binding, but a formatter function is used");
                return; }
            var d = this.getDataState();
            try {
                if (this.oType) { v = this.oType.parseValue(v, this.sInternalType);
                    this.oType.validateValue(v); } } catch (e) { d.setInvalidValue(v);
                this.checkDataState();
                throw e; }
            d.setInvalidValue(null);
            this.setValue(v); };
        P.prototype.setType = function(t, i) { this.oType = t;
            this.sInternalType = i; };
        P.prototype.getType = function() {
            return this.oType; };
        P.prototype.setFormatter = function(f) { this.fnFormatter = f; };
        P.prototype.getFormatter = function() {
            return this.fnFormatter; };
        P.prototype.getBindingMode = function() {
            return this.sMode; };
        P.prototype.setBindingMode = function(b) { this.sMode = b; };
        P.prototype.checkDataState = function(p) {
            var r = this.oModel ? this.oModel.resolve(this.sPath, this.oContext) : null;
            var t = this;
            if (!p || r && r in p) {
                var d = this.getDataState();
                if (r) { d.setModelMessages(this.oModel.getMessagesByPath(r)); }
                if (d && d.changed()) {
                    if (this.mEventRegistry["DataStateChange"]) { this.fireEvent("DataStateChange", { dataState: d }); }
                    if (this.mEventRegistry["AggregatedDataStateChange"]) {
                        if (!this._sDataStateTimout) { this._sDataStateTimout = setTimeout(function() { t.fireEvent("AggregatedDataStateChange", { dataState: d });
                                d.changed(false);
                                t._sDataStateTimout = null; }, 0); } } } } };
        return P; });
    sap.ui.predefine('sap/ui/model/SimpleType', ['sap/ui/base/DataType', './FormatException', './ParseException', './Type', './ValidateException'], function(D, F, P, T, V) { "use strict";
        var S = T.extend("sap.ui.model.SimpleType", { constructor: function(f, c) { T.apply(this, arguments);
                this.setFormatOptions(f || {});
                this.setConstraints(c || {});
                this.sName = "SimpleType"; }, metadata: { "abstract": true, publicMethods: ["setConstraints", "setFormatOptions", "formatValue", "parseValue", "validateValue"] } });
        S.prototype.setConstraints = function(c) { this.oConstraints = c; };
        S.prototype.setFormatOptions = function(f) { this.oFormatOptions = f; };
        S.prototype.getPrimitiveType = function(i) {
            switch (i) {
                case "any":
                case "boolean":
                case "int":
                case "float":
                case "string":
                case "object":
                    return i;
                default:
                    var I = D.getType(i);
                    return I && I.getPrimitiveType().getName(); } };
        return S; });
    sap.ui.predefine('sap/ui/model/Sorter', ['sap/ui/base/Object'], function(B) { "use strict";
        var S = B.extend("sap.ui.model.Sorter", { constructor: function(p, d, g, c) {
                if (typeof p === "object") {
                    var s = p;
                    p = s.path;
                    d = s.descending;
                    g = s.group;
                    c = s.comparator; }
                this.sPath = p;
                var i = this.sPath.indexOf(">");
                if (i > 0) { this.sPath = this.sPath.substr(i + 1); }
                this.bDescending = d;
                this.vGroup = g;
                if (typeof g == "boolean" && g) { this.fnGroup = function(C) {
                        return C.getProperty(this.sPath); }; }
                if (typeof g == "function") { this.fnGroup = g; }
                this.fnCompare = c; }, getGroup: function(c) {
                var g = this.fnGroup(c);
                if (typeof g === "string" || typeof g === "number" || typeof g === "boolean" || g == null) { g = { key: g }; }
                return g; } });
        S.defaultComparator = function(a, b) {
            if (a == b) {
                return 0; }
            if (b == null) {
                return -1; }
            if (a == null) {
                return 1; }
            if (typeof a == "string" && typeof b == "string") {
                return a.localeCompare(b); }
            if (a < b) {
                return -1; }
            if (a > b) {
                return 1; }
            return 0; };
        return S; });
    sap.ui.predefine('sap/ui/model/SorterProcessor', ['jquery.sap.global', './Sorter'], function(q, S) { "use strict";
        var c = {};
        c.apply = function(d, s, g, G) {
            var t = this,
                e = [],
                C = [],
                v, o;
            if (!s || s.length == 0) {
                return d; }
            for (var j = 0; j < s.length; j++) { o = s[j];
                C[j] = o.fnCompare || S.defaultComparator;
                q.each(d, function(i, r) { v = g(r, o.sPath);
                    if (typeof v == "string") { v = v.toLocaleUpperCase(); }
                    if (!e[j]) { e[j] = []; }
                    if (G) { r = G(r); }
                    e[j][r] = v; }); }
            d.sort(function(a, b) {
                if (G) { a = G(a);
                    b = G(b); }
                var f = e[0][a],
                    h = e[0][b];
                return t._applySortCompare(s, a, b, f, h, e, C, 0); });
            return d; };
        c._applySortCompare = function(s, a, b, v, d, e, C, D) {
            var o = s[D],
                f = C[D],
                r;
            r = f(v, d);
            if (o.bDescending) { r = -r; }
            if (r == 0 && s[D + 1]) { v = e[D + 1][a];
                d = e[D + 1][b];
                r = this._applySortCompare(s, a, b, v, d, e, C, D + 1); }
            return r; };
        return c; });
    sap.ui.predefine('sap/ui/model/TreeBinding', ['./Binding'], function(B) { "use strict";
        var T = B.extend("sap.ui.model.TreeBinding", { constructor: function(m, p, c, f, P, s) { B.call(this, m, p, c, P);
                this.aFilters = [];
                this.aSorters = s;
                if (!jQuery.isArray(this.aSorters) && this.aSorters instanceof sap.ui.model.Sorter) { this.aSorters = [this.aSorters]; } else if (!jQuery.isArray(this.aSorters)) { this.aSorters = []; }
                this.aApplicationFilters = f;
                if (!jQuery.isArray(f) && f instanceof sap.ui.model.Filter) { this.aApplicationFilters = [f]; } else if (!jQuery.isArray(f)) { this.aApplicationFilters = []; }
                this.bDisplayRootNode = P && P.displayRootNode === true; }, metadata: { "abstract": true, publicMethods: ["getRootContexts", "getNodeContexts", "hasChildren", "filter"] } });
        T.prototype.getChildCount = function(c) {
            if (!c) {
                return this.getRootContexts().length; }
            return this.getNodeContexts(c).length; };
        T.prototype.attachFilter = function(f, l) { this.attachEvent("_filter", f, l); };
        T.prototype.detachFilter = function(f, l) { this.detachEvent("_filter", f, l); };
        T.prototype._fireFilter = function(a) { this.fireEvent("_filter", a); };
        return T; });
    sap.ui.predefine('sap/ui/model/Type', ['sap/ui/base/Object'], function(B) { "use strict";
        var T = B.extend("sap.ui.model.Type", { constructor: function() { B.apply(this, arguments);
                this.sName = "Type"; }, metadata: { "abstract": true, publicMethods: ["getName"] } });
        T.prototype.getName = function() {
            return this.sName; };
        return T; });
    sap.ui.predefine('sap/ui/model/ValidateException', ['jquery.sap.global', 'sap/ui/base/Exception'], function(q, E) { "use strict";
        var V = function(m, v) { this.name = "ValidateException";
            this.message = m;
            this.violatedConstraints = v; };
        V.prototype = q.sap.newObject(E.prototype);
        return V; }, true);
    sap.ui.predefine('sap/ui/model/message/MessageListBinding', ['jquery.sap.global', 'sap/ui/model/ChangeReason', 'sap/ui/model/ClientListBinding'], function(q, C, a) { "use strict";
        var M = a.extend("sap.ui.model.message.MessageListBinding");
        M.prototype.getContexts = function(s, l) { this.iLastStartIndex = s;
            this.iLastLength = l;
            if (!s) { s = 0; }
            if (!l) { l = Math.min(this.iLength, this.oModel.iSizeLimit); }
            var c = this._getContexts(s, l),
                o = {};
            if (this.bUseExtendedChangeDetection) {
                for (var i = 0; i < c.length; i++) { o[c[i].getPath()] = c[i].getObject(); }
                if (this.aLastContexts && s < this.iLastEndIndex) {
                    var t = this;
                    var d = q.sap.arrayDiff(this.aLastContexts, c, function(O, n) {
                        return q.sap.equal(O && t.oLastContextData && t.oLastContextData[O.getPath()], n && o && o[n.getPath()]); });
                    c.diff = d; }
                this.iLastEndIndex = s + l;
                this.aLastContexts = c.slice(0);
                this.oLastContextData = q.extend(true, {}, o); }
            return c; };
        M.prototype.update = function() {
            var l = this.oModel._getObject(this.sPath, this.oContext);
            if (l && q.isArray(l)) {
                if (this.bUseExtendedChangeDetection) { this.oList = q.extend(true, [], l); } else { this.oList = l.slice(0); }
                this.updateIndices();
                this.applyFilter();
                this.applySort();
                this.iLength = this._getLength(); } else { this.oList = [];
                this.aIndices = [];
                this.iLength = 0; } };
        M.prototype.checkUpdate = function(f) {
            if (this.bSuspended && !this.bIgnoreSuspend) {
                return; }
            if (!this.bUseExtendedChangeDetection) {
                var l = this.oModel._getObject(this.sPath, this.oContext);
                if (!q.sap.equal(this.oList, l) || f) { this.update();
                    this._fireChange({ reason: C.Change }); } } else {
                var c = false;
                var t = this;
                var l = this.oModel._getObject(this.sPath, this.oContext);
                if (!q.sap.equal(this.oList, l)) { this.update(); }
                var b = this._getContexts(this.iLastStartIndex, this.iLastLength);
                if (this.aLastContexts) {
                    if (this.aLastContexts.length != b.length) { c = true; } else { q.each(this.aLastContexts, function(i, o) {
                            if (!q.sap.equal(b[i].getObject(), t.oLastContextData[o.getPath()])) { c = true;
                                return false; } }); } } else { c = true; }
                if (c || f) { this._fireChange({ reason: C.Change }); } } };
        return M; });
    sap.ui.predefine('sap/ui/model/message/MessageModel', ['jquery.sap.global', 'sap/ui/model/BindingMode', 'sap/ui/model/ClientModel', 'sap/ui/model/Context', './MessageListBinding', './MessagePropertyBinding'], function(q, B, C, a, M, b) { "use strict";
        var c = C.extend("sap.ui.model.message.MessageModel", { constructor: function(m) { C.apply(this, arguments);
                this.sDefaultBindingMode = B.OneWay;
                this.mSupportedBindingModes = { "OneWay": true, "TwoWay": false, "OneTime": false };
                this.oMessageManager = m; } });
        c.prototype.setData = function(d) { this.oData = d;
            this.checkUpdate(); };
        c.prototype.fireMessageChange = function(A) { this.fireEvent("messageChange", A);
            return this; };
        c.prototype.bindProperty = function(p, o, P) {
            var d = new b(this, p, o, P);
            return d; };
        c.prototype.bindList = function(p, o, s, f, P) {
            var d = new M(this, p, o, s, f, P);
            return d; };
        c.prototype.setProperty = function(p, v, o) { q.sap.log.error(this + "not implemented: Only 'OneWay' binding mode supported"); };
        c.prototype.getProperty = function(p, o) {
            return this._getObject(p, o); };
        c.prototype._getObject = function(p, o) {
            var n;
            if (o instanceof a) { n = this._getObject(o.getPath()); } else if (o) { n = o; }
            if (!p) {
                return n; }
            var P = p.split("/"),
                i = 0;
            if (!P[0]) { n = this.oData;
                i++; }
            while (n && P[i]) { n = n[P[i]];
                i++; }
            return n; };
        return c; });
    sap.ui.predefine('sap/ui/model/message/MessagePropertyBinding', ['jquery.sap.global', 'sap/ui/model/ChangeReason', 'sap/ui/model/ClientPropertyBinding'], function(q, C, a) { "use strict";
        var M = a.extend("sap.ui.model.message.MessagePropertyBinding");
        M.prototype.setValue = function(v) {
            if (!q.sap.equal(this.oValue, v)) { this.oModel.setProperty(this.sPath, v, this.oContext); } };
        M.prototype.checkUpdate = function(f) {
            var v = this._getValue();
            if (!q.sap.equal(v, this.oValue) || f) { this.oValue = v;
                this._fireChange({ reason: C.Change }); } };
        return M; });
    jQuery.sap.registerPreloadedModules({
        "name": "sap-ui-core-preload",
        "version": "2.0",
        "modules": {
            "sap/ui/thirdparty/jquery-mobile-custom.js": function() {
                /*
                 * jQuery Mobile v1.3.1
                 * http://jquerymobile.com
                 *
                 * Copyright 2010, 2013 jQuery Foundation, Inc. and other contributors
                 * Released under the MIT license.
                 * http://jquery.org/license
                 *
                 */
                (function(r, d, f) {
                    if (typeof define === "function" && define.amd) { define(["jquery"], function($) { f($, r, d);
                            return $.mobile; }); } else { f(r.jQuery, r, d); } }(this, document, function(Q, d, f, u) {
                    // About: License
                    // Copyright (c) 2010 "Cowboy" Ben Alman,
                    // Dual licensed under the MIT and GPL licenses.
                    // http://benalman.com/about/license/
                    (function($, d, u) {
                        var s = 'hashchange',
                            a = f,
                            b, c = $.event.special,
                            g = a.documentMode,
                            h = 'on' + s in d && (g === u || g > 7);

                        function i(e) { e = e || location.href;
                            return '#' + e.replace(/^[^#]*#?(.*)$/, '$1'); };
                        $.fn[s] = function(e) {
                            return e ? this.bind(s, e) : this.trigger(s); };
                        $.fn[s].delay = 50;
                        c[s] = $.extend(c[s], { setup: function() {
                                if (h) {
                                    return false; }
                                $(b.start); }, teardown: function() {
                                if (h) {
                                    return false; }
                                $(b.stop); } });
                        b = (function() {
                            var j = {},
                                t, l = i(),
                                k = function(v) {
                                    return v; },
                                m = k,
                                n = k;
                            j.start = function() { t || p(); };
                            j.stop = function() { t && clearTimeout(t);
                                t = u; };

                            function p() {
                                var e = i(),
                                    o = n(l);
                                if (e !== l) { m(l = e, o);
                                    $(d).trigger(s); } else if (o !== l) { location.href = location.href.replace(/#.*/, '') + o; }
                                t = setTimeout(p, $.fn[s].delay); };
                            d.attachEvent && !d.addEventListener && !h && (function() {
                                var o, q;
                                j.start = function() {
                                    if (!o) { q = $.fn[s].src;
                                        q = q && q + i();
                                        o = $('<iframe tabindex="-1" title="empty"/>').hide().one('load', function() { q || m(i());
                                            p(); }).attr('src', q || 'javascript:0').insertAfter('body')[0].contentWindow;
                                        a.onpropertychange = function() {
                                            try {
                                                if (event.propertyName === 'title') { o.document.title = a.title; } } catch (e) {} }; } };
                                j.stop = k;
                                n = function() {
                                    return i(o.location.href); };
                                m = function(e, r) {
                                    var v = o.document,
                                        w = $.fn[s].domain;
                                    if (e !== r) { v.title = a.title;
                                        v.open();
                                        w && v.write('<script>document.domain="' + w + '"</script>');
                                        v.close();
                                        o.location.hash = e; } }; })();
                            return j; })(); })(Q, this);
                    (function($) { $.mobile = {};
                        Q.mobile.orientationChangeEnabled = true; }(Q));
                    (function($, d, u) {
                        var n = {};
                        $.mobile = $.extend($.mobile, { version: "1.3.1", ns: "", subPageUrlKey: "ui-page", activePageClass: "ui-page-active", activeBtnClass: "ui-btn-active", focusClass: "ui-focus", ajaxEnabled: true, hashListeningEnabled: true, linkBindingEnabled: true, defaultPageTransition: "fade", maxTransitionWidth: false, minScrollBack: 250, touchOverflowEnabled: false, defaultDialogTransition: "pop", pageLoadErrorMessage: "Error Loading Page", pageLoadErrorMessageTheme: "e", phonegapNavigationEnabled: false, autoInitializePage: true, pushStateEnabled: true, ignoreContentEnabled: false, orientationChangeEnabled: true, buttonMarkup: { hoverDelay: 200 }, window: $(d), document: $(f), keyCode: { ALT: 18, BACKSPACE: 8, CAPS_LOCK: 20, COMMA: 188, COMMAND: 91, COMMAND_LEFT: 91, COMMAND_RIGHT: 93, CONTROL: 17, DELETE: 46, DOWN: 40, END: 35, ENTER: 13, ESCAPE: 27, HOME: 36, INSERT: 45, LEFT: 37, MENU: 93, NUMPAD_ADD: 107, NUMPAD_DECIMAL: 110, NUMPAD_DIVIDE: 111, NUMPAD_ENTER: 108, NUMPAD_MULTIPLY: 106, NUMPAD_SUBTRACT: 109, PAGE_DOWN: 34, PAGE_UP: 33, PERIOD: 190, RIGHT: 39, SHIFT: 16, SPACE: 32, TAB: 9, UP: 38, WINDOWS: 91 }, behaviors: {}, silentScroll: function(y) {
                                if ($.type(y) !== "number") { y = $.mobile.defaultHomeScroll; }
                                $.event.special.scrollstart.enabled = false;
                                setTimeout(function() { d.scrollTo(0, y);
                                    $.mobile.document.trigger("silentscroll", { x: 0, y: y }); }, 20);
                                setTimeout(function() { $.event.special.scrollstart.enabled = true; }, 150); }, nsNormalizeDict: n, nsNormalize: function(p) {
                                if (!p) {
                                    return; }
                                return n[p] || (n[p] = $.camelCase($.mobile.ns + p)); }, getInheritedTheme: function(a, b) {
                                var e = a[0],
                                    l = "",
                                    r = /ui-(bar|body|overlay)-([a-z])\b/,
                                    c, m;
                                while (e) { c = e.className || "";
                                    if (c && (m = r.exec(c)) && (l = m[2])) {
                                        break; }
                                    e = e.parentNode; }
                                return l || b || "a"; }, closestPageData: function(a) {
                                return a.closest(':jqmData(role="page"), :jqmData(role="dialog")').data("mobile-page"); }, enhanceable: function(a) {
                                return this.haveParents(a, "enhance"); }, hijackable: function(a) {
                                return this.haveParents(a, "ajax"); }, haveParents: function(a, b) {
                                if (!$.mobile.ignoreContentEnabled) {
                                    return a; }
                                var g = a.length,
                                    h = $(),
                                    e, k, l;
                                for (var i = 0; i < g; i++) { k = a.eq(i);
                                    l = false;
                                    e = a[i];
                                    while (e) {
                                        var c = e.getAttribute ? e.getAttribute("data-" + $.mobile.ns + b) : "";
                                        if (c === "false") { l = true;
                                            break; }
                                        e = e.parentNode; }
                                    if (!l) { h = h.add(k); } }
                                return h; }, getScreenHeight: function() {
                                return d.innerHeight || $.mobile.window.height(); } }, $.mobile);
                        $.fn.jqmData = function(p, v) {
                            var r;
                            if (typeof p !== "undefined") {
                                if (p) { p = $.mobile.nsNormalize(p); }
                                if (arguments.length < 2 || v === u) { r = this.data(p); } else { r = this.data(p, v); } }
                            return r; };
                        $.jqmData = function(e, p, v) {
                            var r;
                            if (typeof p !== "undefined") { r = $.data(e, p ? $.mobile.nsNormalize(p) : p, v); }
                            return r; };
                        $.fn.jqmRemoveData = function(p) {
                            return this.removeData($.mobile.nsNormalize(p)); };
                        $.jqmRemoveData = function(e, p) {
                            return $.removeData(e, $.mobile.nsNormalize(p)); };
                        $.fn.removeWithDependents = function() { $.removeWithDependents(this); };
                        $.removeWithDependents = function(e) {
                            var a = $(e);
                            (a.jqmData('dependents') || $()).remove();
                            a.remove(); };
                        $.fn.addDependents = function(a) { $.addDependents($(this), a); };
                        $.addDependents = function(e, a) {
                            var b = $(e).jqmData('dependents') || $();
                            $(e).jqmData('dependents', $.merge(b, a)); };
                        $.fn.getEncodedText = function() {
                            return $("<div/>").text($(this).text()).html(); };
                        $.fn.jqmEnhanceable = function() {
                            return $.mobile.enhanceable(this); };
                        $.fn.jqmHijackable = function() {
                            return $.mobile.hijackable(this); };
                        var o = $.find,
                            j = /:jqmData\(([^)]*)\)/g;
                        $.find = function(s, c, r, e) { s = s.replace(j, "[data-" + ($.mobile.ns || "") + "$1]");
                            return o.call(this, s, c, r, e); };
                        $.extend($.find, o); })(Q, this);
                    (function($, u) {
                        /*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas. Dual MIT/BSD license */
                        d.matchMedia = d.matchMedia || (function(a, u) {
                            var b, c = a.documentElement,
                                r = c.firstElementChild || c.firstChild,
                                e = a.createElement("body"),
                                g = a.createElement("div");
                            g.id = "mq-test-1";
                            g.style.cssText = "position:absolute;top:-100em";
                            e.style.background = "none";
                            e.appendChild(g);
                            return function(q) { g.innerHTML = "&shy;<style media=\"" + q + "\"> #mq-test-1 { width: 42px; }</style>";
                                c.insertBefore(e, r);
                                b = g.offsetWidth === 42;
                                c.removeChild(e);
                                return { matches: b, media: q }; }; }(f));
                        $.mobile.media = function(q) {
                            return d.matchMedia(q).matches; };
                    })(Q);
                    (function($, u) {
                        var s = { touch: "ontouchend" in f };
                        if (d.sap && sap.ui && sap.ui.Device && sap.ui.Device.support) { s.touch = sap.ui.Device.support.touch }
                        $.mobile.support = $.mobile.support || {};
                        $.extend($.support, s);
                        $.extend($.mobile.support, s); }(Q));
                    (function($, u) { $.extend($.support, { orientation: "orientation" in d && "onorientationchange" in d }); }(Q));
                    (function($, u) {
                        function p(a) {
                            var i = a.charAt(0).toUpperCase() + a.substr(1),
                                t = (a + " " + e.join(i + " ") + i).split(" ");
                            for (var v in t) {
                                if (c[t[v]] !== u) {
                                    return true; } } }
                        var b = $("<body>").prependTo("html"),
                            c = b[0].style,
                            e = ["Webkit", "Moz", "O"],
                            g = "palmGetResource" in d,
                            o = d.opera,
                            h = d.operamini && ({}).toString.call(d.operamini) === "[object OperaMini]",
                            j = d.blackberry && !p("-webkit-transform");

                        function k(a, v, t) {
                            var w = f.createElement('div'),
                                x = function(C) {
                                    return C.charAt(0).toUpperCase() + C.substr(1); },
                                y = function(C) {
                                    if (C === "") {
                                        return ""; } else {
                                        return "-" + C.charAt(0).toLowerCase() + C.substr(1) + "-"; } },
                                z = function(C) {
                                    var D = y(C) + a + ": " + v + ";",
                                        E = x(C),
                                        F = E + (E === "" ? a : x(a));
                                    w.setAttribute("style", D);
                                    if (!!w.style[F]) { B = true; } },
                                A = t ? t : e,
                                B;
                            for (var i = 0; i < A.length; i++) { z(A[i]); }
                            return !!B; }

                        function l() {
                            var a = "transform-3d",
                                i = $.mobile.media("(-" + e.join("-" + a + "),(-") + "-" + a + "),(" + a + ")");
                            if (i) {
                                return !!i; }
                            var v = f.createElement("div"),
                                w = { 'MozTransform': '-moz-transform', 'transform': 'transform' };
                            b.append(v);
                            for (var t in w) {
                                if (v.style[t] !== u) { v.style[t] = 'translate3d( 100px, 1px, 1px )';
                                    i = d.getComputedStyle(v).getPropertyValue(w[t]); } }
                            return (!!i && i !== "none"); }

                        function m() {
                            var a = location.protocol + "//" + location.host + location.pathname + "ui-dir/",
                                i = $("head base"),
                                t = null,
                                v = "",
                                w, x;
                            if (!i.length) { i = t = $("<base>", { "href": a }).appendTo("head"); } else { v = i.attr("href"); }
                            w = $("<a href='testurl' />").prependTo(b);
                            x = w[0].href;
                            i[0].href = v || location.pathname;
                            if (t) { t.remove(); }
                            return x.indexOf(a) === 0; }

                        function n() {
                            var a = f.createElement('x'),
                                i = f.documentElement,
                                t = d.getComputedStyle,
                                v = t && t(a, ''),
                                w;
                            if (!('pointerEvents' in a.style)) {
                                return false; }
                            a.style.pointerEvents = 'auto';
                            a.style.pointerEvents = 'x';
                            i.appendChild(a);
                            w = v && v.pointerEvents === 'auto';
                            i.removeChild(a);
                            return !!w; }

                        function q() {
                            var a = f.createElement("div");
                            return typeof a.getBoundingClientRect !== "undefined"; }
                        $.extend($.mobile, { browser: {} });
                        $.mobile.browser.oldIE = (function() {
                            var v = 3,
                                i = f.createElement("div"),
                                a = i.all || [];
                            do { i.innerHTML = "<!--[if gt IE " + (++v) + "]><br><![endif]-->"; } while (a[0]);
                            return v > 4 ? v : !v; })();

                        function r() {
                            var w = d,
                                a = navigator.userAgent,
                                i = navigator.platform,
                                t = a.match(/AppleWebKit\/([0-9]+)/),
                                v = !!t && t[1],
                                x = a.match(/Fennec\/([0-9]+)/),
                                y = !!x && x[1],
                                z = a.match(/Opera Mobi\/([0-9]+)/),
                                A = !!z && z[1];
                            if (((i.indexOf("iPhone") > -1 || i.indexOf("iPad") > -1 || i.indexOf("iPod") > -1) && v && v < 534) || (w.operamini && ({}).toString.call(w.operamini) === "[object OperaMini]") || (z && A < 7458) || (a.indexOf("Android") > -1 && v && v < 533) || (y && y < 6) || ("palmGetResource" in d && v && v < 534) || (a.indexOf("MeeGo") > -1 && a.indexOf("NokiaBrowser/8.5.0") > -1)) {
                                return false; }
                            return true; }
                        $.extend($.support, { cssTransitions: "WebKitTransitionEvent" in d || k('transition', 'height 100ms linear', ["Webkit", "Moz", ""]) && !$.mobile.browser.oldIE && !o, pushState: "pushState" in history && "replaceState" in history && !(d.navigator.userAgent.indexOf("Firefox") >= 0 && d.top !== d) && (d.navigator.userAgent.search(/CriOS/) === -1), mediaquery: $.mobile.media("only all"), cssPseudoElement: !!p("content"), touchOverflow: !!p("overflowScrolling"), cssTransform3d: l(), boxShadow: !!p("boxShadow") && !j, fixedPosition: r(), scrollTop: ("pageXOffset" in d || "scrollTop" in f.documentElement || "scrollTop" in b[0]) && !g && !h, dynamicBaseTag: m(), cssPointerEvents: n(), boundingRect: q() });
                        b.remove();
                        var s = (function() {
                            var a = d.navigator.userAgent;
                            return a.indexOf("Nokia") > -1 && (a.indexOf("Symbian/3") > -1 || a.indexOf("Series60/5") > -1) && a.indexOf("AppleWebKit") > -1 && a.match(/(BrowserNG|NokiaBrowser)\/7\.[0-3]/); })();
                        $.mobile.gradeA = function() {
                            return ($.support.mediaquery || $.mobile.browser.oldIE && $.mobile.browser.oldIE >= 7) && ($.support.boundingRect || $.fn.jquery.match(/1\.[0-7+]\.[0-9+]?/) !== null); };
                        $.mobile.ajaxBlacklist = d.blackberry && !d.WebKitPoint || h || s;
                        if (s) { $(function() { $("head link[rel='stylesheet']").attr("rel", "alternate stylesheet").attr("rel", "stylesheet"); }); }
                        if (!$.support.boxShadow) { $("html").addClass("ui-mobile-nosupport-boxshadow"); } })(Q);
                    (function($, u) {
                        var a = $.mobile.window,
                            s, h;
                        $.event.special.navigate = s = { bound: false, pushStateEnabled: true, originalEventName: u, isPushStateEnabled: function() {
                                return $.support.pushState && $.mobile.pushStateEnabled === true && this.isHashChangeEnabled(); }, isHashChangeEnabled: function() {
                                return $.mobile.hashListeningEnabled === true; }, popstate: function(e) {
                                var n = new $.Event("navigate"),
                                    b = new $.Event("beforenavigate"),
                                    c = e.originalEvent.state || {},
                                    g = location.href;
                                a.trigger(b);
                                if (b.isDefaultPrevented()) {
                                    return; }
                                if (e.historyState) { $.extend(c, e.historyState); }
                                n.originalEvent = e;
                                setTimeout(function() { a.trigger(n, { state: c }); }, 0); }, hashchange: function(e, b) {
                                var n = new $.Event("navigate"),
                                    c = new $.Event("beforenavigate");
                                a.trigger(c);
                                if (c.isDefaultPrevented()) {
                                    return; }
                                n.originalEvent = e;
                                a.trigger(n, { state: e.hashchangeState || {} }); }, setup: function(b, n) {
                                if (s.bound) {
                                    return; }
                                s.bound = true;
                                if (s.isPushStateEnabled()) { s.originalEventName = "popstate";
                                    a.bind("popstate.navigate", s.popstate); } else if (s.isHashChangeEnabled()) { s.originalEventName = "hashchange";
                                    a.bind("hashchange.navigate", s.hashchange); } } }; })(Q);
                    (function($) { $.event.special.throttledresize = { setup: function() { $(this).bind("resize", h); }, teardown: function() { $(this).unbind("resize", h); } };
                        var t = 250,
                            h = function() { c = (new Date()).getTime();
                                b = c - l;
                                if (b >= t) { l = c;
                                    $(this).trigger("throttledresize"); } else {
                                    if (a) { clearTimeout(a); }
                                    a = setTimeout(h, t - b); } },
                            l = 0,
                            a, c, b; })(Q);
                    (function($, d) {
                        var w = $(d),
                            e = "orientationchange",
                            s, g, l, i, a, p = { "0": true, "180": true };
                        if ($.support.orientation) {
                            var b = d.innerWidth || w.width(),
                                c = d.innerHeight || w.height(),
                                h = 50;
                            i = b > c && (b - c) > h;
                            a = p[d.orientation];
                            if ((i && a) || (!i && !a)) { p = { "-90": true, "90": true }; } }
                        $.event.special.orientationchange = $.extend({}, $.event.special.orientationchange, { setup: function() {
                                if ($.support.orientation && !$.event.special.orientationchange.disabled) {
                                    return false; }
                                l = g();
                                w.bind("throttledresize", j); }, teardown: function() {
                                if ($.support.orientation && !$.event.special.orientationchange.disabled) {
                                    return false; }
                                w.unbind("throttledresize", j); }, add: function(k) {
                                var o = k.handler;
                                k.handler = function(m) { m.orientation = g();
                                    return o.apply(this, arguments); }; } });

                        function j() {
                            var o = g();
                            if (o !== l) { l = o;
                                w.trigger(e); } }
                        $.event.special.orientationchange.orientation = g = function() {
                            var k = true,
                                m = f.documentElement;
                            if ($.support.orientation) { k = p[d.orientation]; } else { k = m && m.clientWidth / m.clientHeight < 1.1; }
                            return k ? "portrait" : "landscape"; };
                        $.fn[e] = function(k) {
                            return k ? this.bind(e, k) : this.trigger(e); };
                        if ($.attrFn) { $.attrFn[e] = true; } }(Q, this));
                    (function($, d, f, u) {
                        var a = "virtualMouseBindings",
                            c = "virtualTouchID",
                            v = "vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split(" "),
                            g = "clientX clientY pageX pageY screenX screenY".split(" "),
                            m = $.event.mouseHooks ? $.event.mouseHooks.props : [],
                            h = $.event.props.concat(m),
                            l = {},
                            r = 0,
                            s = 0,
                            n = 0,
                            p = false,
                            q = [],
                            w = false,
                            z = false,
                            A = "addEventListener" in f,
                            B = $(f),
                            C = 1,
                            D = 0,
                            E;
                        $.vmouse = { moveDistanceThreshold: 10, clickDistanceThreshold: 10, resetTimerDuration: 1500 };

                        function F(e) {
                            while (e && typeof e.originalEvent !== "undefined") { e = e.originalEvent; }
                            return e; }

                        function G(e, b) {
                            var t = e.type,
                                o, k, x, y, _, a1, i, j, b1;
                            e = $.Event(e);
                            e.type = b;
                            o = e.originalEvent;
                            k = $.event.props;
                            if (t.search(/^(mouse|click)/) > -1) { k = h; }
                            if (o) {
                                for (i = k.length, y; i;) { y = k[--i];
                                    e[y] = o[y]; } }
                            if (t.search(/mouse(down|up)|click/) > -1 && !e.which) { e.which = 1; }
                            if (t.search(/^touch/) !== -1) { x = F(o);
                                t = x.touches;
                                _ = x.changedTouches;
                                a1 = (t && t.length) ? t[0] : ((_ && _.length) ? _[0] : u);
                                if (a1) {
                                    for (j = 0, b1 = g.length; j < b1; j++) { y = g[j];
                                        e[y] = a1[y]; } } }
                            return e; }

                        function H(e) {
                            var j = {},
                                b, k;
                            while (e) { b = $.data(e, a);
                                for (k in b) {
                                    if (b[k]) { j[k] = j.hasVirtualBinding = true; } }
                                e = e.parentNode; }
                            return j; }

                        function I(e, j) {
                            var b;
                            while (e) { b = $.data(e, a);
                                if (b && (!j || b[j])) {
                                    return e; }
                                e = e.parentNode; }
                            return null; }

                        function J() { z = false; }

                        function K() { z = true; }

                        function L() { D = 0;
                            q.length = 0;
                            w = false;
                            K(); }

                        function M() { J(); }

                        function N() { O();
                            r = setTimeout(function() { r = 0;
                                L(); }, $.vmouse.resetTimerDuration); }

                        function O() {
                            if (r) { clearTimeout(r);
                                r = 0; } }

                        function P(e, b, j) {
                            var k;
                            if ((j && j[e]) || (!j && I(b.target, e))) { k = G(b, e);
                                $(b.target).trigger(k); }
                            return k; }

                        function R(e) {
                            var t = $.data(e.target, c);
                            if (!w && (!D || D !== t)) {
                                var b = P("v" + e.type, e);
                                if (b) {
                                    if (b.isDefaultPrevented()) { e.preventDefault(); }
                                    if (b.isPropagationStopped()) { e.stopPropagation(); }
                                    if (b.isImmediatePropagationStopped()) { e.stopImmediatePropagation(); } } } }

                        function S(e) {
                            var b = F(e).touches,
                                j, k;
                            if (b && b.length === 1) { j = e.target;
                                k = H(j);
                                if (k.hasVirtualBinding) { D = C++;
                                    $.data(j, c, D);
                                    O();
                                    M();
                                    p = false;
                                    var t = F(e).touches[0];
                                    s = t.pageX;
                                    n = t.pageY;
                                    P("vmouseover", e, k);
                                    P("vmousedown", e, k); } } }

                        function T(e) {
                            if (z) {
                                return; }
                            if (!p) { P("vmousecancel", e, H(e.target)); }
                            p = true;
                            N(); }

                        function U(e) {
                            if (z) {
                                return; }
                            var t = F(e).touches[0],
                                b = p,
                                j = $.vmouse.moveDistanceThreshold,
                                k = H(e.target);
                            p = p || (Math.abs(t.pageX - s) > j || Math.abs(t.pageY - n) > j);
                            if (p && !b) { P("vmousecancel", e, k); }
                            P("vmousemove", e, k);
                            N(); }

                        function V(e) {
                            if (z) {
                                return; }
                            K();
                            var b = H(e.target),
                                t;
                            P("vmouseup", e, b);
                            if (!p) { P("vclick", e, b);
                                if ($.support.touch) { t = F(e).changedTouches[0];
                                    q.push({ touchID: D, x: t.clientX, y: t.clientY + d.scrollY, target: e.target });
                                    w = true; } }
                            P("vmouseout", e, b);
                            p = false;
                            N(); }

                        function W(e) {
                            var b = $.data(e, a),
                                k;
                            if (b) {
                                for (k in b) {
                                    if (b[k]) {
                                        return true; } } }
                            return false; }

                        function X() {}

                        function Y(e) {
                            var b = e.substr(1);
                            return { setup: function(j, k) {
                                    if (!W(this)) { $.data(this, a, {}); }
                                    var o = $.data(this, a);
                                    o[e] = true;
                                    l[e] = (l[e] || 0) + 1;
                                    if (l[e] === 1) { B.bind(b, R); }
                                    $(this).bind(b, X);
                                    if (A) { l["touchstart"] = (l["touchstart"] || 0) + 1;
                                        if (l["touchstart"] === 1) { B.bind("touchstart", S).bind("touchend", V).bind("touchmove", U); } } }, teardown: function(j, k) {--l[e];
                                    if (!l[e]) { B.unbind(b, R); }
                                    if (A) {--l["touchstart"];
                                        if (!l["touchstart"]) { B.unbind("touchstart", S).unbind("touchmove", U).unbind("touchend", V).unbind("scroll", T); } }
                                    var o = $(this),
                                        t = $.data(this, a);
                                    if (t) { t[e] = false; }
                                    o.unbind(b, X);
                                    if (!W(this)) { o.removeData(a); } } }; }
                        for (var i = 0; i < v.length; i++) { $.event.special[v[i]] = Y(v[i]); }
                        if (A) {
                            function Z(e) {
                                var b = q.length,
                                    t = e.target,
                                    x, y, j, i, o, k;
                                if (b) { x = e.clientX;
                                    y = e.clientY + d.scrollY;
                                    E = $.vmouse.clickDistanceThreshold;
                                    j = t;
                                    while (j) {
                                        for (i = 0; i < b; i++) { o = q[i];
                                            k = 0;
                                            if ((j === t && Math.abs(o.x - x) < E && Math.abs(o.y - y) < E) || $.data(j, c) === o.touchID) {
                                                if (!e.isSynthetic) { e._sapui_delayedMouseEvent = true; }
                                                if (t === o.target) {
                                                    return; }
                                                e.preventDefault();
                                                e.stopPropagation();
                                                return; } }
                                        j = j.parentNode; } } };
                            if (!(sap.ui.Device.os.windows_phone && sap.ui.Device.os.version < 10)) { f.addEventListener("mousedown", Z, true);
                                f.addEventListener("mouseup", Z, true);
                                f.addEventListener("click", Z, true); } } })(Q, d, f);
                    (function($, d, u) {
                        var a = $(f);
                        $.each(("touchstart touchmove touchend " + "tap taphold " + "swipe swipeleft swiperight " + "scrollstart scrollstop").split(" "), function(i, n) { $.fn[n] = function(h) {
                                return h ? this.bind(n, h) : this.trigger(n); };
                            if ($.attrFn) { $.attrFn[n] = true; } });
                        var s = $.mobile.support.touch,
                            b = "touchmove scroll",
                            t = s ? "touchstart" : "mousedown",
                            c = s ? "touchend touchcancel" : "mouseup",
                            e = s ? "touchmove" : "mousemove";

                        function g(o, h, i) {
                            var j = i.type;
                            i.type = h;
                            $.event.dispatch.call(o, i);
                            i.type = j; }
                        $.event.special.scrollstart = { enabled: true, setup: function() {
                                var h = this,
                                    i = $(h),
                                    j, k;

                                function l(m, n) { j = n;
                                    g(h, j ? "scrollstart" : "scrollstop", m); }
                                i.bind(b, function(m) {
                                    if (!$.event.special.scrollstart.enabled) {
                                        return; }
                                    if (!j) { l(m, true); }
                                    clearTimeout(k);
                                    k = setTimeout(function() { l(m, false); }, 50); }); } };
                        $.event.special.tap = { tapholdThreshold: 750, setup: function() {
                                var h = this,
                                    i = $(h);
                                i.bind("vmousedown", function(j) {
                                    if (j.which && j.which !== 1) {
                                        return; }
                                    var o = j.target,
                                        k = j.originalEvent,
                                        l;

                                    function m() { clearTimeout(l); }

                                    function n() { m();
                                        i.unbind("vclick", p).unbind("vmouseup", m);
                                        a.unbind("vmousecancel", n); }

                                    function p(j) { n();
                                        if (o === j.target) { g(h, "tap", j); } }
                                    i.bind("vmouseup", m).bind("vclick", p);
                                    a.bind("vmousecancel", n);
                                    l = setTimeout(function() { g(h, "taphold", $.Event("taphold", { target: o })); }, $.event.special.tap.tapholdThreshold); }); } };
                        $.event.special.swipe = { scrollSupressionThreshold: 30, durationThreshold: 1000, horizontalDistanceThreshold: 30, verticalDistanceThreshold: 75, start: function(h) {
                                var i = h.originalEvent && h.originalEvent.touches ? h.originalEvent.touches[0] : h;
                                return { time: (new Date()).getTime(), coords: [i.pageX, i.pageY], origin: $(h.target) }; }, stop: function(h) {
                                var i = h.originalEvent && h.originalEvent.touches ? h.originalEvent.touches[0] : h;
                                return { time: (new Date()).getTime(), coords: [i.pageX, i.pageY] }; }, handleSwipe: function(h, i) {
                                if (i.time - h.time < $.event.special.swipe.durationThreshold && Math.abs(h.coords[0] - i.coords[0]) > $.event.special.swipe.horizontalDistanceThreshold && Math.abs(h.coords[1] - i.coords[1]) < $.event.special.swipe.verticalDistanceThreshold) { h.origin.trigger("swipe").trigger(h.coords[0] > i.coords[0] ? "swipeleft" : "swiperight"); } }, setup: function() {
                                var h = this,
                                    i = $(h);
                                i.bind(t, function(j) {
                                    if (j.isMarked("swipestartHandled")) {
                                        return; }
                                    j.setMarked("swipestartHandled");
                                    var k = $.event.special.swipe.start(j),
                                        l;

                                    function m(j) {
                                        if (!k) {
                                            return; }
                                        l = $.event.special.swipe.stop(j);
                                        if (!sap.ui.Device.system.desktop || sap.ui.Device.browser.name !== "cr") {
                                            if (!sap.ui.Device.os.blackberry && Math.abs(k.coords[0] - l.coords[0]) > $.event.special.swipe.scrollSupressionThreshold) { j.preventDefault(); } } }

                                    function n(j) { i.unbind(e, m).unbind(c, n);
                                        if (k && l) { $.event.special.swipe.handleSwipe(k, l); }
                                        k = l = u; }
                                    i.bind(e, m).bind(c, n); }); } };
                        $.each({ scrollstop: "scrollstart", taphold: "tap", swipeleft: "swipe", swiperight: "swipe" }, function(h, i) { $.event.special[h] = { setup: function() { $(this).bind(i, $.noop); } }; }); })(Q, this);
                }));
            }
        }
    });
    jQuery.sap.require("sap.ui.core.Core");
    sap.ui.getCore().boot && sap.ui.getCore().boot();
} catch (oError) {
    if (oError.name != "Restart") {
        throw oError; }
}
