/*!
 * vanilla-picker v2.5.2
 * https://vanilla-picker.js.org
 *
 * Copyright 2017-2018 Andreas Borgen (https://github.com/Sphinxxxx), Adam Brooks (https://github.com/dissimulate)
 * Released under the ISC license.
 */
! function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.Picker = e()
}(this, function () {
    "use strict";
    var n = function (t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        },
        t = function () {
            function i(t, e) {
                for (var r = 0; r < e.length; r++) {
                    var i = e[r];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                }
            }
            return function (t, e, r) {
                return e && i(t.prototype, e), r && i(t, r), t
            }
        }(),
        g = function (t, e) {
            if (Array.isArray(t)) return t;
            if (Symbol.iterator in Object(t)) return function (t, e) {
                var r = [],
                    i = !0,
                    o = !1,
                    n = void 0;
                try {
                    for (var a, s = t[Symbol.iterator](); !(i = (a = s.next()).done) && (r.push(a.value), !e || r.length !== e); i = !0);
                } catch (t) {
                    o = !0, n = t
                } finally {
                    try {
                        !i && s.return && s.return()
                    } finally {
                        if (o) throw n
                    }
                }
                return r
            }(t, e);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        };
    String.prototype.startsWith = String.prototype.startsWith || function (t) {
        return 0 === this.indexOf(t)
    }, String.prototype.padStart = String.prototype.padStart || function (t, e) {
        for (var r = this; r.length < t;) r = e + r;
        return r
    };
    var r = void 0,
        o = function () {
            function f(t, e, r, i) {
                n(this, f);
                var d = this;
                if (void 0 === t);
                else if (Array.isArray(t)) this.rgba = t;
                else if (void 0 === r) {
                    var o = t && ("" + t).trim();
                    o && function (t) {
                        if (t.startsWith("hsl")) {
                            var e = t.match(/([\-\d\.e]+)/g).map(Number),
                                r = g(e, 4),
                                i = r[0],
                                o = r[1],
                                n = r[2],
                                a = r[3];
                            void 0 === a && (a = 1), i /= 360, o /= 100, n /= 100, d.hsla = [i, o, n, a]
                        } else if (t.startsWith("rgb")) {
                            var s = t.match(/([\-\d\.e]+)/g).map(Number),
                                l = g(s, 4),
                                p = l[0],
                                u = l[1],
                                c = l[2],
                                h = l[3];
                            void 0 === h && (h = 1), d.rgba = [p, u, c, h]
                        } else t.startsWith("#") ? d.rgba = f.hexToRgb(t) : d.rgba = f.nameToRgb(t) || f.hexToRgb(t)
                    }(o.toLowerCase())
                } else this.rgba = [t, e, r, void 0 === i ? 1 : i]
            }
            return t(f, [{
                key: "rgba",
                get: function () {
                    if (this._rgba) return this._rgba;
                    if (!this._hsla) throw new Error("No color is set");
                    return this._rgba = f.hslToRgb(this._hsla)
                },
                set: function (t) {
                    3 === t.length && (t[3] = 1), this._rgba = t, this._hsla = null
                }
            }, {
                key: "rgbString",
                get: function () {
                    return "rgb(" + this.rgba.slice(0, 3) + ")"
                }
            }, {
                key: "rgbaString",
                get: function () {
                    return "rgba(" + this.rgba + ")"
                }
            }, {
                key: "hsla",
                get: function () {
                    if (this._hsla) return this._hsla;
                    if (!this._rgba) throw new Error("No color is set");
                    return this._hsla = f.rgbToHsl(this._rgba)
                },
                set: function (t) {
                    3 === t.length && (t[3] = 1), this._hsla = t, this._rgba = null
                }
            }, {
                key: "hslString",
                get: function () {
                    var t = this.hsla;
                    return "hsl(" + 360 * t[0] + "," + 100 * t[1] + "%," + 100 * t[2] + "%)"
                }
            }, {
                key: "hslaString",
                get: function () {
                    var t = this.hsla;
                    return "hsla(" + 360 * t[0] + "," + 100 * t[1] + "%," + 100 * t[2] + "%," + t[3] + ")"
                }
            }, {
                key: "hex",
                get: function () {
                    return "#" + this.rgba.map(function (t, e) {
                        return e < 3 ? t.toString(16) : Math.round(255 * t).toString(16)
                    }).map(function (t) {
                        return t.padStart(2, "0")
                    }).join("")
                },
                set: function (t) {
                    this.rgba = f.hexToRgb(t)
                }
            }], [{
                key: "hexToRgb",
                value: function (t) {
                    var e = (t.startsWith("#") ? t.slice(1) : t).replace(/^(\w{3})$/, "$1F").replace(/^(\w)(\w)(\w)(\w)$/, "$1$1$2$2$3$3$4$4").replace(/^(\w{6})$/, "$1FF");
                    if (!e.match(/^([0-9a-fA-F]{8})$/)) throw new Error("Unknown hex color; " + t);
                    var r = e.match(/^(\w\w)(\w\w)(\w\w)(\w\w)$/).slice(1).map(function (t) {
                        return parseInt(t, 16)
                    });
                    return r[3] = r[3] / 255, r
                }
            }, {
                key: "nameToRgb",
                value: function (t) {
                    r || (r = {}, "735AACA770//Xub218Pj/mo5+uvX6mdAP//gtpf//Ur258P//q1d9fXcxop/+TEq9zAAAAqfg/+vN6m1AAD/ngoiiviqt6pSoqzyo3riHxvdX56grk1f/8Aax10mkeqts/39QxbtZJXttkb//jcyxm3BQ86rmAP//wl5AACLwqqAIuL3y8uIYLwv1qampniqAGQAns5vbdrmohiwCLw5uVWsvsdd/4wAsegmTLMqagiwAAsqi6ZZ6uz6j7yPxtzSD2Lxk3L09PudbAM7RwsolADT0kz/xSTfuhAL//vfhaWlpyuxHpD/43rsiIiwn9//rw39uIosi9bp/wD/6w73Nzc9s5+Pj/6v8/9cA3b42qUg6vxgICArmaAIAAtdfrf8vf9n8P/wek3/2m0xnczVxc3bvSwCCsdt///wrvp8OaMs5i5ub6iyk//D1e8ifPwAoui//rNpyxrdjmw9c8ICAq4i4P//mx9+vrSq8t09PTx1ukO6Qqlv/7bBuuy/6B690uILKqpfdh876sd9d4iZnehsMTe0dv///g71lAP8A4nmMs0ys9u+vDmg9d/wD/4pmgAAAcurZs2qzllAADN4lkulXT6txk3Db66qPLNxozre2juokuAPqalj3SNHMgdkxxWF60pGRlwxfl9f/6hr5/+Thx6q/+S1m85/96tutd/fXmszxgIAAe4ma44j8rl/6UAmu0/0UA8so2nDWji87uiqumqmPuY9xbr+7u4rs23CTsb8/+/V95a/9q577xzYU/78z/8DL7b53aDdsu1sODmb11gACAy5nZjOZ1so/wAAlvevI+Pn09QWnhm7ui0UT94q+oBy7ei9KRg5aqLotXad5oFItasmwMDAaihh87r9fdalrN9p9cICQ7gz//r6k5uAP9/4qhRoK01te0rSM7cwAICA91x2L/Yclr/2NHcw1QODQd6w7oLuua09d6zudh////t359fX1enn//8Ao0ims0y".match(/.{7}/g).forEach(function (t) {
                        return r[t.slice(0, 3)] = atob(t.slice(-4)).split("").map(function (t) {
                            return t.charCodeAt(0)
                        })
                    }));
                    var e = [].reduce.call(t.replace("ey", "ay"), function (t, e) {
                        return (t << 2) + e.charCodeAt(0)
                    }, 0).toString(36).slice(-3);
                    return r[e]
                }
            }, {
                key: "rgbToHsl",
                value: function (t) {
                    var e = g(t, 4),
                        r = e[0],
                        i = e[1],
                        o = e[2],
                        n = e[3];
                    r /= 255, i /= 255, o /= 255;
                    var a = Math.max(r, i, o),
                        s = Math.min(r, i, o),
                        l = void 0,
                        p = void 0,
                        u = (a + s) / 2;
                    if (a === s) l = p = 0;
                    else {
                        var c = a - s;
                        switch (p = .5 < u ? c / (2 - a - s) : c / (a + s), a) {
                            case r:
                                l = (i - o) / c + (i < o ? 6 : 0);
                                break;
                            case i:
                                l = (o - r) / c + 2;
                                break;
                            case o:
                                l = (r - i) / c + 4
                        }
                        l /= 6
                    }
                    return [l, p, u, n]
                }
            }, {
                key: "hslToRgb",
                value: function (t) {
                    var e = g(t, 4),
                        r = e[0],
                        i = e[1],
                        o = e[2],
                        n = e[3],
                        a = void 0,
                        s = void 0,
                        l = void 0;
                    if (0 === i) a = s = l = o;
                    else {
                        var p = function (t, e, r) {
                                return r < 0 && (r += 1), 1 < r && (r -= 1), r < 1 / 6 ? t + 6 * (e - t) * r : r < .5 ? e : r < 2 / 3 ? t + (e - t) * (2 / 3 - r) * 6 : t
                            },
                            u = o < .5 ? o * (1 + i) : o + i - o * i,
                            c = 2 * o - u;
                        a = p(c, u, r + 1 / 3), s = p(c, u, r), l = p(c, u, r - 1 / 3)
                    }
                    var h = [255 * a, 255 * s, 255 * l].map(Math.round);
                    return h[3] = n, h
                }
            }]), f
        }(),
        A = window;

    function s(t) {
        var e = Element.prototype;
        e.matches || (e.matches = e.msMatchesSelector || e.webkitMatchesSelector), e.closest || (e.closest = function (t) {
            var e = this;
            do {
                if (e.matches(t)) return e;
                e = "svg" === e.tagName ? e.parentNode : e.parentElement
            } while (e);
            return null
        });
        var l = (t = t || {}).container || document.documentElement,
            o = t.selector,
            i = t.callback || console.log,
            n = t.callbackDragStart,
            a = t.callbackDragEnd,
            s = t.callbackClick,
            r = t.propagateEvents,
            p = !1 !== t.roundCoords,
            u = !1 !== t.dragOutside,
            c = t.handleOffset || !1 !== t.handleOffset,
            h = null;
        switch (c) {
            case "center":
                h = !0;
                break;
            case "topleft":
            case "top-left":
                h = !1
        }
        var d = void 0;

        function f(t, e, r, i) {
            var o = t.clientX,
                n = t.clientY;

            function a(t, e, r) {
                return Math.max(e, Math.min(t, r))
            }
            if (e) {
                var s = e.getBoundingClientRect();
                if (o -= s.left, n -= s.top, r && (o -= r[0], n -= r[1]), i && (o = a(o, 0, s.width), n = a(n, 0, s.height)), e !== l)(null !== h ? h : "circle" === e.nodeName || "ellipse" === e.nodeName) && (o -= s.width / 2, n -= s.height / 2)
            }
            return p ? [Math.round(o), Math.round(n)] : [o, n]
        }

        function g(t) {
            t.preventDefault(), r || t.stopPropagation()
        }

        function m(t) {
            var e = void 0;
            if (e = o ? o instanceof Element ? o.contains(t.target) ? o : null : t.target.closest(o) : {}) {
                g(t);
                var r = o && c ? f(t, e) : [0, 0],
                    i = f(t, l, r);
                d = {
                    target: e,
                    mouseOffset: r,
                    startPos: i,
                    actuallyDragged: !1
                }, n && n(e, i)
            }
        }

        function _(t) {
            if (d) {
                g(t);
                var e = d.startPos,
                    r = f(t, l, d.mouseOffset, !u);
                d.actuallyDragged = d.actuallyDragged || e[0] !== r[0] || e[1] !== r[1], i(d.target, r, e)
            }
        }

        function v(t, e) {
            if (d) {
                if (a || s) {
                    var r = !d.actuallyDragged,
                        i = r ? d.startPos : f(t, l, d.mouseOffset, !u);
                    s && r && !e && s(d.target, i), a && a(d.target, i, d.startPos, e || r && s)
                }
                d = null
            }
        }

        function k(t, e) {
            v(x(t), e)
        }

        function b(t, e, r) {
            t.addEventListener(e, r)
        }

        function w(t) {
            return void 0 !== t.buttons ? 1 === t.buttons : 1 === t.which
        }

        function y(t, e) {
            1 === t.touches.length ? e(x(t)) : v(t, !0)
        }

        function x(t) {
            var e = t.targetTouches[0];
            return e || (e = t.changedTouches[0]), e.preventDefault = t.preventDefault.bind(t), e.stopPropagation = t.stopPropagation.bind(t), e
        }
        b(l, "mousedown", function (t) {
            w(t) ? m(t) : v(t, !0)
        }), b(l, "touchstart", function (t) {
            return y(t, m)
        }), b(A, "mousemove", function (t) {
            d && (w(t) ? _(t) : v(t))
        }), b(A, "touchmove", function (t) {
            return y(t, _)
        }), b(l, "mouseup", function (t) {
            d && !w(t) && v(t)
        }), b(l, "touchend", function (t) {
            return k(t)
        }), b(l, "touchcancel", function (t) {
            return k(t, !0)
        })
    }
    var a = "keydown",
        l = "mousedown",
        p = "focusin";

    function v(t, e) {
        return (e || document).querySelector(t)
    }

    function u(t, e, r) {
        t.addEventListener(e, r, !1)
    }

    function c(t) {
        t.preventDefault(), t.stopPropagation()
    }

    function h(t, e, r, i) {
        u(t, a, function (t) {
            0 <= e.indexOf(t.key) && (i && c(t), r(t))
        })
    }
    return document.documentElement.firstElementChild.appendChild(document.createElement("style")).textContent = ".picker_wrapper.no_alpha .picker_alpha{display:none}.picker_wrapper.no_editor .picker_editor{position:absolute;z-index:-1;opacity:0}.layout_default.picker_wrapper{display:flex;flex-flow:row wrap;justify-content:space-between;align-items:stretch;font-size:10px;width:25em;padding:.5em}.layout_default.picker_wrapper input,.layout_default.picker_wrapper button{font-size:1rem}.layout_default.picker_wrapper>*{margin:.5em}.layout_default.picker_wrapper::before{content:'';display:block;width:100%;height:0;order:1}.layout_default .picker_slider,.layout_default .picker_selector{padding:1em}.layout_default .picker_hue{width:100%}.layout_default .picker_sl{flex:1 1 auto}.layout_default .picker_sl::before{content:'';display:block;padding-bottom:100%}.layout_default .picker_editor{order:1;width:6rem}.layout_default .picker_editor input{width:calc(100% + 2px);height:calc(100% + 2px)}.layout_default .picker_sample{order:1;flex:1 1 auto}.layout_default .picker_done{order:1}.picker_wrapper{box-sizing:border-box;background:#f2f2f2;box-shadow:0 0 0 1px silver;cursor:default;font-family:sans-serif;color:#444;pointer-events:auto}.picker_wrapper:focus{outline:none}.picker_wrapper button,.picker_wrapper input{margin:-1px}.picker_selector{position:absolute;z-index:1;display:block;transform:translate(-50%, -50%);border:2px solid white;border-radius:100%;box-shadow:0 0 3px 1px #67b9ff;background:currentColor;cursor:pointer}.picker_slider .picker_selector{border-radius:2px}.picker_hue{position:relative;background-image:linear-gradient(90deg, red, yellow, lime, cyan, blue, magenta, red);box-shadow:0 0 0 1px silver}.picker_sl{position:relative;box-shadow:0 0 0 1px silver;background-image:linear-gradient(180deg, white, rgba(255,255,255,0) 50%),linear-gradient(0deg, black, rgba(0,0,0,0) 50%),linear-gradient(90deg, gray, rgba(128,128,128,0))}.picker_alpha,.picker_sample{position:relative;background:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='2' height='2'%3E%3Cpath d='M1,0H0V1H2V2H1' fill='lightgrey'/%3E%3C/svg%3E\") left top/contain white;box-shadow:0 0 0 1px silver}.picker_alpha .picker_selector,.picker_sample .picker_selector{background:none}.picker_editor input{box-sizing:border-box;font-family:monospace;padding:.1em .2em}.picker_sample::before{content:'';position:absolute;display:block;width:100%;height:100%;background:currentColor}.picker_done button{box-sizing:border-box;padding:.2em .5em;cursor:pointer}.picker_arrow{position:absolute;z-index:-1}.picker_wrapper.popup{position:absolute;z-index:2;margin:1.5em}.picker_wrapper.popup,.picker_wrapper.popup .picker_arrow::before,.picker_wrapper.popup .picker_arrow::after{background:#f2f2f2;box-shadow:0 0 10px 1px rgba(0,0,0,0.4)}.picker_wrapper.popup .picker_arrow{width:3em;height:3em;margin:0}.picker_wrapper.popup .picker_arrow::before,.picker_wrapper.popup .picker_arrow::after{content:\"\";display:block;position:absolute;top:0;left:0;z-index:-99}.picker_wrapper.popup .picker_arrow::before{width:100%;height:100%;transform:skew(45deg);transform-origin:0 100%}.picker_wrapper.popup .picker_arrow::after{width:150%;height:150%;box-shadow:none}.popup.popup_top{bottom:100%;left:0}.popup.popup_top .picker_arrow{bottom:0;left:0;transform:rotate(-90deg)}.popup.popup_bottom{top:100%;left:0}.popup.popup_bottom .picker_arrow{top:0;left:0;transform:rotate(90deg) scale(1, -1)}.popup.popup_left{top:0;right:100%}.popup.popup_left .picker_arrow{top:0;right:0;transform:scale(-1, 1)}.popup.popup_right{top:0;left:100%}.popup.popup_right .picker_arrow{top:0;left:0}",
        function () {
            function r(t) {
                var e = this;
                n(this, r), this.settings = {
                    popup: "right",
                    layout: "default",
                    alpha: !0,
                    editor: !0
                }, this._openProxy = function (t) {
                    return e.openHandler(t)
                }, this.onChange = null, this.onDone = null, this.onOpen = null, this.onClose = null, this.setOptions(t)
            }
            return t(r, [{
                key: "setOptions",
                value: function (t) {
                    if (t) {
                        var e = this.settings;
                        if (t instanceof HTMLElement) e.parent = t;
                        else {
                            e.parent && t.parent && e.parent !== t.parent && (e.parent.removeEventListener("click", this._openProxy, !1), this._popupInited = !1),
                                function (t, e, r) {
                                    for (var i in t) r && 0 <= r.indexOf(i) || (e[i] = t[i])
                                }(t, e), t.onChange && (this.onChange = t.onChange), t.onDone && (this.onDone = t.onDone), t.onOpen && (this.onOpen = t.onOpen), t.onClose && (this.onClose = t.onClose);
                            var r = t.color || t.colour;
                            r && this._setColor(r)
                        }
                        var i = e.parent;
                        i && e.popup && !this._popupInited ? (u(i, "click", this._openProxy), h(i, [" ", "Spacebar", "Enter"], this._openProxy), this._popupInited = !0) : t.parent && !e.popup && this.show()
                    }
                }
            }, {
                key: "openHandler",
                value: function (t) {
                    if (this.show()) {
                        t && t.preventDefault(), this.settings.parent.style.pointerEvents = "none";
                        var e = t && t.type === a ? this._domEdit : this.domElement;
                        setTimeout(function () {
                            return e.focus()
                        }, 100), this.onOpen && this.onOpen(this.colour)
                    }
                }
            }, {
                key: "closeHandler",
                value: function (t) {
                    var e = t && t.type,
                        r = !1;
                    t ? e === l || e === p ? this.domElement.contains(t.target) || (r = !0) : (c(t), r = !0) : r = !0, r && this.hide() && (this.settings.parent.style.pointerEvents = "", e !== l && this.settings.parent.focus(), this.onClose && this.onClose(this.colour))
                }
            }, {
                key: "movePopup",
                value: function (t, e) {
                    this.closeHandler(), this.setOptions(t), e && this.openHandler()
                }
            }, {
                key: "setColor",
                value: function (t, e) {
                    this._setColor(t, {
                        silent: e
                    })
                }
            }, {
                key: "_setColor",
                value: function (t, e) {
                    if ("string" == typeof t && (t = t.trim()), t) {
                        e = e || {};
                        var r = void 0;
                        try {
                            r = new o(t)
                        } catch (t) {
                            if (e.failSilently) return;
                            throw t
                        }
                        if (!this.settings.alpha) {
                            var i = r.hsla;
                            i[3] = 1, r.hsla = i
                        }
                        this.colour = this.color = r, this._setHSLA(null, null, null, null, e)
                    }
                }
            }, {
                key: "setColour",
                value: function (t, e) {
                    this.setColor(t, e)
                }
            }, {
                key: "show",
                value: function () {
                    if (!this.settings.parent) return !1;
                    if (this.domElement) {
                        var t = this._toggleDOM(!0);
                        return this._setPosition(), t
                    }
                    var e, r, i = this.settings.template || '<div class="picker_wrapper" tabindex="-1"><div class="picker_arrow"></div><div class="picker_hue picker_slider"><div class="picker_selector"></div></div><div class="picker_sl"><div class="picker_selector"></div></div><div class="picker_alpha picker_slider"><div class="picker_selector"></div></div><div class="picker_editor"><input aria-label="Type a color name or hex value"/></div><div class="picker_sample"></div><div class="picker_done"><button>Ok</button></div></div>',
                        o = (e = i, (r = document.createElement("div")).innerHTML = e, r.firstElementChild);
                    return this.domElement = o, this._domH = v(".picker_hue", o), this._domSL = v(".picker_sl", o), this._domA = v(".picker_alpha", o), this._domEdit = v(".picker_editor input", o), this._domSample = v(".picker_sample", o), this._domOkay = v(".picker_done button", o), o.classList.add("layout_" + this.settings.layout), this.settings.alpha || o.classList.add("no_alpha"), this.settings.editor || o.classList.add("no_editor"), this._ifPopup(function () {
                        return o.classList.add("popup")
                    }), this._setPosition(), this.colour ? this._updateUI() : this._setColor("#0cf"), this._bindEvents(), !0
                }
            }, {
                key: "hide",
                value: function () {
                    return this._toggleDOM(!1)
                }
            }, {
                key: "_bindEvents",
                value: function () {
                    var e = this,
                        r = this,
                        t = this.domElement;

                    function i(o, n) {
                        function t(t, e) {
                            var r = e[0] / o.clientWidth,
                                i = e[1] / o.clientHeight;
                            n(r, i)
                        }
                        return {
                            container: o,
                            dragOutside: !1,
                            callback: t,
                            callbackClick: t,
                            callbackDragStart: t,
                            propagateEvents: !0
                        }
                    }
                    u(t, "click", function (t) {
                        return t.preventDefault()
                    }), s(i(this._domH, function (t, e) {
                        return r._setHSLA(t)
                    })), s(i(this._domSL, function (t, e) {
                        return r._setHSLA(null, t, 1 - e)
                    })), this.settings.alpha && s(i(this._domA, function (t, e) {
                        return r._setHSLA(null, null, null, 1 - e)
                    }));
                    var o = this._domEdit;
                    u(o, "input", function (t) {
                        r._setColor(this.value, {
                            fromEditor: !0,
                            failSilently: !0
                        })
                    }), u(o, "focus", function (t) {
                        this.selectionStart === this.selectionEnd && this.select()
                    });
                    var n = function (t) {
                            e._ifPopup(function () {
                                return e.closeHandler(t)
                            })
                        },
                        a = function (t) {
                            e._ifPopup(function () {
                                return e.closeHandler(t)
                            }), e.onDone && e.onDone(e.colour)
                        };
                    u(window, l, n), u(window, p, n), h(t, ["Esc", "Escape"], n), u(this._domOkay, "click", a), h(t, ["Enter"], a)
                }
            }, {
                key: "_setPosition",
                value: function () {
                    var r = this.settings.parent,
                        i = this.domElement;
                    r !== i.parentNode && r.appendChild(i), this._ifPopup(function (t) {
                        "static" === getComputedStyle(r).position && (r.style.position = "relative");
                        var e = !0 === t ? "popup_right" : "popup_" + t;
                        ["popup_top", "popup_bottom", "popup_left", "popup_right"].forEach(function (t) {
                            t === e ? i.classList.add(t) : i.classList.remove(t)
                        }), i.classList.add(e)
                    })
                }
            }, {
                key: "_setHSLA",
                value: function (t, e, r, i, o) {
                    o = o || {};
                    var n = this.colour,
                        a = n.hsla;
                    [t, e, r, i].forEach(function (t, e) {
                        (t || 0 === t) && (a[e] = t)
                    }), n.hsla = a, this._updateUI(o), this.onChange && !o.silent && this.onChange(n)
                }
            }, {
                key: "_updateUI",
                value: function (t) {
                    if (this.domElement) {
                        t = t || {};
                        var e = this.colour,
                            r = e.hsla,
                            i = "hsl(" + 360 * r[0] + ", 100%, 50%)",
                            o = e.hslString,
                            n = e.hslaString,
                            a = this._domH,
                            s = this._domSL,
                            l = this._domA,
                            p = v(".picker_selector", a),
                            u = v(".picker_selector", s),
                            c = v(".picker_selector", l);
                        m(0, p, r[0]), this._domSL.style.backgroundColor = this._domH.style.color = i, m(0, u, r[1]), _(0, u, 1 - r[2]), s.style.color = o, _(0, c, 1 - r[3]);
                        var h = o,
                            d = h.replace("hsl", "hsla").replace(")", ", 0)"),
                            f = "linear-gradient(" + [h, d] + ")";
                        if (this._domA.style.backgroundImage = f + ", url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='2' height='2'%3E%3Cpath d='M1,0H0V1H2V2H1' fill='lightgrey'/%3E%3C/svg%3E\")", !t.fromEditor) {
                            var g = e.hex;
                            this._domEdit.value = this.settings.alpha ? g : g.substr(0, 7)
                        }
                        this._domSample.style.color = n
                    }

                    function m(t, e, r) {
                        e.style.left = 100 * r + "%"
                    }

                    function _(t, e, r) {
                        e.style.top = 100 * r + "%"
                    }
                }
            }, {
                key: "_ifPopup",
                value: function (t, e) {
                    this.settings.parent && this.settings.popup ? t && t(this.settings.popup) : e && e()
                }
            }, {
                key: "_toggleDOM",
                value: function (t) {
                    var e = this.domElement;
                    if (!e) return !1;
                    var r = t ? "" : "none",
                        i = e.style.display !== r;
                    return i && (e.style.display = r), i
                }
            }]), r
        }()
});