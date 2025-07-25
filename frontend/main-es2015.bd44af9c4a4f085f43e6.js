/*! For license information please see main-es2015.bd44af9c4a4f085f43e6.js.LICENSE.txt */
(window.webpackJsonp = window.webpackJsonp || []).push([
  [1],
  {
    0: function (e, t, n) {
      e.exports = n("zUnb");
    },
    crnd: function (e, t) {
      function n(e) {
        return Promise.resolve().then(function () {
          var t = new Error("Cannot find module '" + e + "'");
          throw ((t.code = "MODULE_NOT_FOUND"), t);
        });
      }
      (n.keys = function () {
        return [];
      }),
        (n.resolve = n),
        (e.exports = n),
        (n.id = "crnd");
    },
    zUnb: function (e, t, n) {
      "use strict";
      function r(e) {
        return "function" == typeof e;
      }
      n.r(t);
      let s = !1;
      const i = {
        Promise: void 0,
        set useDeprecatedSynchronousErrorHandling(e) {
          if (e) {
            const e = new Error();
            console.warn(
              "DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n" +
                e.stack
            );
          } else
            s &&
              console.log(
                "RxJS: Back to a better error behavior. Thank you. <3"
              );
          s = e;
        },
        get useDeprecatedSynchronousErrorHandling() {
          return s;
        },
      };
      function o(e) {
        setTimeout(() => {
          throw e;
        }, 0);
      }
      const l = {
          closed: !0,
          next(e) {},
          error(e) {
            if (i.useDeprecatedSynchronousErrorHandling) throw e;
            o(e);
          },
          complete() {},
        },
        a = (() =>
          Array.isArray || ((e) => e && "number" == typeof e.length))();
      function u(e) {
        return null !== e && "object" == typeof e;
      }
      const c = (() => {
        function e(e) {
          return (
            Error.call(this),
            (this.message = e
              ? `${e.length} errors occurred during unsubscription:\n${e
                  .map((e, t) => `${t + 1}) ${e.toString()}`)
                  .join("\n  ")}`
              : ""),
            (this.name = "UnsubscriptionError"),
            (this.errors = e),
            this
          );
        }
        return (e.prototype = Object.create(Error.prototype)), e;
      })();
      let h = (() => {
        class e {
          constructor(e) {
            (this.closed = !1),
              (this._parentOrParents = null),
              (this._subscriptions = null),
              e && ((this._ctorUnsubscribe = !0), (this._unsubscribe = e));
          }
          unsubscribe() {
            let t;
            if (this.closed) return;
            let {
              _parentOrParents: n,
              _ctorUnsubscribe: s,
              _unsubscribe: i,
              _subscriptions: o,
            } = this;
            if (
              ((this.closed = !0),
              (this._parentOrParents = null),
              (this._subscriptions = null),
              n instanceof e)
            )
              n.remove(this);
            else if (null !== n)
              for (let e = 0; e < n.length; ++e) n[e].remove(this);
            if (r(i)) {
              s && (this._unsubscribe = void 0);
              try {
                i.call(this);
              } catch (l) {
                t = l instanceof c ? d(l.errors) : [l];
              }
            }
            if (a(o)) {
              let e = -1,
                n = o.length;
              for (; ++e < n; ) {
                const n = o[e];
                if (u(n))
                  try {
                    n.unsubscribe();
                  } catch (l) {
                    (t = t || []),
                      l instanceof c ? (t = t.concat(d(l.errors))) : t.push(l);
                  }
              }
            }
            if (t) throw new c(t);
          }
          add(t) {
            let n = t;
            if (!t) return e.EMPTY;
            switch (typeof t) {
              case "function":
                n = new e(t);
              case "object":
                if (
                  n === this ||
                  n.closed ||
                  "function" != typeof n.unsubscribe
                )
                  return n;
                if (this.closed) return n.unsubscribe(), n;
                if (!(n instanceof e)) {
                  const t = n;
                  (n = new e()), (n._subscriptions = [t]);
                }
                break;
              default:
                throw new Error(
                  "unrecognized teardown " + t + " added to Subscription."
                );
            }
            let { _parentOrParents: r } = n;
            if (null === r) n._parentOrParents = this;
            else if (r instanceof e) {
              if (r === this) return n;
              n._parentOrParents = [r, this];
            } else {
              if (-1 !== r.indexOf(this)) return n;
              r.push(this);
            }
            const s = this._subscriptions;
            return null === s ? (this._subscriptions = [n]) : s.push(n), n;
          }
          remove(e) {
            const t = this._subscriptions;
            if (t) {
              const n = t.indexOf(e);
              -1 !== n && t.splice(n, 1);
            }
          }
        }
        return (
          (e.EMPTY = (function (e) {
            return (e.closed = !0), e;
          })(new e())),
          e
        );
      })();
      function d(e) {
        return e.reduce((e, t) => e.concat(t instanceof c ? t.errors : t), []);
      }
      const p = (() =>
        "function" == typeof Symbol
          ? Symbol("rxSubscriber")
          : "@@rxSubscriber_" + Math.random())();
      class f extends h {
        constructor(e, t, n) {
          switch (
            (super(),
            (this.syncErrorValue = null),
            (this.syncErrorThrown = !1),
            (this.syncErrorThrowable = !1),
            (this.isStopped = !1),
            arguments.length)
          ) {
            case 0:
              this.destination = l;
              break;
            case 1:
              if (!e) {
                this.destination = l;
                break;
              }
              if ("object" == typeof e) {
                e instanceof f
                  ? ((this.syncErrorThrowable = e.syncErrorThrowable),
                    (this.destination = e),
                    e.add(this))
                  : ((this.syncErrorThrowable = !0),
                    (this.destination = new g(this, e)));
                break;
              }
            default:
              (this.syncErrorThrowable = !0),
                (this.destination = new g(this, e, t, n));
          }
        }
        [p]() {
          return this;
        }
        static create(e, t, n) {
          const r = new f(e, t, n);
          return (r.syncErrorThrowable = !1), r;
        }
        next(e) {
          this.isStopped || this._next(e);
        }
        error(e) {
          this.isStopped || ((this.isStopped = !0), this._error(e));
        }
        complete() {
          this.isStopped || ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed || ((this.isStopped = !0), super.unsubscribe());
        }
        _next(e) {
          this.destination.next(e);
        }
        _error(e) {
          this.destination.error(e), this.unsubscribe();
        }
        _complete() {
          this.destination.complete(), this.unsubscribe();
        }
        _unsubscribeAndRecycle() {
          const { _parentOrParents: e } = this;
          return (
            (this._parentOrParents = null),
            this.unsubscribe(),
            (this.closed = !1),
            (this.isStopped = !1),
            (this._parentOrParents = e),
            this
          );
        }
      }
      class g extends f {
        constructor(e, t, n, s) {
          let i;
          super(), (this._parentSubscriber = e);
          let o = this;
          r(t)
            ? (i = t)
            : t &&
              ((i = t.next),
              (n = t.error),
              (s = t.complete),
              t !== l &&
                ((o = Object.create(t)),
                r(o.unsubscribe) && this.add(o.unsubscribe.bind(o)),
                (o.unsubscribe = this.unsubscribe.bind(this)))),
            (this._context = o),
            (this._next = i),
            (this._error = n),
            (this._complete = s);
        }
        next(e) {
          if (!this.isStopped && this._next) {
            const { _parentSubscriber: t } = this;
            i.useDeprecatedSynchronousErrorHandling && t.syncErrorThrowable
              ? this.__tryOrSetError(t, this._next, e) && this.unsubscribe()
              : this.__tryOrUnsub(this._next, e);
          }
        }
        error(e) {
          if (!this.isStopped) {
            const { _parentSubscriber: t } = this,
              { useDeprecatedSynchronousErrorHandling: n } = i;
            if (this._error)
              n && t.syncErrorThrowable
                ? (this.__tryOrSetError(t, this._error, e), this.unsubscribe())
                : (this.__tryOrUnsub(this._error, e), this.unsubscribe());
            else if (t.syncErrorThrowable)
              n ? ((t.syncErrorValue = e), (t.syncErrorThrown = !0)) : o(e),
                this.unsubscribe();
            else {
              if ((this.unsubscribe(), n)) throw e;
              o(e);
            }
          }
        }
        complete() {
          if (!this.isStopped) {
            const { _parentSubscriber: e } = this;
            if (this._complete) {
              const t = () => this._complete.call(this._context);
              i.useDeprecatedSynchronousErrorHandling && e.syncErrorThrowable
                ? (this.__tryOrSetError(e, t), this.unsubscribe())
                : (this.__tryOrUnsub(t), this.unsubscribe());
            } else this.unsubscribe();
          }
        }
        __tryOrUnsub(e, t) {
          try {
            e.call(this._context, t);
          } catch (n) {
            if ((this.unsubscribe(), i.useDeprecatedSynchronousErrorHandling))
              throw n;
            o(n);
          }
        }
        __tryOrSetError(e, t, n) {
          if (!i.useDeprecatedSynchronousErrorHandling)
            throw new Error("bad call");
          try {
            t.call(this._context, n);
          } catch (r) {
            return i.useDeprecatedSynchronousErrorHandling
              ? ((e.syncErrorValue = r), (e.syncErrorThrown = !0), !0)
              : (o(r), !0);
          }
          return !1;
        }
        _unsubscribe() {
          const { _parentSubscriber: e } = this;
          (this._context = null),
            (this._parentSubscriber = null),
            e.unsubscribe();
        }
      }
      const m = (() =>
        ("function" == typeof Symbol && Symbol.observable) || "@@observable")();
      function y(e) {
        return e;
      }
      function _(...e) {
        return v(e);
      }
      function v(e) {
        return 0 === e.length
          ? y
          : 1 === e.length
          ? e[0]
          : function (t) {
              return e.reduce((e, t) => t(e), t);
            };
      }
      let b = (() => {
        class e {
          constructor(e) {
            (this._isScalar = !1), e && (this._subscribe = e);
          }
          lift(t) {
            const n = new e();
            return (n.source = this), (n.operator = t), n;
          }
          subscribe(e, t, n) {
            const { operator: r } = this,
              s = (function (e, t, n) {
                if (e) {
                  if (e instanceof f) return e;
                  if (e[p]) return e[p]();
                }
                return e || t || n ? new f(e, t, n) : new f(l);
              })(e, t, n);
            if (
              (s.add(
                r
                  ? r.call(s, this.source)
                  : this.source ||
                    (i.useDeprecatedSynchronousErrorHandling &&
                      !s.syncErrorThrowable)
                  ? this._subscribe(s)
                  : this._trySubscribe(s)
              ),
              i.useDeprecatedSynchronousErrorHandling &&
                s.syncErrorThrowable &&
                ((s.syncErrorThrowable = !1), s.syncErrorThrown))
            )
              throw s.syncErrorValue;
            return s;
          }
          _trySubscribe(e) {
            try {
              return this._subscribe(e);
            } catch (t) {
              i.useDeprecatedSynchronousErrorHandling &&
                ((e.syncErrorThrown = !0), (e.syncErrorValue = t)),
                (function (e) {
                  for (; e; ) {
                    const { closed: t, destination: n, isStopped: r } = e;
                    if (t || r) return !1;
                    e = n && n instanceof f ? n : null;
                  }
                  return !0;
                })(e)
                  ? e.error(t)
                  : console.warn(t);
            }
          }
          forEach(e, t) {
            return new (t = w(t))((t, n) => {
              let r;
              r = this.subscribe(
                (t) => {
                  try {
                    e(t);
                  } catch (s) {
                    n(s), r && r.unsubscribe();
                  }
                },
                n,
                t
              );
            });
          }
          _subscribe(e) {
            const { source: t } = this;
            return t && t.subscribe(e);
          }
          [m]() {
            return this;
          }
          pipe(...e) {
            return 0 === e.length ? this : v(e)(this);
          }
          toPromise(e) {
            return new (e = w(e))((e, t) => {
              let n;
              this.subscribe(
                (e) => (n = e),
                (e) => t(e),
                () => e(n)
              );
            });
          }
        }
        return (e.create = (t) => new e(t)), e;
      })();
      function w(e) {
        if ((e || (e = i.Promise || Promise), !e))
          throw new Error("no Promise impl found");
        return e;
      }
      const C = (() => {
        function e() {
          return (
            Error.call(this),
            (this.message = "object unsubscribed"),
            (this.name = "ObjectUnsubscribedError"),
            this
          );
        }
        return (e.prototype = Object.create(Error.prototype)), e;
      })();
      class S extends h {
        constructor(e, t) {
          super(),
            (this.subject = e),
            (this.subscriber = t),
            (this.closed = !1);
        }
        unsubscribe() {
          if (this.closed) return;
          this.closed = !0;
          const e = this.subject,
            t = e.observers;
          if (
            ((this.subject = null),
            !t || 0 === t.length || e.isStopped || e.closed)
          )
            return;
          const n = t.indexOf(this.subscriber);
          -1 !== n && t.splice(n, 1);
        }
      }
      class E extends f {
        constructor(e) {
          super(e), (this.destination = e);
        }
      }
      let T = (() => {
        class e extends b {
          constructor() {
            super(),
              (this.observers = []),
              (this.closed = !1),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          [p]() {
            return new E(this);
          }
          lift(e) {
            const t = new x(this, this);
            return (t.operator = e), t;
          }
          next(e) {
            if (this.closed) throw new C();
            if (!this.isStopped) {
              const { observers: t } = this,
                n = t.length,
                r = t.slice();
              for (let s = 0; s < n; s++) r[s].next(e);
            }
          }
          error(e) {
            if (this.closed) throw new C();
            (this.hasError = !0), (this.thrownError = e), (this.isStopped = !0);
            const { observers: t } = this,
              n = t.length,
              r = t.slice();
            for (let s = 0; s < n; s++) r[s].error(e);
            this.observers.length = 0;
          }
          complete() {
            if (this.closed) throw new C();
            this.isStopped = !0;
            const { observers: e } = this,
              t = e.length,
              n = e.slice();
            for (let r = 0; r < t; r++) n[r].complete();
            this.observers.length = 0;
          }
          unsubscribe() {
            (this.isStopped = !0), (this.closed = !0), (this.observers = null);
          }
          _trySubscribe(e) {
            if (this.closed) throw new C();
            return super._trySubscribe(e);
          }
          _subscribe(e) {
            if (this.closed) throw new C();
            return this.hasError
              ? (e.error(this.thrownError), h.EMPTY)
              : this.isStopped
              ? (e.complete(), h.EMPTY)
              : (this.observers.push(e), new S(this, e));
          }
          asObservable() {
            const e = new b();
            return (e.source = this), e;
          }
        }
        return (e.create = (e, t) => new x(e, t)), e;
      })();
      class x extends T {
        constructor(e, t) {
          super(), (this.destination = e), (this.source = t);
        }
        next(e) {
          const { destination: t } = this;
          t && t.next && t.next(e);
        }
        error(e) {
          const { destination: t } = this;
          t && t.error && this.destination.error(e);
        }
        complete() {
          const { destination: e } = this;
          e && e.complete && this.destination.complete();
        }
        _subscribe(e) {
          const { source: t } = this;
          return t ? this.source.subscribe(e) : h.EMPTY;
        }
      }
      function k(e) {
        return e && "function" == typeof e.schedule;
      }
      function A(e, t) {
        return function (n) {
          if ("function" != typeof e)
            throw new TypeError(
              "argument is not a function. Are you looking for `mapTo()`?"
            );
          return n.lift(new I(e, t));
        };
      }
      class I {
        constructor(e, t) {
          (this.project = e), (this.thisArg = t);
        }
        call(e, t) {
          return t.subscribe(new P(e, this.project, this.thisArg));
        }
      }
      class P extends f {
        constructor(e, t, n) {
          super(e),
            (this.project = t),
            (this.count = 0),
            (this.thisArg = n || this);
        }
        _next(e) {
          let t;
          try {
            t = this.project.call(this.thisArg, e, this.count++);
          } catch (n) {
            return void this.destination.error(n);
          }
          this.destination.next(t);
        }
      }
      const N = (e) => (t) => {
        for (let n = 0, r = e.length; n < r && !t.closed; n++) t.next(e[n]);
        t.complete();
      };
      function R() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      }
      const D = R(),
        O = (e) => e && "number" == typeof e.length && "function" != typeof e;
      function M(e) {
        return (
          !!e && "function" != typeof e.subscribe && "function" == typeof e.then
        );
      }
      const F = (e) => {
        if (e && "function" == typeof e[m])
          return (
            (r = e),
            (e) => {
              const t = r[m]();
              if ("function" != typeof t.subscribe)
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              return t.subscribe(e);
            }
          );
        if (O(e)) return N(e);
        if (M(e))
          return (
            (n = e),
            (e) => (
              n
                .then(
                  (t) => {
                    e.closed || (e.next(t), e.complete());
                  },
                  (t) => e.error(t)
                )
                .then(null, o),
              e
            )
          );
        if (e && "function" == typeof e[D])
          return (
            (t = e),
            (e) => {
              const n = t[D]();
              for (;;) {
                let t;
                try {
                  t = n.next();
                } catch (r) {
                  return e.error(r), e;
                }
                if (t.done) {
                  e.complete();
                  break;
                }
                if ((e.next(t.value), e.closed)) break;
              }
              return (
                "function" == typeof n.return &&
                  e.add(() => {
                    n.return && n.return();
                  }),
                e
              );
            }
          );
        {
          const t = u(e) ? "an invalid object" : `'${e}'`;
          throw new TypeError(
            `You provided ${t} where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.`
          );
        }
        var t, n, r;
      };
      function V(e, t) {
        return new b((n) => {
          const r = new h();
          let s = 0;
          return (
            r.add(
              t.schedule(function () {
                s !== e.length
                  ? (n.next(e[s++]), n.closed || r.add(this.schedule()))
                  : n.complete();
              })
            ),
            r
          );
        });
      }
      function L(e, t) {
        return t
          ? (function (e, t) {
              if (null != e) {
                if (
                  (function (e) {
                    return e && "function" == typeof e[m];
                  })(e)
                )
                  return (function (e, t) {
                    return new b((n) => {
                      const r = new h();
                      return (
                        r.add(
                          t.schedule(() => {
                            const s = e[m]();
                            r.add(
                              s.subscribe({
                                next(e) {
                                  r.add(t.schedule(() => n.next(e)));
                                },
                                error(e) {
                                  r.add(t.schedule(() => n.error(e)));
                                },
                                complete() {
                                  r.add(t.schedule(() => n.complete()));
                                },
                              })
                            );
                          })
                        ),
                        r
                      );
                    });
                  })(e, t);
                if (M(e))
                  return (function (e, t) {
                    return new b((n) => {
                      const r = new h();
                      return (
                        r.add(
                          t.schedule(() =>
                            e.then(
                              (e) => {
                                r.add(
                                  t.schedule(() => {
                                    n.next(e),
                                      r.add(t.schedule(() => n.complete()));
                                  })
                                );
                              },
                              (e) => {
                                r.add(t.schedule(() => n.error(e)));
                              }
                            )
                          )
                        ),
                        r
                      );
                    });
                  })(e, t);
                if (O(e)) return V(e, t);
                if (
                  (function (e) {
                    return e && "function" == typeof e[D];
                  })(e) ||
                  "string" == typeof e
                )
                  return (function (e, t) {
                    if (!e) throw new Error("Iterable cannot be null");
                    return new b((n) => {
                      const r = new h();
                      let s;
                      return (
                        r.add(() => {
                          s && "function" == typeof s.return && s.return();
                        }),
                        r.add(
                          t.schedule(() => {
                            (s = e[D]()),
                              r.add(
                                t.schedule(function () {
                                  if (n.closed) return;
                                  let e, t;
                                  try {
                                    const n = s.next();
                                    (e = n.value), (t = n.done);
                                  } catch (r) {
                                    return void n.error(r);
                                  }
                                  t
                                    ? n.complete()
                                    : (n.next(e), this.schedule());
                                })
                              );
                          })
                        ),
                        r
                      );
                    });
                  })(e, t);
              }
              throw new TypeError(
                ((null !== e && typeof e) || e) + " is not observable"
              );
            })(e, t)
          : e instanceof b
          ? e
          : new b(F(e));
      }
      class U extends f {
        constructor(e) {
          super(), (this.parent = e);
        }
        _next(e) {
          this.parent.notifyNext(e);
        }
        _error(e) {
          this.parent.notifyError(e), this.unsubscribe();
        }
        _complete() {
          this.parent.notifyComplete(), this.unsubscribe();
        }
      }
      class j extends f {
        notifyNext(e) {
          this.destination.next(e);
        }
        notifyError(e) {
          this.destination.error(e);
        }
        notifyComplete() {
          this.destination.complete();
        }
      }
      function $(e, t) {
        if (t.closed) return;
        if (e instanceof b) return e.subscribe(t);
        let n;
        try {
          n = F(e)(t);
        } catch (r) {
          t.error(r);
        }
        return n;
      }
      function H(e, t, n = Number.POSITIVE_INFINITY) {
        return "function" == typeof t
          ? (r) =>
              r.pipe(
                H((n, r) => L(e(n, r)).pipe(A((e, s) => t(n, e, r, s))), n)
              )
          : ("number" == typeof t && (n = t), (t) => t.lift(new B(e, n)));
      }
      class B {
        constructor(e, t = Number.POSITIVE_INFINITY) {
          (this.project = e), (this.concurrent = t);
        }
        call(e, t) {
          return t.subscribe(new z(e, this.project, this.concurrent));
        }
      }
      class z extends j {
        constructor(e, t, n = Number.POSITIVE_INFINITY) {
          super(e),
            (this.project = t),
            (this.concurrent = n),
            (this.hasCompleted = !1),
            (this.buffer = []),
            (this.active = 0),
            (this.index = 0);
        }
        _next(e) {
          this.active < this.concurrent
            ? this._tryNext(e)
            : this.buffer.push(e);
        }
        _tryNext(e) {
          let t;
          const n = this.index++;
          try {
            t = this.project(e, n);
          } catch (r) {
            return void this.destination.error(r);
          }
          this.active++, this._innerSub(t);
        }
        _innerSub(e) {
          const t = new U(this),
            n = this.destination;
          n.add(t);
          const r = $(e, t);
          r !== t && n.add(r);
        }
        _complete() {
          (this.hasCompleted = !0),
            0 === this.active &&
              0 === this.buffer.length &&
              this.destination.complete(),
            this.unsubscribe();
        }
        notifyNext(e) {
          this.destination.next(e);
        }
        notifyComplete() {
          const e = this.buffer;
          this.active--,
            e.length > 0
              ? this._next(e.shift())
              : 0 === this.active &&
                this.hasCompleted &&
                this.destination.complete();
        }
      }
      function q(e = Number.POSITIVE_INFINITY) {
        return H(y, e);
      }
      function W(e, t) {
        return t ? V(e, t) : new b(N(e));
      }
      function G() {
        return function (e) {
          return e.lift(new K(e));
        };
      }
      class K {
        constructor(e) {
          this.connectable = e;
        }
        call(e, t) {
          const { connectable: n } = this;
          n._refCount++;
          const r = new Q(e, n),
            s = t.subscribe(r);
          return r.closed || (r.connection = n.connect()), s;
        }
      }
      class Q extends f {
        constructor(e, t) {
          super(e), (this.connectable = t);
        }
        _unsubscribe() {
          const { connectable: e } = this;
          if (!e) return void (this.connection = null);
          this.connectable = null;
          const t = e._refCount;
          if (t <= 0) return void (this.connection = null);
          if (((e._refCount = t - 1), t > 1))
            return void (this.connection = null);
          const { connection: n } = this,
            r = e._connection;
          (this.connection = null), !r || (n && r !== n) || r.unsubscribe();
        }
      }
      class Z extends b {
        constructor(e, t) {
          super(),
            (this.source = e),
            (this.subjectFactory = t),
            (this._refCount = 0),
            (this._isComplete = !1);
        }
        _subscribe(e) {
          return this.getSubject().subscribe(e);
        }
        getSubject() {
          const e = this._subject;
          return (
            (e && !e.isStopped) || (this._subject = this.subjectFactory()),
            this._subject
          );
        }
        connect() {
          let e = this._connection;
          return (
            e ||
              ((this._isComplete = !1),
              (e = this._connection = new h()),
              e.add(this.source.subscribe(new J(this.getSubject(), this))),
              e.closed && ((this._connection = null), (e = h.EMPTY))),
            e
          );
        }
        refCount() {
          return G()(this);
        }
      }
      const X = (() => {
        const e = Z.prototype;
        return {
          operator: { value: null },
          _refCount: { value: 0, writable: !0 },
          _subject: { value: null, writable: !0 },
          _connection: { value: null, writable: !0 },
          _subscribe: { value: e._subscribe },
          _isComplete: { value: e._isComplete, writable: !0 },
          getSubject: { value: e.getSubject },
          connect: { value: e.connect },
          refCount: { value: e.refCount },
        };
      })();
      class J extends E {
        constructor(e, t) {
          super(e), (this.connectable = t);
        }
        _error(e) {
          this._unsubscribe(), super._error(e);
        }
        _complete() {
          (this.connectable._isComplete = !0),
            this._unsubscribe(),
            super._complete();
        }
        _unsubscribe() {
          const e = this.connectable;
          if (e) {
            this.connectable = null;
            const t = e._connection;
            (e._refCount = 0),
              (e._subject = null),
              (e._connection = null),
              t && t.unsubscribe();
          }
        }
      }
      function Y() {
        return new T();
      }
      function ee(e, t, n) {
        const r = (function (e) {
          return function (...t) {
            if (e) {
              const n = e(...t);
              for (const e in n) this[e] = n[e];
            }
          };
        })(t);
        function s(...e) {
          if (this instanceof s) return r.apply(this, e), this;
          const t = new s(...e);
          return (n.annotation = t), n;
          function n(e, n, r) {
            const s = e.hasOwnProperty("__parameters__")
              ? e.__parameters__
              : Object.defineProperty(e, "__parameters__", { value: [] })
                  .__parameters__;
            for (; s.length <= r; ) s.push(null);
            return (s[r] = s[r] || []).push(t), e;
          }
        }
        return (
          n && (s.prototype = Object.create(n.prototype)),
          (s.prototype.ngMetadataName = e),
          (s.annotationCls = s),
          s
        );
      }
      const te = ee("Inject", (e) => ({ token: e })),
        ne = ee("Optional"),
        re = ee("Self"),
        se = ee("SkipSelf");
      var ie = (function (e) {
        return (
          (e[(e.Default = 0)] = "Default"),
          (e[(e.Host = 1)] = "Host"),
          (e[(e.Self = 2)] = "Self"),
          (e[(e.SkipSelf = 4)] = "SkipSelf"),
          (e[(e.Optional = 8)] = "Optional"),
          e
        );
      })({});
      function oe(e) {
        for (let t in e) if (e[t] === oe) return t;
        throw Error("Could not find renamed property on target object.");
      }
      function le(e) {
        return {
          token: e.token,
          providedIn: e.providedIn || null,
          factory: e.factory,
          value: void 0,
        };
      }
      function ae(e) {
        const t = e[ue];
        return t && t.token === e ? t : null;
      }
      const ue = oe({ ngInjectableDef: oe });
      function ce(e) {
        if ("string" == typeof e) return e;
        if (e instanceof Array) return "[" + e.map(ce).join(", ") + "]";
        if (null == e) return "" + e;
        if (e.overriddenName) return "" + e.overriddenName;
        if (e.name) return "" + e.name;
        const t = e.toString();
        if (null == t) return "" + t;
        const n = t.indexOf("\n");
        return -1 === n ? t : t.substring(0, n);
      }
      const he = oe({ __forward_ref__: oe });
      function de(e) {
        return (
          (e.__forward_ref__ = de),
          (e.toString = function () {
            return ce(this());
          }),
          e
        );
      }
      function pe(e) {
        const t = e;
        return "function" == typeof t &&
          t.hasOwnProperty(he) &&
          t.__forward_ref__ === de
          ? t()
          : e;
      }
      const fe = "undefined" != typeof globalThis && globalThis,
        ge = "undefined" != typeof window && window,
        me =
          "undefined" != typeof self &&
          "undefined" != typeof WorkerGlobalScope &&
          self instanceof WorkerGlobalScope &&
          self,
        ye = "undefined" != typeof global && global,
        _e = fe || ye || ge || me;
      class ve {
        constructor(e, t) {
          (this._desc = e),
            (this.ngMetadataName = "InjectionToken"),
            (this.ngInjectableDef = void 0),
            "number" == typeof t
              ? (this.__NG_ELEMENT_ID__ = t)
              : void 0 !== t &&
                (this.ngInjectableDef = le({
                  token: this,
                  providedIn: t.providedIn || "root",
                  factory: t.factory,
                }));
        }
        toString() {
          return "InjectionToken " + this._desc;
        }
      }
      const be = new ve("INJECTOR", -1),
        we = new Object(),
        Ce = /\n/gm,
        Se = oe({ provide: String, useValue: oe });
      let Ee = void 0;
      function Te(e) {
        const t = Ee;
        return (Ee = e), t;
      }
      function xe(e, t = ie.Default) {
        return (function (e, t = ie.Default) {
          if (void 0 === Ee)
            throw new Error(
              "inject() must be called from an injection context"
            );
          return null === Ee
            ? (function (e, t, n) {
                const r = ae(e);
                if (r && "root" == r.providedIn)
                  return void 0 === r.value ? (r.value = r.factory()) : r.value;
                if (n & ie.Optional) return null;
                throw new Error(`Injector: NOT_FOUND [${ce(e)}]`);
              })(e, 0, t)
            : Ee.get(e, t & ie.Optional ? null : void 0, t);
        })(e, t);
      }
      class ke {
        get(e, t = we) {
          if (t === we) {
            const t = new Error(`NullInjectorError: No provider for ${ce(e)}!`);
            throw ((t.name = "NullInjectorError"), t);
          }
          return t;
        }
      }
      function Ae(e, t, n, r = null) {
        e =
          e && "\n" === e.charAt(0) && "\u0275" == e.charAt(1)
            ? e.substr(2)
            : e;
        let s = ce(t);
        if (t instanceof Array) s = t.map(ce).join(" -> ");
        else if ("object" == typeof t) {
          let e = [];
          for (let n in t)
            if (t.hasOwnProperty(n)) {
              let r = t[n];
              e.push(
                n + ":" + ("string" == typeof r ? JSON.stringify(r) : ce(r))
              );
            }
          s = `{${e.join(", ")}}`;
        }
        return `${n}${r ? "(" + r + ")" : ""}[${s}]: ${e.replace(Ce, "\n  ")}`;
      }
      class Ie {}
      class Pe {}
      function Ne(e, t, n) {
        t >= e.length ? e.push(n) : e.splice(t, 0, n);
      }
      function Re(e, t) {
        return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
      }
      const De = (function () {
          var e = { Emulated: 0, Native: 1, None: 2, ShadowDom: 3 };
          return (
            (e[e.Emulated] = "Emulated"),
            (e[e.Native] = "Native"),
            (e[e.None] = "None"),
            (e[e.ShadowDom] = "ShadowDom"),
            e
          );
        })(),
        Oe = (() =>
          (
            ("undefined" != typeof requestAnimationFrame &&
              requestAnimationFrame) ||
            setTimeout
          ).bind(_e))();
      function Me(e) {
        return e.ngDebugContext;
      }
      function Fe(e) {
        return e.ngOriginalError;
      }
      function Ve(e, ...t) {
        e.error(...t);
      }
      class Le {
        constructor() {
          this._console = console;
        }
        handleError(e) {
          const t = this._findOriginalError(e),
            n = this._findContext(e),
            r = (function (e) {
              return e.ngErrorLogger || Ve;
            })(e);
          r(this._console, "ERROR", e),
            t && r(this._console, "ORIGINAL ERROR", t),
            n && r(this._console, "ERROR CONTEXT", n);
        }
        _findContext(e) {
          return e ? (Me(e) ? Me(e) : this._findContext(Fe(e))) : null;
        }
        _findOriginalError(e) {
          let t = Fe(e);
          for (; t && Fe(t); ) t = Fe(t);
          return t;
        }
      }
      let Ue = !0,
        je = !1;
      function $e() {
        return (je = !0), Ue;
      }
      class He {
        constructor(e) {
          if (
            ((this.defaultDoc = e),
            (this.inertDocument =
              this.defaultDoc.implementation.createHTMLDocument(
                "sanitization-inert"
              )),
            (this.inertBodyElement = this.inertDocument.body),
            null == this.inertBodyElement)
          ) {
            const e = this.inertDocument.createElement("html");
            this.inertDocument.appendChild(e),
              (this.inertBodyElement =
                this.inertDocument.createElement("body")),
              e.appendChild(this.inertBodyElement);
          }
          (this.inertBodyElement.innerHTML =
            '<svg><g onload="this.parentNode.remove()"></g></svg>'),
            !this.inertBodyElement.querySelector ||
            this.inertBodyElement.querySelector("svg")
              ? ((this.inertBodyElement.innerHTML =
                  '<svg><p><style><img src="</style><img src=x onerror=alert(1)//">'),
                (this.getInertBodyElement =
                  this.inertBodyElement.querySelector &&
                  this.inertBodyElement.querySelector("svg img") &&
                  (function () {
                    try {
                      return !!window.DOMParser;
                    } catch (e) {
                      return !1;
                    }
                  })()
                    ? this.getInertBodyElement_DOMParser
                    : this.getInertBodyElement_InertDocument))
              : (this.getInertBodyElement = this.getInertBodyElement_XHR);
        }
        getInertBodyElement_XHR(e) {
          e = "<body><remove></remove>" + e + "</body>";
          try {
            e = encodeURI(e);
          } catch (r) {
            return null;
          }
          const t = new XMLHttpRequest();
          (t.responseType = "document"),
            t.open("GET", "data:text/html;charset=utf-8," + e, !1),
            t.send(void 0);
          const n = t.response.body;
          return n.removeChild(n.firstChild), n;
        }
        getInertBodyElement_DOMParser(e) {
          e = "<body><remove></remove>" + e + "</body>";
          try {
            const t = new window.DOMParser().parseFromString(
              e,
              "text/html"
            ).body;
            return t.removeChild(t.firstChild), t;
          } catch (t) {
            return null;
          }
        }
        getInertBodyElement_InertDocument(e) {
          const t = this.inertDocument.createElement("template");
          return "content" in t
            ? ((t.innerHTML = e), t)
            : ((this.inertBodyElement.innerHTML = e),
              this.defaultDoc.documentMode &&
                this.stripCustomNsAttrs(this.inertBodyElement),
              this.inertBodyElement);
        }
        stripCustomNsAttrs(e) {
          const t = e.attributes;
          for (let r = t.length - 1; 0 < r; r--) {
            const n = t.item(r).name;
            ("xmlns:ns1" !== n && 0 !== n.indexOf("ns1:")) ||
              e.removeAttribute(n);
          }
          let n = e.firstChild;
          for (; n; )
            n.nodeType === Node.ELEMENT_NODE && this.stripCustomNsAttrs(n),
              (n = n.nextSibling);
        }
      }
      const Be = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi,
        ze =
          /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;
      function qe(e) {
        return (e = String(e)).match(Be) || e.match(ze)
          ? e
          : ($e() &&
              console.warn(
                `WARNING: sanitizing unsafe URL value ${e} (see http://g.co/ng/security#xss)`
              ),
            "unsafe:" + e);
      }
      function We(e) {
        const t = {};
        for (const n of e.split(",")) t[n] = !0;
        return t;
      }
      function Ge(...e) {
        const t = {};
        for (const n of e)
          for (const e in n) n.hasOwnProperty(e) && (t[e] = !0);
        return t;
      }
      const Ke = We("area,br,col,hr,img,wbr"),
        Qe = We("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),
        Ze = We("rp,rt"),
        Xe = Ge(Ze, Qe),
        Je = Ge(
          Ke,
          Ge(
            Qe,
            We(
              "address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul"
            )
          ),
          Ge(
            Ze,
            We(
              "a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video"
            )
          ),
          Xe
        ),
        Ye = We("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),
        et = We("srcset"),
        tt = Ge(
          Ye,
          et,
          We(
            "abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"
          ),
          We(
            "aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"
          )
        ),
        nt = We("script,style,template");
      class rt {
        constructor() {
          (this.sanitizedSomething = !1), (this.buf = []);
        }
        sanitizeChildren(e) {
          let t = e.firstChild,
            n = !0;
          for (; t; )
            if (
              (t.nodeType === Node.ELEMENT_NODE
                ? (n = this.startElement(t))
                : t.nodeType === Node.TEXT_NODE
                ? this.chars(t.nodeValue)
                : (this.sanitizedSomething = !0),
              n && t.firstChild)
            )
              t = t.firstChild;
            else
              for (; t; ) {
                t.nodeType === Node.ELEMENT_NODE && this.endElement(t);
                let e = this.checkClobberedElement(t, t.nextSibling);
                if (e) {
                  t = e;
                  break;
                }
                t = this.checkClobberedElement(t, t.parentNode);
              }
          return this.buf.join("");
        }
        startElement(e) {
          const t = e.nodeName.toLowerCase();
          if (!Je.hasOwnProperty(t))
            return (this.sanitizedSomething = !0), !nt.hasOwnProperty(t);
          this.buf.push("<"), this.buf.push(t);
          const n = e.attributes;
          for (let s = 0; s < n.length; s++) {
            const e = n.item(s),
              t = e.name,
              i = t.toLowerCase();
            if (!tt.hasOwnProperty(i)) {
              this.sanitizedSomething = !0;
              continue;
            }
            let o = e.value;
            Ye[i] && (o = qe(o)),
              et[i] &&
                ((r = o),
                (o = (r = String(r))
                  .split(",")
                  .map((e) => qe(e.trim()))
                  .join(", "))),
              this.buf.push(" ", t, '="', ot(o), '"');
          }
          var r;
          return this.buf.push(">"), !0;
        }
        endElement(e) {
          const t = e.nodeName.toLowerCase();
          Je.hasOwnProperty(t) &&
            !Ke.hasOwnProperty(t) &&
            (this.buf.push("</"), this.buf.push(t), this.buf.push(">"));
        }
        chars(e) {
          this.buf.push(ot(e));
        }
        checkClobberedElement(e, t) {
          if (
            t &&
            (e.compareDocumentPosition(t) &
              Node.DOCUMENT_POSITION_CONTAINED_BY) ===
              Node.DOCUMENT_POSITION_CONTAINED_BY
          )
            throw new Error(
              "Failed to sanitize html because the element is clobbered: " +
                e.outerHTML
            );
          return t;
        }
      }
      const st = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
        it = /([^\#-~ |!])/g;
      function ot(e) {
        return e
          .replace(/&/g, "&amp;")
          .replace(st, function (e) {
            return (
              "&#" +
              (1024 * (e.charCodeAt(0) - 55296) +
                (e.charCodeAt(1) - 56320) +
                65536) +
              ";"
            );
          })
          .replace(it, function (e) {
            return "&#" + e.charCodeAt(0) + ";";
          })
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
      }
      let lt;
      function at(e) {
        return "content" in e &&
          (function (e) {
            return (
              e.nodeType === Node.ELEMENT_NODE && "TEMPLATE" === e.nodeName
            );
          })(e)
          ? e.content
          : null;
      }
      const ut = (function () {
        var e = {
          NONE: 0,
          HTML: 1,
          STYLE: 2,
          SCRIPT: 3,
          URL: 4,
          RESOURCE_URL: 5,
        };
        return (
          (e[e.NONE] = "NONE"),
          (e[e.HTML] = "HTML"),
          (e[e.STYLE] = "STYLE"),
          (e[e.SCRIPT] = "SCRIPT"),
          (e[e.URL] = "URL"),
          (e[e.RESOURCE_URL] = "RESOURCE_URL"),
          e
        );
      })();
      class ct {}
      const ht = new RegExp(
          "^([-,.\"'%_!# a-zA-Z0-9]+|(?:(?:matrix|translate|scale|rotate|skew|perspective)(?:X|Y|Z|3d)?|(?:rgb|hsl)a?|(?:repeating-)?(?:linear|radial)-gradient|(?:calc|attr))\\([-0-9.%, #a-zA-Z]+\\))$",
          "g"
        ),
        dt = /^url\(([^)]+)\)$/,
        pt = /([A-Z])/g;
      function ft(e) {
        try {
          return null != e ? e.toString().slice(0, 30) : e;
        } catch (t) {
          return "[ERROR] Exception while trying to serialize the value";
        }
      }
      let gt = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = () => mt()), e;
      })();
      const mt = (...e) => {},
        yt = new ve(
          "The presence of this token marks an injector as being the root injector."
        ),
        _t = function (e, t, n) {
          return new Et(e, t, n);
        };
      let vt = (() => {
        class e {
          static create(e, t) {
            return Array.isArray(e)
              ? _t(e, t, "")
              : _t(e.providers, e.parent, e.name || "");
          }
        }
        return (
          (e.THROW_IF_NOT_FOUND = we),
          (e.NULL = new ke()),
          (e.ngInjectableDef = le({
            token: e,
            providedIn: "any",
            factory: () => xe(be),
          })),
          (e.__NG_ELEMENT_ID__ = -1),
          e
        );
      })();
      const bt = function (e) {
          return e;
        },
        wt = [],
        Ct = bt,
        St = function () {
          return Array.prototype.slice.call(arguments);
        };
      class Et {
        constructor(e, t = vt.NULL, n = null) {
          (this.parent = t), (this.source = n);
          const r = (this._records = new Map());
          r.set(vt, { token: vt, fn: bt, deps: wt, value: this, useNew: !1 }),
            r.set(be, { token: be, fn: bt, deps: wt, value: this, useNew: !1 }),
            (function e(t, n) {
              if (n)
                if ((n = pe(n)) instanceof Array)
                  for (let r = 0; r < n.length; r++) e(t, n[r]);
                else {
                  if ("function" == typeof n)
                    throw xt("Function/Class not supported", n);
                  if (!n || "object" != typeof n || !n.provide)
                    throw xt("Unexpected provider", n);
                  {
                    let e = pe(n.provide);
                    const r = (function (e) {
                      const t = (function (e) {
                        let t = wt;
                        const n = e.deps;
                        if (n && n.length) {
                          t = [];
                          for (let e = 0; e < n.length; e++) {
                            let r = 6,
                              s = pe(n[e]);
                            if (s instanceof Array)
                              for (let e = 0, t = s; e < t.length; e++) {
                                const n = t[e];
                                n instanceof ne || n == ne
                                  ? (r |= 1)
                                  : n instanceof se || n == se
                                  ? (r &= -3)
                                  : n instanceof re || n == re
                                  ? (r &= -5)
                                  : (s = n instanceof te ? n.token : pe(n));
                              }
                            t.push({ token: s, options: r });
                          }
                        } else if (e.useExisting)
                          t = [{ token: pe(e.useExisting), options: 6 }];
                        else if (!n && !(Se in e))
                          throw xt("'deps' required", e);
                        return t;
                      })(e);
                      let n = bt,
                        r = wt,
                        s = !1,
                        i = pe(e.provide);
                      if (Se in e) r = e.useValue;
                      else if (e.useFactory) n = e.useFactory;
                      else if (e.useExisting);
                      else if (e.useClass) (s = !0), (n = pe(e.useClass));
                      else {
                        if ("function" != typeof i)
                          throw xt(
                            "StaticProvider does not have [useValue|useFactory|useExisting|useClass] or [provide] is not newable",
                            e
                          );
                        (s = !0), (n = i);
                      }
                      return { deps: t, fn: n, useNew: s, value: r };
                    })(n);
                    if (!0 === n.multi) {
                      let r = t.get(e);
                      if (r) {
                        if (r.fn !== St) throw Tt(e);
                      } else
                        t.set(
                          e,
                          (r = {
                            token: n.provide,
                            deps: [],
                            useNew: !1,
                            fn: St,
                            value: wt,
                          })
                        );
                      (e = n), r.deps.push({ token: e, options: 6 });
                    }
                    const s = t.get(e);
                    if (s && s.fn == St) throw Tt(e);
                    t.set(e, r);
                  }
                }
            })(r, e);
        }
        get(e, t, n = ie.Default) {
          const r = this._records.get(e);
          try {
            return (function e(t, n, r, s, i, o) {
              try {
                return (function (t, n, r, s, i, o) {
                  let l;
                  if (!n || o & ie.SkipSelf)
                    o & ie.Self || (l = s.get(t, i, ie.Default));
                  else {
                    if (((l = n.value), l == Ct))
                      throw Error("\u0275Circular dependency");
                    if (l === wt) {
                      n.value = Ct;
                      let t = void 0,
                        i = n.useNew,
                        o = n.fn,
                        a = n.deps,
                        u = wt;
                      if (a.length) {
                        u = [];
                        for (let t = 0; t < a.length; t++) {
                          const n = a[t],
                            i = n.options,
                            o = 2 & i ? r.get(n.token) : void 0;
                          u.push(
                            e(
                              n.token,
                              o,
                              r,
                              o || 4 & i ? s : vt.NULL,
                              1 & i ? null : vt.THROW_IF_NOT_FOUND,
                              ie.Default
                            )
                          );
                        }
                      }
                      n.value = l = i ? new o(...u) : o.apply(t, u);
                    }
                  }
                  return l;
                })(t, n, r, s, i, o);
              } catch (l) {
                throw (
                  (l instanceof Error || (l = new Error(l)),
                  (l.ngTempTokenPath = l.ngTempTokenPath || []).unshift(t),
                  n && n.value == Ct && (n.value = wt),
                  l)
                );
              }
            })(e, r, this._records, this.parent, t, n);
          } catch (s) {
            return (function (e, t, n, r) {
              const s = e.ngTempTokenPath;
              throw (
                (t.__source && s.unshift(t.__source),
                (e.message = Ae("\n" + e.message, s, "StaticInjectorError", r)),
                (e.ngTokenPath = s),
                (e.ngTempTokenPath = null),
                e)
              );
            })(s, e, 0, this.source);
          }
        }
        toString() {
          const e = [];
          return (
            this._records.forEach((t, n) => e.push(ce(n))),
            `StaticInjector[${e.join(", ")}]`
          );
        }
      }
      function Tt(e) {
        return xt("Cannot mix multi providers and regular providers", e);
      }
      function xt(e, t) {
        return new Error(Ae(e, t, "StaticInjectorError"));
      }
      const kt = new ve("AnalyzeForEntryComponents");
      let At = null;
      function It() {
        if (!At) {
          const e = _e.Symbol;
          if (e && e.iterator) At = e.iterator;
          else {
            const e = Object.getOwnPropertyNames(Map.prototype);
            for (let t = 0; t < e.length; ++t) {
              const n = e[t];
              "entries" !== n &&
                "size" !== n &&
                Map.prototype[n] === Map.prototype.entries &&
                (At = n);
            }
          }
        }
        return At;
      }
      function Pt(e, t) {
        return (
          e === t ||
          ("number" == typeof e && "number" == typeof t && isNaN(e) && isNaN(t))
        );
      }
      function Nt(e, t) {
        const n = Dt(e),
          r = Dt(t);
        if (n && r)
          return (function (e, t, n) {
            const r = e[It()](),
              s = t[It()]();
            for (;;) {
              const e = r.next(),
                t = s.next();
              if (e.done && t.done) return !0;
              if (e.done || t.done) return !1;
              if (!n(e.value, t.value)) return !1;
            }
          })(e, t, Nt);
        {
          const s = e && ("object" == typeof e || "function" == typeof e),
            i = t && ("object" == typeof t || "function" == typeof t);
          return !(n || !s || r || !i) || Pt(e, t);
        }
      }
      class Rt {
        constructor(e) {
          this.wrapped = e;
        }
        static wrap(e) {
          return new Rt(e);
        }
        static unwrap(e) {
          return Rt.isWrapped(e) ? e.wrapped : e;
        }
        static isWrapped(e) {
          return e instanceof Rt;
        }
      }
      function Dt(e) {
        return (
          !!Ot(e) && (Array.isArray(e) || (!(e instanceof Map) && It() in e))
        );
      }
      function Ot(e) {
        return null !== e && ("function" == typeof e || "object" == typeof e);
      }
      function Mt(e) {
        return !!e && "function" == typeof e.then;
      }
      function Ft(e) {
        return !!e && "function" == typeof e.subscribe;
      }
      class Vt {
        constructor(e, t, n) {
          (this.previousValue = e),
            (this.currentValue = t),
            (this.firstChange = n);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      class Lt {}
      function Ut(e) {
        const t = Error(
          `No component factory found for ${ce(
            e
          )}. Did you add it to @NgModule.entryComponents?`
        );
        return (t[jt] = e), t;
      }
      const jt = "ngComponent";
      class $t {
        resolveComponentFactory(e) {
          throw Ut(e);
        }
      }
      let Ht = (() => {
        class e {}
        return (e.NULL = new $t()), e;
      })();
      class Bt {
        constructor(e, t, n) {
          (this._parent = t),
            (this._ngModule = n),
            (this._factories = new Map());
          for (let r = 0; r < e.length; r++) {
            const t = e[r];
            this._factories.set(t.componentType, t);
          }
        }
        resolveComponentFactory(e) {
          let t = this._factories.get(e);
          if (
            (!t &&
              this._parent &&
              (t = this._parent.resolveComponentFactory(e)),
            !t)
          )
            throw Ut(e);
          return new zt(t, this._ngModule);
        }
      }
      class zt extends Lt {
        constructor(e, t) {
          super(),
            (this.factory = e),
            (this.ngModule = t),
            (this.selector = e.selector),
            (this.componentType = e.componentType),
            (this.ngContentSelectors = e.ngContentSelectors),
            (this.inputs = e.inputs),
            (this.outputs = e.outputs);
        }
        create(e, t, n, r) {
          return this.factory.create(e, t, n, r || this.ngModule);
        }
      }
      function qt(...e) {}
      let Wt = (() => {
        class e {
          constructor(e) {
            this.nativeElement = e;
          }
        }
        return (e.__NG_ELEMENT_ID__ = () => Gt(e)), e;
      })();
      const Gt = qt;
      class Kt {}
      class Qt {}
      const Zt = (function () {
        var e = { Important: 1, DashCase: 2 };
        return (e[e.Important] = "Important"), (e[e.DashCase] = "DashCase"), e;
      })();
      let Xt = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = () => Jt()), e;
      })();
      const Jt = qt;
      class Yt {
        constructor(e) {
          (this.full = e),
            (this.major = e.split(".")[0]),
            (this.minor = e.split(".")[1]),
            (this.patch = e.split(".").slice(2).join("."));
        }
      }
      const en = new Yt("8.2.14");
      class tn {
        constructor() {}
        supports(e) {
          return Dt(e);
        }
        create(e) {
          return new rn(e);
        }
      }
      const nn = (e, t) => t;
      class rn {
        constructor(e) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = e || nn);
        }
        forEachItem(e) {
          let t;
          for (t = this._itHead; null !== t; t = t._next) e(t);
        }
        forEachOperation(e) {
          let t = this._itHead,
            n = this._removalsHead,
            r = 0,
            s = null;
          for (; t || n; ) {
            const i = !n || (t && t.currentIndex < an(n, r, s)) ? t : n,
              o = an(i, r, s),
              l = i.currentIndex;
            if (i === n) r--, (n = n._nextRemoved);
            else if (((t = t._next), null == i.previousIndex)) r++;
            else {
              s || (s = []);
              const e = o - r,
                t = l - r;
              if (e != t) {
                for (let n = 0; n < e; n++) {
                  const r = n < s.length ? s[n] : (s[n] = 0),
                    i = r + n;
                  t <= i && i < e && (s[n] = r + 1);
                }
                s[i.previousIndex] = t - e;
              }
            }
            o !== l && e(i, o, l);
          }
        }
        forEachPreviousItem(e) {
          let t;
          for (t = this._previousItHead; null !== t; t = t._nextPrevious) e(t);
        }
        forEachAddedItem(e) {
          let t;
          for (t = this._additionsHead; null !== t; t = t._nextAdded) e(t);
        }
        forEachMovedItem(e) {
          let t;
          for (t = this._movesHead; null !== t; t = t._nextMoved) e(t);
        }
        forEachRemovedItem(e) {
          let t;
          for (t = this._removalsHead; null !== t; t = t._nextRemoved) e(t);
        }
        forEachIdentityChange(e) {
          let t;
          for (
            t = this._identityChangesHead;
            null !== t;
            t = t._nextIdentityChange
          )
            e(t);
        }
        diff(e) {
          if ((null == e && (e = []), !Dt(e)))
            throw new Error(
              `Error trying to diff '${ce(
                e
              )}'. Only arrays and iterables are allowed`
            );
          return this.check(e) ? this : null;
        }
        onDestroy() {}
        check(e) {
          this._reset();
          let t,
            n,
            r,
            s = this._itHead,
            i = !1;
          if (Array.isArray(e)) {
            this.length = e.length;
            for (let t = 0; t < this.length; t++)
              (n = e[t]),
                (r = this._trackByFn(t, n)),
                null !== s && Pt(s.trackById, r)
                  ? (i && (s = this._verifyReinsertion(s, n, r, t)),
                    Pt(s.item, n) || this._addIdentityChange(s, n))
                  : ((s = this._mismatch(s, n, r, t)), (i = !0)),
                (s = s._next);
          } else
            (t = 0),
              (function (e, t) {
                if (Array.isArray(e))
                  for (let n = 0; n < e.length; n++) t(e[n]);
                else {
                  const n = e[It()]();
                  let r;
                  for (; !(r = n.next()).done; ) t(r.value);
                }
              })(e, (e) => {
                (r = this._trackByFn(t, e)),
                  null !== s && Pt(s.trackById, r)
                    ? (i && (s = this._verifyReinsertion(s, e, r, t)),
                      Pt(s.item, e) || this._addIdentityChange(s, e))
                    : ((s = this._mismatch(s, e, r, t)), (i = !0)),
                  (s = s._next),
                  t++;
              }),
              (this.length = t);
          return this._truncate(s), (this.collection = e), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let e, t;
            for (
              e = this._previousItHead = this._itHead;
              null !== e;
              e = e._next
            )
              e._nextPrevious = e._next;
            for (e = this._additionsHead; null !== e; e = e._nextAdded)
              e.previousIndex = e.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                e = this._movesHead;
              null !== e;
              e = t
            )
              (e.previousIndex = e.currentIndex), (t = e._nextMoved);
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(e, t, n, r) {
          let s;
          return (
            null === e ? (s = this._itTail) : ((s = e._prev), this._remove(e)),
            null !==
            (e =
              null === this._linkedRecords
                ? null
                : this._linkedRecords.get(n, r))
              ? (Pt(e.item, t) || this._addIdentityChange(e, t),
                this._moveAfter(e, s, r))
              : null !==
                (e =
                  null === this._unlinkedRecords
                    ? null
                    : this._unlinkedRecords.get(n, null))
              ? (Pt(e.item, t) || this._addIdentityChange(e, t),
                this._reinsertAfter(e, s, r))
              : (e = this._addAfter(new sn(t, n), s, r)),
            e
          );
        }
        _verifyReinsertion(e, t, n, r) {
          let s =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(n, null);
          return (
            null !== s
              ? (e = this._reinsertAfter(s, e._prev, r))
              : e.currentIndex != r &&
                ((e.currentIndex = r), this._addToMoves(e, r)),
            e
          );
        }
        _truncate(e) {
          for (; null !== e; ) {
            const t = e._next;
            this._addToRemovals(this._unlink(e)), (e = t);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(e, t, n) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(e);
          const r = e._prevRemoved,
            s = e._nextRemoved;
          return (
            null === r ? (this._removalsHead = s) : (r._nextRemoved = s),
            null === s ? (this._removalsTail = r) : (s._prevRemoved = r),
            this._insertAfter(e, t, n),
            this._addToMoves(e, n),
            e
          );
        }
        _moveAfter(e, t, n) {
          return (
            this._unlink(e),
            this._insertAfter(e, t, n),
            this._addToMoves(e, n),
            e
          );
        }
        _addAfter(e, t, n) {
          return (
            this._insertAfter(e, t, n),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = e)
                : (this._additionsTail._nextAdded = e)),
            e
          );
        }
        _insertAfter(e, t, n) {
          const r = null === t ? this._itHead : t._next;
          return (
            (e._next = r),
            (e._prev = t),
            null === r ? (this._itTail = e) : (r._prev = e),
            null === t ? (this._itHead = e) : (t._next = e),
            null === this._linkedRecords && (this._linkedRecords = new ln()),
            this._linkedRecords.put(e),
            (e.currentIndex = n),
            e
          );
        }
        _remove(e) {
          return this._addToRemovals(this._unlink(e));
        }
        _unlink(e) {
          null !== this._linkedRecords && this._linkedRecords.remove(e);
          const t = e._prev,
            n = e._next;
          return (
            null === t ? (this._itHead = n) : (t._next = n),
            null === n ? (this._itTail = t) : (n._prev = t),
            e
          );
        }
        _addToMoves(e, t) {
          return (
            e.previousIndex === t ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = e)
                  : (this._movesTail._nextMoved = e)),
            e
          );
        }
        _addToRemovals(e) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new ln()),
            this._unlinkedRecords.put(e),
            (e.currentIndex = null),
            (e._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = e),
                (e._prevRemoved = null))
              : ((e._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = e)),
            e
          );
        }
        _addIdentityChange(e, t) {
          return (
            (e.item = t),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = e)
                : (this._identityChangesTail._nextIdentityChange = e)),
            e
          );
        }
      }
      class sn {
        constructor(e, t) {
          (this.item = e),
            (this.trackById = t),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class on {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(e) {
          null === this._head
            ? ((this._head = this._tail = e),
              (e._nextDup = null),
              (e._prevDup = null))
            : ((this._tail._nextDup = e),
              (e._prevDup = this._tail),
              (e._nextDup = null),
              (this._tail = e));
        }
        get(e, t) {
          let n;
          for (n = this._head; null !== n; n = n._nextDup)
            if ((null === t || t <= n.currentIndex) && Pt(n.trackById, e))
              return n;
          return null;
        }
        remove(e) {
          const t = e._prevDup,
            n = e._nextDup;
          return (
            null === t ? (this._head = n) : (t._nextDup = n),
            null === n ? (this._tail = t) : (n._prevDup = t),
            null === this._head
          );
        }
      }
      class ln {
        constructor() {
          this.map = new Map();
        }
        put(e) {
          const t = e.trackById;
          let n = this.map.get(t);
          n || ((n = new on()), this.map.set(t, n)), n.add(e);
        }
        get(e, t) {
          const n = this.map.get(e);
          return n ? n.get(e, t) : null;
        }
        remove(e) {
          const t = e.trackById;
          return this.map.get(t).remove(e) && this.map.delete(t), e;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function an(e, t, n) {
        const r = e.previousIndex;
        if (null === r) return r;
        let s = 0;
        return n && r < n.length && (s = n[r]), r + t + s;
      }
      class un {
        constructor() {}
        supports(e) {
          return e instanceof Map || Ot(e);
        }
        create() {
          return new cn();
        }
      }
      class cn {
        constructor() {
          (this._records = new Map()),
            (this._mapHead = null),
            (this._appendAfter = null),
            (this._previousMapHead = null),
            (this._changesHead = null),
            (this._changesTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null);
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._changesHead ||
            null !== this._removalsHead
          );
        }
        forEachItem(e) {
          let t;
          for (t = this._mapHead; null !== t; t = t._next) e(t);
        }
        forEachPreviousItem(e) {
          let t;
          for (t = this._previousMapHead; null !== t; t = t._nextPrevious) e(t);
        }
        forEachChangedItem(e) {
          let t;
          for (t = this._changesHead; null !== t; t = t._nextChanged) e(t);
        }
        forEachAddedItem(e) {
          let t;
          for (t = this._additionsHead; null !== t; t = t._nextAdded) e(t);
        }
        forEachRemovedItem(e) {
          let t;
          for (t = this._removalsHead; null !== t; t = t._nextRemoved) e(t);
        }
        diff(e) {
          if (e) {
            if (!(e instanceof Map || Ot(e)))
              throw new Error(
                `Error trying to diff '${ce(
                  e
                )}'. Only maps and objects are allowed`
              );
          } else e = new Map();
          return this.check(e) ? this : null;
        }
        onDestroy() {}
        check(e) {
          this._reset();
          let t = this._mapHead;
          if (
            ((this._appendAfter = null),
            this._forEach(e, (e, n) => {
              if (t && t.key === n)
                this._maybeAddToChanges(t, e),
                  (this._appendAfter = t),
                  (t = t._next);
              else {
                const r = this._getOrCreateRecordForKey(n, e);
                t = this._insertBeforeOrAppend(t, r);
              }
            }),
            t)
          ) {
            t._prev && (t._prev._next = null), (this._removalsHead = t);
            for (let e = t; null !== e; e = e._nextRemoved)
              e === this._mapHead && (this._mapHead = null),
                this._records.delete(e.key),
                (e._nextRemoved = e._next),
                (e.previousValue = e.currentValue),
                (e.currentValue = null),
                (e._prev = null),
                (e._next = null);
          }
          return (
            this._changesTail && (this._changesTail._nextChanged = null),
            this._additionsTail && (this._additionsTail._nextAdded = null),
            this.isDirty
          );
        }
        _insertBeforeOrAppend(e, t) {
          if (e) {
            const n = e._prev;
            return (
              (t._next = e),
              (t._prev = n),
              (e._prev = t),
              n && (n._next = t),
              e === this._mapHead && (this._mapHead = t),
              (this._appendAfter = e),
              e
            );
          }
          return (
            this._appendAfter
              ? ((this._appendAfter._next = t), (t._prev = this._appendAfter))
              : (this._mapHead = t),
            (this._appendAfter = t),
            null
          );
        }
        _getOrCreateRecordForKey(e, t) {
          if (this._records.has(e)) {
            const n = this._records.get(e);
            this._maybeAddToChanges(n, t);
            const r = n._prev,
              s = n._next;
            return (
              r && (r._next = s),
              s && (s._prev = r),
              (n._next = null),
              (n._prev = null),
              n
            );
          }
          const n = new hn(e);
          return (
            this._records.set(e, n),
            (n.currentValue = t),
            this._addToAdditions(n),
            n
          );
        }
        _reset() {
          if (this.isDirty) {
            let e;
            for (
              this._previousMapHead = this._mapHead, e = this._previousMapHead;
              null !== e;
              e = e._next
            )
              e._nextPrevious = e._next;
            for (e = this._changesHead; null !== e; e = e._nextChanged)
              e.previousValue = e.currentValue;
            for (e = this._additionsHead; null != e; e = e._nextAdded)
              e.previousValue = e.currentValue;
            (this._changesHead = this._changesTail = null),
              (this._additionsHead = this._additionsTail = null),
              (this._removalsHead = null);
          }
        }
        _maybeAddToChanges(e, t) {
          Pt(t, e.currentValue) ||
            ((e.previousValue = e.currentValue),
            (e.currentValue = t),
            this._addToChanges(e));
        }
        _addToAdditions(e) {
          null === this._additionsHead
            ? (this._additionsHead = this._additionsTail = e)
            : ((this._additionsTail._nextAdded = e), (this._additionsTail = e));
        }
        _addToChanges(e) {
          null === this._changesHead
            ? (this._changesHead = this._changesTail = e)
            : ((this._changesTail._nextChanged = e), (this._changesTail = e));
        }
        _forEach(e, t) {
          e instanceof Map
            ? e.forEach(t)
            : Object.keys(e).forEach((n) => t(e[n], n));
        }
      }
      class hn {
        constructor(e) {
          (this.key = e),
            (this.previousValue = null),
            (this.currentValue = null),
            (this._nextPrevious = null),
            (this._next = null),
            (this._prev = null),
            (this._nextAdded = null),
            (this._nextRemoved = null),
            (this._nextChanged = null);
        }
      }
      let dn = (() => {
          class e {
            constructor(e) {
              this.factories = e;
            }
            static create(t, n) {
              if (null != n) {
                const e = n.factories.slice();
                t = t.concat(e);
              }
              return new e(t);
            }
            static extend(t) {
              return {
                provide: e,
                useFactory: (n) => {
                  if (!n)
                    throw new Error(
                      "Cannot extend IterableDiffers without a parent injector"
                    );
                  return e.create(t, n);
                },
                deps: [[e, new se(), new ne()]],
              };
            }
            find(e) {
              const t = this.factories.find((t) => t.supports(e));
              if (null != t) return t;
              throw new Error(
                `Cannot find a differ supporting object '${e}' of type '${
                  ((n = e), n.name || typeof n)
                }'`
              );
              var n;
            }
          }
          return (
            (e.ngInjectableDef = le({
              token: e,
              providedIn: "root",
              factory: () => new e([new tn()]),
            })),
            e
          );
        })(),
        pn = (() => {
          class e {
            constructor(e) {
              this.factories = e;
            }
            static create(t, n) {
              if (n) {
                const e = n.factories.slice();
                t = t.concat(e);
              }
              return new e(t);
            }
            static extend(t) {
              return {
                provide: e,
                useFactory: (n) => {
                  if (!n)
                    throw new Error(
                      "Cannot extend KeyValueDiffers without a parent injector"
                    );
                  return e.create(t, n);
                },
                deps: [[e, new se(), new ne()]],
              };
            }
            find(e) {
              const t = this.factories.find((t) => t.supports(e));
              if (t) return t;
              throw new Error(`Cannot find a differ supporting object '${e}'`);
            }
          }
          return (
            (e.ngInjectableDef = le({
              token: e,
              providedIn: "root",
              factory: () => new e([new un()]),
            })),
            e
          );
        })();
      const fn = [new un()],
        gn = new dn([new tn()]),
        mn = new pn(fn);
      let yn = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = () => _n(e, Wt)), e;
      })();
      const _n = qt;
      let vn = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = () => bn(e, Wt)), e;
      })();
      const bn = qt;
      function wn(e, t, n, r) {
        let s = `ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value: '${t}'. Current value: '${n}'.`;
        return (
          r &&
            (s +=
              " It seems like the view has been created after its parent and its children have been dirty checked. Has it been created in a change detection hook ?"),
          (function (e, t) {
            const n = new Error(e);
            return Cn(n, t), n;
          })(s, e)
        );
      }
      function Cn(e, t) {
        (e.ngDebugContext = t), (e.ngErrorLogger = t.logError.bind(t));
      }
      function Sn(e) {
        return new Error(
          "ViewDestroyedError: Attempt to use a destroyed view: " + e
        );
      }
      function En(e, t, n) {
        const r = e.state,
          s = 1792 & r;
        return s === t
          ? ((e.state = (-1793 & r) | n), (e.initIndex = -1), !0)
          : s === n;
      }
      function Tn(e, t, n) {
        return (
          (1792 & e.state) === t &&
          e.initIndex <= n &&
          ((e.initIndex = n + 1), !0)
        );
      }
      function xn(e, t) {
        return e.nodes[t];
      }
      function kn(e, t) {
        return e.nodes[t];
      }
      function An(e, t) {
        return e.nodes[t];
      }
      function In(e, t) {
        return e.nodes[t];
      }
      function Pn(e, t) {
        return e.nodes[t];
      }
      const Nn = {
          setCurrentNode: void 0,
          createRootView: void 0,
          createEmbeddedView: void 0,
          createComponentView: void 0,
          createNgModuleRef: void 0,
          overrideProvider: void 0,
          overrideComponentView: void 0,
          clearOverrides: void 0,
          checkAndUpdateView: void 0,
          checkNoChangesView: void 0,
          destroyView: void 0,
          resolveDep: void 0,
          createDebugContext: void 0,
          handleEvent: void 0,
          updateDirectives: void 0,
          updateRenderer: void 0,
          dirtyParentQueries: void 0,
        },
        Rn = () => {},
        Dn = new Map();
      function On(e) {
        let t = Dn.get(e);
        return t || ((t = ce(e) + "_" + Dn.size), Dn.set(e, t)), t;
      }
      function Mn(e, t, n, r) {
        if (Rt.isWrapped(r)) {
          r = Rt.unwrap(r);
          const s = e.def.nodes[t].bindingIndex + n,
            i = Rt.unwrap(e.oldValues[s]);
          e.oldValues[s] = new Rt(i);
        }
        return r;
      }
      function Fn(e) {
        return {
          id: "$$undefined",
          styles: e.styles,
          encapsulation: e.encapsulation,
          data: e.data,
        };
      }
      let Vn = 0;
      function Ln(e, t, n, r) {
        return !(!(2 & e.state) && Pt(e.oldValues[t.bindingIndex + n], r));
      }
      function Un(e, t, n, r) {
        return !!Ln(e, t, n, r) && ((e.oldValues[t.bindingIndex + n] = r), !0);
      }
      function jn(e, t, n, r) {
        const s = e.oldValues[t.bindingIndex + n];
        if (1 & e.state || !Nt(s, r)) {
          const i = t.bindings[n].name;
          throw wn(
            Nn.createDebugContext(e, t.nodeIndex),
            `${i}: ${s}`,
            `${i}: ${r}`,
            0 != (1 & e.state)
          );
        }
      }
      function $n(e) {
        let t = e;
        for (; t; )
          2 & t.def.flags && (t.state |= 8),
            (t = t.viewContainerParent || t.parent);
      }
      function Hn(e, t) {
        let n = e;
        for (; n && n !== t; )
          (n.state |= 64), (n = n.viewContainerParent || n.parent);
      }
      function Bn(e, t, n, r) {
        try {
          return (
            $n(33554432 & e.def.nodes[t].flags ? kn(e, t).componentView : e),
            Nn.handleEvent(e, t, n, r)
          );
        } catch (s) {
          e.root.errorHandler.handleError(s);
        }
      }
      function zn(e) {
        return e.parent ? kn(e.parent, e.parentNodeDef.nodeIndex) : null;
      }
      function qn(e) {
        return e.parent ? e.parentNodeDef.parent : null;
      }
      function Wn(e, t) {
        switch (201347067 & t.flags) {
          case 1:
            return kn(e, t.nodeIndex).renderElement;
          case 2:
            return xn(e, t.nodeIndex).renderText;
        }
      }
      function Gn(e) {
        return !!e.parent && !!(32768 & e.parentNodeDef.flags);
      }
      function Kn(e) {
        return !(!e.parent || 32768 & e.parentNodeDef.flags);
      }
      function Qn(e) {
        return 1 << e % 32;
      }
      function Zn(e) {
        const t = {};
        let n = 0;
        const r = {};
        return (
          e &&
            e.forEach(([e, s]) => {
              "number" == typeof e ? ((t[e] = s), (n |= Qn(e))) : (r[e] = s);
            }),
          { matchedQueries: t, references: r, matchedQueryIds: n }
        );
      }
      function Xn(e, t) {
        return e.map((e) => {
          let n, r;
          return (
            Array.isArray(e) ? ([r, n] = e) : ((r = 0), (n = e)),
            n &&
              ("function" == typeof n || "object" == typeof n) &&
              t &&
              Object.defineProperty(n, "__source", {
                value: t,
                configurable: !0,
              }),
            { flags: r, token: n, tokenKey: On(n) }
          );
        });
      }
      function Jn(e, t, n) {
        let r = n.renderParent;
        return r
          ? 0 == (1 & r.flags) ||
            0 == (33554432 & r.flags) ||
            (r.element.componentRendererType &&
              r.element.componentRendererType.encapsulation === De.Native)
            ? kn(e, n.renderParent.nodeIndex).renderElement
            : void 0
          : t;
      }
      const Yn = new WeakMap();
      function er(e) {
        let t = Yn.get(e);
        return t || ((t = e(() => Rn)), (t.factory = e), Yn.set(e, t)), t;
      }
      function tr(e, t, n, r, s) {
        3 === t && (n = e.renderer.parentNode(Wn(e, e.def.lastRenderRootNode))),
          nr(e, t, 0, e.def.nodes.length - 1, n, r, s);
      }
      function nr(e, t, n, r, s, i, o) {
        for (let l = n; l <= r; l++) {
          const n = e.def.nodes[l];
          11 & n.flags && sr(e, n, t, s, i, o), (l += n.childCount);
        }
      }
      function rr(e, t, n, r, s, i) {
        let o = e;
        for (; o && !Gn(o); ) o = o.parent;
        const l = o.parent,
          a = qn(o),
          u = a.nodeIndex + a.childCount;
        for (let c = a.nodeIndex + 1; c <= u; c++) {
          const e = l.def.nodes[c];
          e.ngContentIndex === t && sr(l, e, n, r, s, i), (c += e.childCount);
        }
        if (!l.parent) {
          const o = e.root.projectableNodes[t];
          if (o) for (let t = 0; t < o.length; t++) ir(e, o[t], n, r, s, i);
        }
      }
      function sr(e, t, n, r, s, i) {
        if (8 & t.flags) rr(e, t.ngContent.index, n, r, s, i);
        else {
          const o = Wn(e, t);
          if (
            (3 === n && 33554432 & t.flags && 48 & t.bindingFlags
              ? (16 & t.bindingFlags && ir(e, o, n, r, s, i),
                32 & t.bindingFlags &&
                  ir(kn(e, t.nodeIndex).componentView, o, n, r, s, i))
              : ir(e, o, n, r, s, i),
            16777216 & t.flags)
          ) {
            const o = kn(e, t.nodeIndex).viewContainer._embeddedViews;
            for (let e = 0; e < o.length; e++) tr(o[e], n, r, s, i);
          }
          1 & t.flags &&
            !t.element.name &&
            nr(e, n, t.nodeIndex + 1, t.nodeIndex + t.childCount, r, s, i);
        }
      }
      function ir(e, t, n, r, s, i) {
        const o = e.renderer;
        switch (n) {
          case 1:
            o.appendChild(r, t);
            break;
          case 2:
            o.insertBefore(r, t, s);
            break;
          case 3:
            o.removeChild(r, t);
            break;
          case 0:
            i.push(t);
        }
      }
      const or = /^:([^:]+):(.+)$/;
      function lr(e) {
        if (":" === e[0]) {
          const t = e.match(or);
          return [t[1], t[2]];
        }
        return ["", e];
      }
      function ar(e) {
        let t = 0;
        for (let n = 0; n < e.length; n++) t |= e[n].flags;
        return t;
      }
      function ur(e, t, n, r, s, i, o, l, a, u, c, h, d, p, f, g, m, y, _, v) {
        switch (e) {
          case 1:
            return t + cr(n) + r;
          case 2:
            return t + cr(n) + r + cr(s) + i;
          case 3:
            return t + cr(n) + r + cr(s) + i + cr(o) + l;
          case 4:
            return t + cr(n) + r + cr(s) + i + cr(o) + l + cr(a) + u;
          case 5:
            return (
              t + cr(n) + r + cr(s) + i + cr(o) + l + cr(a) + u + cr(c) + h
            );
          case 6:
            return (
              t +
              cr(n) +
              r +
              cr(s) +
              i +
              cr(o) +
              l +
              cr(a) +
              u +
              cr(c) +
              h +
              cr(d) +
              p
            );
          case 7:
            return (
              t +
              cr(n) +
              r +
              cr(s) +
              i +
              cr(o) +
              l +
              cr(a) +
              u +
              cr(c) +
              h +
              cr(d) +
              p +
              cr(f) +
              g
            );
          case 8:
            return (
              t +
              cr(n) +
              r +
              cr(s) +
              i +
              cr(o) +
              l +
              cr(a) +
              u +
              cr(c) +
              h +
              cr(d) +
              p +
              cr(f) +
              g +
              cr(m) +
              y
            );
          case 9:
            return (
              t +
              cr(n) +
              r +
              cr(s) +
              i +
              cr(o) +
              l +
              cr(a) +
              u +
              cr(c) +
              h +
              cr(d) +
              p +
              cr(f) +
              g +
              cr(m) +
              y +
              cr(_) +
              v
            );
          default:
            throw new Error("Does not support more than 9 expressions");
        }
      }
      function cr(e) {
        return null != e ? e.toString() : "";
      }
      const hr = new Object(),
        dr = On(vt),
        pr = On(be),
        fr = On(Ie);
      function gr(e, t, n, r) {
        return (
          (n = pe(n)),
          { index: -1, deps: Xn(r, ce(t)), flags: e, token: t, value: n }
        );
      }
      function mr(e, t, n = vt.THROW_IF_NOT_FOUND) {
        const r = Te(e);
        try {
          if (8 & t.flags) return t.token;
          if ((2 & t.flags && (n = null), 1 & t.flags))
            return e._parent.get(t.token, n);
          const o = t.tokenKey;
          switch (o) {
            case dr:
            case pr:
            case fr:
              return e;
          }
          const l = e._def.providersByKey[o];
          let a;
          if (l) {
            let t = e._providers[l.index];
            return (
              void 0 === t && (t = e._providers[l.index] = yr(e, l)),
              t === hr ? void 0 : t
            );
          }
          if (
            (a = ae(t.token)) &&
            ((s = e),
            null != (i = a).providedIn &&
              ((function (e, t) {
                return e._def.modules.indexOf(t) > -1;
              })(s, i.providedIn) ||
                ("root" === i.providedIn && s._def.isRoot)))
          ) {
            const n = e._providers.length;
            return (
              (e._def.providers[n] = e._def.providersByKey[t.tokenKey] =
                {
                  flags: 5120,
                  value: a.factory,
                  deps: [],
                  index: n,
                  token: t.token,
                }),
              (e._providers[n] = hr),
              (e._providers[n] = yr(e, e._def.providersByKey[t.tokenKey]))
            );
          }
          return 4 & t.flags ? n : e._parent.get(t.token, n);
        } finally {
          Te(r);
        }
        var s, i;
      }
      function yr(e, t) {
        let n;
        switch (201347067 & t.flags) {
          case 512:
            n = (function (e, t, n) {
              const r = n.length;
              switch (r) {
                case 0:
                  return new t();
                case 1:
                  return new t(mr(e, n[0]));
                case 2:
                  return new t(mr(e, n[0]), mr(e, n[1]));
                case 3:
                  return new t(mr(e, n[0]), mr(e, n[1]), mr(e, n[2]));
                default:
                  const s = new Array(r);
                  for (let t = 0; t < r; t++) s[t] = mr(e, n[t]);
                  return new t(...s);
              }
            })(e, t.value, t.deps);
            break;
          case 1024:
            n = (function (e, t, n) {
              const r = n.length;
              switch (r) {
                case 0:
                  return t();
                case 1:
                  return t(mr(e, n[0]));
                case 2:
                  return t(mr(e, n[0]), mr(e, n[1]));
                case 3:
                  return t(mr(e, n[0]), mr(e, n[1]), mr(e, n[2]));
                default:
                  const s = Array(r);
                  for (let t = 0; t < r; t++) s[t] = mr(e, n[t]);
                  return t(...s);
              }
            })(e, t.value, t.deps);
            break;
          case 2048:
            n = mr(e, t.deps[0]);
            break;
          case 256:
            n = t.value;
        }
        return (
          n === hr ||
            null === n ||
            "object" != typeof n ||
            131072 & t.flags ||
            "function" != typeof n.ngOnDestroy ||
            (t.flags |= 131072),
          void 0 === n ? hr : n
        );
      }
      function _r(e, t) {
        const n = e.viewContainer._embeddedViews;
        if (((null == t || t >= n.length) && (t = n.length - 1), t < 0))
          return null;
        const r = n[t];
        return (
          (r.viewContainerParent = null),
          Re(n, t),
          Nn.dirtyParentQueries(r),
          br(r),
          r
        );
      }
      function vr(e, t, n) {
        const r = t ? Wn(t, t.def.lastRenderRootNode) : e.renderElement,
          s = n.renderer.parentNode(r),
          i = n.renderer.nextSibling(r);
        tr(n, 2, s, i, void 0);
      }
      function br(e) {
        tr(e, 3, null, null, void 0);
      }
      const wr = new Object();
      function Cr(e, t, n, r, s, i) {
        return new Sr(e, t, n, r, s, i);
      }
      class Sr extends Lt {
        constructor(e, t, n, r, s, i) {
          super(),
            (this.selector = e),
            (this.componentType = t),
            (this._inputs = r),
            (this._outputs = s),
            (this.ngContentSelectors = i),
            (this.viewDefFactory = n);
        }
        get inputs() {
          const e = [],
            t = this._inputs;
          for (let n in t) e.push({ propName: n, templateName: t[n] });
          return e;
        }
        get outputs() {
          const e = [];
          for (let t in this._outputs)
            e.push({ propName: t, templateName: this._outputs[t] });
          return e;
        }
        create(e, t, n, r) {
          if (!r) throw new Error("ngModule should be provided");
          const s = er(this.viewDefFactory),
            i = s.nodes[0].element.componentProvider.nodeIndex,
            o = Nn.createRootView(e, t || [], n, s, r, wr),
            l = An(o, i).instance;
          return (
            n &&
              o.renderer.setAttribute(
                kn(o, 0).renderElement,
                "ng-version",
                en.full
              ),
            new Er(o, new Ar(o), l)
          );
        }
      }
      class Er extends class {} {
        constructor(e, t, n) {
          super(),
            (this._view = e),
            (this._viewRef = t),
            (this._component = n),
            (this._elDef = this._view.def.nodes[0]),
            (this.hostView = t),
            (this.changeDetectorRef = t),
            (this.instance = n);
        }
        get location() {
          return new Wt(kn(this._view, this._elDef.nodeIndex).renderElement);
        }
        get injector() {
          return new Rr(this._view, this._elDef);
        }
        get componentType() {
          return this._component.constructor;
        }
        destroy() {
          this._viewRef.destroy();
        }
        onDestroy(e) {
          this._viewRef.onDestroy(e);
        }
      }
      function Tr(e, t, n) {
        return new xr(e, t, n);
      }
      class xr {
        constructor(e, t, n) {
          (this._view = e),
            (this._elDef = t),
            (this._data = n),
            (this._embeddedViews = []);
        }
        get element() {
          return new Wt(this._data.renderElement);
        }
        get injector() {
          return new Rr(this._view, this._elDef);
        }
        get parentInjector() {
          let e = this._view,
            t = this._elDef.parent;
          for (; !t && e; ) (t = qn(e)), (e = e.parent);
          return e ? new Rr(e, t) : new Rr(this._view, null);
        }
        clear() {
          for (let e = this._embeddedViews.length - 1; e >= 0; e--) {
            const t = _r(this._data, e);
            Nn.destroyView(t);
          }
        }
        get(e) {
          const t = this._embeddedViews[e];
          if (t) {
            const e = new Ar(t);
            return e.attachToViewContainerRef(this), e;
          }
          return null;
        }
        get length() {
          return this._embeddedViews.length;
        }
        createEmbeddedView(e, t, n) {
          const r = e.createEmbeddedView(t || {});
          return this.insert(r, n), r;
        }
        createComponent(e, t, n, r, s) {
          const i = n || this.parentInjector;
          s || e instanceof zt || (s = i.get(Ie));
          const o = e.create(i, r, void 0, s);
          return this.insert(o.hostView, t), o;
        }
        insert(e, t) {
          if (e.destroyed)
            throw new Error(
              "Cannot insert a destroyed View in a ViewContainer!"
            );
          const n = e;
          return (
            (function (e, t, n, r) {
              let s = t.viewContainer._embeddedViews;
              null == n && (n = s.length),
                (r.viewContainerParent = e),
                Ne(s, n, r),
                (function (e, t) {
                  const n = zn(t);
                  if (!n || n === e || 16 & t.state) return;
                  t.state |= 16;
                  let r = n.template._projectedViews;
                  r || (r = n.template._projectedViews = []),
                    r.push(t),
                    (function (e, t) {
                      if (4 & t.flags) return;
                      (e.nodeFlags |= 4), (t.flags |= 4);
                      let n = t.parent;
                      for (; n; ) (n.childFlags |= 4), (n = n.parent);
                    })(t.parent.def, t.parentNodeDef);
                })(t, r),
                Nn.dirtyParentQueries(r),
                vr(t, n > 0 ? s[n - 1] : null, r);
            })(this._view, this._data, t, n._view),
            n.attachToViewContainerRef(this),
            e
          );
        }
        move(e, t) {
          if (e.destroyed)
            throw new Error("Cannot move a destroyed View in a ViewContainer!");
          const n = this._embeddedViews.indexOf(e._view);
          return (
            (function (e, t, n) {
              const r = e.viewContainer._embeddedViews,
                s = r[t];
              Re(r, t),
                null == n && (n = r.length),
                Ne(r, n, s),
                Nn.dirtyParentQueries(s),
                br(s),
                vr(e, n > 0 ? r[n - 1] : null, s);
            })(this._data, n, t),
            e
          );
        }
        indexOf(e) {
          return this._embeddedViews.indexOf(e._view);
        }
        remove(e) {
          const t = _r(this._data, e);
          t && Nn.destroyView(t);
        }
        detach(e) {
          const t = _r(this._data, e);
          return t ? new Ar(t) : null;
        }
      }
      function kr(e) {
        return new Ar(e);
      }
      class Ar {
        constructor(e) {
          (this._view = e),
            (this._viewContainerRef = null),
            (this._appRef = null);
        }
        get rootNodes() {
          return (function (e) {
            const t = [];
            return tr(e, 0, void 0, void 0, t), t;
          })(this._view);
        }
        get context() {
          return this._view.context;
        }
        get destroyed() {
          return 0 != (128 & this._view.state);
        }
        markForCheck() {
          $n(this._view);
        }
        detach() {
          this._view.state &= -5;
        }
        detectChanges() {
          const e = this._view.root.rendererFactory;
          e.begin && e.begin();
          try {
            Nn.checkAndUpdateView(this._view);
          } finally {
            e.end && e.end();
          }
        }
        checkNoChanges() {
          Nn.checkNoChangesView(this._view);
        }
        reattach() {
          this._view.state |= 4;
        }
        onDestroy(e) {
          this._view.disposables || (this._view.disposables = []),
            this._view.disposables.push(e);
        }
        destroy() {
          this._appRef
            ? this._appRef.detachView(this)
            : this._viewContainerRef &&
              this._viewContainerRef.detach(
                this._viewContainerRef.indexOf(this)
              ),
            Nn.destroyView(this._view);
        }
        detachFromAppRef() {
          (this._appRef = null),
            br(this._view),
            Nn.dirtyParentQueries(this._view);
        }
        attachToAppRef(e) {
          if (this._viewContainerRef)
            throw new Error(
              "This view is already attached to a ViewContainer!"
            );
          this._appRef = e;
        }
        attachToViewContainerRef(e) {
          if (this._appRef)
            throw new Error(
              "This view is already attached directly to the ApplicationRef!"
            );
          this._viewContainerRef = e;
        }
      }
      function Ir(e, t) {
        return new Pr(e, t);
      }
      class Pr extends yn {
        constructor(e, t) {
          super(), (this._parentView = e), (this._def = t);
        }
        createEmbeddedView(e) {
          return new Ar(
            Nn.createEmbeddedView(
              this._parentView,
              this._def,
              this._def.element.template,
              e
            )
          );
        }
        get elementRef() {
          return new Wt(
            kn(this._parentView, this._def.nodeIndex).renderElement
          );
        }
      }
      function Nr(e, t) {
        return new Rr(e, t);
      }
      class Rr {
        constructor(e, t) {
          (this.view = e), (this.elDef = t);
        }
        get(e, t = vt.THROW_IF_NOT_FOUND) {
          return Nn.resolveDep(
            this.view,
            this.elDef,
            !!this.elDef && 0 != (33554432 & this.elDef.flags),
            { flags: 0, token: e, tokenKey: On(e) },
            t
          );
        }
      }
      function Dr(e, t) {
        const n = e.def.nodes[t];
        if (1 & n.flags) {
          const t = kn(e, n.nodeIndex);
          return n.element.template ? t.template : t.renderElement;
        }
        if (2 & n.flags) return xn(e, n.nodeIndex).renderText;
        if (20240 & n.flags) return An(e, n.nodeIndex).instance;
        throw new Error("Illegal state: read nodeValue for node index " + t);
      }
      function Or(e) {
        return new Mr(e.renderer);
      }
      class Mr {
        constructor(e) {
          this.delegate = e;
        }
        selectRootElement(e) {
          return this.delegate.selectRootElement(e);
        }
        createElement(e, t) {
          const [n, r] = lr(t),
            s = this.delegate.createElement(r, n);
          return e && this.delegate.appendChild(e, s), s;
        }
        createViewRoot(e) {
          return e;
        }
        createTemplateAnchor(e) {
          const t = this.delegate.createComment("");
          return e && this.delegate.appendChild(e, t), t;
        }
        createText(e, t) {
          const n = this.delegate.createText(t);
          return e && this.delegate.appendChild(e, n), n;
        }
        projectNodes(e, t) {
          for (let n = 0; n < t.length; n++) this.delegate.appendChild(e, t[n]);
        }
        attachViewAfter(e, t) {
          const n = this.delegate.parentNode(e),
            r = this.delegate.nextSibling(e);
          for (let s = 0; s < t.length; s++)
            this.delegate.insertBefore(n, t[s], r);
        }
        detachView(e) {
          for (let t = 0; t < e.length; t++) {
            const n = e[t],
              r = this.delegate.parentNode(n);
            this.delegate.removeChild(r, n);
          }
        }
        destroyView(e, t) {
          for (let n = 0; n < t.length; n++) this.delegate.destroyNode(t[n]);
        }
        listen(e, t, n) {
          return this.delegate.listen(e, t, n);
        }
        listenGlobal(e, t, n) {
          return this.delegate.listen(e, t, n);
        }
        setElementProperty(e, t, n) {
          this.delegate.setProperty(e, t, n);
        }
        setElementAttribute(e, t, n) {
          const [r, s] = lr(t);
          null != n
            ? this.delegate.setAttribute(e, s, n, r)
            : this.delegate.removeAttribute(e, s, r);
        }
        setBindingDebugInfo(e, t, n) {}
        setElementClass(e, t, n) {
          n ? this.delegate.addClass(e, t) : this.delegate.removeClass(e, t);
        }
        setElementStyle(e, t, n) {
          null != n
            ? this.delegate.setStyle(e, t, n)
            : this.delegate.removeStyle(e, t);
        }
        invokeElementMethod(e, t, n) {
          e[t].apply(e, n);
        }
        setText(e, t) {
          this.delegate.setValue(e, t);
        }
        animate() {
          throw new Error("Renderer.animate is no longer supported!");
        }
      }
      function Fr(e, t, n, r) {
        return new Vr(e, t, n, r);
      }
      class Vr {
        constructor(e, t, n, r) {
          (this._moduleType = e),
            (this._parent = t),
            (this._bootstrapComponents = n),
            (this._def = r),
            (this._destroyListeners = []),
            (this._destroyed = !1),
            (this.injector = this),
            (function (e) {
              const t = e._def,
                n = (e._providers = new Array(t.providers.length));
              for (let r = 0; r < t.providers.length; r++) {
                const s = t.providers[r];
                4096 & s.flags || (void 0 === n[r] && (n[r] = yr(e, s)));
              }
            })(this);
        }
        get(e, t = vt.THROW_IF_NOT_FOUND, n = ie.Default) {
          let r = 0;
          return (
            n & ie.SkipSelf ? (r |= 1) : n & ie.Self && (r |= 4),
            mr(this, { token: e, tokenKey: On(e), flags: r }, t)
          );
        }
        get instance() {
          return this.get(this._moduleType);
        }
        get componentFactoryResolver() {
          return this.get(Ht);
        }
        destroy() {
          if (this._destroyed)
            throw new Error(
              `The ng module ${ce(
                this.instance.constructor
              )} has already been destroyed.`
            );
          (this._destroyed = !0),
            (function (e, t) {
              const n = e._def,
                r = new Set();
              for (let s = 0; s < n.providers.length; s++)
                if (131072 & n.providers[s].flags) {
                  const t = e._providers[s];
                  if (t && t !== hr) {
                    const e = t.ngOnDestroy;
                    "function" != typeof e ||
                      r.has(t) ||
                      (e.apply(t), r.add(t));
                  }
                }
            })(this),
            this._destroyListeners.forEach((e) => e());
        }
        onDestroy(e) {
          this._destroyListeners.push(e);
        }
      }
      const Lr = On(Kt),
        Ur = On(Xt),
        jr = On(Wt),
        $r = On(vn),
        Hr = On(yn),
        Br = On(gt),
        zr = On(vt),
        qr = On(be);
      function Wr(e, t, n, r, s, i, o, l) {
        const a = [];
        if (o)
          for (let c in o) {
            const [e, t] = o[c];
            a[e] = {
              flags: 8,
              name: c,
              nonMinifiedName: t,
              ns: null,
              securityContext: null,
              suffix: null,
            };
          }
        const u = [];
        if (l)
          for (let c in l)
            u.push({ type: 1, propName: c, target: null, eventName: l[c] });
        return Qr(e, (t |= 16384), n, r, s, s, i, a, u);
      }
      function Gr(e, t, n) {
        return Qr(-1, (e |= 16), null, 0, t, t, n);
      }
      function Kr(e, t, n, r, s) {
        return Qr(-1, e, t, 0, n, r, s);
      }
      function Qr(e, t, n, r, s, i, o, l, a) {
        const { matchedQueries: u, references: c, matchedQueryIds: h } = Zn(n);
        a || (a = []), l || (l = []), (i = pe(i));
        const d = Xn(o, ce(s));
        return {
          nodeIndex: -1,
          parent: null,
          renderParent: null,
          bindingIndex: -1,
          outputIndex: -1,
          checkIndex: e,
          flags: t,
          childFlags: 0,
          directChildFlags: 0,
          childMatchedQueries: 0,
          matchedQueries: u,
          matchedQueryIds: h,
          references: c,
          ngContentIndex: -1,
          childCount: r,
          bindings: l,
          bindingFlags: ar(l),
          outputs: a,
          element: null,
          provider: { token: s, value: i, deps: d },
          text: null,
          query: null,
          ngContent: null,
        };
      }
      function Zr(e, t) {
        return es(e, t);
      }
      function Xr(e, t) {
        let n = e;
        for (; n.parent && !Gn(n); ) n = n.parent;
        return ts(n.parent, qn(n), !0, t.provider.value, t.provider.deps);
      }
      function Jr(e, t) {
        const n = ts(
          e,
          t.parent,
          (32768 & t.flags) > 0,
          t.provider.value,
          t.provider.deps
        );
        if (t.outputs.length)
          for (let r = 0; r < t.outputs.length; r++) {
            const s = t.outputs[r],
              i = n[s.propName];
            if (!Ft(i))
              throw new Error(
                `@Output ${s.propName} not initialized in '${n.constructor.name}'.`
              );
            {
              const n = i.subscribe(Yr(e, t.parent.nodeIndex, s.eventName));
              e.disposables[t.outputIndex + r] = n.unsubscribe.bind(n);
            }
          }
        return n;
      }
      function Yr(e, t, n) {
        return (r) => Bn(e, t, n, r);
      }
      function es(e, t) {
        const n = (8192 & t.flags) > 0,
          r = t.provider;
        switch (201347067 & t.flags) {
          case 512:
            return ts(e, t.parent, n, r.value, r.deps);
          case 1024:
            return (function (e, t, n, r, s) {
              const i = s.length;
              switch (i) {
                case 0:
                  return r();
                case 1:
                  return r(rs(e, t, n, s[0]));
                case 2:
                  return r(rs(e, t, n, s[0]), rs(e, t, n, s[1]));
                case 3:
                  return r(
                    rs(e, t, n, s[0]),
                    rs(e, t, n, s[1]),
                    rs(e, t, n, s[2])
                  );
                default:
                  const o = Array(i);
                  for (let r = 0; r < i; r++) o[r] = rs(e, t, n, s[r]);
                  return r(...o);
              }
            })(e, t.parent, n, r.value, r.deps);
          case 2048:
            return rs(e, t.parent, n, r.deps[0]);
          case 256:
            return r.value;
        }
      }
      function ts(e, t, n, r, s) {
        const i = s.length;
        switch (i) {
          case 0:
            return new r();
          case 1:
            return new r(rs(e, t, n, s[0]));
          case 2:
            return new r(rs(e, t, n, s[0]), rs(e, t, n, s[1]));
          case 3:
            return new r(
              rs(e, t, n, s[0]),
              rs(e, t, n, s[1]),
              rs(e, t, n, s[2])
            );
          default:
            const o = new Array(i);
            for (let r = 0; r < i; r++) o[r] = rs(e, t, n, s[r]);
            return new r(...o);
        }
      }
      const ns = {};
      function rs(e, t, n, r, s = vt.THROW_IF_NOT_FOUND) {
        if (8 & r.flags) return r.token;
        const i = e;
        2 & r.flags && (s = null);
        const o = r.tokenKey;
        o === Br && (n = !(!t || !t.element.componentView)),
          t && 1 & r.flags && ((n = !1), (t = t.parent));
        let l = e;
        for (; l; ) {
          if (t)
            switch (o) {
              case Lr:
                return Or(ss(l, t, n));
              case Ur:
                return ss(l, t, n).renderer;
              case jr:
                return new Wt(kn(l, t.nodeIndex).renderElement);
              case $r:
                return kn(l, t.nodeIndex).viewContainer;
              case Hr:
                if (t.element.template) return kn(l, t.nodeIndex).template;
                break;
              case Br:
                return kr(ss(l, t, n));
              case zr:
              case qr:
                return Nr(l, t);
              default:
                const e = (
                  n ? t.element.allProviders : t.element.publicProviders
                )[o];
                if (e) {
                  let t = An(l, e.nodeIndex);
                  return (
                    t ||
                      ((t = { instance: es(l, e) }),
                      (l.nodes[e.nodeIndex] = t)),
                    t.instance
                  );
                }
            }
          (n = Gn(l)), (t = qn(l)), (l = l.parent), 4 & r.flags && (l = null);
        }
        const a = i.root.injector.get(r.token, ns);
        return a !== ns || s === ns
          ? a
          : i.root.ngModule.injector.get(r.token, s);
      }
      function ss(e, t, n) {
        let r;
        if (n) r = kn(e, t.nodeIndex).componentView;
        else for (r = e; r.parent && !Gn(r); ) r = r.parent;
        return r;
      }
      function is(e, t, n, r, s, i) {
        if (32768 & n.flags) {
          const t = kn(e, n.parent.nodeIndex).componentView;
          2 & t.def.flags && (t.state |= 8);
        }
        if (((t.instance[n.bindings[r].name] = s), 524288 & n.flags)) {
          i = i || {};
          const t = Rt.unwrap(e.oldValues[n.bindingIndex + r]);
          i[n.bindings[r].nonMinifiedName] = new Vt(t, s, 0 != (2 & e.state));
        }
        return (e.oldValues[n.bindingIndex + r] = s), i;
      }
      function os(e, t) {
        if (!(e.def.nodeFlags & t)) return;
        const n = e.def.nodes;
        let r = 0;
        for (let s = 0; s < n.length; s++) {
          const i = n[s];
          let o = i.parent;
          for (
            !o && i.flags & t && as(e, s, i.flags & t, r++),
              0 == (i.childFlags & t) && (s += i.childCount);
            o && 1 & o.flags && s === o.nodeIndex + o.childCount;

          )
            o.directChildFlags & t && (r = ls(e, o, t, r)), (o = o.parent);
        }
      }
      function ls(e, t, n, r) {
        for (let s = t.nodeIndex + 1; s <= t.nodeIndex + t.childCount; s++) {
          const t = e.def.nodes[s];
          t.flags & n && as(e, s, t.flags & n, r++), (s += t.childCount);
        }
        return r;
      }
      function as(e, t, n, r) {
        const s = An(e, t);
        if (!s) return;
        const i = s.instance;
        i &&
          (Nn.setCurrentNode(e, t),
          1048576 & n && Tn(e, 512, r) && i.ngAfterContentInit(),
          2097152 & n && i.ngAfterContentChecked(),
          4194304 & n && Tn(e, 768, r) && i.ngAfterViewInit(),
          8388608 & n && i.ngAfterViewChecked(),
          131072 & n && i.ngOnDestroy());
      }
      const us = new ve("SCHEDULER_TOKEN", {
          providedIn: "root",
          factory: () => Oe,
        }),
        cs = {},
        hs = (function () {
          var e = {
            LocaleId: 0,
            DayPeriodsFormat: 1,
            DayPeriodsStandalone: 2,
            DaysFormat: 3,
            DaysStandalone: 4,
            MonthsFormat: 5,
            MonthsStandalone: 6,
            Eras: 7,
            FirstDayOfWeek: 8,
            WeekendRange: 9,
            DateFormat: 10,
            TimeFormat: 11,
            DateTimeFormat: 12,
            NumberSymbols: 13,
            NumberFormats: 14,
            CurrencySymbol: 15,
            CurrencyName: 16,
            Currencies: 17,
            PluralCase: 18,
            ExtraData: 19,
          };
          return (
            (e[e.LocaleId] = "LocaleId"),
            (e[e.DayPeriodsFormat] = "DayPeriodsFormat"),
            (e[e.DayPeriodsStandalone] = "DayPeriodsStandalone"),
            (e[e.DaysFormat] = "DaysFormat"),
            (e[e.DaysStandalone] = "DaysStandalone"),
            (e[e.MonthsFormat] = "MonthsFormat"),
            (e[e.MonthsStandalone] = "MonthsStandalone"),
            (e[e.Eras] = "Eras"),
            (e[e.FirstDayOfWeek] = "FirstDayOfWeek"),
            (e[e.WeekendRange] = "WeekendRange"),
            (e[e.DateFormat] = "DateFormat"),
            (e[e.TimeFormat] = "TimeFormat"),
            (e[e.DateTimeFormat] = "DateTimeFormat"),
            (e[e.NumberSymbols] = "NumberSymbols"),
            (e[e.NumberFormats] = "NumberFormats"),
            (e[e.CurrencySymbol] = "CurrencySymbol"),
            (e[e.CurrencyName] = "CurrencyName"),
            (e[e.Currencies] = "Currencies"),
            (e[e.PluralCase] = "PluralCase"),
            (e[e.ExtraData] = "ExtraData"),
            e
          );
        })(),
        ds = void 0;
      var ps = [
        "en",
        [["a", "p"], ["AM", "PM"], ds],
        [["AM", "PM"], ds, ds],
        [
          ["S", "M", "T", "W", "T", "F", "S"],
          ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        ],
        ds,
        [
          ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
          [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
        ],
        ds,
        [
          ["B", "A"],
          ["BC", "AD"],
          ["Before Christ", "Anno Domini"],
        ],
        0,
        [6, 0],
        ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"],
        ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"],
        ["{1}, {0}", ds, "{1} 'at' {0}", ds],
        [
          ".",
          ",",
          ";",
          "%",
          "+",
          "-",
          "E",
          "\xd7",
          "\u2030",
          "\u221e",
          "NaN",
          ":",
        ],
        ["#,##0.###", "#,##0%", "\xa4#,##0.00", "#E0"],
        "$",
        "US Dollar",
        {},
        function (e) {
          let t = Math.floor(Math.abs(e)),
            n = e.toString().replace(/^[^.]*\.?/, "").length;
          return 1 === t && 0 === n ? 1 : 5;
        },
      ];
      function fs(e) {
        const t = e.toLowerCase().replace(/_/g, "-");
        let n = cs[t];
        if (n) return n;
        const r = t.split("-")[0];
        if (((n = cs[r]), n)) return n;
        if ("en" === r) return ps;
        throw new Error(`Missing locale data for the locale "${e}".`);
      }
      class gs extends T {
        constructor(e = !1) {
          super(), (this.__isAsync = e);
        }
        emit(e) {
          super.next(e);
        }
        subscribe(e, t, n) {
          let r,
            s = (e) => null,
            i = () => null;
          e && "object" == typeof e
            ? ((r = this.__isAsync
                ? (t) => {
                    setTimeout(() => e.next(t));
                  }
                : (t) => {
                    e.next(t);
                  }),
              e.error &&
                (s = this.__isAsync
                  ? (t) => {
                      setTimeout(() => e.error(t));
                    }
                  : (t) => {
                      e.error(t);
                    }),
              e.complete &&
                (i = this.__isAsync
                  ? () => {
                      setTimeout(() => e.complete());
                    }
                  : () => {
                      e.complete();
                    }))
            : ((r = this.__isAsync
                ? (t) => {
                    setTimeout(() => e(t));
                  }
                : (t) => {
                    e(t);
                  }),
              t &&
                (s = this.__isAsync
                  ? (e) => {
                      setTimeout(() => t(e));
                    }
                  : (e) => {
                      t(e);
                    }),
              n &&
                (i = this.__isAsync
                  ? () => {
                      setTimeout(() => n());
                    }
                  : () => {
                      n();
                    }));
          const o = super.subscribe(r, s, i);
          return e instanceof h && e.add(o), o;
        }
      }
      function ms() {
        return this._results[It()]();
      }
      class ys {
        constructor() {
          (this.dirty = !0),
            (this._results = []),
            (this.changes = new gs()),
            (this.length = 0);
          const e = It(),
            t = ys.prototype;
          t[e] || (t[e] = ms);
        }
        map(e) {
          return this._results.map(e);
        }
        filter(e) {
          return this._results.filter(e);
        }
        find(e) {
          return this._results.find(e);
        }
        reduce(e, t) {
          return this._results.reduce(e, t);
        }
        forEach(e) {
          this._results.forEach(e);
        }
        some(e) {
          return this._results.some(e);
        }
        toArray() {
          return this._results.slice();
        }
        toString() {
          return this._results.toString();
        }
        reset(e) {
          (this._results = (function e(t, n) {
            void 0 === n && (n = t);
            for (let r = 0; r < t.length; r++) {
              let s = t[r];
              Array.isArray(s)
                ? (n === t && (n = t.slice(0, r)), e(s, n))
                : n !== t && n.push(s);
            }
            return n;
          })(e)),
            (this.dirty = !1),
            (this.length = this._results.length),
            (this.last = this._results[this.length - 1]),
            (this.first = this._results[0]);
        }
        notifyOnChanges() {
          this.changes.emit(this);
        }
        setDirty() {
          this.dirty = !0;
        }
        destroy() {
          this.changes.complete(), this.changes.unsubscribe();
        }
      }
      const _s = new ve("Application Initializer");
      class vs {
        constructor(e) {
          (this.appInits = e),
            (this.initialized = !1),
            (this.done = !1),
            (this.donePromise = new Promise((e, t) => {
              (this.resolve = e), (this.reject = t);
            }));
        }
        runInitializers() {
          if (this.initialized) return;
          const e = [],
            t = () => {
              (this.done = !0), this.resolve();
            };
          if (this.appInits)
            for (let n = 0; n < this.appInits.length; n++) {
              const t = this.appInits[n]();
              Mt(t) && e.push(t);
            }
          Promise.all(e)
            .then(() => {
              t();
            })
            .catch((e) => {
              this.reject(e);
            }),
            0 === e.length && t(),
            (this.initialized = !0);
        }
      }
      const bs = new ve("AppId");
      function ws() {
        return `${Cs()}${Cs()}${Cs()}`;
      }
      function Cs() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const Ss = new ve("Platform Initializer"),
        Es = new ve("Platform ID"),
        Ts = new ve("appBootstrapListener");
      class xs {
        log(e) {
          console.log(e);
        }
        warn(e) {
          console.warn(e);
        }
      }
      const ks = new ve("LocaleId");
      function As() {
        throw new Error("Runtime compiler is not loaded");
      }
      const Is = As,
        Ps = As,
        Ns = As,
        Rs = As;
      class Ds {
        constructor() {
          (this.compileModuleSync = Is),
            (this.compileModuleAsync = Ps),
            (this.compileModuleAndAllComponentsSync = Ns),
            (this.compileModuleAndAllComponentsAsync = Rs);
        }
        clearCache() {}
        clearCacheFor(e) {}
        getModuleId(e) {}
      }
      class Os {}
      let Ms, Fs;
      function Vs() {
        const e = _e.wtf;
        return !(!e || ((Ms = e.trace), !Ms) || ((Fs = Ms.events), 0));
      }
      const Ls = Vs();
      function Us(e, t) {
        return null;
      }
      const js = Ls
          ? function (e, t = null) {
              return Fs.createScope(e, t);
            }
          : (e, t) => Us,
        $s = Ls
          ? function (e, t) {
              return Ms.leaveScope(e, t), t;
            }
          : (e, t) => t,
        Hs = (() => Promise.resolve(0))();
      function Bs(e) {
        "undefined" == typeof Zone
          ? Hs.then(() => {
              e && e.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", e);
      }
      class zs {
        constructor({ enableLongStackTrace: e = !1 }) {
          if (
            ((this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new gs(!1)),
            (this.onMicrotaskEmpty = new gs(!1)),
            (this.onStable = new gs(!1)),
            (this.onError = new gs(!1)),
            "undefined" == typeof Zone)
          )
            throw new Error("In this configuration Angular requires Zone.js");
          var t;
          Zone.assertZonePatched(),
            (this._nesting = 0),
            (this._outer = this._inner = Zone.current),
            Zone.wtfZoneSpec &&
              (this._inner = this._inner.fork(Zone.wtfZoneSpec)),
            Zone.TaskTrackingZoneSpec &&
              (this._inner = this._inner.fork(new Zone.TaskTrackingZoneSpec())),
            e &&
              Zone.longStackTraceZoneSpec &&
              (this._inner = this._inner.fork(Zone.longStackTraceZoneSpec)),
            ((t = this)._inner = t._inner.fork({
              name: "angular",
              properties: { isAngularZone: !0 },
              onInvokeTask: (e, n, r, s, i, o) => {
                try {
                  return Ks(t), e.invokeTask(r, s, i, o);
                } finally {
                  Qs(t);
                }
              },
              onInvoke: (e, n, r, s, i, o, l) => {
                try {
                  return Ks(t), e.invoke(r, s, i, o, l);
                } finally {
                  Qs(t);
                }
              },
              onHasTask: (e, n, r, s) => {
                e.hasTask(r, s),
                  n === r &&
                    ("microTask" == s.change
                      ? ((t.hasPendingMicrotasks = s.microTask), Gs(t))
                      : "macroTask" == s.change &&
                        (t.hasPendingMacrotasks = s.macroTask));
              },
              onHandleError: (e, n, r, s) => (
                e.handleError(r, s),
                t.runOutsideAngular(() => t.onError.emit(s)),
                !1
              ),
            }));
        }
        static isInAngularZone() {
          return !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!zs.isInAngularZone())
            throw new Error("Expected to be in Angular Zone, but it is not!");
        }
        static assertNotInAngularZone() {
          if (zs.isInAngularZone())
            throw new Error("Expected to not be in Angular Zone, but it is!");
        }
        run(e, t, n) {
          return this._inner.run(e, t, n);
        }
        runTask(e, t, n, r) {
          const s = this._inner,
            i = s.scheduleEventTask("NgZoneEvent: " + r, e, Ws, qs, qs);
          try {
            return s.runTask(i, t, n);
          } finally {
            s.cancelTask(i);
          }
        }
        runGuarded(e, t, n) {
          return this._inner.runGuarded(e, t, n);
        }
        runOutsideAngular(e) {
          return this._outer.run(e);
        }
      }
      function qs() {}
      const Ws = {};
      function Gs(e) {
        if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
          try {
            e._nesting++, e.onMicrotaskEmpty.emit(null);
          } finally {
            if ((e._nesting--, !e.hasPendingMicrotasks))
              try {
                e.runOutsideAngular(() => e.onStable.emit(null));
              } finally {
                e.isStable = !0;
              }
          }
      }
      function Ks(e) {
        e._nesting++,
          e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
      }
      function Qs(e) {
        e._nesting--, Gs(e);
      }
      class Zs {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new gs()),
            (this.onMicrotaskEmpty = new gs()),
            (this.onStable = new gs()),
            (this.onError = new gs());
        }
        run(e) {
          return e();
        }
        runGuarded(e) {
          return e();
        }
        runOutsideAngular(e) {
          return e();
        }
        runTask(e) {
          return e();
        }
      }
      class Xs {
        constructor(e) {
          (this._ngZone = e),
            (this._pendingCount = 0),
            (this._isZoneStable = !0),
            (this._didWork = !1),
            (this._callbacks = []),
            (this.taskTrackingZone = null),
            this._watchAngularEvents(),
            e.run(() => {
              this.taskTrackingZone =
                "undefined" == typeof Zone
                  ? null
                  : Zone.current.get("TaskTrackingZone");
            });
        }
        _watchAngularEvents() {
          this._ngZone.onUnstable.subscribe({
            next: () => {
              (this._didWork = !0), (this._isZoneStable = !1);
            },
          }),
            this._ngZone.runOutsideAngular(() => {
              this._ngZone.onStable.subscribe({
                next: () => {
                  zs.assertNotInAngularZone(),
                    Bs(() => {
                      (this._isZoneStable = !0), this._runCallbacksIfReady();
                    });
                },
              });
            });
        }
        increasePendingRequestCount() {
          return (
            (this._pendingCount += 1), (this._didWork = !0), this._pendingCount
          );
        }
        decreasePendingRequestCount() {
          if (((this._pendingCount -= 1), this._pendingCount < 0))
            throw new Error("pending async requests below zero");
          return this._runCallbacksIfReady(), this._pendingCount;
        }
        isStable() {
          return (
            this._isZoneStable &&
            0 === this._pendingCount &&
            !this._ngZone.hasPendingMacrotasks
          );
        }
        _runCallbacksIfReady() {
          if (this.isStable())
            Bs(() => {
              for (; 0 !== this._callbacks.length; ) {
                let e = this._callbacks.pop();
                clearTimeout(e.timeoutId), e.doneCb(this._didWork);
              }
              this._didWork = !1;
            });
          else {
            let e = this.getPendingTasks();
            (this._callbacks = this._callbacks.filter(
              (t) =>
                !t.updateCb || !t.updateCb(e) || (clearTimeout(t.timeoutId), !1)
            )),
              (this._didWork = !0);
          }
        }
        getPendingTasks() {
          return this.taskTrackingZone
            ? this.taskTrackingZone.macroTasks.map((e) => ({
                source: e.source,
                creationLocation: e.creationLocation,
                data: e.data,
              }))
            : [];
        }
        addCallback(e, t, n) {
          let r = -1;
          t &&
            t > 0 &&
            (r = setTimeout(() => {
              (this._callbacks = this._callbacks.filter(
                (e) => e.timeoutId !== r
              )),
                e(this._didWork, this.getPendingTasks());
            }, t)),
            this._callbacks.push({ doneCb: e, timeoutId: r, updateCb: n });
        }
        whenStable(e, t, n) {
          if (n && !this.taskTrackingZone)
            throw new Error(
              'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/dist/task-tracking.js" loaded?'
            );
          this.addCallback(e, t, n), this._runCallbacksIfReady();
        }
        getPendingRequestCount() {
          return this._pendingCount;
        }
        findProviders(e, t, n) {
          return [];
        }
      }
      class Js {
        constructor() {
          (this._applications = new Map()), ti.addToWindow(this);
        }
        registerApplication(e, t) {
          this._applications.set(e, t);
        }
        unregisterApplication(e) {
          this._applications.delete(e);
        }
        unregisterAllApplications() {
          this._applications.clear();
        }
        getTestability(e) {
          return this._applications.get(e) || null;
        }
        getAllTestabilities() {
          return Array.from(this._applications.values());
        }
        getAllRootElements() {
          return Array.from(this._applications.keys());
        }
        findTestabilityInTree(e, t = !0) {
          return ti.findTestabilityInTree(this, e, t);
        }
      }
      class Ys {
        addToWindow(e) {}
        findTestabilityInTree(e, t, n) {
          return null;
        }
      }
      let ei,
        ti = new Ys();
      const ni = new ve("AllowMultipleToken");
      class ri {
        constructor(e, t) {
          (this.name = e), (this.token = t);
        }
      }
      function si(e, t, n = []) {
        const r = "Platform: " + t,
          s = new ve(r);
        return (t = []) => {
          let i = ii();
          if (!i || i.injector.get(ni, !1))
            if (e) e(n.concat(t).concat({ provide: s, useValue: !0 }));
            else {
              const e = n.concat(t).concat({ provide: s, useValue: !0 });
              !(function (e) {
                if (ei && !ei.destroyed && !ei.injector.get(ni, !1))
                  throw new Error(
                    "There can be only one platform. Destroy the previous one to create a new one."
                  );
                ei = e.get(oi);
                const t = e.get(Ss, null);
                t && t.forEach((e) => e());
              })(vt.create({ providers: e, name: r }));
            }
          return (function (e) {
            const t = ii();
            if (!t) throw new Error("No platform exists!");
            if (!t.injector.get(e, null))
              throw new Error(
                "A platform with a different configuration has been created. Please destroy it first."
              );
            return t;
          })(s);
        };
      }
      function ii() {
        return ei && !ei.destroyed ? ei : null;
      }
      class oi {
        constructor(e) {
          (this._injector = e),
            (this._modules = []),
            (this._destroyListeners = []),
            (this._destroyed = !1);
        }
        bootstrapModuleFactory(e, t) {
          const n = (function (e) {
              let t;
              return (
                (t =
                  "noop" === e
                    ? new Zs()
                    : ("zone.js" === e ? void 0 : e) ||
                      new zs({ enableLongStackTrace: $e() })),
                t
              );
            })(t ? t.ngZone : void 0),
            r = [{ provide: zs, useValue: n }];
          return n.run(() => {
            const t = vt.create({
                providers: r,
                parent: this.injector,
                name: e.moduleType.name,
              }),
              s = e.create(t),
              i = s.injector.get(Le, null);
            if (!i)
              throw new Error(
                "No ErrorHandler. Is platform module (BrowserModule) included?"
              );
            return (
              s.onDestroy(() => ui(this._modules, s)),
              n.runOutsideAngular(() =>
                n.onError.subscribe({
                  next: (e) => {
                    i.handleError(e);
                  },
                })
              ),
              (function (e, t, n) {
                try {
                  const r = n();
                  return Mt(r)
                    ? r.catch((n) => {
                        throw (t.runOutsideAngular(() => e.handleError(n)), n);
                      })
                    : r;
                } catch (r) {
                  throw (t.runOutsideAngular(() => e.handleError(r)), r);
                }
              })(i, n, () => {
                const e = s.injector.get(vs);
                return (
                  e.runInitializers(),
                  e.donePromise.then(() => (this._moduleDoBootstrap(s), s))
                );
              })
            );
          });
        }
        bootstrapModule(e, t = []) {
          const n = li({}, t);
          return (function (e, t, n) {
            return e.get(Os).createCompiler([t]).compileModuleAsync(n);
          })(this.injector, n, e).then((e) =>
            this.bootstrapModuleFactory(e, n)
          );
        }
        _moduleDoBootstrap(e) {
          const t = e.injector.get(ai);
          if (e._bootstrapComponents.length > 0)
            e._bootstrapComponents.forEach((e) => t.bootstrap(e));
          else {
            if (!e.instance.ngDoBootstrap)
              throw new Error(
                `The module ${ce(
                  e.instance.constructor
                )} was bootstrapped, but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. Please define one of these.`
              );
            e.instance.ngDoBootstrap(t);
          }
          this._modules.push(e);
        }
        onDestroy(e) {
          this._destroyListeners.push(e);
        }
        get injector() {
          return this._injector;
        }
        destroy() {
          if (this._destroyed)
            throw new Error("The platform has already been destroyed!");
          this._modules.slice().forEach((e) => e.destroy()),
            this._destroyListeners.forEach((e) => e()),
            (this._destroyed = !0);
        }
        get destroyed() {
          return this._destroyed;
        }
      }
      function li(e, t) {
        return Array.isArray(t) ? t.reduce(li, e) : Object.assign({}, e, t);
      }
      let ai = (() => {
        class e {
          constructor(e, t, n, r, s, i) {
            (this._zone = e),
              (this._console = t),
              (this._injector = n),
              (this._exceptionHandler = r),
              (this._componentFactoryResolver = s),
              (this._initStatus = i),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._enforceNoNewChanges = !1),
              (this._stable = !0),
              (this.componentTypes = []),
              (this.components = []),
              (this._enforceNoNewChanges = $e()),
              this._zone.onMicrotaskEmpty.subscribe({
                next: () => {
                  this._zone.run(() => {
                    this.tick();
                  });
                },
              });
            const o = new b((e) => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    e.next(this._stable), e.complete();
                  });
              }),
              l = new b((e) => {
                let t;
                this._zone.runOutsideAngular(() => {
                  t = this._zone.onStable.subscribe(() => {
                    zs.assertNotInAngularZone(),
                      Bs(() => {
                        this._stable ||
                          this._zone.hasPendingMacrotasks ||
                          this._zone.hasPendingMicrotasks ||
                          ((this._stable = !0), e.next(!0));
                      });
                  });
                });
                const n = this._zone.onUnstable.subscribe(() => {
                  zs.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        e.next(!1);
                      }));
                });
                return () => {
                  t.unsubscribe(), n.unsubscribe();
                };
              });
            this.isStable = (function (...e) {
              let t = Number.POSITIVE_INFINITY,
                n = null,
                r = e[e.length - 1];
              return (
                k(r)
                  ? ((n = e.pop()),
                    e.length > 1 &&
                      "number" == typeof e[e.length - 1] &&
                      (t = e.pop()))
                  : "number" == typeof r && (t = e.pop()),
                null === n && 1 === e.length && e[0] instanceof b
                  ? e[0]
                  : q(t)(W(e, n))
              );
            })(
              o,
              l.pipe((e) => {
                return G()(
                  ((t = Y),
                  function (e) {
                    let n;
                    n =
                      "function" == typeof t
                        ? t
                        : function () {
                            return t;
                          };
                    const r = Object.create(e, X);
                    return (r.source = e), (r.subjectFactory = n), r;
                  })(e)
                );
                var t;
              })
            );
          }
          bootstrap(e, t) {
            if (!this._initStatus.done)
              throw new Error(
                "Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module."
              );
            let n;
            (n =
              e instanceof Lt
                ? e
                : this._componentFactoryResolver.resolveComponentFactory(e)),
              this.componentTypes.push(n.componentType);
            const r = n instanceof zt ? null : this._injector.get(Ie),
              s = n.create(vt.NULL, [], t || n.selector, r);
            s.onDestroy(() => {
              this._unloadComponent(s);
            });
            const i = s.injector.get(Xs, null);
            return (
              i &&
                s.injector
                  .get(Js)
                  .registerApplication(s.location.nativeElement, i),
              this._loadComponent(s),
              $e() &&
                this._console.log(
                  "Angular is running in the development mode. Call enableProdMode() to enable the production mode."
                ),
              s
            );
          }
          tick() {
            if (this._runningTick)
              throw new Error("ApplicationRef.tick is called recursively");
            const t = e._tickScope();
            try {
              this._runningTick = !0;
              for (let e of this._views) e.detectChanges();
              if (this._enforceNoNewChanges)
                for (let e of this._views) e.checkNoChanges();
            } catch (n) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(n)
              );
            } finally {
              (this._runningTick = !1), $s(t);
            }
          }
          attachView(e) {
            const t = e;
            this._views.push(t), t.attachToAppRef(this);
          }
          detachView(e) {
            const t = e;
            ui(this._views, t), t.detachFromAppRef();
          }
          _loadComponent(e) {
            this.attachView(e.hostView),
              this.tick(),
              this.components.push(e),
              this._injector
                .get(Ts, [])
                .concat(this._bootstrapListeners)
                .forEach((t) => t(e));
          }
          _unloadComponent(e) {
            this.detachView(e.hostView), ui(this.components, e);
          }
          ngOnDestroy() {
            this._views.slice().forEach((e) => e.destroy());
          }
          get viewCount() {
            return this._views.length;
          }
        }
        return (e._tickScope = js("ApplicationRef#tick()")), e;
      })();
      function ui(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      class ci {}
      class hi {}
      const di = { factoryPathPrefix: "", factoryPathSuffix: ".ngfactory" };
      class pi {
        constructor(e, t) {
          (this._compiler = e), (this._config = t || di);
        }
        load(e) {
          return this._compiler instanceof Ds
            ? this.loadFactory(e)
            : this.loadAndCompile(e);
        }
        loadAndCompile(e) {
          let [t, r] = e.split("#");
          return (
            void 0 === r && (r = "default"),
            n("crnd")(t)
              .then((e) => e[r])
              .then((e) => fi(e, t, r))
              .then((e) => this._compiler.compileModuleAsync(e))
          );
        }
        loadFactory(e) {
          let [t, r] = e.split("#"),
            s = "NgFactory";
          return (
            void 0 === r && ((r = "default"), (s = "")),
            n("crnd")(
              this._config.factoryPathPrefix +
                t +
                this._config.factoryPathSuffix
            )
              .then((e) => e[r + s])
              .then((e) => fi(e, t, r))
          );
        }
      }
      function fi(e, t, n) {
        if (!e) throw new Error(`Cannot find '${n}' in '${t}'`);
        return e;
      }
      class gi {
        constructor(e, t) {
          (this.name = e), (this.callback = t);
        }
      }
      class mi {
        constructor(e, t, n) {
          (this.listeners = []),
            (this.parent = null),
            (this._debugContext = n),
            (this.nativeNode = e),
            t && t instanceof yi && t.addChild(this);
        }
        get injector() {
          return this._debugContext.injector;
        }
        get componentInstance() {
          return this._debugContext.component;
        }
        get context() {
          return this._debugContext.context;
        }
        get references() {
          return this._debugContext.references;
        }
        get providerTokens() {
          return this._debugContext.providerTokens;
        }
      }
      class yi extends mi {
        constructor(e, t, n) {
          super(e, t, n),
            (this.properties = {}),
            (this.attributes = {}),
            (this.classes = {}),
            (this.styles = {}),
            (this.childNodes = []),
            (this.nativeElement = e);
        }
        addChild(e) {
          e && (this.childNodes.push(e), (e.parent = this));
        }
        removeChild(e) {
          const t = this.childNodes.indexOf(e);
          -1 !== t && ((e.parent = null), this.childNodes.splice(t, 1));
        }
        insertChildrenAfter(e, t) {
          const n = this.childNodes.indexOf(e);
          -1 !== n &&
            (this.childNodes.splice(n + 1, 0, ...t),
            t.forEach((t) => {
              t.parent && t.parent.removeChild(t), (e.parent = this);
            }));
        }
        insertBefore(e, t) {
          const n = this.childNodes.indexOf(e);
          -1 === n
            ? this.addChild(t)
            : (t.parent && t.parent.removeChild(t),
              (t.parent = this),
              this.childNodes.splice(n, 0, t));
        }
        query(e) {
          return this.queryAll(e)[0] || null;
        }
        queryAll(e) {
          const t = [];
          return (
            (function e(t, n, r) {
              t.childNodes.forEach((t) => {
                t instanceof yi && (n(t) && r.push(t), e(t, n, r));
              });
            })(this, e, t),
            t
          );
        }
        queryAllNodes(e) {
          const t = [];
          return (
            (function e(t, n, r) {
              t instanceof yi &&
                t.childNodes.forEach((t) => {
                  n(t) && r.push(t), t instanceof yi && e(t, n, r);
                });
            })(this, e, t),
            t
          );
        }
        get children() {
          return this.childNodes.filter((e) => e instanceof yi);
        }
        triggerEventHandler(e, t) {
          this.listeners.forEach((n) => {
            n.name == e && n.callback(t);
          });
        }
      }
      const _i = new Map(),
        vi = function (e) {
          return _i.get(e) || null;
        };
      function bi(e) {
        _i.set(e.nativeNode, e);
      }
      const wi = si(null, "core", [
        { provide: Es, useValue: "unknown" },
        { provide: oi, deps: [vt] },
        { provide: Js, deps: [] },
        { provide: xs, deps: [] },
      ]);
      function Ci() {
        return gn;
      }
      function Si() {
        return mn;
      }
      function Ei(e) {
        return e || "en-US";
      }
      function Ti(e) {
        let t = [];
        return (
          e.onStable.subscribe(() => {
            for (; t.length; ) t.pop()();
          }),
          function (e) {
            t.push(e);
          }
        );
      }
      class xi {
        constructor(e) {}
      }
      function ki(e, t, n, r, s, i) {
        e |= 1;
        const { matchedQueries: o, references: l, matchedQueryIds: a } = Zn(t);
        return {
          nodeIndex: -1,
          parent: null,
          renderParent: null,
          bindingIndex: -1,
          outputIndex: -1,
          flags: e,
          checkIndex: -1,
          childFlags: 0,
          directChildFlags: 0,
          childMatchedQueries: 0,
          matchedQueries: o,
          matchedQueryIds: a,
          references: l,
          ngContentIndex: n,
          childCount: r,
          bindings: [],
          bindingFlags: 0,
          outputs: [],
          element: {
            ns: null,
            name: null,
            attrs: null,
            template: i ? er(i) : null,
            componentProvider: null,
            componentView: null,
            componentRendererType: null,
            publicProviders: null,
            allProviders: null,
            handleEvent: s || Rn,
          },
          provider: null,
          text: null,
          query: null,
          ngContent: null,
        };
      }
      function Ai(e, t, n, r, s, i, o = [], l, a, u, c, h) {
        u || (u = Rn);
        const { matchedQueries: d, references: p, matchedQueryIds: f } = Zn(n);
        let g = null,
          m = null;
        i && ([g, m] = lr(i)), (l = l || []);
        const y = new Array(l.length);
        for (let b = 0; b < l.length; b++) {
          const [e, t, n] = l[b],
            [r, s] = lr(t);
          let i = void 0,
            o = void 0;
          switch (15 & e) {
            case 4:
              o = n;
              break;
            case 1:
            case 8:
              i = n;
          }
          y[b] = {
            flags: e,
            ns: r,
            name: s,
            nonMinifiedName: s,
            securityContext: i,
            suffix: o,
          };
        }
        a = a || [];
        const _ = new Array(a.length);
        for (let b = 0; b < a.length; b++) {
          const [e, t] = a[b];
          _[b] = { type: 0, target: e, eventName: t, propName: null };
        }
        const v = (o = o || []).map(([e, t]) => {
          const [n, r] = lr(e);
          return [n, r, t];
        });
        return (
          (h = (function (e) {
            if (e && "$$undefined" === e.id) {
              const t =
                (null != e.encapsulation && e.encapsulation !== De.None) ||
                e.styles.length ||
                Object.keys(e.data).length;
              e.id = t ? "c" + Vn++ : "$$empty";
            }
            return e && "$$empty" === e.id && (e = null), e || null;
          })(h)),
          c && (t |= 33554432),
          {
            nodeIndex: -1,
            parent: null,
            renderParent: null,
            bindingIndex: -1,
            outputIndex: -1,
            checkIndex: e,
            flags: (t |= 1),
            childFlags: 0,
            directChildFlags: 0,
            childMatchedQueries: 0,
            matchedQueries: d,
            matchedQueryIds: f,
            references: p,
            ngContentIndex: r,
            childCount: s,
            bindings: y,
            bindingFlags: ar(y),
            outputs: _,
            element: {
              ns: g,
              name: m,
              attrs: v,
              template: null,
              componentProvider: null,
              componentView: c || null,
              componentRendererType: h,
              publicProviders: null,
              allProviders: null,
              handleEvent: u || Rn,
            },
            provider: null,
            text: null,
            query: null,
            ngContent: null,
          }
        );
      }
      function Ii(e, t, n) {
        const r = n.element,
          s = e.root.selectorOrNode,
          i = e.renderer;
        let o;
        if (e.parent || !s) {
          o = r.name ? i.createElement(r.name, r.ns) : i.createComment("");
          const s = Jn(e, t, n);
          s && i.appendChild(s, o);
        } else
          o = i.selectRootElement(
            s,
            !!r.componentRendererType &&
              r.componentRendererType.encapsulation === De.ShadowDom
          );
        if (r.attrs)
          for (let l = 0; l < r.attrs.length; l++) {
            const [e, t, n] = r.attrs[l];
            i.setAttribute(o, t, n, e);
          }
        return o;
      }
      function Pi(e, t, n, r) {
        for (let o = 0; o < n.outputs.length; o++) {
          const l = n.outputs[o],
            a = Ni(
              e,
              n.nodeIndex,
              ((i = l.eventName), (s = l.target) ? `${s}:${i}` : i)
            );
          let u = l.target,
            c = e;
          "component" === l.target && ((u = null), (c = t));
          const h = c.renderer.listen(u || r, l.eventName, a);
          e.disposables[n.outputIndex + o] = h;
        }
        var s, i;
      }
      function Ni(e, t, n) {
        return (r) => Bn(e, t, n, r);
      }
      function Ri(e, t, n, r) {
        if (!Un(e, t, n, r)) return !1;
        const s = t.bindings[n],
          i = kn(e, t.nodeIndex),
          o = i.renderElement,
          l = s.name;
        switch (15 & s.flags) {
          case 1:
            !(function (e, t, n, r, s, i) {
              const o = t.securityContext;
              let l = o ? e.root.sanitizer.sanitize(o, i) : i;
              l = null != l ? l.toString() : null;
              const a = e.renderer;
              null != i
                ? a.setAttribute(n, s, l, r)
                : a.removeAttribute(n, s, r);
            })(e, s, o, s.ns, l, r);
            break;
          case 2:
            !(function (e, t, n, r) {
              const s = e.renderer;
              r ? s.addClass(t, n) : s.removeClass(t, n);
            })(e, o, l, r);
            break;
          case 4:
            !(function (e, t, n, r, s) {
              let i = e.root.sanitizer.sanitize(ut.STYLE, s);
              if (null != i) {
                i = i.toString();
                const e = t.suffix;
                null != e && (i += e);
              } else i = null;
              const o = e.renderer;
              null != i ? o.setStyle(n, r, i) : o.removeStyle(n, r);
            })(e, s, o, l, r);
            break;
          case 8:
            !(function (e, t, n, r, s) {
              const i = t.securityContext;
              let o = i ? e.root.sanitizer.sanitize(i, s) : s;
              e.renderer.setProperty(n, r, o);
            })(
              33554432 & t.flags && 32 & s.flags ? i.componentView : e,
              s,
              o,
              l,
              r
            );
        }
        return !0;
      }
      function Di(e, t, n) {
        let r = [];
        for (let s in n) r.push({ propName: s, bindingType: n[s] });
        return {
          nodeIndex: -1,
          parent: null,
          renderParent: null,
          bindingIndex: -1,
          outputIndex: -1,
          checkIndex: -1,
          flags: e,
          childFlags: 0,
          directChildFlags: 0,
          childMatchedQueries: 0,
          ngContentIndex: -1,
          matchedQueries: {},
          matchedQueryIds: 0,
          references: {},
          childCount: 0,
          bindings: [],
          bindingFlags: 0,
          outputs: [],
          element: null,
          provider: null,
          text: null,
          query: { id: t, filterId: Qn(t), bindings: r },
          ngContent: null,
        };
      }
      function Oi(e) {
        const t = e.def.nodeMatchedQueries;
        for (; e.parent && Kn(e); ) {
          let n = e.parentNodeDef;
          e = e.parent;
          const r = n.nodeIndex + n.childCount;
          for (let s = 0; s <= r; s++) {
            const r = e.def.nodes[s];
            67108864 & r.flags &&
              536870912 & r.flags &&
              (r.query.filterId & t) === r.query.filterId &&
              Pn(e, s).setDirty(),
              (!(1 & r.flags && s + r.childCount < n.nodeIndex) &&
                67108864 & r.childFlags &&
                536870912 & r.childFlags) ||
                (s += r.childCount);
          }
        }
        if (134217728 & e.def.nodeFlags)
          for (let n = 0; n < e.def.nodes.length; n++) {
            const t = e.def.nodes[n];
            134217728 & t.flags && 536870912 & t.flags && Pn(e, n).setDirty(),
              (n += t.childCount);
          }
      }
      function Mi(e, t) {
        const n = Pn(e, t.nodeIndex);
        if (!n.dirty) return;
        let r,
          s = void 0;
        if (67108864 & t.flags) {
          const n = t.parent.parent;
          (s = Fi(e, n.nodeIndex, n.nodeIndex + n.childCount, t.query, [])),
            (r = An(e, t.parent.nodeIndex).instance);
        } else
          134217728 & t.flags &&
            ((s = Fi(e, 0, e.def.nodes.length - 1, t.query, [])),
            (r = e.component));
        n.reset(s);
        const i = t.query.bindings;
        let o = !1;
        for (let l = 0; l < i.length; l++) {
          const e = i[l];
          let t;
          switch (e.bindingType) {
            case 0:
              t = n.first;
              break;
            case 1:
              (t = n), (o = !0);
          }
          r[e.propName] = t;
        }
        o && n.notifyOnChanges();
      }
      function Fi(e, t, n, r, s) {
        for (let i = t; i <= n; i++) {
          const t = e.def.nodes[i],
            n = t.matchedQueries[r.id];
          if (
            (null != n && s.push(Vi(e, t, n)),
            1 & t.flags &&
              t.element.template &&
              (t.element.template.nodeMatchedQueries & r.filterId) ===
                r.filterId)
          ) {
            const n = kn(e, i);
            if (
              ((t.childMatchedQueries & r.filterId) === r.filterId &&
                (Fi(e, i + 1, i + t.childCount, r, s), (i += t.childCount)),
              16777216 & t.flags)
            ) {
              const e = n.viewContainer._embeddedViews;
              for (let t = 0; t < e.length; t++) {
                const i = e[t],
                  o = zn(i);
                o && o === n && Fi(i, 0, i.def.nodes.length - 1, r, s);
              }
            }
            const o = n.template._projectedViews;
            if (o)
              for (let e = 0; e < o.length; e++) {
                const t = o[e];
                Fi(t, 0, t.def.nodes.length - 1, r, s);
              }
          }
          (t.childMatchedQueries & r.filterId) !== r.filterId &&
            (i += t.childCount);
        }
        return s;
      }
      function Vi(e, t, n) {
        if (null != n)
          switch (n) {
            case 1:
              return kn(e, t.nodeIndex).renderElement;
            case 0:
              return new Wt(kn(e, t.nodeIndex).renderElement);
            case 2:
              return kn(e, t.nodeIndex).template;
            case 3:
              return kn(e, t.nodeIndex).viewContainer;
            case 4:
              return An(e, t.nodeIndex).instance;
          }
      }
      function Li(e, t, n) {
        const r = Jn(e, t, n);
        r && rr(e, n.ngContent.index, 1, r, null, void 0);
      }
      function Ui(e, t) {
        return $i(128, e, new Array(t + 1));
      }
      function ji(e, t) {
        const n = Object.keys(t),
          r = n.length,
          s = new Array(r);
        for (let i = 0; i < r; i++) {
          const e = n[i];
          s[t[e]] = e;
        }
        return $i(64, e, s);
      }
      function $i(e, t, n) {
        const r = new Array(n.length);
        for (let s = 0; s < n.length; s++) {
          const e = n[s];
          r[s] = {
            flags: 8,
            name: e,
            ns: null,
            nonMinifiedName: e,
            securityContext: null,
            suffix: null,
          };
        }
        return {
          nodeIndex: -1,
          parent: null,
          renderParent: null,
          bindingIndex: -1,
          outputIndex: -1,
          checkIndex: t,
          flags: e,
          childFlags: 0,
          directChildFlags: 0,
          childMatchedQueries: 0,
          matchedQueries: {},
          matchedQueryIds: 0,
          references: {},
          ngContentIndex: -1,
          childCount: 0,
          bindings: r,
          bindingFlags: ar(r),
          outputs: [],
          element: null,
          provider: null,
          text: null,
          query: null,
          ngContent: null,
        };
      }
      function Hi(e, t, n) {
        const r = new Array(n.length - 1);
        for (let s = 1; s < n.length; s++)
          r[s - 1] = {
            flags: 8,
            name: null,
            ns: null,
            nonMinifiedName: null,
            securityContext: null,
            suffix: n[s],
          };
        return {
          nodeIndex: -1,
          parent: null,
          renderParent: null,
          bindingIndex: -1,
          outputIndex: -1,
          checkIndex: e,
          flags: 2,
          childFlags: 0,
          directChildFlags: 0,
          childMatchedQueries: 0,
          matchedQueries: {},
          matchedQueryIds: 0,
          references: {},
          ngContentIndex: t,
          childCount: 0,
          bindings: r,
          bindingFlags: 8,
          outputs: [],
          element: null,
          provider: null,
          text: { prefix: n[0] },
          query: null,
          ngContent: null,
        };
      }
      function Bi(e, t, n) {
        let r;
        const s = e.renderer;
        r = s.createText(n.text.prefix);
        const i = Jn(e, t, n);
        return i && s.appendChild(i, r), { renderText: r };
      }
      function zi(e, t) {
        return (null != e ? e.toString() : "") + t.suffix;
      }
      function qi(e, t, n, r) {
        let s = 0,
          i = 0,
          o = 0,
          l = 0,
          a = 0,
          u = null,
          c = null,
          h = !1,
          d = !1,
          p = null;
        for (let f = 0; f < t.length; f++) {
          const e = t[f];
          if (
            ((e.nodeIndex = f),
            (e.parent = u),
            (e.bindingIndex = s),
            (e.outputIndex = i),
            (e.renderParent = c),
            (o |= e.flags),
            (a |= e.matchedQueryIds),
            e.element)
          ) {
            const t = e.element;
            (t.publicProviders = u
              ? u.element.publicProviders
              : Object.create(null)),
              (t.allProviders = t.publicProviders),
              (h = !1),
              (d = !1),
              e.element.template &&
                (a |= e.element.template.nodeMatchedQueries);
          }
          if (
            (Gi(u, e, t.length),
            (s += e.bindings.length),
            (i += e.outputs.length),
            !c && 3 & e.flags && (p = e),
            20224 & e.flags)
          ) {
            h ||
              ((h = !0),
              (u.element.publicProviders = Object.create(
                u.element.publicProviders
              )),
              (u.element.allProviders = u.element.publicProviders));
            const t = 0 != (32768 & e.flags);
            0 == (8192 & e.flags) || t
              ? (u.element.publicProviders[On(e.provider.token)] = e)
              : (d ||
                  ((d = !0),
                  (u.element.allProviders = Object.create(
                    u.element.publicProviders
                  ))),
                (u.element.allProviders[On(e.provider.token)] = e)),
              t && (u.element.componentProvider = e);
          }
          if (
            (u
              ? ((u.childFlags |= e.flags),
                (u.directChildFlags |= e.flags),
                (u.childMatchedQueries |= e.matchedQueryIds),
                e.element &&
                  e.element.template &&
                  (u.childMatchedQueries |=
                    e.element.template.nodeMatchedQueries))
              : (l |= e.flags),
            e.childCount > 0)
          )
            (u = e), Wi(e) || (c = e);
          else
            for (; u && f === u.nodeIndex + u.childCount; ) {
              const e = u.parent;
              e &&
                ((e.childFlags |= u.childFlags),
                (e.childMatchedQueries |= u.childMatchedQueries)),
                (u = e),
                (c = u && Wi(u) ? u.renderParent : u);
            }
        }
        return {
          factory: null,
          nodeFlags: o,
          rootNodeFlags: l,
          nodeMatchedQueries: a,
          flags: e,
          nodes: t,
          updateDirectives: n || Rn,
          updateRenderer: r || Rn,
          handleEvent: (e, n, r, s) => t[n].element.handleEvent(e, r, s),
          bindingCount: s,
          outputCount: i,
          lastRenderRootNode: p,
        };
      }
      function Wi(e) {
        return 0 != (1 & e.flags) && null === e.element.name;
      }
      function Gi(e, t, n) {
        const r = t.element && t.element.template;
        if (r) {
          if (!r.lastRenderRootNode)
            throw new Error(
              "Illegal State: Embedded templates without nodes are not allowed!"
            );
          if (r.lastRenderRootNode && 16777216 & r.lastRenderRootNode.flags)
            throw new Error(
              `Illegal State: Last root node of a template can't have embedded views, at index ${t.nodeIndex}!`
            );
        }
        if (20224 & t.flags && 0 == (1 & (e ? e.flags : 0)))
          throw new Error(
            `Illegal State: StaticProvider/Directive nodes need to be children of elements or anchors, at index ${t.nodeIndex}!`
          );
        if (t.query) {
          if (67108864 & t.flags && (!e || 0 == (16384 & e.flags)))
            throw new Error(
              `Illegal State: Content Query nodes need to be children of directives, at index ${t.nodeIndex}!`
            );
          if (134217728 & t.flags && e)
            throw new Error(
              `Illegal State: View Query nodes have to be top level nodes, at index ${t.nodeIndex}!`
            );
        }
        if (t.childCount) {
          const r = e ? e.nodeIndex + e.childCount : n - 1;
          if (t.nodeIndex <= r && t.nodeIndex + t.childCount > r)
            throw new Error(
              `Illegal State: childCount of node leads outside of parent, at index ${t.nodeIndex}!`
            );
        }
      }
      function Ki(e, t, n, r) {
        const s = Xi(e.root, e.renderer, e, t, n);
        return Ji(s, e.component, r), Yi(s), s;
      }
      function Qi(e, t, n) {
        const r = Xi(e, e.renderer, null, null, t);
        return Ji(r, n, n), Yi(r), r;
      }
      function Zi(e, t, n, r) {
        const s = t.element.componentRendererType;
        let i;
        return (
          (i = s
            ? e.root.rendererFactory.createRenderer(r, s)
            : e.root.renderer),
          Xi(e.root, i, e, t.element.componentProvider, n)
        );
      }
      function Xi(e, t, n, r, s) {
        const i = new Array(s.nodes.length),
          o = s.outputCount ? new Array(s.outputCount) : null;
        return {
          def: s,
          parent: n,
          viewContainerParent: null,
          parentNodeDef: r,
          context: null,
          component: null,
          nodes: i,
          state: 13,
          root: e,
          renderer: t,
          oldValues: new Array(s.bindingCount),
          disposables: o,
          initIndex: -1,
        };
      }
      function Ji(e, t, n) {
        (e.component = t), (e.context = n);
      }
      function Yi(e) {
        let t;
        Gn(e) &&
          (t = kn(e.parent, e.parentNodeDef.parent.nodeIndex).renderElement);
        const n = e.def,
          r = e.nodes;
        for (let s = 0; s < n.nodes.length; s++) {
          const i = n.nodes[s];
          let o;
          switch ((Nn.setCurrentNode(e, s), 201347067 & i.flags)) {
            case 1:
              const n = Ii(e, t, i);
              let l = void 0;
              if (33554432 & i.flags) {
                const t = er(i.element.componentView);
                l = Nn.createComponentView(e, i, t, n);
              }
              Pi(e, l, i, n),
                (o = {
                  renderElement: n,
                  componentView: l,
                  viewContainer: null,
                  template: i.element.template ? Ir(e, i) : void 0,
                }),
                16777216 & i.flags && (o.viewContainer = Tr(e, i, o));
              break;
            case 2:
              o = Bi(e, t, i);
              break;
            case 512:
            case 1024:
            case 2048:
            case 256:
              (o = r[s]), o || 4096 & i.flags || (o = { instance: Zr(e, i) });
              break;
            case 16:
              o = { instance: Xr(e, i) };
              break;
            case 16384:
              (o = r[s]),
                o || (o = { instance: Jr(e, i) }),
                32768 & i.flags &&
                  Ji(
                    kn(e, i.parent.nodeIndex).componentView,
                    o.instance,
                    o.instance
                  );
              break;
            case 32:
            case 64:
            case 128:
              o = { value: void 0 };
              break;
            case 67108864:
            case 134217728:
              o = new ys();
              break;
            case 8:
              Li(e, t, i), (o = void 0);
          }
          r[s] = o;
        }
        ao(e, lo.CreateViewNodes), po(e, 201326592, 268435456, 0);
      }
      function eo(e) {
        ro(e),
          Nn.updateDirectives(e, 1),
          uo(e, lo.CheckNoChanges),
          Nn.updateRenderer(e, 1),
          ao(e, lo.CheckNoChanges),
          (e.state &= -97);
      }
      function to(e) {
        1 & e.state ? ((e.state &= -2), (e.state |= 2)) : (e.state &= -3),
          En(e, 0, 256),
          ro(e),
          Nn.updateDirectives(e, 0),
          uo(e, lo.CheckAndUpdate),
          po(e, 67108864, 536870912, 0);
        let t = En(e, 256, 512);
        os(e, 2097152 | (t ? 1048576 : 0)),
          Nn.updateRenderer(e, 0),
          ao(e, lo.CheckAndUpdate),
          po(e, 134217728, 536870912, 0),
          (t = En(e, 512, 768)),
          os(e, 8388608 | (t ? 4194304 : 0)),
          2 & e.def.flags && (e.state &= -9),
          (e.state &= -97),
          En(e, 768, 1024);
      }
      function no(e, t, n, r, s, i, o, l, a, u, c, h, d) {
        return 0 === n
          ? (function (e, t, n, r, s, i, o, l, a, u, c, h) {
              switch (201347067 & t.flags) {
                case 1:
                  return (function (e, t, n, r, s, i, o, l, a, u, c, h) {
                    const d = t.bindings.length;
                    let p = !1;
                    return (
                      d > 0 && Ri(e, t, 0, n) && (p = !0),
                      d > 1 && Ri(e, t, 1, r) && (p = !0),
                      d > 2 && Ri(e, t, 2, s) && (p = !0),
                      d > 3 && Ri(e, t, 3, i) && (p = !0),
                      d > 4 && Ri(e, t, 4, o) && (p = !0),
                      d > 5 && Ri(e, t, 5, l) && (p = !0),
                      d > 6 && Ri(e, t, 6, a) && (p = !0),
                      d > 7 && Ri(e, t, 7, u) && (p = !0),
                      d > 8 && Ri(e, t, 8, c) && (p = !0),
                      d > 9 && Ri(e, t, 9, h) && (p = !0),
                      p
                    );
                  })(e, t, n, r, s, i, o, l, a, u, c, h);
                case 2:
                  return (function (e, t, n, r, s, i, o, l, a, u, c, h) {
                    let d = !1;
                    const p = t.bindings,
                      f = p.length;
                    if (
                      (f > 0 && Un(e, t, 0, n) && (d = !0),
                      f > 1 && Un(e, t, 1, r) && (d = !0),
                      f > 2 && Un(e, t, 2, s) && (d = !0),
                      f > 3 && Un(e, t, 3, i) && (d = !0),
                      f > 4 && Un(e, t, 4, o) && (d = !0),
                      f > 5 && Un(e, t, 5, l) && (d = !0),
                      f > 6 && Un(e, t, 6, a) && (d = !0),
                      f > 7 && Un(e, t, 7, u) && (d = !0),
                      f > 8 && Un(e, t, 8, c) && (d = !0),
                      f > 9 && Un(e, t, 9, h) && (d = !0),
                      d)
                    ) {
                      let d = t.text.prefix;
                      f > 0 && (d += zi(n, p[0])),
                        f > 1 && (d += zi(r, p[1])),
                        f > 2 && (d += zi(s, p[2])),
                        f > 3 && (d += zi(i, p[3])),
                        f > 4 && (d += zi(o, p[4])),
                        f > 5 && (d += zi(l, p[5])),
                        f > 6 && (d += zi(a, p[6])),
                        f > 7 && (d += zi(u, p[7])),
                        f > 8 && (d += zi(c, p[8])),
                        f > 9 && (d += zi(h, p[9]));
                      const g = xn(e, t.nodeIndex).renderText;
                      e.renderer.setValue(g, d);
                    }
                    return d;
                  })(e, t, n, r, s, i, o, l, a, u, c, h);
                case 16384:
                  return (function (e, t, n, r, s, i, o, l, a, u, c, h) {
                    const d = An(e, t.nodeIndex),
                      p = d.instance;
                    let f = !1,
                      g = void 0;
                    const m = t.bindings.length;
                    return (
                      m > 0 &&
                        Ln(e, t, 0, n) &&
                        ((f = !0), (g = is(e, d, t, 0, n, g))),
                      m > 1 &&
                        Ln(e, t, 1, r) &&
                        ((f = !0), (g = is(e, d, t, 1, r, g))),
                      m > 2 &&
                        Ln(e, t, 2, s) &&
                        ((f = !0), (g = is(e, d, t, 2, s, g))),
                      m > 3 &&
                        Ln(e, t, 3, i) &&
                        ((f = !0), (g = is(e, d, t, 3, i, g))),
                      m > 4 &&
                        Ln(e, t, 4, o) &&
                        ((f = !0), (g = is(e, d, t, 4, o, g))),
                      m > 5 &&
                        Ln(e, t, 5, l) &&
                        ((f = !0), (g = is(e, d, t, 5, l, g))),
                      m > 6 &&
                        Ln(e, t, 6, a) &&
                        ((f = !0), (g = is(e, d, t, 6, a, g))),
                      m > 7 &&
                        Ln(e, t, 7, u) &&
                        ((f = !0), (g = is(e, d, t, 7, u, g))),
                      m > 8 &&
                        Ln(e, t, 8, c) &&
                        ((f = !0), (g = is(e, d, t, 8, c, g))),
                      m > 9 &&
                        Ln(e, t, 9, h) &&
                        ((f = !0), (g = is(e, d, t, 9, h, g))),
                      g && p.ngOnChanges(g),
                      65536 & t.flags &&
                        Tn(e, 256, t.nodeIndex) &&
                        p.ngOnInit(),
                      262144 & t.flags && p.ngDoCheck(),
                      f
                    );
                  })(e, t, n, r, s, i, o, l, a, u, c, h);
                case 32:
                case 64:
                case 128:
                  return (function (e, t, n, r, s, i, o, l, a, u, c, h) {
                    const d = t.bindings;
                    let p = !1;
                    const f = d.length;
                    if (
                      (f > 0 && Un(e, t, 0, n) && (p = !0),
                      f > 1 && Un(e, t, 1, r) && (p = !0),
                      f > 2 && Un(e, t, 2, s) && (p = !0),
                      f > 3 && Un(e, t, 3, i) && (p = !0),
                      f > 4 && Un(e, t, 4, o) && (p = !0),
                      f > 5 && Un(e, t, 5, l) && (p = !0),
                      f > 6 && Un(e, t, 6, a) && (p = !0),
                      f > 7 && Un(e, t, 7, u) && (p = !0),
                      f > 8 && Un(e, t, 8, c) && (p = !0),
                      f > 9 && Un(e, t, 9, h) && (p = !0),
                      p)
                    ) {
                      const p = In(e, t.nodeIndex);
                      let g;
                      switch (201347067 & t.flags) {
                        case 32:
                          (g = new Array(d.length)),
                            f > 0 && (g[0] = n),
                            f > 1 && (g[1] = r),
                            f > 2 && (g[2] = s),
                            f > 3 && (g[3] = i),
                            f > 4 && (g[4] = o),
                            f > 5 && (g[5] = l),
                            f > 6 && (g[6] = a),
                            f > 7 && (g[7] = u),
                            f > 8 && (g[8] = c),
                            f > 9 && (g[9] = h);
                          break;
                        case 64:
                          (g = {}),
                            f > 0 && (g[d[0].name] = n),
                            f > 1 && (g[d[1].name] = r),
                            f > 2 && (g[d[2].name] = s),
                            f > 3 && (g[d[3].name] = i),
                            f > 4 && (g[d[4].name] = o),
                            f > 5 && (g[d[5].name] = l),
                            f > 6 && (g[d[6].name] = a),
                            f > 7 && (g[d[7].name] = u),
                            f > 8 && (g[d[8].name] = c),
                            f > 9 && (g[d[9].name] = h);
                          break;
                        case 128:
                          const e = n;
                          switch (f) {
                            case 1:
                              g = e.transform(n);
                              break;
                            case 2:
                              g = e.transform(r);
                              break;
                            case 3:
                              g = e.transform(r, s);
                              break;
                            case 4:
                              g = e.transform(r, s, i);
                              break;
                            case 5:
                              g = e.transform(r, s, i, o);
                              break;
                            case 6:
                              g = e.transform(r, s, i, o, l);
                              break;
                            case 7:
                              g = e.transform(r, s, i, o, l, a);
                              break;
                            case 8:
                              g = e.transform(r, s, i, o, l, a, u);
                              break;
                            case 9:
                              g = e.transform(r, s, i, o, l, a, u, c);
                              break;
                            case 10:
                              g = e.transform(r, s, i, o, l, a, u, c, h);
                          }
                      }
                      p.value = g;
                    }
                    return p;
                  })(e, t, n, r, s, i, o, l, a, u, c, h);
                default:
                  throw "unreachable";
              }
            })(e, t, r, s, i, o, l, a, u, c, h, d)
          : (function (e, t, n) {
              switch (201347067 & t.flags) {
                case 1:
                  return (function (e, t, n) {
                    let r = !1;
                    for (let s = 0; s < n.length; s++)
                      Ri(e, t, s, n[s]) && (r = !0);
                    return r;
                  })(e, t, n);
                case 2:
                  return (function (e, t, n) {
                    const r = t.bindings;
                    let s = !1;
                    for (let i = 0; i < n.length; i++)
                      Un(e, t, i, n[i]) && (s = !0);
                    if (s) {
                      let s = "";
                      for (let e = 0; e < n.length; e++) s += zi(n[e], r[e]);
                      s = t.text.prefix + s;
                      const i = xn(e, t.nodeIndex).renderText;
                      e.renderer.setValue(i, s);
                    }
                    return s;
                  })(e, t, n);
                case 16384:
                  return (function (e, t, n) {
                    const r = An(e, t.nodeIndex),
                      s = r.instance;
                    let i = !1,
                      o = void 0;
                    for (let l = 0; l < n.length; l++)
                      Ln(e, t, l, n[l]) &&
                        ((i = !0), (o = is(e, r, t, l, n[l], o)));
                    return (
                      o && s.ngOnChanges(o),
                      65536 & t.flags &&
                        Tn(e, 256, t.nodeIndex) &&
                        s.ngOnInit(),
                      262144 & t.flags && s.ngDoCheck(),
                      i
                    );
                  })(e, t, n);
                case 32:
                case 64:
                case 128:
                  return (function (e, t, n) {
                    const r = t.bindings;
                    let s = !1;
                    for (let i = 0; i < n.length; i++)
                      Un(e, t, i, n[i]) && (s = !0);
                    if (s) {
                      const s = In(e, t.nodeIndex);
                      let i;
                      switch (201347067 & t.flags) {
                        case 32:
                          i = n;
                          break;
                        case 64:
                          i = {};
                          for (let s = 0; s < n.length; s++)
                            i[r[s].name] = n[s];
                          break;
                        case 128:
                          const e = n[0],
                            t = n.slice(1);
                          i = e.transform(...t);
                      }
                      s.value = i;
                    }
                    return s;
                  })(e, t, n);
                default:
                  throw "unreachable";
              }
            })(e, t, r);
      }
      function ro(e) {
        const t = e.def;
        if (4 & t.nodeFlags)
          for (let n = 0; n < t.nodes.length; n++) {
            const r = t.nodes[n];
            if (4 & r.flags) {
              const t = kn(e, n).template._projectedViews;
              if (t)
                for (let n = 0; n < t.length; n++) {
                  const r = t[n];
                  (r.state |= 32), Hn(r, e);
                }
            } else 0 == (4 & r.childFlags) && (n += r.childCount);
          }
      }
      function so(e, t, n, r, s, i, o, l, a, u, c, h, d) {
        return (
          0 === n
            ? (function (e, t, n, r, s, i, o, l, a, u, c, h) {
                const d = t.bindings.length;
                d > 0 && jn(e, t, 0, n),
                  d > 1 && jn(e, t, 1, r),
                  d > 2 && jn(e, t, 2, s),
                  d > 3 && jn(e, t, 3, i),
                  d > 4 && jn(e, t, 4, o),
                  d > 5 && jn(e, t, 5, l),
                  d > 6 && jn(e, t, 6, a),
                  d > 7 && jn(e, t, 7, u),
                  d > 8 && jn(e, t, 8, c),
                  d > 9 && jn(e, t, 9, h);
              })(e, t, r, s, i, o, l, a, u, c, h, d)
            : (function (e, t, n) {
                for (let r = 0; r < n.length; r++) jn(e, t, r, n[r]);
              })(e, t, r),
          !1
        );
      }
      function io(e, t) {
        if (Pn(e, t.nodeIndex).dirty)
          throw wn(
            Nn.createDebugContext(e, t.nodeIndex),
            `Query ${t.query.id} not dirty`,
            `Query ${t.query.id} dirty`,
            0 != (1 & e.state)
          );
      }
      function oo(e) {
        if (!(128 & e.state)) {
          if (
            (uo(e, lo.Destroy), ao(e, lo.Destroy), os(e, 131072), e.disposables)
          )
            for (let t = 0; t < e.disposables.length; t++) e.disposables[t]();
          !(function (e) {
            if (!(16 & e.state)) return;
            const t = zn(e);
            if (t) {
              const n = t.template._projectedViews;
              n && (Re(n, n.indexOf(e)), Nn.dirtyParentQueries(e));
            }
          })(e),
            e.renderer.destroyNode &&
              (function (e) {
                const t = e.def.nodes.length;
                for (let n = 0; n < t; n++) {
                  const t = e.def.nodes[n];
                  1 & t.flags
                    ? e.renderer.destroyNode(kn(e, n).renderElement)
                    : 2 & t.flags
                    ? e.renderer.destroyNode(xn(e, n).renderText)
                    : (67108864 & t.flags || 134217728 & t.flags) &&
                      Pn(e, n).destroy();
                }
              })(e),
            Gn(e) && e.renderer.destroy(),
            (e.state |= 128);
        }
      }
      const lo = (function () {
        var e = {
          CreateViewNodes: 0,
          CheckNoChanges: 1,
          CheckNoChangesProjectedViews: 2,
          CheckAndUpdate: 3,
          CheckAndUpdateProjectedViews: 4,
          Destroy: 5,
        };
        return (
          (e[e.CreateViewNodes] = "CreateViewNodes"),
          (e[e.CheckNoChanges] = "CheckNoChanges"),
          (e[e.CheckNoChangesProjectedViews] = "CheckNoChangesProjectedViews"),
          (e[e.CheckAndUpdate] = "CheckAndUpdate"),
          (e[e.CheckAndUpdateProjectedViews] = "CheckAndUpdateProjectedViews"),
          (e[e.Destroy] = "Destroy"),
          e
        );
      })();
      function ao(e, t) {
        const n = e.def;
        if (33554432 & n.nodeFlags)
          for (let r = 0; r < n.nodes.length; r++) {
            const s = n.nodes[r];
            33554432 & s.flags
              ? co(kn(e, r).componentView, t)
              : 0 == (33554432 & s.childFlags) && (r += s.childCount);
          }
      }
      function uo(e, t) {
        const n = e.def;
        if (16777216 & n.nodeFlags)
          for (let r = 0; r < n.nodes.length; r++) {
            const s = n.nodes[r];
            if (16777216 & s.flags) {
              const n = kn(e, r).viewContainer._embeddedViews;
              for (let e = 0; e < n.length; e++) co(n[e], t);
            } else 0 == (16777216 & s.childFlags) && (r += s.childCount);
          }
      }
      function co(e, t) {
        const n = e.state;
        switch (t) {
          case lo.CheckNoChanges:
            0 == (128 & n) &&
              (12 == (12 & n)
                ? eo(e)
                : 64 & n && ho(e, lo.CheckNoChangesProjectedViews));
            break;
          case lo.CheckNoChangesProjectedViews:
            0 == (128 & n) && (32 & n ? eo(e) : 64 & n && ho(e, t));
            break;
          case lo.CheckAndUpdate:
            0 == (128 & n) &&
              (12 == (12 & n)
                ? to(e)
                : 64 & n && ho(e, lo.CheckAndUpdateProjectedViews));
            break;
          case lo.CheckAndUpdateProjectedViews:
            0 == (128 & n) && (32 & n ? to(e) : 64 & n && ho(e, t));
            break;
          case lo.Destroy:
            oo(e);
            break;
          case lo.CreateViewNodes:
            Yi(e);
        }
      }
      function ho(e, t) {
        uo(e, t), ao(e, t);
      }
      function po(e, t, n, r) {
        if (!(e.def.nodeFlags & t && e.def.nodeFlags & n)) return;
        const s = e.def.nodes.length;
        for (let i = 0; i < s; i++) {
          const s = e.def.nodes[i];
          if (s.flags & t && s.flags & n)
            switch ((Nn.setCurrentNode(e, s.nodeIndex), r)) {
              case 0:
                Mi(e, s);
                break;
              case 1:
                io(e, s);
            }
          (s.childFlags & t && s.childFlags & n) || (i += s.childCount);
        }
      }
      let fo = !1;
      function go(e, t, n, r, s, i) {
        const o = s.injector.get(Qt);
        return Qi(yo(e, s, o, t, n), r, i);
      }
      function mo(e, t, n, r, s, i) {
        const o = s.injector.get(Qt),
          l = yo(e, s, new Qo(o), t, n),
          a = ko(r);
        return Go(Do.create, Qi, null, [l, a, i]);
      }
      function yo(e, t, n, r, s) {
        const i = t.injector.get(ct),
          o = t.injector.get(Le),
          l = n.createRenderer(null, null);
        return {
          ngModule: t,
          injector: e,
          projectableNodes: r,
          selectorOrNode: s,
          sanitizer: i,
          rendererFactory: n,
          renderer: l,
          errorHandler: o,
        };
      }
      function _o(e, t, n, r) {
        const s = ko(n);
        return Go(Do.create, Ki, null, [e, t, s, r]);
      }
      function vo(e, t, n, r) {
        return (
          (n = So.get(t.element.componentProvider.provider.token) || ko(n)),
          Go(Do.create, Zi, null, [e, t, n, r])
        );
      }
      function bo(e, t, n, r) {
        return Fr(
          e,
          t,
          n,
          (function (e) {
            const { hasOverrides: t, hasDeprecatedOverrides: n } = (function (
              e
            ) {
              let t = !1,
                n = !1;
              return (
                0 === wo.size ||
                  (e.providers.forEach((e) => {
                    const r = wo.get(e.token);
                    3840 & e.flags &&
                      r &&
                      ((t = !0), (n = n || r.deprecatedBehavior));
                  }),
                  e.modules.forEach((e) => {
                    Co.forEach((r, s) => {
                      ae(s).providedIn === e &&
                        ((t = !0), (n = n || r.deprecatedBehavior));
                    });
                  })),
                { hasOverrides: t, hasDeprecatedOverrides: n }
              );
            })(e);
            return t
              ? ((function (e) {
                  for (let t = 0; t < e.providers.length; t++) {
                    const r = e.providers[t];
                    n && (r.flags |= 4096);
                    const s = wo.get(r.token);
                    s &&
                      ((r.flags = (-3841 & r.flags) | s.flags),
                      (r.deps = Xn(s.deps)),
                      (r.value = s.value));
                  }
                  if (Co.size > 0) {
                    let t = new Set(e.modules);
                    Co.forEach((r, s) => {
                      if (t.has(ae(s).providedIn)) {
                        let t = {
                          token: s,
                          flags: r.flags | (n ? 4096 : 0),
                          deps: Xn(r.deps),
                          value: r.value,
                          index: e.providers.length,
                        };
                        e.providers.push(t), (e.providersByKey[On(s)] = t);
                      }
                    });
                  }
                })((e = e.factory(() => Rn))),
                e)
              : e;
          })(r)
        );
      }
      const wo = new Map(),
        Co = new Map(),
        So = new Map();
      function Eo(e) {
        let t;
        wo.set(e.token, e),
          "function" == typeof e.token &&
            (t = ae(e.token)) &&
            "function" == typeof t.providedIn &&
            Co.set(e.token, e);
      }
      function To(e, t) {
        const n = er(t.viewDefFactory),
          r = er(n.nodes[0].element.componentView);
        So.set(e, r);
      }
      function xo() {
        wo.clear(), Co.clear(), So.clear();
      }
      function ko(e) {
        if (0 === wo.size) return e;
        const t = (function (e) {
          const t = [];
          let n = null;
          for (let r = 0; r < e.nodes.length; r++) {
            const s = e.nodes[r];
            1 & s.flags && (n = s),
              n &&
                3840 & s.flags &&
                wo.has(s.provider.token) &&
                (t.push(n.nodeIndex), (n = null));
          }
          return t;
        })(e);
        if (0 === t.length) return e;
        e = e.factory(() => Rn);
        for (let r = 0; r < t.length; r++) n(e, t[r]);
        return e;
        function n(e, t) {
          for (let n = t + 1; n < e.nodes.length; n++) {
            const t = e.nodes[n];
            if (1 & t.flags) return;
            if (3840 & t.flags) {
              const e = t.provider,
                n = wo.get(e.token);
              n &&
                ((t.flags = (-3841 & t.flags) | n.flags),
                (e.deps = Xn(n.deps)),
                (e.value = n.value));
            }
          }
        }
      }
      function Ao(e, t, n, r, s, i, o, l, a, u, c, h, d) {
        const p = e.def.nodes[t];
        return (
          no(e, p, n, r, s, i, o, l, a, u, c, h, d),
          224 & p.flags ? In(e, t).value : void 0
        );
      }
      function Io(e, t, n, r, s, i, o, l, a, u, c, h, d) {
        const p = e.def.nodes[t];
        return (
          so(e, p, n, r, s, i, o, l, a, u, c, h, d),
          224 & p.flags ? In(e, t).value : void 0
        );
      }
      function Po(e) {
        return Go(Do.detectChanges, to, null, [e]);
      }
      function No(e) {
        return Go(Do.checkNoChanges, eo, null, [e]);
      }
      function Ro(e) {
        return Go(Do.destroy, oo, null, [e]);
      }
      const Do = (function () {
        var e = {
          create: 0,
          detectChanges: 1,
          checkNoChanges: 2,
          destroy: 3,
          handleEvent: 4,
        };
        return (
          (e[e.create] = "create"),
          (e[e.detectChanges] = "detectChanges"),
          (e[e.checkNoChanges] = "checkNoChanges"),
          (e[e.destroy] = "destroy"),
          (e[e.handleEvent] = "handleEvent"),
          e
        );
      })();
      let Oo, Mo, Fo;
      function Vo(e, t) {
        (Mo = e), (Fo = t);
      }
      function Lo(e, t, n, r) {
        return (
          Vo(e, t), Go(Do.handleEvent, e.def.handleEvent, null, [e, t, n, r])
        );
      }
      function Uo(e, t) {
        if (128 & e.state) throw Sn(Do[Oo]);
        return (
          Vo(e, Bo(e, 0)),
          e.def.updateDirectives(function (e, n, r, ...s) {
            const i = e.def.nodes[n];
            return (
              0 === t ? $o(e, i, r, s) : Ho(e, i, r, s),
              16384 & i.flags && Vo(e, Bo(e, n)),
              224 & i.flags ? In(e, i.nodeIndex).value : void 0
            );
          }, e)
        );
      }
      function jo(e, t) {
        if (128 & e.state) throw Sn(Do[Oo]);
        return (
          Vo(e, zo(e, 0)),
          e.def.updateRenderer(function (e, n, r, ...s) {
            const i = e.def.nodes[n];
            return (
              0 === t ? $o(e, i, r, s) : Ho(e, i, r, s),
              3 & i.flags && Vo(e, zo(e, n)),
              224 & i.flags ? In(e, i.nodeIndex).value : void 0
            );
          }, e)
        );
      }
      function $o(e, t, n, r) {
        if (no(e, t, n, ...r)) {
          const i = 1 === n ? r[0] : r;
          if (16384 & t.flags) {
            const n = {};
            for (let e = 0; e < t.bindings.length; e++) {
              const r = t.bindings[e],
                o = i[e];
              8 & r.flags &&
                (n[
                  ((s = r.nonMinifiedName),
                  "ng-reflect-" +
                    s
                      .replace(/[$@]/g, "_")
                      .replace(pt, (...e) => "-" + e[1].toLowerCase()))
                ] = ft(o));
            }
            const r = t.parent,
              o = kn(e, r.nodeIndex).renderElement;
            if (r.element.name)
              for (let t in n) {
                const r = n[t];
                null != r
                  ? e.renderer.setAttribute(o, t, r)
                  : e.renderer.removeAttribute(o, t);
              }
            else
              e.renderer.setValue(o, "bindings=" + JSON.stringify(n, null, 2));
          }
        }
        var s;
      }
      function Ho(e, t, n, r) {
        so(e, t, n, ...r);
      }
      function Bo(e, t) {
        for (let n = t; n < e.def.nodes.length; n++) {
          const t = e.def.nodes[n];
          if (16384 & t.flags && t.bindings && t.bindings.length) return n;
        }
        return null;
      }
      function zo(e, t) {
        for (let n = t; n < e.def.nodes.length; n++) {
          const t = e.def.nodes[n];
          if (3 & t.flags && t.bindings && t.bindings.length) return n;
        }
        return null;
      }
      class qo {
        constructor(e, t) {
          (this.view = e),
            (this.nodeIndex = t),
            null == t && (this.nodeIndex = t = 0),
            (this.nodeDef = e.def.nodes[t]);
          let n = this.nodeDef,
            r = e;
          for (; n && 0 == (1 & n.flags); ) n = n.parent;
          if (!n) for (; !n && r; ) (n = qn(r)), (r = r.parent);
          (this.elDef = n), (this.elView = r);
        }
        get elOrCompView() {
          return (
            kn(this.elView, this.elDef.nodeIndex).componentView || this.view
          );
        }
        get injector() {
          return Nr(this.elView, this.elDef);
        }
        get component() {
          return this.elOrCompView.component;
        }
        get context() {
          return this.elOrCompView.context;
        }
        get providerTokens() {
          const e = [];
          if (this.elDef)
            for (
              let t = this.elDef.nodeIndex + 1;
              t <= this.elDef.nodeIndex + this.elDef.childCount;
              t++
            ) {
              const n = this.elView.def.nodes[t];
              20224 & n.flags && e.push(n.provider.token), (t += n.childCount);
            }
          return e;
        }
        get references() {
          const e = {};
          if (this.elDef) {
            Wo(this.elView, this.elDef, e);
            for (
              let t = this.elDef.nodeIndex + 1;
              t <= this.elDef.nodeIndex + this.elDef.childCount;
              t++
            ) {
              const n = this.elView.def.nodes[t];
              20224 & n.flags && Wo(this.elView, n, e), (t += n.childCount);
            }
          }
          return e;
        }
        get componentRenderElement() {
          const e = (function (e) {
            for (; e && !Gn(e); ) e = e.parent;
            return e.parent ? kn(e.parent, qn(e).nodeIndex) : null;
          })(this.elOrCompView);
          return e ? e.renderElement : void 0;
        }
        get renderNode() {
          return 2 & this.nodeDef.flags
            ? Wn(this.view, this.nodeDef)
            : Wn(this.elView, this.elDef);
        }
        logError(e, ...t) {
          let n, r;
          2 & this.nodeDef.flags
            ? ((n = this.view.def), (r = this.nodeDef.nodeIndex))
            : ((n = this.elView.def), (r = this.elDef.nodeIndex));
          const s = (function (e, t) {
            let n = -1;
            for (let r = 0; r <= t; r++) 3 & e.nodes[r].flags && n++;
            return n;
          })(n, r);
          let i = -1;
          n.factory(() => (i++, i === s ? e.error.bind(e, ...t) : Rn)),
            i < s &&
              (e.error(
                "Illegal state: the ViewDefinitionFactory did not call the logger!"
              ),
              e.error(...t));
        }
      }
      function Wo(e, t, n) {
        for (let r in t.references) n[r] = Vi(e, t, t.references[r]);
      }
      function Go(e, t, n, r) {
        const s = Oo,
          i = Mo,
          o = Fo;
        try {
          Oo = e;
          const l = t.apply(n, r);
          return (Mo = i), (Fo = o), (Oo = s), l;
        } catch (l) {
          if (Me(l) || !Mo) throw l;
          throw (function (e, t) {
            return (
              e instanceof Error || (e = new Error(e.toString())), Cn(e, t), e
            );
          })(l, Ko());
        }
      }
      function Ko() {
        return Mo ? new qo(Mo, Fo) : null;
      }
      class Qo {
        constructor(e) {
          this.delegate = e;
        }
        createRenderer(e, t) {
          return new Zo(this.delegate.createRenderer(e, t));
        }
        begin() {
          this.delegate.begin && this.delegate.begin();
        }
        end() {
          this.delegate.end && this.delegate.end();
        }
        whenRenderingDone() {
          return this.delegate.whenRenderingDone
            ? this.delegate.whenRenderingDone()
            : Promise.resolve(null);
        }
      }
      class Zo {
        constructor(e) {
          (this.delegate = e),
            (this.debugContextFactory = Ko),
            (this.data = this.delegate.data);
        }
        createDebugContext(e) {
          return this.debugContextFactory(e);
        }
        destroyNode(e) {
          const t = vi(e);
          !(function (e) {
            _i.delete(e.nativeNode);
          })(t),
            t instanceof mi && (t.listeners.length = 0),
            this.delegate.destroyNode && this.delegate.destroyNode(e);
        }
        destroy() {
          this.delegate.destroy();
        }
        createElement(e, t) {
          const n = this.delegate.createElement(e, t),
            r = this.createDebugContext(n);
          if (r) {
            const t = new yi(n, null, r);
            (t.name = e), bi(t);
          }
          return n;
        }
        createComment(e) {
          const t = this.delegate.createComment(e),
            n = this.createDebugContext(t);
          return n && bi(new mi(t, null, n)), t;
        }
        createText(e) {
          const t = this.delegate.createText(e),
            n = this.createDebugContext(t);
          return n && bi(new mi(t, null, n)), t;
        }
        appendChild(e, t) {
          const n = vi(e),
            r = vi(t);
          n && r && n instanceof yi && n.addChild(r),
            this.delegate.appendChild(e, t);
        }
        insertBefore(e, t, n) {
          const r = vi(e),
            s = vi(t),
            i = vi(n);
          r && s && r instanceof yi && r.insertBefore(i, s),
            this.delegate.insertBefore(e, t, n);
        }
        removeChild(e, t) {
          const n = vi(e),
            r = vi(t);
          n && r && n instanceof yi && n.removeChild(r),
            this.delegate.removeChild(e, t);
        }
        selectRootElement(e, t) {
          const n = this.delegate.selectRootElement(e, t),
            r = Ko();
          return r && bi(new yi(n, null, r)), n;
        }
        setAttribute(e, t, n, r) {
          const s = vi(e);
          s && s instanceof yi && (s.attributes[r ? r + ":" + t : t] = n),
            this.delegate.setAttribute(e, t, n, r);
        }
        removeAttribute(e, t, n) {
          const r = vi(e);
          r && r instanceof yi && (r.attributes[n ? n + ":" + t : t] = null),
            this.delegate.removeAttribute(e, t, n);
        }
        addClass(e, t) {
          const n = vi(e);
          n && n instanceof yi && (n.classes[t] = !0),
            this.delegate.addClass(e, t);
        }
        removeClass(e, t) {
          const n = vi(e);
          n && n instanceof yi && (n.classes[t] = !1),
            this.delegate.removeClass(e, t);
        }
        setStyle(e, t, n, r) {
          const s = vi(e);
          s && s instanceof yi && (s.styles[t] = n),
            this.delegate.setStyle(e, t, n, r);
        }
        removeStyle(e, t, n) {
          const r = vi(e);
          r && r instanceof yi && (r.styles[t] = null),
            this.delegate.removeStyle(e, t, n);
        }
        setProperty(e, t, n) {
          const r = vi(e);
          r && r instanceof yi && (r.properties[t] = n),
            this.delegate.setProperty(e, t, n);
        }
        listen(e, t, n) {
          if ("string" != typeof e) {
            const r = vi(e);
            r && r.listeners.push(new gi(t, n));
          }
          return this.delegate.listen(e, t, n);
        }
        parentNode(e) {
          return this.delegate.parentNode(e);
        }
        nextSibling(e) {
          return this.delegate.nextSibling(e);
        }
        setValue(e, t) {
          return this.delegate.setValue(e, t);
        }
      }
      function Xo(e, t, n) {
        return new Jo(e, t, n);
      }
      class Jo extends Pe {
        constructor(e, t, n) {
          super(),
            (this.moduleType = e),
            (this._bootstrapComponents = t),
            (this._ngModuleDefFactory = n);
        }
        create(e) {
          !(function () {
            if (fo) return;
            fo = !0;
            const e = $e()
              ? {
                  setCurrentNode: Vo,
                  createRootView: mo,
                  createEmbeddedView: _o,
                  createComponentView: vo,
                  createNgModuleRef: bo,
                  overrideProvider: Eo,
                  overrideComponentView: To,
                  clearOverrides: xo,
                  checkAndUpdateView: Po,
                  checkNoChangesView: No,
                  destroyView: Ro,
                  createDebugContext: (e, t) => new qo(e, t),
                  handleEvent: Lo,
                  updateDirectives: Uo,
                  updateRenderer: jo,
                }
              : {
                  setCurrentNode: () => {},
                  createRootView: go,
                  createEmbeddedView: Ki,
                  createComponentView: Zi,
                  createNgModuleRef: Fr,
                  overrideProvider: Rn,
                  overrideComponentView: Rn,
                  clearOverrides: Rn,
                  checkAndUpdateView: to,
                  checkNoChangesView: eo,
                  destroyView: oo,
                  createDebugContext: (e, t) => new qo(e, t),
                  handleEvent: (e, t, n, r) => e.def.handleEvent(e, t, n, r),
                  updateDirectives: (e, t) =>
                    e.def.updateDirectives(0 === t ? Ao : Io, e),
                  updateRenderer: (e, t) =>
                    e.def.updateRenderer(0 === t ? Ao : Io, e),
                };
            (Nn.setCurrentNode = e.setCurrentNode),
              (Nn.createRootView = e.createRootView),
              (Nn.createEmbeddedView = e.createEmbeddedView),
              (Nn.createComponentView = e.createComponentView),
              (Nn.createNgModuleRef = e.createNgModuleRef),
              (Nn.overrideProvider = e.overrideProvider),
              (Nn.overrideComponentView = e.overrideComponentView),
              (Nn.clearOverrides = e.clearOverrides),
              (Nn.checkAndUpdateView = e.checkAndUpdateView),
              (Nn.checkNoChangesView = e.checkNoChangesView),
              (Nn.destroyView = e.destroyView),
              (Nn.resolveDep = rs),
              (Nn.createDebugContext = e.createDebugContext),
              (Nn.handleEvent = e.handleEvent),
              (Nn.updateDirectives = e.updateDirectives),
              (Nn.updateRenderer = e.updateRenderer),
              (Nn.dirtyParentQueries = Oi);
          })();
          const t = (function (e) {
            const t = Array.from(e.providers),
              n = Array.from(e.modules),
              r = {};
            for (const s in e.providersByKey) r[s] = e.providersByKey[s];
            return {
              factory: e.factory,
              isRoot: e.isRoot,
              providers: t,
              modules: n,
              providersByKey: r,
            };
          })(er(this._ngModuleDefFactory));
          return Nn.createNgModuleRef(
            this.moduleType,
            e || vt.NULL,
            this._bootstrapComponents,
            t
          );
        }
      }
      class Yo {}
      class el {
        constructor() {
          this.title = "app";
        }
      }
      class tl {}
      const nl = new ve("Location Initialized");
      class rl {}
      const sl = new ve("appBaseHref");
      class il {
        constructor(e, t) {
          (this._subject = new gs()),
            (this._urlChangeListeners = []),
            (this._platformStrategy = e);
          const n = this._platformStrategy.getBaseHref();
          (this._platformLocation = t),
            (this._baseHref = il.stripTrailingSlash(ol(n))),
            this._platformStrategy.onPopState((e) => {
              this._subject.emit({
                url: this.path(!0),
                pop: !0,
                state: e.state,
                type: e.type,
              });
            });
        }
        path(e = !1) {
          return this.normalize(this._platformStrategy.path(e));
        }
        getState() {
          return this._platformLocation.getState();
        }
        isCurrentPathEqualTo(e, t = "") {
          return this.path() == this.normalize(e + il.normalizeQueryParams(t));
        }
        normalize(e) {
          return il.stripTrailingSlash(
            (function (e, t) {
              return e && t.startsWith(e) ? t.substring(e.length) : t;
            })(this._baseHref, ol(e))
          );
        }
        prepareExternalUrl(e) {
          return (
            e && "/" !== e[0] && (e = "/" + e),
            this._platformStrategy.prepareExternalUrl(e)
          );
        }
        go(e, t = "", n = null) {
          this._platformStrategy.pushState(n, "", e, t),
            this._notifyUrlChangeListeners(
              this.prepareExternalUrl(e + il.normalizeQueryParams(t)),
              n
            );
        }
        replaceState(e, t = "", n = null) {
          this._platformStrategy.replaceState(n, "", e, t),
            this._notifyUrlChangeListeners(
              this.prepareExternalUrl(e + il.normalizeQueryParams(t)),
              n
            );
        }
        forward() {
          this._platformStrategy.forward();
        }
        back() {
          this._platformStrategy.back();
        }
        onUrlChange(e) {
          this._urlChangeListeners.push(e),
            this.subscribe((e) => {
              this._notifyUrlChangeListeners(e.url, e.state);
            });
        }
        _notifyUrlChangeListeners(e = "", t) {
          this._urlChangeListeners.forEach((n) => n(e, t));
        }
        subscribe(e, t, n) {
          return this._subject.subscribe({ next: e, error: t, complete: n });
        }
        static normalizeQueryParams(e) {
          return e && "?" !== e[0] ? "?" + e : e;
        }
        static joinWithSlash(e, t) {
          if (0 == e.length) return t;
          if (0 == t.length) return e;
          let n = 0;
          return (
            e.endsWith("/") && n++,
            t.startsWith("/") && n++,
            2 == n ? e + t.substring(1) : 1 == n ? e + t : e + "/" + t
          );
        }
        static stripTrailingSlash(e) {
          const t = e.match(/#|\?|$/),
            n = (t && t.index) || e.length;
          return e.slice(0, n - ("/" === e[n - 1] ? 1 : 0)) + e.slice(n);
        }
      }
      function ol(e) {
        return e.replace(/\/index.html$/, "");
      }
      class ll extends rl {
        constructor(e, t) {
          super(),
            (this._platformLocation = e),
            (this._baseHref = ""),
            null != t && (this._baseHref = t);
        }
        onPopState(e) {
          this._platformLocation.onPopState(e),
            this._platformLocation.onHashChange(e);
        }
        getBaseHref() {
          return this._baseHref;
        }
        path(e = !1) {
          let t = this._platformLocation.hash;
          return null == t && (t = "#"), t.length > 0 ? t.substring(1) : t;
        }
        prepareExternalUrl(e) {
          const t = il.joinWithSlash(this._baseHref, e);
          return t.length > 0 ? "#" + t : t;
        }
        pushState(e, t, n, r) {
          let s = this.prepareExternalUrl(n + il.normalizeQueryParams(r));
          0 == s.length && (s = this._platformLocation.pathname),
            this._platformLocation.pushState(e, t, s);
        }
        replaceState(e, t, n, r) {
          let s = this.prepareExternalUrl(n + il.normalizeQueryParams(r));
          0 == s.length && (s = this._platformLocation.pathname),
            this._platformLocation.replaceState(e, t, s);
        }
        forward() {
          this._platformLocation.forward();
        }
        back() {
          this._platformLocation.back();
        }
      }
      class al extends rl {
        constructor(e, t) {
          if (
            (super(),
            (this._platformLocation = e),
            null == t && (t = this._platformLocation.getBaseHrefFromDOM()),
            null == t)
          )
            throw new Error(
              "No base href set. Please provide a value for the APP_BASE_HREF token or add a base element to the document."
            );
          this._baseHref = t;
        }
        onPopState(e) {
          this._platformLocation.onPopState(e),
            this._platformLocation.onHashChange(e);
        }
        getBaseHref() {
          return this._baseHref;
        }
        prepareExternalUrl(e) {
          return il.joinWithSlash(this._baseHref, e);
        }
        path(e = !1) {
          const t =
              this._platformLocation.pathname +
              il.normalizeQueryParams(this._platformLocation.search),
            n = this._platformLocation.hash;
          return n && e ? `${t}${n}` : t;
        }
        pushState(e, t, n, r) {
          const s = this.prepareExternalUrl(n + il.normalizeQueryParams(r));
          this._platformLocation.pushState(e, t, s);
        }
        replaceState(e, t, n, r) {
          const s = this.prepareExternalUrl(n + il.normalizeQueryParams(r));
          this._platformLocation.replaceState(e, t, s);
        }
        forward() {
          this._platformLocation.forward();
        }
        back() {
          this._platformLocation.back();
        }
      }
      const ul = {
          ADP: [void 0, void 0, 0],
          AFN: [void 0, void 0, 0],
          ALL: [void 0, void 0, 0],
          AMD: [void 0, void 0, 0],
          AOA: [void 0, "Kz"],
          ARS: [void 0, "$"],
          AUD: ["A$", "$"],
          BAM: [void 0, "KM"],
          BBD: [void 0, "$"],
          BDT: [void 0, "\u09f3"],
          BHD: [void 0, void 0, 3],
          BIF: [void 0, void 0, 0],
          BMD: [void 0, "$"],
          BND: [void 0, "$"],
          BOB: [void 0, "Bs"],
          BRL: ["R$"],
          BSD: [void 0, "$"],
          BWP: [void 0, "P"],
          BYN: [void 0, "\u0440.", 2],
          BYR: [void 0, void 0, 0],
          BZD: [void 0, "$"],
          CAD: ["CA$", "$", 2],
          CHF: [void 0, void 0, 2],
          CLF: [void 0, void 0, 4],
          CLP: [void 0, "$", 0],
          CNY: ["CN\xa5", "\xa5"],
          COP: [void 0, "$", 0],
          CRC: [void 0, "\u20a1", 2],
          CUC: [void 0, "$"],
          CUP: [void 0, "$"],
          CZK: [void 0, "K\u010d", 2],
          DJF: [void 0, void 0, 0],
          DKK: [void 0, "kr", 2],
          DOP: [void 0, "$"],
          EGP: [void 0, "E\xa3"],
          ESP: [void 0, "\u20a7", 0],
          EUR: ["\u20ac"],
          FJD: [void 0, "$"],
          FKP: [void 0, "\xa3"],
          GBP: ["\xa3"],
          GEL: [void 0, "\u20be"],
          GIP: [void 0, "\xa3"],
          GNF: [void 0, "FG", 0],
          GTQ: [void 0, "Q"],
          GYD: [void 0, "$", 0],
          HKD: ["HK$", "$"],
          HNL: [void 0, "L"],
          HRK: [void 0, "kn"],
          HUF: [void 0, "Ft", 2],
          IDR: [void 0, "Rp", 0],
          ILS: ["\u20aa"],
          INR: ["\u20b9"],
          IQD: [void 0, void 0, 0],
          IRR: [void 0, void 0, 0],
          ISK: [void 0, "kr", 0],
          ITL: [void 0, void 0, 0],
          JMD: [void 0, "$"],
          JOD: [void 0, void 0, 3],
          JPY: ["\xa5", void 0, 0],
          KHR: [void 0, "\u17db"],
          KMF: [void 0, "CF", 0],
          KPW: [void 0, "\u20a9", 0],
          KRW: ["\u20a9", void 0, 0],
          KWD: [void 0, void 0, 3],
          KYD: [void 0, "$"],
          KZT: [void 0, "\u20b8"],
          LAK: [void 0, "\u20ad", 0],
          LBP: [void 0, "L\xa3", 0],
          LKR: [void 0, "Rs"],
          LRD: [void 0, "$"],
          LTL: [void 0, "Lt"],
          LUF: [void 0, void 0, 0],
          LVL: [void 0, "Ls"],
          LYD: [void 0, void 0, 3],
          MGA: [void 0, "Ar", 0],
          MGF: [void 0, void 0, 0],
          MMK: [void 0, "K", 0],
          MNT: [void 0, "\u20ae", 0],
          MRO: [void 0, void 0, 0],
          MUR: [void 0, "Rs", 0],
          MXN: ["MX$", "$"],
          MYR: [void 0, "RM"],
          NAD: [void 0, "$"],
          NGN: [void 0, "\u20a6"],
          NIO: [void 0, "C$"],
          NOK: [void 0, "kr", 2],
          NPR: [void 0, "Rs"],
          NZD: ["NZ$", "$"],
          OMR: [void 0, void 0, 3],
          PHP: [void 0, "\u20b1"],
          PKR: [void 0, "Rs", 0],
          PLN: [void 0, "z\u0142"],
          PYG: [void 0, "\u20b2", 0],
          RON: [void 0, "lei"],
          RSD: [void 0, void 0, 0],
          RUB: [void 0, "\u20bd"],
          RUR: [void 0, "\u0440."],
          RWF: [void 0, "RF", 0],
          SBD: [void 0, "$"],
          SEK: [void 0, "kr", 2],
          SGD: [void 0, "$"],
          SHP: [void 0, "\xa3"],
          SLL: [void 0, void 0, 0],
          SOS: [void 0, void 0, 0],
          SRD: [void 0, "$"],
          SSP: [void 0, "\xa3"],
          STD: [void 0, void 0, 0],
          STN: [void 0, "Db"],
          SYP: [void 0, "\xa3", 0],
          THB: [void 0, "\u0e3f"],
          TMM: [void 0, void 0, 0],
          TND: [void 0, void 0, 3],
          TOP: [void 0, "T$"],
          TRL: [void 0, void 0, 0],
          TRY: [void 0, "\u20ba"],
          TTD: [void 0, "$"],
          TWD: ["NT$", "$", 2],
          TZS: [void 0, void 0, 0],
          UAH: [void 0, "\u20b4"],
          UGX: [void 0, void 0, 0],
          USD: ["$"],
          UYI: [void 0, void 0, 0],
          UYU: [void 0, "$"],
          UZS: [void 0, void 0, 0],
          VEF: [void 0, "Bs"],
          VND: ["\u20ab", void 0, 0],
          VUV: [void 0, void 0, 0],
          XAF: ["FCFA", void 0, 0],
          XCD: ["EC$", "$"],
          XOF: ["CFA", void 0, 0],
          XPF: ["CFPF", void 0, 0],
          YER: [void 0, void 0, 0],
          ZAR: [void 0, "R"],
          ZMK: [void 0, void 0, 0],
          ZMW: [void 0, "ZK"],
          ZWD: [void 0, void 0, 0],
        },
        cl = (function () {
          var e = { Decimal: 0, Percent: 1, Currency: 2, Scientific: 3 };
          return (
            (e[e.Decimal] = "Decimal"),
            (e[e.Percent] = "Percent"),
            (e[e.Currency] = "Currency"),
            (e[e.Scientific] = "Scientific"),
            e
          );
        })(),
        hl = (function () {
          var e = { Zero: 0, One: 1, Two: 2, Few: 3, Many: 4, Other: 5 };
          return (
            (e[e.Zero] = "Zero"),
            (e[e.One] = "One"),
            (e[e.Two] = "Two"),
            (e[e.Few] = "Few"),
            (e[e.Many] = "Many"),
            (e[e.Other] = "Other"),
            e
          );
        })(),
        dl = (function () {
          var e = {
            Decimal: 0,
            Group: 1,
            List: 2,
            PercentSign: 3,
            PlusSign: 4,
            MinusSign: 5,
            Exponential: 6,
            SuperscriptingExponent: 7,
            PerMille: 8,
            Infinity: 9,
            NaN: 10,
            TimeSeparator: 11,
            CurrencyDecimal: 12,
            CurrencyGroup: 13,
          };
          return (
            (e[e.Decimal] = "Decimal"),
            (e[e.Group] = "Group"),
            (e[e.List] = "List"),
            (e[e.PercentSign] = "PercentSign"),
            (e[e.PlusSign] = "PlusSign"),
            (e[e.MinusSign] = "MinusSign"),
            (e[e.Exponential] = "Exponential"),
            (e[e.SuperscriptingExponent] = "SuperscriptingExponent"),
            (e[e.PerMille] = "PerMille"),
            (e[e.Infinity] = "Infinity"),
            (e[e.NaN] = "NaN"),
            (e[e.TimeSeparator] = "TimeSeparator"),
            (e[e.CurrencyDecimal] = "CurrencyDecimal"),
            (e[e.CurrencyGroup] = "CurrencyGroup"),
            e
          );
        })();
      function pl(e, t) {
        const n = fs(e),
          r = n[hs.NumberSymbols][t];
        if (void 0 === r) {
          if (t === dl.CurrencyDecimal) return n[hs.NumberSymbols][dl.Decimal];
          if (t === dl.CurrencyGroup) return n[hs.NumberSymbols][dl.Group];
        }
        return r;
      }
      const fl = /^(\d+)?\.((\d+)(-(\d+))?)?$/;
      function gl(e) {
        const t = parseInt(e);
        if (isNaN(t))
          throw new Error("Invalid integer literal when parsing " + e);
        return t;
      }
      const ml = new ve("UseV4Plurals");
      class yl {}
      class _l extends yl {
        constructor(e, t) {
          super(), (this.locale = e), (this.deprecatedPluralFn = t);
        }
        getPluralCategory(e, t) {
          switch (
            this.deprecatedPluralFn
              ? this.deprecatedPluralFn(t || this.locale, e)
              : (function (e) {
                  return fs(e)[hs.PluralCase];
                })(t || this.locale)(e)
          ) {
            case hl.Zero:
              return "zero";
            case hl.One:
              return "one";
            case hl.Two:
              return "two";
            case hl.Few:
              return "few";
            case hl.Many:
              return "many";
            default:
              return "other";
          }
        }
      }
      function vl(e, t) {
        t = encodeURIComponent(t);
        for (const n of e.split(";")) {
          const e = n.indexOf("="),
            [r, s] = -1 == e ? [n, ""] : [n.slice(0, e), n.slice(e + 1)];
          if (r.trim() === t) return decodeURIComponent(s);
        }
        return null;
      }
      class bl {}
      class wl {
        constructor(e, t, n, r) {
          (this._iterableDiffers = e),
            (this._keyValueDiffers = t),
            (this._ngEl = n),
            (this._renderer = r),
            (this._initialClasses = []);
        }
        getValue() {
          return null;
        }
        setClass(e) {
          this._removeClasses(this._initialClasses),
            (this._initialClasses = "string" == typeof e ? e.split(/\s+/) : []),
            this._applyClasses(this._initialClasses),
            this._applyClasses(this._rawClass);
        }
        setNgClass(e) {
          this._removeClasses(this._rawClass),
            this._applyClasses(this._initialClasses),
            (this._iterableDiffer = null),
            (this._keyValueDiffer = null),
            (this._rawClass = "string" == typeof e ? e.split(/\s+/) : e),
            this._rawClass &&
              (Dt(this._rawClass)
                ? (this._iterableDiffer = this._iterableDiffers
                    .find(this._rawClass)
                    .create())
                : (this._keyValueDiffer = this._keyValueDiffers
                    .find(this._rawClass)
                    .create()));
        }
        applyChanges() {
          if (this._iterableDiffer) {
            const e = this._iterableDiffer.diff(this._rawClass);
            e && this._applyIterableChanges(e);
          } else if (this._keyValueDiffer) {
            const e = this._keyValueDiffer.diff(this._rawClass);
            e && this._applyKeyValueChanges(e);
          }
        }
        _applyKeyValueChanges(e) {
          e.forEachAddedItem((e) => this._toggleClass(e.key, e.currentValue)),
            e.forEachChangedItem((e) =>
              this._toggleClass(e.key, e.currentValue)
            ),
            e.forEachRemovedItem((e) => {
              e.previousValue && this._toggleClass(e.key, !1);
            });
        }
        _applyIterableChanges(e) {
          e.forEachAddedItem((e) => {
            if ("string" != typeof e.item)
              throw new Error(
                "NgClass can only toggle CSS classes expressed as strings, got " +
                  ce(e.item)
              );
            this._toggleClass(e.item, !0);
          }),
            e.forEachRemovedItem((e) => this._toggleClass(e.item, !1));
        }
        _applyClasses(e) {
          e &&
            (Array.isArray(e) || e instanceof Set
              ? e.forEach((e) => this._toggleClass(e, !0))
              : Object.keys(e).forEach((t) => this._toggleClass(t, !!e[t])));
        }
        _removeClasses(e) {
          e &&
            (Array.isArray(e) || e instanceof Set
              ? e.forEach((e) => this._toggleClass(e, !1))
              : Object.keys(e).forEach((e) => this._toggleClass(e, !1)));
        }
        _toggleClass(e, t) {
          (e = e.trim()) &&
            e.split(/\s+/g).forEach((e) => {
              t
                ? this._renderer.addClass(this._ngEl.nativeElement, e)
                : this._renderer.removeClass(this._ngEl.nativeElement, e);
            });
        }
      }
      let Cl = (() => {
        class e {
          constructor(e) {
            this._delegate = e;
          }
          getValue() {
            return this._delegate.getValue();
          }
        }
        return (e.ngDirectiveDef = void 0), e;
      })();
      class Sl extends Cl {
        constructor(e) {
          super(e);
        }
        set klass(e) {
          this._delegate.setClass(e);
        }
        set ngClass(e) {
          this._delegate.setNgClass(e);
        }
        ngDoCheck() {
          this._delegate.applyChanges();
        }
      }
      class El {
        constructor(e, t, n, r) {
          (this.$implicit = e),
            (this.ngForOf = t),
            (this.index = n),
            (this.count = r);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      class Tl {
        constructor(e, t, n) {
          (this._viewContainer = e),
            (this._template = t),
            (this._differs = n),
            (this._ngForOfDirty = !0),
            (this._differ = null);
        }
        set ngForOf(e) {
          (this._ngForOf = e), (this._ngForOfDirty = !0);
        }
        set ngForTrackBy(e) {
          $e() &&
            null != e &&
            "function" != typeof e &&
            console &&
            console.warn &&
            console.warn(
              `trackBy must be a function, but received ${JSON.stringify(
                e
              )}. See https://angular.io/docs/ts/latest/api/common/index/NgFor-directive.html#!#change-propagation for more information.`
            ),
            (this._trackByFn = e);
        }
        get ngForTrackBy() {
          return this._trackByFn;
        }
        set ngForTemplate(e) {
          e && (this._template = e);
        }
        ngDoCheck() {
          if (this._ngForOfDirty) {
            this._ngForOfDirty = !1;
            const n = this._ngForOf;
            if (!this._differ && n)
              try {
                this._differ = this._differs.find(n).create(this.ngForTrackBy);
              } catch (t) {
                throw new Error(
                  `Cannot find a differ supporting object '${n}' of type '${
                    ((e = n), e.name || typeof e)
                  }'. NgFor only supports binding to Iterables such as Arrays.`
                );
              }
          }
          var e;
          if (this._differ) {
            const e = this._differ.diff(this._ngForOf);
            e && this._applyChanges(e);
          }
        }
        _applyChanges(e) {
          const t = [];
          e.forEachOperation((e, n, r) => {
            if (null == e.previousIndex) {
              const n = this._viewContainer.createEmbeddedView(
                  this._template,
                  new El(null, this._ngForOf, -1, -1),
                  null === r ? void 0 : r
                ),
                s = new xl(e, n);
              t.push(s);
            } else if (null == r)
              this._viewContainer.remove(null === n ? void 0 : n);
            else if (null !== n) {
              const s = this._viewContainer.get(n);
              this._viewContainer.move(s, r);
              const i = new xl(e, s);
              t.push(i);
            }
          });
          for (let n = 0; n < t.length; n++)
            this._perViewChange(t[n].view, t[n].record);
          for (let n = 0, r = this._viewContainer.length; n < r; n++) {
            const e = this._viewContainer.get(n);
            (e.context.index = n),
              (e.context.count = r),
              (e.context.ngForOf = this._ngForOf);
          }
          e.forEachIdentityChange((e) => {
            this._viewContainer.get(e.currentIndex).context.$implicit = e.item;
          });
        }
        _perViewChange(e, t) {
          e.context.$implicit = t.item;
        }
        static ngTemplateContextGuard(e, t) {
          return !0;
        }
      }
      class xl {
        constructor(e, t) {
          (this.record = e), (this.view = t);
        }
      }
      class kl {
        constructor(e, t) {
          (this._viewContainer = e),
            (this._context = new Al()),
            (this._thenTemplateRef = null),
            (this._elseTemplateRef = null),
            (this._thenViewRef = null),
            (this._elseViewRef = null),
            (this._thenTemplateRef = t);
        }
        set ngIf(e) {
          (this._context.$implicit = this._context.ngIf = e),
            this._updateView();
        }
        set ngIfThen(e) {
          Il("ngIfThen", e),
            (this._thenTemplateRef = e),
            (this._thenViewRef = null),
            this._updateView();
        }
        set ngIfElse(e) {
          Il("ngIfElse", e),
            (this._elseTemplateRef = e),
            (this._elseViewRef = null),
            this._updateView();
        }
        _updateView() {
          this._context.$implicit
            ? this._thenViewRef ||
              (this._viewContainer.clear(),
              (this._elseViewRef = null),
              this._thenTemplateRef &&
                (this._thenViewRef = this._viewContainer.createEmbeddedView(
                  this._thenTemplateRef,
                  this._context
                )))
            : this._elseViewRef ||
              (this._viewContainer.clear(),
              (this._thenViewRef = null),
              this._elseTemplateRef &&
                (this._elseViewRef = this._viewContainer.createEmbeddedView(
                  this._elseTemplateRef,
                  this._context
                )));
        }
      }
      class Al {
        constructor() {
          (this.$implicit = null), (this.ngIf = null);
        }
      }
      function Il(e, t) {
        if (t && !t.createEmbeddedView)
          throw new Error(
            `${e} must be a TemplateRef, but received '${ce(t)}'.`
          );
      }
      class Pl {
        constructor(e, t) {
          (this._viewContainerRef = e),
            (this._templateRef = t),
            (this._created = !1);
        }
        create() {
          (this._created = !0),
            this._viewContainerRef.createEmbeddedView(this._templateRef);
        }
        destroy() {
          (this._created = !1), this._viewContainerRef.clear();
        }
        enforceState(e) {
          e && !this._created
            ? this.create()
            : !e && this._created && this.destroy();
        }
      }
      class Nl {
        constructor() {
          (this._defaultUsed = !1),
            (this._caseCount = 0),
            (this._lastCaseCheckIndex = 0),
            (this._lastCasesMatched = !1);
        }
        set ngSwitch(e) {
          (this._ngSwitch = e),
            0 === this._caseCount && this._updateDefaultCases(!0);
        }
        _addCase() {
          return this._caseCount++;
        }
        _addDefault(e) {
          this._defaultViews || (this._defaultViews = []),
            this._defaultViews.push(e);
        }
        _matchCase(e) {
          const t = e == this._ngSwitch;
          return (
            (this._lastCasesMatched = this._lastCasesMatched || t),
            this._lastCaseCheckIndex++,
            this._lastCaseCheckIndex === this._caseCount &&
              (this._updateDefaultCases(!this._lastCasesMatched),
              (this._lastCaseCheckIndex = 0),
              (this._lastCasesMatched = !1)),
            t
          );
        }
        _updateDefaultCases(e) {
          if (this._defaultViews && e !== this._defaultUsed) {
            this._defaultUsed = e;
            for (let t = 0; t < this._defaultViews.length; t++)
              this._defaultViews[t].enforceState(e);
          }
        }
      }
      class Rl {
        constructor(e, t, n) {
          (this.ngSwitch = n), n._addCase(), (this._view = new Pl(e, t));
        }
        ngDoCheck() {
          this._view.enforceState(this.ngSwitch._matchCase(this.ngSwitchCase));
        }
      }
      class Dl {}
      class Ol {
        constructor(e, t, n) {
          (this._ngEl = e), (this._differs = t), (this._renderer = n);
        }
        getValue() {
          return null;
        }
        setNgStyle(e) {
          (this._ngStyle = e),
            !this._differ &&
              e &&
              (this._differ = this._differs.find(e).create());
        }
        applyChanges() {
          if (this._differ) {
            const e = this._differ.diff(this._ngStyle);
            e && this._applyChanges(e);
          }
        }
        _applyChanges(e) {
          e.forEachRemovedItem((e) => this._setStyle(e.key, null)),
            e.forEachAddedItem((e) => this._setStyle(e.key, e.currentValue)),
            e.forEachChangedItem((e) => this._setStyle(e.key, e.currentValue));
        }
        _setStyle(e, t) {
          const [n, r] = e.split(".");
          null != (t = null != t && r ? `${t}${r}` : t)
            ? this._renderer.setStyle(this._ngEl.nativeElement, n, t)
            : this._renderer.removeStyle(this._ngEl.nativeElement, n);
        }
      }
      let Ml = (() => {
        class e {
          constructor(e) {
            this._delegate = e;
          }
          getValue() {
            return this._delegate.getValue();
          }
        }
        return (e.ngDirectiveDef = void 0), e;
      })();
      class Fl extends Ml {
        constructor(e) {
          super(e);
        }
        set ngStyle(e) {
          this._delegate.setNgStyle(e);
        }
        ngDoCheck() {
          this._delegate.applyChanges();
        }
      }
      class Vl {
        constructor(e) {
          this._locale = e;
        }
        transform(e, t, n = "symbol", r, s) {
          if (
            (function (e) {
              return null == e || "" === e || e != e;
            })(e)
          )
            return null;
          (s = s || this._locale),
            "boolean" == typeof n &&
              (console &&
                console.warn &&
                console.warn(
                  'Warning: the currency pipe has been changed in Angular v5. The symbolDisplay option (third parameter) is now a string instead of a boolean. The accepted values are "code", "symbol" or "symbol-narrow".'
                ),
              (n = n ? "symbol" : "code"));
          let i = t || "USD";
          "code" !== n &&
            (i =
              "symbol" === n || "symbol-narrow" === n
                ? (function (e, t, n = "en") {
                    const r =
                        (function (e) {
                          return fs(e)[hs.Currencies];
                        })(n)[e] ||
                        ul[e] ||
                        [],
                      s = r[1];
                    return "narrow" === t && "string" == typeof s
                      ? s
                      : r[0] || e;
                  })(i, "symbol" === n ? "wide" : "narrow", s)
                : n);
          try {
            return (function (e, t, n, r, s) {
              const i = (function (e, t = "-") {
                const n = {
                    minInt: 1,
                    minFrac: 0,
                    maxFrac: 0,
                    posPre: "",
                    posSuf: "",
                    negPre: "",
                    negSuf: "",
                    gSize: 0,
                    lgSize: 0,
                  },
                  r = e.split(";"),
                  s = r[0],
                  i = r[1],
                  o =
                    -1 !== s.indexOf(".")
                      ? s.split(".")
                      : [
                          s.substring(0, s.lastIndexOf("0") + 1),
                          s.substring(s.lastIndexOf("0") + 1),
                        ],
                  l = o[0],
                  a = o[1] || "";
                n.posPre = l.substr(0, l.indexOf("#"));
                for (let c = 0; c < a.length; c++) {
                  const e = a.charAt(c);
                  "0" === e
                    ? (n.minFrac = n.maxFrac = c + 1)
                    : "#" === e
                    ? (n.maxFrac = c + 1)
                    : (n.posSuf += e);
                }
                const u = l.split(",");
                if (
                  ((n.gSize = u[1] ? u[1].length : 0),
                  (n.lgSize = u[2] || u[1] ? (u[2] || u[1]).length : 0),
                  i)
                ) {
                  const e = s.length - n.posPre.length - n.posSuf.length,
                    t = i.indexOf("#");
                  (n.negPre = i.substr(0, t).replace(/'/g, "")),
                    (n.negSuf = i.substr(t + e).replace(/'/g, ""));
                } else (n.negPre = t + n.posPre), (n.negSuf = n.posSuf);
                return n;
              })(
                (function (e, t) {
                  return fs(e)[hs.NumberFormats][t];
                })(t, cl.Currency),
                pl(t, dl.MinusSign)
              );
              return (
                (i.minFrac = (function (e) {
                  let t;
                  const n = ul[e];
                  return n && (t = n[2]), "number" == typeof t ? t : 2;
                })(r)),
                (i.maxFrac = i.minFrac),
                (function (e, t, n, r, s, i, o = !1) {
                  let l = "",
                    a = !1;
                  if (isFinite(e)) {
                    let u = (function (e) {
                      let t,
                        n,
                        r,
                        s,
                        i,
                        o = Math.abs(e) + "",
                        l = 0;
                      for (
                        (n = o.indexOf(".")) > -1 && (o = o.replace(".", "")),
                          (r = o.search(/e/i)) > 0
                            ? (n < 0 && (n = r),
                              (n += +o.slice(r + 1)),
                              (o = o.substring(0, r)))
                            : n < 0 && (n = o.length),
                          r = 0;
                        "0" === o.charAt(r);
                        r++
                      );
                      if (r === (i = o.length)) (t = [0]), (n = 1);
                      else {
                        for (i--; "0" === o.charAt(i); ) i--;
                        for (n -= r, t = [], s = 0; r <= i; r++, s++)
                          t[s] = Number(o.charAt(r));
                      }
                      return (
                        n > 22 && ((t = t.splice(0, 21)), (l = n - 1), (n = 1)),
                        { digits: t, exponent: l, integerLen: n }
                      );
                    })(e);
                    o &&
                      (u = (function (e) {
                        if (0 === e.digits[0]) return e;
                        const t = e.digits.length - e.integerLen;
                        return (
                          e.exponent
                            ? (e.exponent += 2)
                            : (0 === t
                                ? e.digits.push(0, 0)
                                : 1 === t && e.digits.push(0),
                              (e.integerLen += 2)),
                          e
                        );
                      })(u));
                    let c = t.minInt,
                      h = t.minFrac,
                      d = t.maxFrac;
                    if (i) {
                      const e = i.match(fl);
                      if (null === e)
                        throw new Error(i + " is not a valid digit info");
                      const t = e[1],
                        n = e[3],
                        r = e[5];
                      null != t && (c = gl(t)),
                        null != n && (h = gl(n)),
                        null != r ? (d = gl(r)) : null != n && h > d && (d = h);
                    }
                    !(function (e, t, n) {
                      if (t > n)
                        throw new Error(
                          `The minimum number of digits after fraction (${t}) is higher than the maximum (${n}).`
                        );
                      let r = e.digits,
                        s = r.length - e.integerLen;
                      const i = Math.min(Math.max(t, s), n);
                      let o = i + e.integerLen,
                        l = r[o];
                      if (o > 0) {
                        r.splice(Math.max(e.integerLen, o));
                        for (let e = o; e < r.length; e++) r[e] = 0;
                      } else {
                        (s = Math.max(0, s)),
                          (e.integerLen = 1),
                          (r.length = Math.max(1, (o = i + 1))),
                          (r[0] = 0);
                        for (let e = 1; e < o; e++) r[e] = 0;
                      }
                      if (l >= 5)
                        if (o - 1 < 0) {
                          for (let t = 0; t > o; t--)
                            r.unshift(0), e.integerLen++;
                          r.unshift(1), e.integerLen++;
                        } else r[o - 1]++;
                      for (; s < Math.max(0, i); s++) r.push(0);
                      let a = 0 !== i;
                      const u = t + e.integerLen,
                        c = r.reduceRight(function (e, t, n, r) {
                          return (
                            (r[n] = (t += e) < 10 ? t : t - 10),
                            a && (0 === r[n] && n >= u ? r.pop() : (a = !1)),
                            t >= 10 ? 1 : 0
                          );
                        }, 0);
                      c && (r.unshift(c), e.integerLen++);
                    })(u, h, d);
                    let p = u.digits,
                      f = u.integerLen;
                    const g = u.exponent;
                    let m = [];
                    for (a = p.every((e) => !e); f < c; f++) p.unshift(0);
                    for (; f < 0; f++) p.unshift(0);
                    f > 0 ? (m = p.splice(f, p.length)) : ((m = p), (p = [0]));
                    const y = [];
                    for (
                      p.length >= t.lgSize &&
                      y.unshift(p.splice(-t.lgSize, p.length).join(""));
                      p.length > t.gSize;

                    )
                      y.unshift(p.splice(-t.gSize, p.length).join(""));
                    p.length && y.unshift(p.join("")),
                      (l = y.join(pl(n, r))),
                      m.length && (l += pl(n, s) + m.join("")),
                      g && (l += pl(n, dl.Exponential) + "+" + g);
                  } else l = pl(n, dl.Infinity);
                  return (
                    (l =
                      e < 0 && !a
                        ? t.negPre + l + t.negSuf
                        : t.posPre + l + t.posSuf),
                    l
                  );
                })(e, i, t, dl.CurrencyGroup, dl.CurrencyDecimal, s)
                  .replace("\xa4", n)
                  .replace("\xa4", "")
              );
            })(
              (function (e) {
                if ("string" == typeof e && !isNaN(Number(e) - parseFloat(e)))
                  return Number(e);
                if ("number" != typeof e)
                  throw new Error(e + " is not a number");
                return e;
              })(e),
              s,
              i,
              t,
              r
            );
          } catch (o) {
            throw (function (e, t) {
              return Error(`InvalidPipeArgument: '${t}' for pipe '${ce(e)}'`);
            })(Vl, o.message);
          }
        }
      }
      class Ll {}
      const Ul = new ve("DocumentToken");
      let jl = (() => {
        class e {}
        return (
          (e.ngInjectableDef = le({
            token: e,
            providedIn: "root",
            factory: () => new $l(xe(Ul), window, xe(Le)),
          })),
          e
        );
      })();
      class $l {
        constructor(e, t, n) {
          (this.document = e),
            (this.window = t),
            (this.errorHandler = n),
            (this.offset = () => [0, 0]);
        }
        setOffset(e) {
          this.offset = Array.isArray(e) ? () => e : e;
        }
        getScrollPosition() {
          return this.supportScrollRestoration()
            ? [this.window.scrollX, this.window.scrollY]
            : [0, 0];
        }
        scrollToPosition(e) {
          this.supportScrollRestoration() && this.window.scrollTo(e[0], e[1]);
        }
        scrollToAnchor(e) {
          if (this.supportScrollRestoration()) {
            e =
              this.window.CSS && this.window.CSS.escape
                ? this.window.CSS.escape(e)
                : e.replace(/(\"|\'\ |:|\.|\[|\]|,|=)/g, "\\$1");
            try {
              const t = this.document.querySelector("#" + e);
              if (t) return void this.scrollToElement(t);
              const n = this.document.querySelector(`[name='${e}']`);
              if (n) return void this.scrollToElement(n);
            } catch (t) {
              this.errorHandler.handleError(t);
            }
          }
        }
        setHistoryScrollRestoration(e) {
          if (this.supportScrollRestoration()) {
            const t = this.window.history;
            t && t.scrollRestoration && (t.scrollRestoration = e);
          }
        }
        scrollToElement(e) {
          const t = e.getBoundingClientRect(),
            n = t.left + this.window.pageXOffset,
            r = t.top + this.window.pageYOffset,
            s = this.offset();
          this.window.scrollTo(n - s[0], r - s[1]);
        }
        supportScrollRestoration() {
          try {
            return !!this.window && !!this.window.scrollTo;
          } catch (e) {
            return !1;
          }
        }
      }
      function Hl(...e) {
        let t = e[e.length - 1];
        return k(t) ? (e.pop(), V(e, t)) : W(e);
      }
      class Bl extends T {
        constructor(e) {
          super(), (this._value = e);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(e) {
          const t = super._subscribe(e);
          return t && !t.closed && e.next(this._value), t;
        }
        getValue() {
          if (this.hasError) throw this.thrownError;
          if (this.closed) throw new C();
          return this._value;
        }
        next(e) {
          super.next((this._value = e));
        }
      }
      const zl = (() => {
        function e() {
          return (
            Error.call(this),
            (this.message = "no elements in sequence"),
            (this.name = "EmptyError"),
            this
          );
        }
        return (e.prototype = Object.create(Error.prototype)), e;
      })();
      class ql extends f {
        notifyNext(e, t, n, r, s) {
          this.destination.next(t);
        }
        notifyError(e, t) {
          this.destination.error(e);
        }
        notifyComplete(e) {
          this.destination.complete();
        }
      }
      class Wl extends f {
        constructor(e, t, n) {
          super(),
            (this.parent = e),
            (this.outerValue = t),
            (this.outerIndex = n),
            (this.index = 0);
        }
        _next(e) {
          this.parent.notifyNext(
            this.outerValue,
            e,
            this.outerIndex,
            this.index++,
            this
          );
        }
        _error(e) {
          this.parent.notifyError(e, this), this.unsubscribe();
        }
        _complete() {
          this.parent.notifyComplete(this), this.unsubscribe();
        }
      }
      function Gl(e, t, n, r, s = new Wl(e, n, r)) {
        if (!s.closed) return t instanceof b ? t.subscribe(s) : F(t)(s);
      }
      const Kl = {};
      class Ql {
        constructor(e) {
          this.resultSelector = e;
        }
        call(e, t) {
          return t.subscribe(new Zl(e, this.resultSelector));
        }
      }
      class Zl extends ql {
        constructor(e, t) {
          super(e),
            (this.resultSelector = t),
            (this.active = 0),
            (this.values = []),
            (this.observables = []);
        }
        _next(e) {
          this.values.push(Kl), this.observables.push(e);
        }
        _complete() {
          const e = this.observables,
            t = e.length;
          if (0 === t) this.destination.complete();
          else {
            (this.active = t), (this.toRespond = t);
            for (let n = 0; n < t; n++) this.add(Gl(this, e[n], void 0, n));
          }
        }
        notifyComplete(e) {
          0 == (this.active -= 1) && this.destination.complete();
        }
        notifyNext(e, t, n) {
          const r = this.values,
            s = this.toRespond
              ? r[n] === Kl
                ? --this.toRespond
                : this.toRespond
              : 0;
          (r[n] = t),
            0 === s &&
              (this.resultSelector
                ? this._tryResultSelector(r)
                : this.destination.next(r.slice()));
        }
        _tryResultSelector(e) {
          let t;
          try {
            t = this.resultSelector.apply(this, e);
          } catch (n) {
            return void this.destination.error(n);
          }
          this.destination.next(t);
        }
      }
      const Xl = new b((e) => e.complete());
      function Jl(e) {
        return e
          ? (function (e) {
              return new b((t) => e.schedule(() => t.complete()));
            })(e)
          : Xl;
      }
      function Yl(e) {
        return new b((t) => {
          let n;
          try {
            n = e();
          } catch (r) {
            return void t.error(r);
          }
          return (n ? L(n) : Jl()).subscribe(t);
        });
      }
      function ea() {
        return q(1);
      }
      function ta(e, t) {
        return function (n) {
          return n.lift(new na(e, t));
        };
      }
      class na {
        constructor(e, t) {
          (this.predicate = e), (this.thisArg = t);
        }
        call(e, t) {
          return t.subscribe(new ra(e, this.predicate, this.thisArg));
        }
      }
      class ra extends f {
        constructor(e, t, n) {
          super(e), (this.predicate = t), (this.thisArg = n), (this.count = 0);
        }
        _next(e) {
          let t;
          try {
            t = this.predicate.call(this.thisArg, e, this.count++);
          } catch (n) {
            return void this.destination.error(n);
          }
          t && this.destination.next(e);
        }
      }
      const sa = (() => {
        function e() {
          return (
            Error.call(this),
            (this.message = "argument out of range"),
            (this.name = "ArgumentOutOfRangeError"),
            this
          );
        }
        return (e.prototype = Object.create(Error.prototype)), e;
      })();
      function ia(e) {
        return function (t) {
          return 0 === e ? Jl() : t.lift(new oa(e));
        };
      }
      class oa {
        constructor(e) {
          if (((this.total = e), this.total < 0)) throw new sa();
        }
        call(e, t) {
          return t.subscribe(new la(e, this.total));
        }
      }
      class la extends f {
        constructor(e, t) {
          super(e),
            (this.total = t),
            (this.ring = new Array()),
            (this.count = 0);
        }
        _next(e) {
          const t = this.ring,
            n = this.total,
            r = this.count++;
          t.length < n ? t.push(e) : (t[r % n] = e);
        }
        _complete() {
          const e = this.destination;
          let t = this.count;
          if (t > 0) {
            const n = this.count >= this.total ? this.total : this.count,
              r = this.ring;
            for (let s = 0; s < n; s++) {
              const s = t++ % n;
              e.next(r[s]);
            }
          }
          e.complete();
        }
      }
      function aa(e = ha) {
        return (t) => t.lift(new ua(e));
      }
      class ua {
        constructor(e) {
          this.errorFactory = e;
        }
        call(e, t) {
          return t.subscribe(new ca(e, this.errorFactory));
        }
      }
      class ca extends f {
        constructor(e, t) {
          super(e), (this.errorFactory = t), (this.hasValue = !1);
        }
        _next(e) {
          (this.hasValue = !0), this.destination.next(e);
        }
        _complete() {
          if (this.hasValue) return this.destination.complete();
          {
            let t;
            try {
              t = this.errorFactory();
            } catch (e) {
              t = e;
            }
            this.destination.error(t);
          }
        }
      }
      function ha() {
        return new zl();
      }
      function da(e = null) {
        return (t) => t.lift(new pa(e));
      }
      class pa {
        constructor(e) {
          this.defaultValue = e;
        }
        call(e, t) {
          return t.subscribe(new fa(e, this.defaultValue));
        }
      }
      class fa extends f {
        constructor(e, t) {
          super(e), (this.defaultValue = t), (this.isEmpty = !0);
        }
        _next(e) {
          (this.isEmpty = !1), this.destination.next(e);
        }
        _complete() {
          this.isEmpty && this.destination.next(this.defaultValue),
            this.destination.complete();
        }
      }
      function ga(e, t) {
        const n = arguments.length >= 2;
        return (r) =>
          r.pipe(
            e ? ta((t, n) => e(t, n, r)) : y,
            ia(1),
            n ? da(t) : aa(() => new zl())
          );
      }
      function ma(e) {
        return function (t) {
          const n = new ya(e),
            r = t.lift(n);
          return (n.caught = r);
        };
      }
      class ya {
        constructor(e) {
          this.selector = e;
        }
        call(e, t) {
          return t.subscribe(new _a(e, this.selector, this.caught));
        }
      }
      class _a extends j {
        constructor(e, t, n) {
          super(e), (this.selector = t), (this.caught = n);
        }
        error(e) {
          if (!this.isStopped) {
            let n;
            try {
              n = this.selector(e, this.caught);
            } catch (t) {
              return void super.error(t);
            }
            this._unsubscribeAndRecycle();
            const r = new U(this);
            this.add(r);
            const s = $(n, r);
            s !== r && this.add(s);
          }
        }
      }
      function va(e) {
        return (t) => (0 === e ? Jl() : t.lift(new ba(e)));
      }
      class ba {
        constructor(e) {
          if (((this.total = e), this.total < 0)) throw new sa();
        }
        call(e, t) {
          return t.subscribe(new wa(e, this.total));
        }
      }
      class wa extends f {
        constructor(e, t) {
          super(e), (this.total = t), (this.count = 0);
        }
        _next(e) {
          const t = this.total,
            n = ++this.count;
          n <= t &&
            (this.destination.next(e),
            n === t && (this.destination.complete(), this.unsubscribe()));
        }
      }
      function Ca(e, t) {
        const n = arguments.length >= 2;
        return (r) =>
          r.pipe(
            e ? ta((t, n) => e(t, n, r)) : y,
            va(1),
            n ? da(t) : aa(() => new zl())
          );
      }
      class Sa {
        constructor(e, t, n) {
          (this.predicate = e), (this.thisArg = t), (this.source = n);
        }
        call(e, t) {
          return t.subscribe(
            new Ea(e, this.predicate, this.thisArg, this.source)
          );
        }
      }
      class Ea extends f {
        constructor(e, t, n, r) {
          super(e),
            (this.predicate = t),
            (this.thisArg = n),
            (this.source = r),
            (this.index = 0),
            (this.thisArg = n || this);
        }
        notifyComplete(e) {
          this.destination.next(e), this.destination.complete();
        }
        _next(e) {
          let t = !1;
          try {
            t = this.predicate.call(this.thisArg, e, this.index++, this.source);
          } catch (n) {
            return void this.destination.error(n);
          }
          t || this.notifyComplete(!1);
        }
        _complete() {
          this.notifyComplete(!0);
        }
      }
      function Ta(e, t) {
        return "function" == typeof t
          ? (n) =>
              n.pipe(Ta((n, r) => L(e(n, r)).pipe(A((e, s) => t(n, e, r, s)))))
          : (t) => t.lift(new xa(e));
      }
      class xa {
        constructor(e) {
          this.project = e;
        }
        call(e, t) {
          return t.subscribe(new ka(e, this.project));
        }
      }
      class ka extends j {
        constructor(e, t) {
          super(e), (this.project = t), (this.index = 0);
        }
        _next(e) {
          let t;
          const n = this.index++;
          try {
            t = this.project(e, n);
          } catch (r) {
            return void this.destination.error(r);
          }
          this._innerSub(t);
        }
        _innerSub(e) {
          const t = this.innerSubscription;
          t && t.unsubscribe();
          const n = new U(this),
            r = this.destination;
          r.add(n),
            (this.innerSubscription = $(e, n)),
            this.innerSubscription !== n && r.add(this.innerSubscription);
        }
        _complete() {
          const { innerSubscription: e } = this;
          (e && !e.closed) || super._complete(), this.unsubscribe();
        }
        _unsubscribe() {
          this.innerSubscription = void 0;
        }
        notifyComplete() {
          (this.innerSubscription = void 0),
            this.isStopped && super._complete();
        }
        notifyNext(e) {
          this.destination.next(e);
        }
      }
      function Aa(...e) {
        return ea()(Hl(...e));
      }
      function Ia(e, t) {
        let n = !1;
        return (
          arguments.length >= 2 && (n = !0),
          function (r) {
            return r.lift(new Pa(e, t, n));
          }
        );
      }
      class Pa {
        constructor(e, t, n = !1) {
          (this.accumulator = e), (this.seed = t), (this.hasSeed = n);
        }
        call(e, t) {
          return t.subscribe(
            new Na(e, this.accumulator, this.seed, this.hasSeed)
          );
        }
      }
      class Na extends f {
        constructor(e, t, n, r) {
          super(e),
            (this.accumulator = t),
            (this._seed = n),
            (this.hasSeed = r),
            (this.index = 0);
        }
        get seed() {
          return this._seed;
        }
        set seed(e) {
          (this.hasSeed = !0), (this._seed = e);
        }
        _next(e) {
          if (this.hasSeed) return this._tryNext(e);
          (this.seed = e), this.destination.next(e);
        }
        _tryNext(e) {
          const t = this.index++;
          let n;
          try {
            n = this.accumulator(this.seed, e, t);
          } catch (r) {
            this.destination.error(r);
          }
          (this.seed = n), this.destination.next(n);
        }
      }
      function Ra(e, t) {
        return H(e, t, 1);
      }
      function Da() {}
      function Oa(e, t, n) {
        return function (r) {
          return r.lift(new Ma(e, t, n));
        };
      }
      class Ma {
        constructor(e, t, n) {
          (this.nextOrObserver = e), (this.error = t), (this.complete = n);
        }
        call(e, t) {
          return t.subscribe(
            new Fa(e, this.nextOrObserver, this.error, this.complete)
          );
        }
      }
      class Fa extends f {
        constructor(e, t, n, s) {
          super(e),
            (this._tapNext = Da),
            (this._tapError = Da),
            (this._tapComplete = Da),
            (this._tapError = n || Da),
            (this._tapComplete = s || Da),
            r(t)
              ? ((this._context = this), (this._tapNext = t))
              : t &&
                ((this._context = t),
                (this._tapNext = t.next || Da),
                (this._tapError = t.error || Da),
                (this._tapComplete = t.complete || Da));
        }
        _next(e) {
          try {
            this._tapNext.call(this._context, e);
          } catch (t) {
            return void this.destination.error(t);
          }
          this.destination.next(e);
        }
        _error(e) {
          try {
            this._tapError.call(this._context, e);
          } catch (e) {
            return void this.destination.error(e);
          }
          this.destination.error(e);
        }
        _complete() {
          try {
            this._tapComplete.call(this._context);
          } catch (e) {
            return void this.destination.error(e);
          }
          return this.destination.complete();
        }
      }
      class Va {
        constructor(e) {
          this.callback = e;
        }
        call(e, t) {
          return t.subscribe(new La(e, this.callback));
        }
      }
      class La extends f {
        constructor(e, t) {
          super(e), this.add(new h(t));
        }
      }
      let Ua = null;
      function ja() {
        return Ua;
      }
      const $a = {
          class: "className",
          innerHtml: "innerHTML",
          readonly: "readOnly",
          tabindex: "tabIndex",
        },
        Ha = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        Ba = {
          A: "1",
          B: "2",
          C: "3",
          D: "4",
          E: "5",
          F: "6",
          G: "7",
          H: "8",
          I: "9",
          J: "*",
          K: "+",
          M: "-",
          N: ".",
          O: "/",
          "`": "0",
          "\x90": "NumLock",
        },
        za = (() => {
          if (_e.Node)
            return (
              _e.Node.prototype.contains ||
              function (e) {
                return !!(16 & this.compareDocumentPosition(e));
              }
            );
        })();
      class qa extends class extends class {
        constructor() {
          this.resourceLoaderType = null;
        }
        get attrToPropMap() {
          return this._attrToPropMap;
        }
        set attrToPropMap(e) {
          this._attrToPropMap = e;
        }
      } {
        constructor() {
          super(), (this._animationPrefix = null), (this._transitionEnd = null);
          try {
            const e = this.createElement("div", document);
            if (null != this.getStyle(e, "animationName"))
              this._animationPrefix = "";
            else {
              const t = ["Webkit", "Moz", "O", "ms"];
              for (let n = 0; n < t.length; n++)
                if (null != this.getStyle(e, t[n] + "AnimationName")) {
                  this._animationPrefix = "-" + t[n].toLowerCase() + "-";
                  break;
                }
            }
            const t = {
              WebkitTransition: "webkitTransitionEnd",
              MozTransition: "transitionend",
              OTransition: "oTransitionEnd otransitionend",
              transition: "transitionend",
            };
            Object.keys(t).forEach((n) => {
              null != this.getStyle(e, n) && (this._transitionEnd = t[n]);
            });
          } catch (e) {
            (this._animationPrefix = null), (this._transitionEnd = null);
          }
        }
        getDistributedNodes(e) {
          return e.getDistributedNodes();
        }
        resolveAndSetHref(e, t, n) {
          e.href = null == n ? t : t + "/../" + n;
        }
        supportsDOMEvents() {
          return !0;
        }
        supportsNativeShadowDOM() {
          return "function" == typeof document.body.createShadowRoot;
        }
        getAnimationPrefix() {
          return this._animationPrefix ? this._animationPrefix : "";
        }
        getTransitionEnd() {
          return this._transitionEnd ? this._transitionEnd : "";
        }
        supportsAnimation() {
          return null != this._animationPrefix && null != this._transitionEnd;
        }
      } {
        parse(e) {
          throw new Error("parse not implemented");
        }
        static makeCurrent() {
          var e;
          (e = new qa()), Ua || (Ua = e);
        }
        hasProperty(e, t) {
          return t in e;
        }
        setProperty(e, t, n) {
          e[t] = n;
        }
        getProperty(e, t) {
          return e[t];
        }
        invoke(e, t, n) {
          e[t](...n);
        }
        logError(e) {
          window.console && (console.error ? console.error(e) : console.log(e));
        }
        log(e) {
          window.console && window.console.log && window.console.log(e);
        }
        logGroup(e) {
          window.console && window.console.group && window.console.group(e);
        }
        logGroupEnd() {
          window.console &&
            window.console.groupEnd &&
            window.console.groupEnd();
        }
        get attrToPropMap() {
          return $a;
        }
        contains(e, t) {
          return za.call(e, t);
        }
        querySelector(e, t) {
          return e.querySelector(t);
        }
        querySelectorAll(e, t) {
          return e.querySelectorAll(t);
        }
        on(e, t, n) {
          e.addEventListener(t, n, !1);
        }
        onAndCancel(e, t, n) {
          return (
            e.addEventListener(t, n, !1),
            () => {
              e.removeEventListener(t, n, !1);
            }
          );
        }
        dispatchEvent(e, t) {
          e.dispatchEvent(t);
        }
        createMouseEvent(e) {
          const t = this.getDefaultDocument().createEvent("MouseEvent");
          return t.initEvent(e, !0, !0), t;
        }
        createEvent(e) {
          const t = this.getDefaultDocument().createEvent("Event");
          return t.initEvent(e, !0, !0), t;
        }
        preventDefault(e) {
          e.preventDefault(), (e.returnValue = !1);
        }
        isPrevented(e) {
          return (
            e.defaultPrevented || (null != e.returnValue && !e.returnValue)
          );
        }
        getInnerHTML(e) {
          return e.innerHTML;
        }
        getTemplateContent(e) {
          return "content" in e && this.isTemplateElement(e) ? e.content : null;
        }
        getOuterHTML(e) {
          return e.outerHTML;
        }
        nodeName(e) {
          return e.nodeName;
        }
        nodeValue(e) {
          return e.nodeValue;
        }
        type(e) {
          return e.type;
        }
        content(e) {
          return this.hasProperty(e, "content") ? e.content : e;
        }
        firstChild(e) {
          return e.firstChild;
        }
        nextSibling(e) {
          return e.nextSibling;
        }
        parentElement(e) {
          return e.parentNode;
        }
        childNodes(e) {
          return e.childNodes;
        }
        childNodesAsList(e) {
          const t = e.childNodes,
            n = new Array(t.length);
          for (let r = 0; r < t.length; r++) n[r] = t[r];
          return n;
        }
        clearNodes(e) {
          for (; e.firstChild; ) e.removeChild(e.firstChild);
        }
        appendChild(e, t) {
          e.appendChild(t);
        }
        removeChild(e, t) {
          e.removeChild(t);
        }
        replaceChild(e, t, n) {
          e.replaceChild(t, n);
        }
        remove(e) {
          return e.parentNode && e.parentNode.removeChild(e), e;
        }
        insertBefore(e, t, n) {
          e.insertBefore(n, t);
        }
        insertAllBefore(e, t, n) {
          n.forEach((n) => e.insertBefore(n, t));
        }
        insertAfter(e, t, n) {
          e.insertBefore(n, t.nextSibling);
        }
        setInnerHTML(e, t) {
          e.innerHTML = t;
        }
        getText(e) {
          return e.textContent;
        }
        setText(e, t) {
          e.textContent = t;
        }
        getValue(e) {
          return e.value;
        }
        setValue(e, t) {
          e.value = t;
        }
        getChecked(e) {
          return e.checked;
        }
        setChecked(e, t) {
          e.checked = t;
        }
        createComment(e) {
          return this.getDefaultDocument().createComment(e);
        }
        createTemplate(e) {
          const t = this.getDefaultDocument().createElement("template");
          return (t.innerHTML = e), t;
        }
        createElement(e, t) {
          return (t = t || this.getDefaultDocument()).createElement(e);
        }
        createElementNS(e, t, n) {
          return (n = n || this.getDefaultDocument()).createElementNS(e, t);
        }
        createTextNode(e, t) {
          return (t = t || this.getDefaultDocument()).createTextNode(e);
        }
        createScriptTag(e, t, n) {
          const r = (n = n || this.getDefaultDocument()).createElement(
            "SCRIPT"
          );
          return r.setAttribute(e, t), r;
        }
        createStyleElement(e, t) {
          const n = (t = t || this.getDefaultDocument()).createElement("style");
          return this.appendChild(n, this.createTextNode(e, t)), n;
        }
        createShadowRoot(e) {
          return e.createShadowRoot();
        }
        getShadowRoot(e) {
          return e.shadowRoot;
        }
        getHost(e) {
          return e.host;
        }
        clone(e) {
          return e.cloneNode(!0);
        }
        getElementsByClassName(e, t) {
          return e.getElementsByClassName(t);
        }
        getElementsByTagName(e, t) {
          return e.getElementsByTagName(t);
        }
        classList(e) {
          return Array.prototype.slice.call(e.classList, 0);
        }
        addClass(e, t) {
          e.classList.add(t);
        }
        removeClass(e, t) {
          e.classList.remove(t);
        }
        hasClass(e, t) {
          return e.classList.contains(t);
        }
        setStyle(e, t, n) {
          e.style[t] = n;
        }
        removeStyle(e, t) {
          e.style[t] = "";
        }
        getStyle(e, t) {
          return e.style[t];
        }
        hasStyle(e, t, n) {
          const r = this.getStyle(e, t) || "";
          return n ? r == n : r.length > 0;
        }
        tagName(e) {
          return e.tagName;
        }
        attributeMap(e) {
          const t = new Map(),
            n = e.attributes;
          for (let r = 0; r < n.length; r++) {
            const e = n.item(r);
            t.set(e.name, e.value);
          }
          return t;
        }
        hasAttribute(e, t) {
          return e.hasAttribute(t);
        }
        hasAttributeNS(e, t, n) {
          return e.hasAttributeNS(t, n);
        }
        getAttribute(e, t) {
          return e.getAttribute(t);
        }
        getAttributeNS(e, t, n) {
          return e.getAttributeNS(t, n);
        }
        setAttribute(e, t, n) {
          e.setAttribute(t, n);
        }
        setAttributeNS(e, t, n, r) {
          e.setAttributeNS(t, n, r);
        }
        removeAttribute(e, t) {
          e.removeAttribute(t);
        }
        removeAttributeNS(e, t, n) {
          e.removeAttributeNS(t, n);
        }
        templateAwareRoot(e) {
          return this.isTemplateElement(e) ? this.content(e) : e;
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        getBoundingClientRect(e) {
          try {
            return e.getBoundingClientRect();
          } catch (t) {
            return {
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              width: 0,
              height: 0,
            };
          }
        }
        getTitle(e) {
          return e.title;
        }
        setTitle(e, t) {
          e.title = t || "";
        }
        elementMatches(e, t) {
          return (
            !!this.isElementNode(e) &&
            ((e.matches && e.matches(t)) ||
              (e.msMatchesSelector && e.msMatchesSelector(t)) ||
              (e.webkitMatchesSelector && e.webkitMatchesSelector(t)))
          );
        }
        isTemplateElement(e) {
          return this.isElementNode(e) && "TEMPLATE" === e.nodeName;
        }
        isTextNode(e) {
          return e.nodeType === Node.TEXT_NODE;
        }
        isCommentNode(e) {
          return e.nodeType === Node.COMMENT_NODE;
        }
        isElementNode(e) {
          return e.nodeType === Node.ELEMENT_NODE;
        }
        hasShadowRoot(e) {
          return null != e.shadowRoot && e instanceof HTMLElement;
        }
        isShadowRoot(e) {
          return e instanceof DocumentFragment;
        }
        importIntoDoc(e) {
          return document.importNode(this.templateAwareRoot(e), !0);
        }
        adoptNode(e) {
          return document.adoptNode(e);
        }
        getHref(e) {
          return e.getAttribute("href");
        }
        getEventKey(e) {
          let t = e.key;
          if (null == t) {
            if (((t = e.keyIdentifier), null == t)) return "Unidentified";
            t.startsWith("U+") &&
              ((t = String.fromCharCode(parseInt(t.substring(2), 16))),
              3 === e.location && Ba.hasOwnProperty(t) && (t = Ba[t]));
          }
          return Ha[t] || t;
        }
        getGlobalEventTarget(e, t) {
          return "window" === t
            ? window
            : "document" === t
            ? e
            : "body" === t
            ? e.body
            : null;
        }
        getHistory() {
          return window.history;
        }
        getLocation() {
          return window.location;
        }
        getBaseHref(e) {
          const t =
            Ga || ((Ga = document.querySelector("base")), Ga)
              ? Ga.getAttribute("href")
              : null;
          return null == t
            ? null
            : ((n = t),
              Wa || (Wa = document.createElement("a")),
              Wa.setAttribute("href", n),
              "/" === Wa.pathname.charAt(0) ? Wa.pathname : "/" + Wa.pathname);
          var n;
        }
        resetBaseElement() {
          Ga = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        setData(e, t, n) {
          this.setAttribute(e, "data-" + t, n);
        }
        getData(e, t) {
          return this.getAttribute(e, "data-" + t);
        }
        getComputedStyle(e) {
          return getComputedStyle(e);
        }
        supportsWebAnimation() {
          return "function" == typeof Element.prototype.animate;
        }
        performanceNow() {
          return window.performance && window.performance.now
            ? window.performance.now()
            : new Date().getTime();
        }
        supportsCookies() {
          return !0;
        }
        getCookie(e) {
          return vl(document.cookie, e);
        }
        setCookie(e, t) {
          document.cookie = encodeURIComponent(e) + "=" + encodeURIComponent(t);
        }
      }
      let Wa,
        Ga = null;
      function Ka() {
        return !!window.history.pushState;
      }
      const Qa = new ve("TRANSITION_ID"),
        Za = [
          {
            provide: _s,
            useFactory: function (e, t, n) {
              return () => {
                n.get(vs).donePromise.then(() => {
                  const n = ja();
                  Array.prototype.slice
                    .apply(n.querySelectorAll(t, "style[ng-transition]"))
                    .filter((t) => n.getAttribute(t, "ng-transition") === e)
                    .forEach((e) => n.remove(e));
                });
              };
            },
            deps: [Qa, Ul, vt],
            multi: !0,
          },
        ];
      class Xa {
        static init() {
          var e;
          (e = new Xa()), (ti = e);
        }
        addToWindow(e) {
          (_e.getAngularTestability = (t, n = !0) => {
            const r = e.findTestabilityInTree(t, n);
            if (null == r)
              throw new Error("Could not find testability for element.");
            return r;
          }),
            (_e.getAllAngularTestabilities = () => e.getAllTestabilities()),
            (_e.getAllAngularRootElements = () => e.getAllRootElements()),
            _e.frameworkStabilizers || (_e.frameworkStabilizers = []),
            _e.frameworkStabilizers.push((e) => {
              const t = _e.getAllAngularTestabilities();
              let n = t.length,
                r = !1;
              const s = function (t) {
                (r = r || t), n--, 0 == n && e(r);
              };
              t.forEach(function (e) {
                e.whenStable(s);
              });
            });
        }
        findTestabilityInTree(e, t, n) {
          if (null == t) return null;
          const r = e.getTestability(t);
          return null != r
            ? r
            : n
            ? ja().isShadowRoot(t)
              ? this.findTestabilityInTree(e, ja().getHost(t), !0)
              : this.findTestabilityInTree(e, ja().parentElement(t), !0)
            : null;
        }
      }
      function Ja(e, t) {
        ("undefined" != typeof COMPILED && COMPILED) ||
          ((_e.ng = _e.ng || {})[e] = t);
      }
      const Ya = (() => ({ ApplicationRef: ai, NgZone: zs }))();
      function eu(e) {
        return vi(e);
      }
      const tu = new ve("EventManagerPlugins");
      class nu {
        constructor(e, t) {
          (this._zone = t),
            (this._eventNameToPlugin = new Map()),
            e.forEach((e) => (e.manager = this)),
            (this._plugins = e.slice().reverse());
        }
        addEventListener(e, t, n) {
          return this._findPluginFor(t).addEventListener(e, t, n);
        }
        addGlobalEventListener(e, t, n) {
          return this._findPluginFor(t).addGlobalEventListener(e, t, n);
        }
        getZone() {
          return this._zone;
        }
        _findPluginFor(e) {
          const t = this._eventNameToPlugin.get(e);
          if (t) return t;
          const n = this._plugins;
          for (let r = 0; r < n.length; r++) {
            const t = n[r];
            if (t.supports(e)) return this._eventNameToPlugin.set(e, t), t;
          }
          throw new Error("No event manager plugin found for event " + e);
        }
      }
      class ru {
        constructor(e) {
          this._doc = e;
        }
        addGlobalEventListener(e, t, n) {
          const r = ja().getGlobalEventTarget(this._doc, e);
          if (!r)
            throw new Error(`Unsupported event target ${r} for event ${t}`);
          return this.addEventListener(r, t, n);
        }
      }
      class su {
        constructor() {
          this._stylesSet = new Set();
        }
        addStyles(e) {
          const t = new Set();
          e.forEach((e) => {
            this._stylesSet.has(e) || (this._stylesSet.add(e), t.add(e));
          }),
            this.onStylesAdded(t);
        }
        onStylesAdded(e) {}
        getAllStyles() {
          return Array.from(this._stylesSet);
        }
      }
      class iu extends su {
        constructor(e) {
          super(),
            (this._doc = e),
            (this._hostNodes = new Set()),
            (this._styleNodes = new Set()),
            this._hostNodes.add(e.head);
        }
        _addStylesToHost(e, t) {
          e.forEach((e) => {
            const n = this._doc.createElement("style");
            (n.textContent = e), this._styleNodes.add(t.appendChild(n));
          });
        }
        addHost(e) {
          this._addStylesToHost(this._stylesSet, e), this._hostNodes.add(e);
        }
        removeHost(e) {
          this._hostNodes.delete(e);
        }
        onStylesAdded(e) {
          this._hostNodes.forEach((t) => this._addStylesToHost(e, t));
        }
        ngOnDestroy() {
          this._styleNodes.forEach((e) => ja().remove(e));
        }
      }
      const ou = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
        },
        lu = /%COMP%/g;
      function au(e, t, n) {
        for (let r = 0; r < t.length; r++) {
          let s = t[r];
          Array.isArray(s) ? au(e, s, n) : ((s = s.replace(lu, e)), n.push(s));
        }
        return n;
      }
      function uu(e) {
        return (t) => {
          !1 === e(t) && (t.preventDefault(), (t.returnValue = !1));
        };
      }
      class cu {
        constructor(e, t, n) {
          (this.eventManager = e),
            (this.sharedStylesHost = t),
            (this.appId = n),
            (this.rendererByCompId = new Map()),
            (this.defaultRenderer = new hu(e));
        }
        createRenderer(e, t) {
          if (!e || !t) return this.defaultRenderer;
          switch (t.encapsulation) {
            case De.Emulated: {
              let n = this.rendererByCompId.get(t.id);
              return (
                n ||
                  ((n = new fu(
                    this.eventManager,
                    this.sharedStylesHost,
                    t,
                    this.appId
                  )),
                  this.rendererByCompId.set(t.id, n)),
                n.applyToHost(e),
                n
              );
            }
            case De.Native:
            case De.ShadowDom:
              return new gu(this.eventManager, this.sharedStylesHost, e, t);
            default:
              if (!this.rendererByCompId.has(t.id)) {
                const e = au(t.id, t.styles, []);
                this.sharedStylesHost.addStyles(e),
                  this.rendererByCompId.set(t.id, this.defaultRenderer);
              }
              return this.defaultRenderer;
          }
        }
        begin() {}
        end() {}
      }
      class hu {
        constructor(e) {
          (this.eventManager = e), (this.data = Object.create(null));
        }
        destroy() {}
        createElement(e, t) {
          return t
            ? document.createElementNS(ou[t] || t, e)
            : document.createElement(e);
        }
        createComment(e) {
          return document.createComment(e);
        }
        createText(e) {
          return document.createTextNode(e);
        }
        appendChild(e, t) {
          e.appendChild(t);
        }
        insertBefore(e, t, n) {
          e && e.insertBefore(t, n);
        }
        removeChild(e, t) {
          e && e.removeChild(t);
        }
        selectRootElement(e, t) {
          let n = "string" == typeof e ? document.querySelector(e) : e;
          if (!n)
            throw new Error(`The selector "${e}" did not match any elements`);
          return t || (n.textContent = ""), n;
        }
        parentNode(e) {
          return e.parentNode;
        }
        nextSibling(e) {
          return e.nextSibling;
        }
        setAttribute(e, t, n, r) {
          if (r) {
            t = r + ":" + t;
            const s = ou[r];
            s ? e.setAttributeNS(s, t, n) : e.setAttribute(t, n);
          } else e.setAttribute(t, n);
        }
        removeAttribute(e, t, n) {
          if (n) {
            const r = ou[n];
            r ? e.removeAttributeNS(r, t) : e.removeAttribute(`${n}:${t}`);
          } else e.removeAttribute(t);
        }
        addClass(e, t) {
          e.classList.add(t);
        }
        removeClass(e, t) {
          e.classList.remove(t);
        }
        setStyle(e, t, n, r) {
          r & Zt.DashCase
            ? e.style.setProperty(t, n, r & Zt.Important ? "important" : "")
            : (e.style[t] = n);
        }
        removeStyle(e, t, n) {
          n & Zt.DashCase ? e.style.removeProperty(t) : (e.style[t] = "");
        }
        setProperty(e, t, n) {
          pu(t, "property"), (e[t] = n);
        }
        setValue(e, t) {
          e.nodeValue = t;
        }
        listen(e, t, n) {
          return (
            pu(t, "listener"),
            "string" == typeof e
              ? this.eventManager.addGlobalEventListener(e, t, uu(n))
              : this.eventManager.addEventListener(e, t, uu(n))
          );
        }
      }
      const du = (() => "@".charCodeAt(0))();
      function pu(e, t) {
        if (e.charCodeAt(0) === du)
          throw new Error(
            `Found the synthetic ${t} ${e}. Please include either "BrowserAnimationsModule" or "NoopAnimationsModule" in your application.`
          );
      }
      class fu extends hu {
        constructor(e, t, n, r) {
          super(e), (this.component = n);
          const s = au(r + "-" + n.id, n.styles, []);
          t.addStyles(s),
            (this.contentAttr = "_ngcontent-%COMP%".replace(
              lu,
              r + "-" + n.id
            )),
            (this.hostAttr = (function (e) {
              return "_nghost-%COMP%".replace(lu, e);
            })(r + "-" + n.id));
        }
        applyToHost(e) {
          super.setAttribute(e, this.hostAttr, "");
        }
        createElement(e, t) {
          const n = super.createElement(e, t);
          return super.setAttribute(n, this.contentAttr, ""), n;
        }
      }
      class gu extends hu {
        constructor(e, t, n, r) {
          super(e),
            (this.sharedStylesHost = t),
            (this.hostEl = n),
            (this.component = r),
            (this.shadowRoot =
              r.encapsulation === De.ShadowDom
                ? n.attachShadow({ mode: "open" })
                : n.createShadowRoot()),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const s = au(r.id, r.styles, []);
          for (let i = 0; i < s.length; i++) {
            const e = document.createElement("style");
            (e.textContent = s[i]), this.shadowRoot.appendChild(e);
          }
        }
        nodeOrShadowRoot(e) {
          return e === this.hostEl ? this.shadowRoot : e;
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
        appendChild(e, t) {
          return super.appendChild(this.nodeOrShadowRoot(e), t);
        }
        insertBefore(e, t, n) {
          return super.insertBefore(this.nodeOrShadowRoot(e), t, n);
        }
        removeChild(e, t) {
          return super.removeChild(this.nodeOrShadowRoot(e), t);
        }
        parentNode(e) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(e))
          );
        }
      }
      const mu = (() =>
          ("undefined" != typeof Zone && Zone.__symbol__) ||
          function (e) {
            return "__zone_symbol__" + e;
          })(),
        yu = mu("addEventListener"),
        _u = mu("removeEventListener"),
        vu = {},
        bu = "__zone_symbol__propagationStopped",
        wu = (() => {
          const e =
            "undefined" != typeof Zone && Zone[mu("BLACK_LISTED_EVENTS")];
          if (e) {
            const t = {};
            return (
              e.forEach((e) => {
                t[e] = e;
              }),
              t
            );
          }
        })(),
        Cu = function (e) {
          return !!wu && wu.hasOwnProperty(e);
        },
        Su = function (e) {
          const t = vu[e.type];
          if (!t) return;
          const n = this[t];
          if (!n) return;
          const r = [e];
          if (1 === n.length) {
            const e = n[0];
            return e.zone !== Zone.current
              ? e.zone.run(e.handler, this, r)
              : e.handler.apply(this, r);
          }
          {
            const t = n.slice();
            for (let n = 0; n < t.length && !0 !== e[bu]; n++) {
              const e = t[n];
              e.zone !== Zone.current
                ? e.zone.run(e.handler, this, r)
                : e.handler.apply(this, r);
            }
          }
        };
      class Eu extends ru {
        constructor(e, t, n) {
          super(e),
            (this.ngZone = t),
            (n &&
              (function (e) {
                return "server" === e;
              })(n)) ||
              this.patchEvent();
        }
        patchEvent() {
          if ("undefined" == typeof Event || !Event || !Event.prototype) return;
          if (Event.prototype.__zone_symbol__stopImmediatePropagation) return;
          const e = (Event.prototype.__zone_symbol__stopImmediatePropagation =
            Event.prototype.stopImmediatePropagation);
          Event.prototype.stopImmediatePropagation = function () {
            this && (this[bu] = !0), e && e.apply(this, arguments);
          };
        }
        supports(e) {
          return !0;
        }
        addEventListener(e, t, n) {
          let r = n;
          if (!e[yu] || (zs.isInAngularZone() && !Cu(t)))
            e.addEventListener(t, r, !1);
          else {
            let n = vu[t];
            n || (n = vu[t] = mu("ANGULAR" + t + "FALSE"));
            let s = e[n];
            const i = s && s.length > 0;
            s || (s = e[n] = []);
            const o = Cu(t) ? Zone.root : Zone.current;
            if (0 === s.length) s.push({ zone: o, handler: r });
            else {
              let e = !1;
              for (let t = 0; t < s.length; t++)
                if (s[t].handler === r) {
                  e = !0;
                  break;
                }
              e || s.push({ zone: o, handler: r });
            }
            i || e[yu](t, Su, !1);
          }
          return () => this.removeEventListener(e, t, r);
        }
        removeEventListener(e, t, n) {
          let r = e[_u];
          if (!r) return e.removeEventListener.apply(e, [t, n, !1]);
          let s = vu[t],
            i = s && e[s];
          if (!i) return e.removeEventListener.apply(e, [t, n, !1]);
          let o = !1;
          for (let l = 0; l < i.length; l++)
            if (i[l].handler === n) {
              (o = !0), i.splice(l, 1);
              break;
            }
          o
            ? 0 === i.length && r.apply(e, [t, Su, !1])
            : e.removeEventListener.apply(e, [t, n, !1]);
        }
      }
      const Tu = {
          pan: !0,
          panstart: !0,
          panmove: !0,
          panend: !0,
          pancancel: !0,
          panleft: !0,
          panright: !0,
          panup: !0,
          pandown: !0,
          pinch: !0,
          pinchstart: !0,
          pinchmove: !0,
          pinchend: !0,
          pinchcancel: !0,
          pinchin: !0,
          pinchout: !0,
          press: !0,
          pressup: !0,
          rotate: !0,
          rotatestart: !0,
          rotatemove: !0,
          rotateend: !0,
          rotatecancel: !0,
          swipe: !0,
          swipeleft: !0,
          swiperight: !0,
          swipeup: !0,
          swipedown: !0,
          tap: !0,
        },
        xu = new ve("HammerGestureConfig"),
        ku = new ve("HammerLoader");
      class Au {
        constructor() {
          (this.events = []), (this.overrides = {});
        }
        buildHammer(e) {
          const t = new Hammer(e, this.options);
          t.get("pinch").set({ enable: !0 }),
            t.get("rotate").set({ enable: !0 });
          for (const n in this.overrides) t.get(n).set(this.overrides[n]);
          return t;
        }
      }
      class Iu extends ru {
        constructor(e, t, n, r) {
          super(e), (this._config = t), (this.console = n), (this.loader = r);
        }
        supports(e) {
          return !(
            (!Tu.hasOwnProperty(e.toLowerCase()) && !this.isCustomEvent(e)) ||
            (!window.Hammer &&
              !this.loader &&
              (this.console.warn(
                `The "${e}" event cannot be bound because Hammer.JS is not loaded and no custom loader has been specified.`
              ),
              1))
          );
        }
        addEventListener(e, t, n) {
          const r = this.manager.getZone();
          if (((t = t.toLowerCase()), !window.Hammer && this.loader)) {
            let r = !1,
              s = () => {
                r = !0;
              };
            return (
              this.loader()
                .then(() => {
                  if (!window.Hammer)
                    return (
                      this.console.warn(
                        "The custom HAMMER_LOADER completed, but Hammer.JS is not present."
                      ),
                      void (s = () => {})
                    );
                  r || (s = this.addEventListener(e, t, n));
                })
                .catch(() => {
                  this.console.warn(
                    `The "${t}" event cannot be bound because the custom Hammer.JS loader failed.`
                  ),
                    (s = () => {});
                }),
              () => {
                s();
              }
            );
          }
          return r.runOutsideAngular(() => {
            const s = this._config.buildHammer(e),
              i = function (e) {
                r.runGuarded(function () {
                  n(e);
                });
              };
            return (
              s.on(t, i),
              () => {
                s.off(t, i), "function" == typeof s.destroy && s.destroy();
              }
            );
          });
        }
        isCustomEvent(e) {
          return this._config.events.indexOf(e) > -1;
        }
      }
      const Pu = ["alt", "control", "meta", "shift"],
        Nu = {
          alt: (e) => e.altKey,
          control: (e) => e.ctrlKey,
          meta: (e) => e.metaKey,
          shift: (e) => e.shiftKey,
        };
      class Ru extends ru {
        constructor(e) {
          super(e);
        }
        supports(e) {
          return null != Ru.parseEventName(e);
        }
        addEventListener(e, t, n) {
          const r = Ru.parseEventName(t),
            s = Ru.eventCallback(r.fullKey, n, this.manager.getZone());
          return this.manager
            .getZone()
            .runOutsideAngular(() => ja().onAndCancel(e, r.domEventName, s));
        }
        static parseEventName(e) {
          const t = e.toLowerCase().split("."),
            n = t.shift();
          if (0 === t.length || ("keydown" !== n && "keyup" !== n)) return null;
          const r = Ru._normalizeKey(t.pop());
          let s = "";
          if (
            (Pu.forEach((e) => {
              const n = t.indexOf(e);
              n > -1 && (t.splice(n, 1), (s += e + "."));
            }),
            (s += r),
            0 != t.length || 0 === r.length)
          )
            return null;
          const i = {};
          return (i.domEventName = n), (i.fullKey = s), i;
        }
        static getEventFullKey(e) {
          let t = "",
            n = ja().getEventKey(e);
          return (
            (n = n.toLowerCase()),
            " " === n ? (n = "space") : "." === n && (n = "dot"),
            Pu.forEach((r) => {
              r != n && (0, Nu[r])(e) && (t += r + ".");
            }),
            (t += n),
            t
          );
        }
        static eventCallback(e, t, n) {
          return (r) => {
            Ru.getEventFullKey(r) === e && n.runGuarded(() => t(r));
          };
        }
        static _normalizeKey(e) {
          switch (e) {
            case "esc":
              return "escape";
            default:
              return e;
          }
        }
      }
      class Du {}
      class Ou extends Du {
        constructor(e) {
          super(), (this._doc = e);
        }
        sanitize(e, t) {
          if (null == t) return null;
          switch (e) {
            case ut.NONE:
              return t;
            case ut.HTML:
              return t instanceof Fu
                ? t.changingThisBreaksApplicationSecurity
                : (this.checkNotSafeValue(t, "HTML"),
                  (function (e, t) {
                    let n = null;
                    try {
                      lt = lt || new He(e);
                      let r = t ? String(t) : "";
                      n = lt.getInertBodyElement(r);
                      let s = 5,
                        i = r;
                      do {
                        if (0 === s)
                          throw new Error(
                            "Failed to sanitize html because the input is unstable"
                          );
                        s--,
                          (r = i),
                          (i = n.innerHTML),
                          (n = lt.getInertBodyElement(r));
                      } while (r !== i);
                      const o = new rt(),
                        l = o.sanitizeChildren(at(n) || n);
                      return (
                        $e() &&
                          o.sanitizedSomething &&
                          console.warn(
                            "WARNING: sanitizing HTML stripped some content, see http://g.co/ng/security#xss"
                          ),
                        l
                      );
                    } finally {
                      if (n) {
                        const e = at(n) || n;
                        for (; e.firstChild; ) e.removeChild(e.firstChild);
                      }
                    }
                  })(this._doc, String(t)));
            case ut.STYLE:
              return t instanceof Vu
                ? t.changingThisBreaksApplicationSecurity
                : (this.checkNotSafeValue(t, "Style"),
                  (function (e) {
                    if (!(e = String(e).trim())) return "";
                    const t = e.match(dt);
                    return (t && qe(t[1]) === t[1]) ||
                      (e.match(ht) &&
                        (function (e) {
                          let t = !0,
                            n = !0;
                          for (let r = 0; r < e.length; r++) {
                            const s = e.charAt(r);
                            "'" === s && n
                              ? (t = !t)
                              : '"' === s && t && (n = !n);
                          }
                          return t && n;
                        })(e))
                      ? e
                      : ($e() &&
                          console.warn(
                            `WARNING: sanitizing unsafe style value ${e} (see http://g.co/ng/security#xss).`
                          ),
                        "unsafe");
                  })(t));
            case ut.SCRIPT:
              if (t instanceof Lu)
                return t.changingThisBreaksApplicationSecurity;
              throw (
                (this.checkNotSafeValue(t, "Script"),
                new Error("unsafe value used in a script context"))
              );
            case ut.URL:
              return t instanceof ju || t instanceof Uu
                ? t.changingThisBreaksApplicationSecurity
                : (this.checkNotSafeValue(t, "URL"), qe(String(t)));
            case ut.RESOURCE_URL:
              if (t instanceof ju)
                return t.changingThisBreaksApplicationSecurity;
              throw (
                (this.checkNotSafeValue(t, "ResourceURL"),
                new Error(
                  "unsafe value used in a resource URL context (see http://g.co/ng/security#xss)"
                ))
              );
            default:
              throw new Error(
                `Unexpected SecurityContext ${e} (see http://g.co/ng/security#xss)`
              );
          }
        }
        checkNotSafeValue(e, t) {
          if (e instanceof Mu)
            throw new Error(
              `Required a safe ${t}, got a ${e.getTypeName()} (see http://g.co/ng/security#xss)`
            );
        }
        bypassSecurityTrustHtml(e) {
          return new Fu(e);
        }
        bypassSecurityTrustStyle(e) {
          return new Vu(e);
        }
        bypassSecurityTrustScript(e) {
          return new Lu(e);
        }
        bypassSecurityTrustUrl(e) {
          return new Uu(e);
        }
        bypassSecurityTrustResourceUrl(e) {
          return new ju(e);
        }
      }
      class Mu {
        constructor(e) {
          this.changingThisBreaksApplicationSecurity = e;
        }
        toString() {
          return (
            "SafeValue must use [property]=binding: " +
            this.changingThisBreaksApplicationSecurity +
            " (see http://g.co/ng/security#xss)"
          );
        }
      }
      class Fu extends Mu {
        getTypeName() {
          return "HTML";
        }
      }
      class Vu extends Mu {
        getTypeName() {
          return "Style";
        }
      }
      class Lu extends Mu {
        getTypeName() {
          return "Script";
        }
      }
      class Uu extends Mu {
        getTypeName() {
          return "URL";
        }
      }
      class ju extends Mu {
        getTypeName() {
          return "ResourceURL";
        }
      }
      const $u = si(wi, "browser", [
        { provide: Es, useValue: "browser" },
        {
          provide: Ss,
          useValue: function () {
            qa.makeCurrent(), Xa.init();
          },
          multi: !0,
        },
        {
          provide: tl,
          useClass: class extends tl {
            constructor(e) {
              super(), (this._doc = e), this._init();
            }
            _init() {
              (this.location = ja().getLocation()),
                (this._history = ja().getHistory());
            }
            getBaseHrefFromDOM() {
              return ja().getBaseHref(this._doc);
            }
            onPopState(e) {
              ja()
                .getGlobalEventTarget(this._doc, "window")
                .addEventListener("popstate", e, !1);
            }
            onHashChange(e) {
              ja()
                .getGlobalEventTarget(this._doc, "window")
                .addEventListener("hashchange", e, !1);
            }
            get href() {
              return this.location.href;
            }
            get protocol() {
              return this.location.protocol;
            }
            get hostname() {
              return this.location.hostname;
            }
            get port() {
              return this.location.port;
            }
            get pathname() {
              return this.location.pathname;
            }
            get search() {
              return this.location.search;
            }
            get hash() {
              return this.location.hash;
            }
            set pathname(e) {
              this.location.pathname = e;
            }
            pushState(e, t, n) {
              Ka()
                ? this._history.pushState(e, t, n)
                : (this.location.hash = n);
            }
            replaceState(e, t, n) {
              Ka()
                ? this._history.replaceState(e, t, n)
                : (this.location.hash = n);
            }
            forward() {
              this._history.forward();
            }
            back() {
              this._history.back();
            }
            getState() {
              return this._history.state;
            }
          },
          deps: [Ul],
        },
        {
          provide: Ul,
          useFactory: function () {
            return document;
          },
          deps: [],
        },
      ]);
      function Hu() {
        return new Le();
      }
      class Bu {
        constructor(e) {
          if (e)
            throw new Error(
              "BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead."
            );
        }
        static withServerTransition(e) {
          return {
            ngModule: Bu,
            providers: [
              { provide: bs, useValue: e.appId },
              { provide: Qa, useExisting: bs },
              Za,
            ],
          };
        }
      }
      "undefined" != typeof window && window;
      class zu {
        constructor(e, t) {
          (this.id = e), (this.url = t);
        }
      }
      class qu extends zu {
        constructor(e, t, n = "imperative", r = null) {
          super(e, t), (this.navigationTrigger = n), (this.restoredState = r);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class Wu extends zu {
        constructor(e, t, n) {
          super(e, t), (this.urlAfterRedirects = n);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      class Gu extends zu {
        constructor(e, t, n) {
          super(e, t), (this.reason = n);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class Ku extends zu {
        constructor(e, t, n) {
          super(e, t), (this.error = n);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class Qu extends zu {
        constructor(e, t, n, r) {
          super(e, t), (this.urlAfterRedirects = n), (this.state = r);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class Zu extends zu {
        constructor(e, t, n, r) {
          super(e, t), (this.urlAfterRedirects = n), (this.state = r);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class Xu extends zu {
        constructor(e, t, n, r, s) {
          super(e, t),
            (this.urlAfterRedirects = n),
            (this.state = r),
            (this.shouldActivate = s);
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
      }
      class Ju extends zu {
        constructor(e, t, n, r) {
          super(e, t), (this.urlAfterRedirects = n), (this.state = r);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class Yu extends zu {
        constructor(e, t, n, r) {
          super(e, t), (this.urlAfterRedirects = n), (this.state = r);
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class ec {
        constructor(e) {
          this.route = e;
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class tc {
        constructor(e) {
          this.route = e;
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class nc {
        constructor(e) {
          this.snapshot = e;
        }
        toString() {
          return `ChildActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class rc {
        constructor(e) {
          this.snapshot = e;
        }
        toString() {
          return `ChildActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class sc {
        constructor(e) {
          this.snapshot = e;
        }
        toString() {
          return `ActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class ic {
        constructor(e) {
          this.snapshot = e;
        }
        toString() {
          return `ActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class oc {
        constructor(e, t, n) {
          (this.routerEvent = e), (this.position = t), (this.anchor = n);
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`;
        }
      }
      class lc {}
      class ac {
        constructor(e) {
          this.params = e || {};
        }
        has(e) {
          return this.params.hasOwnProperty(e);
        }
        get(e) {
          if (this.has(e)) {
            const t = this.params[e];
            return Array.isArray(t) ? t[0] : t;
          }
          return null;
        }
        getAll(e) {
          if (this.has(e)) {
            const t = this.params[e];
            return Array.isArray(t) ? t : [t];
          }
          return [];
        }
        get keys() {
          return Object.keys(this.params);
        }
      }
      function uc(e) {
        return new ac(e);
      }
      function cc(e) {
        const t = Error("NavigationCancelingError: " + e);
        return (t.ngNavigationCancelingError = !0), t;
      }
      function hc(e, t, n) {
        const r = n.path.split("/");
        if (r.length > e.length) return null;
        if ("full" === n.pathMatch && (t.hasChildren() || r.length < e.length))
          return null;
        const s = {};
        for (let i = 0; i < r.length; i++) {
          const t = r[i],
            n = e[i];
          if (t.startsWith(":")) s[t.substring(1)] = n;
          else if (t !== n.path) return null;
        }
        return { consumed: e.slice(0, r.length), posParams: s };
      }
      class dc {
        constructor(e, t) {
          (this.routes = e), (this.module = t);
        }
      }
      function pc(e, t = "") {
        for (let n = 0; n < e.length; n++) {
          const r = e[n];
          fc(r, gc(t, r));
        }
      }
      function fc(e, t) {
        if (!e)
          throw new Error(
            `\n      Invalid configuration of route '${t}': Encountered undefined route.\n      The reason might be an extra comma.\n\n      Example:\n      const routes: Routes = [\n        { path: '', redirectTo: '/dashboard', pathMatch: 'full' },\n        { path: 'dashboard',  component: DashboardComponent },, << two commas\n        { path: 'detail/:id', component: HeroDetailComponent }\n      ];\n    `
          );
        if (Array.isArray(e))
          throw new Error(
            `Invalid configuration of route '${t}': Array cannot be specified`
          );
        if (
          !e.component &&
          !e.children &&
          !e.loadChildren &&
          e.outlet &&
          "primary" !== e.outlet
        )
          throw new Error(
            `Invalid configuration of route '${t}': a componentless route without children or loadChildren cannot have a named outlet set`
          );
        if (e.redirectTo && e.children)
          throw new Error(
            `Invalid configuration of route '${t}': redirectTo and children cannot be used together`
          );
        if (e.redirectTo && e.loadChildren)
          throw new Error(
            `Invalid configuration of route '${t}': redirectTo and loadChildren cannot be used together`
          );
        if (e.children && e.loadChildren)
          throw new Error(
            `Invalid configuration of route '${t}': children and loadChildren cannot be used together`
          );
        if (e.redirectTo && e.component)
          throw new Error(
            `Invalid configuration of route '${t}': redirectTo and component cannot be used together`
          );
        if (e.path && e.matcher)
          throw new Error(
            `Invalid configuration of route '${t}': path and matcher cannot be used together`
          );
        if (
          void 0 === e.redirectTo &&
          !e.component &&
          !e.children &&
          !e.loadChildren
        )
          throw new Error(
            `Invalid configuration of route '${t}'. One of the following must be provided: component, redirectTo, children or loadChildren`
          );
        if (void 0 === e.path && void 0 === e.matcher)
          throw new Error(
            `Invalid configuration of route '${t}': routes must have either a path or a matcher specified`
          );
        if ("string" == typeof e.path && "/" === e.path.charAt(0))
          throw new Error(
            `Invalid configuration of route '${t}': path cannot start with a slash`
          );
        if ("" === e.path && void 0 !== e.redirectTo && void 0 === e.pathMatch)
          throw new Error(
            `Invalid configuration of route '{path: "${t}", redirectTo: "${e.redirectTo}"}': please provide 'pathMatch'. The default value of 'pathMatch' is 'prefix', but often the intent is to use 'full'.`
          );
        if (
          void 0 !== e.pathMatch &&
          "full" !== e.pathMatch &&
          "prefix" !== e.pathMatch
        )
          throw new Error(
            `Invalid configuration of route '${t}': pathMatch can only be set to 'prefix' or 'full'`
          );
        e.children && pc(e.children, t);
      }
      function gc(e, t) {
        return t
          ? e || t.path
            ? e && !t.path
              ? e + "/"
              : !e && t.path
              ? t.path
              : `${e}/${t.path}`
            : ""
          : e;
      }
      function mc(e) {
        const t = e.children && e.children.map(mc),
          n = t ? Object.assign({}, e, { children: t }) : Object.assign({}, e);
        return (
          !n.component &&
            (t || n.loadChildren) &&
            n.outlet &&
            "primary" !== n.outlet &&
            (n.component = lc),
          n
        );
      }
      function yc(e, t) {
        const n = Object.keys(e),
          r = Object.keys(t);
        if (!n || !r || n.length != r.length) return !1;
        let s;
        for (let i = 0; i < n.length; i++)
          if (((s = n[i]), e[s] !== t[s])) return !1;
        return !0;
      }
      function _c(e) {
        return Array.prototype.concat.apply([], e);
      }
      function vc(e) {
        return e.length > 0 ? e[e.length - 1] : null;
      }
      function bc(e, t) {
        for (const n in e) e.hasOwnProperty(n) && t(e[n], n);
      }
      function wc(e) {
        return Ft(e) ? e : Mt(e) ? L(Promise.resolve(e)) : Hl(e);
      }
      function Cc(e, t, n) {
        return n
          ? (function (e, t) {
              return yc(e, t);
            })(e.queryParams, t.queryParams) &&
              (function e(t, n) {
                if (!xc(t.segments, n.segments)) return !1;
                if (t.numberOfChildren !== n.numberOfChildren) return !1;
                for (const r in n.children) {
                  if (!t.children[r]) return !1;
                  if (!e(t.children[r], n.children[r])) return !1;
                }
                return !0;
              })(e.root, t.root)
          : (function (e, t) {
              return (
                Object.keys(t).length <= Object.keys(e).length &&
                Object.keys(t).every((n) => t[n] === e[n])
              );
            })(e.queryParams, t.queryParams) &&
              (function e(t, n) {
                return (function t(n, r, s) {
                  if (n.segments.length > s.length)
                    return (
                      !!xc(n.segments.slice(0, s.length), s) && !r.hasChildren()
                    );
                  if (n.segments.length === s.length) {
                    if (!xc(n.segments, s)) return !1;
                    for (const t in r.children) {
                      if (!n.children[t]) return !1;
                      if (!e(n.children[t], r.children[t])) return !1;
                    }
                    return !0;
                  }
                  {
                    const e = s.slice(0, n.segments.length),
                      i = s.slice(n.segments.length);
                    return (
                      !!xc(n.segments, e) &&
                      !!n.children.primary &&
                      t(n.children.primary, r, i)
                    );
                  }
                })(t, n, n.segments);
              })(e.root, t.root);
      }
      class Sc {
        constructor(e, t, n) {
          (this.root = e), (this.queryParams = t), (this.fragment = n);
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = uc(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return Pc.serialize(this);
        }
      }
      class Ec {
        constructor(e, t) {
          (this.segments = e),
            (this.children = t),
            (this.parent = null),
            bc(t, (e, t) => (e.parent = this));
        }
        hasChildren() {
          return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
          return Object.keys(this.children).length;
        }
        toString() {
          return Nc(this);
        }
      }
      class Tc {
        constructor(e, t) {
          (this.path = e), (this.parameters = t);
        }
        get parameterMap() {
          return (
            this._parameterMap || (this._parameterMap = uc(this.parameters)),
            this._parameterMap
          );
        }
        toString() {
          return Vc(this);
        }
      }
      function xc(e, t) {
        return e.length === t.length && e.every((e, n) => e.path === t[n].path);
      }
      function kc(e, t) {
        let n = [];
        return (
          bc(e.children, (e, r) => {
            "primary" === r && (n = n.concat(t(e, r)));
          }),
          bc(e.children, (e, r) => {
            "primary" !== r && (n = n.concat(t(e, r)));
          }),
          n
        );
      }
      class Ac {}
      class Ic {
        parse(e) {
          const t = new Hc(e);
          return new Sc(
            t.parseRootSegment(),
            t.parseQueryParams(),
            t.parseFragment()
          );
        }
        serialize(e) {
          return `${
            "/" +
            (function e(t, n) {
              if (!t.hasChildren()) return Nc(t);
              if (n) {
                const n = t.children.primary ? e(t.children.primary, !1) : "",
                  r = [];
                return (
                  bc(t.children, (t, n) => {
                    "primary" !== n && r.push(`${n}:${e(t, !1)}`);
                  }),
                  r.length > 0 ? `${n}(${r.join("//")})` : n
                );
              }
              {
                const n = kc(t, (n, r) =>
                  "primary" === r
                    ? [e(t.children.primary, !1)]
                    : [`${r}:${e(n, !1)}`]
                );
                return `${Nc(t)}/(${n.join("//")})`;
              }
            })(e.root, !0)
          }${(function (e) {
            const t = Object.keys(e).map((t) => {
              const n = e[t];
              return Array.isArray(n)
                ? n.map((e) => `${Dc(t)}=${Dc(e)}`).join("&")
                : `${Dc(t)}=${Dc(n)}`;
            });
            return t.length ? "?" + t.join("&") : "";
          })(e.queryParams)}${
            "string" == typeof e.fragment ? "#" + encodeURI(e.fragment) : ""
          }`;
        }
      }
      const Pc = new Ic();
      function Nc(e) {
        return e.segments.map((e) => Vc(e)).join("/");
      }
      function Rc(e) {
        return encodeURIComponent(e)
          .replace(/%40/g, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",");
      }
      function Dc(e) {
        return Rc(e).replace(/%3B/gi, ";");
      }
      function Oc(e) {
        return Rc(e)
          .replace(/\(/g, "%28")
          .replace(/\)/g, "%29")
          .replace(/%26/gi, "&");
      }
      function Mc(e) {
        return decodeURIComponent(e);
      }
      function Fc(e) {
        return Mc(e.replace(/\+/g, "%20"));
      }
      function Vc(e) {
        return `${Oc(e.path)}${
          ((t = e.parameters),
          Object.keys(t)
            .map((e) => `;${Oc(e)}=${Oc(t[e])}`)
            .join(""))
        }`;
        var t;
      }
      const Lc = /^[^\/()?;=#]+/;
      function Uc(e) {
        const t = e.match(Lc);
        return t ? t[0] : "";
      }
      const jc = /^[^=?&#]+/,
        $c = /^[^?&#]+/;
      class Hc {
        constructor(e) {
          (this.url = e), (this.remaining = e);
        }
        parseRootSegment() {
          return (
            this.consumeOptional("/"),
            "" === this.remaining ||
            this.peekStartsWith("?") ||
            this.peekStartsWith("#")
              ? new Ec([], {})
              : new Ec([], this.parseChildren())
          );
        }
        parseQueryParams() {
          const e = {};
          if (this.consumeOptional("?"))
            do {
              this.parseQueryParam(e);
            } while (this.consumeOptional("&"));
          return e;
        }
        parseFragment() {
          return this.consumeOptional("#")
            ? decodeURIComponent(this.remaining)
            : null;
        }
        parseChildren() {
          if ("" === this.remaining) return {};
          this.consumeOptional("/");
          const e = [];
          for (
            this.peekStartsWith("(") || e.push(this.parseSegment());
            this.peekStartsWith("/") &&
            !this.peekStartsWith("//") &&
            !this.peekStartsWith("/(");

          )
            this.capture("/"), e.push(this.parseSegment());
          let t = {};
          this.peekStartsWith("/(") &&
            (this.capture("/"), (t = this.parseParens(!0)));
          let n = {};
          return (
            this.peekStartsWith("(") && (n = this.parseParens(!1)),
            (e.length > 0 || Object.keys(t).length > 0) &&
              (n.primary = new Ec(e, t)),
            n
          );
        }
        parseSegment() {
          const e = Uc(this.remaining);
          if ("" === e && this.peekStartsWith(";"))
            throw new Error(
              `Empty path url segment cannot have parameters: '${this.remaining}'.`
            );
          return this.capture(e), new Tc(Mc(e), this.parseMatrixParams());
        }
        parseMatrixParams() {
          const e = {};
          for (; this.consumeOptional(";"); ) this.parseParam(e);
          return e;
        }
        parseParam(e) {
          const t = Uc(this.remaining);
          if (!t) return;
          this.capture(t);
          let n = "";
          if (this.consumeOptional("=")) {
            const e = Uc(this.remaining);
            e && ((n = e), this.capture(n));
          }
          e[Mc(t)] = Mc(n);
        }
        parseQueryParam(e) {
          const t = (function (e) {
            const t = e.match(jc);
            return t ? t[0] : "";
          })(this.remaining);
          if (!t) return;
          this.capture(t);
          let n = "";
          if (this.consumeOptional("=")) {
            const e = (function (e) {
              const t = e.match($c);
              return t ? t[0] : "";
            })(this.remaining);
            e && ((n = e), this.capture(n));
          }
          const r = Fc(t),
            s = Fc(n);
          if (e.hasOwnProperty(r)) {
            let t = e[r];
            Array.isArray(t) || ((t = [t]), (e[r] = t)), t.push(s);
          } else e[r] = s;
        }
        parseParens(e) {
          const t = {};
          for (
            this.capture("(");
            !this.consumeOptional(")") && this.remaining.length > 0;

          ) {
            const n = Uc(this.remaining),
              r = this.remaining[n.length];
            if ("/" !== r && ")" !== r && ";" !== r)
              throw new Error(`Cannot parse url '${this.url}'`);
            let s = void 0;
            n.indexOf(":") > -1
              ? ((s = n.substr(0, n.indexOf(":"))),
                this.capture(s),
                this.capture(":"))
              : e && (s = "primary");
            const i = this.parseChildren();
            (t[s] = 1 === Object.keys(i).length ? i.primary : new Ec([], i)),
              this.consumeOptional("//");
          }
          return t;
        }
        peekStartsWith(e) {
          return this.remaining.startsWith(e);
        }
        consumeOptional(e) {
          return (
            !!this.peekStartsWith(e) &&
            ((this.remaining = this.remaining.substring(e.length)), !0)
          );
        }
        capture(e) {
          if (!this.consumeOptional(e)) throw new Error(`Expected "${e}".`);
        }
      }
      class Bc {
        constructor(e) {
          this._root = e;
        }
        get root() {
          return this._root.value;
        }
        parent(e) {
          const t = this.pathFromRoot(e);
          return t.length > 1 ? t[t.length - 2] : null;
        }
        children(e) {
          const t = zc(e, this._root);
          return t ? t.children.map((e) => e.value) : [];
        }
        firstChild(e) {
          const t = zc(e, this._root);
          return t && t.children.length > 0 ? t.children[0].value : null;
        }
        siblings(e) {
          const t = qc(e, this._root);
          return t.length < 2
            ? []
            : t[t.length - 2].children
                .map((e) => e.value)
                .filter((t) => t !== e);
        }
        pathFromRoot(e) {
          return qc(e, this._root).map((e) => e.value);
        }
      }
      function zc(e, t) {
        if (e === t.value) return t;
        for (const n of t.children) {
          const t = zc(e, n);
          if (t) return t;
        }
        return null;
      }
      function qc(e, t) {
        if (e === t.value) return [t];
        for (const n of t.children) {
          const r = qc(e, n);
          if (r.length) return r.unshift(t), r;
        }
        return [];
      }
      class Wc {
        constructor(e, t) {
          (this.value = e), (this.children = t);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function Gc(e) {
        const t = {};
        return e && e.children.forEach((e) => (t[e.value.outlet] = e)), t;
      }
      class Kc extends Bc {
        constructor(e, t) {
          super(e), (this.snapshot = t), eh(this, e);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function Qc(e, t) {
        const n = (function (e, t) {
            const n = new Jc(
              [],
              {},
              {},
              "",
              {},
              "primary",
              t,
              null,
              e.root,
              -1,
              {}
            );
            return new Yc("", new Wc(n, []));
          })(e, t),
          r = new Bl([new Tc("", {})]),
          s = new Bl({}),
          i = new Bl({}),
          o = new Bl({}),
          l = new Bl(""),
          a = new Zc(r, s, o, l, i, "primary", t, n.root);
        return (a.snapshot = n.root), new Kc(new Wc(a, []), n);
      }
      class Zc {
        constructor(e, t, n, r, s, i, o, l) {
          (this.url = e),
            (this.params = t),
            (this.queryParams = n),
            (this.fragment = r),
            (this.data = s),
            (this.outlet = i),
            (this.component = o),
            (this._futureSnapshot = l);
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig;
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap ||
              (this._paramMap = this.params.pipe(A((e) => uc(e)))),
            this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(A((e) => uc(e)))),
            this._queryParamMap
          );
        }
        toString() {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`;
        }
      }
      function Xc(e, t = "emptyOnly") {
        const n = e.pathFromRoot;
        let r = 0;
        if ("always" !== t)
          for (r = n.length - 1; r >= 1; ) {
            const e = n[r],
              t = n[r - 1];
            if (e.routeConfig && "" === e.routeConfig.path) r--;
            else {
              if (t.component) break;
              r--;
            }
          }
        return (function (e) {
          return e.reduce(
            (e, t) => ({
              params: Object.assign({}, e.params, t.params),
              data: Object.assign({}, e.data, t.data),
              resolve: Object.assign({}, e.resolve, t._resolvedData),
            }),
            { params: {}, data: {}, resolve: {} }
          );
        })(n.slice(r));
      }
      class Jc {
        constructor(e, t, n, r, s, i, o, l, a, u, c) {
          (this.url = e),
            (this.params = t),
            (this.queryParams = n),
            (this.fragment = r),
            (this.data = s),
            (this.outlet = i),
            (this.component = o),
            (this.routeConfig = l),
            (this._urlSegment = a),
            (this._lastPathIndex = u),
            (this._resolve = c);
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap || (this._paramMap = uc(this.params)), this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = uc(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return `Route(url:'${this.url
            .map((e) => e.toString())
            .join("/")}', path:'${
            this.routeConfig ? this.routeConfig.path : ""
          }')`;
        }
      }
      class Yc extends Bc {
        constructor(e, t) {
          super(t), (this.url = e), eh(this, t);
        }
        toString() {
          return th(this._root);
        }
      }
      function eh(e, t) {
        (t.value._routerState = e), t.children.forEach((t) => eh(e, t));
      }
      function th(e) {
        const t =
          e.children.length > 0 ? ` { ${e.children.map(th).join(", ")} } ` : "";
        return `${e.value}${t}`;
      }
      function nh(e) {
        if (e.snapshot) {
          const t = e.snapshot,
            n = e._futureSnapshot;
          (e.snapshot = n),
            yc(t.queryParams, n.queryParams) ||
              e.queryParams.next(n.queryParams),
            t.fragment !== n.fragment && e.fragment.next(n.fragment),
            yc(t.params, n.params) || e.params.next(n.params),
            (function (e, t) {
              if (e.length !== t.length) return !1;
              for (let n = 0; n < e.length; ++n) if (!yc(e[n], t[n])) return !1;
              return !0;
            })(t.url, n.url) || e.url.next(n.url),
            yc(t.data, n.data) || e.data.next(n.data);
        } else
          (e.snapshot = e._futureSnapshot), e.data.next(e._futureSnapshot.data);
      }
      function rh(e, t) {
        var n, r;
        return (
          yc(e.params, t.params) &&
          xc((n = e.url), (r = t.url)) &&
          n.every((e, t) => yc(e.parameters, r[t].parameters)) &&
          !(!e.parent != !t.parent) &&
          (!e.parent || rh(e.parent, t.parent))
        );
      }
      function sh(e) {
        return (
          "object" == typeof e && null != e && !e.outlets && !e.segmentPath
        );
      }
      function ih(e, t, n, r, s) {
        let i = {};
        return (
          r &&
            bc(r, (e, t) => {
              i[t] = Array.isArray(e) ? e.map((e) => "" + e) : "" + e;
            }),
          new Sc(
            n.root === e
              ? t
              : (function e(t, n, r) {
                  const s = {};
                  return (
                    bc(t.children, (t, i) => {
                      s[i] = t === n ? r : e(t, n, r);
                    }),
                    new Ec(t.segments, s)
                  );
                })(n.root, e, t),
            i,
            s
          )
        );
      }
      class oh {
        constructor(e, t, n) {
          if (
            ((this.isAbsolute = e),
            (this.numberOfDoubleDots = t),
            (this.commands = n),
            e && n.length > 0 && sh(n[0]))
          )
            throw new Error("Root segment cannot have matrix parameters");
          const r = n.find(
            (e) => "object" == typeof e && null != e && e.outlets
          );
          if (r && r !== vc(n))
            throw new Error("{outlets:{}} has to be the last command");
        }
        toRoot() {
          return (
            this.isAbsolute &&
            1 === this.commands.length &&
            "/" == this.commands[0]
          );
        }
      }
      class lh {
        constructor(e, t, n) {
          (this.segmentGroup = e), (this.processChildren = t), (this.index = n);
        }
      }
      function ah(e) {
        return "object" == typeof e && null != e && e.outlets
          ? e.outlets.primary
          : "" + e;
      }
      function uh(e, t, n) {
        if (
          (e || (e = new Ec([], {})),
          0 === e.segments.length && e.hasChildren())
        )
          return ch(e, t, n);
        const r = (function (e, t, n) {
            let r = 0,
              s = t;
            const i = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; s < e.segments.length; ) {
              if (r >= n.length) return i;
              const t = e.segments[s],
                o = ah(n[r]),
                l = r < n.length - 1 ? n[r + 1] : null;
              if (s > 0 && void 0 === o) break;
              if (o && l && "object" == typeof l && void 0 === l.outlets) {
                if (!fh(o, l, t)) return i;
                r += 2;
              } else {
                if (!fh(o, {}, t)) return i;
                r++;
              }
              s++;
            }
            return { match: !0, pathIndex: s, commandIndex: r };
          })(e, t, n),
          s = n.slice(r.commandIndex);
        if (r.match && r.pathIndex < e.segments.length) {
          const t = new Ec(e.segments.slice(0, r.pathIndex), {});
          return (
            (t.children.primary = new Ec(
              e.segments.slice(r.pathIndex),
              e.children
            )),
            ch(t, 0, s)
          );
        }
        return r.match && 0 === s.length
          ? new Ec(e.segments, {})
          : r.match && !e.hasChildren()
          ? hh(e, t, n)
          : r.match
          ? ch(e, 0, s)
          : hh(e, t, n);
      }
      function ch(e, t, n) {
        if (0 === n.length) return new Ec(e.segments, {});
        {
          const r = (function (e) {
              return "object" != typeof e[0] || void 0 === e[0].outlets
                ? { primary: e }
                : e[0].outlets;
            })(n),
            s = {};
          return (
            bc(r, (n, r) => {
              null !== n && (s[r] = uh(e.children[r], t, n));
            }),
            bc(e.children, (e, t) => {
              void 0 === r[t] && (s[t] = e);
            }),
            new Ec(e.segments, s)
          );
        }
      }
      function hh(e, t, n) {
        const r = e.segments.slice(0, t);
        let s = 0;
        for (; s < n.length; ) {
          if ("object" == typeof n[s] && void 0 !== n[s].outlets) {
            const e = dh(n[s].outlets);
            return new Ec(r, e);
          }
          if (0 === s && sh(n[0])) {
            r.push(new Tc(e.segments[t].path, n[0])), s++;
            continue;
          }
          const i = ah(n[s]),
            o = s < n.length - 1 ? n[s + 1] : null;
          i && o && sh(o)
            ? (r.push(new Tc(i, ph(o))), (s += 2))
            : (r.push(new Tc(i, {})), s++);
        }
        return new Ec(r, {});
      }
      function dh(e) {
        const t = {};
        return (
          bc(e, (e, n) => {
            null !== e && (t[n] = hh(new Ec([], {}), 0, e));
          }),
          t
        );
      }
      function ph(e) {
        const t = {};
        return bc(e, (e, n) => (t[n] = "" + e)), t;
      }
      function fh(e, t, n) {
        return e == n.path && yc(t, n.parameters);
      }
      class gh {
        constructor(e, t, n, r) {
          (this.routeReuseStrategy = e),
            (this.futureState = t),
            (this.currState = n),
            (this.forwardEvent = r);
        }
        activate(e) {
          const t = this.futureState._root,
            n = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(t, n, e),
            nh(this.futureState.root),
            this.activateChildRoutes(t, n, e);
        }
        deactivateChildRoutes(e, t, n) {
          const r = Gc(t);
          e.children.forEach((e) => {
            const t = e.value.outlet;
            this.deactivateRoutes(e, r[t], n), delete r[t];
          }),
            bc(r, (e, t) => {
              this.deactivateRouteAndItsChildren(e, n);
            });
        }
        deactivateRoutes(e, t, n) {
          const r = e.value,
            s = t ? t.value : null;
          if (r === s)
            if (r.component) {
              const s = n.getContext(r.outlet);
              s && this.deactivateChildRoutes(e, t, s.children);
            } else this.deactivateChildRoutes(e, t, n);
          else s && this.deactivateRouteAndItsChildren(t, n);
        }
        deactivateRouteAndItsChildren(e, t) {
          this.routeReuseStrategy.shouldDetach(e.value.snapshot)
            ? this.detachAndStoreRouteSubtree(e, t)
            : this.deactivateRouteAndOutlet(e, t);
        }
        detachAndStoreRouteSubtree(e, t) {
          const n = t.getContext(e.value.outlet);
          if (n && n.outlet) {
            const t = n.outlet.detach(),
              r = n.children.onOutletDeactivated();
            this.routeReuseStrategy.store(e.value.snapshot, {
              componentRef: t,
              route: e,
              contexts: r,
            });
          }
        }
        deactivateRouteAndOutlet(e, t) {
          const n = t.getContext(e.value.outlet);
          if (n) {
            const r = Gc(e),
              s = e.value.component ? n.children : t;
            bc(r, (e, t) => this.deactivateRouteAndItsChildren(e, s)),
              n.outlet &&
                (n.outlet.deactivate(), n.children.onOutletDeactivated());
          }
        }
        activateChildRoutes(e, t, n) {
          const r = Gc(t);
          e.children.forEach((e) => {
            this.activateRoutes(e, r[e.value.outlet], n),
              this.forwardEvent(new ic(e.value.snapshot));
          }),
            e.children.length && this.forwardEvent(new rc(e.value.snapshot));
        }
        activateRoutes(e, t, n) {
          const r = e.value,
            s = t ? t.value : null;
          if ((nh(r), r === s))
            if (r.component) {
              const s = n.getOrCreateContext(r.outlet);
              this.activateChildRoutes(e, t, s.children);
            } else this.activateChildRoutes(e, t, n);
          else if (r.component) {
            const t = n.getOrCreateContext(r.outlet);
            if (this.routeReuseStrategy.shouldAttach(r.snapshot)) {
              const e = this.routeReuseStrategy.retrieve(r.snapshot);
              this.routeReuseStrategy.store(r.snapshot, null),
                t.children.onOutletReAttached(e.contexts),
                (t.attachRef = e.componentRef),
                (t.route = e.route.value),
                t.outlet && t.outlet.attach(e.componentRef, e.route.value),
                mh(e.route);
            } else {
              const n = (function (e) {
                  for (let t = e.parent; t; t = t.parent) {
                    const e = t.routeConfig;
                    if (e && e._loadedConfig) return e._loadedConfig;
                    if (e && e.component) return null;
                  }
                  return null;
                })(r.snapshot),
                s = n ? n.module.componentFactoryResolver : null;
              (t.attachRef = null),
                (t.route = r),
                (t.resolver = s),
                t.outlet && t.outlet.activateWith(r, s),
                this.activateChildRoutes(e, null, t.children);
            }
          } else this.activateChildRoutes(e, null, n);
        }
      }
      function mh(e) {
        nh(e.value), e.children.forEach(mh);
      }
      function yh(e) {
        return "function" == typeof e;
      }
      function _h(e) {
        return e instanceof Sc;
      }
      class vh {
        constructor(e) {
          this.segmentGroup = e || null;
        }
      }
      class bh {
        constructor(e) {
          this.urlTree = e;
        }
      }
      function wh(e) {
        return new b((t) => t.error(new vh(e)));
      }
      function Ch(e) {
        return new b((t) => t.error(new bh(e)));
      }
      function Sh(e) {
        return new b((t) =>
          t.error(
            new Error(
              `Only absolute redirects can have named outlets. redirectTo: '${e}'`
            )
          )
        );
      }
      class Eh {
        constructor(e, t, n, r, s) {
          (this.configLoader = t),
            (this.urlSerializer = n),
            (this.urlTree = r),
            (this.config = s),
            (this.allowRedirects = !0),
            (this.ngModule = e.get(Ie));
        }
        apply() {
          return this.expandSegmentGroup(
            this.ngModule,
            this.config,
            this.urlTree.root,
            "primary"
          )
            .pipe(
              A((e) =>
                this.createUrlTree(
                  e,
                  this.urlTree.queryParams,
                  this.urlTree.fragment
                )
              )
            )
            .pipe(
              ma((e) => {
                if (e instanceof bh)
                  return (this.allowRedirects = !1), this.match(e.urlTree);
                if (e instanceof vh) throw this.noMatchError(e);
                throw e;
              })
            );
        }
        match(e) {
          return this.expandSegmentGroup(
            this.ngModule,
            this.config,
            e.root,
            "primary"
          )
            .pipe(A((t) => this.createUrlTree(t, e.queryParams, e.fragment)))
            .pipe(
              ma((e) => {
                if (e instanceof vh) throw this.noMatchError(e);
                throw e;
              })
            );
        }
        noMatchError(e) {
          return new Error(
            `Cannot match any routes. URL Segment: '${e.segmentGroup}'`
          );
        }
        createUrlTree(e, t, n) {
          const r = e.segments.length > 0 ? new Ec([], { primary: e }) : e;
          return new Sc(r, t, n);
        }
        expandSegmentGroup(e, t, n, r) {
          return 0 === n.segments.length && n.hasChildren()
            ? this.expandChildren(e, t, n).pipe(A((e) => new Ec([], e)))
            : this.expandSegment(e, n, t, n.segments, r, !0);
        }
        expandChildren(e, t, n) {
          return (function (e, t) {
            if (0 === Object.keys(e).length) return Hl({});
            const n = [],
              r = [],
              s = {};
            return (
              bc(e, (e, i) => {
                const o = t(i, e).pipe(A((e) => (s[i] = e)));
                "primary" === i ? n.push(o) : r.push(o);
              }),
              Hl.apply(null, n.concat(r)).pipe(
                ea(),
                ga(),
                A(() => s)
              )
            );
          })(n.children, (n, r) => this.expandSegmentGroup(e, t, r, n));
        }
        expandSegment(e, t, n, r, s, i) {
          return Hl(...n).pipe(
            A((o) =>
              this.expandSegmentAgainstRoute(e, t, n, o, r, s, i).pipe(
                ma((e) => {
                  if (e instanceof vh) return Hl(null);
                  throw e;
                })
              )
            ),
            ea(),
            Ca((e) => !!e),
            ma((e, n) => {
              if (e instanceof zl || "EmptyError" === e.name) {
                if (this.noLeftoversInUrl(t, r, s)) return Hl(new Ec([], {}));
                throw new vh(t);
              }
              throw e;
            })
          );
        }
        noLeftoversInUrl(e, t, n) {
          return 0 === t.length && !e.children[n];
        }
        expandSegmentAgainstRoute(e, t, n, r, s, i, o) {
          return Ah(r) !== i
            ? wh(t)
            : void 0 === r.redirectTo
            ? this.matchSegmentAgainstRoute(e, t, r, s)
            : o && this.allowRedirects
            ? this.expandSegmentAgainstRouteUsingRedirect(e, t, n, r, s, i)
            : wh(t);
        }
        expandSegmentAgainstRouteUsingRedirect(e, t, n, r, s, i) {
          return "**" === r.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(e, n, r, i)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(
                e,
                t,
                n,
                r,
                s,
                i
              );
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(e, t, n, r) {
          const s = this.applyRedirectCommands([], n.redirectTo, {});
          return n.redirectTo.startsWith("/")
            ? Ch(s)
            : this.lineralizeSegments(n, s).pipe(
                H((n) => {
                  const s = new Ec(n, {});
                  return this.expandSegment(e, s, t, n, r, !1);
                })
              );
        }
        expandRegularSegmentAgainstRouteUsingRedirect(e, t, n, r, s, i) {
          const {
            matched: o,
            consumedSegments: l,
            lastChild: a,
            positionalParamSegments: u,
          } = Th(t, r, s);
          if (!o) return wh(t);
          const c = this.applyRedirectCommands(l, r.redirectTo, u);
          return r.redirectTo.startsWith("/")
            ? Ch(c)
            : this.lineralizeSegments(r, c).pipe(
                H((r) =>
                  this.expandSegment(e, t, n, r.concat(s.slice(a)), i, !1)
                )
              );
        }
        matchSegmentAgainstRoute(e, t, n, r) {
          if ("**" === n.path)
            return n.loadChildren
              ? this.configLoader
                  .load(e.injector, n)
                  .pipe(A((e) => ((n._loadedConfig = e), new Ec(r, {}))))
              : Hl(new Ec(r, {}));
          const { matched: s, consumedSegments: i, lastChild: o } = Th(t, n, r);
          if (!s) return wh(t);
          const l = r.slice(o);
          return this.getChildConfig(e, n, r).pipe(
            H((e) => {
              const n = e.module,
                r = e.routes,
                { segmentGroup: s, slicedSegments: o } = (function (
                  e,
                  t,
                  n,
                  r
                ) {
                  return n.length > 0 &&
                    (function (e, t, n) {
                      return n.some((n) => kh(e, t, n) && "primary" !== Ah(n));
                    })(e, n, r)
                    ? {
                        segmentGroup: xh(
                          new Ec(
                            t,
                            (function (e, t) {
                              const n = {};
                              n.primary = t;
                              for (const r of e)
                                "" === r.path &&
                                  "primary" !== Ah(r) &&
                                  (n[Ah(r)] = new Ec([], {}));
                              return n;
                            })(r, new Ec(n, e.children))
                          )
                        ),
                        slicedSegments: [],
                      }
                    : 0 === n.length &&
                      (function (e, t, n) {
                        return n.some((n) => kh(e, t, n));
                      })(e, n, r)
                    ? {
                        segmentGroup: xh(
                          new Ec(
                            e.segments,
                            (function (e, t, n, r) {
                              const s = {};
                              for (const i of n)
                                kh(e, t, i) &&
                                  !r[Ah(i)] &&
                                  (s[Ah(i)] = new Ec([], {}));
                              return Object.assign({}, r, s);
                            })(e, n, r, e.children)
                          )
                        ),
                        slicedSegments: n,
                      }
                    : { segmentGroup: e, slicedSegments: n };
                })(t, i, l, r);
              return 0 === o.length && s.hasChildren()
                ? this.expandChildren(n, r, s).pipe(A((e) => new Ec(i, e)))
                : 0 === r.length && 0 === o.length
                ? Hl(new Ec(i, {}))
                : this.expandSegment(n, s, r, o, "primary", !0).pipe(
                    A((e) => new Ec(i.concat(e.segments), e.children))
                  );
            })
          );
        }
        getChildConfig(e, t, n) {
          return t.children
            ? Hl(new dc(t.children, e))
            : t.loadChildren
            ? void 0 !== t._loadedConfig
              ? Hl(t._loadedConfig)
              : (function (e, t, n) {
                  const r = t.canLoad;
                  return r && 0 !== r.length
                    ? L(r)
                        .pipe(
                          A((r) => {
                            const s = e.get(r);
                            let i;
                            if (
                              (function (e) {
                                return e && yh(e.canLoad);
                              })(s)
                            )
                              i = s.canLoad(t, n);
                            else {
                              if (!yh(s))
                                throw new Error("Invalid CanLoad guard");
                              i = s(t, n);
                            }
                            return wc(i);
                          })
                        )
                        .pipe(
                          ea(),
                          ((s = (e) => !0 === e),
                          (e) => e.lift(new Sa(s, void 0, e)))
                        )
                    : Hl(!0);
                  var s;
                })(e.injector, t, n).pipe(
                  H((n) =>
                    n
                      ? this.configLoader
                          .load(e.injector, t)
                          .pipe(A((e) => ((t._loadedConfig = e), e)))
                      : (function (e) {
                          return new b((t) =>
                            t.error(
                              cc(
                                `Cannot load children because the guard of the route "path: '${e.path}'" returned false`
                              )
                            )
                          );
                        })(t)
                  )
                )
            : Hl(new dc([], e));
        }
        lineralizeSegments(e, t) {
          let n = [],
            r = t.root;
          for (;;) {
            if (((n = n.concat(r.segments)), 0 === r.numberOfChildren))
              return Hl(n);
            if (r.numberOfChildren > 1 || !r.children.primary)
              return Sh(e.redirectTo);
            r = r.children.primary;
          }
        }
        applyRedirectCommands(e, t, n) {
          return this.applyRedirectCreatreUrlTree(
            t,
            this.urlSerializer.parse(t),
            e,
            n
          );
        }
        applyRedirectCreatreUrlTree(e, t, n, r) {
          const s = this.createSegmentGroup(e, t.root, n, r);
          return new Sc(
            s,
            this.createQueryParams(t.queryParams, this.urlTree.queryParams),
            t.fragment
          );
        }
        createQueryParams(e, t) {
          const n = {};
          return (
            bc(e, (e, r) => {
              if ("string" == typeof e && e.startsWith(":")) {
                const s = e.substring(1);
                n[r] = t[s];
              } else n[r] = e;
            }),
            n
          );
        }
        createSegmentGroup(e, t, n, r) {
          const s = this.createSegments(e, t.segments, n, r);
          let i = {};
          return (
            bc(t.children, (t, s) => {
              i[s] = this.createSegmentGroup(e, t, n, r);
            }),
            new Ec(s, i)
          );
        }
        createSegments(e, t, n, r) {
          return t.map((t) =>
            t.path.startsWith(":")
              ? this.findPosParam(e, t, r)
              : this.findOrReturn(t, n)
          );
        }
        findPosParam(e, t, n) {
          const r = n[t.path.substring(1)];
          if (!r)
            throw new Error(
              `Cannot redirect to '${e}'. Cannot find '${t.path}'.`
            );
          return r;
        }
        findOrReturn(e, t) {
          let n = 0;
          for (const r of t) {
            if (r.path === e.path) return t.splice(n), r;
            n++;
          }
          return e;
        }
      }
      function Th(e, t, n) {
        if ("" === t.path)
          return "full" === t.pathMatch && (e.hasChildren() || n.length > 0)
            ? {
                matched: !1,
                consumedSegments: [],
                lastChild: 0,
                positionalParamSegments: {},
              }
            : {
                matched: !0,
                consumedSegments: [],
                lastChild: 0,
                positionalParamSegments: {},
              };
        const r = (t.matcher || hc)(n, e, t);
        return r
          ? {
              matched: !0,
              consumedSegments: r.consumed,
              lastChild: r.consumed.length,
              positionalParamSegments: r.posParams,
            }
          : {
              matched: !1,
              consumedSegments: [],
              lastChild: 0,
              positionalParamSegments: {},
            };
      }
      function xh(e) {
        if (1 === e.numberOfChildren && e.children.primary) {
          const t = e.children.primary;
          return new Ec(e.segments.concat(t.segments), t.children);
        }
        return e;
      }
      function kh(e, t, n) {
        return (
          (!(e.hasChildren() || t.length > 0) || "full" !== n.pathMatch) &&
          "" === n.path &&
          void 0 !== n.redirectTo
        );
      }
      function Ah(e) {
        return e.outlet || "primary";
      }
      class Ih {
        constructor(e) {
          (this.path = e), (this.route = this.path[this.path.length - 1]);
        }
      }
      class Ph {
        constructor(e, t) {
          (this.component = e), (this.route = t);
        }
      }
      function Nh(e, t, n) {
        const r = e._root;
        return (function e(
          t,
          n,
          r,
          s,
          i = { canDeactivateChecks: [], canActivateChecks: [] }
        ) {
          const o = Gc(n);
          return (
            t.children.forEach((t) => {
              !(function (
                t,
                n,
                r,
                s,
                i = { canDeactivateChecks: [], canActivateChecks: [] }
              ) {
                const o = t.value,
                  l = n ? n.value : null,
                  a = r ? r.getContext(t.value.outlet) : null;
                if (l && o.routeConfig === l.routeConfig) {
                  const u = (function (e, t, n) {
                    if ("function" == typeof n) return n(e, t);
                    switch (n) {
                      case "pathParamsChange":
                        return !xc(e.url, t.url);
                      case "pathParamsOrQueryParamsChange":
                        return (
                          !xc(e.url, t.url) || !yc(e.queryParams, t.queryParams)
                        );
                      case "always":
                        return !0;
                      case "paramsOrQueryParamsChange":
                        return !rh(e, t) || !yc(e.queryParams, t.queryParams);
                      case "paramsChange":
                      default:
                        return !rh(e, t);
                    }
                  })(l, o, o.routeConfig.runGuardsAndResolvers);
                  u
                    ? i.canActivateChecks.push(new Ih(s))
                    : ((o.data = l.data), (o._resolvedData = l._resolvedData)),
                    e(t, n, o.component ? (a ? a.children : null) : r, s, i),
                    u &&
                      i.canDeactivateChecks.push(
                        new Ph((a && a.outlet && a.outlet.component) || null, l)
                      );
                } else
                  l && Dh(n, a, i),
                    i.canActivateChecks.push(new Ih(s)),
                    e(t, null, o.component ? (a ? a.children : null) : r, s, i);
              })(t, o[t.value.outlet], r, s.concat([t.value]), i),
                delete o[t.value.outlet];
            }),
            bc(o, (e, t) => Dh(e, r.getContext(t), i)),
            i
          );
        })(r, t ? t._root : null, n, [r.value]);
      }
      function Rh(e, t, n) {
        const r = (function (e) {
          if (!e) return null;
          for (let t = e.parent; t; t = t.parent) {
            const e = t.routeConfig;
            if (e && e._loadedConfig) return e._loadedConfig;
          }
          return null;
        })(t);
        return (r ? r.module.injector : n).get(e);
      }
      function Dh(e, t, n) {
        const r = Gc(e),
          s = e.value;
        bc(r, (e, r) => {
          Dh(e, s.component ? (t ? t.children.getContext(r) : null) : t, n);
        }),
          n.canDeactivateChecks.push(
            new Ph(
              s.component && t && t.outlet && t.outlet.isActivated
                ? t.outlet.component
                : null,
              s
            )
          );
      }
      const Oh = Symbol("INITIAL_VALUE");
      function Mh() {
        return Ta((e) =>
          (function (...e) {
            let t = void 0,
              n = void 0;
            return (
              k(e[e.length - 1]) && (n = e.pop()),
              "function" == typeof e[e.length - 1] && (t = e.pop()),
              1 === e.length && a(e[0]) && (e = e[0]),
              W(e, n).lift(new Ql(t))
            );
          })(
            ...e.map((e) =>
              e.pipe(
                va(1),
                (function (...e) {
                  const t = e[e.length - 1];
                  return k(t) ? (e.pop(), (n) => Aa(e, n, t)) : (t) => Aa(e, t);
                })(Oh)
              )
            )
          ).pipe(
            Ia((e, t) => {
              let n = !1;
              return t.reduce((e, r, s) => {
                if (e !== Oh) return e;
                if ((r === Oh && (n = !0), !n)) {
                  if (!1 === r) return r;
                  if (s === t.length - 1 || _h(r)) return r;
                }
                return e;
              }, e);
            }, Oh),
            ta((e) => e !== Oh),
            A((e) => (_h(e) ? e : !0 === e)),
            va(1)
          )
        );
      }
      function Fh(e, t) {
        return null !== e && t && t(new sc(e)), Hl(!0);
      }
      function Vh(e, t) {
        return null !== e && t && t(new nc(e)), Hl(!0);
      }
      function Lh(e, t, n) {
        const r = t.routeConfig ? t.routeConfig.canActivate : null;
        return r && 0 !== r.length
          ? Hl(
              r.map((r) =>
                Yl(() => {
                  const s = Rh(r, t, n);
                  let i;
                  if (
                    (function (e) {
                      return e && yh(e.canActivate);
                    })(s)
                  )
                    i = wc(s.canActivate(t, e));
                  else {
                    if (!yh(s)) throw new Error("Invalid CanActivate guard");
                    i = wc(s(t, e));
                  }
                  return i.pipe(Ca());
                })
              )
            ).pipe(Mh())
          : Hl(!0);
      }
      function Uh(e, t, n) {
        const r = t[t.length - 1],
          s = t
            .slice(0, t.length - 1)
            .reverse()
            .map((e) =>
              (function (e) {
                const t = e.routeConfig ? e.routeConfig.canActivateChild : null;
                return t && 0 !== t.length ? { node: e, guards: t } : null;
              })(e)
            )
            .filter((e) => null !== e)
            .map((t) =>
              Yl(() =>
                Hl(
                  t.guards.map((s) => {
                    const i = Rh(s, t.node, n);
                    let o;
                    if (
                      (function (e) {
                        return e && yh(e.canActivateChild);
                      })(i)
                    )
                      o = wc(i.canActivateChild(r, e));
                    else {
                      if (!yh(i))
                        throw new Error("Invalid CanActivateChild guard");
                      o = wc(i(r, e));
                    }
                    return o.pipe(Ca());
                  })
                ).pipe(Mh())
              )
            );
        return Hl(s).pipe(Mh());
      }
      class jh {}
      class $h {
        constructor(e, t, n, r, s, i) {
          (this.rootComponentType = e),
            (this.config = t),
            (this.urlTree = n),
            (this.url = r),
            (this.paramsInheritanceStrategy = s),
            (this.relativeLinkResolution = i);
        }
        recognize() {
          try {
            const e = zh(
                this.urlTree.root,
                [],
                [],
                this.config,
                this.relativeLinkResolution
              ).segmentGroup,
              t = this.processSegmentGroup(this.config, e, "primary"),
              n = new Jc(
                [],
                Object.freeze({}),
                Object.freeze(Object.assign({}, this.urlTree.queryParams)),
                this.urlTree.fragment,
                {},
                "primary",
                this.rootComponentType,
                null,
                this.urlTree.root,
                -1,
                {}
              ),
              r = new Wc(n, t),
              s = new Yc(this.url, r);
            return this.inheritParamsAndData(s._root), Hl(s);
          } catch (e) {
            return new b((t) => t.error(e));
          }
        }
        inheritParamsAndData(e) {
          const t = e.value,
            n = Xc(t, this.paramsInheritanceStrategy);
          (t.params = Object.freeze(n.params)),
            (t.data = Object.freeze(n.data)),
            e.children.forEach((e) => this.inheritParamsAndData(e));
        }
        processSegmentGroup(e, t, n) {
          return 0 === t.segments.length && t.hasChildren()
            ? this.processChildren(e, t)
            : this.processSegment(e, t, t.segments, n);
        }
        processChildren(e, t) {
          const n = kc(t, (t, n) => this.processSegmentGroup(e, t, n));
          return (
            (function (e) {
              const t = {};
              e.forEach((e) => {
                const n = t[e.value.outlet];
                if (n) {
                  const t = n.url.map((e) => e.toString()).join("/"),
                    r = e.value.url.map((e) => e.toString()).join("/");
                  throw new Error(
                    `Two segments cannot have the same outlet name: '${t}' and '${r}'.`
                  );
                }
                t[e.value.outlet] = e.value;
              });
            })(n),
            n.sort((e, t) =>
              "primary" === e.value.outlet
                ? -1
                : "primary" === t.value.outlet
                ? 1
                : e.value.outlet.localeCompare(t.value.outlet)
            ),
            n
          );
        }
        processSegment(e, t, n, r) {
          for (const i of e)
            try {
              return this.processSegmentAgainstRoute(i, t, n, r);
            } catch (s) {
              if (!(s instanceof jh)) throw s;
            }
          if (this.noLeftoversInUrl(t, n, r)) return [];
          throw new jh();
        }
        noLeftoversInUrl(e, t, n) {
          return 0 === t.length && !e.children[n];
        }
        processSegmentAgainstRoute(e, t, n, r) {
          if (e.redirectTo) throw new jh();
          if ((e.outlet || "primary") !== r) throw new jh();
          let s,
            i = [],
            o = [];
          if ("**" === e.path) {
            const i = n.length > 0 ? vc(n).parameters : {};
            s = new Jc(
              n,
              i,
              Object.freeze(Object.assign({}, this.urlTree.queryParams)),
              this.urlTree.fragment,
              Gh(e),
              r,
              e.component,
              e,
              Hh(t),
              Bh(t) + n.length,
              Kh(e)
            );
          } else {
            const l = (function (e, t, n) {
              if ("" === t.path) {
                if ("full" === t.pathMatch && (e.hasChildren() || n.length > 0))
                  throw new jh();
                return { consumedSegments: [], lastChild: 0, parameters: {} };
              }
              const r = (t.matcher || hc)(n, e, t);
              if (!r) throw new jh();
              const s = {};
              bc(r.posParams, (e, t) => {
                s[t] = e.path;
              });
              const i =
                r.consumed.length > 0
                  ? Object.assign(
                      {},
                      s,
                      r.consumed[r.consumed.length - 1].parameters
                    )
                  : s;
              return {
                consumedSegments: r.consumed,
                lastChild: r.consumed.length,
                parameters: i,
              };
            })(t, e, n);
            (i = l.consumedSegments),
              (o = n.slice(l.lastChild)),
              (s = new Jc(
                i,
                l.parameters,
                Object.freeze(Object.assign({}, this.urlTree.queryParams)),
                this.urlTree.fragment,
                Gh(e),
                r,
                e.component,
                e,
                Hh(t),
                Bh(t) + i.length,
                Kh(e)
              ));
          }
          const l = (function (e) {
              return e.children
                ? e.children
                : e.loadChildren
                ? e._loadedConfig.routes
                : [];
            })(e),
            { segmentGroup: a, slicedSegments: u } = zh(
              t,
              i,
              o,
              l,
              this.relativeLinkResolution
            );
          if (0 === u.length && a.hasChildren()) {
            const e = this.processChildren(l, a);
            return [new Wc(s, e)];
          }
          if (0 === l.length && 0 === u.length) return [new Wc(s, [])];
          const c = this.processSegment(l, a, u, "primary");
          return [new Wc(s, c)];
        }
      }
      function Hh(e) {
        let t = e;
        for (; t._sourceSegment; ) t = t._sourceSegment;
        return t;
      }
      function Bh(e) {
        let t = e,
          n = t._segmentIndexShift ? t._segmentIndexShift : 0;
        for (; t._sourceSegment; )
          (t = t._sourceSegment),
            (n += t._segmentIndexShift ? t._segmentIndexShift : 0);
        return n - 1;
      }
      function zh(e, t, n, r, s) {
        if (
          n.length > 0 &&
          (function (e, t, n) {
            return n.some((n) => qh(e, t, n) && "primary" !== Wh(n));
          })(e, n, r)
        ) {
          const s = new Ec(
            t,
            (function (e, t, n, r) {
              const s = {};
              (s.primary = r),
                (r._sourceSegment = e),
                (r._segmentIndexShift = t.length);
              for (const i of n)
                if ("" === i.path && "primary" !== Wh(i)) {
                  const n = new Ec([], {});
                  (n._sourceSegment = e),
                    (n._segmentIndexShift = t.length),
                    (s[Wh(i)] = n);
                }
              return s;
            })(e, t, r, new Ec(n, e.children))
          );
          return (
            (s._sourceSegment = e),
            (s._segmentIndexShift = t.length),
            { segmentGroup: s, slicedSegments: [] }
          );
        }
        if (
          0 === n.length &&
          (function (e, t, n) {
            return n.some((n) => qh(e, t, n));
          })(e, n, r)
        ) {
          const i = new Ec(
            e.segments,
            (function (e, t, n, r, s, i) {
              const o = {};
              for (const l of r)
                if (qh(e, n, l) && !s[Wh(l)]) {
                  const n = new Ec([], {});
                  (n._sourceSegment = e),
                    (n._segmentIndexShift =
                      "legacy" === i ? e.segments.length : t.length),
                    (o[Wh(l)] = n);
                }
              return Object.assign({}, s, o);
            })(e, t, n, r, e.children, s)
          );
          return (
            (i._sourceSegment = e),
            (i._segmentIndexShift = t.length),
            { segmentGroup: i, slicedSegments: n }
          );
        }
        const i = new Ec(e.segments, e.children);
        return (
          (i._sourceSegment = e),
          (i._segmentIndexShift = t.length),
          { segmentGroup: i, slicedSegments: n }
        );
      }
      function qh(e, t, n) {
        return (
          (!(e.hasChildren() || t.length > 0) || "full" !== n.pathMatch) &&
          "" === n.path &&
          void 0 === n.redirectTo
        );
      }
      function Wh(e) {
        return e.outlet || "primary";
      }
      function Gh(e) {
        return e.data || {};
      }
      function Kh(e) {
        return e.resolve || {};
      }
      function Qh(e, t, n, r) {
        const s = Rh(e, t, r);
        return wc(s.resolve ? s.resolve(t, n) : s(t, n));
      }
      function Zh(e) {
        return function (t) {
          return t.pipe(
            Ta((t) => {
              const n = e(t);
              return n ? L(n).pipe(A(() => t)) : L([t]);
            })
          );
        };
      }
      class Xh {}
      class Jh {
        shouldDetach(e) {
          return !1;
        }
        store(e, t) {}
        shouldAttach(e) {
          return !1;
        }
        retrieve(e) {
          return null;
        }
        shouldReuseRoute(e, t) {
          return e.routeConfig === t.routeConfig;
        }
      }
      const Yh = new ve("ROUTES");
      class ed {
        constructor(e, t, n, r) {
          (this.loader = e),
            (this.compiler = t),
            (this.onLoadStartListener = n),
            (this.onLoadEndListener = r);
        }
        load(e, t) {
          return (
            this.onLoadStartListener && this.onLoadStartListener(t),
            this.loadModuleFactory(t.loadChildren).pipe(
              A((n) => {
                this.onLoadEndListener && this.onLoadEndListener(t);
                const r = n.create(e);
                return new dc(_c(r.injector.get(Yh)).map(mc), r);
              })
            )
          );
        }
        loadModuleFactory(e) {
          return "string" == typeof e
            ? L(this.loader.load(e))
            : wc(e()).pipe(
                H((e) =>
                  e instanceof Pe
                    ? Hl(e)
                    : L(this.compiler.compileModuleAsync(e))
                )
              );
        }
      }
      class td {}
      class nd {
        shouldProcessUrl(e) {
          return !0;
        }
        extract(e) {
          return e;
        }
        merge(e, t) {
          return e;
        }
      }
      function rd(e) {
        throw e;
      }
      function sd(e, t, n) {
        return t.parse("/");
      }
      function id(e, t) {
        return Hl(null);
      }
      class od {
        constructor(e, t, n, r, s, i, o, l) {
          (this.rootComponentType = e),
            (this.urlSerializer = t),
            (this.rootContexts = n),
            (this.location = r),
            (this.config = l),
            (this.lastSuccessfulNavigation = null),
            (this.currentNavigation = null),
            (this.navigationId = 0),
            (this.isNgZoneEnabled = !1),
            (this.events = new T()),
            (this.errorHandler = rd),
            (this.malformedUriErrorHandler = sd),
            (this.navigated = !1),
            (this.lastSuccessfulId = -1),
            (this.hooks = { beforePreactivation: id, afterPreactivation: id }),
            (this.urlHandlingStrategy = new nd()),
            (this.routeReuseStrategy = new Jh()),
            (this.onSameUrlNavigation = "ignore"),
            (this.paramsInheritanceStrategy = "emptyOnly"),
            (this.urlUpdateStrategy = "deferred"),
            (this.relativeLinkResolution = "legacy"),
            (this.ngModule = s.get(Ie)),
            (this.console = s.get(xs));
          const a = s.get(zs);
          (this.isNgZoneEnabled = a instanceof zs),
            this.resetConfig(l),
            (this.currentUrlTree = new Sc(new Ec([], {}), {}, null)),
            (this.rawUrlTree = this.currentUrlTree),
            (this.browserUrlTree = this.currentUrlTree),
            (this.configLoader = new ed(
              i,
              o,
              (e) => this.triggerEvent(new ec(e)),
              (e) => this.triggerEvent(new tc(e))
            )),
            (this.routerState = Qc(
              this.currentUrlTree,
              this.rootComponentType
            )),
            (this.transitions = new Bl({
              id: 0,
              currentUrlTree: this.currentUrlTree,
              currentRawUrl: this.currentUrlTree,
              extractedUrl: this.urlHandlingStrategy.extract(
                this.currentUrlTree
              ),
              urlAfterRedirects: this.urlHandlingStrategy.extract(
                this.currentUrlTree
              ),
              rawUrl: this.currentUrlTree,
              extras: {},
              resolve: null,
              reject: null,
              promise: Promise.resolve(!0),
              source: "imperative",
              restoredState: null,
              currentSnapshot: this.routerState.snapshot,
              targetSnapshot: null,
              currentRouterState: this.routerState,
              targetRouterState: null,
              guards: { canActivateChecks: [], canDeactivateChecks: [] },
              guardsResult: null,
            })),
            (this.navigations = this.setupNavigations(this.transitions)),
            this.processNavigations();
        }
        setupNavigations(e) {
          const t = this.events;
          return e.pipe(
            ta((e) => 0 !== e.id),
            A((e) =>
              Object.assign({}, e, {
                extractedUrl: this.urlHandlingStrategy.extract(e.rawUrl),
              })
            ),
            Ta((e) => {
              let n = !1,
                r = !1;
              return Hl(e).pipe(
                Oa((e) => {
                  this.currentNavigation = {
                    id: e.id,
                    initialUrl: e.currentRawUrl,
                    extractedUrl: e.extractedUrl,
                    trigger: e.source,
                    extras: e.extras,
                    previousNavigation: this.lastSuccessfulNavigation
                      ? Object.assign({}, this.lastSuccessfulNavigation, {
                          previousNavigation: null,
                        })
                      : null,
                  };
                }),
                Ta((e) => {
                  const n =
                    !this.navigated ||
                    e.extractedUrl.toString() !==
                      this.browserUrlTree.toString();
                  if (
                    ("reload" === this.onSameUrlNavigation || n) &&
                    this.urlHandlingStrategy.shouldProcessUrl(e.rawUrl)
                  )
                    return Hl(e).pipe(
                      Ta((e) => {
                        const n = this.transitions.getValue();
                        return (
                          t.next(
                            new qu(
                              e.id,
                              this.serializeUrl(e.extractedUrl),
                              e.source,
                              e.restoredState
                            )
                          ),
                          n !== this.transitions.getValue() ? Xl : [e]
                        );
                      }),
                      Ta((e) => Promise.resolve(e)),
                      ((r = this.ngModule.injector),
                      (s = this.configLoader),
                      (i = this.urlSerializer),
                      (o = this.config),
                      function (e) {
                        return e.pipe(
                          Ta((e) =>
                            (function (e, t, n, r, s) {
                              return new Eh(e, t, n, r, s).apply();
                            })(r, s, i, e.extractedUrl, o).pipe(
                              A((t) =>
                                Object.assign({}, e, { urlAfterRedirects: t })
                              )
                            )
                          )
                        );
                      }),
                      Oa((e) => {
                        this.currentNavigation = Object.assign(
                          {},
                          this.currentNavigation,
                          { finalUrl: e.urlAfterRedirects }
                        );
                      }),
                      (function (e, t, n, r, s) {
                        return function (i) {
                          return i.pipe(
                            H((i) =>
                              (function (
                                e,
                                t,
                                n,
                                r,
                                s = "emptyOnly",
                                i = "legacy"
                              ) {
                                return new $h(e, t, n, r, s, i).recognize();
                              })(
                                e,
                                t,
                                i.urlAfterRedirects,
                                n(i.urlAfterRedirects),
                                r,
                                s
                              ).pipe(
                                A((e) =>
                                  Object.assign({}, i, { targetSnapshot: e })
                                )
                              )
                            )
                          );
                        };
                      })(
                        this.rootComponentType,
                        this.config,
                        (e) => this.serializeUrl(e),
                        this.paramsInheritanceStrategy,
                        this.relativeLinkResolution
                      ),
                      Oa((e) => {
                        "eager" === this.urlUpdateStrategy &&
                          (e.extras.skipLocationChange ||
                            this.setBrowserUrl(
                              e.urlAfterRedirects,
                              !!e.extras.replaceUrl,
                              e.id,
                              e.extras.state
                            ),
                          (this.browserUrlTree = e.urlAfterRedirects));
                      }),
                      Oa((e) => {
                        const n = new Qu(
                          e.id,
                          this.serializeUrl(e.extractedUrl),
                          this.serializeUrl(e.urlAfterRedirects),
                          e.targetSnapshot
                        );
                        t.next(n);
                      })
                    );
                  var r, s, i, o;
                  if (
                    n &&
                    this.rawUrlTree &&
                    this.urlHandlingStrategy.shouldProcessUrl(this.rawUrlTree)
                  ) {
                    const {
                        id: n,
                        extractedUrl: r,
                        source: s,
                        restoredState: i,
                        extras: o,
                      } = e,
                      l = new qu(n, this.serializeUrl(r), s, i);
                    t.next(l);
                    const a = Qc(r, this.rootComponentType).snapshot;
                    return Hl(
                      Object.assign({}, e, {
                        targetSnapshot: a,
                        urlAfterRedirects: r,
                        extras: Object.assign({}, o, {
                          skipLocationChange: !1,
                          replaceUrl: !1,
                        }),
                      })
                    );
                  }
                  return (
                    (this.rawUrlTree = e.rawUrl),
                    (this.browserUrlTree = e.urlAfterRedirects),
                    e.resolve(null),
                    Xl
                  );
                }),
                Zh((e) => {
                  const {
                    targetSnapshot: t,
                    id: n,
                    extractedUrl: r,
                    rawUrl: s,
                    extras: { skipLocationChange: i, replaceUrl: o },
                  } = e;
                  return this.hooks.beforePreactivation(t, {
                    navigationId: n,
                    appliedUrlTree: r,
                    rawUrlTree: s,
                    skipLocationChange: !!i,
                    replaceUrl: !!o,
                  });
                }),
                Oa((e) => {
                  const t = new Zu(
                    e.id,
                    this.serializeUrl(e.extractedUrl),
                    this.serializeUrl(e.urlAfterRedirects),
                    e.targetSnapshot
                  );
                  this.triggerEvent(t);
                }),
                A((e) =>
                  Object.assign({}, e, {
                    guards: Nh(
                      e.targetSnapshot,
                      e.currentSnapshot,
                      this.rootContexts
                    ),
                  })
                ),
                (function (e, t) {
                  return function (n) {
                    return n.pipe(
                      H((n) => {
                        const {
                          targetSnapshot: r,
                          currentSnapshot: s,
                          guards: {
                            canActivateChecks: i,
                            canDeactivateChecks: o,
                          },
                        } = n;
                        return 0 === o.length && 0 === i.length
                          ? Hl(Object.assign({}, n, { guardsResult: !0 }))
                          : (function (e, t, n, r) {
                              return L(e).pipe(
                                H((e) =>
                                  (function (e, t, n, r, s) {
                                    const i =
                                      t && t.routeConfig
                                        ? t.routeConfig.canDeactivate
                                        : null;
                                    return i && 0 !== i.length
                                      ? Hl(
                                          i.map((i) => {
                                            const o = Rh(i, t, s);
                                            let l;
                                            if (
                                              (function (e) {
                                                return e && yh(e.canDeactivate);
                                              })(o)
                                            )
                                              l = wc(
                                                o.canDeactivate(e, t, n, r)
                                              );
                                            else {
                                              if (!yh(o))
                                                throw new Error(
                                                  "Invalid CanDeactivate guard"
                                                );
                                              l = wc(o(e, t, n, r));
                                            }
                                            return l.pipe(Ca());
                                          })
                                        ).pipe(Mh())
                                      : Hl(!0);
                                  })(e.component, e.route, n, t, r)
                                ),
                                Ca((e) => !0 !== e, !0)
                              );
                            })(o, r, s, e).pipe(
                              H((n) =>
                                n && "boolean" == typeof n
                                  ? (function (e, t, n, r) {
                                      return L(t).pipe(
                                        Ra((t) =>
                                          L([
                                            Vh(t.route.parent, r),
                                            Fh(t.route, r),
                                            Uh(e, t.path, n),
                                            Lh(e, t.route, n),
                                          ]).pipe(
                                            ea(),
                                            Ca((e) => !0 !== e, !0)
                                          )
                                        ),
                                        Ca((e) => !0 !== e, !0)
                                      );
                                    })(r, i, e, t)
                                  : Hl(n)
                              ),
                              A((e) =>
                                Object.assign({}, n, { guardsResult: e })
                              )
                            );
                      })
                    );
                  };
                })(this.ngModule.injector, (e) => this.triggerEvent(e)),
                Oa((e) => {
                  if (_h(e.guardsResult)) {
                    const t = cc(
                      `Redirecting to "${this.serializeUrl(e.guardsResult)}"`
                    );
                    throw ((t.url = e.guardsResult), t);
                  }
                }),
                Oa((e) => {
                  const t = new Xu(
                    e.id,
                    this.serializeUrl(e.extractedUrl),
                    this.serializeUrl(e.urlAfterRedirects),
                    e.targetSnapshot,
                    !!e.guardsResult
                  );
                  this.triggerEvent(t);
                }),
                ta((e) => {
                  if (!e.guardsResult) {
                    this.resetUrlToCurrentUrlTree();
                    const n = new Gu(
                      e.id,
                      this.serializeUrl(e.extractedUrl),
                      ""
                    );
                    return t.next(n), e.resolve(!1), !1;
                  }
                  return !0;
                }),
                Zh((e) => {
                  if (e.guards.canActivateChecks.length)
                    return Hl(e).pipe(
                      Oa((e) => {
                        const t = new Ju(
                          e.id,
                          this.serializeUrl(e.extractedUrl),
                          this.serializeUrl(e.urlAfterRedirects),
                          e.targetSnapshot
                        );
                        this.triggerEvent(t);
                      }),
                      ((t = this.paramsInheritanceStrategy),
                      (n = this.ngModule.injector),
                      function (e) {
                        return e.pipe(
                          H((e) => {
                            const {
                              targetSnapshot: r,
                              guards: { canActivateChecks: s },
                            } = e;
                            return s.length
                              ? L(s).pipe(
                                  Ra((e) =>
                                    (function (e, t, n, r) {
                                      return (function (e, t, n, r) {
                                        const s = Object.keys(e);
                                        if (0 === s.length) return Hl({});
                                        if (1 === s.length) {
                                          const i = s[0];
                                          return Qh(e[i], t, n, r).pipe(
                                            A((e) => ({ [i]: e }))
                                          );
                                        }
                                        const i = {};
                                        return L(s)
                                          .pipe(
                                            H((s) =>
                                              Qh(e[s], t, n, r).pipe(
                                                A((e) => ((i[s] = e), e))
                                              )
                                            )
                                          )
                                          .pipe(
                                            ga(),
                                            A(() => i)
                                          );
                                      })(e._resolve, e, t, r).pipe(
                                        A(
                                          (t) => (
                                            (e._resolvedData = t),
                                            (e.data = Object.assign(
                                              {},
                                              e.data,
                                              Xc(e, n).resolve
                                            )),
                                            null
                                          )
                                        )
                                      );
                                    })(e.route, r, t, n)
                                  ),
                                  (function (e, t) {
                                    return arguments.length >= 2
                                      ? function (n) {
                                          return _(Ia(e, t), ia(1), da(t))(n);
                                        }
                                      : function (t) {
                                          return _(
                                            Ia((t, n, r) => e(t, n, r + 1)),
                                            ia(1)
                                          )(t);
                                        };
                                  })((e, t) => e),
                                  A((t) => e)
                                )
                              : Hl(e);
                          })
                        );
                      }),
                      Oa((e) => {
                        const t = new Yu(
                          e.id,
                          this.serializeUrl(e.extractedUrl),
                          this.serializeUrl(e.urlAfterRedirects),
                          e.targetSnapshot
                        );
                        this.triggerEvent(t);
                      })
                    );
                  var t, n;
                }),
                Zh((e) => {
                  const {
                    targetSnapshot: t,
                    id: n,
                    extractedUrl: r,
                    rawUrl: s,
                    extras: { skipLocationChange: i, replaceUrl: o },
                  } = e;
                  return this.hooks.afterPreactivation(t, {
                    navigationId: n,
                    appliedUrlTree: r,
                    rawUrlTree: s,
                    skipLocationChange: !!i,
                    replaceUrl: !!o,
                  });
                }),
                A((e) => {
                  const t = (function (e, t, n) {
                    const r = (function e(t, n, r) {
                      if (r && t.shouldReuseRoute(n.value, r.value.snapshot)) {
                        const s = r.value;
                        s._futureSnapshot = n.value;
                        const i = (function (t, n, r) {
                          return n.children.map((n) => {
                            for (const s of r.children)
                              if (t.shouldReuseRoute(s.value.snapshot, n.value))
                                return e(t, n, s);
                            return e(t, n);
                          });
                        })(t, n, r);
                        return new Wc(s, i);
                      }
                      {
                        const r = t.retrieve(n.value);
                        if (r) {
                          const e = r.route;
                          return (
                            (function e(t, n) {
                              if (t.value.routeConfig !== n.value.routeConfig)
                                throw new Error(
                                  "Cannot reattach ActivatedRouteSnapshot created from a different route"
                                );
                              if (t.children.length !== n.children.length)
                                throw new Error(
                                  "Cannot reattach ActivatedRouteSnapshot with a different number of children"
                                );
                              n.value._futureSnapshot = t.value;
                              for (let r = 0; r < t.children.length; ++r)
                                e(t.children[r], n.children[r]);
                            })(n, e),
                            e
                          );
                        }
                        {
                          const r = new Zc(
                              new Bl((s = n.value).url),
                              new Bl(s.params),
                              new Bl(s.queryParams),
                              new Bl(s.fragment),
                              new Bl(s.data),
                              s.outlet,
                              s.component,
                              s
                            ),
                            i = n.children.map((n) => e(t, n));
                          return new Wc(r, i);
                        }
                      }
                      var s;
                    })(e, t._root, n ? n._root : void 0);
                    return new Kc(r, t);
                  })(
                    this.routeReuseStrategy,
                    e.targetSnapshot,
                    e.currentRouterState
                  );
                  return Object.assign({}, e, { targetRouterState: t });
                }),
                Oa((e) => {
                  (this.currentUrlTree = e.urlAfterRedirects),
                    (this.rawUrlTree = this.urlHandlingStrategy.merge(
                      this.currentUrlTree,
                      e.rawUrl
                    )),
                    (this.routerState = e.targetRouterState),
                    "deferred" === this.urlUpdateStrategy &&
                      (e.extras.skipLocationChange ||
                        this.setBrowserUrl(
                          this.rawUrlTree,
                          !!e.extras.replaceUrl,
                          e.id,
                          e.extras.state
                        ),
                      (this.browserUrlTree = e.urlAfterRedirects));
                }),
                ((i = this.rootContexts),
                (o = this.routeReuseStrategy),
                (l = (e) => this.triggerEvent(e)),
                A(
                  (e) => (
                    new gh(
                      o,
                      e.targetRouterState,
                      e.currentRouterState,
                      l
                    ).activate(i),
                    e
                  )
                )),
                Oa({
                  next() {
                    n = !0;
                  },
                  complete() {
                    n = !0;
                  },
                }),
                ((s = () => {
                  if (!n && !r) {
                    this.resetUrlToCurrentUrlTree();
                    const n = new Gu(
                      e.id,
                      this.serializeUrl(e.extractedUrl),
                      `Navigation ID ${e.id} is not equal to the current navigation id ${this.navigationId}`
                    );
                    t.next(n), e.resolve(!1);
                  }
                  this.currentNavigation = null;
                }),
                (e) => e.lift(new Va(s))),
                ma((n) => {
                  if (((r = !0), (s = n) && s.ngNavigationCancelingError)) {
                    const r = _h(n.url);
                    r ||
                      ((this.navigated = !0),
                      this.resetStateAndUrl(
                        e.currentRouterState,
                        e.currentUrlTree,
                        e.rawUrl
                      ));
                    const s = new Gu(
                      e.id,
                      this.serializeUrl(e.extractedUrl),
                      n.message
                    );
                    t.next(s), e.resolve(!1), r && this.navigateByUrl(n.url);
                  } else {
                    this.resetStateAndUrl(
                      e.currentRouterState,
                      e.currentUrlTree,
                      e.rawUrl
                    );
                    const r = new Ku(
                      e.id,
                      this.serializeUrl(e.extractedUrl),
                      n
                    );
                    t.next(r);
                    try {
                      e.resolve(this.errorHandler(n));
                    } catch (i) {
                      e.reject(i);
                    }
                  }
                  var s;
                  return Xl;
                })
              );
              var s, i, o, l;
            })
          );
        }
        resetRootComponentType(e) {
          (this.rootComponentType = e),
            (this.routerState.root.component = this.rootComponentType);
        }
        getTransition() {
          const e = this.transitions.value;
          return (e.urlAfterRedirects = this.browserUrlTree), e;
        }
        setTransition(e) {
          this.transitions.next(Object.assign({}, this.getTransition(), e));
        }
        initialNavigation() {
          this.setUpLocationChangeListener(),
            0 === this.navigationId &&
              this.navigateByUrl(this.location.path(!0), { replaceUrl: !0 });
        }
        setUpLocationChangeListener() {
          this.locationSubscription ||
            (this.locationSubscription = this.location.subscribe((e) => {
              let t = this.parseUrl(e.url);
              const n = "popstate" === e.type ? "popstate" : "hashchange",
                r = e.state && e.state.navigationId ? e.state : null;
              setTimeout(() => {
                this.scheduleNavigation(t, n, r, { replaceUrl: !0 });
              }, 0);
            }));
        }
        get url() {
          return this.serializeUrl(this.currentUrlTree);
        }
        getCurrentNavigation() {
          return this.currentNavigation;
        }
        triggerEvent(e) {
          this.events.next(e);
        }
        resetConfig(e) {
          pc(e),
            (this.config = e.map(mc)),
            (this.navigated = !1),
            (this.lastSuccessfulId = -1);
        }
        ngOnDestroy() {
          this.dispose();
        }
        dispose() {
          this.locationSubscription &&
            (this.locationSubscription.unsubscribe(),
            (this.locationSubscription = null));
        }
        createUrlTree(e, t = {}) {
          const {
            relativeTo: n,
            queryParams: r,
            fragment: s,
            preserveQueryParams: i,
            queryParamsHandling: o,
            preserveFragment: l,
          } = t;
          $e() &&
            i &&
            console &&
            console.warn &&
            console.warn(
              "preserveQueryParams is deprecated, use queryParamsHandling instead."
            );
          const a = n || this.routerState.root,
            u = l ? this.currentUrlTree.fragment : s;
          let c = null;
          if (o)
            switch (o) {
              case "merge":
                c = Object.assign({}, this.currentUrlTree.queryParams, r);
                break;
              case "preserve":
                c = this.currentUrlTree.queryParams;
                break;
              default:
                c = r || null;
            }
          else c = i ? this.currentUrlTree.queryParams : r || null;
          return (
            null !== c && (c = this.removeEmptyProps(c)),
            (function (e, t, n, r, s) {
              if (0 === n.length) return ih(t.root, t.root, t, r, s);
              const i = (function (e) {
                if ("string" == typeof e[0] && 1 === e.length && "/" === e[0])
                  return new oh(!0, 0, e);
                let t = 0,
                  n = !1;
                const r = e.reduce((e, r, s) => {
                  if ("object" == typeof r && null != r) {
                    if (r.outlets) {
                      const t = {};
                      return (
                        bc(r.outlets, (e, n) => {
                          t[n] = "string" == typeof e ? e.split("/") : e;
                        }),
                        [...e, { outlets: t }]
                      );
                    }
                    if (r.segmentPath) return [...e, r.segmentPath];
                  }
                  return "string" != typeof r
                    ? [...e, r]
                    : 0 === s
                    ? (r.split("/").forEach((r, s) => {
                        (0 == s && "." === r) ||
                          (0 == s && "" === r
                            ? (n = !0)
                            : ".." === r
                            ? t++
                            : "" != r && e.push(r));
                      }),
                      e)
                    : [...e, r];
                }, []);
                return new oh(n, t, r);
              })(n);
              if (i.toRoot()) return ih(t.root, new Ec([], {}), t, r, s);
              const o = (function (e, t, n) {
                  if (e.isAbsolute) return new lh(t.root, !0, 0);
                  if (-1 === n.snapshot._lastPathIndex)
                    return new lh(n.snapshot._urlSegment, !0, 0);
                  const r = sh(e.commands[0]) ? 0 : 1;
                  return (function (e, t, n) {
                    let r = e,
                      s = t,
                      i = n;
                    for (; i > s; ) {
                      if (((i -= s), (r = r.parent), !r))
                        throw new Error("Invalid number of '../'");
                      s = r.segments.length;
                    }
                    return new lh(r, !1, s - i);
                  })(
                    n.snapshot._urlSegment,
                    n.snapshot._lastPathIndex + r,
                    e.numberOfDoubleDots
                  );
                })(i, t, e),
                l = o.processChildren
                  ? ch(o.segmentGroup, o.index, i.commands)
                  : uh(o.segmentGroup, o.index, i.commands);
              return ih(o.segmentGroup, l, t, r, s);
            })(a, this.currentUrlTree, e, c, u)
          );
        }
        navigateByUrl(e, t = { skipLocationChange: !1 }) {
          $e() &&
            this.isNgZoneEnabled &&
            !zs.isInAngularZone() &&
            this.console.warn(
              "Navigation triggered outside Angular zone, did you forget to call 'ngZone.run()'?"
            );
          const n = _h(e) ? e : this.parseUrl(e),
            r = this.urlHandlingStrategy.merge(n, this.rawUrlTree);
          return this.scheduleNavigation(r, "imperative", null, t);
        }
        navigate(e, t = { skipLocationChange: !1 }) {
          return (
            (function (e) {
              for (let t = 0; t < e.length; t++) {
                const n = e[t];
                if (null == n)
                  throw new Error(
                    `The requested path contains ${n} segment at index ${t}`
                  );
              }
            })(e),
            this.navigateByUrl(this.createUrlTree(e, t), t)
          );
        }
        serializeUrl(e) {
          return this.urlSerializer.serialize(e);
        }
        parseUrl(e) {
          let t;
          try {
            t = this.urlSerializer.parse(e);
          } catch (n) {
            t = this.malformedUriErrorHandler(n, this.urlSerializer, e);
          }
          return t;
        }
        isActive(e, t) {
          if (_h(e)) return Cc(this.currentUrlTree, e, t);
          const n = this.parseUrl(e);
          return Cc(this.currentUrlTree, n, t);
        }
        removeEmptyProps(e) {
          return Object.keys(e).reduce((t, n) => {
            const r = e[n];
            return null != r && (t[n] = r), t;
          }, {});
        }
        processNavigations() {
          this.navigations.subscribe(
            (e) => {
              (this.navigated = !0),
                (this.lastSuccessfulId = e.id),
                this.events.next(
                  new Wu(
                    e.id,
                    this.serializeUrl(e.extractedUrl),
                    this.serializeUrl(this.currentUrlTree)
                  )
                ),
                (this.lastSuccessfulNavigation = this.currentNavigation),
                (this.currentNavigation = null),
                e.resolve(!0);
            },
            (e) => {
              this.console.warn("Unhandled Navigation Error: ");
            }
          );
        }
        scheduleNavigation(e, t, n, r) {
          const s = this.getTransition();
          if (
            s &&
            "imperative" !== t &&
            "imperative" === s.source &&
            s.rawUrl.toString() === e.toString()
          )
            return Promise.resolve(!0);
          if (
            s &&
            "hashchange" == t &&
            "popstate" === s.source &&
            s.rawUrl.toString() === e.toString()
          )
            return Promise.resolve(!0);
          if (
            s &&
            "popstate" == t &&
            "hashchange" === s.source &&
            s.rawUrl.toString() === e.toString()
          )
            return Promise.resolve(!0);
          let i = null,
            o = null;
          const l = new Promise((e, t) => {
              (i = e), (o = t);
            }),
            a = ++this.navigationId;
          return (
            this.setTransition({
              id: a,
              source: t,
              restoredState: n,
              currentUrlTree: this.currentUrlTree,
              currentRawUrl: this.rawUrlTree,
              rawUrl: e,
              extras: r,
              resolve: i,
              reject: o,
              promise: l,
              currentSnapshot: this.routerState.snapshot,
              currentRouterState: this.routerState,
            }),
            l.catch((e) => Promise.reject(e))
          );
        }
        setBrowserUrl(e, t, n, r) {
          const s = this.urlSerializer.serialize(e);
          (r = r || {}),
            this.location.isCurrentPathEqualTo(s) || t
              ? this.location.replaceState(
                  s,
                  "",
                  Object.assign({}, r, { navigationId: n })
                )
              : this.location.go(
                  s,
                  "",
                  Object.assign({}, r, { navigationId: n })
                );
        }
        resetStateAndUrl(e, t, n) {
          (this.routerState = e),
            (this.currentUrlTree = t),
            (this.rawUrlTree = this.urlHandlingStrategy.merge(
              this.currentUrlTree,
              n
            )),
            this.resetUrlToCurrentUrlTree();
        }
        resetUrlToCurrentUrlTree() {
          this.location.replaceState(
            this.urlSerializer.serialize(this.rawUrlTree),
            "",
            { navigationId: this.lastSuccessfulId }
          );
        }
      }
      class ld {
        constructor(e, t, n, r, s) {
          (this.router = e),
            (this.route = t),
            (this.commands = []),
            null == n && r.setAttribute(s.nativeElement, "tabindex", "0");
        }
        set routerLink(e) {
          this.commands = null != e ? (Array.isArray(e) ? e : [e]) : [];
        }
        set preserveQueryParams(e) {
          $e() &&
            console &&
            console.warn &&
            console.warn(
              "preserveQueryParams is deprecated!, use queryParamsHandling instead."
            ),
            (this.preserve = e);
        }
        onClick() {
          const e = {
            skipLocationChange: ud(this.skipLocationChange),
            replaceUrl: ud(this.replaceUrl),
          };
          return this.router.navigateByUrl(this.urlTree, e), !0;
        }
        get urlTree() {
          return this.router.createUrlTree(this.commands, {
            relativeTo: this.route,
            queryParams: this.queryParams,
            fragment: this.fragment,
            preserveQueryParams: ud(this.preserve),
            queryParamsHandling: this.queryParamsHandling,
            preserveFragment: ud(this.preserveFragment),
          });
        }
      }
      class ad {
        constructor(e, t, n) {
          (this.router = e),
            (this.route = t),
            (this.locationStrategy = n),
            (this.commands = []),
            (this.subscription = e.events.subscribe((e) => {
              e instanceof Wu && this.updateTargetUrlAndHref();
            }));
        }
        set routerLink(e) {
          this.commands = null != e ? (Array.isArray(e) ? e : [e]) : [];
        }
        set preserveQueryParams(e) {
          $e() &&
            console &&
            console.warn &&
            console.warn(
              "preserveQueryParams is deprecated, use queryParamsHandling instead."
            ),
            (this.preserve = e);
        }
        ngOnChanges(e) {
          this.updateTargetUrlAndHref();
        }
        ngOnDestroy() {
          this.subscription.unsubscribe();
        }
        onClick(e, t, n, r) {
          if (0 !== e || t || n || r) return !0;
          if ("string" == typeof this.target && "_self" != this.target)
            return !0;
          const s = {
            skipLocationChange: ud(this.skipLocationChange),
            replaceUrl: ud(this.replaceUrl),
            state: this.state,
          };
          return this.router.navigateByUrl(this.urlTree, s), !1;
        }
        updateTargetUrlAndHref() {
          this.href = this.locationStrategy.prepareExternalUrl(
            this.router.serializeUrl(this.urlTree)
          );
        }
        get urlTree() {
          return this.router.createUrlTree(this.commands, {
            relativeTo: this.route,
            queryParams: this.queryParams,
            fragment: this.fragment,
            preserveQueryParams: ud(this.preserve),
            queryParamsHandling: this.queryParamsHandling,
            preserveFragment: ud(this.preserveFragment),
          });
        }
      }
      function ud(e) {
        return "" === e || !!e;
      }
      class cd {
        constructor(e, t, n, r, s) {
          (this.router = e),
            (this.element = t),
            (this.renderer = n),
            (this.link = r),
            (this.linkWithHref = s),
            (this.classes = []),
            (this.isActive = !1),
            (this.routerLinkActiveOptions = { exact: !1 }),
            (this.subscription = e.events.subscribe((e) => {
              e instanceof Wu && this.update();
            }));
        }
        ngAfterContentInit() {
          this.links.changes.subscribe((e) => this.update()),
            this.linksWithHrefs.changes.subscribe((e) => this.update()),
            this.update();
        }
        set routerLinkActive(e) {
          const t = Array.isArray(e) ? e : e.split(" ");
          this.classes = t.filter((e) => !!e);
        }
        ngOnChanges(e) {
          this.update();
        }
        ngOnDestroy() {
          this.subscription.unsubscribe();
        }
        update() {
          this.links &&
            this.linksWithHrefs &&
            this.router.navigated &&
            Promise.resolve().then(() => {
              const e = this.hasActiveLinks();
              this.isActive !== e &&
                ((this.isActive = e),
                this.classes.forEach((t) => {
                  e
                    ? this.renderer.addClass(this.element.nativeElement, t)
                    : this.renderer.removeClass(this.element.nativeElement, t);
                }));
            });
        }
        isLinkActive(e) {
          return (t) =>
            e.isActive(t.urlTree, this.routerLinkActiveOptions.exact);
        }
        hasActiveLinks() {
          const e = this.isLinkActive(this.router);
          return (
            (this.link && e(this.link)) ||
            (this.linkWithHref && e(this.linkWithHref)) ||
            this.links.some(e) ||
            this.linksWithHrefs.some(e)
          );
        }
      }
      class hd {
        constructor() {
          (this.outlet = null),
            (this.route = null),
            (this.resolver = null),
            (this.children = new dd()),
            (this.attachRef = null);
        }
      }
      class dd {
        constructor() {
          this.contexts = new Map();
        }
        onChildOutletCreated(e, t) {
          const n = this.getOrCreateContext(e);
          (n.outlet = t), this.contexts.set(e, n);
        }
        onChildOutletDestroyed(e) {
          const t = this.getContext(e);
          t && (t.outlet = null);
        }
        onOutletDeactivated() {
          const e = this.contexts;
          return (this.contexts = new Map()), e;
        }
        onOutletReAttached(e) {
          this.contexts = e;
        }
        getOrCreateContext(e) {
          let t = this.getContext(e);
          return t || ((t = new hd()), this.contexts.set(e, t)), t;
        }
        getContext(e) {
          return this.contexts.get(e) || null;
        }
      }
      class pd {
        constructor(e, t, n, r, s) {
          (this.parentContexts = e),
            (this.location = t),
            (this.resolver = n),
            (this.changeDetector = s),
            (this.activated = null),
            (this._activatedRoute = null),
            (this.activateEvents = new gs()),
            (this.deactivateEvents = new gs()),
            (this.name = r || "primary"),
            e.onChildOutletCreated(this.name, this);
        }
        ngOnDestroy() {
          this.parentContexts.onChildOutletDestroyed(this.name);
        }
        ngOnInit() {
          if (!this.activated) {
            const e = this.parentContexts.getContext(this.name);
            e &&
              e.route &&
              (e.attachRef
                ? this.attach(e.attachRef, e.route)
                : this.activateWith(e.route, e.resolver || null));
          }
        }
        get isActivated() {
          return !!this.activated;
        }
        get component() {
          if (!this.activated) throw new Error("Outlet is not activated");
          return this.activated.instance;
        }
        get activatedRoute() {
          if (!this.activated) throw new Error("Outlet is not activated");
          return this._activatedRoute;
        }
        get activatedRouteData() {
          return this._activatedRoute ? this._activatedRoute.snapshot.data : {};
        }
        detach() {
          if (!this.activated) throw new Error("Outlet is not activated");
          this.location.detach();
          const e = this.activated;
          return (this.activated = null), (this._activatedRoute = null), e;
        }
        attach(e, t) {
          (this.activated = e),
            (this._activatedRoute = t),
            this.location.insert(e.hostView);
        }
        deactivate() {
          if (this.activated) {
            const e = this.component;
            this.activated.destroy(),
              (this.activated = null),
              (this._activatedRoute = null),
              this.deactivateEvents.emit(e);
          }
        }
        activateWith(e, t) {
          if (this.isActivated)
            throw new Error("Cannot activate an already activated outlet");
          this._activatedRoute = e;
          const n = (t = t || this.resolver).resolveComponentFactory(
              e._futureSnapshot.routeConfig.component
            ),
            r = this.parentContexts.getOrCreateContext(this.name).children,
            s = new fd(e, r, this.location.injector);
          (this.activated = this.location.createComponent(
            n,
            this.location.length,
            s
          )),
            this.changeDetector.markForCheck(),
            this.activateEvents.emit(this.activated.instance);
        }
      }
      class fd {
        constructor(e, t, n) {
          (this.route = e), (this.childContexts = t), (this.parent = n);
        }
        get(e, t) {
          return e === Zc
            ? this.route
            : e === dd
            ? this.childContexts
            : this.parent.get(e, t);
        }
      }
      class gd {}
      class md {
        preload(e, t) {
          return t().pipe(ma(() => Hl(null)));
        }
      }
      class yd {
        preload(e, t) {
          return Hl(null);
        }
      }
      class _d {
        constructor(e, t, n, r, s) {
          (this.router = e),
            (this.injector = r),
            (this.preloadingStrategy = s),
            (this.loader = new ed(
              t,
              n,
              (t) => e.triggerEvent(new ec(t)),
              (t) => e.triggerEvent(new tc(t))
            ));
        }
        setUpPreloading() {
          this.subscription = this.router.events
            .pipe(
              ta((e) => e instanceof Wu),
              Ra(() => this.preload())
            )
            .subscribe(() => {});
        }
        preload() {
          const e = this.injector.get(Ie);
          return this.processRoutes(e, this.router.config);
        }
        ngOnDestroy() {
          this.subscription.unsubscribe();
        }
        processRoutes(e, t) {
          const n = [];
          for (const r of t)
            if (r.loadChildren && !r.canLoad && r._loadedConfig) {
              const e = r._loadedConfig;
              n.push(this.processRoutes(e.module, e.routes));
            } else
              r.loadChildren && !r.canLoad
                ? n.push(this.preloadConfig(e, r))
                : r.children && n.push(this.processRoutes(e, r.children));
          return L(n).pipe(
            q(),
            A((e) => {})
          );
        }
        preloadConfig(e, t) {
          return this.preloadingStrategy.preload(t, () =>
            this.loader
              .load(e.injector, t)
              .pipe(
                H(
                  (e) => (
                    (t._loadedConfig = e),
                    this.processRoutes(e.module, e.routes)
                  )
                )
              )
          );
        }
      }
      class vd {
        constructor(e, t, n = {}) {
          (this.router = e),
            (this.viewportScroller = t),
            (this.options = n),
            (this.lastId = 0),
            (this.lastSource = "imperative"),
            (this.restoredId = 0),
            (this.store = {}),
            (n.scrollPositionRestoration =
              n.scrollPositionRestoration || "disabled"),
            (n.anchorScrolling = n.anchorScrolling || "disabled");
        }
        init() {
          "disabled" !== this.options.scrollPositionRestoration &&
            this.viewportScroller.setHistoryScrollRestoration("manual"),
            (this.routerEventsSubscription = this.createScrollEvents()),
            (this.scrollEventsSubscription = this.consumeScrollEvents());
        }
        createScrollEvents() {
          return this.router.events.subscribe((e) => {
            e instanceof qu
              ? ((this.store[this.lastId] =
                  this.viewportScroller.getScrollPosition()),
                (this.lastSource = e.navigationTrigger),
                (this.restoredId = e.restoredState
                  ? e.restoredState.navigationId
                  : 0))
              : e instanceof Wu &&
                ((this.lastId = e.id),
                this.scheduleScrollEvent(
                  e,
                  this.router.parseUrl(e.urlAfterRedirects).fragment
                ));
          });
        }
        consumeScrollEvents() {
          return this.router.events.subscribe((e) => {
            e instanceof oc &&
              (e.position
                ? "top" === this.options.scrollPositionRestoration
                  ? this.viewportScroller.scrollToPosition([0, 0])
                  : "enabled" === this.options.scrollPositionRestoration &&
                    this.viewportScroller.scrollToPosition(e.position)
                : e.anchor && "enabled" === this.options.anchorScrolling
                ? this.viewportScroller.scrollToAnchor(e.anchor)
                : "disabled" !== this.options.scrollPositionRestoration &&
                  this.viewportScroller.scrollToPosition([0, 0]));
          });
        }
        scheduleScrollEvent(e, t) {
          this.router.triggerEvent(
            new oc(
              e,
              "popstate" === this.lastSource
                ? this.store[this.restoredId]
                : null,
              t
            )
          );
        }
        ngOnDestroy() {
          this.routerEventsSubscription &&
            this.routerEventsSubscription.unsubscribe(),
            this.scrollEventsSubscription &&
              this.scrollEventsSubscription.unsubscribe();
        }
      }
      const bd = new ve("ROUTER_CONFIGURATION"),
        wd = new ve("ROUTER_FORROOT_GUARD"),
        Cd = [
          il,
          { provide: Ac, useClass: Ic },
          {
            provide: od,
            useFactory: Id,
            deps: [
              ai,
              Ac,
              dd,
              il,
              vt,
              ci,
              Ds,
              Yh,
              bd,
              [td, new ne()],
              [Xh, new ne()],
            ],
          },
          dd,
          { provide: Zc, useFactory: Pd, deps: [od] },
          { provide: ci, useClass: pi },
          _d,
          yd,
          md,
          { provide: bd, useValue: { enableTracing: !1 } },
        ];
      function Sd() {
        return new ri("Router", od);
      }
      class Ed {
        constructor(e, t) {}
        static forRoot(e, t) {
          return {
            ngModule: Ed,
            providers: [
              Cd,
              Ad(e),
              { provide: wd, useFactory: kd, deps: [[od, new ne(), new se()]] },
              { provide: bd, useValue: t || {} },
              {
                provide: rl,
                useFactory: xd,
                deps: [tl, [new te(sl), new ne()], bd],
              },
              { provide: vd, useFactory: Td, deps: [od, jl, bd] },
              {
                provide: gd,
                useExisting:
                  t && t.preloadingStrategy ? t.preloadingStrategy : yd,
              },
              { provide: ri, multi: !0, useFactory: Sd },
              [
                Nd,
                { provide: _s, multi: !0, useFactory: Rd, deps: [Nd] },
                { provide: Od, useFactory: Dd, deps: [Nd] },
                { provide: Ts, multi: !0, useExisting: Od },
              ],
            ],
          };
        }
        static forChild(e) {
          return { ngModule: Ed, providers: [Ad(e)] };
        }
      }
      function Td(e, t, n) {
        return n.scrollOffset && t.setOffset(n.scrollOffset), new vd(e, t, n);
      }
      function xd(e, t, n = {}) {
        return n.useHash ? new ll(e, t) : new al(e, t);
      }
      function kd(e) {
        if (e)
          throw new Error(
            "RouterModule.forRoot() called twice. Lazy loaded modules should use RouterModule.forChild() instead."
          );
        return "guarded";
      }
      function Ad(e) {
        return [
          { provide: kt, multi: !0, useValue: e },
          { provide: Yh, multi: !0, useValue: e },
        ];
      }
      function Id(e, t, n, r, s, i, o, l, a = {}, u, c) {
        const h = new od(null, t, n, r, s, i, o, _c(l));
        if (
          (u && (h.urlHandlingStrategy = u),
          c && (h.routeReuseStrategy = c),
          a.errorHandler && (h.errorHandler = a.errorHandler),
          a.malformedUriErrorHandler &&
            (h.malformedUriErrorHandler = a.malformedUriErrorHandler),
          a.enableTracing)
        ) {
          const e = ja();
          h.events.subscribe((t) => {
            e.logGroup("Router Event: " + t.constructor.name),
              e.log(t.toString()),
              e.log(t),
              e.logGroupEnd();
          });
        }
        return (
          a.onSameUrlNavigation &&
            (h.onSameUrlNavigation = a.onSameUrlNavigation),
          a.paramsInheritanceStrategy &&
            (h.paramsInheritanceStrategy = a.paramsInheritanceStrategy),
          a.urlUpdateStrategy && (h.urlUpdateStrategy = a.urlUpdateStrategy),
          a.relativeLinkResolution &&
            (h.relativeLinkResolution = a.relativeLinkResolution),
          h
        );
      }
      function Pd(e) {
        return e.routerState.root;
      }
      class Nd {
        constructor(e) {
          (this.injector = e),
            (this.initNavigation = !1),
            (this.resultOfPreactivationDone = new T());
        }
        appInitializer() {
          return this.injector.get(nl, Promise.resolve(null)).then(() => {
            let e = null;
            const t = new Promise((t) => (e = t)),
              n = this.injector.get(od),
              r = this.injector.get(bd);
            if (this.isLegacyDisabled(r) || this.isLegacyEnabled(r)) e(!0);
            else if ("disabled" === r.initialNavigation)
              n.setUpLocationChangeListener(), e(!0);
            else {
              if ("enabled" !== r.initialNavigation)
                throw new Error(
                  `Invalid initialNavigation options: '${r.initialNavigation}'`
                );
              (n.hooks.afterPreactivation = () =>
                this.initNavigation
                  ? Hl(null)
                  : ((this.initNavigation = !0),
                    e(!0),
                    this.resultOfPreactivationDone)),
                n.initialNavigation();
            }
            return t;
          });
        }
        bootstrapListener(e) {
          const t = this.injector.get(bd),
            n = this.injector.get(_d),
            r = this.injector.get(vd),
            s = this.injector.get(od),
            i = this.injector.get(ai);
          e === i.components[0] &&
            (this.isLegacyEnabled(t)
              ? s.initialNavigation()
              : this.isLegacyDisabled(t) && s.setUpLocationChangeListener(),
            n.setUpPreloading(),
            r.init(),
            s.resetRootComponentType(i.componentTypes[0]),
            this.resultOfPreactivationDone.next(null),
            this.resultOfPreactivationDone.complete());
        }
        isLegacyEnabled(e) {
          return (
            "legacy_enabled" === e.initialNavigation ||
            !0 === e.initialNavigation ||
            void 0 === e.initialNavigation
          );
        }
        isLegacyDisabled(e) {
          return (
            "legacy_disabled" === e.initialNavigation ||
            !1 === e.initialNavigation
          );
        }
      }
      function Rd(e) {
        return e.appInitializer.bind(e);
      }
      function Dd(e) {
        return e.bootstrapListener.bind(e);
      }
      const Od = new ve("Router Initializer");
      var Md = Fn({ encapsulation: 2, styles: [], data: {} });
      function Fd(e) {
        return qi(
          0,
          [
            (e()(),
            Ai(
              0,
              16777216,
              null,
              null,
              1,
              "router-outlet",
              [],
              null,
              null,
              null,
              null,
              null
            )),
            Wr(1, 212992, null, 0, pd, [dd, vn, Ht, [8, null], gt], null, null),
          ],
          function (e, t) {
            e(t, 1, 0);
          },
          null
        );
      }
      function Vd(e) {
        return qi(
          0,
          [
            (e()(),
            Ai(
              0,
              0,
              null,
              null,
              1,
              "ng-component",
              [],
              null,
              null,
              null,
              Fd,
              Md
            )),
            Wr(1, 49152, null, 0, lc, [], null, null),
          ],
          null,
          null
        );
      }
      var Ld = Cr("ng-component", lc, Vd, {}, {}, []);
      let Ud = (() => {
        class e {
          constructor() {
            (this.part$ = new Bl(0)),
              (this.part = 0),
              (this.mode$ = new Bl(""));
          }
        }
        return (
          (e.ngInjectableDef = le({
            factory: function () {
              return new e();
            },
            token: e,
            providedIn: "root",
          })),
          e
        );
      })();
      class jd {}
      class $d {}
      class Hd {
        constructor(e) {
          (this.normalizedNames = new Map()),
            (this.lazyUpdate = null),
            e
              ? (this.lazyInit =
                  "string" == typeof e
                    ? () => {
                        (this.headers = new Map()),
                          e.split("\n").forEach((e) => {
                            const t = e.indexOf(":");
                            if (t > 0) {
                              const n = e.slice(0, t),
                                r = n.toLowerCase(),
                                s = e.slice(t + 1).trim();
                              this.maybeSetNormalizedName(n, r),
                                this.headers.has(r)
                                  ? this.headers.get(r).push(s)
                                  : this.headers.set(r, [s]);
                            }
                          });
                      }
                    : () => {
                        (this.headers = new Map()),
                          Object.keys(e).forEach((t) => {
                            let n = e[t];
                            const r = t.toLowerCase();
                            "string" == typeof n && (n = [n]),
                              n.length > 0 &&
                                (this.headers.set(r, n),
                                this.maybeSetNormalizedName(t, r));
                          });
                      })
              : (this.headers = new Map());
        }
        has(e) {
          return this.init(), this.headers.has(e.toLowerCase());
        }
        get(e) {
          this.init();
          const t = this.headers.get(e.toLowerCase());
          return t && t.length > 0 ? t[0] : null;
        }
        keys() {
          return this.init(), Array.from(this.normalizedNames.values());
        }
        getAll(e) {
          return this.init(), this.headers.get(e.toLowerCase()) || null;
        }
        append(e, t) {
          return this.clone({ name: e, value: t, op: "a" });
        }
        set(e, t) {
          return this.clone({ name: e, value: t, op: "s" });
        }
        delete(e, t) {
          return this.clone({ name: e, value: t, op: "d" });
        }
        maybeSetNormalizedName(e, t) {
          this.normalizedNames.has(t) || this.normalizedNames.set(t, e);
        }
        init() {
          this.lazyInit &&
            (this.lazyInit instanceof Hd
              ? this.copyFrom(this.lazyInit)
              : this.lazyInit(),
            (this.lazyInit = null),
            this.lazyUpdate &&
              (this.lazyUpdate.forEach((e) => this.applyUpdate(e)),
              (this.lazyUpdate = null)));
        }
        copyFrom(e) {
          e.init(),
            Array.from(e.headers.keys()).forEach((t) => {
              this.headers.set(t, e.headers.get(t)),
                this.normalizedNames.set(t, e.normalizedNames.get(t));
            });
        }
        clone(e) {
          const t = new Hd();
          return (
            (t.lazyInit =
              this.lazyInit && this.lazyInit instanceof Hd
                ? this.lazyInit
                : this),
            (t.lazyUpdate = (this.lazyUpdate || []).concat([e])),
            t
          );
        }
        applyUpdate(e) {
          const t = e.name.toLowerCase();
          switch (e.op) {
            case "a":
            case "s":
              let n = e.value;
              if (("string" == typeof n && (n = [n]), 0 === n.length)) return;
              this.maybeSetNormalizedName(e.name, t);
              const r = ("a" === e.op ? this.headers.get(t) : void 0) || [];
              r.push(...n), this.headers.set(t, r);
              break;
            case "d":
              const s = e.value;
              if (s) {
                let e = this.headers.get(t);
                if (!e) return;
                (e = e.filter((e) => -1 === s.indexOf(e))),
                  0 === e.length
                    ? (this.headers.delete(t), this.normalizedNames.delete(t))
                    : this.headers.set(t, e);
              } else this.headers.delete(t), this.normalizedNames.delete(t);
          }
        }
        forEach(e) {
          this.init(),
            Array.from(this.normalizedNames.keys()).forEach((t) =>
              e(this.normalizedNames.get(t), this.headers.get(t))
            );
        }
      }
      class Bd {
        encodeKey(e) {
          return zd(e);
        }
        encodeValue(e) {
          return zd(e);
        }
        decodeKey(e) {
          return decodeURIComponent(e);
        }
        decodeValue(e) {
          return decodeURIComponent(e);
        }
      }
      function zd(e) {
        return encodeURIComponent(e)
          .replace(/%40/gi, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/gi, "$")
          .replace(/%2C/gi, ",")
          .replace(/%3B/gi, ";")
          .replace(/%2B/gi, "+")
          .replace(/%3D/gi, "=")
          .replace(/%3F/gi, "?")
          .replace(/%2F/gi, "/");
      }
      class qd {
        constructor(e = {}) {
          if (
            ((this.updates = null),
            (this.cloneFrom = null),
            (this.encoder = e.encoder || new Bd()),
            e.fromString)
          ) {
            if (e.fromObject)
              throw new Error("Cannot specify both fromString and fromObject.");
            this.map = (function (e, t) {
              const n = new Map();
              return (
                e.length > 0 &&
                  e.split("&").forEach((e) => {
                    const r = e.indexOf("="),
                      [s, i] =
                        -1 == r
                          ? [t.decodeKey(e), ""]
                          : [
                              t.decodeKey(e.slice(0, r)),
                              t.decodeValue(e.slice(r + 1)),
                            ],
                      o = n.get(s) || [];
                    o.push(i), n.set(s, o);
                  }),
                n
              );
            })(e.fromString, this.encoder);
          } else
            e.fromObject
              ? ((this.map = new Map()),
                Object.keys(e.fromObject).forEach((t) => {
                  const n = e.fromObject[t];
                  this.map.set(t, Array.isArray(n) ? n : [n]);
                }))
              : (this.map = null);
        }
        has(e) {
          return this.init(), this.map.has(e);
        }
        get(e) {
          this.init();
          const t = this.map.get(e);
          return t ? t[0] : null;
        }
        getAll(e) {
          return this.init(), this.map.get(e) || null;
        }
        keys() {
          return this.init(), Array.from(this.map.keys());
        }
        append(e, t) {
          return this.clone({ param: e, value: t, op: "a" });
        }
        set(e, t) {
          return this.clone({ param: e, value: t, op: "s" });
        }
        delete(e, t) {
          return this.clone({ param: e, value: t, op: "d" });
        }
        toString() {
          return (
            this.init(),
            this.keys()
              .map((e) => {
                const t = this.encoder.encodeKey(e);
                return this.map
                  .get(e)
                  .map((e) => t + "=" + this.encoder.encodeValue(e))
                  .join("&");
              })
              .join("&")
          );
        }
        clone(e) {
          const t = new qd({ encoder: this.encoder });
          return (
            (t.cloneFrom = this.cloneFrom || this),
            (t.updates = (this.updates || []).concat([e])),
            t
          );
        }
        init() {
          null === this.map && (this.map = new Map()),
            null !== this.cloneFrom &&
              (this.cloneFrom.init(),
              this.cloneFrom
                .keys()
                .forEach((e) => this.map.set(e, this.cloneFrom.map.get(e))),
              this.updates.forEach((e) => {
                switch (e.op) {
                  case "a":
                  case "s":
                    const t =
                      ("a" === e.op ? this.map.get(e.param) : void 0) || [];
                    t.push(e.value), this.map.set(e.param, t);
                    break;
                  case "d":
                    if (void 0 === e.value) {
                      this.map.delete(e.param);
                      break;
                    }
                    {
                      let t = this.map.get(e.param) || [];
                      const n = t.indexOf(e.value);
                      -1 !== n && t.splice(n, 1),
                        t.length > 0
                          ? this.map.set(e.param, t)
                          : this.map.delete(e.param);
                    }
                }
              }),
              (this.cloneFrom = this.updates = null));
        }
      }
      function Wd(e) {
        return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer;
      }
      function Gd(e) {
        return "undefined" != typeof Blob && e instanceof Blob;
      }
      function Kd(e) {
        return "undefined" != typeof FormData && e instanceof FormData;
      }
      class Qd {
        constructor(e, t, n, r) {
          let s;
          if (
            ((this.url = t),
            (this.body = null),
            (this.reportProgress = !1),
            (this.withCredentials = !1),
            (this.responseType = "json"),
            (this.method = e.toUpperCase()),
            (function (e) {
              switch (e) {
                case "DELETE":
                case "GET":
                case "HEAD":
                case "OPTIONS":
                case "JSONP":
                  return !1;
                default:
                  return !0;
              }
            })(this.method) || r
              ? ((this.body = void 0 !== n ? n : null), (s = r))
              : (s = n),
            s &&
              ((this.reportProgress = !!s.reportProgress),
              (this.withCredentials = !!s.withCredentials),
              s.responseType && (this.responseType = s.responseType),
              s.headers && (this.headers = s.headers),
              s.params && (this.params = s.params)),
            this.headers || (this.headers = new Hd()),
            this.params)
          ) {
            const e = this.params.toString();
            if (0 === e.length) this.urlWithParams = t;
            else {
              const n = t.indexOf("?");
              this.urlWithParams =
                t + (-1 === n ? "?" : n < t.length - 1 ? "&" : "") + e;
            }
          } else (this.params = new qd()), (this.urlWithParams = t);
        }
        serializeBody() {
          return null === this.body
            ? null
            : Wd(this.body) ||
              Gd(this.body) ||
              Kd(this.body) ||
              "string" == typeof this.body
            ? this.body
            : this.body instanceof qd
            ? this.body.toString()
            : "object" == typeof this.body ||
              "boolean" == typeof this.body ||
              Array.isArray(this.body)
            ? JSON.stringify(this.body)
            : this.body.toString();
        }
        detectContentTypeHeader() {
          return null === this.body || Kd(this.body)
            ? null
            : Gd(this.body)
            ? this.body.type || null
            : Wd(this.body)
            ? null
            : "string" == typeof this.body
            ? "text/plain"
            : this.body instanceof qd
            ? "application/x-www-form-urlencoded;charset=UTF-8"
            : "object" == typeof this.body ||
              "number" == typeof this.body ||
              Array.isArray(this.body)
            ? "application/json"
            : null;
        }
        clone(e = {}) {
          const t = e.method || this.method,
            n = e.url || this.url,
            r = e.responseType || this.responseType,
            s = void 0 !== e.body ? e.body : this.body,
            i =
              void 0 !== e.withCredentials
                ? e.withCredentials
                : this.withCredentials,
            o =
              void 0 !== e.reportProgress
                ? e.reportProgress
                : this.reportProgress;
          let l = e.headers || this.headers,
            a = e.params || this.params;
          return (
            void 0 !== e.setHeaders &&
              (l = Object.keys(e.setHeaders).reduce(
                (t, n) => t.set(n, e.setHeaders[n]),
                l
              )),
            e.setParams &&
              (a = Object.keys(e.setParams).reduce(
                (t, n) => t.set(n, e.setParams[n]),
                a
              )),
            new Qd(t, n, s, {
              params: a,
              headers: l,
              reportProgress: o,
              responseType: r,
              withCredentials: i,
            })
          );
        }
      }
      const Zd = (function () {
        var e = {
          Sent: 0,
          UploadProgress: 1,
          ResponseHeader: 2,
          DownloadProgress: 3,
          Response: 4,
          User: 5,
        };
        return (
          (e[e.Sent] = "Sent"),
          (e[e.UploadProgress] = "UploadProgress"),
          (e[e.ResponseHeader] = "ResponseHeader"),
          (e[e.DownloadProgress] = "DownloadProgress"),
          (e[e.Response] = "Response"),
          (e[e.User] = "User"),
          e
        );
      })();
      class Xd {
        constructor(e, t = 200, n = "OK") {
          (this.headers = e.headers || new Hd()),
            (this.status = void 0 !== e.status ? e.status : t),
            (this.statusText = e.statusText || n),
            (this.url = e.url || null),
            (this.ok = this.status >= 200 && this.status < 300);
        }
      }
      class Jd extends Xd {
        constructor(e = {}) {
          super(e), (this.type = Zd.ResponseHeader);
        }
        clone(e = {}) {
          return new Jd({
            headers: e.headers || this.headers,
            status: void 0 !== e.status ? e.status : this.status,
            statusText: e.statusText || this.statusText,
            url: e.url || this.url || void 0,
          });
        }
      }
      class Yd extends Xd {
        constructor(e = {}) {
          super(e),
            (this.type = Zd.Response),
            (this.body = void 0 !== e.body ? e.body : null);
        }
        clone(e = {}) {
          return new Yd({
            body: void 0 !== e.body ? e.body : this.body,
            headers: e.headers || this.headers,
            status: void 0 !== e.status ? e.status : this.status,
            statusText: e.statusText || this.statusText,
            url: e.url || this.url || void 0,
          });
        }
      }
      class ep extends Xd {
        constructor(e) {
          super(e, 0, "Unknown Error"),
            (this.name = "HttpErrorResponse"),
            (this.ok = !1),
            (this.message =
              this.status >= 200 && this.status < 300
                ? "Http failure during parsing for " +
                  (e.url || "(unknown url)")
                : `Http failure response for ${e.url || "(unknown url)"}: ${
                    e.status
                  } ${e.statusText}`),
            (this.error = e.error || null);
        }
      }
      function tp(e, t) {
        return {
          body: t,
          headers: e.headers,
          observe: e.observe,
          params: e.params,
          reportProgress: e.reportProgress,
          responseType: e.responseType,
          withCredentials: e.withCredentials,
        };
      }
      class np {
        constructor(e) {
          this.handler = e;
        }
        request(e, t, n = {}) {
          let r;
          if (e instanceof Qd) r = e;
          else {
            let s = void 0;
            s = n.headers instanceof Hd ? n.headers : new Hd(n.headers);
            let i = void 0;
            n.params &&
              (i =
                n.params instanceof qd
                  ? n.params
                  : new qd({ fromObject: n.params })),
              (r = new Qd(e, t, void 0 !== n.body ? n.body : null, {
                headers: s,
                params: i,
                reportProgress: n.reportProgress,
                responseType: n.responseType || "json",
                withCredentials: n.withCredentials,
              }));
          }
          const s = Hl(r).pipe(Ra((e) => this.handler.handle(e)));
          if (e instanceof Qd || "events" === n.observe) return s;
          const i = s.pipe(ta((e) => e instanceof Yd));
          switch (n.observe || "body") {
            case "body":
              switch (r.responseType) {
                case "arraybuffer":
                  return i.pipe(
                    A((e) => {
                      if (null !== e.body && !(e.body instanceof ArrayBuffer))
                        throw new Error("Response is not an ArrayBuffer.");
                      return e.body;
                    })
                  );
                case "blob":
                  return i.pipe(
                    A((e) => {
                      if (null !== e.body && !(e.body instanceof Blob))
                        throw new Error("Response is not a Blob.");
                      return e.body;
                    })
                  );
                case "text":
                  return i.pipe(
                    A((e) => {
                      if (null !== e.body && "string" != typeof e.body)
                        throw new Error("Response is not a string.");
                      return e.body;
                    })
                  );
                case "json":
                default:
                  return i.pipe(A((e) => e.body));
              }
            case "response":
              return i;
            default:
              throw new Error(
                `Unreachable: unhandled observe type ${n.observe}}`
              );
          }
        }
        delete(e, t = {}) {
          return this.request("DELETE", e, t);
        }
        get(e, t = {}) {
          return this.request("GET", e, t);
        }
        head(e, t = {}) {
          return this.request("HEAD", e, t);
        }
        jsonp(e, t) {
          return this.request("JSONP", e, {
            params: new qd().append(t, "JSONP_CALLBACK"),
            observe: "body",
            responseType: "json",
          });
        }
        options(e, t = {}) {
          return this.request("OPTIONS", e, t);
        }
        patch(e, t, n = {}) {
          return this.request("PATCH", e, tp(n, t));
        }
        post(e, t, n = {}) {
          return this.request("POST", e, tp(n, t));
        }
        put(e, t, n = {}) {
          return this.request("PUT", e, tp(n, t));
        }
      }
      class rp {
        constructor(e, t) {
          (this.next = e), (this.interceptor = t);
        }
        handle(e) {
          return this.interceptor.intercept(e, this.next);
        }
      }
      const sp = new ve("HTTP_INTERCEPTORS");
      class ip {
        intercept(e, t) {
          return t.handle(e);
        }
      }
      const op = /^\)\]\}',?\n/;
      class lp {}
      class ap {
        constructor() {}
        build() {
          return new XMLHttpRequest();
        }
      }
      class up {
        constructor(e) {
          this.xhrFactory = e;
        }
        handle(e) {
          if ("JSONP" === e.method)
            throw new Error(
              "Attempted to construct Jsonp request without JsonpClientModule installed."
            );
          return new b((t) => {
            const n = this.xhrFactory.build();
            if (
              (n.open(e.method, e.urlWithParams),
              e.withCredentials && (n.withCredentials = !0),
              e.headers.forEach((e, t) => n.setRequestHeader(e, t.join(","))),
              e.headers.has("Accept") ||
                n.setRequestHeader(
                  "Accept",
                  "application/json, text/plain, */*"
                ),
              !e.headers.has("Content-Type"))
            ) {
              const t = e.detectContentTypeHeader();
              null !== t && n.setRequestHeader("Content-Type", t);
            }
            if (e.responseType) {
              const t = e.responseType.toLowerCase();
              n.responseType = "json" !== t ? t : "text";
            }
            const r = e.serializeBody();
            let s = null;
            const i = () => {
                if (null !== s) return s;
                const t = 1223 === n.status ? 204 : n.status,
                  r = n.statusText || "OK",
                  i = new Hd(n.getAllResponseHeaders()),
                  o =
                    (function (e) {
                      return "responseURL" in e && e.responseURL
                        ? e.responseURL
                        : /^X-Request-URL:/m.test(e.getAllResponseHeaders())
                        ? e.getResponseHeader("X-Request-URL")
                        : null;
                    })(n) || e.url;
                return (
                  (s = new Jd({
                    headers: i,
                    status: t,
                    statusText: r,
                    url: o,
                  })),
                  s
                );
              },
              o = () => {
                let { headers: r, status: s, statusText: o, url: l } = i(),
                  a = null;
                204 !== s &&
                  (a = void 0 === n.response ? n.responseText : n.response),
                  0 === s && (s = a ? 200 : 0);
                let u = s >= 200 && s < 300;
                if ("json" === e.responseType && "string" == typeof a) {
                  const e = a;
                  a = a.replace(op, "");
                  try {
                    a = "" !== a ? JSON.parse(a) : null;
                  } catch (c) {
                    (a = e), u && ((u = !1), (a = { error: c, text: a }));
                  }
                }
                u
                  ? (t.next(
                      new Yd({
                        body: a,
                        headers: r,
                        status: s,
                        statusText: o,
                        url: l || void 0,
                      })
                    ),
                    t.complete())
                  : t.error(
                      new ep({
                        error: a,
                        headers: r,
                        status: s,
                        statusText: o,
                        url: l || void 0,
                      })
                    );
              },
              l = (e) => {
                const { url: r } = i(),
                  s = new ep({
                    error: e,
                    status: n.status || 0,
                    statusText: n.statusText || "Unknown Error",
                    url: r || void 0,
                  });
                t.error(s);
              };
            let a = !1;
            const u = (r) => {
                a || (t.next(i()), (a = !0));
                let s = { type: Zd.DownloadProgress, loaded: r.loaded };
                r.lengthComputable && (s.total = r.total),
                  "text" === e.responseType &&
                    n.responseText &&
                    (s.partialText = n.responseText),
                  t.next(s);
              },
              c = (e) => {
                let n = { type: Zd.UploadProgress, loaded: e.loaded };
                e.lengthComputable && (n.total = e.total), t.next(n);
              };
            return (
              n.addEventListener("load", o),
              n.addEventListener("error", l),
              e.reportProgress &&
                (n.addEventListener("progress", u),
                null !== r &&
                  n.upload &&
                  n.upload.addEventListener("progress", c)),
              n.send(r),
              t.next({ type: Zd.Sent }),
              () => {
                n.removeEventListener("error", l),
                  n.removeEventListener("load", o),
                  e.reportProgress &&
                    (n.removeEventListener("progress", u),
                    null !== r &&
                      n.upload &&
                      n.upload.removeEventListener("progress", c)),
                  n.abort();
              }
            );
          });
        }
      }
      const cp = new ve("XSRF_COOKIE_NAME"),
        hp = new ve("XSRF_HEADER_NAME");
      class dp {}
      class pp {
        constructor(e, t, n) {
          (this.doc = e),
            (this.platform = t),
            (this.cookieName = n),
            (this.lastCookieString = ""),
            (this.lastToken = null),
            (this.parseCount = 0);
        }
        getToken() {
          if ("server" === this.platform) return null;
          const e = this.doc.cookie || "";
          return (
            e !== this.lastCookieString &&
              (this.parseCount++,
              (this.lastToken = vl(e, this.cookieName)),
              (this.lastCookieString = e)),
            this.lastToken
          );
        }
      }
      class fp {
        constructor(e, t) {
          (this.tokenService = e), (this.headerName = t);
        }
        intercept(e, t) {
          const n = e.url.toLowerCase();
          if (
            "GET" === e.method ||
            "HEAD" === e.method ||
            n.startsWith("http://") ||
            n.startsWith("https://")
          )
            return t.handle(e);
          const r = this.tokenService.getToken();
          return (
            null === r ||
              e.headers.has(this.headerName) ||
              (e = e.clone({ headers: e.headers.set(this.headerName, r) })),
            t.handle(e)
          );
        }
      }
      class gp {
        constructor(e, t) {
          (this.backend = e), (this.injector = t), (this.chain = null);
        }
        handle(e) {
          if (null === this.chain) {
            const e = this.injector.get(sp, []);
            this.chain = e.reduceRight((e, t) => new rp(e, t), this.backend);
          }
          return this.chain.handle(e);
        }
      }
      class mp {
        static disable() {
          return { ngModule: mp, providers: [{ provide: fp, useClass: ip }] };
        }
        static withOptions(e = {}) {
          return {
            ngModule: mp,
            providers: [
              e.cookieName ? { provide: cp, useValue: e.cookieName } : [],
              e.headerName ? { provide: hp, useValue: e.headerName } : [],
            ],
          };
        }
      }
      class yp {}
      let _p = (() => {
        class e {
          constructor(e, t) {
            (this.router = e), (this.http = t), (this.isAuth$ = new Bl(!1));
          }
          createNewUser(e, t) {
            return new Promise((n, r) => {
              this.http
                .post("http://localhost:8080/api/auth/signup", {
                  email: e,
                  password: t,
                })
                .subscribe(
                  () => {
                    this.login(e, t)
                      .then(() => {
                        n();
                      })
                      .catch((e) => {
                        r(e);
                      });
                  },
                  (e) => {
                    r(e);
                  }
                );
            });
          }
          login(e, t) {
            return new Promise((n, r) => {
              this.http
                .post("http://localhost:8080/api/auth/login", {
                  email: e,
                  password: t,
                })
                .subscribe(
                  (e) => {
                    (this.token = e.token),
                      (this.userId = e.userId),
                      this.isAuth$.next(!0),
                      n();
                  },
                  (e) => {
                    r(e);
                  }
                );
            });
          }
          logout() {
            this.isAuth$.next(!1), (this.userId = null), (this.token = null);
          }
        }
        return (
          (e.ngInjectableDef = le({
            factory: function () {
              return new e(xe(od), xe(np));
            },
            token: e,
            providedIn: "root",
          })),
          e
        );
      })();
      class vp {
        constructor(e, t, n) {
          (this.state = e), (this.auth = t), (this.router = n);
        }
        ngOnInit() {
          (this.modeSub = this.state.mode$.subscribe((e) => {
            this.mode = e;
          })),
            (this.partSub = this.state.part$.subscribe((e) => {
              switch (((this.part = e), e)) {
                case 1:
                  this.partString = "part-one";
                  break;
                case 3:
                  this.partString = "part-three";
                  break;
                case 4:
                  this.partString = "part-four";
              }
            })),
            (this.isAuthSub = this.auth.isAuth$.subscribe((e) => {
              this.isAuth = e;
            }));
        }
        onLogout() {
          this.auth.logout(),
            this.router.navigate(["/" + this.partString + "/auth/login"]);
        }
        onBackToParts() {
          this.router.navigate(["/default"]);
        }
        ngOnDestroy() {
          this.modeSub.unsubscribe(),
            this.partSub.unsubscribe(),
            this.isAuthSub.unsubscribe();
        }
      }
      var bp = Fn({
        encapsulation: 0,
        styles: [
          [
            "header[_ngcontent-%COMP%]{display:flex;align-items:center;background-color:#333;color:#fff;padding:.2rem 2%}ul[_ngcontent-%COMP%]{list-style:none;display:flex;align-items:center;margin:0 0 0 5%;padding:0}li[_ngcontent-%COMP%]{display:inline-block;margin:0 14px}a[_ngcontent-%COMP%]{color:#fff;font-weight:600}a[_ngcontent-%COMP%]:hover{text-decoration:none}.active[_ngcontent-%COMP%]{background-color:#6eb5ff;color:#fff;padding:.3rem .5rem}.hero-image[_ngcontent-%COMP%]{position:relative;width:100%;height:320px;background:url(38521354191_0f9b6016bc_b.417c8e5df6111de00bb7.jpg) 0 80%/cover no-repeat}.hero-text[_ngcontent-%COMP%]{color:#a1c9ff;font-weight:800;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:40%;text-align:center;-webkit-filter:drop-shadow(2px 2px 3px #000);filter:drop-shadow(2px 2px 3px #000);font-size:3rem}.nav-end[_ngcontent-%COMP%]{flex-direction:row-reverse;flex-grow:1}",
          ],
        ],
        data: {},
      });
      function wp(e) {
        return qi(
          0,
          [
            (e()(),
            Ai(
              0,
              0,
              null,
              null,
              6,
              "li",
              [["class", "header-navigation-item"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Ai(
              1,
              0,
              null,
              null,
              5,
              "a",
              [
                ["class", "header-link"],
                ["routerLinkActive", "active"],
              ],
              [
                [1, "target", 0],
                [8, "href", 4],
              ],
              [[null, "click"]],
              function (e, t, n) {
                var r = !0;
                return (
                  "click" === t &&
                    (r =
                      !1 !==
                        Dr(e, 2).onClick(
                          n.button,
                          n.ctrlKey,
                          n.metaKey,
                          n.shiftKey
                        ) && r),
                  r
                );
              },
              null,
              null
            )),
            Wr(
              2,
              671744,
              [[2, 4]],
              0,
              ad,
              [od, Zc, rl],
              { routerLink: [0, "routerLink"] },
              null
            ),
            Wr(
              3,
              1720320,
              null,
              2,
              cd,
              [od, Wt, Xt, [2, ld], [2, ad]],
              { routerLinkActive: [0, "routerLinkActive"] },
              null
            ),
            Di(603979776, 1, { links: 1 }),
            Di(603979776, 2, { linksWithHrefs: 1 }),
            (e()(), Hi(-1, null, ["OBJETS A VENDRE"])),
          ],
          function (e, t) {
            e(t, 2, 0, ur(1, "/", t.component.partString, "/all-stuff")),
              e(t, 3, 0, "active");
          },
          function (e, t) {
            e(t, 1, 0, Dr(t, 2).target, Dr(t, 2).href);
          }
        );
      }
      function Cp(e) {
        return qi(
          0,
          [
            (e()(),
            Ai(
              0,
              0,
              null,
              null,
              6,
              "li",
              [["class", "header-navigation-item"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Ai(
              1,
              0,
              null,
              null,
              5,
              "a",
              [
                ["class", "header-link"],
                ["routerLinkActive", "active"],
              ],
              [
                [1, "target", 0],
                [8, "href", 4],
              ],
              [[null, "click"]],
              function (e, t, n) {
                var r = !0;
                return (
                  "click" === t &&
                    (r =
                      !1 !==
                        Dr(e, 2).onClick(
                          n.button,
                          n.ctrlKey,
                          n.metaKey,
                          n.shiftKey
                        ) && r),
                  r
                );
              },
              null,
              null
            )),
            Wr(
              2,
              671744,
              [[4, 4]],
              0,
              ad,
              [od, Zc, rl],
              { routerLink: [0, "routerLink"] },
              null
            ),
            Wr(
              3,
              1720320,
              null,
              2,
              cd,
              [od, Wt, Xt, [2, ld], [2, ad]],
              { routerLinkActive: [0, "routerLinkActive"] },
              null
            ),
            Di(603979776, 3, { links: 1 }),
            Di(603979776, 4, { linksWithHrefs: 1 }),
            (e()(), Hi(-1, null, ["VENDRE UN OBJET"])),
          ],
          function (e, t) {
            e(t, 2, 0, ur(1, "/", t.component.partString, "/new-thing")),
              e(t, 3, 0, "active");
          },
          function (e, t) {
            e(t, 1, 0, Dr(t, 2).target, Dr(t, 2).href);
          }
        );
      }
      function Sp(e) {
        return qi(
          0,
          [
            (e()(),
            Ai(
              0,
              0,
              null,
              null,
              2,
              "li",
              [["class", "header-navigation-item"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Ai(
              1,
              0,
              null,
              null,
              1,
              "a",
              [
                ["class", "header-link"],
                ["style", "cursor: pointer"],
              ],
              null,
              [[null, "click"]],
              function (e, t, n) {
                var r = !0;
                return (
                  "click" === t && (r = !1 !== e.component.onLogout() && r), r
                );
              },
              null,
              null
            )),
            (e()(), Hi(-1, null, ["DECONNEXION"])),
          ],
          null,
          null
        );
      }
      function Ep(e) {
        return qi(
          0,
          [
            (e()(),
            Ai(
              0,
              0,
              null,
              null,
              6,
              "li",
              [["class", "header-navigation-item"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Ai(
              1,
              0,
              null,
              null,
              5,
              "a",
              [
                ["class", "header-link"],
                ["routerLinkActive", "active"],
              ],
              [
                [1, "target", 0],
                [8, "href", 4],
              ],
              [[null, "click"]],
              function (e, t, n) {
                var r = !0;
                return (
                  "click" === t &&
                    (r =
                      !1 !==
                        Dr(e, 2).onClick(
                          n.button,
                          n.ctrlKey,
                          n.metaKey,
                          n.shiftKey
                        ) && r),
                  r
                );
              },
              null,
              null
            )),
            Wr(
              2,
              671744,
              [[6, 4]],
              0,
              ad,
              [od, Zc, rl],
              { routerLink: [0, "routerLink"] },
              null
            ),
            Wr(
              3,
              1720320,
              null,
              2,
              cd,
              [od, Wt, Xt, [2, ld], [2, ad]],
              { routerLinkActive: [0, "routerLinkActive"] },
              null
            ),
            Di(603979776, 5, { links: 1 }),
            Di(603979776, 6, { linksWithHrefs: 1 }),
            (e()(), Hi(-1, null, ["CONNEXION"])),
          ],
          function (e, t) {
            e(t, 2, 0, ur(1, "/", t.component.partString, "/auth/login")),
              e(t, 3, 0, "active");
          },
          function (e, t) {
            e(t, 1, 0, Dr(t, 2).target, Dr(t, 2).href);
          }
        );
      }
      function Tp(e) {
        return qi(
          0,
          [
            (e()(),
            Ai(
              0,
              0,
              null,
              null,
              6,
              "li",
              [["class", "header-navigation-item"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Ai(
              1,
              0,
              null,
              null,
              5,
              "a",
              [
                ["class", "header-link"],
                ["routerLinkActive", "active"],
              ],
              [
                [1, "target", 0],
                [8, "href", 4],
              ],
              [[null, "click"]],
              function (e, t, n) {
                var r = !0;
                return (
                  "click" === t &&
                    (r =
                      !1 !==
                        Dr(e, 2).onClick(
                          n.button,
                          n.ctrlKey,
                          n.metaKey,
                          n.shiftKey
                        ) && r),
                  r
                );
              },
              null,
              null
            )),
            Wr(
              2,
              671744,
              [[8, 4]],
              0,
              ad,
              [od, Zc, rl],
              { routerLink: [0, "routerLink"] },
              null
            ),
            Wr(
              3,
              1720320,
              null,
              2,
              cd,
              [od, Wt, Xt, [2, ld], [2, ad]],
              { routerLinkActive: [0, "routerLinkActive"] },
              null
            ),
            Di(603979776, 7, { links: 1 }),
            Di(603979776, 8, { linksWithHrefs: 1 }),
            (e()(), Hi(-1, null, ["INSCRIPTION"])),
          ],
          function (e, t) {
            e(t, 2, 0, ur(1, "/", t.component.partString, "/auth/signup")),
              e(t, 3, 0, "active");
          },
          function (e, t) {
            e(t, 1, 0, Dr(t, 2).target, Dr(t, 2).href);
          }
        );
      }
      function xp(e) {
        return qi(
          0,
          [
            (e()(),
            Ai(
              0,
              0,
              null,
              null,
              2,
              "div",
              [["class", "hero-image"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Ai(
              1,
              0,
              null,
              null,
              1,
              "h2",
              [["class", "hero-text"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Hi(-1, null, [" LE MEILLEUR ENDROIT POUR VENDRE VOS OBJETS "])),
          ],
          null,
          null
        );
      }
      function kp(e) {
        return qi(
          0,
          [
            (e()(),
            Ai(
              0,
              0,
              null,
              null,
              17,
              "header",
              [],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Ai(
              1,
              0,
              null,
              null,
              1,
              "h1",
              [["class", "header-title"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), Hi(-1, null, [" VendreMesObjets "])),
            (e()(),
            Ai(
              3,
              0,
              null,
              null,
              10,
              "ul",
              [["class", "header-navigation"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), ki(16777216, null, null, 1, null, wp)),
            Wr(5, 16384, null, 0, kl, [vn, yn], { ngIf: [0, "ngIf"] }, null),
            (e()(), ki(16777216, null, null, 1, null, Cp)),
            Wr(7, 16384, null, 0, kl, [vn, yn], { ngIf: [0, "ngIf"] }, null),
            (e()(), ki(16777216, null, null, 1, null, Sp)),
            Wr(9, 16384, null, 0, kl, [vn, yn], { ngIf: [0, "ngIf"] }, null),
            (e()(), ki(16777216, null, null, 1, null, Ep)),
            Wr(11, 16384, null, 0, kl, [vn, yn], { ngIf: [0, "ngIf"] }, null),
            (e()(), ki(16777216, null, null, 1, null, Tp)),
            Wr(13, 16384, null, 0, kl, [vn, yn], { ngIf: [0, "ngIf"] }, null),
            (e()(),
            Ai(
              14,
              0,
              null,
              null,
              3,
              "ul",
              [["class", "header-navigation nav-end"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Ai(
              15,
              0,
              null,
              null,
              2,
              "li",
              [["class", "header-navigation-item font-italic"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Ai(
              16,
              0,
              null,
              null,
              1,
              "a",
              [
                ["class", "header-link"],
                ["style", "cursor:pointer"],
              ],
              null,
              [[null, "click"]],
              function (e, t, n) {
                var r = !0;
                return (
                  "click" === t &&
                    (r = !1 !== e.component.onBackToParts() && r),
                  r
                );
              },
              null,
              null
            )),
            (e()(), Hi(-1, null, ["RETOUR A L'INDEX"])),
            (e()(), ki(16777216, null, null, 1, null, xp)),
            Wr(19, 16384, null, 0, kl, [vn, yn], { ngIf: [0, "ngIf"] }, null),
          ],
          function (e, t) {
            var n = t.component;
            e(t, 5, 0, 1 === n.part || (n.part >= 3 && n.isAuth)),
              e(t, 7, 0, 1 === n.part || (n.part >= 3 && n.isAuth)),
              e(t, 9, 0, n.part >= 3 && n.isAuth),
              e(t, 11, 0, n.part >= 3 && !n.isAuth),
              e(t, 13, 0, n.part >= 3 && !n.isAuth),
              e(t, 19, 0, "list" === n.mode);
          },
          null
        );
      }
      class Ap {
        constructor(e) {
          this.state = e;
        }
        ngOnInit() {
          this.state.part$.next(1), (this.state.part = 1);
        }
      }
      var Ip = Fn({ encapsulation: 0, styles: [[""]], data: {} });
      function Pp(e) {
        return qi(
          0,
          [
            (e()(),
            Ai(
              0,
              0,
              null,
              null,
              1,
              "app-header",
              [],
              null,
              null,
              null,
              kp,
              bp
            )),
            Wr(1, 245760, null, 0, vp, [Ud, _p, od], null, null),
            (e()(),
            Ai(
              2,
              16777216,
              null,
              null,
              1,
              "router-outlet",
              [],
              null,
              null,
              null,
              null,
              null
            )),
            Wr(3, 212992, null, 0, pd, [dd, vn, Ht, [8, null], gt], null, null),
          ],
          function (e, t) {
            e(t, 1, 0), e(t, 3, 0);
          },
          null
        );
      }
      function Np(e) {
        return qi(
          0,
          [
            (e()(),
            Ai(
              0,
              0,
              null,
              null,
              1,
              "app-part-one",
              [],
              null,
              null,
              null,
              Pp,
              Ip
            )),
            Wr(1, 114688, null, 0, Ap, [Ud], null, null),
          ],
          function (e, t) {
            e(t, 1, 0);
          },
          null
        );
      }
      var Rp = Cr("app-part-one", Ap, Np, {}, {}, []);
      function Dp(e, t = 0) {
        return (function (e) {
          return !isNaN(parseFloat(e)) && !isNaN(Number(e));
        })(e)
          ? Number(e)
          : t;
      }
      const Op = new Yt("8.2.3");
      let Mp;
      try {
        Mp = "undefined" != typeof Intl && Intl.v8BreakIterator;
      } catch (ev) {
        Mp = !1;
      }
      let Fp = (() => {
        class e {
          constructor(e) {
            (this._platformId = e),
              (this.isBrowser = this._platformId
                ? "browser" === this._platformId
                : "object" == typeof document && !!document),
              (this.EDGE =
                this.isBrowser && /(edge)/i.test(navigator.userAgent)),
              (this.TRIDENT =
                this.isBrowser && /(msie|trident)/i.test(navigator.userAgent)),
              (this.BLINK =
                this.isBrowser &&
                !(!window.chrome && !Mp) &&
                "undefined" != typeof CSS &&
                !this.EDGE &&
                !this.TRIDENT),
              (this.WEBKIT =
                this.isBrowser &&
                /AppleWebKit/i.test(navigator.userAgent) &&
                !this.BLINK &&
                !this.EDGE &&
                !this.TRIDENT),
              (this.IOS =
                this.isBrowser &&
                /iPad|iPhone|iPod/.test(navigator.userAgent) &&
                !("MSStream" in window)),
              (this.FIREFOX =
                this.isBrowser &&
                /(firefox|minefield)/i.test(navigator.userAgent)),
              (this.ANDROID =
                this.isBrowser &&
                /android/i.test(navigator.userAgent) &&
                !this.TRIDENT),
              (this.SAFARI =
                this.isBrowser &&
                /safari/i.test(navigator.userAgent) &&
                this.WEBKIT);
          }
        }
        return (
          (e.ngInjectableDef = le({
            factory: function () {
              return new e(xe(Es, 8));
            },
            token: e,
            providedIn: "root",
          })),
          e
        );
      })();
      const Vp = new Yt("8.2.3"),
        Lp = new ve("mat-sanity-checks", {
          providedIn: "root",
          factory: function () {
            return !0;
          },
        });
      class Up {
        constructor(e, t) {
          (this._sanityChecksEnabled = e),
            (this._hammerLoader = t),
            (this._hasDoneGlobalChecks = !1),
            (this._hasCheckedHammer = !1),
            (this._document =
              "object" == typeof document && document ? document : null),
            (this._window =
              "object" == typeof window && window ? window : null),
            this._areChecksEnabled() &&
              !this._hasDoneGlobalChecks &&
              (this._checkDoctypeIsDefined(),
              this._checkThemeIsPresent(),
              this._checkCdkVersionMatch(),
              (this._hasDoneGlobalChecks = !0));
        }
        _areChecksEnabled() {
          return this._sanityChecksEnabled && $e() && !this._isTestEnv();
        }
        _isTestEnv() {
          const e = this._window;
          return e && (e.__karma__ || e.jasmine);
        }
        _checkDoctypeIsDefined() {
          this._document &&
            !this._document.doctype &&
            console.warn(
              "Current document does not have a doctype. This may cause some Angular Material components not to behave as expected."
            );
        }
        _checkThemeIsPresent() {
          if (
            !this._document ||
            !this._document.body ||
            "function" != typeof getComputedStyle
          )
            return;
          const e = this._document.createElement("div");
          e.classList.add("mat-theme-loaded-marker"),
            this._document.body.appendChild(e);
          const t = getComputedStyle(e);
          t &&
            "none" !== t.display &&
            console.warn(
              "Could not find Angular Material core theme. Most Material components may not work as expected. For more info refer to the theming guide: https://material.angular.io/guide/theming"
            ),
            this._document.body.removeChild(e);
        }
        _checkCdkVersionMatch() {
          Vp.full !== Op.full &&
            console.warn(
              "The Angular Material version (" +
                Vp.full +
                ") does not match the Angular CDK version (" +
                Op.full +
                ").\nPlease ensure the versions of these two packages exactly match."
            );
        }
        _checkHammerIsAvailable() {
          !this._hasCheckedHammer &&
            this._window &&
            (!this._areChecksEnabled() ||
              this._window.Hammer ||
              this._hammerLoader ||
              console.warn(
                "Could not find HammerJS. Certain Angular Material components may not work correctly."
              ),
            (this._hasCheckedHammer = !0));
        }
      }
      function jp(e, t) {
        return class extends e {
          get color() {
            return this._color;
          }
          set color(e) {
            const n = e || t;
            n !== this._color &&
              (this._color &&
                this._elementRef.nativeElement.classList.remove(
                  "mat-" + this._color
                ),
              n && this._elementRef.nativeElement.classList.add("mat-" + n),
              (this._color = n));
          }
          constructor(...e) {
            super(...e), (this.color = t);
          }
        };
      }
      let $p;
      try {
        $p = "undefined" != typeof Intl;
      } catch (ev) {
        $p = !1;
      }
      class Hp {
        constructor(e) {
          this._elementRef = e;
        }
      }
      const Bp = jp(Hp, "primary"),
        zp = new ve("mat-progress-spinner-default-options", {
          providedIn: "root",
          factory: function () {
            return { diameter: 100 };
          },
        });
      let qp = (() => {
        class e extends Bp {
          constructor(t, n, r, s, i) {
            super(t),
              (this._elementRef = t),
              (this._document = r),
              (this._diameter = 100),
              (this._value = 0),
              (this._fallbackAnimation = !1),
              (this.mode = "determinate");
            const o = e._diameters;
            o.has(r.head) || o.set(r.head, new Set([100])),
              (this._fallbackAnimation = n.EDGE || n.TRIDENT),
              (this._noopAnimations =
                "NoopAnimations" === s && !!i && !i._forceAnimations),
              i &&
                (i.diameter && (this.diameter = i.diameter),
                i.strokeWidth && (this.strokeWidth = i.strokeWidth));
          }
          get diameter() {
            return this._diameter;
          }
          set diameter(e) {
            (this._diameter = Dp(e)),
              !this._fallbackAnimation &&
                this._styleRoot &&
                this._attachStyleNode();
          }
          get strokeWidth() {
            return this._strokeWidth || this.diameter / 10;
          }
          set strokeWidth(e) {
            this._strokeWidth = Dp(e);
          }
          get value() {
            return "determinate" === this.mode ? this._value : 0;
          }
          set value(e) {
            this._value = Math.max(0, Math.min(100, Dp(e)));
          }
          ngOnInit() {
            const e = this._elementRef.nativeElement;
            (this._styleRoot =
              (function (e, t) {
                if ("undefined" != typeof window) {
                  const n = t.head;
                  if (n && (n.createShadowRoot || n.attachShadow)) {
                    const t = e.getRootNode ? e.getRootNode() : null;
                    if (t instanceof window.ShadowRoot) return t;
                  }
                }
                return null;
              })(e, this._document) || this._document.head),
              this._attachStyleNode(),
              e.classList.add(
                `mat-progress-spinner-indeterminate${
                  this._fallbackAnimation ? "-fallback" : ""
                }-animation`
              );
          }
          get _circleRadius() {
            return (this.diameter - 10) / 2;
          }
          get _viewBox() {
            const e = 2 * this._circleRadius + this.strokeWidth;
            return `0 0 ${e} ${e}`;
          }
          get _strokeCircumference() {
            return 2 * Math.PI * this._circleRadius;
          }
          get _strokeDashOffset() {
            return "determinate" === this.mode
              ? (this._strokeCircumference * (100 - this._value)) / 100
              : this._fallbackAnimation && "indeterminate" === this.mode
              ? 0.2 * this._strokeCircumference
              : null;
          }
          get _circleStrokeWidth() {
            return (this.strokeWidth / this.diameter) * 100;
          }
          _attachStyleNode() {
            const t = this._styleRoot,
              n = this._diameter,
              r = e._diameters;
            let s = r.get(t);
            if (!s || !s.has(n)) {
              const e = this._document.createElement("style");
              e.setAttribute("mat-spinner-animation", n + ""),
                (e.textContent = this._getAnimationText()),
                t.appendChild(e),
                s || ((s = new Set()), r.set(t, s)),
                s.add(n);
            }
          }
          _getAnimationText() {
            return "\n @keyframes mat-progress-spinner-stroke-rotate-DIAMETER {\n    0%      { stroke-dashoffset: START_VALUE;  transform: rotate(0); }\n    12.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(0); }\n    12.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(72.5deg); }\n    25%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(72.5deg); }\n\n    25.0001%   { stroke-dashoffset: START_VALUE;  transform: rotate(270deg); }\n    37.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(270deg); }\n    37.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(161.5deg); }\n    50%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(161.5deg); }\n\n    50.0001%  { stroke-dashoffset: START_VALUE;  transform: rotate(180deg); }\n    62.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(180deg); }\n    62.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(251.5deg); }\n    75%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(251.5deg); }\n\n    75.0001%  { stroke-dashoffset: START_VALUE;  transform: rotate(90deg); }\n    87.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(90deg); }\n    87.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(341.5deg); }\n    100%    { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(341.5deg); }\n  }\n"
              .replace(/START_VALUE/g, "" + 0.95 * this._strokeCircumference)
              .replace(/END_VALUE/g, "" + 0.2 * this._strokeCircumference)
              .replace(/DIAMETER/g, "" + this.diameter);
          }
        }
        return (e._diameters = new WeakMap()), e;
      })();
      class Wp extends qp {
        constructor(e, t, n, r, s) {
          super(e, t, n, r, s), (this.mode = "indeterminate");
        }
      }
      class Gp {}
      class Kp {}
      class Qp {}
      function Zp(e, t = null) {
        return { type: 2, steps: e, options: t };
      }
      function Xp(e) {
        return { type: 6, styles: e, offset: null };
      }
      function Jp(e) {
        Promise.resolve(null).then(e);
      }
      class Yp {
        constructor(e = 0, t = 0) {
          (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this._started = !1),
            (this._destroyed = !1),
            (this._finished = !1),
            (this.parentPlayer = null),
            (this.totalTime = e + t);
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach((e) => e()),
            (this._onDoneFns = []));
        }
        onStart(e) {
          this._onStartFns.push(e);
        }
        onDone(e) {
          this._onDoneFns.push(e);
        }
        onDestroy(e) {
          this._onDestroyFns.push(e);
        }
        hasStarted() {
          return this._started;
        }
        init() {}
        play() {
          this.hasStarted() || (this._onStart(), this.triggerMicrotask()),
            (this._started = !0);
        }
        triggerMicrotask() {
          Jp(() => this._onFinish());
        }
        _onStart() {
          this._onStartFns.forEach((e) => e()), (this._onStartFns = []);
        }
        pause() {}
        restart() {}
        finish() {
          this._onFinish();
        }
        destroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this.hasStarted() || this._onStart(),
            this.finish(),
            this._onDestroyFns.forEach((e) => e()),
            (this._onDestroyFns = []));
        }
        reset() {}
        setPosition(e) {}
        getPosition() {
          return 0;
        }
        triggerCallback(e) {
          const t = "start" == e ? this._onStartFns : this._onDoneFns;
          t.forEach((e) => e()), (t.length = 0);
        }
      }
      class ef {
        constructor(e) {
          (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._finished = !1),
            (this._started = !1),
            (this._destroyed = !1),
            (this._onDestroyFns = []),
            (this.parentPlayer = null),
            (this.totalTime = 0),
            (this.players = e);
          let t = 0,
            n = 0,
            r = 0;
          const s = this.players.length;
          0 == s
            ? Jp(() => this._onFinish())
            : this.players.forEach((e) => {
                e.onDone(() => {
                  ++t == s && this._onFinish();
                }),
                  e.onDestroy(() => {
                    ++n == s && this._onDestroy();
                  }),
                  e.onStart(() => {
                    ++r == s && this._onStart();
                  });
              }),
            (this.totalTime = this.players.reduce(
              (e, t) => Math.max(e, t.totalTime),
              0
            ));
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach((e) => e()),
            (this._onDoneFns = []));
        }
        init() {
          this.players.forEach((e) => e.init());
        }
        onStart(e) {
          this._onStartFns.push(e);
        }
        _onStart() {
          this.hasStarted() ||
            ((this._started = !0),
            this._onStartFns.forEach((e) => e()),
            (this._onStartFns = []));
        }
        onDone(e) {
          this._onDoneFns.push(e);
        }
        onDestroy(e) {
          this._onDestroyFns.push(e);
        }
        hasStarted() {
          return this._started;
        }
        play() {
          this.parentPlayer || this.init(),
            this._onStart(),
            this.players.forEach((e) => e.play());
        }
        pause() {
          this.players.forEach((e) => e.pause());
        }
        restart() {
          this.players.forEach((e) => e.restart());
        }
        finish() {
          this._onFinish(), this.players.forEach((e) => e.finish());
        }
        destroy() {
          this._onDestroy();
        }
        _onDestroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this._onFinish(),
            this.players.forEach((e) => e.destroy()),
            this._onDestroyFns.forEach((e) => e()),
            (this._onDestroyFns = []));
        }
        reset() {
          this.players.forEach((e) => e.reset()),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._started = !1);
        }
        setPosition(e) {
          const t = e * this.totalTime;
          this.players.forEach((e) => {
            const n = e.totalTime ? Math.min(1, t / e.totalTime) : 1;
            e.setPosition(n);
          });
        }
        getPosition() {
          let e = 0;
          return (
            this.players.forEach((t) => {
              const n = t.getPosition();
              e = Math.min(n, e);
            }),
            e
          );
        }
        beforeDestroy() {
          this.players.forEach((e) => {
            e.beforeDestroy && e.beforeDestroy();
          });
        }
        triggerCallback(e) {
          const t = "start" == e ? this._onStartFns : this._onDoneFns;
          t.forEach((e) => e()), (t.length = 0);
        }
      }
      function tf() {
        return "undefined" != typeof process;
      }
      function nf(e) {
        switch (e.length) {
          case 0:
            return new Yp();
          case 1:
            return e[0];
          default:
            return new ef(e);
        }
      }
      function rf(e, t, n, r, s = {}, i = {}) {
        const o = [],
          l = [];
        let a = -1,
          u = null;
        if (
          (r.forEach((e) => {
            const n = e.offset,
              r = n == a,
              c = (r && u) || {};
            Object.keys(e).forEach((n) => {
              let r = n,
                l = e[n];
              if ("offset" !== n)
                switch (((r = t.normalizePropertyName(r, o)), l)) {
                  case "!":
                    l = s[n];
                    break;
                  case "*":
                    l = i[n];
                    break;
                  default:
                    l = t.normalizeStyleValue(n, r, l, o);
                }
              c[r] = l;
            }),
              r || l.push(c),
              (u = c),
              (a = n);
          }),
          o.length)
        ) {
          const e = "\n - ";
          throw new Error(
            `Unable to animate due to the following errors:${e}${o.join(e)}`
          );
        }
        return l;
      }
      function sf(e, t, n, r) {
        switch (t) {
          case "start":
            e.onStart(() => r(n && of(n, "start", e)));
            break;
          case "done":
            e.onDone(() => r(n && of(n, "done", e)));
            break;
          case "destroy":
            e.onDestroy(() => r(n && of(n, "destroy", e)));
        }
      }
      function of(e, t, n) {
        const r = n.totalTime,
          s = lf(
            e.element,
            e.triggerName,
            e.fromState,
            e.toState,
            t || e.phaseName,
            null == r ? e.totalTime : r,
            !!n.disabled
          ),
          i = e._data;
        return null != i && (s._data = i), s;
      }
      function lf(e, t, n, r, s = "", i = 0, o) {
        return {
          element: e,
          triggerName: t,
          fromState: n,
          toState: r,
          phaseName: s,
          totalTime: i,
          disabled: !!o,
        };
      }
      function af(e, t, n) {
        let r;
        return (
          e instanceof Map
            ? ((r = e.get(t)), r || e.set(t, (r = n)))
            : ((r = e[t]), r || (r = e[t] = n)),
          r
        );
      }
      function uf(e) {
        const t = e.indexOf(":");
        return [e.substring(1, t), e.substr(t + 1)];
      }
      let cf = (e, t) => !1,
        hf = (e, t) => !1,
        df = (e, t, n) => [];
      const pf = tf();
      (pf || "undefined" != typeof Element) &&
        ((cf = (e, t) => e.contains(t)),
        (hf = (() => {
          if (pf || Element.prototype.matches) return (e, t) => e.matches(t);
          {
            const e = Element.prototype,
              t =
                e.matchesSelector ||
                e.mozMatchesSelector ||
                e.msMatchesSelector ||
                e.oMatchesSelector ||
                e.webkitMatchesSelector;
            return t ? (e, n) => t.apply(e, [n]) : hf;
          }
        })()),
        (df = (e, t, n) => {
          let r = [];
          if (n) r.push(...e.querySelectorAll(t));
          else {
            const n = e.querySelector(t);
            n && r.push(n);
          }
          return r;
        }));
      let ff = null,
        gf = !1;
      function mf(e) {
        ff ||
          ((ff = ("undefined" != typeof document ? document.body : null) || {}),
          (gf = !!ff.style && "WebkitAppearance" in ff.style));
        let t = !0;
        return (
          ff.style &&
            !(function (e) {
              return "ebkit" == e.substring(1, 6);
            })(e) &&
            ((t = e in ff.style), !t && gf) &&
            (t =
              "Webkit" + e.charAt(0).toUpperCase() + e.substr(1) in ff.style),
          t
        );
      }
      const yf = hf,
        _f = cf,
        vf = df;
      function bf(e) {
        const t = {};
        return (
          Object.keys(e).forEach((n) => {
            const r = n.replace(/([a-z])([A-Z])/g, "$1-$2");
            t[r] = e[n];
          }),
          t
        );
      }
      class wf {
        validateStyleProperty(e) {
          return mf(e);
        }
        matchesElement(e, t) {
          return yf(e, t);
        }
        containsElement(e, t) {
          return _f(e, t);
        }
        query(e, t, n) {
          return vf(e, t, n);
        }
        computeStyle(e, t, n) {
          return n || "";
        }
        animate(e, t, n, r, s, i = [], o) {
          return new Yp(n, r);
        }
      }
      let Cf = (() => {
        class e {}
        return (e.NOOP = new wf()), e;
      })();
      function Sf(e) {
        if ("number" == typeof e) return e;
        const t = e.match(/^(-?[\.\d]+)(m?s)/);
        return !t || t.length < 2 ? 0 : Ef(parseFloat(t[1]), t[2]);
      }
      function Ef(e, t) {
        switch (t) {
          case "s":
            return 1e3 * e;
          default:
            return e;
        }
      }
      function Tf(e, t, n) {
        return e.hasOwnProperty("duration")
          ? e
          : (function (e, t, n) {
              let r,
                s = 0,
                i = "";
              if ("string" == typeof e) {
                const n = e.match(
                  /^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i
                );
                if (null === n)
                  return (
                    t.push(`The provided timing value "${e}" is invalid.`),
                    { duration: 0, delay: 0, easing: "" }
                  );
                r = Ef(parseFloat(n[1]), n[2]);
                const o = n[3];
                null != o && (s = Ef(parseFloat(o), n[4]));
                const l = n[5];
                l && (i = l);
              } else r = e;
              if (!n) {
                let n = !1,
                  i = t.length;
                r < 0 &&
                  (t.push(
                    "Duration values below 0 are not allowed for this animation step."
                  ),
                  (n = !0)),
                  s < 0 &&
                    (t.push(
                      "Delay values below 0 are not allowed for this animation step."
                    ),
                    (n = !0)),
                  n &&
                    t.splice(
                      i,
                      0,
                      `The provided timing value "${e}" is invalid.`
                    );
              }
              return { duration: r, delay: s, easing: i };
            })(e, t, n);
      }
      function xf(e, t = {}) {
        return (
          Object.keys(e).forEach((n) => {
            t[n] = e[n];
          }),
          t
        );
      }
      function kf(e, t, n = {}) {
        if (t) for (let r in e) n[r] = e[r];
        else xf(e, n);
        return n;
      }
      function Af(e, t, n) {
        return n ? t + ":" + n + ";" : "";
      }
      function If(e) {
        let t = "";
        for (let n = 0; n < e.style.length; n++) {
          const r = e.style.item(n);
          t += Af(0, r, e.style.getPropertyValue(r));
        }
        for (const n in e.style)
          e.style.hasOwnProperty(n) &&
            !n.startsWith("_") &&
            (t += Af(
              0,
              n.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(),
              e.style[n]
            ));
        e.setAttribute("style", t);
      }
      function Pf(e, t, n) {
        e.style &&
          (Object.keys(t).forEach((r) => {
            const s = Lf(r);
            n && !n.hasOwnProperty(r) && (n[r] = e.style[s]),
              (e.style[s] = t[r]);
          }),
          tf() && If(e));
      }
      function Nf(e, t) {
        e.style &&
          (Object.keys(t).forEach((t) => {
            const n = Lf(t);
            e.style[n] = "";
          }),
          tf() && If(e));
      }
      function Rf(e) {
        return Array.isArray(e) ? (1 == e.length ? e[0] : Zp(e)) : e;
      }
      const Df = new RegExp("{{\\s*(.+?)\\s*}}", "g");
      function Of(e) {
        let t = [];
        if ("string" == typeof e) {
          const n = e.toString();
          let r;
          for (; (r = Df.exec(n)); ) t.push(r[1]);
          Df.lastIndex = 0;
        }
        return t;
      }
      function Mf(e, t, n) {
        const r = e.toString(),
          s = r.replace(Df, (e, r) => {
            let s = t[r];
            return (
              t.hasOwnProperty(r) ||
                (n.push("Please provide a value for the animation param " + r),
                (s = "")),
              s.toString()
            );
          });
        return s == r ? e : s;
      }
      function Ff(e) {
        const t = [];
        let n = e.next();
        for (; !n.done; ) t.push(n.value), (n = e.next());
        return t;
      }
      const Vf = /-+([a-z0-9])/g;
      function Lf(e) {
        return e.replace(Vf, (...e) => e[1].toUpperCase());
      }
      function Uf(e, t) {
        return 0 === e || 0 === t;
      }
      function jf(e, t, n) {
        const r = Object.keys(n);
        if (r.length && t.length) {
          let i = t[0],
            o = [];
          if (
            (r.forEach((e) => {
              i.hasOwnProperty(e) || o.push(e), (i[e] = n[e]);
            }),
            o.length)
          )
            for (var s = 1; s < t.length; s++) {
              let n = t[s];
              o.forEach(function (t) {
                n[t] = Hf(e, t);
              });
            }
        }
        return t;
      }
      function $f(e, t, n) {
        switch (t.type) {
          case 7:
            return e.visitTrigger(t, n);
          case 0:
            return e.visitState(t, n);
          case 1:
            return e.visitTransition(t, n);
          case 2:
            return e.visitSequence(t, n);
          case 3:
            return e.visitGroup(t, n);
          case 4:
            return e.visitAnimate(t, n);
          case 5:
            return e.visitKeyframes(t, n);
          case 6:
            return e.visitStyle(t, n);
          case 8:
            return e.visitReference(t, n);
          case 9:
            return e.visitAnimateChild(t, n);
          case 10:
            return e.visitAnimateRef(t, n);
          case 11:
            return e.visitQuery(t, n);
          case 12:
            return e.visitStagger(t, n);
          default:
            throw new Error(
              "Unable to resolve animation metadata node #" + t.type
            );
        }
      }
      function Hf(e, t) {
        return window.getComputedStyle(e)[t];
      }
      function Bf(e, t) {
        const n = [];
        return (
          "string" == typeof e
            ? e.split(/\s*,\s*/).forEach((e) =>
                (function (e, t, n) {
                  if (":" == e[0]) {
                    const r = (function (e, t) {
                      switch (e) {
                        case ":enter":
                          return "void => *";
                        case ":leave":
                          return "* => void";
                        case ":increment":
                          return (e, t) => parseFloat(t) > parseFloat(e);
                        case ":decrement":
                          return (e, t) => parseFloat(t) < parseFloat(e);
                        default:
                          return (
                            t.push(
                              `The transition alias value "${e}" is not supported`
                            ),
                            "* => *"
                          );
                      }
                    })(e, n);
                    if ("function" == typeof r) return void t.push(r);
                    e = r;
                  }
                  const r = e.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
                  if (null == r || r.length < 4)
                    return (
                      n.push(
                        `The provided transition expression "${e}" is not supported`
                      ),
                      t
                    );
                  const s = r[1],
                    i = r[2],
                    o = r[3];
                  t.push(Wf(s, o)),
                    "<" != i[0] || ("*" == s && "*" == o) || t.push(Wf(o, s));
                })(e, n, t)
              )
            : n.push(e),
          n
        );
      }
      const zf = new Set(["true", "1"]),
        qf = new Set(["false", "0"]);
      function Wf(e, t) {
        const n = zf.has(e) || qf.has(e),
          r = zf.has(t) || qf.has(t);
        return (s, i) => {
          let o = "*" == e || e == s,
            l = "*" == t || t == i;
          return (
            !o && n && "boolean" == typeof s && (o = s ? zf.has(e) : qf.has(e)),
            !l && r && "boolean" == typeof i && (l = i ? zf.has(t) : qf.has(t)),
            o && l
          );
        };
      }
      const Gf = new RegExp("s*:selfs*,?", "g");
      function Kf(e, t, n) {
        return new Qf(e).build(t, n);
      }
      class Qf {
        constructor(e) {
          this._driver = e;
        }
        build(e, t) {
          const n = new Zf(t);
          return this._resetContextStyleTimingState(n), $f(this, Rf(e), n);
        }
        _resetContextStyleTimingState(e) {
          (e.currentQuerySelector = ""),
            (e.collectedStyles = {}),
            (e.collectedStyles[""] = {}),
            (e.currentTime = 0);
        }
        visitTrigger(e, t) {
          let n = (t.queryCount = 0),
            r = (t.depCount = 0);
          const s = [],
            i = [];
          return (
            "@" == e.name.charAt(0) &&
              t.errors.push(
                "animation triggers cannot be prefixed with an `@` sign (e.g. trigger('@foo', [...]))"
              ),
            e.definitions.forEach((e) => {
              if ((this._resetContextStyleTimingState(t), 0 == e.type)) {
                const n = e,
                  r = n.name;
                r
                  .toString()
                  .split(/\s*,\s*/)
                  .forEach((e) => {
                    (n.name = e), s.push(this.visitState(n, t));
                  }),
                  (n.name = r);
              } else if (1 == e.type) {
                const s = this.visitTransition(e, t);
                (n += s.queryCount), (r += s.depCount), i.push(s);
              } else
                t.errors.push(
                  "only state() and transition() definitions can sit inside of a trigger()"
                );
            }),
            {
              type: 7,
              name: e.name,
              states: s,
              transitions: i,
              queryCount: n,
              depCount: r,
              options: null,
            }
          );
        }
        visitState(e, t) {
          const n = this.visitStyle(e.styles, t),
            r = (e.options && e.options.params) || null;
          if (n.containsDynamicStyles) {
            const s = new Set(),
              i = r || {};
            if (
              (n.styles.forEach((e) => {
                if (Xf(e)) {
                  const t = e;
                  Object.keys(t).forEach((e) => {
                    Of(t[e]).forEach((e) => {
                      i.hasOwnProperty(e) || s.add(e);
                    });
                  });
                }
              }),
              s.size)
            ) {
              const n = Ff(s.values());
              t.errors.push(
                `state("${
                  e.name
                }", ...) must define default values for all the following style substitutions: ${n.join(
                  ", "
                )}`
              );
            }
          }
          return {
            type: 0,
            name: e.name,
            style: n,
            options: r ? { params: r } : null,
          };
        }
        visitTransition(e, t) {
          (t.queryCount = 0), (t.depCount = 0);
          const n = $f(this, Rf(e.animation), t);
          return {
            type: 1,
            matchers: Bf(e.expr, t.errors),
            animation: n,
            queryCount: t.queryCount,
            depCount: t.depCount,
            options: Jf(e.options),
          };
        }
        visitSequence(e, t) {
          return {
            type: 2,
            steps: e.steps.map((e) => $f(this, e, t)),
            options: Jf(e.options),
          };
        }
        visitGroup(e, t) {
          const n = t.currentTime;
          let r = 0;
          const s = e.steps.map((e) => {
            t.currentTime = n;
            const s = $f(this, e, t);
            return (r = Math.max(r, t.currentTime)), s;
          });
          return (
            (t.currentTime = r), { type: 3, steps: s, options: Jf(e.options) }
          );
        }
        visitAnimate(e, t) {
          const n = (function (e, t) {
            let n = null;
            if (e.hasOwnProperty("duration")) n = e;
            else if ("number" == typeof e) return Yf(Tf(e, t).duration, 0, "");
            const r = e;
            if (
              r
                .split(/\s+/)
                .some((e) => "{" == e.charAt(0) && "{" == e.charAt(1))
            ) {
              const e = Yf(0, 0, "");
              return (e.dynamic = !0), (e.strValue = r), e;
            }
            return (n = n || Tf(r, t)), Yf(n.duration, n.delay, n.easing);
          })(e.timings, t.errors);
          let r;
          t.currentAnimateTimings = n;
          let s = e.styles ? e.styles : Xp({});
          if (5 == s.type) r = this.visitKeyframes(s, t);
          else {
            let s = e.styles,
              i = !1;
            if (!s) {
              i = !0;
              const e = {};
              n.easing && (e.easing = n.easing), (s = Xp(e));
            }
            t.currentTime += n.duration + n.delay;
            const o = this.visitStyle(s, t);
            (o.isEmptyStep = i), (r = o);
          }
          return (
            (t.currentAnimateTimings = null),
            { type: 4, timings: n, style: r, options: null }
          );
        }
        visitStyle(e, t) {
          const n = this._makeStyleAst(e, t);
          return this._validateStyleAst(n, t), n;
        }
        _makeStyleAst(e, t) {
          const n = [];
          Array.isArray(e.styles)
            ? e.styles.forEach((e) => {
                "string" == typeof e
                  ? "*" == e
                    ? n.push(e)
                    : t.errors.push(
                        `The provided style string value ${e} is not allowed.`
                      )
                  : n.push(e);
              })
            : n.push(e.styles);
          let r = !1,
            s = null;
          return (
            n.forEach((e) => {
              if (Xf(e)) {
                const t = e,
                  n = t.easing;
                if ((n && ((s = n), delete t.easing), !r))
                  for (let e in t)
                    if (t[e].toString().indexOf("{{") >= 0) {
                      r = !0;
                      break;
                    }
              }
            }),
            {
              type: 6,
              styles: n,
              easing: s,
              offset: e.offset,
              containsDynamicStyles: r,
              options: null,
            }
          );
        }
        _validateStyleAst(e, t) {
          const n = t.currentAnimateTimings;
          let r = t.currentTime,
            s = t.currentTime;
          n && s > 0 && (s -= n.duration + n.delay),
            e.styles.forEach((e) => {
              "string" != typeof e &&
                Object.keys(e).forEach((n) => {
                  if (!this._driver.validateStyleProperty(n))
                    return void t.errors.push(
                      `The provided animation property "${n}" is not a supported CSS property for animations`
                    );
                  const i = t.collectedStyles[t.currentQuerySelector],
                    o = i[n];
                  let l = !0;
                  o &&
                    (s != r &&
                      s >= o.startTime &&
                      r <= o.endTime &&
                      (t.errors.push(
                        `The CSS property "${n}" that exists between the times of "${o.startTime}ms" and "${o.endTime}ms" is also being animated in a parallel animation between the times of "${s}ms" and "${r}ms"`
                      ),
                      (l = !1)),
                    (s = o.startTime)),
                    l && (i[n] = { startTime: s, endTime: r }),
                    t.options &&
                      (function (e, t, n) {
                        const r = t.params || {},
                          s = Of(e);
                        s.length &&
                          s.forEach((e) => {
                            r.hasOwnProperty(e) ||
                              n.push(
                                `Unable to resolve the local animation param ${e} in the given list of values`
                              );
                          });
                      })(e[n], t.options, t.errors);
                });
            });
        }
        visitKeyframes(e, t) {
          const n = { type: 5, styles: [], options: null };
          if (!t.currentAnimateTimings)
            return (
              t.errors.push(
                "keyframes() must be placed inside of a call to animate()"
              ),
              n
            );
          let r = 0;
          const s = [];
          let i = !1,
            o = !1,
            l = 0;
          const a = e.steps.map((e) => {
            const n = this._makeStyleAst(e, t);
            let a =
                null != n.offset
                  ? n.offset
                  : (function (e) {
                      if ("string" == typeof e) return null;
                      let t = null;
                      if (Array.isArray(e))
                        e.forEach((e) => {
                          if (Xf(e) && e.hasOwnProperty("offset")) {
                            const n = e;
                            (t = parseFloat(n.offset)), delete n.offset;
                          }
                        });
                      else if (Xf(e) && e.hasOwnProperty("offset")) {
                        const n = e;
                        (t = parseFloat(n.offset)), delete n.offset;
                      }
                      return t;
                    })(n.styles),
              u = 0;
            return (
              null != a && (r++, (u = n.offset = a)),
              (o = o || u < 0 || u > 1),
              (i = i || u < l),
              (l = u),
              s.push(u),
              n
            );
          });
          o &&
            t.errors.push(
              "Please ensure that all keyframe offsets are between 0 and 1"
            ),
            i &&
              t.errors.push(
                "Please ensure that all keyframe offsets are in order"
              );
          const u = e.steps.length;
          let c = 0;
          r > 0 && r < u
            ? t.errors.push(
                "Not all style() steps within the declared keyframes() contain offsets"
              )
            : 0 == r && (c = 1 / (u - 1));
          const h = u - 1,
            d = t.currentTime,
            p = t.currentAnimateTimings,
            f = p.duration;
          return (
            a.forEach((e, r) => {
              const i = c > 0 ? (r == h ? 1 : c * r) : s[r],
                o = i * f;
              (t.currentTime = d + p.delay + o),
                (p.duration = o),
                this._validateStyleAst(e, t),
                (e.offset = i),
                n.styles.push(e);
            }),
            n
          );
        }
        visitReference(e, t) {
          return {
            type: 8,
            animation: $f(this, Rf(e.animation), t),
            options: Jf(e.options),
          };
        }
        visitAnimateChild(e, t) {
          return t.depCount++, { type: 9, options: Jf(e.options) };
        }
        visitAnimateRef(e, t) {
          return {
            type: 10,
            animation: this.visitReference(e.animation, t),
            options: Jf(e.options),
          };
        }
        visitQuery(e, t) {
          const n = t.currentQuerySelector,
            r = e.options || {};
          t.queryCount++, (t.currentQuery = e);
          const [s, i] = (function (e) {
            const t = !!e.split(/\s*,\s*/).find((e) => ":self" == e);
            return (
              t && (e = e.replace(Gf, "")),
              [
                (e = e
                  .replace(/@\*/g, ".ng-trigger")
                  .replace(/@\w+/g, (e) => ".ng-trigger-" + e.substr(1))
                  .replace(/:animating/g, ".ng-animating")),
                t,
              ]
            );
          })(e.selector);
          (t.currentQuerySelector = n.length ? n + " " + s : s),
            af(t.collectedStyles, t.currentQuerySelector, {});
          const o = $f(this, Rf(e.animation), t);
          return (
            (t.currentQuery = null),
            (t.currentQuerySelector = n),
            {
              type: 11,
              selector: s,
              limit: r.limit || 0,
              optional: !!r.optional,
              includeSelf: i,
              animation: o,
              originalSelector: e.selector,
              options: Jf(e.options),
            }
          );
        }
        visitStagger(e, t) {
          t.currentQuery ||
            t.errors.push("stagger() can only be used inside of query()");
          const n =
            "full" === e.timings
              ? { duration: 0, delay: 0, easing: "full" }
              : Tf(e.timings, t.errors, !0);
          return {
            type: 12,
            animation: $f(this, Rf(e.animation), t),
            timings: n,
            options: null,
          };
        }
      }
      class Zf {
        constructor(e) {
          (this.errors = e),
            (this.queryCount = 0),
            (this.depCount = 0),
            (this.currentTransition = null),
            (this.currentQuery = null),
            (this.currentQuerySelector = null),
            (this.currentAnimateTimings = null),
            (this.currentTime = 0),
            (this.collectedStyles = {}),
            (this.options = null);
        }
      }
      function Xf(e) {
        return !Array.isArray(e) && "object" == typeof e;
      }
      function Jf(e) {
        var t;
        return (
          e
            ? (e = xf(e)).params && (e.params = (t = e.params) ? xf(t) : null)
            : (e = {}),
          e
        );
      }
      function Yf(e, t, n) {
        return { duration: e, delay: t, easing: n };
      }
      function eg(e, t, n, r, s, i, o = null, l = !1) {
        return {
          type: 1,
          element: e,
          keyframes: t,
          preStyleProps: n,
          postStyleProps: r,
          duration: s,
          delay: i,
          totalTime: s + i,
          easing: o,
          subTimeline: l,
        };
      }
      class tg {
        constructor() {
          this._map = new Map();
        }
        consume(e) {
          let t = this._map.get(e);
          return t ? this._map.delete(e) : (t = []), t;
        }
        append(e, t) {
          let n = this._map.get(e);
          n || this._map.set(e, (n = [])), n.push(...t);
        }
        has(e) {
          return this._map.has(e);
        }
        clear() {
          this._map.clear();
        }
      }
      const ng = new RegExp(":enter", "g"),
        rg = new RegExp(":leave", "g");
      function sg(e, t, n, r, s, i = {}, o = {}, l, a, u = []) {
        return new ig().buildKeyframes(e, t, n, r, s, i, o, l, a, u);
      }
      class ig {
        buildKeyframes(e, t, n, r, s, i, o, l, a, u = []) {
          a = a || new tg();
          const c = new lg(e, t, a, r, s, u, []);
          (c.options = l),
            c.currentTimeline.setStyles([i], null, c.errors, l),
            $f(this, n, c);
          const h = c.timelines.filter((e) => e.containsAnimation());
          if (h.length && Object.keys(o).length) {
            const e = h[h.length - 1];
            e.allowOnlyTimelineStyles() || e.setStyles([o], null, c.errors, l);
          }
          return h.length
            ? h.map((e) => e.buildKeyframes())
            : [eg(t, [], [], [], 0, 0, "", !1)];
        }
        visitTrigger(e, t) {}
        visitState(e, t) {}
        visitTransition(e, t) {}
        visitAnimateChild(e, t) {
          const n = t.subInstructions.consume(t.element);
          if (n) {
            const r = t.createSubContext(e.options),
              s = t.currentTimeline.currentTime,
              i = this._visitSubInstructions(n, r, r.options);
            s != i && t.transformIntoNewTimeline(i);
          }
          t.previousNode = e;
        }
        visitAnimateRef(e, t) {
          const n = t.createSubContext(e.options);
          n.transformIntoNewTimeline(),
            this.visitReference(e.animation, n),
            t.transformIntoNewTimeline(n.currentTimeline.currentTime),
            (t.previousNode = e);
        }
        _visitSubInstructions(e, t, n) {
          let r = t.currentTimeline.currentTime;
          const s = null != n.duration ? Sf(n.duration) : null,
            i = null != n.delay ? Sf(n.delay) : null;
          return (
            0 !== s &&
              e.forEach((e) => {
                const n = t.appendInstructionToTimeline(e, s, i);
                r = Math.max(r, n.duration + n.delay);
              }),
            r
          );
        }
        visitReference(e, t) {
          t.updateOptions(e.options, !0),
            $f(this, e.animation, t),
            (t.previousNode = e);
        }
        visitSequence(e, t) {
          const n = t.subContextCount;
          let r = t;
          const s = e.options;
          if (
            s &&
            (s.params || s.delay) &&
            ((r = t.createSubContext(s)),
            r.transformIntoNewTimeline(),
            null != s.delay)
          ) {
            6 == r.previousNode.type &&
              (r.currentTimeline.snapshotCurrentStyles(),
              (r.previousNode = og));
            const e = Sf(s.delay);
            r.delayNextStep(e);
          }
          e.steps.length &&
            (e.steps.forEach((e) => $f(this, e, r)),
            r.currentTimeline.applyStylesToKeyframe(),
            r.subContextCount > n && r.transformIntoNewTimeline()),
            (t.previousNode = e);
        }
        visitGroup(e, t) {
          const n = [];
          let r = t.currentTimeline.currentTime;
          const s = e.options && e.options.delay ? Sf(e.options.delay) : 0;
          e.steps.forEach((i) => {
            const o = t.createSubContext(e.options);
            s && o.delayNextStep(s),
              $f(this, i, o),
              (r = Math.max(r, o.currentTimeline.currentTime)),
              n.push(o.currentTimeline);
          }),
            n.forEach((e) => t.currentTimeline.mergeTimelineCollectedStyles(e)),
            t.transformIntoNewTimeline(r),
            (t.previousNode = e);
        }
        _visitTiming(e, t) {
          if (e.dynamic) {
            const n = e.strValue;
            return Tf(t.params ? Mf(n, t.params, t.errors) : n, t.errors);
          }
          return { duration: e.duration, delay: e.delay, easing: e.easing };
        }
        visitAnimate(e, t) {
          const n = (t.currentAnimateTimings = this._visitTiming(e.timings, t)),
            r = t.currentTimeline;
          n.delay && (t.incrementTime(n.delay), r.snapshotCurrentStyles());
          const s = e.style;
          5 == s.type
            ? this.visitKeyframes(s, t)
            : (t.incrementTime(n.duration),
              this.visitStyle(s, t),
              r.applyStylesToKeyframe()),
            (t.currentAnimateTimings = null),
            (t.previousNode = e);
        }
        visitStyle(e, t) {
          const n = t.currentTimeline,
            r = t.currentAnimateTimings;
          !r && n.getCurrentStyleProperties().length && n.forwardFrame();
          const s = (r && r.easing) || e.easing;
          e.isEmptyStep
            ? n.applyEmptyStep(s)
            : n.setStyles(e.styles, s, t.errors, t.options),
            (t.previousNode = e);
        }
        visitKeyframes(e, t) {
          const n = t.currentAnimateTimings,
            r = t.currentTimeline.duration,
            s = n.duration,
            i = t.createSubContext().currentTimeline;
          (i.easing = n.easing),
            e.styles.forEach((e) => {
              i.forwardTime((e.offset || 0) * s),
                i.setStyles(e.styles, e.easing, t.errors, t.options),
                i.applyStylesToKeyframe();
            }),
            t.currentTimeline.mergeTimelineCollectedStyles(i),
            t.transformIntoNewTimeline(r + s),
            (t.previousNode = e);
        }
        visitQuery(e, t) {
          const n = t.currentTimeline.currentTime,
            r = e.options || {},
            s = r.delay ? Sf(r.delay) : 0;
          s &&
            (6 === t.previousNode.type ||
              (0 == n &&
                t.currentTimeline.getCurrentStyleProperties().length)) &&
            (t.currentTimeline.snapshotCurrentStyles(), (t.previousNode = og));
          let i = n;
          const o = t.invokeQuery(
            e.selector,
            e.originalSelector,
            e.limit,
            e.includeSelf,
            !!r.optional,
            t.errors
          );
          t.currentQueryTotal = o.length;
          let l = null;
          o.forEach((n, r) => {
            t.currentQueryIndex = r;
            const o = t.createSubContext(e.options, n);
            s && o.delayNextStep(s),
              n === t.element && (l = o.currentTimeline),
              $f(this, e.animation, o),
              o.currentTimeline.applyStylesToKeyframe(),
              (i = Math.max(i, o.currentTimeline.currentTime));
          }),
            (t.currentQueryIndex = 0),
            (t.currentQueryTotal = 0),
            t.transformIntoNewTimeline(i),
            l &&
              (t.currentTimeline.mergeTimelineCollectedStyles(l),
              t.currentTimeline.snapshotCurrentStyles()),
            (t.previousNode = e);
        }
        visitStagger(e, t) {
          const n = t.parentContext,
            r = t.currentTimeline,
            s = e.timings,
            i = Math.abs(s.duration),
            o = i * (t.currentQueryTotal - 1);
          let l = i * t.currentQueryIndex;
          switch (s.duration < 0 ? "reverse" : s.easing) {
            case "reverse":
              l = o - l;
              break;
            case "full":
              l = n.currentStaggerTime;
          }
          const a = t.currentTimeline;
          l && a.delayNextStep(l);
          const u = a.currentTime;
          $f(this, e.animation, t),
            (t.previousNode = e),
            (n.currentStaggerTime =
              r.currentTime - u + (r.startTime - n.currentTimeline.startTime));
        }
      }
      const og = {};
      class lg {
        constructor(e, t, n, r, s, i, o, l) {
          (this._driver = e),
            (this.element = t),
            (this.subInstructions = n),
            (this._enterClassName = r),
            (this._leaveClassName = s),
            (this.errors = i),
            (this.timelines = o),
            (this.parentContext = null),
            (this.currentAnimateTimings = null),
            (this.previousNode = og),
            (this.subContextCount = 0),
            (this.options = {}),
            (this.currentQueryIndex = 0),
            (this.currentQueryTotal = 0),
            (this.currentStaggerTime = 0),
            (this.currentTimeline = l || new ag(this._driver, t, 0)),
            o.push(this.currentTimeline);
        }
        get params() {
          return this.options.params;
        }
        updateOptions(e, t) {
          if (!e) return;
          const n = e;
          let r = this.options;
          null != n.duration && (r.duration = Sf(n.duration)),
            null != n.delay && (r.delay = Sf(n.delay));
          const s = n.params;
          if (s) {
            let e = r.params;
            e || (e = this.options.params = {}),
              Object.keys(s).forEach((n) => {
                (t && e.hasOwnProperty(n)) || (e[n] = Mf(s[n], e, this.errors));
              });
          }
        }
        _copyOptions() {
          const e = {};
          if (this.options) {
            const t = this.options.params;
            if (t) {
              const n = (e.params = {});
              Object.keys(t).forEach((e) => {
                n[e] = t[e];
              });
            }
          }
          return e;
        }
        createSubContext(e = null, t, n) {
          const r = t || this.element,
            s = new lg(
              this._driver,
              r,
              this.subInstructions,
              this._enterClassName,
              this._leaveClassName,
              this.errors,
              this.timelines,
              this.currentTimeline.fork(r, n || 0)
            );
          return (
            (s.previousNode = this.previousNode),
            (s.currentAnimateTimings = this.currentAnimateTimings),
            (s.options = this._copyOptions()),
            s.updateOptions(e),
            (s.currentQueryIndex = this.currentQueryIndex),
            (s.currentQueryTotal = this.currentQueryTotal),
            (s.parentContext = this),
            this.subContextCount++,
            s
          );
        }
        transformIntoNewTimeline(e) {
          return (
            (this.previousNode = og),
            (this.currentTimeline = this.currentTimeline.fork(this.element, e)),
            this.timelines.push(this.currentTimeline),
            this.currentTimeline
          );
        }
        appendInstructionToTimeline(e, t, n) {
          const r = {
              duration: null != t ? t : e.duration,
              delay:
                this.currentTimeline.currentTime +
                (null != n ? n : 0) +
                e.delay,
              easing: "",
            },
            s = new ug(
              this._driver,
              e.element,
              e.keyframes,
              e.preStyleProps,
              e.postStyleProps,
              r,
              e.stretchStartingKeyframe
            );
          return this.timelines.push(s), r;
        }
        incrementTime(e) {
          this.currentTimeline.forwardTime(this.currentTimeline.duration + e);
        }
        delayNextStep(e) {
          e > 0 && this.currentTimeline.delayNextStep(e);
        }
        invokeQuery(e, t, n, r, s, i) {
          let o = [];
          if ((r && o.push(this.element), e.length > 0)) {
            e = (e = e.replace(ng, "." + this._enterClassName)).replace(
              rg,
              "." + this._leaveClassName
            );
            let t = this._driver.query(this.element, e, 1 != n);
            0 !== n &&
              (t = n < 0 ? t.slice(t.length + n, t.length) : t.slice(0, n)),
              o.push(...t);
          }
          return (
            s ||
              0 != o.length ||
              i.push(
                `\`query("${t}")\` returned zero elements. (Use \`query("${t}", { optional: true })\` if you wish to allow this.)`
              ),
            o
          );
        }
      }
      class ag {
        constructor(e, t, n, r) {
          (this._driver = e),
            (this.element = t),
            (this.startTime = n),
            (this._elementTimelineStylesLookup = r),
            (this.duration = 0),
            (this._previousKeyframe = {}),
            (this._currentKeyframe = {}),
            (this._keyframes = new Map()),
            (this._styleSummary = {}),
            (this._pendingStyles = {}),
            (this._backFill = {}),
            (this._currentEmptyStepKeyframe = null),
            this._elementTimelineStylesLookup ||
              (this._elementTimelineStylesLookup = new Map()),
            (this._localTimelineStyles = Object.create(this._backFill, {})),
            (this._globalTimelineStyles =
              this._elementTimelineStylesLookup.get(t)),
            this._globalTimelineStyles ||
              ((this._globalTimelineStyles = this._localTimelineStyles),
              this._elementTimelineStylesLookup.set(
                t,
                this._localTimelineStyles
              )),
            this._loadKeyframe();
        }
        containsAnimation() {
          switch (this._keyframes.size) {
            case 0:
              return !1;
            case 1:
              return this.getCurrentStyleProperties().length > 0;
            default:
              return !0;
          }
        }
        getCurrentStyleProperties() {
          return Object.keys(this._currentKeyframe);
        }
        get currentTime() {
          return this.startTime + this.duration;
        }
        delayNextStep(e) {
          const t =
            1 == this._keyframes.size &&
            Object.keys(this._pendingStyles).length;
          this.duration || t
            ? (this.forwardTime(this.currentTime + e),
              t && this.snapshotCurrentStyles())
            : (this.startTime += e);
        }
        fork(e, t) {
          return (
            this.applyStylesToKeyframe(),
            new ag(
              this._driver,
              e,
              t || this.currentTime,
              this._elementTimelineStylesLookup
            )
          );
        }
        _loadKeyframe() {
          this._currentKeyframe &&
            (this._previousKeyframe = this._currentKeyframe),
            (this._currentKeyframe = this._keyframes.get(this.duration)),
            this._currentKeyframe ||
              ((this._currentKeyframe = Object.create(this._backFill, {})),
              this._keyframes.set(this.duration, this._currentKeyframe));
        }
        forwardFrame() {
          (this.duration += 1), this._loadKeyframe();
        }
        forwardTime(e) {
          this.applyStylesToKeyframe(),
            (this.duration = e),
            this._loadKeyframe();
        }
        _updateStyle(e, t) {
          (this._localTimelineStyles[e] = t),
            (this._globalTimelineStyles[e] = t),
            (this._styleSummary[e] = { time: this.currentTime, value: t });
        }
        allowOnlyTimelineStyles() {
          return this._currentEmptyStepKeyframe !== this._currentKeyframe;
        }
        applyEmptyStep(e) {
          e && (this._previousKeyframe.easing = e),
            Object.keys(this._globalTimelineStyles).forEach((e) => {
              (this._backFill[e] = this._globalTimelineStyles[e] || "*"),
                (this._currentKeyframe[e] = "*");
            }),
            (this._currentEmptyStepKeyframe = this._currentKeyframe);
        }
        setStyles(e, t, n, r) {
          t && (this._previousKeyframe.easing = t);
          const s = (r && r.params) || {},
            i = (function (e, t) {
              const n = {};
              let r;
              return (
                e.forEach((e) => {
                  "*" === e
                    ? ((r = r || Object.keys(t)),
                      r.forEach((e) => {
                        n[e] = "*";
                      }))
                    : kf(e, !1, n);
                }),
                n
              );
            })(e, this._globalTimelineStyles);
          Object.keys(i).forEach((e) => {
            const t = Mf(i[e], s, n);
            (this._pendingStyles[e] = t),
              this._localTimelineStyles.hasOwnProperty(e) ||
                (this._backFill[e] = this._globalTimelineStyles.hasOwnProperty(
                  e
                )
                  ? this._globalTimelineStyles[e]
                  : "*"),
              this._updateStyle(e, t);
          });
        }
        applyStylesToKeyframe() {
          const e = this._pendingStyles,
            t = Object.keys(e);
          0 != t.length &&
            ((this._pendingStyles = {}),
            t.forEach((t) => {
              this._currentKeyframe[t] = e[t];
            }),
            Object.keys(this._localTimelineStyles).forEach((e) => {
              this._currentKeyframe.hasOwnProperty(e) ||
                (this._currentKeyframe[e] = this._localTimelineStyles[e]);
            }));
        }
        snapshotCurrentStyles() {
          Object.keys(this._localTimelineStyles).forEach((e) => {
            const t = this._localTimelineStyles[e];
            (this._pendingStyles[e] = t), this._updateStyle(e, t);
          });
        }
        getFinalKeyframe() {
          return this._keyframes.get(this.duration);
        }
        get properties() {
          const e = [];
          for (let t in this._currentKeyframe) e.push(t);
          return e;
        }
        mergeTimelineCollectedStyles(e) {
          Object.keys(e._styleSummary).forEach((t) => {
            const n = this._styleSummary[t],
              r = e._styleSummary[t];
            (!n || r.time > n.time) && this._updateStyle(t, r.value);
          });
        }
        buildKeyframes() {
          this.applyStylesToKeyframe();
          const e = new Set(),
            t = new Set(),
            n = 1 === this._keyframes.size && 0 === this.duration;
          let r = [];
          this._keyframes.forEach((s, i) => {
            const o = kf(s, !0);
            Object.keys(o).forEach((n) => {
              const r = o[n];
              "!" == r ? e.add(n) : "*" == r && t.add(n);
            }),
              n || (o.offset = i / this.duration),
              r.push(o);
          });
          const s = e.size ? Ff(e.values()) : [],
            i = t.size ? Ff(t.values()) : [];
          if (n) {
            const e = r[0],
              t = xf(e);
            (e.offset = 0), (t.offset = 1), (r = [e, t]);
          }
          return eg(
            this.element,
            r,
            s,
            i,
            this.duration,
            this.startTime,
            this.easing,
            !1
          );
        }
      }
      class ug extends ag {
        constructor(e, t, n, r, s, i, o = !1) {
          super(e, t, i.delay),
            (this.element = t),
            (this.keyframes = n),
            (this.preStyleProps = r),
            (this.postStyleProps = s),
            (this._stretchStartingKeyframe = o),
            (this.timings = {
              duration: i.duration,
              delay: i.delay,
              easing: i.easing,
            });
        }
        containsAnimation() {
          return this.keyframes.length > 1;
        }
        buildKeyframes() {
          let e = this.keyframes,
            { delay: t, duration: n, easing: r } = this.timings;
          if (this._stretchStartingKeyframe && t) {
            const s = [],
              i = n + t,
              o = t / i,
              l = kf(e[0], !1);
            (l.offset = 0), s.push(l);
            const a = kf(e[0], !1);
            (a.offset = cg(o)), s.push(a);
            const u = e.length - 1;
            for (let r = 1; r <= u; r++) {
              let o = kf(e[r], !1);
              (o.offset = cg((t + o.offset * n) / i)), s.push(o);
            }
            (n = i), (t = 0), (r = ""), (e = s);
          }
          return eg(
            this.element,
            e,
            this.preStyleProps,
            this.postStyleProps,
            n,
            t,
            r,
            !0
          );
        }
      }
      function cg(e, t = 3) {
        const n = Math.pow(10, t - 1);
        return Math.round(e * n) / n;
      }
      class hg {}
      class dg extends hg {
        normalizePropertyName(e, t) {
          return Lf(e);
        }
        normalizeStyleValue(e, t, n, r) {
          let s = "";
          const i = n.toString().trim();
          if (pg[t] && 0 !== n && "0" !== n)
            if ("number" == typeof n) s = "px";
            else {
              const t = n.match(/^[+-]?[\d\.]+([a-z]*)$/);
              t &&
                0 == t[1].length &&
                r.push(`Please provide a CSS unit value for ${e}:${n}`);
            }
          return i + s;
        }
      }
      const pg = (() =>
        (function (e) {
          const t = {};
          return e.forEach((e) => (t[e] = !0)), t;
        })(
          "width,height,minWidth,minHeight,maxWidth,maxHeight,left,top,bottom,right,fontSize,outlineWidth,outlineOffset,paddingTop,paddingLeft,paddingBottom,paddingRight,marginTop,marginLeft,marginBottom,marginRight,borderRadius,borderWidth,borderTopWidth,borderLeftWidth,borderRightWidth,borderBottomWidth,textIndent,perspective".split(
            ","
          )
        ))();
      function fg(e, t, n, r, s, i, o, l, a, u, c, h, d) {
        return {
          type: 0,
          element: e,
          triggerName: t,
          isRemovalTransition: s,
          fromState: n,
          fromStyles: i,
          toState: r,
          toStyles: o,
          timelines: l,
          queriedElements: a,
          preStyleProps: u,
          postStyleProps: c,
          totalTime: h,
          errors: d,
        };
      }
      const gg = {};
      class mg {
        constructor(e, t, n) {
          (this._triggerName = e), (this.ast = t), (this._stateStyles = n);
        }
        match(e, t, n, r) {
          return (function (e, t, n, r, s) {
            return e.some((e) => e(t, n, r, s));
          })(this.ast.matchers, e, t, n, r);
        }
        buildStyles(e, t, n) {
          const r = this._stateStyles["*"],
            s = this._stateStyles[e],
            i = r ? r.buildStyles(t, n) : {};
          return s ? s.buildStyles(t, n) : i;
        }
        build(e, t, n, r, s, i, o, l, a, u) {
          const c = [],
            h = (this.ast.options && this.ast.options.params) || gg,
            d = this.buildStyles(n, (o && o.params) || gg, c),
            p = (l && l.params) || gg,
            f = this.buildStyles(r, p, c),
            g = new Set(),
            m = new Map(),
            y = new Map(),
            _ = "void" === r,
            v = { params: Object.assign({}, h, p) },
            b = u ? [] : sg(e, t, this.ast.animation, s, i, d, f, v, a, c);
          let w = 0;
          if (
            (b.forEach((e) => {
              w = Math.max(e.duration + e.delay, w);
            }),
            c.length)
          )
            return fg(t, this._triggerName, n, r, _, d, f, [], [], m, y, w, c);
          b.forEach((e) => {
            const n = e.element,
              r = af(m, n, {});
            e.preStyleProps.forEach((e) => (r[e] = !0));
            const s = af(y, n, {});
            e.postStyleProps.forEach((e) => (s[e] = !0)), n !== t && g.add(n);
          });
          const C = Ff(g.values());
          return fg(t, this._triggerName, n, r, _, d, f, b, C, m, y, w);
        }
      }
      class yg {
        constructor(e, t) {
          (this.styles = e), (this.defaultParams = t);
        }
        buildStyles(e, t) {
          const n = {},
            r = xf(this.defaultParams);
          return (
            Object.keys(e).forEach((t) => {
              const n = e[t];
              null != n && (r[t] = n);
            }),
            this.styles.styles.forEach((e) => {
              if ("string" != typeof e) {
                const s = e;
                Object.keys(s).forEach((e) => {
                  let i = s[e];
                  i.length > 1 && (i = Mf(i, r, t)), (n[e] = i);
                });
              }
            }),
            n
          );
        }
      }
      class _g {
        constructor(e, t) {
          (this.name = e),
            (this.ast = t),
            (this.transitionFactories = []),
            (this.states = {}),
            t.states.forEach((e) => {
              this.states[e.name] = new yg(
                e.style,
                (e.options && e.options.params) || {}
              );
            }),
            vg(this.states, "true", "1"),
            vg(this.states, "false", "0"),
            t.transitions.forEach((t) => {
              this.transitionFactories.push(new mg(e, t, this.states));
            }),
            (this.fallbackTransition = new mg(
              e,
              {
                type: 1,
                animation: { type: 2, steps: [], options: null },
                matchers: [(e, t) => !0],
                options: null,
                queryCount: 0,
                depCount: 0,
              },
              this.states
            ));
        }
        get containsQueries() {
          return this.ast.queryCount > 0;
        }
        matchTransition(e, t, n, r) {
          return (
            this.transitionFactories.find((s) => s.match(e, t, n, r)) || null
          );
        }
        matchStyles(e, t, n) {
          return this.fallbackTransition.buildStyles(e, t, n);
        }
      }
      function vg(e, t, n) {
        e.hasOwnProperty(t)
          ? e.hasOwnProperty(n) || (e[n] = e[t])
          : e.hasOwnProperty(n) && (e[t] = e[n]);
      }
      const bg = new tg();
      class wg {
        constructor(e, t, n) {
          (this.bodyNode = e),
            (this._driver = t),
            (this._normalizer = n),
            (this._animations = {}),
            (this._playersById = {}),
            (this.players = []);
        }
        register(e, t) {
          const n = [],
            r = Kf(this._driver, t, n);
          if (n.length)
            throw new Error(
              "Unable to build the animation due to the following errors: " +
                n.join("\n")
            );
          this._animations[e] = r;
        }
        _buildPlayer(e, t, n) {
          const r = e.element,
            s = rf(0, this._normalizer, 0, e.keyframes, t, n);
          return this._driver.animate(
            r,
            s,
            e.duration,
            e.delay,
            e.easing,
            [],
            !0
          );
        }
        create(e, t, n = {}) {
          const r = [],
            s = this._animations[e];
          let i;
          const o = new Map();
          if (
            (s
              ? ((i = sg(
                  this._driver,
                  t,
                  s,
                  "ng-enter",
                  "ng-leave",
                  {},
                  {},
                  n,
                  bg,
                  r
                )),
                i.forEach((e) => {
                  const t = af(o, e.element, {});
                  e.postStyleProps.forEach((e) => (t[e] = null));
                }))
              : (r.push(
                  "The requested animation doesn't exist or has already been destroyed"
                ),
                (i = [])),
            r.length)
          )
            throw new Error(
              "Unable to create the animation due to the following errors: " +
                r.join("\n")
            );
          o.forEach((e, t) => {
            Object.keys(e).forEach((n) => {
              e[n] = this._driver.computeStyle(t, n, "*");
            });
          });
          const l = nf(
            i.map((e) => {
              const t = o.get(e.element);
              return this._buildPlayer(e, {}, t);
            })
          );
          return (
            (this._playersById[e] = l),
            l.onDestroy(() => this.destroy(e)),
            this.players.push(l),
            l
          );
        }
        destroy(e) {
          const t = this._getPlayer(e);
          t.destroy(), delete this._playersById[e];
          const n = this.players.indexOf(t);
          n >= 0 && this.players.splice(n, 1);
        }
        _getPlayer(e) {
          const t = this._playersById[e];
          if (!t)
            throw new Error(
              "Unable to find the timeline player referenced by " + e
            );
          return t;
        }
        listen(e, t, n, r) {
          const s = lf(t, "", "", "");
          return sf(this._getPlayer(e), n, s, r), () => {};
        }
        command(e, t, n, r) {
          if ("register" == n) return void this.register(e, r[0]);
          if ("create" == n) return void this.create(e, t, r[0] || {});
          const s = this._getPlayer(e);
          switch (n) {
            case "play":
              s.play();
              break;
            case "pause":
              s.pause();
              break;
            case "reset":
              s.reset();
              break;
            case "restart":
              s.restart();
              break;
            case "finish":
              s.finish();
              break;
            case "init":
              s.init();
              break;
            case "setPosition":
              s.setPosition(parseFloat(r[0]));
              break;
            case "destroy":
              this.destroy(e);
          }
        }
      }
      const Cg = [],
        Sg = {
          namespaceId: "",
          setForRemoval: !1,
          setForMove: !1,
          hasAnimation: !1,
          removedBeforeQueried: !1,
        },
        Eg = {
          namespaceId: "",
          setForMove: !1,
          setForRemoval: !1,
          hasAnimation: !1,
          removedBeforeQueried: !0,
        };
      class Tg {
        constructor(e, t = "") {
          this.namespaceId = t;
          const n = e && e.hasOwnProperty("value");
          if (((this.value = null != (r = n ? e.value : e) ? r : null), n)) {
            const t = xf(e);
            delete t.value, (this.options = t);
          } else this.options = {};
          var r;
          this.options.params || (this.options.params = {});
        }
        get params() {
          return this.options.params;
        }
        absorbOptions(e) {
          const t = e.params;
          if (t) {
            const e = this.options.params;
            Object.keys(t).forEach((n) => {
              null == e[n] && (e[n] = t[n]);
            });
          }
        }
      }
      const xg = new Tg("void");
      class kg {
        constructor(e, t, n) {
          (this.id = e),
            (this.hostElement = t),
            (this._engine = n),
            (this.players = []),
            (this._triggers = {}),
            (this._queue = []),
            (this._elementListeners = new Map()),
            (this._hostClassName = "ng-tns-" + e),
            Og(t, this._hostClassName);
        }
        listen(e, t, n, r) {
          if (!this._triggers.hasOwnProperty(t))
            throw new Error(
              `Unable to listen on the animation trigger event "${n}" because the animation trigger "${t}" doesn't exist!`
            );
          if (null == n || 0 == n.length)
            throw new Error(
              `Unable to listen on the animation trigger "${t}" because the provided event is undefined!`
            );
          if ("start" != (s = n) && "done" != s)
            throw new Error(
              `The provided animation trigger event "${n}" for the animation trigger "${t}" is not supported!`
            );
          var s;
          const i = af(this._elementListeners, e, []),
            o = { name: t, phase: n, callback: r };
          i.push(o);
          const l = af(this._engine.statesByElement, e, {});
          return (
            l.hasOwnProperty(t) ||
              (Og(e, "ng-trigger"), Og(e, "ng-trigger-" + t), (l[t] = xg)),
            () => {
              this._engine.afterFlush(() => {
                const e = i.indexOf(o);
                e >= 0 && i.splice(e, 1), this._triggers[t] || delete l[t];
              });
            }
          );
        }
        register(e, t) {
          return !this._triggers[e] && ((this._triggers[e] = t), !0);
        }
        _getTrigger(e) {
          const t = this._triggers[e];
          if (!t)
            throw new Error(
              `The provided animation trigger "${e}" has not been registered!`
            );
          return t;
        }
        trigger(e, t, n, r = !0) {
          const s = this._getTrigger(t),
            i = new Ig(this.id, t, e);
          let o = this._engine.statesByElement.get(e);
          o ||
            (Og(e, "ng-trigger"),
            Og(e, "ng-trigger-" + t),
            this._engine.statesByElement.set(e, (o = {})));
          let l = o[t];
          const a = new Tg(n, this.id);
          if (
            (!(n && n.hasOwnProperty("value")) &&
              l &&
              a.absorbOptions(l.options),
            (o[t] = a),
            l || (l = xg),
            "void" !== a.value && l.value === a.value)
          ) {
            if (
              !(function (e, t) {
                const n = Object.keys(e),
                  r = Object.keys(t);
                if (n.length != r.length) return !1;
                for (let s = 0; s < n.length; s++) {
                  const r = n[s];
                  if (!t.hasOwnProperty(r) || e[r] !== t[r]) return !1;
                }
                return !0;
              })(l.params, a.params)
            ) {
              const t = [],
                n = s.matchStyles(l.value, l.params, t),
                r = s.matchStyles(a.value, a.params, t);
              t.length
                ? this._engine.reportError(t)
                : this._engine.afterFlush(() => {
                    Nf(e, n), Pf(e, r);
                  });
            }
            return;
          }
          const u = af(this._engine.playersByElement, e, []);
          u.forEach((e) => {
            e.namespaceId == this.id &&
              e.triggerName == t &&
              e.queued &&
              e.destroy();
          });
          let c = s.matchTransition(l.value, a.value, e, a.params),
            h = !1;
          if (!c) {
            if (!r) return;
            (c = s.fallbackTransition), (h = !0);
          }
          return (
            this._engine.totalQueuedPlayers++,
            this._queue.push({
              element: e,
              triggerName: t,
              transition: c,
              fromState: l,
              toState: a,
              player: i,
              isFallbackTransition: h,
            }),
            h ||
              (Og(e, "ng-animate-queued"),
              i.onStart(() => {
                Mg(e, "ng-animate-queued");
              })),
            i.onDone(() => {
              let t = this.players.indexOf(i);
              t >= 0 && this.players.splice(t, 1);
              const n = this._engine.playersByElement.get(e);
              if (n) {
                let e = n.indexOf(i);
                e >= 0 && n.splice(e, 1);
              }
            }),
            this.players.push(i),
            u.push(i),
            i
          );
        }
        deregister(e) {
          delete this._triggers[e],
            this._engine.statesByElement.forEach((t, n) => {
              delete t[e];
            }),
            this._elementListeners.forEach((t, n) => {
              this._elementListeners.set(
                n,
                t.filter((t) => t.name != e)
              );
            });
        }
        clearElementCache(e) {
          this._engine.statesByElement.delete(e),
            this._elementListeners.delete(e);
          const t = this._engine.playersByElement.get(e);
          t &&
            (t.forEach((e) => e.destroy()),
            this._engine.playersByElement.delete(e));
        }
        _signalRemovalForInnerTriggers(e, t, n = !1) {
          this._engine.driver.query(e, ".ng-trigger", !0).forEach((e) => {
            if (e.__ng_removed) return;
            const n = this._engine.fetchNamespacesByElement(e);
            n.size
              ? n.forEach((n) => n.triggerLeaveAnimation(e, t, !1, !0))
              : this.clearElementCache(e);
          });
        }
        triggerLeaveAnimation(e, t, n, r) {
          const s = this._engine.statesByElement.get(e);
          if (s) {
            const i = [];
            if (
              (Object.keys(s).forEach((t) => {
                if (this._triggers[t]) {
                  const n = this.trigger(e, t, "void", r);
                  n && i.push(n);
                }
              }),
              i.length)
            )
              return (
                this._engine.markElementAsRemoved(this.id, e, !0, t),
                n && nf(i).onDone(() => this._engine.processLeaveNode(e)),
                !0
              );
          }
          return !1;
        }
        prepareLeaveAnimationListeners(e) {
          const t = this._elementListeners.get(e);
          if (t) {
            const n = new Set();
            t.forEach((t) => {
              const r = t.name;
              if (n.has(r)) return;
              n.add(r);
              const s = this._triggers[r].fallbackTransition,
                i = this._engine.statesByElement.get(e)[r] || xg,
                o = new Tg("void"),
                l = new Ig(this.id, r, e);
              this._engine.totalQueuedPlayers++,
                this._queue.push({
                  element: e,
                  triggerName: r,
                  transition: s,
                  fromState: i,
                  toState: o,
                  player: l,
                  isFallbackTransition: !0,
                });
            });
          }
        }
        removeNode(e, t) {
          const n = this._engine;
          if (
            (e.childElementCount &&
              this._signalRemovalForInnerTriggers(e, t, !0),
            this.triggerLeaveAnimation(e, t, !0))
          )
            return;
          let r = !1;
          if (n.totalAnimations) {
            const t = n.players.length ? n.playersByQueriedElement.get(e) : [];
            if (t && t.length) r = !0;
            else {
              let t = e;
              for (; (t = t.parentNode); )
                if (n.statesByElement.get(t)) {
                  r = !0;
                  break;
                }
            }
          }
          this.prepareLeaveAnimationListeners(e),
            r
              ? n.markElementAsRemoved(this.id, e, !1, t)
              : (n.afterFlush(() => this.clearElementCache(e)),
                n.destroyInnerAnimations(e),
                n._onRemovalComplete(e, t));
        }
        insertNode(e, t) {
          Og(e, this._hostClassName);
        }
        drainQueuedTransitions(e) {
          const t = [];
          return (
            this._queue.forEach((n) => {
              const r = n.player;
              if (r.destroyed) return;
              const s = n.element,
                i = this._elementListeners.get(s);
              i &&
                i.forEach((t) => {
                  if (t.name == n.triggerName) {
                    const r = lf(
                      s,
                      n.triggerName,
                      n.fromState.value,
                      n.toState.value
                    );
                    (r._data = e), sf(n.player, t.phase, r, t.callback);
                  }
                }),
                r.markedForDestroy
                  ? this._engine.afterFlush(() => {
                      r.destroy();
                    })
                  : t.push(n);
            }),
            (this._queue = []),
            t.sort((e, t) => {
              const n = e.transition.ast.depCount,
                r = t.transition.ast.depCount;
              return 0 == n || 0 == r
                ? n - r
                : this._engine.driver.containsElement(e.element, t.element)
                ? 1
                : -1;
            })
          );
        }
        destroy(e) {
          this.players.forEach((e) => e.destroy()),
            this._signalRemovalForInnerTriggers(this.hostElement, e);
        }
        elementContainsData(e) {
          let t = !1;
          return (
            this._elementListeners.has(e) && (t = !0),
            (t = !!this._queue.find((t) => t.element === e) || t),
            t
          );
        }
      }
      class Ag {
        constructor(e, t, n) {
          (this.bodyNode = e),
            (this.driver = t),
            (this._normalizer = n),
            (this.players = []),
            (this.newHostElements = new Map()),
            (this.playersByElement = new Map()),
            (this.playersByQueriedElement = new Map()),
            (this.statesByElement = new Map()),
            (this.disabledNodes = new Set()),
            (this.totalAnimations = 0),
            (this.totalQueuedPlayers = 0),
            (this._namespaceLookup = {}),
            (this._namespaceList = []),
            (this._flushFns = []),
            (this._whenQuietFns = []),
            (this.namespacesByHostElement = new Map()),
            (this.collectedEnterElements = []),
            (this.collectedLeaveElements = []),
            (this.onRemovalComplete = (e, t) => {});
        }
        _onRemovalComplete(e, t) {
          this.onRemovalComplete(e, t);
        }
        get queuedPlayers() {
          const e = [];
          return (
            this._namespaceList.forEach((t) => {
              t.players.forEach((t) => {
                t.queued && e.push(t);
              });
            }),
            e
          );
        }
        createNamespace(e, t) {
          const n = new kg(e, t, this);
          return (
            t.parentNode
              ? this._balanceNamespaceList(n, t)
              : (this.newHostElements.set(t, n), this.collectEnterElement(t)),
            (this._namespaceLookup[e] = n)
          );
        }
        _balanceNamespaceList(e, t) {
          const n = this._namespaceList.length - 1;
          if (n >= 0) {
            let r = !1;
            for (let s = n; s >= 0; s--)
              if (
                this.driver.containsElement(
                  this._namespaceList[s].hostElement,
                  t
                )
              ) {
                this._namespaceList.splice(s + 1, 0, e), (r = !0);
                break;
              }
            r || this._namespaceList.splice(0, 0, e);
          } else this._namespaceList.push(e);
          return this.namespacesByHostElement.set(t, e), e;
        }
        register(e, t) {
          let n = this._namespaceLookup[e];
          return n || (n = this.createNamespace(e, t)), n;
        }
        registerTrigger(e, t, n) {
          let r = this._namespaceLookup[e];
          r && r.register(t, n) && this.totalAnimations++;
        }
        destroy(e, t) {
          if (!e) return;
          const n = this._fetchNamespace(e);
          this.afterFlush(() => {
            this.namespacesByHostElement.delete(n.hostElement),
              delete this._namespaceLookup[e];
            const t = this._namespaceList.indexOf(n);
            t >= 0 && this._namespaceList.splice(t, 1);
          }),
            this.afterFlushAnimationsDone(() => n.destroy(t));
        }
        _fetchNamespace(e) {
          return this._namespaceLookup[e];
        }
        fetchNamespacesByElement(e) {
          const t = new Set(),
            n = this.statesByElement.get(e);
          if (n) {
            const e = Object.keys(n);
            for (let r = 0; r < e.length; r++) {
              const s = n[e[r]].namespaceId;
              if (s) {
                const e = this._fetchNamespace(s);
                e && t.add(e);
              }
            }
          }
          return t;
        }
        trigger(e, t, n, r) {
          if (Pg(t)) {
            const s = this._fetchNamespace(e);
            if (s) return s.trigger(t, n, r), !0;
          }
          return !1;
        }
        insertNode(e, t, n, r) {
          if (!Pg(t)) return;
          const s = t.__ng_removed;
          if (s && s.setForRemoval) {
            (s.setForRemoval = !1), (s.setForMove = !0);
            const e = this.collectedLeaveElements.indexOf(t);
            e >= 0 && this.collectedLeaveElements.splice(e, 1);
          }
          if (e) {
            const r = this._fetchNamespace(e);
            r && r.insertNode(t, n);
          }
          r && this.collectEnterElement(t);
        }
        collectEnterElement(e) {
          this.collectedEnterElements.push(e);
        }
        markElementAsDisabled(e, t) {
          t
            ? this.disabledNodes.has(e) ||
              (this.disabledNodes.add(e), Og(e, "ng-animate-disabled"))
            : this.disabledNodes.has(e) &&
              (this.disabledNodes.delete(e), Mg(e, "ng-animate-disabled"));
        }
        removeNode(e, t, n, r) {
          if (Pg(t)) {
            const s = e ? this._fetchNamespace(e) : null;
            if (
              (s ? s.removeNode(t, r) : this.markElementAsRemoved(e, t, !1, r),
              n)
            ) {
              const n = this.namespacesByHostElement.get(t);
              n && n.id !== e && n.removeNode(t, r);
            }
          } else this._onRemovalComplete(t, r);
        }
        markElementAsRemoved(e, t, n, r) {
          this.collectedLeaveElements.push(t),
            (t.__ng_removed = {
              namespaceId: e,
              setForRemoval: r,
              hasAnimation: n,
              removedBeforeQueried: !1,
            });
        }
        listen(e, t, n, r, s) {
          return Pg(t) ? this._fetchNamespace(e).listen(t, n, r, s) : () => {};
        }
        _buildInstruction(e, t, n, r, s) {
          return e.transition.build(
            this.driver,
            e.element,
            e.fromState.value,
            e.toState.value,
            n,
            r,
            e.fromState.options,
            e.toState.options,
            t,
            s
          );
        }
        destroyInnerAnimations(e) {
          let t = this.driver.query(e, ".ng-trigger", !0);
          t.forEach((e) => this.destroyActiveAnimationsForElement(e)),
            0 != this.playersByQueriedElement.size &&
              ((t = this.driver.query(e, ".ng-animating", !0)),
              t.forEach((e) => this.finishActiveQueriedAnimationOnElement(e)));
        }
        destroyActiveAnimationsForElement(e) {
          const t = this.playersByElement.get(e);
          t &&
            t.forEach((e) => {
              e.queued ? (e.markedForDestroy = !0) : e.destroy();
            });
        }
        finishActiveQueriedAnimationOnElement(e) {
          const t = this.playersByQueriedElement.get(e);
          t && t.forEach((e) => e.finish());
        }
        whenRenderingDone() {
          return new Promise((e) => {
            if (this.players.length) return nf(this.players).onDone(() => e());
            e();
          });
        }
        processLeaveNode(e) {
          const t = e.__ng_removed;
          if (t && t.setForRemoval) {
            if (((e.__ng_removed = Sg), t.namespaceId)) {
              this.destroyInnerAnimations(e);
              const n = this._fetchNamespace(t.namespaceId);
              n && n.clearElementCache(e);
            }
            this._onRemovalComplete(e, t.setForRemoval);
          }
          this.driver.matchesElement(e, ".ng-animate-disabled") &&
            this.markElementAsDisabled(e, !1),
            this.driver.query(e, ".ng-animate-disabled", !0).forEach((e) => {
              this.markElementAsDisabled(e, !1);
            });
        }
        flush(e = -1) {
          let t = [];
          if (
            (this.newHostElements.size &&
              (this.newHostElements.forEach((e, t) =>
                this._balanceNamespaceList(e, t)
              ),
              this.newHostElements.clear()),
            this.totalAnimations && this.collectedEnterElements.length)
          )
            for (let n = 0; n < this.collectedEnterElements.length; n++)
              Og(this.collectedEnterElements[n], "ng-star-inserted");
          if (
            this._namespaceList.length &&
            (this.totalQueuedPlayers || this.collectedLeaveElements.length)
          ) {
            const n = [];
            try {
              t = this._flushAnimations(n, e);
            } finally {
              for (let e = 0; e < n.length; e++) n[e]();
            }
          } else
            for (let n = 0; n < this.collectedLeaveElements.length; n++)
              this.processLeaveNode(this.collectedLeaveElements[n]);
          if (
            ((this.totalQueuedPlayers = 0),
            (this.collectedEnterElements.length = 0),
            (this.collectedLeaveElements.length = 0),
            this._flushFns.forEach((e) => e()),
            (this._flushFns = []),
            this._whenQuietFns.length)
          ) {
            const e = this._whenQuietFns;
            (this._whenQuietFns = []),
              t.length
                ? nf(t).onDone(() => {
                    e.forEach((e) => e());
                  })
                : e.forEach((e) => e());
          }
        }
        reportError(e) {
          throw new Error(
            "Unable to process animations due to the following failed trigger transitions\n " +
              e.join("\n")
          );
        }
        _flushAnimations(e, t) {
          const n = new tg(),
            r = [],
            s = new Map(),
            i = [],
            o = new Map(),
            l = new Map(),
            a = new Map(),
            u = new Set();
          this.disabledNodes.forEach((e) => {
            u.add(e);
            const t = this.driver.query(e, ".ng-animate-queued", !0);
            for (let n = 0; n < t.length; n++) u.add(t[n]);
          });
          const c = this.bodyNode,
            h = Array.from(this.statesByElement.keys()),
            d = Dg(h, this.collectedEnterElements),
            p = new Map();
          let f = 0;
          d.forEach((e, t) => {
            const n = "ng-enter" + f++;
            p.set(t, n), e.forEach((e) => Og(e, n));
          });
          const g = [],
            m = new Set(),
            y = new Set();
          for (let P = 0; P < this.collectedLeaveElements.length; P++) {
            const e = this.collectedLeaveElements[P],
              t = e.__ng_removed;
            t &&
              t.setForRemoval &&
              (g.push(e),
              m.add(e),
              t.hasAnimation
                ? this.driver
                    .query(e, ".ng-star-inserted", !0)
                    .forEach((e) => m.add(e))
                : y.add(e));
          }
          const _ = new Map(),
            v = Dg(h, Array.from(m));
          v.forEach((e, t) => {
            const n = "ng-leave" + f++;
            _.set(t, n), e.forEach((e) => Og(e, n));
          }),
            e.push(() => {
              d.forEach((e, t) => {
                const n = p.get(t);
                e.forEach((e) => Mg(e, n));
              }),
                v.forEach((e, t) => {
                  const n = _.get(t);
                  e.forEach((e) => Mg(e, n));
                }),
                g.forEach((e) => {
                  this.processLeaveNode(e);
                });
            });
          const b = [],
            w = [];
          for (let P = this._namespaceList.length - 1; P >= 0; P--)
            this._namespaceList[P].drainQueuedTransitions(t).forEach((e) => {
              const t = e.player,
                s = e.element;
              if ((b.push(t), this.collectedEnterElements.length)) {
                const e = s.__ng_removed;
                if (e && e.setForMove) return void t.destroy();
              }
              const u = !c || !this.driver.containsElement(c, s),
                h = _.get(s),
                d = p.get(s),
                f = this._buildInstruction(e, n, d, h, u);
              if (f.errors && f.errors.length) w.push(f);
              else {
                if (u)
                  return (
                    t.onStart(() => Nf(s, f.fromStyles)),
                    t.onDestroy(() => Pf(s, f.toStyles)),
                    void r.push(t)
                  );
                if (e.isFallbackTransition)
                  return (
                    t.onStart(() => Nf(s, f.fromStyles)),
                    t.onDestroy(() => Pf(s, f.toStyles)),
                    void r.push(t)
                  );
                f.timelines.forEach((e) => (e.stretchStartingKeyframe = !0)),
                  n.append(s, f.timelines),
                  i.push({ instruction: f, player: t, element: s }),
                  f.queriedElements.forEach((e) => af(o, e, []).push(t)),
                  f.preStyleProps.forEach((e, t) => {
                    const n = Object.keys(e);
                    if (n.length) {
                      let e = l.get(t);
                      e || l.set(t, (e = new Set())),
                        n.forEach((t) => e.add(t));
                    }
                  }),
                  f.postStyleProps.forEach((e, t) => {
                    const n = Object.keys(e);
                    let r = a.get(t);
                    r || a.set(t, (r = new Set())), n.forEach((e) => r.add(e));
                  });
              }
            });
          if (w.length) {
            const e = [];
            w.forEach((t) => {
              e.push(`@${t.triggerName} has failed due to:\n`),
                t.errors.forEach((t) => e.push(`- ${t}\n`));
            }),
              b.forEach((e) => e.destroy()),
              this.reportError(e);
          }
          const C = new Map(),
            S = new Map();
          i.forEach((e) => {
            const t = e.element;
            n.has(t) &&
              (S.set(t, t),
              this._beforeAnimationBuild(
                e.player.namespaceId,
                e.instruction,
                C
              ));
          }),
            r.forEach((e) => {
              const t = e.element;
              this._getPreviousPlayers(
                t,
                !1,
                e.namespaceId,
                e.triggerName,
                null
              ).forEach((e) => {
                af(C, t, []).push(e), e.destroy();
              });
            });
          const E = g.filter((e) => Vg(e, l, a)),
            T = new Map();
          Rg(T, this.driver, y, a, "*").forEach((e) => {
            Vg(e, l, a) && E.push(e);
          });
          const x = new Map();
          d.forEach((e, t) => {
            Rg(x, this.driver, new Set(e), l, "!");
          }),
            E.forEach((e) => {
              const t = T.get(e),
                n = x.get(e);
              T.set(e, Object.assign({}, t, n));
            });
          const k = [],
            A = [],
            I = {};
          i.forEach((e) => {
            const { element: t, player: i, instruction: o } = e;
            if (n.has(t)) {
              if (u.has(t))
                return (
                  i.onDestroy(() => Pf(t, o.toStyles)),
                  (i.disabled = !0),
                  i.overrideTotalTime(o.totalTime),
                  void r.push(i)
                );
              let e = I;
              if (S.size > 1) {
                let n = t;
                const r = [];
                for (; (n = n.parentNode); ) {
                  const t = S.get(n);
                  if (t) {
                    e = t;
                    break;
                  }
                  r.push(n);
                }
                r.forEach((t) => S.set(t, e));
              }
              const n = this._buildAnimation(i.namespaceId, o, C, s, x, T);
              if ((i.setRealPlayer(n), e === I)) k.push(i);
              else {
                const t = this.playersByElement.get(e);
                t && t.length && (i.parentPlayer = nf(t)), r.push(i);
              }
            } else
              Nf(t, o.fromStyles),
                i.onDestroy(() => Pf(t, o.toStyles)),
                A.push(i),
                u.has(t) && r.push(i);
          }),
            A.forEach((e) => {
              const t = s.get(e.element);
              if (t && t.length) {
                const n = nf(t);
                e.setRealPlayer(n);
              }
            }),
            r.forEach((e) => {
              e.parentPlayer ? e.syncPlayerEvents(e.parentPlayer) : e.destroy();
            });
          for (let P = 0; P < g.length; P++) {
            const e = g[P],
              t = e.__ng_removed;
            if ((Mg(e, "ng-leave"), t && t.hasAnimation)) continue;
            let n = [];
            if (o.size) {
              let t = o.get(e);
              t && t.length && n.push(...t);
              let r = this.driver.query(e, ".ng-animating", !0);
              for (let e = 0; e < r.length; e++) {
                let t = o.get(r[e]);
                t && t.length && n.push(...t);
              }
            }
            const r = n.filter((e) => !e.destroyed);
            r.length ? Fg(this, e, r) : this.processLeaveNode(e);
          }
          return (
            (g.length = 0),
            k.forEach((e) => {
              this.players.push(e),
                e.onDone(() => {
                  e.destroy();
                  const t = this.players.indexOf(e);
                  this.players.splice(t, 1);
                }),
                e.play();
            }),
            k
          );
        }
        elementContainsData(e, t) {
          let n = !1;
          const r = t.__ng_removed;
          return (
            r && r.setForRemoval && (n = !0),
            this.playersByElement.has(t) && (n = !0),
            this.playersByQueriedElement.has(t) && (n = !0),
            this.statesByElement.has(t) && (n = !0),
            this._fetchNamespace(e).elementContainsData(t) || n
          );
        }
        afterFlush(e) {
          this._flushFns.push(e);
        }
        afterFlushAnimationsDone(e) {
          this._whenQuietFns.push(e);
        }
        _getPreviousPlayers(e, t, n, r, s) {
          let i = [];
          if (t) {
            const t = this.playersByQueriedElement.get(e);
            t && (i = t);
          } else {
            const t = this.playersByElement.get(e);
            if (t) {
              const e = !s || "void" == s;
              t.forEach((t) => {
                t.queued || ((e || t.triggerName == r) && i.push(t));
              });
            }
          }
          return (
            (n || r) &&
              (i = i.filter(
                (e) => !((n && n != e.namespaceId) || (r && r != e.triggerName))
              )),
            i
          );
        }
        _beforeAnimationBuild(e, t, n) {
          const r = t.element,
            s = t.isRemovalTransition ? void 0 : e,
            i = t.isRemovalTransition ? void 0 : t.triggerName;
          for (const o of t.timelines) {
            const e = o.element,
              l = e !== r,
              a = af(n, e, []);
            this._getPreviousPlayers(e, l, s, i, t.toState).forEach((e) => {
              const t = e.getRealPlayer();
              t.beforeDestroy && t.beforeDestroy(), e.destroy(), a.push(e);
            });
          }
          Nf(r, t.fromStyles);
        }
        _buildAnimation(e, t, n, r, s, i) {
          const o = t.triggerName,
            l = t.element,
            a = [],
            u = new Set(),
            c = new Set(),
            h = t.timelines.map((t) => {
              const h = t.element;
              u.add(h);
              const d = h.__ng_removed;
              if (d && d.removedBeforeQueried)
                return new Yp(t.duration, t.delay);
              const p = h !== l,
                f = (function (e) {
                  const t = [];
                  return (
                    (function e(t, n) {
                      for (let r = 0; r < t.length; r++) {
                        const s = t[r];
                        s instanceof ef ? e(s.players, n) : n.push(s);
                      }
                    })(e, t),
                    t
                  );
                })((n.get(h) || Cg).map((e) => e.getRealPlayer())).filter(
                  (e) => !!e.element && e.element === h
                ),
                g = s.get(h),
                m = i.get(h),
                y = rf(0, this._normalizer, 0, t.keyframes, g, m),
                _ = this._buildPlayer(t, y, f);
              if ((t.subTimeline && r && c.add(h), p)) {
                const t = new Ig(e, o, h);
                t.setRealPlayer(_), a.push(t);
              }
              return _;
            });
          a.forEach((e) => {
            af(this.playersByQueriedElement, e.element, []).push(e),
              e.onDone(() =>
                (function (e, t, n) {
                  let r;
                  if (e instanceof Map) {
                    if (((r = e.get(t)), r)) {
                      if (r.length) {
                        const e = r.indexOf(n);
                        r.splice(e, 1);
                      }
                      0 == r.length && e.delete(t);
                    }
                  } else if (((r = e[t]), r)) {
                    if (r.length) {
                      const e = r.indexOf(n);
                      r.splice(e, 1);
                    }
                    0 == r.length && delete e[t];
                  }
                  return r;
                })(this.playersByQueriedElement, e.element, e)
              );
          }),
            u.forEach((e) => Og(e, "ng-animating"));
          const d = nf(h);
          return (
            d.onDestroy(() => {
              u.forEach((e) => Mg(e, "ng-animating")), Pf(l, t.toStyles);
            }),
            c.forEach((e) => {
              af(r, e, []).push(d);
            }),
            d
          );
        }
        _buildPlayer(e, t, n) {
          return t.length > 0
            ? this.driver.animate(
                e.element,
                t,
                e.duration,
                e.delay,
                e.easing,
                n
              )
            : new Yp(e.duration, e.delay);
        }
      }
      class Ig {
        constructor(e, t, n) {
          (this.namespaceId = e),
            (this.triggerName = t),
            (this.element = n),
            (this._player = new Yp()),
            (this._containsRealPlayer = !1),
            (this._queuedCallbacks = {}),
            (this.destroyed = !1),
            (this.markedForDestroy = !1),
            (this.disabled = !1),
            (this.queued = !0),
            (this.totalTime = 0);
        }
        setRealPlayer(e) {
          this._containsRealPlayer ||
            ((this._player = e),
            Object.keys(this._queuedCallbacks).forEach((t) => {
              this._queuedCallbacks[t].forEach((n) => sf(e, t, void 0, n));
            }),
            (this._queuedCallbacks = {}),
            (this._containsRealPlayer = !0),
            this.overrideTotalTime(e.totalTime),
            (this.queued = !1));
        }
        getRealPlayer() {
          return this._player;
        }
        overrideTotalTime(e) {
          this.totalTime = e;
        }
        syncPlayerEvents(e) {
          const t = this._player;
          t.triggerCallback && e.onStart(() => t.triggerCallback("start")),
            e.onDone(() => this.finish()),
            e.onDestroy(() => this.destroy());
        }
        _queueEvent(e, t) {
          af(this._queuedCallbacks, e, []).push(t);
        }
        onDone(e) {
          this.queued && this._queueEvent("done", e), this._player.onDone(e);
        }
        onStart(e) {
          this.queued && this._queueEvent("start", e), this._player.onStart(e);
        }
        onDestroy(e) {
          this.queued && this._queueEvent("destroy", e),
            this._player.onDestroy(e);
        }
        init() {
          this._player.init();
        }
        hasStarted() {
          return !this.queued && this._player.hasStarted();
        }
        play() {
          !this.queued && this._player.play();
        }
        pause() {
          !this.queued && this._player.pause();
        }
        restart() {
          !this.queued && this._player.restart();
        }
        finish() {
          this._player.finish();
        }
        destroy() {
          (this.destroyed = !0), this._player.destroy();
        }
        reset() {
          !this.queued && this._player.reset();
        }
        setPosition(e) {
          this.queued || this._player.setPosition(e);
        }
        getPosition() {
          return this.queued ? 0 : this._player.getPosition();
        }
        triggerCallback(e) {
          const t = this._player;
          t.triggerCallback && t.triggerCallback(e);
        }
      }
      function Pg(e) {
        return e && 1 === e.nodeType;
      }
      function Ng(e, t) {
        const n = e.style.display;
        return (e.style.display = null != t ? t : "none"), n;
      }
      function Rg(e, t, n, r, s) {
        const i = [];
        n.forEach((e) => i.push(Ng(e)));
        const o = [];
        r.forEach((n, r) => {
          const i = {};
          n.forEach((e) => {
            const n = (i[e] = t.computeStyle(r, e, s));
            (n && 0 != n.length) || ((r.__ng_removed = Eg), o.push(r));
          }),
            e.set(r, i);
        });
        let l = 0;
        return n.forEach((e) => Ng(e, i[l++])), o;
      }
      function Dg(e, t) {
        const n = new Map();
        if ((e.forEach((e) => n.set(e, [])), 0 == t.length)) return n;
        const r = new Set(t),
          s = new Map();
        return (
          t.forEach((e) => {
            const t = (function e(t) {
              if (!t) return 1;
              let i = s.get(t);
              if (i) return i;
              const o = t.parentNode;
              return (i = n.has(o) ? o : r.has(o) ? 1 : e(o)), s.set(t, i), i;
            })(e);
            1 !== t && n.get(t).push(e);
          }),
          n
        );
      }
      function Og(e, t) {
        if (e.classList) e.classList.add(t);
        else {
          let n = e.$$classes;
          n || (n = e.$$classes = {}), (n[t] = !0);
        }
      }
      function Mg(e, t) {
        if (e.classList) e.classList.remove(t);
        else {
          let n = e.$$classes;
          n && delete n[t];
        }
      }
      function Fg(e, t, n) {
        nf(n).onDone(() => e.processLeaveNode(t));
      }
      function Vg(e, t, n) {
        const r = n.get(e);
        if (!r) return !1;
        let s = t.get(e);
        return s ? r.forEach((e) => s.add(e)) : t.set(e, r), n.delete(e), !0;
      }
      class Lg {
        constructor(e, t, n) {
          (this.bodyNode = e),
            (this._driver = t),
            (this._triggerCache = {}),
            (this.onRemovalComplete = (e, t) => {}),
            (this._transitionEngine = new Ag(e, t, n)),
            (this._timelineEngine = new wg(e, t, n)),
            (this._transitionEngine.onRemovalComplete = (e, t) =>
              this.onRemovalComplete(e, t));
        }
        registerTrigger(e, t, n, r, s) {
          const i = e + "-" + r;
          let o = this._triggerCache[i];
          if (!o) {
            const e = [],
              t = Kf(this._driver, s, e);
            if (e.length)
              throw new Error(
                `The animation trigger "${r}" has failed to build due to the following errors:\n - ${e.join(
                  "\n - "
                )}`
              );
            (o = (function (e, t) {
              return new _g(e, t);
            })(r, t)),
              (this._triggerCache[i] = o);
          }
          this._transitionEngine.registerTrigger(t, r, o);
        }
        register(e, t) {
          this._transitionEngine.register(e, t);
        }
        destroy(e, t) {
          this._transitionEngine.destroy(e, t);
        }
        onInsert(e, t, n, r) {
          this._transitionEngine.insertNode(e, t, n, r);
        }
        onRemove(e, t, n, r) {
          this._transitionEngine.removeNode(e, t, r || !1, n);
        }
        disableAnimations(e, t) {
          this._transitionEngine.markElementAsDisabled(e, t);
        }
        process(e, t, n, r) {
          if ("@" == n.charAt(0)) {
            const [e, s] = uf(n);
            this._timelineEngine.command(e, t, s, r);
          } else this._transitionEngine.trigger(e, t, n, r);
        }
        listen(e, t, n, r, s) {
          if ("@" == n.charAt(0)) {
            const [e, r] = uf(n);
            return this._timelineEngine.listen(e, t, r, s);
          }
          return this._transitionEngine.listen(e, t, n, r, s);
        }
        flush(e = -1) {
          this._transitionEngine.flush(e);
        }
        get players() {
          return this._transitionEngine.players.concat(
            this._timelineEngine.players
          );
        }
        whenRenderingDone() {
          return this._transitionEngine.whenRenderingDone();
        }
      }
      function Ug(e, t) {
        let n = null,
          r = null;
        return (
          Array.isArray(t) && t.length
            ? ((n = $g(t[0])), t.length > 1 && (r = $g(t[t.length - 1])))
            : t && (n = $g(t)),
          n || r ? new jg(e, n, r) : null
        );
      }
      let jg = (() => {
        class e {
          constructor(t, n, r) {
            (this._element = t),
              (this._startStyles = n),
              (this._endStyles = r),
              (this._state = 0);
            let s = e.initialStylesByElement.get(t);
            s || e.initialStylesByElement.set(t, (s = {})),
              (this._initialStyles = s);
          }
          start() {
            this._state < 1 &&
              (this._startStyles &&
                Pf(this._element, this._startStyles, this._initialStyles),
              (this._state = 1));
          }
          finish() {
            this.start(),
              this._state < 2 &&
                (Pf(this._element, this._initialStyles),
                this._endStyles &&
                  (Pf(this._element, this._endStyles),
                  (this._endStyles = null)),
                (this._state = 1));
          }
          destroy() {
            this.finish(),
              this._state < 3 &&
                (e.initialStylesByElement.delete(this._element),
                this._startStyles &&
                  (Nf(this._element, this._startStyles),
                  (this._endStyles = null)),
                this._endStyles &&
                  (Nf(this._element, this._endStyles),
                  (this._endStyles = null)),
                Pf(this._element, this._initialStyles),
                (this._state = 3));
          }
        }
        return (e.initialStylesByElement = new WeakMap()), e;
      })();
      function $g(e) {
        let t = null;
        const n = Object.keys(e);
        for (let r = 0; r < n.length; r++) {
          const s = n[r];
          Hg(s) && ((t = t || {}), (t[s] = e[s]));
        }
        return t;
      }
      function Hg(e) {
        return "display" === e || "position" === e;
      }
      class Bg {
        constructor(e, t, n, r, s, i, o) {
          (this._element = e),
            (this._name = t),
            (this._duration = n),
            (this._delay = r),
            (this._easing = s),
            (this._fillMode = i),
            (this._onDoneFn = o),
            (this._finished = !1),
            (this._destroyed = !1),
            (this._startTime = 0),
            (this._position = 0),
            (this._eventFn = (e) => this._handleCallback(e));
        }
        apply() {
          !(function (e, t) {
            const n = Qg(e, "").trim();
            n.length &&
              ((function (e, t) {
                let n = 0;
                for (let r = 0; r < e.length; r++) "," === e.charAt(r) && n++;
              })(n),
              (t = `${n}, ${t}`)),
              Kg(e, "", t);
          })(
            this._element,
            `${this._duration}ms ${this._easing} ${this._delay}ms 1 normal ${this._fillMode} ${this._name}`
          ),
            Gg(this._element, this._eventFn, !1),
            (this._startTime = Date.now());
        }
        pause() {
          zg(this._element, this._name, "paused");
        }
        resume() {
          zg(this._element, this._name, "running");
        }
        setPosition(e) {
          const t = qg(this._element, this._name);
          (this._position = e * this._duration),
            Kg(this._element, "Delay", `-${this._position}ms`, t);
        }
        getPosition() {
          return this._position;
        }
        _handleCallback(e) {
          const t = e._ngTestManualTimestamp || Date.now(),
            n = 1e3 * parseFloat(e.elapsedTime.toFixed(3));
          e.animationName == this._name &&
            Math.max(t - this._startTime, 0) >= this._delay &&
            n >= this._duration &&
            this.finish();
        }
        finish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFn(),
            Gg(this._element, this._eventFn, !0));
        }
        destroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this.finish(),
            (function (e, t) {
              const n = Qg(e, "").split(","),
                r = Wg(n, t);
              r >= 0 && (n.splice(r, 1), Kg(e, "", n.join(",")));
            })(this._element, this._name));
        }
      }
      function zg(e, t, n) {
        Kg(e, "PlayState", n, qg(e, t));
      }
      function qg(e, t) {
        const n = Qg(e, "");
        return n.indexOf(",") > 0 ? Wg(n.split(","), t) : Wg([n], t);
      }
      function Wg(e, t) {
        for (let n = 0; n < e.length; n++) if (e[n].indexOf(t) >= 0) return n;
        return -1;
      }
      function Gg(e, t, n) {
        n
          ? e.removeEventListener("animationend", t)
          : e.addEventListener("animationend", t);
      }
      function Kg(e, t, n, r) {
        const s = "animation" + t;
        if (null != r) {
          const t = e.style[s];
          if (t.length) {
            const e = t.split(",");
            (e[r] = n), (n = e.join(","));
          }
        }
        e.style[s] = n;
      }
      function Qg(e, t) {
        return e.style["animation" + t];
      }
      class Zg {
        constructor(e, t, n, r, s, i, o, l) {
          (this.element = e),
            (this.keyframes = t),
            (this.animationName = n),
            (this._duration = r),
            (this._delay = s),
            (this._finalStyles = o),
            (this._specialStyles = l),
            (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this._started = !1),
            (this.currentSnapshot = {}),
            (this._state = 0),
            (this.easing = i || "linear"),
            (this.totalTime = r + s),
            this._buildStyler();
        }
        onStart(e) {
          this._onStartFns.push(e);
        }
        onDone(e) {
          this._onDoneFns.push(e);
        }
        onDestroy(e) {
          this._onDestroyFns.push(e);
        }
        destroy() {
          this.init(),
            this._state >= 4 ||
              ((this._state = 4),
              this._styler.destroy(),
              this._flushStartFns(),
              this._flushDoneFns(),
              this._specialStyles && this._specialStyles.destroy(),
              this._onDestroyFns.forEach((e) => e()),
              (this._onDestroyFns = []));
        }
        _flushDoneFns() {
          this._onDoneFns.forEach((e) => e()), (this._onDoneFns = []);
        }
        _flushStartFns() {
          this._onStartFns.forEach((e) => e()), (this._onStartFns = []);
        }
        finish() {
          this.init(),
            this._state >= 3 ||
              ((this._state = 3),
              this._styler.finish(),
              this._flushStartFns(),
              this._specialStyles && this._specialStyles.finish(),
              this._flushDoneFns());
        }
        setPosition(e) {
          this._styler.setPosition(e);
        }
        getPosition() {
          return this._styler.getPosition();
        }
        hasStarted() {
          return this._state >= 2;
        }
        init() {
          this._state >= 1 ||
            ((this._state = 1),
            this._styler.apply(),
            this._delay && this._styler.pause());
        }
        play() {
          this.init(),
            this.hasStarted() ||
              (this._flushStartFns(),
              (this._state = 2),
              this._specialStyles && this._specialStyles.start()),
            this._styler.resume();
        }
        pause() {
          this.init(), this._styler.pause();
        }
        restart() {
          this.reset(), this.play();
        }
        reset() {
          this._styler.destroy(), this._buildStyler(), this._styler.apply();
        }
        _buildStyler() {
          this._styler = new Bg(
            this.element,
            this.animationName,
            this._duration,
            this._delay,
            this.easing,
            "forwards",
            () => this.finish()
          );
        }
        triggerCallback(e) {
          const t = "start" == e ? this._onStartFns : this._onDoneFns;
          t.forEach((e) => e()), (t.length = 0);
        }
        beforeDestroy() {
          this.init();
          const e = {};
          if (this.hasStarted()) {
            const t = this._state >= 3;
            Object.keys(this._finalStyles).forEach((n) => {
              "offset" != n &&
                (e[n] = t ? this._finalStyles[n] : Hf(this.element, n));
            });
          }
          this.currentSnapshot = e;
        }
      }
      class Xg extends Yp {
        constructor(e, t) {
          super(),
            (this.element = e),
            (this._startingStyles = {}),
            (this.__initialized = !1),
            (this._styles = bf(t));
        }
        init() {
          !this.__initialized &&
            this._startingStyles &&
            ((this.__initialized = !0),
            Object.keys(this._styles).forEach((e) => {
              this._startingStyles[e] = this.element.style[e];
            }),
            super.init());
        }
        play() {
          this._startingStyles &&
            (this.init(),
            Object.keys(this._styles).forEach((e) =>
              this.element.style.setProperty(e, this._styles[e])
            ),
            super.play());
        }
        destroy() {
          this._startingStyles &&
            (Object.keys(this._startingStyles).forEach((e) => {
              const t = this._startingStyles[e];
              t
                ? this.element.style.setProperty(e, t)
                : this.element.style.removeProperty(e);
            }),
            (this._startingStyles = null),
            super.destroy());
        }
      }
      class Jg {
        constructor() {
          (this._count = 0),
            (this._head = document.querySelector("head")),
            (this._warningIssued = !1);
        }
        validateStyleProperty(e) {
          return mf(e);
        }
        matchesElement(e, t) {
          return yf(e, t);
        }
        containsElement(e, t) {
          return _f(e, t);
        }
        query(e, t, n) {
          return vf(e, t, n);
        }
        computeStyle(e, t, n) {
          return window.getComputedStyle(e)[t];
        }
        buildKeyframeElement(e, t, n) {
          n = n.map((e) => bf(e));
          let r = `@keyframes ${t} {\n`,
            s = "";
          n.forEach((e) => {
            s = " ";
            const t = parseFloat(e.offset);
            (r += `${s}${100 * t}% {\n`),
              (s += " "),
              Object.keys(e).forEach((t) => {
                const n = e[t];
                switch (t) {
                  case "offset":
                    return;
                  case "easing":
                    return void (
                      n && (r += `${s}animation-timing-function: ${n};\n`)
                    );
                  default:
                    return void (r += `${s}${t}: ${n};\n`);
                }
              }),
              (r += s + "}\n");
          }),
            (r += "}\n");
          const i = document.createElement("style");
          return (i.innerHTML = r), i;
        }
        animate(e, t, n, r, s, i = [], o) {
          o && this._notifyFaultyScrubber();
          const l = i.filter((e) => e instanceof Zg),
            a = {};
          Uf(n, r) &&
            l.forEach((e) => {
              let t = e.currentSnapshot;
              Object.keys(t).forEach((e) => (a[e] = t[e]));
            });
          const u = (function (e) {
            let t = {};
            return (
              e &&
                (Array.isArray(e) ? e : [e]).forEach((e) => {
                  Object.keys(e).forEach((n) => {
                    "offset" != n && "easing" != n && (t[n] = e[n]);
                  });
                }),
              t
            );
          })((t = jf(e, t, a)));
          if (0 == n) return new Xg(e, u);
          const c = "gen_css_kf_" + this._count++,
            h = this.buildKeyframeElement(e, c, t);
          document.querySelector("head").appendChild(h);
          const d = Ug(e, t),
            p = new Zg(e, t, c, n, r, s, u, d);
          return (
            p.onDestroy(() => {
              var e;
              (e = h).parentNode.removeChild(e);
            }),
            p
          );
        }
        _notifyFaultyScrubber() {
          this._warningIssued ||
            (console.warn(
              "@angular/animations: please load the web-animations.js polyfill to allow programmatic access...\n",
              "  visit http://bit.ly/IWukam to learn more about using the web-animation-js polyfill."
            ),
            (this._warningIssued = !0));
        }
      }
      class Yg {
        constructor(e, t, n, r) {
          (this.element = e),
            (this.keyframes = t),
            (this.options = n),
            (this._specialStyles = r),
            (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this._initialized = !1),
            (this._finished = !1),
            (this._started = !1),
            (this._destroyed = !1),
            (this.time = 0),
            (this.parentPlayer = null),
            (this.currentSnapshot = {}),
            (this._duration = n.duration),
            (this._delay = n.delay || 0),
            (this.time = this._duration + this._delay);
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach((e) => e()),
            (this._onDoneFns = []));
        }
        init() {
          this._buildPlayer(), this._preparePlayerBeforeStart();
        }
        _buildPlayer() {
          if (this._initialized) return;
          this._initialized = !0;
          const e = this.keyframes;
          (this.domPlayer = this._triggerWebAnimation(
            this.element,
            e,
            this.options
          )),
            (this._finalKeyframe = e.length ? e[e.length - 1] : {}),
            this.domPlayer.addEventListener("finish", () => this._onFinish());
        }
        _preparePlayerBeforeStart() {
          this._delay ? this._resetDomPlayerState() : this.domPlayer.pause();
        }
        _triggerWebAnimation(e, t, n) {
          return e.animate(t, n);
        }
        onStart(e) {
          this._onStartFns.push(e);
        }
        onDone(e) {
          this._onDoneFns.push(e);
        }
        onDestroy(e) {
          this._onDestroyFns.push(e);
        }
        play() {
          this._buildPlayer(),
            this.hasStarted() ||
              (this._onStartFns.forEach((e) => e()),
              (this._onStartFns = []),
              (this._started = !0),
              this._specialStyles && this._specialStyles.start()),
            this.domPlayer.play();
        }
        pause() {
          this.init(), this.domPlayer.pause();
        }
        finish() {
          this.init(),
            this._specialStyles && this._specialStyles.finish(),
            this._onFinish(),
            this.domPlayer.finish();
        }
        reset() {
          this._resetDomPlayerState(),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._started = !1);
        }
        _resetDomPlayerState() {
          this.domPlayer && this.domPlayer.cancel();
        }
        restart() {
          this.reset(), this.play();
        }
        hasStarted() {
          return this._started;
        }
        destroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this._resetDomPlayerState(),
            this._onFinish(),
            this._specialStyles && this._specialStyles.destroy(),
            this._onDestroyFns.forEach((e) => e()),
            (this._onDestroyFns = []));
        }
        setPosition(e) {
          this.domPlayer.currentTime = e * this.time;
        }
        getPosition() {
          return this.domPlayer.currentTime / this.time;
        }
        get totalTime() {
          return this._delay + this._duration;
        }
        beforeDestroy() {
          const e = {};
          this.hasStarted() &&
            Object.keys(this._finalKeyframe).forEach((t) => {
              "offset" != t &&
                (e[t] = this._finished
                  ? this._finalKeyframe[t]
                  : Hf(this.element, t));
            }),
            (this.currentSnapshot = e);
        }
        triggerCallback(e) {
          const t = "start" == e ? this._onStartFns : this._onDoneFns;
          t.forEach((e) => e()), (t.length = 0);
        }
      }
      class em {
        constructor() {
          (this._isNativeImpl = /\{\s*\[native\s+code\]\s*\}/.test(
            tm().toString()
          )),
            (this._cssKeyframesDriver = new Jg());
        }
        validateStyleProperty(e) {
          return mf(e);
        }
        matchesElement(e, t) {
          return yf(e, t);
        }
        containsElement(e, t) {
          return _f(e, t);
        }
        query(e, t, n) {
          return vf(e, t, n);
        }
        computeStyle(e, t, n) {
          return window.getComputedStyle(e)[t];
        }
        overrideWebAnimationsSupport(e) {
          this._isNativeImpl = e;
        }
        animate(e, t, n, r, s, i = [], o) {
          if (!o && !this._isNativeImpl)
            return this._cssKeyframesDriver.animate(e, t, n, r, s, i);
          const l = {
            duration: n,
            delay: r,
            fill: 0 == r ? "both" : "forwards",
          };
          s && (l.easing = s);
          const a = {},
            u = i.filter((e) => e instanceof Yg);
          Uf(n, r) &&
            u.forEach((e) => {
              let t = e.currentSnapshot;
              Object.keys(t).forEach((e) => (a[e] = t[e]));
            });
          const c = Ug(e, (t = jf(e, (t = t.map((e) => kf(e, !1))), a)));
          return new Yg(e, t, l, c);
        }
      }
      function tm() {
        return (
          ("undefined" != typeof window &&
            void 0 !== window.document &&
            Element.prototype.animate) ||
          {}
        );
      }
      class nm extends Qp {
        constructor(e, t) {
          super(),
            (this._nextAnimationId = 0),
            (this._renderer = e.createRenderer(t.body, {
              id: "0",
              encapsulation: De.None,
              styles: [],
              data: { animation: [] },
            }));
        }
        build(e) {
          const t = this._nextAnimationId.toString();
          this._nextAnimationId++;
          const n = Array.isArray(e) ? Zp(e) : e;
          return (
            im(this._renderer, null, t, "register", [n]),
            new rm(t, this._renderer)
          );
        }
      }
      class rm extends class {} {
        constructor(e, t) {
          super(), (this._id = e), (this._renderer = t);
        }
        create(e, t) {
          return new sm(this._id, e, t || {}, this._renderer);
        }
      }
      class sm {
        constructor(e, t, n, r) {
          (this.id = e),
            (this.element = t),
            (this._renderer = r),
            (this.parentPlayer = null),
            (this._started = !1),
            (this.totalTime = 0),
            this._command("create", n);
        }
        _listen(e, t) {
          return this._renderer.listen(this.element, `@@${this.id}:${e}`, t);
        }
        _command(e, ...t) {
          return im(this._renderer, this.element, this.id, e, t);
        }
        onDone(e) {
          this._listen("done", e);
        }
        onStart(e) {
          this._listen("start", e);
        }
        onDestroy(e) {
          this._listen("destroy", e);
        }
        init() {
          this._command("init");
        }
        hasStarted() {
          return this._started;
        }
        play() {
          this._command("play"), (this._started = !0);
        }
        pause() {
          this._command("pause");
        }
        restart() {
          this._command("restart");
        }
        finish() {
          this._command("finish");
        }
        destroy() {
          this._command("destroy");
        }
        reset() {
          this._command("reset");
        }
        setPosition(e) {
          this._command("setPosition", e);
        }
        getPosition() {
          return 0;
        }
      }
      function im(e, t, n, r, s) {
        return e.setProperty(t, `@@${n}:${r}`, s);
      }
      class om {
        constructor(e, t, n) {
          (this.delegate = e),
            (this.engine = t),
            (this._zone = n),
            (this._currentId = 0),
            (this._microtaskId = 1),
            (this._animationCallbacksBuffer = []),
            (this._rendererCache = new Map()),
            (this._cdRecurDepth = 0),
            (this.promise = Promise.resolve(0)),
            (t.onRemovalComplete = (e, t) => {
              t && t.parentNode(e) && t.removeChild(e.parentNode, e);
            });
        }
        createRenderer(e, t) {
          const n = this.delegate.createRenderer(e, t);
          if (!(e && t && t.data && t.data.animation)) {
            let e = this._rendererCache.get(n);
            return (
              e ||
                ((e = new lm("", n, this.engine)),
                this._rendererCache.set(n, e)),
              e
            );
          }
          const r = t.id,
            s = t.id + "-" + this._currentId;
          return (
            this._currentId++,
            this.engine.register(s, e),
            t.data.animation.forEach((t) =>
              this.engine.registerTrigger(r, s, e, t.name, t)
            ),
            new am(this, s, n, this.engine)
          );
        }
        begin() {
          this._cdRecurDepth++, this.delegate.begin && this.delegate.begin();
        }
        _scheduleCountTask() {
          this.promise.then(() => {
            this._microtaskId++;
          });
        }
        scheduleListenerCallback(e, t, n) {
          e >= 0 && e < this._microtaskId
            ? this._zone.run(() => t(n))
            : (0 == this._animationCallbacksBuffer.length &&
                Promise.resolve(null).then(() => {
                  this._zone.run(() => {
                    this._animationCallbacksBuffer.forEach((e) => {
                      const [t, n] = e;
                      t(n);
                    }),
                      (this._animationCallbacksBuffer = []);
                  });
                }),
              this._animationCallbacksBuffer.push([t, n]));
        }
        end() {
          this._cdRecurDepth--,
            0 == this._cdRecurDepth &&
              this._zone.runOutsideAngular(() => {
                this._scheduleCountTask(), this.engine.flush(this._microtaskId);
              }),
            this.delegate.end && this.delegate.end();
        }
        whenRenderingDone() {
          return this.engine.whenRenderingDone();
        }
      }
      class lm {
        constructor(e, t, n) {
          (this.namespaceId = e),
            (this.delegate = t),
            (this.engine = n),
            (this.destroyNode = this.delegate.destroyNode
              ? (e) => t.destroyNode(e)
              : null);
        }
        get data() {
          return this.delegate.data;
        }
        destroy() {
          this.engine.destroy(this.namespaceId, this.delegate),
            this.delegate.destroy();
        }
        createElement(e, t) {
          return this.delegate.createElement(e, t);
        }
        createComment(e) {
          return this.delegate.createComment(e);
        }
        createText(e) {
          return this.delegate.createText(e);
        }
        appendChild(e, t) {
          this.delegate.appendChild(e, t),
            this.engine.onInsert(this.namespaceId, t, e, !1);
        }
        insertBefore(e, t, n) {
          this.delegate.insertBefore(e, t, n),
            this.engine.onInsert(this.namespaceId, t, e, !0);
        }
        removeChild(e, t, n) {
          this.engine.onRemove(this.namespaceId, t, this.delegate, n);
        }
        selectRootElement(e, t) {
          return this.delegate.selectRootElement(e, t);
        }
        parentNode(e) {
          return this.delegate.parentNode(e);
        }
        nextSibling(e) {
          return this.delegate.nextSibling(e);
        }
        setAttribute(e, t, n, r) {
          this.delegate.setAttribute(e, t, n, r);
        }
        removeAttribute(e, t, n) {
          this.delegate.removeAttribute(e, t, n);
        }
        addClass(e, t) {
          this.delegate.addClass(e, t);
        }
        removeClass(e, t) {
          this.delegate.removeClass(e, t);
        }
        setStyle(e, t, n, r) {
          this.delegate.setStyle(e, t, n, r);
        }
        removeStyle(e, t, n) {
          this.delegate.removeStyle(e, t, n);
        }
        setProperty(e, t, n) {
          "@" == t.charAt(0) && "@.disabled" == t
            ? this.disableAnimations(e, !!n)
            : this.delegate.setProperty(e, t, n);
        }
        setValue(e, t) {
          this.delegate.setValue(e, t);
        }
        listen(e, t, n) {
          return this.delegate.listen(e, t, n);
        }
        disableAnimations(e, t) {
          this.engine.disableAnimations(e, t);
        }
      }
      class am extends lm {
        constructor(e, t, n, r) {
          super(t, n, r), (this.factory = e), (this.namespaceId = t);
        }
        setProperty(e, t, n) {
          "@" == t.charAt(0)
            ? "." == t.charAt(1) && "@.disabled" == t
              ? this.disableAnimations(e, (n = void 0 === n || !!n))
              : this.engine.process(this.namespaceId, e, t.substr(1), n)
            : this.delegate.setProperty(e, t, n);
        }
        listen(e, t, n) {
          if ("@" == t.charAt(0)) {
            const r = (function (e) {
              switch (e) {
                case "body":
                  return document.body;
                case "document":
                  return document;
                case "window":
                  return window;
                default:
                  return e;
              }
            })(e);
            let s = t.substr(1),
              i = "";
            return (
              "@" != s.charAt(0) &&
                ([s, i] = (function (e) {
                  const t = e.indexOf(".");
                  return [e.substring(0, t), e.substr(t + 1)];
                })(s)),
              this.engine.listen(this.namespaceId, r, s, i, (e) => {
                this.factory.scheduleListenerCallback(e._data || -1, n, e);
              })
            );
          }
          return this.delegate.listen(e, t, n);
        }
      }
      class um extends Lg {
        constructor(e, t, n) {
          super(e.body, t, n);
        }
      }
      function cm() {
        return "function" == typeof tm() ? new em() : new Jg();
      }
      function hm() {
        return new dg();
      }
      function dm(e, t, n) {
        return new om(e, t, n);
      }
      const pm = new ve("AnimationModuleType");
      class fm {}
      var gm = Fn({
        encapsulation: 2,
        styles: [
          ".mat-progress-spinner{display:block;position:relative}.mat-progress-spinner svg{position:absolute;transform:rotate(-90deg);top:0;left:0;transform-origin:center;overflow:visible}.mat-progress-spinner circle{fill:transparent;transform-origin:center;transition:stroke-dashoffset 225ms linear}._mat-animation-noopable.mat-progress-spinner circle{transition:none;animation:none}.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate]{animation:mat-progress-spinner-linear-rotate 2s linear infinite}._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate]{transition:none;animation:none}.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate] circle{transition-property:stroke;animation-duration:4s;animation-timing-function:cubic-bezier(.35,0,.25,1);animation-iteration-count:infinite}._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate] circle{transition:none;animation:none}.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate]{animation:mat-progress-spinner-stroke-rotate-fallback 10s cubic-bezier(.87,.03,.33,1) infinite}._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate]{transition:none;animation:none}.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate] circle{transition-property:stroke}._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate] circle{transition:none;animation:none}@keyframes mat-progress-spinner-linear-rotate{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}@keyframes mat-progress-spinner-stroke-rotate-100{0%{stroke-dashoffset:268.60617px;transform:rotate(0)}12.5%{stroke-dashoffset:56.54867px;transform:rotate(0)}12.5001%{stroke-dashoffset:56.54867px;transform:rotateX(180deg) rotate(72.5deg)}25%{stroke-dashoffset:268.60617px;transform:rotateX(180deg) rotate(72.5deg)}25.0001%{stroke-dashoffset:268.60617px;transform:rotate(270deg)}37.5%{stroke-dashoffset:56.54867px;transform:rotate(270deg)}37.5001%{stroke-dashoffset:56.54867px;transform:rotateX(180deg) rotate(161.5deg)}50%{stroke-dashoffset:268.60617px;transform:rotateX(180deg) rotate(161.5deg)}50.0001%{stroke-dashoffset:268.60617px;transform:rotate(180deg)}62.5%{stroke-dashoffset:56.54867px;transform:rotate(180deg)}62.5001%{stroke-dashoffset:56.54867px;transform:rotateX(180deg) rotate(251.5deg)}75%{stroke-dashoffset:268.60617px;transform:rotateX(180deg) rotate(251.5deg)}75.0001%{stroke-dashoffset:268.60617px;transform:rotate(90deg)}87.5%{stroke-dashoffset:56.54867px;transform:rotate(90deg)}87.5001%{stroke-dashoffset:56.54867px;transform:rotateX(180deg) rotate(341.5deg)}100%{stroke-dashoffset:268.60617px;transform:rotateX(180deg) rotate(341.5deg)}}@keyframes mat-progress-spinner-stroke-rotate-fallback{0%{transform:rotate(0)}25%{transform:rotate(1170deg)}50%{transform:rotate(2340deg)}75%{transform:rotate(3510deg)}100%{transform:rotate(4680deg)}}",
        ],
        data: {},
      });
      function mm(e) {
        return qi(
          0,
          [
            (e()(),
            Ai(
              0,
              0,
              null,
              null,
              0,
              ":svg:circle",
              [
                ["cx", "50%"],
                ["cy", "50%"],
              ],
              [
                [1, "r", 0],
                [4, "animation-name", null],
                [4, "stroke-dashoffset", "px"],
                [4, "stroke-dasharray", "px"],
                [4, "stroke-width", "%"],
              ],
              null,
              null,
              null,
              null
            )),
          ],
          null,
          function (e, t) {
            var n = t.component;
            e(
              t,
              0,
              0,
              n._circleRadius,
              "mat-progress-spinner-stroke-rotate-" + n.diameter,
              n._strokeDashOffset,
              n._strokeCircumference,
              n._circleStrokeWidth
            );
          }
        );
      }
      function ym(e) {
        return qi(
          0,
          [
            (e()(),
            Ai(
              0,
              0,
              null,
              null,
              0,
              ":svg:circle",
              [
                ["cx", "50%"],
                ["cy", "50%"],
              ],
              [
                [1, "r", 0],
                [4, "stroke-dashoffset", "px"],
                [4, "stroke-dasharray", "px"],
                [4, "stroke-width", "%"],
              ],
              null,
              null,
              null,
              null
            )),
          ],
          null,
          function (e, t) {
            var n = t.component;
            e(
              t,
              0,
              0,
              n._circleRadius,
              n._strokeDashOffset,
              n._strokeCircumference,
              n._circleStrokeWidth
            );
          }
        );
      }
      function _m(e) {
        return qi(
          2,
          [
            (e()(),
            Ai(
              0,
              0,
              null,
              null,
              5,
              ":svg:svg",
              [
                ["focusable", "false"],
                ["preserveAspectRatio", "xMidYMid meet"],
              ],
              [
                [4, "width", "px"],
                [4, "height", "px"],
                [1, "viewBox", 0],
              ],
              null,
              null,
              null,
              null
            )),
            Wr(1, 16384, null, 0, Nl, [], { ngSwitch: [0, "ngSwitch"] }, null),
            (e()(), ki(16777216, null, null, 1, null, mm)),
            Wr(
              3,
              278528,
              null,
              0,
              Rl,
              [vn, yn, Nl],
              { ngSwitchCase: [0, "ngSwitchCase"] },
              null
            ),
            (e()(), ki(16777216, null, null, 1, null, ym)),
            Wr(
              5,
              278528,
              null,
              0,
              Rl,
              [vn, yn, Nl],
              { ngSwitchCase: [0, "ngSwitchCase"] },
              null
            ),
          ],
          function (e, t) {
            e(t, 1, 0, "indeterminate" === t.component.mode),
              e(t, 3, 0, !0),
              e(t, 5, 0, !1);
          },
          function (e, t) {
            var n = t.component;
            e(t, 0, 0, n.diameter, n.diameter, n._viewBox);
          }
        );
      }
      function vm(e, t) {
        return new b((n) => {
          const r = e.length;
          if (0 === r) return void n.complete();
          const s = new Array(r);
          let i = 0,
            o = 0;
          for (let l = 0; l < r; l++) {
            const a = L(e[l]);
            let u = !1;
            n.add(
              a.subscribe({
                next: (e) => {
                  u || ((u = !0), o++), (s[l] = e);
                },
                error: (e) => n.error(e),
                complete: () => {
                  i++,
                    (i !== r && u) ||
                      (o === r &&
                        n.next(
                          t ? t.reduce((e, t, n) => ((e[t] = s[n]), e), {}) : s
                        ),
                      n.complete());
                },
              })
            );
          }
        });
      }
      const bm = new ve("NgValueAccessor"),
        wm = new ve("CompositionEventMode");
      class Cm {
        constructor(e, t, n) {
          (this._renderer = e),
            (this._elementRef = t),
            (this._compositionMode = n),
            (this.onChange = (e) => {}),
            (this.onTouched = () => {}),
            (this._composing = !1),
            null == this._compositionMode &&
              (this._compositionMode = !(function () {
                const e = ja() ? ja().getUserAgent() : "";
                return /android (\d+)/.test(e.toLowerCase());
              })());
        }
        writeValue(e) {
          this._renderer.setProperty(
            this._elementRef.nativeElement,
            "value",
            null == e ? "" : e
          );
        }
        registerOnChange(e) {
          this.onChange = e;
        }
        registerOnTouched(e) {
          this.onTouched = e;
        }
        setDisabledState(e) {
          this._renderer.setProperty(
            this._elementRef.nativeElement,
            "disabled",
            e
          );
        }
        _handleInput(e) {
          (!this._compositionMode ||
            (this._compositionMode && !this._composing)) &&
            this.onChange(e);
        }
        _compositionStart() {
          this._composing = !0;
        }
        _compositionEnd(e) {
          (this._composing = !1), this._compositionMode && this.onChange(e);
        }
      }
      class Sm {
        get value() {
          return this.control ? this.control.value : null;
        }
        get valid() {
          return this.control ? this.control.valid : null;
        }
        get invalid() {
          return this.control ? this.control.invalid : null;
        }
        get pending() {
          return this.control ? this.control.pending : null;
        }
        get disabled() {
          return this.control ? this.control.disabled : null;
        }
        get enabled() {
          return this.control ? this.control.enabled : null;
        }
        get errors() {
          return this.control ? this.control.errors : null;
        }
        get pristine() {
          return this.control ? this.control.pristine : null;
        }
        get dirty() {
          return this.control ? this.control.dirty : null;
        }
        get touched() {
          return this.control ? this.control.touched : null;
        }
        get status() {
          return this.control ? this.control.status : null;
        }
        get untouched() {
          return this.control ? this.control.untouched : null;
        }
        get statusChanges() {
          return this.control ? this.control.statusChanges : null;
        }
        get valueChanges() {
          return this.control ? this.control.valueChanges : null;
        }
        get path() {
          return null;
        }
        reset(e) {
          this.control && this.control.reset(e);
        }
        hasError(e, t) {
          return !!this.control && this.control.hasError(e, t);
        }
        getError(e, t) {
          return this.control ? this.control.getError(e, t) : null;
        }
      }
      class Em extends Sm {
        get formDirective() {
          return null;
        }
        get path() {
          return null;
        }
      }
      function Tm() {
        throw new Error("unimplemented");
      }
      class xm extends Sm {
        constructor() {
          super(...arguments),
            (this._parent = null),
            (this.name = null),
            (this.valueAccessor = null),
            (this._rawValidators = []),
            (this._rawAsyncValidators = []);
        }
        get validator() {
          return Tm();
        }
        get asyncValidator() {
          return Tm();
        }
      }
      class km {
        constructor(e) {
          this._cd = e;
        }
        get ngClassUntouched() {
          return !!this._cd.control && this._cd.control.untouched;
        }
        get ngClassTouched() {
          return !!this._cd.control && this._cd.control.touched;
        }
        get ngClassPristine() {
          return !!this._cd.control && this._cd.control.pristine;
        }
        get ngClassDirty() {
          return !!this._cd.control && this._cd.control.dirty;
        }
        get ngClassValid() {
          return !!this._cd.control && this._cd.control.valid;
        }
        get ngClassInvalid() {
          return !!this._cd.control && this._cd.control.invalid;
        }
        get ngClassPending() {
          return !!this._cd.control && this._cd.control.pending;
        }
      }
      class Am extends km {
        constructor(e) {
          super(e);
        }
      }
      class Im extends km {
        constructor(e) {
          super(e);
        }
      }
      function Pm(e) {
        return null == e || 0 === e.length;
      }
      const Nm =
        /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      class Rm {
        static min(e) {
          return (t) => {
            if (Pm(t.value) || Pm(e)) return null;
            const n = parseFloat(t.value);
            return !isNaN(n) && n < e
              ? { min: { min: e, actual: t.value } }
              : null;
          };
        }
        static max(e) {
          return (t) => {
            if (Pm(t.value) || Pm(e)) return null;
            const n = parseFloat(t.value);
            return !isNaN(n) && n > e
              ? { max: { max: e, actual: t.value } }
              : null;
          };
        }
        static required(e) {
          return Pm(e.value) ? { required: !0 } : null;
        }
        static requiredTrue(e) {
          return !0 === e.value ? null : { required: !0 };
        }
        static email(e) {
          return Pm(e.value) || Nm.test(e.value) ? null : { email: !0 };
        }
        static minLength(e) {
          return (t) => {
            if (Pm(t.value)) return null;
            const n = t.value ? t.value.length : 0;
            return n < e
              ? { minlength: { requiredLength: e, actualLength: n } }
              : null;
          };
        }
        static maxLength(e) {
          return (t) => {
            const n = t.value ? t.value.length : 0;
            return n > e
              ? { maxlength: { requiredLength: e, actualLength: n } }
              : null;
          };
        }
        static pattern(e) {
          if (!e) return Rm.nullValidator;
          let t, n;
          return (
            "string" == typeof e
              ? ((n = ""),
                "^" !== e.charAt(0) && (n += "^"),
                (n += e),
                "$" !== e.charAt(e.length - 1) && (n += "$"),
                (t = new RegExp(n)))
              : ((n = e.toString()), (t = e)),
            (e) => {
              if (Pm(e.value)) return null;
              const r = e.value;
              return t.test(r)
                ? null
                : { pattern: { requiredPattern: n, actualValue: r } };
            }
          );
        }
        static nullValidator(e) {
          return null;
        }
        static compose(e) {
          if (!e) return null;
          const t = e.filter(Dm);
          return 0 == t.length
            ? null
            : function (e) {
                return Mm(
                  (function (e, t) {
                    return t.map((t) => t(e));
                  })(e, t)
                );
              };
        }
        static composeAsync(e) {
          if (!e) return null;
          const t = e.filter(Dm);
          return 0 == t.length
            ? null
            : function (e) {
                return (function (...e) {
                  if (1 === e.length) {
                    const t = e[0];
                    if (a(t)) return vm(t, null);
                    if (u(t) && Object.getPrototypeOf(t) === Object.prototype) {
                      const e = Object.keys(t);
                      return vm(
                        e.map((e) => t[e]),
                        e
                      );
                    }
                  }
                  if ("function" == typeof e[e.length - 1]) {
                    const t = e.pop();
                    return vm(
                      (e = 1 === e.length && a(e[0]) ? e[0] : e),
                      null
                    ).pipe(A((e) => t(...e)));
                  }
                  return vm(e, null);
                })(
                  (function (e, t) {
                    return t.map((t) => t(e));
                  })(e, t).map(Om)
                ).pipe(A(Mm));
              };
        }
      }
      function Dm(e) {
        return null != e;
      }
      function Om(e) {
        const t = Mt(e) ? L(e) : e;
        if (!Ft(t))
          throw new Error(
            "Expected validator to return Promise or Observable."
          );
        return t;
      }
      function Mm(e) {
        const t = e.reduce(
          (e, t) => (null != t ? Object.assign({}, e, t) : e),
          {}
        );
        return 0 === Object.keys(t).length ? null : t;
      }
      function Fm(e) {
        return e.validate ? (t) => e.validate(t) : e;
      }
      function Vm(e) {
        return e.validate ? (t) => e.validate(t) : e;
      }
      class Lm {
        constructor(e, t) {
          (this._renderer = e),
            (this._elementRef = t),
            (this.onChange = (e) => {}),
            (this.onTouched = () => {});
        }
        writeValue(e) {
          this._renderer.setProperty(
            this._elementRef.nativeElement,
            "value",
            null == e ? "" : e
          );
        }
        registerOnChange(e) {
          this.onChange = (t) => {
            e("" == t ? null : parseFloat(t));
          };
        }
        registerOnTouched(e) {
          this.onTouched = e;
        }
        setDisabledState(e) {
          this._renderer.setProperty(
            this._elementRef.nativeElement,
            "disabled",
            e
          );
        }
      }
      class Um {
        constructor() {
          this._accessors = [];
        }
        add(e, t) {
          this._accessors.push([e, t]);
        }
        remove(e) {
          for (let t = this._accessors.length - 1; t >= 0; --t)
            if (this._accessors[t][1] === e)
              return void this._accessors.splice(t, 1);
        }
        select(e) {
          this._accessors.forEach((t) => {
            this._isSameGroup(t, e) && t[1] !== e && t[1].fireUncheck(e.value);
          });
        }
        _isSameGroup(e, t) {
          return (
            !!e[0].control &&
            e[0]._parent === t._control._parent &&
            e[1].name === t.name
          );
        }
      }
      const jm =
          '\n    <div [formGroup]="myGroup">\n      <input formControlName="firstName">\n    </div>\n\n    In your class:\n\n    this.myGroup = new FormGroup({\n       firstName: new FormControl()\n    });',
        $m =
          '\n    <div [formGroup]="myGroup">\n       <div formGroupName="person">\n          <input formControlName="firstName">\n       </div>\n    </div>\n\n    In your class:\n\n    this.myGroup = new FormGroup({\n       person: new FormGroup({ firstName: new FormControl() })\n    });';
      class Hm {
        static controlParentException() {
          throw new Error(
            "formControlName must be used with a parent formGroup directive.  You'll want to add a formGroup\n       directive and pass it an existing FormGroup instance (you can create one in your class).\n\n      Example:\n\n      " +
              jm
          );
        }
        static ngModelGroupException() {
          throw new Error(
            `formControlName cannot be used with an ngModelGroup parent. It is only compatible with parents\n       that also have a "form" prefix: formGroupName, formArrayName, or formGroup.\n\n       Option 1:  Update the parent to be formGroupName (reactive form strategy)\n\n        ${$m}\n\n        Option 2: Use ngModel instead of formControlName (template-driven strategy)\n\n        \n    <form>\n       <div ngModelGroup="person">\n          <input [(ngModel)]="person.name" name="firstName">\n       </div>\n    </form>`
          );
        }
        static missingFormException() {
          throw new Error(
            "formGroup expects a FormGroup instance. Please pass one in.\n\n       Example:\n\n       " +
              jm
          );
        }
        static groupParentException() {
          throw new Error(
            "formGroupName must be used with a parent formGroup directive.  You'll want to add a formGroup\n      directive and pass it an existing FormGroup instance (you can create one in your class).\n\n      Example:\n\n      " +
              $m
          );
        }
        static arrayParentException() {
          throw new Error(
            'formArrayName must be used with a parent formGroup directive.  You\'ll want to add a formGroup\n       directive and pass it an existing FormGroup instance (you can create one in your class).\n\n        Example:\n\n        \n    <div [formGroup]="myGroup">\n      <div formArrayName="cities">\n        <div *ngFor="let city of cityArray.controls; index as i">\n          <input [formControlName]="i">\n        </div>\n      </div>\n    </div>\n\n    In your class:\n\n    this.cityArray = new FormArray([new FormControl(\'SF\')]);\n    this.myGroup = new FormGroup({\n      cities: this.cityArray\n    });'
          );
        }
        static disabledAttrWarning() {
          console.warn(
            "\n      It looks like you're using the disabled attribute with a reactive form directive. If you set disabled to true\n      when you set up this control in your component class, the disabled attribute will actually be set in the DOM for\n      you. We recommend using this approach to avoid 'changed after checked' errors.\n       \n      Example: \n      form = new FormGroup({\n        first: new FormControl({value: 'Nancy', disabled: true}, Validators.required),\n        last: new FormControl('Drew', Validators.required)\n      });\n    "
          );
        }
        static ngModelWarning(e) {
          console.warn(
            `\n    It looks like you're using ngModel on the same form field as ${e}. \n    Support for using the ngModel input property and ngModelChange event with \n    reactive form directives has been deprecated in Angular v6 and will be removed \n    in Angular v7.\n    \n    For more information on this, see our API docs here:\n    https://angular.io/api/forms/${
              "formControl" === e ? "FormControlDirective" : "FormControlName"
            }#use-with-ngmodel\n    `
          );
        }
      }
      function Bm(e, t) {
        return [...t.path, e];
      }
      function zm(e, t) {
        e || Km(t, "Cannot find control with"),
          t.valueAccessor || Km(t, "No value accessor for form control with"),
          (e.validator = Rm.compose([e.validator, t.validator])),
          (e.asyncValidator = Rm.composeAsync([
            e.asyncValidator,
            t.asyncValidator,
          ])),
          t.valueAccessor.writeValue(e.value),
          (function (e, t) {
            t.valueAccessor.registerOnChange((n) => {
              (e._pendingValue = n),
                (e._pendingChange = !0),
                (e._pendingDirty = !0),
                "change" === e.updateOn && qm(e, t);
            });
          })(e, t),
          (function (e, t) {
            e.registerOnChange((e, n) => {
              t.valueAccessor.writeValue(e), n && t.viewToModelUpdate(e);
            });
          })(e, t),
          (function (e, t) {
            t.valueAccessor.registerOnTouched(() => {
              (e._pendingTouched = !0),
                "blur" === e.updateOn && e._pendingChange && qm(e, t),
                "submit" !== e.updateOn && e.markAsTouched();
            });
          })(e, t),
          t.valueAccessor.setDisabledState &&
            e.registerOnDisabledChange((e) => {
              t.valueAccessor.setDisabledState(e);
            }),
          t._rawValidators.forEach((t) => {
            t.registerOnValidatorChange &&
              t.registerOnValidatorChange(() => e.updateValueAndValidity());
          }),
          t._rawAsyncValidators.forEach((t) => {
            t.registerOnValidatorChange &&
              t.registerOnValidatorChange(() => e.updateValueAndValidity());
          });
      }
      function qm(e, t) {
        e._pendingDirty && e.markAsDirty(),
          e.setValue(e._pendingValue, { emitModelToViewChange: !1 }),
          t.viewToModelUpdate(e._pendingValue),
          (e._pendingChange = !1);
      }
      function Wm(e, t) {
        null == e && Km(t, "Cannot find control with"),
          (e.validator = Rm.compose([e.validator, t.validator])),
          (e.asyncValidator = Rm.composeAsync([
            e.asyncValidator,
            t.asyncValidator,
          ]));
      }
      function Gm(e) {
        return Km(
          e,
          "There is no FormControl instance attached to form control element with"
        );
      }
      function Km(e, t) {
        let n;
        throw (
          ((n =
            e.path.length > 1
              ? `path: '${e.path.join(" -> ")}'`
              : e.path[0]
              ? `name: '${e.path}'`
              : "unspecified name attribute"),
          new Error(`${t} ${n}`))
        );
      }
      function Qm(e) {
        return null != e ? Rm.compose(e.map(Fm)) : null;
      }
      function Zm(e) {
        return null != e ? Rm.composeAsync(e.map(Vm)) : null;
      }
      const Xm = [
        class {
          constructor(e, t) {
            (this._renderer = e),
              (this._elementRef = t),
              (this.onChange = (e) => {}),
              (this.onTouched = () => {});
          }
          writeValue(e) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "checked",
              e
            );
          }
          registerOnChange(e) {
            this.onChange = e;
          }
          registerOnTouched(e) {
            this.onTouched = e;
          }
          setDisabledState(e) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "disabled",
              e
            );
          }
        },
        class {
          constructor(e, t) {
            (this._renderer = e),
              (this._elementRef = t),
              (this.onChange = (e) => {}),
              (this.onTouched = () => {});
          }
          writeValue(e) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "value",
              parseFloat(e)
            );
          }
          registerOnChange(e) {
            this.onChange = (t) => {
              e("" == t ? null : parseFloat(t));
            };
          }
          registerOnTouched(e) {
            this.onTouched = e;
          }
          setDisabledState(e) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "disabled",
              e
            );
          }
        },
        Lm,
        class {
          constructor(e, t) {
            (this._renderer = e),
              (this._elementRef = t),
              (this._optionMap = new Map()),
              (this._idCounter = 0),
              (this.onChange = (e) => {}),
              (this.onTouched = () => {}),
              (this._compareWith = Pt);
          }
          set compareWith(e) {
            if ("function" != typeof e)
              throw new Error(
                "compareWith must be a function, but received " +
                  JSON.stringify(e)
              );
            this._compareWith = e;
          }
          writeValue(e) {
            this.value = e;
            const t = this._getOptionId(e);
            null == t &&
              this._renderer.setProperty(
                this._elementRef.nativeElement,
                "selectedIndex",
                -1
              );
            const n = (function (e, t) {
              return null == e
                ? "" + t
                : (t && "object" == typeof t && (t = "Object"),
                  `${e}: ${t}`.slice(0, 50));
            })(t, e);
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "value",
              n
            );
          }
          registerOnChange(e) {
            this.onChange = (t) => {
              (this.value = this._getOptionValue(t)), e(this.value);
            };
          }
          registerOnTouched(e) {
            this.onTouched = e;
          }
          setDisabledState(e) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "disabled",
              e
            );
          }
          _registerOption() {
            return (this._idCounter++).toString();
          }
          _getOptionId(e) {
            for (const t of Array.from(this._optionMap.keys()))
              if (this._compareWith(this._optionMap.get(t), e)) return t;
            return null;
          }
          _getOptionValue(e) {
            const t = (function (e) {
              return e.split(":")[0];
            })(e);
            return this._optionMap.has(t) ? this._optionMap.get(t) : e;
          }
        },
        class {
          constructor(e, t) {
            (this._renderer = e),
              (this._elementRef = t),
              (this._optionMap = new Map()),
              (this._idCounter = 0),
              (this.onChange = (e) => {}),
              (this.onTouched = () => {}),
              (this._compareWith = Pt);
          }
          set compareWith(e) {
            if ("function" != typeof e)
              throw new Error(
                "compareWith must be a function, but received " +
                  JSON.stringify(e)
              );
            this._compareWith = e;
          }
          writeValue(e) {
            let t;
            if (((this.value = e), Array.isArray(e))) {
              const n = e.map((e) => this._getOptionId(e));
              t = (e, t) => {
                e._setSelected(n.indexOf(t.toString()) > -1);
              };
            } else
              t = (e, t) => {
                e._setSelected(!1);
              };
            this._optionMap.forEach(t);
          }
          registerOnChange(e) {
            this.onChange = (t) => {
              const n = [];
              if (t.hasOwnProperty("selectedOptions")) {
                const e = t.selectedOptions;
                for (let t = 0; t < e.length; t++) {
                  const r = e.item(t),
                    s = this._getOptionValue(r.value);
                  n.push(s);
                }
              } else {
                const e = t.options;
                for (let t = 0; t < e.length; t++) {
                  const r = e.item(t);
                  if (r.selected) {
                    const e = this._getOptionValue(r.value);
                    n.push(e);
                  }
                }
              }
              (this.value = n), e(n);
            };
          }
          registerOnTouched(e) {
            this.onTouched = e;
          }
          setDisabledState(e) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "disabled",
              e
            );
          }
          _registerOption(e) {
            const t = (this._idCounter++).toString();
            return this._optionMap.set(t, e), t;
          }
          _getOptionId(e) {
            for (const t of Array.from(this._optionMap.keys()))
              if (this._compareWith(this._optionMap.get(t)._value, e)) return t;
            return null;
          }
          _getOptionValue(e) {
            const t = (function (e) {
              return e.split(":")[0];
            })(e);
            return this._optionMap.has(t) ? this._optionMap.get(t)._value : e;
          }
        },
        class {
          constructor(e, t, n, r) {
            (this._renderer = e),
              (this._elementRef = t),
              (this._registry = n),
              (this._injector = r),
              (this.onChange = () => {}),
              (this.onTouched = () => {});
          }
          ngOnInit() {
            (this._control = this._injector.get(xm)),
              this._checkName(),
              this._registry.add(this._control, this);
          }
          ngOnDestroy() {
            this._registry.remove(this);
          }
          writeValue(e) {
            (this._state = e === this.value),
              this._renderer.setProperty(
                this._elementRef.nativeElement,
                "checked",
                this._state
              );
          }
          registerOnChange(e) {
            (this._fn = e),
              (this.onChange = () => {
                e(this.value), this._registry.select(this);
              });
          }
          fireUncheck(e) {
            this.writeValue(e);
          }
          registerOnTouched(e) {
            this.onTouched = e;
          }
          setDisabledState(e) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "disabled",
              e
            );
          }
          _checkName() {
            this.name &&
              this.formControlName &&
              this.name !== this.formControlName &&
              this._throwNameError(),
              !this.name &&
                this.formControlName &&
                (this.name = this.formControlName);
          }
          _throwNameError() {
            throw new Error(
              '\n      If you define both a name and a formControlName attribute on your radio button, their values\n      must match. Ex: <input type="radio" formControlName="food" name="food">\n    '
            );
          }
        },
      ];
      function Jm(e) {
        const t = ey(e) ? e.validators : e;
        return Array.isArray(t) ? Qm(t) : t || null;
      }
      function Ym(e, t) {
        const n = ey(t) ? t.asyncValidators : e;
        return Array.isArray(n) ? Zm(n) : n || null;
      }
      function ey(e) {
        return null != e && !Array.isArray(e) && "object" == typeof e;
      }
      class ty {
        constructor(e, t) {
          (this.validator = e),
            (this.asyncValidator = t),
            (this._onCollectionChange = () => {}),
            (this.pristine = !0),
            (this.touched = !1),
            (this._onDisabledChange = []);
        }
        get parent() {
          return this._parent;
        }
        get valid() {
          return "VALID" === this.status;
        }
        get invalid() {
          return "INVALID" === this.status;
        }
        get pending() {
          return "PENDING" == this.status;
        }
        get disabled() {
          return "DISABLED" === this.status;
        }
        get enabled() {
          return "DISABLED" !== this.status;
        }
        get dirty() {
          return !this.pristine;
        }
        get untouched() {
          return !this.touched;
        }
        get updateOn() {
          return this._updateOn
            ? this._updateOn
            : this.parent
            ? this.parent.updateOn
            : "change";
        }
        setValidators(e) {
          this.validator = Jm(e);
        }
        setAsyncValidators(e) {
          this.asyncValidator = Ym(e);
        }
        clearValidators() {
          this.validator = null;
        }
        clearAsyncValidators() {
          this.asyncValidator = null;
        }
        markAsTouched(e = {}) {
          (this.touched = !0),
            this._parent && !e.onlySelf && this._parent.markAsTouched(e);
        }
        markAllAsTouched() {
          this.markAsTouched({ onlySelf: !0 }),
            this._forEachChild((e) => e.markAllAsTouched());
        }
        markAsUntouched(e = {}) {
          (this.touched = !1),
            (this._pendingTouched = !1),
            this._forEachChild((e) => {
              e.markAsUntouched({ onlySelf: !0 });
            }),
            this._parent && !e.onlySelf && this._parent._updateTouched(e);
        }
        markAsDirty(e = {}) {
          (this.pristine = !1),
            this._parent && !e.onlySelf && this._parent.markAsDirty(e);
        }
        markAsPristine(e = {}) {
          (this.pristine = !0),
            (this._pendingDirty = !1),
            this._forEachChild((e) => {
              e.markAsPristine({ onlySelf: !0 });
            }),
            this._parent && !e.onlySelf && this._parent._updatePristine(e);
        }
        markAsPending(e = {}) {
          (this.status = "PENDING"),
            !1 !== e.emitEvent && this.statusChanges.emit(this.status),
            this._parent && !e.onlySelf && this._parent.markAsPending(e);
        }
        disable(e = {}) {
          const t = this._parentMarkedDirty(e.onlySelf);
          (this.status = "DISABLED"),
            (this.errors = null),
            this._forEachChild((t) => {
              t.disable(Object.assign({}, e, { onlySelf: !0 }));
            }),
            this._updateValue(),
            !1 !== e.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._updateAncestors(
              Object.assign({}, e, { skipPristineCheck: t })
            ),
            this._onDisabledChange.forEach((e) => e(!0));
        }
        enable(e = {}) {
          const t = this._parentMarkedDirty(e.onlySelf);
          (this.status = "VALID"),
            this._forEachChild((t) => {
              t.enable(Object.assign({}, e, { onlySelf: !0 }));
            }),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: e.emitEvent,
            }),
            this._updateAncestors(
              Object.assign({}, e, { skipPristineCheck: t })
            ),
            this._onDisabledChange.forEach((e) => e(!1));
        }
        _updateAncestors(e) {
          this._parent &&
            !e.onlySelf &&
            (this._parent.updateValueAndValidity(e),
            e.skipPristineCheck || this._parent._updatePristine(),
            this._parent._updateTouched());
        }
        setParent(e) {
          this._parent = e;
        }
        updateValueAndValidity(e = {}) {
          this._setInitialStatus(),
            this._updateValue(),
            this.enabled &&
              (this._cancelExistingSubscription(),
              (this.errors = this._runValidator()),
              (this.status = this._calculateStatus()),
              ("VALID" !== this.status && "PENDING" !== this.status) ||
                this._runAsyncValidator(e.emitEvent)),
            !1 !== e.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._parent &&
              !e.onlySelf &&
              this._parent.updateValueAndValidity(e);
        }
        _updateTreeValidity(e = { emitEvent: !0 }) {
          this._forEachChild((t) => t._updateTreeValidity(e)),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: e.emitEvent,
            });
        }
        _setInitialStatus() {
          this.status = this._allControlsDisabled() ? "DISABLED" : "VALID";
        }
        _runValidator() {
          return this.validator ? this.validator(this) : null;
        }
        _runAsyncValidator(e) {
          if (this.asyncValidator) {
            this.status = "PENDING";
            const t = Om(this.asyncValidator(this));
            this._asyncValidationSubscription = t.subscribe((t) =>
              this.setErrors(t, { emitEvent: e })
            );
          }
        }
        _cancelExistingSubscription() {
          this._asyncValidationSubscription &&
            this._asyncValidationSubscription.unsubscribe();
        }
        setErrors(e, t = {}) {
          (this.errors = e), this._updateControlsErrors(!1 !== t.emitEvent);
        }
        get(e) {
          return (function (e, t, n) {
            return null == t
              ? null
              : (t instanceof Array || (t = t.split(".")),
                t instanceof Array && 0 === t.length
                  ? null
                  : t.reduce(
                      (e, t) =>
                        e instanceof ry
                          ? e.controls.hasOwnProperty(t)
                            ? e.controls[t]
                            : null
                          : (e instanceof sy && e.at(t)) || null,
                      e
                    ));
          })(this, e);
        }
        getError(e, t) {
          const n = t ? this.get(t) : this;
          return n && n.errors ? n.errors[e] : null;
        }
        hasError(e, t) {
          return !!this.getError(e, t);
        }
        get root() {
          let e = this;
          for (; e._parent; ) e = e._parent;
          return e;
        }
        _updateControlsErrors(e) {
          (this.status = this._calculateStatus()),
            e && this.statusChanges.emit(this.status),
            this._parent && this._parent._updateControlsErrors(e);
        }
        _initObservables() {
          (this.valueChanges = new gs()), (this.statusChanges = new gs());
        }
        _calculateStatus() {
          return this._allControlsDisabled()
            ? "DISABLED"
            : this.errors
            ? "INVALID"
            : this._anyControlsHaveStatus("PENDING")
            ? "PENDING"
            : this._anyControlsHaveStatus("INVALID")
            ? "INVALID"
            : "VALID";
        }
        _anyControlsHaveStatus(e) {
          return this._anyControls((t) => t.status === e);
        }
        _anyControlsDirty() {
          return this._anyControls((e) => e.dirty);
        }
        _anyControlsTouched() {
          return this._anyControls((e) => e.touched);
        }
        _updatePristine(e = {}) {
          (this.pristine = !this._anyControlsDirty()),
            this._parent && !e.onlySelf && this._parent._updatePristine(e);
        }
        _updateTouched(e = {}) {
          (this.touched = this._anyControlsTouched()),
            this._parent && !e.onlySelf && this._parent._updateTouched(e);
        }
        _isBoxedValue(e) {
          return (
            "object" == typeof e &&
            null !== e &&
            2 === Object.keys(e).length &&
            "value" in e &&
            "disabled" in e
          );
        }
        _registerOnCollectionChange(e) {
          this._onCollectionChange = e;
        }
        _setUpdateStrategy(e) {
          ey(e) && null != e.updateOn && (this._updateOn = e.updateOn);
        }
        _parentMarkedDirty(e) {
          return (
            !e &&
            this._parent &&
            this._parent.dirty &&
            !this._parent._anyControlsDirty()
          );
        }
      }
      class ny extends ty {
        constructor(e = null, t, n) {
          super(Jm(t), Ym(n, t)),
            (this._onChange = []),
            this._applyFormState(e),
            this._setUpdateStrategy(t),
            this.updateValueAndValidity({ onlySelf: !0, emitEvent: !1 }),
            this._initObservables();
        }
        setValue(e, t = {}) {
          (this.value = this._pendingValue = e),
            this._onChange.length &&
              !1 !== t.emitModelToViewChange &&
              this._onChange.forEach((e) =>
                e(this.value, !1 !== t.emitViewToModelChange)
              ),
            this.updateValueAndValidity(t);
        }
        patchValue(e, t = {}) {
          this.setValue(e, t);
        }
        reset(e = null, t = {}) {
          this._applyFormState(e),
            this.markAsPristine(t),
            this.markAsUntouched(t),
            this.setValue(this.value, t),
            (this._pendingChange = !1);
        }
        _updateValue() {}
        _anyControls(e) {
          return !1;
        }
        _allControlsDisabled() {
          return this.disabled;
        }
        registerOnChange(e) {
          this._onChange.push(e);
        }
        _clearChangeFns() {
          (this._onChange = []),
            (this._onDisabledChange = []),
            (this._onCollectionChange = () => {});
        }
        registerOnDisabledChange(e) {
          this._onDisabledChange.push(e);
        }
        _forEachChild(e) {}
        _syncPendingControls() {
          return !(
            "submit" !== this.updateOn ||
            (this._pendingDirty && this.markAsDirty(),
            this._pendingTouched && this.markAsTouched(),
            !this._pendingChange) ||
            (this.setValue(this._pendingValue, {
              onlySelf: !0,
              emitModelToViewChange: !1,
            }),
            0)
          );
        }
        _applyFormState(e) {
          this._isBoxedValue(e)
            ? ((this.value = this._pendingValue = e.value),
              e.disabled
                ? this.disable({ onlySelf: !0, emitEvent: !1 })
                : this.enable({ onlySelf: !0, emitEvent: !1 }))
            : (this.value = this._pendingValue = e);
        }
      }
      class ry extends ty {
        constructor(e, t, n) {
          super(Jm(t), Ym(n, t)),
            (this.controls = e),
            this._initObservables(),
            this._setUpdateStrategy(t),
            this._setUpControls(),
            this.updateValueAndValidity({ onlySelf: !0, emitEvent: !1 });
        }
        registerControl(e, t) {
          return this.controls[e]
            ? this.controls[e]
            : ((this.controls[e] = t),
              t.setParent(this),
              t._registerOnCollectionChange(this._onCollectionChange),
              t);
        }
        addControl(e, t) {
          this.registerControl(e, t),
            this.updateValueAndValidity(),
            this._onCollectionChange();
        }
        removeControl(e) {
          this.controls[e] &&
            this.controls[e]._registerOnCollectionChange(() => {}),
            delete this.controls[e],
            this.updateValueAndValidity(),
            this._onCollectionChange();
        }
        setControl(e, t) {
          this.controls[e] &&
            this.controls[e]._registerOnCollectionChange(() => {}),
            delete this.controls[e],
            t && this.registerControl(e, t),
            this.updateValueAndValidity(),
            this._onCollectionChange();
        }
        contains(e) {
          return this.controls.hasOwnProperty(e) && this.controls[e].enabled;
        }
        setValue(e, t = {}) {
          this._checkAllValuesPresent(e),
            Object.keys(e).forEach((n) => {
              this._throwIfControlMissing(n),
                this.controls[n].setValue(e[n], {
                  onlySelf: !0,
                  emitEvent: t.emitEvent,
                });
            }),
            this.updateValueAndValidity(t);
        }
        patchValue(e, t = {}) {
          Object.keys(e).forEach((n) => {
            this.controls[n] &&
              this.controls[n].patchValue(e[n], {
                onlySelf: !0,
                emitEvent: t.emitEvent,
              });
          }),
            this.updateValueAndValidity(t);
        }
        reset(e = {}, t = {}) {
          this._forEachChild((n, r) => {
            n.reset(e[r], { onlySelf: !0, emitEvent: t.emitEvent });
          }),
            this._updatePristine(t),
            this._updateTouched(t),
            this.updateValueAndValidity(t);
        }
        getRawValue() {
          return this._reduceChildren(
            {},
            (e, t, n) => (
              (e[n] = t instanceof ny ? t.value : t.getRawValue()), e
            )
          );
        }
        _syncPendingControls() {
          let e = this._reduceChildren(
            !1,
            (e, t) => !!t._syncPendingControls() || e
          );
          return e && this.updateValueAndValidity({ onlySelf: !0 }), e;
        }
        _throwIfControlMissing(e) {
          if (!Object.keys(this.controls).length)
            throw new Error(
              "\n        There are no form controls registered with this group yet.  If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      "
            );
          if (!this.controls[e])
            throw new Error(`Cannot find form control with name: ${e}.`);
        }
        _forEachChild(e) {
          Object.keys(this.controls).forEach((t) => e(this.controls[t], t));
        }
        _setUpControls() {
          this._forEachChild((e) => {
            e.setParent(this),
              e._registerOnCollectionChange(this._onCollectionChange);
          });
        }
        _updateValue() {
          this.value = this._reduceValue();
        }
        _anyControls(e) {
          let t = !1;
          return (
            this._forEachChild((n, r) => {
              t = t || (this.contains(r) && e(n));
            }),
            t
          );
        }
        _reduceValue() {
          return this._reduceChildren(
            {},
            (e, t, n) => ((t.enabled || this.disabled) && (e[n] = t.value), e)
          );
        }
        _reduceChildren(e, t) {
          let n = e;
          return (
            this._forEachChild((e, r) => {
              n = t(n, e, r);
            }),
            n
          );
        }
        _allControlsDisabled() {
          for (const e of Object.keys(this.controls))
            if (this.controls[e].enabled) return !1;
          return Object.keys(this.controls).length > 0 || this.disabled;
        }
        _checkAllValuesPresent(e) {
          this._forEachChild((t, n) => {
            if (void 0 === e[n])
              throw new Error(
                `Must supply a value for form control with name: '${n}'.`
              );
          });
        }
      }
      class sy extends ty {
        constructor(e, t, n) {
          super(Jm(t), Ym(n, t)),
            (this.controls = e),
            this._initObservables(),
            this._setUpdateStrategy(t),
            this._setUpControls(),
            this.updateValueAndValidity({ onlySelf: !0, emitEvent: !1 });
        }
        at(e) {
          return this.controls[e];
        }
        push(e) {
          this.controls.push(e),
            this._registerControl(e),
            this.updateValueAndValidity(),
            this._onCollectionChange();
        }
        insert(e, t) {
          this.controls.splice(e, 0, t),
            this._registerControl(t),
            this.updateValueAndValidity();
        }
        removeAt(e) {
          this.controls[e] &&
            this.controls[e]._registerOnCollectionChange(() => {}),
            this.controls.splice(e, 1),
            this.updateValueAndValidity();
        }
        setControl(e, t) {
          this.controls[e] &&
            this.controls[e]._registerOnCollectionChange(() => {}),
            this.controls.splice(e, 1),
            t && (this.controls.splice(e, 0, t), this._registerControl(t)),
            this.updateValueAndValidity(),
            this._onCollectionChange();
        }
        get length() {
          return this.controls.length;
        }
        setValue(e, t = {}) {
          this._checkAllValuesPresent(e),
            e.forEach((e, n) => {
              this._throwIfControlMissing(n),
                this.at(n).setValue(e, {
                  onlySelf: !0,
                  emitEvent: t.emitEvent,
                });
            }),
            this.updateValueAndValidity(t);
        }
        patchValue(e, t = {}) {
          e.forEach((e, n) => {
            this.at(n) &&
              this.at(n).patchValue(e, {
                onlySelf: !0,
                emitEvent: t.emitEvent,
              });
          }),
            this.updateValueAndValidity(t);
        }
        reset(e = [], t = {}) {
          this._forEachChild((n, r) => {
            n.reset(e[r], { onlySelf: !0, emitEvent: t.emitEvent });
          }),
            this._updatePristine(t),
            this._updateTouched(t),
            this.updateValueAndValidity(t);
        }
        getRawValue() {
          return this.controls.map((e) =>
            e instanceof ny ? e.value : e.getRawValue()
          );
        }
        clear() {
          this.controls.length < 1 ||
            (this._forEachChild((e) => e._registerOnCollectionChange(() => {})),
            this.controls.splice(0),
            this.updateValueAndValidity());
        }
        _syncPendingControls() {
          let e = this.controls.reduce(
            (e, t) => !!t._syncPendingControls() || e,
            !1
          );
          return e && this.updateValueAndValidity({ onlySelf: !0 }), e;
        }
        _throwIfControlMissing(e) {
          if (!this.controls.length)
            throw new Error(
              "\n        There are no form controls registered with this array yet.  If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      "
            );
          if (!this.at(e))
            throw new Error("Cannot find form control at index " + e);
        }
        _forEachChild(e) {
          this.controls.forEach((t, n) => {
            e(t, n);
          });
        }
        _updateValue() {
          this.value = this.controls
            .filter((e) => e.enabled || this.disabled)
            .map((e) => e.value);
        }
        _anyControls(e) {
          return this.controls.some((t) => t.enabled && e(t));
        }
        _setUpControls() {
          this._forEachChild((e) => this._registerControl(e));
        }
        _checkAllValuesPresent(e) {
          this._forEachChild((t, n) => {
            if (void 0 === e[n])
              throw new Error(
                `Must supply a value for form control at index: ${n}.`
              );
          });
        }
        _allControlsDisabled() {
          for (const e of this.controls) if (e.enabled) return !1;
          return this.controls.length > 0 || this.disabled;
        }
        _registerControl(e) {
          e.setParent(this),
            e._registerOnCollectionChange(this._onCollectionChange);
        }
      }
      const iy = new ve("NgFormSelectorWarning");
      class oy extends Em {
        ngOnInit() {
          this._checkParentType(), this.formDirective.addFormGroup(this);
        }
        ngOnDestroy() {
          this.formDirective && this.formDirective.removeFormGroup(this);
        }
        get control() {
          return this.formDirective.getFormGroup(this);
        }
        get path() {
          return Bm(this.name, this._parent);
        }
        get formDirective() {
          return this._parent ? this._parent.formDirective : null;
        }
        get validator() {
          return Qm(this._validators);
        }
        get asyncValidator() {
          return Zm(this._asyncValidators);
        }
        _checkParentType() {}
      }
      class ly {}
      const ay = new ve("NgModelWithFormControlWarning");
      class uy extends Em {
        constructor(e, t) {
          super(),
            (this._validators = e),
            (this._asyncValidators = t),
            (this.submitted = !1),
            (this.directives = []),
            (this.form = null),
            (this.ngSubmit = new gs());
        }
        ngOnChanges(e) {
          this._checkFormPresent(),
            e.hasOwnProperty("form") &&
              (this._updateValidators(),
              this._updateDomValue(),
              this._updateRegistrations());
        }
        get formDirective() {
          return this;
        }
        get control() {
          return this.form;
        }
        get path() {
          return [];
        }
        addControl(e) {
          const t = this.form.get(e.path);
          return (
            zm(t, e),
            t.updateValueAndValidity({ emitEvent: !1 }),
            this.directives.push(e),
            t
          );
        }
        getControl(e) {
          return this.form.get(e.path);
        }
        removeControl(e) {
          !(function (e, t) {
            const n = e.indexOf(t);
            n > -1 && e.splice(n, 1);
          })(this.directives, e);
        }
        addFormGroup(e) {
          const t = this.form.get(e.path);
          Wm(t, e), t.updateValueAndValidity({ emitEvent: !1 });
        }
        removeFormGroup(e) {}
        getFormGroup(e) {
          return this.form.get(e.path);
        }
        addFormArray(e) {
          const t = this.form.get(e.path);
          Wm(t, e), t.updateValueAndValidity({ emitEvent: !1 });
        }
        removeFormArray(e) {}
        getFormArray(e) {
          return this.form.get(e.path);
        }
        updateModel(e, t) {
          this.form.get(e.path).setValue(t);
        }
        onSubmit(e) {
          return (
            (this.submitted = !0),
            (t = this.directives),
            this.form._syncPendingControls(),
            t.forEach((e) => {
              const t = e.control;
              "submit" === t.updateOn &&
                t._pendingChange &&
                (e.viewToModelUpdate(t._pendingValue), (t._pendingChange = !1));
            }),
            this.ngSubmit.emit(e),
            !1
          );
          var t;
        }
        onReset() {
          this.resetForm();
        }
        resetForm(e) {
          this.form.reset(e), (this.submitted = !1);
        }
        _updateDomValue() {
          this.directives.forEach((e) => {
            const t = this.form.get(e.path);
            e.control !== t &&
              ((function (e, t) {
                t.valueAccessor.registerOnChange(() => Gm(t)),
                  t.valueAccessor.registerOnTouched(() => Gm(t)),
                  t._rawValidators.forEach((e) => {
                    e.registerOnValidatorChange &&
                      e.registerOnValidatorChange(null);
                  }),
                  t._rawAsyncValidators.forEach((e) => {
                    e.registerOnValidatorChange &&
                      e.registerOnValidatorChange(null);
                  }),
                  e && e._clearChangeFns();
              })(e.control, e),
              t && zm(t, e),
              (e.control = t));
          }),
            this.form._updateTreeValidity({ emitEvent: !1 });
        }
        _updateRegistrations() {
          this.form._registerOnCollectionChange(() => this._updateDomValue()),
            this._oldForm &&
              this._oldForm._registerOnCollectionChange(() => {}),
            (this._oldForm = this.form);
        }
        _updateValidators() {
          const e = Qm(this._validators);
          this.form.validator = Rm.compose([this.form.validator, e]);
          const t = Zm(this._asyncValidators);
          this.form.asyncValidator = Rm.composeAsync([
            this.form.asyncValidator,
            t,
          ]);
        }
        _checkFormPresent() {
          this.form || Hm.missingFormException();
        }
      }
      class cy extends oy {
        constructor(e, t, n) {
          super(),
            (this._parent = e),
            (this._validators = t),
            (this._asyncValidators = n);
        }
        _checkParentType() {
          dy(this._parent) && Hm.groupParentException();
        }
      }
      class hy extends Em {
        constructor(e, t, n) {
          super(),
            (this._parent = e),
            (this._validators = t),
            (this._asyncValidators = n);
        }
        ngOnInit() {
          this._checkParentType(), this.formDirective.addFormArray(this);
        }
        ngOnDestroy() {
          this.formDirective && this.formDirective.removeFormArray(this);
        }
        get control() {
          return this.formDirective.getFormArray(this);
        }
        get formDirective() {
          return this._parent ? this._parent.formDirective : null;
        }
        get path() {
          return Bm(this.name, this._parent);
        }
        get validator() {
          return Qm(this._validators);
        }
        get asyncValidator() {
          return Zm(this._asyncValidators);
        }
        _checkParentType() {
          dy(this._parent) && Hm.arrayParentException();
        }
      }
      function dy(e) {
        return !(e instanceof cy || e instanceof uy || e instanceof hy);
      }
      let py = (() => {
        class e extends xm {
          constructor(e, t, n, r, s) {
            super(),
              (this._ngModelWarningConfig = s),
              (this._added = !1),
              (this.update = new gs()),
              (this._ngModelWarningSent = !1),
              (this._parent = e),
              (this._rawValidators = t || []),
              (this._rawAsyncValidators = n || []),
              (this.valueAccessor = (function (e, t) {
                if (!t) return null;
                Array.isArray(t) ||
                  Km(
                    e,
                    "Value accessor was not provided as an array for form control with"
                  );
                let n = void 0,
                  r = void 0,
                  s = void 0;
                return (
                  t.forEach((t) => {
                    var i;
                    t.constructor === Cm
                      ? (n = t)
                      : ((i = t),
                        Xm.some((e) => i.constructor === e)
                          ? (r &&
                              Km(
                                e,
                                "More than one built-in value accessor matches form control with"
                              ),
                            (r = t))
                          : (s &&
                              Km(
                                e,
                                "More than one custom value accessor matches form control with"
                              ),
                            (s = t)));
                  }),
                  s ||
                    r ||
                    n ||
                    (Km(e, "No valid value accessor for form control with"),
                    null)
                );
              })(this, r));
          }
          set isDisabled(e) {
            Hm.disabledAttrWarning();
          }
          ngOnChanges(t) {
            var n, r;
            this._added || this._setUpControl(),
              (function (e, t) {
                if (!e.hasOwnProperty("model")) return !1;
                const n = e.model;
                return !!n.isFirstChange() || !Pt(t, n.currentValue);
              })(t, this.viewModel) &&
                ("formControlName",
                (n = e),
                this,
                (r = this._ngModelWarningConfig),
                $e() &&
                  "never" !== r &&
                  ((((null !== r && "once" !== r) ||
                    n._ngModelWarningSentOnce) &&
                    ("always" !== r || this._ngModelWarningSent)) ||
                    (Hm.ngModelWarning("formControlName"),
                    (n._ngModelWarningSentOnce = !0),
                    (this._ngModelWarningSent = !0))),
                (this.viewModel = this.model),
                this.formDirective.updateModel(this, this.model));
          }
          ngOnDestroy() {
            this.formDirective && this.formDirective.removeControl(this);
          }
          viewToModelUpdate(e) {
            (this.viewModel = e), this.update.emit(e);
          }
          get path() {
            return Bm(this.name, this._parent);
          }
          get formDirective() {
            return this._parent ? this._parent.formDirective : null;
          }
          get validator() {
            return Qm(this._rawValidators);
          }
          get asyncValidator() {
            return Zm(this._rawAsyncValidators);
          }
          _checkParentType() {
            !(this._parent instanceof cy) && this._parent instanceof oy
              ? Hm.ngModelGroupException()
              : this._parent instanceof cy ||
                this._parent instanceof uy ||
                this._parent instanceof hy ||
                Hm.controlParentException();
          }
          _setUpControl() {
            this._checkParentType(),
              (this.control = this.formDirective.addControl(this)),
              this.control.disabled &&
                this.valueAccessor.setDisabledState &&
                this.valueAccessor.setDisabledState(!0),
              (this._added = !0);
          }
        }
        return (e._ngModelWarningSentOnce = !1), e;
      })();
      class fy {}
      class gy {
        group(e, t = null) {
          const n = this._reduceControls(e);
          let r = null,
            s = null,
            i = void 0;
          return (
            null != t &&
              ((function (e) {
                return (
                  void 0 !== e.asyncValidators ||
                  void 0 !== e.validators ||
                  void 0 !== e.updateOn
                );
              })(t)
                ? ((r = null != t.validators ? t.validators : null),
                  (s = null != t.asyncValidators ? t.asyncValidators : null),
                  (i = null != t.updateOn ? t.updateOn : void 0))
                : ((r = null != t.validator ? t.validator : null),
                  (s = null != t.asyncValidator ? t.asyncValidator : null))),
            new ry(n, { asyncValidators: s, updateOn: i, validators: r })
          );
        }
        control(e, t, n) {
          return new ny(e, t, n);
        }
        array(e, t, n) {
          const r = e.map((e) => this._createControl(e));
          return new sy(r, t, n);
        }
        _reduceControls(e) {
          const t = {};
          return (
            Object.keys(e).forEach((n) => {
              t[n] = this._createControl(e[n]);
            }),
            t
          );
        }
        _createControl(e) {
          return e instanceof ny || e instanceof ry || e instanceof sy
            ? e
            : Array.isArray(e)
            ? this.control(
                e[0],
                e.length > 1 ? e[1] : null,
                e.length > 2 ? e[2] : null
              )
            : this.control(e);
        }
      }
      class my {
        static withConfig(e) {
          return {
            ngModule: my,
            providers: [
              { provide: iy, useValue: e.warnOnDeprecatedNgFormSelector },
            ],
          };
        }
      }
      class yy {
        static withConfig(e) {
          return {
            ngModule: yy,
            providers: [
              { provide: ay, useValue: e.warnOnNgModelWithFormControl },
            ],
          };
        }
      }
      class _y {}
      let vy = (() => {
        class e {
          constructor(e) {
            (this.http = e),
              (this.stuff = [
                {
                  _id: "324sdfmoih3",
                  title: "Mon objet",
                  description: "A propos de mon objet",
                  imageUrl:
                    "https://c.pxhere.com/photos/30/d6/photographer_camera_lens_slr_photography_hands-1079029.jpg!d",
                  price: 4900,
                  userId: "will",
                },
                {
                  _id: "324sdfmoih4",
                  title: "Un autre objet",
                  description: "A propos de mon autre objet",
                  imageUrl:
                    "https://www.publicdomainpictures.net/pictures/10000/velka/1536-1249273362hbHb.jpg",
                  price: 2600,
                  userId: "will",
                },
              ]),
              (this.stuff$ = new T());
          }
          getStuff() {
            this.http.get("http://localhost:8080/api/stuff").subscribe(
              (e) => {
                e && ((this.stuff = e), this.emitStuff());
              },
              (e) => {
                console.log(e);
              }
            );
          }
          emitStuff() {
            this.stuff$.next(this.stuff);
          }
          getThingById(e) {
            return new Promise((t, n) => {
              this.http.get("http://localhost:8080/api/stuff/" + e).subscribe(
                (e) => {
                  t(e);
                },
                (e) => {
                  n(e);
                }
              );
            });
          }
          createNewThing(e) {
            return new Promise((t, n) => {
              this.http.post("http://localhost:8080/api/stuff", e).subscribe(
                (e) => {
                  t(e);
                },
                (e) => {
                  n(e);
                }
              );
            });
          }
          createNewThingWithFile(e, t) {
            return new Promise((n, r) => {
              const s = new FormData();
              s.append("thing", JSON.stringify(e)),
                s.append("image", t, e.title),
                this.http.post("http://localhost:8080/api/stuff", s).subscribe(
                  (e) => {
                    n(e);
                  },
                  (e) => {
                    r(e);
                  }
                );
            });
          }
          modifyThing(e, t) {
            return new Promise((n, r) => {
              this.http
                .put("http://localhost:8080/api/stuff/" + e, t)
                .subscribe(
                  (e) => {
                    n(e);
                  },
                  (e) => {
                    r(e);
                  }
                );
            });
          }
          modifyThingWithFile(e, t, n) {
            return new Promise((r, s) => {
              let i;
              "string" == typeof n
                ? ((t.imageUrl = n), (i = t))
                : ((i = new FormData()),
                  i.append("thing", JSON.stringify(t)),
                  i.append("image", n, t.title)),
                this.http
                  .put("http://localhost:8080/api/stuff/" + e, i)
                  .subscribe(
                    (e) => {
                      r(e);
                    },
                    (e) => {
                      s(e);
                    }
                  );
            });
          }
          deleteThing(e) {
            return new Promise((t, n) => {
              this.http
                .delete("http://localhost:8080/api/stuff/" + e)
                .subscribe(
                  (e) => {
                    t(e);
                  },
                  (e) => {
                    n(e);
                  }
                );
            });
          }
        }
        return (
          (e.ngInjectableDef = le({
            factory: function () {
              return new e(xe(np));
            },
            token: e,
            providedIn: "root",
          })),
          e
        );
      })();
      class by {
        constructor(e, t, n, r, s) {
          (this.state = e),
            (this.formBuilder = t),
            (this.stuffService = n),
            (this.router = r),
            (this.auth = s),
            (this.loading = !1);
        }
        ngOnInit() {
          this.state.mode$.next("form"),
            (this.thingForm = this.formBuilder.group({
              title: [null, Rm.required],
              description: [null, Rm.required],
              price: [0, Rm.required],
              imageUrl: [null, Rm.required],
            })),
            (this.partSub = this.state.part$.subscribe((e) => {
              this.part = e;
            })),
            (this.userId =
              this.part >= 3 ? this.auth.userId : "userID40282382");
        }
        onSubmit() {
          this.loading = !0;
          const e = new _y();
          (e.title = this.thingForm.get("title").value),
            (e.description = this.thingForm.get("description").value),
            (e.price = 100 * this.thingForm.get("price").value),
            (e.imageUrl = this.thingForm.get("imageUrl").value),
            (e._id = new Date().getTime().toString()),
            (e.userId = this.userId),
            this.stuffService
              .createNewThing(e)
              .then(() => {
                switch (
                  (this.thingForm.reset(), (this.loading = !1), this.part)
                ) {
                  case 1:
                  case 2:
                    this.router.navigate(["/part-one/all-stuff"]);
                    break;
                  case 3:
                    this.router.navigate(["/part-three/all-stuff"]);
                    break;
                  case 4:
                    this.router.navigate(["/part-four/all-stuff"]);
                }
              })
              .catch((e) => {
                (this.loading = !1), (this.errorMessage = e.message);
              });
        }
        ngOnDestroy() {
          this.partSub.unsubscribe();
        }
      }
      var wy = Fn({ encapsulation: 0, styles: [[""]], data: {} });
      function Cy(e) {
        return qi(
          0,
          [
            (e()(),
            Ai(
              0,
              0,
              null,
              null,
              1,
              "mat-spinner",
              [
                ["class", "mat-spinner mat-progress-spinner"],
                ["mode", "indeterminate"],
                ["role", "progressbar"],
              ],
              [
                [2, "_mat-animation-noopable", null],
                [4, "width", "px"],
                [4, "height", "px"],
              ],
              null,
              null,
              _m,
              gm
            )),
            Wr(
              1,
              114688,
              null,
              0,
              Wp,
              [Wt, Fp, [2, Ul], [2, pm], zp],
              null,
              null
            ),
          ],
          function (e, t) {
            e(t, 1, 0);
          },
          function (e, t) {
            e(
              t,
              0,
              0,
              Dr(t, 1)._noopAnimations,
              Dr(t, 1).diameter,
              Dr(t, 1).diameter
            );
          }
        );
      }
      function Sy(e) {
        return qi(
          0,
          [
            (e()(),
            Ai(
              0,
              0,
              null,
              null,
              1,
              "p",
              [["class", "alert-danger"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), Hi(1, null, ["", ""])),
          ],
          null,
          function (e, t) {
            e(t, 1, 0, t.component.errorMessage);
          }
        );
      }
      function Ey(e) {
        return qi(
          0,
          [
            (e()(),
            Ai(
              0,
              0,
              null,
              null,
              46,
              "div",
              [["class", "col-sm-6 offset-sm-3 mt-2"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Ai(
              1,
              0,
              null,
              null,
              45,
              "form",
              [["novalidate", ""]],
              [
                [2, "ng-untouched", null],
                [2, "ng-touched", null],
                [2, "ng-pristine", null],
                [2, "ng-dirty", null],
                [2, "ng-valid", null],
                [2, "ng-invalid", null],
                [2, "ng-pending", null],
              ],
              [
                [null, "submit"],
                [null, "reset"],
              ],
              function (e, t, n) {
                var r = !0;
                return (
                  "submit" === t && (r = !1 !== Dr(e, 3).onSubmit(n) && r),
                  "reset" === t && (r = !1 !== Dr(e, 3).onReset() && r),
                  r
                );
              },
              null,
              null
            )),
            Wr(2, 16384, null, 0, ly, [], null, null),
            Wr(
              3,
              540672,
              null,
              0,
              uy,
              [
                [8, null],
                [8, null],
              ],
              { form: [0, "form"] },
              null
            ),
            Kr(2048, null, Em, null, [uy]),
            Wr(5, 16384, null, 0, Im, [[4, Em]], null, null),
            (e()(),
            Ai(
              6,
              0,
              null,
              null,
              8,
              "div",
              [["class", "form-group"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Ai(
              7,
              0,
              null,
              null,
              1,
              "label",
              [["for", "title"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), Hi(-1, null, ["Titre"])),
            (e()(),
            Ai(
              9,
              0,
              null,
              null,
              5,
              "input",
              [
                ["class", "form-control"],
                ["formControlName", "title"],
                ["id", "title"],
                ["placeholder", "Que vendez-vous ?"],
                ["type", "text"],
              ],
              [
                [2, "ng-untouched", null],
                [2, "ng-touched", null],
                [2, "ng-pristine", null],
                [2, "ng-dirty", null],
                [2, "ng-valid", null],
                [2, "ng-invalid", null],
                [2, "ng-pending", null],
              ],
              [
                [null, "input"],
                [null, "blur"],
                [null, "compositionstart"],
                [null, "compositionend"],
              ],
              function (e, t, n) {
                var r = !0;
                return (
                  "input" === t &&
                    (r = !1 !== Dr(e, 10)._handleInput(n.target.value) && r),
                  "blur" === t && (r = !1 !== Dr(e, 10).onTouched() && r),
                  "compositionstart" === t &&
                    (r = !1 !== Dr(e, 10)._compositionStart() && r),
                  "compositionend" === t &&
                    (r = !1 !== Dr(e, 10)._compositionEnd(n.target.value) && r),
                  r
                );
              },
              null,
              null
            )),
            Wr(10, 16384, null, 0, Cm, [Xt, Wt, [2, wm]], null, null),
            Kr(
              1024,
              null,
              bm,
              function (e) {
                return [e];
              },
              [Cm]
            ),
            Wr(
              12,
              671744,
              null,
              0,
              py,
              [
                [3, Em],
                [8, null],
                [8, null],
                [6, bm],
                [2, ay],
              ],
              { name: [0, "name"] },
              null
            ),
            Kr(2048, null, xm, null, [py]),
            Wr(14, 16384, null, 0, Am, [[4, xm]], null, null),
            (e()(),
            Ai(
              15,
              0,
              null,
              null,
              9,
              "div",
              [["class", "form-group"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Ai(
              16,
              0,
              null,
              null,
              1,
              "label",
              [["for", "price"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), Hi(-1, null, ["Prix (en \u20ac)"])),
            (e()(),
            Ai(
              18,
              0,
              null,
              null,
              6,
              "input",
              [
                ["class", "form-control"],
                ["formControlName", "price"],
                ["id", "price"],
                ["min", "0"],
                ["type", "number"],
              ],
              [
                [2, "ng-untouched", null],
                [2, "ng-touched", null],
                [2, "ng-pristine", null],
                [2, "ng-dirty", null],
                [2, "ng-valid", null],
                [2, "ng-invalid", null],
                [2, "ng-pending", null],
              ],
              [
                [null, "input"],
                [null, "blur"],
                [null, "compositionstart"],
                [null, "compositionend"],
                [null, "change"],
              ],
              function (e, t, n) {
                var r = !0;
                return (
                  "input" === t &&
                    (r = !1 !== Dr(e, 19)._handleInput(n.target.value) && r),
                  "blur" === t && (r = !1 !== Dr(e, 19).onTouched() && r),
                  "compositionstart" === t &&
                    (r = !1 !== Dr(e, 19)._compositionStart() && r),
                  "compositionend" === t &&
                    (r = !1 !== Dr(e, 19)._compositionEnd(n.target.value) && r),
                  "change" === t &&
                    (r = !1 !== Dr(e, 20).onChange(n.target.value) && r),
                  "input" === t &&
                    (r = !1 !== Dr(e, 20).onChange(n.target.value) && r),
                  "blur" === t && (r = !1 !== Dr(e, 20).onTouched() && r),
                  r
                );
              },
              null,
              null
            )),
            Wr(19, 16384, null, 0, Cm, [Xt, Wt, [2, wm]], null, null),
            Wr(20, 16384, null, 0, Lm, [Xt, Wt], null, null),
            Kr(
              1024,
              null,
              bm,
              function (e, t) {
                return [e, t];
              },
              [Cm, Lm]
            ),
            Wr(
              22,
              671744,
              null,
              0,
              py,
              [
                [3, Em],
                [8, null],
                [8, null],
                [6, bm],
                [2, ay],
              ],
              { name: [0, "name"] },
              null
            ),
            Kr(2048, null, xm, null, [py]),
            Wr(24, 16384, null, 0, Am, [[4, xm]], null, null),
            (e()(),
            Ai(
              25,
              0,
              null,
              null,
              8,
              "div",
              [["class", "form-group"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Ai(
              26,
              0,
              null,
              null,
              1,
              "label",
              [["for", "description"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), Hi(-1, null, ["Description"])),
            (e()(),
            Ai(
              28,
              0,
              null,
              null,
              5,
              "textarea",
              [
                ["class", "form-control"],
                ["cols", "30"],
                ["formControlName", "description"],
                ["id", "description"],
                ["name", "description"],
                [
                  "placeholder",
                  "D\xe9crivez votre objet (type, qualit\xe9, etc.)",
                ],
                ["rows", "7"],
              ],
              [
                [2, "ng-untouched", null],
                [2, "ng-touched", null],
                [2, "ng-pristine", null],
                [2, "ng-dirty", null],
                [2, "ng-valid", null],
                [2, "ng-invalid", null],
                [2, "ng-pending", null],
              ],
              [
                [null, "input"],
                [null, "blur"],
                [null, "compositionstart"],
                [null, "compositionend"],
              ],
              function (e, t, n) {
                var r = !0;
                return (
                  "input" === t &&
                    (r = !1 !== Dr(e, 29)._handleInput(n.target.value) && r),
                  "blur" === t && (r = !1 !== Dr(e, 29).onTouched() && r),
                  "compositionstart" === t &&
                    (r = !1 !== Dr(e, 29)._compositionStart() && r),
                  "compositionend" === t &&
                    (r = !1 !== Dr(e, 29)._compositionEnd(n.target.value) && r),
                  r
                );
              },
              null,
              null
            )),
            Wr(29, 16384, null, 0, Cm, [Xt, Wt, [2, wm]], null, null),
            Kr(
              1024,
              null,
              bm,
              function (e) {
                return [e];
              },
              [Cm]
            ),
            Wr(
              31,
              671744,
              null,
              0,
              py,
              [
                [3, Em],
                [8, null],
                [8, null],
                [6, bm],
                [2, ay],
              ],
              { name: [0, "name"] },
              null
            ),
            Kr(2048, null, xm, null, [py]),
            Wr(33, 16384, null, 0, Am, [[4, xm]], null, null),
            (e()(),
            Ai(
              34,
              0,
              null,
              null,
              8,
              "div",
              [["class", "form-group"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Ai(
              35,
              0,
              null,
              null,
              1,
              "label",
              [["for", "imageUrl"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), Hi(-1, null, ["URL de l'image"])),
            (e()(),
            Ai(
              37,
              0,
              null,
              null,
              5,
              "input",
              [
                ["class", "form-control"],
                ["formControlName", "imageUrl"],
                ["id", "imageUrl"],
                ["placeholder", "http://..."],
                ["type", "text"],
              ],
              [
                [2, "ng-untouched", null],
                [2, "ng-touched", null],
                [2, "ng-pristine", null],
                [2, "ng-dirty", null],
                [2, "ng-valid", null],
                [2, "ng-invalid", null],
                [2, "ng-pending", null],
              ],
              [
                [null, "input"],
                [null, "blur"],
                [null, "compositionstart"],
                [null, "compositionend"],
              ],
              function (e, t, n) {
                var r = !0;
                return (
                  "input" === t &&
                    (r = !1 !== Dr(e, 38)._handleInput(n.target.value) && r),
                  "blur" === t && (r = !1 !== Dr(e, 38).onTouched() && r),
                  "compositionstart" === t &&
                    (r = !1 !== Dr(e, 38)._compositionStart() && r),
                  "compositionend" === t &&
                    (r = !1 !== Dr(e, 38)._compositionEnd(n.target.value) && r),
                  r
                );
              },
              null,
              null
            )),
            Wr(38, 16384, null, 0, Cm, [Xt, Wt, [2, wm]], null, null),
            Kr(
              1024,
              null,
              bm,
              function (e) {
                return [e];
              },
              [Cm]
            ),
            Wr(
              40,
              671744,
              null,
              0,
              py,
              [
                [3, Em],
                [8, null],
                [8, null],
                [6, bm],
                [2, ay],
              ],
              { name: [0, "name"] },
              null
            ),
            Kr(2048, null, xm, null, [py]),
            Wr(42, 16384, null, 0, Am, [[4, xm]], null, null),
            (e()(),
            Ai(
              43,
              0,
              null,
              null,
              1,
              "button",
              [["class", "btn btn-primary"]],
              [[8, "disabled", 0]],
              [[null, "click"]],
              function (e, t, n) {
                var r = !0;
                return (
                  "click" === t && (r = !1 !== e.component.onSubmit() && r), r
                );
              },
              null,
              null
            )),
            (e()(), Hi(-1, null, ["Valider"])),
            (e()(), ki(16777216, null, null, 1, null, Sy)),
            Wr(46, 16384, null, 0, kl, [vn, yn], { ngIf: [0, "ngIf"] }, null),
          ],
          function (e, t) {
            var n = t.component;
            e(t, 3, 0, n.thingForm),
              e(t, 12, 0, "title"),
              e(t, 22, 0, "price"),
              e(t, 31, 0, "description"),
              e(t, 40, 0, "imageUrl"),
              e(t, 46, 0, n.errorMessage);
          },
          function (e, t) {
            var n = t.component;
            e(
              t,
              1,
              0,
              Dr(t, 5).ngClassUntouched,
              Dr(t, 5).ngClassTouched,
              Dr(t, 5).ngClassPristine,
              Dr(t, 5).ngClassDirty,
              Dr(t, 5).ngClassValid,
              Dr(t, 5).ngClassInvalid,
              Dr(t, 5).ngClassPending
            ),
              e(
                t,
                9,
                0,
                Dr(t, 14).ngClassUntouched,
                Dr(t, 14).ngClassTouched,
                Dr(t, 14).ngClassPristine,
                Dr(t, 14).ngClassDirty,
                Dr(t, 14).ngClassValid,
                Dr(t, 14).ngClassInvalid,
                Dr(t, 14).ngClassPending
              ),
              e(
                t,
                18,
                0,
                Dr(t, 24).ngClassUntouched,
                Dr(t, 24).ngClassTouched,
                Dr(t, 24).ngClassPristine,
                Dr(t, 24).ngClassDirty,
                Dr(t, 24).ngClassValid,
                Dr(t, 24).ngClassInvalid,
                Dr(t, 24).ngClassPending
              ),
              e(
                t,
                28,
                0,
                Dr(t, 33).ngClassUntouched,
                Dr(t, 33).ngClassTouched,
                Dr(t, 33).ngClassPristine,
                Dr(t, 33).ngClassDirty,
                Dr(t, 33).ngClassValid,
                Dr(t, 33).ngClassInvalid,
                Dr(t, 33).ngClassPending
              ),
              e(
                t,
                37,
                0,
                Dr(t, 42).ngClassUntouched,
                Dr(t, 42).ngClassTouched,
                Dr(t, 42).ngClassPristine,
                Dr(t, 42).ngClassDirty,
                Dr(t, 42).ngClassValid,
                Dr(t, 42).ngClassInvalid,
                Dr(t, 42).ngClassPending
              ),
              e(t, 43, 0, n.thingForm.invalid);
          }
        );
      }
      function Ty(e) {
        return qi(
          0,
          [
            (e()(), ki(16777216, null, null, 1, null, Cy)),
            Wr(1, 16384, null, 0, kl, [vn, yn], { ngIf: [0, "ngIf"] }, null),
            (e()(), ki(16777216, null, null, 1, null, Ey)),
            Wr(3, 16384, null, 0, kl, [vn, yn], { ngIf: [0, "ngIf"] }, null),
          ],
          function (e, t) {
            var n = t.component;
            e(t, 1, 0, n.loading), e(t, 3, 0, !n.loading);
          },
          null
        );
      }
      function xy(e) {
        return qi(
          0,
          [
            (e()(),
            Ai(
              0,
              0,
              null,
              null,
              1,
              "app-new-thing",
              [],
              null,
              null,
              null,
              Ty,
              wy
            )),
            Wr(1, 245760, null, 0, by, [Ud, gy, vy, od, _p], null, null),
          ],
          function (e, t) {
            e(t, 1, 0);
          },
          null
        );
      }
      var ky = Cr("app-new-thing", by, xy, {}, {}, []);
      class Ay {
        constructor(e, t, n) {
          (this.state = e),
            (this.stuffService = t),
            (this.router = n),
            (this.stuff = []);
        }
        ngOnInit() {
          (this.loading = !0),
            this.state.mode$.next("list"),
            (this.stuffSub = this.stuffService.stuff$.subscribe((e) => {
              (this.stuff = e), (this.loading = !1);
            })),
            (this.partSub = this.state.part$.subscribe((e) => {
              this.part = e;
            })),
            this.stuffService.getStuff();
        }
        onProductClicked(e) {
          1 === this.part
            ? this.router.navigate(["/part-one/thing/" + e])
            : 3 === this.part
            ? this.router.navigate(["/part-three/thing/" + e])
            : 4 === this.part &&
              this.router.navigate(["/part-four/thing/" + e]);
        }
        ngOnDestroy() {
          this.stuffSub.unsubscribe(), this.partSub.unsubscribe();
        }
      }
      var Iy = Fn({
        encapsulation: 0,
        styles: [
          [
            ".stuff-grid[_ngcontent-%COMP%]{width:80%;margin:auto;display:flex;flex-wrap:wrap;justify-content:center}.thing-pane[_ngcontent-%COMP%]{transition:transform .3s ease-in-out;position:relative;width:270px;height:270px;margin:5px;background-size:cover;background-position:center;box-shadow:1px 1px 3px #333;cursor:pointer}.thing-pane[_ngcontent-%COMP%]:hover{transform:scale(1.03)}.thing-info[_ngcontent-%COMP%]{width:100%;position:absolute;bottom:0;height:50%;background-color:rgba(0,0,0,.8);color:#fff;padding:10px}.thing-info[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-weight:800}.thing-info[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]{color:#6eb5ff}",
          ],
        ],
        data: {},
      });
      function Py(e) {
        return qi(
          0,
          [
            (e()(),
            Ai(
              0,
              0,
              null,
              null,
              1,
              "mat-spinner",
              [
                ["class", "mat-spinner mat-progress-spinner"],
                ["mode", "indeterminate"],
                ["role", "progressbar"],
              ],
              [
                [2, "_mat-animation-noopable", null],
                [4, "width", "px"],
                [4, "height", "px"],
              ],
              null,
              null,
              _m,
              gm
            )),
            Wr(
              1,
              114688,
              null,
              0,
              Wp,
              [Wt, Fp, [2, Ul], [2, pm], zp],
              null,
              null
            ),
          ],
          function (e, t) {
            e(t, 1, 0);
          },
          function (e, t) {
            e(
              t,
              0,
              0,
              Dr(t, 1)._noopAnimations,
              Dr(t, 1).diameter,
              Dr(t, 1).diameter
            );
          }
        );
      }
      function Ny(e) {
        return qi(
          0,
          [
            (e()(),
            Ai(
              0,
              0,
              null,
              null,
              1,
              "p",
              [["class", "text-center"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), Hi(-1, null, ["Rien \xe0 vendre !"])),
          ],
          null,
          null
        );
      }
      function Ry(e) {
        return qi(
          0,
          [
            (e()(),
            Ai(
              0,
              0,
              null,
              null,
              12,
              "div",
              [["class", "thing-pane"]],
              null,
              [[null, "click"]],
              function (e, t, n) {
                var r = !0;
                return (
                  "click" === t &&
                    (r =
                      !1 !==
                        e.component.onProductClicked(e.context.$implicit._id) &&
                      r),
                  r
                );
              },
              null,
              null
            )),
            Kr(512, null, bl, wl, [dn, pn, Wt, Xt]),
            Wr(
              2,
              278528,
              null,
              0,
              Sl,
              [bl],
              { klass: [0, "klass"], ngClass: [1, "ngClass"] },
              null
            ),
            ji(3, { open: 0 }),
            Kr(512, null, Dl, Ol, [Wt, pn, Xt]),
            Wr(5, 278528, null, 0, Fl, [Dl], { ngStyle: [0, "ngStyle"] }, null),
            ji(6, { "background-image": 0 }),
            (e()(),
            Ai(
              7,
              0,
              null,
              null,
              5,
              "div",
              [["class", "thing-info"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Ai(8, 0, null, null, 1, "h3", [], null, null, null, null, null)),
            (e()(), Hi(9, null, [" ", " "])),
            (e()(),
            Ai(10, 0, null, null, 2, "h5", [], null, null, null, null, null)),
            (e()(), Hi(11, null, ["", ""])),
            Ui(12, 2),
          ],
          function (e, t) {
            var n = e(
              t,
              3,
              0,
              t.context.$implicit._id === t.component.chosenId
            );
            e(t, 2, 0, "thing-pane", n);
            var r = e(t, 6, 0, "url(" + t.context.$implicit.imageUrl + ")");
            e(t, 5, 0, r);
          },
          function (e, t) {
            e(t, 9, 0, t.context.$implicit.title);
            var n = Mn(
              t,
              11,
              0,
              e(
                t,
                12,
                0,
                Dr(t.parent.parent, 0),
                t.context.$implicit.price / 100,
                "EUR"
              )
            );
            e(t, 11, 0, n);
          }
        );
      }
      function Dy(e) {
        return qi(
          0,
          [
            (e()(),
            Ai(
              0,
              0,
              null,
              null,
              2,
              "div",
              [["class", "stuff-grid"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), ki(16777216, null, null, 1, null, Ry)),
            Wr(
              2,
              278528,
              null,
              0,
              Tl,
              [vn, yn, dn],
              { ngForOf: [0, "ngForOf"] },
              null
            ),
          ],
          function (e, t) {
            e(t, 2, 0, t.component.stuff);
          },
          null
        );
      }
      function Oy(e) {
        return qi(
          0,
          [
            Gr(0, Vl, [ks]),
            (e()(), ki(16777216, null, null, 1, null, Py)),
            Wr(2, 16384, null, 0, kl, [vn, yn], { ngIf: [0, "ngIf"] }, null),
            (e()(), ki(16777216, null, null, 1, null, Ny)),
            Wr(4, 16384, null, 0, kl, [vn, yn], { ngIf: [0, "ngIf"] }, null),
            (e()(), ki(16777216, null, null, 1, null, Dy)),
            Wr(6, 16384, null, 0, kl, [vn, yn], { ngIf: [0, "ngIf"] }, null),
          ],
          function (e, t) {
            var n = t.component;
            e(t, 2, 0, n.loading),
              e(t, 4, 0, n.stuff.length <= 0 && !n.loading),
              e(t, 6, 0, n.stuff.length >= 0);
          },
          null
        );
      }
      function My(e) {
        return qi(
          0,
          [
            (e()(),
            Ai(
              0,
              0,
              null,
              null,
              1,
              "app-stuff-list",
              [],
              null,
              null,
              null,
              Oy,
              Iy
            )),
            Wr(1, 245760, null, 0, Ay, [Ud, vy, od], null, null),
          ],
          function (e, t) {
            e(t, 1, 0);
          },
          null
        );
      }
      var Fy = Cr("app-stuff-list", Ay, My, {}, {}, []);
      class Vy {
        constructor(e, t, n, r, s) {
          (this.state = e),
            (this.router = t),
            (this.route = n),
            (this.stuffService = r),
            (this.auth = s);
        }
        ngOnInit() {
          (this.loading = !0),
            this.state.mode$.next("single-thing"),
            (this.userId = this.auth.userId
              ? this.auth.userId
              : "userID40282382"),
            this.route.params.subscribe((e) => {
              this.stuffService.getThingById(e.id).then((e) => {
                (this.loading = !1), (this.thing = e);
              });
            }),
            (this.partSub = this.state.part$.subscribe((e) => {
              (this.part = e), e >= 3 && (this.userId = this.auth.userId);
            }));
        }
        onGoBack() {
          1 === this.part
            ? this.router.navigate(["/part-one/all-stuff"])
            : 3 === this.part
            ? this.router.navigate(["/part-three/all-stuff"])
            : 4 === this.part && this.router.navigate(["/part-four/all-stuff"]);
        }
        onModify() {
          switch (this.part) {
            case 1:
            case 2:
              this.router.navigate([
                "/part-one/modify-thing/" + this.thing._id,
              ]);
              break;
            case 3:
              this.router.navigate([
                "/part-three/modify-thing/" + this.thing._id,
              ]);
              break;
            case 4:
              this.router.navigate([
                "/part-four/modify-thing/" + this.thing._id,
              ]);
          }
        }
        onDelete() {
          (this.loading = !0),
            this.stuffService.deleteThing(this.thing._id).then(() => {
              switch (((this.loading = !1), this.part)) {
                case 1:
                case 2:
                  this.router.navigate(["/part-one/all-stuff"]);
                  break;
                case 3:
                  this.router.navigate(["/part-three/all-stuff"]);
                  break;
                case 4:
                  this.router.navigate(["/part-four/all-stuff"]);
              }
            });
        }
        ngOnDestroy() {
          this.partSub.unsubscribe();
        }
      }
      var Ly = Fn({
        encapsulation: 0,
        styles: [
          [
            ".single-thing-pane[_ngcontent-%COMP%]{position:relative;width:60%;margin:auto}img[_ngcontent-%COMP%]{position:relative;width:100%}.single-thing-info[_ngcontent-%COMP%]{width:100%}.single-thing-price[_ngcontent-%COMP%]{color:#6eb5ff}",
          ],
        ],
        data: {},
      });
      function Uy(e) {
        return qi(
          0,
          [
            (e()(),
            Ai(
              0,
              0,
              null,
              null,
              1,
              "mat-spinner",
              [
                ["class", "mat-spinner mat-progress-spinner"],
                ["mode", "indeterminate"],
                ["role", "progressbar"],
              ],
              [
                [2, "_mat-animation-noopable", null],
                [4, "width", "px"],
                [4, "height", "px"],
              ],
              null,
              null,
              _m,
              gm
            )),
            Wr(
              1,
              114688,
              null,
              0,
              Wp,
              [Wt, Fp, [2, Ul], [2, pm], zp],
              null,
              null
            ),
          ],
          function (e, t) {
            e(t, 1, 0);
          },
          function (e, t) {
            e(
              t,
              0,
              0,
              Dr(t, 1)._noopAnimations,
              Dr(t, 1).diameter,
              Dr(t, 1).diameter
            );
          }
        );
      }
      function jy(e) {
        return qi(
          0,
          [
            (e()(),
            Ai(0, 0, null, null, 16, "div", [], null, null, null, null, null)),
            (e()(),
            Ai(
              1,
              0,
              null,
              null,
              1,
              "button",
              [["class", "btn btn-link"]],
              null,
              [[null, "click"]],
              function (e, t, n) {
                var r = !0;
                return (
                  "click" === t && (r = !1 !== e.component.onGoBack() && r), r
                );
              },
              null,
              null
            )),
            (e()(), Hi(-1, null, ["<< Retour"])),
            (e()(),
            Ai(
              3,
              0,
              null,
              null,
              13,
              "div",
              [["class", "single-thing-pane"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Ai(
              4,
              0,
              null,
              null,
              0,
              "img",
              [["alt", ""]],
              [[8, "src", 4]],
              null,
              null,
              null,
              null
            )),
            (e()(),
            Ai(
              5,
              0,
              null,
              null,
              11,
              "div",
              [["class", "single-thing-info"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Ai(6, 0, null, null, 1, "h1", [], null, null, null, null, null)),
            (e()(), Hi(7, null, ["", ""])),
            (e()(),
            Ai(
              8,
              0,
              null,
              null,
              2,
              "h2",
              [["class", "single-thing-price"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), Hi(9, null, ["", ""])),
            Ui(10, 2),
            (e()(),
            Ai(11, 0, null, null, 1, "p", [], null, null, null, null, null)),
            (e()(), Hi(12, null, ["", ""])),
            (e()(),
            Ai(
              13,
              0,
              null,
              null,
              1,
              "button",
              [["class", "btn btn-success m-1"]],
              [[8, "disabled", 0]],
              [[null, "click"]],
              function (e, t, n) {
                var r = !0;
                return (
                  "click" === t && (r = !1 !== e.component.onModify() && r), r
                );
              },
              null,
              null
            )),
            (e()(), Hi(-1, null, ["Modifier"])),
            (e()(),
            Ai(
              15,
              0,
              null,
              null,
              1,
              "button",
              [["class", "btn btn-danger m-1"]],
              [[8, "disabled", 0]],
              [[null, "click"]],
              function (e, t, n) {
                var r = !0;
                return (
                  "click" === t && (r = !1 !== e.component.onDelete() && r), r
                );
              },
              null,
              null
            )),
            (e()(), Hi(-1, null, ["Supprimer"])),
          ],
          null,
          function (e, t) {
            var n = t.component;
            e(t, 4, 0, null == n.thing ? null : n.thing.imageUrl),
              e(t, 7, 0, null == n.thing ? null : n.thing.title);
            var r = Mn(
              t,
              9,
              0,
              e(
                t,
                10,
                0,
                Dr(t.parent, 0),
                (null == n.thing ? null : n.thing.price) / 100,
                "EUR"
              )
            );
            e(t, 9, 0, r),
              e(t, 12, 0, null == n.thing ? null : n.thing.description),
              e(
                t,
                13,
                0,
                n.part >= 3 &&
                  n.userId !== (null == n.thing ? null : n.thing.userId)
              ),
              e(
                t,
                15,
                0,
                n.part >= 3 &&
                  n.userId !== (null == n.thing ? null : n.thing.userId)
              );
          }
        );
      }
      function $y(e) {
        return qi(
          0,
          [
            Gr(0, Vl, [ks]),
            (e()(), ki(16777216, null, null, 1, null, Uy)),
            Wr(2, 16384, null, 0, kl, [vn, yn], { ngIf: [0, "ngIf"] }, null),
            (e()(), ki(16777216, null, null, 1, null, jy)),
            Wr(4, 16384, null, 0, kl, [vn, yn], { ngIf: [0, "ngIf"] }, null),
          ],
          function (e, t) {
            var n = t.component;
            e(t, 2, 0, n.loading), e(t, 4, 0, !n.loading);
          },
          null
        );
      }
      function Hy(e) {
        return qi(
          0,
          [
            (e()(),
            Ai(
              0,
              0,
              null,
              null,
              1,
              "app-single-thing",
              [],
              null,
              null,
              null,
              $y,
              Ly
            )),
            Wr(1, 245760, null, 0, Vy, [Ud, od, Zc, vy, _p], null, null),
          ],
          function (e, t) {
            e(t, 1, 0);
          },
          null
        );
      }
      var By = Cr("app-single-thing", Vy, Hy, {}, {}, []);
      class zy {
        constructor(e, t, n, r, s) {
          (this.formBuilder = e),
            (this.route = t),
            (this.router = n),
            (this.state = r),
            (this.stuffService = s),
            (this.loading = !1);
        }
        ngOnInit() {
          (this.loading = !0),
            (this.thingForm = this.formBuilder.group({
              title: [null, Rm.required],
              description: [null, Rm.required],
              price: [0, Rm.required],
              imageUrl: [null, Rm.required],
            })),
            (this.partSub = this.state.part$.subscribe((e) => {
              this.part = e;
            })),
            this.state.mode$.next("form"),
            this.route.params.subscribe((e) => {
              this.stuffService.getThingById(e.id).then((e) => {
                (this.thing = e),
                  this.thingForm.get("title").setValue(this.thing.title),
                  this.thingForm
                    .get("description")
                    .setValue(this.thing.description),
                  this.thingForm.get("price").setValue(this.thing.price / 100),
                  this.thingForm.get("imageUrl").setValue(this.thing.imageUrl),
                  (this.loading = !1);
              });
            });
        }
        onSubmit() {
          this.loading = !0;
          const e = new _y();
          (e.title = this.thingForm.get("title").value),
            (e.description = this.thingForm.get("description").value),
            (e.price = 100 * this.thingForm.get("price").value),
            (e.imageUrl = this.thingForm.get("imageUrl").value),
            (e._id = new Date().getTime().toString()),
            (e.userId = this.thing.userId),
            this.stuffService.modifyThing(this.thing._id, e).then(
              () => {
                switch (
                  (this.thingForm.reset(), (this.loading = !1), this.part)
                ) {
                  case 1:
                  case 2:
                    this.router.navigate(["/part-one/all-stuff"]);
                    break;
                  case 3:
                    this.router.navigate(["/part-three/all-stuff"]);
                    break;
                  case 4:
                    this.router.navigate(["/part-four/all-stuff"]);
                }
              },
              (e) => {
                (this.loading = !1), (this.errorMessage = e.message);
              }
            );
        }
      }
      var qy = Fn({ encapsulation: 0, styles: [[""]], data: {} });
      function Wy(e) {
        return qi(
          0,
          [
            (e()(),
            Ai(
              0,
              0,
              null,
              null,
              1,
              "mat-spinner",
              [
                ["class", "mat-spinner mat-progress-spinner"],
                ["mode", "indeterminate"],
                ["role", "progressbar"],
              ],
              [
                [2, "_mat-animation-noopable", null],
                [4, "width", "px"],
                [4, "height", "px"],
              ],
              null,
              null,
              _m,
              gm
            )),
            Wr(
              1,
              114688,
              null,
              0,
              Wp,
              [Wt, Fp, [2, Ul], [2, pm], zp],
              null,
              null
            ),
          ],
          function (e, t) {
            e(t, 1, 0);
          },
          function (e, t) {
            e(
              t,
              0,
              0,
              Dr(t, 1)._noopAnimations,
              Dr(t, 1).diameter,
              Dr(t, 1).diameter
            );
          }
        );
      }
      function Gy(e) {
        return qi(
          0,
          [
            (e()(),
            Ai(
              0,
              0,
              null,
              null,
              1,
              "p",
              [["class", "alert-danger"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), Hi(1, null, ["", ""])),
          ],
          null,
          function (e, t) {
            e(t, 1, 0, t.component.errorMessage);
          }
        );
      }
      function Ky(e) {
        return qi(
          0,
          [
            (e()(),
            Ai(
              0,
              0,
              null,
              null,
              46,
              "div",
              [["class", "col-sm-6 offset-sm-3 mt-2"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Ai(
              1,
              0,
              null,
              null,
              45,
              "form",
              [["novalidate", ""]],
              [
                [2, "ng-untouched", null],
                [2, "ng-touched", null],
                [2, "ng-pristine", null],
                [2, "ng-dirty", null],
                [2, "ng-valid", null],
                [2, "ng-invalid", null],
                [2, "ng-pending", null],
              ],
              [
                [null, "submit"],
                [null, "reset"],
              ],
              function (e, t, n) {
                var r = !0;
                return (
                  "submit" === t && (r = !1 !== Dr(e, 3).onSubmit(n) && r),
                  "reset" === t && (r = !1 !== Dr(e, 3).onReset() && r),
                  r
                );
              },
              null,
              null
            )),
            Wr(2, 16384, null, 0, ly, [], null, null),
            Wr(
              3,
              540672,
              null,
              0,
              uy,
              [
                [8, null],
                [8, null],
              ],
              { form: [0, "form"] },
              null
            ),
            Kr(2048, null, Em, null, [uy]),
            Wr(5, 16384, null, 0, Im, [[4, Em]], null, null),
            (e()(),
            Ai(
              6,
              0,
              null,
              null,
              8,
              "div",
              [["class", "form-group"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Ai(
              7,
              0,
              null,
              null,
              1,
              "label",
              [["for", "title"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), Hi(-1, null, ["Titre"])),
            (e()(),
            Ai(
              9,
              0,
              null,
              null,
              5,
              "input",
              [
                ["class", "form-control"],
                ["formControlName", "title"],
                ["id", "title"],
                ["placeholder", "Que vendez-vous ?"],
                ["type", "text"],
              ],
              [
                [2, "ng-untouched", null],
                [2, "ng-touched", null],
                [2, "ng-pristine", null],
                [2, "ng-dirty", null],
                [2, "ng-valid", null],
                [2, "ng-invalid", null],
                [2, "ng-pending", null],
              ],
              [
                [null, "input"],
                [null, "blur"],
                [null, "compositionstart"],
                [null, "compositionend"],
              ],
              function (e, t, n) {
                var r = !0;
                return (
                  "input" === t &&
                    (r = !1 !== Dr(e, 10)._handleInput(n.target.value) && r),
                  "blur" === t && (r = !1 !== Dr(e, 10).onTouched() && r),
                  "compositionstart" === t &&
                    (r = !1 !== Dr(e, 10)._compositionStart() && r),
                  "compositionend" === t &&
                    (r = !1 !== Dr(e, 10)._compositionEnd(n.target.value) && r),
                  r
                );
              },
              null,
              null
            )),
            Wr(10, 16384, null, 0, Cm, [Xt, Wt, [2, wm]], null, null),
            Kr(
              1024,
              null,
              bm,
              function (e) {
                return [e];
              },
              [Cm]
            ),
            Wr(
              12,
              671744,
              null,
              0,
              py,
              [
                [3, Em],
                [8, null],
                [8, null],
                [6, bm],
                [2, ay],
              ],
              { name: [0, "name"] },
              null
            ),
            Kr(2048, null, xm, null, [py]),
            Wr(14, 16384, null, 0, Am, [[4, xm]], null, null),
            (e()(),
            Ai(
              15,
              0,
              null,
              null,
              9,
              "div",
              [["class", "form-group"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Ai(
              16,
              0,
              null,
              null,
              1,
              "label",
              [["for", "price"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), Hi(-1, null, ["Prix (en \u20ac)"])),
            (e()(),
            Ai(
              18,
              0,
              null,
              null,
              6,
              "input",
              [
                ["class", "form-control"],
                ["formControlName", "price"],
                ["id", "price"],
                ["min", "0"],
                ["type", "number"],
              ],
              [
                [2, "ng-untouched", null],
                [2, "ng-touched", null],
                [2, "ng-pristine", null],
                [2, "ng-dirty", null],
                [2, "ng-valid", null],
                [2, "ng-invalid", null],
                [2, "ng-pending", null],
              ],
              [
                [null, "input"],
                [null, "blur"],
                [null, "compositionstart"],
                [null, "compositionend"],
                [null, "change"],
              ],
              function (e, t, n) {
                var r = !0;
                return (
                  "input" === t &&
                    (r = !1 !== Dr(e, 19)._handleInput(n.target.value) && r),
                  "blur" === t && (r = !1 !== Dr(e, 19).onTouched() && r),
                  "compositionstart" === t &&
                    (r = !1 !== Dr(e, 19)._compositionStart() && r),
                  "compositionend" === t &&
                    (r = !1 !== Dr(e, 19)._compositionEnd(n.target.value) && r),
                  "change" === t &&
                    (r = !1 !== Dr(e, 20).onChange(n.target.value) && r),
                  "input" === t &&
                    (r = !1 !== Dr(e, 20).onChange(n.target.value) && r),
                  "blur" === t && (r = !1 !== Dr(e, 20).onTouched() && r),
                  r
                );
              },
              null,
              null
            )),
            Wr(19, 16384, null, 0, Cm, [Xt, Wt, [2, wm]], null, null),
            Wr(20, 16384, null, 0, Lm, [Xt, Wt], null, null),
            Kr(
              1024,
              null,
              bm,
              function (e, t) {
                return [e, t];
              },
              [Cm, Lm]
            ),
            Wr(
              22,
              671744,
              null,
              0,
              py,
              [
                [3, Em],
                [8, null],
                [8, null],
                [6, bm],
                [2, ay],
              ],
              { name: [0, "name"] },
              null
            ),
            Kr(2048, null, xm, null, [py]),
            Wr(24, 16384, null, 0, Am, [[4, xm]], null, null),
            (e()(),
            Ai(
              25,
              0,
              null,
              null,
              8,
              "div",
              [["class", "form-group"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Ai(
              26,
              0,
              null,
              null,
              1,
              "label",
              [["for", "description"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), Hi(-1, null, ["Description"])),
            (e()(),
            Ai(
              28,
              0,
              null,
              null,
              5,
              "textarea",
              [
                ["class", "form-control"],
                ["cols", "30"],
                ["formControlName", "description"],
                ["id", "description"],
                ["name", "description"],
                [
                  "placeholder",
                  "D\xe9crivez votre objet (type, qualit\xe9, etc.)",
                ],
                ["rows", "7"],
              ],
              [
                [2, "ng-untouched", null],
                [2, "ng-touched", null],
                [2, "ng-pristine", null],
                [2, "ng-dirty", null],
                [2, "ng-valid", null],
                [2, "ng-invalid", null],
                [2, "ng-pending", null],
              ],
              [
                [null, "input"],
                [null, "blur"],
                [null, "compositionstart"],
                [null, "compositionend"],
              ],
              function (e, t, n) {
                var r = !0;
                return (
                  "input" === t &&
                    (r = !1 !== Dr(e, 29)._handleInput(n.target.value) && r),
                  "blur" === t && (r = !1 !== Dr(e, 29).onTouched() && r),
                  "compositionstart" === t &&
                    (r = !1 !== Dr(e, 29)._compositionStart() && r),
                  "compositionend" === t &&
                    (r = !1 !== Dr(e, 29)._compositionEnd(n.target.value) && r),
                  r
                );
              },
              null,
              null
            )),
            Wr(29, 16384, null, 0, Cm, [Xt, Wt, [2, wm]], null, null),
            Kr(
              1024,
              null,
              bm,
              function (e) {
                return [e];
              },
              [Cm]
            ),
            Wr(
              31,
              671744,
              null,
              0,
              py,
              [
                [3, Em],
                [8, null],
                [8, null],
                [6, bm],
                [2, ay],
              ],
              { name: [0, "name"] },
              null
            ),
            Kr(2048, null, xm, null, [py]),
            Wr(33, 16384, null, 0, Am, [[4, xm]], null, null),
            (e()(),
            Ai(
              34,
              0,
              null,
              null,
              8,
              "div",
              [["class", "form-group"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Ai(
              35,
              0,
              null,
              null,
              1,
              "label",
              [["for", "imageUrl"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), Hi(-1, null, ["URL de l'image"])),
            (e()(),
            Ai(
              37,
              0,
              null,
              null,
              5,
              "input",
              [
                ["class", "form-control"],
                ["formControlName", "imageUrl"],
                ["id", "imageUrl"],
                ["placeholder", "http://..."],
                ["type", "text"],
              ],
              [
                [2, "ng-untouched", null],
                [2, "ng-touched", null],
                [2, "ng-pristine", null],
                [2, "ng-dirty", null],
                [2, "ng-valid", null],
                [2, "ng-invalid", null],
                [2, "ng-pending", null],
              ],
              [
                [null, "input"],
                [null, "blur"],
                [null, "compositionstart"],
                [null, "compositionend"],
              ],
              function (e, t, n) {
                var r = !0;
                return (
                  "input" === t &&
                    (r = !1 !== Dr(e, 38)._handleInput(n.target.value) && r),
                  "blur" === t && (r = !1 !== Dr(e, 38).onTouched() && r),
                  "compositionstart" === t &&
                    (r = !1 !== Dr(e, 38)._compositionStart() && r),
                  "compositionend" === t &&
                    (r = !1 !== Dr(e, 38)._compositionEnd(n.target.value) && r),
                  r
                );
              },
              null,
              null
            )),
            Wr(38, 16384, null, 0, Cm, [Xt, Wt, [2, wm]], null, null),
            Kr(
              1024,
              null,
              bm,
              function (e) {
                return [e];
              },
              [Cm]
            ),
            Wr(
              40,
              671744,
              null,
              0,
              py,
              [
                [3, Em],
                [8, null],
                [8, null],
                [6, bm],
                [2, ay],
              ],
              { name: [0, "name"] },
              null
            ),
            Kr(2048, null, xm, null, [py]),
            Wr(42, 16384, null, 0, Am, [[4, xm]], null, null),
            (e()(),
            Ai(
              43,
              0,
              null,
              null,
              1,
              "button",
              [["class", "btn btn-success"]],
              [[8, "disabled", 0]],
              [[null, "click"]],
              function (e, t, n) {
                var r = !0;
                return (
                  "click" === t && (r = !1 !== e.component.onSubmit() && r), r
                );
              },
              null,
              null
            )),
            (e()(), Hi(-1, null, ["Valider"])),
            (e()(), ki(16777216, null, null, 1, null, Gy)),
            Wr(46, 16384, null, 0, kl, [vn, yn], { ngIf: [0, "ngIf"] }, null),
          ],
          function (e, t) {
            var n = t.component;
            e(t, 3, 0, n.thingForm),
              e(t, 12, 0, "title"),
              e(t, 22, 0, "price"),
              e(t, 31, 0, "description"),
              e(t, 40, 0, "imageUrl"),
              e(t, 46, 0, n.errorMessage);
          },
          function (e, t) {
            var n = t.component;
            e(
              t,
              1,
              0,
              Dr(t, 5).ngClassUntouched,
              Dr(t, 5).ngClassTouched,
              Dr(t, 5).ngClassPristine,
              Dr(t, 5).ngClassDirty,
              Dr(t, 5).ngClassValid,
              Dr(t, 5).ngClassInvalid,
              Dr(t, 5).ngClassPending
            ),
              e(
                t,
                9,
                0,
                Dr(t, 14).ngClassUntouched,
                Dr(t, 14).ngClassTouched,
                Dr(t, 14).ngClassPristine,
                Dr(t, 14).ngClassDirty,
                Dr(t, 14).ngClassValid,
                Dr(t, 14).ngClassInvalid,
                Dr(t, 14).ngClassPending
              ),
              e(
                t,
                18,
                0,
                Dr(t, 24).ngClassUntouched,
                Dr(t, 24).ngClassTouched,
                Dr(t, 24).ngClassPristine,
                Dr(t, 24).ngClassDirty,
                Dr(t, 24).ngClassValid,
                Dr(t, 24).ngClassInvalid,
                Dr(t, 24).ngClassPending
              ),
              e(
                t,
                28,
                0,
                Dr(t, 33).ngClassUntouched,
                Dr(t, 33).ngClassTouched,
                Dr(t, 33).ngClassPristine,
                Dr(t, 33).ngClassDirty,
                Dr(t, 33).ngClassValid,
                Dr(t, 33).ngClassInvalid,
                Dr(t, 33).ngClassPending
              ),
              e(
                t,
                37,
                0,
                Dr(t, 42).ngClassUntouched,
                Dr(t, 42).ngClassTouched,
                Dr(t, 42).ngClassPristine,
                Dr(t, 42).ngClassDirty,
                Dr(t, 42).ngClassValid,
                Dr(t, 42).ngClassInvalid,
                Dr(t, 42).ngClassPending
              ),
              e(t, 43, 0, n.thingForm.invalid);
          }
        );
      }
      function Qy(e) {
        return qi(
          0,
          [
            (e()(), ki(16777216, null, null, 1, null, Wy)),
            Wr(1, 16384, null, 0, kl, [vn, yn], { ngIf: [0, "ngIf"] }, null),
            (e()(), ki(16777216, null, null, 1, null, Ky)),
            Wr(3, 16384, null, 0, kl, [vn, yn], { ngIf: [0, "ngIf"] }, null),
          ],
          function (e, t) {
            var n = t.component;
            e(t, 1, 0, n.loading), e(t, 3, 0, !n.loading);
          },
          null
        );
      }
      function Zy(e) {
        return qi(
          0,
          [
            (e()(),
            Ai(
              0,
              0,
              null,
              null,
              1,
              "app-modify-thing",
              [],
              null,
              null,
              null,
              Qy,
              qy
            )),
            Wr(1, 114688, null, 0, zy, [gy, Zc, od, Ud, vy], null, null),
          ],
          function (e, t) {
            e(t, 1, 0);
          },
          null
        );
      }
      var Xy = Cr("app-modify-thing", zy, Zy, {}, {}, []);
      class Jy {
        constructor(e, t) {
          (this.state = e), (this.auth = t);
        }
        ngOnInit() {
          this.auth.isAuth$.next(!1),
            (this.auth.userId = ""),
            (this.auth.token = ""),
            this.state.part$.next(3),
            (this.state.part = 3);
        }
        ngOnDestroy() {}
      }
      var Yy = Fn({ encapsulation: 0, styles: [[""]], data: {} });
      function e_(e) {
        return qi(
          0,
          [
            (e()(),
            Ai(
              0,
              0,
              null,
              null,
              1,
              "app-header",
              [],
              null,
              null,
              null,
              kp,
              bp
            )),
            Wr(1, 245760, null, 0, vp, [Ud, _p, od], null, null),
            (e()(),
            Ai(
              2,
              16777216,
              null,
              null,
              1,
              "router-outlet",
              [],
              null,
              null,
              null,
              null,
              null
            )),
            Wr(3, 212992, null, 0, pd, [dd, vn, Ht, [8, null], gt], null, null),
          ],
          function (e, t) {
            e(t, 1, 0), e(t, 3, 0);
          },
          null
        );
      }
      function t_(e) {
        return qi(
          0,
          [
            (e()(),
            Ai(
              0,
              0,
              null,
              null,
              1,
              "app-part-three",
              [],
              null,
              null,
              null,
              e_,
              Yy
            )),
            Wr(1, 245760, null, 0, Jy, [Ud, _p], null, null),
          ],
          function (e, t) {
            e(t, 1, 0);
          },
          null
        );
      }
      var n_ = Cr("app-part-three", Jy, t_, {}, {}, []);
      class r_ {
        constructor(e, t, n, r) {
          (this.formBuilder = e),
            (this.router = t),
            (this.auth = n),
            (this.state = r),
            (this.loading = !1);
        }
        ngOnInit() {
          this.state.mode$.next("form"),
            (this.loginForm = this.formBuilder.group({
              email: [null, [Rm.required, Rm.email]],
              password: [null, Rm.required],
            }));
        }
        onLogin() {
          this.loading = !0;
          const e = this.loginForm.get("email").value,
            t = this.loginForm.get("password").value;
          this.auth
            .login(e, t)
            .then(() => {
              (this.loading = !1),
                3 === this.state.part
                  ? this.router.navigate(["/part-three/all-stuff"])
                  : 4 === this.state.part &&
                    this.router.navigate(["/part-four/all-stuff"]);
            })
            .catch((e) => {
              (this.loading = !1), (this.errorMessage = e.message);
            });
        }
      }
      var s_ = Fn({ encapsulation: 0, styles: [[""]], data: {} });
      function i_(e) {
        return qi(
          0,
          [
            (e()(),
            Ai(
              0,
              0,
              null,
              null,
              1,
              "mat-spinner",
              [
                ["class", "mat-spinner mat-progress-spinner"],
                ["mode", "indeterminate"],
                ["role", "progressbar"],
              ],
              [
                [2, "_mat-animation-noopable", null],
                [4, "width", "px"],
                [4, "height", "px"],
              ],
              null,
              null,
              _m,
              gm
            )),
            Wr(
              1,
              114688,
              null,
              0,
              Wp,
              [Wt, Fp, [2, Ul], [2, pm], zp],
              null,
              null
            ),
          ],
          function (e, t) {
            e(t, 1, 0);
          },
          function (e, t) {
            e(
              t,
              0,
              0,
              Dr(t, 1)._noopAnimations,
              Dr(t, 1).diameter,
              Dr(t, 1).diameter
            );
          }
        );
      }
      function o_(e) {
        return qi(
          0,
          [
            (e()(),
            Ai(
              0,
              0,
              null,
              null,
              27,
              "div",
              [["class", "col-sm-8 offset-sm-2 mt-2"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Ai(
              1,
              0,
              null,
              null,
              24,
              "form",
              [["novalidate", ""]],
              [
                [2, "ng-untouched", null],
                [2, "ng-touched", null],
                [2, "ng-pristine", null],
                [2, "ng-dirty", null],
                [2, "ng-valid", null],
                [2, "ng-invalid", null],
                [2, "ng-pending", null],
              ],
              [
                [null, "submit"],
                [null, "reset"],
              ],
              function (e, t, n) {
                var r = !0;
                return (
                  "submit" === t && (r = !1 !== Dr(e, 3).onSubmit(n) && r),
                  "reset" === t && (r = !1 !== Dr(e, 3).onReset() && r),
                  r
                );
              },
              null,
              null
            )),
            Wr(2, 16384, null, 0, ly, [], null, null),
            Wr(
              3,
              540672,
              null,
              0,
              uy,
              [
                [8, null],
                [8, null],
              ],
              { form: [0, "form"] },
              null
            ),
            Kr(2048, null, Em, null, [uy]),
            Wr(5, 16384, null, 0, Im, [[4, Em]], null, null),
            (e()(),
            Ai(
              6,
              0,
              null,
              null,
              8,
              "div",
              [["class", "form-group"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Ai(
              7,
              0,
              null,
              null,
              1,
              "label",
              [["for", "email"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), Hi(-1, null, ["Adresse mail"])),
            (e()(),
            Ai(
              9,
              0,
              null,
              null,
              5,
              "input",
              [
                ["class", "form-control"],
                ["formControlName", "email"],
                ["id", "email"],
                ["type", "email"],
              ],
              [
                [2, "ng-untouched", null],
                [2, "ng-touched", null],
                [2, "ng-pristine", null],
                [2, "ng-dirty", null],
                [2, "ng-valid", null],
                [2, "ng-invalid", null],
                [2, "ng-pending", null],
              ],
              [
                [null, "input"],
                [null, "blur"],
                [null, "compositionstart"],
                [null, "compositionend"],
              ],
              function (e, t, n) {
                var r = !0;
                return (
                  "input" === t &&
                    (r = !1 !== Dr(e, 10)._handleInput(n.target.value) && r),
                  "blur" === t && (r = !1 !== Dr(e, 10).onTouched() && r),
                  "compositionstart" === t &&
                    (r = !1 !== Dr(e, 10)._compositionStart() && r),
                  "compositionend" === t &&
                    (r = !1 !== Dr(e, 10)._compositionEnd(n.target.value) && r),
                  r
                );
              },
              null,
              null
            )),
            Wr(10, 16384, null, 0, Cm, [Xt, Wt, [2, wm]], null, null),
            Kr(
              1024,
              null,
              bm,
              function (e) {
                return [e];
              },
              [Cm]
            ),
            Wr(
              12,
              671744,
              null,
              0,
              py,
              [
                [3, Em],
                [8, null],
                [8, null],
                [6, bm],
                [2, ay],
              ],
              { name: [0, "name"] },
              null
            ),
            Kr(2048, null, xm, null, [py]),
            Wr(14, 16384, null, 0, Am, [[4, xm]], null, null),
            (e()(),
            Ai(
              15,
              0,
              null,
              null,
              8,
              "div",
              [["class", "form-group"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Ai(
              16,
              0,
              null,
              null,
              1,
              "label",
              [["for", "password"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), Hi(-1, null, ["Mot de passe"])),
            (e()(),
            Ai(
              18,
              0,
              null,
              null,
              5,
              "input",
              [
                ["class", "form-control"],
                ["formControlName", "password"],
                ["id", "password"],
                ["type", "password"],
              ],
              [
                [2, "ng-untouched", null],
                [2, "ng-touched", null],
                [2, "ng-pristine", null],
                [2, "ng-dirty", null],
                [2, "ng-valid", null],
                [2, "ng-invalid", null],
                [2, "ng-pending", null],
              ],
              [
                [null, "input"],
                [null, "blur"],
                [null, "compositionstart"],
                [null, "compositionend"],
              ],
              function (e, t, n) {
                var r = !0;
                return (
                  "input" === t &&
                    (r = !1 !== Dr(e, 19)._handleInput(n.target.value) && r),
                  "blur" === t && (r = !1 !== Dr(e, 19).onTouched() && r),
                  "compositionstart" === t &&
                    (r = !1 !== Dr(e, 19)._compositionStart() && r),
                  "compositionend" === t &&
                    (r = !1 !== Dr(e, 19)._compositionEnd(n.target.value) && r),
                  r
                );
              },
              null,
              null
            )),
            Wr(19, 16384, null, 0, Cm, [Xt, Wt, [2, wm]], null, null),
            Kr(
              1024,
              null,
              bm,
              function (e) {
                return [e];
              },
              [Cm]
            ),
            Wr(
              21,
              671744,
              null,
              0,
              py,
              [
                [3, Em],
                [8, null],
                [8, null],
                [6, bm],
                [2, ay],
              ],
              { name: [0, "name"] },
              null
            ),
            Kr(2048, null, xm, null, [py]),
            Wr(23, 16384, null, 0, Am, [[4, xm]], null, null),
            (e()(),
            Ai(
              24,
              0,
              null,
              null,
              1,
              "button",
              [["class", "btn btn-success"]],
              [[8, "disabled", 0]],
              [[null, "click"]],
              function (e, t, n) {
                var r = !0;
                return (
                  "click" === t && (r = !1 !== e.component.onLogin() && r), r
                );
              },
              null,
              null
            )),
            (e()(), Hi(-1, null, ["Connexion"])),
            (e()(),
            Ai(26, 0, null, null, 1, "p", [], null, null, null, null, null)),
            (e()(), Hi(27, null, ["", ""])),
          ],
          function (e, t) {
            e(t, 3, 0, t.component.loginForm),
              e(t, 12, 0, "email"),
              e(t, 21, 0, "password");
          },
          function (e, t) {
            var n = t.component;
            e(
              t,
              1,
              0,
              Dr(t, 5).ngClassUntouched,
              Dr(t, 5).ngClassTouched,
              Dr(t, 5).ngClassPristine,
              Dr(t, 5).ngClassDirty,
              Dr(t, 5).ngClassValid,
              Dr(t, 5).ngClassInvalid,
              Dr(t, 5).ngClassPending
            ),
              e(
                t,
                9,
                0,
                Dr(t, 14).ngClassUntouched,
                Dr(t, 14).ngClassTouched,
                Dr(t, 14).ngClassPristine,
                Dr(t, 14).ngClassDirty,
                Dr(t, 14).ngClassValid,
                Dr(t, 14).ngClassInvalid,
                Dr(t, 14).ngClassPending
              ),
              e(
                t,
                18,
                0,
                Dr(t, 23).ngClassUntouched,
                Dr(t, 23).ngClassTouched,
                Dr(t, 23).ngClassPristine,
                Dr(t, 23).ngClassDirty,
                Dr(t, 23).ngClassValid,
                Dr(t, 23).ngClassInvalid,
                Dr(t, 23).ngClassPending
              ),
              e(t, 24, 0, n.loginForm.invalid),
              e(t, 27, 0, n.errorMessage);
          }
        );
      }
      function l_(e) {
        return qi(
          0,
          [
            (e()(), ki(16777216, null, null, 1, null, i_)),
            Wr(1, 16384, null, 0, kl, [vn, yn], { ngIf: [0, "ngIf"] }, null),
            (e()(), ki(16777216, null, null, 1, null, o_)),
            Wr(3, 16384, null, 0, kl, [vn, yn], { ngIf: [0, "ngIf"] }, null),
          ],
          function (e, t) {
            var n = t.component;
            e(t, 1, 0, n.loading), e(t, 3, 0, !n.loading);
          },
          null
        );
      }
      function a_(e) {
        return qi(
          0,
          [
            (e()(),
            Ai(0, 0, null, null, 1, "app-login", [], null, null, null, l_, s_)),
            Wr(1, 114688, null, 0, r_, [gy, od, _p, Ud], null, null),
          ],
          function (e, t) {
            e(t, 1, 0);
          },
          null
        );
      }
      var u_ = Cr("app-login", r_, a_, {}, {}, []);
      class c_ {
        constructor(e, t, n, r) {
          (this.formBuilder = e),
            (this.router = t),
            (this.auth = n),
            (this.state = r),
            (this.loading = !1);
        }
        ngOnInit() {
          this.state.mode$.next("form"),
            (this.signupForm = this.formBuilder.group({
              email: [null, [Rm.required, Rm.email]],
              password: [null, Rm.required],
            }));
        }
        onSignup() {
          this.loading = !0;
          const e = this.signupForm.get("email").value,
            t = this.signupForm.get("password").value;
          this.auth
            .createNewUser(e, t)
            .then(() => {
              (this.loading = !1),
                3 === this.state.part
                  ? this.router.navigate(["/part-three/all-stuff"])
                  : 4 === this.state.part &&
                    this.router.navigate(["/part-four/all-stuff"]);
            })
            .catch((e) => {
              (this.loading = !1), (this.errorMessage = e.message);
            });
        }
      }
      var h_ = Fn({ encapsulation: 0, styles: [[""]], data: {} });
      function d_(e) {
        return qi(
          0,
          [
            (e()(),
            Ai(
              0,
              0,
              null,
              null,
              1,
              "mat-spinner",
              [
                ["class", "mat-spinner mat-progress-spinner"],
                ["mode", "indeterminate"],
                ["role", "progressbar"],
              ],
              [
                [2, "_mat-animation-noopable", null],
                [4, "width", "px"],
                [4, "height", "px"],
              ],
              null,
              null,
              _m,
              gm
            )),
            Wr(
              1,
              114688,
              null,
              0,
              Wp,
              [Wt, Fp, [2, Ul], [2, pm], zp],
              null,
              null
            ),
          ],
          function (e, t) {
            e(t, 1, 0);
          },
          function (e, t) {
            e(
              t,
              0,
              0,
              Dr(t, 1)._noopAnimations,
              Dr(t, 1).diameter,
              Dr(t, 1).diameter
            );
          }
        );
      }
      function p_(e) {
        return qi(
          0,
          [
            (e()(),
            Ai(
              0,
              0,
              null,
              null,
              27,
              "div",
              [["class", "col-sm-8 offset-sm-2 mt-2"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Ai(
              1,
              0,
              null,
              null,
              24,
              "form",
              [["novalidate", ""]],
              [
                [2, "ng-untouched", null],
                [2, "ng-touched", null],
                [2, "ng-pristine", null],
                [2, "ng-dirty", null],
                [2, "ng-valid", null],
                [2, "ng-invalid", null],
                [2, "ng-pending", null],
              ],
              [
                [null, "submit"],
                [null, "reset"],
              ],
              function (e, t, n) {
                var r = !0;
                return (
                  "submit" === t && (r = !1 !== Dr(e, 3).onSubmit(n) && r),
                  "reset" === t && (r = !1 !== Dr(e, 3).onReset() && r),
                  r
                );
              },
              null,
              null
            )),
            Wr(2, 16384, null, 0, ly, [], null, null),
            Wr(
              3,
              540672,
              null,
              0,
              uy,
              [
                [8, null],
                [8, null],
              ],
              { form: [0, "form"] },
              null
            ),
            Kr(2048, null, Em, null, [uy]),
            Wr(5, 16384, null, 0, Im, [[4, Em]], null, null),
            (e()(),
            Ai(
              6,
              0,
              null,
              null,
              8,
              "div",
              [["class", "form-group"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Ai(
              7,
              0,
              null,
              null,
              1,
              "label",
              [["for", "email"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), Hi(-1, null, ["Adresse mail"])),
            (e()(),
            Ai(
              9,
              0,
              null,
              null,
              5,
              "input",
              [
                ["class", "form-control"],
                ["formControlName", "email"],
                ["id", "email"],
                ["type", "email"],
              ],
              [
                [2, "ng-untouched", null],
                [2, "ng-touched", null],
                [2, "ng-pristine", null],
                [2, "ng-dirty", null],
                [2, "ng-valid", null],
                [2, "ng-invalid", null],
                [2, "ng-pending", null],
              ],
              [
                [null, "input"],
                [null, "blur"],
                [null, "compositionstart"],
                [null, "compositionend"],
              ],
              function (e, t, n) {
                var r = !0;
                return (
                  "input" === t &&
                    (r = !1 !== Dr(e, 10)._handleInput(n.target.value) && r),
                  "blur" === t && (r = !1 !== Dr(e, 10).onTouched() && r),
                  "compositionstart" === t &&
                    (r = !1 !== Dr(e, 10)._compositionStart() && r),
                  "compositionend" === t &&
                    (r = !1 !== Dr(e, 10)._compositionEnd(n.target.value) && r),
                  r
                );
              },
              null,
              null
            )),
            Wr(10, 16384, null, 0, Cm, [Xt, Wt, [2, wm]], null, null),
            Kr(
              1024,
              null,
              bm,
              function (e) {
                return [e];
              },
              [Cm]
            ),
            Wr(
              12,
              671744,
              null,
              0,
              py,
              [
                [3, Em],
                [8, null],
                [8, null],
                [6, bm],
                [2, ay],
              ],
              { name: [0, "name"] },
              null
            ),
            Kr(2048, null, xm, null, [py]),
            Wr(14, 16384, null, 0, Am, [[4, xm]], null, null),
            (e()(),
            Ai(
              15,
              0,
              null,
              null,
              8,
              "div",
              [["class", "form-group"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Ai(
              16,
              0,
              null,
              null,
              1,
              "label",
              [["for", "password"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), Hi(-1, null, ["Mot de passe"])),
            (e()(),
            Ai(
              18,
              0,
              null,
              null,
              5,
              "input",
              [
                ["class", "form-control"],
                ["formControlName", "password"],
                ["id", "password"],
                ["type", "password"],
              ],
              [
                [2, "ng-untouched", null],
                [2, "ng-touched", null],
                [2, "ng-pristine", null],
                [2, "ng-dirty", null],
                [2, "ng-valid", null],
                [2, "ng-invalid", null],
                [2, "ng-pending", null],
              ],
              [
                [null, "input"],
                [null, "blur"],
                [null, "compositionstart"],
                [null, "compositionend"],
              ],
              function (e, t, n) {
                var r = !0;
                return (
                  "input" === t &&
                    (r = !1 !== Dr(e, 19)._handleInput(n.target.value) && r),
                  "blur" === t && (r = !1 !== Dr(e, 19).onTouched() && r),
                  "compositionstart" === t &&
                    (r = !1 !== Dr(e, 19)._compositionStart() && r),
                  "compositionend" === t &&
                    (r = !1 !== Dr(e, 19)._compositionEnd(n.target.value) && r),
                  r
                );
              },
              null,
              null
            )),
            Wr(19, 16384, null, 0, Cm, [Xt, Wt, [2, wm]], null, null),
            Kr(
              1024,
              null,
              bm,
              function (e) {
                return [e];
              },
              [Cm]
            ),
            Wr(
              21,
              671744,
              null,
              0,
              py,
              [
                [3, Em],
                [8, null],
                [8, null],
                [6, bm],
                [2, ay],
              ],
              { name: [0, "name"] },
              null
            ),
            Kr(2048, null, xm, null, [py]),
            Wr(23, 16384, null, 0, Am, [[4, xm]], null, null),
            (e()(),
            Ai(
              24,
              0,
              null,
              null,
              1,
              "button",
              [["class", "btn btn-success"]],
              [[8, "disabled", 0]],
              [[null, "click"]],
              function (e, t, n) {
                var r = !0;
                return (
                  "click" === t && (r = !1 !== e.component.onSignup() && r), r
                );
              },
              null,
              null
            )),
            (e()(), Hi(-1, null, ["Inscription"])),
            (e()(),
            Ai(26, 0, null, null, 1, "p", [], null, null, null, null, null)),
            (e()(), Hi(27, null, ["", ""])),
          ],
          function (e, t) {
            e(t, 3, 0, t.component.signupForm),
              e(t, 12, 0, "email"),
              e(t, 21, 0, "password");
          },
          function (e, t) {
            var n = t.component;
            e(
              t,
              1,
              0,
              Dr(t, 5).ngClassUntouched,
              Dr(t, 5).ngClassTouched,
              Dr(t, 5).ngClassPristine,
              Dr(t, 5).ngClassDirty,
              Dr(t, 5).ngClassValid,
              Dr(t, 5).ngClassInvalid,
              Dr(t, 5).ngClassPending
            ),
              e(
                t,
                9,
                0,
                Dr(t, 14).ngClassUntouched,
                Dr(t, 14).ngClassTouched,
                Dr(t, 14).ngClassPristine,
                Dr(t, 14).ngClassDirty,
                Dr(t, 14).ngClassValid,
                Dr(t, 14).ngClassInvalid,
                Dr(t, 14).ngClassPending
              ),
              e(
                t,
                18,
                0,
                Dr(t, 23).ngClassUntouched,
                Dr(t, 23).ngClassTouched,
                Dr(t, 23).ngClassPristine,
                Dr(t, 23).ngClassDirty,
                Dr(t, 23).ngClassValid,
                Dr(t, 23).ngClassInvalid,
                Dr(t, 23).ngClassPending
              ),
              e(t, 24, 0, n.signupForm.invalid),
              e(t, 27, 0, n.errorMessage);
          }
        );
      }
      function f_(e) {
        return qi(
          0,
          [
            (e()(), ki(16777216, null, null, 1, null, d_)),
            Wr(1, 16384, null, 0, kl, [vn, yn], { ngIf: [0, "ngIf"] }, null),
            (e()(), ki(16777216, null, null, 1, null, p_)),
            Wr(3, 16384, null, 0, kl, [vn, yn], { ngIf: [0, "ngIf"] }, null),
          ],
          function (e, t) {
            var n = t.component;
            e(t, 1, 0, n.loading), e(t, 3, 0, !n.loading);
          },
          null
        );
      }
      function g_(e) {
        return qi(
          0,
          [
            (e()(),
            Ai(
              0,
              0,
              null,
              null,
              1,
              "app-signup",
              [],
              null,
              null,
              null,
              f_,
              h_
            )),
            Wr(1, 114688, null, 0, c_, [gy, od, _p, Ud], null, null),
          ],
          function (e, t) {
            e(t, 1, 0);
          },
          null
        );
      }
      var m_ = Cr("app-signup", c_, g_, {}, {}, []);
      class y_ {
        constructor(e, t) {
          (this.state = e), (this.auth = t);
        }
        ngOnInit() {
          this.auth.isAuth$.next(!1),
            (this.auth.userId = ""),
            (this.auth.token = ""),
            this.state.part$.next(4),
            (this.state.part = 4);
        }
        ngOnDestroy() {}
      }
      var __ = Fn({ encapsulation: 0, styles: [[""]], data: {} });
      function v_(e) {
        return qi(
          0,
          [
            (e()(),
            Ai(
              0,
              0,
              null,
              null,
              1,
              "app-header",
              [],
              null,
              null,
              null,
              kp,
              bp
            )),
            Wr(1, 245760, null, 0, vp, [Ud, _p, od], null, null),
            (e()(),
            Ai(
              2,
              16777216,
              null,
              null,
              1,
              "router-outlet",
              [],
              null,
              null,
              null,
              null,
              null
            )),
            Wr(3, 212992, null, 0, pd, [dd, vn, Ht, [8, null], gt], null, null),
          ],
          function (e, t) {
            e(t, 1, 0), e(t, 3, 0);
          },
          null
        );
      }
      function b_(e) {
        return qi(
          0,
          [
            (e()(),
            Ai(
              0,
              0,
              null,
              null,
              1,
              "app-part-four",
              [],
              null,
              null,
              null,
              v_,
              __
            )),
            Wr(1, 245760, null, 0, y_, [Ud, _p], null, null),
          ],
          function (e, t) {
            e(t, 1, 0);
          },
          null
        );
      }
      var w_ = Cr("app-part-four", y_, b_, {}, {}, []);
      const C_ = (e) => {
        if ("string" == typeof e.value) return Hl(null);
        const t = e.value,
          n = new FileReader();
        return b.create((e) => {
          n.addEventListener("loadend", () => {
            const t = new Uint8Array(n.result).subarray(0, 4);
            let r = "",
              s = !1;
            for (let e = 0; e < t.length; e++) r += t[e].toString(16);
            switch (r) {
              case "89504e47":
                s = !0;
                break;
              case "ffd8ffe0":
              case "ffd8ffe1":
              case "ffd8ffe2":
              case "ffd8ffe3":
              case "ffd8ffe8":
                s = !0;
                break;
              default:
                s = !1;
            }
            e.next(s ? null : { invalidMimeType: !0 }), e.complete();
          }),
            n.readAsArrayBuffer(t);
        });
      };
      class S_ {
        constructor(e, t, n, r, s) {
          (this.state = e),
            (this.formBuilder = t),
            (this.stuffService = n),
            (this.router = r),
            (this.auth = s),
            (this.loading = !1);
        }
        ngOnInit() {
          this.state.mode$.next("form"),
            (this.thingForm = this.formBuilder.group({
              title: [null, Rm.required],
              description: [null, Rm.required],
              price: [0, Rm.required],
              image: [null, Rm.required, C_],
            })),
            (this.userId = this.auth.userId);
        }
        onSubmit() {
          this.loading = !0;
          const e = new _y();
          (e.title = this.thingForm.get("title").value),
            (e.description = this.thingForm.get("description").value),
            (e.price = 100 * this.thingForm.get("price").value),
            (e.imageUrl = ""),
            (e.userId = this.userId),
            this.stuffService
              .createNewThingWithFile(e, this.thingForm.get("image").value)
              .then(
                () => {
                  this.thingForm.reset(),
                    (this.loading = !1),
                    this.router.navigate(["/part-four/all-stuff"]);
                },
                (e) => {
                  (this.loading = !1), (this.errorMessage = e.message);
                }
              );
        }
        onImagePick(e) {
          const t = e.target.files[0];
          this.thingForm.get("image").patchValue(t),
            this.thingForm.get("image").updateValueAndValidity();
          const n = new FileReader();
          (n.onload = () => {
            this.imagePreview = this.thingForm.get("image").valid
              ? n.result
              : null;
          }),
            n.readAsDataURL(t);
        }
      }
      var E_ = Fn({
        encapsulation: 0,
        styles: [
          [
            "input[type=file][_ngcontent-%COMP%]{visibility:hidden}.image-preview[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-width:100%}",
          ],
        ],
        data: {},
      });
      function T_(e) {
        return qi(
          0,
          [
            (e()(),
            Ai(
              0,
              0,
              null,
              null,
              1,
              "mat-spinner",
              [
                ["class", "mat-spinner mat-progress-spinner"],
                ["mode", "indeterminate"],
                ["role", "progressbar"],
              ],
              [
                [2, "_mat-animation-noopable", null],
                [4, "width", "px"],
                [4, "height", "px"],
              ],
              null,
              null,
              _m,
              gm
            )),
            Wr(
              1,
              114688,
              null,
              0,
              Wp,
              [Wt, Fp, [2, Ul], [2, pm], zp],
              null,
              null
            ),
          ],
          function (e, t) {
            e(t, 1, 0);
          },
          function (e, t) {
            e(
              t,
              0,
              0,
              Dr(t, 1)._noopAnimations,
              Dr(t, 1).diameter,
              Dr(t, 1).diameter
            );
          }
        );
      }
      function x_(e) {
        return qi(
          0,
          [
            (e()(),
            Ai(
              0,
              0,
              null,
              null,
              1,
              "div",
              [["class", "image-preview"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Ai(
              1,
              0,
              null,
              null,
              0,
              "img",
              [["alt", ""]],
              [[8, "src", 4]],
              null,
              null,
              null,
              null
            )),
          ],
          null,
          function (e, t) {
            e(t, 1, 0, t.component.imagePreview);
          }
        );
      }
      function k_(e) {
        return qi(
          0,
          [
            (e()(),
            Ai(
              0,
              0,
              null,
              null,
              1,
              "p",
              [["class", "alert-danger"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), Hi(1, null, ["", ""])),
          ],
          null,
          function (e, t) {
            e(t, 1, 0, t.component.errorMessage);
          }
        );
      }
      function A_(e) {
        return qi(
          0,
          [
            (e()(),
            Ai(
              0,
              0,
              null,
              null,
              42,
              "div",
              [["class", "col-sm-6 offset-sm-3 mt-2"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Ai(
              1,
              0,
              null,
              null,
              41,
              "form",
              [["novalidate", ""]],
              [
                [2, "ng-untouched", null],
                [2, "ng-touched", null],
                [2, "ng-pristine", null],
                [2, "ng-dirty", null],
                [2, "ng-valid", null],
                [2, "ng-invalid", null],
                [2, "ng-pending", null],
              ],
              [
                [null, "submit"],
                [null, "reset"],
              ],
              function (e, t, n) {
                var r = !0;
                return (
                  "submit" === t && (r = !1 !== Dr(e, 3).onSubmit(n) && r),
                  "reset" === t && (r = !1 !== Dr(e, 3).onReset() && r),
                  r
                );
              },
              null,
              null
            )),
            Wr(2, 16384, null, 0, ly, [], null, null),
            Wr(
              3,
              540672,
              null,
              0,
              uy,
              [
                [8, null],
                [8, null],
              ],
              { form: [0, "form"] },
              null
            ),
            Kr(2048, null, Em, null, [uy]),
            Wr(5, 16384, null, 0, Im, [[4, Em]], null, null),
            (e()(),
            Ai(
              6,
              0,
              null,
              null,
              8,
              "div",
              [["class", "form-group"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Ai(
              7,
              0,
              null,
              null,
              1,
              "label",
              [["for", "title"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), Hi(-1, null, ["Titre"])),
            (e()(),
            Ai(
              9,
              0,
              null,
              null,
              5,
              "input",
              [
                ["class", "form-control"],
                ["formControlName", "title"],
                ["id", "title"],
                ["placeholder", "Que vendez-vous ?"],
                ["type", "text"],
              ],
              [
                [2, "ng-untouched", null],
                [2, "ng-touched", null],
                [2, "ng-pristine", null],
                [2, "ng-dirty", null],
                [2, "ng-valid", null],
                [2, "ng-invalid", null],
                [2, "ng-pending", null],
              ],
              [
                [null, "input"],
                [null, "blur"],
                [null, "compositionstart"],
                [null, "compositionend"],
              ],
              function (e, t, n) {
                var r = !0;
                return (
                  "input" === t &&
                    (r = !1 !== Dr(e, 10)._handleInput(n.target.value) && r),
                  "blur" === t && (r = !1 !== Dr(e, 10).onTouched() && r),
                  "compositionstart" === t &&
                    (r = !1 !== Dr(e, 10)._compositionStart() && r),
                  "compositionend" === t &&
                    (r = !1 !== Dr(e, 10)._compositionEnd(n.target.value) && r),
                  r
                );
              },
              null,
              null
            )),
            Wr(10, 16384, null, 0, Cm, [Xt, Wt, [2, wm]], null, null),
            Kr(
              1024,
              null,
              bm,
              function (e) {
                return [e];
              },
              [Cm]
            ),
            Wr(
              12,
              671744,
              null,
              0,
              py,
              [
                [3, Em],
                [8, null],
                [8, null],
                [6, bm],
                [2, ay],
              ],
              { name: [0, "name"] },
              null
            ),
            Kr(2048, null, xm, null, [py]),
            Wr(14, 16384, null, 0, Am, [[4, xm]], null, null),
            (e()(),
            Ai(
              15,
              0,
              null,
              null,
              1,
              "button",
              [
                ["class", "btn btn-success"],
                ["type", "button"],
              ],
              null,
              [[null, "click"]],
              function (e, t, n) {
                var r = !0;
                return "click" === t && (r = !1 !== Dr(e, 17).click() && r), r;
              },
              null,
              null
            )),
            (e()(), Hi(-1, null, ["Ajouter image"])),
            (e()(),
            Ai(
              17,
              0,
              [["filePicker", 1]],
              null,
              0,
              "input",
              [["type", "file"]],
              null,
              [[null, "change"]],
              function (e, t, n) {
                var r = !0;
                return (
                  "change" === t &&
                    (r = !1 !== e.component.onImagePick(n) && r),
                  r
                );
              },
              null,
              null
            )),
            (e()(), ki(16777216, null, null, 1, null, x_)),
            Wr(19, 16384, null, 0, kl, [vn, yn], { ngIf: [0, "ngIf"] }, null),
            (e()(),
            Ai(
              20,
              0,
              null,
              null,
              9,
              "div",
              [["class", "form-group"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Ai(
              21,
              0,
              null,
              null,
              1,
              "label",
              [["for", "price"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), Hi(-1, null, ["Prix (in \u20ac)"])),
            (e()(),
            Ai(
              23,
              0,
              null,
              null,
              6,
              "input",
              [
                ["class", "form-control"],
                ["formControlName", "price"],
                ["id", "price"],
                ["min", "0"],
                ["type", "number"],
              ],
              [
                [2, "ng-untouched", null],
                [2, "ng-touched", null],
                [2, "ng-pristine", null],
                [2, "ng-dirty", null],
                [2, "ng-valid", null],
                [2, "ng-invalid", null],
                [2, "ng-pending", null],
              ],
              [
                [null, "input"],
                [null, "blur"],
                [null, "compositionstart"],
                [null, "compositionend"],
                [null, "change"],
              ],
              function (e, t, n) {
                var r = !0;
                return (
                  "input" === t &&
                    (r = !1 !== Dr(e, 24)._handleInput(n.target.value) && r),
                  "blur" === t && (r = !1 !== Dr(e, 24).onTouched() && r),
                  "compositionstart" === t &&
                    (r = !1 !== Dr(e, 24)._compositionStart() && r),
                  "compositionend" === t &&
                    (r = !1 !== Dr(e, 24)._compositionEnd(n.target.value) && r),
                  "change" === t &&
                    (r = !1 !== Dr(e, 25).onChange(n.target.value) && r),
                  "input" === t &&
                    (r = !1 !== Dr(e, 25).onChange(n.target.value) && r),
                  "blur" === t && (r = !1 !== Dr(e, 25).onTouched() && r),
                  r
                );
              },
              null,
              null
            )),
            Wr(24, 16384, null, 0, Cm, [Xt, Wt, [2, wm]], null, null),
            Wr(25, 16384, null, 0, Lm, [Xt, Wt], null, null),
            Kr(
              1024,
              null,
              bm,
              function (e, t) {
                return [e, t];
              },
              [Cm, Lm]
            ),
            Wr(
              27,
              671744,
              null,
              0,
              py,
              [
                [3, Em],
                [8, null],
                [8, null],
                [6, bm],
                [2, ay],
              ],
              { name: [0, "name"] },
              null
            ),
            Kr(2048, null, xm, null, [py]),
            Wr(29, 16384, null, 0, Am, [[4, xm]], null, null),
            (e()(),
            Ai(
              30,
              0,
              null,
              null,
              8,
              "div",
              [["class", "form-group"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Ai(
              31,
              0,
              null,
              null,
              1,
              "label",
              [["for", "description"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), Hi(-1, null, ["Description"])),
            (e()(),
            Ai(
              33,
              0,
              null,
              null,
              5,
              "textarea",
              [
                ["class", "form-control"],
                ["cols", "30"],
                ["formControlName", "description"],
                ["id", "description"],
                ["name", "description"],
                [
                  "placeholder",
                  "D\xe9crivez votre objet (type, qualit\xe9, etc.)",
                ],
                ["rows", "7"],
              ],
              [
                [2, "ng-untouched", null],
                [2, "ng-touched", null],
                [2, "ng-pristine", null],
                [2, "ng-dirty", null],
                [2, "ng-valid", null],
                [2, "ng-invalid", null],
                [2, "ng-pending", null],
              ],
              [
                [null, "input"],
                [null, "blur"],
                [null, "compositionstart"],
                [null, "compositionend"],
              ],
              function (e, t, n) {
                var r = !0;
                return (
                  "input" === t &&
                    (r = !1 !== Dr(e, 34)._handleInput(n.target.value) && r),
                  "blur" === t && (r = !1 !== Dr(e, 34).onTouched() && r),
                  "compositionstart" === t &&
                    (r = !1 !== Dr(e, 34)._compositionStart() && r),
                  "compositionend" === t &&
                    (r = !1 !== Dr(e, 34)._compositionEnd(n.target.value) && r),
                  r
                );
              },
              null,
              null
            )),
            Wr(34, 16384, null, 0, Cm, [Xt, Wt, [2, wm]], null, null),
            Kr(
              1024,
              null,
              bm,
              function (e) {
                return [e];
              },
              [Cm]
            ),
            Wr(
              36,
              671744,
              null,
              0,
              py,
              [
                [3, Em],
                [8, null],
                [8, null],
                [6, bm],
                [2, ay],
              ],
              { name: [0, "name"] },
              null
            ),
            Kr(2048, null, xm, null, [py]),
            Wr(38, 16384, null, 0, Am, [[4, xm]], null, null),
            (e()(),
            Ai(
              39,
              0,
              null,
              null,
              1,
              "button",
              [["class", "btn btn-primary"]],
              [[8, "disabled", 0]],
              [[null, "click"]],
              function (e, t, n) {
                var r = !0;
                return (
                  "click" === t && (r = !1 !== e.component.onSubmit() && r), r
                );
              },
              null,
              null
            )),
            (e()(), Hi(-1, null, ["Valider"])),
            (e()(), ki(16777216, null, null, 1, null, k_)),
            Wr(42, 16384, null, 0, kl, [vn, yn], { ngIf: [0, "ngIf"] }, null),
          ],
          function (e, t) {
            var n = t.component;
            e(t, 3, 0, n.thingForm),
              e(t, 12, 0, "title"),
              e(t, 19, 0, n.imagePreview),
              e(t, 27, 0, "price"),
              e(t, 36, 0, "description"),
              e(t, 42, 0, n.errorMessage);
          },
          function (e, t) {
            var n = t.component;
            e(
              t,
              1,
              0,
              Dr(t, 5).ngClassUntouched,
              Dr(t, 5).ngClassTouched,
              Dr(t, 5).ngClassPristine,
              Dr(t, 5).ngClassDirty,
              Dr(t, 5).ngClassValid,
              Dr(t, 5).ngClassInvalid,
              Dr(t, 5).ngClassPending
            ),
              e(
                t,
                9,
                0,
                Dr(t, 14).ngClassUntouched,
                Dr(t, 14).ngClassTouched,
                Dr(t, 14).ngClassPristine,
                Dr(t, 14).ngClassDirty,
                Dr(t, 14).ngClassValid,
                Dr(t, 14).ngClassInvalid,
                Dr(t, 14).ngClassPending
              ),
              e(
                t,
                23,
                0,
                Dr(t, 29).ngClassUntouched,
                Dr(t, 29).ngClassTouched,
                Dr(t, 29).ngClassPristine,
                Dr(t, 29).ngClassDirty,
                Dr(t, 29).ngClassValid,
                Dr(t, 29).ngClassInvalid,
                Dr(t, 29).ngClassPending
              ),
              e(
                t,
                33,
                0,
                Dr(t, 38).ngClassUntouched,
                Dr(t, 38).ngClassTouched,
                Dr(t, 38).ngClassPristine,
                Dr(t, 38).ngClassDirty,
                Dr(t, 38).ngClassValid,
                Dr(t, 38).ngClassInvalid,
                Dr(t, 38).ngClassPending
              ),
              e(t, 39, 0, n.thingForm.invalid);
          }
        );
      }
      function I_(e) {
        return qi(
          0,
          [
            (e()(), ki(16777216, null, null, 1, null, T_)),
            Wr(1, 16384, null, 0, kl, [vn, yn], { ngIf: [0, "ngIf"] }, null),
            (e()(), ki(16777216, null, null, 1, null, A_)),
            Wr(3, 16384, null, 0, kl, [vn, yn], { ngIf: [0, "ngIf"] }, null),
          ],
          function (e, t) {
            var n = t.component;
            e(t, 1, 0, n.loading), e(t, 3, 0, !n.loading);
          },
          null
        );
      }
      function P_(e) {
        return qi(
          0,
          [
            (e()(),
            Ai(
              0,
              0,
              null,
              null,
              1,
              "app-new-thing-with-upload",
              [],
              null,
              null,
              null,
              I_,
              E_
            )),
            Wr(1, 114688, null, 0, S_, [Ud, gy, vy, od, _p], null, null),
          ],
          function (e, t) {
            e(t, 1, 0);
          },
          null
        );
      }
      var N_ = Cr("app-new-thing-with-upload", S_, P_, {}, {}, []);
      class R_ {
        constructor(e, t, n, r, s, i) {
          (this.state = e),
            (this.formBuilder = t),
            (this.stuffService = n),
            (this.route = r),
            (this.router = s),
            (this.auth = i),
            (this.loading = !1);
        }
        ngOnInit() {
          (this.loading = !0),
            this.state.mode$.next("form"),
            (this.userId = this.auth.userId),
            this.route.params.subscribe((e) => {
              this.stuffService.getThingById(e.id).then((e) => {
                (this.thing = e),
                  (this.thingForm = this.formBuilder.group({
                    title: [e.title, Rm.required],
                    description: [e.description, Rm.required],
                    price: [e.price / 100, Rm.required],
                    image: [e.imageUrl, Rm.required, C_],
                  })),
                  (this.imagePreview = e.imageUrl),
                  (this.loading = !1);
              });
            });
        }
        onSubmit() {
          this.loading = !0;
          const e = new _y();
          (e._id = this.thing._id),
            (e.title = this.thingForm.get("title").value),
            (e.description = this.thingForm.get("description").value),
            (e.price = 100 * this.thingForm.get("price").value),
            (e.imageUrl = ""),
            (e.userId = this.userId),
            this.stuffService
              .modifyThingWithFile(
                this.thing._id,
                e,
                this.thingForm.get("image").value
              )
              .then(
                () => {
                  this.thingForm.reset(),
                    (this.loading = !1),
                    this.router.navigate(["/part-four/all-stuff"]);
                },
                (e) => {
                  (this.loading = !1), (this.errorMessage = e.message);
                }
              );
        }
        onImagePick(e) {
          const t = e.target.files[0];
          console.log(t),
            this.thingForm.get("image").patchValue(t),
            this.thingForm.get("image").updateValueAndValidity();
          const n = new FileReader();
          (n.onload = () => {
            this.imagePreview = this.thingForm.get("image").valid
              ? n.result
              : null;
          }),
            n.readAsDataURL(t);
        }
      }
      var D_ = Fn({
        encapsulation: 0,
        styles: [
          [
            "input[type=file][_ngcontent-%COMP%]{visibility:hidden}.image-preview[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-width:100%}",
          ],
        ],
        data: {},
      });
      function O_(e) {
        return qi(
          0,
          [
            (e()(),
            Ai(
              0,
              0,
              null,
              null,
              1,
              "mat-spinner",
              [
                ["class", "mat-spinner mat-progress-spinner"],
                ["mode", "indeterminate"],
                ["role", "progressbar"],
              ],
              [
                [2, "_mat-animation-noopable", null],
                [4, "width", "px"],
                [4, "height", "px"],
              ],
              null,
              null,
              _m,
              gm
            )),
            Wr(
              1,
              114688,
              null,
              0,
              Wp,
              [Wt, Fp, [2, Ul], [2, pm], zp],
              null,
              null
            ),
          ],
          function (e, t) {
            e(t, 1, 0);
          },
          function (e, t) {
            e(
              t,
              0,
              0,
              Dr(t, 1)._noopAnimations,
              Dr(t, 1).diameter,
              Dr(t, 1).diameter
            );
          }
        );
      }
      function M_(e) {
        return qi(
          0,
          [
            (e()(),
            Ai(
              0,
              0,
              null,
              null,
              1,
              "div",
              [["class", "image-preview"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Ai(
              1,
              0,
              null,
              null,
              0,
              "img",
              [["alt", ""]],
              [[8, "src", 4]],
              null,
              null,
              null,
              null
            )),
          ],
          null,
          function (e, t) {
            e(t, 1, 0, t.component.imagePreview);
          }
        );
      }
      function F_(e) {
        return qi(
          0,
          [
            (e()(),
            Ai(
              0,
              0,
              null,
              null,
              1,
              "p",
              [["class", "alert-danger"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), Hi(1, null, ["", ""])),
          ],
          null,
          function (e, t) {
            e(t, 1, 0, t.component.errorMessage);
          }
        );
      }
      function V_(e) {
        return qi(
          0,
          [
            (e()(),
            Ai(
              0,
              0,
              null,
              null,
              42,
              "div",
              [["class", "col-sm-6 offset-sm-3 mt-2"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Ai(
              1,
              0,
              null,
              null,
              41,
              "form",
              [["novalidate", ""]],
              [
                [2, "ng-untouched", null],
                [2, "ng-touched", null],
                [2, "ng-pristine", null],
                [2, "ng-dirty", null],
                [2, "ng-valid", null],
                [2, "ng-invalid", null],
                [2, "ng-pending", null],
              ],
              [
                [null, "submit"],
                [null, "reset"],
              ],
              function (e, t, n) {
                var r = !0;
                return (
                  "submit" === t && (r = !1 !== Dr(e, 3).onSubmit(n) && r),
                  "reset" === t && (r = !1 !== Dr(e, 3).onReset() && r),
                  r
                );
              },
              null,
              null
            )),
            Wr(2, 16384, null, 0, ly, [], null, null),
            Wr(
              3,
              540672,
              null,
              0,
              uy,
              [
                [8, null],
                [8, null],
              ],
              { form: [0, "form"] },
              null
            ),
            Kr(2048, null, Em, null, [uy]),
            Wr(5, 16384, null, 0, Im, [[4, Em]], null, null),
            (e()(),
            Ai(
              6,
              0,
              null,
              null,
              8,
              "div",
              [["class", "form-group"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Ai(
              7,
              0,
              null,
              null,
              1,
              "label",
              [["for", "title"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), Hi(-1, null, ["Titre"])),
            (e()(),
            Ai(
              9,
              0,
              null,
              null,
              5,
              "input",
              [
                ["class", "form-control"],
                ["formControlName", "title"],
                ["id", "title"],
                ["placeholder", "Que vendez-vous ?"],
                ["type", "text"],
              ],
              [
                [2, "ng-untouched", null],
                [2, "ng-touched", null],
                [2, "ng-pristine", null],
                [2, "ng-dirty", null],
                [2, "ng-valid", null],
                [2, "ng-invalid", null],
                [2, "ng-pending", null],
              ],
              [
                [null, "input"],
                [null, "blur"],
                [null, "compositionstart"],
                [null, "compositionend"],
              ],
              function (e, t, n) {
                var r = !0;
                return (
                  "input" === t &&
                    (r = !1 !== Dr(e, 10)._handleInput(n.target.value) && r),
                  "blur" === t && (r = !1 !== Dr(e, 10).onTouched() && r),
                  "compositionstart" === t &&
                    (r = !1 !== Dr(e, 10)._compositionStart() && r),
                  "compositionend" === t &&
                    (r = !1 !== Dr(e, 10)._compositionEnd(n.target.value) && r),
                  r
                );
              },
              null,
              null
            )),
            Wr(10, 16384, null, 0, Cm, [Xt, Wt, [2, wm]], null, null),
            Kr(
              1024,
              null,
              bm,
              function (e) {
                return [e];
              },
              [Cm]
            ),
            Wr(
              12,
              671744,
              null,
              0,
              py,
              [
                [3, Em],
                [8, null],
                [8, null],
                [6, bm],
                [2, ay],
              ],
              { name: [0, "name"] },
              null
            ),
            Kr(2048, null, xm, null, [py]),
            Wr(14, 16384, null, 0, Am, [[4, xm]], null, null),
            (e()(),
            Ai(
              15,
              0,
              null,
              null,
              1,
              "button",
              [
                ["class", "btn btn-success"],
                ["type", "button"],
              ],
              null,
              [[null, "click"]],
              function (e, t, n) {
                var r = !0;
                return "click" === t && (r = !1 !== Dr(e, 17).click() && r), r;
              },
              null,
              null
            )),
            (e()(), Hi(-1, null, ["Ajouter image"])),
            (e()(),
            Ai(
              17,
              0,
              [["filePicker", 1]],
              null,
              0,
              "input",
              [["type", "file"]],
              null,
              [[null, "change"]],
              function (e, t, n) {
                var r = !0;
                return (
                  "change" === t &&
                    (r = !1 !== e.component.onImagePick(n) && r),
                  r
                );
              },
              null,
              null
            )),
            (e()(), ki(16777216, null, null, 1, null, M_)),
            Wr(19, 16384, null, 0, kl, [vn, yn], { ngIf: [0, "ngIf"] }, null),
            (e()(),
            Ai(
              20,
              0,
              null,
              null,
              9,
              "div",
              [["class", "form-group"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Ai(
              21,
              0,
              null,
              null,
              1,
              "label",
              [["for", "price"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), Hi(-1, null, ["Prix (en \u20ac)"])),
            (e()(),
            Ai(
              23,
              0,
              null,
              null,
              6,
              "input",
              [
                ["class", "form-control"],
                ["formControlName", "price"],
                ["id", "price"],
                ["min", "0"],
                ["type", "number"],
              ],
              [
                [2, "ng-untouched", null],
                [2, "ng-touched", null],
                [2, "ng-pristine", null],
                [2, "ng-dirty", null],
                [2, "ng-valid", null],
                [2, "ng-invalid", null],
                [2, "ng-pending", null],
              ],
              [
                [null, "input"],
                [null, "blur"],
                [null, "compositionstart"],
                [null, "compositionend"],
                [null, "change"],
              ],
              function (e, t, n) {
                var r = !0;
                return (
                  "input" === t &&
                    (r = !1 !== Dr(e, 24)._handleInput(n.target.value) && r),
                  "blur" === t && (r = !1 !== Dr(e, 24).onTouched() && r),
                  "compositionstart" === t &&
                    (r = !1 !== Dr(e, 24)._compositionStart() && r),
                  "compositionend" === t &&
                    (r = !1 !== Dr(e, 24)._compositionEnd(n.target.value) && r),
                  "change" === t &&
                    (r = !1 !== Dr(e, 25).onChange(n.target.value) && r),
                  "input" === t &&
                    (r = !1 !== Dr(e, 25).onChange(n.target.value) && r),
                  "blur" === t && (r = !1 !== Dr(e, 25).onTouched() && r),
                  r
                );
              },
              null,
              null
            )),
            Wr(24, 16384, null, 0, Cm, [Xt, Wt, [2, wm]], null, null),
            Wr(25, 16384, null, 0, Lm, [Xt, Wt], null, null),
            Kr(
              1024,
              null,
              bm,
              function (e, t) {
                return [e, t];
              },
              [Cm, Lm]
            ),
            Wr(
              27,
              671744,
              null,
              0,
              py,
              [
                [3, Em],
                [8, null],
                [8, null],
                [6, bm],
                [2, ay],
              ],
              { name: [0, "name"] },
              null
            ),
            Kr(2048, null, xm, null, [py]),
            Wr(29, 16384, null, 0, Am, [[4, xm]], null, null),
            (e()(),
            Ai(
              30,
              0,
              null,
              null,
              8,
              "div",
              [["class", "form-group"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Ai(
              31,
              0,
              null,
              null,
              1,
              "label",
              [["for", "description"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), Hi(-1, null, ["Description"])),
            (e()(),
            Ai(
              33,
              0,
              null,
              null,
              5,
              "textarea",
              [
                ["class", "form-control"],
                ["cols", "30"],
                ["formControlName", "description"],
                ["id", "description"],
                ["name", "description"],
                [
                  "placeholder",
                  "D\xe9crivez votre objet (type, qualit\xe9, etc.)",
                ],
                ["rows", "7"],
              ],
              [
                [2, "ng-untouched", null],
                [2, "ng-touched", null],
                [2, "ng-pristine", null],
                [2, "ng-dirty", null],
                [2, "ng-valid", null],
                [2, "ng-invalid", null],
                [2, "ng-pending", null],
              ],
              [
                [null, "input"],
                [null, "blur"],
                [null, "compositionstart"],
                [null, "compositionend"],
              ],
              function (e, t, n) {
                var r = !0;
                return (
                  "input" === t &&
                    (r = !1 !== Dr(e, 34)._handleInput(n.target.value) && r),
                  "blur" === t && (r = !1 !== Dr(e, 34).onTouched() && r),
                  "compositionstart" === t &&
                    (r = !1 !== Dr(e, 34)._compositionStart() && r),
                  "compositionend" === t &&
                    (r = !1 !== Dr(e, 34)._compositionEnd(n.target.value) && r),
                  r
                );
              },
              null,
              null
            )),
            Wr(34, 16384, null, 0, Cm, [Xt, Wt, [2, wm]], null, null),
            Kr(
              1024,
              null,
              bm,
              function (e) {
                return [e];
              },
              [Cm]
            ),
            Wr(
              36,
              671744,
              null,
              0,
              py,
              [
                [3, Em],
                [8, null],
                [8, null],
                [6, bm],
                [2, ay],
              ],
              { name: [0, "name"] },
              null
            ),
            Kr(2048, null, xm, null, [py]),
            Wr(38, 16384, null, 0, Am, [[4, xm]], null, null),
            (e()(),
            Ai(
              39,
              0,
              null,
              null,
              1,
              "button",
              [["class", "btn btn-primary"]],
              [[8, "disabled", 0]],
              [[null, "click"]],
              function (e, t, n) {
                var r = !0;
                return (
                  "click" === t && (r = !1 !== e.component.onSubmit() && r), r
                );
              },
              null,
              null
            )),
            (e()(), Hi(-1, null, ["Valider"])),
            (e()(), ki(16777216, null, null, 1, null, F_)),
            Wr(42, 16384, null, 0, kl, [vn, yn], { ngIf: [0, "ngIf"] }, null),
          ],
          function (e, t) {
            var n = t.component;
            e(t, 3, 0, n.thingForm),
              e(t, 12, 0, "title"),
              e(t, 19, 0, n.imagePreview),
              e(t, 27, 0, "price"),
              e(t, 36, 0, "description"),
              e(t, 42, 0, n.errorMessage);
          },
          function (e, t) {
            var n = t.component;
            e(
              t,
              1,
              0,
              Dr(t, 5).ngClassUntouched,
              Dr(t, 5).ngClassTouched,
              Dr(t, 5).ngClassPristine,
              Dr(t, 5).ngClassDirty,
              Dr(t, 5).ngClassValid,
              Dr(t, 5).ngClassInvalid,
              Dr(t, 5).ngClassPending
            ),
              e(
                t,
                9,
                0,
                Dr(t, 14).ngClassUntouched,
                Dr(t, 14).ngClassTouched,
                Dr(t, 14).ngClassPristine,
                Dr(t, 14).ngClassDirty,
                Dr(t, 14).ngClassValid,
                Dr(t, 14).ngClassInvalid,
                Dr(t, 14).ngClassPending
              ),
              e(
                t,
                23,
                0,
                Dr(t, 29).ngClassUntouched,
                Dr(t, 29).ngClassTouched,
                Dr(t, 29).ngClassPristine,
                Dr(t, 29).ngClassDirty,
                Dr(t, 29).ngClassValid,
                Dr(t, 29).ngClassInvalid,
                Dr(t, 29).ngClassPending
              ),
              e(
                t,
                33,
                0,
                Dr(t, 38).ngClassUntouched,
                Dr(t, 38).ngClassTouched,
                Dr(t, 38).ngClassPristine,
                Dr(t, 38).ngClassDirty,
                Dr(t, 38).ngClassValid,
                Dr(t, 38).ngClassInvalid,
                Dr(t, 38).ngClassPending
              ),
              e(t, 39, 0, n.thingForm.invalid);
          }
        );
      }
      function L_(e) {
        return qi(
          0,
          [
            (e()(), ki(16777216, null, null, 1, null, O_)),
            Wr(1, 16384, null, 0, kl, [vn, yn], { ngIf: [0, "ngIf"] }, null),
            (e()(), ki(16777216, null, null, 1, null, V_)),
            Wr(3, 16384, null, 0, kl, [vn, yn], { ngIf: [0, "ngIf"] }, null),
          ],
          function (e, t) {
            var n = t.component;
            e(t, 1, 0, n.loading), e(t, 3, 0, !n.loading);
          },
          null
        );
      }
      function U_(e) {
        return qi(
          0,
          [
            (e()(),
            Ai(
              0,
              0,
              null,
              null,
              1,
              "app-modify-thing-with-upload",
              [],
              null,
              null,
              null,
              L_,
              D_
            )),
            Wr(1, 114688, null, 0, R_, [Ud, gy, vy, Zc, od, _p], null, null),
          ],
          function (e, t) {
            e(t, 1, 0);
          },
          null
        );
      }
      var j_ = Cr("app-modify-thing-with-upload", R_, U_, {}, {}, []);
      class $_ {
        constructor(e) {
          this.router = e;
        }
        ngOnInit() {}
        onNavigate(e) {
          this.router.navigate([e]);
        }
      }
      var H_ = Fn({
        encapsulation: 0,
        styles: [
          [
            ".main-pane[_ngcontent-%COMP%]{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}.main-pane[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{color:#333}.part-grid[_ngcontent-%COMP%]{display:flex;justify-content:center}.part[_ngcontent-%COMP%]{transition:all .3s ease-in-out;position:relative;height:200px;width:200px;margin:5px;background:#333;cursor:pointer}.part[_ngcontent-%COMP%]:hover{transform:scale(1.05)}.part[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{color:#fff;position:absolute;width:100%;top:50%;text-align:center;transform:translateY(-50%)}",
          ],
        ],
        data: {},
      });
      function B_(e) {
        return qi(
          0,
          [
            (e()(),
            Ai(
              0,
              0,
              null,
              null,
              12,
              "div",
              [["class", "main-pane"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Ai(
              1,
              0,
              null,
              null,
              1,
              "h1",
              [["class", "text-center"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), Hi(-1, null, ["Appli front-end - Passez au Full-Stack"])),
            (e()(),
            Ai(
              3,
              0,
              null,
              null,
              9,
              "div",
              [["class", "part-grid"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Ai(
              4,
              0,
              null,
              null,
              2,
              "div",
              [["class", "part"]],
              null,
              [[null, "click"]],
              function (e, t, n) {
                var r = !0;
                return (
                  "click" === t &&
                    (r = !1 !== e.component.onNavigate("part-one") && r),
                  r
                );
              },
              null,
              null
            )),
            (e()(),
            Ai(5, 0, null, null, 1, "h1", [], null, null, null, null, null)),
            (e()(), Hi(-1, null, ["Parties 1+2"])),
            (e()(),
            Ai(
              7,
              0,
              null,
              null,
              2,
              "div",
              [["class", "part"]],
              null,
              [[null, "click"]],
              function (e, t, n) {
                var r = !0;
                return (
                  "click" === t &&
                    (r = !1 !== e.component.onNavigate("part-three") && r),
                  r
                );
              },
              null,
              null
            )),
            (e()(),
            Ai(8, 0, null, null, 1, "h1", [], null, null, null, null, null)),
            (e()(), Hi(-1, null, ["Partie 3"])),
            (e()(),
            Ai(
              10,
              0,
              null,
              null,
              2,
              "div",
              [["class", "part"]],
              null,
              [[null, "click"]],
              function (e, t, n) {
                var r = !0;
                return (
                  "click" === t &&
                    (r = !1 !== e.component.onNavigate("part-four") && r),
                  r
                );
              },
              null,
              null
            )),
            (e()(),
            Ai(11, 0, null, null, 1, "h1", [], null, null, null, null, null)),
            (e()(), Hi(-1, null, ["Partie 4"])),
          ],
          null,
          null
        );
      }
      function z_(e) {
        return qi(
          0,
          [
            (e()(),
            Ai(
              0,
              0,
              null,
              null,
              1,
              "app-default",
              [],
              null,
              null,
              null,
              B_,
              H_
            )),
            Wr(1, 114688, null, 0, $_, [od], null, null),
          ],
          function (e, t) {
            e(t, 1, 0);
          },
          null
        );
      }
      var q_ = Cr("app-default", $_, z_, {}, {}, []),
        W_ = Fn({ encapsulation: 0, styles: [[""]], data: {} });
      function G_(e) {
        return qi(
          0,
          [
            (e()(),
            Ai(
              0,
              16777216,
              null,
              null,
              1,
              "router-outlet",
              [],
              null,
              null,
              null,
              null,
              null
            )),
            Wr(1, 212992, null, 0, pd, [dd, vn, Ht, [8, null], gt], null, null),
          ],
          function (e, t) {
            e(t, 1, 0);
          },
          null
        );
      }
      function K_(e) {
        return qi(
          0,
          [
            (e()(),
            Ai(0, 0, null, null, 1, "app-root", [], null, null, null, G_, W_)),
            Wr(1, 49152, null, 0, el, [], null, null),
          ],
          null,
          null
        );
      }
      var Q_ = Cr("app-root", el, K_, {}, {}, []);
      class Z_ {
        constructor(e, t, n) {
          (this.auth = e), (this.state = t), (this.router = n);
        }
        canActivate(e, t) {
          return b.create((e) => {
            this.auth.isAuth$.subscribe((t) => {
              t ||
                this.state.part$.subscribe((e) => {
                  3 === e
                    ? this.router.navigate(["/part-three/auth/login"])
                    : 4 === e &&
                      this.router.navigate(["/part-four/auth/login"]);
                }),
                e.next(!0);
            });
          });
        }
      }
      class X_ {
        constructor(e) {
          this.auth = e;
        }
        intercept(e, t) {
          const n = e.clone({
            headers: e.headers.set(
              "Authorization",
              "Bearer " + this.auth.token
            ),
          });
          return t.handle(n);
        }
      }
      class J_ {}
      var Y_ = Xo(Yo, [el], function (e) {
        return (function (e) {
          const t = {},
            n = [];
          let r = !1;
          for (let s = 0; s < e.length; s++) {
            const i = e[s];
            i.token === yt && !0 === i.value && (r = !0),
              1073741824 & i.flags && n.push(i.token),
              (i.index = s),
              (t[On(i.token)] = i);
          }
          return {
            factory: null,
            providersByKey: t,
            providers: e,
            modules: n,
            isRoot: r,
          };
        })([
          gr(512, Ht, Bt, [
            [8, [Ld, Rp, ky, Fy, By, Xy, n_, u_, m_, w_, N_, j_, q_, Q_]],
            [3, Ht],
            Ie,
          ]),
          gr(5120, ks, Ei, [[3, ks]]),
          gr(4608, yl, _l, [ks, [2, ml]]),
          gr(5120, us, Ti, [zs]),
          gr(5120, bs, ws, []),
          gr(5120, dn, Ci, []),
          gr(5120, pn, Si, []),
          gr(4608, Du, Ou, [Ul]),
          gr(6144, ct, null, [Du]),
          gr(4608, xu, Au, []),
          gr(
            5120,
            tu,
            function (e, t, n, r, s, i, o, l) {
              return [new Eu(e, t, n), new Ru(r), new Iu(s, i, o, l)];
            },
            [Ul, zs, Es, Ul, Ul, xu, xs, [2, ku]]
          ),
          gr(4608, nu, nu, [tu, zs]),
          gr(135680, iu, iu, [Ul]),
          gr(4608, cu, cu, [nu, iu, bs]),
          gr(5120, Cf, cm, []),
          gr(5120, hg, hm, []),
          gr(4608, Lg, um, [Ul, Cf, hg]),
          gr(5120, Qt, dm, [cu, Lg, zs]),
          gr(6144, su, null, [iu]),
          gr(4608, Xs, Xs, [zs]),
          gr(5120, Zc, Pd, [od]),
          gr(4608, yd, yd, []),
          gr(6144, gd, null, [yd]),
          gr(135680, _d, _d, [od, ci, Ds, vt, gd]),
          gr(4608, md, md, []),
          gr(5120, vd, Td, [od, jl, bd]),
          gr(5120, Od, Dd, [Nd]),
          gr(
            5120,
            Ts,
            function (e) {
              return [e];
            },
            [Od]
          ),
          gr(4608, Z_, Z_, [_p, Ud, od]),
          gr(4608, Um, Um, []),
          gr(4608, gy, gy, []),
          gr(4608, Qp, nm, [Qt, Ul]),
          gr(4608, dp, pp, [Ul, Es, cp]),
          gr(4608, fp, fp, [dp, hp]),
          gr(
            5120,
            sp,
            function (e, t) {
              return [e, new X_(t)];
            },
            [fp, _p]
          ),
          gr(4608, ap, ap, []),
          gr(6144, lp, null, [ap]),
          gr(4608, up, up, [lp]),
          gr(6144, $d, null, [up]),
          gr(4608, jd, gp, [$d, vt]),
          gr(4608, np, np, [jd]),
          gr(1073742336, Ll, Ll, []),
          gr(1024, Le, Hu, []),
          gr(
            1024,
            ri,
            function () {
              return [Sd()];
            },
            []
          ),
          gr(512, Nd, Nd, [vt]),
          gr(
            1024,
            _s,
            function (e, t) {
              return [
                ((n = e),
                Ja("probe", eu),
                Ja(
                  "coreTokens",
                  Object.assign(
                    {},
                    Ya,
                    (n || []).reduce((e, t) => ((e[t.name] = t.token), e), {})
                  )
                ),
                () => eu),
                Rd(t),
              ];
              var n;
            },
            [[2, ri], Nd]
          ),
          gr(512, vs, vs, [[2, _s]]),
          gr(131584, ai, ai, [zs, xs, vt, Le, Ht, vs]),
          gr(1073742336, xi, xi, [ai]),
          gr(1073742336, Bu, Bu, [[3, Bu]]),
          gr(1024, wd, kd, [[3, od]]),
          gr(512, Ac, Ic, []),
          gr(512, dd, dd, []),
          gr(256, bd, {}, []),
          gr(1024, rl, xd, [tl, [2, sl], bd]),
          gr(512, il, il, [rl, tl]),
          gr(512, Ds, Ds, []),
          gr(512, ci, pi, [Ds, [2, hi]]),
          gr(
            1024,
            Yh,
            function () {
              return [
                [
                  {
                    path: "part-one",
                    component: Ap,
                    children: [
                      { path: "new-thing", component: by },
                      { path: "all-stuff", component: Ay },
                      { path: "thing/:id", component: Vy },
                      { path: "modify-thing/:id", component: zy },
                      { path: "", pathMatch: "full", redirectTo: "all-stuff" },
                      { path: "**", redirectTo: "all-stuff" },
                    ],
                  },
                  {
                    path: "part-three",
                    component: Jy,
                    children: [
                      { path: "new-thing", component: by, canActivate: [Z_] },
                      { path: "all-stuff", component: Ay, canActivate: [Z_] },
                      { path: "thing/:id", component: Vy, canActivate: [Z_] },
                      {
                        path: "modify-thing/:id",
                        component: zy,
                        canActivate: [Z_],
                      },
                      { path: "auth/login", component: r_ },
                      { path: "auth/signup", component: c_ },
                      { path: "", pathMatch: "full", redirectTo: "auth/login" },
                      { path: "**", redirectTo: "all-stuff" },
                    ],
                  },
                  {
                    path: "part-four",
                    component: y_,
                    children: [
                      { path: "new-thing", component: S_, canActivate: [Z_] },
                      { path: "all-stuff", component: Ay, canActivate: [Z_] },
                      { path: "thing/:id", component: Vy, canActivate: [Z_] },
                      {
                        path: "modify-thing/:id",
                        component: R_,
                        canActivate: [Z_],
                      },
                      { path: "auth/login", component: r_ },
                      { path: "auth/signup", component: c_ },
                      { path: "", pathMatch: "full", redirectTo: "auth/login" },
                      { path: "**", redirectTo: "all-stuff" },
                    ],
                  },
                  { path: "default", component: $_ },
                  { path: "", pathMatch: "full", component: $_ },
                  { path: "**", redirectTo: "" },
                ],
              ];
            },
            []
          ),
          gr(1024, od, Id, [
            ai,
            Ac,
            dd,
            il,
            vt,
            ci,
            Ds,
            Yh,
            bd,
            [2, td],
            [2, Xh],
          ]),
          gr(1073742336, Ed, Ed, [
            [2, wd],
            [2, od],
          ]),
          gr(1073742336, J_, J_, []),
          gr(1073742336, fy, fy, []),
          gr(1073742336, my, my, []),
          gr(1073742336, yy, yy, []),
          gr(1073742336, fm, fm, []),
          gr(1073742336, Kp, Kp, []),
          gr(1073742336, Up, Up, [
            [2, Lp],
            [2, ku],
          ]),
          gr(1073742336, Gp, Gp, []),
          gr(1073742336, mp, mp, []),
          gr(1073742336, yp, yp, []),
          gr(1073742336, Yo, Yo, []),
          gr(256, yt, !0, []),
          gr(256, pm, "BrowserAnimations", []),
          gr(256, cp, "XSRF-TOKEN", []),
          gr(256, hp, "X-XSRF-TOKEN", []),
        ]);
      });
      (function () {
        if (je)
          throw new Error("Cannot enable prod mode after platform setup.");
        Ue = !1;
      })(),
        $u()
          .bootstrapModuleFactory(Y_)
          .catch((e) => console.log(e));
    },
  },
  [[0, 0]],
]);
