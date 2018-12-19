/*! smooth-scroll v14.2.1 | (c) 2018 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/smooth-scroll */
window.Element && !Element.prototype.closest && (Element.prototype.closest = function (e) {
		var t, o = (this.document || this.ownerDocument).querySelectorAll(e),
			n = this;
		do {
			for (t = o.length; 0 <= --t && o.item(t) !== n;);
		} while (t < 0 && (n = n.parentElement));
		return n
	}),
	function () {
		function e(e, t) {
			t = t || {
				bubbles: !1,
				cancelable: !1,
				detail: void 0
			};
			var o = document.createEvent("CustomEvent");
			return o.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), o
		}
		if ("function" == typeof window.CustomEvent) return;
		e.prototype = window.Event.prototype, window.CustomEvent = e
	}(),
	function () {
		for (var a = 0, e = ["ms", "moz", "webkit", "o"], t = 0; t < e.length && !window.requestAnimationFrame; ++t) window.requestAnimationFrame = window[e[t] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[e[t] + "CancelAnimationFrame"] || window[e[t] + "CancelRequestAnimationFrame"];
		window.requestAnimationFrame || (window.requestAnimationFrame = function (e, t) {
			var o = (new Date).getTime(),
				n = Math.max(0, 16 - (o - a)),
				i = window.setTimeout(function () {
					e(o + n)
				}, n);
			return a = o + n, i
		}), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (e) {
			clearTimeout(e)
		})
	}(),
	function (e, t) {
		"function" == typeof define && define.amd ? define([], function () {
			return t(e)
		}) : "object" == typeof exports ? module.exports = t(e) : e.SmoothScroll = t(e)
	}("undefined" != typeof global ? global : "undefined" != typeof window ? window : this, function (E) {
		"use strict";
		var k = {
				ignore: "[data-scroll-ignore]",
				header: null,
				topOnEmptyHash: !0,
				speed: 500,
				clip: !0,
				offset: 0,
				easing: "easeInOutCubic",
				customEasing: null,
				updateURL: !0,
				popstate: !0,
				emitEvents: !0
			},
			s = function () {
				return "querySelector" in document && "addEventListener" in E && "requestAnimationFrame" in E && "closest" in E.Element.prototype
			},
			S = function () {
				for (var o = {}, e = 0; e < arguments.length; e++) ! function (e) {
					for (var t in e) e.hasOwnProperty(t) && (o[t] = e[t])
				}(arguments[e]);
				return o
			},
			l = function (e) {
				return !!("matchMedia" in E && E.matchMedia("(prefers-reduced-motion)").matches)
			},
			t = function (e) {
				return parseInt(E.getComputedStyle(e).height, 10)
			},
			u = function (t) {
				var o;
				try {
					o = decodeURIComponent(t)
				} catch (e) {
					o = t
				}
				return o
			},
			d = function (e) {
				"#" === e.charAt(0) && (e = e.substr(1));
				for (var t, o = String(e), n = o.length, i = -1, a = "", r = o.charCodeAt(0); ++i < n;) {
					if (0 === (t = o.charCodeAt(i))) throw new InvalidCharacterError("Invalid character: the input contains U+0000.");
					a += 1 <= t && t <= 31 || 127 == t || 0 === i && 48 <= t && t <= 57 || 1 === i && 48 <= t && t <= 57 && 45 === r ? "\\" + t.toString(16) + " " : 128 <= t || 45 === t || 95 === t || 48 <= t && t <= 57 || 65 <= t && t <= 90 || 97 <= t && t <= 122 ? o.charAt(i) : "\\" + o.charAt(i)
				}
				var c;
				try {
					c = decodeURIComponent("#" + a)
				} catch (e) {
					c = "#" + a
				}
				return c
			},
			C = function (e, t) {
				var o;
				return "easeInQuad" === e.easing && (o = t * t), "easeOutQuad" === e.easing && (o = t * (2 - t)), "easeInOutQuad" === e.easing && (o = t < .5 ? 2 * t * t : (4 - 2 * t) * t - 1), "easeInCubic" === e.easing && (o = t * t * t), "easeOutCubic" === e.easing && (o = --t * t * t + 1), "easeInOutCubic" === e.easing && (o = t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1), "easeInQuart" === e.easing && (o = t * t * t * t), "easeOutQuart" === e.easing && (o = 1 - --t * t * t * t), "easeInOutQuart" === e.easing && (o = t < .5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t), "easeInQuint" === e.easing && (o = t * t * t * t * t), "easeOutQuint" === e.easing && (o = 1 + --t * t * t * t * t), "easeInOutQuint" === e.easing && (o = t < .5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t), e.customEasing && (o = e.customEasing(t)), o || t
			},
			x = function () {
				return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight)
			},
			O = function (e, t, o, n) {
				var i = 0;
				if (e.offsetParent)
					for (; i += e.offsetTop, e = e.offsetParent;);
				return i = Math.max(i - t - o, 0), n && (i = Math.min(i, x() - E.innerHeight)), i
			},
			A = function (e) {
				return e ? t(e) + e.offsetTop : 0
			},
			j = function (e, t, o) {
				t || history.pushState && o.updateURL && history.pushState({
					smoothScroll: JSON.stringify(o),
					anchor: e.id
				}, document.title, e === document.documentElement ? "#top" : "#" + e.id)
			},
			q = function (e, t, o) {
				0 === e && document.body.focus(), o || (e.focus(), document.activeElement !== e && (e.setAttribute("tabindex", "-1"), e.focus(), e.style.outline = "none"), E.scrollTo(0, t))
			},
			L = function (e, t, o, n) {
				if (t.emitEvents && "function" == typeof E.CustomEvent) {
					var i = new CustomEvent(e, {
						bubbles: !0,
						detail: {
							anchor: o,
							toggle: n
						}
					});
					document.dispatchEvent(i)
				}
			};
		return function (n, e) {
			var h, t, i, b, y, o, g, w = {
					cancelScroll: function (e) {
						cancelAnimationFrame(g), g = null, e || L("scrollCancel", h)
					},
					animateScroll: function (n, i, e) {
						var a = S(h || k, e || {}),
							r = "[object Number]" === Object.prototype.toString.call(n),
							t = r || !n.tagName ? null : n;
						if (r || t) {
							var c = E.pageYOffset;
							a.header && !b && (b = document.querySelector(a.header)), y || (y = A(b));
							var s, o, l, u = r ? n : O(t, y, parseInt("function" == typeof a.offset ? a.offset(n, i) : a.offset, 10), a.clip),
								d = u - c,
								m = x(),
								f = 0,
								p = function (e, t) {
									var o = E.pageYOffset;
									if (e == t || o == t || (c < t && E.innerHeight + o) >= m) return w.cancelScroll(!0), q(n, t, r), L("scrollStop", a, n, i), !(g = s = null)
								},
								v = function (e) {
									s || (s = e), o = (f += e - s) / parseInt(a.speed, 10), l = c + d * C(a, o = 1 < o ? 1 : o), E.scrollTo(0, Math.floor(l)), p(l, u) || (g = E.requestAnimationFrame(v), s = e)
								};
							0 === E.pageYOffset && E.scrollTo(0, 0), j(n, r, a), L("scrollStart", a, n, i), w.cancelScroll(!0), E.requestAnimationFrame(v)
						}
					}
				},
				a = function (e) {
					if (!l() && 0 === e.button && !e.metaKey && !e.ctrlKey && "closest" in e.target && (i = e.target.closest(n)) && "a" === i.tagName.toLowerCase() && !e.target.closest(h.ignore) && i.hostname === E.location.hostname && i.pathname === E.location.pathname && /#/.test(i.href)) {
						var t = d(u(i.hash)),
							o = h.topOnEmptyHash && "#" === t ? document.documentElement : document.querySelector(t);
						(o = o || "#top" !== t ? o : document.documentElement) && (e.preventDefault(), w.animateScroll(o, i))
					}
				},
				r = function (e) {
					if (null !== history.state && history.state.smoothScroll && history.state.smoothScroll === JSON.stringify(h) && history.state.anchor) {
						var t = document.querySelector(d(u(history.state.anchor)));
						t && w.animateScroll(t, null, {
							updateURL: !1
						})
					}
				},
				c = function (e) {
					o || (o = setTimeout(function () {
						o = null, y = A(b)
					}, 66))
				};
			return w.destroy = function () {
				h && (document.removeEventListener("click", a, !1), E.removeEventListener("resize", c, !1), E.removeEventListener("popstate", r, !1), w.cancelScroll(), g = o = y = b = i = t = h = null)
			}, w.init = function (e) {
				if (!s()) throw "Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs.";
				w.destroy(), h = S(k, e || {}), b = h.header ? document.querySelector(h.header) : null, y = A(b), document.addEventListener("click", a, !1), b && E.addEventListener("resize", c, !1), h.updateURL && h.popstate && E.addEventListener("popstate", r, !1)
			}, w.init(e), w
		}
	}),
	function (e, t) {
		"function" == typeof define && define.amd ? define([], t(e)) : "object" == typeof exports ? module.exports = t(e) : e.modals = t(e)
	}("undefined" != typeof global ? global : this.window || this.global, function (e) {
		"use strict";
		var a, r, c, s = {},
			t = "querySelector" in document && "addEventListener" in e && "classList" in document.createElement("_"),
			l = "closed",
			u = {
				selectorToggle: "[data-modal]",
				selectorWindow: "[data-modal-window]",
				selectorClose: "[data-modal-close]",
				modalActiveClass: "active",
				modalBGClass: "modal-bg",
				preventBGScroll: !0,
				preventBGScrollHtml: !0,
				preventBGScrollBody: !0,
				backspaceClose: !0,
				stopVideo: !0,
				callbackOpen: function () {},
				callbackClose: function () {}
			},
			d = function (e) {
				var o = {},
					n = !1,
					t = 0,
					i = arguments.length;
				for ("[object Boolean]" === Object.prototype.toString.call(e) && (n = e, t++); t < i; t++) {
					var a;
					! function (e) {
						for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (n && "[object Object]" === Object.prototype.toString.call(e[t]) ? o[t] = d(!0, o[t], e[t]) : o[t] = e[t])
					}(arguments[t])
				}
				return o
			},
			m = function (e, t) {
				for (Element.prototype.matches || (Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function (e) {
						for (var t = (this.document || this.ownerDocument).querySelectorAll(e), o = t.length; 0 <= --o && t.item(o) !== this;);
						return -1 < o
					}); e && e !== document; e = e.parentNode)
					if (e.matches(t)) return e;
				return null
			},
			n = function (e, t) {
				if (t.stopVideo && e.classList.contains(t.modalActiveClass)) {
					var o = e.querySelector("iframe"),
						n = e.querySelector("video");
					if (o) {
						var i = o.src;
						o.src = i
					}
					n && n.pause()
				}
			},
			o = function () {
				var e = document.createElement("div");
				e.style.visibility = "hidden", e.style.width = "100px", e.style.msOverflowStyle = "scrollbar", document.body.appendChild(e);
				var t = e.offsetWidth;
				e.style.overflow = "scroll";
				var o = document.createElement("div");
				o.style.width = "100%", e.appendChild(o);
				var n = o.offsetWidth;
				return e.parentNode.removeChild(e), t - n
			},
			f = function () {
				if (!document.querySelector("[data-modal-bg]")) {
					var e = document.createElement("div");
					e.setAttribute("data-modal-bg", !0), e.classList.add(c.modalBGClass), document.body.appendChild(e)
				}
			},
			i = function () {
				var e = document.querySelector("[data-modal-bg]");
				e && document.body.removeChild(e)
			};
		s.closeModal = function (e) {
			var t = d(c || u, e || {}),
				o = document.querySelector(t.selectorWindow + "." + t.modalActiveClass);
			o && (n(o, t), o.classList.remove(t.modalActiveClass), i(), l = "closed", t.preventBGScroll && (document.documentElement.style.overflowY = "", document.body.style.overflowY = "", document.body.style.paddingRight = ""), t.callbackClose(r, o), r && (r.focus(), r = null))
		}, s.openModal = function (e, t, o) {
			var n = d(c || u, o || {}),
				i = document.querySelector(t);
			"open" === l && s.closeModal(n), e && (r = e), i.classList.add(n.modalActiveClass), f(), l = "open", i.setAttribute("tabindex", "-1"), i.focus(), n.preventBGScroll && (n.preventBGScrollHtml && (document.documentElement.style.overflowY = "hidden"), n.preventBGScrollBody && (document.body.style.overflowY = "hidden"), document.body.style.paddingRight = a + "px"), n.callbackOpen(e, i)
		};
		var p = function (e, t, o) {
				if (o) return e.removeEventListener("touchstart", s, !1), e.removeEventListener("touchend", l, !1), void e.removeEventListener("click", u, !1);
				if (t && "function" == typeof t) {
					var n, i, a, r, c, s = function (e) {
							n = !0, i = e.changedTouches[0].pageX, a = e.changedTouches[0].pageY
						},
						l = function (e) {
							r = e.changedTouches[0].pageX - i, c = e.changedTouches[0].pageY - a, 7 <= Math.abs(r) || 10 <= Math.abs(c) || t(e)
						},
						u = function (e) {
							n ? n = !1 : t(e)
						};
					e.addEventListener("touchstart", s, !1), e.addEventListener("touchend", l, !1), e.addEventListener("click", u, !1)
				}
			},
			v = function (e) {
				var t = e.target,
					o = m(t, c.selectorToggle),
					n = m(t, c.selectorClose),
					i = m(t, c.selectorWindow),
					a = e.keyCode;
				if (a && "open" === l)(27 === a || c.backspaceClose && (8 === a || 46 === a)) && s.closeModal();
				else if (t) {
					if (i && !n) return;
					!o || a && 13 !== a ? "open" === l && (e.preventDefault(), s.closeModal()) : (e.preventDefault(), s.openModal(o, o.getAttribute("data-modal"), c))
				}
			};
		return s.destroy = function () {
			c && (p(document, null, !0), document.removeEventListener("keydown", v, !1), document.documentElement.style.overflowY = "", document.body.style.overflowY = "", document.body.style.paddingRight = "", c = r = a = null)
		}, s.init = function (e) {
			t && (s.destroy(), c = d(u, e || {}), a = o(), p(document, v), document.addEventListener("keydown", v, !1))
		}, s
	}),
	function (e, t) {
		"object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.AOS = t()
	}(this, function () {
		"use strict";

		function a(n, i, e) {
			function a(e) {
				var t = l,
					o = u;
				return l = u = void 0, v = e, m = n.apply(o, t)
			}

			function r(e) {
				var t = e - p;
				return void 0 === p || i <= t || t < 0 || b && d <= e - v
			}

			function c() {
				var e = x(),
					t, o;
				if (r(e)) return s(e);
				f = setTimeout(c, (o = i - ((t = e) - p), b ? C(o, d - (t - v)) : o))
			}

			function s(e) {
				return f = void 0, o && l ? a(e) : (l = u = void 0, m)
			}

			function t() {
				var e = x(),
					t = r(e),
					o;
				if (l = arguments, u = this, p = e, t) {
					if (void 0 === f) return v = o = p, f = setTimeout(c, i), h ? a(o) : m;
					if (b) return f = setTimeout(c, i), a(p)
				}
				return void 0 === f && (f = setTimeout(c, i)), m
			}
			var l, u, d, m, f, p, v = 0,
				h = !1,
				b = !1,
				o = !0;
			if ("function" != typeof n) throw new TypeError(k);
			return i = g(i) || 0, y(e) && (h = !!e.leading, d = (b = "maxWait" in e) ? S(g(e.maxWait) || 0, i) : d, o = "trailing" in e ? !!e.trailing : o), t.cancel = function () {
				void 0 !== f && clearTimeout(f), l = p = u = f = void(v = 0)
			}, t.flush = function () {
				return void 0 === f ? m : s(x())
			}, t
		}

		function y(e) {
			var t = typeof e;
			return !!e && ("object" == t || "function" == t)
		}

		function g(e) {
			if ("number" == typeof e) return e;
			if ("symbol" == typeof (t = e) || (o = t) && "object" == typeof o && p.call(t) == c) return r;
			var t, o;
			if (y(e)) {
				var n = "function" == typeof e.valueOf ? e.valueOf() : e;
				e = y(n) ? n + "" : n
			}
			if ("string" != typeof e) return 0 === e ? e : +e;
			e = e.replace(s, "");
			var i = u.test(e);
			return i || d.test(e) ? m(e.slice(2), i ? 2 : 8) : l.test(e) ? r : +e
		}

		function w(e) {
			var t = typeof e;
			return !!e && ("object" == t || "function" == t)
		}

		function E(e) {
			if ("number" == typeof e) return e;
			if ("symbol" == typeof (t = e) || (o = t) && "object" == typeof o && H.call(t) == b) return h;
			var t, o;
			if (w(e)) {
				var n = "function" == typeof e.valueOf ? e.valueOf() : e;
				e = w(n) ? n + "" : n
			}
			if ("string" != typeof e) return 0 === e ? e : +e;
			e = e.replace(A, "");
			var i = q.test(e);
			return i || L.test(e) ? M(e.slice(2), i ? 2 : 8) : j.test(e) ? h : +e
		}

		function i(e) {
			e && e.forEach(function (e) {
				var t = Array.prototype.slice.call(e.addedNodes),
					o = Array.prototype.slice.call(e.removedNodes);
				if (function e(t) {
						var o = void 0,
							n = void 0;
						for (o = 0; o < t.length; o += 1) {
							if ((n = t[o]).dataset && n.dataset.aos) return !0;
							if (n.children && e(n.children)) return !0
						}
						return !1
					}(t.concat(o))) return P()
			})
		}

		function t() {
			return navigator.userAgent || navigator.vendor || window.opera || ""
		}
		var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {},
			k = "Expected a function",
			r = NaN,
			c = "[object Symbol]",
			s = /^\s+|\s+$/g,
			l = /^[-+]0x[0-9a-f]+$/i,
			u = /^0b[01]+$/i,
			d = /^0o[0-7]+$/i,
			m = parseInt,
			o = "object" == typeof e && e && e.Object === Object && e,
			n = "object" == typeof self && self && self.Object === Object && self,
			f = o || n || Function("return this")(),
			p = Object.prototype.toString,
			S = Math.max,
			C = Math.min,
			x = function () {
				return f.Date.now()
			},
			v = function (e, t, o) {
				var n = !0,
					i = !0;
				if ("function" != typeof e) throw new TypeError(k);
				return y(o) && (n = "leading" in o ? !!o.leading : n, i = "trailing" in o ? !!o.trailing : i), a(e, t, {
					leading: n,
					maxWait: t,
					trailing: i
				})
			},
			O = "Expected a function",
			h = NaN,
			b = "[object Symbol]",
			A = /^\s+|\s+$/g,
			j = /^[-+]0x[0-9a-f]+$/i,
			q = /^0b[01]+$/i,
			L = /^0o[0-7]+$/i,
			M = parseInt,
			T = "object" == typeof e && e && e.Object === Object && e,
			N = "object" == typeof self && self && self.Object === Object && self,
			z = T || N || Function("return this")(),
			H = Object.prototype.toString,
			I = Math.max,
			F = Math.min,
			D = function () {
				return z.Date.now()
			},
			B = function (n, i, e) {
				function a(e) {
					var t = l,
						o = u;
					return l = u = void 0, v = e, m = n.apply(o, t)
				}

				function r(e) {
					var t = e - p;
					return void 0 === p || i <= t || t < 0 || b && d <= e - v
				}

				function c() {
					var e = D(),
						t, o;
					if (r(e)) return s(e);
					f = setTimeout(c, (o = i - ((t = e) - p), b ? F(o, d - (t - v)) : o))
				}

				function s(e) {
					return f = void 0, o && l ? a(e) : (l = u = void 0, m)
				}

				function t() {
					var e = D(),
						t = r(e),
						o;
					if (l = arguments, u = this, p = e, t) {
						if (void 0 === f) return v = o = p, f = setTimeout(c, i), h ? a(o) : m;
						if (b) return f = setTimeout(c, i), a(p)
					}
					return void 0 === f && (f = setTimeout(c, i)), m
				}
				var l, u, d, m, f, p, v = 0,
					h = !1,
					b = !1,
					o = !0;
				if ("function" != typeof n) throw new TypeError(O);
				return i = E(i) || 0, w(e) && (h = !!e.leading, d = (b = "maxWait" in e) ? I(E(e.maxWait) || 0, i) : d, o = "trailing" in e ? !!e.trailing : o), t.cancel = function () {
					void 0 !== f && clearTimeout(f), l = p = u = f = void(v = 0)
				}, t.flush = function () {
					return void 0 === f ? m : s(D())
				}, t
			},
			P = function () {},
			Y = function (e, t) {
				if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
			},
			R = function () {
				function n(e, t) {
					for (var o = 0; o < t.length; o++) {
						var n = t[o];
						n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
					}
				}
				return function (e, t, o) {
					return t && n(e.prototype, t), o && n(e, o), e
				}
			}(),
			W = Object.assign || function (e) {
				for (var t = 1; t < arguments.length; t++) {
					var o = arguments[t];
					for (var n in o) Object.prototype.hasOwnProperty.call(o, n) && (e[n] = o[n])
				}
				return e
			},
			Q = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,
			G = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
			$ = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i,
			U = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
			_ = new(function () {
				function e() {
					Y(this, e)
				}
				return R(e, [{
					key: "phone",
					value: function () {
						var e = t();
						return !(!Q.test(e) && !G.test(e.substr(0, 4)))
					}
				}, {
					key: "mobile",
					value: function () {
						var e = t();
						return !(!$.test(e) && !U.test(e.substr(0, 4)))
					}
				}, {
					key: "tablet",
					value: function () {
						return this.mobile() && !this.phone()
					}
				}, {
					key: "ie11",
					value: function () {
						return "-ms-scroll-limit" in document.documentElement.style && "-ms-ime-align" in document.documentElement.style
					}
				}]), e
			}()),
			J = function (e, t) {
				var o = void 0;
				return _.ie11() ? (o = document.createEvent("CustomEvent")).initCustomEvent(e, !0, !0, {
					detail: t
				}) : o = new CustomEvent(e, {
					detail: t
				}), document.dispatchEvent(o)
			},
			K = function (e) {
				return e.forEach(function (e, t) {
					return o = e, n = window.pageYOffset, i = o.options, a = o.position, r = o.node, o.data, c = function () {
						var t, e;
						o.animated && (t = r, (e = i.animatedClassNames) && e.forEach(function (e) {
							return t.classList.remove(e)
						}), J("aos:out", r), o.options.id && J("aos:in:" + o.options.id, r), o.animated = !1)
					}, void(i.mirror && n >= a.out && !i.once ? c() : n >= a.in ? o.animated || (s = r, (l = i.animatedClassNames) && l.forEach(function (e) {
						return s.classList.add(e)
					}), J("aos:in", r), o.options.id && J("aos:in:" + o.options.id, r), o.animated = !0) : o.animated && !i.once && c());
					var o, n, i, a, r, c, s, l
				})
			},
			V = function (e) {
				for (var t = 0, o = 0; e && !isNaN(e.offsetLeft) && !isNaN(e.offsetTop);) t += e.offsetLeft - ("BODY" != e.tagName ? e.scrollLeft : 0), o += e.offsetTop - ("BODY" != e.tagName ? e.scrollTop : 0), e = e.offsetParent;
				return {
					top: o,
					left: t
				}
			},
			X = function (e, t, o) {
				var n = e.getAttribute("data-aos-" + t);
				if (void 0 !== n) {
					if ("true" === n) return !0;
					if ("false" === n) return !1
				}
				return n || o
			},
			Z = function (e, c) {
				return e.forEach(function (e, t) {
					var o = X(e.node, "mirror", c.mirror),
						n = X(e.node, "once", c.once),
						i = X(e.node, "id"),
						a = c.useClassNames && e.node.getAttribute("data-aos"),
						r = [c.animatedClassName].concat(a ? a.split(" ") : []).filter(function (e) {
							return "string" == typeof e
						});
					c.initClassName && e.node.classList.add(c.initClassName), e.position = { in: function (e, t, o) {
							var n = window.innerHeight,
								i = X(e, "anchor"),
								a = X(e, "anchor-placement"),
								r = Number(X(e, "offset", a ? 0 : t)),
								c = a || o,
								s = e;
							i && document.querySelectorAll(i) && (s = document.querySelectorAll(i)[0]);
							var l = V(s).top - n;
							switch (c) {
								case "top-bottom":
									break;
								case "center-bottom":
									l += s.offsetHeight / 2;
									break;
								case "bottom-bottom":
									l += s.offsetHeight;
									break;
								case "top-center":
									l += n / 2;
									break;
								case "center-center":
									l += n / 2 + s.offsetHeight / 2;
									break;
								case "bottom-center":
									l += n / 2 + s.offsetHeight;
									break;
								case "top-top":
									l += n;
									break;
								case "bottom-top":
									l += n + s.offsetHeight;
									break;
								case "center-top":
									l += n + s.offsetHeight / 2
							}
							return l + r
						}(e.node, c.offset, c.anchorPlacement),
						out: o && function (e, t) {
							window.innerHeight;
							var o = X(e, "anchor"),
								n = X(e, "offset", t),
								i = e;
							return o && document.querySelectorAll(o) && (i = document.querySelectorAll(o)[0]), V(i).top + i.offsetHeight - n
						}(e.node, c.offset)
					}, e.options = {
						once: n,
						mirror: o,
						animatedClassNames: r,
						id: i
					}
				}), e
			},
			ee = function () {
				var e = document.querySelectorAll("[data-aos]");
				return Array.prototype.map.call(e, function (e) {
					return {
						node: e
					}
				})
			},
			te = [],
			oe = !1,
			ne = {
				offset: 120,
				delay: 0,
				easing: "ease",
				duration: 400,
				disable: !1,
				once: !1,
				mirror: !1,
				anchorPlacement: "top-bottom",
				startEvent: "DOMContentLoaded",
				animatedClassName: "aos-animate",
				initClassName: "aos-init",
				useClassNames: !1
			},
			ie = function () {
				return document.all && !window.atob
			},
			ae = function (e) {
				0 < arguments.length && void 0 !== e && e && (oe = !0), oe && (te = Z(te, ne), K(te), window.addEventListener("scroll", v(function () {
					K(te, ne.once)
				}, 99)))
			},
			re = function () {
				if (te = ee(), se(ne.disable) || ie()) return ce();
				ae()
			},
			ce = function () {
				te.forEach(function (e, t) {
					e.node.removeAttribute("data-aos"), e.node.removeAttribute("data-aos-easing"), e.node.removeAttribute("data-aos-duration"), e.node.removeAttribute("data-aos-delay"), ne.initClassName && e.node.classList.remove(ne.initClassName), ne.animatedClassName && e.node.classList.remove(ne.animatedClassName)
				})
			},
			se = function (e) {
				return !0 === e || "mobile" === e && _.mobile() || "phone" === e && _.phone() || "tablet" === e && _.tablet() || "function" == typeof e && !0 === e()
			};
		return {
			init: function (e) {
				var t, o, n;
				return ne = W(ne, e), te = ee(), t = re, o = window.document, n = new(window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver)(i), P = t, n.observe(o.documentElement, {
					childList: !0,
					subtree: !0,
					removedNodes: !0
				}), se(ne.disable) || ie() ? ce() : (document.querySelector("body").setAttribute("data-aos-easing", ne.easing), document.querySelector("body").setAttribute("data-aos-duration", ne.duration), document.querySelector("body").setAttribute("data-aos-delay", ne.delay), -1 === ["DOMContentLoaded", "load"].indexOf(ne.startEvent) ? document.addEventListener(ne.startEvent, function () {
					ae(!0)
				}) : window.addEventListener("load", function () {
					ae(!0)
				}), "DOMContentLoaded" === ne.startEvent && -1 < ["complete", "interactive"].indexOf(document.readyState) && ae(!0), window.addEventListener("resize", B(ae, 50, !0)), window.addEventListener("orientationchange", B(ae, 50, !0)), te)
			},
			refresh: ae,
			refreshHard: re
		}
	});
