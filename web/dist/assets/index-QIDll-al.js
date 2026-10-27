function V_(s,e){for(var t=0;t<e.length;t++){const r=e[t];if(typeof r!="string"&&!Array.isArray(r)){for(const o in r)if(o!=="default"&&!(o in s)){const l=Object.getOwnPropertyDescriptor(r,o);l&&Object.defineProperty(s,o,l.get?l:{enumerable:!0,get:()=>r[o]})}}}return Object.freeze(Object.defineProperty(s,Symbol.toStringTag,{value:"Module"}))}(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const l of o)if(l.type==="childList")for(const d of l.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&r(d)}).observe(document,{childList:!0,subtree:!0});function t(o){const l={};return o.integrity&&(l.integrity=o.integrity),o.referrerPolicy&&(l.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?l.credentials="include":o.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function r(o){if(o.ep)return;o.ep=!0;const l=t(o);fetch(o.href,l)}})();function G_(s){return s&&s.__esModule&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s}var Qu={exports:{}},Ko={},ed={exports:{}},xt={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var $p;function W_(){if($p)return xt;$p=1;var s=Symbol.for("react.element"),e=Symbol.for("react.portal"),t=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),l=Symbol.for("react.provider"),d=Symbol.for("react.context"),u=Symbol.for("react.forward_ref"),f=Symbol.for("react.suspense"),h=Symbol.for("react.memo"),m=Symbol.for("react.lazy"),g=Symbol.iterator;function y(O){return O===null||typeof O!="object"?null:(O=g&&O[g]||O["@@iterator"],typeof O=="function"?O:null)}var S={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},E=Object.assign,M={};function _(O,W,Y){this.props=O,this.context=W,this.refs=M,this.updater=Y||S}_.prototype.isReactComponent={},_.prototype.setState=function(O,W){if(typeof O!="object"&&typeof O!="function"&&O!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,O,W,"setState")},_.prototype.forceUpdate=function(O){this.updater.enqueueForceUpdate(this,O,"forceUpdate")};function v(){}v.prototype=_.prototype;function T(O,W,Y){this.props=O,this.context=W,this.refs=M,this.updater=Y||S}var A=T.prototype=new v;A.constructor=T,E(A,_.prototype),A.isPureReactComponent=!0;var P=Array.isArray,F=Object.prototype.hasOwnProperty,D={current:null},I={key:!0,ref:!0,__self:!0,__source:!0};function ie(O,W,Y){var de,ve={},Te=null,Ae=null;if(W!=null)for(de in W.ref!==void 0&&(Ae=W.ref),W.key!==void 0&&(Te=""+W.key),W)F.call(W,de)&&!I.hasOwnProperty(de)&&(ve[de]=W[de]);var Fe=arguments.length-2;if(Fe===1)ve.children=Y;else if(1<Fe){for(var ge=Array(Fe),be=0;be<Fe;be++)ge[be]=arguments[be+2];ve.children=ge}if(O&&O.defaultProps)for(de in Fe=O.defaultProps,Fe)ve[de]===void 0&&(ve[de]=Fe[de]);return{$$typeof:s,type:O,key:Te,ref:Ae,props:ve,_owner:D.current}}function R(O,W){return{$$typeof:s,type:O.type,key:W,ref:O.ref,props:O.props,_owner:O._owner}}function U(O){return typeof O=="object"&&O!==null&&O.$$typeof===s}function se(O){var W={"=":"=0",":":"=2"};return"$"+O.replace(/[=:]/g,function(Y){return W[Y]})}var le=/\/+/g;function me(O,W){return typeof O=="object"&&O!==null&&O.key!=null?se(""+O.key):W.toString(36)}function H(O,W,Y,de,ve){var Te=typeof O;(Te==="undefined"||Te==="boolean")&&(O=null);var Ae=!1;if(O===null)Ae=!0;else switch(Te){case"string":case"number":Ae=!0;break;case"object":switch(O.$$typeof){case s:case e:Ae=!0}}if(Ae)return Ae=O,ve=ve(Ae),O=de===""?"."+me(Ae,0):de,P(ve)?(Y="",O!=null&&(Y=O.replace(le,"$&/")+"/"),H(ve,W,Y,"",function(be){return be})):ve!=null&&(U(ve)&&(ve=R(ve,Y+(!ve.key||Ae&&Ae.key===ve.key?"":(""+ve.key).replace(le,"$&/")+"/")+O)),W.push(ve)),1;if(Ae=0,de=de===""?".":de+":",P(O))for(var Fe=0;Fe<O.length;Fe++){Te=O[Fe];var ge=de+me(Te,Fe);Ae+=H(Te,W,Y,ge,ve)}else if(ge=y(O),typeof ge=="function")for(O=ge.call(O),Fe=0;!(Te=O.next()).done;)Te=Te.value,ge=de+me(Te,Fe++),Ae+=H(Te,W,Y,ge,ve);else if(Te==="object")throw W=String(O),Error("Objects are not valid as a React child (found: "+(W==="[object Object]"?"object with keys {"+Object.keys(O).join(", ")+"}":W)+"). If you meant to render a collection of children, use an array instead.");return Ae}function q(O,W,Y){if(O==null)return O;var de=[],ve=0;return H(O,de,"","",function(Te){return W.call(Y,Te,ve++)}),de}function te(O){if(O._status===-1){var W=O._result;W=W(),W.then(function(Y){(O._status===0||O._status===-1)&&(O._status=1,O._result=Y)},function(Y){(O._status===0||O._status===-1)&&(O._status=2,O._result=Y)}),O._status===-1&&(O._status=0,O._result=W)}if(O._status===1)return O._result.default;throw O._result}var J={current:null},X={transition:null},K={ReactCurrentDispatcher:J,ReactCurrentBatchConfig:X,ReactCurrentOwner:D};function $(){throw Error("act(...) is not supported in production builds of React.")}return xt.Children={map:q,forEach:function(O,W,Y){q(O,function(){W.apply(this,arguments)},Y)},count:function(O){var W=0;return q(O,function(){W++}),W},toArray:function(O){return q(O,function(W){return W})||[]},only:function(O){if(!U(O))throw Error("React.Children.only expected to receive a single React element child.");return O}},xt.Component=_,xt.Fragment=t,xt.Profiler=o,xt.PureComponent=T,xt.StrictMode=r,xt.Suspense=f,xt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=K,xt.act=$,xt.cloneElement=function(O,W,Y){if(O==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+O+".");var de=E({},O.props),ve=O.key,Te=O.ref,Ae=O._owner;if(W!=null){if(W.ref!==void 0&&(Te=W.ref,Ae=D.current),W.key!==void 0&&(ve=""+W.key),O.type&&O.type.defaultProps)var Fe=O.type.defaultProps;for(ge in W)F.call(W,ge)&&!I.hasOwnProperty(ge)&&(de[ge]=W[ge]===void 0&&Fe!==void 0?Fe[ge]:W[ge])}var ge=arguments.length-2;if(ge===1)de.children=Y;else if(1<ge){Fe=Array(ge);for(var be=0;be<ge;be++)Fe[be]=arguments[be+2];de.children=Fe}return{$$typeof:s,type:O.type,key:ve,ref:Te,props:de,_owner:Ae}},xt.createContext=function(O){return O={$$typeof:d,_currentValue:O,_currentValue2:O,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},O.Provider={$$typeof:l,_context:O},O.Consumer=O},xt.createElement=ie,xt.createFactory=function(O){var W=ie.bind(null,O);return W.type=O,W},xt.createRef=function(){return{current:null}},xt.forwardRef=function(O){return{$$typeof:u,render:O}},xt.isValidElement=U,xt.lazy=function(O){return{$$typeof:m,_payload:{_status:-1,_result:O},_init:te}},xt.memo=function(O,W){return{$$typeof:h,type:O,compare:W===void 0?null:W}},xt.startTransition=function(O){var W=X.transition;X.transition={};try{O()}finally{X.transition=W}},xt.unstable_act=$,xt.useCallback=function(O,W){return J.current.useCallback(O,W)},xt.useContext=function(O){return J.current.useContext(O)},xt.useDebugValue=function(){},xt.useDeferredValue=function(O){return J.current.useDeferredValue(O)},xt.useEffect=function(O,W){return J.current.useEffect(O,W)},xt.useId=function(){return J.current.useId()},xt.useImperativeHandle=function(O,W,Y){return J.current.useImperativeHandle(O,W,Y)},xt.useInsertionEffect=function(O,W){return J.current.useInsertionEffect(O,W)},xt.useLayoutEffect=function(O,W){return J.current.useLayoutEffect(O,W)},xt.useMemo=function(O,W){return J.current.useMemo(O,W)},xt.useReducer=function(O,W,Y){return J.current.useReducer(O,W,Y)},xt.useRef=function(O){return J.current.useRef(O)},xt.useState=function(O){return J.current.useState(O)},xt.useSyncExternalStore=function(O,W,Y){return J.current.useSyncExternalStore(O,W,Y)},xt.useTransition=function(){return J.current.useTransition()},xt.version="18.3.1",xt}var Yp;function af(){return Yp||(Yp=1,ed.exports=W_()),ed.exports}/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var qp;function j_(){if(qp)return Ko;qp=1;var s=af(),e=Symbol.for("react.element"),t=Symbol.for("react.fragment"),r=Object.prototype.hasOwnProperty,o=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function d(u,f,h){var m,g={},y=null,S=null;h!==void 0&&(y=""+h),f.key!==void 0&&(y=""+f.key),f.ref!==void 0&&(S=f.ref);for(m in f)r.call(f,m)&&!l.hasOwnProperty(m)&&(g[m]=f[m]);if(u&&u.defaultProps)for(m in f=u.defaultProps,f)g[m]===void 0&&(g[m]=f[m]);return{$$typeof:e,type:u,key:y,ref:S,props:g,_owner:o.current}}return Ko.Fragment=t,Ko.jsx=d,Ko.jsxs=d,Ko}var Kp;function X_(){return Kp||(Kp=1,Qu.exports=j_()),Qu.exports}var b=X_(),he=af();const $_=G_(he),Y_=V_({__proto__:null,default:$_},[he]);var Sl={},td={exports:{}},Fn={},nd={exports:{}},id={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Zp;function q_(){return Zp||(Zp=1,function(s){function e(X,K){var $=X.length;X.push(K);e:for(;0<$;){var O=$-1>>>1,W=X[O];if(0<o(W,K))X[O]=K,X[$]=W,$=O;else break e}}function t(X){return X.length===0?null:X[0]}function r(X){if(X.length===0)return null;var K=X[0],$=X.pop();if($!==K){X[0]=$;e:for(var O=0,W=X.length,Y=W>>>1;O<Y;){var de=2*(O+1)-1,ve=X[de],Te=de+1,Ae=X[Te];if(0>o(ve,$))Te<W&&0>o(Ae,ve)?(X[O]=Ae,X[Te]=$,O=Te):(X[O]=ve,X[de]=$,O=de);else if(Te<W&&0>o(Ae,$))X[O]=Ae,X[Te]=$,O=Te;else break e}}return K}function o(X,K){var $=X.sortIndex-K.sortIndex;return $!==0?$:X.id-K.id}if(typeof performance=="object"&&typeof performance.now=="function"){var l=performance;s.unstable_now=function(){return l.now()}}else{var d=Date,u=d.now();s.unstable_now=function(){return d.now()-u}}var f=[],h=[],m=1,g=null,y=3,S=!1,E=!1,M=!1,_=typeof setTimeout=="function"?setTimeout:null,v=typeof clearTimeout=="function"?clearTimeout:null,T=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function A(X){for(var K=t(h);K!==null;){if(K.callback===null)r(h);else if(K.startTime<=X)r(h),K.sortIndex=K.expirationTime,e(f,K);else break;K=t(h)}}function P(X){if(M=!1,A(X),!E)if(t(f)!==null)E=!0,te(F);else{var K=t(h);K!==null&&J(P,K.startTime-X)}}function F(X,K){E=!1,M&&(M=!1,v(ie),ie=-1),S=!0;var $=y;try{for(A(K),g=t(f);g!==null&&(!(g.expirationTime>K)||X&&!se());){var O=g.callback;if(typeof O=="function"){g.callback=null,y=g.priorityLevel;var W=O(g.expirationTime<=K);K=s.unstable_now(),typeof W=="function"?g.callback=W:g===t(f)&&r(f),A(K)}else r(f);g=t(f)}if(g!==null)var Y=!0;else{var de=t(h);de!==null&&J(P,de.startTime-K),Y=!1}return Y}finally{g=null,y=$,S=!1}}var D=!1,I=null,ie=-1,R=5,U=-1;function se(){return!(s.unstable_now()-U<R)}function le(){if(I!==null){var X=s.unstable_now();U=X;var K=!0;try{K=I(!0,X)}finally{K?me():(D=!1,I=null)}}else D=!1}var me;if(typeof T=="function")me=function(){T(le)};else if(typeof MessageChannel<"u"){var H=new MessageChannel,q=H.port2;H.port1.onmessage=le,me=function(){q.postMessage(null)}}else me=function(){_(le,0)};function te(X){I=X,D||(D=!0,me())}function J(X,K){ie=_(function(){X(s.unstable_now())},K)}s.unstable_IdlePriority=5,s.unstable_ImmediatePriority=1,s.unstable_LowPriority=4,s.unstable_NormalPriority=3,s.unstable_Profiling=null,s.unstable_UserBlockingPriority=2,s.unstable_cancelCallback=function(X){X.callback=null},s.unstable_continueExecution=function(){E||S||(E=!0,te(F))},s.unstable_forceFrameRate=function(X){0>X||125<X?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):R=0<X?Math.floor(1e3/X):5},s.unstable_getCurrentPriorityLevel=function(){return y},s.unstable_getFirstCallbackNode=function(){return t(f)},s.unstable_next=function(X){switch(y){case 1:case 2:case 3:var K=3;break;default:K=y}var $=y;y=K;try{return X()}finally{y=$}},s.unstable_pauseExecution=function(){},s.unstable_requestPaint=function(){},s.unstable_runWithPriority=function(X,K){switch(X){case 1:case 2:case 3:case 4:case 5:break;default:X=3}var $=y;y=X;try{return K()}finally{y=$}},s.unstable_scheduleCallback=function(X,K,$){var O=s.unstable_now();switch(typeof $=="object"&&$!==null?($=$.delay,$=typeof $=="number"&&0<$?O+$:O):$=O,X){case 1:var W=-1;break;case 2:W=250;break;case 5:W=1073741823;break;case 4:W=1e4;break;default:W=5e3}return W=$+W,X={id:m++,callback:K,priorityLevel:X,startTime:$,expirationTime:W,sortIndex:-1},$>O?(X.sortIndex=$,e(h,X),t(f)===null&&X===t(h)&&(M?(v(ie),ie=-1):M=!0,J(P,$-O))):(X.sortIndex=W,e(f,X),E||S||(E=!0,te(F))),X},s.unstable_shouldYield=se,s.unstable_wrapCallback=function(X){var K=y;return function(){var $=y;y=K;try{return X.apply(this,arguments)}finally{y=$}}}}(id)),id}var Jp;function K_(){return Jp||(Jp=1,nd.exports=q_()),nd.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Qp;function Z_(){if(Qp)return Fn;Qp=1;var s=af(),e=K_();function t(n){for(var i="https://reactjs.org/docs/error-decoder.html?invariant="+n,a=1;a<arguments.length;a++)i+="&args[]="+encodeURIComponent(arguments[a]);return"Minified React error #"+n+"; visit "+i+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var r=new Set,o={};function l(n,i){d(n,i),d(n+"Capture",i)}function d(n,i){for(o[n]=i,n=0;n<i.length;n++)r.add(i[n])}var u=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),f=Object.prototype.hasOwnProperty,h=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,m={},g={};function y(n){return f.call(g,n)?!0:f.call(m,n)?!1:h.test(n)?g[n]=!0:(m[n]=!0,!1)}function S(n,i,a,c){if(a!==null&&a.type===0)return!1;switch(typeof i){case"function":case"symbol":return!0;case"boolean":return c?!1:a!==null?!a.acceptsBooleans:(n=n.toLowerCase().slice(0,5),n!=="data-"&&n!=="aria-");default:return!1}}function E(n,i,a,c){if(i===null||typeof i>"u"||S(n,i,a,c))return!0;if(c)return!1;if(a!==null)switch(a.type){case 3:return!i;case 4:return i===!1;case 5:return isNaN(i);case 6:return isNaN(i)||1>i}return!1}function M(n,i,a,c,p,x,w){this.acceptsBooleans=i===2||i===3||i===4,this.attributeName=c,this.attributeNamespace=p,this.mustUseProperty=a,this.propertyName=n,this.type=i,this.sanitizeURL=x,this.removeEmptyString=w}var _={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n){_[n]=new M(n,0,!1,n,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(n){var i=n[0];_[i]=new M(i,1,!1,n[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(n){_[n]=new M(n,2,!1,n.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(n){_[n]=new M(n,2,!1,n,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n){_[n]=new M(n,3,!1,n.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(n){_[n]=new M(n,3,!0,n,null,!1,!1)}),["capture","download"].forEach(function(n){_[n]=new M(n,4,!1,n,null,!1,!1)}),["cols","rows","size","span"].forEach(function(n){_[n]=new M(n,6,!1,n,null,!1,!1)}),["rowSpan","start"].forEach(function(n){_[n]=new M(n,5,!1,n.toLowerCase(),null,!1,!1)});var v=/[\-:]([a-z])/g;function T(n){return n[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n){var i=n.replace(v,T);_[i]=new M(i,1,!1,n,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n){var i=n.replace(v,T);_[i]=new M(i,1,!1,n,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(n){var i=n.replace(v,T);_[i]=new M(i,1,!1,n,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(n){_[n]=new M(n,1,!1,n.toLowerCase(),null,!1,!1)}),_.xlinkHref=new M("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(n){_[n]=new M(n,1,!1,n.toLowerCase(),null,!0,!0)});function A(n,i,a,c){var p=_.hasOwnProperty(i)?_[i]:null;(p!==null?p.type!==0:c||!(2<i.length)||i[0]!=="o"&&i[0]!=="O"||i[1]!=="n"&&i[1]!=="N")&&(E(i,a,p,c)&&(a=null),c||p===null?y(i)&&(a===null?n.removeAttribute(i):n.setAttribute(i,""+a)):p.mustUseProperty?n[p.propertyName]=a===null?p.type===3?!1:"":a:(i=p.attributeName,c=p.attributeNamespace,a===null?n.removeAttribute(i):(p=p.type,a=p===3||p===4&&a===!0?"":""+a,c?n.setAttributeNS(c,i,a):n.setAttribute(i,a))))}var P=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,F=Symbol.for("react.element"),D=Symbol.for("react.portal"),I=Symbol.for("react.fragment"),ie=Symbol.for("react.strict_mode"),R=Symbol.for("react.profiler"),U=Symbol.for("react.provider"),se=Symbol.for("react.context"),le=Symbol.for("react.forward_ref"),me=Symbol.for("react.suspense"),H=Symbol.for("react.suspense_list"),q=Symbol.for("react.memo"),te=Symbol.for("react.lazy"),J=Symbol.for("react.offscreen"),X=Symbol.iterator;function K(n){return n===null||typeof n!="object"?null:(n=X&&n[X]||n["@@iterator"],typeof n=="function"?n:null)}var $=Object.assign,O;function W(n){if(O===void 0)try{throw Error()}catch(a){var i=a.stack.trim().match(/\n( *(at )?)/);O=i&&i[1]||""}return`
`+O+n}var Y=!1;function de(n,i){if(!n||Y)return"";Y=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(i)if(i=function(){throw Error()},Object.defineProperty(i.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(i,[])}catch(ae){var c=ae}Reflect.construct(n,[],i)}else{try{i.call()}catch(ae){c=ae}n.call(i.prototype)}else{try{throw Error()}catch(ae){c=ae}n()}}catch(ae){if(ae&&c&&typeof ae.stack=="string"){for(var p=ae.stack.split(`
`),x=c.stack.split(`
`),w=p.length-1,k=x.length-1;1<=w&&0<=k&&p[w]!==x[k];)k--;for(;1<=w&&0<=k;w--,k--)if(p[w]!==x[k]){if(w!==1||k!==1)do if(w--,k--,0>k||p[w]!==x[k]){var G=`
`+p[w].replace(" at new "," at ");return n.displayName&&G.includes("<anonymous>")&&(G=G.replace("<anonymous>",n.displayName)),G}while(1<=w&&0<=k);break}}}finally{Y=!1,Error.prepareStackTrace=a}return(n=n?n.displayName||n.name:"")?W(n):""}function ve(n){switch(n.tag){case 5:return W(n.type);case 16:return W("Lazy");case 13:return W("Suspense");case 19:return W("SuspenseList");case 0:case 2:case 15:return n=de(n.type,!1),n;case 11:return n=de(n.type.render,!1),n;case 1:return n=de(n.type,!0),n;default:return""}}function Te(n){if(n==null)return null;if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n;switch(n){case I:return"Fragment";case D:return"Portal";case R:return"Profiler";case ie:return"StrictMode";case me:return"Suspense";case H:return"SuspenseList"}if(typeof n=="object")switch(n.$$typeof){case se:return(n.displayName||"Context")+".Consumer";case U:return(n._context.displayName||"Context")+".Provider";case le:var i=n.render;return n=n.displayName,n||(n=i.displayName||i.name||"",n=n!==""?"ForwardRef("+n+")":"ForwardRef"),n;case q:return i=n.displayName||null,i!==null?i:Te(n.type)||"Memo";case te:i=n._payload,n=n._init;try{return Te(n(i))}catch{}}return null}function Ae(n){var i=n.type;switch(n.tag){case 24:return"Cache";case 9:return(i.displayName||"Context")+".Consumer";case 10:return(i._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return n=i.render,n=n.displayName||n.name||"",i.displayName||(n!==""?"ForwardRef("+n+")":"ForwardRef");case 7:return"Fragment";case 5:return i;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Te(i);case 8:return i===ie?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof i=="function")return i.displayName||i.name||null;if(typeof i=="string")return i}return null}function Fe(n){switch(typeof n){case"boolean":case"number":case"string":case"undefined":return n;case"object":return n;default:return""}}function ge(n){var i=n.type;return(n=n.nodeName)&&n.toLowerCase()==="input"&&(i==="checkbox"||i==="radio")}function be(n){var i=ge(n)?"checked":"value",a=Object.getOwnPropertyDescriptor(n.constructor.prototype,i),c=""+n[i];if(!n.hasOwnProperty(i)&&typeof a<"u"&&typeof a.get=="function"&&typeof a.set=="function"){var p=a.get,x=a.set;return Object.defineProperty(n,i,{configurable:!0,get:function(){return p.call(this)},set:function(w){c=""+w,x.call(this,w)}}),Object.defineProperty(n,i,{enumerable:a.enumerable}),{getValue:function(){return c},setValue:function(w){c=""+w},stopTracking:function(){n._valueTracker=null,delete n[i]}}}}function ze(n){n._valueTracker||(n._valueTracker=be(n))}function Q(n){if(!n)return!1;var i=n._valueTracker;if(!i)return!0;var a=i.getValue(),c="";return n&&(c=ge(n)?n.checked?"true":"false":n.value),n=c,n!==a?(i.setValue(n),!0):!1}function tt(n){if(n=n||(typeof document<"u"?document:void 0),typeof n>"u")return null;try{return n.activeElement||n.body}catch{return n.body}}function ke(n,i){var a=i.checked;return $({},i,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:a??n._wrapperState.initialChecked})}function Je(n,i){var a=i.defaultValue==null?"":i.defaultValue,c=i.checked!=null?i.checked:i.defaultChecked;a=Fe(i.value!=null?i.value:a),n._wrapperState={initialChecked:c,initialValue:a,controlled:i.type==="checkbox"||i.type==="radio"?i.checked!=null:i.value!=null}}function Ve(n,i){i=i.checked,i!=null&&A(n,"checked",i,!1)}function Mt(n,i){Ve(n,i);var a=Fe(i.value),c=i.type;if(a!=null)c==="number"?(a===0&&n.value===""||n.value!=a)&&(n.value=""+a):n.value!==""+a&&(n.value=""+a);else if(c==="submit"||c==="reset"){n.removeAttribute("value");return}i.hasOwnProperty("value")?L(n,i.type,a):i.hasOwnProperty("defaultValue")&&L(n,i.type,Fe(i.defaultValue)),i.checked==null&&i.defaultChecked!=null&&(n.defaultChecked=!!i.defaultChecked)}function ot(n,i,a){if(i.hasOwnProperty("value")||i.hasOwnProperty("defaultValue")){var c=i.type;if(!(c!=="submit"&&c!=="reset"||i.value!==void 0&&i.value!==null))return;i=""+n._wrapperState.initialValue,a||i===n.value||(n.value=i),n.defaultValue=i}a=n.name,a!==""&&(n.name=""),n.defaultChecked=!!n._wrapperState.initialChecked,a!==""&&(n.name=a)}function L(n,i,a){(i!=="number"||tt(n.ownerDocument)!==n)&&(a==null?n.defaultValue=""+n._wrapperState.initialValue:n.defaultValue!==""+a&&(n.defaultValue=""+a))}var C=Array.isArray;function re(n,i,a,c){if(n=n.options,i){i={};for(var p=0;p<a.length;p++)i["$"+a[p]]=!0;for(a=0;a<n.length;a++)p=i.hasOwnProperty("$"+n[a].value),n[a].selected!==p&&(n[a].selected=p),p&&c&&(n[a].defaultSelected=!0)}else{for(a=""+Fe(a),i=null,p=0;p<n.length;p++){if(n[p].value===a){n[p].selected=!0,c&&(n[p].defaultSelected=!0);return}i!==null||n[p].disabled||(i=n[p])}i!==null&&(i.selected=!0)}}function Me(n,i){if(i.dangerouslySetInnerHTML!=null)throw Error(t(91));return $({},i,{value:void 0,defaultValue:void 0,children:""+n._wrapperState.initialValue})}function ye(n,i){var a=i.value;if(a==null){if(a=i.children,i=i.defaultValue,a!=null){if(i!=null)throw Error(t(92));if(C(a)){if(1<a.length)throw Error(t(93));a=a[0]}i=a}i==null&&(i=""),a=i}n._wrapperState={initialValue:Fe(a)}}function we(n,i){var a=Fe(i.value),c=Fe(i.defaultValue);a!=null&&(a=""+a,a!==n.value&&(n.value=a),i.defaultValue==null&&n.defaultValue!==a&&(n.defaultValue=a)),c!=null&&(n.defaultValue=""+c)}function Ke(n){var i=n.textContent;i===n._wrapperState.initialValue&&i!==""&&i!==null&&(n.value=i)}function Ie(n){switch(n){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function He(n,i){return n==null||n==="http://www.w3.org/1999/xhtml"?Ie(i):n==="http://www.w3.org/2000/svg"&&i==="foreignObject"?"http://www.w3.org/1999/xhtml":n}var Ye,it=function(n){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(i,a,c,p){MSApp.execUnsafeLocalFunction(function(){return n(i,a,c,p)})}:n}(function(n,i){if(n.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in n)n.innerHTML=i;else{for(Ye=Ye||document.createElement("div"),Ye.innerHTML="<svg>"+i.valueOf().toString()+"</svg>",i=Ye.firstChild;n.firstChild;)n.removeChild(n.firstChild);for(;i.firstChild;)n.appendChild(i.firstChild)}});function _e(n,i){if(i){var a=n.firstChild;if(a&&a===n.lastChild&&a.nodeType===3){a.nodeValue=i;return}}n.textContent=i}var pt={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},B=["Webkit","ms","Moz","O"];Object.keys(pt).forEach(function(n){B.forEach(function(i){i=i+n.charAt(0).toUpperCase()+n.substring(1),pt[i]=pt[n]})});function xe(n,i,a){return i==null||typeof i=="boolean"||i===""?"":a||typeof i!="number"||i===0||pt.hasOwnProperty(n)&&pt[n]?(""+i).trim():i+"px"}function Ue(n,i){n=n.style;for(var a in i)if(i.hasOwnProperty(a)){var c=a.indexOf("--")===0,p=xe(a,i[a],c);a==="float"&&(a="cssFloat"),c?n.setProperty(a,p):n[a]=p}}var Re=$({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Xe(n,i){if(i){if(Re[n]&&(i.children!=null||i.dangerouslySetInnerHTML!=null))throw Error(t(137,n));if(i.dangerouslySetInnerHTML!=null){if(i.children!=null)throw Error(t(60));if(typeof i.dangerouslySetInnerHTML!="object"||!("__html"in i.dangerouslySetInnerHTML))throw Error(t(61))}if(i.style!=null&&typeof i.style!="object")throw Error(t(62))}}function dt(n,i){if(n.indexOf("-")===-1)return typeof i.is=="string";switch(n){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var mt=null;function st(n){return n=n.target||n.srcElement||window,n.correspondingUseElement&&(n=n.correspondingUseElement),n.nodeType===3?n.parentNode:n}var Le=null,V=null,Pe=null;function Ne(n){if(n=Io(n)){if(typeof Le!="function")throw Error(t(280));var i=n.stateNode;i&&(i=Oa(i),Le(n.stateNode,n.type,i))}}function oe(n){V?Pe?Pe.push(n):Pe=[n]:V=n}function pe(){if(V){var n=V,i=Pe;if(Pe=V=null,Ne(n),i)for(n=0;n<i.length;n++)Ne(i[n])}}function rt(n,i){return n(i)}function et(){}var Et=!1;function Ct(n,i,a){if(Et)return n(i,a);Et=!0;try{return rt(n,i,a)}finally{Et=!1,(V!==null||Pe!==null)&&(et(),pe())}}function At(n,i){var a=n.stateNode;if(a===null)return null;var c=Oa(a);if(c===null)return null;a=c[i];e:switch(i){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(c=!c.disabled)||(n=n.type,c=!(n==="button"||n==="input"||n==="select"||n==="textarea")),n=!c;break e;default:n=!1}if(n)return null;if(a&&typeof a!="function")throw Error(t(231,i,typeof a));return a}var Jt=!1;if(u)try{var hn={};Object.defineProperty(hn,"passive",{get:function(){Jt=!0}}),window.addEventListener("test",hn,hn),window.removeEventListener("test",hn,hn)}catch{Jt=!1}function ma(n,i,a,c,p,x,w,k,G){var ae=Array.prototype.slice.call(arguments,3);try{i.apply(a,ae)}catch(Ee){this.onError(Ee)}}var Nr=!1,bi=null,Dr=!1,qi=null,ga={onError:function(n){Nr=!0,bi=n}};function va(n,i,a,c,p,x,w,k,G){Nr=!1,bi=null,ma.apply(ga,arguments)}function Sc(n,i,a,c,p,x,w,k,G){if(va.apply(this,arguments),Nr){if(Nr){var ae=bi;Nr=!1,bi=null}else throw Error(t(198));Dr||(Dr=!0,qi=ae)}}function Ci(n){var i=n,a=n;if(n.alternate)for(;i.return;)i=i.return;else{n=i;do i=n,i.flags&4098&&(a=i.return),n=i.return;while(n)}return i.tag===3?a:null}function _a(n){if(n.tag===13){var i=n.memoizedState;if(i===null&&(n=n.alternate,n!==null&&(i=n.memoizedState)),i!==null)return i.dehydrated}return null}function N(n){if(Ci(n)!==n)throw Error(t(188))}function ee(n){var i=n.alternate;if(!i){if(i=Ci(n),i===null)throw Error(t(188));return i!==n?null:n}for(var a=n,c=i;;){var p=a.return;if(p===null)break;var x=p.alternate;if(x===null){if(c=p.return,c!==null){a=c;continue}break}if(p.child===x.child){for(x=p.child;x;){if(x===a)return N(p),n;if(x===c)return N(p),i;x=x.sibling}throw Error(t(188))}if(a.return!==c.return)a=p,c=x;else{for(var w=!1,k=p.child;k;){if(k===a){w=!0,a=p,c=x;break}if(k===c){w=!0,c=p,a=x;break}k=k.sibling}if(!w){for(k=x.child;k;){if(k===a){w=!0,a=x,c=p;break}if(k===c){w=!0,c=x,a=p;break}k=k.sibling}if(!w)throw Error(t(189))}}if(a.alternate!==c)throw Error(t(190))}if(a.tag!==3)throw Error(t(188));return a.stateNode.current===a?n:i}function ue(n){return n=ee(n),n!==null?fe(n):null}function fe(n){if(n.tag===5||n.tag===6)return n;for(n=n.child;n!==null;){var i=fe(n);if(i!==null)return i;n=n.sibling}return null}var ce=e.unstable_scheduleCallback,Ge=e.unstable_cancelCallback,nt=e.unstable_shouldYield,ct=e.unstable_requestPaint,je=e.unstable_now,gt=e.unstable_getCurrentPriorityLevel,ft=e.unstable_ImmediatePriority,ht=e.unstable_UserBlockingPriority,Nt=e.unstable_NormalPriority,Sn=e.unstable_LowPriority,$t=e.unstable_IdlePriority,Pn=null,wt=null;function vt(n){if(wt&&typeof wt.onCommitFiberRoot=="function")try{wt.onCommitFiberRoot(Pn,n,void 0,(n.current.flags&128)===128)}catch{}}var Mn=Math.clz32?Math.clz32:xa,kt=Math.log,Ri=Math.LN2;function xa(n){return n>>>=0,n===0?32:31-(kt(n)/Ri|0)|0}var _i=64,Ki=4194304;function Wt(n){switch(n&-n){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return n&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return n}}function qn(n,i){var a=n.pendingLanes;if(a===0)return 0;var c=0,p=n.suspendedLanes,x=n.pingedLanes,w=a&268435455;if(w!==0){var k=w&~p;k!==0?c=Wt(k):(x&=w,x!==0&&(c=Wt(x)))}else w=a&~p,w!==0?c=Wt(w):x!==0&&(c=Wt(x));if(c===0)return 0;if(i!==0&&i!==c&&!(i&p)&&(p=c&-c,x=i&-i,p>=x||p===16&&(x&4194240)!==0))return i;if(c&4&&(c|=a&16),i=n.entangledLanes,i!==0)for(n=n.entanglements,i&=c;0<i;)a=31-Mn(i),p=1<<a,c|=n[a],i&=~p;return c}function vo(n,i){switch(n){case 1:case 2:case 4:return i+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return i+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Ln(n,i){for(var a=n.suspendedLanes,c=n.pingedLanes,p=n.expirationTimes,x=n.pendingLanes;0<x;){var w=31-Mn(x),k=1<<w,G=p[w];G===-1?(!(k&a)||k&c)&&(p[w]=vo(k,i)):G<=i&&(n.expiredLanes|=k),x&=~k}}function Ur(n){return n=n.pendingLanes&-1073741825,n!==0?n:n&1073741824?1073741824:0}function ya(){var n=_i;return _i<<=1,!(_i&4194240)&&(_i=64),n}function cs(n){for(var i=[],a=0;31>a;a++)i.push(n);return i}function _o(n,i,a){n.pendingLanes|=i,i!==536870912&&(n.suspendedLanes=0,n.pingedLanes=0),n=n.eventTimes,i=31-Mn(i),n[i]=a}function c0(n,i){var a=n.pendingLanes&~i;n.pendingLanes=i,n.suspendedLanes=0,n.pingedLanes=0,n.expiredLanes&=i,n.mutableReadLanes&=i,n.entangledLanes&=i,i=n.entanglements;var c=n.eventTimes;for(n=n.expirationTimes;0<a;){var p=31-Mn(a),x=1<<p;i[p]=0,c[p]=-1,n[p]=-1,a&=~x}}function Mc(n,i){var a=n.entangledLanes|=i;for(n=n.entanglements;a;){var c=31-Mn(a),p=1<<c;p&i|n[c]&i&&(n[c]|=i),a&=~p}}var Pt=0;function Tf(n){return n&=-n,1<n?4<n?n&268435455?16:536870912:4:1}var Af,Ec,bf,Cf,Rf,wc=!1,Sa=[],Zi=null,Ji=null,Qi=null,xo=new Map,yo=new Map,er=[],u0="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Pf(n,i){switch(n){case"focusin":case"focusout":Zi=null;break;case"dragenter":case"dragleave":Ji=null;break;case"mouseover":case"mouseout":Qi=null;break;case"pointerover":case"pointerout":xo.delete(i.pointerId);break;case"gotpointercapture":case"lostpointercapture":yo.delete(i.pointerId)}}function So(n,i,a,c,p,x){return n===null||n.nativeEvent!==x?(n={blockedOn:i,domEventName:a,eventSystemFlags:c,nativeEvent:x,targetContainers:[p]},i!==null&&(i=Io(i),i!==null&&Ec(i)),n):(n.eventSystemFlags|=c,i=n.targetContainers,p!==null&&i.indexOf(p)===-1&&i.push(p),n)}function d0(n,i,a,c,p){switch(i){case"focusin":return Zi=So(Zi,n,i,a,c,p),!0;case"dragenter":return Ji=So(Ji,n,i,a,c,p),!0;case"mouseover":return Qi=So(Qi,n,i,a,c,p),!0;case"pointerover":var x=p.pointerId;return xo.set(x,So(xo.get(x)||null,n,i,a,c,p)),!0;case"gotpointercapture":return x=p.pointerId,yo.set(x,So(yo.get(x)||null,n,i,a,c,p)),!0}return!1}function Lf(n){var i=Ir(n.target);if(i!==null){var a=Ci(i);if(a!==null){if(i=a.tag,i===13){if(i=_a(a),i!==null){n.blockedOn=i,Rf(n.priority,function(){bf(a)});return}}else if(i===3&&a.stateNode.current.memoizedState.isDehydrated){n.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}n.blockedOn=null}function Ma(n){if(n.blockedOn!==null)return!1;for(var i=n.targetContainers;0<i.length;){var a=Ac(n.domEventName,n.eventSystemFlags,i[0],n.nativeEvent);if(a===null){a=n.nativeEvent;var c=new a.constructor(a.type,a);mt=c,a.target.dispatchEvent(c),mt=null}else return i=Io(a),i!==null&&Ec(i),n.blockedOn=a,!1;i.shift()}return!0}function Nf(n,i,a){Ma(n)&&a.delete(i)}function f0(){wc=!1,Zi!==null&&Ma(Zi)&&(Zi=null),Ji!==null&&Ma(Ji)&&(Ji=null),Qi!==null&&Ma(Qi)&&(Qi=null),xo.forEach(Nf),yo.forEach(Nf)}function Mo(n,i){n.blockedOn===i&&(n.blockedOn=null,wc||(wc=!0,e.unstable_scheduleCallback(e.unstable_NormalPriority,f0)))}function Eo(n){function i(p){return Mo(p,n)}if(0<Sa.length){Mo(Sa[0],n);for(var a=1;a<Sa.length;a++){var c=Sa[a];c.blockedOn===n&&(c.blockedOn=null)}}for(Zi!==null&&Mo(Zi,n),Ji!==null&&Mo(Ji,n),Qi!==null&&Mo(Qi,n),xo.forEach(i),yo.forEach(i),a=0;a<er.length;a++)c=er[a],c.blockedOn===n&&(c.blockedOn=null);for(;0<er.length&&(a=er[0],a.blockedOn===null);)Lf(a),a.blockedOn===null&&er.shift()}var us=P.ReactCurrentBatchConfig,Ea=!0;function h0(n,i,a,c){var p=Pt,x=us.transition;us.transition=null;try{Pt=1,Tc(n,i,a,c)}finally{Pt=p,us.transition=x}}function p0(n,i,a,c){var p=Pt,x=us.transition;us.transition=null;try{Pt=4,Tc(n,i,a,c)}finally{Pt=p,us.transition=x}}function Tc(n,i,a,c){if(Ea){var p=Ac(n,i,a,c);if(p===null)Gc(n,i,c,wa,a),Pf(n,c);else if(d0(p,n,i,a,c))c.stopPropagation();else if(Pf(n,c),i&4&&-1<u0.indexOf(n)){for(;p!==null;){var x=Io(p);if(x!==null&&Af(x),x=Ac(n,i,a,c),x===null&&Gc(n,i,c,wa,a),x===p)break;p=x}p!==null&&c.stopPropagation()}else Gc(n,i,c,null,a)}}var wa=null;function Ac(n,i,a,c){if(wa=null,n=st(c),n=Ir(n),n!==null)if(i=Ci(n),i===null)n=null;else if(a=i.tag,a===13){if(n=_a(i),n!==null)return n;n=null}else if(a===3){if(i.stateNode.current.memoizedState.isDehydrated)return i.tag===3?i.stateNode.containerInfo:null;n=null}else i!==n&&(n=null);return wa=n,null}function Df(n){switch(n){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(gt()){case ft:return 1;case ht:return 4;case Nt:case Sn:return 16;case $t:return 536870912;default:return 16}default:return 16}}var tr=null,bc=null,Ta=null;function Uf(){if(Ta)return Ta;var n,i=bc,a=i.length,c,p="value"in tr?tr.value:tr.textContent,x=p.length;for(n=0;n<a&&i[n]===p[n];n++);var w=a-n;for(c=1;c<=w&&i[a-c]===p[x-c];c++);return Ta=p.slice(n,1<c?1-c:void 0)}function Aa(n){var i=n.keyCode;return"charCode"in n?(n=n.charCode,n===0&&i===13&&(n=13)):n=i,n===10&&(n=13),32<=n||n===13?n:0}function ba(){return!0}function If(){return!1}function Bn(n){function i(a,c,p,x,w){this._reactName=a,this._targetInst=p,this.type=c,this.nativeEvent=x,this.target=w,this.currentTarget=null;for(var k in n)n.hasOwnProperty(k)&&(a=n[k],this[k]=a?a(x):x[k]);return this.isDefaultPrevented=(x.defaultPrevented!=null?x.defaultPrevented:x.returnValue===!1)?ba:If,this.isPropagationStopped=If,this}return $(i.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=ba)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=ba)},persist:function(){},isPersistent:ba}),i}var ds={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(n){return n.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Cc=Bn(ds),wo=$({},ds,{view:0,detail:0}),m0=Bn(wo),Rc,Pc,To,Ca=$({},wo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Nc,button:0,buttons:0,relatedTarget:function(n){return n.relatedTarget===void 0?n.fromElement===n.srcElement?n.toElement:n.fromElement:n.relatedTarget},movementX:function(n){return"movementX"in n?n.movementX:(n!==To&&(To&&n.type==="mousemove"?(Rc=n.screenX-To.screenX,Pc=n.screenY-To.screenY):Pc=Rc=0,To=n),Rc)},movementY:function(n){return"movementY"in n?n.movementY:Pc}}),Of=Bn(Ca),g0=$({},Ca,{dataTransfer:0}),v0=Bn(g0),_0=$({},wo,{relatedTarget:0}),Lc=Bn(_0),x0=$({},ds,{animationName:0,elapsedTime:0,pseudoElement:0}),y0=Bn(x0),S0=$({},ds,{clipboardData:function(n){return"clipboardData"in n?n.clipboardData:window.clipboardData}}),M0=Bn(S0),E0=$({},ds,{data:0}),Ff=Bn(E0),w0={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},T0={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},A0={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function b0(n){var i=this.nativeEvent;return i.getModifierState?i.getModifierState(n):(n=A0[n])?!!i[n]:!1}function Nc(){return b0}var C0=$({},wo,{key:function(n){if(n.key){var i=w0[n.key]||n.key;if(i!=="Unidentified")return i}return n.type==="keypress"?(n=Aa(n),n===13?"Enter":String.fromCharCode(n)):n.type==="keydown"||n.type==="keyup"?T0[n.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Nc,charCode:function(n){return n.type==="keypress"?Aa(n):0},keyCode:function(n){return n.type==="keydown"||n.type==="keyup"?n.keyCode:0},which:function(n){return n.type==="keypress"?Aa(n):n.type==="keydown"||n.type==="keyup"?n.keyCode:0}}),R0=Bn(C0),P0=$({},Ca,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),kf=Bn(P0),L0=$({},wo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Nc}),N0=Bn(L0),D0=$({},ds,{propertyName:0,elapsedTime:0,pseudoElement:0}),U0=Bn(D0),I0=$({},Ca,{deltaX:function(n){return"deltaX"in n?n.deltaX:"wheelDeltaX"in n?-n.wheelDeltaX:0},deltaY:function(n){return"deltaY"in n?n.deltaY:"wheelDeltaY"in n?-n.wheelDeltaY:"wheelDelta"in n?-n.wheelDelta:0},deltaZ:0,deltaMode:0}),O0=Bn(I0),F0=[9,13,27,32],Dc=u&&"CompositionEvent"in window,Ao=null;u&&"documentMode"in document&&(Ao=document.documentMode);var k0=u&&"TextEvent"in window&&!Ao,zf=u&&(!Dc||Ao&&8<Ao&&11>=Ao),Bf=" ",Hf=!1;function Vf(n,i){switch(n){case"keyup":return F0.indexOf(i.keyCode)!==-1;case"keydown":return i.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Gf(n){return n=n.detail,typeof n=="object"&&"data"in n?n.data:null}var fs=!1;function z0(n,i){switch(n){case"compositionend":return Gf(i);case"keypress":return i.which!==32?null:(Hf=!0,Bf);case"textInput":return n=i.data,n===Bf&&Hf?null:n;default:return null}}function B0(n,i){if(fs)return n==="compositionend"||!Dc&&Vf(n,i)?(n=Uf(),Ta=bc=tr=null,fs=!1,n):null;switch(n){case"paste":return null;case"keypress":if(!(i.ctrlKey||i.altKey||i.metaKey)||i.ctrlKey&&i.altKey){if(i.char&&1<i.char.length)return i.char;if(i.which)return String.fromCharCode(i.which)}return null;case"compositionend":return zf&&i.locale!=="ko"?null:i.data;default:return null}}var H0={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Wf(n){var i=n&&n.nodeName&&n.nodeName.toLowerCase();return i==="input"?!!H0[n.type]:i==="textarea"}function jf(n,i,a,c){oe(c),i=Da(i,"onChange"),0<i.length&&(a=new Cc("onChange","change",null,a,c),n.push({event:a,listeners:i}))}var bo=null,Co=null;function V0(n){ch(n,0)}function Ra(n){var i=vs(n);if(Q(i))return n}function G0(n,i){if(n==="change")return i}var Xf=!1;if(u){var Uc;if(u){var Ic="oninput"in document;if(!Ic){var $f=document.createElement("div");$f.setAttribute("oninput","return;"),Ic=typeof $f.oninput=="function"}Uc=Ic}else Uc=!1;Xf=Uc&&(!document.documentMode||9<document.documentMode)}function Yf(){bo&&(bo.detachEvent("onpropertychange",qf),Co=bo=null)}function qf(n){if(n.propertyName==="value"&&Ra(Co)){var i=[];jf(i,Co,n,st(n)),Ct(V0,i)}}function W0(n,i,a){n==="focusin"?(Yf(),bo=i,Co=a,bo.attachEvent("onpropertychange",qf)):n==="focusout"&&Yf()}function j0(n){if(n==="selectionchange"||n==="keyup"||n==="keydown")return Ra(Co)}function X0(n,i){if(n==="click")return Ra(i)}function $0(n,i){if(n==="input"||n==="change")return Ra(i)}function Y0(n,i){return n===i&&(n!==0||1/n===1/i)||n!==n&&i!==i}var oi=typeof Object.is=="function"?Object.is:Y0;function Ro(n,i){if(oi(n,i))return!0;if(typeof n!="object"||n===null||typeof i!="object"||i===null)return!1;var a=Object.keys(n),c=Object.keys(i);if(a.length!==c.length)return!1;for(c=0;c<a.length;c++){var p=a[c];if(!f.call(i,p)||!oi(n[p],i[p]))return!1}return!0}function Kf(n){for(;n&&n.firstChild;)n=n.firstChild;return n}function Zf(n,i){var a=Kf(n);n=0;for(var c;a;){if(a.nodeType===3){if(c=n+a.textContent.length,n<=i&&c>=i)return{node:a,offset:i-n};n=c}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=Kf(a)}}function Jf(n,i){return n&&i?n===i?!0:n&&n.nodeType===3?!1:i&&i.nodeType===3?Jf(n,i.parentNode):"contains"in n?n.contains(i):n.compareDocumentPosition?!!(n.compareDocumentPosition(i)&16):!1:!1}function Qf(){for(var n=window,i=tt();i instanceof n.HTMLIFrameElement;){try{var a=typeof i.contentWindow.location.href=="string"}catch{a=!1}if(a)n=i.contentWindow;else break;i=tt(n.document)}return i}function Oc(n){var i=n&&n.nodeName&&n.nodeName.toLowerCase();return i&&(i==="input"&&(n.type==="text"||n.type==="search"||n.type==="tel"||n.type==="url"||n.type==="password")||i==="textarea"||n.contentEditable==="true")}function q0(n){var i=Qf(),a=n.focusedElem,c=n.selectionRange;if(i!==a&&a&&a.ownerDocument&&Jf(a.ownerDocument.documentElement,a)){if(c!==null&&Oc(a)){if(i=c.start,n=c.end,n===void 0&&(n=i),"selectionStart"in a)a.selectionStart=i,a.selectionEnd=Math.min(n,a.value.length);else if(n=(i=a.ownerDocument||document)&&i.defaultView||window,n.getSelection){n=n.getSelection();var p=a.textContent.length,x=Math.min(c.start,p);c=c.end===void 0?x:Math.min(c.end,p),!n.extend&&x>c&&(p=c,c=x,x=p),p=Zf(a,x);var w=Zf(a,c);p&&w&&(n.rangeCount!==1||n.anchorNode!==p.node||n.anchorOffset!==p.offset||n.focusNode!==w.node||n.focusOffset!==w.offset)&&(i=i.createRange(),i.setStart(p.node,p.offset),n.removeAllRanges(),x>c?(n.addRange(i),n.extend(w.node,w.offset)):(i.setEnd(w.node,w.offset),n.addRange(i)))}}for(i=[],n=a;n=n.parentNode;)n.nodeType===1&&i.push({element:n,left:n.scrollLeft,top:n.scrollTop});for(typeof a.focus=="function"&&a.focus(),a=0;a<i.length;a++)n=i[a],n.element.scrollLeft=n.left,n.element.scrollTop=n.top}}var K0=u&&"documentMode"in document&&11>=document.documentMode,hs=null,Fc=null,Po=null,kc=!1;function eh(n,i,a){var c=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;kc||hs==null||hs!==tt(c)||(c=hs,"selectionStart"in c&&Oc(c)?c={start:c.selectionStart,end:c.selectionEnd}:(c=(c.ownerDocument&&c.ownerDocument.defaultView||window).getSelection(),c={anchorNode:c.anchorNode,anchorOffset:c.anchorOffset,focusNode:c.focusNode,focusOffset:c.focusOffset}),Po&&Ro(Po,c)||(Po=c,c=Da(Fc,"onSelect"),0<c.length&&(i=new Cc("onSelect","select",null,i,a),n.push({event:i,listeners:c}),i.target=hs)))}function Pa(n,i){var a={};return a[n.toLowerCase()]=i.toLowerCase(),a["Webkit"+n]="webkit"+i,a["Moz"+n]="moz"+i,a}var ps={animationend:Pa("Animation","AnimationEnd"),animationiteration:Pa("Animation","AnimationIteration"),animationstart:Pa("Animation","AnimationStart"),transitionend:Pa("Transition","TransitionEnd")},zc={},th={};u&&(th=document.createElement("div").style,"AnimationEvent"in window||(delete ps.animationend.animation,delete ps.animationiteration.animation,delete ps.animationstart.animation),"TransitionEvent"in window||delete ps.transitionend.transition);function La(n){if(zc[n])return zc[n];if(!ps[n])return n;var i=ps[n],a;for(a in i)if(i.hasOwnProperty(a)&&a in th)return zc[n]=i[a];return n}var nh=La("animationend"),ih=La("animationiteration"),rh=La("animationstart"),sh=La("transitionend"),oh=new Map,ah="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function nr(n,i){oh.set(n,i),l(i,[n])}for(var Bc=0;Bc<ah.length;Bc++){var Hc=ah[Bc],Z0=Hc.toLowerCase(),J0=Hc[0].toUpperCase()+Hc.slice(1);nr(Z0,"on"+J0)}nr(nh,"onAnimationEnd"),nr(ih,"onAnimationIteration"),nr(rh,"onAnimationStart"),nr("dblclick","onDoubleClick"),nr("focusin","onFocus"),nr("focusout","onBlur"),nr(sh,"onTransitionEnd"),d("onMouseEnter",["mouseout","mouseover"]),d("onMouseLeave",["mouseout","mouseover"]),d("onPointerEnter",["pointerout","pointerover"]),d("onPointerLeave",["pointerout","pointerover"]),l("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),l("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),l("onBeforeInput",["compositionend","keypress","textInput","paste"]),l("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Lo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Q0=new Set("cancel close invalid load scroll toggle".split(" ").concat(Lo));function lh(n,i,a){var c=n.type||"unknown-event";n.currentTarget=a,Sc(c,i,void 0,n),n.currentTarget=null}function ch(n,i){i=(i&4)!==0;for(var a=0;a<n.length;a++){var c=n[a],p=c.event;c=c.listeners;e:{var x=void 0;if(i)for(var w=c.length-1;0<=w;w--){var k=c[w],G=k.instance,ae=k.currentTarget;if(k=k.listener,G!==x&&p.isPropagationStopped())break e;lh(p,k,ae),x=G}else for(w=0;w<c.length;w++){if(k=c[w],G=k.instance,ae=k.currentTarget,k=k.listener,G!==x&&p.isPropagationStopped())break e;lh(p,k,ae),x=G}}}if(Dr)throw n=qi,Dr=!1,qi=null,n}function Ut(n,i){var a=i[qc];a===void 0&&(a=i[qc]=new Set);var c=n+"__bubble";a.has(c)||(uh(i,n,2,!1),a.add(c))}function Vc(n,i,a){var c=0;i&&(c|=4),uh(a,n,c,i)}var Na="_reactListening"+Math.random().toString(36).slice(2);function No(n){if(!n[Na]){n[Na]=!0,r.forEach(function(a){a!=="selectionchange"&&(Q0.has(a)||Vc(a,!1,n),Vc(a,!0,n))});var i=n.nodeType===9?n:n.ownerDocument;i===null||i[Na]||(i[Na]=!0,Vc("selectionchange",!1,i))}}function uh(n,i,a,c){switch(Df(i)){case 1:var p=h0;break;case 4:p=p0;break;default:p=Tc}a=p.bind(null,i,a,n),p=void 0,!Jt||i!=="touchstart"&&i!=="touchmove"&&i!=="wheel"||(p=!0),c?p!==void 0?n.addEventListener(i,a,{capture:!0,passive:p}):n.addEventListener(i,a,!0):p!==void 0?n.addEventListener(i,a,{passive:p}):n.addEventListener(i,a,!1)}function Gc(n,i,a,c,p){var x=c;if(!(i&1)&&!(i&2)&&c!==null)e:for(;;){if(c===null)return;var w=c.tag;if(w===3||w===4){var k=c.stateNode.containerInfo;if(k===p||k.nodeType===8&&k.parentNode===p)break;if(w===4)for(w=c.return;w!==null;){var G=w.tag;if((G===3||G===4)&&(G=w.stateNode.containerInfo,G===p||G.nodeType===8&&G.parentNode===p))return;w=w.return}for(;k!==null;){if(w=Ir(k),w===null)return;if(G=w.tag,G===5||G===6){c=x=w;continue e}k=k.parentNode}}c=c.return}Ct(function(){var ae=x,Ee=st(a),Ce=[];e:{var Se=oh.get(n);if(Se!==void 0){var We=Cc,qe=n;switch(n){case"keypress":if(Aa(a)===0)break e;case"keydown":case"keyup":We=R0;break;case"focusin":qe="focus",We=Lc;break;case"focusout":qe="blur",We=Lc;break;case"beforeblur":case"afterblur":We=Lc;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":We=Of;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":We=v0;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":We=N0;break;case nh:case ih:case rh:We=y0;break;case sh:We=U0;break;case"scroll":We=m0;break;case"wheel":We=O0;break;case"copy":case"cut":case"paste":We=M0;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":We=kf}var Ze=(i&4)!==0,Yt=!Ze&&n==="scroll",Z=Ze?Se!==null?Se+"Capture":null:Se;Ze=[];for(var j=ae,ne;j!==null;){ne=j;var De=ne.stateNode;if(ne.tag===5&&De!==null&&(ne=De,Z!==null&&(De=At(j,Z),De!=null&&Ze.push(Do(j,De,ne)))),Yt)break;j=j.return}0<Ze.length&&(Se=new We(Se,qe,null,a,Ee),Ce.push({event:Se,listeners:Ze}))}}if(!(i&7)){e:{if(Se=n==="mouseover"||n==="pointerover",We=n==="mouseout"||n==="pointerout",Se&&a!==mt&&(qe=a.relatedTarget||a.fromElement)&&(Ir(qe)||qe[Pi]))break e;if((We||Se)&&(Se=Ee.window===Ee?Ee:(Se=Ee.ownerDocument)?Se.defaultView||Se.parentWindow:window,We?(qe=a.relatedTarget||a.toElement,We=ae,qe=qe?Ir(qe):null,qe!==null&&(Yt=Ci(qe),qe!==Yt||qe.tag!==5&&qe.tag!==6)&&(qe=null)):(We=null,qe=ae),We!==qe)){if(Ze=Of,De="onMouseLeave",Z="onMouseEnter",j="mouse",(n==="pointerout"||n==="pointerover")&&(Ze=kf,De="onPointerLeave",Z="onPointerEnter",j="pointer"),Yt=We==null?Se:vs(We),ne=qe==null?Se:vs(qe),Se=new Ze(De,j+"leave",We,a,Ee),Se.target=Yt,Se.relatedTarget=ne,De=null,Ir(Ee)===ae&&(Ze=new Ze(Z,j+"enter",qe,a,Ee),Ze.target=ne,Ze.relatedTarget=Yt,De=Ze),Yt=De,We&&qe)t:{for(Ze=We,Z=qe,j=0,ne=Ze;ne;ne=ms(ne))j++;for(ne=0,De=Z;De;De=ms(De))ne++;for(;0<j-ne;)Ze=ms(Ze),j--;for(;0<ne-j;)Z=ms(Z),ne--;for(;j--;){if(Ze===Z||Z!==null&&Ze===Z.alternate)break t;Ze=ms(Ze),Z=ms(Z)}Ze=null}else Ze=null;We!==null&&dh(Ce,Se,We,Ze,!1),qe!==null&&Yt!==null&&dh(Ce,Yt,qe,Ze,!0)}}e:{if(Se=ae?vs(ae):window,We=Se.nodeName&&Se.nodeName.toLowerCase(),We==="select"||We==="input"&&Se.type==="file")var Qe=G0;else if(Wf(Se))if(Xf)Qe=$0;else{Qe=j0;var at=W0}else(We=Se.nodeName)&&We.toLowerCase()==="input"&&(Se.type==="checkbox"||Se.type==="radio")&&(Qe=X0);if(Qe&&(Qe=Qe(n,ae))){jf(Ce,Qe,a,Ee);break e}at&&at(n,Se,ae),n==="focusout"&&(at=Se._wrapperState)&&at.controlled&&Se.type==="number"&&L(Se,"number",Se.value)}switch(at=ae?vs(ae):window,n){case"focusin":(Wf(at)||at.contentEditable==="true")&&(hs=at,Fc=ae,Po=null);break;case"focusout":Po=Fc=hs=null;break;case"mousedown":kc=!0;break;case"contextmenu":case"mouseup":case"dragend":kc=!1,eh(Ce,a,Ee);break;case"selectionchange":if(K0)break;case"keydown":case"keyup":eh(Ce,a,Ee)}var lt;if(Dc)e:{switch(n){case"compositionstart":var ut="onCompositionStart";break e;case"compositionend":ut="onCompositionEnd";break e;case"compositionupdate":ut="onCompositionUpdate";break e}ut=void 0}else fs?Vf(n,a)&&(ut="onCompositionEnd"):n==="keydown"&&a.keyCode===229&&(ut="onCompositionStart");ut&&(zf&&a.locale!=="ko"&&(fs||ut!=="onCompositionStart"?ut==="onCompositionEnd"&&fs&&(lt=Uf()):(tr=Ee,bc="value"in tr?tr.value:tr.textContent,fs=!0)),at=Da(ae,ut),0<at.length&&(ut=new Ff(ut,n,null,a,Ee),Ce.push({event:ut,listeners:at}),lt?ut.data=lt:(lt=Gf(a),lt!==null&&(ut.data=lt)))),(lt=k0?z0(n,a):B0(n,a))&&(ae=Da(ae,"onBeforeInput"),0<ae.length&&(Ee=new Ff("onBeforeInput","beforeinput",null,a,Ee),Ce.push({event:Ee,listeners:ae}),Ee.data=lt))}ch(Ce,i)})}function Do(n,i,a){return{instance:n,listener:i,currentTarget:a}}function Da(n,i){for(var a=i+"Capture",c=[];n!==null;){var p=n,x=p.stateNode;p.tag===5&&x!==null&&(p=x,x=At(n,a),x!=null&&c.unshift(Do(n,x,p)),x=At(n,i),x!=null&&c.push(Do(n,x,p))),n=n.return}return c}function ms(n){if(n===null)return null;do n=n.return;while(n&&n.tag!==5);return n||null}function dh(n,i,a,c,p){for(var x=i._reactName,w=[];a!==null&&a!==c;){var k=a,G=k.alternate,ae=k.stateNode;if(G!==null&&G===c)break;k.tag===5&&ae!==null&&(k=ae,p?(G=At(a,x),G!=null&&w.unshift(Do(a,G,k))):p||(G=At(a,x),G!=null&&w.push(Do(a,G,k)))),a=a.return}w.length!==0&&n.push({event:i,listeners:w})}var e_=/\r\n?/g,t_=/\u0000|\uFFFD/g;function fh(n){return(typeof n=="string"?n:""+n).replace(e_,`
`).replace(t_,"")}function Ua(n,i,a){if(i=fh(i),fh(n)!==i&&a)throw Error(t(425))}function Ia(){}var Wc=null,jc=null;function Xc(n,i){return n==="textarea"||n==="noscript"||typeof i.children=="string"||typeof i.children=="number"||typeof i.dangerouslySetInnerHTML=="object"&&i.dangerouslySetInnerHTML!==null&&i.dangerouslySetInnerHTML.__html!=null}var $c=typeof setTimeout=="function"?setTimeout:void 0,n_=typeof clearTimeout=="function"?clearTimeout:void 0,hh=typeof Promise=="function"?Promise:void 0,i_=typeof queueMicrotask=="function"?queueMicrotask:typeof hh<"u"?function(n){return hh.resolve(null).then(n).catch(r_)}:$c;function r_(n){setTimeout(function(){throw n})}function Yc(n,i){var a=i,c=0;do{var p=a.nextSibling;if(n.removeChild(a),p&&p.nodeType===8)if(a=p.data,a==="/$"){if(c===0){n.removeChild(p),Eo(i);return}c--}else a!=="$"&&a!=="$?"&&a!=="$!"||c++;a=p}while(a);Eo(i)}function ir(n){for(;n!=null;n=n.nextSibling){var i=n.nodeType;if(i===1||i===3)break;if(i===8){if(i=n.data,i==="$"||i==="$!"||i==="$?")break;if(i==="/$")return null}}return n}function ph(n){n=n.previousSibling;for(var i=0;n;){if(n.nodeType===8){var a=n.data;if(a==="$"||a==="$!"||a==="$?"){if(i===0)return n;i--}else a==="/$"&&i++}n=n.previousSibling}return null}var gs=Math.random().toString(36).slice(2),xi="__reactFiber$"+gs,Uo="__reactProps$"+gs,Pi="__reactContainer$"+gs,qc="__reactEvents$"+gs,s_="__reactListeners$"+gs,o_="__reactHandles$"+gs;function Ir(n){var i=n[xi];if(i)return i;for(var a=n.parentNode;a;){if(i=a[Pi]||a[xi]){if(a=i.alternate,i.child!==null||a!==null&&a.child!==null)for(n=ph(n);n!==null;){if(a=n[xi])return a;n=ph(n)}return i}n=a,a=n.parentNode}return null}function Io(n){return n=n[xi]||n[Pi],!n||n.tag!==5&&n.tag!==6&&n.tag!==13&&n.tag!==3?null:n}function vs(n){if(n.tag===5||n.tag===6)return n.stateNode;throw Error(t(33))}function Oa(n){return n[Uo]||null}var Kc=[],_s=-1;function rr(n){return{current:n}}function It(n){0>_s||(n.current=Kc[_s],Kc[_s]=null,_s--)}function Dt(n,i){_s++,Kc[_s]=n.current,n.current=i}var sr={},pn=rr(sr),Nn=rr(!1),Or=sr;function xs(n,i){var a=n.type.contextTypes;if(!a)return sr;var c=n.stateNode;if(c&&c.__reactInternalMemoizedUnmaskedChildContext===i)return c.__reactInternalMemoizedMaskedChildContext;var p={},x;for(x in a)p[x]=i[x];return c&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=i,n.__reactInternalMemoizedMaskedChildContext=p),p}function Dn(n){return n=n.childContextTypes,n!=null}function Fa(){It(Nn),It(pn)}function mh(n,i,a){if(pn.current!==sr)throw Error(t(168));Dt(pn,i),Dt(Nn,a)}function gh(n,i,a){var c=n.stateNode;if(i=i.childContextTypes,typeof c.getChildContext!="function")return a;c=c.getChildContext();for(var p in c)if(!(p in i))throw Error(t(108,Ae(n)||"Unknown",p));return $({},a,c)}function ka(n){return n=(n=n.stateNode)&&n.__reactInternalMemoizedMergedChildContext||sr,Or=pn.current,Dt(pn,n),Dt(Nn,Nn.current),!0}function vh(n,i,a){var c=n.stateNode;if(!c)throw Error(t(169));a?(n=gh(n,i,Or),c.__reactInternalMemoizedMergedChildContext=n,It(Nn),It(pn),Dt(pn,n)):It(Nn),Dt(Nn,a)}var Li=null,za=!1,Zc=!1;function _h(n){Li===null?Li=[n]:Li.push(n)}function a_(n){za=!0,_h(n)}function or(){if(!Zc&&Li!==null){Zc=!0;var n=0,i=Pt;try{var a=Li;for(Pt=1;n<a.length;n++){var c=a[n];do c=c(!0);while(c!==null)}Li=null,za=!1}catch(p){throw Li!==null&&(Li=Li.slice(n+1)),ce(ft,or),p}finally{Pt=i,Zc=!1}}return null}var ys=[],Ss=0,Ba=null,Ha=0,Kn=[],Zn=0,Fr=null,Ni=1,Di="";function kr(n,i){ys[Ss++]=Ha,ys[Ss++]=Ba,Ba=n,Ha=i}function xh(n,i,a){Kn[Zn++]=Ni,Kn[Zn++]=Di,Kn[Zn++]=Fr,Fr=n;var c=Ni;n=Di;var p=32-Mn(c)-1;c&=~(1<<p),a+=1;var x=32-Mn(i)+p;if(30<x){var w=p-p%5;x=(c&(1<<w)-1).toString(32),c>>=w,p-=w,Ni=1<<32-Mn(i)+p|a<<p|c,Di=x+n}else Ni=1<<x|a<<p|c,Di=n}function Jc(n){n.return!==null&&(kr(n,1),xh(n,1,0))}function Qc(n){for(;n===Ba;)Ba=ys[--Ss],ys[Ss]=null,Ha=ys[--Ss],ys[Ss]=null;for(;n===Fr;)Fr=Kn[--Zn],Kn[Zn]=null,Di=Kn[--Zn],Kn[Zn]=null,Ni=Kn[--Zn],Kn[Zn]=null}var Hn=null,Vn=null,zt=!1,ai=null;function yh(n,i){var a=ti(5,null,null,0);a.elementType="DELETED",a.stateNode=i,a.return=n,i=n.deletions,i===null?(n.deletions=[a],n.flags|=16):i.push(a)}function Sh(n,i){switch(n.tag){case 5:var a=n.type;return i=i.nodeType!==1||a.toLowerCase()!==i.nodeName.toLowerCase()?null:i,i!==null?(n.stateNode=i,Hn=n,Vn=ir(i.firstChild),!0):!1;case 6:return i=n.pendingProps===""||i.nodeType!==3?null:i,i!==null?(n.stateNode=i,Hn=n,Vn=null,!0):!1;case 13:return i=i.nodeType!==8?null:i,i!==null?(a=Fr!==null?{id:Ni,overflow:Di}:null,n.memoizedState={dehydrated:i,treeContext:a,retryLane:1073741824},a=ti(18,null,null,0),a.stateNode=i,a.return=n,n.child=a,Hn=n,Vn=null,!0):!1;default:return!1}}function eu(n){return(n.mode&1)!==0&&(n.flags&128)===0}function tu(n){if(zt){var i=Vn;if(i){var a=i;if(!Sh(n,i)){if(eu(n))throw Error(t(418));i=ir(a.nextSibling);var c=Hn;i&&Sh(n,i)?yh(c,a):(n.flags=n.flags&-4097|2,zt=!1,Hn=n)}}else{if(eu(n))throw Error(t(418));n.flags=n.flags&-4097|2,zt=!1,Hn=n}}}function Mh(n){for(n=n.return;n!==null&&n.tag!==5&&n.tag!==3&&n.tag!==13;)n=n.return;Hn=n}function Va(n){if(n!==Hn)return!1;if(!zt)return Mh(n),zt=!0,!1;var i;if((i=n.tag!==3)&&!(i=n.tag!==5)&&(i=n.type,i=i!=="head"&&i!=="body"&&!Xc(n.type,n.memoizedProps)),i&&(i=Vn)){if(eu(n))throw Eh(),Error(t(418));for(;i;)yh(n,i),i=ir(i.nextSibling)}if(Mh(n),n.tag===13){if(n=n.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(t(317));e:{for(n=n.nextSibling,i=0;n;){if(n.nodeType===8){var a=n.data;if(a==="/$"){if(i===0){Vn=ir(n.nextSibling);break e}i--}else a!=="$"&&a!=="$!"&&a!=="$?"||i++}n=n.nextSibling}Vn=null}}else Vn=Hn?ir(n.stateNode.nextSibling):null;return!0}function Eh(){for(var n=Vn;n;)n=ir(n.nextSibling)}function Ms(){Vn=Hn=null,zt=!1}function nu(n){ai===null?ai=[n]:ai.push(n)}var l_=P.ReactCurrentBatchConfig;function Oo(n,i,a){if(n=a.ref,n!==null&&typeof n!="function"&&typeof n!="object"){if(a._owner){if(a=a._owner,a){if(a.tag!==1)throw Error(t(309));var c=a.stateNode}if(!c)throw Error(t(147,n));var p=c,x=""+n;return i!==null&&i.ref!==null&&typeof i.ref=="function"&&i.ref._stringRef===x?i.ref:(i=function(w){var k=p.refs;w===null?delete k[x]:k[x]=w},i._stringRef=x,i)}if(typeof n!="string")throw Error(t(284));if(!a._owner)throw Error(t(290,n))}return n}function Ga(n,i){throw n=Object.prototype.toString.call(i),Error(t(31,n==="[object Object]"?"object with keys {"+Object.keys(i).join(", ")+"}":n))}function wh(n){var i=n._init;return i(n._payload)}function Th(n){function i(Z,j){if(n){var ne=Z.deletions;ne===null?(Z.deletions=[j],Z.flags|=16):ne.push(j)}}function a(Z,j){if(!n)return null;for(;j!==null;)i(Z,j),j=j.sibling;return null}function c(Z,j){for(Z=new Map;j!==null;)j.key!==null?Z.set(j.key,j):Z.set(j.index,j),j=j.sibling;return Z}function p(Z,j){return Z=pr(Z,j),Z.index=0,Z.sibling=null,Z}function x(Z,j,ne){return Z.index=ne,n?(ne=Z.alternate,ne!==null?(ne=ne.index,ne<j?(Z.flags|=2,j):ne):(Z.flags|=2,j)):(Z.flags|=1048576,j)}function w(Z){return n&&Z.alternate===null&&(Z.flags|=2),Z}function k(Z,j,ne,De){return j===null||j.tag!==6?(j=$u(ne,Z.mode,De),j.return=Z,j):(j=p(j,ne),j.return=Z,j)}function G(Z,j,ne,De){var Qe=ne.type;return Qe===I?Ee(Z,j,ne.props.children,De,ne.key):j!==null&&(j.elementType===Qe||typeof Qe=="object"&&Qe!==null&&Qe.$$typeof===te&&wh(Qe)===j.type)?(De=p(j,ne.props),De.ref=Oo(Z,j,ne),De.return=Z,De):(De=hl(ne.type,ne.key,ne.props,null,Z.mode,De),De.ref=Oo(Z,j,ne),De.return=Z,De)}function ae(Z,j,ne,De){return j===null||j.tag!==4||j.stateNode.containerInfo!==ne.containerInfo||j.stateNode.implementation!==ne.implementation?(j=Yu(ne,Z.mode,De),j.return=Z,j):(j=p(j,ne.children||[]),j.return=Z,j)}function Ee(Z,j,ne,De,Qe){return j===null||j.tag!==7?(j=Xr(ne,Z.mode,De,Qe),j.return=Z,j):(j=p(j,ne),j.return=Z,j)}function Ce(Z,j,ne){if(typeof j=="string"&&j!==""||typeof j=="number")return j=$u(""+j,Z.mode,ne),j.return=Z,j;if(typeof j=="object"&&j!==null){switch(j.$$typeof){case F:return ne=hl(j.type,j.key,j.props,null,Z.mode,ne),ne.ref=Oo(Z,null,j),ne.return=Z,ne;case D:return j=Yu(j,Z.mode,ne),j.return=Z,j;case te:var De=j._init;return Ce(Z,De(j._payload),ne)}if(C(j)||K(j))return j=Xr(j,Z.mode,ne,null),j.return=Z,j;Ga(Z,j)}return null}function Se(Z,j,ne,De){var Qe=j!==null?j.key:null;if(typeof ne=="string"&&ne!==""||typeof ne=="number")return Qe!==null?null:k(Z,j,""+ne,De);if(typeof ne=="object"&&ne!==null){switch(ne.$$typeof){case F:return ne.key===Qe?G(Z,j,ne,De):null;case D:return ne.key===Qe?ae(Z,j,ne,De):null;case te:return Qe=ne._init,Se(Z,j,Qe(ne._payload),De)}if(C(ne)||K(ne))return Qe!==null?null:Ee(Z,j,ne,De,null);Ga(Z,ne)}return null}function We(Z,j,ne,De,Qe){if(typeof De=="string"&&De!==""||typeof De=="number")return Z=Z.get(ne)||null,k(j,Z,""+De,Qe);if(typeof De=="object"&&De!==null){switch(De.$$typeof){case F:return Z=Z.get(De.key===null?ne:De.key)||null,G(j,Z,De,Qe);case D:return Z=Z.get(De.key===null?ne:De.key)||null,ae(j,Z,De,Qe);case te:var at=De._init;return We(Z,j,ne,at(De._payload),Qe)}if(C(De)||K(De))return Z=Z.get(ne)||null,Ee(j,Z,De,Qe,null);Ga(j,De)}return null}function qe(Z,j,ne,De){for(var Qe=null,at=null,lt=j,ut=j=0,ln=null;lt!==null&&ut<ne.length;ut++){lt.index>ut?(ln=lt,lt=null):ln=lt.sibling;var bt=Se(Z,lt,ne[ut],De);if(bt===null){lt===null&&(lt=ln);break}n&&lt&&bt.alternate===null&&i(Z,lt),j=x(bt,j,ut),at===null?Qe=bt:at.sibling=bt,at=bt,lt=ln}if(ut===ne.length)return a(Z,lt),zt&&kr(Z,ut),Qe;if(lt===null){for(;ut<ne.length;ut++)lt=Ce(Z,ne[ut],De),lt!==null&&(j=x(lt,j,ut),at===null?Qe=lt:at.sibling=lt,at=lt);return zt&&kr(Z,ut),Qe}for(lt=c(Z,lt);ut<ne.length;ut++)ln=We(lt,Z,ut,ne[ut],De),ln!==null&&(n&&ln.alternate!==null&&lt.delete(ln.key===null?ut:ln.key),j=x(ln,j,ut),at===null?Qe=ln:at.sibling=ln,at=ln);return n&&lt.forEach(function(mr){return i(Z,mr)}),zt&&kr(Z,ut),Qe}function Ze(Z,j,ne,De){var Qe=K(ne);if(typeof Qe!="function")throw Error(t(150));if(ne=Qe.call(ne),ne==null)throw Error(t(151));for(var at=Qe=null,lt=j,ut=j=0,ln=null,bt=ne.next();lt!==null&&!bt.done;ut++,bt=ne.next()){lt.index>ut?(ln=lt,lt=null):ln=lt.sibling;var mr=Se(Z,lt,bt.value,De);if(mr===null){lt===null&&(lt=ln);break}n&&lt&&mr.alternate===null&&i(Z,lt),j=x(mr,j,ut),at===null?Qe=mr:at.sibling=mr,at=mr,lt=ln}if(bt.done)return a(Z,lt),zt&&kr(Z,ut),Qe;if(lt===null){for(;!bt.done;ut++,bt=ne.next())bt=Ce(Z,bt.value,De),bt!==null&&(j=x(bt,j,ut),at===null?Qe=bt:at.sibling=bt,at=bt);return zt&&kr(Z,ut),Qe}for(lt=c(Z,lt);!bt.done;ut++,bt=ne.next())bt=We(lt,Z,ut,bt.value,De),bt!==null&&(n&&bt.alternate!==null&&lt.delete(bt.key===null?ut:bt.key),j=x(bt,j,ut),at===null?Qe=bt:at.sibling=bt,at=bt);return n&&lt.forEach(function(H_){return i(Z,H_)}),zt&&kr(Z,ut),Qe}function Yt(Z,j,ne,De){if(typeof ne=="object"&&ne!==null&&ne.type===I&&ne.key===null&&(ne=ne.props.children),typeof ne=="object"&&ne!==null){switch(ne.$$typeof){case F:e:{for(var Qe=ne.key,at=j;at!==null;){if(at.key===Qe){if(Qe=ne.type,Qe===I){if(at.tag===7){a(Z,at.sibling),j=p(at,ne.props.children),j.return=Z,Z=j;break e}}else if(at.elementType===Qe||typeof Qe=="object"&&Qe!==null&&Qe.$$typeof===te&&wh(Qe)===at.type){a(Z,at.sibling),j=p(at,ne.props),j.ref=Oo(Z,at,ne),j.return=Z,Z=j;break e}a(Z,at);break}else i(Z,at);at=at.sibling}ne.type===I?(j=Xr(ne.props.children,Z.mode,De,ne.key),j.return=Z,Z=j):(De=hl(ne.type,ne.key,ne.props,null,Z.mode,De),De.ref=Oo(Z,j,ne),De.return=Z,Z=De)}return w(Z);case D:e:{for(at=ne.key;j!==null;){if(j.key===at)if(j.tag===4&&j.stateNode.containerInfo===ne.containerInfo&&j.stateNode.implementation===ne.implementation){a(Z,j.sibling),j=p(j,ne.children||[]),j.return=Z,Z=j;break e}else{a(Z,j);break}else i(Z,j);j=j.sibling}j=Yu(ne,Z.mode,De),j.return=Z,Z=j}return w(Z);case te:return at=ne._init,Yt(Z,j,at(ne._payload),De)}if(C(ne))return qe(Z,j,ne,De);if(K(ne))return Ze(Z,j,ne,De);Ga(Z,ne)}return typeof ne=="string"&&ne!==""||typeof ne=="number"?(ne=""+ne,j!==null&&j.tag===6?(a(Z,j.sibling),j=p(j,ne),j.return=Z,Z=j):(a(Z,j),j=$u(ne,Z.mode,De),j.return=Z,Z=j),w(Z)):a(Z,j)}return Yt}var Es=Th(!0),Ah=Th(!1),Wa=rr(null),ja=null,ws=null,iu=null;function ru(){iu=ws=ja=null}function su(n){var i=Wa.current;It(Wa),n._currentValue=i}function ou(n,i,a){for(;n!==null;){var c=n.alternate;if((n.childLanes&i)!==i?(n.childLanes|=i,c!==null&&(c.childLanes|=i)):c!==null&&(c.childLanes&i)!==i&&(c.childLanes|=i),n===a)break;n=n.return}}function Ts(n,i){ja=n,iu=ws=null,n=n.dependencies,n!==null&&n.firstContext!==null&&(n.lanes&i&&(Un=!0),n.firstContext=null)}function Jn(n){var i=n._currentValue;if(iu!==n)if(n={context:n,memoizedValue:i,next:null},ws===null){if(ja===null)throw Error(t(308));ws=n,ja.dependencies={lanes:0,firstContext:n}}else ws=ws.next=n;return i}var zr=null;function au(n){zr===null?zr=[n]:zr.push(n)}function bh(n,i,a,c){var p=i.interleaved;return p===null?(a.next=a,au(i)):(a.next=p.next,p.next=a),i.interleaved=a,Ui(n,c)}function Ui(n,i){n.lanes|=i;var a=n.alternate;for(a!==null&&(a.lanes|=i),a=n,n=n.return;n!==null;)n.childLanes|=i,a=n.alternate,a!==null&&(a.childLanes|=i),a=n,n=n.return;return a.tag===3?a.stateNode:null}var ar=!1;function lu(n){n.updateQueue={baseState:n.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Ch(n,i){n=n.updateQueue,i.updateQueue===n&&(i.updateQueue={baseState:n.baseState,firstBaseUpdate:n.firstBaseUpdate,lastBaseUpdate:n.lastBaseUpdate,shared:n.shared,effects:n.effects})}function Ii(n,i){return{eventTime:n,lane:i,tag:0,payload:null,callback:null,next:null}}function lr(n,i,a){var c=n.updateQueue;if(c===null)return null;if(c=c.shared,Tt&2){var p=c.pending;return p===null?i.next=i:(i.next=p.next,p.next=i),c.pending=i,Ui(n,a)}return p=c.interleaved,p===null?(i.next=i,au(c)):(i.next=p.next,p.next=i),c.interleaved=i,Ui(n,a)}function Xa(n,i,a){if(i=i.updateQueue,i!==null&&(i=i.shared,(a&4194240)!==0)){var c=i.lanes;c&=n.pendingLanes,a|=c,i.lanes=a,Mc(n,a)}}function Rh(n,i){var a=n.updateQueue,c=n.alternate;if(c!==null&&(c=c.updateQueue,a===c)){var p=null,x=null;if(a=a.firstBaseUpdate,a!==null){do{var w={eventTime:a.eventTime,lane:a.lane,tag:a.tag,payload:a.payload,callback:a.callback,next:null};x===null?p=x=w:x=x.next=w,a=a.next}while(a!==null);x===null?p=x=i:x=x.next=i}else p=x=i;a={baseState:c.baseState,firstBaseUpdate:p,lastBaseUpdate:x,shared:c.shared,effects:c.effects},n.updateQueue=a;return}n=a.lastBaseUpdate,n===null?a.firstBaseUpdate=i:n.next=i,a.lastBaseUpdate=i}function $a(n,i,a,c){var p=n.updateQueue;ar=!1;var x=p.firstBaseUpdate,w=p.lastBaseUpdate,k=p.shared.pending;if(k!==null){p.shared.pending=null;var G=k,ae=G.next;G.next=null,w===null?x=ae:w.next=ae,w=G;var Ee=n.alternate;Ee!==null&&(Ee=Ee.updateQueue,k=Ee.lastBaseUpdate,k!==w&&(k===null?Ee.firstBaseUpdate=ae:k.next=ae,Ee.lastBaseUpdate=G))}if(x!==null){var Ce=p.baseState;w=0,Ee=ae=G=null,k=x;do{var Se=k.lane,We=k.eventTime;if((c&Se)===Se){Ee!==null&&(Ee=Ee.next={eventTime:We,lane:0,tag:k.tag,payload:k.payload,callback:k.callback,next:null});e:{var qe=n,Ze=k;switch(Se=i,We=a,Ze.tag){case 1:if(qe=Ze.payload,typeof qe=="function"){Ce=qe.call(We,Ce,Se);break e}Ce=qe;break e;case 3:qe.flags=qe.flags&-65537|128;case 0:if(qe=Ze.payload,Se=typeof qe=="function"?qe.call(We,Ce,Se):qe,Se==null)break e;Ce=$({},Ce,Se);break e;case 2:ar=!0}}k.callback!==null&&k.lane!==0&&(n.flags|=64,Se=p.effects,Se===null?p.effects=[k]:Se.push(k))}else We={eventTime:We,lane:Se,tag:k.tag,payload:k.payload,callback:k.callback,next:null},Ee===null?(ae=Ee=We,G=Ce):Ee=Ee.next=We,w|=Se;if(k=k.next,k===null){if(k=p.shared.pending,k===null)break;Se=k,k=Se.next,Se.next=null,p.lastBaseUpdate=Se,p.shared.pending=null}}while(!0);if(Ee===null&&(G=Ce),p.baseState=G,p.firstBaseUpdate=ae,p.lastBaseUpdate=Ee,i=p.shared.interleaved,i!==null){p=i;do w|=p.lane,p=p.next;while(p!==i)}else x===null&&(p.shared.lanes=0);Vr|=w,n.lanes=w,n.memoizedState=Ce}}function Ph(n,i,a){if(n=i.effects,i.effects=null,n!==null)for(i=0;i<n.length;i++){var c=n[i],p=c.callback;if(p!==null){if(c.callback=null,c=a,typeof p!="function")throw Error(t(191,p));p.call(c)}}}var Fo={},yi=rr(Fo),ko=rr(Fo),zo=rr(Fo);function Br(n){if(n===Fo)throw Error(t(174));return n}function cu(n,i){switch(Dt(zo,i),Dt(ko,n),Dt(yi,Fo),n=i.nodeType,n){case 9:case 11:i=(i=i.documentElement)?i.namespaceURI:He(null,"");break;default:n=n===8?i.parentNode:i,i=n.namespaceURI||null,n=n.tagName,i=He(i,n)}It(yi),Dt(yi,i)}function As(){It(yi),It(ko),It(zo)}function Lh(n){Br(zo.current);var i=Br(yi.current),a=He(i,n.type);i!==a&&(Dt(ko,n),Dt(yi,a))}function uu(n){ko.current===n&&(It(yi),It(ko))}var Vt=rr(0);function Ya(n){for(var i=n;i!==null;){if(i.tag===13){var a=i.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||a.data==="$?"||a.data==="$!"))return i}else if(i.tag===19&&i.memoizedProps.revealOrder!==void 0){if(i.flags&128)return i}else if(i.child!==null){i.child.return=i,i=i.child;continue}if(i===n)break;for(;i.sibling===null;){if(i.return===null||i.return===n)return null;i=i.return}i.sibling.return=i.return,i=i.sibling}return null}var du=[];function fu(){for(var n=0;n<du.length;n++)du[n]._workInProgressVersionPrimary=null;du.length=0}var qa=P.ReactCurrentDispatcher,hu=P.ReactCurrentBatchConfig,Hr=0,Gt=null,Qt=null,on=null,Ka=!1,Bo=!1,Ho=0,c_=0;function mn(){throw Error(t(321))}function pu(n,i){if(i===null)return!1;for(var a=0;a<i.length&&a<n.length;a++)if(!oi(n[a],i[a]))return!1;return!0}function mu(n,i,a,c,p,x){if(Hr=x,Gt=i,i.memoizedState=null,i.updateQueue=null,i.lanes=0,qa.current=n===null||n.memoizedState===null?h_:p_,n=a(c,p),Bo){x=0;do{if(Bo=!1,Ho=0,25<=x)throw Error(t(301));x+=1,on=Qt=null,i.updateQueue=null,qa.current=m_,n=a(c,p)}while(Bo)}if(qa.current=Qa,i=Qt!==null&&Qt.next!==null,Hr=0,on=Qt=Gt=null,Ka=!1,i)throw Error(t(300));return n}function gu(){var n=Ho!==0;return Ho=0,n}function Si(){var n={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return on===null?Gt.memoizedState=on=n:on=on.next=n,on}function Qn(){if(Qt===null){var n=Gt.alternate;n=n!==null?n.memoizedState:null}else n=Qt.next;var i=on===null?Gt.memoizedState:on.next;if(i!==null)on=i,Qt=n;else{if(n===null)throw Error(t(310));Qt=n,n={memoizedState:Qt.memoizedState,baseState:Qt.baseState,baseQueue:Qt.baseQueue,queue:Qt.queue,next:null},on===null?Gt.memoizedState=on=n:on=on.next=n}return on}function Vo(n,i){return typeof i=="function"?i(n):i}function vu(n){var i=Qn(),a=i.queue;if(a===null)throw Error(t(311));a.lastRenderedReducer=n;var c=Qt,p=c.baseQueue,x=a.pending;if(x!==null){if(p!==null){var w=p.next;p.next=x.next,x.next=w}c.baseQueue=p=x,a.pending=null}if(p!==null){x=p.next,c=c.baseState;var k=w=null,G=null,ae=x;do{var Ee=ae.lane;if((Hr&Ee)===Ee)G!==null&&(G=G.next={lane:0,action:ae.action,hasEagerState:ae.hasEagerState,eagerState:ae.eagerState,next:null}),c=ae.hasEagerState?ae.eagerState:n(c,ae.action);else{var Ce={lane:Ee,action:ae.action,hasEagerState:ae.hasEagerState,eagerState:ae.eagerState,next:null};G===null?(k=G=Ce,w=c):G=G.next=Ce,Gt.lanes|=Ee,Vr|=Ee}ae=ae.next}while(ae!==null&&ae!==x);G===null?w=c:G.next=k,oi(c,i.memoizedState)||(Un=!0),i.memoizedState=c,i.baseState=w,i.baseQueue=G,a.lastRenderedState=c}if(n=a.interleaved,n!==null){p=n;do x=p.lane,Gt.lanes|=x,Vr|=x,p=p.next;while(p!==n)}else p===null&&(a.lanes=0);return[i.memoizedState,a.dispatch]}function _u(n){var i=Qn(),a=i.queue;if(a===null)throw Error(t(311));a.lastRenderedReducer=n;var c=a.dispatch,p=a.pending,x=i.memoizedState;if(p!==null){a.pending=null;var w=p=p.next;do x=n(x,w.action),w=w.next;while(w!==p);oi(x,i.memoizedState)||(Un=!0),i.memoizedState=x,i.baseQueue===null&&(i.baseState=x),a.lastRenderedState=x}return[x,c]}function Nh(){}function Dh(n,i){var a=Gt,c=Qn(),p=i(),x=!oi(c.memoizedState,p);if(x&&(c.memoizedState=p,Un=!0),c=c.queue,xu(Oh.bind(null,a,c,n),[n]),c.getSnapshot!==i||x||on!==null&&on.memoizedState.tag&1){if(a.flags|=2048,Go(9,Ih.bind(null,a,c,p,i),void 0,null),an===null)throw Error(t(349));Hr&30||Uh(a,i,p)}return p}function Uh(n,i,a){n.flags|=16384,n={getSnapshot:i,value:a},i=Gt.updateQueue,i===null?(i={lastEffect:null,stores:null},Gt.updateQueue=i,i.stores=[n]):(a=i.stores,a===null?i.stores=[n]:a.push(n))}function Ih(n,i,a,c){i.value=a,i.getSnapshot=c,Fh(i)&&kh(n)}function Oh(n,i,a){return a(function(){Fh(i)&&kh(n)})}function Fh(n){var i=n.getSnapshot;n=n.value;try{var a=i();return!oi(n,a)}catch{return!0}}function kh(n){var i=Ui(n,1);i!==null&&di(i,n,1,-1)}function zh(n){var i=Si();return typeof n=="function"&&(n=n()),i.memoizedState=i.baseState=n,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Vo,lastRenderedState:n},i.queue=n,n=n.dispatch=f_.bind(null,Gt,n),[i.memoizedState,n]}function Go(n,i,a,c){return n={tag:n,create:i,destroy:a,deps:c,next:null},i=Gt.updateQueue,i===null?(i={lastEffect:null,stores:null},Gt.updateQueue=i,i.lastEffect=n.next=n):(a=i.lastEffect,a===null?i.lastEffect=n.next=n:(c=a.next,a.next=n,n.next=c,i.lastEffect=n)),n}function Bh(){return Qn().memoizedState}function Za(n,i,a,c){var p=Si();Gt.flags|=n,p.memoizedState=Go(1|i,a,void 0,c===void 0?null:c)}function Ja(n,i,a,c){var p=Qn();c=c===void 0?null:c;var x=void 0;if(Qt!==null){var w=Qt.memoizedState;if(x=w.destroy,c!==null&&pu(c,w.deps)){p.memoizedState=Go(i,a,x,c);return}}Gt.flags|=n,p.memoizedState=Go(1|i,a,x,c)}function Hh(n,i){return Za(8390656,8,n,i)}function xu(n,i){return Ja(2048,8,n,i)}function Vh(n,i){return Ja(4,2,n,i)}function Gh(n,i){return Ja(4,4,n,i)}function Wh(n,i){if(typeof i=="function")return n=n(),i(n),function(){i(null)};if(i!=null)return n=n(),i.current=n,function(){i.current=null}}function jh(n,i,a){return a=a!=null?a.concat([n]):null,Ja(4,4,Wh.bind(null,i,n),a)}function yu(){}function Xh(n,i){var a=Qn();i=i===void 0?null:i;var c=a.memoizedState;return c!==null&&i!==null&&pu(i,c[1])?c[0]:(a.memoizedState=[n,i],n)}function $h(n,i){var a=Qn();i=i===void 0?null:i;var c=a.memoizedState;return c!==null&&i!==null&&pu(i,c[1])?c[0]:(n=n(),a.memoizedState=[n,i],n)}function Yh(n,i,a){return Hr&21?(oi(a,i)||(a=ya(),Gt.lanes|=a,Vr|=a,n.baseState=!0),i):(n.baseState&&(n.baseState=!1,Un=!0),n.memoizedState=a)}function u_(n,i){var a=Pt;Pt=a!==0&&4>a?a:4,n(!0);var c=hu.transition;hu.transition={};try{n(!1),i()}finally{Pt=a,hu.transition=c}}function qh(){return Qn().memoizedState}function d_(n,i,a){var c=fr(n);if(a={lane:c,action:a,hasEagerState:!1,eagerState:null,next:null},Kh(n))Zh(i,a);else if(a=bh(n,i,a,c),a!==null){var p=wn();di(a,n,c,p),Jh(a,i,c)}}function f_(n,i,a){var c=fr(n),p={lane:c,action:a,hasEagerState:!1,eagerState:null,next:null};if(Kh(n))Zh(i,p);else{var x=n.alternate;if(n.lanes===0&&(x===null||x.lanes===0)&&(x=i.lastRenderedReducer,x!==null))try{var w=i.lastRenderedState,k=x(w,a);if(p.hasEagerState=!0,p.eagerState=k,oi(k,w)){var G=i.interleaved;G===null?(p.next=p,au(i)):(p.next=G.next,G.next=p),i.interleaved=p;return}}catch{}finally{}a=bh(n,i,p,c),a!==null&&(p=wn(),di(a,n,c,p),Jh(a,i,c))}}function Kh(n){var i=n.alternate;return n===Gt||i!==null&&i===Gt}function Zh(n,i){Bo=Ka=!0;var a=n.pending;a===null?i.next=i:(i.next=a.next,a.next=i),n.pending=i}function Jh(n,i,a){if(a&4194240){var c=i.lanes;c&=n.pendingLanes,a|=c,i.lanes=a,Mc(n,a)}}var Qa={readContext:Jn,useCallback:mn,useContext:mn,useEffect:mn,useImperativeHandle:mn,useInsertionEffect:mn,useLayoutEffect:mn,useMemo:mn,useReducer:mn,useRef:mn,useState:mn,useDebugValue:mn,useDeferredValue:mn,useTransition:mn,useMutableSource:mn,useSyncExternalStore:mn,useId:mn,unstable_isNewReconciler:!1},h_={readContext:Jn,useCallback:function(n,i){return Si().memoizedState=[n,i===void 0?null:i],n},useContext:Jn,useEffect:Hh,useImperativeHandle:function(n,i,a){return a=a!=null?a.concat([n]):null,Za(4194308,4,Wh.bind(null,i,n),a)},useLayoutEffect:function(n,i){return Za(4194308,4,n,i)},useInsertionEffect:function(n,i){return Za(4,2,n,i)},useMemo:function(n,i){var a=Si();return i=i===void 0?null:i,n=n(),a.memoizedState=[n,i],n},useReducer:function(n,i,a){var c=Si();return i=a!==void 0?a(i):i,c.memoizedState=c.baseState=i,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:n,lastRenderedState:i},c.queue=n,n=n.dispatch=d_.bind(null,Gt,n),[c.memoizedState,n]},useRef:function(n){var i=Si();return n={current:n},i.memoizedState=n},useState:zh,useDebugValue:yu,useDeferredValue:function(n){return Si().memoizedState=n},useTransition:function(){var n=zh(!1),i=n[0];return n=u_.bind(null,n[1]),Si().memoizedState=n,[i,n]},useMutableSource:function(){},useSyncExternalStore:function(n,i,a){var c=Gt,p=Si();if(zt){if(a===void 0)throw Error(t(407));a=a()}else{if(a=i(),an===null)throw Error(t(349));Hr&30||Uh(c,i,a)}p.memoizedState=a;var x={value:a,getSnapshot:i};return p.queue=x,Hh(Oh.bind(null,c,x,n),[n]),c.flags|=2048,Go(9,Ih.bind(null,c,x,a,i),void 0,null),a},useId:function(){var n=Si(),i=an.identifierPrefix;if(zt){var a=Di,c=Ni;a=(c&~(1<<32-Mn(c)-1)).toString(32)+a,i=":"+i+"R"+a,a=Ho++,0<a&&(i+="H"+a.toString(32)),i+=":"}else a=c_++,i=":"+i+"r"+a.toString(32)+":";return n.memoizedState=i},unstable_isNewReconciler:!1},p_={readContext:Jn,useCallback:Xh,useContext:Jn,useEffect:xu,useImperativeHandle:jh,useInsertionEffect:Vh,useLayoutEffect:Gh,useMemo:$h,useReducer:vu,useRef:Bh,useState:function(){return vu(Vo)},useDebugValue:yu,useDeferredValue:function(n){var i=Qn();return Yh(i,Qt.memoizedState,n)},useTransition:function(){var n=vu(Vo)[0],i=Qn().memoizedState;return[n,i]},useMutableSource:Nh,useSyncExternalStore:Dh,useId:qh,unstable_isNewReconciler:!1},m_={readContext:Jn,useCallback:Xh,useContext:Jn,useEffect:xu,useImperativeHandle:jh,useInsertionEffect:Vh,useLayoutEffect:Gh,useMemo:$h,useReducer:_u,useRef:Bh,useState:function(){return _u(Vo)},useDebugValue:yu,useDeferredValue:function(n){var i=Qn();return Qt===null?i.memoizedState=n:Yh(i,Qt.memoizedState,n)},useTransition:function(){var n=_u(Vo)[0],i=Qn().memoizedState;return[n,i]},useMutableSource:Nh,useSyncExternalStore:Dh,useId:qh,unstable_isNewReconciler:!1};function li(n,i){if(n&&n.defaultProps){i=$({},i),n=n.defaultProps;for(var a in n)i[a]===void 0&&(i[a]=n[a]);return i}return i}function Su(n,i,a,c){i=n.memoizedState,a=a(c,i),a=a==null?i:$({},i,a),n.memoizedState=a,n.lanes===0&&(n.updateQueue.baseState=a)}var el={isMounted:function(n){return(n=n._reactInternals)?Ci(n)===n:!1},enqueueSetState:function(n,i,a){n=n._reactInternals;var c=wn(),p=fr(n),x=Ii(c,p);x.payload=i,a!=null&&(x.callback=a),i=lr(n,x,p),i!==null&&(di(i,n,p,c),Xa(i,n,p))},enqueueReplaceState:function(n,i,a){n=n._reactInternals;var c=wn(),p=fr(n),x=Ii(c,p);x.tag=1,x.payload=i,a!=null&&(x.callback=a),i=lr(n,x,p),i!==null&&(di(i,n,p,c),Xa(i,n,p))},enqueueForceUpdate:function(n,i){n=n._reactInternals;var a=wn(),c=fr(n),p=Ii(a,c);p.tag=2,i!=null&&(p.callback=i),i=lr(n,p,c),i!==null&&(di(i,n,c,a),Xa(i,n,c))}};function Qh(n,i,a,c,p,x,w){return n=n.stateNode,typeof n.shouldComponentUpdate=="function"?n.shouldComponentUpdate(c,x,w):i.prototype&&i.prototype.isPureReactComponent?!Ro(a,c)||!Ro(p,x):!0}function ep(n,i,a){var c=!1,p=sr,x=i.contextType;return typeof x=="object"&&x!==null?x=Jn(x):(p=Dn(i)?Or:pn.current,c=i.contextTypes,x=(c=c!=null)?xs(n,p):sr),i=new i(a,x),n.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=el,n.stateNode=i,i._reactInternals=n,c&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=p,n.__reactInternalMemoizedMaskedChildContext=x),i}function tp(n,i,a,c){n=i.state,typeof i.componentWillReceiveProps=="function"&&i.componentWillReceiveProps(a,c),typeof i.UNSAFE_componentWillReceiveProps=="function"&&i.UNSAFE_componentWillReceiveProps(a,c),i.state!==n&&el.enqueueReplaceState(i,i.state,null)}function Mu(n,i,a,c){var p=n.stateNode;p.props=a,p.state=n.memoizedState,p.refs={},lu(n);var x=i.contextType;typeof x=="object"&&x!==null?p.context=Jn(x):(x=Dn(i)?Or:pn.current,p.context=xs(n,x)),p.state=n.memoizedState,x=i.getDerivedStateFromProps,typeof x=="function"&&(Su(n,i,x,a),p.state=n.memoizedState),typeof i.getDerivedStateFromProps=="function"||typeof p.getSnapshotBeforeUpdate=="function"||typeof p.UNSAFE_componentWillMount!="function"&&typeof p.componentWillMount!="function"||(i=p.state,typeof p.componentWillMount=="function"&&p.componentWillMount(),typeof p.UNSAFE_componentWillMount=="function"&&p.UNSAFE_componentWillMount(),i!==p.state&&el.enqueueReplaceState(p,p.state,null),$a(n,a,p,c),p.state=n.memoizedState),typeof p.componentDidMount=="function"&&(n.flags|=4194308)}function bs(n,i){try{var a="",c=i;do a+=ve(c),c=c.return;while(c);var p=a}catch(x){p=`
Error generating stack: `+x.message+`
`+x.stack}return{value:n,source:i,stack:p,digest:null}}function Eu(n,i,a){return{value:n,source:null,stack:a??null,digest:i??null}}function wu(n,i){try{console.error(i.value)}catch(a){setTimeout(function(){throw a})}}var g_=typeof WeakMap=="function"?WeakMap:Map;function np(n,i,a){a=Ii(-1,a),a.tag=3,a.payload={element:null};var c=i.value;return a.callback=function(){al||(al=!0,zu=c),wu(n,i)},a}function ip(n,i,a){a=Ii(-1,a),a.tag=3;var c=n.type.getDerivedStateFromError;if(typeof c=="function"){var p=i.value;a.payload=function(){return c(p)},a.callback=function(){wu(n,i)}}var x=n.stateNode;return x!==null&&typeof x.componentDidCatch=="function"&&(a.callback=function(){wu(n,i),typeof c!="function"&&(ur===null?ur=new Set([this]):ur.add(this));var w=i.stack;this.componentDidCatch(i.value,{componentStack:w!==null?w:""})}),a}function rp(n,i,a){var c=n.pingCache;if(c===null){c=n.pingCache=new g_;var p=new Set;c.set(i,p)}else p=c.get(i),p===void 0&&(p=new Set,c.set(i,p));p.has(a)||(p.add(a),n=P_.bind(null,n,i,a),i.then(n,n))}function sp(n){do{var i;if((i=n.tag===13)&&(i=n.memoizedState,i=i!==null?i.dehydrated!==null:!0),i)return n;n=n.return}while(n!==null);return null}function op(n,i,a,c,p){return n.mode&1?(n.flags|=65536,n.lanes=p,n):(n===i?n.flags|=65536:(n.flags|=128,a.flags|=131072,a.flags&=-52805,a.tag===1&&(a.alternate===null?a.tag=17:(i=Ii(-1,1),i.tag=2,lr(a,i,1))),a.lanes|=1),n)}var v_=P.ReactCurrentOwner,Un=!1;function En(n,i,a,c){i.child=n===null?Ah(i,null,a,c):Es(i,n.child,a,c)}function ap(n,i,a,c,p){a=a.render;var x=i.ref;return Ts(i,p),c=mu(n,i,a,c,x,p),a=gu(),n!==null&&!Un?(i.updateQueue=n.updateQueue,i.flags&=-2053,n.lanes&=~p,Oi(n,i,p)):(zt&&a&&Jc(i),i.flags|=1,En(n,i,c,p),i.child)}function lp(n,i,a,c,p){if(n===null){var x=a.type;return typeof x=="function"&&!Xu(x)&&x.defaultProps===void 0&&a.compare===null&&a.defaultProps===void 0?(i.tag=15,i.type=x,cp(n,i,x,c,p)):(n=hl(a.type,null,c,i,i.mode,p),n.ref=i.ref,n.return=i,i.child=n)}if(x=n.child,!(n.lanes&p)){var w=x.memoizedProps;if(a=a.compare,a=a!==null?a:Ro,a(w,c)&&n.ref===i.ref)return Oi(n,i,p)}return i.flags|=1,n=pr(x,c),n.ref=i.ref,n.return=i,i.child=n}function cp(n,i,a,c,p){if(n!==null){var x=n.memoizedProps;if(Ro(x,c)&&n.ref===i.ref)if(Un=!1,i.pendingProps=c=x,(n.lanes&p)!==0)n.flags&131072&&(Un=!0);else return i.lanes=n.lanes,Oi(n,i,p)}return Tu(n,i,a,c,p)}function up(n,i,a){var c=i.pendingProps,p=c.children,x=n!==null?n.memoizedState:null;if(c.mode==="hidden")if(!(i.mode&1))i.memoizedState={baseLanes:0,cachePool:null,transitions:null},Dt(Rs,Gn),Gn|=a;else{if(!(a&1073741824))return n=x!==null?x.baseLanes|a:a,i.lanes=i.childLanes=1073741824,i.memoizedState={baseLanes:n,cachePool:null,transitions:null},i.updateQueue=null,Dt(Rs,Gn),Gn|=n,null;i.memoizedState={baseLanes:0,cachePool:null,transitions:null},c=x!==null?x.baseLanes:a,Dt(Rs,Gn),Gn|=c}else x!==null?(c=x.baseLanes|a,i.memoizedState=null):c=a,Dt(Rs,Gn),Gn|=c;return En(n,i,p,a),i.child}function dp(n,i){var a=i.ref;(n===null&&a!==null||n!==null&&n.ref!==a)&&(i.flags|=512,i.flags|=2097152)}function Tu(n,i,a,c,p){var x=Dn(a)?Or:pn.current;return x=xs(i,x),Ts(i,p),a=mu(n,i,a,c,x,p),c=gu(),n!==null&&!Un?(i.updateQueue=n.updateQueue,i.flags&=-2053,n.lanes&=~p,Oi(n,i,p)):(zt&&c&&Jc(i),i.flags|=1,En(n,i,a,p),i.child)}function fp(n,i,a,c,p){if(Dn(a)){var x=!0;ka(i)}else x=!1;if(Ts(i,p),i.stateNode===null)nl(n,i),ep(i,a,c),Mu(i,a,c,p),c=!0;else if(n===null){var w=i.stateNode,k=i.memoizedProps;w.props=k;var G=w.context,ae=a.contextType;typeof ae=="object"&&ae!==null?ae=Jn(ae):(ae=Dn(a)?Or:pn.current,ae=xs(i,ae));var Ee=a.getDerivedStateFromProps,Ce=typeof Ee=="function"||typeof w.getSnapshotBeforeUpdate=="function";Ce||typeof w.UNSAFE_componentWillReceiveProps!="function"&&typeof w.componentWillReceiveProps!="function"||(k!==c||G!==ae)&&tp(i,w,c,ae),ar=!1;var Se=i.memoizedState;w.state=Se,$a(i,c,w,p),G=i.memoizedState,k!==c||Se!==G||Nn.current||ar?(typeof Ee=="function"&&(Su(i,a,Ee,c),G=i.memoizedState),(k=ar||Qh(i,a,k,c,Se,G,ae))?(Ce||typeof w.UNSAFE_componentWillMount!="function"&&typeof w.componentWillMount!="function"||(typeof w.componentWillMount=="function"&&w.componentWillMount(),typeof w.UNSAFE_componentWillMount=="function"&&w.UNSAFE_componentWillMount()),typeof w.componentDidMount=="function"&&(i.flags|=4194308)):(typeof w.componentDidMount=="function"&&(i.flags|=4194308),i.memoizedProps=c,i.memoizedState=G),w.props=c,w.state=G,w.context=ae,c=k):(typeof w.componentDidMount=="function"&&(i.flags|=4194308),c=!1)}else{w=i.stateNode,Ch(n,i),k=i.memoizedProps,ae=i.type===i.elementType?k:li(i.type,k),w.props=ae,Ce=i.pendingProps,Se=w.context,G=a.contextType,typeof G=="object"&&G!==null?G=Jn(G):(G=Dn(a)?Or:pn.current,G=xs(i,G));var We=a.getDerivedStateFromProps;(Ee=typeof We=="function"||typeof w.getSnapshotBeforeUpdate=="function")||typeof w.UNSAFE_componentWillReceiveProps!="function"&&typeof w.componentWillReceiveProps!="function"||(k!==Ce||Se!==G)&&tp(i,w,c,G),ar=!1,Se=i.memoizedState,w.state=Se,$a(i,c,w,p);var qe=i.memoizedState;k!==Ce||Se!==qe||Nn.current||ar?(typeof We=="function"&&(Su(i,a,We,c),qe=i.memoizedState),(ae=ar||Qh(i,a,ae,c,Se,qe,G)||!1)?(Ee||typeof w.UNSAFE_componentWillUpdate!="function"&&typeof w.componentWillUpdate!="function"||(typeof w.componentWillUpdate=="function"&&w.componentWillUpdate(c,qe,G),typeof w.UNSAFE_componentWillUpdate=="function"&&w.UNSAFE_componentWillUpdate(c,qe,G)),typeof w.componentDidUpdate=="function"&&(i.flags|=4),typeof w.getSnapshotBeforeUpdate=="function"&&(i.flags|=1024)):(typeof w.componentDidUpdate!="function"||k===n.memoizedProps&&Se===n.memoizedState||(i.flags|=4),typeof w.getSnapshotBeforeUpdate!="function"||k===n.memoizedProps&&Se===n.memoizedState||(i.flags|=1024),i.memoizedProps=c,i.memoizedState=qe),w.props=c,w.state=qe,w.context=G,c=ae):(typeof w.componentDidUpdate!="function"||k===n.memoizedProps&&Se===n.memoizedState||(i.flags|=4),typeof w.getSnapshotBeforeUpdate!="function"||k===n.memoizedProps&&Se===n.memoizedState||(i.flags|=1024),c=!1)}return Au(n,i,a,c,x,p)}function Au(n,i,a,c,p,x){dp(n,i);var w=(i.flags&128)!==0;if(!c&&!w)return p&&vh(i,a,!1),Oi(n,i,x);c=i.stateNode,v_.current=i;var k=w&&typeof a.getDerivedStateFromError!="function"?null:c.render();return i.flags|=1,n!==null&&w?(i.child=Es(i,n.child,null,x),i.child=Es(i,null,k,x)):En(n,i,k,x),i.memoizedState=c.state,p&&vh(i,a,!0),i.child}function hp(n){var i=n.stateNode;i.pendingContext?mh(n,i.pendingContext,i.pendingContext!==i.context):i.context&&mh(n,i.context,!1),cu(n,i.containerInfo)}function pp(n,i,a,c,p){return Ms(),nu(p),i.flags|=256,En(n,i,a,c),i.child}var bu={dehydrated:null,treeContext:null,retryLane:0};function Cu(n){return{baseLanes:n,cachePool:null,transitions:null}}function mp(n,i,a){var c=i.pendingProps,p=Vt.current,x=!1,w=(i.flags&128)!==0,k;if((k=w)||(k=n!==null&&n.memoizedState===null?!1:(p&2)!==0),k?(x=!0,i.flags&=-129):(n===null||n.memoizedState!==null)&&(p|=1),Dt(Vt,p&1),n===null)return tu(i),n=i.memoizedState,n!==null&&(n=n.dehydrated,n!==null)?(i.mode&1?n.data==="$!"?i.lanes=8:i.lanes=1073741824:i.lanes=1,null):(w=c.children,n=c.fallback,x?(c=i.mode,x=i.child,w={mode:"hidden",children:w},!(c&1)&&x!==null?(x.childLanes=0,x.pendingProps=w):x=pl(w,c,0,null),n=Xr(n,c,a,null),x.return=i,n.return=i,x.sibling=n,i.child=x,i.child.memoizedState=Cu(a),i.memoizedState=bu,n):Ru(i,w));if(p=n.memoizedState,p!==null&&(k=p.dehydrated,k!==null))return __(n,i,w,c,k,p,a);if(x){x=c.fallback,w=i.mode,p=n.child,k=p.sibling;var G={mode:"hidden",children:c.children};return!(w&1)&&i.child!==p?(c=i.child,c.childLanes=0,c.pendingProps=G,i.deletions=null):(c=pr(p,G),c.subtreeFlags=p.subtreeFlags&14680064),k!==null?x=pr(k,x):(x=Xr(x,w,a,null),x.flags|=2),x.return=i,c.return=i,c.sibling=x,i.child=c,c=x,x=i.child,w=n.child.memoizedState,w=w===null?Cu(a):{baseLanes:w.baseLanes|a,cachePool:null,transitions:w.transitions},x.memoizedState=w,x.childLanes=n.childLanes&~a,i.memoizedState=bu,c}return x=n.child,n=x.sibling,c=pr(x,{mode:"visible",children:c.children}),!(i.mode&1)&&(c.lanes=a),c.return=i,c.sibling=null,n!==null&&(a=i.deletions,a===null?(i.deletions=[n],i.flags|=16):a.push(n)),i.child=c,i.memoizedState=null,c}function Ru(n,i){return i=pl({mode:"visible",children:i},n.mode,0,null),i.return=n,n.child=i}function tl(n,i,a,c){return c!==null&&nu(c),Es(i,n.child,null,a),n=Ru(i,i.pendingProps.children),n.flags|=2,i.memoizedState=null,n}function __(n,i,a,c,p,x,w){if(a)return i.flags&256?(i.flags&=-257,c=Eu(Error(t(422))),tl(n,i,w,c)):i.memoizedState!==null?(i.child=n.child,i.flags|=128,null):(x=c.fallback,p=i.mode,c=pl({mode:"visible",children:c.children},p,0,null),x=Xr(x,p,w,null),x.flags|=2,c.return=i,x.return=i,c.sibling=x,i.child=c,i.mode&1&&Es(i,n.child,null,w),i.child.memoizedState=Cu(w),i.memoizedState=bu,x);if(!(i.mode&1))return tl(n,i,w,null);if(p.data==="$!"){if(c=p.nextSibling&&p.nextSibling.dataset,c)var k=c.dgst;return c=k,x=Error(t(419)),c=Eu(x,c,void 0),tl(n,i,w,c)}if(k=(w&n.childLanes)!==0,Un||k){if(c=an,c!==null){switch(w&-w){case 4:p=2;break;case 16:p=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:p=32;break;case 536870912:p=268435456;break;default:p=0}p=p&(c.suspendedLanes|w)?0:p,p!==0&&p!==x.retryLane&&(x.retryLane=p,Ui(n,p),di(c,n,p,-1))}return ju(),c=Eu(Error(t(421))),tl(n,i,w,c)}return p.data==="$?"?(i.flags|=128,i.child=n.child,i=L_.bind(null,n),p._reactRetry=i,null):(n=x.treeContext,Vn=ir(p.nextSibling),Hn=i,zt=!0,ai=null,n!==null&&(Kn[Zn++]=Ni,Kn[Zn++]=Di,Kn[Zn++]=Fr,Ni=n.id,Di=n.overflow,Fr=i),i=Ru(i,c.children),i.flags|=4096,i)}function gp(n,i,a){n.lanes|=i;var c=n.alternate;c!==null&&(c.lanes|=i),ou(n.return,i,a)}function Pu(n,i,a,c,p){var x=n.memoizedState;x===null?n.memoizedState={isBackwards:i,rendering:null,renderingStartTime:0,last:c,tail:a,tailMode:p}:(x.isBackwards=i,x.rendering=null,x.renderingStartTime=0,x.last=c,x.tail=a,x.tailMode=p)}function vp(n,i,a){var c=i.pendingProps,p=c.revealOrder,x=c.tail;if(En(n,i,c.children,a),c=Vt.current,c&2)c=c&1|2,i.flags|=128;else{if(n!==null&&n.flags&128)e:for(n=i.child;n!==null;){if(n.tag===13)n.memoizedState!==null&&gp(n,a,i);else if(n.tag===19)gp(n,a,i);else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===i)break e;for(;n.sibling===null;){if(n.return===null||n.return===i)break e;n=n.return}n.sibling.return=n.return,n=n.sibling}c&=1}if(Dt(Vt,c),!(i.mode&1))i.memoizedState=null;else switch(p){case"forwards":for(a=i.child,p=null;a!==null;)n=a.alternate,n!==null&&Ya(n)===null&&(p=a),a=a.sibling;a=p,a===null?(p=i.child,i.child=null):(p=a.sibling,a.sibling=null),Pu(i,!1,p,a,x);break;case"backwards":for(a=null,p=i.child,i.child=null;p!==null;){if(n=p.alternate,n!==null&&Ya(n)===null){i.child=p;break}n=p.sibling,p.sibling=a,a=p,p=n}Pu(i,!0,a,null,x);break;case"together":Pu(i,!1,null,null,void 0);break;default:i.memoizedState=null}return i.child}function nl(n,i){!(i.mode&1)&&n!==null&&(n.alternate=null,i.alternate=null,i.flags|=2)}function Oi(n,i,a){if(n!==null&&(i.dependencies=n.dependencies),Vr|=i.lanes,!(a&i.childLanes))return null;if(n!==null&&i.child!==n.child)throw Error(t(153));if(i.child!==null){for(n=i.child,a=pr(n,n.pendingProps),i.child=a,a.return=i;n.sibling!==null;)n=n.sibling,a=a.sibling=pr(n,n.pendingProps),a.return=i;a.sibling=null}return i.child}function x_(n,i,a){switch(i.tag){case 3:hp(i),Ms();break;case 5:Lh(i);break;case 1:Dn(i.type)&&ka(i);break;case 4:cu(i,i.stateNode.containerInfo);break;case 10:var c=i.type._context,p=i.memoizedProps.value;Dt(Wa,c._currentValue),c._currentValue=p;break;case 13:if(c=i.memoizedState,c!==null)return c.dehydrated!==null?(Dt(Vt,Vt.current&1),i.flags|=128,null):a&i.child.childLanes?mp(n,i,a):(Dt(Vt,Vt.current&1),n=Oi(n,i,a),n!==null?n.sibling:null);Dt(Vt,Vt.current&1);break;case 19:if(c=(a&i.childLanes)!==0,n.flags&128){if(c)return vp(n,i,a);i.flags|=128}if(p=i.memoizedState,p!==null&&(p.rendering=null,p.tail=null,p.lastEffect=null),Dt(Vt,Vt.current),c)break;return null;case 22:case 23:return i.lanes=0,up(n,i,a)}return Oi(n,i,a)}var _p,Lu,xp,yp;_p=function(n,i){for(var a=i.child;a!==null;){if(a.tag===5||a.tag===6)n.appendChild(a.stateNode);else if(a.tag!==4&&a.child!==null){a.child.return=a,a=a.child;continue}if(a===i)break;for(;a.sibling===null;){if(a.return===null||a.return===i)return;a=a.return}a.sibling.return=a.return,a=a.sibling}},Lu=function(){},xp=function(n,i,a,c){var p=n.memoizedProps;if(p!==c){n=i.stateNode,Br(yi.current);var x=null;switch(a){case"input":p=ke(n,p),c=ke(n,c),x=[];break;case"select":p=$({},p,{value:void 0}),c=$({},c,{value:void 0}),x=[];break;case"textarea":p=Me(n,p),c=Me(n,c),x=[];break;default:typeof p.onClick!="function"&&typeof c.onClick=="function"&&(n.onclick=Ia)}Xe(a,c);var w;a=null;for(ae in p)if(!c.hasOwnProperty(ae)&&p.hasOwnProperty(ae)&&p[ae]!=null)if(ae==="style"){var k=p[ae];for(w in k)k.hasOwnProperty(w)&&(a||(a={}),a[w]="")}else ae!=="dangerouslySetInnerHTML"&&ae!=="children"&&ae!=="suppressContentEditableWarning"&&ae!=="suppressHydrationWarning"&&ae!=="autoFocus"&&(o.hasOwnProperty(ae)?x||(x=[]):(x=x||[]).push(ae,null));for(ae in c){var G=c[ae];if(k=p!=null?p[ae]:void 0,c.hasOwnProperty(ae)&&G!==k&&(G!=null||k!=null))if(ae==="style")if(k){for(w in k)!k.hasOwnProperty(w)||G&&G.hasOwnProperty(w)||(a||(a={}),a[w]="");for(w in G)G.hasOwnProperty(w)&&k[w]!==G[w]&&(a||(a={}),a[w]=G[w])}else a||(x||(x=[]),x.push(ae,a)),a=G;else ae==="dangerouslySetInnerHTML"?(G=G?G.__html:void 0,k=k?k.__html:void 0,G!=null&&k!==G&&(x=x||[]).push(ae,G)):ae==="children"?typeof G!="string"&&typeof G!="number"||(x=x||[]).push(ae,""+G):ae!=="suppressContentEditableWarning"&&ae!=="suppressHydrationWarning"&&(o.hasOwnProperty(ae)?(G!=null&&ae==="onScroll"&&Ut("scroll",n),x||k===G||(x=[])):(x=x||[]).push(ae,G))}a&&(x=x||[]).push("style",a);var ae=x;(i.updateQueue=ae)&&(i.flags|=4)}},yp=function(n,i,a,c){a!==c&&(i.flags|=4)};function Wo(n,i){if(!zt)switch(n.tailMode){case"hidden":i=n.tail;for(var a=null;i!==null;)i.alternate!==null&&(a=i),i=i.sibling;a===null?n.tail=null:a.sibling=null;break;case"collapsed":a=n.tail;for(var c=null;a!==null;)a.alternate!==null&&(c=a),a=a.sibling;c===null?i||n.tail===null?n.tail=null:n.tail.sibling=null:c.sibling=null}}function gn(n){var i=n.alternate!==null&&n.alternate.child===n.child,a=0,c=0;if(i)for(var p=n.child;p!==null;)a|=p.lanes|p.childLanes,c|=p.subtreeFlags&14680064,c|=p.flags&14680064,p.return=n,p=p.sibling;else for(p=n.child;p!==null;)a|=p.lanes|p.childLanes,c|=p.subtreeFlags,c|=p.flags,p.return=n,p=p.sibling;return n.subtreeFlags|=c,n.childLanes=a,i}function y_(n,i,a){var c=i.pendingProps;switch(Qc(i),i.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return gn(i),null;case 1:return Dn(i.type)&&Fa(),gn(i),null;case 3:return c=i.stateNode,As(),It(Nn),It(pn),fu(),c.pendingContext&&(c.context=c.pendingContext,c.pendingContext=null),(n===null||n.child===null)&&(Va(i)?i.flags|=4:n===null||n.memoizedState.isDehydrated&&!(i.flags&256)||(i.flags|=1024,ai!==null&&(Vu(ai),ai=null))),Lu(n,i),gn(i),null;case 5:uu(i);var p=Br(zo.current);if(a=i.type,n!==null&&i.stateNode!=null)xp(n,i,a,c,p),n.ref!==i.ref&&(i.flags|=512,i.flags|=2097152);else{if(!c){if(i.stateNode===null)throw Error(t(166));return gn(i),null}if(n=Br(yi.current),Va(i)){c=i.stateNode,a=i.type;var x=i.memoizedProps;switch(c[xi]=i,c[Uo]=x,n=(i.mode&1)!==0,a){case"dialog":Ut("cancel",c),Ut("close",c);break;case"iframe":case"object":case"embed":Ut("load",c);break;case"video":case"audio":for(p=0;p<Lo.length;p++)Ut(Lo[p],c);break;case"source":Ut("error",c);break;case"img":case"image":case"link":Ut("error",c),Ut("load",c);break;case"details":Ut("toggle",c);break;case"input":Je(c,x),Ut("invalid",c);break;case"select":c._wrapperState={wasMultiple:!!x.multiple},Ut("invalid",c);break;case"textarea":ye(c,x),Ut("invalid",c)}Xe(a,x),p=null;for(var w in x)if(x.hasOwnProperty(w)){var k=x[w];w==="children"?typeof k=="string"?c.textContent!==k&&(x.suppressHydrationWarning!==!0&&Ua(c.textContent,k,n),p=["children",k]):typeof k=="number"&&c.textContent!==""+k&&(x.suppressHydrationWarning!==!0&&Ua(c.textContent,k,n),p=["children",""+k]):o.hasOwnProperty(w)&&k!=null&&w==="onScroll"&&Ut("scroll",c)}switch(a){case"input":ze(c),ot(c,x,!0);break;case"textarea":ze(c),Ke(c);break;case"select":case"option":break;default:typeof x.onClick=="function"&&(c.onclick=Ia)}c=p,i.updateQueue=c,c!==null&&(i.flags|=4)}else{w=p.nodeType===9?p:p.ownerDocument,n==="http://www.w3.org/1999/xhtml"&&(n=Ie(a)),n==="http://www.w3.org/1999/xhtml"?a==="script"?(n=w.createElement("div"),n.innerHTML="<script><\/script>",n=n.removeChild(n.firstChild)):typeof c.is=="string"?n=w.createElement(a,{is:c.is}):(n=w.createElement(a),a==="select"&&(w=n,c.multiple?w.multiple=!0:c.size&&(w.size=c.size))):n=w.createElementNS(n,a),n[xi]=i,n[Uo]=c,_p(n,i,!1,!1),i.stateNode=n;e:{switch(w=dt(a,c),a){case"dialog":Ut("cancel",n),Ut("close",n),p=c;break;case"iframe":case"object":case"embed":Ut("load",n),p=c;break;case"video":case"audio":for(p=0;p<Lo.length;p++)Ut(Lo[p],n);p=c;break;case"source":Ut("error",n),p=c;break;case"img":case"image":case"link":Ut("error",n),Ut("load",n),p=c;break;case"details":Ut("toggle",n),p=c;break;case"input":Je(n,c),p=ke(n,c),Ut("invalid",n);break;case"option":p=c;break;case"select":n._wrapperState={wasMultiple:!!c.multiple},p=$({},c,{value:void 0}),Ut("invalid",n);break;case"textarea":ye(n,c),p=Me(n,c),Ut("invalid",n);break;default:p=c}Xe(a,p),k=p;for(x in k)if(k.hasOwnProperty(x)){var G=k[x];x==="style"?Ue(n,G):x==="dangerouslySetInnerHTML"?(G=G?G.__html:void 0,G!=null&&it(n,G)):x==="children"?typeof G=="string"?(a!=="textarea"||G!=="")&&_e(n,G):typeof G=="number"&&_e(n,""+G):x!=="suppressContentEditableWarning"&&x!=="suppressHydrationWarning"&&x!=="autoFocus"&&(o.hasOwnProperty(x)?G!=null&&x==="onScroll"&&Ut("scroll",n):G!=null&&A(n,x,G,w))}switch(a){case"input":ze(n),ot(n,c,!1);break;case"textarea":ze(n),Ke(n);break;case"option":c.value!=null&&n.setAttribute("value",""+Fe(c.value));break;case"select":n.multiple=!!c.multiple,x=c.value,x!=null?re(n,!!c.multiple,x,!1):c.defaultValue!=null&&re(n,!!c.multiple,c.defaultValue,!0);break;default:typeof p.onClick=="function"&&(n.onclick=Ia)}switch(a){case"button":case"input":case"select":case"textarea":c=!!c.autoFocus;break e;case"img":c=!0;break e;default:c=!1}}c&&(i.flags|=4)}i.ref!==null&&(i.flags|=512,i.flags|=2097152)}return gn(i),null;case 6:if(n&&i.stateNode!=null)yp(n,i,n.memoizedProps,c);else{if(typeof c!="string"&&i.stateNode===null)throw Error(t(166));if(a=Br(zo.current),Br(yi.current),Va(i)){if(c=i.stateNode,a=i.memoizedProps,c[xi]=i,(x=c.nodeValue!==a)&&(n=Hn,n!==null))switch(n.tag){case 3:Ua(c.nodeValue,a,(n.mode&1)!==0);break;case 5:n.memoizedProps.suppressHydrationWarning!==!0&&Ua(c.nodeValue,a,(n.mode&1)!==0)}x&&(i.flags|=4)}else c=(a.nodeType===9?a:a.ownerDocument).createTextNode(c),c[xi]=i,i.stateNode=c}return gn(i),null;case 13:if(It(Vt),c=i.memoizedState,n===null||n.memoizedState!==null&&n.memoizedState.dehydrated!==null){if(zt&&Vn!==null&&i.mode&1&&!(i.flags&128))Eh(),Ms(),i.flags|=98560,x=!1;else if(x=Va(i),c!==null&&c.dehydrated!==null){if(n===null){if(!x)throw Error(t(318));if(x=i.memoizedState,x=x!==null?x.dehydrated:null,!x)throw Error(t(317));x[xi]=i}else Ms(),!(i.flags&128)&&(i.memoizedState=null),i.flags|=4;gn(i),x=!1}else ai!==null&&(Vu(ai),ai=null),x=!0;if(!x)return i.flags&65536?i:null}return i.flags&128?(i.lanes=a,i):(c=c!==null,c!==(n!==null&&n.memoizedState!==null)&&c&&(i.child.flags|=8192,i.mode&1&&(n===null||Vt.current&1?en===0&&(en=3):ju())),i.updateQueue!==null&&(i.flags|=4),gn(i),null);case 4:return As(),Lu(n,i),n===null&&No(i.stateNode.containerInfo),gn(i),null;case 10:return su(i.type._context),gn(i),null;case 17:return Dn(i.type)&&Fa(),gn(i),null;case 19:if(It(Vt),x=i.memoizedState,x===null)return gn(i),null;if(c=(i.flags&128)!==0,w=x.rendering,w===null)if(c)Wo(x,!1);else{if(en!==0||n!==null&&n.flags&128)for(n=i.child;n!==null;){if(w=Ya(n),w!==null){for(i.flags|=128,Wo(x,!1),c=w.updateQueue,c!==null&&(i.updateQueue=c,i.flags|=4),i.subtreeFlags=0,c=a,a=i.child;a!==null;)x=a,n=c,x.flags&=14680066,w=x.alternate,w===null?(x.childLanes=0,x.lanes=n,x.child=null,x.subtreeFlags=0,x.memoizedProps=null,x.memoizedState=null,x.updateQueue=null,x.dependencies=null,x.stateNode=null):(x.childLanes=w.childLanes,x.lanes=w.lanes,x.child=w.child,x.subtreeFlags=0,x.deletions=null,x.memoizedProps=w.memoizedProps,x.memoizedState=w.memoizedState,x.updateQueue=w.updateQueue,x.type=w.type,n=w.dependencies,x.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),a=a.sibling;return Dt(Vt,Vt.current&1|2),i.child}n=n.sibling}x.tail!==null&&je()>Ps&&(i.flags|=128,c=!0,Wo(x,!1),i.lanes=4194304)}else{if(!c)if(n=Ya(w),n!==null){if(i.flags|=128,c=!0,a=n.updateQueue,a!==null&&(i.updateQueue=a,i.flags|=4),Wo(x,!0),x.tail===null&&x.tailMode==="hidden"&&!w.alternate&&!zt)return gn(i),null}else 2*je()-x.renderingStartTime>Ps&&a!==1073741824&&(i.flags|=128,c=!0,Wo(x,!1),i.lanes=4194304);x.isBackwards?(w.sibling=i.child,i.child=w):(a=x.last,a!==null?a.sibling=w:i.child=w,x.last=w)}return x.tail!==null?(i=x.tail,x.rendering=i,x.tail=i.sibling,x.renderingStartTime=je(),i.sibling=null,a=Vt.current,Dt(Vt,c?a&1|2:a&1),i):(gn(i),null);case 22:case 23:return Wu(),c=i.memoizedState!==null,n!==null&&n.memoizedState!==null!==c&&(i.flags|=8192),c&&i.mode&1?Gn&1073741824&&(gn(i),i.subtreeFlags&6&&(i.flags|=8192)):gn(i),null;case 24:return null;case 25:return null}throw Error(t(156,i.tag))}function S_(n,i){switch(Qc(i),i.tag){case 1:return Dn(i.type)&&Fa(),n=i.flags,n&65536?(i.flags=n&-65537|128,i):null;case 3:return As(),It(Nn),It(pn),fu(),n=i.flags,n&65536&&!(n&128)?(i.flags=n&-65537|128,i):null;case 5:return uu(i),null;case 13:if(It(Vt),n=i.memoizedState,n!==null&&n.dehydrated!==null){if(i.alternate===null)throw Error(t(340));Ms()}return n=i.flags,n&65536?(i.flags=n&-65537|128,i):null;case 19:return It(Vt),null;case 4:return As(),null;case 10:return su(i.type._context),null;case 22:case 23:return Wu(),null;case 24:return null;default:return null}}var il=!1,vn=!1,M_=typeof WeakSet=="function"?WeakSet:Set,$e=null;function Cs(n,i){var a=n.ref;if(a!==null)if(typeof a=="function")try{a(null)}catch(c){jt(n,i,c)}else a.current=null}function Nu(n,i,a){try{a()}catch(c){jt(n,i,c)}}var Sp=!1;function E_(n,i){if(Wc=Ea,n=Qf(),Oc(n)){if("selectionStart"in n)var a={start:n.selectionStart,end:n.selectionEnd};else e:{a=(a=n.ownerDocument)&&a.defaultView||window;var c=a.getSelection&&a.getSelection();if(c&&c.rangeCount!==0){a=c.anchorNode;var p=c.anchorOffset,x=c.focusNode;c=c.focusOffset;try{a.nodeType,x.nodeType}catch{a=null;break e}var w=0,k=-1,G=-1,ae=0,Ee=0,Ce=n,Se=null;t:for(;;){for(var We;Ce!==a||p!==0&&Ce.nodeType!==3||(k=w+p),Ce!==x||c!==0&&Ce.nodeType!==3||(G=w+c),Ce.nodeType===3&&(w+=Ce.nodeValue.length),(We=Ce.firstChild)!==null;)Se=Ce,Ce=We;for(;;){if(Ce===n)break t;if(Se===a&&++ae===p&&(k=w),Se===x&&++Ee===c&&(G=w),(We=Ce.nextSibling)!==null)break;Ce=Se,Se=Ce.parentNode}Ce=We}a=k===-1||G===-1?null:{start:k,end:G}}else a=null}a=a||{start:0,end:0}}else a=null;for(jc={focusedElem:n,selectionRange:a},Ea=!1,$e=i;$e!==null;)if(i=$e,n=i.child,(i.subtreeFlags&1028)!==0&&n!==null)n.return=i,$e=n;else for(;$e!==null;){i=$e;try{var qe=i.alternate;if(i.flags&1024)switch(i.tag){case 0:case 11:case 15:break;case 1:if(qe!==null){var Ze=qe.memoizedProps,Yt=qe.memoizedState,Z=i.stateNode,j=Z.getSnapshotBeforeUpdate(i.elementType===i.type?Ze:li(i.type,Ze),Yt);Z.__reactInternalSnapshotBeforeUpdate=j}break;case 3:var ne=i.stateNode.containerInfo;ne.nodeType===1?ne.textContent="":ne.nodeType===9&&ne.documentElement&&ne.removeChild(ne.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(t(163))}}catch(De){jt(i,i.return,De)}if(n=i.sibling,n!==null){n.return=i.return,$e=n;break}$e=i.return}return qe=Sp,Sp=!1,qe}function jo(n,i,a){var c=i.updateQueue;if(c=c!==null?c.lastEffect:null,c!==null){var p=c=c.next;do{if((p.tag&n)===n){var x=p.destroy;p.destroy=void 0,x!==void 0&&Nu(i,a,x)}p=p.next}while(p!==c)}}function rl(n,i){if(i=i.updateQueue,i=i!==null?i.lastEffect:null,i!==null){var a=i=i.next;do{if((a.tag&n)===n){var c=a.create;a.destroy=c()}a=a.next}while(a!==i)}}function Du(n){var i=n.ref;if(i!==null){var a=n.stateNode;switch(n.tag){case 5:n=a;break;default:n=a}typeof i=="function"?i(n):i.current=n}}function Mp(n){var i=n.alternate;i!==null&&(n.alternate=null,Mp(i)),n.child=null,n.deletions=null,n.sibling=null,n.tag===5&&(i=n.stateNode,i!==null&&(delete i[xi],delete i[Uo],delete i[qc],delete i[s_],delete i[o_])),n.stateNode=null,n.return=null,n.dependencies=null,n.memoizedProps=null,n.memoizedState=null,n.pendingProps=null,n.stateNode=null,n.updateQueue=null}function Ep(n){return n.tag===5||n.tag===3||n.tag===4}function wp(n){e:for(;;){for(;n.sibling===null;){if(n.return===null||Ep(n.return))return null;n=n.return}for(n.sibling.return=n.return,n=n.sibling;n.tag!==5&&n.tag!==6&&n.tag!==18;){if(n.flags&2||n.child===null||n.tag===4)continue e;n.child.return=n,n=n.child}if(!(n.flags&2))return n.stateNode}}function Uu(n,i,a){var c=n.tag;if(c===5||c===6)n=n.stateNode,i?a.nodeType===8?a.parentNode.insertBefore(n,i):a.insertBefore(n,i):(a.nodeType===8?(i=a.parentNode,i.insertBefore(n,a)):(i=a,i.appendChild(n)),a=a._reactRootContainer,a!=null||i.onclick!==null||(i.onclick=Ia));else if(c!==4&&(n=n.child,n!==null))for(Uu(n,i,a),n=n.sibling;n!==null;)Uu(n,i,a),n=n.sibling}function Iu(n,i,a){var c=n.tag;if(c===5||c===6)n=n.stateNode,i?a.insertBefore(n,i):a.appendChild(n);else if(c!==4&&(n=n.child,n!==null))for(Iu(n,i,a),n=n.sibling;n!==null;)Iu(n,i,a),n=n.sibling}var dn=null,ci=!1;function cr(n,i,a){for(a=a.child;a!==null;)Tp(n,i,a),a=a.sibling}function Tp(n,i,a){if(wt&&typeof wt.onCommitFiberUnmount=="function")try{wt.onCommitFiberUnmount(Pn,a)}catch{}switch(a.tag){case 5:vn||Cs(a,i);case 6:var c=dn,p=ci;dn=null,cr(n,i,a),dn=c,ci=p,dn!==null&&(ci?(n=dn,a=a.stateNode,n.nodeType===8?n.parentNode.removeChild(a):n.removeChild(a)):dn.removeChild(a.stateNode));break;case 18:dn!==null&&(ci?(n=dn,a=a.stateNode,n.nodeType===8?Yc(n.parentNode,a):n.nodeType===1&&Yc(n,a),Eo(n)):Yc(dn,a.stateNode));break;case 4:c=dn,p=ci,dn=a.stateNode.containerInfo,ci=!0,cr(n,i,a),dn=c,ci=p;break;case 0:case 11:case 14:case 15:if(!vn&&(c=a.updateQueue,c!==null&&(c=c.lastEffect,c!==null))){p=c=c.next;do{var x=p,w=x.destroy;x=x.tag,w!==void 0&&(x&2||x&4)&&Nu(a,i,w),p=p.next}while(p!==c)}cr(n,i,a);break;case 1:if(!vn&&(Cs(a,i),c=a.stateNode,typeof c.componentWillUnmount=="function"))try{c.props=a.memoizedProps,c.state=a.memoizedState,c.componentWillUnmount()}catch(k){jt(a,i,k)}cr(n,i,a);break;case 21:cr(n,i,a);break;case 22:a.mode&1?(vn=(c=vn)||a.memoizedState!==null,cr(n,i,a),vn=c):cr(n,i,a);break;default:cr(n,i,a)}}function Ap(n){var i=n.updateQueue;if(i!==null){n.updateQueue=null;var a=n.stateNode;a===null&&(a=n.stateNode=new M_),i.forEach(function(c){var p=N_.bind(null,n,c);a.has(c)||(a.add(c),c.then(p,p))})}}function ui(n,i){var a=i.deletions;if(a!==null)for(var c=0;c<a.length;c++){var p=a[c];try{var x=n,w=i,k=w;e:for(;k!==null;){switch(k.tag){case 5:dn=k.stateNode,ci=!1;break e;case 3:dn=k.stateNode.containerInfo,ci=!0;break e;case 4:dn=k.stateNode.containerInfo,ci=!0;break e}k=k.return}if(dn===null)throw Error(t(160));Tp(x,w,p),dn=null,ci=!1;var G=p.alternate;G!==null&&(G.return=null),p.return=null}catch(ae){jt(p,i,ae)}}if(i.subtreeFlags&12854)for(i=i.child;i!==null;)bp(i,n),i=i.sibling}function bp(n,i){var a=n.alternate,c=n.flags;switch(n.tag){case 0:case 11:case 14:case 15:if(ui(i,n),Mi(n),c&4){try{jo(3,n,n.return),rl(3,n)}catch(Ze){jt(n,n.return,Ze)}try{jo(5,n,n.return)}catch(Ze){jt(n,n.return,Ze)}}break;case 1:ui(i,n),Mi(n),c&512&&a!==null&&Cs(a,a.return);break;case 5:if(ui(i,n),Mi(n),c&512&&a!==null&&Cs(a,a.return),n.flags&32){var p=n.stateNode;try{_e(p,"")}catch(Ze){jt(n,n.return,Ze)}}if(c&4&&(p=n.stateNode,p!=null)){var x=n.memoizedProps,w=a!==null?a.memoizedProps:x,k=n.type,G=n.updateQueue;if(n.updateQueue=null,G!==null)try{k==="input"&&x.type==="radio"&&x.name!=null&&Ve(p,x),dt(k,w);var ae=dt(k,x);for(w=0;w<G.length;w+=2){var Ee=G[w],Ce=G[w+1];Ee==="style"?Ue(p,Ce):Ee==="dangerouslySetInnerHTML"?it(p,Ce):Ee==="children"?_e(p,Ce):A(p,Ee,Ce,ae)}switch(k){case"input":Mt(p,x);break;case"textarea":we(p,x);break;case"select":var Se=p._wrapperState.wasMultiple;p._wrapperState.wasMultiple=!!x.multiple;var We=x.value;We!=null?re(p,!!x.multiple,We,!1):Se!==!!x.multiple&&(x.defaultValue!=null?re(p,!!x.multiple,x.defaultValue,!0):re(p,!!x.multiple,x.multiple?[]:"",!1))}p[Uo]=x}catch(Ze){jt(n,n.return,Ze)}}break;case 6:if(ui(i,n),Mi(n),c&4){if(n.stateNode===null)throw Error(t(162));p=n.stateNode,x=n.memoizedProps;try{p.nodeValue=x}catch(Ze){jt(n,n.return,Ze)}}break;case 3:if(ui(i,n),Mi(n),c&4&&a!==null&&a.memoizedState.isDehydrated)try{Eo(i.containerInfo)}catch(Ze){jt(n,n.return,Ze)}break;case 4:ui(i,n),Mi(n);break;case 13:ui(i,n),Mi(n),p=n.child,p.flags&8192&&(x=p.memoizedState!==null,p.stateNode.isHidden=x,!x||p.alternate!==null&&p.alternate.memoizedState!==null||(ku=je())),c&4&&Ap(n);break;case 22:if(Ee=a!==null&&a.memoizedState!==null,n.mode&1?(vn=(ae=vn)||Ee,ui(i,n),vn=ae):ui(i,n),Mi(n),c&8192){if(ae=n.memoizedState!==null,(n.stateNode.isHidden=ae)&&!Ee&&n.mode&1)for($e=n,Ee=n.child;Ee!==null;){for(Ce=$e=Ee;$e!==null;){switch(Se=$e,We=Se.child,Se.tag){case 0:case 11:case 14:case 15:jo(4,Se,Se.return);break;case 1:Cs(Se,Se.return);var qe=Se.stateNode;if(typeof qe.componentWillUnmount=="function"){c=Se,a=Se.return;try{i=c,qe.props=i.memoizedProps,qe.state=i.memoizedState,qe.componentWillUnmount()}catch(Ze){jt(c,a,Ze)}}break;case 5:Cs(Se,Se.return);break;case 22:if(Se.memoizedState!==null){Pp(Ce);continue}}We!==null?(We.return=Se,$e=We):Pp(Ce)}Ee=Ee.sibling}e:for(Ee=null,Ce=n;;){if(Ce.tag===5){if(Ee===null){Ee=Ce;try{p=Ce.stateNode,ae?(x=p.style,typeof x.setProperty=="function"?x.setProperty("display","none","important"):x.display="none"):(k=Ce.stateNode,G=Ce.memoizedProps.style,w=G!=null&&G.hasOwnProperty("display")?G.display:null,k.style.display=xe("display",w))}catch(Ze){jt(n,n.return,Ze)}}}else if(Ce.tag===6){if(Ee===null)try{Ce.stateNode.nodeValue=ae?"":Ce.memoizedProps}catch(Ze){jt(n,n.return,Ze)}}else if((Ce.tag!==22&&Ce.tag!==23||Ce.memoizedState===null||Ce===n)&&Ce.child!==null){Ce.child.return=Ce,Ce=Ce.child;continue}if(Ce===n)break e;for(;Ce.sibling===null;){if(Ce.return===null||Ce.return===n)break e;Ee===Ce&&(Ee=null),Ce=Ce.return}Ee===Ce&&(Ee=null),Ce.sibling.return=Ce.return,Ce=Ce.sibling}}break;case 19:ui(i,n),Mi(n),c&4&&Ap(n);break;case 21:break;default:ui(i,n),Mi(n)}}function Mi(n){var i=n.flags;if(i&2){try{e:{for(var a=n.return;a!==null;){if(Ep(a)){var c=a;break e}a=a.return}throw Error(t(160))}switch(c.tag){case 5:var p=c.stateNode;c.flags&32&&(_e(p,""),c.flags&=-33);var x=wp(n);Iu(n,x,p);break;case 3:case 4:var w=c.stateNode.containerInfo,k=wp(n);Uu(n,k,w);break;default:throw Error(t(161))}}catch(G){jt(n,n.return,G)}n.flags&=-3}i&4096&&(n.flags&=-4097)}function w_(n,i,a){$e=n,Cp(n)}function Cp(n,i,a){for(var c=(n.mode&1)!==0;$e!==null;){var p=$e,x=p.child;if(p.tag===22&&c){var w=p.memoizedState!==null||il;if(!w){var k=p.alternate,G=k!==null&&k.memoizedState!==null||vn;k=il;var ae=vn;if(il=w,(vn=G)&&!ae)for($e=p;$e!==null;)w=$e,G=w.child,w.tag===22&&w.memoizedState!==null?Lp(p):G!==null?(G.return=w,$e=G):Lp(p);for(;x!==null;)$e=x,Cp(x),x=x.sibling;$e=p,il=k,vn=ae}Rp(n)}else p.subtreeFlags&8772&&x!==null?(x.return=p,$e=x):Rp(n)}}function Rp(n){for(;$e!==null;){var i=$e;if(i.flags&8772){var a=i.alternate;try{if(i.flags&8772)switch(i.tag){case 0:case 11:case 15:vn||rl(5,i);break;case 1:var c=i.stateNode;if(i.flags&4&&!vn)if(a===null)c.componentDidMount();else{var p=i.elementType===i.type?a.memoizedProps:li(i.type,a.memoizedProps);c.componentDidUpdate(p,a.memoizedState,c.__reactInternalSnapshotBeforeUpdate)}var x=i.updateQueue;x!==null&&Ph(i,x,c);break;case 3:var w=i.updateQueue;if(w!==null){if(a=null,i.child!==null)switch(i.child.tag){case 5:a=i.child.stateNode;break;case 1:a=i.child.stateNode}Ph(i,w,a)}break;case 5:var k=i.stateNode;if(a===null&&i.flags&4){a=k;var G=i.memoizedProps;switch(i.type){case"button":case"input":case"select":case"textarea":G.autoFocus&&a.focus();break;case"img":G.src&&(a.src=G.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(i.memoizedState===null){var ae=i.alternate;if(ae!==null){var Ee=ae.memoizedState;if(Ee!==null){var Ce=Ee.dehydrated;Ce!==null&&Eo(Ce)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(t(163))}vn||i.flags&512&&Du(i)}catch(Se){jt(i,i.return,Se)}}if(i===n){$e=null;break}if(a=i.sibling,a!==null){a.return=i.return,$e=a;break}$e=i.return}}function Pp(n){for(;$e!==null;){var i=$e;if(i===n){$e=null;break}var a=i.sibling;if(a!==null){a.return=i.return,$e=a;break}$e=i.return}}function Lp(n){for(;$e!==null;){var i=$e;try{switch(i.tag){case 0:case 11:case 15:var a=i.return;try{rl(4,i)}catch(G){jt(i,a,G)}break;case 1:var c=i.stateNode;if(typeof c.componentDidMount=="function"){var p=i.return;try{c.componentDidMount()}catch(G){jt(i,p,G)}}var x=i.return;try{Du(i)}catch(G){jt(i,x,G)}break;case 5:var w=i.return;try{Du(i)}catch(G){jt(i,w,G)}}}catch(G){jt(i,i.return,G)}if(i===n){$e=null;break}var k=i.sibling;if(k!==null){k.return=i.return,$e=k;break}$e=i.return}}var T_=Math.ceil,sl=P.ReactCurrentDispatcher,Ou=P.ReactCurrentOwner,ei=P.ReactCurrentBatchConfig,Tt=0,an=null,qt=null,fn=0,Gn=0,Rs=rr(0),en=0,Xo=null,Vr=0,ol=0,Fu=0,$o=null,In=null,ku=0,Ps=1/0,Fi=null,al=!1,zu=null,ur=null,ll=!1,dr=null,cl=0,Yo=0,Bu=null,ul=-1,dl=0;function wn(){return Tt&6?je():ul!==-1?ul:ul=je()}function fr(n){return n.mode&1?Tt&2&&fn!==0?fn&-fn:l_.transition!==null?(dl===0&&(dl=ya()),dl):(n=Pt,n!==0||(n=window.event,n=n===void 0?16:Df(n.type)),n):1}function di(n,i,a,c){if(50<Yo)throw Yo=0,Bu=null,Error(t(185));_o(n,a,c),(!(Tt&2)||n!==an)&&(n===an&&(!(Tt&2)&&(ol|=a),en===4&&hr(n,fn)),On(n,c),a===1&&Tt===0&&!(i.mode&1)&&(Ps=je()+500,za&&or()))}function On(n,i){var a=n.callbackNode;Ln(n,i);var c=qn(n,n===an?fn:0);if(c===0)a!==null&&Ge(a),n.callbackNode=null,n.callbackPriority=0;else if(i=c&-c,n.callbackPriority!==i){if(a!=null&&Ge(a),i===1)n.tag===0?a_(Dp.bind(null,n)):_h(Dp.bind(null,n)),i_(function(){!(Tt&6)&&or()}),a=null;else{switch(Tf(c)){case 1:a=ft;break;case 4:a=ht;break;case 16:a=Nt;break;case 536870912:a=$t;break;default:a=Nt}a=Hp(a,Np.bind(null,n))}n.callbackPriority=i,n.callbackNode=a}}function Np(n,i){if(ul=-1,dl=0,Tt&6)throw Error(t(327));var a=n.callbackNode;if(Ls()&&n.callbackNode!==a)return null;var c=qn(n,n===an?fn:0);if(c===0)return null;if(c&30||c&n.expiredLanes||i)i=fl(n,c);else{i=c;var p=Tt;Tt|=2;var x=Ip();(an!==n||fn!==i)&&(Fi=null,Ps=je()+500,Wr(n,i));do try{C_();break}catch(k){Up(n,k)}while(!0);ru(),sl.current=x,Tt=p,qt!==null?i=0:(an=null,fn=0,i=en)}if(i!==0){if(i===2&&(p=Ur(n),p!==0&&(c=p,i=Hu(n,p))),i===1)throw a=Xo,Wr(n,0),hr(n,c),On(n,je()),a;if(i===6)hr(n,c);else{if(p=n.current.alternate,!(c&30)&&!A_(p)&&(i=fl(n,c),i===2&&(x=Ur(n),x!==0&&(c=x,i=Hu(n,x))),i===1))throw a=Xo,Wr(n,0),hr(n,c),On(n,je()),a;switch(n.finishedWork=p,n.finishedLanes=c,i){case 0:case 1:throw Error(t(345));case 2:jr(n,In,Fi);break;case 3:if(hr(n,c),(c&130023424)===c&&(i=ku+500-je(),10<i)){if(qn(n,0)!==0)break;if(p=n.suspendedLanes,(p&c)!==c){wn(),n.pingedLanes|=n.suspendedLanes&p;break}n.timeoutHandle=$c(jr.bind(null,n,In,Fi),i);break}jr(n,In,Fi);break;case 4:if(hr(n,c),(c&4194240)===c)break;for(i=n.eventTimes,p=-1;0<c;){var w=31-Mn(c);x=1<<w,w=i[w],w>p&&(p=w),c&=~x}if(c=p,c=je()-c,c=(120>c?120:480>c?480:1080>c?1080:1920>c?1920:3e3>c?3e3:4320>c?4320:1960*T_(c/1960))-c,10<c){n.timeoutHandle=$c(jr.bind(null,n,In,Fi),c);break}jr(n,In,Fi);break;case 5:jr(n,In,Fi);break;default:throw Error(t(329))}}}return On(n,je()),n.callbackNode===a?Np.bind(null,n):null}function Hu(n,i){var a=$o;return n.current.memoizedState.isDehydrated&&(Wr(n,i).flags|=256),n=fl(n,i),n!==2&&(i=In,In=a,i!==null&&Vu(i)),n}function Vu(n){In===null?In=n:In.push.apply(In,n)}function A_(n){for(var i=n;;){if(i.flags&16384){var a=i.updateQueue;if(a!==null&&(a=a.stores,a!==null))for(var c=0;c<a.length;c++){var p=a[c],x=p.getSnapshot;p=p.value;try{if(!oi(x(),p))return!1}catch{return!1}}}if(a=i.child,i.subtreeFlags&16384&&a!==null)a.return=i,i=a;else{if(i===n)break;for(;i.sibling===null;){if(i.return===null||i.return===n)return!0;i=i.return}i.sibling.return=i.return,i=i.sibling}}return!0}function hr(n,i){for(i&=~Fu,i&=~ol,n.suspendedLanes|=i,n.pingedLanes&=~i,n=n.expirationTimes;0<i;){var a=31-Mn(i),c=1<<a;n[a]=-1,i&=~c}}function Dp(n){if(Tt&6)throw Error(t(327));Ls();var i=qn(n,0);if(!(i&1))return On(n,je()),null;var a=fl(n,i);if(n.tag!==0&&a===2){var c=Ur(n);c!==0&&(i=c,a=Hu(n,c))}if(a===1)throw a=Xo,Wr(n,0),hr(n,i),On(n,je()),a;if(a===6)throw Error(t(345));return n.finishedWork=n.current.alternate,n.finishedLanes=i,jr(n,In,Fi),On(n,je()),null}function Gu(n,i){var a=Tt;Tt|=1;try{return n(i)}finally{Tt=a,Tt===0&&(Ps=je()+500,za&&or())}}function Gr(n){dr!==null&&dr.tag===0&&!(Tt&6)&&Ls();var i=Tt;Tt|=1;var a=ei.transition,c=Pt;try{if(ei.transition=null,Pt=1,n)return n()}finally{Pt=c,ei.transition=a,Tt=i,!(Tt&6)&&or()}}function Wu(){Gn=Rs.current,It(Rs)}function Wr(n,i){n.finishedWork=null,n.finishedLanes=0;var a=n.timeoutHandle;if(a!==-1&&(n.timeoutHandle=-1,n_(a)),qt!==null)for(a=qt.return;a!==null;){var c=a;switch(Qc(c),c.tag){case 1:c=c.type.childContextTypes,c!=null&&Fa();break;case 3:As(),It(Nn),It(pn),fu();break;case 5:uu(c);break;case 4:As();break;case 13:It(Vt);break;case 19:It(Vt);break;case 10:su(c.type._context);break;case 22:case 23:Wu()}a=a.return}if(an=n,qt=n=pr(n.current,null),fn=Gn=i,en=0,Xo=null,Fu=ol=Vr=0,In=$o=null,zr!==null){for(i=0;i<zr.length;i++)if(a=zr[i],c=a.interleaved,c!==null){a.interleaved=null;var p=c.next,x=a.pending;if(x!==null){var w=x.next;x.next=p,c.next=w}a.pending=c}zr=null}return n}function Up(n,i){do{var a=qt;try{if(ru(),qa.current=Qa,Ka){for(var c=Gt.memoizedState;c!==null;){var p=c.queue;p!==null&&(p.pending=null),c=c.next}Ka=!1}if(Hr=0,on=Qt=Gt=null,Bo=!1,Ho=0,Ou.current=null,a===null||a.return===null){en=1,Xo=i,qt=null;break}e:{var x=n,w=a.return,k=a,G=i;if(i=fn,k.flags|=32768,G!==null&&typeof G=="object"&&typeof G.then=="function"){var ae=G,Ee=k,Ce=Ee.tag;if(!(Ee.mode&1)&&(Ce===0||Ce===11||Ce===15)){var Se=Ee.alternate;Se?(Ee.updateQueue=Se.updateQueue,Ee.memoizedState=Se.memoizedState,Ee.lanes=Se.lanes):(Ee.updateQueue=null,Ee.memoizedState=null)}var We=sp(w);if(We!==null){We.flags&=-257,op(We,w,k,x,i),We.mode&1&&rp(x,ae,i),i=We,G=ae;var qe=i.updateQueue;if(qe===null){var Ze=new Set;Ze.add(G),i.updateQueue=Ze}else qe.add(G);break e}else{if(!(i&1)){rp(x,ae,i),ju();break e}G=Error(t(426))}}else if(zt&&k.mode&1){var Yt=sp(w);if(Yt!==null){!(Yt.flags&65536)&&(Yt.flags|=256),op(Yt,w,k,x,i),nu(bs(G,k));break e}}x=G=bs(G,k),en!==4&&(en=2),$o===null?$o=[x]:$o.push(x),x=w;do{switch(x.tag){case 3:x.flags|=65536,i&=-i,x.lanes|=i;var Z=np(x,G,i);Rh(x,Z);break e;case 1:k=G;var j=x.type,ne=x.stateNode;if(!(x.flags&128)&&(typeof j.getDerivedStateFromError=="function"||ne!==null&&typeof ne.componentDidCatch=="function"&&(ur===null||!ur.has(ne)))){x.flags|=65536,i&=-i,x.lanes|=i;var De=ip(x,k,i);Rh(x,De);break e}}x=x.return}while(x!==null)}Fp(a)}catch(Qe){i=Qe,qt===a&&a!==null&&(qt=a=a.return);continue}break}while(!0)}function Ip(){var n=sl.current;return sl.current=Qa,n===null?Qa:n}function ju(){(en===0||en===3||en===2)&&(en=4),an===null||!(Vr&268435455)&&!(ol&268435455)||hr(an,fn)}function fl(n,i){var a=Tt;Tt|=2;var c=Ip();(an!==n||fn!==i)&&(Fi=null,Wr(n,i));do try{b_();break}catch(p){Up(n,p)}while(!0);if(ru(),Tt=a,sl.current=c,qt!==null)throw Error(t(261));return an=null,fn=0,en}function b_(){for(;qt!==null;)Op(qt)}function C_(){for(;qt!==null&&!nt();)Op(qt)}function Op(n){var i=Bp(n.alternate,n,Gn);n.memoizedProps=n.pendingProps,i===null?Fp(n):qt=i,Ou.current=null}function Fp(n){var i=n;do{var a=i.alternate;if(n=i.return,i.flags&32768){if(a=S_(a,i),a!==null){a.flags&=32767,qt=a;return}if(n!==null)n.flags|=32768,n.subtreeFlags=0,n.deletions=null;else{en=6,qt=null;return}}else if(a=y_(a,i,Gn),a!==null){qt=a;return}if(i=i.sibling,i!==null){qt=i;return}qt=i=n}while(i!==null);en===0&&(en=5)}function jr(n,i,a){var c=Pt,p=ei.transition;try{ei.transition=null,Pt=1,R_(n,i,a,c)}finally{ei.transition=p,Pt=c}return null}function R_(n,i,a,c){do Ls();while(dr!==null);if(Tt&6)throw Error(t(327));a=n.finishedWork;var p=n.finishedLanes;if(a===null)return null;if(n.finishedWork=null,n.finishedLanes=0,a===n.current)throw Error(t(177));n.callbackNode=null,n.callbackPriority=0;var x=a.lanes|a.childLanes;if(c0(n,x),n===an&&(qt=an=null,fn=0),!(a.subtreeFlags&2064)&&!(a.flags&2064)||ll||(ll=!0,Hp(Nt,function(){return Ls(),null})),x=(a.flags&15990)!==0,a.subtreeFlags&15990||x){x=ei.transition,ei.transition=null;var w=Pt;Pt=1;var k=Tt;Tt|=4,Ou.current=null,E_(n,a),bp(a,n),q0(jc),Ea=!!Wc,jc=Wc=null,n.current=a,w_(a),ct(),Tt=k,Pt=w,ei.transition=x}else n.current=a;if(ll&&(ll=!1,dr=n,cl=p),x=n.pendingLanes,x===0&&(ur=null),vt(a.stateNode),On(n,je()),i!==null)for(c=n.onRecoverableError,a=0;a<i.length;a++)p=i[a],c(p.value,{componentStack:p.stack,digest:p.digest});if(al)throw al=!1,n=zu,zu=null,n;return cl&1&&n.tag!==0&&Ls(),x=n.pendingLanes,x&1?n===Bu?Yo++:(Yo=0,Bu=n):Yo=0,or(),null}function Ls(){if(dr!==null){var n=Tf(cl),i=ei.transition,a=Pt;try{if(ei.transition=null,Pt=16>n?16:n,dr===null)var c=!1;else{if(n=dr,dr=null,cl=0,Tt&6)throw Error(t(331));var p=Tt;for(Tt|=4,$e=n.current;$e!==null;){var x=$e,w=x.child;if($e.flags&16){var k=x.deletions;if(k!==null){for(var G=0;G<k.length;G++){var ae=k[G];for($e=ae;$e!==null;){var Ee=$e;switch(Ee.tag){case 0:case 11:case 15:jo(8,Ee,x)}var Ce=Ee.child;if(Ce!==null)Ce.return=Ee,$e=Ce;else for(;$e!==null;){Ee=$e;var Se=Ee.sibling,We=Ee.return;if(Mp(Ee),Ee===ae){$e=null;break}if(Se!==null){Se.return=We,$e=Se;break}$e=We}}}var qe=x.alternate;if(qe!==null){var Ze=qe.child;if(Ze!==null){qe.child=null;do{var Yt=Ze.sibling;Ze.sibling=null,Ze=Yt}while(Ze!==null)}}$e=x}}if(x.subtreeFlags&2064&&w!==null)w.return=x,$e=w;else e:for(;$e!==null;){if(x=$e,x.flags&2048)switch(x.tag){case 0:case 11:case 15:jo(9,x,x.return)}var Z=x.sibling;if(Z!==null){Z.return=x.return,$e=Z;break e}$e=x.return}}var j=n.current;for($e=j;$e!==null;){w=$e;var ne=w.child;if(w.subtreeFlags&2064&&ne!==null)ne.return=w,$e=ne;else e:for(w=j;$e!==null;){if(k=$e,k.flags&2048)try{switch(k.tag){case 0:case 11:case 15:rl(9,k)}}catch(Qe){jt(k,k.return,Qe)}if(k===w){$e=null;break e}var De=k.sibling;if(De!==null){De.return=k.return,$e=De;break e}$e=k.return}}if(Tt=p,or(),wt&&typeof wt.onPostCommitFiberRoot=="function")try{wt.onPostCommitFiberRoot(Pn,n)}catch{}c=!0}return c}finally{Pt=a,ei.transition=i}}return!1}function kp(n,i,a){i=bs(a,i),i=np(n,i,1),n=lr(n,i,1),i=wn(),n!==null&&(_o(n,1,i),On(n,i))}function jt(n,i,a){if(n.tag===3)kp(n,n,a);else for(;i!==null;){if(i.tag===3){kp(i,n,a);break}else if(i.tag===1){var c=i.stateNode;if(typeof i.type.getDerivedStateFromError=="function"||typeof c.componentDidCatch=="function"&&(ur===null||!ur.has(c))){n=bs(a,n),n=ip(i,n,1),i=lr(i,n,1),n=wn(),i!==null&&(_o(i,1,n),On(i,n));break}}i=i.return}}function P_(n,i,a){var c=n.pingCache;c!==null&&c.delete(i),i=wn(),n.pingedLanes|=n.suspendedLanes&a,an===n&&(fn&a)===a&&(en===4||en===3&&(fn&130023424)===fn&&500>je()-ku?Wr(n,0):Fu|=a),On(n,i)}function zp(n,i){i===0&&(n.mode&1?(i=Ki,Ki<<=1,!(Ki&130023424)&&(Ki=4194304)):i=1);var a=wn();n=Ui(n,i),n!==null&&(_o(n,i,a),On(n,a))}function L_(n){var i=n.memoizedState,a=0;i!==null&&(a=i.retryLane),zp(n,a)}function N_(n,i){var a=0;switch(n.tag){case 13:var c=n.stateNode,p=n.memoizedState;p!==null&&(a=p.retryLane);break;case 19:c=n.stateNode;break;default:throw Error(t(314))}c!==null&&c.delete(i),zp(n,a)}var Bp;Bp=function(n,i,a){if(n!==null)if(n.memoizedProps!==i.pendingProps||Nn.current)Un=!0;else{if(!(n.lanes&a)&&!(i.flags&128))return Un=!1,x_(n,i,a);Un=!!(n.flags&131072)}else Un=!1,zt&&i.flags&1048576&&xh(i,Ha,i.index);switch(i.lanes=0,i.tag){case 2:var c=i.type;nl(n,i),n=i.pendingProps;var p=xs(i,pn.current);Ts(i,a),p=mu(null,i,c,n,p,a);var x=gu();return i.flags|=1,typeof p=="object"&&p!==null&&typeof p.render=="function"&&p.$$typeof===void 0?(i.tag=1,i.memoizedState=null,i.updateQueue=null,Dn(c)?(x=!0,ka(i)):x=!1,i.memoizedState=p.state!==null&&p.state!==void 0?p.state:null,lu(i),p.updater=el,i.stateNode=p,p._reactInternals=i,Mu(i,c,n,a),i=Au(null,i,c,!0,x,a)):(i.tag=0,zt&&x&&Jc(i),En(null,i,p,a),i=i.child),i;case 16:c=i.elementType;e:{switch(nl(n,i),n=i.pendingProps,p=c._init,c=p(c._payload),i.type=c,p=i.tag=U_(c),n=li(c,n),p){case 0:i=Tu(null,i,c,n,a);break e;case 1:i=fp(null,i,c,n,a);break e;case 11:i=ap(null,i,c,n,a);break e;case 14:i=lp(null,i,c,li(c.type,n),a);break e}throw Error(t(306,c,""))}return i;case 0:return c=i.type,p=i.pendingProps,p=i.elementType===c?p:li(c,p),Tu(n,i,c,p,a);case 1:return c=i.type,p=i.pendingProps,p=i.elementType===c?p:li(c,p),fp(n,i,c,p,a);case 3:e:{if(hp(i),n===null)throw Error(t(387));c=i.pendingProps,x=i.memoizedState,p=x.element,Ch(n,i),$a(i,c,null,a);var w=i.memoizedState;if(c=w.element,x.isDehydrated)if(x={element:c,isDehydrated:!1,cache:w.cache,pendingSuspenseBoundaries:w.pendingSuspenseBoundaries,transitions:w.transitions},i.updateQueue.baseState=x,i.memoizedState=x,i.flags&256){p=bs(Error(t(423)),i),i=pp(n,i,c,a,p);break e}else if(c!==p){p=bs(Error(t(424)),i),i=pp(n,i,c,a,p);break e}else for(Vn=ir(i.stateNode.containerInfo.firstChild),Hn=i,zt=!0,ai=null,a=Ah(i,null,c,a),i.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling;else{if(Ms(),c===p){i=Oi(n,i,a);break e}En(n,i,c,a)}i=i.child}return i;case 5:return Lh(i),n===null&&tu(i),c=i.type,p=i.pendingProps,x=n!==null?n.memoizedProps:null,w=p.children,Xc(c,p)?w=null:x!==null&&Xc(c,x)&&(i.flags|=32),dp(n,i),En(n,i,w,a),i.child;case 6:return n===null&&tu(i),null;case 13:return mp(n,i,a);case 4:return cu(i,i.stateNode.containerInfo),c=i.pendingProps,n===null?i.child=Es(i,null,c,a):En(n,i,c,a),i.child;case 11:return c=i.type,p=i.pendingProps,p=i.elementType===c?p:li(c,p),ap(n,i,c,p,a);case 7:return En(n,i,i.pendingProps,a),i.child;case 8:return En(n,i,i.pendingProps.children,a),i.child;case 12:return En(n,i,i.pendingProps.children,a),i.child;case 10:e:{if(c=i.type._context,p=i.pendingProps,x=i.memoizedProps,w=p.value,Dt(Wa,c._currentValue),c._currentValue=w,x!==null)if(oi(x.value,w)){if(x.children===p.children&&!Nn.current){i=Oi(n,i,a);break e}}else for(x=i.child,x!==null&&(x.return=i);x!==null;){var k=x.dependencies;if(k!==null){w=x.child;for(var G=k.firstContext;G!==null;){if(G.context===c){if(x.tag===1){G=Ii(-1,a&-a),G.tag=2;var ae=x.updateQueue;if(ae!==null){ae=ae.shared;var Ee=ae.pending;Ee===null?G.next=G:(G.next=Ee.next,Ee.next=G),ae.pending=G}}x.lanes|=a,G=x.alternate,G!==null&&(G.lanes|=a),ou(x.return,a,i),k.lanes|=a;break}G=G.next}}else if(x.tag===10)w=x.type===i.type?null:x.child;else if(x.tag===18){if(w=x.return,w===null)throw Error(t(341));w.lanes|=a,k=w.alternate,k!==null&&(k.lanes|=a),ou(w,a,i),w=x.sibling}else w=x.child;if(w!==null)w.return=x;else for(w=x;w!==null;){if(w===i){w=null;break}if(x=w.sibling,x!==null){x.return=w.return,w=x;break}w=w.return}x=w}En(n,i,p.children,a),i=i.child}return i;case 9:return p=i.type,c=i.pendingProps.children,Ts(i,a),p=Jn(p),c=c(p),i.flags|=1,En(n,i,c,a),i.child;case 14:return c=i.type,p=li(c,i.pendingProps),p=li(c.type,p),lp(n,i,c,p,a);case 15:return cp(n,i,i.type,i.pendingProps,a);case 17:return c=i.type,p=i.pendingProps,p=i.elementType===c?p:li(c,p),nl(n,i),i.tag=1,Dn(c)?(n=!0,ka(i)):n=!1,Ts(i,a),ep(i,c,p),Mu(i,c,p,a),Au(null,i,c,!0,n,a);case 19:return vp(n,i,a);case 22:return up(n,i,a)}throw Error(t(156,i.tag))};function Hp(n,i){return ce(n,i)}function D_(n,i,a,c){this.tag=n,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=i,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=c,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ti(n,i,a,c){return new D_(n,i,a,c)}function Xu(n){return n=n.prototype,!(!n||!n.isReactComponent)}function U_(n){if(typeof n=="function")return Xu(n)?1:0;if(n!=null){if(n=n.$$typeof,n===le)return 11;if(n===q)return 14}return 2}function pr(n,i){var a=n.alternate;return a===null?(a=ti(n.tag,i,n.key,n.mode),a.elementType=n.elementType,a.type=n.type,a.stateNode=n.stateNode,a.alternate=n,n.alternate=a):(a.pendingProps=i,a.type=n.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=n.flags&14680064,a.childLanes=n.childLanes,a.lanes=n.lanes,a.child=n.child,a.memoizedProps=n.memoizedProps,a.memoizedState=n.memoizedState,a.updateQueue=n.updateQueue,i=n.dependencies,a.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext},a.sibling=n.sibling,a.index=n.index,a.ref=n.ref,a}function hl(n,i,a,c,p,x){var w=2;if(c=n,typeof n=="function")Xu(n)&&(w=1);else if(typeof n=="string")w=5;else e:switch(n){case I:return Xr(a.children,p,x,i);case ie:w=8,p|=8;break;case R:return n=ti(12,a,i,p|2),n.elementType=R,n.lanes=x,n;case me:return n=ti(13,a,i,p),n.elementType=me,n.lanes=x,n;case H:return n=ti(19,a,i,p),n.elementType=H,n.lanes=x,n;case J:return pl(a,p,x,i);default:if(typeof n=="object"&&n!==null)switch(n.$$typeof){case U:w=10;break e;case se:w=9;break e;case le:w=11;break e;case q:w=14;break e;case te:w=16,c=null;break e}throw Error(t(130,n==null?n:typeof n,""))}return i=ti(w,a,i,p),i.elementType=n,i.type=c,i.lanes=x,i}function Xr(n,i,a,c){return n=ti(7,n,c,i),n.lanes=a,n}function pl(n,i,a,c){return n=ti(22,n,c,i),n.elementType=J,n.lanes=a,n.stateNode={isHidden:!1},n}function $u(n,i,a){return n=ti(6,n,null,i),n.lanes=a,n}function Yu(n,i,a){return i=ti(4,n.children!==null?n.children:[],n.key,i),i.lanes=a,i.stateNode={containerInfo:n.containerInfo,pendingChildren:null,implementation:n.implementation},i}function I_(n,i,a,c,p){this.tag=i,this.containerInfo=n,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=cs(0),this.expirationTimes=cs(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=cs(0),this.identifierPrefix=c,this.onRecoverableError=p,this.mutableSourceEagerHydrationData=null}function qu(n,i,a,c,p,x,w,k,G){return n=new I_(n,i,a,k,G),i===1?(i=1,x===!0&&(i|=8)):i=0,x=ti(3,null,null,i),n.current=x,x.stateNode=n,x.memoizedState={element:c,isDehydrated:a,cache:null,transitions:null,pendingSuspenseBoundaries:null},lu(x),n}function O_(n,i,a){var c=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:D,key:c==null?null:""+c,children:n,containerInfo:i,implementation:a}}function Vp(n){if(!n)return sr;n=n._reactInternals;e:{if(Ci(n)!==n||n.tag!==1)throw Error(t(170));var i=n;do{switch(i.tag){case 3:i=i.stateNode.context;break e;case 1:if(Dn(i.type)){i=i.stateNode.__reactInternalMemoizedMergedChildContext;break e}}i=i.return}while(i!==null);throw Error(t(171))}if(n.tag===1){var a=n.type;if(Dn(a))return gh(n,a,i)}return i}function Gp(n,i,a,c,p,x,w,k,G){return n=qu(a,c,!0,n,p,x,w,k,G),n.context=Vp(null),a=n.current,c=wn(),p=fr(a),x=Ii(c,p),x.callback=i??null,lr(a,x,p),n.current.lanes=p,_o(n,p,c),On(n,c),n}function ml(n,i,a,c){var p=i.current,x=wn(),w=fr(p);return a=Vp(a),i.context===null?i.context=a:i.pendingContext=a,i=Ii(x,w),i.payload={element:n},c=c===void 0?null:c,c!==null&&(i.callback=c),n=lr(p,i,w),n!==null&&(di(n,p,w,x),Xa(n,p,w)),w}function gl(n){if(n=n.current,!n.child)return null;switch(n.child.tag){case 5:return n.child.stateNode;default:return n.child.stateNode}}function Wp(n,i){if(n=n.memoizedState,n!==null&&n.dehydrated!==null){var a=n.retryLane;n.retryLane=a!==0&&a<i?a:i}}function Ku(n,i){Wp(n,i),(n=n.alternate)&&Wp(n,i)}function F_(){return null}var jp=typeof reportError=="function"?reportError:function(n){console.error(n)};function Zu(n){this._internalRoot=n}vl.prototype.render=Zu.prototype.render=function(n){var i=this._internalRoot;if(i===null)throw Error(t(409));ml(n,i,null,null)},vl.prototype.unmount=Zu.prototype.unmount=function(){var n=this._internalRoot;if(n!==null){this._internalRoot=null;var i=n.containerInfo;Gr(function(){ml(null,n,null,null)}),i[Pi]=null}};function vl(n){this._internalRoot=n}vl.prototype.unstable_scheduleHydration=function(n){if(n){var i=Cf();n={blockedOn:null,target:n,priority:i};for(var a=0;a<er.length&&i!==0&&i<er[a].priority;a++);er.splice(a,0,n),a===0&&Lf(n)}};function Ju(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11)}function _l(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11&&(n.nodeType!==8||n.nodeValue!==" react-mount-point-unstable "))}function Xp(){}function k_(n,i,a,c,p){if(p){if(typeof c=="function"){var x=c;c=function(){var ae=gl(w);x.call(ae)}}var w=Gp(i,c,n,0,null,!1,!1,"",Xp);return n._reactRootContainer=w,n[Pi]=w.current,No(n.nodeType===8?n.parentNode:n),Gr(),w}for(;p=n.lastChild;)n.removeChild(p);if(typeof c=="function"){var k=c;c=function(){var ae=gl(G);k.call(ae)}}var G=qu(n,0,!1,null,null,!1,!1,"",Xp);return n._reactRootContainer=G,n[Pi]=G.current,No(n.nodeType===8?n.parentNode:n),Gr(function(){ml(i,G,a,c)}),G}function xl(n,i,a,c,p){var x=a._reactRootContainer;if(x){var w=x;if(typeof p=="function"){var k=p;p=function(){var G=gl(w);k.call(G)}}ml(i,w,n,p)}else w=k_(a,i,n,p,c);return gl(w)}Af=function(n){switch(n.tag){case 3:var i=n.stateNode;if(i.current.memoizedState.isDehydrated){var a=Wt(i.pendingLanes);a!==0&&(Mc(i,a|1),On(i,je()),!(Tt&6)&&(Ps=je()+500,or()))}break;case 13:Gr(function(){var c=Ui(n,1);if(c!==null){var p=wn();di(c,n,1,p)}}),Ku(n,1)}},Ec=function(n){if(n.tag===13){var i=Ui(n,134217728);if(i!==null){var a=wn();di(i,n,134217728,a)}Ku(n,134217728)}},bf=function(n){if(n.tag===13){var i=fr(n),a=Ui(n,i);if(a!==null){var c=wn();di(a,n,i,c)}Ku(n,i)}},Cf=function(){return Pt},Rf=function(n,i){var a=Pt;try{return Pt=n,i()}finally{Pt=a}},Le=function(n,i,a){switch(i){case"input":if(Mt(n,a),i=a.name,a.type==="radio"&&i!=null){for(a=n;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll("input[name="+JSON.stringify(""+i)+'][type="radio"]'),i=0;i<a.length;i++){var c=a[i];if(c!==n&&c.form===n.form){var p=Oa(c);if(!p)throw Error(t(90));Q(c),Mt(c,p)}}}break;case"textarea":we(n,a);break;case"select":i=a.value,i!=null&&re(n,!!a.multiple,i,!1)}},rt=Gu,et=Gr;var z_={usingClientEntryPoint:!1,Events:[Io,vs,Oa,oe,pe,Gu]},qo={findFiberByHostInstance:Ir,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},B_={bundleType:qo.bundleType,version:qo.version,rendererPackageName:qo.rendererPackageName,rendererConfig:qo.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:P.ReactCurrentDispatcher,findHostInstanceByFiber:function(n){return n=ue(n),n===null?null:n.stateNode},findFiberByHostInstance:qo.findFiberByHostInstance||F_,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var yl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!yl.isDisabled&&yl.supportsFiber)try{Pn=yl.inject(B_),wt=yl}catch{}}return Fn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=z_,Fn.createPortal=function(n,i){var a=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Ju(i))throw Error(t(200));return O_(n,i,null,a)},Fn.createRoot=function(n,i){if(!Ju(n))throw Error(t(299));var a=!1,c="",p=jp;return i!=null&&(i.unstable_strictMode===!0&&(a=!0),i.identifierPrefix!==void 0&&(c=i.identifierPrefix),i.onRecoverableError!==void 0&&(p=i.onRecoverableError)),i=qu(n,1,!1,null,null,a,!1,c,p),n[Pi]=i.current,No(n.nodeType===8?n.parentNode:n),new Zu(i)},Fn.findDOMNode=function(n){if(n==null)return null;if(n.nodeType===1)return n;var i=n._reactInternals;if(i===void 0)throw typeof n.render=="function"?Error(t(188)):(n=Object.keys(n).join(","),Error(t(268,n)));return n=ue(i),n=n===null?null:n.stateNode,n},Fn.flushSync=function(n){return Gr(n)},Fn.hydrate=function(n,i,a){if(!_l(i))throw Error(t(200));return xl(null,n,i,!0,a)},Fn.hydrateRoot=function(n,i,a){if(!Ju(n))throw Error(t(405));var c=a!=null&&a.hydratedSources||null,p=!1,x="",w=jp;if(a!=null&&(a.unstable_strictMode===!0&&(p=!0),a.identifierPrefix!==void 0&&(x=a.identifierPrefix),a.onRecoverableError!==void 0&&(w=a.onRecoverableError)),i=Gp(i,null,n,1,a??null,p,!1,x,w),n[Pi]=i.current,No(n),c)for(n=0;n<c.length;n++)a=c[n],p=a._getVersion,p=p(a._source),i.mutableSourceEagerHydrationData==null?i.mutableSourceEagerHydrationData=[a,p]:i.mutableSourceEagerHydrationData.push(a,p);return new vl(i)},Fn.render=function(n,i,a){if(!_l(i))throw Error(t(200));return xl(null,n,i,!1,a)},Fn.unmountComponentAtNode=function(n){if(!_l(n))throw Error(t(40));return n._reactRootContainer?(Gr(function(){xl(null,null,n,!1,function(){n._reactRootContainer=null,n[Pi]=null})}),!0):!1},Fn.unstable_batchedUpdates=Gu,Fn.unstable_renderSubtreeIntoContainer=function(n,i,a,c){if(!_l(a))throw Error(t(200));if(n==null||n._reactInternals===void 0)throw Error(t(38));return xl(n,i,a,!1,c)},Fn.version="18.3.1-next-f1338f8080-20240426",Fn}var em;function ev(){if(em)return td.exports;em=1;function s(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s)}catch(e){console.error(e)}}return s(),td.exports=Z_(),td.exports}var tm;function J_(){if(tm)return Sl;tm=1;var s=ev();return Sl.createRoot=s.createRoot,Sl.hydrateRoot=s.hydrateRoot,Sl}var Q_=J_();ev();/**
 * @remix-run/router v1.21.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function oa(){return oa=Object.assign?Object.assign.bind():function(s){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(s[r]=t[r])}return s},oa.apply(this,arguments)}var Mr;(function(s){s.Pop="POP",s.Push="PUSH",s.Replace="REPLACE"})(Mr||(Mr={}));const nm="popstate";function ex(s){s===void 0&&(s={});function e(r,o){let{pathname:l,search:d,hash:u}=r.location;return Vd("",{pathname:l,search:d,hash:u},o.state&&o.state.usr||null,o.state&&o.state.key||"default")}function t(r,o){return typeof o=="string"?o:Jl(o)}return nx(e,t,null,s)}function Xt(s,e){if(s===!1||s===null||typeof s>"u")throw new Error(e)}function tv(s,e){if(!s){typeof console<"u"&&console.warn(e);try{throw new Error(e)}catch{}}}function tx(){return Math.random().toString(36).substr(2,8)}function im(s,e){return{usr:s.state,key:s.key,idx:e}}function Vd(s,e,t,r){return t===void 0&&(t=null),oa({pathname:typeof s=="string"?s:s.pathname,search:"",hash:""},typeof e=="string"?fo(e):e,{state:t,key:e&&e.key||r||tx()})}function Jl(s){let{pathname:e="/",search:t="",hash:r=""}=s;return t&&t!=="?"&&(e+=t.charAt(0)==="?"?t:"?"+t),r&&r!=="#"&&(e+=r.charAt(0)==="#"?r:"#"+r),e}function fo(s){let e={};if(s){let t=s.indexOf("#");t>=0&&(e.hash=s.substr(t),s=s.substr(0,t));let r=s.indexOf("?");r>=0&&(e.search=s.substr(r),s=s.substr(0,r)),s&&(e.pathname=s)}return e}function nx(s,e,t,r){r===void 0&&(r={});let{window:o=document.defaultView,v5Compat:l=!1}=r,d=o.history,u=Mr.Pop,f=null,h=m();h==null&&(h=0,d.replaceState(oa({},d.state,{idx:h}),""));function m(){return(d.state||{idx:null}).idx}function g(){u=Mr.Pop;let _=m(),v=_==null?null:_-h;h=_,f&&f({action:u,location:M.location,delta:v})}function y(_,v){u=Mr.Push;let T=Vd(M.location,_,v);h=m()+1;let A=im(T,h),P=M.createHref(T);try{d.pushState(A,"",P)}catch(F){if(F instanceof DOMException&&F.name==="DataCloneError")throw F;o.location.assign(P)}l&&f&&f({action:u,location:M.location,delta:1})}function S(_,v){u=Mr.Replace;let T=Vd(M.location,_,v);h=m();let A=im(T,h),P=M.createHref(T);d.replaceState(A,"",P),l&&f&&f({action:u,location:M.location,delta:0})}function E(_){let v=o.location.origin!=="null"?o.location.origin:o.location.href,T=typeof _=="string"?_:Jl(_);return T=T.replace(/ $/,"%20"),Xt(v,"No window.location.(origin|href) available to create URL for href: "+T),new URL(T,v)}let M={get action(){return u},get location(){return s(o,d)},listen(_){if(f)throw new Error("A history only accepts one active listener");return o.addEventListener(nm,g),f=_,()=>{o.removeEventListener(nm,g),f=null}},createHref(_){return e(o,_)},createURL:E,encodeLocation(_){let v=E(_);return{pathname:v.pathname,search:v.search,hash:v.hash}},push:y,replace:S,go(_){return d.go(_)}};return M}var rm;(function(s){s.data="data",s.deferred="deferred",s.redirect="redirect",s.error="error"})(rm||(rm={}));function ix(s,e,t){return t===void 0&&(t="/"),rx(s,e,t)}function rx(s,e,t,r){let o=typeof e=="string"?fo(e):e,l=oo(o.pathname||"/",t);if(l==null)return null;let d=nv(s);sx(d);let u=null;for(let f=0;u==null&&f<d.length;++f){let h=gx(l);u=px(d[f],h)}return u}function nv(s,e,t,r){e===void 0&&(e=[]),t===void 0&&(t=[]),r===void 0&&(r="");let o=(l,d,u)=>{let f={relativePath:u===void 0?l.path||"":u,caseSensitive:l.caseSensitive===!0,childrenIndex:d,route:l};f.relativePath.startsWith("/")&&(Xt(f.relativePath.startsWith(r),'Absolute route path "'+f.relativePath+'" nested under path '+('"'+r+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),f.relativePath=f.relativePath.slice(r.length));let h=Ar([r,f.relativePath]),m=t.concat(f);l.children&&l.children.length>0&&(Xt(l.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+h+'".')),nv(l.children,e,m,h)),!(l.path==null&&!l.index)&&e.push({path:h,score:fx(h,l.index),routesMeta:m})};return s.forEach((l,d)=>{var u;if(l.path===""||!((u=l.path)!=null&&u.includes("?")))o(l,d);else for(let f of iv(l.path))o(l,d,f)}),e}function iv(s){let e=s.split("/");if(e.length===0)return[];let[t,...r]=e,o=t.endsWith("?"),l=t.replace(/\?$/,"");if(r.length===0)return o?[l,""]:[l];let d=iv(r.join("/")),u=[];return u.push(...d.map(f=>f===""?l:[l,f].join("/"))),o&&u.push(...d),u.map(f=>s.startsWith("/")&&f===""?"/":f)}function sx(s){s.sort((e,t)=>e.score!==t.score?t.score-e.score:hx(e.routesMeta.map(r=>r.childrenIndex),t.routesMeta.map(r=>r.childrenIndex)))}const ox=/^:[\w-]+$/,ax=3,lx=2,cx=1,ux=10,dx=-2,sm=s=>s==="*";function fx(s,e){let t=s.split("/"),r=t.length;return t.some(sm)&&(r+=dx),e&&(r+=lx),t.filter(o=>!sm(o)).reduce((o,l)=>o+(ox.test(l)?ax:l===""?cx:ux),r)}function hx(s,e){return s.length===e.length&&s.slice(0,-1).every((r,o)=>r===e[o])?s[s.length-1]-e[e.length-1]:0}function px(s,e,t){let{routesMeta:r}=s,o={},l="/",d=[];for(let u=0;u<r.length;++u){let f=r[u],h=u===r.length-1,m=l==="/"?e:e.slice(l.length)||"/",g=Gd({path:f.relativePath,caseSensitive:f.caseSensitive,end:h},m),y=f.route;if(!g)return null;Object.assign(o,g.params),d.push({params:o,pathname:Ar([l,g.pathname]),pathnameBase:yx(Ar([l,g.pathnameBase])),route:y}),g.pathnameBase!=="/"&&(l=Ar([l,g.pathnameBase]))}return d}function Gd(s,e){typeof s=="string"&&(s={path:s,caseSensitive:!1,end:!0});let[t,r]=mx(s.path,s.caseSensitive,s.end),o=e.match(t);if(!o)return null;let l=o[0],d=l.replace(/(.)\/+$/,"$1"),u=o.slice(1);return{params:r.reduce((h,m,g)=>{let{paramName:y,isOptional:S}=m;if(y==="*"){let M=u[g]||"";d=l.slice(0,l.length-M.length).replace(/(.)\/+$/,"$1")}const E=u[g];return S&&!E?h[y]=void 0:h[y]=(E||"").replace(/%2F/g,"/"),h},{}),pathname:l,pathnameBase:d,pattern:s}}function mx(s,e,t){e===void 0&&(e=!1),t===void 0&&(t=!0),tv(s==="*"||!s.endsWith("*")||s.endsWith("/*"),'Route path "'+s+'" will be treated as if it were '+('"'+s.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+s.replace(/\*$/,"/*")+'".'));let r=[],o="^"+s.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(d,u,f)=>(r.push({paramName:u,isOptional:f!=null}),f?"/?([^\\/]+)?":"/([^\\/]+)"));return s.endsWith("*")?(r.push({paramName:"*"}),o+=s==="*"||s==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):t?o+="\\/*$":s!==""&&s!=="/"&&(o+="(?:(?=\\/|$))"),[new RegExp(o,e?void 0:"i"),r]}function gx(s){try{return s.split("/").map(e=>decodeURIComponent(e).replace(/\//g,"%2F")).join("/")}catch(e){return tv(!1,'The URL path "'+s+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+e+").")),s}}function oo(s,e){if(e==="/")return s;if(!s.toLowerCase().startsWith(e.toLowerCase()))return null;let t=e.endsWith("/")?e.length-1:e.length,r=s.charAt(t);return r&&r!=="/"?null:s.slice(t)||"/"}function vx(s,e){e===void 0&&(e="/");let{pathname:t,search:r="",hash:o=""}=typeof s=="string"?fo(s):s;return{pathname:t?t.startsWith("/")?t:_x(t,e):e,search:Sx(r),hash:Mx(o)}}function _x(s,e){let t=e.replace(/\/+$/,"").split("/");return s.split("/").forEach(o=>{o===".."?t.length>1&&t.pop():o!=="."&&t.push(o)}),t.length>1?t.join("/"):"/"}function rd(s,e,t,r){return"Cannot include a '"+s+"' character in a manually specified "+("`to."+e+"` field ["+JSON.stringify(r)+"].  Please separate it out to the ")+("`to."+t+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function xx(s){return s.filter((e,t)=>t===0||e.route.path&&e.route.path.length>0)}function rv(s,e){let t=xx(s);return e?t.map((r,o)=>o===t.length-1?r.pathname:r.pathnameBase):t.map(r=>r.pathnameBase)}function sv(s,e,t,r){r===void 0&&(r=!1);let o;typeof s=="string"?o=fo(s):(o=oa({},s),Xt(!o.pathname||!o.pathname.includes("?"),rd("?","pathname","search",o)),Xt(!o.pathname||!o.pathname.includes("#"),rd("#","pathname","hash",o)),Xt(!o.search||!o.search.includes("#"),rd("#","search","hash",o)));let l=s===""||o.pathname==="",d=l?"/":o.pathname,u;if(d==null)u=t;else{let g=e.length-1;if(!r&&d.startsWith("..")){let y=d.split("/");for(;y[0]==="..";)y.shift(),g-=1;o.pathname=y.join("/")}u=g>=0?e[g]:"/"}let f=vx(o,u),h=d&&d!=="/"&&d.endsWith("/"),m=(l||d===".")&&t.endsWith("/");return!f.pathname.endsWith("/")&&(h||m)&&(f.pathname+="/"),f}const Ar=s=>s.join("/").replace(/\/\/+/g,"/"),yx=s=>s.replace(/\/+$/,"").replace(/^\/*/,"/"),Sx=s=>!s||s==="?"?"":s.startsWith("?")?s:"?"+s,Mx=s=>!s||s==="#"?"":s.startsWith("#")?s:"#"+s;function Ex(s){return s!=null&&typeof s.status=="number"&&typeof s.statusText=="string"&&typeof s.internal=="boolean"&&"data"in s}const ov=["post","put","patch","delete"];new Set(ov);const wx=["get",...ov];new Set(wx);/**
 * React Router v6.28.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function aa(){return aa=Object.assign?Object.assign.bind():function(s){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(s[r]=t[r])}return s},aa.apply(this,arguments)}const fc=he.createContext(null),av=he.createContext(null),Lr=he.createContext(null),hc=he.createContext(null),$i=he.createContext({outlet:null,matches:[],isDataRoute:!1}),lv=he.createContext(null);function Tx(s,e){let{relative:t}=e===void 0?{}:e;da()||Xt(!1);let{basename:r,navigator:o}=he.useContext(Lr),{hash:l,pathname:d,search:u}=pc(s,{relative:t}),f=d;return r!=="/"&&(f=d==="/"?r:Ar([r,d])),o.createHref({pathname:f,search:u,hash:l})}function da(){return he.useContext(hc)!=null}function fa(){return da()||Xt(!1),he.useContext(hc).location}function cv(s){he.useContext(Lr).static||he.useLayoutEffect(s)}function Ax(){let{isDataRoute:s}=he.useContext($i);return s?Vx():bx()}function bx(){da()||Xt(!1);let s=he.useContext(fc),{basename:e,future:t,navigator:r}=he.useContext(Lr),{matches:o}=he.useContext($i),{pathname:l}=fa(),d=JSON.stringify(rv(o,t.v7_relativeSplatPath)),u=he.useRef(!1);return cv(()=>{u.current=!0}),he.useCallback(function(h,m){if(m===void 0&&(m={}),!u.current)return;if(typeof h=="number"){r.go(h);return}let g=sv(h,JSON.parse(d),l,m.relative==="path");s==null&&e!=="/"&&(g.pathname=g.pathname==="/"?e:Ar([e,g.pathname])),(m.replace?r.replace:r.push)(g,m.state,m)},[e,r,d,l,s])}const Cx=he.createContext(null);function Rx(s){let e=he.useContext($i).outlet;return e&&he.createElement(Cx.Provider,{value:s},e)}function Px(){let{matches:s}=he.useContext($i),e=s[s.length-1];return e?e.params:{}}function pc(s,e){let{relative:t}=e===void 0?{}:e,{future:r}=he.useContext(Lr),{matches:o}=he.useContext($i),{pathname:l}=fa(),d=JSON.stringify(rv(o,r.v7_relativeSplatPath));return he.useMemo(()=>sv(s,JSON.parse(d),l,t==="path"),[s,d,l,t])}function Lx(s,e){return Nx(s,e)}function Nx(s,e,t,r){da()||Xt(!1);let{navigator:o}=he.useContext(Lr),{matches:l}=he.useContext($i),d=l[l.length-1],u=d?d.params:{};d&&d.pathname;let f=d?d.pathnameBase:"/";d&&d.route;let h=fa(),m;if(e){var g;let _=typeof e=="string"?fo(e):e;f==="/"||(g=_.pathname)!=null&&g.startsWith(f)||Xt(!1),m=_}else m=h;let y=m.pathname||"/",S=y;if(f!=="/"){let _=f.replace(/^\//,"").split("/");S="/"+y.replace(/^\//,"").split("/").slice(_.length).join("/")}let E=ix(s,{pathname:S}),M=Fx(E&&E.map(_=>Object.assign({},_,{params:Object.assign({},u,_.params),pathname:Ar([f,o.encodeLocation?o.encodeLocation(_.pathname).pathname:_.pathname]),pathnameBase:_.pathnameBase==="/"?f:Ar([f,o.encodeLocation?o.encodeLocation(_.pathnameBase).pathname:_.pathnameBase])})),l,t,r);return e&&M?he.createElement(hc.Provider,{value:{location:aa({pathname:"/",search:"",hash:"",state:null,key:"default"},m),navigationType:Mr.Pop}},M):M}function Dx(){let s=Hx(),e=Ex(s)?s.status+" "+s.statusText:s instanceof Error?s.message:JSON.stringify(s),t=s instanceof Error?s.stack:null,o={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return he.createElement(he.Fragment,null,he.createElement("h2",null,"Unexpected Application Error!"),he.createElement("h3",{style:{fontStyle:"italic"}},e),t?he.createElement("pre",{style:o},t):null,null)}const Ux=he.createElement(Dx,null);class Ix extends he.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){console.error("React Router caught the following error during render",e,t)}render(){return this.state.error!==void 0?he.createElement($i.Provider,{value:this.props.routeContext},he.createElement(lv.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function Ox(s){let{routeContext:e,match:t,children:r}=s,o=he.useContext(fc);return o&&o.static&&o.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(o.staticContext._deepestRenderedBoundaryId=t.route.id),he.createElement($i.Provider,{value:e},r)}function Fx(s,e,t,r){var o;if(e===void 0&&(e=[]),t===void 0&&(t=null),r===void 0&&(r=null),s==null){var l;if(!t)return null;if(t.errors)s=t.matches;else if((l=r)!=null&&l.v7_partialHydration&&e.length===0&&!t.initialized&&t.matches.length>0)s=t.matches;else return null}let d=s,u=(o=t)==null?void 0:o.errors;if(u!=null){let m=d.findIndex(g=>g.route.id&&(u==null?void 0:u[g.route.id])!==void 0);m>=0||Xt(!1),d=d.slice(0,Math.min(d.length,m+1))}let f=!1,h=-1;if(t&&r&&r.v7_partialHydration)for(let m=0;m<d.length;m++){let g=d[m];if((g.route.HydrateFallback||g.route.hydrateFallbackElement)&&(h=m),g.route.id){let{loaderData:y,errors:S}=t,E=g.route.loader&&y[g.route.id]===void 0&&(!S||S[g.route.id]===void 0);if(g.route.lazy||E){f=!0,h>=0?d=d.slice(0,h+1):d=[d[0]];break}}}return d.reduceRight((m,g,y)=>{let S,E=!1,M=null,_=null;t&&(S=u&&g.route.id?u[g.route.id]:void 0,M=g.route.errorElement||Ux,f&&(h<0&&y===0?(Gx("route-fallback"),E=!0,_=null):h===y&&(E=!0,_=g.route.hydrateFallbackElement||null)));let v=e.concat(d.slice(0,y+1)),T=()=>{let A;return S?A=M:E?A=_:g.route.Component?A=he.createElement(g.route.Component,null):g.route.element?A=g.route.element:A=m,he.createElement(Ox,{match:g,routeContext:{outlet:m,matches:v,isDataRoute:t!=null},children:A})};return t&&(g.route.ErrorBoundary||g.route.errorElement||y===0)?he.createElement(Ix,{location:t.location,revalidation:t.revalidation,component:M,error:S,children:T(),routeContext:{outlet:null,matches:v,isDataRoute:!0}}):T()},null)}var uv=function(s){return s.UseBlocker="useBlocker",s.UseRevalidator="useRevalidator",s.UseNavigateStable="useNavigate",s}(uv||{}),dv=function(s){return s.UseBlocker="useBlocker",s.UseLoaderData="useLoaderData",s.UseActionData="useActionData",s.UseRouteError="useRouteError",s.UseNavigation="useNavigation",s.UseRouteLoaderData="useRouteLoaderData",s.UseMatches="useMatches",s.UseRevalidator="useRevalidator",s.UseNavigateStable="useNavigate",s.UseRouteId="useRouteId",s}(dv||{});function kx(s){let e=he.useContext(fc);return e||Xt(!1),e}function zx(s){let e=he.useContext(av);return e||Xt(!1),e}function Bx(s){let e=he.useContext($i);return e||Xt(!1),e}function fv(s){let e=Bx(),t=e.matches[e.matches.length-1];return t.route.id||Xt(!1),t.route.id}function Hx(){var s;let e=he.useContext(lv),t=zx(),r=fv();return e!==void 0?e:(s=t.errors)==null?void 0:s[r]}function Vx(){let{router:s}=kx(uv.UseNavigateStable),e=fv(dv.UseNavigateStable),t=he.useRef(!1);return cv(()=>{t.current=!0}),he.useCallback(function(o,l){l===void 0&&(l={}),t.current&&(typeof o=="number"?s.navigate(o):s.navigate(o,aa({fromRouteId:e},l)))},[s,e])}const om={};function Gx(s,e,t){om[s]||(om[s]=!0)}const am={};function Wx(s,e){am[e]||(am[e]=!0,console.warn(e))}const lm=(s,e,t)=>Wx(s,"⚠️ React Router Future Flag Warning: "+e+". "+("You can use the `"+s+"` future flag to opt-in early. ")+("For more information, see "+t+"."));function jx(s,e){s!=null&&s.v7_startTransition||lm("v7_startTransition","React Router will begin wrapping state updates in `React.startTransition` in v7","https://reactrouter.com/v6/upgrading/future#v7_starttransition"),s!=null&&s.v7_relativeSplatPath||lm("v7_relativeSplatPath","Relative route resolution within Splat routes is changing in v7","https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath")}function Xx(s){return Rx(s.context)}function Js(s){Xt(!1)}function $x(s){let{basename:e="/",children:t=null,location:r,navigationType:o=Mr.Pop,navigator:l,static:d=!1,future:u}=s;da()&&Xt(!1);let f=e.replace(/^\/*/,"/"),h=he.useMemo(()=>({basename:f,navigator:l,static:d,future:aa({v7_relativeSplatPath:!1},u)}),[f,u,l,d]);typeof r=="string"&&(r=fo(r));let{pathname:m="/",search:g="",hash:y="",state:S=null,key:E="default"}=r,M=he.useMemo(()=>{let _=oo(m,f);return _==null?null:{location:{pathname:_,search:g,hash:y,state:S,key:E},navigationType:o}},[f,m,g,y,S,E,o]);return M==null?null:he.createElement(Lr.Provider,{value:h},he.createElement(hc.Provider,{children:t,value:M}))}function Yx(s){let{children:e,location:t}=s;return Lx(Wd(e),t)}new Promise(()=>{});function Wd(s,e){e===void 0&&(e=[]);let t=[];return he.Children.forEach(s,(r,o)=>{if(!he.isValidElement(r))return;let l=[...e,o];if(r.type===he.Fragment){t.push.apply(t,Wd(r.props.children,l));return}r.type!==Js&&Xt(!1),!r.props.index||!r.props.children||Xt(!1);let d={id:r.props.id||l.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,loader:r.props.loader,action:r.props.action,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(d.children=Wd(r.props.children,l)),t.push(d)}),t}/**
 * React Router DOM v6.28.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Ql(){return Ql=Object.assign?Object.assign.bind():function(s){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(s[r]=t[r])}return s},Ql.apply(this,arguments)}function hv(s,e){if(s==null)return{};var t={},r=Object.keys(s),o,l;for(l=0;l<r.length;l++)o=r[l],!(e.indexOf(o)>=0)&&(t[o]=s[o]);return t}function qx(s){return!!(s.metaKey||s.altKey||s.ctrlKey||s.shiftKey)}function Kx(s,e){return s.button===0&&(!e||e==="_self")&&!qx(s)}const Zx=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],Jx=["aria-current","caseSensitive","className","end","style","to","viewTransition","children"],Qx="6";try{window.__reactRouterVersion=Qx}catch{}const ey=he.createContext({isTransitioning:!1}),ty="startTransition",cm=Y_[ty];function ny(s){let{basename:e,children:t,future:r,window:o}=s,l=he.useRef();l.current==null&&(l.current=ex({window:o,v5Compat:!0}));let d=l.current,[u,f]=he.useState({action:d.action,location:d.location}),{v7_startTransition:h}=r||{},m=he.useCallback(g=>{h&&cm?cm(()=>f(g)):f(g)},[f,h]);return he.useLayoutEffect(()=>d.listen(m),[d,m]),he.useEffect(()=>jx(r),[r]),he.createElement($x,{basename:e,children:t,location:u.location,navigationType:u.action,navigator:d,future:r})}const iy=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",ry=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,pv=he.forwardRef(function(e,t){let{onClick:r,relative:o,reloadDocument:l,replace:d,state:u,target:f,to:h,preventScrollReset:m,viewTransition:g}=e,y=hv(e,Zx),{basename:S}=he.useContext(Lr),E,M=!1;if(typeof h=="string"&&ry.test(h)&&(E=h,iy))try{let A=new URL(window.location.href),P=h.startsWith("//")?new URL(A.protocol+h):new URL(h),F=oo(P.pathname,S);P.origin===A.origin&&F!=null?h=F+P.search+P.hash:M=!0}catch{}let _=Tx(h,{relative:o}),v=oy(h,{replace:d,state:u,target:f,preventScrollReset:m,relative:o,viewTransition:g});function T(A){r&&r(A),A.defaultPrevented||v(A)}return he.createElement("a",Ql({},y,{href:E||_,onClick:M||l?r:T,ref:t,target:f}))}),um=he.forwardRef(function(e,t){let{"aria-current":r="page",caseSensitive:o=!1,className:l="",end:d=!1,style:u,to:f,viewTransition:h,children:m}=e,g=hv(e,Jx),y=pc(f,{relative:g.relative}),S=fa(),E=he.useContext(av),{navigator:M,basename:_}=he.useContext(Lr),v=E!=null&&ay(y)&&h===!0,T=M.encodeLocation?M.encodeLocation(y).pathname:y.pathname,A=S.pathname,P=E&&E.navigation&&E.navigation.location?E.navigation.location.pathname:null;o||(A=A.toLowerCase(),P=P?P.toLowerCase():null,T=T.toLowerCase()),P&&_&&(P=oo(P,_)||P);const F=T!=="/"&&T.endsWith("/")?T.length-1:T.length;let D=A===T||!d&&A.startsWith(T)&&A.charAt(F)==="/",I=P!=null&&(P===T||!d&&P.startsWith(T)&&P.charAt(T.length)==="/"),ie={isActive:D,isPending:I,isTransitioning:v},R=D?r:void 0,U;typeof l=="function"?U=l(ie):U=[l,D?"active":null,I?"pending":null,v?"transitioning":null].filter(Boolean).join(" ");let se=typeof u=="function"?u(ie):u;return he.createElement(pv,Ql({},g,{"aria-current":R,className:U,ref:t,style:se,to:f,viewTransition:h}),typeof m=="function"?m(ie):m)});var jd;(function(s){s.UseScrollRestoration="useScrollRestoration",s.UseSubmit="useSubmit",s.UseSubmitFetcher="useSubmitFetcher",s.UseFetcher="useFetcher",s.useViewTransitionState="useViewTransitionState"})(jd||(jd={}));var dm;(function(s){s.UseFetcher="useFetcher",s.UseFetchers="useFetchers",s.UseScrollRestoration="useScrollRestoration"})(dm||(dm={}));function sy(s){let e=he.useContext(fc);return e||Xt(!1),e}function oy(s,e){let{target:t,replace:r,state:o,preventScrollReset:l,relative:d,viewTransition:u}=e===void 0?{}:e,f=Ax(),h=fa(),m=pc(s,{relative:d});return he.useCallback(g=>{if(Kx(g,t)){g.preventDefault();let y=r!==void 0?r:Jl(h)===Jl(m);f(s,{replace:y,state:o,preventScrollReset:l,relative:d,viewTransition:u})}},[h,f,m,r,o,t,s,l,d,u])}function ay(s,e){e===void 0&&(e={});let t=he.useContext(ey);t==null&&Xt(!1);let{basename:r}=sy(jd.useViewTransitionState),o=pc(s,{relative:e.relative});if(!t.isTransitioning)return!1;let l=oo(t.currentLocation.pathname,r)||t.currentLocation.pathname,d=oo(t.nextLocation.pathname,r)||t.nextLocation.pathname;return Gd(o.pathname,d)!=null||Gd(o.pathname,l)!=null}async function Ti(s,e){const t=await fetch(s,e),r=await t.json().catch(()=>({}));if(!t.ok)throw new Error(r.detail||t.statusText);return r}const ss=(s,e)=>Ti(s,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e??{})}),Xd=(s,e,t,r)=>{const o=new FormData;return o.append(e,t,r),Ti(s,{method:"POST",body:o})};function lf(s,e){return new Promise(t=>{const r=new EventSource(`/api/jobs/${s}/events`);r.onmessage=o=>{const l=JSON.parse(o.data);e(l),(l.stage==="done"||l.stage==="failed")&&(r.close(),t(l))}})}const kn=s=>`${Math.round((s??0)*100)}%`;async function ly(s){const t=await new AudioContext().decodeAudioData(await s.arrayBuffer()),r=new OfflineAudioContext(1,Math.ceil(t.duration*16e3),16e3),o=r.createBufferSource();o.buffer=t,o.connect(r.destination),o.start();const l=(await r.startRendering()).getChannelData(0),d=new DataView(new ArrayBuffer(44+l.length*2)),u=(f,h)=>[...h].forEach((m,g)=>d.setUint8(f+g,m.charCodeAt(0)));return u(0,"RIFF"),d.setUint32(4,36+l.length*2,!0),u(8,"WAVEfmt "),d.setUint32(16,16,!0),d.setUint16(20,1,!0),d.setUint16(22,1,!0),d.setUint32(24,16e3,!0),d.setUint32(28,32e3,!0),d.setUint16(32,2,!0),d.setUint16(34,16,!0),u(36,"data"),d.setUint32(40,l.length*2,!0),l.forEach((f,h)=>d.setInt16(44+h*2,Math.max(-1,Math.min(1,f))*32767,!0)),new Blob([d],{type:"audio/wav"})}function mv(s=0){const[e,t]=he.useState(null);return he.useEffect(()=>{Ti("/api/versions").then(t).catch(()=>{})},[s]),e}const cy=[["/","Break it"],["/arena","You vs Muse"],["/agent","Agent"],["/report","Report"]];function uy({className:s=""}){return b.jsxs("span",{className:`inline-grid gap-[3px] ${s}`,"aria-hidden":!0,children:[b.jsx("i",{className:"block h-[3px] w-4 bg-ember"}),b.jsx("i",{className:"ml-1 block h-[3px] w-3 bg-ember"}),b.jsx("i",{className:"block h-[3px] w-4 bg-ember"})]})}function dy(){const s=mv();return b.jsxs("div",{className:"min-h-dvh",children:[b.jsx("header",{className:"sticky top-4 z-20 flex justify-center px-3 sm:top-6",children:b.jsxs("div",{className:"flex max-w-full items-center gap-1 rounded-full border border-white/10 bg-white/[.04] p-1.5 pl-5 shadow-[0_8px_32px_rgba(0,0,0,.45),inset_0_1px_0_rgba(255,255,255,.06)] backdrop-blur-xl backdrop-saturate-150",children:[b.jsxs(um,{to:"/",className:"mr-3 flex shrink-0 items-center gap-2.5 text-base font-medium tracking-tight",children:[b.jsx(uy,{})," ",b.jsx("span",{className:"hidden sm:inline",children:"nemesis"})]}),b.jsx("nav",{className:"flex min-w-0 gap-1 overflow-x-auto",children:cy.map(([e,t])=>b.jsx(um,{to:e,end:e==="/",className:({isActive:r})=>`whitespace-nowrap rounded-full px-3 py-2 text-[15px] transition-colors sm:px-4 ${r?"bg-white/10 text-ink":"text-mute hover:text-ink"}`,children:t},e))}),s&&b.jsx("span",{className:"ml-2 hidden shrink-0 rounded-full bg-white/[.06] px-3.5 py-2 font-mono text-[13px] text-mute md:block",children:s.live})]})}),b.jsx("main",{className:"mx-auto max-w-7xl px-5 pt-8 pb-24 sm:px-8",children:b.jsx(Xx,{})}),b.jsxs("footer",{className:"mx-auto flex max-w-7xl flex-wrap justify-between gap-4 border-t border-line px-5 py-8 text-xs text-faint sm:px-8",children:[b.jsx("span",{children:"Muse Wonder · Muse Spark · Muse Voice Transcribe · Muse Glimmer · MuJoCo MJX"}),b.jsx("a",{className:"hover:text-mute",href:"https://github.com/divagr18/nemesis",children:"source"})]})]})}/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fy=s=>s.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),gv=(...s)=>s.filter((e,t,r)=>!!e&&e.trim()!==""&&r.indexOf(e)===t).join(" ").trim();/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var hy={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const py=he.forwardRef(({color:s="currentColor",size:e=24,strokeWidth:t=2,absoluteStrokeWidth:r,className:o="",children:l,iconNode:d,...u},f)=>he.createElement("svg",{ref:f,...hy,width:e,height:e,stroke:s,strokeWidth:r?Number(t)*24/Number(e):t,className:gv("lucide",o),...u},[...d.map(([h,m])=>he.createElement(h,m)),...Array.isArray(l)?l:[l]]));/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vi=(s,e)=>{const t=he.forwardRef(({className:r,...o},l)=>he.createElement(py,{ref:l,iconNode:e,className:gv(`lucide-${fy(s)}`,r),...o}));return t.displayName=`${s}`,t};/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ho=vi("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const my=vi("ArrowUp",[["path",{d:"m5 12 7-7 7 7",key:"hav0vg"}],["path",{d:"M12 19V5",key:"x0mq9r"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gy=vi("Camera",[["path",{d:"M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",key:"1tc9qg"}],["circle",{cx:"12",cy:"13",r:"3",key:"1vg3eu"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cf=vi("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vy=vi("LoaderCircle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _y=vi("Lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xy=vi("Mic",[["path",{d:"M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z",key:"131961"}],["path",{d:"M19 10v2a7 7 0 0 1-14 0v-2",key:"1vc78b"}],["line",{x1:"12",x2:"12",y1:"19",y2:"22",key:"x3vr5v"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yy=vi("RotateCcw",[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sy=vi("Share",[["path",{d:"M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8",key:"1b2hhj"}],["polyline",{points:"16 6 12 2 8 6",key:"m901s6"}],["line",{x1:"12",x2:"12",y1:"2",y2:"15",key:"1p0rca"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const My=vi("Square",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ey=vi("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);function wy(){const[s,e]=he.useState(""),[t,r]=he.useState([]),[o,l]=he.useState(!1),[d,u]=he.useState(""),f=he.useRef(null);he.useEffect(()=>{var m;(m=f.current)==null||m.scrollIntoView({behavior:"smooth",block:"end"})},[t.length]);const h=async()=>{l(!0),u(""),r([]);try{const{job:m}=await ss("/api/agent",{goal:s});await lf(m,g=>r(y=>{var S;return g.stage==="progress"&&((S=y.at(-1))==null?void 0:S.stage)==="progress"?[...y.slice(0,-1),g]:[...y,g]}))}catch(m){u(m.message)}l(!1)};return b.jsxs("div",{className:"mx-auto max-w-3xl",children:[b.jsxs("section",{className:"pt-10 pb-12 sm:pt-16",children:[b.jsxs("h1",{className:"text-[40px] font-medium leading-[1.05] tracking-[-0.03em] sm:text-[60px]",children:["Let Muse attack",b.jsx("span",{className:"block text-faint",children:"on its own."})]}),b.jsx("p",{className:"mt-6 max-w-xl text-[17px] leading-relaxed text-mute",children:"Muse Wonder forms hypotheses, searches for the most plausible way to make the robot fall, has Muse Spark watch what happened, measures the margin, and retrains it."}),b.jsxs("div",{className:"mt-8 flex flex-col gap-3 sm:flex-row",children:[b.jsx("input",{value:s,onChange:m=>e(m.target.value),disabled:o,maxLength:300,placeholder:"Anything to focus on? e.g. slipping while turning",className:"flex-1 rounded-full border border-line bg-panel px-5 py-3 text-[15px] outline-none placeholder:text-faint focus:border-white/25"}),b.jsxs("button",{onClick:h,disabled:o,className:"flex items-center justify-center gap-2 rounded-full bg-ember px-6 py-3 text-[15px] font-medium text-black transition-opacity hover:opacity-90 disabled:opacity-40",children:[o?"Investigating…":"Start"," ",!o&&b.jsx(ho,{size:16})]})]}),d&&b.jsx("p",{className:"mt-3 text-sm text-ember",children:d})]}),t.length>0&&b.jsxs("ol",{className:"relative space-y-6 border-l border-line pb-4 pl-7",children:[t.map((m,g)=>b.jsx(Ty,{e:m},g)),o&&b.jsxs("li",{className:"text-sm text-faint",children:[b.jsx("span",{className:"blink text-ember",children:"●"})," working"]}),b.jsx("div",{ref:f})]})]})}function _n({tone:s="bg-line"}){return b.jsx("i",{className:`absolute -left-[32px] mt-[9px] block size-[7px] rounded-full ${s}`})}function Ty({e:s}){switch(s.stage){case"agent_start":return b.jsxs("li",{className:"relative rise",children:[b.jsx(_n,{}),b.jsxs("p",{className:"font-mono text-xs text-faint",children:["red-teaming ",s.version,s.goal?` · ${s.goal}`:""]})]});case"say":return b.jsxs("li",{className:"relative rise",children:[b.jsx(_n,{tone:"bg-ink"}),b.jsx("p",{className:"text-[17px] leading-relaxed",children:s.text})]});case"tool_call":return s.tool==="test_hypothesis"?b.jsxs("li",{className:"relative rise",children:[b.jsx(_n,{tone:"bg-ember/50"}),b.jsxs("p",{className:"text-[15px] text-mute",children:[b.jsx("span",{className:"text-faint",children:"Hypothesis · "}),s.args.hypothesis]})]}):s.tool==="watch"?b.jsxs("li",{className:"relative rise",children:[b.jsx(_n,{}),b.jsx("p",{className:"font-mono text-xs text-faint",children:"muse spark is watching the clip"})]}):s.tool==="measure_margin"?b.jsxs("li",{className:"relative rise",children:[b.jsx(_n,{}),b.jsxs("p",{className:"font-mono text-xs text-faint",children:["measuring the margin on ",s.args.condition]})]}):s.tool==="patch"?b.jsxs("li",{className:"relative rise",children:[b.jsx(_n,{tone:"bg-acid/60"}),b.jsxs("p",{className:"font-mono text-xs text-faint",children:["retraining on ",s.args.failure_ids.length," failure",s.args.failure_ids.length>1?"s":""]})]}):null;case"searching":return b.jsxs("li",{className:"relative rise",children:[b.jsx(_n,{}),b.jsxs("p",{className:"font-mono text-xs text-faint",children:["searching ",s.free_params," free parameter",s.free_params===1?"":"s"," for the most plausible fall"]})]});case"tool_result":return s.tool==="test_hypothesis"&&!s.result.broke_robot?b.jsxs("li",{className:"relative rise",children:[b.jsx(_n,{tone:"bg-acid"}),b.jsx("p",{className:"text-[15px] text-mute",children:s.result.error?"That program didn't compile; retrying.":b.jsxs(b.Fragment,{children:["It held (",kn(s.result.fall_rate)," falls). ",b.jsx("span",{className:"text-faint",children:"Refuted."})]})})]}):null;case"failure":return b.jsxs("li",{className:"relative rise",children:[b.jsx(_n,{tone:"bg-ember"}),b.jsxs("p",{className:"text-[15px]",children:[b.jsx("span",{className:"text-ember",children:"It fell"})," ",b.jsxs("span",{className:"text-mute",children:["in ",kn(s.fall_rate)," of tries."]})]}),b.jsx("video",{src:s.clip,autoPlay:!0,muted:!0,loop:!0,playsInline:!0,className:"mt-3 w-full rounded-xl border border-line"})]});case"diagnosis":return b.jsxs("li",{className:"relative rise",children:[b.jsx(_n,{tone:"bg-peri"}),b.jsxs("blockquote",{className:"border-l-2 border-peri/60 pl-4 text-[15px] leading-relaxed text-mute",children:[b.jsxs("span",{className:"text-ink",children:[s.mode,"."]})," ",s.what_happened]})]});case"margin":return b.jsxs("li",{className:"relative rise",children:[b.jsx(_n,{}),b.jsxs("p",{className:"text-[15px] text-mute",children:["Falls begin at ",b.jsx("span",{className:"font-mono text-ink",children:ec(s.starts_falling_at)})," ",b.jsxs("span",{className:"text-faint",children:["(",s.condition,", nominal ",ec(s.nominal),")"]})]}),b.jsx("div",{className:"mt-3 flex h-10 max-w-sm items-end gap-1",children:s.curve.map((e,t)=>b.jsx("i",{style:{height:`${Math.max(6,e.fall_rate*100)}%`},className:`block flex-1 ${e.fall_rate>=.5?"bg-ember":"bg-white/15"}`},t))})]});case"progress":return b.jsxs("li",{className:"relative",children:[b.jsx(_n,{}),b.jsx("div",{className:"h-px max-w-sm overflow-hidden bg-line",children:b.jsx("div",{className:"h-full bg-ember transition-all",style:{width:kn(s.step/s.total)}})})]});case"verified":return b.jsxs("li",{className:"relative rise",children:[b.jsx(_n,{tone:"bg-acid"}),b.jsxs("p",{className:"flex items-center gap-2 text-[15px]",children:[b.jsx(cf,{size:16,className:"text-acid"})," ",s.version," passed the regression gate and is live."]})]});case"rejected":return b.jsxs("li",{className:"relative rise",children:[b.jsx(_n,{}),b.jsx("p",{className:"text-[15px] text-mute",children:"The retrained robot failed the regression gate, so the old one stays."})]});case"done":return s.summary?b.jsxs("li",{className:"relative rise",children:[b.jsx(_n,{tone:"bg-ink"}),b.jsx("p",{className:"whitespace-pre-line text-[15px] leading-relaxed text-mute",children:s.summary})]}):null;case"failed":return b.jsxs("li",{className:"relative rise",children:[b.jsx(_n,{tone:"bg-ember"}),b.jsx("p",{className:"text-sm text-ember",children:s.error})]});default:return null}}function ec(s){if(s==null)return"never";if(Array.isArray(s)){if(s.every(t=>t===s[0]))return ec(s[0]);const e=s.filter(t=>Math.abs(t)>1e-6);return e.length===1?ec(e[0]):`[${s.map(t=>+t.toFixed(2)).join(", ")}]`}return String(typeof s=="number"?+s.toFixed(2):s)}function vv({onText:s,onVoice:e,onFile:t,busy:r,examples:o=[],accent:l="bg-ember"}){const[d,u]=he.useState(""),[f,h]=he.useState(0),[m,g]=he.useState(null),y=he.useRef(null),S=he.useRef(null);he.useEffect(()=>{if(o.length<2)return;const _=setInterval(()=>h(v=>(v+1)%o.length),3200);return()=>clearInterval(_)},[o.length]),he.useEffect(()=>{const _=y.current;_&&(_.style.height="0px",_.style.height=`${Math.min(_.scrollHeight,200)}px`)},[d]);const E=()=>{const _=d.trim();_.length>=3&&!r&&s(_)},M=async()=>{if(m){m.stop();return}try{const _=await navigator.mediaDevices.getUserMedia({audio:!0}),v=new MediaRecorder(_),T=[];v.ondataavailable=A=>T.push(A.data),v.onstop=async()=>{_.getTracks().forEach(A=>A.stop()),g(null),e==null||e(await ly(new Blob(T)))},v.start(),g(v)}catch{}};return b.jsxs("div",{className:`rounded-2xl border bg-panel transition-colors ${m?"border-ember/60":"border-line focus-within:border-white/25"}`,children:[b.jsx("textarea",{ref:y,rows:1,value:d,disabled:r,onChange:_=>u(_.target.value),onKeyDown:_=>{_.key==="Enter"&&!_.shiftKey&&(_.preventDefault(),E())},placeholder:m?"Listening… tap stop when you're done":o[f]||"Describe an attack",className:"block w-full resize-none bg-transparent px-5 pt-4 pb-2 text-[17px] leading-relaxed text-ink outline-none placeholder:text-faint disabled:opacity-60"}),b.jsxs("div",{className:"flex items-center gap-1 px-3 pb-3",children:[e&&b.jsx("button",{onClick:M,disabled:r,title:m?"Stop":"Say it",className:`grid size-9 place-items-center rounded-full transition-colors ${m?"bg-ember/15 text-ember":"text-mute hover:bg-white/5 hover:text-ink"}`,children:m?b.jsx(My,{size:14,fill:"currentColor"}):b.jsx(xy,{size:17,strokeWidth:1.6})}),t&&b.jsxs(b.Fragment,{children:[b.jsx("button",{onClick:()=>{var _;return(_=S.current)==null?void 0:_.click()},disabled:r,title:"A photo of a real place",className:"grid size-9 place-items-center rounded-full text-mute transition-colors hover:bg-white/5 hover:text-ink",children:b.jsx(gy,{size:17,strokeWidth:1.6})}),b.jsx("input",{ref:S,type:"file",accept:"image/*,video/*",hidden:!0,onChange:_=>{var T;const v=(T=_.target.files)==null?void 0:T[0];v&&t(v),_.target.value=""}})]}),b.jsx("button",{onClick:E,disabled:r||d.trim().length<3,className:`ml-auto grid size-9 place-items-center rounded-full text-black transition-all disabled:opacity-25 ${l}`,children:r?b.jsx(vy,{size:17,className:"animate-spin"}):b.jsx(my,{size:18,strokeWidth:2})})]})]})}const fm={bank:"Building lessons",training:"Retraining",gating:"Checking for regressions",verified:"Live",rejected:"Kept the old robot"};function _v({job:s,onDone:e}){const[t,r]=he.useState("bank"),[o,l]=he.useState(0),[d,u]=he.useState(null),[f,h]=he.useState(""),[m,g]=he.useState(null);he.useEffect(()=>{let E=!0;return lf(s,M=>{E&&(M.stage==="started"&&g([M.parent,M.version]),M.stage in fm&&r(M.stage),M.stage==="progress"&&(r("training"),l(Math.min(1,M.step/M.total))),M.stage==="trained"&&l(1),(M.stage==="verified"||M.stage==="rejected")&&u(M.gate),M.stage==="failed"&&h(M.error||"failed"))}).then(M=>E&&(e==null?void 0:e(M))),()=>{E=!1}},[s]);const y=t==="verified"||t==="rejected",S=d&&[["Fixed",d.checks["fixes the attack"],`${kn(d.suites.attacks.before)} → ${kn(d.suites.attacks.after)} falls`],["Still walks",d.checks["still walks"],`${d.suites.nominal.progress_after.toFixed(1)} m in 5 s`],["Nothing else broke",d.checks["no regressions"],`${kn(d.suites.gauntlet.before)} → ${kn(d.suites.gauntlet.after)} on 52 scenarios`]];return b.jsxs("div",{className:"rise rounded-2xl border border-line bg-panel p-5",children:[b.jsxs("div",{className:"flex items-baseline justify-between gap-4",children:[b.jsxs("p",{className:"text-[15px]",children:[f?b.jsx("span",{className:"text-ember",children:f}):fm[t],!y&&!f&&b.jsx("span",{className:"blink text-ember",children:" ●"})]}),m&&b.jsxs("span",{className:"font-mono text-xs text-faint",children:[m[0]," → ",t==="rejected"?m[0]:m[1]]})]}),b.jsx("div",{className:"mt-4 h-px overflow-hidden bg-line",children:b.jsx("div",{className:"h-full bg-ember transition-[width] duration-700 ease-out-soft",style:{width:`${(y?1:t==="bank"?.04:t==="gating"?1:o)*100}%`}})}),S&&b.jsx("div",{className:"mt-5 grid gap-3 sm:grid-cols-3",children:S.map(([E,M,_])=>b.jsxs("div",{className:"flex gap-2.5",children:[M?b.jsx(cf,{size:16,className:"mt-0.5 shrink-0 text-acid"}):b.jsx(Ey,{size:16,className:"mt-0.5 shrink-0 text-ember"}),b.jsxs("div",{children:[b.jsx("p",{className:"text-sm",children:E}),b.jsx("p",{className:"text-xs text-faint",children:_})]})]},E))})]})}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const uf="160",Ns={ROTATE:0,DOLLY:1,PAN:2},Ds={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Ay=0,hm=1,by=2,xv=1,yv=2,Gi=3,Pr=0,Cn=1,wi=2,br=0,no=1,pm=2,mm=3,gm=4,Cy=5,Jr=100,Ry=101,Py=102,vm=103,_m=104,Ly=200,Ny=201,Dy=202,Uy=203,$d=204,Yd=205,Iy=206,Oy=207,Fy=208,ky=209,zy=210,By=211,Hy=212,Vy=213,Gy=214,Wy=0,jy=1,Xy=2,tc=3,$y=4,Yy=5,qy=6,Ky=7,Sv=0,Zy=1,Jy=2,Cr=0,Qy=1,eS=2,tS=3,Mv=4,nS=5,iS=6,Ev=300,ao=301,lo=302,qd=303,Kd=304,mc=306,nc=1e3,mi=1001,Zd=1002,bn=1003,xm=1004,sd=1005,ii=1006,rS=1007,la=1008,Rr=1009,sS=1010,oS=1011,df=1012,wv=1013,Er=1014,wr=1015,ca=1016,Tv=1017,Av=1018,ts=1020,aS=1021,gi=1023,lS=1024,cS=1025,ns=1026,co=1027,uS=1028,bv=1029,dS=1030,Cv=1031,Rv=1033,od=33776,ad=33777,ld=33778,cd=33779,ym=35840,Sm=35841,Mm=35842,Em=35843,Pv=36196,wm=37492,Tm=37496,Am=37808,bm=37809,Cm=37810,Rm=37811,Pm=37812,Lm=37813,Nm=37814,Dm=37815,Um=37816,Im=37817,Om=37818,Fm=37819,km=37820,zm=37821,ud=36492,Bm=36494,Hm=36495,fS=36283,Vm=36284,Gm=36285,Wm=36286,Lv=3e3,is=3001,hS=3200,pS=3201,Nv=0,mS=1,si="",un="srgb",ji="srgb-linear",ff="display-p3",gc="display-p3-linear",ic="linear",Ot="srgb",rc="rec709",sc="p3",Us=7680,jm=519,gS=512,vS=513,_S=514,Dv=515,xS=516,yS=517,SS=518,MS=519,Xm=35044,$m="300 es",Jd=1035,Wi=2e3,oc=2001;class ls{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const r=this._listeners;r[e]===void 0&&(r[e]=[]),r[e].indexOf(t)===-1&&r[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const r=this._listeners;return r[e]!==void 0&&r[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const o=this._listeners[e];if(o!==void 0){const l=o.indexOf(t);l!==-1&&o.splice(l,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const r=this._listeners[e.type];if(r!==void 0){e.target=this;const o=r.slice(0);for(let l=0,d=o.length;l<d;l++)o[l].call(this,e);e.target=null}}}const xn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Ym=1234567;const io=Math.PI/180,ua=180/Math.PI;function po(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(xn[s&255]+xn[s>>8&255]+xn[s>>16&255]+xn[s>>24&255]+"-"+xn[e&255]+xn[e>>8&255]+"-"+xn[e>>16&15|64]+xn[e>>24&255]+"-"+xn[t&63|128]+xn[t>>8&255]+"-"+xn[t>>16&255]+xn[t>>24&255]+xn[r&255]+xn[r>>8&255]+xn[r>>16&255]+xn[r>>24&255]).toLowerCase()}function tn(s,e,t){return Math.max(e,Math.min(t,s))}function hf(s,e){return(s%e+e)%e}function ES(s,e,t,r,o){return r+(s-e)*(o-r)/(t-e)}function wS(s,e,t){return s!==e?(t-s)/(e-s):0}function na(s,e,t){return(1-t)*s+t*e}function TS(s,e,t,r){return na(s,e,1-Math.exp(-t*r))}function AS(s,e=1){return e-Math.abs(hf(s,e*2)-e)}function bS(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function CS(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function RS(s,e){return s+Math.floor(Math.random()*(e-s+1))}function PS(s,e){return s+Math.random()*(e-s)}function LS(s){return s*(.5-Math.random())}function NS(s){s!==void 0&&(Ym=s);let e=Ym+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function DS(s){return s*io}function US(s){return s*ua}function Qd(s){return(s&s-1)===0&&s!==0}function IS(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function ac(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function OS(s,e,t,r,o){const l=Math.cos,d=Math.sin,u=l(t/2),f=d(t/2),h=l((e+r)/2),m=d((e+r)/2),g=l((e-r)/2),y=d((e-r)/2),S=l((r-e)/2),E=d((r-e)/2);switch(o){case"XYX":s.set(u*m,f*g,f*y,u*h);break;case"YZY":s.set(f*y,u*m,f*g,u*h);break;case"ZXZ":s.set(f*g,f*y,u*m,u*h);break;case"XZX":s.set(u*m,f*E,f*S,u*h);break;case"YXY":s.set(f*S,u*m,f*E,u*h);break;case"ZYZ":s.set(f*E,f*S,u*m,u*h);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+o)}}function Qs(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Tn(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const es={DEG2RAD:io,RAD2DEG:ua,generateUUID:po,clamp:tn,euclideanModulo:hf,mapLinear:ES,inverseLerp:wS,lerp:na,damp:TS,pingpong:AS,smoothstep:bS,smootherstep:CS,randInt:RS,randFloat:PS,randFloatSpread:LS,seededRandom:NS,degToRad:DS,radToDeg:US,isPowerOfTwo:Qd,ceilPowerOfTwo:IS,floorPowerOfTwo:ac,setQuaternionFromProperEuler:OS,normalize:Tn,denormalize:Qs};class Be{constructor(e=0,t=0){Be.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,r=this.y,o=e.elements;return this.x=o[0]*t+o[3]*r+o[6],this.y=o[1]*t+o[4]*r+o[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Math.max(e,Math.min(t,r)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const r=this.dot(e)/t;return Math.acos(tn(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,r=this.y-e.y;return t*t+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const r=Math.cos(t),o=Math.sin(t),l=this.x-e.x,d=this.y-e.y;return this.x=l*r-d*o+e.x,this.y=l*o+d*r+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class yt{constructor(e,t,r,o,l,d,u,f,h){yt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,r,o,l,d,u,f,h)}set(e,t,r,o,l,d,u,f,h){const m=this.elements;return m[0]=e,m[1]=o,m[2]=u,m[3]=t,m[4]=l,m[5]=f,m[6]=r,m[7]=d,m[8]=h,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,r=e.elements;return t[0]=r[0],t[1]=r[1],t[2]=r[2],t[3]=r[3],t[4]=r[4],t[5]=r[5],t[6]=r[6],t[7]=r[7],t[8]=r[8],this}extractBasis(e,t,r){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),r.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const r=e.elements,o=t.elements,l=this.elements,d=r[0],u=r[3],f=r[6],h=r[1],m=r[4],g=r[7],y=r[2],S=r[5],E=r[8],M=o[0],_=o[3],v=o[6],T=o[1],A=o[4],P=o[7],F=o[2],D=o[5],I=o[8];return l[0]=d*M+u*T+f*F,l[3]=d*_+u*A+f*D,l[6]=d*v+u*P+f*I,l[1]=h*M+m*T+g*F,l[4]=h*_+m*A+g*D,l[7]=h*v+m*P+g*I,l[2]=y*M+S*T+E*F,l[5]=y*_+S*A+E*D,l[8]=y*v+S*P+E*I,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],r=e[1],o=e[2],l=e[3],d=e[4],u=e[5],f=e[6],h=e[7],m=e[8];return t*d*m-t*u*h-r*l*m+r*u*f+o*l*h-o*d*f}invert(){const e=this.elements,t=e[0],r=e[1],o=e[2],l=e[3],d=e[4],u=e[5],f=e[6],h=e[7],m=e[8],g=m*d-u*h,y=u*f-m*l,S=h*l-d*f,E=t*g+r*y+o*S;if(E===0)return this.set(0,0,0,0,0,0,0,0,0);const M=1/E;return e[0]=g*M,e[1]=(o*h-m*r)*M,e[2]=(u*r-o*d)*M,e[3]=y*M,e[4]=(m*t-o*f)*M,e[5]=(o*l-u*t)*M,e[6]=S*M,e[7]=(r*f-h*t)*M,e[8]=(d*t-r*l)*M,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,r,o,l,d,u){const f=Math.cos(l),h=Math.sin(l);return this.set(r*f,r*h,-r*(f*d+h*u)+d+e,-o*h,o*f,-o*(-h*d+f*u)+u+t,0,0,1),this}scale(e,t){return this.premultiply(dd.makeScale(e,t)),this}rotate(e){return this.premultiply(dd.makeRotation(-e)),this}translate(e,t){return this.premultiply(dd.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,-r,0,r,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,r=e.elements;for(let o=0;o<9;o++)if(t[o]!==r[o])return!1;return!0}fromArray(e,t=0){for(let r=0;r<9;r++)this.elements[r]=e[r+t];return this}toArray(e=[],t=0){const r=this.elements;return e[t]=r[0],e[t+1]=r[1],e[t+2]=r[2],e[t+3]=r[3],e[t+4]=r[4],e[t+5]=r[5],e[t+6]=r[6],e[t+7]=r[7],e[t+8]=r[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const dd=new yt;function Uv(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function lc(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function FS(){const s=lc("canvas");return s.style.display="block",s}const qm={};function ia(s){s in qm||(qm[s]=!0,console.warn(s))}const Km=new yt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Zm=new yt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Ml={[ji]:{transfer:ic,primaries:rc,toReference:s=>s,fromReference:s=>s},[un]:{transfer:Ot,primaries:rc,toReference:s=>s.convertSRGBToLinear(),fromReference:s=>s.convertLinearToSRGB()},[gc]:{transfer:ic,primaries:sc,toReference:s=>s.applyMatrix3(Zm),fromReference:s=>s.applyMatrix3(Km)},[ff]:{transfer:Ot,primaries:sc,toReference:s=>s.convertSRGBToLinear().applyMatrix3(Zm),fromReference:s=>s.applyMatrix3(Km).convertLinearToSRGB()}},kS=new Set([ji,gc]),Lt={enabled:!0,_workingColorSpace:ji,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(s){if(!kS.has(s))throw new Error(`Unsupported working color space, "${s}".`);this._workingColorSpace=s},convert:function(s,e,t){if(this.enabled===!1||e===t||!e||!t)return s;const r=Ml[e].toReference,o=Ml[t].fromReference;return o(r(s))},fromWorkingColorSpace:function(s,e){return this.convert(s,this._workingColorSpace,e)},toWorkingColorSpace:function(s,e){return this.convert(s,e,this._workingColorSpace)},getPrimaries:function(s){return Ml[s].primaries},getTransfer:function(s){return s===si?ic:Ml[s].transfer}};function ro(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function fd(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let Is;class Iv{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Is===void 0&&(Is=lc("canvas")),Is.width=e.width,Is.height=e.height;const r=Is.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),t=Is}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=lc("canvas");t.width=e.width,t.height=e.height;const r=t.getContext("2d");r.drawImage(e,0,0,e.width,e.height);const o=r.getImageData(0,0,e.width,e.height),l=o.data;for(let d=0;d<l.length;d++)l[d]=ro(l[d]/255)*255;return r.putImageData(o,0,0),t}else if(e.data){const t=e.data.slice(0);for(let r=0;r<t.length;r++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[r]=Math.floor(ro(t[r]/255)*255):t[r]=ro(t[r]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let zS=0;class Ov{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:zS++}),this.uuid=po(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const r={uuid:this.uuid,url:""},o=this.data;if(o!==null){let l;if(Array.isArray(o)){l=[];for(let d=0,u=o.length;d<u;d++)o[d].isDataTexture?l.push(hd(o[d].image)):l.push(hd(o[d]))}else l=hd(o);r.url=l}return t||(e.images[this.uuid]=r),r}}function hd(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Iv.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let BS=0;class zn extends ls{constructor(e=zn.DEFAULT_IMAGE,t=zn.DEFAULT_MAPPING,r=mi,o=mi,l=ii,d=la,u=gi,f=Rr,h=zn.DEFAULT_ANISOTROPY,m=si){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:BS++}),this.uuid=po(),this.name="",this.source=new Ov(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=r,this.wrapT=o,this.magFilter=l,this.minFilter=d,this.anisotropy=h,this.format=u,this.internalFormat=null,this.type=f,this.offset=new Be(0,0),this.repeat=new Be(1,1),this.center=new Be(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new yt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof m=="string"?this.colorSpace=m:(ia("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=m===is?un:si),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const r={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),t||(e.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ev)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case nc:e.x=e.x-Math.floor(e.x);break;case mi:e.x=e.x<0?0:1;break;case Zd:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case nc:e.y=e.y-Math.floor(e.y);break;case mi:e.y=e.y<0?0:1;break;case Zd:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return ia("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===un?is:Lv}set encoding(e){ia("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===is?un:si}}zn.DEFAULT_IMAGE=null;zn.DEFAULT_MAPPING=Ev;zn.DEFAULT_ANISOTROPY=1;class Bt{constructor(e=0,t=0,r=0,o=1){Bt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=r,this.w=o}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,r,o){return this.x=e,this.y=t,this.z=r,this.w=o,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,r=this.y,o=this.z,l=this.w,d=e.elements;return this.x=d[0]*t+d[4]*r+d[8]*o+d[12]*l,this.y=d[1]*t+d[5]*r+d[9]*o+d[13]*l,this.z=d[2]*t+d[6]*r+d[10]*o+d[14]*l,this.w=d[3]*t+d[7]*r+d[11]*o+d[15]*l,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,r,o,l;const f=e.elements,h=f[0],m=f[4],g=f[8],y=f[1],S=f[5],E=f[9],M=f[2],_=f[6],v=f[10];if(Math.abs(m-y)<.01&&Math.abs(g-M)<.01&&Math.abs(E-_)<.01){if(Math.abs(m+y)<.1&&Math.abs(g+M)<.1&&Math.abs(E+_)<.1&&Math.abs(h+S+v-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const A=(h+1)/2,P=(S+1)/2,F=(v+1)/2,D=(m+y)/4,I=(g+M)/4,ie=(E+_)/4;return A>P&&A>F?A<.01?(r=0,o=.707106781,l=.707106781):(r=Math.sqrt(A),o=D/r,l=I/r):P>F?P<.01?(r=.707106781,o=0,l=.707106781):(o=Math.sqrt(P),r=D/o,l=ie/o):F<.01?(r=.707106781,o=.707106781,l=0):(l=Math.sqrt(F),r=I/l,o=ie/l),this.set(r,o,l,t),this}let T=Math.sqrt((_-E)*(_-E)+(g-M)*(g-M)+(y-m)*(y-m));return Math.abs(T)<.001&&(T=1),this.x=(_-E)/T,this.y=(g-M)/T,this.z=(y-m)/T,this.w=Math.acos((h+S+v-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Math.max(e,Math.min(t,r)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this.z=e.z+(t.z-e.z)*r,this.w=e.w+(t.w-e.w)*r,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class HS extends ls{constructor(e=1,t=1,r={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Bt(0,0,e,t),this.scissorTest=!1,this.viewport=new Bt(0,0,e,t);const o={width:e,height:t,depth:1};r.encoding!==void 0&&(ia("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),r.colorSpace=r.encoding===is?un:si),r=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ii,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},r),this.texture=new zn(o,r.mapping,r.wrapS,r.wrapT,r.magFilter,r.minFilter,r.format,r.type,r.anisotropy,r.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=r.generateMipmaps,this.texture.internalFormat=r.internalFormat,this.depthBuffer=r.depthBuffer,this.stencilBuffer=r.stencilBuffer,this.depthTexture=r.depthTexture,this.samples=r.samples}setSize(e,t,r=1){(this.width!==e||this.height!==t||this.depth!==r)&&(this.width=e,this.height=t,this.depth=r,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=r,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Ov(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class os extends HS{constructor(e=1,t=1,r={}){super(e,t,r),this.isWebGLRenderTarget=!0}}class Fv extends zn{constructor(e=null,t=1,r=1,o=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:r,depth:o},this.magFilter=bn,this.minFilter=bn,this.wrapR=mi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class VS extends zn{constructor(e=null,t=1,r=1,o=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:r,depth:o},this.magFilter=bn,this.minFilter=bn,this.wrapR=mi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Xi{constructor(e=0,t=0,r=0,o=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=r,this._w=o}static slerpFlat(e,t,r,o,l,d,u){let f=r[o+0],h=r[o+1],m=r[o+2],g=r[o+3];const y=l[d+0],S=l[d+1],E=l[d+2],M=l[d+3];if(u===0){e[t+0]=f,e[t+1]=h,e[t+2]=m,e[t+3]=g;return}if(u===1){e[t+0]=y,e[t+1]=S,e[t+2]=E,e[t+3]=M;return}if(g!==M||f!==y||h!==S||m!==E){let _=1-u;const v=f*y+h*S+m*E+g*M,T=v>=0?1:-1,A=1-v*v;if(A>Number.EPSILON){const F=Math.sqrt(A),D=Math.atan2(F,v*T);_=Math.sin(_*D)/F,u=Math.sin(u*D)/F}const P=u*T;if(f=f*_+y*P,h=h*_+S*P,m=m*_+E*P,g=g*_+M*P,_===1-u){const F=1/Math.sqrt(f*f+h*h+m*m+g*g);f*=F,h*=F,m*=F,g*=F}}e[t]=f,e[t+1]=h,e[t+2]=m,e[t+3]=g}static multiplyQuaternionsFlat(e,t,r,o,l,d){const u=r[o],f=r[o+1],h=r[o+2],m=r[o+3],g=l[d],y=l[d+1],S=l[d+2],E=l[d+3];return e[t]=u*E+m*g+f*S-h*y,e[t+1]=f*E+m*y+h*g-u*S,e[t+2]=h*E+m*S+u*y-f*g,e[t+3]=m*E-u*g-f*y-h*S,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,r,o){return this._x=e,this._y=t,this._z=r,this._w=o,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const r=e._x,o=e._y,l=e._z,d=e._order,u=Math.cos,f=Math.sin,h=u(r/2),m=u(o/2),g=u(l/2),y=f(r/2),S=f(o/2),E=f(l/2);switch(d){case"XYZ":this._x=y*m*g+h*S*E,this._y=h*S*g-y*m*E,this._z=h*m*E+y*S*g,this._w=h*m*g-y*S*E;break;case"YXZ":this._x=y*m*g+h*S*E,this._y=h*S*g-y*m*E,this._z=h*m*E-y*S*g,this._w=h*m*g+y*S*E;break;case"ZXY":this._x=y*m*g-h*S*E,this._y=h*S*g+y*m*E,this._z=h*m*E+y*S*g,this._w=h*m*g-y*S*E;break;case"ZYX":this._x=y*m*g-h*S*E,this._y=h*S*g+y*m*E,this._z=h*m*E-y*S*g,this._w=h*m*g+y*S*E;break;case"YZX":this._x=y*m*g+h*S*E,this._y=h*S*g+y*m*E,this._z=h*m*E-y*S*g,this._w=h*m*g-y*S*E;break;case"XZY":this._x=y*m*g-h*S*E,this._y=h*S*g-y*m*E,this._z=h*m*E+y*S*g,this._w=h*m*g+y*S*E;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+d)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const r=t/2,o=Math.sin(r);return this._x=e.x*o,this._y=e.y*o,this._z=e.z*o,this._w=Math.cos(r),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,r=t[0],o=t[4],l=t[8],d=t[1],u=t[5],f=t[9],h=t[2],m=t[6],g=t[10],y=r+u+g;if(y>0){const S=.5/Math.sqrt(y+1);this._w=.25/S,this._x=(m-f)*S,this._y=(l-h)*S,this._z=(d-o)*S}else if(r>u&&r>g){const S=2*Math.sqrt(1+r-u-g);this._w=(m-f)/S,this._x=.25*S,this._y=(o+d)/S,this._z=(l+h)/S}else if(u>g){const S=2*Math.sqrt(1+u-r-g);this._w=(l-h)/S,this._x=(o+d)/S,this._y=.25*S,this._z=(f+m)/S}else{const S=2*Math.sqrt(1+g-r-u);this._w=(d-o)/S,this._x=(l+h)/S,this._y=(f+m)/S,this._z=.25*S}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let r=e.dot(t)+1;return r<Number.EPSILON?(r=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=r):(this._x=0,this._y=-e.z,this._z=e.y,this._w=r)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=r),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(tn(this.dot(e),-1,1)))}rotateTowards(e,t){const r=this.angleTo(e);if(r===0)return this;const o=Math.min(1,t/r);return this.slerp(e,o),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const r=e._x,o=e._y,l=e._z,d=e._w,u=t._x,f=t._y,h=t._z,m=t._w;return this._x=r*m+d*u+o*h-l*f,this._y=o*m+d*f+l*u-r*h,this._z=l*m+d*h+r*f-o*u,this._w=d*m-r*u-o*f-l*h,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const r=this._x,o=this._y,l=this._z,d=this._w;let u=d*e._w+r*e._x+o*e._y+l*e._z;if(u<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,u=-u):this.copy(e),u>=1)return this._w=d,this._x=r,this._y=o,this._z=l,this;const f=1-u*u;if(f<=Number.EPSILON){const S=1-t;return this._w=S*d+t*this._w,this._x=S*r+t*this._x,this._y=S*o+t*this._y,this._z=S*l+t*this._z,this.normalize(),this}const h=Math.sqrt(f),m=Math.atan2(h,u),g=Math.sin((1-t)*m)/h,y=Math.sin(t*m)/h;return this._w=d*g+this._w*y,this._x=r*g+this._x*y,this._y=o*g+this._y*y,this._z=l*g+this._z*y,this._onChangeCallback(),this}slerpQuaternions(e,t,r){return this.copy(e).slerp(t,r)}random(){const e=Math.random(),t=Math.sqrt(1-e),r=Math.sqrt(e),o=2*Math.PI*Math.random(),l=2*Math.PI*Math.random();return this.set(t*Math.cos(o),r*Math.sin(l),r*Math.cos(l),t*Math.sin(o))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class z{constructor(e=0,t=0,r=0){z.prototype.isVector3=!0,this.x=e,this.y=t,this.z=r}set(e,t,r){return r===void 0&&(r=this.z),this.x=e,this.y=t,this.z=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Jm.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Jm.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,r=this.y,o=this.z,l=e.elements;return this.x=l[0]*t+l[3]*r+l[6]*o,this.y=l[1]*t+l[4]*r+l[7]*o,this.z=l[2]*t+l[5]*r+l[8]*o,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,r=this.y,o=this.z,l=e.elements,d=1/(l[3]*t+l[7]*r+l[11]*o+l[15]);return this.x=(l[0]*t+l[4]*r+l[8]*o+l[12])*d,this.y=(l[1]*t+l[5]*r+l[9]*o+l[13])*d,this.z=(l[2]*t+l[6]*r+l[10]*o+l[14])*d,this}applyQuaternion(e){const t=this.x,r=this.y,o=this.z,l=e.x,d=e.y,u=e.z,f=e.w,h=2*(d*o-u*r),m=2*(u*t-l*o),g=2*(l*r-d*t);return this.x=t+f*h+d*g-u*m,this.y=r+f*m+u*h-l*g,this.z=o+f*g+l*m-d*h,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,r=this.y,o=this.z,l=e.elements;return this.x=l[0]*t+l[4]*r+l[8]*o,this.y=l[1]*t+l[5]*r+l[9]*o,this.z=l[2]*t+l[6]*r+l[10]*o,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Math.max(e,Math.min(t,r)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this.z=e.z+(t.z-e.z)*r,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const r=e.x,o=e.y,l=e.z,d=t.x,u=t.y,f=t.z;return this.x=o*f-l*u,this.y=l*d-r*f,this.z=r*u-o*d,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const r=e.dot(this)/t;return this.copy(e).multiplyScalar(r)}projectOnPlane(e){return pd.copy(this).projectOnVector(e),this.sub(pd)}reflect(e){return this.sub(pd.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const r=this.dot(e)/t;return Math.acos(tn(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,r=this.y-e.y,o=this.z-e.z;return t*t+r*r+o*o}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,r){const o=Math.sin(t)*e;return this.x=o*Math.sin(r),this.y=Math.cos(t)*e,this.z=o*Math.cos(r),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,r){return this.x=e*Math.sin(t),this.y=r,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),r=this.setFromMatrixColumn(e,1).length(),o=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=r,this.z=o,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,r=Math.sqrt(1-e**2);return this.x=r*Math.cos(t),this.y=r*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const pd=new z,Jm=new Xi;class ha{constructor(e=new z(1/0,1/0,1/0),t=new z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,r=e.length;t<r;t+=3)this.expandByPoint(fi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,r=e.count;t<r;t++)this.expandByPoint(fi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,r=e.length;t<r;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const r=fi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(r),this.max.copy(e).add(r),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const r=e.geometry;if(r!==void 0){const l=r.getAttribute("position");if(t===!0&&l!==void 0&&e.isInstancedMesh!==!0)for(let d=0,u=l.count;d<u;d++)e.isMesh===!0?e.getVertexPosition(d,fi):fi.fromBufferAttribute(l,d),fi.applyMatrix4(e.matrixWorld),this.expandByPoint(fi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),El.copy(e.boundingBox)):(r.boundingBox===null&&r.computeBoundingBox(),El.copy(r.boundingBox)),El.applyMatrix4(e.matrixWorld),this.union(El)}const o=e.children;for(let l=0,d=o.length;l<d;l++)this.expandByObject(o[l],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,fi),fi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,r;return e.normal.x>0?(t=e.normal.x*this.min.x,r=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,r=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,r+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,r+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,r+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,r+=e.normal.z*this.min.z),t<=-e.constant&&r>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Zo),wl.subVectors(this.max,Zo),Os.subVectors(e.a,Zo),Fs.subVectors(e.b,Zo),ks.subVectors(e.c,Zo),gr.subVectors(Fs,Os),vr.subVectors(ks,Fs),$r.subVectors(Os,ks);let t=[0,-gr.z,gr.y,0,-vr.z,vr.y,0,-$r.z,$r.y,gr.z,0,-gr.x,vr.z,0,-vr.x,$r.z,0,-$r.x,-gr.y,gr.x,0,-vr.y,vr.x,0,-$r.y,$r.x,0];return!md(t,Os,Fs,ks,wl)||(t=[1,0,0,0,1,0,0,0,1],!md(t,Os,Fs,ks,wl))?!1:(Tl.crossVectors(gr,vr),t=[Tl.x,Tl.y,Tl.z],md(t,Os,Fs,ks,wl))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,fi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(fi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ki[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ki[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ki[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ki[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ki[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ki[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ki[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ki[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ki),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const ki=[new z,new z,new z,new z,new z,new z,new z,new z],fi=new z,El=new ha,Os=new z,Fs=new z,ks=new z,gr=new z,vr=new z,$r=new z,Zo=new z,wl=new z,Tl=new z,Yr=new z;function md(s,e,t,r,o){for(let l=0,d=s.length-3;l<=d;l+=3){Yr.fromArray(s,l);const u=o.x*Math.abs(Yr.x)+o.y*Math.abs(Yr.y)+o.z*Math.abs(Yr.z),f=e.dot(Yr),h=t.dot(Yr),m=r.dot(Yr);if(Math.max(-Math.max(f,h,m),Math.min(f,h,m))>u)return!1}return!0}const GS=new ha,Jo=new z,gd=new z;class vc{constructor(e=new z,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const r=this.center;t!==void 0?r.copy(t):GS.setFromPoints(e).getCenter(r);let o=0;for(let l=0,d=e.length;l<d;l++)o=Math.max(o,r.distanceToSquared(e[l]));return this.radius=Math.sqrt(o),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const r=this.center.distanceToSquared(e);return t.copy(e),r>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Jo.subVectors(e,this.center);const t=Jo.lengthSq();if(t>this.radius*this.radius){const r=Math.sqrt(t),o=(r-this.radius)*.5;this.center.addScaledVector(Jo,o/r),this.radius+=o}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(gd.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Jo.copy(e.center).add(gd)),this.expandByPoint(Jo.copy(e.center).sub(gd))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const zi=new z,vd=new z,Al=new z,_r=new z,_d=new z,bl=new z,xd=new z;class pf{constructor(e=new z,t=new z(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,zi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const r=t.dot(this.direction);return r<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,r)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=zi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(zi.copy(this.origin).addScaledVector(this.direction,t),zi.distanceToSquared(e))}distanceSqToSegment(e,t,r,o){vd.copy(e).add(t).multiplyScalar(.5),Al.copy(t).sub(e).normalize(),_r.copy(this.origin).sub(vd);const l=e.distanceTo(t)*.5,d=-this.direction.dot(Al),u=_r.dot(this.direction),f=-_r.dot(Al),h=_r.lengthSq(),m=Math.abs(1-d*d);let g,y,S,E;if(m>0)if(g=d*f-u,y=d*u-f,E=l*m,g>=0)if(y>=-E)if(y<=E){const M=1/m;g*=M,y*=M,S=g*(g+d*y+2*u)+y*(d*g+y+2*f)+h}else y=l,g=Math.max(0,-(d*y+u)),S=-g*g+y*(y+2*f)+h;else y=-l,g=Math.max(0,-(d*y+u)),S=-g*g+y*(y+2*f)+h;else y<=-E?(g=Math.max(0,-(-d*l+u)),y=g>0?-l:Math.min(Math.max(-l,-f),l),S=-g*g+y*(y+2*f)+h):y<=E?(g=0,y=Math.min(Math.max(-l,-f),l),S=y*(y+2*f)+h):(g=Math.max(0,-(d*l+u)),y=g>0?l:Math.min(Math.max(-l,-f),l),S=-g*g+y*(y+2*f)+h);else y=d>0?-l:l,g=Math.max(0,-(d*y+u)),S=-g*g+y*(y+2*f)+h;return r&&r.copy(this.origin).addScaledVector(this.direction,g),o&&o.copy(vd).addScaledVector(Al,y),S}intersectSphere(e,t){zi.subVectors(e.center,this.origin);const r=zi.dot(this.direction),o=zi.dot(zi)-r*r,l=e.radius*e.radius;if(o>l)return null;const d=Math.sqrt(l-o),u=r-d,f=r+d;return f<0?null:u<0?this.at(f,t):this.at(u,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const r=-(this.origin.dot(e.normal)+e.constant)/t;return r>=0?r:null}intersectPlane(e,t){const r=this.distanceToPlane(e);return r===null?null:this.at(r,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let r,o,l,d,u,f;const h=1/this.direction.x,m=1/this.direction.y,g=1/this.direction.z,y=this.origin;return h>=0?(r=(e.min.x-y.x)*h,o=(e.max.x-y.x)*h):(r=(e.max.x-y.x)*h,o=(e.min.x-y.x)*h),m>=0?(l=(e.min.y-y.y)*m,d=(e.max.y-y.y)*m):(l=(e.max.y-y.y)*m,d=(e.min.y-y.y)*m),r>d||l>o||((l>r||isNaN(r))&&(r=l),(d<o||isNaN(o))&&(o=d),g>=0?(u=(e.min.z-y.z)*g,f=(e.max.z-y.z)*g):(u=(e.max.z-y.z)*g,f=(e.min.z-y.z)*g),r>f||u>o)||((u>r||r!==r)&&(r=u),(f<o||o!==o)&&(o=f),o<0)?null:this.at(r>=0?r:o,t)}intersectsBox(e){return this.intersectBox(e,zi)!==null}intersectTriangle(e,t,r,o,l){_d.subVectors(t,e),bl.subVectors(r,e),xd.crossVectors(_d,bl);let d=this.direction.dot(xd),u;if(d>0){if(o)return null;u=1}else if(d<0)u=-1,d=-d;else return null;_r.subVectors(this.origin,e);const f=u*this.direction.dot(bl.crossVectors(_r,bl));if(f<0)return null;const h=u*this.direction.dot(_d.cross(_r));if(h<0||f+h>d)return null;const m=-u*_r.dot(xd);return m<0?null:this.at(m/d,l)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ht{constructor(e,t,r,o,l,d,u,f,h,m,g,y,S,E,M,_){Ht.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,r,o,l,d,u,f,h,m,g,y,S,E,M,_)}set(e,t,r,o,l,d,u,f,h,m,g,y,S,E,M,_){const v=this.elements;return v[0]=e,v[4]=t,v[8]=r,v[12]=o,v[1]=l,v[5]=d,v[9]=u,v[13]=f,v[2]=h,v[6]=m,v[10]=g,v[14]=y,v[3]=S,v[7]=E,v[11]=M,v[15]=_,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ht().fromArray(this.elements)}copy(e){const t=this.elements,r=e.elements;return t[0]=r[0],t[1]=r[1],t[2]=r[2],t[3]=r[3],t[4]=r[4],t[5]=r[5],t[6]=r[6],t[7]=r[7],t[8]=r[8],t[9]=r[9],t[10]=r[10],t[11]=r[11],t[12]=r[12],t[13]=r[13],t[14]=r[14],t[15]=r[15],this}copyPosition(e){const t=this.elements,r=e.elements;return t[12]=r[12],t[13]=r[13],t[14]=r[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,r){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),r.setFromMatrixColumn(this,2),this}makeBasis(e,t,r){return this.set(e.x,t.x,r.x,0,e.y,t.y,r.y,0,e.z,t.z,r.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,r=e.elements,o=1/zs.setFromMatrixColumn(e,0).length(),l=1/zs.setFromMatrixColumn(e,1).length(),d=1/zs.setFromMatrixColumn(e,2).length();return t[0]=r[0]*o,t[1]=r[1]*o,t[2]=r[2]*o,t[3]=0,t[4]=r[4]*l,t[5]=r[5]*l,t[6]=r[6]*l,t[7]=0,t[8]=r[8]*d,t[9]=r[9]*d,t[10]=r[10]*d,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,r=e.x,o=e.y,l=e.z,d=Math.cos(r),u=Math.sin(r),f=Math.cos(o),h=Math.sin(o),m=Math.cos(l),g=Math.sin(l);if(e.order==="XYZ"){const y=d*m,S=d*g,E=u*m,M=u*g;t[0]=f*m,t[4]=-f*g,t[8]=h,t[1]=S+E*h,t[5]=y-M*h,t[9]=-u*f,t[2]=M-y*h,t[6]=E+S*h,t[10]=d*f}else if(e.order==="YXZ"){const y=f*m,S=f*g,E=h*m,M=h*g;t[0]=y+M*u,t[4]=E*u-S,t[8]=d*h,t[1]=d*g,t[5]=d*m,t[9]=-u,t[2]=S*u-E,t[6]=M+y*u,t[10]=d*f}else if(e.order==="ZXY"){const y=f*m,S=f*g,E=h*m,M=h*g;t[0]=y-M*u,t[4]=-d*g,t[8]=E+S*u,t[1]=S+E*u,t[5]=d*m,t[9]=M-y*u,t[2]=-d*h,t[6]=u,t[10]=d*f}else if(e.order==="ZYX"){const y=d*m,S=d*g,E=u*m,M=u*g;t[0]=f*m,t[4]=E*h-S,t[8]=y*h+M,t[1]=f*g,t[5]=M*h+y,t[9]=S*h-E,t[2]=-h,t[6]=u*f,t[10]=d*f}else if(e.order==="YZX"){const y=d*f,S=d*h,E=u*f,M=u*h;t[0]=f*m,t[4]=M-y*g,t[8]=E*g+S,t[1]=g,t[5]=d*m,t[9]=-u*m,t[2]=-h*m,t[6]=S*g+E,t[10]=y-M*g}else if(e.order==="XZY"){const y=d*f,S=d*h,E=u*f,M=u*h;t[0]=f*m,t[4]=-g,t[8]=h*m,t[1]=y*g+M,t[5]=d*m,t[9]=S*g-E,t[2]=E*g-S,t[6]=u*m,t[10]=M*g+y}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(WS,e,jS)}lookAt(e,t,r){const o=this.elements;return Wn.subVectors(e,t),Wn.lengthSq()===0&&(Wn.z=1),Wn.normalize(),xr.crossVectors(r,Wn),xr.lengthSq()===0&&(Math.abs(r.z)===1?Wn.x+=1e-4:Wn.z+=1e-4,Wn.normalize(),xr.crossVectors(r,Wn)),xr.normalize(),Cl.crossVectors(Wn,xr),o[0]=xr.x,o[4]=Cl.x,o[8]=Wn.x,o[1]=xr.y,o[5]=Cl.y,o[9]=Wn.y,o[2]=xr.z,o[6]=Cl.z,o[10]=Wn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const r=e.elements,o=t.elements,l=this.elements,d=r[0],u=r[4],f=r[8],h=r[12],m=r[1],g=r[5],y=r[9],S=r[13],E=r[2],M=r[6],_=r[10],v=r[14],T=r[3],A=r[7],P=r[11],F=r[15],D=o[0],I=o[4],ie=o[8],R=o[12],U=o[1],se=o[5],le=o[9],me=o[13],H=o[2],q=o[6],te=o[10],J=o[14],X=o[3],K=o[7],$=o[11],O=o[15];return l[0]=d*D+u*U+f*H+h*X,l[4]=d*I+u*se+f*q+h*K,l[8]=d*ie+u*le+f*te+h*$,l[12]=d*R+u*me+f*J+h*O,l[1]=m*D+g*U+y*H+S*X,l[5]=m*I+g*se+y*q+S*K,l[9]=m*ie+g*le+y*te+S*$,l[13]=m*R+g*me+y*J+S*O,l[2]=E*D+M*U+_*H+v*X,l[6]=E*I+M*se+_*q+v*K,l[10]=E*ie+M*le+_*te+v*$,l[14]=E*R+M*me+_*J+v*O,l[3]=T*D+A*U+P*H+F*X,l[7]=T*I+A*se+P*q+F*K,l[11]=T*ie+A*le+P*te+F*$,l[15]=T*R+A*me+P*J+F*O,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],r=e[4],o=e[8],l=e[12],d=e[1],u=e[5],f=e[9],h=e[13],m=e[2],g=e[6],y=e[10],S=e[14],E=e[3],M=e[7],_=e[11],v=e[15];return E*(+l*f*g-o*h*g-l*u*y+r*h*y+o*u*S-r*f*S)+M*(+t*f*S-t*h*y+l*d*y-o*d*S+o*h*m-l*f*m)+_*(+t*h*g-t*u*S-l*d*g+r*d*S+l*u*m-r*h*m)+v*(-o*u*m-t*f*g+t*u*y+o*d*g-r*d*y+r*f*m)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,r){const o=this.elements;return e.isVector3?(o[12]=e.x,o[13]=e.y,o[14]=e.z):(o[12]=e,o[13]=t,o[14]=r),this}invert(){const e=this.elements,t=e[0],r=e[1],o=e[2],l=e[3],d=e[4],u=e[5],f=e[6],h=e[7],m=e[8],g=e[9],y=e[10],S=e[11],E=e[12],M=e[13],_=e[14],v=e[15],T=g*_*h-M*y*h+M*f*S-u*_*S-g*f*v+u*y*v,A=E*y*h-m*_*h-E*f*S+d*_*S+m*f*v-d*y*v,P=m*M*h-E*g*h+E*u*S-d*M*S-m*u*v+d*g*v,F=E*g*f-m*M*f-E*u*y+d*M*y+m*u*_-d*g*_,D=t*T+r*A+o*P+l*F;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const I=1/D;return e[0]=T*I,e[1]=(M*y*l-g*_*l-M*o*S+r*_*S+g*o*v-r*y*v)*I,e[2]=(u*_*l-M*f*l+M*o*h-r*_*h-u*o*v+r*f*v)*I,e[3]=(g*f*l-u*y*l-g*o*h+r*y*h+u*o*S-r*f*S)*I,e[4]=A*I,e[5]=(m*_*l-E*y*l+E*o*S-t*_*S-m*o*v+t*y*v)*I,e[6]=(E*f*l-d*_*l-E*o*h+t*_*h+d*o*v-t*f*v)*I,e[7]=(d*y*l-m*f*l+m*o*h-t*y*h-d*o*S+t*f*S)*I,e[8]=P*I,e[9]=(E*g*l-m*M*l-E*r*S+t*M*S+m*r*v-t*g*v)*I,e[10]=(d*M*l-E*u*l+E*r*h-t*M*h-d*r*v+t*u*v)*I,e[11]=(m*u*l-d*g*l-m*r*h+t*g*h+d*r*S-t*u*S)*I,e[12]=F*I,e[13]=(m*M*o-E*g*o+E*r*y-t*M*y-m*r*_+t*g*_)*I,e[14]=(E*u*o-d*M*o-E*r*f+t*M*f+d*r*_-t*u*_)*I,e[15]=(d*g*o-m*u*o+m*r*f-t*g*f-d*r*y+t*u*y)*I,this}scale(e){const t=this.elements,r=e.x,o=e.y,l=e.z;return t[0]*=r,t[4]*=o,t[8]*=l,t[1]*=r,t[5]*=o,t[9]*=l,t[2]*=r,t[6]*=o,t[10]*=l,t[3]*=r,t[7]*=o,t[11]*=l,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],r=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],o=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,r,o))}makeTranslation(e,t,r){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,r,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),r=Math.sin(e);return this.set(1,0,0,0,0,t,-r,0,0,r,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,0,r,0,0,1,0,0,-r,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,-r,0,0,r,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const r=Math.cos(t),o=Math.sin(t),l=1-r,d=e.x,u=e.y,f=e.z,h=l*d,m=l*u;return this.set(h*d+r,h*u-o*f,h*f+o*u,0,h*u+o*f,m*u+r,m*f-o*d,0,h*f-o*u,m*f+o*d,l*f*f+r,0,0,0,0,1),this}makeScale(e,t,r){return this.set(e,0,0,0,0,t,0,0,0,0,r,0,0,0,0,1),this}makeShear(e,t,r,o,l,d){return this.set(1,r,l,0,e,1,d,0,t,o,1,0,0,0,0,1),this}compose(e,t,r){const o=this.elements,l=t._x,d=t._y,u=t._z,f=t._w,h=l+l,m=d+d,g=u+u,y=l*h,S=l*m,E=l*g,M=d*m,_=d*g,v=u*g,T=f*h,A=f*m,P=f*g,F=r.x,D=r.y,I=r.z;return o[0]=(1-(M+v))*F,o[1]=(S+P)*F,o[2]=(E-A)*F,o[3]=0,o[4]=(S-P)*D,o[5]=(1-(y+v))*D,o[6]=(_+T)*D,o[7]=0,o[8]=(E+A)*I,o[9]=(_-T)*I,o[10]=(1-(y+M))*I,o[11]=0,o[12]=e.x,o[13]=e.y,o[14]=e.z,o[15]=1,this}decompose(e,t,r){const o=this.elements;let l=zs.set(o[0],o[1],o[2]).length();const d=zs.set(o[4],o[5],o[6]).length(),u=zs.set(o[8],o[9],o[10]).length();this.determinant()<0&&(l=-l),e.x=o[12],e.y=o[13],e.z=o[14],hi.copy(this);const h=1/l,m=1/d,g=1/u;return hi.elements[0]*=h,hi.elements[1]*=h,hi.elements[2]*=h,hi.elements[4]*=m,hi.elements[5]*=m,hi.elements[6]*=m,hi.elements[8]*=g,hi.elements[9]*=g,hi.elements[10]*=g,t.setFromRotationMatrix(hi),r.x=l,r.y=d,r.z=u,this}makePerspective(e,t,r,o,l,d,u=Wi){const f=this.elements,h=2*l/(t-e),m=2*l/(r-o),g=(t+e)/(t-e),y=(r+o)/(r-o);let S,E;if(u===Wi)S=-(d+l)/(d-l),E=-2*d*l/(d-l);else if(u===oc)S=-d/(d-l),E=-d*l/(d-l);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+u);return f[0]=h,f[4]=0,f[8]=g,f[12]=0,f[1]=0,f[5]=m,f[9]=y,f[13]=0,f[2]=0,f[6]=0,f[10]=S,f[14]=E,f[3]=0,f[7]=0,f[11]=-1,f[15]=0,this}makeOrthographic(e,t,r,o,l,d,u=Wi){const f=this.elements,h=1/(t-e),m=1/(r-o),g=1/(d-l),y=(t+e)*h,S=(r+o)*m;let E,M;if(u===Wi)E=(d+l)*g,M=-2*g;else if(u===oc)E=l*g,M=-1*g;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+u);return f[0]=2*h,f[4]=0,f[8]=0,f[12]=-y,f[1]=0,f[5]=2*m,f[9]=0,f[13]=-S,f[2]=0,f[6]=0,f[10]=M,f[14]=-E,f[3]=0,f[7]=0,f[11]=0,f[15]=1,this}equals(e){const t=this.elements,r=e.elements;for(let o=0;o<16;o++)if(t[o]!==r[o])return!1;return!0}fromArray(e,t=0){for(let r=0;r<16;r++)this.elements[r]=e[r+t];return this}toArray(e=[],t=0){const r=this.elements;return e[t]=r[0],e[t+1]=r[1],e[t+2]=r[2],e[t+3]=r[3],e[t+4]=r[4],e[t+5]=r[5],e[t+6]=r[6],e[t+7]=r[7],e[t+8]=r[8],e[t+9]=r[9],e[t+10]=r[10],e[t+11]=r[11],e[t+12]=r[12],e[t+13]=r[13],e[t+14]=r[14],e[t+15]=r[15],e}}const zs=new z,hi=new Ht,WS=new z(0,0,0),jS=new z(1,1,1),xr=new z,Cl=new z,Wn=new z,Qm=new Ht,eg=new Xi;class _c{constructor(e=0,t=0,r=0,o=_c.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=r,this._order=o}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,r,o=this._order){return this._x=e,this._y=t,this._z=r,this._order=o,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,r=!0){const o=e.elements,l=o[0],d=o[4],u=o[8],f=o[1],h=o[5],m=o[9],g=o[2],y=o[6],S=o[10];switch(t){case"XYZ":this._y=Math.asin(tn(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(-m,S),this._z=Math.atan2(-d,l)):(this._x=Math.atan2(y,h),this._z=0);break;case"YXZ":this._x=Math.asin(-tn(m,-1,1)),Math.abs(m)<.9999999?(this._y=Math.atan2(u,S),this._z=Math.atan2(f,h)):(this._y=Math.atan2(-g,l),this._z=0);break;case"ZXY":this._x=Math.asin(tn(y,-1,1)),Math.abs(y)<.9999999?(this._y=Math.atan2(-g,S),this._z=Math.atan2(-d,h)):(this._y=0,this._z=Math.atan2(f,l));break;case"ZYX":this._y=Math.asin(-tn(g,-1,1)),Math.abs(g)<.9999999?(this._x=Math.atan2(y,S),this._z=Math.atan2(f,l)):(this._x=0,this._z=Math.atan2(-d,h));break;case"YZX":this._z=Math.asin(tn(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(-m,h),this._y=Math.atan2(-g,l)):(this._x=0,this._y=Math.atan2(u,S));break;case"XZY":this._z=Math.asin(-tn(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(y,h),this._y=Math.atan2(u,l)):(this._x=Math.atan2(-m,S),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,r===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,r){return Qm.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Qm,t,r)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return eg.setFromEuler(this),this.setFromQuaternion(eg,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}_c.DEFAULT_ORDER="XYZ";class kv{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let XS=0;const tg=new z,Bs=new Xi,Bi=new Ht,Rl=new z,Qo=new z,$S=new z,YS=new Xi,ng=new z(1,0,0),ig=new z(0,1,0),rg=new z(0,0,1),qS={type:"added"},KS={type:"removed"};class nn extends ls{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:XS++}),this.uuid=po(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=nn.DEFAULT_UP.clone();const e=new z,t=new _c,r=new Xi,o=new z(1,1,1);function l(){r.setFromEuler(t,!1)}function d(){t.setFromQuaternion(r,void 0,!1)}t._onChange(l),r._onChange(d),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:o},modelViewMatrix:{value:new Ht},normalMatrix:{value:new yt}}),this.matrix=new Ht,this.matrixWorld=new Ht,this.matrixAutoUpdate=nn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=nn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new kv,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Bs.setFromAxisAngle(e,t),this.quaternion.multiply(Bs),this}rotateOnWorldAxis(e,t){return Bs.setFromAxisAngle(e,t),this.quaternion.premultiply(Bs),this}rotateX(e){return this.rotateOnAxis(ng,e)}rotateY(e){return this.rotateOnAxis(ig,e)}rotateZ(e){return this.rotateOnAxis(rg,e)}translateOnAxis(e,t){return tg.copy(e).applyQuaternion(this.quaternion),this.position.add(tg.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ng,e)}translateY(e){return this.translateOnAxis(ig,e)}translateZ(e){return this.translateOnAxis(rg,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Bi.copy(this.matrixWorld).invert())}lookAt(e,t,r){e.isVector3?Rl.copy(e):Rl.set(e,t,r);const o=this.parent;this.updateWorldMatrix(!0,!1),Qo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Bi.lookAt(Qo,Rl,this.up):Bi.lookAt(Rl,Qo,this.up),this.quaternion.setFromRotationMatrix(Bi),o&&(Bi.extractRotation(o.matrixWorld),Bs.setFromRotationMatrix(Bi),this.quaternion.premultiply(Bs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(qS)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(KS)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Bi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Bi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Bi),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let r=0,o=this.children.length;r<o;r++){const d=this.children[r].getObjectByProperty(e,t);if(d!==void 0)return d}}getObjectsByProperty(e,t,r=[]){this[e]===t&&r.push(this);const o=this.children;for(let l=0,d=o.length;l<d;l++)o[l].getObjectsByProperty(e,t,r);return r}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qo,e,$S),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qo,YS,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let r=0,o=t.length;r<o;r++)t[r].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let r=0,o=t.length;r<o;r++)t[r].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let r=0,o=t.length;r<o;r++){const l=t[r];(l.matrixWorldAutoUpdate===!0||e===!0)&&l.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const r=this.parent;if(e===!0&&r!==null&&r.matrixWorldAutoUpdate===!0&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const o=this.children;for(let l=0,d=o.length;l<d;l++){const u=o[l];u.matrixWorldAutoUpdate===!0&&u.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",r={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const o={};o.uuid=this.uuid,o.type=this.type,this.name!==""&&(o.name=this.name),this.castShadow===!0&&(o.castShadow=!0),this.receiveShadow===!0&&(o.receiveShadow=!0),this.visible===!1&&(o.visible=!1),this.frustumCulled===!1&&(o.frustumCulled=!1),this.renderOrder!==0&&(o.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(o.userData=this.userData),o.layers=this.layers.mask,o.matrix=this.matrix.toArray(),o.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(o.matrixAutoUpdate=!1),this.isInstancedMesh&&(o.type="InstancedMesh",o.count=this.count,o.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(o.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(o.type="BatchedMesh",o.perObjectFrustumCulled=this.perObjectFrustumCulled,o.sortObjects=this.sortObjects,o.drawRanges=this._drawRanges,o.reservedRanges=this._reservedRanges,o.visibility=this._visibility,o.active=this._active,o.bounds=this._bounds.map(u=>({boxInitialized:u.boxInitialized,boxMin:u.box.min.toArray(),boxMax:u.box.max.toArray(),sphereInitialized:u.sphereInitialized,sphereRadius:u.sphere.radius,sphereCenter:u.sphere.center.toArray()})),o.maxGeometryCount=this._maxGeometryCount,o.maxVertexCount=this._maxVertexCount,o.maxIndexCount=this._maxIndexCount,o.geometryInitialized=this._geometryInitialized,o.geometryCount=this._geometryCount,o.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(o.boundingSphere={center:o.boundingSphere.center.toArray(),radius:o.boundingSphere.radius}),this.boundingBox!==null&&(o.boundingBox={min:o.boundingBox.min.toArray(),max:o.boundingBox.max.toArray()}));function l(u,f){return u[f.uuid]===void 0&&(u[f.uuid]=f.toJSON(e)),f.uuid}if(this.isScene)this.background&&(this.background.isColor?o.background=this.background.toJSON():this.background.isTexture&&(o.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(o.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){o.geometry=l(e.geometries,this.geometry);const u=this.geometry.parameters;if(u!==void 0&&u.shapes!==void 0){const f=u.shapes;if(Array.isArray(f))for(let h=0,m=f.length;h<m;h++){const g=f[h];l(e.shapes,g)}else l(e.shapes,f)}}if(this.isSkinnedMesh&&(o.bindMode=this.bindMode,o.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(l(e.skeletons,this.skeleton),o.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const u=[];for(let f=0,h=this.material.length;f<h;f++)u.push(l(e.materials,this.material[f]));o.material=u}else o.material=l(e.materials,this.material);if(this.children.length>0){o.children=[];for(let u=0;u<this.children.length;u++)o.children.push(this.children[u].toJSON(e).object)}if(this.animations.length>0){o.animations=[];for(let u=0;u<this.animations.length;u++){const f=this.animations[u];o.animations.push(l(e.animations,f))}}if(t){const u=d(e.geometries),f=d(e.materials),h=d(e.textures),m=d(e.images),g=d(e.shapes),y=d(e.skeletons),S=d(e.animations),E=d(e.nodes);u.length>0&&(r.geometries=u),f.length>0&&(r.materials=f),h.length>0&&(r.textures=h),m.length>0&&(r.images=m),g.length>0&&(r.shapes=g),y.length>0&&(r.skeletons=y),S.length>0&&(r.animations=S),E.length>0&&(r.nodes=E)}return r.object=o,r;function d(u){const f=[];for(const h in u){const m=u[h];delete m.metadata,f.push(m)}return f}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let r=0;r<e.children.length;r++){const o=e.children[r];this.add(o.clone())}return this}}nn.DEFAULT_UP=new z(0,1,0);nn.DEFAULT_MATRIX_AUTO_UPDATE=!0;nn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const pi=new z,Hi=new z,yd=new z,Vi=new z,Hs=new z,Vs=new z,sg=new z,Sd=new z,Md=new z,Ed=new z;let Pl=!1;class ri{constructor(e=new z,t=new z,r=new z){this.a=e,this.b=t,this.c=r}static getNormal(e,t,r,o){o.subVectors(r,t),pi.subVectors(e,t),o.cross(pi);const l=o.lengthSq();return l>0?o.multiplyScalar(1/Math.sqrt(l)):o.set(0,0,0)}static getBarycoord(e,t,r,o,l){pi.subVectors(o,t),Hi.subVectors(r,t),yd.subVectors(e,t);const d=pi.dot(pi),u=pi.dot(Hi),f=pi.dot(yd),h=Hi.dot(Hi),m=Hi.dot(yd),g=d*h-u*u;if(g===0)return l.set(0,0,0),null;const y=1/g,S=(h*f-u*m)*y,E=(d*m-u*f)*y;return l.set(1-S-E,E,S)}static containsPoint(e,t,r,o){return this.getBarycoord(e,t,r,o,Vi)===null?!1:Vi.x>=0&&Vi.y>=0&&Vi.x+Vi.y<=1}static getUV(e,t,r,o,l,d,u,f){return Pl===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Pl=!0),this.getInterpolation(e,t,r,o,l,d,u,f)}static getInterpolation(e,t,r,o,l,d,u,f){return this.getBarycoord(e,t,r,o,Vi)===null?(f.x=0,f.y=0,"z"in f&&(f.z=0),"w"in f&&(f.w=0),null):(f.setScalar(0),f.addScaledVector(l,Vi.x),f.addScaledVector(d,Vi.y),f.addScaledVector(u,Vi.z),f)}static isFrontFacing(e,t,r,o){return pi.subVectors(r,t),Hi.subVectors(e,t),pi.cross(Hi).dot(o)<0}set(e,t,r){return this.a.copy(e),this.b.copy(t),this.c.copy(r),this}setFromPointsAndIndices(e,t,r,o){return this.a.copy(e[t]),this.b.copy(e[r]),this.c.copy(e[o]),this}setFromAttributeAndIndices(e,t,r,o){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,r),this.c.fromBufferAttribute(e,o),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return pi.subVectors(this.c,this.b),Hi.subVectors(this.a,this.b),pi.cross(Hi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return ri.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return ri.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,r,o,l){return Pl===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Pl=!0),ri.getInterpolation(e,this.a,this.b,this.c,t,r,o,l)}getInterpolation(e,t,r,o,l){return ri.getInterpolation(e,this.a,this.b,this.c,t,r,o,l)}containsPoint(e){return ri.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return ri.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const r=this.a,o=this.b,l=this.c;let d,u;Hs.subVectors(o,r),Vs.subVectors(l,r),Sd.subVectors(e,r);const f=Hs.dot(Sd),h=Vs.dot(Sd);if(f<=0&&h<=0)return t.copy(r);Md.subVectors(e,o);const m=Hs.dot(Md),g=Vs.dot(Md);if(m>=0&&g<=m)return t.copy(o);const y=f*g-m*h;if(y<=0&&f>=0&&m<=0)return d=f/(f-m),t.copy(r).addScaledVector(Hs,d);Ed.subVectors(e,l);const S=Hs.dot(Ed),E=Vs.dot(Ed);if(E>=0&&S<=E)return t.copy(l);const M=S*h-f*E;if(M<=0&&h>=0&&E<=0)return u=h/(h-E),t.copy(r).addScaledVector(Vs,u);const _=m*E-S*g;if(_<=0&&g-m>=0&&S-E>=0)return sg.subVectors(l,o),u=(g-m)/(g-m+(S-E)),t.copy(o).addScaledVector(sg,u);const v=1/(_+M+y);return d=M*v,u=y*v,t.copy(r).addScaledVector(Hs,d).addScaledVector(Vs,u)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const zv={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},yr={h:0,s:0,l:0},Ll={h:0,s:0,l:0};function wd(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class St{constructor(e,t,r){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,r)}set(e,t,r){if(t===void 0&&r===void 0){const o=e;o&&o.isColor?this.copy(o):typeof o=="number"?this.setHex(o):typeof o=="string"&&this.setStyle(o)}else this.setRGB(e,t,r);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=un){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Lt.toWorkingColorSpace(this,t),this}setRGB(e,t,r,o=Lt.workingColorSpace){return this.r=e,this.g=t,this.b=r,Lt.toWorkingColorSpace(this,o),this}setHSL(e,t,r,o=Lt.workingColorSpace){if(e=hf(e,1),t=tn(t,0,1),r=tn(r,0,1),t===0)this.r=this.g=this.b=r;else{const l=r<=.5?r*(1+t):r+t-r*t,d=2*r-l;this.r=wd(d,l,e+1/3),this.g=wd(d,l,e),this.b=wd(d,l,e-1/3)}return Lt.toWorkingColorSpace(this,o),this}setStyle(e,t=un){function r(l){l!==void 0&&parseFloat(l)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let o;if(o=/^(\w+)\(([^\)]*)\)/.exec(e)){let l;const d=o[1],u=o[2];switch(d){case"rgb":case"rgba":if(l=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(u))return r(l[4]),this.setRGB(Math.min(255,parseInt(l[1],10))/255,Math.min(255,parseInt(l[2],10))/255,Math.min(255,parseInt(l[3],10))/255,t);if(l=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(u))return r(l[4]),this.setRGB(Math.min(100,parseInt(l[1],10))/100,Math.min(100,parseInt(l[2],10))/100,Math.min(100,parseInt(l[3],10))/100,t);break;case"hsl":case"hsla":if(l=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(u))return r(l[4]),this.setHSL(parseFloat(l[1])/360,parseFloat(l[2])/100,parseFloat(l[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(o=/^\#([A-Fa-f\d]+)$/.exec(e)){const l=o[1],d=l.length;if(d===3)return this.setRGB(parseInt(l.charAt(0),16)/15,parseInt(l.charAt(1),16)/15,parseInt(l.charAt(2),16)/15,t);if(d===6)return this.setHex(parseInt(l,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=un){const r=zv[e.toLowerCase()];return r!==void 0?this.setHex(r,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ro(e.r),this.g=ro(e.g),this.b=ro(e.b),this}copyLinearToSRGB(e){return this.r=fd(e.r),this.g=fd(e.g),this.b=fd(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=un){return Lt.fromWorkingColorSpace(yn.copy(this),e),Math.round(tn(yn.r*255,0,255))*65536+Math.round(tn(yn.g*255,0,255))*256+Math.round(tn(yn.b*255,0,255))}getHexString(e=un){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Lt.workingColorSpace){Lt.fromWorkingColorSpace(yn.copy(this),t);const r=yn.r,o=yn.g,l=yn.b,d=Math.max(r,o,l),u=Math.min(r,o,l);let f,h;const m=(u+d)/2;if(u===d)f=0,h=0;else{const g=d-u;switch(h=m<=.5?g/(d+u):g/(2-d-u),d){case r:f=(o-l)/g+(o<l?6:0);break;case o:f=(l-r)/g+2;break;case l:f=(r-o)/g+4;break}f/=6}return e.h=f,e.s=h,e.l=m,e}getRGB(e,t=Lt.workingColorSpace){return Lt.fromWorkingColorSpace(yn.copy(this),t),e.r=yn.r,e.g=yn.g,e.b=yn.b,e}getStyle(e=un){Lt.fromWorkingColorSpace(yn.copy(this),e);const t=yn.r,r=yn.g,o=yn.b;return e!==un?`color(${e} ${t.toFixed(3)} ${r.toFixed(3)} ${o.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(r*255)},${Math.round(o*255)})`}offsetHSL(e,t,r){return this.getHSL(yr),this.setHSL(yr.h+e,yr.s+t,yr.l+r)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,r){return this.r=e.r+(t.r-e.r)*r,this.g=e.g+(t.g-e.g)*r,this.b=e.b+(t.b-e.b)*r,this}lerpHSL(e,t){this.getHSL(yr),e.getHSL(Ll);const r=na(yr.h,Ll.h,t),o=na(yr.s,Ll.s,t),l=na(yr.l,Ll.l,t);return this.setHSL(r,o,l),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,r=this.g,o=this.b,l=e.elements;return this.r=l[0]*t+l[3]*r+l[6]*o,this.g=l[1]*t+l[4]*r+l[7]*o,this.b=l[2]*t+l[5]*r+l[8]*o,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const yn=new St;St.NAMES=zv;let ZS=0;class mo extends ls{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ZS++}),this.uuid=po(),this.name="",this.type="Material",this.blending=no,this.side=Pr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=$d,this.blendDst=Yd,this.blendEquation=Jr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new St(0,0,0),this.blendAlpha=0,this.depthFunc=tc,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=jm,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Us,this.stencilZFail=Us,this.stencilZPass=Us,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const r=e[t];if(r===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const o=this[t];if(o===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}o&&o.isColor?o.set(r):o&&o.isVector3&&r&&r.isVector3?o.copy(r):this[t]=r}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const r={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.color&&this.color.isColor&&(r.color=this.color.getHex()),this.roughness!==void 0&&(r.roughness=this.roughness),this.metalness!==void 0&&(r.metalness=this.metalness),this.sheen!==void 0&&(r.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(r.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(r.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(r.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(r.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(r.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(r.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(r.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(r.shininess=this.shininess),this.clearcoat!==void 0&&(r.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(r.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(r.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(r.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(r.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,r.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(r.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(r.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(r.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(r.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(r.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(r.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(r.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(r.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(r.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(r.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(r.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(r.lightMap=this.lightMap.toJSON(e).uuid,r.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(r.aoMap=this.aoMap.toJSON(e).uuid,r.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(r.bumpMap=this.bumpMap.toJSON(e).uuid,r.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(r.normalMap=this.normalMap.toJSON(e).uuid,r.normalMapType=this.normalMapType,r.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(r.displacementMap=this.displacementMap.toJSON(e).uuid,r.displacementScale=this.displacementScale,r.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(r.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(r.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(r.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(r.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(r.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(r.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(r.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(r.combine=this.combine)),this.envMapIntensity!==void 0&&(r.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(r.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(r.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(r.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(r.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(r.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(r.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(r.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(r.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(r.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(r.size=this.size),this.shadowSide!==null&&(r.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(r.sizeAttenuation=this.sizeAttenuation),this.blending!==no&&(r.blending=this.blending),this.side!==Pr&&(r.side=this.side),this.vertexColors===!0&&(r.vertexColors=!0),this.opacity<1&&(r.opacity=this.opacity),this.transparent===!0&&(r.transparent=!0),this.blendSrc!==$d&&(r.blendSrc=this.blendSrc),this.blendDst!==Yd&&(r.blendDst=this.blendDst),this.blendEquation!==Jr&&(r.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(r.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(r.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(r.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(r.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(r.blendAlpha=this.blendAlpha),this.depthFunc!==tc&&(r.depthFunc=this.depthFunc),this.depthTest===!1&&(r.depthTest=this.depthTest),this.depthWrite===!1&&(r.depthWrite=this.depthWrite),this.colorWrite===!1&&(r.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(r.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==jm&&(r.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(r.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(r.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Us&&(r.stencilFail=this.stencilFail),this.stencilZFail!==Us&&(r.stencilZFail=this.stencilZFail),this.stencilZPass!==Us&&(r.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(r.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(r.rotation=this.rotation),this.polygonOffset===!0&&(r.polygonOffset=!0),this.polygonOffsetFactor!==0&&(r.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(r.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(r.linewidth=this.linewidth),this.dashSize!==void 0&&(r.dashSize=this.dashSize),this.gapSize!==void 0&&(r.gapSize=this.gapSize),this.scale!==void 0&&(r.scale=this.scale),this.dithering===!0&&(r.dithering=!0),this.alphaTest>0&&(r.alphaTest=this.alphaTest),this.alphaHash===!0&&(r.alphaHash=!0),this.alphaToCoverage===!0&&(r.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(r.premultipliedAlpha=!0),this.forceSinglePass===!0&&(r.forceSinglePass=!0),this.wireframe===!0&&(r.wireframe=!0),this.wireframeLinewidth>1&&(r.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(r.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(r.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(r.flatShading=!0),this.visible===!1&&(r.visible=!1),this.toneMapped===!1&&(r.toneMapped=!1),this.fog===!1&&(r.fog=!1),Object.keys(this.userData).length>0&&(r.userData=this.userData);function o(l){const d=[];for(const u in l){const f=l[u];delete f.metadata,d.push(f)}return d}if(t){const l=o(e.textures),d=o(e.images);l.length>0&&(r.textures=l),d.length>0&&(r.images=d)}return r}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let r=null;if(t!==null){const o=t.length;r=new Array(o);for(let l=0;l!==o;++l)r[l]=t[l].clone()}return this.clippingPlanes=r,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class so extends mo{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new St(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Sv,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Kt=new z,Nl=new Be;class Yn{constructor(e,t,r=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=r,this.usage=Xm,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=wr,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,r){e*=this.itemSize,r*=t.itemSize;for(let o=0,l=this.itemSize;o<l;o++)this.array[e+o]=t.array[r+o];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,r=this.count;t<r;t++)Nl.fromBufferAttribute(this,t),Nl.applyMatrix3(e),this.setXY(t,Nl.x,Nl.y);else if(this.itemSize===3)for(let t=0,r=this.count;t<r;t++)Kt.fromBufferAttribute(this,t),Kt.applyMatrix3(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}applyMatrix4(e){for(let t=0,r=this.count;t<r;t++)Kt.fromBufferAttribute(this,t),Kt.applyMatrix4(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}applyNormalMatrix(e){for(let t=0,r=this.count;t<r;t++)Kt.fromBufferAttribute(this,t),Kt.applyNormalMatrix(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}transformDirection(e){for(let t=0,r=this.count;t<r;t++)Kt.fromBufferAttribute(this,t),Kt.transformDirection(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let r=this.array[e*this.itemSize+t];return this.normalized&&(r=Qs(r,this.array)),r}setComponent(e,t,r){return this.normalized&&(r=Tn(r,this.array)),this.array[e*this.itemSize+t]=r,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Qs(t,this.array)),t}setX(e,t){return this.normalized&&(t=Tn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Qs(t,this.array)),t}setY(e,t){return this.normalized&&(t=Tn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Qs(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Tn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Qs(t,this.array)),t}setW(e,t){return this.normalized&&(t=Tn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,r){return e*=this.itemSize,this.normalized&&(t=Tn(t,this.array),r=Tn(r,this.array)),this.array[e+0]=t,this.array[e+1]=r,this}setXYZ(e,t,r,o){return e*=this.itemSize,this.normalized&&(t=Tn(t,this.array),r=Tn(r,this.array),o=Tn(o,this.array)),this.array[e+0]=t,this.array[e+1]=r,this.array[e+2]=o,this}setXYZW(e,t,r,o,l){return e*=this.itemSize,this.normalized&&(t=Tn(t,this.array),r=Tn(r,this.array),o=Tn(o,this.array),l=Tn(l,this.array)),this.array[e+0]=t,this.array[e+1]=r,this.array[e+2]=o,this.array[e+3]=l,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Xm&&(e.usage=this.usage),e}}class Bv extends Yn{constructor(e,t,r){super(new Uint16Array(e),t,r)}}class Hv extends Yn{constructor(e,t,r){super(new Uint32Array(e),t,r)}}class Ft extends Yn{constructor(e,t,r){super(new Float32Array(e),t,r)}}let JS=0;const ni=new Ht,Td=new nn,Gs=new z,jn=new ha,ea=new ha,cn=new z;class Rn extends ls{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:JS++}),this.uuid=po(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Uv(e)?Hv:Bv)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,r=0){this.groups.push({start:e,count:t,materialIndex:r})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const r=this.attributes.normal;if(r!==void 0){const l=new yt().getNormalMatrix(e);r.applyNormalMatrix(l),r.needsUpdate=!0}const o=this.attributes.tangent;return o!==void 0&&(o.transformDirection(e),o.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return ni.makeRotationFromQuaternion(e),this.applyMatrix4(ni),this}rotateX(e){return ni.makeRotationX(e),this.applyMatrix4(ni),this}rotateY(e){return ni.makeRotationY(e),this.applyMatrix4(ni),this}rotateZ(e){return ni.makeRotationZ(e),this.applyMatrix4(ni),this}translate(e,t,r){return ni.makeTranslation(e,t,r),this.applyMatrix4(ni),this}scale(e,t,r){return ni.makeScale(e,t,r),this.applyMatrix4(ni),this}lookAt(e){return Td.lookAt(e),Td.updateMatrix(),this.applyMatrix4(Td.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Gs).negate(),this.translate(Gs.x,Gs.y,Gs.z),this}setFromPoints(e){const t=[];for(let r=0,o=e.length;r<o;r++){const l=e[r];t.push(l.x,l.y,l.z||0)}return this.setAttribute("position",new Ft(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ha);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new z(-1/0,-1/0,-1/0),new z(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const l=t[r];jn.setFromBufferAttribute(l),this.morphTargetsRelative?(cn.addVectors(this.boundingBox.min,jn.min),this.boundingBox.expandByPoint(cn),cn.addVectors(this.boundingBox.max,jn.max),this.boundingBox.expandByPoint(cn)):(this.boundingBox.expandByPoint(jn.min),this.boundingBox.expandByPoint(jn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new vc);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new z,1/0);return}if(e){const r=this.boundingSphere.center;if(jn.setFromBufferAttribute(e),t)for(let l=0,d=t.length;l<d;l++){const u=t[l];ea.setFromBufferAttribute(u),this.morphTargetsRelative?(cn.addVectors(jn.min,ea.min),jn.expandByPoint(cn),cn.addVectors(jn.max,ea.max),jn.expandByPoint(cn)):(jn.expandByPoint(ea.min),jn.expandByPoint(ea.max))}jn.getCenter(r);let o=0;for(let l=0,d=e.count;l<d;l++)cn.fromBufferAttribute(e,l),o=Math.max(o,r.distanceToSquared(cn));if(t)for(let l=0,d=t.length;l<d;l++){const u=t[l],f=this.morphTargetsRelative;for(let h=0,m=u.count;h<m;h++)cn.fromBufferAttribute(u,h),f&&(Gs.fromBufferAttribute(e,h),cn.add(Gs)),o=Math.max(o,r.distanceToSquared(cn))}this.boundingSphere.radius=Math.sqrt(o),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const r=e.array,o=t.position.array,l=t.normal.array,d=t.uv.array,u=o.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Yn(new Float32Array(4*u),4));const f=this.getAttribute("tangent").array,h=[],m=[];for(let U=0;U<u;U++)h[U]=new z,m[U]=new z;const g=new z,y=new z,S=new z,E=new Be,M=new Be,_=new Be,v=new z,T=new z;function A(U,se,le){g.fromArray(o,U*3),y.fromArray(o,se*3),S.fromArray(o,le*3),E.fromArray(d,U*2),M.fromArray(d,se*2),_.fromArray(d,le*2),y.sub(g),S.sub(g),M.sub(E),_.sub(E);const me=1/(M.x*_.y-_.x*M.y);isFinite(me)&&(v.copy(y).multiplyScalar(_.y).addScaledVector(S,-M.y).multiplyScalar(me),T.copy(S).multiplyScalar(M.x).addScaledVector(y,-_.x).multiplyScalar(me),h[U].add(v),h[se].add(v),h[le].add(v),m[U].add(T),m[se].add(T),m[le].add(T))}let P=this.groups;P.length===0&&(P=[{start:0,count:r.length}]);for(let U=0,se=P.length;U<se;++U){const le=P[U],me=le.start,H=le.count;for(let q=me,te=me+H;q<te;q+=3)A(r[q+0],r[q+1],r[q+2])}const F=new z,D=new z,I=new z,ie=new z;function R(U){I.fromArray(l,U*3),ie.copy(I);const se=h[U];F.copy(se),F.sub(I.multiplyScalar(I.dot(se))).normalize(),D.crossVectors(ie,se);const me=D.dot(m[U])<0?-1:1;f[U*4]=F.x,f[U*4+1]=F.y,f[U*4+2]=F.z,f[U*4+3]=me}for(let U=0,se=P.length;U<se;++U){const le=P[U],me=le.start,H=le.count;for(let q=me,te=me+H;q<te;q+=3)R(r[q+0]),R(r[q+1]),R(r[q+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let r=this.getAttribute("normal");if(r===void 0)r=new Yn(new Float32Array(t.count*3),3),this.setAttribute("normal",r);else for(let y=0,S=r.count;y<S;y++)r.setXYZ(y,0,0,0);const o=new z,l=new z,d=new z,u=new z,f=new z,h=new z,m=new z,g=new z;if(e)for(let y=0,S=e.count;y<S;y+=3){const E=e.getX(y+0),M=e.getX(y+1),_=e.getX(y+2);o.fromBufferAttribute(t,E),l.fromBufferAttribute(t,M),d.fromBufferAttribute(t,_),m.subVectors(d,l),g.subVectors(o,l),m.cross(g),u.fromBufferAttribute(r,E),f.fromBufferAttribute(r,M),h.fromBufferAttribute(r,_),u.add(m),f.add(m),h.add(m),r.setXYZ(E,u.x,u.y,u.z),r.setXYZ(M,f.x,f.y,f.z),r.setXYZ(_,h.x,h.y,h.z)}else for(let y=0,S=t.count;y<S;y+=3)o.fromBufferAttribute(t,y+0),l.fromBufferAttribute(t,y+1),d.fromBufferAttribute(t,y+2),m.subVectors(d,l),g.subVectors(o,l),m.cross(g),r.setXYZ(y+0,m.x,m.y,m.z),r.setXYZ(y+1,m.x,m.y,m.z),r.setXYZ(y+2,m.x,m.y,m.z);this.normalizeNormals(),r.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,r=e.count;t<r;t++)cn.fromBufferAttribute(e,t),cn.normalize(),e.setXYZ(t,cn.x,cn.y,cn.z)}toNonIndexed(){function e(u,f){const h=u.array,m=u.itemSize,g=u.normalized,y=new h.constructor(f.length*m);let S=0,E=0;for(let M=0,_=f.length;M<_;M++){u.isInterleavedBufferAttribute?S=f[M]*u.data.stride+u.offset:S=f[M]*m;for(let v=0;v<m;v++)y[E++]=h[S++]}return new Yn(y,m,g)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Rn,r=this.index.array,o=this.attributes;for(const u in o){const f=o[u],h=e(f,r);t.setAttribute(u,h)}const l=this.morphAttributes;for(const u in l){const f=[],h=l[u];for(let m=0,g=h.length;m<g;m++){const y=h[m],S=e(y,r);f.push(S)}t.morphAttributes[u]=f}t.morphTargetsRelative=this.morphTargetsRelative;const d=this.groups;for(let u=0,f=d.length;u<f;u++){const h=d[u];t.addGroup(h.start,h.count,h.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const f=this.parameters;for(const h in f)f[h]!==void 0&&(e[h]=f[h]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const r=this.attributes;for(const f in r){const h=r[f];e.data.attributes[f]=h.toJSON(e.data)}const o={};let l=!1;for(const f in this.morphAttributes){const h=this.morphAttributes[f],m=[];for(let g=0,y=h.length;g<y;g++){const S=h[g];m.push(S.toJSON(e.data))}m.length>0&&(o[f]=m,l=!0)}l&&(e.data.morphAttributes=o,e.data.morphTargetsRelative=this.morphTargetsRelative);const d=this.groups;d.length>0&&(e.data.groups=JSON.parse(JSON.stringify(d)));const u=this.boundingSphere;return u!==null&&(e.data.boundingSphere={center:u.center.toArray(),radius:u.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const r=e.index;r!==null&&this.setIndex(r.clone(t));const o=e.attributes;for(const h in o){const m=o[h];this.setAttribute(h,m.clone(t))}const l=e.morphAttributes;for(const h in l){const m=[],g=l[h];for(let y=0,S=g.length;y<S;y++)m.push(g[y].clone(t));this.morphAttributes[h]=m}this.morphTargetsRelative=e.morphTargetsRelative;const d=e.groups;for(let h=0,m=d.length;h<m;h++){const g=d[h];this.addGroup(g.start,g.count,g.materialIndex)}const u=e.boundingBox;u!==null&&(this.boundingBox=u.clone());const f=e.boundingSphere;return f!==null&&(this.boundingSphere=f.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const og=new Ht,qr=new pf,Dl=new vc,ag=new z,Ws=new z,js=new z,Xs=new z,Ad=new z,Ul=new z,Il=new Be,Ol=new Be,Fl=new Be,lg=new z,cg=new z,ug=new z,kl=new z,zl=new z;class Rt extends nn{constructor(e=new Rn,t=new so){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,r=Object.keys(t);if(r.length>0){const o=t[r[0]];if(o!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let l=0,d=o.length;l<d;l++){const u=o[l].name||String(l);this.morphTargetInfluences.push(0),this.morphTargetDictionary[u]=l}}}}getVertexPosition(e,t){const r=this.geometry,o=r.attributes.position,l=r.morphAttributes.position,d=r.morphTargetsRelative;t.fromBufferAttribute(o,e);const u=this.morphTargetInfluences;if(l&&u){Ul.set(0,0,0);for(let f=0,h=l.length;f<h;f++){const m=u[f],g=l[f];m!==0&&(Ad.fromBufferAttribute(g,e),d?Ul.addScaledVector(Ad,m):Ul.addScaledVector(Ad.sub(t),m))}t.add(Ul)}return t}raycast(e,t){const r=this.geometry,o=this.material,l=this.matrixWorld;o!==void 0&&(r.boundingSphere===null&&r.computeBoundingSphere(),Dl.copy(r.boundingSphere),Dl.applyMatrix4(l),qr.copy(e.ray).recast(e.near),!(Dl.containsPoint(qr.origin)===!1&&(qr.intersectSphere(Dl,ag)===null||qr.origin.distanceToSquared(ag)>(e.far-e.near)**2))&&(og.copy(l).invert(),qr.copy(e.ray).applyMatrix4(og),!(r.boundingBox!==null&&qr.intersectsBox(r.boundingBox)===!1)&&this._computeIntersections(e,t,qr)))}_computeIntersections(e,t,r){let o;const l=this.geometry,d=this.material,u=l.index,f=l.attributes.position,h=l.attributes.uv,m=l.attributes.uv1,g=l.attributes.normal,y=l.groups,S=l.drawRange;if(u!==null)if(Array.isArray(d))for(let E=0,M=y.length;E<M;E++){const _=y[E],v=d[_.materialIndex],T=Math.max(_.start,S.start),A=Math.min(u.count,Math.min(_.start+_.count,S.start+S.count));for(let P=T,F=A;P<F;P+=3){const D=u.getX(P),I=u.getX(P+1),ie=u.getX(P+2);o=Bl(this,v,e,r,h,m,g,D,I,ie),o&&(o.faceIndex=Math.floor(P/3),o.face.materialIndex=_.materialIndex,t.push(o))}}else{const E=Math.max(0,S.start),M=Math.min(u.count,S.start+S.count);for(let _=E,v=M;_<v;_+=3){const T=u.getX(_),A=u.getX(_+1),P=u.getX(_+2);o=Bl(this,d,e,r,h,m,g,T,A,P),o&&(o.faceIndex=Math.floor(_/3),t.push(o))}}else if(f!==void 0)if(Array.isArray(d))for(let E=0,M=y.length;E<M;E++){const _=y[E],v=d[_.materialIndex],T=Math.max(_.start,S.start),A=Math.min(f.count,Math.min(_.start+_.count,S.start+S.count));for(let P=T,F=A;P<F;P+=3){const D=P,I=P+1,ie=P+2;o=Bl(this,v,e,r,h,m,g,D,I,ie),o&&(o.faceIndex=Math.floor(P/3),o.face.materialIndex=_.materialIndex,t.push(o))}}else{const E=Math.max(0,S.start),M=Math.min(f.count,S.start+S.count);for(let _=E,v=M;_<v;_+=3){const T=_,A=_+1,P=_+2;o=Bl(this,d,e,r,h,m,g,T,A,P),o&&(o.faceIndex=Math.floor(_/3),t.push(o))}}}}function QS(s,e,t,r,o,l,d,u){let f;if(e.side===Cn?f=r.intersectTriangle(d,l,o,!0,u):f=r.intersectTriangle(o,l,d,e.side===Pr,u),f===null)return null;zl.copy(u),zl.applyMatrix4(s.matrixWorld);const h=t.ray.origin.distanceTo(zl);return h<t.near||h>t.far?null:{distance:h,point:zl.clone(),object:s}}function Bl(s,e,t,r,o,l,d,u,f,h){s.getVertexPosition(u,Ws),s.getVertexPosition(f,js),s.getVertexPosition(h,Xs);const m=QS(s,e,t,r,Ws,js,Xs,kl);if(m){o&&(Il.fromBufferAttribute(o,u),Ol.fromBufferAttribute(o,f),Fl.fromBufferAttribute(o,h),m.uv=ri.getInterpolation(kl,Ws,js,Xs,Il,Ol,Fl,new Be)),l&&(Il.fromBufferAttribute(l,u),Ol.fromBufferAttribute(l,f),Fl.fromBufferAttribute(l,h),m.uv1=ri.getInterpolation(kl,Ws,js,Xs,Il,Ol,Fl,new Be),m.uv2=m.uv1),d&&(lg.fromBufferAttribute(d,u),cg.fromBufferAttribute(d,f),ug.fromBufferAttribute(d,h),m.normal=ri.getInterpolation(kl,Ws,js,Xs,lg,cg,ug,new z),m.normal.dot(r.direction)>0&&m.normal.multiplyScalar(-1));const g={a:u,b:f,c:h,normal:new z,materialIndex:0};ri.getNormal(Ws,js,Xs,g.normal),m.face=g}return m}class Yi extends Rn{constructor(e=1,t=1,r=1,o=1,l=1,d=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:r,widthSegments:o,heightSegments:l,depthSegments:d};const u=this;o=Math.floor(o),l=Math.floor(l),d=Math.floor(d);const f=[],h=[],m=[],g=[];let y=0,S=0;E("z","y","x",-1,-1,r,t,e,d,l,0),E("z","y","x",1,-1,r,t,-e,d,l,1),E("x","z","y",1,1,e,r,t,o,d,2),E("x","z","y",1,-1,e,r,-t,o,d,3),E("x","y","z",1,-1,e,t,r,o,l,4),E("x","y","z",-1,-1,e,t,-r,o,l,5),this.setIndex(f),this.setAttribute("position",new Ft(h,3)),this.setAttribute("normal",new Ft(m,3)),this.setAttribute("uv",new Ft(g,2));function E(M,_,v,T,A,P,F,D,I,ie,R){const U=P/I,se=F/ie,le=P/2,me=F/2,H=D/2,q=I+1,te=ie+1;let J=0,X=0;const K=new z;for(let $=0;$<te;$++){const O=$*se-me;for(let W=0;W<q;W++){const Y=W*U-le;K[M]=Y*T,K[_]=O*A,K[v]=H,h.push(K.x,K.y,K.z),K[M]=0,K[_]=0,K[v]=D>0?1:-1,m.push(K.x,K.y,K.z),g.push(W/I),g.push(1-$/ie),J+=1}}for(let $=0;$<ie;$++)for(let O=0;O<I;O++){const W=y+O+q*$,Y=y+O+q*($+1),de=y+(O+1)+q*($+1),ve=y+(O+1)+q*$;f.push(W,Y,ve),f.push(Y,de,ve),X+=6}u.addGroup(S,X,R),S+=X,y+=J}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Yi(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function uo(s){const e={};for(const t in s){e[t]={};for(const r in s[t]){const o=s[t][r];o&&(o.isColor||o.isMatrix3||o.isMatrix4||o.isVector2||o.isVector3||o.isVector4||o.isTexture||o.isQuaternion)?o.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][r]=null):e[t][r]=o.clone():Array.isArray(o)?e[t][r]=o.slice():e[t][r]=o}}return e}function An(s){const e={};for(let t=0;t<s.length;t++){const r=uo(s[t]);for(const o in r)e[o]=r[o]}return e}function eM(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function Vv(s){return s.getRenderTarget()===null?s.outputColorSpace:Lt.workingColorSpace}const tM={clone:uo,merge:An};var nM=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,iM=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class as extends mo{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=nM,this.fragmentShader=iM,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=uo(e.uniforms),this.uniformsGroups=eM(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const o in this.uniforms){const d=this.uniforms[o].value;d&&d.isTexture?t.uniforms[o]={type:"t",value:d.toJSON(e).uuid}:d&&d.isColor?t.uniforms[o]={type:"c",value:d.getHex()}:d&&d.isVector2?t.uniforms[o]={type:"v2",value:d.toArray()}:d&&d.isVector3?t.uniforms[o]={type:"v3",value:d.toArray()}:d&&d.isVector4?t.uniforms[o]={type:"v4",value:d.toArray()}:d&&d.isMatrix3?t.uniforms[o]={type:"m3",value:d.toArray()}:d&&d.isMatrix4?t.uniforms[o]={type:"m4",value:d.toArray()}:t.uniforms[o]={value:d}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const r={};for(const o in this.extensions)this.extensions[o]===!0&&(r[o]=!0);return Object.keys(r).length>0&&(t.extensions=r),t}}class Gv extends nn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ht,this.projectionMatrix=new Ht,this.projectionMatrixInverse=new Ht,this.coordinateSystem=Wi}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class $n extends Gv{constructor(e=50,t=1,r=.1,o=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=r,this.far=o,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ua*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(io*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ua*2*Math.atan(Math.tan(io*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,r,o,l,d){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=r,this.view.offsetY=o,this.view.width=l,this.view.height=d,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(io*.5*this.fov)/this.zoom,r=2*t,o=this.aspect*r,l=-.5*o;const d=this.view;if(this.view!==null&&this.view.enabled){const f=d.fullWidth,h=d.fullHeight;l+=d.offsetX*o/f,t-=d.offsetY*r/h,o*=d.width/f,r*=d.height/h}const u=this.filmOffset;u!==0&&(l+=e*u/this.getFilmWidth()),this.projectionMatrix.makePerspective(l,l+o,t,t-r,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const $s=-90,Ys=1;class rM extends nn{constructor(e,t,r){super(),this.type="CubeCamera",this.renderTarget=r,this.coordinateSystem=null,this.activeMipmapLevel=0;const o=new $n($s,Ys,e,t);o.layers=this.layers,this.add(o);const l=new $n($s,Ys,e,t);l.layers=this.layers,this.add(l);const d=new $n($s,Ys,e,t);d.layers=this.layers,this.add(d);const u=new $n($s,Ys,e,t);u.layers=this.layers,this.add(u);const f=new $n($s,Ys,e,t);f.layers=this.layers,this.add(f);const h=new $n($s,Ys,e,t);h.layers=this.layers,this.add(h)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[r,o,l,d,u,f]=t;for(const h of t)this.remove(h);if(e===Wi)r.up.set(0,1,0),r.lookAt(1,0,0),o.up.set(0,1,0),o.lookAt(-1,0,0),l.up.set(0,0,-1),l.lookAt(0,1,0),d.up.set(0,0,1),d.lookAt(0,-1,0),u.up.set(0,1,0),u.lookAt(0,0,1),f.up.set(0,1,0),f.lookAt(0,0,-1);else if(e===oc)r.up.set(0,-1,0),r.lookAt(-1,0,0),o.up.set(0,-1,0),o.lookAt(1,0,0),l.up.set(0,0,1),l.lookAt(0,1,0),d.up.set(0,0,-1),d.lookAt(0,-1,0),u.up.set(0,-1,0),u.lookAt(0,0,1),f.up.set(0,-1,0),f.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const h of t)this.add(h),h.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:r,activeMipmapLevel:o}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[l,d,u,f,h,m]=this.children,g=e.getRenderTarget(),y=e.getActiveCubeFace(),S=e.getActiveMipmapLevel(),E=e.xr.enabled;e.xr.enabled=!1;const M=r.texture.generateMipmaps;r.texture.generateMipmaps=!1,e.setRenderTarget(r,0,o),e.render(t,l),e.setRenderTarget(r,1,o),e.render(t,d),e.setRenderTarget(r,2,o),e.render(t,u),e.setRenderTarget(r,3,o),e.render(t,f),e.setRenderTarget(r,4,o),e.render(t,h),r.texture.generateMipmaps=M,e.setRenderTarget(r,5,o),e.render(t,m),e.setRenderTarget(g,y,S),e.xr.enabled=E,r.texture.needsPMREMUpdate=!0}}class Wv extends zn{constructor(e,t,r,o,l,d,u,f,h,m){e=e!==void 0?e:[],t=t!==void 0?t:ao,super(e,t,r,o,l,d,u,f,h,m),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class sM extends os{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const r={width:e,height:e,depth:1},o=[r,r,r,r,r,r];t.encoding!==void 0&&(ia("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===is?un:si),this.texture=new Wv(o,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:ii}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const r={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},o=new Yi(5,5,5),l=new as({name:"CubemapFromEquirect",uniforms:uo(r.uniforms),vertexShader:r.vertexShader,fragmentShader:r.fragmentShader,side:Cn,blending:br});l.uniforms.tEquirect.value=t;const d=new Rt(o,l),u=t.minFilter;return t.minFilter===la&&(t.minFilter=ii),new rM(1,10,this).update(e,d),t.minFilter=u,d.geometry.dispose(),d.material.dispose(),this}clear(e,t,r,o){const l=e.getRenderTarget();for(let d=0;d<6;d++)e.setRenderTarget(this,d),e.clear(t,r,o);e.setRenderTarget(l)}}const bd=new z,oM=new z,aM=new yt;class Sr{constructor(e=new z(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,r,o){return this.normal.set(e,t,r),this.constant=o,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,r){const o=bd.subVectors(r,t).cross(oM.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(o,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const r=e.delta(bd),o=this.normal.dot(r);if(o===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const l=-(e.start.dot(this.normal)+this.constant)/o;return l<0||l>1?null:t.copy(e.start).addScaledVector(r,l)}intersectsLine(e){const t=this.distanceToPoint(e.start),r=this.distanceToPoint(e.end);return t<0&&r>0||r<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const r=t||aM.getNormalMatrix(e),o=this.coplanarPoint(bd).applyMatrix4(e),l=this.normal.applyMatrix3(r).normalize();return this.constant=-o.dot(l),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Kr=new vc,Hl=new z;class mf{constructor(e=new Sr,t=new Sr,r=new Sr,o=new Sr,l=new Sr,d=new Sr){this.planes=[e,t,r,o,l,d]}set(e,t,r,o,l,d){const u=this.planes;return u[0].copy(e),u[1].copy(t),u[2].copy(r),u[3].copy(o),u[4].copy(l),u[5].copy(d),this}copy(e){const t=this.planes;for(let r=0;r<6;r++)t[r].copy(e.planes[r]);return this}setFromProjectionMatrix(e,t=Wi){const r=this.planes,o=e.elements,l=o[0],d=o[1],u=o[2],f=o[3],h=o[4],m=o[5],g=o[6],y=o[7],S=o[8],E=o[9],M=o[10],_=o[11],v=o[12],T=o[13],A=o[14],P=o[15];if(r[0].setComponents(f-l,y-h,_-S,P-v).normalize(),r[1].setComponents(f+l,y+h,_+S,P+v).normalize(),r[2].setComponents(f+d,y+m,_+E,P+T).normalize(),r[3].setComponents(f-d,y-m,_-E,P-T).normalize(),r[4].setComponents(f-u,y-g,_-M,P-A).normalize(),t===Wi)r[5].setComponents(f+u,y+g,_+M,P+A).normalize();else if(t===oc)r[5].setComponents(u,g,M,A).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Kr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Kr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Kr)}intersectsSprite(e){return Kr.center.set(0,0,0),Kr.radius=.7071067811865476,Kr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Kr)}intersectsSphere(e){const t=this.planes,r=e.center,o=-e.radius;for(let l=0;l<6;l++)if(t[l].distanceToPoint(r)<o)return!1;return!0}intersectsBox(e){const t=this.planes;for(let r=0;r<6;r++){const o=t[r];if(Hl.x=o.normal.x>0?e.max.x:e.min.x,Hl.y=o.normal.y>0?e.max.y:e.min.y,Hl.z=o.normal.z>0?e.max.z:e.min.z,o.distanceToPoint(Hl)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let r=0;r<6;r++)if(t[r].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function jv(){let s=null,e=!1,t=null,r=null;function o(l,d){t(l,d),r=s.requestAnimationFrame(o)}return{start:function(){e!==!0&&t!==null&&(r=s.requestAnimationFrame(o),e=!0)},stop:function(){s.cancelAnimationFrame(r),e=!1},setAnimationLoop:function(l){t=l},setContext:function(l){s=l}}}function lM(s,e){const t=e.isWebGL2,r=new WeakMap;function o(h,m){const g=h.array,y=h.usage,S=g.byteLength,E=s.createBuffer();s.bindBuffer(m,E),s.bufferData(m,g,y),h.onUploadCallback();let M;if(g instanceof Float32Array)M=s.FLOAT;else if(g instanceof Uint16Array)if(h.isFloat16BufferAttribute)if(t)M=s.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else M=s.UNSIGNED_SHORT;else if(g instanceof Int16Array)M=s.SHORT;else if(g instanceof Uint32Array)M=s.UNSIGNED_INT;else if(g instanceof Int32Array)M=s.INT;else if(g instanceof Int8Array)M=s.BYTE;else if(g instanceof Uint8Array)M=s.UNSIGNED_BYTE;else if(g instanceof Uint8ClampedArray)M=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+g);return{buffer:E,type:M,bytesPerElement:g.BYTES_PER_ELEMENT,version:h.version,size:S}}function l(h,m,g){const y=m.array,S=m._updateRange,E=m.updateRanges;if(s.bindBuffer(g,h),S.count===-1&&E.length===0&&s.bufferSubData(g,0,y),E.length!==0){for(let M=0,_=E.length;M<_;M++){const v=E[M];t?s.bufferSubData(g,v.start*y.BYTES_PER_ELEMENT,y,v.start,v.count):s.bufferSubData(g,v.start*y.BYTES_PER_ELEMENT,y.subarray(v.start,v.start+v.count))}m.clearUpdateRanges()}S.count!==-1&&(t?s.bufferSubData(g,S.offset*y.BYTES_PER_ELEMENT,y,S.offset,S.count):s.bufferSubData(g,S.offset*y.BYTES_PER_ELEMENT,y.subarray(S.offset,S.offset+S.count)),S.count=-1),m.onUploadCallback()}function d(h){return h.isInterleavedBufferAttribute&&(h=h.data),r.get(h)}function u(h){h.isInterleavedBufferAttribute&&(h=h.data);const m=r.get(h);m&&(s.deleteBuffer(m.buffer),r.delete(h))}function f(h,m){if(h.isGLBufferAttribute){const y=r.get(h);(!y||y.version<h.version)&&r.set(h,{buffer:h.buffer,type:h.type,bytesPerElement:h.elementSize,version:h.version});return}h.isInterleavedBufferAttribute&&(h=h.data);const g=r.get(h);if(g===void 0)r.set(h,o(h,m));else if(g.version<h.version){if(g.size!==h.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");l(g.buffer,h,m),g.version=h.version}}return{get:d,remove:u,update:f}}class xc extends Rn{constructor(e=1,t=1,r=1,o=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:r,heightSegments:o};const l=e/2,d=t/2,u=Math.floor(r),f=Math.floor(o),h=u+1,m=f+1,g=e/u,y=t/f,S=[],E=[],M=[],_=[];for(let v=0;v<m;v++){const T=v*y-d;for(let A=0;A<h;A++){const P=A*g-l;E.push(P,-T,0),M.push(0,0,1),_.push(A/u),_.push(1-v/f)}}for(let v=0;v<f;v++)for(let T=0;T<u;T++){const A=T+h*v,P=T+h*(v+1),F=T+1+h*(v+1),D=T+1+h*v;S.push(A,P,D),S.push(P,F,D)}this.setIndex(S),this.setAttribute("position",new Ft(E,3)),this.setAttribute("normal",new Ft(M,3)),this.setAttribute("uv",new Ft(_,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xc(e.width,e.height,e.widthSegments,e.heightSegments)}}var cM=`#ifdef USE_ALPHAHASH
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
#endif`,_M=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,xM=`vec3 transformed = vec3( position );
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
#endif`,_E=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,xE=`#if defined( USE_POINTS_UV )
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
}`,_1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,x1=`uniform sampler2D tEquirect;
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
}`,_t={alphahash_fragment:cM,alphahash_pars_fragment:uM,alphamap_fragment:dM,alphamap_pars_fragment:fM,alphatest_fragment:hM,alphatest_pars_fragment:pM,aomap_fragment:mM,aomap_pars_fragment:gM,batching_pars_vertex:vM,batching_vertex:_M,begin_vertex:xM,beginnormal_vertex:yM,bsdfs:SM,iridescence_fragment:MM,bumpmap_pars_fragment:EM,clipping_planes_fragment:wM,clipping_planes_pars_fragment:TM,clipping_planes_pars_vertex:AM,clipping_planes_vertex:bM,color_fragment:CM,color_pars_fragment:RM,color_pars_vertex:PM,color_vertex:LM,common:NM,cube_uv_reflection_fragment:DM,defaultnormal_vertex:UM,displacementmap_pars_vertex:IM,displacementmap_vertex:OM,emissivemap_fragment:FM,emissivemap_pars_fragment:kM,colorspace_fragment:zM,colorspace_pars_fragment:BM,envmap_fragment:HM,envmap_common_pars_fragment:VM,envmap_pars_fragment:GM,envmap_pars_vertex:WM,envmap_physical_pars_fragment:nE,envmap_vertex:jM,fog_vertex:XM,fog_pars_vertex:$M,fog_fragment:YM,fog_pars_fragment:qM,gradientmap_pars_fragment:KM,lightmap_fragment:ZM,lightmap_pars_fragment:JM,lights_lambert_fragment:QM,lights_lambert_pars_fragment:eE,lights_pars_begin:tE,lights_toon_fragment:iE,lights_toon_pars_fragment:rE,lights_phong_fragment:sE,lights_phong_pars_fragment:oE,lights_physical_fragment:aE,lights_physical_pars_fragment:lE,lights_fragment_begin:cE,lights_fragment_maps:uE,lights_fragment_end:dE,logdepthbuf_fragment:fE,logdepthbuf_pars_fragment:hE,logdepthbuf_pars_vertex:pE,logdepthbuf_vertex:mE,map_fragment:gE,map_pars_fragment:vE,map_particle_fragment:_E,map_particle_pars_fragment:xE,metalnessmap_fragment:yE,metalnessmap_pars_fragment:SE,morphcolor_vertex:ME,morphnormal_vertex:EE,morphtarget_pars_vertex:wE,morphtarget_vertex:TE,normal_fragment_begin:AE,normal_fragment_maps:bE,normal_pars_fragment:CE,normal_pars_vertex:RE,normal_vertex:PE,normalmap_pars_fragment:LE,clearcoat_normal_fragment_begin:NE,clearcoat_normal_fragment_maps:DE,clearcoat_pars_fragment:UE,iridescence_pars_fragment:IE,opaque_fragment:OE,packing:FE,premultiplied_alpha_fragment:kE,project_vertex:zE,dithering_fragment:BE,dithering_pars_fragment:HE,roughnessmap_fragment:VE,roughnessmap_pars_fragment:GE,shadowmap_pars_fragment:WE,shadowmap_pars_vertex:jE,shadowmap_vertex:XE,shadowmask_pars_fragment:$E,skinbase_vertex:YE,skinning_pars_vertex:qE,skinning_vertex:KE,skinnormal_vertex:ZE,specularmap_fragment:JE,specularmap_pars_fragment:QE,tonemapping_fragment:e1,tonemapping_pars_fragment:t1,transmission_fragment:n1,transmission_pars_fragment:i1,uv_pars_fragment:r1,uv_pars_vertex:s1,uv_vertex:o1,worldpos_vertex:a1,background_vert:l1,background_frag:c1,backgroundCube_vert:u1,backgroundCube_frag:d1,cube_vert:f1,cube_frag:h1,depth_vert:p1,depth_frag:m1,distanceRGBA_vert:g1,distanceRGBA_frag:v1,equirect_vert:_1,equirect_frag:x1,linedashed_vert:y1,linedashed_frag:S1,meshbasic_vert:M1,meshbasic_frag:E1,meshlambert_vert:w1,meshlambert_frag:T1,meshmatcap_vert:A1,meshmatcap_frag:b1,meshnormal_vert:C1,meshnormal_frag:R1,meshphong_vert:P1,meshphong_frag:L1,meshphysical_vert:N1,meshphysical_frag:D1,meshtoon_vert:U1,meshtoon_frag:I1,points_vert:O1,points_frag:F1,shadow_vert:k1,shadow_frag:z1,sprite_vert:B1,sprite_frag:H1},Oe={common:{diffuse:{value:new St(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new yt},alphaMap:{value:null},alphaMapTransform:{value:new yt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new yt}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new yt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new yt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new yt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new yt},normalScale:{value:new Be(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new yt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new yt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new yt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new yt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new St(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new St(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new yt},alphaTest:{value:0},uvTransform:{value:new yt}},sprite:{diffuse:{value:new St(16777215)},opacity:{value:1},center:{value:new Be(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new yt},alphaMap:{value:null},alphaMapTransform:{value:new yt},alphaTest:{value:0}}},Ei={basic:{uniforms:An([Oe.common,Oe.specularmap,Oe.envmap,Oe.aomap,Oe.lightmap,Oe.fog]),vertexShader:_t.meshbasic_vert,fragmentShader:_t.meshbasic_frag},lambert:{uniforms:An([Oe.common,Oe.specularmap,Oe.envmap,Oe.aomap,Oe.lightmap,Oe.emissivemap,Oe.bumpmap,Oe.normalmap,Oe.displacementmap,Oe.fog,Oe.lights,{emissive:{value:new St(0)}}]),vertexShader:_t.meshlambert_vert,fragmentShader:_t.meshlambert_frag},phong:{uniforms:An([Oe.common,Oe.specularmap,Oe.envmap,Oe.aomap,Oe.lightmap,Oe.emissivemap,Oe.bumpmap,Oe.normalmap,Oe.displacementmap,Oe.fog,Oe.lights,{emissive:{value:new St(0)},specular:{value:new St(1118481)},shininess:{value:30}}]),vertexShader:_t.meshphong_vert,fragmentShader:_t.meshphong_frag},standard:{uniforms:An([Oe.common,Oe.envmap,Oe.aomap,Oe.lightmap,Oe.emissivemap,Oe.bumpmap,Oe.normalmap,Oe.displacementmap,Oe.roughnessmap,Oe.metalnessmap,Oe.fog,Oe.lights,{emissive:{value:new St(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:_t.meshphysical_vert,fragmentShader:_t.meshphysical_frag},toon:{uniforms:An([Oe.common,Oe.aomap,Oe.lightmap,Oe.emissivemap,Oe.bumpmap,Oe.normalmap,Oe.displacementmap,Oe.gradientmap,Oe.fog,Oe.lights,{emissive:{value:new St(0)}}]),vertexShader:_t.meshtoon_vert,fragmentShader:_t.meshtoon_frag},matcap:{uniforms:An([Oe.common,Oe.bumpmap,Oe.normalmap,Oe.displacementmap,Oe.fog,{matcap:{value:null}}]),vertexShader:_t.meshmatcap_vert,fragmentShader:_t.meshmatcap_frag},points:{uniforms:An([Oe.points,Oe.fog]),vertexShader:_t.points_vert,fragmentShader:_t.points_frag},dashed:{uniforms:An([Oe.common,Oe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:_t.linedashed_vert,fragmentShader:_t.linedashed_frag},depth:{uniforms:An([Oe.common,Oe.displacementmap]),vertexShader:_t.depth_vert,fragmentShader:_t.depth_frag},normal:{uniforms:An([Oe.common,Oe.bumpmap,Oe.normalmap,Oe.displacementmap,{opacity:{value:1}}]),vertexShader:_t.meshnormal_vert,fragmentShader:_t.meshnormal_frag},sprite:{uniforms:An([Oe.sprite,Oe.fog]),vertexShader:_t.sprite_vert,fragmentShader:_t.sprite_frag},background:{uniforms:{uvTransform:{value:new yt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:_t.background_vert,fragmentShader:_t.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:_t.backgroundCube_vert,fragmentShader:_t.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:_t.cube_vert,fragmentShader:_t.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:_t.equirect_vert,fragmentShader:_t.equirect_frag},distanceRGBA:{uniforms:An([Oe.common,Oe.displacementmap,{referencePosition:{value:new z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:_t.distanceRGBA_vert,fragmentShader:_t.distanceRGBA_frag},shadow:{uniforms:An([Oe.lights,Oe.fog,{color:{value:new St(0)},opacity:{value:1}}]),vertexShader:_t.shadow_vert,fragmentShader:_t.shadow_frag}};Ei.physical={uniforms:An([Ei.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new yt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new yt},clearcoatNormalScale:{value:new Be(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new yt},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new yt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new yt},sheen:{value:0},sheenColor:{value:new St(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new yt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new yt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new yt},transmissionSamplerSize:{value:new Be},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new yt},attenuationDistance:{value:0},attenuationColor:{value:new St(0)},specularColor:{value:new St(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new yt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new yt},anisotropyVector:{value:new Be},anisotropyMap:{value:null},anisotropyMapTransform:{value:new yt}}]),vertexShader:_t.meshphysical_vert,fragmentShader:_t.meshphysical_frag};const Vl={r:0,b:0,g:0};function V1(s,e,t,r,o,l,d){const u=new St(0);let f=l===!0?0:1,h,m,g=null,y=0,S=null;function E(_,v){let T=!1,A=v.isScene===!0?v.background:null;A&&A.isTexture&&(A=(v.backgroundBlurriness>0?t:e).get(A)),A===null?M(u,f):A&&A.isColor&&(M(A,1),T=!0);const P=s.xr.getEnvironmentBlendMode();P==="additive"?r.buffers.color.setClear(0,0,0,1,d):P==="alpha-blend"&&r.buffers.color.setClear(0,0,0,0,d),(s.autoClear||T)&&s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil),A&&(A.isCubeTexture||A.mapping===mc)?(m===void 0&&(m=new Rt(new Yi(1,1,1),new as({name:"BackgroundCubeMaterial",uniforms:uo(Ei.backgroundCube.uniforms),vertexShader:Ei.backgroundCube.vertexShader,fragmentShader:Ei.backgroundCube.fragmentShader,side:Cn,depthTest:!1,depthWrite:!1,fog:!1})),m.geometry.deleteAttribute("normal"),m.geometry.deleteAttribute("uv"),m.onBeforeRender=function(F,D,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(m.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),o.update(m)),m.material.uniforms.envMap.value=A,m.material.uniforms.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,m.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,m.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,m.material.toneMapped=Lt.getTransfer(A.colorSpace)!==Ot,(g!==A||y!==A.version||S!==s.toneMapping)&&(m.material.needsUpdate=!0,g=A,y=A.version,S=s.toneMapping),m.layers.enableAll(),_.unshift(m,m.geometry,m.material,0,0,null)):A&&A.isTexture&&(h===void 0&&(h=new Rt(new xc(2,2),new as({name:"BackgroundMaterial",uniforms:uo(Ei.background.uniforms),vertexShader:Ei.background.vertexShader,fragmentShader:Ei.background.fragmentShader,side:Pr,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),Object.defineProperty(h.material,"map",{get:function(){return this.uniforms.t2D.value}}),o.update(h)),h.material.uniforms.t2D.value=A,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.toneMapped=Lt.getTransfer(A.colorSpace)!==Ot,A.matrixAutoUpdate===!0&&A.updateMatrix(),h.material.uniforms.uvTransform.value.copy(A.matrix),(g!==A||y!==A.version||S!==s.toneMapping)&&(h.material.needsUpdate=!0,g=A,y=A.version,S=s.toneMapping),h.layers.enableAll(),_.unshift(h,h.geometry,h.material,0,0,null))}function M(_,v){_.getRGB(Vl,Vv(s)),r.buffers.color.setClear(Vl.r,Vl.g,Vl.b,v,d)}return{getClearColor:function(){return u},setClearColor:function(_,v=1){u.set(_),f=v,M(u,f)},getClearAlpha:function(){return f},setClearAlpha:function(_){f=_,M(u,f)},render:E}}function G1(s,e,t,r){const o=s.getParameter(s.MAX_VERTEX_ATTRIBS),l=r.isWebGL2?null:e.get("OES_vertex_array_object"),d=r.isWebGL2||l!==null,u={},f=_(null);let h=f,m=!1;function g(H,q,te,J,X){let K=!1;if(d){const $=M(J,te,q);h!==$&&(h=$,S(h.object)),K=v(H,J,te,X),K&&T(H,J,te,X)}else{const $=q.wireframe===!0;(h.geometry!==J.id||h.program!==te.id||h.wireframe!==$)&&(h.geometry=J.id,h.program=te.id,h.wireframe=$,K=!0)}X!==null&&t.update(X,s.ELEMENT_ARRAY_BUFFER),(K||m)&&(m=!1,ie(H,q,te,J),X!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(X).buffer))}function y(){return r.isWebGL2?s.createVertexArray():l.createVertexArrayOES()}function S(H){return r.isWebGL2?s.bindVertexArray(H):l.bindVertexArrayOES(H)}function E(H){return r.isWebGL2?s.deleteVertexArray(H):l.deleteVertexArrayOES(H)}function M(H,q,te){const J=te.wireframe===!0;let X=u[H.id];X===void 0&&(X={},u[H.id]=X);let K=X[q.id];K===void 0&&(K={},X[q.id]=K);let $=K[J];return $===void 0&&($=_(y()),K[J]=$),$}function _(H){const q=[],te=[],J=[];for(let X=0;X<o;X++)q[X]=0,te[X]=0,J[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:q,enabledAttributes:te,attributeDivisors:J,object:H,attributes:{},index:null}}function v(H,q,te,J){const X=h.attributes,K=q.attributes;let $=0;const O=te.getAttributes();for(const W in O)if(O[W].location>=0){const de=X[W];let ve=K[W];if(ve===void 0&&(W==="instanceMatrix"&&H.instanceMatrix&&(ve=H.instanceMatrix),W==="instanceColor"&&H.instanceColor&&(ve=H.instanceColor)),de===void 0||de.attribute!==ve||ve&&de.data!==ve.data)return!0;$++}return h.attributesNum!==$||h.index!==J}function T(H,q,te,J){const X={},K=q.attributes;let $=0;const O=te.getAttributes();for(const W in O)if(O[W].location>=0){let de=K[W];de===void 0&&(W==="instanceMatrix"&&H.instanceMatrix&&(de=H.instanceMatrix),W==="instanceColor"&&H.instanceColor&&(de=H.instanceColor));const ve={};ve.attribute=de,de&&de.data&&(ve.data=de.data),X[W]=ve,$++}h.attributes=X,h.attributesNum=$,h.index=J}function A(){const H=h.newAttributes;for(let q=0,te=H.length;q<te;q++)H[q]=0}function P(H){F(H,0)}function F(H,q){const te=h.newAttributes,J=h.enabledAttributes,X=h.attributeDivisors;te[H]=1,J[H]===0&&(s.enableVertexAttribArray(H),J[H]=1),X[H]!==q&&((r.isWebGL2?s:e.get("ANGLE_instanced_arrays"))[r.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](H,q),X[H]=q)}function D(){const H=h.newAttributes,q=h.enabledAttributes;for(let te=0,J=q.length;te<J;te++)q[te]!==H[te]&&(s.disableVertexAttribArray(te),q[te]=0)}function I(H,q,te,J,X,K,$){$===!0?s.vertexAttribIPointer(H,q,te,X,K):s.vertexAttribPointer(H,q,te,J,X,K)}function ie(H,q,te,J){if(r.isWebGL2===!1&&(H.isInstancedMesh||J.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;A();const X=J.attributes,K=te.getAttributes(),$=q.defaultAttributeValues;for(const O in K){const W=K[O];if(W.location>=0){let Y=X[O];if(Y===void 0&&(O==="instanceMatrix"&&H.instanceMatrix&&(Y=H.instanceMatrix),O==="instanceColor"&&H.instanceColor&&(Y=H.instanceColor)),Y!==void 0){const de=Y.normalized,ve=Y.itemSize,Te=t.get(Y);if(Te===void 0)continue;const Ae=Te.buffer,Fe=Te.type,ge=Te.bytesPerElement,be=r.isWebGL2===!0&&(Fe===s.INT||Fe===s.UNSIGNED_INT||Y.gpuType===wv);if(Y.isInterleavedBufferAttribute){const ze=Y.data,Q=ze.stride,tt=Y.offset;if(ze.isInstancedInterleavedBuffer){for(let ke=0;ke<W.locationSize;ke++)F(W.location+ke,ze.meshPerAttribute);H.isInstancedMesh!==!0&&J._maxInstanceCount===void 0&&(J._maxInstanceCount=ze.meshPerAttribute*ze.count)}else for(let ke=0;ke<W.locationSize;ke++)P(W.location+ke);s.bindBuffer(s.ARRAY_BUFFER,Ae);for(let ke=0;ke<W.locationSize;ke++)I(W.location+ke,ve/W.locationSize,Fe,de,Q*ge,(tt+ve/W.locationSize*ke)*ge,be)}else{if(Y.isInstancedBufferAttribute){for(let ze=0;ze<W.locationSize;ze++)F(W.location+ze,Y.meshPerAttribute);H.isInstancedMesh!==!0&&J._maxInstanceCount===void 0&&(J._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let ze=0;ze<W.locationSize;ze++)P(W.location+ze);s.bindBuffer(s.ARRAY_BUFFER,Ae);for(let ze=0;ze<W.locationSize;ze++)I(W.location+ze,ve/W.locationSize,Fe,de,ve*ge,ve/W.locationSize*ze*ge,be)}}else if($!==void 0){const de=$[O];if(de!==void 0)switch(de.length){case 2:s.vertexAttrib2fv(W.location,de);break;case 3:s.vertexAttrib3fv(W.location,de);break;case 4:s.vertexAttrib4fv(W.location,de);break;default:s.vertexAttrib1fv(W.location,de)}}}}D()}function R(){le();for(const H in u){const q=u[H];for(const te in q){const J=q[te];for(const X in J)E(J[X].object),delete J[X];delete q[te]}delete u[H]}}function U(H){if(u[H.id]===void 0)return;const q=u[H.id];for(const te in q){const J=q[te];for(const X in J)E(J[X].object),delete J[X];delete q[te]}delete u[H.id]}function se(H){for(const q in u){const te=u[q];if(te[H.id]===void 0)continue;const J=te[H.id];for(const X in J)E(J[X].object),delete J[X];delete te[H.id]}}function le(){me(),m=!0,h!==f&&(h=f,S(h.object))}function me(){f.geometry=null,f.program=null,f.wireframe=!1}return{setup:g,reset:le,resetDefaultState:me,dispose:R,releaseStatesOfGeometry:U,releaseStatesOfProgram:se,initAttributes:A,enableAttribute:P,disableUnusedAttributes:D}}function W1(s,e,t,r){const o=r.isWebGL2;let l;function d(m){l=m}function u(m,g){s.drawArrays(l,m,g),t.update(g,l,1)}function f(m,g,y){if(y===0)return;let S,E;if(o)S=s,E="drawArraysInstanced";else if(S=e.get("ANGLE_instanced_arrays"),E="drawArraysInstancedANGLE",S===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}S[E](l,m,g,y),t.update(g,l,y)}function h(m,g,y){if(y===0)return;const S=e.get("WEBGL_multi_draw");if(S===null)for(let E=0;E<y;E++)this.render(m[E],g[E]);else{S.multiDrawArraysWEBGL(l,m,0,g,0,y);let E=0;for(let M=0;M<y;M++)E+=g[M];t.update(E,l,1)}}this.setMode=d,this.render=u,this.renderInstances=f,this.renderMultiDraw=h}function j1(s,e,t){let r;function o(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const I=e.get("EXT_texture_filter_anisotropic");r=s.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function l(I){if(I==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const d=typeof WebGL2RenderingContext<"u"&&s.constructor.name==="WebGL2RenderingContext";let u=t.precision!==void 0?t.precision:"highp";const f=l(u);f!==u&&(console.warn("THREE.WebGLRenderer:",u,"not supported, using",f,"instead."),u=f);const h=d||e.has("WEBGL_draw_buffers"),m=t.logarithmicDepthBuffer===!0,g=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),y=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),S=s.getParameter(s.MAX_TEXTURE_SIZE),E=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),M=s.getParameter(s.MAX_VERTEX_ATTRIBS),_=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),v=s.getParameter(s.MAX_VARYING_VECTORS),T=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),A=y>0,P=d||e.has("OES_texture_float"),F=A&&P,D=d?s.getParameter(s.MAX_SAMPLES):0;return{isWebGL2:d,drawBuffers:h,getMaxAnisotropy:o,getMaxPrecision:l,precision:u,logarithmicDepthBuffer:m,maxTextures:g,maxVertexTextures:y,maxTextureSize:S,maxCubemapSize:E,maxAttributes:M,maxVertexUniforms:_,maxVaryings:v,maxFragmentUniforms:T,vertexTextures:A,floatFragmentTextures:P,floatVertexTextures:F,maxSamples:D}}function X1(s){const e=this;let t=null,r=0,o=!1,l=!1;const d=new Sr,u=new yt,f={value:null,needsUpdate:!1};this.uniform=f,this.numPlanes=0,this.numIntersection=0,this.init=function(g,y){const S=g.length!==0||y||r!==0||o;return o=y,r=g.length,S},this.beginShadows=function(){l=!0,m(null)},this.endShadows=function(){l=!1},this.setGlobalState=function(g,y){t=m(g,y,0)},this.setState=function(g,y,S){const E=g.clippingPlanes,M=g.clipIntersection,_=g.clipShadows,v=s.get(g);if(!o||E===null||E.length===0||l&&!_)l?m(null):h();else{const T=l?0:r,A=T*4;let P=v.clippingState||null;f.value=P,P=m(E,y,A,S);for(let F=0;F!==A;++F)P[F]=t[F];v.clippingState=P,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=T}};function h(){f.value!==t&&(f.value=t,f.needsUpdate=r>0),e.numPlanes=r,e.numIntersection=0}function m(g,y,S,E){const M=g!==null?g.length:0;let _=null;if(M!==0){if(_=f.value,E!==!0||_===null){const v=S+M*4,T=y.matrixWorldInverse;u.getNormalMatrix(T),(_===null||_.length<v)&&(_=new Float32Array(v));for(let A=0,P=S;A!==M;++A,P+=4)d.copy(g[A]).applyMatrix4(T,u),d.normal.toArray(_,P),_[P+3]=d.constant}f.value=_,f.needsUpdate=!0}return e.numPlanes=M,e.numIntersection=0,_}}function $1(s){let e=new WeakMap;function t(d,u){return u===qd?d.mapping=ao:u===Kd&&(d.mapping=lo),d}function r(d){if(d&&d.isTexture){const u=d.mapping;if(u===qd||u===Kd)if(e.has(d)){const f=e.get(d).texture;return t(f,d.mapping)}else{const f=d.image;if(f&&f.height>0){const h=new sM(f.height/2);return h.fromEquirectangularTexture(s,d),e.set(d,h),d.addEventListener("dispose",o),t(h.texture,d.mapping)}else return null}}return d}function o(d){const u=d.target;u.removeEventListener("dispose",o);const f=e.get(u);f!==void 0&&(e.delete(u),f.dispose())}function l(){e=new WeakMap}return{get:r,dispose:l}}class Xv extends Gv{constructor(e=-1,t=1,r=1,o=-1,l=.1,d=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=r,this.bottom=o,this.near=l,this.far=d,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,r,o,l,d){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=r,this.view.offsetY=o,this.view.width=l,this.view.height=d,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),r=(this.right+this.left)/2,o=(this.top+this.bottom)/2;let l=r-e,d=r+e,u=o+t,f=o-t;if(this.view!==null&&this.view.enabled){const h=(this.right-this.left)/this.view.fullWidth/this.zoom,m=(this.top-this.bottom)/this.view.fullHeight/this.zoom;l+=h*this.view.offsetX,d=l+h*this.view.width,u-=m*this.view.offsetY,f=u-m*this.view.height}this.projectionMatrix.makeOrthographic(l,d,u,f,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const eo=4,dg=[.125,.215,.35,.446,.526,.582],Qr=20,Cd=new Xv,fg=new St;let Rd=null,Pd=0,Ld=0;const Zr=(1+Math.sqrt(5))/2,qs=1/Zr,hg=[new z(1,1,1),new z(-1,1,1),new z(1,1,-1),new z(-1,1,-1),new z(0,Zr,qs),new z(0,Zr,-qs),new z(qs,0,Zr),new z(-qs,0,Zr),new z(Zr,qs,0),new z(-Zr,qs,0)];class ef{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,r=.1,o=100){Rd=this._renderer.getRenderTarget(),Pd=this._renderer.getActiveCubeFace(),Ld=this._renderer.getActiveMipmapLevel(),this._setSize(256);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,r,o,l),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=gg(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=mg(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Rd,Pd,Ld),e.scissorTest=!1,Gl(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ao||e.mapping===lo?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Rd=this._renderer.getRenderTarget(),Pd=this._renderer.getActiveCubeFace(),Ld=this._renderer.getActiveMipmapLevel();const r=t||this._allocateTargets();return this._textureToCubeUV(e,r),this._applyPMREM(r),this._cleanup(r),r}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,r={magFilter:ii,minFilter:ii,generateMipmaps:!1,type:ca,format:gi,colorSpace:ji,depthBuffer:!1},o=pg(e,t,r);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=pg(e,t,r);const{_lodMax:l}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Y1(l)),this._blurMaterial=q1(l,e,t)}return o}_compileMaterial(e){const t=new Rt(this._lodPlanes[0],e);this._renderer.compile(t,Cd)}_sceneToCubeUV(e,t,r,o){const u=new $n(90,1,t,r),f=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],m=this._renderer,g=m.autoClear,y=m.toneMapping;m.getClearColor(fg),m.toneMapping=Cr,m.autoClear=!1;const S=new so({name:"PMREM.Background",side:Cn,depthWrite:!1,depthTest:!1}),E=new Rt(new Yi,S);let M=!1;const _=e.background;_?_.isColor&&(S.color.copy(_),e.background=null,M=!0):(S.color.copy(fg),M=!0);for(let v=0;v<6;v++){const T=v%3;T===0?(u.up.set(0,f[v],0),u.lookAt(h[v],0,0)):T===1?(u.up.set(0,0,f[v]),u.lookAt(0,h[v],0)):(u.up.set(0,f[v],0),u.lookAt(0,0,h[v]));const A=this._cubeSize;Gl(o,T*A,v>2?A:0,A,A),m.setRenderTarget(o),M&&m.render(E,u),m.render(e,u)}E.geometry.dispose(),E.material.dispose(),m.toneMapping=y,m.autoClear=g,e.background=_}_textureToCubeUV(e,t){const r=this._renderer,o=e.mapping===ao||e.mapping===lo;o?(this._cubemapMaterial===null&&(this._cubemapMaterial=gg()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=mg());const l=o?this._cubemapMaterial:this._equirectMaterial,d=new Rt(this._lodPlanes[0],l),u=l.uniforms;u.envMap.value=e;const f=this._cubeSize;Gl(t,0,0,3*f,2*f),r.setRenderTarget(t),r.render(d,Cd)}_applyPMREM(e){const t=this._renderer,r=t.autoClear;t.autoClear=!1;for(let o=1;o<this._lodPlanes.length;o++){const l=Math.sqrt(this._sigmas[o]*this._sigmas[o]-this._sigmas[o-1]*this._sigmas[o-1]),d=hg[(o-1)%hg.length];this._blur(e,o-1,o,l,d)}t.autoClear=r}_blur(e,t,r,o,l){const d=this._pingPongRenderTarget;this._halfBlur(e,d,t,r,o,"latitudinal",l),this._halfBlur(d,e,r,r,o,"longitudinal",l)}_halfBlur(e,t,r,o,l,d,u){const f=this._renderer,h=this._blurMaterial;d!=="latitudinal"&&d!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const m=3,g=new Rt(this._lodPlanes[o],h),y=h.uniforms,S=this._sizeLods[r]-1,E=isFinite(l)?Math.PI/(2*S):2*Math.PI/(2*Qr-1),M=l/E,_=isFinite(l)?1+Math.floor(m*M):Qr;_>Qr&&console.warn(`sigmaRadians, ${l}, is too large and will clip, as it requested ${_} samples when the maximum is set to ${Qr}`);const v=[];let T=0;for(let I=0;I<Qr;++I){const ie=I/M,R=Math.exp(-ie*ie/2);v.push(R),I===0?T+=R:I<_&&(T+=2*R)}for(let I=0;I<v.length;I++)v[I]=v[I]/T;y.envMap.value=e.texture,y.samples.value=_,y.weights.value=v,y.latitudinal.value=d==="latitudinal",u&&(y.poleAxis.value=u);const{_lodMax:A}=this;y.dTheta.value=E,y.mipInt.value=A-r;const P=this._sizeLods[o],F=3*P*(o>A-eo?o-A+eo:0),D=4*(this._cubeSize-P);Gl(t,F,D,3*P,2*P),f.setRenderTarget(t),f.render(g,Cd)}}function Y1(s){const e=[],t=[],r=[];let o=s;const l=s-eo+1+dg.length;for(let d=0;d<l;d++){const u=Math.pow(2,o);t.push(u);let f=1/u;d>s-eo?f=dg[d-s+eo-1]:d===0&&(f=0),r.push(f);const h=1/(u-2),m=-h,g=1+h,y=[m,m,g,m,g,g,m,m,g,g,m,g],S=6,E=6,M=3,_=2,v=1,T=new Float32Array(M*E*S),A=new Float32Array(_*E*S),P=new Float32Array(v*E*S);for(let D=0;D<S;D++){const I=D%3*2/3-1,ie=D>2?0:-1,R=[I,ie,0,I+2/3,ie,0,I+2/3,ie+1,0,I,ie,0,I+2/3,ie+1,0,I,ie+1,0];T.set(R,M*E*D),A.set(y,_*E*D);const U=[D,D,D,D,D,D];P.set(U,v*E*D)}const F=new Rn;F.setAttribute("position",new Yn(T,M)),F.setAttribute("uv",new Yn(A,_)),F.setAttribute("faceIndex",new Yn(P,v)),e.push(F),o>eo&&o--}return{lodPlanes:e,sizeLods:t,sigmas:r}}function pg(s,e,t){const r=new os(s,e,t);return r.texture.mapping=mc,r.texture.name="PMREM.cubeUv",r.scissorTest=!0,r}function Gl(s,e,t,r,o){s.viewport.set(e,t,r,o),s.scissor.set(e,t,r,o)}function q1(s,e,t){const r=new Float32Array(Qr),o=new z(0,1,0);return new as({name:"SphericalGaussianBlur",defines:{n:Qr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:o}},vertexShader:gf(),fragmentShader:`

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
		`,blending:br,depthTest:!1,depthWrite:!1})}function mg(){return new as({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:gf(),fragmentShader:`

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
		`,blending:br,depthTest:!1,depthWrite:!1})}function gg(){return new as({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:gf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:br,depthTest:!1,depthWrite:!1})}function gf(){return`

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
	`}function K1(s){let e=new WeakMap,t=null;function r(u){if(u&&u.isTexture){const f=u.mapping,h=f===qd||f===Kd,m=f===ao||f===lo;if(h||m)if(u.isRenderTargetTexture&&u.needsPMREMUpdate===!0){u.needsPMREMUpdate=!1;let g=e.get(u);return t===null&&(t=new ef(s)),g=h?t.fromEquirectangular(u,g):t.fromCubemap(u,g),e.set(u,g),g.texture}else{if(e.has(u))return e.get(u).texture;{const g=u.image;if(h&&g&&g.height>0||m&&g&&o(g)){t===null&&(t=new ef(s));const y=h?t.fromEquirectangular(u):t.fromCubemap(u);return e.set(u,y),u.addEventListener("dispose",l),y.texture}else return null}}}return u}function o(u){let f=0;const h=6;for(let m=0;m<h;m++)u[m]!==void 0&&f++;return f===h}function l(u){const f=u.target;f.removeEventListener("dispose",l);const h=e.get(f);h!==void 0&&(e.delete(f),h.dispose())}function d(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:r,dispose:d}}function Z1(s){const e={};function t(r){if(e[r]!==void 0)return e[r];let o;switch(r){case"WEBGL_depth_texture":o=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":o=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":o=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":o=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:o=s.getExtension(r)}return e[r]=o,o}return{has:function(r){return t(r)!==null},init:function(r){r.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(r){const o=t(r);return o===null&&console.warn("THREE.WebGLRenderer: "+r+" extension not supported."),o}}}function J1(s,e,t,r){const o={},l=new WeakMap;function d(g){const y=g.target;y.index!==null&&e.remove(y.index);for(const E in y.attributes)e.remove(y.attributes[E]);for(const E in y.morphAttributes){const M=y.morphAttributes[E];for(let _=0,v=M.length;_<v;_++)e.remove(M[_])}y.removeEventListener("dispose",d),delete o[y.id];const S=l.get(y);S&&(e.remove(S),l.delete(y)),r.releaseStatesOfGeometry(y),y.isInstancedBufferGeometry===!0&&delete y._maxInstanceCount,t.memory.geometries--}function u(g,y){return o[y.id]===!0||(y.addEventListener("dispose",d),o[y.id]=!0,t.memory.geometries++),y}function f(g){const y=g.attributes;for(const E in y)e.update(y[E],s.ARRAY_BUFFER);const S=g.morphAttributes;for(const E in S){const M=S[E];for(let _=0,v=M.length;_<v;_++)e.update(M[_],s.ARRAY_BUFFER)}}function h(g){const y=[],S=g.index,E=g.attributes.position;let M=0;if(S!==null){const T=S.array;M=S.version;for(let A=0,P=T.length;A<P;A+=3){const F=T[A+0],D=T[A+1],I=T[A+2];y.push(F,D,D,I,I,F)}}else if(E!==void 0){const T=E.array;M=E.version;for(let A=0,P=T.length/3-1;A<P;A+=3){const F=A+0,D=A+1,I=A+2;y.push(F,D,D,I,I,F)}}else return;const _=new(Uv(y)?Hv:Bv)(y,1);_.version=M;const v=l.get(g);v&&e.remove(v),l.set(g,_)}function m(g){const y=l.get(g);if(y){const S=g.index;S!==null&&y.version<S.version&&h(g)}else h(g);return l.get(g)}return{get:u,update:f,getWireframeAttribute:m}}function Q1(s,e,t,r){const o=r.isWebGL2;let l;function d(S){l=S}let u,f;function h(S){u=S.type,f=S.bytesPerElement}function m(S,E){s.drawElements(l,E,u,S*f),t.update(E,l,1)}function g(S,E,M){if(M===0)return;let _,v;if(o)_=s,v="drawElementsInstanced";else if(_=e.get("ANGLE_instanced_arrays"),v="drawElementsInstancedANGLE",_===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}_[v](l,E,u,S*f,M),t.update(E,l,M)}function y(S,E,M){if(M===0)return;const _=e.get("WEBGL_multi_draw");if(_===null)for(let v=0;v<M;v++)this.render(S[v]/f,E[v]);else{_.multiDrawElementsWEBGL(l,E,0,u,S,0,M);let v=0;for(let T=0;T<M;T++)v+=E[T];t.update(v,l,1)}}this.setMode=d,this.setIndex=h,this.render=m,this.renderInstances=g,this.renderMultiDraw=y}function ew(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function r(l,d,u){switch(t.calls++,d){case s.TRIANGLES:t.triangles+=u*(l/3);break;case s.LINES:t.lines+=u*(l/2);break;case s.LINE_STRIP:t.lines+=u*(l-1);break;case s.LINE_LOOP:t.lines+=u*l;break;case s.POINTS:t.points+=u*l;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",d);break}}function o(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:o,update:r}}function tw(s,e){return s[0]-e[0]}function nw(s,e){return Math.abs(e[1])-Math.abs(s[1])}function iw(s,e,t){const r={},o=new Float32Array(8),l=new WeakMap,d=new Bt,u=[];for(let h=0;h<8;h++)u[h]=[h,0];function f(h,m,g){const y=h.morphTargetInfluences;if(e.isWebGL2===!0){const E=m.morphAttributes.position||m.morphAttributes.normal||m.morphAttributes.color,M=E!==void 0?E.length:0;let _=l.get(m);if(_===void 0||_.count!==M){let q=function(){me.dispose(),l.delete(m),m.removeEventListener("dispose",q)};var S=q;_!==void 0&&_.texture.dispose();const A=m.morphAttributes.position!==void 0,P=m.morphAttributes.normal!==void 0,F=m.morphAttributes.color!==void 0,D=m.morphAttributes.position||[],I=m.morphAttributes.normal||[],ie=m.morphAttributes.color||[];let R=0;A===!0&&(R=1),P===!0&&(R=2),F===!0&&(R=3);let U=m.attributes.position.count*R,se=1;U>e.maxTextureSize&&(se=Math.ceil(U/e.maxTextureSize),U=e.maxTextureSize);const le=new Float32Array(U*se*4*M),me=new Fv(le,U,se,M);me.type=wr,me.needsUpdate=!0;const H=R*4;for(let te=0;te<M;te++){const J=D[te],X=I[te],K=ie[te],$=U*se*4*te;for(let O=0;O<J.count;O++){const W=O*H;A===!0&&(d.fromBufferAttribute(J,O),le[$+W+0]=d.x,le[$+W+1]=d.y,le[$+W+2]=d.z,le[$+W+3]=0),P===!0&&(d.fromBufferAttribute(X,O),le[$+W+4]=d.x,le[$+W+5]=d.y,le[$+W+6]=d.z,le[$+W+7]=0),F===!0&&(d.fromBufferAttribute(K,O),le[$+W+8]=d.x,le[$+W+9]=d.y,le[$+W+10]=d.z,le[$+W+11]=K.itemSize===4?d.w:1)}}_={count:M,texture:me,size:new Be(U,se)},l.set(m,_),m.addEventListener("dispose",q)}let v=0;for(let A=0;A<y.length;A++)v+=y[A];const T=m.morphTargetsRelative?1:1-v;g.getUniforms().setValue(s,"morphTargetBaseInfluence",T),g.getUniforms().setValue(s,"morphTargetInfluences",y),g.getUniforms().setValue(s,"morphTargetsTexture",_.texture,t),g.getUniforms().setValue(s,"morphTargetsTextureSize",_.size)}else{const E=y===void 0?0:y.length;let M=r[m.id];if(M===void 0||M.length!==E){M=[];for(let P=0;P<E;P++)M[P]=[P,0];r[m.id]=M}for(let P=0;P<E;P++){const F=M[P];F[0]=P,F[1]=y[P]}M.sort(nw);for(let P=0;P<8;P++)P<E&&M[P][1]?(u[P][0]=M[P][0],u[P][1]=M[P][1]):(u[P][0]=Number.MAX_SAFE_INTEGER,u[P][1]=0);u.sort(tw);const _=m.morphAttributes.position,v=m.morphAttributes.normal;let T=0;for(let P=0;P<8;P++){const F=u[P],D=F[0],I=F[1];D!==Number.MAX_SAFE_INTEGER&&I?(_&&m.getAttribute("morphTarget"+P)!==_[D]&&m.setAttribute("morphTarget"+P,_[D]),v&&m.getAttribute("morphNormal"+P)!==v[D]&&m.setAttribute("morphNormal"+P,v[D]),o[P]=I,T+=I):(_&&m.hasAttribute("morphTarget"+P)===!0&&m.deleteAttribute("morphTarget"+P),v&&m.hasAttribute("morphNormal"+P)===!0&&m.deleteAttribute("morphNormal"+P),o[P]=0)}const A=m.morphTargetsRelative?1:1-T;g.getUniforms().setValue(s,"morphTargetBaseInfluence",A),g.getUniforms().setValue(s,"morphTargetInfluences",o)}}return{update:f}}function rw(s,e,t,r){let o=new WeakMap;function l(f){const h=r.render.frame,m=f.geometry,g=e.get(f,m);if(o.get(g)!==h&&(e.update(g),o.set(g,h)),f.isInstancedMesh&&(f.hasEventListener("dispose",u)===!1&&f.addEventListener("dispose",u),o.get(f)!==h&&(t.update(f.instanceMatrix,s.ARRAY_BUFFER),f.instanceColor!==null&&t.update(f.instanceColor,s.ARRAY_BUFFER),o.set(f,h))),f.isSkinnedMesh){const y=f.skeleton;o.get(y)!==h&&(y.update(),o.set(y,h))}return g}function d(){o=new WeakMap}function u(f){const h=f.target;h.removeEventListener("dispose",u),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:l,dispose:d}}class $v extends zn{constructor(e,t,r,o,l,d,u,f,h,m){if(m=m!==void 0?m:ns,m!==ns&&m!==co)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");r===void 0&&m===ns&&(r=Er),r===void 0&&m===co&&(r=ts),super(null,o,l,d,u,f,m,r,h),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=u!==void 0?u:bn,this.minFilter=f!==void 0?f:bn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Yv=new zn,qv=new $v(1,1);qv.compareFunction=Dv;const Kv=new Fv,Zv=new VS,Jv=new Wv,vg=[],_g=[],xg=new Float32Array(16),yg=new Float32Array(9),Sg=new Float32Array(4);function go(s,e,t){const r=s[0];if(r<=0||r>0)return s;const o=e*t;let l=vg[o];if(l===void 0&&(l=new Float32Array(o),vg[o]=l),e!==0){r.toArray(l,0);for(let d=1,u=0;d!==e;++d)u+=t,s[d].toArray(l,u)}return l}function rn(s,e){if(s.length!==e.length)return!1;for(let t=0,r=s.length;t<r;t++)if(s[t]!==e[t])return!1;return!0}function sn(s,e){for(let t=0,r=e.length;t<r;t++)s[t]=e[t]}function yc(s,e){let t=_g[e];t===void 0&&(t=new Int32Array(e),_g[e]=t);for(let r=0;r!==e;++r)t[r]=s.allocateTextureUnit();return t}function sw(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function ow(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(rn(t,e))return;s.uniform2fv(this.addr,e),sn(t,e)}}function aw(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(rn(t,e))return;s.uniform3fv(this.addr,e),sn(t,e)}}function lw(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(rn(t,e))return;s.uniform4fv(this.addr,e),sn(t,e)}}function cw(s,e){const t=this.cache,r=e.elements;if(r===void 0){if(rn(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),sn(t,e)}else{if(rn(t,r))return;Sg.set(r),s.uniformMatrix2fv(this.addr,!1,Sg),sn(t,r)}}function uw(s,e){const t=this.cache,r=e.elements;if(r===void 0){if(rn(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),sn(t,e)}else{if(rn(t,r))return;yg.set(r),s.uniformMatrix3fv(this.addr,!1,yg),sn(t,r)}}function dw(s,e){const t=this.cache,r=e.elements;if(r===void 0){if(rn(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),sn(t,e)}else{if(rn(t,r))return;xg.set(r),s.uniformMatrix4fv(this.addr,!1,xg),sn(t,r)}}function fw(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function hw(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(rn(t,e))return;s.uniform2iv(this.addr,e),sn(t,e)}}function pw(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(rn(t,e))return;s.uniform3iv(this.addr,e),sn(t,e)}}function mw(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(rn(t,e))return;s.uniform4iv(this.addr,e),sn(t,e)}}function gw(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function vw(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(rn(t,e))return;s.uniform2uiv(this.addr,e),sn(t,e)}}function _w(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(rn(t,e))return;s.uniform3uiv(this.addr,e),sn(t,e)}}function xw(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(rn(t,e))return;s.uniform4uiv(this.addr,e),sn(t,e)}}function yw(s,e,t){const r=this.cache,o=t.allocateTextureUnit();r[0]!==o&&(s.uniform1i(this.addr,o),r[0]=o);const l=this.type===s.SAMPLER_2D_SHADOW?qv:Yv;t.setTexture2D(e||l,o)}function Sw(s,e,t){const r=this.cache,o=t.allocateTextureUnit();r[0]!==o&&(s.uniform1i(this.addr,o),r[0]=o),t.setTexture3D(e||Zv,o)}function Mw(s,e,t){const r=this.cache,o=t.allocateTextureUnit();r[0]!==o&&(s.uniform1i(this.addr,o),r[0]=o),t.setTextureCube(e||Jv,o)}function Ew(s,e,t){const r=this.cache,o=t.allocateTextureUnit();r[0]!==o&&(s.uniform1i(this.addr,o),r[0]=o),t.setTexture2DArray(e||Kv,o)}function ww(s){switch(s){case 5126:return sw;case 35664:return ow;case 35665:return aw;case 35666:return lw;case 35674:return cw;case 35675:return uw;case 35676:return dw;case 5124:case 35670:return fw;case 35667:case 35671:return hw;case 35668:case 35672:return pw;case 35669:case 35673:return mw;case 5125:return gw;case 36294:return vw;case 36295:return _w;case 36296:return xw;case 35678:case 36198:case 36298:case 36306:case 35682:return yw;case 35679:case 36299:case 36307:return Sw;case 35680:case 36300:case 36308:case 36293:return Mw;case 36289:case 36303:case 36311:case 36292:return Ew}}function Tw(s,e){s.uniform1fv(this.addr,e)}function Aw(s,e){const t=go(e,this.size,2);s.uniform2fv(this.addr,t)}function bw(s,e){const t=go(e,this.size,3);s.uniform3fv(this.addr,t)}function Cw(s,e){const t=go(e,this.size,4);s.uniform4fv(this.addr,t)}function Rw(s,e){const t=go(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function Pw(s,e){const t=go(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function Lw(s,e){const t=go(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function Nw(s,e){s.uniform1iv(this.addr,e)}function Dw(s,e){s.uniform2iv(this.addr,e)}function Uw(s,e){s.uniform3iv(this.addr,e)}function Iw(s,e){s.uniform4iv(this.addr,e)}function Ow(s,e){s.uniform1uiv(this.addr,e)}function Fw(s,e){s.uniform2uiv(this.addr,e)}function kw(s,e){s.uniform3uiv(this.addr,e)}function zw(s,e){s.uniform4uiv(this.addr,e)}function Bw(s,e,t){const r=this.cache,o=e.length,l=yc(t,o);rn(r,l)||(s.uniform1iv(this.addr,l),sn(r,l));for(let d=0;d!==o;++d)t.setTexture2D(e[d]||Yv,l[d])}function Hw(s,e,t){const r=this.cache,o=e.length,l=yc(t,o);rn(r,l)||(s.uniform1iv(this.addr,l),sn(r,l));for(let d=0;d!==o;++d)t.setTexture3D(e[d]||Zv,l[d])}function Vw(s,e,t){const r=this.cache,o=e.length,l=yc(t,o);rn(r,l)||(s.uniform1iv(this.addr,l),sn(r,l));for(let d=0;d!==o;++d)t.setTextureCube(e[d]||Jv,l[d])}function Gw(s,e,t){const r=this.cache,o=e.length,l=yc(t,o);rn(r,l)||(s.uniform1iv(this.addr,l),sn(r,l));for(let d=0;d!==o;++d)t.setTexture2DArray(e[d]||Kv,l[d])}function Ww(s){switch(s){case 5126:return Tw;case 35664:return Aw;case 35665:return bw;case 35666:return Cw;case 35674:return Rw;case 35675:return Pw;case 35676:return Lw;case 5124:case 35670:return Nw;case 35667:case 35671:return Dw;case 35668:case 35672:return Uw;case 35669:case 35673:return Iw;case 5125:return Ow;case 36294:return Fw;case 36295:return kw;case 36296:return zw;case 35678:case 36198:case 36298:case 36306:case 35682:return Bw;case 35679:case 36299:case 36307:return Hw;case 35680:case 36300:case 36308:case 36293:return Vw;case 36289:case 36303:case 36311:case 36292:return Gw}}class jw{constructor(e,t,r){this.id=e,this.addr=r,this.cache=[],this.type=t.type,this.setValue=ww(t.type)}}class Xw{constructor(e,t,r){this.id=e,this.addr=r,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Ww(t.type)}}class $w{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,r){const o=this.seq;for(let l=0,d=o.length;l!==d;++l){const u=o[l];u.setValue(e,t[u.id],r)}}}const Nd=/(\w+)(\])?(\[|\.)?/g;function Mg(s,e){s.seq.push(e),s.map[e.id]=e}function Yw(s,e,t){const r=s.name,o=r.length;for(Nd.lastIndex=0;;){const l=Nd.exec(r),d=Nd.lastIndex;let u=l[1];const f=l[2]==="]",h=l[3];if(f&&(u=u|0),h===void 0||h==="["&&d+2===o){Mg(t,h===void 0?new jw(u,s,e):new Xw(u,s,e));break}else{let g=t.map[u];g===void 0&&(g=new $w(u),Mg(t,g)),t=g}}}class Zl{constructor(e,t){this.seq=[],this.map={};const r=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<r;++o){const l=e.getActiveUniform(t,o),d=e.getUniformLocation(t,l.name);Yw(l,d,this)}}setValue(e,t,r,o){const l=this.map[t];l!==void 0&&l.setValue(e,r,o)}setOptional(e,t,r){const o=t[r];o!==void 0&&this.setValue(e,r,o)}static upload(e,t,r,o){for(let l=0,d=t.length;l!==d;++l){const u=t[l],f=r[u.id];f.needsUpdate!==!1&&u.setValue(e,f.value,o)}}static seqWithValue(e,t){const r=[];for(let o=0,l=e.length;o!==l;++o){const d=e[o];d.id in t&&r.push(d)}return r}}function Eg(s,e,t){const r=s.createShader(e);return s.shaderSource(r,t),s.compileShader(r),r}const qw=37297;let Kw=0;function Zw(s,e){const t=s.split(`
`),r=[],o=Math.max(e-6,0),l=Math.min(e+6,t.length);for(let d=o;d<l;d++){const u=d+1;r.push(`${u===e?">":" "} ${u}: ${t[d]}`)}return r.join(`
`)}function Jw(s){const e=Lt.getPrimaries(Lt.workingColorSpace),t=Lt.getPrimaries(s);let r;switch(e===t?r="":e===sc&&t===rc?r="LinearDisplayP3ToLinearSRGB":e===rc&&t===sc&&(r="LinearSRGBToLinearDisplayP3"),s){case ji:case gc:return[r,"LinearTransferOETF"];case un:case ff:return[r,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",s),[r,"LinearTransferOETF"]}}function wg(s,e,t){const r=s.getShaderParameter(e,s.COMPILE_STATUS),o=s.getShaderInfoLog(e).trim();if(r&&o==="")return"";const l=/ERROR: 0:(\d+)/.exec(o);if(l){const d=parseInt(l[1]);return t.toUpperCase()+`

`+o+`

`+Zw(s.getShaderSource(e),d)}else return o}function Qw(s,e){const t=Jw(e);return`vec4 ${s}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function eT(s,e){let t;switch(e){case Qy:t="Linear";break;case eS:t="Reinhard";break;case tS:t="OptimizedCineon";break;case Mv:t="ACESFilmic";break;case iS:t="AgX";break;case nS:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function tT(s){return[s.extensionDerivatives||s.envMapCubeUVHeight||s.bumpMap||s.normalMapTangentSpace||s.clearcoatNormalMap||s.flatShading||s.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(s.extensionFragDepth||s.logarithmicDepthBuffer)&&s.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",s.extensionDrawBuffers&&s.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(s.extensionShaderTextureLOD||s.envMap||s.transmission)&&s.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(to).join(`
`)}function nT(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(to).join(`
`)}function iT(s){const e=[];for(const t in s){const r=s[t];r!==!1&&e.push("#define "+t+" "+r)}return e.join(`
`)}function rT(s,e){const t={},r=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let o=0;o<r;o++){const l=s.getActiveAttrib(e,o),d=l.name;let u=1;l.type===s.FLOAT_MAT2&&(u=2),l.type===s.FLOAT_MAT3&&(u=3),l.type===s.FLOAT_MAT4&&(u=4),t[d]={type:l.type,location:s.getAttribLocation(e,d),locationSize:u}}return t}function to(s){return s!==""}function Tg(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Ag(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const sT=/^[ \t]*#include +<([\w\d./]+)>/gm;function tf(s){return s.replace(sT,aT)}const oT=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function aT(s,e){let t=_t[e];if(t===void 0){const r=oT.get(e);if(r!==void 0)t=_t[r],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,r);else throw new Error("Can not resolve #include <"+e+">")}return tf(t)}const lT=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function bg(s){return s.replace(lT,cT)}function cT(s,e,t,r){let o="";for(let l=parseInt(e);l<parseInt(t);l++)o+=r.replace(/\[\s*i\s*\]/g,"[ "+l+" ]").replace(/UNROLLED_LOOP_INDEX/g,l);return o}function Cg(s){let e="precision "+s.precision+` float;
precision `+s.precision+" int;";return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function uT(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===xv?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===yv?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Gi&&(e="SHADOWMAP_TYPE_VSM"),e}function dT(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case ao:case lo:e="ENVMAP_TYPE_CUBE";break;case mc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function fT(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case lo:e="ENVMAP_MODE_REFRACTION";break}return e}function hT(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Sv:e="ENVMAP_BLENDING_MULTIPLY";break;case Zy:e="ENVMAP_BLENDING_MIX";break;case Jy:e="ENVMAP_BLENDING_ADD";break}return e}function pT(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,r=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:r,maxMip:t}}function mT(s,e,t,r){const o=s.getContext(),l=t.defines;let d=t.vertexShader,u=t.fragmentShader;const f=uT(t),h=dT(t),m=fT(t),g=hT(t),y=pT(t),S=t.isWebGL2?"":tT(t),E=nT(t),M=iT(l),_=o.createProgram();let v,T,A=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(v=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M].filter(to).join(`
`),v.length>0&&(v+=`
`),T=[S,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M].filter(to).join(`
`),T.length>0&&(T+=`
`)):(v=[Cg(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+m:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+f:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(to).join(`
`),T=[S,Cg(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.envMap?"#define "+m:"",t.envMap?"#define "+g:"",y?"#define CUBEUV_TEXEL_WIDTH "+y.texelWidth:"",y?"#define CUBEUV_TEXEL_HEIGHT "+y.texelHeight:"",y?"#define CUBEUV_MAX_MIP "+y.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+f:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Cr?"#define TONE_MAPPING":"",t.toneMapping!==Cr?_t.tonemapping_pars_fragment:"",t.toneMapping!==Cr?eT("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",_t.colorspace_pars_fragment,Qw("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(to).join(`
`)),d=tf(d),d=Tg(d,t),d=Ag(d,t),u=tf(u),u=Tg(u,t),u=Ag(u,t),d=bg(d),u=bg(u),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(A=`#version 300 es
`,v=[E,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+v,T=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===$m?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===$m?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+T);const P=A+v+d,F=A+T+u,D=Eg(o,o.VERTEX_SHADER,P),I=Eg(o,o.FRAGMENT_SHADER,F);o.attachShader(_,D),o.attachShader(_,I),t.index0AttributeName!==void 0?o.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&o.bindAttribLocation(_,0,"position"),o.linkProgram(_);function ie(le){if(s.debug.checkShaderErrors){const me=o.getProgramInfoLog(_).trim(),H=o.getShaderInfoLog(D).trim(),q=o.getShaderInfoLog(I).trim();let te=!0,J=!0;if(o.getProgramParameter(_,o.LINK_STATUS)===!1)if(te=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(o,_,D,I);else{const X=wg(o,D,"vertex"),K=wg(o,I,"fragment");console.error("THREE.WebGLProgram: Shader Error "+o.getError()+" - VALIDATE_STATUS "+o.getProgramParameter(_,o.VALIDATE_STATUS)+`

Program Info Log: `+me+`
`+X+`
`+K)}else me!==""?console.warn("THREE.WebGLProgram: Program Info Log:",me):(H===""||q==="")&&(J=!1);J&&(le.diagnostics={runnable:te,programLog:me,vertexShader:{log:H,prefix:v},fragmentShader:{log:q,prefix:T}})}o.deleteShader(D),o.deleteShader(I),R=new Zl(o,_),U=rT(o,_)}let R;this.getUniforms=function(){return R===void 0&&ie(this),R};let U;this.getAttributes=function(){return U===void 0&&ie(this),U};let se=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return se===!1&&(se=o.getProgramParameter(_,qw)),se},this.destroy=function(){r.releaseStatesOfProgram(this),o.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Kw++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=D,this.fragmentShader=I,this}let gT=0;class vT{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,r=e.fragmentShader,o=this._getShaderStage(t),l=this._getShaderStage(r),d=this._getShaderCacheForMaterial(e);return d.has(o)===!1&&(d.add(o),o.usedTimes++),d.has(l)===!1&&(d.add(l),l.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const r of t)r.usedTimes--,r.usedTimes===0&&this.shaderCache.delete(r.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let r=t.get(e);return r===void 0&&(r=new Set,t.set(e,r)),r}_getShaderStage(e){const t=this.shaderCache;let r=t.get(e);return r===void 0&&(r=new _T(e),t.set(e,r)),r}}class _T{constructor(e){this.id=gT++,this.code=e,this.usedTimes=0}}function xT(s,e,t,r,o,l,d){const u=new kv,f=new vT,h=[],m=o.isWebGL2,g=o.logarithmicDepthBuffer,y=o.vertexTextures;let S=o.precision;const E={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function M(R){return R===0?"uv":`uv${R}`}function _(R,U,se,le,me){const H=le.fog,q=me.geometry,te=R.isMeshStandardMaterial?le.environment:null,J=(R.isMeshStandardMaterial?t:e).get(R.envMap||te),X=J&&J.mapping===mc?J.image.height:null,K=E[R.type];R.precision!==null&&(S=o.getMaxPrecision(R.precision),S!==R.precision&&console.warn("THREE.WebGLProgram.getParameters:",R.precision,"not supported, using",S,"instead."));const $=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,O=$!==void 0?$.length:0;let W=0;q.morphAttributes.position!==void 0&&(W=1),q.morphAttributes.normal!==void 0&&(W=2),q.morphAttributes.color!==void 0&&(W=3);let Y,de,ve,Te;if(K){const Ct=Ei[K];Y=Ct.vertexShader,de=Ct.fragmentShader}else Y=R.vertexShader,de=R.fragmentShader,f.update(R),ve=f.getVertexShaderID(R),Te=f.getFragmentShaderID(R);const Ae=s.getRenderTarget(),Fe=me.isInstancedMesh===!0,ge=me.isBatchedMesh===!0,be=!!R.map,ze=!!R.matcap,Q=!!J,tt=!!R.aoMap,ke=!!R.lightMap,Je=!!R.bumpMap,Ve=!!R.normalMap,Mt=!!R.displacementMap,ot=!!R.emissiveMap,L=!!R.metalnessMap,C=!!R.roughnessMap,re=R.anisotropy>0,Me=R.clearcoat>0,ye=R.iridescence>0,we=R.sheen>0,Ke=R.transmission>0,Ie=re&&!!R.anisotropyMap,He=Me&&!!R.clearcoatMap,Ye=Me&&!!R.clearcoatNormalMap,it=Me&&!!R.clearcoatRoughnessMap,_e=ye&&!!R.iridescenceMap,pt=ye&&!!R.iridescenceThicknessMap,B=we&&!!R.sheenColorMap,xe=we&&!!R.sheenRoughnessMap,Ue=!!R.specularMap,Re=!!R.specularColorMap,Xe=!!R.specularIntensityMap,dt=Ke&&!!R.transmissionMap,mt=Ke&&!!R.thicknessMap,st=!!R.gradientMap,Le=!!R.alphaMap,V=R.alphaTest>0,Pe=!!R.alphaHash,Ne=!!R.extensions,oe=!!q.attributes.uv1,pe=!!q.attributes.uv2,rt=!!q.attributes.uv3;let et=Cr;return R.toneMapped&&(Ae===null||Ae.isXRRenderTarget===!0)&&(et=s.toneMapping),{isWebGL2:m,shaderID:K,shaderType:R.type,shaderName:R.name,vertexShader:Y,fragmentShader:de,defines:R.defines,customVertexShaderID:ve,customFragmentShaderID:Te,isRawShaderMaterial:R.isRawShaderMaterial===!0,glslVersion:R.glslVersion,precision:S,batching:ge,instancing:Fe,instancingColor:Fe&&me.instanceColor!==null,supportsVertexTextures:y,outputColorSpace:Ae===null?s.outputColorSpace:Ae.isXRRenderTarget===!0?Ae.texture.colorSpace:ji,map:be,matcap:ze,envMap:Q,envMapMode:Q&&J.mapping,envMapCubeUVHeight:X,aoMap:tt,lightMap:ke,bumpMap:Je,normalMap:Ve,displacementMap:y&&Mt,emissiveMap:ot,normalMapObjectSpace:Ve&&R.normalMapType===mS,normalMapTangentSpace:Ve&&R.normalMapType===Nv,metalnessMap:L,roughnessMap:C,anisotropy:re,anisotropyMap:Ie,clearcoat:Me,clearcoatMap:He,clearcoatNormalMap:Ye,clearcoatRoughnessMap:it,iridescence:ye,iridescenceMap:_e,iridescenceThicknessMap:pt,sheen:we,sheenColorMap:B,sheenRoughnessMap:xe,specularMap:Ue,specularColorMap:Re,specularIntensityMap:Xe,transmission:Ke,transmissionMap:dt,thicknessMap:mt,gradientMap:st,opaque:R.transparent===!1&&R.blending===no,alphaMap:Le,alphaTest:V,alphaHash:Pe,combine:R.combine,mapUv:be&&M(R.map.channel),aoMapUv:tt&&M(R.aoMap.channel),lightMapUv:ke&&M(R.lightMap.channel),bumpMapUv:Je&&M(R.bumpMap.channel),normalMapUv:Ve&&M(R.normalMap.channel),displacementMapUv:Mt&&M(R.displacementMap.channel),emissiveMapUv:ot&&M(R.emissiveMap.channel),metalnessMapUv:L&&M(R.metalnessMap.channel),roughnessMapUv:C&&M(R.roughnessMap.channel),anisotropyMapUv:Ie&&M(R.anisotropyMap.channel),clearcoatMapUv:He&&M(R.clearcoatMap.channel),clearcoatNormalMapUv:Ye&&M(R.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:it&&M(R.clearcoatRoughnessMap.channel),iridescenceMapUv:_e&&M(R.iridescenceMap.channel),iridescenceThicknessMapUv:pt&&M(R.iridescenceThicknessMap.channel),sheenColorMapUv:B&&M(R.sheenColorMap.channel),sheenRoughnessMapUv:xe&&M(R.sheenRoughnessMap.channel),specularMapUv:Ue&&M(R.specularMap.channel),specularColorMapUv:Re&&M(R.specularColorMap.channel),specularIntensityMapUv:Xe&&M(R.specularIntensityMap.channel),transmissionMapUv:dt&&M(R.transmissionMap.channel),thicknessMapUv:mt&&M(R.thicknessMap.channel),alphaMapUv:Le&&M(R.alphaMap.channel),vertexTangents:!!q.attributes.tangent&&(Ve||re),vertexColors:R.vertexColors,vertexAlphas:R.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,vertexUv1s:oe,vertexUv2s:pe,vertexUv3s:rt,pointsUvs:me.isPoints===!0&&!!q.attributes.uv&&(be||Le),fog:!!H,useFog:R.fog===!0,fogExp2:H&&H.isFogExp2,flatShading:R.flatShading===!0,sizeAttenuation:R.sizeAttenuation===!0,logarithmicDepthBuffer:g,skinning:me.isSkinnedMesh===!0,morphTargets:q.morphAttributes.position!==void 0,morphNormals:q.morphAttributes.normal!==void 0,morphColors:q.morphAttributes.color!==void 0,morphTargetsCount:O,morphTextureStride:W,numDirLights:U.directional.length,numPointLights:U.point.length,numSpotLights:U.spot.length,numSpotLightMaps:U.spotLightMap.length,numRectAreaLights:U.rectArea.length,numHemiLights:U.hemi.length,numDirLightShadows:U.directionalShadowMap.length,numPointLightShadows:U.pointShadowMap.length,numSpotLightShadows:U.spotShadowMap.length,numSpotLightShadowsWithMaps:U.numSpotLightShadowsWithMaps,numLightProbes:U.numLightProbes,numClippingPlanes:d.numPlanes,numClipIntersection:d.numIntersection,dithering:R.dithering,shadowMapEnabled:s.shadowMap.enabled&&se.length>0,shadowMapType:s.shadowMap.type,toneMapping:et,useLegacyLights:s._useLegacyLights,decodeVideoTexture:be&&R.map.isVideoTexture===!0&&Lt.getTransfer(R.map.colorSpace)===Ot,premultipliedAlpha:R.premultipliedAlpha,doubleSided:R.side===wi,flipSided:R.side===Cn,useDepthPacking:R.depthPacking>=0,depthPacking:R.depthPacking||0,index0AttributeName:R.index0AttributeName,extensionDerivatives:Ne&&R.extensions.derivatives===!0,extensionFragDepth:Ne&&R.extensions.fragDepth===!0,extensionDrawBuffers:Ne&&R.extensions.drawBuffers===!0,extensionShaderTextureLOD:Ne&&R.extensions.shaderTextureLOD===!0,extensionClipCullDistance:Ne&&R.extensions.clipCullDistance&&r.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:m||r.has("EXT_frag_depth"),rendererExtensionDrawBuffers:m||r.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:m||r.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:r.has("KHR_parallel_shader_compile"),customProgramCacheKey:R.customProgramCacheKey()}}function v(R){const U=[];if(R.shaderID?U.push(R.shaderID):(U.push(R.customVertexShaderID),U.push(R.customFragmentShaderID)),R.defines!==void 0)for(const se in R.defines)U.push(se),U.push(R.defines[se]);return R.isRawShaderMaterial===!1&&(T(U,R),A(U,R),U.push(s.outputColorSpace)),U.push(R.customProgramCacheKey),U.join()}function T(R,U){R.push(U.precision),R.push(U.outputColorSpace),R.push(U.envMapMode),R.push(U.envMapCubeUVHeight),R.push(U.mapUv),R.push(U.alphaMapUv),R.push(U.lightMapUv),R.push(U.aoMapUv),R.push(U.bumpMapUv),R.push(U.normalMapUv),R.push(U.displacementMapUv),R.push(U.emissiveMapUv),R.push(U.metalnessMapUv),R.push(U.roughnessMapUv),R.push(U.anisotropyMapUv),R.push(U.clearcoatMapUv),R.push(U.clearcoatNormalMapUv),R.push(U.clearcoatRoughnessMapUv),R.push(U.iridescenceMapUv),R.push(U.iridescenceThicknessMapUv),R.push(U.sheenColorMapUv),R.push(U.sheenRoughnessMapUv),R.push(U.specularMapUv),R.push(U.specularColorMapUv),R.push(U.specularIntensityMapUv),R.push(U.transmissionMapUv),R.push(U.thicknessMapUv),R.push(U.combine),R.push(U.fogExp2),R.push(U.sizeAttenuation),R.push(U.morphTargetsCount),R.push(U.morphAttributeCount),R.push(U.numDirLights),R.push(U.numPointLights),R.push(U.numSpotLights),R.push(U.numSpotLightMaps),R.push(U.numHemiLights),R.push(U.numRectAreaLights),R.push(U.numDirLightShadows),R.push(U.numPointLightShadows),R.push(U.numSpotLightShadows),R.push(U.numSpotLightShadowsWithMaps),R.push(U.numLightProbes),R.push(U.shadowMapType),R.push(U.toneMapping),R.push(U.numClippingPlanes),R.push(U.numClipIntersection),R.push(U.depthPacking)}function A(R,U){u.disableAll(),U.isWebGL2&&u.enable(0),U.supportsVertexTextures&&u.enable(1),U.instancing&&u.enable(2),U.instancingColor&&u.enable(3),U.matcap&&u.enable(4),U.envMap&&u.enable(5),U.normalMapObjectSpace&&u.enable(6),U.normalMapTangentSpace&&u.enable(7),U.clearcoat&&u.enable(8),U.iridescence&&u.enable(9),U.alphaTest&&u.enable(10),U.vertexColors&&u.enable(11),U.vertexAlphas&&u.enable(12),U.vertexUv1s&&u.enable(13),U.vertexUv2s&&u.enable(14),U.vertexUv3s&&u.enable(15),U.vertexTangents&&u.enable(16),U.anisotropy&&u.enable(17),U.alphaHash&&u.enable(18),U.batching&&u.enable(19),R.push(u.mask),u.disableAll(),U.fog&&u.enable(0),U.useFog&&u.enable(1),U.flatShading&&u.enable(2),U.logarithmicDepthBuffer&&u.enable(3),U.skinning&&u.enable(4),U.morphTargets&&u.enable(5),U.morphNormals&&u.enable(6),U.morphColors&&u.enable(7),U.premultipliedAlpha&&u.enable(8),U.shadowMapEnabled&&u.enable(9),U.useLegacyLights&&u.enable(10),U.doubleSided&&u.enable(11),U.flipSided&&u.enable(12),U.useDepthPacking&&u.enable(13),U.dithering&&u.enable(14),U.transmission&&u.enable(15),U.sheen&&u.enable(16),U.opaque&&u.enable(17),U.pointsUvs&&u.enable(18),U.decodeVideoTexture&&u.enable(19),R.push(u.mask)}function P(R){const U=E[R.type];let se;if(U){const le=Ei[U];se=tM.clone(le.uniforms)}else se=R.uniforms;return se}function F(R,U){let se;for(let le=0,me=h.length;le<me;le++){const H=h[le];if(H.cacheKey===U){se=H,++se.usedTimes;break}}return se===void 0&&(se=new mT(s,U,R,l),h.push(se)),se}function D(R){if(--R.usedTimes===0){const U=h.indexOf(R);h[U]=h[h.length-1],h.pop(),R.destroy()}}function I(R){f.remove(R)}function ie(){f.dispose()}return{getParameters:_,getProgramCacheKey:v,getUniforms:P,acquireProgram:F,releaseProgram:D,releaseShaderCache:I,programs:h,dispose:ie}}function yT(){let s=new WeakMap;function e(l){let d=s.get(l);return d===void 0&&(d={},s.set(l,d)),d}function t(l){s.delete(l)}function r(l,d,u){s.get(l)[d]=u}function o(){s=new WeakMap}return{get:e,remove:t,update:r,dispose:o}}function ST(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function Rg(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function Pg(){const s=[];let e=0;const t=[],r=[],o=[];function l(){e=0,t.length=0,r.length=0,o.length=0}function d(g,y,S,E,M,_){let v=s[e];return v===void 0?(v={id:g.id,object:g,geometry:y,material:S,groupOrder:E,renderOrder:g.renderOrder,z:M,group:_},s[e]=v):(v.id=g.id,v.object=g,v.geometry=y,v.material=S,v.groupOrder=E,v.renderOrder=g.renderOrder,v.z=M,v.group=_),e++,v}function u(g,y,S,E,M,_){const v=d(g,y,S,E,M,_);S.transmission>0?r.push(v):S.transparent===!0?o.push(v):t.push(v)}function f(g,y,S,E,M,_){const v=d(g,y,S,E,M,_);S.transmission>0?r.unshift(v):S.transparent===!0?o.unshift(v):t.unshift(v)}function h(g,y){t.length>1&&t.sort(g||ST),r.length>1&&r.sort(y||Rg),o.length>1&&o.sort(y||Rg)}function m(){for(let g=e,y=s.length;g<y;g++){const S=s[g];if(S.id===null)break;S.id=null,S.object=null,S.geometry=null,S.material=null,S.group=null}}return{opaque:t,transmissive:r,transparent:o,init:l,push:u,unshift:f,finish:m,sort:h}}function MT(){let s=new WeakMap;function e(r,o){const l=s.get(r);let d;return l===void 0?(d=new Pg,s.set(r,[d])):o>=l.length?(d=new Pg,l.push(d)):d=l[o],d}function t(){s=new WeakMap}return{get:e,dispose:t}}function ET(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new z,color:new St};break;case"SpotLight":t={position:new z,direction:new z,color:new St,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new z,color:new St,distance:0,decay:0};break;case"HemisphereLight":t={direction:new z,skyColor:new St,groundColor:new St};break;case"RectAreaLight":t={color:new St,position:new z,halfWidth:new z,halfHeight:new z};break}return s[e.id]=t,t}}}function wT(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Be};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Be};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Be,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let TT=0;function AT(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function bT(s,e){const t=new ET,r=wT(),o={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let m=0;m<9;m++)o.probe.push(new z);const l=new z,d=new Ht,u=new Ht;function f(m,g){let y=0,S=0,E=0;for(let le=0;le<9;le++)o.probe[le].set(0,0,0);let M=0,_=0,v=0,T=0,A=0,P=0,F=0,D=0,I=0,ie=0,R=0;m.sort(AT);const U=g===!0?Math.PI:1;for(let le=0,me=m.length;le<me;le++){const H=m[le],q=H.color,te=H.intensity,J=H.distance,X=H.shadow&&H.shadow.map?H.shadow.map.texture:null;if(H.isAmbientLight)y+=q.r*te*U,S+=q.g*te*U,E+=q.b*te*U;else if(H.isLightProbe){for(let K=0;K<9;K++)o.probe[K].addScaledVector(H.sh.coefficients[K],te);R++}else if(H.isDirectionalLight){const K=t.get(H);if(K.color.copy(H.color).multiplyScalar(H.intensity*U),H.castShadow){const $=H.shadow,O=r.get(H);O.shadowBias=$.bias,O.shadowNormalBias=$.normalBias,O.shadowRadius=$.radius,O.shadowMapSize=$.mapSize,o.directionalShadow[M]=O,o.directionalShadowMap[M]=X,o.directionalShadowMatrix[M]=H.shadow.matrix,P++}o.directional[M]=K,M++}else if(H.isSpotLight){const K=t.get(H);K.position.setFromMatrixPosition(H.matrixWorld),K.color.copy(q).multiplyScalar(te*U),K.distance=J,K.coneCos=Math.cos(H.angle),K.penumbraCos=Math.cos(H.angle*(1-H.penumbra)),K.decay=H.decay,o.spot[v]=K;const $=H.shadow;if(H.map&&(o.spotLightMap[I]=H.map,I++,$.updateMatrices(H),H.castShadow&&ie++),o.spotLightMatrix[v]=$.matrix,H.castShadow){const O=r.get(H);O.shadowBias=$.bias,O.shadowNormalBias=$.normalBias,O.shadowRadius=$.radius,O.shadowMapSize=$.mapSize,o.spotShadow[v]=O,o.spotShadowMap[v]=X,D++}v++}else if(H.isRectAreaLight){const K=t.get(H);K.color.copy(q).multiplyScalar(te),K.halfWidth.set(H.width*.5,0,0),K.halfHeight.set(0,H.height*.5,0),o.rectArea[T]=K,T++}else if(H.isPointLight){const K=t.get(H);if(K.color.copy(H.color).multiplyScalar(H.intensity*U),K.distance=H.distance,K.decay=H.decay,H.castShadow){const $=H.shadow,O=r.get(H);O.shadowBias=$.bias,O.shadowNormalBias=$.normalBias,O.shadowRadius=$.radius,O.shadowMapSize=$.mapSize,O.shadowCameraNear=$.camera.near,O.shadowCameraFar=$.camera.far,o.pointShadow[_]=O,o.pointShadowMap[_]=X,o.pointShadowMatrix[_]=H.shadow.matrix,F++}o.point[_]=K,_++}else if(H.isHemisphereLight){const K=t.get(H);K.skyColor.copy(H.color).multiplyScalar(te*U),K.groundColor.copy(H.groundColor).multiplyScalar(te*U),o.hemi[A]=K,A++}}T>0&&(e.isWebGL2?s.has("OES_texture_float_linear")===!0?(o.rectAreaLTC1=Oe.LTC_FLOAT_1,o.rectAreaLTC2=Oe.LTC_FLOAT_2):(o.rectAreaLTC1=Oe.LTC_HALF_1,o.rectAreaLTC2=Oe.LTC_HALF_2):s.has("OES_texture_float_linear")===!0?(o.rectAreaLTC1=Oe.LTC_FLOAT_1,o.rectAreaLTC2=Oe.LTC_FLOAT_2):s.has("OES_texture_half_float_linear")===!0?(o.rectAreaLTC1=Oe.LTC_HALF_1,o.rectAreaLTC2=Oe.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),o.ambient[0]=y,o.ambient[1]=S,o.ambient[2]=E;const se=o.hash;(se.directionalLength!==M||se.pointLength!==_||se.spotLength!==v||se.rectAreaLength!==T||se.hemiLength!==A||se.numDirectionalShadows!==P||se.numPointShadows!==F||se.numSpotShadows!==D||se.numSpotMaps!==I||se.numLightProbes!==R)&&(o.directional.length=M,o.spot.length=v,o.rectArea.length=T,o.point.length=_,o.hemi.length=A,o.directionalShadow.length=P,o.directionalShadowMap.length=P,o.pointShadow.length=F,o.pointShadowMap.length=F,o.spotShadow.length=D,o.spotShadowMap.length=D,o.directionalShadowMatrix.length=P,o.pointShadowMatrix.length=F,o.spotLightMatrix.length=D+I-ie,o.spotLightMap.length=I,o.numSpotLightShadowsWithMaps=ie,o.numLightProbes=R,se.directionalLength=M,se.pointLength=_,se.spotLength=v,se.rectAreaLength=T,se.hemiLength=A,se.numDirectionalShadows=P,se.numPointShadows=F,se.numSpotShadows=D,se.numSpotMaps=I,se.numLightProbes=R,o.version=TT++)}function h(m,g){let y=0,S=0,E=0,M=0,_=0;const v=g.matrixWorldInverse;for(let T=0,A=m.length;T<A;T++){const P=m[T];if(P.isDirectionalLight){const F=o.directional[y];F.direction.setFromMatrixPosition(P.matrixWorld),l.setFromMatrixPosition(P.target.matrixWorld),F.direction.sub(l),F.direction.transformDirection(v),y++}else if(P.isSpotLight){const F=o.spot[E];F.position.setFromMatrixPosition(P.matrixWorld),F.position.applyMatrix4(v),F.direction.setFromMatrixPosition(P.matrixWorld),l.setFromMatrixPosition(P.target.matrixWorld),F.direction.sub(l),F.direction.transformDirection(v),E++}else if(P.isRectAreaLight){const F=o.rectArea[M];F.position.setFromMatrixPosition(P.matrixWorld),F.position.applyMatrix4(v),u.identity(),d.copy(P.matrixWorld),d.premultiply(v),u.extractRotation(d),F.halfWidth.set(P.width*.5,0,0),F.halfHeight.set(0,P.height*.5,0),F.halfWidth.applyMatrix4(u),F.halfHeight.applyMatrix4(u),M++}else if(P.isPointLight){const F=o.point[S];F.position.setFromMatrixPosition(P.matrixWorld),F.position.applyMatrix4(v),S++}else if(P.isHemisphereLight){const F=o.hemi[_];F.direction.setFromMatrixPosition(P.matrixWorld),F.direction.transformDirection(v),_++}}}return{setup:f,setupView:h,state:o}}function Lg(s,e){const t=new bT(s,e),r=[],o=[];function l(){r.length=0,o.length=0}function d(g){r.push(g)}function u(g){o.push(g)}function f(g){t.setup(r,g)}function h(g){t.setupView(r,g)}return{init:l,state:{lightsArray:r,shadowsArray:o,lights:t},setupLights:f,setupLightsView:h,pushLight:d,pushShadow:u}}function CT(s,e){let t=new WeakMap;function r(l,d=0){const u=t.get(l);let f;return u===void 0?(f=new Lg(s,e),t.set(l,[f])):d>=u.length?(f=new Lg(s,e),u.push(f)):f=u[d],f}function o(){t=new WeakMap}return{get:r,dispose:o}}class RT extends mo{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=hS,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class PT extends mo{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const LT=`void main() {
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
}`;function DT(s,e,t){let r=new mf;const o=new Be,l=new Be,d=new Bt,u=new RT({depthPacking:pS}),f=new PT,h={},m=t.maxTextureSize,g={[Pr]:Cn,[Cn]:Pr,[wi]:wi},y=new as({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Be},radius:{value:4}},vertexShader:LT,fragmentShader:NT}),S=y.clone();S.defines.HORIZONTAL_PASS=1;const E=new Rn;E.setAttribute("position",new Yn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const M=new Rt(E,y),_=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=xv;let v=this.type;this.render=function(D,I,ie){if(_.enabled===!1||_.autoUpdate===!1&&_.needsUpdate===!1||D.length===0)return;const R=s.getRenderTarget(),U=s.getActiveCubeFace(),se=s.getActiveMipmapLevel(),le=s.state;le.setBlending(br),le.buffers.color.setClear(1,1,1,1),le.buffers.depth.setTest(!0),le.setScissorTest(!1);const me=v!==Gi&&this.type===Gi,H=v===Gi&&this.type!==Gi;for(let q=0,te=D.length;q<te;q++){const J=D[q],X=J.shadow;if(X===void 0){console.warn("THREE.WebGLShadowMap:",J,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;o.copy(X.mapSize);const K=X.getFrameExtents();if(o.multiply(K),l.copy(X.mapSize),(o.x>m||o.y>m)&&(o.x>m&&(l.x=Math.floor(m/K.x),o.x=l.x*K.x,X.mapSize.x=l.x),o.y>m&&(l.y=Math.floor(m/K.y),o.y=l.y*K.y,X.mapSize.y=l.y)),X.map===null||me===!0||H===!0){const O=this.type!==Gi?{minFilter:bn,magFilter:bn}:{};X.map!==null&&X.map.dispose(),X.map=new os(o.x,o.y,O),X.map.texture.name=J.name+".shadowMap",X.camera.updateProjectionMatrix()}s.setRenderTarget(X.map),s.clear();const $=X.getViewportCount();for(let O=0;O<$;O++){const W=X.getViewport(O);d.set(l.x*W.x,l.y*W.y,l.x*W.z,l.y*W.w),le.viewport(d),X.updateMatrices(J,O),r=X.getFrustum(),P(I,ie,X.camera,J,this.type)}X.isPointLightShadow!==!0&&this.type===Gi&&T(X,ie),X.needsUpdate=!1}v=this.type,_.needsUpdate=!1,s.setRenderTarget(R,U,se)};function T(D,I){const ie=e.update(M);y.defines.VSM_SAMPLES!==D.blurSamples&&(y.defines.VSM_SAMPLES=D.blurSamples,S.defines.VSM_SAMPLES=D.blurSamples,y.needsUpdate=!0,S.needsUpdate=!0),D.mapPass===null&&(D.mapPass=new os(o.x,o.y)),y.uniforms.shadow_pass.value=D.map.texture,y.uniforms.resolution.value=D.mapSize,y.uniforms.radius.value=D.radius,s.setRenderTarget(D.mapPass),s.clear(),s.renderBufferDirect(I,null,ie,y,M,null),S.uniforms.shadow_pass.value=D.mapPass.texture,S.uniforms.resolution.value=D.mapSize,S.uniforms.radius.value=D.radius,s.setRenderTarget(D.map),s.clear(),s.renderBufferDirect(I,null,ie,S,M,null)}function A(D,I,ie,R){let U=null;const se=ie.isPointLight===!0?D.customDistanceMaterial:D.customDepthMaterial;if(se!==void 0)U=se;else if(U=ie.isPointLight===!0?f:u,s.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0){const le=U.uuid,me=I.uuid;let H=h[le];H===void 0&&(H={},h[le]=H);let q=H[me];q===void 0&&(q=U.clone(),H[me]=q,I.addEventListener("dispose",F)),U=q}if(U.visible=I.visible,U.wireframe=I.wireframe,R===Gi?U.side=I.shadowSide!==null?I.shadowSide:I.side:U.side=I.shadowSide!==null?I.shadowSide:g[I.side],U.alphaMap=I.alphaMap,U.alphaTest=I.alphaTest,U.map=I.map,U.clipShadows=I.clipShadows,U.clippingPlanes=I.clippingPlanes,U.clipIntersection=I.clipIntersection,U.displacementMap=I.displacementMap,U.displacementScale=I.displacementScale,U.displacementBias=I.displacementBias,U.wireframeLinewidth=I.wireframeLinewidth,U.linewidth=I.linewidth,ie.isPointLight===!0&&U.isMeshDistanceMaterial===!0){const le=s.properties.get(U);le.light=ie}return U}function P(D,I,ie,R,U){if(D.visible===!1)return;if(D.layers.test(I.layers)&&(D.isMesh||D.isLine||D.isPoints)&&(D.castShadow||D.receiveShadow&&U===Gi)&&(!D.frustumCulled||r.intersectsObject(D))){D.modelViewMatrix.multiplyMatrices(ie.matrixWorldInverse,D.matrixWorld);const me=e.update(D),H=D.material;if(Array.isArray(H)){const q=me.groups;for(let te=0,J=q.length;te<J;te++){const X=q[te],K=H[X.materialIndex];if(K&&K.visible){const $=A(D,K,R,U);D.onBeforeShadow(s,D,I,ie,me,$,X),s.renderBufferDirect(ie,null,me,$,D,X),D.onAfterShadow(s,D,I,ie,me,$,X)}}}else if(H.visible){const q=A(D,H,R,U);D.onBeforeShadow(s,D,I,ie,me,q,null),s.renderBufferDirect(ie,null,me,q,D,null),D.onAfterShadow(s,D,I,ie,me,q,null)}}const le=D.children;for(let me=0,H=le.length;me<H;me++)P(le[me],I,ie,R,U)}function F(D){D.target.removeEventListener("dispose",F);for(const ie in h){const R=h[ie],U=D.target.uuid;U in R&&(R[U].dispose(),delete R[U])}}}function UT(s,e,t){const r=t.isWebGL2;function o(){let V=!1;const Pe=new Bt;let Ne=null;const oe=new Bt(0,0,0,0);return{setMask:function(pe){Ne!==pe&&!V&&(s.colorMask(pe,pe,pe,pe),Ne=pe)},setLocked:function(pe){V=pe},setClear:function(pe,rt,et,Et,Ct){Ct===!0&&(pe*=Et,rt*=Et,et*=Et),Pe.set(pe,rt,et,Et),oe.equals(Pe)===!1&&(s.clearColor(pe,rt,et,Et),oe.copy(Pe))},reset:function(){V=!1,Ne=null,oe.set(-1,0,0,0)}}}function l(){let V=!1,Pe=null,Ne=null,oe=null;return{setTest:function(pe){pe?ge(s.DEPTH_TEST):be(s.DEPTH_TEST)},setMask:function(pe){Pe!==pe&&!V&&(s.depthMask(pe),Pe=pe)},setFunc:function(pe){if(Ne!==pe){switch(pe){case Wy:s.depthFunc(s.NEVER);break;case jy:s.depthFunc(s.ALWAYS);break;case Xy:s.depthFunc(s.LESS);break;case tc:s.depthFunc(s.LEQUAL);break;case $y:s.depthFunc(s.EQUAL);break;case Yy:s.depthFunc(s.GEQUAL);break;case qy:s.depthFunc(s.GREATER);break;case Ky:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}Ne=pe}},setLocked:function(pe){V=pe},setClear:function(pe){oe!==pe&&(s.clearDepth(pe),oe=pe)},reset:function(){V=!1,Pe=null,Ne=null,oe=null}}}function d(){let V=!1,Pe=null,Ne=null,oe=null,pe=null,rt=null,et=null,Et=null,Ct=null;return{setTest:function(At){V||(At?ge(s.STENCIL_TEST):be(s.STENCIL_TEST))},setMask:function(At){Pe!==At&&!V&&(s.stencilMask(At),Pe=At)},setFunc:function(At,Jt,hn){(Ne!==At||oe!==Jt||pe!==hn)&&(s.stencilFunc(At,Jt,hn),Ne=At,oe=Jt,pe=hn)},setOp:function(At,Jt,hn){(rt!==At||et!==Jt||Et!==hn)&&(s.stencilOp(At,Jt,hn),rt=At,et=Jt,Et=hn)},setLocked:function(At){V=At},setClear:function(At){Ct!==At&&(s.clearStencil(At),Ct=At)},reset:function(){V=!1,Pe=null,Ne=null,oe=null,pe=null,rt=null,et=null,Et=null,Ct=null}}}const u=new o,f=new l,h=new d,m=new WeakMap,g=new WeakMap;let y={},S={},E=new WeakMap,M=[],_=null,v=!1,T=null,A=null,P=null,F=null,D=null,I=null,ie=null,R=new St(0,0,0),U=0,se=!1,le=null,me=null,H=null,q=null,te=null;const J=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,K=0;const $=s.getParameter(s.VERSION);$.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec($)[1]),X=K>=1):$.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec($)[1]),X=K>=2);let O=null,W={};const Y=s.getParameter(s.SCISSOR_BOX),de=s.getParameter(s.VIEWPORT),ve=new Bt().fromArray(Y),Te=new Bt().fromArray(de);function Ae(V,Pe,Ne,oe){const pe=new Uint8Array(4),rt=s.createTexture();s.bindTexture(V,rt),s.texParameteri(V,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(V,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let et=0;et<Ne;et++)r&&(V===s.TEXTURE_3D||V===s.TEXTURE_2D_ARRAY)?s.texImage3D(Pe,0,s.RGBA,1,1,oe,0,s.RGBA,s.UNSIGNED_BYTE,pe):s.texImage2D(Pe+et,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,pe);return rt}const Fe={};Fe[s.TEXTURE_2D]=Ae(s.TEXTURE_2D,s.TEXTURE_2D,1),Fe[s.TEXTURE_CUBE_MAP]=Ae(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),r&&(Fe[s.TEXTURE_2D_ARRAY]=Ae(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Fe[s.TEXTURE_3D]=Ae(s.TEXTURE_3D,s.TEXTURE_3D,1,1)),u.setClear(0,0,0,1),f.setClear(1),h.setClear(0),ge(s.DEPTH_TEST),f.setFunc(tc),ot(!1),L(hm),ge(s.CULL_FACE),Ve(br);function ge(V){y[V]!==!0&&(s.enable(V),y[V]=!0)}function be(V){y[V]!==!1&&(s.disable(V),y[V]=!1)}function ze(V,Pe){return S[V]!==Pe?(s.bindFramebuffer(V,Pe),S[V]=Pe,r&&(V===s.DRAW_FRAMEBUFFER&&(S[s.FRAMEBUFFER]=Pe),V===s.FRAMEBUFFER&&(S[s.DRAW_FRAMEBUFFER]=Pe)),!0):!1}function Q(V,Pe){let Ne=M,oe=!1;if(V)if(Ne=E.get(Pe),Ne===void 0&&(Ne=[],E.set(Pe,Ne)),V.isWebGLMultipleRenderTargets){const pe=V.texture;if(Ne.length!==pe.length||Ne[0]!==s.COLOR_ATTACHMENT0){for(let rt=0,et=pe.length;rt<et;rt++)Ne[rt]=s.COLOR_ATTACHMENT0+rt;Ne.length=pe.length,oe=!0}}else Ne[0]!==s.COLOR_ATTACHMENT0&&(Ne[0]=s.COLOR_ATTACHMENT0,oe=!0);else Ne[0]!==s.BACK&&(Ne[0]=s.BACK,oe=!0);oe&&(t.isWebGL2?s.drawBuffers(Ne):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(Ne))}function tt(V){return _!==V?(s.useProgram(V),_=V,!0):!1}const ke={[Jr]:s.FUNC_ADD,[Ry]:s.FUNC_SUBTRACT,[Py]:s.FUNC_REVERSE_SUBTRACT};if(r)ke[vm]=s.MIN,ke[_m]=s.MAX;else{const V=e.get("EXT_blend_minmax");V!==null&&(ke[vm]=V.MIN_EXT,ke[_m]=V.MAX_EXT)}const Je={[Ly]:s.ZERO,[Ny]:s.ONE,[Dy]:s.SRC_COLOR,[$d]:s.SRC_ALPHA,[zy]:s.SRC_ALPHA_SATURATE,[Fy]:s.DST_COLOR,[Iy]:s.DST_ALPHA,[Uy]:s.ONE_MINUS_SRC_COLOR,[Yd]:s.ONE_MINUS_SRC_ALPHA,[ky]:s.ONE_MINUS_DST_COLOR,[Oy]:s.ONE_MINUS_DST_ALPHA,[By]:s.CONSTANT_COLOR,[Hy]:s.ONE_MINUS_CONSTANT_COLOR,[Vy]:s.CONSTANT_ALPHA,[Gy]:s.ONE_MINUS_CONSTANT_ALPHA};function Ve(V,Pe,Ne,oe,pe,rt,et,Et,Ct,At){if(V===br){v===!0&&(be(s.BLEND),v=!1);return}if(v===!1&&(ge(s.BLEND),v=!0),V!==Cy){if(V!==T||At!==se){if((A!==Jr||D!==Jr)&&(s.blendEquation(s.FUNC_ADD),A=Jr,D=Jr),At)switch(V){case no:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case pm:s.blendFunc(s.ONE,s.ONE);break;case mm:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case gm:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",V);break}else switch(V){case no:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case pm:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case mm:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case gm:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",V);break}P=null,F=null,I=null,ie=null,R.set(0,0,0),U=0,T=V,se=At}return}pe=pe||Pe,rt=rt||Ne,et=et||oe,(Pe!==A||pe!==D)&&(s.blendEquationSeparate(ke[Pe],ke[pe]),A=Pe,D=pe),(Ne!==P||oe!==F||rt!==I||et!==ie)&&(s.blendFuncSeparate(Je[Ne],Je[oe],Je[rt],Je[et]),P=Ne,F=oe,I=rt,ie=et),(Et.equals(R)===!1||Ct!==U)&&(s.blendColor(Et.r,Et.g,Et.b,Ct),R.copy(Et),U=Ct),T=V,se=!1}function Mt(V,Pe){V.side===wi?be(s.CULL_FACE):ge(s.CULL_FACE);let Ne=V.side===Cn;Pe&&(Ne=!Ne),ot(Ne),V.blending===no&&V.transparent===!1?Ve(br):Ve(V.blending,V.blendEquation,V.blendSrc,V.blendDst,V.blendEquationAlpha,V.blendSrcAlpha,V.blendDstAlpha,V.blendColor,V.blendAlpha,V.premultipliedAlpha),f.setFunc(V.depthFunc),f.setTest(V.depthTest),f.setMask(V.depthWrite),u.setMask(V.colorWrite);const oe=V.stencilWrite;h.setTest(oe),oe&&(h.setMask(V.stencilWriteMask),h.setFunc(V.stencilFunc,V.stencilRef,V.stencilFuncMask),h.setOp(V.stencilFail,V.stencilZFail,V.stencilZPass)),re(V.polygonOffset,V.polygonOffsetFactor,V.polygonOffsetUnits),V.alphaToCoverage===!0?ge(s.SAMPLE_ALPHA_TO_COVERAGE):be(s.SAMPLE_ALPHA_TO_COVERAGE)}function ot(V){le!==V&&(V?s.frontFace(s.CW):s.frontFace(s.CCW),le=V)}function L(V){V!==Ay?(ge(s.CULL_FACE),V!==me&&(V===hm?s.cullFace(s.BACK):V===by?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):be(s.CULL_FACE),me=V}function C(V){V!==H&&(X&&s.lineWidth(V),H=V)}function re(V,Pe,Ne){V?(ge(s.POLYGON_OFFSET_FILL),(q!==Pe||te!==Ne)&&(s.polygonOffset(Pe,Ne),q=Pe,te=Ne)):be(s.POLYGON_OFFSET_FILL)}function Me(V){V?ge(s.SCISSOR_TEST):be(s.SCISSOR_TEST)}function ye(V){V===void 0&&(V=s.TEXTURE0+J-1),O!==V&&(s.activeTexture(V),O=V)}function we(V,Pe,Ne){Ne===void 0&&(O===null?Ne=s.TEXTURE0+J-1:Ne=O);let oe=W[Ne];oe===void 0&&(oe={type:void 0,texture:void 0},W[Ne]=oe),(oe.type!==V||oe.texture!==Pe)&&(O!==Ne&&(s.activeTexture(Ne),O=Ne),s.bindTexture(V,Pe||Fe[V]),oe.type=V,oe.texture=Pe)}function Ke(){const V=W[O];V!==void 0&&V.type!==void 0&&(s.bindTexture(V.type,null),V.type=void 0,V.texture=void 0)}function Ie(){try{s.compressedTexImage2D.apply(s,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function He(){try{s.compressedTexImage3D.apply(s,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Ye(){try{s.texSubImage2D.apply(s,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function it(){try{s.texSubImage3D.apply(s,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function _e(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function pt(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function B(){try{s.texStorage2D.apply(s,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function xe(){try{s.texStorage3D.apply(s,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Ue(){try{s.texImage2D.apply(s,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Re(){try{s.texImage3D.apply(s,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Xe(V){ve.equals(V)===!1&&(s.scissor(V.x,V.y,V.z,V.w),ve.copy(V))}function dt(V){Te.equals(V)===!1&&(s.viewport(V.x,V.y,V.z,V.w),Te.copy(V))}function mt(V,Pe){let Ne=g.get(Pe);Ne===void 0&&(Ne=new WeakMap,g.set(Pe,Ne));let oe=Ne.get(V);oe===void 0&&(oe=s.getUniformBlockIndex(Pe,V.name),Ne.set(V,oe))}function st(V,Pe){const oe=g.get(Pe).get(V);m.get(Pe)!==oe&&(s.uniformBlockBinding(Pe,oe,V.__bindingPointIndex),m.set(Pe,oe))}function Le(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),r===!0&&(s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null)),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),y={},O=null,W={},S={},E=new WeakMap,M=[],_=null,v=!1,T=null,A=null,P=null,F=null,D=null,I=null,ie=null,R=new St(0,0,0),U=0,se=!1,le=null,me=null,H=null,q=null,te=null,ve.set(0,0,s.canvas.width,s.canvas.height),Te.set(0,0,s.canvas.width,s.canvas.height),u.reset(),f.reset(),h.reset()}return{buffers:{color:u,depth:f,stencil:h},enable:ge,disable:be,bindFramebuffer:ze,drawBuffers:Q,useProgram:tt,setBlending:Ve,setMaterial:Mt,setFlipSided:ot,setCullFace:L,setLineWidth:C,setPolygonOffset:re,setScissorTest:Me,activeTexture:ye,bindTexture:we,unbindTexture:Ke,compressedTexImage2D:Ie,compressedTexImage3D:He,texImage2D:Ue,texImage3D:Re,updateUBOMapping:mt,uniformBlockBinding:st,texStorage2D:B,texStorage3D:xe,texSubImage2D:Ye,texSubImage3D:it,compressedTexSubImage2D:_e,compressedTexSubImage3D:pt,scissor:Xe,viewport:dt,reset:Le}}function IT(s,e,t,r,o,l,d){const u=o.isWebGL2,f=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,h=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),m=new WeakMap;let g;const y=new WeakMap;let S=!1;try{S=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function E(L,C){return S?new OffscreenCanvas(L,C):lc("canvas")}function M(L,C,re,Me){let ye=1;if((L.width>Me||L.height>Me)&&(ye=Me/Math.max(L.width,L.height)),ye<1||C===!0)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap){const we=C?ac:Math.floor,Ke=we(ye*L.width),Ie=we(ye*L.height);g===void 0&&(g=E(Ke,Ie));const He=re?E(Ke,Ie):g;return He.width=Ke,He.height=Ie,He.getContext("2d").drawImage(L,0,0,Ke,Ie),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+L.width+"x"+L.height+") to ("+Ke+"x"+Ie+")."),He}else return"data"in L&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+L.width+"x"+L.height+")."),L;return L}function _(L){return Qd(L.width)&&Qd(L.height)}function v(L){return u?!1:L.wrapS!==mi||L.wrapT!==mi||L.minFilter!==bn&&L.minFilter!==ii}function T(L,C){return L.generateMipmaps&&C&&L.minFilter!==bn&&L.minFilter!==ii}function A(L){s.generateMipmap(L)}function P(L,C,re,Me,ye=!1){if(u===!1)return C;if(L!==null){if(s[L]!==void 0)return s[L];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let we=C;if(C===s.RED&&(re===s.FLOAT&&(we=s.R32F),re===s.HALF_FLOAT&&(we=s.R16F),re===s.UNSIGNED_BYTE&&(we=s.R8)),C===s.RED_INTEGER&&(re===s.UNSIGNED_BYTE&&(we=s.R8UI),re===s.UNSIGNED_SHORT&&(we=s.R16UI),re===s.UNSIGNED_INT&&(we=s.R32UI),re===s.BYTE&&(we=s.R8I),re===s.SHORT&&(we=s.R16I),re===s.INT&&(we=s.R32I)),C===s.RG&&(re===s.FLOAT&&(we=s.RG32F),re===s.HALF_FLOAT&&(we=s.RG16F),re===s.UNSIGNED_BYTE&&(we=s.RG8)),C===s.RGBA){const Ke=ye?ic:Lt.getTransfer(Me);re===s.FLOAT&&(we=s.RGBA32F),re===s.HALF_FLOAT&&(we=s.RGBA16F),re===s.UNSIGNED_BYTE&&(we=Ke===Ot?s.SRGB8_ALPHA8:s.RGBA8),re===s.UNSIGNED_SHORT_4_4_4_4&&(we=s.RGBA4),re===s.UNSIGNED_SHORT_5_5_5_1&&(we=s.RGB5_A1)}return(we===s.R16F||we===s.R32F||we===s.RG16F||we===s.RG32F||we===s.RGBA16F||we===s.RGBA32F)&&e.get("EXT_color_buffer_float"),we}function F(L,C,re){return T(L,re)===!0||L.isFramebufferTexture&&L.minFilter!==bn&&L.minFilter!==ii?Math.log2(Math.max(C.width,C.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?C.mipmaps.length:1}function D(L){return L===bn||L===xm||L===sd?s.NEAREST:s.LINEAR}function I(L){const C=L.target;C.removeEventListener("dispose",I),R(C),C.isVideoTexture&&m.delete(C)}function ie(L){const C=L.target;C.removeEventListener("dispose",ie),se(C)}function R(L){const C=r.get(L);if(C.__webglInit===void 0)return;const re=L.source,Me=y.get(re);if(Me){const ye=Me[C.__cacheKey];ye.usedTimes--,ye.usedTimes===0&&U(L),Object.keys(Me).length===0&&y.delete(re)}r.remove(L)}function U(L){const C=r.get(L);s.deleteTexture(C.__webglTexture);const re=L.source,Me=y.get(re);delete Me[C.__cacheKey],d.memory.textures--}function se(L){const C=L.texture,re=r.get(L),Me=r.get(C);if(Me.__webglTexture!==void 0&&(s.deleteTexture(Me.__webglTexture),d.memory.textures--),L.depthTexture&&L.depthTexture.dispose(),L.isWebGLCubeRenderTarget)for(let ye=0;ye<6;ye++){if(Array.isArray(re.__webglFramebuffer[ye]))for(let we=0;we<re.__webglFramebuffer[ye].length;we++)s.deleteFramebuffer(re.__webglFramebuffer[ye][we]);else s.deleteFramebuffer(re.__webglFramebuffer[ye]);re.__webglDepthbuffer&&s.deleteRenderbuffer(re.__webglDepthbuffer[ye])}else{if(Array.isArray(re.__webglFramebuffer))for(let ye=0;ye<re.__webglFramebuffer.length;ye++)s.deleteFramebuffer(re.__webglFramebuffer[ye]);else s.deleteFramebuffer(re.__webglFramebuffer);if(re.__webglDepthbuffer&&s.deleteRenderbuffer(re.__webglDepthbuffer),re.__webglMultisampledFramebuffer&&s.deleteFramebuffer(re.__webglMultisampledFramebuffer),re.__webglColorRenderbuffer)for(let ye=0;ye<re.__webglColorRenderbuffer.length;ye++)re.__webglColorRenderbuffer[ye]&&s.deleteRenderbuffer(re.__webglColorRenderbuffer[ye]);re.__webglDepthRenderbuffer&&s.deleteRenderbuffer(re.__webglDepthRenderbuffer)}if(L.isWebGLMultipleRenderTargets)for(let ye=0,we=C.length;ye<we;ye++){const Ke=r.get(C[ye]);Ke.__webglTexture&&(s.deleteTexture(Ke.__webglTexture),d.memory.textures--),r.remove(C[ye])}r.remove(C),r.remove(L)}let le=0;function me(){le=0}function H(){const L=le;return L>=o.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+L+" texture units while this GPU supports only "+o.maxTextures),le+=1,L}function q(L){const C=[];return C.push(L.wrapS),C.push(L.wrapT),C.push(L.wrapR||0),C.push(L.magFilter),C.push(L.minFilter),C.push(L.anisotropy),C.push(L.internalFormat),C.push(L.format),C.push(L.type),C.push(L.generateMipmaps),C.push(L.premultiplyAlpha),C.push(L.flipY),C.push(L.unpackAlignment),C.push(L.colorSpace),C.join()}function te(L,C){const re=r.get(L);if(L.isVideoTexture&&Mt(L),L.isRenderTargetTexture===!1&&L.version>0&&re.__version!==L.version){const Me=L.image;if(Me===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Me.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ve(re,L,C);return}}t.bindTexture(s.TEXTURE_2D,re.__webglTexture,s.TEXTURE0+C)}function J(L,C){const re=r.get(L);if(L.version>0&&re.__version!==L.version){ve(re,L,C);return}t.bindTexture(s.TEXTURE_2D_ARRAY,re.__webglTexture,s.TEXTURE0+C)}function X(L,C){const re=r.get(L);if(L.version>0&&re.__version!==L.version){ve(re,L,C);return}t.bindTexture(s.TEXTURE_3D,re.__webglTexture,s.TEXTURE0+C)}function K(L,C){const re=r.get(L);if(L.version>0&&re.__version!==L.version){Te(re,L,C);return}t.bindTexture(s.TEXTURE_CUBE_MAP,re.__webglTexture,s.TEXTURE0+C)}const $={[nc]:s.REPEAT,[mi]:s.CLAMP_TO_EDGE,[Zd]:s.MIRRORED_REPEAT},O={[bn]:s.NEAREST,[xm]:s.NEAREST_MIPMAP_NEAREST,[sd]:s.NEAREST_MIPMAP_LINEAR,[ii]:s.LINEAR,[rS]:s.LINEAR_MIPMAP_NEAREST,[la]:s.LINEAR_MIPMAP_LINEAR},W={[gS]:s.NEVER,[MS]:s.ALWAYS,[vS]:s.LESS,[Dv]:s.LEQUAL,[_S]:s.EQUAL,[SS]:s.GEQUAL,[xS]:s.GREATER,[yS]:s.NOTEQUAL};function Y(L,C,re){if(re?(s.texParameteri(L,s.TEXTURE_WRAP_S,$[C.wrapS]),s.texParameteri(L,s.TEXTURE_WRAP_T,$[C.wrapT]),(L===s.TEXTURE_3D||L===s.TEXTURE_2D_ARRAY)&&s.texParameteri(L,s.TEXTURE_WRAP_R,$[C.wrapR]),s.texParameteri(L,s.TEXTURE_MAG_FILTER,O[C.magFilter]),s.texParameteri(L,s.TEXTURE_MIN_FILTER,O[C.minFilter])):(s.texParameteri(L,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(L,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE),(L===s.TEXTURE_3D||L===s.TEXTURE_2D_ARRAY)&&s.texParameteri(L,s.TEXTURE_WRAP_R,s.CLAMP_TO_EDGE),(C.wrapS!==mi||C.wrapT!==mi)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),s.texParameteri(L,s.TEXTURE_MAG_FILTER,D(C.magFilter)),s.texParameteri(L,s.TEXTURE_MIN_FILTER,D(C.minFilter)),C.minFilter!==bn&&C.minFilter!==ii&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),C.compareFunction&&(s.texParameteri(L,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(L,s.TEXTURE_COMPARE_FUNC,W[C.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const Me=e.get("EXT_texture_filter_anisotropic");if(C.magFilter===bn||C.minFilter!==sd&&C.minFilter!==la||C.type===wr&&e.has("OES_texture_float_linear")===!1||u===!1&&C.type===ca&&e.has("OES_texture_half_float_linear")===!1)return;(C.anisotropy>1||r.get(C).__currentAnisotropy)&&(s.texParameterf(L,Me.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(C.anisotropy,o.getMaxAnisotropy())),r.get(C).__currentAnisotropy=C.anisotropy)}}function de(L,C){let re=!1;L.__webglInit===void 0&&(L.__webglInit=!0,C.addEventListener("dispose",I));const Me=C.source;let ye=y.get(Me);ye===void 0&&(ye={},y.set(Me,ye));const we=q(C);if(we!==L.__cacheKey){ye[we]===void 0&&(ye[we]={texture:s.createTexture(),usedTimes:0},d.memory.textures++,re=!0),ye[we].usedTimes++;const Ke=ye[L.__cacheKey];Ke!==void 0&&(ye[L.__cacheKey].usedTimes--,Ke.usedTimes===0&&U(C)),L.__cacheKey=we,L.__webglTexture=ye[we].texture}return re}function ve(L,C,re){let Me=s.TEXTURE_2D;(C.isDataArrayTexture||C.isCompressedArrayTexture)&&(Me=s.TEXTURE_2D_ARRAY),C.isData3DTexture&&(Me=s.TEXTURE_3D);const ye=de(L,C),we=C.source;t.bindTexture(Me,L.__webglTexture,s.TEXTURE0+re);const Ke=r.get(we);if(we.version!==Ke.__version||ye===!0){t.activeTexture(s.TEXTURE0+re);const Ie=Lt.getPrimaries(Lt.workingColorSpace),He=C.colorSpace===si?null:Lt.getPrimaries(C.colorSpace),Ye=C.colorSpace===si||Ie===He?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,C.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,C.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ye);const it=v(C)&&_(C.image)===!1;let _e=M(C.image,it,!1,o.maxTextureSize);_e=ot(C,_e);const pt=_(_e)||u,B=l.convert(C.format,C.colorSpace);let xe=l.convert(C.type),Ue=P(C.internalFormat,B,xe,C.colorSpace,C.isVideoTexture);Y(Me,C,pt);let Re;const Xe=C.mipmaps,dt=u&&C.isVideoTexture!==!0&&Ue!==Pv,mt=Ke.__version===void 0||ye===!0,st=F(C,_e,pt);if(C.isDepthTexture)Ue=s.DEPTH_COMPONENT,u?C.type===wr?Ue=s.DEPTH_COMPONENT32F:C.type===Er?Ue=s.DEPTH_COMPONENT24:C.type===ts?Ue=s.DEPTH24_STENCIL8:Ue=s.DEPTH_COMPONENT16:C.type===wr&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),C.format===ns&&Ue===s.DEPTH_COMPONENT&&C.type!==df&&C.type!==Er&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),C.type=Er,xe=l.convert(C.type)),C.format===co&&Ue===s.DEPTH_COMPONENT&&(Ue=s.DEPTH_STENCIL,C.type!==ts&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),C.type=ts,xe=l.convert(C.type))),mt&&(dt?t.texStorage2D(s.TEXTURE_2D,1,Ue,_e.width,_e.height):t.texImage2D(s.TEXTURE_2D,0,Ue,_e.width,_e.height,0,B,xe,null));else if(C.isDataTexture)if(Xe.length>0&&pt){dt&&mt&&t.texStorage2D(s.TEXTURE_2D,st,Ue,Xe[0].width,Xe[0].height);for(let Le=0,V=Xe.length;Le<V;Le++)Re=Xe[Le],dt?t.texSubImage2D(s.TEXTURE_2D,Le,0,0,Re.width,Re.height,B,xe,Re.data):t.texImage2D(s.TEXTURE_2D,Le,Ue,Re.width,Re.height,0,B,xe,Re.data);C.generateMipmaps=!1}else dt?(mt&&t.texStorage2D(s.TEXTURE_2D,st,Ue,_e.width,_e.height),t.texSubImage2D(s.TEXTURE_2D,0,0,0,_e.width,_e.height,B,xe,_e.data)):t.texImage2D(s.TEXTURE_2D,0,Ue,_e.width,_e.height,0,B,xe,_e.data);else if(C.isCompressedTexture)if(C.isCompressedArrayTexture){dt&&mt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,st,Ue,Xe[0].width,Xe[0].height,_e.depth);for(let Le=0,V=Xe.length;Le<V;Le++)Re=Xe[Le],C.format!==gi?B!==null?dt?t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,Le,0,0,0,Re.width,Re.height,_e.depth,B,Re.data,0,0):t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,Le,Ue,Re.width,Re.height,_e.depth,0,Re.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):dt?t.texSubImage3D(s.TEXTURE_2D_ARRAY,Le,0,0,0,Re.width,Re.height,_e.depth,B,xe,Re.data):t.texImage3D(s.TEXTURE_2D_ARRAY,Le,Ue,Re.width,Re.height,_e.depth,0,B,xe,Re.data)}else{dt&&mt&&t.texStorage2D(s.TEXTURE_2D,st,Ue,Xe[0].width,Xe[0].height);for(let Le=0,V=Xe.length;Le<V;Le++)Re=Xe[Le],C.format!==gi?B!==null?dt?t.compressedTexSubImage2D(s.TEXTURE_2D,Le,0,0,Re.width,Re.height,B,Re.data):t.compressedTexImage2D(s.TEXTURE_2D,Le,Ue,Re.width,Re.height,0,Re.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):dt?t.texSubImage2D(s.TEXTURE_2D,Le,0,0,Re.width,Re.height,B,xe,Re.data):t.texImage2D(s.TEXTURE_2D,Le,Ue,Re.width,Re.height,0,B,xe,Re.data)}else if(C.isDataArrayTexture)dt?(mt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,st,Ue,_e.width,_e.height,_e.depth),t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,_e.width,_e.height,_e.depth,B,xe,_e.data)):t.texImage3D(s.TEXTURE_2D_ARRAY,0,Ue,_e.width,_e.height,_e.depth,0,B,xe,_e.data);else if(C.isData3DTexture)dt?(mt&&t.texStorage3D(s.TEXTURE_3D,st,Ue,_e.width,_e.height,_e.depth),t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,_e.width,_e.height,_e.depth,B,xe,_e.data)):t.texImage3D(s.TEXTURE_3D,0,Ue,_e.width,_e.height,_e.depth,0,B,xe,_e.data);else if(C.isFramebufferTexture){if(mt)if(dt)t.texStorage2D(s.TEXTURE_2D,st,Ue,_e.width,_e.height);else{let Le=_e.width,V=_e.height;for(let Pe=0;Pe<st;Pe++)t.texImage2D(s.TEXTURE_2D,Pe,Ue,Le,V,0,B,xe,null),Le>>=1,V>>=1}}else if(Xe.length>0&&pt){dt&&mt&&t.texStorage2D(s.TEXTURE_2D,st,Ue,Xe[0].width,Xe[0].height);for(let Le=0,V=Xe.length;Le<V;Le++)Re=Xe[Le],dt?t.texSubImage2D(s.TEXTURE_2D,Le,0,0,B,xe,Re):t.texImage2D(s.TEXTURE_2D,Le,Ue,B,xe,Re);C.generateMipmaps=!1}else dt?(mt&&t.texStorage2D(s.TEXTURE_2D,st,Ue,_e.width,_e.height),t.texSubImage2D(s.TEXTURE_2D,0,0,0,B,xe,_e)):t.texImage2D(s.TEXTURE_2D,0,Ue,B,xe,_e);T(C,pt)&&A(Me),Ke.__version=we.version,C.onUpdate&&C.onUpdate(C)}L.__version=C.version}function Te(L,C,re){if(C.image.length!==6)return;const Me=de(L,C),ye=C.source;t.bindTexture(s.TEXTURE_CUBE_MAP,L.__webglTexture,s.TEXTURE0+re);const we=r.get(ye);if(ye.version!==we.__version||Me===!0){t.activeTexture(s.TEXTURE0+re);const Ke=Lt.getPrimaries(Lt.workingColorSpace),Ie=C.colorSpace===si?null:Lt.getPrimaries(C.colorSpace),He=C.colorSpace===si||Ke===Ie?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,C.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,C.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,He);const Ye=C.isCompressedTexture||C.image[0].isCompressedTexture,it=C.image[0]&&C.image[0].isDataTexture,_e=[];for(let Le=0;Le<6;Le++)!Ye&&!it?_e[Le]=M(C.image[Le],!1,!0,o.maxCubemapSize):_e[Le]=it?C.image[Le].image:C.image[Le],_e[Le]=ot(C,_e[Le]);const pt=_e[0],B=_(pt)||u,xe=l.convert(C.format,C.colorSpace),Ue=l.convert(C.type),Re=P(C.internalFormat,xe,Ue,C.colorSpace),Xe=u&&C.isVideoTexture!==!0,dt=we.__version===void 0||Me===!0;let mt=F(C,pt,B);Y(s.TEXTURE_CUBE_MAP,C,B);let st;if(Ye){Xe&&dt&&t.texStorage2D(s.TEXTURE_CUBE_MAP,mt,Re,pt.width,pt.height);for(let Le=0;Le<6;Le++){st=_e[Le].mipmaps;for(let V=0;V<st.length;V++){const Pe=st[V];C.format!==gi?xe!==null?Xe?t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Le,V,0,0,Pe.width,Pe.height,xe,Pe.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Le,V,Re,Pe.width,Pe.height,0,Pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Xe?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Le,V,0,0,Pe.width,Pe.height,xe,Ue,Pe.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Le,V,Re,Pe.width,Pe.height,0,xe,Ue,Pe.data)}}}else{st=C.mipmaps,Xe&&dt&&(st.length>0&&mt++,t.texStorage2D(s.TEXTURE_CUBE_MAP,mt,Re,_e[0].width,_e[0].height));for(let Le=0;Le<6;Le++)if(it){Xe?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Le,0,0,0,_e[Le].width,_e[Le].height,xe,Ue,_e[Le].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Le,0,Re,_e[Le].width,_e[Le].height,0,xe,Ue,_e[Le].data);for(let V=0;V<st.length;V++){const Ne=st[V].image[Le].image;Xe?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Le,V+1,0,0,Ne.width,Ne.height,xe,Ue,Ne.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Le,V+1,Re,Ne.width,Ne.height,0,xe,Ue,Ne.data)}}else{Xe?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Le,0,0,0,xe,Ue,_e[Le]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Le,0,Re,xe,Ue,_e[Le]);for(let V=0;V<st.length;V++){const Pe=st[V];Xe?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Le,V+1,0,0,xe,Ue,Pe.image[Le]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Le,V+1,Re,xe,Ue,Pe.image[Le])}}}T(C,B)&&A(s.TEXTURE_CUBE_MAP),we.__version=ye.version,C.onUpdate&&C.onUpdate(C)}L.__version=C.version}function Ae(L,C,re,Me,ye,we){const Ke=l.convert(re.format,re.colorSpace),Ie=l.convert(re.type),He=P(re.internalFormat,Ke,Ie,re.colorSpace);if(!r.get(C).__hasExternalTextures){const it=Math.max(1,C.width>>we),_e=Math.max(1,C.height>>we);ye===s.TEXTURE_3D||ye===s.TEXTURE_2D_ARRAY?t.texImage3D(ye,we,He,it,_e,C.depth,0,Ke,Ie,null):t.texImage2D(ye,we,He,it,_e,0,Ke,Ie,null)}t.bindFramebuffer(s.FRAMEBUFFER,L),Ve(C)?f.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,Me,ye,r.get(re).__webglTexture,0,Je(C)):(ye===s.TEXTURE_2D||ye>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&ye<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,Me,ye,r.get(re).__webglTexture,we),t.bindFramebuffer(s.FRAMEBUFFER,null)}function Fe(L,C,re){if(s.bindRenderbuffer(s.RENDERBUFFER,L),C.depthBuffer&&!C.stencilBuffer){let Me=u===!0?s.DEPTH_COMPONENT24:s.DEPTH_COMPONENT16;if(re||Ve(C)){const ye=C.depthTexture;ye&&ye.isDepthTexture&&(ye.type===wr?Me=s.DEPTH_COMPONENT32F:ye.type===Er&&(Me=s.DEPTH_COMPONENT24));const we=Je(C);Ve(C)?f.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,we,Me,C.width,C.height):s.renderbufferStorageMultisample(s.RENDERBUFFER,we,Me,C.width,C.height)}else s.renderbufferStorage(s.RENDERBUFFER,Me,C.width,C.height);s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.RENDERBUFFER,L)}else if(C.depthBuffer&&C.stencilBuffer){const Me=Je(C);re&&Ve(C)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Me,s.DEPTH24_STENCIL8,C.width,C.height):Ve(C)?f.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Me,s.DEPTH24_STENCIL8,C.width,C.height):s.renderbufferStorage(s.RENDERBUFFER,s.DEPTH_STENCIL,C.width,C.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.RENDERBUFFER,L)}else{const Me=C.isWebGLMultipleRenderTargets===!0?C.texture:[C.texture];for(let ye=0;ye<Me.length;ye++){const we=Me[ye],Ke=l.convert(we.format,we.colorSpace),Ie=l.convert(we.type),He=P(we.internalFormat,Ke,Ie,we.colorSpace),Ye=Je(C);re&&Ve(C)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Ye,He,C.width,C.height):Ve(C)?f.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Ye,He,C.width,C.height):s.renderbufferStorage(s.RENDERBUFFER,He,C.width,C.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function ge(L,C){if(C&&C.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,L),!(C.depthTexture&&C.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!r.get(C.depthTexture).__webglTexture||C.depthTexture.image.width!==C.width||C.depthTexture.image.height!==C.height)&&(C.depthTexture.image.width=C.width,C.depthTexture.image.height=C.height,C.depthTexture.needsUpdate=!0),te(C.depthTexture,0);const Me=r.get(C.depthTexture).__webglTexture,ye=Je(C);if(C.depthTexture.format===ns)Ve(C)?f.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,Me,0,ye):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,Me,0);else if(C.depthTexture.format===co)Ve(C)?f.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,Me,0,ye):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,Me,0);else throw new Error("Unknown depthTexture format")}function be(L){const C=r.get(L),re=L.isWebGLCubeRenderTarget===!0;if(L.depthTexture&&!C.__autoAllocateDepthBuffer){if(re)throw new Error("target.depthTexture not supported in Cube render targets");ge(C.__webglFramebuffer,L)}else if(re){C.__webglDepthbuffer=[];for(let Me=0;Me<6;Me++)t.bindFramebuffer(s.FRAMEBUFFER,C.__webglFramebuffer[Me]),C.__webglDepthbuffer[Me]=s.createRenderbuffer(),Fe(C.__webglDepthbuffer[Me],L,!1)}else t.bindFramebuffer(s.FRAMEBUFFER,C.__webglFramebuffer),C.__webglDepthbuffer=s.createRenderbuffer(),Fe(C.__webglDepthbuffer,L,!1);t.bindFramebuffer(s.FRAMEBUFFER,null)}function ze(L,C,re){const Me=r.get(L);C!==void 0&&Ae(Me.__webglFramebuffer,L,L.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),re!==void 0&&be(L)}function Q(L){const C=L.texture,re=r.get(L),Me=r.get(C);L.addEventListener("dispose",ie),L.isWebGLMultipleRenderTargets!==!0&&(Me.__webglTexture===void 0&&(Me.__webglTexture=s.createTexture()),Me.__version=C.version,d.memory.textures++);const ye=L.isWebGLCubeRenderTarget===!0,we=L.isWebGLMultipleRenderTargets===!0,Ke=_(L)||u;if(ye){re.__webglFramebuffer=[];for(let Ie=0;Ie<6;Ie++)if(u&&C.mipmaps&&C.mipmaps.length>0){re.__webglFramebuffer[Ie]=[];for(let He=0;He<C.mipmaps.length;He++)re.__webglFramebuffer[Ie][He]=s.createFramebuffer()}else re.__webglFramebuffer[Ie]=s.createFramebuffer()}else{if(u&&C.mipmaps&&C.mipmaps.length>0){re.__webglFramebuffer=[];for(let Ie=0;Ie<C.mipmaps.length;Ie++)re.__webglFramebuffer[Ie]=s.createFramebuffer()}else re.__webglFramebuffer=s.createFramebuffer();if(we)if(o.drawBuffers){const Ie=L.texture;for(let He=0,Ye=Ie.length;He<Ye;He++){const it=r.get(Ie[He]);it.__webglTexture===void 0&&(it.__webglTexture=s.createTexture(),d.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(u&&L.samples>0&&Ve(L)===!1){const Ie=we?C:[C];re.__webglMultisampledFramebuffer=s.createFramebuffer(),re.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,re.__webglMultisampledFramebuffer);for(let He=0;He<Ie.length;He++){const Ye=Ie[He];re.__webglColorRenderbuffer[He]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,re.__webglColorRenderbuffer[He]);const it=l.convert(Ye.format,Ye.colorSpace),_e=l.convert(Ye.type),pt=P(Ye.internalFormat,it,_e,Ye.colorSpace,L.isXRRenderTarget===!0),B=Je(L);s.renderbufferStorageMultisample(s.RENDERBUFFER,B,pt,L.width,L.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+He,s.RENDERBUFFER,re.__webglColorRenderbuffer[He])}s.bindRenderbuffer(s.RENDERBUFFER,null),L.depthBuffer&&(re.__webglDepthRenderbuffer=s.createRenderbuffer(),Fe(re.__webglDepthRenderbuffer,L,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(ye){t.bindTexture(s.TEXTURE_CUBE_MAP,Me.__webglTexture),Y(s.TEXTURE_CUBE_MAP,C,Ke);for(let Ie=0;Ie<6;Ie++)if(u&&C.mipmaps&&C.mipmaps.length>0)for(let He=0;He<C.mipmaps.length;He++)Ae(re.__webglFramebuffer[Ie][He],L,C,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Ie,He);else Ae(re.__webglFramebuffer[Ie],L,C,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Ie,0);T(C,Ke)&&A(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(we){const Ie=L.texture;for(let He=0,Ye=Ie.length;He<Ye;He++){const it=Ie[He],_e=r.get(it);t.bindTexture(s.TEXTURE_2D,_e.__webglTexture),Y(s.TEXTURE_2D,it,Ke),Ae(re.__webglFramebuffer,L,it,s.COLOR_ATTACHMENT0+He,s.TEXTURE_2D,0),T(it,Ke)&&A(s.TEXTURE_2D)}t.unbindTexture()}else{let Ie=s.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(u?Ie=L.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(Ie,Me.__webglTexture),Y(Ie,C,Ke),u&&C.mipmaps&&C.mipmaps.length>0)for(let He=0;He<C.mipmaps.length;He++)Ae(re.__webglFramebuffer[He],L,C,s.COLOR_ATTACHMENT0,Ie,He);else Ae(re.__webglFramebuffer,L,C,s.COLOR_ATTACHMENT0,Ie,0);T(C,Ke)&&A(Ie),t.unbindTexture()}L.depthBuffer&&be(L)}function tt(L){const C=_(L)||u,re=L.isWebGLMultipleRenderTargets===!0?L.texture:[L.texture];for(let Me=0,ye=re.length;Me<ye;Me++){const we=re[Me];if(T(we,C)){const Ke=L.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:s.TEXTURE_2D,Ie=r.get(we).__webglTexture;t.bindTexture(Ke,Ie),A(Ke),t.unbindTexture()}}}function ke(L){if(u&&L.samples>0&&Ve(L)===!1){const C=L.isWebGLMultipleRenderTargets?L.texture:[L.texture],re=L.width,Me=L.height;let ye=s.COLOR_BUFFER_BIT;const we=[],Ke=L.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Ie=r.get(L),He=L.isWebGLMultipleRenderTargets===!0;if(He)for(let Ye=0;Ye<C.length;Ye++)t.bindFramebuffer(s.FRAMEBUFFER,Ie.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ye,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,Ie.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ye,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,Ie.__webglMultisampledFramebuffer),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ie.__webglFramebuffer);for(let Ye=0;Ye<C.length;Ye++){we.push(s.COLOR_ATTACHMENT0+Ye),L.depthBuffer&&we.push(Ke);const it=Ie.__ignoreDepthValues!==void 0?Ie.__ignoreDepthValues:!1;if(it===!1&&(L.depthBuffer&&(ye|=s.DEPTH_BUFFER_BIT),L.stencilBuffer&&(ye|=s.STENCIL_BUFFER_BIT)),He&&s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Ie.__webglColorRenderbuffer[Ye]),it===!0&&(s.invalidateFramebuffer(s.READ_FRAMEBUFFER,[Ke]),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[Ke])),He){const _e=r.get(C[Ye]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,_e,0)}s.blitFramebuffer(0,0,re,Me,0,0,re,Me,ye,s.NEAREST),h&&s.invalidateFramebuffer(s.READ_FRAMEBUFFER,we)}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),He)for(let Ye=0;Ye<C.length;Ye++){t.bindFramebuffer(s.FRAMEBUFFER,Ie.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ye,s.RENDERBUFFER,Ie.__webglColorRenderbuffer[Ye]);const it=r.get(C[Ye]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,Ie.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ye,s.TEXTURE_2D,it,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ie.__webglMultisampledFramebuffer)}}function Je(L){return Math.min(o.maxSamples,L.samples)}function Ve(L){const C=r.get(L);return u&&L.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&C.__useRenderToTexture!==!1}function Mt(L){const C=d.render.frame;m.get(L)!==C&&(m.set(L,C),L.update())}function ot(L,C){const re=L.colorSpace,Me=L.format,ye=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||L.format===Jd||re!==ji&&re!==si&&(Lt.getTransfer(re)===Ot?u===!1?e.has("EXT_sRGB")===!0&&Me===gi?(L.format=Jd,L.minFilter=ii,L.generateMipmaps=!1):C=Iv.sRGBToLinear(C):(Me!==gi||ye!==Rr)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",re)),C}this.allocateTextureUnit=H,this.resetTextureUnits=me,this.setTexture2D=te,this.setTexture2DArray=J,this.setTexture3D=X,this.setTextureCube=K,this.rebindTextures=ze,this.setupRenderTarget=Q,this.updateRenderTargetMipmap=tt,this.updateMultisampleRenderTarget=ke,this.setupDepthRenderbuffer=be,this.setupFrameBufferTexture=Ae,this.useMultisampledRTT=Ve}function OT(s,e,t){const r=t.isWebGL2;function o(l,d=si){let u;const f=Lt.getTransfer(d);if(l===Rr)return s.UNSIGNED_BYTE;if(l===Tv)return s.UNSIGNED_SHORT_4_4_4_4;if(l===Av)return s.UNSIGNED_SHORT_5_5_5_1;if(l===sS)return s.BYTE;if(l===oS)return s.SHORT;if(l===df)return s.UNSIGNED_SHORT;if(l===wv)return s.INT;if(l===Er)return s.UNSIGNED_INT;if(l===wr)return s.FLOAT;if(l===ca)return r?s.HALF_FLOAT:(u=e.get("OES_texture_half_float"),u!==null?u.HALF_FLOAT_OES:null);if(l===aS)return s.ALPHA;if(l===gi)return s.RGBA;if(l===lS)return s.LUMINANCE;if(l===cS)return s.LUMINANCE_ALPHA;if(l===ns)return s.DEPTH_COMPONENT;if(l===co)return s.DEPTH_STENCIL;if(l===Jd)return u=e.get("EXT_sRGB"),u!==null?u.SRGB_ALPHA_EXT:null;if(l===uS)return s.RED;if(l===bv)return s.RED_INTEGER;if(l===dS)return s.RG;if(l===Cv)return s.RG_INTEGER;if(l===Rv)return s.RGBA_INTEGER;if(l===od||l===ad||l===ld||l===cd)if(f===Ot)if(u=e.get("WEBGL_compressed_texture_s3tc_srgb"),u!==null){if(l===od)return u.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(l===ad)return u.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(l===ld)return u.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(l===cd)return u.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(u=e.get("WEBGL_compressed_texture_s3tc"),u!==null){if(l===od)return u.COMPRESSED_RGB_S3TC_DXT1_EXT;if(l===ad)return u.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(l===ld)return u.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(l===cd)return u.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(l===ym||l===Sm||l===Mm||l===Em)if(u=e.get("WEBGL_compressed_texture_pvrtc"),u!==null){if(l===ym)return u.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(l===Sm)return u.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(l===Mm)return u.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(l===Em)return u.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(l===Pv)return u=e.get("WEBGL_compressed_texture_etc1"),u!==null?u.COMPRESSED_RGB_ETC1_WEBGL:null;if(l===wm||l===Tm)if(u=e.get("WEBGL_compressed_texture_etc"),u!==null){if(l===wm)return f===Ot?u.COMPRESSED_SRGB8_ETC2:u.COMPRESSED_RGB8_ETC2;if(l===Tm)return f===Ot?u.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:u.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(l===Am||l===bm||l===Cm||l===Rm||l===Pm||l===Lm||l===Nm||l===Dm||l===Um||l===Im||l===Om||l===Fm||l===km||l===zm)if(u=e.get("WEBGL_compressed_texture_astc"),u!==null){if(l===Am)return f===Ot?u.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:u.COMPRESSED_RGBA_ASTC_4x4_KHR;if(l===bm)return f===Ot?u.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:u.COMPRESSED_RGBA_ASTC_5x4_KHR;if(l===Cm)return f===Ot?u.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:u.COMPRESSED_RGBA_ASTC_5x5_KHR;if(l===Rm)return f===Ot?u.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:u.COMPRESSED_RGBA_ASTC_6x5_KHR;if(l===Pm)return f===Ot?u.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:u.COMPRESSED_RGBA_ASTC_6x6_KHR;if(l===Lm)return f===Ot?u.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:u.COMPRESSED_RGBA_ASTC_8x5_KHR;if(l===Nm)return f===Ot?u.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:u.COMPRESSED_RGBA_ASTC_8x6_KHR;if(l===Dm)return f===Ot?u.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:u.COMPRESSED_RGBA_ASTC_8x8_KHR;if(l===Um)return f===Ot?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:u.COMPRESSED_RGBA_ASTC_10x5_KHR;if(l===Im)return f===Ot?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:u.COMPRESSED_RGBA_ASTC_10x6_KHR;if(l===Om)return f===Ot?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:u.COMPRESSED_RGBA_ASTC_10x8_KHR;if(l===Fm)return f===Ot?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:u.COMPRESSED_RGBA_ASTC_10x10_KHR;if(l===km)return f===Ot?u.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:u.COMPRESSED_RGBA_ASTC_12x10_KHR;if(l===zm)return f===Ot?u.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:u.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(l===ud||l===Bm||l===Hm)if(u=e.get("EXT_texture_compression_bptc"),u!==null){if(l===ud)return f===Ot?u.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:u.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(l===Bm)return u.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(l===Hm)return u.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(l===fS||l===Vm||l===Gm||l===Wm)if(u=e.get("EXT_texture_compression_rgtc"),u!==null){if(l===ud)return u.COMPRESSED_RED_RGTC1_EXT;if(l===Vm)return u.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(l===Gm)return u.COMPRESSED_RED_GREEN_RGTC2_EXT;if(l===Wm)return u.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return l===ts?r?s.UNSIGNED_INT_24_8:(u=e.get("WEBGL_depth_texture"),u!==null?u.UNSIGNED_INT_24_8_WEBGL:null):s[l]!==void 0?s[l]:null}return{convert:o}}class FT extends $n{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Tr extends nn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const kT={type:"move"};class Dd{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Tr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Tr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new z),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Tr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new z),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const r of e.hand.values())this._getHandJoint(t,r)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,r){let o=null,l=null,d=null;const u=this._targetRay,f=this._grip,h=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(h&&e.hand){d=!0;for(const M of e.hand.values()){const _=t.getJointPose(M,r),v=this._getHandJoint(h,M);_!==null&&(v.matrix.fromArray(_.transform.matrix),v.matrix.decompose(v.position,v.rotation,v.scale),v.matrixWorldNeedsUpdate=!0,v.jointRadius=_.radius),v.visible=_!==null}const m=h.joints["index-finger-tip"],g=h.joints["thumb-tip"],y=m.position.distanceTo(g.position),S=.02,E=.005;h.inputState.pinching&&y>S+E?(h.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!h.inputState.pinching&&y<=S-E&&(h.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else f!==null&&e.gripSpace&&(l=t.getPose(e.gripSpace,r),l!==null&&(f.matrix.fromArray(l.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,l.linearVelocity?(f.hasLinearVelocity=!0,f.linearVelocity.copy(l.linearVelocity)):f.hasLinearVelocity=!1,l.angularVelocity?(f.hasAngularVelocity=!0,f.angularVelocity.copy(l.angularVelocity)):f.hasAngularVelocity=!1));u!==null&&(o=t.getPose(e.targetRaySpace,r),o===null&&l!==null&&(o=l),o!==null&&(u.matrix.fromArray(o.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,o.linearVelocity?(u.hasLinearVelocity=!0,u.linearVelocity.copy(o.linearVelocity)):u.hasLinearVelocity=!1,o.angularVelocity?(u.hasAngularVelocity=!0,u.angularVelocity.copy(o.angularVelocity)):u.hasAngularVelocity=!1,this.dispatchEvent(kT)))}return u!==null&&(u.visible=o!==null),f!==null&&(f.visible=l!==null),h!==null&&(h.visible=d!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const r=new Tr;r.matrixAutoUpdate=!1,r.visible=!1,e.joints[t.jointName]=r,e.add(r)}return e.joints[t.jointName]}}class zT extends ls{constructor(e,t){super();const r=this;let o=null,l=1,d=null,u="local-floor",f=1,h=null,m=null,g=null,y=null,S=null,E=null;const M=t.getContextAttributes();let _=null,v=null;const T=[],A=[],P=new Be;let F=null;const D=new $n;D.layers.enable(1),D.viewport=new Bt;const I=new $n;I.layers.enable(2),I.viewport=new Bt;const ie=[D,I],R=new FT;R.layers.enable(1),R.layers.enable(2);let U=null,se=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let de=T[Y];return de===void 0&&(de=new Dd,T[Y]=de),de.getTargetRaySpace()},this.getControllerGrip=function(Y){let de=T[Y];return de===void 0&&(de=new Dd,T[Y]=de),de.getGripSpace()},this.getHand=function(Y){let de=T[Y];return de===void 0&&(de=new Dd,T[Y]=de),de.getHandSpace()};function le(Y){const de=A.indexOf(Y.inputSource);if(de===-1)return;const ve=T[de];ve!==void 0&&(ve.update(Y.inputSource,Y.frame,h||d),ve.dispatchEvent({type:Y.type,data:Y.inputSource}))}function me(){o.removeEventListener("select",le),o.removeEventListener("selectstart",le),o.removeEventListener("selectend",le),o.removeEventListener("squeeze",le),o.removeEventListener("squeezestart",le),o.removeEventListener("squeezeend",le),o.removeEventListener("end",me),o.removeEventListener("inputsourceschange",H);for(let Y=0;Y<T.length;Y++){const de=A[Y];de!==null&&(A[Y]=null,T[Y].disconnect(de))}U=null,se=null,e.setRenderTarget(_),S=null,y=null,g=null,o=null,v=null,W.stop(),r.isPresenting=!1,e.setPixelRatio(F),e.setSize(P.width,P.height,!1),r.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){l=Y,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){u=Y,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return h||d},this.setReferenceSpace=function(Y){h=Y},this.getBaseLayer=function(){return y!==null?y:S},this.getBinding=function(){return g},this.getFrame=function(){return E},this.getSession=function(){return o},this.setSession=async function(Y){if(o=Y,o!==null){if(_=e.getRenderTarget(),o.addEventListener("select",le),o.addEventListener("selectstart",le),o.addEventListener("selectend",le),o.addEventListener("squeeze",le),o.addEventListener("squeezestart",le),o.addEventListener("squeezeend",le),o.addEventListener("end",me),o.addEventListener("inputsourceschange",H),M.xrCompatible!==!0&&await t.makeXRCompatible(),F=e.getPixelRatio(),e.getSize(P),o.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const de={antialias:o.renderState.layers===void 0?M.antialias:!0,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:l};S=new XRWebGLLayer(o,t,de),o.updateRenderState({baseLayer:S}),e.setPixelRatio(1),e.setSize(S.framebufferWidth,S.framebufferHeight,!1),v=new os(S.framebufferWidth,S.framebufferHeight,{format:gi,type:Rr,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil})}else{let de=null,ve=null,Te=null;M.depth&&(Te=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,de=M.stencil?co:ns,ve=M.stencil?ts:Er);const Ae={colorFormat:t.RGBA8,depthFormat:Te,scaleFactor:l};g=new XRWebGLBinding(o,t),y=g.createProjectionLayer(Ae),o.updateRenderState({layers:[y]}),e.setPixelRatio(1),e.setSize(y.textureWidth,y.textureHeight,!1),v=new os(y.textureWidth,y.textureHeight,{format:gi,type:Rr,depthTexture:new $v(y.textureWidth,y.textureHeight,ve,void 0,void 0,void 0,void 0,void 0,void 0,de),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0});const Fe=e.properties.get(v);Fe.__ignoreDepthValues=y.ignoreDepthValues}v.isXRRenderTarget=!0,this.setFoveation(f),h=null,d=await o.requestReferenceSpace(u),W.setContext(o),W.start(),r.isPresenting=!0,r.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(o!==null)return o.environmentBlendMode};function H(Y){for(let de=0;de<Y.removed.length;de++){const ve=Y.removed[de],Te=A.indexOf(ve);Te>=0&&(A[Te]=null,T[Te].disconnect(ve))}for(let de=0;de<Y.added.length;de++){const ve=Y.added[de];let Te=A.indexOf(ve);if(Te===-1){for(let Fe=0;Fe<T.length;Fe++)if(Fe>=A.length){A.push(ve),Te=Fe;break}else if(A[Fe]===null){A[Fe]=ve,Te=Fe;break}if(Te===-1)break}const Ae=T[Te];Ae&&Ae.connect(ve)}}const q=new z,te=new z;function J(Y,de,ve){q.setFromMatrixPosition(de.matrixWorld),te.setFromMatrixPosition(ve.matrixWorld);const Te=q.distanceTo(te),Ae=de.projectionMatrix.elements,Fe=ve.projectionMatrix.elements,ge=Ae[14]/(Ae[10]-1),be=Ae[14]/(Ae[10]+1),ze=(Ae[9]+1)/Ae[5],Q=(Ae[9]-1)/Ae[5],tt=(Ae[8]-1)/Ae[0],ke=(Fe[8]+1)/Fe[0],Je=ge*tt,Ve=ge*ke,Mt=Te/(-tt+ke),ot=Mt*-tt;de.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(ot),Y.translateZ(Mt),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert();const L=ge+Mt,C=be+Mt,re=Je-ot,Me=Ve+(Te-ot),ye=ze*be/C*L,we=Q*be/C*L;Y.projectionMatrix.makePerspective(re,Me,ye,we,L,C),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}function X(Y,de){de===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(de.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(o===null)return;R.near=I.near=D.near=Y.near,R.far=I.far=D.far=Y.far,(U!==R.near||se!==R.far)&&(o.updateRenderState({depthNear:R.near,depthFar:R.far}),U=R.near,se=R.far);const de=Y.parent,ve=R.cameras;X(R,de);for(let Te=0;Te<ve.length;Te++)X(ve[Te],de);ve.length===2?J(R,D,I):R.projectionMatrix.copy(D.projectionMatrix),K(Y,R,de)};function K(Y,de,ve){ve===null?Y.matrix.copy(de.matrixWorld):(Y.matrix.copy(ve.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(de.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(de.projectionMatrix),Y.projectionMatrixInverse.copy(de.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=ua*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return R},this.getFoveation=function(){if(!(y===null&&S===null))return f},this.setFoveation=function(Y){f=Y,y!==null&&(y.fixedFoveation=Y),S!==null&&S.fixedFoveation!==void 0&&(S.fixedFoveation=Y)};let $=null;function O(Y,de){if(m=de.getViewerPose(h||d),E=de,m!==null){const ve=m.views;S!==null&&(e.setRenderTargetFramebuffer(v,S.framebuffer),e.setRenderTarget(v));let Te=!1;ve.length!==R.cameras.length&&(R.cameras.length=0,Te=!0);for(let Ae=0;Ae<ve.length;Ae++){const Fe=ve[Ae];let ge=null;if(S!==null)ge=S.getViewport(Fe);else{const ze=g.getViewSubImage(y,Fe);ge=ze.viewport,Ae===0&&(e.setRenderTargetTextures(v,ze.colorTexture,y.ignoreDepthValues?void 0:ze.depthStencilTexture),e.setRenderTarget(v))}let be=ie[Ae];be===void 0&&(be=new $n,be.layers.enable(Ae),be.viewport=new Bt,ie[Ae]=be),be.matrix.fromArray(Fe.transform.matrix),be.matrix.decompose(be.position,be.quaternion,be.scale),be.projectionMatrix.fromArray(Fe.projectionMatrix),be.projectionMatrixInverse.copy(be.projectionMatrix).invert(),be.viewport.set(ge.x,ge.y,ge.width,ge.height),Ae===0&&(R.matrix.copy(be.matrix),R.matrix.decompose(R.position,R.quaternion,R.scale)),Te===!0&&R.cameras.push(be)}}for(let ve=0;ve<T.length;ve++){const Te=A[ve],Ae=T[ve];Te!==null&&Ae!==void 0&&Ae.update(Te,de,h||d)}$&&$(Y,de),de.detectedPlanes&&r.dispatchEvent({type:"planesdetected",data:de}),E=null}const W=new jv;W.setAnimationLoop(O),this.setAnimationLoop=function(Y){$=Y},this.dispose=function(){}}}function BT(s,e){function t(_,v){_.matrixAutoUpdate===!0&&_.updateMatrix(),v.value.copy(_.matrix)}function r(_,v){v.color.getRGB(_.fogColor.value,Vv(s)),v.isFog?(_.fogNear.value=v.near,_.fogFar.value=v.far):v.isFogExp2&&(_.fogDensity.value=v.density)}function o(_,v,T,A,P){v.isMeshBasicMaterial||v.isMeshLambertMaterial?l(_,v):v.isMeshToonMaterial?(l(_,v),g(_,v)):v.isMeshPhongMaterial?(l(_,v),m(_,v)):v.isMeshStandardMaterial?(l(_,v),y(_,v),v.isMeshPhysicalMaterial&&S(_,v,P)):v.isMeshMatcapMaterial?(l(_,v),E(_,v)):v.isMeshDepthMaterial?l(_,v):v.isMeshDistanceMaterial?(l(_,v),M(_,v)):v.isMeshNormalMaterial?l(_,v):v.isLineBasicMaterial?(d(_,v),v.isLineDashedMaterial&&u(_,v)):v.isPointsMaterial?f(_,v,T,A):v.isSpriteMaterial?h(_,v):v.isShadowMaterial?(_.color.value.copy(v.color),_.opacity.value=v.opacity):v.isShaderMaterial&&(v.uniformsNeedUpdate=!1)}function l(_,v){_.opacity.value=v.opacity,v.color&&_.diffuse.value.copy(v.color),v.emissive&&_.emissive.value.copy(v.emissive).multiplyScalar(v.emissiveIntensity),v.map&&(_.map.value=v.map,t(v.map,_.mapTransform)),v.alphaMap&&(_.alphaMap.value=v.alphaMap,t(v.alphaMap,_.alphaMapTransform)),v.bumpMap&&(_.bumpMap.value=v.bumpMap,t(v.bumpMap,_.bumpMapTransform),_.bumpScale.value=v.bumpScale,v.side===Cn&&(_.bumpScale.value*=-1)),v.normalMap&&(_.normalMap.value=v.normalMap,t(v.normalMap,_.normalMapTransform),_.normalScale.value.copy(v.normalScale),v.side===Cn&&_.normalScale.value.negate()),v.displacementMap&&(_.displacementMap.value=v.displacementMap,t(v.displacementMap,_.displacementMapTransform),_.displacementScale.value=v.displacementScale,_.displacementBias.value=v.displacementBias),v.emissiveMap&&(_.emissiveMap.value=v.emissiveMap,t(v.emissiveMap,_.emissiveMapTransform)),v.specularMap&&(_.specularMap.value=v.specularMap,t(v.specularMap,_.specularMapTransform)),v.alphaTest>0&&(_.alphaTest.value=v.alphaTest);const T=e.get(v).envMap;if(T&&(_.envMap.value=T,_.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,_.reflectivity.value=v.reflectivity,_.ior.value=v.ior,_.refractionRatio.value=v.refractionRatio),v.lightMap){_.lightMap.value=v.lightMap;const A=s._useLegacyLights===!0?Math.PI:1;_.lightMapIntensity.value=v.lightMapIntensity*A,t(v.lightMap,_.lightMapTransform)}v.aoMap&&(_.aoMap.value=v.aoMap,_.aoMapIntensity.value=v.aoMapIntensity,t(v.aoMap,_.aoMapTransform))}function d(_,v){_.diffuse.value.copy(v.color),_.opacity.value=v.opacity,v.map&&(_.map.value=v.map,t(v.map,_.mapTransform))}function u(_,v){_.dashSize.value=v.dashSize,_.totalSize.value=v.dashSize+v.gapSize,_.scale.value=v.scale}function f(_,v,T,A){_.diffuse.value.copy(v.color),_.opacity.value=v.opacity,_.size.value=v.size*T,_.scale.value=A*.5,v.map&&(_.map.value=v.map,t(v.map,_.uvTransform)),v.alphaMap&&(_.alphaMap.value=v.alphaMap,t(v.alphaMap,_.alphaMapTransform)),v.alphaTest>0&&(_.alphaTest.value=v.alphaTest)}function h(_,v){_.diffuse.value.copy(v.color),_.opacity.value=v.opacity,_.rotation.value=v.rotation,v.map&&(_.map.value=v.map,t(v.map,_.mapTransform)),v.alphaMap&&(_.alphaMap.value=v.alphaMap,t(v.alphaMap,_.alphaMapTransform)),v.alphaTest>0&&(_.alphaTest.value=v.alphaTest)}function m(_,v){_.specular.value.copy(v.specular),_.shininess.value=Math.max(v.shininess,1e-4)}function g(_,v){v.gradientMap&&(_.gradientMap.value=v.gradientMap)}function y(_,v){_.metalness.value=v.metalness,v.metalnessMap&&(_.metalnessMap.value=v.metalnessMap,t(v.metalnessMap,_.metalnessMapTransform)),_.roughness.value=v.roughness,v.roughnessMap&&(_.roughnessMap.value=v.roughnessMap,t(v.roughnessMap,_.roughnessMapTransform)),e.get(v).envMap&&(_.envMapIntensity.value=v.envMapIntensity)}function S(_,v,T){_.ior.value=v.ior,v.sheen>0&&(_.sheenColor.value.copy(v.sheenColor).multiplyScalar(v.sheen),_.sheenRoughness.value=v.sheenRoughness,v.sheenColorMap&&(_.sheenColorMap.value=v.sheenColorMap,t(v.sheenColorMap,_.sheenColorMapTransform)),v.sheenRoughnessMap&&(_.sheenRoughnessMap.value=v.sheenRoughnessMap,t(v.sheenRoughnessMap,_.sheenRoughnessMapTransform))),v.clearcoat>0&&(_.clearcoat.value=v.clearcoat,_.clearcoatRoughness.value=v.clearcoatRoughness,v.clearcoatMap&&(_.clearcoatMap.value=v.clearcoatMap,t(v.clearcoatMap,_.clearcoatMapTransform)),v.clearcoatRoughnessMap&&(_.clearcoatRoughnessMap.value=v.clearcoatRoughnessMap,t(v.clearcoatRoughnessMap,_.clearcoatRoughnessMapTransform)),v.clearcoatNormalMap&&(_.clearcoatNormalMap.value=v.clearcoatNormalMap,t(v.clearcoatNormalMap,_.clearcoatNormalMapTransform),_.clearcoatNormalScale.value.copy(v.clearcoatNormalScale),v.side===Cn&&_.clearcoatNormalScale.value.negate())),v.iridescence>0&&(_.iridescence.value=v.iridescence,_.iridescenceIOR.value=v.iridescenceIOR,_.iridescenceThicknessMinimum.value=v.iridescenceThicknessRange[0],_.iridescenceThicknessMaximum.value=v.iridescenceThicknessRange[1],v.iridescenceMap&&(_.iridescenceMap.value=v.iridescenceMap,t(v.iridescenceMap,_.iridescenceMapTransform)),v.iridescenceThicknessMap&&(_.iridescenceThicknessMap.value=v.iridescenceThicknessMap,t(v.iridescenceThicknessMap,_.iridescenceThicknessMapTransform))),v.transmission>0&&(_.transmission.value=v.transmission,_.transmissionSamplerMap.value=T.texture,_.transmissionSamplerSize.value.set(T.width,T.height),v.transmissionMap&&(_.transmissionMap.value=v.transmissionMap,t(v.transmissionMap,_.transmissionMapTransform)),_.thickness.value=v.thickness,v.thicknessMap&&(_.thicknessMap.value=v.thicknessMap,t(v.thicknessMap,_.thicknessMapTransform)),_.attenuationDistance.value=v.attenuationDistance,_.attenuationColor.value.copy(v.attenuationColor)),v.anisotropy>0&&(_.anisotropyVector.value.set(v.anisotropy*Math.cos(v.anisotropyRotation),v.anisotropy*Math.sin(v.anisotropyRotation)),v.anisotropyMap&&(_.anisotropyMap.value=v.anisotropyMap,t(v.anisotropyMap,_.anisotropyMapTransform))),_.specularIntensity.value=v.specularIntensity,_.specularColor.value.copy(v.specularColor),v.specularColorMap&&(_.specularColorMap.value=v.specularColorMap,t(v.specularColorMap,_.specularColorMapTransform)),v.specularIntensityMap&&(_.specularIntensityMap.value=v.specularIntensityMap,t(v.specularIntensityMap,_.specularIntensityMapTransform))}function E(_,v){v.matcap&&(_.matcap.value=v.matcap)}function M(_,v){const T=e.get(v).light;_.referencePosition.value.setFromMatrixPosition(T.matrixWorld),_.nearDistance.value=T.shadow.camera.near,_.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:o}}function HT(s,e,t,r){let o={},l={},d=[];const u=t.isWebGL2?s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS):0;function f(T,A){const P=A.program;r.uniformBlockBinding(T,P)}function h(T,A){let P=o[T.id];P===void 0&&(E(T),P=m(T),o[T.id]=P,T.addEventListener("dispose",_));const F=A.program;r.updateUBOMapping(T,F);const D=e.render.frame;l[T.id]!==D&&(y(T),l[T.id]=D)}function m(T){const A=g();T.__bindingPointIndex=A;const P=s.createBuffer(),F=T.__size,D=T.usage;return s.bindBuffer(s.UNIFORM_BUFFER,P),s.bufferData(s.UNIFORM_BUFFER,F,D),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,A,P),P}function g(){for(let T=0;T<u;T++)if(d.indexOf(T)===-1)return d.push(T),T;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function y(T){const A=o[T.id],P=T.uniforms,F=T.__cache;s.bindBuffer(s.UNIFORM_BUFFER,A);for(let D=0,I=P.length;D<I;D++){const ie=Array.isArray(P[D])?P[D]:[P[D]];for(let R=0,U=ie.length;R<U;R++){const se=ie[R];if(S(se,D,R,F)===!0){const le=se.__offset,me=Array.isArray(se.value)?se.value:[se.value];let H=0;for(let q=0;q<me.length;q++){const te=me[q],J=M(te);typeof te=="number"||typeof te=="boolean"?(se.__data[0]=te,s.bufferSubData(s.UNIFORM_BUFFER,le+H,se.__data)):te.isMatrix3?(se.__data[0]=te.elements[0],se.__data[1]=te.elements[1],se.__data[2]=te.elements[2],se.__data[3]=0,se.__data[4]=te.elements[3],se.__data[5]=te.elements[4],se.__data[6]=te.elements[5],se.__data[7]=0,se.__data[8]=te.elements[6],se.__data[9]=te.elements[7],se.__data[10]=te.elements[8],se.__data[11]=0):(te.toArray(se.__data,H),H+=J.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,le,se.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function S(T,A,P,F){const D=T.value,I=A+"_"+P;if(F[I]===void 0)return typeof D=="number"||typeof D=="boolean"?F[I]=D:F[I]=D.clone(),!0;{const ie=F[I];if(typeof D=="number"||typeof D=="boolean"){if(ie!==D)return F[I]=D,!0}else if(ie.equals(D)===!1)return ie.copy(D),!0}return!1}function E(T){const A=T.uniforms;let P=0;const F=16;for(let I=0,ie=A.length;I<ie;I++){const R=Array.isArray(A[I])?A[I]:[A[I]];for(let U=0,se=R.length;U<se;U++){const le=R[U],me=Array.isArray(le.value)?le.value:[le.value];for(let H=0,q=me.length;H<q;H++){const te=me[H],J=M(te),X=P%F;X!==0&&F-X<J.boundary&&(P+=F-X),le.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),le.__offset=P,P+=J.storage}}}const D=P%F;return D>0&&(P+=F-D),T.__size=P,T.__cache={},this}function M(T){const A={boundary:0,storage:0};return typeof T=="number"||typeof T=="boolean"?(A.boundary=4,A.storage=4):T.isVector2?(A.boundary=8,A.storage=8):T.isVector3||T.isColor?(A.boundary=16,A.storage=12):T.isVector4?(A.boundary=16,A.storage=16):T.isMatrix3?(A.boundary=48,A.storage=48):T.isMatrix4?(A.boundary=64,A.storage=64):T.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",T),A}function _(T){const A=T.target;A.removeEventListener("dispose",_);const P=d.indexOf(A.__bindingPointIndex);d.splice(P,1),s.deleteBuffer(o[A.id]),delete o[A.id],delete l[A.id]}function v(){for(const T in o)s.deleteBuffer(o[T]);d=[],o={},l={}}return{bind:f,update:h,dispose:v}}class Qv{constructor(e={}){const{canvas:t=FS(),context:r=null,depth:o=!0,stencil:l=!0,alpha:d=!1,antialias:u=!1,premultipliedAlpha:f=!0,preserveDrawingBuffer:h=!1,powerPreference:m="default",failIfMajorPerformanceCaveat:g=!1}=e;this.isWebGLRenderer=!0;let y;r!==null?y=r.getContextAttributes().alpha:y=d;const S=new Uint32Array(4),E=new Int32Array(4);let M=null,_=null;const v=[],T=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=un,this._useLegacyLights=!1,this.toneMapping=Cr,this.toneMappingExposure=1;const A=this;let P=!1,F=0,D=0,I=null,ie=-1,R=null;const U=new Bt,se=new Bt;let le=null;const me=new St(0);let H=0,q=t.width,te=t.height,J=1,X=null,K=null;const $=new Bt(0,0,q,te),O=new Bt(0,0,q,te);let W=!1;const Y=new mf;let de=!1,ve=!1,Te=null;const Ae=new Ht,Fe=new Be,ge=new z,be={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function ze(){return I===null?J:1}let Q=r;function tt(N,ee){for(let ue=0;ue<N.length;ue++){const fe=N[ue],ce=t.getContext(fe,ee);if(ce!==null)return ce}return null}try{const N={alpha:!0,depth:o,stencil:l,antialias:u,premultipliedAlpha:f,preserveDrawingBuffer:h,powerPreference:m,failIfMajorPerformanceCaveat:g};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${uf}`),t.addEventListener("webglcontextlost",Le,!1),t.addEventListener("webglcontextrestored",V,!1),t.addEventListener("webglcontextcreationerror",Pe,!1),Q===null){const ee=["webgl2","webgl","experimental-webgl"];if(A.isWebGL1Renderer===!0&&ee.shift(),Q=tt(ee,N),Q===null)throw tt(ee)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&Q instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),Q.getShaderPrecisionFormat===void 0&&(Q.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(N){throw console.error("THREE.WebGLRenderer: "+N.message),N}let ke,Je,Ve,Mt,ot,L,C,re,Me,ye,we,Ke,Ie,He,Ye,it,_e,pt,B,xe,Ue,Re,Xe,dt;function mt(){ke=new Z1(Q),Je=new j1(Q,ke,e),ke.init(Je),Re=new OT(Q,ke,Je),Ve=new UT(Q,ke,Je),Mt=new ew(Q),ot=new yT,L=new IT(Q,ke,Ve,ot,Je,Re,Mt),C=new $1(A),re=new K1(A),Me=new lM(Q,Je),Xe=new G1(Q,ke,Me,Je),ye=new J1(Q,Me,Mt,Xe),we=new rw(Q,ye,Me,Mt),B=new iw(Q,Je,L),it=new X1(ot),Ke=new xT(A,C,re,ke,Je,Xe,it),Ie=new BT(A,ot),He=new MT,Ye=new CT(ke,Je),pt=new V1(A,C,re,Ve,we,y,f),_e=new DT(A,we,Je),dt=new HT(Q,Mt,Je,Ve),xe=new W1(Q,ke,Mt,Je),Ue=new Q1(Q,ke,Mt,Je),Mt.programs=Ke.programs,A.capabilities=Je,A.extensions=ke,A.properties=ot,A.renderLists=He,A.shadowMap=_e,A.state=Ve,A.info=Mt}mt();const st=new zT(A,Q);this.xr=st,this.getContext=function(){return Q},this.getContextAttributes=function(){return Q.getContextAttributes()},this.forceContextLoss=function(){const N=ke.get("WEBGL_lose_context");N&&N.loseContext()},this.forceContextRestore=function(){const N=ke.get("WEBGL_lose_context");N&&N.restoreContext()},this.getPixelRatio=function(){return J},this.setPixelRatio=function(N){N!==void 0&&(J=N,this.setSize(q,te,!1))},this.getSize=function(N){return N.set(q,te)},this.setSize=function(N,ee,ue=!0){if(st.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}q=N,te=ee,t.width=Math.floor(N*J),t.height=Math.floor(ee*J),ue===!0&&(t.style.width=N+"px",t.style.height=ee+"px"),this.setViewport(0,0,N,ee)},this.getDrawingBufferSize=function(N){return N.set(q*J,te*J).floor()},this.setDrawingBufferSize=function(N,ee,ue){q=N,te=ee,J=ue,t.width=Math.floor(N*ue),t.height=Math.floor(ee*ue),this.setViewport(0,0,N,ee)},this.getCurrentViewport=function(N){return N.copy(U)},this.getViewport=function(N){return N.copy($)},this.setViewport=function(N,ee,ue,fe){N.isVector4?$.set(N.x,N.y,N.z,N.w):$.set(N,ee,ue,fe),Ve.viewport(U.copy($).multiplyScalar(J).floor())},this.getScissor=function(N){return N.copy(O)},this.setScissor=function(N,ee,ue,fe){N.isVector4?O.set(N.x,N.y,N.z,N.w):O.set(N,ee,ue,fe),Ve.scissor(se.copy(O).multiplyScalar(J).floor())},this.getScissorTest=function(){return W},this.setScissorTest=function(N){Ve.setScissorTest(W=N)},this.setOpaqueSort=function(N){X=N},this.setTransparentSort=function(N){K=N},this.getClearColor=function(N){return N.copy(pt.getClearColor())},this.setClearColor=function(){pt.setClearColor.apply(pt,arguments)},this.getClearAlpha=function(){return pt.getClearAlpha()},this.setClearAlpha=function(){pt.setClearAlpha.apply(pt,arguments)},this.clear=function(N=!0,ee=!0,ue=!0){let fe=0;if(N){let ce=!1;if(I!==null){const Ge=I.texture.format;ce=Ge===Rv||Ge===Cv||Ge===bv}if(ce){const Ge=I.texture.type,nt=Ge===Rr||Ge===Er||Ge===df||Ge===ts||Ge===Tv||Ge===Av,ct=pt.getClearColor(),je=pt.getClearAlpha(),gt=ct.r,ft=ct.g,ht=ct.b;nt?(S[0]=gt,S[1]=ft,S[2]=ht,S[3]=je,Q.clearBufferuiv(Q.COLOR,0,S)):(E[0]=gt,E[1]=ft,E[2]=ht,E[3]=je,Q.clearBufferiv(Q.COLOR,0,E))}else fe|=Q.COLOR_BUFFER_BIT}ee&&(fe|=Q.DEPTH_BUFFER_BIT),ue&&(fe|=Q.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),Q.clear(fe)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Le,!1),t.removeEventListener("webglcontextrestored",V,!1),t.removeEventListener("webglcontextcreationerror",Pe,!1),He.dispose(),Ye.dispose(),ot.dispose(),C.dispose(),re.dispose(),we.dispose(),Xe.dispose(),dt.dispose(),Ke.dispose(),st.dispose(),st.removeEventListener("sessionstart",Ct),st.removeEventListener("sessionend",At),Te&&(Te.dispose(),Te=null),Jt.stop()};function Le(N){N.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),P=!0}function V(){console.log("THREE.WebGLRenderer: Context Restored."),P=!1;const N=Mt.autoReset,ee=_e.enabled,ue=_e.autoUpdate,fe=_e.needsUpdate,ce=_e.type;mt(),Mt.autoReset=N,_e.enabled=ee,_e.autoUpdate=ue,_e.needsUpdate=fe,_e.type=ce}function Pe(N){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",N.statusMessage)}function Ne(N){const ee=N.target;ee.removeEventListener("dispose",Ne),oe(ee)}function oe(N){pe(N),ot.remove(N)}function pe(N){const ee=ot.get(N).programs;ee!==void 0&&(ee.forEach(function(ue){Ke.releaseProgram(ue)}),N.isShaderMaterial&&Ke.releaseShaderCache(N))}this.renderBufferDirect=function(N,ee,ue,fe,ce,Ge){ee===null&&(ee=be);const nt=ce.isMesh&&ce.matrixWorld.determinant()<0,ct=Sc(N,ee,ue,fe,ce);Ve.setMaterial(fe,nt);let je=ue.index,gt=1;if(fe.wireframe===!0){if(je=ye.getWireframeAttribute(ue),je===void 0)return;gt=2}const ft=ue.drawRange,ht=ue.attributes.position;let Nt=ft.start*gt,Sn=(ft.start+ft.count)*gt;Ge!==null&&(Nt=Math.max(Nt,Ge.start*gt),Sn=Math.min(Sn,(Ge.start+Ge.count)*gt)),je!==null?(Nt=Math.max(Nt,0),Sn=Math.min(Sn,je.count)):ht!=null&&(Nt=Math.max(Nt,0),Sn=Math.min(Sn,ht.count));const $t=Sn-Nt;if($t<0||$t===1/0)return;Xe.setup(ce,fe,ct,ue,je);let Pn,wt=xe;if(je!==null&&(Pn=Me.get(je),wt=Ue,wt.setIndex(Pn)),ce.isMesh)fe.wireframe===!0?(Ve.setLineWidth(fe.wireframeLinewidth*ze()),wt.setMode(Q.LINES)):wt.setMode(Q.TRIANGLES);else if(ce.isLine){let vt=fe.linewidth;vt===void 0&&(vt=1),Ve.setLineWidth(vt*ze()),ce.isLineSegments?wt.setMode(Q.LINES):ce.isLineLoop?wt.setMode(Q.LINE_LOOP):wt.setMode(Q.LINE_STRIP)}else ce.isPoints?wt.setMode(Q.POINTS):ce.isSprite&&wt.setMode(Q.TRIANGLES);if(ce.isBatchedMesh)wt.renderMultiDraw(ce._multiDrawStarts,ce._multiDrawCounts,ce._multiDrawCount);else if(ce.isInstancedMesh)wt.renderInstances(Nt,$t,ce.count);else if(ue.isInstancedBufferGeometry){const vt=ue._maxInstanceCount!==void 0?ue._maxInstanceCount:1/0,Mn=Math.min(ue.instanceCount,vt);wt.renderInstances(Nt,$t,Mn)}else wt.render(Nt,$t)};function rt(N,ee,ue){N.transparent===!0&&N.side===wi&&N.forceSinglePass===!1?(N.side=Cn,N.needsUpdate=!0,qi(N,ee,ue),N.side=Pr,N.needsUpdate=!0,qi(N,ee,ue),N.side=wi):qi(N,ee,ue)}this.compile=function(N,ee,ue=null){ue===null&&(ue=N),_=Ye.get(ue),_.init(),T.push(_),ue.traverseVisible(function(ce){ce.isLight&&ce.layers.test(ee.layers)&&(_.pushLight(ce),ce.castShadow&&_.pushShadow(ce))}),N!==ue&&N.traverseVisible(function(ce){ce.isLight&&ce.layers.test(ee.layers)&&(_.pushLight(ce),ce.castShadow&&_.pushShadow(ce))}),_.setupLights(A._useLegacyLights);const fe=new Set;return N.traverse(function(ce){const Ge=ce.material;if(Ge)if(Array.isArray(Ge))for(let nt=0;nt<Ge.length;nt++){const ct=Ge[nt];rt(ct,ue,ce),fe.add(ct)}else rt(Ge,ue,ce),fe.add(Ge)}),T.pop(),_=null,fe},this.compileAsync=function(N,ee,ue=null){const fe=this.compile(N,ee,ue);return new Promise(ce=>{function Ge(){if(fe.forEach(function(nt){ot.get(nt).currentProgram.isReady()&&fe.delete(nt)}),fe.size===0){ce(N);return}setTimeout(Ge,10)}ke.get("KHR_parallel_shader_compile")!==null?Ge():setTimeout(Ge,10)})};let et=null;function Et(N){et&&et(N)}function Ct(){Jt.stop()}function At(){Jt.start()}const Jt=new jv;Jt.setAnimationLoop(Et),typeof self<"u"&&Jt.setContext(self),this.setAnimationLoop=function(N){et=N,st.setAnimationLoop(N),N===null?Jt.stop():Jt.start()},st.addEventListener("sessionstart",Ct),st.addEventListener("sessionend",At),this.render=function(N,ee){if(ee!==void 0&&ee.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),ee.parent===null&&ee.matrixWorldAutoUpdate===!0&&ee.updateMatrixWorld(),st.enabled===!0&&st.isPresenting===!0&&(st.cameraAutoUpdate===!0&&st.updateCamera(ee),ee=st.getCamera()),N.isScene===!0&&N.onBeforeRender(A,N,ee,I),_=Ye.get(N,T.length),_.init(),T.push(_),Ae.multiplyMatrices(ee.projectionMatrix,ee.matrixWorldInverse),Y.setFromProjectionMatrix(Ae),ve=this.localClippingEnabled,de=it.init(this.clippingPlanes,ve),M=He.get(N,v.length),M.init(),v.push(M),hn(N,ee,0,A.sortObjects),M.finish(),A.sortObjects===!0&&M.sort(X,K),this.info.render.frame++,de===!0&&it.beginShadows();const ue=_.state.shadowsArray;if(_e.render(ue,N,ee),de===!0&&it.endShadows(),this.info.autoReset===!0&&this.info.reset(),pt.render(M,N),_.setupLights(A._useLegacyLights),ee.isArrayCamera){const fe=ee.cameras;for(let ce=0,Ge=fe.length;ce<Ge;ce++){const nt=fe[ce];ma(M,N,nt,nt.viewport)}}else ma(M,N,ee);I!==null&&(L.updateMultisampleRenderTarget(I),L.updateRenderTargetMipmap(I)),N.isScene===!0&&N.onAfterRender(A,N,ee),Xe.resetDefaultState(),ie=-1,R=null,T.pop(),T.length>0?_=T[T.length-1]:_=null,v.pop(),v.length>0?M=v[v.length-1]:M=null};function hn(N,ee,ue,fe){if(N.visible===!1)return;if(N.layers.test(ee.layers)){if(N.isGroup)ue=N.renderOrder;else if(N.isLOD)N.autoUpdate===!0&&N.update(ee);else if(N.isLight)_.pushLight(N),N.castShadow&&_.pushShadow(N);else if(N.isSprite){if(!N.frustumCulled||Y.intersectsSprite(N)){fe&&ge.setFromMatrixPosition(N.matrixWorld).applyMatrix4(Ae);const nt=we.update(N),ct=N.material;ct.visible&&M.push(N,nt,ct,ue,ge.z,null)}}else if((N.isMesh||N.isLine||N.isPoints)&&(!N.frustumCulled||Y.intersectsObject(N))){const nt=we.update(N),ct=N.material;if(fe&&(N.boundingSphere!==void 0?(N.boundingSphere===null&&N.computeBoundingSphere(),ge.copy(N.boundingSphere.center)):(nt.boundingSphere===null&&nt.computeBoundingSphere(),ge.copy(nt.boundingSphere.center)),ge.applyMatrix4(N.matrixWorld).applyMatrix4(Ae)),Array.isArray(ct)){const je=nt.groups;for(let gt=0,ft=je.length;gt<ft;gt++){const ht=je[gt],Nt=ct[ht.materialIndex];Nt&&Nt.visible&&M.push(N,nt,Nt,ue,ge.z,ht)}}else ct.visible&&M.push(N,nt,ct,ue,ge.z,null)}}const Ge=N.children;for(let nt=0,ct=Ge.length;nt<ct;nt++)hn(Ge[nt],ee,ue,fe)}function ma(N,ee,ue,fe){const ce=N.opaque,Ge=N.transmissive,nt=N.transparent;_.setupLightsView(ue),de===!0&&it.setGlobalState(A.clippingPlanes,ue),Ge.length>0&&Nr(ce,Ge,ee,ue),fe&&Ve.viewport(U.copy(fe)),ce.length>0&&bi(ce,ee,ue),Ge.length>0&&bi(Ge,ee,ue),nt.length>0&&bi(nt,ee,ue),Ve.buffers.depth.setTest(!0),Ve.buffers.depth.setMask(!0),Ve.buffers.color.setMask(!0),Ve.setPolygonOffset(!1)}function Nr(N,ee,ue,fe){if((ue.isScene===!0?ue.overrideMaterial:null)!==null)return;const Ge=Je.isWebGL2;Te===null&&(Te=new os(1,1,{generateMipmaps:!0,type:ke.has("EXT_color_buffer_half_float")?ca:Rr,minFilter:la,samples:Ge?4:0})),A.getDrawingBufferSize(Fe),Ge?Te.setSize(Fe.x,Fe.y):Te.setSize(ac(Fe.x),ac(Fe.y));const nt=A.getRenderTarget();A.setRenderTarget(Te),A.getClearColor(me),H=A.getClearAlpha(),H<1&&A.setClearColor(16777215,.5),A.clear();const ct=A.toneMapping;A.toneMapping=Cr,bi(N,ue,fe),L.updateMultisampleRenderTarget(Te),L.updateRenderTargetMipmap(Te);let je=!1;for(let gt=0,ft=ee.length;gt<ft;gt++){const ht=ee[gt],Nt=ht.object,Sn=ht.geometry,$t=ht.material,Pn=ht.group;if($t.side===wi&&Nt.layers.test(fe.layers)){const wt=$t.side;$t.side=Cn,$t.needsUpdate=!0,Dr(Nt,ue,fe,Sn,$t,Pn),$t.side=wt,$t.needsUpdate=!0,je=!0}}je===!0&&(L.updateMultisampleRenderTarget(Te),L.updateRenderTargetMipmap(Te)),A.setRenderTarget(nt),A.setClearColor(me,H),A.toneMapping=ct}function bi(N,ee,ue){const fe=ee.isScene===!0?ee.overrideMaterial:null;for(let ce=0,Ge=N.length;ce<Ge;ce++){const nt=N[ce],ct=nt.object,je=nt.geometry,gt=fe===null?nt.material:fe,ft=nt.group;ct.layers.test(ue.layers)&&Dr(ct,ee,ue,je,gt,ft)}}function Dr(N,ee,ue,fe,ce,Ge){N.onBeforeRender(A,ee,ue,fe,ce,Ge),N.modelViewMatrix.multiplyMatrices(ue.matrixWorldInverse,N.matrixWorld),N.normalMatrix.getNormalMatrix(N.modelViewMatrix),ce.onBeforeRender(A,ee,ue,fe,N,Ge),ce.transparent===!0&&ce.side===wi&&ce.forceSinglePass===!1?(ce.side=Cn,ce.needsUpdate=!0,A.renderBufferDirect(ue,ee,fe,ce,N,Ge),ce.side=Pr,ce.needsUpdate=!0,A.renderBufferDirect(ue,ee,fe,ce,N,Ge),ce.side=wi):A.renderBufferDirect(ue,ee,fe,ce,N,Ge),N.onAfterRender(A,ee,ue,fe,ce,Ge)}function qi(N,ee,ue){ee.isScene!==!0&&(ee=be);const fe=ot.get(N),ce=_.state.lights,Ge=_.state.shadowsArray,nt=ce.state.version,ct=Ke.getParameters(N,ce.state,Ge,ee,ue),je=Ke.getProgramCacheKey(ct);let gt=fe.programs;fe.environment=N.isMeshStandardMaterial?ee.environment:null,fe.fog=ee.fog,fe.envMap=(N.isMeshStandardMaterial?re:C).get(N.envMap||fe.environment),gt===void 0&&(N.addEventListener("dispose",Ne),gt=new Map,fe.programs=gt);let ft=gt.get(je);if(ft!==void 0){if(fe.currentProgram===ft&&fe.lightsStateVersion===nt)return va(N,ct),ft}else ct.uniforms=Ke.getUniforms(N),N.onBuild(ue,ct,A),N.onBeforeCompile(ct,A),ft=Ke.acquireProgram(ct,je),gt.set(je,ft),fe.uniforms=ct.uniforms;const ht=fe.uniforms;return(!N.isShaderMaterial&&!N.isRawShaderMaterial||N.clipping===!0)&&(ht.clippingPlanes=it.uniform),va(N,ct),fe.needsLights=_a(N),fe.lightsStateVersion=nt,fe.needsLights&&(ht.ambientLightColor.value=ce.state.ambient,ht.lightProbe.value=ce.state.probe,ht.directionalLights.value=ce.state.directional,ht.directionalLightShadows.value=ce.state.directionalShadow,ht.spotLights.value=ce.state.spot,ht.spotLightShadows.value=ce.state.spotShadow,ht.rectAreaLights.value=ce.state.rectArea,ht.ltc_1.value=ce.state.rectAreaLTC1,ht.ltc_2.value=ce.state.rectAreaLTC2,ht.pointLights.value=ce.state.point,ht.pointLightShadows.value=ce.state.pointShadow,ht.hemisphereLights.value=ce.state.hemi,ht.directionalShadowMap.value=ce.state.directionalShadowMap,ht.directionalShadowMatrix.value=ce.state.directionalShadowMatrix,ht.spotShadowMap.value=ce.state.spotShadowMap,ht.spotLightMatrix.value=ce.state.spotLightMatrix,ht.spotLightMap.value=ce.state.spotLightMap,ht.pointShadowMap.value=ce.state.pointShadowMap,ht.pointShadowMatrix.value=ce.state.pointShadowMatrix),fe.currentProgram=ft,fe.uniformsList=null,ft}function ga(N){if(N.uniformsList===null){const ee=N.currentProgram.getUniforms();N.uniformsList=Zl.seqWithValue(ee.seq,N.uniforms)}return N.uniformsList}function va(N,ee){const ue=ot.get(N);ue.outputColorSpace=ee.outputColorSpace,ue.batching=ee.batching,ue.instancing=ee.instancing,ue.instancingColor=ee.instancingColor,ue.skinning=ee.skinning,ue.morphTargets=ee.morphTargets,ue.morphNormals=ee.morphNormals,ue.morphColors=ee.morphColors,ue.morphTargetsCount=ee.morphTargetsCount,ue.numClippingPlanes=ee.numClippingPlanes,ue.numIntersection=ee.numClipIntersection,ue.vertexAlphas=ee.vertexAlphas,ue.vertexTangents=ee.vertexTangents,ue.toneMapping=ee.toneMapping}function Sc(N,ee,ue,fe,ce){ee.isScene!==!0&&(ee=be),L.resetTextureUnits();const Ge=ee.fog,nt=fe.isMeshStandardMaterial?ee.environment:null,ct=I===null?A.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:ji,je=(fe.isMeshStandardMaterial?re:C).get(fe.envMap||nt),gt=fe.vertexColors===!0&&!!ue.attributes.color&&ue.attributes.color.itemSize===4,ft=!!ue.attributes.tangent&&(!!fe.normalMap||fe.anisotropy>0),ht=!!ue.morphAttributes.position,Nt=!!ue.morphAttributes.normal,Sn=!!ue.morphAttributes.color;let $t=Cr;fe.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&($t=A.toneMapping);const Pn=ue.morphAttributes.position||ue.morphAttributes.normal||ue.morphAttributes.color,wt=Pn!==void 0?Pn.length:0,vt=ot.get(fe),Mn=_.state.lights;if(de===!0&&(ve===!0||N!==R)){const Ln=N===R&&fe.id===ie;it.setState(fe,N,Ln)}let kt=!1;fe.version===vt.__version?(vt.needsLights&&vt.lightsStateVersion!==Mn.state.version||vt.outputColorSpace!==ct||ce.isBatchedMesh&&vt.batching===!1||!ce.isBatchedMesh&&vt.batching===!0||ce.isInstancedMesh&&vt.instancing===!1||!ce.isInstancedMesh&&vt.instancing===!0||ce.isSkinnedMesh&&vt.skinning===!1||!ce.isSkinnedMesh&&vt.skinning===!0||ce.isInstancedMesh&&vt.instancingColor===!0&&ce.instanceColor===null||ce.isInstancedMesh&&vt.instancingColor===!1&&ce.instanceColor!==null||vt.envMap!==je||fe.fog===!0&&vt.fog!==Ge||vt.numClippingPlanes!==void 0&&(vt.numClippingPlanes!==it.numPlanes||vt.numIntersection!==it.numIntersection)||vt.vertexAlphas!==gt||vt.vertexTangents!==ft||vt.morphTargets!==ht||vt.morphNormals!==Nt||vt.morphColors!==Sn||vt.toneMapping!==$t||Je.isWebGL2===!0&&vt.morphTargetsCount!==wt)&&(kt=!0):(kt=!0,vt.__version=fe.version);let Ri=vt.currentProgram;kt===!0&&(Ri=qi(fe,ee,ce));let xa=!1,_i=!1,Ki=!1;const Wt=Ri.getUniforms(),qn=vt.uniforms;if(Ve.useProgram(Ri.program)&&(xa=!0,_i=!0,Ki=!0),fe.id!==ie&&(ie=fe.id,_i=!0),xa||R!==N){Wt.setValue(Q,"projectionMatrix",N.projectionMatrix),Wt.setValue(Q,"viewMatrix",N.matrixWorldInverse);const Ln=Wt.map.cameraPosition;Ln!==void 0&&Ln.setValue(Q,ge.setFromMatrixPosition(N.matrixWorld)),Je.logarithmicDepthBuffer&&Wt.setValue(Q,"logDepthBufFC",2/(Math.log(N.far+1)/Math.LN2)),(fe.isMeshPhongMaterial||fe.isMeshToonMaterial||fe.isMeshLambertMaterial||fe.isMeshBasicMaterial||fe.isMeshStandardMaterial||fe.isShaderMaterial)&&Wt.setValue(Q,"isOrthographic",N.isOrthographicCamera===!0),R!==N&&(R=N,_i=!0,Ki=!0)}if(ce.isSkinnedMesh){Wt.setOptional(Q,ce,"bindMatrix"),Wt.setOptional(Q,ce,"bindMatrixInverse");const Ln=ce.skeleton;Ln&&(Je.floatVertexTextures?(Ln.boneTexture===null&&Ln.computeBoneTexture(),Wt.setValue(Q,"boneTexture",Ln.boneTexture,L)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}ce.isBatchedMesh&&(Wt.setOptional(Q,ce,"batchingTexture"),Wt.setValue(Q,"batchingTexture",ce._matricesTexture,L));const vo=ue.morphAttributes;if((vo.position!==void 0||vo.normal!==void 0||vo.color!==void 0&&Je.isWebGL2===!0)&&B.update(ce,ue,Ri),(_i||vt.receiveShadow!==ce.receiveShadow)&&(vt.receiveShadow=ce.receiveShadow,Wt.setValue(Q,"receiveShadow",ce.receiveShadow)),fe.isMeshGouraudMaterial&&fe.envMap!==null&&(qn.envMap.value=je,qn.flipEnvMap.value=je.isCubeTexture&&je.isRenderTargetTexture===!1?-1:1),_i&&(Wt.setValue(Q,"toneMappingExposure",A.toneMappingExposure),vt.needsLights&&Ci(qn,Ki),Ge&&fe.fog===!0&&Ie.refreshFogUniforms(qn,Ge),Ie.refreshMaterialUniforms(qn,fe,J,te,Te),Zl.upload(Q,ga(vt),qn,L)),fe.isShaderMaterial&&fe.uniformsNeedUpdate===!0&&(Zl.upload(Q,ga(vt),qn,L),fe.uniformsNeedUpdate=!1),fe.isSpriteMaterial&&Wt.setValue(Q,"center",ce.center),Wt.setValue(Q,"modelViewMatrix",ce.modelViewMatrix),Wt.setValue(Q,"normalMatrix",ce.normalMatrix),Wt.setValue(Q,"modelMatrix",ce.matrixWorld),fe.isShaderMaterial||fe.isRawShaderMaterial){const Ln=fe.uniformsGroups;for(let Ur=0,ya=Ln.length;Ur<ya;Ur++)if(Je.isWebGL2){const cs=Ln[Ur];dt.update(cs,Ri),dt.bind(cs,Ri)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Ri}function Ci(N,ee){N.ambientLightColor.needsUpdate=ee,N.lightProbe.needsUpdate=ee,N.directionalLights.needsUpdate=ee,N.directionalLightShadows.needsUpdate=ee,N.pointLights.needsUpdate=ee,N.pointLightShadows.needsUpdate=ee,N.spotLights.needsUpdate=ee,N.spotLightShadows.needsUpdate=ee,N.rectAreaLights.needsUpdate=ee,N.hemisphereLights.needsUpdate=ee}function _a(N){return N.isMeshLambertMaterial||N.isMeshToonMaterial||N.isMeshPhongMaterial||N.isMeshStandardMaterial||N.isShadowMaterial||N.isShaderMaterial&&N.lights===!0}this.getActiveCubeFace=function(){return F},this.getActiveMipmapLevel=function(){return D},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(N,ee,ue){ot.get(N.texture).__webglTexture=ee,ot.get(N.depthTexture).__webglTexture=ue;const fe=ot.get(N);fe.__hasExternalTextures=!0,fe.__hasExternalTextures&&(fe.__autoAllocateDepthBuffer=ue===void 0,fe.__autoAllocateDepthBuffer||ke.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),fe.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(N,ee){const ue=ot.get(N);ue.__webglFramebuffer=ee,ue.__useDefaultFramebuffer=ee===void 0},this.setRenderTarget=function(N,ee=0,ue=0){I=N,F=ee,D=ue;let fe=!0,ce=null,Ge=!1,nt=!1;if(N){const je=ot.get(N);je.__useDefaultFramebuffer!==void 0?(Ve.bindFramebuffer(Q.FRAMEBUFFER,null),fe=!1):je.__webglFramebuffer===void 0?L.setupRenderTarget(N):je.__hasExternalTextures&&L.rebindTextures(N,ot.get(N.texture).__webglTexture,ot.get(N.depthTexture).__webglTexture);const gt=N.texture;(gt.isData3DTexture||gt.isDataArrayTexture||gt.isCompressedArrayTexture)&&(nt=!0);const ft=ot.get(N).__webglFramebuffer;N.isWebGLCubeRenderTarget?(Array.isArray(ft[ee])?ce=ft[ee][ue]:ce=ft[ee],Ge=!0):Je.isWebGL2&&N.samples>0&&L.useMultisampledRTT(N)===!1?ce=ot.get(N).__webglMultisampledFramebuffer:Array.isArray(ft)?ce=ft[ue]:ce=ft,U.copy(N.viewport),se.copy(N.scissor),le=N.scissorTest}else U.copy($).multiplyScalar(J).floor(),se.copy(O).multiplyScalar(J).floor(),le=W;if(Ve.bindFramebuffer(Q.FRAMEBUFFER,ce)&&Je.drawBuffers&&fe&&Ve.drawBuffers(N,ce),Ve.viewport(U),Ve.scissor(se),Ve.setScissorTest(le),Ge){const je=ot.get(N.texture);Q.framebufferTexture2D(Q.FRAMEBUFFER,Q.COLOR_ATTACHMENT0,Q.TEXTURE_CUBE_MAP_POSITIVE_X+ee,je.__webglTexture,ue)}else if(nt){const je=ot.get(N.texture),gt=ee||0;Q.framebufferTextureLayer(Q.FRAMEBUFFER,Q.COLOR_ATTACHMENT0,je.__webglTexture,ue||0,gt)}ie=-1},this.readRenderTargetPixels=function(N,ee,ue,fe,ce,Ge,nt){if(!(N&&N.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ct=ot.get(N).__webglFramebuffer;if(N.isWebGLCubeRenderTarget&&nt!==void 0&&(ct=ct[nt]),ct){Ve.bindFramebuffer(Q.FRAMEBUFFER,ct);try{const je=N.texture,gt=je.format,ft=je.type;if(gt!==gi&&Re.convert(gt)!==Q.getParameter(Q.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const ht=ft===ca&&(ke.has("EXT_color_buffer_half_float")||Je.isWebGL2&&ke.has("EXT_color_buffer_float"));if(ft!==Rr&&Re.convert(ft)!==Q.getParameter(Q.IMPLEMENTATION_COLOR_READ_TYPE)&&!(ft===wr&&(Je.isWebGL2||ke.has("OES_texture_float")||ke.has("WEBGL_color_buffer_float")))&&!ht){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}ee>=0&&ee<=N.width-fe&&ue>=0&&ue<=N.height-ce&&Q.readPixels(ee,ue,fe,ce,Re.convert(gt),Re.convert(ft),Ge)}finally{const je=I!==null?ot.get(I).__webglFramebuffer:null;Ve.bindFramebuffer(Q.FRAMEBUFFER,je)}}},this.copyFramebufferToTexture=function(N,ee,ue=0){const fe=Math.pow(2,-ue),ce=Math.floor(ee.image.width*fe),Ge=Math.floor(ee.image.height*fe);L.setTexture2D(ee,0),Q.copyTexSubImage2D(Q.TEXTURE_2D,ue,0,0,N.x,N.y,ce,Ge),Ve.unbindTexture()},this.copyTextureToTexture=function(N,ee,ue,fe=0){const ce=ee.image.width,Ge=ee.image.height,nt=Re.convert(ue.format),ct=Re.convert(ue.type);L.setTexture2D(ue,0),Q.pixelStorei(Q.UNPACK_FLIP_Y_WEBGL,ue.flipY),Q.pixelStorei(Q.UNPACK_PREMULTIPLY_ALPHA_WEBGL,ue.premultiplyAlpha),Q.pixelStorei(Q.UNPACK_ALIGNMENT,ue.unpackAlignment),ee.isDataTexture?Q.texSubImage2D(Q.TEXTURE_2D,fe,N.x,N.y,ce,Ge,nt,ct,ee.image.data):ee.isCompressedTexture?Q.compressedTexSubImage2D(Q.TEXTURE_2D,fe,N.x,N.y,ee.mipmaps[0].width,ee.mipmaps[0].height,nt,ee.mipmaps[0].data):Q.texSubImage2D(Q.TEXTURE_2D,fe,N.x,N.y,nt,ct,ee.image),fe===0&&ue.generateMipmaps&&Q.generateMipmap(Q.TEXTURE_2D),Ve.unbindTexture()},this.copyTextureToTexture3D=function(N,ee,ue,fe,ce=0){if(A.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const Ge=N.max.x-N.min.x+1,nt=N.max.y-N.min.y+1,ct=N.max.z-N.min.z+1,je=Re.convert(fe.format),gt=Re.convert(fe.type);let ft;if(fe.isData3DTexture)L.setTexture3D(fe,0),ft=Q.TEXTURE_3D;else if(fe.isDataArrayTexture||fe.isCompressedArrayTexture)L.setTexture2DArray(fe,0),ft=Q.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}Q.pixelStorei(Q.UNPACK_FLIP_Y_WEBGL,fe.flipY),Q.pixelStorei(Q.UNPACK_PREMULTIPLY_ALPHA_WEBGL,fe.premultiplyAlpha),Q.pixelStorei(Q.UNPACK_ALIGNMENT,fe.unpackAlignment);const ht=Q.getParameter(Q.UNPACK_ROW_LENGTH),Nt=Q.getParameter(Q.UNPACK_IMAGE_HEIGHT),Sn=Q.getParameter(Q.UNPACK_SKIP_PIXELS),$t=Q.getParameter(Q.UNPACK_SKIP_ROWS),Pn=Q.getParameter(Q.UNPACK_SKIP_IMAGES),wt=ue.isCompressedTexture?ue.mipmaps[ce]:ue.image;Q.pixelStorei(Q.UNPACK_ROW_LENGTH,wt.width),Q.pixelStorei(Q.UNPACK_IMAGE_HEIGHT,wt.height),Q.pixelStorei(Q.UNPACK_SKIP_PIXELS,N.min.x),Q.pixelStorei(Q.UNPACK_SKIP_ROWS,N.min.y),Q.pixelStorei(Q.UNPACK_SKIP_IMAGES,N.min.z),ue.isDataTexture||ue.isData3DTexture?Q.texSubImage3D(ft,ce,ee.x,ee.y,ee.z,Ge,nt,ct,je,gt,wt.data):ue.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),Q.compressedTexSubImage3D(ft,ce,ee.x,ee.y,ee.z,Ge,nt,ct,je,wt.data)):Q.texSubImage3D(ft,ce,ee.x,ee.y,ee.z,Ge,nt,ct,je,gt,wt),Q.pixelStorei(Q.UNPACK_ROW_LENGTH,ht),Q.pixelStorei(Q.UNPACK_IMAGE_HEIGHT,Nt),Q.pixelStorei(Q.UNPACK_SKIP_PIXELS,Sn),Q.pixelStorei(Q.UNPACK_SKIP_ROWS,$t),Q.pixelStorei(Q.UNPACK_SKIP_IMAGES,Pn),ce===0&&fe.generateMipmaps&&Q.generateMipmap(ft),Ve.unbindTexture()},this.initTexture=function(N){N.isCubeTexture?L.setTextureCube(N,0):N.isData3DTexture?L.setTexture3D(N,0):N.isDataArrayTexture||N.isCompressedArrayTexture?L.setTexture2DArray(N,0):L.setTexture2D(N,0),Ve.unbindTexture()},this.resetState=function(){F=0,D=0,I=null,Ve.reset(),Xe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Wi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===ff?"display-p3":"srgb",t.unpackColorSpace=Lt.workingColorSpace===gc?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===un?is:Lv}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===is?un:ji}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class VT extends Qv{}VT.prototype.isWebGL1Renderer=!0;class vf{constructor(e,t=1,r=1e3){this.isFog=!0,this.name="",this.color=new St(e),this.near=t,this.far=r}clone(){return new vf(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class e0 extends nn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class t0 extends mo{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new St(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Ng=new z,Dg=new z,Ug=new Ht,Ud=new pf,Wl=new vc;class GT extends nn{constructor(e=new Rn,t=new t0){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,r=[0];for(let o=1,l=t.count;o<l;o++)Ng.fromBufferAttribute(t,o-1),Dg.fromBufferAttribute(t,o),r[o]=r[o-1],r[o]+=Ng.distanceTo(Dg);e.setAttribute("lineDistance",new Ft(r,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const r=this.geometry,o=this.matrixWorld,l=e.params.Line.threshold,d=r.drawRange;if(r.boundingSphere===null&&r.computeBoundingSphere(),Wl.copy(r.boundingSphere),Wl.applyMatrix4(o),Wl.radius+=l,e.ray.intersectsSphere(Wl)===!1)return;Ug.copy(o).invert(),Ud.copy(e.ray).applyMatrix4(Ug);const u=l/((this.scale.x+this.scale.y+this.scale.z)/3),f=u*u,h=new z,m=new z,g=new z,y=new z,S=this.isLineSegments?2:1,E=r.index,_=r.attributes.position;if(E!==null){const v=Math.max(0,d.start),T=Math.min(E.count,d.start+d.count);for(let A=v,P=T-1;A<P;A+=S){const F=E.getX(A),D=E.getX(A+1);if(h.fromBufferAttribute(_,F),m.fromBufferAttribute(_,D),Ud.distanceSqToSegment(h,m,y,g)>f)continue;y.applyMatrix4(this.matrixWorld);const ie=e.ray.origin.distanceTo(y);ie<e.near||ie>e.far||t.push({distance:ie,point:g.clone().applyMatrix4(this.matrixWorld),index:A,face:null,faceIndex:null,object:this})}}else{const v=Math.max(0,d.start),T=Math.min(_.count,d.start+d.count);for(let A=v,P=T-1;A<P;A+=S){if(h.fromBufferAttribute(_,A),m.fromBufferAttribute(_,A+1),Ud.distanceSqToSegment(h,m,y,g)>f)continue;y.applyMatrix4(this.matrixWorld);const D=e.ray.origin.distanceTo(y);D<e.near||D>e.far||t.push({distance:D,point:g.clone().applyMatrix4(this.matrixWorld),index:A,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,r=Object.keys(t);if(r.length>0){const o=t[r[0]];if(o!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let l=0,d=o.length;l<d;l++){const u=o[l].name||String(l);this.morphTargetInfluences.push(0),this.morphTargetDictionary[u]=l}}}}}const Ig=new z,Og=new z;class WT extends GT{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,r=[];for(let o=0,l=t.count;o<l;o+=2)Ig.fromBufferAttribute(t,o),Og.fromBufferAttribute(t,o+1),r[o]=o===0?0:r[o-1],r[o+1]=r[o]+Ig.distanceTo(Og);e.setAttribute("lineDistance",new Ft(r,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class jT extends zn{constructor(e,t,r,o,l,d,u,f,h){super(e,t,r,o,l,d,u,f,h),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Ai{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const r=this.getUtoTmapping(e);return this.getPoint(r,t)}getPoints(e=5){const t=[];for(let r=0;r<=e;r++)t.push(this.getPoint(r/e));return t}getSpacedPoints(e=5){const t=[];for(let r=0;r<=e;r++)t.push(this.getPointAt(r/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let r,o=this.getPoint(0),l=0;t.push(0);for(let d=1;d<=e;d++)r=this.getPoint(d/e),l+=r.distanceTo(o),t.push(l),o=r;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const r=this.getLengths();let o=0;const l=r.length;let d;t?d=t:d=e*r[l-1];let u=0,f=l-1,h;for(;u<=f;)if(o=Math.floor(u+(f-u)/2),h=r[o]-d,h<0)u=o+1;else if(h>0)f=o-1;else{f=o;break}if(o=f,r[o]===d)return o/(l-1);const m=r[o],y=r[o+1]-m,S=(d-m)/y;return(o+S)/(l-1)}getTangent(e,t){let o=e-1e-4,l=e+1e-4;o<0&&(o=0),l>1&&(l=1);const d=this.getPoint(o),u=this.getPoint(l),f=t||(d.isVector2?new Be:new z);return f.copy(u).sub(d).normalize(),f}getTangentAt(e,t){const r=this.getUtoTmapping(e);return this.getTangent(r,t)}computeFrenetFrames(e,t){const r=new z,o=[],l=[],d=[],u=new z,f=new Ht;for(let S=0;S<=e;S++){const E=S/e;o[S]=this.getTangentAt(E,new z)}l[0]=new z,d[0]=new z;let h=Number.MAX_VALUE;const m=Math.abs(o[0].x),g=Math.abs(o[0].y),y=Math.abs(o[0].z);m<=h&&(h=m,r.set(1,0,0)),g<=h&&(h=g,r.set(0,1,0)),y<=h&&r.set(0,0,1),u.crossVectors(o[0],r).normalize(),l[0].crossVectors(o[0],u),d[0].crossVectors(o[0],l[0]);for(let S=1;S<=e;S++){if(l[S]=l[S-1].clone(),d[S]=d[S-1].clone(),u.crossVectors(o[S-1],o[S]),u.length()>Number.EPSILON){u.normalize();const E=Math.acos(tn(o[S-1].dot(o[S]),-1,1));l[S].applyMatrix4(f.makeRotationAxis(u,E))}d[S].crossVectors(o[S],l[S])}if(t===!0){let S=Math.acos(tn(l[0].dot(l[e]),-1,1));S/=e,o[0].dot(u.crossVectors(l[0],l[e]))>0&&(S=-S);for(let E=1;E<=e;E++)l[E].applyMatrix4(f.makeRotationAxis(o[E],S*E)),d[E].crossVectors(o[E],l[E])}return{tangents:o,normals:l,binormals:d}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class _f extends Ai{constructor(e=0,t=0,r=1,o=1,l=0,d=Math.PI*2,u=!1,f=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=r,this.yRadius=o,this.aStartAngle=l,this.aEndAngle=d,this.aClockwise=u,this.aRotation=f}getPoint(e,t){const r=t||new Be,o=Math.PI*2;let l=this.aEndAngle-this.aStartAngle;const d=Math.abs(l)<Number.EPSILON;for(;l<0;)l+=o;for(;l>o;)l-=o;l<Number.EPSILON&&(d?l=0:l=o),this.aClockwise===!0&&!d&&(l===o?l=-o:l=l-o);const u=this.aStartAngle+e*l;let f=this.aX+this.xRadius*Math.cos(u),h=this.aY+this.yRadius*Math.sin(u);if(this.aRotation!==0){const m=Math.cos(this.aRotation),g=Math.sin(this.aRotation),y=f-this.aX,S=h-this.aY;f=y*m-S*g+this.aX,h=y*g+S*m+this.aY}return r.set(f,h)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class XT extends _f{constructor(e,t,r,o,l,d){super(e,t,r,r,o,l,d),this.isArcCurve=!0,this.type="ArcCurve"}}function xf(){let s=0,e=0,t=0,r=0;function o(l,d,u,f){s=l,e=u,t=-3*l+3*d-2*u-f,r=2*l-2*d+u+f}return{initCatmullRom:function(l,d,u,f,h){o(d,u,h*(u-l),h*(f-d))},initNonuniformCatmullRom:function(l,d,u,f,h,m,g){let y=(d-l)/h-(u-l)/(h+m)+(u-d)/m,S=(u-d)/m-(f-d)/(m+g)+(f-u)/g;y*=m,S*=m,o(d,u,y,S)},calc:function(l){const d=l*l,u=d*l;return s+e*l+t*d+r*u}}}const jl=new z,Id=new xf,Od=new xf,Fd=new xf;class $T extends Ai{constructor(e=[],t=!1,r="centripetal",o=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=r,this.tension=o}getPoint(e,t=new z){const r=t,o=this.points,l=o.length,d=(l-(this.closed?0:1))*e;let u=Math.floor(d),f=d-u;this.closed?u+=u>0?0:(Math.floor(Math.abs(u)/l)+1)*l:f===0&&u===l-1&&(u=l-2,f=1);let h,m;this.closed||u>0?h=o[(u-1)%l]:(jl.subVectors(o[0],o[1]).add(o[0]),h=jl);const g=o[u%l],y=o[(u+1)%l];if(this.closed||u+2<l?m=o[(u+2)%l]:(jl.subVectors(o[l-1],o[l-2]).add(o[l-1]),m=jl),this.curveType==="centripetal"||this.curveType==="chordal"){const S=this.curveType==="chordal"?.5:.25;let E=Math.pow(h.distanceToSquared(g),S),M=Math.pow(g.distanceToSquared(y),S),_=Math.pow(y.distanceToSquared(m),S);M<1e-4&&(M=1),E<1e-4&&(E=M),_<1e-4&&(_=M),Id.initNonuniformCatmullRom(h.x,g.x,y.x,m.x,E,M,_),Od.initNonuniformCatmullRom(h.y,g.y,y.y,m.y,E,M,_),Fd.initNonuniformCatmullRom(h.z,g.z,y.z,m.z,E,M,_)}else this.curveType==="catmullrom"&&(Id.initCatmullRom(h.x,g.x,y.x,m.x,this.tension),Od.initCatmullRom(h.y,g.y,y.y,m.y,this.tension),Fd.initCatmullRom(h.z,g.z,y.z,m.z,this.tension));return r.set(Id.calc(f),Od.calc(f),Fd.calc(f)),r}copy(e){super.copy(e),this.points=[];for(let t=0,r=e.points.length;t<r;t++){const o=e.points[t];this.points.push(o.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,r=this.points.length;t<r;t++){const o=this.points[t];e.points.push(o.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,r=e.points.length;t<r;t++){const o=e.points[t];this.points.push(new z().fromArray(o))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Fg(s,e,t,r,o){const l=(r-e)*.5,d=(o-t)*.5,u=s*s,f=s*u;return(2*t-2*r+l+d)*f+(-3*t+3*r-2*l-d)*u+l*s+t}function YT(s,e){const t=1-s;return t*t*e}function qT(s,e){return 2*(1-s)*s*e}function KT(s,e){return s*s*e}function ra(s,e,t,r){return YT(s,e)+qT(s,t)+KT(s,r)}function ZT(s,e){const t=1-s;return t*t*t*e}function JT(s,e){const t=1-s;return 3*t*t*s*e}function QT(s,e){return 3*(1-s)*s*s*e}function eA(s,e){return s*s*s*e}function sa(s,e,t,r,o){return ZT(s,e)+JT(s,t)+QT(s,r)+eA(s,o)}class n0 extends Ai{constructor(e=new Be,t=new Be,r=new Be,o=new Be){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=r,this.v3=o}getPoint(e,t=new Be){const r=t,o=this.v0,l=this.v1,d=this.v2,u=this.v3;return r.set(sa(e,o.x,l.x,d.x,u.x),sa(e,o.y,l.y,d.y,u.y)),r}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class tA extends Ai{constructor(e=new z,t=new z,r=new z,o=new z){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=r,this.v3=o}getPoint(e,t=new z){const r=t,o=this.v0,l=this.v1,d=this.v2,u=this.v3;return r.set(sa(e,o.x,l.x,d.x,u.x),sa(e,o.y,l.y,d.y,u.y),sa(e,o.z,l.z,d.z,u.z)),r}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class i0 extends Ai{constructor(e=new Be,t=new Be){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Be){const r=t;return e===1?r.copy(this.v2):(r.copy(this.v2).sub(this.v1),r.multiplyScalar(e).add(this.v1)),r}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Be){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class nA extends Ai{constructor(e=new z,t=new z){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new z){const r=t;return e===1?r.copy(this.v2):(r.copy(this.v2).sub(this.v1),r.multiplyScalar(e).add(this.v1)),r}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new z){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class r0 extends Ai{constructor(e=new Be,t=new Be,r=new Be){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=r}getPoint(e,t=new Be){const r=t,o=this.v0,l=this.v1,d=this.v2;return r.set(ra(e,o.x,l.x,d.x),ra(e,o.y,l.y,d.y)),r}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class iA extends Ai{constructor(e=new z,t=new z,r=new z){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=r}getPoint(e,t=new z){const r=t,o=this.v0,l=this.v1,d=this.v2;return r.set(ra(e,o.x,l.x,d.x),ra(e,o.y,l.y,d.y),ra(e,o.z,l.z,d.z)),r}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class s0 extends Ai{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Be){const r=t,o=this.points,l=(o.length-1)*e,d=Math.floor(l),u=l-d,f=o[d===0?d:d-1],h=o[d],m=o[d>o.length-2?o.length-1:d+1],g=o[d>o.length-3?o.length-1:d+2];return r.set(Fg(u,f.x,h.x,m.x,g.x),Fg(u,f.y,h.y,m.y,g.y)),r}copy(e){super.copy(e),this.points=[];for(let t=0,r=e.points.length;t<r;t++){const o=e.points[t];this.points.push(o.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,r=this.points.length;t<r;t++){const o=this.points[t];e.points.push(o.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,r=e.points.length;t<r;t++){const o=e.points[t];this.points.push(new Be().fromArray(o))}return this}}var kg=Object.freeze({__proto__:null,ArcCurve:XT,CatmullRomCurve3:$T,CubicBezierCurve:n0,CubicBezierCurve3:tA,EllipseCurve:_f,LineCurve:i0,LineCurve3:nA,QuadraticBezierCurve:r0,QuadraticBezierCurve3:iA,SplineCurve:s0});class rA extends Ai{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const r=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new kg[r](t,e))}return this}getPoint(e,t){const r=e*this.getLength(),o=this.getCurveLengths();let l=0;for(;l<o.length;){if(o[l]>=r){const d=o[l]-r,u=this.curves[l],f=u.getLength(),h=f===0?0:1-d/f;return u.getPointAt(h,t)}l++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let r=0,o=this.curves.length;r<o;r++)t+=this.curves[r].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let r=0;r<=e;r++)t.push(this.getPoint(r/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let r;for(let o=0,l=this.curves;o<l.length;o++){const d=l[o],u=d.isEllipseCurve?e*2:d.isLineCurve||d.isLineCurve3?1:d.isSplineCurve?e*d.points.length:e,f=d.getPoints(u);for(let h=0;h<f.length;h++){const m=f[h];r&&r.equals(m)||(t.push(m),r=m)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,r=e.curves.length;t<r;t++){const o=e.curves[t];this.curves.push(o.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,r=this.curves.length;t<r;t++){const o=this.curves[t];e.curves.push(o.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,r=e.curves.length;t<r;t++){const o=e.curves[t];this.curves.push(new kg[o.type]().fromJSON(o))}return this}}class sA extends rA{constructor(e){super(),this.type="Path",this.currentPoint=new Be,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,r=e.length;t<r;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const r=new i0(this.currentPoint.clone(),new Be(e,t));return this.curves.push(r),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,r,o){const l=new r0(this.currentPoint.clone(),new Be(e,t),new Be(r,o));return this.curves.push(l),this.currentPoint.set(r,o),this}bezierCurveTo(e,t,r,o,l,d){const u=new n0(this.currentPoint.clone(),new Be(e,t),new Be(r,o),new Be(l,d));return this.curves.push(u),this.currentPoint.set(l,d),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),r=new s0(t);return this.curves.push(r),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,r,o,l,d){const u=this.currentPoint.x,f=this.currentPoint.y;return this.absarc(e+u,t+f,r,o,l,d),this}absarc(e,t,r,o,l,d){return this.absellipse(e,t,r,r,o,l,d),this}ellipse(e,t,r,o,l,d,u,f){const h=this.currentPoint.x,m=this.currentPoint.y;return this.absellipse(e+h,t+m,r,o,l,d,u,f),this}absellipse(e,t,r,o,l,d,u,f){const h=new _f(e,t,r,o,l,d,u,f);if(this.curves.length>0){const g=h.getPoint(0);g.equals(this.currentPoint)||this.lineTo(g.x,g.y)}this.curves.push(h);const m=h.getPoint(1);return this.currentPoint.copy(m),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class yf extends Rn{constructor(e=[new Be(0,-.5),new Be(.5,0),new Be(0,.5)],t=12,r=0,o=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:r,phiLength:o},t=Math.floor(t),o=tn(o,0,Math.PI*2);const l=[],d=[],u=[],f=[],h=[],m=1/t,g=new z,y=new Be,S=new z,E=new z,M=new z;let _=0,v=0;for(let T=0;T<=e.length-1;T++)switch(T){case 0:_=e[T+1].x-e[T].x,v=e[T+1].y-e[T].y,S.x=v*1,S.y=-_,S.z=v*0,M.copy(S),S.normalize(),f.push(S.x,S.y,S.z);break;case e.length-1:f.push(M.x,M.y,M.z);break;default:_=e[T+1].x-e[T].x,v=e[T+1].y-e[T].y,S.x=v*1,S.y=-_,S.z=v*0,E.copy(S),S.x+=M.x,S.y+=M.y,S.z+=M.z,S.normalize(),f.push(S.x,S.y,S.z),M.copy(E)}for(let T=0;T<=t;T++){const A=r+T*m*o,P=Math.sin(A),F=Math.cos(A);for(let D=0;D<=e.length-1;D++){g.x=e[D].x*P,g.y=e[D].y,g.z=e[D].x*F,d.push(g.x,g.y,g.z),y.x=T/t,y.y=D/(e.length-1),u.push(y.x,y.y);const I=f[3*D+0]*P,ie=f[3*D+1],R=f[3*D+0]*F;h.push(I,ie,R)}}for(let T=0;T<t;T++)for(let A=0;A<e.length-1;A++){const P=A+T*e.length,F=P,D=P+e.length,I=P+e.length+1,ie=P+1;l.push(F,D,ie),l.push(I,ie,D)}this.setIndex(l),this.setAttribute("position",new Ft(d,3)),this.setAttribute("uv",new Ft(u,2)),this.setAttribute("normal",new Ft(h,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new yf(e.points,e.segments,e.phiStart,e.phiLength)}}class Sf extends yf{constructor(e=1,t=1,r=4,o=8){const l=new sA;l.absarc(0,-t/2,e,Math.PI*1.5,0),l.absarc(0,t/2,e,0,Math.PI*.5),super(l.getPoints(r),o),this.type="CapsuleGeometry",this.parameters={radius:e,length:t,capSegments:r,radialSegments:o}}static fromJSON(e){return new Sf(e.radius,e.length,e.capSegments,e.radialSegments)}}class Mf extends Rn{constructor(e=1,t=32,r=0,o=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:r,thetaLength:o},t=Math.max(3,t);const l=[],d=[],u=[],f=[],h=new z,m=new Be;d.push(0,0,0),u.push(0,0,1),f.push(.5,.5);for(let g=0,y=3;g<=t;g++,y+=3){const S=r+g/t*o;h.x=e*Math.cos(S),h.y=e*Math.sin(S),d.push(h.x,h.y,h.z),u.push(0,0,1),m.x=(d[y]/e+1)/2,m.y=(d[y+1]/e+1)/2,f.push(m.x,m.y)}for(let g=1;g<=t;g++)l.push(g,g+1,0);this.setIndex(l),this.setAttribute("position",new Ft(d,3)),this.setAttribute("normal",new Ft(u,3)),this.setAttribute("uv",new Ft(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Mf(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class pa extends Rn{constructor(e=1,t=1,r=1,o=32,l=1,d=!1,u=0,f=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:r,radialSegments:o,heightSegments:l,openEnded:d,thetaStart:u,thetaLength:f};const h=this;o=Math.floor(o),l=Math.floor(l);const m=[],g=[],y=[],S=[];let E=0;const M=[],_=r/2;let v=0;T(),d===!1&&(e>0&&A(!0),t>0&&A(!1)),this.setIndex(m),this.setAttribute("position",new Ft(g,3)),this.setAttribute("normal",new Ft(y,3)),this.setAttribute("uv",new Ft(S,2));function T(){const P=new z,F=new z;let D=0;const I=(t-e)/r;for(let ie=0;ie<=l;ie++){const R=[],U=ie/l,se=U*(t-e)+e;for(let le=0;le<=o;le++){const me=le/o,H=me*f+u,q=Math.sin(H),te=Math.cos(H);F.x=se*q,F.y=-U*r+_,F.z=se*te,g.push(F.x,F.y,F.z),P.set(q,I,te).normalize(),y.push(P.x,P.y,P.z),S.push(me,1-U),R.push(E++)}M.push(R)}for(let ie=0;ie<o;ie++)for(let R=0;R<l;R++){const U=M[R][ie],se=M[R+1][ie],le=M[R+1][ie+1],me=M[R][ie+1];m.push(U,se,me),m.push(se,le,me),D+=6}h.addGroup(v,D,0),v+=D}function A(P){const F=E,D=new Be,I=new z;let ie=0;const R=P===!0?e:t,U=P===!0?1:-1;for(let le=1;le<=o;le++)g.push(0,_*U,0),y.push(0,U,0),S.push(.5,.5),E++;const se=E;for(let le=0;le<=o;le++){const H=le/o*f+u,q=Math.cos(H),te=Math.sin(H);I.x=R*te,I.y=_*U,I.z=R*q,g.push(I.x,I.y,I.z),y.push(0,U,0),D.x=q*.5+.5,D.y=te*.5*U+.5,S.push(D.x,D.y),E++}for(let le=0;le<o;le++){const me=F+le,H=se+le;P===!0?m.push(H,H+1,me):m.push(H+1,H,me),ie+=3}h.addGroup(v,ie,P===!0?1:2),v+=ie}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new pa(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ef extends pa{constructor(e=1,t=1,r=32,o=1,l=!1,d=0,u=Math.PI*2){super(0,e,t,r,o,l,d,u),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:r,heightSegments:o,openEnded:l,thetaStart:d,thetaLength:u}}static fromJSON(e){return new Ef(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}const Xl=new z,$l=new z,kd=new z,Yl=new ri;class oA extends Rn{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const o=Math.pow(10,4),l=Math.cos(io*t),d=e.getIndex(),u=e.getAttribute("position"),f=d?d.count:u.count,h=[0,0,0],m=["a","b","c"],g=new Array(3),y={},S=[];for(let E=0;E<f;E+=3){d?(h[0]=d.getX(E),h[1]=d.getX(E+1),h[2]=d.getX(E+2)):(h[0]=E,h[1]=E+1,h[2]=E+2);const{a:M,b:_,c:v}=Yl;if(M.fromBufferAttribute(u,h[0]),_.fromBufferAttribute(u,h[1]),v.fromBufferAttribute(u,h[2]),Yl.getNormal(kd),g[0]=`${Math.round(M.x*o)},${Math.round(M.y*o)},${Math.round(M.z*o)}`,g[1]=`${Math.round(_.x*o)},${Math.round(_.y*o)},${Math.round(_.z*o)}`,g[2]=`${Math.round(v.x*o)},${Math.round(v.y*o)},${Math.round(v.z*o)}`,!(g[0]===g[1]||g[1]===g[2]||g[2]===g[0]))for(let T=0;T<3;T++){const A=(T+1)%3,P=g[T],F=g[A],D=Yl[m[T]],I=Yl[m[A]],ie=`${P}_${F}`,R=`${F}_${P}`;R in y&&y[R]?(kd.dot(y[R].normal)<=l&&(S.push(D.x,D.y,D.z),S.push(I.x,I.y,I.z)),y[R]=null):ie in y||(y[ie]={index0:h[T],index1:h[A],normal:kd.clone()})}}for(const E in y)if(y[E]){const{index0:M,index1:_}=y[E];Xl.fromBufferAttribute(u,M),$l.fromBufferAttribute(u,_),S.push(Xl.x,Xl.y,Xl.z),S.push($l.x,$l.y,$l.z)}this.setAttribute("position",new Ft(S,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class cc extends Rn{constructor(e=.5,t=1,r=32,o=1,l=0,d=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:r,phiSegments:o,thetaStart:l,thetaLength:d},r=Math.max(3,r),o=Math.max(1,o);const u=[],f=[],h=[],m=[];let g=e;const y=(t-e)/o,S=new z,E=new Be;for(let M=0;M<=o;M++){for(let _=0;_<=r;_++){const v=l+_/r*d;S.x=g*Math.cos(v),S.y=g*Math.sin(v),f.push(S.x,S.y,S.z),h.push(0,0,1),E.x=(S.x/t+1)/2,E.y=(S.y/t+1)/2,m.push(E.x,E.y)}g+=y}for(let M=0;M<o;M++){const _=M*(r+1);for(let v=0;v<r;v++){const T=v+_,A=T,P=T+r+1,F=T+r+2,D=T+1;u.push(A,P,D),u.push(P,F,D)}}this.setIndex(u),this.setAttribute("position",new Ft(f,3)),this.setAttribute("normal",new Ft(h,3)),this.setAttribute("uv",new Ft(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new cc(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class uc extends Rn{constructor(e=1,t=32,r=16,o=0,l=Math.PI*2,d=0,u=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:r,phiStart:o,phiLength:l,thetaStart:d,thetaLength:u},t=Math.max(3,Math.floor(t)),r=Math.max(2,Math.floor(r));const f=Math.min(d+u,Math.PI);let h=0;const m=[],g=new z,y=new z,S=[],E=[],M=[],_=[];for(let v=0;v<=r;v++){const T=[],A=v/r;let P=0;v===0&&d===0?P=.5/t:v===r&&f===Math.PI&&(P=-.5/t);for(let F=0;F<=t;F++){const D=F/t;g.x=-e*Math.cos(o+D*l)*Math.sin(d+A*u),g.y=e*Math.cos(d+A*u),g.z=e*Math.sin(o+D*l)*Math.sin(d+A*u),E.push(g.x,g.y,g.z),y.copy(g).normalize(),M.push(y.x,y.y,y.z),_.push(D+P,1-A),T.push(h++)}m.push(T)}for(let v=0;v<r;v++)for(let T=0;T<t;T++){const A=m[v][T+1],P=m[v][T],F=m[v+1][T],D=m[v+1][T+1];(v!==0||d>0)&&S.push(A,P,D),(v!==r-1||f<Math.PI)&&S.push(P,F,D)}this.setIndex(S),this.setAttribute("position",new Ft(E,3)),this.setAttribute("normal",new Ft(M,3)),this.setAttribute("uv",new Ft(_,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new uc(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class rs extends mo{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new St(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new St(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Nv,this.normalScale=new Be(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class wf extends nn{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new St(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}class aA extends wf{constructor(e,t,r){super(e,r),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(nn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new St(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const zd=new Ht,zg=new z,Bg=new z;class o0{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Be(512,512),this.map=null,this.mapPass=null,this.matrix=new Ht,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new mf,this._frameExtents=new Be(1,1),this._viewportCount=1,this._viewports=[new Bt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,r=this.matrix;zg.setFromMatrixPosition(e.matrixWorld),t.position.copy(zg),Bg.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Bg),t.updateMatrixWorld(),zd.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(zd),r.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),r.multiply(zd)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Hg=new Ht,ta=new z,Bd=new z;class lA extends o0{constructor(){super(new $n(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Be(4,2),this._viewportCount=6,this._viewports=[new Bt(2,1,1,1),new Bt(0,1,1,1),new Bt(3,1,1,1),new Bt(1,1,1,1),new Bt(3,0,1,1),new Bt(1,0,1,1)],this._cubeDirections=[new z(1,0,0),new z(-1,0,0),new z(0,0,1),new z(0,0,-1),new z(0,1,0),new z(0,-1,0)],this._cubeUps=[new z(0,1,0),new z(0,1,0),new z(0,1,0),new z(0,1,0),new z(0,0,1),new z(0,0,-1)]}updateMatrices(e,t=0){const r=this.camera,o=this.matrix,l=e.distance||r.far;l!==r.far&&(r.far=l,r.updateProjectionMatrix()),ta.setFromMatrixPosition(e.matrixWorld),r.position.copy(ta),Bd.copy(r.position),Bd.add(this._cubeDirections[t]),r.up.copy(this._cubeUps[t]),r.lookAt(Bd),r.updateMatrixWorld(),o.makeTranslation(-ta.x,-ta.y,-ta.z),Hg.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Hg)}}class cA extends wf{constructor(e,t,r=0,o=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=r,this.decay=o,this.shadow=new lA}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class uA extends o0{constructor(){super(new Xv(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Vg extends wf{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(nn.DEFAULT_UP),this.updateMatrix(),this.target=new nn,this.shadow=new uA}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Gg{constructor(e=1,t=0,r=0){return this.radius=e,this.phi=t,this.theta=r,this}set(e,t,r){return this.radius=e,this.phi=t,this.theta=r,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,r){return this.radius=Math.sqrt(e*e+t*t+r*r),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,r),this.phi=Math.acos(tn(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:uf}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=uf);const Wg={type:"change"},Hd={type:"start"},jg={type:"end"},ql=new pf,Xg=new Sr,dA=Math.cos(70*es.DEG2RAD);class fA extends ls{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new z,this.cursor=new z,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ns.ROTATE,MIDDLE:Ns.DOLLY,RIGHT:Ns.PAN},this.touches={ONE:Ds.ROTATE,TWO:Ds.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return u.phi},this.getAzimuthalAngle=function(){return u.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(B){B.addEventListener("keydown",we),this._domElementKeyEvents=B},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",we),this._domElementKeyEvents=null},this.saveState=function(){r.target0.copy(r.target),r.position0.copy(r.object.position),r.zoom0=r.object.zoom},this.reset=function(){r.target.copy(r.target0),r.object.position.copy(r.position0),r.object.zoom=r.zoom0,r.object.updateProjectionMatrix(),r.dispatchEvent(Wg),r.update(),l=o.NONE},this.update=function(){const B=new z,xe=new Xi().setFromUnitVectors(e.up,new z(0,1,0)),Ue=xe.clone().invert(),Re=new z,Xe=new Xi,dt=new z,mt=2*Math.PI;return function(Le=null){const V=r.object.position;B.copy(V).sub(r.target),B.applyQuaternion(xe),u.setFromVector3(B),r.autoRotate&&l===o.NONE&&se(R(Le)),r.enableDamping?(u.theta+=f.theta*r.dampingFactor,u.phi+=f.phi*r.dampingFactor):(u.theta+=f.theta,u.phi+=f.phi);let Pe=r.minAzimuthAngle,Ne=r.maxAzimuthAngle;isFinite(Pe)&&isFinite(Ne)&&(Pe<-Math.PI?Pe+=mt:Pe>Math.PI&&(Pe-=mt),Ne<-Math.PI?Ne+=mt:Ne>Math.PI&&(Ne-=mt),Pe<=Ne?u.theta=Math.max(Pe,Math.min(Ne,u.theta)):u.theta=u.theta>(Pe+Ne)/2?Math.max(Pe,u.theta):Math.min(Ne,u.theta)),u.phi=Math.max(r.minPolarAngle,Math.min(r.maxPolarAngle,u.phi)),u.makeSafe(),r.enableDamping===!0?r.target.addScaledVector(m,r.dampingFactor):r.target.add(m),r.target.sub(r.cursor),r.target.clampLength(r.minTargetRadius,r.maxTargetRadius),r.target.add(r.cursor),r.zoomToCursor&&D||r.object.isOrthographicCamera?u.radius=K(u.radius):u.radius=K(u.radius*h),B.setFromSpherical(u),B.applyQuaternion(Ue),V.copy(r.target).add(B),r.object.lookAt(r.target),r.enableDamping===!0?(f.theta*=1-r.dampingFactor,f.phi*=1-r.dampingFactor,m.multiplyScalar(1-r.dampingFactor)):(f.set(0,0,0),m.set(0,0,0));let oe=!1;if(r.zoomToCursor&&D){let pe=null;if(r.object.isPerspectiveCamera){const rt=B.length();pe=K(rt*h);const et=rt-pe;r.object.position.addScaledVector(P,et),r.object.updateMatrixWorld()}else if(r.object.isOrthographicCamera){const rt=new z(F.x,F.y,0);rt.unproject(r.object),r.object.zoom=Math.max(r.minZoom,Math.min(r.maxZoom,r.object.zoom/h)),r.object.updateProjectionMatrix(),oe=!0;const et=new z(F.x,F.y,0);et.unproject(r.object),r.object.position.sub(et).add(rt),r.object.updateMatrixWorld(),pe=B.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),r.zoomToCursor=!1;pe!==null&&(this.screenSpacePanning?r.target.set(0,0,-1).transformDirection(r.object.matrix).multiplyScalar(pe).add(r.object.position):(ql.origin.copy(r.object.position),ql.direction.set(0,0,-1).transformDirection(r.object.matrix),Math.abs(r.object.up.dot(ql.direction))<dA?e.lookAt(r.target):(Xg.setFromNormalAndCoplanarPoint(r.object.up,r.target),ql.intersectPlane(Xg,r.target))))}else r.object.isOrthographicCamera&&(r.object.zoom=Math.max(r.minZoom,Math.min(r.maxZoom,r.object.zoom/h)),r.object.updateProjectionMatrix(),oe=!0);return h=1,D=!1,oe||Re.distanceToSquared(r.object.position)>d||8*(1-Xe.dot(r.object.quaternion))>d||dt.distanceToSquared(r.target)>0?(r.dispatchEvent(Wg),Re.copy(r.object.position),Xe.copy(r.object.quaternion),dt.copy(r.target),!0):!1}}(),this.dispose=function(){r.domElement.removeEventListener("contextmenu",He),r.domElement.removeEventListener("pointerdown",ot),r.domElement.removeEventListener("pointercancel",C),r.domElement.removeEventListener("wheel",ye),r.domElement.removeEventListener("pointermove",L),r.domElement.removeEventListener("pointerup",C),r._domElementKeyEvents!==null&&(r._domElementKeyEvents.removeEventListener("keydown",we),r._domElementKeyEvents=null)};const r=this,o={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let l=o.NONE;const d=1e-6,u=new Gg,f=new Gg;let h=1;const m=new z,g=new Be,y=new Be,S=new Be,E=new Be,M=new Be,_=new Be,v=new Be,T=new Be,A=new Be,P=new z,F=new Be;let D=!1;const I=[],ie={};function R(B){return B!==null?2*Math.PI/60*r.autoRotateSpeed*B:2*Math.PI/60/60*r.autoRotateSpeed}function U(B){const xe=Math.abs(B)/(100*(window.devicePixelRatio|0));return Math.pow(.95,r.zoomSpeed*xe)}function se(B){f.theta-=B}function le(B){f.phi-=B}const me=function(){const B=new z;return function(Ue,Re){B.setFromMatrixColumn(Re,0),B.multiplyScalar(-Ue),m.add(B)}}(),H=function(){const B=new z;return function(Ue,Re){r.screenSpacePanning===!0?B.setFromMatrixColumn(Re,1):(B.setFromMatrixColumn(Re,0),B.crossVectors(r.object.up,B)),B.multiplyScalar(Ue),m.add(B)}}(),q=function(){const B=new z;return function(Ue,Re){const Xe=r.domElement;if(r.object.isPerspectiveCamera){const dt=r.object.position;B.copy(dt).sub(r.target);let mt=B.length();mt*=Math.tan(r.object.fov/2*Math.PI/180),me(2*Ue*mt/Xe.clientHeight,r.object.matrix),H(2*Re*mt/Xe.clientHeight,r.object.matrix)}else r.object.isOrthographicCamera?(me(Ue*(r.object.right-r.object.left)/r.object.zoom/Xe.clientWidth,r.object.matrix),H(Re*(r.object.top-r.object.bottom)/r.object.zoom/Xe.clientHeight,r.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),r.enablePan=!1)}}();function te(B){r.object.isPerspectiveCamera||r.object.isOrthographicCamera?h/=B:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),r.enableZoom=!1)}function J(B){r.object.isPerspectiveCamera||r.object.isOrthographicCamera?h*=B:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),r.enableZoom=!1)}function X(B,xe){if(!r.zoomToCursor)return;D=!0;const Ue=r.domElement.getBoundingClientRect(),Re=B-Ue.left,Xe=xe-Ue.top,dt=Ue.width,mt=Ue.height;F.x=Re/dt*2-1,F.y=-(Xe/mt)*2+1,P.set(F.x,F.y,1).unproject(r.object).sub(r.object.position).normalize()}function K(B){return Math.max(r.minDistance,Math.min(r.maxDistance,B))}function $(B){g.set(B.clientX,B.clientY)}function O(B){X(B.clientX,B.clientX),v.set(B.clientX,B.clientY)}function W(B){E.set(B.clientX,B.clientY)}function Y(B){y.set(B.clientX,B.clientY),S.subVectors(y,g).multiplyScalar(r.rotateSpeed);const xe=r.domElement;se(2*Math.PI*S.x/xe.clientHeight),le(2*Math.PI*S.y/xe.clientHeight),g.copy(y),r.update()}function de(B){T.set(B.clientX,B.clientY),A.subVectors(T,v),A.y>0?te(U(A.y)):A.y<0&&J(U(A.y)),v.copy(T),r.update()}function ve(B){M.set(B.clientX,B.clientY),_.subVectors(M,E).multiplyScalar(r.panSpeed),q(_.x,_.y),E.copy(M),r.update()}function Te(B){X(B.clientX,B.clientY),B.deltaY<0?J(U(B.deltaY)):B.deltaY>0&&te(U(B.deltaY)),r.update()}function Ae(B){let xe=!1;switch(B.code){case r.keys.UP:B.ctrlKey||B.metaKey||B.shiftKey?le(2*Math.PI*r.rotateSpeed/r.domElement.clientHeight):q(0,r.keyPanSpeed),xe=!0;break;case r.keys.BOTTOM:B.ctrlKey||B.metaKey||B.shiftKey?le(-2*Math.PI*r.rotateSpeed/r.domElement.clientHeight):q(0,-r.keyPanSpeed),xe=!0;break;case r.keys.LEFT:B.ctrlKey||B.metaKey||B.shiftKey?se(2*Math.PI*r.rotateSpeed/r.domElement.clientHeight):q(r.keyPanSpeed,0),xe=!0;break;case r.keys.RIGHT:B.ctrlKey||B.metaKey||B.shiftKey?se(-2*Math.PI*r.rotateSpeed/r.domElement.clientHeight):q(-r.keyPanSpeed,0),xe=!0;break}xe&&(B.preventDefault(),r.update())}function Fe(B){if(I.length===1)g.set(B.pageX,B.pageY);else{const xe=pt(B),Ue=.5*(B.pageX+xe.x),Re=.5*(B.pageY+xe.y);g.set(Ue,Re)}}function ge(B){if(I.length===1)E.set(B.pageX,B.pageY);else{const xe=pt(B),Ue=.5*(B.pageX+xe.x),Re=.5*(B.pageY+xe.y);E.set(Ue,Re)}}function be(B){const xe=pt(B),Ue=B.pageX-xe.x,Re=B.pageY-xe.y,Xe=Math.sqrt(Ue*Ue+Re*Re);v.set(0,Xe)}function ze(B){r.enableZoom&&be(B),r.enablePan&&ge(B)}function Q(B){r.enableZoom&&be(B),r.enableRotate&&Fe(B)}function tt(B){if(I.length==1)y.set(B.pageX,B.pageY);else{const Ue=pt(B),Re=.5*(B.pageX+Ue.x),Xe=.5*(B.pageY+Ue.y);y.set(Re,Xe)}S.subVectors(y,g).multiplyScalar(r.rotateSpeed);const xe=r.domElement;se(2*Math.PI*S.x/xe.clientHeight),le(2*Math.PI*S.y/xe.clientHeight),g.copy(y)}function ke(B){if(I.length===1)M.set(B.pageX,B.pageY);else{const xe=pt(B),Ue=.5*(B.pageX+xe.x),Re=.5*(B.pageY+xe.y);M.set(Ue,Re)}_.subVectors(M,E).multiplyScalar(r.panSpeed),q(_.x,_.y),E.copy(M)}function Je(B){const xe=pt(B),Ue=B.pageX-xe.x,Re=B.pageY-xe.y,Xe=Math.sqrt(Ue*Ue+Re*Re);T.set(0,Xe),A.set(0,Math.pow(T.y/v.y,r.zoomSpeed)),te(A.y),v.copy(T);const dt=(B.pageX+xe.x)*.5,mt=(B.pageY+xe.y)*.5;X(dt,mt)}function Ve(B){r.enableZoom&&Je(B),r.enablePan&&ke(B)}function Mt(B){r.enableZoom&&Je(B),r.enableRotate&&tt(B)}function ot(B){r.enabled!==!1&&(I.length===0&&(r.domElement.setPointerCapture(B.pointerId),r.domElement.addEventListener("pointermove",L),r.domElement.addEventListener("pointerup",C)),Ye(B),B.pointerType==="touch"?Ke(B):re(B))}function L(B){r.enabled!==!1&&(B.pointerType==="touch"?Ie(B):Me(B))}function C(B){it(B),I.length===0&&(r.domElement.releasePointerCapture(B.pointerId),r.domElement.removeEventListener("pointermove",L),r.domElement.removeEventListener("pointerup",C)),r.dispatchEvent(jg),l=o.NONE}function re(B){let xe;switch(B.button){case 0:xe=r.mouseButtons.LEFT;break;case 1:xe=r.mouseButtons.MIDDLE;break;case 2:xe=r.mouseButtons.RIGHT;break;default:xe=-1}switch(xe){case Ns.DOLLY:if(r.enableZoom===!1)return;O(B),l=o.DOLLY;break;case Ns.ROTATE:if(B.ctrlKey||B.metaKey||B.shiftKey){if(r.enablePan===!1)return;W(B),l=o.PAN}else{if(r.enableRotate===!1)return;$(B),l=o.ROTATE}break;case Ns.PAN:if(B.ctrlKey||B.metaKey||B.shiftKey){if(r.enableRotate===!1)return;$(B),l=o.ROTATE}else{if(r.enablePan===!1)return;W(B),l=o.PAN}break;default:l=o.NONE}l!==o.NONE&&r.dispatchEvent(Hd)}function Me(B){switch(l){case o.ROTATE:if(r.enableRotate===!1)return;Y(B);break;case o.DOLLY:if(r.enableZoom===!1)return;de(B);break;case o.PAN:if(r.enablePan===!1)return;ve(B);break}}function ye(B){r.enabled===!1||r.enableZoom===!1||l!==o.NONE||(B.preventDefault(),r.dispatchEvent(Hd),Te(B),r.dispatchEvent(jg))}function we(B){r.enabled===!1||r.enablePan===!1||Ae(B)}function Ke(B){switch(_e(B),I.length){case 1:switch(r.touches.ONE){case Ds.ROTATE:if(r.enableRotate===!1)return;Fe(B),l=o.TOUCH_ROTATE;break;case Ds.PAN:if(r.enablePan===!1)return;ge(B),l=o.TOUCH_PAN;break;default:l=o.NONE}break;case 2:switch(r.touches.TWO){case Ds.DOLLY_PAN:if(r.enableZoom===!1&&r.enablePan===!1)return;ze(B),l=o.TOUCH_DOLLY_PAN;break;case Ds.DOLLY_ROTATE:if(r.enableZoom===!1&&r.enableRotate===!1)return;Q(B),l=o.TOUCH_DOLLY_ROTATE;break;default:l=o.NONE}break;default:l=o.NONE}l!==o.NONE&&r.dispatchEvent(Hd)}function Ie(B){switch(_e(B),l){case o.TOUCH_ROTATE:if(r.enableRotate===!1)return;tt(B),r.update();break;case o.TOUCH_PAN:if(r.enablePan===!1)return;ke(B),r.update();break;case o.TOUCH_DOLLY_PAN:if(r.enableZoom===!1&&r.enablePan===!1)return;Ve(B),r.update();break;case o.TOUCH_DOLLY_ROTATE:if(r.enableZoom===!1&&r.enableRotate===!1)return;Mt(B),r.update();break;default:l=o.NONE}}function He(B){r.enabled!==!1&&B.preventDefault()}function Ye(B){I.push(B.pointerId)}function it(B){delete ie[B.pointerId];for(let xe=0;xe<I.length;xe++)if(I[xe]==B.pointerId){I.splice(xe,1);return}}function _e(B){let xe=ie[B.pointerId];xe===void 0&&(xe=new Be,ie[B.pointerId]=xe),xe.set(B.pageX,B.pageY)}function pt(B){const xe=B.pointerId===I[0]?I[1]:I[0];return ie[xe]}r.domElement.addEventListener("contextmenu",He),r.domElement.addEventListener("pointerdown",ot),r.domElement.addEventListener("pointercancel",C),r.domElement.addEventListener("wheel",ye,{passive:!1}),this.update()}}class nf extends nn{constructor(e=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=e,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new Be(.5,.5),this.addEventListener("removed",function(){this.traverse(function(t){t.element instanceof Element&&t.element.parentNode!==null&&t.element.parentNode.removeChild(t.element)})})}copy(e,t){return super.copy(e,t),this.element=e.element.cloneNode(!0),this.center=e.center,this}}const Ks=new z,$g=new Ht,Yg=new Ht,qg=new z,Kg=new z;class hA{constructor(e={}){const t=this;let r,o,l,d;const u={objects:new WeakMap},f=e.element!==void 0?e.element:document.createElement("div");f.style.overflow="hidden",this.domElement=f,this.getSize=function(){return{width:r,height:o}},this.render=function(S,E){S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),E.parent===null&&E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),$g.copy(E.matrixWorldInverse),Yg.multiplyMatrices(E.projectionMatrix,$g),h(S,S,E),y(S)},this.setSize=function(S,E){r=S,o=E,l=r/2,d=o/2,f.style.width=S+"px",f.style.height=E+"px"};function h(S,E,M){if(S.isCSS2DObject){Ks.setFromMatrixPosition(S.matrixWorld),Ks.applyMatrix4(Yg);const _=S.visible===!0&&Ks.z>=-1&&Ks.z<=1&&S.layers.test(M.layers)===!0;if(S.element.style.display=_===!0?"":"none",_===!0){S.onBeforeRender(t,E,M);const T=S.element;T.style.transform="translate("+-100*S.center.x+"%,"+-100*S.center.y+"%)translate("+(Ks.x*l+l)+"px,"+(-Ks.y*d+d)+"px)",T.parentNode!==f&&f.appendChild(T),S.onAfterRender(t,E,M)}const v={distanceToCameraSquared:m(M,S)};u.objects.set(S,v)}for(let _=0,v=S.children.length;_<v;_++)h(S.children[_],E,M)}function m(S,E){return qg.setFromMatrixPosition(S.matrixWorld),Kg.setFromMatrixPosition(E.matrixWorld),qg.distanceToSquared(Kg)}function g(S){const E=[];return S.traverse(function(M){M.isCSS2DObject&&E.push(M)}),E}function y(S){const E=g(S).sort(function(_,v){if(_.renderOrder!==v.renderOrder)return v.renderOrder-_.renderOrder;const T=u.objects.get(_).distanceToCameraSquared,A=u.objects.get(v).distanceToCameraSquared;return T-A}),M=E.length;for(let _=0,v=E.length;_<v;_++)E[_].element.style.zIndex=M-_}}}class pA extends e0{constructor(e=null){super();const t=new Yi;t.deleteAttribute("uv");const r=new rs({side:Cn}),o=new rs;let l=5;e!==null&&e._useLegacyLights===!1&&(l=900);const d=new cA(16777215,l,28,2);d.position.set(.418,16.199,.3),this.add(d);const u=new Rt(t,r);u.position.set(-.757,13.219,.717),u.scale.set(31.713,28.305,28.591),this.add(u);const f=new Rt(t,o);f.position.set(-10.906,2.009,1.846),f.rotation.set(0,-.195,0),f.scale.set(2.328,7.905,4.651),this.add(f);const h=new Rt(t,o);h.position.set(-5.607,-.754,-.758),h.rotation.set(0,.994,0),h.scale.set(1.97,1.534,3.955),this.add(h);const m=new Rt(t,o);m.position.set(6.167,.857,7.803),m.rotation.set(0,.561,0),m.scale.set(3.927,6.285,3.687),this.add(m);const g=new Rt(t,o);g.position.set(-2.017,.018,6.124),g.rotation.set(0,.333,0),g.scale.set(2.002,4.566,2.064),this.add(g);const y=new Rt(t,o);y.position.set(2.291,-.756,-2.621),y.rotation.set(0,-.286,0),y.scale.set(1.546,1.552,1.496),this.add(y);const S=new Rt(t,o);S.position.set(-2.193,-.369,-5.547),S.rotation.set(0,.516,0),S.scale.set(3.875,3.487,2.986),this.add(S);const E=new Rt(t,Zs(50));E.position.set(-16.116,14.37,8.208),E.scale.set(.1,2.428,2.739),this.add(E);const M=new Rt(t,Zs(50));M.position.set(-16.109,18.021,-8.207),M.scale.set(.1,2.425,2.751),this.add(M);const _=new Rt(t,Zs(17));_.position.set(14.904,12.198,-1.832),_.scale.set(.15,4.265,6.331),this.add(_);const v=new Rt(t,Zs(43));v.position.set(-.462,8.89,14.52),v.scale.set(4.38,5.441,.088),this.add(v);const T=new Rt(t,Zs(20));T.position.set(3.235,11.486,-12.541),T.scale.set(2.5,2,.1),this.add(T);const A=new Rt(t,Zs(100));A.position.set(0,20,0),A.scale.set(1,.1,1),this.add(A)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function Zs(s){const e=new so;return e.color.setScalar(s),e}function mA(s,e=Math.PI/3){const t=Math.cos(e),r=(1+1e-10)*100,o=[new z,new z,new z],l=new z,d=new z,u=new z,f=new z;function h(M){const _=~~(M.x*r),v=~~(M.y*r),T=~~(M.z*r);return`${_},${v},${T}`}const m=s.index?s.toNonIndexed():s,g=m.attributes.position,y={};for(let M=0,_=g.count/3;M<_;M++){const v=3*M,T=o[0].fromBufferAttribute(g,v+0),A=o[1].fromBufferAttribute(g,v+1),P=o[2].fromBufferAttribute(g,v+2);l.subVectors(P,A),d.subVectors(T,A);const F=new z().crossVectors(l,d).normalize();for(let D=0;D<3;D++){const I=o[D],ie=h(I);ie in y||(y[ie]=[]),y[ie].push(F)}}const S=new Float32Array(g.count*3),E=new Yn(S,3,!1);for(let M=0,_=g.count/3;M<_;M++){const v=3*M,T=o[0].fromBufferAttribute(g,v+0),A=o[1].fromBufferAttribute(g,v+1),P=o[2].fromBufferAttribute(g,v+2);l.subVectors(P,A),d.subVectors(T,A),u.crossVectors(l,d).normalize();for(let F=0;F<3;F++){const D=o[F],I=h(D),ie=y[I];f.set(0,0,0);for(let R=0,U=ie.length;R<U;R++){const se=ie[R];u.dot(se)>t&&f.add(se)}f.normalize(),E.setXYZ(v+F,f.x,f.y,f.z)}}return m.setAttribute("normal",E),m}const Xn={bg:724242,crimson:16735029,ice:8176895,robot:11844552},gA={float32:Float32Array,uint16:Uint16Array,uint32:Uint32Array,int16:Int16Array,uint8:Uint8Array},a0=new z(0,0,1),vA=new z(0,1,0),Kl=new Map;function dc(s){const e=atob(s.b64),t=new Uint8Array(e.length);for(let r=0;r<e.length;r++)t[r]=e.charCodeAt(r);return new gA[s.dtype](t.buffer)}async function l0(s){const e=await fetch(s);if(!e.ok)throw new Error(`${s}: HTTP ${e.status}`);return e.json()}function _A(s){return Kl.has(s)||Kl.set(s,l0(s).catch(e=>{throw Kl.delete(s),e})),Kl.get(s)}const xA=`
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
.nr-hud{position:absolute;left:10px;top:10px;right:10px;display:flex;flex-wrap:wrap;gap:6px;pointer-events:none}
.nr-chip{font:500 11px/1 "IBM Plex Mono",ui-monospace,monospace;padding:5px 8px;border-radius:6px;
  background:rgba(10,10,10,.55);border:1px solid rgba(255,255,255,.08);color:#b9b7b2;white-space:nowrap;
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
.nr-time{font:12px "IBM Plex Mono",ui-monospace,monospace;color:#8b93a7;min-width:92px;text-align:right;flex:none}
.nr-speed{display:flex;gap:2px;background:#0b0d12;border:1px solid #222733;border-radius:8px;padding:2px;flex:none}
.nr-speed button{border:0;background:transparent;color:#8b93a7;font:600 12px "IBM Plex Mono",monospace;padding:5px 8px;border-radius:6px;cursor:pointer}
.nr-speed button.on{background:#222733;color:#e7e9ee}
@container (max-width:480px){.nr-track{flex-basis:100%;order:-1}.nr-time{min-width:0;margin-right:auto;text-align:left}}
`;function yA(){if(document.getElementById("nr-style"))return;const s=document.createElement("style");s.id="nr-style",s.textContent=xA,document.head.appendChild(s)}function Zt(s,e,t){const r=document.createElement(s);return e&&(r.className=e),t!=null&&(r.innerHTML=t),r}const Zg='<svg viewBox="0 0 16 16"><path d="M4 2.5v11l9-5.5z"/></svg>',SA='<svg viewBox="0 0 16 16"><path d="M3.5 2.5h3v11h-3zM9.5 2.5h3v11h-3z"/></svg>';function MA(s){const t=document.createElement("canvas");t.width=t.height=512;const r=t.getContext("2d");r.fillStyle="#0f1218",r.fillRect(0,0,512,512),r.strokeStyle="rgba(139,147,167,0.10)",r.lineWidth=2;for(let l=1;l<4;l++){const d=l*512/4;r.beginPath(),r.moveTo(d,0),r.lineTo(d,512),r.moveTo(0,d),r.lineTo(512,d),r.stroke()}r.strokeStyle="rgba(139,147,167,0.24)",r.lineWidth=3,r.strokeRect(0,0,512,512);const o=new jT(t);return o.wrapS=o.wrapT=nc,o.anisotropy=s.capabilities.getMaxAnisotropy(),o.colorSpace=un,o}function EA(s){const e=s.size;switch(s.type){case"box":return new Yi(2*e[0],2*e[1],2*e[2]);case"sphere":return new uc(e[0],24,16);case"ellipsoid":return new uc(1,24,16).scale(e[0],e[1],e[2]);case"capsule":return new Sf(e[0],2*e[1],8,16).rotateX(Math.PI/2);case"cylinder":return new pa(e[0],e[0],2*e[1],24).rotateX(Math.PI/2);default:return null}}function wA(s){const e=new Rn;e.setAttribute("position",new Yn(dc(s.vert),3)),e.setIndex(new Yn(dc(s.face),1));const t=mA(e,es.degToRad(40));return e.dispose(),t.computeBoundingSphere(),t}function TA(s){const e=new Tr,t=new Rt(new pa(1,1,1,16).translate(0,.5,0),s),r=new Rt(new Ef(1,1,24).translate(0,.5,0),s);return t.castShadow=r.castShadow=!0,e.add(t,r),e.visible=!1,e.set=(o,l,d,u)=>{const f=Math.min(d*.38,.1);t.scale.set(u,d-f,u),r.scale.set(u*2.6,f,u*2.6),r.position.y=d-f,e.position.copy(o),e.quaternion.setFromUnitVectors(vA,l)},e}function rf(s){const e=document.createElement("div");return e.appendChild(s),e}function AA(s){return 1-(1-s)*(1-s)}function bA(s,e,t,r,o){const{assets:l,meshGeos:d,track:u}=s,f=e.overlays||{},h=new Tr,m=f.start?f.start.yaw:0,g=f.start?f.start.origin:[0,0];h.quaternion.setFromAxisAngle(a0,-m),h.position.set(-g[0],-g[1],0).applyQuaternion(h.quaternion).add(new z(0,r,0));const y=dc(e.pos),S=dc(e.quat),E=e.bodies.length,M=e.n_frames,_=new Map(e.bodies.map((ge,be)=>[ge,be])),v=new Map((f.weak||[]).map(ge=>[ge.body,ge.amount])),T=l.bodies.map((ge,be)=>{const ze=new Tr;return ze.userData.k=_.has(ge.name)?_.get(ge.name):-1,h.add(ze),ze}),A=new St(Xn.robot),P=new St(Xn.crimson),F=l.bodies.map((ge,be)=>{var tt;const ze=v.get(be)||0,Q=new rs({color:s.modelColors?new St().fromArray(((tt=l.geoms.find(ke=>ke.body===be))==null?void 0:tt.rgba)||[.7,.7,.7]):A.clone(),metalness:.35,roughness:.42,envMapIntensity:.9});return ze>0&&(Q.color.lerp(P,ze),Q.emissive=P.clone(),Q.emissiveIntensity=.35*ze),o&&(Q.transparent=!0,Q.opacity=.3,Q.depthWrite=!1),u(Q)});for(const ge of l.geoms){const be=ge.type==="mesh"?d[ge.mesh]:u(EA(ge));if(!be)continue;const ze=new Rt(be,F[ge.body]);ze.position.fromArray(ge.pos),ze.quaternion.set(ge.quat[1],ge.quat[2],ge.quat[3],ge.quat[0]),ze.castShadow=!o,ze.receiveShadow=!0,T[ge.body].add(ze)}const D=Math.max(0,l.bodies.findIndex(ge=>ge.name==="trunk")),I=T[D];if(f.payload){const ge=f.payload,be=ge.half_size,ze=new Rt(u(new Yi(2*be[0],2*be[1],2*be[2])),u(new rs({color:Xn.crimson,roughness:.55,metalness:.1,emissive:Xn.crimson,emissiveIntensity:.25})));ze.position.fromArray(ge.pos),ze.castShadow=!0,T[ge.body].add(ze)}const ie=u(new so({color:Xn.ice,transparent:!0,opacity:.55,depthWrite:!1})),R=u(new Mf(.055,32)),U=(f.slippery_feet||[]).map(ge=>{const be=new Rt(R,ie);return be.renderOrder=2,h.add(be),{mesh:be,body:T[ge.body],local:new z().fromArray(ge.pos)}}),se=u(new rs({color:Xn.crimson,emissive:Xn.crimson,emissiveIntensity:.6,transparent:!0})),le=TA(se);h.add(le);const me=(f.pushes||[]).map(ge=>({...ge,f:new z().fromArray(ge.force)})),H=Zt("div","nr-tag red"),q=new nf(rf(H));q.visible=!1,h.add(q);const te=e.fall_time,J={};if(te!=null){const ge=u(new so({color:Xn.crimson,transparent:!0,opacity:0,depthWrite:!1,side:wi})),be=u(new so({color:Xn.crimson,transparent:!0,opacity:0,depthWrite:!1}));J.ring=new Rt(u(new cc(.92,1,64)),ge),J.mark=new Rt(u(new cc(.1,.13,48)),be),J.ring.renderOrder=J.mark.renderOrder=3,h.add(J.ring,J.mark)}const X=Zt("div","nr-label",'<span></span><span class="nr-pill"></span>');X.firstChild.textContent=t;const K=X.lastChild,$=new nf(rf(X));h.add($);const O=new Xi,W=new Xi,Y=new z,de=new z,ve=new z,Te=e.duration;function Ae(ge){const be=es.clamp(ge/e.dt,0,M-1),ze=Math.floor(be),Q=Math.min(ze+1,M-1),tt=be-ze;for(const ke of T){const Je=ke.userData.k;if(Je<0)continue;const Ve=(ze*E+Je)*3,Mt=(Q*E+Je)*3;ke.position.set(y[Ve]+(y[Mt]-y[Ve])*tt,y[Ve+1]+(y[Mt+1]-y[Ve+1])*tt,y[Ve+2]+(y[Mt+2]-y[Ve+2])*tt);const ot=(ze*E+Je)*4,L=(Q*E+Je)*4;O.set(S[ot+1],S[ot+2],S[ot+3],S[ot]),W.set(S[L+1],S[L+2],S[L+3],S[L]),ke.quaternion.slerpQuaternions(O,W,tt)}}te!=null&&(Ae(te),J.ring.position.set(I.position.x,I.position.y,.006),J.mark.position.copy(J.ring.position));function Fe(ge){Ae(ge);for(const tt of U)Y.copy(tt.local).applyQuaternion(tt.body.quaternion).add(tt.body.position),tt.mesh.position.set(Y.x,Y.y,.004);let be=0;ve.set(0,0,0);for(const tt of me)ge>=tt.t0&&ge<tt.t1?(ve.add(tt.f),be=1):ge>=tt.t1&&ge<tt.t1+.25&&be<1&&(ve.add(tt.f),be=Math.max(be,1-(ge-tt.t1)/.25));const ze=ve.length();if(le.visible=q.visible=ze>1&&be>0,le.visible){ve.divideScalar(ze);const tt=.25+.45*Math.min(ze,300)/150,ke=Y.copy(I.position).addScaledVector(ve,-.1);de.copy(ke).addScaledVector(ve,-tt),le.set(de,ve,tt,.012+.02*Math.min(ze,300)/150),se.opacity=be,q.position.copy(de).add(Y.set(0,0,.08)),H.textContent=`PUSH ${Math.round(ze)} N`,H.style.opacity=be}$.position.copy(I.position).add(Y.set(0,0,.36));let Q=0;if(te!=null){const tt=ge-te,ke=tt>=0;if(K.className=ke?"nr-pill fell":"nr-pill",K.textContent=ke?`FELL ${te.toFixed(2)} s`:"",ke){const Je=Math.min(1,tt/.8);J.ring.scale.setScalar(.12+.85*AA(Je)),J.ring.material.opacity=.9*(1-Je),J.mark.material.opacity=.9,Q=.8*Math.max(0,1-tt/.45)}else J.ring.material.opacity=J.mark.material.opacity=0}else{const tt=ge>=Te-.001;K.className=tt?"nr-pill held":"nr-pill",K.textContent=tt?"HELD":""}return Q}return{root:h,trunk:I,update:Fe,duration:Te,fallT:te,label:t,labelEl:X}}async function CA(s,e={}){const{assetsUrl:t="assets/go1_scene.json",trajUrls:r=[],trajs:o=null,layout:l="side",spacing:d=1.1,autoplay:u=!0,loop:f=!0,speed:h=1,startTime:m=0,hud:g=!0,modelColors:y=!1,onTime:S=null}=e;yA();const E=Zt("div","nr");E.tabIndex=0;const M=Zt("div","nr-stage"),_=Zt("div","nr-msg","loading replay…");M.appendChild(_),E.appendChild(M),s.appendChild(E);let v,T;try{[v,T]=await Promise.all([e.assets?Promise.resolve(e.assets):_A(t),o?Promise.resolve(o):Promise.all(r.map(oe=>l0(typeof oe=="string"?oe:oe.url)))])}catch(oe){return _.textContent=`replay unavailable: ${oe.message}`,{setTime(){},play(){},pause(){},setSpeed(){},dispose(){E.remove()},error:oe}}_.remove();const A=T.map((oe,pe)=>r[pe]&&r[pe].label||oe.label||["Original","Nemesis-trained"][pe]||`Robot ${pe+1}`),P=new Set,F=oe=>(oe&&P.add(oe),oe),D=new Qv({antialias:!0,powerPreference:"high-performance"});D.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),D.shadowMap.enabled=!0,D.shadowMap.type=yv,D.toneMapping=Mv,D.toneMappingExposure=1.05,D.setClearColor(Xn.bg,1),M.appendChild(D.domElement);const I=new hA;I.domElement.className="nr-labels",M.appendChild(I.domElement);const ie=Zt("div","nr-hud"),R=Zt("div","nr-flash");M.append(R,ie);const U=new e0;U.background=new St(Xn.bg),U.fog=new vf(Xn.bg,5,16);const se=new ef(D),le=se.fromScene(new pA(D),.04).texture;U.environment=le;const me=new $n(38,16/9,.05,60);me.up.copy(a0),U.add(new aA(13095678,724242,.55));const H=new Vg(16777215,2.2);H.castShadow=!0,H.shadow.mapSize.set(2048,2048),Object.assign(H.shadow.camera,{left:-2.5,right:2.5,top:2.5,bottom:-2.5,near:.5,far:14}),H.shadow.bias=-4e-4,H.shadow.normalBias=.02,H.shadow.radius=4,H.shadow.camera.updateProjectionMatrix(),U.add(H,H.target);const q=new Vg(9684477,.9);U.add(q,q.target);const te=new Tr;U.add(te);const J=T[0].overlays||{};if(J.slope){const{pitch:oe,roll:pe}=J.slope,rt=new z(-Math.sin(oe)*Math.cos(pe),Math.sin(pe),-Math.cos(oe)*Math.cos(pe));te.quaternion.setFromUnitVectors(rt,new z(0,0,-1))}const X=F(MA(D)),K=60;X.repeat.set(K,K);const $=new Rt(F(new xc(K,K)),F(new rs({map:X,roughness:.92,metalness:0,envMapIntensity:.25})));$.position.set(K/2-6,0,v.floor&&v.floor.z||0),$.receiveShadow=!0,te.add($);const O=T.length,W=l==="ghost"&&O>1,Y=T.map((oe,pe)=>W?0:((O-1)/2-pe)*d);if(J.ice){const oe=J.ice,pe=1.8+(W?0:d*(O-1)),rt=new Rt(F(new Yi(oe.length,pe,.006)),F(new rs({color:3906815,transparent:!0,opacity:.26,roughness:.15,metalness:0,envMapIntensity:.2,emissive:1929174,emissiveIntensity:.45,depthWrite:!1})));rt.position.set(oe.start+oe.length/2,0,.004),rt.renderOrder=1;const et=new WT(F(new oA(rt.geometry)),F(new t0({color:Xn.ice,transparent:!0,opacity:.7})));rt.add(et),te.add(rt);const Et=Zt("div","nr-tag");Et.textContent=`ICE μ ${oe.mu}`,Et.style.marginLeft="60px";const Ct=new nf(rf(Et));Ct.position.set(oe.start+.05,pe/2-.15,.02),te.add(Ct)}const de=v.meshes.map(oe=>F(wA(oe))),ve={assets:v,meshGeos:de,track:F,modelColors:y},Te=T.map((oe,pe)=>bA(ve,oe,A[pe],Y[pe],W&&pe===0));Te.forEach(oe=>te.add(oe.root)),W&&Te.forEach((oe,pe)=>{oe.labelEl.style.transform=`translateX(${pe?"calc(50% + 4px)":"calc(-50% - 4px)"})`});const Ae=Math.max(...Te.map(oe=>oe.duration)),Fe=oe=>(v.sites?Object.keys(v.sites).length:4)===oe.length;if(g){const oe=[],pe=(et,Et)=>{const Ct=Zt("span","nr-chip");Ct.textContent=et,Et&&(Ct.dataset.key=Et),ie.appendChild(Ct),oe.push(Ct)};if(J.ice&&pe(`ice μ ${+(+J.ice.mu).toFixed(2)}, ${+(+J.ice.length).toFixed(1)} m patch`),(J.slippery_feet||[]).length){const et=J.slippery_feet,Et=+Math.min(...et.map(Ct=>Ct.mu)).toFixed(2);pe(et.length>=4||et.length===2&&Fe(et)?`slippery floor μ ${Et}`:`slippery ${et.map(Ct=>Ct.site).join(" ")} μ ${Et}`)}J.payload&&pe(`${+(+J.payload.mass).toFixed(1)} kg load`),(J.pushes||[]).forEach((et,Et)=>pe(`${Math.round(et.magnitude)} N shove at ${(+et.t0).toFixed(1)} s`,`push${Et}`));for(const et of J.weak||[])pe(`${et.name.replace("_"," ")} at ${Math.round(et.strength*100)}%`);if(J.slope){const et=Et=>Math.round(es.radToDeg(Et)*10)/10;Math.abs(J.slope.pitch)>1e-4&&pe(`slope ${et(Math.abs(J.slope.pitch))}° ${J.slope.pitch>0?"uphill":"downhill"}`),Math.abs(J.slope.roll)>1e-4&&pe(`side slope ${et(J.slope.roll)}°`)}const rt=J.conditions||{};rt.latency&&pe(`${Math.round(rt.latency)*20} ms lag`),rt.obs_noise&&pe("sensor noise"),rt.joint_friction&&pe(`joint friction ×${rt.joint_friction}`),ie.chips=oe}const ge=Zt("div","nr-bar"),be=Zt("button","nr-play",Zg);be.setAttribute("aria-label","Play");const ze=Zt("div","nr-track"),Q=Zt("div","nr-rail"),tt=Zt("div","nr-fill");Q.appendChild(tt),ze.appendChild(Q);for(const oe of J.pushes||[]){const pe=Zt("div","nr-band");pe.style.left=`${100*oe.t0/Ae}%`,pe.style.width=`${100*(oe.t1-oe.t0)/Ae}%`,pe.title=`push ${Math.round(oe.magnitude)} N`,ze.appendChild(pe)}Te.forEach(oe=>{if(oe.fallT==null)return;const pe=Zt("div","nr-mark");pe.style.left=`${100*oe.fallT/Ae}%`,pe.title=`${oe.label} fell at ${oe.fallT.toFixed(2)} s`,ze.appendChild(pe)});const ke=Zt("input","nr-range");Object.assign(ke,{type:"range",min:0,max:Ae,step:.001,value:0}),ke.setAttribute("aria-label","Replay time"),ze.appendChild(ke);const Je=Zt("div","nr-time"),Ve=Zt("div","nr-speed"),Mt=[.25,.5,1],ot=Mt.map(oe=>{const pe=Zt("button","",`${oe}×`);return pe.onclick=()=>st.setSpeed(oe),Ve.appendChild(pe),pe});ge.append(be,ze,Je,Ve),E.appendChild(ge);let L=es.clamp(m,0,Ae),C=!1,re=h,Me=0,ye=0,we=performance.now(),Ke=!0,Ie=!1,He=!1;const Ye=new fA(me,D.domElement);Ye.enableDamping=!0,Ye.dampingFactor=.08,Ye.minDistance=.6,Ye.maxDistance=12,Ye.maxPolarAngle=es.degToRad(86),Ye.addEventListener("start",()=>{He=!0});const it=new z,_e=new z,pt=new z;function B(oe){oe.set(0,0,0);for(const pe of Te)oe.add(pe.trunk.getWorldPosition(pt));return oe.divideScalar(Te.length)}const xe=new z(-1.55,-2.25,1.05);function Ue(){const oe=me.aspect,pe=(oe<1.2?1.2/oe:1)**.6*(W||O===1?.85:1);Ye.target.copy(it),me.position.copy(it).addScaledVector(xe,pe)}function Re(){const oe=M.clientWidth,pe=M.clientHeight;!oe||!pe||(D.setSize(oe,pe,!1),I.setSize(oe,pe),me.aspect=oe/pe,me.updateProjectionMatrix(),He||Ue())}function Xe(oe){C=oe,be.innerHTML=oe?SA:Zg,be.setAttribute("aria-label",oe?"Pause":"Play")}function dt(){let oe=0;for(const pe of Te)oe=Math.max(oe,pe.update(L));if(te.updateMatrixWorld(!0),R.style.opacity=oe.toFixed(3),ke.value=L,tt.style.width=`${100*L/Ae}%`,Je.textContent=`${L.toFixed(2)} / ${Ae.toFixed(2)} s`,ie.chips)for(const pe of ie.chips){const rt=pe.dataset.key;if(!rt)continue;const et=J.pushes[+rt.slice(4)];pe.classList.toggle("on",L>=et.t0&&L<et.t1+.25)}S&&S(L)}function mt(oe){ye=requestAnimationFrame(mt);const pe=Math.max(0,Math.min(.25,(oe-we)/1e3));if(we=oe,!Ke)return;C&&(L>=Ae?(Me+=pe,f?Me>1.2&&(L=0,Me=0):Xe(!1)):L=Math.min(Ae,L+pe*re),dt()),B(_e);const rt=it.clone();it.lerp(_e,1-Math.exp(-pe*3.5));const et=rt.sub(it).negate();me.position.add(et),Ye.target.copy(it),Ye.update(),H.target.position.copy(it),H.position.copy(it).add(_e.set(1.8,-2.4,5)),q.target.position.copy(it),q.position.copy(it).add(_e.set(-3,3,1.5)),D.render(U,me),I.render(U,me)}const st={get time(){return L},duration:Ae,setTime(oe){L=es.clamp(+oe||0,0,Ae),Me=0,dt()},play(){L>=Ae&&(L=0),Me=0,Xe(!0)},pause(){Xe(!1)},toggle(){C?st.pause():st.play()},setSpeed(oe){re=oe,ot.forEach((pe,rt)=>pe.classList.toggle("on",Mt[rt]===oe))},resetCamera(){He=!1,Ue()},dispose(){if(!Ie){Ie=!0,cancelAnimationFrame(ye),Pe.disconnect(),Ne.disconnect(),E.removeEventListener("keydown",V),Ye.dispose();for(const oe of P)oe.dispose();le.dispose(),se.dispose(),D.dispose(),D.forceContextLoss(),E.remove()}}};be.onclick=()=>st.toggle();let Le=!1;ke.addEventListener("pointerdown",()=>{Le=C,Xe(!1)}),ke.addEventListener("input",()=>st.setTime(ke.value)),ke.addEventListener("change",()=>{Le&&(Le=!1,Xe(!0))});const V=oe=>{oe.target===ke&&oe.key.startsWith("Arrow")||(oe.key===" "||oe.key==="k"?(oe.preventDefault(),st.toggle()):(oe.key==="ArrowRight"||oe.key==="ArrowLeft")&&(oe.preventDefault(),st.pause(),st.setTime(L+(oe.key==="ArrowRight"?1:-1)*T[0].dt)))};E.addEventListener("keydown",V);const Pe=new ResizeObserver(Re);Pe.observe(M);const Ne=new IntersectionObserver(oe=>{Ke=oe[0].isIntersecting,we=performance.now()});return Ne.observe(E),st.setSpeed(h),dt(),B(it),Re(),Ue(),u&&st.play(),ye=requestAnimationFrame(mt),st}function sf({trajs:s,className:e="",hud:t=!0}){const r=he.useRef(null),o=JSON.stringify(s.map(l=>l.url||l.label||l.n_frames));return he.useEffect(()=>{if(!r.current||!s.length)return;let l,d=!1;const u=s.every(f=>!f.url);return CA(r.current,{assetsUrl:"/assets/go1_scene.json",hud:t,...u?{trajs:s}:{trajUrls:s.map(f=>({url:f.url,label:f.label}))}}).then(f=>{d?f.dispose():l=f}),()=>{d=!0,l==null||l.dispose()}},[o]),b.jsx("div",{ref:r,className:`replay-fill overflow-hidden ${e}`})}function RA({seeds:s,color:e="bg-ember",size:t="size-3.5"}){return b.jsx("div",{className:"flex gap-1",children:s.map((r,o)=>b.jsx("i",{style:{animationDelay:`${o*70}ms`},className:`rise block ${t} ${r?e:"border border-white/15"}`},o))})}const PA=["A light shove from the right as it turns","Slightly wet tiles and a 3 kg backpack","The back-left knee is a bit weak","20 ms of lag on a gentle downhill"];function LA(){const[s,e]=he.useState(null),[t,r]=he.useState(3),[o,l]=he.useState(!1),[d,u]=he.useState(null),[f,h]=he.useState("lobby"),[m,g]=he.useState(null),[y,S]=he.useState(""),E=()=>Ti("/api/duel_tally").then(e).catch(()=>{});he.useEffect(()=>{E()},[]),he.useEffect(()=>{if(f!=="turn"||!d)return;g(null);const T=setInterval(async()=>{const A=await Ti(`/api/duel/${d.id}/muse`).catch(()=>null);A!=null&&A.locked&&(g(A.commit),clearInterval(T))},1200);return()=>clearInterval(T)},[f,d==null?void 0:d.history.length]);const M=async()=>{S("");try{u(await ss("/api/duel",{rounds:t,hard:o})),h("turn"),window.scrollTo({top:0})}catch(T){S(T.message)}},_=async T=>{h("running"),S("");try{u(await T()),h("reveal")}catch(A){S(A.message),h("turn")}};if(f==="lobby"||!d)return b.jsxs("div",{className:"grid gap-16 pt-10 sm:pt-16 lg:grid-cols-[1.3fr_1fr]",children:[b.jsxs("section",{children:[b.jsxs("h1",{className:"text-[48px] font-medium leading-[1] tracking-[-0.04em] sm:text-[84px]",children:[b.jsx("span",{className:"text-peri",children:"You"})," ",b.jsx("span",{className:"text-faint",children:"vs"})," ",b.jsx("span",{className:"text-ember",children:"Muse"})]}),b.jsx("p",{className:"mt-8 max-w-lg text-[17px] leading-relaxed text-mute",children:"You both write an attack on the same robot, at the same time. The subtlest one that still knocks it over wins. Brute force scores nothing."}),b.jsxs("div",{className:"mt-10 flex flex-wrap items-center gap-3",children:[b.jsx(Jg,{options:[["3","Best of 3"],["5","Best of 5"]],value:String(t),onChange:T=>r(+T)}),b.jsx(Jg,{options:[["0","Normal"],["1","Hard"]],value:o?"1":"0",onChange:T=>l(T==="1")})]}),b.jsxs("button",{onClick:M,className:"mt-6 flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[15px] font-medium text-black transition-opacity hover:opacity-85",children:["Start ",b.jsx(ho,{size:16})]}),y&&b.jsx("p",{className:"mt-3 text-sm text-ember",children:y})]}),b.jsx(NA,{tally:s})]});const v=d.history.at(-1);return b.jsxs("div",{className:"pt-8",children:[b.jsx(DA,{duel:d}),f==="turn"&&b.jsxs("div",{className:"rise mt-10 grid gap-5 lg:grid-cols-[1.4fr_1fr]",children:[b.jsxs("div",{children:[b.jsx(vv,{accent:"bg-peri",examples:PA,onText:T=>_(()=>ss(`/api/duel/${d.id}/round`,{text:T})),onVoice:T=>_(()=>Xd(`/api/duel/${d.id}/round_voice`,"audio",T,"attack.wav"))}),y&&b.jsx("p",{className:"mt-3 text-sm text-ember",children:y})]}),b.jsxs("div",{className:"flex items-center gap-4 rounded-2xl border border-line px-5 py-4",children:[b.jsx("div",{className:`grid size-10 shrink-0 place-items-center rounded-full ${m?"bg-ember/15 text-ember":"bg-white/5 text-faint"}`,children:b.jsx(_y,{size:16,strokeWidth:1.8})}),b.jsxs("div",{className:"min-w-0",children:[b.jsx("p",{className:"text-[15px]",children:m?"Muse has sealed its attack":b.jsxs(b.Fragment,{children:["Muse is writing its attack",b.jsx("span",{className:"blink",children:"…"})]})}),b.jsx("p",{className:"truncate font-mono text-xs text-faint",children:m?`sha256 ${m}`:"it never sees yours"})]})]})]}),f==="running"&&b.jsxs("div",{className:"mx-auto mt-24 w-64 text-center",children:[b.jsx("p",{className:"text-sm text-mute",children:"Running both attacks on the same robot"}),b.jsx("div",{className:"mt-4 h-px overflow-hidden bg-line",children:b.jsx("div",{className:"sweep h-full w-1/3 bg-ember"})})]}),f==="reveal"&&v&&b.jsx(UA,{r:v,over:d.over,onNext:()=>d.over?(h("final"),E()):h("turn")}),f==="final"&&b.jsx(IA,{duel:d,onRematch:M})]})}function Jg({options:s,value:e,onChange:t}){return b.jsx("div",{className:"inline-flex rounded-full border border-line p-1",children:s.map(([r,o])=>b.jsx("button",{onClick:()=>t(r),className:`rounded-full px-4 py-1.5 text-sm transition-colors ${e===r?"bg-white/10 text-ink":"text-faint hover:text-mute"}`,children:o},r))})}function NA({tally:s}){var t;const e=((t=s==null?void 0:s.log)==null?void 0:t.slice(-60))||[];return b.jsxs("aside",{className:"self-end",children:[b.jsxs("div",{className:"grid grid-cols-12 gap-1.5",children:[e.map((r,o)=>b.jsx("i",{className:`block aspect-square ${r==="you"?"bg-peri":r==="muse"?"bg-ember":"bg-white/25"}`},o)),Array.from({length:Math.max(0,60-e.length)},(r,o)=>b.jsx("i",{className:"block aspect-square border border-white/[.07]"},`e${o}`))]}),b.jsxs("p",{className:"mt-4 text-sm text-mute",children:["Humans ",b.jsx("span",{className:"text-peri",children:(s==null?void 0:s.you)??0}),b.jsx("span",{className:"mx-2 text-faint",children:"·"}),"Muse ",b.jsx("span",{className:"text-ember",children:(s==null?void 0:s.muse)??0})]})]})}function DA({duel:s}){const e=Math.min(s.history.length+1,s.rounds);return b.jsxs("div",{className:"flex items-center justify-between border-b border-line pb-6",children:[b.jsxs("div",{children:[b.jsx("p",{className:"text-sm text-mute",children:"You"}),b.jsx("p",{className:"text-5xl font-medium tracking-tight text-peri tabular-nums",children:s.score.you})]}),b.jsxs("div",{className:"flex flex-col items-center gap-3",children:[b.jsx("div",{className:"flex gap-1.5",children:Array.from({length:s.rounds},(t,r)=>{const o=s.history[r],l=o?o.you.score>o.muse.score?"bg-peri":o.muse.score>o.you.score?"bg-ember":"bg-white/40":r===s.history.length?"bg-white/40":"bg-white/10";return b.jsx("i",{className:`block h-1 w-7 ${l}`},r)})}),b.jsx("p",{className:"font-mono text-xs text-faint",children:s.over?"final":`round ${e} of ${s.rounds}`})]}),b.jsxs("div",{className:"text-right",children:[b.jsx("p",{className:"text-sm text-mute",children:"Muse"}),b.jsx("p",{className:"text-5xl font-medium tracking-tight text-ember tabular-nums",children:s.score.muse})]})]})}function UA({r:s,over:e,onNext:t}){const[r,o]=he.useState(null),[l,d]=he.useState("");return he.useEffect(()=>{var h;(h=crypto.subtle)==null||h.digest("SHA-256",new TextEncoder().encode(s.sealed)).then(m=>o([...new Uint8Array(m)].map(g=>g.toString(16).padStart(2,"0")).join("")===s.commit));let u=0;const f=setInterval(()=>{u+=2,d(s.comment.slice(0,u)),u>=s.comment.length&&clearInterval(f)},18);return()=>clearInterval(f)},[s.round]),b.jsxs("div",{className:"rise mt-10",children:[b.jsxs("div",{className:"grid gap-5 md:grid-cols-2",children:[b.jsx(Qg,{who:"You",s:s.you,other:s.muse,color:"bg-peri",text:"text-peri"}),b.jsx(Qg,{who:"Muse",s:s.muse,other:s.you,color:"bg-ember",text:"text-ember"})]}),s.comment&&b.jsx("p",{className:"mx-auto mt-10 max-w-2xl text-center text-[17px] leading-relaxed text-mute",children:l}),b.jsxs("div",{className:"mt-10 flex flex-wrap items-center justify-between gap-4",children:[b.jsx("p",{className:"flex items-center gap-2 font-mono text-xs text-faint",children:r&&b.jsxs(b.Fragment,{children:[b.jsx(cf,{size:13,className:"text-acid"})," Muse's attack matches the hash it sealed before you wrote yours"]})}),b.jsxs("button",{onClick:t,className:"flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-black hover:opacity-85",children:[e?"Result":"Next round"," ",b.jsx(ho,{size:15})]})]})]})}function Qg({who:s,s:e,other:t,color:r,text:o}){const l=e.score>t.score,d=e.seeds.filter(Boolean).length;return b.jsxs("div",{children:[b.jsx("div",{className:"relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-[#0b0d12]",children:b.jsx(sf,{trajs:[{...e.traj,label:s.toUpperCase()}],className:"absolute inset-0"})}),b.jsxs("div",{className:"mt-5 flex items-start justify-between gap-6",children:[b.jsxs("div",{className:"min-w-0",children:[b.jsx("p",{className:"text-sm text-faint",children:s}),b.jsx("p",{className:"mt-1 text-[17px] leading-snug",children:e.text})]}),b.jsx("p",{className:`text-4xl font-medium tabular-nums tracking-tight ${l?o:"text-faint"}`,children:e.score})]}),b.jsxs("div",{className:"mt-4 flex items-center gap-4",children:[b.jsx(RA,{seeds:e.seeds,color:r}),b.jsx("p",{className:"text-xs text-faint",children:e.cheap?b.jsx("span",{className:"text-ember",children:"brute force, scores 0"}):`${d}/8 falls · ${Math.round(e.subtlety*100)}% subtle`})]})]})}function IA({duel:s,onRematch:e}){const[t,r]=he.useState(null),[o,l]=he.useState(""),d=s.winner,u=s.history.some(m=>["you","muse"].some(g=>m[g].seeds.filter(Boolean).length>=4&&!m[g].cheap)),f=()=>{const{you:m,muse:g}=s.score,y=d==="you"?`I beat Meta's Muse ${m}–${g} at breaking a robot.`:d==="muse"?`Meta's Muse beat me ${g}–${m} at breaking a robot.`:"I drew with Meta's Muse at breaking a robot.";window.open(`https://x.com/intent/post?text=${encodeURIComponent(y+" Subtle beats brutal.")}&url=${encodeURIComponent(location.origin+"/arena")}`,"_blank")},h=he.useRef(null);return he.useEffect(()=>{var m;return(m=h.current)==null?void 0:m.scrollIntoView({behavior:"smooth"})},[]),b.jsxs("div",{ref:h,className:"rise mt-14",children:[b.jsx("h2",{className:`text-[64px] font-medium leading-none tracking-[-0.045em] sm:text-[120px] ${d==="you"?"text-peri":d==="muse"?"text-ember":""}`,children:d==="you"?"You win.":d==="muse"?"Muse wins.":"Draw."}),b.jsx("div",{className:"mt-12 divide-y divide-line border-y border-line",children:s.history.map(m=>b.jsx("div",{className:"grid gap-x-8 gap-y-2 py-4 text-[15px] sm:grid-cols-2",children:["you","muse"].map(g=>b.jsxs("div",{className:"flex items-baseline justify-between gap-4",children:[b.jsxs("p",{className:"text-mute",children:[b.jsx("span",{className:"mr-3 font-mono text-xs text-faint",children:g==="you"?"you":"muse"}),m[g].text]}),b.jsx("span",{className:`font-mono text-sm ${m[g].score>m[g==="you"?"muse":"you"].score?g==="you"?"text-peri":"text-ember":"text-faint"}`,children:m[g].score})]},g))},m.round))}),b.jsxs("div",{className:"mt-10 flex flex-wrap gap-3",children:[u&&!t&&b.jsxs("button",{onClick:async()=>{try{r((await ss(`/api/duel/${s.id}/patch`)).job)}catch(m){l(m.message)}},className:"flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-black hover:opacity-85",children:["Teach the robot what broke it ",b.jsx(ho,{size:15})]}),b.jsxs("button",{onClick:f,className:"flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm hover:border-white/25",children:[b.jsx(Sy,{size:14})," Share"]}),b.jsxs("button",{onClick:e,className:"flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm hover:border-white/25",children:[b.jsx(yy,{size:14})," Rematch"]})]}),o&&b.jsx("p",{className:"mt-3 text-sm text-ember",children:o}),t&&b.jsx("div",{className:"mt-6",children:b.jsx(_v,{job:t})})]})}const OA=["Make the floor icy and shove it from the left","Wet tiles and a 3 kg backpack","The back-left knee is weak, on a gentle downhill","40 ms of control lag while it walks","Slippery front feet when it suddenly stops"];function FA(){var P;const[s,e]=he.useState(0),t=mv(s),[r,o]=he.useState(""),[l,d]=he.useState(""),[u,f]=he.useState(null),[h,m]=he.useState(null),[g,y]=he.useState(null),[S,E]=he.useState([]),[M,_]=he.useState([]);he.useEffect(()=>{Ti("/api/hall_of_fame?limit=9").then(E).catch(()=>{}),Ti("/api/leaderboard?limit=5").then(_).catch(()=>{})},[s]);const v=async(F,D)=>{o(F),d(""),m(null),y(null);try{f(await D()),e(I=>I+1)}catch(I){d(I.message)}o("")},T=(g==null?void 0:g.trajs)||(u==null?void 0:u.trajs)||((P=S[0])==null?void 0:P.trajs),A=g?[`${g.parent}`,`${g.version}`]:u?["original",u.version]:null;return b.jsxs("div",{children:[b.jsxs("div",{className:"grid gap-8 pt-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-12 lg:pt-6",children:[b.jsxs("section",{className:"flex flex-col lg:h-[calc(100dvh-11rem)] lg:min-h-[460px]",children:[b.jsxs("h1",{className:"text-[40px] font-medium leading-[1.04] tracking-[-0.035em] xl:text-[50px]",children:["Try to break",b.jsx("br",{className:"hidden lg:block"})," the robot.",b.jsxs("span",{className:"block text-faint",children:["Then watch",b.jsx("br",{className:"hidden lg:block"})," it learn."]})]}),b.jsx("p",{className:"mt-5 max-w-sm text-[15px] leading-relaxed text-mute",children:"Describe an attack, say it, or show a photo of a real place. Muse turns it into physics. If the robot falls, retrain it until it doesn't."}),b.jsx("div",{className:"mt-auto pt-8",children:b.jsx(vv,{busy:!!r,examples:OA,onText:F=>v("Muse Wonder is turning that into physics…",()=>ss("/api/attack",{text:F})),onVoice:F=>v("Listening, then simulating…",()=>Xd("/api/attack_voice","audio",F,"attack.wav")),onFile:F=>v("Muse Spark is reading your place…",()=>Xd("/api/world","media",F,F.name))})}),l&&b.jsx("p",{className:"mt-3 text-sm text-ember",children:l}),u&&!r&&b.jsx(kA,{r:u,after:g,onPatch:async()=>{try{m((await ss("/api/patch",{attack_id:u.id})).job)}catch(F){d(F.message)}},patching:!!h}),h&&b.jsx("div",{className:"mt-4",children:b.jsx(_v,{job:h,onDone:F=>{F.accepted&&y(F),e(D=>D+1)}})})]}),b.jsxs("section",{className:"relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-[#0b0d12] lg:aspect-auto lg:h-[calc(100dvh-11rem)] lg:min-h-[460px]",children:[T?b.jsx(sf,{trajs:T.map((F,D)=>({url:F.url,label:(A==null?void 0:A[D])||F.label})),className:"absolute inset-0"},JSON.stringify(T)):b.jsx(sf,{trajs:[{url:"/assets/sample_traj_held.json",label:""}],hud:!1,className:"absolute inset-0"}),r&&b.jsx("div",{className:"absolute inset-0 grid place-items-center bg-black/60 backdrop-blur-[2px]",children:b.jsxs("div",{className:"w-56",children:[b.jsx("p",{className:"text-center text-sm text-mute",children:r}),b.jsx("div",{className:"mt-3 h-px overflow-hidden bg-line",children:b.jsx("div",{className:"sweep h-full w-1/3 bg-ember"})})]})})]})]}),S.length>0&&b.jsxs("section",{className:"mt-28",children:[b.jsxs("div",{className:"flex items-end justify-between",children:[b.jsx("h2",{className:"text-2xl font-medium tracking-tight",children:"Recent breaks"}),t&&b.jsxs(pv,{to:"/report",className:"flex items-center gap-1.5 text-sm text-mute hover:text-ink",children:["Red-team report ",b.jsx(ho,{size:14})]})]}),b.jsx("div",{className:"mt-6 grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3",children:S.map(F=>b.jsx(zA,{r:F},F.id))})]}),b.jsxs("section",{className:"mt-28 grid gap-16 lg:grid-cols-2",children:[M.length>0&&b.jsxs("div",{children:[b.jsx("h2",{className:"text-2xl font-medium tracking-tight",children:"Subtlest attacks"}),b.jsx("p",{className:"mt-2 text-sm text-faint",children:"Points for breaking it with as little as possible."}),b.jsx("ol",{className:"mt-6 divide-y divide-line border-y border-line",children:M.map((F,D)=>b.jsxs("li",{className:"flex items-baseline gap-4 py-3.5",children:[b.jsx("span",{className:"w-4 font-mono text-xs text-faint",children:D+1}),b.jsxs("div",{className:"min-w-0 flex-1",children:[b.jsx("p",{className:"truncate text-[15px]",children:F.text}),b.jsx("p",{className:"text-xs text-faint",children:F.who})]}),b.jsx("span",{className:"font-mono text-sm text-ember",children:F.score})]},F.who))})]}),t&&t.versions.length>1&&b.jsxs("div",{children:[b.jsx("h2",{className:"text-2xl font-medium tracking-tight",children:"Lineage"}),b.jsx("p",{className:"mt-2 text-sm text-faint",children:"Every version passed the regression gate before going live."}),b.jsx("ol",{className:"mt-6 border-l border-line",children:[...t.versions].reverse().map(F=>b.jsxs("li",{className:"relative py-2.5 pl-6",children:[b.jsx("i",{className:`absolute top-[17px] -left-[4px] block size-[7px] rounded-full ${F.name===t.live?"bg-acid":"bg-line"}`}),b.jsx("span",{className:"font-mono text-sm",children:F.name}),b.jsx("span",{className:"ml-3 text-sm text-faint",children:F.parent?`learned ${F.attacks.length} attack${F.attacks.length===1?"":"s"}`:"original policy"})]},F.name))})]})]})]})}function kA({r:s,after:e,onPatch:t,patching:r}){const o=s.fall_rate_trained>=.5,l=s.fall_rate_trained>=.5&&s.survivable!==!1&&!e;return b.jsxs("div",{className:"rise mt-6",children:[s.reading&&b.jsxs("div",{className:"mb-5 flex gap-4",children:[b.jsx("img",{src:s.media,alt:"",className:"size-20 shrink-0 rounded-lg object-cover"}),b.jsxs("p",{className:"text-sm leading-relaxed text-mute",children:[b.jsxs("span",{className:"text-ink",children:[s.reading.place,"."]})," ",s.reading.surface,", friction ≈ ",(+s.reading.friction).toFixed(2),Math.abs(s.reading.slope_deg)>=1?`, ${(+s.reading.slope_deg).toFixed(0)}° slope`:"","."]})]}),b.jsxs("div",{className:"flex flex-col items-start gap-4",children:[b.jsxs("p",{className:"text-[15px] text-mute",children:["Original robot ",b.jsx("span",{className:s.broke_baseline?"text-ember":"text-acid",children:s.broke_baseline?"fell":"held"}),b.jsxs("span",{className:"text-faint",children:[" · ",kn(s.fall_rate_baseline)]}),b.jsx("span",{className:"mx-3 text-line",children:"/"}),s.version," ",b.jsx("span",{className:o?"text-ember":"text-acid",children:o?"fell":"held"}),b.jsxs("span",{className:"text-faint",children:[" · ",kn(s.fall_rate_trained)]}),s.score>0&&b.jsxs("span",{className:"ml-3 font-mono text-sm text-ember",children:["+",s.score]})]}),l&&b.jsxs("button",{onClick:t,disabled:r,className:"flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-medium text-black transition-opacity hover:opacity-85 disabled:opacity-40",children:["Train it to survive this ",b.jsx(ho,{size:15})]})]}),s.survivable===!1&&s.fall_rate_trained>0&&b.jsxs("p",{className:"mt-3 text-sm text-faint",children:["Physics wins: even our toughest robot falls ",kn(s.reference_fall_rate)," of the time here. Try something subtler."]}),e&&b.jsxs("p",{className:"mt-3 text-sm text-mute",children:["Replaying it on ",b.jsx("span",{className:"text-acid",children:e.version}),", now live."]})]})}function zA({r:s}){const e=Object.entries(s.status||{}).sort((t,r)=>+t[0].slice(1)-+r[0].slice(1));return b.jsxs("article",{className:"group",children:[b.jsx("div",{className:"overflow-hidden rounded-xl border border-line bg-[#0b0d12]",children:b.jsx("video",{src:`${s.clip}#t=1.2`,preload:"metadata",muted:!0,loop:!0,playsInline:!0,onMouseEnter:t=>t.currentTarget.play(),onMouseLeave:t=>t.currentTarget.pause(),className:"aspect-[2/1] w-full object-cover opacity-90 transition-opacity group-hover:opacity-100"})}),b.jsx("p",{className:"mt-3 line-clamp-2 text-[15px] leading-snug",children:s.text}),b.jsx("div",{className:"mt-2 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs",children:e.map(([t,r])=>b.jsxs("span",{className:r>=.5?"text-ember":"text-acid",children:[t," ",r>=.5?"fell":"held"]},t))})]})}const of=s=>{if(s==null)return"never";if(Array.isArray(s)){if(s.every(t=>t===s[0]))return of(s[0]);const e=s.filter(t=>Math.abs(t)>1e-6);return e.length===1?of(e[0]):`[${s.map(t=>+(+t).toFixed(2)).join(", ")}]`}return String(typeof s=="number"?+s.toFixed(2):s)};function BA(){var y;const{version:s}=Px(),[e,t]=he.useState(s||""),[r,o]=he.useState(null),[l,d]=he.useState(!1),[u,f]=he.useState("");he.useEffect(()=>{(async()=>{const S=s||(await Ti("/api/versions")).live;t(S),Ti(`/api/report/${S}`).then(o).catch(()=>d(!0))})()},[s]);const h=async()=>{f("Starting…");try{const{job:S}=await ss("/api/report",{version:e});await lf(S,E=>E.message&&f(E.message)),o(await Ti(`/api/report/${e}`)),d(!1)}catch(S){f(S.message)}};if(!r)return b.jsxs("div",{className:"mx-auto max-w-3xl pt-16",children:[b.jsxs("h1",{className:"text-[40px] font-medium tracking-[-0.03em] sm:text-[56px]",children:["Red-team report ",b.jsx("span",{className:"text-faint",children:e})]}),l&&b.jsxs("div",{className:"mt-8",children:[b.jsxs("p",{className:"text-mute",children:["Re-tests every attack and the 52-scenario gauntlet against ",e,", measures safety margins, and has Muse Wonder write it up."]}),b.jsx("button",{onClick:h,disabled:!!u,className:"mt-6 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-black disabled:opacity-40",children:"Generate"}),u&&b.jsxs("p",{className:"mt-4 text-sm text-mute",children:[b.jsx("span",{className:"blink text-ember",children:"●"})," ",u]})]})]});const m=r.summary||{},g=r.totals;return b.jsxs("article",{className:"mx-auto max-w-4xl pt-14",children:[b.jsxs("p",{className:"font-mono text-xs text-faint",children:["Unitree Go1 · ",r.version," · ",new Date(r.created*1e3).toLocaleDateString()]}),b.jsx("h1",{className:"mt-4 text-[32px] font-medium leading-[1.12] tracking-[-0.025em] sm:text-[44px]",children:m.headline}),b.jsx("p",{className:"mt-6 text-[17px] leading-relaxed text-mute",children:m.summary}),b.jsx("div",{className:"mt-12 grid grid-cols-2 border-y border-line sm:grid-cols-4",children:[[g.attacks,"attacks tested"],[g.break_v1,"broke the original"],[g.break_now,`still break ${r.version}`],[`${kn(r.gauntlet.v1)} → ${kn(r.gauntlet[r.version])}`,"gauntlet falls"]].map(([S,E],M)=>b.jsxs("div",{className:`py-5 ${M?"sm:border-l sm:border-line sm:pl-5":""}`,children:[b.jsx("p",{className:"text-2xl font-medium tracking-tight",children:S}),b.jsx("p",{className:"mt-1 text-sm text-faint",children:E})]},M))}),((y=m.recommendations)==null?void 0:y.length)>0&&b.jsxs("section",{className:"mt-16",children:[b.jsx("h2",{className:"text-xl font-medium",children:"Recommendations"}),b.jsx("ol",{className:"mt-5 space-y-3",children:m.recommendations.map((S,E)=>b.jsxs("li",{className:"flex gap-4 text-[15px] leading-relaxed text-mute",children:[b.jsx("span",{className:"font-mono text-xs text-faint pt-1",children:E+1}),S]},E))})]}),b.jsxs("section",{className:"mt-16",children:[b.jsx("h2",{className:"text-xl font-medium",children:"Findings"}),b.jsx("div",{className:"mt-6 space-y-12",children:r.findings.map(S=>b.jsxs("div",{className:"grid gap-6 md:grid-cols-[1fr_1.1fr]",children:[b.jsx("video",{src:S.clip,muted:!0,loop:!0,playsInline:!0,controls:!0,preload:"metadata",className:"w-full rounded-xl border border-line"}),b.jsxs("div",{children:[b.jsxs("p",{className:`font-mono text-xs ${S.fall_now>=.5?"text-ember":"text-acid"}`,children:[S.fall_now>=.5?"open":"fixed"," · ",S.family]}),b.jsx("p",{className:"mt-2 text-[17px] leading-snug",children:S.text}),b.jsxs("p",{className:"mt-3 text-sm text-faint",children:[Object.entries(S.status||{}).map(([E,M])=>`${E} ${kn(M)}`).join(" · ")," · now ",kn(S.fall_now)]}),S.diagnosis&&b.jsxs("p",{className:"mt-4 border-l-2 border-peri/60 pl-4 text-sm leading-relaxed text-mute",children:[b.jsxs("span",{className:"text-ink",children:[S.diagnosis.mode,"."]})," ",S.diagnosis.what_happened]}),S.margin&&b.jsxs("div",{className:"mt-5",children:[b.jsxs("p",{className:"text-sm text-mute",children:["Falls begin at ",b.jsx("span",{className:"font-mono text-ink",children:of(S.margin.starts_falling_at)})," ",b.jsx("span",{className:"text-faint",children:S.margin.condition})]}),b.jsx("div",{className:"mt-2 flex h-8 max-w-xs items-end gap-1",children:S.margin.curve.map((E,M)=>b.jsx("i",{style:{height:`${Math.max(6,E*100)}%`},className:`block flex-1 ${E>=.5?"bg-ember":"bg-white/15"}`},M))})]})]})]},S.id))})]})]})}Q_.createRoot(document.getElementById("root")).render(b.jsx(he.StrictMode,{children:b.jsx(ny,{children:b.jsx(Yx,{children:b.jsxs(Js,{element:b.jsx(dy,{}),children:[b.jsx(Js,{index:!0,element:b.jsx(FA,{})}),b.jsx(Js,{path:"arena",element:b.jsx(LA,{})}),b.jsx(Js,{path:"agent",element:b.jsx(wy,{})}),b.jsx(Js,{path:"report/:version?",element:b.jsx(BA,{})})]})})})}));
