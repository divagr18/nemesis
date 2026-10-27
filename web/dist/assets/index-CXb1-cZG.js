function Xx(s,e){for(var t=0;t<e.length;t++){const r=e[t];if(typeof r!="string"&&!Array.isArray(r)){for(const o in r)if(o!=="default"&&!(o in s)){const l=Object.getOwnPropertyDescriptor(r,o);l&&Object.defineProperty(s,o,l.get?l:{enumerable:!0,get:()=>r[o]})}}}return Object.freeze(Object.defineProperty(s,Symbol.toStringTag,{value:"Module"}))}(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const l of o)if(l.type==="childList")for(const d of l.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&r(d)}).observe(document,{childList:!0,subtree:!0});function t(o){const l={};return o.integrity&&(l.integrity=o.integrity),o.referrerPolicy&&(l.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?l.credentials="include":o.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function r(o){if(o.ep)return;o.ep=!0;const l=t(o);fetch(o.href,l)}})();function $x(s){return s&&s.__esModule&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s}var ed={exports:{}},Yo={},td={exports:{}},St={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var qp;function Yx(){if(qp)return St;qp=1;var s=Symbol.for("react.element"),e=Symbol.for("react.portal"),t=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),l=Symbol.for("react.provider"),d=Symbol.for("react.context"),c=Symbol.for("react.forward_ref"),f=Symbol.for("react.suspense"),h=Symbol.for("react.memo"),p=Symbol.for("react.lazy"),g=Symbol.iterator;function y(O){return O===null||typeof O!="object"?null:(O=g&&O[g]||O["@@iterator"],typeof O=="function"?O:null)}var x={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},M=Object.assign,E={};function S(O,W,q){this.props=O,this.context=W,this.refs=E,this.updater=q||x}S.prototype.isReactComponent={},S.prototype.setState=function(O,W){if(typeof O!="object"&&typeof O!="function"&&O!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,O,W,"setState")},S.prototype.forceUpdate=function(O){this.updater.enqueueForceUpdate(this,O,"forceUpdate")};function v(){}v.prototype=S.prototype;function w(O,W,q){this.props=O,this.context=W,this.refs=E,this.updater=q||x}var A=w.prototype=new v;A.constructor=w,M(A,S.prototype),A.isPureReactComponent=!0;var P=Array.isArray,B=Object.prototype.hasOwnProperty,U={current:null},I={key:!0,ref:!0,__self:!0,__source:!0};function ne(O,W,q){var fe,ve={},Te=null,Ae=null;if(W!=null)for(fe in W.ref!==void 0&&(Ae=W.ref),W.key!==void 0&&(Te=""+W.key),W)B.call(W,fe)&&!I.hasOwnProperty(fe)&&(ve[fe]=W[fe]);var Fe=arguments.length-2;if(Fe===1)ve.children=q;else if(1<Fe){for(var ge=Array(Fe),be=0;be<Fe;be++)ge[be]=arguments[be+2];ve.children=ge}if(O&&O.defaultProps)for(fe in Fe=O.defaultProps,Fe)ve[fe]===void 0&&(ve[fe]=Fe[fe]);return{$$typeof:s,type:O,key:Te,ref:Ae,props:ve,_owner:U.current}}function R(O,W){return{$$typeof:s,type:O.type,key:W,ref:O.ref,props:O.props,_owner:O._owner}}function D(O){return typeof O=="object"&&O!==null&&O.$$typeof===s}function re(O){var W={"=":"=0",":":"=2"};return"$"+O.replace(/[=:]/g,function(q){return W[q]})}var ae=/\/+/g;function me(O,W){return typeof O=="object"&&O!==null&&O.key!=null?re(""+O.key):W.toString(36)}function F(O,W,q,fe,ve){var Te=typeof O;(Te==="undefined"||Te==="boolean")&&(O=null);var Ae=!1;if(O===null)Ae=!0;else switch(Te){case"string":case"number":Ae=!0;break;case"object":switch(O.$$typeof){case s:case e:Ae=!0}}if(Ae)return Ae=O,ve=ve(Ae),O=fe===""?"."+me(Ae,0):fe,P(ve)?(q="",O!=null&&(q=O.replace(ae,"$&/")+"/"),F(ve,W,q,"",function(be){return be})):ve!=null&&(D(ve)&&(ve=R(ve,q+(!ve.key||Ae&&Ae.key===ve.key?"":(""+ve.key).replace(ae,"$&/")+"/")+O)),W.push(ve)),1;if(Ae=0,fe=fe===""?".":fe+":",P(O))for(var Fe=0;Fe<O.length;Fe++){Te=O[Fe];var ge=fe+me(Te,Fe);Ae+=F(Te,W,q,ge,ve)}else if(ge=y(O),typeof ge=="function")for(O=ge.call(O),Fe=0;!(Te=O.next()).done;)Te=Te.value,ge=fe+me(Te,Fe++),Ae+=F(Te,W,q,ge,ve);else if(Te==="object")throw W=String(O),Error("Objects are not valid as a React child (found: "+(W==="[object Object]"?"object with keys {"+Object.keys(O).join(", ")+"}":W)+"). If you meant to render a collection of children, use an array instead.");return Ae}function $(O,W,q){if(O==null)return O;var fe=[],ve=0;return F(O,fe,"","",function(Te){return W.call(q,Te,ve++)}),fe}function J(O){if(O._status===-1){var W=O._result;W=W(),W.then(function(q){(O._status===0||O._status===-1)&&(O._status=1,O._result=q)},function(q){(O._status===0||O._status===-1)&&(O._status=2,O._result=q)}),O._status===-1&&(O._status=0,O._result=W)}if(O._status===1)return O._result.default;throw O._result}var K={current:null},X={transition:null},Z={ReactCurrentDispatcher:K,ReactCurrentBatchConfig:X,ReactCurrentOwner:U};function Y(){throw Error("act(...) is not supported in production builds of React.")}return St.Children={map:$,forEach:function(O,W,q){$(O,function(){W.apply(this,arguments)},q)},count:function(O){var W=0;return $(O,function(){W++}),W},toArray:function(O){return $(O,function(W){return W})||[]},only:function(O){if(!D(O))throw Error("React.Children.only expected to receive a single React element child.");return O}},St.Component=S,St.Fragment=t,St.Profiler=o,St.PureComponent=w,St.StrictMode=r,St.Suspense=f,St.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Z,St.act=Y,St.cloneElement=function(O,W,q){if(O==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+O+".");var fe=M({},O.props),ve=O.key,Te=O.ref,Ae=O._owner;if(W!=null){if(W.ref!==void 0&&(Te=W.ref,Ae=U.current),W.key!==void 0&&(ve=""+W.key),O.type&&O.type.defaultProps)var Fe=O.type.defaultProps;for(ge in W)B.call(W,ge)&&!I.hasOwnProperty(ge)&&(fe[ge]=W[ge]===void 0&&Fe!==void 0?Fe[ge]:W[ge])}var ge=arguments.length-2;if(ge===1)fe.children=q;else if(1<ge){Fe=Array(ge);for(var be=0;be<ge;be++)Fe[be]=arguments[be+2];fe.children=Fe}return{$$typeof:s,type:O.type,key:ve,ref:Te,props:fe,_owner:Ae}},St.createContext=function(O){return O={$$typeof:d,_currentValue:O,_currentValue2:O,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},O.Provider={$$typeof:l,_context:O},O.Consumer=O},St.createElement=ne,St.createFactory=function(O){var W=ne.bind(null,O);return W.type=O,W},St.createRef=function(){return{current:null}},St.forwardRef=function(O){return{$$typeof:c,render:O}},St.isValidElement=D,St.lazy=function(O){return{$$typeof:p,_payload:{_status:-1,_result:O},_init:J}},St.memo=function(O,W){return{$$typeof:h,type:O,compare:W===void 0?null:W}},St.startTransition=function(O){var W=X.transition;X.transition={};try{O()}finally{X.transition=W}},St.unstable_act=Y,St.useCallback=function(O,W){return K.current.useCallback(O,W)},St.useContext=function(O){return K.current.useContext(O)},St.useDebugValue=function(){},St.useDeferredValue=function(O){return K.current.useDeferredValue(O)},St.useEffect=function(O,W){return K.current.useEffect(O,W)},St.useId=function(){return K.current.useId()},St.useImperativeHandle=function(O,W,q){return K.current.useImperativeHandle(O,W,q)},St.useInsertionEffect=function(O,W){return K.current.useInsertionEffect(O,W)},St.useLayoutEffect=function(O,W){return K.current.useLayoutEffect(O,W)},St.useMemo=function(O,W){return K.current.useMemo(O,W)},St.useReducer=function(O,W,q){return K.current.useReducer(O,W,q)},St.useRef=function(O){return K.current.useRef(O)},St.useState=function(O){return K.current.useState(O)},St.useSyncExternalStore=function(O,W,q){return K.current.useSyncExternalStore(O,W,q)},St.useTransition=function(){return K.current.useTransition()},St.version="18.3.1",St}var Kp;function lf(){return Kp||(Kp=1,td.exports=Yx()),td.exports}/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Zp;function qx(){if(Zp)return Yo;Zp=1;var s=lf(),e=Symbol.for("react.element"),t=Symbol.for("react.fragment"),r=Object.prototype.hasOwnProperty,o=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function d(c,f,h){var p,g={},y=null,x=null;h!==void 0&&(y=""+h),f.key!==void 0&&(y=""+f.key),f.ref!==void 0&&(x=f.ref);for(p in f)r.call(f,p)&&!l.hasOwnProperty(p)&&(g[p]=f[p]);if(c&&c.defaultProps)for(p in f=c.defaultProps,f)g[p]===void 0&&(g[p]=f[p]);return{$$typeof:e,type:c,key:y,ref:x,props:g,_owner:o.current}}return Yo.Fragment=t,Yo.jsx=d,Yo.jsxs=d,Yo}var Jp;function Kx(){return Jp||(Jp=1,ed.exports=qx()),ed.exports}var b=Kx(),ue=lf();const Zx=$x(ue),Jx=Xx({__proto__:null,default:Zx},[ue]);var yl={},nd={exports:{}},Fn={},id={exports:{}},rd={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Qp;function Qx(){return Qp||(Qp=1,function(s){function e(X,Z){var Y=X.length;X.push(Z);e:for(;0<Y;){var O=Y-1>>>1,W=X[O];if(0<o(W,Z))X[O]=Z,X[Y]=W,Y=O;else break e}}function t(X){return X.length===0?null:X[0]}function r(X){if(X.length===0)return null;var Z=X[0],Y=X.pop();if(Y!==Z){X[0]=Y;e:for(var O=0,W=X.length,q=W>>>1;O<q;){var fe=2*(O+1)-1,ve=X[fe],Te=fe+1,Ae=X[Te];if(0>o(ve,Y))Te<W&&0>o(Ae,ve)?(X[O]=Ae,X[Te]=Y,O=Te):(X[O]=ve,X[fe]=Y,O=fe);else if(Te<W&&0>o(Ae,Y))X[O]=Ae,X[Te]=Y,O=Te;else break e}}return Z}function o(X,Z){var Y=X.sortIndex-Z.sortIndex;return Y!==0?Y:X.id-Z.id}if(typeof performance=="object"&&typeof performance.now=="function"){var l=performance;s.unstable_now=function(){return l.now()}}else{var d=Date,c=d.now();s.unstable_now=function(){return d.now()-c}}var f=[],h=[],p=1,g=null,y=3,x=!1,M=!1,E=!1,S=typeof setTimeout=="function"?setTimeout:null,v=typeof clearTimeout=="function"?clearTimeout:null,w=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function A(X){for(var Z=t(h);Z!==null;){if(Z.callback===null)r(h);else if(Z.startTime<=X)r(h),Z.sortIndex=Z.expirationTime,e(f,Z);else break;Z=t(h)}}function P(X){if(E=!1,A(X),!M)if(t(f)!==null)M=!0,J(B);else{var Z=t(h);Z!==null&&K(P,Z.startTime-X)}}function B(X,Z){M=!1,E&&(E=!1,v(ne),ne=-1),x=!0;var Y=y;try{for(A(Z),g=t(f);g!==null&&(!(g.expirationTime>Z)||X&&!re());){var O=g.callback;if(typeof O=="function"){g.callback=null,y=g.priorityLevel;var W=O(g.expirationTime<=Z);Z=s.unstable_now(),typeof W=="function"?g.callback=W:g===t(f)&&r(f),A(Z)}else r(f);g=t(f)}if(g!==null)var q=!0;else{var fe=t(h);fe!==null&&K(P,fe.startTime-Z),q=!1}return q}finally{g=null,y=Y,x=!1}}var U=!1,I=null,ne=-1,R=5,D=-1;function re(){return!(s.unstable_now()-D<R)}function ae(){if(I!==null){var X=s.unstable_now();D=X;var Z=!0;try{Z=I(!0,X)}finally{Z?me():(U=!1,I=null)}}else U=!1}var me;if(typeof w=="function")me=function(){w(ae)};else if(typeof MessageChannel<"u"){var F=new MessageChannel,$=F.port2;F.port1.onmessage=ae,me=function(){$.postMessage(null)}}else me=function(){S(ae,0)};function J(X){I=X,U||(U=!0,me())}function K(X,Z){ne=S(function(){X(s.unstable_now())},Z)}s.unstable_IdlePriority=5,s.unstable_ImmediatePriority=1,s.unstable_LowPriority=4,s.unstable_NormalPriority=3,s.unstable_Profiling=null,s.unstable_UserBlockingPriority=2,s.unstable_cancelCallback=function(X){X.callback=null},s.unstable_continueExecution=function(){M||x||(M=!0,J(B))},s.unstable_forceFrameRate=function(X){0>X||125<X?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):R=0<X?Math.floor(1e3/X):5},s.unstable_getCurrentPriorityLevel=function(){return y},s.unstable_getFirstCallbackNode=function(){return t(f)},s.unstable_next=function(X){switch(y){case 1:case 2:case 3:var Z=3;break;default:Z=y}var Y=y;y=Z;try{return X()}finally{y=Y}},s.unstable_pauseExecution=function(){},s.unstable_requestPaint=function(){},s.unstable_runWithPriority=function(X,Z){switch(X){case 1:case 2:case 3:case 4:case 5:break;default:X=3}var Y=y;y=X;try{return Z()}finally{y=Y}},s.unstable_scheduleCallback=function(X,Z,Y){var O=s.unstable_now();switch(typeof Y=="object"&&Y!==null?(Y=Y.delay,Y=typeof Y=="number"&&0<Y?O+Y:O):Y=O,X){case 1:var W=-1;break;case 2:W=250;break;case 5:W=1073741823;break;case 4:W=1e4;break;default:W=5e3}return W=Y+W,X={id:p++,callback:Z,priorityLevel:X,startTime:Y,expirationTime:W,sortIndex:-1},Y>O?(X.sortIndex=Y,e(h,X),t(f)===null&&X===t(h)&&(E?(v(ne),ne=-1):E=!0,K(P,Y-O))):(X.sortIndex=W,e(f,X),M||x||(M=!0,J(B))),X},s.unstable_shouldYield=re,s.unstable_wrapCallback=function(X){var Z=y;return function(){var Y=y;y=Z;try{return X.apply(this,arguments)}finally{y=Y}}}}(rd)),rd}var em;function e_(){return em||(em=1,id.exports=Qx()),id.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var tm;function t_(){if(tm)return Fn;tm=1;var s=lf(),e=e_();function t(n){for(var i="https://reactjs.org/docs/error-decoder.html?invariant="+n,a=1;a<arguments.length;a++)i+="&args[]="+encodeURIComponent(arguments[a]);return"Minified React error #"+n+"; visit "+i+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var r=new Set,o={};function l(n,i){d(n,i),d(n+"Capture",i)}function d(n,i){for(o[n]=i,n=0;n<i.length;n++)r.add(i[n])}var c=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),f=Object.prototype.hasOwnProperty,h=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,p={},g={};function y(n){return f.call(g,n)?!0:f.call(p,n)?!1:h.test(n)?g[n]=!0:(p[n]=!0,!1)}function x(n,i,a,u){if(a!==null&&a.type===0)return!1;switch(typeof i){case"function":case"symbol":return!0;case"boolean":return u?!1:a!==null?!a.acceptsBooleans:(n=n.toLowerCase().slice(0,5),n!=="data-"&&n!=="aria-");default:return!1}}function M(n,i,a,u){if(i===null||typeof i>"u"||x(n,i,a,u))return!0;if(u)return!1;if(a!==null)switch(a.type){case 3:return!i;case 4:return i===!1;case 5:return isNaN(i);case 6:return isNaN(i)||1>i}return!1}function E(n,i,a,u,m,_,T){this.acceptsBooleans=i===2||i===3||i===4,this.attributeName=u,this.attributeNamespace=m,this.mustUseProperty=a,this.propertyName=n,this.type=i,this.sanitizeURL=_,this.removeEmptyString=T}var S={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n){S[n]=new E(n,0,!1,n,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(n){var i=n[0];S[i]=new E(i,1,!1,n[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(n){S[n]=new E(n,2,!1,n.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(n){S[n]=new E(n,2,!1,n,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n){S[n]=new E(n,3,!1,n.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(n){S[n]=new E(n,3,!0,n,null,!1,!1)}),["capture","download"].forEach(function(n){S[n]=new E(n,4,!1,n,null,!1,!1)}),["cols","rows","size","span"].forEach(function(n){S[n]=new E(n,6,!1,n,null,!1,!1)}),["rowSpan","start"].forEach(function(n){S[n]=new E(n,5,!1,n.toLowerCase(),null,!1,!1)});var v=/[\-:]([a-z])/g;function w(n){return n[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n){var i=n.replace(v,w);S[i]=new E(i,1,!1,n,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n){var i=n.replace(v,w);S[i]=new E(i,1,!1,n,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(n){var i=n.replace(v,w);S[i]=new E(i,1,!1,n,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(n){S[n]=new E(n,1,!1,n.toLowerCase(),null,!1,!1)}),S.xlinkHref=new E("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(n){S[n]=new E(n,1,!1,n.toLowerCase(),null,!0,!0)});function A(n,i,a,u){var m=S.hasOwnProperty(i)?S[i]:null;(m!==null?m.type!==0:u||!(2<i.length)||i[0]!=="o"&&i[0]!=="O"||i[1]!=="n"&&i[1]!=="N")&&(M(i,a,m,u)&&(a=null),u||m===null?y(i)&&(a===null?n.removeAttribute(i):n.setAttribute(i,""+a)):m.mustUseProperty?n[m.propertyName]=a===null?m.type===3?!1:"":a:(i=m.attributeName,u=m.attributeNamespace,a===null?n.removeAttribute(i):(m=m.type,a=m===3||m===4&&a===!0?"":""+a,u?n.setAttributeNS(u,i,a):n.setAttribute(i,a))))}var P=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,B=Symbol.for("react.element"),U=Symbol.for("react.portal"),I=Symbol.for("react.fragment"),ne=Symbol.for("react.strict_mode"),R=Symbol.for("react.profiler"),D=Symbol.for("react.provider"),re=Symbol.for("react.context"),ae=Symbol.for("react.forward_ref"),me=Symbol.for("react.suspense"),F=Symbol.for("react.suspense_list"),$=Symbol.for("react.memo"),J=Symbol.for("react.lazy"),K=Symbol.for("react.offscreen"),X=Symbol.iterator;function Z(n){return n===null||typeof n!="object"?null:(n=X&&n[X]||n["@@iterator"],typeof n=="function"?n:null)}var Y=Object.assign,O;function W(n){if(O===void 0)try{throw Error()}catch(a){var i=a.stack.trim().match(/\n( *(at )?)/);O=i&&i[1]||""}return`
`+O+n}var q=!1;function fe(n,i){if(!n||q)return"";q=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(i)if(i=function(){throw Error()},Object.defineProperty(i.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(i,[])}catch(le){var u=le}Reflect.construct(n,[],i)}else{try{i.call()}catch(le){u=le}n.call(i.prototype)}else{try{throw Error()}catch(le){u=le}n()}}catch(le){if(le&&u&&typeof le.stack=="string"){for(var m=le.stack.split(`
`),_=u.stack.split(`
`),T=m.length-1,k=_.length-1;1<=T&&0<=k&&m[T]!==_[k];)k--;for(;1<=T&&0<=k;T--,k--)if(m[T]!==_[k]){if(T!==1||k!==1)do if(T--,k--,0>k||m[T]!==_[k]){var G=`
`+m[T].replace(" at new "," at ");return n.displayName&&G.includes("<anonymous>")&&(G=G.replace("<anonymous>",n.displayName)),G}while(1<=T&&0<=k);break}}}finally{q=!1,Error.prepareStackTrace=a}return(n=n?n.displayName||n.name:"")?W(n):""}function ve(n){switch(n.tag){case 5:return W(n.type);case 16:return W("Lazy");case 13:return W("Suspense");case 19:return W("SuspenseList");case 0:case 2:case 15:return n=fe(n.type,!1),n;case 11:return n=fe(n.type.render,!1),n;case 1:return n=fe(n.type,!0),n;default:return""}}function Te(n){if(n==null)return null;if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n;switch(n){case I:return"Fragment";case U:return"Portal";case R:return"Profiler";case ne:return"StrictMode";case me:return"Suspense";case F:return"SuspenseList"}if(typeof n=="object")switch(n.$$typeof){case re:return(n.displayName||"Context")+".Consumer";case D:return(n._context.displayName||"Context")+".Provider";case ae:var i=n.render;return n=n.displayName,n||(n=i.displayName||i.name||"",n=n!==""?"ForwardRef("+n+")":"ForwardRef"),n;case $:return i=n.displayName||null,i!==null?i:Te(n.type)||"Memo";case J:i=n._payload,n=n._init;try{return Te(n(i))}catch{}}return null}function Ae(n){var i=n.type;switch(n.tag){case 24:return"Cache";case 9:return(i.displayName||"Context")+".Consumer";case 10:return(i._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return n=i.render,n=n.displayName||n.name||"",i.displayName||(n!==""?"ForwardRef("+n+")":"ForwardRef");case 7:return"Fragment";case 5:return i;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Te(i);case 8:return i===ne?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof i=="function")return i.displayName||i.name||null;if(typeof i=="string")return i}return null}function Fe(n){switch(typeof n){case"boolean":case"number":case"string":case"undefined":return n;case"object":return n;default:return""}}function ge(n){var i=n.type;return(n=n.nodeName)&&n.toLowerCase()==="input"&&(i==="checkbox"||i==="radio")}function be(n){var i=ge(n)?"checked":"value",a=Object.getOwnPropertyDescriptor(n.constructor.prototype,i),u=""+n[i];if(!n.hasOwnProperty(i)&&typeof a<"u"&&typeof a.get=="function"&&typeof a.set=="function"){var m=a.get,_=a.set;return Object.defineProperty(n,i,{configurable:!0,get:function(){return m.call(this)},set:function(T){u=""+T,_.call(this,T)}}),Object.defineProperty(n,i,{enumerable:a.enumerable}),{getValue:function(){return u},setValue:function(T){u=""+T},stopTracking:function(){n._valueTracker=null,delete n[i]}}}}function ze(n){n._valueTracker||(n._valueTracker=be(n))}function ee(n){if(!n)return!1;var i=n._valueTracker;if(!i)return!0;var a=i.getValue(),u="";return n&&(u=ge(n)?n.checked?"true":"false":n.value),n=u,n!==a?(i.setValue(n),!0):!1}function nt(n){if(n=n||(typeof document<"u"?document:void 0),typeof n>"u")return null;try{return n.activeElement||n.body}catch{return n.body}}function ke(n,i){var a=i.checked;return Y({},i,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:a??n._wrapperState.initialChecked})}function Qe(n,i){var a=i.defaultValue==null?"":i.defaultValue,u=i.checked!=null?i.checked:i.defaultChecked;a=Fe(i.value!=null?i.value:a),n._wrapperState={initialChecked:u,initialValue:a,controlled:i.type==="checkbox"||i.type==="radio"?i.checked!=null:i.value!=null}}function Ve(n,i){i=i.checked,i!=null&&A(n,"checked",i,!1)}function wt(n,i){Ve(n,i);var a=Fe(i.value),u=i.type;if(a!=null)u==="number"?(a===0&&n.value===""||n.value!=a)&&(n.value=""+a):n.value!==""+a&&(n.value=""+a);else if(u==="submit"||u==="reset"){n.removeAttribute("value");return}i.hasOwnProperty("value")?L(n,i.type,a):i.hasOwnProperty("defaultValue")&&L(n,i.type,Fe(i.defaultValue)),i.checked==null&&i.defaultChecked!=null&&(n.defaultChecked=!!i.defaultChecked)}function ot(n,i,a){if(i.hasOwnProperty("value")||i.hasOwnProperty("defaultValue")){var u=i.type;if(!(u!=="submit"&&u!=="reset"||i.value!==void 0&&i.value!==null))return;i=""+n._wrapperState.initialValue,a||i===n.value||(n.value=i),n.defaultValue=i}a=n.name,a!==""&&(n.name=""),n.defaultChecked=!!n._wrapperState.initialChecked,a!==""&&(n.name=a)}function L(n,i,a){(i!=="number"||nt(n.ownerDocument)!==n)&&(a==null?n.defaultValue=""+n._wrapperState.initialValue:n.defaultValue!==""+a&&(n.defaultValue=""+a))}var C=Array.isArray;function se(n,i,a,u){if(n=n.options,i){i={};for(var m=0;m<a.length;m++)i["$"+a[m]]=!0;for(a=0;a<n.length;a++)m=i.hasOwnProperty("$"+n[a].value),n[a].selected!==m&&(n[a].selected=m),m&&u&&(n[a].defaultSelected=!0)}else{for(a=""+Fe(a),i=null,m=0;m<n.length;m++){if(n[m].value===a){n[m].selected=!0,u&&(n[m].defaultSelected=!0);return}i!==null||n[m].disabled||(i=n[m])}i!==null&&(i.selected=!0)}}function Me(n,i){if(i.dangerouslySetInnerHTML!=null)throw Error(t(91));return Y({},i,{value:void 0,defaultValue:void 0,children:""+n._wrapperState.initialValue})}function ye(n,i){var a=i.value;if(a==null){if(a=i.children,i=i.defaultValue,a!=null){if(i!=null)throw Error(t(92));if(C(a)){if(1<a.length)throw Error(t(93));a=a[0]}i=a}i==null&&(i=""),a=i}n._wrapperState={initialValue:Fe(a)}}function we(n,i){var a=Fe(i.value),u=Fe(i.defaultValue);a!=null&&(a=""+a,a!==n.value&&(n.value=a),i.defaultValue==null&&n.defaultValue!==a&&(n.defaultValue=a)),u!=null&&(n.defaultValue=""+u)}function Ze(n){var i=n.textContent;i===n._wrapperState.initialValue&&i!==""&&i!==null&&(n.value=i)}function Ie(n){switch(n){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function He(n,i){return n==null||n==="http://www.w3.org/1999/xhtml"?Ie(i):n==="http://www.w3.org/2000/svg"&&i==="foreignObject"?"http://www.w3.org/1999/xhtml":n}var qe,rt=function(n){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(i,a,u,m){MSApp.execUnsafeLocalFunction(function(){return n(i,a,u,m)})}:n}(function(n,i){if(n.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in n)n.innerHTML=i;else{for(qe=qe||document.createElement("div"),qe.innerHTML="<svg>"+i.valueOf().toString()+"</svg>",i=qe.firstChild;n.firstChild;)n.removeChild(n.firstChild);for(;i.firstChild;)n.appendChild(i.firstChild)}});function xe(n,i){if(i){var a=n.firstChild;if(a&&a===n.lastChild&&a.nodeType===3){a.nodeValue=i;return}}n.textContent=i}var mt={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},H=["Webkit","ms","Moz","O"];Object.keys(mt).forEach(function(n){H.forEach(function(i){i=i+n.charAt(0).toUpperCase()+n.substring(1),mt[i]=mt[n]})});function _e(n,i,a){return i==null||typeof i=="boolean"||i===""?"":a||typeof i!="number"||i===0||mt.hasOwnProperty(n)&&mt[n]?(""+i).trim():i+"px"}function Ue(n,i){n=n.style;for(var a in i)if(i.hasOwnProperty(a)){var u=a.indexOf("--")===0,m=_e(a,i[a],u);a==="float"&&(a="cssFloat"),u?n.setProperty(a,m):n[a]=m}}var Re=Y({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function $e(n,i){if(i){if(Re[n]&&(i.children!=null||i.dangerouslySetInnerHTML!=null))throw Error(t(137,n));if(i.dangerouslySetInnerHTML!=null){if(i.children!=null)throw Error(t(60));if(typeof i.dangerouslySetInnerHTML!="object"||!("__html"in i.dangerouslySetInnerHTML))throw Error(t(61))}if(i.style!=null&&typeof i.style!="object")throw Error(t(62))}}function dt(n,i){if(n.indexOf("-")===-1)return typeof i.is=="string";switch(n){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var gt=null;function st(n){return n=n.target||n.srcElement||window,n.correspondingUseElement&&(n=n.correspondingUseElement),n.nodeType===3?n.parentNode:n}var Le=null,V=null,Pe=null;function Ne(n){if(n=Do(n)){if(typeof Le!="function")throw Error(t(280));var i=n.stateNode;i&&(i=Ia(i),Le(n.stateNode,n.type,i))}}function oe(n){V?Pe?Pe.push(n):Pe=[n]:V=n}function pe(){if(V){var n=V,i=Pe;if(Pe=V=null,Ne(n),i)for(n=0;n<i.length;n++)Ne(i[n])}}function tt(n,i){return n(i)}function je(){}var ht=!1;function Tt(n,i,a){if(ht)return n(i,a);ht=!0;try{return tt(n,i,a)}finally{ht=!1,(V!==null||Pe!==null)&&(je(),pe())}}function yt(n,i){var a=n.stateNode;if(a===null)return null;var u=Ia(a);if(u===null)return null;a=u[i];e:switch(i){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(u=!u.disabled)||(n=n.type,u=!(n==="button"||n==="input"||n==="select"||n==="textarea")),n=!u;break e;default:n=!1}if(n)return null;if(a&&typeof a!="function")throw Error(t(231,i,typeof a));return a}var $t=!1;if(c)try{var pn={};Object.defineProperty(pn,"passive",{get:function(){$t=!0}}),window.addEventListener("test",pn,pn),window.removeEventListener("test",pn,pn)}catch{$t=!1}function pa(n,i,a,u,m,_,T,k,G){var le=Array.prototype.slice.call(arguments,3);try{i.apply(a,le)}catch(Ee){this.onError(Ee)}}var Nr=!1,bi=null,Dr=!1,Yi=null,ma={onError:function(n){Nr=!0,bi=n}};function ga(n,i,a,u,m,_,T,k,G){Nr=!1,bi=null,pa.apply(ma,arguments)}function Mc(n,i,a,u,m,_,T,k,G){if(ga.apply(this,arguments),Nr){if(Nr){var le=bi;Nr=!1,bi=null}else throw Error(t(198));Dr||(Dr=!0,Yi=le)}}function Ci(n){var i=n,a=n;if(n.alternate)for(;i.return;)i=i.return;else{n=i;do i=n,i.flags&4098&&(a=i.return),n=i.return;while(n)}return i.tag===3?a:null}function va(n){if(n.tag===13){var i=n.memoizedState;if(i===null&&(n=n.alternate,n!==null&&(i=n.memoizedState)),i!==null)return i.dehydrated}return null}function N(n){if(Ci(n)!==n)throw Error(t(188))}function te(n){var i=n.alternate;if(!i){if(i=Ci(n),i===null)throw Error(t(188));return i!==n?null:n}for(var a=n,u=i;;){var m=a.return;if(m===null)break;var _=m.alternate;if(_===null){if(u=m.return,u!==null){a=u;continue}break}if(m.child===_.child){for(_=m.child;_;){if(_===a)return N(m),n;if(_===u)return N(m),i;_=_.sibling}throw Error(t(188))}if(a.return!==u.return)a=m,u=_;else{for(var T=!1,k=m.child;k;){if(k===a){T=!0,a=m,u=_;break}if(k===u){T=!0,u=m,a=_;break}k=k.sibling}if(!T){for(k=_.child;k;){if(k===a){T=!0,a=_,u=m;break}if(k===u){T=!0,u=_,a=m;break}k=k.sibling}if(!T)throw Error(t(189))}}if(a.alternate!==u)throw Error(t(190))}if(a.tag!==3)throw Error(t(188));return a.stateNode.current===a?n:i}function de(n){return n=te(n),n!==null?he(n):null}function he(n){if(n.tag===5||n.tag===6)return n;for(n=n.child;n!==null;){var i=he(n);if(i!==null)return i;n=n.sibling}return null}var ce=e.unstable_scheduleCallback,Ge=e.unstable_cancelCallback,it=e.unstable_shouldYield,ct=e.unstable_requestPaint,Xe=e.unstable_now,vt=e.unstable_getCurrentPriorityLevel,ft=e.unstable_ImmediatePriority,pt=e.unstable_UserBlockingPriority,Nt=e.unstable_NormalPriority,Mn=e.unstable_LowPriority,Yt=e.unstable_IdlePriority,Pn=null,At=null;function xt(n){if(At&&typeof At.onCommitFiberRoot=="function")try{At.onCommitFiberRoot(Pn,n,void 0,(n.current.flags&128)===128)}catch{}}var En=Math.clz32?Math.clz32:xa,kt=Math.log,Ri=Math.LN2;function xa(n){return n>>>=0,n===0?32:31-(kt(n)/Ri|0)|0}var vi=64,qi=4194304;function Wt(n){switch(n&-n){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return n&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return n}}function Yn(n,i){var a=n.pendingLanes;if(a===0)return 0;var u=0,m=n.suspendedLanes,_=n.pingedLanes,T=a&268435455;if(T!==0){var k=T&~m;k!==0?u=Wt(k):(_&=T,_!==0&&(u=Wt(_)))}else T=a&~m,T!==0?u=Wt(T):_!==0&&(u=Wt(_));if(u===0)return 0;if(i!==0&&i!==u&&!(i&m)&&(m=u&-u,_=i&-i,m>=_||m===16&&(_&4194240)!==0))return i;if(u&4&&(u|=a&16),i=n.entangledLanes,i!==0)for(n=n.entanglements,i&=u;0<i;)a=31-En(i),m=1<<a,u|=n[a],i&=~m;return u}function mo(n,i){switch(n){case 1:case 2:case 4:return i+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return i+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Ln(n,i){for(var a=n.suspendedLanes,u=n.pingedLanes,m=n.expirationTimes,_=n.pendingLanes;0<_;){var T=31-En(_),k=1<<T,G=m[T];G===-1?(!(k&a)||k&u)&&(m[T]=mo(k,i)):G<=i&&(n.expiredLanes|=k),_&=~k}}function Ur(n){return n=n.pendingLanes&-1073741825,n!==0?n:n&1073741824?1073741824:0}function _a(){var n=vi;return vi<<=1,!(vi&4194240)&&(vi=64),n}function ls(n){for(var i=[],a=0;31>a;a++)i.push(n);return i}function go(n,i,a){n.pendingLanes|=i,i!==536870912&&(n.suspendedLanes=0,n.pingedLanes=0),n=n.eventTimes,i=31-En(i),n[i]=a}function h0(n,i){var a=n.pendingLanes&~i;n.pendingLanes=i,n.suspendedLanes=0,n.pingedLanes=0,n.expiredLanes&=i,n.mutableReadLanes&=i,n.entangledLanes&=i,i=n.entanglements;var u=n.eventTimes;for(n=n.expirationTimes;0<a;){var m=31-En(a),_=1<<m;i[m]=0,u[m]=-1,n[m]=-1,a&=~_}}function Ec(n,i){var a=n.entangledLanes|=i;for(n=n.entanglements;a;){var u=31-En(a),m=1<<u;m&i|n[u]&i&&(n[u]|=i),a&=~m}}var Pt=0;function bf(n){return n&=-n,1<n?4<n?n&268435455?16:536870912:4:1}var Cf,wc,Rf,Pf,Lf,Tc=!1,ya=[],Ki=null,Zi=null,Ji=null,vo=new Map,xo=new Map,Qi=[],p0="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Nf(n,i){switch(n){case"focusin":case"focusout":Ki=null;break;case"dragenter":case"dragleave":Zi=null;break;case"mouseover":case"mouseout":Ji=null;break;case"pointerover":case"pointerout":vo.delete(i.pointerId);break;case"gotpointercapture":case"lostpointercapture":xo.delete(i.pointerId)}}function _o(n,i,a,u,m,_){return n===null||n.nativeEvent!==_?(n={blockedOn:i,domEventName:a,eventSystemFlags:u,nativeEvent:_,targetContainers:[m]},i!==null&&(i=Do(i),i!==null&&wc(i)),n):(n.eventSystemFlags|=u,i=n.targetContainers,m!==null&&i.indexOf(m)===-1&&i.push(m),n)}function m0(n,i,a,u,m){switch(i){case"focusin":return Ki=_o(Ki,n,i,a,u,m),!0;case"dragenter":return Zi=_o(Zi,n,i,a,u,m),!0;case"mouseover":return Ji=_o(Ji,n,i,a,u,m),!0;case"pointerover":var _=m.pointerId;return vo.set(_,_o(vo.get(_)||null,n,i,a,u,m)),!0;case"gotpointercapture":return _=m.pointerId,xo.set(_,_o(xo.get(_)||null,n,i,a,u,m)),!0}return!1}function Df(n){var i=Ir(n.target);if(i!==null){var a=Ci(i);if(a!==null){if(i=a.tag,i===13){if(i=va(a),i!==null){n.blockedOn=i,Lf(n.priority,function(){Rf(a)});return}}else if(i===3&&a.stateNode.current.memoizedState.isDehydrated){n.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}n.blockedOn=null}function Sa(n){if(n.blockedOn!==null)return!1;for(var i=n.targetContainers;0<i.length;){var a=bc(n.domEventName,n.eventSystemFlags,i[0],n.nativeEvent);if(a===null){a=n.nativeEvent;var u=new a.constructor(a.type,a);gt=u,a.target.dispatchEvent(u),gt=null}else return i=Do(a),i!==null&&wc(i),n.blockedOn=a,!1;i.shift()}return!0}function Uf(n,i,a){Sa(n)&&a.delete(i)}function g0(){Tc=!1,Ki!==null&&Sa(Ki)&&(Ki=null),Zi!==null&&Sa(Zi)&&(Zi=null),Ji!==null&&Sa(Ji)&&(Ji=null),vo.forEach(Uf),xo.forEach(Uf)}function yo(n,i){n.blockedOn===i&&(n.blockedOn=null,Tc||(Tc=!0,e.unstable_scheduleCallback(e.unstable_NormalPriority,g0)))}function So(n){function i(m){return yo(m,n)}if(0<ya.length){yo(ya[0],n);for(var a=1;a<ya.length;a++){var u=ya[a];u.blockedOn===n&&(u.blockedOn=null)}}for(Ki!==null&&yo(Ki,n),Zi!==null&&yo(Zi,n),Ji!==null&&yo(Ji,n),vo.forEach(i),xo.forEach(i),a=0;a<Qi.length;a++)u=Qi[a],u.blockedOn===n&&(u.blockedOn=null);for(;0<Qi.length&&(a=Qi[0],a.blockedOn===null);)Df(a),a.blockedOn===null&&Qi.shift()}var cs=P.ReactCurrentBatchConfig,Ma=!0;function v0(n,i,a,u){var m=Pt,_=cs.transition;cs.transition=null;try{Pt=1,Ac(n,i,a,u)}finally{Pt=m,cs.transition=_}}function x0(n,i,a,u){var m=Pt,_=cs.transition;cs.transition=null;try{Pt=4,Ac(n,i,a,u)}finally{Pt=m,cs.transition=_}}function Ac(n,i,a,u){if(Ma){var m=bc(n,i,a,u);if(m===null)Wc(n,i,u,Ea,a),Nf(n,u);else if(m0(m,n,i,a,u))u.stopPropagation();else if(Nf(n,u),i&4&&-1<p0.indexOf(n)){for(;m!==null;){var _=Do(m);if(_!==null&&Cf(_),_=bc(n,i,a,u),_===null&&Wc(n,i,u,Ea,a),_===m)break;m=_}m!==null&&u.stopPropagation()}else Wc(n,i,u,null,a)}}var Ea=null;function bc(n,i,a,u){if(Ea=null,n=st(u),n=Ir(n),n!==null)if(i=Ci(n),i===null)n=null;else if(a=i.tag,a===13){if(n=va(i),n!==null)return n;n=null}else if(a===3){if(i.stateNode.current.memoizedState.isDehydrated)return i.tag===3?i.stateNode.containerInfo:null;n=null}else i!==n&&(n=null);return Ea=n,null}function If(n){switch(n){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(vt()){case ft:return 1;case pt:return 4;case Nt:case Mn:return 16;case Yt:return 536870912;default:return 16}default:return 16}}var er=null,Cc=null,wa=null;function Of(){if(wa)return wa;var n,i=Cc,a=i.length,u,m="value"in er?er.value:er.textContent,_=m.length;for(n=0;n<a&&i[n]===m[n];n++);var T=a-n;for(u=1;u<=T&&i[a-u]===m[_-u];u++);return wa=m.slice(n,1<u?1-u:void 0)}function Ta(n){var i=n.keyCode;return"charCode"in n?(n=n.charCode,n===0&&i===13&&(n=13)):n=i,n===10&&(n=13),32<=n||n===13?n:0}function Aa(){return!0}function Ff(){return!1}function Bn(n){function i(a,u,m,_,T){this._reactName=a,this._targetInst=m,this.type=u,this.nativeEvent=_,this.target=T,this.currentTarget=null;for(var k in n)n.hasOwnProperty(k)&&(a=n[k],this[k]=a?a(_):_[k]);return this.isDefaultPrevented=(_.defaultPrevented!=null?_.defaultPrevented:_.returnValue===!1)?Aa:Ff,this.isPropagationStopped=Ff,this}return Y(i.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=Aa)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=Aa)},persist:function(){},isPersistent:Aa}),i}var us={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(n){return n.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Rc=Bn(us),Mo=Y({},us,{view:0,detail:0}),_0=Bn(Mo),Pc,Lc,Eo,ba=Y({},Mo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Dc,button:0,buttons:0,relatedTarget:function(n){return n.relatedTarget===void 0?n.fromElement===n.srcElement?n.toElement:n.fromElement:n.relatedTarget},movementX:function(n){return"movementX"in n?n.movementX:(n!==Eo&&(Eo&&n.type==="mousemove"?(Pc=n.screenX-Eo.screenX,Lc=n.screenY-Eo.screenY):Lc=Pc=0,Eo=n),Pc)},movementY:function(n){return"movementY"in n?n.movementY:Lc}}),kf=Bn(ba),y0=Y({},ba,{dataTransfer:0}),S0=Bn(y0),M0=Y({},Mo,{relatedTarget:0}),Nc=Bn(M0),E0=Y({},us,{animationName:0,elapsedTime:0,pseudoElement:0}),w0=Bn(E0),T0=Y({},us,{clipboardData:function(n){return"clipboardData"in n?n.clipboardData:window.clipboardData}}),A0=Bn(T0),b0=Y({},us,{data:0}),zf=Bn(b0),C0={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},R0={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},P0={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function L0(n){var i=this.nativeEvent;return i.getModifierState?i.getModifierState(n):(n=P0[n])?!!i[n]:!1}function Dc(){return L0}var N0=Y({},Mo,{key:function(n){if(n.key){var i=C0[n.key]||n.key;if(i!=="Unidentified")return i}return n.type==="keypress"?(n=Ta(n),n===13?"Enter":String.fromCharCode(n)):n.type==="keydown"||n.type==="keyup"?R0[n.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Dc,charCode:function(n){return n.type==="keypress"?Ta(n):0},keyCode:function(n){return n.type==="keydown"||n.type==="keyup"?n.keyCode:0},which:function(n){return n.type==="keypress"?Ta(n):n.type==="keydown"||n.type==="keyup"?n.keyCode:0}}),D0=Bn(N0),U0=Y({},ba,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Bf=Bn(U0),I0=Y({},Mo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Dc}),O0=Bn(I0),F0=Y({},us,{propertyName:0,elapsedTime:0,pseudoElement:0}),k0=Bn(F0),z0=Y({},ba,{deltaX:function(n){return"deltaX"in n?n.deltaX:"wheelDeltaX"in n?-n.wheelDeltaX:0},deltaY:function(n){return"deltaY"in n?n.deltaY:"wheelDeltaY"in n?-n.wheelDeltaY:"wheelDelta"in n?-n.wheelDelta:0},deltaZ:0,deltaMode:0}),B0=Bn(z0),H0=[9,13,27,32],Uc=c&&"CompositionEvent"in window,wo=null;c&&"documentMode"in document&&(wo=document.documentMode);var V0=c&&"TextEvent"in window&&!wo,Hf=c&&(!Uc||wo&&8<wo&&11>=wo),Vf=" ",Gf=!1;function Wf(n,i){switch(n){case"keyup":return H0.indexOf(i.keyCode)!==-1;case"keydown":return i.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function jf(n){return n=n.detail,typeof n=="object"&&"data"in n?n.data:null}var ds=!1;function G0(n,i){switch(n){case"compositionend":return jf(i);case"keypress":return i.which!==32?null:(Gf=!0,Vf);case"textInput":return n=i.data,n===Vf&&Gf?null:n;default:return null}}function W0(n,i){if(ds)return n==="compositionend"||!Uc&&Wf(n,i)?(n=Of(),wa=Cc=er=null,ds=!1,n):null;switch(n){case"paste":return null;case"keypress":if(!(i.ctrlKey||i.altKey||i.metaKey)||i.ctrlKey&&i.altKey){if(i.char&&1<i.char.length)return i.char;if(i.which)return String.fromCharCode(i.which)}return null;case"compositionend":return Hf&&i.locale!=="ko"?null:i.data;default:return null}}var j0={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Xf(n){var i=n&&n.nodeName&&n.nodeName.toLowerCase();return i==="input"?!!j0[n.type]:i==="textarea"}function $f(n,i,a,u){oe(u),i=Na(i,"onChange"),0<i.length&&(a=new Rc("onChange","change",null,a,u),n.push({event:a,listeners:i}))}var To=null,Ao=null;function X0(n){dh(n,0)}function Ca(n){var i=gs(n);if(ee(i))return n}function $0(n,i){if(n==="change")return i}var Yf=!1;if(c){var Ic;if(c){var Oc="oninput"in document;if(!Oc){var qf=document.createElement("div");qf.setAttribute("oninput","return;"),Oc=typeof qf.oninput=="function"}Ic=Oc}else Ic=!1;Yf=Ic&&(!document.documentMode||9<document.documentMode)}function Kf(){To&&(To.detachEvent("onpropertychange",Zf),Ao=To=null)}function Zf(n){if(n.propertyName==="value"&&Ca(Ao)){var i=[];$f(i,Ao,n,st(n)),Tt(X0,i)}}function Y0(n,i,a){n==="focusin"?(Kf(),To=i,Ao=a,To.attachEvent("onpropertychange",Zf)):n==="focusout"&&Kf()}function q0(n){if(n==="selectionchange"||n==="keyup"||n==="keydown")return Ca(Ao)}function K0(n,i){if(n==="click")return Ca(i)}function Z0(n,i){if(n==="input"||n==="change")return Ca(i)}function J0(n,i){return n===i&&(n!==0||1/n===1/i)||n!==n&&i!==i}var si=typeof Object.is=="function"?Object.is:J0;function bo(n,i){if(si(n,i))return!0;if(typeof n!="object"||n===null||typeof i!="object"||i===null)return!1;var a=Object.keys(n),u=Object.keys(i);if(a.length!==u.length)return!1;for(u=0;u<a.length;u++){var m=a[u];if(!f.call(i,m)||!si(n[m],i[m]))return!1}return!0}function Jf(n){for(;n&&n.firstChild;)n=n.firstChild;return n}function Qf(n,i){var a=Jf(n);n=0;for(var u;a;){if(a.nodeType===3){if(u=n+a.textContent.length,n<=i&&u>=i)return{node:a,offset:i-n};n=u}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=Jf(a)}}function eh(n,i){return n&&i?n===i?!0:n&&n.nodeType===3?!1:i&&i.nodeType===3?eh(n,i.parentNode):"contains"in n?n.contains(i):n.compareDocumentPosition?!!(n.compareDocumentPosition(i)&16):!1:!1}function th(){for(var n=window,i=nt();i instanceof n.HTMLIFrameElement;){try{var a=typeof i.contentWindow.location.href=="string"}catch{a=!1}if(a)n=i.contentWindow;else break;i=nt(n.document)}return i}function Fc(n){var i=n&&n.nodeName&&n.nodeName.toLowerCase();return i&&(i==="input"&&(n.type==="text"||n.type==="search"||n.type==="tel"||n.type==="url"||n.type==="password")||i==="textarea"||n.contentEditable==="true")}function Q0(n){var i=th(),a=n.focusedElem,u=n.selectionRange;if(i!==a&&a&&a.ownerDocument&&eh(a.ownerDocument.documentElement,a)){if(u!==null&&Fc(a)){if(i=u.start,n=u.end,n===void 0&&(n=i),"selectionStart"in a)a.selectionStart=i,a.selectionEnd=Math.min(n,a.value.length);else if(n=(i=a.ownerDocument||document)&&i.defaultView||window,n.getSelection){n=n.getSelection();var m=a.textContent.length,_=Math.min(u.start,m);u=u.end===void 0?_:Math.min(u.end,m),!n.extend&&_>u&&(m=u,u=_,_=m),m=Qf(a,_);var T=Qf(a,u);m&&T&&(n.rangeCount!==1||n.anchorNode!==m.node||n.anchorOffset!==m.offset||n.focusNode!==T.node||n.focusOffset!==T.offset)&&(i=i.createRange(),i.setStart(m.node,m.offset),n.removeAllRanges(),_>u?(n.addRange(i),n.extend(T.node,T.offset)):(i.setEnd(T.node,T.offset),n.addRange(i)))}}for(i=[],n=a;n=n.parentNode;)n.nodeType===1&&i.push({element:n,left:n.scrollLeft,top:n.scrollTop});for(typeof a.focus=="function"&&a.focus(),a=0;a<i.length;a++)n=i[a],n.element.scrollLeft=n.left,n.element.scrollTop=n.top}}var ex=c&&"documentMode"in document&&11>=document.documentMode,fs=null,kc=null,Co=null,zc=!1;function nh(n,i,a){var u=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;zc||fs==null||fs!==nt(u)||(u=fs,"selectionStart"in u&&Fc(u)?u={start:u.selectionStart,end:u.selectionEnd}:(u=(u.ownerDocument&&u.ownerDocument.defaultView||window).getSelection(),u={anchorNode:u.anchorNode,anchorOffset:u.anchorOffset,focusNode:u.focusNode,focusOffset:u.focusOffset}),Co&&bo(Co,u)||(Co=u,u=Na(kc,"onSelect"),0<u.length&&(i=new Rc("onSelect","select",null,i,a),n.push({event:i,listeners:u}),i.target=fs)))}function Ra(n,i){var a={};return a[n.toLowerCase()]=i.toLowerCase(),a["Webkit"+n]="webkit"+i,a["Moz"+n]="moz"+i,a}var hs={animationend:Ra("Animation","AnimationEnd"),animationiteration:Ra("Animation","AnimationIteration"),animationstart:Ra("Animation","AnimationStart"),transitionend:Ra("Transition","TransitionEnd")},Bc={},ih={};c&&(ih=document.createElement("div").style,"AnimationEvent"in window||(delete hs.animationend.animation,delete hs.animationiteration.animation,delete hs.animationstart.animation),"TransitionEvent"in window||delete hs.transitionend.transition);function Pa(n){if(Bc[n])return Bc[n];if(!hs[n])return n;var i=hs[n],a;for(a in i)if(i.hasOwnProperty(a)&&a in ih)return Bc[n]=i[a];return n}var rh=Pa("animationend"),sh=Pa("animationiteration"),oh=Pa("animationstart"),ah=Pa("transitionend"),lh=new Map,ch="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function tr(n,i){lh.set(n,i),l(i,[n])}for(var Hc=0;Hc<ch.length;Hc++){var Vc=ch[Hc],tx=Vc.toLowerCase(),nx=Vc[0].toUpperCase()+Vc.slice(1);tr(tx,"on"+nx)}tr(rh,"onAnimationEnd"),tr(sh,"onAnimationIteration"),tr(oh,"onAnimationStart"),tr("dblclick","onDoubleClick"),tr("focusin","onFocus"),tr("focusout","onBlur"),tr(ah,"onTransitionEnd"),d("onMouseEnter",["mouseout","mouseover"]),d("onMouseLeave",["mouseout","mouseover"]),d("onPointerEnter",["pointerout","pointerover"]),d("onPointerLeave",["pointerout","pointerover"]),l("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),l("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),l("onBeforeInput",["compositionend","keypress","textInput","paste"]),l("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Ro="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),ix=new Set("cancel close invalid load scroll toggle".split(" ").concat(Ro));function uh(n,i,a){var u=n.type||"unknown-event";n.currentTarget=a,Mc(u,i,void 0,n),n.currentTarget=null}function dh(n,i){i=(i&4)!==0;for(var a=0;a<n.length;a++){var u=n[a],m=u.event;u=u.listeners;e:{var _=void 0;if(i)for(var T=u.length-1;0<=T;T--){var k=u[T],G=k.instance,le=k.currentTarget;if(k=k.listener,G!==_&&m.isPropagationStopped())break e;uh(m,k,le),_=G}else for(T=0;T<u.length;T++){if(k=u[T],G=k.instance,le=k.currentTarget,k=k.listener,G!==_&&m.isPropagationStopped())break e;uh(m,k,le),_=G}}}if(Dr)throw n=Yi,Dr=!1,Yi=null,n}function Ut(n,i){var a=i[Kc];a===void 0&&(a=i[Kc]=new Set);var u=n+"__bubble";a.has(u)||(fh(i,n,2,!1),a.add(u))}function Gc(n,i,a){var u=0;i&&(u|=4),fh(a,n,u,i)}var La="_reactListening"+Math.random().toString(36).slice(2);function Po(n){if(!n[La]){n[La]=!0,r.forEach(function(a){a!=="selectionchange"&&(ix.has(a)||Gc(a,!1,n),Gc(a,!0,n))});var i=n.nodeType===9?n:n.ownerDocument;i===null||i[La]||(i[La]=!0,Gc("selectionchange",!1,i))}}function fh(n,i,a,u){switch(If(i)){case 1:var m=v0;break;case 4:m=x0;break;default:m=Ac}a=m.bind(null,i,a,n),m=void 0,!$t||i!=="touchstart"&&i!=="touchmove"&&i!=="wheel"||(m=!0),u?m!==void 0?n.addEventListener(i,a,{capture:!0,passive:m}):n.addEventListener(i,a,!0):m!==void 0?n.addEventListener(i,a,{passive:m}):n.addEventListener(i,a,!1)}function Wc(n,i,a,u,m){var _=u;if(!(i&1)&&!(i&2)&&u!==null)e:for(;;){if(u===null)return;var T=u.tag;if(T===3||T===4){var k=u.stateNode.containerInfo;if(k===m||k.nodeType===8&&k.parentNode===m)break;if(T===4)for(T=u.return;T!==null;){var G=T.tag;if((G===3||G===4)&&(G=T.stateNode.containerInfo,G===m||G.nodeType===8&&G.parentNode===m))return;T=T.return}for(;k!==null;){if(T=Ir(k),T===null)return;if(G=T.tag,G===5||G===6){u=_=T;continue e}k=k.parentNode}}u=u.return}Tt(function(){var le=_,Ee=st(a),Ce=[];e:{var Se=lh.get(n);if(Se!==void 0){var We=Rc,Ke=n;switch(n){case"keypress":if(Ta(a)===0)break e;case"keydown":case"keyup":We=D0;break;case"focusin":Ke="focus",We=Nc;break;case"focusout":Ke="blur",We=Nc;break;case"beforeblur":case"afterblur":We=Nc;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":We=kf;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":We=S0;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":We=O0;break;case rh:case sh:case oh:We=w0;break;case ah:We=k0;break;case"scroll":We=_0;break;case"wheel":We=B0;break;case"copy":case"cut":case"paste":We=A0;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":We=Bf}var Je=(i&4)!==0,qt=!Je&&n==="scroll",Q=Je?Se!==null?Se+"Capture":null:Se;Je=[];for(var j=le,ie;j!==null;){ie=j;var De=ie.stateNode;if(ie.tag===5&&De!==null&&(ie=De,Q!==null&&(De=yt(j,Q),De!=null&&Je.push(Lo(j,De,ie)))),qt)break;j=j.return}0<Je.length&&(Se=new We(Se,Ke,null,a,Ee),Ce.push({event:Se,listeners:Je}))}}if(!(i&7)){e:{if(Se=n==="mouseover"||n==="pointerover",We=n==="mouseout"||n==="pointerout",Se&&a!==gt&&(Ke=a.relatedTarget||a.fromElement)&&(Ir(Ke)||Ke[Pi]))break e;if((We||Se)&&(Se=Ee.window===Ee?Ee:(Se=Ee.ownerDocument)?Se.defaultView||Se.parentWindow:window,We?(Ke=a.relatedTarget||a.toElement,We=le,Ke=Ke?Ir(Ke):null,Ke!==null&&(qt=Ci(Ke),Ke!==qt||Ke.tag!==5&&Ke.tag!==6)&&(Ke=null)):(We=null,Ke=le),We!==Ke)){if(Je=kf,De="onMouseLeave",Q="onMouseEnter",j="mouse",(n==="pointerout"||n==="pointerover")&&(Je=Bf,De="onPointerLeave",Q="onPointerEnter",j="pointer"),qt=We==null?Se:gs(We),ie=Ke==null?Se:gs(Ke),Se=new Je(De,j+"leave",We,a,Ee),Se.target=qt,Se.relatedTarget=ie,De=null,Ir(Ee)===le&&(Je=new Je(Q,j+"enter",Ke,a,Ee),Je.target=ie,Je.relatedTarget=qt,De=Je),qt=De,We&&Ke)t:{for(Je=We,Q=Ke,j=0,ie=Je;ie;ie=ps(ie))j++;for(ie=0,De=Q;De;De=ps(De))ie++;for(;0<j-ie;)Je=ps(Je),j--;for(;0<ie-j;)Q=ps(Q),ie--;for(;j--;){if(Je===Q||Q!==null&&Je===Q.alternate)break t;Je=ps(Je),Q=ps(Q)}Je=null}else Je=null;We!==null&&hh(Ce,Se,We,Je,!1),Ke!==null&&qt!==null&&hh(Ce,qt,Ke,Je,!0)}}e:{if(Se=le?gs(le):window,We=Se.nodeName&&Se.nodeName.toLowerCase(),We==="select"||We==="input"&&Se.type==="file")var et=$0;else if(Xf(Se))if(Yf)et=Z0;else{et=q0;var at=Y0}else(We=Se.nodeName)&&We.toLowerCase()==="input"&&(Se.type==="checkbox"||Se.type==="radio")&&(et=K0);if(et&&(et=et(n,le))){$f(Ce,et,a,Ee);break e}at&&at(n,Se,le),n==="focusout"&&(at=Se._wrapperState)&&at.controlled&&Se.type==="number"&&L(Se,"number",Se.value)}switch(at=le?gs(le):window,n){case"focusin":(Xf(at)||at.contentEditable==="true")&&(fs=at,kc=le,Co=null);break;case"focusout":Co=kc=fs=null;break;case"mousedown":zc=!0;break;case"contextmenu":case"mouseup":case"dragend":zc=!1,nh(Ce,a,Ee);break;case"selectionchange":if(ex)break;case"keydown":case"keyup":nh(Ce,a,Ee)}var lt;if(Uc)e:{switch(n){case"compositionstart":var ut="onCompositionStart";break e;case"compositionend":ut="onCompositionEnd";break e;case"compositionupdate":ut="onCompositionUpdate";break e}ut=void 0}else ds?Wf(n,a)&&(ut="onCompositionEnd"):n==="keydown"&&a.keyCode===229&&(ut="onCompositionStart");ut&&(Hf&&a.locale!=="ko"&&(ds||ut!=="onCompositionStart"?ut==="onCompositionEnd"&&ds&&(lt=Of()):(er=Ee,Cc="value"in er?er.value:er.textContent,ds=!0)),at=Na(le,ut),0<at.length&&(ut=new zf(ut,n,null,a,Ee),Ce.push({event:ut,listeners:at}),lt?ut.data=lt:(lt=jf(a),lt!==null&&(ut.data=lt)))),(lt=V0?G0(n,a):W0(n,a))&&(le=Na(le,"onBeforeInput"),0<le.length&&(Ee=new zf("onBeforeInput","beforeinput",null,a,Ee),Ce.push({event:Ee,listeners:le}),Ee.data=lt))}dh(Ce,i)})}function Lo(n,i,a){return{instance:n,listener:i,currentTarget:a}}function Na(n,i){for(var a=i+"Capture",u=[];n!==null;){var m=n,_=m.stateNode;m.tag===5&&_!==null&&(m=_,_=yt(n,a),_!=null&&u.unshift(Lo(n,_,m)),_=yt(n,i),_!=null&&u.push(Lo(n,_,m))),n=n.return}return u}function ps(n){if(n===null)return null;do n=n.return;while(n&&n.tag!==5);return n||null}function hh(n,i,a,u,m){for(var _=i._reactName,T=[];a!==null&&a!==u;){var k=a,G=k.alternate,le=k.stateNode;if(G!==null&&G===u)break;k.tag===5&&le!==null&&(k=le,m?(G=yt(a,_),G!=null&&T.unshift(Lo(a,G,k))):m||(G=yt(a,_),G!=null&&T.push(Lo(a,G,k)))),a=a.return}T.length!==0&&n.push({event:i,listeners:T})}var rx=/\r\n?/g,sx=/\u0000|\uFFFD/g;function ph(n){return(typeof n=="string"?n:""+n).replace(rx,`
`).replace(sx,"")}function Da(n,i,a){if(i=ph(i),ph(n)!==i&&a)throw Error(t(425))}function Ua(){}var jc=null,Xc=null;function $c(n,i){return n==="textarea"||n==="noscript"||typeof i.children=="string"||typeof i.children=="number"||typeof i.dangerouslySetInnerHTML=="object"&&i.dangerouslySetInnerHTML!==null&&i.dangerouslySetInnerHTML.__html!=null}var Yc=typeof setTimeout=="function"?setTimeout:void 0,ox=typeof clearTimeout=="function"?clearTimeout:void 0,mh=typeof Promise=="function"?Promise:void 0,ax=typeof queueMicrotask=="function"?queueMicrotask:typeof mh<"u"?function(n){return mh.resolve(null).then(n).catch(lx)}:Yc;function lx(n){setTimeout(function(){throw n})}function qc(n,i){var a=i,u=0;do{var m=a.nextSibling;if(n.removeChild(a),m&&m.nodeType===8)if(a=m.data,a==="/$"){if(u===0){n.removeChild(m),So(i);return}u--}else a!=="$"&&a!=="$?"&&a!=="$!"||u++;a=m}while(a);So(i)}function nr(n){for(;n!=null;n=n.nextSibling){var i=n.nodeType;if(i===1||i===3)break;if(i===8){if(i=n.data,i==="$"||i==="$!"||i==="$?")break;if(i==="/$")return null}}return n}function gh(n){n=n.previousSibling;for(var i=0;n;){if(n.nodeType===8){var a=n.data;if(a==="$"||a==="$!"||a==="$?"){if(i===0)return n;i--}else a==="/$"&&i++}n=n.previousSibling}return null}var ms=Math.random().toString(36).slice(2),xi="__reactFiber$"+ms,No="__reactProps$"+ms,Pi="__reactContainer$"+ms,Kc="__reactEvents$"+ms,cx="__reactListeners$"+ms,ux="__reactHandles$"+ms;function Ir(n){var i=n[xi];if(i)return i;for(var a=n.parentNode;a;){if(i=a[Pi]||a[xi]){if(a=i.alternate,i.child!==null||a!==null&&a.child!==null)for(n=gh(n);n!==null;){if(a=n[xi])return a;n=gh(n)}return i}n=a,a=n.parentNode}return null}function Do(n){return n=n[xi]||n[Pi],!n||n.tag!==5&&n.tag!==6&&n.tag!==13&&n.tag!==3?null:n}function gs(n){if(n.tag===5||n.tag===6)return n.stateNode;throw Error(t(33))}function Ia(n){return n[No]||null}var Zc=[],vs=-1;function ir(n){return{current:n}}function It(n){0>vs||(n.current=Zc[vs],Zc[vs]=null,vs--)}function Dt(n,i){vs++,Zc[vs]=n.current,n.current=i}var rr={},mn=ir(rr),Nn=ir(!1),Or=rr;function xs(n,i){var a=n.type.contextTypes;if(!a)return rr;var u=n.stateNode;if(u&&u.__reactInternalMemoizedUnmaskedChildContext===i)return u.__reactInternalMemoizedMaskedChildContext;var m={},_;for(_ in a)m[_]=i[_];return u&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=i,n.__reactInternalMemoizedMaskedChildContext=m),m}function Dn(n){return n=n.childContextTypes,n!=null}function Oa(){It(Nn),It(mn)}function vh(n,i,a){if(mn.current!==rr)throw Error(t(168));Dt(mn,i),Dt(Nn,a)}function xh(n,i,a){var u=n.stateNode;if(i=i.childContextTypes,typeof u.getChildContext!="function")return a;u=u.getChildContext();for(var m in u)if(!(m in i))throw Error(t(108,Ae(n)||"Unknown",m));return Y({},a,u)}function Fa(n){return n=(n=n.stateNode)&&n.__reactInternalMemoizedMergedChildContext||rr,Or=mn.current,Dt(mn,n),Dt(Nn,Nn.current),!0}function _h(n,i,a){var u=n.stateNode;if(!u)throw Error(t(169));a?(n=xh(n,i,Or),u.__reactInternalMemoizedMergedChildContext=n,It(Nn),It(mn),Dt(mn,n)):It(Nn),Dt(Nn,a)}var Li=null,ka=!1,Jc=!1;function yh(n){Li===null?Li=[n]:Li.push(n)}function dx(n){ka=!0,yh(n)}function sr(){if(!Jc&&Li!==null){Jc=!0;var n=0,i=Pt;try{var a=Li;for(Pt=1;n<a.length;n++){var u=a[n];do u=u(!0);while(u!==null)}Li=null,ka=!1}catch(m){throw Li!==null&&(Li=Li.slice(n+1)),ce(ft,sr),m}finally{Pt=i,Jc=!1}}return null}var _s=[],ys=0,za=null,Ba=0,qn=[],Kn=0,Fr=null,Ni=1,Di="";function kr(n,i){_s[ys++]=Ba,_s[ys++]=za,za=n,Ba=i}function Sh(n,i,a){qn[Kn++]=Ni,qn[Kn++]=Di,qn[Kn++]=Fr,Fr=n;var u=Ni;n=Di;var m=32-En(u)-1;u&=~(1<<m),a+=1;var _=32-En(i)+m;if(30<_){var T=m-m%5;_=(u&(1<<T)-1).toString(32),u>>=T,m-=T,Ni=1<<32-En(i)+m|a<<m|u,Di=_+n}else Ni=1<<_|a<<m|u,Di=n}function Qc(n){n.return!==null&&(kr(n,1),Sh(n,1,0))}function eu(n){for(;n===za;)za=_s[--ys],_s[ys]=null,Ba=_s[--ys],_s[ys]=null;for(;n===Fr;)Fr=qn[--Kn],qn[Kn]=null,Di=qn[--Kn],qn[Kn]=null,Ni=qn[--Kn],qn[Kn]=null}var Hn=null,Vn=null,zt=!1,oi=null;function Mh(n,i){var a=ei(5,null,null,0);a.elementType="DELETED",a.stateNode=i,a.return=n,i=n.deletions,i===null?(n.deletions=[a],n.flags|=16):i.push(a)}function Eh(n,i){switch(n.tag){case 5:var a=n.type;return i=i.nodeType!==1||a.toLowerCase()!==i.nodeName.toLowerCase()?null:i,i!==null?(n.stateNode=i,Hn=n,Vn=nr(i.firstChild),!0):!1;case 6:return i=n.pendingProps===""||i.nodeType!==3?null:i,i!==null?(n.stateNode=i,Hn=n,Vn=null,!0):!1;case 13:return i=i.nodeType!==8?null:i,i!==null?(a=Fr!==null?{id:Ni,overflow:Di}:null,n.memoizedState={dehydrated:i,treeContext:a,retryLane:1073741824},a=ei(18,null,null,0),a.stateNode=i,a.return=n,n.child=a,Hn=n,Vn=null,!0):!1;default:return!1}}function tu(n){return(n.mode&1)!==0&&(n.flags&128)===0}function nu(n){if(zt){var i=Vn;if(i){var a=i;if(!Eh(n,i)){if(tu(n))throw Error(t(418));i=nr(a.nextSibling);var u=Hn;i&&Eh(n,i)?Mh(u,a):(n.flags=n.flags&-4097|2,zt=!1,Hn=n)}}else{if(tu(n))throw Error(t(418));n.flags=n.flags&-4097|2,zt=!1,Hn=n}}}function wh(n){for(n=n.return;n!==null&&n.tag!==5&&n.tag!==3&&n.tag!==13;)n=n.return;Hn=n}function Ha(n){if(n!==Hn)return!1;if(!zt)return wh(n),zt=!0,!1;var i;if((i=n.tag!==3)&&!(i=n.tag!==5)&&(i=n.type,i=i!=="head"&&i!=="body"&&!$c(n.type,n.memoizedProps)),i&&(i=Vn)){if(tu(n))throw Th(),Error(t(418));for(;i;)Mh(n,i),i=nr(i.nextSibling)}if(wh(n),n.tag===13){if(n=n.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(t(317));e:{for(n=n.nextSibling,i=0;n;){if(n.nodeType===8){var a=n.data;if(a==="/$"){if(i===0){Vn=nr(n.nextSibling);break e}i--}else a!=="$"&&a!=="$!"&&a!=="$?"||i++}n=n.nextSibling}Vn=null}}else Vn=Hn?nr(n.stateNode.nextSibling):null;return!0}function Th(){for(var n=Vn;n;)n=nr(n.nextSibling)}function Ss(){Vn=Hn=null,zt=!1}function iu(n){oi===null?oi=[n]:oi.push(n)}var fx=P.ReactCurrentBatchConfig;function Uo(n,i,a){if(n=a.ref,n!==null&&typeof n!="function"&&typeof n!="object"){if(a._owner){if(a=a._owner,a){if(a.tag!==1)throw Error(t(309));var u=a.stateNode}if(!u)throw Error(t(147,n));var m=u,_=""+n;return i!==null&&i.ref!==null&&typeof i.ref=="function"&&i.ref._stringRef===_?i.ref:(i=function(T){var k=m.refs;T===null?delete k[_]:k[_]=T},i._stringRef=_,i)}if(typeof n!="string")throw Error(t(284));if(!a._owner)throw Error(t(290,n))}return n}function Va(n,i){throw n=Object.prototype.toString.call(i),Error(t(31,n==="[object Object]"?"object with keys {"+Object.keys(i).join(", ")+"}":n))}function Ah(n){var i=n._init;return i(n._payload)}function bh(n){function i(Q,j){if(n){var ie=Q.deletions;ie===null?(Q.deletions=[j],Q.flags|=16):ie.push(j)}}function a(Q,j){if(!n)return null;for(;j!==null;)i(Q,j),j=j.sibling;return null}function u(Q,j){for(Q=new Map;j!==null;)j.key!==null?Q.set(j.key,j):Q.set(j.index,j),j=j.sibling;return Q}function m(Q,j){return Q=hr(Q,j),Q.index=0,Q.sibling=null,Q}function _(Q,j,ie){return Q.index=ie,n?(ie=Q.alternate,ie!==null?(ie=ie.index,ie<j?(Q.flags|=2,j):ie):(Q.flags|=2,j)):(Q.flags|=1048576,j)}function T(Q){return n&&Q.alternate===null&&(Q.flags|=2),Q}function k(Q,j,ie,De){return j===null||j.tag!==6?(j=Yu(ie,Q.mode,De),j.return=Q,j):(j=m(j,ie),j.return=Q,j)}function G(Q,j,ie,De){var et=ie.type;return et===I?Ee(Q,j,ie.props.children,De,ie.key):j!==null&&(j.elementType===et||typeof et=="object"&&et!==null&&et.$$typeof===J&&Ah(et)===j.type)?(De=m(j,ie.props),De.ref=Uo(Q,j,ie),De.return=Q,De):(De=fl(ie.type,ie.key,ie.props,null,Q.mode,De),De.ref=Uo(Q,j,ie),De.return=Q,De)}function le(Q,j,ie,De){return j===null||j.tag!==4||j.stateNode.containerInfo!==ie.containerInfo||j.stateNode.implementation!==ie.implementation?(j=qu(ie,Q.mode,De),j.return=Q,j):(j=m(j,ie.children||[]),j.return=Q,j)}function Ee(Q,j,ie,De,et){return j===null||j.tag!==7?(j=Xr(ie,Q.mode,De,et),j.return=Q,j):(j=m(j,ie),j.return=Q,j)}function Ce(Q,j,ie){if(typeof j=="string"&&j!==""||typeof j=="number")return j=Yu(""+j,Q.mode,ie),j.return=Q,j;if(typeof j=="object"&&j!==null){switch(j.$$typeof){case B:return ie=fl(j.type,j.key,j.props,null,Q.mode,ie),ie.ref=Uo(Q,null,j),ie.return=Q,ie;case U:return j=qu(j,Q.mode,ie),j.return=Q,j;case J:var De=j._init;return Ce(Q,De(j._payload),ie)}if(C(j)||Z(j))return j=Xr(j,Q.mode,ie,null),j.return=Q,j;Va(Q,j)}return null}function Se(Q,j,ie,De){var et=j!==null?j.key:null;if(typeof ie=="string"&&ie!==""||typeof ie=="number")return et!==null?null:k(Q,j,""+ie,De);if(typeof ie=="object"&&ie!==null){switch(ie.$$typeof){case B:return ie.key===et?G(Q,j,ie,De):null;case U:return ie.key===et?le(Q,j,ie,De):null;case J:return et=ie._init,Se(Q,j,et(ie._payload),De)}if(C(ie)||Z(ie))return et!==null?null:Ee(Q,j,ie,De,null);Va(Q,ie)}return null}function We(Q,j,ie,De,et){if(typeof De=="string"&&De!==""||typeof De=="number")return Q=Q.get(ie)||null,k(j,Q,""+De,et);if(typeof De=="object"&&De!==null){switch(De.$$typeof){case B:return Q=Q.get(De.key===null?ie:De.key)||null,G(j,Q,De,et);case U:return Q=Q.get(De.key===null?ie:De.key)||null,le(j,Q,De,et);case J:var at=De._init;return We(Q,j,ie,at(De._payload),et)}if(C(De)||Z(De))return Q=Q.get(ie)||null,Ee(j,Q,De,et,null);Va(j,De)}return null}function Ke(Q,j,ie,De){for(var et=null,at=null,lt=j,ut=j=0,cn=null;lt!==null&&ut<ie.length;ut++){lt.index>ut?(cn=lt,lt=null):cn=lt.sibling;var Ct=Se(Q,lt,ie[ut],De);if(Ct===null){lt===null&&(lt=cn);break}n&&lt&&Ct.alternate===null&&i(Q,lt),j=_(Ct,j,ut),at===null?et=Ct:at.sibling=Ct,at=Ct,lt=cn}if(ut===ie.length)return a(Q,lt),zt&&kr(Q,ut),et;if(lt===null){for(;ut<ie.length;ut++)lt=Ce(Q,ie[ut],De),lt!==null&&(j=_(lt,j,ut),at===null?et=lt:at.sibling=lt,at=lt);return zt&&kr(Q,ut),et}for(lt=u(Q,lt);ut<ie.length;ut++)cn=We(lt,Q,ut,ie[ut],De),cn!==null&&(n&&cn.alternate!==null&&lt.delete(cn.key===null?ut:cn.key),j=_(cn,j,ut),at===null?et=cn:at.sibling=cn,at=cn);return n&&lt.forEach(function(pr){return i(Q,pr)}),zt&&kr(Q,ut),et}function Je(Q,j,ie,De){var et=Z(ie);if(typeof et!="function")throw Error(t(150));if(ie=et.call(ie),ie==null)throw Error(t(151));for(var at=et=null,lt=j,ut=j=0,cn=null,Ct=ie.next();lt!==null&&!Ct.done;ut++,Ct=ie.next()){lt.index>ut?(cn=lt,lt=null):cn=lt.sibling;var pr=Se(Q,lt,Ct.value,De);if(pr===null){lt===null&&(lt=cn);break}n&&lt&&pr.alternate===null&&i(Q,lt),j=_(pr,j,ut),at===null?et=pr:at.sibling=pr,at=pr,lt=cn}if(Ct.done)return a(Q,lt),zt&&kr(Q,ut),et;if(lt===null){for(;!Ct.done;ut++,Ct=ie.next())Ct=Ce(Q,Ct.value,De),Ct!==null&&(j=_(Ct,j,ut),at===null?et=Ct:at.sibling=Ct,at=Ct);return zt&&kr(Q,ut),et}for(lt=u(Q,lt);!Ct.done;ut++,Ct=ie.next())Ct=We(lt,Q,ut,Ct.value,De),Ct!==null&&(n&&Ct.alternate!==null&&lt.delete(Ct.key===null?ut:Ct.key),j=_(Ct,j,ut),at===null?et=Ct:at.sibling=Ct,at=Ct);return n&&lt.forEach(function(jx){return i(Q,jx)}),zt&&kr(Q,ut),et}function qt(Q,j,ie,De){if(typeof ie=="object"&&ie!==null&&ie.type===I&&ie.key===null&&(ie=ie.props.children),typeof ie=="object"&&ie!==null){switch(ie.$$typeof){case B:e:{for(var et=ie.key,at=j;at!==null;){if(at.key===et){if(et=ie.type,et===I){if(at.tag===7){a(Q,at.sibling),j=m(at,ie.props.children),j.return=Q,Q=j;break e}}else if(at.elementType===et||typeof et=="object"&&et!==null&&et.$$typeof===J&&Ah(et)===at.type){a(Q,at.sibling),j=m(at,ie.props),j.ref=Uo(Q,at,ie),j.return=Q,Q=j;break e}a(Q,at);break}else i(Q,at);at=at.sibling}ie.type===I?(j=Xr(ie.props.children,Q.mode,De,ie.key),j.return=Q,Q=j):(De=fl(ie.type,ie.key,ie.props,null,Q.mode,De),De.ref=Uo(Q,j,ie),De.return=Q,Q=De)}return T(Q);case U:e:{for(at=ie.key;j!==null;){if(j.key===at)if(j.tag===4&&j.stateNode.containerInfo===ie.containerInfo&&j.stateNode.implementation===ie.implementation){a(Q,j.sibling),j=m(j,ie.children||[]),j.return=Q,Q=j;break e}else{a(Q,j);break}else i(Q,j);j=j.sibling}j=qu(ie,Q.mode,De),j.return=Q,Q=j}return T(Q);case J:return at=ie._init,qt(Q,j,at(ie._payload),De)}if(C(ie))return Ke(Q,j,ie,De);if(Z(ie))return Je(Q,j,ie,De);Va(Q,ie)}return typeof ie=="string"&&ie!==""||typeof ie=="number"?(ie=""+ie,j!==null&&j.tag===6?(a(Q,j.sibling),j=m(j,ie),j.return=Q,Q=j):(a(Q,j),j=Yu(ie,Q.mode,De),j.return=Q,Q=j),T(Q)):a(Q,j)}return qt}var Ms=bh(!0),Ch=bh(!1),Ga=ir(null),Wa=null,Es=null,ru=null;function su(){ru=Es=Wa=null}function ou(n){var i=Ga.current;It(Ga),n._currentValue=i}function au(n,i,a){for(;n!==null;){var u=n.alternate;if((n.childLanes&i)!==i?(n.childLanes|=i,u!==null&&(u.childLanes|=i)):u!==null&&(u.childLanes&i)!==i&&(u.childLanes|=i),n===a)break;n=n.return}}function ws(n,i){Wa=n,ru=Es=null,n=n.dependencies,n!==null&&n.firstContext!==null&&(n.lanes&i&&(Un=!0),n.firstContext=null)}function Zn(n){var i=n._currentValue;if(ru!==n)if(n={context:n,memoizedValue:i,next:null},Es===null){if(Wa===null)throw Error(t(308));Es=n,Wa.dependencies={lanes:0,firstContext:n}}else Es=Es.next=n;return i}var zr=null;function lu(n){zr===null?zr=[n]:zr.push(n)}function Rh(n,i,a,u){var m=i.interleaved;return m===null?(a.next=a,lu(i)):(a.next=m.next,m.next=a),i.interleaved=a,Ui(n,u)}function Ui(n,i){n.lanes|=i;var a=n.alternate;for(a!==null&&(a.lanes|=i),a=n,n=n.return;n!==null;)n.childLanes|=i,a=n.alternate,a!==null&&(a.childLanes|=i),a=n,n=n.return;return a.tag===3?a.stateNode:null}var or=!1;function cu(n){n.updateQueue={baseState:n.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Ph(n,i){n=n.updateQueue,i.updateQueue===n&&(i.updateQueue={baseState:n.baseState,firstBaseUpdate:n.firstBaseUpdate,lastBaseUpdate:n.lastBaseUpdate,shared:n.shared,effects:n.effects})}function Ii(n,i){return{eventTime:n,lane:i,tag:0,payload:null,callback:null,next:null}}function ar(n,i,a){var u=n.updateQueue;if(u===null)return null;if(u=u.shared,bt&2){var m=u.pending;return m===null?i.next=i:(i.next=m.next,m.next=i),u.pending=i,Ui(n,a)}return m=u.interleaved,m===null?(i.next=i,lu(u)):(i.next=m.next,m.next=i),u.interleaved=i,Ui(n,a)}function ja(n,i,a){if(i=i.updateQueue,i!==null&&(i=i.shared,(a&4194240)!==0)){var u=i.lanes;u&=n.pendingLanes,a|=u,i.lanes=a,Ec(n,a)}}function Lh(n,i){var a=n.updateQueue,u=n.alternate;if(u!==null&&(u=u.updateQueue,a===u)){var m=null,_=null;if(a=a.firstBaseUpdate,a!==null){do{var T={eventTime:a.eventTime,lane:a.lane,tag:a.tag,payload:a.payload,callback:a.callback,next:null};_===null?m=_=T:_=_.next=T,a=a.next}while(a!==null);_===null?m=_=i:_=_.next=i}else m=_=i;a={baseState:u.baseState,firstBaseUpdate:m,lastBaseUpdate:_,shared:u.shared,effects:u.effects},n.updateQueue=a;return}n=a.lastBaseUpdate,n===null?a.firstBaseUpdate=i:n.next=i,a.lastBaseUpdate=i}function Xa(n,i,a,u){var m=n.updateQueue;or=!1;var _=m.firstBaseUpdate,T=m.lastBaseUpdate,k=m.shared.pending;if(k!==null){m.shared.pending=null;var G=k,le=G.next;G.next=null,T===null?_=le:T.next=le,T=G;var Ee=n.alternate;Ee!==null&&(Ee=Ee.updateQueue,k=Ee.lastBaseUpdate,k!==T&&(k===null?Ee.firstBaseUpdate=le:k.next=le,Ee.lastBaseUpdate=G))}if(_!==null){var Ce=m.baseState;T=0,Ee=le=G=null,k=_;do{var Se=k.lane,We=k.eventTime;if((u&Se)===Se){Ee!==null&&(Ee=Ee.next={eventTime:We,lane:0,tag:k.tag,payload:k.payload,callback:k.callback,next:null});e:{var Ke=n,Je=k;switch(Se=i,We=a,Je.tag){case 1:if(Ke=Je.payload,typeof Ke=="function"){Ce=Ke.call(We,Ce,Se);break e}Ce=Ke;break e;case 3:Ke.flags=Ke.flags&-65537|128;case 0:if(Ke=Je.payload,Se=typeof Ke=="function"?Ke.call(We,Ce,Se):Ke,Se==null)break e;Ce=Y({},Ce,Se);break e;case 2:or=!0}}k.callback!==null&&k.lane!==0&&(n.flags|=64,Se=m.effects,Se===null?m.effects=[k]:Se.push(k))}else We={eventTime:We,lane:Se,tag:k.tag,payload:k.payload,callback:k.callback,next:null},Ee===null?(le=Ee=We,G=Ce):Ee=Ee.next=We,T|=Se;if(k=k.next,k===null){if(k=m.shared.pending,k===null)break;Se=k,k=Se.next,Se.next=null,m.lastBaseUpdate=Se,m.shared.pending=null}}while(!0);if(Ee===null&&(G=Ce),m.baseState=G,m.firstBaseUpdate=le,m.lastBaseUpdate=Ee,i=m.shared.interleaved,i!==null){m=i;do T|=m.lane,m=m.next;while(m!==i)}else _===null&&(m.shared.lanes=0);Vr|=T,n.lanes=T,n.memoizedState=Ce}}function Nh(n,i,a){if(n=i.effects,i.effects=null,n!==null)for(i=0;i<n.length;i++){var u=n[i],m=u.callback;if(m!==null){if(u.callback=null,u=a,typeof m!="function")throw Error(t(191,m));m.call(u)}}}var Io={},_i=ir(Io),Oo=ir(Io),Fo=ir(Io);function Br(n){if(n===Io)throw Error(t(174));return n}function uu(n,i){switch(Dt(Fo,i),Dt(Oo,n),Dt(_i,Io),n=i.nodeType,n){case 9:case 11:i=(i=i.documentElement)?i.namespaceURI:He(null,"");break;default:n=n===8?i.parentNode:i,i=n.namespaceURI||null,n=n.tagName,i=He(i,n)}It(_i),Dt(_i,i)}function Ts(){It(_i),It(Oo),It(Fo)}function Dh(n){Br(Fo.current);var i=Br(_i.current),a=He(i,n.type);i!==a&&(Dt(Oo,n),Dt(_i,a))}function du(n){Oo.current===n&&(It(_i),It(Oo))}var Vt=ir(0);function $a(n){for(var i=n;i!==null;){if(i.tag===13){var a=i.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||a.data==="$?"||a.data==="$!"))return i}else if(i.tag===19&&i.memoizedProps.revealOrder!==void 0){if(i.flags&128)return i}else if(i.child!==null){i.child.return=i,i=i.child;continue}if(i===n)break;for(;i.sibling===null;){if(i.return===null||i.return===n)return null;i=i.return}i.sibling.return=i.return,i=i.sibling}return null}var fu=[];function hu(){for(var n=0;n<fu.length;n++)fu[n]._workInProgressVersionPrimary=null;fu.length=0}var Ya=P.ReactCurrentDispatcher,pu=P.ReactCurrentBatchConfig,Hr=0,Gt=null,Qt=null,an=null,qa=!1,ko=!1,zo=0,hx=0;function gn(){throw Error(t(321))}function mu(n,i){if(i===null)return!1;for(var a=0;a<i.length&&a<n.length;a++)if(!si(n[a],i[a]))return!1;return!0}function gu(n,i,a,u,m,_){if(Hr=_,Gt=i,i.memoizedState=null,i.updateQueue=null,i.lanes=0,Ya.current=n===null||n.memoizedState===null?vx:xx,n=a(u,m),ko){_=0;do{if(ko=!1,zo=0,25<=_)throw Error(t(301));_+=1,an=Qt=null,i.updateQueue=null,Ya.current=_x,n=a(u,m)}while(ko)}if(Ya.current=Ja,i=Qt!==null&&Qt.next!==null,Hr=0,an=Qt=Gt=null,qa=!1,i)throw Error(t(300));return n}function vu(){var n=zo!==0;return zo=0,n}function yi(){var n={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return an===null?Gt.memoizedState=an=n:an=an.next=n,an}function Jn(){if(Qt===null){var n=Gt.alternate;n=n!==null?n.memoizedState:null}else n=Qt.next;var i=an===null?Gt.memoizedState:an.next;if(i!==null)an=i,Qt=n;else{if(n===null)throw Error(t(310));Qt=n,n={memoizedState:Qt.memoizedState,baseState:Qt.baseState,baseQueue:Qt.baseQueue,queue:Qt.queue,next:null},an===null?Gt.memoizedState=an=n:an=an.next=n}return an}function Bo(n,i){return typeof i=="function"?i(n):i}function xu(n){var i=Jn(),a=i.queue;if(a===null)throw Error(t(311));a.lastRenderedReducer=n;var u=Qt,m=u.baseQueue,_=a.pending;if(_!==null){if(m!==null){var T=m.next;m.next=_.next,_.next=T}u.baseQueue=m=_,a.pending=null}if(m!==null){_=m.next,u=u.baseState;var k=T=null,G=null,le=_;do{var Ee=le.lane;if((Hr&Ee)===Ee)G!==null&&(G=G.next={lane:0,action:le.action,hasEagerState:le.hasEagerState,eagerState:le.eagerState,next:null}),u=le.hasEagerState?le.eagerState:n(u,le.action);else{var Ce={lane:Ee,action:le.action,hasEagerState:le.hasEagerState,eagerState:le.eagerState,next:null};G===null?(k=G=Ce,T=u):G=G.next=Ce,Gt.lanes|=Ee,Vr|=Ee}le=le.next}while(le!==null&&le!==_);G===null?T=u:G.next=k,si(u,i.memoizedState)||(Un=!0),i.memoizedState=u,i.baseState=T,i.baseQueue=G,a.lastRenderedState=u}if(n=a.interleaved,n!==null){m=n;do _=m.lane,Gt.lanes|=_,Vr|=_,m=m.next;while(m!==n)}else m===null&&(a.lanes=0);return[i.memoizedState,a.dispatch]}function _u(n){var i=Jn(),a=i.queue;if(a===null)throw Error(t(311));a.lastRenderedReducer=n;var u=a.dispatch,m=a.pending,_=i.memoizedState;if(m!==null){a.pending=null;var T=m=m.next;do _=n(_,T.action),T=T.next;while(T!==m);si(_,i.memoizedState)||(Un=!0),i.memoizedState=_,i.baseQueue===null&&(i.baseState=_),a.lastRenderedState=_}return[_,u]}function Uh(){}function Ih(n,i){var a=Gt,u=Jn(),m=i(),_=!si(u.memoizedState,m);if(_&&(u.memoizedState=m,Un=!0),u=u.queue,yu(kh.bind(null,a,u,n),[n]),u.getSnapshot!==i||_||an!==null&&an.memoizedState.tag&1){if(a.flags|=2048,Ho(9,Fh.bind(null,a,u,m,i),void 0,null),ln===null)throw Error(t(349));Hr&30||Oh(a,i,m)}return m}function Oh(n,i,a){n.flags|=16384,n={getSnapshot:i,value:a},i=Gt.updateQueue,i===null?(i={lastEffect:null,stores:null},Gt.updateQueue=i,i.stores=[n]):(a=i.stores,a===null?i.stores=[n]:a.push(n))}function Fh(n,i,a,u){i.value=a,i.getSnapshot=u,zh(i)&&Bh(n)}function kh(n,i,a){return a(function(){zh(i)&&Bh(n)})}function zh(n){var i=n.getSnapshot;n=n.value;try{var a=i();return!si(n,a)}catch{return!0}}function Bh(n){var i=Ui(n,1);i!==null&&ui(i,n,1,-1)}function Hh(n){var i=yi();return typeof n=="function"&&(n=n()),i.memoizedState=i.baseState=n,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Bo,lastRenderedState:n},i.queue=n,n=n.dispatch=gx.bind(null,Gt,n),[i.memoizedState,n]}function Ho(n,i,a,u){return n={tag:n,create:i,destroy:a,deps:u,next:null},i=Gt.updateQueue,i===null?(i={lastEffect:null,stores:null},Gt.updateQueue=i,i.lastEffect=n.next=n):(a=i.lastEffect,a===null?i.lastEffect=n.next=n:(u=a.next,a.next=n,n.next=u,i.lastEffect=n)),n}function Vh(){return Jn().memoizedState}function Ka(n,i,a,u){var m=yi();Gt.flags|=n,m.memoizedState=Ho(1|i,a,void 0,u===void 0?null:u)}function Za(n,i,a,u){var m=Jn();u=u===void 0?null:u;var _=void 0;if(Qt!==null){var T=Qt.memoizedState;if(_=T.destroy,u!==null&&mu(u,T.deps)){m.memoizedState=Ho(i,a,_,u);return}}Gt.flags|=n,m.memoizedState=Ho(1|i,a,_,u)}function Gh(n,i){return Ka(8390656,8,n,i)}function yu(n,i){return Za(2048,8,n,i)}function Wh(n,i){return Za(4,2,n,i)}function jh(n,i){return Za(4,4,n,i)}function Xh(n,i){if(typeof i=="function")return n=n(),i(n),function(){i(null)};if(i!=null)return n=n(),i.current=n,function(){i.current=null}}function $h(n,i,a){return a=a!=null?a.concat([n]):null,Za(4,4,Xh.bind(null,i,n),a)}function Su(){}function Yh(n,i){var a=Jn();i=i===void 0?null:i;var u=a.memoizedState;return u!==null&&i!==null&&mu(i,u[1])?u[0]:(a.memoizedState=[n,i],n)}function qh(n,i){var a=Jn();i=i===void 0?null:i;var u=a.memoizedState;return u!==null&&i!==null&&mu(i,u[1])?u[0]:(n=n(),a.memoizedState=[n,i],n)}function Kh(n,i,a){return Hr&21?(si(a,i)||(a=_a(),Gt.lanes|=a,Vr|=a,n.baseState=!0),i):(n.baseState&&(n.baseState=!1,Un=!0),n.memoizedState=a)}function px(n,i){var a=Pt;Pt=a!==0&&4>a?a:4,n(!0);var u=pu.transition;pu.transition={};try{n(!1),i()}finally{Pt=a,pu.transition=u}}function Zh(){return Jn().memoizedState}function mx(n,i,a){var u=dr(n);if(a={lane:u,action:a,hasEagerState:!1,eagerState:null,next:null},Jh(n))Qh(i,a);else if(a=Rh(n,i,a,u),a!==null){var m=Tn();ui(a,n,u,m),ep(a,i,u)}}function gx(n,i,a){var u=dr(n),m={lane:u,action:a,hasEagerState:!1,eagerState:null,next:null};if(Jh(n))Qh(i,m);else{var _=n.alternate;if(n.lanes===0&&(_===null||_.lanes===0)&&(_=i.lastRenderedReducer,_!==null))try{var T=i.lastRenderedState,k=_(T,a);if(m.hasEagerState=!0,m.eagerState=k,si(k,T)){var G=i.interleaved;G===null?(m.next=m,lu(i)):(m.next=G.next,G.next=m),i.interleaved=m;return}}catch{}finally{}a=Rh(n,i,m,u),a!==null&&(m=Tn(),ui(a,n,u,m),ep(a,i,u))}}function Jh(n){var i=n.alternate;return n===Gt||i!==null&&i===Gt}function Qh(n,i){ko=qa=!0;var a=n.pending;a===null?i.next=i:(i.next=a.next,a.next=i),n.pending=i}function ep(n,i,a){if(a&4194240){var u=i.lanes;u&=n.pendingLanes,a|=u,i.lanes=a,Ec(n,a)}}var Ja={readContext:Zn,useCallback:gn,useContext:gn,useEffect:gn,useImperativeHandle:gn,useInsertionEffect:gn,useLayoutEffect:gn,useMemo:gn,useReducer:gn,useRef:gn,useState:gn,useDebugValue:gn,useDeferredValue:gn,useTransition:gn,useMutableSource:gn,useSyncExternalStore:gn,useId:gn,unstable_isNewReconciler:!1},vx={readContext:Zn,useCallback:function(n,i){return yi().memoizedState=[n,i===void 0?null:i],n},useContext:Zn,useEffect:Gh,useImperativeHandle:function(n,i,a){return a=a!=null?a.concat([n]):null,Ka(4194308,4,Xh.bind(null,i,n),a)},useLayoutEffect:function(n,i){return Ka(4194308,4,n,i)},useInsertionEffect:function(n,i){return Ka(4,2,n,i)},useMemo:function(n,i){var a=yi();return i=i===void 0?null:i,n=n(),a.memoizedState=[n,i],n},useReducer:function(n,i,a){var u=yi();return i=a!==void 0?a(i):i,u.memoizedState=u.baseState=i,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:n,lastRenderedState:i},u.queue=n,n=n.dispatch=mx.bind(null,Gt,n),[u.memoizedState,n]},useRef:function(n){var i=yi();return n={current:n},i.memoizedState=n},useState:Hh,useDebugValue:Su,useDeferredValue:function(n){return yi().memoizedState=n},useTransition:function(){var n=Hh(!1),i=n[0];return n=px.bind(null,n[1]),yi().memoizedState=n,[i,n]},useMutableSource:function(){},useSyncExternalStore:function(n,i,a){var u=Gt,m=yi();if(zt){if(a===void 0)throw Error(t(407));a=a()}else{if(a=i(),ln===null)throw Error(t(349));Hr&30||Oh(u,i,a)}m.memoizedState=a;var _={value:a,getSnapshot:i};return m.queue=_,Gh(kh.bind(null,u,_,n),[n]),u.flags|=2048,Ho(9,Fh.bind(null,u,_,a,i),void 0,null),a},useId:function(){var n=yi(),i=ln.identifierPrefix;if(zt){var a=Di,u=Ni;a=(u&~(1<<32-En(u)-1)).toString(32)+a,i=":"+i+"R"+a,a=zo++,0<a&&(i+="H"+a.toString(32)),i+=":"}else a=hx++,i=":"+i+"r"+a.toString(32)+":";return n.memoizedState=i},unstable_isNewReconciler:!1},xx={readContext:Zn,useCallback:Yh,useContext:Zn,useEffect:yu,useImperativeHandle:$h,useInsertionEffect:Wh,useLayoutEffect:jh,useMemo:qh,useReducer:xu,useRef:Vh,useState:function(){return xu(Bo)},useDebugValue:Su,useDeferredValue:function(n){var i=Jn();return Kh(i,Qt.memoizedState,n)},useTransition:function(){var n=xu(Bo)[0],i=Jn().memoizedState;return[n,i]},useMutableSource:Uh,useSyncExternalStore:Ih,useId:Zh,unstable_isNewReconciler:!1},_x={readContext:Zn,useCallback:Yh,useContext:Zn,useEffect:yu,useImperativeHandle:$h,useInsertionEffect:Wh,useLayoutEffect:jh,useMemo:qh,useReducer:_u,useRef:Vh,useState:function(){return _u(Bo)},useDebugValue:Su,useDeferredValue:function(n){var i=Jn();return Qt===null?i.memoizedState=n:Kh(i,Qt.memoizedState,n)},useTransition:function(){var n=_u(Bo)[0],i=Jn().memoizedState;return[n,i]},useMutableSource:Uh,useSyncExternalStore:Ih,useId:Zh,unstable_isNewReconciler:!1};function ai(n,i){if(n&&n.defaultProps){i=Y({},i),n=n.defaultProps;for(var a in n)i[a]===void 0&&(i[a]=n[a]);return i}return i}function Mu(n,i,a,u){i=n.memoizedState,a=a(u,i),a=a==null?i:Y({},i,a),n.memoizedState=a,n.lanes===0&&(n.updateQueue.baseState=a)}var Qa={isMounted:function(n){return(n=n._reactInternals)?Ci(n)===n:!1},enqueueSetState:function(n,i,a){n=n._reactInternals;var u=Tn(),m=dr(n),_=Ii(u,m);_.payload=i,a!=null&&(_.callback=a),i=ar(n,_,m),i!==null&&(ui(i,n,m,u),ja(i,n,m))},enqueueReplaceState:function(n,i,a){n=n._reactInternals;var u=Tn(),m=dr(n),_=Ii(u,m);_.tag=1,_.payload=i,a!=null&&(_.callback=a),i=ar(n,_,m),i!==null&&(ui(i,n,m,u),ja(i,n,m))},enqueueForceUpdate:function(n,i){n=n._reactInternals;var a=Tn(),u=dr(n),m=Ii(a,u);m.tag=2,i!=null&&(m.callback=i),i=ar(n,m,u),i!==null&&(ui(i,n,u,a),ja(i,n,u))}};function tp(n,i,a,u,m,_,T){return n=n.stateNode,typeof n.shouldComponentUpdate=="function"?n.shouldComponentUpdate(u,_,T):i.prototype&&i.prototype.isPureReactComponent?!bo(a,u)||!bo(m,_):!0}function np(n,i,a){var u=!1,m=rr,_=i.contextType;return typeof _=="object"&&_!==null?_=Zn(_):(m=Dn(i)?Or:mn.current,u=i.contextTypes,_=(u=u!=null)?xs(n,m):rr),i=new i(a,_),n.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=Qa,n.stateNode=i,i._reactInternals=n,u&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=m,n.__reactInternalMemoizedMaskedChildContext=_),i}function ip(n,i,a,u){n=i.state,typeof i.componentWillReceiveProps=="function"&&i.componentWillReceiveProps(a,u),typeof i.UNSAFE_componentWillReceiveProps=="function"&&i.UNSAFE_componentWillReceiveProps(a,u),i.state!==n&&Qa.enqueueReplaceState(i,i.state,null)}function Eu(n,i,a,u){var m=n.stateNode;m.props=a,m.state=n.memoizedState,m.refs={},cu(n);var _=i.contextType;typeof _=="object"&&_!==null?m.context=Zn(_):(_=Dn(i)?Or:mn.current,m.context=xs(n,_)),m.state=n.memoizedState,_=i.getDerivedStateFromProps,typeof _=="function"&&(Mu(n,i,_,a),m.state=n.memoizedState),typeof i.getDerivedStateFromProps=="function"||typeof m.getSnapshotBeforeUpdate=="function"||typeof m.UNSAFE_componentWillMount!="function"&&typeof m.componentWillMount!="function"||(i=m.state,typeof m.componentWillMount=="function"&&m.componentWillMount(),typeof m.UNSAFE_componentWillMount=="function"&&m.UNSAFE_componentWillMount(),i!==m.state&&Qa.enqueueReplaceState(m,m.state,null),Xa(n,a,m,u),m.state=n.memoizedState),typeof m.componentDidMount=="function"&&(n.flags|=4194308)}function As(n,i){try{var a="",u=i;do a+=ve(u),u=u.return;while(u);var m=a}catch(_){m=`
Error generating stack: `+_.message+`
`+_.stack}return{value:n,source:i,stack:m,digest:null}}function wu(n,i,a){return{value:n,source:null,stack:a??null,digest:i??null}}function Tu(n,i){try{console.error(i.value)}catch(a){setTimeout(function(){throw a})}}var yx=typeof WeakMap=="function"?WeakMap:Map;function rp(n,i,a){a=Ii(-1,a),a.tag=3,a.payload={element:null};var u=i.value;return a.callback=function(){ol||(ol=!0,Bu=u),Tu(n,i)},a}function sp(n,i,a){a=Ii(-1,a),a.tag=3;var u=n.type.getDerivedStateFromError;if(typeof u=="function"){var m=i.value;a.payload=function(){return u(m)},a.callback=function(){Tu(n,i)}}var _=n.stateNode;return _!==null&&typeof _.componentDidCatch=="function"&&(a.callback=function(){Tu(n,i),typeof u!="function"&&(cr===null?cr=new Set([this]):cr.add(this));var T=i.stack;this.componentDidCatch(i.value,{componentStack:T!==null?T:""})}),a}function op(n,i,a){var u=n.pingCache;if(u===null){u=n.pingCache=new yx;var m=new Set;u.set(i,m)}else m=u.get(i),m===void 0&&(m=new Set,u.set(i,m));m.has(a)||(m.add(a),n=Ux.bind(null,n,i,a),i.then(n,n))}function ap(n){do{var i;if((i=n.tag===13)&&(i=n.memoizedState,i=i!==null?i.dehydrated!==null:!0),i)return n;n=n.return}while(n!==null);return null}function lp(n,i,a,u,m){return n.mode&1?(n.flags|=65536,n.lanes=m,n):(n===i?n.flags|=65536:(n.flags|=128,a.flags|=131072,a.flags&=-52805,a.tag===1&&(a.alternate===null?a.tag=17:(i=Ii(-1,1),i.tag=2,ar(a,i,1))),a.lanes|=1),n)}var Sx=P.ReactCurrentOwner,Un=!1;function wn(n,i,a,u){i.child=n===null?Ch(i,null,a,u):Ms(i,n.child,a,u)}function cp(n,i,a,u,m){a=a.render;var _=i.ref;return ws(i,m),u=gu(n,i,a,u,_,m),a=vu(),n!==null&&!Un?(i.updateQueue=n.updateQueue,i.flags&=-2053,n.lanes&=~m,Oi(n,i,m)):(zt&&a&&Qc(i),i.flags|=1,wn(n,i,u,m),i.child)}function up(n,i,a,u,m){if(n===null){var _=a.type;return typeof _=="function"&&!$u(_)&&_.defaultProps===void 0&&a.compare===null&&a.defaultProps===void 0?(i.tag=15,i.type=_,dp(n,i,_,u,m)):(n=fl(a.type,null,u,i,i.mode,m),n.ref=i.ref,n.return=i,i.child=n)}if(_=n.child,!(n.lanes&m)){var T=_.memoizedProps;if(a=a.compare,a=a!==null?a:bo,a(T,u)&&n.ref===i.ref)return Oi(n,i,m)}return i.flags|=1,n=hr(_,u),n.ref=i.ref,n.return=i,i.child=n}function dp(n,i,a,u,m){if(n!==null){var _=n.memoizedProps;if(bo(_,u)&&n.ref===i.ref)if(Un=!1,i.pendingProps=u=_,(n.lanes&m)!==0)n.flags&131072&&(Un=!0);else return i.lanes=n.lanes,Oi(n,i,m)}return Au(n,i,a,u,m)}function fp(n,i,a){var u=i.pendingProps,m=u.children,_=n!==null?n.memoizedState:null;if(u.mode==="hidden")if(!(i.mode&1))i.memoizedState={baseLanes:0,cachePool:null,transitions:null},Dt(Cs,Gn),Gn|=a;else{if(!(a&1073741824))return n=_!==null?_.baseLanes|a:a,i.lanes=i.childLanes=1073741824,i.memoizedState={baseLanes:n,cachePool:null,transitions:null},i.updateQueue=null,Dt(Cs,Gn),Gn|=n,null;i.memoizedState={baseLanes:0,cachePool:null,transitions:null},u=_!==null?_.baseLanes:a,Dt(Cs,Gn),Gn|=u}else _!==null?(u=_.baseLanes|a,i.memoizedState=null):u=a,Dt(Cs,Gn),Gn|=u;return wn(n,i,m,a),i.child}function hp(n,i){var a=i.ref;(n===null&&a!==null||n!==null&&n.ref!==a)&&(i.flags|=512,i.flags|=2097152)}function Au(n,i,a,u,m){var _=Dn(a)?Or:mn.current;return _=xs(i,_),ws(i,m),a=gu(n,i,a,u,_,m),u=vu(),n!==null&&!Un?(i.updateQueue=n.updateQueue,i.flags&=-2053,n.lanes&=~m,Oi(n,i,m)):(zt&&u&&Qc(i),i.flags|=1,wn(n,i,a,m),i.child)}function pp(n,i,a,u,m){if(Dn(a)){var _=!0;Fa(i)}else _=!1;if(ws(i,m),i.stateNode===null)tl(n,i),np(i,a,u),Eu(i,a,u,m),u=!0;else if(n===null){var T=i.stateNode,k=i.memoizedProps;T.props=k;var G=T.context,le=a.contextType;typeof le=="object"&&le!==null?le=Zn(le):(le=Dn(a)?Or:mn.current,le=xs(i,le));var Ee=a.getDerivedStateFromProps,Ce=typeof Ee=="function"||typeof T.getSnapshotBeforeUpdate=="function";Ce||typeof T.UNSAFE_componentWillReceiveProps!="function"&&typeof T.componentWillReceiveProps!="function"||(k!==u||G!==le)&&ip(i,T,u,le),or=!1;var Se=i.memoizedState;T.state=Se,Xa(i,u,T,m),G=i.memoizedState,k!==u||Se!==G||Nn.current||or?(typeof Ee=="function"&&(Mu(i,a,Ee,u),G=i.memoizedState),(k=or||tp(i,a,k,u,Se,G,le))?(Ce||typeof T.UNSAFE_componentWillMount!="function"&&typeof T.componentWillMount!="function"||(typeof T.componentWillMount=="function"&&T.componentWillMount(),typeof T.UNSAFE_componentWillMount=="function"&&T.UNSAFE_componentWillMount()),typeof T.componentDidMount=="function"&&(i.flags|=4194308)):(typeof T.componentDidMount=="function"&&(i.flags|=4194308),i.memoizedProps=u,i.memoizedState=G),T.props=u,T.state=G,T.context=le,u=k):(typeof T.componentDidMount=="function"&&(i.flags|=4194308),u=!1)}else{T=i.stateNode,Ph(n,i),k=i.memoizedProps,le=i.type===i.elementType?k:ai(i.type,k),T.props=le,Ce=i.pendingProps,Se=T.context,G=a.contextType,typeof G=="object"&&G!==null?G=Zn(G):(G=Dn(a)?Or:mn.current,G=xs(i,G));var We=a.getDerivedStateFromProps;(Ee=typeof We=="function"||typeof T.getSnapshotBeforeUpdate=="function")||typeof T.UNSAFE_componentWillReceiveProps!="function"&&typeof T.componentWillReceiveProps!="function"||(k!==Ce||Se!==G)&&ip(i,T,u,G),or=!1,Se=i.memoizedState,T.state=Se,Xa(i,u,T,m);var Ke=i.memoizedState;k!==Ce||Se!==Ke||Nn.current||or?(typeof We=="function"&&(Mu(i,a,We,u),Ke=i.memoizedState),(le=or||tp(i,a,le,u,Se,Ke,G)||!1)?(Ee||typeof T.UNSAFE_componentWillUpdate!="function"&&typeof T.componentWillUpdate!="function"||(typeof T.componentWillUpdate=="function"&&T.componentWillUpdate(u,Ke,G),typeof T.UNSAFE_componentWillUpdate=="function"&&T.UNSAFE_componentWillUpdate(u,Ke,G)),typeof T.componentDidUpdate=="function"&&(i.flags|=4),typeof T.getSnapshotBeforeUpdate=="function"&&(i.flags|=1024)):(typeof T.componentDidUpdate!="function"||k===n.memoizedProps&&Se===n.memoizedState||(i.flags|=4),typeof T.getSnapshotBeforeUpdate!="function"||k===n.memoizedProps&&Se===n.memoizedState||(i.flags|=1024),i.memoizedProps=u,i.memoizedState=Ke),T.props=u,T.state=Ke,T.context=G,u=le):(typeof T.componentDidUpdate!="function"||k===n.memoizedProps&&Se===n.memoizedState||(i.flags|=4),typeof T.getSnapshotBeforeUpdate!="function"||k===n.memoizedProps&&Se===n.memoizedState||(i.flags|=1024),u=!1)}return bu(n,i,a,u,_,m)}function bu(n,i,a,u,m,_){hp(n,i);var T=(i.flags&128)!==0;if(!u&&!T)return m&&_h(i,a,!1),Oi(n,i,_);u=i.stateNode,Sx.current=i;var k=T&&typeof a.getDerivedStateFromError!="function"?null:u.render();return i.flags|=1,n!==null&&T?(i.child=Ms(i,n.child,null,_),i.child=Ms(i,null,k,_)):wn(n,i,k,_),i.memoizedState=u.state,m&&_h(i,a,!0),i.child}function mp(n){var i=n.stateNode;i.pendingContext?vh(n,i.pendingContext,i.pendingContext!==i.context):i.context&&vh(n,i.context,!1),uu(n,i.containerInfo)}function gp(n,i,a,u,m){return Ss(),iu(m),i.flags|=256,wn(n,i,a,u),i.child}var Cu={dehydrated:null,treeContext:null,retryLane:0};function Ru(n){return{baseLanes:n,cachePool:null,transitions:null}}function vp(n,i,a){var u=i.pendingProps,m=Vt.current,_=!1,T=(i.flags&128)!==0,k;if((k=T)||(k=n!==null&&n.memoizedState===null?!1:(m&2)!==0),k?(_=!0,i.flags&=-129):(n===null||n.memoizedState!==null)&&(m|=1),Dt(Vt,m&1),n===null)return nu(i),n=i.memoizedState,n!==null&&(n=n.dehydrated,n!==null)?(i.mode&1?n.data==="$!"?i.lanes=8:i.lanes=1073741824:i.lanes=1,null):(T=u.children,n=u.fallback,_?(u=i.mode,_=i.child,T={mode:"hidden",children:T},!(u&1)&&_!==null?(_.childLanes=0,_.pendingProps=T):_=hl(T,u,0,null),n=Xr(n,u,a,null),_.return=i,n.return=i,_.sibling=n,i.child=_,i.child.memoizedState=Ru(a),i.memoizedState=Cu,n):Pu(i,T));if(m=n.memoizedState,m!==null&&(k=m.dehydrated,k!==null))return Mx(n,i,T,u,k,m,a);if(_){_=u.fallback,T=i.mode,m=n.child,k=m.sibling;var G={mode:"hidden",children:u.children};return!(T&1)&&i.child!==m?(u=i.child,u.childLanes=0,u.pendingProps=G,i.deletions=null):(u=hr(m,G),u.subtreeFlags=m.subtreeFlags&14680064),k!==null?_=hr(k,_):(_=Xr(_,T,a,null),_.flags|=2),_.return=i,u.return=i,u.sibling=_,i.child=u,u=_,_=i.child,T=n.child.memoizedState,T=T===null?Ru(a):{baseLanes:T.baseLanes|a,cachePool:null,transitions:T.transitions},_.memoizedState=T,_.childLanes=n.childLanes&~a,i.memoizedState=Cu,u}return _=n.child,n=_.sibling,u=hr(_,{mode:"visible",children:u.children}),!(i.mode&1)&&(u.lanes=a),u.return=i,u.sibling=null,n!==null&&(a=i.deletions,a===null?(i.deletions=[n],i.flags|=16):a.push(n)),i.child=u,i.memoizedState=null,u}function Pu(n,i){return i=hl({mode:"visible",children:i},n.mode,0,null),i.return=n,n.child=i}function el(n,i,a,u){return u!==null&&iu(u),Ms(i,n.child,null,a),n=Pu(i,i.pendingProps.children),n.flags|=2,i.memoizedState=null,n}function Mx(n,i,a,u,m,_,T){if(a)return i.flags&256?(i.flags&=-257,u=wu(Error(t(422))),el(n,i,T,u)):i.memoizedState!==null?(i.child=n.child,i.flags|=128,null):(_=u.fallback,m=i.mode,u=hl({mode:"visible",children:u.children},m,0,null),_=Xr(_,m,T,null),_.flags|=2,u.return=i,_.return=i,u.sibling=_,i.child=u,i.mode&1&&Ms(i,n.child,null,T),i.child.memoizedState=Ru(T),i.memoizedState=Cu,_);if(!(i.mode&1))return el(n,i,T,null);if(m.data==="$!"){if(u=m.nextSibling&&m.nextSibling.dataset,u)var k=u.dgst;return u=k,_=Error(t(419)),u=wu(_,u,void 0),el(n,i,T,u)}if(k=(T&n.childLanes)!==0,Un||k){if(u=ln,u!==null){switch(T&-T){case 4:m=2;break;case 16:m=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:m=32;break;case 536870912:m=268435456;break;default:m=0}m=m&(u.suspendedLanes|T)?0:m,m!==0&&m!==_.retryLane&&(_.retryLane=m,Ui(n,m),ui(u,n,m,-1))}return Xu(),u=wu(Error(t(421))),el(n,i,T,u)}return m.data==="$?"?(i.flags|=128,i.child=n.child,i=Ix.bind(null,n),m._reactRetry=i,null):(n=_.treeContext,Vn=nr(m.nextSibling),Hn=i,zt=!0,oi=null,n!==null&&(qn[Kn++]=Ni,qn[Kn++]=Di,qn[Kn++]=Fr,Ni=n.id,Di=n.overflow,Fr=i),i=Pu(i,u.children),i.flags|=4096,i)}function xp(n,i,a){n.lanes|=i;var u=n.alternate;u!==null&&(u.lanes|=i),au(n.return,i,a)}function Lu(n,i,a,u,m){var _=n.memoizedState;_===null?n.memoizedState={isBackwards:i,rendering:null,renderingStartTime:0,last:u,tail:a,tailMode:m}:(_.isBackwards=i,_.rendering=null,_.renderingStartTime=0,_.last=u,_.tail=a,_.tailMode=m)}function _p(n,i,a){var u=i.pendingProps,m=u.revealOrder,_=u.tail;if(wn(n,i,u.children,a),u=Vt.current,u&2)u=u&1|2,i.flags|=128;else{if(n!==null&&n.flags&128)e:for(n=i.child;n!==null;){if(n.tag===13)n.memoizedState!==null&&xp(n,a,i);else if(n.tag===19)xp(n,a,i);else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===i)break e;for(;n.sibling===null;){if(n.return===null||n.return===i)break e;n=n.return}n.sibling.return=n.return,n=n.sibling}u&=1}if(Dt(Vt,u),!(i.mode&1))i.memoizedState=null;else switch(m){case"forwards":for(a=i.child,m=null;a!==null;)n=a.alternate,n!==null&&$a(n)===null&&(m=a),a=a.sibling;a=m,a===null?(m=i.child,i.child=null):(m=a.sibling,a.sibling=null),Lu(i,!1,m,a,_);break;case"backwards":for(a=null,m=i.child,i.child=null;m!==null;){if(n=m.alternate,n!==null&&$a(n)===null){i.child=m;break}n=m.sibling,m.sibling=a,a=m,m=n}Lu(i,!0,a,null,_);break;case"together":Lu(i,!1,null,null,void 0);break;default:i.memoizedState=null}return i.child}function tl(n,i){!(i.mode&1)&&n!==null&&(n.alternate=null,i.alternate=null,i.flags|=2)}function Oi(n,i,a){if(n!==null&&(i.dependencies=n.dependencies),Vr|=i.lanes,!(a&i.childLanes))return null;if(n!==null&&i.child!==n.child)throw Error(t(153));if(i.child!==null){for(n=i.child,a=hr(n,n.pendingProps),i.child=a,a.return=i;n.sibling!==null;)n=n.sibling,a=a.sibling=hr(n,n.pendingProps),a.return=i;a.sibling=null}return i.child}function Ex(n,i,a){switch(i.tag){case 3:mp(i),Ss();break;case 5:Dh(i);break;case 1:Dn(i.type)&&Fa(i);break;case 4:uu(i,i.stateNode.containerInfo);break;case 10:var u=i.type._context,m=i.memoizedProps.value;Dt(Ga,u._currentValue),u._currentValue=m;break;case 13:if(u=i.memoizedState,u!==null)return u.dehydrated!==null?(Dt(Vt,Vt.current&1),i.flags|=128,null):a&i.child.childLanes?vp(n,i,a):(Dt(Vt,Vt.current&1),n=Oi(n,i,a),n!==null?n.sibling:null);Dt(Vt,Vt.current&1);break;case 19:if(u=(a&i.childLanes)!==0,n.flags&128){if(u)return _p(n,i,a);i.flags|=128}if(m=i.memoizedState,m!==null&&(m.rendering=null,m.tail=null,m.lastEffect=null),Dt(Vt,Vt.current),u)break;return null;case 22:case 23:return i.lanes=0,fp(n,i,a)}return Oi(n,i,a)}var yp,Nu,Sp,Mp;yp=function(n,i){for(var a=i.child;a!==null;){if(a.tag===5||a.tag===6)n.appendChild(a.stateNode);else if(a.tag!==4&&a.child!==null){a.child.return=a,a=a.child;continue}if(a===i)break;for(;a.sibling===null;){if(a.return===null||a.return===i)return;a=a.return}a.sibling.return=a.return,a=a.sibling}},Nu=function(){},Sp=function(n,i,a,u){var m=n.memoizedProps;if(m!==u){n=i.stateNode,Br(_i.current);var _=null;switch(a){case"input":m=ke(n,m),u=ke(n,u),_=[];break;case"select":m=Y({},m,{value:void 0}),u=Y({},u,{value:void 0}),_=[];break;case"textarea":m=Me(n,m),u=Me(n,u),_=[];break;default:typeof m.onClick!="function"&&typeof u.onClick=="function"&&(n.onclick=Ua)}$e(a,u);var T;a=null;for(le in m)if(!u.hasOwnProperty(le)&&m.hasOwnProperty(le)&&m[le]!=null)if(le==="style"){var k=m[le];for(T in k)k.hasOwnProperty(T)&&(a||(a={}),a[T]="")}else le!=="dangerouslySetInnerHTML"&&le!=="children"&&le!=="suppressContentEditableWarning"&&le!=="suppressHydrationWarning"&&le!=="autoFocus"&&(o.hasOwnProperty(le)?_||(_=[]):(_=_||[]).push(le,null));for(le in u){var G=u[le];if(k=m!=null?m[le]:void 0,u.hasOwnProperty(le)&&G!==k&&(G!=null||k!=null))if(le==="style")if(k){for(T in k)!k.hasOwnProperty(T)||G&&G.hasOwnProperty(T)||(a||(a={}),a[T]="");for(T in G)G.hasOwnProperty(T)&&k[T]!==G[T]&&(a||(a={}),a[T]=G[T])}else a||(_||(_=[]),_.push(le,a)),a=G;else le==="dangerouslySetInnerHTML"?(G=G?G.__html:void 0,k=k?k.__html:void 0,G!=null&&k!==G&&(_=_||[]).push(le,G)):le==="children"?typeof G!="string"&&typeof G!="number"||(_=_||[]).push(le,""+G):le!=="suppressContentEditableWarning"&&le!=="suppressHydrationWarning"&&(o.hasOwnProperty(le)?(G!=null&&le==="onScroll"&&Ut("scroll",n),_||k===G||(_=[])):(_=_||[]).push(le,G))}a&&(_=_||[]).push("style",a);var le=_;(i.updateQueue=le)&&(i.flags|=4)}},Mp=function(n,i,a,u){a!==u&&(i.flags|=4)};function Vo(n,i){if(!zt)switch(n.tailMode){case"hidden":i=n.tail;for(var a=null;i!==null;)i.alternate!==null&&(a=i),i=i.sibling;a===null?n.tail=null:a.sibling=null;break;case"collapsed":a=n.tail;for(var u=null;a!==null;)a.alternate!==null&&(u=a),a=a.sibling;u===null?i||n.tail===null?n.tail=null:n.tail.sibling=null:u.sibling=null}}function vn(n){var i=n.alternate!==null&&n.alternate.child===n.child,a=0,u=0;if(i)for(var m=n.child;m!==null;)a|=m.lanes|m.childLanes,u|=m.subtreeFlags&14680064,u|=m.flags&14680064,m.return=n,m=m.sibling;else for(m=n.child;m!==null;)a|=m.lanes|m.childLanes,u|=m.subtreeFlags,u|=m.flags,m.return=n,m=m.sibling;return n.subtreeFlags|=u,n.childLanes=a,i}function wx(n,i,a){var u=i.pendingProps;switch(eu(i),i.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return vn(i),null;case 1:return Dn(i.type)&&Oa(),vn(i),null;case 3:return u=i.stateNode,Ts(),It(Nn),It(mn),hu(),u.pendingContext&&(u.context=u.pendingContext,u.pendingContext=null),(n===null||n.child===null)&&(Ha(i)?i.flags|=4:n===null||n.memoizedState.isDehydrated&&!(i.flags&256)||(i.flags|=1024,oi!==null&&(Gu(oi),oi=null))),Nu(n,i),vn(i),null;case 5:du(i);var m=Br(Fo.current);if(a=i.type,n!==null&&i.stateNode!=null)Sp(n,i,a,u,m),n.ref!==i.ref&&(i.flags|=512,i.flags|=2097152);else{if(!u){if(i.stateNode===null)throw Error(t(166));return vn(i),null}if(n=Br(_i.current),Ha(i)){u=i.stateNode,a=i.type;var _=i.memoizedProps;switch(u[xi]=i,u[No]=_,n=(i.mode&1)!==0,a){case"dialog":Ut("cancel",u),Ut("close",u);break;case"iframe":case"object":case"embed":Ut("load",u);break;case"video":case"audio":for(m=0;m<Ro.length;m++)Ut(Ro[m],u);break;case"source":Ut("error",u);break;case"img":case"image":case"link":Ut("error",u),Ut("load",u);break;case"details":Ut("toggle",u);break;case"input":Qe(u,_),Ut("invalid",u);break;case"select":u._wrapperState={wasMultiple:!!_.multiple},Ut("invalid",u);break;case"textarea":ye(u,_),Ut("invalid",u)}$e(a,_),m=null;for(var T in _)if(_.hasOwnProperty(T)){var k=_[T];T==="children"?typeof k=="string"?u.textContent!==k&&(_.suppressHydrationWarning!==!0&&Da(u.textContent,k,n),m=["children",k]):typeof k=="number"&&u.textContent!==""+k&&(_.suppressHydrationWarning!==!0&&Da(u.textContent,k,n),m=["children",""+k]):o.hasOwnProperty(T)&&k!=null&&T==="onScroll"&&Ut("scroll",u)}switch(a){case"input":ze(u),ot(u,_,!0);break;case"textarea":ze(u),Ze(u);break;case"select":case"option":break;default:typeof _.onClick=="function"&&(u.onclick=Ua)}u=m,i.updateQueue=u,u!==null&&(i.flags|=4)}else{T=m.nodeType===9?m:m.ownerDocument,n==="http://www.w3.org/1999/xhtml"&&(n=Ie(a)),n==="http://www.w3.org/1999/xhtml"?a==="script"?(n=T.createElement("div"),n.innerHTML="<script><\/script>",n=n.removeChild(n.firstChild)):typeof u.is=="string"?n=T.createElement(a,{is:u.is}):(n=T.createElement(a),a==="select"&&(T=n,u.multiple?T.multiple=!0:u.size&&(T.size=u.size))):n=T.createElementNS(n,a),n[xi]=i,n[No]=u,yp(n,i,!1,!1),i.stateNode=n;e:{switch(T=dt(a,u),a){case"dialog":Ut("cancel",n),Ut("close",n),m=u;break;case"iframe":case"object":case"embed":Ut("load",n),m=u;break;case"video":case"audio":for(m=0;m<Ro.length;m++)Ut(Ro[m],n);m=u;break;case"source":Ut("error",n),m=u;break;case"img":case"image":case"link":Ut("error",n),Ut("load",n),m=u;break;case"details":Ut("toggle",n),m=u;break;case"input":Qe(n,u),m=ke(n,u),Ut("invalid",n);break;case"option":m=u;break;case"select":n._wrapperState={wasMultiple:!!u.multiple},m=Y({},u,{value:void 0}),Ut("invalid",n);break;case"textarea":ye(n,u),m=Me(n,u),Ut("invalid",n);break;default:m=u}$e(a,m),k=m;for(_ in k)if(k.hasOwnProperty(_)){var G=k[_];_==="style"?Ue(n,G):_==="dangerouslySetInnerHTML"?(G=G?G.__html:void 0,G!=null&&rt(n,G)):_==="children"?typeof G=="string"?(a!=="textarea"||G!=="")&&xe(n,G):typeof G=="number"&&xe(n,""+G):_!=="suppressContentEditableWarning"&&_!=="suppressHydrationWarning"&&_!=="autoFocus"&&(o.hasOwnProperty(_)?G!=null&&_==="onScroll"&&Ut("scroll",n):G!=null&&A(n,_,G,T))}switch(a){case"input":ze(n),ot(n,u,!1);break;case"textarea":ze(n),Ze(n);break;case"option":u.value!=null&&n.setAttribute("value",""+Fe(u.value));break;case"select":n.multiple=!!u.multiple,_=u.value,_!=null?se(n,!!u.multiple,_,!1):u.defaultValue!=null&&se(n,!!u.multiple,u.defaultValue,!0);break;default:typeof m.onClick=="function"&&(n.onclick=Ua)}switch(a){case"button":case"input":case"select":case"textarea":u=!!u.autoFocus;break e;case"img":u=!0;break e;default:u=!1}}u&&(i.flags|=4)}i.ref!==null&&(i.flags|=512,i.flags|=2097152)}return vn(i),null;case 6:if(n&&i.stateNode!=null)Mp(n,i,n.memoizedProps,u);else{if(typeof u!="string"&&i.stateNode===null)throw Error(t(166));if(a=Br(Fo.current),Br(_i.current),Ha(i)){if(u=i.stateNode,a=i.memoizedProps,u[xi]=i,(_=u.nodeValue!==a)&&(n=Hn,n!==null))switch(n.tag){case 3:Da(u.nodeValue,a,(n.mode&1)!==0);break;case 5:n.memoizedProps.suppressHydrationWarning!==!0&&Da(u.nodeValue,a,(n.mode&1)!==0)}_&&(i.flags|=4)}else u=(a.nodeType===9?a:a.ownerDocument).createTextNode(u),u[xi]=i,i.stateNode=u}return vn(i),null;case 13:if(It(Vt),u=i.memoizedState,n===null||n.memoizedState!==null&&n.memoizedState.dehydrated!==null){if(zt&&Vn!==null&&i.mode&1&&!(i.flags&128))Th(),Ss(),i.flags|=98560,_=!1;else if(_=Ha(i),u!==null&&u.dehydrated!==null){if(n===null){if(!_)throw Error(t(318));if(_=i.memoizedState,_=_!==null?_.dehydrated:null,!_)throw Error(t(317));_[xi]=i}else Ss(),!(i.flags&128)&&(i.memoizedState=null),i.flags|=4;vn(i),_=!1}else oi!==null&&(Gu(oi),oi=null),_=!0;if(!_)return i.flags&65536?i:null}return i.flags&128?(i.lanes=a,i):(u=u!==null,u!==(n!==null&&n.memoizedState!==null)&&u&&(i.child.flags|=8192,i.mode&1&&(n===null||Vt.current&1?en===0&&(en=3):Xu())),i.updateQueue!==null&&(i.flags|=4),vn(i),null);case 4:return Ts(),Nu(n,i),n===null&&Po(i.stateNode.containerInfo),vn(i),null;case 10:return ou(i.type._context),vn(i),null;case 17:return Dn(i.type)&&Oa(),vn(i),null;case 19:if(It(Vt),_=i.memoizedState,_===null)return vn(i),null;if(u=(i.flags&128)!==0,T=_.rendering,T===null)if(u)Vo(_,!1);else{if(en!==0||n!==null&&n.flags&128)for(n=i.child;n!==null;){if(T=$a(n),T!==null){for(i.flags|=128,Vo(_,!1),u=T.updateQueue,u!==null&&(i.updateQueue=u,i.flags|=4),i.subtreeFlags=0,u=a,a=i.child;a!==null;)_=a,n=u,_.flags&=14680066,T=_.alternate,T===null?(_.childLanes=0,_.lanes=n,_.child=null,_.subtreeFlags=0,_.memoizedProps=null,_.memoizedState=null,_.updateQueue=null,_.dependencies=null,_.stateNode=null):(_.childLanes=T.childLanes,_.lanes=T.lanes,_.child=T.child,_.subtreeFlags=0,_.deletions=null,_.memoizedProps=T.memoizedProps,_.memoizedState=T.memoizedState,_.updateQueue=T.updateQueue,_.type=T.type,n=T.dependencies,_.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),a=a.sibling;return Dt(Vt,Vt.current&1|2),i.child}n=n.sibling}_.tail!==null&&Xe()>Rs&&(i.flags|=128,u=!0,Vo(_,!1),i.lanes=4194304)}else{if(!u)if(n=$a(T),n!==null){if(i.flags|=128,u=!0,a=n.updateQueue,a!==null&&(i.updateQueue=a,i.flags|=4),Vo(_,!0),_.tail===null&&_.tailMode==="hidden"&&!T.alternate&&!zt)return vn(i),null}else 2*Xe()-_.renderingStartTime>Rs&&a!==1073741824&&(i.flags|=128,u=!0,Vo(_,!1),i.lanes=4194304);_.isBackwards?(T.sibling=i.child,i.child=T):(a=_.last,a!==null?a.sibling=T:i.child=T,_.last=T)}return _.tail!==null?(i=_.tail,_.rendering=i,_.tail=i.sibling,_.renderingStartTime=Xe(),i.sibling=null,a=Vt.current,Dt(Vt,u?a&1|2:a&1),i):(vn(i),null);case 22:case 23:return ju(),u=i.memoizedState!==null,n!==null&&n.memoizedState!==null!==u&&(i.flags|=8192),u&&i.mode&1?Gn&1073741824&&(vn(i),i.subtreeFlags&6&&(i.flags|=8192)):vn(i),null;case 24:return null;case 25:return null}throw Error(t(156,i.tag))}function Tx(n,i){switch(eu(i),i.tag){case 1:return Dn(i.type)&&Oa(),n=i.flags,n&65536?(i.flags=n&-65537|128,i):null;case 3:return Ts(),It(Nn),It(mn),hu(),n=i.flags,n&65536&&!(n&128)?(i.flags=n&-65537|128,i):null;case 5:return du(i),null;case 13:if(It(Vt),n=i.memoizedState,n!==null&&n.dehydrated!==null){if(i.alternate===null)throw Error(t(340));Ss()}return n=i.flags,n&65536?(i.flags=n&-65537|128,i):null;case 19:return It(Vt),null;case 4:return Ts(),null;case 10:return ou(i.type._context),null;case 22:case 23:return ju(),null;case 24:return null;default:return null}}var nl=!1,xn=!1,Ax=typeof WeakSet=="function"?WeakSet:Set,Ye=null;function bs(n,i){var a=n.ref;if(a!==null)if(typeof a=="function")try{a(null)}catch(u){jt(n,i,u)}else a.current=null}function Du(n,i,a){try{a()}catch(u){jt(n,i,u)}}var Ep=!1;function bx(n,i){if(jc=Ma,n=th(),Fc(n)){if("selectionStart"in n)var a={start:n.selectionStart,end:n.selectionEnd};else e:{a=(a=n.ownerDocument)&&a.defaultView||window;var u=a.getSelection&&a.getSelection();if(u&&u.rangeCount!==0){a=u.anchorNode;var m=u.anchorOffset,_=u.focusNode;u=u.focusOffset;try{a.nodeType,_.nodeType}catch{a=null;break e}var T=0,k=-1,G=-1,le=0,Ee=0,Ce=n,Se=null;t:for(;;){for(var We;Ce!==a||m!==0&&Ce.nodeType!==3||(k=T+m),Ce!==_||u!==0&&Ce.nodeType!==3||(G=T+u),Ce.nodeType===3&&(T+=Ce.nodeValue.length),(We=Ce.firstChild)!==null;)Se=Ce,Ce=We;for(;;){if(Ce===n)break t;if(Se===a&&++le===m&&(k=T),Se===_&&++Ee===u&&(G=T),(We=Ce.nextSibling)!==null)break;Ce=Se,Se=Ce.parentNode}Ce=We}a=k===-1||G===-1?null:{start:k,end:G}}else a=null}a=a||{start:0,end:0}}else a=null;for(Xc={focusedElem:n,selectionRange:a},Ma=!1,Ye=i;Ye!==null;)if(i=Ye,n=i.child,(i.subtreeFlags&1028)!==0&&n!==null)n.return=i,Ye=n;else for(;Ye!==null;){i=Ye;try{var Ke=i.alternate;if(i.flags&1024)switch(i.tag){case 0:case 11:case 15:break;case 1:if(Ke!==null){var Je=Ke.memoizedProps,qt=Ke.memoizedState,Q=i.stateNode,j=Q.getSnapshotBeforeUpdate(i.elementType===i.type?Je:ai(i.type,Je),qt);Q.__reactInternalSnapshotBeforeUpdate=j}break;case 3:var ie=i.stateNode.containerInfo;ie.nodeType===1?ie.textContent="":ie.nodeType===9&&ie.documentElement&&ie.removeChild(ie.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(t(163))}}catch(De){jt(i,i.return,De)}if(n=i.sibling,n!==null){n.return=i.return,Ye=n;break}Ye=i.return}return Ke=Ep,Ep=!1,Ke}function Go(n,i,a){var u=i.updateQueue;if(u=u!==null?u.lastEffect:null,u!==null){var m=u=u.next;do{if((m.tag&n)===n){var _=m.destroy;m.destroy=void 0,_!==void 0&&Du(i,a,_)}m=m.next}while(m!==u)}}function il(n,i){if(i=i.updateQueue,i=i!==null?i.lastEffect:null,i!==null){var a=i=i.next;do{if((a.tag&n)===n){var u=a.create;a.destroy=u()}a=a.next}while(a!==i)}}function Uu(n){var i=n.ref;if(i!==null){var a=n.stateNode;switch(n.tag){case 5:n=a;break;default:n=a}typeof i=="function"?i(n):i.current=n}}function wp(n){var i=n.alternate;i!==null&&(n.alternate=null,wp(i)),n.child=null,n.deletions=null,n.sibling=null,n.tag===5&&(i=n.stateNode,i!==null&&(delete i[xi],delete i[No],delete i[Kc],delete i[cx],delete i[ux])),n.stateNode=null,n.return=null,n.dependencies=null,n.memoizedProps=null,n.memoizedState=null,n.pendingProps=null,n.stateNode=null,n.updateQueue=null}function Tp(n){return n.tag===5||n.tag===3||n.tag===4}function Ap(n){e:for(;;){for(;n.sibling===null;){if(n.return===null||Tp(n.return))return null;n=n.return}for(n.sibling.return=n.return,n=n.sibling;n.tag!==5&&n.tag!==6&&n.tag!==18;){if(n.flags&2||n.child===null||n.tag===4)continue e;n.child.return=n,n=n.child}if(!(n.flags&2))return n.stateNode}}function Iu(n,i,a){var u=n.tag;if(u===5||u===6)n=n.stateNode,i?a.nodeType===8?a.parentNode.insertBefore(n,i):a.insertBefore(n,i):(a.nodeType===8?(i=a.parentNode,i.insertBefore(n,a)):(i=a,i.appendChild(n)),a=a._reactRootContainer,a!=null||i.onclick!==null||(i.onclick=Ua));else if(u!==4&&(n=n.child,n!==null))for(Iu(n,i,a),n=n.sibling;n!==null;)Iu(n,i,a),n=n.sibling}function Ou(n,i,a){var u=n.tag;if(u===5||u===6)n=n.stateNode,i?a.insertBefore(n,i):a.appendChild(n);else if(u!==4&&(n=n.child,n!==null))for(Ou(n,i,a),n=n.sibling;n!==null;)Ou(n,i,a),n=n.sibling}var fn=null,li=!1;function lr(n,i,a){for(a=a.child;a!==null;)bp(n,i,a),a=a.sibling}function bp(n,i,a){if(At&&typeof At.onCommitFiberUnmount=="function")try{At.onCommitFiberUnmount(Pn,a)}catch{}switch(a.tag){case 5:xn||bs(a,i);case 6:var u=fn,m=li;fn=null,lr(n,i,a),fn=u,li=m,fn!==null&&(li?(n=fn,a=a.stateNode,n.nodeType===8?n.parentNode.removeChild(a):n.removeChild(a)):fn.removeChild(a.stateNode));break;case 18:fn!==null&&(li?(n=fn,a=a.stateNode,n.nodeType===8?qc(n.parentNode,a):n.nodeType===1&&qc(n,a),So(n)):qc(fn,a.stateNode));break;case 4:u=fn,m=li,fn=a.stateNode.containerInfo,li=!0,lr(n,i,a),fn=u,li=m;break;case 0:case 11:case 14:case 15:if(!xn&&(u=a.updateQueue,u!==null&&(u=u.lastEffect,u!==null))){m=u=u.next;do{var _=m,T=_.destroy;_=_.tag,T!==void 0&&(_&2||_&4)&&Du(a,i,T),m=m.next}while(m!==u)}lr(n,i,a);break;case 1:if(!xn&&(bs(a,i),u=a.stateNode,typeof u.componentWillUnmount=="function"))try{u.props=a.memoizedProps,u.state=a.memoizedState,u.componentWillUnmount()}catch(k){jt(a,i,k)}lr(n,i,a);break;case 21:lr(n,i,a);break;case 22:a.mode&1?(xn=(u=xn)||a.memoizedState!==null,lr(n,i,a),xn=u):lr(n,i,a);break;default:lr(n,i,a)}}function Cp(n){var i=n.updateQueue;if(i!==null){n.updateQueue=null;var a=n.stateNode;a===null&&(a=n.stateNode=new Ax),i.forEach(function(u){var m=Ox.bind(null,n,u);a.has(u)||(a.add(u),u.then(m,m))})}}function ci(n,i){var a=i.deletions;if(a!==null)for(var u=0;u<a.length;u++){var m=a[u];try{var _=n,T=i,k=T;e:for(;k!==null;){switch(k.tag){case 5:fn=k.stateNode,li=!1;break e;case 3:fn=k.stateNode.containerInfo,li=!0;break e;case 4:fn=k.stateNode.containerInfo,li=!0;break e}k=k.return}if(fn===null)throw Error(t(160));bp(_,T,m),fn=null,li=!1;var G=m.alternate;G!==null&&(G.return=null),m.return=null}catch(le){jt(m,i,le)}}if(i.subtreeFlags&12854)for(i=i.child;i!==null;)Rp(i,n),i=i.sibling}function Rp(n,i){var a=n.alternate,u=n.flags;switch(n.tag){case 0:case 11:case 14:case 15:if(ci(i,n),Si(n),u&4){try{Go(3,n,n.return),il(3,n)}catch(Je){jt(n,n.return,Je)}try{Go(5,n,n.return)}catch(Je){jt(n,n.return,Je)}}break;case 1:ci(i,n),Si(n),u&512&&a!==null&&bs(a,a.return);break;case 5:if(ci(i,n),Si(n),u&512&&a!==null&&bs(a,a.return),n.flags&32){var m=n.stateNode;try{xe(m,"")}catch(Je){jt(n,n.return,Je)}}if(u&4&&(m=n.stateNode,m!=null)){var _=n.memoizedProps,T=a!==null?a.memoizedProps:_,k=n.type,G=n.updateQueue;if(n.updateQueue=null,G!==null)try{k==="input"&&_.type==="radio"&&_.name!=null&&Ve(m,_),dt(k,T);var le=dt(k,_);for(T=0;T<G.length;T+=2){var Ee=G[T],Ce=G[T+1];Ee==="style"?Ue(m,Ce):Ee==="dangerouslySetInnerHTML"?rt(m,Ce):Ee==="children"?xe(m,Ce):A(m,Ee,Ce,le)}switch(k){case"input":wt(m,_);break;case"textarea":we(m,_);break;case"select":var Se=m._wrapperState.wasMultiple;m._wrapperState.wasMultiple=!!_.multiple;var We=_.value;We!=null?se(m,!!_.multiple,We,!1):Se!==!!_.multiple&&(_.defaultValue!=null?se(m,!!_.multiple,_.defaultValue,!0):se(m,!!_.multiple,_.multiple?[]:"",!1))}m[No]=_}catch(Je){jt(n,n.return,Je)}}break;case 6:if(ci(i,n),Si(n),u&4){if(n.stateNode===null)throw Error(t(162));m=n.stateNode,_=n.memoizedProps;try{m.nodeValue=_}catch(Je){jt(n,n.return,Je)}}break;case 3:if(ci(i,n),Si(n),u&4&&a!==null&&a.memoizedState.isDehydrated)try{So(i.containerInfo)}catch(Je){jt(n,n.return,Je)}break;case 4:ci(i,n),Si(n);break;case 13:ci(i,n),Si(n),m=n.child,m.flags&8192&&(_=m.memoizedState!==null,m.stateNode.isHidden=_,!_||m.alternate!==null&&m.alternate.memoizedState!==null||(zu=Xe())),u&4&&Cp(n);break;case 22:if(Ee=a!==null&&a.memoizedState!==null,n.mode&1?(xn=(le=xn)||Ee,ci(i,n),xn=le):ci(i,n),Si(n),u&8192){if(le=n.memoizedState!==null,(n.stateNode.isHidden=le)&&!Ee&&n.mode&1)for(Ye=n,Ee=n.child;Ee!==null;){for(Ce=Ye=Ee;Ye!==null;){switch(Se=Ye,We=Se.child,Se.tag){case 0:case 11:case 14:case 15:Go(4,Se,Se.return);break;case 1:bs(Se,Se.return);var Ke=Se.stateNode;if(typeof Ke.componentWillUnmount=="function"){u=Se,a=Se.return;try{i=u,Ke.props=i.memoizedProps,Ke.state=i.memoizedState,Ke.componentWillUnmount()}catch(Je){jt(u,a,Je)}}break;case 5:bs(Se,Se.return);break;case 22:if(Se.memoizedState!==null){Np(Ce);continue}}We!==null?(We.return=Se,Ye=We):Np(Ce)}Ee=Ee.sibling}e:for(Ee=null,Ce=n;;){if(Ce.tag===5){if(Ee===null){Ee=Ce;try{m=Ce.stateNode,le?(_=m.style,typeof _.setProperty=="function"?_.setProperty("display","none","important"):_.display="none"):(k=Ce.stateNode,G=Ce.memoizedProps.style,T=G!=null&&G.hasOwnProperty("display")?G.display:null,k.style.display=_e("display",T))}catch(Je){jt(n,n.return,Je)}}}else if(Ce.tag===6){if(Ee===null)try{Ce.stateNode.nodeValue=le?"":Ce.memoizedProps}catch(Je){jt(n,n.return,Je)}}else if((Ce.tag!==22&&Ce.tag!==23||Ce.memoizedState===null||Ce===n)&&Ce.child!==null){Ce.child.return=Ce,Ce=Ce.child;continue}if(Ce===n)break e;for(;Ce.sibling===null;){if(Ce.return===null||Ce.return===n)break e;Ee===Ce&&(Ee=null),Ce=Ce.return}Ee===Ce&&(Ee=null),Ce.sibling.return=Ce.return,Ce=Ce.sibling}}break;case 19:ci(i,n),Si(n),u&4&&Cp(n);break;case 21:break;default:ci(i,n),Si(n)}}function Si(n){var i=n.flags;if(i&2){try{e:{for(var a=n.return;a!==null;){if(Tp(a)){var u=a;break e}a=a.return}throw Error(t(160))}switch(u.tag){case 5:var m=u.stateNode;u.flags&32&&(xe(m,""),u.flags&=-33);var _=Ap(n);Ou(n,_,m);break;case 3:case 4:var T=u.stateNode.containerInfo,k=Ap(n);Iu(n,k,T);break;default:throw Error(t(161))}}catch(G){jt(n,n.return,G)}n.flags&=-3}i&4096&&(n.flags&=-4097)}function Cx(n,i,a){Ye=n,Pp(n)}function Pp(n,i,a){for(var u=(n.mode&1)!==0;Ye!==null;){var m=Ye,_=m.child;if(m.tag===22&&u){var T=m.memoizedState!==null||nl;if(!T){var k=m.alternate,G=k!==null&&k.memoizedState!==null||xn;k=nl;var le=xn;if(nl=T,(xn=G)&&!le)for(Ye=m;Ye!==null;)T=Ye,G=T.child,T.tag===22&&T.memoizedState!==null?Dp(m):G!==null?(G.return=T,Ye=G):Dp(m);for(;_!==null;)Ye=_,Pp(_),_=_.sibling;Ye=m,nl=k,xn=le}Lp(n)}else m.subtreeFlags&8772&&_!==null?(_.return=m,Ye=_):Lp(n)}}function Lp(n){for(;Ye!==null;){var i=Ye;if(i.flags&8772){var a=i.alternate;try{if(i.flags&8772)switch(i.tag){case 0:case 11:case 15:xn||il(5,i);break;case 1:var u=i.stateNode;if(i.flags&4&&!xn)if(a===null)u.componentDidMount();else{var m=i.elementType===i.type?a.memoizedProps:ai(i.type,a.memoizedProps);u.componentDidUpdate(m,a.memoizedState,u.__reactInternalSnapshotBeforeUpdate)}var _=i.updateQueue;_!==null&&Nh(i,_,u);break;case 3:var T=i.updateQueue;if(T!==null){if(a=null,i.child!==null)switch(i.child.tag){case 5:a=i.child.stateNode;break;case 1:a=i.child.stateNode}Nh(i,T,a)}break;case 5:var k=i.stateNode;if(a===null&&i.flags&4){a=k;var G=i.memoizedProps;switch(i.type){case"button":case"input":case"select":case"textarea":G.autoFocus&&a.focus();break;case"img":G.src&&(a.src=G.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(i.memoizedState===null){var le=i.alternate;if(le!==null){var Ee=le.memoizedState;if(Ee!==null){var Ce=Ee.dehydrated;Ce!==null&&So(Ce)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(t(163))}xn||i.flags&512&&Uu(i)}catch(Se){jt(i,i.return,Se)}}if(i===n){Ye=null;break}if(a=i.sibling,a!==null){a.return=i.return,Ye=a;break}Ye=i.return}}function Np(n){for(;Ye!==null;){var i=Ye;if(i===n){Ye=null;break}var a=i.sibling;if(a!==null){a.return=i.return,Ye=a;break}Ye=i.return}}function Dp(n){for(;Ye!==null;){var i=Ye;try{switch(i.tag){case 0:case 11:case 15:var a=i.return;try{il(4,i)}catch(G){jt(i,a,G)}break;case 1:var u=i.stateNode;if(typeof u.componentDidMount=="function"){var m=i.return;try{u.componentDidMount()}catch(G){jt(i,m,G)}}var _=i.return;try{Uu(i)}catch(G){jt(i,_,G)}break;case 5:var T=i.return;try{Uu(i)}catch(G){jt(i,T,G)}}}catch(G){jt(i,i.return,G)}if(i===n){Ye=null;break}var k=i.sibling;if(k!==null){k.return=i.return,Ye=k;break}Ye=i.return}}var Rx=Math.ceil,rl=P.ReactCurrentDispatcher,Fu=P.ReactCurrentOwner,Qn=P.ReactCurrentBatchConfig,bt=0,ln=null,Kt=null,hn=0,Gn=0,Cs=ir(0),en=0,Wo=null,Vr=0,sl=0,ku=0,jo=null,In=null,zu=0,Rs=1/0,Fi=null,ol=!1,Bu=null,cr=null,al=!1,ur=null,ll=0,Xo=0,Hu=null,cl=-1,ul=0;function Tn(){return bt&6?Xe():cl!==-1?cl:cl=Xe()}function dr(n){return n.mode&1?bt&2&&hn!==0?hn&-hn:fx.transition!==null?(ul===0&&(ul=_a()),ul):(n=Pt,n!==0||(n=window.event,n=n===void 0?16:If(n.type)),n):1}function ui(n,i,a,u){if(50<Xo)throw Xo=0,Hu=null,Error(t(185));go(n,a,u),(!(bt&2)||n!==ln)&&(n===ln&&(!(bt&2)&&(sl|=a),en===4&&fr(n,hn)),On(n,u),a===1&&bt===0&&!(i.mode&1)&&(Rs=Xe()+500,ka&&sr()))}function On(n,i){var a=n.callbackNode;Ln(n,i);var u=Yn(n,n===ln?hn:0);if(u===0)a!==null&&Ge(a),n.callbackNode=null,n.callbackPriority=0;else if(i=u&-u,n.callbackPriority!==i){if(a!=null&&Ge(a),i===1)n.tag===0?dx(Ip.bind(null,n)):yh(Ip.bind(null,n)),ax(function(){!(bt&6)&&sr()}),a=null;else{switch(bf(u)){case 1:a=ft;break;case 4:a=pt;break;case 16:a=Nt;break;case 536870912:a=Yt;break;default:a=Nt}a=Gp(a,Up.bind(null,n))}n.callbackPriority=i,n.callbackNode=a}}function Up(n,i){if(cl=-1,ul=0,bt&6)throw Error(t(327));var a=n.callbackNode;if(Ps()&&n.callbackNode!==a)return null;var u=Yn(n,n===ln?hn:0);if(u===0)return null;if(u&30||u&n.expiredLanes||i)i=dl(n,u);else{i=u;var m=bt;bt|=2;var _=Fp();(ln!==n||hn!==i)&&(Fi=null,Rs=Xe()+500,Wr(n,i));do try{Nx();break}catch(k){Op(n,k)}while(!0);su(),rl.current=_,bt=m,Kt!==null?i=0:(ln=null,hn=0,i=en)}if(i!==0){if(i===2&&(m=Ur(n),m!==0&&(u=m,i=Vu(n,m))),i===1)throw a=Wo,Wr(n,0),fr(n,u),On(n,Xe()),a;if(i===6)fr(n,u);else{if(m=n.current.alternate,!(u&30)&&!Px(m)&&(i=dl(n,u),i===2&&(_=Ur(n),_!==0&&(u=_,i=Vu(n,_))),i===1))throw a=Wo,Wr(n,0),fr(n,u),On(n,Xe()),a;switch(n.finishedWork=m,n.finishedLanes=u,i){case 0:case 1:throw Error(t(345));case 2:jr(n,In,Fi);break;case 3:if(fr(n,u),(u&130023424)===u&&(i=zu+500-Xe(),10<i)){if(Yn(n,0)!==0)break;if(m=n.suspendedLanes,(m&u)!==u){Tn(),n.pingedLanes|=n.suspendedLanes&m;break}n.timeoutHandle=Yc(jr.bind(null,n,In,Fi),i);break}jr(n,In,Fi);break;case 4:if(fr(n,u),(u&4194240)===u)break;for(i=n.eventTimes,m=-1;0<u;){var T=31-En(u);_=1<<T,T=i[T],T>m&&(m=T),u&=~_}if(u=m,u=Xe()-u,u=(120>u?120:480>u?480:1080>u?1080:1920>u?1920:3e3>u?3e3:4320>u?4320:1960*Rx(u/1960))-u,10<u){n.timeoutHandle=Yc(jr.bind(null,n,In,Fi),u);break}jr(n,In,Fi);break;case 5:jr(n,In,Fi);break;default:throw Error(t(329))}}}return On(n,Xe()),n.callbackNode===a?Up.bind(null,n):null}function Vu(n,i){var a=jo;return n.current.memoizedState.isDehydrated&&(Wr(n,i).flags|=256),n=dl(n,i),n!==2&&(i=In,In=a,i!==null&&Gu(i)),n}function Gu(n){In===null?In=n:In.push.apply(In,n)}function Px(n){for(var i=n;;){if(i.flags&16384){var a=i.updateQueue;if(a!==null&&(a=a.stores,a!==null))for(var u=0;u<a.length;u++){var m=a[u],_=m.getSnapshot;m=m.value;try{if(!si(_(),m))return!1}catch{return!1}}}if(a=i.child,i.subtreeFlags&16384&&a!==null)a.return=i,i=a;else{if(i===n)break;for(;i.sibling===null;){if(i.return===null||i.return===n)return!0;i=i.return}i.sibling.return=i.return,i=i.sibling}}return!0}function fr(n,i){for(i&=~ku,i&=~sl,n.suspendedLanes|=i,n.pingedLanes&=~i,n=n.expirationTimes;0<i;){var a=31-En(i),u=1<<a;n[a]=-1,i&=~u}}function Ip(n){if(bt&6)throw Error(t(327));Ps();var i=Yn(n,0);if(!(i&1))return On(n,Xe()),null;var a=dl(n,i);if(n.tag!==0&&a===2){var u=Ur(n);u!==0&&(i=u,a=Vu(n,u))}if(a===1)throw a=Wo,Wr(n,0),fr(n,i),On(n,Xe()),a;if(a===6)throw Error(t(345));return n.finishedWork=n.current.alternate,n.finishedLanes=i,jr(n,In,Fi),On(n,Xe()),null}function Wu(n,i){var a=bt;bt|=1;try{return n(i)}finally{bt=a,bt===0&&(Rs=Xe()+500,ka&&sr())}}function Gr(n){ur!==null&&ur.tag===0&&!(bt&6)&&Ps();var i=bt;bt|=1;var a=Qn.transition,u=Pt;try{if(Qn.transition=null,Pt=1,n)return n()}finally{Pt=u,Qn.transition=a,bt=i,!(bt&6)&&sr()}}function ju(){Gn=Cs.current,It(Cs)}function Wr(n,i){n.finishedWork=null,n.finishedLanes=0;var a=n.timeoutHandle;if(a!==-1&&(n.timeoutHandle=-1,ox(a)),Kt!==null)for(a=Kt.return;a!==null;){var u=a;switch(eu(u),u.tag){case 1:u=u.type.childContextTypes,u!=null&&Oa();break;case 3:Ts(),It(Nn),It(mn),hu();break;case 5:du(u);break;case 4:Ts();break;case 13:It(Vt);break;case 19:It(Vt);break;case 10:ou(u.type._context);break;case 22:case 23:ju()}a=a.return}if(ln=n,Kt=n=hr(n.current,null),hn=Gn=i,en=0,Wo=null,ku=sl=Vr=0,In=jo=null,zr!==null){for(i=0;i<zr.length;i++)if(a=zr[i],u=a.interleaved,u!==null){a.interleaved=null;var m=u.next,_=a.pending;if(_!==null){var T=_.next;_.next=m,u.next=T}a.pending=u}zr=null}return n}function Op(n,i){do{var a=Kt;try{if(su(),Ya.current=Ja,qa){for(var u=Gt.memoizedState;u!==null;){var m=u.queue;m!==null&&(m.pending=null),u=u.next}qa=!1}if(Hr=0,an=Qt=Gt=null,ko=!1,zo=0,Fu.current=null,a===null||a.return===null){en=1,Wo=i,Kt=null;break}e:{var _=n,T=a.return,k=a,G=i;if(i=hn,k.flags|=32768,G!==null&&typeof G=="object"&&typeof G.then=="function"){var le=G,Ee=k,Ce=Ee.tag;if(!(Ee.mode&1)&&(Ce===0||Ce===11||Ce===15)){var Se=Ee.alternate;Se?(Ee.updateQueue=Se.updateQueue,Ee.memoizedState=Se.memoizedState,Ee.lanes=Se.lanes):(Ee.updateQueue=null,Ee.memoizedState=null)}var We=ap(T);if(We!==null){We.flags&=-257,lp(We,T,k,_,i),We.mode&1&&op(_,le,i),i=We,G=le;var Ke=i.updateQueue;if(Ke===null){var Je=new Set;Je.add(G),i.updateQueue=Je}else Ke.add(G);break e}else{if(!(i&1)){op(_,le,i),Xu();break e}G=Error(t(426))}}else if(zt&&k.mode&1){var qt=ap(T);if(qt!==null){!(qt.flags&65536)&&(qt.flags|=256),lp(qt,T,k,_,i),iu(As(G,k));break e}}_=G=As(G,k),en!==4&&(en=2),jo===null?jo=[_]:jo.push(_),_=T;do{switch(_.tag){case 3:_.flags|=65536,i&=-i,_.lanes|=i;var Q=rp(_,G,i);Lh(_,Q);break e;case 1:k=G;var j=_.type,ie=_.stateNode;if(!(_.flags&128)&&(typeof j.getDerivedStateFromError=="function"||ie!==null&&typeof ie.componentDidCatch=="function"&&(cr===null||!cr.has(ie)))){_.flags|=65536,i&=-i,_.lanes|=i;var De=sp(_,k,i);Lh(_,De);break e}}_=_.return}while(_!==null)}zp(a)}catch(et){i=et,Kt===a&&a!==null&&(Kt=a=a.return);continue}break}while(!0)}function Fp(){var n=rl.current;return rl.current=Ja,n===null?Ja:n}function Xu(){(en===0||en===3||en===2)&&(en=4),ln===null||!(Vr&268435455)&&!(sl&268435455)||fr(ln,hn)}function dl(n,i){var a=bt;bt|=2;var u=Fp();(ln!==n||hn!==i)&&(Fi=null,Wr(n,i));do try{Lx();break}catch(m){Op(n,m)}while(!0);if(su(),bt=a,rl.current=u,Kt!==null)throw Error(t(261));return ln=null,hn=0,en}function Lx(){for(;Kt!==null;)kp(Kt)}function Nx(){for(;Kt!==null&&!it();)kp(Kt)}function kp(n){var i=Vp(n.alternate,n,Gn);n.memoizedProps=n.pendingProps,i===null?zp(n):Kt=i,Fu.current=null}function zp(n){var i=n;do{var a=i.alternate;if(n=i.return,i.flags&32768){if(a=Tx(a,i),a!==null){a.flags&=32767,Kt=a;return}if(n!==null)n.flags|=32768,n.subtreeFlags=0,n.deletions=null;else{en=6,Kt=null;return}}else if(a=wx(a,i,Gn),a!==null){Kt=a;return}if(i=i.sibling,i!==null){Kt=i;return}Kt=i=n}while(i!==null);en===0&&(en=5)}function jr(n,i,a){var u=Pt,m=Qn.transition;try{Qn.transition=null,Pt=1,Dx(n,i,a,u)}finally{Qn.transition=m,Pt=u}return null}function Dx(n,i,a,u){do Ps();while(ur!==null);if(bt&6)throw Error(t(327));a=n.finishedWork;var m=n.finishedLanes;if(a===null)return null;if(n.finishedWork=null,n.finishedLanes=0,a===n.current)throw Error(t(177));n.callbackNode=null,n.callbackPriority=0;var _=a.lanes|a.childLanes;if(h0(n,_),n===ln&&(Kt=ln=null,hn=0),!(a.subtreeFlags&2064)&&!(a.flags&2064)||al||(al=!0,Gp(Nt,function(){return Ps(),null})),_=(a.flags&15990)!==0,a.subtreeFlags&15990||_){_=Qn.transition,Qn.transition=null;var T=Pt;Pt=1;var k=bt;bt|=4,Fu.current=null,bx(n,a),Rp(a,n),Q0(Xc),Ma=!!jc,Xc=jc=null,n.current=a,Cx(a),ct(),bt=k,Pt=T,Qn.transition=_}else n.current=a;if(al&&(al=!1,ur=n,ll=m),_=n.pendingLanes,_===0&&(cr=null),xt(a.stateNode),On(n,Xe()),i!==null)for(u=n.onRecoverableError,a=0;a<i.length;a++)m=i[a],u(m.value,{componentStack:m.stack,digest:m.digest});if(ol)throw ol=!1,n=Bu,Bu=null,n;return ll&1&&n.tag!==0&&Ps(),_=n.pendingLanes,_&1?n===Hu?Xo++:(Xo=0,Hu=n):Xo=0,sr(),null}function Ps(){if(ur!==null){var n=bf(ll),i=Qn.transition,a=Pt;try{if(Qn.transition=null,Pt=16>n?16:n,ur===null)var u=!1;else{if(n=ur,ur=null,ll=0,bt&6)throw Error(t(331));var m=bt;for(bt|=4,Ye=n.current;Ye!==null;){var _=Ye,T=_.child;if(Ye.flags&16){var k=_.deletions;if(k!==null){for(var G=0;G<k.length;G++){var le=k[G];for(Ye=le;Ye!==null;){var Ee=Ye;switch(Ee.tag){case 0:case 11:case 15:Go(8,Ee,_)}var Ce=Ee.child;if(Ce!==null)Ce.return=Ee,Ye=Ce;else for(;Ye!==null;){Ee=Ye;var Se=Ee.sibling,We=Ee.return;if(wp(Ee),Ee===le){Ye=null;break}if(Se!==null){Se.return=We,Ye=Se;break}Ye=We}}}var Ke=_.alternate;if(Ke!==null){var Je=Ke.child;if(Je!==null){Ke.child=null;do{var qt=Je.sibling;Je.sibling=null,Je=qt}while(Je!==null)}}Ye=_}}if(_.subtreeFlags&2064&&T!==null)T.return=_,Ye=T;else e:for(;Ye!==null;){if(_=Ye,_.flags&2048)switch(_.tag){case 0:case 11:case 15:Go(9,_,_.return)}var Q=_.sibling;if(Q!==null){Q.return=_.return,Ye=Q;break e}Ye=_.return}}var j=n.current;for(Ye=j;Ye!==null;){T=Ye;var ie=T.child;if(T.subtreeFlags&2064&&ie!==null)ie.return=T,Ye=ie;else e:for(T=j;Ye!==null;){if(k=Ye,k.flags&2048)try{switch(k.tag){case 0:case 11:case 15:il(9,k)}}catch(et){jt(k,k.return,et)}if(k===T){Ye=null;break e}var De=k.sibling;if(De!==null){De.return=k.return,Ye=De;break e}Ye=k.return}}if(bt=m,sr(),At&&typeof At.onPostCommitFiberRoot=="function")try{At.onPostCommitFiberRoot(Pn,n)}catch{}u=!0}return u}finally{Pt=a,Qn.transition=i}}return!1}function Bp(n,i,a){i=As(a,i),i=rp(n,i,1),n=ar(n,i,1),i=Tn(),n!==null&&(go(n,1,i),On(n,i))}function jt(n,i,a){if(n.tag===3)Bp(n,n,a);else for(;i!==null;){if(i.tag===3){Bp(i,n,a);break}else if(i.tag===1){var u=i.stateNode;if(typeof i.type.getDerivedStateFromError=="function"||typeof u.componentDidCatch=="function"&&(cr===null||!cr.has(u))){n=As(a,n),n=sp(i,n,1),i=ar(i,n,1),n=Tn(),i!==null&&(go(i,1,n),On(i,n));break}}i=i.return}}function Ux(n,i,a){var u=n.pingCache;u!==null&&u.delete(i),i=Tn(),n.pingedLanes|=n.suspendedLanes&a,ln===n&&(hn&a)===a&&(en===4||en===3&&(hn&130023424)===hn&&500>Xe()-zu?Wr(n,0):ku|=a),On(n,i)}function Hp(n,i){i===0&&(n.mode&1?(i=qi,qi<<=1,!(qi&130023424)&&(qi=4194304)):i=1);var a=Tn();n=Ui(n,i),n!==null&&(go(n,i,a),On(n,a))}function Ix(n){var i=n.memoizedState,a=0;i!==null&&(a=i.retryLane),Hp(n,a)}function Ox(n,i){var a=0;switch(n.tag){case 13:var u=n.stateNode,m=n.memoizedState;m!==null&&(a=m.retryLane);break;case 19:u=n.stateNode;break;default:throw Error(t(314))}u!==null&&u.delete(i),Hp(n,a)}var Vp;Vp=function(n,i,a){if(n!==null)if(n.memoizedProps!==i.pendingProps||Nn.current)Un=!0;else{if(!(n.lanes&a)&&!(i.flags&128))return Un=!1,Ex(n,i,a);Un=!!(n.flags&131072)}else Un=!1,zt&&i.flags&1048576&&Sh(i,Ba,i.index);switch(i.lanes=0,i.tag){case 2:var u=i.type;tl(n,i),n=i.pendingProps;var m=xs(i,mn.current);ws(i,a),m=gu(null,i,u,n,m,a);var _=vu();return i.flags|=1,typeof m=="object"&&m!==null&&typeof m.render=="function"&&m.$$typeof===void 0?(i.tag=1,i.memoizedState=null,i.updateQueue=null,Dn(u)?(_=!0,Fa(i)):_=!1,i.memoizedState=m.state!==null&&m.state!==void 0?m.state:null,cu(i),m.updater=Qa,i.stateNode=m,m._reactInternals=i,Eu(i,u,n,a),i=bu(null,i,u,!0,_,a)):(i.tag=0,zt&&_&&Qc(i),wn(null,i,m,a),i=i.child),i;case 16:u=i.elementType;e:{switch(tl(n,i),n=i.pendingProps,m=u._init,u=m(u._payload),i.type=u,m=i.tag=kx(u),n=ai(u,n),m){case 0:i=Au(null,i,u,n,a);break e;case 1:i=pp(null,i,u,n,a);break e;case 11:i=cp(null,i,u,n,a);break e;case 14:i=up(null,i,u,ai(u.type,n),a);break e}throw Error(t(306,u,""))}return i;case 0:return u=i.type,m=i.pendingProps,m=i.elementType===u?m:ai(u,m),Au(n,i,u,m,a);case 1:return u=i.type,m=i.pendingProps,m=i.elementType===u?m:ai(u,m),pp(n,i,u,m,a);case 3:e:{if(mp(i),n===null)throw Error(t(387));u=i.pendingProps,_=i.memoizedState,m=_.element,Ph(n,i),Xa(i,u,null,a);var T=i.memoizedState;if(u=T.element,_.isDehydrated)if(_={element:u,isDehydrated:!1,cache:T.cache,pendingSuspenseBoundaries:T.pendingSuspenseBoundaries,transitions:T.transitions},i.updateQueue.baseState=_,i.memoizedState=_,i.flags&256){m=As(Error(t(423)),i),i=gp(n,i,u,a,m);break e}else if(u!==m){m=As(Error(t(424)),i),i=gp(n,i,u,a,m);break e}else for(Vn=nr(i.stateNode.containerInfo.firstChild),Hn=i,zt=!0,oi=null,a=Ch(i,null,u,a),i.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling;else{if(Ss(),u===m){i=Oi(n,i,a);break e}wn(n,i,u,a)}i=i.child}return i;case 5:return Dh(i),n===null&&nu(i),u=i.type,m=i.pendingProps,_=n!==null?n.memoizedProps:null,T=m.children,$c(u,m)?T=null:_!==null&&$c(u,_)&&(i.flags|=32),hp(n,i),wn(n,i,T,a),i.child;case 6:return n===null&&nu(i),null;case 13:return vp(n,i,a);case 4:return uu(i,i.stateNode.containerInfo),u=i.pendingProps,n===null?i.child=Ms(i,null,u,a):wn(n,i,u,a),i.child;case 11:return u=i.type,m=i.pendingProps,m=i.elementType===u?m:ai(u,m),cp(n,i,u,m,a);case 7:return wn(n,i,i.pendingProps,a),i.child;case 8:return wn(n,i,i.pendingProps.children,a),i.child;case 12:return wn(n,i,i.pendingProps.children,a),i.child;case 10:e:{if(u=i.type._context,m=i.pendingProps,_=i.memoizedProps,T=m.value,Dt(Ga,u._currentValue),u._currentValue=T,_!==null)if(si(_.value,T)){if(_.children===m.children&&!Nn.current){i=Oi(n,i,a);break e}}else for(_=i.child,_!==null&&(_.return=i);_!==null;){var k=_.dependencies;if(k!==null){T=_.child;for(var G=k.firstContext;G!==null;){if(G.context===u){if(_.tag===1){G=Ii(-1,a&-a),G.tag=2;var le=_.updateQueue;if(le!==null){le=le.shared;var Ee=le.pending;Ee===null?G.next=G:(G.next=Ee.next,Ee.next=G),le.pending=G}}_.lanes|=a,G=_.alternate,G!==null&&(G.lanes|=a),au(_.return,a,i),k.lanes|=a;break}G=G.next}}else if(_.tag===10)T=_.type===i.type?null:_.child;else if(_.tag===18){if(T=_.return,T===null)throw Error(t(341));T.lanes|=a,k=T.alternate,k!==null&&(k.lanes|=a),au(T,a,i),T=_.sibling}else T=_.child;if(T!==null)T.return=_;else for(T=_;T!==null;){if(T===i){T=null;break}if(_=T.sibling,_!==null){_.return=T.return,T=_;break}T=T.return}_=T}wn(n,i,m.children,a),i=i.child}return i;case 9:return m=i.type,u=i.pendingProps.children,ws(i,a),m=Zn(m),u=u(m),i.flags|=1,wn(n,i,u,a),i.child;case 14:return u=i.type,m=ai(u,i.pendingProps),m=ai(u.type,m),up(n,i,u,m,a);case 15:return dp(n,i,i.type,i.pendingProps,a);case 17:return u=i.type,m=i.pendingProps,m=i.elementType===u?m:ai(u,m),tl(n,i),i.tag=1,Dn(u)?(n=!0,Fa(i)):n=!1,ws(i,a),np(i,u,m),Eu(i,u,m,a),bu(null,i,u,!0,n,a);case 19:return _p(n,i,a);case 22:return fp(n,i,a)}throw Error(t(156,i.tag))};function Gp(n,i){return ce(n,i)}function Fx(n,i,a,u){this.tag=n,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=i,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=u,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ei(n,i,a,u){return new Fx(n,i,a,u)}function $u(n){return n=n.prototype,!(!n||!n.isReactComponent)}function kx(n){if(typeof n=="function")return $u(n)?1:0;if(n!=null){if(n=n.$$typeof,n===ae)return 11;if(n===$)return 14}return 2}function hr(n,i){var a=n.alternate;return a===null?(a=ei(n.tag,i,n.key,n.mode),a.elementType=n.elementType,a.type=n.type,a.stateNode=n.stateNode,a.alternate=n,n.alternate=a):(a.pendingProps=i,a.type=n.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=n.flags&14680064,a.childLanes=n.childLanes,a.lanes=n.lanes,a.child=n.child,a.memoizedProps=n.memoizedProps,a.memoizedState=n.memoizedState,a.updateQueue=n.updateQueue,i=n.dependencies,a.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext},a.sibling=n.sibling,a.index=n.index,a.ref=n.ref,a}function fl(n,i,a,u,m,_){var T=2;if(u=n,typeof n=="function")$u(n)&&(T=1);else if(typeof n=="string")T=5;else e:switch(n){case I:return Xr(a.children,m,_,i);case ne:T=8,m|=8;break;case R:return n=ei(12,a,i,m|2),n.elementType=R,n.lanes=_,n;case me:return n=ei(13,a,i,m),n.elementType=me,n.lanes=_,n;case F:return n=ei(19,a,i,m),n.elementType=F,n.lanes=_,n;case K:return hl(a,m,_,i);default:if(typeof n=="object"&&n!==null)switch(n.$$typeof){case D:T=10;break e;case re:T=9;break e;case ae:T=11;break e;case $:T=14;break e;case J:T=16,u=null;break e}throw Error(t(130,n==null?n:typeof n,""))}return i=ei(T,a,i,m),i.elementType=n,i.type=u,i.lanes=_,i}function Xr(n,i,a,u){return n=ei(7,n,u,i),n.lanes=a,n}function hl(n,i,a,u){return n=ei(22,n,u,i),n.elementType=K,n.lanes=a,n.stateNode={isHidden:!1},n}function Yu(n,i,a){return n=ei(6,n,null,i),n.lanes=a,n}function qu(n,i,a){return i=ei(4,n.children!==null?n.children:[],n.key,i),i.lanes=a,i.stateNode={containerInfo:n.containerInfo,pendingChildren:null,implementation:n.implementation},i}function zx(n,i,a,u,m){this.tag=i,this.containerInfo=n,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=ls(0),this.expirationTimes=ls(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=ls(0),this.identifierPrefix=u,this.onRecoverableError=m,this.mutableSourceEagerHydrationData=null}function Ku(n,i,a,u,m,_,T,k,G){return n=new zx(n,i,a,k,G),i===1?(i=1,_===!0&&(i|=8)):i=0,_=ei(3,null,null,i),n.current=_,_.stateNode=n,_.memoizedState={element:u,isDehydrated:a,cache:null,transitions:null,pendingSuspenseBoundaries:null},cu(_),n}function Bx(n,i,a){var u=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:U,key:u==null?null:""+u,children:n,containerInfo:i,implementation:a}}function Wp(n){if(!n)return rr;n=n._reactInternals;e:{if(Ci(n)!==n||n.tag!==1)throw Error(t(170));var i=n;do{switch(i.tag){case 3:i=i.stateNode.context;break e;case 1:if(Dn(i.type)){i=i.stateNode.__reactInternalMemoizedMergedChildContext;break e}}i=i.return}while(i!==null);throw Error(t(171))}if(n.tag===1){var a=n.type;if(Dn(a))return xh(n,a,i)}return i}function jp(n,i,a,u,m,_,T,k,G){return n=Ku(a,u,!0,n,m,_,T,k,G),n.context=Wp(null),a=n.current,u=Tn(),m=dr(a),_=Ii(u,m),_.callback=i??null,ar(a,_,m),n.current.lanes=m,go(n,m,u),On(n,u),n}function pl(n,i,a,u){var m=i.current,_=Tn(),T=dr(m);return a=Wp(a),i.context===null?i.context=a:i.pendingContext=a,i=Ii(_,T),i.payload={element:n},u=u===void 0?null:u,u!==null&&(i.callback=u),n=ar(m,i,T),n!==null&&(ui(n,m,T,_),ja(n,m,T)),T}function ml(n){if(n=n.current,!n.child)return null;switch(n.child.tag){case 5:return n.child.stateNode;default:return n.child.stateNode}}function Xp(n,i){if(n=n.memoizedState,n!==null&&n.dehydrated!==null){var a=n.retryLane;n.retryLane=a!==0&&a<i?a:i}}function Zu(n,i){Xp(n,i),(n=n.alternate)&&Xp(n,i)}function Hx(){return null}var $p=typeof reportError=="function"?reportError:function(n){console.error(n)};function Ju(n){this._internalRoot=n}gl.prototype.render=Ju.prototype.render=function(n){var i=this._internalRoot;if(i===null)throw Error(t(409));pl(n,i,null,null)},gl.prototype.unmount=Ju.prototype.unmount=function(){var n=this._internalRoot;if(n!==null){this._internalRoot=null;var i=n.containerInfo;Gr(function(){pl(null,n,null,null)}),i[Pi]=null}};function gl(n){this._internalRoot=n}gl.prototype.unstable_scheduleHydration=function(n){if(n){var i=Pf();n={blockedOn:null,target:n,priority:i};for(var a=0;a<Qi.length&&i!==0&&i<Qi[a].priority;a++);Qi.splice(a,0,n),a===0&&Df(n)}};function Qu(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11)}function vl(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11&&(n.nodeType!==8||n.nodeValue!==" react-mount-point-unstable "))}function Yp(){}function Vx(n,i,a,u,m){if(m){if(typeof u=="function"){var _=u;u=function(){var le=ml(T);_.call(le)}}var T=jp(i,u,n,0,null,!1,!1,"",Yp);return n._reactRootContainer=T,n[Pi]=T.current,Po(n.nodeType===8?n.parentNode:n),Gr(),T}for(;m=n.lastChild;)n.removeChild(m);if(typeof u=="function"){var k=u;u=function(){var le=ml(G);k.call(le)}}var G=Ku(n,0,!1,null,null,!1,!1,"",Yp);return n._reactRootContainer=G,n[Pi]=G.current,Po(n.nodeType===8?n.parentNode:n),Gr(function(){pl(i,G,a,u)}),G}function xl(n,i,a,u,m){var _=a._reactRootContainer;if(_){var T=_;if(typeof m=="function"){var k=m;m=function(){var G=ml(T);k.call(G)}}pl(i,T,n,m)}else T=Vx(a,i,n,m,u);return ml(T)}Cf=function(n){switch(n.tag){case 3:var i=n.stateNode;if(i.current.memoizedState.isDehydrated){var a=Wt(i.pendingLanes);a!==0&&(Ec(i,a|1),On(i,Xe()),!(bt&6)&&(Rs=Xe()+500,sr()))}break;case 13:Gr(function(){var u=Ui(n,1);if(u!==null){var m=Tn();ui(u,n,1,m)}}),Zu(n,1)}},wc=function(n){if(n.tag===13){var i=Ui(n,134217728);if(i!==null){var a=Tn();ui(i,n,134217728,a)}Zu(n,134217728)}},Rf=function(n){if(n.tag===13){var i=dr(n),a=Ui(n,i);if(a!==null){var u=Tn();ui(a,n,i,u)}Zu(n,i)}},Pf=function(){return Pt},Lf=function(n,i){var a=Pt;try{return Pt=n,i()}finally{Pt=a}},Le=function(n,i,a){switch(i){case"input":if(wt(n,a),i=a.name,a.type==="radio"&&i!=null){for(a=n;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll("input[name="+JSON.stringify(""+i)+'][type="radio"]'),i=0;i<a.length;i++){var u=a[i];if(u!==n&&u.form===n.form){var m=Ia(u);if(!m)throw Error(t(90));ee(u),wt(u,m)}}}break;case"textarea":we(n,a);break;case"select":i=a.value,i!=null&&se(n,!!a.multiple,i,!1)}},tt=Wu,je=Gr;var Gx={usingClientEntryPoint:!1,Events:[Do,gs,Ia,oe,pe,Wu]},$o={findFiberByHostInstance:Ir,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Wx={bundleType:$o.bundleType,version:$o.version,rendererPackageName:$o.rendererPackageName,rendererConfig:$o.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:P.ReactCurrentDispatcher,findHostInstanceByFiber:function(n){return n=de(n),n===null?null:n.stateNode},findFiberByHostInstance:$o.findFiberByHostInstance||Hx,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var _l=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!_l.isDisabled&&_l.supportsFiber)try{Pn=_l.inject(Wx),At=_l}catch{}}return Fn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Gx,Fn.createPortal=function(n,i){var a=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Qu(i))throw Error(t(200));return Bx(n,i,null,a)},Fn.createRoot=function(n,i){if(!Qu(n))throw Error(t(299));var a=!1,u="",m=$p;return i!=null&&(i.unstable_strictMode===!0&&(a=!0),i.identifierPrefix!==void 0&&(u=i.identifierPrefix),i.onRecoverableError!==void 0&&(m=i.onRecoverableError)),i=Ku(n,1,!1,null,null,a,!1,u,m),n[Pi]=i.current,Po(n.nodeType===8?n.parentNode:n),new Ju(i)},Fn.findDOMNode=function(n){if(n==null)return null;if(n.nodeType===1)return n;var i=n._reactInternals;if(i===void 0)throw typeof n.render=="function"?Error(t(188)):(n=Object.keys(n).join(","),Error(t(268,n)));return n=de(i),n=n===null?null:n.stateNode,n},Fn.flushSync=function(n){return Gr(n)},Fn.hydrate=function(n,i,a){if(!vl(i))throw Error(t(200));return xl(null,n,i,!0,a)},Fn.hydrateRoot=function(n,i,a){if(!Qu(n))throw Error(t(405));var u=a!=null&&a.hydratedSources||null,m=!1,_="",T=$p;if(a!=null&&(a.unstable_strictMode===!0&&(m=!0),a.identifierPrefix!==void 0&&(_=a.identifierPrefix),a.onRecoverableError!==void 0&&(T=a.onRecoverableError)),i=jp(i,null,n,1,a??null,m,!1,_,T),n[Pi]=i.current,Po(n),u)for(n=0;n<u.length;n++)a=u[n],m=a._getVersion,m=m(a._source),i.mutableSourceEagerHydrationData==null?i.mutableSourceEagerHydrationData=[a,m]:i.mutableSourceEagerHydrationData.push(a,m);return new gl(i)},Fn.render=function(n,i,a){if(!vl(i))throw Error(t(200));return xl(null,n,i,!1,a)},Fn.unmountComponentAtNode=function(n){if(!vl(n))throw Error(t(40));return n._reactRootContainer?(Gr(function(){xl(null,null,n,!1,function(){n._reactRootContainer=null,n[Pi]=null})}),!0):!1},Fn.unstable_batchedUpdates=Wu,Fn.unstable_renderSubtreeIntoContainer=function(n,i,a,u){if(!vl(a))throw Error(t(200));if(n==null||n._reactInternals===void 0)throw Error(t(38));return xl(n,i,a,!1,u)},Fn.version="18.3.1-next-f1338f8080-20240426",Fn}var nm;function iv(){if(nm)return nd.exports;nm=1;function s(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s)}catch(e){console.error(e)}}return s(),nd.exports=t_(),nd.exports}var im;function n_(){if(im)return yl;im=1;var s=iv();return yl.createRoot=s.createRoot,yl.hydrateRoot=s.hydrateRoot,yl}var i_=n_();iv();/**
 * @remix-run/router v1.21.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function ra(){return ra=Object.assign?Object.assign.bind():function(s){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(s[r]=t[r])}return s},ra.apply(this,arguments)}var Sr;(function(s){s.Pop="POP",s.Push="PUSH",s.Replace="REPLACE"})(Sr||(Sr={}));const rm="popstate";function r_(s){s===void 0&&(s={});function e(r,o){let{pathname:l,search:d,hash:c}=r.location;return Gd("",{pathname:l,search:d,hash:c},o.state&&o.state.usr||null,o.state&&o.state.key||"default")}function t(r,o){return typeof o=="string"?o:Zl(o)}return o_(e,t,null,s)}function Xt(s,e){if(s===!1||s===null||typeof s>"u")throw new Error(e)}function rv(s,e){if(!s){typeof console<"u"&&console.warn(e);try{throw new Error(e)}catch{}}}function s_(){return Math.random().toString(36).substr(2,8)}function sm(s,e){return{usr:s.state,key:s.key,idx:e}}function Gd(s,e,t,r){return t===void 0&&(t=null),ra({pathname:typeof s=="string"?s:s.pathname,search:"",hash:""},typeof e=="string"?uo(e):e,{state:t,key:e&&e.key||r||s_()})}function Zl(s){let{pathname:e="/",search:t="",hash:r=""}=s;return t&&t!=="?"&&(e+=t.charAt(0)==="?"?t:"?"+t),r&&r!=="#"&&(e+=r.charAt(0)==="#"?r:"#"+r),e}function uo(s){let e={};if(s){let t=s.indexOf("#");t>=0&&(e.hash=s.substr(t),s=s.substr(0,t));let r=s.indexOf("?");r>=0&&(e.search=s.substr(r),s=s.substr(0,r)),s&&(e.pathname=s)}return e}function o_(s,e,t,r){r===void 0&&(r={});let{window:o=document.defaultView,v5Compat:l=!1}=r,d=o.history,c=Sr.Pop,f=null,h=p();h==null&&(h=0,d.replaceState(ra({},d.state,{idx:h}),""));function p(){return(d.state||{idx:null}).idx}function g(){c=Sr.Pop;let S=p(),v=S==null?null:S-h;h=S,f&&f({action:c,location:E.location,delta:v})}function y(S,v){c=Sr.Push;let w=Gd(E.location,S,v);h=p()+1;let A=sm(w,h),P=E.createHref(w);try{d.pushState(A,"",P)}catch(B){if(B instanceof DOMException&&B.name==="DataCloneError")throw B;o.location.assign(P)}l&&f&&f({action:c,location:E.location,delta:1})}function x(S,v){c=Sr.Replace;let w=Gd(E.location,S,v);h=p();let A=sm(w,h),P=E.createHref(w);d.replaceState(A,"",P),l&&f&&f({action:c,location:E.location,delta:0})}function M(S){let v=o.location.origin!=="null"?o.location.origin:o.location.href,w=typeof S=="string"?S:Zl(S);return w=w.replace(/ $/,"%20"),Xt(v,"No window.location.(origin|href) available to create URL for href: "+w),new URL(w,v)}let E={get action(){return c},get location(){return s(o,d)},listen(S){if(f)throw new Error("A history only accepts one active listener");return o.addEventListener(rm,g),f=S,()=>{o.removeEventListener(rm,g),f=null}},createHref(S){return e(o,S)},createURL:M,encodeLocation(S){let v=M(S);return{pathname:v.pathname,search:v.search,hash:v.hash}},push:y,replace:x,go(S){return d.go(S)}};return E}var om;(function(s){s.data="data",s.deferred="deferred",s.redirect="redirect",s.error="error"})(om||(om={}));function a_(s,e,t){return t===void 0&&(t="/"),l_(s,e,t)}function l_(s,e,t,r){let o=typeof e=="string"?uo(e):e,l=so(o.pathname||"/",t);if(l==null)return null;let d=sv(s);c_(d);let c=null;for(let f=0;c==null&&f<d.length;++f){let h=y_(l);c=x_(d[f],h)}return c}function sv(s,e,t,r){e===void 0&&(e=[]),t===void 0&&(t=[]),r===void 0&&(r="");let o=(l,d,c)=>{let f={relativePath:c===void 0?l.path||"":c,caseSensitive:l.caseSensitive===!0,childrenIndex:d,route:l};f.relativePath.startsWith("/")&&(Xt(f.relativePath.startsWith(r),'Absolute route path "'+f.relativePath+'" nested under path '+('"'+r+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),f.relativePath=f.relativePath.slice(r.length));let h=Tr([r,f.relativePath]),p=t.concat(f);l.children&&l.children.length>0&&(Xt(l.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+h+'".')),sv(l.children,e,p,h)),!(l.path==null&&!l.index)&&e.push({path:h,score:g_(h,l.index),routesMeta:p})};return s.forEach((l,d)=>{var c;if(l.path===""||!((c=l.path)!=null&&c.includes("?")))o(l,d);else for(let f of ov(l.path))o(l,d,f)}),e}function ov(s){let e=s.split("/");if(e.length===0)return[];let[t,...r]=e,o=t.endsWith("?"),l=t.replace(/\?$/,"");if(r.length===0)return o?[l,""]:[l];let d=ov(r.join("/")),c=[];return c.push(...d.map(f=>f===""?l:[l,f].join("/"))),o&&c.push(...d),c.map(f=>s.startsWith("/")&&f===""?"/":f)}function c_(s){s.sort((e,t)=>e.score!==t.score?t.score-e.score:v_(e.routesMeta.map(r=>r.childrenIndex),t.routesMeta.map(r=>r.childrenIndex)))}const u_=/^:[\w-]+$/,d_=3,f_=2,h_=1,p_=10,m_=-2,am=s=>s==="*";function g_(s,e){let t=s.split("/"),r=t.length;return t.some(am)&&(r+=m_),e&&(r+=f_),t.filter(o=>!am(o)).reduce((o,l)=>o+(u_.test(l)?d_:l===""?h_:p_),r)}function v_(s,e){return s.length===e.length&&s.slice(0,-1).every((r,o)=>r===e[o])?s[s.length-1]-e[e.length-1]:0}function x_(s,e,t){let{routesMeta:r}=s,o={},l="/",d=[];for(let c=0;c<r.length;++c){let f=r[c],h=c===r.length-1,p=l==="/"?e:e.slice(l.length)||"/",g=Wd({path:f.relativePath,caseSensitive:f.caseSensitive,end:h},p),y=f.route;if(!g)return null;Object.assign(o,g.params),d.push({params:o,pathname:Tr([l,g.pathname]),pathnameBase:w_(Tr([l,g.pathnameBase])),route:y}),g.pathnameBase!=="/"&&(l=Tr([l,g.pathnameBase]))}return d}function Wd(s,e){typeof s=="string"&&(s={path:s,caseSensitive:!1,end:!0});let[t,r]=__(s.path,s.caseSensitive,s.end),o=e.match(t);if(!o)return null;let l=o[0],d=l.replace(/(.)\/+$/,"$1"),c=o.slice(1);return{params:r.reduce((h,p,g)=>{let{paramName:y,isOptional:x}=p;if(y==="*"){let E=c[g]||"";d=l.slice(0,l.length-E.length).replace(/(.)\/+$/,"$1")}const M=c[g];return x&&!M?h[y]=void 0:h[y]=(M||"").replace(/%2F/g,"/"),h},{}),pathname:l,pathnameBase:d,pattern:s}}function __(s,e,t){e===void 0&&(e=!1),t===void 0&&(t=!0),rv(s==="*"||!s.endsWith("*")||s.endsWith("/*"),'Route path "'+s+'" will be treated as if it were '+('"'+s.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+s.replace(/\*$/,"/*")+'".'));let r=[],o="^"+s.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(d,c,f)=>(r.push({paramName:c,isOptional:f!=null}),f?"/?([^\\/]+)?":"/([^\\/]+)"));return s.endsWith("*")?(r.push({paramName:"*"}),o+=s==="*"||s==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):t?o+="\\/*$":s!==""&&s!=="/"&&(o+="(?:(?=\\/|$))"),[new RegExp(o,e?void 0:"i"),r]}function y_(s){try{return s.split("/").map(e=>decodeURIComponent(e).replace(/\//g,"%2F")).join("/")}catch(e){return rv(!1,'The URL path "'+s+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+e+").")),s}}function so(s,e){if(e==="/")return s;if(!s.toLowerCase().startsWith(e.toLowerCase()))return null;let t=e.endsWith("/")?e.length-1:e.length,r=s.charAt(t);return r&&r!=="/"?null:s.slice(t)||"/"}function S_(s,e){e===void 0&&(e="/");let{pathname:t,search:r="",hash:o=""}=typeof s=="string"?uo(s):s;return{pathname:t?t.startsWith("/")?t:M_(t,e):e,search:T_(r),hash:A_(o)}}function M_(s,e){let t=e.replace(/\/+$/,"").split("/");return s.split("/").forEach(o=>{o===".."?t.length>1&&t.pop():o!=="."&&t.push(o)}),t.length>1?t.join("/"):"/"}function sd(s,e,t,r){return"Cannot include a '"+s+"' character in a manually specified "+("`to."+e+"` field ["+JSON.stringify(r)+"].  Please separate it out to the ")+("`to."+t+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function E_(s){return s.filter((e,t)=>t===0||e.route.path&&e.route.path.length>0)}function av(s,e){let t=E_(s);return e?t.map((r,o)=>o===t.length-1?r.pathname:r.pathnameBase):t.map(r=>r.pathnameBase)}function lv(s,e,t,r){r===void 0&&(r=!1);let o;typeof s=="string"?o=uo(s):(o=ra({},s),Xt(!o.pathname||!o.pathname.includes("?"),sd("?","pathname","search",o)),Xt(!o.pathname||!o.pathname.includes("#"),sd("#","pathname","hash",o)),Xt(!o.search||!o.search.includes("#"),sd("#","search","hash",o)));let l=s===""||o.pathname==="",d=l?"/":o.pathname,c;if(d==null)c=t;else{let g=e.length-1;if(!r&&d.startsWith("..")){let y=d.split("/");for(;y[0]==="..";)y.shift(),g-=1;o.pathname=y.join("/")}c=g>=0?e[g]:"/"}let f=S_(o,c),h=d&&d!=="/"&&d.endsWith("/"),p=(l||d===".")&&t.endsWith("/");return!f.pathname.endsWith("/")&&(h||p)&&(f.pathname+="/"),f}const Tr=s=>s.join("/").replace(/\/\/+/g,"/"),w_=s=>s.replace(/\/+$/,"").replace(/^\/*/,"/"),T_=s=>!s||s==="?"?"":s.startsWith("?")?s:"?"+s,A_=s=>!s||s==="#"?"":s.startsWith("#")?s:"#"+s;function b_(s){return s!=null&&typeof s.status=="number"&&typeof s.statusText=="string"&&typeof s.internal=="boolean"&&"data"in s}const cv=["post","put","patch","delete"];new Set(cv);const C_=["get",...cv];new Set(C_);/**
 * React Router v6.28.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function sa(){return sa=Object.assign?Object.assign.bind():function(s){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(s[r]=t[r])}return s},sa.apply(this,arguments)}const fc=ue.createContext(null),uv=ue.createContext(null),Lr=ue.createContext(null),hc=ue.createContext(null),$i=ue.createContext({outlet:null,matches:[],isDataRoute:!1}),dv=ue.createContext(null);function R_(s,e){let{relative:t}=e===void 0?{}:e;ca()||Xt(!1);let{basename:r,navigator:o}=ue.useContext(Lr),{hash:l,pathname:d,search:c}=pc(s,{relative:t}),f=d;return r!=="/"&&(f=d==="/"?r:Tr([r,d])),o.createHref({pathname:f,search:c,hash:l})}function ca(){return ue.useContext(hc)!=null}function ua(){return ca()||Xt(!1),ue.useContext(hc).location}function fv(s){ue.useContext(Lr).static||ue.useLayoutEffect(s)}function P_(){let{isDataRoute:s}=ue.useContext($i);return s?X_():L_()}function L_(){ca()||Xt(!1);let s=ue.useContext(fc),{basename:e,future:t,navigator:r}=ue.useContext(Lr),{matches:o}=ue.useContext($i),{pathname:l}=ua(),d=JSON.stringify(av(o,t.v7_relativeSplatPath)),c=ue.useRef(!1);return fv(()=>{c.current=!0}),ue.useCallback(function(h,p){if(p===void 0&&(p={}),!c.current)return;if(typeof h=="number"){r.go(h);return}let g=lv(h,JSON.parse(d),l,p.relative==="path");s==null&&e!=="/"&&(g.pathname=g.pathname==="/"?e:Tr([e,g.pathname])),(p.replace?r.replace:r.push)(g,p.state,p)},[e,r,d,l,s])}const N_=ue.createContext(null);function D_(s){let e=ue.useContext($i).outlet;return e&&ue.createElement(N_.Provider,{value:s},e)}function U_(){let{matches:s}=ue.useContext($i),e=s[s.length-1];return e?e.params:{}}function pc(s,e){let{relative:t}=e===void 0?{}:e,{future:r}=ue.useContext(Lr),{matches:o}=ue.useContext($i),{pathname:l}=ua(),d=JSON.stringify(av(o,r.v7_relativeSplatPath));return ue.useMemo(()=>lv(s,JSON.parse(d),l,t==="path"),[s,d,l,t])}function I_(s,e){return O_(s,e)}function O_(s,e,t,r){ca()||Xt(!1);let{navigator:o}=ue.useContext(Lr),{matches:l}=ue.useContext($i),d=l[l.length-1],c=d?d.params:{};d&&d.pathname;let f=d?d.pathnameBase:"/";d&&d.route;let h=ua(),p;if(e){var g;let S=typeof e=="string"?uo(e):e;f==="/"||(g=S.pathname)!=null&&g.startsWith(f)||Xt(!1),p=S}else p=h;let y=p.pathname||"/",x=y;if(f!=="/"){let S=f.replace(/^\//,"").split("/");x="/"+y.replace(/^\//,"").split("/").slice(S.length).join("/")}let M=a_(s,{pathname:x}),E=H_(M&&M.map(S=>Object.assign({},S,{params:Object.assign({},c,S.params),pathname:Tr([f,o.encodeLocation?o.encodeLocation(S.pathname).pathname:S.pathname]),pathnameBase:S.pathnameBase==="/"?f:Tr([f,o.encodeLocation?o.encodeLocation(S.pathnameBase).pathname:S.pathnameBase])})),l,t,r);return e&&E?ue.createElement(hc.Provider,{value:{location:sa({pathname:"/",search:"",hash:"",state:null,key:"default"},p),navigationType:Sr.Pop}},E):E}function F_(){let s=j_(),e=b_(s)?s.status+" "+s.statusText:s instanceof Error?s.message:JSON.stringify(s),t=s instanceof Error?s.stack:null,o={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return ue.createElement(ue.Fragment,null,ue.createElement("h2",null,"Unexpected Application Error!"),ue.createElement("h3",{style:{fontStyle:"italic"}},e),t?ue.createElement("pre",{style:o},t):null,null)}const k_=ue.createElement(F_,null);class z_ extends ue.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){console.error("React Router caught the following error during render",e,t)}render(){return this.state.error!==void 0?ue.createElement($i.Provider,{value:this.props.routeContext},ue.createElement(dv.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function B_(s){let{routeContext:e,match:t,children:r}=s,o=ue.useContext(fc);return o&&o.static&&o.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(o.staticContext._deepestRenderedBoundaryId=t.route.id),ue.createElement($i.Provider,{value:e},r)}function H_(s,e,t,r){var o;if(e===void 0&&(e=[]),t===void 0&&(t=null),r===void 0&&(r=null),s==null){var l;if(!t)return null;if(t.errors)s=t.matches;else if((l=r)!=null&&l.v7_partialHydration&&e.length===0&&!t.initialized&&t.matches.length>0)s=t.matches;else return null}let d=s,c=(o=t)==null?void 0:o.errors;if(c!=null){let p=d.findIndex(g=>g.route.id&&(c==null?void 0:c[g.route.id])!==void 0);p>=0||Xt(!1),d=d.slice(0,Math.min(d.length,p+1))}let f=!1,h=-1;if(t&&r&&r.v7_partialHydration)for(let p=0;p<d.length;p++){let g=d[p];if((g.route.HydrateFallback||g.route.hydrateFallbackElement)&&(h=p),g.route.id){let{loaderData:y,errors:x}=t,M=g.route.loader&&y[g.route.id]===void 0&&(!x||x[g.route.id]===void 0);if(g.route.lazy||M){f=!0,h>=0?d=d.slice(0,h+1):d=[d[0]];break}}}return d.reduceRight((p,g,y)=>{let x,M=!1,E=null,S=null;t&&(x=c&&g.route.id?c[g.route.id]:void 0,E=g.route.errorElement||k_,f&&(h<0&&y===0?($_("route-fallback"),M=!0,S=null):h===y&&(M=!0,S=g.route.hydrateFallbackElement||null)));let v=e.concat(d.slice(0,y+1)),w=()=>{let A;return x?A=E:M?A=S:g.route.Component?A=ue.createElement(g.route.Component,null):g.route.element?A=g.route.element:A=p,ue.createElement(B_,{match:g,routeContext:{outlet:p,matches:v,isDataRoute:t!=null},children:A})};return t&&(g.route.ErrorBoundary||g.route.errorElement||y===0)?ue.createElement(z_,{location:t.location,revalidation:t.revalidation,component:E,error:x,children:w(),routeContext:{outlet:null,matches:v,isDataRoute:!0}}):w()},null)}var hv=function(s){return s.UseBlocker="useBlocker",s.UseRevalidator="useRevalidator",s.UseNavigateStable="useNavigate",s}(hv||{}),pv=function(s){return s.UseBlocker="useBlocker",s.UseLoaderData="useLoaderData",s.UseActionData="useActionData",s.UseRouteError="useRouteError",s.UseNavigation="useNavigation",s.UseRouteLoaderData="useRouteLoaderData",s.UseMatches="useMatches",s.UseRevalidator="useRevalidator",s.UseNavigateStable="useNavigate",s.UseRouteId="useRouteId",s}(pv||{});function V_(s){let e=ue.useContext(fc);return e||Xt(!1),e}function G_(s){let e=ue.useContext(uv);return e||Xt(!1),e}function W_(s){let e=ue.useContext($i);return e||Xt(!1),e}function mv(s){let e=W_(),t=e.matches[e.matches.length-1];return t.route.id||Xt(!1),t.route.id}function j_(){var s;let e=ue.useContext(dv),t=G_(),r=mv();return e!==void 0?e:(s=t.errors)==null?void 0:s[r]}function X_(){let{router:s}=V_(hv.UseNavigateStable),e=mv(pv.UseNavigateStable),t=ue.useRef(!1);return fv(()=>{t.current=!0}),ue.useCallback(function(o,l){l===void 0&&(l={}),t.current&&(typeof o=="number"?s.navigate(o):s.navigate(o,sa({fromRouteId:e},l)))},[s,e])}const lm={};function $_(s,e,t){lm[s]||(lm[s]=!0)}const cm={};function Y_(s,e){cm[e]||(cm[e]=!0,console.warn(e))}const um=(s,e,t)=>Y_(s,"⚠️ React Router Future Flag Warning: "+e+". "+("You can use the `"+s+"` future flag to opt-in early. ")+("For more information, see "+t+"."));function q_(s,e){s!=null&&s.v7_startTransition||um("v7_startTransition","React Router will begin wrapping state updates in `React.startTransition` in v7","https://reactrouter.com/v6/upgrading/future#v7_starttransition"),s!=null&&s.v7_relativeSplatPath||um("v7_relativeSplatPath","Relative route resolution within Splat routes is changing in v7","https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath")}function K_(s){return D_(s.context)}function Zs(s){Xt(!1)}function Z_(s){let{basename:e="/",children:t=null,location:r,navigationType:o=Sr.Pop,navigator:l,static:d=!1,future:c}=s;ca()&&Xt(!1);let f=e.replace(/^\/*/,"/"),h=ue.useMemo(()=>({basename:f,navigator:l,static:d,future:sa({v7_relativeSplatPath:!1},c)}),[f,c,l,d]);typeof r=="string"&&(r=uo(r));let{pathname:p="/",search:g="",hash:y="",state:x=null,key:M="default"}=r,E=ue.useMemo(()=>{let S=so(p,f);return S==null?null:{location:{pathname:S,search:g,hash:y,state:x,key:M},navigationType:o}},[f,p,g,y,x,M,o]);return E==null?null:ue.createElement(Lr.Provider,{value:h},ue.createElement(hc.Provider,{children:t,value:E}))}function J_(s){let{children:e,location:t}=s;return I_(jd(e),t)}new Promise(()=>{});function jd(s,e){e===void 0&&(e=[]);let t=[];return ue.Children.forEach(s,(r,o)=>{if(!ue.isValidElement(r))return;let l=[...e,o];if(r.type===ue.Fragment){t.push.apply(t,jd(r.props.children,l));return}r.type!==Zs&&Xt(!1),!r.props.index||!r.props.children||Xt(!1);let d={id:r.props.id||l.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,loader:r.props.loader,action:r.props.action,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(d.children=jd(r.props.children,l)),t.push(d)}),t}/**
 * React Router DOM v6.28.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Jl(){return Jl=Object.assign?Object.assign.bind():function(s){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(s[r]=t[r])}return s},Jl.apply(this,arguments)}function gv(s,e){if(s==null)return{};var t={},r=Object.keys(s),o,l;for(l=0;l<r.length;l++)o=r[l],!(e.indexOf(o)>=0)&&(t[o]=s[o]);return t}function Q_(s){return!!(s.metaKey||s.altKey||s.ctrlKey||s.shiftKey)}function ey(s,e){return s.button===0&&(!e||e==="_self")&&!Q_(s)}const ty=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],ny=["aria-current","caseSensitive","className","end","style","to","viewTransition","children"],iy="6";try{window.__reactRouterVersion=iy}catch{}const ry=ue.createContext({isTransitioning:!1}),sy="startTransition",dm=Jx[sy];function oy(s){let{basename:e,children:t,future:r,window:o}=s,l=ue.useRef();l.current==null&&(l.current=r_({window:o,v5Compat:!0}));let d=l.current,[c,f]=ue.useState({action:d.action,location:d.location}),{v7_startTransition:h}=r||{},p=ue.useCallback(g=>{h&&dm?dm(()=>f(g)):f(g)},[f,h]);return ue.useLayoutEffect(()=>d.listen(p),[d,p]),ue.useEffect(()=>q_(r),[r]),ue.createElement(Z_,{basename:e,children:t,location:c.location,navigationType:c.action,navigator:d,future:r})}const ay=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",ly=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,vv=ue.forwardRef(function(e,t){let{onClick:r,relative:o,reloadDocument:l,replace:d,state:c,target:f,to:h,preventScrollReset:p,viewTransition:g}=e,y=gv(e,ty),{basename:x}=ue.useContext(Lr),M,E=!1;if(typeof h=="string"&&ly.test(h)&&(M=h,ay))try{let A=new URL(window.location.href),P=h.startsWith("//")?new URL(A.protocol+h):new URL(h),B=so(P.pathname,x);P.origin===A.origin&&B!=null?h=B+P.search+P.hash:E=!0}catch{}let S=R_(h,{relative:o}),v=uy(h,{replace:d,state:c,target:f,preventScrollReset:p,relative:o,viewTransition:g});function w(A){r&&r(A),A.defaultPrevented||v(A)}return ue.createElement("a",Jl({},y,{href:M||S,onClick:E||l?r:w,ref:t,target:f}))}),fm=ue.forwardRef(function(e,t){let{"aria-current":r="page",caseSensitive:o=!1,className:l="",end:d=!1,style:c,to:f,viewTransition:h,children:p}=e,g=gv(e,ny),y=pc(f,{relative:g.relative}),x=ua(),M=ue.useContext(uv),{navigator:E,basename:S}=ue.useContext(Lr),v=M!=null&&dy(y)&&h===!0,w=E.encodeLocation?E.encodeLocation(y).pathname:y.pathname,A=x.pathname,P=M&&M.navigation&&M.navigation.location?M.navigation.location.pathname:null;o||(A=A.toLowerCase(),P=P?P.toLowerCase():null,w=w.toLowerCase()),P&&S&&(P=so(P,S)||P);const B=w!=="/"&&w.endsWith("/")?w.length-1:w.length;let U=A===w||!d&&A.startsWith(w)&&A.charAt(B)==="/",I=P!=null&&(P===w||!d&&P.startsWith(w)&&P.charAt(w.length)==="/"),ne={isActive:U,isPending:I,isTransitioning:v},R=U?r:void 0,D;typeof l=="function"?D=l(ne):D=[l,U?"active":null,I?"pending":null,v?"transitioning":null].filter(Boolean).join(" ");let re=typeof c=="function"?c(ne):c;return ue.createElement(vv,Jl({},g,{"aria-current":R,className:D,ref:t,style:re,to:f,viewTransition:h}),typeof p=="function"?p(ne):p)});var Xd;(function(s){s.UseScrollRestoration="useScrollRestoration",s.UseSubmit="useSubmit",s.UseSubmitFetcher="useSubmitFetcher",s.UseFetcher="useFetcher",s.useViewTransitionState="useViewTransitionState"})(Xd||(Xd={}));var hm;(function(s){s.UseFetcher="useFetcher",s.UseFetchers="useFetchers",s.UseScrollRestoration="useScrollRestoration"})(hm||(hm={}));function cy(s){let e=ue.useContext(fc);return e||Xt(!1),e}function uy(s,e){let{target:t,replace:r,state:o,preventScrollReset:l,relative:d,viewTransition:c}=e===void 0?{}:e,f=P_(),h=ua(),p=pc(s,{relative:d});return ue.useCallback(g=>{if(ey(g,t)){g.preventDefault();let y=r!==void 0?r:Zl(h)===Zl(p);f(s,{replace:y,state:o,preventScrollReset:l,relative:d,viewTransition:c})}},[h,f,p,r,o,t,s,l,d,c])}function dy(s,e){e===void 0&&(e={});let t=ue.useContext(ry);t==null&&Xt(!1);let{basename:r}=cy(Xd.useViewTransitionState),o=pc(s,{relative:e.relative});if(!t.isTransitioning)return!1;let l=so(t.currentLocation.pathname,r)||t.currentLocation.pathname,d=so(t.nextLocation.pathname,r)||t.nextLocation.pathname;return Wd(o.pathname,d)!=null||Wd(o.pathname,l)!=null}async function wi(s,e){const t=await fetch(s,e),r=await t.json().catch(()=>({}));if(!t.ok)throw new Error(r.detail||t.statusText);return r}const rs=(s,e)=>wi(s,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e??{})}),$d=(s,e,t,r)=>{const o=new FormData;return o.append(e,t,r),wi(s,{method:"POST",body:o})};function cf(s,e){return new Promise(t=>{const r=new EventSource(`/api/jobs/${s}/events`);r.onmessage=o=>{const l=JSON.parse(o.data);e(l),(l.stage==="done"||l.stage==="failed")&&(r.close(),t(l))}})}const nn=s=>`${Math.round((s??0)*100)}%`;async function fy(s){const t=await new AudioContext().decodeAudioData(await s.arrayBuffer()),r=new OfflineAudioContext(1,Math.ceil(t.duration*16e3),16e3),o=r.createBufferSource();o.buffer=t,o.connect(r.destination),o.start();const l=(await r.startRendering()).getChannelData(0),d=new DataView(new ArrayBuffer(44+l.length*2)),c=(f,h)=>[...h].forEach((p,g)=>d.setUint8(f+g,p.charCodeAt(0)));return c(0,"RIFF"),d.setUint32(4,36+l.length*2,!0),c(8,"WAVEfmt "),d.setUint32(16,16,!0),d.setUint16(20,1,!0),d.setUint16(22,1,!0),d.setUint32(24,16e3,!0),d.setUint32(28,32e3,!0),d.setUint16(32,2,!0),d.setUint16(34,16,!0),c(36,"data"),d.setUint32(40,l.length*2,!0),l.forEach((f,h)=>d.setInt16(44+h*2,Math.max(-1,Math.min(1,f))*32767,!0)),new Blob([d],{type:"audio/wav"})}function xv(s=0){const[e,t]=ue.useState(null);return ue.useEffect(()=>{wi("/api/versions").then(t).catch(()=>{})},[s]),e}const hy=[["/","Break it"],["/arena","You vs Muse"],["/agent","Agent"],["/report","Report"]];function py({className:s=""}){return b.jsxs("span",{className:`inline-grid gap-[3px] ${s}`,"aria-hidden":!0,children:[b.jsx("i",{className:"block h-[3px] w-4 bg-ember"}),b.jsx("i",{className:"ml-1 block h-[3px] w-3 bg-ember"}),b.jsx("i",{className:"block h-[3px] w-4 bg-ember"})]})}function my(){const s=xv();return b.jsxs("div",{className:"min-h-dvh",children:[b.jsx("header",{className:"sticky top-3 z-20 flex justify-center px-3 pt-4 sm:top-4 sm:pt-5",children:b.jsxs("div",{className:"flex max-w-full items-center gap-1 rounded-full border border-white/10 bg-white/[.04] p-1.5 pl-5 shadow-[0_8px_32px_rgba(0,0,0,.45),inset_0_1px_0_rgba(255,255,255,.06)] backdrop-blur-xl backdrop-saturate-150",children:[b.jsxs(fm,{to:"/",className:"mr-3 flex shrink-0 items-center gap-2.5 text-base font-medium tracking-tight",children:[b.jsx(py,{})," ",b.jsx("span",{className:"hidden sm:inline",children:"nemesis"})]}),b.jsx("nav",{className:"flex min-w-0 gap-1 overflow-x-auto",children:hy.map(([e,t])=>b.jsx(fm,{to:e,end:e==="/",className:({isActive:r})=>`whitespace-nowrap rounded-full px-3 py-2 text-[15px] transition-colors sm:px-4 ${r?"bg-white/10 text-ink":"text-mute hover:text-ink"}`,children:t},e))}),s&&b.jsx("span",{className:"ml-2 hidden shrink-0 rounded-full bg-white/[.06] px-3.5 py-2 font-mono text-[13px] text-mute md:block",children:s.live})]})}),b.jsx("main",{className:"mx-auto max-w-7xl px-5 pt-8 pb-24 sm:px-8",children:b.jsx(K_,{})}),b.jsxs("footer",{className:"mx-auto flex max-w-7xl flex-wrap justify-between gap-4 border-t border-line px-5 py-8 text-xs text-faint sm:px-8",children:[b.jsx("span",{children:"Muse Wonder · Muse Spark · Muse Voice Transcribe · Muse Glimmer · MuJoCo MJX"}),b.jsx("a",{className:"hover:text-mute",href:"https://github.com/divagr18/nemesis",children:"source"})]})]})}/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gy=s=>s.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),_v=(...s)=>s.filter((e,t,r)=>!!e&&e.trim()!==""&&r.indexOf(e)===t).join(" ").trim();/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var vy={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xy=ue.forwardRef(({color:s="currentColor",size:e=24,strokeWidth:t=2,absoluteStrokeWidth:r,className:o="",children:l,iconNode:d,...c},f)=>ue.createElement("svg",{ref:f,...vy,width:e,height:e,stroke:s,strokeWidth:r?Number(t)*24/Number(e):t,className:_v("lucide",o),...c},[...d.map(([h,p])=>ue.createElement(h,p)),...Array.isArray(l)?l:[l]]));/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gi=(s,e)=>{const t=ue.forwardRef(({className:r,...o},l)=>ue.createElement(xy,{ref:l,iconNode:e,className:_v(`lucide-${gy(s)}`,r),...o}));return t.displayName=`${s}`,t};/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const da=gi("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yv=gi("ArrowUp",[["path",{d:"m5 12 7-7 7 7",key:"hav0vg"}],["path",{d:"M12 19V5",key:"x0mq9r"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _y=gi("Camera",[["path",{d:"M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",key:"1tc9qg"}],["circle",{cx:"12",cy:"13",r:"3",key:"1vg3eu"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mc=gi("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uf=gi("LoaderCircle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yy=gi("Lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sy=gi("Mic",[["path",{d:"M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z",key:"131961"}],["path",{d:"M19 10v2a7 7 0 0 1-14 0v-2",key:"1vc78b"}],["line",{x1:"12",x2:"12",y1:"19",y2:"22",key:"x3vr5v"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const My=gi("RotateCcw",[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ey=gi("Share",[["path",{d:"M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8",key:"1b2hhj"}],["polyline",{points:"16 6 12 2 8 6",key:"m901s6"}],["line",{x1:"12",x2:"12",y1:"2",y2:"15",key:"1p0rca"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wy=gi("Square",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const df=gi("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);function Ty({events:s}){const e=s.at(-1),t=s.filter(c=>c.stage==="progress").at(-1),r=s.find(c=>c.stage==="verified"||c.stage==="rejected"),o=r?r.stage==="verified"?`${r.version} is live`:"Kept the old robot":(e==null?void 0:e.stage)==="gating"?"Checking for regressions":(e==null?void 0:e.stage)==="bank"?"Building lessons":"Retraining",l=r||(e==null?void 0:e.stage)==="gating"?1:t?t.step/t.total:.04,d=r==null?void 0:r.gate;return b.jsxs("div",{className:"rise rounded-xl border border-line px-4 py-3.5",children:[b.jsxs("p",{className:"text-[14px]",children:[o,!r&&b.jsx("span",{className:"blink text-ember",children:" ●"})]}),b.jsx("div",{className:"mt-3 h-px overflow-hidden bg-line",children:b.jsx("div",{className:"h-full bg-ember transition-[width] duration-700",style:{width:`${l*100}%`}})}),d&&b.jsx("div",{className:"mt-3 space-y-1.5 text-[13px] text-mute",children:[["Fixed",d.checks["fixes the attack"],`${nn(d.suites.attacks.before)} → ${nn(d.suites.attacks.after)} falls`],["Still walks",d.checks["still walks"],`${d.suites.nominal.progress_after.toFixed(1)} m in 5 s`],["Nothing else broke",d.checks["no regressions"],`${nn(d.suites.gauntlet.before)} → ${nn(d.suites.gauntlet.after)}`]].map(([c,f,h])=>b.jsxs("p",{className:"flex items-center gap-2",children:[f?b.jsx(mc,{size:13,className:"text-acid"}):b.jsx(df,{size:13,className:"text-ember"})," ",c," ",b.jsxs("span",{className:"text-faint",children:["· ",h]})]},c))})]})}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ff="160",Ls={ROTATE:0,DOLLY:1,PAN:2},Ns={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Ay=0,pm=1,by=2,Sv=1,Mv=2,Gi=3,Pr=0,Rn=1,Ei=2,Ar=0,to=1,mm=2,gm=3,vm=4,Cy=5,Jr=100,Ry=101,Py=102,xm=103,_m=104,Ly=200,Ny=201,Dy=202,Uy=203,Yd=204,qd=205,Iy=206,Oy=207,Fy=208,ky=209,zy=210,By=211,Hy=212,Vy=213,Gy=214,Wy=0,jy=1,Xy=2,Ql=3,$y=4,Yy=5,qy=6,Ky=7,Ev=0,Zy=1,Jy=2,br=0,Qy=1,eS=2,tS=3,wv=4,nS=5,iS=6,Tv=300,oo=301,ao=302,Kd=303,Zd=304,gc=306,ec=1e3,pi=1001,Jd=1002,Cn=1003,ym=1004,od=1005,ni=1006,rS=1007,oa=1008,Cr=1009,sS=1010,oS=1011,hf=1012,Av=1013,Mr=1014,Er=1015,aa=1016,bv=1017,Cv=1018,ts=1020,aS=1021,mi=1023,lS=1024,cS=1025,ns=1026,lo=1027,uS=1028,Rv=1029,dS=1030,Pv=1031,Lv=1033,ad=33776,ld=33777,cd=33778,ud=33779,Sm=35840,Mm=35841,Em=35842,wm=35843,Nv=36196,Tm=37492,Am=37496,bm=37808,Cm=37809,Rm=37810,Pm=37811,Lm=37812,Nm=37813,Dm=37814,Um=37815,Im=37816,Om=37817,Fm=37818,km=37819,zm=37820,Bm=37821,dd=36492,Hm=36494,Vm=36495,fS=36283,Gm=36284,Wm=36285,jm=36286,Dv=3e3,is=3001,hS=3200,pS=3201,Uv=0,mS=1,ri="",dn="srgb",ji="srgb-linear",pf="display-p3",vc="display-p3-linear",tc="linear",Ot="srgb",nc="rec709",ic="p3",Ds=7680,Xm=519,gS=512,vS=513,xS=514,Iv=515,_S=516,yS=517,SS=518,MS=519,$m=35044,Ym="300 es",Qd=1035,Wi=2e3,rc=2001;class as{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const r=this._listeners;r[e]===void 0&&(r[e]=[]),r[e].indexOf(t)===-1&&r[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const r=this._listeners;return r[e]!==void 0&&r[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const o=this._listeners[e];if(o!==void 0){const l=o.indexOf(t);l!==-1&&o.splice(l,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const r=this._listeners[e.type];if(r!==void 0){e.target=this;const o=r.slice(0);for(let l=0,d=o.length;l<d;l++)o[l].call(this,e);e.target=null}}}const _n=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let qm=1234567;const no=Math.PI/180,la=180/Math.PI;function fo(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(_n[s&255]+_n[s>>8&255]+_n[s>>16&255]+_n[s>>24&255]+"-"+_n[e&255]+_n[e>>8&255]+"-"+_n[e>>16&15|64]+_n[e>>24&255]+"-"+_n[t&63|128]+_n[t>>8&255]+"-"+_n[t>>16&255]+_n[t>>24&255]+_n[r&255]+_n[r>>8&255]+_n[r>>16&255]+_n[r>>24&255]).toLowerCase()}function tn(s,e,t){return Math.max(e,Math.min(t,s))}function mf(s,e){return(s%e+e)%e}function ES(s,e,t,r,o){return r+(s-e)*(o-r)/(t-e)}function wS(s,e,t){return s!==e?(t-s)/(e-s):0}function ea(s,e,t){return(1-t)*s+t*e}function TS(s,e,t,r){return ea(s,e,1-Math.exp(-t*r))}function AS(s,e=1){return e-Math.abs(mf(s,e*2)-e)}function bS(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function CS(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function RS(s,e){return s+Math.floor(Math.random()*(e-s+1))}function PS(s,e){return s+Math.random()*(e-s)}function LS(s){return s*(.5-Math.random())}function NS(s){s!==void 0&&(qm=s);let e=qm+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function DS(s){return s*no}function US(s){return s*la}function ef(s){return(s&s-1)===0&&s!==0}function IS(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function sc(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function OS(s,e,t,r,o){const l=Math.cos,d=Math.sin,c=l(t/2),f=d(t/2),h=l((e+r)/2),p=d((e+r)/2),g=l((e-r)/2),y=d((e-r)/2),x=l((r-e)/2),M=d((r-e)/2);switch(o){case"XYX":s.set(c*p,f*g,f*y,c*h);break;case"YZY":s.set(f*y,c*p,f*g,c*h);break;case"ZXZ":s.set(f*g,f*y,c*p,c*h);break;case"XZX":s.set(c*p,f*M,f*x,c*h);break;case"YXY":s.set(f*x,c*p,f*M,c*h);break;case"ZYZ":s.set(f*M,f*x,c*p,c*h);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+o)}}function Js(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function An(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const es={DEG2RAD:no,RAD2DEG:la,generateUUID:fo,clamp:tn,euclideanModulo:mf,mapLinear:ES,inverseLerp:wS,lerp:ea,damp:TS,pingpong:AS,smoothstep:bS,smootherstep:CS,randInt:RS,randFloat:PS,randFloatSpread:LS,seededRandom:NS,degToRad:DS,radToDeg:US,isPowerOfTwo:ef,ceilPowerOfTwo:IS,floorPowerOfTwo:sc,setQuaternionFromProperEuler:OS,normalize:An,denormalize:Js};class Be{constructor(e=0,t=0){Be.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,r=this.y,o=e.elements;return this.x=o[0]*t+o[3]*r+o[6],this.y=o[1]*t+o[4]*r+o[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Math.max(e,Math.min(t,r)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const r=this.dot(e)/t;return Math.acos(tn(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,r=this.y-e.y;return t*t+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const r=Math.cos(t),o=Math.sin(t),l=this.x-e.x,d=this.y-e.y;return this.x=l*r-d*o+e.x,this.y=l*o+d*r+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Mt{constructor(e,t,r,o,l,d,c,f,h){Mt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,r,o,l,d,c,f,h)}set(e,t,r,o,l,d,c,f,h){const p=this.elements;return p[0]=e,p[1]=o,p[2]=c,p[3]=t,p[4]=l,p[5]=f,p[6]=r,p[7]=d,p[8]=h,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,r=e.elements;return t[0]=r[0],t[1]=r[1],t[2]=r[2],t[3]=r[3],t[4]=r[4],t[5]=r[5],t[6]=r[6],t[7]=r[7],t[8]=r[8],this}extractBasis(e,t,r){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),r.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const r=e.elements,o=t.elements,l=this.elements,d=r[0],c=r[3],f=r[6],h=r[1],p=r[4],g=r[7],y=r[2],x=r[5],M=r[8],E=o[0],S=o[3],v=o[6],w=o[1],A=o[4],P=o[7],B=o[2],U=o[5],I=o[8];return l[0]=d*E+c*w+f*B,l[3]=d*S+c*A+f*U,l[6]=d*v+c*P+f*I,l[1]=h*E+p*w+g*B,l[4]=h*S+p*A+g*U,l[7]=h*v+p*P+g*I,l[2]=y*E+x*w+M*B,l[5]=y*S+x*A+M*U,l[8]=y*v+x*P+M*I,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],r=e[1],o=e[2],l=e[3],d=e[4],c=e[5],f=e[6],h=e[7],p=e[8];return t*d*p-t*c*h-r*l*p+r*c*f+o*l*h-o*d*f}invert(){const e=this.elements,t=e[0],r=e[1],o=e[2],l=e[3],d=e[4],c=e[5],f=e[6],h=e[7],p=e[8],g=p*d-c*h,y=c*f-p*l,x=h*l-d*f,M=t*g+r*y+o*x;if(M===0)return this.set(0,0,0,0,0,0,0,0,0);const E=1/M;return e[0]=g*E,e[1]=(o*h-p*r)*E,e[2]=(c*r-o*d)*E,e[3]=y*E,e[4]=(p*t-o*f)*E,e[5]=(o*l-c*t)*E,e[6]=x*E,e[7]=(r*f-h*t)*E,e[8]=(d*t-r*l)*E,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,r,o,l,d,c){const f=Math.cos(l),h=Math.sin(l);return this.set(r*f,r*h,-r*(f*d+h*c)+d+e,-o*h,o*f,-o*(-h*d+f*c)+c+t,0,0,1),this}scale(e,t){return this.premultiply(fd.makeScale(e,t)),this}rotate(e){return this.premultiply(fd.makeRotation(-e)),this}translate(e,t){return this.premultiply(fd.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,-r,0,r,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,r=e.elements;for(let o=0;o<9;o++)if(t[o]!==r[o])return!1;return!0}fromArray(e,t=0){for(let r=0;r<9;r++)this.elements[r]=e[r+t];return this}toArray(e=[],t=0){const r=this.elements;return e[t]=r[0],e[t+1]=r[1],e[t+2]=r[2],e[t+3]=r[3],e[t+4]=r[4],e[t+5]=r[5],e[t+6]=r[6],e[t+7]=r[7],e[t+8]=r[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const fd=new Mt;function Ov(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function oc(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function FS(){const s=oc("canvas");return s.style.display="block",s}const Km={};function ta(s){s in Km||(Km[s]=!0,console.warn(s))}const Zm=new Mt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Jm=new Mt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Sl={[ji]:{transfer:tc,primaries:nc,toReference:s=>s,fromReference:s=>s},[dn]:{transfer:Ot,primaries:nc,toReference:s=>s.convertSRGBToLinear(),fromReference:s=>s.convertLinearToSRGB()},[vc]:{transfer:tc,primaries:ic,toReference:s=>s.applyMatrix3(Jm),fromReference:s=>s.applyMatrix3(Zm)},[pf]:{transfer:Ot,primaries:ic,toReference:s=>s.convertSRGBToLinear().applyMatrix3(Jm),fromReference:s=>s.applyMatrix3(Zm).convertLinearToSRGB()}},kS=new Set([ji,vc]),Lt={enabled:!0,_workingColorSpace:ji,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(s){if(!kS.has(s))throw new Error(`Unsupported working color space, "${s}".`);this._workingColorSpace=s},convert:function(s,e,t){if(this.enabled===!1||e===t||!e||!t)return s;const r=Sl[e].toReference,o=Sl[t].fromReference;return o(r(s))},fromWorkingColorSpace:function(s,e){return this.convert(s,this._workingColorSpace,e)},toWorkingColorSpace:function(s,e){return this.convert(s,e,this._workingColorSpace)},getPrimaries:function(s){return Sl[s].primaries},getTransfer:function(s){return s===ri?tc:Sl[s].transfer}};function io(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function hd(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let Us;class Fv{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Us===void 0&&(Us=oc("canvas")),Us.width=e.width,Us.height=e.height;const r=Us.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),t=Us}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=oc("canvas");t.width=e.width,t.height=e.height;const r=t.getContext("2d");r.drawImage(e,0,0,e.width,e.height);const o=r.getImageData(0,0,e.width,e.height),l=o.data;for(let d=0;d<l.length;d++)l[d]=io(l[d]/255)*255;return r.putImageData(o,0,0),t}else if(e.data){const t=e.data.slice(0);for(let r=0;r<t.length;r++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[r]=Math.floor(io(t[r]/255)*255):t[r]=io(t[r]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let zS=0;class kv{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:zS++}),this.uuid=fo(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const r={uuid:this.uuid,url:""},o=this.data;if(o!==null){let l;if(Array.isArray(o)){l=[];for(let d=0,c=o.length;d<c;d++)o[d].isDataTexture?l.push(pd(o[d].image)):l.push(pd(o[d]))}else l=pd(o);r.url=l}return t||(e.images[this.uuid]=r),r}}function pd(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Fv.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let BS=0;class zn extends as{constructor(e=zn.DEFAULT_IMAGE,t=zn.DEFAULT_MAPPING,r=pi,o=pi,l=ni,d=oa,c=mi,f=Cr,h=zn.DEFAULT_ANISOTROPY,p=ri){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:BS++}),this.uuid=fo(),this.name="",this.source=new kv(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=r,this.wrapT=o,this.magFilter=l,this.minFilter=d,this.anisotropy=h,this.format=c,this.internalFormat=null,this.type=f,this.offset=new Be(0,0),this.repeat=new Be(1,1),this.center=new Be(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Mt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof p=="string"?this.colorSpace=p:(ta("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=p===is?dn:ri),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const r={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),t||(e.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Tv)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ec:e.x=e.x-Math.floor(e.x);break;case pi:e.x=e.x<0?0:1;break;case Jd:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ec:e.y=e.y-Math.floor(e.y);break;case pi:e.y=e.y<0?0:1;break;case Jd:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return ta("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===dn?is:Dv}set encoding(e){ta("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===is?dn:ri}}zn.DEFAULT_IMAGE=null;zn.DEFAULT_MAPPING=Tv;zn.DEFAULT_ANISOTROPY=1;class Bt{constructor(e=0,t=0,r=0,o=1){Bt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=r,this.w=o}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,r,o){return this.x=e,this.y=t,this.z=r,this.w=o,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,r=this.y,o=this.z,l=this.w,d=e.elements;return this.x=d[0]*t+d[4]*r+d[8]*o+d[12]*l,this.y=d[1]*t+d[5]*r+d[9]*o+d[13]*l,this.z=d[2]*t+d[6]*r+d[10]*o+d[14]*l,this.w=d[3]*t+d[7]*r+d[11]*o+d[15]*l,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,r,o,l;const f=e.elements,h=f[0],p=f[4],g=f[8],y=f[1],x=f[5],M=f[9],E=f[2],S=f[6],v=f[10];if(Math.abs(p-y)<.01&&Math.abs(g-E)<.01&&Math.abs(M-S)<.01){if(Math.abs(p+y)<.1&&Math.abs(g+E)<.1&&Math.abs(M+S)<.1&&Math.abs(h+x+v-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const A=(h+1)/2,P=(x+1)/2,B=(v+1)/2,U=(p+y)/4,I=(g+E)/4,ne=(M+S)/4;return A>P&&A>B?A<.01?(r=0,o=.707106781,l=.707106781):(r=Math.sqrt(A),o=U/r,l=I/r):P>B?P<.01?(r=.707106781,o=0,l=.707106781):(o=Math.sqrt(P),r=U/o,l=ne/o):B<.01?(r=.707106781,o=.707106781,l=0):(l=Math.sqrt(B),r=I/l,o=ne/l),this.set(r,o,l,t),this}let w=Math.sqrt((S-M)*(S-M)+(g-E)*(g-E)+(y-p)*(y-p));return Math.abs(w)<.001&&(w=1),this.x=(S-M)/w,this.y=(g-E)/w,this.z=(y-p)/w,this.w=Math.acos((h+x+v-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Math.max(e,Math.min(t,r)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this.z=e.z+(t.z-e.z)*r,this.w=e.w+(t.w-e.w)*r,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class HS extends as{constructor(e=1,t=1,r={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Bt(0,0,e,t),this.scissorTest=!1,this.viewport=new Bt(0,0,e,t);const o={width:e,height:t,depth:1};r.encoding!==void 0&&(ta("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),r.colorSpace=r.encoding===is?dn:ri),r=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ni,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},r),this.texture=new zn(o,r.mapping,r.wrapS,r.wrapT,r.magFilter,r.minFilter,r.format,r.type,r.anisotropy,r.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=r.generateMipmaps,this.texture.internalFormat=r.internalFormat,this.depthBuffer=r.depthBuffer,this.stencilBuffer=r.stencilBuffer,this.depthTexture=r.depthTexture,this.samples=r.samples}setSize(e,t,r=1){(this.width!==e||this.height!==t||this.depth!==r)&&(this.width=e,this.height=t,this.depth=r,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=r,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new kv(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ss extends HS{constructor(e=1,t=1,r={}){super(e,t,r),this.isWebGLRenderTarget=!0}}class zv extends zn{constructor(e=null,t=1,r=1,o=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:r,depth:o},this.magFilter=Cn,this.minFilter=Cn,this.wrapR=pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class VS extends zn{constructor(e=null,t=1,r=1,o=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:r,depth:o},this.magFilter=Cn,this.minFilter=Cn,this.wrapR=pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Xi{constructor(e=0,t=0,r=0,o=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=r,this._w=o}static slerpFlat(e,t,r,o,l,d,c){let f=r[o+0],h=r[o+1],p=r[o+2],g=r[o+3];const y=l[d+0],x=l[d+1],M=l[d+2],E=l[d+3];if(c===0){e[t+0]=f,e[t+1]=h,e[t+2]=p,e[t+3]=g;return}if(c===1){e[t+0]=y,e[t+1]=x,e[t+2]=M,e[t+3]=E;return}if(g!==E||f!==y||h!==x||p!==M){let S=1-c;const v=f*y+h*x+p*M+g*E,w=v>=0?1:-1,A=1-v*v;if(A>Number.EPSILON){const B=Math.sqrt(A),U=Math.atan2(B,v*w);S=Math.sin(S*U)/B,c=Math.sin(c*U)/B}const P=c*w;if(f=f*S+y*P,h=h*S+x*P,p=p*S+M*P,g=g*S+E*P,S===1-c){const B=1/Math.sqrt(f*f+h*h+p*p+g*g);f*=B,h*=B,p*=B,g*=B}}e[t]=f,e[t+1]=h,e[t+2]=p,e[t+3]=g}static multiplyQuaternionsFlat(e,t,r,o,l,d){const c=r[o],f=r[o+1],h=r[o+2],p=r[o+3],g=l[d],y=l[d+1],x=l[d+2],M=l[d+3];return e[t]=c*M+p*g+f*x-h*y,e[t+1]=f*M+p*y+h*g-c*x,e[t+2]=h*M+p*x+c*y-f*g,e[t+3]=p*M-c*g-f*y-h*x,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,r,o){return this._x=e,this._y=t,this._z=r,this._w=o,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const r=e._x,o=e._y,l=e._z,d=e._order,c=Math.cos,f=Math.sin,h=c(r/2),p=c(o/2),g=c(l/2),y=f(r/2),x=f(o/2),M=f(l/2);switch(d){case"XYZ":this._x=y*p*g+h*x*M,this._y=h*x*g-y*p*M,this._z=h*p*M+y*x*g,this._w=h*p*g-y*x*M;break;case"YXZ":this._x=y*p*g+h*x*M,this._y=h*x*g-y*p*M,this._z=h*p*M-y*x*g,this._w=h*p*g+y*x*M;break;case"ZXY":this._x=y*p*g-h*x*M,this._y=h*x*g+y*p*M,this._z=h*p*M+y*x*g,this._w=h*p*g-y*x*M;break;case"ZYX":this._x=y*p*g-h*x*M,this._y=h*x*g+y*p*M,this._z=h*p*M-y*x*g,this._w=h*p*g+y*x*M;break;case"YZX":this._x=y*p*g+h*x*M,this._y=h*x*g+y*p*M,this._z=h*p*M-y*x*g,this._w=h*p*g-y*x*M;break;case"XZY":this._x=y*p*g-h*x*M,this._y=h*x*g-y*p*M,this._z=h*p*M+y*x*g,this._w=h*p*g+y*x*M;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+d)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const r=t/2,o=Math.sin(r);return this._x=e.x*o,this._y=e.y*o,this._z=e.z*o,this._w=Math.cos(r),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,r=t[0],o=t[4],l=t[8],d=t[1],c=t[5],f=t[9],h=t[2],p=t[6],g=t[10],y=r+c+g;if(y>0){const x=.5/Math.sqrt(y+1);this._w=.25/x,this._x=(p-f)*x,this._y=(l-h)*x,this._z=(d-o)*x}else if(r>c&&r>g){const x=2*Math.sqrt(1+r-c-g);this._w=(p-f)/x,this._x=.25*x,this._y=(o+d)/x,this._z=(l+h)/x}else if(c>g){const x=2*Math.sqrt(1+c-r-g);this._w=(l-h)/x,this._x=(o+d)/x,this._y=.25*x,this._z=(f+p)/x}else{const x=2*Math.sqrt(1+g-r-c);this._w=(d-o)/x,this._x=(l+h)/x,this._y=(f+p)/x,this._z=.25*x}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let r=e.dot(t)+1;return r<Number.EPSILON?(r=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=r):(this._x=0,this._y=-e.z,this._z=e.y,this._w=r)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=r),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(tn(this.dot(e),-1,1)))}rotateTowards(e,t){const r=this.angleTo(e);if(r===0)return this;const o=Math.min(1,t/r);return this.slerp(e,o),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const r=e._x,o=e._y,l=e._z,d=e._w,c=t._x,f=t._y,h=t._z,p=t._w;return this._x=r*p+d*c+o*h-l*f,this._y=o*p+d*f+l*c-r*h,this._z=l*p+d*h+r*f-o*c,this._w=d*p-r*c-o*f-l*h,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const r=this._x,o=this._y,l=this._z,d=this._w;let c=d*e._w+r*e._x+o*e._y+l*e._z;if(c<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,c=-c):this.copy(e),c>=1)return this._w=d,this._x=r,this._y=o,this._z=l,this;const f=1-c*c;if(f<=Number.EPSILON){const x=1-t;return this._w=x*d+t*this._w,this._x=x*r+t*this._x,this._y=x*o+t*this._y,this._z=x*l+t*this._z,this.normalize(),this}const h=Math.sqrt(f),p=Math.atan2(h,c),g=Math.sin((1-t)*p)/h,y=Math.sin(t*p)/h;return this._w=d*g+this._w*y,this._x=r*g+this._x*y,this._y=o*g+this._y*y,this._z=l*g+this._z*y,this._onChangeCallback(),this}slerpQuaternions(e,t,r){return this.copy(e).slerp(t,r)}random(){const e=Math.random(),t=Math.sqrt(1-e),r=Math.sqrt(e),o=2*Math.PI*Math.random(),l=2*Math.PI*Math.random();return this.set(t*Math.cos(o),r*Math.sin(l),r*Math.cos(l),t*Math.sin(o))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class z{constructor(e=0,t=0,r=0){z.prototype.isVector3=!0,this.x=e,this.y=t,this.z=r}set(e,t,r){return r===void 0&&(r=this.z),this.x=e,this.y=t,this.z=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Qm.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Qm.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,r=this.y,o=this.z,l=e.elements;return this.x=l[0]*t+l[3]*r+l[6]*o,this.y=l[1]*t+l[4]*r+l[7]*o,this.z=l[2]*t+l[5]*r+l[8]*o,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,r=this.y,o=this.z,l=e.elements,d=1/(l[3]*t+l[7]*r+l[11]*o+l[15]);return this.x=(l[0]*t+l[4]*r+l[8]*o+l[12])*d,this.y=(l[1]*t+l[5]*r+l[9]*o+l[13])*d,this.z=(l[2]*t+l[6]*r+l[10]*o+l[14])*d,this}applyQuaternion(e){const t=this.x,r=this.y,o=this.z,l=e.x,d=e.y,c=e.z,f=e.w,h=2*(d*o-c*r),p=2*(c*t-l*o),g=2*(l*r-d*t);return this.x=t+f*h+d*g-c*p,this.y=r+f*p+c*h-l*g,this.z=o+f*g+l*p-d*h,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,r=this.y,o=this.z,l=e.elements;return this.x=l[0]*t+l[4]*r+l[8]*o,this.y=l[1]*t+l[5]*r+l[9]*o,this.z=l[2]*t+l[6]*r+l[10]*o,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Math.max(e,Math.min(t,r)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this.z=e.z+(t.z-e.z)*r,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const r=e.x,o=e.y,l=e.z,d=t.x,c=t.y,f=t.z;return this.x=o*f-l*c,this.y=l*d-r*f,this.z=r*c-o*d,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const r=e.dot(this)/t;return this.copy(e).multiplyScalar(r)}projectOnPlane(e){return md.copy(this).projectOnVector(e),this.sub(md)}reflect(e){return this.sub(md.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const r=this.dot(e)/t;return Math.acos(tn(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,r=this.y-e.y,o=this.z-e.z;return t*t+r*r+o*o}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,r){const o=Math.sin(t)*e;return this.x=o*Math.sin(r),this.y=Math.cos(t)*e,this.z=o*Math.cos(r),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,r){return this.x=e*Math.sin(t),this.y=r,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),r=this.setFromMatrixColumn(e,1).length(),o=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=r,this.z=o,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,r=Math.sqrt(1-e**2);return this.x=r*Math.cos(t),this.y=r*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const md=new z,Qm=new Xi;class fa{constructor(e=new z(1/0,1/0,1/0),t=new z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,r=e.length;t<r;t+=3)this.expandByPoint(di.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,r=e.count;t<r;t++)this.expandByPoint(di.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,r=e.length;t<r;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const r=di.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(r),this.max.copy(e).add(r),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const r=e.geometry;if(r!==void 0){const l=r.getAttribute("position");if(t===!0&&l!==void 0&&e.isInstancedMesh!==!0)for(let d=0,c=l.count;d<c;d++)e.isMesh===!0?e.getVertexPosition(d,di):di.fromBufferAttribute(l,d),di.applyMatrix4(e.matrixWorld),this.expandByPoint(di);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ml.copy(e.boundingBox)):(r.boundingBox===null&&r.computeBoundingBox(),Ml.copy(r.boundingBox)),Ml.applyMatrix4(e.matrixWorld),this.union(Ml)}const o=e.children;for(let l=0,d=o.length;l<d;l++)this.expandByObject(o[l],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,di),di.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,r;return e.normal.x>0?(t=e.normal.x*this.min.x,r=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,r=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,r+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,r+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,r+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,r+=e.normal.z*this.min.z),t<=-e.constant&&r>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(qo),El.subVectors(this.max,qo),Is.subVectors(e.a,qo),Os.subVectors(e.b,qo),Fs.subVectors(e.c,qo),mr.subVectors(Os,Is),gr.subVectors(Fs,Os),$r.subVectors(Is,Fs);let t=[0,-mr.z,mr.y,0,-gr.z,gr.y,0,-$r.z,$r.y,mr.z,0,-mr.x,gr.z,0,-gr.x,$r.z,0,-$r.x,-mr.y,mr.x,0,-gr.y,gr.x,0,-$r.y,$r.x,0];return!gd(t,Is,Os,Fs,El)||(t=[1,0,0,0,1,0,0,0,1],!gd(t,Is,Os,Fs,El))?!1:(wl.crossVectors(mr,gr),t=[wl.x,wl.y,wl.z],gd(t,Is,Os,Fs,El))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,di).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(di).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ki[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ki[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ki[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ki[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ki[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ki[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ki[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ki[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ki),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const ki=[new z,new z,new z,new z,new z,new z,new z,new z],di=new z,Ml=new fa,Is=new z,Os=new z,Fs=new z,mr=new z,gr=new z,$r=new z,qo=new z,El=new z,wl=new z,Yr=new z;function gd(s,e,t,r,o){for(let l=0,d=s.length-3;l<=d;l+=3){Yr.fromArray(s,l);const c=o.x*Math.abs(Yr.x)+o.y*Math.abs(Yr.y)+o.z*Math.abs(Yr.z),f=e.dot(Yr),h=t.dot(Yr),p=r.dot(Yr);if(Math.max(-Math.max(f,h,p),Math.min(f,h,p))>c)return!1}return!0}const GS=new fa,Ko=new z,vd=new z;class xc{constructor(e=new z,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const r=this.center;t!==void 0?r.copy(t):GS.setFromPoints(e).getCenter(r);let o=0;for(let l=0,d=e.length;l<d;l++)o=Math.max(o,r.distanceToSquared(e[l]));return this.radius=Math.sqrt(o),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const r=this.center.distanceToSquared(e);return t.copy(e),r>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ko.subVectors(e,this.center);const t=Ko.lengthSq();if(t>this.radius*this.radius){const r=Math.sqrt(t),o=(r-this.radius)*.5;this.center.addScaledVector(Ko,o/r),this.radius+=o}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(vd.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ko.copy(e.center).add(vd)),this.expandByPoint(Ko.copy(e.center).sub(vd))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const zi=new z,xd=new z,Tl=new z,vr=new z,_d=new z,Al=new z,yd=new z;class gf{constructor(e=new z,t=new z(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,zi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const r=t.dot(this.direction);return r<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,r)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=zi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(zi.copy(this.origin).addScaledVector(this.direction,t),zi.distanceToSquared(e))}distanceSqToSegment(e,t,r,o){xd.copy(e).add(t).multiplyScalar(.5),Tl.copy(t).sub(e).normalize(),vr.copy(this.origin).sub(xd);const l=e.distanceTo(t)*.5,d=-this.direction.dot(Tl),c=vr.dot(this.direction),f=-vr.dot(Tl),h=vr.lengthSq(),p=Math.abs(1-d*d);let g,y,x,M;if(p>0)if(g=d*f-c,y=d*c-f,M=l*p,g>=0)if(y>=-M)if(y<=M){const E=1/p;g*=E,y*=E,x=g*(g+d*y+2*c)+y*(d*g+y+2*f)+h}else y=l,g=Math.max(0,-(d*y+c)),x=-g*g+y*(y+2*f)+h;else y=-l,g=Math.max(0,-(d*y+c)),x=-g*g+y*(y+2*f)+h;else y<=-M?(g=Math.max(0,-(-d*l+c)),y=g>0?-l:Math.min(Math.max(-l,-f),l),x=-g*g+y*(y+2*f)+h):y<=M?(g=0,y=Math.min(Math.max(-l,-f),l),x=y*(y+2*f)+h):(g=Math.max(0,-(d*l+c)),y=g>0?l:Math.min(Math.max(-l,-f),l),x=-g*g+y*(y+2*f)+h);else y=d>0?-l:l,g=Math.max(0,-(d*y+c)),x=-g*g+y*(y+2*f)+h;return r&&r.copy(this.origin).addScaledVector(this.direction,g),o&&o.copy(xd).addScaledVector(Tl,y),x}intersectSphere(e,t){zi.subVectors(e.center,this.origin);const r=zi.dot(this.direction),o=zi.dot(zi)-r*r,l=e.radius*e.radius;if(o>l)return null;const d=Math.sqrt(l-o),c=r-d,f=r+d;return f<0?null:c<0?this.at(f,t):this.at(c,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const r=-(this.origin.dot(e.normal)+e.constant)/t;return r>=0?r:null}intersectPlane(e,t){const r=this.distanceToPlane(e);return r===null?null:this.at(r,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let r,o,l,d,c,f;const h=1/this.direction.x,p=1/this.direction.y,g=1/this.direction.z,y=this.origin;return h>=0?(r=(e.min.x-y.x)*h,o=(e.max.x-y.x)*h):(r=(e.max.x-y.x)*h,o=(e.min.x-y.x)*h),p>=0?(l=(e.min.y-y.y)*p,d=(e.max.y-y.y)*p):(l=(e.max.y-y.y)*p,d=(e.min.y-y.y)*p),r>d||l>o||((l>r||isNaN(r))&&(r=l),(d<o||isNaN(o))&&(o=d),g>=0?(c=(e.min.z-y.z)*g,f=(e.max.z-y.z)*g):(c=(e.max.z-y.z)*g,f=(e.min.z-y.z)*g),r>f||c>o)||((c>r||r!==r)&&(r=c),(f<o||o!==o)&&(o=f),o<0)?null:this.at(r>=0?r:o,t)}intersectsBox(e){return this.intersectBox(e,zi)!==null}intersectTriangle(e,t,r,o,l){_d.subVectors(t,e),Al.subVectors(r,e),yd.crossVectors(_d,Al);let d=this.direction.dot(yd),c;if(d>0){if(o)return null;c=1}else if(d<0)c=-1,d=-d;else return null;vr.subVectors(this.origin,e);const f=c*this.direction.dot(Al.crossVectors(vr,Al));if(f<0)return null;const h=c*this.direction.dot(_d.cross(vr));if(h<0||f+h>d)return null;const p=-c*vr.dot(yd);return p<0?null:this.at(p/d,l)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ht{constructor(e,t,r,o,l,d,c,f,h,p,g,y,x,M,E,S){Ht.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,r,o,l,d,c,f,h,p,g,y,x,M,E,S)}set(e,t,r,o,l,d,c,f,h,p,g,y,x,M,E,S){const v=this.elements;return v[0]=e,v[4]=t,v[8]=r,v[12]=o,v[1]=l,v[5]=d,v[9]=c,v[13]=f,v[2]=h,v[6]=p,v[10]=g,v[14]=y,v[3]=x,v[7]=M,v[11]=E,v[15]=S,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ht().fromArray(this.elements)}copy(e){const t=this.elements,r=e.elements;return t[0]=r[0],t[1]=r[1],t[2]=r[2],t[3]=r[3],t[4]=r[4],t[5]=r[5],t[6]=r[6],t[7]=r[7],t[8]=r[8],t[9]=r[9],t[10]=r[10],t[11]=r[11],t[12]=r[12],t[13]=r[13],t[14]=r[14],t[15]=r[15],this}copyPosition(e){const t=this.elements,r=e.elements;return t[12]=r[12],t[13]=r[13],t[14]=r[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,r){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),r.setFromMatrixColumn(this,2),this}makeBasis(e,t,r){return this.set(e.x,t.x,r.x,0,e.y,t.y,r.y,0,e.z,t.z,r.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,r=e.elements,o=1/ks.setFromMatrixColumn(e,0).length(),l=1/ks.setFromMatrixColumn(e,1).length(),d=1/ks.setFromMatrixColumn(e,2).length();return t[0]=r[0]*o,t[1]=r[1]*o,t[2]=r[2]*o,t[3]=0,t[4]=r[4]*l,t[5]=r[5]*l,t[6]=r[6]*l,t[7]=0,t[8]=r[8]*d,t[9]=r[9]*d,t[10]=r[10]*d,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,r=e.x,o=e.y,l=e.z,d=Math.cos(r),c=Math.sin(r),f=Math.cos(o),h=Math.sin(o),p=Math.cos(l),g=Math.sin(l);if(e.order==="XYZ"){const y=d*p,x=d*g,M=c*p,E=c*g;t[0]=f*p,t[4]=-f*g,t[8]=h,t[1]=x+M*h,t[5]=y-E*h,t[9]=-c*f,t[2]=E-y*h,t[6]=M+x*h,t[10]=d*f}else if(e.order==="YXZ"){const y=f*p,x=f*g,M=h*p,E=h*g;t[0]=y+E*c,t[4]=M*c-x,t[8]=d*h,t[1]=d*g,t[5]=d*p,t[9]=-c,t[2]=x*c-M,t[6]=E+y*c,t[10]=d*f}else if(e.order==="ZXY"){const y=f*p,x=f*g,M=h*p,E=h*g;t[0]=y-E*c,t[4]=-d*g,t[8]=M+x*c,t[1]=x+M*c,t[5]=d*p,t[9]=E-y*c,t[2]=-d*h,t[6]=c,t[10]=d*f}else if(e.order==="ZYX"){const y=d*p,x=d*g,M=c*p,E=c*g;t[0]=f*p,t[4]=M*h-x,t[8]=y*h+E,t[1]=f*g,t[5]=E*h+y,t[9]=x*h-M,t[2]=-h,t[6]=c*f,t[10]=d*f}else if(e.order==="YZX"){const y=d*f,x=d*h,M=c*f,E=c*h;t[0]=f*p,t[4]=E-y*g,t[8]=M*g+x,t[1]=g,t[5]=d*p,t[9]=-c*p,t[2]=-h*p,t[6]=x*g+M,t[10]=y-E*g}else if(e.order==="XZY"){const y=d*f,x=d*h,M=c*f,E=c*h;t[0]=f*p,t[4]=-g,t[8]=h*p,t[1]=y*g+E,t[5]=d*p,t[9]=x*g-M,t[2]=M*g-x,t[6]=c*p,t[10]=E*g+y}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(WS,e,jS)}lookAt(e,t,r){const o=this.elements;return Wn.subVectors(e,t),Wn.lengthSq()===0&&(Wn.z=1),Wn.normalize(),xr.crossVectors(r,Wn),xr.lengthSq()===0&&(Math.abs(r.z)===1?Wn.x+=1e-4:Wn.z+=1e-4,Wn.normalize(),xr.crossVectors(r,Wn)),xr.normalize(),bl.crossVectors(Wn,xr),o[0]=xr.x,o[4]=bl.x,o[8]=Wn.x,o[1]=xr.y,o[5]=bl.y,o[9]=Wn.y,o[2]=xr.z,o[6]=bl.z,o[10]=Wn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const r=e.elements,o=t.elements,l=this.elements,d=r[0],c=r[4],f=r[8],h=r[12],p=r[1],g=r[5],y=r[9],x=r[13],M=r[2],E=r[6],S=r[10],v=r[14],w=r[3],A=r[7],P=r[11],B=r[15],U=o[0],I=o[4],ne=o[8],R=o[12],D=o[1],re=o[5],ae=o[9],me=o[13],F=o[2],$=o[6],J=o[10],K=o[14],X=o[3],Z=o[7],Y=o[11],O=o[15];return l[0]=d*U+c*D+f*F+h*X,l[4]=d*I+c*re+f*$+h*Z,l[8]=d*ne+c*ae+f*J+h*Y,l[12]=d*R+c*me+f*K+h*O,l[1]=p*U+g*D+y*F+x*X,l[5]=p*I+g*re+y*$+x*Z,l[9]=p*ne+g*ae+y*J+x*Y,l[13]=p*R+g*me+y*K+x*O,l[2]=M*U+E*D+S*F+v*X,l[6]=M*I+E*re+S*$+v*Z,l[10]=M*ne+E*ae+S*J+v*Y,l[14]=M*R+E*me+S*K+v*O,l[3]=w*U+A*D+P*F+B*X,l[7]=w*I+A*re+P*$+B*Z,l[11]=w*ne+A*ae+P*J+B*Y,l[15]=w*R+A*me+P*K+B*O,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],r=e[4],o=e[8],l=e[12],d=e[1],c=e[5],f=e[9],h=e[13],p=e[2],g=e[6],y=e[10],x=e[14],M=e[3],E=e[7],S=e[11],v=e[15];return M*(+l*f*g-o*h*g-l*c*y+r*h*y+o*c*x-r*f*x)+E*(+t*f*x-t*h*y+l*d*y-o*d*x+o*h*p-l*f*p)+S*(+t*h*g-t*c*x-l*d*g+r*d*x+l*c*p-r*h*p)+v*(-o*c*p-t*f*g+t*c*y+o*d*g-r*d*y+r*f*p)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,r){const o=this.elements;return e.isVector3?(o[12]=e.x,o[13]=e.y,o[14]=e.z):(o[12]=e,o[13]=t,o[14]=r),this}invert(){const e=this.elements,t=e[0],r=e[1],o=e[2],l=e[3],d=e[4],c=e[5],f=e[6],h=e[7],p=e[8],g=e[9],y=e[10],x=e[11],M=e[12],E=e[13],S=e[14],v=e[15],w=g*S*h-E*y*h+E*f*x-c*S*x-g*f*v+c*y*v,A=M*y*h-p*S*h-M*f*x+d*S*x+p*f*v-d*y*v,P=p*E*h-M*g*h+M*c*x-d*E*x-p*c*v+d*g*v,B=M*g*f-p*E*f-M*c*y+d*E*y+p*c*S-d*g*S,U=t*w+r*A+o*P+l*B;if(U===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const I=1/U;return e[0]=w*I,e[1]=(E*y*l-g*S*l-E*o*x+r*S*x+g*o*v-r*y*v)*I,e[2]=(c*S*l-E*f*l+E*o*h-r*S*h-c*o*v+r*f*v)*I,e[3]=(g*f*l-c*y*l-g*o*h+r*y*h+c*o*x-r*f*x)*I,e[4]=A*I,e[5]=(p*S*l-M*y*l+M*o*x-t*S*x-p*o*v+t*y*v)*I,e[6]=(M*f*l-d*S*l-M*o*h+t*S*h+d*o*v-t*f*v)*I,e[7]=(d*y*l-p*f*l+p*o*h-t*y*h-d*o*x+t*f*x)*I,e[8]=P*I,e[9]=(M*g*l-p*E*l-M*r*x+t*E*x+p*r*v-t*g*v)*I,e[10]=(d*E*l-M*c*l+M*r*h-t*E*h-d*r*v+t*c*v)*I,e[11]=(p*c*l-d*g*l-p*r*h+t*g*h+d*r*x-t*c*x)*I,e[12]=B*I,e[13]=(p*E*o-M*g*o+M*r*y-t*E*y-p*r*S+t*g*S)*I,e[14]=(M*c*o-d*E*o-M*r*f+t*E*f+d*r*S-t*c*S)*I,e[15]=(d*g*o-p*c*o+p*r*f-t*g*f-d*r*y+t*c*y)*I,this}scale(e){const t=this.elements,r=e.x,o=e.y,l=e.z;return t[0]*=r,t[4]*=o,t[8]*=l,t[1]*=r,t[5]*=o,t[9]*=l,t[2]*=r,t[6]*=o,t[10]*=l,t[3]*=r,t[7]*=o,t[11]*=l,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],r=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],o=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,r,o))}makeTranslation(e,t,r){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,r,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),r=Math.sin(e);return this.set(1,0,0,0,0,t,-r,0,0,r,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,0,r,0,0,1,0,0,-r,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,-r,0,0,r,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const r=Math.cos(t),o=Math.sin(t),l=1-r,d=e.x,c=e.y,f=e.z,h=l*d,p=l*c;return this.set(h*d+r,h*c-o*f,h*f+o*c,0,h*c+o*f,p*c+r,p*f-o*d,0,h*f-o*c,p*f+o*d,l*f*f+r,0,0,0,0,1),this}makeScale(e,t,r){return this.set(e,0,0,0,0,t,0,0,0,0,r,0,0,0,0,1),this}makeShear(e,t,r,o,l,d){return this.set(1,r,l,0,e,1,d,0,t,o,1,0,0,0,0,1),this}compose(e,t,r){const o=this.elements,l=t._x,d=t._y,c=t._z,f=t._w,h=l+l,p=d+d,g=c+c,y=l*h,x=l*p,M=l*g,E=d*p,S=d*g,v=c*g,w=f*h,A=f*p,P=f*g,B=r.x,U=r.y,I=r.z;return o[0]=(1-(E+v))*B,o[1]=(x+P)*B,o[2]=(M-A)*B,o[3]=0,o[4]=(x-P)*U,o[5]=(1-(y+v))*U,o[6]=(S+w)*U,o[7]=0,o[8]=(M+A)*I,o[9]=(S-w)*I,o[10]=(1-(y+E))*I,o[11]=0,o[12]=e.x,o[13]=e.y,o[14]=e.z,o[15]=1,this}decompose(e,t,r){const o=this.elements;let l=ks.set(o[0],o[1],o[2]).length();const d=ks.set(o[4],o[5],o[6]).length(),c=ks.set(o[8],o[9],o[10]).length();this.determinant()<0&&(l=-l),e.x=o[12],e.y=o[13],e.z=o[14],fi.copy(this);const h=1/l,p=1/d,g=1/c;return fi.elements[0]*=h,fi.elements[1]*=h,fi.elements[2]*=h,fi.elements[4]*=p,fi.elements[5]*=p,fi.elements[6]*=p,fi.elements[8]*=g,fi.elements[9]*=g,fi.elements[10]*=g,t.setFromRotationMatrix(fi),r.x=l,r.y=d,r.z=c,this}makePerspective(e,t,r,o,l,d,c=Wi){const f=this.elements,h=2*l/(t-e),p=2*l/(r-o),g=(t+e)/(t-e),y=(r+o)/(r-o);let x,M;if(c===Wi)x=-(d+l)/(d-l),M=-2*d*l/(d-l);else if(c===rc)x=-d/(d-l),M=-d*l/(d-l);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+c);return f[0]=h,f[4]=0,f[8]=g,f[12]=0,f[1]=0,f[5]=p,f[9]=y,f[13]=0,f[2]=0,f[6]=0,f[10]=x,f[14]=M,f[3]=0,f[7]=0,f[11]=-1,f[15]=0,this}makeOrthographic(e,t,r,o,l,d,c=Wi){const f=this.elements,h=1/(t-e),p=1/(r-o),g=1/(d-l),y=(t+e)*h,x=(r+o)*p;let M,E;if(c===Wi)M=(d+l)*g,E=-2*g;else if(c===rc)M=l*g,E=-1*g;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+c);return f[0]=2*h,f[4]=0,f[8]=0,f[12]=-y,f[1]=0,f[5]=2*p,f[9]=0,f[13]=-x,f[2]=0,f[6]=0,f[10]=E,f[14]=-M,f[3]=0,f[7]=0,f[11]=0,f[15]=1,this}equals(e){const t=this.elements,r=e.elements;for(let o=0;o<16;o++)if(t[o]!==r[o])return!1;return!0}fromArray(e,t=0){for(let r=0;r<16;r++)this.elements[r]=e[r+t];return this}toArray(e=[],t=0){const r=this.elements;return e[t]=r[0],e[t+1]=r[1],e[t+2]=r[2],e[t+3]=r[3],e[t+4]=r[4],e[t+5]=r[5],e[t+6]=r[6],e[t+7]=r[7],e[t+8]=r[8],e[t+9]=r[9],e[t+10]=r[10],e[t+11]=r[11],e[t+12]=r[12],e[t+13]=r[13],e[t+14]=r[14],e[t+15]=r[15],e}}const ks=new z,fi=new Ht,WS=new z(0,0,0),jS=new z(1,1,1),xr=new z,bl=new z,Wn=new z,eg=new Ht,tg=new Xi;class _c{constructor(e=0,t=0,r=0,o=_c.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=r,this._order=o}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,r,o=this._order){return this._x=e,this._y=t,this._z=r,this._order=o,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,r=!0){const o=e.elements,l=o[0],d=o[4],c=o[8],f=o[1],h=o[5],p=o[9],g=o[2],y=o[6],x=o[10];switch(t){case"XYZ":this._y=Math.asin(tn(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-p,x),this._z=Math.atan2(-d,l)):(this._x=Math.atan2(y,h),this._z=0);break;case"YXZ":this._x=Math.asin(-tn(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(c,x),this._z=Math.atan2(f,h)):(this._y=Math.atan2(-g,l),this._z=0);break;case"ZXY":this._x=Math.asin(tn(y,-1,1)),Math.abs(y)<.9999999?(this._y=Math.atan2(-g,x),this._z=Math.atan2(-d,h)):(this._y=0,this._z=Math.atan2(f,l));break;case"ZYX":this._y=Math.asin(-tn(g,-1,1)),Math.abs(g)<.9999999?(this._x=Math.atan2(y,x),this._z=Math.atan2(f,l)):(this._x=0,this._z=Math.atan2(-d,h));break;case"YZX":this._z=Math.asin(tn(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(-p,h),this._y=Math.atan2(-g,l)):(this._x=0,this._y=Math.atan2(c,x));break;case"XZY":this._z=Math.asin(-tn(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(y,h),this._y=Math.atan2(c,l)):(this._x=Math.atan2(-p,x),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,r===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,r){return eg.makeRotationFromQuaternion(e),this.setFromRotationMatrix(eg,t,r)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return tg.setFromEuler(this),this.setFromQuaternion(tg,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}_c.DEFAULT_ORDER="XYZ";class Bv{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let XS=0;const ng=new z,zs=new Xi,Bi=new Ht,Cl=new z,Zo=new z,$S=new z,YS=new Xi,ig=new z(1,0,0),rg=new z(0,1,0),sg=new z(0,0,1),qS={type:"added"},KS={type:"removed"};class rn extends as{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:XS++}),this.uuid=fo(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=rn.DEFAULT_UP.clone();const e=new z,t=new _c,r=new Xi,o=new z(1,1,1);function l(){r.setFromEuler(t,!1)}function d(){t.setFromQuaternion(r,void 0,!1)}t._onChange(l),r._onChange(d),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:o},modelViewMatrix:{value:new Ht},normalMatrix:{value:new Mt}}),this.matrix=new Ht,this.matrixWorld=new Ht,this.matrixAutoUpdate=rn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=rn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Bv,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return zs.setFromAxisAngle(e,t),this.quaternion.multiply(zs),this}rotateOnWorldAxis(e,t){return zs.setFromAxisAngle(e,t),this.quaternion.premultiply(zs),this}rotateX(e){return this.rotateOnAxis(ig,e)}rotateY(e){return this.rotateOnAxis(rg,e)}rotateZ(e){return this.rotateOnAxis(sg,e)}translateOnAxis(e,t){return ng.copy(e).applyQuaternion(this.quaternion),this.position.add(ng.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ig,e)}translateY(e){return this.translateOnAxis(rg,e)}translateZ(e){return this.translateOnAxis(sg,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Bi.copy(this.matrixWorld).invert())}lookAt(e,t,r){e.isVector3?Cl.copy(e):Cl.set(e,t,r);const o=this.parent;this.updateWorldMatrix(!0,!1),Zo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Bi.lookAt(Zo,Cl,this.up):Bi.lookAt(Cl,Zo,this.up),this.quaternion.setFromRotationMatrix(Bi),o&&(Bi.extractRotation(o.matrixWorld),zs.setFromRotationMatrix(Bi),this.quaternion.premultiply(zs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(qS)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(KS)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Bi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Bi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Bi),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let r=0,o=this.children.length;r<o;r++){const d=this.children[r].getObjectByProperty(e,t);if(d!==void 0)return d}}getObjectsByProperty(e,t,r=[]){this[e]===t&&r.push(this);const o=this.children;for(let l=0,d=o.length;l<d;l++)o[l].getObjectsByProperty(e,t,r);return r}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zo,e,$S),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zo,YS,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let r=0,o=t.length;r<o;r++)t[r].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let r=0,o=t.length;r<o;r++)t[r].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let r=0,o=t.length;r<o;r++){const l=t[r];(l.matrixWorldAutoUpdate===!0||e===!0)&&l.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const r=this.parent;if(e===!0&&r!==null&&r.matrixWorldAutoUpdate===!0&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const o=this.children;for(let l=0,d=o.length;l<d;l++){const c=o[l];c.matrixWorldAutoUpdate===!0&&c.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",r={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const o={};o.uuid=this.uuid,o.type=this.type,this.name!==""&&(o.name=this.name),this.castShadow===!0&&(o.castShadow=!0),this.receiveShadow===!0&&(o.receiveShadow=!0),this.visible===!1&&(o.visible=!1),this.frustumCulled===!1&&(o.frustumCulled=!1),this.renderOrder!==0&&(o.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(o.userData=this.userData),o.layers=this.layers.mask,o.matrix=this.matrix.toArray(),o.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(o.matrixAutoUpdate=!1),this.isInstancedMesh&&(o.type="InstancedMesh",o.count=this.count,o.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(o.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(o.type="BatchedMesh",o.perObjectFrustumCulled=this.perObjectFrustumCulled,o.sortObjects=this.sortObjects,o.drawRanges=this._drawRanges,o.reservedRanges=this._reservedRanges,o.visibility=this._visibility,o.active=this._active,o.bounds=this._bounds.map(c=>({boxInitialized:c.boxInitialized,boxMin:c.box.min.toArray(),boxMax:c.box.max.toArray(),sphereInitialized:c.sphereInitialized,sphereRadius:c.sphere.radius,sphereCenter:c.sphere.center.toArray()})),o.maxGeometryCount=this._maxGeometryCount,o.maxVertexCount=this._maxVertexCount,o.maxIndexCount=this._maxIndexCount,o.geometryInitialized=this._geometryInitialized,o.geometryCount=this._geometryCount,o.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(o.boundingSphere={center:o.boundingSphere.center.toArray(),radius:o.boundingSphere.radius}),this.boundingBox!==null&&(o.boundingBox={min:o.boundingBox.min.toArray(),max:o.boundingBox.max.toArray()}));function l(c,f){return c[f.uuid]===void 0&&(c[f.uuid]=f.toJSON(e)),f.uuid}if(this.isScene)this.background&&(this.background.isColor?o.background=this.background.toJSON():this.background.isTexture&&(o.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(o.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){o.geometry=l(e.geometries,this.geometry);const c=this.geometry.parameters;if(c!==void 0&&c.shapes!==void 0){const f=c.shapes;if(Array.isArray(f))for(let h=0,p=f.length;h<p;h++){const g=f[h];l(e.shapes,g)}else l(e.shapes,f)}}if(this.isSkinnedMesh&&(o.bindMode=this.bindMode,o.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(l(e.skeletons,this.skeleton),o.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const c=[];for(let f=0,h=this.material.length;f<h;f++)c.push(l(e.materials,this.material[f]));o.material=c}else o.material=l(e.materials,this.material);if(this.children.length>0){o.children=[];for(let c=0;c<this.children.length;c++)o.children.push(this.children[c].toJSON(e).object)}if(this.animations.length>0){o.animations=[];for(let c=0;c<this.animations.length;c++){const f=this.animations[c];o.animations.push(l(e.animations,f))}}if(t){const c=d(e.geometries),f=d(e.materials),h=d(e.textures),p=d(e.images),g=d(e.shapes),y=d(e.skeletons),x=d(e.animations),M=d(e.nodes);c.length>0&&(r.geometries=c),f.length>0&&(r.materials=f),h.length>0&&(r.textures=h),p.length>0&&(r.images=p),g.length>0&&(r.shapes=g),y.length>0&&(r.skeletons=y),x.length>0&&(r.animations=x),M.length>0&&(r.nodes=M)}return r.object=o,r;function d(c){const f=[];for(const h in c){const p=c[h];delete p.metadata,f.push(p)}return f}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let r=0;r<e.children.length;r++){const o=e.children[r];this.add(o.clone())}return this}}rn.DEFAULT_UP=new z(0,1,0);rn.DEFAULT_MATRIX_AUTO_UPDATE=!0;rn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const hi=new z,Hi=new z,Sd=new z,Vi=new z,Bs=new z,Hs=new z,og=new z,Md=new z,Ed=new z,wd=new z;let Rl=!1;class ii{constructor(e=new z,t=new z,r=new z){this.a=e,this.b=t,this.c=r}static getNormal(e,t,r,o){o.subVectors(r,t),hi.subVectors(e,t),o.cross(hi);const l=o.lengthSq();return l>0?o.multiplyScalar(1/Math.sqrt(l)):o.set(0,0,0)}static getBarycoord(e,t,r,o,l){hi.subVectors(o,t),Hi.subVectors(r,t),Sd.subVectors(e,t);const d=hi.dot(hi),c=hi.dot(Hi),f=hi.dot(Sd),h=Hi.dot(Hi),p=Hi.dot(Sd),g=d*h-c*c;if(g===0)return l.set(0,0,0),null;const y=1/g,x=(h*f-c*p)*y,M=(d*p-c*f)*y;return l.set(1-x-M,M,x)}static containsPoint(e,t,r,o){return this.getBarycoord(e,t,r,o,Vi)===null?!1:Vi.x>=0&&Vi.y>=0&&Vi.x+Vi.y<=1}static getUV(e,t,r,o,l,d,c,f){return Rl===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Rl=!0),this.getInterpolation(e,t,r,o,l,d,c,f)}static getInterpolation(e,t,r,o,l,d,c,f){return this.getBarycoord(e,t,r,o,Vi)===null?(f.x=0,f.y=0,"z"in f&&(f.z=0),"w"in f&&(f.w=0),null):(f.setScalar(0),f.addScaledVector(l,Vi.x),f.addScaledVector(d,Vi.y),f.addScaledVector(c,Vi.z),f)}static isFrontFacing(e,t,r,o){return hi.subVectors(r,t),Hi.subVectors(e,t),hi.cross(Hi).dot(o)<0}set(e,t,r){return this.a.copy(e),this.b.copy(t),this.c.copy(r),this}setFromPointsAndIndices(e,t,r,o){return this.a.copy(e[t]),this.b.copy(e[r]),this.c.copy(e[o]),this}setFromAttributeAndIndices(e,t,r,o){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,r),this.c.fromBufferAttribute(e,o),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return hi.subVectors(this.c,this.b),Hi.subVectors(this.a,this.b),hi.cross(Hi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return ii.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return ii.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,r,o,l){return Rl===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Rl=!0),ii.getInterpolation(e,this.a,this.b,this.c,t,r,o,l)}getInterpolation(e,t,r,o,l){return ii.getInterpolation(e,this.a,this.b,this.c,t,r,o,l)}containsPoint(e){return ii.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return ii.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const r=this.a,o=this.b,l=this.c;let d,c;Bs.subVectors(o,r),Hs.subVectors(l,r),Md.subVectors(e,r);const f=Bs.dot(Md),h=Hs.dot(Md);if(f<=0&&h<=0)return t.copy(r);Ed.subVectors(e,o);const p=Bs.dot(Ed),g=Hs.dot(Ed);if(p>=0&&g<=p)return t.copy(o);const y=f*g-p*h;if(y<=0&&f>=0&&p<=0)return d=f/(f-p),t.copy(r).addScaledVector(Bs,d);wd.subVectors(e,l);const x=Bs.dot(wd),M=Hs.dot(wd);if(M>=0&&x<=M)return t.copy(l);const E=x*h-f*M;if(E<=0&&h>=0&&M<=0)return c=h/(h-M),t.copy(r).addScaledVector(Hs,c);const S=p*M-x*g;if(S<=0&&g-p>=0&&x-M>=0)return og.subVectors(l,o),c=(g-p)/(g-p+(x-M)),t.copy(o).addScaledVector(og,c);const v=1/(S+E+y);return d=E*v,c=y*v,t.copy(r).addScaledVector(Bs,d).addScaledVector(Hs,c)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Hv={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},_r={h:0,s:0,l:0},Pl={h:0,s:0,l:0};function Td(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class Et{constructor(e,t,r){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,r)}set(e,t,r){if(t===void 0&&r===void 0){const o=e;o&&o.isColor?this.copy(o):typeof o=="number"?this.setHex(o):typeof o=="string"&&this.setStyle(o)}else this.setRGB(e,t,r);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=dn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Lt.toWorkingColorSpace(this,t),this}setRGB(e,t,r,o=Lt.workingColorSpace){return this.r=e,this.g=t,this.b=r,Lt.toWorkingColorSpace(this,o),this}setHSL(e,t,r,o=Lt.workingColorSpace){if(e=mf(e,1),t=tn(t,0,1),r=tn(r,0,1),t===0)this.r=this.g=this.b=r;else{const l=r<=.5?r*(1+t):r+t-r*t,d=2*r-l;this.r=Td(d,l,e+1/3),this.g=Td(d,l,e),this.b=Td(d,l,e-1/3)}return Lt.toWorkingColorSpace(this,o),this}setStyle(e,t=dn){function r(l){l!==void 0&&parseFloat(l)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let o;if(o=/^(\w+)\(([^\)]*)\)/.exec(e)){let l;const d=o[1],c=o[2];switch(d){case"rgb":case"rgba":if(l=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return r(l[4]),this.setRGB(Math.min(255,parseInt(l[1],10))/255,Math.min(255,parseInt(l[2],10))/255,Math.min(255,parseInt(l[3],10))/255,t);if(l=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return r(l[4]),this.setRGB(Math.min(100,parseInt(l[1],10))/100,Math.min(100,parseInt(l[2],10))/100,Math.min(100,parseInt(l[3],10))/100,t);break;case"hsl":case"hsla":if(l=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return r(l[4]),this.setHSL(parseFloat(l[1])/360,parseFloat(l[2])/100,parseFloat(l[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(o=/^\#([A-Fa-f\d]+)$/.exec(e)){const l=o[1],d=l.length;if(d===3)return this.setRGB(parseInt(l.charAt(0),16)/15,parseInt(l.charAt(1),16)/15,parseInt(l.charAt(2),16)/15,t);if(d===6)return this.setHex(parseInt(l,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=dn){const r=Hv[e.toLowerCase()];return r!==void 0?this.setHex(r,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=io(e.r),this.g=io(e.g),this.b=io(e.b),this}copyLinearToSRGB(e){return this.r=hd(e.r),this.g=hd(e.g),this.b=hd(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=dn){return Lt.fromWorkingColorSpace(yn.copy(this),e),Math.round(tn(yn.r*255,0,255))*65536+Math.round(tn(yn.g*255,0,255))*256+Math.round(tn(yn.b*255,0,255))}getHexString(e=dn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Lt.workingColorSpace){Lt.fromWorkingColorSpace(yn.copy(this),t);const r=yn.r,o=yn.g,l=yn.b,d=Math.max(r,o,l),c=Math.min(r,o,l);let f,h;const p=(c+d)/2;if(c===d)f=0,h=0;else{const g=d-c;switch(h=p<=.5?g/(d+c):g/(2-d-c),d){case r:f=(o-l)/g+(o<l?6:0);break;case o:f=(l-r)/g+2;break;case l:f=(r-o)/g+4;break}f/=6}return e.h=f,e.s=h,e.l=p,e}getRGB(e,t=Lt.workingColorSpace){return Lt.fromWorkingColorSpace(yn.copy(this),t),e.r=yn.r,e.g=yn.g,e.b=yn.b,e}getStyle(e=dn){Lt.fromWorkingColorSpace(yn.copy(this),e);const t=yn.r,r=yn.g,o=yn.b;return e!==dn?`color(${e} ${t.toFixed(3)} ${r.toFixed(3)} ${o.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(r*255)},${Math.round(o*255)})`}offsetHSL(e,t,r){return this.getHSL(_r),this.setHSL(_r.h+e,_r.s+t,_r.l+r)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,r){return this.r=e.r+(t.r-e.r)*r,this.g=e.g+(t.g-e.g)*r,this.b=e.b+(t.b-e.b)*r,this}lerpHSL(e,t){this.getHSL(_r),e.getHSL(Pl);const r=ea(_r.h,Pl.h,t),o=ea(_r.s,Pl.s,t),l=ea(_r.l,Pl.l,t);return this.setHSL(r,o,l),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,r=this.g,o=this.b,l=e.elements;return this.r=l[0]*t+l[3]*r+l[6]*o,this.g=l[1]*t+l[4]*r+l[7]*o,this.b=l[2]*t+l[5]*r+l[8]*o,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const yn=new Et;Et.NAMES=Hv;let ZS=0;class ho extends as{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ZS++}),this.uuid=fo(),this.name="",this.type="Material",this.blending=to,this.side=Pr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Yd,this.blendDst=qd,this.blendEquation=Jr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Et(0,0,0),this.blendAlpha=0,this.depthFunc=Ql,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Xm,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ds,this.stencilZFail=Ds,this.stencilZPass=Ds,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const r=e[t];if(r===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const o=this[t];if(o===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}o&&o.isColor?o.set(r):o&&o.isVector3&&r&&r.isVector3?o.copy(r):this[t]=r}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const r={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.color&&this.color.isColor&&(r.color=this.color.getHex()),this.roughness!==void 0&&(r.roughness=this.roughness),this.metalness!==void 0&&(r.metalness=this.metalness),this.sheen!==void 0&&(r.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(r.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(r.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(r.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(r.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(r.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(r.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(r.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(r.shininess=this.shininess),this.clearcoat!==void 0&&(r.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(r.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(r.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(r.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(r.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,r.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(r.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(r.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(r.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(r.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(r.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(r.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(r.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(r.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(r.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(r.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(r.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(r.lightMap=this.lightMap.toJSON(e).uuid,r.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(r.aoMap=this.aoMap.toJSON(e).uuid,r.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(r.bumpMap=this.bumpMap.toJSON(e).uuid,r.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(r.normalMap=this.normalMap.toJSON(e).uuid,r.normalMapType=this.normalMapType,r.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(r.displacementMap=this.displacementMap.toJSON(e).uuid,r.displacementScale=this.displacementScale,r.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(r.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(r.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(r.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(r.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(r.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(r.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(r.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(r.combine=this.combine)),this.envMapIntensity!==void 0&&(r.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(r.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(r.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(r.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(r.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(r.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(r.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(r.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(r.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(r.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(r.size=this.size),this.shadowSide!==null&&(r.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(r.sizeAttenuation=this.sizeAttenuation),this.blending!==to&&(r.blending=this.blending),this.side!==Pr&&(r.side=this.side),this.vertexColors===!0&&(r.vertexColors=!0),this.opacity<1&&(r.opacity=this.opacity),this.transparent===!0&&(r.transparent=!0),this.blendSrc!==Yd&&(r.blendSrc=this.blendSrc),this.blendDst!==qd&&(r.blendDst=this.blendDst),this.blendEquation!==Jr&&(r.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(r.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(r.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(r.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(r.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(r.blendAlpha=this.blendAlpha),this.depthFunc!==Ql&&(r.depthFunc=this.depthFunc),this.depthTest===!1&&(r.depthTest=this.depthTest),this.depthWrite===!1&&(r.depthWrite=this.depthWrite),this.colorWrite===!1&&(r.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(r.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Xm&&(r.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(r.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(r.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ds&&(r.stencilFail=this.stencilFail),this.stencilZFail!==Ds&&(r.stencilZFail=this.stencilZFail),this.stencilZPass!==Ds&&(r.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(r.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(r.rotation=this.rotation),this.polygonOffset===!0&&(r.polygonOffset=!0),this.polygonOffsetFactor!==0&&(r.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(r.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(r.linewidth=this.linewidth),this.dashSize!==void 0&&(r.dashSize=this.dashSize),this.gapSize!==void 0&&(r.gapSize=this.gapSize),this.scale!==void 0&&(r.scale=this.scale),this.dithering===!0&&(r.dithering=!0),this.alphaTest>0&&(r.alphaTest=this.alphaTest),this.alphaHash===!0&&(r.alphaHash=!0),this.alphaToCoverage===!0&&(r.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(r.premultipliedAlpha=!0),this.forceSinglePass===!0&&(r.forceSinglePass=!0),this.wireframe===!0&&(r.wireframe=!0),this.wireframeLinewidth>1&&(r.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(r.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(r.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(r.flatShading=!0),this.visible===!1&&(r.visible=!1),this.toneMapped===!1&&(r.toneMapped=!1),this.fog===!1&&(r.fog=!1),Object.keys(this.userData).length>0&&(r.userData=this.userData);function o(l){const d=[];for(const c in l){const f=l[c];delete f.metadata,d.push(f)}return d}if(t){const l=o(e.textures),d=o(e.images);l.length>0&&(r.textures=l),d.length>0&&(r.images=d)}return r}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let r=null;if(t!==null){const o=t.length;r=new Array(o);for(let l=0;l!==o;++l)r[l]=t[l].clone()}return this.clippingPlanes=r,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class ro extends ho{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Et(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Ev,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Zt=new z,Ll=new Be;class $n{constructor(e,t,r=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=r,this.usage=$m,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Er,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,r){e*=this.itemSize,r*=t.itemSize;for(let o=0,l=this.itemSize;o<l;o++)this.array[e+o]=t.array[r+o];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,r=this.count;t<r;t++)Ll.fromBufferAttribute(this,t),Ll.applyMatrix3(e),this.setXY(t,Ll.x,Ll.y);else if(this.itemSize===3)for(let t=0,r=this.count;t<r;t++)Zt.fromBufferAttribute(this,t),Zt.applyMatrix3(e),this.setXYZ(t,Zt.x,Zt.y,Zt.z);return this}applyMatrix4(e){for(let t=0,r=this.count;t<r;t++)Zt.fromBufferAttribute(this,t),Zt.applyMatrix4(e),this.setXYZ(t,Zt.x,Zt.y,Zt.z);return this}applyNormalMatrix(e){for(let t=0,r=this.count;t<r;t++)Zt.fromBufferAttribute(this,t),Zt.applyNormalMatrix(e),this.setXYZ(t,Zt.x,Zt.y,Zt.z);return this}transformDirection(e){for(let t=0,r=this.count;t<r;t++)Zt.fromBufferAttribute(this,t),Zt.transformDirection(e),this.setXYZ(t,Zt.x,Zt.y,Zt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let r=this.array[e*this.itemSize+t];return this.normalized&&(r=Js(r,this.array)),r}setComponent(e,t,r){return this.normalized&&(r=An(r,this.array)),this.array[e*this.itemSize+t]=r,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Js(t,this.array)),t}setX(e,t){return this.normalized&&(t=An(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Js(t,this.array)),t}setY(e,t){return this.normalized&&(t=An(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Js(t,this.array)),t}setZ(e,t){return this.normalized&&(t=An(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Js(t,this.array)),t}setW(e,t){return this.normalized&&(t=An(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,r){return e*=this.itemSize,this.normalized&&(t=An(t,this.array),r=An(r,this.array)),this.array[e+0]=t,this.array[e+1]=r,this}setXYZ(e,t,r,o){return e*=this.itemSize,this.normalized&&(t=An(t,this.array),r=An(r,this.array),o=An(o,this.array)),this.array[e+0]=t,this.array[e+1]=r,this.array[e+2]=o,this}setXYZW(e,t,r,o,l){return e*=this.itemSize,this.normalized&&(t=An(t,this.array),r=An(r,this.array),o=An(o,this.array),l=An(l,this.array)),this.array[e+0]=t,this.array[e+1]=r,this.array[e+2]=o,this.array[e+3]=l,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==$m&&(e.usage=this.usage),e}}class Vv extends $n{constructor(e,t,r){super(new Uint16Array(e),t,r)}}class Gv extends $n{constructor(e,t,r){super(new Uint32Array(e),t,r)}}class Ft extends $n{constructor(e,t,r){super(new Float32Array(e),t,r)}}let JS=0;const ti=new Ht,Ad=new rn,Vs=new z,jn=new fa,Jo=new fa,un=new z;class Sn extends as{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:JS++}),this.uuid=fo(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ov(e)?Gv:Vv)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,r=0){this.groups.push({start:e,count:t,materialIndex:r})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const r=this.attributes.normal;if(r!==void 0){const l=new Mt().getNormalMatrix(e);r.applyNormalMatrix(l),r.needsUpdate=!0}const o=this.attributes.tangent;return o!==void 0&&(o.transformDirection(e),o.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return ti.makeRotationFromQuaternion(e),this.applyMatrix4(ti),this}rotateX(e){return ti.makeRotationX(e),this.applyMatrix4(ti),this}rotateY(e){return ti.makeRotationY(e),this.applyMatrix4(ti),this}rotateZ(e){return ti.makeRotationZ(e),this.applyMatrix4(ti),this}translate(e,t,r){return ti.makeTranslation(e,t,r),this.applyMatrix4(ti),this}scale(e,t,r){return ti.makeScale(e,t,r),this.applyMatrix4(ti),this}lookAt(e){return Ad.lookAt(e),Ad.updateMatrix(),this.applyMatrix4(Ad.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Vs).negate(),this.translate(Vs.x,Vs.y,Vs.z),this}setFromPoints(e){const t=[];for(let r=0,o=e.length;r<o;r++){const l=e[r];t.push(l.x,l.y,l.z||0)}return this.setAttribute("position",new Ft(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new fa);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new z(-1/0,-1/0,-1/0),new z(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const l=t[r];jn.setFromBufferAttribute(l),this.morphTargetsRelative?(un.addVectors(this.boundingBox.min,jn.min),this.boundingBox.expandByPoint(un),un.addVectors(this.boundingBox.max,jn.max),this.boundingBox.expandByPoint(un)):(this.boundingBox.expandByPoint(jn.min),this.boundingBox.expandByPoint(jn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new xc);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new z,1/0);return}if(e){const r=this.boundingSphere.center;if(jn.setFromBufferAttribute(e),t)for(let l=0,d=t.length;l<d;l++){const c=t[l];Jo.setFromBufferAttribute(c),this.morphTargetsRelative?(un.addVectors(jn.min,Jo.min),jn.expandByPoint(un),un.addVectors(jn.max,Jo.max),jn.expandByPoint(un)):(jn.expandByPoint(Jo.min),jn.expandByPoint(Jo.max))}jn.getCenter(r);let o=0;for(let l=0,d=e.count;l<d;l++)un.fromBufferAttribute(e,l),o=Math.max(o,r.distanceToSquared(un));if(t)for(let l=0,d=t.length;l<d;l++){const c=t[l],f=this.morphTargetsRelative;for(let h=0,p=c.count;h<p;h++)un.fromBufferAttribute(c,h),f&&(Vs.fromBufferAttribute(e,h),un.add(Vs)),o=Math.max(o,r.distanceToSquared(un))}this.boundingSphere.radius=Math.sqrt(o),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const r=e.array,o=t.position.array,l=t.normal.array,d=t.uv.array,c=o.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new $n(new Float32Array(4*c),4));const f=this.getAttribute("tangent").array,h=[],p=[];for(let D=0;D<c;D++)h[D]=new z,p[D]=new z;const g=new z,y=new z,x=new z,M=new Be,E=new Be,S=new Be,v=new z,w=new z;function A(D,re,ae){g.fromArray(o,D*3),y.fromArray(o,re*3),x.fromArray(o,ae*3),M.fromArray(d,D*2),E.fromArray(d,re*2),S.fromArray(d,ae*2),y.sub(g),x.sub(g),E.sub(M),S.sub(M);const me=1/(E.x*S.y-S.x*E.y);isFinite(me)&&(v.copy(y).multiplyScalar(S.y).addScaledVector(x,-E.y).multiplyScalar(me),w.copy(x).multiplyScalar(E.x).addScaledVector(y,-S.x).multiplyScalar(me),h[D].add(v),h[re].add(v),h[ae].add(v),p[D].add(w),p[re].add(w),p[ae].add(w))}let P=this.groups;P.length===0&&(P=[{start:0,count:r.length}]);for(let D=0,re=P.length;D<re;++D){const ae=P[D],me=ae.start,F=ae.count;for(let $=me,J=me+F;$<J;$+=3)A(r[$+0],r[$+1],r[$+2])}const B=new z,U=new z,I=new z,ne=new z;function R(D){I.fromArray(l,D*3),ne.copy(I);const re=h[D];B.copy(re),B.sub(I.multiplyScalar(I.dot(re))).normalize(),U.crossVectors(ne,re);const me=U.dot(p[D])<0?-1:1;f[D*4]=B.x,f[D*4+1]=B.y,f[D*4+2]=B.z,f[D*4+3]=me}for(let D=0,re=P.length;D<re;++D){const ae=P[D],me=ae.start,F=ae.count;for(let $=me,J=me+F;$<J;$+=3)R(r[$+0]),R(r[$+1]),R(r[$+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let r=this.getAttribute("normal");if(r===void 0)r=new $n(new Float32Array(t.count*3),3),this.setAttribute("normal",r);else for(let y=0,x=r.count;y<x;y++)r.setXYZ(y,0,0,0);const o=new z,l=new z,d=new z,c=new z,f=new z,h=new z,p=new z,g=new z;if(e)for(let y=0,x=e.count;y<x;y+=3){const M=e.getX(y+0),E=e.getX(y+1),S=e.getX(y+2);o.fromBufferAttribute(t,M),l.fromBufferAttribute(t,E),d.fromBufferAttribute(t,S),p.subVectors(d,l),g.subVectors(o,l),p.cross(g),c.fromBufferAttribute(r,M),f.fromBufferAttribute(r,E),h.fromBufferAttribute(r,S),c.add(p),f.add(p),h.add(p),r.setXYZ(M,c.x,c.y,c.z),r.setXYZ(E,f.x,f.y,f.z),r.setXYZ(S,h.x,h.y,h.z)}else for(let y=0,x=t.count;y<x;y+=3)o.fromBufferAttribute(t,y+0),l.fromBufferAttribute(t,y+1),d.fromBufferAttribute(t,y+2),p.subVectors(d,l),g.subVectors(o,l),p.cross(g),r.setXYZ(y+0,p.x,p.y,p.z),r.setXYZ(y+1,p.x,p.y,p.z),r.setXYZ(y+2,p.x,p.y,p.z);this.normalizeNormals(),r.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,r=e.count;t<r;t++)un.fromBufferAttribute(e,t),un.normalize(),e.setXYZ(t,un.x,un.y,un.z)}toNonIndexed(){function e(c,f){const h=c.array,p=c.itemSize,g=c.normalized,y=new h.constructor(f.length*p);let x=0,M=0;for(let E=0,S=f.length;E<S;E++){c.isInterleavedBufferAttribute?x=f[E]*c.data.stride+c.offset:x=f[E]*p;for(let v=0;v<p;v++)y[M++]=h[x++]}return new $n(y,p,g)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Sn,r=this.index.array,o=this.attributes;for(const c in o){const f=o[c],h=e(f,r);t.setAttribute(c,h)}const l=this.morphAttributes;for(const c in l){const f=[],h=l[c];for(let p=0,g=h.length;p<g;p++){const y=h[p],x=e(y,r);f.push(x)}t.morphAttributes[c]=f}t.morphTargetsRelative=this.morphTargetsRelative;const d=this.groups;for(let c=0,f=d.length;c<f;c++){const h=d[c];t.addGroup(h.start,h.count,h.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const f=this.parameters;for(const h in f)f[h]!==void 0&&(e[h]=f[h]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const r=this.attributes;for(const f in r){const h=r[f];e.data.attributes[f]=h.toJSON(e.data)}const o={};let l=!1;for(const f in this.morphAttributes){const h=this.morphAttributes[f],p=[];for(let g=0,y=h.length;g<y;g++){const x=h[g];p.push(x.toJSON(e.data))}p.length>0&&(o[f]=p,l=!0)}l&&(e.data.morphAttributes=o,e.data.morphTargetsRelative=this.morphTargetsRelative);const d=this.groups;d.length>0&&(e.data.groups=JSON.parse(JSON.stringify(d)));const c=this.boundingSphere;return c!==null&&(e.data.boundingSphere={center:c.center.toArray(),radius:c.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const r=e.index;r!==null&&this.setIndex(r.clone(t));const o=e.attributes;for(const h in o){const p=o[h];this.setAttribute(h,p.clone(t))}const l=e.morphAttributes;for(const h in l){const p=[],g=l[h];for(let y=0,x=g.length;y<x;y++)p.push(g[y].clone(t));this.morphAttributes[h]=p}this.morphTargetsRelative=e.morphTargetsRelative;const d=e.groups;for(let h=0,p=d.length;h<p;h++){const g=d[h];this.addGroup(g.start,g.count,g.materialIndex)}const c=e.boundingBox;c!==null&&(this.boundingBox=c.clone());const f=e.boundingSphere;return f!==null&&(this.boundingSphere=f.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ag=new Ht,qr=new gf,Nl=new xc,lg=new z,Gs=new z,Ws=new z,js=new z,bd=new z,Dl=new z,Ul=new Be,Il=new Be,Ol=new Be,cg=new z,ug=new z,dg=new z,Fl=new z,kl=new z;class Rt extends rn{constructor(e=new Sn,t=new ro){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,r=Object.keys(t);if(r.length>0){const o=t[r[0]];if(o!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let l=0,d=o.length;l<d;l++){const c=o[l].name||String(l);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=l}}}}getVertexPosition(e,t){const r=this.geometry,o=r.attributes.position,l=r.morphAttributes.position,d=r.morphTargetsRelative;t.fromBufferAttribute(o,e);const c=this.morphTargetInfluences;if(l&&c){Dl.set(0,0,0);for(let f=0,h=l.length;f<h;f++){const p=c[f],g=l[f];p!==0&&(bd.fromBufferAttribute(g,e),d?Dl.addScaledVector(bd,p):Dl.addScaledVector(bd.sub(t),p))}t.add(Dl)}return t}raycast(e,t){const r=this.geometry,o=this.material,l=this.matrixWorld;o!==void 0&&(r.boundingSphere===null&&r.computeBoundingSphere(),Nl.copy(r.boundingSphere),Nl.applyMatrix4(l),qr.copy(e.ray).recast(e.near),!(Nl.containsPoint(qr.origin)===!1&&(qr.intersectSphere(Nl,lg)===null||qr.origin.distanceToSquared(lg)>(e.far-e.near)**2))&&(ag.copy(l).invert(),qr.copy(e.ray).applyMatrix4(ag),!(r.boundingBox!==null&&qr.intersectsBox(r.boundingBox)===!1)&&this._computeIntersections(e,t,qr)))}_computeIntersections(e,t,r){let o;const l=this.geometry,d=this.material,c=l.index,f=l.attributes.position,h=l.attributes.uv,p=l.attributes.uv1,g=l.attributes.normal,y=l.groups,x=l.drawRange;if(c!==null)if(Array.isArray(d))for(let M=0,E=y.length;M<E;M++){const S=y[M],v=d[S.materialIndex],w=Math.max(S.start,x.start),A=Math.min(c.count,Math.min(S.start+S.count,x.start+x.count));for(let P=w,B=A;P<B;P+=3){const U=c.getX(P),I=c.getX(P+1),ne=c.getX(P+2);o=zl(this,v,e,r,h,p,g,U,I,ne),o&&(o.faceIndex=Math.floor(P/3),o.face.materialIndex=S.materialIndex,t.push(o))}}else{const M=Math.max(0,x.start),E=Math.min(c.count,x.start+x.count);for(let S=M,v=E;S<v;S+=3){const w=c.getX(S),A=c.getX(S+1),P=c.getX(S+2);o=zl(this,d,e,r,h,p,g,w,A,P),o&&(o.faceIndex=Math.floor(S/3),t.push(o))}}else if(f!==void 0)if(Array.isArray(d))for(let M=0,E=y.length;M<E;M++){const S=y[M],v=d[S.materialIndex],w=Math.max(S.start,x.start),A=Math.min(f.count,Math.min(S.start+S.count,x.start+x.count));for(let P=w,B=A;P<B;P+=3){const U=P,I=P+1,ne=P+2;o=zl(this,v,e,r,h,p,g,U,I,ne),o&&(o.faceIndex=Math.floor(P/3),o.face.materialIndex=S.materialIndex,t.push(o))}}else{const M=Math.max(0,x.start),E=Math.min(f.count,x.start+x.count);for(let S=M,v=E;S<v;S+=3){const w=S,A=S+1,P=S+2;o=zl(this,d,e,r,h,p,g,w,A,P),o&&(o.faceIndex=Math.floor(S/3),t.push(o))}}}}function QS(s,e,t,r,o,l,d,c){let f;if(e.side===Rn?f=r.intersectTriangle(d,l,o,!0,c):f=r.intersectTriangle(o,l,d,e.side===Pr,c),f===null)return null;kl.copy(c),kl.applyMatrix4(s.matrixWorld);const h=t.ray.origin.distanceTo(kl);return h<t.near||h>t.far?null:{distance:h,point:kl.clone(),object:s}}function zl(s,e,t,r,o,l,d,c,f,h){s.getVertexPosition(c,Gs),s.getVertexPosition(f,Ws),s.getVertexPosition(h,js);const p=QS(s,e,t,r,Gs,Ws,js,Fl);if(p){o&&(Ul.fromBufferAttribute(o,c),Il.fromBufferAttribute(o,f),Ol.fromBufferAttribute(o,h),p.uv=ii.getInterpolation(Fl,Gs,Ws,js,Ul,Il,Ol,new Be)),l&&(Ul.fromBufferAttribute(l,c),Il.fromBufferAttribute(l,f),Ol.fromBufferAttribute(l,h),p.uv1=ii.getInterpolation(Fl,Gs,Ws,js,Ul,Il,Ol,new Be),p.uv2=p.uv1),d&&(cg.fromBufferAttribute(d,c),ug.fromBufferAttribute(d,f),dg.fromBufferAttribute(d,h),p.normal=ii.getInterpolation(Fl,Gs,Ws,js,cg,ug,dg,new z),p.normal.dot(r.direction)>0&&p.normal.multiplyScalar(-1));const g={a:c,b:f,c:h,normal:new z,materialIndex:0};ii.getNormal(Gs,Ws,js,g.normal),p.face=g}return p}class Ti extends Sn{constructor(e=1,t=1,r=1,o=1,l=1,d=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:r,widthSegments:o,heightSegments:l,depthSegments:d};const c=this;o=Math.floor(o),l=Math.floor(l),d=Math.floor(d);const f=[],h=[],p=[],g=[];let y=0,x=0;M("z","y","x",-1,-1,r,t,e,d,l,0),M("z","y","x",1,-1,r,t,-e,d,l,1),M("x","z","y",1,1,e,r,t,o,d,2),M("x","z","y",1,-1,e,r,-t,o,d,3),M("x","y","z",1,-1,e,t,r,o,l,4),M("x","y","z",-1,-1,e,t,-r,o,l,5),this.setIndex(f),this.setAttribute("position",new Ft(h,3)),this.setAttribute("normal",new Ft(p,3)),this.setAttribute("uv",new Ft(g,2));function M(E,S,v,w,A,P,B,U,I,ne,R){const D=P/I,re=B/ne,ae=P/2,me=B/2,F=U/2,$=I+1,J=ne+1;let K=0,X=0;const Z=new z;for(let Y=0;Y<J;Y++){const O=Y*re-me;for(let W=0;W<$;W++){const q=W*D-ae;Z[E]=q*w,Z[S]=O*A,Z[v]=F,h.push(Z.x,Z.y,Z.z),Z[E]=0,Z[S]=0,Z[v]=U>0?1:-1,p.push(Z.x,Z.y,Z.z),g.push(W/I),g.push(1-Y/ne),K+=1}}for(let Y=0;Y<ne;Y++)for(let O=0;O<I;O++){const W=y+O+$*Y,q=y+O+$*(Y+1),fe=y+(O+1)+$*(Y+1),ve=y+(O+1)+$*Y;f.push(W,q,ve),f.push(q,fe,ve),X+=6}c.addGroup(x,X,R),x+=X,y+=K}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ti(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function co(s){const e={};for(const t in s){e[t]={};for(const r in s[t]){const o=s[t][r];o&&(o.isColor||o.isMatrix3||o.isMatrix4||o.isVector2||o.isVector3||o.isVector4||o.isTexture||o.isQuaternion)?o.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][r]=null):e[t][r]=o.clone():Array.isArray(o)?e[t][r]=o.slice():e[t][r]=o}}return e}function bn(s){const e={};for(let t=0;t<s.length;t++){const r=co(s[t]);for(const o in r)e[o]=r[o]}return e}function eM(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function Wv(s){return s.getRenderTarget()===null?s.outputColorSpace:Lt.workingColorSpace}const tM={clone:co,merge:bn};var nM=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,iM=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class os extends ho{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=nM,this.fragmentShader=iM,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=co(e.uniforms),this.uniformsGroups=eM(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const o in this.uniforms){const d=this.uniforms[o].value;d&&d.isTexture?t.uniforms[o]={type:"t",value:d.toJSON(e).uuid}:d&&d.isColor?t.uniforms[o]={type:"c",value:d.getHex()}:d&&d.isVector2?t.uniforms[o]={type:"v2",value:d.toArray()}:d&&d.isVector3?t.uniforms[o]={type:"v3",value:d.toArray()}:d&&d.isVector4?t.uniforms[o]={type:"v4",value:d.toArray()}:d&&d.isMatrix3?t.uniforms[o]={type:"m3",value:d.toArray()}:d&&d.isMatrix4?t.uniforms[o]={type:"m4",value:d.toArray()}:t.uniforms[o]={value:d}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const r={};for(const o in this.extensions)this.extensions[o]===!0&&(r[o]=!0);return Object.keys(r).length>0&&(t.extensions=r),t}}class jv extends rn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ht,this.projectionMatrix=new Ht,this.projectionMatrixInverse=new Ht,this.coordinateSystem=Wi}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Xn extends jv{constructor(e=50,t=1,r=.1,o=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=r,this.far=o,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=la*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(no*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return la*2*Math.atan(Math.tan(no*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,r,o,l,d){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=r,this.view.offsetY=o,this.view.width=l,this.view.height=d,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(no*.5*this.fov)/this.zoom,r=2*t,o=this.aspect*r,l=-.5*o;const d=this.view;if(this.view!==null&&this.view.enabled){const f=d.fullWidth,h=d.fullHeight;l+=d.offsetX*o/f,t-=d.offsetY*r/h,o*=d.width/f,r*=d.height/h}const c=this.filmOffset;c!==0&&(l+=e*c/this.getFilmWidth()),this.projectionMatrix.makePerspective(l,l+o,t,t-r,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Xs=-90,$s=1;class rM extends rn{constructor(e,t,r){super(),this.type="CubeCamera",this.renderTarget=r,this.coordinateSystem=null,this.activeMipmapLevel=0;const o=new Xn(Xs,$s,e,t);o.layers=this.layers,this.add(o);const l=new Xn(Xs,$s,e,t);l.layers=this.layers,this.add(l);const d=new Xn(Xs,$s,e,t);d.layers=this.layers,this.add(d);const c=new Xn(Xs,$s,e,t);c.layers=this.layers,this.add(c);const f=new Xn(Xs,$s,e,t);f.layers=this.layers,this.add(f);const h=new Xn(Xs,$s,e,t);h.layers=this.layers,this.add(h)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[r,o,l,d,c,f]=t;for(const h of t)this.remove(h);if(e===Wi)r.up.set(0,1,0),r.lookAt(1,0,0),o.up.set(0,1,0),o.lookAt(-1,0,0),l.up.set(0,0,-1),l.lookAt(0,1,0),d.up.set(0,0,1),d.lookAt(0,-1,0),c.up.set(0,1,0),c.lookAt(0,0,1),f.up.set(0,1,0),f.lookAt(0,0,-1);else if(e===rc)r.up.set(0,-1,0),r.lookAt(-1,0,0),o.up.set(0,-1,0),o.lookAt(1,0,0),l.up.set(0,0,1),l.lookAt(0,1,0),d.up.set(0,0,-1),d.lookAt(0,-1,0),c.up.set(0,-1,0),c.lookAt(0,0,1),f.up.set(0,-1,0),f.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const h of t)this.add(h),h.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:r,activeMipmapLevel:o}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[l,d,c,f,h,p]=this.children,g=e.getRenderTarget(),y=e.getActiveCubeFace(),x=e.getActiveMipmapLevel(),M=e.xr.enabled;e.xr.enabled=!1;const E=r.texture.generateMipmaps;r.texture.generateMipmaps=!1,e.setRenderTarget(r,0,o),e.render(t,l),e.setRenderTarget(r,1,o),e.render(t,d),e.setRenderTarget(r,2,o),e.render(t,c),e.setRenderTarget(r,3,o),e.render(t,f),e.setRenderTarget(r,4,o),e.render(t,h),r.texture.generateMipmaps=E,e.setRenderTarget(r,5,o),e.render(t,p),e.setRenderTarget(g,y,x),e.xr.enabled=M,r.texture.needsPMREMUpdate=!0}}class Xv extends zn{constructor(e,t,r,o,l,d,c,f,h,p){e=e!==void 0?e:[],t=t!==void 0?t:oo,super(e,t,r,o,l,d,c,f,h,p),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class sM extends ss{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const r={width:e,height:e,depth:1},o=[r,r,r,r,r,r];t.encoding!==void 0&&(ta("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===is?dn:ri),this.texture=new Xv(o,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:ni}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const r={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},o=new Ti(5,5,5),l=new os({name:"CubemapFromEquirect",uniforms:co(r.uniforms),vertexShader:r.vertexShader,fragmentShader:r.fragmentShader,side:Rn,blending:Ar});l.uniforms.tEquirect.value=t;const d=new Rt(o,l),c=t.minFilter;return t.minFilter===oa&&(t.minFilter=ni),new rM(1,10,this).update(e,d),t.minFilter=c,d.geometry.dispose(),d.material.dispose(),this}clear(e,t,r,o){const l=e.getRenderTarget();for(let d=0;d<6;d++)e.setRenderTarget(this,d),e.clear(t,r,o);e.setRenderTarget(l)}}const Cd=new z,oM=new z,aM=new Mt;class yr{constructor(e=new z(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,r,o){return this.normal.set(e,t,r),this.constant=o,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,r){const o=Cd.subVectors(r,t).cross(oM.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(o,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const r=e.delta(Cd),o=this.normal.dot(r);if(o===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const l=-(e.start.dot(this.normal)+this.constant)/o;return l<0||l>1?null:t.copy(e.start).addScaledVector(r,l)}intersectsLine(e){const t=this.distanceToPoint(e.start),r=this.distanceToPoint(e.end);return t<0&&r>0||r<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const r=t||aM.getNormalMatrix(e),o=this.coplanarPoint(Cd).applyMatrix4(e),l=this.normal.applyMatrix3(r).normalize();return this.constant=-o.dot(l),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Kr=new xc,Bl=new z;class vf{constructor(e=new yr,t=new yr,r=new yr,o=new yr,l=new yr,d=new yr){this.planes=[e,t,r,o,l,d]}set(e,t,r,o,l,d){const c=this.planes;return c[0].copy(e),c[1].copy(t),c[2].copy(r),c[3].copy(o),c[4].copy(l),c[5].copy(d),this}copy(e){const t=this.planes;for(let r=0;r<6;r++)t[r].copy(e.planes[r]);return this}setFromProjectionMatrix(e,t=Wi){const r=this.planes,o=e.elements,l=o[0],d=o[1],c=o[2],f=o[3],h=o[4],p=o[5],g=o[6],y=o[7],x=o[8],M=o[9],E=o[10],S=o[11],v=o[12],w=o[13],A=o[14],P=o[15];if(r[0].setComponents(f-l,y-h,S-x,P-v).normalize(),r[1].setComponents(f+l,y+h,S+x,P+v).normalize(),r[2].setComponents(f+d,y+p,S+M,P+w).normalize(),r[3].setComponents(f-d,y-p,S-M,P-w).normalize(),r[4].setComponents(f-c,y-g,S-E,P-A).normalize(),t===Wi)r[5].setComponents(f+c,y+g,S+E,P+A).normalize();else if(t===rc)r[5].setComponents(c,g,E,A).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Kr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Kr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Kr)}intersectsSprite(e){return Kr.center.set(0,0,0),Kr.radius=.7071067811865476,Kr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Kr)}intersectsSphere(e){const t=this.planes,r=e.center,o=-e.radius;for(let l=0;l<6;l++)if(t[l].distanceToPoint(r)<o)return!1;return!0}intersectsBox(e){const t=this.planes;for(let r=0;r<6;r++){const o=t[r];if(Bl.x=o.normal.x>0?e.max.x:e.min.x,Bl.y=o.normal.y>0?e.max.y:e.min.y,Bl.z=o.normal.z>0?e.max.z:e.min.z,o.distanceToPoint(Bl)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let r=0;r<6;r++)if(t[r].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function $v(){let s=null,e=!1,t=null,r=null;function o(l,d){t(l,d),r=s.requestAnimationFrame(o)}return{start:function(){e!==!0&&t!==null&&(r=s.requestAnimationFrame(o),e=!0)},stop:function(){s.cancelAnimationFrame(r),e=!1},setAnimationLoop:function(l){t=l},setContext:function(l){s=l}}}function lM(s,e){const t=e.isWebGL2,r=new WeakMap;function o(h,p){const g=h.array,y=h.usage,x=g.byteLength,M=s.createBuffer();s.bindBuffer(p,M),s.bufferData(p,g,y),h.onUploadCallback();let E;if(g instanceof Float32Array)E=s.FLOAT;else if(g instanceof Uint16Array)if(h.isFloat16BufferAttribute)if(t)E=s.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else E=s.UNSIGNED_SHORT;else if(g instanceof Int16Array)E=s.SHORT;else if(g instanceof Uint32Array)E=s.UNSIGNED_INT;else if(g instanceof Int32Array)E=s.INT;else if(g instanceof Int8Array)E=s.BYTE;else if(g instanceof Uint8Array)E=s.UNSIGNED_BYTE;else if(g instanceof Uint8ClampedArray)E=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+g);return{buffer:M,type:E,bytesPerElement:g.BYTES_PER_ELEMENT,version:h.version,size:x}}function l(h,p,g){const y=p.array,x=p._updateRange,M=p.updateRanges;if(s.bindBuffer(g,h),x.count===-1&&M.length===0&&s.bufferSubData(g,0,y),M.length!==0){for(let E=0,S=M.length;E<S;E++){const v=M[E];t?s.bufferSubData(g,v.start*y.BYTES_PER_ELEMENT,y,v.start,v.count):s.bufferSubData(g,v.start*y.BYTES_PER_ELEMENT,y.subarray(v.start,v.start+v.count))}p.clearUpdateRanges()}x.count!==-1&&(t?s.bufferSubData(g,x.offset*y.BYTES_PER_ELEMENT,y,x.offset,x.count):s.bufferSubData(g,x.offset*y.BYTES_PER_ELEMENT,y.subarray(x.offset,x.offset+x.count)),x.count=-1),p.onUploadCallback()}function d(h){return h.isInterleavedBufferAttribute&&(h=h.data),r.get(h)}function c(h){h.isInterleavedBufferAttribute&&(h=h.data);const p=r.get(h);p&&(s.deleteBuffer(p.buffer),r.delete(h))}function f(h,p){if(h.isGLBufferAttribute){const y=r.get(h);(!y||y.version<h.version)&&r.set(h,{buffer:h.buffer,type:h.type,bytesPerElement:h.elementSize,version:h.version});return}h.isInterleavedBufferAttribute&&(h=h.data);const g=r.get(h);if(g===void 0)r.set(h,o(h,p));else if(g.version<h.version){if(g.size!==h.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");l(g.buffer,h,p),g.version=h.version}}return{get:d,remove:c,update:f}}class yc extends Sn{constructor(e=1,t=1,r=1,o=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:r,heightSegments:o};const l=e/2,d=t/2,c=Math.floor(r),f=Math.floor(o),h=c+1,p=f+1,g=e/c,y=t/f,x=[],M=[],E=[],S=[];for(let v=0;v<p;v++){const w=v*y-d;for(let A=0;A<h;A++){const P=A*g-l;M.push(P,-w,0),E.push(0,0,1),S.push(A/c),S.push(1-v/f)}}for(let v=0;v<f;v++)for(let w=0;w<c;w++){const A=w+h*v,P=w+h*(v+1),B=w+1+h*(v+1),U=w+1+h*v;x.push(A,P,U),x.push(P,B,U)}this.setIndex(x),this.setAttribute("position",new Ft(M,3)),this.setAttribute("normal",new Ft(E,3)),this.setAttribute("uv",new Ft(S,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new yc(e.width,e.height,e.widthSegments,e.heightSegments)}}var cM=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,uM=`#ifdef USE_ALPHAHASH
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
#endif`,dM=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,fM=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,hM=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,pM=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,mM=`#ifdef USE_AOMAP
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
#endif`,gM=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,vM=`#ifdef USE_BATCHING
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
#endif`,xM=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,_M=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,yM=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,SM=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,MM=`#ifdef USE_IRIDESCENCE
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
#endif`,EM=`#ifdef USE_BUMPMAP
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
#endif`,wM=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,TM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,AM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,bM=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,CM=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,RM=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,PM=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,LM=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,NM=`#define PI 3.141592653589793
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
} // validated`,DM=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,UM=`vec3 transformedNormal = objectNormal;
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
#endif`,IM=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,OM=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,FM=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,kM=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,zM="gl_FragColor = linearToOutputTexel( gl_FragColor );",BM=`
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
}`,HM=`#ifdef USE_ENVMAP
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
#endif`,VM=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,GM=`#ifdef USE_ENVMAP
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
#endif`,WM=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,jM=`#ifdef USE_ENVMAP
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
#endif`,XM=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,$M=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,YM=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,qM=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,KM=`#ifdef USE_GRADIENTMAP
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
}`,ZM=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,JM=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,QM=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,eE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,tE=`uniform bool receiveShadow;
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
#endif`,nE=`#ifdef USE_ENVMAP
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
#endif`,iE=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,rE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,sE=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,oE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,aE=`PhysicalMaterial material;
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
#endif`,lE=`struct PhysicalMaterial {
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
}`,cE=`
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
#endif`,uE=`#if defined( RE_IndirectDiffuse )
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
#endif`,dE=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,fE=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,hE=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,pE=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,mE=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,gE=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,vE=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,xE=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,_E=`#if defined( USE_POINTS_UV )
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
#endif`,yE=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,SE=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ME=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,EE=`#ifdef USE_MORPHNORMALS
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
#endif`,wE=`#ifdef USE_MORPHTARGETS
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
#endif`,TE=`#ifdef USE_MORPHTARGETS
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
#endif`,AE=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,bE=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,CE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,RE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,PE=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,LE=`#ifdef USE_NORMALMAP
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
#endif`,NE=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,DE=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,UE=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,IE=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,OE=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,FE=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,kE=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,zE=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,BE=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,HE=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,VE=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,GE=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,WE=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,jE=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,XE=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,$E=`float getShadowMask() {
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
}`,YE=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,qE=`#ifdef USE_SKINNING
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
#endif`,KE=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ZE=`#ifdef USE_SKINNING
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
#endif`,JE=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,QE=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,e1=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,t1=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,n1=`#ifdef USE_TRANSMISSION
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
#endif`,i1=`#ifdef USE_TRANSMISSION
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
#endif`,r1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,s1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,o1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,a1=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const l1=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,c1=`uniform sampler2D t2D;
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
}`,u1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,d1=`#ifdef ENVMAP_TYPE_CUBE
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
}`,f1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,h1=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,p1=`#include <common>
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
}`,m1=`#if DEPTH_PACKING == 3200
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
}`,g1=`#define DISTANCE
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
}`,v1=`#define DISTANCE
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
}`,x1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,_1=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,y1=`uniform float scale;
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
}`,S1=`uniform vec3 diffuse;
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
}`,M1=`#include <common>
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
}`,E1=`uniform vec3 diffuse;
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
}`,w1=`#define LAMBERT
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
}`,T1=`#define LAMBERT
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
}`,A1=`#define MATCAP
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
}`,b1=`#define MATCAP
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
}`,C1=`#define NORMAL
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
}`,R1=`#define NORMAL
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
}`,P1=`#define PHONG
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
}`,L1=`#define PHONG
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
}`,N1=`#define STANDARD
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
}`,D1=`#define STANDARD
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
}`,U1=`#define TOON
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
}`,I1=`#define TOON
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
}`,O1=`uniform float size;
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
}`,F1=`uniform vec3 diffuse;
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
}`,k1=`#include <common>
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
}`,z1=`uniform vec3 color;
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
}`,B1=`uniform float rotation;
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
}`,H1=`uniform vec3 diffuse;
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
}`,_t={alphahash_fragment:cM,alphahash_pars_fragment:uM,alphamap_fragment:dM,alphamap_pars_fragment:fM,alphatest_fragment:hM,alphatest_pars_fragment:pM,aomap_fragment:mM,aomap_pars_fragment:gM,batching_pars_vertex:vM,batching_vertex:xM,begin_vertex:_M,beginnormal_vertex:yM,bsdfs:SM,iridescence_fragment:MM,bumpmap_pars_fragment:EM,clipping_planes_fragment:wM,clipping_planes_pars_fragment:TM,clipping_planes_pars_vertex:AM,clipping_planes_vertex:bM,color_fragment:CM,color_pars_fragment:RM,color_pars_vertex:PM,color_vertex:LM,common:NM,cube_uv_reflection_fragment:DM,defaultnormal_vertex:UM,displacementmap_pars_vertex:IM,displacementmap_vertex:OM,emissivemap_fragment:FM,emissivemap_pars_fragment:kM,colorspace_fragment:zM,colorspace_pars_fragment:BM,envmap_fragment:HM,envmap_common_pars_fragment:VM,envmap_pars_fragment:GM,envmap_pars_vertex:WM,envmap_physical_pars_fragment:nE,envmap_vertex:jM,fog_vertex:XM,fog_pars_vertex:$M,fog_fragment:YM,fog_pars_fragment:qM,gradientmap_pars_fragment:KM,lightmap_fragment:ZM,lightmap_pars_fragment:JM,lights_lambert_fragment:QM,lights_lambert_pars_fragment:eE,lights_pars_begin:tE,lights_toon_fragment:iE,lights_toon_pars_fragment:rE,lights_phong_fragment:sE,lights_phong_pars_fragment:oE,lights_physical_fragment:aE,lights_physical_pars_fragment:lE,lights_fragment_begin:cE,lights_fragment_maps:uE,lights_fragment_end:dE,logdepthbuf_fragment:fE,logdepthbuf_pars_fragment:hE,logdepthbuf_pars_vertex:pE,logdepthbuf_vertex:mE,map_fragment:gE,map_pars_fragment:vE,map_particle_fragment:xE,map_particle_pars_fragment:_E,metalnessmap_fragment:yE,metalnessmap_pars_fragment:SE,morphcolor_vertex:ME,morphnormal_vertex:EE,morphtarget_pars_vertex:wE,morphtarget_vertex:TE,normal_fragment_begin:AE,normal_fragment_maps:bE,normal_pars_fragment:CE,normal_pars_vertex:RE,normal_vertex:PE,normalmap_pars_fragment:LE,clearcoat_normal_fragment_begin:NE,clearcoat_normal_fragment_maps:DE,clearcoat_pars_fragment:UE,iridescence_pars_fragment:IE,opaque_fragment:OE,packing:FE,premultiplied_alpha_fragment:kE,project_vertex:zE,dithering_fragment:BE,dithering_pars_fragment:HE,roughnessmap_fragment:VE,roughnessmap_pars_fragment:GE,shadowmap_pars_fragment:WE,shadowmap_pars_vertex:jE,shadowmap_vertex:XE,shadowmask_pars_fragment:$E,skinbase_vertex:YE,skinning_pars_vertex:qE,skinning_vertex:KE,skinnormal_vertex:ZE,specularmap_fragment:JE,specularmap_pars_fragment:QE,tonemapping_fragment:e1,tonemapping_pars_fragment:t1,transmission_fragment:n1,transmission_pars_fragment:i1,uv_pars_fragment:r1,uv_pars_vertex:s1,uv_vertex:o1,worldpos_vertex:a1,background_vert:l1,background_frag:c1,backgroundCube_vert:u1,backgroundCube_frag:d1,cube_vert:f1,cube_frag:h1,depth_vert:p1,depth_frag:m1,distanceRGBA_vert:g1,distanceRGBA_frag:v1,equirect_vert:x1,equirect_frag:_1,linedashed_vert:y1,linedashed_frag:S1,meshbasic_vert:M1,meshbasic_frag:E1,meshlambert_vert:w1,meshlambert_frag:T1,meshmatcap_vert:A1,meshmatcap_frag:b1,meshnormal_vert:C1,meshnormal_frag:R1,meshphong_vert:P1,meshphong_frag:L1,meshphysical_vert:N1,meshphysical_frag:D1,meshtoon_vert:U1,meshtoon_frag:I1,points_vert:O1,points_frag:F1,shadow_vert:k1,shadow_frag:z1,sprite_vert:B1,sprite_frag:H1},Oe={common:{diffuse:{value:new Et(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Mt},alphaMap:{value:null},alphaMapTransform:{value:new Mt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Mt}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Mt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Mt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Mt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Mt},normalScale:{value:new Be(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Mt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Mt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Mt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Mt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Et(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Et(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Mt},alphaTest:{value:0},uvTransform:{value:new Mt}},sprite:{diffuse:{value:new Et(16777215)},opacity:{value:1},center:{value:new Be(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Mt},alphaMap:{value:null},alphaMapTransform:{value:new Mt},alphaTest:{value:0}}},Mi={basic:{uniforms:bn([Oe.common,Oe.specularmap,Oe.envmap,Oe.aomap,Oe.lightmap,Oe.fog]),vertexShader:_t.meshbasic_vert,fragmentShader:_t.meshbasic_frag},lambert:{uniforms:bn([Oe.common,Oe.specularmap,Oe.envmap,Oe.aomap,Oe.lightmap,Oe.emissivemap,Oe.bumpmap,Oe.normalmap,Oe.displacementmap,Oe.fog,Oe.lights,{emissive:{value:new Et(0)}}]),vertexShader:_t.meshlambert_vert,fragmentShader:_t.meshlambert_frag},phong:{uniforms:bn([Oe.common,Oe.specularmap,Oe.envmap,Oe.aomap,Oe.lightmap,Oe.emissivemap,Oe.bumpmap,Oe.normalmap,Oe.displacementmap,Oe.fog,Oe.lights,{emissive:{value:new Et(0)},specular:{value:new Et(1118481)},shininess:{value:30}}]),vertexShader:_t.meshphong_vert,fragmentShader:_t.meshphong_frag},standard:{uniforms:bn([Oe.common,Oe.envmap,Oe.aomap,Oe.lightmap,Oe.emissivemap,Oe.bumpmap,Oe.normalmap,Oe.displacementmap,Oe.roughnessmap,Oe.metalnessmap,Oe.fog,Oe.lights,{emissive:{value:new Et(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:_t.meshphysical_vert,fragmentShader:_t.meshphysical_frag},toon:{uniforms:bn([Oe.common,Oe.aomap,Oe.lightmap,Oe.emissivemap,Oe.bumpmap,Oe.normalmap,Oe.displacementmap,Oe.gradientmap,Oe.fog,Oe.lights,{emissive:{value:new Et(0)}}]),vertexShader:_t.meshtoon_vert,fragmentShader:_t.meshtoon_frag},matcap:{uniforms:bn([Oe.common,Oe.bumpmap,Oe.normalmap,Oe.displacementmap,Oe.fog,{matcap:{value:null}}]),vertexShader:_t.meshmatcap_vert,fragmentShader:_t.meshmatcap_frag},points:{uniforms:bn([Oe.points,Oe.fog]),vertexShader:_t.points_vert,fragmentShader:_t.points_frag},dashed:{uniforms:bn([Oe.common,Oe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:_t.linedashed_vert,fragmentShader:_t.linedashed_frag},depth:{uniforms:bn([Oe.common,Oe.displacementmap]),vertexShader:_t.depth_vert,fragmentShader:_t.depth_frag},normal:{uniforms:bn([Oe.common,Oe.bumpmap,Oe.normalmap,Oe.displacementmap,{opacity:{value:1}}]),vertexShader:_t.meshnormal_vert,fragmentShader:_t.meshnormal_frag},sprite:{uniforms:bn([Oe.sprite,Oe.fog]),vertexShader:_t.sprite_vert,fragmentShader:_t.sprite_frag},background:{uniforms:{uvTransform:{value:new Mt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:_t.background_vert,fragmentShader:_t.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:_t.backgroundCube_vert,fragmentShader:_t.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:_t.cube_vert,fragmentShader:_t.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:_t.equirect_vert,fragmentShader:_t.equirect_frag},distanceRGBA:{uniforms:bn([Oe.common,Oe.displacementmap,{referencePosition:{value:new z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:_t.distanceRGBA_vert,fragmentShader:_t.distanceRGBA_frag},shadow:{uniforms:bn([Oe.lights,Oe.fog,{color:{value:new Et(0)},opacity:{value:1}}]),vertexShader:_t.shadow_vert,fragmentShader:_t.shadow_frag}};Mi.physical={uniforms:bn([Mi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Mt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Mt},clearcoatNormalScale:{value:new Be(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Mt},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Mt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Mt},sheen:{value:0},sheenColor:{value:new Et(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Mt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Mt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Mt},transmissionSamplerSize:{value:new Be},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Mt},attenuationDistance:{value:0},attenuationColor:{value:new Et(0)},specularColor:{value:new Et(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Mt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Mt},anisotropyVector:{value:new Be},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Mt}}]),vertexShader:_t.meshphysical_vert,fragmentShader:_t.meshphysical_frag};const Hl={r:0,b:0,g:0};function V1(s,e,t,r,o,l,d){const c=new Et(0);let f=l===!0?0:1,h,p,g=null,y=0,x=null;function M(S,v){let w=!1,A=v.isScene===!0?v.background:null;A&&A.isTexture&&(A=(v.backgroundBlurriness>0?t:e).get(A)),A===null?E(c,f):A&&A.isColor&&(E(A,1),w=!0);const P=s.xr.getEnvironmentBlendMode();P==="additive"?r.buffers.color.setClear(0,0,0,1,d):P==="alpha-blend"&&r.buffers.color.setClear(0,0,0,0,d),(s.autoClear||w)&&s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil),A&&(A.isCubeTexture||A.mapping===gc)?(p===void 0&&(p=new Rt(new Ti(1,1,1),new os({name:"BackgroundCubeMaterial",uniforms:co(Mi.backgroundCube.uniforms),vertexShader:Mi.backgroundCube.vertexShader,fragmentShader:Mi.backgroundCube.fragmentShader,side:Rn,depthTest:!1,depthWrite:!1,fog:!1})),p.geometry.deleteAttribute("normal"),p.geometry.deleteAttribute("uv"),p.onBeforeRender=function(B,U,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(p.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),o.update(p)),p.material.uniforms.envMap.value=A,p.material.uniforms.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,p.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,p.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,p.material.toneMapped=Lt.getTransfer(A.colorSpace)!==Ot,(g!==A||y!==A.version||x!==s.toneMapping)&&(p.material.needsUpdate=!0,g=A,y=A.version,x=s.toneMapping),p.layers.enableAll(),S.unshift(p,p.geometry,p.material,0,0,null)):A&&A.isTexture&&(h===void 0&&(h=new Rt(new yc(2,2),new os({name:"BackgroundMaterial",uniforms:co(Mi.background.uniforms),vertexShader:Mi.background.vertexShader,fragmentShader:Mi.background.fragmentShader,side:Pr,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),Object.defineProperty(h.material,"map",{get:function(){return this.uniforms.t2D.value}}),o.update(h)),h.material.uniforms.t2D.value=A,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.toneMapped=Lt.getTransfer(A.colorSpace)!==Ot,A.matrixAutoUpdate===!0&&A.updateMatrix(),h.material.uniforms.uvTransform.value.copy(A.matrix),(g!==A||y!==A.version||x!==s.toneMapping)&&(h.material.needsUpdate=!0,g=A,y=A.version,x=s.toneMapping),h.layers.enableAll(),S.unshift(h,h.geometry,h.material,0,0,null))}function E(S,v){S.getRGB(Hl,Wv(s)),r.buffers.color.setClear(Hl.r,Hl.g,Hl.b,v,d)}return{getClearColor:function(){return c},setClearColor:function(S,v=1){c.set(S),f=v,E(c,f)},getClearAlpha:function(){return f},setClearAlpha:function(S){f=S,E(c,f)},render:M}}function G1(s,e,t,r){const o=s.getParameter(s.MAX_VERTEX_ATTRIBS),l=r.isWebGL2?null:e.get("OES_vertex_array_object"),d=r.isWebGL2||l!==null,c={},f=S(null);let h=f,p=!1;function g(F,$,J,K,X){let Z=!1;if(d){const Y=E(K,J,$);h!==Y&&(h=Y,x(h.object)),Z=v(F,K,J,X),Z&&w(F,K,J,X)}else{const Y=$.wireframe===!0;(h.geometry!==K.id||h.program!==J.id||h.wireframe!==Y)&&(h.geometry=K.id,h.program=J.id,h.wireframe=Y,Z=!0)}X!==null&&t.update(X,s.ELEMENT_ARRAY_BUFFER),(Z||p)&&(p=!1,ne(F,$,J,K),X!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(X).buffer))}function y(){return r.isWebGL2?s.createVertexArray():l.createVertexArrayOES()}function x(F){return r.isWebGL2?s.bindVertexArray(F):l.bindVertexArrayOES(F)}function M(F){return r.isWebGL2?s.deleteVertexArray(F):l.deleteVertexArrayOES(F)}function E(F,$,J){const K=J.wireframe===!0;let X=c[F.id];X===void 0&&(X={},c[F.id]=X);let Z=X[$.id];Z===void 0&&(Z={},X[$.id]=Z);let Y=Z[K];return Y===void 0&&(Y=S(y()),Z[K]=Y),Y}function S(F){const $=[],J=[],K=[];for(let X=0;X<o;X++)$[X]=0,J[X]=0,K[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:$,enabledAttributes:J,attributeDivisors:K,object:F,attributes:{},index:null}}function v(F,$,J,K){const X=h.attributes,Z=$.attributes;let Y=0;const O=J.getAttributes();for(const W in O)if(O[W].location>=0){const fe=X[W];let ve=Z[W];if(ve===void 0&&(W==="instanceMatrix"&&F.instanceMatrix&&(ve=F.instanceMatrix),W==="instanceColor"&&F.instanceColor&&(ve=F.instanceColor)),fe===void 0||fe.attribute!==ve||ve&&fe.data!==ve.data)return!0;Y++}return h.attributesNum!==Y||h.index!==K}function w(F,$,J,K){const X={},Z=$.attributes;let Y=0;const O=J.getAttributes();for(const W in O)if(O[W].location>=0){let fe=Z[W];fe===void 0&&(W==="instanceMatrix"&&F.instanceMatrix&&(fe=F.instanceMatrix),W==="instanceColor"&&F.instanceColor&&(fe=F.instanceColor));const ve={};ve.attribute=fe,fe&&fe.data&&(ve.data=fe.data),X[W]=ve,Y++}h.attributes=X,h.attributesNum=Y,h.index=K}function A(){const F=h.newAttributes;for(let $=0,J=F.length;$<J;$++)F[$]=0}function P(F){B(F,0)}function B(F,$){const J=h.newAttributes,K=h.enabledAttributes,X=h.attributeDivisors;J[F]=1,K[F]===0&&(s.enableVertexAttribArray(F),K[F]=1),X[F]!==$&&((r.isWebGL2?s:e.get("ANGLE_instanced_arrays"))[r.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](F,$),X[F]=$)}function U(){const F=h.newAttributes,$=h.enabledAttributes;for(let J=0,K=$.length;J<K;J++)$[J]!==F[J]&&(s.disableVertexAttribArray(J),$[J]=0)}function I(F,$,J,K,X,Z,Y){Y===!0?s.vertexAttribIPointer(F,$,J,X,Z):s.vertexAttribPointer(F,$,J,K,X,Z)}function ne(F,$,J,K){if(r.isWebGL2===!1&&(F.isInstancedMesh||K.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;A();const X=K.attributes,Z=J.getAttributes(),Y=$.defaultAttributeValues;for(const O in Z){const W=Z[O];if(W.location>=0){let q=X[O];if(q===void 0&&(O==="instanceMatrix"&&F.instanceMatrix&&(q=F.instanceMatrix),O==="instanceColor"&&F.instanceColor&&(q=F.instanceColor)),q!==void 0){const fe=q.normalized,ve=q.itemSize,Te=t.get(q);if(Te===void 0)continue;const Ae=Te.buffer,Fe=Te.type,ge=Te.bytesPerElement,be=r.isWebGL2===!0&&(Fe===s.INT||Fe===s.UNSIGNED_INT||q.gpuType===Av);if(q.isInterleavedBufferAttribute){const ze=q.data,ee=ze.stride,nt=q.offset;if(ze.isInstancedInterleavedBuffer){for(let ke=0;ke<W.locationSize;ke++)B(W.location+ke,ze.meshPerAttribute);F.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=ze.meshPerAttribute*ze.count)}else for(let ke=0;ke<W.locationSize;ke++)P(W.location+ke);s.bindBuffer(s.ARRAY_BUFFER,Ae);for(let ke=0;ke<W.locationSize;ke++)I(W.location+ke,ve/W.locationSize,Fe,fe,ee*ge,(nt+ve/W.locationSize*ke)*ge,be)}else{if(q.isInstancedBufferAttribute){for(let ze=0;ze<W.locationSize;ze++)B(W.location+ze,q.meshPerAttribute);F.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=q.meshPerAttribute*q.count)}else for(let ze=0;ze<W.locationSize;ze++)P(W.location+ze);s.bindBuffer(s.ARRAY_BUFFER,Ae);for(let ze=0;ze<W.locationSize;ze++)I(W.location+ze,ve/W.locationSize,Fe,fe,ve*ge,ve/W.locationSize*ze*ge,be)}}else if(Y!==void 0){const fe=Y[O];if(fe!==void 0)switch(fe.length){case 2:s.vertexAttrib2fv(W.location,fe);break;case 3:s.vertexAttrib3fv(W.location,fe);break;case 4:s.vertexAttrib4fv(W.location,fe);break;default:s.vertexAttrib1fv(W.location,fe)}}}}U()}function R(){ae();for(const F in c){const $=c[F];for(const J in $){const K=$[J];for(const X in K)M(K[X].object),delete K[X];delete $[J]}delete c[F]}}function D(F){if(c[F.id]===void 0)return;const $=c[F.id];for(const J in $){const K=$[J];for(const X in K)M(K[X].object),delete K[X];delete $[J]}delete c[F.id]}function re(F){for(const $ in c){const J=c[$];if(J[F.id]===void 0)continue;const K=J[F.id];for(const X in K)M(K[X].object),delete K[X];delete J[F.id]}}function ae(){me(),p=!0,h!==f&&(h=f,x(h.object))}function me(){f.geometry=null,f.program=null,f.wireframe=!1}return{setup:g,reset:ae,resetDefaultState:me,dispose:R,releaseStatesOfGeometry:D,releaseStatesOfProgram:re,initAttributes:A,enableAttribute:P,disableUnusedAttributes:U}}function W1(s,e,t,r){const o=r.isWebGL2;let l;function d(p){l=p}function c(p,g){s.drawArrays(l,p,g),t.update(g,l,1)}function f(p,g,y){if(y===0)return;let x,M;if(o)x=s,M="drawArraysInstanced";else if(x=e.get("ANGLE_instanced_arrays"),M="drawArraysInstancedANGLE",x===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}x[M](l,p,g,y),t.update(g,l,y)}function h(p,g,y){if(y===0)return;const x=e.get("WEBGL_multi_draw");if(x===null)for(let M=0;M<y;M++)this.render(p[M],g[M]);else{x.multiDrawArraysWEBGL(l,p,0,g,0,y);let M=0;for(let E=0;E<y;E++)M+=g[E];t.update(M,l,1)}}this.setMode=d,this.render=c,this.renderInstances=f,this.renderMultiDraw=h}function j1(s,e,t){let r;function o(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const I=e.get("EXT_texture_filter_anisotropic");r=s.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function l(I){if(I==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const d=typeof WebGL2RenderingContext<"u"&&s.constructor.name==="WebGL2RenderingContext";let c=t.precision!==void 0?t.precision:"highp";const f=l(c);f!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",f,"instead."),c=f);const h=d||e.has("WEBGL_draw_buffers"),p=t.logarithmicDepthBuffer===!0,g=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),y=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=s.getParameter(s.MAX_TEXTURE_SIZE),M=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),E=s.getParameter(s.MAX_VERTEX_ATTRIBS),S=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),v=s.getParameter(s.MAX_VARYING_VECTORS),w=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),A=y>0,P=d||e.has("OES_texture_float"),B=A&&P,U=d?s.getParameter(s.MAX_SAMPLES):0;return{isWebGL2:d,drawBuffers:h,getMaxAnisotropy:o,getMaxPrecision:l,precision:c,logarithmicDepthBuffer:p,maxTextures:g,maxVertexTextures:y,maxTextureSize:x,maxCubemapSize:M,maxAttributes:E,maxVertexUniforms:S,maxVaryings:v,maxFragmentUniforms:w,vertexTextures:A,floatFragmentTextures:P,floatVertexTextures:B,maxSamples:U}}function X1(s){const e=this;let t=null,r=0,o=!1,l=!1;const d=new yr,c=new Mt,f={value:null,needsUpdate:!1};this.uniform=f,this.numPlanes=0,this.numIntersection=0,this.init=function(g,y){const x=g.length!==0||y||r!==0||o;return o=y,r=g.length,x},this.beginShadows=function(){l=!0,p(null)},this.endShadows=function(){l=!1},this.setGlobalState=function(g,y){t=p(g,y,0)},this.setState=function(g,y,x){const M=g.clippingPlanes,E=g.clipIntersection,S=g.clipShadows,v=s.get(g);if(!o||M===null||M.length===0||l&&!S)l?p(null):h();else{const w=l?0:r,A=w*4;let P=v.clippingState||null;f.value=P,P=p(M,y,A,x);for(let B=0;B!==A;++B)P[B]=t[B];v.clippingState=P,this.numIntersection=E?this.numPlanes:0,this.numPlanes+=w}};function h(){f.value!==t&&(f.value=t,f.needsUpdate=r>0),e.numPlanes=r,e.numIntersection=0}function p(g,y,x,M){const E=g!==null?g.length:0;let S=null;if(E!==0){if(S=f.value,M!==!0||S===null){const v=x+E*4,w=y.matrixWorldInverse;c.getNormalMatrix(w),(S===null||S.length<v)&&(S=new Float32Array(v));for(let A=0,P=x;A!==E;++A,P+=4)d.copy(g[A]).applyMatrix4(w,c),d.normal.toArray(S,P),S[P+3]=d.constant}f.value=S,f.needsUpdate=!0}return e.numPlanes=E,e.numIntersection=0,S}}function $1(s){let e=new WeakMap;function t(d,c){return c===Kd?d.mapping=oo:c===Zd&&(d.mapping=ao),d}function r(d){if(d&&d.isTexture){const c=d.mapping;if(c===Kd||c===Zd)if(e.has(d)){const f=e.get(d).texture;return t(f,d.mapping)}else{const f=d.image;if(f&&f.height>0){const h=new sM(f.height/2);return h.fromEquirectangularTexture(s,d),e.set(d,h),d.addEventListener("dispose",o),t(h.texture,d.mapping)}else return null}}return d}function o(d){const c=d.target;c.removeEventListener("dispose",o);const f=e.get(c);f!==void 0&&(e.delete(c),f.dispose())}function l(){e=new WeakMap}return{get:r,dispose:l}}class Yv extends jv{constructor(e=-1,t=1,r=1,o=-1,l=.1,d=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=r,this.bottom=o,this.near=l,this.far=d,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,r,o,l,d){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=r,this.view.offsetY=o,this.view.width=l,this.view.height=d,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),r=(this.right+this.left)/2,o=(this.top+this.bottom)/2;let l=r-e,d=r+e,c=o+t,f=o-t;if(this.view!==null&&this.view.enabled){const h=(this.right-this.left)/this.view.fullWidth/this.zoom,p=(this.top-this.bottom)/this.view.fullHeight/this.zoom;l+=h*this.view.offsetX,d=l+h*this.view.width,c-=p*this.view.offsetY,f=c-p*this.view.height}this.projectionMatrix.makeOrthographic(l,d,c,f,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Qs=4,fg=[.125,.215,.35,.446,.526,.582],Qr=20,Rd=new Yv,hg=new Et;let Pd=null,Ld=0,Nd=0;const Zr=(1+Math.sqrt(5))/2,Ys=1/Zr,pg=[new z(1,1,1),new z(-1,1,1),new z(1,1,-1),new z(-1,1,-1),new z(0,Zr,Ys),new z(0,Zr,-Ys),new z(Ys,0,Zr),new z(-Ys,0,Zr),new z(Zr,Ys,0),new z(-Zr,Ys,0)];class tf{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,r=.1,o=100){Pd=this._renderer.getRenderTarget(),Ld=this._renderer.getActiveCubeFace(),Nd=this._renderer.getActiveMipmapLevel(),this._setSize(256);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,r,o,l),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=vg(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=gg(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Pd,Ld,Nd),e.scissorTest=!1,Vl(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===oo||e.mapping===ao?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Pd=this._renderer.getRenderTarget(),Ld=this._renderer.getActiveCubeFace(),Nd=this._renderer.getActiveMipmapLevel();const r=t||this._allocateTargets();return this._textureToCubeUV(e,r),this._applyPMREM(r),this._cleanup(r),r}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,r={magFilter:ni,minFilter:ni,generateMipmaps:!1,type:aa,format:mi,colorSpace:ji,depthBuffer:!1},o=mg(e,t,r);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=mg(e,t,r);const{_lodMax:l}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Y1(l)),this._blurMaterial=q1(l,e,t)}return o}_compileMaterial(e){const t=new Rt(this._lodPlanes[0],e);this._renderer.compile(t,Rd)}_sceneToCubeUV(e,t,r,o){const c=new Xn(90,1,t,r),f=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],p=this._renderer,g=p.autoClear,y=p.toneMapping;p.getClearColor(hg),p.toneMapping=br,p.autoClear=!1;const x=new ro({name:"PMREM.Background",side:Rn,depthWrite:!1,depthTest:!1}),M=new Rt(new Ti,x);let E=!1;const S=e.background;S?S.isColor&&(x.color.copy(S),e.background=null,E=!0):(x.color.copy(hg),E=!0);for(let v=0;v<6;v++){const w=v%3;w===0?(c.up.set(0,f[v],0),c.lookAt(h[v],0,0)):w===1?(c.up.set(0,0,f[v]),c.lookAt(0,h[v],0)):(c.up.set(0,f[v],0),c.lookAt(0,0,h[v]));const A=this._cubeSize;Vl(o,w*A,v>2?A:0,A,A),p.setRenderTarget(o),E&&p.render(M,c),p.render(e,c)}M.geometry.dispose(),M.material.dispose(),p.toneMapping=y,p.autoClear=g,e.background=S}_textureToCubeUV(e,t){const r=this._renderer,o=e.mapping===oo||e.mapping===ao;o?(this._cubemapMaterial===null&&(this._cubemapMaterial=vg()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=gg());const l=o?this._cubemapMaterial:this._equirectMaterial,d=new Rt(this._lodPlanes[0],l),c=l.uniforms;c.envMap.value=e;const f=this._cubeSize;Vl(t,0,0,3*f,2*f),r.setRenderTarget(t),r.render(d,Rd)}_applyPMREM(e){const t=this._renderer,r=t.autoClear;t.autoClear=!1;for(let o=1;o<this._lodPlanes.length;o++){const l=Math.sqrt(this._sigmas[o]*this._sigmas[o]-this._sigmas[o-1]*this._sigmas[o-1]),d=pg[(o-1)%pg.length];this._blur(e,o-1,o,l,d)}t.autoClear=r}_blur(e,t,r,o,l){const d=this._pingPongRenderTarget;this._halfBlur(e,d,t,r,o,"latitudinal",l),this._halfBlur(d,e,r,r,o,"longitudinal",l)}_halfBlur(e,t,r,o,l,d,c){const f=this._renderer,h=this._blurMaterial;d!=="latitudinal"&&d!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const p=3,g=new Rt(this._lodPlanes[o],h),y=h.uniforms,x=this._sizeLods[r]-1,M=isFinite(l)?Math.PI/(2*x):2*Math.PI/(2*Qr-1),E=l/M,S=isFinite(l)?1+Math.floor(p*E):Qr;S>Qr&&console.warn(`sigmaRadians, ${l}, is too large and will clip, as it requested ${S} samples when the maximum is set to ${Qr}`);const v=[];let w=0;for(let I=0;I<Qr;++I){const ne=I/E,R=Math.exp(-ne*ne/2);v.push(R),I===0?w+=R:I<S&&(w+=2*R)}for(let I=0;I<v.length;I++)v[I]=v[I]/w;y.envMap.value=e.texture,y.samples.value=S,y.weights.value=v,y.latitudinal.value=d==="latitudinal",c&&(y.poleAxis.value=c);const{_lodMax:A}=this;y.dTheta.value=M,y.mipInt.value=A-r;const P=this._sizeLods[o],B=3*P*(o>A-Qs?o-A+Qs:0),U=4*(this._cubeSize-P);Vl(t,B,U,3*P,2*P),f.setRenderTarget(t),f.render(g,Rd)}}function Y1(s){const e=[],t=[],r=[];let o=s;const l=s-Qs+1+fg.length;for(let d=0;d<l;d++){const c=Math.pow(2,o);t.push(c);let f=1/c;d>s-Qs?f=fg[d-s+Qs-1]:d===0&&(f=0),r.push(f);const h=1/(c-2),p=-h,g=1+h,y=[p,p,g,p,g,g,p,p,g,g,p,g],x=6,M=6,E=3,S=2,v=1,w=new Float32Array(E*M*x),A=new Float32Array(S*M*x),P=new Float32Array(v*M*x);for(let U=0;U<x;U++){const I=U%3*2/3-1,ne=U>2?0:-1,R=[I,ne,0,I+2/3,ne,0,I+2/3,ne+1,0,I,ne,0,I+2/3,ne+1,0,I,ne+1,0];w.set(R,E*M*U),A.set(y,S*M*U);const D=[U,U,U,U,U,U];P.set(D,v*M*U)}const B=new Sn;B.setAttribute("position",new $n(w,E)),B.setAttribute("uv",new $n(A,S)),B.setAttribute("faceIndex",new $n(P,v)),e.push(B),o>Qs&&o--}return{lodPlanes:e,sizeLods:t,sigmas:r}}function mg(s,e,t){const r=new ss(s,e,t);return r.texture.mapping=gc,r.texture.name="PMREM.cubeUv",r.scissorTest=!0,r}function Vl(s,e,t,r,o){s.viewport.set(e,t,r,o),s.scissor.set(e,t,r,o)}function q1(s,e,t){const r=new Float32Array(Qr),o=new z(0,1,0);return new os({name:"SphericalGaussianBlur",defines:{n:Qr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:o}},vertexShader:xf(),fragmentShader:`

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
		`,blending:Ar,depthTest:!1,depthWrite:!1})}function gg(){return new os({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:xf(),fragmentShader:`

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
		`,blending:Ar,depthTest:!1,depthWrite:!1})}function vg(){return new os({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:xf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ar,depthTest:!1,depthWrite:!1})}function xf(){return`

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
	`}function K1(s){let e=new WeakMap,t=null;function r(c){if(c&&c.isTexture){const f=c.mapping,h=f===Kd||f===Zd,p=f===oo||f===ao;if(h||p)if(c.isRenderTargetTexture&&c.needsPMREMUpdate===!0){c.needsPMREMUpdate=!1;let g=e.get(c);return t===null&&(t=new tf(s)),g=h?t.fromEquirectangular(c,g):t.fromCubemap(c,g),e.set(c,g),g.texture}else{if(e.has(c))return e.get(c).texture;{const g=c.image;if(h&&g&&g.height>0||p&&g&&o(g)){t===null&&(t=new tf(s));const y=h?t.fromEquirectangular(c):t.fromCubemap(c);return e.set(c,y),c.addEventListener("dispose",l),y.texture}else return null}}}return c}function o(c){let f=0;const h=6;for(let p=0;p<h;p++)c[p]!==void 0&&f++;return f===h}function l(c){const f=c.target;f.removeEventListener("dispose",l);const h=e.get(f);h!==void 0&&(e.delete(f),h.dispose())}function d(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:r,dispose:d}}function Z1(s){const e={};function t(r){if(e[r]!==void 0)return e[r];let o;switch(r){case"WEBGL_depth_texture":o=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":o=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":o=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":o=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:o=s.getExtension(r)}return e[r]=o,o}return{has:function(r){return t(r)!==null},init:function(r){r.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(r){const o=t(r);return o===null&&console.warn("THREE.WebGLRenderer: "+r+" extension not supported."),o}}}function J1(s,e,t,r){const o={},l=new WeakMap;function d(g){const y=g.target;y.index!==null&&e.remove(y.index);for(const M in y.attributes)e.remove(y.attributes[M]);for(const M in y.morphAttributes){const E=y.morphAttributes[M];for(let S=0,v=E.length;S<v;S++)e.remove(E[S])}y.removeEventListener("dispose",d),delete o[y.id];const x=l.get(y);x&&(e.remove(x),l.delete(y)),r.releaseStatesOfGeometry(y),y.isInstancedBufferGeometry===!0&&delete y._maxInstanceCount,t.memory.geometries--}function c(g,y){return o[y.id]===!0||(y.addEventListener("dispose",d),o[y.id]=!0,t.memory.geometries++),y}function f(g){const y=g.attributes;for(const M in y)e.update(y[M],s.ARRAY_BUFFER);const x=g.morphAttributes;for(const M in x){const E=x[M];for(let S=0,v=E.length;S<v;S++)e.update(E[S],s.ARRAY_BUFFER)}}function h(g){const y=[],x=g.index,M=g.attributes.position;let E=0;if(x!==null){const w=x.array;E=x.version;for(let A=0,P=w.length;A<P;A+=3){const B=w[A+0],U=w[A+1],I=w[A+2];y.push(B,U,U,I,I,B)}}else if(M!==void 0){const w=M.array;E=M.version;for(let A=0,P=w.length/3-1;A<P;A+=3){const B=A+0,U=A+1,I=A+2;y.push(B,U,U,I,I,B)}}else return;const S=new(Ov(y)?Gv:Vv)(y,1);S.version=E;const v=l.get(g);v&&e.remove(v),l.set(g,S)}function p(g){const y=l.get(g);if(y){const x=g.index;x!==null&&y.version<x.version&&h(g)}else h(g);return l.get(g)}return{get:c,update:f,getWireframeAttribute:p}}function Q1(s,e,t,r){const o=r.isWebGL2;let l;function d(x){l=x}let c,f;function h(x){c=x.type,f=x.bytesPerElement}function p(x,M){s.drawElements(l,M,c,x*f),t.update(M,l,1)}function g(x,M,E){if(E===0)return;let S,v;if(o)S=s,v="drawElementsInstanced";else if(S=e.get("ANGLE_instanced_arrays"),v="drawElementsInstancedANGLE",S===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}S[v](l,M,c,x*f,E),t.update(M,l,E)}function y(x,M,E){if(E===0)return;const S=e.get("WEBGL_multi_draw");if(S===null)for(let v=0;v<E;v++)this.render(x[v]/f,M[v]);else{S.multiDrawElementsWEBGL(l,M,0,c,x,0,E);let v=0;for(let w=0;w<E;w++)v+=M[w];t.update(v,l,1)}}this.setMode=d,this.setIndex=h,this.render=p,this.renderInstances=g,this.renderMultiDraw=y}function ew(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function r(l,d,c){switch(t.calls++,d){case s.TRIANGLES:t.triangles+=c*(l/3);break;case s.LINES:t.lines+=c*(l/2);break;case s.LINE_STRIP:t.lines+=c*(l-1);break;case s.LINE_LOOP:t.lines+=c*l;break;case s.POINTS:t.points+=c*l;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",d);break}}function o(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:o,update:r}}function tw(s,e){return s[0]-e[0]}function nw(s,e){return Math.abs(e[1])-Math.abs(s[1])}function iw(s,e,t){const r={},o=new Float32Array(8),l=new WeakMap,d=new Bt,c=[];for(let h=0;h<8;h++)c[h]=[h,0];function f(h,p,g){const y=h.morphTargetInfluences;if(e.isWebGL2===!0){const M=p.morphAttributes.position||p.morphAttributes.normal||p.morphAttributes.color,E=M!==void 0?M.length:0;let S=l.get(p);if(S===void 0||S.count!==E){let $=function(){me.dispose(),l.delete(p),p.removeEventListener("dispose",$)};var x=$;S!==void 0&&S.texture.dispose();const A=p.morphAttributes.position!==void 0,P=p.morphAttributes.normal!==void 0,B=p.morphAttributes.color!==void 0,U=p.morphAttributes.position||[],I=p.morphAttributes.normal||[],ne=p.morphAttributes.color||[];let R=0;A===!0&&(R=1),P===!0&&(R=2),B===!0&&(R=3);let D=p.attributes.position.count*R,re=1;D>e.maxTextureSize&&(re=Math.ceil(D/e.maxTextureSize),D=e.maxTextureSize);const ae=new Float32Array(D*re*4*E),me=new zv(ae,D,re,E);me.type=Er,me.needsUpdate=!0;const F=R*4;for(let J=0;J<E;J++){const K=U[J],X=I[J],Z=ne[J],Y=D*re*4*J;for(let O=0;O<K.count;O++){const W=O*F;A===!0&&(d.fromBufferAttribute(K,O),ae[Y+W+0]=d.x,ae[Y+W+1]=d.y,ae[Y+W+2]=d.z,ae[Y+W+3]=0),P===!0&&(d.fromBufferAttribute(X,O),ae[Y+W+4]=d.x,ae[Y+W+5]=d.y,ae[Y+W+6]=d.z,ae[Y+W+7]=0),B===!0&&(d.fromBufferAttribute(Z,O),ae[Y+W+8]=d.x,ae[Y+W+9]=d.y,ae[Y+W+10]=d.z,ae[Y+W+11]=Z.itemSize===4?d.w:1)}}S={count:E,texture:me,size:new Be(D,re)},l.set(p,S),p.addEventListener("dispose",$)}let v=0;for(let A=0;A<y.length;A++)v+=y[A];const w=p.morphTargetsRelative?1:1-v;g.getUniforms().setValue(s,"morphTargetBaseInfluence",w),g.getUniforms().setValue(s,"morphTargetInfluences",y),g.getUniforms().setValue(s,"morphTargetsTexture",S.texture,t),g.getUniforms().setValue(s,"morphTargetsTextureSize",S.size)}else{const M=y===void 0?0:y.length;let E=r[p.id];if(E===void 0||E.length!==M){E=[];for(let P=0;P<M;P++)E[P]=[P,0];r[p.id]=E}for(let P=0;P<M;P++){const B=E[P];B[0]=P,B[1]=y[P]}E.sort(nw);for(let P=0;P<8;P++)P<M&&E[P][1]?(c[P][0]=E[P][0],c[P][1]=E[P][1]):(c[P][0]=Number.MAX_SAFE_INTEGER,c[P][1]=0);c.sort(tw);const S=p.morphAttributes.position,v=p.morphAttributes.normal;let w=0;for(let P=0;P<8;P++){const B=c[P],U=B[0],I=B[1];U!==Number.MAX_SAFE_INTEGER&&I?(S&&p.getAttribute("morphTarget"+P)!==S[U]&&p.setAttribute("morphTarget"+P,S[U]),v&&p.getAttribute("morphNormal"+P)!==v[U]&&p.setAttribute("morphNormal"+P,v[U]),o[P]=I,w+=I):(S&&p.hasAttribute("morphTarget"+P)===!0&&p.deleteAttribute("morphTarget"+P),v&&p.hasAttribute("morphNormal"+P)===!0&&p.deleteAttribute("morphNormal"+P),o[P]=0)}const A=p.morphTargetsRelative?1:1-w;g.getUniforms().setValue(s,"morphTargetBaseInfluence",A),g.getUniforms().setValue(s,"morphTargetInfluences",o)}}return{update:f}}function rw(s,e,t,r){let o=new WeakMap;function l(f){const h=r.render.frame,p=f.geometry,g=e.get(f,p);if(o.get(g)!==h&&(e.update(g),o.set(g,h)),f.isInstancedMesh&&(f.hasEventListener("dispose",c)===!1&&f.addEventListener("dispose",c),o.get(f)!==h&&(t.update(f.instanceMatrix,s.ARRAY_BUFFER),f.instanceColor!==null&&t.update(f.instanceColor,s.ARRAY_BUFFER),o.set(f,h))),f.isSkinnedMesh){const y=f.skeleton;o.get(y)!==h&&(y.update(),o.set(y,h))}return g}function d(){o=new WeakMap}function c(f){const h=f.target;h.removeEventListener("dispose",c),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:l,dispose:d}}class qv extends zn{constructor(e,t,r,o,l,d,c,f,h,p){if(p=p!==void 0?p:ns,p!==ns&&p!==lo)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");r===void 0&&p===ns&&(r=Mr),r===void 0&&p===lo&&(r=ts),super(null,o,l,d,c,f,p,r,h),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=c!==void 0?c:Cn,this.minFilter=f!==void 0?f:Cn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Kv=new zn,Zv=new qv(1,1);Zv.compareFunction=Iv;const Jv=new zv,Qv=new VS,e0=new Xv,xg=[],_g=[],yg=new Float32Array(16),Sg=new Float32Array(9),Mg=new Float32Array(4);function po(s,e,t){const r=s[0];if(r<=0||r>0)return s;const o=e*t;let l=xg[o];if(l===void 0&&(l=new Float32Array(o),xg[o]=l),e!==0){r.toArray(l,0);for(let d=1,c=0;d!==e;++d)c+=t,s[d].toArray(l,c)}return l}function sn(s,e){if(s.length!==e.length)return!1;for(let t=0,r=s.length;t<r;t++)if(s[t]!==e[t])return!1;return!0}function on(s,e){for(let t=0,r=e.length;t<r;t++)s[t]=e[t]}function Sc(s,e){let t=_g[e];t===void 0&&(t=new Int32Array(e),_g[e]=t);for(let r=0;r!==e;++r)t[r]=s.allocateTextureUnit();return t}function sw(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function ow(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(sn(t,e))return;s.uniform2fv(this.addr,e),on(t,e)}}function aw(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(sn(t,e))return;s.uniform3fv(this.addr,e),on(t,e)}}function lw(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(sn(t,e))return;s.uniform4fv(this.addr,e),on(t,e)}}function cw(s,e){const t=this.cache,r=e.elements;if(r===void 0){if(sn(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),on(t,e)}else{if(sn(t,r))return;Mg.set(r),s.uniformMatrix2fv(this.addr,!1,Mg),on(t,r)}}function uw(s,e){const t=this.cache,r=e.elements;if(r===void 0){if(sn(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),on(t,e)}else{if(sn(t,r))return;Sg.set(r),s.uniformMatrix3fv(this.addr,!1,Sg),on(t,r)}}function dw(s,e){const t=this.cache,r=e.elements;if(r===void 0){if(sn(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),on(t,e)}else{if(sn(t,r))return;yg.set(r),s.uniformMatrix4fv(this.addr,!1,yg),on(t,r)}}function fw(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function hw(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(sn(t,e))return;s.uniform2iv(this.addr,e),on(t,e)}}function pw(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(sn(t,e))return;s.uniform3iv(this.addr,e),on(t,e)}}function mw(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(sn(t,e))return;s.uniform4iv(this.addr,e),on(t,e)}}function gw(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function vw(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(sn(t,e))return;s.uniform2uiv(this.addr,e),on(t,e)}}function xw(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(sn(t,e))return;s.uniform3uiv(this.addr,e),on(t,e)}}function _w(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(sn(t,e))return;s.uniform4uiv(this.addr,e),on(t,e)}}function yw(s,e,t){const r=this.cache,o=t.allocateTextureUnit();r[0]!==o&&(s.uniform1i(this.addr,o),r[0]=o);const l=this.type===s.SAMPLER_2D_SHADOW?Zv:Kv;t.setTexture2D(e||l,o)}function Sw(s,e,t){const r=this.cache,o=t.allocateTextureUnit();r[0]!==o&&(s.uniform1i(this.addr,o),r[0]=o),t.setTexture3D(e||Qv,o)}function Mw(s,e,t){const r=this.cache,o=t.allocateTextureUnit();r[0]!==o&&(s.uniform1i(this.addr,o),r[0]=o),t.setTextureCube(e||e0,o)}function Ew(s,e,t){const r=this.cache,o=t.allocateTextureUnit();r[0]!==o&&(s.uniform1i(this.addr,o),r[0]=o),t.setTexture2DArray(e||Jv,o)}function ww(s){switch(s){case 5126:return sw;case 35664:return ow;case 35665:return aw;case 35666:return lw;case 35674:return cw;case 35675:return uw;case 35676:return dw;case 5124:case 35670:return fw;case 35667:case 35671:return hw;case 35668:case 35672:return pw;case 35669:case 35673:return mw;case 5125:return gw;case 36294:return vw;case 36295:return xw;case 36296:return _w;case 35678:case 36198:case 36298:case 36306:case 35682:return yw;case 35679:case 36299:case 36307:return Sw;case 35680:case 36300:case 36308:case 36293:return Mw;case 36289:case 36303:case 36311:case 36292:return Ew}}function Tw(s,e){s.uniform1fv(this.addr,e)}function Aw(s,e){const t=po(e,this.size,2);s.uniform2fv(this.addr,t)}function bw(s,e){const t=po(e,this.size,3);s.uniform3fv(this.addr,t)}function Cw(s,e){const t=po(e,this.size,4);s.uniform4fv(this.addr,t)}function Rw(s,e){const t=po(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function Pw(s,e){const t=po(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function Lw(s,e){const t=po(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function Nw(s,e){s.uniform1iv(this.addr,e)}function Dw(s,e){s.uniform2iv(this.addr,e)}function Uw(s,e){s.uniform3iv(this.addr,e)}function Iw(s,e){s.uniform4iv(this.addr,e)}function Ow(s,e){s.uniform1uiv(this.addr,e)}function Fw(s,e){s.uniform2uiv(this.addr,e)}function kw(s,e){s.uniform3uiv(this.addr,e)}function zw(s,e){s.uniform4uiv(this.addr,e)}function Bw(s,e,t){const r=this.cache,o=e.length,l=Sc(t,o);sn(r,l)||(s.uniform1iv(this.addr,l),on(r,l));for(let d=0;d!==o;++d)t.setTexture2D(e[d]||Kv,l[d])}function Hw(s,e,t){const r=this.cache,o=e.length,l=Sc(t,o);sn(r,l)||(s.uniform1iv(this.addr,l),on(r,l));for(let d=0;d!==o;++d)t.setTexture3D(e[d]||Qv,l[d])}function Vw(s,e,t){const r=this.cache,o=e.length,l=Sc(t,o);sn(r,l)||(s.uniform1iv(this.addr,l),on(r,l));for(let d=0;d!==o;++d)t.setTextureCube(e[d]||e0,l[d])}function Gw(s,e,t){const r=this.cache,o=e.length,l=Sc(t,o);sn(r,l)||(s.uniform1iv(this.addr,l),on(r,l));for(let d=0;d!==o;++d)t.setTexture2DArray(e[d]||Jv,l[d])}function Ww(s){switch(s){case 5126:return Tw;case 35664:return Aw;case 35665:return bw;case 35666:return Cw;case 35674:return Rw;case 35675:return Pw;case 35676:return Lw;case 5124:case 35670:return Nw;case 35667:case 35671:return Dw;case 35668:case 35672:return Uw;case 35669:case 35673:return Iw;case 5125:return Ow;case 36294:return Fw;case 36295:return kw;case 36296:return zw;case 35678:case 36198:case 36298:case 36306:case 35682:return Bw;case 35679:case 36299:case 36307:return Hw;case 35680:case 36300:case 36308:case 36293:return Vw;case 36289:case 36303:case 36311:case 36292:return Gw}}class jw{constructor(e,t,r){this.id=e,this.addr=r,this.cache=[],this.type=t.type,this.setValue=ww(t.type)}}class Xw{constructor(e,t,r){this.id=e,this.addr=r,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Ww(t.type)}}class $w{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,r){const o=this.seq;for(let l=0,d=o.length;l!==d;++l){const c=o[l];c.setValue(e,t[c.id],r)}}}const Dd=/(\w+)(\])?(\[|\.)?/g;function Eg(s,e){s.seq.push(e),s.map[e.id]=e}function Yw(s,e,t){const r=s.name,o=r.length;for(Dd.lastIndex=0;;){const l=Dd.exec(r),d=Dd.lastIndex;let c=l[1];const f=l[2]==="]",h=l[3];if(f&&(c=c|0),h===void 0||h==="["&&d+2===o){Eg(t,h===void 0?new jw(c,s,e):new Xw(c,s,e));break}else{let g=t.map[c];g===void 0&&(g=new $w(c),Eg(t,g)),t=g}}}class Kl{constructor(e,t){this.seq=[],this.map={};const r=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<r;++o){const l=e.getActiveUniform(t,o),d=e.getUniformLocation(t,l.name);Yw(l,d,this)}}setValue(e,t,r,o){const l=this.map[t];l!==void 0&&l.setValue(e,r,o)}setOptional(e,t,r){const o=t[r];o!==void 0&&this.setValue(e,r,o)}static upload(e,t,r,o){for(let l=0,d=t.length;l!==d;++l){const c=t[l],f=r[c.id];f.needsUpdate!==!1&&c.setValue(e,f.value,o)}}static seqWithValue(e,t){const r=[];for(let o=0,l=e.length;o!==l;++o){const d=e[o];d.id in t&&r.push(d)}return r}}function wg(s,e,t){const r=s.createShader(e);return s.shaderSource(r,t),s.compileShader(r),r}const qw=37297;let Kw=0;function Zw(s,e){const t=s.split(`
`),r=[],o=Math.max(e-6,0),l=Math.min(e+6,t.length);for(let d=o;d<l;d++){const c=d+1;r.push(`${c===e?">":" "} ${c}: ${t[d]}`)}return r.join(`
`)}function Jw(s){const e=Lt.getPrimaries(Lt.workingColorSpace),t=Lt.getPrimaries(s);let r;switch(e===t?r="":e===ic&&t===nc?r="LinearDisplayP3ToLinearSRGB":e===nc&&t===ic&&(r="LinearSRGBToLinearDisplayP3"),s){case ji:case vc:return[r,"LinearTransferOETF"];case dn:case pf:return[r,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",s),[r,"LinearTransferOETF"]}}function Tg(s,e,t){const r=s.getShaderParameter(e,s.COMPILE_STATUS),o=s.getShaderInfoLog(e).trim();if(r&&o==="")return"";const l=/ERROR: 0:(\d+)/.exec(o);if(l){const d=parseInt(l[1]);return t.toUpperCase()+`

`+o+`

`+Zw(s.getShaderSource(e),d)}else return o}function Qw(s,e){const t=Jw(e);return`vec4 ${s}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function eT(s,e){let t;switch(e){case Qy:t="Linear";break;case eS:t="Reinhard";break;case tS:t="OptimizedCineon";break;case wv:t="ACESFilmic";break;case iS:t="AgX";break;case nS:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function tT(s){return[s.extensionDerivatives||s.envMapCubeUVHeight||s.bumpMap||s.normalMapTangentSpace||s.clearcoatNormalMap||s.flatShading||s.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(s.extensionFragDepth||s.logarithmicDepthBuffer)&&s.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",s.extensionDrawBuffers&&s.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(s.extensionShaderTextureLOD||s.envMap||s.transmission)&&s.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(eo).join(`
`)}function nT(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(eo).join(`
`)}function iT(s){const e=[];for(const t in s){const r=s[t];r!==!1&&e.push("#define "+t+" "+r)}return e.join(`
`)}function rT(s,e){const t={},r=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let o=0;o<r;o++){const l=s.getActiveAttrib(e,o),d=l.name;let c=1;l.type===s.FLOAT_MAT2&&(c=2),l.type===s.FLOAT_MAT3&&(c=3),l.type===s.FLOAT_MAT4&&(c=4),t[d]={type:l.type,location:s.getAttribLocation(e,d),locationSize:c}}return t}function eo(s){return s!==""}function Ag(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function bg(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const sT=/^[ \t]*#include +<([\w\d./]+)>/gm;function nf(s){return s.replace(sT,aT)}const oT=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function aT(s,e){let t=_t[e];if(t===void 0){const r=oT.get(e);if(r!==void 0)t=_t[r],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,r);else throw new Error("Can not resolve #include <"+e+">")}return nf(t)}const lT=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Cg(s){return s.replace(lT,cT)}function cT(s,e,t,r){let o="";for(let l=parseInt(e);l<parseInt(t);l++)o+=r.replace(/\[\s*i\s*\]/g,"[ "+l+" ]").replace(/UNROLLED_LOOP_INDEX/g,l);return o}function Rg(s){let e="precision "+s.precision+` float;
precision `+s.precision+" int;";return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function uT(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Sv?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===Mv?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Gi&&(e="SHADOWMAP_TYPE_VSM"),e}function dT(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case oo:case ao:e="ENVMAP_TYPE_CUBE";break;case gc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function fT(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case ao:e="ENVMAP_MODE_REFRACTION";break}return e}function hT(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Ev:e="ENVMAP_BLENDING_MULTIPLY";break;case Zy:e="ENVMAP_BLENDING_MIX";break;case Jy:e="ENVMAP_BLENDING_ADD";break}return e}function pT(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,r=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:r,maxMip:t}}function mT(s,e,t,r){const o=s.getContext(),l=t.defines;let d=t.vertexShader,c=t.fragmentShader;const f=uT(t),h=dT(t),p=fT(t),g=hT(t),y=pT(t),x=t.isWebGL2?"":tT(t),M=nT(t),E=iT(l),S=o.createProgram();let v,w,A=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(v=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,E].filter(eo).join(`
`),v.length>0&&(v+=`
`),w=[x,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,E].filter(eo).join(`
`),w.length>0&&(w+=`
`)):(v=[Rg(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,E,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+p:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+f:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(eo).join(`
`),w=[x,Rg(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,E,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.envMap?"#define "+p:"",t.envMap?"#define "+g:"",y?"#define CUBEUV_TEXEL_WIDTH "+y.texelWidth:"",y?"#define CUBEUV_TEXEL_HEIGHT "+y.texelHeight:"",y?"#define CUBEUV_MAX_MIP "+y.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+f:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==br?"#define TONE_MAPPING":"",t.toneMapping!==br?_t.tonemapping_pars_fragment:"",t.toneMapping!==br?eT("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",_t.colorspace_pars_fragment,Qw("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(eo).join(`
`)),d=nf(d),d=Ag(d,t),d=bg(d,t),c=nf(c),c=Ag(c,t),c=bg(c,t),d=Cg(d),c=Cg(c),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(A=`#version 300 es
`,v=[M,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+v,w=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===Ym?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Ym?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+w);const P=A+v+d,B=A+w+c,U=wg(o,o.VERTEX_SHADER,P),I=wg(o,o.FRAGMENT_SHADER,B);o.attachShader(S,U),o.attachShader(S,I),t.index0AttributeName!==void 0?o.bindAttribLocation(S,0,t.index0AttributeName):t.morphTargets===!0&&o.bindAttribLocation(S,0,"position"),o.linkProgram(S);function ne(ae){if(s.debug.checkShaderErrors){const me=o.getProgramInfoLog(S).trim(),F=o.getShaderInfoLog(U).trim(),$=o.getShaderInfoLog(I).trim();let J=!0,K=!0;if(o.getProgramParameter(S,o.LINK_STATUS)===!1)if(J=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(o,S,U,I);else{const X=Tg(o,U,"vertex"),Z=Tg(o,I,"fragment");console.error("THREE.WebGLProgram: Shader Error "+o.getError()+" - VALIDATE_STATUS "+o.getProgramParameter(S,o.VALIDATE_STATUS)+`

Program Info Log: `+me+`
`+X+`
`+Z)}else me!==""?console.warn("THREE.WebGLProgram: Program Info Log:",me):(F===""||$==="")&&(K=!1);K&&(ae.diagnostics={runnable:J,programLog:me,vertexShader:{log:F,prefix:v},fragmentShader:{log:$,prefix:w}})}o.deleteShader(U),o.deleteShader(I),R=new Kl(o,S),D=rT(o,S)}let R;this.getUniforms=function(){return R===void 0&&ne(this),R};let D;this.getAttributes=function(){return D===void 0&&ne(this),D};let re=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return re===!1&&(re=o.getProgramParameter(S,qw)),re},this.destroy=function(){r.releaseStatesOfProgram(this),o.deleteProgram(S),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Kw++,this.cacheKey=e,this.usedTimes=1,this.program=S,this.vertexShader=U,this.fragmentShader=I,this}let gT=0;class vT{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,r=e.fragmentShader,o=this._getShaderStage(t),l=this._getShaderStage(r),d=this._getShaderCacheForMaterial(e);return d.has(o)===!1&&(d.add(o),o.usedTimes++),d.has(l)===!1&&(d.add(l),l.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const r of t)r.usedTimes--,r.usedTimes===0&&this.shaderCache.delete(r.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let r=t.get(e);return r===void 0&&(r=new Set,t.set(e,r)),r}_getShaderStage(e){const t=this.shaderCache;let r=t.get(e);return r===void 0&&(r=new xT(e),t.set(e,r)),r}}class xT{constructor(e){this.id=gT++,this.code=e,this.usedTimes=0}}function _T(s,e,t,r,o,l,d){const c=new Bv,f=new vT,h=[],p=o.isWebGL2,g=o.logarithmicDepthBuffer,y=o.vertexTextures;let x=o.precision;const M={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function E(R){return R===0?"uv":`uv${R}`}function S(R,D,re,ae,me){const F=ae.fog,$=me.geometry,J=R.isMeshStandardMaterial?ae.environment:null,K=(R.isMeshStandardMaterial?t:e).get(R.envMap||J),X=K&&K.mapping===gc?K.image.height:null,Z=M[R.type];R.precision!==null&&(x=o.getMaxPrecision(R.precision),x!==R.precision&&console.warn("THREE.WebGLProgram.getParameters:",R.precision,"not supported, using",x,"instead."));const Y=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,O=Y!==void 0?Y.length:0;let W=0;$.morphAttributes.position!==void 0&&(W=1),$.morphAttributes.normal!==void 0&&(W=2),$.morphAttributes.color!==void 0&&(W=3);let q,fe,ve,Te;if(Z){const Tt=Mi[Z];q=Tt.vertexShader,fe=Tt.fragmentShader}else q=R.vertexShader,fe=R.fragmentShader,f.update(R),ve=f.getVertexShaderID(R),Te=f.getFragmentShaderID(R);const Ae=s.getRenderTarget(),Fe=me.isInstancedMesh===!0,ge=me.isBatchedMesh===!0,be=!!R.map,ze=!!R.matcap,ee=!!K,nt=!!R.aoMap,ke=!!R.lightMap,Qe=!!R.bumpMap,Ve=!!R.normalMap,wt=!!R.displacementMap,ot=!!R.emissiveMap,L=!!R.metalnessMap,C=!!R.roughnessMap,se=R.anisotropy>0,Me=R.clearcoat>0,ye=R.iridescence>0,we=R.sheen>0,Ze=R.transmission>0,Ie=se&&!!R.anisotropyMap,He=Me&&!!R.clearcoatMap,qe=Me&&!!R.clearcoatNormalMap,rt=Me&&!!R.clearcoatRoughnessMap,xe=ye&&!!R.iridescenceMap,mt=ye&&!!R.iridescenceThicknessMap,H=we&&!!R.sheenColorMap,_e=we&&!!R.sheenRoughnessMap,Ue=!!R.specularMap,Re=!!R.specularColorMap,$e=!!R.specularIntensityMap,dt=Ze&&!!R.transmissionMap,gt=Ze&&!!R.thicknessMap,st=!!R.gradientMap,Le=!!R.alphaMap,V=R.alphaTest>0,Pe=!!R.alphaHash,Ne=!!R.extensions,oe=!!$.attributes.uv1,pe=!!$.attributes.uv2,tt=!!$.attributes.uv3;let je=br;return R.toneMapped&&(Ae===null||Ae.isXRRenderTarget===!0)&&(je=s.toneMapping),{isWebGL2:p,shaderID:Z,shaderType:R.type,shaderName:R.name,vertexShader:q,fragmentShader:fe,defines:R.defines,customVertexShaderID:ve,customFragmentShaderID:Te,isRawShaderMaterial:R.isRawShaderMaterial===!0,glslVersion:R.glslVersion,precision:x,batching:ge,instancing:Fe,instancingColor:Fe&&me.instanceColor!==null,supportsVertexTextures:y,outputColorSpace:Ae===null?s.outputColorSpace:Ae.isXRRenderTarget===!0?Ae.texture.colorSpace:ji,map:be,matcap:ze,envMap:ee,envMapMode:ee&&K.mapping,envMapCubeUVHeight:X,aoMap:nt,lightMap:ke,bumpMap:Qe,normalMap:Ve,displacementMap:y&&wt,emissiveMap:ot,normalMapObjectSpace:Ve&&R.normalMapType===mS,normalMapTangentSpace:Ve&&R.normalMapType===Uv,metalnessMap:L,roughnessMap:C,anisotropy:se,anisotropyMap:Ie,clearcoat:Me,clearcoatMap:He,clearcoatNormalMap:qe,clearcoatRoughnessMap:rt,iridescence:ye,iridescenceMap:xe,iridescenceThicknessMap:mt,sheen:we,sheenColorMap:H,sheenRoughnessMap:_e,specularMap:Ue,specularColorMap:Re,specularIntensityMap:$e,transmission:Ze,transmissionMap:dt,thicknessMap:gt,gradientMap:st,opaque:R.transparent===!1&&R.blending===to,alphaMap:Le,alphaTest:V,alphaHash:Pe,combine:R.combine,mapUv:be&&E(R.map.channel),aoMapUv:nt&&E(R.aoMap.channel),lightMapUv:ke&&E(R.lightMap.channel),bumpMapUv:Qe&&E(R.bumpMap.channel),normalMapUv:Ve&&E(R.normalMap.channel),displacementMapUv:wt&&E(R.displacementMap.channel),emissiveMapUv:ot&&E(R.emissiveMap.channel),metalnessMapUv:L&&E(R.metalnessMap.channel),roughnessMapUv:C&&E(R.roughnessMap.channel),anisotropyMapUv:Ie&&E(R.anisotropyMap.channel),clearcoatMapUv:He&&E(R.clearcoatMap.channel),clearcoatNormalMapUv:qe&&E(R.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:rt&&E(R.clearcoatRoughnessMap.channel),iridescenceMapUv:xe&&E(R.iridescenceMap.channel),iridescenceThicknessMapUv:mt&&E(R.iridescenceThicknessMap.channel),sheenColorMapUv:H&&E(R.sheenColorMap.channel),sheenRoughnessMapUv:_e&&E(R.sheenRoughnessMap.channel),specularMapUv:Ue&&E(R.specularMap.channel),specularColorMapUv:Re&&E(R.specularColorMap.channel),specularIntensityMapUv:$e&&E(R.specularIntensityMap.channel),transmissionMapUv:dt&&E(R.transmissionMap.channel),thicknessMapUv:gt&&E(R.thicknessMap.channel),alphaMapUv:Le&&E(R.alphaMap.channel),vertexTangents:!!$.attributes.tangent&&(Ve||se),vertexColors:R.vertexColors,vertexAlphas:R.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,vertexUv1s:oe,vertexUv2s:pe,vertexUv3s:tt,pointsUvs:me.isPoints===!0&&!!$.attributes.uv&&(be||Le),fog:!!F,useFog:R.fog===!0,fogExp2:F&&F.isFogExp2,flatShading:R.flatShading===!0,sizeAttenuation:R.sizeAttenuation===!0,logarithmicDepthBuffer:g,skinning:me.isSkinnedMesh===!0,morphTargets:$.morphAttributes.position!==void 0,morphNormals:$.morphAttributes.normal!==void 0,morphColors:$.morphAttributes.color!==void 0,morphTargetsCount:O,morphTextureStride:W,numDirLights:D.directional.length,numPointLights:D.point.length,numSpotLights:D.spot.length,numSpotLightMaps:D.spotLightMap.length,numRectAreaLights:D.rectArea.length,numHemiLights:D.hemi.length,numDirLightShadows:D.directionalShadowMap.length,numPointLightShadows:D.pointShadowMap.length,numSpotLightShadows:D.spotShadowMap.length,numSpotLightShadowsWithMaps:D.numSpotLightShadowsWithMaps,numLightProbes:D.numLightProbes,numClippingPlanes:d.numPlanes,numClipIntersection:d.numIntersection,dithering:R.dithering,shadowMapEnabled:s.shadowMap.enabled&&re.length>0,shadowMapType:s.shadowMap.type,toneMapping:je,useLegacyLights:s._useLegacyLights,decodeVideoTexture:be&&R.map.isVideoTexture===!0&&Lt.getTransfer(R.map.colorSpace)===Ot,premultipliedAlpha:R.premultipliedAlpha,doubleSided:R.side===Ei,flipSided:R.side===Rn,useDepthPacking:R.depthPacking>=0,depthPacking:R.depthPacking||0,index0AttributeName:R.index0AttributeName,extensionDerivatives:Ne&&R.extensions.derivatives===!0,extensionFragDepth:Ne&&R.extensions.fragDepth===!0,extensionDrawBuffers:Ne&&R.extensions.drawBuffers===!0,extensionShaderTextureLOD:Ne&&R.extensions.shaderTextureLOD===!0,extensionClipCullDistance:Ne&&R.extensions.clipCullDistance&&r.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:p||r.has("EXT_frag_depth"),rendererExtensionDrawBuffers:p||r.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:p||r.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:r.has("KHR_parallel_shader_compile"),customProgramCacheKey:R.customProgramCacheKey()}}function v(R){const D=[];if(R.shaderID?D.push(R.shaderID):(D.push(R.customVertexShaderID),D.push(R.customFragmentShaderID)),R.defines!==void 0)for(const re in R.defines)D.push(re),D.push(R.defines[re]);return R.isRawShaderMaterial===!1&&(w(D,R),A(D,R),D.push(s.outputColorSpace)),D.push(R.customProgramCacheKey),D.join()}function w(R,D){R.push(D.precision),R.push(D.outputColorSpace),R.push(D.envMapMode),R.push(D.envMapCubeUVHeight),R.push(D.mapUv),R.push(D.alphaMapUv),R.push(D.lightMapUv),R.push(D.aoMapUv),R.push(D.bumpMapUv),R.push(D.normalMapUv),R.push(D.displacementMapUv),R.push(D.emissiveMapUv),R.push(D.metalnessMapUv),R.push(D.roughnessMapUv),R.push(D.anisotropyMapUv),R.push(D.clearcoatMapUv),R.push(D.clearcoatNormalMapUv),R.push(D.clearcoatRoughnessMapUv),R.push(D.iridescenceMapUv),R.push(D.iridescenceThicknessMapUv),R.push(D.sheenColorMapUv),R.push(D.sheenRoughnessMapUv),R.push(D.specularMapUv),R.push(D.specularColorMapUv),R.push(D.specularIntensityMapUv),R.push(D.transmissionMapUv),R.push(D.thicknessMapUv),R.push(D.combine),R.push(D.fogExp2),R.push(D.sizeAttenuation),R.push(D.morphTargetsCount),R.push(D.morphAttributeCount),R.push(D.numDirLights),R.push(D.numPointLights),R.push(D.numSpotLights),R.push(D.numSpotLightMaps),R.push(D.numHemiLights),R.push(D.numRectAreaLights),R.push(D.numDirLightShadows),R.push(D.numPointLightShadows),R.push(D.numSpotLightShadows),R.push(D.numSpotLightShadowsWithMaps),R.push(D.numLightProbes),R.push(D.shadowMapType),R.push(D.toneMapping),R.push(D.numClippingPlanes),R.push(D.numClipIntersection),R.push(D.depthPacking)}function A(R,D){c.disableAll(),D.isWebGL2&&c.enable(0),D.supportsVertexTextures&&c.enable(1),D.instancing&&c.enable(2),D.instancingColor&&c.enable(3),D.matcap&&c.enable(4),D.envMap&&c.enable(5),D.normalMapObjectSpace&&c.enable(6),D.normalMapTangentSpace&&c.enable(7),D.clearcoat&&c.enable(8),D.iridescence&&c.enable(9),D.alphaTest&&c.enable(10),D.vertexColors&&c.enable(11),D.vertexAlphas&&c.enable(12),D.vertexUv1s&&c.enable(13),D.vertexUv2s&&c.enable(14),D.vertexUv3s&&c.enable(15),D.vertexTangents&&c.enable(16),D.anisotropy&&c.enable(17),D.alphaHash&&c.enable(18),D.batching&&c.enable(19),R.push(c.mask),c.disableAll(),D.fog&&c.enable(0),D.useFog&&c.enable(1),D.flatShading&&c.enable(2),D.logarithmicDepthBuffer&&c.enable(3),D.skinning&&c.enable(4),D.morphTargets&&c.enable(5),D.morphNormals&&c.enable(6),D.morphColors&&c.enable(7),D.premultipliedAlpha&&c.enable(8),D.shadowMapEnabled&&c.enable(9),D.useLegacyLights&&c.enable(10),D.doubleSided&&c.enable(11),D.flipSided&&c.enable(12),D.useDepthPacking&&c.enable(13),D.dithering&&c.enable(14),D.transmission&&c.enable(15),D.sheen&&c.enable(16),D.opaque&&c.enable(17),D.pointsUvs&&c.enable(18),D.decodeVideoTexture&&c.enable(19),R.push(c.mask)}function P(R){const D=M[R.type];let re;if(D){const ae=Mi[D];re=tM.clone(ae.uniforms)}else re=R.uniforms;return re}function B(R,D){let re;for(let ae=0,me=h.length;ae<me;ae++){const F=h[ae];if(F.cacheKey===D){re=F,++re.usedTimes;break}}return re===void 0&&(re=new mT(s,D,R,l),h.push(re)),re}function U(R){if(--R.usedTimes===0){const D=h.indexOf(R);h[D]=h[h.length-1],h.pop(),R.destroy()}}function I(R){f.remove(R)}function ne(){f.dispose()}return{getParameters:S,getProgramCacheKey:v,getUniforms:P,acquireProgram:B,releaseProgram:U,releaseShaderCache:I,programs:h,dispose:ne}}function yT(){let s=new WeakMap;function e(l){let d=s.get(l);return d===void 0&&(d={},s.set(l,d)),d}function t(l){s.delete(l)}function r(l,d,c){s.get(l)[d]=c}function o(){s=new WeakMap}return{get:e,remove:t,update:r,dispose:o}}function ST(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function Pg(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function Lg(){const s=[];let e=0;const t=[],r=[],o=[];function l(){e=0,t.length=0,r.length=0,o.length=0}function d(g,y,x,M,E,S){let v=s[e];return v===void 0?(v={id:g.id,object:g,geometry:y,material:x,groupOrder:M,renderOrder:g.renderOrder,z:E,group:S},s[e]=v):(v.id=g.id,v.object=g,v.geometry=y,v.material=x,v.groupOrder=M,v.renderOrder=g.renderOrder,v.z=E,v.group=S),e++,v}function c(g,y,x,M,E,S){const v=d(g,y,x,M,E,S);x.transmission>0?r.push(v):x.transparent===!0?o.push(v):t.push(v)}function f(g,y,x,M,E,S){const v=d(g,y,x,M,E,S);x.transmission>0?r.unshift(v):x.transparent===!0?o.unshift(v):t.unshift(v)}function h(g,y){t.length>1&&t.sort(g||ST),r.length>1&&r.sort(y||Pg),o.length>1&&o.sort(y||Pg)}function p(){for(let g=e,y=s.length;g<y;g++){const x=s[g];if(x.id===null)break;x.id=null,x.object=null,x.geometry=null,x.material=null,x.group=null}}return{opaque:t,transmissive:r,transparent:o,init:l,push:c,unshift:f,finish:p,sort:h}}function MT(){let s=new WeakMap;function e(r,o){const l=s.get(r);let d;return l===void 0?(d=new Lg,s.set(r,[d])):o>=l.length?(d=new Lg,l.push(d)):d=l[o],d}function t(){s=new WeakMap}return{get:e,dispose:t}}function ET(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new z,color:new Et};break;case"SpotLight":t={position:new z,direction:new z,color:new Et,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new z,color:new Et,distance:0,decay:0};break;case"HemisphereLight":t={direction:new z,skyColor:new Et,groundColor:new Et};break;case"RectAreaLight":t={color:new Et,position:new z,halfWidth:new z,halfHeight:new z};break}return s[e.id]=t,t}}}function wT(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Be};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Be};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Be,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let TT=0;function AT(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function bT(s,e){const t=new ET,r=wT(),o={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let p=0;p<9;p++)o.probe.push(new z);const l=new z,d=new Ht,c=new Ht;function f(p,g){let y=0,x=0,M=0;for(let ae=0;ae<9;ae++)o.probe[ae].set(0,0,0);let E=0,S=0,v=0,w=0,A=0,P=0,B=0,U=0,I=0,ne=0,R=0;p.sort(AT);const D=g===!0?Math.PI:1;for(let ae=0,me=p.length;ae<me;ae++){const F=p[ae],$=F.color,J=F.intensity,K=F.distance,X=F.shadow&&F.shadow.map?F.shadow.map.texture:null;if(F.isAmbientLight)y+=$.r*J*D,x+=$.g*J*D,M+=$.b*J*D;else if(F.isLightProbe){for(let Z=0;Z<9;Z++)o.probe[Z].addScaledVector(F.sh.coefficients[Z],J);R++}else if(F.isDirectionalLight){const Z=t.get(F);if(Z.color.copy(F.color).multiplyScalar(F.intensity*D),F.castShadow){const Y=F.shadow,O=r.get(F);O.shadowBias=Y.bias,O.shadowNormalBias=Y.normalBias,O.shadowRadius=Y.radius,O.shadowMapSize=Y.mapSize,o.directionalShadow[E]=O,o.directionalShadowMap[E]=X,o.directionalShadowMatrix[E]=F.shadow.matrix,P++}o.directional[E]=Z,E++}else if(F.isSpotLight){const Z=t.get(F);Z.position.setFromMatrixPosition(F.matrixWorld),Z.color.copy($).multiplyScalar(J*D),Z.distance=K,Z.coneCos=Math.cos(F.angle),Z.penumbraCos=Math.cos(F.angle*(1-F.penumbra)),Z.decay=F.decay,o.spot[v]=Z;const Y=F.shadow;if(F.map&&(o.spotLightMap[I]=F.map,I++,Y.updateMatrices(F),F.castShadow&&ne++),o.spotLightMatrix[v]=Y.matrix,F.castShadow){const O=r.get(F);O.shadowBias=Y.bias,O.shadowNormalBias=Y.normalBias,O.shadowRadius=Y.radius,O.shadowMapSize=Y.mapSize,o.spotShadow[v]=O,o.spotShadowMap[v]=X,U++}v++}else if(F.isRectAreaLight){const Z=t.get(F);Z.color.copy($).multiplyScalar(J),Z.halfWidth.set(F.width*.5,0,0),Z.halfHeight.set(0,F.height*.5,0),o.rectArea[w]=Z,w++}else if(F.isPointLight){const Z=t.get(F);if(Z.color.copy(F.color).multiplyScalar(F.intensity*D),Z.distance=F.distance,Z.decay=F.decay,F.castShadow){const Y=F.shadow,O=r.get(F);O.shadowBias=Y.bias,O.shadowNormalBias=Y.normalBias,O.shadowRadius=Y.radius,O.shadowMapSize=Y.mapSize,O.shadowCameraNear=Y.camera.near,O.shadowCameraFar=Y.camera.far,o.pointShadow[S]=O,o.pointShadowMap[S]=X,o.pointShadowMatrix[S]=F.shadow.matrix,B++}o.point[S]=Z,S++}else if(F.isHemisphereLight){const Z=t.get(F);Z.skyColor.copy(F.color).multiplyScalar(J*D),Z.groundColor.copy(F.groundColor).multiplyScalar(J*D),o.hemi[A]=Z,A++}}w>0&&(e.isWebGL2?s.has("OES_texture_float_linear")===!0?(o.rectAreaLTC1=Oe.LTC_FLOAT_1,o.rectAreaLTC2=Oe.LTC_FLOAT_2):(o.rectAreaLTC1=Oe.LTC_HALF_1,o.rectAreaLTC2=Oe.LTC_HALF_2):s.has("OES_texture_float_linear")===!0?(o.rectAreaLTC1=Oe.LTC_FLOAT_1,o.rectAreaLTC2=Oe.LTC_FLOAT_2):s.has("OES_texture_half_float_linear")===!0?(o.rectAreaLTC1=Oe.LTC_HALF_1,o.rectAreaLTC2=Oe.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),o.ambient[0]=y,o.ambient[1]=x,o.ambient[2]=M;const re=o.hash;(re.directionalLength!==E||re.pointLength!==S||re.spotLength!==v||re.rectAreaLength!==w||re.hemiLength!==A||re.numDirectionalShadows!==P||re.numPointShadows!==B||re.numSpotShadows!==U||re.numSpotMaps!==I||re.numLightProbes!==R)&&(o.directional.length=E,o.spot.length=v,o.rectArea.length=w,o.point.length=S,o.hemi.length=A,o.directionalShadow.length=P,o.directionalShadowMap.length=P,o.pointShadow.length=B,o.pointShadowMap.length=B,o.spotShadow.length=U,o.spotShadowMap.length=U,o.directionalShadowMatrix.length=P,o.pointShadowMatrix.length=B,o.spotLightMatrix.length=U+I-ne,o.spotLightMap.length=I,o.numSpotLightShadowsWithMaps=ne,o.numLightProbes=R,re.directionalLength=E,re.pointLength=S,re.spotLength=v,re.rectAreaLength=w,re.hemiLength=A,re.numDirectionalShadows=P,re.numPointShadows=B,re.numSpotShadows=U,re.numSpotMaps=I,re.numLightProbes=R,o.version=TT++)}function h(p,g){let y=0,x=0,M=0,E=0,S=0;const v=g.matrixWorldInverse;for(let w=0,A=p.length;w<A;w++){const P=p[w];if(P.isDirectionalLight){const B=o.directional[y];B.direction.setFromMatrixPosition(P.matrixWorld),l.setFromMatrixPosition(P.target.matrixWorld),B.direction.sub(l),B.direction.transformDirection(v),y++}else if(P.isSpotLight){const B=o.spot[M];B.position.setFromMatrixPosition(P.matrixWorld),B.position.applyMatrix4(v),B.direction.setFromMatrixPosition(P.matrixWorld),l.setFromMatrixPosition(P.target.matrixWorld),B.direction.sub(l),B.direction.transformDirection(v),M++}else if(P.isRectAreaLight){const B=o.rectArea[E];B.position.setFromMatrixPosition(P.matrixWorld),B.position.applyMatrix4(v),c.identity(),d.copy(P.matrixWorld),d.premultiply(v),c.extractRotation(d),B.halfWidth.set(P.width*.5,0,0),B.halfHeight.set(0,P.height*.5,0),B.halfWidth.applyMatrix4(c),B.halfHeight.applyMatrix4(c),E++}else if(P.isPointLight){const B=o.point[x];B.position.setFromMatrixPosition(P.matrixWorld),B.position.applyMatrix4(v),x++}else if(P.isHemisphereLight){const B=o.hemi[S];B.direction.setFromMatrixPosition(P.matrixWorld),B.direction.transformDirection(v),S++}}}return{setup:f,setupView:h,state:o}}function Ng(s,e){const t=new bT(s,e),r=[],o=[];function l(){r.length=0,o.length=0}function d(g){r.push(g)}function c(g){o.push(g)}function f(g){t.setup(r,g)}function h(g){t.setupView(r,g)}return{init:l,state:{lightsArray:r,shadowsArray:o,lights:t},setupLights:f,setupLightsView:h,pushLight:d,pushShadow:c}}function CT(s,e){let t=new WeakMap;function r(l,d=0){const c=t.get(l);let f;return c===void 0?(f=new Ng(s,e),t.set(l,[f])):d>=c.length?(f=new Ng(s,e),c.push(f)):f=c[d],f}function o(){t=new WeakMap}return{get:r,dispose:o}}class RT extends ho{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=hS,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class PT extends ho{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const LT=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,NT=`uniform sampler2D shadow_pass;
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
}`;function DT(s,e,t){let r=new vf;const o=new Be,l=new Be,d=new Bt,c=new RT({depthPacking:pS}),f=new PT,h={},p=t.maxTextureSize,g={[Pr]:Rn,[Rn]:Pr,[Ei]:Ei},y=new os({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Be},radius:{value:4}},vertexShader:LT,fragmentShader:NT}),x=y.clone();x.defines.HORIZONTAL_PASS=1;const M=new Sn;M.setAttribute("position",new $n(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const E=new Rt(M,y),S=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Sv;let v=this.type;this.render=function(U,I,ne){if(S.enabled===!1||S.autoUpdate===!1&&S.needsUpdate===!1||U.length===0)return;const R=s.getRenderTarget(),D=s.getActiveCubeFace(),re=s.getActiveMipmapLevel(),ae=s.state;ae.setBlending(Ar),ae.buffers.color.setClear(1,1,1,1),ae.buffers.depth.setTest(!0),ae.setScissorTest(!1);const me=v!==Gi&&this.type===Gi,F=v===Gi&&this.type!==Gi;for(let $=0,J=U.length;$<J;$++){const K=U[$],X=K.shadow;if(X===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;o.copy(X.mapSize);const Z=X.getFrameExtents();if(o.multiply(Z),l.copy(X.mapSize),(o.x>p||o.y>p)&&(o.x>p&&(l.x=Math.floor(p/Z.x),o.x=l.x*Z.x,X.mapSize.x=l.x),o.y>p&&(l.y=Math.floor(p/Z.y),o.y=l.y*Z.y,X.mapSize.y=l.y)),X.map===null||me===!0||F===!0){const O=this.type!==Gi?{minFilter:Cn,magFilter:Cn}:{};X.map!==null&&X.map.dispose(),X.map=new ss(o.x,o.y,O),X.map.texture.name=K.name+".shadowMap",X.camera.updateProjectionMatrix()}s.setRenderTarget(X.map),s.clear();const Y=X.getViewportCount();for(let O=0;O<Y;O++){const W=X.getViewport(O);d.set(l.x*W.x,l.y*W.y,l.x*W.z,l.y*W.w),ae.viewport(d),X.updateMatrices(K,O),r=X.getFrustum(),P(I,ne,X.camera,K,this.type)}X.isPointLightShadow!==!0&&this.type===Gi&&w(X,ne),X.needsUpdate=!1}v=this.type,S.needsUpdate=!1,s.setRenderTarget(R,D,re)};function w(U,I){const ne=e.update(E);y.defines.VSM_SAMPLES!==U.blurSamples&&(y.defines.VSM_SAMPLES=U.blurSamples,x.defines.VSM_SAMPLES=U.blurSamples,y.needsUpdate=!0,x.needsUpdate=!0),U.mapPass===null&&(U.mapPass=new ss(o.x,o.y)),y.uniforms.shadow_pass.value=U.map.texture,y.uniforms.resolution.value=U.mapSize,y.uniforms.radius.value=U.radius,s.setRenderTarget(U.mapPass),s.clear(),s.renderBufferDirect(I,null,ne,y,E,null),x.uniforms.shadow_pass.value=U.mapPass.texture,x.uniforms.resolution.value=U.mapSize,x.uniforms.radius.value=U.radius,s.setRenderTarget(U.map),s.clear(),s.renderBufferDirect(I,null,ne,x,E,null)}function A(U,I,ne,R){let D=null;const re=ne.isPointLight===!0?U.customDistanceMaterial:U.customDepthMaterial;if(re!==void 0)D=re;else if(D=ne.isPointLight===!0?f:c,s.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0){const ae=D.uuid,me=I.uuid;let F=h[ae];F===void 0&&(F={},h[ae]=F);let $=F[me];$===void 0&&($=D.clone(),F[me]=$,I.addEventListener("dispose",B)),D=$}if(D.visible=I.visible,D.wireframe=I.wireframe,R===Gi?D.side=I.shadowSide!==null?I.shadowSide:I.side:D.side=I.shadowSide!==null?I.shadowSide:g[I.side],D.alphaMap=I.alphaMap,D.alphaTest=I.alphaTest,D.map=I.map,D.clipShadows=I.clipShadows,D.clippingPlanes=I.clippingPlanes,D.clipIntersection=I.clipIntersection,D.displacementMap=I.displacementMap,D.displacementScale=I.displacementScale,D.displacementBias=I.displacementBias,D.wireframeLinewidth=I.wireframeLinewidth,D.linewidth=I.linewidth,ne.isPointLight===!0&&D.isMeshDistanceMaterial===!0){const ae=s.properties.get(D);ae.light=ne}return D}function P(U,I,ne,R,D){if(U.visible===!1)return;if(U.layers.test(I.layers)&&(U.isMesh||U.isLine||U.isPoints)&&(U.castShadow||U.receiveShadow&&D===Gi)&&(!U.frustumCulled||r.intersectsObject(U))){U.modelViewMatrix.multiplyMatrices(ne.matrixWorldInverse,U.matrixWorld);const me=e.update(U),F=U.material;if(Array.isArray(F)){const $=me.groups;for(let J=0,K=$.length;J<K;J++){const X=$[J],Z=F[X.materialIndex];if(Z&&Z.visible){const Y=A(U,Z,R,D);U.onBeforeShadow(s,U,I,ne,me,Y,X),s.renderBufferDirect(ne,null,me,Y,U,X),U.onAfterShadow(s,U,I,ne,me,Y,X)}}}else if(F.visible){const $=A(U,F,R,D);U.onBeforeShadow(s,U,I,ne,me,$,null),s.renderBufferDirect(ne,null,me,$,U,null),U.onAfterShadow(s,U,I,ne,me,$,null)}}const ae=U.children;for(let me=0,F=ae.length;me<F;me++)P(ae[me],I,ne,R,D)}function B(U){U.target.removeEventListener("dispose",B);for(const ne in h){const R=h[ne],D=U.target.uuid;D in R&&(R[D].dispose(),delete R[D])}}}function UT(s,e,t){const r=t.isWebGL2;function o(){let V=!1;const Pe=new Bt;let Ne=null;const oe=new Bt(0,0,0,0);return{setMask:function(pe){Ne!==pe&&!V&&(s.colorMask(pe,pe,pe,pe),Ne=pe)},setLocked:function(pe){V=pe},setClear:function(pe,tt,je,ht,Tt){Tt===!0&&(pe*=ht,tt*=ht,je*=ht),Pe.set(pe,tt,je,ht),oe.equals(Pe)===!1&&(s.clearColor(pe,tt,je,ht),oe.copy(Pe))},reset:function(){V=!1,Ne=null,oe.set(-1,0,0,0)}}}function l(){let V=!1,Pe=null,Ne=null,oe=null;return{setTest:function(pe){pe?ge(s.DEPTH_TEST):be(s.DEPTH_TEST)},setMask:function(pe){Pe!==pe&&!V&&(s.depthMask(pe),Pe=pe)},setFunc:function(pe){if(Ne!==pe){switch(pe){case Wy:s.depthFunc(s.NEVER);break;case jy:s.depthFunc(s.ALWAYS);break;case Xy:s.depthFunc(s.LESS);break;case Ql:s.depthFunc(s.LEQUAL);break;case $y:s.depthFunc(s.EQUAL);break;case Yy:s.depthFunc(s.GEQUAL);break;case qy:s.depthFunc(s.GREATER);break;case Ky:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}Ne=pe}},setLocked:function(pe){V=pe},setClear:function(pe){oe!==pe&&(s.clearDepth(pe),oe=pe)},reset:function(){V=!1,Pe=null,Ne=null,oe=null}}}function d(){let V=!1,Pe=null,Ne=null,oe=null,pe=null,tt=null,je=null,ht=null,Tt=null;return{setTest:function(yt){V||(yt?ge(s.STENCIL_TEST):be(s.STENCIL_TEST))},setMask:function(yt){Pe!==yt&&!V&&(s.stencilMask(yt),Pe=yt)},setFunc:function(yt,$t,pn){(Ne!==yt||oe!==$t||pe!==pn)&&(s.stencilFunc(yt,$t,pn),Ne=yt,oe=$t,pe=pn)},setOp:function(yt,$t,pn){(tt!==yt||je!==$t||ht!==pn)&&(s.stencilOp(yt,$t,pn),tt=yt,je=$t,ht=pn)},setLocked:function(yt){V=yt},setClear:function(yt){Tt!==yt&&(s.clearStencil(yt),Tt=yt)},reset:function(){V=!1,Pe=null,Ne=null,oe=null,pe=null,tt=null,je=null,ht=null,Tt=null}}}const c=new o,f=new l,h=new d,p=new WeakMap,g=new WeakMap;let y={},x={},M=new WeakMap,E=[],S=null,v=!1,w=null,A=null,P=null,B=null,U=null,I=null,ne=null,R=new Et(0,0,0),D=0,re=!1,ae=null,me=null,F=null,$=null,J=null;const K=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,Z=0;const Y=s.getParameter(s.VERSION);Y.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(Y)[1]),X=Z>=1):Y.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),X=Z>=2);let O=null,W={};const q=s.getParameter(s.SCISSOR_BOX),fe=s.getParameter(s.VIEWPORT),ve=new Bt().fromArray(q),Te=new Bt().fromArray(fe);function Ae(V,Pe,Ne,oe){const pe=new Uint8Array(4),tt=s.createTexture();s.bindTexture(V,tt),s.texParameteri(V,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(V,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let je=0;je<Ne;je++)r&&(V===s.TEXTURE_3D||V===s.TEXTURE_2D_ARRAY)?s.texImage3D(Pe,0,s.RGBA,1,1,oe,0,s.RGBA,s.UNSIGNED_BYTE,pe):s.texImage2D(Pe+je,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,pe);return tt}const Fe={};Fe[s.TEXTURE_2D]=Ae(s.TEXTURE_2D,s.TEXTURE_2D,1),Fe[s.TEXTURE_CUBE_MAP]=Ae(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),r&&(Fe[s.TEXTURE_2D_ARRAY]=Ae(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Fe[s.TEXTURE_3D]=Ae(s.TEXTURE_3D,s.TEXTURE_3D,1,1)),c.setClear(0,0,0,1),f.setClear(1),h.setClear(0),ge(s.DEPTH_TEST),f.setFunc(Ql),ot(!1),L(pm),ge(s.CULL_FACE),Ve(Ar);function ge(V){y[V]!==!0&&(s.enable(V),y[V]=!0)}function be(V){y[V]!==!1&&(s.disable(V),y[V]=!1)}function ze(V,Pe){return x[V]!==Pe?(s.bindFramebuffer(V,Pe),x[V]=Pe,r&&(V===s.DRAW_FRAMEBUFFER&&(x[s.FRAMEBUFFER]=Pe),V===s.FRAMEBUFFER&&(x[s.DRAW_FRAMEBUFFER]=Pe)),!0):!1}function ee(V,Pe){let Ne=E,oe=!1;if(V)if(Ne=M.get(Pe),Ne===void 0&&(Ne=[],M.set(Pe,Ne)),V.isWebGLMultipleRenderTargets){const pe=V.texture;if(Ne.length!==pe.length||Ne[0]!==s.COLOR_ATTACHMENT0){for(let tt=0,je=pe.length;tt<je;tt++)Ne[tt]=s.COLOR_ATTACHMENT0+tt;Ne.length=pe.length,oe=!0}}else Ne[0]!==s.COLOR_ATTACHMENT0&&(Ne[0]=s.COLOR_ATTACHMENT0,oe=!0);else Ne[0]!==s.BACK&&(Ne[0]=s.BACK,oe=!0);oe&&(t.isWebGL2?s.drawBuffers(Ne):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(Ne))}function nt(V){return S!==V?(s.useProgram(V),S=V,!0):!1}const ke={[Jr]:s.FUNC_ADD,[Ry]:s.FUNC_SUBTRACT,[Py]:s.FUNC_REVERSE_SUBTRACT};if(r)ke[xm]=s.MIN,ke[_m]=s.MAX;else{const V=e.get("EXT_blend_minmax");V!==null&&(ke[xm]=V.MIN_EXT,ke[_m]=V.MAX_EXT)}const Qe={[Ly]:s.ZERO,[Ny]:s.ONE,[Dy]:s.SRC_COLOR,[Yd]:s.SRC_ALPHA,[zy]:s.SRC_ALPHA_SATURATE,[Fy]:s.DST_COLOR,[Iy]:s.DST_ALPHA,[Uy]:s.ONE_MINUS_SRC_COLOR,[qd]:s.ONE_MINUS_SRC_ALPHA,[ky]:s.ONE_MINUS_DST_COLOR,[Oy]:s.ONE_MINUS_DST_ALPHA,[By]:s.CONSTANT_COLOR,[Hy]:s.ONE_MINUS_CONSTANT_COLOR,[Vy]:s.CONSTANT_ALPHA,[Gy]:s.ONE_MINUS_CONSTANT_ALPHA};function Ve(V,Pe,Ne,oe,pe,tt,je,ht,Tt,yt){if(V===Ar){v===!0&&(be(s.BLEND),v=!1);return}if(v===!1&&(ge(s.BLEND),v=!0),V!==Cy){if(V!==w||yt!==re){if((A!==Jr||U!==Jr)&&(s.blendEquation(s.FUNC_ADD),A=Jr,U=Jr),yt)switch(V){case to:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case mm:s.blendFunc(s.ONE,s.ONE);break;case gm:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case vm:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",V);break}else switch(V){case to:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case mm:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case gm:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case vm:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",V);break}P=null,B=null,I=null,ne=null,R.set(0,0,0),D=0,w=V,re=yt}return}pe=pe||Pe,tt=tt||Ne,je=je||oe,(Pe!==A||pe!==U)&&(s.blendEquationSeparate(ke[Pe],ke[pe]),A=Pe,U=pe),(Ne!==P||oe!==B||tt!==I||je!==ne)&&(s.blendFuncSeparate(Qe[Ne],Qe[oe],Qe[tt],Qe[je]),P=Ne,B=oe,I=tt,ne=je),(ht.equals(R)===!1||Tt!==D)&&(s.blendColor(ht.r,ht.g,ht.b,Tt),R.copy(ht),D=Tt),w=V,re=!1}function wt(V,Pe){V.side===Ei?be(s.CULL_FACE):ge(s.CULL_FACE);let Ne=V.side===Rn;Pe&&(Ne=!Ne),ot(Ne),V.blending===to&&V.transparent===!1?Ve(Ar):Ve(V.blending,V.blendEquation,V.blendSrc,V.blendDst,V.blendEquationAlpha,V.blendSrcAlpha,V.blendDstAlpha,V.blendColor,V.blendAlpha,V.premultipliedAlpha),f.setFunc(V.depthFunc),f.setTest(V.depthTest),f.setMask(V.depthWrite),c.setMask(V.colorWrite);const oe=V.stencilWrite;h.setTest(oe),oe&&(h.setMask(V.stencilWriteMask),h.setFunc(V.stencilFunc,V.stencilRef,V.stencilFuncMask),h.setOp(V.stencilFail,V.stencilZFail,V.stencilZPass)),se(V.polygonOffset,V.polygonOffsetFactor,V.polygonOffsetUnits),V.alphaToCoverage===!0?ge(s.SAMPLE_ALPHA_TO_COVERAGE):be(s.SAMPLE_ALPHA_TO_COVERAGE)}function ot(V){ae!==V&&(V?s.frontFace(s.CW):s.frontFace(s.CCW),ae=V)}function L(V){V!==Ay?(ge(s.CULL_FACE),V!==me&&(V===pm?s.cullFace(s.BACK):V===by?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):be(s.CULL_FACE),me=V}function C(V){V!==F&&(X&&s.lineWidth(V),F=V)}function se(V,Pe,Ne){V?(ge(s.POLYGON_OFFSET_FILL),($!==Pe||J!==Ne)&&(s.polygonOffset(Pe,Ne),$=Pe,J=Ne)):be(s.POLYGON_OFFSET_FILL)}function Me(V){V?ge(s.SCISSOR_TEST):be(s.SCISSOR_TEST)}function ye(V){V===void 0&&(V=s.TEXTURE0+K-1),O!==V&&(s.activeTexture(V),O=V)}function we(V,Pe,Ne){Ne===void 0&&(O===null?Ne=s.TEXTURE0+K-1:Ne=O);let oe=W[Ne];oe===void 0&&(oe={type:void 0,texture:void 0},W[Ne]=oe),(oe.type!==V||oe.texture!==Pe)&&(O!==Ne&&(s.activeTexture(Ne),O=Ne),s.bindTexture(V,Pe||Fe[V]),oe.type=V,oe.texture=Pe)}function Ze(){const V=W[O];V!==void 0&&V.type!==void 0&&(s.bindTexture(V.type,null),V.type=void 0,V.texture=void 0)}function Ie(){try{s.compressedTexImage2D.apply(s,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function He(){try{s.compressedTexImage3D.apply(s,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function qe(){try{s.texSubImage2D.apply(s,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function rt(){try{s.texSubImage3D.apply(s,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function xe(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function mt(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function H(){try{s.texStorage2D.apply(s,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function _e(){try{s.texStorage3D.apply(s,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Ue(){try{s.texImage2D.apply(s,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Re(){try{s.texImage3D.apply(s,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function $e(V){ve.equals(V)===!1&&(s.scissor(V.x,V.y,V.z,V.w),ve.copy(V))}function dt(V){Te.equals(V)===!1&&(s.viewport(V.x,V.y,V.z,V.w),Te.copy(V))}function gt(V,Pe){let Ne=g.get(Pe);Ne===void 0&&(Ne=new WeakMap,g.set(Pe,Ne));let oe=Ne.get(V);oe===void 0&&(oe=s.getUniformBlockIndex(Pe,V.name),Ne.set(V,oe))}function st(V,Pe){const oe=g.get(Pe).get(V);p.get(Pe)!==oe&&(s.uniformBlockBinding(Pe,oe,V.__bindingPointIndex),p.set(Pe,oe))}function Le(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),r===!0&&(s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null)),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),y={},O=null,W={},x={},M=new WeakMap,E=[],S=null,v=!1,w=null,A=null,P=null,B=null,U=null,I=null,ne=null,R=new Et(0,0,0),D=0,re=!1,ae=null,me=null,F=null,$=null,J=null,ve.set(0,0,s.canvas.width,s.canvas.height),Te.set(0,0,s.canvas.width,s.canvas.height),c.reset(),f.reset(),h.reset()}return{buffers:{color:c,depth:f,stencil:h},enable:ge,disable:be,bindFramebuffer:ze,drawBuffers:ee,useProgram:nt,setBlending:Ve,setMaterial:wt,setFlipSided:ot,setCullFace:L,setLineWidth:C,setPolygonOffset:se,setScissorTest:Me,activeTexture:ye,bindTexture:we,unbindTexture:Ze,compressedTexImage2D:Ie,compressedTexImage3D:He,texImage2D:Ue,texImage3D:Re,updateUBOMapping:gt,uniformBlockBinding:st,texStorage2D:H,texStorage3D:_e,texSubImage2D:qe,texSubImage3D:rt,compressedTexSubImage2D:xe,compressedTexSubImage3D:mt,scissor:$e,viewport:dt,reset:Le}}function IT(s,e,t,r,o,l,d){const c=o.isWebGL2,f=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,h=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),p=new WeakMap;let g;const y=new WeakMap;let x=!1;try{x=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function M(L,C){return x?new OffscreenCanvas(L,C):oc("canvas")}function E(L,C,se,Me){let ye=1;if((L.width>Me||L.height>Me)&&(ye=Me/Math.max(L.width,L.height)),ye<1||C===!0)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap){const we=C?sc:Math.floor,Ze=we(ye*L.width),Ie=we(ye*L.height);g===void 0&&(g=M(Ze,Ie));const He=se?M(Ze,Ie):g;return He.width=Ze,He.height=Ie,He.getContext("2d").drawImage(L,0,0,Ze,Ie),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+L.width+"x"+L.height+") to ("+Ze+"x"+Ie+")."),He}else return"data"in L&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+L.width+"x"+L.height+")."),L;return L}function S(L){return ef(L.width)&&ef(L.height)}function v(L){return c?!1:L.wrapS!==pi||L.wrapT!==pi||L.minFilter!==Cn&&L.minFilter!==ni}function w(L,C){return L.generateMipmaps&&C&&L.minFilter!==Cn&&L.minFilter!==ni}function A(L){s.generateMipmap(L)}function P(L,C,se,Me,ye=!1){if(c===!1)return C;if(L!==null){if(s[L]!==void 0)return s[L];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let we=C;if(C===s.RED&&(se===s.FLOAT&&(we=s.R32F),se===s.HALF_FLOAT&&(we=s.R16F),se===s.UNSIGNED_BYTE&&(we=s.R8)),C===s.RED_INTEGER&&(se===s.UNSIGNED_BYTE&&(we=s.R8UI),se===s.UNSIGNED_SHORT&&(we=s.R16UI),se===s.UNSIGNED_INT&&(we=s.R32UI),se===s.BYTE&&(we=s.R8I),se===s.SHORT&&(we=s.R16I),se===s.INT&&(we=s.R32I)),C===s.RG&&(se===s.FLOAT&&(we=s.RG32F),se===s.HALF_FLOAT&&(we=s.RG16F),se===s.UNSIGNED_BYTE&&(we=s.RG8)),C===s.RGBA){const Ze=ye?tc:Lt.getTransfer(Me);se===s.FLOAT&&(we=s.RGBA32F),se===s.HALF_FLOAT&&(we=s.RGBA16F),se===s.UNSIGNED_BYTE&&(we=Ze===Ot?s.SRGB8_ALPHA8:s.RGBA8),se===s.UNSIGNED_SHORT_4_4_4_4&&(we=s.RGBA4),se===s.UNSIGNED_SHORT_5_5_5_1&&(we=s.RGB5_A1)}return(we===s.R16F||we===s.R32F||we===s.RG16F||we===s.RG32F||we===s.RGBA16F||we===s.RGBA32F)&&e.get("EXT_color_buffer_float"),we}function B(L,C,se){return w(L,se)===!0||L.isFramebufferTexture&&L.minFilter!==Cn&&L.minFilter!==ni?Math.log2(Math.max(C.width,C.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?C.mipmaps.length:1}function U(L){return L===Cn||L===ym||L===od?s.NEAREST:s.LINEAR}function I(L){const C=L.target;C.removeEventListener("dispose",I),R(C),C.isVideoTexture&&p.delete(C)}function ne(L){const C=L.target;C.removeEventListener("dispose",ne),re(C)}function R(L){const C=r.get(L);if(C.__webglInit===void 0)return;const se=L.source,Me=y.get(se);if(Me){const ye=Me[C.__cacheKey];ye.usedTimes--,ye.usedTimes===0&&D(L),Object.keys(Me).length===0&&y.delete(se)}r.remove(L)}function D(L){const C=r.get(L);s.deleteTexture(C.__webglTexture);const se=L.source,Me=y.get(se);delete Me[C.__cacheKey],d.memory.textures--}function re(L){const C=L.texture,se=r.get(L),Me=r.get(C);if(Me.__webglTexture!==void 0&&(s.deleteTexture(Me.__webglTexture),d.memory.textures--),L.depthTexture&&L.depthTexture.dispose(),L.isWebGLCubeRenderTarget)for(let ye=0;ye<6;ye++){if(Array.isArray(se.__webglFramebuffer[ye]))for(let we=0;we<se.__webglFramebuffer[ye].length;we++)s.deleteFramebuffer(se.__webglFramebuffer[ye][we]);else s.deleteFramebuffer(se.__webglFramebuffer[ye]);se.__webglDepthbuffer&&s.deleteRenderbuffer(se.__webglDepthbuffer[ye])}else{if(Array.isArray(se.__webglFramebuffer))for(let ye=0;ye<se.__webglFramebuffer.length;ye++)s.deleteFramebuffer(se.__webglFramebuffer[ye]);else s.deleteFramebuffer(se.__webglFramebuffer);if(se.__webglDepthbuffer&&s.deleteRenderbuffer(se.__webglDepthbuffer),se.__webglMultisampledFramebuffer&&s.deleteFramebuffer(se.__webglMultisampledFramebuffer),se.__webglColorRenderbuffer)for(let ye=0;ye<se.__webglColorRenderbuffer.length;ye++)se.__webglColorRenderbuffer[ye]&&s.deleteRenderbuffer(se.__webglColorRenderbuffer[ye]);se.__webglDepthRenderbuffer&&s.deleteRenderbuffer(se.__webglDepthRenderbuffer)}if(L.isWebGLMultipleRenderTargets)for(let ye=0,we=C.length;ye<we;ye++){const Ze=r.get(C[ye]);Ze.__webglTexture&&(s.deleteTexture(Ze.__webglTexture),d.memory.textures--),r.remove(C[ye])}r.remove(C),r.remove(L)}let ae=0;function me(){ae=0}function F(){const L=ae;return L>=o.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+L+" texture units while this GPU supports only "+o.maxTextures),ae+=1,L}function $(L){const C=[];return C.push(L.wrapS),C.push(L.wrapT),C.push(L.wrapR||0),C.push(L.magFilter),C.push(L.minFilter),C.push(L.anisotropy),C.push(L.internalFormat),C.push(L.format),C.push(L.type),C.push(L.generateMipmaps),C.push(L.premultiplyAlpha),C.push(L.flipY),C.push(L.unpackAlignment),C.push(L.colorSpace),C.join()}function J(L,C){const se=r.get(L);if(L.isVideoTexture&&wt(L),L.isRenderTargetTexture===!1&&L.version>0&&se.__version!==L.version){const Me=L.image;if(Me===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Me.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ve(se,L,C);return}}t.bindTexture(s.TEXTURE_2D,se.__webglTexture,s.TEXTURE0+C)}function K(L,C){const se=r.get(L);if(L.version>0&&se.__version!==L.version){ve(se,L,C);return}t.bindTexture(s.TEXTURE_2D_ARRAY,se.__webglTexture,s.TEXTURE0+C)}function X(L,C){const se=r.get(L);if(L.version>0&&se.__version!==L.version){ve(se,L,C);return}t.bindTexture(s.TEXTURE_3D,se.__webglTexture,s.TEXTURE0+C)}function Z(L,C){const se=r.get(L);if(L.version>0&&se.__version!==L.version){Te(se,L,C);return}t.bindTexture(s.TEXTURE_CUBE_MAP,se.__webglTexture,s.TEXTURE0+C)}const Y={[ec]:s.REPEAT,[pi]:s.CLAMP_TO_EDGE,[Jd]:s.MIRRORED_REPEAT},O={[Cn]:s.NEAREST,[ym]:s.NEAREST_MIPMAP_NEAREST,[od]:s.NEAREST_MIPMAP_LINEAR,[ni]:s.LINEAR,[rS]:s.LINEAR_MIPMAP_NEAREST,[oa]:s.LINEAR_MIPMAP_LINEAR},W={[gS]:s.NEVER,[MS]:s.ALWAYS,[vS]:s.LESS,[Iv]:s.LEQUAL,[xS]:s.EQUAL,[SS]:s.GEQUAL,[_S]:s.GREATER,[yS]:s.NOTEQUAL};function q(L,C,se){if(se?(s.texParameteri(L,s.TEXTURE_WRAP_S,Y[C.wrapS]),s.texParameteri(L,s.TEXTURE_WRAP_T,Y[C.wrapT]),(L===s.TEXTURE_3D||L===s.TEXTURE_2D_ARRAY)&&s.texParameteri(L,s.TEXTURE_WRAP_R,Y[C.wrapR]),s.texParameteri(L,s.TEXTURE_MAG_FILTER,O[C.magFilter]),s.texParameteri(L,s.TEXTURE_MIN_FILTER,O[C.minFilter])):(s.texParameteri(L,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(L,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE),(L===s.TEXTURE_3D||L===s.TEXTURE_2D_ARRAY)&&s.texParameteri(L,s.TEXTURE_WRAP_R,s.CLAMP_TO_EDGE),(C.wrapS!==pi||C.wrapT!==pi)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),s.texParameteri(L,s.TEXTURE_MAG_FILTER,U(C.magFilter)),s.texParameteri(L,s.TEXTURE_MIN_FILTER,U(C.minFilter)),C.minFilter!==Cn&&C.minFilter!==ni&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),C.compareFunction&&(s.texParameteri(L,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(L,s.TEXTURE_COMPARE_FUNC,W[C.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const Me=e.get("EXT_texture_filter_anisotropic");if(C.magFilter===Cn||C.minFilter!==od&&C.minFilter!==oa||C.type===Er&&e.has("OES_texture_float_linear")===!1||c===!1&&C.type===aa&&e.has("OES_texture_half_float_linear")===!1)return;(C.anisotropy>1||r.get(C).__currentAnisotropy)&&(s.texParameterf(L,Me.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(C.anisotropy,o.getMaxAnisotropy())),r.get(C).__currentAnisotropy=C.anisotropy)}}function fe(L,C){let se=!1;L.__webglInit===void 0&&(L.__webglInit=!0,C.addEventListener("dispose",I));const Me=C.source;let ye=y.get(Me);ye===void 0&&(ye={},y.set(Me,ye));const we=$(C);if(we!==L.__cacheKey){ye[we]===void 0&&(ye[we]={texture:s.createTexture(),usedTimes:0},d.memory.textures++,se=!0),ye[we].usedTimes++;const Ze=ye[L.__cacheKey];Ze!==void 0&&(ye[L.__cacheKey].usedTimes--,Ze.usedTimes===0&&D(C)),L.__cacheKey=we,L.__webglTexture=ye[we].texture}return se}function ve(L,C,se){let Me=s.TEXTURE_2D;(C.isDataArrayTexture||C.isCompressedArrayTexture)&&(Me=s.TEXTURE_2D_ARRAY),C.isData3DTexture&&(Me=s.TEXTURE_3D);const ye=fe(L,C),we=C.source;t.bindTexture(Me,L.__webglTexture,s.TEXTURE0+se);const Ze=r.get(we);if(we.version!==Ze.__version||ye===!0){t.activeTexture(s.TEXTURE0+se);const Ie=Lt.getPrimaries(Lt.workingColorSpace),He=C.colorSpace===ri?null:Lt.getPrimaries(C.colorSpace),qe=C.colorSpace===ri||Ie===He?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,C.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,C.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,qe);const rt=v(C)&&S(C.image)===!1;let xe=E(C.image,rt,!1,o.maxTextureSize);xe=ot(C,xe);const mt=S(xe)||c,H=l.convert(C.format,C.colorSpace);let _e=l.convert(C.type),Ue=P(C.internalFormat,H,_e,C.colorSpace,C.isVideoTexture);q(Me,C,mt);let Re;const $e=C.mipmaps,dt=c&&C.isVideoTexture!==!0&&Ue!==Nv,gt=Ze.__version===void 0||ye===!0,st=B(C,xe,mt);if(C.isDepthTexture)Ue=s.DEPTH_COMPONENT,c?C.type===Er?Ue=s.DEPTH_COMPONENT32F:C.type===Mr?Ue=s.DEPTH_COMPONENT24:C.type===ts?Ue=s.DEPTH24_STENCIL8:Ue=s.DEPTH_COMPONENT16:C.type===Er&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),C.format===ns&&Ue===s.DEPTH_COMPONENT&&C.type!==hf&&C.type!==Mr&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),C.type=Mr,_e=l.convert(C.type)),C.format===lo&&Ue===s.DEPTH_COMPONENT&&(Ue=s.DEPTH_STENCIL,C.type!==ts&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),C.type=ts,_e=l.convert(C.type))),gt&&(dt?t.texStorage2D(s.TEXTURE_2D,1,Ue,xe.width,xe.height):t.texImage2D(s.TEXTURE_2D,0,Ue,xe.width,xe.height,0,H,_e,null));else if(C.isDataTexture)if($e.length>0&&mt){dt&&gt&&t.texStorage2D(s.TEXTURE_2D,st,Ue,$e[0].width,$e[0].height);for(let Le=0,V=$e.length;Le<V;Le++)Re=$e[Le],dt?t.texSubImage2D(s.TEXTURE_2D,Le,0,0,Re.width,Re.height,H,_e,Re.data):t.texImage2D(s.TEXTURE_2D,Le,Ue,Re.width,Re.height,0,H,_e,Re.data);C.generateMipmaps=!1}else dt?(gt&&t.texStorage2D(s.TEXTURE_2D,st,Ue,xe.width,xe.height),t.texSubImage2D(s.TEXTURE_2D,0,0,0,xe.width,xe.height,H,_e,xe.data)):t.texImage2D(s.TEXTURE_2D,0,Ue,xe.width,xe.height,0,H,_e,xe.data);else if(C.isCompressedTexture)if(C.isCompressedArrayTexture){dt&&gt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,st,Ue,$e[0].width,$e[0].height,xe.depth);for(let Le=0,V=$e.length;Le<V;Le++)Re=$e[Le],C.format!==mi?H!==null?dt?t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,Le,0,0,0,Re.width,Re.height,xe.depth,H,Re.data,0,0):t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,Le,Ue,Re.width,Re.height,xe.depth,0,Re.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):dt?t.texSubImage3D(s.TEXTURE_2D_ARRAY,Le,0,0,0,Re.width,Re.height,xe.depth,H,_e,Re.data):t.texImage3D(s.TEXTURE_2D_ARRAY,Le,Ue,Re.width,Re.height,xe.depth,0,H,_e,Re.data)}else{dt&&gt&&t.texStorage2D(s.TEXTURE_2D,st,Ue,$e[0].width,$e[0].height);for(let Le=0,V=$e.length;Le<V;Le++)Re=$e[Le],C.format!==mi?H!==null?dt?t.compressedTexSubImage2D(s.TEXTURE_2D,Le,0,0,Re.width,Re.height,H,Re.data):t.compressedTexImage2D(s.TEXTURE_2D,Le,Ue,Re.width,Re.height,0,Re.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):dt?t.texSubImage2D(s.TEXTURE_2D,Le,0,0,Re.width,Re.height,H,_e,Re.data):t.texImage2D(s.TEXTURE_2D,Le,Ue,Re.width,Re.height,0,H,_e,Re.data)}else if(C.isDataArrayTexture)dt?(gt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,st,Ue,xe.width,xe.height,xe.depth),t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,xe.width,xe.height,xe.depth,H,_e,xe.data)):t.texImage3D(s.TEXTURE_2D_ARRAY,0,Ue,xe.width,xe.height,xe.depth,0,H,_e,xe.data);else if(C.isData3DTexture)dt?(gt&&t.texStorage3D(s.TEXTURE_3D,st,Ue,xe.width,xe.height,xe.depth),t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,xe.width,xe.height,xe.depth,H,_e,xe.data)):t.texImage3D(s.TEXTURE_3D,0,Ue,xe.width,xe.height,xe.depth,0,H,_e,xe.data);else if(C.isFramebufferTexture){if(gt)if(dt)t.texStorage2D(s.TEXTURE_2D,st,Ue,xe.width,xe.height);else{let Le=xe.width,V=xe.height;for(let Pe=0;Pe<st;Pe++)t.texImage2D(s.TEXTURE_2D,Pe,Ue,Le,V,0,H,_e,null),Le>>=1,V>>=1}}else if($e.length>0&&mt){dt&&gt&&t.texStorage2D(s.TEXTURE_2D,st,Ue,$e[0].width,$e[0].height);for(let Le=0,V=$e.length;Le<V;Le++)Re=$e[Le],dt?t.texSubImage2D(s.TEXTURE_2D,Le,0,0,H,_e,Re):t.texImage2D(s.TEXTURE_2D,Le,Ue,H,_e,Re);C.generateMipmaps=!1}else dt?(gt&&t.texStorage2D(s.TEXTURE_2D,st,Ue,xe.width,xe.height),t.texSubImage2D(s.TEXTURE_2D,0,0,0,H,_e,xe)):t.texImage2D(s.TEXTURE_2D,0,Ue,H,_e,xe);w(C,mt)&&A(Me),Ze.__version=we.version,C.onUpdate&&C.onUpdate(C)}L.__version=C.version}function Te(L,C,se){if(C.image.length!==6)return;const Me=fe(L,C),ye=C.source;t.bindTexture(s.TEXTURE_CUBE_MAP,L.__webglTexture,s.TEXTURE0+se);const we=r.get(ye);if(ye.version!==we.__version||Me===!0){t.activeTexture(s.TEXTURE0+se);const Ze=Lt.getPrimaries(Lt.workingColorSpace),Ie=C.colorSpace===ri?null:Lt.getPrimaries(C.colorSpace),He=C.colorSpace===ri||Ze===Ie?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,C.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,C.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,He);const qe=C.isCompressedTexture||C.image[0].isCompressedTexture,rt=C.image[0]&&C.image[0].isDataTexture,xe=[];for(let Le=0;Le<6;Le++)!qe&&!rt?xe[Le]=E(C.image[Le],!1,!0,o.maxCubemapSize):xe[Le]=rt?C.image[Le].image:C.image[Le],xe[Le]=ot(C,xe[Le]);const mt=xe[0],H=S(mt)||c,_e=l.convert(C.format,C.colorSpace),Ue=l.convert(C.type),Re=P(C.internalFormat,_e,Ue,C.colorSpace),$e=c&&C.isVideoTexture!==!0,dt=we.__version===void 0||Me===!0;let gt=B(C,mt,H);q(s.TEXTURE_CUBE_MAP,C,H);let st;if(qe){$e&&dt&&t.texStorage2D(s.TEXTURE_CUBE_MAP,gt,Re,mt.width,mt.height);for(let Le=0;Le<6;Le++){st=xe[Le].mipmaps;for(let V=0;V<st.length;V++){const Pe=st[V];C.format!==mi?_e!==null?$e?t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Le,V,0,0,Pe.width,Pe.height,_e,Pe.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Le,V,Re,Pe.width,Pe.height,0,Pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):$e?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Le,V,0,0,Pe.width,Pe.height,_e,Ue,Pe.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Le,V,Re,Pe.width,Pe.height,0,_e,Ue,Pe.data)}}}else{st=C.mipmaps,$e&&dt&&(st.length>0&&gt++,t.texStorage2D(s.TEXTURE_CUBE_MAP,gt,Re,xe[0].width,xe[0].height));for(let Le=0;Le<6;Le++)if(rt){$e?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Le,0,0,0,xe[Le].width,xe[Le].height,_e,Ue,xe[Le].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Le,0,Re,xe[Le].width,xe[Le].height,0,_e,Ue,xe[Le].data);for(let V=0;V<st.length;V++){const Ne=st[V].image[Le].image;$e?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Le,V+1,0,0,Ne.width,Ne.height,_e,Ue,Ne.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Le,V+1,Re,Ne.width,Ne.height,0,_e,Ue,Ne.data)}}else{$e?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Le,0,0,0,_e,Ue,xe[Le]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Le,0,Re,_e,Ue,xe[Le]);for(let V=0;V<st.length;V++){const Pe=st[V];$e?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Le,V+1,0,0,_e,Ue,Pe.image[Le]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Le,V+1,Re,_e,Ue,Pe.image[Le])}}}w(C,H)&&A(s.TEXTURE_CUBE_MAP),we.__version=ye.version,C.onUpdate&&C.onUpdate(C)}L.__version=C.version}function Ae(L,C,se,Me,ye,we){const Ze=l.convert(se.format,se.colorSpace),Ie=l.convert(se.type),He=P(se.internalFormat,Ze,Ie,se.colorSpace);if(!r.get(C).__hasExternalTextures){const rt=Math.max(1,C.width>>we),xe=Math.max(1,C.height>>we);ye===s.TEXTURE_3D||ye===s.TEXTURE_2D_ARRAY?t.texImage3D(ye,we,He,rt,xe,C.depth,0,Ze,Ie,null):t.texImage2D(ye,we,He,rt,xe,0,Ze,Ie,null)}t.bindFramebuffer(s.FRAMEBUFFER,L),Ve(C)?f.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,Me,ye,r.get(se).__webglTexture,0,Qe(C)):(ye===s.TEXTURE_2D||ye>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&ye<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,Me,ye,r.get(se).__webglTexture,we),t.bindFramebuffer(s.FRAMEBUFFER,null)}function Fe(L,C,se){if(s.bindRenderbuffer(s.RENDERBUFFER,L),C.depthBuffer&&!C.stencilBuffer){let Me=c===!0?s.DEPTH_COMPONENT24:s.DEPTH_COMPONENT16;if(se||Ve(C)){const ye=C.depthTexture;ye&&ye.isDepthTexture&&(ye.type===Er?Me=s.DEPTH_COMPONENT32F:ye.type===Mr&&(Me=s.DEPTH_COMPONENT24));const we=Qe(C);Ve(C)?f.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,we,Me,C.width,C.height):s.renderbufferStorageMultisample(s.RENDERBUFFER,we,Me,C.width,C.height)}else s.renderbufferStorage(s.RENDERBUFFER,Me,C.width,C.height);s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.RENDERBUFFER,L)}else if(C.depthBuffer&&C.stencilBuffer){const Me=Qe(C);se&&Ve(C)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Me,s.DEPTH24_STENCIL8,C.width,C.height):Ve(C)?f.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Me,s.DEPTH24_STENCIL8,C.width,C.height):s.renderbufferStorage(s.RENDERBUFFER,s.DEPTH_STENCIL,C.width,C.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.RENDERBUFFER,L)}else{const Me=C.isWebGLMultipleRenderTargets===!0?C.texture:[C.texture];for(let ye=0;ye<Me.length;ye++){const we=Me[ye],Ze=l.convert(we.format,we.colorSpace),Ie=l.convert(we.type),He=P(we.internalFormat,Ze,Ie,we.colorSpace),qe=Qe(C);se&&Ve(C)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,qe,He,C.width,C.height):Ve(C)?f.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,qe,He,C.width,C.height):s.renderbufferStorage(s.RENDERBUFFER,He,C.width,C.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function ge(L,C){if(C&&C.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,L),!(C.depthTexture&&C.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!r.get(C.depthTexture).__webglTexture||C.depthTexture.image.width!==C.width||C.depthTexture.image.height!==C.height)&&(C.depthTexture.image.width=C.width,C.depthTexture.image.height=C.height,C.depthTexture.needsUpdate=!0),J(C.depthTexture,0);const Me=r.get(C.depthTexture).__webglTexture,ye=Qe(C);if(C.depthTexture.format===ns)Ve(C)?f.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,Me,0,ye):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,Me,0);else if(C.depthTexture.format===lo)Ve(C)?f.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,Me,0,ye):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,Me,0);else throw new Error("Unknown depthTexture format")}function be(L){const C=r.get(L),se=L.isWebGLCubeRenderTarget===!0;if(L.depthTexture&&!C.__autoAllocateDepthBuffer){if(se)throw new Error("target.depthTexture not supported in Cube render targets");ge(C.__webglFramebuffer,L)}else if(se){C.__webglDepthbuffer=[];for(let Me=0;Me<6;Me++)t.bindFramebuffer(s.FRAMEBUFFER,C.__webglFramebuffer[Me]),C.__webglDepthbuffer[Me]=s.createRenderbuffer(),Fe(C.__webglDepthbuffer[Me],L,!1)}else t.bindFramebuffer(s.FRAMEBUFFER,C.__webglFramebuffer),C.__webglDepthbuffer=s.createRenderbuffer(),Fe(C.__webglDepthbuffer,L,!1);t.bindFramebuffer(s.FRAMEBUFFER,null)}function ze(L,C,se){const Me=r.get(L);C!==void 0&&Ae(Me.__webglFramebuffer,L,L.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),se!==void 0&&be(L)}function ee(L){const C=L.texture,se=r.get(L),Me=r.get(C);L.addEventListener("dispose",ne),L.isWebGLMultipleRenderTargets!==!0&&(Me.__webglTexture===void 0&&(Me.__webglTexture=s.createTexture()),Me.__version=C.version,d.memory.textures++);const ye=L.isWebGLCubeRenderTarget===!0,we=L.isWebGLMultipleRenderTargets===!0,Ze=S(L)||c;if(ye){se.__webglFramebuffer=[];for(let Ie=0;Ie<6;Ie++)if(c&&C.mipmaps&&C.mipmaps.length>0){se.__webglFramebuffer[Ie]=[];for(let He=0;He<C.mipmaps.length;He++)se.__webglFramebuffer[Ie][He]=s.createFramebuffer()}else se.__webglFramebuffer[Ie]=s.createFramebuffer()}else{if(c&&C.mipmaps&&C.mipmaps.length>0){se.__webglFramebuffer=[];for(let Ie=0;Ie<C.mipmaps.length;Ie++)se.__webglFramebuffer[Ie]=s.createFramebuffer()}else se.__webglFramebuffer=s.createFramebuffer();if(we)if(o.drawBuffers){const Ie=L.texture;for(let He=0,qe=Ie.length;He<qe;He++){const rt=r.get(Ie[He]);rt.__webglTexture===void 0&&(rt.__webglTexture=s.createTexture(),d.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(c&&L.samples>0&&Ve(L)===!1){const Ie=we?C:[C];se.__webglMultisampledFramebuffer=s.createFramebuffer(),se.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,se.__webglMultisampledFramebuffer);for(let He=0;He<Ie.length;He++){const qe=Ie[He];se.__webglColorRenderbuffer[He]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,se.__webglColorRenderbuffer[He]);const rt=l.convert(qe.format,qe.colorSpace),xe=l.convert(qe.type),mt=P(qe.internalFormat,rt,xe,qe.colorSpace,L.isXRRenderTarget===!0),H=Qe(L);s.renderbufferStorageMultisample(s.RENDERBUFFER,H,mt,L.width,L.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+He,s.RENDERBUFFER,se.__webglColorRenderbuffer[He])}s.bindRenderbuffer(s.RENDERBUFFER,null),L.depthBuffer&&(se.__webglDepthRenderbuffer=s.createRenderbuffer(),Fe(se.__webglDepthRenderbuffer,L,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(ye){t.bindTexture(s.TEXTURE_CUBE_MAP,Me.__webglTexture),q(s.TEXTURE_CUBE_MAP,C,Ze);for(let Ie=0;Ie<6;Ie++)if(c&&C.mipmaps&&C.mipmaps.length>0)for(let He=0;He<C.mipmaps.length;He++)Ae(se.__webglFramebuffer[Ie][He],L,C,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Ie,He);else Ae(se.__webglFramebuffer[Ie],L,C,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Ie,0);w(C,Ze)&&A(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(we){const Ie=L.texture;for(let He=0,qe=Ie.length;He<qe;He++){const rt=Ie[He],xe=r.get(rt);t.bindTexture(s.TEXTURE_2D,xe.__webglTexture),q(s.TEXTURE_2D,rt,Ze),Ae(se.__webglFramebuffer,L,rt,s.COLOR_ATTACHMENT0+He,s.TEXTURE_2D,0),w(rt,Ze)&&A(s.TEXTURE_2D)}t.unbindTexture()}else{let Ie=s.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(c?Ie=L.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(Ie,Me.__webglTexture),q(Ie,C,Ze),c&&C.mipmaps&&C.mipmaps.length>0)for(let He=0;He<C.mipmaps.length;He++)Ae(se.__webglFramebuffer[He],L,C,s.COLOR_ATTACHMENT0,Ie,He);else Ae(se.__webglFramebuffer,L,C,s.COLOR_ATTACHMENT0,Ie,0);w(C,Ze)&&A(Ie),t.unbindTexture()}L.depthBuffer&&be(L)}function nt(L){const C=S(L)||c,se=L.isWebGLMultipleRenderTargets===!0?L.texture:[L.texture];for(let Me=0,ye=se.length;Me<ye;Me++){const we=se[Me];if(w(we,C)){const Ze=L.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:s.TEXTURE_2D,Ie=r.get(we).__webglTexture;t.bindTexture(Ze,Ie),A(Ze),t.unbindTexture()}}}function ke(L){if(c&&L.samples>0&&Ve(L)===!1){const C=L.isWebGLMultipleRenderTargets?L.texture:[L.texture],se=L.width,Me=L.height;let ye=s.COLOR_BUFFER_BIT;const we=[],Ze=L.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Ie=r.get(L),He=L.isWebGLMultipleRenderTargets===!0;if(He)for(let qe=0;qe<C.length;qe++)t.bindFramebuffer(s.FRAMEBUFFER,Ie.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+qe,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,Ie.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+qe,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,Ie.__webglMultisampledFramebuffer),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ie.__webglFramebuffer);for(let qe=0;qe<C.length;qe++){we.push(s.COLOR_ATTACHMENT0+qe),L.depthBuffer&&we.push(Ze);const rt=Ie.__ignoreDepthValues!==void 0?Ie.__ignoreDepthValues:!1;if(rt===!1&&(L.depthBuffer&&(ye|=s.DEPTH_BUFFER_BIT),L.stencilBuffer&&(ye|=s.STENCIL_BUFFER_BIT)),He&&s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Ie.__webglColorRenderbuffer[qe]),rt===!0&&(s.invalidateFramebuffer(s.READ_FRAMEBUFFER,[Ze]),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[Ze])),He){const xe=r.get(C[qe]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,xe,0)}s.blitFramebuffer(0,0,se,Me,0,0,se,Me,ye,s.NEAREST),h&&s.invalidateFramebuffer(s.READ_FRAMEBUFFER,we)}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),He)for(let qe=0;qe<C.length;qe++){t.bindFramebuffer(s.FRAMEBUFFER,Ie.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+qe,s.RENDERBUFFER,Ie.__webglColorRenderbuffer[qe]);const rt=r.get(C[qe]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,Ie.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+qe,s.TEXTURE_2D,rt,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ie.__webglMultisampledFramebuffer)}}function Qe(L){return Math.min(o.maxSamples,L.samples)}function Ve(L){const C=r.get(L);return c&&L.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&C.__useRenderToTexture!==!1}function wt(L){const C=d.render.frame;p.get(L)!==C&&(p.set(L,C),L.update())}function ot(L,C){const se=L.colorSpace,Me=L.format,ye=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||L.format===Qd||se!==ji&&se!==ri&&(Lt.getTransfer(se)===Ot?c===!1?e.has("EXT_sRGB")===!0&&Me===mi?(L.format=Qd,L.minFilter=ni,L.generateMipmaps=!1):C=Fv.sRGBToLinear(C):(Me!==mi||ye!==Cr)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",se)),C}this.allocateTextureUnit=F,this.resetTextureUnits=me,this.setTexture2D=J,this.setTexture2DArray=K,this.setTexture3D=X,this.setTextureCube=Z,this.rebindTextures=ze,this.setupRenderTarget=ee,this.updateRenderTargetMipmap=nt,this.updateMultisampleRenderTarget=ke,this.setupDepthRenderbuffer=be,this.setupFrameBufferTexture=Ae,this.useMultisampledRTT=Ve}function OT(s,e,t){const r=t.isWebGL2;function o(l,d=ri){let c;const f=Lt.getTransfer(d);if(l===Cr)return s.UNSIGNED_BYTE;if(l===bv)return s.UNSIGNED_SHORT_4_4_4_4;if(l===Cv)return s.UNSIGNED_SHORT_5_5_5_1;if(l===sS)return s.BYTE;if(l===oS)return s.SHORT;if(l===hf)return s.UNSIGNED_SHORT;if(l===Av)return s.INT;if(l===Mr)return s.UNSIGNED_INT;if(l===Er)return s.FLOAT;if(l===aa)return r?s.HALF_FLOAT:(c=e.get("OES_texture_half_float"),c!==null?c.HALF_FLOAT_OES:null);if(l===aS)return s.ALPHA;if(l===mi)return s.RGBA;if(l===lS)return s.LUMINANCE;if(l===cS)return s.LUMINANCE_ALPHA;if(l===ns)return s.DEPTH_COMPONENT;if(l===lo)return s.DEPTH_STENCIL;if(l===Qd)return c=e.get("EXT_sRGB"),c!==null?c.SRGB_ALPHA_EXT:null;if(l===uS)return s.RED;if(l===Rv)return s.RED_INTEGER;if(l===dS)return s.RG;if(l===Pv)return s.RG_INTEGER;if(l===Lv)return s.RGBA_INTEGER;if(l===ad||l===ld||l===cd||l===ud)if(f===Ot)if(c=e.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(l===ad)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(l===ld)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(l===cd)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(l===ud)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=e.get("WEBGL_compressed_texture_s3tc"),c!==null){if(l===ad)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(l===ld)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(l===cd)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(l===ud)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(l===Sm||l===Mm||l===Em||l===wm)if(c=e.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(l===Sm)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(l===Mm)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(l===Em)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(l===wm)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(l===Nv)return c=e.get("WEBGL_compressed_texture_etc1"),c!==null?c.COMPRESSED_RGB_ETC1_WEBGL:null;if(l===Tm||l===Am)if(c=e.get("WEBGL_compressed_texture_etc"),c!==null){if(l===Tm)return f===Ot?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(l===Am)return f===Ot?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(l===bm||l===Cm||l===Rm||l===Pm||l===Lm||l===Nm||l===Dm||l===Um||l===Im||l===Om||l===Fm||l===km||l===zm||l===Bm)if(c=e.get("WEBGL_compressed_texture_astc"),c!==null){if(l===bm)return f===Ot?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(l===Cm)return f===Ot?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(l===Rm)return f===Ot?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(l===Pm)return f===Ot?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(l===Lm)return f===Ot?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(l===Nm)return f===Ot?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(l===Dm)return f===Ot?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(l===Um)return f===Ot?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(l===Im)return f===Ot?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(l===Om)return f===Ot?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(l===Fm)return f===Ot?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(l===km)return f===Ot?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(l===zm)return f===Ot?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(l===Bm)return f===Ot?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(l===dd||l===Hm||l===Vm)if(c=e.get("EXT_texture_compression_bptc"),c!==null){if(l===dd)return f===Ot?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(l===Hm)return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(l===Vm)return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(l===fS||l===Gm||l===Wm||l===jm)if(c=e.get("EXT_texture_compression_rgtc"),c!==null){if(l===dd)return c.COMPRESSED_RED_RGTC1_EXT;if(l===Gm)return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(l===Wm)return c.COMPRESSED_RED_GREEN_RGTC2_EXT;if(l===jm)return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return l===ts?r?s.UNSIGNED_INT_24_8:(c=e.get("WEBGL_depth_texture"),c!==null?c.UNSIGNED_INT_24_8_WEBGL:null):s[l]!==void 0?s[l]:null}return{convert:o}}class FT extends Xn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class wr extends rn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const kT={type:"move"};class Ud{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new wr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new wr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new z),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new wr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new z),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const r of e.hand.values())this._getHandJoint(t,r)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,r){let o=null,l=null,d=null;const c=this._targetRay,f=this._grip,h=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(h&&e.hand){d=!0;for(const E of e.hand.values()){const S=t.getJointPose(E,r),v=this._getHandJoint(h,E);S!==null&&(v.matrix.fromArray(S.transform.matrix),v.matrix.decompose(v.position,v.rotation,v.scale),v.matrixWorldNeedsUpdate=!0,v.jointRadius=S.radius),v.visible=S!==null}const p=h.joints["index-finger-tip"],g=h.joints["thumb-tip"],y=p.position.distanceTo(g.position),x=.02,M=.005;h.inputState.pinching&&y>x+M?(h.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!h.inputState.pinching&&y<=x-M&&(h.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else f!==null&&e.gripSpace&&(l=t.getPose(e.gripSpace,r),l!==null&&(f.matrix.fromArray(l.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,l.linearVelocity?(f.hasLinearVelocity=!0,f.linearVelocity.copy(l.linearVelocity)):f.hasLinearVelocity=!1,l.angularVelocity?(f.hasAngularVelocity=!0,f.angularVelocity.copy(l.angularVelocity)):f.hasAngularVelocity=!1));c!==null&&(o=t.getPose(e.targetRaySpace,r),o===null&&l!==null&&(o=l),o!==null&&(c.matrix.fromArray(o.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,o.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(o.linearVelocity)):c.hasLinearVelocity=!1,o.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(o.angularVelocity)):c.hasAngularVelocity=!1,this.dispatchEvent(kT)))}return c!==null&&(c.visible=o!==null),f!==null&&(f.visible=l!==null),h!==null&&(h.visible=d!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const r=new wr;r.matrixAutoUpdate=!1,r.visible=!1,e.joints[t.jointName]=r,e.add(r)}return e.joints[t.jointName]}}class zT extends as{constructor(e,t){super();const r=this;let o=null,l=1,d=null,c="local-floor",f=1,h=null,p=null,g=null,y=null,x=null,M=null;const E=t.getContextAttributes();let S=null,v=null;const w=[],A=[],P=new Be;let B=null;const U=new Xn;U.layers.enable(1),U.viewport=new Bt;const I=new Xn;I.layers.enable(2),I.viewport=new Bt;const ne=[U,I],R=new FT;R.layers.enable(1),R.layers.enable(2);let D=null,re=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let fe=w[q];return fe===void 0&&(fe=new Ud,w[q]=fe),fe.getTargetRaySpace()},this.getControllerGrip=function(q){let fe=w[q];return fe===void 0&&(fe=new Ud,w[q]=fe),fe.getGripSpace()},this.getHand=function(q){let fe=w[q];return fe===void 0&&(fe=new Ud,w[q]=fe),fe.getHandSpace()};function ae(q){const fe=A.indexOf(q.inputSource);if(fe===-1)return;const ve=w[fe];ve!==void 0&&(ve.update(q.inputSource,q.frame,h||d),ve.dispatchEvent({type:q.type,data:q.inputSource}))}function me(){o.removeEventListener("select",ae),o.removeEventListener("selectstart",ae),o.removeEventListener("selectend",ae),o.removeEventListener("squeeze",ae),o.removeEventListener("squeezestart",ae),o.removeEventListener("squeezeend",ae),o.removeEventListener("end",me),o.removeEventListener("inputsourceschange",F);for(let q=0;q<w.length;q++){const fe=A[q];fe!==null&&(A[q]=null,w[q].disconnect(fe))}D=null,re=null,e.setRenderTarget(S),x=null,y=null,g=null,o=null,v=null,W.stop(),r.isPresenting=!1,e.setPixelRatio(B),e.setSize(P.width,P.height,!1),r.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){l=q,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){c=q,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return h||d},this.setReferenceSpace=function(q){h=q},this.getBaseLayer=function(){return y!==null?y:x},this.getBinding=function(){return g},this.getFrame=function(){return M},this.getSession=function(){return o},this.setSession=async function(q){if(o=q,o!==null){if(S=e.getRenderTarget(),o.addEventListener("select",ae),o.addEventListener("selectstart",ae),o.addEventListener("selectend",ae),o.addEventListener("squeeze",ae),o.addEventListener("squeezestart",ae),o.addEventListener("squeezeend",ae),o.addEventListener("end",me),o.addEventListener("inputsourceschange",F),E.xrCompatible!==!0&&await t.makeXRCompatible(),B=e.getPixelRatio(),e.getSize(P),o.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const fe={antialias:o.renderState.layers===void 0?E.antialias:!0,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:l};x=new XRWebGLLayer(o,t,fe),o.updateRenderState({baseLayer:x}),e.setPixelRatio(1),e.setSize(x.framebufferWidth,x.framebufferHeight,!1),v=new ss(x.framebufferWidth,x.framebufferHeight,{format:mi,type:Cr,colorSpace:e.outputColorSpace,stencilBuffer:E.stencil})}else{let fe=null,ve=null,Te=null;E.depth&&(Te=E.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,fe=E.stencil?lo:ns,ve=E.stencil?ts:Mr);const Ae={colorFormat:t.RGBA8,depthFormat:Te,scaleFactor:l};g=new XRWebGLBinding(o,t),y=g.createProjectionLayer(Ae),o.updateRenderState({layers:[y]}),e.setPixelRatio(1),e.setSize(y.textureWidth,y.textureHeight,!1),v=new ss(y.textureWidth,y.textureHeight,{format:mi,type:Cr,depthTexture:new qv(y.textureWidth,y.textureHeight,ve,void 0,void 0,void 0,void 0,void 0,void 0,fe),stencilBuffer:E.stencil,colorSpace:e.outputColorSpace,samples:E.antialias?4:0});const Fe=e.properties.get(v);Fe.__ignoreDepthValues=y.ignoreDepthValues}v.isXRRenderTarget=!0,this.setFoveation(f),h=null,d=await o.requestReferenceSpace(c),W.setContext(o),W.start(),r.isPresenting=!0,r.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(o!==null)return o.environmentBlendMode};function F(q){for(let fe=0;fe<q.removed.length;fe++){const ve=q.removed[fe],Te=A.indexOf(ve);Te>=0&&(A[Te]=null,w[Te].disconnect(ve))}for(let fe=0;fe<q.added.length;fe++){const ve=q.added[fe];let Te=A.indexOf(ve);if(Te===-1){for(let Fe=0;Fe<w.length;Fe++)if(Fe>=A.length){A.push(ve),Te=Fe;break}else if(A[Fe]===null){A[Fe]=ve,Te=Fe;break}if(Te===-1)break}const Ae=w[Te];Ae&&Ae.connect(ve)}}const $=new z,J=new z;function K(q,fe,ve){$.setFromMatrixPosition(fe.matrixWorld),J.setFromMatrixPosition(ve.matrixWorld);const Te=$.distanceTo(J),Ae=fe.projectionMatrix.elements,Fe=ve.projectionMatrix.elements,ge=Ae[14]/(Ae[10]-1),be=Ae[14]/(Ae[10]+1),ze=(Ae[9]+1)/Ae[5],ee=(Ae[9]-1)/Ae[5],nt=(Ae[8]-1)/Ae[0],ke=(Fe[8]+1)/Fe[0],Qe=ge*nt,Ve=ge*ke,wt=Te/(-nt+ke),ot=wt*-nt;fe.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(ot),q.translateZ(wt),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert();const L=ge+wt,C=be+wt,se=Qe-ot,Me=Ve+(Te-ot),ye=ze*be/C*L,we=ee*be/C*L;q.projectionMatrix.makePerspective(se,Me,ye,we,L,C),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}function X(q,fe){fe===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(fe.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(o===null)return;R.near=I.near=U.near=q.near,R.far=I.far=U.far=q.far,(D!==R.near||re!==R.far)&&(o.updateRenderState({depthNear:R.near,depthFar:R.far}),D=R.near,re=R.far);const fe=q.parent,ve=R.cameras;X(R,fe);for(let Te=0;Te<ve.length;Te++)X(ve[Te],fe);ve.length===2?K(R,U,I):R.projectionMatrix.copy(U.projectionMatrix),Z(q,R,fe)};function Z(q,fe,ve){ve===null?q.matrix.copy(fe.matrixWorld):(q.matrix.copy(ve.matrixWorld),q.matrix.invert(),q.matrix.multiply(fe.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(fe.projectionMatrix),q.projectionMatrixInverse.copy(fe.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=la*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return R},this.getFoveation=function(){if(!(y===null&&x===null))return f},this.setFoveation=function(q){f=q,y!==null&&(y.fixedFoveation=q),x!==null&&x.fixedFoveation!==void 0&&(x.fixedFoveation=q)};let Y=null;function O(q,fe){if(p=fe.getViewerPose(h||d),M=fe,p!==null){const ve=p.views;x!==null&&(e.setRenderTargetFramebuffer(v,x.framebuffer),e.setRenderTarget(v));let Te=!1;ve.length!==R.cameras.length&&(R.cameras.length=0,Te=!0);for(let Ae=0;Ae<ve.length;Ae++){const Fe=ve[Ae];let ge=null;if(x!==null)ge=x.getViewport(Fe);else{const ze=g.getViewSubImage(y,Fe);ge=ze.viewport,Ae===0&&(e.setRenderTargetTextures(v,ze.colorTexture,y.ignoreDepthValues?void 0:ze.depthStencilTexture),e.setRenderTarget(v))}let be=ne[Ae];be===void 0&&(be=new Xn,be.layers.enable(Ae),be.viewport=new Bt,ne[Ae]=be),be.matrix.fromArray(Fe.transform.matrix),be.matrix.decompose(be.position,be.quaternion,be.scale),be.projectionMatrix.fromArray(Fe.projectionMatrix),be.projectionMatrixInverse.copy(be.projectionMatrix).invert(),be.viewport.set(ge.x,ge.y,ge.width,ge.height),Ae===0&&(R.matrix.copy(be.matrix),R.matrix.decompose(R.position,R.quaternion,R.scale)),Te===!0&&R.cameras.push(be)}}for(let ve=0;ve<w.length;ve++){const Te=A[ve],Ae=w[ve];Te!==null&&Ae!==void 0&&Ae.update(Te,fe,h||d)}Y&&Y(q,fe),fe.detectedPlanes&&r.dispatchEvent({type:"planesdetected",data:fe}),M=null}const W=new $v;W.setAnimationLoop(O),this.setAnimationLoop=function(q){Y=q},this.dispose=function(){}}}function BT(s,e){function t(S,v){S.matrixAutoUpdate===!0&&S.updateMatrix(),v.value.copy(S.matrix)}function r(S,v){v.color.getRGB(S.fogColor.value,Wv(s)),v.isFog?(S.fogNear.value=v.near,S.fogFar.value=v.far):v.isFogExp2&&(S.fogDensity.value=v.density)}function o(S,v,w,A,P){v.isMeshBasicMaterial||v.isMeshLambertMaterial?l(S,v):v.isMeshToonMaterial?(l(S,v),g(S,v)):v.isMeshPhongMaterial?(l(S,v),p(S,v)):v.isMeshStandardMaterial?(l(S,v),y(S,v),v.isMeshPhysicalMaterial&&x(S,v,P)):v.isMeshMatcapMaterial?(l(S,v),M(S,v)):v.isMeshDepthMaterial?l(S,v):v.isMeshDistanceMaterial?(l(S,v),E(S,v)):v.isMeshNormalMaterial?l(S,v):v.isLineBasicMaterial?(d(S,v),v.isLineDashedMaterial&&c(S,v)):v.isPointsMaterial?f(S,v,w,A):v.isSpriteMaterial?h(S,v):v.isShadowMaterial?(S.color.value.copy(v.color),S.opacity.value=v.opacity):v.isShaderMaterial&&(v.uniformsNeedUpdate=!1)}function l(S,v){S.opacity.value=v.opacity,v.color&&S.diffuse.value.copy(v.color),v.emissive&&S.emissive.value.copy(v.emissive).multiplyScalar(v.emissiveIntensity),v.map&&(S.map.value=v.map,t(v.map,S.mapTransform)),v.alphaMap&&(S.alphaMap.value=v.alphaMap,t(v.alphaMap,S.alphaMapTransform)),v.bumpMap&&(S.bumpMap.value=v.bumpMap,t(v.bumpMap,S.bumpMapTransform),S.bumpScale.value=v.bumpScale,v.side===Rn&&(S.bumpScale.value*=-1)),v.normalMap&&(S.normalMap.value=v.normalMap,t(v.normalMap,S.normalMapTransform),S.normalScale.value.copy(v.normalScale),v.side===Rn&&S.normalScale.value.negate()),v.displacementMap&&(S.displacementMap.value=v.displacementMap,t(v.displacementMap,S.displacementMapTransform),S.displacementScale.value=v.displacementScale,S.displacementBias.value=v.displacementBias),v.emissiveMap&&(S.emissiveMap.value=v.emissiveMap,t(v.emissiveMap,S.emissiveMapTransform)),v.specularMap&&(S.specularMap.value=v.specularMap,t(v.specularMap,S.specularMapTransform)),v.alphaTest>0&&(S.alphaTest.value=v.alphaTest);const w=e.get(v).envMap;if(w&&(S.envMap.value=w,S.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,S.reflectivity.value=v.reflectivity,S.ior.value=v.ior,S.refractionRatio.value=v.refractionRatio),v.lightMap){S.lightMap.value=v.lightMap;const A=s._useLegacyLights===!0?Math.PI:1;S.lightMapIntensity.value=v.lightMapIntensity*A,t(v.lightMap,S.lightMapTransform)}v.aoMap&&(S.aoMap.value=v.aoMap,S.aoMapIntensity.value=v.aoMapIntensity,t(v.aoMap,S.aoMapTransform))}function d(S,v){S.diffuse.value.copy(v.color),S.opacity.value=v.opacity,v.map&&(S.map.value=v.map,t(v.map,S.mapTransform))}function c(S,v){S.dashSize.value=v.dashSize,S.totalSize.value=v.dashSize+v.gapSize,S.scale.value=v.scale}function f(S,v,w,A){S.diffuse.value.copy(v.color),S.opacity.value=v.opacity,S.size.value=v.size*w,S.scale.value=A*.5,v.map&&(S.map.value=v.map,t(v.map,S.uvTransform)),v.alphaMap&&(S.alphaMap.value=v.alphaMap,t(v.alphaMap,S.alphaMapTransform)),v.alphaTest>0&&(S.alphaTest.value=v.alphaTest)}function h(S,v){S.diffuse.value.copy(v.color),S.opacity.value=v.opacity,S.rotation.value=v.rotation,v.map&&(S.map.value=v.map,t(v.map,S.mapTransform)),v.alphaMap&&(S.alphaMap.value=v.alphaMap,t(v.alphaMap,S.alphaMapTransform)),v.alphaTest>0&&(S.alphaTest.value=v.alphaTest)}function p(S,v){S.specular.value.copy(v.specular),S.shininess.value=Math.max(v.shininess,1e-4)}function g(S,v){v.gradientMap&&(S.gradientMap.value=v.gradientMap)}function y(S,v){S.metalness.value=v.metalness,v.metalnessMap&&(S.metalnessMap.value=v.metalnessMap,t(v.metalnessMap,S.metalnessMapTransform)),S.roughness.value=v.roughness,v.roughnessMap&&(S.roughnessMap.value=v.roughnessMap,t(v.roughnessMap,S.roughnessMapTransform)),e.get(v).envMap&&(S.envMapIntensity.value=v.envMapIntensity)}function x(S,v,w){S.ior.value=v.ior,v.sheen>0&&(S.sheenColor.value.copy(v.sheenColor).multiplyScalar(v.sheen),S.sheenRoughness.value=v.sheenRoughness,v.sheenColorMap&&(S.sheenColorMap.value=v.sheenColorMap,t(v.sheenColorMap,S.sheenColorMapTransform)),v.sheenRoughnessMap&&(S.sheenRoughnessMap.value=v.sheenRoughnessMap,t(v.sheenRoughnessMap,S.sheenRoughnessMapTransform))),v.clearcoat>0&&(S.clearcoat.value=v.clearcoat,S.clearcoatRoughness.value=v.clearcoatRoughness,v.clearcoatMap&&(S.clearcoatMap.value=v.clearcoatMap,t(v.clearcoatMap,S.clearcoatMapTransform)),v.clearcoatRoughnessMap&&(S.clearcoatRoughnessMap.value=v.clearcoatRoughnessMap,t(v.clearcoatRoughnessMap,S.clearcoatRoughnessMapTransform)),v.clearcoatNormalMap&&(S.clearcoatNormalMap.value=v.clearcoatNormalMap,t(v.clearcoatNormalMap,S.clearcoatNormalMapTransform),S.clearcoatNormalScale.value.copy(v.clearcoatNormalScale),v.side===Rn&&S.clearcoatNormalScale.value.negate())),v.iridescence>0&&(S.iridescence.value=v.iridescence,S.iridescenceIOR.value=v.iridescenceIOR,S.iridescenceThicknessMinimum.value=v.iridescenceThicknessRange[0],S.iridescenceThicknessMaximum.value=v.iridescenceThicknessRange[1],v.iridescenceMap&&(S.iridescenceMap.value=v.iridescenceMap,t(v.iridescenceMap,S.iridescenceMapTransform)),v.iridescenceThicknessMap&&(S.iridescenceThicknessMap.value=v.iridescenceThicknessMap,t(v.iridescenceThicknessMap,S.iridescenceThicknessMapTransform))),v.transmission>0&&(S.transmission.value=v.transmission,S.transmissionSamplerMap.value=w.texture,S.transmissionSamplerSize.value.set(w.width,w.height),v.transmissionMap&&(S.transmissionMap.value=v.transmissionMap,t(v.transmissionMap,S.transmissionMapTransform)),S.thickness.value=v.thickness,v.thicknessMap&&(S.thicknessMap.value=v.thicknessMap,t(v.thicknessMap,S.thicknessMapTransform)),S.attenuationDistance.value=v.attenuationDistance,S.attenuationColor.value.copy(v.attenuationColor)),v.anisotropy>0&&(S.anisotropyVector.value.set(v.anisotropy*Math.cos(v.anisotropyRotation),v.anisotropy*Math.sin(v.anisotropyRotation)),v.anisotropyMap&&(S.anisotropyMap.value=v.anisotropyMap,t(v.anisotropyMap,S.anisotropyMapTransform))),S.specularIntensity.value=v.specularIntensity,S.specularColor.value.copy(v.specularColor),v.specularColorMap&&(S.specularColorMap.value=v.specularColorMap,t(v.specularColorMap,S.specularColorMapTransform)),v.specularIntensityMap&&(S.specularIntensityMap.value=v.specularIntensityMap,t(v.specularIntensityMap,S.specularIntensityMapTransform))}function M(S,v){v.matcap&&(S.matcap.value=v.matcap)}function E(S,v){const w=e.get(v).light;S.referencePosition.value.setFromMatrixPosition(w.matrixWorld),S.nearDistance.value=w.shadow.camera.near,S.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:o}}function HT(s,e,t,r){let o={},l={},d=[];const c=t.isWebGL2?s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS):0;function f(w,A){const P=A.program;r.uniformBlockBinding(w,P)}function h(w,A){let P=o[w.id];P===void 0&&(M(w),P=p(w),o[w.id]=P,w.addEventListener("dispose",S));const B=A.program;r.updateUBOMapping(w,B);const U=e.render.frame;l[w.id]!==U&&(y(w),l[w.id]=U)}function p(w){const A=g();w.__bindingPointIndex=A;const P=s.createBuffer(),B=w.__size,U=w.usage;return s.bindBuffer(s.UNIFORM_BUFFER,P),s.bufferData(s.UNIFORM_BUFFER,B,U),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,A,P),P}function g(){for(let w=0;w<c;w++)if(d.indexOf(w)===-1)return d.push(w),w;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function y(w){const A=o[w.id],P=w.uniforms,B=w.__cache;s.bindBuffer(s.UNIFORM_BUFFER,A);for(let U=0,I=P.length;U<I;U++){const ne=Array.isArray(P[U])?P[U]:[P[U]];for(let R=0,D=ne.length;R<D;R++){const re=ne[R];if(x(re,U,R,B)===!0){const ae=re.__offset,me=Array.isArray(re.value)?re.value:[re.value];let F=0;for(let $=0;$<me.length;$++){const J=me[$],K=E(J);typeof J=="number"||typeof J=="boolean"?(re.__data[0]=J,s.bufferSubData(s.UNIFORM_BUFFER,ae+F,re.__data)):J.isMatrix3?(re.__data[0]=J.elements[0],re.__data[1]=J.elements[1],re.__data[2]=J.elements[2],re.__data[3]=0,re.__data[4]=J.elements[3],re.__data[5]=J.elements[4],re.__data[6]=J.elements[5],re.__data[7]=0,re.__data[8]=J.elements[6],re.__data[9]=J.elements[7],re.__data[10]=J.elements[8],re.__data[11]=0):(J.toArray(re.__data,F),F+=K.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,ae,re.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function x(w,A,P,B){const U=w.value,I=A+"_"+P;if(B[I]===void 0)return typeof U=="number"||typeof U=="boolean"?B[I]=U:B[I]=U.clone(),!0;{const ne=B[I];if(typeof U=="number"||typeof U=="boolean"){if(ne!==U)return B[I]=U,!0}else if(ne.equals(U)===!1)return ne.copy(U),!0}return!1}function M(w){const A=w.uniforms;let P=0;const B=16;for(let I=0,ne=A.length;I<ne;I++){const R=Array.isArray(A[I])?A[I]:[A[I]];for(let D=0,re=R.length;D<re;D++){const ae=R[D],me=Array.isArray(ae.value)?ae.value:[ae.value];for(let F=0,$=me.length;F<$;F++){const J=me[F],K=E(J),X=P%B;X!==0&&B-X<K.boundary&&(P+=B-X),ae.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),ae.__offset=P,P+=K.storage}}}const U=P%B;return U>0&&(P+=B-U),w.__size=P,w.__cache={},this}function E(w){const A={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(A.boundary=4,A.storage=4):w.isVector2?(A.boundary=8,A.storage=8):w.isVector3||w.isColor?(A.boundary=16,A.storage=12):w.isVector4?(A.boundary=16,A.storage=16):w.isMatrix3?(A.boundary=48,A.storage=48):w.isMatrix4?(A.boundary=64,A.storage=64):w.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",w),A}function S(w){const A=w.target;A.removeEventListener("dispose",S);const P=d.indexOf(A.__bindingPointIndex);d.splice(P,1),s.deleteBuffer(o[A.id]),delete o[A.id],delete l[A.id]}function v(){for(const w in o)s.deleteBuffer(o[w]);d=[],o={},l={}}return{bind:f,update:h,dispose:v}}class t0{constructor(e={}){const{canvas:t=FS(),context:r=null,depth:o=!0,stencil:l=!0,alpha:d=!1,antialias:c=!1,premultipliedAlpha:f=!0,preserveDrawingBuffer:h=!1,powerPreference:p="default",failIfMajorPerformanceCaveat:g=!1}=e;this.isWebGLRenderer=!0;let y;r!==null?y=r.getContextAttributes().alpha:y=d;const x=new Uint32Array(4),M=new Int32Array(4);let E=null,S=null;const v=[],w=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=dn,this._useLegacyLights=!1,this.toneMapping=br,this.toneMappingExposure=1;const A=this;let P=!1,B=0,U=0,I=null,ne=-1,R=null;const D=new Bt,re=new Bt;let ae=null;const me=new Et(0);let F=0,$=t.width,J=t.height,K=1,X=null,Z=null;const Y=new Bt(0,0,$,J),O=new Bt(0,0,$,J);let W=!1;const q=new vf;let fe=!1,ve=!1,Te=null;const Ae=new Ht,Fe=new Be,ge=new z,be={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function ze(){return I===null?K:1}let ee=r;function nt(N,te){for(let de=0;de<N.length;de++){const he=N[de],ce=t.getContext(he,te);if(ce!==null)return ce}return null}try{const N={alpha:!0,depth:o,stencil:l,antialias:c,premultipliedAlpha:f,preserveDrawingBuffer:h,powerPreference:p,failIfMajorPerformanceCaveat:g};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ff}`),t.addEventListener("webglcontextlost",Le,!1),t.addEventListener("webglcontextrestored",V,!1),t.addEventListener("webglcontextcreationerror",Pe,!1),ee===null){const te=["webgl2","webgl","experimental-webgl"];if(A.isWebGL1Renderer===!0&&te.shift(),ee=nt(te,N),ee===null)throw nt(te)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&ee instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),ee.getShaderPrecisionFormat===void 0&&(ee.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(N){throw console.error("THREE.WebGLRenderer: "+N.message),N}let ke,Qe,Ve,wt,ot,L,C,se,Me,ye,we,Ze,Ie,He,qe,rt,xe,mt,H,_e,Ue,Re,$e,dt;function gt(){ke=new Z1(ee),Qe=new j1(ee,ke,e),ke.init(Qe),Re=new OT(ee,ke,Qe),Ve=new UT(ee,ke,Qe),wt=new ew(ee),ot=new yT,L=new IT(ee,ke,Ve,ot,Qe,Re,wt),C=new $1(A),se=new K1(A),Me=new lM(ee,Qe),$e=new G1(ee,ke,Me,Qe),ye=new J1(ee,Me,wt,$e),we=new rw(ee,ye,Me,wt),H=new iw(ee,Qe,L),rt=new X1(ot),Ze=new _T(A,C,se,ke,Qe,$e,rt),Ie=new BT(A,ot),He=new MT,qe=new CT(ke,Qe),mt=new V1(A,C,se,Ve,we,y,f),xe=new DT(A,we,Qe),dt=new HT(ee,wt,Qe,Ve),_e=new W1(ee,ke,wt,Qe),Ue=new Q1(ee,ke,wt,Qe),wt.programs=Ze.programs,A.capabilities=Qe,A.extensions=ke,A.properties=ot,A.renderLists=He,A.shadowMap=xe,A.state=Ve,A.info=wt}gt();const st=new zT(A,ee);this.xr=st,this.getContext=function(){return ee},this.getContextAttributes=function(){return ee.getContextAttributes()},this.forceContextLoss=function(){const N=ke.get("WEBGL_lose_context");N&&N.loseContext()},this.forceContextRestore=function(){const N=ke.get("WEBGL_lose_context");N&&N.restoreContext()},this.getPixelRatio=function(){return K},this.setPixelRatio=function(N){N!==void 0&&(K=N,this.setSize($,J,!1))},this.getSize=function(N){return N.set($,J)},this.setSize=function(N,te,de=!0){if(st.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}$=N,J=te,t.width=Math.floor(N*K),t.height=Math.floor(te*K),de===!0&&(t.style.width=N+"px",t.style.height=te+"px"),this.setViewport(0,0,N,te)},this.getDrawingBufferSize=function(N){return N.set($*K,J*K).floor()},this.setDrawingBufferSize=function(N,te,de){$=N,J=te,K=de,t.width=Math.floor(N*de),t.height=Math.floor(te*de),this.setViewport(0,0,N,te)},this.getCurrentViewport=function(N){return N.copy(D)},this.getViewport=function(N){return N.copy(Y)},this.setViewport=function(N,te,de,he){N.isVector4?Y.set(N.x,N.y,N.z,N.w):Y.set(N,te,de,he),Ve.viewport(D.copy(Y).multiplyScalar(K).floor())},this.getScissor=function(N){return N.copy(O)},this.setScissor=function(N,te,de,he){N.isVector4?O.set(N.x,N.y,N.z,N.w):O.set(N,te,de,he),Ve.scissor(re.copy(O).multiplyScalar(K).floor())},this.getScissorTest=function(){return W},this.setScissorTest=function(N){Ve.setScissorTest(W=N)},this.setOpaqueSort=function(N){X=N},this.setTransparentSort=function(N){Z=N},this.getClearColor=function(N){return N.copy(mt.getClearColor())},this.setClearColor=function(){mt.setClearColor.apply(mt,arguments)},this.getClearAlpha=function(){return mt.getClearAlpha()},this.setClearAlpha=function(){mt.setClearAlpha.apply(mt,arguments)},this.clear=function(N=!0,te=!0,de=!0){let he=0;if(N){let ce=!1;if(I!==null){const Ge=I.texture.format;ce=Ge===Lv||Ge===Pv||Ge===Rv}if(ce){const Ge=I.texture.type,it=Ge===Cr||Ge===Mr||Ge===hf||Ge===ts||Ge===bv||Ge===Cv,ct=mt.getClearColor(),Xe=mt.getClearAlpha(),vt=ct.r,ft=ct.g,pt=ct.b;it?(x[0]=vt,x[1]=ft,x[2]=pt,x[3]=Xe,ee.clearBufferuiv(ee.COLOR,0,x)):(M[0]=vt,M[1]=ft,M[2]=pt,M[3]=Xe,ee.clearBufferiv(ee.COLOR,0,M))}else he|=ee.COLOR_BUFFER_BIT}te&&(he|=ee.DEPTH_BUFFER_BIT),de&&(he|=ee.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),ee.clear(he)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Le,!1),t.removeEventListener("webglcontextrestored",V,!1),t.removeEventListener("webglcontextcreationerror",Pe,!1),He.dispose(),qe.dispose(),ot.dispose(),C.dispose(),se.dispose(),we.dispose(),$e.dispose(),dt.dispose(),Ze.dispose(),st.dispose(),st.removeEventListener("sessionstart",Tt),st.removeEventListener("sessionend",yt),Te&&(Te.dispose(),Te=null),$t.stop()};function Le(N){N.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),P=!0}function V(){console.log("THREE.WebGLRenderer: Context Restored."),P=!1;const N=wt.autoReset,te=xe.enabled,de=xe.autoUpdate,he=xe.needsUpdate,ce=xe.type;gt(),wt.autoReset=N,xe.enabled=te,xe.autoUpdate=de,xe.needsUpdate=he,xe.type=ce}function Pe(N){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",N.statusMessage)}function Ne(N){const te=N.target;te.removeEventListener("dispose",Ne),oe(te)}function oe(N){pe(N),ot.remove(N)}function pe(N){const te=ot.get(N).programs;te!==void 0&&(te.forEach(function(de){Ze.releaseProgram(de)}),N.isShaderMaterial&&Ze.releaseShaderCache(N))}this.renderBufferDirect=function(N,te,de,he,ce,Ge){te===null&&(te=be);const it=ce.isMesh&&ce.matrixWorld.determinant()<0,ct=Mc(N,te,de,he,ce);Ve.setMaterial(he,it);let Xe=de.index,vt=1;if(he.wireframe===!0){if(Xe=ye.getWireframeAttribute(de),Xe===void 0)return;vt=2}const ft=de.drawRange,pt=de.attributes.position;let Nt=ft.start*vt,Mn=(ft.start+ft.count)*vt;Ge!==null&&(Nt=Math.max(Nt,Ge.start*vt),Mn=Math.min(Mn,(Ge.start+Ge.count)*vt)),Xe!==null?(Nt=Math.max(Nt,0),Mn=Math.min(Mn,Xe.count)):pt!=null&&(Nt=Math.max(Nt,0),Mn=Math.min(Mn,pt.count));const Yt=Mn-Nt;if(Yt<0||Yt===1/0)return;$e.setup(ce,he,ct,de,Xe);let Pn,At=_e;if(Xe!==null&&(Pn=Me.get(Xe),At=Ue,At.setIndex(Pn)),ce.isMesh)he.wireframe===!0?(Ve.setLineWidth(he.wireframeLinewidth*ze()),At.setMode(ee.LINES)):At.setMode(ee.TRIANGLES);else if(ce.isLine){let xt=he.linewidth;xt===void 0&&(xt=1),Ve.setLineWidth(xt*ze()),ce.isLineSegments?At.setMode(ee.LINES):ce.isLineLoop?At.setMode(ee.LINE_LOOP):At.setMode(ee.LINE_STRIP)}else ce.isPoints?At.setMode(ee.POINTS):ce.isSprite&&At.setMode(ee.TRIANGLES);if(ce.isBatchedMesh)At.renderMultiDraw(ce._multiDrawStarts,ce._multiDrawCounts,ce._multiDrawCount);else if(ce.isInstancedMesh)At.renderInstances(Nt,Yt,ce.count);else if(de.isInstancedBufferGeometry){const xt=de._maxInstanceCount!==void 0?de._maxInstanceCount:1/0,En=Math.min(de.instanceCount,xt);At.renderInstances(Nt,Yt,En)}else At.render(Nt,Yt)};function tt(N,te,de){N.transparent===!0&&N.side===Ei&&N.forceSinglePass===!1?(N.side=Rn,N.needsUpdate=!0,Yi(N,te,de),N.side=Pr,N.needsUpdate=!0,Yi(N,te,de),N.side=Ei):Yi(N,te,de)}this.compile=function(N,te,de=null){de===null&&(de=N),S=qe.get(de),S.init(),w.push(S),de.traverseVisible(function(ce){ce.isLight&&ce.layers.test(te.layers)&&(S.pushLight(ce),ce.castShadow&&S.pushShadow(ce))}),N!==de&&N.traverseVisible(function(ce){ce.isLight&&ce.layers.test(te.layers)&&(S.pushLight(ce),ce.castShadow&&S.pushShadow(ce))}),S.setupLights(A._useLegacyLights);const he=new Set;return N.traverse(function(ce){const Ge=ce.material;if(Ge)if(Array.isArray(Ge))for(let it=0;it<Ge.length;it++){const ct=Ge[it];tt(ct,de,ce),he.add(ct)}else tt(Ge,de,ce),he.add(Ge)}),w.pop(),S=null,he},this.compileAsync=function(N,te,de=null){const he=this.compile(N,te,de);return new Promise(ce=>{function Ge(){if(he.forEach(function(it){ot.get(it).currentProgram.isReady()&&he.delete(it)}),he.size===0){ce(N);return}setTimeout(Ge,10)}ke.get("KHR_parallel_shader_compile")!==null?Ge():setTimeout(Ge,10)})};let je=null;function ht(N){je&&je(N)}function Tt(){$t.stop()}function yt(){$t.start()}const $t=new $v;$t.setAnimationLoop(ht),typeof self<"u"&&$t.setContext(self),this.setAnimationLoop=function(N){je=N,st.setAnimationLoop(N),N===null?$t.stop():$t.start()},st.addEventListener("sessionstart",Tt),st.addEventListener("sessionend",yt),this.render=function(N,te){if(te!==void 0&&te.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),te.parent===null&&te.matrixWorldAutoUpdate===!0&&te.updateMatrixWorld(),st.enabled===!0&&st.isPresenting===!0&&(st.cameraAutoUpdate===!0&&st.updateCamera(te),te=st.getCamera()),N.isScene===!0&&N.onBeforeRender(A,N,te,I),S=qe.get(N,w.length),S.init(),w.push(S),Ae.multiplyMatrices(te.projectionMatrix,te.matrixWorldInverse),q.setFromProjectionMatrix(Ae),ve=this.localClippingEnabled,fe=rt.init(this.clippingPlanes,ve),E=He.get(N,v.length),E.init(),v.push(E),pn(N,te,0,A.sortObjects),E.finish(),A.sortObjects===!0&&E.sort(X,Z),this.info.render.frame++,fe===!0&&rt.beginShadows();const de=S.state.shadowsArray;if(xe.render(de,N,te),fe===!0&&rt.endShadows(),this.info.autoReset===!0&&this.info.reset(),mt.render(E,N),S.setupLights(A._useLegacyLights),te.isArrayCamera){const he=te.cameras;for(let ce=0,Ge=he.length;ce<Ge;ce++){const it=he[ce];pa(E,N,it,it.viewport)}}else pa(E,N,te);I!==null&&(L.updateMultisampleRenderTarget(I),L.updateRenderTargetMipmap(I)),N.isScene===!0&&N.onAfterRender(A,N,te),$e.resetDefaultState(),ne=-1,R=null,w.pop(),w.length>0?S=w[w.length-1]:S=null,v.pop(),v.length>0?E=v[v.length-1]:E=null};function pn(N,te,de,he){if(N.visible===!1)return;if(N.layers.test(te.layers)){if(N.isGroup)de=N.renderOrder;else if(N.isLOD)N.autoUpdate===!0&&N.update(te);else if(N.isLight)S.pushLight(N),N.castShadow&&S.pushShadow(N);else if(N.isSprite){if(!N.frustumCulled||q.intersectsSprite(N)){he&&ge.setFromMatrixPosition(N.matrixWorld).applyMatrix4(Ae);const it=we.update(N),ct=N.material;ct.visible&&E.push(N,it,ct,de,ge.z,null)}}else if((N.isMesh||N.isLine||N.isPoints)&&(!N.frustumCulled||q.intersectsObject(N))){const it=we.update(N),ct=N.material;if(he&&(N.boundingSphere!==void 0?(N.boundingSphere===null&&N.computeBoundingSphere(),ge.copy(N.boundingSphere.center)):(it.boundingSphere===null&&it.computeBoundingSphere(),ge.copy(it.boundingSphere.center)),ge.applyMatrix4(N.matrixWorld).applyMatrix4(Ae)),Array.isArray(ct)){const Xe=it.groups;for(let vt=0,ft=Xe.length;vt<ft;vt++){const pt=Xe[vt],Nt=ct[pt.materialIndex];Nt&&Nt.visible&&E.push(N,it,Nt,de,ge.z,pt)}}else ct.visible&&E.push(N,it,ct,de,ge.z,null)}}const Ge=N.children;for(let it=0,ct=Ge.length;it<ct;it++)pn(Ge[it],te,de,he)}function pa(N,te,de,he){const ce=N.opaque,Ge=N.transmissive,it=N.transparent;S.setupLightsView(de),fe===!0&&rt.setGlobalState(A.clippingPlanes,de),Ge.length>0&&Nr(ce,Ge,te,de),he&&Ve.viewport(D.copy(he)),ce.length>0&&bi(ce,te,de),Ge.length>0&&bi(Ge,te,de),it.length>0&&bi(it,te,de),Ve.buffers.depth.setTest(!0),Ve.buffers.depth.setMask(!0),Ve.buffers.color.setMask(!0),Ve.setPolygonOffset(!1)}function Nr(N,te,de,he){if((de.isScene===!0?de.overrideMaterial:null)!==null)return;const Ge=Qe.isWebGL2;Te===null&&(Te=new ss(1,1,{generateMipmaps:!0,type:ke.has("EXT_color_buffer_half_float")?aa:Cr,minFilter:oa,samples:Ge?4:0})),A.getDrawingBufferSize(Fe),Ge?Te.setSize(Fe.x,Fe.y):Te.setSize(sc(Fe.x),sc(Fe.y));const it=A.getRenderTarget();A.setRenderTarget(Te),A.getClearColor(me),F=A.getClearAlpha(),F<1&&A.setClearColor(16777215,.5),A.clear();const ct=A.toneMapping;A.toneMapping=br,bi(N,de,he),L.updateMultisampleRenderTarget(Te),L.updateRenderTargetMipmap(Te);let Xe=!1;for(let vt=0,ft=te.length;vt<ft;vt++){const pt=te[vt],Nt=pt.object,Mn=pt.geometry,Yt=pt.material,Pn=pt.group;if(Yt.side===Ei&&Nt.layers.test(he.layers)){const At=Yt.side;Yt.side=Rn,Yt.needsUpdate=!0,Dr(Nt,de,he,Mn,Yt,Pn),Yt.side=At,Yt.needsUpdate=!0,Xe=!0}}Xe===!0&&(L.updateMultisampleRenderTarget(Te),L.updateRenderTargetMipmap(Te)),A.setRenderTarget(it),A.setClearColor(me,F),A.toneMapping=ct}function bi(N,te,de){const he=te.isScene===!0?te.overrideMaterial:null;for(let ce=0,Ge=N.length;ce<Ge;ce++){const it=N[ce],ct=it.object,Xe=it.geometry,vt=he===null?it.material:he,ft=it.group;ct.layers.test(de.layers)&&Dr(ct,te,de,Xe,vt,ft)}}function Dr(N,te,de,he,ce,Ge){N.onBeforeRender(A,te,de,he,ce,Ge),N.modelViewMatrix.multiplyMatrices(de.matrixWorldInverse,N.matrixWorld),N.normalMatrix.getNormalMatrix(N.modelViewMatrix),ce.onBeforeRender(A,te,de,he,N,Ge),ce.transparent===!0&&ce.side===Ei&&ce.forceSinglePass===!1?(ce.side=Rn,ce.needsUpdate=!0,A.renderBufferDirect(de,te,he,ce,N,Ge),ce.side=Pr,ce.needsUpdate=!0,A.renderBufferDirect(de,te,he,ce,N,Ge),ce.side=Ei):A.renderBufferDirect(de,te,he,ce,N,Ge),N.onAfterRender(A,te,de,he,ce,Ge)}function Yi(N,te,de){te.isScene!==!0&&(te=be);const he=ot.get(N),ce=S.state.lights,Ge=S.state.shadowsArray,it=ce.state.version,ct=Ze.getParameters(N,ce.state,Ge,te,de),Xe=Ze.getProgramCacheKey(ct);let vt=he.programs;he.environment=N.isMeshStandardMaterial?te.environment:null,he.fog=te.fog,he.envMap=(N.isMeshStandardMaterial?se:C).get(N.envMap||he.environment),vt===void 0&&(N.addEventListener("dispose",Ne),vt=new Map,he.programs=vt);let ft=vt.get(Xe);if(ft!==void 0){if(he.currentProgram===ft&&he.lightsStateVersion===it)return ga(N,ct),ft}else ct.uniforms=Ze.getUniforms(N),N.onBuild(de,ct,A),N.onBeforeCompile(ct,A),ft=Ze.acquireProgram(ct,Xe),vt.set(Xe,ft),he.uniforms=ct.uniforms;const pt=he.uniforms;return(!N.isShaderMaterial&&!N.isRawShaderMaterial||N.clipping===!0)&&(pt.clippingPlanes=rt.uniform),ga(N,ct),he.needsLights=va(N),he.lightsStateVersion=it,he.needsLights&&(pt.ambientLightColor.value=ce.state.ambient,pt.lightProbe.value=ce.state.probe,pt.directionalLights.value=ce.state.directional,pt.directionalLightShadows.value=ce.state.directionalShadow,pt.spotLights.value=ce.state.spot,pt.spotLightShadows.value=ce.state.spotShadow,pt.rectAreaLights.value=ce.state.rectArea,pt.ltc_1.value=ce.state.rectAreaLTC1,pt.ltc_2.value=ce.state.rectAreaLTC2,pt.pointLights.value=ce.state.point,pt.pointLightShadows.value=ce.state.pointShadow,pt.hemisphereLights.value=ce.state.hemi,pt.directionalShadowMap.value=ce.state.directionalShadowMap,pt.directionalShadowMatrix.value=ce.state.directionalShadowMatrix,pt.spotShadowMap.value=ce.state.spotShadowMap,pt.spotLightMatrix.value=ce.state.spotLightMatrix,pt.spotLightMap.value=ce.state.spotLightMap,pt.pointShadowMap.value=ce.state.pointShadowMap,pt.pointShadowMatrix.value=ce.state.pointShadowMatrix),he.currentProgram=ft,he.uniformsList=null,ft}function ma(N){if(N.uniformsList===null){const te=N.currentProgram.getUniforms();N.uniformsList=Kl.seqWithValue(te.seq,N.uniforms)}return N.uniformsList}function ga(N,te){const de=ot.get(N);de.outputColorSpace=te.outputColorSpace,de.batching=te.batching,de.instancing=te.instancing,de.instancingColor=te.instancingColor,de.skinning=te.skinning,de.morphTargets=te.morphTargets,de.morphNormals=te.morphNormals,de.morphColors=te.morphColors,de.morphTargetsCount=te.morphTargetsCount,de.numClippingPlanes=te.numClippingPlanes,de.numIntersection=te.numClipIntersection,de.vertexAlphas=te.vertexAlphas,de.vertexTangents=te.vertexTangents,de.toneMapping=te.toneMapping}function Mc(N,te,de,he,ce){te.isScene!==!0&&(te=be),L.resetTextureUnits();const Ge=te.fog,it=he.isMeshStandardMaterial?te.environment:null,ct=I===null?A.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:ji,Xe=(he.isMeshStandardMaterial?se:C).get(he.envMap||it),vt=he.vertexColors===!0&&!!de.attributes.color&&de.attributes.color.itemSize===4,ft=!!de.attributes.tangent&&(!!he.normalMap||he.anisotropy>0),pt=!!de.morphAttributes.position,Nt=!!de.morphAttributes.normal,Mn=!!de.morphAttributes.color;let Yt=br;he.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(Yt=A.toneMapping);const Pn=de.morphAttributes.position||de.morphAttributes.normal||de.morphAttributes.color,At=Pn!==void 0?Pn.length:0,xt=ot.get(he),En=S.state.lights;if(fe===!0&&(ve===!0||N!==R)){const Ln=N===R&&he.id===ne;rt.setState(he,N,Ln)}let kt=!1;he.version===xt.__version?(xt.needsLights&&xt.lightsStateVersion!==En.state.version||xt.outputColorSpace!==ct||ce.isBatchedMesh&&xt.batching===!1||!ce.isBatchedMesh&&xt.batching===!0||ce.isInstancedMesh&&xt.instancing===!1||!ce.isInstancedMesh&&xt.instancing===!0||ce.isSkinnedMesh&&xt.skinning===!1||!ce.isSkinnedMesh&&xt.skinning===!0||ce.isInstancedMesh&&xt.instancingColor===!0&&ce.instanceColor===null||ce.isInstancedMesh&&xt.instancingColor===!1&&ce.instanceColor!==null||xt.envMap!==Xe||he.fog===!0&&xt.fog!==Ge||xt.numClippingPlanes!==void 0&&(xt.numClippingPlanes!==rt.numPlanes||xt.numIntersection!==rt.numIntersection)||xt.vertexAlphas!==vt||xt.vertexTangents!==ft||xt.morphTargets!==pt||xt.morphNormals!==Nt||xt.morphColors!==Mn||xt.toneMapping!==Yt||Qe.isWebGL2===!0&&xt.morphTargetsCount!==At)&&(kt=!0):(kt=!0,xt.__version=he.version);let Ri=xt.currentProgram;kt===!0&&(Ri=Yi(he,te,ce));let xa=!1,vi=!1,qi=!1;const Wt=Ri.getUniforms(),Yn=xt.uniforms;if(Ve.useProgram(Ri.program)&&(xa=!0,vi=!0,qi=!0),he.id!==ne&&(ne=he.id,vi=!0),xa||R!==N){Wt.setValue(ee,"projectionMatrix",N.projectionMatrix),Wt.setValue(ee,"viewMatrix",N.matrixWorldInverse);const Ln=Wt.map.cameraPosition;Ln!==void 0&&Ln.setValue(ee,ge.setFromMatrixPosition(N.matrixWorld)),Qe.logarithmicDepthBuffer&&Wt.setValue(ee,"logDepthBufFC",2/(Math.log(N.far+1)/Math.LN2)),(he.isMeshPhongMaterial||he.isMeshToonMaterial||he.isMeshLambertMaterial||he.isMeshBasicMaterial||he.isMeshStandardMaterial||he.isShaderMaterial)&&Wt.setValue(ee,"isOrthographic",N.isOrthographicCamera===!0),R!==N&&(R=N,vi=!0,qi=!0)}if(ce.isSkinnedMesh){Wt.setOptional(ee,ce,"bindMatrix"),Wt.setOptional(ee,ce,"bindMatrixInverse");const Ln=ce.skeleton;Ln&&(Qe.floatVertexTextures?(Ln.boneTexture===null&&Ln.computeBoneTexture(),Wt.setValue(ee,"boneTexture",Ln.boneTexture,L)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}ce.isBatchedMesh&&(Wt.setOptional(ee,ce,"batchingTexture"),Wt.setValue(ee,"batchingTexture",ce._matricesTexture,L));const mo=de.morphAttributes;if((mo.position!==void 0||mo.normal!==void 0||mo.color!==void 0&&Qe.isWebGL2===!0)&&H.update(ce,de,Ri),(vi||xt.receiveShadow!==ce.receiveShadow)&&(xt.receiveShadow=ce.receiveShadow,Wt.setValue(ee,"receiveShadow",ce.receiveShadow)),he.isMeshGouraudMaterial&&he.envMap!==null&&(Yn.envMap.value=Xe,Yn.flipEnvMap.value=Xe.isCubeTexture&&Xe.isRenderTargetTexture===!1?-1:1),vi&&(Wt.setValue(ee,"toneMappingExposure",A.toneMappingExposure),xt.needsLights&&Ci(Yn,qi),Ge&&he.fog===!0&&Ie.refreshFogUniforms(Yn,Ge),Ie.refreshMaterialUniforms(Yn,he,K,J,Te),Kl.upload(ee,ma(xt),Yn,L)),he.isShaderMaterial&&he.uniformsNeedUpdate===!0&&(Kl.upload(ee,ma(xt),Yn,L),he.uniformsNeedUpdate=!1),he.isSpriteMaterial&&Wt.setValue(ee,"center",ce.center),Wt.setValue(ee,"modelViewMatrix",ce.modelViewMatrix),Wt.setValue(ee,"normalMatrix",ce.normalMatrix),Wt.setValue(ee,"modelMatrix",ce.matrixWorld),he.isShaderMaterial||he.isRawShaderMaterial){const Ln=he.uniformsGroups;for(let Ur=0,_a=Ln.length;Ur<_a;Ur++)if(Qe.isWebGL2){const ls=Ln[Ur];dt.update(ls,Ri),dt.bind(ls,Ri)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Ri}function Ci(N,te){N.ambientLightColor.needsUpdate=te,N.lightProbe.needsUpdate=te,N.directionalLights.needsUpdate=te,N.directionalLightShadows.needsUpdate=te,N.pointLights.needsUpdate=te,N.pointLightShadows.needsUpdate=te,N.spotLights.needsUpdate=te,N.spotLightShadows.needsUpdate=te,N.rectAreaLights.needsUpdate=te,N.hemisphereLights.needsUpdate=te}function va(N){return N.isMeshLambertMaterial||N.isMeshToonMaterial||N.isMeshPhongMaterial||N.isMeshStandardMaterial||N.isShadowMaterial||N.isShaderMaterial&&N.lights===!0}this.getActiveCubeFace=function(){return B},this.getActiveMipmapLevel=function(){return U},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(N,te,de){ot.get(N.texture).__webglTexture=te,ot.get(N.depthTexture).__webglTexture=de;const he=ot.get(N);he.__hasExternalTextures=!0,he.__hasExternalTextures&&(he.__autoAllocateDepthBuffer=de===void 0,he.__autoAllocateDepthBuffer||ke.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),he.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(N,te){const de=ot.get(N);de.__webglFramebuffer=te,de.__useDefaultFramebuffer=te===void 0},this.setRenderTarget=function(N,te=0,de=0){I=N,B=te,U=de;let he=!0,ce=null,Ge=!1,it=!1;if(N){const Xe=ot.get(N);Xe.__useDefaultFramebuffer!==void 0?(Ve.bindFramebuffer(ee.FRAMEBUFFER,null),he=!1):Xe.__webglFramebuffer===void 0?L.setupRenderTarget(N):Xe.__hasExternalTextures&&L.rebindTextures(N,ot.get(N.texture).__webglTexture,ot.get(N.depthTexture).__webglTexture);const vt=N.texture;(vt.isData3DTexture||vt.isDataArrayTexture||vt.isCompressedArrayTexture)&&(it=!0);const ft=ot.get(N).__webglFramebuffer;N.isWebGLCubeRenderTarget?(Array.isArray(ft[te])?ce=ft[te][de]:ce=ft[te],Ge=!0):Qe.isWebGL2&&N.samples>0&&L.useMultisampledRTT(N)===!1?ce=ot.get(N).__webglMultisampledFramebuffer:Array.isArray(ft)?ce=ft[de]:ce=ft,D.copy(N.viewport),re.copy(N.scissor),ae=N.scissorTest}else D.copy(Y).multiplyScalar(K).floor(),re.copy(O).multiplyScalar(K).floor(),ae=W;if(Ve.bindFramebuffer(ee.FRAMEBUFFER,ce)&&Qe.drawBuffers&&he&&Ve.drawBuffers(N,ce),Ve.viewport(D),Ve.scissor(re),Ve.setScissorTest(ae),Ge){const Xe=ot.get(N.texture);ee.framebufferTexture2D(ee.FRAMEBUFFER,ee.COLOR_ATTACHMENT0,ee.TEXTURE_CUBE_MAP_POSITIVE_X+te,Xe.__webglTexture,de)}else if(it){const Xe=ot.get(N.texture),vt=te||0;ee.framebufferTextureLayer(ee.FRAMEBUFFER,ee.COLOR_ATTACHMENT0,Xe.__webglTexture,de||0,vt)}ne=-1},this.readRenderTargetPixels=function(N,te,de,he,ce,Ge,it){if(!(N&&N.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ct=ot.get(N).__webglFramebuffer;if(N.isWebGLCubeRenderTarget&&it!==void 0&&(ct=ct[it]),ct){Ve.bindFramebuffer(ee.FRAMEBUFFER,ct);try{const Xe=N.texture,vt=Xe.format,ft=Xe.type;if(vt!==mi&&Re.convert(vt)!==ee.getParameter(ee.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const pt=ft===aa&&(ke.has("EXT_color_buffer_half_float")||Qe.isWebGL2&&ke.has("EXT_color_buffer_float"));if(ft!==Cr&&Re.convert(ft)!==ee.getParameter(ee.IMPLEMENTATION_COLOR_READ_TYPE)&&!(ft===Er&&(Qe.isWebGL2||ke.has("OES_texture_float")||ke.has("WEBGL_color_buffer_float")))&&!pt){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}te>=0&&te<=N.width-he&&de>=0&&de<=N.height-ce&&ee.readPixels(te,de,he,ce,Re.convert(vt),Re.convert(ft),Ge)}finally{const Xe=I!==null?ot.get(I).__webglFramebuffer:null;Ve.bindFramebuffer(ee.FRAMEBUFFER,Xe)}}},this.copyFramebufferToTexture=function(N,te,de=0){const he=Math.pow(2,-de),ce=Math.floor(te.image.width*he),Ge=Math.floor(te.image.height*he);L.setTexture2D(te,0),ee.copyTexSubImage2D(ee.TEXTURE_2D,de,0,0,N.x,N.y,ce,Ge),Ve.unbindTexture()},this.copyTextureToTexture=function(N,te,de,he=0){const ce=te.image.width,Ge=te.image.height,it=Re.convert(de.format),ct=Re.convert(de.type);L.setTexture2D(de,0),ee.pixelStorei(ee.UNPACK_FLIP_Y_WEBGL,de.flipY),ee.pixelStorei(ee.UNPACK_PREMULTIPLY_ALPHA_WEBGL,de.premultiplyAlpha),ee.pixelStorei(ee.UNPACK_ALIGNMENT,de.unpackAlignment),te.isDataTexture?ee.texSubImage2D(ee.TEXTURE_2D,he,N.x,N.y,ce,Ge,it,ct,te.image.data):te.isCompressedTexture?ee.compressedTexSubImage2D(ee.TEXTURE_2D,he,N.x,N.y,te.mipmaps[0].width,te.mipmaps[0].height,it,te.mipmaps[0].data):ee.texSubImage2D(ee.TEXTURE_2D,he,N.x,N.y,it,ct,te.image),he===0&&de.generateMipmaps&&ee.generateMipmap(ee.TEXTURE_2D),Ve.unbindTexture()},this.copyTextureToTexture3D=function(N,te,de,he,ce=0){if(A.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const Ge=N.max.x-N.min.x+1,it=N.max.y-N.min.y+1,ct=N.max.z-N.min.z+1,Xe=Re.convert(he.format),vt=Re.convert(he.type);let ft;if(he.isData3DTexture)L.setTexture3D(he,0),ft=ee.TEXTURE_3D;else if(he.isDataArrayTexture||he.isCompressedArrayTexture)L.setTexture2DArray(he,0),ft=ee.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}ee.pixelStorei(ee.UNPACK_FLIP_Y_WEBGL,he.flipY),ee.pixelStorei(ee.UNPACK_PREMULTIPLY_ALPHA_WEBGL,he.premultiplyAlpha),ee.pixelStorei(ee.UNPACK_ALIGNMENT,he.unpackAlignment);const pt=ee.getParameter(ee.UNPACK_ROW_LENGTH),Nt=ee.getParameter(ee.UNPACK_IMAGE_HEIGHT),Mn=ee.getParameter(ee.UNPACK_SKIP_PIXELS),Yt=ee.getParameter(ee.UNPACK_SKIP_ROWS),Pn=ee.getParameter(ee.UNPACK_SKIP_IMAGES),At=de.isCompressedTexture?de.mipmaps[ce]:de.image;ee.pixelStorei(ee.UNPACK_ROW_LENGTH,At.width),ee.pixelStorei(ee.UNPACK_IMAGE_HEIGHT,At.height),ee.pixelStorei(ee.UNPACK_SKIP_PIXELS,N.min.x),ee.pixelStorei(ee.UNPACK_SKIP_ROWS,N.min.y),ee.pixelStorei(ee.UNPACK_SKIP_IMAGES,N.min.z),de.isDataTexture||de.isData3DTexture?ee.texSubImage3D(ft,ce,te.x,te.y,te.z,Ge,it,ct,Xe,vt,At.data):de.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),ee.compressedTexSubImage3D(ft,ce,te.x,te.y,te.z,Ge,it,ct,Xe,At.data)):ee.texSubImage3D(ft,ce,te.x,te.y,te.z,Ge,it,ct,Xe,vt,At),ee.pixelStorei(ee.UNPACK_ROW_LENGTH,pt),ee.pixelStorei(ee.UNPACK_IMAGE_HEIGHT,Nt),ee.pixelStorei(ee.UNPACK_SKIP_PIXELS,Mn),ee.pixelStorei(ee.UNPACK_SKIP_ROWS,Yt),ee.pixelStorei(ee.UNPACK_SKIP_IMAGES,Pn),ce===0&&he.generateMipmaps&&ee.generateMipmap(ft),Ve.unbindTexture()},this.initTexture=function(N){N.isCubeTexture?L.setTextureCube(N,0):N.isData3DTexture?L.setTexture3D(N,0):N.isDataArrayTexture||N.isCompressedArrayTexture?L.setTexture2DArray(N,0):L.setTexture2D(N,0),Ve.unbindTexture()},this.resetState=function(){B=0,U=0,I=null,Ve.reset(),$e.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Wi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===pf?"display-p3":"srgb",t.unpackColorSpace=Lt.workingColorSpace===vc?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===dn?is:Dv}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===is?dn:ji}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class VT extends t0{}VT.prototype.isWebGL1Renderer=!0;class _f{constructor(e,t=1,r=1e3){this.isFog=!0,this.name="",this.color=new Et(e),this.near=t,this.far=r}clone(){return new _f(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class n0 extends rn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class rf extends ho{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Et(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Dg=new z,Ug=new z,Ig=new Ht,Id=new gf,Gl=new xc;class i0 extends rn{constructor(e=new Sn,t=new rf){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,r=[0];for(let o=1,l=t.count;o<l;o++)Dg.fromBufferAttribute(t,o-1),Ug.fromBufferAttribute(t,o),r[o]=r[o-1],r[o]+=Dg.distanceTo(Ug);e.setAttribute("lineDistance",new Ft(r,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const r=this.geometry,o=this.matrixWorld,l=e.params.Line.threshold,d=r.drawRange;if(r.boundingSphere===null&&r.computeBoundingSphere(),Gl.copy(r.boundingSphere),Gl.applyMatrix4(o),Gl.radius+=l,e.ray.intersectsSphere(Gl)===!1)return;Ig.copy(o).invert(),Id.copy(e.ray).applyMatrix4(Ig);const c=l/((this.scale.x+this.scale.y+this.scale.z)/3),f=c*c,h=new z,p=new z,g=new z,y=new z,x=this.isLineSegments?2:1,M=r.index,S=r.attributes.position;if(M!==null){const v=Math.max(0,d.start),w=Math.min(M.count,d.start+d.count);for(let A=v,P=w-1;A<P;A+=x){const B=M.getX(A),U=M.getX(A+1);if(h.fromBufferAttribute(S,B),p.fromBufferAttribute(S,U),Id.distanceSqToSegment(h,p,y,g)>f)continue;y.applyMatrix4(this.matrixWorld);const ne=e.ray.origin.distanceTo(y);ne<e.near||ne>e.far||t.push({distance:ne,point:g.clone().applyMatrix4(this.matrixWorld),index:A,face:null,faceIndex:null,object:this})}}else{const v=Math.max(0,d.start),w=Math.min(S.count,d.start+d.count);for(let A=v,P=w-1;A<P;A+=x){if(h.fromBufferAttribute(S,A),p.fromBufferAttribute(S,A+1),Id.distanceSqToSegment(h,p,y,g)>f)continue;y.applyMatrix4(this.matrixWorld);const U=e.ray.origin.distanceTo(y);U<e.near||U>e.far||t.push({distance:U,point:g.clone().applyMatrix4(this.matrixWorld),index:A,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,r=Object.keys(t);if(r.length>0){const o=t[r[0]];if(o!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let l=0,d=o.length;l<d;l++){const c=o[l].name||String(l);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=l}}}}}const Og=new z,Fg=new z;class GT extends i0{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,r=[];for(let o=0,l=t.count;o<l;o+=2)Og.fromBufferAttribute(t,o),Fg.fromBufferAttribute(t,o+1),r[o]=o===0?0:r[o-1],r[o+1]=r[o]+Og.distanceTo(Fg);e.setAttribute("lineDistance",new Ft(r,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class WT extends zn{constructor(e,t,r,o,l,d,c,f,h){super(e,t,r,o,l,d,c,f,h),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Ai{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const r=this.getUtoTmapping(e);return this.getPoint(r,t)}getPoints(e=5){const t=[];for(let r=0;r<=e;r++)t.push(this.getPoint(r/e));return t}getSpacedPoints(e=5){const t=[];for(let r=0;r<=e;r++)t.push(this.getPointAt(r/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let r,o=this.getPoint(0),l=0;t.push(0);for(let d=1;d<=e;d++)r=this.getPoint(d/e),l+=r.distanceTo(o),t.push(l),o=r;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const r=this.getLengths();let o=0;const l=r.length;let d;t?d=t:d=e*r[l-1];let c=0,f=l-1,h;for(;c<=f;)if(o=Math.floor(c+(f-c)/2),h=r[o]-d,h<0)c=o+1;else if(h>0)f=o-1;else{f=o;break}if(o=f,r[o]===d)return o/(l-1);const p=r[o],y=r[o+1]-p,x=(d-p)/y;return(o+x)/(l-1)}getTangent(e,t){let o=e-1e-4,l=e+1e-4;o<0&&(o=0),l>1&&(l=1);const d=this.getPoint(o),c=this.getPoint(l),f=t||(d.isVector2?new Be:new z);return f.copy(c).sub(d).normalize(),f}getTangentAt(e,t){const r=this.getUtoTmapping(e);return this.getTangent(r,t)}computeFrenetFrames(e,t){const r=new z,o=[],l=[],d=[],c=new z,f=new Ht;for(let x=0;x<=e;x++){const M=x/e;o[x]=this.getTangentAt(M,new z)}l[0]=new z,d[0]=new z;let h=Number.MAX_VALUE;const p=Math.abs(o[0].x),g=Math.abs(o[0].y),y=Math.abs(o[0].z);p<=h&&(h=p,r.set(1,0,0)),g<=h&&(h=g,r.set(0,1,0)),y<=h&&r.set(0,0,1),c.crossVectors(o[0],r).normalize(),l[0].crossVectors(o[0],c),d[0].crossVectors(o[0],l[0]);for(let x=1;x<=e;x++){if(l[x]=l[x-1].clone(),d[x]=d[x-1].clone(),c.crossVectors(o[x-1],o[x]),c.length()>Number.EPSILON){c.normalize();const M=Math.acos(tn(o[x-1].dot(o[x]),-1,1));l[x].applyMatrix4(f.makeRotationAxis(c,M))}d[x].crossVectors(o[x],l[x])}if(t===!0){let x=Math.acos(tn(l[0].dot(l[e]),-1,1));x/=e,o[0].dot(c.crossVectors(l[0],l[e]))>0&&(x=-x);for(let M=1;M<=e;M++)l[M].applyMatrix4(f.makeRotationAxis(o[M],x*M)),d[M].crossVectors(o[M],l[M])}return{tangents:o,normals:l,binormals:d}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class yf extends Ai{constructor(e=0,t=0,r=1,o=1,l=0,d=Math.PI*2,c=!1,f=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=r,this.yRadius=o,this.aStartAngle=l,this.aEndAngle=d,this.aClockwise=c,this.aRotation=f}getPoint(e,t){const r=t||new Be,o=Math.PI*2;let l=this.aEndAngle-this.aStartAngle;const d=Math.abs(l)<Number.EPSILON;for(;l<0;)l+=o;for(;l>o;)l-=o;l<Number.EPSILON&&(d?l=0:l=o),this.aClockwise===!0&&!d&&(l===o?l=-o:l=l-o);const c=this.aStartAngle+e*l;let f=this.aX+this.xRadius*Math.cos(c),h=this.aY+this.yRadius*Math.sin(c);if(this.aRotation!==0){const p=Math.cos(this.aRotation),g=Math.sin(this.aRotation),y=f-this.aX,x=h-this.aY;f=y*p-x*g+this.aX,h=y*g+x*p+this.aY}return r.set(f,h)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class jT extends yf{constructor(e,t,r,o,l,d){super(e,t,r,r,o,l,d),this.isArcCurve=!0,this.type="ArcCurve"}}function Sf(){let s=0,e=0,t=0,r=0;function o(l,d,c,f){s=l,e=c,t=-3*l+3*d-2*c-f,r=2*l-2*d+c+f}return{initCatmullRom:function(l,d,c,f,h){o(d,c,h*(c-l),h*(f-d))},initNonuniformCatmullRom:function(l,d,c,f,h,p,g){let y=(d-l)/h-(c-l)/(h+p)+(c-d)/p,x=(c-d)/p-(f-d)/(p+g)+(f-c)/g;y*=p,x*=p,o(d,c,y,x)},calc:function(l){const d=l*l,c=d*l;return s+e*l+t*d+r*c}}}const Wl=new z,Od=new Sf,Fd=new Sf,kd=new Sf;class XT extends Ai{constructor(e=[],t=!1,r="centripetal",o=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=r,this.tension=o}getPoint(e,t=new z){const r=t,o=this.points,l=o.length,d=(l-(this.closed?0:1))*e;let c=Math.floor(d),f=d-c;this.closed?c+=c>0?0:(Math.floor(Math.abs(c)/l)+1)*l:f===0&&c===l-1&&(c=l-2,f=1);let h,p;this.closed||c>0?h=o[(c-1)%l]:(Wl.subVectors(o[0],o[1]).add(o[0]),h=Wl);const g=o[c%l],y=o[(c+1)%l];if(this.closed||c+2<l?p=o[(c+2)%l]:(Wl.subVectors(o[l-1],o[l-2]).add(o[l-1]),p=Wl),this.curveType==="centripetal"||this.curveType==="chordal"){const x=this.curveType==="chordal"?.5:.25;let M=Math.pow(h.distanceToSquared(g),x),E=Math.pow(g.distanceToSquared(y),x),S=Math.pow(y.distanceToSquared(p),x);E<1e-4&&(E=1),M<1e-4&&(M=E),S<1e-4&&(S=E),Od.initNonuniformCatmullRom(h.x,g.x,y.x,p.x,M,E,S),Fd.initNonuniformCatmullRom(h.y,g.y,y.y,p.y,M,E,S),kd.initNonuniformCatmullRom(h.z,g.z,y.z,p.z,M,E,S)}else this.curveType==="catmullrom"&&(Od.initCatmullRom(h.x,g.x,y.x,p.x,this.tension),Fd.initCatmullRom(h.y,g.y,y.y,p.y,this.tension),kd.initCatmullRom(h.z,g.z,y.z,p.z,this.tension));return r.set(Od.calc(f),Fd.calc(f),kd.calc(f)),r}copy(e){super.copy(e),this.points=[];for(let t=0,r=e.points.length;t<r;t++){const o=e.points[t];this.points.push(o.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,r=this.points.length;t<r;t++){const o=this.points[t];e.points.push(o.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,r=e.points.length;t<r;t++){const o=e.points[t];this.points.push(new z().fromArray(o))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function kg(s,e,t,r,o){const l=(r-e)*.5,d=(o-t)*.5,c=s*s,f=s*c;return(2*t-2*r+l+d)*f+(-3*t+3*r-2*l-d)*c+l*s+t}function $T(s,e){const t=1-s;return t*t*e}function YT(s,e){return 2*(1-s)*s*e}function qT(s,e){return s*s*e}function na(s,e,t,r){return $T(s,e)+YT(s,t)+qT(s,r)}function KT(s,e){const t=1-s;return t*t*t*e}function ZT(s,e){const t=1-s;return 3*t*t*s*e}function JT(s,e){return 3*(1-s)*s*s*e}function QT(s,e){return s*s*s*e}function ia(s,e,t,r,o){return KT(s,e)+ZT(s,t)+JT(s,r)+QT(s,o)}class r0 extends Ai{constructor(e=new Be,t=new Be,r=new Be,o=new Be){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=r,this.v3=o}getPoint(e,t=new Be){const r=t,o=this.v0,l=this.v1,d=this.v2,c=this.v3;return r.set(ia(e,o.x,l.x,d.x,c.x),ia(e,o.y,l.y,d.y,c.y)),r}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class eA extends Ai{constructor(e=new z,t=new z,r=new z,o=new z){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=r,this.v3=o}getPoint(e,t=new z){const r=t,o=this.v0,l=this.v1,d=this.v2,c=this.v3;return r.set(ia(e,o.x,l.x,d.x,c.x),ia(e,o.y,l.y,d.y,c.y),ia(e,o.z,l.z,d.z,c.z)),r}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class s0 extends Ai{constructor(e=new Be,t=new Be){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Be){const r=t;return e===1?r.copy(this.v2):(r.copy(this.v2).sub(this.v1),r.multiplyScalar(e).add(this.v1)),r}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Be){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class tA extends Ai{constructor(e=new z,t=new z){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new z){const r=t;return e===1?r.copy(this.v2):(r.copy(this.v2).sub(this.v1),r.multiplyScalar(e).add(this.v1)),r}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new z){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class o0 extends Ai{constructor(e=new Be,t=new Be,r=new Be){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=r}getPoint(e,t=new Be){const r=t,o=this.v0,l=this.v1,d=this.v2;return r.set(na(e,o.x,l.x,d.x),na(e,o.y,l.y,d.y)),r}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class nA extends Ai{constructor(e=new z,t=new z,r=new z){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=r}getPoint(e,t=new z){const r=t,o=this.v0,l=this.v1,d=this.v2;return r.set(na(e,o.x,l.x,d.x),na(e,o.y,l.y,d.y),na(e,o.z,l.z,d.z)),r}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class a0 extends Ai{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Be){const r=t,o=this.points,l=(o.length-1)*e,d=Math.floor(l),c=l-d,f=o[d===0?d:d-1],h=o[d],p=o[d>o.length-2?o.length-1:d+1],g=o[d>o.length-3?o.length-1:d+2];return r.set(kg(c,f.x,h.x,p.x,g.x),kg(c,f.y,h.y,p.y,g.y)),r}copy(e){super.copy(e),this.points=[];for(let t=0,r=e.points.length;t<r;t++){const o=e.points[t];this.points.push(o.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,r=this.points.length;t<r;t++){const o=this.points[t];e.points.push(o.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,r=e.points.length;t<r;t++){const o=e.points[t];this.points.push(new Be().fromArray(o))}return this}}var zg=Object.freeze({__proto__:null,ArcCurve:jT,CatmullRomCurve3:XT,CubicBezierCurve:r0,CubicBezierCurve3:eA,EllipseCurve:yf,LineCurve:s0,LineCurve3:tA,QuadraticBezierCurve:o0,QuadraticBezierCurve3:nA,SplineCurve:a0});class iA extends Ai{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const r=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new zg[r](t,e))}return this}getPoint(e,t){const r=e*this.getLength(),o=this.getCurveLengths();let l=0;for(;l<o.length;){if(o[l]>=r){const d=o[l]-r,c=this.curves[l],f=c.getLength(),h=f===0?0:1-d/f;return c.getPointAt(h,t)}l++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let r=0,o=this.curves.length;r<o;r++)t+=this.curves[r].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let r=0;r<=e;r++)t.push(this.getPoint(r/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let r;for(let o=0,l=this.curves;o<l.length;o++){const d=l[o],c=d.isEllipseCurve?e*2:d.isLineCurve||d.isLineCurve3?1:d.isSplineCurve?e*d.points.length:e,f=d.getPoints(c);for(let h=0;h<f.length;h++){const p=f[h];r&&r.equals(p)||(t.push(p),r=p)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,r=e.curves.length;t<r;t++){const o=e.curves[t];this.curves.push(o.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,r=this.curves.length;t<r;t++){const o=this.curves[t];e.curves.push(o.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,r=e.curves.length;t<r;t++){const o=e.curves[t];this.curves.push(new zg[o.type]().fromJSON(o))}return this}}class rA extends iA{constructor(e){super(),this.type="Path",this.currentPoint=new Be,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,r=e.length;t<r;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const r=new s0(this.currentPoint.clone(),new Be(e,t));return this.curves.push(r),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,r,o){const l=new o0(this.currentPoint.clone(),new Be(e,t),new Be(r,o));return this.curves.push(l),this.currentPoint.set(r,o),this}bezierCurveTo(e,t,r,o,l,d){const c=new r0(this.currentPoint.clone(),new Be(e,t),new Be(r,o),new Be(l,d));return this.curves.push(c),this.currentPoint.set(l,d),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),r=new a0(t);return this.curves.push(r),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,r,o,l,d){const c=this.currentPoint.x,f=this.currentPoint.y;return this.absarc(e+c,t+f,r,o,l,d),this}absarc(e,t,r,o,l,d){return this.absellipse(e,t,r,r,o,l,d),this}ellipse(e,t,r,o,l,d,c,f){const h=this.currentPoint.x,p=this.currentPoint.y;return this.absellipse(e+h,t+p,r,o,l,d,c,f),this}absellipse(e,t,r,o,l,d,c,f){const h=new yf(e,t,r,o,l,d,c,f);if(this.curves.length>0){const g=h.getPoint(0);g.equals(this.currentPoint)||this.lineTo(g.x,g.y)}this.curves.push(h);const p=h.getPoint(1);return this.currentPoint.copy(p),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Mf extends Sn{constructor(e=[new Be(0,-.5),new Be(.5,0),new Be(0,.5)],t=12,r=0,o=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:r,phiLength:o},t=Math.floor(t),o=tn(o,0,Math.PI*2);const l=[],d=[],c=[],f=[],h=[],p=1/t,g=new z,y=new Be,x=new z,M=new z,E=new z;let S=0,v=0;for(let w=0;w<=e.length-1;w++)switch(w){case 0:S=e[w+1].x-e[w].x,v=e[w+1].y-e[w].y,x.x=v*1,x.y=-S,x.z=v*0,E.copy(x),x.normalize(),f.push(x.x,x.y,x.z);break;case e.length-1:f.push(E.x,E.y,E.z);break;default:S=e[w+1].x-e[w].x,v=e[w+1].y-e[w].y,x.x=v*1,x.y=-S,x.z=v*0,M.copy(x),x.x+=E.x,x.y+=E.y,x.z+=E.z,x.normalize(),f.push(x.x,x.y,x.z),E.copy(M)}for(let w=0;w<=t;w++){const A=r+w*p*o,P=Math.sin(A),B=Math.cos(A);for(let U=0;U<=e.length-1;U++){g.x=e[U].x*P,g.y=e[U].y,g.z=e[U].x*B,d.push(g.x,g.y,g.z),y.x=w/t,y.y=U/(e.length-1),c.push(y.x,y.y);const I=f[3*U+0]*P,ne=f[3*U+1],R=f[3*U+0]*B;h.push(I,ne,R)}}for(let w=0;w<t;w++)for(let A=0;A<e.length-1;A++){const P=A+w*e.length,B=P,U=P+e.length,I=P+e.length+1,ne=P+1;l.push(B,U,ne),l.push(I,ne,U)}this.setIndex(l),this.setAttribute("position",new Ft(d,3)),this.setAttribute("uv",new Ft(c,2)),this.setAttribute("normal",new Ft(h,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Mf(e.points,e.segments,e.phiStart,e.phiLength)}}class Ef extends Mf{constructor(e=1,t=1,r=4,o=8){const l=new rA;l.absarc(0,-t/2,e,Math.PI*1.5,0),l.absarc(0,t/2,e,0,Math.PI*.5),super(l.getPoints(r),o),this.type="CapsuleGeometry",this.parameters={radius:e,length:t,capSegments:r,radialSegments:o}}static fromJSON(e){return new Ef(e.radius,e.length,e.capSegments,e.radialSegments)}}class wf extends Sn{constructor(e=1,t=32,r=0,o=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:r,thetaLength:o},t=Math.max(3,t);const l=[],d=[],c=[],f=[],h=new z,p=new Be;d.push(0,0,0),c.push(0,0,1),f.push(.5,.5);for(let g=0,y=3;g<=t;g++,y+=3){const x=r+g/t*o;h.x=e*Math.cos(x),h.y=e*Math.sin(x),d.push(h.x,h.y,h.z),c.push(0,0,1),p.x=(d[y]/e+1)/2,p.y=(d[y+1]/e+1)/2,f.push(p.x,p.y)}for(let g=1;g<=t;g++)l.push(g,g+1,0);this.setIndex(l),this.setAttribute("position",new Ft(d,3)),this.setAttribute("normal",new Ft(c,3)),this.setAttribute("uv",new Ft(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new wf(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class ha extends Sn{constructor(e=1,t=1,r=1,o=32,l=1,d=!1,c=0,f=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:r,radialSegments:o,heightSegments:l,openEnded:d,thetaStart:c,thetaLength:f};const h=this;o=Math.floor(o),l=Math.floor(l);const p=[],g=[],y=[],x=[];let M=0;const E=[],S=r/2;let v=0;w(),d===!1&&(e>0&&A(!0),t>0&&A(!1)),this.setIndex(p),this.setAttribute("position",new Ft(g,3)),this.setAttribute("normal",new Ft(y,3)),this.setAttribute("uv",new Ft(x,2));function w(){const P=new z,B=new z;let U=0;const I=(t-e)/r;for(let ne=0;ne<=l;ne++){const R=[],D=ne/l,re=D*(t-e)+e;for(let ae=0;ae<=o;ae++){const me=ae/o,F=me*f+c,$=Math.sin(F),J=Math.cos(F);B.x=re*$,B.y=-D*r+S,B.z=re*J,g.push(B.x,B.y,B.z),P.set($,I,J).normalize(),y.push(P.x,P.y,P.z),x.push(me,1-D),R.push(M++)}E.push(R)}for(let ne=0;ne<o;ne++)for(let R=0;R<l;R++){const D=E[R][ne],re=E[R+1][ne],ae=E[R+1][ne+1],me=E[R][ne+1];p.push(D,re,me),p.push(re,ae,me),U+=6}h.addGroup(v,U,0),v+=U}function A(P){const B=M,U=new Be,I=new z;let ne=0;const R=P===!0?e:t,D=P===!0?1:-1;for(let ae=1;ae<=o;ae++)g.push(0,S*D,0),y.push(0,D,0),x.push(.5,.5),M++;const re=M;for(let ae=0;ae<=o;ae++){const F=ae/o*f+c,$=Math.cos(F),J=Math.sin(F);I.x=R*J,I.y=S*D,I.z=R*$,g.push(I.x,I.y,I.z),y.push(0,D,0),U.x=$*.5+.5,U.y=J*.5*D+.5,x.push(U.x,U.y),M++}for(let ae=0;ae<o;ae++){const me=B+ae,F=re+ae;P===!0?p.push(F,F+1,me):p.push(F+1,F,me),ne+=3}h.addGroup(v,ne,P===!0?1:2),v+=ne}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ha(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Tf extends ha{constructor(e=1,t=1,r=32,o=1,l=!1,d=0,c=Math.PI*2){super(0,e,t,r,o,l,d,c),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:r,heightSegments:o,openEnded:l,thetaStart:d,thetaLength:c}}static fromJSON(e){return new Tf(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}const jl=new z,Xl=new z,zd=new z,$l=new ii;class sA extends Sn{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const o=Math.pow(10,4),l=Math.cos(no*t),d=e.getIndex(),c=e.getAttribute("position"),f=d?d.count:c.count,h=[0,0,0],p=["a","b","c"],g=new Array(3),y={},x=[];for(let M=0;M<f;M+=3){d?(h[0]=d.getX(M),h[1]=d.getX(M+1),h[2]=d.getX(M+2)):(h[0]=M,h[1]=M+1,h[2]=M+2);const{a:E,b:S,c:v}=$l;if(E.fromBufferAttribute(c,h[0]),S.fromBufferAttribute(c,h[1]),v.fromBufferAttribute(c,h[2]),$l.getNormal(zd),g[0]=`${Math.round(E.x*o)},${Math.round(E.y*o)},${Math.round(E.z*o)}`,g[1]=`${Math.round(S.x*o)},${Math.round(S.y*o)},${Math.round(S.z*o)}`,g[2]=`${Math.round(v.x*o)},${Math.round(v.y*o)},${Math.round(v.z*o)}`,!(g[0]===g[1]||g[1]===g[2]||g[2]===g[0]))for(let w=0;w<3;w++){const A=(w+1)%3,P=g[w],B=g[A],U=$l[p[w]],I=$l[p[A]],ne=`${P}_${B}`,R=`${B}_${P}`;R in y&&y[R]?(zd.dot(y[R].normal)<=l&&(x.push(U.x,U.y,U.z),x.push(I.x,I.y,I.z)),y[R]=null):ne in y||(y[ne]={index0:h[w],index1:h[A],normal:zd.clone()})}}for(const M in y)if(y[M]){const{index0:E,index1:S}=y[M];jl.fromBufferAttribute(c,E),Xl.fromBufferAttribute(c,S),x.push(jl.x,jl.y,jl.z),x.push(Xl.x,Xl.y,Xl.z)}this.setAttribute("position",new Ft(x,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class ac extends Sn{constructor(e=.5,t=1,r=32,o=1,l=0,d=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:r,phiSegments:o,thetaStart:l,thetaLength:d},r=Math.max(3,r),o=Math.max(1,o);const c=[],f=[],h=[],p=[];let g=e;const y=(t-e)/o,x=new z,M=new Be;for(let E=0;E<=o;E++){for(let S=0;S<=r;S++){const v=l+S/r*d;x.x=g*Math.cos(v),x.y=g*Math.sin(v),f.push(x.x,x.y,x.z),h.push(0,0,1),M.x=(x.x/t+1)/2,M.y=(x.y/t+1)/2,p.push(M.x,M.y)}g+=y}for(let E=0;E<o;E++){const S=E*(r+1);for(let v=0;v<r;v++){const w=v+S,A=w,P=w+r+1,B=w+r+2,U=w+1;c.push(A,P,U),c.push(P,B,U)}}this.setIndex(c),this.setAttribute("position",new Ft(f,3)),this.setAttribute("normal",new Ft(h,3)),this.setAttribute("uv",new Ft(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ac(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class lc extends Sn{constructor(e=1,t=32,r=16,o=0,l=Math.PI*2,d=0,c=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:r,phiStart:o,phiLength:l,thetaStart:d,thetaLength:c},t=Math.max(3,Math.floor(t)),r=Math.max(2,Math.floor(r));const f=Math.min(d+c,Math.PI);let h=0;const p=[],g=new z,y=new z,x=[],M=[],E=[],S=[];for(let v=0;v<=r;v++){const w=[],A=v/r;let P=0;v===0&&d===0?P=.5/t:v===r&&f===Math.PI&&(P=-.5/t);for(let B=0;B<=t;B++){const U=B/t;g.x=-e*Math.cos(o+U*l)*Math.sin(d+A*c),g.y=e*Math.cos(d+A*c),g.z=e*Math.sin(o+U*l)*Math.sin(d+A*c),M.push(g.x,g.y,g.z),y.copy(g).normalize(),E.push(y.x,y.y,y.z),S.push(U+P,1-A),w.push(h++)}p.push(w)}for(let v=0;v<r;v++)for(let w=0;w<t;w++){const A=p[v][w+1],P=p[v][w],B=p[v+1][w],U=p[v+1][w+1];(v!==0||d>0)&&x.push(A,P,U),(v!==r-1||f<Math.PI)&&x.push(P,B,U)}this.setIndex(x),this.setAttribute("position",new Ft(M,3)),this.setAttribute("normal",new Ft(E,3)),this.setAttribute("uv",new Ft(S,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new lc(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Rr extends ho{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Et(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Et(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Uv,this.normalScale=new Be(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Af extends rn{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Et(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}class oA extends Af{constructor(e,t,r){super(e,r),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(rn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Et(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Bd=new Ht,Bg=new z,Hg=new z;class l0{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Be(512,512),this.map=null,this.mapPass=null,this.matrix=new Ht,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new vf,this._frameExtents=new Be(1,1),this._viewportCount=1,this._viewports=[new Bt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,r=this.matrix;Bg.setFromMatrixPosition(e.matrixWorld),t.position.copy(Bg),Hg.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Hg),t.updateMatrixWorld(),Bd.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Bd),r.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),r.multiply(Bd)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Vg=new Ht,Qo=new z,Hd=new z;class aA extends l0{constructor(){super(new Xn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Be(4,2),this._viewportCount=6,this._viewports=[new Bt(2,1,1,1),new Bt(0,1,1,1),new Bt(3,1,1,1),new Bt(1,1,1,1),new Bt(3,0,1,1),new Bt(1,0,1,1)],this._cubeDirections=[new z(1,0,0),new z(-1,0,0),new z(0,0,1),new z(0,0,-1),new z(0,1,0),new z(0,-1,0)],this._cubeUps=[new z(0,1,0),new z(0,1,0),new z(0,1,0),new z(0,1,0),new z(0,0,1),new z(0,0,-1)]}updateMatrices(e,t=0){const r=this.camera,o=this.matrix,l=e.distance||r.far;l!==r.far&&(r.far=l,r.updateProjectionMatrix()),Qo.setFromMatrixPosition(e.matrixWorld),r.position.copy(Qo),Hd.copy(r.position),Hd.add(this._cubeDirections[t]),r.up.copy(this._cubeUps[t]),r.lookAt(Hd),r.updateMatrixWorld(),o.makeTranslation(-Qo.x,-Qo.y,-Qo.z),Vg.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Vg)}}class lA extends Af{constructor(e,t,r=0,o=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=r,this.decay=o,this.shadow=new aA}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class cA extends l0{constructor(){super(new Yv(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Gg extends Af{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(rn.DEFAULT_UP),this.updateMatrix(),this.target=new rn,this.shadow=new cA}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Wg{constructor(e=1,t=0,r=0){return this.radius=e,this.phi=t,this.theta=r,this}set(e,t,r){return this.radius=e,this.phi=t,this.theta=r,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,r){return this.radius=Math.sqrt(e*e+t*t+r*r),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,r),this.phi=Math.acos(tn(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ff}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ff);const jg={type:"change"},Vd={type:"start"},Xg={type:"end"},Yl=new gf,$g=new yr,uA=Math.cos(70*es.DEG2RAD);class dA extends as{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new z,this.cursor=new z,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ls.ROTATE,MIDDLE:Ls.DOLLY,RIGHT:Ls.PAN},this.touches={ONE:Ns.ROTATE,TWO:Ns.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return c.phi},this.getAzimuthalAngle=function(){return c.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(H){H.addEventListener("keydown",we),this._domElementKeyEvents=H},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",we),this._domElementKeyEvents=null},this.saveState=function(){r.target0.copy(r.target),r.position0.copy(r.object.position),r.zoom0=r.object.zoom},this.reset=function(){r.target.copy(r.target0),r.object.position.copy(r.position0),r.object.zoom=r.zoom0,r.object.updateProjectionMatrix(),r.dispatchEvent(jg),r.update(),l=o.NONE},this.update=function(){const H=new z,_e=new Xi().setFromUnitVectors(e.up,new z(0,1,0)),Ue=_e.clone().invert(),Re=new z,$e=new Xi,dt=new z,gt=2*Math.PI;return function(Le=null){const V=r.object.position;H.copy(V).sub(r.target),H.applyQuaternion(_e),c.setFromVector3(H),r.autoRotate&&l===o.NONE&&re(R(Le)),r.enableDamping?(c.theta+=f.theta*r.dampingFactor,c.phi+=f.phi*r.dampingFactor):(c.theta+=f.theta,c.phi+=f.phi);let Pe=r.minAzimuthAngle,Ne=r.maxAzimuthAngle;isFinite(Pe)&&isFinite(Ne)&&(Pe<-Math.PI?Pe+=gt:Pe>Math.PI&&(Pe-=gt),Ne<-Math.PI?Ne+=gt:Ne>Math.PI&&(Ne-=gt),Pe<=Ne?c.theta=Math.max(Pe,Math.min(Ne,c.theta)):c.theta=c.theta>(Pe+Ne)/2?Math.max(Pe,c.theta):Math.min(Ne,c.theta)),c.phi=Math.max(r.minPolarAngle,Math.min(r.maxPolarAngle,c.phi)),c.makeSafe(),r.enableDamping===!0?r.target.addScaledVector(p,r.dampingFactor):r.target.add(p),r.target.sub(r.cursor),r.target.clampLength(r.minTargetRadius,r.maxTargetRadius),r.target.add(r.cursor),r.zoomToCursor&&U||r.object.isOrthographicCamera?c.radius=Z(c.radius):c.radius=Z(c.radius*h),H.setFromSpherical(c),H.applyQuaternion(Ue),V.copy(r.target).add(H),r.object.lookAt(r.target),r.enableDamping===!0?(f.theta*=1-r.dampingFactor,f.phi*=1-r.dampingFactor,p.multiplyScalar(1-r.dampingFactor)):(f.set(0,0,0),p.set(0,0,0));let oe=!1;if(r.zoomToCursor&&U){let pe=null;if(r.object.isPerspectiveCamera){const tt=H.length();pe=Z(tt*h);const je=tt-pe;r.object.position.addScaledVector(P,je),r.object.updateMatrixWorld()}else if(r.object.isOrthographicCamera){const tt=new z(B.x,B.y,0);tt.unproject(r.object),r.object.zoom=Math.max(r.minZoom,Math.min(r.maxZoom,r.object.zoom/h)),r.object.updateProjectionMatrix(),oe=!0;const je=new z(B.x,B.y,0);je.unproject(r.object),r.object.position.sub(je).add(tt),r.object.updateMatrixWorld(),pe=H.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),r.zoomToCursor=!1;pe!==null&&(this.screenSpacePanning?r.target.set(0,0,-1).transformDirection(r.object.matrix).multiplyScalar(pe).add(r.object.position):(Yl.origin.copy(r.object.position),Yl.direction.set(0,0,-1).transformDirection(r.object.matrix),Math.abs(r.object.up.dot(Yl.direction))<uA?e.lookAt(r.target):($g.setFromNormalAndCoplanarPoint(r.object.up,r.target),Yl.intersectPlane($g,r.target))))}else r.object.isOrthographicCamera&&(r.object.zoom=Math.max(r.minZoom,Math.min(r.maxZoom,r.object.zoom/h)),r.object.updateProjectionMatrix(),oe=!0);return h=1,U=!1,oe||Re.distanceToSquared(r.object.position)>d||8*(1-$e.dot(r.object.quaternion))>d||dt.distanceToSquared(r.target)>0?(r.dispatchEvent(jg),Re.copy(r.object.position),$e.copy(r.object.quaternion),dt.copy(r.target),!0):!1}}(),this.dispose=function(){r.domElement.removeEventListener("contextmenu",He),r.domElement.removeEventListener("pointerdown",ot),r.domElement.removeEventListener("pointercancel",C),r.domElement.removeEventListener("wheel",ye),r.domElement.removeEventListener("pointermove",L),r.domElement.removeEventListener("pointerup",C),r._domElementKeyEvents!==null&&(r._domElementKeyEvents.removeEventListener("keydown",we),r._domElementKeyEvents=null)};const r=this,o={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let l=o.NONE;const d=1e-6,c=new Wg,f=new Wg;let h=1;const p=new z,g=new Be,y=new Be,x=new Be,M=new Be,E=new Be,S=new Be,v=new Be,w=new Be,A=new Be,P=new z,B=new Be;let U=!1;const I=[],ne={};function R(H){return H!==null?2*Math.PI/60*r.autoRotateSpeed*H:2*Math.PI/60/60*r.autoRotateSpeed}function D(H){const _e=Math.abs(H)/(100*(window.devicePixelRatio|0));return Math.pow(.95,r.zoomSpeed*_e)}function re(H){f.theta-=H}function ae(H){f.phi-=H}const me=function(){const H=new z;return function(Ue,Re){H.setFromMatrixColumn(Re,0),H.multiplyScalar(-Ue),p.add(H)}}(),F=function(){const H=new z;return function(Ue,Re){r.screenSpacePanning===!0?H.setFromMatrixColumn(Re,1):(H.setFromMatrixColumn(Re,0),H.crossVectors(r.object.up,H)),H.multiplyScalar(Ue),p.add(H)}}(),$=function(){const H=new z;return function(Ue,Re){const $e=r.domElement;if(r.object.isPerspectiveCamera){const dt=r.object.position;H.copy(dt).sub(r.target);let gt=H.length();gt*=Math.tan(r.object.fov/2*Math.PI/180),me(2*Ue*gt/$e.clientHeight,r.object.matrix),F(2*Re*gt/$e.clientHeight,r.object.matrix)}else r.object.isOrthographicCamera?(me(Ue*(r.object.right-r.object.left)/r.object.zoom/$e.clientWidth,r.object.matrix),F(Re*(r.object.top-r.object.bottom)/r.object.zoom/$e.clientHeight,r.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),r.enablePan=!1)}}();function J(H){r.object.isPerspectiveCamera||r.object.isOrthographicCamera?h/=H:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),r.enableZoom=!1)}function K(H){r.object.isPerspectiveCamera||r.object.isOrthographicCamera?h*=H:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),r.enableZoom=!1)}function X(H,_e){if(!r.zoomToCursor)return;U=!0;const Ue=r.domElement.getBoundingClientRect(),Re=H-Ue.left,$e=_e-Ue.top,dt=Ue.width,gt=Ue.height;B.x=Re/dt*2-1,B.y=-($e/gt)*2+1,P.set(B.x,B.y,1).unproject(r.object).sub(r.object.position).normalize()}function Z(H){return Math.max(r.minDistance,Math.min(r.maxDistance,H))}function Y(H){g.set(H.clientX,H.clientY)}function O(H){X(H.clientX,H.clientX),v.set(H.clientX,H.clientY)}function W(H){M.set(H.clientX,H.clientY)}function q(H){y.set(H.clientX,H.clientY),x.subVectors(y,g).multiplyScalar(r.rotateSpeed);const _e=r.domElement;re(2*Math.PI*x.x/_e.clientHeight),ae(2*Math.PI*x.y/_e.clientHeight),g.copy(y),r.update()}function fe(H){w.set(H.clientX,H.clientY),A.subVectors(w,v),A.y>0?J(D(A.y)):A.y<0&&K(D(A.y)),v.copy(w),r.update()}function ve(H){E.set(H.clientX,H.clientY),S.subVectors(E,M).multiplyScalar(r.panSpeed),$(S.x,S.y),M.copy(E),r.update()}function Te(H){X(H.clientX,H.clientY),H.deltaY<0?K(D(H.deltaY)):H.deltaY>0&&J(D(H.deltaY)),r.update()}function Ae(H){let _e=!1;switch(H.code){case r.keys.UP:H.ctrlKey||H.metaKey||H.shiftKey?ae(2*Math.PI*r.rotateSpeed/r.domElement.clientHeight):$(0,r.keyPanSpeed),_e=!0;break;case r.keys.BOTTOM:H.ctrlKey||H.metaKey||H.shiftKey?ae(-2*Math.PI*r.rotateSpeed/r.domElement.clientHeight):$(0,-r.keyPanSpeed),_e=!0;break;case r.keys.LEFT:H.ctrlKey||H.metaKey||H.shiftKey?re(2*Math.PI*r.rotateSpeed/r.domElement.clientHeight):$(r.keyPanSpeed,0),_e=!0;break;case r.keys.RIGHT:H.ctrlKey||H.metaKey||H.shiftKey?re(-2*Math.PI*r.rotateSpeed/r.domElement.clientHeight):$(-r.keyPanSpeed,0),_e=!0;break}_e&&(H.preventDefault(),r.update())}function Fe(H){if(I.length===1)g.set(H.pageX,H.pageY);else{const _e=mt(H),Ue=.5*(H.pageX+_e.x),Re=.5*(H.pageY+_e.y);g.set(Ue,Re)}}function ge(H){if(I.length===1)M.set(H.pageX,H.pageY);else{const _e=mt(H),Ue=.5*(H.pageX+_e.x),Re=.5*(H.pageY+_e.y);M.set(Ue,Re)}}function be(H){const _e=mt(H),Ue=H.pageX-_e.x,Re=H.pageY-_e.y,$e=Math.sqrt(Ue*Ue+Re*Re);v.set(0,$e)}function ze(H){r.enableZoom&&be(H),r.enablePan&&ge(H)}function ee(H){r.enableZoom&&be(H),r.enableRotate&&Fe(H)}function nt(H){if(I.length==1)y.set(H.pageX,H.pageY);else{const Ue=mt(H),Re=.5*(H.pageX+Ue.x),$e=.5*(H.pageY+Ue.y);y.set(Re,$e)}x.subVectors(y,g).multiplyScalar(r.rotateSpeed);const _e=r.domElement;re(2*Math.PI*x.x/_e.clientHeight),ae(2*Math.PI*x.y/_e.clientHeight),g.copy(y)}function ke(H){if(I.length===1)E.set(H.pageX,H.pageY);else{const _e=mt(H),Ue=.5*(H.pageX+_e.x),Re=.5*(H.pageY+_e.y);E.set(Ue,Re)}S.subVectors(E,M).multiplyScalar(r.panSpeed),$(S.x,S.y),M.copy(E)}function Qe(H){const _e=mt(H),Ue=H.pageX-_e.x,Re=H.pageY-_e.y,$e=Math.sqrt(Ue*Ue+Re*Re);w.set(0,$e),A.set(0,Math.pow(w.y/v.y,r.zoomSpeed)),J(A.y),v.copy(w);const dt=(H.pageX+_e.x)*.5,gt=(H.pageY+_e.y)*.5;X(dt,gt)}function Ve(H){r.enableZoom&&Qe(H),r.enablePan&&ke(H)}function wt(H){r.enableZoom&&Qe(H),r.enableRotate&&nt(H)}function ot(H){r.enabled!==!1&&(I.length===0&&(r.domElement.setPointerCapture(H.pointerId),r.domElement.addEventListener("pointermove",L),r.domElement.addEventListener("pointerup",C)),qe(H),H.pointerType==="touch"?Ze(H):se(H))}function L(H){r.enabled!==!1&&(H.pointerType==="touch"?Ie(H):Me(H))}function C(H){rt(H),I.length===0&&(r.domElement.releasePointerCapture(H.pointerId),r.domElement.removeEventListener("pointermove",L),r.domElement.removeEventListener("pointerup",C)),r.dispatchEvent(Xg),l=o.NONE}function se(H){let _e;switch(H.button){case 0:_e=r.mouseButtons.LEFT;break;case 1:_e=r.mouseButtons.MIDDLE;break;case 2:_e=r.mouseButtons.RIGHT;break;default:_e=-1}switch(_e){case Ls.DOLLY:if(r.enableZoom===!1)return;O(H),l=o.DOLLY;break;case Ls.ROTATE:if(H.ctrlKey||H.metaKey||H.shiftKey){if(r.enablePan===!1)return;W(H),l=o.PAN}else{if(r.enableRotate===!1)return;Y(H),l=o.ROTATE}break;case Ls.PAN:if(H.ctrlKey||H.metaKey||H.shiftKey){if(r.enableRotate===!1)return;Y(H),l=o.ROTATE}else{if(r.enablePan===!1)return;W(H),l=o.PAN}break;default:l=o.NONE}l!==o.NONE&&r.dispatchEvent(Vd)}function Me(H){switch(l){case o.ROTATE:if(r.enableRotate===!1)return;q(H);break;case o.DOLLY:if(r.enableZoom===!1)return;fe(H);break;case o.PAN:if(r.enablePan===!1)return;ve(H);break}}function ye(H){r.enabled===!1||r.enableZoom===!1||l!==o.NONE||(H.preventDefault(),r.dispatchEvent(Vd),Te(H),r.dispatchEvent(Xg))}function we(H){r.enabled===!1||r.enablePan===!1||Ae(H)}function Ze(H){switch(xe(H),I.length){case 1:switch(r.touches.ONE){case Ns.ROTATE:if(r.enableRotate===!1)return;Fe(H),l=o.TOUCH_ROTATE;break;case Ns.PAN:if(r.enablePan===!1)return;ge(H),l=o.TOUCH_PAN;break;default:l=o.NONE}break;case 2:switch(r.touches.TWO){case Ns.DOLLY_PAN:if(r.enableZoom===!1&&r.enablePan===!1)return;ze(H),l=o.TOUCH_DOLLY_PAN;break;case Ns.DOLLY_ROTATE:if(r.enableZoom===!1&&r.enableRotate===!1)return;ee(H),l=o.TOUCH_DOLLY_ROTATE;break;default:l=o.NONE}break;default:l=o.NONE}l!==o.NONE&&r.dispatchEvent(Vd)}function Ie(H){switch(xe(H),l){case o.TOUCH_ROTATE:if(r.enableRotate===!1)return;nt(H),r.update();break;case o.TOUCH_PAN:if(r.enablePan===!1)return;ke(H),r.update();break;case o.TOUCH_DOLLY_PAN:if(r.enableZoom===!1&&r.enablePan===!1)return;Ve(H),r.update();break;case o.TOUCH_DOLLY_ROTATE:if(r.enableZoom===!1&&r.enableRotate===!1)return;wt(H),r.update();break;default:l=o.NONE}}function He(H){r.enabled!==!1&&H.preventDefault()}function qe(H){I.push(H.pointerId)}function rt(H){delete ne[H.pointerId];for(let _e=0;_e<I.length;_e++)if(I[_e]==H.pointerId){I.splice(_e,1);return}}function xe(H){let _e=ne[H.pointerId];_e===void 0&&(_e=new Be,ne[H.pointerId]=_e),_e.set(H.pageX,H.pageY)}function mt(H){const _e=H.pointerId===I[0]?I[1]:I[0];return ne[_e]}r.domElement.addEventListener("contextmenu",He),r.domElement.addEventListener("pointerdown",ot),r.domElement.addEventListener("pointercancel",C),r.domElement.addEventListener("wheel",ye,{passive:!1}),this.update()}}class sf extends rn{constructor(e=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=e,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new Be(.5,.5),this.addEventListener("removed",function(){this.traverse(function(t){t.element instanceof Element&&t.element.parentNode!==null&&t.element.parentNode.removeChild(t.element)})})}copy(e,t){return super.copy(e,t),this.element=e.element.cloneNode(!0),this.center=e.center,this}}const qs=new z,Yg=new Ht,qg=new Ht,Kg=new z,Zg=new z;class fA{constructor(e={}){const t=this;let r,o,l,d;const c={objects:new WeakMap},f=e.element!==void 0?e.element:document.createElement("div");f.style.overflow="hidden",this.domElement=f,this.getSize=function(){return{width:r,height:o}},this.render=function(x,M){x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),M.parent===null&&M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),Yg.copy(M.matrixWorldInverse),qg.multiplyMatrices(M.projectionMatrix,Yg),h(x,x,M),y(x)},this.setSize=function(x,M){r=x,o=M,l=r/2,d=o/2,f.style.width=x+"px",f.style.height=M+"px"};function h(x,M,E){if(x.isCSS2DObject){qs.setFromMatrixPosition(x.matrixWorld),qs.applyMatrix4(qg);const S=x.visible===!0&&qs.z>=-1&&qs.z<=1&&x.layers.test(E.layers)===!0;if(x.element.style.display=S===!0?"":"none",S===!0){x.onBeforeRender(t,M,E);const w=x.element;w.style.transform="translate("+-100*x.center.x+"%,"+-100*x.center.y+"%)translate("+(qs.x*l+l)+"px,"+(-qs.y*d+d)+"px)",w.parentNode!==f&&f.appendChild(w),x.onAfterRender(t,M,E)}const v={distanceToCameraSquared:p(E,x)};c.objects.set(x,v)}for(let S=0,v=x.children.length;S<v;S++)h(x.children[S],M,E)}function p(x,M){return Kg.setFromMatrixPosition(x.matrixWorld),Zg.setFromMatrixPosition(M.matrixWorld),Kg.distanceToSquared(Zg)}function g(x){const M=[];return x.traverse(function(E){E.isCSS2DObject&&M.push(E)}),M}function y(x){const M=g(x).sort(function(S,v){if(S.renderOrder!==v.renderOrder)return v.renderOrder-S.renderOrder;const w=c.objects.get(S).distanceToCameraSquared,A=c.objects.get(v).distanceToCameraSquared;return w-A}),E=M.length;for(let S=0,v=M.length;S<v;S++)M[S].element.style.zIndex=E-S}}}class hA extends n0{constructor(e=null){super();const t=new Ti;t.deleteAttribute("uv");const r=new Rr({side:Rn}),o=new Rr;let l=5;e!==null&&e._useLegacyLights===!1&&(l=900);const d=new lA(16777215,l,28,2);d.position.set(.418,16.199,.3),this.add(d);const c=new Rt(t,r);c.position.set(-.757,13.219,.717),c.scale.set(31.713,28.305,28.591),this.add(c);const f=new Rt(t,o);f.position.set(-10.906,2.009,1.846),f.rotation.set(0,-.195,0),f.scale.set(2.328,7.905,4.651),this.add(f);const h=new Rt(t,o);h.position.set(-5.607,-.754,-.758),h.rotation.set(0,.994,0),h.scale.set(1.97,1.534,3.955),this.add(h);const p=new Rt(t,o);p.position.set(6.167,.857,7.803),p.rotation.set(0,.561,0),p.scale.set(3.927,6.285,3.687),this.add(p);const g=new Rt(t,o);g.position.set(-2.017,.018,6.124),g.rotation.set(0,.333,0),g.scale.set(2.002,4.566,2.064),this.add(g);const y=new Rt(t,o);y.position.set(2.291,-.756,-2.621),y.rotation.set(0,-.286,0),y.scale.set(1.546,1.552,1.496),this.add(y);const x=new Rt(t,o);x.position.set(-2.193,-.369,-5.547),x.rotation.set(0,.516,0),x.scale.set(3.875,3.487,2.986),this.add(x);const M=new Rt(t,Ks(50));M.position.set(-16.116,14.37,8.208),M.scale.set(.1,2.428,2.739),this.add(M);const E=new Rt(t,Ks(50));E.position.set(-16.109,18.021,-8.207),E.scale.set(.1,2.425,2.751),this.add(E);const S=new Rt(t,Ks(17));S.position.set(14.904,12.198,-1.832),S.scale.set(.15,4.265,6.331),this.add(S);const v=new Rt(t,Ks(43));v.position.set(-.462,8.89,14.52),v.scale.set(4.38,5.441,.088),this.add(v);const w=new Rt(t,Ks(20));w.position.set(3.235,11.486,-12.541),w.scale.set(2.5,2,.1),this.add(w);const A=new Rt(t,Ks(100));A.position.set(0,20,0),A.scale.set(1,.1,1),this.add(A)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function Ks(s){const e=new ro;return e.color.setScalar(s),e}function pA(s,e=Math.PI/3){const t=Math.cos(e),r=(1+1e-10)*100,o=[new z,new z,new z],l=new z,d=new z,c=new z,f=new z;function h(E){const S=~~(E.x*r),v=~~(E.y*r),w=~~(E.z*r);return`${S},${v},${w}`}const p=s.index?s.toNonIndexed():s,g=p.attributes.position,y={};for(let E=0,S=g.count/3;E<S;E++){const v=3*E,w=o[0].fromBufferAttribute(g,v+0),A=o[1].fromBufferAttribute(g,v+1),P=o[2].fromBufferAttribute(g,v+2);l.subVectors(P,A),d.subVectors(w,A);const B=new z().crossVectors(l,d).normalize();for(let U=0;U<3;U++){const I=o[U],ne=h(I);ne in y||(y[ne]=[]),y[ne].push(B)}}const x=new Float32Array(g.count*3),M=new $n(x,3,!1);for(let E=0,S=g.count/3;E<S;E++){const v=3*E,w=o[0].fromBufferAttribute(g,v+0),A=o[1].fromBufferAttribute(g,v+1),P=o[2].fromBufferAttribute(g,v+2);l.subVectors(P,A),d.subVectors(w,A),c.crossVectors(l,d).normalize();for(let B=0;B<3;B++){const U=o[B],I=h(U),ne=y[I];f.set(0,0,0);for(let R=0,D=ne.length;R<D;R++){const re=ne[R];c.dot(re)>t&&f.add(re)}f.normalize(),M.setXYZ(v+B,f.x,f.y,f.z)}}return p.setAttribute("normal",M),p}const kn={bg:724242,crimson:16735029,ice:8176895,robot:11844552},mA={float32:Float32Array,uint16:Uint16Array,uint32:Uint32Array,int16:Int16Array,uint8:Uint8Array},c0=new z(0,0,1),gA=new z(0,1,0),ql=new Map;function cc(s){const e=atob(s.b64),t=new Uint8Array(e.length);for(let r=0;r<e.length;r++)t[r]=e.charCodeAt(r);return new mA[s.dtype](t.buffer)}async function u0(s){const e=await fetch(s);if(!e.ok)throw new Error(`${s}: HTTP ${e.status}`);return e.json()}function vA(s){return ql.has(s)||ql.set(s,u0(s).catch(e=>{throw ql.delete(s),e})),ql.get(s)}const xA=`
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
`;function _A(){if(document.getElementById("nr-style"))return;const s=document.createElement("style");s.id="nr-style",s.textContent=xA,document.head.appendChild(s)}function Jt(s,e,t){const r=document.createElement(s);return e&&(r.className=e),t!=null&&(r.innerHTML=t),r}const Jg='<svg viewBox="0 0 16 16"><path d="M4 2.5v11l9-5.5z"/></svg>',yA='<svg viewBox="0 0 16 16"><path d="M3.5 2.5h3v11h-3zM9.5 2.5h3v11h-3z"/></svg>';function SA(s){const t=document.createElement("canvas");t.width=t.height=512;const r=t.getContext("2d");r.fillStyle="#0f1218",r.fillRect(0,0,512,512),r.strokeStyle="rgba(139,147,167,0.10)",r.lineWidth=2;for(let l=1;l<4;l++){const d=l*512/4;r.beginPath(),r.moveTo(d,0),r.lineTo(d,512),r.moveTo(0,d),r.lineTo(512,d),r.stroke()}r.strokeStyle="rgba(139,147,167,0.24)",r.lineWidth=3,r.strokeRect(0,0,512,512);const o=new WT(t);return o.wrapS=o.wrapT=ec,o.anisotropy=s.capabilities.getMaxAnisotropy(),o.colorSpace=dn,o}function MA(s){const e=s.size;switch(s.type){case"box":return new Ti(2*e[0],2*e[1],2*e[2]);case"sphere":return new lc(e[0],24,16);case"ellipsoid":return new lc(1,24,16).scale(e[0],e[1],e[2]);case"capsule":return new Ef(e[0],2*e[1],8,16).rotateX(Math.PI/2);case"cylinder":return new ha(e[0],e[0],2*e[1],24).rotateX(Math.PI/2);default:return null}}function EA(s){const e=new Sn;e.setAttribute("position",new $n(cc(s.vert),3)),e.setIndex(new $n(cc(s.face),1));const t=pA(e,es.degToRad(40));return e.dispose(),t.computeBoundingSphere(),t}function wA(s){const e=new wr,t=new Rt(new ha(1,1,1,16).translate(0,.5,0),s),r=new Rt(new Tf(1,1,24).translate(0,.5,0),s);return t.castShadow=r.castShadow=!0,e.add(t,r),e.visible=!1,e.set=(o,l,d,c)=>{const f=Math.min(d*.38,.1);t.scale.set(c,d-f,c),r.scale.set(c*2.6,f,c*2.6),r.position.y=d-f,e.position.copy(o),e.quaternion.setFromUnitVectors(gA,l)},e}function of(s){const e=document.createElement("div");return e.appendChild(s),e}function TA(s){return 1-(1-s)*(1-s)}function AA(s,e,t,r,o){const{assets:l,meshGeos:d,track:c}=s,f=e.overlays||{},h=new wr,p=f.start?f.start.yaw:0,g=f.start?f.start.origin:[0,0];h.quaternion.setFromAxisAngle(c0,-p),h.position.set(-g[0],-g[1],0).applyQuaternion(h.quaternion).add(new z(0,r,0));const y=cc(e.pos),x=cc(e.quat),M=e.bodies.length,E=e.n_frames,S=new Map(e.bodies.map((ge,be)=>[ge,be])),v=new Map((f.weak||[]).map(ge=>[ge.body,ge.amount])),w=l.bodies.map((ge,be)=>{const ze=new wr;return ze.userData.k=S.has(ge.name)?S.get(ge.name):-1,h.add(ze),ze}),A=new Et(kn.robot),P=new Et(kn.crimson),B=l.bodies.map((ge,be)=>{var nt;const ze=v.get(be)||0,ee=new Rr({color:s.modelColors?new Et().fromArray(((nt=l.geoms.find(ke=>ke.body===be))==null?void 0:nt.rgba)||[.7,.7,.7]):A.clone(),metalness:.35,roughness:.42,envMapIntensity:.9});return ze>0&&(ee.color.lerp(P,ze),ee.emissive=P.clone(),ee.emissiveIntensity=.35*ze),o&&(ee.transparent=!0,ee.opacity=.3,ee.depthWrite=!1),c(ee)});for(const ge of l.geoms){const be=ge.type==="mesh"?d[ge.mesh]:c(MA(ge));if(!be)continue;const ze=new Rt(be,B[ge.body]);ze.position.fromArray(ge.pos),ze.quaternion.set(ge.quat[1],ge.quat[2],ge.quat[3],ge.quat[0]),ze.castShadow=!o,ze.receiveShadow=!0,w[ge.body].add(ze)}const U=Math.max(0,l.bodies.findIndex(ge=>ge.name==="trunk")),I=w[U];if(f.payload){const ge=f.payload,be=ge.half_size,ze=new Rt(c(new Ti(2*be[0],2*be[1],2*be[2])),c(new Rr({color:kn.crimson,roughness:.55,metalness:.1,emissive:kn.crimson,emissiveIntensity:.25})));ze.position.fromArray(ge.pos),ze.castShadow=!0,w[ge.body].add(ze)}const ne=c(new ro({color:kn.ice,transparent:!0,opacity:.55,depthWrite:!1})),R=c(new wf(.055,32)),D=(f.slippery_feet||[]).map(ge=>{const be=new Rt(R,ne);return be.renderOrder=2,h.add(be),{mesh:be,body:w[ge.body],local:new z().fromArray(ge.pos)}}),re=c(new Rr({color:kn.crimson,emissive:kn.crimson,emissiveIntensity:.6,transparent:!0})),ae=wA(re);h.add(ae);const me=(f.pushes||[]).map(ge=>({...ge,f:new z().fromArray(ge.force)})),F=Jt("div","nr-tag red"),$=new sf(of(F));$.visible=!1,h.add($);const J=e.fall_time,K={};if(J!=null){const ge=c(new ro({color:kn.crimson,transparent:!0,opacity:0,depthWrite:!1,side:Ei})),be=c(new ro({color:kn.crimson,transparent:!0,opacity:0,depthWrite:!1}));K.ring=new Rt(c(new ac(.92,1,64)),ge),K.mark=new Rt(c(new ac(.1,.13,48)),be),K.ring.renderOrder=K.mark.renderOrder=3,h.add(K.ring,K.mark)}const X=Jt("div","nr-label",'<span></span><span class="nr-pill"></span>');X.firstChild.textContent=t;const Z=X.lastChild,Y=new sf(of(X));h.add(Y);const O=new Xi,W=new Xi,q=new z,fe=new z,ve=new z,Te=e.duration;function Ae(ge){const be=es.clamp(ge/e.dt,0,E-1),ze=Math.floor(be),ee=Math.min(ze+1,E-1),nt=be-ze;for(const ke of w){const Qe=ke.userData.k;if(Qe<0)continue;const Ve=(ze*M+Qe)*3,wt=(ee*M+Qe)*3;ke.position.set(y[Ve]+(y[wt]-y[Ve])*nt,y[Ve+1]+(y[wt+1]-y[Ve+1])*nt,y[Ve+2]+(y[wt+2]-y[Ve+2])*nt);const ot=(ze*M+Qe)*4,L=(ee*M+Qe)*4;O.set(x[ot+1],x[ot+2],x[ot+3],x[ot]),W.set(x[L+1],x[L+2],x[L+3],x[L]),ke.quaternion.slerpQuaternions(O,W,nt)}}J!=null&&(Ae(J),K.ring.position.set(I.position.x,I.position.y,.006),K.mark.position.copy(K.ring.position));function Fe(ge){Ae(ge);for(const nt of D)q.copy(nt.local).applyQuaternion(nt.body.quaternion).add(nt.body.position),nt.mesh.position.set(q.x,q.y,.004);let be=0;ve.set(0,0,0);for(const nt of me)ge>=nt.t0&&ge<nt.t1?(ve.add(nt.f),be=1):ge>=nt.t1&&ge<nt.t1+.25&&be<1&&(ve.add(nt.f),be=Math.max(be,1-(ge-nt.t1)/.25));const ze=ve.length();if(ae.visible=$.visible=ze>1&&be>0,ae.visible){ve.divideScalar(ze);const nt=.25+.45*Math.min(ze,300)/150,ke=q.copy(I.position).addScaledVector(ve,-.1);fe.copy(ke).addScaledVector(ve,-nt),ae.set(fe,ve,nt,.012+.02*Math.min(ze,300)/150),re.opacity=be,$.position.copy(fe).add(q.set(0,0,.08)),F.textContent=`PUSH ${Math.round(ze)} N`,F.style.opacity=be}Y.position.copy(I.position).add(q.set(0,0,.36));let ee=0;if(J!=null){const nt=ge-J,ke=nt>=0;if(Z.className=ke?"nr-pill fell":"nr-pill",Z.textContent=ke?`FELL ${J.toFixed(2)} s`:"",ke){const Qe=Math.min(1,nt/.8);K.ring.scale.setScalar(.12+.85*TA(Qe)),K.ring.material.opacity=.9*(1-Qe),K.mark.material.opacity=.9,ee=.8*Math.max(0,1-nt/.45)}else K.ring.material.opacity=K.mark.material.opacity=0}else{const nt=ge>=Te-.001;Z.className=nt?"nr-pill held":"nr-pill",Z.textContent=nt?"HELD":""}return ee}return{root:h,trunk:I,update:Fe,duration:Te,fallT:J,label:t,labelEl:X}}async function bA(s,e={}){const{assetsUrl:t="assets/go1_scene.json",trajUrls:r=[],trajs:o=null,layout:l="side",spacing:d=1.1,autoplay:c=!0,loop:f=!0,speed:h=1,startTime:p=0,hud:g=!0,modelColors:y=!1,onTime:x=null}=e;_A();const M=Jt("div","nr");M.tabIndex=0;const E=Jt("div","nr-stage"),S=Jt("div","nr-msg","loading replay…");E.appendChild(S),M.appendChild(E),s.appendChild(M);let v,w;try{[v,w]=await Promise.all([e.assets?Promise.resolve(e.assets):vA(t),o?Promise.resolve(o):Promise.all(r.map(oe=>u0(typeof oe=="string"?oe:oe.url)))])}catch(oe){return S.textContent=`replay unavailable: ${oe.message}`,{setTime(){},play(){},pause(){},setSpeed(){},dispose(){M.remove()},error:oe}}S.remove();const A=w.map((oe,pe)=>r[pe]&&r[pe].label||oe.label||["Original","Nemesis-trained"][pe]||`Robot ${pe+1}`),P=new Set,B=oe=>(oe&&P.add(oe),oe),U=new t0({antialias:!0,powerPreference:"high-performance"});U.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),U.shadowMap.enabled=!0,U.shadowMap.type=Mv,U.toneMapping=wv,U.toneMappingExposure=1.05,U.setClearColor(kn.bg,1),E.appendChild(U.domElement);const I=new fA;I.domElement.className="nr-labels",E.appendChild(I.domElement);const ne=Jt("div","nr-hud"),R=Jt("div","nr-flash");E.append(R,ne);const D=new n0;D.background=new Et(kn.bg),D.fog=new _f(kn.bg,5,16);const re=new tf(U),ae=re.fromScene(new hA(U),.04).texture;D.environment=ae;const me=new Xn(38,16/9,.05,60);me.up.copy(c0),D.add(new oA(13095678,724242,.55));const F=new Gg(16777215,2.2);F.castShadow=!0,F.shadow.mapSize.set(2048,2048),Object.assign(F.shadow.camera,{left:-2.5,right:2.5,top:2.5,bottom:-2.5,near:.5,far:14}),F.shadow.bias=-4e-4,F.shadow.normalBias=.02,F.shadow.radius=4,F.shadow.camera.updateProjectionMatrix(),D.add(F,F.target);const $=new Gg(9684477,.9);D.add($,$.target);const J=new wr;D.add(J);const K=w[0].overlays||{};if(K.slope){const{pitch:oe,roll:pe}=K.slope,tt=new z(-Math.sin(oe)*Math.cos(pe),Math.sin(pe),-Math.cos(oe)*Math.cos(pe));J.quaternion.setFromUnitVectors(tt,new z(0,0,-1))}const X=B(SA(U)),Z=60;X.repeat.set(Z,Z);const Y=new Rt(B(new yc(Z,Z)),B(new Rr({map:X,roughness:.92,metalness:0,envMapIntensity:.25})));Y.position.set(Z/2-6,0,v.floor&&v.floor.z||0),Y.receiveShadow=!0,J.add(Y);const O=w.length,W=l==="ghost"&&O>1,q=w.map((oe,pe)=>W?0:((O-1)/2-pe)*d);if(K.terrain&&(K.terrain.steps||[]).length){const oe=Math.max(K.terrain.width||3,1.8+(W?0:d*(O-1))),pe=B(new Rr({color:2763567,roughness:.85,metalness:0,envMapIntensity:.3})),tt=B(new rf({color:kn.crimson,transparent:!0,opacity:.55}));for(const je of K.terrain.steps){const ht=je.x1-je.x0,Tt=je.height;if(ht<=0||Tt<=0)continue;const yt=new Rt(B(new Ti(ht,oe,Tt)),pe);yt.position.set(je.x0+ht/2,0,Tt/2),yt.castShadow=!0,yt.receiveShadow=!0;const $t=new i0(B(new Sn().setFromPoints([new z(-ht/2,-oe/2,Tt/2+.001),new z(-ht/2,oe/2,Tt/2+.001)])),tt);yt.add($t),J.add(yt)}}if(K.ice){const oe=K.ice,pe=1.8+(W?0:d*(O-1)),tt=new Rt(B(new Ti(oe.length,pe,.006)),B(new Rr({color:3906815,transparent:!0,opacity:.26,roughness:.15,metalness:0,envMapIntensity:.2,emissive:1929174,emissiveIntensity:.45,depthWrite:!1})));tt.position.set(oe.start+oe.length/2,0,.004),tt.renderOrder=1;const je=new GT(B(new sA(tt.geometry)),B(new rf({color:kn.ice,transparent:!0,opacity:.7})));tt.add(je),J.add(tt);const ht=Jt("div","nr-tag");ht.textContent=`ICE μ ${oe.mu}`,ht.style.marginLeft="60px";const Tt=new sf(of(ht));Tt.position.set(oe.start+.05,pe/2-.15,.02),J.add(Tt)}const fe=v.meshes.map(oe=>B(EA(oe))),ve={assets:v,meshGeos:fe,track:B,modelColors:y},Te=w.map((oe,pe)=>AA(ve,oe,A[pe],q[pe],W&&pe===0));Te.forEach(oe=>J.add(oe.root)),W&&Te.forEach((oe,pe)=>{oe.labelEl.style.transform=`translateX(${pe?"calc(50% + 4px)":"calc(-50% - 4px)"})`});const Ae=Math.max(...Te.map(oe=>oe.duration)),Fe=oe=>(v.sites?Object.keys(v.sites).length:4)===oe.length;if(g){const oe=[],pe=(je,ht)=>{const Tt=Jt("span","nr-chip");Tt.textContent=je,ht&&(Tt.dataset.key=ht),ne.appendChild(Tt),oe.push(Tt)};if(K.terrain&&(K.terrain.steps||[]).length){const je=K.terrain.steps,ht=Math.round(je[0].height*100);pe(je.length===1?`${ht} cm curb`:`${je.length} steps × ${ht} cm`)}if(K.ice&&pe(`ice μ ${+(+K.ice.mu).toFixed(2)}, ${+(+K.ice.length).toFixed(1)} m patch`),(K.slippery_feet||[]).length){const je=K.slippery_feet,ht=+Math.min(...je.map(Tt=>Tt.mu)).toFixed(2);pe(je.length>=4||je.length===2&&Fe(je)?`slippery floor μ ${ht}`:`slippery ${je.map(Tt=>Tt.site).join(" ")} μ ${ht}`)}K.payload&&pe(`${+(+K.payload.mass).toFixed(1)} kg load`),(K.pushes||[]).forEach((je,ht)=>pe(`${Math.round(je.magnitude)} N shove at ${(+je.t0).toFixed(1)} s`,`push${ht}`));for(const je of K.weak||[])pe(`${je.name.replace("_"," ")} at ${Math.round(je.strength*100)}%`);if(K.slope){const je=ht=>Math.round(es.radToDeg(ht)*10)/10;Math.abs(K.slope.pitch)>1e-4&&pe(`slope ${je(Math.abs(K.slope.pitch))}° ${K.slope.pitch>0?"uphill":"downhill"}`),Math.abs(K.slope.roll)>1e-4&&pe(`side slope ${je(K.slope.roll)}°`)}const tt=K.conditions||{};tt.latency&&pe(`${Math.round(tt.latency)*20} ms lag`),tt.obs_noise&&pe("sensor noise"),tt.joint_friction&&pe(`joint friction ×${tt.joint_friction}`),ne.chips=oe}const ge=Jt("div","nr-bar"),be=Jt("button","nr-play",Jg);be.setAttribute("aria-label","Play");const ze=Jt("div","nr-track"),ee=Jt("div","nr-rail"),nt=Jt("div","nr-fill");ee.appendChild(nt),ze.appendChild(ee);for(const oe of K.pushes||[]){const pe=Jt("div","nr-band");pe.style.left=`${100*oe.t0/Ae}%`,pe.style.width=`${100*(oe.t1-oe.t0)/Ae}%`,pe.title=`push ${Math.round(oe.magnitude)} N`,ze.appendChild(pe)}Te.forEach(oe=>{if(oe.fallT==null)return;const pe=Jt("div","nr-mark");pe.style.left=`${100*oe.fallT/Ae}%`,pe.title=`${oe.label} fell at ${oe.fallT.toFixed(2)} s`,ze.appendChild(pe)});const ke=Jt("input","nr-range");Object.assign(ke,{type:"range",min:0,max:Ae,step:.001,value:0}),ke.setAttribute("aria-label","Replay time"),ze.appendChild(ke);const Qe=Jt("div","nr-time"),Ve=Jt("div","nr-speed"),wt=[.25,.5,1],ot=wt.map(oe=>{const pe=Jt("button","",`${oe}×`);return pe.onclick=()=>st.setSpeed(oe),Ve.appendChild(pe),pe});ge.append(be,ze,Qe,Ve),M.appendChild(ge);let L=es.clamp(p,0,Ae),C=!1,se=h,Me=0,ye=0,we=performance.now(),Ze=!0,Ie=!1,He=!1;const qe=new dA(me,U.domElement);qe.enableDamping=!0,qe.dampingFactor=.08,qe.minDistance=.6,qe.maxDistance=12,qe.maxPolarAngle=es.degToRad(86),qe.addEventListener("start",()=>{He=!0});const rt=new z,xe=new z,mt=new z;function H(oe){oe.set(0,0,0);for(const pe of Te)oe.add(pe.trunk.getWorldPosition(mt));return oe.divideScalar(Te.length)}const _e=new z(-1.55,-2.25,1.05);function Ue(){const oe=me.aspect,pe=(oe<1.2?1.2/oe:1)**.6*(W||O===1?.85:1);qe.target.copy(rt),me.position.copy(rt).addScaledVector(_e,pe)}function Re(){const oe=E.clientWidth,pe=E.clientHeight;!oe||!pe||(U.setSize(oe,pe,!1),I.setSize(oe,pe),me.aspect=oe/pe,me.updateProjectionMatrix(),He||Ue())}function $e(oe){C=oe,be.innerHTML=oe?yA:Jg,be.setAttribute("aria-label",oe?"Pause":"Play")}function dt(){let oe=0;for(const pe of Te)oe=Math.max(oe,pe.update(L));if(J.updateMatrixWorld(!0),R.style.opacity=oe.toFixed(3),ke.value=L,nt.style.width=`${100*L/Ae}%`,Qe.textContent=`${L.toFixed(2)} / ${Ae.toFixed(2)} s`,ne.chips)for(const pe of ne.chips){const tt=pe.dataset.key;if(!tt)continue;const je=K.pushes[+tt.slice(4)];pe.classList.toggle("on",L>=je.t0&&L<je.t1+.25)}x&&x(L)}function gt(oe){ye=requestAnimationFrame(gt);const pe=Math.max(0,Math.min(.25,(oe-we)/1e3));if(we=oe,!Ze)return;C&&(L>=Ae?(Me+=pe,f?Me>1.2&&(L=0,Me=0):$e(!1)):L=Math.min(Ae,L+pe*se),dt()),H(xe);const tt=rt.clone();rt.lerp(xe,1-Math.exp(-pe*3.5));const je=tt.sub(rt).negate();me.position.add(je),qe.target.copy(rt),qe.update(),F.target.position.copy(rt),F.position.copy(rt).add(xe.set(1.8,-2.4,5)),$.target.position.copy(rt),$.position.copy(rt).add(xe.set(-3,3,1.5)),U.render(D,me),I.render(D,me)}const st={get time(){return L},duration:Ae,setTime(oe){L=es.clamp(+oe||0,0,Ae),Me=0,dt()},play(){L>=Ae&&(L=0),Me=0,$e(!0)},pause(){$e(!1)},toggle(){C?st.pause():st.play()},setSpeed(oe){se=oe,ot.forEach((pe,tt)=>pe.classList.toggle("on",wt[tt]===oe))},resetCamera(){He=!1,Ue()},dispose(){if(!Ie){Ie=!0,cancelAnimationFrame(ye),Pe.disconnect(),Ne.disconnect(),M.removeEventListener("keydown",V),qe.dispose();for(const oe of P)oe.dispose();ae.dispose(),re.dispose(),U.dispose(),U.forceContextLoss(),M.remove()}}};be.onclick=()=>st.toggle();let Le=!1;ke.addEventListener("pointerdown",()=>{Le=C,$e(!1)}),ke.addEventListener("input",()=>st.setTime(ke.value)),ke.addEventListener("change",()=>{Le&&(Le=!1,$e(!0))});const V=oe=>{oe.target===ke&&oe.key.startsWith("Arrow")||(oe.key===" "||oe.key==="k"?(oe.preventDefault(),st.toggle()):(oe.key==="ArrowRight"||oe.key==="ArrowLeft")&&(oe.preventDefault(),st.pause(),st.setTime(L+(oe.key==="ArrowRight"?1:-1)*w[0].dt)))};M.addEventListener("keydown",V);const Pe=new ResizeObserver(Re);Pe.observe(E);const Ne=new IntersectionObserver(oe=>{Ze=oe[0].isIntersecting,we=performance.now()});return Ne.observe(M),st.setSpeed(h),dt(),H(rt),Re(),Ue(),c&&st.play(),ye=requestAnimationFrame(gt),st}function uc({trajs:s,className:e="",hud:t=!0}){const r=ue.useRef(null),o=JSON.stringify(s.map(l=>l.url||l.label||l.n_frames));return ue.useEffect(()=>{if(!r.current||!s.length)return;let l,d=!1;const c=s.every(f=>!f.url);return bA(r.current,{assetsUrl:"/assets/go1_scene.json",hud:t,...c?{trajs:s}:{trajUrls:s.map(f=>({url:f.url,label:f.label}))}}).then(f=>{d?f.dispose():l=f}),()=>{d=!0,l==null||l.dispose()}},[o]),b.jsx("div",{ref:r,className:`replay-fill overflow-hidden ${e}`})}const CA=["Slipping while turning","Carrying a heavy backpack","Weak motors on one side"];function RA(){const[s,e]=ue.useState(null),[t,r]=ue.useState([]),[o,l]=ue.useState(!1),[d,c]=ue.useState(""),[f,h]=ue.useState(null),p=async x=>{e(x),l(!0),c(""),r([]),h(null);try{const{job:M}=await rs("/api/agent",{goal:x});await cf(M,E=>r(S=>{var v;return E.stage==="progress"&&((v=S.at(-1))==null?void 0:v.stage)==="progress"?[...S.slice(0,-1),E]:[...S,E]}))}catch(M){c(M.message)}l(!1)};ue.useEffect(()=>{const x=new URLSearchParams(location.search).get("q");x&&p(x)},[]);const g=ue.useMemo(()=>{const x={};for(const M of t)M.stage==="failure"&&(x[M.id]={id:M.id,hypothesis:M.hypothesis,fall_rate:M.fall_rate,trajs:M.trajs,clip:M.clip}),M.stage==="diagnosis"&&x[M.id]&&(x[M.id].diagnosis=M),M.stage==="margin"&&x[M.id]&&(x[M.id].margin=M);return Object.values(x)},[t]),y=g.find(x=>x.id===f)||g.at(-1);return ue.useEffect(()=>{g.length&&h(g.at(-1).id)},[g.length]),s===null?b.jsxs("div",{className:"mx-auto flex min-h-[calc(100dvh-10rem)] max-w-2xl flex-col justify-center pb-16",children:[b.jsx("h1",{className:"text-center text-[40px] font-medium leading-[1.05] tracking-[-0.035em] sm:text-[52px]",children:"What should Muse test?"}),b.jsx("p",{className:"mx-auto mt-4 max-w-md text-center text-base leading-[1.55] text-ink/70",children:"Muse forms hypotheses, simulates them on the live robot, watches every fall, and retrains it."}),b.jsx("div",{className:"mt-10",children:b.jsx(Qg,{onSend:p})}),b.jsx("div",{className:"mt-4 flex flex-wrap justify-center gap-2",children:CA.map(x=>b.jsx("button",{onClick:()=>p(x),className:"rounded-full border border-white/12 bg-white/[.04] px-3 py-1.5 text-[13px] text-ink/85 transition-colors hover:border-white/30 hover:bg-white/[.09]",children:x},x))})]}):b.jsxs("div",{className:"grid gap-5 lg:h-[calc(100dvh-8.5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]",children:[b.jsxs("section",{className:"flex min-h-[60dvh] flex-col overflow-hidden rounded-2xl border border-line bg-panel lg:min-h-0",children:[b.jsx(PA,{prompt:s,events:t,running:o,error:d,selected:y==null?void 0:y.id,onSelect:h}),b.jsx("div",{className:"border-t border-line p-3",children:b.jsx(Qg,{onSend:p,disabled:o,placeholder:o?"Muse is working…":"Ask Muse to test something else"})})]}),b.jsxs("section",{className:"flex min-h-[60dvh] flex-col overflow-hidden rounded-2xl border border-line bg-panel lg:min-h-0",children:[y?b.jsx(LA,{o:y}):b.jsx("div",{className:"grid flex-1 place-items-center p-8 text-center",children:b.jsxs("div",{children:[o?b.jsx(uf,{size:20,className:"mx-auto animate-spin text-faint"}):null,b.jsx("p",{className:"mt-3 text-sm text-mute",children:o?"Failures Muse finds will play here.":"No failures found."})]})}),g.length>1&&b.jsx("div",{className:"flex gap-2 overflow-x-auto border-t border-line p-3",children:g.map((x,M)=>b.jsxs("button",{onClick:()=>h(x.id),className:`flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-[13px] transition-colors ${x.id===(y==null?void 0:y.id)?"border-white/30 bg-white/10 text-ink":"border-white/10 text-mute hover:text-ink"}`,children:[b.jsx("span",{className:"font-mono text-xs text-faint",children:M+1})," fell ",nn(x.fall_rate)]},x.id))})]})]})}function Qg({onSend:s,disabled:e,placeholder:t="e.g. slipping while turning"}){const[r,o]=ue.useState(""),l=()=>{r.trim().length>=2&&!e&&(s(r.trim()),o(""))};return b.jsxs("div",{className:"flex items-center gap-2 rounded-2xl border border-white/12 bg-bg py-2 pr-2 pl-4 focus-within:border-white/30",children:[b.jsx("input",{value:r,onChange:d=>o(d.target.value),onKeyDown:d=>d.key==="Enter"&&l(),disabled:e,placeholder:t,className:"min-w-0 flex-1 bg-transparent py-1.5 text-base outline-none placeholder:text-mute/80 disabled:opacity-60"}),b.jsx("button",{onClick:l,disabled:e||r.trim().length<2,className:`grid size-9 shrink-0 place-items-center rounded-full transition-colors ${r.trim().length>=2&&!e?"bg-ember text-black":"bg-white/[.07] text-mute"}`,children:b.jsx(yv,{size:18})})]})}function PA({prompt:s,events:e,running:t,error:r,selected:o,onSelect:l}){const d=ue.useRef(null);ue.useEffect(()=>{var p;(p=d.current)==null||p.scrollIntoView({behavior:"smooth",block:"end"})},[e.length]);const c=[];let f=null;for(const p of e)p.stage==="say"?c.push({kind:"say",text:p.text}):p.stage==="tool_call"&&p.tool==="test_hypothesis"?(f={kind:"test",text:p.args.hypothesis,state:"run"},c.push(f)):p.stage==="failure"&&f?(f.state="fell",f.id=p.id,f.rate=p.fall_rate,f=null):p.stage==="tool_result"&&p.tool==="test_hypothesis"&&f?(f.state=p.result.error?"error":"held",f.rate=p.result.fall_rate,f=null):p.stage==="diagnosis"?c.push({kind:"spark",e:p}):p.stage==="margin"?c.push({kind:"margin",e:p}):p.stage==="tool_call"&&p.tool==="patch"?c.push({kind:"patch"}):["bank","training","progress","gating","verified","rejected"].includes(p.stage)?c.push({kind:"patchev",e:p}):p.stage==="done"&&p.summary?c.push({kind:"summary",text:p.summary}):p.stage==="failed"&&c.push({kind:"error",text:p.error});const h=c.filter(p=>p.kind==="patchev").map(p=>p.e);return b.jsxs("div",{className:"flex-1 space-y-5 overflow-y-auto px-5 py-6",children:[b.jsx("div",{className:"flex justify-end",children:b.jsx("p",{className:"max-w-[85%] rounded-2xl rounded-br-md bg-white/[.08] px-4 py-2.5 text-[15px]",children:s})}),c.map((p,g)=>{switch(p.kind){case"say":case"summary":return b.jsx("p",{className:"rise whitespace-pre-line text-[15px] leading-[1.6] text-ink/90",children:p.text},g);case"test":return b.jsxs("button",{onClick:()=>p.id&&l(p.id),disabled:!p.id,className:`rise flex w-full items-start gap-3 rounded-xl border px-3.5 py-3 text-left transition-colors ${p.id&&p.id===o?"border-white/25 bg-white/[.05]":"border-line"} ${p.id?"hover:border-white/25":""}`,children:[b.jsx("span",{className:"mt-0.5 shrink-0",children:p.state==="run"?b.jsx(uf,{size:15,className:"animate-spin text-mute"}):p.state==="fell"?b.jsx("i",{className:"block size-[15px] rounded-full bg-ember"}):p.state==="held"?b.jsx(mc,{size:15,className:"text-acid"}):b.jsx(df,{size:15,className:"text-faint"})}),b.jsx("span",{className:"min-w-0 flex-1 text-[14px] leading-snug text-mute",children:p.text}),b.jsx("span",{className:`shrink-0 font-mono text-xs ${p.state==="fell"?"text-ember":p.state==="held"?"text-acid":"text-faint"}`,children:p.state==="run"?"testing":p.state==="fell"?`fell ${nn(p.rate)}`:p.state==="held"?`held ${nn(p.rate)}`:"retry"})]},g);case"spark":return b.jsxs("div",{className:"rise border-l-2 border-peri/60 pl-4",children:[b.jsx("p",{className:"text-[13px] text-peri",children:"Muse Spark watched the fall"}),b.jsxs("p",{className:"mt-1 text-[14px] leading-relaxed text-mute",children:[b.jsxs("span",{className:"text-ink",children:[p.e.mode,"."]})," ",p.e.likely_cause]})]},g);case"margin":return b.jsxs("p",{className:"rise text-[14px] text-mute",children:["Falls begin at ",b.jsx("span",{className:"font-mono text-ink",children:dc(p.e.starts_falling_at)})," ",p.e.condition.replace(/_/g," "),"."]},g);case"patch":return b.jsx(Ty,{events:h},g);case"error":return b.jsx("p",{className:"text-sm text-ember",children:p.text},g);default:return null}}),t&&b.jsxs("p",{className:"flex items-center gap-2 text-sm text-faint",children:[b.jsx("span",{className:"blink text-ember",children:"●"})," thinking"]}),r&&b.jsx("p",{className:"text-sm text-ember",children:r}),b.jsx("div",{ref:d})]})}function LA({o:s}){return b.jsxs("div",{className:"flex min-h-0 flex-1 flex-col",children:[b.jsx("div",{className:"relative min-h-[300px] flex-1 bg-[#0b0d12]",children:s.trajs?b.jsx(uc,{trajs:s.trajs.map((e,t)=>({url:e.url,label:t===0?"original":e.label})),className:"absolute inset-0"},s.id):b.jsx("video",{src:s.clip,autoPlay:!0,muted:!0,loop:!0,playsInline:!0,className:"absolute inset-0 size-full object-contain"},s.id)}),b.jsxs("div",{className:"space-y-3 border-t border-line px-5 py-4",children:[b.jsx("p",{className:"text-[15px] leading-snug",children:s.hypothesis}),b.jsxs("div",{className:"flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-mute",children:[b.jsxs("span",{children:["Fell in ",b.jsx("span",{className:"text-ember",children:nn(s.fall_rate)})," of tries"]}),s.margin&&b.jsxs("span",{className:"flex items-center gap-2",children:["Margin",b.jsx("span",{className:"flex h-4 items-end gap-[2px]",children:s.margin.curve.map((e,t)=>b.jsx("i",{style:{height:`${Math.max(15,e.fall_rate*100)}%`},className:`block w-1.5 ${e.fall_rate>=.5?"bg-ember":"bg-white/20"}`},t))}),b.jsx("span",{className:"font-mono text-xs text-ink",children:dc(s.margin.starts_falling_at)})]})]}),s.diagnosis&&b.jsxs("p",{className:"text-[14px] leading-relaxed text-mute",children:[b.jsx("span",{className:"text-peri",children:"Muse Spark · "}),s.diagnosis.what_happened]})]})]})}function dc(s){if(s==null)return"never";if(Array.isArray(s)){if(s.every(t=>t===s[0]))return dc(s[0]);const e=s.filter(t=>Math.abs(t)>1e-6);return e.length===1?dc(e[0]):`[${s.map(t=>+(+t).toFixed(2)).join(", ")}]`}return String(typeof s=="number"?+s.toFixed(2):s)}function d0({onText:s,onVoice:e,onFile:t,busy:r,examples:o=[],accent:l="bg-ember",prefill:d}){const[c,f]=ue.useState(""),[h,p]=ue.useState(0),[g,y]=ue.useState(null),x=ue.useRef(null),M=ue.useRef(null);ue.useEffect(()=>{if(o.length<2)return;const v=setInterval(()=>p(w=>(w+1)%o.length),3200);return()=>clearInterval(v)},[o.length]),ue.useEffect(()=>{var v;d&&(f(d.text),(v=x.current)==null||v.focus())},[d==null?void 0:d.n]),ue.useEffect(()=>{const v=x.current;v&&(v.style.height="0px",v.style.height=`${Math.min(v.scrollHeight,200)}px`)},[c]);const E=()=>{const v=c.trim();v.length>=3&&!r&&s(v)},S=async()=>{if(g){g.stop();return}try{const v=await navigator.mediaDevices.getUserMedia({audio:!0}),w=new MediaRecorder(v),A=[];w.ondataavailable=P=>A.push(P.data),w.onstop=async()=>{v.getTracks().forEach(P=>P.stop()),y(null),e==null||e(await fy(new Blob(A)))},w.start(),y(w)}catch{}};return b.jsxs("div",{className:`flex items-end gap-1 rounded-2xl border bg-panel py-2 pr-2 pl-4 transition-colors ${g?"border-ember/60":"border-white/12 focus-within:border-white/30"}`,children:[b.jsx("textarea",{ref:x,rows:1,value:c,disabled:r,onChange:v=>f(v.target.value),onKeyDown:v=>{v.key==="Enter"&&!v.shiftKey&&(v.preventDefault(),E())},placeholder:g?"Listening… tap stop when done":o[h]||"Describe an attack",className:"block min-w-0 flex-1 resize-none self-center bg-transparent py-1.5 text-base leading-6 text-ink outline-none placeholder:text-mute/80 disabled:opacity-60"}),b.jsxs("div",{className:"flex shrink-0 items-center gap-0.5",children:[e&&b.jsx("button",{onClick:S,disabled:r,title:g?"Stop":"Say it",className:`grid size-9 place-items-center rounded-full transition-colors ${g?"bg-ember/15 text-ember":"text-mute hover:bg-white/5 hover:text-ink"}`,children:g?b.jsx(wy,{size:14,fill:"currentColor"}):b.jsx(Sy,{size:17,strokeWidth:1.6})}),t&&b.jsxs(b.Fragment,{children:[b.jsx("button",{onClick:()=>{var v;return(v=M.current)==null?void 0:v.click()},disabled:r,title:"A photo of a real place",className:"grid size-9 place-items-center rounded-full text-mute transition-colors hover:bg-white/5 hover:text-ink",children:b.jsx(_y,{size:17,strokeWidth:1.6})}),b.jsx("input",{ref:M,type:"file",accept:"image/*,video/*",hidden:!0,onChange:v=>{var A;const w=(A=v.target.files)==null?void 0:A[0];w&&t(w),v.target.value=""}})]}),b.jsx("button",{onClick:E,disabled:r||c.trim().length<3,className:`ml-1 grid size-9 place-items-center rounded-full transition-all ${c.trim().length>=3&&!r?`${l} text-black`:"bg-white/[.07] text-mute"}`,children:r?b.jsx(uf,{size:17,className:"animate-spin"}):b.jsx(yv,{size:18,strokeWidth:2})})]})]})}const ev={bank:"Building lessons",training:"Retraining",gating:"Checking for regressions",verified:"Live",rejected:"Kept the old robot"};function f0({job:s,onDone:e,onTimelapse:t}){const[r,o]=ue.useState("bank"),[l,d]=ue.useState(0),[c,f]=ue.useState(null),[h,p]=ue.useState(""),[g,y]=ue.useState(null),[x,M]=ue.useState("");ue.useEffect(()=>{let v=!0;return cf(s,w=>{v&&(w.stage==="started"&&y([w.parent,w.version]),w.stage==="timelapse"&&(t==null||t(w.attempts)),w.stage in ev&&o(w.stage),w.stage==="progress"&&(o("training"),d(Math.min(1,w.step/w.total))),w.stage==="trained"&&d(1),(w.stage==="verified"||w.stage==="rejected")&&f(w.gate),w.stage==="failed"&&p(w.error||"failed"),w.stage==="learned"&&M(w.sentence))}).then(w=>v&&(e==null?void 0:e(w))),()=>{v=!1}},[s]);const E=r==="verified"||r==="rejected",S=c&&[["Fixed",c.checks["fixes the attack"],`${nn(c.suites.attacks.before)} → ${nn(c.suites.attacks.after)} falls`],["Still walks",c.checks["still walks"],`${c.suites.nominal.progress_after.toFixed(1)} m in 5 s`],["Nothing else broke",c.checks["no regressions"],`${nn(c.suites.gauntlet.before)} → ${nn(c.suites.gauntlet.after)} on 52 scenarios`]];return b.jsxs("div",{className:"rise rounded-2xl border border-line bg-panel p-5",children:[b.jsxs("div",{className:"flex items-baseline justify-between gap-4",children:[b.jsxs("p",{className:"text-[15px]",children:[h?b.jsx("span",{className:"text-ember",children:h}):ev[r],!E&&!h&&b.jsx("span",{className:"blink text-ember",children:" ●"})]}),g&&b.jsxs("span",{className:"font-mono text-xs text-faint",children:[g[0]," → ",r==="rejected"?g[0]:g[1]]})]}),b.jsx("div",{className:"mt-4 h-px overflow-hidden bg-line",children:b.jsx("div",{className:"h-full bg-ember transition-[width] duration-700 ease-out-soft",style:{width:`${(E?1:r==="bank"?.04:r==="gating"?1:l)*100}%`}})}),S&&b.jsx("div",{className:"mt-5 grid gap-3 sm:grid-cols-3",children:S.map(([v,w,A])=>b.jsxs("div",{className:"flex gap-2.5",children:[w?b.jsx(mc,{size:16,className:"mt-0.5 shrink-0 text-acid"}):b.jsx(df,{size:16,className:"mt-0.5 shrink-0 text-ember"}),b.jsxs("div",{children:[b.jsx("p",{className:"text-sm",children:v}),b.jsx("p",{className:"text-xs text-faint",children:A})]})]},v))}),x&&b.jsxs("p",{className:"rise mt-4 text-[14px] leading-relaxed text-mute",children:[b.jsx("span",{className:"text-peri",children:"Muse Spark · "}),x]})]})}function NA({seeds:s,color:e="bg-ember",size:t="size-3.5"}){return b.jsx("div",{className:"flex gap-1",children:s.map((r,o)=>b.jsx("i",{style:{animationDelay:`${o*70}ms`},className:`rise block ${t} ${r?e:"border border-white/15"}`},o))})}const DA=["A light shove from the right as it turns","Slightly wet tiles and a 3 kg backpack","The back-left knee is a bit weak","20 ms of lag on a gentle downhill"];function UA(){const[s,e]=ue.useState(null),[t,r]=ue.useState(3),[o,l]=ue.useState(!1),[d,c]=ue.useState(null),[f,h]=ue.useState("lobby"),[p,g]=ue.useState(null),[y,x]=ue.useState(""),M=()=>wi("/api/duel_tally").then(e).catch(()=>{});ue.useEffect(()=>{M()},[]),ue.useEffect(()=>{if(f!=="turn"||!d)return;g(null);const w=setInterval(async()=>{const A=await wi(`/api/duel/${d.id}/muse`).catch(()=>null);A!=null&&A.locked&&(g(A.commit),clearInterval(w))},1200);return()=>clearInterval(w)},[f,d==null?void 0:d.history.length]);const E=async()=>{x("");try{c(await rs("/api/duel",{rounds:t,hard:o})),h("turn"),window.scrollTo({top:0})}catch(w){x(w.message)}},S=async w=>{h("running"),x("");try{c(await w()),h("reveal")}catch(A){x(A.message),h("turn")}};if(f==="lobby"||!d)return b.jsxs("div",{className:"grid gap-16 pt-10 sm:pt-16 lg:grid-cols-[1.3fr_1fr]",children:[b.jsxs("section",{children:[b.jsxs("h1",{className:"text-[48px] font-medium leading-[1] tracking-[-0.04em] sm:text-[84px]",children:[b.jsx("span",{className:"text-peri",children:"You"})," ",b.jsx("span",{className:"text-faint",children:"vs"})," ",b.jsx("span",{className:"text-ember",children:"Muse"})]}),b.jsx("p",{className:"mt-8 max-w-lg text-[17px] leading-relaxed text-mute",children:"You both write an attack on the same robot, at the same time. The subtlest one that still knocks it over wins. Brute force scores nothing."}),b.jsxs("div",{className:"mt-10 flex flex-wrap items-center gap-3",children:[b.jsx(tv,{options:[["3","Best of 3"],["5","Best of 5"]],value:String(t),onChange:w=>r(+w)}),b.jsx(tv,{options:[["0","Normal"],["1","Hard"]],value:o?"1":"0",onChange:w=>l(w==="1")})]}),b.jsxs("button",{onClick:E,className:"mt-6 flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[15px] font-medium text-black transition-opacity hover:opacity-85",children:["Start ",b.jsx(da,{size:16})]}),y&&b.jsx("p",{className:"mt-3 text-sm text-ember",children:y})]}),b.jsx(IA,{tally:s})]});const v=d.history.at(-1);return b.jsxs("div",{className:"pt-8",children:[b.jsx(OA,{duel:d}),f==="turn"&&b.jsxs("div",{className:"rise mt-10 grid gap-5 lg:grid-cols-[1.4fr_1fr]",children:[b.jsxs("div",{children:[b.jsx(d0,{accent:"bg-peri",examples:DA,onText:w=>S(()=>rs(`/api/duel/${d.id}/round`,{text:w})),onVoice:w=>S(()=>$d(`/api/duel/${d.id}/round_voice`,"audio",w,"attack.wav"))}),y&&b.jsx("p",{className:"mt-3 text-sm text-ember",children:y})]}),b.jsxs("div",{className:"flex items-center gap-4 rounded-2xl border border-line px-5 py-4",children:[b.jsx("div",{className:`grid size-10 shrink-0 place-items-center rounded-full ${p?"bg-ember/15 text-ember":"bg-white/5 text-faint"}`,children:b.jsx(yy,{size:16,strokeWidth:1.8})}),b.jsxs("div",{className:"min-w-0",children:[b.jsx("p",{className:"text-[15px]",children:p?"Muse has sealed its attack":b.jsxs(b.Fragment,{children:["Muse is writing its attack",b.jsx("span",{className:"blink",children:"…"})]})}),b.jsx("p",{className:"truncate font-mono text-xs text-faint",children:p?`sha256 ${p}`:"it never sees yours"})]})]})]}),f==="running"&&b.jsxs("div",{className:"mx-auto mt-24 w-64 text-center",children:[b.jsx("p",{className:"text-sm text-mute",children:"Running both attacks on the same robot"}),b.jsx("div",{className:"mt-4 h-px overflow-hidden bg-line",children:b.jsx("div",{className:"sweep h-full w-1/3 bg-ember"})})]}),f==="reveal"&&v&&b.jsx(FA,{r:v,over:d.over,onNext:()=>d.over?(h("final"),M()):h("turn")}),f==="final"&&b.jsx(kA,{duel:d,onRematch:E})]})}function tv({options:s,value:e,onChange:t}){return b.jsx("div",{className:"inline-flex rounded-full border border-line p-1",children:s.map(([r,o])=>b.jsx("button",{onClick:()=>t(r),className:`rounded-full px-4 py-1.5 text-sm transition-colors ${e===r?"bg-white/10 text-ink":"text-faint hover:text-mute"}`,children:o},r))})}function IA({tally:s}){var t;const e=((t=s==null?void 0:s.log)==null?void 0:t.slice(-60))||[];return b.jsxs("aside",{className:"self-end",children:[b.jsxs("div",{className:"grid grid-cols-12 gap-1.5",children:[e.map((r,o)=>b.jsx("i",{className:`block aspect-square ${r==="you"?"bg-peri":r==="muse"?"bg-ember":"bg-white/25"}`},o)),Array.from({length:Math.max(0,60-e.length)},(r,o)=>b.jsx("i",{className:"block aspect-square border border-white/[.07]"},`e${o}`))]}),b.jsxs("p",{className:"mt-4 text-sm text-mute",children:["Humans ",b.jsx("span",{className:"text-peri",children:(s==null?void 0:s.you)??0}),b.jsx("span",{className:"mx-2 text-faint",children:"·"}),"Muse ",b.jsx("span",{className:"text-ember",children:(s==null?void 0:s.muse)??0})]})]})}function OA({duel:s}){const e=Math.min(s.history.length+1,s.rounds);return b.jsxs("div",{className:"flex items-center justify-between border-b border-line pb-6",children:[b.jsxs("div",{children:[b.jsx("p",{className:"text-sm text-mute",children:"You"}),b.jsx("p",{className:"text-5xl font-medium tracking-tight text-peri tabular-nums",children:s.score.you})]}),b.jsxs("div",{className:"flex flex-col items-center gap-3",children:[b.jsx("div",{className:"flex gap-1.5",children:Array.from({length:s.rounds},(t,r)=>{const o=s.history[r],l=o?o.you.score>o.muse.score?"bg-peri":o.muse.score>o.you.score?"bg-ember":"bg-white/40":r===s.history.length?"bg-white/40":"bg-white/10";return b.jsx("i",{className:`block h-1 w-7 ${l}`},r)})}),b.jsx("p",{className:"font-mono text-xs text-faint",children:s.over?"final":`round ${e} of ${s.rounds}`})]}),b.jsxs("div",{className:"text-right",children:[b.jsx("p",{className:"text-sm text-mute",children:"Muse"}),b.jsx("p",{className:"text-5xl font-medium tracking-tight text-ember tabular-nums",children:s.score.muse})]})]})}function FA({r:s,over:e,onNext:t}){const[r,o]=ue.useState(null),[l,d]=ue.useState("");return ue.useEffect(()=>{var h;(h=crypto.subtle)==null||h.digest("SHA-256",new TextEncoder().encode(s.sealed)).then(p=>o([...new Uint8Array(p)].map(g=>g.toString(16).padStart(2,"0")).join("")===s.commit));let c=0;const f=setInterval(()=>{c+=2,d(s.comment.slice(0,c)),c>=s.comment.length&&clearInterval(f)},18);return()=>clearInterval(f)},[s.round]),b.jsxs("div",{className:"rise mt-10",children:[b.jsxs("div",{className:"grid gap-5 md:grid-cols-2",children:[b.jsx(nv,{who:"You",s:s.you,other:s.muse,color:"bg-peri",text:"text-peri"}),b.jsx(nv,{who:"Muse",s:s.muse,other:s.you,color:"bg-ember",text:"text-ember"})]}),s.comment&&b.jsx("p",{className:"mx-auto mt-10 max-w-2xl text-center text-[17px] leading-relaxed text-mute",children:l}),b.jsxs("div",{className:"mt-10 flex flex-wrap items-center justify-between gap-4",children:[b.jsx("p",{className:"flex items-center gap-2 font-mono text-xs text-faint",children:r&&b.jsxs(b.Fragment,{children:[b.jsx(mc,{size:13,className:"text-acid"})," Muse's attack matches the hash it sealed before you wrote yours"]})}),b.jsxs("button",{onClick:t,className:"flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-black hover:opacity-85",children:[e?"Result":"Next round"," ",b.jsx(da,{size:15})]})]})]})}function nv({who:s,s:e,other:t,color:r,text:o}){const l=e.score>t.score,d=e.seeds.filter(Boolean).length;return b.jsxs("div",{children:[b.jsx("div",{className:"relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-[#0b0d12]",children:b.jsx(uc,{trajs:[{...e.traj,label:s.toUpperCase()}],className:"absolute inset-0"})}),b.jsxs("div",{className:"mt-5 flex items-start justify-between gap-6",children:[b.jsxs("div",{className:"min-w-0",children:[b.jsx("p",{className:"text-sm text-faint",children:s}),b.jsx("p",{className:"mt-1 text-[17px] leading-snug",children:e.text})]}),b.jsx("p",{className:`text-4xl font-medium tabular-nums tracking-tight ${l?o:"text-faint"}`,children:e.score})]}),b.jsxs("div",{className:"mt-4 flex items-center gap-4",children:[b.jsx(NA,{seeds:e.seeds,color:r}),b.jsx("p",{className:"text-xs text-faint",children:e.cheap?b.jsx("span",{className:"text-ember",children:"brute force, scores 0"}):`${d}/8 falls · ${Math.round(e.subtlety*100)}% subtle`})]})]})}function kA({duel:s,onRematch:e}){const[t,r]=ue.useState(null),[o,l]=ue.useState(""),d=s.winner,c=s.history.some(p=>["you","muse"].some(g=>p[g].seeds.filter(Boolean).length>=4&&!p[g].cheap)),f=()=>{const{you:p,muse:g}=s.score,y=d==="you"?`I beat Meta's Muse ${p}–${g} at breaking a robot.`:d==="muse"?`Meta's Muse beat me ${g}–${p} at breaking a robot.`:"I drew with Meta's Muse at breaking a robot.";window.open(`https://x.com/intent/post?text=${encodeURIComponent(y+" Subtle beats brutal.")}&url=${encodeURIComponent(location.origin+"/arena")}`,"_blank")},h=ue.useRef(null);return ue.useEffect(()=>{var p;return(p=h.current)==null?void 0:p.scrollIntoView({behavior:"smooth"})},[]),b.jsxs("div",{ref:h,className:"rise mt-14",children:[b.jsx("h2",{className:`text-[64px] font-medium leading-none tracking-[-0.045em] sm:text-[120px] ${d==="you"?"text-peri":d==="muse"?"text-ember":""}`,children:d==="you"?"You win.":d==="muse"?"Muse wins.":"Draw."}),b.jsx("div",{className:"mt-12 divide-y divide-line border-y border-line",children:s.history.map(p=>b.jsx("div",{className:"grid gap-x-8 gap-y-2 py-4 text-[15px] sm:grid-cols-2",children:["you","muse"].map(g=>b.jsxs("div",{className:"flex items-baseline justify-between gap-4",children:[b.jsxs("p",{className:"text-mute",children:[b.jsx("span",{className:"mr-3 font-mono text-xs text-faint",children:g==="you"?"you":"muse"}),p[g].text]}),b.jsx("span",{className:`font-mono text-sm ${p[g].score>p[g==="you"?"muse":"you"].score?g==="you"?"text-peri":"text-ember":"text-faint"}`,children:p[g].score})]},g))},p.round))}),b.jsxs("div",{className:"mt-10 flex flex-wrap gap-3",children:[c&&!t&&b.jsxs("button",{onClick:async()=>{try{r((await rs(`/api/duel/${s.id}/patch`)).job)}catch(p){l(p.message)}},className:"flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-black hover:opacity-85",children:["Teach the robot what broke it ",b.jsx(da,{size:15})]}),b.jsxs("button",{onClick:f,className:"flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm hover:border-white/25",children:[b.jsx(Ey,{size:14})," Share"]}),b.jsxs("button",{onClick:e,className:"flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm hover:border-white/25",children:[b.jsx(My,{size:14})," Rematch"]})]}),o&&b.jsx("p",{className:"mt-3 text-sm text-ember",children:o}),t&&b.jsx("div",{className:"mt-6",children:b.jsx(f0,{job:t})})]})}const zA=[["Icy shove","Make the floor icy and shove it from the left"],["Wet tiles + load","Wet tiles and a 3 kg backpack"],["Weak knee","The back-left knee is weak, on a gentle downhill"]];function BA(){var me;const[s,e]=ue.useState(0),t=xv(s),[r,o]=ue.useState(""),[l,d]=ue.useState(""),[c,f]=ue.useState(null),[h,p]=ue.useState(null),[g,y]=ue.useState(null),[x,M]=ue.useState([]),[E,S]=ue.useState([]),[v,w]=ue.useState({text:"",n:0}),[A,P]=ue.useState([]),[B,U]=ue.useState(0),[I,ne]=ue.useState(!1);ue.useEffect(()=>{if(!I||!A.length)return;if(B>=A.length-1){ne(!1);return}const F=setTimeout(()=>U($=>$+1),A[B].fell?3200:4200);return()=>clearTimeout(F)},[I,B,A]),ue.useEffect(()=>{wi("/api/hall_of_fame?limit=9").then(M).catch(()=>{}),wi("/api/leaderboard?limit=5").then(S).catch(()=>{})},[s]);const R=async(F,$)=>{o(F),d(""),p(null),y(null),P([]);try{f(await $()),e(J=>J+1)}catch(J){d(J.message)}o("")},D=A.length?A[B]:null,re=D?[D]:(g==null?void 0:g.trajs)||(c==null?void 0:c.trajs)||((me=x[0])==null?void 0:me.trajs),ae=D?[`attempt · ${D.label}`]:g?[`${g.parent}`,`${g.version}`]:c?["original",c.version]:null;return b.jsxs("div",{children:[b.jsxs("div",{className:"grid items-center gap-10 pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-14 lg:pt-12",children:[b.jsxs("section",{className:"w-full max-w-[440px]",children:[b.jsxs("h1",{className:"font-medium leading-[1.02] tracking-[-0.04em]",style:{fontSize:"clamp(40px, min(3.7vw, 7vh), 56px)"},children:[b.jsx("span",{className:"block lg:whitespace-nowrap",children:"Break the robot."}),b.jsx("span",{className:"block text-mute lg:whitespace-nowrap",children:"Watch it learn."})]}),b.jsx("p",{className:"mt-5 text-base leading-[1.55] text-ink/75",children:"Describe an attack in plain English, say it out loud, or show a photo of a real place. Muse turns it into physics. If the robot falls, retrain it until it doesn't."}),b.jsx("div",{className:"mt-6 flex flex-wrap gap-2",children:zA.map(([F,$])=>b.jsx("button",{onClick:()=>w(J=>({text:$,n:J.n+1})),disabled:!!r,className:"cursor-pointer rounded-full border border-white/12 bg-white/[.04] px-3 py-1.5 text-[13px] leading-none text-ink/85 transition-colors hover:border-white/30 hover:bg-white/[.09] hover:text-ink active:scale-[.98] disabled:opacity-40",children:F},F))}),b.jsx("div",{className:"mt-8",children:b.jsx(d0,{busy:!!r,examples:["Describe an attack…"],prefill:v,onText:F=>R("Muse Wonder is turning that into physics…",()=>rs("/api/attack",{text:F})),onVoice:F=>R("Listening, then simulating…",()=>$d("/api/attack_voice","audio",F,"attack.wav")),onFile:F=>R("Muse Spark is reading your place…",()=>$d("/api/world","media",F,F.name))})}),l&&b.jsx("p",{className:"mt-3 text-sm text-ember",children:l}),c&&!r&&b.jsx(HA,{r:c,after:g,onPatch:async()=>{try{p((await rs("/api/patch",{attack_id:c.id})).job)}catch(F){d(F.message)}},patching:!!h}),h&&b.jsxs("div",{className:"mt-4",children:[b.jsx(f0,{job:h,onTimelapse:F=>{P(F),U(0),ne(!0)},onDone:F=>{F.accepted&&y(F),e($=>$+1)}}),A.length>0&&b.jsxs("div",{className:"mt-3 flex flex-wrap items-center gap-1.5",children:[b.jsx("span",{className:"mr-1 text-[13px] text-mute",children:"Watch it learn"}),A.map((F,$)=>b.jsxs("button",{onClick:()=>{ne(!1),U($)},className:`flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-xs transition-colors ${$===B?"border-white/30 bg-white/10 text-ink":"border-white/10 text-mute hover:text-ink"}`,children:[b.jsx("i",{className:`block size-1.5 rounded-full ${F.fell?"bg-ember":"bg-acid"}`})," ",F.label]},$)),g&&b.jsx("button",{onClick:()=>P([]),className:"ml-1 text-xs text-faint hover:text-mute",children:"final comparison"})]})]})]}),b.jsxs("section",{className:"relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-line bg-[#0b0d12] lg:aspect-[16/11] lg:max-h-[calc(100dvh-11rem)]",children:[re?b.jsx(uc,{trajs:re.map((F,$)=>({url:F.url,label:(ae==null?void 0:ae[$])||F.label})),className:"absolute inset-0"},JSON.stringify(re)):b.jsx(uc,{trajs:[{url:"/assets/sample_traj_held.json",label:""}],hud:!1,className:"absolute inset-0"}),r&&b.jsx("div",{className:"absolute inset-0 grid place-items-center bg-black/60 backdrop-blur-[2px]",children:b.jsxs("div",{className:"w-56",children:[b.jsx("p",{className:"text-center text-sm text-mute",children:r}),b.jsx("div",{className:"mt-3 h-px overflow-hidden bg-line",children:b.jsx("div",{className:"sweep h-full w-1/3 bg-ember"})})]})})]})]}),x.length>0&&b.jsxs("section",{className:"mt-28",children:[b.jsxs("div",{className:"flex items-end justify-between",children:[b.jsx("h2",{className:"text-2xl font-medium tracking-tight",children:"Recent breaks"}),t&&b.jsxs(vv,{to:"/report",className:"flex items-center gap-1.5 text-sm text-mute hover:text-ink",children:["Robot report ",b.jsx(da,{size:14})]})]}),b.jsx("div",{className:"mt-6 grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3",children:x.map(F=>b.jsx(VA,{r:F},F.id))})]}),b.jsxs("section",{className:"mt-28 grid gap-16 lg:grid-cols-2",children:[E.length>0&&b.jsxs("div",{children:[b.jsx("h2",{className:"text-2xl font-medium tracking-tight",children:"Subtlest attacks"}),b.jsx("p",{className:"mt-2 text-sm text-faint",children:"Points for breaking it with as little as possible."}),b.jsx("ol",{className:"mt-6 divide-y divide-line border-y border-line",children:E.map((F,$)=>b.jsxs("li",{className:"flex items-baseline gap-4 py-3.5",children:[b.jsx("span",{className:"w-4 font-mono text-xs text-faint",children:$+1}),b.jsxs("div",{className:"min-w-0 flex-1",children:[b.jsx("p",{className:"truncate text-[15px]",children:F.text}),b.jsx("p",{className:"text-xs text-faint",children:F.who})]}),b.jsx("span",{className:"font-mono text-sm text-ember",children:F.score})]},F.who))})]}),t&&t.versions.length>1&&b.jsxs("div",{children:[b.jsx("h2",{className:"text-2xl font-medium tracking-tight",children:"Lineage"}),b.jsx("p",{className:"mt-2 text-sm text-faint",children:"Every version passed the regression gate before going live."}),b.jsx("ol",{className:"mt-6 border-l border-line",children:[...t.versions].reverse().map(F=>b.jsxs("li",{className:"relative py-2.5 pl-6",children:[b.jsx("i",{className:`absolute top-[17px] -left-[4px] block size-[7px] rounded-full ${F.name===t.live?"bg-acid":"bg-line"}`}),b.jsx("span",{className:"font-mono text-sm",children:F.name}),b.jsx("span",{className:"ml-3 text-sm text-faint",children:F.parent?`learned ${F.attacks.length} situation${F.attacks.length===1?"":"s"}`:"original policy"}),F.changelog&&b.jsxs("p",{className:"mt-1 max-w-md text-[13px] leading-relaxed text-mute",children:[F.changelog.learned," ",b.jsx("span",{className:"text-faint",children:F.changelog.still_cant})]})]},F.name))})]})]})]})}function HA({r:s,after:e,onPatch:t,patching:r}){const o=s.fall_rate_trained>=.5,l=s.fall_rate_trained>=.5&&s.survivable!==!1&&!e;return b.jsxs("div",{className:"rise mt-6",children:[s.reading&&b.jsxs("div",{className:"mb-5 flex gap-4",children:[b.jsx("img",{src:s.media,alt:"",className:"size-20 shrink-0 rounded-lg object-cover"}),b.jsxs("p",{className:"text-sm leading-relaxed text-mute",children:[b.jsxs("span",{className:"text-ink",children:[s.reading.place,"."]})," ",s.reading.surface,", friction ≈ ",(+s.reading.friction).toFixed(2),Math.abs(s.reading.slope_deg)>=1?`, ${(+s.reading.slope_deg).toFixed(0)}° slope`:"","."]})]}),b.jsxs("div",{className:"flex flex-col items-start gap-4",children:[b.jsxs("p",{className:"text-[15px] text-mute",children:["Original robot ",b.jsx("span",{className:s.broke_baseline?"text-ember":"text-acid",children:s.broke_baseline?"fell":"held"}),b.jsxs("span",{className:"text-faint",children:[" · ",nn(s.fall_rate_baseline)]}),b.jsx("span",{className:"mx-3 text-line",children:"/"}),s.version," ",b.jsx("span",{className:o?"text-ember":"text-acid",children:o?"fell":"held"}),b.jsxs("span",{className:"text-faint",children:[" · ",nn(s.fall_rate_trained)]}),s.score>0&&b.jsxs("span",{className:"ml-3 font-mono text-sm text-ember",children:["+",s.score]})]}),l&&b.jsxs("button",{onClick:t,disabled:r,className:"flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-medium text-black transition-opacity hover:opacity-85 disabled:opacity-40",children:["Train it to survive this ",b.jsx(da,{size:15})]})]}),s.survivable===!1&&s.fall_rate_trained>0&&b.jsxs("p",{className:"mt-3 text-sm text-faint",children:["Physics wins: even our toughest robot falls ",nn(s.reference_fall_rate)," of the time here. Try something subtler."]}),e&&b.jsxs("p",{className:"mt-3 text-sm text-mute",children:["Replaying it on ",b.jsx("span",{className:"text-acid",children:e.version}),", now live."]})]})}function VA({r:s}){const e=Object.entries(s.status||{}).sort((t,r)=>+t[0].slice(1)-+r[0].slice(1));return b.jsxs("article",{className:"group",children:[b.jsx("div",{className:"overflow-hidden rounded-xl border border-line bg-[#0b0d12]",children:b.jsx("video",{src:`${s.clip}#t=1.2`,preload:"metadata",muted:!0,loop:!0,playsInline:!0,onMouseEnter:t=>t.currentTarget.play(),onMouseLeave:t=>t.currentTarget.pause(),className:"aspect-[2/1] w-full object-cover opacity-90 transition-opacity group-hover:opacity-100"})}),b.jsx("p",{className:"mt-3 line-clamp-2 text-[15px] leading-snug",children:s.text}),b.jsx("div",{className:"mt-2 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs",children:e.map(([t,r])=>b.jsxs("span",{className:r>=.5?"text-ember":"text-acid",children:[t," ",r>=.5?"fell":"held"]},t))})]})}const af=s=>{if(s==null)return"never";if(Array.isArray(s)){if(s.every(t=>t===s[0]))return af(s[0]);const e=s.filter(t=>Math.abs(t)>1e-6);return e.length===1?af(e[0]):`[${s.map(t=>+(+t).toFixed(2)).join(", ")}]`}return String(typeof s=="number"?+s.toFixed(2):s)};function GA(){var y;const{version:s}=U_(),[e,t]=ue.useState(s||""),[r,o]=ue.useState(null),[l,d]=ue.useState(!1),[c,f]=ue.useState("");ue.useEffect(()=>{(async()=>{const x=s||(await wi("/api/versions")).live;t(x),wi(`/api/report/${x}`).then(o).catch(()=>d(!0))})()},[s]);const h=async()=>{f("Starting…");try{const{job:x}=await rs("/api/report",{version:e});await cf(x,M=>M.message&&f(M.message)),o(await wi(`/api/report/${e}`)),d(!1)}catch(x){f(x.message)}};if(!r)return b.jsxs("div",{className:"mx-auto max-w-3xl pt-16",children:[b.jsxs("h1",{className:"text-[40px] font-medium tracking-[-0.03em] sm:text-[56px]",children:["Robot report ",b.jsx("span",{className:"text-faint",children:e})]}),l&&b.jsxs("div",{className:"mt-8",children:[b.jsxs("p",{className:"text-mute",children:["Re-tests every attack and the 52-scenario gauntlet against ",e,", measures safety margins, and has Muse Wonder write it up."]}),b.jsx("button",{onClick:h,disabled:!!c,className:"mt-6 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-black disabled:opacity-40",children:"Generate"}),c&&b.jsxs("p",{className:"mt-4 text-sm text-mute",children:[b.jsx("span",{className:"blink text-ember",children:"●"})," ",c]})]})]});const p=r.summary||{},g=r.totals;return b.jsxs("article",{className:"mx-auto max-w-4xl pt-14",children:[b.jsxs("p",{className:"font-mono text-xs text-faint",children:["Unitree Go1 · ",r.version," · ",new Date(r.created*1e3).toLocaleDateString()]}),b.jsx("h1",{className:"mt-4 text-[32px] font-medium leading-[1.12] tracking-[-0.025em] sm:text-[44px]",children:p.headline}),b.jsx("p",{className:"mt-6 text-[17px] leading-relaxed text-mute",children:p.summary}),b.jsx("div",{className:"mt-12 grid grid-cols-2 border-y border-line sm:grid-cols-4",children:[[g.attacks,"attacks tested"],[g.break_v1,"broke the original"],[g.break_now,`still break ${r.version}`],[`${nn(r.gauntlet.v1)} → ${nn(r.gauntlet[r.version])}`,"gauntlet falls"]].map(([x,M],E)=>b.jsxs("div",{className:`py-5 ${E?"sm:border-l sm:border-line sm:pl-5":""}`,children:[b.jsx("p",{className:"text-2xl font-medium tracking-tight",children:x}),b.jsx("p",{className:"mt-1 text-sm text-faint",children:M})]},E))}),((y=p.recommendations)==null?void 0:y.length)>0&&b.jsxs("section",{className:"mt-16",children:[b.jsx("h2",{className:"text-xl font-medium",children:"Recommendations"}),b.jsx("ol",{className:"mt-5 space-y-3",children:p.recommendations.map((x,M)=>b.jsxs("li",{className:"flex gap-4 text-[15px] leading-relaxed text-mute",children:[b.jsx("span",{className:"font-mono text-xs text-faint pt-1",children:M+1}),x]},M))})]}),b.jsxs("section",{className:"mt-16",children:[b.jsx("h2",{className:"text-xl font-medium",children:"Findings"}),b.jsx("div",{className:"mt-6 space-y-12",children:r.findings.map(x=>b.jsxs("div",{className:"grid gap-6 md:grid-cols-[1fr_1.1fr]",children:[b.jsx("video",{src:x.clip,muted:!0,loop:!0,playsInline:!0,controls:!0,preload:"metadata",className:"w-full rounded-xl border border-line"}),b.jsxs("div",{children:[b.jsxs("p",{className:`font-mono text-xs ${x.fall_now>=.5?"text-ember":"text-acid"}`,children:[x.fall_now>=.5?"open":"fixed"," · ",x.family]}),b.jsx("p",{className:"mt-2 text-[17px] leading-snug",children:x.text}),b.jsxs("p",{className:"mt-3 text-sm text-faint",children:[Object.entries(x.status||{}).map(([M,E])=>`${M} ${nn(E)}`).join(" · ")," · now ",nn(x.fall_now)]}),x.diagnosis&&b.jsxs("p",{className:"mt-4 border-l-2 border-peri/60 pl-4 text-sm leading-relaxed text-mute",children:[b.jsxs("span",{className:"text-ink",children:[x.diagnosis.mode,"."]})," ",x.diagnosis.what_happened]}),x.margin&&b.jsxs("div",{className:"mt-5",children:[b.jsxs("p",{className:"text-sm text-mute",children:["Falls begin at ",b.jsx("span",{className:"font-mono text-ink",children:af(x.margin.starts_falling_at)})," ",b.jsx("span",{className:"text-faint",children:x.margin.condition})]}),b.jsx("div",{className:"mt-2 flex h-8 max-w-xs items-end gap-1",children:x.margin.curve.map((M,E)=>b.jsx("i",{style:{height:`${Math.max(6,M*100)}%`},className:`block flex-1 ${M>=.5?"bg-ember":"bg-white/15"}`},E))})]})]})]},x.id))})]})]})}i_.createRoot(document.getElementById("root")).render(b.jsx(ue.StrictMode,{children:b.jsx(oy,{children:b.jsx(J_,{children:b.jsxs(Zs,{element:b.jsx(my,{}),children:[b.jsx(Zs,{index:!0,element:b.jsx(BA,{})}),b.jsx(Zs,{path:"arena",element:b.jsx(UA,{})}),b.jsx(Zs,{path:"agent",element:b.jsx(RA,{})}),b.jsx(Zs,{path:"report/:version?",element:b.jsx(GA,{})})]})})})}));