var Drip = function () {
	"use strict";
	var t, s, a = [{}, {}, {}, {}, {}, {}, {}, {}],
		l, u, r, c = 1,
		o = function () {
			var o, n;
			a.forEach(function (e, t) {
				for (e.points = [], e.alpha = 1 - t / a.length, e.hue = 73, e.saturation = 64, e.lightness = 55, l = 0; l < 21; ++l) o = (l % 2 == 0 ? 20 * Math.random() : Math.random() * (.25 * r)) + t * (r / (a.length - 1)), n = 50 * Math.random(), e.points.push({
					x: 20 * l,
					ox: 20 * l,
					y: o,
					oy: o,
					ooy: o,
					rad: n,
					orad: n,
					angle: Math.PI * Math.random(),
					speed: .5 * (Math.PI / 180 + Math.PI / 180 * Math.random())
				})
			}), a.reverse()
		},
		n = function () {
			var i;
			s.clearRect(0, 0, u, r), a.forEach(function (e, t) {
				d(e.points, e.color, e.alpha, e.hue, e.saturation, e.lightness);
				var o = !0,
					n = 0;
				e.points.forEach(function (e) {
					e.angle += e.speed, e.y = e.oy + Math.sin(e.angle) * e.rad, e.oy += c, n = Math.max(e.y, n), e.y < r && (o = !1)
				}), e.alpha = 1 - Math.min(n, r) / r, o && e.points.forEach(function (e) {
					e.y -= n, e.oy -= n, i = t
				})
			}), void 0 !== i && a.push(a.splice(i, 1)[0]), requestAnimationFrame(n)
		},
		d = function (e, t, o, n, i, a) {
			for (s.fillStyle = "hsl(" + n + ", " + i * o + "%, " + (a * o + 7) + "%)", s.beginPath(), s.moveTo(0, 0), s.lineTo(e[0].x, e[0].y), l = 1; l < e.length - 2; l++) {
				var r = (e[l].x + e[l + 1].x) / 2,
					c = (e[l].y + e[l + 1].y) / 2;
				s.quadraticCurveTo(e[l].x, e[l].y, r, c)
			}
			s.quadraticCurveTo(e[l].x, e[l].y, e[l + 1].x, e[l + 1].y), s.lineTo(u, 0), s.lineTo(0, 0), s.fill()
		},
		i = function () {
			u = window.innerWidth, r = window.innerHeight, t.setAttribute("width", u), t.setAttribute("height", r);
			var o = u / 400,
				n = r / 400;
			c = 1 * n, a.forEach(function (e, t) {
				e.points.forEach(function (e) {
					e.x = e.ox * o, e.oy = e.ooy * n, e.rad = e.orad * n
				})
			})
		},
		e;
	return {
		init: function (e) {
			u = (t = e).getAttribute("width"), r = t.getAttribute("height"), s = t.getContext("2d"), o(), window.addEventListener("resize", i), i(), n()
		}
	}
}(); // @codekit-prepend '../vendor/smooth-scroll.polyfills.min.js'
// @codekit-prepend '../vendor/modals.min.js'
// @codekit-prepend '../vendor/aos.min.js'
// @codekit-prepend '../vendor/dripping-paint.js'
jQuery(function (o) {
	var n = new SmoothScroll("[data-scroll]");
	modals.init({
			backspaceClose: !1
		}), AOS.init(),
		// if ($('#wpsl-wrap').length) {
		// 	var $originalBtn = $('#wpsl-search-btn');
		// 	$originalBtn.after('<button type="submit" id="wpsl-search-btn" class="btn btn-blue"><span class="btn-inner">Search</span></button>');
		// 	$originalBtn.remove();
		// 	setTimeout(function() {
		// 		$('.wpsl-dropdown select').on('change', function() {
		// 			var $this = $(this);
		// 			var $dropdown = $this.closest('.wpsl-dropdown');
		// 			var $item = $dropdown.find('.wpsl-selected-item');
		// 			var optionValue = $this.find('option:selected').val();
		// 			$dropdown.find('li').removeClass('wpsl-selected-dropdown')
		// 			$dropdown.find('li[data-value="' + optionValue + '"]').addClass('wpsl-selected-dropdown');
		// 			$item.attr('data-value', optionValue);
		// 		});
		// 	}, 500);
		// }
		o(".folder:not(#folder-last):not(.nested)").on("click", function () {
			var e = o(this).closest(".folder:not(.nested)"),
				t = o(".folder.-open:not(.nested)");
			
			o('.spacer').show();
			o('#'+e[0].id+'-spacer').hide();

			e[0] != t[0] && (t.removeClass("-open"), e.addClass("-open"), setTimeout(function () {
				n.animateScroll(e.offset().top - 20)
			}, 200))
		}), 

		o(".folder.nested:not(#folder-last)").on("click", function () {
			var e = o(this).closest(".folder.nested"),
				t = o(".folder.-open.nested");

			e[0] != t[0] && (t.removeClass("-open"), e.addClass("-open"), setTimeout(function () {
				n.animateScroll(e.offset().top - 20)
			}, 200))
		}), Drip.init(o(".slime-drip")[0]), setTimeout(function () {
			o(".folder").each(function () {
				console.log('blah' + o(this).offset().top)
			})
		}, 2e3)
});