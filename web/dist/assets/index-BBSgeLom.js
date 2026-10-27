function Jx(s,e){for(var t=0;t<e.length;t++){const i=e[t];if(typeof i!="string"&&!Array.isArray(i)){for(const o in i)if(o!=="default"&&!(o in s)){const l=Object.getOwnPropertyDescriptor(i,o);l&&Object.defineProperty(s,o,l.get?l:{enumerable:!0,get:()=>i[o]})}}}return Object.freeze(Object.defineProperty(s,Symbol.toStringTag,{value:"Module"}))}(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const l of o)if(l.type==="childList")for(const d of l.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&i(d)}).observe(document,{childList:!0,subtree:!0});function t(o){const l={};return o.integrity&&(l.integrity=o.integrity),o.referrerPolicy&&(l.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?l.credentials="include":o.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function i(o){if(o.ep)return;o.ep=!0;const l=t(o);fetch(o.href,l)}})();function Zx(s){return s&&s.__esModule&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s}var id={exports:{}},Jo={},rd={exports:{}},St={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Zp;function Qx(){if(Zp)return St;Zp=1;var s=Symbol.for("react.element"),e=Symbol.for("react.portal"),t=Symbol.for("react.fragment"),i=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),l=Symbol.for("react.provider"),d=Symbol.for("react.context"),c=Symbol.for("react.forward_ref"),f=Symbol.for("react.suspense"),h=Symbol.for("react.memo"),p=Symbol.for("react.lazy"),g=Symbol.iterator;function y(O){return O===null||typeof O!="object"?null:(O=g&&O[g]||O["@@iterator"],typeof O=="function"?O:null)}var S={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},E=Object.assign,M={};function x(O,F,j){this.props=O,this.context=F,this.refs=M,this.updater=j||S}x.prototype.isReactComponent={},x.prototype.setState=function(O,F){if(typeof O!="object"&&typeof O!="function"&&O!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,O,F,"setState")},x.prototype.forceUpdate=function(O){this.updater.enqueueForceUpdate(this,O,"forceUpdate")};function v(){}v.prototype=x.prototype;function b(O,F,j){this.props=O,this.context=F,this.refs=M,this.updater=j||S}var A=b.prototype=new v;A.constructor=b,E(A,x.prototype),A.isPureReactComponent=!0;var P=Array.isArray,z=Object.prototype.hasOwnProperty,D={current:null},I={key:!0,ref:!0,__self:!0,__source:!0};function ne(O,F,j){var ce,me={},ye=null,Se=null;if(F!=null)for(ce in F.ref!==void 0&&(Se=F.ref),F.key!==void 0&&(ye=""+F.key),F)z.call(F,ce)&&!I.hasOwnProperty(ce)&&(me[ce]=F[ce]);var Fe=arguments.length-2;if(Fe===1)me.children=j;else if(1<Fe){for(var ve=Array(Fe),Ae=0;Ae<Fe;Ae++)ve[Ae]=arguments[Ae+2];me.children=ve}if(O&&O.defaultProps)for(ce in Fe=O.defaultProps,Fe)me[ce]===void 0&&(me[ce]=Fe[ce]);return{$$typeof:s,type:O,key:ye,ref:Se,props:me,_owner:D.current}}function R(O,F){return{$$typeof:s,type:O.type,key:F,ref:O.ref,props:O.props,_owner:O._owner}}function U(O){return typeof O=="object"&&O!==null&&O.$$typeof===s}function se(O){var F={"=":"=0",":":"=2"};return"$"+O.replace(/[=:]/g,function(j){return F[j]})}var le=/\/+/g;function ge(O,F){return typeof O=="object"&&O!==null&&O.key!=null?se(""+O.key):F.toString(36)}function V(O,F,j,ce,me){var ye=typeof O;(ye==="undefined"||ye==="boolean")&&(O=null);var Se=!1;if(O===null)Se=!0;else switch(ye){case"string":case"number":Se=!0;break;case"object":switch(O.$$typeof){case s:case e:Se=!0}}if(Se)return Se=O,me=me(Se),O=ce===""?"."+ge(Se,0):ce,P(me)?(j="",O!=null&&(j=O.replace(le,"$&/")+"/"),V(me,F,j,"",function(Ae){return Ae})):me!=null&&(U(me)&&(me=R(me,j+(!me.key||Se&&Se.key===me.key?"":(""+me.key).replace(le,"$&/")+"/")+O)),F.push(me)),1;if(Se=0,ce=ce===""?".":ce+":",P(O))for(var Fe=0;Fe<O.length;Fe++){ye=O[Fe];var ve=ce+ge(ye,Fe);Se+=V(ye,F,j,ve,me)}else if(ve=y(O),typeof ve=="function")for(O=ve.call(O),Fe=0;!(ye=O.next()).done;)ye=ye.value,ve=ce+ge(ye,Fe++),Se+=V(ye,F,j,ve,me);else if(ye==="object")throw F=String(O),Error("Objects are not valid as a React child (found: "+(F==="[object Object]"?"object with keys {"+Object.keys(O).join(", ")+"}":F)+"). If you meant to render a collection of children, use an array instead.");return Se}function J(O,F,j){if(O==null)return O;var ce=[],me=0;return V(O,ce,"","",function(ye){return F.call(j,ye,me++)}),ce}function te(O){if(O._status===-1){var F=O._result;F=F(),F.then(function(j){(O._status===0||O._status===-1)&&(O._status=1,O._result=j)},function(j){(O._status===0||O._status===-1)&&(O._status=2,O._result=j)}),O._status===-1&&(O._status=0,O._result=F)}if(O._status===1)return O._result.default;throw O._result}var q={current:null},X={transition:null},K={ReactCurrentDispatcher:q,ReactCurrentBatchConfig:X,ReactCurrentOwner:D};function Y(){throw Error("act(...) is not supported in production builds of React.")}return St.Children={map:J,forEach:function(O,F,j){J(O,function(){F.apply(this,arguments)},j)},count:function(O){var F=0;return J(O,function(){F++}),F},toArray:function(O){return J(O,function(F){return F})||[]},only:function(O){if(!U(O))throw Error("React.Children.only expected to receive a single React element child.");return O}},St.Component=x,St.Fragment=t,St.Profiler=o,St.PureComponent=b,St.StrictMode=i,St.Suspense=f,St.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=K,St.act=Y,St.cloneElement=function(O,F,j){if(O==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+O+".");var ce=E({},O.props),me=O.key,ye=O.ref,Se=O._owner;if(F!=null){if(F.ref!==void 0&&(ye=F.ref,Se=D.current),F.key!==void 0&&(me=""+F.key),O.type&&O.type.defaultProps)var Fe=O.type.defaultProps;for(ve in F)z.call(F,ve)&&!I.hasOwnProperty(ve)&&(ce[ve]=F[ve]===void 0&&Fe!==void 0?Fe[ve]:F[ve])}var ve=arguments.length-2;if(ve===1)ce.children=j;else if(1<ve){Fe=Array(ve);for(var Ae=0;Ae<ve;Ae++)Fe[Ae]=arguments[Ae+2];ce.children=Fe}return{$$typeof:s,type:O.type,key:me,ref:ye,props:ce,_owner:Se}},St.createContext=function(O){return O={$$typeof:d,_currentValue:O,_currentValue2:O,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},O.Provider={$$typeof:l,_context:O},O.Consumer=O},St.createElement=ne,St.createFactory=function(O){var F=ne.bind(null,O);return F.type=O,F},St.createRef=function(){return{current:null}},St.forwardRef=function(O){return{$$typeof:c,render:O}},St.isValidElement=U,St.lazy=function(O){return{$$typeof:p,_payload:{_status:-1,_result:O},_init:te}},St.memo=function(O,F){return{$$typeof:h,type:O,compare:F===void 0?null:F}},St.startTransition=function(O){var F=X.transition;X.transition={};try{O()}finally{X.transition=F}},St.unstable_act=Y,St.useCallback=function(O,F){return q.current.useCallback(O,F)},St.useContext=function(O){return q.current.useContext(O)},St.useDebugValue=function(){},St.useDeferredValue=function(O){return q.current.useDeferredValue(O)},St.useEffect=function(O,F){return q.current.useEffect(O,F)},St.useId=function(){return q.current.useId()},St.useImperativeHandle=function(O,F,j){return q.current.useImperativeHandle(O,F,j)},St.useInsertionEffect=function(O,F){return q.current.useInsertionEffect(O,F)},St.useLayoutEffect=function(O,F){return q.current.useLayoutEffect(O,F)},St.useMemo=function(O,F){return q.current.useMemo(O,F)},St.useReducer=function(O,F,j){return q.current.useReducer(O,F,j)},St.useRef=function(O){return q.current.useRef(O)},St.useState=function(O){return q.current.useState(O)},St.useSyncExternalStore=function(O,F,j){return q.current.useSyncExternalStore(O,F,j)},St.useTransition=function(){return q.current.useTransition()},St.version="18.3.1",St}var Qp;function df(){return Qp||(Qp=1,rd.exports=Qx()),rd.exports}/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var em;function e_(){if(em)return Jo;em=1;var s=df(),e=Symbol.for("react.element"),t=Symbol.for("react.fragment"),i=Object.prototype.hasOwnProperty,o=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function d(c,f,h){var p,g={},y=null,S=null;h!==void 0&&(y=""+h),f.key!==void 0&&(y=""+f.key),f.ref!==void 0&&(S=f.ref);for(p in f)i.call(f,p)&&!l.hasOwnProperty(p)&&(g[p]=f[p]);if(c&&c.defaultProps)for(p in f=c.defaultProps,f)g[p]===void 0&&(g[p]=f[p]);return{$$typeof:e,type:c,key:y,ref:S,props:g,_owner:o.current}}return Jo.Fragment=t,Jo.jsx=d,Jo.jsxs=d,Jo}var tm;function t_(){return tm||(tm=1,id.exports=e_()),id.exports}var w=t_(),ie=df();const n_=Zx(ie),i_=Jx({__proto__:null,default:n_},[ie]);var Ml={},sd={exports:{}},Fn={},od={exports:{}},ad={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var nm;function r_(){return nm||(nm=1,function(s){function e(X,K){var Y=X.length;X.push(K);e:for(;0<Y;){var O=Y-1>>>1,F=X[O];if(0<o(F,K))X[O]=K,X[Y]=F,Y=O;else break e}}function t(X){return X.length===0?null:X[0]}function i(X){if(X.length===0)return null;var K=X[0],Y=X.pop();if(Y!==K){X[0]=Y;e:for(var O=0,F=X.length,j=F>>>1;O<j;){var ce=2*(O+1)-1,me=X[ce],ye=ce+1,Se=X[ye];if(0>o(me,Y))ye<F&&0>o(Se,me)?(X[O]=Se,X[ye]=Y,O=ye):(X[O]=me,X[ce]=Y,O=ce);else if(ye<F&&0>o(Se,Y))X[O]=Se,X[ye]=Y,O=ye;else break e}}return K}function o(X,K){var Y=X.sortIndex-K.sortIndex;return Y!==0?Y:X.id-K.id}if(typeof performance=="object"&&typeof performance.now=="function"){var l=performance;s.unstable_now=function(){return l.now()}}else{var d=Date,c=d.now();s.unstable_now=function(){return d.now()-c}}var f=[],h=[],p=1,g=null,y=3,S=!1,E=!1,M=!1,x=typeof setTimeout=="function"?setTimeout:null,v=typeof clearTimeout=="function"?clearTimeout:null,b=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function A(X){for(var K=t(h);K!==null;){if(K.callback===null)i(h);else if(K.startTime<=X)i(h),K.sortIndex=K.expirationTime,e(f,K);else break;K=t(h)}}function P(X){if(M=!1,A(X),!E)if(t(f)!==null)E=!0,te(z);else{var K=t(h);K!==null&&q(P,K.startTime-X)}}function z(X,K){E=!1,M&&(M=!1,v(ne),ne=-1),S=!0;var Y=y;try{for(A(K),g=t(f);g!==null&&(!(g.expirationTime>K)||X&&!se());){var O=g.callback;if(typeof O=="function"){g.callback=null,y=g.priorityLevel;var F=O(g.expirationTime<=K);K=s.unstable_now(),typeof F=="function"?g.callback=F:g===t(f)&&i(f),A(K)}else i(f);g=t(f)}if(g!==null)var j=!0;else{var ce=t(h);ce!==null&&q(P,ce.startTime-K),j=!1}return j}finally{g=null,y=Y,S=!1}}var D=!1,I=null,ne=-1,R=5,U=-1;function se(){return!(s.unstable_now()-U<R)}function le(){if(I!==null){var X=s.unstable_now();U=X;var K=!0;try{K=I(!0,X)}finally{K?ge():(D=!1,I=null)}}else D=!1}var ge;if(typeof b=="function")ge=function(){b(le)};else if(typeof MessageChannel<"u"){var V=new MessageChannel,J=V.port2;V.port1.onmessage=le,ge=function(){J.postMessage(null)}}else ge=function(){x(le,0)};function te(X){I=X,D||(D=!0,ge())}function q(X,K){ne=x(function(){X(s.unstable_now())},K)}s.unstable_IdlePriority=5,s.unstable_ImmediatePriority=1,s.unstable_LowPriority=4,s.unstable_NormalPriority=3,s.unstable_Profiling=null,s.unstable_UserBlockingPriority=2,s.unstable_cancelCallback=function(X){X.callback=null},s.unstable_continueExecution=function(){E||S||(E=!0,te(z))},s.unstable_forceFrameRate=function(X){0>X||125<X?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):R=0<X?Math.floor(1e3/X):5},s.unstable_getCurrentPriorityLevel=function(){return y},s.unstable_getFirstCallbackNode=function(){return t(f)},s.unstable_next=function(X){switch(y){case 1:case 2:case 3:var K=3;break;default:K=y}var Y=y;y=K;try{return X()}finally{y=Y}},s.unstable_pauseExecution=function(){},s.unstable_requestPaint=function(){},s.unstable_runWithPriority=function(X,K){switch(X){case 1:case 2:case 3:case 4:case 5:break;default:X=3}var Y=y;y=X;try{return K()}finally{y=Y}},s.unstable_scheduleCallback=function(X,K,Y){var O=s.unstable_now();switch(typeof Y=="object"&&Y!==null?(Y=Y.delay,Y=typeof Y=="number"&&0<Y?O+Y:O):Y=O,X){case 1:var F=-1;break;case 2:F=250;break;case 5:F=1073741823;break;case 4:F=1e4;break;default:F=5e3}return F=Y+F,X={id:p++,callback:K,priorityLevel:X,startTime:Y,expirationTime:F,sortIndex:-1},Y>O?(X.sortIndex=Y,e(h,X),t(f)===null&&X===t(h)&&(M?(v(ne),ne=-1):M=!0,q(P,Y-O))):(X.sortIndex=F,e(f,X),E||S||(E=!0,te(z))),X},s.unstable_shouldYield=se,s.unstable_wrapCallback=function(X){var K=y;return function(){var Y=y;y=K;try{return X.apply(this,arguments)}finally{y=Y}}}}(ad)),ad}var im;function s_(){return im||(im=1,od.exports=r_()),od.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var rm;function o_(){if(rm)return Fn;rm=1;var s=df(),e=s_();function t(n){for(var r="https://reactjs.org/docs/error-decoder.html?invariant="+n,a=1;a<arguments.length;a++)r+="&args[]="+encodeURIComponent(arguments[a]);return"Minified React error #"+n+"; visit "+r+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var i=new Set,o={};function l(n,r){d(n,r),d(n+"Capture",r)}function d(n,r){for(o[n]=r,n=0;n<r.length;n++)i.add(r[n])}var c=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),f=Object.prototype.hasOwnProperty,h=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,p={},g={};function y(n){return f.call(g,n)?!0:f.call(p,n)?!1:h.test(n)?g[n]=!0:(p[n]=!0,!1)}function S(n,r,a,u){if(a!==null&&a.type===0)return!1;switch(typeof r){case"function":case"symbol":return!0;case"boolean":return u?!1:a!==null?!a.acceptsBooleans:(n=n.toLowerCase().slice(0,5),n!=="data-"&&n!=="aria-");default:return!1}}function E(n,r,a,u){if(r===null||typeof r>"u"||S(n,r,a,u))return!0;if(u)return!1;if(a!==null)switch(a.type){case 3:return!r;case 4:return r===!1;case 5:return isNaN(r);case 6:return isNaN(r)||1>r}return!1}function M(n,r,a,u,m,_,T){this.acceptsBooleans=r===2||r===3||r===4,this.attributeName=u,this.attributeNamespace=m,this.mustUseProperty=a,this.propertyName=n,this.type=r,this.sanitizeURL=_,this.removeEmptyString=T}var x={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n){x[n]=new M(n,0,!1,n,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(n){var r=n[0];x[r]=new M(r,1,!1,n[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(n){x[n]=new M(n,2,!1,n.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(n){x[n]=new M(n,2,!1,n,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n){x[n]=new M(n,3,!1,n.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(n){x[n]=new M(n,3,!0,n,null,!1,!1)}),["capture","download"].forEach(function(n){x[n]=new M(n,4,!1,n,null,!1,!1)}),["cols","rows","size","span"].forEach(function(n){x[n]=new M(n,6,!1,n,null,!1,!1)}),["rowSpan","start"].forEach(function(n){x[n]=new M(n,5,!1,n.toLowerCase(),null,!1,!1)});var v=/[\-:]([a-z])/g;function b(n){return n[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n){var r=n.replace(v,b);x[r]=new M(r,1,!1,n,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n){var r=n.replace(v,b);x[r]=new M(r,1,!1,n,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(n){var r=n.replace(v,b);x[r]=new M(r,1,!1,n,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(n){x[n]=new M(n,1,!1,n.toLowerCase(),null,!1,!1)}),x.xlinkHref=new M("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(n){x[n]=new M(n,1,!1,n.toLowerCase(),null,!0,!0)});function A(n,r,a,u){var m=x.hasOwnProperty(r)?x[r]:null;(m!==null?m.type!==0:u||!(2<r.length)||r[0]!=="o"&&r[0]!=="O"||r[1]!=="n"&&r[1]!=="N")&&(E(r,a,m,u)&&(a=null),u||m===null?y(r)&&(a===null?n.removeAttribute(r):n.setAttribute(r,""+a)):m.mustUseProperty?n[m.propertyName]=a===null?m.type===3?!1:"":a:(r=m.attributeName,u=m.attributeNamespace,a===null?n.removeAttribute(r):(m=m.type,a=m===3||m===4&&a===!0?"":""+a,u?n.setAttributeNS(u,r,a):n.setAttribute(r,a))))}var P=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,z=Symbol.for("react.element"),D=Symbol.for("react.portal"),I=Symbol.for("react.fragment"),ne=Symbol.for("react.strict_mode"),R=Symbol.for("react.profiler"),U=Symbol.for("react.provider"),se=Symbol.for("react.context"),le=Symbol.for("react.forward_ref"),ge=Symbol.for("react.suspense"),V=Symbol.for("react.suspense_list"),J=Symbol.for("react.memo"),te=Symbol.for("react.lazy"),q=Symbol.for("react.offscreen"),X=Symbol.iterator;function K(n){return n===null||typeof n!="object"?null:(n=X&&n[X]||n["@@iterator"],typeof n=="function"?n:null)}var Y=Object.assign,O;function F(n){if(O===void 0)try{throw Error()}catch(a){var r=a.stack.trim().match(/\n( *(at )?)/);O=r&&r[1]||""}return`
`+O+n}var j=!1;function ce(n,r){if(!n||j)return"";j=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(r)if(r=function(){throw Error()},Object.defineProperty(r.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(r,[])}catch(ue){var u=ue}Reflect.construct(n,[],r)}else{try{r.call()}catch(ue){u=ue}n.call(r.prototype)}else{try{throw Error()}catch(ue){u=ue}n()}}catch(ue){if(ue&&u&&typeof ue.stack=="string"){for(var m=ue.stack.split(`
`),_=u.stack.split(`
`),T=m.length-1,k=_.length-1;1<=T&&0<=k&&m[T]!==_[k];)k--;for(;1<=T&&0<=k;T--,k--)if(m[T]!==_[k]){if(T!==1||k!==1)do if(T--,k--,0>k||m[T]!==_[k]){var W=`
`+m[T].replace(" at new "," at ");return n.displayName&&W.includes("<anonymous>")&&(W=W.replace("<anonymous>",n.displayName)),W}while(1<=T&&0<=k);break}}}finally{j=!1,Error.prepareStackTrace=a}return(n=n?n.displayName||n.name:"")?F(n):""}function me(n){switch(n.tag){case 5:return F(n.type);case 16:return F("Lazy");case 13:return F("Suspense");case 19:return F("SuspenseList");case 0:case 2:case 15:return n=ce(n.type,!1),n;case 11:return n=ce(n.type.render,!1),n;case 1:return n=ce(n.type,!0),n;default:return""}}function ye(n){if(n==null)return null;if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n;switch(n){case I:return"Fragment";case D:return"Portal";case R:return"Profiler";case ne:return"StrictMode";case ge:return"Suspense";case V:return"SuspenseList"}if(typeof n=="object")switch(n.$$typeof){case se:return(n.displayName||"Context")+".Consumer";case U:return(n._context.displayName||"Context")+".Provider";case le:var r=n.render;return n=n.displayName,n||(n=r.displayName||r.name||"",n=n!==""?"ForwardRef("+n+")":"ForwardRef"),n;case J:return r=n.displayName||null,r!==null?r:ye(n.type)||"Memo";case te:r=n._payload,n=n._init;try{return ye(n(r))}catch{}}return null}function Se(n){var r=n.type;switch(n.tag){case 24:return"Cache";case 9:return(r.displayName||"Context")+".Consumer";case 10:return(r._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return n=r.render,n=n.displayName||n.name||"",r.displayName||(n!==""?"ForwardRef("+n+")":"ForwardRef");case 7:return"Fragment";case 5:return r;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return ye(r);case 8:return r===ne?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof r=="function")return r.displayName||r.name||null;if(typeof r=="string")return r}return null}function Fe(n){switch(typeof n){case"boolean":case"number":case"string":case"undefined":return n;case"object":return n;default:return""}}function ve(n){var r=n.type;return(n=n.nodeName)&&n.toLowerCase()==="input"&&(r==="checkbox"||r==="radio")}function Ae(n){var r=ve(n)?"checked":"value",a=Object.getOwnPropertyDescriptor(n.constructor.prototype,r),u=""+n[r];if(!n.hasOwnProperty(r)&&typeof a<"u"&&typeof a.get=="function"&&typeof a.set=="function"){var m=a.get,_=a.set;return Object.defineProperty(n,r,{configurable:!0,get:function(){return m.call(this)},set:function(T){u=""+T,_.call(this,T)}}),Object.defineProperty(n,r,{enumerable:a.enumerable}),{getValue:function(){return u},setValue:function(T){u=""+T},stopTracking:function(){n._valueTracker=null,delete n[r]}}}}function ze(n){n._valueTracker||(n._valueTracker=Ae(n))}function Q(n){if(!n)return!1;var r=n._valueTracker;if(!r)return!0;var a=r.getValue(),u="";return n&&(u=ve(n)?n.checked?"true":"false":n.value),n=u,n!==a?(r.setValue(n),!0):!1}function nt(n){if(n=n||(typeof document<"u"?document:void 0),typeof n>"u")return null;try{return n.activeElement||n.body}catch{return n.body}}function ke(n,r){var a=r.checked;return Y({},r,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:a??n._wrapperState.initialChecked})}function Qe(n,r){var a=r.defaultValue==null?"":r.defaultValue,u=r.checked!=null?r.checked:r.defaultChecked;a=Fe(r.value!=null?r.value:a),n._wrapperState={initialChecked:u,initialValue:a,controlled:r.type==="checkbox"||r.type==="radio"?r.checked!=null:r.value!=null}}function Ve(n,r){r=r.checked,r!=null&&A(n,"checked",r,!1)}function wt(n,r){Ve(n,r);var a=Fe(r.value),u=r.type;if(a!=null)u==="number"?(a===0&&n.value===""||n.value!=a)&&(n.value=""+a):n.value!==""+a&&(n.value=""+a);else if(u==="submit"||u==="reset"){n.removeAttribute("value");return}r.hasOwnProperty("value")?L(n,r.type,a):r.hasOwnProperty("defaultValue")&&L(n,r.type,Fe(r.defaultValue)),r.checked==null&&r.defaultChecked!=null&&(n.defaultChecked=!!r.defaultChecked)}function ot(n,r,a){if(r.hasOwnProperty("value")||r.hasOwnProperty("defaultValue")){var u=r.type;if(!(u!=="submit"&&u!=="reset"||r.value!==void 0&&r.value!==null))return;r=""+n._wrapperState.initialValue,a||r===n.value||(n.value=r),n.defaultValue=r}a=n.name,a!==""&&(n.name=""),n.defaultChecked=!!n._wrapperState.initialChecked,a!==""&&(n.name=a)}function L(n,r,a){(r!=="number"||nt(n.ownerDocument)!==n)&&(a==null?n.defaultValue=""+n._wrapperState.initialValue:n.defaultValue!==""+a&&(n.defaultValue=""+a))}var C=Array.isArray;function oe(n,r,a,u){if(n=n.options,r){r={};for(var m=0;m<a.length;m++)r["$"+a[m]]=!0;for(a=0;a<n.length;a++)m=r.hasOwnProperty("$"+n[a].value),n[a].selected!==m&&(n[a].selected=m),m&&u&&(n[a].defaultSelected=!0)}else{for(a=""+Fe(a),r=null,m=0;m<n.length;m++){if(n[m].value===a){n[m].selected=!0,u&&(n[m].defaultSelected=!0);return}r!==null||n[m].disabled||(r=n[m])}r!==null&&(r.selected=!0)}}function we(n,r){if(r.dangerouslySetInnerHTML!=null)throw Error(t(91));return Y({},r,{value:void 0,defaultValue:void 0,children:""+n._wrapperState.initialValue})}function Me(n,r){var a=r.value;if(a==null){if(a=r.children,r=r.defaultValue,a!=null){if(r!=null)throw Error(t(92));if(C(a)){if(1<a.length)throw Error(t(93));a=a[0]}r=a}r==null&&(r=""),a=r}n._wrapperState={initialValue:Fe(a)}}function be(n,r){var a=Fe(r.value),u=Fe(r.defaultValue);a!=null&&(a=""+a,a!==n.value&&(n.value=a),r.defaultValue==null&&n.defaultValue!==a&&(n.defaultValue=a)),u!=null&&(n.defaultValue=""+u)}function Je(n){var r=n.textContent;r===n._wrapperState.initialValue&&r!==""&&r!==null&&(n.value=r)}function Ie(n){switch(n){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function He(n,r){return n==null||n==="http://www.w3.org/1999/xhtml"?Ie(r):n==="http://www.w3.org/2000/svg"&&r==="foreignObject"?"http://www.w3.org/1999/xhtml":n}var qe,rt=function(n){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(r,a,u,m){MSApp.execUnsafeLocalFunction(function(){return n(r,a,u,m)})}:n}(function(n,r){if(n.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in n)n.innerHTML=r;else{for(qe=qe||document.createElement("div"),qe.innerHTML="<svg>"+r.valueOf().toString()+"</svg>",r=qe.firstChild;n.firstChild;)n.removeChild(n.firstChild);for(;r.firstChild;)n.appendChild(r.firstChild)}});function xe(n,r){if(r){var a=n.firstChild;if(a&&a===n.lastChild&&a.nodeType===3){a.nodeValue=r;return}}n.textContent=r}var mt={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},H=["Webkit","ms","Moz","O"];Object.keys(mt).forEach(function(n){H.forEach(function(r){r=r+n.charAt(0).toUpperCase()+n.substring(1),mt[r]=mt[n]})});function _e(n,r,a){return r==null||typeof r=="boolean"||r===""?"":a||typeof r!="number"||r===0||mt.hasOwnProperty(n)&&mt[n]?(""+r).trim():r+"px"}function Ue(n,r){n=n.style;for(var a in r)if(r.hasOwnProperty(a)){var u=a.indexOf("--")===0,m=_e(a,r[a],u);a==="float"&&(a="cssFloat"),u?n.setProperty(a,m):n[a]=m}}var Re=Y({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function $e(n,r){if(r){if(Re[n]&&(r.children!=null||r.dangerouslySetInnerHTML!=null))throw Error(t(137,n));if(r.dangerouslySetInnerHTML!=null){if(r.children!=null)throw Error(t(60));if(typeof r.dangerouslySetInnerHTML!="object"||!("__html"in r.dangerouslySetInnerHTML))throw Error(t(61))}if(r.style!=null&&typeof r.style!="object")throw Error(t(62))}}function dt(n,r){if(n.indexOf("-")===-1)return typeof r.is=="string";switch(n){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var gt=null;function st(n){return n=n.target||n.srcElement||window,n.correspondingUseElement&&(n=n.correspondingUseElement),n.nodeType===3?n.parentNode:n}var Le=null,G=null,Pe=null;function Ne(n){if(n=Oo(n)){if(typeof Le!="function")throw Error(t(280));var r=n.stateNode;r&&(r=Fa(r),Le(n.stateNode,n.type,r))}}function ae(n){G?Pe?Pe.push(n):Pe=[n]:G=n}function pe(){if(G){var n=G,r=Pe;if(Pe=G=null,Ne(n),r)for(n=0;n<r.length;n++)Ne(r[n])}}function tt(n,r){return n(r)}function je(){}var ht=!1;function Tt(n,r,a){if(ht)return n(r,a);ht=!0;try{return tt(n,r,a)}finally{ht=!1,(G!==null||Pe!==null)&&(je(),pe())}}function yt(n,r){var a=n.stateNode;if(a===null)return null;var u=Fa(a);if(u===null)return null;a=u[r];e:switch(r){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(u=!u.disabled)||(n=n.type,u=!(n==="button"||n==="input"||n==="select"||n==="textarea")),n=!u;break e;default:n=!1}if(n)return null;if(a&&typeof a!="function")throw Error(t(231,r,typeof a));return a}var $t=!1;if(c)try{var pn={};Object.defineProperty(pn,"passive",{get:function(){$t=!0}}),window.addEventListener("test",pn,pn),window.removeEventListener("test",pn,pn)}catch{$t=!1}function ga(n,r,a,u,m,_,T,k,W){var ue=Array.prototype.slice.call(arguments,3);try{r.apply(a,ue)}catch(Te){this.onError(Te)}}var Ur=!1,Ci=null,Ir=!1,qi=null,va={onError:function(n){Ur=!0,Ci=n}};function xa(n,r,a,u,m,_,T,k,W){Ur=!1,Ci=null,ga.apply(va,arguments)}function Tc(n,r,a,u,m,_,T,k,W){if(xa.apply(this,arguments),Ur){if(Ur){var ue=Ci;Ur=!1,Ci=null}else throw Error(t(198));Ir||(Ir=!0,qi=ue)}}function Ri(n){var r=n,a=n;if(n.alternate)for(;r.return;)r=r.return;else{n=r;do r=n,r.flags&4098&&(a=r.return),n=r.return;while(n)}return r.tag===3?a:null}function _a(n){if(n.tag===13){var r=n.memoizedState;if(r===null&&(n=n.alternate,n!==null&&(r=n.memoizedState)),r!==null)return r.dehydrated}return null}function N(n){if(Ri(n)!==n)throw Error(t(188))}function ee(n){var r=n.alternate;if(!r){if(r=Ri(n),r===null)throw Error(t(188));return r!==n?null:n}for(var a=n,u=r;;){var m=a.return;if(m===null)break;var _=m.alternate;if(_===null){if(u=m.return,u!==null){a=u;continue}break}if(m.child===_.child){for(_=m.child;_;){if(_===a)return N(m),n;if(_===u)return N(m),r;_=_.sibling}throw Error(t(188))}if(a.return!==u.return)a=m,u=_;else{for(var T=!1,k=m.child;k;){if(k===a){T=!0,a=m,u=_;break}if(k===u){T=!0,u=m,a=_;break}k=k.sibling}if(!T){for(k=_.child;k;){if(k===a){T=!0,a=_,u=m;break}if(k===u){T=!0,u=_,a=m;break}k=k.sibling}if(!T)throw Error(t(189))}}if(a.alternate!==u)throw Error(t(190))}if(a.tag!==3)throw Error(t(188));return a.stateNode.current===a?n:r}function fe(n){return n=ee(n),n!==null?he(n):null}function he(n){if(n.tag===5||n.tag===6)return n;for(n=n.child;n!==null;){var r=he(n);if(r!==null)return r;n=n.sibling}return null}var de=e.unstable_scheduleCallback,Ge=e.unstable_cancelCallback,it=e.unstable_shouldYield,ct=e.unstable_requestPaint,Xe=e.unstable_now,vt=e.unstable_getCurrentPriorityLevel,ft=e.unstable_ImmediatePriority,pt=e.unstable_UserBlockingPriority,Nt=e.unstable_NormalPriority,Mn=e.unstable_LowPriority,Yt=e.unstable_IdlePriority,Pn=null,bt=null;function xt(n){if(bt&&typeof bt.onCommitFiberRoot=="function")try{bt.onCommitFiberRoot(Pn,n,void 0,(n.current.flags&128)===128)}catch{}}var En=Math.clz32?Math.clz32:ya,kt=Math.log,Pi=Math.LN2;function ya(n){return n>>>=0,n===0?32:31-(kt(n)/Pi|0)|0}var xi=64,Ki=4194304;function jt(n){switch(n&-n){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return n&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return n}}function qn(n,r){var a=n.pendingLanes;if(a===0)return 0;var u=0,m=n.suspendedLanes,_=n.pingedLanes,T=a&268435455;if(T!==0){var k=T&~m;k!==0?u=jt(k):(_&=T,_!==0&&(u=jt(_)))}else T=a&~m,T!==0?u=jt(T):_!==0&&(u=jt(_));if(u===0)return 0;if(r!==0&&r!==u&&!(r&m)&&(m=u&-u,_=r&-r,m>=_||m===16&&(_&4194240)!==0))return r;if(u&4&&(u|=a&16),r=n.entangledLanes,r!==0)for(n=n.entanglements,r&=u;0<r;)a=31-En(r),m=1<<a,u|=n[a],r&=~m;return u}function xo(n,r){switch(n){case 1:case 2:case 4:return r+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return r+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Ln(n,r){for(var a=n.suspendedLanes,u=n.pingedLanes,m=n.expirationTimes,_=n.pendingLanes;0<_;){var T=31-En(_),k=1<<T,W=m[T];W===-1?(!(k&a)||k&u)&&(m[T]=xo(k,r)):W<=r&&(n.expiredLanes|=k),_&=~k}}function Or(n){return n=n.pendingLanes&-1073741825,n!==0?n:n&1073741824?1073741824:0}function Sa(){var n=xi;return xi<<=1,!(xi&4194240)&&(xi=64),n}function us(n){for(var r=[],a=0;31>a;a++)r.push(n);return r}function _o(n,r,a){n.pendingLanes|=r,r!==536870912&&(n.suspendedLanes=0,n.pingedLanes=0),n=n.eventTimes,r=31-En(r),n[r]=a}function x0(n,r){var a=n.pendingLanes&~r;n.pendingLanes=r,n.suspendedLanes=0,n.pingedLanes=0,n.expiredLanes&=r,n.mutableReadLanes&=r,n.entangledLanes&=r,r=n.entanglements;var u=n.eventTimes;for(n=n.expirationTimes;0<a;){var m=31-En(a),_=1<<m;r[m]=0,u[m]=-1,n[m]=-1,a&=~_}}function bc(n,r){var a=n.entangledLanes|=r;for(n=n.entanglements;a;){var u=31-En(a),m=1<<u;m&r|n[u]&r&&(n[u]|=r),a&=~m}}var Pt=0;function Pf(n){return n&=-n,1<n?4<n?n&268435455?16:536870912:4:1}var Lf,Ac,Nf,Df,Uf,Cc=!1,Ma=[],Ji=null,Zi=null,Qi=null,yo=new Map,So=new Map,er=[],_0="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function If(n,r){switch(n){case"focusin":case"focusout":Ji=null;break;case"dragenter":case"dragleave":Zi=null;break;case"mouseover":case"mouseout":Qi=null;break;case"pointerover":case"pointerout":yo.delete(r.pointerId);break;case"gotpointercapture":case"lostpointercapture":So.delete(r.pointerId)}}function Mo(n,r,a,u,m,_){return n===null||n.nativeEvent!==_?(n={blockedOn:r,domEventName:a,eventSystemFlags:u,nativeEvent:_,targetContainers:[m]},r!==null&&(r=Oo(r),r!==null&&Ac(r)),n):(n.eventSystemFlags|=u,r=n.targetContainers,m!==null&&r.indexOf(m)===-1&&r.push(m),n)}function y0(n,r,a,u,m){switch(r){case"focusin":return Ji=Mo(Ji,n,r,a,u,m),!0;case"dragenter":return Zi=Mo(Zi,n,r,a,u,m),!0;case"mouseover":return Qi=Mo(Qi,n,r,a,u,m),!0;case"pointerover":var _=m.pointerId;return yo.set(_,Mo(yo.get(_)||null,n,r,a,u,m)),!0;case"gotpointercapture":return _=m.pointerId,So.set(_,Mo(So.get(_)||null,n,r,a,u,m)),!0}return!1}function Of(n){var r=Fr(n.target);if(r!==null){var a=Ri(r);if(a!==null){if(r=a.tag,r===13){if(r=_a(a),r!==null){n.blockedOn=r,Uf(n.priority,function(){Nf(a)});return}}else if(r===3&&a.stateNode.current.memoizedState.isDehydrated){n.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}n.blockedOn=null}function Ea(n){if(n.blockedOn!==null)return!1;for(var r=n.targetContainers;0<r.length;){var a=Pc(n.domEventName,n.eventSystemFlags,r[0],n.nativeEvent);if(a===null){a=n.nativeEvent;var u=new a.constructor(a.type,a);gt=u,a.target.dispatchEvent(u),gt=null}else return r=Oo(a),r!==null&&Ac(r),n.blockedOn=a,!1;r.shift()}return!0}function Ff(n,r,a){Ea(n)&&a.delete(r)}function S0(){Cc=!1,Ji!==null&&Ea(Ji)&&(Ji=null),Zi!==null&&Ea(Zi)&&(Zi=null),Qi!==null&&Ea(Qi)&&(Qi=null),yo.forEach(Ff),So.forEach(Ff)}function Eo(n,r){n.blockedOn===r&&(n.blockedOn=null,Cc||(Cc=!0,e.unstable_scheduleCallback(e.unstable_NormalPriority,S0)))}function wo(n){function r(m){return Eo(m,n)}if(0<Ma.length){Eo(Ma[0],n);for(var a=1;a<Ma.length;a++){var u=Ma[a];u.blockedOn===n&&(u.blockedOn=null)}}for(Ji!==null&&Eo(Ji,n),Zi!==null&&Eo(Zi,n),Qi!==null&&Eo(Qi,n),yo.forEach(r),So.forEach(r),a=0;a<er.length;a++)u=er[a],u.blockedOn===n&&(u.blockedOn=null);for(;0<er.length&&(a=er[0],a.blockedOn===null);)Of(a),a.blockedOn===null&&er.shift()}var ds=P.ReactCurrentBatchConfig,wa=!0;function M0(n,r,a,u){var m=Pt,_=ds.transition;ds.transition=null;try{Pt=1,Rc(n,r,a,u)}finally{Pt=m,ds.transition=_}}function E0(n,r,a,u){var m=Pt,_=ds.transition;ds.transition=null;try{Pt=4,Rc(n,r,a,u)}finally{Pt=m,ds.transition=_}}function Rc(n,r,a,u){if(wa){var m=Pc(n,r,a,u);if(m===null)$c(n,r,u,Ta,a),If(n,u);else if(y0(m,n,r,a,u))u.stopPropagation();else if(If(n,u),r&4&&-1<_0.indexOf(n)){for(;m!==null;){var _=Oo(m);if(_!==null&&Lf(_),_=Pc(n,r,a,u),_===null&&$c(n,r,u,Ta,a),_===m)break;m=_}m!==null&&u.stopPropagation()}else $c(n,r,u,null,a)}}var Ta=null;function Pc(n,r,a,u){if(Ta=null,n=st(u),n=Fr(n),n!==null)if(r=Ri(n),r===null)n=null;else if(a=r.tag,a===13){if(n=_a(r),n!==null)return n;n=null}else if(a===3){if(r.stateNode.current.memoizedState.isDehydrated)return r.tag===3?r.stateNode.containerInfo:null;n=null}else r!==n&&(n=null);return Ta=n,null}function kf(n){switch(n){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(vt()){case ft:return 1;case pt:return 4;case Nt:case Mn:return 16;case Yt:return 536870912;default:return 16}default:return 16}}var tr=null,Lc=null,ba=null;function zf(){if(ba)return ba;var n,r=Lc,a=r.length,u,m="value"in tr?tr.value:tr.textContent,_=m.length;for(n=0;n<a&&r[n]===m[n];n++);var T=a-n;for(u=1;u<=T&&r[a-u]===m[_-u];u++);return ba=m.slice(n,1<u?1-u:void 0)}function Aa(n){var r=n.keyCode;return"charCode"in n?(n=n.charCode,n===0&&r===13&&(n=13)):n=r,n===10&&(n=13),32<=n||n===13?n:0}function Ca(){return!0}function Bf(){return!1}function Hn(n){function r(a,u,m,_,T){this._reactName=a,this._targetInst=m,this.type=u,this.nativeEvent=_,this.target=T,this.currentTarget=null;for(var k in n)n.hasOwnProperty(k)&&(a=n[k],this[k]=a?a(_):_[k]);return this.isDefaultPrevented=(_.defaultPrevented!=null?_.defaultPrevented:_.returnValue===!1)?Ca:Bf,this.isPropagationStopped=Bf,this}return Y(r.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=Ca)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=Ca)},persist:function(){},isPersistent:Ca}),r}var fs={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(n){return n.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Nc=Hn(fs),To=Y({},fs,{view:0,detail:0}),w0=Hn(To),Dc,Uc,bo,Ra=Y({},To,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Oc,button:0,buttons:0,relatedTarget:function(n){return n.relatedTarget===void 0?n.fromElement===n.srcElement?n.toElement:n.fromElement:n.relatedTarget},movementX:function(n){return"movementX"in n?n.movementX:(n!==bo&&(bo&&n.type==="mousemove"?(Dc=n.screenX-bo.screenX,Uc=n.screenY-bo.screenY):Uc=Dc=0,bo=n),Dc)},movementY:function(n){return"movementY"in n?n.movementY:Uc}}),Hf=Hn(Ra),T0=Y({},Ra,{dataTransfer:0}),b0=Hn(T0),A0=Y({},To,{relatedTarget:0}),Ic=Hn(A0),C0=Y({},fs,{animationName:0,elapsedTime:0,pseudoElement:0}),R0=Hn(C0),P0=Y({},fs,{clipboardData:function(n){return"clipboardData"in n?n.clipboardData:window.clipboardData}}),L0=Hn(P0),N0=Y({},fs,{data:0}),Vf=Hn(N0),D0={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},U0={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},I0={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function O0(n){var r=this.nativeEvent;return r.getModifierState?r.getModifierState(n):(n=I0[n])?!!r[n]:!1}function Oc(){return O0}var F0=Y({},To,{key:function(n){if(n.key){var r=D0[n.key]||n.key;if(r!=="Unidentified")return r}return n.type==="keypress"?(n=Aa(n),n===13?"Enter":String.fromCharCode(n)):n.type==="keydown"||n.type==="keyup"?U0[n.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Oc,charCode:function(n){return n.type==="keypress"?Aa(n):0},keyCode:function(n){return n.type==="keydown"||n.type==="keyup"?n.keyCode:0},which:function(n){return n.type==="keypress"?Aa(n):n.type==="keydown"||n.type==="keyup"?n.keyCode:0}}),k0=Hn(F0),z0=Y({},Ra,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Gf=Hn(z0),B0=Y({},To,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Oc}),H0=Hn(B0),V0=Y({},fs,{propertyName:0,elapsedTime:0,pseudoElement:0}),G0=Hn(V0),W0=Y({},Ra,{deltaX:function(n){return"deltaX"in n?n.deltaX:"wheelDeltaX"in n?-n.wheelDeltaX:0},deltaY:function(n){return"deltaY"in n?n.deltaY:"wheelDeltaY"in n?-n.wheelDeltaY:"wheelDelta"in n?-n.wheelDelta:0},deltaZ:0,deltaMode:0}),j0=Hn(W0),X0=[9,13,27,32],Fc=c&&"CompositionEvent"in window,Ao=null;c&&"documentMode"in document&&(Ao=document.documentMode);var $0=c&&"TextEvent"in window&&!Ao,Wf=c&&(!Fc||Ao&&8<Ao&&11>=Ao),jf=" ",Xf=!1;function $f(n,r){switch(n){case"keyup":return X0.indexOf(r.keyCode)!==-1;case"keydown":return r.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Yf(n){return n=n.detail,typeof n=="object"&&"data"in n?n.data:null}var hs=!1;function Y0(n,r){switch(n){case"compositionend":return Yf(r);case"keypress":return r.which!==32?null:(Xf=!0,jf);case"textInput":return n=r.data,n===jf&&Xf?null:n;default:return null}}function q0(n,r){if(hs)return n==="compositionend"||!Fc&&$f(n,r)?(n=zf(),ba=Lc=tr=null,hs=!1,n):null;switch(n){case"paste":return null;case"keypress":if(!(r.ctrlKey||r.altKey||r.metaKey)||r.ctrlKey&&r.altKey){if(r.char&&1<r.char.length)return r.char;if(r.which)return String.fromCharCode(r.which)}return null;case"compositionend":return Wf&&r.locale!=="ko"?null:r.data;default:return null}}var K0={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function qf(n){var r=n&&n.nodeName&&n.nodeName.toLowerCase();return r==="input"?!!K0[n.type]:r==="textarea"}function Kf(n,r,a,u){ae(u),r=Ua(r,"onChange"),0<r.length&&(a=new Nc("onChange","change",null,a,u),n.push({event:a,listeners:r}))}var Co=null,Ro=null;function J0(n){ph(n,0)}function Pa(n){var r=xs(n);if(Q(r))return n}function Z0(n,r){if(n==="change")return r}var Jf=!1;if(c){var kc;if(c){var zc="oninput"in document;if(!zc){var Zf=document.createElement("div");Zf.setAttribute("oninput","return;"),zc=typeof Zf.oninput=="function"}kc=zc}else kc=!1;Jf=kc&&(!document.documentMode||9<document.documentMode)}function Qf(){Co&&(Co.detachEvent("onpropertychange",eh),Ro=Co=null)}function eh(n){if(n.propertyName==="value"&&Pa(Ro)){var r=[];Kf(r,Ro,n,st(n)),Tt(J0,r)}}function Q0(n,r,a){n==="focusin"?(Qf(),Co=r,Ro=a,Co.attachEvent("onpropertychange",eh)):n==="focusout"&&Qf()}function ex(n){if(n==="selectionchange"||n==="keyup"||n==="keydown")return Pa(Ro)}function tx(n,r){if(n==="click")return Pa(r)}function nx(n,r){if(n==="input"||n==="change")return Pa(r)}function ix(n,r){return n===r&&(n!==0||1/n===1/r)||n!==n&&r!==r}var oi=typeof Object.is=="function"?Object.is:ix;function Po(n,r){if(oi(n,r))return!0;if(typeof n!="object"||n===null||typeof r!="object"||r===null)return!1;var a=Object.keys(n),u=Object.keys(r);if(a.length!==u.length)return!1;for(u=0;u<a.length;u++){var m=a[u];if(!f.call(r,m)||!oi(n[m],r[m]))return!1}return!0}function th(n){for(;n&&n.firstChild;)n=n.firstChild;return n}function nh(n,r){var a=th(n);n=0;for(var u;a;){if(a.nodeType===3){if(u=n+a.textContent.length,n<=r&&u>=r)return{node:a,offset:r-n};n=u}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=th(a)}}function ih(n,r){return n&&r?n===r?!0:n&&n.nodeType===3?!1:r&&r.nodeType===3?ih(n,r.parentNode):"contains"in n?n.contains(r):n.compareDocumentPosition?!!(n.compareDocumentPosition(r)&16):!1:!1}function rh(){for(var n=window,r=nt();r instanceof n.HTMLIFrameElement;){try{var a=typeof r.contentWindow.location.href=="string"}catch{a=!1}if(a)n=r.contentWindow;else break;r=nt(n.document)}return r}function Bc(n){var r=n&&n.nodeName&&n.nodeName.toLowerCase();return r&&(r==="input"&&(n.type==="text"||n.type==="search"||n.type==="tel"||n.type==="url"||n.type==="password")||r==="textarea"||n.contentEditable==="true")}function rx(n){var r=rh(),a=n.focusedElem,u=n.selectionRange;if(r!==a&&a&&a.ownerDocument&&ih(a.ownerDocument.documentElement,a)){if(u!==null&&Bc(a)){if(r=u.start,n=u.end,n===void 0&&(n=r),"selectionStart"in a)a.selectionStart=r,a.selectionEnd=Math.min(n,a.value.length);else if(n=(r=a.ownerDocument||document)&&r.defaultView||window,n.getSelection){n=n.getSelection();var m=a.textContent.length,_=Math.min(u.start,m);u=u.end===void 0?_:Math.min(u.end,m),!n.extend&&_>u&&(m=u,u=_,_=m),m=nh(a,_);var T=nh(a,u);m&&T&&(n.rangeCount!==1||n.anchorNode!==m.node||n.anchorOffset!==m.offset||n.focusNode!==T.node||n.focusOffset!==T.offset)&&(r=r.createRange(),r.setStart(m.node,m.offset),n.removeAllRanges(),_>u?(n.addRange(r),n.extend(T.node,T.offset)):(r.setEnd(T.node,T.offset),n.addRange(r)))}}for(r=[],n=a;n=n.parentNode;)n.nodeType===1&&r.push({element:n,left:n.scrollLeft,top:n.scrollTop});for(typeof a.focus=="function"&&a.focus(),a=0;a<r.length;a++)n=r[a],n.element.scrollLeft=n.left,n.element.scrollTop=n.top}}var sx=c&&"documentMode"in document&&11>=document.documentMode,ps=null,Hc=null,Lo=null,Vc=!1;function sh(n,r,a){var u=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;Vc||ps==null||ps!==nt(u)||(u=ps,"selectionStart"in u&&Bc(u)?u={start:u.selectionStart,end:u.selectionEnd}:(u=(u.ownerDocument&&u.ownerDocument.defaultView||window).getSelection(),u={anchorNode:u.anchorNode,anchorOffset:u.anchorOffset,focusNode:u.focusNode,focusOffset:u.focusOffset}),Lo&&Po(Lo,u)||(Lo=u,u=Ua(Hc,"onSelect"),0<u.length&&(r=new Nc("onSelect","select",null,r,a),n.push({event:r,listeners:u}),r.target=ps)))}function La(n,r){var a={};return a[n.toLowerCase()]=r.toLowerCase(),a["Webkit"+n]="webkit"+r,a["Moz"+n]="moz"+r,a}var ms={animationend:La("Animation","AnimationEnd"),animationiteration:La("Animation","AnimationIteration"),animationstart:La("Animation","AnimationStart"),transitionend:La("Transition","TransitionEnd")},Gc={},oh={};c&&(oh=document.createElement("div").style,"AnimationEvent"in window||(delete ms.animationend.animation,delete ms.animationiteration.animation,delete ms.animationstart.animation),"TransitionEvent"in window||delete ms.transitionend.transition);function Na(n){if(Gc[n])return Gc[n];if(!ms[n])return n;var r=ms[n],a;for(a in r)if(r.hasOwnProperty(a)&&a in oh)return Gc[n]=r[a];return n}var ah=Na("animationend"),lh=Na("animationiteration"),ch=Na("animationstart"),uh=Na("transitionend"),dh=new Map,fh="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function nr(n,r){dh.set(n,r),l(r,[n])}for(var Wc=0;Wc<fh.length;Wc++){var jc=fh[Wc],ox=jc.toLowerCase(),ax=jc[0].toUpperCase()+jc.slice(1);nr(ox,"on"+ax)}nr(ah,"onAnimationEnd"),nr(lh,"onAnimationIteration"),nr(ch,"onAnimationStart"),nr("dblclick","onDoubleClick"),nr("focusin","onFocus"),nr("focusout","onBlur"),nr(uh,"onTransitionEnd"),d("onMouseEnter",["mouseout","mouseover"]),d("onMouseLeave",["mouseout","mouseover"]),d("onPointerEnter",["pointerout","pointerover"]),d("onPointerLeave",["pointerout","pointerover"]),l("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),l("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),l("onBeforeInput",["compositionend","keypress","textInput","paste"]),l("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var No="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),lx=new Set("cancel close invalid load scroll toggle".split(" ").concat(No));function hh(n,r,a){var u=n.type||"unknown-event";n.currentTarget=a,Tc(u,r,void 0,n),n.currentTarget=null}function ph(n,r){r=(r&4)!==0;for(var a=0;a<n.length;a++){var u=n[a],m=u.event;u=u.listeners;e:{var _=void 0;if(r)for(var T=u.length-1;0<=T;T--){var k=u[T],W=k.instance,ue=k.currentTarget;if(k=k.listener,W!==_&&m.isPropagationStopped())break e;hh(m,k,ue),_=W}else for(T=0;T<u.length;T++){if(k=u[T],W=k.instance,ue=k.currentTarget,k=k.listener,W!==_&&m.isPropagationStopped())break e;hh(m,k,ue),_=W}}}if(Ir)throw n=qi,Ir=!1,qi=null,n}function Ut(n,r){var a=r[Qc];a===void 0&&(a=r[Qc]=new Set);var u=n+"__bubble";a.has(u)||(mh(r,n,2,!1),a.add(u))}function Xc(n,r,a){var u=0;r&&(u|=4),mh(a,n,u,r)}var Da="_reactListening"+Math.random().toString(36).slice(2);function Do(n){if(!n[Da]){n[Da]=!0,i.forEach(function(a){a!=="selectionchange"&&(lx.has(a)||Xc(a,!1,n),Xc(a,!0,n))});var r=n.nodeType===9?n:n.ownerDocument;r===null||r[Da]||(r[Da]=!0,Xc("selectionchange",!1,r))}}function mh(n,r,a,u){switch(kf(r)){case 1:var m=M0;break;case 4:m=E0;break;default:m=Rc}a=m.bind(null,r,a,n),m=void 0,!$t||r!=="touchstart"&&r!=="touchmove"&&r!=="wheel"||(m=!0),u?m!==void 0?n.addEventListener(r,a,{capture:!0,passive:m}):n.addEventListener(r,a,!0):m!==void 0?n.addEventListener(r,a,{passive:m}):n.addEventListener(r,a,!1)}function $c(n,r,a,u,m){var _=u;if(!(r&1)&&!(r&2)&&u!==null)e:for(;;){if(u===null)return;var T=u.tag;if(T===3||T===4){var k=u.stateNode.containerInfo;if(k===m||k.nodeType===8&&k.parentNode===m)break;if(T===4)for(T=u.return;T!==null;){var W=T.tag;if((W===3||W===4)&&(W=T.stateNode.containerInfo,W===m||W.nodeType===8&&W.parentNode===m))return;T=T.return}for(;k!==null;){if(T=Fr(k),T===null)return;if(W=T.tag,W===5||W===6){u=_=T;continue e}k=k.parentNode}}u=u.return}Tt(function(){var ue=_,Te=st(a),Ce=[];e:{var Ee=dh.get(n);if(Ee!==void 0){var We=Nc,Ke=n;switch(n){case"keypress":if(Aa(a)===0)break e;case"keydown":case"keyup":We=k0;break;case"focusin":Ke="focus",We=Ic;break;case"focusout":Ke="blur",We=Ic;break;case"beforeblur":case"afterblur":We=Ic;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":We=Hf;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":We=b0;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":We=H0;break;case ah:case lh:case ch:We=R0;break;case uh:We=G0;break;case"scroll":We=w0;break;case"wheel":We=j0;break;case"copy":case"cut":case"paste":We=L0;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":We=Gf}var Ze=(r&4)!==0,qt=!Ze&&n==="scroll",Z=Ze?Ee!==null?Ee+"Capture":null:Ee;Ze=[];for(var $=ue,re;$!==null;){re=$;var De=re.stateNode;if(re.tag===5&&De!==null&&(re=De,Z!==null&&(De=yt($,Z),De!=null&&Ze.push(Uo($,De,re)))),qt)break;$=$.return}0<Ze.length&&(Ee=new We(Ee,Ke,null,a,Te),Ce.push({event:Ee,listeners:Ze}))}}if(!(r&7)){e:{if(Ee=n==="mouseover"||n==="pointerover",We=n==="mouseout"||n==="pointerout",Ee&&a!==gt&&(Ke=a.relatedTarget||a.fromElement)&&(Fr(Ke)||Ke[Li]))break e;if((We||Ee)&&(Ee=Te.window===Te?Te:(Ee=Te.ownerDocument)?Ee.defaultView||Ee.parentWindow:window,We?(Ke=a.relatedTarget||a.toElement,We=ue,Ke=Ke?Fr(Ke):null,Ke!==null&&(qt=Ri(Ke),Ke!==qt||Ke.tag!==5&&Ke.tag!==6)&&(Ke=null)):(We=null,Ke=ue),We!==Ke)){if(Ze=Hf,De="onMouseLeave",Z="onMouseEnter",$="mouse",(n==="pointerout"||n==="pointerover")&&(Ze=Gf,De="onPointerLeave",Z="onPointerEnter",$="pointer"),qt=We==null?Ee:xs(We),re=Ke==null?Ee:xs(Ke),Ee=new Ze(De,$+"leave",We,a,Te),Ee.target=qt,Ee.relatedTarget=re,De=null,Fr(Te)===ue&&(Ze=new Ze(Z,$+"enter",Ke,a,Te),Ze.target=re,Ze.relatedTarget=qt,De=Ze),qt=De,We&&Ke)t:{for(Ze=We,Z=Ke,$=0,re=Ze;re;re=gs(re))$++;for(re=0,De=Z;De;De=gs(De))re++;for(;0<$-re;)Ze=gs(Ze),$--;for(;0<re-$;)Z=gs(Z),re--;for(;$--;){if(Ze===Z||Z!==null&&Ze===Z.alternate)break t;Ze=gs(Ze),Z=gs(Z)}Ze=null}else Ze=null;We!==null&&gh(Ce,Ee,We,Ze,!1),Ke!==null&&qt!==null&&gh(Ce,qt,Ke,Ze,!0)}}e:{if(Ee=ue?xs(ue):window,We=Ee.nodeName&&Ee.nodeName.toLowerCase(),We==="select"||We==="input"&&Ee.type==="file")var et=Z0;else if(qf(Ee))if(Jf)et=nx;else{et=ex;var at=Q0}else(We=Ee.nodeName)&&We.toLowerCase()==="input"&&(Ee.type==="checkbox"||Ee.type==="radio")&&(et=tx);if(et&&(et=et(n,ue))){Kf(Ce,et,a,Te);break e}at&&at(n,Ee,ue),n==="focusout"&&(at=Ee._wrapperState)&&at.controlled&&Ee.type==="number"&&L(Ee,"number",Ee.value)}switch(at=ue?xs(ue):window,n){case"focusin":(qf(at)||at.contentEditable==="true")&&(ps=at,Hc=ue,Lo=null);break;case"focusout":Lo=Hc=ps=null;break;case"mousedown":Vc=!0;break;case"contextmenu":case"mouseup":case"dragend":Vc=!1,sh(Ce,a,Te);break;case"selectionchange":if(sx)break;case"keydown":case"keyup":sh(Ce,a,Te)}var lt;if(Fc)e:{switch(n){case"compositionstart":var ut="onCompositionStart";break e;case"compositionend":ut="onCompositionEnd";break e;case"compositionupdate":ut="onCompositionUpdate";break e}ut=void 0}else hs?$f(n,a)&&(ut="onCompositionEnd"):n==="keydown"&&a.keyCode===229&&(ut="onCompositionStart");ut&&(Wf&&a.locale!=="ko"&&(hs||ut!=="onCompositionStart"?ut==="onCompositionEnd"&&hs&&(lt=zf()):(tr=Te,Lc="value"in tr?tr.value:tr.textContent,hs=!0)),at=Ua(ue,ut),0<at.length&&(ut=new Vf(ut,n,null,a,Te),Ce.push({event:ut,listeners:at}),lt?ut.data=lt:(lt=Yf(a),lt!==null&&(ut.data=lt)))),(lt=$0?Y0(n,a):q0(n,a))&&(ue=Ua(ue,"onBeforeInput"),0<ue.length&&(Te=new Vf("onBeforeInput","beforeinput",null,a,Te),Ce.push({event:Te,listeners:ue}),Te.data=lt))}ph(Ce,r)})}function Uo(n,r,a){return{instance:n,listener:r,currentTarget:a}}function Ua(n,r){for(var a=r+"Capture",u=[];n!==null;){var m=n,_=m.stateNode;m.tag===5&&_!==null&&(m=_,_=yt(n,a),_!=null&&u.unshift(Uo(n,_,m)),_=yt(n,r),_!=null&&u.push(Uo(n,_,m))),n=n.return}return u}function gs(n){if(n===null)return null;do n=n.return;while(n&&n.tag!==5);return n||null}function gh(n,r,a,u,m){for(var _=r._reactName,T=[];a!==null&&a!==u;){var k=a,W=k.alternate,ue=k.stateNode;if(W!==null&&W===u)break;k.tag===5&&ue!==null&&(k=ue,m?(W=yt(a,_),W!=null&&T.unshift(Uo(a,W,k))):m||(W=yt(a,_),W!=null&&T.push(Uo(a,W,k)))),a=a.return}T.length!==0&&n.push({event:r,listeners:T})}var cx=/\r\n?/g,ux=/\u0000|\uFFFD/g;function vh(n){return(typeof n=="string"?n:""+n).replace(cx,`
`).replace(ux,"")}function Ia(n,r,a){if(r=vh(r),vh(n)!==r&&a)throw Error(t(425))}function Oa(){}var Yc=null,qc=null;function Kc(n,r){return n==="textarea"||n==="noscript"||typeof r.children=="string"||typeof r.children=="number"||typeof r.dangerouslySetInnerHTML=="object"&&r.dangerouslySetInnerHTML!==null&&r.dangerouslySetInnerHTML.__html!=null}var Jc=typeof setTimeout=="function"?setTimeout:void 0,dx=typeof clearTimeout=="function"?clearTimeout:void 0,xh=typeof Promise=="function"?Promise:void 0,fx=typeof queueMicrotask=="function"?queueMicrotask:typeof xh<"u"?function(n){return xh.resolve(null).then(n).catch(hx)}:Jc;function hx(n){setTimeout(function(){throw n})}function Zc(n,r){var a=r,u=0;do{var m=a.nextSibling;if(n.removeChild(a),m&&m.nodeType===8)if(a=m.data,a==="/$"){if(u===0){n.removeChild(m),wo(r);return}u--}else a!=="$"&&a!=="$?"&&a!=="$!"||u++;a=m}while(a);wo(r)}function ir(n){for(;n!=null;n=n.nextSibling){var r=n.nodeType;if(r===1||r===3)break;if(r===8){if(r=n.data,r==="$"||r==="$!"||r==="$?")break;if(r==="/$")return null}}return n}function _h(n){n=n.previousSibling;for(var r=0;n;){if(n.nodeType===8){var a=n.data;if(a==="$"||a==="$!"||a==="$?"){if(r===0)return n;r--}else a==="/$"&&r++}n=n.previousSibling}return null}var vs=Math.random().toString(36).slice(2),_i="__reactFiber$"+vs,Io="__reactProps$"+vs,Li="__reactContainer$"+vs,Qc="__reactEvents$"+vs,px="__reactListeners$"+vs,mx="__reactHandles$"+vs;function Fr(n){var r=n[_i];if(r)return r;for(var a=n.parentNode;a;){if(r=a[Li]||a[_i]){if(a=r.alternate,r.child!==null||a!==null&&a.child!==null)for(n=_h(n);n!==null;){if(a=n[_i])return a;n=_h(n)}return r}n=a,a=n.parentNode}return null}function Oo(n){return n=n[_i]||n[Li],!n||n.tag!==5&&n.tag!==6&&n.tag!==13&&n.tag!==3?null:n}function xs(n){if(n.tag===5||n.tag===6)return n.stateNode;throw Error(t(33))}function Fa(n){return n[Io]||null}var eu=[],_s=-1;function rr(n){return{current:n}}function It(n){0>_s||(n.current=eu[_s],eu[_s]=null,_s--)}function Dt(n,r){_s++,eu[_s]=n.current,n.current=r}var sr={},mn=rr(sr),Nn=rr(!1),kr=sr;function ys(n,r){var a=n.type.contextTypes;if(!a)return sr;var u=n.stateNode;if(u&&u.__reactInternalMemoizedUnmaskedChildContext===r)return u.__reactInternalMemoizedMaskedChildContext;var m={},_;for(_ in a)m[_]=r[_];return u&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=r,n.__reactInternalMemoizedMaskedChildContext=m),m}function Dn(n){return n=n.childContextTypes,n!=null}function ka(){It(Nn),It(mn)}function yh(n,r,a){if(mn.current!==sr)throw Error(t(168));Dt(mn,r),Dt(Nn,a)}function Sh(n,r,a){var u=n.stateNode;if(r=r.childContextTypes,typeof u.getChildContext!="function")return a;u=u.getChildContext();for(var m in u)if(!(m in r))throw Error(t(108,Se(n)||"Unknown",m));return Y({},a,u)}function za(n){return n=(n=n.stateNode)&&n.__reactInternalMemoizedMergedChildContext||sr,kr=mn.current,Dt(mn,n),Dt(Nn,Nn.current),!0}function Mh(n,r,a){var u=n.stateNode;if(!u)throw Error(t(169));a?(n=Sh(n,r,kr),u.__reactInternalMemoizedMergedChildContext=n,It(Nn),It(mn),Dt(mn,n)):It(Nn),Dt(Nn,a)}var Ni=null,Ba=!1,tu=!1;function Eh(n){Ni===null?Ni=[n]:Ni.push(n)}function gx(n){Ba=!0,Eh(n)}function or(){if(!tu&&Ni!==null){tu=!0;var n=0,r=Pt;try{var a=Ni;for(Pt=1;n<a.length;n++){var u=a[n];do u=u(!0);while(u!==null)}Ni=null,Ba=!1}catch(m){throw Ni!==null&&(Ni=Ni.slice(n+1)),de(ft,or),m}finally{Pt=r,tu=!1}}return null}var Ss=[],Ms=0,Ha=null,Va=0,Kn=[],Jn=0,zr=null,Di=1,Ui="";function Br(n,r){Ss[Ms++]=Va,Ss[Ms++]=Ha,Ha=n,Va=r}function wh(n,r,a){Kn[Jn++]=Di,Kn[Jn++]=Ui,Kn[Jn++]=zr,zr=n;var u=Di;n=Ui;var m=32-En(u)-1;u&=~(1<<m),a+=1;var _=32-En(r)+m;if(30<_){var T=m-m%5;_=(u&(1<<T)-1).toString(32),u>>=T,m-=T,Di=1<<32-En(r)+m|a<<m|u,Ui=_+n}else Di=1<<_|a<<m|u,Ui=n}function nu(n){n.return!==null&&(Br(n,1),wh(n,1,0))}function iu(n){for(;n===Ha;)Ha=Ss[--Ms],Ss[Ms]=null,Va=Ss[--Ms],Ss[Ms]=null;for(;n===zr;)zr=Kn[--Jn],Kn[Jn]=null,Ui=Kn[--Jn],Kn[Jn]=null,Di=Kn[--Jn],Kn[Jn]=null}var Vn=null,Gn=null,zt=!1,ai=null;function Th(n,r){var a=ti(5,null,null,0);a.elementType="DELETED",a.stateNode=r,a.return=n,r=n.deletions,r===null?(n.deletions=[a],n.flags|=16):r.push(a)}function bh(n,r){switch(n.tag){case 5:var a=n.type;return r=r.nodeType!==1||a.toLowerCase()!==r.nodeName.toLowerCase()?null:r,r!==null?(n.stateNode=r,Vn=n,Gn=ir(r.firstChild),!0):!1;case 6:return r=n.pendingProps===""||r.nodeType!==3?null:r,r!==null?(n.stateNode=r,Vn=n,Gn=null,!0):!1;case 13:return r=r.nodeType!==8?null:r,r!==null?(a=zr!==null?{id:Di,overflow:Ui}:null,n.memoizedState={dehydrated:r,treeContext:a,retryLane:1073741824},a=ti(18,null,null,0),a.stateNode=r,a.return=n,n.child=a,Vn=n,Gn=null,!0):!1;default:return!1}}function ru(n){return(n.mode&1)!==0&&(n.flags&128)===0}function su(n){if(zt){var r=Gn;if(r){var a=r;if(!bh(n,r)){if(ru(n))throw Error(t(418));r=ir(a.nextSibling);var u=Vn;r&&bh(n,r)?Th(u,a):(n.flags=n.flags&-4097|2,zt=!1,Vn=n)}}else{if(ru(n))throw Error(t(418));n.flags=n.flags&-4097|2,zt=!1,Vn=n}}}function Ah(n){for(n=n.return;n!==null&&n.tag!==5&&n.tag!==3&&n.tag!==13;)n=n.return;Vn=n}function Ga(n){if(n!==Vn)return!1;if(!zt)return Ah(n),zt=!0,!1;var r;if((r=n.tag!==3)&&!(r=n.tag!==5)&&(r=n.type,r=r!=="head"&&r!=="body"&&!Kc(n.type,n.memoizedProps)),r&&(r=Gn)){if(ru(n))throw Ch(),Error(t(418));for(;r;)Th(n,r),r=ir(r.nextSibling)}if(Ah(n),n.tag===13){if(n=n.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(t(317));e:{for(n=n.nextSibling,r=0;n;){if(n.nodeType===8){var a=n.data;if(a==="/$"){if(r===0){Gn=ir(n.nextSibling);break e}r--}else a!=="$"&&a!=="$!"&&a!=="$?"||r++}n=n.nextSibling}Gn=null}}else Gn=Vn?ir(n.stateNode.nextSibling):null;return!0}function Ch(){for(var n=Gn;n;)n=ir(n.nextSibling)}function Es(){Gn=Vn=null,zt=!1}function ou(n){ai===null?ai=[n]:ai.push(n)}var vx=P.ReactCurrentBatchConfig;function Fo(n,r,a){if(n=a.ref,n!==null&&typeof n!="function"&&typeof n!="object"){if(a._owner){if(a=a._owner,a){if(a.tag!==1)throw Error(t(309));var u=a.stateNode}if(!u)throw Error(t(147,n));var m=u,_=""+n;return r!==null&&r.ref!==null&&typeof r.ref=="function"&&r.ref._stringRef===_?r.ref:(r=function(T){var k=m.refs;T===null?delete k[_]:k[_]=T},r._stringRef=_,r)}if(typeof n!="string")throw Error(t(284));if(!a._owner)throw Error(t(290,n))}return n}function Wa(n,r){throw n=Object.prototype.toString.call(r),Error(t(31,n==="[object Object]"?"object with keys {"+Object.keys(r).join(", ")+"}":n))}function Rh(n){var r=n._init;return r(n._payload)}function Ph(n){function r(Z,$){if(n){var re=Z.deletions;re===null?(Z.deletions=[$],Z.flags|=16):re.push($)}}function a(Z,$){if(!n)return null;for(;$!==null;)r(Z,$),$=$.sibling;return null}function u(Z,$){for(Z=new Map;$!==null;)$.key!==null?Z.set($.key,$):Z.set($.index,$),$=$.sibling;return Z}function m(Z,$){return Z=pr(Z,$),Z.index=0,Z.sibling=null,Z}function _(Z,$,re){return Z.index=re,n?(re=Z.alternate,re!==null?(re=re.index,re<$?(Z.flags|=2,$):re):(Z.flags|=2,$)):(Z.flags|=1048576,$)}function T(Z){return n&&Z.alternate===null&&(Z.flags|=2),Z}function k(Z,$,re,De){return $===null||$.tag!==6?($=Ju(re,Z.mode,De),$.return=Z,$):($=m($,re),$.return=Z,$)}function W(Z,$,re,De){var et=re.type;return et===I?Te(Z,$,re.props.children,De,re.key):$!==null&&($.elementType===et||typeof et=="object"&&et!==null&&et.$$typeof===te&&Rh(et)===$.type)?(De=m($,re.props),De.ref=Fo(Z,$,re),De.return=Z,De):(De=pl(re.type,re.key,re.props,null,Z.mode,De),De.ref=Fo(Z,$,re),De.return=Z,De)}function ue(Z,$,re,De){return $===null||$.tag!==4||$.stateNode.containerInfo!==re.containerInfo||$.stateNode.implementation!==re.implementation?($=Zu(re,Z.mode,De),$.return=Z,$):($=m($,re.children||[]),$.return=Z,$)}function Te(Z,$,re,De,et){return $===null||$.tag!==7?($=Yr(re,Z.mode,De,et),$.return=Z,$):($=m($,re),$.return=Z,$)}function Ce(Z,$,re){if(typeof $=="string"&&$!==""||typeof $=="number")return $=Ju(""+$,Z.mode,re),$.return=Z,$;if(typeof $=="object"&&$!==null){switch($.$$typeof){case z:return re=pl($.type,$.key,$.props,null,Z.mode,re),re.ref=Fo(Z,null,$),re.return=Z,re;case D:return $=Zu($,Z.mode,re),$.return=Z,$;case te:var De=$._init;return Ce(Z,De($._payload),re)}if(C($)||K($))return $=Yr($,Z.mode,re,null),$.return=Z,$;Wa(Z,$)}return null}function Ee(Z,$,re,De){var et=$!==null?$.key:null;if(typeof re=="string"&&re!==""||typeof re=="number")return et!==null?null:k(Z,$,""+re,De);if(typeof re=="object"&&re!==null){switch(re.$$typeof){case z:return re.key===et?W(Z,$,re,De):null;case D:return re.key===et?ue(Z,$,re,De):null;case te:return et=re._init,Ee(Z,$,et(re._payload),De)}if(C(re)||K(re))return et!==null?null:Te(Z,$,re,De,null);Wa(Z,re)}return null}function We(Z,$,re,De,et){if(typeof De=="string"&&De!==""||typeof De=="number")return Z=Z.get(re)||null,k($,Z,""+De,et);if(typeof De=="object"&&De!==null){switch(De.$$typeof){case z:return Z=Z.get(De.key===null?re:De.key)||null,W($,Z,De,et);case D:return Z=Z.get(De.key===null?re:De.key)||null,ue($,Z,De,et);case te:var at=De._init;return We(Z,$,re,at(De._payload),et)}if(C(De)||K(De))return Z=Z.get(re)||null,Te($,Z,De,et,null);Wa($,De)}return null}function Ke(Z,$,re,De){for(var et=null,at=null,lt=$,ut=$=0,cn=null;lt!==null&&ut<re.length;ut++){lt.index>ut?(cn=lt,lt=null):cn=lt.sibling;var Ct=Ee(Z,lt,re[ut],De);if(Ct===null){lt===null&&(lt=cn);break}n&&lt&&Ct.alternate===null&&r(Z,lt),$=_(Ct,$,ut),at===null?et=Ct:at.sibling=Ct,at=Ct,lt=cn}if(ut===re.length)return a(Z,lt),zt&&Br(Z,ut),et;if(lt===null){for(;ut<re.length;ut++)lt=Ce(Z,re[ut],De),lt!==null&&($=_(lt,$,ut),at===null?et=lt:at.sibling=lt,at=lt);return zt&&Br(Z,ut),et}for(lt=u(Z,lt);ut<re.length;ut++)cn=We(lt,Z,ut,re[ut],De),cn!==null&&(n&&cn.alternate!==null&&lt.delete(cn.key===null?ut:cn.key),$=_(cn,$,ut),at===null?et=cn:at.sibling=cn,at=cn);return n&&lt.forEach(function(mr){return r(Z,mr)}),zt&&Br(Z,ut),et}function Ze(Z,$,re,De){var et=K(re);if(typeof et!="function")throw Error(t(150));if(re=et.call(re),re==null)throw Error(t(151));for(var at=et=null,lt=$,ut=$=0,cn=null,Ct=re.next();lt!==null&&!Ct.done;ut++,Ct=re.next()){lt.index>ut?(cn=lt,lt=null):cn=lt.sibling;var mr=Ee(Z,lt,Ct.value,De);if(mr===null){lt===null&&(lt=cn);break}n&&lt&&mr.alternate===null&&r(Z,lt),$=_(mr,$,ut),at===null?et=mr:at.sibling=mr,at=mr,lt=cn}if(Ct.done)return a(Z,lt),zt&&Br(Z,ut),et;if(lt===null){for(;!Ct.done;ut++,Ct=re.next())Ct=Ce(Z,Ct.value,De),Ct!==null&&($=_(Ct,$,ut),at===null?et=Ct:at.sibling=Ct,at=Ct);return zt&&Br(Z,ut),et}for(lt=u(Z,lt);!Ct.done;ut++,Ct=re.next())Ct=We(lt,Z,ut,Ct.value,De),Ct!==null&&(n&&Ct.alternate!==null&&lt.delete(Ct.key===null?ut:Ct.key),$=_(Ct,$,ut),at===null?et=Ct:at.sibling=Ct,at=Ct);return n&&lt.forEach(function(Kx){return r(Z,Kx)}),zt&&Br(Z,ut),et}function qt(Z,$,re,De){if(typeof re=="object"&&re!==null&&re.type===I&&re.key===null&&(re=re.props.children),typeof re=="object"&&re!==null){switch(re.$$typeof){case z:e:{for(var et=re.key,at=$;at!==null;){if(at.key===et){if(et=re.type,et===I){if(at.tag===7){a(Z,at.sibling),$=m(at,re.props.children),$.return=Z,Z=$;break e}}else if(at.elementType===et||typeof et=="object"&&et!==null&&et.$$typeof===te&&Rh(et)===at.type){a(Z,at.sibling),$=m(at,re.props),$.ref=Fo(Z,at,re),$.return=Z,Z=$;break e}a(Z,at);break}else r(Z,at);at=at.sibling}re.type===I?($=Yr(re.props.children,Z.mode,De,re.key),$.return=Z,Z=$):(De=pl(re.type,re.key,re.props,null,Z.mode,De),De.ref=Fo(Z,$,re),De.return=Z,Z=De)}return T(Z);case D:e:{for(at=re.key;$!==null;){if($.key===at)if($.tag===4&&$.stateNode.containerInfo===re.containerInfo&&$.stateNode.implementation===re.implementation){a(Z,$.sibling),$=m($,re.children||[]),$.return=Z,Z=$;break e}else{a(Z,$);break}else r(Z,$);$=$.sibling}$=Zu(re,Z.mode,De),$.return=Z,Z=$}return T(Z);case te:return at=re._init,qt(Z,$,at(re._payload),De)}if(C(re))return Ke(Z,$,re,De);if(K(re))return Ze(Z,$,re,De);Wa(Z,re)}return typeof re=="string"&&re!==""||typeof re=="number"?(re=""+re,$!==null&&$.tag===6?(a(Z,$.sibling),$=m($,re),$.return=Z,Z=$):(a(Z,$),$=Ju(re,Z.mode,De),$.return=Z,Z=$),T(Z)):a(Z,$)}return qt}var ws=Ph(!0),Lh=Ph(!1),ja=rr(null),Xa=null,Ts=null,au=null;function lu(){au=Ts=Xa=null}function cu(n){var r=ja.current;It(ja),n._currentValue=r}function uu(n,r,a){for(;n!==null;){var u=n.alternate;if((n.childLanes&r)!==r?(n.childLanes|=r,u!==null&&(u.childLanes|=r)):u!==null&&(u.childLanes&r)!==r&&(u.childLanes|=r),n===a)break;n=n.return}}function bs(n,r){Xa=n,au=Ts=null,n=n.dependencies,n!==null&&n.firstContext!==null&&(n.lanes&r&&(Un=!0),n.firstContext=null)}function Zn(n){var r=n._currentValue;if(au!==n)if(n={context:n,memoizedValue:r,next:null},Ts===null){if(Xa===null)throw Error(t(308));Ts=n,Xa.dependencies={lanes:0,firstContext:n}}else Ts=Ts.next=n;return r}var Hr=null;function du(n){Hr===null?Hr=[n]:Hr.push(n)}function Nh(n,r,a,u){var m=r.interleaved;return m===null?(a.next=a,du(r)):(a.next=m.next,m.next=a),r.interleaved=a,Ii(n,u)}function Ii(n,r){n.lanes|=r;var a=n.alternate;for(a!==null&&(a.lanes|=r),a=n,n=n.return;n!==null;)n.childLanes|=r,a=n.alternate,a!==null&&(a.childLanes|=r),a=n,n=n.return;return a.tag===3?a.stateNode:null}var ar=!1;function fu(n){n.updateQueue={baseState:n.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Dh(n,r){n=n.updateQueue,r.updateQueue===n&&(r.updateQueue={baseState:n.baseState,firstBaseUpdate:n.firstBaseUpdate,lastBaseUpdate:n.lastBaseUpdate,shared:n.shared,effects:n.effects})}function Oi(n,r){return{eventTime:n,lane:r,tag:0,payload:null,callback:null,next:null}}function lr(n,r,a){var u=n.updateQueue;if(u===null)return null;if(u=u.shared,At&2){var m=u.pending;return m===null?r.next=r:(r.next=m.next,m.next=r),u.pending=r,Ii(n,a)}return m=u.interleaved,m===null?(r.next=r,du(u)):(r.next=m.next,m.next=r),u.interleaved=r,Ii(n,a)}function $a(n,r,a){if(r=r.updateQueue,r!==null&&(r=r.shared,(a&4194240)!==0)){var u=r.lanes;u&=n.pendingLanes,a|=u,r.lanes=a,bc(n,a)}}function Uh(n,r){var a=n.updateQueue,u=n.alternate;if(u!==null&&(u=u.updateQueue,a===u)){var m=null,_=null;if(a=a.firstBaseUpdate,a!==null){do{var T={eventTime:a.eventTime,lane:a.lane,tag:a.tag,payload:a.payload,callback:a.callback,next:null};_===null?m=_=T:_=_.next=T,a=a.next}while(a!==null);_===null?m=_=r:_=_.next=r}else m=_=r;a={baseState:u.baseState,firstBaseUpdate:m,lastBaseUpdate:_,shared:u.shared,effects:u.effects},n.updateQueue=a;return}n=a.lastBaseUpdate,n===null?a.firstBaseUpdate=r:n.next=r,a.lastBaseUpdate=r}function Ya(n,r,a,u){var m=n.updateQueue;ar=!1;var _=m.firstBaseUpdate,T=m.lastBaseUpdate,k=m.shared.pending;if(k!==null){m.shared.pending=null;var W=k,ue=W.next;W.next=null,T===null?_=ue:T.next=ue,T=W;var Te=n.alternate;Te!==null&&(Te=Te.updateQueue,k=Te.lastBaseUpdate,k!==T&&(k===null?Te.firstBaseUpdate=ue:k.next=ue,Te.lastBaseUpdate=W))}if(_!==null){var Ce=m.baseState;T=0,Te=ue=W=null,k=_;do{var Ee=k.lane,We=k.eventTime;if((u&Ee)===Ee){Te!==null&&(Te=Te.next={eventTime:We,lane:0,tag:k.tag,payload:k.payload,callback:k.callback,next:null});e:{var Ke=n,Ze=k;switch(Ee=r,We=a,Ze.tag){case 1:if(Ke=Ze.payload,typeof Ke=="function"){Ce=Ke.call(We,Ce,Ee);break e}Ce=Ke;break e;case 3:Ke.flags=Ke.flags&-65537|128;case 0:if(Ke=Ze.payload,Ee=typeof Ke=="function"?Ke.call(We,Ce,Ee):Ke,Ee==null)break e;Ce=Y({},Ce,Ee);break e;case 2:ar=!0}}k.callback!==null&&k.lane!==0&&(n.flags|=64,Ee=m.effects,Ee===null?m.effects=[k]:Ee.push(k))}else We={eventTime:We,lane:Ee,tag:k.tag,payload:k.payload,callback:k.callback,next:null},Te===null?(ue=Te=We,W=Ce):Te=Te.next=We,T|=Ee;if(k=k.next,k===null){if(k=m.shared.pending,k===null)break;Ee=k,k=Ee.next,Ee.next=null,m.lastBaseUpdate=Ee,m.shared.pending=null}}while(!0);if(Te===null&&(W=Ce),m.baseState=W,m.firstBaseUpdate=ue,m.lastBaseUpdate=Te,r=m.shared.interleaved,r!==null){m=r;do T|=m.lane,m=m.next;while(m!==r)}else _===null&&(m.shared.lanes=0);Wr|=T,n.lanes=T,n.memoizedState=Ce}}function Ih(n,r,a){if(n=r.effects,r.effects=null,n!==null)for(r=0;r<n.length;r++){var u=n[r],m=u.callback;if(m!==null){if(u.callback=null,u=a,typeof m!="function")throw Error(t(191,m));m.call(u)}}}var ko={},yi=rr(ko),zo=rr(ko),Bo=rr(ko);function Vr(n){if(n===ko)throw Error(t(174));return n}function hu(n,r){switch(Dt(Bo,r),Dt(zo,n),Dt(yi,ko),n=r.nodeType,n){case 9:case 11:r=(r=r.documentElement)?r.namespaceURI:He(null,"");break;default:n=n===8?r.parentNode:r,r=n.namespaceURI||null,n=n.tagName,r=He(r,n)}It(yi),Dt(yi,r)}function As(){It(yi),It(zo),It(Bo)}function Oh(n){Vr(Bo.current);var r=Vr(yi.current),a=He(r,n.type);r!==a&&(Dt(zo,n),Dt(yi,a))}function pu(n){zo.current===n&&(It(yi),It(zo))}var Vt=rr(0);function qa(n){for(var r=n;r!==null;){if(r.tag===13){var a=r.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||a.data==="$?"||a.data==="$!"))return r}else if(r.tag===19&&r.memoizedProps.revealOrder!==void 0){if(r.flags&128)return r}else if(r.child!==null){r.child.return=r,r=r.child;continue}if(r===n)break;for(;r.sibling===null;){if(r.return===null||r.return===n)return null;r=r.return}r.sibling.return=r.return,r=r.sibling}return null}var mu=[];function gu(){for(var n=0;n<mu.length;n++)mu[n]._workInProgressVersionPrimary=null;mu.length=0}var Ka=P.ReactCurrentDispatcher,vu=P.ReactCurrentBatchConfig,Gr=0,Gt=null,en=null,an=null,Ja=!1,Ho=!1,Vo=0,xx=0;function gn(){throw Error(t(321))}function xu(n,r){if(r===null)return!1;for(var a=0;a<r.length&&a<n.length;a++)if(!oi(n[a],r[a]))return!1;return!0}function _u(n,r,a,u,m,_){if(Gr=_,Gt=r,r.memoizedState=null,r.updateQueue=null,r.lanes=0,Ka.current=n===null||n.memoizedState===null?Mx:Ex,n=a(u,m),Ho){_=0;do{if(Ho=!1,Vo=0,25<=_)throw Error(t(301));_+=1,an=en=null,r.updateQueue=null,Ka.current=wx,n=a(u,m)}while(Ho)}if(Ka.current=el,r=en!==null&&en.next!==null,Gr=0,an=en=Gt=null,Ja=!1,r)throw Error(t(300));return n}function yu(){var n=Vo!==0;return Vo=0,n}function Si(){var n={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return an===null?Gt.memoizedState=an=n:an=an.next=n,an}function Qn(){if(en===null){var n=Gt.alternate;n=n!==null?n.memoizedState:null}else n=en.next;var r=an===null?Gt.memoizedState:an.next;if(r!==null)an=r,en=n;else{if(n===null)throw Error(t(310));en=n,n={memoizedState:en.memoizedState,baseState:en.baseState,baseQueue:en.baseQueue,queue:en.queue,next:null},an===null?Gt.memoizedState=an=n:an=an.next=n}return an}function Go(n,r){return typeof r=="function"?r(n):r}function Su(n){var r=Qn(),a=r.queue;if(a===null)throw Error(t(311));a.lastRenderedReducer=n;var u=en,m=u.baseQueue,_=a.pending;if(_!==null){if(m!==null){var T=m.next;m.next=_.next,_.next=T}u.baseQueue=m=_,a.pending=null}if(m!==null){_=m.next,u=u.baseState;var k=T=null,W=null,ue=_;do{var Te=ue.lane;if((Gr&Te)===Te)W!==null&&(W=W.next={lane:0,action:ue.action,hasEagerState:ue.hasEagerState,eagerState:ue.eagerState,next:null}),u=ue.hasEagerState?ue.eagerState:n(u,ue.action);else{var Ce={lane:Te,action:ue.action,hasEagerState:ue.hasEagerState,eagerState:ue.eagerState,next:null};W===null?(k=W=Ce,T=u):W=W.next=Ce,Gt.lanes|=Te,Wr|=Te}ue=ue.next}while(ue!==null&&ue!==_);W===null?T=u:W.next=k,oi(u,r.memoizedState)||(Un=!0),r.memoizedState=u,r.baseState=T,r.baseQueue=W,a.lastRenderedState=u}if(n=a.interleaved,n!==null){m=n;do _=m.lane,Gt.lanes|=_,Wr|=_,m=m.next;while(m!==n)}else m===null&&(a.lanes=0);return[r.memoizedState,a.dispatch]}function Mu(n){var r=Qn(),a=r.queue;if(a===null)throw Error(t(311));a.lastRenderedReducer=n;var u=a.dispatch,m=a.pending,_=r.memoizedState;if(m!==null){a.pending=null;var T=m=m.next;do _=n(_,T.action),T=T.next;while(T!==m);oi(_,r.memoizedState)||(Un=!0),r.memoizedState=_,r.baseQueue===null&&(r.baseState=_),a.lastRenderedState=_}return[_,u]}function Fh(){}function kh(n,r){var a=Gt,u=Qn(),m=r(),_=!oi(u.memoizedState,m);if(_&&(u.memoizedState=m,Un=!0),u=u.queue,Eu(Hh.bind(null,a,u,n),[n]),u.getSnapshot!==r||_||an!==null&&an.memoizedState.tag&1){if(a.flags|=2048,Wo(9,Bh.bind(null,a,u,m,r),void 0,null),ln===null)throw Error(t(349));Gr&30||zh(a,r,m)}return m}function zh(n,r,a){n.flags|=16384,n={getSnapshot:r,value:a},r=Gt.updateQueue,r===null?(r={lastEffect:null,stores:null},Gt.updateQueue=r,r.stores=[n]):(a=r.stores,a===null?r.stores=[n]:a.push(n))}function Bh(n,r,a,u){r.value=a,r.getSnapshot=u,Vh(r)&&Gh(n)}function Hh(n,r,a){return a(function(){Vh(r)&&Gh(n)})}function Vh(n){var r=n.getSnapshot;n=n.value;try{var a=r();return!oi(n,a)}catch{return!0}}function Gh(n){var r=Ii(n,1);r!==null&&di(r,n,1,-1)}function Wh(n){var r=Si();return typeof n=="function"&&(n=n()),r.memoizedState=r.baseState=n,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Go,lastRenderedState:n},r.queue=n,n=n.dispatch=Sx.bind(null,Gt,n),[r.memoizedState,n]}function Wo(n,r,a,u){return n={tag:n,create:r,destroy:a,deps:u,next:null},r=Gt.updateQueue,r===null?(r={lastEffect:null,stores:null},Gt.updateQueue=r,r.lastEffect=n.next=n):(a=r.lastEffect,a===null?r.lastEffect=n.next=n:(u=a.next,a.next=n,n.next=u,r.lastEffect=n)),n}function jh(){return Qn().memoizedState}function Za(n,r,a,u){var m=Si();Gt.flags|=n,m.memoizedState=Wo(1|r,a,void 0,u===void 0?null:u)}function Qa(n,r,a,u){var m=Qn();u=u===void 0?null:u;var _=void 0;if(en!==null){var T=en.memoizedState;if(_=T.destroy,u!==null&&xu(u,T.deps)){m.memoizedState=Wo(r,a,_,u);return}}Gt.flags|=n,m.memoizedState=Wo(1|r,a,_,u)}function Xh(n,r){return Za(8390656,8,n,r)}function Eu(n,r){return Qa(2048,8,n,r)}function $h(n,r){return Qa(4,2,n,r)}function Yh(n,r){return Qa(4,4,n,r)}function qh(n,r){if(typeof r=="function")return n=n(),r(n),function(){r(null)};if(r!=null)return n=n(),r.current=n,function(){r.current=null}}function Kh(n,r,a){return a=a!=null?a.concat([n]):null,Qa(4,4,qh.bind(null,r,n),a)}function wu(){}function Jh(n,r){var a=Qn();r=r===void 0?null:r;var u=a.memoizedState;return u!==null&&r!==null&&xu(r,u[1])?u[0]:(a.memoizedState=[n,r],n)}function Zh(n,r){var a=Qn();r=r===void 0?null:r;var u=a.memoizedState;return u!==null&&r!==null&&xu(r,u[1])?u[0]:(n=n(),a.memoizedState=[n,r],n)}function Qh(n,r,a){return Gr&21?(oi(a,r)||(a=Sa(),Gt.lanes|=a,Wr|=a,n.baseState=!0),r):(n.baseState&&(n.baseState=!1,Un=!0),n.memoizedState=a)}function _x(n,r){var a=Pt;Pt=a!==0&&4>a?a:4,n(!0);var u=vu.transition;vu.transition={};try{n(!1),r()}finally{Pt=a,vu.transition=u}}function ep(){return Qn().memoizedState}function yx(n,r,a){var u=fr(n);if(a={lane:u,action:a,hasEagerState:!1,eagerState:null,next:null},tp(n))np(r,a);else if(a=Nh(n,r,a,u),a!==null){var m=Tn();di(a,n,u,m),ip(a,r,u)}}function Sx(n,r,a){var u=fr(n),m={lane:u,action:a,hasEagerState:!1,eagerState:null,next:null};if(tp(n))np(r,m);else{var _=n.alternate;if(n.lanes===0&&(_===null||_.lanes===0)&&(_=r.lastRenderedReducer,_!==null))try{var T=r.lastRenderedState,k=_(T,a);if(m.hasEagerState=!0,m.eagerState=k,oi(k,T)){var W=r.interleaved;W===null?(m.next=m,du(r)):(m.next=W.next,W.next=m),r.interleaved=m;return}}catch{}finally{}a=Nh(n,r,m,u),a!==null&&(m=Tn(),di(a,n,u,m),ip(a,r,u))}}function tp(n){var r=n.alternate;return n===Gt||r!==null&&r===Gt}function np(n,r){Ho=Ja=!0;var a=n.pending;a===null?r.next=r:(r.next=a.next,a.next=r),n.pending=r}function ip(n,r,a){if(a&4194240){var u=r.lanes;u&=n.pendingLanes,a|=u,r.lanes=a,bc(n,a)}}var el={readContext:Zn,useCallback:gn,useContext:gn,useEffect:gn,useImperativeHandle:gn,useInsertionEffect:gn,useLayoutEffect:gn,useMemo:gn,useReducer:gn,useRef:gn,useState:gn,useDebugValue:gn,useDeferredValue:gn,useTransition:gn,useMutableSource:gn,useSyncExternalStore:gn,useId:gn,unstable_isNewReconciler:!1},Mx={readContext:Zn,useCallback:function(n,r){return Si().memoizedState=[n,r===void 0?null:r],n},useContext:Zn,useEffect:Xh,useImperativeHandle:function(n,r,a){return a=a!=null?a.concat([n]):null,Za(4194308,4,qh.bind(null,r,n),a)},useLayoutEffect:function(n,r){return Za(4194308,4,n,r)},useInsertionEffect:function(n,r){return Za(4,2,n,r)},useMemo:function(n,r){var a=Si();return r=r===void 0?null:r,n=n(),a.memoizedState=[n,r],n},useReducer:function(n,r,a){var u=Si();return r=a!==void 0?a(r):r,u.memoizedState=u.baseState=r,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:n,lastRenderedState:r},u.queue=n,n=n.dispatch=yx.bind(null,Gt,n),[u.memoizedState,n]},useRef:function(n){var r=Si();return n={current:n},r.memoizedState=n},useState:Wh,useDebugValue:wu,useDeferredValue:function(n){return Si().memoizedState=n},useTransition:function(){var n=Wh(!1),r=n[0];return n=_x.bind(null,n[1]),Si().memoizedState=n,[r,n]},useMutableSource:function(){},useSyncExternalStore:function(n,r,a){var u=Gt,m=Si();if(zt){if(a===void 0)throw Error(t(407));a=a()}else{if(a=r(),ln===null)throw Error(t(349));Gr&30||zh(u,r,a)}m.memoizedState=a;var _={value:a,getSnapshot:r};return m.queue=_,Xh(Hh.bind(null,u,_,n),[n]),u.flags|=2048,Wo(9,Bh.bind(null,u,_,a,r),void 0,null),a},useId:function(){var n=Si(),r=ln.identifierPrefix;if(zt){var a=Ui,u=Di;a=(u&~(1<<32-En(u)-1)).toString(32)+a,r=":"+r+"R"+a,a=Vo++,0<a&&(r+="H"+a.toString(32)),r+=":"}else a=xx++,r=":"+r+"r"+a.toString(32)+":";return n.memoizedState=r},unstable_isNewReconciler:!1},Ex={readContext:Zn,useCallback:Jh,useContext:Zn,useEffect:Eu,useImperativeHandle:Kh,useInsertionEffect:$h,useLayoutEffect:Yh,useMemo:Zh,useReducer:Su,useRef:jh,useState:function(){return Su(Go)},useDebugValue:wu,useDeferredValue:function(n){var r=Qn();return Qh(r,en.memoizedState,n)},useTransition:function(){var n=Su(Go)[0],r=Qn().memoizedState;return[n,r]},useMutableSource:Fh,useSyncExternalStore:kh,useId:ep,unstable_isNewReconciler:!1},wx={readContext:Zn,useCallback:Jh,useContext:Zn,useEffect:Eu,useImperativeHandle:Kh,useInsertionEffect:$h,useLayoutEffect:Yh,useMemo:Zh,useReducer:Mu,useRef:jh,useState:function(){return Mu(Go)},useDebugValue:wu,useDeferredValue:function(n){var r=Qn();return en===null?r.memoizedState=n:Qh(r,en.memoizedState,n)},useTransition:function(){var n=Mu(Go)[0],r=Qn().memoizedState;return[n,r]},useMutableSource:Fh,useSyncExternalStore:kh,useId:ep,unstable_isNewReconciler:!1};function li(n,r){if(n&&n.defaultProps){r=Y({},r),n=n.defaultProps;for(var a in n)r[a]===void 0&&(r[a]=n[a]);return r}return r}function Tu(n,r,a,u){r=n.memoizedState,a=a(u,r),a=a==null?r:Y({},r,a),n.memoizedState=a,n.lanes===0&&(n.updateQueue.baseState=a)}var tl={isMounted:function(n){return(n=n._reactInternals)?Ri(n)===n:!1},enqueueSetState:function(n,r,a){n=n._reactInternals;var u=Tn(),m=fr(n),_=Oi(u,m);_.payload=r,a!=null&&(_.callback=a),r=lr(n,_,m),r!==null&&(di(r,n,m,u),$a(r,n,m))},enqueueReplaceState:function(n,r,a){n=n._reactInternals;var u=Tn(),m=fr(n),_=Oi(u,m);_.tag=1,_.payload=r,a!=null&&(_.callback=a),r=lr(n,_,m),r!==null&&(di(r,n,m,u),$a(r,n,m))},enqueueForceUpdate:function(n,r){n=n._reactInternals;var a=Tn(),u=fr(n),m=Oi(a,u);m.tag=2,r!=null&&(m.callback=r),r=lr(n,m,u),r!==null&&(di(r,n,u,a),$a(r,n,u))}};function rp(n,r,a,u,m,_,T){return n=n.stateNode,typeof n.shouldComponentUpdate=="function"?n.shouldComponentUpdate(u,_,T):r.prototype&&r.prototype.isPureReactComponent?!Po(a,u)||!Po(m,_):!0}function sp(n,r,a){var u=!1,m=sr,_=r.contextType;return typeof _=="object"&&_!==null?_=Zn(_):(m=Dn(r)?kr:mn.current,u=r.contextTypes,_=(u=u!=null)?ys(n,m):sr),r=new r(a,_),n.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,r.updater=tl,n.stateNode=r,r._reactInternals=n,u&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=m,n.__reactInternalMemoizedMaskedChildContext=_),r}function op(n,r,a,u){n=r.state,typeof r.componentWillReceiveProps=="function"&&r.componentWillReceiveProps(a,u),typeof r.UNSAFE_componentWillReceiveProps=="function"&&r.UNSAFE_componentWillReceiveProps(a,u),r.state!==n&&tl.enqueueReplaceState(r,r.state,null)}function bu(n,r,a,u){var m=n.stateNode;m.props=a,m.state=n.memoizedState,m.refs={},fu(n);var _=r.contextType;typeof _=="object"&&_!==null?m.context=Zn(_):(_=Dn(r)?kr:mn.current,m.context=ys(n,_)),m.state=n.memoizedState,_=r.getDerivedStateFromProps,typeof _=="function"&&(Tu(n,r,_,a),m.state=n.memoizedState),typeof r.getDerivedStateFromProps=="function"||typeof m.getSnapshotBeforeUpdate=="function"||typeof m.UNSAFE_componentWillMount!="function"&&typeof m.componentWillMount!="function"||(r=m.state,typeof m.componentWillMount=="function"&&m.componentWillMount(),typeof m.UNSAFE_componentWillMount=="function"&&m.UNSAFE_componentWillMount(),r!==m.state&&tl.enqueueReplaceState(m,m.state,null),Ya(n,a,m,u),m.state=n.memoizedState),typeof m.componentDidMount=="function"&&(n.flags|=4194308)}function Cs(n,r){try{var a="",u=r;do a+=me(u),u=u.return;while(u);var m=a}catch(_){m=`
Error generating stack: `+_.message+`
`+_.stack}return{value:n,source:r,stack:m,digest:null}}function Au(n,r,a){return{value:n,source:null,stack:a??null,digest:r??null}}function Cu(n,r){try{console.error(r.value)}catch(a){setTimeout(function(){throw a})}}var Tx=typeof WeakMap=="function"?WeakMap:Map;function ap(n,r,a){a=Oi(-1,a),a.tag=3,a.payload={element:null};var u=r.value;return a.callback=function(){ll||(ll=!0,Gu=u),Cu(n,r)},a}function lp(n,r,a){a=Oi(-1,a),a.tag=3;var u=n.type.getDerivedStateFromError;if(typeof u=="function"){var m=r.value;a.payload=function(){return u(m)},a.callback=function(){Cu(n,r)}}var _=n.stateNode;return _!==null&&typeof _.componentDidCatch=="function"&&(a.callback=function(){Cu(n,r),typeof u!="function"&&(ur===null?ur=new Set([this]):ur.add(this));var T=r.stack;this.componentDidCatch(r.value,{componentStack:T!==null?T:""})}),a}function cp(n,r,a){var u=n.pingCache;if(u===null){u=n.pingCache=new Tx;var m=new Set;u.set(r,m)}else m=u.get(r),m===void 0&&(m=new Set,u.set(r,m));m.has(a)||(m.add(a),n=zx.bind(null,n,r,a),r.then(n,n))}function up(n){do{var r;if((r=n.tag===13)&&(r=n.memoizedState,r=r!==null?r.dehydrated!==null:!0),r)return n;n=n.return}while(n!==null);return null}function dp(n,r,a,u,m){return n.mode&1?(n.flags|=65536,n.lanes=m,n):(n===r?n.flags|=65536:(n.flags|=128,a.flags|=131072,a.flags&=-52805,a.tag===1&&(a.alternate===null?a.tag=17:(r=Oi(-1,1),r.tag=2,lr(a,r,1))),a.lanes|=1),n)}var bx=P.ReactCurrentOwner,Un=!1;function wn(n,r,a,u){r.child=n===null?Lh(r,null,a,u):ws(r,n.child,a,u)}function fp(n,r,a,u,m){a=a.render;var _=r.ref;return bs(r,m),u=_u(n,r,a,u,_,m),a=yu(),n!==null&&!Un?(r.updateQueue=n.updateQueue,r.flags&=-2053,n.lanes&=~m,Fi(n,r,m)):(zt&&a&&nu(r),r.flags|=1,wn(n,r,u,m),r.child)}function hp(n,r,a,u,m){if(n===null){var _=a.type;return typeof _=="function"&&!Ku(_)&&_.defaultProps===void 0&&a.compare===null&&a.defaultProps===void 0?(r.tag=15,r.type=_,pp(n,r,_,u,m)):(n=pl(a.type,null,u,r,r.mode,m),n.ref=r.ref,n.return=r,r.child=n)}if(_=n.child,!(n.lanes&m)){var T=_.memoizedProps;if(a=a.compare,a=a!==null?a:Po,a(T,u)&&n.ref===r.ref)return Fi(n,r,m)}return r.flags|=1,n=pr(_,u),n.ref=r.ref,n.return=r,r.child=n}function pp(n,r,a,u,m){if(n!==null){var _=n.memoizedProps;if(Po(_,u)&&n.ref===r.ref)if(Un=!1,r.pendingProps=u=_,(n.lanes&m)!==0)n.flags&131072&&(Un=!0);else return r.lanes=n.lanes,Fi(n,r,m)}return Ru(n,r,a,u,m)}function mp(n,r,a){var u=r.pendingProps,m=u.children,_=n!==null?n.memoizedState:null;if(u.mode==="hidden")if(!(r.mode&1))r.memoizedState={baseLanes:0,cachePool:null,transitions:null},Dt(Ps,Wn),Wn|=a;else{if(!(a&1073741824))return n=_!==null?_.baseLanes|a:a,r.lanes=r.childLanes=1073741824,r.memoizedState={baseLanes:n,cachePool:null,transitions:null},r.updateQueue=null,Dt(Ps,Wn),Wn|=n,null;r.memoizedState={baseLanes:0,cachePool:null,transitions:null},u=_!==null?_.baseLanes:a,Dt(Ps,Wn),Wn|=u}else _!==null?(u=_.baseLanes|a,r.memoizedState=null):u=a,Dt(Ps,Wn),Wn|=u;return wn(n,r,m,a),r.child}function gp(n,r){var a=r.ref;(n===null&&a!==null||n!==null&&n.ref!==a)&&(r.flags|=512,r.flags|=2097152)}function Ru(n,r,a,u,m){var _=Dn(a)?kr:mn.current;return _=ys(r,_),bs(r,m),a=_u(n,r,a,u,_,m),u=yu(),n!==null&&!Un?(r.updateQueue=n.updateQueue,r.flags&=-2053,n.lanes&=~m,Fi(n,r,m)):(zt&&u&&nu(r),r.flags|=1,wn(n,r,a,m),r.child)}function vp(n,r,a,u,m){if(Dn(a)){var _=!0;za(r)}else _=!1;if(bs(r,m),r.stateNode===null)il(n,r),sp(r,a,u),bu(r,a,u,m),u=!0;else if(n===null){var T=r.stateNode,k=r.memoizedProps;T.props=k;var W=T.context,ue=a.contextType;typeof ue=="object"&&ue!==null?ue=Zn(ue):(ue=Dn(a)?kr:mn.current,ue=ys(r,ue));var Te=a.getDerivedStateFromProps,Ce=typeof Te=="function"||typeof T.getSnapshotBeforeUpdate=="function";Ce||typeof T.UNSAFE_componentWillReceiveProps!="function"&&typeof T.componentWillReceiveProps!="function"||(k!==u||W!==ue)&&op(r,T,u,ue),ar=!1;var Ee=r.memoizedState;T.state=Ee,Ya(r,u,T,m),W=r.memoizedState,k!==u||Ee!==W||Nn.current||ar?(typeof Te=="function"&&(Tu(r,a,Te,u),W=r.memoizedState),(k=ar||rp(r,a,k,u,Ee,W,ue))?(Ce||typeof T.UNSAFE_componentWillMount!="function"&&typeof T.componentWillMount!="function"||(typeof T.componentWillMount=="function"&&T.componentWillMount(),typeof T.UNSAFE_componentWillMount=="function"&&T.UNSAFE_componentWillMount()),typeof T.componentDidMount=="function"&&(r.flags|=4194308)):(typeof T.componentDidMount=="function"&&(r.flags|=4194308),r.memoizedProps=u,r.memoizedState=W),T.props=u,T.state=W,T.context=ue,u=k):(typeof T.componentDidMount=="function"&&(r.flags|=4194308),u=!1)}else{T=r.stateNode,Dh(n,r),k=r.memoizedProps,ue=r.type===r.elementType?k:li(r.type,k),T.props=ue,Ce=r.pendingProps,Ee=T.context,W=a.contextType,typeof W=="object"&&W!==null?W=Zn(W):(W=Dn(a)?kr:mn.current,W=ys(r,W));var We=a.getDerivedStateFromProps;(Te=typeof We=="function"||typeof T.getSnapshotBeforeUpdate=="function")||typeof T.UNSAFE_componentWillReceiveProps!="function"&&typeof T.componentWillReceiveProps!="function"||(k!==Ce||Ee!==W)&&op(r,T,u,W),ar=!1,Ee=r.memoizedState,T.state=Ee,Ya(r,u,T,m);var Ke=r.memoizedState;k!==Ce||Ee!==Ke||Nn.current||ar?(typeof We=="function"&&(Tu(r,a,We,u),Ke=r.memoizedState),(ue=ar||rp(r,a,ue,u,Ee,Ke,W)||!1)?(Te||typeof T.UNSAFE_componentWillUpdate!="function"&&typeof T.componentWillUpdate!="function"||(typeof T.componentWillUpdate=="function"&&T.componentWillUpdate(u,Ke,W),typeof T.UNSAFE_componentWillUpdate=="function"&&T.UNSAFE_componentWillUpdate(u,Ke,W)),typeof T.componentDidUpdate=="function"&&(r.flags|=4),typeof T.getSnapshotBeforeUpdate=="function"&&(r.flags|=1024)):(typeof T.componentDidUpdate!="function"||k===n.memoizedProps&&Ee===n.memoizedState||(r.flags|=4),typeof T.getSnapshotBeforeUpdate!="function"||k===n.memoizedProps&&Ee===n.memoizedState||(r.flags|=1024),r.memoizedProps=u,r.memoizedState=Ke),T.props=u,T.state=Ke,T.context=W,u=ue):(typeof T.componentDidUpdate!="function"||k===n.memoizedProps&&Ee===n.memoizedState||(r.flags|=4),typeof T.getSnapshotBeforeUpdate!="function"||k===n.memoizedProps&&Ee===n.memoizedState||(r.flags|=1024),u=!1)}return Pu(n,r,a,u,_,m)}function Pu(n,r,a,u,m,_){gp(n,r);var T=(r.flags&128)!==0;if(!u&&!T)return m&&Mh(r,a,!1),Fi(n,r,_);u=r.stateNode,bx.current=r;var k=T&&typeof a.getDerivedStateFromError!="function"?null:u.render();return r.flags|=1,n!==null&&T?(r.child=ws(r,n.child,null,_),r.child=ws(r,null,k,_)):wn(n,r,k,_),r.memoizedState=u.state,m&&Mh(r,a,!0),r.child}function xp(n){var r=n.stateNode;r.pendingContext?yh(n,r.pendingContext,r.pendingContext!==r.context):r.context&&yh(n,r.context,!1),hu(n,r.containerInfo)}function _p(n,r,a,u,m){return Es(),ou(m),r.flags|=256,wn(n,r,a,u),r.child}var Lu={dehydrated:null,treeContext:null,retryLane:0};function Nu(n){return{baseLanes:n,cachePool:null,transitions:null}}function yp(n,r,a){var u=r.pendingProps,m=Vt.current,_=!1,T=(r.flags&128)!==0,k;if((k=T)||(k=n!==null&&n.memoizedState===null?!1:(m&2)!==0),k?(_=!0,r.flags&=-129):(n===null||n.memoizedState!==null)&&(m|=1),Dt(Vt,m&1),n===null)return su(r),n=r.memoizedState,n!==null&&(n=n.dehydrated,n!==null)?(r.mode&1?n.data==="$!"?r.lanes=8:r.lanes=1073741824:r.lanes=1,null):(T=u.children,n=u.fallback,_?(u=r.mode,_=r.child,T={mode:"hidden",children:T},!(u&1)&&_!==null?(_.childLanes=0,_.pendingProps=T):_=ml(T,u,0,null),n=Yr(n,u,a,null),_.return=r,n.return=r,_.sibling=n,r.child=_,r.child.memoizedState=Nu(a),r.memoizedState=Lu,n):Du(r,T));if(m=n.memoizedState,m!==null&&(k=m.dehydrated,k!==null))return Ax(n,r,T,u,k,m,a);if(_){_=u.fallback,T=r.mode,m=n.child,k=m.sibling;var W={mode:"hidden",children:u.children};return!(T&1)&&r.child!==m?(u=r.child,u.childLanes=0,u.pendingProps=W,r.deletions=null):(u=pr(m,W),u.subtreeFlags=m.subtreeFlags&14680064),k!==null?_=pr(k,_):(_=Yr(_,T,a,null),_.flags|=2),_.return=r,u.return=r,u.sibling=_,r.child=u,u=_,_=r.child,T=n.child.memoizedState,T=T===null?Nu(a):{baseLanes:T.baseLanes|a,cachePool:null,transitions:T.transitions},_.memoizedState=T,_.childLanes=n.childLanes&~a,r.memoizedState=Lu,u}return _=n.child,n=_.sibling,u=pr(_,{mode:"visible",children:u.children}),!(r.mode&1)&&(u.lanes=a),u.return=r,u.sibling=null,n!==null&&(a=r.deletions,a===null?(r.deletions=[n],r.flags|=16):a.push(n)),r.child=u,r.memoizedState=null,u}function Du(n,r){return r=ml({mode:"visible",children:r},n.mode,0,null),r.return=n,n.child=r}function nl(n,r,a,u){return u!==null&&ou(u),ws(r,n.child,null,a),n=Du(r,r.pendingProps.children),n.flags|=2,r.memoizedState=null,n}function Ax(n,r,a,u,m,_,T){if(a)return r.flags&256?(r.flags&=-257,u=Au(Error(t(422))),nl(n,r,T,u)):r.memoizedState!==null?(r.child=n.child,r.flags|=128,null):(_=u.fallback,m=r.mode,u=ml({mode:"visible",children:u.children},m,0,null),_=Yr(_,m,T,null),_.flags|=2,u.return=r,_.return=r,u.sibling=_,r.child=u,r.mode&1&&ws(r,n.child,null,T),r.child.memoizedState=Nu(T),r.memoizedState=Lu,_);if(!(r.mode&1))return nl(n,r,T,null);if(m.data==="$!"){if(u=m.nextSibling&&m.nextSibling.dataset,u)var k=u.dgst;return u=k,_=Error(t(419)),u=Au(_,u,void 0),nl(n,r,T,u)}if(k=(T&n.childLanes)!==0,Un||k){if(u=ln,u!==null){switch(T&-T){case 4:m=2;break;case 16:m=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:m=32;break;case 536870912:m=268435456;break;default:m=0}m=m&(u.suspendedLanes|T)?0:m,m!==0&&m!==_.retryLane&&(_.retryLane=m,Ii(n,m),di(u,n,m,-1))}return qu(),u=Au(Error(t(421))),nl(n,r,T,u)}return m.data==="$?"?(r.flags|=128,r.child=n.child,r=Bx.bind(null,n),m._reactRetry=r,null):(n=_.treeContext,Gn=ir(m.nextSibling),Vn=r,zt=!0,ai=null,n!==null&&(Kn[Jn++]=Di,Kn[Jn++]=Ui,Kn[Jn++]=zr,Di=n.id,Ui=n.overflow,zr=r),r=Du(r,u.children),r.flags|=4096,r)}function Sp(n,r,a){n.lanes|=r;var u=n.alternate;u!==null&&(u.lanes|=r),uu(n.return,r,a)}function Uu(n,r,a,u,m){var _=n.memoizedState;_===null?n.memoizedState={isBackwards:r,rendering:null,renderingStartTime:0,last:u,tail:a,tailMode:m}:(_.isBackwards=r,_.rendering=null,_.renderingStartTime=0,_.last=u,_.tail=a,_.tailMode=m)}function Mp(n,r,a){var u=r.pendingProps,m=u.revealOrder,_=u.tail;if(wn(n,r,u.children,a),u=Vt.current,u&2)u=u&1|2,r.flags|=128;else{if(n!==null&&n.flags&128)e:for(n=r.child;n!==null;){if(n.tag===13)n.memoizedState!==null&&Sp(n,a,r);else if(n.tag===19)Sp(n,a,r);else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===r)break e;for(;n.sibling===null;){if(n.return===null||n.return===r)break e;n=n.return}n.sibling.return=n.return,n=n.sibling}u&=1}if(Dt(Vt,u),!(r.mode&1))r.memoizedState=null;else switch(m){case"forwards":for(a=r.child,m=null;a!==null;)n=a.alternate,n!==null&&qa(n)===null&&(m=a),a=a.sibling;a=m,a===null?(m=r.child,r.child=null):(m=a.sibling,a.sibling=null),Uu(r,!1,m,a,_);break;case"backwards":for(a=null,m=r.child,r.child=null;m!==null;){if(n=m.alternate,n!==null&&qa(n)===null){r.child=m;break}n=m.sibling,m.sibling=a,a=m,m=n}Uu(r,!0,a,null,_);break;case"together":Uu(r,!1,null,null,void 0);break;default:r.memoizedState=null}return r.child}function il(n,r){!(r.mode&1)&&n!==null&&(n.alternate=null,r.alternate=null,r.flags|=2)}function Fi(n,r,a){if(n!==null&&(r.dependencies=n.dependencies),Wr|=r.lanes,!(a&r.childLanes))return null;if(n!==null&&r.child!==n.child)throw Error(t(153));if(r.child!==null){for(n=r.child,a=pr(n,n.pendingProps),r.child=a,a.return=r;n.sibling!==null;)n=n.sibling,a=a.sibling=pr(n,n.pendingProps),a.return=r;a.sibling=null}return r.child}function Cx(n,r,a){switch(r.tag){case 3:xp(r),Es();break;case 5:Oh(r);break;case 1:Dn(r.type)&&za(r);break;case 4:hu(r,r.stateNode.containerInfo);break;case 10:var u=r.type._context,m=r.memoizedProps.value;Dt(ja,u._currentValue),u._currentValue=m;break;case 13:if(u=r.memoizedState,u!==null)return u.dehydrated!==null?(Dt(Vt,Vt.current&1),r.flags|=128,null):a&r.child.childLanes?yp(n,r,a):(Dt(Vt,Vt.current&1),n=Fi(n,r,a),n!==null?n.sibling:null);Dt(Vt,Vt.current&1);break;case 19:if(u=(a&r.childLanes)!==0,n.flags&128){if(u)return Mp(n,r,a);r.flags|=128}if(m=r.memoizedState,m!==null&&(m.rendering=null,m.tail=null,m.lastEffect=null),Dt(Vt,Vt.current),u)break;return null;case 22:case 23:return r.lanes=0,mp(n,r,a)}return Fi(n,r,a)}var Ep,Iu,wp,Tp;Ep=function(n,r){for(var a=r.child;a!==null;){if(a.tag===5||a.tag===6)n.appendChild(a.stateNode);else if(a.tag!==4&&a.child!==null){a.child.return=a,a=a.child;continue}if(a===r)break;for(;a.sibling===null;){if(a.return===null||a.return===r)return;a=a.return}a.sibling.return=a.return,a=a.sibling}},Iu=function(){},wp=function(n,r,a,u){var m=n.memoizedProps;if(m!==u){n=r.stateNode,Vr(yi.current);var _=null;switch(a){case"input":m=ke(n,m),u=ke(n,u),_=[];break;case"select":m=Y({},m,{value:void 0}),u=Y({},u,{value:void 0}),_=[];break;case"textarea":m=we(n,m),u=we(n,u),_=[];break;default:typeof m.onClick!="function"&&typeof u.onClick=="function"&&(n.onclick=Oa)}$e(a,u);var T;a=null;for(ue in m)if(!u.hasOwnProperty(ue)&&m.hasOwnProperty(ue)&&m[ue]!=null)if(ue==="style"){var k=m[ue];for(T in k)k.hasOwnProperty(T)&&(a||(a={}),a[T]="")}else ue!=="dangerouslySetInnerHTML"&&ue!=="children"&&ue!=="suppressContentEditableWarning"&&ue!=="suppressHydrationWarning"&&ue!=="autoFocus"&&(o.hasOwnProperty(ue)?_||(_=[]):(_=_||[]).push(ue,null));for(ue in u){var W=u[ue];if(k=m!=null?m[ue]:void 0,u.hasOwnProperty(ue)&&W!==k&&(W!=null||k!=null))if(ue==="style")if(k){for(T in k)!k.hasOwnProperty(T)||W&&W.hasOwnProperty(T)||(a||(a={}),a[T]="");for(T in W)W.hasOwnProperty(T)&&k[T]!==W[T]&&(a||(a={}),a[T]=W[T])}else a||(_||(_=[]),_.push(ue,a)),a=W;else ue==="dangerouslySetInnerHTML"?(W=W?W.__html:void 0,k=k?k.__html:void 0,W!=null&&k!==W&&(_=_||[]).push(ue,W)):ue==="children"?typeof W!="string"&&typeof W!="number"||(_=_||[]).push(ue,""+W):ue!=="suppressContentEditableWarning"&&ue!=="suppressHydrationWarning"&&(o.hasOwnProperty(ue)?(W!=null&&ue==="onScroll"&&Ut("scroll",n),_||k===W||(_=[])):(_=_||[]).push(ue,W))}a&&(_=_||[]).push("style",a);var ue=_;(r.updateQueue=ue)&&(r.flags|=4)}},Tp=function(n,r,a,u){a!==u&&(r.flags|=4)};function jo(n,r){if(!zt)switch(n.tailMode){case"hidden":r=n.tail;for(var a=null;r!==null;)r.alternate!==null&&(a=r),r=r.sibling;a===null?n.tail=null:a.sibling=null;break;case"collapsed":a=n.tail;for(var u=null;a!==null;)a.alternate!==null&&(u=a),a=a.sibling;u===null?r||n.tail===null?n.tail=null:n.tail.sibling=null:u.sibling=null}}function vn(n){var r=n.alternate!==null&&n.alternate.child===n.child,a=0,u=0;if(r)for(var m=n.child;m!==null;)a|=m.lanes|m.childLanes,u|=m.subtreeFlags&14680064,u|=m.flags&14680064,m.return=n,m=m.sibling;else for(m=n.child;m!==null;)a|=m.lanes|m.childLanes,u|=m.subtreeFlags,u|=m.flags,m.return=n,m=m.sibling;return n.subtreeFlags|=u,n.childLanes=a,r}function Rx(n,r,a){var u=r.pendingProps;switch(iu(r),r.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return vn(r),null;case 1:return Dn(r.type)&&ka(),vn(r),null;case 3:return u=r.stateNode,As(),It(Nn),It(mn),gu(),u.pendingContext&&(u.context=u.pendingContext,u.pendingContext=null),(n===null||n.child===null)&&(Ga(r)?r.flags|=4:n===null||n.memoizedState.isDehydrated&&!(r.flags&256)||(r.flags|=1024,ai!==null&&(Xu(ai),ai=null))),Iu(n,r),vn(r),null;case 5:pu(r);var m=Vr(Bo.current);if(a=r.type,n!==null&&r.stateNode!=null)wp(n,r,a,u,m),n.ref!==r.ref&&(r.flags|=512,r.flags|=2097152);else{if(!u){if(r.stateNode===null)throw Error(t(166));return vn(r),null}if(n=Vr(yi.current),Ga(r)){u=r.stateNode,a=r.type;var _=r.memoizedProps;switch(u[_i]=r,u[Io]=_,n=(r.mode&1)!==0,a){case"dialog":Ut("cancel",u),Ut("close",u);break;case"iframe":case"object":case"embed":Ut("load",u);break;case"video":case"audio":for(m=0;m<No.length;m++)Ut(No[m],u);break;case"source":Ut("error",u);break;case"img":case"image":case"link":Ut("error",u),Ut("load",u);break;case"details":Ut("toggle",u);break;case"input":Qe(u,_),Ut("invalid",u);break;case"select":u._wrapperState={wasMultiple:!!_.multiple},Ut("invalid",u);break;case"textarea":Me(u,_),Ut("invalid",u)}$e(a,_),m=null;for(var T in _)if(_.hasOwnProperty(T)){var k=_[T];T==="children"?typeof k=="string"?u.textContent!==k&&(_.suppressHydrationWarning!==!0&&Ia(u.textContent,k,n),m=["children",k]):typeof k=="number"&&u.textContent!==""+k&&(_.suppressHydrationWarning!==!0&&Ia(u.textContent,k,n),m=["children",""+k]):o.hasOwnProperty(T)&&k!=null&&T==="onScroll"&&Ut("scroll",u)}switch(a){case"input":ze(u),ot(u,_,!0);break;case"textarea":ze(u),Je(u);break;case"select":case"option":break;default:typeof _.onClick=="function"&&(u.onclick=Oa)}u=m,r.updateQueue=u,u!==null&&(r.flags|=4)}else{T=m.nodeType===9?m:m.ownerDocument,n==="http://www.w3.org/1999/xhtml"&&(n=Ie(a)),n==="http://www.w3.org/1999/xhtml"?a==="script"?(n=T.createElement("div"),n.innerHTML="<script><\/script>",n=n.removeChild(n.firstChild)):typeof u.is=="string"?n=T.createElement(a,{is:u.is}):(n=T.createElement(a),a==="select"&&(T=n,u.multiple?T.multiple=!0:u.size&&(T.size=u.size))):n=T.createElementNS(n,a),n[_i]=r,n[Io]=u,Ep(n,r,!1,!1),r.stateNode=n;e:{switch(T=dt(a,u),a){case"dialog":Ut("cancel",n),Ut("close",n),m=u;break;case"iframe":case"object":case"embed":Ut("load",n),m=u;break;case"video":case"audio":for(m=0;m<No.length;m++)Ut(No[m],n);m=u;break;case"source":Ut("error",n),m=u;break;case"img":case"image":case"link":Ut("error",n),Ut("load",n),m=u;break;case"details":Ut("toggle",n),m=u;break;case"input":Qe(n,u),m=ke(n,u),Ut("invalid",n);break;case"option":m=u;break;case"select":n._wrapperState={wasMultiple:!!u.multiple},m=Y({},u,{value:void 0}),Ut("invalid",n);break;case"textarea":Me(n,u),m=we(n,u),Ut("invalid",n);break;default:m=u}$e(a,m),k=m;for(_ in k)if(k.hasOwnProperty(_)){var W=k[_];_==="style"?Ue(n,W):_==="dangerouslySetInnerHTML"?(W=W?W.__html:void 0,W!=null&&rt(n,W)):_==="children"?typeof W=="string"?(a!=="textarea"||W!=="")&&xe(n,W):typeof W=="number"&&xe(n,""+W):_!=="suppressContentEditableWarning"&&_!=="suppressHydrationWarning"&&_!=="autoFocus"&&(o.hasOwnProperty(_)?W!=null&&_==="onScroll"&&Ut("scroll",n):W!=null&&A(n,_,W,T))}switch(a){case"input":ze(n),ot(n,u,!1);break;case"textarea":ze(n),Je(n);break;case"option":u.value!=null&&n.setAttribute("value",""+Fe(u.value));break;case"select":n.multiple=!!u.multiple,_=u.value,_!=null?oe(n,!!u.multiple,_,!1):u.defaultValue!=null&&oe(n,!!u.multiple,u.defaultValue,!0);break;default:typeof m.onClick=="function"&&(n.onclick=Oa)}switch(a){case"button":case"input":case"select":case"textarea":u=!!u.autoFocus;break e;case"img":u=!0;break e;default:u=!1}}u&&(r.flags|=4)}r.ref!==null&&(r.flags|=512,r.flags|=2097152)}return vn(r),null;case 6:if(n&&r.stateNode!=null)Tp(n,r,n.memoizedProps,u);else{if(typeof u!="string"&&r.stateNode===null)throw Error(t(166));if(a=Vr(Bo.current),Vr(yi.current),Ga(r)){if(u=r.stateNode,a=r.memoizedProps,u[_i]=r,(_=u.nodeValue!==a)&&(n=Vn,n!==null))switch(n.tag){case 3:Ia(u.nodeValue,a,(n.mode&1)!==0);break;case 5:n.memoizedProps.suppressHydrationWarning!==!0&&Ia(u.nodeValue,a,(n.mode&1)!==0)}_&&(r.flags|=4)}else u=(a.nodeType===9?a:a.ownerDocument).createTextNode(u),u[_i]=r,r.stateNode=u}return vn(r),null;case 13:if(It(Vt),u=r.memoizedState,n===null||n.memoizedState!==null&&n.memoizedState.dehydrated!==null){if(zt&&Gn!==null&&r.mode&1&&!(r.flags&128))Ch(),Es(),r.flags|=98560,_=!1;else if(_=Ga(r),u!==null&&u.dehydrated!==null){if(n===null){if(!_)throw Error(t(318));if(_=r.memoizedState,_=_!==null?_.dehydrated:null,!_)throw Error(t(317));_[_i]=r}else Es(),!(r.flags&128)&&(r.memoizedState=null),r.flags|=4;vn(r),_=!1}else ai!==null&&(Xu(ai),ai=null),_=!0;if(!_)return r.flags&65536?r:null}return r.flags&128?(r.lanes=a,r):(u=u!==null,u!==(n!==null&&n.memoizedState!==null)&&u&&(r.child.flags|=8192,r.mode&1&&(n===null||Vt.current&1?tn===0&&(tn=3):qu())),r.updateQueue!==null&&(r.flags|=4),vn(r),null);case 4:return As(),Iu(n,r),n===null&&Do(r.stateNode.containerInfo),vn(r),null;case 10:return cu(r.type._context),vn(r),null;case 17:return Dn(r.type)&&ka(),vn(r),null;case 19:if(It(Vt),_=r.memoizedState,_===null)return vn(r),null;if(u=(r.flags&128)!==0,T=_.rendering,T===null)if(u)jo(_,!1);else{if(tn!==0||n!==null&&n.flags&128)for(n=r.child;n!==null;){if(T=qa(n),T!==null){for(r.flags|=128,jo(_,!1),u=T.updateQueue,u!==null&&(r.updateQueue=u,r.flags|=4),r.subtreeFlags=0,u=a,a=r.child;a!==null;)_=a,n=u,_.flags&=14680066,T=_.alternate,T===null?(_.childLanes=0,_.lanes=n,_.child=null,_.subtreeFlags=0,_.memoizedProps=null,_.memoizedState=null,_.updateQueue=null,_.dependencies=null,_.stateNode=null):(_.childLanes=T.childLanes,_.lanes=T.lanes,_.child=T.child,_.subtreeFlags=0,_.deletions=null,_.memoizedProps=T.memoizedProps,_.memoizedState=T.memoizedState,_.updateQueue=T.updateQueue,_.type=T.type,n=T.dependencies,_.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),a=a.sibling;return Dt(Vt,Vt.current&1|2),r.child}n=n.sibling}_.tail!==null&&Xe()>Ls&&(r.flags|=128,u=!0,jo(_,!1),r.lanes=4194304)}else{if(!u)if(n=qa(T),n!==null){if(r.flags|=128,u=!0,a=n.updateQueue,a!==null&&(r.updateQueue=a,r.flags|=4),jo(_,!0),_.tail===null&&_.tailMode==="hidden"&&!T.alternate&&!zt)return vn(r),null}else 2*Xe()-_.renderingStartTime>Ls&&a!==1073741824&&(r.flags|=128,u=!0,jo(_,!1),r.lanes=4194304);_.isBackwards?(T.sibling=r.child,r.child=T):(a=_.last,a!==null?a.sibling=T:r.child=T,_.last=T)}return _.tail!==null?(r=_.tail,_.rendering=r,_.tail=r.sibling,_.renderingStartTime=Xe(),r.sibling=null,a=Vt.current,Dt(Vt,u?a&1|2:a&1),r):(vn(r),null);case 22:case 23:return Yu(),u=r.memoizedState!==null,n!==null&&n.memoizedState!==null!==u&&(r.flags|=8192),u&&r.mode&1?Wn&1073741824&&(vn(r),r.subtreeFlags&6&&(r.flags|=8192)):vn(r),null;case 24:return null;case 25:return null}throw Error(t(156,r.tag))}function Px(n,r){switch(iu(r),r.tag){case 1:return Dn(r.type)&&ka(),n=r.flags,n&65536?(r.flags=n&-65537|128,r):null;case 3:return As(),It(Nn),It(mn),gu(),n=r.flags,n&65536&&!(n&128)?(r.flags=n&-65537|128,r):null;case 5:return pu(r),null;case 13:if(It(Vt),n=r.memoizedState,n!==null&&n.dehydrated!==null){if(r.alternate===null)throw Error(t(340));Es()}return n=r.flags,n&65536?(r.flags=n&-65537|128,r):null;case 19:return It(Vt),null;case 4:return As(),null;case 10:return cu(r.type._context),null;case 22:case 23:return Yu(),null;case 24:return null;default:return null}}var rl=!1,xn=!1,Lx=typeof WeakSet=="function"?WeakSet:Set,Ye=null;function Rs(n,r){var a=n.ref;if(a!==null)if(typeof a=="function")try{a(null)}catch(u){Xt(n,r,u)}else a.current=null}function Ou(n,r,a){try{a()}catch(u){Xt(n,r,u)}}var bp=!1;function Nx(n,r){if(Yc=wa,n=rh(),Bc(n)){if("selectionStart"in n)var a={start:n.selectionStart,end:n.selectionEnd};else e:{a=(a=n.ownerDocument)&&a.defaultView||window;var u=a.getSelection&&a.getSelection();if(u&&u.rangeCount!==0){a=u.anchorNode;var m=u.anchorOffset,_=u.focusNode;u=u.focusOffset;try{a.nodeType,_.nodeType}catch{a=null;break e}var T=0,k=-1,W=-1,ue=0,Te=0,Ce=n,Ee=null;t:for(;;){for(var We;Ce!==a||m!==0&&Ce.nodeType!==3||(k=T+m),Ce!==_||u!==0&&Ce.nodeType!==3||(W=T+u),Ce.nodeType===3&&(T+=Ce.nodeValue.length),(We=Ce.firstChild)!==null;)Ee=Ce,Ce=We;for(;;){if(Ce===n)break t;if(Ee===a&&++ue===m&&(k=T),Ee===_&&++Te===u&&(W=T),(We=Ce.nextSibling)!==null)break;Ce=Ee,Ee=Ce.parentNode}Ce=We}a=k===-1||W===-1?null:{start:k,end:W}}else a=null}a=a||{start:0,end:0}}else a=null;for(qc={focusedElem:n,selectionRange:a},wa=!1,Ye=r;Ye!==null;)if(r=Ye,n=r.child,(r.subtreeFlags&1028)!==0&&n!==null)n.return=r,Ye=n;else for(;Ye!==null;){r=Ye;try{var Ke=r.alternate;if(r.flags&1024)switch(r.tag){case 0:case 11:case 15:break;case 1:if(Ke!==null){var Ze=Ke.memoizedProps,qt=Ke.memoizedState,Z=r.stateNode,$=Z.getSnapshotBeforeUpdate(r.elementType===r.type?Ze:li(r.type,Ze),qt);Z.__reactInternalSnapshotBeforeUpdate=$}break;case 3:var re=r.stateNode.containerInfo;re.nodeType===1?re.textContent="":re.nodeType===9&&re.documentElement&&re.removeChild(re.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(t(163))}}catch(De){Xt(r,r.return,De)}if(n=r.sibling,n!==null){n.return=r.return,Ye=n;break}Ye=r.return}return Ke=bp,bp=!1,Ke}function Xo(n,r,a){var u=r.updateQueue;if(u=u!==null?u.lastEffect:null,u!==null){var m=u=u.next;do{if((m.tag&n)===n){var _=m.destroy;m.destroy=void 0,_!==void 0&&Ou(r,a,_)}m=m.next}while(m!==u)}}function sl(n,r){if(r=r.updateQueue,r=r!==null?r.lastEffect:null,r!==null){var a=r=r.next;do{if((a.tag&n)===n){var u=a.create;a.destroy=u()}a=a.next}while(a!==r)}}function Fu(n){var r=n.ref;if(r!==null){var a=n.stateNode;switch(n.tag){case 5:n=a;break;default:n=a}typeof r=="function"?r(n):r.current=n}}function Ap(n){var r=n.alternate;r!==null&&(n.alternate=null,Ap(r)),n.child=null,n.deletions=null,n.sibling=null,n.tag===5&&(r=n.stateNode,r!==null&&(delete r[_i],delete r[Io],delete r[Qc],delete r[px],delete r[mx])),n.stateNode=null,n.return=null,n.dependencies=null,n.memoizedProps=null,n.memoizedState=null,n.pendingProps=null,n.stateNode=null,n.updateQueue=null}function Cp(n){return n.tag===5||n.tag===3||n.tag===4}function Rp(n){e:for(;;){for(;n.sibling===null;){if(n.return===null||Cp(n.return))return null;n=n.return}for(n.sibling.return=n.return,n=n.sibling;n.tag!==5&&n.tag!==6&&n.tag!==18;){if(n.flags&2||n.child===null||n.tag===4)continue e;n.child.return=n,n=n.child}if(!(n.flags&2))return n.stateNode}}function ku(n,r,a){var u=n.tag;if(u===5||u===6)n=n.stateNode,r?a.nodeType===8?a.parentNode.insertBefore(n,r):a.insertBefore(n,r):(a.nodeType===8?(r=a.parentNode,r.insertBefore(n,a)):(r=a,r.appendChild(n)),a=a._reactRootContainer,a!=null||r.onclick!==null||(r.onclick=Oa));else if(u!==4&&(n=n.child,n!==null))for(ku(n,r,a),n=n.sibling;n!==null;)ku(n,r,a),n=n.sibling}function zu(n,r,a){var u=n.tag;if(u===5||u===6)n=n.stateNode,r?a.insertBefore(n,r):a.appendChild(n);else if(u!==4&&(n=n.child,n!==null))for(zu(n,r,a),n=n.sibling;n!==null;)zu(n,r,a),n=n.sibling}var fn=null,ci=!1;function cr(n,r,a){for(a=a.child;a!==null;)Pp(n,r,a),a=a.sibling}function Pp(n,r,a){if(bt&&typeof bt.onCommitFiberUnmount=="function")try{bt.onCommitFiberUnmount(Pn,a)}catch{}switch(a.tag){case 5:xn||Rs(a,r);case 6:var u=fn,m=ci;fn=null,cr(n,r,a),fn=u,ci=m,fn!==null&&(ci?(n=fn,a=a.stateNode,n.nodeType===8?n.parentNode.removeChild(a):n.removeChild(a)):fn.removeChild(a.stateNode));break;case 18:fn!==null&&(ci?(n=fn,a=a.stateNode,n.nodeType===8?Zc(n.parentNode,a):n.nodeType===1&&Zc(n,a),wo(n)):Zc(fn,a.stateNode));break;case 4:u=fn,m=ci,fn=a.stateNode.containerInfo,ci=!0,cr(n,r,a),fn=u,ci=m;break;case 0:case 11:case 14:case 15:if(!xn&&(u=a.updateQueue,u!==null&&(u=u.lastEffect,u!==null))){m=u=u.next;do{var _=m,T=_.destroy;_=_.tag,T!==void 0&&(_&2||_&4)&&Ou(a,r,T),m=m.next}while(m!==u)}cr(n,r,a);break;case 1:if(!xn&&(Rs(a,r),u=a.stateNode,typeof u.componentWillUnmount=="function"))try{u.props=a.memoizedProps,u.state=a.memoizedState,u.componentWillUnmount()}catch(k){Xt(a,r,k)}cr(n,r,a);break;case 21:cr(n,r,a);break;case 22:a.mode&1?(xn=(u=xn)||a.memoizedState!==null,cr(n,r,a),xn=u):cr(n,r,a);break;default:cr(n,r,a)}}function Lp(n){var r=n.updateQueue;if(r!==null){n.updateQueue=null;var a=n.stateNode;a===null&&(a=n.stateNode=new Lx),r.forEach(function(u){var m=Hx.bind(null,n,u);a.has(u)||(a.add(u),u.then(m,m))})}}function ui(n,r){var a=r.deletions;if(a!==null)for(var u=0;u<a.length;u++){var m=a[u];try{var _=n,T=r,k=T;e:for(;k!==null;){switch(k.tag){case 5:fn=k.stateNode,ci=!1;break e;case 3:fn=k.stateNode.containerInfo,ci=!0;break e;case 4:fn=k.stateNode.containerInfo,ci=!0;break e}k=k.return}if(fn===null)throw Error(t(160));Pp(_,T,m),fn=null,ci=!1;var W=m.alternate;W!==null&&(W.return=null),m.return=null}catch(ue){Xt(m,r,ue)}}if(r.subtreeFlags&12854)for(r=r.child;r!==null;)Np(r,n),r=r.sibling}function Np(n,r){var a=n.alternate,u=n.flags;switch(n.tag){case 0:case 11:case 14:case 15:if(ui(r,n),Mi(n),u&4){try{Xo(3,n,n.return),sl(3,n)}catch(Ze){Xt(n,n.return,Ze)}try{Xo(5,n,n.return)}catch(Ze){Xt(n,n.return,Ze)}}break;case 1:ui(r,n),Mi(n),u&512&&a!==null&&Rs(a,a.return);break;case 5:if(ui(r,n),Mi(n),u&512&&a!==null&&Rs(a,a.return),n.flags&32){var m=n.stateNode;try{xe(m,"")}catch(Ze){Xt(n,n.return,Ze)}}if(u&4&&(m=n.stateNode,m!=null)){var _=n.memoizedProps,T=a!==null?a.memoizedProps:_,k=n.type,W=n.updateQueue;if(n.updateQueue=null,W!==null)try{k==="input"&&_.type==="radio"&&_.name!=null&&Ve(m,_),dt(k,T);var ue=dt(k,_);for(T=0;T<W.length;T+=2){var Te=W[T],Ce=W[T+1];Te==="style"?Ue(m,Ce):Te==="dangerouslySetInnerHTML"?rt(m,Ce):Te==="children"?xe(m,Ce):A(m,Te,Ce,ue)}switch(k){case"input":wt(m,_);break;case"textarea":be(m,_);break;case"select":var Ee=m._wrapperState.wasMultiple;m._wrapperState.wasMultiple=!!_.multiple;var We=_.value;We!=null?oe(m,!!_.multiple,We,!1):Ee!==!!_.multiple&&(_.defaultValue!=null?oe(m,!!_.multiple,_.defaultValue,!0):oe(m,!!_.multiple,_.multiple?[]:"",!1))}m[Io]=_}catch(Ze){Xt(n,n.return,Ze)}}break;case 6:if(ui(r,n),Mi(n),u&4){if(n.stateNode===null)throw Error(t(162));m=n.stateNode,_=n.memoizedProps;try{m.nodeValue=_}catch(Ze){Xt(n,n.return,Ze)}}break;case 3:if(ui(r,n),Mi(n),u&4&&a!==null&&a.memoizedState.isDehydrated)try{wo(r.containerInfo)}catch(Ze){Xt(n,n.return,Ze)}break;case 4:ui(r,n),Mi(n);break;case 13:ui(r,n),Mi(n),m=n.child,m.flags&8192&&(_=m.memoizedState!==null,m.stateNode.isHidden=_,!_||m.alternate!==null&&m.alternate.memoizedState!==null||(Vu=Xe())),u&4&&Lp(n);break;case 22:if(Te=a!==null&&a.memoizedState!==null,n.mode&1?(xn=(ue=xn)||Te,ui(r,n),xn=ue):ui(r,n),Mi(n),u&8192){if(ue=n.memoizedState!==null,(n.stateNode.isHidden=ue)&&!Te&&n.mode&1)for(Ye=n,Te=n.child;Te!==null;){for(Ce=Ye=Te;Ye!==null;){switch(Ee=Ye,We=Ee.child,Ee.tag){case 0:case 11:case 14:case 15:Xo(4,Ee,Ee.return);break;case 1:Rs(Ee,Ee.return);var Ke=Ee.stateNode;if(typeof Ke.componentWillUnmount=="function"){u=Ee,a=Ee.return;try{r=u,Ke.props=r.memoizedProps,Ke.state=r.memoizedState,Ke.componentWillUnmount()}catch(Ze){Xt(u,a,Ze)}}break;case 5:Rs(Ee,Ee.return);break;case 22:if(Ee.memoizedState!==null){Ip(Ce);continue}}We!==null?(We.return=Ee,Ye=We):Ip(Ce)}Te=Te.sibling}e:for(Te=null,Ce=n;;){if(Ce.tag===5){if(Te===null){Te=Ce;try{m=Ce.stateNode,ue?(_=m.style,typeof _.setProperty=="function"?_.setProperty("display","none","important"):_.display="none"):(k=Ce.stateNode,W=Ce.memoizedProps.style,T=W!=null&&W.hasOwnProperty("display")?W.display:null,k.style.display=_e("display",T))}catch(Ze){Xt(n,n.return,Ze)}}}else if(Ce.tag===6){if(Te===null)try{Ce.stateNode.nodeValue=ue?"":Ce.memoizedProps}catch(Ze){Xt(n,n.return,Ze)}}else if((Ce.tag!==22&&Ce.tag!==23||Ce.memoizedState===null||Ce===n)&&Ce.child!==null){Ce.child.return=Ce,Ce=Ce.child;continue}if(Ce===n)break e;for(;Ce.sibling===null;){if(Ce.return===null||Ce.return===n)break e;Te===Ce&&(Te=null),Ce=Ce.return}Te===Ce&&(Te=null),Ce.sibling.return=Ce.return,Ce=Ce.sibling}}break;case 19:ui(r,n),Mi(n),u&4&&Lp(n);break;case 21:break;default:ui(r,n),Mi(n)}}function Mi(n){var r=n.flags;if(r&2){try{e:{for(var a=n.return;a!==null;){if(Cp(a)){var u=a;break e}a=a.return}throw Error(t(160))}switch(u.tag){case 5:var m=u.stateNode;u.flags&32&&(xe(m,""),u.flags&=-33);var _=Rp(n);zu(n,_,m);break;case 3:case 4:var T=u.stateNode.containerInfo,k=Rp(n);ku(n,k,T);break;default:throw Error(t(161))}}catch(W){Xt(n,n.return,W)}n.flags&=-3}r&4096&&(n.flags&=-4097)}function Dx(n,r,a){Ye=n,Dp(n)}function Dp(n,r,a){for(var u=(n.mode&1)!==0;Ye!==null;){var m=Ye,_=m.child;if(m.tag===22&&u){var T=m.memoizedState!==null||rl;if(!T){var k=m.alternate,W=k!==null&&k.memoizedState!==null||xn;k=rl;var ue=xn;if(rl=T,(xn=W)&&!ue)for(Ye=m;Ye!==null;)T=Ye,W=T.child,T.tag===22&&T.memoizedState!==null?Op(m):W!==null?(W.return=T,Ye=W):Op(m);for(;_!==null;)Ye=_,Dp(_),_=_.sibling;Ye=m,rl=k,xn=ue}Up(n)}else m.subtreeFlags&8772&&_!==null?(_.return=m,Ye=_):Up(n)}}function Up(n){for(;Ye!==null;){var r=Ye;if(r.flags&8772){var a=r.alternate;try{if(r.flags&8772)switch(r.tag){case 0:case 11:case 15:xn||sl(5,r);break;case 1:var u=r.stateNode;if(r.flags&4&&!xn)if(a===null)u.componentDidMount();else{var m=r.elementType===r.type?a.memoizedProps:li(r.type,a.memoizedProps);u.componentDidUpdate(m,a.memoizedState,u.__reactInternalSnapshotBeforeUpdate)}var _=r.updateQueue;_!==null&&Ih(r,_,u);break;case 3:var T=r.updateQueue;if(T!==null){if(a=null,r.child!==null)switch(r.child.tag){case 5:a=r.child.stateNode;break;case 1:a=r.child.stateNode}Ih(r,T,a)}break;case 5:var k=r.stateNode;if(a===null&&r.flags&4){a=k;var W=r.memoizedProps;switch(r.type){case"button":case"input":case"select":case"textarea":W.autoFocus&&a.focus();break;case"img":W.src&&(a.src=W.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(r.memoizedState===null){var ue=r.alternate;if(ue!==null){var Te=ue.memoizedState;if(Te!==null){var Ce=Te.dehydrated;Ce!==null&&wo(Ce)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(t(163))}xn||r.flags&512&&Fu(r)}catch(Ee){Xt(r,r.return,Ee)}}if(r===n){Ye=null;break}if(a=r.sibling,a!==null){a.return=r.return,Ye=a;break}Ye=r.return}}function Ip(n){for(;Ye!==null;){var r=Ye;if(r===n){Ye=null;break}var a=r.sibling;if(a!==null){a.return=r.return,Ye=a;break}Ye=r.return}}function Op(n){for(;Ye!==null;){var r=Ye;try{switch(r.tag){case 0:case 11:case 15:var a=r.return;try{sl(4,r)}catch(W){Xt(r,a,W)}break;case 1:var u=r.stateNode;if(typeof u.componentDidMount=="function"){var m=r.return;try{u.componentDidMount()}catch(W){Xt(r,m,W)}}var _=r.return;try{Fu(r)}catch(W){Xt(r,_,W)}break;case 5:var T=r.return;try{Fu(r)}catch(W){Xt(r,T,W)}}}catch(W){Xt(r,r.return,W)}if(r===n){Ye=null;break}var k=r.sibling;if(k!==null){k.return=r.return,Ye=k;break}Ye=r.return}}var Ux=Math.ceil,ol=P.ReactCurrentDispatcher,Bu=P.ReactCurrentOwner,ei=P.ReactCurrentBatchConfig,At=0,ln=null,Kt=null,hn=0,Wn=0,Ps=rr(0),tn=0,$o=null,Wr=0,al=0,Hu=0,Yo=null,In=null,Vu=0,Ls=1/0,ki=null,ll=!1,Gu=null,ur=null,cl=!1,dr=null,ul=0,qo=0,Wu=null,dl=-1,fl=0;function Tn(){return At&6?Xe():dl!==-1?dl:dl=Xe()}function fr(n){return n.mode&1?At&2&&hn!==0?hn&-hn:vx.transition!==null?(fl===0&&(fl=Sa()),fl):(n=Pt,n!==0||(n=window.event,n=n===void 0?16:kf(n.type)),n):1}function di(n,r,a,u){if(50<qo)throw qo=0,Wu=null,Error(t(185));_o(n,a,u),(!(At&2)||n!==ln)&&(n===ln&&(!(At&2)&&(al|=a),tn===4&&hr(n,hn)),On(n,u),a===1&&At===0&&!(r.mode&1)&&(Ls=Xe()+500,Ba&&or()))}function On(n,r){var a=n.callbackNode;Ln(n,r);var u=qn(n,n===ln?hn:0);if(u===0)a!==null&&Ge(a),n.callbackNode=null,n.callbackPriority=0;else if(r=u&-u,n.callbackPriority!==r){if(a!=null&&Ge(a),r===1)n.tag===0?gx(kp.bind(null,n)):Eh(kp.bind(null,n)),fx(function(){!(At&6)&&or()}),a=null;else{switch(Pf(u)){case 1:a=ft;break;case 4:a=pt;break;case 16:a=Nt;break;case 536870912:a=Yt;break;default:a=Nt}a=Xp(a,Fp.bind(null,n))}n.callbackPriority=r,n.callbackNode=a}}function Fp(n,r){if(dl=-1,fl=0,At&6)throw Error(t(327));var a=n.callbackNode;if(Ns()&&n.callbackNode!==a)return null;var u=qn(n,n===ln?hn:0);if(u===0)return null;if(u&30||u&n.expiredLanes||r)r=hl(n,u);else{r=u;var m=At;At|=2;var _=Bp();(ln!==n||hn!==r)&&(ki=null,Ls=Xe()+500,Xr(n,r));do try{Fx();break}catch(k){zp(n,k)}while(!0);lu(),ol.current=_,At=m,Kt!==null?r=0:(ln=null,hn=0,r=tn)}if(r!==0){if(r===2&&(m=Or(n),m!==0&&(u=m,r=ju(n,m))),r===1)throw a=$o,Xr(n,0),hr(n,u),On(n,Xe()),a;if(r===6)hr(n,u);else{if(m=n.current.alternate,!(u&30)&&!Ix(m)&&(r=hl(n,u),r===2&&(_=Or(n),_!==0&&(u=_,r=ju(n,_))),r===1))throw a=$o,Xr(n,0),hr(n,u),On(n,Xe()),a;switch(n.finishedWork=m,n.finishedLanes=u,r){case 0:case 1:throw Error(t(345));case 2:$r(n,In,ki);break;case 3:if(hr(n,u),(u&130023424)===u&&(r=Vu+500-Xe(),10<r)){if(qn(n,0)!==0)break;if(m=n.suspendedLanes,(m&u)!==u){Tn(),n.pingedLanes|=n.suspendedLanes&m;break}n.timeoutHandle=Jc($r.bind(null,n,In,ki),r);break}$r(n,In,ki);break;case 4:if(hr(n,u),(u&4194240)===u)break;for(r=n.eventTimes,m=-1;0<u;){var T=31-En(u);_=1<<T,T=r[T],T>m&&(m=T),u&=~_}if(u=m,u=Xe()-u,u=(120>u?120:480>u?480:1080>u?1080:1920>u?1920:3e3>u?3e3:4320>u?4320:1960*Ux(u/1960))-u,10<u){n.timeoutHandle=Jc($r.bind(null,n,In,ki),u);break}$r(n,In,ki);break;case 5:$r(n,In,ki);break;default:throw Error(t(329))}}}return On(n,Xe()),n.callbackNode===a?Fp.bind(null,n):null}function ju(n,r){var a=Yo;return n.current.memoizedState.isDehydrated&&(Xr(n,r).flags|=256),n=hl(n,r),n!==2&&(r=In,In=a,r!==null&&Xu(r)),n}function Xu(n){In===null?In=n:In.push.apply(In,n)}function Ix(n){for(var r=n;;){if(r.flags&16384){var a=r.updateQueue;if(a!==null&&(a=a.stores,a!==null))for(var u=0;u<a.length;u++){var m=a[u],_=m.getSnapshot;m=m.value;try{if(!oi(_(),m))return!1}catch{return!1}}}if(a=r.child,r.subtreeFlags&16384&&a!==null)a.return=r,r=a;else{if(r===n)break;for(;r.sibling===null;){if(r.return===null||r.return===n)return!0;r=r.return}r.sibling.return=r.return,r=r.sibling}}return!0}function hr(n,r){for(r&=~Hu,r&=~al,n.suspendedLanes|=r,n.pingedLanes&=~r,n=n.expirationTimes;0<r;){var a=31-En(r),u=1<<a;n[a]=-1,r&=~u}}function kp(n){if(At&6)throw Error(t(327));Ns();var r=qn(n,0);if(!(r&1))return On(n,Xe()),null;var a=hl(n,r);if(n.tag!==0&&a===2){var u=Or(n);u!==0&&(r=u,a=ju(n,u))}if(a===1)throw a=$o,Xr(n,0),hr(n,r),On(n,Xe()),a;if(a===6)throw Error(t(345));return n.finishedWork=n.current.alternate,n.finishedLanes=r,$r(n,In,ki),On(n,Xe()),null}function $u(n,r){var a=At;At|=1;try{return n(r)}finally{At=a,At===0&&(Ls=Xe()+500,Ba&&or())}}function jr(n){dr!==null&&dr.tag===0&&!(At&6)&&Ns();var r=At;At|=1;var a=ei.transition,u=Pt;try{if(ei.transition=null,Pt=1,n)return n()}finally{Pt=u,ei.transition=a,At=r,!(At&6)&&or()}}function Yu(){Wn=Ps.current,It(Ps)}function Xr(n,r){n.finishedWork=null,n.finishedLanes=0;var a=n.timeoutHandle;if(a!==-1&&(n.timeoutHandle=-1,dx(a)),Kt!==null)for(a=Kt.return;a!==null;){var u=a;switch(iu(u),u.tag){case 1:u=u.type.childContextTypes,u!=null&&ka();break;case 3:As(),It(Nn),It(mn),gu();break;case 5:pu(u);break;case 4:As();break;case 13:It(Vt);break;case 19:It(Vt);break;case 10:cu(u.type._context);break;case 22:case 23:Yu()}a=a.return}if(ln=n,Kt=n=pr(n.current,null),hn=Wn=r,tn=0,$o=null,Hu=al=Wr=0,In=Yo=null,Hr!==null){for(r=0;r<Hr.length;r++)if(a=Hr[r],u=a.interleaved,u!==null){a.interleaved=null;var m=u.next,_=a.pending;if(_!==null){var T=_.next;_.next=m,u.next=T}a.pending=u}Hr=null}return n}function zp(n,r){do{var a=Kt;try{if(lu(),Ka.current=el,Ja){for(var u=Gt.memoizedState;u!==null;){var m=u.queue;m!==null&&(m.pending=null),u=u.next}Ja=!1}if(Gr=0,an=en=Gt=null,Ho=!1,Vo=0,Bu.current=null,a===null||a.return===null){tn=1,$o=r,Kt=null;break}e:{var _=n,T=a.return,k=a,W=r;if(r=hn,k.flags|=32768,W!==null&&typeof W=="object"&&typeof W.then=="function"){var ue=W,Te=k,Ce=Te.tag;if(!(Te.mode&1)&&(Ce===0||Ce===11||Ce===15)){var Ee=Te.alternate;Ee?(Te.updateQueue=Ee.updateQueue,Te.memoizedState=Ee.memoizedState,Te.lanes=Ee.lanes):(Te.updateQueue=null,Te.memoizedState=null)}var We=up(T);if(We!==null){We.flags&=-257,dp(We,T,k,_,r),We.mode&1&&cp(_,ue,r),r=We,W=ue;var Ke=r.updateQueue;if(Ke===null){var Ze=new Set;Ze.add(W),r.updateQueue=Ze}else Ke.add(W);break e}else{if(!(r&1)){cp(_,ue,r),qu();break e}W=Error(t(426))}}else if(zt&&k.mode&1){var qt=up(T);if(qt!==null){!(qt.flags&65536)&&(qt.flags|=256),dp(qt,T,k,_,r),ou(Cs(W,k));break e}}_=W=Cs(W,k),tn!==4&&(tn=2),Yo===null?Yo=[_]:Yo.push(_),_=T;do{switch(_.tag){case 3:_.flags|=65536,r&=-r,_.lanes|=r;var Z=ap(_,W,r);Uh(_,Z);break e;case 1:k=W;var $=_.type,re=_.stateNode;if(!(_.flags&128)&&(typeof $.getDerivedStateFromError=="function"||re!==null&&typeof re.componentDidCatch=="function"&&(ur===null||!ur.has(re)))){_.flags|=65536,r&=-r,_.lanes|=r;var De=lp(_,k,r);Uh(_,De);break e}}_=_.return}while(_!==null)}Vp(a)}catch(et){r=et,Kt===a&&a!==null&&(Kt=a=a.return);continue}break}while(!0)}function Bp(){var n=ol.current;return ol.current=el,n===null?el:n}function qu(){(tn===0||tn===3||tn===2)&&(tn=4),ln===null||!(Wr&268435455)&&!(al&268435455)||hr(ln,hn)}function hl(n,r){var a=At;At|=2;var u=Bp();(ln!==n||hn!==r)&&(ki=null,Xr(n,r));do try{Ox();break}catch(m){zp(n,m)}while(!0);if(lu(),At=a,ol.current=u,Kt!==null)throw Error(t(261));return ln=null,hn=0,tn}function Ox(){for(;Kt!==null;)Hp(Kt)}function Fx(){for(;Kt!==null&&!it();)Hp(Kt)}function Hp(n){var r=jp(n.alternate,n,Wn);n.memoizedProps=n.pendingProps,r===null?Vp(n):Kt=r,Bu.current=null}function Vp(n){var r=n;do{var a=r.alternate;if(n=r.return,r.flags&32768){if(a=Px(a,r),a!==null){a.flags&=32767,Kt=a;return}if(n!==null)n.flags|=32768,n.subtreeFlags=0,n.deletions=null;else{tn=6,Kt=null;return}}else if(a=Rx(a,r,Wn),a!==null){Kt=a;return}if(r=r.sibling,r!==null){Kt=r;return}Kt=r=n}while(r!==null);tn===0&&(tn=5)}function $r(n,r,a){var u=Pt,m=ei.transition;try{ei.transition=null,Pt=1,kx(n,r,a,u)}finally{ei.transition=m,Pt=u}return null}function kx(n,r,a,u){do Ns();while(dr!==null);if(At&6)throw Error(t(327));a=n.finishedWork;var m=n.finishedLanes;if(a===null)return null;if(n.finishedWork=null,n.finishedLanes=0,a===n.current)throw Error(t(177));n.callbackNode=null,n.callbackPriority=0;var _=a.lanes|a.childLanes;if(x0(n,_),n===ln&&(Kt=ln=null,hn=0),!(a.subtreeFlags&2064)&&!(a.flags&2064)||cl||(cl=!0,Xp(Nt,function(){return Ns(),null})),_=(a.flags&15990)!==0,a.subtreeFlags&15990||_){_=ei.transition,ei.transition=null;var T=Pt;Pt=1;var k=At;At|=4,Bu.current=null,Nx(n,a),Np(a,n),rx(qc),wa=!!Yc,qc=Yc=null,n.current=a,Dx(a),ct(),At=k,Pt=T,ei.transition=_}else n.current=a;if(cl&&(cl=!1,dr=n,ul=m),_=n.pendingLanes,_===0&&(ur=null),xt(a.stateNode),On(n,Xe()),r!==null)for(u=n.onRecoverableError,a=0;a<r.length;a++)m=r[a],u(m.value,{componentStack:m.stack,digest:m.digest});if(ll)throw ll=!1,n=Gu,Gu=null,n;return ul&1&&n.tag!==0&&Ns(),_=n.pendingLanes,_&1?n===Wu?qo++:(qo=0,Wu=n):qo=0,or(),null}function Ns(){if(dr!==null){var n=Pf(ul),r=ei.transition,a=Pt;try{if(ei.transition=null,Pt=16>n?16:n,dr===null)var u=!1;else{if(n=dr,dr=null,ul=0,At&6)throw Error(t(331));var m=At;for(At|=4,Ye=n.current;Ye!==null;){var _=Ye,T=_.child;if(Ye.flags&16){var k=_.deletions;if(k!==null){for(var W=0;W<k.length;W++){var ue=k[W];for(Ye=ue;Ye!==null;){var Te=Ye;switch(Te.tag){case 0:case 11:case 15:Xo(8,Te,_)}var Ce=Te.child;if(Ce!==null)Ce.return=Te,Ye=Ce;else for(;Ye!==null;){Te=Ye;var Ee=Te.sibling,We=Te.return;if(Ap(Te),Te===ue){Ye=null;break}if(Ee!==null){Ee.return=We,Ye=Ee;break}Ye=We}}}var Ke=_.alternate;if(Ke!==null){var Ze=Ke.child;if(Ze!==null){Ke.child=null;do{var qt=Ze.sibling;Ze.sibling=null,Ze=qt}while(Ze!==null)}}Ye=_}}if(_.subtreeFlags&2064&&T!==null)T.return=_,Ye=T;else e:for(;Ye!==null;){if(_=Ye,_.flags&2048)switch(_.tag){case 0:case 11:case 15:Xo(9,_,_.return)}var Z=_.sibling;if(Z!==null){Z.return=_.return,Ye=Z;break e}Ye=_.return}}var $=n.current;for(Ye=$;Ye!==null;){T=Ye;var re=T.child;if(T.subtreeFlags&2064&&re!==null)re.return=T,Ye=re;else e:for(T=$;Ye!==null;){if(k=Ye,k.flags&2048)try{switch(k.tag){case 0:case 11:case 15:sl(9,k)}}catch(et){Xt(k,k.return,et)}if(k===T){Ye=null;break e}var De=k.sibling;if(De!==null){De.return=k.return,Ye=De;break e}Ye=k.return}}if(At=m,or(),bt&&typeof bt.onPostCommitFiberRoot=="function")try{bt.onPostCommitFiberRoot(Pn,n)}catch{}u=!0}return u}finally{Pt=a,ei.transition=r}}return!1}function Gp(n,r,a){r=Cs(a,r),r=ap(n,r,1),n=lr(n,r,1),r=Tn(),n!==null&&(_o(n,1,r),On(n,r))}function Xt(n,r,a){if(n.tag===3)Gp(n,n,a);else for(;r!==null;){if(r.tag===3){Gp(r,n,a);break}else if(r.tag===1){var u=r.stateNode;if(typeof r.type.getDerivedStateFromError=="function"||typeof u.componentDidCatch=="function"&&(ur===null||!ur.has(u))){n=Cs(a,n),n=lp(r,n,1),r=lr(r,n,1),n=Tn(),r!==null&&(_o(r,1,n),On(r,n));break}}r=r.return}}function zx(n,r,a){var u=n.pingCache;u!==null&&u.delete(r),r=Tn(),n.pingedLanes|=n.suspendedLanes&a,ln===n&&(hn&a)===a&&(tn===4||tn===3&&(hn&130023424)===hn&&500>Xe()-Vu?Xr(n,0):Hu|=a),On(n,r)}function Wp(n,r){r===0&&(n.mode&1?(r=Ki,Ki<<=1,!(Ki&130023424)&&(Ki=4194304)):r=1);var a=Tn();n=Ii(n,r),n!==null&&(_o(n,r,a),On(n,a))}function Bx(n){var r=n.memoizedState,a=0;r!==null&&(a=r.retryLane),Wp(n,a)}function Hx(n,r){var a=0;switch(n.tag){case 13:var u=n.stateNode,m=n.memoizedState;m!==null&&(a=m.retryLane);break;case 19:u=n.stateNode;break;default:throw Error(t(314))}u!==null&&u.delete(r),Wp(n,a)}var jp;jp=function(n,r,a){if(n!==null)if(n.memoizedProps!==r.pendingProps||Nn.current)Un=!0;else{if(!(n.lanes&a)&&!(r.flags&128))return Un=!1,Cx(n,r,a);Un=!!(n.flags&131072)}else Un=!1,zt&&r.flags&1048576&&wh(r,Va,r.index);switch(r.lanes=0,r.tag){case 2:var u=r.type;il(n,r),n=r.pendingProps;var m=ys(r,mn.current);bs(r,a),m=_u(null,r,u,n,m,a);var _=yu();return r.flags|=1,typeof m=="object"&&m!==null&&typeof m.render=="function"&&m.$$typeof===void 0?(r.tag=1,r.memoizedState=null,r.updateQueue=null,Dn(u)?(_=!0,za(r)):_=!1,r.memoizedState=m.state!==null&&m.state!==void 0?m.state:null,fu(r),m.updater=tl,r.stateNode=m,m._reactInternals=r,bu(r,u,n,a),r=Pu(null,r,u,!0,_,a)):(r.tag=0,zt&&_&&nu(r),wn(null,r,m,a),r=r.child),r;case 16:u=r.elementType;e:{switch(il(n,r),n=r.pendingProps,m=u._init,u=m(u._payload),r.type=u,m=r.tag=Gx(u),n=li(u,n),m){case 0:r=Ru(null,r,u,n,a);break e;case 1:r=vp(null,r,u,n,a);break e;case 11:r=fp(null,r,u,n,a);break e;case 14:r=hp(null,r,u,li(u.type,n),a);break e}throw Error(t(306,u,""))}return r;case 0:return u=r.type,m=r.pendingProps,m=r.elementType===u?m:li(u,m),Ru(n,r,u,m,a);case 1:return u=r.type,m=r.pendingProps,m=r.elementType===u?m:li(u,m),vp(n,r,u,m,a);case 3:e:{if(xp(r),n===null)throw Error(t(387));u=r.pendingProps,_=r.memoizedState,m=_.element,Dh(n,r),Ya(r,u,null,a);var T=r.memoizedState;if(u=T.element,_.isDehydrated)if(_={element:u,isDehydrated:!1,cache:T.cache,pendingSuspenseBoundaries:T.pendingSuspenseBoundaries,transitions:T.transitions},r.updateQueue.baseState=_,r.memoizedState=_,r.flags&256){m=Cs(Error(t(423)),r),r=_p(n,r,u,a,m);break e}else if(u!==m){m=Cs(Error(t(424)),r),r=_p(n,r,u,a,m);break e}else for(Gn=ir(r.stateNode.containerInfo.firstChild),Vn=r,zt=!0,ai=null,a=Lh(r,null,u,a),r.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling;else{if(Es(),u===m){r=Fi(n,r,a);break e}wn(n,r,u,a)}r=r.child}return r;case 5:return Oh(r),n===null&&su(r),u=r.type,m=r.pendingProps,_=n!==null?n.memoizedProps:null,T=m.children,Kc(u,m)?T=null:_!==null&&Kc(u,_)&&(r.flags|=32),gp(n,r),wn(n,r,T,a),r.child;case 6:return n===null&&su(r),null;case 13:return yp(n,r,a);case 4:return hu(r,r.stateNode.containerInfo),u=r.pendingProps,n===null?r.child=ws(r,null,u,a):wn(n,r,u,a),r.child;case 11:return u=r.type,m=r.pendingProps,m=r.elementType===u?m:li(u,m),fp(n,r,u,m,a);case 7:return wn(n,r,r.pendingProps,a),r.child;case 8:return wn(n,r,r.pendingProps.children,a),r.child;case 12:return wn(n,r,r.pendingProps.children,a),r.child;case 10:e:{if(u=r.type._context,m=r.pendingProps,_=r.memoizedProps,T=m.value,Dt(ja,u._currentValue),u._currentValue=T,_!==null)if(oi(_.value,T)){if(_.children===m.children&&!Nn.current){r=Fi(n,r,a);break e}}else for(_=r.child,_!==null&&(_.return=r);_!==null;){var k=_.dependencies;if(k!==null){T=_.child;for(var W=k.firstContext;W!==null;){if(W.context===u){if(_.tag===1){W=Oi(-1,a&-a),W.tag=2;var ue=_.updateQueue;if(ue!==null){ue=ue.shared;var Te=ue.pending;Te===null?W.next=W:(W.next=Te.next,Te.next=W),ue.pending=W}}_.lanes|=a,W=_.alternate,W!==null&&(W.lanes|=a),uu(_.return,a,r),k.lanes|=a;break}W=W.next}}else if(_.tag===10)T=_.type===r.type?null:_.child;else if(_.tag===18){if(T=_.return,T===null)throw Error(t(341));T.lanes|=a,k=T.alternate,k!==null&&(k.lanes|=a),uu(T,a,r),T=_.sibling}else T=_.child;if(T!==null)T.return=_;else for(T=_;T!==null;){if(T===r){T=null;break}if(_=T.sibling,_!==null){_.return=T.return,T=_;break}T=T.return}_=T}wn(n,r,m.children,a),r=r.child}return r;case 9:return m=r.type,u=r.pendingProps.children,bs(r,a),m=Zn(m),u=u(m),r.flags|=1,wn(n,r,u,a),r.child;case 14:return u=r.type,m=li(u,r.pendingProps),m=li(u.type,m),hp(n,r,u,m,a);case 15:return pp(n,r,r.type,r.pendingProps,a);case 17:return u=r.type,m=r.pendingProps,m=r.elementType===u?m:li(u,m),il(n,r),r.tag=1,Dn(u)?(n=!0,za(r)):n=!1,bs(r,a),sp(r,u,m),bu(r,u,m,a),Pu(null,r,u,!0,n,a);case 19:return Mp(n,r,a);case 22:return mp(n,r,a)}throw Error(t(156,r.tag))};function Xp(n,r){return de(n,r)}function Vx(n,r,a,u){this.tag=n,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=r,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=u,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ti(n,r,a,u){return new Vx(n,r,a,u)}function Ku(n){return n=n.prototype,!(!n||!n.isReactComponent)}function Gx(n){if(typeof n=="function")return Ku(n)?1:0;if(n!=null){if(n=n.$$typeof,n===le)return 11;if(n===J)return 14}return 2}function pr(n,r){var a=n.alternate;return a===null?(a=ti(n.tag,r,n.key,n.mode),a.elementType=n.elementType,a.type=n.type,a.stateNode=n.stateNode,a.alternate=n,n.alternate=a):(a.pendingProps=r,a.type=n.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=n.flags&14680064,a.childLanes=n.childLanes,a.lanes=n.lanes,a.child=n.child,a.memoizedProps=n.memoizedProps,a.memoizedState=n.memoizedState,a.updateQueue=n.updateQueue,r=n.dependencies,a.dependencies=r===null?null:{lanes:r.lanes,firstContext:r.firstContext},a.sibling=n.sibling,a.index=n.index,a.ref=n.ref,a}function pl(n,r,a,u,m,_){var T=2;if(u=n,typeof n=="function")Ku(n)&&(T=1);else if(typeof n=="string")T=5;else e:switch(n){case I:return Yr(a.children,m,_,r);case ne:T=8,m|=8;break;case R:return n=ti(12,a,r,m|2),n.elementType=R,n.lanes=_,n;case ge:return n=ti(13,a,r,m),n.elementType=ge,n.lanes=_,n;case V:return n=ti(19,a,r,m),n.elementType=V,n.lanes=_,n;case q:return ml(a,m,_,r);default:if(typeof n=="object"&&n!==null)switch(n.$$typeof){case U:T=10;break e;case se:T=9;break e;case le:T=11;break e;case J:T=14;break e;case te:T=16,u=null;break e}throw Error(t(130,n==null?n:typeof n,""))}return r=ti(T,a,r,m),r.elementType=n,r.type=u,r.lanes=_,r}function Yr(n,r,a,u){return n=ti(7,n,u,r),n.lanes=a,n}function ml(n,r,a,u){return n=ti(22,n,u,r),n.elementType=q,n.lanes=a,n.stateNode={isHidden:!1},n}function Ju(n,r,a){return n=ti(6,n,null,r),n.lanes=a,n}function Zu(n,r,a){return r=ti(4,n.children!==null?n.children:[],n.key,r),r.lanes=a,r.stateNode={containerInfo:n.containerInfo,pendingChildren:null,implementation:n.implementation},r}function Wx(n,r,a,u,m){this.tag=r,this.containerInfo=n,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=us(0),this.expirationTimes=us(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=us(0),this.identifierPrefix=u,this.onRecoverableError=m,this.mutableSourceEagerHydrationData=null}function Qu(n,r,a,u,m,_,T,k,W){return n=new Wx(n,r,a,k,W),r===1?(r=1,_===!0&&(r|=8)):r=0,_=ti(3,null,null,r),n.current=_,_.stateNode=n,_.memoizedState={element:u,isDehydrated:a,cache:null,transitions:null,pendingSuspenseBoundaries:null},fu(_),n}function jx(n,r,a){var u=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:D,key:u==null?null:""+u,children:n,containerInfo:r,implementation:a}}function $p(n){if(!n)return sr;n=n._reactInternals;e:{if(Ri(n)!==n||n.tag!==1)throw Error(t(170));var r=n;do{switch(r.tag){case 3:r=r.stateNode.context;break e;case 1:if(Dn(r.type)){r=r.stateNode.__reactInternalMemoizedMergedChildContext;break e}}r=r.return}while(r!==null);throw Error(t(171))}if(n.tag===1){var a=n.type;if(Dn(a))return Sh(n,a,r)}return r}function Yp(n,r,a,u,m,_,T,k,W){return n=Qu(a,u,!0,n,m,_,T,k,W),n.context=$p(null),a=n.current,u=Tn(),m=fr(a),_=Oi(u,m),_.callback=r??null,lr(a,_,m),n.current.lanes=m,_o(n,m,u),On(n,u),n}function gl(n,r,a,u){var m=r.current,_=Tn(),T=fr(m);return a=$p(a),r.context===null?r.context=a:r.pendingContext=a,r=Oi(_,T),r.payload={element:n},u=u===void 0?null:u,u!==null&&(r.callback=u),n=lr(m,r,T),n!==null&&(di(n,m,T,_),$a(n,m,T)),T}function vl(n){if(n=n.current,!n.child)return null;switch(n.child.tag){case 5:return n.child.stateNode;default:return n.child.stateNode}}function qp(n,r){if(n=n.memoizedState,n!==null&&n.dehydrated!==null){var a=n.retryLane;n.retryLane=a!==0&&a<r?a:r}}function ed(n,r){qp(n,r),(n=n.alternate)&&qp(n,r)}function Xx(){return null}var Kp=typeof reportError=="function"?reportError:function(n){console.error(n)};function td(n){this._internalRoot=n}xl.prototype.render=td.prototype.render=function(n){var r=this._internalRoot;if(r===null)throw Error(t(409));gl(n,r,null,null)},xl.prototype.unmount=td.prototype.unmount=function(){var n=this._internalRoot;if(n!==null){this._internalRoot=null;var r=n.containerInfo;jr(function(){gl(null,n,null,null)}),r[Li]=null}};function xl(n){this._internalRoot=n}xl.prototype.unstable_scheduleHydration=function(n){if(n){var r=Df();n={blockedOn:null,target:n,priority:r};for(var a=0;a<er.length&&r!==0&&r<er[a].priority;a++);er.splice(a,0,n),a===0&&Of(n)}};function nd(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11)}function _l(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11&&(n.nodeType!==8||n.nodeValue!==" react-mount-point-unstable "))}function Jp(){}function $x(n,r,a,u,m){if(m){if(typeof u=="function"){var _=u;u=function(){var ue=vl(T);_.call(ue)}}var T=Yp(r,u,n,0,null,!1,!1,"",Jp);return n._reactRootContainer=T,n[Li]=T.current,Do(n.nodeType===8?n.parentNode:n),jr(),T}for(;m=n.lastChild;)n.removeChild(m);if(typeof u=="function"){var k=u;u=function(){var ue=vl(W);k.call(ue)}}var W=Qu(n,0,!1,null,null,!1,!1,"",Jp);return n._reactRootContainer=W,n[Li]=W.current,Do(n.nodeType===8?n.parentNode:n),jr(function(){gl(r,W,a,u)}),W}function yl(n,r,a,u,m){var _=a._reactRootContainer;if(_){var T=_;if(typeof m=="function"){var k=m;m=function(){var W=vl(T);k.call(W)}}gl(r,T,n,m)}else T=$x(a,r,n,m,u);return vl(T)}Lf=function(n){switch(n.tag){case 3:var r=n.stateNode;if(r.current.memoizedState.isDehydrated){var a=jt(r.pendingLanes);a!==0&&(bc(r,a|1),On(r,Xe()),!(At&6)&&(Ls=Xe()+500,or()))}break;case 13:jr(function(){var u=Ii(n,1);if(u!==null){var m=Tn();di(u,n,1,m)}}),ed(n,1)}},Ac=function(n){if(n.tag===13){var r=Ii(n,134217728);if(r!==null){var a=Tn();di(r,n,134217728,a)}ed(n,134217728)}},Nf=function(n){if(n.tag===13){var r=fr(n),a=Ii(n,r);if(a!==null){var u=Tn();di(a,n,r,u)}ed(n,r)}},Df=function(){return Pt},Uf=function(n,r){var a=Pt;try{return Pt=n,r()}finally{Pt=a}},Le=function(n,r,a){switch(r){case"input":if(wt(n,a),r=a.name,a.type==="radio"&&r!=null){for(a=n;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll("input[name="+JSON.stringify(""+r)+'][type="radio"]'),r=0;r<a.length;r++){var u=a[r];if(u!==n&&u.form===n.form){var m=Fa(u);if(!m)throw Error(t(90));Q(u),wt(u,m)}}}break;case"textarea":be(n,a);break;case"select":r=a.value,r!=null&&oe(n,!!a.multiple,r,!1)}},tt=$u,je=jr;var Yx={usingClientEntryPoint:!1,Events:[Oo,xs,Fa,ae,pe,$u]},Ko={findFiberByHostInstance:Fr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},qx={bundleType:Ko.bundleType,version:Ko.version,rendererPackageName:Ko.rendererPackageName,rendererConfig:Ko.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:P.ReactCurrentDispatcher,findHostInstanceByFiber:function(n){return n=fe(n),n===null?null:n.stateNode},findFiberByHostInstance:Ko.findFiberByHostInstance||Xx,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Sl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Sl.isDisabled&&Sl.supportsFiber)try{Pn=Sl.inject(qx),bt=Sl}catch{}}return Fn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Yx,Fn.createPortal=function(n,r){var a=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!nd(r))throw Error(t(200));return jx(n,r,null,a)},Fn.createRoot=function(n,r){if(!nd(n))throw Error(t(299));var a=!1,u="",m=Kp;return r!=null&&(r.unstable_strictMode===!0&&(a=!0),r.identifierPrefix!==void 0&&(u=r.identifierPrefix),r.onRecoverableError!==void 0&&(m=r.onRecoverableError)),r=Qu(n,1,!1,null,null,a,!1,u,m),n[Li]=r.current,Do(n.nodeType===8?n.parentNode:n),new td(r)},Fn.findDOMNode=function(n){if(n==null)return null;if(n.nodeType===1)return n;var r=n._reactInternals;if(r===void 0)throw typeof n.render=="function"?Error(t(188)):(n=Object.keys(n).join(","),Error(t(268,n)));return n=fe(r),n=n===null?null:n.stateNode,n},Fn.flushSync=function(n){return jr(n)},Fn.hydrate=function(n,r,a){if(!_l(r))throw Error(t(200));return yl(null,n,r,!0,a)},Fn.hydrateRoot=function(n,r,a){if(!nd(n))throw Error(t(405));var u=a!=null&&a.hydratedSources||null,m=!1,_="",T=Kp;if(a!=null&&(a.unstable_strictMode===!0&&(m=!0),a.identifierPrefix!==void 0&&(_=a.identifierPrefix),a.onRecoverableError!==void 0&&(T=a.onRecoverableError)),r=Yp(r,null,n,1,a??null,m,!1,_,T),n[Li]=r.current,Do(n),u)for(n=0;n<u.length;n++)a=u[n],m=a._getVersion,m=m(a._source),r.mutableSourceEagerHydrationData==null?r.mutableSourceEagerHydrationData=[a,m]:r.mutableSourceEagerHydrationData.push(a,m);return new xl(r)},Fn.render=function(n,r,a){if(!_l(r))throw Error(t(200));return yl(null,n,r,!1,a)},Fn.unmountComponentAtNode=function(n){if(!_l(n))throw Error(t(40));return n._reactRootContainer?(jr(function(){yl(null,null,n,!1,function(){n._reactRootContainer=null,n[Li]=null})}),!0):!1},Fn.unstable_batchedUpdates=$u,Fn.unstable_renderSubtreeIntoContainer=function(n,r,a,u){if(!_l(a))throw Error(t(200));if(n==null||n._reactInternals===void 0)throw Error(t(38));return yl(n,r,a,!1,u)},Fn.version="18.3.1-next-f1338f8080-20240426",Fn}var sm;function lv(){if(sm)return sd.exports;sm=1;function s(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s)}catch(e){console.error(e)}}return s(),sd.exports=o_(),sd.exports}var om;function a_(){if(om)return Ml;om=1;var s=lv();return Ml.createRoot=s.createRoot,Ml.hydrateRoot=s.hydrateRoot,Ml}var l_=a_();lv();/**
 * @remix-run/router v1.21.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function aa(){return aa=Object.assign?Object.assign.bind():function(s){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(s[i]=t[i])}return s},aa.apply(this,arguments)}var Er;(function(s){s.Pop="POP",s.Push="PUSH",s.Replace="REPLACE"})(Er||(Er={}));const am="popstate";function c_(s){s===void 0&&(s={});function e(i,o){let{pathname:l,search:d,hash:c}=i.location;return Xd("",{pathname:l,search:d,hash:c},o.state&&o.state.usr||null,o.state&&o.state.key||"default")}function t(i,o){return typeof o=="string"?o:ec(o)}return d_(e,t,null,s)}function Wt(s,e){if(s===!1||s===null||typeof s>"u")throw new Error(e)}function cv(s,e){if(!s){typeof console<"u"&&console.warn(e);try{throw new Error(e)}catch{}}}function u_(){return Math.random().toString(36).substr(2,8)}function lm(s,e){return{usr:s.state,key:s.key,idx:e}}function Xd(s,e,t,i){return t===void 0&&(t=null),aa({pathname:typeof s=="string"?s:s.pathname,search:"",hash:""},typeof e=="string"?fo(e):e,{state:t,key:e&&e.key||i||u_()})}function ec(s){let{pathname:e="/",search:t="",hash:i=""}=s;return t&&t!=="?"&&(e+=t.charAt(0)==="?"?t:"?"+t),i&&i!=="#"&&(e+=i.charAt(0)==="#"?i:"#"+i),e}function fo(s){let e={};if(s){let t=s.indexOf("#");t>=0&&(e.hash=s.substr(t),s=s.substr(0,t));let i=s.indexOf("?");i>=0&&(e.search=s.substr(i),s=s.substr(0,i)),s&&(e.pathname=s)}return e}function d_(s,e,t,i){i===void 0&&(i={});let{window:o=document.defaultView,v5Compat:l=!1}=i,d=o.history,c=Er.Pop,f=null,h=p();h==null&&(h=0,d.replaceState(aa({},d.state,{idx:h}),""));function p(){return(d.state||{idx:null}).idx}function g(){c=Er.Pop;let x=p(),v=x==null?null:x-h;h=x,f&&f({action:c,location:M.location,delta:v})}function y(x,v){c=Er.Push;let b=Xd(M.location,x,v);h=p()+1;let A=lm(b,h),P=M.createHref(b);try{d.pushState(A,"",P)}catch(z){if(z instanceof DOMException&&z.name==="DataCloneError")throw z;o.location.assign(P)}l&&f&&f({action:c,location:M.location,delta:1})}function S(x,v){c=Er.Replace;let b=Xd(M.location,x,v);h=p();let A=lm(b,h),P=M.createHref(b);d.replaceState(A,"",P),l&&f&&f({action:c,location:M.location,delta:0})}function E(x){let v=o.location.origin!=="null"?o.location.origin:o.location.href,b=typeof x=="string"?x:ec(x);return b=b.replace(/ $/,"%20"),Wt(v,"No window.location.(origin|href) available to create URL for href: "+b),new URL(b,v)}let M={get action(){return c},get location(){return s(o,d)},listen(x){if(f)throw new Error("A history only accepts one active listener");return o.addEventListener(am,g),f=x,()=>{o.removeEventListener(am,g),f=null}},createHref(x){return e(o,x)},createURL:E,encodeLocation(x){let v=E(x);return{pathname:v.pathname,search:v.search,hash:v.hash}},push:y,replace:S,go(x){return d.go(x)}};return M}var cm;(function(s){s.data="data",s.deferred="deferred",s.redirect="redirect",s.error="error"})(cm||(cm={}));function f_(s,e,t){return t===void 0&&(t="/"),h_(s,e,t)}function h_(s,e,t,i){let o=typeof e=="string"?fo(e):e,l=oo(o.pathname||"/",t);if(l==null)return null;let d=uv(s);p_(d);let c=null;for(let f=0;c==null&&f<d.length;++f){let h=T_(l);c=E_(d[f],h)}return c}function uv(s,e,t,i){e===void 0&&(e=[]),t===void 0&&(t=[]),i===void 0&&(i="");let o=(l,d,c)=>{let f={relativePath:c===void 0?l.path||"":c,caseSensitive:l.caseSensitive===!0,childrenIndex:d,route:l};f.relativePath.startsWith("/")&&(Wt(f.relativePath.startsWith(i),'Absolute route path "'+f.relativePath+'" nested under path '+('"'+i+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),f.relativePath=f.relativePath.slice(i.length));let h=Ar([i,f.relativePath]),p=t.concat(f);l.children&&l.children.length>0&&(Wt(l.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+h+'".')),uv(l.children,e,p,h)),!(l.path==null&&!l.index)&&e.push({path:h,score:S_(h,l.index),routesMeta:p})};return s.forEach((l,d)=>{var c;if(l.path===""||!((c=l.path)!=null&&c.includes("?")))o(l,d);else for(let f of dv(l.path))o(l,d,f)}),e}function dv(s){let e=s.split("/");if(e.length===0)return[];let[t,...i]=e,o=t.endsWith("?"),l=t.replace(/\?$/,"");if(i.length===0)return o?[l,""]:[l];let d=dv(i.join("/")),c=[];return c.push(...d.map(f=>f===""?l:[l,f].join("/"))),o&&c.push(...d),c.map(f=>s.startsWith("/")&&f===""?"/":f)}function p_(s){s.sort((e,t)=>e.score!==t.score?t.score-e.score:M_(e.routesMeta.map(i=>i.childrenIndex),t.routesMeta.map(i=>i.childrenIndex)))}const m_=/^:[\w-]+$/,g_=3,v_=2,x_=1,__=10,y_=-2,um=s=>s==="*";function S_(s,e){let t=s.split("/"),i=t.length;return t.some(um)&&(i+=y_),e&&(i+=v_),t.filter(o=>!um(o)).reduce((o,l)=>o+(m_.test(l)?g_:l===""?x_:__),i)}function M_(s,e){return s.length===e.length&&s.slice(0,-1).every((i,o)=>i===e[o])?s[s.length-1]-e[e.length-1]:0}function E_(s,e,t){let{routesMeta:i}=s,o={},l="/",d=[];for(let c=0;c<i.length;++c){let f=i[c],h=c===i.length-1,p=l==="/"?e:e.slice(l.length)||"/",g=$d({path:f.relativePath,caseSensitive:f.caseSensitive,end:h},p),y=f.route;if(!g)return null;Object.assign(o,g.params),d.push({params:o,pathname:Ar([l,g.pathname]),pathnameBase:R_(Ar([l,g.pathnameBase])),route:y}),g.pathnameBase!=="/"&&(l=Ar([l,g.pathnameBase]))}return d}function $d(s,e){typeof s=="string"&&(s={path:s,caseSensitive:!1,end:!0});let[t,i]=w_(s.path,s.caseSensitive,s.end),o=e.match(t);if(!o)return null;let l=o[0],d=l.replace(/(.)\/+$/,"$1"),c=o.slice(1);return{params:i.reduce((h,p,g)=>{let{paramName:y,isOptional:S}=p;if(y==="*"){let M=c[g]||"";d=l.slice(0,l.length-M.length).replace(/(.)\/+$/,"$1")}const E=c[g];return S&&!E?h[y]=void 0:h[y]=(E||"").replace(/%2F/g,"/"),h},{}),pathname:l,pathnameBase:d,pattern:s}}function w_(s,e,t){e===void 0&&(e=!1),t===void 0&&(t=!0),cv(s==="*"||!s.endsWith("*")||s.endsWith("/*"),'Route path "'+s+'" will be treated as if it were '+('"'+s.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+s.replace(/\*$/,"/*")+'".'));let i=[],o="^"+s.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(d,c,f)=>(i.push({paramName:c,isOptional:f!=null}),f?"/?([^\\/]+)?":"/([^\\/]+)"));return s.endsWith("*")?(i.push({paramName:"*"}),o+=s==="*"||s==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):t?o+="\\/*$":s!==""&&s!=="/"&&(o+="(?:(?=\\/|$))"),[new RegExp(o,e?void 0:"i"),i]}function T_(s){try{return s.split("/").map(e=>decodeURIComponent(e).replace(/\//g,"%2F")).join("/")}catch(e){return cv(!1,'The URL path "'+s+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+e+").")),s}}function oo(s,e){if(e==="/")return s;if(!s.toLowerCase().startsWith(e.toLowerCase()))return null;let t=e.endsWith("/")?e.length-1:e.length,i=s.charAt(t);return i&&i!=="/"?null:s.slice(t)||"/"}function b_(s,e){e===void 0&&(e="/");let{pathname:t,search:i="",hash:o=""}=typeof s=="string"?fo(s):s;return{pathname:t?t.startsWith("/")?t:A_(t,e):e,search:P_(i),hash:L_(o)}}function A_(s,e){let t=e.replace(/\/+$/,"").split("/");return s.split("/").forEach(o=>{o===".."?t.length>1&&t.pop():o!=="."&&t.push(o)}),t.length>1?t.join("/"):"/"}function ld(s,e,t,i){return"Cannot include a '"+s+"' character in a manually specified "+("`to."+e+"` field ["+JSON.stringify(i)+"].  Please separate it out to the ")+("`to."+t+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function C_(s){return s.filter((e,t)=>t===0||e.route.path&&e.route.path.length>0)}function ff(s,e){let t=C_(s);return e?t.map((i,o)=>o===t.length-1?i.pathname:i.pathnameBase):t.map(i=>i.pathnameBase)}function hf(s,e,t,i){i===void 0&&(i=!1);let o;typeof s=="string"?o=fo(s):(o=aa({},s),Wt(!o.pathname||!o.pathname.includes("?"),ld("?","pathname","search",o)),Wt(!o.pathname||!o.pathname.includes("#"),ld("#","pathname","hash",o)),Wt(!o.search||!o.search.includes("#"),ld("#","search","hash",o)));let l=s===""||o.pathname==="",d=l?"/":o.pathname,c;if(d==null)c=t;else{let g=e.length-1;if(!i&&d.startsWith("..")){let y=d.split("/");for(;y[0]==="..";)y.shift(),g-=1;o.pathname=y.join("/")}c=g>=0?e[g]:"/"}let f=b_(o,c),h=d&&d!=="/"&&d.endsWith("/"),p=(l||d===".")&&t.endsWith("/");return!f.pathname.endsWith("/")&&(h||p)&&(f.pathname+="/"),f}const Ar=s=>s.join("/").replace(/\/\/+/g,"/"),R_=s=>s.replace(/\/+$/,"").replace(/^\/*/,"/"),P_=s=>!s||s==="?"?"":s.startsWith("?")?s:"?"+s,L_=s=>!s||s==="#"?"":s.startsWith("#")?s:"#"+s;function N_(s){return s!=null&&typeof s.status=="number"&&typeof s.statusText=="string"&&typeof s.internal=="boolean"&&"data"in s}const fv=["post","put","patch","delete"];new Set(fv);const D_=["get",...fv];new Set(D_);/**
 * React Router v6.28.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function la(){return la=Object.assign?Object.assign.bind():function(s){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(s[i]=t[i])}return s},la.apply(this,arguments)}const pc=ie.createContext(null),hv=ie.createContext(null),Yi=ie.createContext(null),mc=ie.createContext(null),bi=ie.createContext({outlet:null,matches:[],isDataRoute:!1}),pv=ie.createContext(null);function U_(s,e){let{relative:t}=e===void 0?{}:e;ho()||Wt(!1);let{basename:i,navigator:o}=ie.useContext(Yi),{hash:l,pathname:d,search:c}=gc(s,{relative:t}),f=d;return i!=="/"&&(f=d==="/"?i:Ar([i,d])),o.createHref({pathname:f,search:c,hash:l})}function ho(){return ie.useContext(mc)!=null}function po(){return ho()||Wt(!1),ie.useContext(mc).location}function mv(s){ie.useContext(Yi).static||ie.useLayoutEffect(s)}function gv(){let{isDataRoute:s}=ie.useContext(bi);return s?K_():I_()}function I_(){ho()||Wt(!1);let s=ie.useContext(pc),{basename:e,future:t,navigator:i}=ie.useContext(Yi),{matches:o}=ie.useContext(bi),{pathname:l}=po(),d=JSON.stringify(ff(o,t.v7_relativeSplatPath)),c=ie.useRef(!1);return mv(()=>{c.current=!0}),ie.useCallback(function(h,p){if(p===void 0&&(p={}),!c.current)return;if(typeof h=="number"){i.go(h);return}let g=hf(h,JSON.parse(d),l,p.relative==="path");s==null&&e!=="/"&&(g.pathname=g.pathname==="/"?e:Ar([e,g.pathname])),(p.replace?i.replace:i.push)(g,p.state,p)},[e,i,d,l,s])}const O_=ie.createContext(null);function F_(s){let e=ie.useContext(bi).outlet;return e&&ie.createElement(O_.Provider,{value:s},e)}function k_(){let{matches:s}=ie.useContext(bi),e=s[s.length-1];return e?e.params:{}}function gc(s,e){let{relative:t}=e===void 0?{}:e,{future:i}=ie.useContext(Yi),{matches:o}=ie.useContext(bi),{pathname:l}=po(),d=JSON.stringify(ff(o,i.v7_relativeSplatPath));return ie.useMemo(()=>hf(s,JSON.parse(d),l,t==="path"),[s,d,l,t])}function z_(s,e){return B_(s,e)}function B_(s,e,t,i){ho()||Wt(!1);let{navigator:o}=ie.useContext(Yi),{matches:l}=ie.useContext(bi),d=l[l.length-1],c=d?d.params:{};d&&d.pathname;let f=d?d.pathnameBase:"/";d&&d.route;let h=po(),p;if(e){var g;let x=typeof e=="string"?fo(e):e;f==="/"||(g=x.pathname)!=null&&g.startsWith(f)||Wt(!1),p=x}else p=h;let y=p.pathname||"/",S=y;if(f!=="/"){let x=f.replace(/^\//,"").split("/");S="/"+y.replace(/^\//,"").split("/").slice(x.length).join("/")}let E=f_(s,{pathname:S}),M=j_(E&&E.map(x=>Object.assign({},x,{params:Object.assign({},c,x.params),pathname:Ar([f,o.encodeLocation?o.encodeLocation(x.pathname).pathname:x.pathname]),pathnameBase:x.pathnameBase==="/"?f:Ar([f,o.encodeLocation?o.encodeLocation(x.pathnameBase).pathname:x.pathnameBase])})),l,t,i);return e&&M?ie.createElement(mc.Provider,{value:{location:la({pathname:"/",search:"",hash:"",state:null,key:"default"},p),navigationType:Er.Pop}},M):M}function H_(){let s=q_(),e=N_(s)?s.status+" "+s.statusText:s instanceof Error?s.message:JSON.stringify(s),t=s instanceof Error?s.stack:null,o={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return ie.createElement(ie.Fragment,null,ie.createElement("h2",null,"Unexpected Application Error!"),ie.createElement("h3",{style:{fontStyle:"italic"}},e),t?ie.createElement("pre",{style:o},t):null,null)}const V_=ie.createElement(H_,null);class G_ extends ie.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){console.error("React Router caught the following error during render",e,t)}render(){return this.state.error!==void 0?ie.createElement(bi.Provider,{value:this.props.routeContext},ie.createElement(pv.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function W_(s){let{routeContext:e,match:t,children:i}=s,o=ie.useContext(pc);return o&&o.static&&o.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(o.staticContext._deepestRenderedBoundaryId=t.route.id),ie.createElement(bi.Provider,{value:e},i)}function j_(s,e,t,i){var o;if(e===void 0&&(e=[]),t===void 0&&(t=null),i===void 0&&(i=null),s==null){var l;if(!t)return null;if(t.errors)s=t.matches;else if((l=i)!=null&&l.v7_partialHydration&&e.length===0&&!t.initialized&&t.matches.length>0)s=t.matches;else return null}let d=s,c=(o=t)==null?void 0:o.errors;if(c!=null){let p=d.findIndex(g=>g.route.id&&(c==null?void 0:c[g.route.id])!==void 0);p>=0||Wt(!1),d=d.slice(0,Math.min(d.length,p+1))}let f=!1,h=-1;if(t&&i&&i.v7_partialHydration)for(let p=0;p<d.length;p++){let g=d[p];if((g.route.HydrateFallback||g.route.hydrateFallbackElement)&&(h=p),g.route.id){let{loaderData:y,errors:S}=t,E=g.route.loader&&y[g.route.id]===void 0&&(!S||S[g.route.id]===void 0);if(g.route.lazy||E){f=!0,h>=0?d=d.slice(0,h+1):d=[d[0]];break}}}return d.reduceRight((p,g,y)=>{let S,E=!1,M=null,x=null;t&&(S=c&&g.route.id?c[g.route.id]:void 0,M=g.route.errorElement||V_,f&&(h<0&&y===0?(J_("route-fallback"),E=!0,x=null):h===y&&(E=!0,x=g.route.hydrateFallbackElement||null)));let v=e.concat(d.slice(0,y+1)),b=()=>{let A;return S?A=M:E?A=x:g.route.Component?A=ie.createElement(g.route.Component,null):g.route.element?A=g.route.element:A=p,ie.createElement(W_,{match:g,routeContext:{outlet:p,matches:v,isDataRoute:t!=null},children:A})};return t&&(g.route.ErrorBoundary||g.route.errorElement||y===0)?ie.createElement(G_,{location:t.location,revalidation:t.revalidation,component:M,error:S,children:b(),routeContext:{outlet:null,matches:v,isDataRoute:!0}}):b()},null)}var vv=function(s){return s.UseBlocker="useBlocker",s.UseRevalidator="useRevalidator",s.UseNavigateStable="useNavigate",s}(vv||{}),xv=function(s){return s.UseBlocker="useBlocker",s.UseLoaderData="useLoaderData",s.UseActionData="useActionData",s.UseRouteError="useRouteError",s.UseNavigation="useNavigation",s.UseRouteLoaderData="useRouteLoaderData",s.UseMatches="useMatches",s.UseRevalidator="useRevalidator",s.UseNavigateStable="useNavigate",s.UseRouteId="useRouteId",s}(xv||{});function X_(s){let e=ie.useContext(pc);return e||Wt(!1),e}function $_(s){let e=ie.useContext(hv);return e||Wt(!1),e}function Y_(s){let e=ie.useContext(bi);return e||Wt(!1),e}function _v(s){let e=Y_(),t=e.matches[e.matches.length-1];return t.route.id||Wt(!1),t.route.id}function q_(){var s;let e=ie.useContext(pv),t=$_(),i=_v();return e!==void 0?e:(s=t.errors)==null?void 0:s[i]}function K_(){let{router:s}=X_(vv.UseNavigateStable),e=_v(xv.UseNavigateStable),t=ie.useRef(!1);return mv(()=>{t.current=!0}),ie.useCallback(function(o,l){l===void 0&&(l={}),t.current&&(typeof o=="number"?s.navigate(o):s.navigate(o,la({fromRouteId:e},l)))},[s,e])}const dm={};function J_(s,e,t){dm[s]||(dm[s]=!0)}const fm={};function Z_(s,e){fm[e]||(fm[e]=!0,console.warn(e))}const hm=(s,e,t)=>Z_(s,"⚠️ React Router Future Flag Warning: "+e+". "+("You can use the `"+s+"` future flag to opt-in early. ")+("For more information, see "+t+"."));function Q_(s,e){s!=null&&s.v7_startTransition||hm("v7_startTransition","React Router will begin wrapping state updates in `React.startTransition` in v7","https://reactrouter.com/v6/upgrading/future#v7_starttransition"),s!=null&&s.v7_relativeSplatPath||hm("v7_relativeSplatPath","Relative route resolution within Splat routes is changing in v7","https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath")}function pm(s){let{to:e,replace:t,state:i,relative:o}=s;ho()||Wt(!1);let{future:l,static:d}=ie.useContext(Yi),{matches:c}=ie.useContext(bi),{pathname:f}=po(),h=gv(),p=hf(e,ff(c,l.v7_relativeSplatPath),f,o==="path"),g=JSON.stringify(p);return ie.useEffect(()=>h(JSON.parse(g),{replace:t,state:i,relative:o}),[h,g,o,t,i]),null}function ey(s){return F_(s.context)}function Sr(s){Wt(!1)}function ty(s){let{basename:e="/",children:t=null,location:i,navigationType:o=Er.Pop,navigator:l,static:d=!1,future:c}=s;ho()&&Wt(!1);let f=e.replace(/^\/*/,"/"),h=ie.useMemo(()=>({basename:f,navigator:l,static:d,future:la({v7_relativeSplatPath:!1},c)}),[f,c,l,d]);typeof i=="string"&&(i=fo(i));let{pathname:p="/",search:g="",hash:y="",state:S=null,key:E="default"}=i,M=ie.useMemo(()=>{let x=oo(p,f);return x==null?null:{location:{pathname:x,search:g,hash:y,state:S,key:E},navigationType:o}},[f,p,g,y,S,E,o]);return M==null?null:ie.createElement(Yi.Provider,{value:h},ie.createElement(mc.Provider,{children:t,value:M}))}function ny(s){let{children:e,location:t}=s;return z_(Yd(e),t)}new Promise(()=>{});function Yd(s,e){e===void 0&&(e=[]);let t=[];return ie.Children.forEach(s,(i,o)=>{if(!ie.isValidElement(i))return;let l=[...e,o];if(i.type===ie.Fragment){t.push.apply(t,Yd(i.props.children,l));return}i.type!==Sr&&Wt(!1),!i.props.index||!i.props.children||Wt(!1);let d={id:i.props.id||l.join("-"),caseSensitive:i.props.caseSensitive,element:i.props.element,Component:i.props.Component,index:i.props.index,path:i.props.path,loader:i.props.loader,action:i.props.action,errorElement:i.props.errorElement,ErrorBoundary:i.props.ErrorBoundary,hasErrorBoundary:i.props.ErrorBoundary!=null||i.props.errorElement!=null,shouldRevalidate:i.props.shouldRevalidate,handle:i.props.handle,lazy:i.props.lazy};i.props.children&&(d.children=Yd(i.props.children,l)),t.push(d)}),t}/**
 * React Router DOM v6.28.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function tc(){return tc=Object.assign?Object.assign.bind():function(s){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(s[i]=t[i])}return s},tc.apply(this,arguments)}function yv(s,e){if(s==null)return{};var t={},i=Object.keys(s),o,l;for(l=0;l<i.length;l++)o=i[l],!(e.indexOf(o)>=0)&&(t[o]=s[o]);return t}function iy(s){return!!(s.metaKey||s.altKey||s.ctrlKey||s.shiftKey)}function ry(s,e){return s.button===0&&(!e||e==="_self")&&!iy(s)}const sy=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],oy=["aria-current","caseSensitive","className","end","style","to","viewTransition","children"],ay="6";try{window.__reactRouterVersion=ay}catch{}const ly=ie.createContext({isTransitioning:!1}),cy="startTransition",mm=i_[cy];function uy(s){let{basename:e,children:t,future:i,window:o}=s,l=ie.useRef();l.current==null&&(l.current=c_({window:o,v5Compat:!0}));let d=l.current,[c,f]=ie.useState({action:d.action,location:d.location}),{v7_startTransition:h}=i||{},p=ie.useCallback(g=>{h&&mm?mm(()=>f(g)):f(g)},[f,h]);return ie.useLayoutEffect(()=>d.listen(p),[d,p]),ie.useEffect(()=>Q_(i),[i]),ie.createElement(ty,{basename:e,children:t,location:c.location,navigationType:c.action,navigator:d,future:i})}const dy=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",fy=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Sv=ie.forwardRef(function(e,t){let{onClick:i,relative:o,reloadDocument:l,replace:d,state:c,target:f,to:h,preventScrollReset:p,viewTransition:g}=e,y=yv(e,sy),{basename:S}=ie.useContext(Yi),E,M=!1;if(typeof h=="string"&&fy.test(h)&&(E=h,dy))try{let A=new URL(window.location.href),P=h.startsWith("//")?new URL(A.protocol+h):new URL(h),z=oo(P.pathname,S);P.origin===A.origin&&z!=null?h=z+P.search+P.hash:M=!0}catch{}let x=U_(h,{relative:o}),v=py(h,{replace:d,state:c,target:f,preventScrollReset:p,relative:o,viewTransition:g});function b(A){i&&i(A),A.defaultPrevented||v(A)}return ie.createElement("a",tc({},y,{href:E||x,onClick:M||l?i:b,ref:t,target:f}))}),gm=ie.forwardRef(function(e,t){let{"aria-current":i="page",caseSensitive:o=!1,className:l="",end:d=!1,style:c,to:f,viewTransition:h,children:p}=e,g=yv(e,oy),y=gc(f,{relative:g.relative}),S=po(),E=ie.useContext(hv),{navigator:M,basename:x}=ie.useContext(Yi),v=E!=null&&my(y)&&h===!0,b=M.encodeLocation?M.encodeLocation(y).pathname:y.pathname,A=S.pathname,P=E&&E.navigation&&E.navigation.location?E.navigation.location.pathname:null;o||(A=A.toLowerCase(),P=P?P.toLowerCase():null,b=b.toLowerCase()),P&&x&&(P=oo(P,x)||P);const z=b!=="/"&&b.endsWith("/")?b.length-1:b.length;let D=A===b||!d&&A.startsWith(b)&&A.charAt(z)==="/",I=P!=null&&(P===b||!d&&P.startsWith(b)&&P.charAt(b.length)==="/"),ne={isActive:D,isPending:I,isTransitioning:v},R=D?i:void 0,U;typeof l=="function"?U=l(ne):U=[l,D?"active":null,I?"pending":null,v?"transitioning":null].filter(Boolean).join(" ");let se=typeof c=="function"?c(ne):c;return ie.createElement(Sv,tc({},g,{"aria-current":R,className:U,ref:t,style:se,to:f,viewTransition:h}),typeof p=="function"?p(ne):p)});var qd;(function(s){s.UseScrollRestoration="useScrollRestoration",s.UseSubmit="useSubmit",s.UseSubmitFetcher="useSubmitFetcher",s.UseFetcher="useFetcher",s.useViewTransitionState="useViewTransitionState"})(qd||(qd={}));var vm;(function(s){s.UseFetcher="useFetcher",s.UseFetchers="useFetchers",s.UseScrollRestoration="useScrollRestoration"})(vm||(vm={}));function hy(s){let e=ie.useContext(pc);return e||Wt(!1),e}function py(s,e){let{target:t,replace:i,state:o,preventScrollReset:l,relative:d,viewTransition:c}=e===void 0?{}:e,f=gv(),h=po(),p=gc(s,{relative:d});return ie.useCallback(g=>{if(ry(g,t)){g.preventDefault();let y=i!==void 0?i:ec(h)===ec(p);f(s,{replace:y,state:o,preventScrollReset:l,relative:d,viewTransition:c})}},[h,f,p,i,o,t,s,l,d,c])}function my(s,e){e===void 0&&(e={});let t=ie.useContext(ly);t==null&&Wt(!1);let{basename:i}=hy(qd.useViewTransitionState),o=gc(s,{relative:e.relative});if(!t.isTransitioning)return!1;let l=oo(t.currentLocation.pathname,i)||t.currentLocation.pathname,d=oo(t.nextLocation.pathname,i)||t.nextLocation.pathname;return $d(o.pathname,d)!=null||$d(o.pathname,l)!=null}async function zn(s,e){const t=await fetch(s,e),i=await t.json().catch(()=>({}));if(!t.ok)throw new Error(i.detail||t.statusText);return i}const os=(s,e)=>zn(s,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e??{})}),Kd=(s,e,t,i)=>{const o=new FormData;return o.append(e,t,i),zn(s,{method:"POST",body:o})};function vc(s,e){return new Promise(t=>{const i=new EventSource(`/api/jobs/${s}/events`);i.onmessage=o=>{const l=JSON.parse(o.data);e(l),(l.stage==="done"||l.stage==="failed")&&(i.close(),t(l))}})}const Qt=s=>`${Math.round((s??0)*100)}%`;async function gy(s){const t=await new AudioContext().decodeAudioData(await s.arrayBuffer()),i=new OfflineAudioContext(1,Math.ceil(t.duration*16e3),16e3),o=i.createBufferSource();o.buffer=t,o.connect(i.destination),o.start();const l=(await i.startRendering()).getChannelData(0),d=new DataView(new ArrayBuffer(44+l.length*2)),c=(f,h)=>[...h].forEach((p,g)=>d.setUint8(f+g,p.charCodeAt(0)));return c(0,"RIFF"),d.setUint32(4,36+l.length*2,!0),c(8,"WAVEfmt "),d.setUint32(16,16,!0),d.setUint16(20,1,!0),d.setUint16(22,1,!0),d.setUint32(24,16e3,!0),d.setUint32(28,32e3,!0),d.setUint16(32,2,!0),d.setUint16(34,16,!0),c(36,"data"),d.setUint32(40,l.length*2,!0),l.forEach((f,h)=>d.setInt16(44+h*2,Math.max(-1,Math.min(1,f))*32767,!0)),new Blob([d],{type:"audio/wav"})}async function Zl(s,e){const{job:t}=await s,i=await vc(t,o=>{o.stage==="step"&&e(o.step)});if(i.stage==="failed")throw new Error(i.error||"failed");return i.result}function Mv(s=0){const[e,t]=ie.useState(null);return ie.useEffect(()=>{zn("/api/versions").then(t).catch(()=>{})},[s]),e}const vy=[["/","Break it"],["/arena","You vs Muse"],["/autopilot","Autopilot"],["/readiness","Readiness"]];function xy({className:s=""}){return w.jsxs("span",{className:`inline-grid gap-[3px] ${s}`,"aria-hidden":!0,children:[w.jsx("i",{className:"block h-[3px] w-4 bg-ember"}),w.jsx("i",{className:"ml-1 block h-[3px] w-3 bg-ember"}),w.jsx("i",{className:"block h-[3px] w-4 bg-ember"})]})}function _y(){const s=Mv();return w.jsxs("div",{className:"flex min-h-dvh flex-col",children:[w.jsx("header",{className:"sticky top-3 z-20 flex justify-center px-3 pt-4 sm:top-4 sm:pt-5",children:w.jsxs("div",{className:"flex max-w-full items-center gap-1 rounded-full border border-white/10 bg-white/[.04] p-1.5 pl-5 shadow-[0_8px_32px_rgba(0,0,0,.45),inset_0_1px_0_rgba(255,255,255,.06)] backdrop-blur-xl backdrop-saturate-150",children:[w.jsxs(gm,{to:"/",className:"mr-3 flex shrink-0 items-center gap-2.5 text-base font-medium tracking-tight",children:[w.jsx(xy,{})," ",w.jsx("span",{className:"hidden sm:inline",children:"nemesis"})]}),w.jsx("nav",{className:"flex min-w-0 gap-1 overflow-x-auto",children:vy.map(([e,t])=>w.jsx(gm,{to:e,end:e==="/",className:({isActive:i})=>`whitespace-nowrap rounded-full px-3 py-2 text-[15px] transition-colors sm:px-4 ${i?"bg-white/10 text-ink":"text-mute hover:text-ink"}`,children:t},e))}),s&&w.jsx("span",{className:"ml-2 hidden shrink-0 rounded-full bg-white/[.06] px-3.5 py-2 font-mono text-[13px] text-mute md:block",children:s.live})]})}),w.jsx("main",{className:"mx-auto w-full max-w-7xl flex-1 px-5 pt-8 pb-24 sm:px-8",children:w.jsx(ey,{})}),w.jsxs("footer",{className:"mx-auto flex w-full max-w-7xl flex-wrap justify-between gap-4 border-t border-line px-5 py-8 text-xs text-faint sm:px-8",children:[w.jsx("span",{children:"Muse Wonder · Muse Spark · Muse Voice Transcribe · Muse Glimmer · MuJoCo MJX"}),w.jsx("a",{className:"hover:text-mute",href:"https://github.com/divagr18/nemesis",children:"source"})]})]})}/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yy=s=>s.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),Ev=(...s)=>s.filter((e,t,i)=>!!e&&e.trim()!==""&&i.indexOf(e)===t).join(" ").trim();/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Sy={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const My=ie.forwardRef(({color:s="currentColor",size:e=24,strokeWidth:t=2,absoluteStrokeWidth:i,className:o="",children:l,iconNode:d,...c},f)=>ie.createElement("svg",{ref:f,...Sy,width:e,height:e,stroke:s,strokeWidth:i?Number(t)*24/Number(e):t,className:Ev("lucide",o),...c},[...d.map(([h,p])=>ie.createElement(h,p)),...Array.isArray(l)?l:[l]]));/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vi=(s,e)=>{const t=ie.forwardRef(({className:i,...o},l)=>ie.createElement(My,{ref:l,iconNode:e,className:Ev(`lucide-${yy(s)}`,i),...o}));return t.displayName=`${s}`,t};/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fa=vi("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wv=vi("ArrowUp",[["path",{d:"m5 12 7-7 7 7",key:"hav0vg"}],["path",{d:"M12 19V5",key:"x0mq9r"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ey=vi("Camera",[["path",{d:"M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",key:"1tc9qg"}],["circle",{cx:"12",cy:"13",r:"3",key:"1vg3eu"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ha=vi("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xc=vi("LoaderCircle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wy=vi("Lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ty=vi("Mic",[["path",{d:"M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z",key:"131961"}],["path",{d:"M19 10v2a7 7 0 0 1-14 0v-2",key:"1vc78b"}],["line",{x1:"12",x2:"12",y1:"19",y2:"22",key:"x3vr5v"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const by=vi("RotateCcw",[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ay=vi("Share",[["path",{d:"M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8",key:"1b2hhj"}],["polyline",{points:"16 6 12 2 8 6",key:"m901s6"}],["line",{x1:"12",x2:"12",y1:"2",y2:"15",key:"1p0rca"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cy=vi("Square",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pf=vi("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);function Ry({events:s}){const e=s.at(-1),t=s.filter(c=>c.stage==="progress").at(-1),i=s.find(c=>c.stage==="verified"||c.stage==="rejected"),o=i?i.stage==="verified"?`${i.version} is live`:"Kept the old robot":(e==null?void 0:e.stage)==="gating"?"Checking for regressions":(e==null?void 0:e.stage)==="bank"?"Building lessons":"Retraining",l=i||(e==null?void 0:e.stage)==="gating"?1:t?t.step/t.total:.04,d=i==null?void 0:i.gate;return w.jsxs("div",{className:"rise rounded-xl border border-line px-4 py-3.5",children:[w.jsxs("p",{className:"text-[14px]",children:[o,!i&&w.jsx("span",{className:"blink text-ember",children:" ●"})]}),w.jsx("div",{className:"mt-3 h-px overflow-hidden bg-line",children:w.jsx("div",{className:"h-full bg-ember transition-[width] duration-700",style:{width:`${l*100}%`}})}),d&&w.jsx("div",{className:"mt-3 space-y-1.5 text-[13px] text-mute",children:[["Fixed",d.checks["fixes the attack"],`${Qt(d.suites.attacks.before)} → ${Qt(d.suites.attacks.after)} falls`],["Still walks",d.checks["still walks"],`${d.suites.nominal.progress_after.toFixed(1)} m in 5 s`],["Nothing else broke",d.checks["no regressions"],`${Qt(d.suites.gauntlet.before)} → ${Qt(d.suites.gauntlet.after)}`]].map(([c,f,h])=>w.jsxs("p",{className:"flex items-center gap-2",children:[f?w.jsx(ha,{size:13,className:"text-acid"}):w.jsx(pf,{size:13,className:"text-ember"})," ",c," ",w.jsxs("span",{className:"text-faint",children:["· ",h]})]},c))})]})}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const mf="160",Ds={ROTATE:0,DOLLY:1,PAN:2},Us={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Py=0,xm=1,Ly=2,Tv=1,bv=2,Wi=3,Dr=0,Rn=1,wi=2,Cr=0,no=1,_m=2,ym=3,Sm=4,Ny=5,es=100,Dy=101,Uy=102,Mm=103,Em=104,Iy=200,Oy=201,Fy=202,ky=203,Jd=204,Zd=205,zy=206,By=207,Hy=208,Vy=209,Gy=210,Wy=211,jy=212,Xy=213,$y=214,Yy=0,qy=1,Ky=2,nc=3,Jy=4,Zy=5,Qy=6,eS=7,Av=0,tS=1,nS=2,Rr=0,iS=1,rS=2,sS=3,Cv=4,oS=5,aS=6,Rv=300,ao=301,lo=302,Qd=303,ef=304,_c=306,ic=1e3,mi=1001,tf=1002,Cn=1003,wm=1004,cd=1005,ii=1006,lS=1007,ca=1008,Pr=1009,cS=1010,uS=1011,gf=1012,Pv=1013,wr=1014,Tr=1015,ua=1016,Lv=1017,Nv=1018,is=1020,dS=1021,gi=1023,fS=1024,hS=1025,rs=1026,co=1027,pS=1028,Dv=1029,mS=1030,Uv=1031,Iv=1033,ud=33776,dd=33777,fd=33778,hd=33779,Tm=35840,bm=35841,Am=35842,Cm=35843,Ov=36196,Rm=37492,Pm=37496,Lm=37808,Nm=37809,Dm=37810,Um=37811,Im=37812,Om=37813,Fm=37814,km=37815,zm=37816,Bm=37817,Hm=37818,Vm=37819,Gm=37820,Wm=37821,pd=36492,jm=36494,Xm=36495,gS=36283,$m=36284,Ym=36285,qm=36286,Fv=3e3,ss=3001,vS=3200,xS=3201,kv=0,_S=1,si="",dn="srgb",Xi="srgb-linear",vf="display-p3",yc="display-p3-linear",rc="linear",Ot="srgb",sc="rec709",oc="p3",Is=7680,Km=519,yS=512,SS=513,MS=514,zv=515,ES=516,wS=517,TS=518,bS=519,Jm=35044,Zm="300 es",nf=1035,ji=2e3,ac=2001;class cs{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const o=this._listeners[e];if(o!==void 0){const l=o.indexOf(t);l!==-1&&o.splice(l,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const o=i.slice(0);for(let l=0,d=o.length;l<d;l++)o[l].call(this,e);e.target=null}}}const _n=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Qm=1234567;const io=Math.PI/180,da=180/Math.PI;function mo(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(_n[s&255]+_n[s>>8&255]+_n[s>>16&255]+_n[s>>24&255]+"-"+_n[e&255]+_n[e>>8&255]+"-"+_n[e>>16&15|64]+_n[e>>24&255]+"-"+_n[t&63|128]+_n[t>>8&255]+"-"+_n[t>>16&255]+_n[t>>24&255]+_n[i&255]+_n[i>>8&255]+_n[i>>16&255]+_n[i>>24&255]).toLowerCase()}function nn(s,e,t){return Math.max(e,Math.min(t,s))}function xf(s,e){return(s%e+e)%e}function AS(s,e,t,i,o){return i+(s-e)*(o-i)/(t-e)}function CS(s,e,t){return s!==e?(t-s)/(e-s):0}function ia(s,e,t){return(1-t)*s+t*e}function RS(s,e,t,i){return ia(s,e,1-Math.exp(-t*i))}function PS(s,e=1){return e-Math.abs(xf(s,e*2)-e)}function LS(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function NS(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function DS(s,e){return s+Math.floor(Math.random()*(e-s+1))}function US(s,e){return s+Math.random()*(e-s)}function IS(s){return s*(.5-Math.random())}function OS(s){s!==void 0&&(Qm=s);let e=Qm+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function FS(s){return s*io}function kS(s){return s*da}function rf(s){return(s&s-1)===0&&s!==0}function zS(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function lc(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function BS(s,e,t,i,o){const l=Math.cos,d=Math.sin,c=l(t/2),f=d(t/2),h=l((e+i)/2),p=d((e+i)/2),g=l((e-i)/2),y=d((e-i)/2),S=l((i-e)/2),E=d((i-e)/2);switch(o){case"XYX":s.set(c*p,f*g,f*y,c*h);break;case"YZY":s.set(f*y,c*p,f*g,c*h);break;case"ZXZ":s.set(f*g,f*y,c*p,c*h);break;case"XZX":s.set(c*p,f*E,f*S,c*h);break;case"YXY":s.set(f*S,c*p,f*E,c*h);break;case"ZYZ":s.set(f*E,f*S,c*p,c*h);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+o)}}function Qs(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function bn(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const ns={DEG2RAD:io,RAD2DEG:da,generateUUID:mo,clamp:nn,euclideanModulo:xf,mapLinear:AS,inverseLerp:CS,lerp:ia,damp:RS,pingpong:PS,smoothstep:LS,smootherstep:NS,randInt:DS,randFloat:US,randFloatSpread:IS,seededRandom:OS,degToRad:FS,radToDeg:kS,isPowerOfTwo:rf,ceilPowerOfTwo:zS,floorPowerOfTwo:lc,setQuaternionFromProperEuler:BS,normalize:bn,denormalize:Qs};class Be{constructor(e=0,t=0){Be.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,o=e.elements;return this.x=o[0]*t+o[3]*i+o[6],this.y=o[1]*t+o[4]*i+o[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(nn(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),o=Math.sin(t),l=this.x-e.x,d=this.y-e.y;return this.x=l*i-d*o+e.x,this.y=l*o+d*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Mt{constructor(e,t,i,o,l,d,c,f,h){Mt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,o,l,d,c,f,h)}set(e,t,i,o,l,d,c,f,h){const p=this.elements;return p[0]=e,p[1]=o,p[2]=c,p[3]=t,p[4]=l,p[5]=f,p[6]=i,p[7]=d,p[8]=h,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,o=t.elements,l=this.elements,d=i[0],c=i[3],f=i[6],h=i[1],p=i[4],g=i[7],y=i[2],S=i[5],E=i[8],M=o[0],x=o[3],v=o[6],b=o[1],A=o[4],P=o[7],z=o[2],D=o[5],I=o[8];return l[0]=d*M+c*b+f*z,l[3]=d*x+c*A+f*D,l[6]=d*v+c*P+f*I,l[1]=h*M+p*b+g*z,l[4]=h*x+p*A+g*D,l[7]=h*v+p*P+g*I,l[2]=y*M+S*b+E*z,l[5]=y*x+S*A+E*D,l[8]=y*v+S*P+E*I,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],o=e[2],l=e[3],d=e[4],c=e[5],f=e[6],h=e[7],p=e[8];return t*d*p-t*c*h-i*l*p+i*c*f+o*l*h-o*d*f}invert(){const e=this.elements,t=e[0],i=e[1],o=e[2],l=e[3],d=e[4],c=e[5],f=e[6],h=e[7],p=e[8],g=p*d-c*h,y=c*f-p*l,S=h*l-d*f,E=t*g+i*y+o*S;if(E===0)return this.set(0,0,0,0,0,0,0,0,0);const M=1/E;return e[0]=g*M,e[1]=(o*h-p*i)*M,e[2]=(c*i-o*d)*M,e[3]=y*M,e[4]=(p*t-o*f)*M,e[5]=(o*l-c*t)*M,e[6]=S*M,e[7]=(i*f-h*t)*M,e[8]=(d*t-i*l)*M,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,o,l,d,c){const f=Math.cos(l),h=Math.sin(l);return this.set(i*f,i*h,-i*(f*d+h*c)+d+e,-o*h,o*f,-o*(-h*d+f*c)+c+t,0,0,1),this}scale(e,t){return this.premultiply(md.makeScale(e,t)),this}rotate(e){return this.premultiply(md.makeRotation(-e)),this}translate(e,t){return this.premultiply(md.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let o=0;o<9;o++)if(t[o]!==i[o])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const md=new Mt;function Bv(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function cc(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function HS(){const s=cc("canvas");return s.style.display="block",s}const eg={};function ra(s){s in eg||(eg[s]=!0,console.warn(s))}const tg=new Mt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),ng=new Mt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),El={[Xi]:{transfer:rc,primaries:sc,toReference:s=>s,fromReference:s=>s},[dn]:{transfer:Ot,primaries:sc,toReference:s=>s.convertSRGBToLinear(),fromReference:s=>s.convertLinearToSRGB()},[yc]:{transfer:rc,primaries:oc,toReference:s=>s.applyMatrix3(ng),fromReference:s=>s.applyMatrix3(tg)},[vf]:{transfer:Ot,primaries:oc,toReference:s=>s.convertSRGBToLinear().applyMatrix3(ng),fromReference:s=>s.applyMatrix3(tg).convertLinearToSRGB()}},VS=new Set([Xi,yc]),Lt={enabled:!0,_workingColorSpace:Xi,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(s){if(!VS.has(s))throw new Error(`Unsupported working color space, "${s}".`);this._workingColorSpace=s},convert:function(s,e,t){if(this.enabled===!1||e===t||!e||!t)return s;const i=El[e].toReference,o=El[t].fromReference;return o(i(s))},fromWorkingColorSpace:function(s,e){return this.convert(s,this._workingColorSpace,e)},toWorkingColorSpace:function(s,e){return this.convert(s,e,this._workingColorSpace)},getPrimaries:function(s){return El[s].primaries},getTransfer:function(s){return s===si?rc:El[s].transfer}};function ro(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function gd(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let Os;class Hv{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Os===void 0&&(Os=cc("canvas")),Os.width=e.width,Os.height=e.height;const i=Os.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=Os}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=cc("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const o=i.getImageData(0,0,e.width,e.height),l=o.data;for(let d=0;d<l.length;d++)l[d]=ro(l[d]/255)*255;return i.putImageData(o,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(ro(t[i]/255)*255):t[i]=ro(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let GS=0;class Vv{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:GS++}),this.uuid=mo(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},o=this.data;if(o!==null){let l;if(Array.isArray(o)){l=[];for(let d=0,c=o.length;d<c;d++)o[d].isDataTexture?l.push(vd(o[d].image)):l.push(vd(o[d]))}else l=vd(o);i.url=l}return t||(e.images[this.uuid]=i),i}}function vd(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Hv.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let WS=0;class Bn extends cs{constructor(e=Bn.DEFAULT_IMAGE,t=Bn.DEFAULT_MAPPING,i=mi,o=mi,l=ii,d=ca,c=gi,f=Pr,h=Bn.DEFAULT_ANISOTROPY,p=si){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:WS++}),this.uuid=mo(),this.name="",this.source=new Vv(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=o,this.magFilter=l,this.minFilter=d,this.anisotropy=h,this.format=c,this.internalFormat=null,this.type=f,this.offset=new Be(0,0),this.repeat=new Be(1,1),this.center=new Be(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Mt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof p=="string"?this.colorSpace=p:(ra("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=p===ss?dn:si),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Rv)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ic:e.x=e.x-Math.floor(e.x);break;case mi:e.x=e.x<0?0:1;break;case tf:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ic:e.y=e.y-Math.floor(e.y);break;case mi:e.y=e.y<0?0:1;break;case tf:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return ra("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===dn?ss:Fv}set encoding(e){ra("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===ss?dn:si}}Bn.DEFAULT_IMAGE=null;Bn.DEFAULT_MAPPING=Rv;Bn.DEFAULT_ANISOTROPY=1;class Bt{constructor(e=0,t=0,i=0,o=1){Bt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=o}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,o){return this.x=e,this.y=t,this.z=i,this.w=o,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,o=this.z,l=this.w,d=e.elements;return this.x=d[0]*t+d[4]*i+d[8]*o+d[12]*l,this.y=d[1]*t+d[5]*i+d[9]*o+d[13]*l,this.z=d[2]*t+d[6]*i+d[10]*o+d[14]*l,this.w=d[3]*t+d[7]*i+d[11]*o+d[15]*l,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,o,l;const f=e.elements,h=f[0],p=f[4],g=f[8],y=f[1],S=f[5],E=f[9],M=f[2],x=f[6],v=f[10];if(Math.abs(p-y)<.01&&Math.abs(g-M)<.01&&Math.abs(E-x)<.01){if(Math.abs(p+y)<.1&&Math.abs(g+M)<.1&&Math.abs(E+x)<.1&&Math.abs(h+S+v-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const A=(h+1)/2,P=(S+1)/2,z=(v+1)/2,D=(p+y)/4,I=(g+M)/4,ne=(E+x)/4;return A>P&&A>z?A<.01?(i=0,o=.707106781,l=.707106781):(i=Math.sqrt(A),o=D/i,l=I/i):P>z?P<.01?(i=.707106781,o=0,l=.707106781):(o=Math.sqrt(P),i=D/o,l=ne/o):z<.01?(i=.707106781,o=.707106781,l=0):(l=Math.sqrt(z),i=I/l,o=ne/l),this.set(i,o,l,t),this}let b=Math.sqrt((x-E)*(x-E)+(g-M)*(g-M)+(y-p)*(y-p));return Math.abs(b)<.001&&(b=1),this.x=(x-E)/b,this.y=(g-M)/b,this.z=(y-p)/b,this.w=Math.acos((h+S+v-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class jS extends cs{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Bt(0,0,e,t),this.scissorTest=!1,this.viewport=new Bt(0,0,e,t);const o={width:e,height:t,depth:1};i.encoding!==void 0&&(ra("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===ss?dn:si),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ii,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new Bn(o,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(e,t,i=1){(this.width!==e||this.height!==t||this.depth!==i)&&(this.width=e,this.height=t,this.depth=i,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Vv(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class as extends jS{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Gv extends Bn{constructor(e=null,t=1,i=1,o=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:o},this.magFilter=Cn,this.minFilter=Cn,this.wrapR=mi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class XS extends Bn{constructor(e=null,t=1,i=1,o=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:o},this.magFilter=Cn,this.minFilter=Cn,this.wrapR=mi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class $i{constructor(e=0,t=0,i=0,o=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=o}static slerpFlat(e,t,i,o,l,d,c){let f=i[o+0],h=i[o+1],p=i[o+2],g=i[o+3];const y=l[d+0],S=l[d+1],E=l[d+2],M=l[d+3];if(c===0){e[t+0]=f,e[t+1]=h,e[t+2]=p,e[t+3]=g;return}if(c===1){e[t+0]=y,e[t+1]=S,e[t+2]=E,e[t+3]=M;return}if(g!==M||f!==y||h!==S||p!==E){let x=1-c;const v=f*y+h*S+p*E+g*M,b=v>=0?1:-1,A=1-v*v;if(A>Number.EPSILON){const z=Math.sqrt(A),D=Math.atan2(z,v*b);x=Math.sin(x*D)/z,c=Math.sin(c*D)/z}const P=c*b;if(f=f*x+y*P,h=h*x+S*P,p=p*x+E*P,g=g*x+M*P,x===1-c){const z=1/Math.sqrt(f*f+h*h+p*p+g*g);f*=z,h*=z,p*=z,g*=z}}e[t]=f,e[t+1]=h,e[t+2]=p,e[t+3]=g}static multiplyQuaternionsFlat(e,t,i,o,l,d){const c=i[o],f=i[o+1],h=i[o+2],p=i[o+3],g=l[d],y=l[d+1],S=l[d+2],E=l[d+3];return e[t]=c*E+p*g+f*S-h*y,e[t+1]=f*E+p*y+h*g-c*S,e[t+2]=h*E+p*S+c*y-f*g,e[t+3]=p*E-c*g-f*y-h*S,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,o){return this._x=e,this._y=t,this._z=i,this._w=o,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,o=e._y,l=e._z,d=e._order,c=Math.cos,f=Math.sin,h=c(i/2),p=c(o/2),g=c(l/2),y=f(i/2),S=f(o/2),E=f(l/2);switch(d){case"XYZ":this._x=y*p*g+h*S*E,this._y=h*S*g-y*p*E,this._z=h*p*E+y*S*g,this._w=h*p*g-y*S*E;break;case"YXZ":this._x=y*p*g+h*S*E,this._y=h*S*g-y*p*E,this._z=h*p*E-y*S*g,this._w=h*p*g+y*S*E;break;case"ZXY":this._x=y*p*g-h*S*E,this._y=h*S*g+y*p*E,this._z=h*p*E+y*S*g,this._w=h*p*g-y*S*E;break;case"ZYX":this._x=y*p*g-h*S*E,this._y=h*S*g+y*p*E,this._z=h*p*E-y*S*g,this._w=h*p*g+y*S*E;break;case"YZX":this._x=y*p*g+h*S*E,this._y=h*S*g+y*p*E,this._z=h*p*E-y*S*g,this._w=h*p*g-y*S*E;break;case"XZY":this._x=y*p*g-h*S*E,this._y=h*S*g-y*p*E,this._z=h*p*E+y*S*g,this._w=h*p*g+y*S*E;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+d)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,o=Math.sin(i);return this._x=e.x*o,this._y=e.y*o,this._z=e.z*o,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],o=t[4],l=t[8],d=t[1],c=t[5],f=t[9],h=t[2],p=t[6],g=t[10],y=i+c+g;if(y>0){const S=.5/Math.sqrt(y+1);this._w=.25/S,this._x=(p-f)*S,this._y=(l-h)*S,this._z=(d-o)*S}else if(i>c&&i>g){const S=2*Math.sqrt(1+i-c-g);this._w=(p-f)/S,this._x=.25*S,this._y=(o+d)/S,this._z=(l+h)/S}else if(c>g){const S=2*Math.sqrt(1+c-i-g);this._w=(l-h)/S,this._x=(o+d)/S,this._y=.25*S,this._z=(f+p)/S}else{const S=2*Math.sqrt(1+g-i-c);this._w=(d-o)/S,this._x=(l+h)/S,this._y=(f+p)/S,this._z=.25*S}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(nn(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const o=Math.min(1,t/i);return this.slerp(e,o),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,o=e._y,l=e._z,d=e._w,c=t._x,f=t._y,h=t._z,p=t._w;return this._x=i*p+d*c+o*h-l*f,this._y=o*p+d*f+l*c-i*h,this._z=l*p+d*h+i*f-o*c,this._w=d*p-i*c-o*f-l*h,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,o=this._y,l=this._z,d=this._w;let c=d*e._w+i*e._x+o*e._y+l*e._z;if(c<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,c=-c):this.copy(e),c>=1)return this._w=d,this._x=i,this._y=o,this._z=l,this;const f=1-c*c;if(f<=Number.EPSILON){const S=1-t;return this._w=S*d+t*this._w,this._x=S*i+t*this._x,this._y=S*o+t*this._y,this._z=S*l+t*this._z,this.normalize(),this}const h=Math.sqrt(f),p=Math.atan2(h,c),g=Math.sin((1-t)*p)/h,y=Math.sin(t*p)/h;return this._w=d*g+this._w*y,this._x=i*g+this._x*y,this._y=o*g+this._y*y,this._z=l*g+this._z*y,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=Math.random(),t=Math.sqrt(1-e),i=Math.sqrt(e),o=2*Math.PI*Math.random(),l=2*Math.PI*Math.random();return this.set(t*Math.cos(o),i*Math.sin(l),i*Math.cos(l),t*Math.sin(o))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class B{constructor(e=0,t=0,i=0){B.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ig.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ig.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,o=this.z,l=e.elements;return this.x=l[0]*t+l[3]*i+l[6]*o,this.y=l[1]*t+l[4]*i+l[7]*o,this.z=l[2]*t+l[5]*i+l[8]*o,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,o=this.z,l=e.elements,d=1/(l[3]*t+l[7]*i+l[11]*o+l[15]);return this.x=(l[0]*t+l[4]*i+l[8]*o+l[12])*d,this.y=(l[1]*t+l[5]*i+l[9]*o+l[13])*d,this.z=(l[2]*t+l[6]*i+l[10]*o+l[14])*d,this}applyQuaternion(e){const t=this.x,i=this.y,o=this.z,l=e.x,d=e.y,c=e.z,f=e.w,h=2*(d*o-c*i),p=2*(c*t-l*o),g=2*(l*i-d*t);return this.x=t+f*h+d*g-c*p,this.y=i+f*p+c*h-l*g,this.z=o+f*g+l*p-d*h,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,o=this.z,l=e.elements;return this.x=l[0]*t+l[4]*i+l[8]*o,this.y=l[1]*t+l[5]*i+l[9]*o,this.z=l[2]*t+l[6]*i+l[10]*o,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,o=e.y,l=e.z,d=t.x,c=t.y,f=t.z;return this.x=o*f-l*c,this.y=l*d-i*f,this.z=i*c-o*d,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return xd.copy(this).projectOnVector(e),this.sub(xd)}reflect(e){return this.sub(xd.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(nn(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,o=this.z-e.z;return t*t+i*i+o*o}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const o=Math.sin(t)*e;return this.x=o*Math.sin(i),this.y=Math.cos(t)*e,this.z=o*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),o=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=o,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(t),this.y=i*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const xd=new B,ig=new $i;class pa{constructor(e=new B(1/0,1/0,1/0),t=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(fi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(fi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=fi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const l=i.getAttribute("position");if(t===!0&&l!==void 0&&e.isInstancedMesh!==!0)for(let d=0,c=l.count;d<c;d++)e.isMesh===!0?e.getVertexPosition(d,fi):fi.fromBufferAttribute(l,d),fi.applyMatrix4(e.matrixWorld),this.expandByPoint(fi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),wl.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),wl.copy(i.boundingBox)),wl.applyMatrix4(e.matrixWorld),this.union(wl)}const o=e.children;for(let l=0,d=o.length;l<d;l++)this.expandByObject(o[l],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,fi),fi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Zo),Tl.subVectors(this.max,Zo),Fs.subVectors(e.a,Zo),ks.subVectors(e.b,Zo),zs.subVectors(e.c,Zo),gr.subVectors(ks,Fs),vr.subVectors(zs,ks),qr.subVectors(Fs,zs);let t=[0,-gr.z,gr.y,0,-vr.z,vr.y,0,-qr.z,qr.y,gr.z,0,-gr.x,vr.z,0,-vr.x,qr.z,0,-qr.x,-gr.y,gr.x,0,-vr.y,vr.x,0,-qr.y,qr.x,0];return!_d(t,Fs,ks,zs,Tl)||(t=[1,0,0,0,1,0,0,0,1],!_d(t,Fs,ks,zs,Tl))?!1:(bl.crossVectors(gr,vr),t=[bl.x,bl.y,bl.z],_d(t,Fs,ks,zs,Tl))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,fi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(fi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(zi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),zi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),zi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),zi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),zi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),zi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),zi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),zi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(zi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const zi=[new B,new B,new B,new B,new B,new B,new B,new B],fi=new B,wl=new pa,Fs=new B,ks=new B,zs=new B,gr=new B,vr=new B,qr=new B,Zo=new B,Tl=new B,bl=new B,Kr=new B;function _d(s,e,t,i,o){for(let l=0,d=s.length-3;l<=d;l+=3){Kr.fromArray(s,l);const c=o.x*Math.abs(Kr.x)+o.y*Math.abs(Kr.y)+o.z*Math.abs(Kr.z),f=e.dot(Kr),h=t.dot(Kr),p=i.dot(Kr);if(Math.max(-Math.max(f,h,p),Math.min(f,h,p))>c)return!1}return!0}const $S=new pa,Qo=new B,yd=new B;class Sc{constructor(e=new B,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):$S.setFromPoints(e).getCenter(i);let o=0;for(let l=0,d=e.length;l<d;l++)o=Math.max(o,i.distanceToSquared(e[l]));return this.radius=Math.sqrt(o),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Qo.subVectors(e,this.center);const t=Qo.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),o=(i-this.radius)*.5;this.center.addScaledVector(Qo,o/i),this.radius+=o}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(yd.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Qo.copy(e.center).add(yd)),this.expandByPoint(Qo.copy(e.center).sub(yd))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Bi=new B,Sd=new B,Al=new B,xr=new B,Md=new B,Cl=new B,Ed=new B;class _f{constructor(e=new B,t=new B(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Bi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Bi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Bi.copy(this.origin).addScaledVector(this.direction,t),Bi.distanceToSquared(e))}distanceSqToSegment(e,t,i,o){Sd.copy(e).add(t).multiplyScalar(.5),Al.copy(t).sub(e).normalize(),xr.copy(this.origin).sub(Sd);const l=e.distanceTo(t)*.5,d=-this.direction.dot(Al),c=xr.dot(this.direction),f=-xr.dot(Al),h=xr.lengthSq(),p=Math.abs(1-d*d);let g,y,S,E;if(p>0)if(g=d*f-c,y=d*c-f,E=l*p,g>=0)if(y>=-E)if(y<=E){const M=1/p;g*=M,y*=M,S=g*(g+d*y+2*c)+y*(d*g+y+2*f)+h}else y=l,g=Math.max(0,-(d*y+c)),S=-g*g+y*(y+2*f)+h;else y=-l,g=Math.max(0,-(d*y+c)),S=-g*g+y*(y+2*f)+h;else y<=-E?(g=Math.max(0,-(-d*l+c)),y=g>0?-l:Math.min(Math.max(-l,-f),l),S=-g*g+y*(y+2*f)+h):y<=E?(g=0,y=Math.min(Math.max(-l,-f),l),S=y*(y+2*f)+h):(g=Math.max(0,-(d*l+c)),y=g>0?l:Math.min(Math.max(-l,-f),l),S=-g*g+y*(y+2*f)+h);else y=d>0?-l:l,g=Math.max(0,-(d*y+c)),S=-g*g+y*(y+2*f)+h;return i&&i.copy(this.origin).addScaledVector(this.direction,g),o&&o.copy(Sd).addScaledVector(Al,y),S}intersectSphere(e,t){Bi.subVectors(e.center,this.origin);const i=Bi.dot(this.direction),o=Bi.dot(Bi)-i*i,l=e.radius*e.radius;if(o>l)return null;const d=Math.sqrt(l-o),c=i-d,f=i+d;return f<0?null:c<0?this.at(f,t):this.at(c,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,o,l,d,c,f;const h=1/this.direction.x,p=1/this.direction.y,g=1/this.direction.z,y=this.origin;return h>=0?(i=(e.min.x-y.x)*h,o=(e.max.x-y.x)*h):(i=(e.max.x-y.x)*h,o=(e.min.x-y.x)*h),p>=0?(l=(e.min.y-y.y)*p,d=(e.max.y-y.y)*p):(l=(e.max.y-y.y)*p,d=(e.min.y-y.y)*p),i>d||l>o||((l>i||isNaN(i))&&(i=l),(d<o||isNaN(o))&&(o=d),g>=0?(c=(e.min.z-y.z)*g,f=(e.max.z-y.z)*g):(c=(e.max.z-y.z)*g,f=(e.min.z-y.z)*g),i>f||c>o)||((c>i||i!==i)&&(i=c),(f<o||o!==o)&&(o=f),o<0)?null:this.at(i>=0?i:o,t)}intersectsBox(e){return this.intersectBox(e,Bi)!==null}intersectTriangle(e,t,i,o,l){Md.subVectors(t,e),Cl.subVectors(i,e),Ed.crossVectors(Md,Cl);let d=this.direction.dot(Ed),c;if(d>0){if(o)return null;c=1}else if(d<0)c=-1,d=-d;else return null;xr.subVectors(this.origin,e);const f=c*this.direction.dot(Cl.crossVectors(xr,Cl));if(f<0)return null;const h=c*this.direction.dot(Md.cross(xr));if(h<0||f+h>d)return null;const p=-c*xr.dot(Ed);return p<0?null:this.at(p/d,l)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ht{constructor(e,t,i,o,l,d,c,f,h,p,g,y,S,E,M,x){Ht.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,o,l,d,c,f,h,p,g,y,S,E,M,x)}set(e,t,i,o,l,d,c,f,h,p,g,y,S,E,M,x){const v=this.elements;return v[0]=e,v[4]=t,v[8]=i,v[12]=o,v[1]=l,v[5]=d,v[9]=c,v[13]=f,v[2]=h,v[6]=p,v[10]=g,v[14]=y,v[3]=S,v[7]=E,v[11]=M,v[15]=x,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ht().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,o=1/Bs.setFromMatrixColumn(e,0).length(),l=1/Bs.setFromMatrixColumn(e,1).length(),d=1/Bs.setFromMatrixColumn(e,2).length();return t[0]=i[0]*o,t[1]=i[1]*o,t[2]=i[2]*o,t[3]=0,t[4]=i[4]*l,t[5]=i[5]*l,t[6]=i[6]*l,t[7]=0,t[8]=i[8]*d,t[9]=i[9]*d,t[10]=i[10]*d,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,o=e.y,l=e.z,d=Math.cos(i),c=Math.sin(i),f=Math.cos(o),h=Math.sin(o),p=Math.cos(l),g=Math.sin(l);if(e.order==="XYZ"){const y=d*p,S=d*g,E=c*p,M=c*g;t[0]=f*p,t[4]=-f*g,t[8]=h,t[1]=S+E*h,t[5]=y-M*h,t[9]=-c*f,t[2]=M-y*h,t[6]=E+S*h,t[10]=d*f}else if(e.order==="YXZ"){const y=f*p,S=f*g,E=h*p,M=h*g;t[0]=y+M*c,t[4]=E*c-S,t[8]=d*h,t[1]=d*g,t[5]=d*p,t[9]=-c,t[2]=S*c-E,t[6]=M+y*c,t[10]=d*f}else if(e.order==="ZXY"){const y=f*p,S=f*g,E=h*p,M=h*g;t[0]=y-M*c,t[4]=-d*g,t[8]=E+S*c,t[1]=S+E*c,t[5]=d*p,t[9]=M-y*c,t[2]=-d*h,t[6]=c,t[10]=d*f}else if(e.order==="ZYX"){const y=d*p,S=d*g,E=c*p,M=c*g;t[0]=f*p,t[4]=E*h-S,t[8]=y*h+M,t[1]=f*g,t[5]=M*h+y,t[9]=S*h-E,t[2]=-h,t[6]=c*f,t[10]=d*f}else if(e.order==="YZX"){const y=d*f,S=d*h,E=c*f,M=c*h;t[0]=f*p,t[4]=M-y*g,t[8]=E*g+S,t[1]=g,t[5]=d*p,t[9]=-c*p,t[2]=-h*p,t[6]=S*g+E,t[10]=y-M*g}else if(e.order==="XZY"){const y=d*f,S=d*h,E=c*f,M=c*h;t[0]=f*p,t[4]=-g,t[8]=h*p,t[1]=y*g+M,t[5]=d*p,t[9]=S*g-E,t[2]=E*g-S,t[6]=c*p,t[10]=M*g+y}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(YS,e,qS)}lookAt(e,t,i){const o=this.elements;return jn.subVectors(e,t),jn.lengthSq()===0&&(jn.z=1),jn.normalize(),_r.crossVectors(i,jn),_r.lengthSq()===0&&(Math.abs(i.z)===1?jn.x+=1e-4:jn.z+=1e-4,jn.normalize(),_r.crossVectors(i,jn)),_r.normalize(),Rl.crossVectors(jn,_r),o[0]=_r.x,o[4]=Rl.x,o[8]=jn.x,o[1]=_r.y,o[5]=Rl.y,o[9]=jn.y,o[2]=_r.z,o[6]=Rl.z,o[10]=jn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,o=t.elements,l=this.elements,d=i[0],c=i[4],f=i[8],h=i[12],p=i[1],g=i[5],y=i[9],S=i[13],E=i[2],M=i[6],x=i[10],v=i[14],b=i[3],A=i[7],P=i[11],z=i[15],D=o[0],I=o[4],ne=o[8],R=o[12],U=o[1],se=o[5],le=o[9],ge=o[13],V=o[2],J=o[6],te=o[10],q=o[14],X=o[3],K=o[7],Y=o[11],O=o[15];return l[0]=d*D+c*U+f*V+h*X,l[4]=d*I+c*se+f*J+h*K,l[8]=d*ne+c*le+f*te+h*Y,l[12]=d*R+c*ge+f*q+h*O,l[1]=p*D+g*U+y*V+S*X,l[5]=p*I+g*se+y*J+S*K,l[9]=p*ne+g*le+y*te+S*Y,l[13]=p*R+g*ge+y*q+S*O,l[2]=E*D+M*U+x*V+v*X,l[6]=E*I+M*se+x*J+v*K,l[10]=E*ne+M*le+x*te+v*Y,l[14]=E*R+M*ge+x*q+v*O,l[3]=b*D+A*U+P*V+z*X,l[7]=b*I+A*se+P*J+z*K,l[11]=b*ne+A*le+P*te+z*Y,l[15]=b*R+A*ge+P*q+z*O,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],o=e[8],l=e[12],d=e[1],c=e[5],f=e[9],h=e[13],p=e[2],g=e[6],y=e[10],S=e[14],E=e[3],M=e[7],x=e[11],v=e[15];return E*(+l*f*g-o*h*g-l*c*y+i*h*y+o*c*S-i*f*S)+M*(+t*f*S-t*h*y+l*d*y-o*d*S+o*h*p-l*f*p)+x*(+t*h*g-t*c*S-l*d*g+i*d*S+l*c*p-i*h*p)+v*(-o*c*p-t*f*g+t*c*y+o*d*g-i*d*y+i*f*p)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const o=this.elements;return e.isVector3?(o[12]=e.x,o[13]=e.y,o[14]=e.z):(o[12]=e,o[13]=t,o[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],o=e[2],l=e[3],d=e[4],c=e[5],f=e[6],h=e[7],p=e[8],g=e[9],y=e[10],S=e[11],E=e[12],M=e[13],x=e[14],v=e[15],b=g*x*h-M*y*h+M*f*S-c*x*S-g*f*v+c*y*v,A=E*y*h-p*x*h-E*f*S+d*x*S+p*f*v-d*y*v,P=p*M*h-E*g*h+E*c*S-d*M*S-p*c*v+d*g*v,z=E*g*f-p*M*f-E*c*y+d*M*y+p*c*x-d*g*x,D=t*b+i*A+o*P+l*z;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const I=1/D;return e[0]=b*I,e[1]=(M*y*l-g*x*l-M*o*S+i*x*S+g*o*v-i*y*v)*I,e[2]=(c*x*l-M*f*l+M*o*h-i*x*h-c*o*v+i*f*v)*I,e[3]=(g*f*l-c*y*l-g*o*h+i*y*h+c*o*S-i*f*S)*I,e[4]=A*I,e[5]=(p*x*l-E*y*l+E*o*S-t*x*S-p*o*v+t*y*v)*I,e[6]=(E*f*l-d*x*l-E*o*h+t*x*h+d*o*v-t*f*v)*I,e[7]=(d*y*l-p*f*l+p*o*h-t*y*h-d*o*S+t*f*S)*I,e[8]=P*I,e[9]=(E*g*l-p*M*l-E*i*S+t*M*S+p*i*v-t*g*v)*I,e[10]=(d*M*l-E*c*l+E*i*h-t*M*h-d*i*v+t*c*v)*I,e[11]=(p*c*l-d*g*l-p*i*h+t*g*h+d*i*S-t*c*S)*I,e[12]=z*I,e[13]=(p*M*o-E*g*o+E*i*y-t*M*y-p*i*x+t*g*x)*I,e[14]=(E*c*o-d*M*o-E*i*f+t*M*f+d*i*x-t*c*x)*I,e[15]=(d*g*o-p*c*o+p*i*f-t*g*f-d*i*y+t*c*y)*I,this}scale(e){const t=this.elements,i=e.x,o=e.y,l=e.z;return t[0]*=i,t[4]*=o,t[8]*=l,t[1]*=i,t[5]*=o,t[9]*=l,t[2]*=i,t[6]*=o,t[10]*=l,t[3]*=i,t[7]*=o,t[11]*=l,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],o=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,o))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),o=Math.sin(t),l=1-i,d=e.x,c=e.y,f=e.z,h=l*d,p=l*c;return this.set(h*d+i,h*c-o*f,h*f+o*c,0,h*c+o*f,p*c+i,p*f-o*d,0,h*f-o*c,p*f+o*d,l*f*f+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,o,l,d){return this.set(1,i,l,0,e,1,d,0,t,o,1,0,0,0,0,1),this}compose(e,t,i){const o=this.elements,l=t._x,d=t._y,c=t._z,f=t._w,h=l+l,p=d+d,g=c+c,y=l*h,S=l*p,E=l*g,M=d*p,x=d*g,v=c*g,b=f*h,A=f*p,P=f*g,z=i.x,D=i.y,I=i.z;return o[0]=(1-(M+v))*z,o[1]=(S+P)*z,o[2]=(E-A)*z,o[3]=0,o[4]=(S-P)*D,o[5]=(1-(y+v))*D,o[6]=(x+b)*D,o[7]=0,o[8]=(E+A)*I,o[9]=(x-b)*I,o[10]=(1-(y+M))*I,o[11]=0,o[12]=e.x,o[13]=e.y,o[14]=e.z,o[15]=1,this}decompose(e,t,i){const o=this.elements;let l=Bs.set(o[0],o[1],o[2]).length();const d=Bs.set(o[4],o[5],o[6]).length(),c=Bs.set(o[8],o[9],o[10]).length();this.determinant()<0&&(l=-l),e.x=o[12],e.y=o[13],e.z=o[14],hi.copy(this);const h=1/l,p=1/d,g=1/c;return hi.elements[0]*=h,hi.elements[1]*=h,hi.elements[2]*=h,hi.elements[4]*=p,hi.elements[5]*=p,hi.elements[6]*=p,hi.elements[8]*=g,hi.elements[9]*=g,hi.elements[10]*=g,t.setFromRotationMatrix(hi),i.x=l,i.y=d,i.z=c,this}makePerspective(e,t,i,o,l,d,c=ji){const f=this.elements,h=2*l/(t-e),p=2*l/(i-o),g=(t+e)/(t-e),y=(i+o)/(i-o);let S,E;if(c===ji)S=-(d+l)/(d-l),E=-2*d*l/(d-l);else if(c===ac)S=-d/(d-l),E=-d*l/(d-l);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+c);return f[0]=h,f[4]=0,f[8]=g,f[12]=0,f[1]=0,f[5]=p,f[9]=y,f[13]=0,f[2]=0,f[6]=0,f[10]=S,f[14]=E,f[3]=0,f[7]=0,f[11]=-1,f[15]=0,this}makeOrthographic(e,t,i,o,l,d,c=ji){const f=this.elements,h=1/(t-e),p=1/(i-o),g=1/(d-l),y=(t+e)*h,S=(i+o)*p;let E,M;if(c===ji)E=(d+l)*g,M=-2*g;else if(c===ac)E=l*g,M=-1*g;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+c);return f[0]=2*h,f[4]=0,f[8]=0,f[12]=-y,f[1]=0,f[5]=2*p,f[9]=0,f[13]=-S,f[2]=0,f[6]=0,f[10]=M,f[14]=-E,f[3]=0,f[7]=0,f[11]=0,f[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let o=0;o<16;o++)if(t[o]!==i[o])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Bs=new B,hi=new Ht,YS=new B(0,0,0),qS=new B(1,1,1),_r=new B,Rl=new B,jn=new B,rg=new Ht,sg=new $i;class Mc{constructor(e=0,t=0,i=0,o=Mc.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=o}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,o=this._order){return this._x=e,this._y=t,this._z=i,this._order=o,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const o=e.elements,l=o[0],d=o[4],c=o[8],f=o[1],h=o[5],p=o[9],g=o[2],y=o[6],S=o[10];switch(t){case"XYZ":this._y=Math.asin(nn(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-p,S),this._z=Math.atan2(-d,l)):(this._x=Math.atan2(y,h),this._z=0);break;case"YXZ":this._x=Math.asin(-nn(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(c,S),this._z=Math.atan2(f,h)):(this._y=Math.atan2(-g,l),this._z=0);break;case"ZXY":this._x=Math.asin(nn(y,-1,1)),Math.abs(y)<.9999999?(this._y=Math.atan2(-g,S),this._z=Math.atan2(-d,h)):(this._y=0,this._z=Math.atan2(f,l));break;case"ZYX":this._y=Math.asin(-nn(g,-1,1)),Math.abs(g)<.9999999?(this._x=Math.atan2(y,S),this._z=Math.atan2(f,l)):(this._x=0,this._z=Math.atan2(-d,h));break;case"YZX":this._z=Math.asin(nn(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(-p,h),this._y=Math.atan2(-g,l)):(this._x=0,this._y=Math.atan2(c,S));break;case"XZY":this._z=Math.asin(-nn(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(y,h),this._y=Math.atan2(c,l)):(this._x=Math.atan2(-p,S),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return rg.makeRotationFromQuaternion(e),this.setFromRotationMatrix(rg,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return sg.setFromEuler(this),this.setFromQuaternion(sg,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Mc.DEFAULT_ORDER="XYZ";class Wv{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let KS=0;const og=new B,Hs=new $i,Hi=new Ht,Pl=new B,ea=new B,JS=new B,ZS=new $i,ag=new B(1,0,0),lg=new B(0,1,0),cg=new B(0,0,1),QS={type:"added"},eM={type:"removed"};class rn extends cs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:KS++}),this.uuid=mo(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=rn.DEFAULT_UP.clone();const e=new B,t=new Mc,i=new $i,o=new B(1,1,1);function l(){i.setFromEuler(t,!1)}function d(){t.setFromQuaternion(i,void 0,!1)}t._onChange(l),i._onChange(d),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:o},modelViewMatrix:{value:new Ht},normalMatrix:{value:new Mt}}),this.matrix=new Ht,this.matrixWorld=new Ht,this.matrixAutoUpdate=rn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=rn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Wv,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Hs.setFromAxisAngle(e,t),this.quaternion.multiply(Hs),this}rotateOnWorldAxis(e,t){return Hs.setFromAxisAngle(e,t),this.quaternion.premultiply(Hs),this}rotateX(e){return this.rotateOnAxis(ag,e)}rotateY(e){return this.rotateOnAxis(lg,e)}rotateZ(e){return this.rotateOnAxis(cg,e)}translateOnAxis(e,t){return og.copy(e).applyQuaternion(this.quaternion),this.position.add(og.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ag,e)}translateY(e){return this.translateOnAxis(lg,e)}translateZ(e){return this.translateOnAxis(cg,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Hi.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Pl.copy(e):Pl.set(e,t,i);const o=this.parent;this.updateWorldMatrix(!0,!1),ea.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Hi.lookAt(ea,Pl,this.up):Hi.lookAt(Pl,ea,this.up),this.quaternion.setFromRotationMatrix(Hi),o&&(Hi.extractRotation(o.matrixWorld),Hs.setFromRotationMatrix(Hi),this.quaternion.premultiply(Hs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(QS)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(eM)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Hi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Hi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Hi),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,o=this.children.length;i<o;i++){const d=this.children[i].getObjectByProperty(e,t);if(d!==void 0)return d}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const o=this.children;for(let l=0,d=o.length;l<d;l++)o[l].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ea,e,JS),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ea,ZS,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,o=t.length;i<o;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,o=t.length;i<o;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,o=t.length;i<o;i++){const l=t[i];(l.matrixWorldAutoUpdate===!0||e===!0)&&l.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const o=this.children;for(let l=0,d=o.length;l<d;l++){const c=o[l];c.matrixWorldAutoUpdate===!0&&c.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const o={};o.uuid=this.uuid,o.type=this.type,this.name!==""&&(o.name=this.name),this.castShadow===!0&&(o.castShadow=!0),this.receiveShadow===!0&&(o.receiveShadow=!0),this.visible===!1&&(o.visible=!1),this.frustumCulled===!1&&(o.frustumCulled=!1),this.renderOrder!==0&&(o.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(o.userData=this.userData),o.layers=this.layers.mask,o.matrix=this.matrix.toArray(),o.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(o.matrixAutoUpdate=!1),this.isInstancedMesh&&(o.type="InstancedMesh",o.count=this.count,o.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(o.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(o.type="BatchedMesh",o.perObjectFrustumCulled=this.perObjectFrustumCulled,o.sortObjects=this.sortObjects,o.drawRanges=this._drawRanges,o.reservedRanges=this._reservedRanges,o.visibility=this._visibility,o.active=this._active,o.bounds=this._bounds.map(c=>({boxInitialized:c.boxInitialized,boxMin:c.box.min.toArray(),boxMax:c.box.max.toArray(),sphereInitialized:c.sphereInitialized,sphereRadius:c.sphere.radius,sphereCenter:c.sphere.center.toArray()})),o.maxGeometryCount=this._maxGeometryCount,o.maxVertexCount=this._maxVertexCount,o.maxIndexCount=this._maxIndexCount,o.geometryInitialized=this._geometryInitialized,o.geometryCount=this._geometryCount,o.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(o.boundingSphere={center:o.boundingSphere.center.toArray(),radius:o.boundingSphere.radius}),this.boundingBox!==null&&(o.boundingBox={min:o.boundingBox.min.toArray(),max:o.boundingBox.max.toArray()}));function l(c,f){return c[f.uuid]===void 0&&(c[f.uuid]=f.toJSON(e)),f.uuid}if(this.isScene)this.background&&(this.background.isColor?o.background=this.background.toJSON():this.background.isTexture&&(o.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(o.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){o.geometry=l(e.geometries,this.geometry);const c=this.geometry.parameters;if(c!==void 0&&c.shapes!==void 0){const f=c.shapes;if(Array.isArray(f))for(let h=0,p=f.length;h<p;h++){const g=f[h];l(e.shapes,g)}else l(e.shapes,f)}}if(this.isSkinnedMesh&&(o.bindMode=this.bindMode,o.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(l(e.skeletons,this.skeleton),o.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const c=[];for(let f=0,h=this.material.length;f<h;f++)c.push(l(e.materials,this.material[f]));o.material=c}else o.material=l(e.materials,this.material);if(this.children.length>0){o.children=[];for(let c=0;c<this.children.length;c++)o.children.push(this.children[c].toJSON(e).object)}if(this.animations.length>0){o.animations=[];for(let c=0;c<this.animations.length;c++){const f=this.animations[c];o.animations.push(l(e.animations,f))}}if(t){const c=d(e.geometries),f=d(e.materials),h=d(e.textures),p=d(e.images),g=d(e.shapes),y=d(e.skeletons),S=d(e.animations),E=d(e.nodes);c.length>0&&(i.geometries=c),f.length>0&&(i.materials=f),h.length>0&&(i.textures=h),p.length>0&&(i.images=p),g.length>0&&(i.shapes=g),y.length>0&&(i.skeletons=y),S.length>0&&(i.animations=S),E.length>0&&(i.nodes=E)}return i.object=o,i;function d(c){const f=[];for(const h in c){const p=c[h];delete p.metadata,f.push(p)}return f}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const o=e.children[i];this.add(o.clone())}return this}}rn.DEFAULT_UP=new B(0,1,0);rn.DEFAULT_MATRIX_AUTO_UPDATE=!0;rn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const pi=new B,Vi=new B,wd=new B,Gi=new B,Vs=new B,Gs=new B,ug=new B,Td=new B,bd=new B,Ad=new B;let Ll=!1;class ri{constructor(e=new B,t=new B,i=new B){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,o){o.subVectors(i,t),pi.subVectors(e,t),o.cross(pi);const l=o.lengthSq();return l>0?o.multiplyScalar(1/Math.sqrt(l)):o.set(0,0,0)}static getBarycoord(e,t,i,o,l){pi.subVectors(o,t),Vi.subVectors(i,t),wd.subVectors(e,t);const d=pi.dot(pi),c=pi.dot(Vi),f=pi.dot(wd),h=Vi.dot(Vi),p=Vi.dot(wd),g=d*h-c*c;if(g===0)return l.set(0,0,0),null;const y=1/g,S=(h*f-c*p)*y,E=(d*p-c*f)*y;return l.set(1-S-E,E,S)}static containsPoint(e,t,i,o){return this.getBarycoord(e,t,i,o,Gi)===null?!1:Gi.x>=0&&Gi.y>=0&&Gi.x+Gi.y<=1}static getUV(e,t,i,o,l,d,c,f){return Ll===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Ll=!0),this.getInterpolation(e,t,i,o,l,d,c,f)}static getInterpolation(e,t,i,o,l,d,c,f){return this.getBarycoord(e,t,i,o,Gi)===null?(f.x=0,f.y=0,"z"in f&&(f.z=0),"w"in f&&(f.w=0),null):(f.setScalar(0),f.addScaledVector(l,Gi.x),f.addScaledVector(d,Gi.y),f.addScaledVector(c,Gi.z),f)}static isFrontFacing(e,t,i,o){return pi.subVectors(i,t),Vi.subVectors(e,t),pi.cross(Vi).dot(o)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,o){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[o]),this}setFromAttributeAndIndices(e,t,i,o){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,o),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return pi.subVectors(this.c,this.b),Vi.subVectors(this.a,this.b),pi.cross(Vi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return ri.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return ri.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,i,o,l){return Ll===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Ll=!0),ri.getInterpolation(e,this.a,this.b,this.c,t,i,o,l)}getInterpolation(e,t,i,o,l){return ri.getInterpolation(e,this.a,this.b,this.c,t,i,o,l)}containsPoint(e){return ri.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return ri.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,o=this.b,l=this.c;let d,c;Vs.subVectors(o,i),Gs.subVectors(l,i),Td.subVectors(e,i);const f=Vs.dot(Td),h=Gs.dot(Td);if(f<=0&&h<=0)return t.copy(i);bd.subVectors(e,o);const p=Vs.dot(bd),g=Gs.dot(bd);if(p>=0&&g<=p)return t.copy(o);const y=f*g-p*h;if(y<=0&&f>=0&&p<=0)return d=f/(f-p),t.copy(i).addScaledVector(Vs,d);Ad.subVectors(e,l);const S=Vs.dot(Ad),E=Gs.dot(Ad);if(E>=0&&S<=E)return t.copy(l);const M=S*h-f*E;if(M<=0&&h>=0&&E<=0)return c=h/(h-E),t.copy(i).addScaledVector(Gs,c);const x=p*E-S*g;if(x<=0&&g-p>=0&&S-E>=0)return ug.subVectors(l,o),c=(g-p)/(g-p+(S-E)),t.copy(o).addScaledVector(ug,c);const v=1/(x+M+y);return d=M*v,c=y*v,t.copy(i).addScaledVector(Vs,d).addScaledVector(Gs,c)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const jv={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},yr={h:0,s:0,l:0},Nl={h:0,s:0,l:0};function Cd(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class Et{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const o=e;o&&o.isColor?this.copy(o):typeof o=="number"?this.setHex(o):typeof o=="string"&&this.setStyle(o)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=dn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Lt.toWorkingColorSpace(this,t),this}setRGB(e,t,i,o=Lt.workingColorSpace){return this.r=e,this.g=t,this.b=i,Lt.toWorkingColorSpace(this,o),this}setHSL(e,t,i,o=Lt.workingColorSpace){if(e=xf(e,1),t=nn(t,0,1),i=nn(i,0,1),t===0)this.r=this.g=this.b=i;else{const l=i<=.5?i*(1+t):i+t-i*t,d=2*i-l;this.r=Cd(d,l,e+1/3),this.g=Cd(d,l,e),this.b=Cd(d,l,e-1/3)}return Lt.toWorkingColorSpace(this,o),this}setStyle(e,t=dn){function i(l){l!==void 0&&parseFloat(l)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let o;if(o=/^(\w+)\(([^\)]*)\)/.exec(e)){let l;const d=o[1],c=o[2];switch(d){case"rgb":case"rgba":if(l=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return i(l[4]),this.setRGB(Math.min(255,parseInt(l[1],10))/255,Math.min(255,parseInt(l[2],10))/255,Math.min(255,parseInt(l[3],10))/255,t);if(l=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return i(l[4]),this.setRGB(Math.min(100,parseInt(l[1],10))/100,Math.min(100,parseInt(l[2],10))/100,Math.min(100,parseInt(l[3],10))/100,t);break;case"hsl":case"hsla":if(l=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return i(l[4]),this.setHSL(parseFloat(l[1])/360,parseFloat(l[2])/100,parseFloat(l[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(o=/^\#([A-Fa-f\d]+)$/.exec(e)){const l=o[1],d=l.length;if(d===3)return this.setRGB(parseInt(l.charAt(0),16)/15,parseInt(l.charAt(1),16)/15,parseInt(l.charAt(2),16)/15,t);if(d===6)return this.setHex(parseInt(l,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=dn){const i=jv[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ro(e.r),this.g=ro(e.g),this.b=ro(e.b),this}copyLinearToSRGB(e){return this.r=gd(e.r),this.g=gd(e.g),this.b=gd(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=dn){return Lt.fromWorkingColorSpace(yn.copy(this),e),Math.round(nn(yn.r*255,0,255))*65536+Math.round(nn(yn.g*255,0,255))*256+Math.round(nn(yn.b*255,0,255))}getHexString(e=dn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Lt.workingColorSpace){Lt.fromWorkingColorSpace(yn.copy(this),t);const i=yn.r,o=yn.g,l=yn.b,d=Math.max(i,o,l),c=Math.min(i,o,l);let f,h;const p=(c+d)/2;if(c===d)f=0,h=0;else{const g=d-c;switch(h=p<=.5?g/(d+c):g/(2-d-c),d){case i:f=(o-l)/g+(o<l?6:0);break;case o:f=(l-i)/g+2;break;case l:f=(i-o)/g+4;break}f/=6}return e.h=f,e.s=h,e.l=p,e}getRGB(e,t=Lt.workingColorSpace){return Lt.fromWorkingColorSpace(yn.copy(this),t),e.r=yn.r,e.g=yn.g,e.b=yn.b,e}getStyle(e=dn){Lt.fromWorkingColorSpace(yn.copy(this),e);const t=yn.r,i=yn.g,o=yn.b;return e!==dn?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${o.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(o*255)})`}offsetHSL(e,t,i){return this.getHSL(yr),this.setHSL(yr.h+e,yr.s+t,yr.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(yr),e.getHSL(Nl);const i=ia(yr.h,Nl.h,t),o=ia(yr.s,Nl.s,t),l=ia(yr.l,Nl.l,t);return this.setHSL(i,o,l),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,o=this.b,l=e.elements;return this.r=l[0]*t+l[3]*i+l[6]*o,this.g=l[1]*t+l[4]*i+l[7]*o,this.b=l[2]*t+l[5]*i+l[8]*o,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const yn=new Et;Et.NAMES=jv;let tM=0;class go extends cs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:tM++}),this.uuid=mo(),this.name="",this.type="Material",this.blending=no,this.side=Dr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Jd,this.blendDst=Zd,this.blendEquation=es,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Et(0,0,0),this.blendAlpha=0,this.depthFunc=nc,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Km,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Is,this.stencilZFail=Is,this.stencilZPass=Is,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const o=this[t];if(o===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}o&&o.isColor?o.set(i):o&&o.isVector3&&i&&i.isVector3?o.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==no&&(i.blending=this.blending),this.side!==Dr&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Jd&&(i.blendSrc=this.blendSrc),this.blendDst!==Zd&&(i.blendDst=this.blendDst),this.blendEquation!==es&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==nc&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Km&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Is&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Is&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Is&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function o(l){const d=[];for(const c in l){const f=l[c];delete f.metadata,d.push(f)}return d}if(t){const l=o(e.textures),d=o(e.images);l.length>0&&(i.textures=l),d.length>0&&(i.images=d)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const o=t.length;i=new Array(o);for(let l=0;l!==o;++l)i[l]=t[l].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class so extends go{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Et(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Av,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Jt=new B,Dl=new Be;class Yn{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Jm,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Tr,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let o=0,l=this.itemSize;o<l;o++)this.array[e+o]=t.array[i+o];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Dl.fromBufferAttribute(this,t),Dl.applyMatrix3(e),this.setXY(t,Dl.x,Dl.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Jt.fromBufferAttribute(this,t),Jt.applyMatrix3(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Jt.fromBufferAttribute(this,t),Jt.applyMatrix4(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Jt.fromBufferAttribute(this,t),Jt.applyNormalMatrix(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Jt.fromBufferAttribute(this,t),Jt.transformDirection(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Qs(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=bn(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Qs(t,this.array)),t}setX(e,t){return this.normalized&&(t=bn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Qs(t,this.array)),t}setY(e,t){return this.normalized&&(t=bn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Qs(t,this.array)),t}setZ(e,t){return this.normalized&&(t=bn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Qs(t,this.array)),t}setW(e,t){return this.normalized&&(t=bn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=bn(t,this.array),i=bn(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,o){return e*=this.itemSize,this.normalized&&(t=bn(t,this.array),i=bn(i,this.array),o=bn(o,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=o,this}setXYZW(e,t,i,o,l){return e*=this.itemSize,this.normalized&&(t=bn(t,this.array),i=bn(i,this.array),o=bn(o,this.array),l=bn(l,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=o,this.array[e+3]=l,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Jm&&(e.usage=this.usage),e}}class Xv extends Yn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class $v extends Yn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Ft extends Yn{constructor(e,t,i){super(new Float32Array(e),t,i)}}let nM=0;const ni=new Ht,Rd=new rn,Ws=new B,Xn=new pa,ta=new pa,un=new B;class Sn extends cs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:nM++}),this.uuid=mo(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Bv(e)?$v:Xv)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const l=new Mt().getNormalMatrix(e);i.applyNormalMatrix(l),i.needsUpdate=!0}const o=this.attributes.tangent;return o!==void 0&&(o.transformDirection(e),o.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return ni.makeRotationFromQuaternion(e),this.applyMatrix4(ni),this}rotateX(e){return ni.makeRotationX(e),this.applyMatrix4(ni),this}rotateY(e){return ni.makeRotationY(e),this.applyMatrix4(ni),this}rotateZ(e){return ni.makeRotationZ(e),this.applyMatrix4(ni),this}translate(e,t,i){return ni.makeTranslation(e,t,i),this.applyMatrix4(ni),this}scale(e,t,i){return ni.makeScale(e,t,i),this.applyMatrix4(ni),this}lookAt(e){return Rd.lookAt(e),Rd.updateMatrix(),this.applyMatrix4(Rd.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ws).negate(),this.translate(Ws.x,Ws.y,Ws.z),this}setFromPoints(e){const t=[];for(let i=0,o=e.length;i<o;i++){const l=e[i];t.push(l.x,l.y,l.z||0)}return this.setAttribute("position",new Ft(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new pa);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,o=t.length;i<o;i++){const l=t[i];Xn.setFromBufferAttribute(l),this.morphTargetsRelative?(un.addVectors(this.boundingBox.min,Xn.min),this.boundingBox.expandByPoint(un),un.addVectors(this.boundingBox.max,Xn.max),this.boundingBox.expandByPoint(un)):(this.boundingBox.expandByPoint(Xn.min),this.boundingBox.expandByPoint(Xn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Sc);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new B,1/0);return}if(e){const i=this.boundingSphere.center;if(Xn.setFromBufferAttribute(e),t)for(let l=0,d=t.length;l<d;l++){const c=t[l];ta.setFromBufferAttribute(c),this.morphTargetsRelative?(un.addVectors(Xn.min,ta.min),Xn.expandByPoint(un),un.addVectors(Xn.max,ta.max),Xn.expandByPoint(un)):(Xn.expandByPoint(ta.min),Xn.expandByPoint(ta.max))}Xn.getCenter(i);let o=0;for(let l=0,d=e.count;l<d;l++)un.fromBufferAttribute(e,l),o=Math.max(o,i.distanceToSquared(un));if(t)for(let l=0,d=t.length;l<d;l++){const c=t[l],f=this.morphTargetsRelative;for(let h=0,p=c.count;h<p;h++)un.fromBufferAttribute(c,h),f&&(Ws.fromBufferAttribute(e,h),un.add(Ws)),o=Math.max(o,i.distanceToSquared(un))}this.boundingSphere.radius=Math.sqrt(o),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.array,o=t.position.array,l=t.normal.array,d=t.uv.array,c=o.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Yn(new Float32Array(4*c),4));const f=this.getAttribute("tangent").array,h=[],p=[];for(let U=0;U<c;U++)h[U]=new B,p[U]=new B;const g=new B,y=new B,S=new B,E=new Be,M=new Be,x=new Be,v=new B,b=new B;function A(U,se,le){g.fromArray(o,U*3),y.fromArray(o,se*3),S.fromArray(o,le*3),E.fromArray(d,U*2),M.fromArray(d,se*2),x.fromArray(d,le*2),y.sub(g),S.sub(g),M.sub(E),x.sub(E);const ge=1/(M.x*x.y-x.x*M.y);isFinite(ge)&&(v.copy(y).multiplyScalar(x.y).addScaledVector(S,-M.y).multiplyScalar(ge),b.copy(S).multiplyScalar(M.x).addScaledVector(y,-x.x).multiplyScalar(ge),h[U].add(v),h[se].add(v),h[le].add(v),p[U].add(b),p[se].add(b),p[le].add(b))}let P=this.groups;P.length===0&&(P=[{start:0,count:i.length}]);for(let U=0,se=P.length;U<se;++U){const le=P[U],ge=le.start,V=le.count;for(let J=ge,te=ge+V;J<te;J+=3)A(i[J+0],i[J+1],i[J+2])}const z=new B,D=new B,I=new B,ne=new B;function R(U){I.fromArray(l,U*3),ne.copy(I);const se=h[U];z.copy(se),z.sub(I.multiplyScalar(I.dot(se))).normalize(),D.crossVectors(ne,se);const ge=D.dot(p[U])<0?-1:1;f[U*4]=z.x,f[U*4+1]=z.y,f[U*4+2]=z.z,f[U*4+3]=ge}for(let U=0,se=P.length;U<se;++U){const le=P[U],ge=le.start,V=le.count;for(let J=ge,te=ge+V;J<te;J+=3)R(i[J+0]),R(i[J+1]),R(i[J+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Yn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let y=0,S=i.count;y<S;y++)i.setXYZ(y,0,0,0);const o=new B,l=new B,d=new B,c=new B,f=new B,h=new B,p=new B,g=new B;if(e)for(let y=0,S=e.count;y<S;y+=3){const E=e.getX(y+0),M=e.getX(y+1),x=e.getX(y+2);o.fromBufferAttribute(t,E),l.fromBufferAttribute(t,M),d.fromBufferAttribute(t,x),p.subVectors(d,l),g.subVectors(o,l),p.cross(g),c.fromBufferAttribute(i,E),f.fromBufferAttribute(i,M),h.fromBufferAttribute(i,x),c.add(p),f.add(p),h.add(p),i.setXYZ(E,c.x,c.y,c.z),i.setXYZ(M,f.x,f.y,f.z),i.setXYZ(x,h.x,h.y,h.z)}else for(let y=0,S=t.count;y<S;y+=3)o.fromBufferAttribute(t,y+0),l.fromBufferAttribute(t,y+1),d.fromBufferAttribute(t,y+2),p.subVectors(d,l),g.subVectors(o,l),p.cross(g),i.setXYZ(y+0,p.x,p.y,p.z),i.setXYZ(y+1,p.x,p.y,p.z),i.setXYZ(y+2,p.x,p.y,p.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)un.fromBufferAttribute(e,t),un.normalize(),e.setXYZ(t,un.x,un.y,un.z)}toNonIndexed(){function e(c,f){const h=c.array,p=c.itemSize,g=c.normalized,y=new h.constructor(f.length*p);let S=0,E=0;for(let M=0,x=f.length;M<x;M++){c.isInterleavedBufferAttribute?S=f[M]*c.data.stride+c.offset:S=f[M]*p;for(let v=0;v<p;v++)y[E++]=h[S++]}return new Yn(y,p,g)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Sn,i=this.index.array,o=this.attributes;for(const c in o){const f=o[c],h=e(f,i);t.setAttribute(c,h)}const l=this.morphAttributes;for(const c in l){const f=[],h=l[c];for(let p=0,g=h.length;p<g;p++){const y=h[p],S=e(y,i);f.push(S)}t.morphAttributes[c]=f}t.morphTargetsRelative=this.morphTargetsRelative;const d=this.groups;for(let c=0,f=d.length;c<f;c++){const h=d[c];t.addGroup(h.start,h.count,h.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const f=this.parameters;for(const h in f)f[h]!==void 0&&(e[h]=f[h]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const f in i){const h=i[f];e.data.attributes[f]=h.toJSON(e.data)}const o={};let l=!1;for(const f in this.morphAttributes){const h=this.morphAttributes[f],p=[];for(let g=0,y=h.length;g<y;g++){const S=h[g];p.push(S.toJSON(e.data))}p.length>0&&(o[f]=p,l=!0)}l&&(e.data.morphAttributes=o,e.data.morphTargetsRelative=this.morphTargetsRelative);const d=this.groups;d.length>0&&(e.data.groups=JSON.parse(JSON.stringify(d)));const c=this.boundingSphere;return c!==null&&(e.data.boundingSphere={center:c.center.toArray(),radius:c.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const o=e.attributes;for(const h in o){const p=o[h];this.setAttribute(h,p.clone(t))}const l=e.morphAttributes;for(const h in l){const p=[],g=l[h];for(let y=0,S=g.length;y<S;y++)p.push(g[y].clone(t));this.morphAttributes[h]=p}this.morphTargetsRelative=e.morphTargetsRelative;const d=e.groups;for(let h=0,p=d.length;h<p;h++){const g=d[h];this.addGroup(g.start,g.count,g.materialIndex)}const c=e.boundingBox;c!==null&&(this.boundingBox=c.clone());const f=e.boundingSphere;return f!==null&&(this.boundingSphere=f.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const dg=new Ht,Jr=new _f,Ul=new Sc,fg=new B,js=new B,Xs=new B,$s=new B,Pd=new B,Il=new B,Ol=new Be,Fl=new Be,kl=new Be,hg=new B,pg=new B,mg=new B,zl=new B,Bl=new B;class Rt extends rn{constructor(e=new Sn,t=new so){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const o=t[i[0]];if(o!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let l=0,d=o.length;l<d;l++){const c=o[l].name||String(l);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=l}}}}getVertexPosition(e,t){const i=this.geometry,o=i.attributes.position,l=i.morphAttributes.position,d=i.morphTargetsRelative;t.fromBufferAttribute(o,e);const c=this.morphTargetInfluences;if(l&&c){Il.set(0,0,0);for(let f=0,h=l.length;f<h;f++){const p=c[f],g=l[f];p!==0&&(Pd.fromBufferAttribute(g,e),d?Il.addScaledVector(Pd,p):Il.addScaledVector(Pd.sub(t),p))}t.add(Il)}return t}raycast(e,t){const i=this.geometry,o=this.material,l=this.matrixWorld;o!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ul.copy(i.boundingSphere),Ul.applyMatrix4(l),Jr.copy(e.ray).recast(e.near),!(Ul.containsPoint(Jr.origin)===!1&&(Jr.intersectSphere(Ul,fg)===null||Jr.origin.distanceToSquared(fg)>(e.far-e.near)**2))&&(dg.copy(l).invert(),Jr.copy(e.ray).applyMatrix4(dg),!(i.boundingBox!==null&&Jr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Jr)))}_computeIntersections(e,t,i){let o;const l=this.geometry,d=this.material,c=l.index,f=l.attributes.position,h=l.attributes.uv,p=l.attributes.uv1,g=l.attributes.normal,y=l.groups,S=l.drawRange;if(c!==null)if(Array.isArray(d))for(let E=0,M=y.length;E<M;E++){const x=y[E],v=d[x.materialIndex],b=Math.max(x.start,S.start),A=Math.min(c.count,Math.min(x.start+x.count,S.start+S.count));for(let P=b,z=A;P<z;P+=3){const D=c.getX(P),I=c.getX(P+1),ne=c.getX(P+2);o=Hl(this,v,e,i,h,p,g,D,I,ne),o&&(o.faceIndex=Math.floor(P/3),o.face.materialIndex=x.materialIndex,t.push(o))}}else{const E=Math.max(0,S.start),M=Math.min(c.count,S.start+S.count);for(let x=E,v=M;x<v;x+=3){const b=c.getX(x),A=c.getX(x+1),P=c.getX(x+2);o=Hl(this,d,e,i,h,p,g,b,A,P),o&&(o.faceIndex=Math.floor(x/3),t.push(o))}}else if(f!==void 0)if(Array.isArray(d))for(let E=0,M=y.length;E<M;E++){const x=y[E],v=d[x.materialIndex],b=Math.max(x.start,S.start),A=Math.min(f.count,Math.min(x.start+x.count,S.start+S.count));for(let P=b,z=A;P<z;P+=3){const D=P,I=P+1,ne=P+2;o=Hl(this,v,e,i,h,p,g,D,I,ne),o&&(o.faceIndex=Math.floor(P/3),o.face.materialIndex=x.materialIndex,t.push(o))}}else{const E=Math.max(0,S.start),M=Math.min(f.count,S.start+S.count);for(let x=E,v=M;x<v;x+=3){const b=x,A=x+1,P=x+2;o=Hl(this,d,e,i,h,p,g,b,A,P),o&&(o.faceIndex=Math.floor(x/3),t.push(o))}}}}function iM(s,e,t,i,o,l,d,c){let f;if(e.side===Rn?f=i.intersectTriangle(d,l,o,!0,c):f=i.intersectTriangle(o,l,d,e.side===Dr,c),f===null)return null;Bl.copy(c),Bl.applyMatrix4(s.matrixWorld);const h=t.ray.origin.distanceTo(Bl);return h<t.near||h>t.far?null:{distance:h,point:Bl.clone(),object:s}}function Hl(s,e,t,i,o,l,d,c,f,h){s.getVertexPosition(c,js),s.getVertexPosition(f,Xs),s.getVertexPosition(h,$s);const p=iM(s,e,t,i,js,Xs,$s,zl);if(p){o&&(Ol.fromBufferAttribute(o,c),Fl.fromBufferAttribute(o,f),kl.fromBufferAttribute(o,h),p.uv=ri.getInterpolation(zl,js,Xs,$s,Ol,Fl,kl,new Be)),l&&(Ol.fromBufferAttribute(l,c),Fl.fromBufferAttribute(l,f),kl.fromBufferAttribute(l,h),p.uv1=ri.getInterpolation(zl,js,Xs,$s,Ol,Fl,kl,new Be),p.uv2=p.uv1),d&&(hg.fromBufferAttribute(d,c),pg.fromBufferAttribute(d,f),mg.fromBufferAttribute(d,h),p.normal=ri.getInterpolation(zl,js,Xs,$s,hg,pg,mg,new B),p.normal.dot(i.direction)>0&&p.normal.multiplyScalar(-1));const g={a:c,b:f,c:h,normal:new B,materialIndex:0};ri.getNormal(js,Xs,$s,g.normal),p.face=g}return p}class Ti extends Sn{constructor(e=1,t=1,i=1,o=1,l=1,d=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:o,heightSegments:l,depthSegments:d};const c=this;o=Math.floor(o),l=Math.floor(l),d=Math.floor(d);const f=[],h=[],p=[],g=[];let y=0,S=0;E("z","y","x",-1,-1,i,t,e,d,l,0),E("z","y","x",1,-1,i,t,-e,d,l,1),E("x","z","y",1,1,e,i,t,o,d,2),E("x","z","y",1,-1,e,i,-t,o,d,3),E("x","y","z",1,-1,e,t,i,o,l,4),E("x","y","z",-1,-1,e,t,-i,o,l,5),this.setIndex(f),this.setAttribute("position",new Ft(h,3)),this.setAttribute("normal",new Ft(p,3)),this.setAttribute("uv",new Ft(g,2));function E(M,x,v,b,A,P,z,D,I,ne,R){const U=P/I,se=z/ne,le=P/2,ge=z/2,V=D/2,J=I+1,te=ne+1;let q=0,X=0;const K=new B;for(let Y=0;Y<te;Y++){const O=Y*se-ge;for(let F=0;F<J;F++){const j=F*U-le;K[M]=j*b,K[x]=O*A,K[v]=V,h.push(K.x,K.y,K.z),K[M]=0,K[x]=0,K[v]=D>0?1:-1,p.push(K.x,K.y,K.z),g.push(F/I),g.push(1-Y/ne),q+=1}}for(let Y=0;Y<ne;Y++)for(let O=0;O<I;O++){const F=y+O+J*Y,j=y+O+J*(Y+1),ce=y+(O+1)+J*(Y+1),me=y+(O+1)+J*Y;f.push(F,j,me),f.push(j,ce,me),X+=6}c.addGroup(S,X,R),S+=X,y+=q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ti(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function uo(s){const e={};for(const t in s){e[t]={};for(const i in s[t]){const o=s[t][i];o&&(o.isColor||o.isMatrix3||o.isMatrix4||o.isVector2||o.isVector3||o.isVector4||o.isTexture||o.isQuaternion)?o.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=o.clone():Array.isArray(o)?e[t][i]=o.slice():e[t][i]=o}}return e}function An(s){const e={};for(let t=0;t<s.length;t++){const i=uo(s[t]);for(const o in i)e[o]=i[o]}return e}function rM(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function Yv(s){return s.getRenderTarget()===null?s.outputColorSpace:Lt.workingColorSpace}const sM={clone:uo,merge:An};var oM=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,aM=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ls extends go{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=oM,this.fragmentShader=aM,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=uo(e.uniforms),this.uniformsGroups=rM(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const o in this.uniforms){const d=this.uniforms[o].value;d&&d.isTexture?t.uniforms[o]={type:"t",value:d.toJSON(e).uuid}:d&&d.isColor?t.uniforms[o]={type:"c",value:d.getHex()}:d&&d.isVector2?t.uniforms[o]={type:"v2",value:d.toArray()}:d&&d.isVector3?t.uniforms[o]={type:"v3",value:d.toArray()}:d&&d.isVector4?t.uniforms[o]={type:"v4",value:d.toArray()}:d&&d.isMatrix3?t.uniforms[o]={type:"m3",value:d.toArray()}:d&&d.isMatrix4?t.uniforms[o]={type:"m4",value:d.toArray()}:t.uniforms[o]={value:d}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const o in this.extensions)this.extensions[o]===!0&&(i[o]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class qv extends rn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ht,this.projectionMatrix=new Ht,this.projectionMatrixInverse=new Ht,this.coordinateSystem=ji}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class $n extends qv{constructor(e=50,t=1,i=.1,o=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=o,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=da*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(io*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return da*2*Math.atan(Math.tan(io*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,i,o,l,d){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=o,this.view.width=l,this.view.height=d,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(io*.5*this.fov)/this.zoom,i=2*t,o=this.aspect*i,l=-.5*o;const d=this.view;if(this.view!==null&&this.view.enabled){const f=d.fullWidth,h=d.fullHeight;l+=d.offsetX*o/f,t-=d.offsetY*i/h,o*=d.width/f,i*=d.height/h}const c=this.filmOffset;c!==0&&(l+=e*c/this.getFilmWidth()),this.projectionMatrix.makePerspective(l,l+o,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ys=-90,qs=1;class lM extends rn{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const o=new $n(Ys,qs,e,t);o.layers=this.layers,this.add(o);const l=new $n(Ys,qs,e,t);l.layers=this.layers,this.add(l);const d=new $n(Ys,qs,e,t);d.layers=this.layers,this.add(d);const c=new $n(Ys,qs,e,t);c.layers=this.layers,this.add(c);const f=new $n(Ys,qs,e,t);f.layers=this.layers,this.add(f);const h=new $n(Ys,qs,e,t);h.layers=this.layers,this.add(h)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,o,l,d,c,f]=t;for(const h of t)this.remove(h);if(e===ji)i.up.set(0,1,0),i.lookAt(1,0,0),o.up.set(0,1,0),o.lookAt(-1,0,0),l.up.set(0,0,-1),l.lookAt(0,1,0),d.up.set(0,0,1),d.lookAt(0,-1,0),c.up.set(0,1,0),c.lookAt(0,0,1),f.up.set(0,1,0),f.lookAt(0,0,-1);else if(e===ac)i.up.set(0,-1,0),i.lookAt(-1,0,0),o.up.set(0,-1,0),o.lookAt(1,0,0),l.up.set(0,0,1),l.lookAt(0,1,0),d.up.set(0,0,-1),d.lookAt(0,-1,0),c.up.set(0,-1,0),c.lookAt(0,0,1),f.up.set(0,-1,0),f.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const h of t)this.add(h),h.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:o}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[l,d,c,f,h,p]=this.children,g=e.getRenderTarget(),y=e.getActiveCubeFace(),S=e.getActiveMipmapLevel(),E=e.xr.enabled;e.xr.enabled=!1;const M=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,o),e.render(t,l),e.setRenderTarget(i,1,o),e.render(t,d),e.setRenderTarget(i,2,o),e.render(t,c),e.setRenderTarget(i,3,o),e.render(t,f),e.setRenderTarget(i,4,o),e.render(t,h),i.texture.generateMipmaps=M,e.setRenderTarget(i,5,o),e.render(t,p),e.setRenderTarget(g,y,S),e.xr.enabled=E,i.texture.needsPMREMUpdate=!0}}class Kv extends Bn{constructor(e,t,i,o,l,d,c,f,h,p){e=e!==void 0?e:[],t=t!==void 0?t:ao,super(e,t,i,o,l,d,c,f,h,p),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class cM extends as{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},o=[i,i,i,i,i,i];t.encoding!==void 0&&(ra("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===ss?dn:si),this.texture=new Kv(o,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:ii}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},o=new Ti(5,5,5),l=new ls({name:"CubemapFromEquirect",uniforms:uo(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Rn,blending:Cr});l.uniforms.tEquirect.value=t;const d=new Rt(o,l),c=t.minFilter;return t.minFilter===ca&&(t.minFilter=ii),new lM(1,10,this).update(e,d),t.minFilter=c,d.geometry.dispose(),d.material.dispose(),this}clear(e,t,i,o){const l=e.getRenderTarget();for(let d=0;d<6;d++)e.setRenderTarget(this,d),e.clear(t,i,o);e.setRenderTarget(l)}}const Ld=new B,uM=new B,dM=new Mt;class Mr{constructor(e=new B(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,o){return this.normal.set(e,t,i),this.constant=o,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const o=Ld.subVectors(i,t).cross(uM.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(o,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(Ld),o=this.normal.dot(i);if(o===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const l=-(e.start.dot(this.normal)+this.constant)/o;return l<0||l>1?null:t.copy(e.start).addScaledVector(i,l)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||dM.getNormalMatrix(e),o=this.coplanarPoint(Ld).applyMatrix4(e),l=this.normal.applyMatrix3(i).normalize();return this.constant=-o.dot(l),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Zr=new Sc,Vl=new B;class yf{constructor(e=new Mr,t=new Mr,i=new Mr,o=new Mr,l=new Mr,d=new Mr){this.planes=[e,t,i,o,l,d]}set(e,t,i,o,l,d){const c=this.planes;return c[0].copy(e),c[1].copy(t),c[2].copy(i),c[3].copy(o),c[4].copy(l),c[5].copy(d),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=ji){const i=this.planes,o=e.elements,l=o[0],d=o[1],c=o[2],f=o[3],h=o[4],p=o[5],g=o[6],y=o[7],S=o[8],E=o[9],M=o[10],x=o[11],v=o[12],b=o[13],A=o[14],P=o[15];if(i[0].setComponents(f-l,y-h,x-S,P-v).normalize(),i[1].setComponents(f+l,y+h,x+S,P+v).normalize(),i[2].setComponents(f+d,y+p,x+E,P+b).normalize(),i[3].setComponents(f-d,y-p,x-E,P-b).normalize(),i[4].setComponents(f-c,y-g,x-M,P-A).normalize(),t===ji)i[5].setComponents(f+c,y+g,x+M,P+A).normalize();else if(t===ac)i[5].setComponents(c,g,M,A).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Zr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Zr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Zr)}intersectsSprite(e){return Zr.center.set(0,0,0),Zr.radius=.7071067811865476,Zr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Zr)}intersectsSphere(e){const t=this.planes,i=e.center,o=-e.radius;for(let l=0;l<6;l++)if(t[l].distanceToPoint(i)<o)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const o=t[i];if(Vl.x=o.normal.x>0?e.max.x:e.min.x,Vl.y=o.normal.y>0?e.max.y:e.min.y,Vl.z=o.normal.z>0?e.max.z:e.min.z,o.distanceToPoint(Vl)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Jv(){let s=null,e=!1,t=null,i=null;function o(l,d){t(l,d),i=s.requestAnimationFrame(o)}return{start:function(){e!==!0&&t!==null&&(i=s.requestAnimationFrame(o),e=!0)},stop:function(){s.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(l){t=l},setContext:function(l){s=l}}}function fM(s,e){const t=e.isWebGL2,i=new WeakMap;function o(h,p){const g=h.array,y=h.usage,S=g.byteLength,E=s.createBuffer();s.bindBuffer(p,E),s.bufferData(p,g,y),h.onUploadCallback();let M;if(g instanceof Float32Array)M=s.FLOAT;else if(g instanceof Uint16Array)if(h.isFloat16BufferAttribute)if(t)M=s.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else M=s.UNSIGNED_SHORT;else if(g instanceof Int16Array)M=s.SHORT;else if(g instanceof Uint32Array)M=s.UNSIGNED_INT;else if(g instanceof Int32Array)M=s.INT;else if(g instanceof Int8Array)M=s.BYTE;else if(g instanceof Uint8Array)M=s.UNSIGNED_BYTE;else if(g instanceof Uint8ClampedArray)M=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+g);return{buffer:E,type:M,bytesPerElement:g.BYTES_PER_ELEMENT,version:h.version,size:S}}function l(h,p,g){const y=p.array,S=p._updateRange,E=p.updateRanges;if(s.bindBuffer(g,h),S.count===-1&&E.length===0&&s.bufferSubData(g,0,y),E.length!==0){for(let M=0,x=E.length;M<x;M++){const v=E[M];t?s.bufferSubData(g,v.start*y.BYTES_PER_ELEMENT,y,v.start,v.count):s.bufferSubData(g,v.start*y.BYTES_PER_ELEMENT,y.subarray(v.start,v.start+v.count))}p.clearUpdateRanges()}S.count!==-1&&(t?s.bufferSubData(g,S.offset*y.BYTES_PER_ELEMENT,y,S.offset,S.count):s.bufferSubData(g,S.offset*y.BYTES_PER_ELEMENT,y.subarray(S.offset,S.offset+S.count)),S.count=-1),p.onUploadCallback()}function d(h){return h.isInterleavedBufferAttribute&&(h=h.data),i.get(h)}function c(h){h.isInterleavedBufferAttribute&&(h=h.data);const p=i.get(h);p&&(s.deleteBuffer(p.buffer),i.delete(h))}function f(h,p){if(h.isGLBufferAttribute){const y=i.get(h);(!y||y.version<h.version)&&i.set(h,{buffer:h.buffer,type:h.type,bytesPerElement:h.elementSize,version:h.version});return}h.isInterleavedBufferAttribute&&(h=h.data);const g=i.get(h);if(g===void 0)i.set(h,o(h,p));else if(g.version<h.version){if(g.size!==h.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");l(g.buffer,h,p),g.version=h.version}}return{get:d,remove:c,update:f}}class Ec extends Sn{constructor(e=1,t=1,i=1,o=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:o};const l=e/2,d=t/2,c=Math.floor(i),f=Math.floor(o),h=c+1,p=f+1,g=e/c,y=t/f,S=[],E=[],M=[],x=[];for(let v=0;v<p;v++){const b=v*y-d;for(let A=0;A<h;A++){const P=A*g-l;E.push(P,-b,0),M.push(0,0,1),x.push(A/c),x.push(1-v/f)}}for(let v=0;v<f;v++)for(let b=0;b<c;b++){const A=b+h*v,P=b+h*(v+1),z=b+1+h*(v+1),D=b+1+h*v;S.push(A,P,D),S.push(P,z,D)}this.setIndex(S),this.setAttribute("position",new Ft(E,3)),this.setAttribute("normal",new Ft(M,3)),this.setAttribute("uv",new Ft(x,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ec(e.width,e.height,e.widthSegments,e.heightSegments)}}var hM=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,pM=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,mM=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,gM=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,vM=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,xM=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,_M=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,yM=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,SM=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,MM=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,EM=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,wM=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,TM=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,bM=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,AM=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,CM=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,RM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,PM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,LM=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,NM=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,DM=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,UM=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,IM=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,OM=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,FM=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,kM=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,zM=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,BM=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,HM=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,VM=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,GM="gl_FragColor = linearToOutputTexel( gl_FragColor );",WM=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,jM=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,XM=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,$M=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,YM=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,qM=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,KM=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,JM=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ZM=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,QM=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,eE=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,tE=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,nE=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,iE=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,rE=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,sE=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,oE=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,aE=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lE=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,cE=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,uE=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,dE=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,fE=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,hE=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,pE=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,mE=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,gE=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,vE=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,xE=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,_E=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,yE=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,SE=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ME=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,EE=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,wE=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,TE=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,bE=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,AE=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,CE=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,RE=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,PE=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,LE=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,NE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,DE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,UE=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,IE=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,OE=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,FE=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,kE=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,zE=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,BE=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,HE=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,VE=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,GE=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,WE=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,jE=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,XE=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,$E=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,YE=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,qE=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,KE=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,JE=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,ZE=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,QE=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,e1=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,t1=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,n1=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,i1=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,r1=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,s1=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,o1=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,a1=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,l1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,c1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,u1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,d1=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const f1=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,h1=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,p1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,m1=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,g1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,v1=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,x1=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,_1=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,y1=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,S1=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,M1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,E1=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,w1=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,T1=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,b1=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,A1=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,C1=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,R1=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,P1=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,L1=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,N1=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,D1=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,U1=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,I1=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,O1=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,F1=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,k1=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,z1=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,B1=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,H1=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,V1=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,G1=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,W1=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,j1=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,_t={alphahash_fragment:hM,alphahash_pars_fragment:pM,alphamap_fragment:mM,alphamap_pars_fragment:gM,alphatest_fragment:vM,alphatest_pars_fragment:xM,aomap_fragment:_M,aomap_pars_fragment:yM,batching_pars_vertex:SM,batching_vertex:MM,begin_vertex:EM,beginnormal_vertex:wM,bsdfs:TM,iridescence_fragment:bM,bumpmap_pars_fragment:AM,clipping_planes_fragment:CM,clipping_planes_pars_fragment:RM,clipping_planes_pars_vertex:PM,clipping_planes_vertex:LM,color_fragment:NM,color_pars_fragment:DM,color_pars_vertex:UM,color_vertex:IM,common:OM,cube_uv_reflection_fragment:FM,defaultnormal_vertex:kM,displacementmap_pars_vertex:zM,displacementmap_vertex:BM,emissivemap_fragment:HM,emissivemap_pars_fragment:VM,colorspace_fragment:GM,colorspace_pars_fragment:WM,envmap_fragment:jM,envmap_common_pars_fragment:XM,envmap_pars_fragment:$M,envmap_pars_vertex:YM,envmap_physical_pars_fragment:oE,envmap_vertex:qM,fog_vertex:KM,fog_pars_vertex:JM,fog_fragment:ZM,fog_pars_fragment:QM,gradientmap_pars_fragment:eE,lightmap_fragment:tE,lightmap_pars_fragment:nE,lights_lambert_fragment:iE,lights_lambert_pars_fragment:rE,lights_pars_begin:sE,lights_toon_fragment:aE,lights_toon_pars_fragment:lE,lights_phong_fragment:cE,lights_phong_pars_fragment:uE,lights_physical_fragment:dE,lights_physical_pars_fragment:fE,lights_fragment_begin:hE,lights_fragment_maps:pE,lights_fragment_end:mE,logdepthbuf_fragment:gE,logdepthbuf_pars_fragment:vE,logdepthbuf_pars_vertex:xE,logdepthbuf_vertex:_E,map_fragment:yE,map_pars_fragment:SE,map_particle_fragment:ME,map_particle_pars_fragment:EE,metalnessmap_fragment:wE,metalnessmap_pars_fragment:TE,morphcolor_vertex:bE,morphnormal_vertex:AE,morphtarget_pars_vertex:CE,morphtarget_vertex:RE,normal_fragment_begin:PE,normal_fragment_maps:LE,normal_pars_fragment:NE,normal_pars_vertex:DE,normal_vertex:UE,normalmap_pars_fragment:IE,clearcoat_normal_fragment_begin:OE,clearcoat_normal_fragment_maps:FE,clearcoat_pars_fragment:kE,iridescence_pars_fragment:zE,opaque_fragment:BE,packing:HE,premultiplied_alpha_fragment:VE,project_vertex:GE,dithering_fragment:WE,dithering_pars_fragment:jE,roughnessmap_fragment:XE,roughnessmap_pars_fragment:$E,shadowmap_pars_fragment:YE,shadowmap_pars_vertex:qE,shadowmap_vertex:KE,shadowmask_pars_fragment:JE,skinbase_vertex:ZE,skinning_pars_vertex:QE,skinning_vertex:e1,skinnormal_vertex:t1,specularmap_fragment:n1,specularmap_pars_fragment:i1,tonemapping_fragment:r1,tonemapping_pars_fragment:s1,transmission_fragment:o1,transmission_pars_fragment:a1,uv_pars_fragment:l1,uv_pars_vertex:c1,uv_vertex:u1,worldpos_vertex:d1,background_vert:f1,background_frag:h1,backgroundCube_vert:p1,backgroundCube_frag:m1,cube_vert:g1,cube_frag:v1,depth_vert:x1,depth_frag:_1,distanceRGBA_vert:y1,distanceRGBA_frag:S1,equirect_vert:M1,equirect_frag:E1,linedashed_vert:w1,linedashed_frag:T1,meshbasic_vert:b1,meshbasic_frag:A1,meshlambert_vert:C1,meshlambert_frag:R1,meshmatcap_vert:P1,meshmatcap_frag:L1,meshnormal_vert:N1,meshnormal_frag:D1,meshphong_vert:U1,meshphong_frag:I1,meshphysical_vert:O1,meshphysical_frag:F1,meshtoon_vert:k1,meshtoon_frag:z1,points_vert:B1,points_frag:H1,shadow_vert:V1,shadow_frag:G1,sprite_vert:W1,sprite_frag:j1},Oe={common:{diffuse:{value:new Et(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Mt},alphaMap:{value:null},alphaMapTransform:{value:new Mt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Mt}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Mt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Mt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Mt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Mt},normalScale:{value:new Be(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Mt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Mt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Mt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Mt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Et(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Et(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Mt},alphaTest:{value:0},uvTransform:{value:new Mt}},sprite:{diffuse:{value:new Et(16777215)},opacity:{value:1},center:{value:new Be(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Mt},alphaMap:{value:null},alphaMapTransform:{value:new Mt},alphaTest:{value:0}}},Ei={basic:{uniforms:An([Oe.common,Oe.specularmap,Oe.envmap,Oe.aomap,Oe.lightmap,Oe.fog]),vertexShader:_t.meshbasic_vert,fragmentShader:_t.meshbasic_frag},lambert:{uniforms:An([Oe.common,Oe.specularmap,Oe.envmap,Oe.aomap,Oe.lightmap,Oe.emissivemap,Oe.bumpmap,Oe.normalmap,Oe.displacementmap,Oe.fog,Oe.lights,{emissive:{value:new Et(0)}}]),vertexShader:_t.meshlambert_vert,fragmentShader:_t.meshlambert_frag},phong:{uniforms:An([Oe.common,Oe.specularmap,Oe.envmap,Oe.aomap,Oe.lightmap,Oe.emissivemap,Oe.bumpmap,Oe.normalmap,Oe.displacementmap,Oe.fog,Oe.lights,{emissive:{value:new Et(0)},specular:{value:new Et(1118481)},shininess:{value:30}}]),vertexShader:_t.meshphong_vert,fragmentShader:_t.meshphong_frag},standard:{uniforms:An([Oe.common,Oe.envmap,Oe.aomap,Oe.lightmap,Oe.emissivemap,Oe.bumpmap,Oe.normalmap,Oe.displacementmap,Oe.roughnessmap,Oe.metalnessmap,Oe.fog,Oe.lights,{emissive:{value:new Et(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:_t.meshphysical_vert,fragmentShader:_t.meshphysical_frag},toon:{uniforms:An([Oe.common,Oe.aomap,Oe.lightmap,Oe.emissivemap,Oe.bumpmap,Oe.normalmap,Oe.displacementmap,Oe.gradientmap,Oe.fog,Oe.lights,{emissive:{value:new Et(0)}}]),vertexShader:_t.meshtoon_vert,fragmentShader:_t.meshtoon_frag},matcap:{uniforms:An([Oe.common,Oe.bumpmap,Oe.normalmap,Oe.displacementmap,Oe.fog,{matcap:{value:null}}]),vertexShader:_t.meshmatcap_vert,fragmentShader:_t.meshmatcap_frag},points:{uniforms:An([Oe.points,Oe.fog]),vertexShader:_t.points_vert,fragmentShader:_t.points_frag},dashed:{uniforms:An([Oe.common,Oe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:_t.linedashed_vert,fragmentShader:_t.linedashed_frag},depth:{uniforms:An([Oe.common,Oe.displacementmap]),vertexShader:_t.depth_vert,fragmentShader:_t.depth_frag},normal:{uniforms:An([Oe.common,Oe.bumpmap,Oe.normalmap,Oe.displacementmap,{opacity:{value:1}}]),vertexShader:_t.meshnormal_vert,fragmentShader:_t.meshnormal_frag},sprite:{uniforms:An([Oe.sprite,Oe.fog]),vertexShader:_t.sprite_vert,fragmentShader:_t.sprite_frag},background:{uniforms:{uvTransform:{value:new Mt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:_t.background_vert,fragmentShader:_t.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:_t.backgroundCube_vert,fragmentShader:_t.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:_t.cube_vert,fragmentShader:_t.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:_t.equirect_vert,fragmentShader:_t.equirect_frag},distanceRGBA:{uniforms:An([Oe.common,Oe.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:_t.distanceRGBA_vert,fragmentShader:_t.distanceRGBA_frag},shadow:{uniforms:An([Oe.lights,Oe.fog,{color:{value:new Et(0)},opacity:{value:1}}]),vertexShader:_t.shadow_vert,fragmentShader:_t.shadow_frag}};Ei.physical={uniforms:An([Ei.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Mt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Mt},clearcoatNormalScale:{value:new Be(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Mt},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Mt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Mt},sheen:{value:0},sheenColor:{value:new Et(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Mt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Mt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Mt},transmissionSamplerSize:{value:new Be},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Mt},attenuationDistance:{value:0},attenuationColor:{value:new Et(0)},specularColor:{value:new Et(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Mt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Mt},anisotropyVector:{value:new Be},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Mt}}]),vertexShader:_t.meshphysical_vert,fragmentShader:_t.meshphysical_frag};const Gl={r:0,b:0,g:0};function X1(s,e,t,i,o,l,d){const c=new Et(0);let f=l===!0?0:1,h,p,g=null,y=0,S=null;function E(x,v){let b=!1,A=v.isScene===!0?v.background:null;A&&A.isTexture&&(A=(v.backgroundBlurriness>0?t:e).get(A)),A===null?M(c,f):A&&A.isColor&&(M(A,1),b=!0);const P=s.xr.getEnvironmentBlendMode();P==="additive"?i.buffers.color.setClear(0,0,0,1,d):P==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,d),(s.autoClear||b)&&s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil),A&&(A.isCubeTexture||A.mapping===_c)?(p===void 0&&(p=new Rt(new Ti(1,1,1),new ls({name:"BackgroundCubeMaterial",uniforms:uo(Ei.backgroundCube.uniforms),vertexShader:Ei.backgroundCube.vertexShader,fragmentShader:Ei.backgroundCube.fragmentShader,side:Rn,depthTest:!1,depthWrite:!1,fog:!1})),p.geometry.deleteAttribute("normal"),p.geometry.deleteAttribute("uv"),p.onBeforeRender=function(z,D,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(p.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),o.update(p)),p.material.uniforms.envMap.value=A,p.material.uniforms.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,p.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,p.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,p.material.toneMapped=Lt.getTransfer(A.colorSpace)!==Ot,(g!==A||y!==A.version||S!==s.toneMapping)&&(p.material.needsUpdate=!0,g=A,y=A.version,S=s.toneMapping),p.layers.enableAll(),x.unshift(p,p.geometry,p.material,0,0,null)):A&&A.isTexture&&(h===void 0&&(h=new Rt(new Ec(2,2),new ls({name:"BackgroundMaterial",uniforms:uo(Ei.background.uniforms),vertexShader:Ei.background.vertexShader,fragmentShader:Ei.background.fragmentShader,side:Dr,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),Object.defineProperty(h.material,"map",{get:function(){return this.uniforms.t2D.value}}),o.update(h)),h.material.uniforms.t2D.value=A,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.toneMapped=Lt.getTransfer(A.colorSpace)!==Ot,A.matrixAutoUpdate===!0&&A.updateMatrix(),h.material.uniforms.uvTransform.value.copy(A.matrix),(g!==A||y!==A.version||S!==s.toneMapping)&&(h.material.needsUpdate=!0,g=A,y=A.version,S=s.toneMapping),h.layers.enableAll(),x.unshift(h,h.geometry,h.material,0,0,null))}function M(x,v){x.getRGB(Gl,Yv(s)),i.buffers.color.setClear(Gl.r,Gl.g,Gl.b,v,d)}return{getClearColor:function(){return c},setClearColor:function(x,v=1){c.set(x),f=v,M(c,f)},getClearAlpha:function(){return f},setClearAlpha:function(x){f=x,M(c,f)},render:E}}function $1(s,e,t,i){const o=s.getParameter(s.MAX_VERTEX_ATTRIBS),l=i.isWebGL2?null:e.get("OES_vertex_array_object"),d=i.isWebGL2||l!==null,c={},f=x(null);let h=f,p=!1;function g(V,J,te,q,X){let K=!1;if(d){const Y=M(q,te,J);h!==Y&&(h=Y,S(h.object)),K=v(V,q,te,X),K&&b(V,q,te,X)}else{const Y=J.wireframe===!0;(h.geometry!==q.id||h.program!==te.id||h.wireframe!==Y)&&(h.geometry=q.id,h.program=te.id,h.wireframe=Y,K=!0)}X!==null&&t.update(X,s.ELEMENT_ARRAY_BUFFER),(K||p)&&(p=!1,ne(V,J,te,q),X!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(X).buffer))}function y(){return i.isWebGL2?s.createVertexArray():l.createVertexArrayOES()}function S(V){return i.isWebGL2?s.bindVertexArray(V):l.bindVertexArrayOES(V)}function E(V){return i.isWebGL2?s.deleteVertexArray(V):l.deleteVertexArrayOES(V)}function M(V,J,te){const q=te.wireframe===!0;let X=c[V.id];X===void 0&&(X={},c[V.id]=X);let K=X[J.id];K===void 0&&(K={},X[J.id]=K);let Y=K[q];return Y===void 0&&(Y=x(y()),K[q]=Y),Y}function x(V){const J=[],te=[],q=[];for(let X=0;X<o;X++)J[X]=0,te[X]=0,q[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:J,enabledAttributes:te,attributeDivisors:q,object:V,attributes:{},index:null}}function v(V,J,te,q){const X=h.attributes,K=J.attributes;let Y=0;const O=te.getAttributes();for(const F in O)if(O[F].location>=0){const ce=X[F];let me=K[F];if(me===void 0&&(F==="instanceMatrix"&&V.instanceMatrix&&(me=V.instanceMatrix),F==="instanceColor"&&V.instanceColor&&(me=V.instanceColor)),ce===void 0||ce.attribute!==me||me&&ce.data!==me.data)return!0;Y++}return h.attributesNum!==Y||h.index!==q}function b(V,J,te,q){const X={},K=J.attributes;let Y=0;const O=te.getAttributes();for(const F in O)if(O[F].location>=0){let ce=K[F];ce===void 0&&(F==="instanceMatrix"&&V.instanceMatrix&&(ce=V.instanceMatrix),F==="instanceColor"&&V.instanceColor&&(ce=V.instanceColor));const me={};me.attribute=ce,ce&&ce.data&&(me.data=ce.data),X[F]=me,Y++}h.attributes=X,h.attributesNum=Y,h.index=q}function A(){const V=h.newAttributes;for(let J=0,te=V.length;J<te;J++)V[J]=0}function P(V){z(V,0)}function z(V,J){const te=h.newAttributes,q=h.enabledAttributes,X=h.attributeDivisors;te[V]=1,q[V]===0&&(s.enableVertexAttribArray(V),q[V]=1),X[V]!==J&&((i.isWebGL2?s:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](V,J),X[V]=J)}function D(){const V=h.newAttributes,J=h.enabledAttributes;for(let te=0,q=J.length;te<q;te++)J[te]!==V[te]&&(s.disableVertexAttribArray(te),J[te]=0)}function I(V,J,te,q,X,K,Y){Y===!0?s.vertexAttribIPointer(V,J,te,X,K):s.vertexAttribPointer(V,J,te,q,X,K)}function ne(V,J,te,q){if(i.isWebGL2===!1&&(V.isInstancedMesh||q.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;A();const X=q.attributes,K=te.getAttributes(),Y=J.defaultAttributeValues;for(const O in K){const F=K[O];if(F.location>=0){let j=X[O];if(j===void 0&&(O==="instanceMatrix"&&V.instanceMatrix&&(j=V.instanceMatrix),O==="instanceColor"&&V.instanceColor&&(j=V.instanceColor)),j!==void 0){const ce=j.normalized,me=j.itemSize,ye=t.get(j);if(ye===void 0)continue;const Se=ye.buffer,Fe=ye.type,ve=ye.bytesPerElement,Ae=i.isWebGL2===!0&&(Fe===s.INT||Fe===s.UNSIGNED_INT||j.gpuType===Pv);if(j.isInterleavedBufferAttribute){const ze=j.data,Q=ze.stride,nt=j.offset;if(ze.isInstancedInterleavedBuffer){for(let ke=0;ke<F.locationSize;ke++)z(F.location+ke,ze.meshPerAttribute);V.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=ze.meshPerAttribute*ze.count)}else for(let ke=0;ke<F.locationSize;ke++)P(F.location+ke);s.bindBuffer(s.ARRAY_BUFFER,Se);for(let ke=0;ke<F.locationSize;ke++)I(F.location+ke,me/F.locationSize,Fe,ce,Q*ve,(nt+me/F.locationSize*ke)*ve,Ae)}else{if(j.isInstancedBufferAttribute){for(let ze=0;ze<F.locationSize;ze++)z(F.location+ze,j.meshPerAttribute);V.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let ze=0;ze<F.locationSize;ze++)P(F.location+ze);s.bindBuffer(s.ARRAY_BUFFER,Se);for(let ze=0;ze<F.locationSize;ze++)I(F.location+ze,me/F.locationSize,Fe,ce,me*ve,me/F.locationSize*ze*ve,Ae)}}else if(Y!==void 0){const ce=Y[O];if(ce!==void 0)switch(ce.length){case 2:s.vertexAttrib2fv(F.location,ce);break;case 3:s.vertexAttrib3fv(F.location,ce);break;case 4:s.vertexAttrib4fv(F.location,ce);break;default:s.vertexAttrib1fv(F.location,ce)}}}}D()}function R(){le();for(const V in c){const J=c[V];for(const te in J){const q=J[te];for(const X in q)E(q[X].object),delete q[X];delete J[te]}delete c[V]}}function U(V){if(c[V.id]===void 0)return;const J=c[V.id];for(const te in J){const q=J[te];for(const X in q)E(q[X].object),delete q[X];delete J[te]}delete c[V.id]}function se(V){for(const J in c){const te=c[J];if(te[V.id]===void 0)continue;const q=te[V.id];for(const X in q)E(q[X].object),delete q[X];delete te[V.id]}}function le(){ge(),p=!0,h!==f&&(h=f,S(h.object))}function ge(){f.geometry=null,f.program=null,f.wireframe=!1}return{setup:g,reset:le,resetDefaultState:ge,dispose:R,releaseStatesOfGeometry:U,releaseStatesOfProgram:se,initAttributes:A,enableAttribute:P,disableUnusedAttributes:D}}function Y1(s,e,t,i){const o=i.isWebGL2;let l;function d(p){l=p}function c(p,g){s.drawArrays(l,p,g),t.update(g,l,1)}function f(p,g,y){if(y===0)return;let S,E;if(o)S=s,E="drawArraysInstanced";else if(S=e.get("ANGLE_instanced_arrays"),E="drawArraysInstancedANGLE",S===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}S[E](l,p,g,y),t.update(g,l,y)}function h(p,g,y){if(y===0)return;const S=e.get("WEBGL_multi_draw");if(S===null)for(let E=0;E<y;E++)this.render(p[E],g[E]);else{S.multiDrawArraysWEBGL(l,p,0,g,0,y);let E=0;for(let M=0;M<y;M++)E+=g[M];t.update(E,l,1)}}this.setMode=d,this.render=c,this.renderInstances=f,this.renderMultiDraw=h}function q1(s,e,t){let i;function o(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const I=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function l(I){if(I==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const d=typeof WebGL2RenderingContext<"u"&&s.constructor.name==="WebGL2RenderingContext";let c=t.precision!==void 0?t.precision:"highp";const f=l(c);f!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",f,"instead."),c=f);const h=d||e.has("WEBGL_draw_buffers"),p=t.logarithmicDepthBuffer===!0,g=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),y=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),S=s.getParameter(s.MAX_TEXTURE_SIZE),E=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),M=s.getParameter(s.MAX_VERTEX_ATTRIBS),x=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),v=s.getParameter(s.MAX_VARYING_VECTORS),b=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),A=y>0,P=d||e.has("OES_texture_float"),z=A&&P,D=d?s.getParameter(s.MAX_SAMPLES):0;return{isWebGL2:d,drawBuffers:h,getMaxAnisotropy:o,getMaxPrecision:l,precision:c,logarithmicDepthBuffer:p,maxTextures:g,maxVertexTextures:y,maxTextureSize:S,maxCubemapSize:E,maxAttributes:M,maxVertexUniforms:x,maxVaryings:v,maxFragmentUniforms:b,vertexTextures:A,floatFragmentTextures:P,floatVertexTextures:z,maxSamples:D}}function K1(s){const e=this;let t=null,i=0,o=!1,l=!1;const d=new Mr,c=new Mt,f={value:null,needsUpdate:!1};this.uniform=f,this.numPlanes=0,this.numIntersection=0,this.init=function(g,y){const S=g.length!==0||y||i!==0||o;return o=y,i=g.length,S},this.beginShadows=function(){l=!0,p(null)},this.endShadows=function(){l=!1},this.setGlobalState=function(g,y){t=p(g,y,0)},this.setState=function(g,y,S){const E=g.clippingPlanes,M=g.clipIntersection,x=g.clipShadows,v=s.get(g);if(!o||E===null||E.length===0||l&&!x)l?p(null):h();else{const b=l?0:i,A=b*4;let P=v.clippingState||null;f.value=P,P=p(E,y,A,S);for(let z=0;z!==A;++z)P[z]=t[z];v.clippingState=P,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=b}};function h(){f.value!==t&&(f.value=t,f.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function p(g,y,S,E){const M=g!==null?g.length:0;let x=null;if(M!==0){if(x=f.value,E!==!0||x===null){const v=S+M*4,b=y.matrixWorldInverse;c.getNormalMatrix(b),(x===null||x.length<v)&&(x=new Float32Array(v));for(let A=0,P=S;A!==M;++A,P+=4)d.copy(g[A]).applyMatrix4(b,c),d.normal.toArray(x,P),x[P+3]=d.constant}f.value=x,f.needsUpdate=!0}return e.numPlanes=M,e.numIntersection=0,x}}function J1(s){let e=new WeakMap;function t(d,c){return c===Qd?d.mapping=ao:c===ef&&(d.mapping=lo),d}function i(d){if(d&&d.isTexture){const c=d.mapping;if(c===Qd||c===ef)if(e.has(d)){const f=e.get(d).texture;return t(f,d.mapping)}else{const f=d.image;if(f&&f.height>0){const h=new cM(f.height/2);return h.fromEquirectangularTexture(s,d),e.set(d,h),d.addEventListener("dispose",o),t(h.texture,d.mapping)}else return null}}return d}function o(d){const c=d.target;c.removeEventListener("dispose",o);const f=e.get(c);f!==void 0&&(e.delete(c),f.dispose())}function l(){e=new WeakMap}return{get:i,dispose:l}}class Zv extends qv{constructor(e=-1,t=1,i=1,o=-1,l=.1,d=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=o,this.near=l,this.far=d,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,o,l,d){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=o,this.view.width=l,this.view.height=d,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,o=(this.top+this.bottom)/2;let l=i-e,d=i+e,c=o+t,f=o-t;if(this.view!==null&&this.view.enabled){const h=(this.right-this.left)/this.view.fullWidth/this.zoom,p=(this.top-this.bottom)/this.view.fullHeight/this.zoom;l+=h*this.view.offsetX,d=l+h*this.view.width,c-=p*this.view.offsetY,f=c-p*this.view.height}this.projectionMatrix.makeOrthographic(l,d,c,f,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const eo=4,gg=[.125,.215,.35,.446,.526,.582],ts=20,Nd=new Zv,vg=new Et;let Dd=null,Ud=0,Id=0;const Qr=(1+Math.sqrt(5))/2,Ks=1/Qr,xg=[new B(1,1,1),new B(-1,1,1),new B(1,1,-1),new B(-1,1,-1),new B(0,Qr,Ks),new B(0,Qr,-Ks),new B(Ks,0,Qr),new B(-Ks,0,Qr),new B(Qr,Ks,0),new B(-Qr,Ks,0)];class sf{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,o=100){Dd=this._renderer.getRenderTarget(),Ud=this._renderer.getActiveCubeFace(),Id=this._renderer.getActiveMipmapLevel(),this._setSize(256);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,o,l),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Sg(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=yg(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Dd,Ud,Id),e.scissorTest=!1,Wl(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ao||e.mapping===lo?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Dd=this._renderer.getRenderTarget(),Ud=this._renderer.getActiveCubeFace(),Id=this._renderer.getActiveMipmapLevel();const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:ii,minFilter:ii,generateMipmaps:!1,type:ua,format:gi,colorSpace:Xi,depthBuffer:!1},o=_g(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=_g(e,t,i);const{_lodMax:l}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Z1(l)),this._blurMaterial=Q1(l,e,t)}return o}_compileMaterial(e){const t=new Rt(this._lodPlanes[0],e);this._renderer.compile(t,Nd)}_sceneToCubeUV(e,t,i,o){const c=new $n(90,1,t,i),f=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],p=this._renderer,g=p.autoClear,y=p.toneMapping;p.getClearColor(vg),p.toneMapping=Rr,p.autoClear=!1;const S=new so({name:"PMREM.Background",side:Rn,depthWrite:!1,depthTest:!1}),E=new Rt(new Ti,S);let M=!1;const x=e.background;x?x.isColor&&(S.color.copy(x),e.background=null,M=!0):(S.color.copy(vg),M=!0);for(let v=0;v<6;v++){const b=v%3;b===0?(c.up.set(0,f[v],0),c.lookAt(h[v],0,0)):b===1?(c.up.set(0,0,f[v]),c.lookAt(0,h[v],0)):(c.up.set(0,f[v],0),c.lookAt(0,0,h[v]));const A=this._cubeSize;Wl(o,b*A,v>2?A:0,A,A),p.setRenderTarget(o),M&&p.render(E,c),p.render(e,c)}E.geometry.dispose(),E.material.dispose(),p.toneMapping=y,p.autoClear=g,e.background=x}_textureToCubeUV(e,t){const i=this._renderer,o=e.mapping===ao||e.mapping===lo;o?(this._cubemapMaterial===null&&(this._cubemapMaterial=Sg()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=yg());const l=o?this._cubemapMaterial:this._equirectMaterial,d=new Rt(this._lodPlanes[0],l),c=l.uniforms;c.envMap.value=e;const f=this._cubeSize;Wl(t,0,0,3*f,2*f),i.setRenderTarget(t),i.render(d,Nd)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;for(let o=1;o<this._lodPlanes.length;o++){const l=Math.sqrt(this._sigmas[o]*this._sigmas[o]-this._sigmas[o-1]*this._sigmas[o-1]),d=xg[(o-1)%xg.length];this._blur(e,o-1,o,l,d)}t.autoClear=i}_blur(e,t,i,o,l){const d=this._pingPongRenderTarget;this._halfBlur(e,d,t,i,o,"latitudinal",l),this._halfBlur(d,e,i,i,o,"longitudinal",l)}_halfBlur(e,t,i,o,l,d,c){const f=this._renderer,h=this._blurMaterial;d!=="latitudinal"&&d!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const p=3,g=new Rt(this._lodPlanes[o],h),y=h.uniforms,S=this._sizeLods[i]-1,E=isFinite(l)?Math.PI/(2*S):2*Math.PI/(2*ts-1),M=l/E,x=isFinite(l)?1+Math.floor(p*M):ts;x>ts&&console.warn(`sigmaRadians, ${l}, is too large and will clip, as it requested ${x} samples when the maximum is set to ${ts}`);const v=[];let b=0;for(let I=0;I<ts;++I){const ne=I/M,R=Math.exp(-ne*ne/2);v.push(R),I===0?b+=R:I<x&&(b+=2*R)}for(let I=0;I<v.length;I++)v[I]=v[I]/b;y.envMap.value=e.texture,y.samples.value=x,y.weights.value=v,y.latitudinal.value=d==="latitudinal",c&&(y.poleAxis.value=c);const{_lodMax:A}=this;y.dTheta.value=E,y.mipInt.value=A-i;const P=this._sizeLods[o],z=3*P*(o>A-eo?o-A+eo:0),D=4*(this._cubeSize-P);Wl(t,z,D,3*P,2*P),f.setRenderTarget(t),f.render(g,Nd)}}function Z1(s){const e=[],t=[],i=[];let o=s;const l=s-eo+1+gg.length;for(let d=0;d<l;d++){const c=Math.pow(2,o);t.push(c);let f=1/c;d>s-eo?f=gg[d-s+eo-1]:d===0&&(f=0),i.push(f);const h=1/(c-2),p=-h,g=1+h,y=[p,p,g,p,g,g,p,p,g,g,p,g],S=6,E=6,M=3,x=2,v=1,b=new Float32Array(M*E*S),A=new Float32Array(x*E*S),P=new Float32Array(v*E*S);for(let D=0;D<S;D++){const I=D%3*2/3-1,ne=D>2?0:-1,R=[I,ne,0,I+2/3,ne,0,I+2/3,ne+1,0,I,ne,0,I+2/3,ne+1,0,I,ne+1,0];b.set(R,M*E*D),A.set(y,x*E*D);const U=[D,D,D,D,D,D];P.set(U,v*E*D)}const z=new Sn;z.setAttribute("position",new Yn(b,M)),z.setAttribute("uv",new Yn(A,x)),z.setAttribute("faceIndex",new Yn(P,v)),e.push(z),o>eo&&o--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function _g(s,e,t){const i=new as(s,e,t);return i.texture.mapping=_c,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Wl(s,e,t,i,o){s.viewport.set(e,t,i,o),s.scissor.set(e,t,i,o)}function Q1(s,e,t){const i=new Float32Array(ts),o=new B(0,1,0);return new ls({name:"SphericalGaussianBlur",defines:{n:ts,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:o}},vertexShader:Sf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Cr,depthTest:!1,depthWrite:!1})}function yg(){return new ls({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Sf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Cr,depthTest:!1,depthWrite:!1})}function Sg(){return new ls({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Sf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Cr,depthTest:!1,depthWrite:!1})}function Sf(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function ew(s){let e=new WeakMap,t=null;function i(c){if(c&&c.isTexture){const f=c.mapping,h=f===Qd||f===ef,p=f===ao||f===lo;if(h||p)if(c.isRenderTargetTexture&&c.needsPMREMUpdate===!0){c.needsPMREMUpdate=!1;let g=e.get(c);return t===null&&(t=new sf(s)),g=h?t.fromEquirectangular(c,g):t.fromCubemap(c,g),e.set(c,g),g.texture}else{if(e.has(c))return e.get(c).texture;{const g=c.image;if(h&&g&&g.height>0||p&&g&&o(g)){t===null&&(t=new sf(s));const y=h?t.fromEquirectangular(c):t.fromCubemap(c);return e.set(c,y),c.addEventListener("dispose",l),y.texture}else return null}}}return c}function o(c){let f=0;const h=6;for(let p=0;p<h;p++)c[p]!==void 0&&f++;return f===h}function l(c){const f=c.target;f.removeEventListener("dispose",l);const h=e.get(f);h!==void 0&&(e.delete(f),h.dispose())}function d(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:d}}function tw(s){const e={};function t(i){if(e[i]!==void 0)return e[i];let o;switch(i){case"WEBGL_depth_texture":o=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":o=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":o=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":o=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:o=s.getExtension(i)}return e[i]=o,o}return{has:function(i){return t(i)!==null},init:function(i){i.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(i){const o=t(i);return o===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),o}}}function nw(s,e,t,i){const o={},l=new WeakMap;function d(g){const y=g.target;y.index!==null&&e.remove(y.index);for(const E in y.attributes)e.remove(y.attributes[E]);for(const E in y.morphAttributes){const M=y.morphAttributes[E];for(let x=0,v=M.length;x<v;x++)e.remove(M[x])}y.removeEventListener("dispose",d),delete o[y.id];const S=l.get(y);S&&(e.remove(S),l.delete(y)),i.releaseStatesOfGeometry(y),y.isInstancedBufferGeometry===!0&&delete y._maxInstanceCount,t.memory.geometries--}function c(g,y){return o[y.id]===!0||(y.addEventListener("dispose",d),o[y.id]=!0,t.memory.geometries++),y}function f(g){const y=g.attributes;for(const E in y)e.update(y[E],s.ARRAY_BUFFER);const S=g.morphAttributes;for(const E in S){const M=S[E];for(let x=0,v=M.length;x<v;x++)e.update(M[x],s.ARRAY_BUFFER)}}function h(g){const y=[],S=g.index,E=g.attributes.position;let M=0;if(S!==null){const b=S.array;M=S.version;for(let A=0,P=b.length;A<P;A+=3){const z=b[A+0],D=b[A+1],I=b[A+2];y.push(z,D,D,I,I,z)}}else if(E!==void 0){const b=E.array;M=E.version;for(let A=0,P=b.length/3-1;A<P;A+=3){const z=A+0,D=A+1,I=A+2;y.push(z,D,D,I,I,z)}}else return;const x=new(Bv(y)?$v:Xv)(y,1);x.version=M;const v=l.get(g);v&&e.remove(v),l.set(g,x)}function p(g){const y=l.get(g);if(y){const S=g.index;S!==null&&y.version<S.version&&h(g)}else h(g);return l.get(g)}return{get:c,update:f,getWireframeAttribute:p}}function iw(s,e,t,i){const o=i.isWebGL2;let l;function d(S){l=S}let c,f;function h(S){c=S.type,f=S.bytesPerElement}function p(S,E){s.drawElements(l,E,c,S*f),t.update(E,l,1)}function g(S,E,M){if(M===0)return;let x,v;if(o)x=s,v="drawElementsInstanced";else if(x=e.get("ANGLE_instanced_arrays"),v="drawElementsInstancedANGLE",x===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}x[v](l,E,c,S*f,M),t.update(E,l,M)}function y(S,E,M){if(M===0)return;const x=e.get("WEBGL_multi_draw");if(x===null)for(let v=0;v<M;v++)this.render(S[v]/f,E[v]);else{x.multiDrawElementsWEBGL(l,E,0,c,S,0,M);let v=0;for(let b=0;b<M;b++)v+=E[b];t.update(v,l,1)}}this.setMode=d,this.setIndex=h,this.render=p,this.renderInstances=g,this.renderMultiDraw=y}function rw(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(l,d,c){switch(t.calls++,d){case s.TRIANGLES:t.triangles+=c*(l/3);break;case s.LINES:t.lines+=c*(l/2);break;case s.LINE_STRIP:t.lines+=c*(l-1);break;case s.LINE_LOOP:t.lines+=c*l;break;case s.POINTS:t.points+=c*l;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",d);break}}function o(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:o,update:i}}function sw(s,e){return s[0]-e[0]}function ow(s,e){return Math.abs(e[1])-Math.abs(s[1])}function aw(s,e,t){const i={},o=new Float32Array(8),l=new WeakMap,d=new Bt,c=[];for(let h=0;h<8;h++)c[h]=[h,0];function f(h,p,g){const y=h.morphTargetInfluences;if(e.isWebGL2===!0){const E=p.morphAttributes.position||p.morphAttributes.normal||p.morphAttributes.color,M=E!==void 0?E.length:0;let x=l.get(p);if(x===void 0||x.count!==M){let J=function(){ge.dispose(),l.delete(p),p.removeEventListener("dispose",J)};var S=J;x!==void 0&&x.texture.dispose();const A=p.morphAttributes.position!==void 0,P=p.morphAttributes.normal!==void 0,z=p.morphAttributes.color!==void 0,D=p.morphAttributes.position||[],I=p.morphAttributes.normal||[],ne=p.morphAttributes.color||[];let R=0;A===!0&&(R=1),P===!0&&(R=2),z===!0&&(R=3);let U=p.attributes.position.count*R,se=1;U>e.maxTextureSize&&(se=Math.ceil(U/e.maxTextureSize),U=e.maxTextureSize);const le=new Float32Array(U*se*4*M),ge=new Gv(le,U,se,M);ge.type=Tr,ge.needsUpdate=!0;const V=R*4;for(let te=0;te<M;te++){const q=D[te],X=I[te],K=ne[te],Y=U*se*4*te;for(let O=0;O<q.count;O++){const F=O*V;A===!0&&(d.fromBufferAttribute(q,O),le[Y+F+0]=d.x,le[Y+F+1]=d.y,le[Y+F+2]=d.z,le[Y+F+3]=0),P===!0&&(d.fromBufferAttribute(X,O),le[Y+F+4]=d.x,le[Y+F+5]=d.y,le[Y+F+6]=d.z,le[Y+F+7]=0),z===!0&&(d.fromBufferAttribute(K,O),le[Y+F+8]=d.x,le[Y+F+9]=d.y,le[Y+F+10]=d.z,le[Y+F+11]=K.itemSize===4?d.w:1)}}x={count:M,texture:ge,size:new Be(U,se)},l.set(p,x),p.addEventListener("dispose",J)}let v=0;for(let A=0;A<y.length;A++)v+=y[A];const b=p.morphTargetsRelative?1:1-v;g.getUniforms().setValue(s,"morphTargetBaseInfluence",b),g.getUniforms().setValue(s,"morphTargetInfluences",y),g.getUniforms().setValue(s,"morphTargetsTexture",x.texture,t),g.getUniforms().setValue(s,"morphTargetsTextureSize",x.size)}else{const E=y===void 0?0:y.length;let M=i[p.id];if(M===void 0||M.length!==E){M=[];for(let P=0;P<E;P++)M[P]=[P,0];i[p.id]=M}for(let P=0;P<E;P++){const z=M[P];z[0]=P,z[1]=y[P]}M.sort(ow);for(let P=0;P<8;P++)P<E&&M[P][1]?(c[P][0]=M[P][0],c[P][1]=M[P][1]):(c[P][0]=Number.MAX_SAFE_INTEGER,c[P][1]=0);c.sort(sw);const x=p.morphAttributes.position,v=p.morphAttributes.normal;let b=0;for(let P=0;P<8;P++){const z=c[P],D=z[0],I=z[1];D!==Number.MAX_SAFE_INTEGER&&I?(x&&p.getAttribute("morphTarget"+P)!==x[D]&&p.setAttribute("morphTarget"+P,x[D]),v&&p.getAttribute("morphNormal"+P)!==v[D]&&p.setAttribute("morphNormal"+P,v[D]),o[P]=I,b+=I):(x&&p.hasAttribute("morphTarget"+P)===!0&&p.deleteAttribute("morphTarget"+P),v&&p.hasAttribute("morphNormal"+P)===!0&&p.deleteAttribute("morphNormal"+P),o[P]=0)}const A=p.morphTargetsRelative?1:1-b;g.getUniforms().setValue(s,"morphTargetBaseInfluence",A),g.getUniforms().setValue(s,"morphTargetInfluences",o)}}return{update:f}}function lw(s,e,t,i){let o=new WeakMap;function l(f){const h=i.render.frame,p=f.geometry,g=e.get(f,p);if(o.get(g)!==h&&(e.update(g),o.set(g,h)),f.isInstancedMesh&&(f.hasEventListener("dispose",c)===!1&&f.addEventListener("dispose",c),o.get(f)!==h&&(t.update(f.instanceMatrix,s.ARRAY_BUFFER),f.instanceColor!==null&&t.update(f.instanceColor,s.ARRAY_BUFFER),o.set(f,h))),f.isSkinnedMesh){const y=f.skeleton;o.get(y)!==h&&(y.update(),o.set(y,h))}return g}function d(){o=new WeakMap}function c(f){const h=f.target;h.removeEventListener("dispose",c),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:l,dispose:d}}class Qv extends Bn{constructor(e,t,i,o,l,d,c,f,h,p){if(p=p!==void 0?p:rs,p!==rs&&p!==co)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&p===rs&&(i=wr),i===void 0&&p===co&&(i=is),super(null,o,l,d,c,f,p,i,h),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=c!==void 0?c:Cn,this.minFilter=f!==void 0?f:Cn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const e0=new Bn,t0=new Qv(1,1);t0.compareFunction=zv;const n0=new Gv,i0=new XS,r0=new Kv,Mg=[],Eg=[],wg=new Float32Array(16),Tg=new Float32Array(9),bg=new Float32Array(4);function vo(s,e,t){const i=s[0];if(i<=0||i>0)return s;const o=e*t;let l=Mg[o];if(l===void 0&&(l=new Float32Array(o),Mg[o]=l),e!==0){i.toArray(l,0);for(let d=1,c=0;d!==e;++d)c+=t,s[d].toArray(l,c)}return l}function sn(s,e){if(s.length!==e.length)return!1;for(let t=0,i=s.length;t<i;t++)if(s[t]!==e[t])return!1;return!0}function on(s,e){for(let t=0,i=e.length;t<i;t++)s[t]=e[t]}function wc(s,e){let t=Eg[e];t===void 0&&(t=new Int32Array(e),Eg[e]=t);for(let i=0;i!==e;++i)t[i]=s.allocateTextureUnit();return t}function cw(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function uw(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(sn(t,e))return;s.uniform2fv(this.addr,e),on(t,e)}}function dw(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(sn(t,e))return;s.uniform3fv(this.addr,e),on(t,e)}}function fw(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(sn(t,e))return;s.uniform4fv(this.addr,e),on(t,e)}}function hw(s,e){const t=this.cache,i=e.elements;if(i===void 0){if(sn(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),on(t,e)}else{if(sn(t,i))return;bg.set(i),s.uniformMatrix2fv(this.addr,!1,bg),on(t,i)}}function pw(s,e){const t=this.cache,i=e.elements;if(i===void 0){if(sn(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),on(t,e)}else{if(sn(t,i))return;Tg.set(i),s.uniformMatrix3fv(this.addr,!1,Tg),on(t,i)}}function mw(s,e){const t=this.cache,i=e.elements;if(i===void 0){if(sn(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),on(t,e)}else{if(sn(t,i))return;wg.set(i),s.uniformMatrix4fv(this.addr,!1,wg),on(t,i)}}function gw(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function vw(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(sn(t,e))return;s.uniform2iv(this.addr,e),on(t,e)}}function xw(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(sn(t,e))return;s.uniform3iv(this.addr,e),on(t,e)}}function _w(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(sn(t,e))return;s.uniform4iv(this.addr,e),on(t,e)}}function yw(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function Sw(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(sn(t,e))return;s.uniform2uiv(this.addr,e),on(t,e)}}function Mw(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(sn(t,e))return;s.uniform3uiv(this.addr,e),on(t,e)}}function Ew(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(sn(t,e))return;s.uniform4uiv(this.addr,e),on(t,e)}}function ww(s,e,t){const i=this.cache,o=t.allocateTextureUnit();i[0]!==o&&(s.uniform1i(this.addr,o),i[0]=o);const l=this.type===s.SAMPLER_2D_SHADOW?t0:e0;t.setTexture2D(e||l,o)}function Tw(s,e,t){const i=this.cache,o=t.allocateTextureUnit();i[0]!==o&&(s.uniform1i(this.addr,o),i[0]=o),t.setTexture3D(e||i0,o)}function bw(s,e,t){const i=this.cache,o=t.allocateTextureUnit();i[0]!==o&&(s.uniform1i(this.addr,o),i[0]=o),t.setTextureCube(e||r0,o)}function Aw(s,e,t){const i=this.cache,o=t.allocateTextureUnit();i[0]!==o&&(s.uniform1i(this.addr,o),i[0]=o),t.setTexture2DArray(e||n0,o)}function Cw(s){switch(s){case 5126:return cw;case 35664:return uw;case 35665:return dw;case 35666:return fw;case 35674:return hw;case 35675:return pw;case 35676:return mw;case 5124:case 35670:return gw;case 35667:case 35671:return vw;case 35668:case 35672:return xw;case 35669:case 35673:return _w;case 5125:return yw;case 36294:return Sw;case 36295:return Mw;case 36296:return Ew;case 35678:case 36198:case 36298:case 36306:case 35682:return ww;case 35679:case 36299:case 36307:return Tw;case 35680:case 36300:case 36308:case 36293:return bw;case 36289:case 36303:case 36311:case 36292:return Aw}}function Rw(s,e){s.uniform1fv(this.addr,e)}function Pw(s,e){const t=vo(e,this.size,2);s.uniform2fv(this.addr,t)}function Lw(s,e){const t=vo(e,this.size,3);s.uniform3fv(this.addr,t)}function Nw(s,e){const t=vo(e,this.size,4);s.uniform4fv(this.addr,t)}function Dw(s,e){const t=vo(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function Uw(s,e){const t=vo(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function Iw(s,e){const t=vo(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function Ow(s,e){s.uniform1iv(this.addr,e)}function Fw(s,e){s.uniform2iv(this.addr,e)}function kw(s,e){s.uniform3iv(this.addr,e)}function zw(s,e){s.uniform4iv(this.addr,e)}function Bw(s,e){s.uniform1uiv(this.addr,e)}function Hw(s,e){s.uniform2uiv(this.addr,e)}function Vw(s,e){s.uniform3uiv(this.addr,e)}function Gw(s,e){s.uniform4uiv(this.addr,e)}function Ww(s,e,t){const i=this.cache,o=e.length,l=wc(t,o);sn(i,l)||(s.uniform1iv(this.addr,l),on(i,l));for(let d=0;d!==o;++d)t.setTexture2D(e[d]||e0,l[d])}function jw(s,e,t){const i=this.cache,o=e.length,l=wc(t,o);sn(i,l)||(s.uniform1iv(this.addr,l),on(i,l));for(let d=0;d!==o;++d)t.setTexture3D(e[d]||i0,l[d])}function Xw(s,e,t){const i=this.cache,o=e.length,l=wc(t,o);sn(i,l)||(s.uniform1iv(this.addr,l),on(i,l));for(let d=0;d!==o;++d)t.setTextureCube(e[d]||r0,l[d])}function $w(s,e,t){const i=this.cache,o=e.length,l=wc(t,o);sn(i,l)||(s.uniform1iv(this.addr,l),on(i,l));for(let d=0;d!==o;++d)t.setTexture2DArray(e[d]||n0,l[d])}function Yw(s){switch(s){case 5126:return Rw;case 35664:return Pw;case 35665:return Lw;case 35666:return Nw;case 35674:return Dw;case 35675:return Uw;case 35676:return Iw;case 5124:case 35670:return Ow;case 35667:case 35671:return Fw;case 35668:case 35672:return kw;case 35669:case 35673:return zw;case 5125:return Bw;case 36294:return Hw;case 36295:return Vw;case 36296:return Gw;case 35678:case 36198:case 36298:case 36306:case 35682:return Ww;case 35679:case 36299:case 36307:return jw;case 35680:case 36300:case 36308:case 36293:return Xw;case 36289:case 36303:case 36311:case 36292:return $w}}class qw{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Cw(t.type)}}class Kw{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Yw(t.type)}}class Jw{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const o=this.seq;for(let l=0,d=o.length;l!==d;++l){const c=o[l];c.setValue(e,t[c.id],i)}}}const Od=/(\w+)(\])?(\[|\.)?/g;function Ag(s,e){s.seq.push(e),s.map[e.id]=e}function Zw(s,e,t){const i=s.name,o=i.length;for(Od.lastIndex=0;;){const l=Od.exec(i),d=Od.lastIndex;let c=l[1];const f=l[2]==="]",h=l[3];if(f&&(c=c|0),h===void 0||h==="["&&d+2===o){Ag(t,h===void 0?new qw(c,s,e):new Kw(c,s,e));break}else{let g=t.map[c];g===void 0&&(g=new Jw(c),Ag(t,g)),t=g}}}class Ql{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){const l=e.getActiveUniform(t,o),d=e.getUniformLocation(t,l.name);Zw(l,d,this)}}setValue(e,t,i,o){const l=this.map[t];l!==void 0&&l.setValue(e,i,o)}setOptional(e,t,i){const o=t[i];o!==void 0&&this.setValue(e,i,o)}static upload(e,t,i,o){for(let l=0,d=t.length;l!==d;++l){const c=t[l],f=i[c.id];f.needsUpdate!==!1&&c.setValue(e,f.value,o)}}static seqWithValue(e,t){const i=[];for(let o=0,l=e.length;o!==l;++o){const d=e[o];d.id in t&&i.push(d)}return i}}function Cg(s,e,t){const i=s.createShader(e);return s.shaderSource(i,t),s.compileShader(i),i}const Qw=37297;let eT=0;function tT(s,e){const t=s.split(`
`),i=[],o=Math.max(e-6,0),l=Math.min(e+6,t.length);for(let d=o;d<l;d++){const c=d+1;i.push(`${c===e?">":" "} ${c}: ${t[d]}`)}return i.join(`
`)}function nT(s){const e=Lt.getPrimaries(Lt.workingColorSpace),t=Lt.getPrimaries(s);let i;switch(e===t?i="":e===oc&&t===sc?i="LinearDisplayP3ToLinearSRGB":e===sc&&t===oc&&(i="LinearSRGBToLinearDisplayP3"),s){case Xi:case yc:return[i,"LinearTransferOETF"];case dn:case vf:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",s),[i,"LinearTransferOETF"]}}function Rg(s,e,t){const i=s.getShaderParameter(e,s.COMPILE_STATUS),o=s.getShaderInfoLog(e).trim();if(i&&o==="")return"";const l=/ERROR: 0:(\d+)/.exec(o);if(l){const d=parseInt(l[1]);return t.toUpperCase()+`

`+o+`

`+tT(s.getShaderSource(e),d)}else return o}function iT(s,e){const t=nT(e);return`vec4 ${s}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function rT(s,e){let t;switch(e){case iS:t="Linear";break;case rS:t="Reinhard";break;case sS:t="OptimizedCineon";break;case Cv:t="ACESFilmic";break;case aS:t="AgX";break;case oS:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function sT(s){return[s.extensionDerivatives||s.envMapCubeUVHeight||s.bumpMap||s.normalMapTangentSpace||s.clearcoatNormalMap||s.flatShading||s.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(s.extensionFragDepth||s.logarithmicDepthBuffer)&&s.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",s.extensionDrawBuffers&&s.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(s.extensionShaderTextureLOD||s.envMap||s.transmission)&&s.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(to).join(`
`)}function oT(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(to).join(`
`)}function aT(s){const e=[];for(const t in s){const i=s[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function lT(s,e){const t={},i=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let o=0;o<i;o++){const l=s.getActiveAttrib(e,o),d=l.name;let c=1;l.type===s.FLOAT_MAT2&&(c=2),l.type===s.FLOAT_MAT3&&(c=3),l.type===s.FLOAT_MAT4&&(c=4),t[d]={type:l.type,location:s.getAttribLocation(e,d),locationSize:c}}return t}function to(s){return s!==""}function Pg(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Lg(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const cT=/^[ \t]*#include +<([\w\d./]+)>/gm;function of(s){return s.replace(cT,dT)}const uT=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function dT(s,e){let t=_t[e];if(t===void 0){const i=uT.get(e);if(i!==void 0)t=_t[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return of(t)}const fT=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ng(s){return s.replace(fT,hT)}function hT(s,e,t,i){let o="";for(let l=parseInt(e);l<parseInt(t);l++)o+=i.replace(/\[\s*i\s*\]/g,"[ "+l+" ]").replace(/UNROLLED_LOOP_INDEX/g,l);return o}function Dg(s){let e="precision "+s.precision+` float;
precision `+s.precision+" int;";return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function pT(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Tv?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===bv?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Wi&&(e="SHADOWMAP_TYPE_VSM"),e}function mT(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case ao:case lo:e="ENVMAP_TYPE_CUBE";break;case _c:e="ENVMAP_TYPE_CUBE_UV";break}return e}function gT(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case lo:e="ENVMAP_MODE_REFRACTION";break}return e}function vT(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Av:e="ENVMAP_BLENDING_MULTIPLY";break;case tS:e="ENVMAP_BLENDING_MIX";break;case nS:e="ENVMAP_BLENDING_ADD";break}return e}function xT(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function _T(s,e,t,i){const o=s.getContext(),l=t.defines;let d=t.vertexShader,c=t.fragmentShader;const f=pT(t),h=mT(t),p=gT(t),g=vT(t),y=xT(t),S=t.isWebGL2?"":sT(t),E=oT(t),M=aT(l),x=o.createProgram();let v,b,A=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(v=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M].filter(to).join(`
`),v.length>0&&(v+=`
`),b=[S,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M].filter(to).join(`
`),b.length>0&&(b+=`
`)):(v=[Dg(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+p:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+f:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(to).join(`
`),b=[S,Dg(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.envMap?"#define "+p:"",t.envMap?"#define "+g:"",y?"#define CUBEUV_TEXEL_WIDTH "+y.texelWidth:"",y?"#define CUBEUV_TEXEL_HEIGHT "+y.texelHeight:"",y?"#define CUBEUV_MAX_MIP "+y.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+f:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Rr?"#define TONE_MAPPING":"",t.toneMapping!==Rr?_t.tonemapping_pars_fragment:"",t.toneMapping!==Rr?rT("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",_t.colorspace_pars_fragment,iT("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(to).join(`
`)),d=of(d),d=Pg(d,t),d=Lg(d,t),c=of(c),c=Pg(c,t),c=Lg(c,t),d=Ng(d),c=Ng(c),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(A=`#version 300 es
`,v=[E,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+v,b=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===Zm?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Zm?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+b);const P=A+v+d,z=A+b+c,D=Cg(o,o.VERTEX_SHADER,P),I=Cg(o,o.FRAGMENT_SHADER,z);o.attachShader(x,D),o.attachShader(x,I),t.index0AttributeName!==void 0?o.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&o.bindAttribLocation(x,0,"position"),o.linkProgram(x);function ne(le){if(s.debug.checkShaderErrors){const ge=o.getProgramInfoLog(x).trim(),V=o.getShaderInfoLog(D).trim(),J=o.getShaderInfoLog(I).trim();let te=!0,q=!0;if(o.getProgramParameter(x,o.LINK_STATUS)===!1)if(te=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(o,x,D,I);else{const X=Rg(o,D,"vertex"),K=Rg(o,I,"fragment");console.error("THREE.WebGLProgram: Shader Error "+o.getError()+" - VALIDATE_STATUS "+o.getProgramParameter(x,o.VALIDATE_STATUS)+`

Program Info Log: `+ge+`
`+X+`
`+K)}else ge!==""?console.warn("THREE.WebGLProgram: Program Info Log:",ge):(V===""||J==="")&&(q=!1);q&&(le.diagnostics={runnable:te,programLog:ge,vertexShader:{log:V,prefix:v},fragmentShader:{log:J,prefix:b}})}o.deleteShader(D),o.deleteShader(I),R=new Ql(o,x),U=lT(o,x)}let R;this.getUniforms=function(){return R===void 0&&ne(this),R};let U;this.getAttributes=function(){return U===void 0&&ne(this),U};let se=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return se===!1&&(se=o.getProgramParameter(x,Qw)),se},this.destroy=function(){i.releaseStatesOfProgram(this),o.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=eT++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=D,this.fragmentShader=I,this}let yT=0;class ST{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,o=this._getShaderStage(t),l=this._getShaderStage(i),d=this._getShaderCacheForMaterial(e);return d.has(o)===!1&&(d.add(o),o.usedTimes++),d.has(l)===!1&&(d.add(l),l.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new MT(e),t.set(e,i)),i}}class MT{constructor(e){this.id=yT++,this.code=e,this.usedTimes=0}}function ET(s,e,t,i,o,l,d){const c=new Wv,f=new ST,h=[],p=o.isWebGL2,g=o.logarithmicDepthBuffer,y=o.vertexTextures;let S=o.precision;const E={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function M(R){return R===0?"uv":`uv${R}`}function x(R,U,se,le,ge){const V=le.fog,J=ge.geometry,te=R.isMeshStandardMaterial?le.environment:null,q=(R.isMeshStandardMaterial?t:e).get(R.envMap||te),X=q&&q.mapping===_c?q.image.height:null,K=E[R.type];R.precision!==null&&(S=o.getMaxPrecision(R.precision),S!==R.precision&&console.warn("THREE.WebGLProgram.getParameters:",R.precision,"not supported, using",S,"instead."));const Y=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,O=Y!==void 0?Y.length:0;let F=0;J.morphAttributes.position!==void 0&&(F=1),J.morphAttributes.normal!==void 0&&(F=2),J.morphAttributes.color!==void 0&&(F=3);let j,ce,me,ye;if(K){const Tt=Ei[K];j=Tt.vertexShader,ce=Tt.fragmentShader}else j=R.vertexShader,ce=R.fragmentShader,f.update(R),me=f.getVertexShaderID(R),ye=f.getFragmentShaderID(R);const Se=s.getRenderTarget(),Fe=ge.isInstancedMesh===!0,ve=ge.isBatchedMesh===!0,Ae=!!R.map,ze=!!R.matcap,Q=!!q,nt=!!R.aoMap,ke=!!R.lightMap,Qe=!!R.bumpMap,Ve=!!R.normalMap,wt=!!R.displacementMap,ot=!!R.emissiveMap,L=!!R.metalnessMap,C=!!R.roughnessMap,oe=R.anisotropy>0,we=R.clearcoat>0,Me=R.iridescence>0,be=R.sheen>0,Je=R.transmission>0,Ie=oe&&!!R.anisotropyMap,He=we&&!!R.clearcoatMap,qe=we&&!!R.clearcoatNormalMap,rt=we&&!!R.clearcoatRoughnessMap,xe=Me&&!!R.iridescenceMap,mt=Me&&!!R.iridescenceThicknessMap,H=be&&!!R.sheenColorMap,_e=be&&!!R.sheenRoughnessMap,Ue=!!R.specularMap,Re=!!R.specularColorMap,$e=!!R.specularIntensityMap,dt=Je&&!!R.transmissionMap,gt=Je&&!!R.thicknessMap,st=!!R.gradientMap,Le=!!R.alphaMap,G=R.alphaTest>0,Pe=!!R.alphaHash,Ne=!!R.extensions,ae=!!J.attributes.uv1,pe=!!J.attributes.uv2,tt=!!J.attributes.uv3;let je=Rr;return R.toneMapped&&(Se===null||Se.isXRRenderTarget===!0)&&(je=s.toneMapping),{isWebGL2:p,shaderID:K,shaderType:R.type,shaderName:R.name,vertexShader:j,fragmentShader:ce,defines:R.defines,customVertexShaderID:me,customFragmentShaderID:ye,isRawShaderMaterial:R.isRawShaderMaterial===!0,glslVersion:R.glslVersion,precision:S,batching:ve,instancing:Fe,instancingColor:Fe&&ge.instanceColor!==null,supportsVertexTextures:y,outputColorSpace:Se===null?s.outputColorSpace:Se.isXRRenderTarget===!0?Se.texture.colorSpace:Xi,map:Ae,matcap:ze,envMap:Q,envMapMode:Q&&q.mapping,envMapCubeUVHeight:X,aoMap:nt,lightMap:ke,bumpMap:Qe,normalMap:Ve,displacementMap:y&&wt,emissiveMap:ot,normalMapObjectSpace:Ve&&R.normalMapType===_S,normalMapTangentSpace:Ve&&R.normalMapType===kv,metalnessMap:L,roughnessMap:C,anisotropy:oe,anisotropyMap:Ie,clearcoat:we,clearcoatMap:He,clearcoatNormalMap:qe,clearcoatRoughnessMap:rt,iridescence:Me,iridescenceMap:xe,iridescenceThicknessMap:mt,sheen:be,sheenColorMap:H,sheenRoughnessMap:_e,specularMap:Ue,specularColorMap:Re,specularIntensityMap:$e,transmission:Je,transmissionMap:dt,thicknessMap:gt,gradientMap:st,opaque:R.transparent===!1&&R.blending===no,alphaMap:Le,alphaTest:G,alphaHash:Pe,combine:R.combine,mapUv:Ae&&M(R.map.channel),aoMapUv:nt&&M(R.aoMap.channel),lightMapUv:ke&&M(R.lightMap.channel),bumpMapUv:Qe&&M(R.bumpMap.channel),normalMapUv:Ve&&M(R.normalMap.channel),displacementMapUv:wt&&M(R.displacementMap.channel),emissiveMapUv:ot&&M(R.emissiveMap.channel),metalnessMapUv:L&&M(R.metalnessMap.channel),roughnessMapUv:C&&M(R.roughnessMap.channel),anisotropyMapUv:Ie&&M(R.anisotropyMap.channel),clearcoatMapUv:He&&M(R.clearcoatMap.channel),clearcoatNormalMapUv:qe&&M(R.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:rt&&M(R.clearcoatRoughnessMap.channel),iridescenceMapUv:xe&&M(R.iridescenceMap.channel),iridescenceThicknessMapUv:mt&&M(R.iridescenceThicknessMap.channel),sheenColorMapUv:H&&M(R.sheenColorMap.channel),sheenRoughnessMapUv:_e&&M(R.sheenRoughnessMap.channel),specularMapUv:Ue&&M(R.specularMap.channel),specularColorMapUv:Re&&M(R.specularColorMap.channel),specularIntensityMapUv:$e&&M(R.specularIntensityMap.channel),transmissionMapUv:dt&&M(R.transmissionMap.channel),thicknessMapUv:gt&&M(R.thicknessMap.channel),alphaMapUv:Le&&M(R.alphaMap.channel),vertexTangents:!!J.attributes.tangent&&(Ve||oe),vertexColors:R.vertexColors,vertexAlphas:R.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,vertexUv1s:ae,vertexUv2s:pe,vertexUv3s:tt,pointsUvs:ge.isPoints===!0&&!!J.attributes.uv&&(Ae||Le),fog:!!V,useFog:R.fog===!0,fogExp2:V&&V.isFogExp2,flatShading:R.flatShading===!0,sizeAttenuation:R.sizeAttenuation===!0,logarithmicDepthBuffer:g,skinning:ge.isSkinnedMesh===!0,morphTargets:J.morphAttributes.position!==void 0,morphNormals:J.morphAttributes.normal!==void 0,morphColors:J.morphAttributes.color!==void 0,morphTargetsCount:O,morphTextureStride:F,numDirLights:U.directional.length,numPointLights:U.point.length,numSpotLights:U.spot.length,numSpotLightMaps:U.spotLightMap.length,numRectAreaLights:U.rectArea.length,numHemiLights:U.hemi.length,numDirLightShadows:U.directionalShadowMap.length,numPointLightShadows:U.pointShadowMap.length,numSpotLightShadows:U.spotShadowMap.length,numSpotLightShadowsWithMaps:U.numSpotLightShadowsWithMaps,numLightProbes:U.numLightProbes,numClippingPlanes:d.numPlanes,numClipIntersection:d.numIntersection,dithering:R.dithering,shadowMapEnabled:s.shadowMap.enabled&&se.length>0,shadowMapType:s.shadowMap.type,toneMapping:je,useLegacyLights:s._useLegacyLights,decodeVideoTexture:Ae&&R.map.isVideoTexture===!0&&Lt.getTransfer(R.map.colorSpace)===Ot,premultipliedAlpha:R.premultipliedAlpha,doubleSided:R.side===wi,flipSided:R.side===Rn,useDepthPacking:R.depthPacking>=0,depthPacking:R.depthPacking||0,index0AttributeName:R.index0AttributeName,extensionDerivatives:Ne&&R.extensions.derivatives===!0,extensionFragDepth:Ne&&R.extensions.fragDepth===!0,extensionDrawBuffers:Ne&&R.extensions.drawBuffers===!0,extensionShaderTextureLOD:Ne&&R.extensions.shaderTextureLOD===!0,extensionClipCullDistance:Ne&&R.extensions.clipCullDistance&&i.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:p||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:p||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:p||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:R.customProgramCacheKey()}}function v(R){const U=[];if(R.shaderID?U.push(R.shaderID):(U.push(R.customVertexShaderID),U.push(R.customFragmentShaderID)),R.defines!==void 0)for(const se in R.defines)U.push(se),U.push(R.defines[se]);return R.isRawShaderMaterial===!1&&(b(U,R),A(U,R),U.push(s.outputColorSpace)),U.push(R.customProgramCacheKey),U.join()}function b(R,U){R.push(U.precision),R.push(U.outputColorSpace),R.push(U.envMapMode),R.push(U.envMapCubeUVHeight),R.push(U.mapUv),R.push(U.alphaMapUv),R.push(U.lightMapUv),R.push(U.aoMapUv),R.push(U.bumpMapUv),R.push(U.normalMapUv),R.push(U.displacementMapUv),R.push(U.emissiveMapUv),R.push(U.metalnessMapUv),R.push(U.roughnessMapUv),R.push(U.anisotropyMapUv),R.push(U.clearcoatMapUv),R.push(U.clearcoatNormalMapUv),R.push(U.clearcoatRoughnessMapUv),R.push(U.iridescenceMapUv),R.push(U.iridescenceThicknessMapUv),R.push(U.sheenColorMapUv),R.push(U.sheenRoughnessMapUv),R.push(U.specularMapUv),R.push(U.specularColorMapUv),R.push(U.specularIntensityMapUv),R.push(U.transmissionMapUv),R.push(U.thicknessMapUv),R.push(U.combine),R.push(U.fogExp2),R.push(U.sizeAttenuation),R.push(U.morphTargetsCount),R.push(U.morphAttributeCount),R.push(U.numDirLights),R.push(U.numPointLights),R.push(U.numSpotLights),R.push(U.numSpotLightMaps),R.push(U.numHemiLights),R.push(U.numRectAreaLights),R.push(U.numDirLightShadows),R.push(U.numPointLightShadows),R.push(U.numSpotLightShadows),R.push(U.numSpotLightShadowsWithMaps),R.push(U.numLightProbes),R.push(U.shadowMapType),R.push(U.toneMapping),R.push(U.numClippingPlanes),R.push(U.numClipIntersection),R.push(U.depthPacking)}function A(R,U){c.disableAll(),U.isWebGL2&&c.enable(0),U.supportsVertexTextures&&c.enable(1),U.instancing&&c.enable(2),U.instancingColor&&c.enable(3),U.matcap&&c.enable(4),U.envMap&&c.enable(5),U.normalMapObjectSpace&&c.enable(6),U.normalMapTangentSpace&&c.enable(7),U.clearcoat&&c.enable(8),U.iridescence&&c.enable(9),U.alphaTest&&c.enable(10),U.vertexColors&&c.enable(11),U.vertexAlphas&&c.enable(12),U.vertexUv1s&&c.enable(13),U.vertexUv2s&&c.enable(14),U.vertexUv3s&&c.enable(15),U.vertexTangents&&c.enable(16),U.anisotropy&&c.enable(17),U.alphaHash&&c.enable(18),U.batching&&c.enable(19),R.push(c.mask),c.disableAll(),U.fog&&c.enable(0),U.useFog&&c.enable(1),U.flatShading&&c.enable(2),U.logarithmicDepthBuffer&&c.enable(3),U.skinning&&c.enable(4),U.morphTargets&&c.enable(5),U.morphNormals&&c.enable(6),U.morphColors&&c.enable(7),U.premultipliedAlpha&&c.enable(8),U.shadowMapEnabled&&c.enable(9),U.useLegacyLights&&c.enable(10),U.doubleSided&&c.enable(11),U.flipSided&&c.enable(12),U.useDepthPacking&&c.enable(13),U.dithering&&c.enable(14),U.transmission&&c.enable(15),U.sheen&&c.enable(16),U.opaque&&c.enable(17),U.pointsUvs&&c.enable(18),U.decodeVideoTexture&&c.enable(19),R.push(c.mask)}function P(R){const U=E[R.type];let se;if(U){const le=Ei[U];se=sM.clone(le.uniforms)}else se=R.uniforms;return se}function z(R,U){let se;for(let le=0,ge=h.length;le<ge;le++){const V=h[le];if(V.cacheKey===U){se=V,++se.usedTimes;break}}return se===void 0&&(se=new _T(s,U,R,l),h.push(se)),se}function D(R){if(--R.usedTimes===0){const U=h.indexOf(R);h[U]=h[h.length-1],h.pop(),R.destroy()}}function I(R){f.remove(R)}function ne(){f.dispose()}return{getParameters:x,getProgramCacheKey:v,getUniforms:P,acquireProgram:z,releaseProgram:D,releaseShaderCache:I,programs:h,dispose:ne}}function wT(){let s=new WeakMap;function e(l){let d=s.get(l);return d===void 0&&(d={},s.set(l,d)),d}function t(l){s.delete(l)}function i(l,d,c){s.get(l)[d]=c}function o(){s=new WeakMap}return{get:e,remove:t,update:i,dispose:o}}function TT(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function Ug(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function Ig(){const s=[];let e=0;const t=[],i=[],o=[];function l(){e=0,t.length=0,i.length=0,o.length=0}function d(g,y,S,E,M,x){let v=s[e];return v===void 0?(v={id:g.id,object:g,geometry:y,material:S,groupOrder:E,renderOrder:g.renderOrder,z:M,group:x},s[e]=v):(v.id=g.id,v.object=g,v.geometry=y,v.material=S,v.groupOrder=E,v.renderOrder=g.renderOrder,v.z=M,v.group=x),e++,v}function c(g,y,S,E,M,x){const v=d(g,y,S,E,M,x);S.transmission>0?i.push(v):S.transparent===!0?o.push(v):t.push(v)}function f(g,y,S,E,M,x){const v=d(g,y,S,E,M,x);S.transmission>0?i.unshift(v):S.transparent===!0?o.unshift(v):t.unshift(v)}function h(g,y){t.length>1&&t.sort(g||TT),i.length>1&&i.sort(y||Ug),o.length>1&&o.sort(y||Ug)}function p(){for(let g=e,y=s.length;g<y;g++){const S=s[g];if(S.id===null)break;S.id=null,S.object=null,S.geometry=null,S.material=null,S.group=null}}return{opaque:t,transmissive:i,transparent:o,init:l,push:c,unshift:f,finish:p,sort:h}}function bT(){let s=new WeakMap;function e(i,o){const l=s.get(i);let d;return l===void 0?(d=new Ig,s.set(i,[d])):o>=l.length?(d=new Ig,l.push(d)):d=l[o],d}function t(){s=new WeakMap}return{get:e,dispose:t}}function AT(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new B,color:new Et};break;case"SpotLight":t={position:new B,direction:new B,color:new Et,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new B,color:new Et,distance:0,decay:0};break;case"HemisphereLight":t={direction:new B,skyColor:new Et,groundColor:new Et};break;case"RectAreaLight":t={color:new Et,position:new B,halfWidth:new B,halfHeight:new B};break}return s[e.id]=t,t}}}function CT(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Be};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Be};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Be,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let RT=0;function PT(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function LT(s,e){const t=new AT,i=CT(),o={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let p=0;p<9;p++)o.probe.push(new B);const l=new B,d=new Ht,c=new Ht;function f(p,g){let y=0,S=0,E=0;for(let le=0;le<9;le++)o.probe[le].set(0,0,0);let M=0,x=0,v=0,b=0,A=0,P=0,z=0,D=0,I=0,ne=0,R=0;p.sort(PT);const U=g===!0?Math.PI:1;for(let le=0,ge=p.length;le<ge;le++){const V=p[le],J=V.color,te=V.intensity,q=V.distance,X=V.shadow&&V.shadow.map?V.shadow.map.texture:null;if(V.isAmbientLight)y+=J.r*te*U,S+=J.g*te*U,E+=J.b*te*U;else if(V.isLightProbe){for(let K=0;K<9;K++)o.probe[K].addScaledVector(V.sh.coefficients[K],te);R++}else if(V.isDirectionalLight){const K=t.get(V);if(K.color.copy(V.color).multiplyScalar(V.intensity*U),V.castShadow){const Y=V.shadow,O=i.get(V);O.shadowBias=Y.bias,O.shadowNormalBias=Y.normalBias,O.shadowRadius=Y.radius,O.shadowMapSize=Y.mapSize,o.directionalShadow[M]=O,o.directionalShadowMap[M]=X,o.directionalShadowMatrix[M]=V.shadow.matrix,P++}o.directional[M]=K,M++}else if(V.isSpotLight){const K=t.get(V);K.position.setFromMatrixPosition(V.matrixWorld),K.color.copy(J).multiplyScalar(te*U),K.distance=q,K.coneCos=Math.cos(V.angle),K.penumbraCos=Math.cos(V.angle*(1-V.penumbra)),K.decay=V.decay,o.spot[v]=K;const Y=V.shadow;if(V.map&&(o.spotLightMap[I]=V.map,I++,Y.updateMatrices(V),V.castShadow&&ne++),o.spotLightMatrix[v]=Y.matrix,V.castShadow){const O=i.get(V);O.shadowBias=Y.bias,O.shadowNormalBias=Y.normalBias,O.shadowRadius=Y.radius,O.shadowMapSize=Y.mapSize,o.spotShadow[v]=O,o.spotShadowMap[v]=X,D++}v++}else if(V.isRectAreaLight){const K=t.get(V);K.color.copy(J).multiplyScalar(te),K.halfWidth.set(V.width*.5,0,0),K.halfHeight.set(0,V.height*.5,0),o.rectArea[b]=K,b++}else if(V.isPointLight){const K=t.get(V);if(K.color.copy(V.color).multiplyScalar(V.intensity*U),K.distance=V.distance,K.decay=V.decay,V.castShadow){const Y=V.shadow,O=i.get(V);O.shadowBias=Y.bias,O.shadowNormalBias=Y.normalBias,O.shadowRadius=Y.radius,O.shadowMapSize=Y.mapSize,O.shadowCameraNear=Y.camera.near,O.shadowCameraFar=Y.camera.far,o.pointShadow[x]=O,o.pointShadowMap[x]=X,o.pointShadowMatrix[x]=V.shadow.matrix,z++}o.point[x]=K,x++}else if(V.isHemisphereLight){const K=t.get(V);K.skyColor.copy(V.color).multiplyScalar(te*U),K.groundColor.copy(V.groundColor).multiplyScalar(te*U),o.hemi[A]=K,A++}}b>0&&(e.isWebGL2?s.has("OES_texture_float_linear")===!0?(o.rectAreaLTC1=Oe.LTC_FLOAT_1,o.rectAreaLTC2=Oe.LTC_FLOAT_2):(o.rectAreaLTC1=Oe.LTC_HALF_1,o.rectAreaLTC2=Oe.LTC_HALF_2):s.has("OES_texture_float_linear")===!0?(o.rectAreaLTC1=Oe.LTC_FLOAT_1,o.rectAreaLTC2=Oe.LTC_FLOAT_2):s.has("OES_texture_half_float_linear")===!0?(o.rectAreaLTC1=Oe.LTC_HALF_1,o.rectAreaLTC2=Oe.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),o.ambient[0]=y,o.ambient[1]=S,o.ambient[2]=E;const se=o.hash;(se.directionalLength!==M||se.pointLength!==x||se.spotLength!==v||se.rectAreaLength!==b||se.hemiLength!==A||se.numDirectionalShadows!==P||se.numPointShadows!==z||se.numSpotShadows!==D||se.numSpotMaps!==I||se.numLightProbes!==R)&&(o.directional.length=M,o.spot.length=v,o.rectArea.length=b,o.point.length=x,o.hemi.length=A,o.directionalShadow.length=P,o.directionalShadowMap.length=P,o.pointShadow.length=z,o.pointShadowMap.length=z,o.spotShadow.length=D,o.spotShadowMap.length=D,o.directionalShadowMatrix.length=P,o.pointShadowMatrix.length=z,o.spotLightMatrix.length=D+I-ne,o.spotLightMap.length=I,o.numSpotLightShadowsWithMaps=ne,o.numLightProbes=R,se.directionalLength=M,se.pointLength=x,se.spotLength=v,se.rectAreaLength=b,se.hemiLength=A,se.numDirectionalShadows=P,se.numPointShadows=z,se.numSpotShadows=D,se.numSpotMaps=I,se.numLightProbes=R,o.version=RT++)}function h(p,g){let y=0,S=0,E=0,M=0,x=0;const v=g.matrixWorldInverse;for(let b=0,A=p.length;b<A;b++){const P=p[b];if(P.isDirectionalLight){const z=o.directional[y];z.direction.setFromMatrixPosition(P.matrixWorld),l.setFromMatrixPosition(P.target.matrixWorld),z.direction.sub(l),z.direction.transformDirection(v),y++}else if(P.isSpotLight){const z=o.spot[E];z.position.setFromMatrixPosition(P.matrixWorld),z.position.applyMatrix4(v),z.direction.setFromMatrixPosition(P.matrixWorld),l.setFromMatrixPosition(P.target.matrixWorld),z.direction.sub(l),z.direction.transformDirection(v),E++}else if(P.isRectAreaLight){const z=o.rectArea[M];z.position.setFromMatrixPosition(P.matrixWorld),z.position.applyMatrix4(v),c.identity(),d.copy(P.matrixWorld),d.premultiply(v),c.extractRotation(d),z.halfWidth.set(P.width*.5,0,0),z.halfHeight.set(0,P.height*.5,0),z.halfWidth.applyMatrix4(c),z.halfHeight.applyMatrix4(c),M++}else if(P.isPointLight){const z=o.point[S];z.position.setFromMatrixPosition(P.matrixWorld),z.position.applyMatrix4(v),S++}else if(P.isHemisphereLight){const z=o.hemi[x];z.direction.setFromMatrixPosition(P.matrixWorld),z.direction.transformDirection(v),x++}}}return{setup:f,setupView:h,state:o}}function Og(s,e){const t=new LT(s,e),i=[],o=[];function l(){i.length=0,o.length=0}function d(g){i.push(g)}function c(g){o.push(g)}function f(g){t.setup(i,g)}function h(g){t.setupView(i,g)}return{init:l,state:{lightsArray:i,shadowsArray:o,lights:t},setupLights:f,setupLightsView:h,pushLight:d,pushShadow:c}}function NT(s,e){let t=new WeakMap;function i(l,d=0){const c=t.get(l);let f;return c===void 0?(f=new Og(s,e),t.set(l,[f])):d>=c.length?(f=new Og(s,e),c.push(f)):f=c[d],f}function o(){t=new WeakMap}return{get:i,dispose:o}}class DT extends go{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=vS,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class UT extends go{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const IT=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,OT=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function FT(s,e,t){let i=new yf;const o=new Be,l=new Be,d=new Bt,c=new DT({depthPacking:xS}),f=new UT,h={},p=t.maxTextureSize,g={[Dr]:Rn,[Rn]:Dr,[wi]:wi},y=new ls({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Be},radius:{value:4}},vertexShader:IT,fragmentShader:OT}),S=y.clone();S.defines.HORIZONTAL_PASS=1;const E=new Sn;E.setAttribute("position",new Yn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const M=new Rt(E,y),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Tv;let v=this.type;this.render=function(D,I,ne){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||D.length===0)return;const R=s.getRenderTarget(),U=s.getActiveCubeFace(),se=s.getActiveMipmapLevel(),le=s.state;le.setBlending(Cr),le.buffers.color.setClear(1,1,1,1),le.buffers.depth.setTest(!0),le.setScissorTest(!1);const ge=v!==Wi&&this.type===Wi,V=v===Wi&&this.type!==Wi;for(let J=0,te=D.length;J<te;J++){const q=D[J],X=q.shadow;if(X===void 0){console.warn("THREE.WebGLShadowMap:",q,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;o.copy(X.mapSize);const K=X.getFrameExtents();if(o.multiply(K),l.copy(X.mapSize),(o.x>p||o.y>p)&&(o.x>p&&(l.x=Math.floor(p/K.x),o.x=l.x*K.x,X.mapSize.x=l.x),o.y>p&&(l.y=Math.floor(p/K.y),o.y=l.y*K.y,X.mapSize.y=l.y)),X.map===null||ge===!0||V===!0){const O=this.type!==Wi?{minFilter:Cn,magFilter:Cn}:{};X.map!==null&&X.map.dispose(),X.map=new as(o.x,o.y,O),X.map.texture.name=q.name+".shadowMap",X.camera.updateProjectionMatrix()}s.setRenderTarget(X.map),s.clear();const Y=X.getViewportCount();for(let O=0;O<Y;O++){const F=X.getViewport(O);d.set(l.x*F.x,l.y*F.y,l.x*F.z,l.y*F.w),le.viewport(d),X.updateMatrices(q,O),i=X.getFrustum(),P(I,ne,X.camera,q,this.type)}X.isPointLightShadow!==!0&&this.type===Wi&&b(X,ne),X.needsUpdate=!1}v=this.type,x.needsUpdate=!1,s.setRenderTarget(R,U,se)};function b(D,I){const ne=e.update(M);y.defines.VSM_SAMPLES!==D.blurSamples&&(y.defines.VSM_SAMPLES=D.blurSamples,S.defines.VSM_SAMPLES=D.blurSamples,y.needsUpdate=!0,S.needsUpdate=!0),D.mapPass===null&&(D.mapPass=new as(o.x,o.y)),y.uniforms.shadow_pass.value=D.map.texture,y.uniforms.resolution.value=D.mapSize,y.uniforms.radius.value=D.radius,s.setRenderTarget(D.mapPass),s.clear(),s.renderBufferDirect(I,null,ne,y,M,null),S.uniforms.shadow_pass.value=D.mapPass.texture,S.uniforms.resolution.value=D.mapSize,S.uniforms.radius.value=D.radius,s.setRenderTarget(D.map),s.clear(),s.renderBufferDirect(I,null,ne,S,M,null)}function A(D,I,ne,R){let U=null;const se=ne.isPointLight===!0?D.customDistanceMaterial:D.customDepthMaterial;if(se!==void 0)U=se;else if(U=ne.isPointLight===!0?f:c,s.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0){const le=U.uuid,ge=I.uuid;let V=h[le];V===void 0&&(V={},h[le]=V);let J=V[ge];J===void 0&&(J=U.clone(),V[ge]=J,I.addEventListener("dispose",z)),U=J}if(U.visible=I.visible,U.wireframe=I.wireframe,R===Wi?U.side=I.shadowSide!==null?I.shadowSide:I.side:U.side=I.shadowSide!==null?I.shadowSide:g[I.side],U.alphaMap=I.alphaMap,U.alphaTest=I.alphaTest,U.map=I.map,U.clipShadows=I.clipShadows,U.clippingPlanes=I.clippingPlanes,U.clipIntersection=I.clipIntersection,U.displacementMap=I.displacementMap,U.displacementScale=I.displacementScale,U.displacementBias=I.displacementBias,U.wireframeLinewidth=I.wireframeLinewidth,U.linewidth=I.linewidth,ne.isPointLight===!0&&U.isMeshDistanceMaterial===!0){const le=s.properties.get(U);le.light=ne}return U}function P(D,I,ne,R,U){if(D.visible===!1)return;if(D.layers.test(I.layers)&&(D.isMesh||D.isLine||D.isPoints)&&(D.castShadow||D.receiveShadow&&U===Wi)&&(!D.frustumCulled||i.intersectsObject(D))){D.modelViewMatrix.multiplyMatrices(ne.matrixWorldInverse,D.matrixWorld);const ge=e.update(D),V=D.material;if(Array.isArray(V)){const J=ge.groups;for(let te=0,q=J.length;te<q;te++){const X=J[te],K=V[X.materialIndex];if(K&&K.visible){const Y=A(D,K,R,U);D.onBeforeShadow(s,D,I,ne,ge,Y,X),s.renderBufferDirect(ne,null,ge,Y,D,X),D.onAfterShadow(s,D,I,ne,ge,Y,X)}}}else if(V.visible){const J=A(D,V,R,U);D.onBeforeShadow(s,D,I,ne,ge,J,null),s.renderBufferDirect(ne,null,ge,J,D,null),D.onAfterShadow(s,D,I,ne,ge,J,null)}}const le=D.children;for(let ge=0,V=le.length;ge<V;ge++)P(le[ge],I,ne,R,U)}function z(D){D.target.removeEventListener("dispose",z);for(const ne in h){const R=h[ne],U=D.target.uuid;U in R&&(R[U].dispose(),delete R[U])}}}function kT(s,e,t){const i=t.isWebGL2;function o(){let G=!1;const Pe=new Bt;let Ne=null;const ae=new Bt(0,0,0,0);return{setMask:function(pe){Ne!==pe&&!G&&(s.colorMask(pe,pe,pe,pe),Ne=pe)},setLocked:function(pe){G=pe},setClear:function(pe,tt,je,ht,Tt){Tt===!0&&(pe*=ht,tt*=ht,je*=ht),Pe.set(pe,tt,je,ht),ae.equals(Pe)===!1&&(s.clearColor(pe,tt,je,ht),ae.copy(Pe))},reset:function(){G=!1,Ne=null,ae.set(-1,0,0,0)}}}function l(){let G=!1,Pe=null,Ne=null,ae=null;return{setTest:function(pe){pe?ve(s.DEPTH_TEST):Ae(s.DEPTH_TEST)},setMask:function(pe){Pe!==pe&&!G&&(s.depthMask(pe),Pe=pe)},setFunc:function(pe){if(Ne!==pe){switch(pe){case Yy:s.depthFunc(s.NEVER);break;case qy:s.depthFunc(s.ALWAYS);break;case Ky:s.depthFunc(s.LESS);break;case nc:s.depthFunc(s.LEQUAL);break;case Jy:s.depthFunc(s.EQUAL);break;case Zy:s.depthFunc(s.GEQUAL);break;case Qy:s.depthFunc(s.GREATER);break;case eS:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}Ne=pe}},setLocked:function(pe){G=pe},setClear:function(pe){ae!==pe&&(s.clearDepth(pe),ae=pe)},reset:function(){G=!1,Pe=null,Ne=null,ae=null}}}function d(){let G=!1,Pe=null,Ne=null,ae=null,pe=null,tt=null,je=null,ht=null,Tt=null;return{setTest:function(yt){G||(yt?ve(s.STENCIL_TEST):Ae(s.STENCIL_TEST))},setMask:function(yt){Pe!==yt&&!G&&(s.stencilMask(yt),Pe=yt)},setFunc:function(yt,$t,pn){(Ne!==yt||ae!==$t||pe!==pn)&&(s.stencilFunc(yt,$t,pn),Ne=yt,ae=$t,pe=pn)},setOp:function(yt,$t,pn){(tt!==yt||je!==$t||ht!==pn)&&(s.stencilOp(yt,$t,pn),tt=yt,je=$t,ht=pn)},setLocked:function(yt){G=yt},setClear:function(yt){Tt!==yt&&(s.clearStencil(yt),Tt=yt)},reset:function(){G=!1,Pe=null,Ne=null,ae=null,pe=null,tt=null,je=null,ht=null,Tt=null}}}const c=new o,f=new l,h=new d,p=new WeakMap,g=new WeakMap;let y={},S={},E=new WeakMap,M=[],x=null,v=!1,b=null,A=null,P=null,z=null,D=null,I=null,ne=null,R=new Et(0,0,0),U=0,se=!1,le=null,ge=null,V=null,J=null,te=null;const q=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,K=0;const Y=s.getParameter(s.VERSION);Y.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(Y)[1]),X=K>=1):Y.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),X=K>=2);let O=null,F={};const j=s.getParameter(s.SCISSOR_BOX),ce=s.getParameter(s.VIEWPORT),me=new Bt().fromArray(j),ye=new Bt().fromArray(ce);function Se(G,Pe,Ne,ae){const pe=new Uint8Array(4),tt=s.createTexture();s.bindTexture(G,tt),s.texParameteri(G,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(G,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let je=0;je<Ne;je++)i&&(G===s.TEXTURE_3D||G===s.TEXTURE_2D_ARRAY)?s.texImage3D(Pe,0,s.RGBA,1,1,ae,0,s.RGBA,s.UNSIGNED_BYTE,pe):s.texImage2D(Pe+je,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,pe);return tt}const Fe={};Fe[s.TEXTURE_2D]=Se(s.TEXTURE_2D,s.TEXTURE_2D,1),Fe[s.TEXTURE_CUBE_MAP]=Se(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(Fe[s.TEXTURE_2D_ARRAY]=Se(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Fe[s.TEXTURE_3D]=Se(s.TEXTURE_3D,s.TEXTURE_3D,1,1)),c.setClear(0,0,0,1),f.setClear(1),h.setClear(0),ve(s.DEPTH_TEST),f.setFunc(nc),ot(!1),L(xm),ve(s.CULL_FACE),Ve(Cr);function ve(G){y[G]!==!0&&(s.enable(G),y[G]=!0)}function Ae(G){y[G]!==!1&&(s.disable(G),y[G]=!1)}function ze(G,Pe){return S[G]!==Pe?(s.bindFramebuffer(G,Pe),S[G]=Pe,i&&(G===s.DRAW_FRAMEBUFFER&&(S[s.FRAMEBUFFER]=Pe),G===s.FRAMEBUFFER&&(S[s.DRAW_FRAMEBUFFER]=Pe)),!0):!1}function Q(G,Pe){let Ne=M,ae=!1;if(G)if(Ne=E.get(Pe),Ne===void 0&&(Ne=[],E.set(Pe,Ne)),G.isWebGLMultipleRenderTargets){const pe=G.texture;if(Ne.length!==pe.length||Ne[0]!==s.COLOR_ATTACHMENT0){for(let tt=0,je=pe.length;tt<je;tt++)Ne[tt]=s.COLOR_ATTACHMENT0+tt;Ne.length=pe.length,ae=!0}}else Ne[0]!==s.COLOR_ATTACHMENT0&&(Ne[0]=s.COLOR_ATTACHMENT0,ae=!0);else Ne[0]!==s.BACK&&(Ne[0]=s.BACK,ae=!0);ae&&(t.isWebGL2?s.drawBuffers(Ne):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(Ne))}function nt(G){return x!==G?(s.useProgram(G),x=G,!0):!1}const ke={[es]:s.FUNC_ADD,[Dy]:s.FUNC_SUBTRACT,[Uy]:s.FUNC_REVERSE_SUBTRACT};if(i)ke[Mm]=s.MIN,ke[Em]=s.MAX;else{const G=e.get("EXT_blend_minmax");G!==null&&(ke[Mm]=G.MIN_EXT,ke[Em]=G.MAX_EXT)}const Qe={[Iy]:s.ZERO,[Oy]:s.ONE,[Fy]:s.SRC_COLOR,[Jd]:s.SRC_ALPHA,[Gy]:s.SRC_ALPHA_SATURATE,[Hy]:s.DST_COLOR,[zy]:s.DST_ALPHA,[ky]:s.ONE_MINUS_SRC_COLOR,[Zd]:s.ONE_MINUS_SRC_ALPHA,[Vy]:s.ONE_MINUS_DST_COLOR,[By]:s.ONE_MINUS_DST_ALPHA,[Wy]:s.CONSTANT_COLOR,[jy]:s.ONE_MINUS_CONSTANT_COLOR,[Xy]:s.CONSTANT_ALPHA,[$y]:s.ONE_MINUS_CONSTANT_ALPHA};function Ve(G,Pe,Ne,ae,pe,tt,je,ht,Tt,yt){if(G===Cr){v===!0&&(Ae(s.BLEND),v=!1);return}if(v===!1&&(ve(s.BLEND),v=!0),G!==Ny){if(G!==b||yt!==se){if((A!==es||D!==es)&&(s.blendEquation(s.FUNC_ADD),A=es,D=es),yt)switch(G){case no:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case _m:s.blendFunc(s.ONE,s.ONE);break;case ym:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Sm:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",G);break}else switch(G){case no:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case _m:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case ym:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Sm:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",G);break}P=null,z=null,I=null,ne=null,R.set(0,0,0),U=0,b=G,se=yt}return}pe=pe||Pe,tt=tt||Ne,je=je||ae,(Pe!==A||pe!==D)&&(s.blendEquationSeparate(ke[Pe],ke[pe]),A=Pe,D=pe),(Ne!==P||ae!==z||tt!==I||je!==ne)&&(s.blendFuncSeparate(Qe[Ne],Qe[ae],Qe[tt],Qe[je]),P=Ne,z=ae,I=tt,ne=je),(ht.equals(R)===!1||Tt!==U)&&(s.blendColor(ht.r,ht.g,ht.b,Tt),R.copy(ht),U=Tt),b=G,se=!1}function wt(G,Pe){G.side===wi?Ae(s.CULL_FACE):ve(s.CULL_FACE);let Ne=G.side===Rn;Pe&&(Ne=!Ne),ot(Ne),G.blending===no&&G.transparent===!1?Ve(Cr):Ve(G.blending,G.blendEquation,G.blendSrc,G.blendDst,G.blendEquationAlpha,G.blendSrcAlpha,G.blendDstAlpha,G.blendColor,G.blendAlpha,G.premultipliedAlpha),f.setFunc(G.depthFunc),f.setTest(G.depthTest),f.setMask(G.depthWrite),c.setMask(G.colorWrite);const ae=G.stencilWrite;h.setTest(ae),ae&&(h.setMask(G.stencilWriteMask),h.setFunc(G.stencilFunc,G.stencilRef,G.stencilFuncMask),h.setOp(G.stencilFail,G.stencilZFail,G.stencilZPass)),oe(G.polygonOffset,G.polygonOffsetFactor,G.polygonOffsetUnits),G.alphaToCoverage===!0?ve(s.SAMPLE_ALPHA_TO_COVERAGE):Ae(s.SAMPLE_ALPHA_TO_COVERAGE)}function ot(G){le!==G&&(G?s.frontFace(s.CW):s.frontFace(s.CCW),le=G)}function L(G){G!==Py?(ve(s.CULL_FACE),G!==ge&&(G===xm?s.cullFace(s.BACK):G===Ly?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Ae(s.CULL_FACE),ge=G}function C(G){G!==V&&(X&&s.lineWidth(G),V=G)}function oe(G,Pe,Ne){G?(ve(s.POLYGON_OFFSET_FILL),(J!==Pe||te!==Ne)&&(s.polygonOffset(Pe,Ne),J=Pe,te=Ne)):Ae(s.POLYGON_OFFSET_FILL)}function we(G){G?ve(s.SCISSOR_TEST):Ae(s.SCISSOR_TEST)}function Me(G){G===void 0&&(G=s.TEXTURE0+q-1),O!==G&&(s.activeTexture(G),O=G)}function be(G,Pe,Ne){Ne===void 0&&(O===null?Ne=s.TEXTURE0+q-1:Ne=O);let ae=F[Ne];ae===void 0&&(ae={type:void 0,texture:void 0},F[Ne]=ae),(ae.type!==G||ae.texture!==Pe)&&(O!==Ne&&(s.activeTexture(Ne),O=Ne),s.bindTexture(G,Pe||Fe[G]),ae.type=G,ae.texture=Pe)}function Je(){const G=F[O];G!==void 0&&G.type!==void 0&&(s.bindTexture(G.type,null),G.type=void 0,G.texture=void 0)}function Ie(){try{s.compressedTexImage2D.apply(s,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function He(){try{s.compressedTexImage3D.apply(s,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function qe(){try{s.texSubImage2D.apply(s,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function rt(){try{s.texSubImage3D.apply(s,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function xe(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function mt(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function H(){try{s.texStorage2D.apply(s,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function _e(){try{s.texStorage3D.apply(s,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Ue(){try{s.texImage2D.apply(s,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Re(){try{s.texImage3D.apply(s,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function $e(G){me.equals(G)===!1&&(s.scissor(G.x,G.y,G.z,G.w),me.copy(G))}function dt(G){ye.equals(G)===!1&&(s.viewport(G.x,G.y,G.z,G.w),ye.copy(G))}function gt(G,Pe){let Ne=g.get(Pe);Ne===void 0&&(Ne=new WeakMap,g.set(Pe,Ne));let ae=Ne.get(G);ae===void 0&&(ae=s.getUniformBlockIndex(Pe,G.name),Ne.set(G,ae))}function st(G,Pe){const ae=g.get(Pe).get(G);p.get(Pe)!==ae&&(s.uniformBlockBinding(Pe,ae,G.__bindingPointIndex),p.set(Pe,ae))}function Le(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),i===!0&&(s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null)),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),y={},O=null,F={},S={},E=new WeakMap,M=[],x=null,v=!1,b=null,A=null,P=null,z=null,D=null,I=null,ne=null,R=new Et(0,0,0),U=0,se=!1,le=null,ge=null,V=null,J=null,te=null,me.set(0,0,s.canvas.width,s.canvas.height),ye.set(0,0,s.canvas.width,s.canvas.height),c.reset(),f.reset(),h.reset()}return{buffers:{color:c,depth:f,stencil:h},enable:ve,disable:Ae,bindFramebuffer:ze,drawBuffers:Q,useProgram:nt,setBlending:Ve,setMaterial:wt,setFlipSided:ot,setCullFace:L,setLineWidth:C,setPolygonOffset:oe,setScissorTest:we,activeTexture:Me,bindTexture:be,unbindTexture:Je,compressedTexImage2D:Ie,compressedTexImage3D:He,texImage2D:Ue,texImage3D:Re,updateUBOMapping:gt,uniformBlockBinding:st,texStorage2D:H,texStorage3D:_e,texSubImage2D:qe,texSubImage3D:rt,compressedTexSubImage2D:xe,compressedTexSubImage3D:mt,scissor:$e,viewport:dt,reset:Le}}function zT(s,e,t,i,o,l,d){const c=o.isWebGL2,f=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,h=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),p=new WeakMap;let g;const y=new WeakMap;let S=!1;try{S=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function E(L,C){return S?new OffscreenCanvas(L,C):cc("canvas")}function M(L,C,oe,we){let Me=1;if((L.width>we||L.height>we)&&(Me=we/Math.max(L.width,L.height)),Me<1||C===!0)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap){const be=C?lc:Math.floor,Je=be(Me*L.width),Ie=be(Me*L.height);g===void 0&&(g=E(Je,Ie));const He=oe?E(Je,Ie):g;return He.width=Je,He.height=Ie,He.getContext("2d").drawImage(L,0,0,Je,Ie),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+L.width+"x"+L.height+") to ("+Je+"x"+Ie+")."),He}else return"data"in L&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+L.width+"x"+L.height+")."),L;return L}function x(L){return rf(L.width)&&rf(L.height)}function v(L){return c?!1:L.wrapS!==mi||L.wrapT!==mi||L.minFilter!==Cn&&L.minFilter!==ii}function b(L,C){return L.generateMipmaps&&C&&L.minFilter!==Cn&&L.minFilter!==ii}function A(L){s.generateMipmap(L)}function P(L,C,oe,we,Me=!1){if(c===!1)return C;if(L!==null){if(s[L]!==void 0)return s[L];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let be=C;if(C===s.RED&&(oe===s.FLOAT&&(be=s.R32F),oe===s.HALF_FLOAT&&(be=s.R16F),oe===s.UNSIGNED_BYTE&&(be=s.R8)),C===s.RED_INTEGER&&(oe===s.UNSIGNED_BYTE&&(be=s.R8UI),oe===s.UNSIGNED_SHORT&&(be=s.R16UI),oe===s.UNSIGNED_INT&&(be=s.R32UI),oe===s.BYTE&&(be=s.R8I),oe===s.SHORT&&(be=s.R16I),oe===s.INT&&(be=s.R32I)),C===s.RG&&(oe===s.FLOAT&&(be=s.RG32F),oe===s.HALF_FLOAT&&(be=s.RG16F),oe===s.UNSIGNED_BYTE&&(be=s.RG8)),C===s.RGBA){const Je=Me?rc:Lt.getTransfer(we);oe===s.FLOAT&&(be=s.RGBA32F),oe===s.HALF_FLOAT&&(be=s.RGBA16F),oe===s.UNSIGNED_BYTE&&(be=Je===Ot?s.SRGB8_ALPHA8:s.RGBA8),oe===s.UNSIGNED_SHORT_4_4_4_4&&(be=s.RGBA4),oe===s.UNSIGNED_SHORT_5_5_5_1&&(be=s.RGB5_A1)}return(be===s.R16F||be===s.R32F||be===s.RG16F||be===s.RG32F||be===s.RGBA16F||be===s.RGBA32F)&&e.get("EXT_color_buffer_float"),be}function z(L,C,oe){return b(L,oe)===!0||L.isFramebufferTexture&&L.minFilter!==Cn&&L.minFilter!==ii?Math.log2(Math.max(C.width,C.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?C.mipmaps.length:1}function D(L){return L===Cn||L===wm||L===cd?s.NEAREST:s.LINEAR}function I(L){const C=L.target;C.removeEventListener("dispose",I),R(C),C.isVideoTexture&&p.delete(C)}function ne(L){const C=L.target;C.removeEventListener("dispose",ne),se(C)}function R(L){const C=i.get(L);if(C.__webglInit===void 0)return;const oe=L.source,we=y.get(oe);if(we){const Me=we[C.__cacheKey];Me.usedTimes--,Me.usedTimes===0&&U(L),Object.keys(we).length===0&&y.delete(oe)}i.remove(L)}function U(L){const C=i.get(L);s.deleteTexture(C.__webglTexture);const oe=L.source,we=y.get(oe);delete we[C.__cacheKey],d.memory.textures--}function se(L){const C=L.texture,oe=i.get(L),we=i.get(C);if(we.__webglTexture!==void 0&&(s.deleteTexture(we.__webglTexture),d.memory.textures--),L.depthTexture&&L.depthTexture.dispose(),L.isWebGLCubeRenderTarget)for(let Me=0;Me<6;Me++){if(Array.isArray(oe.__webglFramebuffer[Me]))for(let be=0;be<oe.__webglFramebuffer[Me].length;be++)s.deleteFramebuffer(oe.__webglFramebuffer[Me][be]);else s.deleteFramebuffer(oe.__webglFramebuffer[Me]);oe.__webglDepthbuffer&&s.deleteRenderbuffer(oe.__webglDepthbuffer[Me])}else{if(Array.isArray(oe.__webglFramebuffer))for(let Me=0;Me<oe.__webglFramebuffer.length;Me++)s.deleteFramebuffer(oe.__webglFramebuffer[Me]);else s.deleteFramebuffer(oe.__webglFramebuffer);if(oe.__webglDepthbuffer&&s.deleteRenderbuffer(oe.__webglDepthbuffer),oe.__webglMultisampledFramebuffer&&s.deleteFramebuffer(oe.__webglMultisampledFramebuffer),oe.__webglColorRenderbuffer)for(let Me=0;Me<oe.__webglColorRenderbuffer.length;Me++)oe.__webglColorRenderbuffer[Me]&&s.deleteRenderbuffer(oe.__webglColorRenderbuffer[Me]);oe.__webglDepthRenderbuffer&&s.deleteRenderbuffer(oe.__webglDepthRenderbuffer)}if(L.isWebGLMultipleRenderTargets)for(let Me=0,be=C.length;Me<be;Me++){const Je=i.get(C[Me]);Je.__webglTexture&&(s.deleteTexture(Je.__webglTexture),d.memory.textures--),i.remove(C[Me])}i.remove(C),i.remove(L)}let le=0;function ge(){le=0}function V(){const L=le;return L>=o.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+L+" texture units while this GPU supports only "+o.maxTextures),le+=1,L}function J(L){const C=[];return C.push(L.wrapS),C.push(L.wrapT),C.push(L.wrapR||0),C.push(L.magFilter),C.push(L.minFilter),C.push(L.anisotropy),C.push(L.internalFormat),C.push(L.format),C.push(L.type),C.push(L.generateMipmaps),C.push(L.premultiplyAlpha),C.push(L.flipY),C.push(L.unpackAlignment),C.push(L.colorSpace),C.join()}function te(L,C){const oe=i.get(L);if(L.isVideoTexture&&wt(L),L.isRenderTargetTexture===!1&&L.version>0&&oe.__version!==L.version){const we=L.image;if(we===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(we.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{me(oe,L,C);return}}t.bindTexture(s.TEXTURE_2D,oe.__webglTexture,s.TEXTURE0+C)}function q(L,C){const oe=i.get(L);if(L.version>0&&oe.__version!==L.version){me(oe,L,C);return}t.bindTexture(s.TEXTURE_2D_ARRAY,oe.__webglTexture,s.TEXTURE0+C)}function X(L,C){const oe=i.get(L);if(L.version>0&&oe.__version!==L.version){me(oe,L,C);return}t.bindTexture(s.TEXTURE_3D,oe.__webglTexture,s.TEXTURE0+C)}function K(L,C){const oe=i.get(L);if(L.version>0&&oe.__version!==L.version){ye(oe,L,C);return}t.bindTexture(s.TEXTURE_CUBE_MAP,oe.__webglTexture,s.TEXTURE0+C)}const Y={[ic]:s.REPEAT,[mi]:s.CLAMP_TO_EDGE,[tf]:s.MIRRORED_REPEAT},O={[Cn]:s.NEAREST,[wm]:s.NEAREST_MIPMAP_NEAREST,[cd]:s.NEAREST_MIPMAP_LINEAR,[ii]:s.LINEAR,[lS]:s.LINEAR_MIPMAP_NEAREST,[ca]:s.LINEAR_MIPMAP_LINEAR},F={[yS]:s.NEVER,[bS]:s.ALWAYS,[SS]:s.LESS,[zv]:s.LEQUAL,[MS]:s.EQUAL,[TS]:s.GEQUAL,[ES]:s.GREATER,[wS]:s.NOTEQUAL};function j(L,C,oe){if(oe?(s.texParameteri(L,s.TEXTURE_WRAP_S,Y[C.wrapS]),s.texParameteri(L,s.TEXTURE_WRAP_T,Y[C.wrapT]),(L===s.TEXTURE_3D||L===s.TEXTURE_2D_ARRAY)&&s.texParameteri(L,s.TEXTURE_WRAP_R,Y[C.wrapR]),s.texParameteri(L,s.TEXTURE_MAG_FILTER,O[C.magFilter]),s.texParameteri(L,s.TEXTURE_MIN_FILTER,O[C.minFilter])):(s.texParameteri(L,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(L,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE),(L===s.TEXTURE_3D||L===s.TEXTURE_2D_ARRAY)&&s.texParameteri(L,s.TEXTURE_WRAP_R,s.CLAMP_TO_EDGE),(C.wrapS!==mi||C.wrapT!==mi)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),s.texParameteri(L,s.TEXTURE_MAG_FILTER,D(C.magFilter)),s.texParameteri(L,s.TEXTURE_MIN_FILTER,D(C.minFilter)),C.minFilter!==Cn&&C.minFilter!==ii&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),C.compareFunction&&(s.texParameteri(L,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(L,s.TEXTURE_COMPARE_FUNC,F[C.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const we=e.get("EXT_texture_filter_anisotropic");if(C.magFilter===Cn||C.minFilter!==cd&&C.minFilter!==ca||C.type===Tr&&e.has("OES_texture_float_linear")===!1||c===!1&&C.type===ua&&e.has("OES_texture_half_float_linear")===!1)return;(C.anisotropy>1||i.get(C).__currentAnisotropy)&&(s.texParameterf(L,we.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(C.anisotropy,o.getMaxAnisotropy())),i.get(C).__currentAnisotropy=C.anisotropy)}}function ce(L,C){let oe=!1;L.__webglInit===void 0&&(L.__webglInit=!0,C.addEventListener("dispose",I));const we=C.source;let Me=y.get(we);Me===void 0&&(Me={},y.set(we,Me));const be=J(C);if(be!==L.__cacheKey){Me[be]===void 0&&(Me[be]={texture:s.createTexture(),usedTimes:0},d.memory.textures++,oe=!0),Me[be].usedTimes++;const Je=Me[L.__cacheKey];Je!==void 0&&(Me[L.__cacheKey].usedTimes--,Je.usedTimes===0&&U(C)),L.__cacheKey=be,L.__webglTexture=Me[be].texture}return oe}function me(L,C,oe){let we=s.TEXTURE_2D;(C.isDataArrayTexture||C.isCompressedArrayTexture)&&(we=s.TEXTURE_2D_ARRAY),C.isData3DTexture&&(we=s.TEXTURE_3D);const Me=ce(L,C),be=C.source;t.bindTexture(we,L.__webglTexture,s.TEXTURE0+oe);const Je=i.get(be);if(be.version!==Je.__version||Me===!0){t.activeTexture(s.TEXTURE0+oe);const Ie=Lt.getPrimaries(Lt.workingColorSpace),He=C.colorSpace===si?null:Lt.getPrimaries(C.colorSpace),qe=C.colorSpace===si||Ie===He?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,C.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,C.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,qe);const rt=v(C)&&x(C.image)===!1;let xe=M(C.image,rt,!1,o.maxTextureSize);xe=ot(C,xe);const mt=x(xe)||c,H=l.convert(C.format,C.colorSpace);let _e=l.convert(C.type),Ue=P(C.internalFormat,H,_e,C.colorSpace,C.isVideoTexture);j(we,C,mt);let Re;const $e=C.mipmaps,dt=c&&C.isVideoTexture!==!0&&Ue!==Ov,gt=Je.__version===void 0||Me===!0,st=z(C,xe,mt);if(C.isDepthTexture)Ue=s.DEPTH_COMPONENT,c?C.type===Tr?Ue=s.DEPTH_COMPONENT32F:C.type===wr?Ue=s.DEPTH_COMPONENT24:C.type===is?Ue=s.DEPTH24_STENCIL8:Ue=s.DEPTH_COMPONENT16:C.type===Tr&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),C.format===rs&&Ue===s.DEPTH_COMPONENT&&C.type!==gf&&C.type!==wr&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),C.type=wr,_e=l.convert(C.type)),C.format===co&&Ue===s.DEPTH_COMPONENT&&(Ue=s.DEPTH_STENCIL,C.type!==is&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),C.type=is,_e=l.convert(C.type))),gt&&(dt?t.texStorage2D(s.TEXTURE_2D,1,Ue,xe.width,xe.height):t.texImage2D(s.TEXTURE_2D,0,Ue,xe.width,xe.height,0,H,_e,null));else if(C.isDataTexture)if($e.length>0&&mt){dt&&gt&&t.texStorage2D(s.TEXTURE_2D,st,Ue,$e[0].width,$e[0].height);for(let Le=0,G=$e.length;Le<G;Le++)Re=$e[Le],dt?t.texSubImage2D(s.TEXTURE_2D,Le,0,0,Re.width,Re.height,H,_e,Re.data):t.texImage2D(s.TEXTURE_2D,Le,Ue,Re.width,Re.height,0,H,_e,Re.data);C.generateMipmaps=!1}else dt?(gt&&t.texStorage2D(s.TEXTURE_2D,st,Ue,xe.width,xe.height),t.texSubImage2D(s.TEXTURE_2D,0,0,0,xe.width,xe.height,H,_e,xe.data)):t.texImage2D(s.TEXTURE_2D,0,Ue,xe.width,xe.height,0,H,_e,xe.data);else if(C.isCompressedTexture)if(C.isCompressedArrayTexture){dt&&gt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,st,Ue,$e[0].width,$e[0].height,xe.depth);for(let Le=0,G=$e.length;Le<G;Le++)Re=$e[Le],C.format!==gi?H!==null?dt?t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,Le,0,0,0,Re.width,Re.height,xe.depth,H,Re.data,0,0):t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,Le,Ue,Re.width,Re.height,xe.depth,0,Re.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):dt?t.texSubImage3D(s.TEXTURE_2D_ARRAY,Le,0,0,0,Re.width,Re.height,xe.depth,H,_e,Re.data):t.texImage3D(s.TEXTURE_2D_ARRAY,Le,Ue,Re.width,Re.height,xe.depth,0,H,_e,Re.data)}else{dt&&gt&&t.texStorage2D(s.TEXTURE_2D,st,Ue,$e[0].width,$e[0].height);for(let Le=0,G=$e.length;Le<G;Le++)Re=$e[Le],C.format!==gi?H!==null?dt?t.compressedTexSubImage2D(s.TEXTURE_2D,Le,0,0,Re.width,Re.height,H,Re.data):t.compressedTexImage2D(s.TEXTURE_2D,Le,Ue,Re.width,Re.height,0,Re.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):dt?t.texSubImage2D(s.TEXTURE_2D,Le,0,0,Re.width,Re.height,H,_e,Re.data):t.texImage2D(s.TEXTURE_2D,Le,Ue,Re.width,Re.height,0,H,_e,Re.data)}else if(C.isDataArrayTexture)dt?(gt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,st,Ue,xe.width,xe.height,xe.depth),t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,xe.width,xe.height,xe.depth,H,_e,xe.data)):t.texImage3D(s.TEXTURE_2D_ARRAY,0,Ue,xe.width,xe.height,xe.depth,0,H,_e,xe.data);else if(C.isData3DTexture)dt?(gt&&t.texStorage3D(s.TEXTURE_3D,st,Ue,xe.width,xe.height,xe.depth),t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,xe.width,xe.height,xe.depth,H,_e,xe.data)):t.texImage3D(s.TEXTURE_3D,0,Ue,xe.width,xe.height,xe.depth,0,H,_e,xe.data);else if(C.isFramebufferTexture){if(gt)if(dt)t.texStorage2D(s.TEXTURE_2D,st,Ue,xe.width,xe.height);else{let Le=xe.width,G=xe.height;for(let Pe=0;Pe<st;Pe++)t.texImage2D(s.TEXTURE_2D,Pe,Ue,Le,G,0,H,_e,null),Le>>=1,G>>=1}}else if($e.length>0&&mt){dt&&gt&&t.texStorage2D(s.TEXTURE_2D,st,Ue,$e[0].width,$e[0].height);for(let Le=0,G=$e.length;Le<G;Le++)Re=$e[Le],dt?t.texSubImage2D(s.TEXTURE_2D,Le,0,0,H,_e,Re):t.texImage2D(s.TEXTURE_2D,Le,Ue,H,_e,Re);C.generateMipmaps=!1}else dt?(gt&&t.texStorage2D(s.TEXTURE_2D,st,Ue,xe.width,xe.height),t.texSubImage2D(s.TEXTURE_2D,0,0,0,H,_e,xe)):t.texImage2D(s.TEXTURE_2D,0,Ue,H,_e,xe);b(C,mt)&&A(we),Je.__version=be.version,C.onUpdate&&C.onUpdate(C)}L.__version=C.version}function ye(L,C,oe){if(C.image.length!==6)return;const we=ce(L,C),Me=C.source;t.bindTexture(s.TEXTURE_CUBE_MAP,L.__webglTexture,s.TEXTURE0+oe);const be=i.get(Me);if(Me.version!==be.__version||we===!0){t.activeTexture(s.TEXTURE0+oe);const Je=Lt.getPrimaries(Lt.workingColorSpace),Ie=C.colorSpace===si?null:Lt.getPrimaries(C.colorSpace),He=C.colorSpace===si||Je===Ie?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,C.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,C.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,He);const qe=C.isCompressedTexture||C.image[0].isCompressedTexture,rt=C.image[0]&&C.image[0].isDataTexture,xe=[];for(let Le=0;Le<6;Le++)!qe&&!rt?xe[Le]=M(C.image[Le],!1,!0,o.maxCubemapSize):xe[Le]=rt?C.image[Le].image:C.image[Le],xe[Le]=ot(C,xe[Le]);const mt=xe[0],H=x(mt)||c,_e=l.convert(C.format,C.colorSpace),Ue=l.convert(C.type),Re=P(C.internalFormat,_e,Ue,C.colorSpace),$e=c&&C.isVideoTexture!==!0,dt=be.__version===void 0||we===!0;let gt=z(C,mt,H);j(s.TEXTURE_CUBE_MAP,C,H);let st;if(qe){$e&&dt&&t.texStorage2D(s.TEXTURE_CUBE_MAP,gt,Re,mt.width,mt.height);for(let Le=0;Le<6;Le++){st=xe[Le].mipmaps;for(let G=0;G<st.length;G++){const Pe=st[G];C.format!==gi?_e!==null?$e?t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Le,G,0,0,Pe.width,Pe.height,_e,Pe.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Le,G,Re,Pe.width,Pe.height,0,Pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):$e?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Le,G,0,0,Pe.width,Pe.height,_e,Ue,Pe.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Le,G,Re,Pe.width,Pe.height,0,_e,Ue,Pe.data)}}}else{st=C.mipmaps,$e&&dt&&(st.length>0&&gt++,t.texStorage2D(s.TEXTURE_CUBE_MAP,gt,Re,xe[0].width,xe[0].height));for(let Le=0;Le<6;Le++)if(rt){$e?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Le,0,0,0,xe[Le].width,xe[Le].height,_e,Ue,xe[Le].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Le,0,Re,xe[Le].width,xe[Le].height,0,_e,Ue,xe[Le].data);for(let G=0;G<st.length;G++){const Ne=st[G].image[Le].image;$e?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Le,G+1,0,0,Ne.width,Ne.height,_e,Ue,Ne.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Le,G+1,Re,Ne.width,Ne.height,0,_e,Ue,Ne.data)}}else{$e?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Le,0,0,0,_e,Ue,xe[Le]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Le,0,Re,_e,Ue,xe[Le]);for(let G=0;G<st.length;G++){const Pe=st[G];$e?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Le,G+1,0,0,_e,Ue,Pe.image[Le]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Le,G+1,Re,_e,Ue,Pe.image[Le])}}}b(C,H)&&A(s.TEXTURE_CUBE_MAP),be.__version=Me.version,C.onUpdate&&C.onUpdate(C)}L.__version=C.version}function Se(L,C,oe,we,Me,be){const Je=l.convert(oe.format,oe.colorSpace),Ie=l.convert(oe.type),He=P(oe.internalFormat,Je,Ie,oe.colorSpace);if(!i.get(C).__hasExternalTextures){const rt=Math.max(1,C.width>>be),xe=Math.max(1,C.height>>be);Me===s.TEXTURE_3D||Me===s.TEXTURE_2D_ARRAY?t.texImage3D(Me,be,He,rt,xe,C.depth,0,Je,Ie,null):t.texImage2D(Me,be,He,rt,xe,0,Je,Ie,null)}t.bindFramebuffer(s.FRAMEBUFFER,L),Ve(C)?f.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,we,Me,i.get(oe).__webglTexture,0,Qe(C)):(Me===s.TEXTURE_2D||Me>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&Me<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,we,Me,i.get(oe).__webglTexture,be),t.bindFramebuffer(s.FRAMEBUFFER,null)}function Fe(L,C,oe){if(s.bindRenderbuffer(s.RENDERBUFFER,L),C.depthBuffer&&!C.stencilBuffer){let we=c===!0?s.DEPTH_COMPONENT24:s.DEPTH_COMPONENT16;if(oe||Ve(C)){const Me=C.depthTexture;Me&&Me.isDepthTexture&&(Me.type===Tr?we=s.DEPTH_COMPONENT32F:Me.type===wr&&(we=s.DEPTH_COMPONENT24));const be=Qe(C);Ve(C)?f.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,be,we,C.width,C.height):s.renderbufferStorageMultisample(s.RENDERBUFFER,be,we,C.width,C.height)}else s.renderbufferStorage(s.RENDERBUFFER,we,C.width,C.height);s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.RENDERBUFFER,L)}else if(C.depthBuffer&&C.stencilBuffer){const we=Qe(C);oe&&Ve(C)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,we,s.DEPTH24_STENCIL8,C.width,C.height):Ve(C)?f.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,we,s.DEPTH24_STENCIL8,C.width,C.height):s.renderbufferStorage(s.RENDERBUFFER,s.DEPTH_STENCIL,C.width,C.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.RENDERBUFFER,L)}else{const we=C.isWebGLMultipleRenderTargets===!0?C.texture:[C.texture];for(let Me=0;Me<we.length;Me++){const be=we[Me],Je=l.convert(be.format,be.colorSpace),Ie=l.convert(be.type),He=P(be.internalFormat,Je,Ie,be.colorSpace),qe=Qe(C);oe&&Ve(C)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,qe,He,C.width,C.height):Ve(C)?f.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,qe,He,C.width,C.height):s.renderbufferStorage(s.RENDERBUFFER,He,C.width,C.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function ve(L,C){if(C&&C.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,L),!(C.depthTexture&&C.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(C.depthTexture).__webglTexture||C.depthTexture.image.width!==C.width||C.depthTexture.image.height!==C.height)&&(C.depthTexture.image.width=C.width,C.depthTexture.image.height=C.height,C.depthTexture.needsUpdate=!0),te(C.depthTexture,0);const we=i.get(C.depthTexture).__webglTexture,Me=Qe(C);if(C.depthTexture.format===rs)Ve(C)?f.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,we,0,Me):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,we,0);else if(C.depthTexture.format===co)Ve(C)?f.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,we,0,Me):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,we,0);else throw new Error("Unknown depthTexture format")}function Ae(L){const C=i.get(L),oe=L.isWebGLCubeRenderTarget===!0;if(L.depthTexture&&!C.__autoAllocateDepthBuffer){if(oe)throw new Error("target.depthTexture not supported in Cube render targets");ve(C.__webglFramebuffer,L)}else if(oe){C.__webglDepthbuffer=[];for(let we=0;we<6;we++)t.bindFramebuffer(s.FRAMEBUFFER,C.__webglFramebuffer[we]),C.__webglDepthbuffer[we]=s.createRenderbuffer(),Fe(C.__webglDepthbuffer[we],L,!1)}else t.bindFramebuffer(s.FRAMEBUFFER,C.__webglFramebuffer),C.__webglDepthbuffer=s.createRenderbuffer(),Fe(C.__webglDepthbuffer,L,!1);t.bindFramebuffer(s.FRAMEBUFFER,null)}function ze(L,C,oe){const we=i.get(L);C!==void 0&&Se(we.__webglFramebuffer,L,L.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),oe!==void 0&&Ae(L)}function Q(L){const C=L.texture,oe=i.get(L),we=i.get(C);L.addEventListener("dispose",ne),L.isWebGLMultipleRenderTargets!==!0&&(we.__webglTexture===void 0&&(we.__webglTexture=s.createTexture()),we.__version=C.version,d.memory.textures++);const Me=L.isWebGLCubeRenderTarget===!0,be=L.isWebGLMultipleRenderTargets===!0,Je=x(L)||c;if(Me){oe.__webglFramebuffer=[];for(let Ie=0;Ie<6;Ie++)if(c&&C.mipmaps&&C.mipmaps.length>0){oe.__webglFramebuffer[Ie]=[];for(let He=0;He<C.mipmaps.length;He++)oe.__webglFramebuffer[Ie][He]=s.createFramebuffer()}else oe.__webglFramebuffer[Ie]=s.createFramebuffer()}else{if(c&&C.mipmaps&&C.mipmaps.length>0){oe.__webglFramebuffer=[];for(let Ie=0;Ie<C.mipmaps.length;Ie++)oe.__webglFramebuffer[Ie]=s.createFramebuffer()}else oe.__webglFramebuffer=s.createFramebuffer();if(be)if(o.drawBuffers){const Ie=L.texture;for(let He=0,qe=Ie.length;He<qe;He++){const rt=i.get(Ie[He]);rt.__webglTexture===void 0&&(rt.__webglTexture=s.createTexture(),d.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(c&&L.samples>0&&Ve(L)===!1){const Ie=be?C:[C];oe.__webglMultisampledFramebuffer=s.createFramebuffer(),oe.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,oe.__webglMultisampledFramebuffer);for(let He=0;He<Ie.length;He++){const qe=Ie[He];oe.__webglColorRenderbuffer[He]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,oe.__webglColorRenderbuffer[He]);const rt=l.convert(qe.format,qe.colorSpace),xe=l.convert(qe.type),mt=P(qe.internalFormat,rt,xe,qe.colorSpace,L.isXRRenderTarget===!0),H=Qe(L);s.renderbufferStorageMultisample(s.RENDERBUFFER,H,mt,L.width,L.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+He,s.RENDERBUFFER,oe.__webglColorRenderbuffer[He])}s.bindRenderbuffer(s.RENDERBUFFER,null),L.depthBuffer&&(oe.__webglDepthRenderbuffer=s.createRenderbuffer(),Fe(oe.__webglDepthRenderbuffer,L,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(Me){t.bindTexture(s.TEXTURE_CUBE_MAP,we.__webglTexture),j(s.TEXTURE_CUBE_MAP,C,Je);for(let Ie=0;Ie<6;Ie++)if(c&&C.mipmaps&&C.mipmaps.length>0)for(let He=0;He<C.mipmaps.length;He++)Se(oe.__webglFramebuffer[Ie][He],L,C,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Ie,He);else Se(oe.__webglFramebuffer[Ie],L,C,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Ie,0);b(C,Je)&&A(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(be){const Ie=L.texture;for(let He=0,qe=Ie.length;He<qe;He++){const rt=Ie[He],xe=i.get(rt);t.bindTexture(s.TEXTURE_2D,xe.__webglTexture),j(s.TEXTURE_2D,rt,Je),Se(oe.__webglFramebuffer,L,rt,s.COLOR_ATTACHMENT0+He,s.TEXTURE_2D,0),b(rt,Je)&&A(s.TEXTURE_2D)}t.unbindTexture()}else{let Ie=s.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(c?Ie=L.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(Ie,we.__webglTexture),j(Ie,C,Je),c&&C.mipmaps&&C.mipmaps.length>0)for(let He=0;He<C.mipmaps.length;He++)Se(oe.__webglFramebuffer[He],L,C,s.COLOR_ATTACHMENT0,Ie,He);else Se(oe.__webglFramebuffer,L,C,s.COLOR_ATTACHMENT0,Ie,0);b(C,Je)&&A(Ie),t.unbindTexture()}L.depthBuffer&&Ae(L)}function nt(L){const C=x(L)||c,oe=L.isWebGLMultipleRenderTargets===!0?L.texture:[L.texture];for(let we=0,Me=oe.length;we<Me;we++){const be=oe[we];if(b(be,C)){const Je=L.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:s.TEXTURE_2D,Ie=i.get(be).__webglTexture;t.bindTexture(Je,Ie),A(Je),t.unbindTexture()}}}function ke(L){if(c&&L.samples>0&&Ve(L)===!1){const C=L.isWebGLMultipleRenderTargets?L.texture:[L.texture],oe=L.width,we=L.height;let Me=s.COLOR_BUFFER_BIT;const be=[],Je=L.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Ie=i.get(L),He=L.isWebGLMultipleRenderTargets===!0;if(He)for(let qe=0;qe<C.length;qe++)t.bindFramebuffer(s.FRAMEBUFFER,Ie.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+qe,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,Ie.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+qe,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,Ie.__webglMultisampledFramebuffer),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ie.__webglFramebuffer);for(let qe=0;qe<C.length;qe++){be.push(s.COLOR_ATTACHMENT0+qe),L.depthBuffer&&be.push(Je);const rt=Ie.__ignoreDepthValues!==void 0?Ie.__ignoreDepthValues:!1;if(rt===!1&&(L.depthBuffer&&(Me|=s.DEPTH_BUFFER_BIT),L.stencilBuffer&&(Me|=s.STENCIL_BUFFER_BIT)),He&&s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Ie.__webglColorRenderbuffer[qe]),rt===!0&&(s.invalidateFramebuffer(s.READ_FRAMEBUFFER,[Je]),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[Je])),He){const xe=i.get(C[qe]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,xe,0)}s.blitFramebuffer(0,0,oe,we,0,0,oe,we,Me,s.NEAREST),h&&s.invalidateFramebuffer(s.READ_FRAMEBUFFER,be)}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),He)for(let qe=0;qe<C.length;qe++){t.bindFramebuffer(s.FRAMEBUFFER,Ie.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+qe,s.RENDERBUFFER,Ie.__webglColorRenderbuffer[qe]);const rt=i.get(C[qe]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,Ie.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+qe,s.TEXTURE_2D,rt,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ie.__webglMultisampledFramebuffer)}}function Qe(L){return Math.min(o.maxSamples,L.samples)}function Ve(L){const C=i.get(L);return c&&L.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&C.__useRenderToTexture!==!1}function wt(L){const C=d.render.frame;p.get(L)!==C&&(p.set(L,C),L.update())}function ot(L,C){const oe=L.colorSpace,we=L.format,Me=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||L.format===nf||oe!==Xi&&oe!==si&&(Lt.getTransfer(oe)===Ot?c===!1?e.has("EXT_sRGB")===!0&&we===gi?(L.format=nf,L.minFilter=ii,L.generateMipmaps=!1):C=Hv.sRGBToLinear(C):(we!==gi||Me!==Pr)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",oe)),C}this.allocateTextureUnit=V,this.resetTextureUnits=ge,this.setTexture2D=te,this.setTexture2DArray=q,this.setTexture3D=X,this.setTextureCube=K,this.rebindTextures=ze,this.setupRenderTarget=Q,this.updateRenderTargetMipmap=nt,this.updateMultisampleRenderTarget=ke,this.setupDepthRenderbuffer=Ae,this.setupFrameBufferTexture=Se,this.useMultisampledRTT=Ve}function BT(s,e,t){const i=t.isWebGL2;function o(l,d=si){let c;const f=Lt.getTransfer(d);if(l===Pr)return s.UNSIGNED_BYTE;if(l===Lv)return s.UNSIGNED_SHORT_4_4_4_4;if(l===Nv)return s.UNSIGNED_SHORT_5_5_5_1;if(l===cS)return s.BYTE;if(l===uS)return s.SHORT;if(l===gf)return s.UNSIGNED_SHORT;if(l===Pv)return s.INT;if(l===wr)return s.UNSIGNED_INT;if(l===Tr)return s.FLOAT;if(l===ua)return i?s.HALF_FLOAT:(c=e.get("OES_texture_half_float"),c!==null?c.HALF_FLOAT_OES:null);if(l===dS)return s.ALPHA;if(l===gi)return s.RGBA;if(l===fS)return s.LUMINANCE;if(l===hS)return s.LUMINANCE_ALPHA;if(l===rs)return s.DEPTH_COMPONENT;if(l===co)return s.DEPTH_STENCIL;if(l===nf)return c=e.get("EXT_sRGB"),c!==null?c.SRGB_ALPHA_EXT:null;if(l===pS)return s.RED;if(l===Dv)return s.RED_INTEGER;if(l===mS)return s.RG;if(l===Uv)return s.RG_INTEGER;if(l===Iv)return s.RGBA_INTEGER;if(l===ud||l===dd||l===fd||l===hd)if(f===Ot)if(c=e.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(l===ud)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(l===dd)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(l===fd)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(l===hd)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=e.get("WEBGL_compressed_texture_s3tc"),c!==null){if(l===ud)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(l===dd)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(l===fd)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(l===hd)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(l===Tm||l===bm||l===Am||l===Cm)if(c=e.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(l===Tm)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(l===bm)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(l===Am)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(l===Cm)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(l===Ov)return c=e.get("WEBGL_compressed_texture_etc1"),c!==null?c.COMPRESSED_RGB_ETC1_WEBGL:null;if(l===Rm||l===Pm)if(c=e.get("WEBGL_compressed_texture_etc"),c!==null){if(l===Rm)return f===Ot?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(l===Pm)return f===Ot?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(l===Lm||l===Nm||l===Dm||l===Um||l===Im||l===Om||l===Fm||l===km||l===zm||l===Bm||l===Hm||l===Vm||l===Gm||l===Wm)if(c=e.get("WEBGL_compressed_texture_astc"),c!==null){if(l===Lm)return f===Ot?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(l===Nm)return f===Ot?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(l===Dm)return f===Ot?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(l===Um)return f===Ot?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(l===Im)return f===Ot?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(l===Om)return f===Ot?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(l===Fm)return f===Ot?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(l===km)return f===Ot?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(l===zm)return f===Ot?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(l===Bm)return f===Ot?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(l===Hm)return f===Ot?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(l===Vm)return f===Ot?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(l===Gm)return f===Ot?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(l===Wm)return f===Ot?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(l===pd||l===jm||l===Xm)if(c=e.get("EXT_texture_compression_bptc"),c!==null){if(l===pd)return f===Ot?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(l===jm)return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(l===Xm)return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(l===gS||l===$m||l===Ym||l===qm)if(c=e.get("EXT_texture_compression_rgtc"),c!==null){if(l===pd)return c.COMPRESSED_RED_RGTC1_EXT;if(l===$m)return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(l===Ym)return c.COMPRESSED_RED_GREEN_RGTC2_EXT;if(l===qm)return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return l===is?i?s.UNSIGNED_INT_24_8:(c=e.get("WEBGL_depth_texture"),c!==null?c.UNSIGNED_INT_24_8_WEBGL:null):s[l]!==void 0?s[l]:null}return{convert:o}}class HT extends $n{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class br extends rn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const VT={type:"move"};class Fd{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new br,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new br,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new br,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let o=null,l=null,d=null;const c=this._targetRay,f=this._grip,h=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(h&&e.hand){d=!0;for(const M of e.hand.values()){const x=t.getJointPose(M,i),v=this._getHandJoint(h,M);x!==null&&(v.matrix.fromArray(x.transform.matrix),v.matrix.decompose(v.position,v.rotation,v.scale),v.matrixWorldNeedsUpdate=!0,v.jointRadius=x.radius),v.visible=x!==null}const p=h.joints["index-finger-tip"],g=h.joints["thumb-tip"],y=p.position.distanceTo(g.position),S=.02,E=.005;h.inputState.pinching&&y>S+E?(h.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!h.inputState.pinching&&y<=S-E&&(h.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else f!==null&&e.gripSpace&&(l=t.getPose(e.gripSpace,i),l!==null&&(f.matrix.fromArray(l.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,l.linearVelocity?(f.hasLinearVelocity=!0,f.linearVelocity.copy(l.linearVelocity)):f.hasLinearVelocity=!1,l.angularVelocity?(f.hasAngularVelocity=!0,f.angularVelocity.copy(l.angularVelocity)):f.hasAngularVelocity=!1));c!==null&&(o=t.getPose(e.targetRaySpace,i),o===null&&l!==null&&(o=l),o!==null&&(c.matrix.fromArray(o.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,o.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(o.linearVelocity)):c.hasLinearVelocity=!1,o.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(o.angularVelocity)):c.hasAngularVelocity=!1,this.dispatchEvent(VT)))}return c!==null&&(c.visible=o!==null),f!==null&&(f.visible=l!==null),h!==null&&(h.visible=d!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new br;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class GT extends cs{constructor(e,t){super();const i=this;let o=null,l=1,d=null,c="local-floor",f=1,h=null,p=null,g=null,y=null,S=null,E=null;const M=t.getContextAttributes();let x=null,v=null;const b=[],A=[],P=new Be;let z=null;const D=new $n;D.layers.enable(1),D.viewport=new Bt;const I=new $n;I.layers.enable(2),I.viewport=new Bt;const ne=[D,I],R=new HT;R.layers.enable(1),R.layers.enable(2);let U=null,se=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let ce=b[j];return ce===void 0&&(ce=new Fd,b[j]=ce),ce.getTargetRaySpace()},this.getControllerGrip=function(j){let ce=b[j];return ce===void 0&&(ce=new Fd,b[j]=ce),ce.getGripSpace()},this.getHand=function(j){let ce=b[j];return ce===void 0&&(ce=new Fd,b[j]=ce),ce.getHandSpace()};function le(j){const ce=A.indexOf(j.inputSource);if(ce===-1)return;const me=b[ce];me!==void 0&&(me.update(j.inputSource,j.frame,h||d),me.dispatchEvent({type:j.type,data:j.inputSource}))}function ge(){o.removeEventListener("select",le),o.removeEventListener("selectstart",le),o.removeEventListener("selectend",le),o.removeEventListener("squeeze",le),o.removeEventListener("squeezestart",le),o.removeEventListener("squeezeend",le),o.removeEventListener("end",ge),o.removeEventListener("inputsourceschange",V);for(let j=0;j<b.length;j++){const ce=A[j];ce!==null&&(A[j]=null,b[j].disconnect(ce))}U=null,se=null,e.setRenderTarget(x),S=null,y=null,g=null,o=null,v=null,F.stop(),i.isPresenting=!1,e.setPixelRatio(z),e.setSize(P.width,P.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){l=j,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){c=j,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return h||d},this.setReferenceSpace=function(j){h=j},this.getBaseLayer=function(){return y!==null?y:S},this.getBinding=function(){return g},this.getFrame=function(){return E},this.getSession=function(){return o},this.setSession=async function(j){if(o=j,o!==null){if(x=e.getRenderTarget(),o.addEventListener("select",le),o.addEventListener("selectstart",le),o.addEventListener("selectend",le),o.addEventListener("squeeze",le),o.addEventListener("squeezestart",le),o.addEventListener("squeezeend",le),o.addEventListener("end",ge),o.addEventListener("inputsourceschange",V),M.xrCompatible!==!0&&await t.makeXRCompatible(),z=e.getPixelRatio(),e.getSize(P),o.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const ce={antialias:o.renderState.layers===void 0?M.antialias:!0,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:l};S=new XRWebGLLayer(o,t,ce),o.updateRenderState({baseLayer:S}),e.setPixelRatio(1),e.setSize(S.framebufferWidth,S.framebufferHeight,!1),v=new as(S.framebufferWidth,S.framebufferHeight,{format:gi,type:Pr,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil})}else{let ce=null,me=null,ye=null;M.depth&&(ye=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ce=M.stencil?co:rs,me=M.stencil?is:wr);const Se={colorFormat:t.RGBA8,depthFormat:ye,scaleFactor:l};g=new XRWebGLBinding(o,t),y=g.createProjectionLayer(Se),o.updateRenderState({layers:[y]}),e.setPixelRatio(1),e.setSize(y.textureWidth,y.textureHeight,!1),v=new as(y.textureWidth,y.textureHeight,{format:gi,type:Pr,depthTexture:new Qv(y.textureWidth,y.textureHeight,me,void 0,void 0,void 0,void 0,void 0,void 0,ce),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0});const Fe=e.properties.get(v);Fe.__ignoreDepthValues=y.ignoreDepthValues}v.isXRRenderTarget=!0,this.setFoveation(f),h=null,d=await o.requestReferenceSpace(c),F.setContext(o),F.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(o!==null)return o.environmentBlendMode};function V(j){for(let ce=0;ce<j.removed.length;ce++){const me=j.removed[ce],ye=A.indexOf(me);ye>=0&&(A[ye]=null,b[ye].disconnect(me))}for(let ce=0;ce<j.added.length;ce++){const me=j.added[ce];let ye=A.indexOf(me);if(ye===-1){for(let Fe=0;Fe<b.length;Fe++)if(Fe>=A.length){A.push(me),ye=Fe;break}else if(A[Fe]===null){A[Fe]=me,ye=Fe;break}if(ye===-1)break}const Se=b[ye];Se&&Se.connect(me)}}const J=new B,te=new B;function q(j,ce,me){J.setFromMatrixPosition(ce.matrixWorld),te.setFromMatrixPosition(me.matrixWorld);const ye=J.distanceTo(te),Se=ce.projectionMatrix.elements,Fe=me.projectionMatrix.elements,ve=Se[14]/(Se[10]-1),Ae=Se[14]/(Se[10]+1),ze=(Se[9]+1)/Se[5],Q=(Se[9]-1)/Se[5],nt=(Se[8]-1)/Se[0],ke=(Fe[8]+1)/Fe[0],Qe=ve*nt,Ve=ve*ke,wt=ye/(-nt+ke),ot=wt*-nt;ce.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(ot),j.translateZ(wt),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert();const L=ve+wt,C=Ae+wt,oe=Qe-ot,we=Ve+(ye-ot),Me=ze*Ae/C*L,be=Q*Ae/C*L;j.projectionMatrix.makePerspective(oe,we,Me,be,L,C),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}function X(j,ce){ce===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(ce.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(o===null)return;R.near=I.near=D.near=j.near,R.far=I.far=D.far=j.far,(U!==R.near||se!==R.far)&&(o.updateRenderState({depthNear:R.near,depthFar:R.far}),U=R.near,se=R.far);const ce=j.parent,me=R.cameras;X(R,ce);for(let ye=0;ye<me.length;ye++)X(me[ye],ce);me.length===2?q(R,D,I):R.projectionMatrix.copy(D.projectionMatrix),K(j,R,ce)};function K(j,ce,me){me===null?j.matrix.copy(ce.matrixWorld):(j.matrix.copy(me.matrixWorld),j.matrix.invert(),j.matrix.multiply(ce.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(ce.projectionMatrix),j.projectionMatrixInverse.copy(ce.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=da*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return R},this.getFoveation=function(){if(!(y===null&&S===null))return f},this.setFoveation=function(j){f=j,y!==null&&(y.fixedFoveation=j),S!==null&&S.fixedFoveation!==void 0&&(S.fixedFoveation=j)};let Y=null;function O(j,ce){if(p=ce.getViewerPose(h||d),E=ce,p!==null){const me=p.views;S!==null&&(e.setRenderTargetFramebuffer(v,S.framebuffer),e.setRenderTarget(v));let ye=!1;me.length!==R.cameras.length&&(R.cameras.length=0,ye=!0);for(let Se=0;Se<me.length;Se++){const Fe=me[Se];let ve=null;if(S!==null)ve=S.getViewport(Fe);else{const ze=g.getViewSubImage(y,Fe);ve=ze.viewport,Se===0&&(e.setRenderTargetTextures(v,ze.colorTexture,y.ignoreDepthValues?void 0:ze.depthStencilTexture),e.setRenderTarget(v))}let Ae=ne[Se];Ae===void 0&&(Ae=new $n,Ae.layers.enable(Se),Ae.viewport=new Bt,ne[Se]=Ae),Ae.matrix.fromArray(Fe.transform.matrix),Ae.matrix.decompose(Ae.position,Ae.quaternion,Ae.scale),Ae.projectionMatrix.fromArray(Fe.projectionMatrix),Ae.projectionMatrixInverse.copy(Ae.projectionMatrix).invert(),Ae.viewport.set(ve.x,ve.y,ve.width,ve.height),Se===0&&(R.matrix.copy(Ae.matrix),R.matrix.decompose(R.position,R.quaternion,R.scale)),ye===!0&&R.cameras.push(Ae)}}for(let me=0;me<b.length;me++){const ye=A[me],Se=b[me];ye!==null&&Se!==void 0&&Se.update(ye,ce,h||d)}Y&&Y(j,ce),ce.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ce}),E=null}const F=new Jv;F.setAnimationLoop(O),this.setAnimationLoop=function(j){Y=j},this.dispose=function(){}}}function WT(s,e){function t(x,v){x.matrixAutoUpdate===!0&&x.updateMatrix(),v.value.copy(x.matrix)}function i(x,v){v.color.getRGB(x.fogColor.value,Yv(s)),v.isFog?(x.fogNear.value=v.near,x.fogFar.value=v.far):v.isFogExp2&&(x.fogDensity.value=v.density)}function o(x,v,b,A,P){v.isMeshBasicMaterial||v.isMeshLambertMaterial?l(x,v):v.isMeshToonMaterial?(l(x,v),g(x,v)):v.isMeshPhongMaterial?(l(x,v),p(x,v)):v.isMeshStandardMaterial?(l(x,v),y(x,v),v.isMeshPhysicalMaterial&&S(x,v,P)):v.isMeshMatcapMaterial?(l(x,v),E(x,v)):v.isMeshDepthMaterial?l(x,v):v.isMeshDistanceMaterial?(l(x,v),M(x,v)):v.isMeshNormalMaterial?l(x,v):v.isLineBasicMaterial?(d(x,v),v.isLineDashedMaterial&&c(x,v)):v.isPointsMaterial?f(x,v,b,A):v.isSpriteMaterial?h(x,v):v.isShadowMaterial?(x.color.value.copy(v.color),x.opacity.value=v.opacity):v.isShaderMaterial&&(v.uniformsNeedUpdate=!1)}function l(x,v){x.opacity.value=v.opacity,v.color&&x.diffuse.value.copy(v.color),v.emissive&&x.emissive.value.copy(v.emissive).multiplyScalar(v.emissiveIntensity),v.map&&(x.map.value=v.map,t(v.map,x.mapTransform)),v.alphaMap&&(x.alphaMap.value=v.alphaMap,t(v.alphaMap,x.alphaMapTransform)),v.bumpMap&&(x.bumpMap.value=v.bumpMap,t(v.bumpMap,x.bumpMapTransform),x.bumpScale.value=v.bumpScale,v.side===Rn&&(x.bumpScale.value*=-1)),v.normalMap&&(x.normalMap.value=v.normalMap,t(v.normalMap,x.normalMapTransform),x.normalScale.value.copy(v.normalScale),v.side===Rn&&x.normalScale.value.negate()),v.displacementMap&&(x.displacementMap.value=v.displacementMap,t(v.displacementMap,x.displacementMapTransform),x.displacementScale.value=v.displacementScale,x.displacementBias.value=v.displacementBias),v.emissiveMap&&(x.emissiveMap.value=v.emissiveMap,t(v.emissiveMap,x.emissiveMapTransform)),v.specularMap&&(x.specularMap.value=v.specularMap,t(v.specularMap,x.specularMapTransform)),v.alphaTest>0&&(x.alphaTest.value=v.alphaTest);const b=e.get(v).envMap;if(b&&(x.envMap.value=b,x.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,x.reflectivity.value=v.reflectivity,x.ior.value=v.ior,x.refractionRatio.value=v.refractionRatio),v.lightMap){x.lightMap.value=v.lightMap;const A=s._useLegacyLights===!0?Math.PI:1;x.lightMapIntensity.value=v.lightMapIntensity*A,t(v.lightMap,x.lightMapTransform)}v.aoMap&&(x.aoMap.value=v.aoMap,x.aoMapIntensity.value=v.aoMapIntensity,t(v.aoMap,x.aoMapTransform))}function d(x,v){x.diffuse.value.copy(v.color),x.opacity.value=v.opacity,v.map&&(x.map.value=v.map,t(v.map,x.mapTransform))}function c(x,v){x.dashSize.value=v.dashSize,x.totalSize.value=v.dashSize+v.gapSize,x.scale.value=v.scale}function f(x,v,b,A){x.diffuse.value.copy(v.color),x.opacity.value=v.opacity,x.size.value=v.size*b,x.scale.value=A*.5,v.map&&(x.map.value=v.map,t(v.map,x.uvTransform)),v.alphaMap&&(x.alphaMap.value=v.alphaMap,t(v.alphaMap,x.alphaMapTransform)),v.alphaTest>0&&(x.alphaTest.value=v.alphaTest)}function h(x,v){x.diffuse.value.copy(v.color),x.opacity.value=v.opacity,x.rotation.value=v.rotation,v.map&&(x.map.value=v.map,t(v.map,x.mapTransform)),v.alphaMap&&(x.alphaMap.value=v.alphaMap,t(v.alphaMap,x.alphaMapTransform)),v.alphaTest>0&&(x.alphaTest.value=v.alphaTest)}function p(x,v){x.specular.value.copy(v.specular),x.shininess.value=Math.max(v.shininess,1e-4)}function g(x,v){v.gradientMap&&(x.gradientMap.value=v.gradientMap)}function y(x,v){x.metalness.value=v.metalness,v.metalnessMap&&(x.metalnessMap.value=v.metalnessMap,t(v.metalnessMap,x.metalnessMapTransform)),x.roughness.value=v.roughness,v.roughnessMap&&(x.roughnessMap.value=v.roughnessMap,t(v.roughnessMap,x.roughnessMapTransform)),e.get(v).envMap&&(x.envMapIntensity.value=v.envMapIntensity)}function S(x,v,b){x.ior.value=v.ior,v.sheen>0&&(x.sheenColor.value.copy(v.sheenColor).multiplyScalar(v.sheen),x.sheenRoughness.value=v.sheenRoughness,v.sheenColorMap&&(x.sheenColorMap.value=v.sheenColorMap,t(v.sheenColorMap,x.sheenColorMapTransform)),v.sheenRoughnessMap&&(x.sheenRoughnessMap.value=v.sheenRoughnessMap,t(v.sheenRoughnessMap,x.sheenRoughnessMapTransform))),v.clearcoat>0&&(x.clearcoat.value=v.clearcoat,x.clearcoatRoughness.value=v.clearcoatRoughness,v.clearcoatMap&&(x.clearcoatMap.value=v.clearcoatMap,t(v.clearcoatMap,x.clearcoatMapTransform)),v.clearcoatRoughnessMap&&(x.clearcoatRoughnessMap.value=v.clearcoatRoughnessMap,t(v.clearcoatRoughnessMap,x.clearcoatRoughnessMapTransform)),v.clearcoatNormalMap&&(x.clearcoatNormalMap.value=v.clearcoatNormalMap,t(v.clearcoatNormalMap,x.clearcoatNormalMapTransform),x.clearcoatNormalScale.value.copy(v.clearcoatNormalScale),v.side===Rn&&x.clearcoatNormalScale.value.negate())),v.iridescence>0&&(x.iridescence.value=v.iridescence,x.iridescenceIOR.value=v.iridescenceIOR,x.iridescenceThicknessMinimum.value=v.iridescenceThicknessRange[0],x.iridescenceThicknessMaximum.value=v.iridescenceThicknessRange[1],v.iridescenceMap&&(x.iridescenceMap.value=v.iridescenceMap,t(v.iridescenceMap,x.iridescenceMapTransform)),v.iridescenceThicknessMap&&(x.iridescenceThicknessMap.value=v.iridescenceThicknessMap,t(v.iridescenceThicknessMap,x.iridescenceThicknessMapTransform))),v.transmission>0&&(x.transmission.value=v.transmission,x.transmissionSamplerMap.value=b.texture,x.transmissionSamplerSize.value.set(b.width,b.height),v.transmissionMap&&(x.transmissionMap.value=v.transmissionMap,t(v.transmissionMap,x.transmissionMapTransform)),x.thickness.value=v.thickness,v.thicknessMap&&(x.thicknessMap.value=v.thicknessMap,t(v.thicknessMap,x.thicknessMapTransform)),x.attenuationDistance.value=v.attenuationDistance,x.attenuationColor.value.copy(v.attenuationColor)),v.anisotropy>0&&(x.anisotropyVector.value.set(v.anisotropy*Math.cos(v.anisotropyRotation),v.anisotropy*Math.sin(v.anisotropyRotation)),v.anisotropyMap&&(x.anisotropyMap.value=v.anisotropyMap,t(v.anisotropyMap,x.anisotropyMapTransform))),x.specularIntensity.value=v.specularIntensity,x.specularColor.value.copy(v.specularColor),v.specularColorMap&&(x.specularColorMap.value=v.specularColorMap,t(v.specularColorMap,x.specularColorMapTransform)),v.specularIntensityMap&&(x.specularIntensityMap.value=v.specularIntensityMap,t(v.specularIntensityMap,x.specularIntensityMapTransform))}function E(x,v){v.matcap&&(x.matcap.value=v.matcap)}function M(x,v){const b=e.get(v).light;x.referencePosition.value.setFromMatrixPosition(b.matrixWorld),x.nearDistance.value=b.shadow.camera.near,x.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:o}}function jT(s,e,t,i){let o={},l={},d=[];const c=t.isWebGL2?s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS):0;function f(b,A){const P=A.program;i.uniformBlockBinding(b,P)}function h(b,A){let P=o[b.id];P===void 0&&(E(b),P=p(b),o[b.id]=P,b.addEventListener("dispose",x));const z=A.program;i.updateUBOMapping(b,z);const D=e.render.frame;l[b.id]!==D&&(y(b),l[b.id]=D)}function p(b){const A=g();b.__bindingPointIndex=A;const P=s.createBuffer(),z=b.__size,D=b.usage;return s.bindBuffer(s.UNIFORM_BUFFER,P),s.bufferData(s.UNIFORM_BUFFER,z,D),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,A,P),P}function g(){for(let b=0;b<c;b++)if(d.indexOf(b)===-1)return d.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function y(b){const A=o[b.id],P=b.uniforms,z=b.__cache;s.bindBuffer(s.UNIFORM_BUFFER,A);for(let D=0,I=P.length;D<I;D++){const ne=Array.isArray(P[D])?P[D]:[P[D]];for(let R=0,U=ne.length;R<U;R++){const se=ne[R];if(S(se,D,R,z)===!0){const le=se.__offset,ge=Array.isArray(se.value)?se.value:[se.value];let V=0;for(let J=0;J<ge.length;J++){const te=ge[J],q=M(te);typeof te=="number"||typeof te=="boolean"?(se.__data[0]=te,s.bufferSubData(s.UNIFORM_BUFFER,le+V,se.__data)):te.isMatrix3?(se.__data[0]=te.elements[0],se.__data[1]=te.elements[1],se.__data[2]=te.elements[2],se.__data[3]=0,se.__data[4]=te.elements[3],se.__data[5]=te.elements[4],se.__data[6]=te.elements[5],se.__data[7]=0,se.__data[8]=te.elements[6],se.__data[9]=te.elements[7],se.__data[10]=te.elements[8],se.__data[11]=0):(te.toArray(se.__data,V),V+=q.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,le,se.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function S(b,A,P,z){const D=b.value,I=A+"_"+P;if(z[I]===void 0)return typeof D=="number"||typeof D=="boolean"?z[I]=D:z[I]=D.clone(),!0;{const ne=z[I];if(typeof D=="number"||typeof D=="boolean"){if(ne!==D)return z[I]=D,!0}else if(ne.equals(D)===!1)return ne.copy(D),!0}return!1}function E(b){const A=b.uniforms;let P=0;const z=16;for(let I=0,ne=A.length;I<ne;I++){const R=Array.isArray(A[I])?A[I]:[A[I]];for(let U=0,se=R.length;U<se;U++){const le=R[U],ge=Array.isArray(le.value)?le.value:[le.value];for(let V=0,J=ge.length;V<J;V++){const te=ge[V],q=M(te),X=P%z;X!==0&&z-X<q.boundary&&(P+=z-X),le.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),le.__offset=P,P+=q.storage}}}const D=P%z;return D>0&&(P+=z-D),b.__size=P,b.__cache={},this}function M(b){const A={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(A.boundary=4,A.storage=4):b.isVector2?(A.boundary=8,A.storage=8):b.isVector3||b.isColor?(A.boundary=16,A.storage=12):b.isVector4?(A.boundary=16,A.storage=16):b.isMatrix3?(A.boundary=48,A.storage=48):b.isMatrix4?(A.boundary=64,A.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),A}function x(b){const A=b.target;A.removeEventListener("dispose",x);const P=d.indexOf(A.__bindingPointIndex);d.splice(P,1),s.deleteBuffer(o[A.id]),delete o[A.id],delete l[A.id]}function v(){for(const b in o)s.deleteBuffer(o[b]);d=[],o={},l={}}return{bind:f,update:h,dispose:v}}class s0{constructor(e={}){const{canvas:t=HS(),context:i=null,depth:o=!0,stencil:l=!0,alpha:d=!1,antialias:c=!1,premultipliedAlpha:f=!0,preserveDrawingBuffer:h=!1,powerPreference:p="default",failIfMajorPerformanceCaveat:g=!1}=e;this.isWebGLRenderer=!0;let y;i!==null?y=i.getContextAttributes().alpha:y=d;const S=new Uint32Array(4),E=new Int32Array(4);let M=null,x=null;const v=[],b=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=dn,this._useLegacyLights=!1,this.toneMapping=Rr,this.toneMappingExposure=1;const A=this;let P=!1,z=0,D=0,I=null,ne=-1,R=null;const U=new Bt,se=new Bt;let le=null;const ge=new Et(0);let V=0,J=t.width,te=t.height,q=1,X=null,K=null;const Y=new Bt(0,0,J,te),O=new Bt(0,0,J,te);let F=!1;const j=new yf;let ce=!1,me=!1,ye=null;const Se=new Ht,Fe=new Be,ve=new B,Ae={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function ze(){return I===null?q:1}let Q=i;function nt(N,ee){for(let fe=0;fe<N.length;fe++){const he=N[fe],de=t.getContext(he,ee);if(de!==null)return de}return null}try{const N={alpha:!0,depth:o,stencil:l,antialias:c,premultipliedAlpha:f,preserveDrawingBuffer:h,powerPreference:p,failIfMajorPerformanceCaveat:g};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${mf}`),t.addEventListener("webglcontextlost",Le,!1),t.addEventListener("webglcontextrestored",G,!1),t.addEventListener("webglcontextcreationerror",Pe,!1),Q===null){const ee=["webgl2","webgl","experimental-webgl"];if(A.isWebGL1Renderer===!0&&ee.shift(),Q=nt(ee,N),Q===null)throw nt(ee)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&Q instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),Q.getShaderPrecisionFormat===void 0&&(Q.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(N){throw console.error("THREE.WebGLRenderer: "+N.message),N}let ke,Qe,Ve,wt,ot,L,C,oe,we,Me,be,Je,Ie,He,qe,rt,xe,mt,H,_e,Ue,Re,$e,dt;function gt(){ke=new tw(Q),Qe=new q1(Q,ke,e),ke.init(Qe),Re=new BT(Q,ke,Qe),Ve=new kT(Q,ke,Qe),wt=new rw(Q),ot=new wT,L=new zT(Q,ke,Ve,ot,Qe,Re,wt),C=new J1(A),oe=new ew(A),we=new fM(Q,Qe),$e=new $1(Q,ke,we,Qe),Me=new nw(Q,we,wt,$e),be=new lw(Q,Me,we,wt),H=new aw(Q,Qe,L),rt=new K1(ot),Je=new ET(A,C,oe,ke,Qe,$e,rt),Ie=new WT(A,ot),He=new bT,qe=new NT(ke,Qe),mt=new X1(A,C,oe,Ve,be,y,f),xe=new FT(A,be,Qe),dt=new jT(Q,wt,Qe,Ve),_e=new Y1(Q,ke,wt,Qe),Ue=new iw(Q,ke,wt,Qe),wt.programs=Je.programs,A.capabilities=Qe,A.extensions=ke,A.properties=ot,A.renderLists=He,A.shadowMap=xe,A.state=Ve,A.info=wt}gt();const st=new GT(A,Q);this.xr=st,this.getContext=function(){return Q},this.getContextAttributes=function(){return Q.getContextAttributes()},this.forceContextLoss=function(){const N=ke.get("WEBGL_lose_context");N&&N.loseContext()},this.forceContextRestore=function(){const N=ke.get("WEBGL_lose_context");N&&N.restoreContext()},this.getPixelRatio=function(){return q},this.setPixelRatio=function(N){N!==void 0&&(q=N,this.setSize(J,te,!1))},this.getSize=function(N){return N.set(J,te)},this.setSize=function(N,ee,fe=!0){if(st.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}J=N,te=ee,t.width=Math.floor(N*q),t.height=Math.floor(ee*q),fe===!0&&(t.style.width=N+"px",t.style.height=ee+"px"),this.setViewport(0,0,N,ee)},this.getDrawingBufferSize=function(N){return N.set(J*q,te*q).floor()},this.setDrawingBufferSize=function(N,ee,fe){J=N,te=ee,q=fe,t.width=Math.floor(N*fe),t.height=Math.floor(ee*fe),this.setViewport(0,0,N,ee)},this.getCurrentViewport=function(N){return N.copy(U)},this.getViewport=function(N){return N.copy(Y)},this.setViewport=function(N,ee,fe,he){N.isVector4?Y.set(N.x,N.y,N.z,N.w):Y.set(N,ee,fe,he),Ve.viewport(U.copy(Y).multiplyScalar(q).floor())},this.getScissor=function(N){return N.copy(O)},this.setScissor=function(N,ee,fe,he){N.isVector4?O.set(N.x,N.y,N.z,N.w):O.set(N,ee,fe,he),Ve.scissor(se.copy(O).multiplyScalar(q).floor())},this.getScissorTest=function(){return F},this.setScissorTest=function(N){Ve.setScissorTest(F=N)},this.setOpaqueSort=function(N){X=N},this.setTransparentSort=function(N){K=N},this.getClearColor=function(N){return N.copy(mt.getClearColor())},this.setClearColor=function(){mt.setClearColor.apply(mt,arguments)},this.getClearAlpha=function(){return mt.getClearAlpha()},this.setClearAlpha=function(){mt.setClearAlpha.apply(mt,arguments)},this.clear=function(N=!0,ee=!0,fe=!0){let he=0;if(N){let de=!1;if(I!==null){const Ge=I.texture.format;de=Ge===Iv||Ge===Uv||Ge===Dv}if(de){const Ge=I.texture.type,it=Ge===Pr||Ge===wr||Ge===gf||Ge===is||Ge===Lv||Ge===Nv,ct=mt.getClearColor(),Xe=mt.getClearAlpha(),vt=ct.r,ft=ct.g,pt=ct.b;it?(S[0]=vt,S[1]=ft,S[2]=pt,S[3]=Xe,Q.clearBufferuiv(Q.COLOR,0,S)):(E[0]=vt,E[1]=ft,E[2]=pt,E[3]=Xe,Q.clearBufferiv(Q.COLOR,0,E))}else he|=Q.COLOR_BUFFER_BIT}ee&&(he|=Q.DEPTH_BUFFER_BIT),fe&&(he|=Q.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),Q.clear(he)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Le,!1),t.removeEventListener("webglcontextrestored",G,!1),t.removeEventListener("webglcontextcreationerror",Pe,!1),He.dispose(),qe.dispose(),ot.dispose(),C.dispose(),oe.dispose(),be.dispose(),$e.dispose(),dt.dispose(),Je.dispose(),st.dispose(),st.removeEventListener("sessionstart",Tt),st.removeEventListener("sessionend",yt),ye&&(ye.dispose(),ye=null),$t.stop()};function Le(N){N.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),P=!0}function G(){console.log("THREE.WebGLRenderer: Context Restored."),P=!1;const N=wt.autoReset,ee=xe.enabled,fe=xe.autoUpdate,he=xe.needsUpdate,de=xe.type;gt(),wt.autoReset=N,xe.enabled=ee,xe.autoUpdate=fe,xe.needsUpdate=he,xe.type=de}function Pe(N){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",N.statusMessage)}function Ne(N){const ee=N.target;ee.removeEventListener("dispose",Ne),ae(ee)}function ae(N){pe(N),ot.remove(N)}function pe(N){const ee=ot.get(N).programs;ee!==void 0&&(ee.forEach(function(fe){Je.releaseProgram(fe)}),N.isShaderMaterial&&Je.releaseShaderCache(N))}this.renderBufferDirect=function(N,ee,fe,he,de,Ge){ee===null&&(ee=Ae);const it=de.isMesh&&de.matrixWorld.determinant()<0,ct=Tc(N,ee,fe,he,de);Ve.setMaterial(he,it);let Xe=fe.index,vt=1;if(he.wireframe===!0){if(Xe=Me.getWireframeAttribute(fe),Xe===void 0)return;vt=2}const ft=fe.drawRange,pt=fe.attributes.position;let Nt=ft.start*vt,Mn=(ft.start+ft.count)*vt;Ge!==null&&(Nt=Math.max(Nt,Ge.start*vt),Mn=Math.min(Mn,(Ge.start+Ge.count)*vt)),Xe!==null?(Nt=Math.max(Nt,0),Mn=Math.min(Mn,Xe.count)):pt!=null&&(Nt=Math.max(Nt,0),Mn=Math.min(Mn,pt.count));const Yt=Mn-Nt;if(Yt<0||Yt===1/0)return;$e.setup(de,he,ct,fe,Xe);let Pn,bt=_e;if(Xe!==null&&(Pn=we.get(Xe),bt=Ue,bt.setIndex(Pn)),de.isMesh)he.wireframe===!0?(Ve.setLineWidth(he.wireframeLinewidth*ze()),bt.setMode(Q.LINES)):bt.setMode(Q.TRIANGLES);else if(de.isLine){let xt=he.linewidth;xt===void 0&&(xt=1),Ve.setLineWidth(xt*ze()),de.isLineSegments?bt.setMode(Q.LINES):de.isLineLoop?bt.setMode(Q.LINE_LOOP):bt.setMode(Q.LINE_STRIP)}else de.isPoints?bt.setMode(Q.POINTS):de.isSprite&&bt.setMode(Q.TRIANGLES);if(de.isBatchedMesh)bt.renderMultiDraw(de._multiDrawStarts,de._multiDrawCounts,de._multiDrawCount);else if(de.isInstancedMesh)bt.renderInstances(Nt,Yt,de.count);else if(fe.isInstancedBufferGeometry){const xt=fe._maxInstanceCount!==void 0?fe._maxInstanceCount:1/0,En=Math.min(fe.instanceCount,xt);bt.renderInstances(Nt,Yt,En)}else bt.render(Nt,Yt)};function tt(N,ee,fe){N.transparent===!0&&N.side===wi&&N.forceSinglePass===!1?(N.side=Rn,N.needsUpdate=!0,qi(N,ee,fe),N.side=Dr,N.needsUpdate=!0,qi(N,ee,fe),N.side=wi):qi(N,ee,fe)}this.compile=function(N,ee,fe=null){fe===null&&(fe=N),x=qe.get(fe),x.init(),b.push(x),fe.traverseVisible(function(de){de.isLight&&de.layers.test(ee.layers)&&(x.pushLight(de),de.castShadow&&x.pushShadow(de))}),N!==fe&&N.traverseVisible(function(de){de.isLight&&de.layers.test(ee.layers)&&(x.pushLight(de),de.castShadow&&x.pushShadow(de))}),x.setupLights(A._useLegacyLights);const he=new Set;return N.traverse(function(de){const Ge=de.material;if(Ge)if(Array.isArray(Ge))for(let it=0;it<Ge.length;it++){const ct=Ge[it];tt(ct,fe,de),he.add(ct)}else tt(Ge,fe,de),he.add(Ge)}),b.pop(),x=null,he},this.compileAsync=function(N,ee,fe=null){const he=this.compile(N,ee,fe);return new Promise(de=>{function Ge(){if(he.forEach(function(it){ot.get(it).currentProgram.isReady()&&he.delete(it)}),he.size===0){de(N);return}setTimeout(Ge,10)}ke.get("KHR_parallel_shader_compile")!==null?Ge():setTimeout(Ge,10)})};let je=null;function ht(N){je&&je(N)}function Tt(){$t.stop()}function yt(){$t.start()}const $t=new Jv;$t.setAnimationLoop(ht),typeof self<"u"&&$t.setContext(self),this.setAnimationLoop=function(N){je=N,st.setAnimationLoop(N),N===null?$t.stop():$t.start()},st.addEventListener("sessionstart",Tt),st.addEventListener("sessionend",yt),this.render=function(N,ee){if(ee!==void 0&&ee.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),ee.parent===null&&ee.matrixWorldAutoUpdate===!0&&ee.updateMatrixWorld(),st.enabled===!0&&st.isPresenting===!0&&(st.cameraAutoUpdate===!0&&st.updateCamera(ee),ee=st.getCamera()),N.isScene===!0&&N.onBeforeRender(A,N,ee,I),x=qe.get(N,b.length),x.init(),b.push(x),Se.multiplyMatrices(ee.projectionMatrix,ee.matrixWorldInverse),j.setFromProjectionMatrix(Se),me=this.localClippingEnabled,ce=rt.init(this.clippingPlanes,me),M=He.get(N,v.length),M.init(),v.push(M),pn(N,ee,0,A.sortObjects),M.finish(),A.sortObjects===!0&&M.sort(X,K),this.info.render.frame++,ce===!0&&rt.beginShadows();const fe=x.state.shadowsArray;if(xe.render(fe,N,ee),ce===!0&&rt.endShadows(),this.info.autoReset===!0&&this.info.reset(),mt.render(M,N),x.setupLights(A._useLegacyLights),ee.isArrayCamera){const he=ee.cameras;for(let de=0,Ge=he.length;de<Ge;de++){const it=he[de];ga(M,N,it,it.viewport)}}else ga(M,N,ee);I!==null&&(L.updateMultisampleRenderTarget(I),L.updateRenderTargetMipmap(I)),N.isScene===!0&&N.onAfterRender(A,N,ee),$e.resetDefaultState(),ne=-1,R=null,b.pop(),b.length>0?x=b[b.length-1]:x=null,v.pop(),v.length>0?M=v[v.length-1]:M=null};function pn(N,ee,fe,he){if(N.visible===!1)return;if(N.layers.test(ee.layers)){if(N.isGroup)fe=N.renderOrder;else if(N.isLOD)N.autoUpdate===!0&&N.update(ee);else if(N.isLight)x.pushLight(N),N.castShadow&&x.pushShadow(N);else if(N.isSprite){if(!N.frustumCulled||j.intersectsSprite(N)){he&&ve.setFromMatrixPosition(N.matrixWorld).applyMatrix4(Se);const it=be.update(N),ct=N.material;ct.visible&&M.push(N,it,ct,fe,ve.z,null)}}else if((N.isMesh||N.isLine||N.isPoints)&&(!N.frustumCulled||j.intersectsObject(N))){const it=be.update(N),ct=N.material;if(he&&(N.boundingSphere!==void 0?(N.boundingSphere===null&&N.computeBoundingSphere(),ve.copy(N.boundingSphere.center)):(it.boundingSphere===null&&it.computeBoundingSphere(),ve.copy(it.boundingSphere.center)),ve.applyMatrix4(N.matrixWorld).applyMatrix4(Se)),Array.isArray(ct)){const Xe=it.groups;for(let vt=0,ft=Xe.length;vt<ft;vt++){const pt=Xe[vt],Nt=ct[pt.materialIndex];Nt&&Nt.visible&&M.push(N,it,Nt,fe,ve.z,pt)}}else ct.visible&&M.push(N,it,ct,fe,ve.z,null)}}const Ge=N.children;for(let it=0,ct=Ge.length;it<ct;it++)pn(Ge[it],ee,fe,he)}function ga(N,ee,fe,he){const de=N.opaque,Ge=N.transmissive,it=N.transparent;x.setupLightsView(fe),ce===!0&&rt.setGlobalState(A.clippingPlanes,fe),Ge.length>0&&Ur(de,Ge,ee,fe),he&&Ve.viewport(U.copy(he)),de.length>0&&Ci(de,ee,fe),Ge.length>0&&Ci(Ge,ee,fe),it.length>0&&Ci(it,ee,fe),Ve.buffers.depth.setTest(!0),Ve.buffers.depth.setMask(!0),Ve.buffers.color.setMask(!0),Ve.setPolygonOffset(!1)}function Ur(N,ee,fe,he){if((fe.isScene===!0?fe.overrideMaterial:null)!==null)return;const Ge=Qe.isWebGL2;ye===null&&(ye=new as(1,1,{generateMipmaps:!0,type:ke.has("EXT_color_buffer_half_float")?ua:Pr,minFilter:ca,samples:Ge?4:0})),A.getDrawingBufferSize(Fe),Ge?ye.setSize(Fe.x,Fe.y):ye.setSize(lc(Fe.x),lc(Fe.y));const it=A.getRenderTarget();A.setRenderTarget(ye),A.getClearColor(ge),V=A.getClearAlpha(),V<1&&A.setClearColor(16777215,.5),A.clear();const ct=A.toneMapping;A.toneMapping=Rr,Ci(N,fe,he),L.updateMultisampleRenderTarget(ye),L.updateRenderTargetMipmap(ye);let Xe=!1;for(let vt=0,ft=ee.length;vt<ft;vt++){const pt=ee[vt],Nt=pt.object,Mn=pt.geometry,Yt=pt.material,Pn=pt.group;if(Yt.side===wi&&Nt.layers.test(he.layers)){const bt=Yt.side;Yt.side=Rn,Yt.needsUpdate=!0,Ir(Nt,fe,he,Mn,Yt,Pn),Yt.side=bt,Yt.needsUpdate=!0,Xe=!0}}Xe===!0&&(L.updateMultisampleRenderTarget(ye),L.updateRenderTargetMipmap(ye)),A.setRenderTarget(it),A.setClearColor(ge,V),A.toneMapping=ct}function Ci(N,ee,fe){const he=ee.isScene===!0?ee.overrideMaterial:null;for(let de=0,Ge=N.length;de<Ge;de++){const it=N[de],ct=it.object,Xe=it.geometry,vt=he===null?it.material:he,ft=it.group;ct.layers.test(fe.layers)&&Ir(ct,ee,fe,Xe,vt,ft)}}function Ir(N,ee,fe,he,de,Ge){N.onBeforeRender(A,ee,fe,he,de,Ge),N.modelViewMatrix.multiplyMatrices(fe.matrixWorldInverse,N.matrixWorld),N.normalMatrix.getNormalMatrix(N.modelViewMatrix),de.onBeforeRender(A,ee,fe,he,N,Ge),de.transparent===!0&&de.side===wi&&de.forceSinglePass===!1?(de.side=Rn,de.needsUpdate=!0,A.renderBufferDirect(fe,ee,he,de,N,Ge),de.side=Dr,de.needsUpdate=!0,A.renderBufferDirect(fe,ee,he,de,N,Ge),de.side=wi):A.renderBufferDirect(fe,ee,he,de,N,Ge),N.onAfterRender(A,ee,fe,he,de,Ge)}function qi(N,ee,fe){ee.isScene!==!0&&(ee=Ae);const he=ot.get(N),de=x.state.lights,Ge=x.state.shadowsArray,it=de.state.version,ct=Je.getParameters(N,de.state,Ge,ee,fe),Xe=Je.getProgramCacheKey(ct);let vt=he.programs;he.environment=N.isMeshStandardMaterial?ee.environment:null,he.fog=ee.fog,he.envMap=(N.isMeshStandardMaterial?oe:C).get(N.envMap||he.environment),vt===void 0&&(N.addEventListener("dispose",Ne),vt=new Map,he.programs=vt);let ft=vt.get(Xe);if(ft!==void 0){if(he.currentProgram===ft&&he.lightsStateVersion===it)return xa(N,ct),ft}else ct.uniforms=Je.getUniforms(N),N.onBuild(fe,ct,A),N.onBeforeCompile(ct,A),ft=Je.acquireProgram(ct,Xe),vt.set(Xe,ft),he.uniforms=ct.uniforms;const pt=he.uniforms;return(!N.isShaderMaterial&&!N.isRawShaderMaterial||N.clipping===!0)&&(pt.clippingPlanes=rt.uniform),xa(N,ct),he.needsLights=_a(N),he.lightsStateVersion=it,he.needsLights&&(pt.ambientLightColor.value=de.state.ambient,pt.lightProbe.value=de.state.probe,pt.directionalLights.value=de.state.directional,pt.directionalLightShadows.value=de.state.directionalShadow,pt.spotLights.value=de.state.spot,pt.spotLightShadows.value=de.state.spotShadow,pt.rectAreaLights.value=de.state.rectArea,pt.ltc_1.value=de.state.rectAreaLTC1,pt.ltc_2.value=de.state.rectAreaLTC2,pt.pointLights.value=de.state.point,pt.pointLightShadows.value=de.state.pointShadow,pt.hemisphereLights.value=de.state.hemi,pt.directionalShadowMap.value=de.state.directionalShadowMap,pt.directionalShadowMatrix.value=de.state.directionalShadowMatrix,pt.spotShadowMap.value=de.state.spotShadowMap,pt.spotLightMatrix.value=de.state.spotLightMatrix,pt.spotLightMap.value=de.state.spotLightMap,pt.pointShadowMap.value=de.state.pointShadowMap,pt.pointShadowMatrix.value=de.state.pointShadowMatrix),he.currentProgram=ft,he.uniformsList=null,ft}function va(N){if(N.uniformsList===null){const ee=N.currentProgram.getUniforms();N.uniformsList=Ql.seqWithValue(ee.seq,N.uniforms)}return N.uniformsList}function xa(N,ee){const fe=ot.get(N);fe.outputColorSpace=ee.outputColorSpace,fe.batching=ee.batching,fe.instancing=ee.instancing,fe.instancingColor=ee.instancingColor,fe.skinning=ee.skinning,fe.morphTargets=ee.morphTargets,fe.morphNormals=ee.morphNormals,fe.morphColors=ee.morphColors,fe.morphTargetsCount=ee.morphTargetsCount,fe.numClippingPlanes=ee.numClippingPlanes,fe.numIntersection=ee.numClipIntersection,fe.vertexAlphas=ee.vertexAlphas,fe.vertexTangents=ee.vertexTangents,fe.toneMapping=ee.toneMapping}function Tc(N,ee,fe,he,de){ee.isScene!==!0&&(ee=Ae),L.resetTextureUnits();const Ge=ee.fog,it=he.isMeshStandardMaterial?ee.environment:null,ct=I===null?A.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:Xi,Xe=(he.isMeshStandardMaterial?oe:C).get(he.envMap||it),vt=he.vertexColors===!0&&!!fe.attributes.color&&fe.attributes.color.itemSize===4,ft=!!fe.attributes.tangent&&(!!he.normalMap||he.anisotropy>0),pt=!!fe.morphAttributes.position,Nt=!!fe.morphAttributes.normal,Mn=!!fe.morphAttributes.color;let Yt=Rr;he.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(Yt=A.toneMapping);const Pn=fe.morphAttributes.position||fe.morphAttributes.normal||fe.morphAttributes.color,bt=Pn!==void 0?Pn.length:0,xt=ot.get(he),En=x.state.lights;if(ce===!0&&(me===!0||N!==R)){const Ln=N===R&&he.id===ne;rt.setState(he,N,Ln)}let kt=!1;he.version===xt.__version?(xt.needsLights&&xt.lightsStateVersion!==En.state.version||xt.outputColorSpace!==ct||de.isBatchedMesh&&xt.batching===!1||!de.isBatchedMesh&&xt.batching===!0||de.isInstancedMesh&&xt.instancing===!1||!de.isInstancedMesh&&xt.instancing===!0||de.isSkinnedMesh&&xt.skinning===!1||!de.isSkinnedMesh&&xt.skinning===!0||de.isInstancedMesh&&xt.instancingColor===!0&&de.instanceColor===null||de.isInstancedMesh&&xt.instancingColor===!1&&de.instanceColor!==null||xt.envMap!==Xe||he.fog===!0&&xt.fog!==Ge||xt.numClippingPlanes!==void 0&&(xt.numClippingPlanes!==rt.numPlanes||xt.numIntersection!==rt.numIntersection)||xt.vertexAlphas!==vt||xt.vertexTangents!==ft||xt.morphTargets!==pt||xt.morphNormals!==Nt||xt.morphColors!==Mn||xt.toneMapping!==Yt||Qe.isWebGL2===!0&&xt.morphTargetsCount!==bt)&&(kt=!0):(kt=!0,xt.__version=he.version);let Pi=xt.currentProgram;kt===!0&&(Pi=qi(he,ee,de));let ya=!1,xi=!1,Ki=!1;const jt=Pi.getUniforms(),qn=xt.uniforms;if(Ve.useProgram(Pi.program)&&(ya=!0,xi=!0,Ki=!0),he.id!==ne&&(ne=he.id,xi=!0),ya||R!==N){jt.setValue(Q,"projectionMatrix",N.projectionMatrix),jt.setValue(Q,"viewMatrix",N.matrixWorldInverse);const Ln=jt.map.cameraPosition;Ln!==void 0&&Ln.setValue(Q,ve.setFromMatrixPosition(N.matrixWorld)),Qe.logarithmicDepthBuffer&&jt.setValue(Q,"logDepthBufFC",2/(Math.log(N.far+1)/Math.LN2)),(he.isMeshPhongMaterial||he.isMeshToonMaterial||he.isMeshLambertMaterial||he.isMeshBasicMaterial||he.isMeshStandardMaterial||he.isShaderMaterial)&&jt.setValue(Q,"isOrthographic",N.isOrthographicCamera===!0),R!==N&&(R=N,xi=!0,Ki=!0)}if(de.isSkinnedMesh){jt.setOptional(Q,de,"bindMatrix"),jt.setOptional(Q,de,"bindMatrixInverse");const Ln=de.skeleton;Ln&&(Qe.floatVertexTextures?(Ln.boneTexture===null&&Ln.computeBoneTexture(),jt.setValue(Q,"boneTexture",Ln.boneTexture,L)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}de.isBatchedMesh&&(jt.setOptional(Q,de,"batchingTexture"),jt.setValue(Q,"batchingTexture",de._matricesTexture,L));const xo=fe.morphAttributes;if((xo.position!==void 0||xo.normal!==void 0||xo.color!==void 0&&Qe.isWebGL2===!0)&&H.update(de,fe,Pi),(xi||xt.receiveShadow!==de.receiveShadow)&&(xt.receiveShadow=de.receiveShadow,jt.setValue(Q,"receiveShadow",de.receiveShadow)),he.isMeshGouraudMaterial&&he.envMap!==null&&(qn.envMap.value=Xe,qn.flipEnvMap.value=Xe.isCubeTexture&&Xe.isRenderTargetTexture===!1?-1:1),xi&&(jt.setValue(Q,"toneMappingExposure",A.toneMappingExposure),xt.needsLights&&Ri(qn,Ki),Ge&&he.fog===!0&&Ie.refreshFogUniforms(qn,Ge),Ie.refreshMaterialUniforms(qn,he,q,te,ye),Ql.upload(Q,va(xt),qn,L)),he.isShaderMaterial&&he.uniformsNeedUpdate===!0&&(Ql.upload(Q,va(xt),qn,L),he.uniformsNeedUpdate=!1),he.isSpriteMaterial&&jt.setValue(Q,"center",de.center),jt.setValue(Q,"modelViewMatrix",de.modelViewMatrix),jt.setValue(Q,"normalMatrix",de.normalMatrix),jt.setValue(Q,"modelMatrix",de.matrixWorld),he.isShaderMaterial||he.isRawShaderMaterial){const Ln=he.uniformsGroups;for(let Or=0,Sa=Ln.length;Or<Sa;Or++)if(Qe.isWebGL2){const us=Ln[Or];dt.update(us,Pi),dt.bind(us,Pi)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Pi}function Ri(N,ee){N.ambientLightColor.needsUpdate=ee,N.lightProbe.needsUpdate=ee,N.directionalLights.needsUpdate=ee,N.directionalLightShadows.needsUpdate=ee,N.pointLights.needsUpdate=ee,N.pointLightShadows.needsUpdate=ee,N.spotLights.needsUpdate=ee,N.spotLightShadows.needsUpdate=ee,N.rectAreaLights.needsUpdate=ee,N.hemisphereLights.needsUpdate=ee}function _a(N){return N.isMeshLambertMaterial||N.isMeshToonMaterial||N.isMeshPhongMaterial||N.isMeshStandardMaterial||N.isShadowMaterial||N.isShaderMaterial&&N.lights===!0}this.getActiveCubeFace=function(){return z},this.getActiveMipmapLevel=function(){return D},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(N,ee,fe){ot.get(N.texture).__webglTexture=ee,ot.get(N.depthTexture).__webglTexture=fe;const he=ot.get(N);he.__hasExternalTextures=!0,he.__hasExternalTextures&&(he.__autoAllocateDepthBuffer=fe===void 0,he.__autoAllocateDepthBuffer||ke.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),he.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(N,ee){const fe=ot.get(N);fe.__webglFramebuffer=ee,fe.__useDefaultFramebuffer=ee===void 0},this.setRenderTarget=function(N,ee=0,fe=0){I=N,z=ee,D=fe;let he=!0,de=null,Ge=!1,it=!1;if(N){const Xe=ot.get(N);Xe.__useDefaultFramebuffer!==void 0?(Ve.bindFramebuffer(Q.FRAMEBUFFER,null),he=!1):Xe.__webglFramebuffer===void 0?L.setupRenderTarget(N):Xe.__hasExternalTextures&&L.rebindTextures(N,ot.get(N.texture).__webglTexture,ot.get(N.depthTexture).__webglTexture);const vt=N.texture;(vt.isData3DTexture||vt.isDataArrayTexture||vt.isCompressedArrayTexture)&&(it=!0);const ft=ot.get(N).__webglFramebuffer;N.isWebGLCubeRenderTarget?(Array.isArray(ft[ee])?de=ft[ee][fe]:de=ft[ee],Ge=!0):Qe.isWebGL2&&N.samples>0&&L.useMultisampledRTT(N)===!1?de=ot.get(N).__webglMultisampledFramebuffer:Array.isArray(ft)?de=ft[fe]:de=ft,U.copy(N.viewport),se.copy(N.scissor),le=N.scissorTest}else U.copy(Y).multiplyScalar(q).floor(),se.copy(O).multiplyScalar(q).floor(),le=F;if(Ve.bindFramebuffer(Q.FRAMEBUFFER,de)&&Qe.drawBuffers&&he&&Ve.drawBuffers(N,de),Ve.viewport(U),Ve.scissor(se),Ve.setScissorTest(le),Ge){const Xe=ot.get(N.texture);Q.framebufferTexture2D(Q.FRAMEBUFFER,Q.COLOR_ATTACHMENT0,Q.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Xe.__webglTexture,fe)}else if(it){const Xe=ot.get(N.texture),vt=ee||0;Q.framebufferTextureLayer(Q.FRAMEBUFFER,Q.COLOR_ATTACHMENT0,Xe.__webglTexture,fe||0,vt)}ne=-1},this.readRenderTargetPixels=function(N,ee,fe,he,de,Ge,it){if(!(N&&N.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ct=ot.get(N).__webglFramebuffer;if(N.isWebGLCubeRenderTarget&&it!==void 0&&(ct=ct[it]),ct){Ve.bindFramebuffer(Q.FRAMEBUFFER,ct);try{const Xe=N.texture,vt=Xe.format,ft=Xe.type;if(vt!==gi&&Re.convert(vt)!==Q.getParameter(Q.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const pt=ft===ua&&(ke.has("EXT_color_buffer_half_float")||Qe.isWebGL2&&ke.has("EXT_color_buffer_float"));if(ft!==Pr&&Re.convert(ft)!==Q.getParameter(Q.IMPLEMENTATION_COLOR_READ_TYPE)&&!(ft===Tr&&(Qe.isWebGL2||ke.has("OES_texture_float")||ke.has("WEBGL_color_buffer_float")))&&!pt){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}ee>=0&&ee<=N.width-he&&fe>=0&&fe<=N.height-de&&Q.readPixels(ee,fe,he,de,Re.convert(vt),Re.convert(ft),Ge)}finally{const Xe=I!==null?ot.get(I).__webglFramebuffer:null;Ve.bindFramebuffer(Q.FRAMEBUFFER,Xe)}}},this.copyFramebufferToTexture=function(N,ee,fe=0){const he=Math.pow(2,-fe),de=Math.floor(ee.image.width*he),Ge=Math.floor(ee.image.height*he);L.setTexture2D(ee,0),Q.copyTexSubImage2D(Q.TEXTURE_2D,fe,0,0,N.x,N.y,de,Ge),Ve.unbindTexture()},this.copyTextureToTexture=function(N,ee,fe,he=0){const de=ee.image.width,Ge=ee.image.height,it=Re.convert(fe.format),ct=Re.convert(fe.type);L.setTexture2D(fe,0),Q.pixelStorei(Q.UNPACK_FLIP_Y_WEBGL,fe.flipY),Q.pixelStorei(Q.UNPACK_PREMULTIPLY_ALPHA_WEBGL,fe.premultiplyAlpha),Q.pixelStorei(Q.UNPACK_ALIGNMENT,fe.unpackAlignment),ee.isDataTexture?Q.texSubImage2D(Q.TEXTURE_2D,he,N.x,N.y,de,Ge,it,ct,ee.image.data):ee.isCompressedTexture?Q.compressedTexSubImage2D(Q.TEXTURE_2D,he,N.x,N.y,ee.mipmaps[0].width,ee.mipmaps[0].height,it,ee.mipmaps[0].data):Q.texSubImage2D(Q.TEXTURE_2D,he,N.x,N.y,it,ct,ee.image),he===0&&fe.generateMipmaps&&Q.generateMipmap(Q.TEXTURE_2D),Ve.unbindTexture()},this.copyTextureToTexture3D=function(N,ee,fe,he,de=0){if(A.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const Ge=N.max.x-N.min.x+1,it=N.max.y-N.min.y+1,ct=N.max.z-N.min.z+1,Xe=Re.convert(he.format),vt=Re.convert(he.type);let ft;if(he.isData3DTexture)L.setTexture3D(he,0),ft=Q.TEXTURE_3D;else if(he.isDataArrayTexture||he.isCompressedArrayTexture)L.setTexture2DArray(he,0),ft=Q.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}Q.pixelStorei(Q.UNPACK_FLIP_Y_WEBGL,he.flipY),Q.pixelStorei(Q.UNPACK_PREMULTIPLY_ALPHA_WEBGL,he.premultiplyAlpha),Q.pixelStorei(Q.UNPACK_ALIGNMENT,he.unpackAlignment);const pt=Q.getParameter(Q.UNPACK_ROW_LENGTH),Nt=Q.getParameter(Q.UNPACK_IMAGE_HEIGHT),Mn=Q.getParameter(Q.UNPACK_SKIP_PIXELS),Yt=Q.getParameter(Q.UNPACK_SKIP_ROWS),Pn=Q.getParameter(Q.UNPACK_SKIP_IMAGES),bt=fe.isCompressedTexture?fe.mipmaps[de]:fe.image;Q.pixelStorei(Q.UNPACK_ROW_LENGTH,bt.width),Q.pixelStorei(Q.UNPACK_IMAGE_HEIGHT,bt.height),Q.pixelStorei(Q.UNPACK_SKIP_PIXELS,N.min.x),Q.pixelStorei(Q.UNPACK_SKIP_ROWS,N.min.y),Q.pixelStorei(Q.UNPACK_SKIP_IMAGES,N.min.z),fe.isDataTexture||fe.isData3DTexture?Q.texSubImage3D(ft,de,ee.x,ee.y,ee.z,Ge,it,ct,Xe,vt,bt.data):fe.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),Q.compressedTexSubImage3D(ft,de,ee.x,ee.y,ee.z,Ge,it,ct,Xe,bt.data)):Q.texSubImage3D(ft,de,ee.x,ee.y,ee.z,Ge,it,ct,Xe,vt,bt),Q.pixelStorei(Q.UNPACK_ROW_LENGTH,pt),Q.pixelStorei(Q.UNPACK_IMAGE_HEIGHT,Nt),Q.pixelStorei(Q.UNPACK_SKIP_PIXELS,Mn),Q.pixelStorei(Q.UNPACK_SKIP_ROWS,Yt),Q.pixelStorei(Q.UNPACK_SKIP_IMAGES,Pn),de===0&&he.generateMipmaps&&Q.generateMipmap(ft),Ve.unbindTexture()},this.initTexture=function(N){N.isCubeTexture?L.setTextureCube(N,0):N.isData3DTexture?L.setTexture3D(N,0):N.isDataArrayTexture||N.isCompressedArrayTexture?L.setTexture2DArray(N,0):L.setTexture2D(N,0),Ve.unbindTexture()},this.resetState=function(){z=0,D=0,I=null,Ve.reset(),$e.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ji}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===vf?"display-p3":"srgb",t.unpackColorSpace=Lt.workingColorSpace===yc?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===dn?ss:Fv}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===ss?dn:Xi}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class XT extends s0{}XT.prototype.isWebGL1Renderer=!0;class Mf{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new Et(e),this.near=t,this.far=i}clone(){return new Mf(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class o0 extends rn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class af extends go{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Et(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Fg=new B,kg=new B,zg=new Ht,kd=new _f,jl=new Sc;class a0 extends rn{constructor(e=new Sn,t=new af){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let o=1,l=t.count;o<l;o++)Fg.fromBufferAttribute(t,o-1),kg.fromBufferAttribute(t,o),i[o]=i[o-1],i[o]+=Fg.distanceTo(kg);e.setAttribute("lineDistance",new Ft(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,o=this.matrixWorld,l=e.params.Line.threshold,d=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),jl.copy(i.boundingSphere),jl.applyMatrix4(o),jl.radius+=l,e.ray.intersectsSphere(jl)===!1)return;zg.copy(o).invert(),kd.copy(e.ray).applyMatrix4(zg);const c=l/((this.scale.x+this.scale.y+this.scale.z)/3),f=c*c,h=new B,p=new B,g=new B,y=new B,S=this.isLineSegments?2:1,E=i.index,x=i.attributes.position;if(E!==null){const v=Math.max(0,d.start),b=Math.min(E.count,d.start+d.count);for(let A=v,P=b-1;A<P;A+=S){const z=E.getX(A),D=E.getX(A+1);if(h.fromBufferAttribute(x,z),p.fromBufferAttribute(x,D),kd.distanceSqToSegment(h,p,y,g)>f)continue;y.applyMatrix4(this.matrixWorld);const ne=e.ray.origin.distanceTo(y);ne<e.near||ne>e.far||t.push({distance:ne,point:g.clone().applyMatrix4(this.matrixWorld),index:A,face:null,faceIndex:null,object:this})}}else{const v=Math.max(0,d.start),b=Math.min(x.count,d.start+d.count);for(let A=v,P=b-1;A<P;A+=S){if(h.fromBufferAttribute(x,A),p.fromBufferAttribute(x,A+1),kd.distanceSqToSegment(h,p,y,g)>f)continue;y.applyMatrix4(this.matrixWorld);const D=e.ray.origin.distanceTo(y);D<e.near||D>e.far||t.push({distance:D,point:g.clone().applyMatrix4(this.matrixWorld),index:A,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const o=t[i[0]];if(o!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let l=0,d=o.length;l<d;l++){const c=o[l].name||String(l);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=l}}}}}const Bg=new B,Hg=new B;class $T extends a0{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let o=0,l=t.count;o<l;o+=2)Bg.fromBufferAttribute(t,o),Hg.fromBufferAttribute(t,o+1),i[o]=o===0?0:i[o-1],i[o+1]=i[o]+Bg.distanceTo(Hg);e.setAttribute("lineDistance",new Ft(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class YT extends Bn{constructor(e,t,i,o,l,d,c,f,h){super(e,t,i,o,l,d,c,f,h),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Ai{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let i,o=this.getPoint(0),l=0;t.push(0);for(let d=1;d<=e;d++)i=this.getPoint(d/e),l+=i.distanceTo(o),t.push(l),o=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const i=this.getLengths();let o=0;const l=i.length;let d;t?d=t:d=e*i[l-1];let c=0,f=l-1,h;for(;c<=f;)if(o=Math.floor(c+(f-c)/2),h=i[o]-d,h<0)c=o+1;else if(h>0)f=o-1;else{f=o;break}if(o=f,i[o]===d)return o/(l-1);const p=i[o],y=i[o+1]-p,S=(d-p)/y;return(o+S)/(l-1)}getTangent(e,t){let o=e-1e-4,l=e+1e-4;o<0&&(o=0),l>1&&(l=1);const d=this.getPoint(o),c=this.getPoint(l),f=t||(d.isVector2?new Be:new B);return f.copy(c).sub(d).normalize(),f}getTangentAt(e,t){const i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t){const i=new B,o=[],l=[],d=[],c=new B,f=new Ht;for(let S=0;S<=e;S++){const E=S/e;o[S]=this.getTangentAt(E,new B)}l[0]=new B,d[0]=new B;let h=Number.MAX_VALUE;const p=Math.abs(o[0].x),g=Math.abs(o[0].y),y=Math.abs(o[0].z);p<=h&&(h=p,i.set(1,0,0)),g<=h&&(h=g,i.set(0,1,0)),y<=h&&i.set(0,0,1),c.crossVectors(o[0],i).normalize(),l[0].crossVectors(o[0],c),d[0].crossVectors(o[0],l[0]);for(let S=1;S<=e;S++){if(l[S]=l[S-1].clone(),d[S]=d[S-1].clone(),c.crossVectors(o[S-1],o[S]),c.length()>Number.EPSILON){c.normalize();const E=Math.acos(nn(o[S-1].dot(o[S]),-1,1));l[S].applyMatrix4(f.makeRotationAxis(c,E))}d[S].crossVectors(o[S],l[S])}if(t===!0){let S=Math.acos(nn(l[0].dot(l[e]),-1,1));S/=e,o[0].dot(c.crossVectors(l[0],l[e]))>0&&(S=-S);for(let E=1;E<=e;E++)l[E].applyMatrix4(f.makeRotationAxis(o[E],S*E)),d[E].crossVectors(o[E],l[E])}return{tangents:o,normals:l,binormals:d}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Ef extends Ai{constructor(e=0,t=0,i=1,o=1,l=0,d=Math.PI*2,c=!1,f=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=o,this.aStartAngle=l,this.aEndAngle=d,this.aClockwise=c,this.aRotation=f}getPoint(e,t){const i=t||new Be,o=Math.PI*2;let l=this.aEndAngle-this.aStartAngle;const d=Math.abs(l)<Number.EPSILON;for(;l<0;)l+=o;for(;l>o;)l-=o;l<Number.EPSILON&&(d?l=0:l=o),this.aClockwise===!0&&!d&&(l===o?l=-o:l=l-o);const c=this.aStartAngle+e*l;let f=this.aX+this.xRadius*Math.cos(c),h=this.aY+this.yRadius*Math.sin(c);if(this.aRotation!==0){const p=Math.cos(this.aRotation),g=Math.sin(this.aRotation),y=f-this.aX,S=h-this.aY;f=y*p-S*g+this.aX,h=y*g+S*p+this.aY}return i.set(f,h)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class qT extends Ef{constructor(e,t,i,o,l,d){super(e,t,i,i,o,l,d),this.isArcCurve=!0,this.type="ArcCurve"}}function wf(){let s=0,e=0,t=0,i=0;function o(l,d,c,f){s=l,e=c,t=-3*l+3*d-2*c-f,i=2*l-2*d+c+f}return{initCatmullRom:function(l,d,c,f,h){o(d,c,h*(c-l),h*(f-d))},initNonuniformCatmullRom:function(l,d,c,f,h,p,g){let y=(d-l)/h-(c-l)/(h+p)+(c-d)/p,S=(c-d)/p-(f-d)/(p+g)+(f-c)/g;y*=p,S*=p,o(d,c,y,S)},calc:function(l){const d=l*l,c=d*l;return s+e*l+t*d+i*c}}}const Xl=new B,zd=new wf,Bd=new wf,Hd=new wf;class KT extends Ai{constructor(e=[],t=!1,i="centripetal",o=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=o}getPoint(e,t=new B){const i=t,o=this.points,l=o.length,d=(l-(this.closed?0:1))*e;let c=Math.floor(d),f=d-c;this.closed?c+=c>0?0:(Math.floor(Math.abs(c)/l)+1)*l:f===0&&c===l-1&&(c=l-2,f=1);let h,p;this.closed||c>0?h=o[(c-1)%l]:(Xl.subVectors(o[0],o[1]).add(o[0]),h=Xl);const g=o[c%l],y=o[(c+1)%l];if(this.closed||c+2<l?p=o[(c+2)%l]:(Xl.subVectors(o[l-1],o[l-2]).add(o[l-1]),p=Xl),this.curveType==="centripetal"||this.curveType==="chordal"){const S=this.curveType==="chordal"?.5:.25;let E=Math.pow(h.distanceToSquared(g),S),M=Math.pow(g.distanceToSquared(y),S),x=Math.pow(y.distanceToSquared(p),S);M<1e-4&&(M=1),E<1e-4&&(E=M),x<1e-4&&(x=M),zd.initNonuniformCatmullRom(h.x,g.x,y.x,p.x,E,M,x),Bd.initNonuniformCatmullRom(h.y,g.y,y.y,p.y,E,M,x),Hd.initNonuniformCatmullRom(h.z,g.z,y.z,p.z,E,M,x)}else this.curveType==="catmullrom"&&(zd.initCatmullRom(h.x,g.x,y.x,p.x,this.tension),Bd.initCatmullRom(h.y,g.y,y.y,p.y,this.tension),Hd.initCatmullRom(h.z,g.z,y.z,p.z,this.tension));return i.set(zd.calc(f),Bd.calc(f),Hd.calc(f)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const o=e.points[t];this.points.push(o.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const o=this.points[t];e.points.push(o.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const o=e.points[t];this.points.push(new B().fromArray(o))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Vg(s,e,t,i,o){const l=(i-e)*.5,d=(o-t)*.5,c=s*s,f=s*c;return(2*t-2*i+l+d)*f+(-3*t+3*i-2*l-d)*c+l*s+t}function JT(s,e){const t=1-s;return t*t*e}function ZT(s,e){return 2*(1-s)*s*e}function QT(s,e){return s*s*e}function sa(s,e,t,i){return JT(s,e)+ZT(s,t)+QT(s,i)}function eb(s,e){const t=1-s;return t*t*t*e}function tb(s,e){const t=1-s;return 3*t*t*s*e}function nb(s,e){return 3*(1-s)*s*s*e}function ib(s,e){return s*s*s*e}function oa(s,e,t,i,o){return eb(s,e)+tb(s,t)+nb(s,i)+ib(s,o)}class l0 extends Ai{constructor(e=new Be,t=new Be,i=new Be,o=new Be){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=o}getPoint(e,t=new Be){const i=t,o=this.v0,l=this.v1,d=this.v2,c=this.v3;return i.set(oa(e,o.x,l.x,d.x,c.x),oa(e,o.y,l.y,d.y,c.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class rb extends Ai{constructor(e=new B,t=new B,i=new B,o=new B){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=o}getPoint(e,t=new B){const i=t,o=this.v0,l=this.v1,d=this.v2,c=this.v3;return i.set(oa(e,o.x,l.x,d.x,c.x),oa(e,o.y,l.y,d.y,c.y),oa(e,o.z,l.z,d.z,c.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class c0 extends Ai{constructor(e=new Be,t=new Be){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Be){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Be){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class sb extends Ai{constructor(e=new B,t=new B){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new B){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new B){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class u0 extends Ai{constructor(e=new Be,t=new Be,i=new Be){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new Be){const i=t,o=this.v0,l=this.v1,d=this.v2;return i.set(sa(e,o.x,l.x,d.x),sa(e,o.y,l.y,d.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class ob extends Ai{constructor(e=new B,t=new B,i=new B){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new B){const i=t,o=this.v0,l=this.v1,d=this.v2;return i.set(sa(e,o.x,l.x,d.x),sa(e,o.y,l.y,d.y),sa(e,o.z,l.z,d.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class d0 extends Ai{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Be){const i=t,o=this.points,l=(o.length-1)*e,d=Math.floor(l),c=l-d,f=o[d===0?d:d-1],h=o[d],p=o[d>o.length-2?o.length-1:d+1],g=o[d>o.length-3?o.length-1:d+2];return i.set(Vg(c,f.x,h.x,p.x,g.x),Vg(c,f.y,h.y,p.y,g.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const o=e.points[t];this.points.push(o.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const o=this.points[t];e.points.push(o.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const o=e.points[t];this.points.push(new Be().fromArray(o))}return this}}var Gg=Object.freeze({__proto__:null,ArcCurve:qT,CatmullRomCurve3:KT,CubicBezierCurve:l0,CubicBezierCurve3:rb,EllipseCurve:Ef,LineCurve:c0,LineCurve3:sb,QuadraticBezierCurve:u0,QuadraticBezierCurve3:ob,SplineCurve:d0});class ab extends Ai{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Gg[i](t,e))}return this}getPoint(e,t){const i=e*this.getLength(),o=this.getCurveLengths();let l=0;for(;l<o.length;){if(o[l]>=i){const d=o[l]-i,c=this.curves[l],f=c.getLength(),h=f===0?0:1-d/f;return c.getPointAt(h,t)}l++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let i=0,o=this.curves.length;i<o;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let i;for(let o=0,l=this.curves;o<l.length;o++){const d=l[o],c=d.isEllipseCurve?e*2:d.isLineCurve||d.isLineCurve3?1:d.isSplineCurve?e*d.points.length:e,f=d.getPoints(c);for(let h=0;h<f.length;h++){const p=f[h];i&&i.equals(p)||(t.push(p),i=p)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const o=e.curves[t];this.curves.push(o.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){const o=this.curves[t];e.curves.push(o.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const o=e.curves[t];this.curves.push(new Gg[o.type]().fromJSON(o))}return this}}class lb extends ab{constructor(e){super(),this.type="Path",this.currentPoint=new Be,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const i=new c0(this.currentPoint.clone(),new Be(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,o){const l=new u0(this.currentPoint.clone(),new Be(e,t),new Be(i,o));return this.curves.push(l),this.currentPoint.set(i,o),this}bezierCurveTo(e,t,i,o,l,d){const c=new l0(this.currentPoint.clone(),new Be(e,t),new Be(i,o),new Be(l,d));return this.curves.push(c),this.currentPoint.set(l,d),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),i=new d0(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,o,l,d){const c=this.currentPoint.x,f=this.currentPoint.y;return this.absarc(e+c,t+f,i,o,l,d),this}absarc(e,t,i,o,l,d){return this.absellipse(e,t,i,i,o,l,d),this}ellipse(e,t,i,o,l,d,c,f){const h=this.currentPoint.x,p=this.currentPoint.y;return this.absellipse(e+h,t+p,i,o,l,d,c,f),this}absellipse(e,t,i,o,l,d,c,f){const h=new Ef(e,t,i,o,l,d,c,f);if(this.curves.length>0){const g=h.getPoint(0);g.equals(this.currentPoint)||this.lineTo(g.x,g.y)}this.curves.push(h);const p=h.getPoint(1);return this.currentPoint.copy(p),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Tf extends Sn{constructor(e=[new Be(0,-.5),new Be(.5,0),new Be(0,.5)],t=12,i=0,o=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:i,phiLength:o},t=Math.floor(t),o=nn(o,0,Math.PI*2);const l=[],d=[],c=[],f=[],h=[],p=1/t,g=new B,y=new Be,S=new B,E=new B,M=new B;let x=0,v=0;for(let b=0;b<=e.length-1;b++)switch(b){case 0:x=e[b+1].x-e[b].x,v=e[b+1].y-e[b].y,S.x=v*1,S.y=-x,S.z=v*0,M.copy(S),S.normalize(),f.push(S.x,S.y,S.z);break;case e.length-1:f.push(M.x,M.y,M.z);break;default:x=e[b+1].x-e[b].x,v=e[b+1].y-e[b].y,S.x=v*1,S.y=-x,S.z=v*0,E.copy(S),S.x+=M.x,S.y+=M.y,S.z+=M.z,S.normalize(),f.push(S.x,S.y,S.z),M.copy(E)}for(let b=0;b<=t;b++){const A=i+b*p*o,P=Math.sin(A),z=Math.cos(A);for(let D=0;D<=e.length-1;D++){g.x=e[D].x*P,g.y=e[D].y,g.z=e[D].x*z,d.push(g.x,g.y,g.z),y.x=b/t,y.y=D/(e.length-1),c.push(y.x,y.y);const I=f[3*D+0]*P,ne=f[3*D+1],R=f[3*D+0]*z;h.push(I,ne,R)}}for(let b=0;b<t;b++)for(let A=0;A<e.length-1;A++){const P=A+b*e.length,z=P,D=P+e.length,I=P+e.length+1,ne=P+1;l.push(z,D,ne),l.push(I,ne,D)}this.setIndex(l),this.setAttribute("position",new Ft(d,3)),this.setAttribute("uv",new Ft(c,2)),this.setAttribute("normal",new Ft(h,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Tf(e.points,e.segments,e.phiStart,e.phiLength)}}class bf extends Tf{constructor(e=1,t=1,i=4,o=8){const l=new lb;l.absarc(0,-t/2,e,Math.PI*1.5,0),l.absarc(0,t/2,e,0,Math.PI*.5),super(l.getPoints(i),o),this.type="CapsuleGeometry",this.parameters={radius:e,length:t,capSegments:i,radialSegments:o}}static fromJSON(e){return new bf(e.radius,e.length,e.capSegments,e.radialSegments)}}class Af extends Sn{constructor(e=1,t=32,i=0,o=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:o},t=Math.max(3,t);const l=[],d=[],c=[],f=[],h=new B,p=new Be;d.push(0,0,0),c.push(0,0,1),f.push(.5,.5);for(let g=0,y=3;g<=t;g++,y+=3){const S=i+g/t*o;h.x=e*Math.cos(S),h.y=e*Math.sin(S),d.push(h.x,h.y,h.z),c.push(0,0,1),p.x=(d[y]/e+1)/2,p.y=(d[y+1]/e+1)/2,f.push(p.x,p.y)}for(let g=1;g<=t;g++)l.push(g,g+1,0);this.setIndex(l),this.setAttribute("position",new Ft(d,3)),this.setAttribute("normal",new Ft(c,3)),this.setAttribute("uv",new Ft(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Af(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class ma extends Sn{constructor(e=1,t=1,i=1,o=32,l=1,d=!1,c=0,f=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:o,heightSegments:l,openEnded:d,thetaStart:c,thetaLength:f};const h=this;o=Math.floor(o),l=Math.floor(l);const p=[],g=[],y=[],S=[];let E=0;const M=[],x=i/2;let v=0;b(),d===!1&&(e>0&&A(!0),t>0&&A(!1)),this.setIndex(p),this.setAttribute("position",new Ft(g,3)),this.setAttribute("normal",new Ft(y,3)),this.setAttribute("uv",new Ft(S,2));function b(){const P=new B,z=new B;let D=0;const I=(t-e)/i;for(let ne=0;ne<=l;ne++){const R=[],U=ne/l,se=U*(t-e)+e;for(let le=0;le<=o;le++){const ge=le/o,V=ge*f+c,J=Math.sin(V),te=Math.cos(V);z.x=se*J,z.y=-U*i+x,z.z=se*te,g.push(z.x,z.y,z.z),P.set(J,I,te).normalize(),y.push(P.x,P.y,P.z),S.push(ge,1-U),R.push(E++)}M.push(R)}for(let ne=0;ne<o;ne++)for(let R=0;R<l;R++){const U=M[R][ne],se=M[R+1][ne],le=M[R+1][ne+1],ge=M[R][ne+1];p.push(U,se,ge),p.push(se,le,ge),D+=6}h.addGroup(v,D,0),v+=D}function A(P){const z=E,D=new Be,I=new B;let ne=0;const R=P===!0?e:t,U=P===!0?1:-1;for(let le=1;le<=o;le++)g.push(0,x*U,0),y.push(0,U,0),S.push(.5,.5),E++;const se=E;for(let le=0;le<=o;le++){const V=le/o*f+c,J=Math.cos(V),te=Math.sin(V);I.x=R*te,I.y=x*U,I.z=R*J,g.push(I.x,I.y,I.z),y.push(0,U,0),D.x=J*.5+.5,D.y=te*.5*U+.5,S.push(D.x,D.y),E++}for(let le=0;le<o;le++){const ge=z+le,V=se+le;P===!0?p.push(V,V+1,ge):p.push(V+1,V,ge),ne+=3}h.addGroup(v,ne,P===!0?1:2),v+=ne}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ma(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Cf extends ma{constructor(e=1,t=1,i=32,o=1,l=!1,d=0,c=Math.PI*2){super(0,e,t,i,o,l,d,c),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:o,openEnded:l,thetaStart:d,thetaLength:c}}static fromJSON(e){return new Cf(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}const $l=new B,Yl=new B,Vd=new B,ql=new ri;class cb extends Sn{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const o=Math.pow(10,4),l=Math.cos(io*t),d=e.getIndex(),c=e.getAttribute("position"),f=d?d.count:c.count,h=[0,0,0],p=["a","b","c"],g=new Array(3),y={},S=[];for(let E=0;E<f;E+=3){d?(h[0]=d.getX(E),h[1]=d.getX(E+1),h[2]=d.getX(E+2)):(h[0]=E,h[1]=E+1,h[2]=E+2);const{a:M,b:x,c:v}=ql;if(M.fromBufferAttribute(c,h[0]),x.fromBufferAttribute(c,h[1]),v.fromBufferAttribute(c,h[2]),ql.getNormal(Vd),g[0]=`${Math.round(M.x*o)},${Math.round(M.y*o)},${Math.round(M.z*o)}`,g[1]=`${Math.round(x.x*o)},${Math.round(x.y*o)},${Math.round(x.z*o)}`,g[2]=`${Math.round(v.x*o)},${Math.round(v.y*o)},${Math.round(v.z*o)}`,!(g[0]===g[1]||g[1]===g[2]||g[2]===g[0]))for(let b=0;b<3;b++){const A=(b+1)%3,P=g[b],z=g[A],D=ql[p[b]],I=ql[p[A]],ne=`${P}_${z}`,R=`${z}_${P}`;R in y&&y[R]?(Vd.dot(y[R].normal)<=l&&(S.push(D.x,D.y,D.z),S.push(I.x,I.y,I.z)),y[R]=null):ne in y||(y[ne]={index0:h[b],index1:h[A],normal:Vd.clone()})}}for(const E in y)if(y[E]){const{index0:M,index1:x}=y[E];$l.fromBufferAttribute(c,M),Yl.fromBufferAttribute(c,x),S.push($l.x,$l.y,$l.z),S.push(Yl.x,Yl.y,Yl.z)}this.setAttribute("position",new Ft(S,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class uc extends Sn{constructor(e=.5,t=1,i=32,o=1,l=0,d=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:o,thetaStart:l,thetaLength:d},i=Math.max(3,i),o=Math.max(1,o);const c=[],f=[],h=[],p=[];let g=e;const y=(t-e)/o,S=new B,E=new Be;for(let M=0;M<=o;M++){for(let x=0;x<=i;x++){const v=l+x/i*d;S.x=g*Math.cos(v),S.y=g*Math.sin(v),f.push(S.x,S.y,S.z),h.push(0,0,1),E.x=(S.x/t+1)/2,E.y=(S.y/t+1)/2,p.push(E.x,E.y)}g+=y}for(let M=0;M<o;M++){const x=M*(i+1);for(let v=0;v<i;v++){const b=v+x,A=b,P=b+i+1,z=b+i+2,D=b+1;c.push(A,P,D),c.push(P,z,D)}}this.setIndex(c),this.setAttribute("position",new Ft(f,3)),this.setAttribute("normal",new Ft(h,3)),this.setAttribute("uv",new Ft(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new uc(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class dc extends Sn{constructor(e=1,t=32,i=16,o=0,l=Math.PI*2,d=0,c=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:o,phiLength:l,thetaStart:d,thetaLength:c},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const f=Math.min(d+c,Math.PI);let h=0;const p=[],g=new B,y=new B,S=[],E=[],M=[],x=[];for(let v=0;v<=i;v++){const b=[],A=v/i;let P=0;v===0&&d===0?P=.5/t:v===i&&f===Math.PI&&(P=-.5/t);for(let z=0;z<=t;z++){const D=z/t;g.x=-e*Math.cos(o+D*l)*Math.sin(d+A*c),g.y=e*Math.cos(d+A*c),g.z=e*Math.sin(o+D*l)*Math.sin(d+A*c),E.push(g.x,g.y,g.z),y.copy(g).normalize(),M.push(y.x,y.y,y.z),x.push(D+P,1-A),b.push(h++)}p.push(b)}for(let v=0;v<i;v++)for(let b=0;b<t;b++){const A=p[v][b+1],P=p[v][b],z=p[v+1][b],D=p[v+1][b+1];(v!==0||d>0)&&S.push(A,P,D),(v!==i-1||f<Math.PI)&&S.push(P,z,D)}this.setIndex(S),this.setAttribute("position",new Ft(E,3)),this.setAttribute("normal",new Ft(M,3)),this.setAttribute("uv",new Ft(x,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new dc(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Lr extends go{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Et(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Et(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=kv,this.normalScale=new Be(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Rf extends rn{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Et(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}class ub extends Rf{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(rn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Et(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Gd=new Ht,Wg=new B,jg=new B;class f0{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Be(512,512),this.map=null,this.mapPass=null,this.matrix=new Ht,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new yf,this._frameExtents=new Be(1,1),this._viewportCount=1,this._viewports=[new Bt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;Wg.setFromMatrixPosition(e.matrixWorld),t.position.copy(Wg),jg.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(jg),t.updateMatrixWorld(),Gd.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Gd),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Gd)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Xg=new Ht,na=new B,Wd=new B;class db extends f0{constructor(){super(new $n(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Be(4,2),this._viewportCount=6,this._viewports=[new Bt(2,1,1,1),new Bt(0,1,1,1),new Bt(3,1,1,1),new Bt(1,1,1,1),new Bt(3,0,1,1),new Bt(1,0,1,1)],this._cubeDirections=[new B(1,0,0),new B(-1,0,0),new B(0,0,1),new B(0,0,-1),new B(0,1,0),new B(0,-1,0)],this._cubeUps=[new B(0,1,0),new B(0,1,0),new B(0,1,0),new B(0,1,0),new B(0,0,1),new B(0,0,-1)]}updateMatrices(e,t=0){const i=this.camera,o=this.matrix,l=e.distance||i.far;l!==i.far&&(i.far=l,i.updateProjectionMatrix()),na.setFromMatrixPosition(e.matrixWorld),i.position.copy(na),Wd.copy(i.position),Wd.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(Wd),i.updateMatrixWorld(),o.makeTranslation(-na.x,-na.y,-na.z),Xg.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Xg)}}class fb extends Rf{constructor(e,t,i=0,o=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=o,this.shadow=new db}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class hb extends f0{constructor(){super(new Zv(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class $g extends Rf{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(rn.DEFAULT_UP),this.updateMatrix(),this.target=new rn,this.shadow=new hb}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Yg{constructor(e=1,t=0,i=0){return this.radius=e,this.phi=t,this.theta=i,this}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(nn(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:mf}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=mf);const qg={type:"change"},jd={type:"start"},Kg={type:"end"},Kl=new _f,Jg=new Mr,pb=Math.cos(70*ns.DEG2RAD);class mb extends cs{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new B,this.cursor=new B,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ds.ROTATE,MIDDLE:Ds.DOLLY,RIGHT:Ds.PAN},this.touches={ONE:Us.ROTATE,TWO:Us.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return c.phi},this.getAzimuthalAngle=function(){return c.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(H){H.addEventListener("keydown",be),this._domElementKeyEvents=H},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",be),this._domElementKeyEvents=null},this.saveState=function(){i.target0.copy(i.target),i.position0.copy(i.object.position),i.zoom0=i.object.zoom},this.reset=function(){i.target.copy(i.target0),i.object.position.copy(i.position0),i.object.zoom=i.zoom0,i.object.updateProjectionMatrix(),i.dispatchEvent(qg),i.update(),l=o.NONE},this.update=function(){const H=new B,_e=new $i().setFromUnitVectors(e.up,new B(0,1,0)),Ue=_e.clone().invert(),Re=new B,$e=new $i,dt=new B,gt=2*Math.PI;return function(Le=null){const G=i.object.position;H.copy(G).sub(i.target),H.applyQuaternion(_e),c.setFromVector3(H),i.autoRotate&&l===o.NONE&&se(R(Le)),i.enableDamping?(c.theta+=f.theta*i.dampingFactor,c.phi+=f.phi*i.dampingFactor):(c.theta+=f.theta,c.phi+=f.phi);let Pe=i.minAzimuthAngle,Ne=i.maxAzimuthAngle;isFinite(Pe)&&isFinite(Ne)&&(Pe<-Math.PI?Pe+=gt:Pe>Math.PI&&(Pe-=gt),Ne<-Math.PI?Ne+=gt:Ne>Math.PI&&(Ne-=gt),Pe<=Ne?c.theta=Math.max(Pe,Math.min(Ne,c.theta)):c.theta=c.theta>(Pe+Ne)/2?Math.max(Pe,c.theta):Math.min(Ne,c.theta)),c.phi=Math.max(i.minPolarAngle,Math.min(i.maxPolarAngle,c.phi)),c.makeSafe(),i.enableDamping===!0?i.target.addScaledVector(p,i.dampingFactor):i.target.add(p),i.target.sub(i.cursor),i.target.clampLength(i.minTargetRadius,i.maxTargetRadius),i.target.add(i.cursor),i.zoomToCursor&&D||i.object.isOrthographicCamera?c.radius=K(c.radius):c.radius=K(c.radius*h),H.setFromSpherical(c),H.applyQuaternion(Ue),G.copy(i.target).add(H),i.object.lookAt(i.target),i.enableDamping===!0?(f.theta*=1-i.dampingFactor,f.phi*=1-i.dampingFactor,p.multiplyScalar(1-i.dampingFactor)):(f.set(0,0,0),p.set(0,0,0));let ae=!1;if(i.zoomToCursor&&D){let pe=null;if(i.object.isPerspectiveCamera){const tt=H.length();pe=K(tt*h);const je=tt-pe;i.object.position.addScaledVector(P,je),i.object.updateMatrixWorld()}else if(i.object.isOrthographicCamera){const tt=new B(z.x,z.y,0);tt.unproject(i.object),i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/h)),i.object.updateProjectionMatrix(),ae=!0;const je=new B(z.x,z.y,0);je.unproject(i.object),i.object.position.sub(je).add(tt),i.object.updateMatrixWorld(),pe=H.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),i.zoomToCursor=!1;pe!==null&&(this.screenSpacePanning?i.target.set(0,0,-1).transformDirection(i.object.matrix).multiplyScalar(pe).add(i.object.position):(Kl.origin.copy(i.object.position),Kl.direction.set(0,0,-1).transformDirection(i.object.matrix),Math.abs(i.object.up.dot(Kl.direction))<pb?e.lookAt(i.target):(Jg.setFromNormalAndCoplanarPoint(i.object.up,i.target),Kl.intersectPlane(Jg,i.target))))}else i.object.isOrthographicCamera&&(i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/h)),i.object.updateProjectionMatrix(),ae=!0);return h=1,D=!1,ae||Re.distanceToSquared(i.object.position)>d||8*(1-$e.dot(i.object.quaternion))>d||dt.distanceToSquared(i.target)>0?(i.dispatchEvent(qg),Re.copy(i.object.position),$e.copy(i.object.quaternion),dt.copy(i.target),!0):!1}}(),this.dispose=function(){i.domElement.removeEventListener("contextmenu",He),i.domElement.removeEventListener("pointerdown",ot),i.domElement.removeEventListener("pointercancel",C),i.domElement.removeEventListener("wheel",Me),i.domElement.removeEventListener("pointermove",L),i.domElement.removeEventListener("pointerup",C),i._domElementKeyEvents!==null&&(i._domElementKeyEvents.removeEventListener("keydown",be),i._domElementKeyEvents=null)};const i=this,o={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let l=o.NONE;const d=1e-6,c=new Yg,f=new Yg;let h=1;const p=new B,g=new Be,y=new Be,S=new Be,E=new Be,M=new Be,x=new Be,v=new Be,b=new Be,A=new Be,P=new B,z=new Be;let D=!1;const I=[],ne={};function R(H){return H!==null?2*Math.PI/60*i.autoRotateSpeed*H:2*Math.PI/60/60*i.autoRotateSpeed}function U(H){const _e=Math.abs(H)/(100*(window.devicePixelRatio|0));return Math.pow(.95,i.zoomSpeed*_e)}function se(H){f.theta-=H}function le(H){f.phi-=H}const ge=function(){const H=new B;return function(Ue,Re){H.setFromMatrixColumn(Re,0),H.multiplyScalar(-Ue),p.add(H)}}(),V=function(){const H=new B;return function(Ue,Re){i.screenSpacePanning===!0?H.setFromMatrixColumn(Re,1):(H.setFromMatrixColumn(Re,0),H.crossVectors(i.object.up,H)),H.multiplyScalar(Ue),p.add(H)}}(),J=function(){const H=new B;return function(Ue,Re){const $e=i.domElement;if(i.object.isPerspectiveCamera){const dt=i.object.position;H.copy(dt).sub(i.target);let gt=H.length();gt*=Math.tan(i.object.fov/2*Math.PI/180),ge(2*Ue*gt/$e.clientHeight,i.object.matrix),V(2*Re*gt/$e.clientHeight,i.object.matrix)}else i.object.isOrthographicCamera?(ge(Ue*(i.object.right-i.object.left)/i.object.zoom/$e.clientWidth,i.object.matrix),V(Re*(i.object.top-i.object.bottom)/i.object.zoom/$e.clientHeight,i.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),i.enablePan=!1)}}();function te(H){i.object.isPerspectiveCamera||i.object.isOrthographicCamera?h/=H:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function q(H){i.object.isPerspectiveCamera||i.object.isOrthographicCamera?h*=H:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function X(H,_e){if(!i.zoomToCursor)return;D=!0;const Ue=i.domElement.getBoundingClientRect(),Re=H-Ue.left,$e=_e-Ue.top,dt=Ue.width,gt=Ue.height;z.x=Re/dt*2-1,z.y=-($e/gt)*2+1,P.set(z.x,z.y,1).unproject(i.object).sub(i.object.position).normalize()}function K(H){return Math.max(i.minDistance,Math.min(i.maxDistance,H))}function Y(H){g.set(H.clientX,H.clientY)}function O(H){X(H.clientX,H.clientX),v.set(H.clientX,H.clientY)}function F(H){E.set(H.clientX,H.clientY)}function j(H){y.set(H.clientX,H.clientY),S.subVectors(y,g).multiplyScalar(i.rotateSpeed);const _e=i.domElement;se(2*Math.PI*S.x/_e.clientHeight),le(2*Math.PI*S.y/_e.clientHeight),g.copy(y),i.update()}function ce(H){b.set(H.clientX,H.clientY),A.subVectors(b,v),A.y>0?te(U(A.y)):A.y<0&&q(U(A.y)),v.copy(b),i.update()}function me(H){M.set(H.clientX,H.clientY),x.subVectors(M,E).multiplyScalar(i.panSpeed),J(x.x,x.y),E.copy(M),i.update()}function ye(H){X(H.clientX,H.clientY),H.deltaY<0?q(U(H.deltaY)):H.deltaY>0&&te(U(H.deltaY)),i.update()}function Se(H){let _e=!1;switch(H.code){case i.keys.UP:H.ctrlKey||H.metaKey||H.shiftKey?le(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):J(0,i.keyPanSpeed),_e=!0;break;case i.keys.BOTTOM:H.ctrlKey||H.metaKey||H.shiftKey?le(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):J(0,-i.keyPanSpeed),_e=!0;break;case i.keys.LEFT:H.ctrlKey||H.metaKey||H.shiftKey?se(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):J(i.keyPanSpeed,0),_e=!0;break;case i.keys.RIGHT:H.ctrlKey||H.metaKey||H.shiftKey?se(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):J(-i.keyPanSpeed,0),_e=!0;break}_e&&(H.preventDefault(),i.update())}function Fe(H){if(I.length===1)g.set(H.pageX,H.pageY);else{const _e=mt(H),Ue=.5*(H.pageX+_e.x),Re=.5*(H.pageY+_e.y);g.set(Ue,Re)}}function ve(H){if(I.length===1)E.set(H.pageX,H.pageY);else{const _e=mt(H),Ue=.5*(H.pageX+_e.x),Re=.5*(H.pageY+_e.y);E.set(Ue,Re)}}function Ae(H){const _e=mt(H),Ue=H.pageX-_e.x,Re=H.pageY-_e.y,$e=Math.sqrt(Ue*Ue+Re*Re);v.set(0,$e)}function ze(H){i.enableZoom&&Ae(H),i.enablePan&&ve(H)}function Q(H){i.enableZoom&&Ae(H),i.enableRotate&&Fe(H)}function nt(H){if(I.length==1)y.set(H.pageX,H.pageY);else{const Ue=mt(H),Re=.5*(H.pageX+Ue.x),$e=.5*(H.pageY+Ue.y);y.set(Re,$e)}S.subVectors(y,g).multiplyScalar(i.rotateSpeed);const _e=i.domElement;se(2*Math.PI*S.x/_e.clientHeight),le(2*Math.PI*S.y/_e.clientHeight),g.copy(y)}function ke(H){if(I.length===1)M.set(H.pageX,H.pageY);else{const _e=mt(H),Ue=.5*(H.pageX+_e.x),Re=.5*(H.pageY+_e.y);M.set(Ue,Re)}x.subVectors(M,E).multiplyScalar(i.panSpeed),J(x.x,x.y),E.copy(M)}function Qe(H){const _e=mt(H),Ue=H.pageX-_e.x,Re=H.pageY-_e.y,$e=Math.sqrt(Ue*Ue+Re*Re);b.set(0,$e),A.set(0,Math.pow(b.y/v.y,i.zoomSpeed)),te(A.y),v.copy(b);const dt=(H.pageX+_e.x)*.5,gt=(H.pageY+_e.y)*.5;X(dt,gt)}function Ve(H){i.enableZoom&&Qe(H),i.enablePan&&ke(H)}function wt(H){i.enableZoom&&Qe(H),i.enableRotate&&nt(H)}function ot(H){i.enabled!==!1&&(I.length===0&&(i.domElement.setPointerCapture(H.pointerId),i.domElement.addEventListener("pointermove",L),i.domElement.addEventListener("pointerup",C)),qe(H),H.pointerType==="touch"?Je(H):oe(H))}function L(H){i.enabled!==!1&&(H.pointerType==="touch"?Ie(H):we(H))}function C(H){rt(H),I.length===0&&(i.domElement.releasePointerCapture(H.pointerId),i.domElement.removeEventListener("pointermove",L),i.domElement.removeEventListener("pointerup",C)),i.dispatchEvent(Kg),l=o.NONE}function oe(H){let _e;switch(H.button){case 0:_e=i.mouseButtons.LEFT;break;case 1:_e=i.mouseButtons.MIDDLE;break;case 2:_e=i.mouseButtons.RIGHT;break;default:_e=-1}switch(_e){case Ds.DOLLY:if(i.enableZoom===!1)return;O(H),l=o.DOLLY;break;case Ds.ROTATE:if(H.ctrlKey||H.metaKey||H.shiftKey){if(i.enablePan===!1)return;F(H),l=o.PAN}else{if(i.enableRotate===!1)return;Y(H),l=o.ROTATE}break;case Ds.PAN:if(H.ctrlKey||H.metaKey||H.shiftKey){if(i.enableRotate===!1)return;Y(H),l=o.ROTATE}else{if(i.enablePan===!1)return;F(H),l=o.PAN}break;default:l=o.NONE}l!==o.NONE&&i.dispatchEvent(jd)}function we(H){switch(l){case o.ROTATE:if(i.enableRotate===!1)return;j(H);break;case o.DOLLY:if(i.enableZoom===!1)return;ce(H);break;case o.PAN:if(i.enablePan===!1)return;me(H);break}}function Me(H){i.enabled===!1||i.enableZoom===!1||l!==o.NONE||(H.preventDefault(),i.dispatchEvent(jd),ye(H),i.dispatchEvent(Kg))}function be(H){i.enabled===!1||i.enablePan===!1||Se(H)}function Je(H){switch(xe(H),I.length){case 1:switch(i.touches.ONE){case Us.ROTATE:if(i.enableRotate===!1)return;Fe(H),l=o.TOUCH_ROTATE;break;case Us.PAN:if(i.enablePan===!1)return;ve(H),l=o.TOUCH_PAN;break;default:l=o.NONE}break;case 2:switch(i.touches.TWO){case Us.DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;ze(H),l=o.TOUCH_DOLLY_PAN;break;case Us.DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;Q(H),l=o.TOUCH_DOLLY_ROTATE;break;default:l=o.NONE}break;default:l=o.NONE}l!==o.NONE&&i.dispatchEvent(jd)}function Ie(H){switch(xe(H),l){case o.TOUCH_ROTATE:if(i.enableRotate===!1)return;nt(H),i.update();break;case o.TOUCH_PAN:if(i.enablePan===!1)return;ke(H),i.update();break;case o.TOUCH_DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;Ve(H),i.update();break;case o.TOUCH_DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;wt(H),i.update();break;default:l=o.NONE}}function He(H){i.enabled!==!1&&H.preventDefault()}function qe(H){I.push(H.pointerId)}function rt(H){delete ne[H.pointerId];for(let _e=0;_e<I.length;_e++)if(I[_e]==H.pointerId){I.splice(_e,1);return}}function xe(H){let _e=ne[H.pointerId];_e===void 0&&(_e=new Be,ne[H.pointerId]=_e),_e.set(H.pageX,H.pageY)}function mt(H){const _e=H.pointerId===I[0]?I[1]:I[0];return ne[_e]}i.domElement.addEventListener("contextmenu",He),i.domElement.addEventListener("pointerdown",ot),i.domElement.addEventListener("pointercancel",C),i.domElement.addEventListener("wheel",Me,{passive:!1}),this.update()}}class lf extends rn{constructor(e=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=e,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new Be(.5,.5),this.addEventListener("removed",function(){this.traverse(function(t){t.element instanceof Element&&t.element.parentNode!==null&&t.element.parentNode.removeChild(t.element)})})}copy(e,t){return super.copy(e,t),this.element=e.element.cloneNode(!0),this.center=e.center,this}}const Js=new B,Zg=new Ht,Qg=new Ht,ev=new B,tv=new B;class gb{constructor(e={}){const t=this;let i,o,l,d;const c={objects:new WeakMap},f=e.element!==void 0?e.element:document.createElement("div");f.style.overflow="hidden",this.domElement=f,this.getSize=function(){return{width:i,height:o}},this.render=function(S,E){S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),E.parent===null&&E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),Zg.copy(E.matrixWorldInverse),Qg.multiplyMatrices(E.projectionMatrix,Zg),h(S,S,E),y(S)},this.setSize=function(S,E){i=S,o=E,l=i/2,d=o/2,f.style.width=S+"px",f.style.height=E+"px"};function h(S,E,M){if(S.isCSS2DObject){Js.setFromMatrixPosition(S.matrixWorld),Js.applyMatrix4(Qg);const x=S.visible===!0&&Js.z>=-1&&Js.z<=1&&S.layers.test(M.layers)===!0;if(S.element.style.display=x===!0?"":"none",x===!0){S.onBeforeRender(t,E,M);const b=S.element;b.style.transform="translate("+-100*S.center.x+"%,"+-100*S.center.y+"%)translate("+(Js.x*l+l)+"px,"+(-Js.y*d+d)+"px)",b.parentNode!==f&&f.appendChild(b),S.onAfterRender(t,E,M)}const v={distanceToCameraSquared:p(M,S)};c.objects.set(S,v)}for(let x=0,v=S.children.length;x<v;x++)h(S.children[x],E,M)}function p(S,E){return ev.setFromMatrixPosition(S.matrixWorld),tv.setFromMatrixPosition(E.matrixWorld),ev.distanceToSquared(tv)}function g(S){const E=[];return S.traverse(function(M){M.isCSS2DObject&&E.push(M)}),E}function y(S){const E=g(S).sort(function(x,v){if(x.renderOrder!==v.renderOrder)return v.renderOrder-x.renderOrder;const b=c.objects.get(x).distanceToCameraSquared,A=c.objects.get(v).distanceToCameraSquared;return b-A}),M=E.length;for(let x=0,v=E.length;x<v;x++)E[x].element.style.zIndex=M-x}}}class vb extends o0{constructor(e=null){super();const t=new Ti;t.deleteAttribute("uv");const i=new Lr({side:Rn}),o=new Lr;let l=5;e!==null&&e._useLegacyLights===!1&&(l=900);const d=new fb(16777215,l,28,2);d.position.set(.418,16.199,.3),this.add(d);const c=new Rt(t,i);c.position.set(-.757,13.219,.717),c.scale.set(31.713,28.305,28.591),this.add(c);const f=new Rt(t,o);f.position.set(-10.906,2.009,1.846),f.rotation.set(0,-.195,0),f.scale.set(2.328,7.905,4.651),this.add(f);const h=new Rt(t,o);h.position.set(-5.607,-.754,-.758),h.rotation.set(0,.994,0),h.scale.set(1.97,1.534,3.955),this.add(h);const p=new Rt(t,o);p.position.set(6.167,.857,7.803),p.rotation.set(0,.561,0),p.scale.set(3.927,6.285,3.687),this.add(p);const g=new Rt(t,o);g.position.set(-2.017,.018,6.124),g.rotation.set(0,.333,0),g.scale.set(2.002,4.566,2.064),this.add(g);const y=new Rt(t,o);y.position.set(2.291,-.756,-2.621),y.rotation.set(0,-.286,0),y.scale.set(1.546,1.552,1.496),this.add(y);const S=new Rt(t,o);S.position.set(-2.193,-.369,-5.547),S.rotation.set(0,.516,0),S.scale.set(3.875,3.487,2.986),this.add(S);const E=new Rt(t,Zs(50));E.position.set(-16.116,14.37,8.208),E.scale.set(.1,2.428,2.739),this.add(E);const M=new Rt(t,Zs(50));M.position.set(-16.109,18.021,-8.207),M.scale.set(.1,2.425,2.751),this.add(M);const x=new Rt(t,Zs(17));x.position.set(14.904,12.198,-1.832),x.scale.set(.15,4.265,6.331),this.add(x);const v=new Rt(t,Zs(43));v.position.set(-.462,8.89,14.52),v.scale.set(4.38,5.441,.088),this.add(v);const b=new Rt(t,Zs(20));b.position.set(3.235,11.486,-12.541),b.scale.set(2.5,2,.1),this.add(b);const A=new Rt(t,Zs(100));A.position.set(0,20,0),A.scale.set(1,.1,1),this.add(A)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function Zs(s){const e=new so;return e.color.setScalar(s),e}function xb(s,e=Math.PI/3){const t=Math.cos(e),i=(1+1e-10)*100,o=[new B,new B,new B],l=new B,d=new B,c=new B,f=new B;function h(M){const x=~~(M.x*i),v=~~(M.y*i),b=~~(M.z*i);return`${x},${v},${b}`}const p=s.index?s.toNonIndexed():s,g=p.attributes.position,y={};for(let M=0,x=g.count/3;M<x;M++){const v=3*M,b=o[0].fromBufferAttribute(g,v+0),A=o[1].fromBufferAttribute(g,v+1),P=o[2].fromBufferAttribute(g,v+2);l.subVectors(P,A),d.subVectors(b,A);const z=new B().crossVectors(l,d).normalize();for(let D=0;D<3;D++){const I=o[D],ne=h(I);ne in y||(y[ne]=[]),y[ne].push(z)}}const S=new Float32Array(g.count*3),E=new Yn(S,3,!1);for(let M=0,x=g.count/3;M<x;M++){const v=3*M,b=o[0].fromBufferAttribute(g,v+0),A=o[1].fromBufferAttribute(g,v+1),P=o[2].fromBufferAttribute(g,v+2);l.subVectors(P,A),d.subVectors(b,A),c.crossVectors(l,d).normalize();for(let z=0;z<3;z++){const D=o[z],I=h(D),ne=y[I];f.set(0,0,0);for(let R=0,U=ne.length;R<U;R++){const se=ne[R];c.dot(se)>t&&f.add(se)}f.normalize(),E.setXYZ(v+z,f.x,f.y,f.z)}}return p.setAttribute("normal",E),p}const kn={bg:724242,crimson:16735029,ice:8176895,robot:11844552},_b={float32:Float32Array,uint16:Uint16Array,uint32:Uint32Array,int16:Int16Array,uint8:Uint8Array},h0=new B(0,0,1),yb=new B(0,1,0),Jl=new Map;function fc(s){const e=atob(s.b64),t=new Uint8Array(e.length);for(let i=0;i<e.length;i++)t[i]=e.charCodeAt(i);return new _b[s.dtype](t.buffer)}async function p0(s){const e=await fetch(s);if(!e.ok)throw new Error(`${s}: HTTP ${e.status}`);return e.json()}function Sb(s){return Jl.has(s)||Jl.set(s,p0(s).catch(e=>{throw Jl.delete(s),e})),Jl.get(s)}const Mb=`
.nr{position:relative;container-type:inline-size;background:#0b0d12;border:1px solid #222733;border-radius:14px;
  overflow:hidden;color:#e7e9ee;font:14px/1.4 Inter,system-ui,sans-serif;outline:none;user-select:none;-webkit-user-select:none}
.nr:focus-visible{border-color:#8b93a7}
.nr-stage{position:relative;aspect-ratio:16/9;min-height:240px;background:#0b0d12}
@container (max-width:560px){.nr-stage{aspect-ratio:4/5}.nr-chip{font-size:10px;padding:4px 6px}.nr-hud{gap:4px}.nr-label{font-size:11px;padding:3px 6px}}
.nr-stage>canvas{position:absolute;inset:0;width:100%!important;height:100%!important;display:block;touch-action:none;cursor:grab}
.nr-stage>canvas:active{cursor:grabbing}
.nr-labels{position:absolute;inset:0;pointer-events:none;overflow:hidden}
.nr-flash{position:absolute;inset:0;pointer-events:none;opacity:0;
  background:radial-gradient(ellipse at center,rgba(255,91,53,0) 35%,rgba(255,91,53,.55) 100%)}
.nr-msg{position:absolute;inset:0;display:grid;place-items:center;color:#8b93a7;font:13px "IBM Plex Mono",monospace;padding:16px;text-align:center}
.nr-hud{position:absolute;left:14px;top:14px;right:14px;display:flex;flex-wrap:wrap;gap:8px;pointer-events:none}
.nr-chip{font:500 13px/1 "IBM Plex Mono",ui-monospace,monospace;padding:7px 10px;border-radius:8px;
  background:rgba(10,10,10,.55);border:1px solid rgba(255,255,255,.08);color:#e4e2de;white-space:nowrap;
  backdrop-filter:blur(6px);transition:color .2s,border-color .2s}
.nr-chip.on{color:#fff;border-color:rgba(255,91,53,.8);background:rgba(255,91,53,.18)}
.nr-label{display:flex;align-items:center;gap:6px;padding:4px 8px;border-radius:999px;background:rgba(18,21,28,.82);
  border:1px solid #222733;font:600 12px/1.2 Inter,system-ui,sans-serif;color:#e7e9ee;white-space:nowrap;position:relative;top:-6px}
.nr-pill{display:none;font:700 10px/1 "IBM Plex Mono",monospace;letter-spacing:.04em;padding:3px 5px;border-radius:4px}
.nr-pill.fell{display:inline-block;background:#ff5b35;color:#fff}
.nr-pill.held{display:inline-block;background:#d7f25d;color:#04141a}
.nr-tag{font:600 10px/1 "IBM Plex Mono",monospace;color:#bfe3ff;background:rgba(15,40,70,.6);border:1px solid rgba(124,196,255,.5);
  padding:3px 6px;border-radius:4px;white-space:nowrap}
.nr-tag.red{color:#fff;background:rgba(255,91,53,.85);border-color:#ff5b35}
.nr-bar{display:flex;align-items:center;gap:10px 12px;padding:10px 12px;border-top:1px solid #222733;background:#12151c;flex-wrap:wrap}
.nr-play{width:38px;height:38px;border-radius:50%;border:0;background:#ff5b35;color:#fff;display:grid;place-items:center;
  cursor:pointer;flex:none;padding:0}
.nr-play svg{width:16px;height:16px;fill:currentColor}
.nr-track{position:relative;flex:1 1 180px;height:30px;min-width:140px}
.nr-rail{position:absolute;left:0;right:0;top:13px;height:4px;border-radius:2px;background:#222733;overflow:hidden}
.nr-fill{position:absolute;left:0;top:0;bottom:0;background:#8b93a7}
.nr-band{position:absolute;top:10px;height:10px;border-radius:2px;background:rgba(255,91,53,.45);min-width:3px}
.nr-mark{position:absolute;top:5px;width:3px;height:20px;margin-left:-1px;border-radius:2px;background:#ff5b35}
.nr-range{position:absolute;inset:0;width:100%;height:100%;margin:0;background:transparent;-webkit-appearance:none;appearance:none;cursor:pointer}
.nr-range::-webkit-slider-runnable-track{height:30px;background:transparent}
.nr-range::-moz-range-track{height:30px;background:transparent}
.nr-range::-webkit-slider-thumb{-webkit-appearance:none;width:14px;height:14px;margin-top:8px;border-radius:50%;background:#e7e9ee;
  border:0;box-shadow:0 0 0 4px rgba(231,233,238,.15)}
.nr-range::-moz-range-thumb{width:14px;height:14px;border-radius:50%;background:#e7e9ee;border:0;box-shadow:0 0 0 4px rgba(231,233,238,.15)}
.nr-time{font:13px "IBM Plex Mono",ui-monospace,monospace;color:#c8c6c1;min-width:92px;text-align:right;flex:none}
.nr-speed{display:flex;gap:2px;background:#0b0d12;border:1px solid #222733;border-radius:8px;padding:2px;flex:none}
.nr-speed button{border:0;background:transparent;color:#a9a7a2;font:500 13px "IBM Plex Mono",monospace;padding:5px 8px;border-radius:6px;cursor:pointer}
.nr-speed button.on{background:#222733;color:#e7e9ee}
@container (max-width:480px){.nr-track{flex-basis:100%;order:-1}.nr-time{min-width:0;margin-right:auto;text-align:left}}
`;function Eb(){if(document.getElementById("nr-style"))return;const s=document.createElement("style");s.id="nr-style",s.textContent=Mb,document.head.appendChild(s)}function Zt(s,e,t){const i=document.createElement(s);return e&&(i.className=e),t!=null&&(i.innerHTML=t),i}const nv='<svg viewBox="0 0 16 16"><path d="M4 2.5v11l9-5.5z"/></svg>',wb='<svg viewBox="0 0 16 16"><path d="M3.5 2.5h3v11h-3zM9.5 2.5h3v11h-3z"/></svg>';function Tb(s){const t=document.createElement("canvas");t.width=t.height=512;const i=t.getContext("2d");i.fillStyle="#0f1218",i.fillRect(0,0,512,512),i.strokeStyle="rgba(139,147,167,0.10)",i.lineWidth=2;for(let l=1;l<4;l++){const d=l*512/4;i.beginPath(),i.moveTo(d,0),i.lineTo(d,512),i.moveTo(0,d),i.lineTo(512,d),i.stroke()}i.strokeStyle="rgba(139,147,167,0.24)",i.lineWidth=3,i.strokeRect(0,0,512,512);const o=new YT(t);return o.wrapS=o.wrapT=ic,o.anisotropy=s.capabilities.getMaxAnisotropy(),o.colorSpace=dn,o}function bb(s){const e=s.size;switch(s.type){case"box":return new Ti(2*e[0],2*e[1],2*e[2]);case"sphere":return new dc(e[0],24,16);case"ellipsoid":return new dc(1,24,16).scale(e[0],e[1],e[2]);case"capsule":return new bf(e[0],2*e[1],8,16).rotateX(Math.PI/2);case"cylinder":return new ma(e[0],e[0],2*e[1],24).rotateX(Math.PI/2);default:return null}}function Ab(s){const e=new Sn;e.setAttribute("position",new Yn(fc(s.vert),3)),e.setIndex(new Yn(fc(s.face),1));const t=xb(e,ns.degToRad(40));return e.dispose(),t.computeBoundingSphere(),t}function Cb(s){const e=new br,t=new Rt(new ma(1,1,1,16).translate(0,.5,0),s),i=new Rt(new Cf(1,1,24).translate(0,.5,0),s);return t.castShadow=i.castShadow=!0,e.add(t,i),e.visible=!1,e.set=(o,l,d,c)=>{const f=Math.min(d*.38,.1);t.scale.set(c,d-f,c),i.scale.set(c*2.6,f,c*2.6),i.position.y=d-f,e.position.copy(o),e.quaternion.setFromUnitVectors(yb,l)},e}function cf(s){const e=document.createElement("div");return e.appendChild(s),e}function Rb(s){return 1-(1-s)*(1-s)}function Pb(s,e,t,i,o){const{assets:l,meshGeos:d,track:c}=s,f=e.overlays||{},h=new br,p=f.start?f.start.yaw:0,g=f.start?f.start.origin:[0,0];h.quaternion.setFromAxisAngle(h0,-p),h.position.set(-g[0],-g[1],0).applyQuaternion(h.quaternion).add(new B(0,i,0));const y=fc(e.pos),S=fc(e.quat),E=e.bodies.length,M=e.n_frames,x=new Map(e.bodies.map((ve,Ae)=>[ve,Ae])),v=new Map((f.weak||[]).map(ve=>[ve.body,ve.amount])),b=l.bodies.map((ve,Ae)=>{const ze=new br;return ze.userData.k=x.has(ve.name)?x.get(ve.name):-1,h.add(ze),ze}),A=new Et(kn.robot),P=new Et(kn.crimson),z=l.bodies.map((ve,Ae)=>{var nt;const ze=v.get(Ae)||0,Q=new Lr({color:s.modelColors?new Et().fromArray(((nt=l.geoms.find(ke=>ke.body===Ae))==null?void 0:nt.rgba)||[.7,.7,.7]):A.clone(),metalness:.35,roughness:.42,envMapIntensity:.9});return ze>0&&(Q.color.lerp(P,ze),Q.emissive=P.clone(),Q.emissiveIntensity=.35*ze),o&&(Q.transparent=!0,Q.opacity=.3,Q.depthWrite=!1),c(Q)});for(const ve of l.geoms){const Ae=ve.type==="mesh"?d[ve.mesh]:c(bb(ve));if(!Ae)continue;const ze=new Rt(Ae,z[ve.body]);ze.position.fromArray(ve.pos),ze.quaternion.set(ve.quat[1],ve.quat[2],ve.quat[3],ve.quat[0]),ze.castShadow=!o,ze.receiveShadow=!0,b[ve.body].add(ze)}const D=Math.max(0,l.bodies.findIndex(ve=>ve.name==="trunk")),I=b[D];if(f.payload){const ve=f.payload,Ae=ve.half_size,ze=new Rt(c(new Ti(2*Ae[0],2*Ae[1],2*Ae[2])),c(new Lr({color:kn.crimson,roughness:.55,metalness:.1,emissive:kn.crimson,emissiveIntensity:.25})));ze.position.fromArray(ve.pos),ze.castShadow=!0,b[ve.body].add(ze)}const ne=c(new so({color:kn.ice,transparent:!0,opacity:.55,depthWrite:!1})),R=c(new Af(.055,32)),U=(f.slippery_feet||[]).map(ve=>{const Ae=new Rt(R,ne);return Ae.renderOrder=2,h.add(Ae),{mesh:Ae,body:b[ve.body],local:new B().fromArray(ve.pos)}}),se=c(new Lr({color:kn.crimson,emissive:kn.crimson,emissiveIntensity:.6,transparent:!0})),le=Cb(se);h.add(le);const ge=(f.pushes||[]).map(ve=>({...ve,f:new B().fromArray(ve.force)})),V=Zt("div","nr-tag red"),J=new lf(cf(V));J.visible=!1,h.add(J);const te=e.fall_time,q={};if(te!=null){const ve=c(new so({color:kn.crimson,transparent:!0,opacity:0,depthWrite:!1,side:wi})),Ae=c(new so({color:kn.crimson,transparent:!0,opacity:0,depthWrite:!1}));q.ring=new Rt(c(new uc(.92,1,64)),ve),q.mark=new Rt(c(new uc(.1,.13,48)),Ae),q.ring.renderOrder=q.mark.renderOrder=3,h.add(q.ring,q.mark)}const X=Zt("div","nr-label",'<span></span><span class="nr-pill"></span>');X.firstChild.textContent=t;const K=X.lastChild,Y=new lf(cf(X));h.add(Y);const O=new $i,F=new $i,j=new B,ce=new B,me=new B,ye=e.duration;function Se(ve){const Ae=ns.clamp(ve/e.dt,0,M-1),ze=Math.floor(Ae),Q=Math.min(ze+1,M-1),nt=Ae-ze;for(const ke of b){const Qe=ke.userData.k;if(Qe<0)continue;const Ve=(ze*E+Qe)*3,wt=(Q*E+Qe)*3;ke.position.set(y[Ve]+(y[wt]-y[Ve])*nt,y[Ve+1]+(y[wt+1]-y[Ve+1])*nt,y[Ve+2]+(y[wt+2]-y[Ve+2])*nt);const ot=(ze*E+Qe)*4,L=(Q*E+Qe)*4;O.set(S[ot+1],S[ot+2],S[ot+3],S[ot]),F.set(S[L+1],S[L+2],S[L+3],S[L]),ke.quaternion.slerpQuaternions(O,F,nt)}}te!=null&&(Se(te),q.ring.position.set(I.position.x,I.position.y,.006),q.mark.position.copy(q.ring.position));function Fe(ve){Se(ve);for(const nt of U)j.copy(nt.local).applyQuaternion(nt.body.quaternion).add(nt.body.position),nt.mesh.position.set(j.x,j.y,.004);let Ae=0;me.set(0,0,0);for(const nt of ge)ve>=nt.t0&&ve<nt.t1?(me.add(nt.f),Ae=1):ve>=nt.t1&&ve<nt.t1+.25&&Ae<1&&(me.add(nt.f),Ae=Math.max(Ae,1-(ve-nt.t1)/.25));const ze=me.length();if(le.visible=J.visible=ze>1&&Ae>0,le.visible){me.divideScalar(ze);const nt=.25+.45*Math.min(ze,300)/150,ke=j.copy(I.position).addScaledVector(me,-.1);ce.copy(ke).addScaledVector(me,-nt),le.set(ce,me,nt,.012+.02*Math.min(ze,300)/150),se.opacity=Ae,J.position.copy(ce).add(j.set(0,0,.08)),V.textContent=`PUSH ${Math.round(ze)} N`,V.style.opacity=Ae}Y.position.copy(I.position).add(j.set(0,0,.36));let Q=0;if(te!=null){const nt=ve-te,ke=nt>=0;if(K.className=ke?"nr-pill fell":"nr-pill",K.textContent=ke?`FELL ${te.toFixed(2)} s`:"",ke){const Qe=Math.min(1,nt/.8);q.ring.scale.setScalar(.12+.85*Rb(Qe)),q.ring.material.opacity=.9*(1-Qe),q.mark.material.opacity=.9,Q=.8*Math.max(0,1-nt/.45)}else q.ring.material.opacity=q.mark.material.opacity=0}else{const nt=ve>=ye-.001;K.className=nt?"nr-pill held":"nr-pill",K.textContent=nt?"HELD":""}return Q}return{root:h,trunk:I,update:Fe,duration:ye,fallT:te,label:t,labelEl:X}}async function Lb(s,e={}){const{assetsUrl:t="assets/go1_scene.json",trajUrls:i=[],trajs:o=null,layout:l="side",spacing:d=1.1,autoplay:c=!0,loop:f=!0,speed:h=1,startTime:p=0,hud:g=!0,modelColors:y=!1,onTime:S=null}=e;Eb();const E=Zt("div","nr");E.tabIndex=0;const M=Zt("div","nr-stage"),x=Zt("div","nr-msg","loading replay…");M.appendChild(x),E.appendChild(M),s.appendChild(E);let v,b;try{[v,b]=await Promise.all([e.assets?Promise.resolve(e.assets):Sb(t),o?Promise.resolve(o):Promise.all(i.map(ae=>p0(typeof ae=="string"?ae:ae.url)))])}catch(ae){return x.textContent=`replay unavailable: ${ae.message}`,{setTime(){},play(){},pause(){},setSpeed(){},dispose(){E.remove()},error:ae}}x.remove();const A=b.map((ae,pe)=>i[pe]&&i[pe].label||ae.label||["Original","Nemesis-trained"][pe]||`Robot ${pe+1}`),P=new Set,z=ae=>(ae&&P.add(ae),ae),D=new s0({antialias:!0,powerPreference:"high-performance"});D.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),D.shadowMap.enabled=!0,D.shadowMap.type=bv,D.toneMapping=Cv,D.toneMappingExposure=1.05,D.setClearColor(kn.bg,1),M.appendChild(D.domElement);const I=new gb;I.domElement.className="nr-labels",M.appendChild(I.domElement);const ne=Zt("div","nr-hud"),R=Zt("div","nr-flash");M.append(R,ne);const U=new o0;U.background=new Et(kn.bg),U.fog=new Mf(kn.bg,5,16);const se=new sf(D),le=se.fromScene(new vb(D),.04).texture;U.environment=le;const ge=new $n(38,16/9,.05,60);ge.up.copy(h0),U.add(new ub(13095678,724242,.55));const V=new $g(16777215,2.2);V.castShadow=!0,V.shadow.mapSize.set(2048,2048),Object.assign(V.shadow.camera,{left:-2.5,right:2.5,top:2.5,bottom:-2.5,near:.5,far:14}),V.shadow.bias=-4e-4,V.shadow.normalBias=.02,V.shadow.radius=4,V.shadow.camera.updateProjectionMatrix(),U.add(V,V.target);const J=new $g(9684477,.9);U.add(J,J.target);const te=new br;U.add(te);const q=b[0].overlays||{};if(q.slope){const{pitch:ae,roll:pe}=q.slope,tt=new B(-Math.sin(ae)*Math.cos(pe),Math.sin(pe),-Math.cos(ae)*Math.cos(pe));te.quaternion.setFromUnitVectors(tt,new B(0,0,-1))}const X=z(Tb(D)),K=60;X.repeat.set(K,K);const Y=new Rt(z(new Ec(K,K)),z(new Lr({map:X,roughness:.92,metalness:0,envMapIntensity:.25})));Y.position.set(K/2-6,0,v.floor&&v.floor.z||0),Y.receiveShadow=!0,te.add(Y);const O=b.length,F=l==="ghost"&&O>1,j=b.map((ae,pe)=>F?0:((O-1)/2-pe)*d);if(q.terrain&&(q.terrain.steps||[]).length){const ae=Math.max(q.terrain.width||3,1.8+(F?0:d*(O-1))),pe=z(new Lr({color:2763567,roughness:.85,metalness:0,envMapIntensity:.3})),tt=z(new af({color:kn.crimson,transparent:!0,opacity:.55}));for(const je of q.terrain.steps){const ht=je.x1-je.x0,Tt=je.height;if(ht<=0||Tt<=0)continue;const yt=new Rt(z(new Ti(ht,ae,Tt)),pe);yt.position.set(je.x0+ht/2,0,Tt/2),yt.castShadow=!0,yt.receiveShadow=!0;const $t=new a0(z(new Sn().setFromPoints([new B(-ht/2,-ae/2,Tt/2+.001),new B(-ht/2,ae/2,Tt/2+.001)])),tt);yt.add($t),te.add(yt)}}if(q.ice){const ae=q.ice,pe=1.8+(F?0:d*(O-1)),tt=new Rt(z(new Ti(ae.length,pe,.006)),z(new Lr({color:3906815,transparent:!0,opacity:.26,roughness:.15,metalness:0,envMapIntensity:.2,emissive:1929174,emissiveIntensity:.45,depthWrite:!1})));tt.position.set(ae.start+ae.length/2,0,.004),tt.renderOrder=1;const je=new $T(z(new cb(tt.geometry)),z(new af({color:kn.ice,transparent:!0,opacity:.7})));tt.add(je),te.add(tt);const ht=Zt("div","nr-tag");ht.textContent=`ICE μ ${ae.mu}`,ht.style.marginLeft="60px";const Tt=new lf(cf(ht));Tt.position.set(ae.start+.05,pe/2-.15,.02),te.add(Tt)}const ce=v.meshes.map(ae=>z(Ab(ae))),me={assets:v,meshGeos:ce,track:z,modelColors:y},ye=b.map((ae,pe)=>Pb(me,ae,A[pe],j[pe],F&&pe===0));ye.forEach(ae=>te.add(ae.root)),F&&ye.forEach((ae,pe)=>{ae.labelEl.style.transform=`translateX(${pe?"calc(50% + 4px)":"calc(-50% - 4px)"})`});const Se=Math.max(...ye.map(ae=>ae.duration)),Fe=ae=>(v.sites?Object.keys(v.sites).length:4)===ae.length;if(g){const ae=[],pe=(je,ht)=>{const Tt=Zt("span","nr-chip");Tt.textContent=je,ht&&(Tt.dataset.key=ht),ne.appendChild(Tt),ae.push(Tt)};if(q.terrain&&(q.terrain.steps||[]).length){const je=q.terrain.steps,ht=Math.round(je[0].height*100);pe(je.length===1?`${ht} cm curb`:`${je.length} steps × ${ht} cm`)}if(q.ice&&pe(`ice μ ${+(+q.ice.mu).toFixed(2)}, ${+(+q.ice.length).toFixed(1)} m patch`),(q.slippery_feet||[]).length){const je=q.slippery_feet,ht=+Math.min(...je.map(Tt=>Tt.mu)).toFixed(2);pe(je.length>=4||je.length===2&&Fe(je)?`slippery floor μ ${ht}`:`slippery ${je.map(Tt=>Tt.site).join(" ")} μ ${ht}`)}q.payload&&pe(`${+(+q.payload.mass).toFixed(1)} kg load`),(q.pushes||[]).forEach((je,ht)=>pe(`${Math.round(je.magnitude)} N shove at ${(+je.t0).toFixed(1)} s`,`push${ht}`));for(const je of q.weak||[])pe(`${je.name.replace("_"," ")} at ${Math.round(je.strength*100)}%`);if(q.slope){const je=ht=>Math.round(ns.radToDeg(ht)*10)/10;Math.abs(q.slope.pitch)>1e-4&&pe(`slope ${je(Math.abs(q.slope.pitch))}° ${q.slope.pitch>0?"uphill":"downhill"}`),Math.abs(q.slope.roll)>1e-4&&pe(`side slope ${je(q.slope.roll)}°`)}const tt=q.conditions||{};tt.latency&&pe(`${Math.round(tt.latency)*20} ms lag`),tt.obs_noise&&pe("sensor noise"),tt.joint_friction&&pe(`joint friction ×${tt.joint_friction}`),ne.chips=ae}const ve=Zt("div","nr-bar"),Ae=Zt("button","nr-play",nv);Ae.setAttribute("aria-label","Play");const ze=Zt("div","nr-track"),Q=Zt("div","nr-rail"),nt=Zt("div","nr-fill");Q.appendChild(nt),ze.appendChild(Q);for(const ae of q.pushes||[]){const pe=Zt("div","nr-band");pe.style.left=`${100*ae.t0/Se}%`,pe.style.width=`${100*(ae.t1-ae.t0)/Se}%`,pe.title=`push ${Math.round(ae.magnitude)} N`,ze.appendChild(pe)}ye.forEach(ae=>{if(ae.fallT==null)return;const pe=Zt("div","nr-mark");pe.style.left=`${100*ae.fallT/Se}%`,pe.title=`${ae.label} fell at ${ae.fallT.toFixed(2)} s`,ze.appendChild(pe)});const ke=Zt("input","nr-range");Object.assign(ke,{type:"range",min:0,max:Se,step:.001,value:0}),ke.setAttribute("aria-label","Replay time"),ze.appendChild(ke);const Qe=Zt("div","nr-time"),Ve=Zt("div","nr-speed"),wt=[.25,.5,1],ot=wt.map(ae=>{const pe=Zt("button","",`${ae}×`);return pe.onclick=()=>st.setSpeed(ae),Ve.appendChild(pe),pe});ve.append(Ae,ze,Qe,Ve),E.appendChild(ve);let L=ns.clamp(p,0,Se),C=!1,oe=h,we=0,Me=0,be=performance.now(),Je=!0,Ie=!1,He=!1;const qe=new mb(ge,D.domElement);qe.enableDamping=!0,qe.dampingFactor=.08,qe.minDistance=.6,qe.maxDistance=12,qe.maxPolarAngle=ns.degToRad(86),qe.addEventListener("start",()=>{He=!0});const rt=new B,xe=new B,mt=new B;function H(ae){ae.set(0,0,0);for(const pe of ye)ae.add(pe.trunk.getWorldPosition(mt));return ae.divideScalar(ye.length)}const _e=new B(-1.55,-2.25,1.05);function Ue(){const ae=ge.aspect,pe=(ae<1.2?1.2/ae:1)**.6*(F||O===1?.85:1);qe.target.copy(rt),ge.position.copy(rt).addScaledVector(_e,pe)}function Re(){const ae=M.clientWidth,pe=M.clientHeight;!ae||!pe||(D.setSize(ae,pe,!1),I.setSize(ae,pe),ge.aspect=ae/pe,ge.updateProjectionMatrix(),He||Ue())}function $e(ae){C=ae,Ae.innerHTML=ae?wb:nv,Ae.setAttribute("aria-label",ae?"Pause":"Play")}function dt(){let ae=0;for(const pe of ye)ae=Math.max(ae,pe.update(L));if(te.updateMatrixWorld(!0),R.style.opacity=ae.toFixed(3),ke.value=L,nt.style.width=`${100*L/Se}%`,Qe.textContent=`${L.toFixed(2)} / ${Se.toFixed(2)} s`,ne.chips)for(const pe of ne.chips){const tt=pe.dataset.key;if(!tt)continue;const je=q.pushes[+tt.slice(4)];pe.classList.toggle("on",L>=je.t0&&L<je.t1+.25)}S&&S(L)}function gt(ae){Me=requestAnimationFrame(gt);const pe=Math.max(0,Math.min(.25,(ae-be)/1e3));if(be=ae,!Je)return;C&&(L>=Se?(we+=pe,f?we>1.2&&(L=0,we=0):$e(!1)):L=Math.min(Se,L+pe*oe),dt()),H(xe);const tt=rt.clone();rt.lerp(xe,1-Math.exp(-pe*3.5));const je=tt.sub(rt).negate();ge.position.add(je),qe.target.copy(rt),qe.update(),V.target.position.copy(rt),V.position.copy(rt).add(xe.set(1.8,-2.4,5)),J.target.position.copy(rt),J.position.copy(rt).add(xe.set(-3,3,1.5)),D.render(U,ge),I.render(U,ge)}const st={get time(){return L},duration:Se,setTime(ae){L=ns.clamp(+ae||0,0,Se),we=0,dt()},play(){L>=Se&&(L=0),we=0,$e(!0)},pause(){$e(!1)},toggle(){C?st.pause():st.play()},setSpeed(ae){oe=ae,ot.forEach((pe,tt)=>pe.classList.toggle("on",wt[tt]===ae))},resetCamera(){He=!1,Ue()},dispose(){if(!Ie){Ie=!0,cancelAnimationFrame(Me),Pe.disconnect(),Ne.disconnect(),E.removeEventListener("keydown",G),qe.dispose();for(const ae of P)ae.dispose();le.dispose(),se.dispose(),D.dispose(),D.forceContextLoss(),E.remove()}}};Ae.onclick=()=>st.toggle();let Le=!1;ke.addEventListener("pointerdown",()=>{Le=C,$e(!1)}),ke.addEventListener("input",()=>st.setTime(ke.value)),ke.addEventListener("change",()=>{Le&&(Le=!1,$e(!0))});const G=ae=>{ae.target===ke&&ae.key.startsWith("Arrow")||(ae.key===" "||ae.key==="k"?(ae.preventDefault(),st.toggle()):(ae.key==="ArrowRight"||ae.key==="ArrowLeft")&&(ae.preventDefault(),st.pause(),st.setTime(L+(ae.key==="ArrowRight"?1:-1)*b[0].dt)))};E.addEventListener("keydown",G);const Pe=new ResizeObserver(Re);Pe.observe(M);const Ne=new IntersectionObserver(ae=>{Je=ae[0].isIntersecting,be=performance.now()});return Ne.observe(E),st.setSpeed(h),dt(),H(rt),Re(),Ue(),c&&st.play(),Me=requestAnimationFrame(gt),st}function Nr({trajs:s,className:e="",hud:t=!0,robot:i="go1"}){const o=ie.useRef(null),l=JSON.stringify(s.map(d=>d.url||d.label||d.n_frames));return ie.useEffect(()=>{if(!o.current||!s.length)return;let d,c=!1;const f=s.every(h=>!h.url);return Lb(o.current,{assetsUrl:`/assets/${i}_scene.json`,hud:t,...f?{trajs:s}:{trajUrls:s.map(h=>({url:h.url,label:h.label}))}}).then(h=>{c?h.dispose():d=h}),()=>{c=!0,d==null||d.dispose()}},[l,i]),w.jsx("div",{ref:o,className:`replay-fill overflow-hidden ${e}`})}const Nb=["Slipping while turning","Carrying a heavy backpack","Weak motors on one side"];function Db(){const[s,e]=ie.useState(null),[t,i]=ie.useState([]),[o,l]=ie.useState(!1),[d,c]=ie.useState(""),[f,h]=ie.useState(null),p=async S=>{e(S),l(!0),c(""),i([]),h(null);try{const{job:E}=await os("/api/agent",{goal:S});await vc(E,M=>i(x=>{var v;return M.stage==="progress"&&((v=x.at(-1))==null?void 0:v.stage)==="progress"?[...x.slice(0,-1),M]:[...x,M]}))}catch(E){c(E.message)}l(!1)};ie.useEffect(()=>{const S=new URLSearchParams(location.search).get("q");S&&p(S)},[]);const g=ie.useMemo(()=>{const S={};for(const E of t)E.stage==="failure"&&(S[E.id]={id:E.id,hypothesis:E.hypothesis,fall_rate:E.fall_rate,trajs:E.trajs,clip:E.clip}),E.stage==="diagnosis"&&S[E.id]&&(S[E.id].diagnosis=E),E.stage==="margin"&&S[E.id]&&(S[E.id].margin=E);return Object.values(S)},[t]),y=g.find(S=>S.id===f)||g.at(-1);return ie.useEffect(()=>{g.length&&h(g.at(-1).id)},[g.length]),s===null?w.jsxs("div",{className:"mx-auto flex min-h-[calc(100dvh-10rem)] max-w-2xl flex-col justify-center pb-16",children:[w.jsx("h1",{className:"text-center text-[40px] font-medium leading-[1.05] tracking-[-0.035em] sm:text-[52px]",children:"Autopilot"}),w.jsx("p",{className:"mx-auto mt-4 max-w-md text-center text-base leading-[1.55] text-ink/70",children:"Tell it what to look into. Muse forms hypotheses, simulates them on the live robot, watches every fall, and retrains it, on its own."}),w.jsx("div",{className:"mt-10",children:w.jsx(iv,{onSend:p})}),w.jsx("div",{className:"mt-4 flex flex-wrap justify-center gap-2",children:Nb.map(S=>w.jsx("button",{onClick:()=>p(S),className:"rounded-full border border-white/12 bg-white/[.04] px-3 py-1.5 text-[13px] text-ink/85 transition-colors hover:border-white/30 hover:bg-white/[.09]",children:S},S))})]}):w.jsxs("div",{className:"grid gap-5 lg:h-[calc(100dvh-8.5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]",children:[w.jsxs("section",{className:"flex min-h-[60dvh] flex-col overflow-hidden rounded-2xl border border-line bg-panel lg:min-h-0",children:[w.jsx(Ub,{prompt:s,events:t,running:o,error:d,selected:y==null?void 0:y.id,onSelect:h}),w.jsx("div",{className:"border-t border-line p-3",children:w.jsx(iv,{onSend:p,disabled:o,placeholder:o?"Muse is working…":"Ask Muse to test something else"})})]}),w.jsxs("section",{className:"flex min-h-[60dvh] flex-col overflow-hidden rounded-2xl border border-line bg-panel lg:min-h-0",children:[y?w.jsx(Ib,{o:y}):w.jsx("div",{className:"grid flex-1 place-items-center p-8 text-center",children:w.jsxs("div",{children:[o?w.jsx(xc,{size:20,className:"mx-auto animate-spin text-faint"}):null,w.jsx("p",{className:"mt-3 text-sm text-mute",children:o?"Failures Muse finds will play here.":"No failures found."})]})}),g.length>1&&w.jsx("div",{className:"flex gap-2 overflow-x-auto border-t border-line p-3",children:g.map((S,E)=>w.jsxs("button",{onClick:()=>h(S.id),className:`flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-[13px] transition-colors ${S.id===(y==null?void 0:y.id)?"border-white/30 bg-white/10 text-ink":"border-white/10 text-mute hover:text-ink"}`,children:[w.jsx("span",{className:"font-mono text-xs text-faint",children:E+1})," fell ",Qt(S.fall_rate)]},S.id))})]})]})}function iv({onSend:s,disabled:e,placeholder:t="e.g. slipping while turning"}){const[i,o]=ie.useState(""),l=()=>{i.trim().length>=2&&!e&&(s(i.trim()),o(""))};return w.jsxs("div",{className:"flex items-center gap-2 rounded-2xl border border-white/12 bg-bg py-2 pr-2 pl-4 focus-within:border-white/30",children:[w.jsx("input",{value:i,onChange:d=>o(d.target.value),onKeyDown:d=>d.key==="Enter"&&l(),disabled:e,placeholder:t,className:"min-w-0 flex-1 bg-transparent py-1.5 text-base outline-none placeholder:text-mute/80 disabled:opacity-60"}),w.jsx("button",{onClick:l,disabled:e||i.trim().length<2,className:`grid size-9 shrink-0 place-items-center rounded-full transition-colors ${i.trim().length>=2&&!e?"bg-ember text-black":"bg-white/[.07] text-mute"}`,children:w.jsx(wv,{size:18})})]})}function Ub({prompt:s,events:e,running:t,error:i,selected:o,onSelect:l}){const d=ie.useRef(null);ie.useEffect(()=>{var p;(p=d.current)==null||p.scrollIntoView({behavior:"smooth",block:"end"})},[e.length]);const c=[];let f=null;for(const p of e)p.stage==="say"?c.push({kind:"say",text:p.text}):p.stage==="tool_call"&&p.tool==="test_hypothesis"?(f={kind:"test",text:p.args.hypothesis,state:"run"},c.push(f)):p.stage==="failure"&&f?(f.state="fell",f.id=p.id,f.rate=p.fall_rate,f=null):p.stage==="tool_result"&&p.tool==="test_hypothesis"&&f?(f.state=p.result.error?"error":"held",f.rate=p.result.fall_rate,f=null):p.stage==="diagnosis"?c.push({kind:"spark",e:p}):p.stage==="margin"?c.push({kind:"margin",e:p}):p.stage==="tool_call"&&p.tool==="patch"?c.push({kind:"patch"}):["bank","training","progress","gating","verified","rejected"].includes(p.stage)?c.push({kind:"patchev",e:p}):p.stage==="done"&&p.summary?c.push({kind:"summary",text:p.summary}):p.stage==="failed"&&c.push({kind:"error",text:p.error});const h=c.filter(p=>p.kind==="patchev").map(p=>p.e);return w.jsxs("div",{className:"flex-1 space-y-5 overflow-y-auto px-5 py-6",children:[w.jsx("div",{className:"flex justify-end",children:w.jsx("p",{className:"max-w-[85%] rounded-2xl rounded-br-md bg-white/[.08] px-4 py-2.5 text-[15px]",children:s})}),c.map((p,g)=>{switch(p.kind){case"say":case"summary":return w.jsx("p",{className:"rise whitespace-pre-line text-[15px] leading-[1.6] text-ink/90",children:p.text},g);case"test":return w.jsxs("button",{onClick:()=>p.id&&l(p.id),disabled:!p.id,className:`rise flex w-full items-start gap-3 rounded-xl border px-3.5 py-3 text-left transition-colors ${p.id&&p.id===o?"border-white/25 bg-white/[.05]":"border-line"} ${p.id?"hover:border-white/25":""}`,children:[w.jsx("span",{className:"mt-0.5 shrink-0",children:p.state==="run"?w.jsx(xc,{size:15,className:"animate-spin text-mute"}):p.state==="fell"?w.jsx("i",{className:"block size-[15px] rounded-full bg-ember"}):p.state==="held"?w.jsx(ha,{size:15,className:"text-acid"}):w.jsx(pf,{size:15,className:"text-faint"})}),w.jsx("span",{className:"min-w-0 flex-1 text-[14px] leading-snug text-mute",children:p.text}),w.jsx("span",{className:`shrink-0 font-mono text-xs ${p.state==="fell"?"text-ember":p.state==="held"?"text-acid":"text-faint"}`,children:p.state==="run"?"testing":p.state==="fell"?`fell ${Qt(p.rate)}`:p.state==="held"?`held ${Qt(p.rate)}`:"retry"})]},g);case"spark":return w.jsxs("div",{className:"rise border-l-2 border-peri/60 pl-4",children:[w.jsx("p",{className:"text-[13px] text-peri",children:"Muse Spark watched the fall"}),w.jsxs("p",{className:"mt-1 text-[14px] leading-relaxed text-mute",children:[w.jsxs("span",{className:"text-ink",children:[p.e.mode,"."]})," ",p.e.likely_cause]})]},g);case"margin":return w.jsxs("p",{className:"rise text-[14px] text-mute",children:["Falls begin at ",w.jsx("span",{className:"font-mono text-ink",children:hc(p.e.starts_falling_at)})," ",p.e.condition.replace(/_/g," "),"."]},g);case"patch":return w.jsx(Ry,{events:h},g);case"error":return w.jsx("p",{className:"text-sm text-ember",children:p.text},g);default:return null}}),t&&w.jsxs("p",{className:"flex items-center gap-2 text-sm text-faint",children:[w.jsx("span",{className:"blink text-ember",children:"●"})," thinking"]}),i&&w.jsx("p",{className:"text-sm text-ember",children:i}),w.jsx("div",{ref:d})]})}function Ib({o:s}){return w.jsxs("div",{className:"flex min-h-0 flex-1 flex-col",children:[w.jsx("div",{className:"relative min-h-[300px] flex-1 bg-[#0b0d12]",children:s.trajs?w.jsx(Nr,{trajs:s.trajs.map((e,t)=>({url:e.url,label:t===0?"original":e.label})),className:"absolute inset-0"},s.id):w.jsx("video",{src:s.clip,autoPlay:!0,muted:!0,loop:!0,playsInline:!0,className:"absolute inset-0 size-full object-contain"},s.id)}),w.jsxs("div",{className:"space-y-3 border-t border-line px-5 py-4",children:[w.jsx("p",{className:"text-[15px] leading-snug",children:s.hypothesis}),w.jsxs("div",{className:"flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-mute",children:[w.jsxs("span",{children:["Fell in ",w.jsx("span",{className:"text-ember",children:Qt(s.fall_rate)})," of tries"]}),s.margin&&w.jsxs("span",{className:"flex items-center gap-2",children:["Margin",w.jsx("span",{className:"flex h-4 items-end gap-[2px]",children:s.margin.curve.map((e,t)=>w.jsx("i",{style:{height:`${Math.max(15,e.fall_rate*100)}%`},className:`block w-1.5 ${e.fall_rate>=.5?"bg-ember":"bg-white/20"}`},t))}),w.jsx("span",{className:"font-mono text-xs text-ink",children:hc(s.margin.starts_falling_at)})]})]}),s.diagnosis&&w.jsxs("p",{className:"text-[14px] leading-relaxed text-mute",children:[w.jsx("span",{className:"text-peri",children:"Muse Spark · "}),s.diagnosis.what_happened]})]})]})}function hc(s){if(s==null)return"never";if(Array.isArray(s)){if(s.every(t=>t===s[0]))return hc(s[0]);const e=s.filter(t=>Math.abs(t)>1e-6);return e.length===1?hc(e[0]):`[${s.map(t=>+(+t).toFixed(2)).join(", ")}]`}return String(typeof s=="number"?+s.toFixed(2):s)}function m0({onText:s,onVoice:e,onFile:t,busy:i,examples:o=[],accent:l="bg-ember",prefill:d}){const[c,f]=ie.useState(""),[h,p]=ie.useState(0),[g,y]=ie.useState(null),S=ie.useRef(null),E=ie.useRef(null);ie.useEffect(()=>{if(o.length<2)return;const v=setInterval(()=>p(b=>(b+1)%o.length),3200);return()=>clearInterval(v)},[o.length]),ie.useEffect(()=>{var v;d&&(f(d.text),(v=S.current)==null||v.focus())},[d==null?void 0:d.n]),ie.useEffect(()=>{const v=S.current;v&&(v.style.height="0px",v.style.height=`${Math.min(v.scrollHeight,200)}px`)},[c]);const M=()=>{const v=c.trim();v.length>=3&&!i&&s(v)},x=async()=>{if(g){g.stop();return}try{const v=await navigator.mediaDevices.getUserMedia({audio:!0}),b=new MediaRecorder(v),A=[];b.ondataavailable=P=>A.push(P.data),b.onstop=async()=>{v.getTracks().forEach(P=>P.stop()),y(null),e==null||e(await gy(new Blob(A)))},b.start(),y(b)}catch{}};return w.jsxs("div",{className:`flex items-end gap-1 rounded-2xl border bg-panel py-2 pr-2 pl-4 transition-colors ${g?"border-ember/60":"border-white/12 focus-within:border-white/30"}`,children:[w.jsx("textarea",{ref:S,rows:1,value:c,disabled:i,onChange:v=>f(v.target.value),onKeyDown:v=>{v.key==="Enter"&&!v.shiftKey&&(v.preventDefault(),M())},placeholder:g?"Listening… tap stop when done":o[h]||"Describe an attack",className:"block min-w-0 flex-1 resize-none self-center bg-transparent py-1.5 text-base leading-6 text-ink outline-none placeholder:text-mute/80 disabled:opacity-60"}),w.jsxs("div",{className:"flex shrink-0 items-center gap-0.5",children:[e&&w.jsx("button",{onClick:x,disabled:i,title:g?"Stop":"Say it",className:`grid size-9 place-items-center rounded-full transition-colors ${g?"bg-ember/15 text-ember":"text-mute hover:bg-white/5 hover:text-ink"}`,children:g?w.jsx(Cy,{size:14,fill:"currentColor"}):w.jsx(Ty,{size:17,strokeWidth:1.6})}),t&&w.jsxs(w.Fragment,{children:[w.jsx("button",{onClick:()=>{var v;return(v=E.current)==null?void 0:v.click()},disabled:i,title:"A photo of a real place",className:"grid size-9 place-items-center rounded-full text-mute transition-colors hover:bg-white/5 hover:text-ink",children:w.jsx(Ey,{size:17,strokeWidth:1.6})}),w.jsx("input",{ref:E,type:"file",accept:"image/*,video/*",hidden:!0,onChange:v=>{var A;const b=(A=v.target.files)==null?void 0:A[0];b&&t(b),v.target.value=""}})]}),w.jsx("button",{onClick:M,disabled:i||c.trim().length<3,className:`ml-1 grid size-9 place-items-center rounded-full transition-all ${c.trim().length>=3&&!i?`${l} text-black`:"bg-white/[.07] text-mute"}`,children:i?w.jsx(xc,{size:17,className:"animate-spin"}):w.jsx(wv,{size:18,strokeWidth:2})})]})]})}const rv={bank:"Building lessons",training:"Retraining",gating:"Checking for regressions",verified:"Live",rejected:"Kept the old robot"};function g0({job:s,onDone:e,onTimelapse:t}){const[i,o]=ie.useState("bank"),[l,d]=ie.useState(0),[c,f]=ie.useState(null),[h,p]=ie.useState(""),[g,y]=ie.useState(null),[S,E]=ie.useState("");ie.useEffect(()=>{let v=!0;return vc(s,b=>{v&&(b.stage==="started"&&y([b.parent,b.version]),b.stage==="timelapse"&&(t==null||t(b.attempts)),b.stage in rv&&o(b.stage),b.stage==="progress"&&(o("training"),d(Math.min(1,b.step/b.total))),b.stage==="trained"&&d(1),(b.stage==="verified"||b.stage==="rejected")&&f(b.gate),b.stage==="failed"&&p(b.error||"failed"),b.stage==="learned"&&E(b.sentence))}).then(b=>v&&(e==null?void 0:e(b))),()=>{v=!1}},[s]);const M=i==="verified"||i==="rejected",x=c&&[["Fixed",c.checks["fixes the attack"],`${Qt(c.suites.attacks.before)} → ${Qt(c.suites.attacks.after)} falls`],["Still walks",c.checks["still walks"],`${c.suites.nominal.progress_after.toFixed(1)} m in 5 s`],["Nothing else broke",c.checks["no regressions"],`${Qt(c.suites.gauntlet.before)} → ${Qt(c.suites.gauntlet.after)} on 52 scenarios`]];return w.jsxs("div",{className:"rise rounded-2xl border border-line bg-panel p-5",children:[w.jsxs("div",{className:"flex items-baseline justify-between gap-4",children:[w.jsxs("p",{className:"text-[15px]",children:[h?w.jsx("span",{className:"text-ember",children:h}):rv[i],!M&&!h&&w.jsx("span",{className:"blink text-ember",children:" ●"})]}),g&&w.jsxs("span",{className:"font-mono text-xs text-faint",children:[g[0]," → ",i==="rejected"?g[0]:g[1]]})]}),w.jsx("div",{className:"mt-4 h-px overflow-hidden bg-line",children:w.jsx("div",{className:"h-full bg-ember transition-[width] duration-700 ease-out-soft",style:{width:`${(M?1:i==="bank"?.04:i==="gating"?1:l)*100}%`}})}),x&&w.jsx("div",{className:"mt-5 grid gap-3 sm:grid-cols-3",children:x.map(([v,b,A])=>w.jsxs("div",{className:"flex gap-2.5",children:[b?w.jsx(ha,{size:16,className:"mt-0.5 shrink-0 text-acid"}):w.jsx(pf,{size:16,className:"mt-0.5 shrink-0 text-ember"}),w.jsxs("div",{children:[w.jsx("p",{className:"text-sm",children:v}),w.jsx("p",{className:"text-xs text-faint",children:A})]})]},v))}),S&&w.jsxs("p",{className:"rise mt-4 text-[14px] leading-relaxed text-mute",children:[w.jsx("span",{className:"text-peri",children:"Muse Spark · "}),S]})]})}function Ob({seeds:s,color:e="bg-ember",size:t="size-3.5"}){return w.jsx("div",{className:"flex gap-1",children:s.map((i,o)=>w.jsx("i",{style:{animationDelay:`${o*70}ms`},className:`rise block ${t} ${i?e:"border border-white/15"}`},o))})}function v0({steps:s,className:e=""}){return s.length?w.jsx("ol",{className:`space-y-1.5 ${e}`,children:s.map((t,i)=>{const o=i===s.length-1;return w.jsxs("li",{className:`rise flex items-center gap-2.5 text-[13px] ${o?"text-ink":"text-mute"}`,children:[o?w.jsx(xc,{size:13,className:"shrink-0 animate-spin text-ember"}):w.jsx(ha,{size:13,className:"shrink-0 text-acid"}),w.jsx("span",{className:"truncate",children:t})]},i)})}):null}const Fb=["A light shove from the right as it turns","Slightly wet tiles and a 3 kg backpack","The back-left knee is a bit weak","20 ms of lag on a gentle downhill"];function kb(){const[s,e]=ie.useState(null),[t,i]=ie.useState(3),[o,l]=ie.useState(!1),[d,c]=ie.useState(null),[f,h]=ie.useState("lobby"),[p,g]=ie.useState(null),[y,S]=ie.useState(null),[E,M]=ie.useState(""),x=()=>zn("/api/duel_tally").then(e).catch(()=>{});ie.useEffect(()=>{x()},[]),ie.useEffect(()=>{if(f!=="turn"||!d)return;g(null);const D=setInterval(async()=>{const I=await zn(`/api/duel/${d.id}/muse`).catch(()=>null);I!=null&&I.locked&&(g(I.commit),S(I.practised??null),clearInterval(D))},1200);return()=>clearInterval(D)},[f,d==null?void 0:d.history.length]);const v=async()=>{M("");try{c(await os("/api/duel",{rounds:t,hard:o})),h("turn"),window.scrollTo({top:0})}catch(D){M(D.message)}},[b,A]=ie.useState([]),P=async D=>{h("running"),M(""),A(["Sending your attack"]);try{c(await Zl(D(),I=>A(ne=>ne.at(-1)===I?ne:[...ne,I]))),h("reveal")}catch(I){M(I.message),h("turn")}};if(f==="lobby"||!d)return w.jsxs("div",{className:"grid items-center gap-12 pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-14 lg:pt-12",children:[w.jsxs("section",{className:"max-w-[460px]",children:[w.jsxs("h1",{className:"font-medium leading-[1] tracking-[-0.04em]",style:{fontSize:"clamp(44px, min(4.6vw, 8.5vh), 76px)"},children:[w.jsx("span",{className:"text-peri",children:"You"})," ",w.jsx("span",{className:"text-faint",children:"vs"})," ",w.jsx("span",{className:"text-ember",children:"Muse"})]}),w.jsx("p",{className:"mt-6 text-base leading-[1.55] text-ink/75",children:"You both write an attack on the same robot, at the same time. The subtlest one that still knocks it over wins. Brute force scores nothing."}),w.jsxs("div",{className:"mt-8 flex flex-wrap items-center gap-2.5",children:[w.jsx(sv,{options:[["3","Best of 3"],["5","Best of 5"]],value:String(t),onChange:D=>i(+D)}),w.jsx(sv,{options:[["0","Normal"],["1","Hard"]],value:o?"1":"0",onChange:D=>l(D==="1")})]}),w.jsxs("button",{onClick:v,className:"mt-5 flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[15px] font-medium text-black transition-opacity hover:opacity-85",children:["Start a duel ",w.jsx(fa,{size:16})]}),E&&w.jsx("p",{className:"mt-3 text-sm text-ember",children:E}),w.jsx(Bb,{tally:s})]}),w.jsx(Hb,{})]});const z=d.history.at(-1);return w.jsxs("div",{className:"pt-8",children:[w.jsx(Vb,{duel:d}),f==="turn"&&w.jsxs("div",{className:"rise mt-10 grid gap-5 lg:grid-cols-[1.4fr_1fr]",children:[w.jsxs("div",{children:[w.jsx(m0,{accent:"bg-peri",examples:Fb,onText:D=>P(()=>os(`/api/duel/${d.id}/round?stream=1`,{text:D})),onVoice:D=>P(()=>Kd(`/api/duel/${d.id}/round_voice?stream=1`,"audio",D,"attack.wav"))}),E&&w.jsx("p",{className:"mt-3 text-sm text-ember",children:E})]}),w.jsxs("div",{className:"flex items-center gap-4 rounded-2xl border border-line px-5 py-4",children:[w.jsx("div",{className:`grid size-10 shrink-0 place-items-center rounded-full ${p?"bg-ember/15 text-ember":"bg-white/5 text-faint"}`,children:w.jsx(wy,{size:16,strokeWidth:1.8})}),w.jsxs("div",{className:"min-w-0",children:[w.jsx("p",{className:"text-[15px]",children:p?y?`Muse practised ${y} attacks and sealed its best`:"Muse has sealed its attack":w.jsxs(w.Fragment,{children:[o?"Muse is writing and practising attacks":"Muse is writing its attack",w.jsx("span",{className:"blink",children:"…"})]})}),w.jsx("p",{className:"truncate font-mono text-xs text-faint",children:p?`sha256 ${p}`:"it never sees yours"})]})]})]}),f==="turn"&&w.jsx(zb,{version:d.version}),f==="running"&&w.jsxs("div",{className:"mx-auto mt-20 w-80",children:[w.jsx(v0,{steps:b}),w.jsx("div",{className:"mt-5 h-px overflow-hidden bg-line",children:w.jsx("div",{className:"sweep h-full w-1/3 bg-ember"})})]}),f==="reveal"&&z&&w.jsx(Gb,{r:z,over:d.over,onNext:()=>d.over?(h("final"),x()):h("turn")}),f==="final"&&w.jsx(Wb,{duel:d,onRematch:v})]})}function zb({version:s}){const[e,t]=ie.useState(null);return ie.useEffect(()=>{zn("/api/preview").then(i=>t(i!=null&&i.trajs?i:null)).catch(()=>{})},[s]),e?w.jsxs("figure",{className:"rise mt-6",children:[w.jsx("div",{className:"relative aspect-[21/8] overflow-hidden rounded-2xl border border-line bg-[#0b0d12]",children:w.jsx(Nr,{trajs:e.trajs,hud:!1,className:"absolute inset-0"})}),w.jsxs("figcaption",{className:"mt-2.5 text-[13px] text-faint",children:[w.jsx("span",{className:"text-mute",children:e.version}),", the robot you're both attacking, walking normally."]})]}):null}function sv({options:s,value:e,onChange:t}){return w.jsx("div",{className:"inline-flex rounded-full border border-line p-1",children:s.map(([i,o])=>w.jsx("button",{onClick:()=>t(i),className:`rounded-full px-4 py-1.5 text-sm transition-colors ${e===i?"bg-white/10 text-ink":"text-faint hover:text-mute"}`,children:o},i))})}function Bb({tally:s}){var t;const e=((t=s==null?void 0:s.log)==null?void 0:t.slice(-24))||[];return s?w.jsxs("div",{className:"mt-10 flex items-center gap-4",children:[w.jsxs("div",{className:"flex gap-1",children:[e.map((i,o)=>w.jsx("i",{className:`block size-2.5 ${i==="you"?"bg-peri":i==="muse"?"bg-ember":"bg-white/30"}`},o)),Array.from({length:Math.max(0,12-e.length)},(i,o)=>w.jsx("i",{className:"block size-2.5 border border-white/10"},`e${o}`))]}),w.jsxs("p",{className:"text-sm text-mute",children:["Humans ",w.jsx("span",{className:"text-peri",children:s.you}),w.jsx("span",{className:"mx-2 text-faint",children:"·"}),"Muse ",w.jsx("span",{className:"text-ember",children:s.muse})]})]}):null}function Hb(){const[s,e]=ie.useState(null);if(ie.useEffect(()=>{zn("/api/duels/recent").then(i=>e(i!=null&&i.you?i:null)).catch(()=>{})},[]),!s)return w.jsx("div",{className:"relative aspect-[16/11] w-full overflow-hidden rounded-2xl border border-line bg-[#0b0d12]",children:w.jsx(Nr,{trajs:[{url:"/assets/sample_traj.json",label:""}],hud:!1,className:"absolute inset-0"})});const t=i=>{const o=s[i],l=i==="you"?"text-peri":"text-ember",d=o.score>s[i==="you"?"muse":"you"].score;return w.jsxs("div",{className:"flex min-w-0 flex-col",children:[w.jsx("div",{className:"relative aspect-[4/5] overflow-hidden bg-[#0b0d12]",children:w.jsx(Nr,{trajs:[{...o.traj,label:i==="you"?"YOU":"MUSE"}],hud:!1,className:"absolute inset-0"})}),w.jsxs("div",{className:"flex items-start justify-between gap-3 px-4 py-3.5",children:[w.jsx("p",{className:"min-w-0 text-[14px] leading-snug text-ink/80",children:o.text}),w.jsx("span",{className:`font-mono text-lg ${d?l:"text-faint"}`,children:o.score})]})]})};return w.jsxs("figure",{className:"w-full",children:[w.jsxs("div",{className:"grid grid-cols-2 divide-x divide-line overflow-hidden rounded-2xl border border-line bg-panel",children:[t("you"),t("muse")]}),s.comment&&w.jsx("figcaption",{className:"mt-3 text-center text-[14px] text-mute",children:s.comment})]})}function Vb({duel:s}){const e=Math.min(s.history.length+1,s.rounds);return w.jsxs("div",{className:"flex items-center justify-between border-b border-line pb-6",children:[w.jsxs("div",{children:[w.jsx("p",{className:"text-sm text-mute",children:"You"}),w.jsx("p",{className:"text-5xl font-medium tracking-tight text-peri tabular-nums",children:s.score.you})]}),w.jsxs("div",{className:"flex flex-col items-center gap-3",children:[w.jsx("div",{className:"flex gap-1.5",children:Array.from({length:s.rounds},(t,i)=>{const o=s.history[i],l=o?o.you.score>o.muse.score?"bg-peri":o.muse.score>o.you.score?"bg-ember":"bg-white/40":i===s.history.length?"bg-white/40":"bg-white/10";return w.jsx("i",{className:`block h-1 w-7 ${l}`},i)})}),w.jsx("p",{className:"font-mono text-xs text-faint",children:s.over?"final":`round ${e} of ${s.rounds}`})]}),w.jsxs("div",{className:"text-right",children:[w.jsx("p",{className:"text-sm text-mute",children:"Muse"}),w.jsx("p",{className:"text-5xl font-medium tracking-tight text-ember tabular-nums",children:s.score.muse})]})]})}function Gb({r:s,over:e,onNext:t}){const[i,o]=ie.useState(null),[l,d]=ie.useState("");return ie.useEffect(()=>{var h;(h=crypto.subtle)==null||h.digest("SHA-256",new TextEncoder().encode(s.sealed)).then(p=>o([...new Uint8Array(p)].map(g=>g.toString(16).padStart(2,"0")).join("")===s.commit));let c=0;const f=setInterval(()=>{c+=2,d(s.comment.slice(0,c)),c>=s.comment.length&&clearInterval(f)},18);return()=>clearInterval(f)},[s.round]),w.jsxs("div",{className:"rise mt-10",children:[w.jsxs("div",{className:"grid gap-5 md:grid-cols-2",children:[w.jsx(ov,{who:"You",s:s.you,other:s.muse,color:"bg-peri",text:"text-peri"}),w.jsx(ov,{who:"Muse",s:s.muse,other:s.you,color:"bg-ember",text:"text-ember"})]}),s.comment&&w.jsx("p",{className:"mx-auto mt-10 max-w-2xl text-center text-[17px] leading-relaxed text-mute",children:l}),w.jsxs("div",{className:"mt-10 flex flex-wrap items-center justify-between gap-4",children:[w.jsx("p",{className:"flex items-center gap-2 font-mono text-xs text-faint",children:i&&w.jsxs(w.Fragment,{children:[w.jsx(ha,{size:13,className:"text-acid"})," Muse's attack matches the hash it sealed before you wrote yours"]})}),w.jsxs("button",{onClick:t,className:"flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-black hover:opacity-85",children:[e?"Result":"Next round"," ",w.jsx(fa,{size:15})]})]})]})}function ov({who:s,s:e,other:t,color:i,text:o}){const l=e.score>t.score,d=e.seeds.filter(Boolean).length;return w.jsxs("div",{children:[w.jsx("div",{className:"relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-[#0b0d12]",children:w.jsx(Nr,{trajs:[{...e.traj,label:s.toUpperCase()}],className:"absolute inset-0"})}),w.jsxs("div",{className:"mt-5 flex items-start justify-between gap-6",children:[w.jsxs("div",{className:"min-w-0",children:[w.jsx("p",{className:"text-sm text-faint",children:s}),w.jsx("p",{className:"mt-1 text-[17px] leading-snug",children:e.text})]}),w.jsx("p",{className:`text-4xl font-medium tabular-nums tracking-tight ${l?o:"text-faint"}`,children:e.score})]}),w.jsxs("div",{className:"mt-4 flex items-center gap-4",children:[w.jsx(Ob,{seeds:e.seeds,color:i}),w.jsx("p",{className:"text-xs text-faint",children:e.cheap?w.jsx("span",{className:"text-ember",children:"brute force, scores 0"}):`${d}/8 falls · ${Math.round(e.subtlety*100)}% subtle`})]})]})}function Wb({duel:s,onRematch:e}){const[t,i]=ie.useState(null),[o,l]=ie.useState(""),d=s.winner,c=s.history.some(p=>["you","muse"].some(g=>p[g].seeds.filter(Boolean).length>=4&&!p[g].cheap)),f=()=>{const{you:p,muse:g}=s.score,y=d==="you"?`I beat Meta's Muse ${p}–${g} at breaking a robot.`:d==="muse"?`Meta's Muse beat me ${g}–${p} at breaking a robot.`:"I drew with Meta's Muse at breaking a robot.";window.open(`https://x.com/intent/post?text=${encodeURIComponent(y+" Subtle beats brutal.")}&url=${encodeURIComponent(location.origin+"/arena")}`,"_blank")},h=ie.useRef(null);return ie.useEffect(()=>{var p;return(p=h.current)==null?void 0:p.scrollIntoView({behavior:"smooth"})},[]),w.jsxs("div",{ref:h,className:"rise mt-14",children:[w.jsx("h2",{className:`text-[64px] font-medium leading-none tracking-[-0.045em] sm:text-[120px] ${d==="you"?"text-peri":d==="muse"?"text-ember":""}`,children:d==="you"?"You win.":d==="muse"?"Muse wins.":"Draw."}),w.jsx("div",{className:"mt-12 divide-y divide-line border-y border-line",children:s.history.map(p=>w.jsx("div",{className:"grid gap-x-8 gap-y-2 py-4 text-[15px] sm:grid-cols-2",children:["you","muse"].map(g=>w.jsxs("div",{className:"flex items-baseline justify-between gap-4",children:[w.jsxs("p",{className:"text-mute",children:[w.jsx("span",{className:"mr-3 font-mono text-xs text-faint",children:g==="you"?"you":"muse"}),p[g].text]}),w.jsx("span",{className:`font-mono text-sm ${p[g].score>p[g==="you"?"muse":"you"].score?g==="you"?"text-peri":"text-ember":"text-faint"}`,children:p[g].score})]},g))},p.round))}),w.jsxs("div",{className:"mt-10 flex flex-wrap gap-3",children:[c&&!t&&w.jsxs("button",{onClick:async()=>{try{i((await os(`/api/duel/${s.id}/patch`)).job)}catch(p){l(p.message)}},className:"flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-black hover:opacity-85",children:["Teach the robot what broke it ",w.jsx(fa,{size:15})]}),w.jsxs("button",{onClick:f,className:"flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm hover:border-white/25",children:[w.jsx(Ay,{size:14})," Share"]}),w.jsxs("button",{onClick:e,className:"flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm hover:border-white/25",children:[w.jsx(by,{size:14})," Rematch"]})]}),o&&w.jsx("p",{className:"mt-3 text-sm text-ember",children:o}),t&&w.jsx("div",{className:"mt-6",children:w.jsx(g0,{job:t})})]})}const jb={foot_friction:"friction",ice_mu:"ice friction",push1_force:"shove (N)",push2_force:"second shove (N)",payload_mass:"load (kg)",motor_strength:"motor strength",latency:"lag (steps)",obs_noise:"sensor noise",slope:"slope (rad)",joint_friction:"joint friction",stairs_height:"step height (m)"},av=s=>jb[s]||s.replace(/_/g," ");function Xb({attackId:s,versions:e}){const[t,i]=ie.useState(null),[o,l]=ie.useState("");if(ie.useEffect(()=>{i(null),l(""),zn(`/api/envelope?attack_id=${s}&versions=${e.join(",")}`).then(i).catch(f=>l(f.message))},[s,e.join(",")]),o)return null;if(!t)return w.jsxs("p",{className:"mt-4 text-[13px] text-faint",children:[w.jsx("span",{className:"blink text-ember",children:"●"})," Mapping the safety envelope…"]});const d=Object.keys(t.grids),c=f=>f.flat().filter(h=>h<.5).length/f.flat().length;return w.jsxs("div",{className:"rise mt-5",children:[w.jsxs("p",{className:"text-[14px] text-mute",children:["Safe region, from normal to this attack:"," ",d.map((f,h)=>w.jsxs("span",{children:[h>0&&" → ",w.jsxs("span",{className:h===d.length-1?"text-acid":"text-ink",children:[Math.round(c(t.grids[f])*100),"%"]})," ",w.jsx("span",{className:"text-faint",children:f})]},f))]}),w.jsx("div",{className:"mt-3 grid grid-cols-2 gap-4",children:d.map(f=>w.jsx($b,{label:f,grid:t.grids[f],x:t.x,y:t.y},f))})]})}function $b({label:s,grid:e,x:t,y:i}){const o=e.length,l=100/o;return w.jsxs("figure",{children:[w.jsx("svg",{viewBox:"0 0 100 100",className:"aspect-square w-full overflow-visible rounded-md",children:e.map((d,c)=>d.map((f,h)=>w.jsx("rect",{x:c*l,y:100-(h+1)*l,width:l+.05,height:l+.05,fill:f>=.5?`rgba(255,91,53,${.35+.65*f})`:`rgba(215,242,93,${.06+.14*(1-f)})`},`${c}-${h}`)))}),w.jsxs("figcaption",{className:"mt-1.5 flex justify-between font-mono text-[11px] text-faint",children:[w.jsx("span",{children:s}),w.jsxs("span",{children:[av(t.condition)," → · ",av(i.condition)," ↑"]})]})]})}const Yb=[["Icy shove","Make the floor icy and shove it from the left"],["Wet tiles + load","Wet tiles and a 3 kg backpack"],["Weak knee","The back-left knee is weak, on a gentle downhill"]];function qb(){var O;const[s,e]=ie.useState(0),t=Mv(s),[i,o]=ie.useState(""),[l,d]=ie.useState(""),[c,f]=ie.useState(null),[h,p]=ie.useState(null),[g,y]=ie.useState(null),[S,E]=ie.useState([]),[M,x]=ie.useState([]),[v,b]=ie.useState({text:"",n:0}),[A,P]=ie.useState(null),[z,D]=ie.useState("go1"),[I,ne]=ie.useState(null),[R,U]=ie.useState([]),[se,le]=ie.useState(0),[ge,V]=ie.useState(!1);ie.useEffect(()=>{if(!ge||!R.length)return;if(se>=R.length-1){V(!1);return}const F=setTimeout(()=>le(j=>j+1),R[se].fell?3200:4200);return()=>clearTimeout(F)},[ge,se,R]),ie.useEffect(()=>{zn("/api/hall_of_fame?limit=9").then(E).catch(()=>{}),zn("/api/leaderboard?limit=5").then(x).catch(()=>{}),zn("/api/showcase").then(F=>P(F!=null&&F.trajs?F:null)).catch(()=>{})},[s]);const[J,te]=ie.useState([]),q=async(F,j)=>{o(F),te([F]),d(""),p(null),y(null),U([]),ne(null);const ce=me=>ye=>te(Se=>Se.at(-1)===me+ye?Se:[...Se,me+ye]);try{if(z==="both"){const me=await Zl(j("go1"),ce("Quadruped · ")),ye=await Zl(j("g1"),ce("Humanoid · "));f(null),ne([me,ye])}else f(await Zl(j(z),ce("")));e(me=>me+1)}catch(me){d(me.message)}o(""),te([])},X=R.length?R[se]:null,K=X?[X]:(g==null?void 0:g.trajs)||(c==null?void 0:c.trajs)||(A==null?void 0:A.trajs),Y=X?[`attempt · ${X.label}`]:g?[`${g.parent}`,`${g.version}`]:c?["original",c.version]:A?["original",`trained · ${A.version}`]:null;return w.jsxs("div",{children:[w.jsxs("div",{className:"grid items-center gap-10 pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-14 lg:pt-12",children:[w.jsxs("section",{className:"w-full max-w-[440px]",children:[w.jsxs("h1",{className:"font-medium leading-[1.02] tracking-[-0.04em]",style:{fontSize:"clamp(40px, min(3.7vw, 7vh), 56px)"},children:[w.jsx("span",{className:"block lg:whitespace-nowrap",children:"Break the robot."}),w.jsx("span",{className:"block text-mute lg:whitespace-nowrap",children:"Watch it learn."})]}),w.jsx("p",{className:"mt-5 text-base leading-[1.55] text-ink/75",children:"Describe an attack in plain English, say it out loud, or show a photo of a real place. Muse turns it into physics. If the robot falls, retrain it until it doesn't."}),w.jsx("div",{className:"mt-6 flex flex-wrap gap-2",children:Yb.map(([F,j])=>w.jsx("button",{onClick:()=>b(ce=>({text:j,n:ce.n+1})),disabled:!!i,className:"cursor-pointer rounded-full border border-white/12 bg-white/[.04] px-3 py-1.5 text-[13px] leading-none text-ink/85 transition-colors hover:border-white/30 hover:bg-white/[.09] hover:text-ink active:scale-[.98] disabled:opacity-40",children:F},F))}),w.jsx("div",{className:"mt-8 flex items-center gap-1 text-[13px]",children:[["go1","Quadruped"],["g1","Humanoid"],["both","Both"]].map(([F,j])=>w.jsx("button",{onClick:()=>D(F),disabled:!!i,className:`rounded-full px-3 py-1 transition-colors ${z===F?"bg-white/10 text-ink":"text-mute hover:text-ink"}`,children:j},F))}),w.jsx("div",{className:"mt-2.5",children:w.jsx(m0,{busy:!!i,examples:["Describe an attack…"],prefill:v,onText:F=>q("Sending your attack",j=>os("/api/attack?stream=1",{text:F,robot:j})),onVoice:F=>q("Uploading your voice",j=>Kd(`/api/attack_voice?stream=1&robot=${j}`,"audio",F,"attack.wav")),onFile:F=>q("Uploading your photo",j=>Kd(`/api/world?stream=1&robot=${j}`,"media",F,F.name))})}),l&&w.jsx("p",{className:"mt-3 text-sm text-ember",children:l}),I&&!i&&w.jsx("div",{className:"rise mt-6 space-y-1.5 text-[15px] text-mute",children:I.map((F,j)=>w.jsxs("p",{children:[j===0?"Quadruped":"Humanoid"," ",F.version," ",w.jsx("span",{className:F.fall_rate_trained>=.5?"text-ember":"text-acid",children:F.fall_rate_trained>=.5?"fell":"held"}),w.jsxs("span",{className:"text-faint",children:[" · ",Qt(F.fall_rate_trained)]})]},j))}),c&&!i&&w.jsx(Kb,{r:c,after:g,onPatch:async()=>{try{p((await os("/api/patch",{attack_id:c.id})).job)}catch(F){d(F.message)}},patching:!!h}),h&&w.jsxs("div",{className:"mt-4",children:[w.jsx(g0,{job:h,onTimelapse:F=>{U(F),le(0),V(!0)},onDone:F=>{F.accepted&&y(F),e(j=>j+1)}}),R.length>0&&w.jsxs("div",{className:"mt-3 flex flex-wrap items-center gap-1.5",children:[w.jsx("span",{className:"mr-1 text-[13px] text-mute",children:"Watch it learn"}),R.map((F,j)=>w.jsxs("button",{onClick:()=>{V(!1),le(j)},className:`flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-xs transition-colors ${j===se?"border-white/30 bg-white/10 text-ink":"border-white/10 text-mute hover:text-ink"}`,children:[w.jsx("i",{className:`block size-1.5 rounded-full ${F.fell?"bg-ember":"bg-acid"}`})," ",F.label]},j)),g&&w.jsx("button",{onClick:()=>U([]),className:"ml-1 text-xs text-faint hover:text-mute",children:"final comparison"})]}),g&&c&&w.jsx(Xb,{attackId:c.id,versions:[((O=t==null?void 0:t.versions[0])==null?void 0:O.name)||"v1",g.version]})]})]}),w.jsxs("section",{className:"relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-line bg-[#0b0d12] lg:aspect-[16/11] lg:max-h-[calc(100dvh-11rem)]",children:[I&&!X?w.jsx("div",{className:"absolute inset-0 grid grid-cols-2 divide-x divide-line",children:I.map((F,j)=>w.jsx("div",{className:"relative",children:w.jsx(Nr,{robot:j===0?"go1":"g1",trajs:[{url:F.trajs[1].url,label:`${j===0?"quadruped":"humanoid"} · ${F.version}`}],className:"absolute inset-0"})},j))}):K?w.jsx(Nr,{robot:(c==null?void 0:c.robot)||"go1",trajs:K.map((F,j)=>({url:F.url,label:(Y==null?void 0:Y[j])||F.label})),className:"absolute inset-0"},JSON.stringify(K)):w.jsx(Nr,{trajs:[{url:"/assets/sample_traj_held.json",label:""}],hud:!1,className:"absolute inset-0"}),i&&w.jsx("div",{className:"absolute inset-0 grid place-items-center bg-black/60 backdrop-blur-[2px]",children:w.jsxs("div",{className:"w-72",children:[w.jsx(v0,{steps:J}),w.jsx("div",{className:"mt-4 h-px overflow-hidden bg-line",children:w.jsx("div",{className:"sweep h-full w-1/3 bg-ember"})})]})})]})]}),S.length>0&&w.jsxs("section",{className:"mt-28",children:[w.jsxs("div",{className:"flex items-end justify-between",children:[w.jsx("h2",{className:"text-2xl font-medium tracking-tight",children:"Recent breaks"}),t&&w.jsxs(Sv,{to:"/readiness",className:"flex items-center gap-1.5 text-sm text-mute hover:text-ink",children:["Readiness report ",w.jsx(fa,{size:14})]})]}),w.jsx("div",{className:"mt-6 grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3",children:S.map(F=>w.jsx(Jb,{r:F},F.id))})]}),w.jsxs("section",{className:"mt-28 grid gap-16 lg:grid-cols-2",children:[M.length>0&&w.jsxs("div",{children:[w.jsx("h2",{className:"text-2xl font-medium tracking-tight",children:"Subtlest attacks"}),w.jsx("p",{className:"mt-2 text-sm text-faint",children:"Points for breaking it with as little as possible."}),w.jsx("ol",{className:"mt-6 divide-y divide-line border-y border-line",children:M.map((F,j)=>w.jsxs("li",{className:"flex items-baseline gap-4 py-3.5",children:[w.jsx("span",{className:"w-4 font-mono text-xs text-faint",children:j+1}),w.jsxs("div",{className:"min-w-0 flex-1",children:[w.jsx("p",{className:"truncate text-[15px]",children:F.text}),w.jsx("p",{className:"text-xs text-faint",children:F.who})]}),w.jsx("span",{className:"font-mono text-sm text-ember",children:F.score})]},F.who))})]}),t&&t.versions.length>1&&w.jsxs("div",{children:[w.jsx("h2",{className:"text-2xl font-medium tracking-tight",children:"Lineage"}),w.jsx("p",{className:"mt-2 text-sm text-faint",children:"Every version passed the regression gate before going live."}),w.jsx("ol",{className:"mt-6 border-l border-line",children:[...t.versions].reverse().map(F=>w.jsxs("li",{className:"relative py-2.5 pl-6",children:[w.jsx("i",{className:`absolute top-[17px] -left-[4px] block size-[7px] rounded-full ${F.name===t.live?"bg-acid":"bg-line"}`}),w.jsx("span",{className:"font-mono text-sm",children:F.name}),w.jsx("span",{className:"ml-3 text-sm text-faint",children:F.parent?`learned ${F.attacks.length} situation${F.attacks.length===1?"":"s"}`:"original policy"}),F.changelog&&w.jsxs("p",{className:"mt-1 line-clamp-3 max-w-md text-[13px] leading-relaxed text-mute",children:[F.changelog.learned," ",w.jsx("span",{className:"text-faint",children:F.changelog.still_cant})]})]},F.name))})]})]})]})}function Kb({r:s,after:e,onPatch:t,patching:i}){const o=s.fall_rate_trained>=.5,l=s.fall_rate_trained>=.5&&s.survivable!==!1&&!e&&(s.robot||"go1")==="go1";return w.jsxs("div",{className:"rise mt-6",children:[s.reading&&w.jsxs("div",{className:"mb-5 flex gap-4",children:[w.jsx("img",{src:s.media,alt:"",className:"size-20 shrink-0 rounded-lg object-cover"}),w.jsxs("p",{className:"text-sm leading-relaxed text-mute",children:[w.jsxs("span",{className:"text-ink",children:[s.reading.place,"."]})," ",s.reading.surface,", friction ≈ ",(+s.reading.friction).toFixed(2),Math.abs(s.reading.slope_deg)>=1?`, ${(+s.reading.slope_deg).toFixed(0)}° slope`:"","."]})]}),w.jsxs("div",{className:"flex flex-col items-start gap-4",children:[w.jsxs("p",{className:"text-[15px] text-mute",children:["Original robot ",w.jsx("span",{className:s.broke_baseline?"text-ember":"text-acid",children:s.broke_baseline?"fell":"held"}),w.jsxs("span",{className:"text-faint",children:[" · ",Qt(s.fall_rate_baseline)]}),w.jsx("span",{className:"mx-3 text-line",children:"/"}),s.version," ",w.jsx("span",{className:o?"text-ember":"text-acid",children:o?"fell":"held"}),w.jsxs("span",{className:"text-faint",children:[" · ",Qt(s.fall_rate_trained)]}),s.score>0&&w.jsxs("span",{className:"ml-3 font-mono text-sm text-ember",children:["+",s.score]})]}),l&&w.jsxs("button",{onClick:t,disabled:i,className:"flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-medium text-black transition-opacity hover:opacity-85 disabled:opacity-40",children:["Train it to survive this ",w.jsx(fa,{size:15})]})]}),s.survivable===!1&&s.fall_rate_trained>0&&w.jsxs("p",{className:"mt-3 text-sm text-faint",children:["Physics wins: even our toughest robot falls ",Qt(s.reference_fall_rate)," of the time here. Try something subtler."]}),e&&w.jsxs("p",{className:"mt-3 text-sm text-mute",children:["Replaying it on ",w.jsx("span",{className:"text-acid",children:e.version}),", now live."]})]})}function Jb({r:s}){const e=Object.entries(s.status||{}).sort((t,i)=>+t[0].slice(1)-+i[0].slice(1));return w.jsxs("article",{className:"group",children:[w.jsx("div",{className:"overflow-hidden rounded-xl border border-line bg-[#0b0d12]",children:w.jsx("video",{src:`${s.clip}#t=1.2`,preload:"metadata",muted:!0,loop:!0,playsInline:!0,onMouseEnter:t=>t.currentTarget.play(),onMouseLeave:t=>t.currentTarget.pause(),className:"aspect-[2/1] w-full object-cover opacity-90 transition-opacity group-hover:opacity-100"})}),w.jsx("p",{className:"mt-3 line-clamp-2 text-[15px] leading-snug",children:s.text}),w.jsx("div",{className:"mt-2 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs",children:e.map(([t,i])=>w.jsxs("span",{className:i>=.5?"text-ember":"text-acid",children:[t," ",i>=.5?"fell":"held"]},t))})]})}const uf=s=>{if(s==null)return"never";if(Array.isArray(s)){if(s.every(t=>t===s[0]))return uf(s[0]);const e=s.filter(t=>Math.abs(t)>1e-6);return e.length===1?uf(e[0]):`[${s.map(t=>+(+t).toFixed(2)).join(", ")}]`}return String(typeof s=="number"?+s.toFixed(2):s)};function Zb(){var E;const{version:s}=k_(),[e,t]=ie.useState(s||""),[i,o]=ie.useState(null),[l,d]=ie.useState(!1),[c,f]=ie.useState(""),[h,p]=ie.useState("");ie.useEffect(()=>{let M=!0;return(async()=>{for(let x=0;x<5&&M;x++)try{const v=s||(await zn("/api/versions")).live;if(!M)return;t(v),p("");try{o(await zn(`/api/report/${v}`))}catch{d(!0)}return}catch(v){p(v.message||"can't reach the server"),await new Promise(b=>setTimeout(b,1500*(x+1)))}})(),()=>{M=!1}},[s]);const g=async()=>{f("Starting…");try{const{job:M}=await os("/api/report",{version:e});await vc(M,x=>x.message&&f(x.message)),o(await zn(`/api/report/${e}`)),d(!1)}catch(M){f(M.message)}};if(!i)return w.jsxs("div",{className:"mx-auto max-w-3xl pt-16",children:[w.jsxs("h1",{className:"text-[40px] font-medium tracking-[-0.03em] sm:text-[56px]",children:["Readiness report ",w.jsx("span",{className:"text-faint",children:e})]}),!l&&(h?w.jsxs("p",{className:"mt-8 text-mute",children:["Can't reach the robot right now. ",w.jsx("span",{className:"text-faint",children:h})]}):w.jsxs("p",{className:"mt-8 text-sm text-faint",children:[w.jsx("span",{className:"blink text-ember",children:"●"})," Loading…"]})),l&&w.jsxs("div",{className:"mt-8",children:[w.jsxs("p",{className:"text-mute",children:["Re-tests every attack and the 52-scenario gauntlet against ",e,", measures safety margins, and has Muse Wonder write it up."]}),w.jsx("button",{onClick:g,disabled:!!c,className:"mt-6 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-black disabled:opacity-40",children:"Generate"}),c&&w.jsxs("p",{className:"mt-4 text-sm text-mute",children:[w.jsx("span",{className:"blink text-ember",children:"●"})," ",c]})]})]});const y=i.summary||{},S=i.totals;return w.jsxs("article",{className:"mx-auto max-w-4xl pt-14",children:[w.jsxs("p",{className:"font-mono text-xs text-faint",children:["Unitree Go1 · ",i.version," · ",new Date(i.created*1e3).toLocaleDateString()]}),w.jsx("h1",{className:"mt-4 text-[32px] font-medium leading-[1.12] tracking-[-0.025em] sm:text-[44px]",children:y.headline}),w.jsx("p",{className:"mt-6 text-[17px] leading-relaxed text-mute",children:y.summary}),w.jsx("div",{className:"mt-12 grid grid-cols-2 border-y border-line sm:grid-cols-4",children:[[S.attacks,"attacks tested"],[S.break_v1,"broke the original"],[S.break_now,`still break ${i.version}`],[`${Qt(i.gauntlet.v1)} → ${Qt(i.gauntlet[i.version])}`,"gauntlet falls"]].map(([M,x],v)=>w.jsxs("div",{className:`py-5 ${v?"sm:border-l sm:border-line sm:pl-5":""}`,children:[w.jsx("p",{className:"text-2xl font-medium tracking-tight",children:M}),w.jsx("p",{className:"mt-1 text-sm text-faint",children:x})]},v))}),((E=y.recommendations)==null?void 0:E.length)>0&&w.jsxs("section",{className:"mt-16",children:[w.jsx("h2",{className:"text-xl font-medium",children:"Recommendations"}),w.jsx("ol",{className:"mt-5 space-y-3",children:y.recommendations.map((M,x)=>w.jsxs("li",{className:"flex gap-4 text-[15px] leading-relaxed text-mute",children:[w.jsx("span",{className:"font-mono text-xs text-faint pt-1",children:x+1}),M]},x))})]}),w.jsxs("section",{className:"mt-16",children:[w.jsx("h2",{className:"text-xl font-medium",children:"Findings"}),w.jsx("div",{className:"mt-6 space-y-12",children:i.findings.map(M=>w.jsxs("div",{className:"grid gap-6 md:grid-cols-[1fr_1.1fr]",children:[w.jsx("video",{src:M.clip,muted:!0,loop:!0,playsInline:!0,controls:!0,preload:"metadata",className:"w-full rounded-xl border border-line"}),w.jsxs("div",{children:[w.jsxs("p",{className:`font-mono text-xs ${M.fall_now>=.5?"text-ember":"text-acid"}`,children:[M.fall_now>=.5?"open":"fixed"," · ",M.family]}),w.jsx("p",{className:"mt-2 text-[17px] leading-snug",children:M.text}),w.jsxs("p",{className:"mt-3 text-sm text-faint",children:[Object.entries(M.status||{}).map(([x,v])=>`${x} ${Qt(v)}`).join(" · ")," · now ",Qt(M.fall_now)]}),M.diagnosis&&w.jsxs("p",{className:"mt-4 border-l-2 border-peri/60 pl-4 text-sm leading-relaxed text-mute",children:[w.jsxs("span",{className:"text-ink",children:[M.diagnosis.mode,"."]})," ",M.diagnosis.what_happened]}),M.margin&&w.jsxs("div",{className:"mt-5",children:[w.jsxs("p",{className:"text-sm text-mute",children:["Falls begin at ",w.jsx("span",{className:"font-mono text-ink",children:uf(M.margin.starts_falling_at)})," ",w.jsx("span",{className:"text-faint",children:M.margin.condition})]}),w.jsx("div",{className:"mt-2 flex h-8 max-w-xs items-end gap-1",children:M.margin.curve.map((x,v)=>w.jsx("i",{style:{height:`${Math.max(6,x*100)}%`},className:`block flex-1 ${x>=.5?"bg-ember":"bg-white/15"}`},v))})]})]})]},M.id))})]})]})}l_.createRoot(document.getElementById("root")).render(w.jsx(ie.StrictMode,{children:w.jsx(uy,{children:w.jsx(ny,{children:w.jsxs(Sr,{element:w.jsx(_y,{}),children:[w.jsx(Sr,{index:!0,element:w.jsx(qb,{})}),w.jsx(Sr,{path:"arena",element:w.jsx(kb,{})}),w.jsx(Sr,{path:"autopilot",element:w.jsx(Db,{})}),w.jsx(Sr,{path:"readiness/:version?",element:w.jsx(Zb,{})}),w.jsx(Sr,{path:"agent",element:w.jsx(pm,{to:"/autopilot",replace:!0})}),w.jsx(Sr,{path:"report/:version?",element:w.jsx(pm,{to:"/readiness",replace:!0})})]})})})}));
